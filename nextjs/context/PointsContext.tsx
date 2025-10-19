// context/PointsContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

type PointsCtx = {
  points: number;
  setPoints: (n: number) => void;
  refreshPoints: () => Promise<void>;
  userId: number;
};

const Ctx = createContext<PointsCtx | null>(null);

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState(0);
  const userId = 1; // TODO: plug your auth/localStorage id

  const refreshPoints = async () => {
    try {
      // use /api/profile/{user_id} as the source of truth
      const data = await api.get<{ points: number }>(`/api/profile/${userId}`);
      setPoints(data.points);
    } catch {
      // fallback to legacy /api/points?user_id=1 if you temporarily need it
      try {
        const data = await api.get<{ points: number }>(`/api/points?user_id=${userId}`);
        setPoints(data.points);
      } catch (e) {
        console.error("Failed to load points", e);
      }
    }
  };

  useEffect(() => { refreshPoints(); }, []);

  return (
    <Ctx.Provider value={{ points, setPoints, refreshPoints, userId }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePoints() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePoints must be used inside PointsProvider");
  return ctx;
}
