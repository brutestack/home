import {
  C_TEXT, C_TEXT_DIM,
  C_FRAME, C_FRAME_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL, C_COLUMN, C_COL_FILL
} from "../colors";

export function Legend() {
  const items = [
    { color: C_GKL_PANEL, fill: C_GKL_PANEL_FILL, label: "ГКЛ 12.5 мм" },
    { color: C_FRAME, fill: C_FRAME_FILL, label: "Профиль ПН 100×40 / ПС 100×50" },
    { color: C_COLUMN, fill: C_COL_FILL, label: "Колонна 200×150" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width={24} height={16}>
            <rect x={2} y={2} width={20} height={12} fill={item.fill} stroke={item.color} strokeWidth={2}/>
          </svg>
          <span style={{ color: C_TEXT, fontSize: 12 }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
