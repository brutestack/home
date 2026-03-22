import { HDim, VDim, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  CEILING_H_MM,
  BATH_VERT_T_MM,
  BATH_VERT_PN_W_MM, BATH_VERT_PN_H_MM,
  BATH_VERT_PS_W_MM, BATH_VERT_PS_H_MM,
  GKL_THICKNESS_MM,
  S_BATH_VERT_SECTION
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT,
  C_FRAME, C_FRAME_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL
} from "../colors";

interface SectionViewProps {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}

export function SectionView({ onMouseMove, mouse }: SectionViewProps) {
  const p = 50; // padding
  const s = S_BATH_VERT_SECTION;

  const gklT = GKL_THICKNESS_MM;
  const totalT = BATH_VERT_T_MM + gklT * 2;
  const sectionH = 400; // Высота разреза для отображения

  const svgW = totalT * s + p * 2 + 100;
  const svgH = sectionH * s + p * 2;

  const area: SchemaArea = {
    paddingX: p, paddingY: p, scale: s, width: totalT, height: sectionH, svgWidth: svgW, invertY: true
  };

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: 300, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={svgW/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={12} fontWeight="bold">
        Л6.Сх4 — Разрез
      </text>

      {/* Контур разреза */}
      <rect x={p} y={p} width={totalT * s} height={sectionH * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* ГКЛ со стороны ванной (слева) */}
      <rect x={p} y={p} width={gklT * s} height={sectionH * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <SpecLabel x={p + gklT/2 * s} y={p + sectionH/2 * s} num={1} color={C_GKL_PANEL}/>

      {/* Профиль ПН на полу */}
      <rect x={p + gklT * s} y={p + sectionH * s - BATH_VERT_PN_H_MM * s}
        width={BATH_VERT_PN_W_MM * s} height={BATH_VERT_PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <text x={p + (gklT + BATH_VERT_PN_W_MM/2) * s} y={p + (sectionH - BATH_VERT_PN_H_MM/2) * s + 3}
        textAnchor="middle" fill={C_FRAME} fontSize={7}>ПН</text>
      <SpecLabel x={p + (gklT + BATH_VERT_PN_W_MM/2) * s + 30} y={p + (sectionH - BATH_VERT_PN_H_MM/2) * s} num={5} color={C_FRAME}/>

      {/* Профиль ПН на потолке */}
      <rect x={p + gklT * s} y={p}
        width={BATH_VERT_PN_W_MM * s} height={BATH_VERT_PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <text x={p + (gklT + BATH_VERT_PN_W_MM/2) * s} y={p + BATH_VERT_PN_H_MM/2 * s + 3}
        textAnchor="middle" fill={C_FRAME} fontSize={7}>ПН</text>
      <SpecLabel x={p + (gklT + BATH_VERT_PN_W_MM/2) * s + 30} y={p + BATH_VERT_PN_H_MM/2 * s} num={6} color={C_FRAME}/>

      {/* Профиль ПС (стойка) */}
      <rect x={p + gklT * s} y={p + BATH_VERT_PN_H_MM * s}
        width={BATH_VERT_PS_W_MM * s} height={(sectionH - BATH_VERT_PN_H_MM * 2) * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <text x={p + (gklT + BATH_VERT_PS_W_MM/2) * s} y={p + sectionH/2 * s}
        textAnchor="middle" fill={C_FRAME} fontSize={8}>ПС</text>
      <SpecLabel x={p + (gklT + BATH_VERT_PS_W_MM/2) * s + 35} y={p + sectionH/2 * s} num={7} color={C_FRAME}/>

      {/* ГКЛ со стороны спальни (справа) */}
      <rect x={p + (gklT + BATH_VERT_T_MM) * s} y={p} width={gklT * s} height={sectionH * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <SpecLabel x={p + (gklT + BATH_VERT_T_MM + gklT/2) * s} y={p + sectionH/2 * s} num={1} color={C_GKL_PANEL}/>

      {/* Пол */}
      <line x1={p - 10} y1={p + sectionH * s} x2={p + totalT * s + 10} y2={p + sectionH * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <text x={p + totalT/2 * s} y={p + sectionH * s + 15}
        textAnchor="middle" fill={C_TEXT_DIM} fontSize={8}>пол</text>

      {/* Потолок */}
      <line x1={p - 10} y1={p} x2={p + totalT * s + 10} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>
      <text x={p + totalT/2 * s} y={p - 8}
        textAnchor="middle" fill={C_TEXT_DIM} fontSize={8}>потолок</text>

      {/* Обозначения сторон */}
      <text x={p - 5} y={p + sectionH/2 * s}
        textAnchor="end" fill={C_TEXT_DIM} fontSize={8} transform={`rotate(-90,${p - 5},${p + sectionH/2 * s})`}>ванная</text>
      <text x={p + totalT * s + 5} y={p + sectionH/2 * s}
        textAnchor="start" fill={C_TEXT_DIM} fontSize={8} transform={`rotate(90,${p + totalT * s + 5},${p + sectionH/2 * s})`}>спальня</text>

      {/* Размерные линии */}
      <HDim x1={p} x2={p + gklT * s} y={p + sectionH * s + 30}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={gklT} fontSize={7}/>
      <HDim x1={p + gklT * s} x2={p + (gklT + BATH_VERT_T_MM) * s} y={p + sectionH * s + 30}
        color={C_FRAME} textColor={C_FRAME} label={BATH_VERT_T_MM} fontSize={8}/>
      <HDim x1={p + (gklT + BATH_VERT_T_MM) * s} x2={p + totalT * s} y={p + sectionH * s + 30}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={gklT} fontSize={7}/>

      {/* Общая толщина */}
      <HDim x1={p} x2={p + totalT * s} y={p + sectionH * s + 50}
        label={totalT} fontSize={9}/>

      {/* Курсор */}
      <Crosshair mouse={mouse} area={area} />

    </svg>
  );
}
