import { BrowserActivity } from '@/types';

interface Props {
  activities: BrowserActivity[];
}

export function ActivityTable({ activities }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Title</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">URL</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Started At</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Ended At</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities?.data?.map((activity) => (
            <tr key={activity.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-900">{activity.title}</td>
              <td className="px-4 py-2 text-sm text-gray-500">{activity.url}</td>
              <td className="px-4 py-2 text-sm text-gray-500">
                {new Date(activity.started_at).toLocaleString()}
              </td>
              <td className="px-4 py-2 text-sm text-gray-500">
                {activity.ended_at 
                  ? new Date(activity.ended_at).toLocaleString()
                  : 'Active'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}