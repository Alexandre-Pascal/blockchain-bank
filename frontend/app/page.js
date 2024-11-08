'use client';

import Bank from "../components/shared/Bank";
import NotConnect from "@/components/shared/NotConnect";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl p-6 bg-gray-100 rounded-lg shadow-md mb-16">
      {isConnected ? (
        <Bank />
      ) : (
        <NotConnect />
      )}
    </div>
  );
}

