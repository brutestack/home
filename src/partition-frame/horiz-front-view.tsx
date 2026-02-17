import { HDim, VDim, SpecLabel } from "../svg-primitives";
import {
  CEILING_H_MM, DOOR_H_MM, PANEL_H_MM, PANEL_T_MM, LDSP_DOBOR_H_MM,
  GKL_LAYER_MM, GKL_GAP_MM, PARTITION_T_MM, HORIZ_W_MM, PN_H_MM, PS_W_MM, PN_GAP_W_MM, PN_GAP_H_MM
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT,
  C_FRAME, C_FRAME_FILL, C_PANEL, C_PANEL_FILL, C_DOBOR, C_DOOR_OPENING
} from "../colors";

export function HorizFrontView() {
  const s = 0.266;
  const w = 585;
  const topY = 73;
  const schemaH = CEILING_H_MM * s;
  const svgH = topY + schemaH + 60;

  const drawingW = (PARTITION_T_MM + GKL_LAYER_MM + HORIZ_W_MM) * s;
  const p = (w - drawingW) / 2;

  const outerPartW = GKL_LAYER_MM + GKL_GAP_MM;
  const innerLayerX = p + outerPartW * s;

  return (
    <svg viewBox={`0 0 ${w} ${svgH}`}
      style={{ width: w, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={w/2} y={18} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={13} fontWeight="bold">
        Л3.Сх5 — Горизонтальная часть (вид со стороны двери в ванную)
      </text>
      <text x={w/2} y={34} textAnchor="middle" fill={C_TEXT_DIM} fontSize={10}>
        Внутренний слой двойной перегородки продолжается как горизонтальная часть
      </text>

      {/* === Внешний слой двойной перегородки (сторона лестницы) === */}
      <rect x={p} y={topY} width={GKL_LAYER_MM * s} height={CEILING_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + GKL_LAYER_MM/2 * s} y={topY + CEILING_H_MM/2 * s} num={11} color={C_FRAME}/>
      {/* ЛДСП на внешнем слое (№1) */}
      <rect x={p - PANEL_T_MM * s} y={topY} width={PANEL_T_MM * s} height={PANEL_H_MM * s}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={1.5}/>
      <SpecLabel x={p - PANEL_T_MM/2 * s} y={topY + PANEL_H_MM/2 * s} num={1} color={C_PANEL}/>

      {/* Зазор между слоями — над проёмом (с ПН 75 на потолке) */}
      <rect x={p + GKL_LAYER_MM * s} y={topY} width={GKL_GAP_MM * s} height={(CEILING_H_MM - DOOR_H_MM) * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="2 2"/>
      {/* ПН 75 на потолке (в зазоре) */}
      <rect x={p + GKL_LAYER_MM * s} y={topY} width={PN_GAP_W_MM * s} height={PN_GAP_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      {/* Проём в двойной перегородке — зазор открыт */}
      <rect x={p + GKL_LAYER_MM * s} y={topY + (CEILING_H_MM - DOOR_H_MM) * s} width={GKL_GAP_MM * s} height={DOOR_H_MM * s}
        fill={C_DOOR_OPENING + "22"} stroke={C_DOOR_OPENING} strokeWidth={1.5} strokeDasharray="4 2"/>

      {/* Подписи слева */}
      <text x={p - PANEL_T_MM * s - 28} y={topY + CEILING_H_MM/3 * s} textAnchor="end" fill={C_TEXT_DIM} fontSize={7}>
        ← Лестница
      </text>

      {/* Проём подпись */}
      <text x={p + (GKL_LAYER_MM + GKL_GAP_MM/2) * s} y={topY + (CEILING_H_MM - DOOR_H_MM/2) * s}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={7}
        transform={`rotate(-90,${p + (GKL_LAYER_MM + GKL_GAP_MM/2) * s},${topY + (CEILING_H_MM - DOOR_H_MM/2) * s})`}>
        ПРОЁМ {DOOR_H_MM}
      </text>

      {/* === Внутренний слой = горизонтальная часть (единая конструкция) === */}
      <rect x={innerLayerX} y={topY} width={(GKL_LAYER_MM + HORIZ_W_MM) * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={innerLayerX} y1={topY + CEILING_H_MM * s} x2={innerLayerX + (GKL_LAYER_MM + HORIZ_W_MM) * s} y2={topY + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={innerLayerX} y1={topY} x2={innerLayerX + (GKL_LAYER_MM + HORIZ_W_MM) * s} y2={topY}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Направляющие ПН (на всю длину) */}
      <rect x={innerLayerX} y={topY} width={(GKL_LAYER_MM + HORIZ_W_MM) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <rect x={innerLayerX} y={topY + (CEILING_H_MM - PN_H_MM) * s} width={(GKL_LAYER_MM + HORIZ_W_MM) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

      {/* Стойки */}
      <rect x={innerLayerX} y={topY + PN_H_MM * s} width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1.5}/>
      <rect x={innerLayerX + GKL_LAYER_MM * s} y={topY + PN_H_MM * s} width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <rect x={innerLayerX + (GKL_LAYER_MM + HORIZ_W_MM - PS_W_MM) * s} y={topY + PN_H_MM * s} width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

      {/* ЛДСП панель горизонтальной части (№3) */}
      <rect x={innerLayerX + GKL_LAYER_MM * s} y={topY} width={HORIZ_W_MM * s} height={PANEL_H_MM * s}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
      <text x={innerLayerX + (GKL_LAYER_MM + HORIZ_W_MM/2) * s} y={topY + PANEL_H_MM/2 * s}
        textAnchor="middle" fill={C_PANEL} fontSize={9}>ЛДСП {HORIZ_W_MM}×{PANEL_H_MM}</text>
      <SpecLabel x={innerLayerX + (GKL_LAYER_MM + HORIZ_W_MM - 25) * s} y={topY + 25} num={3} color={C_PANEL}/>

      {/* Доборка снизу (№4) */}
      <rect x={innerLayerX + GKL_LAYER_MM * s} y={topY + PANEL_H_MM * s} width={HORIZ_W_MM * s} height={LDSP_DOBOR_H_MM * s}
        fill="none" stroke={C_DOBOR} strokeWidth={1} strokeDasharray="3 2"/>
      <SpecLabel x={innerLayerX + (GKL_LAYER_MM + HORIZ_W_MM/2) * s} y={topY + (PANEL_H_MM + LDSP_DOBOR_H_MM/2) * s} num={4} color={C_DOBOR}/>

      {/* Разделительная линия между зонами (пунктир) */}
      <line x1={innerLayerX + GKL_LAYER_MM * s} y1={topY} x2={innerLayerX + GKL_LAYER_MM * s} y2={topY + CEILING_H_MM * s}
        stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="6 3"/>
      <text x={innerLayerX + GKL_LAYER_MM * s} y={topY - 5} textAnchor="middle" fill={C_TEXT_DIM} fontSize={7}>
        ← внутр. слой | гориз. часть →
      </text>

      {/* === Размерные линии === */}
      <HDim x1={p} x2={p + GKL_LAYER_MM * s} y={topY + CEILING_H_MM * s + 20}
        color={C_FRAME} textColor={C_FRAME} label={GKL_LAYER_MM} fontSize={8}/>
      <HDim x1={p + GKL_LAYER_MM * s} x2={innerLayerX} y={topY + CEILING_H_MM * s + 20}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={GKL_GAP_MM} fontSize={8}/>
      <HDim x1={innerLayerX} x2={innerLayerX + GKL_LAYER_MM * s} y={topY + CEILING_H_MM * s + 20}
        color={C_FRAME} textColor={C_FRAME} label={GKL_LAYER_MM} fontSize={8}/>
      <HDim x1={innerLayerX + GKL_LAYER_MM * s} x2={innerLayerX + (GKL_LAYER_MM + HORIZ_W_MM) * s} y={topY + CEILING_H_MM * s + 20}
        label={HORIZ_W_MM} fontSize={9}/>

      <HDim x1={p} x2={innerLayerX + GKL_LAYER_MM * s} y={topY + CEILING_H_MM * s + 40}
        label={PARTITION_T_MM} fontSize={9}/>

      <VDim x={innerLayerX + (GKL_LAYER_MM + HORIZ_W_MM) * s + 15} y1={topY} y2={topY + CEILING_H_MM * s}
        label={CEILING_H_MM} fontSize={9} labelX={innerLayerX + (GKL_LAYER_MM + HORIZ_W_MM) * s + 25}/>
      <VDim x={innerLayerX + (GKL_LAYER_MM + HORIZ_W_MM) * s + 35} y1={topY + PANEL_H_MM * s} y2={topY + CEILING_H_MM * s}
        color={C_DOBOR} textColor={C_DOBOR} label={LDSP_DOBOR_H_MM} fontSize={8} labelX={innerLayerX + (GKL_LAYER_MM + HORIZ_W_MM) * s + 45}/>
      <VDim x={p - PANEL_T_MM * s - 15} y1={topY + (CEILING_H_MM - DOOR_H_MM) * s} y2={topY + CEILING_H_MM * s}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_H_MM} fontSize={8}/>
    </svg>
  );
}
