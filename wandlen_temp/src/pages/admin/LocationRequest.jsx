import React from "react";
import { useNavigate } from "react-router-dom";

const LocationRequest = () => {
  const navigate = useNavigate();

  const users = [
    {
      firstName: "John",
      lastName: "Lee",
      phone: "+31 6 1234 5678",
      email: "johnlee@gmail.com",
      isVolunteer: false,
    },
    {
      firstName: "Mark",
      lastName: "Ham",
      phone: "+31 6 1234 5678",
      email: "markham@gmail.com",
      isVolunteer: true,
    },
    {
      firstName: "Sandy",
      lastName: "Rue",
      phone: "+31 6 1234 5678",
      email: "sandyrue@gmail.com",
      isVolunteer: false,
    },
    {
      firstName: "Lisa",
      lastName: "Mona",
      phone: "+31 6 1234 5678",
      email: "lisamona@gmail.com",
      isVolunteer: false,
    },
    {
      firstName: "Betty",
      lastName: "Walt",
      phone: "+31 6 1234 5678",
      email: "bettywalt@gmail.com",
      isVolunteer: false,
    },
    {
      firstName: "Tom",
      lastName: "Harris",
      phone: "+31 6 1234 5678",
      email: "tomharris@gmail.com",
      isVolunteer: false,
    },
  ];

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-[#381207] font-['Poppins'] mb-4">
          Location Request form
        </h1>
        <p className="text-xl text-[#381207] font-['Poppins'] max-w-2xl">
          Select and add members from this location request.
        </p>
      </div>

      {/* New Form Layout */}
      <div className="inline-flex flex-col justify-center items-start rounded-[0.625rem] bg-[#ede4dc]/[.30]">
        {/* Header Row */}
        <div className="flex items-center gap-6 py-1 px-6 h-16 border-b border-b-[#d9bbaa] bg-[#a6a643]/[.2]">
          <div className="flex items-center gap-2 p-2 w-[12.5rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Email
            </div>
            <svg
              width={11}
              height={12}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66667 1.33203V10.6654M5.66667 10.6654L10.3333 5.9987M5.66667 10.6654L1 5.9987"
                stroke="#2A341F"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 p-2 w-[12.5rem]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] leading-[normal]">
              Location Details
            </div>
            <svg
              width={11}
              height={12}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66667 1.33203V10.6654M5.66667 10.6654L10.3333 5.9987M5.66667 10.6654L1 5.9987"
                stroke="#2A341F"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 p-2 w-[389px]">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] leading-[normal]">
              Google Maps Link
            </div>
            <svg
              width={11}
              height={12}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66667 1.33203V10.6654M5.66667 10.6654L10.3333 5.9987M5.66667 10.6654L1 5.9987"
                stroke="#2A341F"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 p-2">
            <div className="flex flex-col items-start gap-2 text-[#2a341f] font-['Poppins'] text-lg leading-[normal]">
              Video created
            </div>
          </div>
          <div className="mdi_delete-outline flex justify-center items-center pl-[0.1875rem] pr-[0.1875rem] p-0 w-4 h-4">
            {/* Delete icon placeholder, add SVG if needed */}
          </div>
        </div>

        {/* Data Rows */}
        {users.map((user, index) => (
          <div
            key={index}
            className={`flex items-center gap-6 self-stretch py-1 px-6 border-b border-b-[#d9bbaa] ${
              index % 2 === 0 ? "bg-[#ede4dc]" : ""
            }`}
          >
            <div className="flex items-center gap-2 pr-2 w-[12.5rem]">
              <div className="flex flex-col items-start gap-2 p-2">
                <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal]">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-2 w-[12.5rem]">
              <div className="flex flex-col items-start gap-2 p-2">
                <div className="flex flex-col items-start gap-2 text-[#381207] font-['Poppins'] leading-[136%]">
                  {user.lastName} {/* Placeholder for Location Details */}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5 p-2 w-[389px]">
              <div className="flex flex-col justify-center items-start gap-2 text-[#381207] font-['Poppins'] leading-[normal] underline">
                https://maps.app.goo.gl/example{" "}
                {/* Placeholder for Google Maps Link */}
              </div>
            </div>
            <div className="flex justify-center items-center pb-[0.5px] pt-px px-0 w-[10.0625rem] h-[1.0625rem]">
              {user.isVolunteer && (
                <svg
                  width={16}
                  height={17}
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6667 2.25H3.33333C2.97971 2.25 2.64057 2.39048 2.39052 2.64052C2.14048 2.89057 2 3.22971 2 3.58333V12.9167C2 13.2703 2.14048 13.6094 2.39052 13.8595C2.64057 14.1095 2.97971 14.25 3.33333 14.25H12.6667C13.0203 14.25 13.3594 14.1095 13.6095 13.8595C13.8595 13.6094 14 13.2703 14 12.9167V3.58333C14 3.22971 13.8595 2.89057 13.6095 2.64052C13.3594 2.39048 13.0203 2.25 12.6667 2.25ZM12.6667 3.58333V12.9167H3.33333V3.58333H12.6667ZM6.66667 11.5833L4 8.91667L4.94 7.97L6.66667 9.69667L11.06 5.30333L12 6.25"
                    fill="black"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationRequest;
