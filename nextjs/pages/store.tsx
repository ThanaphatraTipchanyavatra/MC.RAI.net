import { useEffect, useState } from "react";

type Popup = { message: string; type: "success" | "error" } | null;

export default function Store() {
  const [points, setPoints] = useState<number>(1000); // 🪙 start with 1000 points
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<Popup>(null);

  const showPopup = (message: string, type: "success" | "error") => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 2500);
  };

  const handlePurchase = (itemId: number, price: number, name: string) => {
    if (points < price) {
      showPopup("❌ Not enough points!", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setPoints((prev) => prev - price);
      showPopup(`✅ You bought ${name}! (-${price} pts)`, "success");
      setLoading(false);
    }, 500);
  };

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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Popup */}
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

      {/* Store items */}
      <div className="relative z-10 mb-[10vh] w-full max-w-[1500px] px-20 flex justify-between items-center">
        {[
          { id: 1, name: "VIP Rank", price: 200, img: "vip.png" },
          { id: 2, name: "Pet Dog", price: 100, img: "petdog.png" },
          { id: 3, name: "Pet Cat", price: 50, img: "petcat.png" },
          { id: 4, name: "Diamond Rank", price: 400, img: "diamond.png" },
        ].map((item, i) => (
          <button
            key={item.id}
            onClick={() => handlePurchase(item.id, item.price, item.name)}
            disabled={loading}
            className="transition-transform duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_25px_#f9c23c] animate-float"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <img
              src={`/items/${item.img}`}
              alt={item.name}
              className="w-[330px] h-[480px] object-cover rounded-xl shadow-lg border-4 border-[#3d2a12]"
            />
          </button>
        ))}
      </div>

      {/* Points display */}
      <div className="absolute bottom-24 z-30 flex items-center justify-center px-20 py-8 rounded-2xl">
        <span className="text-[3rem] font-extrabold text-white drop-shadow-[0_0_40px_#ffffff] animate-pulse-glow">
          🪙 {points} POINTS
        </span>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3.5s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0% {
            text-shadow: 0 0 20px #ffffff, 0 0 40px #ffffff, 0 0 60px #ffffff;
          }
          50% {
            text-shadow: 0 0 30px #ffffff, 0 0 60px #ffffff, 0 0 100px #ffffff;
          }
          100% {
            text-shadow: 0 0 20px #ffffff, 0 0 40px #ffffff, 0 0 60px #ffffff;
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }

        @keyframes popup {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
          }
          20% {
            opacity: 1;
            transform: translateY(0px) scale(1.05);
          }
          60% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
        }
        .animate-popup {
          animation: popup 3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
