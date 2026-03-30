import {
  CEILING_H_MM, GKL_SHEET_H_MM, GKL_SHEET_W_MM, GKL_THICKNESS_MM, DOBOR_H_MM, OVER_DOOR_H_MM,
  DOOR_H_MM, DOOR_W_MM, DOOR_OFFSET_MM, PN_H_MM, BEAM_W_MM, BEAM_H_MM, GKL4_STUD_STEP_MM,
  BEDROOM_VERT_FULL_LEN_MM,
  GKL_DOOR_END_MM, GKL_DOOR_START_MM, GKL_DOOR_STUD_LEFT_MID_MM, GKL_NARROW_SHEET_W_MM, STUD_POSITIONS_GKL
} from "../constants";
import { C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_DIM } from "../colors";

export function Specification() {
  const studH = CEILING_H_MM - PN_H_MM * 2;
  const overDoorW = BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM; // 975
  const bathroomStripW = BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_END_MM;       // 50
  // Доборки сверху со смещением стыка относительно основных листов (стык основных на 1200)
  const dobor1W = 800;   // 0→800 (стык смещён от 1200)
  const dobor2W = GKL_DOOR_START_MM - dobor1W; // 800→1820 = 1020

  const items = [
    { num: 1, name: `ГКЛ лист (основной)`, size: `${GKL_SHEET_W_MM}×${GKL_SHEET_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: "0→1200 мм, 1 лист × 2 стороны" },
    { num: 2, name: `ГКЛ лист (узкий, с вырезом)`, size: `${GKL_NARROW_SHEET_W_MM}×${GKL_SHEET_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: "1200→1820 мм, вырез под дверь × 2 стороны" },
    { num: 3, name: `ГКЛ доборка верх 1`, size: `${dobor1W}×${DOBOR_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: "0→800 мм, стык вразбежку с основным (1200)" },
    { num: 4, name: `ГКЛ доборка верх 2`, size: `${dobor2W}×${DOBOR_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: "800→1820 мм, стык вразбежку" },
    { num: 5, name: `ГКЛ (над дверью)`, size: `${overDoorW}×${OVER_DOOR_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: `${GKL_DOOR_STUD_LEFT_MID_MM}→${BEDROOM_VERT_FULL_LEN_MM}, закрывает механизм` },
    { num: 6, name: `ГКЛ (у ванной)`, size: `${bathroomStripW}×${DOOR_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: `${GKL_DOOR_END_MM}→${BEDROOM_VERT_FULL_LEN_MM}, ширина стойки` },
    { num: 7, name: "Брус (над дверью)", size: `${GKL_DOOR_END_MM}×${BEAM_H_MM}×${BEAM_W_MM}`, qty: "1 шт", note: "между слоями, для механизма откатной двери" },
    { num: 8, name: "Профиль ПН 50×40 (пол/потолок)", size: `${BEDROOM_VERT_FULL_LEN_MM} мм`, qty: "4 шт", note: "пол + потолок × 2 слоя" },
    { num: 9, name: "Профиль ПН 75×40 (между слоями)", size: `${BEDROOM_VERT_FULL_LEN_MM} мм`, qty: "2 шт", note: "пол + потолок для зазора 75мм" },
    { num: 10, name: "Профиль ПН 50×40 (над дверью)", size: `${overDoorW} мм`, qty: "2 шт", note: `низ на ${DOOR_H_MM} мм × 2 слоя` },
    { num: 11, name: "Профиль ПН 50×40 (стык ГКЛ)", size: `${GKL_SHEET_W_MM} мм`, qty: "2 шт", note: `на стыке листов, ${GKL_SHEET_H_MM} мм × 2 слоя` },
    { num: 12, name: "Профиль ПС 50×50", size: `${studH} мм`, qty: `${STUD_POSITIONS_GKL.length * 2} шт`, note: `${STUD_POSITIONS_GKL.length} стоек × 2 слоя, шаг ${GKL4_STUD_STEP_MM} мм` },
  ];

  return (
    <div style={{ background: C_BG_SVG, borderRadius: 8, padding: 16, maxWidth: 750 }}>
      <h3 style={{ color: C_COLUMN_TEXT, margin: "0 0 12px", fontSize: 14 }}>Спецификация материалов (вариант ГКЛ)</h3>
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
        * Лист ГКЛ от пола | Доборка сверху: {DOBOR_H_MM} мм до потолка | Шаг стоек: {GKL4_STUD_STEP_MM} мм | Высота проёма: {DOOR_H_MM} мм
      </p>
      <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 4 }}>
        * ПН 75 между слоями: при обшивке ГКЛ 12.5мм с каждой стороны останется 50мм для откатной двери
      </p>
    </div>
  );
}
