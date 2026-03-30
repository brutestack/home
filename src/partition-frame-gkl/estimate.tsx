import { ProfileEstimate, ProfileType, ProfileCut } from "../profile-estimate";
import {
  CEILING_H_MM, PN_H_MM, GKL_SHEET_W_MM, GKL_SHEET_H_MM, DOBOR_H_MM, GKL_THICKNESS_MM,
  BEDROOM_VERT_FULL_LEN_MM, GKL_DOOR_STUD_LEFT_MID_MM, GKL_DOOR_START_MM, GKL_DOOR_END_MM,
  STUD_POSITIONS_GKL, DOOR_W_MM, OVER_DOOR_H_MM, DOOR_H_MM
} from "../constants";
import { C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_DIM } from "../colors";

// Смета профилей
function ProfileSection() {
  const studH = CEILING_H_MM - PN_H_MM * 2;
  const overDoorLen = BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM; // 975

  const profiles: ProfileType[] = [
    {
      name: "ПН 50×40",
      cuts: [
        { length: BEDROOM_VERT_FULL_LEN_MM, qty: 4 },    // пол + потолок × 2 слоя
        { length: overDoorLen, qty: 2 },                    // над дверью × 2 слоя
        { length: GKL_SHEET_W_MM, qty: 2 },                // стык ГКЛ × 2 слоя (на 1200 мм)
      ],
    },
    {
      name: "ПН 75×40",
      cuts: [
        { length: BEDROOM_VERT_FULL_LEN_MM, qty: 2 }, // между слоями
      ],
    },
    {
      name: "ПС 50×50",
      cuts: [
        { length: studH, qty: STUD_POSITIONS_GKL.length * 2 },
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

  // Основные куски (для каждой стороны)
  const mainW = GKL_SHEET_W_MM;                          // 1200 (0→1200)
  const narrowW = GKL_DOOR_START_MM - GKL_SHEET_W_MM;    // 620 (1200→1820)
  const overDoorW = BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM; // 975 (1795→2770)
  const bathroomStripW = BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_END_MM;       // 50 (2720→2770)

  // Доборки сверху (стык вразбежку: основные на 1200, доборки на 800)
  const dobor1W = 800;                                   // 0→800
  const dobor2W = GKL_DOOR_START_MM - dobor1W;           // 800→1820 = 1020

  const sheets: SheetPlan[] = [];

  // Лист 1: основной лист (сторона лестницы) — 1200×2500 целиком
  sheets.push({
    cuts: [{ width: mainW, height: H, label: "основной (лестница)" }],
    waste: [],
  });

  // Лист 2: основной лист (сторона спальни) — 1200×2500 целиком (зеркально)
  sheets.push({
    cuts: [{ width: mainW, height: H, label: "основной (спальня)" }],
    waste: [],
  });

  // Лист 3: узкий лист (лестница) — 620×2500
  sheets.push({
    cuts: [{ width: narrowW, height: H, label: `узкий с вырезом (лестница)` }],
    waste: [`${W - narrowW}×${H}`],
  });

  // Лист 4: узкий лист (спальня) — 620×2500
  sheets.push({
    cuts: [{ width: narrowW, height: H, label: `узкий с вырезом (спальня)` }],
    waste: [`${W - narrowW}×${H}`],
  });

  // Лист 5: панели над дверью × 2 стороны — 975×800 × 2
  // 975 + 975 = 1950 > 1200, нужно повернуть: 800×975 × 2 из листа (высота 800 < 1200)
  // Из листа 1200×2500: два куска 800×975 = 1950 по высоте, помещается
  sheets.push({
    cuts: [
      { width: overDoorW, height: OVER_DOOR_H_MM, label: `над дверью (лестница) ${overDoorW}×${OVER_DOOR_H_MM}` },
      { width: overDoorW, height: OVER_DOOR_H_MM, label: `над дверью (спальня) ${overDoorW}×${OVER_DOOR_H_MM}` },
    ],
    waste: [`${W - overDoorW}×${OVER_DOOR_H_MM * 2}`, `${W}×${H - OVER_DOOR_H_MM * 2}`],
  });

  // Лист 6: доборки верх + полоски у ванной
  // dobor1: 800×300 × 2 = 1600 по ширине (не помещается в 1200)
  // Раскрой: 800×300 + 1020×300 (лестница) + 800×300 + 1020×300 (спальня) + 50×2000 × 2
  // По высоте: 300 × 4 рядов = 1200 + 2000 полоски
  // Разместим доборки и полоски:
  const doborCuts: SheetCut[] = [
    { width: dobor1W, height: dH, label: `доб. верх 1 (лестн.) ${dobor1W}×${dH}` },
    { width: dobor2W, height: dH, label: `доб. верх 2 (лестн.) ${dobor2W}×${dH}` },
    { width: dobor1W, height: dH, label: `доб. верх 1 (спальня) ${dobor1W}×${dH}` },
    { width: dobor2W, height: dH, label: `доб. верх 2 (спальня) ${dobor2W}×${dH}` },
    { width: bathroomStripW, height: DOOR_H_MM, label: `полоса у ванной (лестн.) ${bathroomStripW}×${DOOR_H_MM}` },
    { width: bathroomStripW, height: DOOR_H_MM, label: `полоса у ванной (спальня) ${bathroomStripW}×${DOOR_H_MM}` },
  ];
  sheets.push({
    cuts: doborCuts,
    waste: [`остатки листа`],
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
