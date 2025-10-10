import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const AddCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const { DATABASE_URL } = useContext(DatabaseContext);

  // Calculate default dates
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const oneYearFromToday = new Date(today);
  oneYearFromToday.setFullYear(today.getFullYear() + 1);
  const oneYearFromTodayStr = oneYearFromToday.toISOString().split("T")[0];

  // State for form fields
  const [amountPaid, setAmountPaid] = useState("€ 120,00");
  const [planValidFrom, setPlanValidFrom] = useState(todayStr);
  const [planValidTo, setPlanValidTo] = useState(oneYearFromTodayStr);
  const [noOfUsers, setNoOfUsers] = useState("10 users");
  const [orgName, setOrgName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  // New organization details fields
  const [orgFullName, setOrgFullName] = useState("");
  const [orgJobTitle, setOrgJobTitle] = useState("");
  const [orgEmailAddress, setOrgEmailAddress] = useState("");
  const [orgPhoneContact, setOrgPhoneContact] = useState("");
  const [totalClients, setTotalClients] = useState("");
  const [numberOfLocations, setNumberOfLocations] = useState("");
  const [soortZorgorganisatie, setSoortZorgorganisatie] = useState("");
  const [estimatedClients, setEstimatedClients] = useState("");
  const [startDate, setStartDate] = useState("");
  const [needSupport, setNeedSupport] = useState(false);
  const [additionalServices, setAdditionalServices] = useState("");
  const [notes, setNotes] = useState("");
  const [clientLimit, setClientLimit] = useState("");

  useEffect(() => {
    if (user) {
      // Calculate default dates
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];
      const oneYearFromToday = new Date(today);
      oneYearFromToday.setFullYear(today.getFullYear() + 1);
      const oneYearFromTodayStr = oneYearFromToday.toISOString().split("T")[0];

      // Plan Details
      setAmountPaid(user.amountPaid || "€ 120,00");
      setPlanValidFrom(
        user.planValidFrom
          ? new Date(user.planValidFrom).toISOString().split("T")[0]
          : todayStr
      );
      setPlanValidTo(
        user.planValidTo
          ? new Date(user.planValidTo).toISOString().split("T")[0]
          : oneYearFromTodayStr
      );
      setClientLimit(user.clientLimit || "");

      // Organization Details
      setOrgName(user.orgName || "");
      setContactEmail(user.email || "");
      setPhoneNo(user.phoneNo || "");
      setAddress(user.address || "");
      setStreet(user.address || "");
      setPostalCode(user.postal || "");
      setCity(user.city || "");
      setWebsite(user.website || "");

      // Contact Person
      setFullName(user.contactPerson?.fullName || "");
      setJobTitle(user.contactPerson?.jobTitle || "");
      setEmail(user.contactPerson?.email || "");
      setContactPhone(user.contactPerson?.phoneNumber || "");

      // Organization Details
      setOrgFullName(user.organizationDetails?.fullName || "");
      setOrgJobTitle(user.organizationDetails?.jobTitle || "");
      setOrgEmailAddress(user.organizationDetails?.email || "");
      setOrgPhoneContact(user.organizationDetails?.phoneNumber || "");

      // Organization & Target Group
      setTotalClients(user.totalClients || "");
      setNumberOfLocations(user.numberOfLocations || "");
      setSoortZorgorganisatie(user.soortZorgorganisatie || "");
      setEstimatedClients(user.estimatedUsers || "");
      setStartDate(
        user.desiredStartDate
          ? new Date(user.desiredStartDate).toISOString().split("T")[0]
          : ""
      );

      // Onboarding
      setNeedSupport(user.needIntegrationSupport || false);
      setAdditionalServices(user.additionalServices || "");
      setNotes(user.notes || "");
    }
  }, [user]);

  const handleBack = () => {
    navigate("/admin/manage");
  };

  // Custom handler for totalClients
  const handleTotalClientsChange = (e) => {
    const value = e.target.value;
    setTotalClients(value);
  };

  // Custom handler for noOfUsers to sync with totalClients
  const handleNoOfUsersChange = (e) => {
    const value = e.target.value;
    setNoOfUsers(value);
    // Extract just the number from "X users" format
    const numericValue = value.replace(/[^0-9]/g, "");
    setTotalClients(numericValue);
  };

  const handleClientLimitChange = (e) => {
    const value = e.target.value;
    setClientLimit(value);
  };

  const handleCreateUser = async () => {
    const data = {
      amountPaid,
      planValidFrom,
      planValidTo,
      noOfUsers: noOfUsers.replace(" users", ""),
      orgName,
      email: contactEmail,
      phoneNo,
      address,
      street,
      postal: postalCode,
      city,
      website,
      contactPerson: {
        fullName,
        jobTitle,
        email,
        phoneNumber: contactPhone,
      },
      organizationDetails: {
        fullName: orgFullName,
        jobTitle: orgJobTitle,
        email: orgEmailAddress,
        phoneNumber: orgPhoneContact,
      },
      totalClients: totalClients,
      numberOfLocations,
      soortZorgorganisatie,
      estimatedUsers: estimatedClients,
      desiredStartDate: startDate,
      needIntegrationSupport: needSupport,
      additionalServices,
      notes,
      clientLimit: clientLimit ? parseInt(clientLimit, 10) : 5,
    };

    try {
      console.log("Sending data to backend:", data);
      console.log("User ID:", user?._id);

      let response;
      if (user?.requestStates === "approved") {
        response = await axios.put(
          `${DATABASE_URL}/admin/update-org/${user._id}`,
          data
        );
      } else {
        response = await axios.put(
          `${DATABASE_URL}/admin/approve-org/${user._id}`,
          data
        );
      }

      console.log("Response from backend:", response.data);

      // Show success message with email confirmation
      const isUpdate = user?.requestStates === "approved";
      const action = isUpdate ? "updated" : "created";

      if (isUpdate) {
        toast.success(
          `Organization ${action} successfully! ` +
            `Confirmation emails have been sent to the customer and admin team.`
        );
      } else {
        toast.success(
          `Organization ${action} successfully! ` +
            `Confirmation emails have been sent to the customer and admin team. ` +
            `The customer will receive a password setup link to complete their account activation.`
        );
      }

      // Navigate with the updated user data
      navigate("/admin/organization-created", {
        state: { user: response.data },
      });
    } catch (error) {
      console.error("Error creating/updating organization:", error);
      console.error(
        "Error details:",
        error.response?.data || "No response data"
      );
      toast.error(
        `Error creating/updating organization: ${error.message}. Please try again.`
      );
    }
  };

  return (
    <div className="flex-1 bg-[#f7f6f4] p-6 mx-auto font-base">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={handleBack} className="text-brown hover:text-brand">
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
        <h1 className="text-2xl font-semibold text-brown">
          {user?.requestStates === "approved"
            ? "Edit Customer"
            : "Add Customer"}
        </h1>
      </div>

      {/* Customer & Plan Details - Moved to Top */}
      <div className="relative mb-10">
        <div className="pt-16 p-6 rounded-2xl bg-secondary">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
              width={96}
              height={96}
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width={96} height={96} rx={48} fill="#ede4dc" />
              <path
                d="M29.3133 92.999C38.0078 90.9819 46.9693 90.0855 55.5001 87.4564C66.6331 84.0257 78.0247 76.7764 79.7739 64.45C81.4542 52.5804 78.0678 40.7367 78.2229 28.8672L73.0096 31.1514C59.0158 38.7886 60.3428 44.2192 60.3428 44.2192C60.5582 46.3827 62.3333 48.5291 64.1687 50.7616C65.6163 52.5287 68.2789 53.9424 65.668 56.0456C64.9184 56.649 63.7465 56.8904 63.2381 57.3127C62.1782 58.2006 63.4018 59.4849 63.6344 60.2262C64.0653 61.6313 63.5827 62.5019 62.385 63.1742C63.1347 63.8638 63.531 64.088 63.3587 65.2172C63.2553 65.9326 62.4108 66.1481 62.0317 66.7773C61.2217 68.122 61.9111 68.9065 62.0489 70.1994C62.8503 77.9401 52.4497 73.8456 48.2705 74.2852L43.9017 73.9577C39.7742 73.9318 34.7937 74.8024 33.3374 79.1296L29.3047 92.9903L29.3133 92.999Z"
                fill="#381207"
              />
              <path
                d="M40.1584 58.1327C43.0106 51.8143 46.2075 45.4701 46.9744 38.5828C47.6982 32.0834 46.1989 25.5409 44.217 19.3088C42.528 13.9989 40.4428 8.49085 41.4423 3C37.1339 8.35294 31.8689 12.8439 27.1038 17.7917C22.3386 22.7395 17.9699 28.3596 16.0914 34.9711C13.3167 44.7115 16.2896 55.1071 19.9001 64.5717C23.3296 73.5536 27.707 82.8199 27.8362 92.6207C31.395 80.8805 35.083 69.3385 40.1498 58.1327H40.1584Z"
                fill="#381207"
              />
            </svg>
          </div>
          <div className="text-brown font-base text-lg font-medium mb-4">
            Complete the User & Plan Information
          </div>
          <div className="grid gap-4">
            <div>
              <label className="block text-brown font-base font-medium mb-2">
                Amount Paid
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-brown font-base font-medium mb-2">
                Plan Valid From
              </label>
              <input
                type="date"
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={planValidFrom}
                onChange={(e) => setPlanValidFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-brown font-base font-medium mb-2">
                Plan Valid To
              </label>
              <input
                type="date"
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={planValidTo}
                onChange={(e) => setPlanValidTo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-brown font-base font-medium mb-2">
                Client Limit
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                type="number"
                min="0"
                value={clientLimit}
                onChange={handleClientLimitChange}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="px-6 py-2 rounded-lg btn btn-secondary"
              onClick={handleCreateUser}
            >
              {user?.requestStates === "approved"
                ? "Update User"
                : "Create User"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-10 w-11/12 mx-auto">
        {/* Organization Details */}
        <div>
          <h2 className="text-2xl font-medium text-muted-foreground mb-4">
            Organization Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Organization Name
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Contact Email
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Phone Number
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            {/* <div className="md:col-span-2">
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Address
              </label>
              <textarea
                className="input border border-[#B3B1AC] p-2 rounded-md h-32 py-2 resize-none w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div> */}
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Street
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Postal Code
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                City
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Website Link
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Organization Representative */}
        <div>
          <h2 className="text-2xl font-medium text-muted-foreground mb-4">
            Organization Representative
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Full Name
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={orgFullName}
                onChange={(e) => setOrgFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Job Title / Position
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={orgJobTitle}
                onChange={(e) => setOrgJobTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Email Address
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={orgEmailAddress}
                onChange={(e) => setOrgEmailAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Phone Number
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={orgPhoneContact}
                onChange={(e) => setOrgPhoneContact(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Contact Person */}
        <div>
          <h2 className="text-2xl font-medium text-muted-foreground mb-4">
            Contact Person
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Full Name
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Job Title / Position
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Email Address
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Phone Number
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Organization & Target Group */}
        <div>
          <h2 className="text-2xl font-medium text-muted-foreground mb-4">
            Organization & Target Group
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Total Number of Clients
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={totalClients}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Number of Locations
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={numberOfLocations}
                onChange={(e) => setNumberOfLocations(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Type of care organization
              </label>
              <select
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={soortZorgorganisatie}
                onChange={(e) => setSoortZorgorganisatie(e.target.value)}
              >
                <option value="">Select type</option>
                <option value="Nursing home">Nursing home</option>
                <option value="Disability care">Disability care</option>
                <option value="Mental health care">Mental health care</option>
                <option value="Home care">Home care</option>
                <option value="Day care">Day care</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Use of Virtual Walking */}
        <div>
          <h2 className="text-2xl font-medium text-muted-foreground mb-4">
            Use of Virtual Walking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Estimated number of clients who will use the platform
              </label>
              <input
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={estimatedClients}
                onChange={(e) => setEstimatedClients(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Desired start date of use
              </label>
              <input
                type="date"
                className="input border border-[#B3B1AC] p-2 rounded-md w-full"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Onboarding */}
        <div>
          <h2 className="text-2xl font-medium text-muted-foreground mb-4">
            Onboarding
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Do you need onboarding and integration support?
              </label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="support"
                    checked={needSupport}
                    onChange={() => setNeedSupport(true)}
                  />
                  <span className="text-dark-green font-base text-sm">Yes</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="support"
                    checked={!needSupport}
                    onChange={() => setNeedSupport(false)}
                  />
                  <span className="text-dark-green font-base text-sm">No</span>
                </div>
              </div>
              <textarea
                className="input border border-[#B3B1AC] p-2 rounded-md h-32 py-2 resize-none w-full"
                value={additionalServices}
                onChange={(e) => setAdditionalServices(e.target.value)}
                placeholder="Details about support needed"
              ></textarea>
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Additional services or custom solutions you are interested in?
              </label>
              <textarea
                className="input border border-[#B3B1AC] p-2 rounded-md h-32 py-2 resize-none w-full"
                value={additionalServices}
                onChange={(e) => setAdditionalServices(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Notes
              </label>
              <textarea
                className="input border border-[#B3B1AC] p-2 rounded-md h-32 py-2 resize-none w-full"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
