import { ProfileEstimate, ProfileType, ProfileCut } from "../profile-estimate";
import {
  CEILING_H_MM, PN_H_MM, GKL_SHEET_W_MM, GKL_SHEET_H_MM, DOBOR_H_MM, GKL_THICKNESS_MM,
  BATH_VERT_LEN_MM, BATH_VERT_STUD_POSITIONS, BATH_VERT_STUD_CENTERS, BATH_VERT_PS_W_MM
} from "../constants";
import { C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_DIM } from "../colors";

// Смета профилей
function ProfileSection() {
  const studH = CEILING_H_MM - PN_H_MM * 2;

  // Перемычки между стойками (на стыке листов и доборок)
  const braceCuts: ProfileCut[] = [];
  for (let i = 0; i < BATH_VERT_STUD_POSITIONS.length - 1; i++) {
    const len = BATH_VERT_STUD_POSITIONS[i + 1] - BATH_VERT_STUD_POSITIONS[i] - 50; // PS_W=50
    const existing = braceCuts.find(c => c.length === len);
    if (existing) existing.qty++;
    else braceCuts.push({ length: len, qty: 1 });
  }

  const profiles: ProfileType[] = [
    {
      name: "ПН 50×40",
      cuts: [
        { length: BATH_VERT_LEN_MM, qty: 2 }, // пол + потолок
        ...braceCuts,                           // перемычки
      ],
    },
    {
      name: "ПС 50×50",
      cuts: [{ length: studH, qty: BATH_VERT_STUD_POSITIONS.length }],
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
  // Ванная стена: стыки на [2],[5]
  const frontPiece1 = BATH_VERT_STUD_CENTERS[2]; // 600
  const frontPiece3 = BATH_VERT_LEN_MM - BATH_VERT_STUD_CENTERS[5]; // 830

  // Спальня стена: стыки на зеркальных [1],[4]
  const mirroredCenters = BATH_VERT_STUD_POSITIONS
    .map(pos => BATH_VERT_LEN_MM - pos - BATH_VERT_PS_W_MM + BATH_VERT_PS_W_MM / 2)
    .sort((a, b) => a - b);
  const backPiece1 = mirroredCenters[1]; // 430
  const backPiece2 = BATH_VERT_LEN_MM - mirroredCenters[4]; // 1000

  // Доборки сверху
  const frontDobor = [BATH_VERT_STUD_CENTERS[3], BATH_VERT_STUD_CENTERS[6] - BATH_VERT_STUD_CENTERS[3], BATH_VERT_LEN_MM - BATH_VERT_STUD_CENTERS[6]];
  const backDobor = [mirroredCenters[2], mirroredCenters[5] - mirroredCenters[2], BATH_VERT_LEN_MM - mirroredCenters[5]];

  // 2-й слой (горизонтальный) — ванная сторона
  // Ряды 1,3: стык [4]=1400. Ряд 2: стык [3]=1000 (вразбежку).
  const jointA = BATH_VERT_STUD_CENTERS[4]; // 1400
  const jointB = BATH_VERT_STUD_CENTERS[3]; // 1000
  const r13L = jointA;                        // 1400
  const r13R = BATH_VERT_LEN_MM - jointA;    // 1230
  const r2L = jointB;                         // 1000
  const r2R = BATH_VERT_LEN_MM - jointB;     // 1630
  const rowH2 = W;                            // 1200 мм высота ряда
  const topH = CEILING_H_MM - rowH2 * 2;     // 400 мм

  const sheets: SheetPlan[] = [];

  // === 1-й слой (вертикальный) ===

  // Листы 1–3: целые листы (2 ванная + 1 спальня)
  for (let i = 0; i < 3; i++) {
    sheets.push({
      cuts: [{ width: W, height: H, label: i < 2 ? "1сл ванная" : "1сл спальня" }],
      waste: [],
    });
  }

  // Лист 4: 600×2500 + 430×2500 (ванная + спальня)
  const gap4 = W - frontPiece1 - backPiece1;
  sheets.push({
    cuts: [
      { width: frontPiece1, height: H, label: "1сл ванная" },
      { width: backPiece1, height: H, label: "1сл спальня" },
    ],
    waste: gap4 > 0 ? [`${gap4}×${H}`] : [],
  });

  // Лист 5: 830×2500 (ванная) + доборки из остатка 370×2500
  const scrap5W = W - frontPiece3;
  sheets.push({
    cuts: [
      { width: frontPiece3, height: H, label: "1сл ванная" },
      ...(scrap5W >= frontDobor[2] ? [{ width: frontDobor[2], height: dH, label: `доб. верх ванная (${frontDobor[2]})` }] : []),
    ],
    waste: scrap5W >= frontDobor[2]
      ? [`${scrap5W}×${H - dH}`, `${scrap5W - frontDobor[2]}×${dH}`]
      : [`${scrap5W}×${H}`],
  });

  // Лист 6: 1000×2500 (стена спальня)
  const scrap6W = W - backPiece2;
  sheets.push({
    cuts: [
      { width: backPiece2, height: H, label: "1сл спальня" },
    ],
    waste: [`${scrap6W}×${H}`],
  });

  // Лист 7: полосы 300мм для доборок
  const doborCuts = [
    { width: frontDobor[0], height: dH, label: `доб. верх ванная (${frontDobor[0]})` },
    { width: frontDobor[1], height: dH, label: `доб. верх ванная (${frontDobor[1]})` },
    { width: backDobor[0], height: dH, label: `доб. верх спальня (${backDobor[0]})` },
    { width: backDobor[1], height: dH, label: `доб. верх спальня (${backDobor[1]})` },
    { width: backDobor[2], height: dH, label: `доб. верх спальня (${backDobor[2]})` },
  ];
  // Доборка frontDobor[2] уже вырезана из листа 5
  const doborStrips = doborCuts.length;
  const doborWaste: string[] = [];
  for (const cut of doborCuts) {
    if (cut.width < W) doborWaste.push(`${W - cut.width}×${dH}`);
  }
  doborWaste.push(`${W}×${H - doborStrips * dH}`);
  sheets.push({
    cuts: doborCuts,
    waste: doborWaste.filter(w => !w.startsWith("0×")),
  });

  // === 2-й слой (горизонтальный, ванная сторона) ===
  // Ряды 1,3: стык 1400 → 1400+1230. Ряд 2: стык 1000 → 1000+1630.

  // Лист 8: 1400×1200 (ряд 1 Л) + 1000×1200 (ряд 2 Л) — 1400+1000=2400 из 2500
  sheets.push({
    cuts: [
      { width: r13L, height: rowH2, label: `2сл ряд 1 левая (${r13L}×${rowH2})` },
      { width: r2L, height: rowH2, label: `2сл ряд 2 левая (${r2L}×${rowH2})` },
    ],
    waste: [`${H - r13L - r2L}×${rowH2}`],
  });

  // Лист 9: 1230×1200 (ряд 1 П) + 1230×400 (верх П, из остатка 1270×1200)
  sheets.push({
    cuts: [
      { width: r13R, height: rowH2, label: `2сл ряд 1 правая (${r13R}×${rowH2})` },
      { width: r13R, height: topH, label: `2сл верх правая (${r13R}×${topH})` },
    ],
    waste: [`${H - r13R}×${rowH2 - topH}`, `${H - r13R - r13R}×${topH}`],
  });

  // Лист 10: 1630×1200 (ряд 2 П)
  sheets.push({
    cuts: [{ width: r2R, height: rowH2, label: `2сл ряд 2 правая (${r2R}×${rowH2})` }],
    waste: [`${H - r2R}×${rowH2}`],
  });

  // Лист 11: 1400×400 (верх Л) — 870×1200 остаток листа 10 < 1400, нужен новый
  sheets.push({
    cuts: [{ width: r13L, height: topH, label: `2сл верх левая (${r13L}×${topH})` }],
    waste: [`${H - r13L}×${topH}`, `${H}×${rowH2 - topH}`],
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
