import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogForm = () => {
  const { id } = useParams(); // id will be undefined for create
  const isEdit = !!id;
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      fetchBlog();
    }
  }, [id, isEdit]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/admin/blogs/${id}`);
      if (!response.ok) throw new Error("Failed to fetch blog");
      const blog = await response.json();
      setTitle(blog.title);
      setImgUrl(blog.imgUrl);
      setCoverPreview(blog.imgUrl);
      setContent(
        (blog.content || []).map((item) =>
          item.type === "image"
            ? { ...item, url: item.value, preview: "", file: null }
            : item
        )
      );
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

  const handleSubmit = async () => {
    try {
      let finalImgUrl = imgUrl;
      if (coverImage) {
        const data = new FormData();
        data.append("file", coverImage);
        data.append("upload_preset", "wandelen");
        data.append("cloud_name", "dojwaepbj");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dojwaepbj/auto/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const result = await res.json();
        if (!res.ok) throw new Error("Cover image upload failed");
        finalImgUrl = result.secure_url;
      }

      const finalContent = await Promise.all(
        content.map(async (item, index) => {
          if (item.type === "image" && item.file) {
            const data = new FormData();
            data.append("file", item.file);
            data.append("upload_preset", "wandelen");
            data.append("cloud_name", "dojwaepbj");

            const res = await fetch(
              "https://api.cloudinary.com/v1_1/dojwaepbj/auto/upload",
              {
                method: "POST",
                body: data,
              }
            );
            const result = await res.json();
            if (!res.ok)
              throw new Error(`Content image ${index + 1} upload failed`);
            return { type: "image", value: result.secure_url };
          } else {
            return {
              type: item.type,
              value: item.type === "text" ? item.value : item.url,
            };
          }
        })
      );

      const body = {
        title,
        imgUrl: finalImgUrl,
        content: finalContent,
        author: "Admin", // You can make this dynamic if needed
      };

      const url = isEdit ? `/api/admin/blogs/${id}` : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        navigate("/admin/all-blog");
      } else {
        alert(`Failed to ${isEdit ? "update" : "create"} blog`);
      }
    } catch (error) {
      console.error(`Error ${isEdit ? "updating" : "creating"} blog:`, error);
      alert(`Error ${isEdit ? "updating" : "creating"} blog`);
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

        {/* Dynamic Content */}
        {content.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-2 self-stretch"
          >
            {item.type === "text" ? (
              <textarea
                value={item.value}
                onChange={(e) => handleContentChange(index, e.target.value)}
                placeholder="What's this blog about? Share key highlights or content..."
                className="flex items-center gap-2.5 self-stretch p-3 min-h-[100px] rounded-lg border border-[#b3b1ac] text-[#381207] font-['Poppins'] leading-[normal] focus:outline-none focus:border-[#a6a643] resize-vertical"
              />
            ) : (
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
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="hidden"
                />
              </div>
            )}
          </div>
        ))}

        {/* Add Buttons */}
        <div className="flex items-start gap-4">
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
