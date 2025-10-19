"use client";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen text-white"
      style={{
        backgroundImage: "url('/Cover.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* REGISTER BOX */}
      <div className="relative z-10 flex flex-col items-center justify-center w-[700px] py-12 px-10 rounded-2xl bg-black/40 backdrop-blur-sm shadow-[0_0_50px_rgba(250,204,21,0.25)] translate-y-[8vh]">
        {/* Title */}
        <h1 className="text-[3rem] font-extrabold text-[#fff] drop-shadow-[0_0_25px_#facc15] mb-10 tracking-wide">
          REGISTER
        </h1>

        {/* Inputs */}
        <div className="flex flex-col items-center space-y-6 mb-10 w-full">
          {/* Username */}
          <input
            type="text"
            placeholder="Username..."
            className="block w-[600px] h-[50px] px-5 text-lg rounded-xl
            text-white placeholder-gray-300 bg-white/10 backdrop-blur-md
            border-2 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]
            focus:outline-none focus:border-yellow-300 focus:shadow-[0_0_25px_#facc15]
            transition-all duration-300 ease-in-out"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password..."
            className="block w-[600px] h-[50px] px-5 text-lg rounded-xl
            text-white placeholder-gray-300 bg-white/10 backdrop-blur-md
            border-2 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]
            focus:outline-none focus:border-yellow-300 focus:shadow-[0_0_25px_#facc15]
            transition-all duration-300 ease-in-out"
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password..."
            className="block w-[600px] h-[50px] px-5 text-lg rounded-xl
            text-white placeholder-gray-300 bg-white/10 backdrop-blur-md
            border-2 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]
            focus:outline-none focus:border-yellow-300 focus:shadow-[0_0_25px_#facc15]
            transition-all duration-300 ease-in-out"
          />
        </div>

        {/* REGISTER BUTTON */}
        <div className="flex flex-col items-center space-y-6">
          <Link
            href="/profile"
            className="relative w-[260px] h-[85px] hover:scale-110 transition-all duration-200 cursor-pointer"
          >
            <Image
              src="/register.png"
              alt="Register Button"
              fill
              className="object-contain select-none transition-all duration-200 hover:brightness-125 hover:drop-shadow-[0_0_25px_#facc15]"
            />
          </Link>
        </div>
      </div>

      {/* Optional glow animation */}
      <style jsx global>{`
        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 20px rgba(250, 204, 21, 0.25),
              0 0 40px rgba(250, 204, 21, 0.2);
          }
          50% {
            box-shadow: 0 0 45px rgba(250, 204, 21, 0.4),
              0 0 90px rgba(250, 204, 21, 0.3);
          }
          100% {
            box-shadow: 0 0 20px rgba(250, 204, 21, 0.25),
              0 0 40px rgba(250, 204, 21, 0.2);
          }
        }
      `}</style>
    </div>
  );
}
