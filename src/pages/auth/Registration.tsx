
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Header & Footer
import AureekaHeader from "@/components/header/AureekaHeader";
import AureekaFooter from "@/components/footer/AureekaFooter";

// API
import { api } from "@/lib/api";

// ✅ AUTH STORAGE HELPERS
import {
  getTempAuth,
  clearTempAuth,
  setAuthToken,
} from "../../lib/authStorage.js";

import { User, Mail } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!name) {
      alert("Name is required");
      return;
    }

    try {
      // ✅ SAFE WAY TO GET TEMP DATA
      const { token, phone } = getTempAuth();

      if (!token || !phone) {
        alert("Session expired. Please login again.");
        navigate("/signin");
        return;
      }

      // ✅ SAME AS POSTMAN
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);

      const res = await api.post(
        "/api/v1/auth/registration-with-otp",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // ✅ FINAL LOGIN TOKEN
      if (res.data?.token) {
        setAuthToken(res.data.token);
        clearTempAuth(); // 🔥 ONLY CLEAR OTP DATA
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <>
      <AureekaHeader />

      <main className="min-h-[80vh] flex items-center justify-center bg-[#fdf8f3] px-4 py-12">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-8 py-6 text-center">
            <h1 className="text-2xl font-serif text-orange-900">
              Aureeka Jewels
            </h1>
            <p className="text-sm text-orange-800 mt-1">
              Just one step away from a personalized experience ✨
            </p>
          </div>

          <div className="px-8 py-8">
            {/* NAME */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Name *
              </label>
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
                <User className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-1">
                Email
              </label>
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-medium shadow-md"
            >
              Done
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              We respect your privacy & never share your data.
            </p>
          </div>
        </div>
      </main>

      <AureekaFooter />
    </>
  );
};

export default Register;
