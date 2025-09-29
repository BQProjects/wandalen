import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const AddCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const { DATABASE_URL } = useContext(DatabaseContext);

  // State for form fields
  const [amountPaid, setAmountPaid] = useState("€ 120,00");
  const [planValidFrom, setPlanValidFrom] = useState("2025-07-01");
  const [planValidTo, setPlanValidTo] = useState("2026-08-31");
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
  const [totalClients, setTotalClients] = useState("");
  const [numberOfLocations, setNumberOfLocations] = useState("");
  const [targetGroup, setTargetGroup] = useState([]);
  const [estimatedClients, setEstimatedClients] = useState("");
  const [startDate, setStartDate] = useState("");
  const [needSupport, setNeedSupport] = useState(false);
  const [additionalServices, setAdditionalServices] = useState("");
  const [notes, setNotes] = useState("");
  const [clientLimit, setClientLimit] = useState("");

  useEffect(() => {
    if (user) {
      setOrgName(user.orgName || "");
      setContactEmail(user.email || "");
      setPhoneNo(user.phoneNo || "");
      setAddress(user.address || "");
      setStreet(user.address || "");
      setPostalCode(user.postal || "");
      setCity(user.city || "");
      setWebsite(user.website || "");
      setFullName(user.contactPerson?.fullName || "");
      setJobTitle(user.contactPerson?.jobTitle || "");
      setEmail(user.contactPerson?.email || "");
      setContactPhone(user.contactPerson?.phoneNumber || "");
      setTotalClients(user.totalClients || "");
      setNumberOfLocations(user.numberOfLocations || "");
      setTargetGroup(user.targetGroup || []);
      setEstimatedClients(user.estimatedUsers || "");
      setStartDate(
        user.desiredStartDate
          ? new Date(user.desiredStartDate).toISOString().split("T")[0]
          : ""
      );
      setNeedSupport(user.needIntegrationSupport || false);
      setAdditionalServices(user.additionalServices || "");
      setNotes(user.notes || "");
      setClientLimit(user.clientLimit || "");
      setNoOfUsers(
        user.totalClients ? `${user.totalClients} users` : "10 users"
      );
    }
  }, [user]);

  // Added to keep totalClients and clientLimit synchronized
  useEffect(() => {
    if (totalClients) {
      setClientLimit(totalClients);
    }
  }, [totalClients]);

  const handleBack = () => {
    navigate("/admin/manage");
  };

  // Custom handler for totalClients to sync with noOfUsers
  const handleTotalClientsChange = (e) => {
    const value = e.target.value;
    setTotalClients(value);
    setNoOfUsers(`${value} users`);
    setClientLimit(value); // Also update clientLimit
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
    setTotalClients(value);
  };

  const handleCreateUser = async () => {
    // Prepare data to send - include ALL form fields
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
      totalClients: totalClients ? parseInt(totalClients, 10) : 0,
      numberOfLocations,
      targetGroup,
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
      alert(
        `Error creating/updating organization: ${error.message}. Please try again.`
      );
    }
  };

  return (
    <div className="flex-1 bg-white p-6 max-w-4xl mx-auto font-base">
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
      <div className="mb-10">
        <h2 className="text-2xl font-medium text-muted-foreground mb-4">
          Customer & Plan Details
        </h2>
        <div className="p-6 rounded-2xl bg-secondary">
          <div className="text-brown font-base text-lg font-medium mb-4">
            Complete the User & Plan Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-brown font-base font-medium mb-2">
                Amount Paid
              </label>
              <input
                className="input"
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
                className="input"
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
                className="input"
                value={planValidTo}
                onChange={(e) => setPlanValidTo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-brown font-base font-medium mb-2">
                Client Limit
              </label>
              <input
                className="input"
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

      <div className="space-y-10">
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
                className="input"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Contact Email
              </label>
              <input
                className="input"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Phone Number
              </label>
              <input
                className="input"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Address
              </label>
              <textarea
                className="input h-20 py-2 resize-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Street
              </label>
              <input
                className="input"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Postal Code
              </label>
              <input
                className="input"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                City
              </label>
              <input
                className="input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Website Link
              </label>
              <input
                className="input"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
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
                className="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Job Title / Position
              </label>
              <input
                className="input"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Email Address
              </label>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Phone Number
              </label>
              <input
                className="input"
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
                className="input"
                value={totalClients}
                onChange={handleTotalClientsChange}
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Number of Locations
              </label>
              <input
                className="input"
                value={numberOfLocations}
                onChange={(e) => setNumberOfLocations(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-muted-foreground font-base font-medium mb-2">
                Target group(s) for which the platform will be used
              </label>
              <div className="flex flex-wrap gap-4">
                {["elderly", "disabled", "dementia", "other"].map((group) => (
                  <div key={group} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={targetGroup.includes(group)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTargetGroup([...targetGroup, group]);
                        } else {
                          setTargetGroup(
                            targetGroup.filter((g) => g !== group)
                          );
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-dark-green font-base text-sm">
                      {group.charAt(0).toUpperCase() + group.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
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
                className="input"
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
                className="input"
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
                className="input h-20 py-2 resize-none"
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
                className="input h-20 py-2 resize-none"
                value={additionalServices}
                onChange={(e) => setAdditionalServices(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Notes
              </label>
              <textarea
                className="input h-20 py-2 resize-none"
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
