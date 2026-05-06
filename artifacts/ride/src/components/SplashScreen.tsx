import { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 400);
    const t2 = setTimeout(() => setPhase("out"), 1800);
    const t3 = setTimeout(onDone, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{
        transition: "opacity 420ms cubic-bezier(0.4,0,0.2,1)",
        opacity: phase === "out" ? 0 : 1,
        pointerEvents: phase === "out" ? "none" : "auto",
      }}
    >
      <div
        style={{
          transition: "opacity 380ms ease, transform 380ms cubic-bezier(0.22,1,0.36,1)",
          opacity: phase === "in" ? 0 : 1,
          transform: phase === "in" ? "translateY(10px)" : "translateY(0)",
        }}
        className="flex flex-col items-center gap-8"
      >
        <h1
          className="font-bold tracking-[-0.07em] text-[#10213f] select-none"
          style={{ fontSize: "clamp(52px, 15vw, 88px)", lineHeight: 1 }}
        >
          Phato.
        </h1>

        <div className="flex items-center gap-2.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block rounded-full bg-[#2563eb]"
              style={{
                width: 8,
                height: 8,
                animation: `phato-dot 1.2s ease-in-out ${i * 0.18}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes phato-dot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.25; }
          40%            { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
