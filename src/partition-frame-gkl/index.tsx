import { useState } from "react";
import { FrontView } from "./front-view";
import { BackView } from "./back-view";
import { Legend } from "./legend";
import { SectionView } from "./section-view";
import { Specification } from "./specification";
import {
  PARTITION_T_MM, GKL_SHEET_W_MM, GKL_SHEET_H_MM, GKL_THICKNESS_MM, STUD_STEP_MM
} from "../constants";
import { C_BG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT } from "../colors";

export default function PartitionFrameGkl() {
  const [mouse, setMouse] = useState<{x: number, y: number, view: string} | null>(null);

  return (
    <div style={{ background: C_BG, minHeight: "100vh", padding: 20, fontFamily: "sans-serif", color: C_TEXT }}>
      <h2 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "0 0 4px" }}>
        Лист 4 — Каркас перегородки спальни (ГКЛ)
      </h2>
      <p style={{ textAlign: "center", color: C_TEXT_DIM, margin: "0 0 16px", fontSize: 14 }}>
        Двойная перегородка {PARTITION_T_MM} мм | ГКЛ {GKL_SHEET_W_MM}×{GKL_SHEET_H_MM}×{GKL_THICKNESS_MM} мм | Шаг стоек {STUD_STEP_MM} мм
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <FrontView
          onMouseMove={(pos) => setMouse(pos ? { ...pos, view: 'front' } : null)}
          mouse={mouse}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <BackView />
      </div>

      <div style={{ marginBottom: 20 }}>
        <Legend />
      </div>

      <h3 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "20px 0 12px", fontSize: 16 }}>
        Разрез и спецификация
      </h3>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
        <SectionView />
        <Specification />
      </div>
    </div>
  );
}
