import {
  CEILING_H_MM, GKL_SHEET_W_MM, GKL_SHEET_H_MM, DOBOR_H_MM, GKL_THICKNESS_MM,
  BATH_VERT_LEN_MM,
  BATH_VERT_PN_W_MM, BATH_VERT_PN_H_MM,
  BATH_VERT_PS_W_MM, BATH_VERT_PS_H_MM,
  BATH_VERT_STUD_POSITIONS, BATH_VERT_STUD_CENTERS,
  PN_H_MM, BATH_VERT_STUD_STEP_MM
} from "../constants";
import { C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT } from "../colors";

export function Specification() {
  const studCount = BATH_VERT_STUD_POSITIONS.length;
  const studH = CEILING_H_MM - PN_H_MM * 2;

  const mirroredStudCenters = BATH_VERT_STUD_POSITIONS
    .map(pos => BATH_VERT_LEN_MM - pos - BATH_VERT_PS_W_MM + BATH_VERT_PS_W_MM / 2)
    .sort((a, b) => a - b);

  // Стена спальня (зеркало): стыки на [1],[4]
  const backPiece1 = mirroredStudCenters[1];
  const backPiece2 = BATH_VERT_LEN_MM - mirroredStudCenters[4];

  // Стена ванная: стыки на [2],[5]
  const frontPiece1 = BATH_VERT_STUD_CENTERS[2];
  const frontPiece3 = BATH_VERT_LEN_MM - BATH_VERT_STUD_CENTERS[5];

  // Доборки сверху — стыки смещены от основных
  const frontDobor = [BATH_VERT_STUD_CENTERS[3], BATH_VERT_STUD_CENTERS[6] - BATH_VERT_STUD_CENTERS[3], BATH_VERT_LEN_MM - BATH_VERT_STUD_CENTERS[6]];
  const backDobor = [mirroredStudCenters[2], mirroredStudCenters[5] - mirroredStudCenters[2], BATH_VERT_LEN_MM - mirroredStudCenters[5]];

  // Перемычки между стойками
  const braceLengths = BATH_VERT_STUD_POSITIONS.slice(0, -1).map((pos, i) =>
    BATH_VERT_STUD_POSITIONS[i + 1] - pos - BATH_VERT_PS_W_MM
  ).sort((a, b) => a - b);
  const braceCount = braceLengths.length;

  // 2-й слой (горизонтальный) — ванная сторона
  // Ряды 1,3: стык [4]=1400. Ряд 2: стык [3]=1000 (вразбежку).
  // 1сл ванная стыки: 600/1800 (осн.), 1000/2200 (доб. на выс. 2500–2800).
  // На высоте рядов 1–2 стойки 1000 и 1400 свободны от стыков 1-го слоя.
  const jointA = BATH_VERT_STUD_CENTERS[4]; // 1400
  const jointB = BATH_VERT_STUD_CENTERS[3]; // 1000
  const rowH = GKL_SHEET_W_MM;              // 1200
  const topH = CEILING_H_MM - rowH * 2;     // 400

  const items = [
    { num: 1, name: "Лист ГКЛ основной (1-й слой)", size: `${GKL_SHEET_W_MM}×${GKL_SHEET_H_MM}×${GKL_THICKNESS_MM}`, qty: "4 шт", note: "2 шт × 2 стороны" },
    { num: 2, name: "Доборка ГКЛ 1-й слой (ванная)", size: `${frontPiece1}×${GKL_SHEET_H_MM} + ${frontPiece3}×${GKL_SHEET_H_MM}`, qty: "2 шт", note: "боковые куски" },
    { num: 3, name: "Доборка ГКЛ сверху (ванная)", size: `${frontDobor.join("+")} × ${DOBOR_H_MM}`, qty: "3 шт", note: `стыки на ${frontDobor[0]}, ${frontDobor[0] + frontDobor[1]} — вразбежку` },
    { num: 3, name: "Доборка ГКЛ сверху (спальня)", size: `${backDobor.join("+")} × ${DOBOR_H_MM}`, qty: "3 шт", note: `стыки на ${backDobor[0]}, ${backDobor[0] + backDobor[1]} — вразбежку` },
    { num: 4, name: "Доборка ГКЛ (спальня)", size: `${backPiece1}×${GKL_SHEET_H_MM}`, qty: "1 шт", note: "вразбежку, стык на стойке" },
    { num: 4, name: "Доборка ГКЛ (спальня)", size: `${backPiece2}×${GKL_SHEET_H_MM}`, qty: "1 шт", note: "вразбежку, стык на стойке" },
    { num: 5, name: "Профиль ПН (пол)", size: `${BATH_VERT_LEN_MM}×${BATH_VERT_PN_W_MM}×${BATH_VERT_PN_H_MM}`, qty: "1 шт", note: "" },
    { num: 6, name: "Профиль ПН (потолок)", size: `${BATH_VERT_LEN_MM}×${BATH_VERT_PN_W_MM}×${BATH_VERT_PN_H_MM}`, qty: "1 шт", note: "" },
    { num: 7, name: "Профиль ПС (стойка)", size: `${studH}×${BATH_VERT_PS_W_MM}×${BATH_VERT_PS_H_MM}`, qty: `${studCount} шт`, note: `шаг ${BATH_VERT_STUD_STEP_MM} мм` },
    { num: 8, name: "Перемычка ПН (гориз.)", size: `от ${braceLengths[0]} до ${braceLengths[braceLengths.length-1]}×${BATH_VERT_PN_W_MM}×${BATH_VERT_PN_H_MM}`, qty: `${braceCount} шт`, note: "на стыке листов и доборок" },
    { num: 9, name: "ГКЛ 2сл ряд 1 левая", size: `${jointA}×${rowH}×${GKL_THICKNESS_MM}`, qty: "1 шт", note: `гориз., стык на стойке ${jointA}` },
    { num: 10, name: "ГКЛ 2сл ряд 1 правая", size: `${BATH_VERT_LEN_MM - jointA}×${rowH}×${GKL_THICKNESS_MM}`, qty: "1 шт", note: `гориз., стык на стойке ${jointA}` },
    { num: 11, name: "Полоса ГКЛ 2сл (верх)", size: `${jointA}×${topH} + ${BATH_VERT_LEN_MM - jointA}×${topH}`, qty: "2 шт", note: `верхний ряд, стык на ${jointA}` },
    { num: 12, name: "ГКЛ 2сл ряд 2 левая", size: `${jointB}×${rowH}×${GKL_THICKNESS_MM}`, qty: "1 шт", note: `гориз., вразбежку — стык на ${jointB}` },
    { num: 13, name: "ГКЛ 2сл ряд 2 правая", size: `${BATH_VERT_LEN_MM - jointB}×${rowH}×${GKL_THICKNESS_MM}`, qty: "1 шт", note: `гориз., вразбежку — стык на ${jointB}` },
  ];

  return (
    <div style={{ background: C_BG_SVG, borderRadius: 8, padding: 16, maxWidth: 600 }}>
      <h4 style={{ color: C_COLUMN_TEXT, margin: "0 0 12px", fontSize: 14 }}>Спецификация материалов</h4>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, color: C_TEXT }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C_TEXT_DIM}` }}>
            <th style={{ padding: "6px 8px", textAlign: "left" }}>№</th>
            <th style={{ padding: "6px 8px", textAlign: "left" }}>Элемент</th>
            <th style={{ padding: "6px 8px", textAlign: "left" }}>Размер, мм</th>
            <th style={{ padding: "6px 8px", textAlign: "left" }}>Кол-во</th>
            <th style={{ padding: "6px 8px", textAlign: "left" }}>Примечание</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C_TEXT_DIM}33` }}>
              <td style={{ padding: "6px 8px" }}>{item.num}</td>
              <td style={{ padding: "6px 8px" }}>{item.name}</td>
              <td style={{ padding: "6px 8px" }}>{item.size}</td>
              <td style={{ padding: "6px 8px" }}>{item.qty}</td>
              <td style={{ padding: "6px 8px", color: C_TEXT_DIM }}>{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
