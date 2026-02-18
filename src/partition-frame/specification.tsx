import {
  CEILING_H_MM, DOOR_W_MM, DOOR_OFFSET_MM, DOOR_H_MM, PANEL_H_MM, PANEL_W_MM, PANEL_T_MM,
  LDSP_DOBOR_H_MM, OVER_DOOR_PANEL_H_MM, HORIZ_W_MM, PN_H_MM, BEAM_W_MM, BEAM_H_MM,
  BEDROOM_VERT_FULL_LEN_MM
} from "../constants";
import { C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_DIM } from "../colors";

export function Specification() {
  const gapLeft = BEDROOM_VERT_FULL_LEN_MM - DOOR_OFFSET_MM - DOOR_W_MM - PANEL_W_MM * 2;
  const doorEnd = BEDROOM_VERT_FULL_LEN_MM - DOOR_OFFSET_MM;

  const items = [
    { num: 1, name: "ЛДСП панель (до проёма)", size: `${PANEL_W_MM}×${PANEL_H_MM}×${PANEL_T_MM}`, qty: "4 шт", note: "2 панели × 2 стороны перегородки" },
    { num: 2, name: "ЛДСП панель (над дверью)", size: `${DOOR_W_MM}×${OVER_DOOR_PANEL_H_MM}×${PANEL_T_MM}`, qty: "2 шт", note: "до потолка + 100мм для механизма двери" },
    { num: 3, name: "ЛДСП панель (горизонтальная)", size: `${HORIZ_W_MM}×${PANEL_H_MM}×${PANEL_T_MM}`, qty: "2 шт", note: "обе стороны горизонтальной части" },
    { num: 4, name: "ЛДСП доборка (у стены)", size: `${gapLeft}×${PANEL_H_MM}×${PANEL_T_MM}`, qty: "2 шт", note: "зазор у верхней стены" },
    { num: 5, name: "ЛДСП доборка (после проёма)", size: `${DOOR_OFFSET_MM}×${PANEL_H_MM}×${PANEL_T_MM}`, qty: "2 шт", note: "от проёма до ванной" },
    { num: 6, name: "Доборная планка (низ)", size: `~1800×${LDSP_DOBOR_H_MM}×${PANEL_T_MM}`, qty: "2 шт", note: "под панелями у пола" },
    { num: 7, name: "Брус (над дверью)", size: `${doorEnd}×${BEAM_H_MM}×${BEAM_W_MM}`, qty: "1 шт", note: "между слоями, от стены до конца проёма" },
    { num: 8, name: "Брус (в стойке)", size: `${CEILING_H_MM - PN_H_MM * 2}×${BEAM_H_MM}×${BEAM_W_MM}`, qty: "2 шт", note: "усиление стойки у ванной × 2 слоя" },
    { num: 9, name: "Профиль ПН 50×40", size: `${BEDROOM_VERT_FULL_LEN_MM} мм`, qty: "4 шт", note: "пол + потолок × 2 слоя" },
    { num: 10, name: "Профиль ПН 75×40", size: `${BEDROOM_VERT_FULL_LEN_MM} мм`, qty: "2 шт", note: "между слоями (пол + потолок) для зазора 75мм" },
    { num: 11, name: "Профиль ПС 50×50", size: `${CEILING_H_MM - PN_H_MM * 2} мм`, qty: "10 шт", note: "5 стоек × 2 слоя" },
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
        * Панель вплотную к потолку | Доборка снизу: {LDSP_DOBOR_H_MM} мм | Высота проёма: {DOOR_H_MM} мм | Отступ проёма от ванной: {DOOR_OFFSET_MM} мм
      </p>
      <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 4 }}>
        * ПН 75 между слоями: при обшивке ГКЛ 12.5мм с каждой стороны останется 50мм для откатной двери
      </p>
    </div>
  );
}
