import { HDim, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import { PS_W_MM, PANEL_T_MM, HORIZ_T_MM } from "../constants";
import { C_BG_SVG, C_TEXT_DIM, C_COLUMN_TEXT, C_WARDROBE, C_FRAME, C_FRAME_FILL, C_PANEL, C_PANEL_FILL, C_DOOR_OPENING } from "../colors";

export function HorizSectionView({ onMouseMove, mouse }: {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}) {
  const w = 408;
  const svgH = 420;
  const s = 1.7;
  const h = 300;
  const topY = 55;

  const schemaW = (PS_W_MM + PANEL_T_MM * 2) * s;
  const p = (w - schemaW) / 2 + PANEL_T_MM * s;

  // Область для курсора
  const totalWidthMm = PS_W_MM + PANEL_T_MM * 2;
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
        Л3.Сх4 — Разрез горизонтальной части
      </text>
      <text x={w/2} y={34} textAnchor="middle" fill={C_TEXT_DIM} fontSize={10}>
        Одинарная 50 мм, ЛДСП с двух сторон
      </text>

      {/* ЛДСП панели горизонтальной части (№3) — слева */}
      <rect x={p - PANEL_T_MM * s} y={topY} width={PANEL_T_MM * s} height={h}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
      <SpecLabel x={p - PANEL_T_MM/2 * s} y={topY + h/2} num={3} color={C_PANEL}/>

      {/* Каркас ПС (№11) */}
      <rect x={p} y={topY} width={PS_W_MM * s} height={h}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <text x={p + PS_W_MM/2 * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={9}>ПС</text>
      <SpecLabel x={p + PS_W_MM/2 * s} y={topY + h/2 + 25} num={11} color={C_FRAME}/>

      {/* ЛДСП справа (сторона шкафа) — тот же элемент №3 */}
      <rect x={p + PS_W_MM * s} y={topY} width={PANEL_T_MM * s} height={h}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
      <SpecLabel x={p + PS_W_MM * s + PANEL_T_MM/2 * s} y={topY + h/2} num={3} color={C_PANEL}/>

      {/* Подписи сторон */}
      <text x={p - PANEL_T_MM * s - 5} y={topY + h/2} textAnchor="end" fill={C_DOOR_OPENING} fontSize={8}>Проём</text>
      <text x={p + PS_W_MM * s + PANEL_T_MM * s + 5} y={topY + h/2} textAnchor="start" fill={C_WARDROBE} fontSize={8}>Шкаф</text>

      {/* Размерные линии */}
      <HDim x1={p - PANEL_T_MM * s} x2={p} y={topY + h + 15} label={PANEL_T_MM} fontSize={8}/>
      <HDim x1={p} x2={p + PS_W_MM * s} y={topY + h + 15}
        color={C_FRAME} textColor={C_FRAME} label={PS_W_MM} fontSize={8}/>
      <HDim x1={p + PS_W_MM * s} x2={p + PS_W_MM * s + PANEL_T_MM * s} y={topY + h + 15} label={PANEL_T_MM} fontSize={8}/>

      {/* Общая толщина */}
      <HDim x1={p - PANEL_T_MM * s} x2={p + PS_W_MM * s + PANEL_T_MM * s} y={topY + h + 35}
        label={HORIZ_T_MM + PANEL_T_MM * 2} fontSize={9}/>

      {/* Курсор */}
      <Crosshair mouse={mouse ?? null} area={area} />
    </svg>
  );
}
