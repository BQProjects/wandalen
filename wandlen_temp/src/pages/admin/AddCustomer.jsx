import React from "react";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin/manage");
  };

  const handleCreateUser = () => {
    navigate("/admin/organization-created");
  };

  return (
    <div className="flex-1 bg-white p-6 max-w-4xl mx-auto font-base">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBack}
          className="text-brown hover:text-brand"
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
        <h1 className="text-2xl font-semibold text-brown">Add Customer</h1>
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
                defaultValue="€ 120,00"
              />
            </div>
            <div>
              <label className="block text-brown font-base font-medium mb-2">
                Plan Valid From
              </label>
              <input
                className="input"
                defaultValue="01-07-2025"
              />
            </div>
            <div>
              <label className="block text-brown font-base font-medium mb-2">
                Plan Valid To
              </label>
              <input
                className="input"
                defaultValue="31-08-2026"
              />
            </div>
            <div>
              <label className="block text-brown font-base font-medium mb-2">
                No. of Users
              </label>
              <input
                className="input"
                defaultValue="10 users"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="px-6 py-2 rounded-lg btn btn-secondary"
              onClick={handleCreateUser}
            >
              Create User
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
                defaultValue="Sunrise Wellness Center"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Contact Email
              </label>
              <input
                className="input"
                defaultValue="info@sunrisewellness.nl"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Phone Number
              </label>
              <input
                className="input"
                defaultValue="+31 6 9876 5432"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Address
              </label>
              <textarea
                className="input h-20 py-2 resize-none"
                defaultValue="Dominee C. Keersstraat 798, 8151 AB, Lemelerveld"
              ></textarea>
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Street
              </label>
              <input
                className="input"
                defaultValue="Dominee C. Keersstraat 798"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Postal Code
              </label>
              <input
                className="input"
                defaultValue="8151 AB"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                City
              </label>
              <input
                className="input"
                defaultValue="Lemelerveld"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Website Link
              </label>
              <input
                className="input"
                defaultValue="https://www.sunrisewellness.nl"
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
                defaultValue="Anna Jansen"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Job Title / Position
              </label>
              <input
                className="input"
                defaultValue="Activities Coordinator"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Email Address
              </label>
              <input
                className="input"
                defaultValue="anna.jansen@sunrisewellness.nl"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Phone Number
              </label>
              <input
                className="input"
                defaultValue="+31 6 2345 6789"
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
                defaultValue="45"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Number of Locations
              </label>
              <input
                className="input"
                defaultValue="2 care homes, 1 daycare center"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-muted-foreground font-base font-medium mb-2">
                Target group(s) for which the platform will be used
              </label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    width={18}
                    height={19}
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.25 2.75H3.75C3.35218 2.75 2.97064 2.90804 2.68934 3.18934C2.40804 3.47064 2.25 3.85218 2.25 4.25V14.75C2.25 15.1478 2.40804 15.5294 2.68934 15.8107C2.97064 16.092 3.35218 16.25 3.75 16.25H14.25C14.6478 16.25 15.0294 16.092 15.3107 15.8107C15.592 15.5294 15.75 15.1478 15.75 14.75V4.25C15.75 3.85218 15.592 3.47064 15.3107 3.18934C15.0294 2.90804 14.6478 2.75 14.25 2.75ZM14.25 4.25V14.75H3.75V4.25H14.25ZM7.5 13.25L4.5 10.25L5.5575 9.185L7.5 11.1275L12.4425 6.185L13.5 7.25"
                      fill="#DD9219"
                    />
                  </svg>
                  <span className="text-dark-green font-base text-sm">
                    Dementia
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width={18}
                    height={19}
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.25 2.75H3.75C3.35218 2.75 2.97064 2.90804 2.68934 3.18934C2.40804 3.47064 2.25 3.85218 2.25 4.25V14.75C2.25 15.1478 2.40804 15.5294 2.68934 15.8107C2.97064 16.092 3.35218 16.25 3.75 16.25H14.25C14.6478 16.25 15.0294 16.092 15.3107 15.8107C15.592 15.5294 15.75 15.1478 15.75 14.75V4.25C15.75 3.85218 15.592 3.47064 15.3107 3.18934C15.0294 2.90804 14.6478 2.75 14.25 2.75ZM14.25 4.25V14.75H3.75V4.25H14.25ZM7.5 13.25L4.5 10.25L5.5575 9.185L7.5 11.1275L12.4425 6.185L13.5 7.25"
                      fill="#DD9219"
                    />
                  </svg>
                  <span className="text-dark-green font-base text-sm">
                    Day care
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width={18}
                    height={19}
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.25 2.75H3.75C2.9175 2.75 2.25 3.4175 2.25 4.25V14.75C2.25 15.1478 2.40804 15.5294 2.68934 15.8107C2.97064 16.092 3.35218 16.25 3.75 16.25H14.25C14.6478 16.25 15.0294 16.092 15.3107 15.8107C15.592 15.5294 15.75 15.1478 15.75 14.75V4.25C15.75 3.85218 15.592 3.47064 15.3107 3.18934C15.0294 2.90804 14.6478 2.75 14.25 2.75ZM14.25 4.25V14.75H3.75V4.25H14.25Z"
                      fill="#D0D0D0"
                    />
                  </svg>
                  <span className="text-dark-green font-base text-sm">
                    Rehabilitation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width={18}
                    height={19}
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.25 2.75H3.75C2.9175 2.75 2.25 3.4175 2.25 4.25V14.75C2.25 15.1478 2.40804 15.5294 2.68934 15.8107C2.97064 16.092 3.35218 16.25 3.75 16.25H14.25C14.6478 16.25 15.0294 16.092 15.3107 15.8107C15.592 15.5294 15.75 15.1478 15.75 14.75V4.25C15.75 3.85218 15.592 3.47064 15.3107 3.18934C15.0294 2.90804 14.6478 2.75 14.25 2.75ZM14.25 4.25V14.75H3.75V4.25H14.25Z"
                      fill="#D0D0D0"
                    />
                  </svg>
                  <span className="text-dark-green font-base text-sm">
                    Other
                  </span>
                </div>
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
                defaultValue="20 clients per week"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Desired start date of use
              </label>
              <input
                className="input"
                defaultValue="01 October 2025"
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
                  <svg
                    width={18}
                    height={19}
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 15.125C12.1066 15.125 14.625 12.6066 14.625 9.5C14.625 6.3934 12.1066 3.875 9 3.875C5.8934 3.875 3.375 6.3934 3.375 9.5C3.375 12.6066 5.8934 15.125 9 15.125Z"
                      fill="#DD9219"
                    />
                    <path
                      d="M9 17.375C7.44248 17.375 5.91992 16.9131 4.62489 16.0478C3.32985 15.1825 2.32049 13.9526 1.72445 12.5136C1.12841 11.0747 0.972461 9.49127 1.27632 7.96367C1.58018 6.43607 2.3302 5.03288 3.43154 3.93154C4.53288 2.8302 5.93607 2.08018 7.46367 1.77632C8.99127 1.47246 10.5747 1.62841 12.0136 2.22445C13.4526 2.82049 14.6825 3.82985 15.5478 5.12489C16.4131 6.41992 16.875 7.94248 16.875 9.5C16.8726 11.5879 16.0422 13.5895 14.5658 15.0658C13.0895 16.5422 11.0879 17.3726 9 17.375ZM9 2.75C7.66498 2.75 6.35994 3.14588 5.2499 3.88758C4.13987 4.62928 3.27471 5.68349 2.76382 6.91689C2.25293 8.15029 2.11925 9.50749 2.3797 10.8169C2.64015 12.1262 3.28303 13.329 4.22703 14.273C5.17104 15.217 6.37377 15.8599 7.68314 16.1203C8.99252 16.3808 10.3497 16.2471 11.5831 15.7362C12.8165 15.2253 13.8707 14.3601 14.6124 13.2501C15.3541 12.1401 15.75 10.835 15.75 9.5C15.7479 7.71043 15.0361 5.99475 13.7707 4.72933C12.5053 3.46392 10.7896 2.75209 9 2.75Z"
                      fill="#DD9219"
                    />
                  </svg>
                  <span className="text-dark-green font-base text-sm">
                    Yes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width={18}
                    height={19}
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 15.5C7.4087 15.5 5.88258 14.8679 4.75736 13.7426C3.63214 12.6174 3 11.0913 3 9.5C3 7.9087 3.63214 6.38258 4.75736 5.25736C5.88258 4.13214 7.4087 3.5 9 3.5C10.5913 3.5 12.1174 4.13214 13.2426 5.25736C14.3679 6.38258 15 7.9087 15 9.5C15 11.0913 14.3679 12.6174 13.2426 13.7426C12.1174 14.8679 10.5913 15.5 9 15.5ZM9 2C8.01509 2 7.03982 2.19399 6.12987 2.5709C5.21993 2.94781 4.39314 3.50026 3.6967 4.1967C2.29018 5.60322 1.5 7.51088 1.5 9.5C1.5 11.4891 2.29018 13.3968 3.6967 14.8033C4.39314 15.4997 5.21993 16.0522 6.12987 16.4291C7.03982 16.806 8.01509 17 9 17C10.9891 17 12.8968 16.2098 14.3033 14.8033C15.7098 13.3968 16.5 11.4891 16.5 9.5C16.5 8.51509 16.306 7.53982 15.9291 6.62987C15.5522 5.71993 14.9997 4.89314 14.3033 4.1967C13.6069 3.50026 12.7801 2.94781 11.8701 2.5709C10.9602 2.19399 9.98491 2 9 2Z"
                      fill="#D0D0D0"
                    />
                  </svg>
                  <span className="text-dark-green font-base text-sm">
                    No
                  </span>
                </div>
              </div>
              <textarea
                className="input h-20 py-2 resize-none"
                defaultValue="We’d like guidance for staff during setup."
              ></textarea>
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Additional services or custom solutions you are interested in?
              </label>
              <textarea
                className="input h-20 py-2 resize-none"
                defaultValue="Interested in Virtual Walking Experience Box with scent & sound modules (€93 each)."
              ></textarea>
            </div>
            <div>
              <label className="block text-muted-foreground font-base text-sm mb-2">
                Notes
              </label>
              <textarea
                className="input h-20 py-2 resize-none"
                defaultValue="Please send invoice details to our finance department. Accessibility support for visually impaired clients needed."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
