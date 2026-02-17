import { HDim, VDim, StudLabel, SpecLabel } from "../svg-primitives";
import {
  CEILING_H_MM, DOOR_W_MM, DOOR_OFFSET_MM, DOOR_H_MM, GKL_SHEET_H_MM, GKL_SHEET_W_MM,
  DOBOR_H_MM, OVER_DOOR_H_MM, PN_H_MM, PS_W_MM, BEAM_W_MM, BEAM_H_MM, BEAM_LEVEL_MM,
  BEDROOM_VERT_FULL_LEN_MM, S_FRONT_LDSP,
  GKL_DOOR_END_MM, GKL_DOOR_STUD_LEFT_MID_MM, GKL_NARROW_SHEET_W_MM,
  STUD_POSITIONS_GKL_BEDROOM, getStudNumberGklBedroom
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_WARDROBE,
  C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL, C_DOOR_OPENING
} from "../colors";

export function BackView() {
  const FRONT_W = 1000;
  const FRONT_H = 900;
  const p = 70;
  const s = S_FRONT_LDSP;

  // Зеркальные координаты (0 = ванная)
  const doorStartMirror = DOOR_OFFSET_MM;
  const doorEndMirror = DOOR_OFFSET_MM + DOOR_W_MM;

  return (
    <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
      style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л4.Сх2 — Внутренний слой, со стороны спальни (швы вразбежку)
      </text>

      <HDim x1={p} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y={p - 20} label={BEDROOM_VERT_FULL_LEN_MM} fontSize={10}/>

      <rect x={p} y={p} width={BEDROOM_VERT_FULL_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* ПН на полу */}
      <rect x={p} y={p + CEILING_H_MM * s - PN_H_MM * s} width={doorStartMirror * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + doorStartMirror/2 * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={7} color={C_FRAME}/>
      <rect x={p + doorEndMirror * s} y={p + CEILING_H_MM * s - PN_H_MM * s} width={(BEDROOM_VERT_FULL_LEN_MM - doorEndMirror) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (doorEndMirror + (BEDROOM_VERT_FULL_LEN_MM - doorEndMirror)/2) * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={7} color={C_FRAME}/>

      {/* ПН на потолке */}
      <rect x={p} y={p} width={BEDROOM_VERT_FULL_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + 30} y={p + PN_H_MM/2 * s} num={7} color={C_FRAME}/>

      {/* Стойки */}
      {STUD_POSITIONS_GKL_BEDROOM.map((pos, i) => {
        const isEdgeStud = i === 0 || pos === doorEndMirror;
        const studNum = getStudNumberGklBedroom(pos);
        return (
          <g key={`stud${i}`}>
            <rect x={p + pos * s} y={p + PN_H_MM * s}
              width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
              fill={isEdgeStud ? C_BEAM_FILL : C_FRAME_FILL}
              stroke={isEdgeStud ? C_BEAM : C_FRAME}
              strokeWidth={isEdgeStud ? 1.5 : 1}/>
            <StudLabel x={p + (pos + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s} num={studNum} color={C_FRAME}/>
            <SpecLabel x={p + (pos + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 40} num={11} color={C_FRAME}/>
          </g>
        );
      })}

      {/* Дверной проём */}
      <rect x={p + doorStartMirror * s} y={p + (CEILING_H_MM - DOOR_H_MM) * s}
        width={DOOR_W_MM * s} height={DOOR_H_MM * s}
        fill={C_DOOR_OPENING + "11"} stroke={C_DOOR_OPENING} strokeWidth={2} strokeDasharray="6 3"/>
      <text x={p + (doorStartMirror + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={12} fontWeight="bold">ПРОЁМ</text>

      {/* Брус над дверью */}
      <rect x={p + DOOR_OFFSET_MM * s} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM) * s}
        width={GKL_DOOR_END_MM * s} height={BEAM_H_MM * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
      <text x={p + (DOOR_OFFSET_MM + GKL_DOOR_END_MM/2) * s} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM/2) * s + 3}
        textAnchor="middle" fill={C_BEAM} fontSize={8}>брус {GKL_DOOR_END_MM}×{BEAM_H_MM}×{BEAM_W_MM}</text>
      <SpecLabel x={p + (DOOR_OFFSET_MM + GKL_DOOR_END_MM/2) * s + 100} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM/2) * s} num={6} color={C_BEAM}/>

      {/* ПН над дверью */}
      <rect x={p} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM) * s}
        width={(BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM)/2 * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM/2) * s} num={9} color={C_FRAME}/>

      {/* ПН на стыке ГКЛ */}
      <rect x={p + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM) * s} y={p + (CEILING_H_MM - GKL_SHEET_H_MM - PN_H_MM / 2) * s}
        width={GKL_DOOR_STUD_LEFT_MID_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM/2) * s} y={p + (CEILING_H_MM - GKL_SHEET_H_MM) * s} num={10} color={C_FRAME}/>

      {/* ГКЛ полный (с вырезом) */}
      <polygon
        points={`
          ${p + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM) * s},${p + DOBOR_H_MM * s}
          ${p + (doorEndMirror + GKL_SHEET_W_MM) * s},${p + DOBOR_H_MM * s}
          ${p + (doorEndMirror + GKL_SHEET_W_MM) * s},${p + CEILING_H_MM * s}
          ${p + doorEndMirror * s},${p + CEILING_H_MM * s}
          ${p + doorEndMirror * s},${p + OVER_DOOR_H_MM * s}
          ${p + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM) * s},${p + OVER_DOOR_H_MM * s}
        `}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (doorEndMirror + GKL_SHEET_W_MM/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s + 50}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {GKL_SHEET_W_MM}×{GKL_SHEET_H_MM}</text>
      <text x={p + (doorEndMirror + GKL_SHEET_W_MM/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s + 62}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>(с вырезом)</text>
      <SpecLabel x={p + (doorEndMirror + GKL_SHEET_W_MM/2) * s} y={p + (DOBOR_H_MM + 30)} num={1} color={C_GKL_PANEL}/>

      {/* ГКЛ обрезной */}
      <rect x={p + (doorEndMirror + GKL_SHEET_W_MM) * s} y={p + DOBOR_H_MM * s}
        width={GKL_NARROW_SHEET_W_MM * s} height={GKL_SHEET_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (doorEndMirror + GKL_SHEET_W_MM + GKL_NARROW_SHEET_W_MM/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {GKL_NARROW_SHEET_W_MM}×{GKL_SHEET_H_MM}</text>
      <SpecLabel x={p + (doorEndMirror + GKL_SHEET_W_MM + GKL_NARROW_SHEET_W_MM/2) * s} y={p + (DOBOR_H_MM + 30)} num={2} color={C_GKL_PANEL}/>

      {/* ГКЛ над дверью */}
      <rect x={p} y={p}
        width={(BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM) * s} height={OVER_DOOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM)/2 * s} y={p + OVER_DOOR_H_MM/2 * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM}×{OVER_DOOR_H_MM}</text>
      <SpecLabel x={p + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM)/2 * s + 60} y={p + OVER_DOOR_H_MM/2 * s} num={3} color={C_GKL_PANEL}/>

      {/* ГКЛ сверху */}
      <rect x={p + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM) * s} y={p}
        width={GKL_DOOR_STUD_LEFT_MID_MM * s} height={DOBOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM/2) * s} y={p + DOBOR_H_MM/2 * s + 3}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {GKL_DOOR_STUD_LEFT_MID_MM}×{DOBOR_H_MM}</text>
      <SpecLabel x={p + (BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM/2) * s - 60} y={p + DOBOR_H_MM/2 * s} num={4} color={C_GKL_PANEL}/>

      {/* ГКЛ у ванной */}
      <rect x={p} y={p + (CEILING_H_MM - DOOR_H_MM) * s}
        width={doorStartMirror * s} height={DOOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <SpecLabel x={p + doorStartMirror/2 * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s + 40} num={5} color={C_GKL_PANEL}/>

      {/* Размерные линии */}
      <HDim x1={p} x2={p + doorStartMirror * s} y={p + CEILING_H_MM * s + 20}
        label={DOOR_OFFSET_MM} fontSize={8}/>
      <HDim x1={p + doorStartMirror * s} x2={p + doorEndMirror * s} y={p + CEILING_H_MM * s + 20}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_W_MM} fontSize={9}/>

      <HDim x1={p} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y={p + CEILING_H_MM * s + 60}
        label={BEDROOM_VERT_FULL_LEN_MM} fontSize={10}/>

      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>

      {/* Подписи направлений */}
      <text x={p - 25} y={p + CEILING_H_MM/3 * s} textAnchor="end" fill={C_TEXT_DIM} fontSize={8}>
        ← Ванная
      </text>
      <text x={p + BEDROOM_VERT_FULL_LEN_MM * s + 30} y={p + CEILING_H_MM/3 * s} textAnchor="start" fill={C_WARDROBE} fontSize={8}>
        Внешняя стена →
      </text>

    </svg>
  );
}
