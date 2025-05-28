import { Screenshot } from '@/types';

interface Props {
  screenshots: Screenshot[];
}

export function ScreenshotGrid({ screenshots }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {screenshots?.data?.map((screenshot) => (
        <div key={screenshot.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
          <img 
            src={`http://localhost:8000/storage/${screenshot.file_path}`}
            alt={`Screenshot taken at ${screenshot.taken_at}`}
            className="w-full h-auto"
          />
          <div className="p-4">
            <p className="text-sm text-gray-600">
              Taken at: {new Date(screenshot.taken_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}