"use client";

import "./globals.css";
import { Navbar, Footer } from "./components";
import { useEffect, useState } from "react";
import StoreProvider from "./components/StoreProvider"
import UserProvider from "./components/UserProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDashboard, setIsDashboard] = useState(false);
  const [isLiveStreamingScreen, setIsLiveStreamingScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDashboard(window.location.href.includes("/dashboard"));
      setIsLiveStreamingScreen(
        window.location.href.includes("/live-streaming")
      );
    }
  }, []);

  return (
    <html lang="en">
      <body className="bg-background text-xl font-rubik font-semibold tracking-tight flex flex-col overflow-x-hidden">
      <StoreProvider>
        <UserProvider>
        {!isDashboard && !isLiveStreamingScreen && <Navbar />}
        
        {children}
       
        {!isDashboard && !isLiveStreamingScreen && <Footer />}
        </UserProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
