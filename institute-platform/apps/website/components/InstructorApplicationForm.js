import { useState } from "react";
import { t } from "../lib/i18n";

export default function InstructorApplicationForm({ dict }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    expertise: "",
    bio: "",
    course_idea: ""
  });
  const [files, setFiles] = useState({
    cv_file: null,
    cert_1: null,
    cert_2: null,
    cert_3: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(false);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    Object.keys(files).forEach(key => {
      if (files[key]) data.append(key, files[key]);
    });

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiBaseUrl}/api/trainer-applications/`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
        // Reset form
      } else {
        setErrors(result.errors || { general: "Something went wrong" });
      }
    } catch (err) {
      setErrors({ general: "Could not connect to server" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <div className="p-3 bg-green-100 text-green-700 rounded">Application submitted successfully!</div>}
      {errors.general && <div className="p-3 bg-red-100 text-red-700 rounded">{errors.general}</div>}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t(dict, "forms.fullName")}</label>
          <input name="full_name" required onChange={handleChange} type="text" className="mt-1 block w-full rounded border-gray-300" />
          {errors.full_name && <p className="text-xs text-red-500">{errors.full_name[0]}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t(dict, "forms.email")}</label>
          <input name="email" required onChange={handleChange} type="email" className="mt-1 block w-full rounded border-gray-300" />
          {errors.email && <p className="text-xs text-red-500">{errors.email[0]}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t(dict, "forms.phone")}</label>
          <input name="phone" required onChange={handleChange} type="text" className="mt-1 block w-full rounded border-gray-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t(dict, "forms.expertise")}</label>
          <input name="expertise" required onChange={handleChange} type="text" className="mt-1 block w-full rounded border-gray-300" />
        </div>
      </div>

      <div>
        <div className="flex justify-between">
          <label className="block text-sm font-medium text-gray-700">{t(dict, "forms.bio")}</label>
          <span className="text-xs text-gray-500">{formData.bio.length}/500</span>
        </div>
        <textarea name="bio" required onChange={handleChange} rows={3} className="mt-1 block w-full rounded border-gray-300" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">{t(dict, "forms.courseIdea")}</label>
        <textarea name="course_idea" required onChange={handleChange} rows={2} className="mt-1 block w-full rounded border-gray-300" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t(dict, "forms.cv")} (PDF/DOC)</label>
          <input name="cv_file" required onChange={handleFileChange} type="file" accept=".pdf,.doc,.docx" className="mt-1 block w-full text-sm" />
          {errors.cv_file && <p className="text-xs text-red-500">{errors.cv_file[0]}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t(dict, "forms.certificates")} (Max 3)</label>
          <input name="cert_1" onChange={handleFileChange} type="file" accept=".pdf,.jpg,.jpeg,.png" className="mt-1 block w-full text-sm" />
          <input name="cert_2" onChange={handleFileChange} type="file" accept=".pdf,.jpg,.jpeg,.png" className="mt-1 block w-full text-sm mt-1" />
          <input name="cert_3" onChange={handleFileChange} type="file" accept=".pdf,.jpg,.jpeg,.png" className="mt-1 block w-full text-sm mt-1" />
        </div>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-instituteDarkGreen text-white px-6 py-3 rounded font-semibold mt-4 disabled:opacity-50"
      >
        {loading ? "..." : t(dict, "common.submit")}
      </button>
    </form>
  );
}
