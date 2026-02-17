import { useState } from "react";
import { FrontView } from "./front-view";
import { BackView } from "./back-view";
import { Legend } from "./legend";
import { SectionView } from "./section-view";
import { HorizFrontView } from "./horiz-front-view";
import { HorizSectionView } from "./horiz-section-view";
import { Specification } from "./specification";
import { PARTITION_T_MM, HORIZ_W_MM, HORIZ_T_MM, PANEL_T_MM } from "../constants";
import { C_BG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT } from "../colors";

export default function PartitionFrame() {
  const [mouse, setMouse] = useState<{x: number, y: number, view: string} | null>(null);

  return (
    <div style={{ background: C_BG, minHeight: "100vh", padding: 20, fontFamily: "sans-serif", color: C_TEXT }}>
      <h2 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "0 0 4px" }}>
        Лист 3 — Каркас перегородки спальни (ЛДСП)
      </h2>
      <p style={{ textAlign: "center", color: C_TEXT_DIM, margin: "0 0 16px", fontSize: 14 }}>
        Двойная вертикальная перегородка {PARTITION_T_MM} мм + горизонтальная часть {HORIZ_W_MM}×{HORIZ_T_MM} мм |
        Обшивка ЛДСП {PANEL_T_MM} мм
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

      {/* Легенда */}
      <div style={{ marginBottom: 20 }}>
        <Legend />
      </div>

      {/* Разрезы перегородок */}
      <h3 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "20px 0 12px", fontSize: 16 }}>
        Разрезы перегородок
      </h3>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
        <SectionView />
        <HorizSectionView />
      </div>

      {/* Горизонтальная часть и спецификация */}
      <h3 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "20px 0 12px", fontSize: 16 }}>
        Горизонтальная одинарная перегородка (отгораживает шкаф)
      </h3>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
        <HorizFrontView />
        <Specification />
      </div>
    </div>
  );
}
