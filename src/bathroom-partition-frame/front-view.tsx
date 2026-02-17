import { HDim, VDim, StudLabel, SpecLabel } from "../svg-primitives";
import {
  CEILING_H_MM, GKL_SHEET_H_MM, GKL_SHEET_W_MM, DOBOR_H_MM,
  DOOR_W_MM, DOOR_H_MM, OVER_DOOR_H_MM,
  BEAM_W_MM, BEAM_H_MM, BEAM_LEVEL_MM,
  COL_W_MM, COL_H_MM, BATH_HORIZ_LEN_MM, BATH_TOTAL_LEN_MM,
  PN_H_MM, PS_W_MM, STUD_STEP_MM,
  BATH_DOOR_START_MM, BATH_DOOR_END_MM,
  BEDROOM_PART_LEFT_MM, BEDROOM_PART_T_MM, BEDROOM_PART_RIGHT_MM,
  STUD_POSITIONS_BATH, getStudNumberBath,
  S_FRONT, FRONT_W, FRONT_H
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_TOOLTIP_BG, C_DIM, C_COLUMN,
  C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL,
  C_DOOR_OPENING, C_BEDROOM_PART, C_COL_FILL
} from "../colors";

interface MouseState {
  x: number;
  y: number;
  view: string;
}

interface FrontViewProps {
  mouse: MouseState | null;
  setMouse: (m: MouseState | null) => void;
}

export function FrontView({ mouse, setMouse }: FrontViewProps) {
  const p = 70; // padding
  const s = S_FRONT;

  // Позиция начала перегородки (после колонны 2)
  const partStart = COL_W_MM;
  const partEnd = COL_W_MM + BATH_HORIZ_LEN_MM;

  return (
    <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        const scale = FRONT_W / r.width;
        const x = (e.clientX - r.left) * scale - p;
        const y = (e.clientY - r.top) * scale - p;
        if (x >= 0 && x <= BATH_TOTAL_LEN_MM * s && y >= 0 && y <= CEILING_H_MM * s) {
          setMouse({ x: x / s, y: CEILING_H_MM - y / s, view: 'front' });
        } else {
          setMouse(null);
        }
      }}
      onMouseLeave={() => setMouse(null)}
      style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л5.Сх1 — Вид со стороны ванной (шаг стоек {STUD_STEP_MM} мм)
      </text>

      {/* Контур помещения */}
      <rect x={p} y={p} width={BATH_TOTAL_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BATH_TOTAL_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BATH_TOTAL_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Колонна 2 (слева) */}
      <rect x={p} y={p} width={COL_W_MM * s} height={CEILING_H_MM * s}
        fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
      <text x={p + COL_W_MM/2 * s} y={p + CEILING_H_MM/2 * s}
        textAnchor="middle" fill={C_COLUMN} fontSize={10} fontWeight="bold">Колонна 2</text>
      <text x={p + COL_W_MM/2 * s} y={p + CEILING_H_MM/2 * s + 14}
        textAnchor="middle" fill={C_COLUMN} fontSize={8}>{COL_W_MM}×{COL_H_MM}</text>

      {/* Колонна 1 (справа) */}
      <rect x={p + partEnd * s} y={p} width={COL_W_MM * s} height={CEILING_H_MM * s}
        fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
      <text x={p + (partEnd + COL_W_MM/2) * s} y={p + CEILING_H_MM/2 * s}
        textAnchor="middle" fill={C_COLUMN} fontSize={10} fontWeight="bold">Колонна 1</text>
      <text x={p + (partEnd + COL_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 14}
        textAnchor="middle" fill={C_COLUMN} fontSize={8}>{COL_W_MM}×{COL_H_MM}</text>

      {/* Направляющие профили ПН на полу (под стойкой у колонны 2) */}
      <rect x={p + partStart * s} y={p + CEILING_H_MM * s - PN_H_MM * s} width={PS_W_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (partStart + PS_W_MM/2) * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={8} color={C_FRAME}/>

      {/* Направляющие профили ПН на полу (после проёма) */}
      <rect x={p + BATH_DOOR_END_MM * s} y={p + CEILING_H_MM * s - PN_H_MM * s} width={(partEnd - BATH_DOOR_END_MM) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (BATH_DOOR_END_MM + (partEnd - BATH_DOOR_END_MM)/2) * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={7} color={C_FRAME}/>

      {/* Направляющие профили ПН на потолке */}
      <rect x={p + partStart * s} y={p} width={BATH_HORIZ_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (partStart + BATH_HORIZ_LEN_MM) * s - 30} y={p + PN_H_MM/2 * s} num={9} color={C_FRAME}/>

      {/* Стоечные профили ПС (№13) */}
      {STUD_POSITIONS_BATH.map((pos, i) => (
        <g key={`stud${i}`}>
          <rect x={p + pos * s} y={p + PN_H_MM * s}
            width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
            fill={C_FRAME_FILL}
            stroke={C_FRAME}
            strokeWidth={1}/>
          <StudLabel x={p + (pos + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s} num={getStudNumberBath(pos)} color={C_FRAME}/>
          <SpecLabel x={p + (pos + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 40} num={13} color={C_FRAME}/>
        </g>
      ))}

      {/* Деревянный брус на всю длину перегородки — на высоте 2100 мм */}
      <rect x={p + partStart * s} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM) * s}
        width={BATH_HORIZ_LEN_MM * s} height={BEAM_H_MM * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
      <text x={p + (partStart + BATH_HORIZ_LEN_MM/2) * s} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM/2) * s + 3}
        textAnchor="middle" fill={C_BEAM} fontSize={7}>брус {BATH_HORIZ_LEN_MM}×{BEAM_H_MM}×{BEAM_W_MM}</text>
      <SpecLabel x={p + (partStart + BATH_HORIZ_LEN_MM/2) * s + 100} y={p + (CEILING_H_MM - BEAM_LEVEL_MM - BEAM_H_MM/2) * s} num={6} color={C_BEAM}/>

      {/* Перемычка ПН над дверью */}
      <rect x={p + BATH_DOOR_START_MM * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM) * s}
        width={DOOR_W_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (BATH_DOOR_START_MM + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM - PN_H_MM/2) * s} num={11} color={C_FRAME}/>

      {/* Горизонтальная направляющая ПН на стыке ГКЛ/доборки */}
      <rect x={p + (BATH_DOOR_END_MM + PS_W_MM) * s} y={p + (CEILING_H_MM - GKL_SHEET_H_MM - PN_H_MM / 2) * s}
        width={(partEnd - BATH_DOOR_END_MM - PS_W_MM) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (BATH_DOOR_END_MM + PS_W_MM + (partEnd - BATH_DOOR_END_MM - PS_W_MM)/2) * s} y={p + (CEILING_H_MM - GKL_SHEET_H_MM) * s} num={12} color={C_FRAME}/>

      {/* Дверной проём */}
      <rect x={p + BATH_DOOR_START_MM * s} y={p + (CEILING_H_MM - DOOR_H_MM) * s}
        width={DOOR_W_MM * s} height={DOOR_H_MM * s}
        fill={C_DOOR_OPENING + "11"} stroke={C_DOOR_OPENING} strokeWidth={2} strokeDasharray="6 3"/>
      <text x={p + (BATH_DOOR_START_MM + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={12} fontWeight="bold">ПРОЁМ</text>
      <text x={p + (BATH_DOOR_START_MM + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s + 16}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={10}>{DOOR_W_MM}×{DOOR_H_MM}</text>

      {/* ГКЛ над дверью */}
      <rect x={p} y={p}
        width={(BATH_DOOR_END_MM + PS_W_MM/2) * s} height={OVER_DOOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (BATH_DOOR_END_MM + PS_W_MM/2)/2 * s} y={p + OVER_DOOR_H_MM/2 * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {BATH_DOOR_END_MM + PS_W_MM/2}×{OVER_DOOR_H_MM}</text>
      <SpecLabel x={p + (BATH_DOOR_END_MM + PS_W_MM/2)/2 * s + 80} y={p + OVER_DOOR_H_MM/2 * s} num={5} color={C_GKL_PANEL}/>

      {/* ГКЛ левее проёма */}
      <rect x={p} y={p + OVER_DOOR_H_MM * s}
        width={BATH_DOOR_START_MM * s} height={(CEILING_H_MM - OVER_DOOR_H_MM) * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + BATH_DOOR_START_MM/2 * s} y={p + (OVER_DOOR_H_MM + (CEILING_H_MM - OVER_DOOR_H_MM)/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {BATH_DOOR_START_MM}×{CEILING_H_MM - OVER_DOOR_H_MM}</text>

      {/* ГКЛ основной лист */}
      <polygon
        points={[
          `${p + (BATH_DOOR_END_MM + PS_W_MM/2) * s},${p + DOBOR_H_MM * s}`,
          `${p + (BATH_DOOR_END_MM + GKL_SHEET_W_MM) * s},${p + DOBOR_H_MM * s}`,
          `${p + (BATH_DOOR_END_MM + GKL_SHEET_W_MM) * s},${p + (DOBOR_H_MM + GKL_SHEET_H_MM) * s}`,
          `${p + BATH_DOOR_END_MM * s},${p + (DOBOR_H_MM + GKL_SHEET_H_MM) * s}`,
          `${p + BATH_DOOR_END_MM * s},${p + OVER_DOOR_H_MM * s}`,
          `${p + (BATH_DOOR_END_MM + PS_W_MM/2) * s},${p + OVER_DOOR_H_MM * s}`,
        ].join(' ')}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (BATH_DOOR_END_MM + GKL_SHEET_W_MM/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {GKL_SHEET_W_MM}×{GKL_SHEET_H_MM}</text>
      <text x={p + (BATH_DOOR_END_MM + PS_W_MM/4) * s} y={p + (OVER_DOOR_H_MM + 100) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>вырез</text>
      <SpecLabel x={p + (BATH_DOOR_END_MM + GKL_SHEET_W_MM/2) * s} y={p + (DOBOR_H_MM + 30)} num={1} color={C_GKL_PANEL}/>

      {/* ГКЛ доборка у колонны 1 */}
      <rect x={p + (BATH_DOOR_END_MM + GKL_SHEET_W_MM) * s} y={p + DOBOR_H_MM * s}
        width={(BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM - GKL_SHEET_W_MM) * s} height={GKL_SHEET_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (BATH_DOOR_END_MM + GKL_SHEET_W_MM + (BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM - GKL_SHEET_W_MM)/2) * s} y={p + (DOBOR_H_MM + GKL_SHEET_H_MM/2) * s}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>ГКЛ {(BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM - GKL_SHEET_W_MM).toFixed(0)}×{GKL_SHEET_H_MM}</text>
      <SpecLabel x={p + (BATH_DOOR_END_MM + GKL_SHEET_W_MM + (BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM - GKL_SHEET_W_MM)/2) * s} y={p + (DOBOR_H_MM + 30)} num={2} color={C_GKL_PANEL}/>

      {/* ГКЛ доборка сверху */}
      <rect x={p + (BATH_DOOR_END_MM + PS_W_MM/2) * s} y={p}
        width={(GKL_SHEET_W_MM - PS_W_MM/2) * s} height={DOBOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (BATH_DOOR_END_MM + PS_W_MM/2 + (GKL_SHEET_W_MM - PS_W_MM/2)/2) * s} y={p + DOBOR_H_MM/2 * s + 3}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {GKL_SHEET_W_MM - PS_W_MM/2}×{DOBOR_H_MM}</text>
      <SpecLabel x={p + (BATH_DOOR_END_MM + PS_W_MM/2 + (GKL_SHEET_W_MM - PS_W_MM/2)/2) * s + 80} y={p + DOBOR_H_MM/2 * s} num={3} color={C_GKL_PANEL}/>

      {/* ГКЛ доборка сверху у колонны 1 */}
      <rect x={p + (BATH_DOOR_END_MM + GKL_SHEET_W_MM) * s} y={p}
        width={(BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM - GKL_SHEET_W_MM) * s} height={DOBOR_H_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
      <text x={p + (BATH_DOOR_END_MM + GKL_SHEET_W_MM + (BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM - GKL_SHEET_W_MM)/2) * s} y={p + DOBOR_H_MM/2 * s + 3}
        textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>ГКЛ {(BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM - GKL_SHEET_W_MM).toFixed(0)}×{DOBOR_H_MM}</text>
      <SpecLabel x={p + (BATH_DOOR_END_MM + GKL_SHEET_W_MM + (BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM - GKL_SHEET_W_MM)/2) * s} y={p + DOBOR_H_MM/2 * s + 30} num={4} color={C_GKL_PANEL}/>

      {/* Примыкание перегородки спальни */}
      <line x1={p + BEDROOM_PART_LEFT_MM * s} y1={p} x2={p + BEDROOM_PART_LEFT_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
      <line x1={p + BEDROOM_PART_RIGHT_MM * s} y1={p} x2={p + BEDROOM_PART_RIGHT_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
      <text x={p + (BEDROOM_PART_LEFT_MM + BEDROOM_PART_T_MM/2) * s} y={p + CEILING_H_MM * s - 10}
        textAnchor="middle" fill={C_BEDROOM_PART} fontSize={8}>перегородка спальни</text>

      {/* Размерные линии — колонны */}
      <HDim x1={p} x2={p + COL_W_MM * s} y={p - 20}
        color={C_COLUMN} textColor={C_COLUMN} label={COL_W_MM} fontSize={8}/>
      <HDim x1={p + partEnd * s} x2={p + BATH_TOTAL_LEN_MM * s} y={p - 20}
        color={C_COLUMN} textColor={C_COLUMN} label={COL_W_MM} fontSize={8}/>

      {/* Размерная линия перегородки */}
      <HDim x1={p + partStart * s} x2={p + partEnd * s} y={p - 20}
        label={BATH_HORIZ_LEN_MM} fontSize={10}/>

      {/* Размерные линии — шаг стоек */}
      <HDim x1={p + COL_W_MM * s} x2={p + BATH_DOOR_START_MM * s} y={p + CEILING_H_MM * s + 20}
        color={C_FRAME} textColor={C_FRAME} label={PS_W_MM} fontSize={8}/>
      {STUD_POSITIONS_BATH.slice(1, -1).map((pos, i) => {
        const nextPos = STUD_POSITIONS_BATH[i + 2];
        const step = nextPos - pos;
        if (step > 100 && step < 700) {
          return (
            <HDim key={`step${i}`}
              x1={p + pos * s} x2={p + nextPos * s} y={p + CEILING_H_MM * s + 20}
              label={step} fontSize={8}/>
          );
        }
        return null;
      })}

      {/* Проём */}
      <HDim x1={p + BATH_DOOR_START_MM * s} x2={p + BATH_DOOR_END_MM * s} y={p + CEILING_H_MM * s + 40}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_W_MM} fontSize={9}/>

      {/* Остаток после проёма */}
      <HDim x1={p + BATH_DOOR_END_MM * s} x2={p + partEnd * s} y={p + CEILING_H_MM * s + 40}
        label={partEnd - BATH_DOOR_END_MM} fontSize={9}/>

      {/* Общая длина с колоннами */}
      <HDim x1={p} x2={p + BATH_TOTAL_LEN_MM * s} y={p + CEILING_H_MM * s + 60}
        label={BATH_TOTAL_LEN_MM} fontSize={10}/>

      {/* Высоты */}
      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>
      <VDim x={p + (BATH_DOOR_START_MM + 15) * s} y1={p + (CEILING_H_MM - DOOR_H_MM) * s} y2={p + CEILING_H_MM * s}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_H_MM} fontSize={9} labelX={p + (BATH_DOOR_START_MM + 20) * s}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 15} y1={p + DOBOR_H_MM * s} y2={p + CEILING_H_MM * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_SHEET_H_MM} fontSize={8} labelX={p + BATH_TOTAL_LEN_MM * s + 20}/>

      {/* Курсор */}
      {mouse && mouse.view === 'front' && <>
        <line x1={p + mouse.x * s} y1={p} x2={p + mouse.x * s} y2={p + CEILING_H_MM * s}
          stroke={C_DIM + "44"} strokeDasharray="4"/>
        <line x1={p} y1={p + (CEILING_H_MM - mouse.y) * s} x2={p + BATH_TOTAL_LEN_MM * s} y2={p + (CEILING_H_MM - mouse.y) * s}
          stroke={C_DIM + "44"} strokeDasharray="4"/>
        <rect x={p + mouse.x * s + 10} y={p + (CEILING_H_MM - mouse.y) * s - 26} width={90} height={22} rx={4} fill={C_TOOLTIP_BG}/>
        <text x={p + mouse.x * s + 14} y={p + (CEILING_H_MM - mouse.y) * s - 10} fill={C_DIM} fontSize={11}>
          {mouse.x.toFixed(0)}×{mouse.y.toFixed(0)}
        </text>
      </>}

    </svg>
  );
}
