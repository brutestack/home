import {
  CEILING_H_MM, GKL_SHEET_H_MM, GKL_SHEET_W_MM, GKL_THICKNESS_MM, GKL_GAP_MM, DOBOR_H_MM,
  DOOR_W_MM, DOOR_H_MM, OVER_DOOR_H_MM, BEAM_W_MM, BEAM_H_MM, BEAM_LEVEL_MM,
  COL_W_MM, COL_H_MM, BATH_HORIZ_LEN_MM, BATH_TOTAL_LEN_MM,
  PN_H_MM, PS_W_MM, STUD_STEP_MM, BATH_DOOR_END_MM, STUD_POSITIONS, PARTITION_T_MM
} from "../constants";
import { C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_DIM } from "../colors";

export function Specification() {
  // ГКЛ основной лист (стандартная ширина, с вырезом)
  const gklMainW = GKL_SHEET_W_MM; // 1200 мм
  // ГКЛ доборка у колонны 1
  const gklColDoborW = BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM - GKL_SHEET_W_MM; // 90 мм
  // ГКЛ над дверью (до середины стойки справа от проёма)
  const gklOverDoorW = BATH_DOOR_END_MM + PS_W_MM/2; // 1175 мм
  // Длина бруса — на всю перегородку
  const beamLen = BATH_HORIZ_LEN_MM; // 2040 мм
  // Длина ПН на полу — после проёма
  const pnFloorLen = COL_W_MM + BATH_HORIZ_LEN_MM - BATH_DOOR_END_MM; // 1090 мм
  // Длина ПН для стыка ГКЛ
  const pnJointLen = COL_W_MM + BATH_HORIZ_LEN_MM - BATH_DOOR_END_MM; // 1090 мм

  const items = [
    { num: 1, name: `ГКЛ лист (основной)`, size: `${gklMainW}×${GKL_SHEET_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: "от границы проёма, с вырезом × 2 стороны" },
    { num: 2, name: `ГКЛ (доборка у колонны 1)`, size: `${gklColDoborW.toFixed(0)}×${GKL_SHEET_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: "закрывает колонну 1" },
    { num: 3, name: `ГКЛ (доборка сверху)`, size: `${gklMainW}×${DOBOR_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: "над основным листом" },
    { num: 4, name: `ГКЛ (доборка сверху у кол.1)`, size: `${gklColDoborW.toFixed(0)}×${DOBOR_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: "над колонной 1" },
    { num: 5, name: `ГКЛ (над дверью)`, size: `${gklOverDoorW.toFixed(0)}×${OVER_DOOR_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: "закрывает колонну 2 и механизм" },
    { num: 6, name: `Брус (на всю перегородку)`, size: `${beamLen}×${BEAM_H_MM}×${BEAM_W_MM} мм`, qty: "1 шт", note: `низ на ${BEAM_LEVEL_MM} мм, между слоями, для механизма` },
    { num: 7, name: "Профиль ПН 50×40 (пол, после проёма)", size: `${pnFloorLen} мм`, qty: "2 шт", note: "после проёма × 2 слоя" },
    { num: 8, name: "Профиль ПН 50×40 (пол, у кол.2)", size: `${PS_W_MM} мм`, qty: "2 шт", note: "под стойкой у колонны 2 × 2 слоя" },
    { num: 9, name: "Профиль ПН 50×40 (потолок)", size: `${BATH_HORIZ_LEN_MM} мм`, qty: "2 шт", note: "на всю длину × 2 слоя" },
    { num: 10, name: "Профиль ПН 75×40 (между слоями)", size: `${BATH_HORIZ_LEN_MM} мм`, qty: "2 шт", note: "пол + потолок для зазора 75мм" },
    { num: 11, name: "Профиль ПН 50×40 (над дверью)", size: `${DOOR_W_MM} мм`, qty: "2 шт", note: `только над проёмом, низ на ${DOOR_H_MM} мм × 2 слоя` },
    { num: 12, name: "Профиль ПН 50×40 (стык ГКЛ)", size: `${pnJointLen} мм`, qty: "2 шт", note: `центр на ${GKL_SHEET_H_MM} мм × 2 слоя` },
    { num: 13, name: "Профиль ПС 50×50", size: `${CEILING_H_MM - PN_H_MM * 2} мм`, qty: `${STUD_POSITIONS.length * 2} шт`, note: `${STUD_POSITIONS.length} стоек × 2 слоя` },
    { num: 14, name: "Брус (между слоями)", size: `${GKL_GAP_MM}×${PS_W_MM}×${CEILING_H_MM - PN_H_MM * 2} мм`, qty: "2 шт", note: "связь слоёв у колонны 2 и у перегородки спальни" },
  ];

  return (
    <div style={{ background: C_BG_SVG, borderRadius: 8, padding: 16, maxWidth: 750 }}>
      <h3 style={{ color: C_COLUMN_TEXT, margin: "0 0 12px", fontSize: 14 }}>Спецификация материалов</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C_TEXT_DIM}` }}>
            <th style={{ textAlign: "center", padding: "8px 4px", color: C_TEXT, width: 30 }}>№</th>
            <th style={{ textAlign: "left", padding: "8px 4px", color: C_TEXT }}>Элемент</th>
            <th style={{ textAlign: "left", padding: "8px 4px", color: C_TEXT }}>Размер</th>
            <th style={{ textAlign: "center", padding: "8px 4px", color: C_TEXT }}>Кол-во</th>
            <th style={{ textAlign: "left", padding: "8px 4px", color: C_TEXT }}>Примечание</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.num} style={{ borderBottom: `1px solid ${C_TEXT_DIM}33` }}>
              <td style={{ padding: "6px 4px", color: C_DIM, textAlign: "center", fontWeight: "bold" }}>{item.num}</td>
              <td style={{ padding: "6px 4px", color: C_DIM }}>{item.name}</td>
              <td style={{ padding: "6px 4px", color: C_TEXT_DIM }}>{item.size}</td>
              <td style={{ padding: "6px 4px", color: C_TEXT_DIM, textAlign: "center" }}>{item.qty}</td>
              <td style={{ padding: "6px 4px", color: C_TEXT_DIM, fontSize: 10 }}>{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 12 }}>
        * Лист ГКЛ от пола | Доборка сверху: {DOBOR_H_MM} мм | Шаг стоек: {STUD_STEP_MM} мм
      </p>
      <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 4 }}>
        * Брус на {BEAM_LEVEL_MM} мм для механизма откатной двери | ПН на {DOOR_H_MM} мм | ГКЛ закрывает механизм ({OVER_DOOR_H_MM} мм)
      </p>
      <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 4 }}>
        * Колонны {COL_W_MM}×{COL_H_MM} мм — несущие, ГКЛ монтируются поверх колонн
      </p>
    </div>
  );
}
