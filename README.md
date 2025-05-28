# 🖥️ Activity & Screenshot Monitoring System

A modern, multi-platform monitoring system that captures screenshots, tracks user activity, and presents everything on a sleek, real-time dashboard.

## 🚀 Features

- **Screenshot Capture**
  - Automated, multi-monitor screenshot capture
  - Configurable capture intervals
  - Secure storage and retrieval

- **Activity Monitoring**
  - Active window tracking
  - Application usage monitoring
  - Real-time activity logging

- **Modern Dashboard**
  - Real-time data display
  - Screenshot gallery view
  - Activity timeline
  - Responsive design

## 🧰 Technology Stack

- **Backend**: Laravel 10.x  
- **Frontend**: Next.js 14 with TypeScript  
- **Monitoring Agent**: Python 3.x  
- **Database**: MySQL  

## ⚙️ Setup Instructions

```bash
# Backend Setup
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

# Frontend Setup
cd frontend
npm install
cp .env.example .env.local
npm run dev

# Monitoring Agent Setup
cd agent
pip install -r requirements.txt
cp .env.example .env
python monitor.py

# Backend Environment (.env)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Frontend Environment (.env.local)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Monitoring Agent Environment (.env)
API_BASE_URL=http://localhost:8000/api
SCREENSHOT_INTERVAL=300
ACTIVITY_INTERVAL=60

# API Endpoints

# Screenshots
POST   /api/screenshots         - Upload new screenshot
GET    /api/screenshots         - Retrieve screenshots list
DELETE /api/screenshots/{id}    - Delete a screenshot

# Activities
POST   /api/activities          - Log new activity
GET    /api/activities          - Retrieve activities list
PUT    /api/activities/{id}     - Update activity status

# Development Info

Prerequisites:
- PHP 8.1 or higher
- Node.js 18 or higher
- Python 3.8 or higher
- MySQL 8.0 or higher

Recommended Tools:
- Composer
- npm or yarn
- pip
- Git


✅ This file merges everything into one logical flow, with **cleanly grouped configuration, API, and development instructions** — exactly as requested. Let me know if you'd like it saved to a `.md` file or formatted for GitHub Pages, Notion, or other tools.

