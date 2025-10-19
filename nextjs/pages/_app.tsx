// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Navbar from "../components/Navbar";            // ✅ keep your navbar
import { PointsProvider } from "../context/PointsContext"; // ✅ global points context

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PointsProvider>
      <div className="relative w-screen h-screen overflow-hidden">
        {/* ✅ Navbar appears on every page */}
        <Navbar />

        {/* ✅ All pages (Store, TopUp, Profile, etc.) share same points */}
        <Component {...pageProps} />
      </div>
    </PointsProvider>
  );
}
