"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className="relative w-screen h-screen overflow-hidden text-white flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/Cover.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* --- LOGIN BUTTON --- */}
      <div
        style={{
          position: "fixed",
          top: "24px",
          right: "32px",
          zIndex: 999999,
          pointerEvents: "auto",
        }}
      >
        <button
          onClick={() => router.push("/login")}
          className="group bg-transparent border-none p-0 hover:scale-110 transition-all duration-200"
        >
          <div className="relative w-[270px] h-[90px] flex items-center justify-center">
            <Image
              src="/login.png"
              alt="Login Button"
              fill
              className="object-contain select-none transition-all duration-200 group-hover:brightness-125 group-hover:drop-shadow-[0_0_10px_#facc15]"
              priority
            />
          </div>
        </button>
      </div>

      {/* --- IMAGE GRID (evenly separated) --- */}
      <div className="relative z-10 grid grid-cols-4 gap-x-48 gap-y-30 mt-[25vh]">
        {[
          { id: 1, img: "view1.png" },
          { id: 2, img: "view2.png" },
          { id: 3, img: "view3.png" },
          { id: 4, img: "view4.png" },
        ].map((item, i) => (
          <div
            key={item.id}
            className="transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_#f9c23c] animate-float"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <img
              src={`/home/${item.img}`}
              alt={`View ${item.id}`}
              className="w-[380px] h-[230px] object-cover rounded-[20px] shadow-lg border-[3px] border-[#3d2a12]"
            />
          </div>
        ))}
      </div>

      {/* --- ANIMATIONS --- */}
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
      `}</style>
    </div>
  );
}
