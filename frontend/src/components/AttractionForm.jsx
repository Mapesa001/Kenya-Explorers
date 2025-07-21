import React, { useState, useEffect } from "react";
import {
  FiMapPin,
  FiImage,
  FiTrash2,
  FiPhone,
  FiMap,
  FiDollarSign,
  FiCompass,
} from "react-icons/fi";
import { MdCategory, MdTitle, MdOutlineDescription } from "react-icons/md";
import { counties } from "../constants/kenyaCounties"; // Separate file for counties
import { useDropzone } from "react-dropzone";

export default function AttractionForm() {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    region: "",
    coordinates: "",
    entryFee: "",
    phone: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [previewImages, setPreviewImages] = useState([]);

  // Auto-detect coordinates
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;
        setFormData((prev) => ({ ...prev, coordinates: coords }));
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
      }
    );
  }, []);

  // Dropzone for image upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      const newImages = [...formData.images, ...acceptedFiles];
      setFormData((prev) => ({ ...prev, images: newImages }));

      const newPreviews = acceptedFiles.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    const updatedPreviews = [...previewImages];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
    setPreviewImages(updatedPreviews);
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "title",
      "description",
      "category",
      "location",
      "region",
      "entryFee",
      "phone",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((img) => body.append("images[]", img));
      } else {
        body.append(key, value);
      }
    });

    setLoading(true);
    try {
      const res = await fetch("https://kenya-explorers.onrender.com/api/attractions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
        body,
      });
      console.log('submition failed')
      if (!res.ok) throw new Error("Submission failed");
      setSuccessMsg("Attraction submitted successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        region: "",
        coordinates: "",
        entryFee: "",
        phone: "",
        images: [],
      });
      setPreviewImages([]);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
        📍 Add a Tourist Attraction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
            <MdTitle className="text-2xl text-primary" /> Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
            <MdOutlineDescription className="text-2xl text-primary" /> Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
            <MdCategory className="text-2xl text-primary" /> Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">-- Select Category --</option>
            {[
              "game park",
              "beach",
              "mountain",
              "lake",
              "museum",
              "cultural site",
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
            <FiMap className="text-2xl text-primary" /> Location (Name)
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        {/* Region */}
        <div>
          <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
            <FiMapPin className="text-2xl text-primary" /> Region (County)
          </label>
          <select
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">-- Select County --</option>
            {counties.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
          {errors.region && (
            <p className="text-red-500 text-sm">{errors.region}</p>
          )}
        </div>

        {/* Coordinates */}
        <div>
          <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
            <FiCompass className="text-2xl text-primary" /> Coordinates (Auto-filled)
          </label>
          <input
            type="text"
            name="coordinates"
            value={formData.coordinates}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
          />
        </div>

        {/* Entry Fee */}
        <div>
          <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
            <FiDollarSign className="text-2xl text-primary" /> Entry Fee
          </label>
          <input
            type="text"
            name="entryFee"
            value={formData.entryFee}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.entryFee && (
            <p className="text-red-500 text-sm">{errors.entryFee}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
            <FiPhone className="text-2xl text-primary" /> Contact Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
            <FiImage className="text-2xl text-primary" /> Images
          </label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed p-6 rounded-lg bg-gray-50 cursor-pointer hover:bg-blue-50 transition"
          >
            <input {...getInputProps()} />
            <p className="text-gray-500 text-center">
              <span className="hidden sm:block">Drag & drop images or</span>{" "}
              click to browse
            </p>
          </div>
        </div>

        {/* Preview Images */}
        {previewImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {previewImages.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img.url}
                  alt="preview"
                  className="w-full h-40 object-cover rounded-lg shadow"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-600 shadow hover:bg-red-100 hidden group-hover:block"
                >
                  <FiTrash2 className="text-2xl text-primary" size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold w-full"
          >
            {loading ? "Submitting..." : "Submit Attraction"}
          </button>
          {successMsg && (
            <p className="text-green-600 mt-2 text-center">{successMsg}</p>
          )}
        </div>
      </form>
    </div>
  );
}
