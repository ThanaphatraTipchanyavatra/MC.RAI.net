"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePoints } from "../context/PointsContext";

export default function Profile() {
  const { points, refreshPoints } = usePoints();
  const [user, setUser] = useState({
    name: "Player",
    id: "",
    rank: "Coal",
    kills: 0,
  });

  useEffect(() => {
    const storedName = localStorage.getItem("username") || "Player";
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = Math.floor(10000 + Math.random() * 90000).toString();
      localStorage.setItem("userId", storedId);
    }
    setUser((u) => ({ ...u, name: storedName, id: storedId }));
    refreshPoints();
  }, [refreshPoints]);

  return (
    <div
      className="relative flex min-h-screen items-center justify-center text-white font-minecraft"
      style={{
        backgroundImage: "url('/Cover.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Profile Box */}
      <div
        className="relative z-10 flex items-center justify-between w-[900px] max-w-[90vw]
        bg-[#d4903a] rounded-[20px] border-[1.5px] border-[#eeb85f]
        shadow-[0_0_30px_rgba(0,0,0,0.4)] px-10 py-8 translate-y-[8vh]"
      >
        {/* LEFT: Player Info */}
        <div className="text-[30px] leading-[2.2rem] font-bold text-[#fff] space-y-4">
          <p>
            NAME:&nbsp;
            <span className="font-normal text-[#fff]/90">{user.name}</span>
          </p>
          <p>
            ID:&nbsp;
            <span className="font-normal text-[#fff]/90">#{user.id}</span>
          </p>
          <p>
            RANK:&nbsp;
            <span className="font-normal text-[#fff]/90">{user.rank}</span>
          </p>
          <p>
            CRYSTALS:&nbsp;
            <span className="font-normal text-[#fff]/90">{points}</span>
          </p>
          <p>
            KILLS:&nbsp;
            <span className="font-normal text-[#fff]/90">{user.kills}</span>
          </p>
        </div>

        {/* RIGHT: Avatar + Logout */}
        <div className="flex flex-col items-center justify-center gap-3 -translate-x-4">
          <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden border-[2.5px] border-[#fff] shadow-[0_0_18px_rgba(255,255,255,0.35)]">
            <Image src="/bang.jpg" alt="User Profile" fill className="object-cover" />
          </div>

          {/* Logout → just link to home */}
          <Link
            href="/"
            className="relative w-[180px] h-[60px] hover:scale-110 transition-all duration-200 cursor-pointer mt-2"
          >
            <Image
              src="/logout.png"
              alt="Logout Button"
              fill
              className="object-contain select-none transition-all duration-200 hover:brightness-125 hover:drop-shadow-[0_0_20px_#facc15]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
