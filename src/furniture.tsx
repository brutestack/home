// Библиотека компонентов мебели для плана этажа
import {
  C_BEDROOM, C_BEDROOM_FILL, C_BEDROOM_LIGHT, C_BEDROOM_DIM, C_BEDROOM_STROKE,
  C_WARDROBE, C_WARDROBE_FILL, C_WARDROBE_DIM,
  C_VANITY, C_VANITY_FILL, C_VANITY_DIM, C_VANITY_LIGHT, C_VANITY_STROKE,
  C_BATH, C_BATH_FILL, C_BATH_DIM, C_BATH_TRANS, C_BATH_LIGHT, C_BATH_FAINT,
  C_DIM, C_DIM_TRANS
} from "./colors";

interface FurnitureProps {
  p: number;  // padding
  s: number;  // scale
}

// Угловой диван L-формы
interface SofaProps extends FurnitureProps {
  x: number;
  y: number;
  length: number;
  shortSide: number;
  depth: number;
  H: number;
  gapBot: number;
}

export function Sofa({ p, s, x, y, length, shortSide, depth, H, gapBot }: SofaProps) {
  const r = 4;
  const sx = p + x * s;
  const sy1 = p + (H - gapBot - shortSide) * s;
  const sx2 = p + (x + depth) * s;
  const sy2 = p + (H - gapBot - depth) * s;
  const sx3 = p + (x + length) * s;
  const sy3 = p + (H - gapBot) * s;

  return (
    <>
      <path
        d={`M${sx + r},${sy1} L${sx2 - r},${sy1} A${r},${r} 0 0 1 ${sx2},${sy1 + r} L${sx2},${sy2 - r} A${r},${r} 0 0 0 ${sx2 + r},${sy2} L${sx3 - r},${sy2} A${r},${r} 0 0 1 ${sx3},${sy2 + r} L${sx3},${sy3 - r} A${r},${r} 0 0 1 ${sx3 - r},${sy3} L${sx + r},${sy3} A${r},${r} 0 0 1 ${sx},${sy3 - r} L${sx},${sy1 + r} A${r},${r} 0 0 1 ${sx + r},${sy1} Z`}
        fill={C_BEDROOM_FILL} stroke={C_BEDROOM} strokeWidth={1.5}
      />
      <line x1={sx} y1={sy3 - 4} x2={sx3} y2={sy3 - 4} stroke={C_BEDROOM_DIM} />
      <line x1={sx} y1={sy3 - 6} x2={sx} y2={sy3 - 2} stroke={C_BEDROOM_DIM} />
      <line x1={sx3} y1={sy3 - 6} x2={sx3} y2={sy3 - 2} stroke={C_BEDROOM_DIM} />
      <text x={(sx + sx3) / 2} y={sy3 - 8} textAnchor="middle" fill={C_BEDROOM} fontSize={7}>{(length * 1000).toFixed(0)}</text>
      <line x1={sx + 4} y1={sy1} x2={sx + 4} y2={sy3} stroke={C_BEDROOM_DIM} />
      <line x1={sx + 2} y1={sy1} x2={sx + 6} y2={sy1} stroke={C_BEDROOM_DIM} />
      <line x1={sx + 2} y1={sy3} x2={sx + 6} y2={sy3} stroke={C_BEDROOM_DIM} />
      <text x={sx + 12} y={(sy1 + sy3) / 2} fill={C_BEDROOM} fontSize={7} textAnchor="middle" transform={`rotate(-90,${sx + 12},${(sy1 + sy3) / 2})`}>{(shortSide * 1000).toFixed(0)}</text>
      <line x1={sx} y1={sy1 + 4} x2={sx2} y2={sy1 + 4} stroke={C_BEDROOM_DIM} />
      <line x1={sx} y1={sy1 + 2} x2={sx} y2={sy1 + 6} stroke={C_BEDROOM_DIM} />
      <line x1={sx2} y1={sy1 + 2} x2={sx2} y2={sy1 + 6} stroke={C_BEDROOM_DIM} />
      <text x={(sx + sx2) / 2} y={sy1 + 14} textAnchor="middle" fill={C_BEDROOM} fontSize={7}>{(depth * 1000).toFixed(0)}</text>
      <line x1={sx3 - 4} y1={sy2} x2={sx3 - 4} y2={sy3} stroke={C_BEDROOM_DIM} />
      <line x1={sx3 - 6} y1={sy2} x2={sx3 - 2} y2={sy2} stroke={C_BEDROOM_DIM} />
      <line x1={sx3 - 6} y1={sy3} x2={sx3 - 2} y2={sy3} stroke={C_BEDROOM_DIM} />
      <text x={sx3 - 12} y={(sy2 + sy3) / 2} fill={C_BEDROOM} fontSize={7} textAnchor="middle" transform={`rotate(-90,${sx3 - 12},${(sy2 + sy3) / 2})`}>{(depth * 1000).toFixed(0)}</text>
      <text x={(sx2 + sx3) / 2} y={(sy2 + sy3) / 2} textAnchor="middle" dominantBaseline="middle" fill={C_BEDROOM} fontSize={9}>диван</text>
    </>
  );
}

// Двухспальная кровать
interface BedProps extends FurnitureProps {
  x: number;
  y: number;
  width: number;
  length: number;
  W: number;
  gapRight: number;
}

export function Bed({ p, s, x, y, width, length, W, gapRight }: BedProps) {
  const bx = p + x * s;
  const by = p + y * s;
  const bw = width * s;
  const bh = length * s;

  return (
    <>
      <rect x={bx} y={by} width={bw} height={bh} fill={C_BEDROOM_LIGHT} stroke={C_BEDROOM} strokeWidth={1.5} rx={3} />
      <rect x={bx + 4} y={by + 4} width={bw / 2 - 6} height={bh * 0.15} fill={C_BEDROOM_FILL} stroke={C_BEDROOM_STROKE} strokeWidth={0.5} rx={2} />
      <rect x={bx + bw / 2 + 2} y={by + 4} width={bw / 2 - 6} height={bh * 0.15} fill={C_BEDROOM_FILL} stroke={C_BEDROOM_STROKE} strokeWidth={0.5} rx={2} />
      <line x1={bx} y1={by + bh * 0.22} x2={bx + bw} y2={by + bh * 0.22} stroke={C_BEDROOM_DIM} />
      <line x1={bx} y1={by + bh * 0.22 - 2} x2={bx} y2={by + bh * 0.22 + 2} stroke={C_BEDROOM_DIM} />
      <line x1={bx + bw} y1={by + bh * 0.22 - 2} x2={bx + bw} y2={by + bh * 0.22 + 2} stroke={C_BEDROOM_DIM} />
      <text x={bx + bw / 2} y={by + bh * 0.22 + 10} textAnchor="middle" fill={C_BEDROOM} fontSize={7}>{(width * 1000).toFixed(0)}</text>
      <line x1={bx + bw - 4} y1={by} x2={bx + bw - 4} y2={by + bh} stroke={C_BEDROOM_DIM} />
      <line x1={bx + bw - 6} y1={by} x2={bx + bw - 2} y2={by} stroke={C_BEDROOM_DIM} />
      <line x1={bx + bw - 6} y1={by + bh} x2={bx + bw - 2} y2={by + bh} stroke={C_BEDROOM_DIM} />
      <text x={bx + bw - 12} y={by + bh / 2} fill={C_BEDROOM} fontSize={7} textAnchor="middle" transform={`rotate(-90,${bx + bw - 12},${by + bh / 2})`}>{(length * 1000).toFixed(0)}</text>
      <text x={bx + bw / 2} y={by + bh * 0.6} textAnchor="middle" dominantBaseline="middle" fill={C_BEDROOM} fontSize={9}>кровать</text>
      <line x1={bx + bw} y1={by + bh / 2} x2={p + W * s} y2={by + bh / 2} stroke={C_DIM_TRANS} />
      <line x1={bx + bw} y1={by + bh / 2 - 2} x2={bx + bw} y2={by + bh / 2 + 2} stroke={C_DIM_TRANS} />
      <line x1={p + W * s} y1={by + bh / 2 - 2} x2={p + W * s} y2={by + bh / 2 + 2} stroke={C_DIM_TRANS} />
      <text x={(bx + bw + p + W * s) / 2} y={by + bh / 2 - 4} textAnchor="middle" fill={C_DIM} fontSize={7}>{(gapRight * 1000).toFixed(0)}</text>
    </>
  );
}

// Шкаф
interface WardrobeProps extends FurnitureProps {
  x: number;
  y: number;
  depth: number;
  length: number;
}

export function Wardrobe({ p, s, x, y, depth, length }: WardrobeProps) {
  const wx = p + x * s;
  const wy = p + y * s;
  const ww = depth * s;
  const wh = length * s;

  return (
    <>
      <rect x={wx} y={wy} width={ww} height={wh} fill={C_WARDROBE_FILL} stroke={C_WARDROBE} strokeWidth={1.5} rx={2} />
      <line x1={wx} y1={wy + 8} x2={wx + ww} y2={wy + 8} stroke={C_WARDROBE_DIM} />
      <line x1={wx} y1={wy + 6} x2={wx} y2={wy + 10} stroke={C_WARDROBE_DIM} />
      <line x1={wx + ww} y1={wy + 6} x2={wx + ww} y2={wy + 10} stroke={C_WARDROBE_DIM} />
      <text x={wx + ww / 2} y={wy + 18} textAnchor="middle" fill={C_WARDROBE} fontSize={7}>{(depth * 1000).toFixed(0)}</text>
      <line x1={wx + 4} y1={wy} x2={wx + 4} y2={wy + wh} stroke={C_WARDROBE_DIM} />
      <line x1={wx + 2} y1={wy} x2={wx + 6} y2={wy} stroke={C_WARDROBE_DIM} />
      <line x1={wx + 2} y1={wy + wh} x2={wx + 6} y2={wy + wh} stroke={C_WARDROBE_DIM} />
      <text x={wx + 12} y={wy + wh / 2} fill={C_WARDROBE} fontSize={7} textAnchor="middle" transform={`rotate(-90,${wx + 12},${wy + wh / 2})`}>{(length * 1000).toFixed(0)}</text>
      <text x={wx + ww / 2} y={wy + wh / 2} textAnchor="middle" dominantBaseline="middle" fill={C_WARDROBE} fontSize={8} transform={`rotate(-90,${wx + ww / 2},${wy + wh / 2})`}>шкаф</text>
    </>
  );
}

// Туалетный столик
interface VanityProps extends FurnitureProps {
  x: number;
  y: number;
  width: number;
  depth: number;
  wardrobeRight: number;
  bedLeft: number;
}

export function Vanity({ p, s, x, y, width, depth, wardrobeRight, bedLeft }: VanityProps) {
  const vx = p + x * s;
  const vy = p + y * s;
  const vw = width * s;
  const vh = depth * s;
  const shelfRight = p + wardrobeRight * s;
  const bedLeftPx = p + bedLeft * s;
  const distLeft = (x - wardrobeRight) * 1000;
  const distRight = (bedLeft - x - width) * 1000;

  return (
    <>
      <rect x={vx} y={vy} width={vw} height={vh} fill={C_VANITY_FILL} stroke={C_VANITY} strokeWidth={1.5} rx={2} />
      <ellipse cx={vx + vw / 2} cy={vy + 2} rx={vw * 0.35} ry={8} fill="none" stroke={C_VANITY_STROKE} strokeWidth={1} />
      <line x1={vx} y1={vy + vh - 6} x2={vx + vw} y2={vy + vh - 6} stroke={C_VANITY_DIM} />
      <line x1={vx} y1={vy + vh - 8} x2={vx} y2={vy + vh - 4} stroke={C_VANITY_DIM} />
      <line x1={vx + vw} y1={vy + vh - 8} x2={vx + vw} y2={vy + vh - 4} stroke={C_VANITY_DIM} />
      <text x={vx + vw / 2} y={vy + vh - 10} textAnchor="middle" fill={C_VANITY} fontSize={7}>{(width * 1000).toFixed(0)}</text>
      <line x1={vx + vw - 4} y1={vy} x2={vx + vw - 4} y2={vy + vh} stroke={C_VANITY_DIM} />
      <line x1={vx + vw - 6} y1={vy} x2={vx + vw - 2} y2={vy} stroke={C_VANITY_DIM} />
      <line x1={vx + vw - 6} y1={vy + vh} x2={vx + vw - 2} y2={vy + vh} stroke={C_VANITY_DIM} />
      <text x={vx + vw - 10} y={vy + vh / 2 + 3} fill={C_VANITY} fontSize={7}>{(depth * 1000).toFixed(0)}</text>
      <line x1={shelfRight} y1={vy + vh / 2} x2={vx} y2={vy + vh / 2} stroke={C_DIM_TRANS} />
      <line x1={shelfRight} y1={vy + vh / 2 - 2} x2={shelfRight} y2={vy + vh / 2 + 2} stroke={C_DIM_TRANS} />
      <line x1={vx} y1={vy + vh / 2 - 2} x2={vx} y2={vy + vh / 2 + 2} stroke={C_DIM_TRANS} />
      <text x={(shelfRight + vx) / 2} y={vy + vh / 2 - 4} textAnchor="middle" fill={C_DIM} fontSize={7}>{distLeft.toFixed(0)}</text>
      <line x1={vx + vw} y1={vy + vh / 2} x2={bedLeftPx} y2={vy + vh / 2} stroke={C_DIM_TRANS} />
      <line x1={vx + vw} y1={vy + vh / 2 - 2} x2={vx + vw} y2={vy + vh / 2 + 2} stroke={C_DIM_TRANS} />
      <line x1={bedLeftPx} y1={vy + vh / 2 - 2} x2={bedLeftPx} y2={vy + vh / 2 + 2} stroke={C_DIM_TRANS} />
      <text x={(vx + vw + bedLeftPx) / 2} y={vy + vh / 2 - 4} textAnchor="middle" fill={C_DIM} fontSize={7}>{distRight.toFixed(0)}</text>
    </>
  );
}

// Кресло
interface ChairProps extends FurnitureProps {
  x: number;
  y: number;
  width: number;
  depth: number;
}

export function Chair({ p, s, x, y, width, depth }: ChairProps) {
  const cx = p + x * s;
  const cy = p + y * s;
  const cw = width * s;
  const ch = depth * s;

  return (
    <>
      <rect x={cx} y={cy} width={cw} height={ch} fill={C_VANITY_FILL} stroke={C_VANITY} strokeWidth={1.5} rx={4} />
      <rect x={cx + 4} y={cy + ch - ch * 0.15 - 2} width={cw - 8} height={ch * 0.15} fill={C_VANITY_LIGHT} stroke={C_VANITY_STROKE} strokeWidth={0.5} rx={2} />
      <rect x={cx + 2} y={cy + ch * 0.15} width={cw * 0.12} height={ch * 0.7} fill={C_VANITY_LIGHT} stroke={C_VANITY_STROKE} strokeWidth={0.5} rx={2} />
      <rect x={cx + cw - 2 - cw * 0.12} y={cy + ch * 0.15} width={cw * 0.12} height={ch * 0.7} fill={C_VANITY_LIGHT} stroke={C_VANITY_STROKE} strokeWidth={0.5} rx={2} />
      <line x1={cx} y1={cy + 6} x2={cx + cw} y2={cy + 6} stroke={C_VANITY_DIM} />
      <line x1={cx} y1={cy + 4} x2={cx} y2={cy + 8} stroke={C_VANITY_DIM} />
      <line x1={cx + cw} y1={cy + 4} x2={cx + cw} y2={cy + 8} stroke={C_VANITY_DIM} />
      <text x={cx + cw / 2} y={cy + 18} textAnchor="middle" fill={C_VANITY} fontSize={7}>{(width * 1000).toFixed(0)}</text>
      <line x1={cx + cw - 6} y1={cy} x2={cx + cw - 6} y2={cy + ch} stroke={C_VANITY_DIM} />
      <line x1={cx + cw - 8} y1={cy} x2={cx + cw - 4} y2={cy} stroke={C_VANITY_DIM} />
      <line x1={cx + cw - 8} y1={cy + ch} x2={cx + cw - 4} y2={cy + ch} stroke={C_VANITY_DIM} />
      <text x={cx + cw - 14} y={cy + ch / 2} fill={C_VANITY} fontSize={7} textAnchor="middle" transform={`rotate(-90,${cx + cw - 14},${cy + ch / 2})`}>{(depth * 1000).toFixed(0)}</text>
      <text x={cx + cw / 2} y={cy + ch - ch * 0.15 - 6} textAnchor="middle" fill={C_VANITY} fontSize={8}>кресло</text>
    </>
  );
}

// Ванна
interface BathtubProps extends FurnitureProps {
  x: number;
  y: number;
  width: number;
  length: number;
}

export function Bathtub({ p, s, x, y, width, length }: BathtubProps) {
  const bathX = p + x * s;
  const bathY = p + y * s;
  const bathW = width * s;
  const bathH = length * s;

  return (
    <>
      <rect x={bathX} y={bathY} width={bathW} height={bathH} fill={C_BATH_FILL} stroke={C_BATH} strokeWidth={1.5} rx={3} />
      <line x1={bathX} y1={bathY + 4} x2={bathX + bathW} y2={bathY + 4} stroke={C_BATH_DIM} />
      <line x1={bathX} y1={bathY + 2} x2={bathX} y2={bathY + 6} stroke={C_BATH_DIM} />
      <line x1={bathX + bathW} y1={bathY + 2} x2={bathX + bathW} y2={bathY + 6} stroke={C_BATH_DIM} />
      <text x={bathX + bathW / 2} y={bathY + 14} textAnchor="middle" fill={C_BATH} fontSize={7}>{(width * 1000).toFixed(0)}</text>
      <line x1={bathX + bathW - 4} y1={bathY} x2={bathX + bathW - 4} y2={bathY + bathH} stroke={C_BATH_DIM} />
      <line x1={bathX + bathW - 6} y1={bathY} x2={bathX + bathW - 2} y2={bathY} stroke={C_BATH_DIM} />
      <line x1={bathX + bathW - 6} y1={bathY + bathH} x2={bathX + bathW - 2} y2={bathY + bathH} stroke={C_BATH_DIM} />
      <text x={bathX + bathW - 12} y={bathY + bathH / 2} fill={C_BATH} fontSize={7} textAnchor="middle" transform={`rotate(-90,${bathX + bathW - 12},${bathY + bathH / 2})`}>{(length * 1000).toFixed(0)}</text>
      <text x={bathX + bathW / 2} y={bathY + bathH / 2} textAnchor="middle" dominantBaseline="middle" fill={C_BATH} fontSize={8} transform={`rotate(-90,${bathX + bathW / 2},${bathY + bathH / 2})`}>ванна</text>
    </>
  );
}

// Угловая тумба с раковиной
interface SinkCabinetProps extends FurnitureProps {
  x: number;
  y: number;
  size: number;
}

export function SinkCabinet({ p, s, x, y, size }: SinkCabinetProps) {
  const sinkX = p + x * s;
  const sinkY = p + y * s;
  const sz = size * s;

  return (
    <>
      <path d={`M${sinkX},${sinkY} L${sinkX + sz * 0.6},${sinkY} L${sinkX + sz},${sinkY + sz * 0.4} L${sinkX + sz},${sinkY + sz} L${sinkX},${sinkY + sz} Z`} fill={C_BATH_FILL} stroke={C_BATH} strokeWidth={1.5} />
      <circle cx={sinkX + sz * 0.35} cy={sinkY + sz * 0.65} r={sz * 0.25} fill={C_BATH_FAINT} stroke={C_BATH} strokeWidth={1} />
      <line x1={sinkX} y1={sinkY + sz - 4} x2={sinkX + sz} y2={sinkY + sz - 4} stroke={C_BATH_DIM} />
      <line x1={sinkX} y1={sinkY + sz - 6} x2={sinkX} y2={sinkY + sz - 2} stroke={C_BATH_DIM} />
      <line x1={sinkX + sz} y1={sinkY + sz - 6} x2={sinkX + sz} y2={sinkY + sz - 2} stroke={C_BATH_DIM} />
      <text x={sinkX + sz / 2} y={sinkY + sz - 8} textAnchor="middle" fill={C_BATH} fontSize={7}>{(size * 1000).toFixed(0)}</text>
    </>
  );
}

// Унитаз с зоной комфорта
interface ToiletProps extends FurnitureProps {
  x: number;
  y: number;
  length: number;
  width: number;
  tankDepth: number;
  comfort: number;
  gklBottomY: number;
  bathLeftX: number;
}

export function Toilet({ p, s, x, y, length, width, tankDepth, comfort, gklBottomY, bathLeftX }: ToiletProps) {
  const wcY = p + y * s;
  const wcTankX = p + x * s;
  const wcBowlX = wcTankX + tankDepth * s;
  const wcRightX = wcTankX + length * s;
  const bowlW = (length - tankDepth) * s;
  const tankW = tankDepth * s;
  const wcH = width * s;
  const comfortPx = comfort * s;
  const gklBottomPx = p + gklBottomY * s;
  const bathLeftPx = p + bathLeftX * s;
  const distToGkl = (y - comfort - gklBottomY) * 1000;
  const distToBath = (bathLeftX - x - length) * 1000;

  return (
    <>
      <rect x={wcTankX} y={wcY - comfortPx} width={length * s + comfortPx} height={wcH + comfortPx * 2} fill="none" stroke={C_BATH_LIGHT} strokeWidth={1} strokeDasharray="4 2" rx={3} />
      <line x1={wcTankX + 4} y1={wcY - comfortPx} x2={wcTankX + 4} y2={wcY + wcH + comfortPx} stroke={C_BATH_DIM} />
      <line x1={wcTankX + 2} y1={wcY - comfortPx} x2={wcTankX + 6} y2={wcY - comfortPx} stroke={C_BATH_DIM} />
      <line x1={wcTankX + 2} y1={wcY + wcH + comfortPx} x2={wcTankX + 6} y2={wcY + wcH + comfortPx} stroke={C_BATH_DIM} />
      <text x={wcTankX + 12} y={wcY + wcH / 2} fill={C_BATH} fontSize={7} textAnchor="middle" transform={`rotate(-90,${wcTankX + 12},${wcY + wcH / 2})`}>{(width * 1000 + 500).toFixed(0)}</text>
      <line x1={wcTankX} y1={wcY - comfortPx + 4} x2={wcBowlX + bowlW} y2={wcY - comfortPx + 4} stroke={C_BATH_DIM} />
      <line x1={wcTankX} y1={wcY - comfortPx + 2} x2={wcTankX} y2={wcY - comfortPx + 6} stroke={C_BATH_DIM} />
      <line x1={wcBowlX + bowlW} y1={wcY - comfortPx + 2} x2={wcBowlX + bowlW} y2={wcY - comfortPx + 6} stroke={C_BATH_DIM} />
      <text x={wcTankX + length * s / 2} y={wcY - comfortPx + 14} textAnchor="middle" fill={C_BATH} fontSize={7}>{(length * 1000).toFixed(0)}</text>
      <rect x={wcTankX} y={wcY} width={tankW} height={wcH} fill={C_BATH_FILL} stroke={C_BATH} strokeWidth={1} rx={2} />
      <rect x={wcBowlX} y={wcY} width={bowlW} height={wcH} fill={C_BATH_FILL} stroke={C_BATH} strokeWidth={1.5} ry={wcH / 2} />
      <text x={wcBowlX + bowlW / 2} y={wcY + wcH / 2} textAnchor="middle" dominantBaseline="middle" fill={C_BATH} fontSize={7}>WC</text>
      <line x1={wcTankX + length * s / 2} y1={gklBottomPx} x2={wcTankX + length * s / 2} y2={wcY - comfortPx} stroke={C_BATH_TRANS} />
      <line x1={wcTankX + length * s / 2 - 2} y1={gklBottomPx} x2={wcTankX + length * s / 2 + 2} y2={gklBottomPx} stroke={C_BATH_TRANS} />
      <line x1={wcTankX + length * s / 2 - 2} y1={wcY - comfortPx} x2={wcTankX + length * s / 2 + 2} y2={wcY - comfortPx} stroke={C_BATH_TRANS} />
      <text x={wcTankX + length * s / 2 + 4} y={(gklBottomPx + (wcY - comfortPx)) / 2 + 3} fill={C_BATH} fontSize={8}>{distToGkl.toFixed(0)}</text>
      <line x1={wcRightX} y1={wcY + wcH / 2} x2={bathLeftPx} y2={wcY + wcH / 2} stroke={C_BATH_TRANS} />
      <line x1={wcRightX} y1={wcY + wcH / 2 - 2} x2={wcRightX} y2={wcY + wcH / 2 + 2} stroke={C_BATH_TRANS} />
      <line x1={bathLeftPx} y1={wcY + wcH / 2 - 2} x2={bathLeftPx} y2={wcY + wcH / 2 + 2} stroke={C_BATH_TRANS} />
      <text x={(wcRightX + bathLeftPx) / 2} y={wcY + wcH / 2 - 4} textAnchor="middle" fill={C_BATH} fontSize={8}>{distToBath.toFixed(0)}</text>
    </>
  );
}
