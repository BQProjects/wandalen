import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import toast from "react-hot-toast";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const { DATABASE_URL } = useContext(DatabaseContext);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${DATABASE_URL}/admin/testimonials`);
      const data = response.data;
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (testimonial, updatedData) => {
    const dataToSend = { ...updatedData };
    if (testimonial && testimonial._id) {
      // update
      try {
        await axios.put(
          `${DATABASE_URL}/admin/testimonials/${testimonial._id}`,
          dataToSend
        );
        fetchTestimonials();
        toast.success("Testimonial updated successfully");
      } catch (error) {
        console.error("Error updating testimonial:", error);
        toast.error("Error updating testimonial");
      }
    } else {
      // create
      try {
        await axios.post(`${DATABASE_URL}/admin/testimonials`, dataToSend);
        fetchTestimonials();
        toast.success("Testimonial created successfully");
      } catch (error) {
        console.error("Error creating testimonial:", error);
        toast.error("Error creating testimonial");
      }
    }
  };

  const handleDelete = async (testimonial) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await axios.delete(
          `${DATABASE_URL}/admin/testimonials/${testimonial._id}`
        );
        fetchTestimonials();
        toast.success("Testimonial deleted successfully");
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        toast.error("Error deleting testimonial");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f6f4] p-6 overflow-x-auto relative">
      <div className="flex flex-col items-start w-full max-w-6xl mx-auto space-y-6">
        {testimonials.map((testimonial) => (
          <TestimonialSection
            key={testimonial._id}
            testimonial={testimonial}
            onEdit={() => {
              setSelectedTestimonial(testimonial);
              setIsModalOpen(true);
            }}
            onDelete={() => handleDelete(testimonial)}
          />
        ))}
      </div>
      {/* Floating Action Button */}
      <button
        onClick={() => {
          setSelectedTestimonial(null);
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
        <TestimonialModal
          testimonial={selectedTestimonial}
          onSave={(data) => {
            handleCreateOrUpdate(selectedTestimonial, data);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const TestimonialSection = ({ testimonial, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col items-start w-full bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 md:p-8">
      <div className="flex items-start self-stretch mb-4">
        <div className="flex items-center gap-4">
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div className="text-[#381207] text-xl font-semibold font-['Poppins'] leading-[normal]">
              {testimonial.name}
            </div>
            <div className="text-[#4b4741] font-['Poppins'] text-sm mt-1">
              Testimonial
            </div>
          </div>
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
        <div>
          <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
            Testimonial Text
          </label>
          <p className="text-[#4b4741] font-['Poppins'] leading-[normal] mt-1">
            "{testimonial.text}"
          </p>
        </div>
        <div className="mt-4">
          <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
            Photo URL
          </label>
          <p className="text-[#4b4741] font-['Poppins'] leading-[normal] mt-1 break-all">
            {testimonial.photo}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialModal = ({ testimonial, onSave, onClose }) => {
  const [name, setName] = useState(testimonial ? testimonial.name : "");
  const [text, setText] = useState(testimonial ? testimonial.text : "");
  const [photo, setPhoto] = useState(testimonial ? testimonial.photo : "");
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "wandelen");
      formData.append("cloud_name", "duycbzosb");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/duycbzosb/image/upload",
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;
      setPhoto(imageUrl);
      toast.success("Photo uploaded successfully");
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Error uploading photo");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      text,
      photo,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl mx-4">
        <h2 className="text-2xl font-semibold text-[#381207] mb-6">
          {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Testimonial Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal] h-32 resize-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                disabled={uploading}
              />
              {uploading && (
                <p className="text-sm text-gray-500">Uploading...</p>
              )}
              {photo && (
                <div className="mt-2">
                  <img
                    src={photo}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Photo URL (or upload above)
              </label>
              <input
                type="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                placeholder="Enter Cloudinary URL or upload file above"
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
              disabled={uploading}
            >
              {testimonial ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;
