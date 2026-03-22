import {
  CEILING_H_MM, GKL_SHEET_H_MM, GKL_SHEET_W_MM, DOBOR_H_MM, GKL_THICKNESS_MM,
  BATH_VERT_LEN_MM,
  BATH_VERT_PN_W_MM, BATH_VERT_PN_H_MM,
  BATH_VERT_PS_W_MM, BATH_VERT_PS_H_MM,
  BATH_VERT_STUD_POSITIONS,
  BATH_VERT_GKL_SHEET1_W_MM, BATH_VERT_GKL_SHEET2_W_MM, BATH_VERT_GKL_DOBOR_W_MM,
  PN_H_MM, STUD_STEP_MM
} from "../constants";
import { C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT } from "../colors";

export function Specification() {
  const studCount = BATH_VERT_STUD_POSITIONS.length;
  const studH = CEILING_H_MM - PN_H_MM * 2;

  // Раскладка ГКЛ со стороны ванной: 2×1200 + 80
  // Раскладка ГКЛ со стороны спальни (вразбежку): 600 + 1200 + 680
  const gklRemainBack = BATH_VERT_LEN_MM - STUD_STEP_MM - GKL_SHEET_W_MM;

  const items = [
    { num: 1, name: "Лист ГКЛ основной", size: `${GKL_SHEET_W_MM}×${GKL_SHEET_H_MM}×${GKL_THICKNESS_MM}`, qty: "4 шт", note: "2 шт × 2 стороны" },
    { num: 2, name: "Доборка ГКЛ у стены", size: `${BATH_VERT_GKL_DOBOR_W_MM}×${GKL_SHEET_H_MM}×${GKL_THICKNESS_MM}`, qty: "1 шт", note: "со стороны ванной" },
    { num: 3, name: "Доборка ГКЛ сверху", size: `${BATH_VERT_LEN_MM}×${DOBOR_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: "1 × 2 стороны" },
    { num: 4, name: "Доборка ГКЛ (спальня)", size: `${STUD_STEP_MM}×${GKL_SHEET_H_MM}×${GKL_THICKNESS_MM}`, qty: "1 шт", note: "смещение 600мм" },
    { num: 5, name: "Профиль ПН (пол)", size: `${BATH_VERT_LEN_MM}×${BATH_VERT_PN_W_MM}×${BATH_VERT_PN_H_MM}`, qty: "1 шт", note: "" },
    { num: 6, name: "Профиль ПН (потолок)", size: `${BATH_VERT_LEN_MM}×${BATH_VERT_PN_W_MM}×${BATH_VERT_PN_H_MM}`, qty: "1 шт", note: "" },
    { num: 7, name: "Профиль ПС (стойка)", size: `${studH}×${BATH_VERT_PS_W_MM}×${BATH_VERT_PS_H_MM}`, qty: `${studCount} шт`, note: `шаг ${STUD_STEP_MM} мм` },
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
