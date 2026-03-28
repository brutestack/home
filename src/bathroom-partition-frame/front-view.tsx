import { HDim, VDim, StudLabel, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  CEILING_H_MM, GKL_SHEET_H_MM, GKL_SHEET_W_MM, DOBOR_H_MM,
  DOOR_W_MM, DOOR_H_MM, OVER_DOOR_H_MM,
  BEAM_W_MM, BEAM_H_MM, BEAM_LEVEL_MM,
  BATH_TOTAL_LEN_MM,
  PN_H_MM, PS_W_MM, BATH5_STUD_STEP_MM,
  BATH_DOOR_START_MM, BATH_DOOR_END_MM,
  BEDROOM_PART_LEFT_MM, BEDROOM_PART_T_MM, BEDROOM_PART_RIGHT_MM,
  STUD_POSITIONS_BATH, getStudNumberBath,
  S_FRONT, FRONT_W, FRONT_H
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT,
  C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL,
  C_DOOR_OPENING, C_BEDROOM_PART
} from "../colors";

interface FrontViewProps {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}

export function FrontView({ onMouseMove, mouse }: FrontViewProps) {
  const p = 70;
  const s = S_FRONT;

  const area: SchemaArea = {
    padding: p, scale: s, width: BATH_TOTAL_LEN_MM, height: CEILING_H_MM, svgWidth: FRONT_W
  };

  // Стык между зоной двери и стеной (центр стойки у проёма)
  const doorStudCenter = BATH_DOOR_END_MM + PS_W_MM / 2; // 975
  // Стык основных листов на стойке [3] = 1775 (центр)
  const gklJoint = STUD_POSITIONS_BATH[3] + PS_W_MM / 2; // 1775
  // Доборка сверху — один кусок (975→2440 = 1465 мм < 2500 мм листа)
  const doborW = BATH_TOTAL_LEN_MM - doorStudCenter; // 1465

  return (
    <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л5.Сх1 — Вид со стороны ванной (шаг стоек {BATH5_STUD_STEP_MM} мм)
      </text>

      {/* Контур помещения */}
      <rect x={p} y={p} width={BATH_TOTAL_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BATH_TOTAL_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BATH_TOTAL_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Направляющие ПН на полу (краевая стойка) */}
      <rect x={p} y={p + CEILING_H_MM * s - PN_H_MM * s} width={PS_W_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + PS_W_MM/2 * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={7} color={C_FRAME}/>

      {/* Направляющие ПН на полу (после проёма) */}
      <rect x={p + BATH_DOOR_END_MM * s} y={p + CEILING_H_MM * s - PN_H_MM * s}
        width={(BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (BATH_DOOR_END_MM + (BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM)/2) * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={6} color={C_FRAME}/>

      {/* Направляющие ПН на потолке */}
      <rect x={p} y={p} width={BATH_TOTAL_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + BATH_TOTAL_LEN_MM * s - 30} y={p + PN_H_MM/2 * s} num={8} color={C_FRAME}/>

      {/* Стоечные профили ПС */}
      {STUD_POSITIONS_BATH.map((pos, i) => (
        <g key={`stud${i}`}>
          <rect x={p + pos * s} y={p + PN_H_MM * s}
            width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
            fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
          <StudLabel x={p + (pos + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s} num={getStudNumberBath(pos)} color={C_FRAME}/>
          <SpecLabel x={p + (pos + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 40} num={12} color={C_FRAME}/>
        </g>
      ))}

      {/* Деревянный брус на всю длину перегородки */}
      <rect x={p} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM) * s}
        width={BATH_TOTAL_LEN_MM * s} height={BEAM_H_MM * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
      <text x={p + BATH_TOTAL_LEN_MM/2 * s} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM/2) * s + 3}
        textAnchor="middle" fill={C_BEAM} fontSize={7}>брус {BATH_TOTAL_LEN_MM}×{BEAM_H_MM}×{BEAM_W_MM}</text>
      <SpecLabel x={p + BATH_TOTAL_LEN_MM/2 * s + 100} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM/2) * s} num={5} color={C_BEAM}/>

      {/* Перемычка ПН над дверью */}
      <rect x={p + BATH_DOOR_START_MM * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM) * s}
        width={DOOR_W_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (BATH_DOOR_START_MM + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM/2) * s} num={10} color={C_FRAME}/>

      {/* Горизонтальная направляющая ПН на стыке ГКЛ/доборки */}
      {STUD_POSITIONS_BATH.slice(1, -1).map((pos, i) => {
        const nextPos = STUD_POSITIONS_BATH[i + 2];
        if (!nextPos) return null;
        const braceX = pos + PS_W_MM;
        const braceW = nextPos - braceX;
        const braceY = DOBOR_H_MM - PN_H_MM / 2;
        return (
          <g key={`brace${i}`}>
            <rect x={p + braceX * s} y={p + braceY * s}
              width={braceW * s} height={PN_H_MM * s}
              fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
            {i === 0 && <SpecLabel x={p + (braceX + braceW/2) * s} y={p + DOBOR_H_MM * s} num={11} color={C_FRAME}/>}
          </g>
        );
      })}

      {/* Дверной проём */}
      <rect x={p + BATH_DOOR_START_MM * s} y={p + (CEILING_H_MM - DOOR_H_MM) * s}
        width={DOOR_W_MM * s} height={DOOR_H_MM * s}
        fill={C_DOOR_OPENING + "11"} stroke={C_DOOR_OPENING} strokeWidth={2} strokeDasharray="6 3"/>
      <text x={p + (BATH_DOOR_START_MM + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={12} fontWeight="bold">ПРОЁМ</text>
      <text x={p + (BATH_DOOR_START_MM + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s + 16}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={10}>{DOOR_W_MM}×{DOOR_H_MM}</text>

      {/* ГКЛ Г-образная деталь у двери (над дверью + полоска у края = одна деталь) */}
      <polygon
        points={[
          `${p},${p}`,
          `${p + doorStudCenter * s},${p}`,
          `${p + doorStudCenter * s},${p + OVER_DOOR_H_MM * s}`,
          `${p + BATH_DOOR_END_MM * s},${p + OVER_DOOR_H_MM * s}`,
          `${p + BATH_DOOR_END_MM * s},${p + CEILING_H_MM * s}`,
          `${p},${p + CEILING_H_MM * s}`,
        ].join(' ')}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + doorStudCenter/2 * s} y={p + OVER_DOOR_H_MM/2 * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {doorStudCenter}×{OVER_DOOR_H_MM}</text>
      <text x={p + 8} y={p + (OVER_DOOR_H_MM + 200) * s}
        fill={C_GKL_PANEL} fontSize={6}>вырез</text>
      <SpecLabel x={p + doorStudCenter/2 * s + 60} y={p + OVER_DOOR_H_MM/2 * s} num={4} color={C_GKL_PANEL}/>

      {/* ГКЛ основной лист (от стойки проёма до стойки 1775) */}
      <polygon
        points={[
          `${p + doorStudCenter * s},${p + DOBOR_H_MM * s}`,
          `${p + gklJoint * s},${p + DOBOR_H_MM * s}`,
          `${p + gklJoint * s},${p + (DOBOR_H_MM + GKL_SHEET_H_MM) * s}`,
          `${p + BATH_DOOR_END_MM * s},${p + (DOBOR_H_MM + GKL_SHEET_H_MM) * s}`,
          `${p + BATH_DOOR_END_MM * s},${p + OVER_DOOR_H_MM * s}`,
          `${p + doorStudCenter * s},${p + OVER_DOOR_H_MM * s}`,
        ].join(' ')}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (doorStudCenter + (gklJoint - doorStudCenter)/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {gklJoint - doorStudCenter}×{GKL_SHEET_H_MM}</text>
      <SpecLabel x={p + (doorStudCenter + (gklJoint - doorStudCenter)/2) * s} y={p + (DOBOR_H_MM + 30)} num={1} color={C_GKL_PANEL}/>

      {/* ГКЛ правая часть (от 1775 до 2440) */}
      <rect x={p + gklJoint * s} y={p + DOBOR_H_MM * s}
        width={(BATH_TOTAL_LEN_MM - gklJoint) * s} height={GKL_SHEET_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (gklJoint + (BATH_TOTAL_LEN_MM - gklJoint)/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {BATH_TOTAL_LEN_MM - gklJoint}×{GKL_SHEET_H_MM}</text>
      <SpecLabel x={p + (gklJoint + (BATH_TOTAL_LEN_MM - gklJoint)/2) * s} y={p + (DOBOR_H_MM + 30)} num={2} color={C_GKL_PANEL}/>

      {/* ГКЛ доборка сверху — один кусок (975→2440) */}
      <rect x={p + doorStudCenter * s} y={p}
        width={doborW * s} height={DOBOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (doorStudCenter + doborW/2) * s} y={p + DOBOR_H_MM/2 * s + 3}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>{doborW}×{DOBOR_H_MM}</text>
      <SpecLabel x={p + (doorStudCenter + doborW/2) * s} y={p + DOBOR_H_MM/2 * s - 12} num={3} color={C_GKL_PANEL}/>

      {/* Примыкание перегородки спальни */}
      <line x1={p + BEDROOM_PART_LEFT_MM * s} y1={p} x2={p + BEDROOM_PART_LEFT_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
      <line x1={p + BEDROOM_PART_RIGHT_MM * s} y1={p} x2={p + BEDROOM_PART_RIGHT_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
      <text x={p + (BEDROOM_PART_LEFT_MM + BEDROOM_PART_T_MM/2) * s} y={p + CEILING_H_MM * s - 10}
        textAnchor="middle" fill={C_BEDROOM_PART} fontSize={8}>перегородка спальни</text>

      {/* Размерная линия перегородки */}
      <HDim x1={p} x2={p + BATH_TOTAL_LEN_MM * s} y={p - 20}
        label={BATH_TOTAL_LEN_MM} fontSize={10}/>

      {/* Проём */}
      <HDim x1={p + BATH_DOOR_START_MM * s} x2={p + BATH_DOOR_END_MM * s} y={p + CEILING_H_MM * s + 20}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_W_MM} fontSize={9}/>

      {/* Шаг стоек */}
      {STUD_POSITIONS_BATH.slice(1, -1).map((pos, i) => {
        const nextPos = STUD_POSITIONS_BATH[i + 2];
        if (!nextPos) return null;
        const step = nextPos - pos;
        if (step >= 300 && step <= 500) {
          return <HDim key={`step${i}`} x1={p + pos * s} x2={p + nextPos * s} y={p + CEILING_H_MM * s + 40} label={step} fontSize={8}/>;
        }
        return null;
      })}

      {/* Высоты */}
      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>
      <VDim x={p + (BATH_DOOR_START_MM + 15) * s} y1={p + (CEILING_H_MM - DOOR_H_MM) * s} y2={p + CEILING_H_MM * s}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_H_MM} fontSize={9} labelX={p + (BATH_DOOR_START_MM + 20) * s}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 15} y1={p + DOBOR_H_MM * s} y2={p + CEILING_H_MM * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_SHEET_H_MM} fontSize={8} labelX={p + BATH_TOTAL_LEN_MM * s + 20}/>

      {/* Курсор */}
      <Crosshair mouse={mouse} area={area} />

    </svg>
  );
}
