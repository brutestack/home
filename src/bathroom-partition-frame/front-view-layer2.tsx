import { HDim, VDim, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  CEILING_H_MM, GKL_SHEET_W_MM, GKL_SHEET_H_MM,
  BATH_TOTAL_LEN_MM, BATH_DOOR_END_MM,
  S_FRONT, FRONT_W, FRONT_H
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT,
  C_GKL_LAYER2, C_GKL_LAYER2_FILL, C_GKL_PANEL, C_DOOR_OPENING
} from "../colors";

interface FrontViewLayer2Props {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}

export function FrontViewLayer2({ onMouseMove, mouse }: FrontViewLayer2Props) {
  const p = 70;
  const s = S_FRONT;

  const area: SchemaArea = {
    padding: p, scale: s, width: BATH_TOTAL_LEN_MM, height: CEILING_H_MM, svgWidth: FRONT_W
  };

  // 2-й слой покрывает область правее двери: от 950 до 2440 = 1490 мм
  // 1490 < 2500, поэтому вертикальных стыков нет — каждый ряд из одного куска
  const layer2Start = BATH_DOOR_END_MM; // 950
  const layer2W = BATH_TOTAL_LEN_MM - layer2Start; // 1490

  const rowH = GKL_SHEET_W_MM;              // 1200 мм
  const topH = CEILING_H_MM - rowH * 2;     // 400 мм

  // SVG Y: потолок = p, пол = p + CEILING_H_MM * s
  const svgY = (mmFromFloor: number) => p + (CEILING_H_MM - mmFromFloor) * s;

  const rows: { yFloor: number; h: number }[] = [
    { yFloor: 0,         h: rowH },
    { yFloor: rowH,      h: rowH },
    { yFloor: rowH * 2,  h: topH },
  ];

  return (
    <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л5.Сх2 — 2-й слой ГКЛ со стороны ванной (горизонтальный)
      </text>

      {/* Контур помещения */}
      <rect x={p} y={p} width={BATH_TOTAL_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BATH_TOTAL_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BATH_TOTAL_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Зона двери (только 1 слой) */}
      <rect x={p} y={p} width={layer2Start * s} height={CEILING_H_MM * s}
        fill={C_TEXT_DIM + "11"} stroke="none"/>
      <text x={p + layer2Start/2 * s} y={p + CEILING_H_MM/2 * s}
        textAnchor="middle" fill={C_TEXT_DIM} fontSize={9}>зона двери</text>
      <text x={p + layer2Start/2 * s} y={p + CEILING_H_MM/2 * s + 14}
        textAnchor="middle" fill={C_TEXT_DIM} fontSize={8}>(только 1-й слой)</text>

      {/* Стыки 1-го слоя (пунктирные, для контекста) */}
      {[975, 2175].map((x, i) => (
        <line key={`v1j${i}`} x1={p + x * s} y1={p} x2={p + x * s} y2={p + CEILING_H_MM * s}
          stroke={C_GKL_PANEL} strokeWidth={1} strokeDasharray="6 4" opacity={0.4}/>
      ))}
      <line x1={p + layer2Start * s} y1={svgY(GKL_SHEET_H_MM)} x2={p + BATH_TOTAL_LEN_MM * s} y2={svgY(GKL_SHEET_H_MM)}
        stroke={C_GKL_PANEL} strokeWidth={1} strokeDasharray="6 4" opacity={0.4}/>

      {/* Ряды 2-го слоя — без вертикальных стыков (1490 < 2500) */}
      {rows.map(({ yFloor, h }, ri) => {
        const yTop = svgY(yFloor + h);
        const isTop = ri === 2;
        const specNum = isTop ? 15 : 14;
        return (
          <g key={`row${ri}`}>
            <rect x={p + layer2Start * s} y={yTop} width={layer2W * s} height={h * s}
              fill={C_GKL_LAYER2_FILL} stroke={C_GKL_LAYER2} strokeWidth={2}/>
            <text x={p + (layer2Start + layer2W/2) * s} y={yTop + h/2 * s + 3}
              textAnchor="middle" fill={C_GKL_LAYER2} fontSize={isTop ? 8 : 9}>
              ГКЛ {layer2W}×{h}
            </text>
            <SpecLabel x={p + (layer2Start + layer2W/2) * s} y={yTop + (isTop ? h/2 * s - 14 : 25)} num={specNum} color={C_GKL_LAYER2}/>
          </g>
        );
      })}

      {/* Размерные линии */}
      <HDim x1={p} x2={p + BATH_TOTAL_LEN_MM * s} y={p - 20}
        label={BATH_TOTAL_LEN_MM} fontSize={10}/>

      <HDim x1={p} x2={p + layer2Start * s} y={p + CEILING_H_MM * s + 20}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={layer2Start} fontSize={8}/>
      <HDim x1={p + layer2Start * s} x2={p + BATH_TOTAL_LEN_MM * s} y={p + CEILING_H_MM * s + 20}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={layer2W} fontSize={8}/>

      {/* Вертикальные размеры */}
      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 15} y1={svgY(rowH)} y2={svgY(0)}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={rowH} fontSize={8} labelX={p + BATH_TOTAL_LEN_MM * s + 20}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 15} y1={svgY(rowH * 2)} y2={svgY(rowH)}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={rowH} fontSize={8} labelX={p + BATH_TOTAL_LEN_MM * s + 20}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 15} y1={p} y2={svgY(rowH * 2)}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={topH} fontSize={8} labelX={p + BATH_TOTAL_LEN_MM * s + 20}/>

      {/* Курсор */}
      <Crosshair mouse={mouse} area={area} />

    </svg>
  );
}
