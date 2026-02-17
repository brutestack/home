import { useState } from "react";
import { FrontView } from "./front-view";
import { BackView } from "./back-view";
import { TopView } from "./top-view";
import { Legend } from "./legend";
import { SectionView } from "./section-view";
import { Specification } from "./specification";
import { MousePos } from "../svg-primitives";
import {
  COL_W_MM, COL_H_MM, PARTITION_T_MM, STUD_STEP_MM
} from "../constants";
import { C_BG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT } from "../colors";

export default function BathroomPartitionFrame() {
  const [mouseFront, setMouseFront] = useState<MousePos | null>(null);
  const [mouseBack, setMouseBack] = useState<MousePos | null>(null);

  return (
    <div style={{ background: C_BG, minHeight: "100vh", padding: 20, fontFamily: "sans-serif", color: C_TEXT }}>
      <h2 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "0 0 4px" }}>
        Лист 5 — Каркас перегородки ванной
      </h2>
      <p style={{ textAlign: "center", color: C_TEXT_DIM, margin: "0 0 16px", fontSize: 14 }}>
        Колонны {COL_W_MM}×{COL_H_MM} мм | Двойная перегородка {PARTITION_T_MM} мм | ГКЛ закрывают колонны | Шаг стоек {STUD_STEP_MM} мм
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <FrontView onMouseMove={setMouseFront} mouse={mouseFront} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <BackView onMouseMove={setMouseBack} mouse={mouseBack} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <TopView />
      </div>

      {/* Легенда */}
      <div style={{ marginBottom: 20 }}>
        <Legend />
      </div>

      {/* Разрез и спецификация */}
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
