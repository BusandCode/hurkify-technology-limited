"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

export function FooterGlow() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="footer-led-effect" data-paused={paused}>
      <span className="footer-led-border footer-led-halo" aria-hidden="true" />
      <span className="footer-led-border" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setPaused(!paused)}
        aria-label={
          paused
            ? "Resume footer border animation"
            : "Pause footer border animation"
        }
        className="footer-led-control inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-mist-50/95 px-2.5 py-1.5 text-[10px] font-medium text-primary hover:bg-primary/5"
      >
        {paused ? <Play size={10} /> : <Pause size={10} />}
        {paused ? "Resume glow" : "Pause glow"}
      </button>
    </div>
  );
}
