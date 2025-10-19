export const api = {
  async get(path: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${path}`);
    return res.json();
  },
  async post(path: string, body: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.json();
  },
};
