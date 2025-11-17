import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DatabaseContext } from "../../contexts/DatabaseContext";
import toast from "react-hot-toast";

const Media = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const { DATABASE_URL } = useContext(DatabaseContext);

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    try {
      const response = await axios.get(`${DATABASE_URL}/admin/media`);
      const data = response.data;
      setMediaItems(data);
    } catch (error) {
      console.error("Fout bij het ophalen van media items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (media, updatedData) => {
    const dataToSend = { ...updatedData };
    if (media && media._id) {
      // update
      try {
        await axios.put(`${DATABASE_URL}/admin/media/${media._id}`, dataToSend);
        fetchMediaItems();
        toast.success("Media item succesvol bijgewerkt");
      } catch (error) {
        console.error("Fout bij het bijwerken van media item:", error);
        toast.error("Fout bij het bijwerken van media item");
      }
    } else {
      // create
      try {
        await axios.post(`${DATABASE_URL}/admin/media`, dataToSend);
        fetchMediaItems();
        toast.success("Media item succesvol aangemaakt");
      } catch (error) {
        console.error("Fout bij het aanmaken van media item:", error);
        toast.error("Fout bij het aanmaken van media item");
      }
    }
  };

  const handleDelete = async (media) => {
    if (
      window.confirm("Weet je zeker dat je dit media item wilt verwijderen?")
    ) {
      try {
        await axios.delete(`${DATABASE_URL}/admin/media/${media._id}`);
        fetchMediaItems();
        toast.success("Media item succesvol verwijderd");
      } catch (error) {
        console.error("Fout bij het verwijderen van media item:", error);
        toast.error("Fout bij het verwijderen van media item");
      }
    }
  };

  if (loading) {
    return <div>Laden...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f6f4] p-6 overflow-x-auto relative">
      <div className="flex flex-col items-start w-full max-w-6xl mx-auto space-y-6">
        {mediaItems.map((media) => (
          <MediaSection
            key={media._id}
            media={media}
            onEdit={() => {
              setSelectedMedia(media);
              setIsModalOpen(true);
            }}
            onDelete={() => handleDelete(media)}
          />
        ))}
      </div>
      {/* Floating Action Button */}
      <button
        onClick={() => {
          setSelectedMedia(null);
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
        <MediaModal
          media={selectedMedia}
          onSave={(data) => {
            handleCreateOrUpdate(selectedMedia, data);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const MediaSection = ({ media, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col items-start w-full bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 md:p-8">
      <div className="flex items-start self-stretch mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-[#A6A643] to-[#8F9B3A] rounded-full flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="14,2 14,8 20,8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="text-[#381207] text-xl font-semibold font-['Poppins'] leading-[normal]">
              {media.source}
            </div>
            <div className="text-[#4b4741] font-['Poppins'] text-sm mt-1">
              Media Dekking
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
            Artikel Titel
          </label>
          <p className="text-[#4b4741] font-['Poppins'] leading-[normal] mt-1">
            "{media.title}"
          </p>
        </div>
        <div className="mt-4">
          <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
            Nieuwsbron
          </label>
          <p className="text-[#4b4741] font-['Poppins'] leading-[normal] mt-1">
            {media.source}
          </p>
        </div>
        <div className="mt-4">
          <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
            Artikel Link
          </label>
          <p className="text-[#4b4741] font-['Poppins'] leading-[normal] mt-1 break-all">
            {media.link}
          </p>
        </div>
      </div>
    </div>
  );
};

const MediaModal = ({ media, onSave, onClose }) => {
  const [title, setTitle] = useState(media ? media.title : "");
  const [source, setSource] = useState(media ? media.source : "");
  const [link, setLink] = useState(media ? media.link : "");
  const [banner, setBanner] = useState(media ? media.banner : "");
  const [uploading, setUploading] = useState(false);

  const handleBannerUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "wandelen");
      formData.append("cloud_name", "dojwaepbj");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dojwaepbj/image/upload",
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;
      setBanner(imageUrl);
      toast.success("Banner succesvol geüpload");
    } catch (error) {
      console.error("Fout bij het uploaden van banner:", error);
      toast.error("Fout bij het uploaden van banner");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      source,
      link,
      banner,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl mx-4">
        <h2 className="text-2xl font-semibold text-[#381207] mb-6">
          {media ? "Media Item Bewerken" : "Nieuw Media Item Toevoegen"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Artikel Titel *
              </label>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal] h-24 resize-none"
                placeholder="Voer de artikel titel in"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Nieuwsbron *
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                placeholder="bijv., NOS, De Stentor, RTV Oost"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Artikel Link *
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                placeholder="https://voorbeeld.com/artikel"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Banner Afbeelding
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleBannerUpload(e.target.files[0])}
                className="w-full p-3 rounded-lg border border-[#b3b1ac] text-[#4b4741] font-['Poppins'] leading-[normal]"
                disabled={uploading}
              />
              {uploading && (
                <p className="text-sm text-gray-500">Uploaden...</p>
              )}
              {banner && (
                <div className="mt-2">
                  <img
                    src={banner}
                    alt="Banner Voorvertoning"
                    className="w-32 h-20 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Banner URL (of upload hierboven)
              </label>
              <input
                type="url"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
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
            >
              {media ? "Bijwerken" : "Aanmaken"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Media;
