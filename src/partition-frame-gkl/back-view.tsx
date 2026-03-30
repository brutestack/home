import { HDim, VDim, StudLabel, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  CEILING_H_MM, DOOR_W_MM, DOOR_OFFSET_MM, DOOR_H_MM, GKL_SHEET_H_MM, GKL_SHEET_W_MM,
  DOBOR_H_MM, OVER_DOOR_H_MM, PN_H_MM, PS_W_MM, BEAM_W_MM, BEAM_H_MM, BEAM_LEVEL_MM,
  BEDROOM_VERT_FULL_LEN_MM, GKL4_STUD_STEP_MM, S_FRONT_BEDROOM,
  GKL_DOOR_END_MM, GKL_DOOR_STUD_LEFT_MID_MM, GKL_SHEET_JOINT_MM, GKL_NARROW_SHEET_W_MM,
  STUD_POSITIONS_GKL_BEDROOM, getStudNumberGklBedroom
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_WARDROBE,
  C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL, C_DOOR_OPENING
} from "../colors";

interface BackViewProps {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}

export function BackView({ onMouseMove, mouse }: BackViewProps) {
  const FRONT_W = 1000;
  const FRONT_H = 900;
  const p = 70;
  const s = S_FRONT_BEDROOM;

  const area: SchemaArea = {
    padding: p, scale: s, width: BEDROOM_VERT_FULL_LEN_MM, height: CEILING_H_MM, svgWidth: FRONT_W
  };

  // Зеркальные координаты (0 = ванная)
  const doorStartMirror = DOOR_OFFSET_MM;
  const doorEndMirror = DOOR_OFFSET_MM + DOOR_W_MM;

  // Зеркальные стыки ГКЛ (основной стык 1200 → 2770-1200=1570, доборка 800 → 2770-800=1970)
  const mainJointMirror = BEDROOM_VERT_FULL_LEN_MM - GKL_SHEET_JOINT_MM;    // 1570
  const doborJointMirror = BEDROOM_VERT_FULL_LEN_MM - 800;                   // 1970

  // Ширина ГКЛ по стыку от двери: doorEnd(950) → mainJoint(1570) = 620 (narrow), 1570→2770 = 1200 (full)
  const narrowSheetStart = doorEndMirror;                                     // 950
  const narrowSheetEnd = mainJointMirror;                                     // 1570
  const narrowSheetW = narrowSheetEnd - narrowSheetStart;                     // 620
  const fullSheetStart = mainJointMirror;                                     // 1570
  const fullSheetW = BEDROOM_VERT_FULL_LEN_MM - fullSheetStart;              // 1200

  // Зеркальный центр стойки у двери: 2770 - 1795 = 975
  const doorStudMidMirror = BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM; // 975

  return (
    <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л4.Сх2 — Внутренний слой, со стороны спальни (шаг стоек {GKL4_STUD_STEP_MM} мм, швы вразбежку)
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
        width={doorStudMidMirror * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + doorStudMidMirror/2 * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM/2) * s} num={9} color={C_FRAME}/>

      {/* ПН на стыке ГКЛ */}
      <rect x={p + doorStudMidMirror * s} y={p + (CEILING_H_MM - GKL_SHEET_H_MM - PN_H_MM / 2) * s}
        width={(BEDROOM_VERT_FULL_LEN_MM - doorStudMidMirror) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (doorStudMidMirror + (BEDROOM_VERT_FULL_LEN_MM - doorStudMidMirror)/2) * s} y={p + (CEILING_H_MM - GKL_SHEET_H_MM) * s} num={10} color={C_FRAME}/>

      {/* ГКЛ обрезной (№2): 950→1570 мм (620 мм) × 2500 мм (с вырезом для проёма) */}
      <polygon
        points={`
          ${p + narrowSheetStart * s},${p + DOBOR_H_MM * s}
          ${p + narrowSheetEnd * s},${p + DOBOR_H_MM * s}
          ${p + narrowSheetEnd * s},${p + CEILING_H_MM * s}
          ${p + doorEndMirror * s},${p + CEILING_H_MM * s}
          ${p + doorEndMirror * s},${p + OVER_DOOR_H_MM * s}
          ${p + doorStudMidMirror * s},${p + OVER_DOOR_H_MM * s}
          ${p + doorStudMidMirror * s},${p + DOBOR_H_MM * s}
          ${p + narrowSheetStart * s},${p + DOBOR_H_MM * s}
        `}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (narrowSheetStart + narrowSheetW/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s + 50}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {narrowSheetW}×{GKL_SHEET_H_MM}</text>
      <text x={p + (narrowSheetStart + narrowSheetW/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s + 62}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>(с вырезом)</text>
      <SpecLabel x={p + (narrowSheetStart + narrowSheetW/2) * s} y={p + (DOBOR_H_MM + 30)} num={2} color={C_GKL_PANEL}/>

      {/* ГКЛ полный (№1): 1570→2770 мм (1200 мм) × 2500 мм */}
      <rect x={p + fullSheetStart * s} y={p + DOBOR_H_MM * s}
        width={fullSheetW * s} height={GKL_SHEET_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (fullSheetStart + fullSheetW/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {fullSheetW}×{GKL_SHEET_H_MM}</text>
      <SpecLabel x={p + (fullSheetStart + fullSheetW/2) * s} y={p + (DOBOR_H_MM + 30)} num={1} color={C_GKL_PANEL}/>

      {/* ГКЛ над дверью (№3): 0→975 мм × 800 мм */}
      <rect x={p} y={p}
        width={doorStudMidMirror * s} height={OVER_DOOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + doorStudMidMirror/2 * s} y={p + OVER_DOOR_H_MM/2 * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {doorStudMidMirror}×{OVER_DOOR_H_MM}</text>
      <SpecLabel x={p + doorStudMidMirror/2 * s + 60} y={p + OVER_DOOR_H_MM/2 * s} num={3} color={C_GKL_PANEL}/>

      {/* ГКЛ доборка 1 (№4): 975→1970 мм (995 мм) × 300 мм (стык вразбежку) */}
      <rect x={p + doorStudMidMirror * s} y={p}
        width={(doborJointMirror - doorStudMidMirror) * s} height={DOBOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (doorStudMidMirror + (doborJointMirror - doorStudMidMirror)/2) * s} y={p + DOBOR_H_MM/2 * s + 3}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {doborJointMirror - doorStudMidMirror}×{DOBOR_H_MM}</text>
      <SpecLabel x={p + (doorStudMidMirror + (doborJointMirror - doorStudMidMirror)/2) * s + 50} y={p + DOBOR_H_MM/2 * s} num={4} color={C_GKL_PANEL}/>

      {/* ГКЛ доборка 2 (№4): 1970→2770 мм (800 мм) × 300 мм */}
      <rect x={p + doborJointMirror * s} y={p}
        width={(BEDROOM_VERT_FULL_LEN_MM - doborJointMirror) * s} height={DOBOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (doborJointMirror + (BEDROOM_VERT_FULL_LEN_MM - doborJointMirror)/2) * s} y={p + DOBOR_H_MM/2 * s + 3}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {BEDROOM_VERT_FULL_LEN_MM - doborJointMirror}×{DOBOR_H_MM}</text>
      <SpecLabel x={p + (doborJointMirror + (BEDROOM_VERT_FULL_LEN_MM - doborJointMirror)/2) * s - 50} y={p + DOBOR_H_MM/2 * s} num={4} color={C_GKL_PANEL}/>

      {/* ГКЛ у ванной (№5): 0→50 мм × 2000 мм */}
      <rect x={p} y={p + (CEILING_H_MM - DOOR_H_MM) * s}
        width={doorStartMirror * s} height={DOOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <SpecLabel x={p + doorStartMirror/2 * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s + 40} num={5} color={C_GKL_PANEL}/>

      {/* Размерные линии */}
      <HDim x1={p} x2={p + doorStartMirror * s} y={p + CEILING_H_MM * s + 20}
        label={DOOR_OFFSET_MM} fontSize={8}/>
      <HDim x1={p + doorStartMirror * s} x2={p + doorEndMirror * s} y={p + CEILING_H_MM * s + 20}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_W_MM} fontSize={9}/>

      <HDim x1={p + narrowSheetStart * s} x2={p + mainJointMirror * s} y={p + CEILING_H_MM * s + 40}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={narrowSheetW} fontSize={9}/>
      <HDim x1={p + mainJointMirror * s} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y={p + CEILING_H_MM * s + 40}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={fullSheetW} fontSize={9}/>

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

      {/* Курсор */}
      <Crosshair mouse={mouse} area={area} />

    </svg>
  );
}
