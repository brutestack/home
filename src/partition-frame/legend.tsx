import { BEAM_W_MM, BEAM_H_MM } from "../constants";
import { C_TEXT_DIM, C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_PANEL, C_PANEL_FILL, C_DOBOR, C_DOOR_OPENING } from "../colors";

export function Legend() {
  const items = [
    { fill: C_FRAME_FILL, stroke: C_FRAME, label: "Профиль каркаса" },
    { fill: C_BEAM_FILL, stroke: C_BEAM, label: `Брус ${BEAM_W_MM}×${BEAM_H_MM}` },
    { fill: C_PANEL_FILL, stroke: C_PANEL, label: "ЛДСП панель" },
    { fill: "transparent", stroke: C_DOBOR, dashed: true, label: "Доборная планка" },
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
      <span style={{ color: C_TEXT_DIM }}>| Все размеры в мм</span>
    </div>
  );
}
