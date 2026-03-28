import { HDim, VDim, StudLabel, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  CEILING_H_MM, GKL_SHEET_H_MM, DOBOR_H_MM,
  PN_H_MM,
  BATH_VERT_STUD_STEP_MM,
  BATH_VERT_LEN_MM,
  BATH_VERT_PS_W_MM,
  BATH_VERT_STUD_POSITIONS, BATH_VERT_STUD_CENTERS, getBathVertStudNumber,
  S_BATH_VERT
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT,
  C_FRAME, C_FRAME_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL
} from "../colors";

interface FrontViewProps {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}

export function FrontView({ onMouseMove, mouse }: FrontViewProps) {
  const p = 70; // padding
  const s = S_BATH_VERT;

  const svgW = BATH_VERT_LEN_MM * s + p * 2;
  const svgH = CEILING_H_MM * s + p * 2 + 60;

  const area: SchemaArea = {
    padding: p, scale: s, width: BATH_VERT_LEN_MM, height: CEILING_H_MM, svgWidth: svgW
  };

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: svgW, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={svgW/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л6.Сх1 — 1-й слой ГКЛ со стороны ванной (шаг стоек {BATH_VERT_STUD_STEP_MM} мм)
      </text>

      {/* Контур помещения */}
      <rect x={p} y={p} width={BATH_VERT_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BATH_VERT_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BATH_VERT_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Нижняя стена (справа) — обозначение за пределами каркаса */}
      <rect x={p + BATH_VERT_LEN_MM * s} y={p} width={10} height={CEILING_H_MM * s}
        fill={C_TEXT_DIM} stroke={C_TEXT} strokeWidth={1}/>
      <text x={p + BATH_VERT_LEN_MM * s + 18} y={p + CEILING_H_MM/2 * s}
        textAnchor="middle" fill={C_TEXT} fontSize={8} transform={`rotate(90,${p + BATH_VERT_LEN_MM * s + 18},${p + CEILING_H_MM/2 * s})`}>стена</text>

      {/* Направляющий профиль ПН на полу */}
      <rect x={p} y={p + CEILING_H_MM * s - PN_H_MM * s} width={BATH_VERT_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + BATH_VERT_LEN_MM/2 * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={5} color={C_FRAME}/>

      {/* Направляющий профиль ПН на потолке */}
      <rect x={p} y={p} width={BATH_VERT_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + BATH_VERT_LEN_MM/2 * s} y={p + PN_H_MM/2 * s} num={6} color={C_FRAME}/>

      {/* Стоечные профили ПС */}
      {BATH_VERT_STUD_POSITIONS.map((pos, i) => (
        <g key={`stud${i}`}>
          <rect x={p + pos * s} y={p + PN_H_MM * s}
            width={BATH_VERT_PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
            fill={C_FRAME_FILL}
            stroke={C_FRAME}
            strokeWidth={1}/>
          <StudLabel x={p + (pos + BATH_VERT_PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s} num={getBathVertStudNumber(i)} color={C_FRAME}/>
          <SpecLabel x={p + (pos + BATH_VERT_PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 40} num={7} color={C_FRAME}/>
        </g>
      ))}

      {/* Горизонтальные перемычки на стыке листов и доборок */}
      {BATH_VERT_STUD_POSITIONS.slice(0, -1).map((pos, i) => {
        const nextPos = BATH_VERT_STUD_POSITIONS[i + 1];
        const braceX = pos + BATH_VERT_PS_W_MM;
        const braceW = nextPos - braceX;
        const braceY = DOBOR_H_MM - PN_H_MM / 2;
        return (
          <g key={`brace${i}`}>
            <rect x={p + braceX * s} y={p + braceY * s}
              width={braceW * s} height={PN_H_MM * s}
              fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
            {i === 3 && <SpecLabel x={p + (braceX + braceW/2) * s} y={p + DOBOR_H_MM * s} num={8} color={C_FRAME}/>}
          </g>
        );
      })}

      {/* ГКЛ раскладка стены — стыки на центрах стоек [2] и [5] */}
      {(() => {
        const j1 = BATH_VERT_STUD_CENTERS[2]; // 600
        const j2 = BATH_VERT_STUD_CENTERS[5]; // 1800
        const wallParts = [j1, j2 - j1, BATH_VERT_LEN_MM - j2];
        let wx = 0;
        return wallParts.map((w, j) => {
          const x0 = wx;
          wx += w;
          const isFullSheet = w === 1200;
          return (
            <g key={`wall${j}`}>
              <rect x={p + x0 * s} y={p + DOBOR_H_MM * s}
                width={w * s} height={GKL_SHEET_H_MM * s}
                fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
              <text x={p + (x0 + w/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
                textAnchor="middle" fill={C_GKL_PANEL} fontSize={isFullSheet ? 9 : 8}>
                {isFullSheet ? `ГКЛ ${w}×${GKL_SHEET_H_MM}` : `${w}`}
              </text>
              <SpecLabel x={p + (x0 + w/2) * s} y={p + (DOBOR_H_MM + 30)} num={isFullSheet ? 1 : 2} color={C_GKL_PANEL}/>
            </g>
          );
        });
      })()}

      {/* ГКЛ доборки сверху — стыки на стойках [3] и [6] (смещены от стены) */}
      {(() => {
        const dj1 = BATH_VERT_STUD_CENTERS[3];
        const dj2 = BATH_VERT_STUD_CENTERS[6];
        const dParts = [dj1, dj2 - dj1, BATH_VERT_LEN_MM - dj2];
        let dx = 0;
        return dParts.map((w, j) => {
          const x0 = dx;
          dx += w;
          return (
            <g key={`dtop${j}`}>
              <rect x={p + x0 * s} y={p} width={w * s} height={DOBOR_H_MM * s}
                fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
              <text x={p + (x0 + w/2) * s} y={p + DOBOR_H_MM/2 * s + 3}
                textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>{w}×{DOBOR_H_MM}</text>
              <SpecLabel x={p + (x0 + w/2) * s} y={p + DOBOR_H_MM/2 * s - 10} num={3} color={C_GKL_PANEL}/>
            </g>
          );
        });
      })()}

      {/* Размерная линия перегородки */}
      <HDim x1={p} x2={p + BATH_VERT_LEN_MM * s} y={p - 20}
        label={BATH_VERT_LEN_MM} fontSize={10}/>

      {/* Размерные линии листов ГКЛ */}
      {(() => {
        const j1 = BATH_VERT_STUD_CENTERS[2];
        const j2 = BATH_VERT_STUD_CENTERS[5];
        const parts = [j1, j2 - j1, BATH_VERT_LEN_MM - j2];
        let dx = 0;
        return parts.map((w, i) => {
          const x0 = dx;
          dx += w;
          return (
            <HDim key={`dim${i}`} x1={p + x0 * s} x2={p + dx * s} y={p + CEILING_H_MM * s + 20}
              color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={w} fontSize={8}/>
          );
        });
      })()}

      {/* Высоты */}
      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>
      <VDim x={p + BATH_VERT_LEN_MM * s + 15} y1={p + DOBOR_H_MM * s} y2={p + CEILING_H_MM * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_SHEET_H_MM} fontSize={8} labelX={p + BATH_VERT_LEN_MM * s + 20}/>
      <VDim x={p + BATH_VERT_LEN_MM * s + 15} y1={p} y2={p + DOBOR_H_MM * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={DOBOR_H_MM} fontSize={8} labelX={p + BATH_VERT_LEN_MM * s + 20}/>

      {/* Курсор */}
      <Crosshair mouse={mouse} area={area} />

    </svg>
  );
}
