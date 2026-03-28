import { useState } from "react";
import { FrontView } from "./front-view";
import { FrontViewLayer2 } from "./front-view-layer2";
import { BackView } from "./back-view";
import { TopView } from "./top-view";
import { Legend } from "./legend";
import { SectionView } from "./section-view";
import { Specification } from "./specification";
import { Estimate } from "./estimate";
import { MousePos } from "../svg-primitives";
import {
  BATH_VERT_T_MM, BATH_VERT_LEN_MM, BATH_VERT_STUD_STEP_MM,
  GKL_THICKNESS_MM
} from "../constants";
import { C_BG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT } from "../colors";

export default function BathVertPartition() {
  const [mouseFront, setMouseFront] = useState<MousePos | null>(null);
  const [mouseLayer2, setMouseLayer2] = useState<MousePos | null>(null);
  const [mouseBack, setMouseBack] = useState<MousePos | null>(null);
  const [mouseSection, setMouseSection] = useState<MousePos | null>(null);

  return (
    <div style={{ background: C_BG, minHeight: "100vh", padding: 20, fontFamily: "sans-serif", color: C_TEXT }}>
      <h2 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "0 0 4px" }}>
        Лист 6 — Вертикальная перегородка ванной
      </h2>
      <p style={{ textAlign: "center", color: C_TEXT_DIM, margin: "0 0 16px", fontSize: 14 }}>
        Одинарная перегородка {BATH_VERT_T_MM} мм ({BATH_VERT_T_MM + GKL_THICKNESS_MM * 3} мм с ГКЛ — 2 слоя ванная + 1 слой спальня) | Длина {BATH_VERT_LEN_MM} мм | От верхней стены до нижней стены | Шаг стоек {BATH_VERT_STUD_STEP_MM} мм
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <FrontView onMouseMove={setMouseFront} mouse={mouseFront} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <FrontViewLayer2 onMouseMove={setMouseLayer2} mouse={mouseLayer2} />
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
        <SectionView onMouseMove={setMouseSection} mouse={mouseSection} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Specification />
          <Estimate />
        </div>
      </div>
    </div>
  );
}
