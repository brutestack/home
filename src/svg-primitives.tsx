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

// Номер стойки в кружке
export function StudLabel({ x, y, num, r = 10, color = "#8B4513", fontSize = 10 }: {
  x: number; y: number; num: number;
  r?: number; color?: string; fontSize?: number;
}) {
  return <>
    <circle cx={x} cy={y} r={r} fill={color} fillOpacity={0.85}/>
    <text x={x} y={y + fontSize * 0.35} textAnchor="middle" fill="white" fontSize={fontSize} fontWeight="bold">{num}</text>
  </>;
}

// Номер элемента спецификации (квадрат с номером)
export function SpecLabel({ x, y, num, size = 16, color = "#4fc3f7", fontSize = 10, highlighted = false }: {
  x: number; y: number; num: number;
  size?: number; color?: string; fontSize?: number; highlighted?: boolean;
}) {
  const half = size / 2;
  const scale = highlighted ? 1.3 : 1;
  return <g transform={`translate(${x}, ${y}) scale(${scale}) translate(${-x}, ${-y})`}>
    <rect x={x - half} y={y - half} width={size} height={size} rx={2}
      fill={color} fillOpacity={highlighted ? 1 : 0.9} stroke="white" strokeWidth={highlighted ? 1.5 : 0.5}/>
    <text x={x} y={y + fontSize * 0.35} textAnchor="middle" fill="white" fontSize={fontSize} fontWeight="bold">{num}</text>
  </g>;
}

// Группа элементов с одинаковым номером спецификации (подсвечивается при наведении)
export function SpecGroup({ specNum, hoveredSpec, setHoveredSpec, children, highlightColor = "#fff" }: {
  specNum: number;
  hoveredSpec: number | null;
  setHoveredSpec: (num: number | null) => void;
  children: React.ReactNode;
  highlightColor?: string;
}) {
  const isHighlighted = hoveredSpec === specNum;
  return (
    <g
      onMouseEnter={() => setHoveredSpec(specNum)}
      onMouseLeave={() => setHoveredSpec(null)}
      style={{ cursor: "pointer" }}
      filter={isHighlighted ? "url(#specHighlight)" : undefined}
      opacity={hoveredSpec !== null && !isHighlighted ? 0.4 : 1}
    >
      {children}
    </g>
  );
}

// SVG фильтр для подсветки элементов спецификации (добавить в <defs> SVG)
export function SpecHighlightFilter() {
  return (
    <filter id="specHighlight" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#fff" floodOpacity="0.8"/>
    </filter>
  );
}

// === Интерактивный курсор (перекрестье с координатами) ===

import { C_TOOLTIP_BG } from "./colors";

// Тип для позиции мыши
export interface MousePos {
  x: number;  // координата X в мм
  y: number;  // координата Y в мм (от пола)
}

// Параметры области схемы
export interface SchemaArea {
  padding: number;     // отступ от края SVG (px)
  scale: number;       // масштаб (px/мм)
  width: number;       // ширина области в мм
  height: number;      // высота области в мм
  svgWidth: number;    // ширина SVG (px)
  invertY?: boolean;   // инвертировать Y (true = 0 снизу, false = 0 сверху)
}

// Компонент перекрестья с координатами
export function Crosshair({ mouse, area }: {
  mouse: MousePos | null;
  area: SchemaArea;
}) {
  if (!mouse) return null;

  const { padding: p, scale: s, width, height, invertY = true } = area;
  const screenY = invertY ? (height - mouse.y) * s : mouse.y * s;

  return <>
    {/* Вертикальная линия */}
    <line
      x1={p + mouse.x * s} y1={p}
      x2={p + mouse.x * s} y2={p + height * s}
      stroke={C_DIM + "44"} strokeDasharray="4"/>
    {/* Горизонтальная линия */}
    <line
      x1={p} y1={p + screenY}
      x2={p + width * s} y2={p + screenY}
      stroke={C_DIM + "44"} strokeDasharray="4"/>
    {/* Подсказка с координатами */}
    <rect
      x={p + mouse.x * s + 10} y={p + screenY - 26}
      width={90} height={22} rx={4} fill={C_TOOLTIP_BG}/>
    <text
      x={p + mouse.x * s + 14} y={p + screenY - 10}
      fill={C_DIM} fontSize={11}>
      {mouse.x.toFixed(0)}×{mouse.y.toFixed(0)}
    </text>
  </>;
}

// Создаёт обработчик движения мыши для SVG схемы
export function createMouseHandler(
  area: SchemaArea,
  onMouseMove: (pos: MousePos | null) => void
) {
  return (e: React.MouseEvent<SVGSVGElement>) => {
    const { padding: p, scale: s, width, height, svgWidth, invertY = true } = area;
    const r = e.currentTarget.getBoundingClientRect();
    const svgScale = svgWidth / r.width;
    const x = (e.clientX - r.left) * svgScale - p;
    const y = (e.clientY - r.top) * svgScale - p;

    if (x >= 0 && x <= width * s && y >= 0 && y <= height * s) {
      const mmX = x / s;
      const mmY = invertY ? height - y / s : y / s;
      onMouseMove({ x: mmX, y: mmY });
    } else {
      onMouseMove(null);
    }
  };
}
