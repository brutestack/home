import { HDim, VDim, StudLabel, SpecLabel } from "../svg-primitives";
import {
  CEILING_H_MM, GKL_SHEET_H_MM, DOBOR_H_MM,
  DOOR_W_MM, DOOR_H_MM, OVER_DOOR_H_MM,
  BEAM_LEVEL_MM, BEAM_H_MM,
  COL_W_MM, COL_H_MM, BATH_HORIZ_LEN_MM, BATH_TOTAL_LEN_MM,
  PN_H_MM, PS_W_MM, BATH_DOOR_START_MM, BATH_DOOR_END_MM,
  BEDROOM_PART_LEFT_MM, BEDROOM_PART_T_MM, BEDROOM_PART_RIGHT_MM,
  STUD_POSITIONS_CORRIDOR, getStudNumberCorridor,
  S_FRONT, FRONT_W, FRONT_H
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_COLUMN,
  C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL,
  C_DOOR_OPENING, C_BEDROOM_PART, C_COL_FILL
} from "../colors";

export function BackView() {
  const p = 70;
  const s = S_FRONT;

  // Зеркальные координаты (0 = колонна 1)
  const doorStartMirror = BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM;
  const doorEndMirror = BATH_TOTAL_LEN_MM - BATH_DOOR_START_MM;

  const partStart = COL_W_MM;
  const partEnd = COL_W_MM + BATH_HORIZ_LEN_MM;

  // Зеркальные позиции стоек
  const studsMirror = STUD_POSITIONS_CORRIDOR.map(pos => BATH_TOTAL_LEN_MM - pos - PS_W_MM).reverse();

  return (
    <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
      style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л5.Сх2 — Вид со стороны коридора (зеркальный)
      </text>

      {/* Контур помещения */}
      <rect x={p} y={p} width={BATH_TOTAL_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BATH_TOTAL_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BATH_TOTAL_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Колонна 1 (слева на зеркальном виде) */}
      <rect x={p} y={p} width={COL_W_MM * s} height={CEILING_H_MM * s}
        fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
      <text x={p + COL_W_MM/2 * s} y={p + CEILING_H_MM/2 * s}
        textAnchor="middle" fill={C_COLUMN} fontSize={10} fontWeight="bold">Колонна 1</text>
      <text x={p + COL_W_MM/2 * s} y={p + CEILING_H_MM/2 * s + 14}
        textAnchor="middle" fill={C_COLUMN} fontSize={8}>{COL_W_MM}×{COL_H_MM}</text>

      {/* Колонна 2 (справа на зеркальном виде) */}
      <rect x={p + partEnd * s} y={p} width={COL_W_MM * s} height={CEILING_H_MM * s}
        fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
      <text x={p + (partEnd + COL_W_MM/2) * s} y={p + CEILING_H_MM/2 * s}
        textAnchor="middle" fill={C_COLUMN} fontSize={10} fontWeight="bold">Колонна 2</text>
      <text x={p + (partEnd + COL_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 14}
        textAnchor="middle" fill={C_COLUMN} fontSize={8}>{COL_W_MM}×{COL_H_MM}</text>

      {/* Направляющие ПН на полу (до проёма) */}
      <rect x={p + partStart * s} y={p + CEILING_H_MM * s - PN_H_MM * s} width={(doorStartMirror - partStart) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (partStart + (doorStartMirror - partStart)/2) * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={7} color={C_FRAME}/>

      {/* Направляющие ПН на полу (под стойкой у колонны 2) */}
      <rect x={p + doorEndMirror * s} y={p + CEILING_H_MM * s - PN_H_MM * s} width={PS_W_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (doorEndMirror + PS_W_MM/2) * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={8} color={C_FRAME}/>

      {/* Направляющие ПН на потолке */}
      <rect x={p + partStart * s} y={p} width={BATH_HORIZ_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + partStart * s + 30} y={p + PN_H_MM/2 * s} num={9} color={C_FRAME}/>

      {/* Стоечные профили */}
      {studsMirror.map((pos, i) => {
        const originalPos = BATH_TOTAL_LEN_MM - pos - PS_W_MM;
        return (
          <g key={`stud${i}`}>
            <rect x={p + pos * s} y={p + PN_H_MM * s}
              width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
              fill={C_FRAME_FILL}
              stroke={C_FRAME}
              strokeWidth={1}/>
            <StudLabel x={p + (pos + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s} num={getStudNumberCorridor(originalPos)} color={C_FRAME}/>
            <SpecLabel x={p + (pos + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 40} num={13} color={C_FRAME}/>
          </g>
        );
      })}

      {/* Деревянный брус */}
      <rect x={p + partStart * s} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM) * s}
        width={BATH_HORIZ_LEN_MM * s} height={BEAM_H_MM * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
      <SpecLabel x={p + (partStart + BATH_HORIZ_LEN_MM/2) * s - 100} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM/2) * s} num={6} color={C_BEAM}/>

      {/* Перемычка ПН над дверью */}
      <rect x={p + doorStartMirror * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM) * s}
        width={DOOR_W_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (doorStartMirror + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM/2) * s} num={11} color={C_FRAME}/>

      {/* Горизонтальная направляющая на стыке ГКЛ/доборки */}
      <rect x={p + partStart * s} y={p + (CEILING_H_MM - GKL_SHEET_H_MM - PN_H_MM / 2) * s}
        width={(doorStartMirror - partStart - PS_W_MM) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (partStart + (doorStartMirror - partStart - PS_W_MM)/2) * s} y={p + (CEILING_H_MM - GKL_SHEET_H_MM) * s} num={12} color={C_FRAME}/>

      {/* Дверной проём */}
      <rect x={p + doorStartMirror * s} y={p + (CEILING_H_MM - DOOR_H_MM) * s}
        width={DOOR_W_MM * s} height={DOOR_H_MM * s}
        fill={C_DOOR_OPENING + "11"} stroke={C_DOOR_OPENING} strokeWidth={2} strokeDasharray="6 3"/>
      <text x={p + (doorStartMirror + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={12} fontWeight="bold">ПРОЁМ</text>

      {/* ГКЛ над дверью */}
      <rect x={p + (BATH_TOTAL_LEN_MM - BEDROOM_PART_LEFT_MM) * s} y={p}
        width={BEDROOM_PART_LEFT_MM * s} height={(CEILING_H_MM - DOOR_H_MM) * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (BATH_TOTAL_LEN_MM - BEDROOM_PART_LEFT_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM)/2 * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {BEDROOM_PART_LEFT_MM}×{CEILING_H_MM - DOOR_H_MM}</text>
      <SpecLabel x={p + (BATH_TOTAL_LEN_MM - BEDROOM_PART_LEFT_MM/2) * s + 60} y={p + (CEILING_H_MM - DOOR_H_MM)/2 * s} num={5} color={C_GKL_PANEL}/>

      {/* ГКЛ правее проёма */}
      <rect x={p + doorEndMirror * s} y={p + OVER_DOOR_H_MM * s}
        width={(BATH_TOTAL_LEN_MM - doorEndMirror) * s} height={(CEILING_H_MM - OVER_DOOR_H_MM) * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (doorEndMirror + (BATH_TOTAL_LEN_MM - doorEndMirror)/2) * s} y={p + (OVER_DOOR_H_MM + (CEILING_H_MM - OVER_DOOR_H_MM)/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {BATH_TOTAL_LEN_MM - doorEndMirror}×{CEILING_H_MM - OVER_DOOR_H_MM}</text>

      {/* ГКЛ основной лист */}
      <rect x={p} y={p + DOBOR_H_MM * s}
        width={(BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM) * s} height={GKL_SHEET_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM)/2 * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {(BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM).toFixed(0)}×{GKL_SHEET_H_MM}</text>
      <SpecLabel x={p + (BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM)/2 * s} y={p + (DOBOR_H_MM + 30)} num={1} color={C_GKL_PANEL}/>

      {/* ГКЛ доборка сверху */}
      <rect x={p} y={p}
        width={(BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM) * s} height={DOBOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM)/2 * s} y={p + DOBOR_H_MM/2 * s + 3}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {(BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM).toFixed(0)}×{DOBOR_H_MM}</text>

      {/* Примыкание перегородки спальни */}
      <line x1={p + (BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM) * s} y1={p} x2={p + (BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM) * s} y2={p + CEILING_H_MM * s}
        stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
      <line x1={p + (BATH_TOTAL_LEN_MM - BEDROOM_PART_LEFT_MM) * s} y1={p} x2={p + (BATH_TOTAL_LEN_MM - BEDROOM_PART_LEFT_MM) * s} y2={p + CEILING_H_MM * s}
        stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
      <text x={p + (BATH_TOTAL_LEN_MM - BEDROOM_PART_LEFT_MM - BEDROOM_PART_T_MM/2) * s} y={p + CEILING_H_MM * s - 10}
        textAnchor="middle" fill={C_BEDROOM_PART} fontSize={8}>перегородка спальни</text>

      {/* Размерные линии — колонны */}
      <HDim x1={p} x2={p + COL_W_MM * s} y={p - 20}
        color={C_COLUMN} textColor={C_COLUMN} label={COL_W_MM} fontSize={8}/>
      <HDim x1={p + partEnd * s} x2={p + BATH_TOTAL_LEN_MM * s} y={p - 20}
        color={C_COLUMN} textColor={C_COLUMN} label={COL_W_MM} fontSize={8}/>

      {/* Размерная линия перегородки */}
      <HDim x1={p + partStart * s} x2={p + partEnd * s} y={p - 20}
        label={BATH_HORIZ_LEN_MM} fontSize={10}/>

      {/* Размерные линии — период между стойками */}
      {studsMirror.filter(pos => pos < doorStartMirror).slice(0, -1).map((pos, i) => {
        const studsBeforeDoor = studsMirror.filter(p => p < doorStartMirror);
        const nextPos = studsBeforeDoor[i + 1];
        if (nextPos) {
          const period = nextPos - pos;
          return (
            <HDim key={`period-back${i}`}
              x1={p + pos * s} x2={p + nextPos * s} y={p + CEILING_H_MM * s + 20}
              label={period} fontSize={8}/>
          );
        }
        return null;
      })}
      {/* Проём */}
      <HDim x1={p + doorStartMirror * s} x2={p + doorEndMirror * s} y={p + CEILING_H_MM * s + 40}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_W_MM} fontSize={9}/>
      {/* Стойка у колонны 2 */}
      <HDim x1={p + doorEndMirror * s} x2={p + partEnd * s} y={p + CEILING_H_MM * s + 40}
        color={C_FRAME} textColor={C_FRAME} label={PS_W_MM} fontSize={8}/>

      {/* Общая длина с колоннами */}
      <HDim x1={p} x2={p + BATH_TOTAL_LEN_MM * s} y={p + CEILING_H_MM * s + 60}
        label={BATH_TOTAL_LEN_MM} fontSize={10}/>

      {/* Высота */}
      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>
      <VDim x={p + (doorStartMirror + 15) * s} y1={p + (CEILING_H_MM - DOOR_H_MM) * s} y2={p + CEILING_H_MM * s}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_H_MM} fontSize={9} labelX={p + (doorStartMirror + 20) * s}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 15} y1={p + DOBOR_H_MM * s} y2={p + CEILING_H_MM * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_SHEET_H_MM} fontSize={8} labelX={p + BATH_TOTAL_LEN_MM * s + 20}/>

    </svg>
  );
}
