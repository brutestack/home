import { HDim, VDim, StudLabel, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  CEILING_H_MM, DOOR_W_MM, DOOR_OFFSET_MM, DOOR_H_MM, GKL_SHEET_H_MM, GKL_SHEET_W_MM, GKL_THICKNESS_MM,
  DOBOR_H_MM, OVER_DOOR_H_MM, PN_H_MM, PS_W_MM, BEAM_W_MM, BEAM_H_MM, BEAM_LEVEL_MM,
  BEDROOM_VERT_FULL_LEN_MM, STUD_STEP_MM, S_FRONT_LDSP,
  GKL_DOOR_START_MM, GKL_DOOR_END_MM, GKL_DOOR_STUD_LEFT_MID_MM, GKL_NARROW_SHEET_W_MM,
  STUD_POSITIONS_GKL, getStudNumberGklStairs
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_GKL,
  C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL, C_DOOR_OPENING
} from "../colors";

interface FrontViewProps {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}

export function FrontView({ onMouseMove, mouse }: FrontViewProps) {
  const FRONT_W = 1000;
  const FRONT_H = 900;
  const p = 70;
  const s = S_FRONT_LDSP;

  const area: SchemaArea = {
    padding: p, scale: s, width: BEDROOM_VERT_FULL_LEN_MM, height: CEILING_H_MM, svgWidth: FRONT_W
  };

  return (
    <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л4.Сх1 — Внешний слой, со стороны лестницы (шаг стоек {STUD_STEP_MM} мм)
      </text>

      <HDim x1={p} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y={p - 20} label={BEDROOM_VERT_FULL_LEN_MM} fontSize={10}/>

      <rect x={p} y={p} width={BEDROOM_VERT_FULL_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* ПН на полу (№7) */}
      <rect x={p} y={p + CEILING_H_MM * s - PN_H_MM * s} width={GKL_DOOR_START_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + GKL_DOOR_START_MM/2 * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={7} color={C_FRAME}/>
      <rect x={p + GKL_DOOR_END_MM * s} y={p + CEILING_H_MM * s - PN_H_MM * s} width={(BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_END_MM) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

      {/* ПН на потолке (№7) */}
      <rect x={p} y={p} width={BEDROOM_VERT_FULL_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + BEDROOM_VERT_FULL_LEN_MM * s - 30} y={p + PN_H_MM/2 * s} num={7} color={C_FRAME}/>

      {/* Стойки (№11) */}
      {STUD_POSITIONS_GKL.map((pos, i) => {
        const isEdgeStud = pos === GKL_DOOR_START_MM - PS_W_MM || pos === GKL_DOOR_END_MM;
        const studNum = getStudNumberGklStairs(pos);
        return (
          <g key={`stud${i}`}>
            <rect x={p + pos * s} y={p + PN_H_MM * s}
              width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
              fill={isEdgeStud ? C_BEAM_FILL : C_FRAME_FILL}
              stroke={isEdgeStud ? C_BEAM : C_FRAME}
              strokeWidth={isEdgeStud ? 1.5 : 1}/>
            <text x={p + (pos + PS_W_MM/2) * s} y={p + 60}
              textAnchor="middle" fill={C_TEXT_DIM} fontSize={7}>{pos}</text>
            <StudLabel x={p + (pos + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s} num={studNum} color={C_FRAME}/>
            <SpecLabel x={p + (pos + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 40} num={11} color={C_FRAME}/>
          </g>
        );
      })}

      {/* Брус над дверью (№6) */}
      <rect x={p} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM) * s}
        width={GKL_DOOR_END_MM * s} height={BEAM_H_MM * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
      <text x={p + GKL_DOOR_END_MM/2 * s} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM/2) * s + 3}
        textAnchor="middle" fill={C_BEAM} fontSize={8}>брус {GKL_DOOR_END_MM}×{BEAM_H_MM}×{BEAM_W_MM}</text>
      <SpecLabel x={p + GKL_DOOR_END_MM/2 * s + 100} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM/2) * s} num={6} color={C_BEAM}/>

      {/* ПН над дверью (№9) */}
      <rect x={p + GKL_DOOR_STUD_LEFT_MID_MM * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM) * s}
        width={(BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (GKL_DOOR_STUD_LEFT_MID_MM + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM)/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM/2) * s} num={9} color={C_FRAME}/>

      {/* ПН на стыке ГКЛ (№10) */}
      <rect x={p} y={p + (CEILING_H_MM - GKL_SHEET_H_MM - PN_H_MM / 2) * s}
        width={GKL_DOOR_STUD_LEFT_MID_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + GKL_DOOR_STUD_LEFT_MID_MM/2 * s} y={p + (CEILING_H_MM - GKL_SHEET_H_MM) * s} num={10} color={C_FRAME}/>

      {/* Дверной проём */}
      <rect x={p + GKL_DOOR_START_MM * s} y={p + (CEILING_H_MM - DOOR_H_MM) * s}
        width={DOOR_W_MM * s} height={DOOR_H_MM * s}
        fill={C_DOOR_OPENING + "11"} stroke={C_DOOR_OPENING} strokeWidth={2} strokeDasharray="6 3"/>
      <text x={p + (GKL_DOOR_START_MM + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={12} fontWeight="bold">ПРОЁМ</text>
      <text x={p + (GKL_DOOR_START_MM + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s + 16}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={10}>{DOOR_W_MM}×{DOOR_H_MM}</text>

      {/* ГКЛ полный (№1) */}
      <polygon
        points={`
          ${p + GKL_NARROW_SHEET_W_MM * s},${p + DOBOR_H_MM * s}
          ${p + GKL_DOOR_STUD_LEFT_MID_MM * s},${p + DOBOR_H_MM * s}
          ${p + GKL_DOOR_STUD_LEFT_MID_MM * s},${p + OVER_DOOR_H_MM * s}
          ${p + GKL_DOOR_START_MM * s},${p + OVER_DOOR_H_MM * s}
          ${p + GKL_DOOR_START_MM * s},${p + CEILING_H_MM * s}
          ${p + GKL_NARROW_SHEET_W_MM * s},${p + CEILING_H_MM * s}
        `}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (GKL_NARROW_SHEET_W_MM + GKL_SHEET_W_MM/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s + 50}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {GKL_SHEET_W_MM}×{GKL_SHEET_H_MM}</text>
      <SpecLabel x={p + (GKL_NARROW_SHEET_W_MM + GKL_SHEET_W_MM/2) * s} y={p + (DOBOR_H_MM + 30)} num={1} color={C_GKL_PANEL}/>

      {/* ГКЛ обрезной (№2) */}
      <rect x={p} y={p + DOBOR_H_MM * s}
        width={GKL_NARROW_SHEET_W_MM * s} height={GKL_SHEET_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + GKL_NARROW_SHEET_W_MM/2 * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {GKL_NARROW_SHEET_W_MM}×{GKL_SHEET_H_MM}</text>
      <SpecLabel x={p + GKL_NARROW_SHEET_W_MM/2 * s} y={p + (DOBOR_H_MM + 30)} num={2} color={C_GKL_PANEL}/>

      {/* ГКЛ над дверью (№3) */}
      <rect x={p + GKL_DOOR_STUD_LEFT_MID_MM * s} y={p}
        width={(BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM) * s} height={OVER_DOOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (GKL_DOOR_STUD_LEFT_MID_MM + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM)/2) * s} y={p + OVER_DOOR_H_MM/2 * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM}×{OVER_DOOR_H_MM}</text>
      <SpecLabel x={p + (GKL_DOOR_STUD_LEFT_MID_MM + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM)/2) * s + 60} y={p + OVER_DOOR_H_MM/2 * s} num={3} color={C_GKL_PANEL}/>

      {/* ГКЛ сверху (№4) */}
      <rect x={p} y={p}
        width={GKL_DOOR_STUD_LEFT_MID_MM * s} height={DOBOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + GKL_DOOR_STUD_LEFT_MID_MM/2 * s} y={p + DOBOR_H_MM/2 * s + 3}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {GKL_DOOR_STUD_LEFT_MID_MM}×{DOBOR_H_MM}</text>
      <SpecLabel x={p + GKL_DOOR_STUD_LEFT_MID_MM/2 * s + 60} y={p + DOBOR_H_MM/2 * s} num={4} color={C_GKL_PANEL}/>

      {/* ГКЛ после проёма (№5) */}
      <rect x={p + GKL_DOOR_END_MM * s} y={p + (CEILING_H_MM - DOOR_H_MM) * s}
        width={(BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_END_MM) * s} height={DOOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (GKL_DOOR_END_MM + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_END_MM)/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>{BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_END_MM}×{DOOR_H_MM}</text>
      <SpecLabel x={p + (GKL_DOOR_END_MM + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_END_MM)/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s + 40} num={5} color={C_GKL_PANEL}/>

      {/* Размерные линии */}
      {STUD_POSITIONS_GKL.slice(0, -2).map((pos, i) => {
        const nextPos = STUD_POSITIONS_GKL[i + 1];
        const step = nextPos - pos;
        if (step > 100) {
          return <HDim key={`step${i}`} x1={p + pos * s} x2={p + nextPos * s} y={p + CEILING_H_MM * s + 20} label={step} fontSize={8}/>;
        }
        return null;
      })}

      <HDim x1={p + GKL_DOOR_START_MM * s} x2={p + GKL_DOOR_END_MM * s} y={p + CEILING_H_MM * s + 20}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_W_MM} fontSize={9}/>
      <HDim x1={p + GKL_DOOR_END_MM * s} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y={p + CEILING_H_MM * s + 20}
        label={DOOR_OFFSET_MM} fontSize={9}/>

      <HDim x1={p} x2={p + GKL_DOOR_START_MM * s} y={p + CEILING_H_MM * s + 40}
        color={C_GKL} textColor={C_GKL} label={GKL_DOOR_START_MM} fontSize={9}/>
      <HDim x1={p} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y={p + CEILING_H_MM * s + 60}
        label={BEDROOM_VERT_FULL_LEN_MM} fontSize={10}/>

      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>
      <VDim x={p - 35} y1={p} y2={p + DOBOR_H_MM * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={DOBOR_H_MM} fontSize={8} labelX={p - 45}/>
      <VDim x={p + (GKL_DOOR_START_MM + 30) * s} y1={p + (CEILING_H_MM - DOOR_H_MM) * s} y2={p + CEILING_H_MM * s}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_H_MM} fontSize={9} labelX={p + (GKL_DOOR_START_MM + 35) * s}/>
      <VDim x={p + BEDROOM_VERT_FULL_LEN_MM * s + 15} y1={p + DOBOR_H_MM * s} y2={p + CEILING_H_MM * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_SHEET_H_MM} fontSize={8} labelX={p + BEDROOM_VERT_FULL_LEN_MM * s + 20}/>

      {/* Курсор */}
      <Crosshair mouse={mouse} area={area} />

    </svg>
  );
}
