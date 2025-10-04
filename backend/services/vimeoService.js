const axios = require("axios");
const FormData = require("form-data");

/**
 * Vimeo Upload Service
 * Handles video uploads to Vimeo using their API
 */

class VimeoService {
  constructor() {
    this.accessToken =
      process.env.VIMEO_ACCESS_TOKEN || "47f86c1de3626455750d70a90f8383b4";
    this.baseUrl = "https://api.vimeo.com";

    if (!this.accessToken) {
      console.warn(
        "Warning: VIMEO_ACCESS_TOKEN is not set in environment variables"
      );
    }
  }

  /**
   * Upload video to Vimeo using TUS protocol
   * @param {Buffer} videoBuffer - Video file buffer
   * @param {Object} videoDetails - Video metadata
   * @returns {Promise<Object>} - Upload result with video URL
   */
  async uploadVideo(videoBuffer, videoDetails = {}) {
    try {
      const { title, description } = videoDetails;

      // Step 1: Create the video resource on Vimeo using TUS approach
      console.log("Creating video resource on Vimeo...");
      const createResponse = await axios.post(
        `${this.baseUrl}/me/videos`,
        {
          upload: {
            approach: "tus",
            size: videoBuffer.length,
          },
          name: title || "Untitled Video",
          description: description || "",
          privacy: {
            view: "unlisted", // Not in public search
            embed: "public", // Can be embedded
            download: false, // Prevent downloads
          },
          embed: {
            buttons: {
              like: false,
              watchlater: false,
              share: false, // Hide share button
              embed: false, // Hide embed button
            },
            logos: {
              vimeo: false, // Hide Vimeo logo
            },
            title: {
              name: "hide", // Hide video title
              owner: "hide", // Hide owner name
              portrait: "hide", // Hide portrait
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.vimeo.*+json;version=3.4",
          },
        }
      );

      const uploadLink = createResponse.data.upload.upload_link;
      const videoUri = createResponse.data.uri;
      const videoId = videoUri.split("/").pop();

      console.log(`Video resource created with ID: ${videoId}`);
      console.log(`Upload link: ${uploadLink}`);

      // Step 2: Upload the actual video file using TUS protocol
      console.log("Uploading video file...");
      await axios.patch(uploadLink, videoBuffer, {
        headers: {
          "Tus-Resumable": "1.0.0",
          "Upload-Offset": "0",
          "Content-Type": "application/offset+octet-stream",
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      console.log("Video uploaded successfully, waiting for processing...");

      // Step 3: Wait a bit for Vimeo to process the video
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 4: Get the video details including playback URL
      console.log("Fetching video details...");
      const videoDetailsResponse = await axios.get(
        `${this.baseUrl}/videos/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            Accept: "application/vnd.vimeo.*+json;version=3.4",
          },
        }
      );

      // Construct embed URL with privacy hash and embed parameters
      const privacyHash =
        videoDetailsResponse.data.player_embed_url
          .split("?h=")[1]
          ?.split("&")[0] || "";
      const embedParams = `?h=${privacyHash}&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
      const fullEmbedUrl = `https://player.vimeo.com/video/${videoId}${embedParams}`;

      return {
        success: true,
        videoId: videoId,
        videoUrl: fullEmbedUrl,
        link: videoDetailsResponse.data.link,
        duration: videoDetailsResponse.data.duration,
        embedUrl: fullEmbedUrl,
        data: videoDetailsResponse.data,
      };
    } catch (error) {
      console.error("Vimeo upload error:", error.response?.data || error);
      throw new Error(
        `Failed to upload video to Vimeo: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  }

  /**
   * Delete video from Vimeo
   * @param {String} videoId - Vimeo video ID
   * @returns {Promise<Boolean>}
   */
  async deleteVideo(videoId) {
    try {
      await axios.delete(`${this.baseUrl}/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      });
      return true;
    } catch (error) {
      console.error("Vimeo delete error:", error.response?.data || error);
      throw new Error(`Failed to delete video from Vimeo: ${error.message}`);
    }
  }

  /**
   * Update video details on Vimeo
   * @param {String} videoId - Vimeo video ID
   * @param {Object} updates - Video updates
   * @returns {Promise<Object>}
   */
  async updateVideo(videoId, updates) {
    try {
      const response = await axios.patch(
        `${this.baseUrl}/videos/${videoId}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.vimeo.*+json;version=3.4",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Vimeo update error:", error.response?.data || error);
      throw new Error(`Failed to update video on Vimeo: ${error.message}`);
    }
  }

  /**
   * Get video details from Vimeo
   * @param {String} videoId - Vimeo video ID
   * @returns {Promise<Object>}
   */
  async getVideo(videoId) {
    try {
      const response = await axios.get(`${this.baseUrl}/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Vimeo get video error:", error.response?.data || error);
      throw new Error(`Failed to get video from Vimeo: ${error.message}`);
    }
  }

  /**
   * Upload custom thumbnail to Vimeo video
   * @param {String} videoId - Vimeo video ID
   * @param {Buffer} thumbnailBuffer - Thumbnail image buffer
   * @returns {Promise<Object>} - Upload result with thumbnail URL
   */
  async uploadThumbnail(videoId, thumbnailBuffer) {
    try {
      console.log(`Uploading thumbnail for video ${videoId}...`);

      // Step 1: Create a picture resource
      const createPictureResponse = await axios.post(
        `${this.baseUrl}/videos/${videoId}/pictures`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.vimeo.*+json;version=3.4",
          },
        }
      );

      const pictureUri = createPictureResponse.data.uri;
      const uploadLink = createPictureResponse.data.link;

      console.log(`Picture resource created: ${pictureUri}`);

      // Step 2: Upload the thumbnail image
      await axios.put(uploadLink, thumbnailBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      console.log("Thumbnail uploaded successfully");

      // Step 3: Set the uploaded picture as active thumbnail
      await axios.patch(
        `${this.baseUrl}${pictureUri}`,
        { active: true },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.vimeo.*+json;version=3.4",
          },
        }
      );

      console.log("Thumbnail set as active");

      // Get the thumbnail URLs
      const sizes = createPictureResponse.data.sizes || [];
      const thumbnailUrl =
        sizes.length > 0 ? sizes[sizes.length - 1].link : null;

      return {
        success: true,
        thumbnailUrl,
        pictureUri,
        sizes,
      };
    } catch (error) {
      console.error(
        "Vimeo thumbnail upload error:",
        error.response?.data || error
      );
      throw new Error(
        `Failed to upload thumbnail to Vimeo: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  }
}

module.exports = new VimeoService();
