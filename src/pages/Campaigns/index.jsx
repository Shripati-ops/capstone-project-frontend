import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosPrivateInstance from "../../utils/axiosPrivate";
const CampaignPage = () => {
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };
  useEffect(() => {
    const data = async () => {
      // setLoaded(false);
      const response = await axiosPrivateInstance.get(
        "campaigns/get_all_campaigns"
      );
      setLoaded(true);
      setCampaignData(response.data.data);
    };
    data();
    console.log(campaignData);
  }, [loaded]);
  const navigateTOCreateCampaign = () => {
    navigate("/add-campaign");
  };
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <button
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white float-right"
        onClick={navigateTOCreateCampaign}
      >
        Add Campaign
      </button>
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          All Campaigns
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Campaign Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Campaign Type</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Budget</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Start Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">End Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Owner</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Notes</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {campaignData?.allCampaigns.map((result) => {
                return (
                  <tr>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-slate-800 dark:text-slate-100">
                          {result?.campaign_name}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{result?.campaign_type}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-emerald-500">
                        ₹{result?.budget}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {formatDate(result?.startDate)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-sky-500">
                        {formatDate(result?.endDate)}
                      </div>
                    </td>

                    <td className="p-2">
                      <div className="text-center text-sky-500">
                        {result?.status || "active"}
                      </div>
                    </td>

                    <td className="p-2">
                      <div className="text-center text-sky-500">
                        {result?.owner}
                      </div>
                    </td>

                    <td className="p-2">
                      <div className="text-center text-sky-500">
                        {result?.notes || "No notes"}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CampaignPage;
