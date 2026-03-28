import { HDim, VDim, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  CEILING_H_MM, GKL_SHEET_H_MM, GKL_SHEET_W_MM,
  BATH_VERT_LEN_MM, BATH_VERT_STUD_CENTERS,
  S_BATH_VERT
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT,
  C_GKL_LAYER2, C_GKL_LAYER2_FILL, C_GKL_PANEL
} from "../colors";

interface FrontViewLayer2Props {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}

export function FrontViewLayer2({ onMouseMove, mouse }: FrontViewLayer2Props) {
  const p = 70;
  const s = S_BATH_VERT;

  const svgW = BATH_VERT_LEN_MM * s + p * 2;
  const svgH = CEILING_H_MM * s + p * 2 + 60;

  const area: SchemaArea = {
    padding: p, scale: s, width: BATH_VERT_LEN_MM, height: CEILING_H_MM, svgWidth: svgW
  };

  // Стыки 2-го слоя чередуются (вразбежку, нет общего угла у 4 листов):
  //   1-й слой ванная: стыки осн. на 600/1800, доборки на 1000/2200 (выс. 2500–2800)
  //   Для рядов 1–2 (выс. 0–2400) свободны стойки 1000 и 1400
  //   Для ряда 3 (выс. 2400–2800) свободна стойка 1400
  const jointA = BATH_VERT_STUD_CENTERS[4]; // 1400 — ряды 1 и 3
  const jointB = BATH_VERT_STUD_CENTERS[3]; // 1000 — ряд 2

  const rowH = GKL_SHEET_W_MM;              // 1200 мм — высота ряда
  const topH = CEILING_H_MM - rowH * 2;     // 400 мм — верхний ряд

  // SVG Y: потолок = p, пол = p + CEILING_H_MM * s
  const svgY = (mmFromFloor: number) => p + (CEILING_H_MM - mmFromFloor) * s;

  // Ряды: [yОтПола, высота, стык]
  const rows: { yFloor: number; h: number; joint: number }[] = [
    { yFloor: 0,         h: rowH, joint: jointA },  // Ряд 1: стык 1400
    { yFloor: rowH,      h: rowH, joint: jointB },  // Ряд 2: стык 1000 (вразбежку)
    { yFloor: rowH * 2,  h: topH, joint: jointA },  // Ряд 3: стык 1400
  ];

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: svgW, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={svgW/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л6.Сх2 — 2-й слой ГКЛ со стороны ванной (горизонтальный)
      </text>

      {/* Контур помещения */}
      <rect x={p} y={p} width={BATH_VERT_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BATH_VERT_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BATH_VERT_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Нижняя стена (справа) */}
      <rect x={p + BATH_VERT_LEN_MM * s} y={p} width={10} height={CEILING_H_MM * s}
        fill={C_TEXT_DIM} stroke={C_TEXT} strokeWidth={1}/>
      <text x={p + BATH_VERT_LEN_MM * s + 18} y={p + CEILING_H_MM/2 * s}
        textAnchor="middle" fill={C_TEXT} fontSize={8} transform={`rotate(90,${p + BATH_VERT_LEN_MM * s + 18},${p + CEILING_H_MM/2 * s})`}>стена</text>

      {/* Стыки 1-го слоя ванной (пунктирные, для контекста) */}
      {[600, 1800].map((x, i) => (
        <line key={`v1j${i}`} x1={p + x * s} y1={p} x2={p + x * s} y2={p + CEILING_H_MM * s}
          stroke={C_GKL_PANEL} strokeWidth={1} strokeDasharray="6 4" opacity={0.4}/>
      ))}
      <line x1={p} y1={svgY(GKL_SHEET_H_MM)} x2={p + BATH_VERT_LEN_MM * s} y2={svgY(GKL_SHEET_H_MM)}
        stroke={C_GKL_PANEL} strokeWidth={1} strokeDasharray="6 4" opacity={0.4}/>

      {/* Ряды 2-го слоя */}
      {rows.map(({ yFloor, h, joint }, ri) => {
        const yTop = svgY(yFloor + h);
        const leftW = joint;
        const rightW = BATH_VERT_LEN_MM - joint;
        const isTop = ri === 2;
        const isMiddle = ri === 1;
        const specL = isTop ? 11 : (isMiddle ? 12 : 9);
        const specR = isTop ? 11 : (isMiddle ? 13 : 10);
        return (
          <g key={`row${ri}`}>
            {/* Левая часть */}
            <rect x={p} y={yTop} width={leftW * s} height={h * s}
              fill={C_GKL_LAYER2_FILL} stroke={C_GKL_LAYER2} strokeWidth={2}/>
            <text x={p + leftW/2 * s} y={yTop + h/2 * s + 3}
              textAnchor="middle" fill={C_GKL_LAYER2} fontSize={isTop ? 8 : 9}>
              {isTop ? `${leftW}×${h}` : `ГКЛ ${leftW}×${h}`}
            </text>
            <SpecLabel x={p + leftW/2 * s} y={yTop + (isTop ? h/2 * s - 14 : 25)} num={specL} color={C_GKL_LAYER2}/>

            {/* Правая часть */}
            <rect x={p + leftW * s} y={yTop} width={rightW * s} height={h * s}
              fill={C_GKL_LAYER2_FILL} stroke={C_GKL_LAYER2} strokeWidth={2}/>
            <text x={p + (leftW + rightW/2) * s} y={yTop + h/2 * s + 3}
              textAnchor="middle" fill={C_GKL_LAYER2} fontSize={isTop ? 8 : 9}>
              {isTop ? `${rightW}×${h}` : `ГКЛ ${rightW}×${h}`}
            </text>
            <SpecLabel x={p + (leftW + rightW/2) * s} y={yTop + (isTop ? h/2 * s - 14 : 25)} num={specR} color={C_GKL_LAYER2}/>
          </g>
        );
      })}

      {/* Размерные линии */}
      <HDim x1={p} x2={p + BATH_VERT_LEN_MM * s} y={p - 20}
        label={BATH_VERT_LEN_MM} fontSize={10}/>

      {/* Горизонтальные размеры — ряды 1,3 (стык 1400) */}
      <HDim x1={p} x2={p + jointA * s} y={p + CEILING_H_MM * s + 20}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={jointA} fontSize={8}/>
      <HDim x1={p + jointA * s} x2={p + BATH_VERT_LEN_MM * s} y={p + CEILING_H_MM * s + 20}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={BATH_VERT_LEN_MM - jointA} fontSize={8}/>

      {/* Горизонтальные размеры — ряд 2 (стык 1000) */}
      <HDim x1={p} x2={p + jointB * s} y={p + CEILING_H_MM * s + 38}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={jointB} fontSize={8}/>
      <HDim x1={p + jointB * s} x2={p + BATH_VERT_LEN_MM * s} y={p + CEILING_H_MM * s + 38}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={BATH_VERT_LEN_MM - jointB} fontSize={8}/>

      {/* Вертикальные размеры */}
      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>
      <VDim x={p + BATH_VERT_LEN_MM * s + 15} y1={svgY(rowH)} y2={svgY(0)}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={rowH} fontSize={8} labelX={p + BATH_VERT_LEN_MM * s + 20}/>
      <VDim x={p + BATH_VERT_LEN_MM * s + 15} y1={svgY(rowH * 2)} y2={svgY(rowH)}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={rowH} fontSize={8} labelX={p + BATH_VERT_LEN_MM * s + 20}/>
      <VDim x={p + BATH_VERT_LEN_MM * s + 15} y1={p} y2={svgY(rowH * 2)}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={topH} fontSize={8} labelX={p + BATH_VERT_LEN_MM * s + 20}/>

      {/* Курсор */}
      <Crosshair mouse={mouse} area={area} />

    </svg>
  );
}
