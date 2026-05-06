import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  House, Clock3, Bookmark, Bell, CarTaxiFront,
  Settings2, X, Gauge, ChevronRight,
} from "lucide-react";

const SIDEBAR_W = 300;

interface Props {
  open: boolean;
  onClose: () => void;
  isDriver?: boolean;
  onBecomeDriver?: () => void;
}

function NavRow({
  Icon,
  label,
  onClick,
  right,
  sub,
}: {
  Icon: React.ElementType;
  label: string;
  onClick: () => void;
  right?: React.ReactNode;
  sub?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-left transition-colors active:bg-slate-100"
    >
      <Icon size={18} strokeWidth={2.2} className="text-[#10213f] shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-[14.5px] font-medium text-[#10213f] leading-tight">{label}</div>
        {sub && <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{sub}</div>}
      </div>
      {right}
    </button>
  );
}

export default function MenuSheet({ open, onClose, isDriver, onBecomeDriver }: Props) {
  const [, setLocation] = useLocation();

  function handleNav(href: string | null) {
    if (href) setLocation(href);
    onClose();
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[800]"
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: "rgba(8,14,28,0.30)",
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
      />

      <motion.div
        className="fixed top-0 right-0 bottom-0 z-[900] flex flex-col"
        animate={{ x: open ? 0 : SIDEBAR_W }}
        initial={{ x: SIDEBAR_W }}
        transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.75 }}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: SIDEBAR_W }}
        dragElastic={{ left: 0, right: 0.12 }}
        onDragEnd={(_, info) => {
          if (info.velocity.x > 280 || info.offset.x > SIDEBAR_W * 0.4) {
            onClose();
          }
        }}
        style={{
          width: SIDEBAR_W,
          background: "rgba(255,255,255,0.98)",
          boxShadow: "-12px 0 56px rgba(8,14,28,0.10), -1px 0 0 rgba(0,0,0,0.04)",
          borderTopLeftRadius: 24,
          borderBottomLeftRadius: 24,
          willChange: "transform",
          touchAction: "pan-y",
        }}
      >
        <div className="flex items-center justify-between px-5 pt-[max(env(safe-area-inset-top,0px)+20px,28px)] pb-5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: "#10213f" }}
              >
                <span className="text-white text-[16px] font-bold select-none">A</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-[2.5px] border-white" />
            </div>
            <div>
              <div className="text-[15px] font-semibold text-[#10213f] leading-snug">Anis</div>
              <div className="text-[11px] text-slate-400">Passenger</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100"
          >
            <X size={15} strokeWidth={2.2} className="text-slate-500" />
          </button>
        </div>

        <div className="mx-4 h-px bg-slate-100" />

        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          <NavRow Icon={House} label="Home" onClick={() => handleNav("/passenger")} />
          <NavRow Icon={Clock3} label="Trips" onClick={() => handleNav(null)} />
          <NavRow Icon={Bookmark} label="Saved Places" onClick={() => handleNav(null)} />
          <NavRow Icon={Bell} label="Notifications" onClick={() => handleNav(null)} />

          <div className="mx-4 my-3 h-px bg-slate-100" />

          {isDriver ? (
            <NavRow
              Icon={Gauge}
              label="Driver Dashboard"
              sub="Currently online"
              onClick={() => { setLocation("/driver"); onClose(); }}
              right={<ChevronRight size={14} strokeWidth={2.2} className="text-slate-300" />}
            />
          ) : (
            <button
              onClick={() => { onBecomeDriver?.(); onClose(); }}
              className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left border border-dashed border-slate-200 transition-colors active:bg-slate-50"
            >
              <CarTaxiFront size={18} strokeWidth={2.2} className="text-[#10213f] shrink-0" />
              <div className="flex-1">
                <div className="text-[14.5px] font-semibold text-[#10213f] leading-snug">Become a Driver</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Register your vehicle to earn</div>
              </div>
              <ChevronRight size={14} strokeWidth={2.2} className="text-slate-300" />
            </button>
          )}
        </div>

        <div className="px-2 pb-[max(env(safe-area-inset-bottom,0px)+16px,24px)]">
          <div className="mx-4 mb-2 h-px bg-slate-100" />
          <NavRow
            Icon={Settings2}
            label="Settings"
            onClick={() => handleNav(null)}
            right={<ChevronRight size={14} strokeWidth={2.2} className="text-slate-300" />}
          />
        </div>
      </motion.div>
    </>
  );
}
