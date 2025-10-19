// pages/topup.tsx
import { useEffect, useState } from "react";
import { usePoints } from "../context/PointsContext";
import { api } from "../lib/api";

type Popup = { message: string; type: "success" | "error" } | null;
type Pack = { id: number; title: string; points: number; price: number };

export default function TopUp() {
  const { points, setPoints, refreshPoints, userId } = usePoints();
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<Popup>(null);
  const [packs, setPacks] = useState<Pack[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await api.get<Pack[]>("/api/packages");
        setPacks(list);
      } catch (e) {
        console.error(e);
      }
      refreshPoints();
    })();
  }, [refreshPoints]);

  const showPopup = (message: string, type: "success" | "error") => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 3000);
  };

  const buy = async (pkg: Pack) => {
    setLoading(true);
    try {
      const res = await api.post<{ message: string; total_points: number }>(
        "/api/packages/buy",
        { user_id: userId, package_id: pkg.id }
      );
      setPoints(res.total_points);
      showPopup(`✅ +${pkg.points} Points Added!`, "success");
    } catch (e: any) {
      showPopup(`❌ Top-Up Failed: ${e?.message || "Error"}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // Fallback UI if you want fixed images like before
  const fallback = [
    { id: -1, title: "100", points: 100, price: 0, img: "100point.png" },
    { id: -2, title: "300", points: 300, price: 0, img: "300point.png" },
    { id: -3, title: "500", points: 500, price: 0, img: "500point.png" },
  ];

  const showList = packs.length ? packs.map(p => ({
    id: p.id, title: String(p.points), points: p.points, price: p.price, img: `${p.points}point.png`
  })) : fallback;

  return (
    <div
      className="relative flex flex-col items-center justify-end min-h-screen text-white overflow-hidden"
      style={{
        backgroundImage: "url('/Cover.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {popup && (
        <div className="absolute top-10 left-0 right-0 flex justify-center z-50">
          <div
            className={`px-16 py-8 text-4xl font-extrabold rounded-2xl shadow-[0_0_60px_#000] border-4 animate-popup ${
              popup.type === "success"
                ? "bg-green-600 border-green-400 text-white"
                : "bg-red-600 border-red-400 text-white"
            }`}
          >
            {popup.message}
          </div>
        </div>
      )}

      <div className="relative z-10 mb-[10vh] w-full max-w-[1200px] px-20 flex justify-between items-center">
        {showList.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              if (item.id < 0) {
                // fallback: just add locally (or call a legacy /api/topup)
                setPoints(points + item.points);
                showPopup(`✅ +${item.points} Points Added!`, "success");
              } else {
                buy(item as any);
              }
            }}
            disabled={loading}
            className="transition-transform duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_25px_#00ff8c] animate-float"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <img
              src={`/topup/${item.img}`}
              alt={`Top up ${item.title}`}
              className="w-[330px] h-[480px] object-cover rounded-xl shadow-lg border-4 border-[#3d2a12]"
            />
          </button>
        ))}
      </div>

      <div className="absolute bottom-24 z-30 flex items-center justify-center px-20 py-8 rounded-2xl">
        <span className="text-[3rem] font-extrabold text-white drop-shadow-[0_0_40px_#ffffff] animate-pulse-glow">
          🪙 {points} POINTS
        </span>
      </div>

      <style jsx global>{`
        @keyframes float { 0% { transform: translateY(0);} 50% { transform: translateY(-8px);} 100% { transform: translateY(0);} }
        .animate-float { animation: float 3.5s ease-in-out infinite; }
        @keyframes pulseGlow {
          0% { text-shadow: 0 0 20px #fff, 0 0 40px #fff, 0 0 60px #fff; }
          50% { text-shadow: 0 0 30px #fff, 0 0 60px #fff, 0 0 100px #fff; }
          100% { text-shadow: 0 0 20px #fff, 0 0 40px #fff, 0 0 60px #fff; }
        }
        .animate-pulse-glow { animation: pulseGlow 2.5s ease-in-out infinite; }
        @keyframes popup {
          0% { opacity: 0; transform: translateY(-20px) scale(0.9); }
          20% { opacity: 1; transform: translateY(0) scale(1.05); }
          60% { transform: scale(1); opacity: 1; }
          100% { opacity: 0; transform: translateY(-10px) scale(0.95); }
        }
        .animate-popup { animation: popup 3s ease-in-out; }
      `}</style>
    </div>
  );
}
