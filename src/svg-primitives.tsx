import { C_DIM, C_DIM_TRANS, C_GKL, C_GKL_BORDER, C_BG } from "./colors";

// Горизонтальная размерная линия с засечками
export function HDim({ x1, x2, y, color = C_DIM_TRANS, textColor = C_DIM, fontSize = 9, label, labelY }: {
  x1: number; x2: number; y: number;
  color?: string; textColor?: string; fontSize?: number;
  label: string | number; labelY?: number;
}) {
  const ty = labelY ?? y - 4;
  return <>
    <line x1={x1} y1={y} x2={x2} y2={y} stroke={color}/>
    <line x1={x1} y1={y-2} x2={x1} y2={y+2} stroke={color}/>
    <line x1={x2} y1={y-2} x2={x2} y2={y+2} stroke={color}/>
    <text x={(x1+x2)/2} y={ty} textAnchor="middle" fill={textColor} fontSize={fontSize}>{label}</text>
  </>;
}

// Вертикальная размерная линия с засечками
export function VDim({ x, y1, y2, color = C_DIM_TRANS, textColor = C_DIM, fontSize = 9, label, labelX, rotate }: {
  x: number; y1: number; y2: number;
  color?: string; textColor?: string; fontSize?: number;
  label: string | number; labelX?: number; rotate?: boolean;
}) {
  const tx = labelX ?? x - 4;
  const ty = (y1 + y2) / 2;
  const anchor = labelX !== undefined && labelX > x ? "start" : "end";
  return <>
    <line x1={x} y1={y1} x2={x} y2={y2} stroke={color}/>
    <line x1={x-2} y1={y1} x2={x+2} y2={y1} stroke={color}/>
    <line x1={x-2} y1={y2} x2={x+2} y2={y2} stroke={color}/>
    {rotate ? (
      <text x={tx} y={ty} textAnchor={anchor} fill={textColor} fontSize={fontSize}
        transform={`rotate(${labelX !== undefined && labelX > x ? 90 : -90},${tx},${ty})`}>{label}</text>
    ) : (
      <text x={tx} y={ty + 3} textAnchor={anchor} fill={textColor} fontSize={fontSize}>{label}</text>
    )}
  </>;
}

// ГКЛ панель (пунктирная рамка)
export function GklPanel({ x, y, width, height }: {
  x: number; y: number; width: number; height: number;
}) {
  return <rect x={x} y={y} width={width} height={height}
    fill={C_GKL} stroke={C_GKL_BORDER} strokeWidth={1} strokeDasharray="4 2"/>;
}

// Оконная рама с разрезом стены
export function WindowFrame({ x, y, width, height, wallX, wallY1, wallY2, label, labelX, labelY, vertical, rotate }: {
  x: number; y: number; width: number; height: number;
  wallX: number; wallY1: number; wallY2: number;
  label: string; labelX: number; labelY: number;
  vertical?: boolean; rotate?: number;
}) {
  return <>
    <rect x={x} y={y} width={width} height={height} fill={C_DIM} stroke={C_DIM} strokeWidth={1}/>
    {vertical ? (
      <line x1={wallX} y1={wallY1} x2={wallX} y2={wallY2} stroke={C_BG} strokeWidth={2}/>
    ) : (
      <line x1={wallY1} y1={wallX} x2={wallY2} y2={wallX} stroke={C_BG} strokeWidth={2}/>
    )}
    {rotate !== undefined ? (
      <text x={labelX} y={labelY} textAnchor="middle" fill={C_DIM} fontSize={8}
        transform={`rotate(${rotate},${labelX},${labelY})`}>{label}</text>
    ) : (
      <text x={labelX} y={labelY} textAnchor="middle" fill={C_DIM} fontSize={8}>{label}</text>
    )}
  </>;
}

// Крестик проёма (две диагональные линии)
export function DoorwayCross({ x1, y1, x2, y2, color }: {
  x1: number; y1: number; x2: number; y2: number; color: string;
}) {
  return <>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1}/>
    <line x1={x1} y1={y2} x2={x2} y2={y1} stroke={color} strokeWidth={1}/>
  </>;
}
