import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard() {
  const [entitiesCount, setEntitiesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const res = await api.getEntities();
        setEntitiesCount(res.data.length || 0);
      } catch (error) {
        console.error("Failed to fetch entities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntities();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white/70 backdrop-blur border border-white/50 shadow-xl rounded-lg p-5">
          <h3 className="text-sm text-gray-500">Total ESG Entries</h3>
          <p className="text-3xl font-bold mt-2">
            {loading ? "..." : entitiesCount}
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/70 backdrop-blur border border-white/50 shadow-xl rounded-lg p-5">
          <h3 className="text-sm text-gray-500">System Status</h3>
          <p className="text-lg font-semibold mt-2 text-green-600">
            {loading ? "Checking..." : "Operational"}
          </p>
        </div>
      </div>
    </div>
  );
}
