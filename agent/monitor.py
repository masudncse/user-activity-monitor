import os
import time
import json
import psutil
import requests
from PIL import ImageGrab
from datetime import datetime
from dotenv import load_dotenv
import win32gui
import win32process

# Load environment variables
load_dotenv()

# Configuration
API_BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:8000/api')
API_TOKEN = os.getenv('API_TOKEN')
SCREENSHOT_INTERVAL = int(os.getenv('SCREENSHOT_INTERVAL', '10'))  # 5 minutes
ACTIVITY_INTERVAL = int(os.getenv('ACTIVITY_INTERVAL', '10'))  # 1 minute

class ActivityMonitor:
    def __init__(self):
        self.headers = {
            'Authorization': f'Bearer {API_TOKEN}',
            'Accept': 'application/json'
        }
        self.screenshot_dir = 'screenshots'
        os.makedirs(self.screenshot_dir, exist_ok=True)

    def capture_screenshot(self):
        try:
            # Capture screenshot of all monitors
            timestamp = datetime.now()
            filename = f'screenshot_{timestamp.strftime("%Y%m%d_%H%M%S")}.png'
            filepath = os.path.join(self.screenshot_dir, filename)
            
            # Use all_screens=True to capture all monitors
            screenshot = ImageGrab.grab(all_screens=True)
            screenshot.save(filepath, format='PNG')
        
            # Upload screenshot
            with open(filepath, 'rb') as image:
                print(filepath)
                files = {
                    'screenshot': (filename, image, 'image/png')
                }
                data = {
                    'taken_at': timestamp.strftime("%Y-%m-%d %H:%M:%S")
                }
                response = requests.post(
                    f'{API_BASE_URL}/screenshots',
                    headers=self.headers,
                    files=files,
                    data=data
                )
                response.raise_for_status()
        
            # Clean up local file
            os.remove(filepath)
            return True
        except Exception as e:
            print(f'Screenshot error: {str(e)}')
            return False

    def get_active_window_info(self):
        try:
            window = win32gui.GetForegroundWindow()
            _, pid = win32process.GetWindowThreadProcessId(window)
            process = psutil.Process(pid)
            
            return {
                'window_title': win32gui.GetWindowText(window),
                'process_name': process.name(),
                'executable_path': process.exe()
            }
        except Exception as e:
            print(f'Window info error: {str(e)}')
            return None

    def track_activity(self):
        try:
            window_info = self.get_active_window_info()
            if window_info:
                data = {
                    'url': window_info['executable_path'],  # Using executable path as URL
                    'title': window_info['window_title'],
                    'tab_id': str(time.time()),  # Using timestamp as unique tab ID
                    'window_id': str(win32gui.GetForegroundWindow()),  # Get window handle directly
                    'started_at': datetime.now().isoformat()
                }
                
                response = requests.post(
                    f'{API_BASE_URL}/activities',
                    headers=self.headers,
                    json=data
                )
                response.raise_for_status()
                return True
        except Exception as e:
            print(f'Activity tracking error: {str(e)}')
            return False

    def run(self):
        last_screenshot = 0
        last_activity = 0

        print('Starting activity monitor...')
        while True:
            current_time = time.time()

            print('current_time', current_time)
            print('last_screenshot', last_screenshot)
            print('last_activity', last_activity)

            print('DIFF: ', current_time - last_screenshot)

            # Take screenshot every SCREENSHOT_INTERVAL
            if current_time - last_screenshot >= SCREENSHOT_INTERVAL:
                print("take Screen fullfill")
                if self.capture_screenshot():
                    last_screenshot = current_time

            # Track activity every ACTIVITY_INTERVAL
            if current_time - last_activity >= ACTIVITY_INTERVAL:
                if self.track_activity():
                    last_activity = current_time

            time.sleep(1)

if __name__ == '__main__':
    monitor = ActivityMonitor()
    monitor.run()