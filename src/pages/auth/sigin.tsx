
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // Header & Footer
// import AureekaHeader from "@/components/header/AureekaHeader";
// import AureekaFooter from "@/components/footer/AureekaFooter";

// // API
// import { api } from "@/lib/api";

// // AUTH STORAGE
// import { setTempAuth } from "../../lib/authStorage.js";

// // Images
// import aureka from "@/assets/aureka.jpg";
// import aurekaa from "@/assets/aurekaa.webp";
// import aurekaaa from "@/assets/aurekaaa.jpg";

// const OTP_LENGTH = 6;
// const OTP_TIMER = 24;

// const SignIn = () => {
//   const navigate = useNavigate();

//   const [isOtpStep, setIsOtpStep] = useState(false);
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
//   const [timer, setTimer] = useState(OTP_TIMER);
//   const [loading, setLoading] = useState(false);

//   /* ================= TIMER ================= */
//   useEffect(() => {
//     if (!isOtpStep || timer === 0) return;

//     const interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isOtpStep, timer]);

//   /* ================= SEND OTP ================= */
//   const handleGetOtp = async () => {
//     if (mobile.length !== 10) {
//       alert("Please enter a valid 10-digit mobile number");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post(`/api/v1/auth/check-phone?phone=+91${mobile}`);
//       setIsOtpStep(true);
//       setTimer(OTP_TIMER);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= OTP INPUT ================= */
//   const handleOtpChange = (value, index) => {
//     if (!/^\d?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < OTP_LENGTH - 1) {
//       document.getElementById(`otp-${index + 1}`)?.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       document.getElementById(`otp-${index - 1}`)?.focus();
//     }
//   };

//   const resendOtp = () => {
//     setOtp(Array(OTP_LENGTH).fill(""));
//     setTimer(OTP_TIMER);
//     handleGetOtp();
//   };

//   /* ================= VERIFY OTP ================= */
//   const handleVerifyOtp = async () => {
//     const enteredOtp = otp.join("");

//     if (enteredOtp.length !== OTP_LENGTH) {
//       alert("Please enter complete OTP");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("phone", `91${mobile}`);
//       formData.append("token", enteredOtp);

//       const res = await api.post(
//         "/api/v1/auth/verify-otp",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (res.data?.temporary_token) {
//         setTempAuth(res.data.temporary_token, mobile);
//       }

//       if (res.data?.status === false) {
//         navigate("/register");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("OTP not matched");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <AureekaHeader />

//       <main className="min-h-[80vh] flex items-center justify-center bg-[#fffaf4] px-4 py-12">
//         <div className="w-full max-w-5xl rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl bg-white">

//           {/* LEFT */}
//           <div className="p-10 bg-gradient-to-br from-orange-50 to-orange-100">
//             <h1 className="text-3xl font-serif text-orange-900">
//               Aureeka Jewels
//             </h1>
//             <p className="text-orange-800 mt-2">
//               Login now to unlock exclusive jewellery offers ✨
//             </p>

//             <div className="grid grid-cols-3 gap-4 mt-6">
//               {[aureka, aurekaa, aurekaaa].map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   className="w-full h-40 object-cover rounded-xl"
//                   alt="model"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="p-10 flex flex-col justify-center">

//             {/* STEP 1 */}
//             {!isOtpStep && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-6">
//                   Unlock Exclusive Deals
//                 </h2>

//                 {/* ✅ +91 STYLE UPDATED ONLY HERE */}
//                 <div className="flex items-center border rounded-lg overflow-hidden mb-4">
//                   <div className="px-4 py-2 bg-gray-100 text-gray-700 font-medium border-r">
//                     +91
//                   </div>
//                   <input
//                     value={mobile}
//                     onChange={(e) =>
//                       setMobile(e.target.value.replace(/\D/g, ""))
//                     }
//                     placeholder="Enter mobile number"
//                     maxLength={10}
//                     className="w-full px-4 py-2 outline-none"
//                   />
//                 </div>

//                 <button
//                   onClick={handleGetOtp}
//                   disabled={loading}
//                   className="bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white py-3 rounded-lg mb-4"
//                 >
//                   {loading ? "Sending OTP..." : "Get OTP"}
//                 </button>

//                 {/* OR */}
//                 <div className="flex items-center gap-2 my-4">
//                   <div className="flex-1 h-px bg-gray-300" />
//                   <span className="text-sm text-gray-500">OR</span>
//                   <div className="flex-1 h-px bg-gray-300" />
//                 </div>

//                 {/* GOOGLE */}
//                 <button className="border rounded-lg py-2 mb-3 flex items-center justify-center gap-3 hover:bg-gray-50">
//                   <img
//                     src="https://www.svgrepo.com/show/475656/google-color.svg"
//                     className="w-5 h-5"
//                     alt="Google"
//                   />
//                   Continue with Google
//                 </button>

//                 {/* FACEBOOK */}
//                 <button className="border rounded-lg py-2 flex items-center justify-center gap-3 hover:bg-gray-50">
//                   <img
//                     src="https://www.svgrepo.com/show/475647/facebook-color.svg"
//                     className="w-5 h-5"
//                     alt="Facebook"
//                   />
//                   Continue with Facebook
//                 </button>
//               </>
//             )}

//             {/* STEP 2 */}
//             {isOtpStep && (
//               <>
//                 <h2 className="text-2xl font-semibold mb-2">
//                   OTP Verification
//                 </h2>

//                 <p className="text-sm text-gray-600 mb-4">
//                   Verification code sent to +91 {mobile}
//                 </p>

//                 <div className="flex gap-3 mb-4">
//                   {otp.map((digit, index) => (
//                     <input
//                       key={index}
//                       id={`otp-${index}`}
//                       value={digit}
//                       maxLength={1}
//                       onChange={(e) =>
//                         handleOtpChange(e.target.value, index)
//                       }
//                       onKeyDown={(e) => handleKeyDown(e, index)}
//                       className="w-12 h-12 text-center border rounded-lg"
//                     />
//                   ))}
//                 </div>

//                 {timer > 0 ? (
//                   <p className="text-sm text-gray-500 mb-4">
//                     Resend OTP in{" "}
//                     <span className="text-orange-600 font-medium">
//                       {timer}s
//                     </span>
//                   </p>
//                 ) : (
//                   <button
//                     onClick={resendOtp}
//                     className="text-sm text-orange-600 underline mb-4"
//                   >
//                     Resend OTP
//                   </button>
//                 )}

//                 <button
//                   onClick={handleVerifyOtp}
//                   disabled={loading}
//                   className="bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white py-3 rounded-lg"
//                 >
//                   {loading ? "Verifying..." : "Verify"}
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </main>

//       <AureekaFooter />
//     </>
//   );
// };

// export default SignIn;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Header & Footer
import AureekaHeader from "@/components/header/AureekaHeader";
import AureekaFooter from "@/components/footer/AureekaFooter";

// API
import { api } from "@/lib/api";

// AUTH STORAGE
import { setTempAuth } from "../../lib/authStorage.js";

// Images
import aureka from "@/assets/aureka.jpg";
import aurekaa from "@/assets/aurekaa.webp";
import aurekaaa from "@/assets/aurekaaa.jpg";

const OTP_LENGTH = 6;
const OTP_TIMER = 24;

const SignIn = () => {
  const navigate = useNavigate();

  const [isOtpStep, setIsOtpStep] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(OTP_TIMER);
  const [loading, setLoading] = useState(false);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!isOtpStep || timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOtpStep, timer]);

  /* ================= SEND OTP ================= */
  const handleGetOtp = async () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      await api.post(`/api/v1/auth/check-phone?phone=+91${mobile}`);
      setIsOtpStep(true);
      setTimer(OTP_TIMER);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= OTP INPUT ================= */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const resendOtp = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(OTP_TIMER);
    handleGetOtp();
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== OTP_LENGTH) {
      alert("Please enter complete OTP");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("phone", `91${mobile}`); // backend expects this format
      formData.append("token", enteredOtp);

      const res = await api.post(
        "/api/v1/auth/verify-otp",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // ✅ STORE TEMP AUTH (token + phone)
      if (res.data?.temporary_token) {
        setTempAuth(res.data.temporary_token, mobile);
      }

      // ✅ DECISION POINT
      if (res.data?.status === false) {
        // New user
        navigate("/register");
      } else {
        // Existing user
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("OTP not matched");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AureekaHeader />

      <main className="min-h-[80vh] flex items-center justify-center bg-[#fffaf4] px-4 py-12">
        <div className="w-full max-w-5xl rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl bg-white">

          {/* LEFT */}
          <div className="p-10 bg-gradient-to-br from-orange-50 to-orange-100">
            <h1 className="text-3xl font-serif text-orange-900">
              Aureeka Jewels
            </h1>
            <p className="text-orange-800 mt-2">
              Login now to unlock exclusive jewellery offers ✨
            </p>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {[aureka, aurekaa, aurekaaa].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-full h-40 object-cover rounded-xl"
                  alt="model"
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-10 flex flex-col justify-center">

            {/* STEP 1 */}
            {!isOtpStep && (
              <>
                <h2 className="text-2xl font-semibold mb-6">
                  Unlock Exclusive Deals
                </h2>

                {/* ✅ +91 STYLED INPUT */}
                <div className="flex items-center border rounded-lg overflow-hidden mb-4">
                  <div className="px-4 py-2 bg-gray-100 text-gray-700 font-medium border-r">
                    +91
                  </div>
                  <input
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter mobile number"
                    maxLength={10}
                    className="w-full px-4 py-2 outline-none"
                  />
                </div>

                <button
                  onClick={handleGetOtp}
                  disabled={loading}
                  className="bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white py-3 rounded-lg mb-4"
                >
                  {loading ? "Sending OTP..." : "Get OTP"}
                </button>

                {/* OR */}
                <div className="flex items-center gap-2 my-4">
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="text-sm text-gray-500">OR</span>
                  <div className="flex-1 h-px bg-gray-300" />
                </div>

                {/* GOOGLE */}
                <button className="border rounded-lg py-2 mb-3 flex items-center justify-center gap-3 hover:bg-gray-50">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-5 h-5"
                    alt="Google"
                  />
                  Continue with Google
                </button>

                {/* FACEBOOK */}
                <button className="border rounded-lg py-2 flex items-center justify-center gap-3 hover:bg-gray-50">
                  <img
                    src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                    className="w-5 h-5"
                    alt="Facebook"
                  />
                  Continue with Facebook
                </button>
              </>
            )}

            {/* STEP 2 */}
            {isOtpStep && (
              <>
                <h2 className="text-2xl font-semibold mb-2">
                  OTP Verification
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                  Verification code sent to +91 {mobile}
                </p>

                <div className="flex gap-3 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      value={digit}
                      maxLength={1}
                      onChange={(e) =>
                        handleOtpChange(e.target.value, index)
                      }
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center border rounded-lg"
                    />
                  ))}
                </div>

                {timer > 0 ? (
                  <p className="text-sm text-gray-500 mb-4">
                    Resend OTP in{" "}
                    <span className="text-orange-600 font-medium">
                      {timer}s
                    </span>
                  </p>
                ) : (
                  <button
                    onClick={resendOtp}
                    className="text-sm text-orange-600 underline mb-4"
                  >
                    Resend OTP
                  </button>
                )}

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white py-3 rounded-lg"
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <AureekaFooter />
    </>
  );
};

export default SignIn;
