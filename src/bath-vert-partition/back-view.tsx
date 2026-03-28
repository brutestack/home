import { HDim, VDim, StudLabel, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  CEILING_H_MM, GKL_SHEET_H_MM, DOBOR_H_MM,
  PN_H_MM,
  BATH_VERT_STUD_STEP_MM,
  BATH_VERT_LEN_MM,
  BATH_VERT_PS_W_MM,
  BATH_VERT_STUD_POSITIONS, getBathVertStudNumber,
  S_BATH_VERT
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT,
  C_FRAME, C_FRAME_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL
} from "../colors";

interface BackViewProps {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}

export function BackView({ onMouseMove, mouse }: BackViewProps) {
  const p = 70; // padding
  const s = S_BATH_VERT;

  const svgW = BATH_VERT_LEN_MM * s + p * 2;
  const svgH = CEILING_H_MM * s + p * 2 + 60;

  const area: SchemaArea = {
    padding: p, scale: s, width: BATH_VERT_LEN_MM, height: CEILING_H_MM, svgWidth: svgW
  };

  // Позиции стоек зеркально
  const mirrorPos = (pos: number) => BATH_VERT_LEN_MM - pos - BATH_VERT_PS_W_MM;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: svgW, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={svgW/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л6.Сх3 — Вид со стороны спальни (шаг стоек {BATH_VERT_STUD_STEP_MM} мм)
      </text>

      {/* Контур помещения */}
      <rect x={p} y={p} width={BATH_VERT_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BATH_VERT_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BATH_VERT_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Нижняя стена (слева) — обозначение за пределами каркаса */}
      <rect x={p - 10} y={p} width={10} height={CEILING_H_MM * s}
        fill={C_TEXT_DIM} stroke={C_TEXT} strokeWidth={1}/>
      <text x={p - 18} y={p + CEILING_H_MM/2 * s}
        textAnchor="middle" fill={C_TEXT} fontSize={8} transform={`rotate(-90,${p - 18},${p + CEILING_H_MM/2 * s})`}>стена</text>

      {/* Направляющий профиль ПН на полу */}
      <rect x={p} y={p + CEILING_H_MM * s - PN_H_MM * s} width={BATH_VERT_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + BATH_VERT_LEN_MM/2 * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={5} color={C_FRAME}/>

      {/* Направляющий профиль ПН на потолке */}
      <rect x={p} y={p} width={BATH_VERT_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + BATH_VERT_LEN_MM/2 * s} y={p + PN_H_MM/2 * s} num={6} color={C_FRAME}/>

      {/* Стоечные профили ПС (зеркально) */}
      {BATH_VERT_STUD_POSITIONS.map((pos, i) => {
        const mPos = mirrorPos(pos);
        return (
          <g key={`stud${i}`}>
            <rect x={p + mPos * s} y={p + PN_H_MM * s}
              width={BATH_VERT_PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
              fill={C_FRAME_FILL}
              stroke={C_FRAME}
              strokeWidth={1}/>
            <StudLabel x={p + (mPos + BATH_VERT_PS_W_MM/2) * s} y={p + CEILING_H_MM * s / 2} num={getBathVertStudNumber(i)} color={C_FRAME}/>
            <SpecLabel x={p + (mPos + BATH_VERT_PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 40} num={7} color={C_FRAME}/>
          </g>
        );
      })}

      {/* Горизонтальные перемычки на стыке листов и доборок (зеркально) */}
      {BATH_VERT_STUD_POSITIONS.slice(0, -1).map((pos, i) => {
        const nextPos = BATH_VERT_STUD_POSITIONS[i + 1];
        const braceW = nextPos - pos - BATH_VERT_PS_W_MM;
        const braceX = mirrorPos(nextPos) + BATH_VERT_PS_W_MM;
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

      {/* ГКЛ раскладка вразбежку — стыки на центрах стоек */}
      {(() => {
        // Центры стоек в координатах вида сзади
        // Фронт стыки → зеркально [2] и [5]. Тыл стыкуем на [1] и [4] для разбежки
        const mirroredStudCenters = BATH_VERT_STUD_POSITIONS
          .map(pos => BATH_VERT_LEN_MM - pos - BATH_VERT_PS_W_MM + BATH_VERT_PS_W_MM / 2)
          .sort((a, b) => a - b);
        const joint1 = mirroredStudCenters[1]; // 430
        const joint2 = mirroredStudCenters[4]; // 1630
        const piece1W = joint1;
        const sheetW = joint2 - joint1;
        const piece2W = BATH_VERT_LEN_MM - joint2;

        return (
          <>
            {/* Доборка у стены (слева) */}
            <rect x={p} y={p + DOBOR_H_MM * s}
              width={piece1W * s} height={GKL_SHEET_H_MM * s}
              fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
            <text x={p + piece1W/2 * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
              textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>{piece1W}</text>
            <SpecLabel x={p + piece1W/2 * s} y={p + (DOBOR_H_MM + 30)} num={4} color={C_GKL_PANEL}/>

            {/* ГКЛ лист целый */}
            <rect x={p + joint1 * s} y={p + DOBOR_H_MM * s}
              width={sheetW * s} height={GKL_SHEET_H_MM * s}
              fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
            <text x={p + (joint1 + sheetW/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
              textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {sheetW}×{GKL_SHEET_H_MM}</text>
            <SpecLabel x={p + (joint1 + sheetW/2) * s} y={p + (DOBOR_H_MM + 30)} num={1} color={C_GKL_PANEL}/>

            {/* Доборка справа */}
            <rect x={p + joint2 * s} y={p + DOBOR_H_MM * s}
              width={piece2W * s} height={GKL_SHEET_H_MM * s}
              fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
            <text x={p + (joint2 + piece2W/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
              textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>{piece2W}</text>
            <SpecLabel x={p + (joint2 + piece2W/2) * s} y={p + (DOBOR_H_MM + 30)} num={2} color={C_GKL_PANEL}/>
          </>
        );
      })()}

      {/* ГКЛ доборки сверху — стыки вразбежку (смещены от основных на 2 стойки) */}
      {(() => {
        // Стыки доборок НЕ совпадают с основными листами (стойки [1],[4])
        // Используем стойки [2] и [5]
        const mc = BATH_VERT_STUD_POSITIONS
          .map(pos => BATH_VERT_LEN_MM - pos - BATH_VERT_PS_W_MM + BATH_VERT_PS_W_MM / 2)
          .sort((a, b) => a - b);
        const dParts = [mc[2], mc[5] - mc[2], BATH_VERT_LEN_MM - mc[5]];
        let dx = 0;
        return dParts.map((w, j) => {
          const x0 = dx;
          dx += w;
          return (
            <g key={`dtop${j}`}>
              <rect x={p + x0 * s} y={p} width={w * s} height={DOBOR_H_MM * s}
                fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
              <text x={p + (x0 + w/2) * s} y={p + DOBOR_H_MM/2 * s + 3}
                textAnchor="middle" fill={C_GKL_PANEL} fontSize={w < 400 ? 7 : 8}>{w}×{DOBOR_H_MM}</text>
              <SpecLabel x={p + (x0 + w/2) * s} y={p + DOBOR_H_MM/2 * s - 10} num={3} color={C_GKL_PANEL}/>
            </g>
          );
        });
      })()}

      {/* Размерные линии */}
      <HDim x1={p} x2={p + BATH_VERT_LEN_MM * s} y={p - 20}
        label={BATH_VERT_LEN_MM} fontSize={10}/>

      {/* Размерные линии листов ГКЛ */}
      {(() => {
        const mirroredStudCenters = BATH_VERT_STUD_POSITIONS
          .map(pos => BATH_VERT_LEN_MM - pos - BATH_VERT_PS_W_MM + BATH_VERT_PS_W_MM / 2)
          .sort((a, b) => a - b);
        const joint1 = mirroredStudCenters[1];
        const joint2 = mirroredStudCenters[4];
        return (
          <>
            <HDim x1={p} x2={p + joint1 * s} y={p + CEILING_H_MM * s + 20}
              color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={joint1} fontSize={8}/>
            <HDim x1={p + joint1 * s} x2={p + joint2 * s} y={p + CEILING_H_MM * s + 20}
              color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={joint2 - joint1} fontSize={8}/>
            <HDim x1={p + joint2 * s} x2={p + BATH_VERT_LEN_MM * s} y={p + CEILING_H_MM * s + 20}
              color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={BATH_VERT_LEN_MM - joint2} fontSize={8}/>
          </>
        );
      })()}

      {/* Высоты */}
      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>

      {/* Курсор */}
      <Crosshair mouse={mouse} area={area} />

    </svg>
  );
}
