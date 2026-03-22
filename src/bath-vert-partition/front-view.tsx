import { HDim, VDim, StudLabel, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  CEILING_H_MM, GKL_SHEET_H_MM, GKL_SHEET_W_MM, DOBOR_H_MM,
  COL_W_MM, COL_H_MM,
  PN_H_MM,
  STUD_STEP_MM,
  BATH_VERT_T_MM, BATH_VERT_LEN_MM,
  BATH_VERT_PS_W_MM,
  BATH_VERT_STUD_POSITIONS, getBathVertStudNumber,
  BATH_VERT_GKL_SHEET1_W_MM, BATH_VERT_GKL_SHEET2_W_MM, BATH_VERT_GKL_DOBOR_W_MM,
  S_BATH_VERT
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_COLUMN,
  C_FRAME, C_FRAME_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL, C_COL_FILL
} from "../colors";

interface FrontViewProps {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}

export function FrontView({ onMouseMove, mouse }: FrontViewProps) {
  const p = 70; // padding
  const s = S_BATH_VERT;

  // Общая длина с колонной
  const totalLen = COL_W_MM + BATH_VERT_LEN_MM;
  const svgW = totalLen * s + p * 2;
  const svgH = CEILING_H_MM * s + p * 2 + 60;

  const area: SchemaArea = {
    padding: p, scale: s, width: totalLen, height: CEILING_H_MM, svgWidth: svgW
  };

  // Начало перегородки (после колонны)
  const partStart = COL_W_MM;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: svgW, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={svgW/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л6.Сх1 — Вид со стороны ванной (шаг стоек {STUD_STEP_MM} мм)
      </text>

      {/* Контур помещения */}
      <rect x={p} y={p} width={totalLen * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + totalLen * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + totalLen * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Колонна 1 (слева) */}
      <rect x={p} y={p} width={COL_W_MM * s} height={CEILING_H_MM * s}
        fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
      <text x={p + COL_W_MM/2 * s} y={p + CEILING_H_MM/2 * s}
        textAnchor="middle" fill={C_COLUMN} fontSize={10} fontWeight="bold">Колонна 1</text>
      <text x={p + COL_W_MM/2 * s} y={p + CEILING_H_MM/2 * s + 14}
        textAnchor="middle" fill={C_COLUMN} fontSize={8}>{COL_W_MM}×{COL_H_MM}</text>

      {/* Нижняя стена (справа) — обозначение */}
      <rect x={p + totalLen * s - 10} y={p} width={10} height={CEILING_H_MM * s}
        fill={C_TEXT_DIM} stroke={C_TEXT} strokeWidth={1}/>
      <text x={p + totalLen * s + 5} y={p + CEILING_H_MM/2 * s}
        textAnchor="middle" fill={C_TEXT} fontSize={8} transform={`rotate(90,${p + totalLen * s + 5},${p + CEILING_H_MM/2 * s})`}>стена</text>

      {/* Направляющий профиль ПН на полу */}
      <rect x={p + partStart * s} y={p + CEILING_H_MM * s - PN_H_MM * s} width={BATH_VERT_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (partStart + BATH_VERT_LEN_MM/2) * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={5} color={C_FRAME}/>

      {/* Направляющий профиль ПН на потолке */}
      <rect x={p + partStart * s} y={p} width={BATH_VERT_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (partStart + BATH_VERT_LEN_MM/2) * s} y={p + PN_H_MM/2 * s} num={6} color={C_FRAME}/>

      {/* Стоечные профили ПС */}
      {BATH_VERT_STUD_POSITIONS.map((pos, i) => (
        <g key={`stud${i}`}>
          <rect x={p + (partStart + pos) * s} y={p + PN_H_MM * s}
            width={BATH_VERT_PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
            fill={C_FRAME_FILL}
            stroke={C_FRAME}
            strokeWidth={1}/>
          <StudLabel x={p + (partStart + pos + BATH_VERT_PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s} num={getBathVertStudNumber(i)} color={C_FRAME}/>
          <SpecLabel x={p + (partStart + pos + BATH_VERT_PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 40} num={7} color={C_FRAME}/>
        </g>
      ))}

      {/* ГКЛ лист 1 */}
      <rect x={p + partStart * s} y={p + DOBOR_H_MM * s}
        width={BATH_VERT_GKL_SHEET1_W_MM * s} height={GKL_SHEET_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {BATH_VERT_GKL_SHEET1_W_MM}×{GKL_SHEET_H_MM}</text>
      <SpecLabel x={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM/2) * s} y={p + (DOBOR_H_MM + 30)} num={1} color={C_GKL_PANEL}/>

      {/* ГКЛ лист 2 */}
      <rect x={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM) * s} y={p + DOBOR_H_MM * s}
        width={BATH_VERT_GKL_SHEET2_W_MM * s} height={GKL_SHEET_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM + BATH_VERT_GKL_SHEET2_W_MM/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {BATH_VERT_GKL_SHEET2_W_MM}×{GKL_SHEET_H_MM}</text>
      <SpecLabel x={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM + BATH_VERT_GKL_SHEET2_W_MM/2) * s} y={p + (DOBOR_H_MM + 30)} num={1} color={C_GKL_PANEL}/>

      {/* ГКЛ доборка у стены */}
      <rect x={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM + BATH_VERT_GKL_SHEET2_W_MM) * s} y={p + DOBOR_H_MM * s}
        width={BATH_VERT_GKL_DOBOR_W_MM * s} height={GKL_SHEET_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM + BATH_VERT_GKL_SHEET2_W_MM + BATH_VERT_GKL_DOBOR_W_MM/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>{BATH_VERT_GKL_DOBOR_W_MM}</text>
      <SpecLabel x={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM + BATH_VERT_GKL_SHEET2_W_MM + BATH_VERT_GKL_DOBOR_W_MM/2) * s} y={p + (DOBOR_H_MM + 50)} num={2} color={C_GKL_PANEL}/>

      {/* ГКЛ доборки сверху */}
      <rect x={p + partStart * s} y={p}
        width={BATH_VERT_LEN_MM * s} height={DOBOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (partStart + BATH_VERT_LEN_MM/2) * s} y={p + DOBOR_H_MM/2 * s + 3}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ доборка {BATH_VERT_LEN_MM}×{DOBOR_H_MM}</text>
      <SpecLabel x={p + (partStart + BATH_VERT_LEN_MM/2) * s + 100} y={p + DOBOR_H_MM/2 * s} num={3} color={C_GKL_PANEL}/>

      {/* Размерные линии — колонна */}
      <HDim x1={p} x2={p + COL_W_MM * s} y={p - 20}
        color={C_COLUMN} textColor={C_COLUMN} label={COL_W_MM} fontSize={8}/>

      {/* Размерная линия перегородки */}
      <HDim x1={p + partStart * s} x2={p + totalLen * s} y={p - 20}
        label={BATH_VERT_LEN_MM} fontSize={10}/>

      {/* Размерные линии листов ГКЛ */}
      <HDim x1={p + partStart * s} x2={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM) * s} y={p + CEILING_H_MM * s + 20}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={BATH_VERT_GKL_SHEET1_W_MM} fontSize={8}/>
      <HDim x1={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM) * s} x2={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM + BATH_VERT_GKL_SHEET2_W_MM) * s} y={p + CEILING_H_MM * s + 20}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={BATH_VERT_GKL_SHEET2_W_MM} fontSize={8}/>
      <HDim x1={p + (partStart + BATH_VERT_GKL_SHEET1_W_MM + BATH_VERT_GKL_SHEET2_W_MM) * s} x2={p + totalLen * s} y={p + CEILING_H_MM * s + 20}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={BATH_VERT_GKL_DOBOR_W_MM} fontSize={8}/>

      {/* Общая длина */}
      <HDim x1={p} x2={p + totalLen * s} y={p + CEILING_H_MM * s + 45}
        label={totalLen} fontSize={10}/>

      {/* Высоты */}
      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>
      <VDim x={p + totalLen * s + 15} y1={p + DOBOR_H_MM * s} y2={p + CEILING_H_MM * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_SHEET_H_MM} fontSize={8} labelX={p + totalLen * s + 20}/>
      <VDim x={p + totalLen * s + 15} y1={p} y2={p + DOBOR_H_MM * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={DOBOR_H_MM} fontSize={8} labelX={p + totalLen * s + 20}/>

      {/* Курсор */}
      <Crosshair mouse={mouse} area={area} />

    </svg>
  );
}
