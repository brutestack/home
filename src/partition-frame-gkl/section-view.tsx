import { HDim, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  GKL_THICKNESS_MM, GKL_GAP_MM, PS_W_MM, PN_GAP_W_MM, PN_GAP_H_MM, PARTITION_T_MM, S_SECTION
} from "../constants";
import {
  C_BG_SVG, C_TEXT_DIM, C_COLUMN_TEXT, C_WARDROBE,
  C_FRAME, C_FRAME_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL
} from "../colors";

export function SectionView({ onMouseMove, mouse }: {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}) {
  const w = 420;
  const svgH = 420;
  const s = S_SECTION;
  const h = 300;
  const topY = 55;

  const layer1X = 0;
  const gapX = PS_W_MM;
  const layer2X = PS_W_MM + GKL_GAP_MM;

  const schemaW = (layer2X + PS_W_MM + GKL_THICKNESS_MM * 2) * s;
  const p = (w - schemaW) / 2 + GKL_THICKNESS_MM * s;

  // Область для курсора
  const totalWidthMm = layer2X + PS_W_MM + GKL_THICKNESS_MM * 2;
  const heightMm = h / s;
  const area: SchemaArea = {
    paddingX: p - GKL_THICKNESS_MM * s,
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
        Л4.Сх3 — Разрез двойной перегородки
      </text>
      <text x={w/2} y={34} textAnchor="middle" fill={C_TEXT_DIM} fontSize={10}>
        ГКЛ {GKL_THICKNESS_MM} мм в 1 слой | ПН 75 между слоями
      </text>

      {/* Слой 1 */}
      <rect x={p + layer1X * s} y={topY} width={PS_W_MM * s} height={h}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <text x={p + PS_W_MM/2 * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={8}>ПС</text>

      {/* Зазор — профиль ПН 75 на полу и потолке */}
      <rect x={p + gapX * s} y={topY} width={GKL_GAP_MM * s} height={h}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>
      {/* ПН 75 на потолке */}
      <rect x={p + gapX * s} y={topY} width={PN_GAP_W_MM * s} height={PN_GAP_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      {/* ПН 75 на полу */}
      <rect x={p + gapX * s} y={topY + h - PN_GAP_H_MM * s} width={PN_GAP_W_MM * s} height={PN_GAP_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <text x={p + (gapX + GKL_GAP_MM/2) * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={7}>ПН 75</text>
      <SpecLabel x={p + (gapX + GKL_GAP_MM/2) * s} y={topY + h/2 + 25} num={8} color={C_FRAME}/>

      {/* Слой 2 */}
      <rect x={p + layer2X * s} y={topY} width={PS_W_MM * s} height={h}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <text x={p + (layer2X + PS_W_MM/2) * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={8}>ПС</text>

      {/* ГКЛ слева */}
      <rect x={p - GKL_THICKNESS_MM * s} y={topY} width={GKL_THICKNESS_MM * s} height={h}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>

      {/* ГКЛ справа */}
      <rect x={p + (layer2X + PS_W_MM) * s} y={topY} width={GKL_THICKNESS_MM * s} height={h}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>

      {/* Подписи */}
      <text x={p - GKL_THICKNESS_MM * s - 5} y={topY + h/2} textAnchor="end" fill={C_TEXT_DIM} fontSize={8}>Лестница</text>
      <text x={p + (layer2X + PS_W_MM) * s + GKL_THICKNESS_MM * s + 5} y={topY + h/2} textAnchor="start" fill={C_WARDROBE} fontSize={8}>Спальня</text>

      {/* Размерные линии */}
      <HDim x1={p - GKL_THICKNESS_MM * s} x2={p} y={topY + h + 15}
        label={GKL_THICKNESS_MM} fontSize={8}/>
      <HDim x1={p} x2={p + PS_W_MM * s} y={topY + h + 15}
        color={C_FRAME} textColor={C_FRAME} label={PS_W_MM} fontSize={8}/>
      <HDim x1={p + gapX * s} x2={p + layer2X * s} y={topY + h + 15}
        label={GKL_GAP_MM} fontSize={8}/>
      <HDim x1={p + layer2X * s} x2={p + (layer2X + PS_W_MM) * s} y={topY + h + 15}
        color={C_FRAME} textColor={C_FRAME} label={PS_W_MM} fontSize={8}/>
      <HDim x1={p + (layer2X + PS_W_MM) * s} x2={p + (layer2X + PS_W_MM) * s + GKL_THICKNESS_MM * s} y={topY + h + 15}
        label={GKL_THICKNESS_MM} fontSize={8}/>

      {/* Общая толщина */}
      <HDim x1={p - GKL_THICKNESS_MM * s} x2={p + (layer2X + PS_W_MM) * s + GKL_THICKNESS_MM * s} y={topY + h + 35}
        label={PARTITION_T_MM + GKL_THICKNESS_MM * 2} fontSize={9}/>

      <text x={w/2} y={topY + h + 55} textAnchor="middle" fill={C_TEXT_DIM} fontSize={9}>
        При обшивке ГКЛ 12.5мм внутри останется 50мм для двери
      </text>

      {/* Курсор */}
      <Crosshair mouse={mouse ?? null} area={area} />
    </svg>
  );
}
