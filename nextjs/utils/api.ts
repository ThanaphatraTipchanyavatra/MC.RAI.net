// nextjs/utils/api.ts
// ------------------------------------------------------
// NEW FILE (safe to replace your current api.ts with this)
// Only small fixes were made compared to previous version.
// ------------------------------------------------------

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ✅ Fixed: added "await" inside apiGet and apiPost so fetch resolves properly
async function handle(res: Response) {
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${msg}`.trim());
  }
  return res.json();
}

// ✅ FIXED CODE BELOW
// --- only these two functions were changed ---

export const apiGet = async (path: string) => {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
  });
  return handle(res); // response now awaited properly ✅
};

export const apiPost = async (path: string, body: any) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return handle(res); // ✅ same fix here
};

// ------------------------------------------------------
// (Optional) More methods like PUT, DELETE can be added later
// ------------------------------------------------------
