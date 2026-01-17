import { useEffect, useState } from "react";
import axios from "../services/api";

 function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("/activities");
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to load activity logs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return <div className="p-6">Loading logs...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Activity Logs</h1>

      <div className="overflow-x-auto rounded-lg border border-white/50 shadow-xl bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t hover:bg-gray-50">
                <td className="p-3 whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="p-3 font-medium">
                  {log.action}
                </td>
                <td className="p-3 text-gray-600">
                  {log.description || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {logs.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No activity recorded yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default ActivityLogs;
