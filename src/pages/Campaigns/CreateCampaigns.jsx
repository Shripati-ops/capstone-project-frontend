import React, { useState } from "react";
import axiosPrivateInstance from "../../utils/axiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateCampaignPage = () => {
  // Define state variables to hold form data
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState(0);
  const [owner, setOwner] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const campaignPayload = {
      campaign_name: name,
      campaign_type: type,
      start_date: startDate,
      end_date: endDate,
      budget: parseInt(budget),
      owner,
      notes,
    };

    // Process form data here
    console.log("Form submitted:", campaignPayload);

    const result = await axiosPrivateInstance.post(
      "/campaigns/add_campaign",
      campaignPayload
    );
    if (result.status == 200) {
      toast("Campaign Created Successfully");
      setTimeout(() => {
        navigate("/campaigns");
      }, 2000);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create Campaign</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="campaign_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Type
          </label>
          <input
            type="text"
            id="campaign_type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Date
          </label>
          <input
            type="datetime-local"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Date
          </label>
          <input
            type="datetime-local"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Owner
          </label>
          <input
            type="text"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Budget
          </label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="col-span-2">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-textarea w-full"
            rows="4"
          ></textarea>
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Create Campaign
          </button>
        </div>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CreateCampaignPage;
