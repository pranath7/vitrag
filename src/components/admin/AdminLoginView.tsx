"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, KeyRound, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { loginAdmin } from "@/lib/adminStorage";

interface AdminLoginViewProps {
  onSuccess: () => void;
}

export function AdminLoginView({ onSuccess }: AdminLoginViewProps) {
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError("Please enter the store admin passcode.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await loginAdmin(passcode.trim(), remember);
      setLoading(false);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || "Incorrect passcode. Access denied.");
      }
    } catch {
      setLoading(false);
      setError("An unexpected error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5E6] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#CBAE9B]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#6E2023]/10 blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6E2023] text-[#FFF5E6] shadow-lg ring-4 ring-[#CBAE9B]/40">
            <Lock className="w-8 h-8 text-[#FFF5E6]" />
          </div>

          <div className="space-y-1">
            <h1 className="font-heading text-3xl sm:text-4xl text-[#6E2023] font-medium tracking-wide">
              VITRAG Console
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-[#84766A] font-semibold">
              Store Owner & Merchant Portal
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="mt-8 bg-white py-8 px-6 sm:px-10 shadow-xl border border-[#EADBC8] rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="passcode"
                className="block text-xs font-semibold uppercase tracking-wider text-[#252522]"
              >
                Admin Passcode
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#84766A]">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="passcode"
                  type={showPassword ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter passcode"
                  className="block w-full pl-10 pr-10 py-3 bg-[#FFF5E6]/40 border border-[#D9D0C1] rounded-lg text-[#252522] placeholder-[#84766A]/60 focus:outline-none focus:ring-2 focus:ring-[#6E2023] focus:border-transparent text-[16px] sm:text-sm transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#84766A] hover:text-[#252522]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center text-xs text-[#84766A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 text-[#6E2023] border-[#D9D0C1] rounded focus:ring-[#6E2023]"
                />
                <span className="ml-2">Keep me signed in</span>
              </label>

              <span className="text-[11px] text-[#84766A]">
                Protected Console
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#6E2023] hover:bg-[#55181A] text-[#FFF5E6] font-medium rounded-lg shadow-md transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6E2023]"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>Access Merchant Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Notice */}
          <div className="mt-6 pt-6 border-t border-[#EADBC8] text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#84766A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Sowcarpet Showroom • Authorized Staff Only</span>
            </div>
            <div className="pt-2">
              <Link
                href="/"
                className="text-xs text-[#84766A] hover:text-[#6E2023] transition-colors inline-flex items-center gap-1"
              >
                ← Return to Public Storefront
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
