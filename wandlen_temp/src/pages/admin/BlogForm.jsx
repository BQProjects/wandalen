import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { DatabaseContext } from "../../contexts/DatabaseContext";

const BlogForm = () => {
  const { id } = useParams(); // id will be undefined for create
  const isEdit = !!id;
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [downloadableResources, setDownloadableResources] = useState([]);
  const [uploadingResource, setUploadingResource] = useState(false);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { DATABASE_URL } = useContext(DatabaseContext);

  useEffect(() => {
    if (isEdit) {
      fetchBlog();
    }
  }, [id, isEdit]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${DATABASE_URL}/admin/blogs/${id}`);
      const blog = response.data;
      setTitle(blog.title);
      setDate(blog.date ? new Date(blog.date).toISOString().split("T")[0] : "");
      setImgUrl(blog.imgUrl);
      setCoverPreview(blog.imgUrl);
      setContent(
        (blog.content || []).map((item) =>
          item.type === "image"
            ? { ...item, url: item.value, preview: "", file: null }
            : item
        )
      );
      setDownloadableResources(blog.downloadableResources || []);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = () => setCoverPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addParagraph = () => {
    setContent([...content, { type: "text", value: "" }]);
  };

  const addHeading = () => {
    setContent([...content, { type: "heading", value: "" }]);
  };

  const addImage = () => {
    setContent([
      ...content,
      { type: "image", file: null, preview: "", url: "" },
    ]);
  };

  const handleContentChange = (index, value) => {
    const newContent = [...content];
    newContent[index].value = value;
    setContent(newContent);
  };

  const handleImageChange = (index, file) => {
    const newContent = [...content];
    newContent[index].file = file;
    newContent[index].url = "";
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        newContent[index].preview = reader.result;
        setContent([...newContent]);
      };
      reader.readAsDataURL(file);
    } else {
      newContent[index].preview = "";
      setContent(newContent);
    }
  };

  const removeContent = (index) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const addDownloadableResource = () => {
    setDownloadableResources([
      ...downloadableResources,
      { name: "", url: "", file: null },
    ]);
  };

  const handleResourceNameChange = (index, name) => {
    const newResources = [...downloadableResources];
    newResources[index].name = name;
    setDownloadableResources(newResources);
  };

  const handleResourceFileChange = async (index, file) => {
    if (!file) return;

    setUploadingResource(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "wandelen");
      data.append("cloud_name", "dojwaepbj");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dojwaepbj/auto/upload",
        data
      );

      const newResources = [...downloadableResources];
      newResources[index].url = res.data.secure_url;
      newResources[index].file = file;
      setDownloadableResources(newResources);
      toast.success("Resource uploaded successfully");
    } catch (error) {
      console.error("Error uploading resource:", error);
      toast.error("Error uploading resource");
    } finally {
      setUploadingResource(false);
    }
  };

  const removeDownloadableResource = (index) => {
    setDownloadableResources(
      downloadableResources.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async () => {
    try {
      let finalImgUrl = imgUrl;
      if (coverImage) {
        const data = new FormData();
        data.append("file", coverImage);
        data.append("upload_preset", "wandelen");
        data.append("cloud_name", "dojwaepbj");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dojwaepbj/auto/upload",
          data
        );
        finalImgUrl = res.data.secure_url;
      }

      const finalContent = await Promise.all(
        content.map(async (item, index) => {
          if (item.type === "image" && item.file) {
            const data = new FormData();
            data.append("file", item.file);
            data.append("upload_preset", "wandelen");
            data.append("cloud_name", "dojwaepbj");

            const res = await axios.post(
              "https://api.cloudinary.com/v1_1/dojwaepbj/auto/upload",
              data
            );
            return { type: "image", value: res.data.secure_url };
          } else {
            return {
              type: item.type,
              value: item.value,
            };
          }
        })
      );

      const body = {
        title,
        date,
        imgUrl: finalImgUrl,
        content: finalContent,
        author: "Admin", // You can make this dynamic if needed
        downloadableResources: downloadableResources.map((resource) => ({
          name: resource.name,
          url: resource.url,
        })),
      };

      if (isEdit) {
        await axios.put(`${DATABASE_URL}/admin/blogs/${id}`, body);
        toast.success("Blog updated successfully");
      } else {
        await axios.post(`${DATABASE_URL}/admin/blogs`, body);
        toast.success("Blog created successfully");
      }
      navigate("/admin/all-blog");
    } catch (error) {
      console.error(`Error ${isEdit ? "updating" : "creating"} blog:`, error);
      toast.error(`Error ${isEdit ? "updating" : "creating"} blog`);
    }
  };

  const handleCancel = () => {
    navigate("/admin/all-blog");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="text-[#dd9219] font-['Poppins'] text-2xl font-semibold leading-[136%] mb-2">
          Blog Management
        </div>
        <div className="text-[#381207] font-['Poppins'] text-5xl font-medium leading-[136%]">
          {isEdit ? "Edit Blog" : "Create Blog"}
        </div>
        <div className="text-[#381207] font-['Poppins'] text-lg leading-[136%] mt-2">
          {isEdit ? "Update the blog details." : "Create a new blog post."}
        </div>
      </div>

      {/* Cover Image Section */}
      <div className="flex flex-col items-start gap-4 p-6 w-full rounded-2xl bg-[#f7f6f4] mb-6">
        <div className="self-stretch text-[#381207] font-['Poppins'] text-lg font-medium leading-[normal]">
          Blog cover page
        </div>
        <div className="flex flex-col justify-center items-center gap-2.5 self-stretch pt-16 pb-16 pl-24 pr-24 rounded-lg border-2 border-dashed border-[#e5e3df] bg-[#f7f6f4] relative">
          {coverPreview ? (
            <img
              src={coverPreview}
              alt="Cover"
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <div
              className="flex justify-center items-center gap-2.5 py-2 px-5 rounded-lg bg-[#a6a643] text-white text-center font-['Poppins'] font-medium leading-[136%] cursor-pointer"
              onClick={() => document.getElementById("cover-upload").click()}
            >
              Upload Image
            </div>
          )}
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="flex flex-col items-start gap-4 p-6 w-full rounded-2xl bg-[#f7f6f4] mb-6">
        {/* Title */}
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
            Blog title *
          </div>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a clear and concise title"
            className="flex items-center gap-2.5 self-stretch p-3 h-11 rounded-lg border border-[#b3b1ac] text-[#381207] font-['Poppins'] leading-[normal] focus:outline-none focus:border-[#a6a643]"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
            Blog date *
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex items-center gap-2.5 self-stretch p-3 h-11 rounded-lg border border-[#b3b1ac] text-[#381207] font-['Poppins'] leading-[normal] focus:outline-none focus:border-[#a6a643]"
          />
        </div>

        {/* Dynamic Content */}
        {content.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-2 self-stretch"
          >
            {item.type === "text" ? (
              <>
                <textarea
                  value={item.value}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  placeholder="What's this blog about? Share key highlights or content..."
                  className="flex items-center gap-2.5 self-stretch p-3 min-h-[100px] rounded-lg border border-[#b3b1ac] text-[#381207] font-['Poppins'] leading-[normal] focus:outline-none focus:border-[#a6a643] resize-vertical"
                />
                <button
                  onClick={() => removeContent(index)}
                  className="mt-2 py-1 px-3 rounded bg-red-500 text-white text-sm"
                >
                  Remove
                </button>
              </>
            ) : item.type === "heading" ? (
              <>
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  placeholder="Enter heading text..."
                  className="flex items-center gap-2.5 self-stretch p-3 h-11 rounded-lg border border-[#b3b1ac] text-[#381207] font-['Poppins'] font-semibold leading-[normal] focus:outline-none focus:border-[#a6a643]"
                />
                <button
                  onClick={() => removeContent(index)}
                  className="mt-2 py-1 px-3 rounded bg-red-500 text-white text-sm"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2.5 self-stretch p-3 rounded-lg border border-[#b3b1ac]">
                  {item.preview || item.url ? (
                    <img
                      src={item.preview || item.url}
                      alt={`Content ${index}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div
                      className="flex justify-center items-center gap-2.5 py-2 px-5 rounded-lg bg-[#a6a643] text-white text-center font-['Poppins'] font-medium leading-[136%] cursor-pointer"
                      onClick={() =>
                        document.getElementById(`image-upload-${index}`).click()
                      }
                    >
                      Upload Image
                    </div>
                  )}
                  <input
                    id={`image-upload-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange(index, e.target.files[0])
                    }
                    className="hidden"
                  />
                </div>
                <button
                  onClick={() => removeContent(index)}
                  className="mt-2 py-1 px-3 rounded bg-red-500 text-white text-sm"
                >
                  Remove
                </button>
              </>
            )}
          </div>
        ))}

        {/* Add Buttons */}
        <div className="flex items-start gap-4">
          <button
            onClick={addHeading}
            className="flex justify-center items-center gap-2.5 py-2 px-5 rounded-lg bg-[#e5e3df] text-[#4b4741] font-['Poppins'] font-medium leading-[136%] hover:bg-[#d5d3cf] transition-colors"
          >
            Add Heading
          </button>
          <button
            onClick={addParagraph}
            className="flex justify-center items-center gap-2.5 py-2 px-5 rounded-lg bg-[#e5e3df] text-[#4b4741] font-['Poppins'] font-medium leading-[136%] hover:bg-[#d5d3cf] transition-colors"
          >
            Add paragraph
          </button>
          <button
            onClick={addImage}
            className="flex justify-center items-center gap-2.5 py-2 px-5 rounded-lg bg-[#e5e3df] text-[#4b4741] font-['Poppins'] font-medium leading-[136%] hover:bg-[#d5d3cf] transition-colors"
          >
            Add Image
          </button>
        </div>
      </div>

      {/* Downloadable Resources Section */}
      <div className="flex flex-col items-start gap-4 p-6 w-full rounded-2xl bg-[#f7f6f4] mb-6">
        <div className="self-stretch text-[#381207] font-['Poppins'] text-lg font-medium leading-[normal]">
          Downloadable Resources
        </div>

        {downloadableResources.map((resource, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-2 self-stretch p-4 rounded-lg border border-[#b3b1ac] bg-white"
          >
            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Resource Name *
              </div>
              <input
                type="text"
                value={resource.name}
                onChange={(e) =>
                  handleResourceNameChange(index, e.target.value)
                }
                placeholder="Enter resource name (e.g., 'Guide PDF', 'Report 2024')"
                className="flex items-center gap-2.5 self-stretch p-3 h-11 rounded-lg border border-[#b3b1ac] text-[#381207] font-['Poppins'] leading-[normal] focus:outline-none focus:border-[#a6a643]"
              />
            </div>

            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="text-[#381207] font-['Poppins'] font-medium leading-[normal]">
                Upload File *
              </div>
              <div className="flex flex-col items-center gap-2.5 self-stretch p-3 rounded-lg border border-[#b3b1ac]">
                {resource.url ? (
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-green-600 font-medium">
                      ✓ File uploaded
                    </span>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View file
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="flex justify-center items-center gap-2.5 py-2 px-5 rounded-lg bg-[#a6a643] text-white text-center font-['Poppins'] font-medium leading-[136%] cursor-pointer hover:bg-[#8f9b3a] transition-colors"
                      onClick={() =>
                        document
                          .getElementById(`resource-upload-${index}`)
                          .click()
                      }
                    >
                      {uploadingResource ? "Uploading..." : "Upload File"}
                    </div>
                    <span className="text-sm text-gray-500">
                      Supported formats: PDF, DOC, DOCX, XLS, XLSX, etc.
                    </span>
                  </div>
                )}
                <input
                  id={`resource-upload-${index}`}
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
                  onChange={(e) =>
                    handleResourceFileChange(index, e.target.files[0])
                  }
                  className="hidden"
                  disabled={uploadingResource}
                />
              </div>
            </div>

            <button
              onClick={() => removeDownloadableResource(index)}
              className="mt-2 py-1 px-3 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
            >
              Remove Resource
            </button>
          </div>
        ))}

        <button
          onClick={addDownloadableResource}
          className="flex justify-center items-center gap-2.5 py-2 px-5 rounded-lg bg-[#a6a643] text-white font-['Poppins'] font-medium leading-[136%] hover:bg-[#8f9b3a] transition-colors"
        >
          Add Downloadable Resource
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handleCancel}
          className="flex justify-center items-center gap-2.5 py-2 px-5 rounded-lg bg-[#e5e3df] text-[#4b4741] font-['Poppins'] font-medium leading-[136%] hover:bg-[#d5d3cf] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="flex justify-center items-center gap-2.5 py-2 px-5 rounded-lg bg-[#a6a643] text-white font-['Poppins'] font-medium leading-[136%] hover:bg-[#8f9b3a] transition-colors"
        >
          {isEdit ? "Update" : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default BlogForm;
