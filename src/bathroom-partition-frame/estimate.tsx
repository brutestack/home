import { ProfileEstimate, ProfileType } from "../profile-estimate";
import {
  CEILING_H_MM, PN_H_MM, PS_W_MM,
  GKL_SHEET_W_MM, GKL_SHEET_H_MM, GKL_THICKNESS_MM, DOBOR_H_MM,
  BATH_TOTAL_LEN_MM, BATH_DOOR_END_MM, BATH_DOOR_START_MM,
  DOOR_W_MM, STUD_POSITIONS_BATH, STUD_POSITIONS_CORRIDOR
} from "../constants";
import { C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_DIM } from "../colors";

// Смета профилей
function ProfileSection() {
  const studH = CEILING_H_MM - PN_H_MM * 2;
  const pnFloorLen = BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM;

  const profiles: ProfileType[] = [
    {
      name: "ПН 50×40",
      cuts: [
        { length: BATH_TOTAL_LEN_MM, qty: 2 },   // потолок × 2 слоя
        { length: pnFloorLen, qty: 2 },            // пол после проёма × 2 слоя
        { length: PS_W_MM, qty: 2 },               // пол у края × 2 слоя
        { length: pnFloorLen, qty: 2 },            // стык ГКЛ × 2 слоя
        { length: DOOR_W_MM, qty: 2 },             // над дверью × 2 слоя
      ],
    },
    {
      name: "ПН 75×40",
      cuts: [
        { length: BATH_TOTAL_LEN_MM, qty: 2 }, // между слоями (пол + потолок)
      ],
    },
    {
      name: "ПС 50×50",
      cuts: [
        { length: studH, qty: STUD_POSITIONS_BATH.length + STUD_POSITIONS_CORRIDOR.length },
      ],
    },
  ];

  return <ProfileEstimate profiles={profiles} />;
}

// Раскрой ГКЛ
interface SheetCut {
  width: number;
  height: number;
  label: string;
}

interface SheetPlan {
  cuts: SheetCut[];
  waste: string[];
}

function computeGklPlan(): { sheets: SheetPlan[]; totalSheets: number } {
  const W = GKL_SHEET_W_MM;   // 1200
  const H = GKL_SHEET_H_MM;   // 2500
  const dH = DOBOR_H_MM;      // 300

  // 1-й слой (ванная + коридор)
  const doorStudCenter = BATH_DOOR_END_MM + PS_W_MM / 2; // 975
  const gklJoint = STUD_POSITIONS_BATH[3] + PS_W_MM / 2; // 1775
  const gklMainW = gklJoint - doorStudCenter;              // 800
  const gklRightW = BATH_TOTAL_LEN_MM - gklJoint;         // 665
  const gklOverDoorW = doorStudCenter;                     // 975
  const doborW = BATH_TOTAL_LEN_MM - doorStudCenter;       // 1465

  const sheets: SheetPlan[] = [];

  // === 1-й слой ===

  // Лист 1: осн. лист ванная (800×2500)
  sheets.push({
    cuts: [{ width: gklMainW, height: H, label: "1сл осн. ванная" }],
    waste: [`${W - gklMainW}×${H}`],
  });

  // Лист 2: осн. лист коридор (800×2500)
  sheets.push({
    cuts: [{ width: gklMainW, height: H, label: "1сл осн. коридор" }],
    waste: [`${W - gklMainW}×${H}`],
  });

  // Лист 3: правая часть ванная (665×2500)
  sheets.push({
    cuts: [{ width: gklRightW, height: H, label: "1сл правая ванная" }],
    waste: [`${W - gklRightW}×${H}`],
  });

  // Лист 4: правая часть коридор (665×2500)
  sheets.push({
    cuts: [{ width: gklRightW, height: H, label: "1сл правая коридор" }],
    waste: [`${W - gklRightW}×${H}`],
  });

  // Лист 5: Г-деталь ванная + коридор (975×800 × 2 из одного листа)
  sheets.push({
    cuts: [
      { width: gklOverDoorW, height: 800, label: "1сл Г-деталь ванная" },
      { width: gklOverDoorW, height: 800, label: "1сл Г-деталь коридор" },
    ],
    waste: [`${W - gklOverDoorW}×1600`, `${W}×${H - 1600}`],
  });

  // Лист 6: доборка сверху ванная + коридор (1465×300 × 2 из одного листа)
  sheets.push({
    cuts: [
      { width: doborW, height: dH, label: "1сл доб. сверху ванная" },
      { width: doborW, height: dH, label: "1сл доб. сверху коридор" },
    ],
    waste: [`${H - doborW}×${dH * 2}`, `${H}×${W - dH * 2}`],
  });

  // === 2-й слой (горизонтальный, со стороны ванной) ===
  const layer2W = BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM; // 1490
  const rowH = GKL_SHEET_W_MM;         // 1200
  const topH = CEILING_H_MM - rowH * 2; // 400

  // Лист 7: ряд 1 — 1490×1200
  sheets.push({
    cuts: [{ width: layer2W, height: rowH, label: "2сл ванная ряд 1" }],
    waste: [`${H - layer2W}×${rowH}`, `${H}×${W - rowH}`],
  });

  // Лист 8: ряд 2 — 1490×1200
  sheets.push({
    cuts: [{ width: layer2W, height: rowH, label: "2сл ванная ряд 2" }],
    waste: [`${H - layer2W}×${rowH}`, `${H}×${W - rowH}`],
  });

  // Лист 9: ряд 3 — 1490×400
  sheets.push({
    cuts: [{ width: layer2W, height: topH, label: "2сл ванная ряд 3" }],
    waste: [`${H - layer2W}×${topH}`, `${H}×${W - topH}`],
  });

  return { sheets, totalSheets: sheets.length };
}

function GklEstimate() {
  const { sheets, totalSheets } = computeGklPlan();

  const td = { padding: "6px 4px" } as const;
  const tdDim = { ...td, color: C_TEXT_DIM, fontSize: 10 } as const;

  return (
    <div style={{ background: C_BG_SVG, borderRadius: 8, padding: 16, maxWidth: 750, marginTop: 16 }}>
      <h3 style={{ color: C_COLUMN_TEXT, margin: "0 0 12px", fontSize: 14 }}>
        Смета ГКЛ (раскрой из {GKL_SHEET_W_MM}×{GKL_SHEET_H_MM}, толщина {GKL_THICKNESS_MM} мм)
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C_TEXT_DIM}` }}>
            <th style={{ textAlign: "left", ...td, color: C_TEXT }}>Лист</th>
            <th style={{ textAlign: "left", ...td, color: C_TEXT }}>Раскрой</th>
            <th style={{ textAlign: "right", ...td, color: C_TEXT }}>Обрезки</th>
          </tr>
        </thead>
        <tbody>
          {sheets.map((sheet, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C_TEXT_DIM}33`, verticalAlign: "top" }}>
              <td style={{ ...td, color: C_DIM, fontWeight: "bold" }}>#{i + 1}</td>
              <td style={tdDim}>
                {sheet.cuts.map((cut, j) => (
                  <div key={j}>
                    <span style={{ color: C_TEXT }}>{cut.width}×{cut.height}</span>
                    {" "}<span style={{ color: C_TEXT_DIM }}>— {cut.label}</span>
                  </div>
                ))}
              </td>
              <td style={{ ...tdDim, textAlign: "right" }}>
                {sheet.waste.length > 0
                  ? sheet.waste.map((w, j) => <div key={j}>{w}</div>)
                  : <span style={{ color: C_TEXT_DIM }}>—</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ color: C_TEXT_DIM, fontSize: 11, marginTop: 10, borderTop: `1px solid ${C_TEXT_DIM}33`, paddingTop: 8 }}>
        <strong style={{ color: C_DIM }}>Итого купить:</strong>{" "}
        <strong style={{ color: C_TEXT }}>{totalSheets} листов</strong> ГКЛ {GKL_SHEET_W_MM}×{GKL_SHEET_H_MM}×{GKL_THICKNESS_MM}
        {" "}= <strong style={{ color: C_TEXT }}>{totalSheets * 25} кг</strong> (25 кг/лист)
      </div>
    </div>
  );
}

export function Estimate() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <ProfileSection />
      <GklEstimate />
    </div>
  );
}
