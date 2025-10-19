"use client";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="absolute top-8 right-10 flex items-center justify-center space-x-10 z-20">
      {[
        { path: "/home", src: "/home.png", alt: "Home button" },
        { path: "/store", src: "/store.png", alt: "Store button" },
        { path: "/topup", src: "/topup.png", alt: "Top-Up button" },
        { path: "/ranking", src: "/rank.png", alt: "Ranking button" },
      ].map((btn, i) => (
        <button
          key={i}
          onClick={() => router.push(btn.path)}
          className="group bg-transparent border-none p-0 hover:scale-110 transition-all duration-200 flex items-center justify-center"
        >
          <div className="flex items-center justify-center w-[180px] h-[60px] relative overflow-visible">
            <Image
              src={btn.src}
              alt={btn.alt}
              width={170}
              height={37}
              className={`object-contain pointer-events-auto select-none bg-transparent transition-all duration-200 ${
                isActive(btn.path)
                  ? "brightness-150 saturate-150 drop-shadow-[0_0_10px_#facc15]"
                  : "group-hover:brightness-150 group-hover:saturate-150 group-hover:drop-shadow-[0_0_10px_#facc15]"
              }`}
              priority
            />
          </div>
        </button>
      ))}
    </div>
  );
}
