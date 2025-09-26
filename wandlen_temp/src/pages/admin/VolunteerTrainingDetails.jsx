import React, { useState, useEffect } from "react";

const VolunteerTrainingDetails = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await fetch("/api/admin/trainings");
      if (!response.ok) throw new Error("Failed to fetch trainings");
      const data = await response.json();
      setTrainings(data);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (training, updatedData) => {
    if (training._id) {
      // update
      try {
        const response = await fetch(`/api/admin/trainings/${training._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });
        if (response.ok) {
          fetchTrainings();
          alert("Training updated successfully");
        } else {
          alert("Failed to update training");
        }
      } catch (error) {
        console.error("Error updating training:", error);
        alert("Error updating training");
      }
    } else {
      // create
      try {
        const response = await fetch("/api/admin/trainings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });
        if (response.ok) {
          fetchTrainings();
          alert("Training created successfully");
        } else {
          alert("Failed to create training");
        }
      } catch (error) {
        console.error("Error creating training:", error);
        alert("Error creating training");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f6f4] p-6 overflow-x-auto">
      <div className="flex flex-col items-start w-full max-w-6xl mx-auto space-y-6">
        <TrainingSection
          training={
            trainings.find((t) => t.title === "Video Training") || {
              title: "Video Training",
              date: "",
              location: "",
              timing: "",
              audience: "",
            }
          }
          onUpdate={handleCreateOrUpdate}
          className="frame_1984079252"
        />
        <TrainingSection
          training={
            trainings.find(
              (t) => t.title === "Camera tips and introduction"
            ) || {
              title: "Camera tips and introduction",
              date: "",
              location: "",
              timing: "",
              audience: "",
            }
          }
          onUpdate={handleCreateOrUpdate}
          className="frame_1984079253"
        />
        <TrainingSection
          training={
            trainings.find(
              (t) => t.title === "Nature walk filming practice"
            ) || {
              title: "Nature walk filming practice",
              date: "",
              location: "",
              timing: "",
              audience: "",
            }
          }
          onUpdate={handleCreateOrUpdate}
          className="frame_1984079254"
        />
      </div>
    </div>
  );
};

const TrainingSection = ({ training, onUpdate, className }) => {
  const [date, setDate] = useState(
    training.date ? new Date(training.date).toISOString().split("T")[0] : ""
  );
  const [location, setLocation] = useState(training.location || "");
  const [timing, setTiming] = useState(training.timing || "");
  const [audience, setAudience] = useState(training.audience || "");
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = () => {
    onUpdate(training, {
      title: training.title,
      date,
      location,
      timing,
      audience,
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${className} flex flex-col items-start w-full bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 md:p-8`}
      style={{
        height: isExpanded ? "auto" : "auto",
        minHeight: isExpanded ? "500px" : "auto",
      }}
    >
      <div
        className="flex items-start self-stretch mb-4 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div
          className={`${training.title
            .replace(/\s+/g, "_")
            .toLowerCase()} text-[#381207] text-center font-['Poppins'] text-[2rem] font-semibold leading-[normal]`}
        >
          {training.title}
        </div>
        <svg
          width={25}
          height={50}
          viewBox="0 0 25 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`ml-auto transition-transform duration-200 ${
            isExpanded ? "rotate-90" : ""
          }`}
        >
          <path
            d="M5.10635 36.293L7.31677 38.5013L19.3564 26.4659C19.5504 26.273 19.7044 26.0437 19.8095 25.7911C19.9146 25.5385 19.9688 25.2676 19.9688 24.994C19.9688 24.7204 19.9146 24.4495 19.8095 24.1969C19.7044 23.9443 19.5504 23.715 19.3564 23.5221L7.31677 11.4805L5.10844 13.6888L16.4084 24.9909L5.10635 36.293Z"
            fill="#381207"
          />
        </svg>
      </div>
      {isExpanded && (
        <div className="flex-1 bg-[#ede4dc] rounded-2xl w-full p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Timing
              </label>
              <input
                type="text"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                For whom
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
              />
            </div>
          </div>
          <div className="flex justify-end pt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 rounded-lg bg-[#5b6502] text-white font-['Poppins'] font-medium hover:bg-[#4a5201] transition-colors"
            >
              Update details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerTrainingDetails;
