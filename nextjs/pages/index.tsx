// ======================================================
// ✅ pages/index.tsx
// ======================================================
// 🟢 NEW CODE for connection test
// Purpose: verify that frontend can talk to backend via /api/health
// ======================================================

import { useEffect, useState } from "react";
import { apiGet } from "../utils/api"; // 🟢 NEW IMPORT

export default function Home() {
  // 🟢 NEW: track server status
  const [status, setStatus] = useState("checking...");

  // 🟢 NEW: call FastAPI /api/health once when page loads
  useEffect(() => {
    apiGet("/api/health")
      .then((j) => setStatus(j.status))
      .catch((e) => setStatus("error: " + e.message));
  }, []);

  // 🟢 NEW: simple visible output
  return (
    <div
      style={{
        padding: "40px",
        color: "white",
        fontFamily: "monospace",
        fontSize: "1.5rem",
        backgroundColor: "#111",
        minHeight: "100vh",
      }}
    >
      <h1>Backend Health Status:</h1>
      <p>{status}</p>
    </div>
  );
}
