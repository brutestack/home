import { HDim, VDim, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  COL_W_MM, COL_H_MM,
  BATH_VERT_T_MM, BATH_VERT_LEN_MM,
  BATH_VERT_PS_W_MM, BATH_VERT_PN_W_MM, BATH_VERT_PN_H_MM,
  BATH_VERT_STUD_POSITIONS, getBathVertStudNumber,
  GKL_THICKNESS_MM,
  S_BATH_VERT_TOP
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_COLUMN,
  C_FRAME, C_FRAME_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL, C_COL_FILL
} from "../colors";

interface TopViewProps {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}

export function TopView({ onMouseMove, mouse }: TopViewProps) {
  const p = 50; // padding
  const s = S_BATH_VERT_TOP;

  // Общая длина с колонной
  const totalLen = COL_W_MM + BATH_VERT_LEN_MM;
  // Общая толщина с ГКЛ
  const totalT = BATH_VERT_T_MM + GKL_THICKNESS_MM * 2;

  const svgW = totalLen * s + p * 2;
  const svgH = totalT * s + p * 2 + 60;

  const area: SchemaArea = {
    paddingX: p, paddingY: p, scale: s, width: totalLen, height: totalT, svgWidth: svgW, invertY: false
  };

  const partStart = COL_W_MM;
  const gklT = GKL_THICKNESS_MM;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: Math.min(svgW, 900), background: C_BG_SVG, borderRadius: 8 }}>

      <text x={svgW/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л6.Сх3 — Вид сверху
      </text>

      {/* Колонна 1 (слева) */}
      <rect x={p} y={p + gklT * s} width={COL_W_MM * s} height={COL_H_MM * s}
        fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
      <text x={p + COL_W_MM/2 * s} y={p + (gklT + COL_H_MM/2) * s}
        textAnchor="middle" fill={C_COLUMN} fontSize={9} fontWeight="bold">Кол.1</text>

      {/* Нижняя стена (справа) */}
      <rect x={p + totalLen * s - 10} y={p} width={20} height={totalT * s}
        fill={C_TEXT_DIM} stroke={C_TEXT} strokeWidth={1}/>
      <text x={p + totalLen * s + 5} y={p + totalT/2 * s}
        textAnchor="middle" fill={C_TEXT} fontSize={8} transform={`rotate(90,${p + totalLen * s + 5},${p + totalT/2 * s})`}>стена</text>

      {/* Направляющий профиль ПН (ширина 100 мм) */}
      <rect x={p + partStart * s} y={p + gklT * s} width={BATH_VERT_LEN_MM * s} height={BATH_VERT_PN_W_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <text x={p + (partStart + BATH_VERT_LEN_MM/2) * s} y={p + (gklT + BATH_VERT_PN_W_MM/2) * s + 3}
        textAnchor="middle" fill={C_FRAME} fontSize={8}>ПН 100×40</text>

      {/* Стоечные профили ПС */}
      {BATH_VERT_STUD_POSITIONS.map((pos, i) => (
        <g key={`stud${i}`}>
          <rect x={p + (partStart + pos) * s} y={p + gklT * s}
            width={BATH_VERT_PS_W_MM * s} height={BATH_VERT_T_MM * s}
            fill={C_FRAME_FILL}
            stroke={C_FRAME}
            strokeWidth={1.5}/>
          <text x={p + (partStart + pos + BATH_VERT_PS_W_MM/2) * s} y={p + (gklT + BATH_VERT_T_MM/2) * s + 3}
            textAnchor="middle" fill={C_FRAME} fontSize={7}>{getBathVertStudNumber(i)}</text>
        </g>
      ))}

      {/* ГКЛ со стороны ванной (сверху на схеме) */}
      <rect x={p + partStart * s} y={p} width={BATH_VERT_LEN_MM * s} height={gklT * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (partStart + BATH_VERT_LEN_MM/2) * s} y={p + gklT/2 * s + 2}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={6}>ГКЛ 12.5</text>

      {/* ГКЛ со стороны спальни (снизу на схеме) */}
      <rect x={p + partStart * s} y={p + (gklT + BATH_VERT_T_MM) * s} width={BATH_VERT_LEN_MM * s} height={gklT * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (partStart + BATH_VERT_LEN_MM/2) * s} y={p + (gklT + BATH_VERT_T_MM + gklT/2) * s + 2}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={6}>ГКЛ 12.5</text>

      {/* Обозначения сторон */}
      <text x={p + (partStart + BATH_VERT_LEN_MM/2) * s} y={p - 10}
        textAnchor="middle" fill={C_TEXT_DIM} fontSize={9}>← ванная</text>
      <text x={p + (partStart + BATH_VERT_LEN_MM/2) * s} y={p + totalT * s + 20}
        textAnchor="middle" fill={C_TEXT_DIM} fontSize={9}>← спальня</text>

      {/* Размерные линии */}
      <HDim x1={p} x2={p + COL_W_MM * s} y={p + totalT * s + 35}
        color={C_COLUMN} textColor={C_COLUMN} label={COL_W_MM} fontSize={8}/>
      <HDim x1={p + partStart * s} x2={p + totalLen * s} y={p + totalT * s + 35}
        label={BATH_VERT_LEN_MM} fontSize={9}/>

      {/* Толщина */}
      <VDim x={p - 15} y1={p} y2={p + gklT * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={gklT} fontSize={7} labelX={p - 20}/>
      <VDim x={p - 15} y1={p + gklT * s} y2={p + (gklT + BATH_VERT_T_MM) * s}
        color={C_FRAME} textColor={C_FRAME} label={BATH_VERT_T_MM} fontSize={8} labelX={p - 20}/>
      <VDim x={p - 15} y1={p + (gklT + BATH_VERT_T_MM) * s} y2={p + totalT * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={gklT} fontSize={7} labelX={p - 20}/>

      {/* Общая толщина */}
      <VDim x={p + totalLen * s + 25} y1={p} y2={p + totalT * s}
        label={totalT} fontSize={9} labelX={p + totalLen * s + 30}/>

      {/* Курсор */}
      <Crosshair mouse={mouse} area={area} />

    </svg>
  );
}
