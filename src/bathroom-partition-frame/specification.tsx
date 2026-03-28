import {
  CEILING_H_MM, GKL_SHEET_H_MM, GKL_SHEET_W_MM, GKL_THICKNESS_MM, DOBOR_H_MM,
  DOOR_W_MM, DOOR_H_MM, OVER_DOOR_H_MM, BEAM_W_MM, BEAM_H_MM, BEAM_LEVEL_MM,
  BATH_TOTAL_LEN_MM, BATH_DOOR_END_MM,
  PN_H_MM, PS_W_MM, BATH5_STUD_STEP_MM, GKL_GAP_MM,
  STUD_POSITIONS_BATH, STUD_POSITIONS_CORRIDOR, PARTITION_T_MM
} from "../constants";
import { C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_DIM } from "../colors";

export function Specification() {
  // ГКЛ 1-й слой (со стороны ванной)
  const doorStudCenter = BATH_DOOR_END_MM + PS_W_MM / 2;                // 975 мм
  const gklJoint = STUD_POSITIONS_BATH[3] + PS_W_MM / 2;               // 1775 мм (стык осн. листов)
  const gklMainW = gklJoint - doorStudCenter;                            // 800 мм
  const gklRightW = BATH_TOTAL_LEN_MM - gklJoint;                       // 665 мм
  const gklOverDoorW = doorStudCenter;                                   // 975 мм
  const doborW = BATH_TOTAL_LEN_MM - doorStudCenter;                    // 1465 мм (один кусок)

  // Длина бруса — на всю перегородку
  const beamLen = BATH_TOTAL_LEN_MM; // 2440 мм
  // ПН на полу — после проёма
  const pnFloorLen = BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM;              // 1490 мм
  // ПН для стыка ГКЛ
  const pnJointLen = pnFloorLen;                                         // 1490 мм

  // Стойки ПС
  const studH = CEILING_H_MM - PN_H_MM * 2;
  const totalStuds = STUD_POSITIONS_BATH.length + STUD_POSITIONS_CORRIDOR.length;

  // ГКЛ 2-й слой (горизонтальная раскладка, со стороны ванной)
  const gkl2LayerW = pnFloorLen;                                          // 1490
  const gkl2LayerRow3H = CEILING_H_MM - GKL_SHEET_W_MM * 2;              // 400

  const items = [
    { num: 1, name: `ГКЛ 1сл (осн. лист)`, size: `${gklMainW}×${GKL_SHEET_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: `стык на стойке ${gklJoint}, с вырезом` },
    { num: 2, name: `ГКЛ 1сл (правая часть)`, size: `${gklRightW}×${GKL_SHEET_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: `от ${gklJoint} до ${BATH_TOTAL_LEN_MM}` },
    { num: 3, name: `ГКЛ 1сл (доборка сверху)`, size: `${doborW}×${DOBOR_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: `один кусок ${doorStudCenter}→${BATH_TOTAL_LEN_MM}` },
    { num: 4, name: `ГКЛ 1сл (Г-деталь у двери)`, size: `${gklOverDoorW}×${OVER_DOOR_H_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: "с вырезом под проём" },
    { num: 5, name: `Брус (на всю перегородку)`, size: `${beamLen}×${BEAM_H_MM}×${BEAM_W_MM} мм`, qty: "1 шт", note: `низ на ${BEAM_LEVEL_MM} мм, между слоями, для механизма` },
    { num: 6, name: "Профиль ПН 50×40 (пол, после проёма)", size: `${pnFloorLen} мм`, qty: "2 шт", note: "после проёма × 2 слоя" },
    { num: 7, name: "Профиль ПН 50×40 (пол, у края)", size: `${PS_W_MM} мм`, qty: "2 шт", note: "под краевой стойкой × 2 слоя" },
    { num: 8, name: "Профиль ПН 50×40 (потолок)", size: `${BATH_TOTAL_LEN_MM} мм`, qty: "2 шт", note: "на всю длину × 2 слоя" },
    { num: 9, name: "Профиль ПН 75×40 (между слоями)", size: `${BATH_TOTAL_LEN_MM} мм`, qty: "2 шт", note: "пол + потолок для зазора 75мм" },
    { num: 10, name: "Профиль ПН 50×40 (над дверью)", size: `${DOOR_W_MM} мм`, qty: "2 шт", note: `только над проёмом, низ на ${DOOR_H_MM} мм × 2 слоя` },
    { num: 11, name: "Профиль ПН 50×40 (стык ГКЛ)", size: `${pnJointLen} мм`, qty: "2 шт", note: `центр на ${GKL_SHEET_H_MM} мм × 2 слоя` },
    { num: 12, name: "Профиль ПС 50×50", size: `${studH} мм`, qty: `${totalStuds} шт`, note: `${STUD_POSITIONS_BATH.length} ванная + ${STUD_POSITIONS_CORRIDOR.length} коридор` },
    { num: 13, name: "Брус (между слоями)", size: `${GKL_GAP_MM}×${PS_W_MM}×${studH} мм`, qty: "2 шт", note: "связь слоёв у краёв перегородки" },
    { num: 14, name: `ГКЛ 2сл (горизонтальный)`, size: `${pnFloorLen}×${GKL_SHEET_W_MM}×${GKL_THICKNESS_MM}`, qty: "2 шт", note: `2-й слой ванная, горизонтальный` },
    { num: 15, name: `ГКЛ 2сл (верхний ряд)`, size: `${pnFloorLen}×${gkl2LayerRow3H}×${GKL_THICKNESS_MM}`, qty: "1 шт", note: `2-й слой ванная, верхний ряд` },
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
        * Лист ГКЛ от пола | Доборка сверху: {DOBOR_H_MM} мм | Шаг стоек: {BATH5_STUD_STEP_MM} мм
      </p>
      <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 4 }}>
        * Брус на {BEAM_LEVEL_MM} мм для механизма откатной двери | ПН на {DOOR_H_MM} мм | ГКЛ закрывает механизм ({OVER_DOOR_H_MM} мм)
      </p>
      <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 4 }}>
        * 2 слоя ГКЛ со стороны ванной (горизонтальная раскладка)
      </p>
    </div>
  );
}
