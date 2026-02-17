import { STUD_STEP_MM, GKL_THICKNESS_MM, BEAM_W_MM, BEAM_H_MM } from "../constants";
import { C_TEXT_DIM, C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL, C_DOOR_OPENING, C_DOBOR_GKL } from "../colors";

export function Legend() {
  const items = [
    { fill: C_FRAME_FILL, stroke: C_FRAME, label: `Профиль ПС/ПН` },
    { fill: C_BEAM_FILL, stroke: C_BEAM, label: `Брус ${BEAM_W_MM}×${BEAM_H_MM} (усиление)` },
    { fill: C_GKL_PANEL_FILL, stroke: C_GKL_PANEL, label: `ГКЛ ${GKL_THICKNESS_MM} мм` },
    { fill: "transparent", stroke: C_DOBOR_GKL, dashed: true, label: "Доборка ГКЛ" },
    { fill: C_DOOR_OPENING + "11", stroke: C_DOOR_OPENING, dashed: true, label: "Дверной проём" },
  ];

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", fontSize: 12, color: C_TEXT_DIM }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 20, height: 12,
            background: item.fill,
            border: `2px ${item.dashed ? "dashed" : "solid"} ${item.stroke}`,
            borderRadius: 2
          }}/>
          {item.label}
        </span>
      ))}
      <span style={{ color: C_TEXT_DIM }}>| Шаг стоек: {STUD_STEP_MM} мм | Все размеры в мм</span>
    </div>
  );
}
