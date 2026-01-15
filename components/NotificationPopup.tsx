"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";

export default function NotificationPopup() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("success");

  useEffect(() => {
    const status = searchParams.get("status");
    const msg = searchParams.get("message");

    if (status && msg) {
      setType(status === "error" ? "error" : "success");
      setMessage(decodeURIComponent(msg));
      setShow(true);

      // Remove query params from URL
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", pathname);
      }

      // Hide after 3 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, pathname]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg animate-slide-in ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      {message}
    </div>
  );
}
