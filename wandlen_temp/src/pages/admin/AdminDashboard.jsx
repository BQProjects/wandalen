import React, { useState, useEffect, useContext } from "react";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import axios from "axios";

const AdminDashboard = () => {
  const { DATABASE_URL } = useContext(DatabaseContext);
  const [stats, setStats] = useState({
    organizations: 0,
    families: 0,
    volunteers: 0,
    videos: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = localStorage.getItem("sessionId");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [orgsRes, clientsRes, volunteersRes, videosRes] = await Promise.all(
        [
          axios.get(`${DATABASE_URL}/admin/all-orgs`, {
            headers: { Authorization: `Bearer ${sessionId}` },
          }),
          axios.get(`${DATABASE_URL}/admin/all-clients`, {
            headers: { Authorization: `Bearer ${sessionId}` },
          }),
          axios.get(`${DATABASE_URL}/admin/all-volunteers`, {
            headers: { Authorization: `Bearer ${sessionId}` },
          }),
          axios.get(`${DATABASE_URL}/admin/all-videos?limit=1`, {
            headers: { Authorization: `Bearer ${sessionId}` },
          }),
        ]
      );

      setStats({
        organizations: orgsRes.data.length,
        families: clientsRes.data.length,
        volunteers: volunteersRes.data.length,
        videos: videosRes.data.total || 0,
      });
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError("Dashboardgegevens laden mislukt");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-[#f7f6f4] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a6a643] mx-auto mb-4"></div>
          <p className="text-[#381207] font-['Poppins']">Dashboard laden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-[#f7f6f4] p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-['Poppins'] mb-4">{error}</p>
          <button
            onClick={fetchStats}
            className="bg-[#a6a643] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#8b8b3a] transition-colors"
          >
            Probeer opnieuw
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Admin Dashboard
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Beheer zorgorganisaties, families, vrijwilligers en alle
          platformactiviteiten op één plek.
        </p>
      </div>

      {/* RFQ Section */}
      <div className="bg-[#ede4dc] rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-medium text-[#381207] font-['Poppins'] mb-2">
            RFQ inzendingen bekijken
          </h2>
          <p className="text-lg text-[#381207] font-['Poppins']">
            Nieuwe verzoeken volgen en uw reacties naadloos beheren.
          </p>
        </div>
        <button
          className="bg-[#a6a643] text-white px-4 py-2 rounded-lg text-xl font-medium hover:bg-[#959837] transition-colors"
          onClick={() => {
            window.location.href = "/admin/manage";
          }}
        >
          Offertes beheren
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {/* Total Care Organization */}
        <div className="bg-[#ede4dc] rounded-2xl p-6 flex items-center gap-6">
          <div className="flex justify-center items-center p-6 rounded-full bg-[#eddbba]">
            <svg
              width={40}
              height={40}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.3174 33.25C35.9507 33.6223 36.6131 34.3796 37.1211 35.2881C37.5237 36.0081 37.798 36.7745 37.8955 37.4453H31.167C31.2645 36.7742 31.5394 36.0075 31.9424 35.2871C32.4508 34.3783 33.1136 33.6218 33.7471 33.25L34.5322 32.7881L35.3174 33.25ZM20.7861 33.25C21.4194 33.6223 22.0818 34.3796 22.5898 35.2881C22.9925 36.0081 23.2668 36.7745 23.3643 37.4453H16.6357C16.7333 36.7742 17.0081 36.0075 17.4111 35.2871C17.9195 34.3783 18.5823 33.6218 19.2158 33.25L20.001 32.7881L20.7861 33.25ZM6.25488 33.25C6.88815 33.6223 7.55056 34.3796 8.05859 35.2881C8.46125 36.0081 8.73554 36.7745 8.83301 37.4453H2.10449C2.202 36.7742 2.47689 36.0075 2.87988 35.2871C3.38829 34.3783 4.05108 33.6218 4.68457 33.25L5.46973 32.7881L6.25488 33.25ZM5.46875 27.0244C6.6828 27.0244 7.78693 28.1901 7.78711 29.7871C7.78677 30.9613 7.16816 31.9662 6.2998 32.3652L5.47168 32.7441L4.63965 32.3633C3.77101 31.965 3.15139 30.9614 3.15039 29.7871L3.16309 29.4932C3.28045 28.1455 4.19539 27.1633 5.24219 27.0381L5.46875 27.0244ZM20 27.0244C21.214 27.0244 22.3182 28.1901 22.3184 29.7871C22.318 30.9613 21.6994 31.9662 20.8311 32.3652L20.0029 32.7441L19.1709 32.3633C18.3023 31.965 17.6826 30.9614 17.6816 29.7871L17.6943 29.4932C17.8117 28.1455 18.7266 27.1633 19.7734 27.0381L20 27.0244ZM34.5312 27.0244C35.7453 27.0244 36.8494 28.1901 36.8496 29.7871C36.8493 30.9613 36.2307 31.9662 35.3623 32.3652L34.5342 32.7441L33.7021 32.3633C32.8335 31.965 32.2139 30.9614 32.2129 29.7871L32.2256 29.4932C32.343 28.1455 33.2579 27.1633 34.3047 27.0381L34.5312 27.0244ZM20.2031 15.4619V18.665H34.7344V24.1494H34.3281V19.0713H20.2031V24.1494H19.7969V19.0713H5.67188V24.1494H5.26562V18.665H19.7969V15.4619H20.2031ZM20.7861 8.78125C21.4193 9.15366 22.0819 9.91005 22.5898 10.8184C22.9925 11.5384 23.2668 12.3048 23.3643 12.9756H16.6357C16.7333 12.3044 17.0081 11.5377 17.4111 10.8174C17.9195 9.9086 18.5823 9.15203 19.2158 8.78027L20.001 8.31836L20.7861 8.78125ZM20 2.55469C21.2141 2.55469 22.3182 3.72038 22.3184 5.31738C22.318 6.49158 21.6993 7.49652 20.8311 7.89551L20.0029 8.27441L19.1709 7.89453C18.3021 7.49633 17.6826 6.49179 17.6816 5.31738C17.6818 3.7203 18.7859 2.55469 20 2.55469Z"
                fill="#B3821C"
                stroke="#B3821C"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-medium text-[#381207] font-['Poppins'] mb-2">
              Totaal zorgorganisatie
            </h3>
            <p className="text-2xl font-medium text-[#381207] font-['Poppins'] mb-2">
              {stats.organizations}
            </p>
            <p className="text-lg text-[#381207] font-['Poppins']">
              Organisaties die momenteel patiënten ondersteunen.
            </p>
          </div>
        </div>

        {/* Total Families */}
        <div className="bg-[#ede4dc] rounded-2xl p-6 flex items-center gap-6">
          <div className="flex justify-center items-center p-6 rounded-full bg-[#eddbbb]">
            <svg
              width={40}
              height={40}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.0026 20.0013C23.6845 20.0013 26.6693 17.0165 26.6693 13.3346C26.6693 9.65274 23.6845 6.66797 20.0026 6.66797C16.3207 6.66797 13.3359 9.65274 13.3359 13.3346C13.3359 17.0165 16.3207 20.0013 20.0026 20.0013Z"
                fill="#B3821C"
              />
              <path
                d="M8.89997 28.868C10.0016 24.2146 14.6233 21.668 19.4083 21.668H20.5983C25.3833 21.668 30.005 24.213 31.1066 28.868C31.32 29.7696 31.49 30.713 31.585 31.6713C31.6766 32.588 30.9233 33.3346 30.0033 33.3346H10.0033C9.0833 33.3346 8.32997 32.5863 8.42163 31.6713C8.51663 30.713 8.68663 29.7696 8.89997 28.868Z"
                fill="#B3821C"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-medium text-[#381207] font-['Poppins'] mb-2">
              Totaal families
            </h3>
            <p className="text-2xl font-medium text-[#381207] font-['Poppins'] mb-2">
              {stats.families}
            </p>
            <p className="text-lg text-[#381207] font-['Poppins']">
              Families actief in alle plannen.
            </p>
          </div>
        </div>
      </div>

      {/* Active Volunteers */}
      <div className="bg-[#ede4dc] rounded-2xl p-6 flex items-center gap-6">
        <div className="flex justify-center items-center p-6 rounded-full bg-[#eddbba]">
          <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.3174 33.25C35.9507 33.6223 36.6131 34.3796 37.1211 35.2881C37.5237 36.0081 37.798 36.7745 37.8955 37.4453H31.167C31.2645 36.7742 31.5394 36.0075 31.9424 35.2871C32.4508 34.3783 33.1136 33.6218 33.7471 33.25L34.5322 32.7881L35.3174 33.25ZM20.7861 33.25C21.4194 33.6223 22.0818 34.3796 22.5898 35.2881C22.9925 36.0081 23.2668 36.7745 23.3643 37.4453H16.6357C16.7333 36.7742 17.0081 36.0075 17.4111 35.2871C17.9195 34.3783 18.5823 33.6218 19.2158 33.25L20.001 32.7881L20.7861 33.25ZM6.25488 33.25C6.88815 33.6223 7.55056 34.3796 8.05859 35.2881C8.46125 36.0081 8.73554 36.7745 8.83301 37.4453H2.10449C2.202 36.7742 2.47689 36.0075 2.87988 35.2871C3.38829 34.3783 4.05108 33.6218 4.68457 33.25L5.46973 32.7881L6.25488 33.25ZM5.46875 27.0244C6.6828 27.0244 7.78693 28.1901 7.78711 29.7871C7.78677 30.9613 7.16816 31.9662 6.2998 32.3652L5.47168 32.7441L4.63965 32.3633C3.77101 31.965 3.15139 30.9614 3.15039 29.7871L3.16309 29.4932C3.28045 28.1455 4.19539 27.1633 5.24219 27.0381L5.46875 27.0244ZM20 27.0244C21.214 27.0244 22.3182 28.1901 22.3184 29.7871C22.318 30.9613 21.6994 31.9662 20.8311 32.3652L20.0029 32.7441L19.1709 32.3633C18.3023 31.965 17.6826 30.9614 17.6816 29.7871L17.6943 29.4932C17.8117 28.1455 18.7266 27.1633 19.7734 27.0381L20 27.0244ZM34.5312 27.0244C35.7453 27.0244 36.8494 28.1901 36.8496 29.7871C36.8493 30.9613 36.2307 31.9662 35.3623 32.3652L34.5342 32.7441L33.7021 32.3633C32.8335 31.965 32.2139 30.9614 32.2129 29.7871L32.2256 29.4932C32.343 28.1455 33.2579 27.1633 34.3047 27.0381L34.5312 27.0244ZM20.2031 15.4619V18.665H34.7344V24.1494H34.3281V19.0713H20.2031V24.1494H19.7969V19.0713H5.67188V24.1494H5.26562V18.665H19.7969V15.4619H20.2031ZM20.7861 8.78125C21.4193 9.15366 22.0819 9.91005 22.5898 10.8184C22.9925 11.5384 23.2668 12.3048 23.3643 12.9756H16.6357C16.7333 12.3044 17.0081 11.5377 17.4111 10.8174C17.9195 9.9086 18.5823 9.15203 19.2158 8.78027L20.001 8.31836L20.7861 8.78125ZM20 2.55469C21.2141 2.55469 22.3182 3.72038 22.3184 5.31738C22.318 6.49158 21.6993 7.49652 20.8311 7.89551L20.0029 8.27441L19.1709 7.89453C18.3021 7.49633 17.6826 6.49179 17.6816 5.31738C17.6818 3.7203 18.7859 2.55469 20 2.55469Z"
              fill="#B3821C"
              stroke="#B3821C"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-medium text-[#381207] font-['Poppins'] mb-2">
            Actieve vrijwilligers
          </h3>
          <p className="text-2xl font-medium text-[#381207] font-['Poppins'] mb-2">
            {stats.volunteers}
          </p>
          <p className="text-lg text-[#381207] font-['Poppins']">
            Vrijwilligers die momenteel helpen in gemeenschappen.
          </p>
        </div>
      </div>

      {/* Total Videos */}
      <div className="bg-[#ede4dc] rounded-2xl p-6 mt-6 flex items-center gap-6">
        <div className="flex justify-center items-center p-6 rounded-full bg-[#eddbba]">
          <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 5L30 15V30H25V20H15V30H10V15L20 5Z" fill="#B3821C" />
            <path d="M15 22H25V30H15V22Z" fill="#B3821C" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-medium text-[#381207] font-['Poppins'] mb-2">
            Totaal video's
          </h3>
          <p className="text-2xl font-medium text-[#381207] font-['Poppins'] mb-2">
            {stats.videos}
          </p>
          <p className="text-lg text-[#381207] font-['Poppins']">
            Video's geüpload door vrijwilligers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
