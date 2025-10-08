import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import toast from "react-hot-toast";

const VolunteerTrainingDetails = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const { DATABASE_URL } = useContext(DatabaseContext);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get(`${DATABASE_URL}/admin/trainings`);
      const data = response.data;
      setTrainings(data);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (training, updatedData) => {
    const dataToSend = { ...updatedData };
    if (training && training._id) {
      // update
      try {
        await axios.put(
          `${DATABASE_URL}/admin/trainings/${training._id}`,
          dataToSend
        );
        fetchTrainings();
        toast.success("Training updated successfully");
      } catch (error) {
        console.error("Error updating training:", error);
        toast.error("Error updating training");
      }
    } else {
      // create
      try {
        await axios.post(`${DATABASE_URL}/admin/trainings`, dataToSend);
        fetchTrainings();
        toast.success("Training created successfully");
      } catch (error) {
        console.error("Error creating training:", error);
        toast.error("Error creating training");
      }
    }
  };

  const handleDelete = async (training) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      try {
        await axios.delete(`${DATABASE_URL}/admin/trainings/${training._id}`);
        fetchTrainings();
        toast.success("Training deleted successfully");
      } catch (error) {
        console.error("Error deleting training:", error);
        toast.error("Error deleting training");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f6f4] p-6 overflow-x-auto relative">
      <div className="flex flex-col items-start w-full max-w-6xl mx-auto space-y-6">
        {trainings.map((training) => (
          <TrainingSection
            key={training._id}
            training={training}
            onEdit={() => {
              setSelectedTraining(training);
              setIsModalOpen(true);
            }}
            onDelete={() => handleDelete(training)}
          />
        ))}
      </div>
      {/* Floating Action Button */}
      <button
        onClick={() => {
          setSelectedTraining(null);
          setIsModalOpen(true);
        }}
        className="fixed bottom-6 right-6 bg-[#5b6502] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-[#4a5201] transition-colors"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4V20M4 12H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* Modal */}
      {isModalOpen && (
        <TrainingModal
          training={selectedTraining}
          onSave={(data) => {
            handleCreateOrUpdate(selectedTraining, data);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const TrainingSection = ({ training, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col items-start w-full bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 md:p-8">
      <div className="flex items-start self-stretch mb-4">
        <div className="text-[#381207] text-center font-['Poppins'] text-[2rem] font-semibold leading-[normal]">
          {training.title}
        </div>
        <div className="ml-auto flex space-x-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 rounded-lg bg-[#5b6502] text-white font-['Poppins'] font-medium hover:bg-[#4a5201] transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-['Poppins'] font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="bg-[#ede4dc] rounded-2xl w-full p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
              Date
            </label>
            <p className="text-[#4b4741] font-['Poppins'] leading-[normal] mt-1">
              {training.date
                ? new Date(training.date).toLocaleDateString()
                : "Not set"}
            </p>
          </div>
          <div>
            <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
              Location
            </label>
            <p className="text-[#4b4741] font-['Poppins'] leading-[normal] mt-1">
              {training.location || "Not set"}
            </p>
          </div>
          <div>
            <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
              Timing
            </label>
            <p className="text-[#4b4741] font-['Poppins'] leading-[normal] mt-1">
              {training.timing || "Not set"}
            </p>
          </div>
          <div>
            <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
              Created by
            </label>
            <p className="text-[#4b4741] font-['Poppins'] leading-[normal] mt-1">
              {training.createdBy || "Not set"}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
            Description
          </label>
          <p className="text-[#4b4741] font-['Poppins'] leading-[normal] mt-1">
            {training.description || "Not set"}
          </p>
        </div>
      </div>
    </div>
  );
};

const TrainingModal = ({ training, onSave, onClose }) => {
  const [title, setTitle] = useState(training ? training.title : "");
  const [date, setDate] = useState(
    training && training.date
      ? new Date(training.date).toISOString().split("T")[0]
      : ""
  );
  const [location, setLocation] = useState(training ? training.location : "");
  const [timing, setTiming] = useState(training ? training.timing : "");
  const [description, setDescription] = useState(
    training ? training.description : ""
  );
  const [createdBy, setCreatedBy] = useState(
    training ? training.createdBy : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      date,
      location,
      timing,
      description,
      createdBy,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl mx-4">
        <h2 className="text-2xl font-semibold text-[#381207] mb-6">
          {training ? "Edit Training" : "Add New Training"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Created by
              </label>
              <input
                type="text"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                required
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
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal] h-24 resize-none"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[#5b6502] text-white font-['Poppins'] font-medium hover:bg-[#4a5201] transition-colors"
            >
              {training ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerTrainingDetails;
