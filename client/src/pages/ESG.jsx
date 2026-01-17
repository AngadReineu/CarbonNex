import React, { useState, useEffect } from "react";
import { Building, Upload, EyeOff, Trash2, Edit2, RefreshCw } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
// import bgImage from "../assets/xv.png"

const ESG = () => {
  const { user } = useAuth();

  const [entities, setEntities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    industryNote: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("form"); 

  const industries = [
    "Manufacturing",
    "Technology",
    "Energy",
  ];

  const isFormDisabled = user?.role !== "admin";

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/entities");
      setEntities(res.data);
    } catch (err) {
      console.error("Failed to fetch entities:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "industry") {
      setFormData((prev) => ({
        ...prev,
        industry: value,
        industryNote: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED");

    if (user.role !== "admin") {
      alert("Only admins can submit entities");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending request...", formData);
      if (editingId) {
        await axios.put(
          `http://localhost:3000/api/entities/${editingId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3000/api/entities", formData);
      }
      console.log("SUCCESS"); 

      await fetchEntities();

      setFormData({
        name: "",
        industry: "",
        industryNote: "",
        description: "",
      });

      setEditingId(null);
      setActiveTab("list");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save entity");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entity) => {
    setFormData({
      name: entity.name,
      industry: entity.industry,
      industryNote: entity.industryNote || entity.industry,
      description: entity.description,
    });
    setEditingId(entity._id);
    setActiveTab("form");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entity?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/entities/${id}`);
      fetchEntities();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6 px-6 lg:px-12 max-w-7xl mx-auto">
  
      <div>
        <h2 className="text-2xl font-bold ">Entity Data Onboarding</h2>
        <p className="text-gray-600">
          Create and manage organization entities
        </p>
      </div>

   
      <div className="border-b border-white/40 flex gap-6">
        <button
          onClick={() => setActiveTab("form")}
          className={`pb-2 font-medium ${activeTab === "form"
              ? "border-b-2 border-emerald-600 text-emerald-600"
              : "text-gray-500"
            }`}
        >
          Form
        </button>

        <button
          onClick={() => setActiveTab("list")}
          className={`pb-2 font-medium ${activeTab === "list"
              ? "border-b-2 border-emerald-600 text-emerald-600"
              : "text-gray-500"
            }`}
        >
          Submitted Entries
        </button>
      </div>

     
      {activeTab === "form" && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl border border-white/40 shadow-xl space-y-6
           " //style={{
          //        backgroundImage: `url(${bgImage})`,
          //      }}
        >
         
          <div>
            <label className="block text-sm font-medium mb-1">
              Entity Name
            </label>
            <input
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              disabled={isFormDisabled}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <p className="text-xs text-gray-500 mt-1">Enter name of your business</p>
          </div>

         
          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              disabled={isFormDisabled}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select Industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select your industry.
            </p>
          </div>

        
          {formData.industry && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Industry Notes
              </label>
              <input
                name="industryNote"
                value={formData.industryNote}
                onChange={handleChange}
                disabled={isFormDisabled}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <p className="text-xs text-gray-500 mt-1">
              Add additional information.
            </p>
            </div>
          )}

         
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter any additional Information about your business!"
              value={formData.description}
              onChange={handleChange}
              disabled={isFormDisabled}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

         
          {user?.role === "admin" ? (
            <button
              disabled={loading}
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700"
            >
              {loading
                ? "Saving..."
                : editingId
                  ? "Update Entity"
                  : "Create Entity"}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <EyeOff size={18} />
              Read-only access (Admin only)
            </div>
          )}
        </form>
      )}

     
      {activeTab === "list" && (
        <div className="bg-white rounded-xl border border-white/50 shadow-xl overflow-hidden">
          <div className="flex justify-between items-center px-5 py-3 border-b border-white/50 ">
            <h3 className="border-b-2 border-emerald-600 pb-1">Submitted Entities</h3>
            <button onClick={fetchEntities}>
              <RefreshCw size={18} />
            </button>
          </div>

          {entities.length === 0 ? (
            <p className="text-center py-6 text-gray-500">
              No entries submitted yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Industry</th>
                  <th className="text-left p-3">Industry Notes</th>
                  <th className="text-left p-3">Description</th>
                  {user?.role === "admin" && (
                    <th className="text-left p-3">Actions</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {entities.map((e) => (
                  <tr key={e._id} className="border-t">
                    <td className="p-3">{e.name}</td>
                    <td className="p-3">{e.industry}</td>
                    <td className="p-3">{e.industryNote}</td>
                    <td className="p-3">{e.description}</td>

                    {user?.role === "admin" && (
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(e)}
                          className="text-emerald-600"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(e._id)}
                          className="text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ESG;
