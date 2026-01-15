"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiUser, BiLock, BiEnvelope, BiKey, BiArrowBack, BiCheckCircle } from "react-icons/bi";

type FormType = "login" | "forgotPassword" | "otp" | "resetPassword";

export default function AuthPage() {
  const [currentForm, setCurrentForm] = useState<FormType>("login");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const showForm = (formId: FormType) => {
    setCurrentForm(formId);
    setError("");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Session is now handled server-side via cookies
        // Check for redirect parameter
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get("redirect");
        router.push(redirect || "/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email") as string;
    setEmail(emailValue);

    try {
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send-otp", email: emailValue }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("OTP sent to your email.");
        showForm("otp");
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const otpValue = formData.get("otp") as string;
    setOtp(otpValue);

    try {
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify-otp", email, otp: otpValue }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("OTP verified");
        showForm("resetPassword");
      } else {
        setError(data.error || "Invalid or expired OTP");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get("new-password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset-password", email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset successful!");
        showForm("login");
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background: "linear-gradient(to right, #1b6e49, #34C759)"
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Login Form */}
        {currentForm === "login" && (
          <form 
            onSubmit={handleLogin} 
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-white/30"
            style={{
              animation: "fadeInUp 0.6s ease-out both",
            }}
          >
            <h3 className="text-3xl font-bold text-primary-800 mb-8 text-center">Login</h3>

            <div className="mb-5">
              <label htmlFor="username" className="block text-sm font-semibold text-primary-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BiUser className="text-primary-400 text-xl" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Email or Phone"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 bg-white"
                />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block text-sm font-semibold text-primary-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BiLock className="text-primary-400 text-xl" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 bg-white"
                />
              </div>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="mb-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => showForm("forgotPassword")}
                className="text-accent hover:text-accent-dark font-semibold text-sm transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-accent to-accent-dark text-white py-3 rounded-xl hover:from-accent-dark hover:to-accent transition-all duration-300 disabled:opacity-50 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        )}

        {/* Forgot Password Form */}
        {currentForm === "forgotPassword" && (
          <form 
            onSubmit={handleForgotPassword} 
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-white/30"
            style={{
              animation: "fadeInUp 0.6s ease-out both",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => showForm("login")}
                className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
              >
                <BiArrowBack className="text-primary-700 text-xl" />
              </button>
              <h3 className="text-3xl font-bold text-primary-800">Forgot Password</h3>
            </div>
            <p className="text-primary-600 text-sm mb-6">
              Enter your email address and we&apos;ll send you an OTP to reset your password.
            </p>

            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-semibold text-primary-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BiEnvelope className="text-primary-400 text-xl" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 bg-white"
                />
              </div>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-accent to-accent-dark text-white py-3 rounded-xl hover:from-accent-dark hover:to-accent transition-all duration-300 disabled:opacity-50 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] mb-4"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        )}

        {/* OTP Form */}
        {currentForm === "otp" && (
          <form 
            onSubmit={handleVerifyOTP} 
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-white/30"
            style={{
              animation: "fadeInUp 0.6s ease-out both",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => showForm("login")}
                className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
              >
                <BiArrowBack className="text-primary-700 text-xl" />
              </button>
              <h3 className="text-3xl font-bold text-primary-800">Enter OTP</h3>
            </div>
            <p className="text-primary-600 text-sm mb-6">
              Please enter the 6-digit OTP sent to your email.
            </p>

            <div className="mb-5">
              <label htmlFor="otp" className="block text-sm font-semibold text-primary-700 mb-2">
                OTP Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BiKey className="text-primary-400 text-xl" />
                </div>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 bg-white text-center text-2xl font-bold tracking-widest"
                />
              </div>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-accent to-accent-dark text-white py-3 rounded-xl hover:from-accent-dark hover:to-accent transition-all duration-300 disabled:opacity-50 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] mb-4"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        )}

        {/* Reset Password Form */}
        {currentForm === "resetPassword" && (
          <form 
            onSubmit={handleResetPassword} 
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-white/30"
            style={{
              animation: "fadeInUp 0.6s ease-out both",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => showForm("login")}
                className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
              >
                <BiArrowBack className="text-primary-700 text-xl" />
              </button>
              <h3 className="text-3xl font-bold text-primary-800">Reset Password</h3>
            </div>
            <p className="text-primary-600 text-sm mb-6">
              Please enter your new password below. Password must be at least 8 characters long.
            </p>

            <div className="mb-5">
              <label htmlFor="new-password" className="block text-sm font-semibold text-primary-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BiLock className="text-primary-400 text-xl" />
                </div>
                <input
                  type="password"
                  id="new-password"
                  name="new-password"
                  placeholder="Enter new password"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 bg-white"
                />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="confirm-password" className="block text-sm font-semibold text-primary-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BiCheckCircle className="text-primary-400 text-xl" />
                </div>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirm new password"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 bg-white"
                />
              </div>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-accent to-accent-dark text-white py-3 rounded-xl hover:from-accent-dark hover:to-accent transition-all duration-300 disabled:opacity-50 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] mb-4"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
