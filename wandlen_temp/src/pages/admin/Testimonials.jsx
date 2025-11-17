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
      console.error("Fout bij het ophalen van testimonials:", error);
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
        toast.success("Testimonial succesvol bijgewerkt");
      } catch (error) {
        console.error("Fout bij het bijwerken van testimonial:", error);
        toast.error("Fout bij het bijwerken van testimonial");
      }
    } else {
      // create
      try {
        await axios.post(`${DATABASE_URL}/admin/testimonials`, dataToSend);
        fetchTestimonials();
        toast.success("Testimonial succesvol aangemaakt");
      } catch (error) {
        console.error("Fout bij het aanmaken van testimonial:", error);
        toast.error("Fout bij het aanmaken van testimonial");
      }
    }
  };

  const handleDelete = async (testimonial) => {
    if (
      window.confirm("Weet je zeker dat je deze testimonial wilt verwijderen?")
    ) {
      try {
        await axios.delete(
          `${DATABASE_URL}/admin/testimonials/${testimonial._id}`
        );
        fetchTestimonials();
        toast.success("Testimonial succesvol verwijderd");
      } catch (error) {
        console.error("Fout bij het verwijderen van testimonial:", error);
        toast.error("Fout bij het verwijderen van testimonial");
      }
    }
  };

  if (loading) {
    return <div>Laden...</div>;
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
              Getuigenis
            </div>
          </div>
        </div>
        <div className="ml-auto flex space-x-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 rounded-lg bg-[#5b6502] text-white font-['Poppins'] font-medium hover:bg-[#4a5201] transition-colors"
          >
            Bewerken
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-['Poppins'] font-medium hover:bg-red-600 transition-colors"
          >
            Verwijderen
          </button>
        </div>
      </div>
      <div className="bg-[#ede4dc] rounded-2xl w-full p-4 md:p-6">
        <div>
          <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
            Testimonial Tekst
          </label>
          <p className="text-[#4b4741] font-['Poppins'] leading-[normal] mt-1">
            "{testimonial.text}"
          </p>
        </div>
        <div className="mt-4">
          <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
            Foto URL
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
      toast.success("Foto succesvol geüpload");
    } catch (error) {
      console.error("Fout bij het uploaden van foto:", error);
      toast.error("Fout bij het uploaden van foto");
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
          {testimonial
            ? "Testimonial Bewerken"
            : "Nieuwe Testimonial Toevoegen"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Naam
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
                Testimonial Tekst
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
                Foto
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                disabled={uploading}
              />
              {uploading && (
                <p className="text-sm text-gray-500">Uploaden...</p>
              )}
              {photo && (
                <div className="mt-2">
                  <img
                    src={photo}
                    alt="Voorvertoning"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Foto URL (of upload hierboven)
              </label>
              <input
                type="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                placeholder="Voer Cloudinary URL in of upload bestand hierboven"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] font-medium hover:bg-gray-50 transition-colors"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[#5b6502] text-white font-['Poppins'] font-medium hover:bg-[#4a5201] transition-colors"
              disabled={uploading}
            >
              {testimonial ? "Bijwerken" : "Aanmaken"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;
