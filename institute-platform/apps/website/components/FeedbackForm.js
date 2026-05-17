import { useState } from "react";
import { t } from "../lib/i18n";

export default function FeedbackForm({ dict }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiBaseUrl}/api/feedback/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrors(data.errors || { general: "Something went wrong" });
      }
    } catch (err) {
      setErrors({ general: "Could not connect to server" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <div className="p-3 bg-green-100 text-green-700 rounded">Submitted successfully!</div>}
      {errors.general && <div className="p-3 bg-red-100 text-red-700 rounded">{errors.general}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700">{t(dict, "forms.name")}</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-instituteGold focus:ring-instituteGold"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">{t(dict, "forms.email")}</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-instituteGold focus:ring-instituteGold"
        />
      </div>

      <div>
        <div className="flex justify-between">
          <label className="block text-sm font-medium text-gray-700">{t(dict, "forms.message")}</label>
          <span className="text-xs text-gray-500">{formData.message.length}/500</span>
        </div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className={`mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-instituteGold focus:ring-instituteGold ${errors.message ? 'border-red-500' : ''}`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message[0]}</p>}
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
