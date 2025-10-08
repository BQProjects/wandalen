import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import toast from "react-hot-toast";

const VolunteerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { DATABASE_URL } = useContext(DatabaseContext);
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${DATABASE_URL}/admin/volunteer/${id}`
        );
        setVolunteer(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching volunteer data:", err);
        setError("Failed to load volunteer details");
        setLoading(false);
      }
    };

    if (id) {
      fetchVolunteerData();
    }
  }, [id, DATABASE_URL]);

  const handleBack = () => {
    navigate("/admin/manage-volunteer");
  };

  const handleConfirm = async () => {
    try {
      await axios.put(`${DATABASE_URL}/volunteer/${id}/confirm`, {
        status: "confirmed",
      });
      toast.success("Volunteer confirmed successfully!");
    } catch (err) {
      console.error("Error confirming volunteer:", err);
      toast.error("Failed to confirm volunteer");
    }
  };

  if (loading)
    return <div className="flex-1 p-6">Loading volunteer details...</div>;
  if (error) return <div className="flex-1 p-6 text-red-500">{error}</div>;
  if (!volunteer) return <div className="flex-1 p-6">Volunteer not found</div>;

  return (
    <div className="flex-1 bg-white p-6 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBack}
          className="text-[#381207] hover:text-[#a6a643]"
        >
          <svg
            width={25}
            height={50}
            viewBox="0 0 25 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.8936 13.707L17.6832 11.4987L5.64365 23.5341C5.44957 23.727 5.29556 23.9563 5.19046 24.2089C5.08536 24.4615 5.03125 24.7324 5.03125 25.006C5.03125 25.2796 5.08536 25.5505 5.19046 25.8031C5.29556 26.0557 5.44957 26.285 5.64365 26.4779L17.6832 38.5195L19.8916 36.3112L8.59156 25.0091L19.8936 13.707Z"
              fill="#381207"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold text-[#381207] font-['Poppins']">
          Volunteer Details with Meeting Details
        </h1>
      </div>

      {/* Side by Side Container for Volunteer Details and Practical Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Volunteer Details */}
        <div className="mb-10 md:mb-0">
          <div className="p-6 rounded-2xl bg-[#ede4dc]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-[#4b4741] font-['Poppins']">First name</p>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {volunteer.firstName}
                  </p>
                </div>
                <div>
                  <p className="text-[#4b4741] font-['Poppins']">
                    Phone number
                  </p>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {volunteer.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[#4b4741] font-['Poppins']">Last Name</p>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {volunteer.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-[#4b4741] font-['Poppins']">
                    Contact Email
                  </p>
                  <p className="text-[#381207] font-['Poppins'] text-lg">
                    {volunteer.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-[#4b4741] font-['Poppins']">Address</p>
              <p className="text-[#381207] font-['Poppins'] text-lg">
                {volunteer.address}
              </p>
            </div>
            <div className="mt-6">
              <p className="text-[#4b4741] font-['Poppins']">Note</p>
              <p className="text-[#381207] font-['Poppins'] text-lg">
                {volunteer.notes || "No notes provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Practical Information */}
        <div className="p-6 rounded-2xl bg-[#381207] text-white">
          <h2 className="text-2xl font-semibold mb-6 font-['Poppins']">
            Practical Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <svg
                width={50}
                height={50}
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 6.25078C21.1323 6.25078 17.4229 7.78723 14.688 10.5221C11.9531 13.257 10.4167 16.9664 10.4167 20.8341C10.4167 26.7966 14.1292 32.5487 18.2042 37.0049C20.2878 39.275 22.5613 41.3631 25 43.2466C25.3639 42.9674 25.791 42.6272 26.2812 42.2258C28.2392 40.618 30.0819 38.8748 31.7958 37.0091C35.8708 32.5487 39.5833 26.7987 39.5833 20.8341C39.5833 16.9664 38.0469 13.257 35.312 10.5221C32.5771 7.78723 28.8677 6.25078 25 6.25078ZM25 48.3633L23.8187 47.5508L23.8125 47.5466L23.8 47.5362L23.7583 47.507L23.6021 47.3966L23.0396 46.9862C20.1893 44.8441 17.5414 42.4452 15.1292 39.8195C10.8708 35.157 6.25 28.4091 6.25 20.832C6.25 15.8592 8.22544 11.0901 11.7417 7.57378C15.2581 4.05747 20.0272 2.08203 25 2.08203C29.9728 2.08203 34.7419 4.05747 38.2583 7.57378C41.7746 11.0901 43.75 15.8592 43.75 20.832C43.75 28.4091 39.1292 35.1591 34.8708 39.8154C32.4593 42.4409 29.8121 44.8398 26.9625 46.982C26.7251 47.1593 26.4855 47.3337 26.2437 47.5049L26.2 47.5341L26.1875 47.5445L26.1833 47.5466L25 48.3633ZM25 16.6674C23.8949 16.6674 22.8351 17.1064 22.0537 17.8878C21.2723 18.6692 20.8333 19.729 20.8333 20.8341C20.8333 21.9392 21.2723 22.999 22.0537 23.7804C22.8351 24.5618 23.8949 25.0008 25 25.0008C26.1051 25.0008 27.1649 24.5618 27.9463 23.7804C28.7277 22.999 29.1667 21.9392 29.1667 20.8341C29.1667 19.729 28.7277 18.6692 27.9463 17.8878C27.1649 17.1064 26.1051 16.6674 25 16.6674ZM16.6667 20.8341C16.6667 18.624 17.5446 16.5044 19.1074 14.9416C20.6702 13.3788 22.7899 12.5008 25 12.5008C27.2101 12.5008 29.3298 13.3788 30.8926 14.9416C32.4554 16.5044 33.3333 18.624 33.3333 20.8341C33.3333 23.0443 32.4554 25.1639 30.8926 26.7267C29.3298 28.2895 27.2101 29.1674 25 29.1674C22.7899 29.1674 20.6702 28.2895 19.1074 26.7267C17.5446 25.1639 16.6667 23.0443 16.6667 20.8341Z"
                  fill="#EDE4DC"
                />
              </svg>
              <div>
                <p className="text-2xl font-semibold font-['Poppins']">
                  Location
                </p>
                <p className="text-xl font-medium font-['Poppins']">
                  {volunteer.address || "Location not specified"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg
                width={50}
                height={50}
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.9974 4.16797C36.5036 4.16797 45.8307 13.4951 45.8307 25.0013C45.8307 36.5075 36.5036 45.8346 24.9974 45.8346C13.4911 45.8346 4.16406 36.5075 4.16406 25.0013C4.16406 13.4951 13.4911 4.16797 24.9974 4.16797ZM24.9974 8.33464C20.5771 8.33464 16.3379 10.0906 13.2123 13.2162C10.0867 16.3418 8.33073 20.581 8.33073 25.0013C8.33073 29.4216 10.0867 33.6608 13.2123 36.7864C16.3379 39.912 20.5771 41.668 24.9974 41.668C29.4177 41.668 33.6569 39.912 36.7825 36.7864C39.9081 33.6608 41.6641 29.4216 41.6641 25.0013C41.6641 20.581 39.9081 16.3418 36.7825 13.2162C33.6569 10.0906 29.4177 8.33464 24.9974 8.33464ZM24.9974 12.5013C25.5077 12.5014 26.0002 12.6887 26.3815 13.0278C26.7628 13.3669 27.0064 13.8341 27.0661 14.3409L27.0807 14.5846V24.1388L32.7203 29.7784C33.094 30.1533 33.3109 30.6564 33.327 31.1854C33.3432 31.7145 33.1574 32.2299 32.8073 32.6269C32.4572 33.0239 31.9692 33.2728 31.4422 33.323C30.9153 33.3732 30.389 33.2209 29.9703 32.8971L29.7745 32.7242L23.5245 26.4742C23.2007 26.1501 22.9927 25.7284 22.9328 25.2742L22.9141 25.0013V14.5846C22.9141 14.0321 23.1336 13.5022 23.5243 13.1115C23.915 12.7208 24.4449 12.5013 24.9974 12.5013Z"
                  fill="#EDE4DC"
                />
              </svg>
              <div>
                <p className="text-2xl font-semibold font-['Poppins']">
                  Postal Code
                </p>
                <p className="text-xl font-medium font-['Poppins']">
                  {volunteer.postal || "Postal code not specified"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            {volunteer.status !== "confirmed" && (
              <button
                onClick={handleConfirm}
                className="px-6 py-3 rounded-lg bg-[#a6a643] text-[#381207] font-['Poppins'] font-medium hover:bg-[#8f9b3a]"
              >
                Confirm
              </button>
            )}
            {volunteer.status === "confirmed" && (
              <span className="px-6 py-3 rounded-lg bg-[#5b6502] text-white font-['Poppins'] font-medium">
                Already Confirmed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDetail;
