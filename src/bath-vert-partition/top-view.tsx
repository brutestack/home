import { HDim, VDim } from "../svg-primitives";
import {
  BATH_VERT_T_MM, BATH_VERT_LEN_MM,
  BATH_VERT_PS_W_MM, BATH_VERT_PN_W_MM,
  BATH_VERT_STUD_POSITIONS, getBathVertStudNumber,
  GKL_THICKNESS_MM,
  S_BATH_VERT
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT,
  C_FRAME, C_FRAME_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL,
  C_GKL_LAYER2, C_GKL_LAYER2_FILL
} from "../colors";

export function TopView() {
  const p = 50; // padding
  const sX = S_BATH_VERT; // горизонтальный масштаб (как у фронта)
  const sY = 4.0;         // вертикальный масштаб (крупнее для читаемости)

  const gklT = GKL_THICKNESS_MM;
  const totalT = BATH_VERT_T_MM + gklT * 3; // 2 слоя ванная + 1 слой спальня

  const svgW = BATH_VERT_LEN_MM * sX + p * 2 + 40;
  const svgH = totalT * sY + p * 2 + 60;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`}
      style={{ width: svgW, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={svgW/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л6.Сх4 — Вид сверху
      </text>

      {/* Нижняя стена (справа) — за пределами каркаса */}
      <rect x={p + BATH_VERT_LEN_MM * sX} y={p} width={15} height={totalT * sY}
        fill={C_TEXT_DIM} stroke={C_TEXT} strokeWidth={1}/>
      <text x={p + BATH_VERT_LEN_MM * sX + 24} y={p + totalT/2 * sY}
        textAnchor="middle" fill={C_TEXT} fontSize={10} transform={`rotate(90,${p + BATH_VERT_LEN_MM * sX + 24},${p + totalT/2 * sY})`}>стена</text>

      {/* Направляющий профиль ПН */}
      <rect x={p} y={p + gklT * 2 * sY} width={BATH_VERT_LEN_MM * sX} height={BATH_VERT_PN_W_MM * sY}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <text x={p + BATH_VERT_LEN_MM/2 * sX} y={p + (gklT * 2 + BATH_VERT_PN_W_MM/2) * sY + 4}
        textAnchor="middle" fill={C_FRAME} fontSize={12} fontWeight="bold">ПН 50×40</text>

      {/* Стоечные профили ПС */}
      {BATH_VERT_STUD_POSITIONS.map((pos, i) => (
        <g key={`stud${i}`}>
          <rect x={p + pos * sX} y={p + gklT * 2 * sY}
            width={BATH_VERT_PS_W_MM * sX} height={BATH_VERT_T_MM * sY}
            fill={C_FRAME_FILL}
            stroke={C_FRAME}
            strokeWidth={1.5}/>
          <text x={p + (pos + BATH_VERT_PS_W_MM/2) * sX} y={p + (gklT * 2 + BATH_VERT_T_MM/2) * sY + 4}
            textAnchor="middle" fill={C_FRAME} fontSize={10} fontWeight="bold">{getBathVertStudNumber(i)}</text>
        </g>
      ))}

      {/* ГКЛ со стороны ванной — 1-й слой */}
      <rect x={p} y={p + gklT * sY} width={BATH_VERT_LEN_MM * sX} height={gklT * sY}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + BATH_VERT_LEN_MM/2 * sX} y={p + gklT * 1.5 * sY + 4}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>1-й слой 12.5</text>

      {/* ГКЛ со стороны ванной — 2-й слой (наружный) */}
      <rect x={p} y={p} width={BATH_VERT_LEN_MM * sX} height={gklT * sY}
        fill={C_GKL_LAYER2_FILL} stroke={C_GKL_LAYER2} strokeWidth={2}/>
      <text x={p + BATH_VERT_LEN_MM/2 * sX} y={p + gklT/2 * sY + 4}
        textAnchor="middle" fill={C_GKL_LAYER2} fontSize={9}>2-й слой 12.5</text>

      {/* ГКЛ со стороны спальни (снизу на схеме) */}
      <rect x={p} y={p + (gklT * 2 + BATH_VERT_T_MM) * sY} width={BATH_VERT_LEN_MM * sX} height={gklT * sY}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + BATH_VERT_LEN_MM/2 * sX} y={p + (gklT * 2 + BATH_VERT_T_MM + gklT/2) * sY + 4}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={10}>ГКЛ 12.5 мм</text>

      {/* Обозначения сторон */}
      <text x={p + BATH_VERT_LEN_MM/2 * sX} y={p - 10}
        textAnchor="middle" fill={C_TEXT_DIM} fontSize={11}>← ванная</text>
      <text x={p + BATH_VERT_LEN_MM/2 * sX} y={p + totalT * sY + 22}
        textAnchor="middle" fill={C_TEXT_DIM} fontSize={11}>← спальня</text>

      {/* Размерные линии */}
      <HDim x1={p} x2={p + BATH_VERT_LEN_MM * sX} y={p + totalT * sY + 40}
        label={BATH_VERT_LEN_MM} fontSize={10}/>

      {/* Толщина */}
      <VDim x={p - 15} y1={p} y2={p + gklT * sY}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={gklT} fontSize={9} labelX={p - 25}/>
      <VDim x={p - 15} y1={p + gklT * sY} y2={p + gklT * 2 * sY}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={gklT} fontSize={9} labelX={p - 25}/>
      <VDim x={p - 15} y1={p + gklT * 2 * sY} y2={p + (gklT * 2 + BATH_VERT_T_MM) * sY}
        color={C_FRAME} textColor={C_FRAME} label={BATH_VERT_T_MM} fontSize={10} labelX={p - 25}/>
      <VDim x={p - 15} y1={p + (gklT * 2 + BATH_VERT_T_MM) * sY} y2={p + totalT * sY}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={gklT} fontSize={9} labelX={p - 25}/>

      {/* Общая толщина */}
      <VDim x={p + BATH_VERT_LEN_MM * sX + 30} y1={p} y2={p + totalT * sY}
        label={totalT} fontSize={10} labelX={p + BATH_VERT_LEN_MM * sX + 35}/>

    </svg>
  );
}
