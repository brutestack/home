import { HDim, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  GKL_GAP_MM, GKL_LAYER_MM, PARTITION_T_MM, PS_W_MM, PANEL_T_MM, PN_GAP_W_MM, PN_GAP_H_MM
} from "../constants";
import {
  C_BG_SVG, C_TEXT_DIM, C_COLUMN_TEXT, C_WARDROBE, C_FRAME, C_FRAME_FILL, C_PANEL, C_PANEL_FILL
} from "../colors";

export function SectionView({ onMouseMove, mouse }: {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}) {
  const w = 408;
  const svgH = 420;
  const s = 1.3;
  const h = 300;
  const topY = 55;

  const layer1X = 0;
  const gapX = PS_W_MM;
  const layer2X = PS_W_MM + GKL_GAP_MM;
  const totalW = PS_W_MM * 2 + GKL_GAP_MM;

  const schemaW = (totalW + PANEL_T_MM * 2) * s;
  const p = (w - schemaW) / 2 + PANEL_T_MM * s;

  // Область для курсора
  const totalWidthMm = totalW + PANEL_T_MM * 2;
  const heightMm = h / s;
  const area: SchemaArea = {
    paddingX: p - PANEL_T_MM * s,
    paddingY: topY,
    scale: s,
    width: totalWidthMm,
    height: heightMm,
    svgWidth: w,
    invertY: true
  };

  return (
    <svg viewBox={`0 0 ${w} ${svgH}`}
      style={{ width: w, background: C_BG_SVG, borderRadius: 8, cursor: onMouseMove ? "crosshair" : undefined }}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={onMouseMove ? () => onMouseMove(null) : undefined}>

      <text x={w/2} y={18} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={13} fontWeight="bold">
        Л3.Сх3 — Разрез двойной перегородки
      </text>
      <text x={w/2} y={34} textAnchor="middle" fill={C_TEXT_DIM} fontSize={10}>
        ЛДСП только снаружи | ПН 75 между слоями
      </text>

      {/* Стоечные профили ПС (№11) */}
      <rect x={p + layer1X * s} y={topY} width={PS_W_MM * s} height={h}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <text x={p + PS_W_MM/2 * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={8}>ПС</text>
      <SpecLabel x={p + PS_W_MM/2 * s} y={topY + h/2 + 25} num={11} color={C_FRAME}/>

      <rect x={p + layer2X * s} y={topY} width={PS_W_MM * s} height={h}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <text x={p + (layer2X + PS_W_MM/2) * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={8}>ПС</text>
      <SpecLabel x={p + (layer2X + PS_W_MM/2) * s} y={topY + h/2 + 25} num={11} color={C_FRAME}/>

      {/* Профиль ПН 75 между слоями (№10) */}
      <rect x={p + gapX * s} y={topY} width={GKL_GAP_MM * s} height={h}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>
      <rect x={p + gapX * s} y={topY} width={PN_GAP_W_MM * s} height={PN_GAP_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (gapX + GKL_GAP_MM/2) * s} y={topY + PN_GAP_H_MM/2 * s} num={10} color={C_FRAME}/>
      <rect x={p + gapX * s} y={topY + h - PN_GAP_H_MM * s} width={PN_GAP_W_MM * s} height={PN_GAP_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (gapX + GKL_GAP_MM/2) * s} y={topY + h - PN_GAP_H_MM/2 * s} num={10} color={C_FRAME}/>
      <text x={p + (gapX + GKL_GAP_MM/2) * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={7}>ПН 75</text>

      {/* ЛДСП панели (№1) */}
      <rect x={p - PANEL_T_MM * s} y={topY} width={PANEL_T_MM * s} height={h}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
      <SpecLabel x={p - PANEL_T_MM/2 * s} y={topY + h/2} num={1} color={C_PANEL}/>
      <rect x={p + (layer2X + PS_W_MM) * s} y={topY} width={PANEL_T_MM * s} height={h}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
      <SpecLabel x={p + (layer2X + PS_W_MM + PANEL_T_MM/2) * s} y={topY + h/2} num={1} color={C_PANEL}/>

      {/* Подписи сторон */}
      <text x={p - PANEL_T_MM * s - 5} y={topY + h/2} textAnchor="end" fill={C_TEXT_DIM} fontSize={8}>Лестница</text>
      <text x={p + (layer2X + PS_W_MM) * s + PANEL_T_MM * s + 5} y={topY + h/2} textAnchor="start" fill={C_WARDROBE} fontSize={8}>Спальня</text>

      {/* Размерные линии */}
      <HDim x1={p - PANEL_T_MM * s} x2={p} y={topY + h + 15} label={PANEL_T_MM} fontSize={8}/>
      <HDim x1={p} x2={p + PS_W_MM * s} y={topY + h + 15}
        color={C_FRAME} textColor={C_FRAME} label={PS_W_MM} fontSize={8}/>
      <HDim x1={p + gapX * s} x2={p + layer2X * s} y={topY + h + 15} label={GKL_GAP_MM} fontSize={8}/>
      <HDim x1={p + layer2X * s} x2={p + (layer2X + PS_W_MM) * s} y={topY + h + 15}
        color={C_FRAME} textColor={C_FRAME} label={PS_W_MM} fontSize={8}/>
      <HDim x1={p + (layer2X + PS_W_MM) * s} x2={p + (layer2X + PS_W_MM) * s + PANEL_T_MM * s} y={topY + h + 15}
        label={PANEL_T_MM} fontSize={8}/>

      {/* Общая толщина */}
      <HDim x1={p - PANEL_T_MM * s} x2={p + (layer2X + PS_W_MM) * s + PANEL_T_MM * s} y={topY + h + 35}
        label={PARTITION_T_MM + PANEL_T_MM * 2} fontSize={9}/>

      {/* Подпись */}
      <text x={w/2} y={topY + h + 55} textAnchor="middle" fill={C_TEXT_DIM} fontSize={9}>
        Внутри без ЛДСП (при обшивке останется 50мм для двери)
      </text>

      {/* Курсор */}
      <Crosshair mouse={mouse ?? null} area={area} />
    </svg>
  );
}
