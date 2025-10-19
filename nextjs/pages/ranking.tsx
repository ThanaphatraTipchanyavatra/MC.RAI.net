"use client";
import { useEffect, useState } from "react";

export default function Ranking() {
  const [points, setPoints] = useState<number>(1000);
  const [loading, setLoading] = useState(true);

  // 🧩 Adjustable gap
  const barGap = "1.5rem";

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/points?user_id=1");
      const data = await res.json();
      setPoints(data.points || 1000);
    } catch (err) {
      console.error("Failed to fetch points:", err);
    } finally {
      setLoading(false);
    }
  };

  const players = [
    { name: "Player", points: points },
    { name: "Alex", points: 0 },
    { name: "Steve", points: 0 },
  ];

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden"
      style={{
        backgroundImage: "url('/Cover.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white", // ⬅️ fallback text color
      }}
    >
      {/* 🔧 Overlay fixed (black, not white) */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Title */}
      <h1 className="relative z-10 text-8xl font-extrabold mb-10 text-center text-white drop-shadow-[0_0_50px_#ffffff]">
        🏆 PLAYER RANKING
      </h1>

      {/* Leaderboard bars */}
      <div
        className="relative z-10 flex flex-col items-center w-full max-w-[1200px]"
        style={{ gap: barGap }}
      >
        {players.map((p, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-[90%] bg-[#5a3c20cc] border-[8px] border-[#3b2412] rounded-3xl px-24 py-20 text-7xl font-extrabold text-white shadow-[0_0_80px_#000]"
            style={{ color: "white" }} // ⬅️ absolute text color override
          >
            <span style={{ color: "white" }}>NAME : {p.name}</span>
            {loading ? (
              <span style={{ color: "white" }}>Loading...</span>
            ) : (
              <span style={{ color: "white" }}>TOPUP : {p.points} POINTS</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
