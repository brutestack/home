import { HDim, VDim, StudLabel, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  CEILING_H_MM, GKL_SHEET_H_MM, DOBOR_H_MM,
  DOOR_W_MM, DOOR_H_MM, OVER_DOOR_H_MM,
  BEAM_LEVEL_MM, BEAM_H_MM,
  BATH_TOTAL_LEN_MM,
  PN_H_MM, PS_W_MM, BATH5_STUD_STEP_MM,
  BATH_DOOR_START_MM, BATH_DOOR_END_MM,
  BEDROOM_PART_LEFT_MM, BEDROOM_PART_T_MM, BEDROOM_PART_RIGHT_MM,
  STUD_POSITIONS_CORRIDOR, getStudNumberCorridor,
  S_FRONT, FRONT_W, FRONT_H
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT,
  C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL,
  C_DOOR_OPENING, C_BEDROOM_PART
} from "../colors";

interface BackViewProps {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}

export function BackView({ onMouseMove, mouse }: BackViewProps) {
  const p = 70;
  const s = S_FRONT;

  const area: SchemaArea = {
    padding: p, scale: s, width: BATH_TOTAL_LEN_MM, height: CEILING_H_MM, svgWidth: FRONT_W
  };

  // Зеркальные координаты (вид со стороны коридора)
  const doorStartMirror = BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM;   // 2440 - 950 = 1490
  const doorEndMirror = BATH_TOTAL_LEN_MM - BATH_DOOR_START_MM;   // 2440 - 50  = 2390

  // Зеркальные позиции стоек
  const studsMirror = STUD_POSITIONS_CORRIDOR.map(pos => BATH_TOTAL_LEN_MM - pos - PS_W_MM).reverse();

  // Зеркальные позиции перегородки спальни
  const bedroomPartRightMirror = BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM; // 2440 - 1325 = 1115
  const bedroomPartLeftMirror = BATH_TOTAL_LEN_MM - BEDROOM_PART_LEFT_MM;   // 2440 - 1150 = 1290

  return (
    <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л5.Сх3 — Вид со стороны коридора (зеркальный, шаг стоек {BATH5_STUD_STEP_MM} мм)
      </text>

      {/* Контур помещения */}
      <rect x={p} y={p} width={BATH_TOTAL_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BATH_TOTAL_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BATH_TOTAL_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Направляющие ПН на полу (до проёма) */}
      <rect x={p} y={p + CEILING_H_MM * s - PN_H_MM * s} width={doorStartMirror * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + doorStartMirror / 2 * s} y={p + CEILING_H_MM * s - PN_H_MM / 2 * s} num={6} color={C_FRAME}/>

      {/* Направляющие ПН на полу (краевая стойка после проёма) */}
      <rect x={p + doorEndMirror * s} y={p + CEILING_H_MM * s - PN_H_MM * s} width={PS_W_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (doorEndMirror + PS_W_MM / 2) * s} y={p + CEILING_H_MM * s - PN_H_MM / 2 * s} num={7} color={C_FRAME}/>

      {/* Направляющие ПН на потолке */}
      <rect x={p} y={p} width={BATH_TOTAL_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + 30} y={p + PN_H_MM / 2 * s} num={8} color={C_FRAME}/>

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
            <StudLabel x={p + (pos + PS_W_MM / 2) * s} y={p + CEILING_H_MM / 2 * s} num={getStudNumberCorridor(originalPos)} color={C_FRAME}/>
            <SpecLabel x={p + (pos + PS_W_MM / 2) * s} y={p + CEILING_H_MM / 2 * s + 40} num={12} color={C_FRAME}/>
          </g>
        );
      })}

      {/* Деревянный брус на всю длину перегородки */}
      <rect x={p} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM) * s}
        width={BATH_TOTAL_LEN_MM * s} height={BEAM_H_MM * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
      <SpecLabel x={p + BATH_TOTAL_LEN_MM / 2 * s - 100} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM / 2) * s} num={5} color={C_BEAM}/>

      {/* Перемычка ПН над дверью */}
      <rect x={p + doorStartMirror * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM) * s}
        width={DOOR_W_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (doorStartMirror + DOOR_W_MM / 2) * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM / 2) * s} num={10} color={C_FRAME}/>

      {/* Горизонтальная направляющая на стыке ГКЛ/доборки */}
      {studsMirror.filter(pos => pos < doorStartMirror).slice(0, -1).map((pos, i) => {
        const studsBeforeDoor = studsMirror.filter(p => p < doorStartMirror);
        const nextPos = studsBeforeDoor[i + 1];
        if (!nextPos) return null;
        const braceX = pos + PS_W_MM;
        const braceW = nextPos - braceX;
        if (braceW <= 0) return null;
        const braceY = DOBOR_H_MM - PN_H_MM / 2;
        return (
          <g key={`brace${i}`}>
            <rect x={p + braceX * s} y={p + braceY * s}
              width={braceW * s} height={PN_H_MM * s}
              fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
            {i === 0 && <SpecLabel x={p + (braceX + braceW / 2) * s} y={p + DOBOR_H_MM * s} num={11} color={C_FRAME}/>}
          </g>
        );
      })}

      {/* Дверной проём */}
      <rect x={p + doorStartMirror * s} y={p + (CEILING_H_MM - DOOR_H_MM) * s}
        width={DOOR_W_MM * s} height={DOOR_H_MM * s}
        fill={C_DOOR_OPENING + "11"} stroke={C_DOOR_OPENING} strokeWidth={2} strokeDasharray="6 3"/>
      <text x={p + (doorStartMirror + DOOR_W_MM / 2) * s} y={p + (CEILING_H_MM - DOOR_H_MM / 2) * s}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={12} fontWeight="bold">ПРОЁМ</text>

      {/* ГКЛ основной лист (от левого края до перегородки спальни) */}
      <rect x={p} y={p + DOBOR_H_MM * s}
        width={bedroomPartRightMirror * s} height={GKL_SHEET_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + bedroomPartRightMirror / 2 * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM / 2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {bedroomPartRightMirror}×{GKL_SHEET_H_MM}</text>
      <SpecLabel x={p + bedroomPartRightMirror / 2 * s} y={p + (DOBOR_H_MM + 30)} num={1} color={C_GKL_PANEL}/>

      {/* ГКЛ доборка сверху */}
      <rect x={p} y={p}
        width={bedroomPartRightMirror * s} height={DOBOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + bedroomPartRightMirror / 2 * s} y={p + DOBOR_H_MM / 2 * s + 3}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {bedroomPartRightMirror}×{DOBOR_H_MM}</text>

      {/* ГКЛ над дверью */}
      <rect x={p + bedroomPartLeftMirror * s} y={p}
        width={(BATH_TOTAL_LEN_MM - bedroomPartLeftMirror) * s} height={OVER_DOOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (bedroomPartLeftMirror + (BATH_TOTAL_LEN_MM - bedroomPartLeftMirror) / 2) * s} y={p + OVER_DOOR_H_MM / 2 * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {BATH_TOTAL_LEN_MM - bedroomPartLeftMirror}×{OVER_DOOR_H_MM}</text>
      <SpecLabel x={p + (bedroomPartLeftMirror + (BATH_TOTAL_LEN_MM - bedroomPartLeftMirror) / 2) * s + 60} y={p + OVER_DOOR_H_MM / 2 * s} num={4} color={C_GKL_PANEL}/>

      {/* ГКЛ правее проёма (от doorEndMirror до правого края) */}
      <rect x={p + doorEndMirror * s} y={p + OVER_DOOR_H_MM * s}
        width={(BATH_TOTAL_LEN_MM - doorEndMirror) * s} height={(CEILING_H_MM - OVER_DOOR_H_MM) * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (doorEndMirror + (BATH_TOTAL_LEN_MM - doorEndMirror) / 2) * s} y={p + (OVER_DOOR_H_MM + (CEILING_H_MM - OVER_DOOR_H_MM) / 2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={6}>{BATH_TOTAL_LEN_MM - doorEndMirror}</text>

      {/* Примыкание перегородки спальни */}
      <line x1={p + bedroomPartRightMirror * s} y1={p} x2={p + bedroomPartRightMirror * s} y2={p + CEILING_H_MM * s}
        stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
      <line x1={p + bedroomPartLeftMirror * s} y1={p} x2={p + bedroomPartLeftMirror * s} y2={p + CEILING_H_MM * s}
        stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
      <text x={p + (bedroomPartRightMirror + BEDROOM_PART_T_MM / 2) * s} y={p + CEILING_H_MM * s - 10}
        textAnchor="middle" fill={C_BEDROOM_PART} fontSize={8}>перегородка спальни</text>

      {/* Размерная линия перегородки */}
      <HDim x1={p} x2={p + BATH_TOTAL_LEN_MM * s} y={p - 20}
        label={BATH_TOTAL_LEN_MM} fontSize={10}/>

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

      {/* Краевая стойка справа */}
      <HDim x1={p + doorEndMirror * s} x2={p + BATH_TOTAL_LEN_MM * s} y={p + CEILING_H_MM * s + 40}
        color={C_FRAME} textColor={C_FRAME} label={PS_W_MM} fontSize={8}/>

      {/* Высота */}
      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>
      <VDim x={p + (doorStartMirror + 15) * s} y1={p + (CEILING_H_MM - DOOR_H_MM) * s} y2={p + CEILING_H_MM * s}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_H_MM} fontSize={9} labelX={p + (doorStartMirror + 20) * s}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 15} y1={p + DOBOR_H_MM * s} y2={p + CEILING_H_MM * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_SHEET_H_MM} fontSize={8} labelX={p + BATH_TOTAL_LEN_MM * s + 20}/>

      {/* Курсор */}
      <Crosshair mouse={mouse} area={area} />

    </svg>
  );
}
