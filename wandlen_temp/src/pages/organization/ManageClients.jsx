import React, { useContext, useEffect, useState } from "react";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";
import Footer from "../../components/Footer";
import { useTranslation } from "react-i18next";
import HandHold from "../../assets/HandHold.png";
import RoutesNearYou from "../../components/common/RoutesNearYou";
import toast from "react-hot-toast";

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [orgData, setOrgData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const { DATABASE_URL } = useContext(DatabaseContext);
  const { t } = useTranslation();
  const sessionId = localStorage.getItem("sessionId");
  const orgId = localStorage.getItem("userId");

  const getAllClients = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/org/getClients/${orgId}`, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });
      setClients(res.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const getOrgData = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/org/getOrg/${orgId}`, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });
      setOrgData(res.data.org); // Fix: Access the nested 'org' key
    } catch (error) {
      console.error("Error fetching org data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getAllClients(), getOrgData()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (orgData) {
      setFirstName(orgData.orgName || "Organization");
    }
  }, [orgData]);

  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
  });

  const [editingClientId, setEditingClientId] = useState(null); // New state for editing

  const [activeTab, setActiveTab] = useState("clients");

  const handleInputChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleAddClient = async () => {
    // Check if client limit is reached before attempting to add
    if (orgData && clients.length >= orgData.clientLimit && !editingClientId) {
      toast.error(t("manageClients.cannotAddMoreClients"));
      return;
    }
    try {
      if (editingClientId) {
        // Update existing client
        const res = await axios.put(
          `${DATABASE_URL}/org/editClient/${editingClientId}`,
          {
            firstName: newClient.firstName,
            lastName: newClient.lastName,
            email: newClient.email,
            phoneNo: newClient.phoneNo,
            startDate: orgData.planValidFrom,
            endDate: orgData.planValidTo,
          },
          {
            headers: { Authorization: `Bearer ${sessionId}` },
          }
        );
        if (res.status === 200) {
          toast.success(t("manageClients.clientUpdatedSuccess"));
          setClients(
            clients.map((client) =>
              client._id === editingClientId
                ? { ...client, ...newClient }
                : client
            )
          );
          setEditingClientId(null);
          setNewClient({
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            password: "",
          });
        }
      } else {
        // Add new client
        const randomPassword = Math.random().toString(36).slice(-8);
        const res = await axios.post(
          `${DATABASE_URL}/org/addClient`,
          {
            firstName: newClient.firstName,
            lastName: newClient.lastName,
            email: newClient.email,
            password: randomPassword,
            orgId: orgId,
            phoneNo: newClient.phoneNo,
            startDate: orgData.planValidFrom,
            endDate: orgData.planValidTo,
          },
          {
            headers: { Authorization: `Bearer ${sessionId}` },
          }
        );

        if (res.status === 201) {
          toast.success(t("manageClients.clientAddedSuccess"));
          setNewClient({
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            password: "",
          });
          setClients([...clients, res.data.newClient]);
        }
      }
    } catch (error) {
      console.error("Error adding/updating client:", error);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(`${DATABASE_URL}/org/deleteClient/${id}`, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });
      setClients(clients.filter((client) => client._id !== id)); // Remove from local state after successful delete
      toast.success(t("manageClients.clientDeletedSuccess"));
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error(t("manageClients.clientDeleteError"));
    }
  };

  const handleEditClient = (client) => {
    setEditingClientId(client._id);
    setNewClient({
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phoneNo: client.phoneNo,
      password: "",
    });
  };

  const handleCheckboxChange = (id) => {
    setClients(
      clients.map(
        (client) =>
          client._id === id ? { ...client, checked: !client.checked } : client // Fix: Use _id
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#ede4dc]">
      <div className="relative w-full h-[86vh] flex items-center justify-center mb-10">
        {/* Background Image */}
        <img
          src={HandHold}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay Filter */}
        <div className="absolute inset-0 bg-[#2A341F] opacity-55"></div>

        {/* Centered Text */}
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <div className="flex flex-col justify-center items-center gap-2.5">
            <div className="welcome text-[#ede4dc] text-center font-['Poppins'] text-8xl font-semibold leading-[136%]">
              {t("manageClients.welcome")}
            </div>
            <div className="flex items-center gap-1">
              <div className="text-[#a6a643] font-['Poppins'] text-8xl font-semibold leading-[normal]">
                {firstName}
              </div>
              <div className="text text-[#ede4dc] text-center font-['Poppins'] text-8xl font-semibold leading-[136%]">
                !
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mb-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#dd9219] mb-2">
            {t("manageClients.organization")}
          </h1>
          <h2 className="text-5xl font-medium text-[#381207]">
            {t("manageClients.manageTitle")}
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex bg-[#e5e3df] rounded-lg p-1 mb-8 w-fit shadow-md mx-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "overview"
                ? "bg-[#381207] text-white"
                : "text-[#381207] hover:bg-gray-200"
            }`}
          >
            {t("manageClients.overview")}
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === "clients"
                ? "bg-[#381207] text-white"
                : "text-[#381207] hover:bg-gray-200"
            }`}
          >
            {t("manageClients.clients")}
          </button>
        </div>

        {activeTab === "overview" ? (
          <div className="flex flex-wrap items-start content-start gap-10 w-full justify-center">
            <div className="flex flex-shrink-0 items-start gap-8 p-10 w-[528px] rounded-2xl bg-[#f7f6f4]">
              <div className="flex justify-center items-center gap-2.5 p-6 rounded-full bg-[#ede4dc]">
                <svg
                  width={40}
                  height={40}
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M36.4636 3.58203L34.4636 4.2487C31.036 5.43961 27.3758 5.80506 23.7803 5.31536C20.0022 4.72905 16.1352 5.25006 12.647 6.81536C10.7978 7.60278 9.17491 8.84022 7.92611 10.415C6.67731 11.9899 5.84226 13.852 5.49698 15.832C5.14576 17.7361 5.18169 19.6914 5.60262 21.5813C6.02355 23.4712 6.82087 25.257 7.94698 26.832C7.84698 27.182 7.74698 27.532 7.66365 27.882C6.98672 30.7604 6.65107 33.7085 6.66365 36.6654H9.99698C10.1554 34.2453 10.484 31.8393 10.9803 29.4654C13.2927 30.714 15.8859 31.3509 18.5136 31.3154C20.9644 31.3137 23.39 30.8206 25.647 29.8654C38.3303 24.4487 36.6636 6.43203 36.6636 5.68203L36.4636 3.58203ZM24.347 26.7987C19.997 28.6487 14.797 28.332 11.8803 26.0487C12.3734 24.4005 13.0498 22.8128 13.897 21.3154C14.556 20.238 15.333 19.2373 16.2136 18.332C17.1138 17.4173 18.1277 16.622 19.2303 15.9654C21.5088 14.603 24.0357 13.7078 26.6636 13.332V11.6654C23.6398 11.5588 20.6342 12.1759 17.897 13.4654C15.0986 14.8327 12.725 16.9356 11.0303 19.5487C10.4019 20.547 9.84498 21.5885 9.36365 22.6654C8.59119 20.6893 8.37222 18.54 8.73032 16.4487C8.96494 14.9846 9.56848 13.6043 10.4841 12.438C11.3996 11.2716 12.5971 10.3576 13.9636 9.78203C15.9558 8.84904 18.1305 8.37083 20.3303 8.38203C21.3636 8.38203 22.3803 8.48203 23.447 8.56536C26.7875 8.99637 30.1792 8.79852 33.447 7.98203C33.3303 12.582 32.497 23.332 24.347 26.7987Z"
                    fill="#DD9219"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col items-start gap-2">
                  <div className="w-[18.5625rem] text-[#381207] font-['Poppins'] text-2xl font-medium leading-[normal]">
                    {t("manageClients.totalClientsAdded")}
                  </div>
                  <div className="flex flex-col justify-center self-stretch h-10 text-[#381207] font-['Poppins'] text-[2rem] font-medium leading-[normal]">
                    {clients.length}
                  </div>
                </div>
                <div className="text-[#381207] font-['Poppins'] text-lg leading-[normal]">
                  {t("manageClients.peopleYouCareFor")}
                </div>
              </div>
            </div>
            <div className="flex flex-shrink-0 items-start gap-8 p-10 w-[528px] rounded-2xl bg-[#f7f6f4]">
              <div className="flex items-center gap-2.5 p-6 rounded-full bg-[#ede4dc]">
                <svg
                  width={40}
                  height={40}
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 5.34884C19.5388 5.34844 19.0876 5.49082 18.7016 5.75852C18.3157 6.02622 18.0118 6.40759 17.8274 6.85581L17.4137 7.86047H8.15789V34.6512H31.8421V7.86047H22.5863L22.1726 6.85581C21.9882 6.40759 21.6843 6.02622 21.2984 5.75852C20.9124 5.49082 20.4612 5.34844 20 5.34884ZM15.4653 4.51163C15.9743 3.7364 16.6525 3.10315 17.4421 2.66583C18.2316 2.22851 19.1092 2.00008 20 2C21.8789 2 23.5368 2.9946 24.5347 4.51163H35V38H5V4.51163H15.4653ZM20 14.5581C19.3719 14.5581 18.7694 14.8228 18.3253 15.2938C17.8811 15.7648 17.6316 16.4036 17.6316 17.0698C17.6316 17.7359 17.8811 18.3747 18.3253 18.8458C18.7694 19.3168 19.3719 19.5814 20 19.5814C20.6281 19.5814 21.2306 19.3168 21.6747 18.8458C22.1189 18.3747 22.3684 17.7359 22.3684 17.0698C22.3684 16.4036 22.1189 15.7648 21.6747 15.2938C21.2306 14.8228 20.6281 14.5581 20 14.5581ZM14.4737 17.0698C14.4737 16.3002 14.6166 15.5381 14.8944 14.8271C15.1721 14.116 15.5791 13.47 16.0923 12.9258C16.6055 12.3816 17.2147 11.9499 17.8852 11.6554C18.5557 11.3609 19.2743 11.2093 20 11.2093C20.7257 11.2093 21.4443 11.3609 22.1148 11.6554C22.7853 11.9499 23.3945 12.3816 23.9077 12.9258C24.4209 13.47 24.8279 14.116 25.1057 14.8271C25.3834 15.5381 25.5263 16.3002 25.5263 17.0698C25.5263 18.6241 24.9441 20.1147 23.9077 21.2137C22.8713 22.3128 21.4657 22.9302 20 22.9302C18.5343 22.9302 17.1287 22.3128 16.0923 21.2137C15.0559 20.1147 14.4737 18.6241 14.4737 17.0698ZM10.5263 31.3023C10.5263 29.526 11.1917 27.8224 12.3762 26.5664C13.5606 25.3103 15.1671 24.6047 16.8421 24.6047H23.1579C24.8329 24.6047 26.4394 25.3103 27.6238 26.5664C28.8083 27.8224 29.4737 29.526 29.4737 31.3023V32.9767H26.3158V31.3023C26.3158 30.4142 25.9831 29.5624 25.3909 28.9343C24.7986 28.3063 23.9954 27.9535 23.1579 27.9535H16.8421C16.0046 27.9535 15.2014 28.3063 14.6091 28.9343C14.0169 29.5624 13.6842 30.4142 13.6842 31.3023V32.9767H10.5263V31.3023Z"
                    fill="#DD9219"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col items-start gap-2">
                  <div className="w-[18.5625rem] text-[#381207] font-['Poppins'] text-2xl font-medium leading-[normal]">
                    {t("manageClients.totalUsersAllowed")}
                  </div>
                  <div className="flex flex-col justify-center self-stretch h-10 text-[#381207] font-['Poppins'] text-[2rem] font-medium leading-[normal]">
                    {orgData?.clientLimit}
                  </div>
                </div>
                <div className="text-[#381207] font-['Poppins'] text-lg leading-[normal]">
                  {t("manageClients.totalActiveUsers")}
                </div>
              </div>
            </div>
            <div className="flex flex-shrink-0 items-start gap-8 p-10 w-[528px] rounded-2xl bg-[#f7f6f4]">
              <div className="flex items-center gap-2.5 p-6 rounded-full bg-[#ede4dc]">
                <svg
                  width={40}
                  height={40}
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.0026 30.8333C20.8359 30.8333 17.2026 28.4667 15.4026 25H25.0026L26.6693 21.6667H14.3026C14.2193 21.1167 14.1693 20.5667 14.1693 20C14.1693 19.4333 14.2193 18.8833 14.3026 18.3333H25.0026L26.6693 15H15.4026C16.3152 13.2419 17.6931 11.7681 19.386 10.7394C21.0789 9.71076 23.0217 9.16673 25.0026 9.16667C27.6859 9.16667 30.1526 10.15 32.0526 11.7833L35.0026 8.83334C32.2579 6.36314 28.6952 4.99746 25.0026 5C18.4693 5 12.9359 9.16667 10.8359 15H5.0026L3.33594 18.3333H10.1026C10.0026 18.8833 10.0026 19.4333 10.0026 20C10.0026 20.5667 10.0026 21.1167 10.1026 21.6667H5.0026L3.33594 25H10.8359C12.9359 30.8333 18.4693 35 25.0026 35C28.8526 35 32.3526 33.55 35.0026 31.1667L32.0359 28.2167C30.1526 29.85 27.7026 30.8333 25.0026 30.8333Z"
                    fill="#DD9219"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col items-start gap-2">
                  <div className="w-[18.5625rem] text-[#381207] font-['Poppins'] text-2xl font-medium leading-[normal]">
                    {t("manageClients.totalAmountPaid")}
                  </div>
                  <div className="flex flex-col justify-center self-stretch h-10 text-[#381207] font-['Poppins'] text-[2rem] font-medium leading-[normal]">
                    {orgData?.amountPaid}
                  </div>
                </div>
                <div className="text-[#381207] font-['Poppins'] text-lg leading-[normal]">
                  {t("manageClients.revenueToDate")}
                </div>
              </div>
            </div>
            <div className="flex flex-shrink-0 items-start gap-8 p-10 w-[528px] rounded-2xl bg-[#f7f6f4]">
              <div className="flex flex-shrink-0 justify-center items-center gap-2.5 p-6 w-[5.5rem] h-[5.5rem] rounded-full bg-[#ede4dc]">
                <svg
                  width={40}
                  height={40}
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 5C25.9205 5 26.6667 5.7462 26.6667 6.66667V13.3333C26.6667 14.2538 25.9205 15 25 15H21.6667V18.3333H28.3333C29.2538 18.3333 30 19.0795 30 20V25H33.3333C34.2538 25 35 25.7462 35 26.6667V33.3333C35 34.2538 34.2538 35 33.3333 35H23.3333C22.4128 35 21.6667 34.2538 21.6667 33.3333V26.6667C21.6667 25.7462 22.4128 25 23.3333 25H26.6667V21.6667H13.3333V25H16.6667C17.5872 25 18.3333 25.7462 18.3333 26.6667V33.3333C18.3333 34.2538 17.5872 35 16.6667 35H6.66667C5.7462 35 5 34.2538 5 33.3333V26.6667C5 25.7462 5.7462 25 6.66667 25H10V20C10 19.0795 10.7462 18.3333 11.6667 18.3333H18.3333V15H15C14.0795 15 13.3333 14.2538 13.3333 13.3333V6.66667C13.3333 5.7462 14.0795 5 15 5H25ZM15 28.3333H8.33333V31.6667H15V28.3333ZM31.6667 28.3333H25V31.6667H31.6667V28.3333ZM23.3333 8.33333H16.6667V11.6667H23.3333V8.33333Z"
                    fill="#DD9219"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col items-start gap-2">
                  <div className="w-[18.5625rem] text-[#381207] font-['Poppins'] text-2xl font-medium leading-[normal]">
                    {t("manageClients.nameOfOrganisation")}
                  </div>
                  <div className="flex flex-col justify-center self-stretch h-10 text-[#381207] font-['Poppins'] text-[2rem] font-medium leading-[normal]">
                    {orgData?.orgName || "Health.Up"}
                  </div>
                </div>
                <div className="text-[#381207] font-['Poppins'] text-lg leading-[normal]">
                  {orgData?.email || "health.up@gmail.com"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Add New Client Section - Conditionally Rendered */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {isLoading ? (
                <div className="text-center">
                  <p className="text-[#381207]">
                    {t("manageClients.loadingData")}
                  </p>
                </div>
              ) : orgData ? (
                clients.length >= orgData.clientLimit && !editingClientId ? (
                  <div className="text-center">
                    <h3 className="text-2xl font-medium text-[#381207] mb-2">
                      {t("manageClients.clientLimitReached")}
                    </h3>
                    <p className="text-[#381207]">
                      {t("manageClients.contactAdmin")}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-2xl font-medium text-[#381207] mb-2">
                        {editingClientId
                          ? t("manageClients.editClient")
                          : t("manageClients.addNewClient")}
                      </h3>
                      <p className="text-[#381207]">
                        {editingClientId
                          ? t("manageClients.editClientDescription")
                          : t("manageClients.addClientDescription")}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-[#7a756e] font-medium mb-2">
                          {t("manageClients.firstName")}
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={newClient.firstName}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                          placeholder={t("manageClients.firstName")}
                        />
                      </div>
                      <div>
                        <label className="block text-[#7a756e] font-medium mb-2">
                          {t("manageClients.lastName")}
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={newClient.lastName}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                          placeholder={t("manageClients.lastName")}
                        />
                      </div>
                      <div>
                        <label className="block text-[#7a756e] font-medium mb-2">
                          {t("manageClients.email")}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={newClient.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                          placeholder={t("manageClients.email")}
                        />
                      </div>
                      <div>
                        <label className="block text-[#7a756e] font-medium mb-2">
                          {t("manageClients.phoneNo")}
                        </label>
                        <input
                          type="text"
                          name="phoneNo"
                          value={newClient.phoneNo}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-[#b3b1ac] bg-[#f7f6f4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a341f]"
                          placeholder={t("manageClients.phoneNo")}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleAddClient}
                      className="px-6 py-3 bg-[#a6a643] text-white rounded-lg hover:bg-[#8b8b3a] transition font-medium"
                    >
                      {editingClientId
                        ? t("manageClients.updateClient")
                        : t("manageClients.addClient")}
                    </button>
                    {editingClientId && (
                      <button
                        onClick={() => {
                          setEditingClientId(null);
                          setNewClient({
                            firstName: "",
                            lastName: "",
                            email: "",
                            phoneNo: "",
                            password: "",
                          });
                        }}
                        className="ml-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
                      >
                        {t("manageClients.cancel")}
                      </button>
                    )}
                  </>
                )
              ) : (
                <div className="text-center">
                  <p className="text-[#381207]">
                    {t("manageClients.errorLoadingData")}
                  </p>
                </div>
              )}
            </div>
            {/* Clients Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#a6a643]/20 border-b border-[#d9bbaa]">
                      <th className="px-6 py-4 text-left">
                        <input type="checkbox" className="w-4 h-4" />
                      </th>
                      <th className="px-6 py-4 text-left text-[#2a341f] font-medium">
                        {t("manageClients.fullName")}
                      </th>
                      <th className="px-6 py-4 text-left text-[#2a341f] font-medium">
                        {t("manageClients.phoneNumber")}
                      </th>
                      <th className="px-6 py-4 text-left text-[#2a341f] font-medium">
                        {t("manageClients.emailId")}
                      </th>
                      <th className="px-6 py-4 text-left text-[#2a341f] font-medium">
                        {t("manageClients.generatedPassword")}
                      </th>
                      <th className="px-6 py-4 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <tr
                        key={client._id} // Fix: Use _id for unique key
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-[#ede4dc]"
                        }
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={client.checked}
                            onChange={() => handleCheckboxChange(client._id)} // Already using _id
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="px-6 py-4 text-[#381207]">
                          {client.firstName} {client.lastName}
                        </td>
                        <td className="px-6 py-4 text-[#381207]">
                          {client.phoneNo}
                        </td>
                        <td className="px-6 py-4 text-[#381207]">
                          {client.email}
                        </td>
                        <td className="px-6 py-4 text-[#381207]">
                          {client.plainPassword}
                        </td>
                        <td className="px-6 py-4 flex space-x-2">
                          <button
                            onClick={() => handleEditClient(client)}
                            className="text-[#381207] hover:text-[#5b6502] transition"
                          >
                            {t("manageClients.edit")}
                          </button>
                          <button
                            onClick={() => handleDeleteClient(client._id)} // Already using _id
                            className="text-[#381207] hover:text-red-600 transition"
                          >
                            <svg
                              width={17}
                              height={16}
                              viewBox="0 0 17 16"
                              fill="none"
                            >
                              <path
                                d="M4.5026 12.6667C4.5026 13.0203 4.64308 13.3594 4.89313 13.6095C5.14318 13.8595 5.48232 14 5.83594 14H11.1693C11.5229 14 11.862 13.8595 12.1121 13.6095C12.3621 13.3594 12.5026 13.0203 12.5026 12.6667V4.66667H4.5026V12.6667ZM5.83594 6H11.1693V12.6667H5.83594V6ZM10.8359 2.66667L10.1693 2H6.83594L6.16927 2.66667H3.83594V4H13.1693V2.66667H10.8359Z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <RoutesNearYou />
      <Footer />
    </div>
  );
};

export default ManageClients;
