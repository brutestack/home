import { useState } from "react";
import { HDim, VDim, StudLabel, SpecLabel } from "./svg-primitives";
import {
  C_BG, C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_TOOLTIP_BG,
  C_DIM, C_BATH, C_COLUMN, C_COLUMN_BORDER
} from "./colors";

// === Константы перегородки ванной (вариант ГКЛ) ===
const CEILING_H = 2800;        // Высота потолка (мм)
const GKL_SHEET_H = 2500;      // Высота листа ГКЛ (мм)
const GKL_SHEET_W = 1200;      // Ширина листа ГКЛ (мм)
const GKL_T = 12.5;            // Толщина листа ГКЛ (мм)
const DOBOR_H = CEILING_H - GKL_SHEET_H; // Доборка сверху (300мм)

const DOOR_W = 900;            // Ширина дверного проёма (мм)
const DOOR_H = 2000;           // Высота проёма до ГКЛ (мм) — ГКЛ закрывает механизм
const BEAM_LEVEL = 2100;       // Высота нижней грани бруса от пола (мм) — для механизма двери
const OVER_DOOR_H = CEILING_H - DOOR_H; // ГКЛ над дверью (800 мм)

// Брус над дверью
const BEAM_W = 50;             // Ширина бруса (мм)
const BEAM_H = 70;             // Высота бруса (мм)

const GKL_LAYER = 50;          // Толщина слоя каркаса (мм)
const GKL_GAP = 75;            // Зазор между слоями (мм) — профиль ПН 75×40
const PARTITION_T = GKL_LAYER * 2 + GKL_GAP; // Общая толщина каркаса (175мм)

// Профиль между слоями (для равномерного зазора)
const PN_GAP_W = 75;           // Ширина направляющего профиля между слоями (мм)
const PN_GAP_H = 40;           // Высота направляющего профиля между слоями (мм)

// Колонны
const COL_W = 200;             // Ширина колонны (мм)
const COL_H = 150;             // Глубина колонны (мм)

// Общая длина горизонтальной перегородки (от колонны 2 до колонны 1)
// COL_DIST - COL2_W = 2240 - 200 = 2040 мм
const HORIZ_LEN = 2040;

// Общая длина схемы с колоннами
const TOTAL_LEN = COL_W + HORIZ_LEN + COL_W; // 2440 мм

// Профили каркаса
const PN_W = 50;               // Ширина направляющего профиля (мм)
const PN_H = 40;               // Высота направляющего профиля (мм)
const PS_W = 50;               // Ширина стоечного профиля (мм)
const PS_H = 50;               // Толщина стоечного профиля (мм)

// Шаг стоечных профилей для однослойного ГКЛ
const STUD_STEP = 600;         // 600 мм — стандартный шаг

// Стойка у колонны 2 (левая граница проёма)
const COL2_STUD_POS = COL_W;   // 200 мм (вплотную к колонне 2)

// Проём начинается после стойки у колонны 2, ширина 900 мм
const DOOR_START = COL_W + PS_W; // 250 мм (после стойки у колонны 2)
const DOOR_END = DOOR_START + DOOR_W; // 1150 мм

// Цвета
const C_FRAME = "#8B4513";     // Профиль каркаса (коричневый)
const C_FRAME_FILL = "#8B451333";
const C_BEAM = "#A0522D";      // Деревянный брус (сиена)
const C_BEAM_FILL = "#A0522D55";
const C_GKL_PANEL = "#9E9E9E"; // ГКЛ лист (серый)
const C_GKL_FILL = "#9E9E9E22";
const C_DOOR = "#228B22";      // Дверной проём (зелёный)

// Позиция стойки у проёма справа (вплотную к проёму, граница совпадает)
const DOOR_STUD_POS = DOOR_END; // 1150 мм

// Позиция примыкания перегородки спальни (от левого края колонны 2)
// Совпадает с правым краем дверного проёма (DOOR_END = 1150 мм)
const BEDROOM_PART_LEFT = 1150;  // Левый край перегородки спальни
const BEDROOM_PART_T = 175;      // Толщина перегородки спальни (50+75+50)
const BEDROOM_PART_RIGHT = BEDROOM_PART_LEFT + BEDROOM_PART_T; // 1355 мм

// Цвет для примыкания
const C_BEDROOM_PART = "#9C27B0"; // Фиолетовый

// Расчёт позиций стоек для стороны коридора (с перегородкой спальни)
const getStudPositionsCorridor = () => {
  const studs: number[] = [];
  // Стойка у колонны 2 (левая граница проёма)
  studs.push(COL2_STUD_POS);
  // Стойка у проёма справа (вплотную к правому краю проёма)
  studs.push(DOOR_STUD_POS);
  // Стойка после перегородки спальни (для крепления ГКЛ)
  studs.push(BEDROOM_PART_RIGHT);
  // Дополнительные стойки с шагом 600 мм от перегородки спальни
  let pos = BEDROOM_PART_RIGHT + STUD_STEP;
  while (pos < COL_W + HORIZ_LEN - PS_W) {
    studs.push(pos);
    pos += STUD_STEP;
  }
  // Стойка у колонны 1 (правый край)
  studs.push(COL_W + HORIZ_LEN - PS_W);
  return studs;
};

// Расчёт позиций стоек для стороны ванной (без перегородки спальни)
const getStudPositionsBath = () => {
  const studs: number[] = [];
  // Стойка у колонны 2 (левая граница проёма)
  studs.push(COL2_STUD_POS);
  // Стойка у проёма справа (вплотную к правому краю проёма)
  studs.push(DOOR_STUD_POS);
  // Дополнительные стойки с шагом 600 мм от края проёма
  let pos = DOOR_END + STUD_STEP;
  while (pos < COL_W + HORIZ_LEN - PS_W) {
    studs.push(pos);
    pos += STUD_STEP;
  }
  // Стойка у колонны 1 (правый край)
  studs.push(COL_W + HORIZ_LEN - PS_W);
  return studs;
};

const STUD_POSITIONS_CORRIDOR = getStudPositionsCorridor();
const STUD_POSITIONS_BATH = getStudPositionsBath();
// Для обратной совместимости
const STUD_POSITIONS = STUD_POSITIONS_CORRIDOR;

// Номера стоек: коридор 1-5, ванная 6-9
const getStudNumberCorridor = (pos: number) => STUD_POSITIONS_CORRIDOR.indexOf(pos) + 1;
const getStudNumberBath = (pos: number) => STUD_POSITIONS_BATH.indexOf(pos) + 1 + STUD_POSITIONS_CORRIDOR.length;

// Цвет колонны
const C_COL_FILL = "#88888855";

export default function BathroomPartitionFrame() {
  const [mouse, setMouse] = useState<{x: number, y: number, view: string} | null>(null);

  // === Масштабы для разных видов ===
  const S_FRONT = 0.32;        // Масштаб вида спереди (px/мм)
  const S_SECTION = 1.3;       // Масштаб разреза (px/мм)

  // === Размеры SVG ===
  const FRONT_W = 950;
  const FRONT_H = 1100;

  // === Вид спереди (со стороны ванной) ===
  const FrontView = () => {
    const p = 70; // padding
    const s = S_FRONT;

    // Позиция начала перегородки (после колонны 2)
    const partStart = COL_W;
    const partEnd = COL_W + HORIZ_LEN;

    return (
      <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          const scale = FRONT_W / r.width;
          const x = (e.clientX - r.left) * scale - p;
          const y = (e.clientY - r.top) * scale - p;
          if (x >= 0 && x <= TOTAL_LEN * s && y >= 0 && y <= CEILING_H * s) {
            setMouse({ x: x / s, y: CEILING_H - y / s, view: 'front' });
          } else {
            setMouse(null);
          }
        }}
        onMouseLeave={() => setMouse(null)}
        style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

        <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
          Л5.Сх1 — Вид со стороны ванной (шаг стоек {STUD_STEP} мм)
        </text>

        {/* Контур помещения */}
        <rect x={p} y={p} width={TOTAL_LEN * s} height={CEILING_H * s}
          fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

        {/* Пол и потолок */}
        <line x1={p} y1={p + CEILING_H * s} x2={p + TOTAL_LEN * s} y2={p + CEILING_H * s}
          stroke={C_TEXT} strokeWidth={2}/>
        <line x1={p} y1={p} x2={p + TOTAL_LEN * s} y2={p}
          stroke={C_TEXT} strokeWidth={2}/>

        {/* Колонна 2 (слева) */}
        <rect x={p} y={p} width={COL_W * s} height={CEILING_H * s}
          fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
        <text x={p + COL_W/2 * s} y={p + CEILING_H/2 * s}
          textAnchor="middle" fill={C_COLUMN} fontSize={10} fontWeight="bold">Колонна 2</text>
        <text x={p + COL_W/2 * s} y={p + CEILING_H/2 * s + 14}
          textAnchor="middle" fill={C_COLUMN} fontSize={8}>{COL_W}×{COL_H}</text>

        {/* Колонна 1 (справа) */}
        <rect x={p + partEnd * s} y={p} width={COL_W * s} height={CEILING_H * s}
          fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
        <text x={p + (partEnd + COL_W/2) * s} y={p + CEILING_H/2 * s}
          textAnchor="middle" fill={C_COLUMN} fontSize={10} fontWeight="bold">Колонна 1</text>
        <text x={p + (partEnd + COL_W/2) * s} y={p + CEILING_H/2 * s + 14}
          textAnchor="middle" fill={C_COLUMN} fontSize={8}>{COL_W}×{COL_H}</text>

        {/* Направляющие профили ПН на полу (под стойкой у колонны 2) */}
        <rect x={p + partStart * s} y={p + CEILING_H * s - PN_H * s} width={PS_W * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <SpecLabel x={p + (partStart + PS_W/2) * s} y={p + CEILING_H * s - PN_H/2 * s} num={8} color={C_FRAME}/>

        {/* Направляющие профили ПН на полу (после проёма) */}
        <rect x={p + DOOR_END * s} y={p + CEILING_H * s - PN_H * s} width={(partEnd - DOOR_END) * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <SpecLabel x={p + (DOOR_END + (partEnd - DOOR_END)/2) * s} y={p + CEILING_H * s - PN_H/2 * s} num={7} color={C_FRAME}/>

        {/* Направляющие профили ПН на потолке */}
        <rect x={p + partStart * s} y={p} width={HORIZ_LEN * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <SpecLabel x={p + (partStart + HORIZ_LEN) * s - 30} y={p + PN_H/2 * s} num={9} color={C_FRAME}/>

        {/* Стоечные профили ПС (№13) */}
        {STUD_POSITIONS_BATH.map((pos, i) => (
          <g key={`stud${i}`}>
            <rect x={p + pos * s} y={p + PN_H * s}
              width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
              fill={C_FRAME_FILL}
              stroke={C_FRAME}
              strokeWidth={1}/>
            <StudLabel x={p + (pos + PS_W/2) * s} y={p + CEILING_H/2 * s} num={getStudNumberBath(pos)} color={C_FRAME}/>
            <SpecLabel x={p + (pos + PS_W/2) * s} y={p + CEILING_H/2 * s + 40} num={13} color={C_FRAME}/>
          </g>
        ))}

        {/* Деревянный брус на всю длину перегородки — на высоте 2100 мм (для механизма откатной двери) */}
        <rect x={p + partStart * s} y={p + (CEILING_H - BEAM_LEVEL - BEAM_H) * s}
          width={HORIZ_LEN * s} height={BEAM_H * s}
          fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
        <text x={p + (partStart + HORIZ_LEN/2) * s} y={p + (CEILING_H - BEAM_LEVEL - BEAM_H/2) * s + 3}
          textAnchor="middle" fill={C_BEAM} fontSize={7}>брус {HORIZ_LEN}×{BEAM_H}×{BEAM_W}</text>
        <SpecLabel x={p + (partStart + HORIZ_LEN/2) * s + 100} y={p + (CEILING_H - BEAM_LEVEL - BEAM_H/2) * s} num={6} color={C_BEAM}/>

        {/* Перемычка ПН над дверью — на высоте 2000 мм, только над проёмом (между стойками) */}
        <rect x={p + DOOR_START * s} y={p + (CEILING_H - DOOR_H - PN_H) * s}
          width={DOOR_W * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <SpecLabel x={p + (DOOR_START + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H - PN_H/2) * s} num={11} color={C_FRAME}/>

        {/* Горизонтальная направляющая ПН на стыке ГКЛ/доборки */}
        <rect x={p + (DOOR_END + PS_W) * s} y={p + (CEILING_H - GKL_SHEET_H - PN_H / 2) * s}
          width={(partEnd - DOOR_END - PS_W) * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <SpecLabel x={p + (DOOR_END + PS_W + (partEnd - DOOR_END - PS_W)/2) * s} y={p + (CEILING_H - GKL_SHEET_H) * s} num={12} color={C_FRAME}/>

        {/* Дверной проём */}
        <rect x={p + DOOR_START * s} y={p + (CEILING_H - DOOR_H) * s}
          width={DOOR_W * s} height={DOOR_H * s}
          fill={C_DOOR + "11"} stroke={C_DOOR} strokeWidth={2} strokeDasharray="6 3"/>
        <text x={p + (DOOR_START + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H/2) * s}
          textAnchor="middle" fill={C_DOOR} fontSize={12} fontWeight="bold">ПРОЁМ</text>
        <text x={p + (DOOR_START + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H/2) * s + 16}
          textAnchor="middle" fill={C_DOOR} fontSize={10}>{DOOR_W}×{DOOR_H}</text>

        {/* ГКЛ над дверью (закрывает колонну 2, до середины стойки) */}
        <rect x={p} y={p}
          width={(DOOR_END + PS_W/2) * s} height={OVER_DOOR_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (DOOR_END + PS_W/2)/2 * s} y={p + OVER_DOOR_H/2 * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {DOOR_END + PS_W/2}×{OVER_DOOR_H}</text>
        <SpecLabel x={p + (DOOR_END + PS_W/2)/2 * s + 80} y={p + OVER_DOOR_H/2 * s} num={5} color={C_GKL_PANEL}/>

        {/* ГКЛ левее проёма (закрывает колонну 2 и левую стойку) */}
        <rect x={p} y={p + OVER_DOOR_H * s}
          width={DOOR_START * s} height={(CEILING_H - OVER_DOOR_H) * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + DOOR_START/2 * s} y={p + (OVER_DOOR_H + (CEILING_H - OVER_DOOR_H)/2) * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {DOOR_START}×{CEILING_H - OVER_DOOR_H}</text>

        {/* ГКЛ основной лист (от границы проёма, с вырезом в верхнем левом углу) */}
        <polygon
          points={[
            `${p + (DOOR_END + PS_W/2) * s},${p + DOBOR_H * s}`,
            `${p + (DOOR_END + GKL_SHEET_W) * s},${p + DOBOR_H * s}`,
            `${p + (DOOR_END + GKL_SHEET_W) * s},${p + (DOBOR_H + GKL_SHEET_H) * s}`,
            `${p + DOOR_END * s},${p + (DOBOR_H + GKL_SHEET_H) * s}`,
            `${p + DOOR_END * s},${p + OVER_DOOR_H * s}`,
            `${p + (DOOR_END + PS_W/2) * s},${p + OVER_DOOR_H * s}`,
          ].join(' ')}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (DOOR_END + GKL_SHEET_W/2) * s} y={p + (DOBOR_H + GKL_SHEET_H/2) * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {GKL_SHEET_W}×{GKL_SHEET_H}</text>
        <text x={p + (DOOR_END + PS_W/4) * s} y={p + (OVER_DOOR_H + 100) * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>вырез</text>
        <SpecLabel x={p + (DOOR_END + GKL_SHEET_W/2) * s} y={p + (DOBOR_H + 30)} num={1} color={C_GKL_PANEL}/>

        {/* ГКЛ доборка у колонны 1 (узкая полоса) */}
        <rect x={p + (DOOR_END + GKL_SHEET_W) * s} y={p + DOBOR_H * s}
          width={(TOTAL_LEN - DOOR_END - GKL_SHEET_W) * s} height={GKL_SHEET_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (DOOR_END + GKL_SHEET_W + (TOTAL_LEN - DOOR_END - GKL_SHEET_W)/2) * s} y={p + (DOBOR_H + GKL_SHEET_H/2) * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>ГКЛ {(TOTAL_LEN - DOOR_END - GKL_SHEET_W).toFixed(0)}×{GKL_SHEET_H}</text>
        <SpecLabel x={p + (DOOR_END + GKL_SHEET_W + (TOTAL_LEN - DOOR_END - GKL_SHEET_W)/2) * s} y={p + (DOBOR_H + 30)} num={2} color={C_GKL_PANEL}/>

        {/* ГКЛ доборка сверху (основная часть) */}
        <rect x={p + (DOOR_END + PS_W/2) * s} y={p}
          width={(GKL_SHEET_W - PS_W/2) * s} height={DOBOR_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (DOOR_END + PS_W/2 + (GKL_SHEET_W - PS_W/2)/2) * s} y={p + DOBOR_H/2 * s + 3}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {GKL_SHEET_W - PS_W/2}×{DOBOR_H}</text>
        <SpecLabel x={p + (DOOR_END + PS_W/2 + (GKL_SHEET_W - PS_W/2)/2) * s + 80} y={p + DOBOR_H/2 * s} num={3} color={C_GKL_PANEL}/>

        {/* ГКЛ доборка сверху (у колонны 1) */}
        <rect x={p + (DOOR_END + GKL_SHEET_W) * s} y={p}
          width={(TOTAL_LEN - DOOR_END - GKL_SHEET_W) * s} height={DOBOR_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (DOOR_END + GKL_SHEET_W + (TOTAL_LEN - DOOR_END - GKL_SHEET_W)/2) * s} y={p + DOBOR_H/2 * s + 3}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>ГКЛ {(TOTAL_LEN - DOOR_END - GKL_SHEET_W).toFixed(0)}×{DOBOR_H}</text>
        <SpecLabel x={p + (DOOR_END + GKL_SHEET_W + (TOTAL_LEN - DOOR_END - GKL_SHEET_W)/2) * s} y={p + DOBOR_H/2 * s + 30} num={4} color={C_GKL_PANEL}/>

        {/* Примыкание перегородки спальни (пунктирные линии) */}
        <line x1={p + BEDROOM_PART_LEFT * s} y1={p} x2={p + BEDROOM_PART_LEFT * s} y2={p + CEILING_H * s}
          stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
        <line x1={p + BEDROOM_PART_RIGHT * s} y1={p} x2={p + BEDROOM_PART_RIGHT * s} y2={p + CEILING_H * s}
          stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
        <text x={p + (BEDROOM_PART_LEFT + BEDROOM_PART_T/2) * s} y={p + CEILING_H * s - 10}
          textAnchor="middle" fill={C_BEDROOM_PART} fontSize={8}>перегородка спальни</text>

        {/* Размерные линии — колонны */}
        <HDim x1={p} x2={p + COL_W * s} y={p - 20}
          color={C_COLUMN} textColor={C_COLUMN} label={COL_W} fontSize={8}/>
        <HDim x1={p + partEnd * s} x2={p + TOTAL_LEN * s} y={p - 20}
          color={C_COLUMN} textColor={C_COLUMN} label={COL_W} fontSize={8}/>

        {/* Размерная линия перегородки */}
        <HDim x1={p + partStart * s} x2={p + partEnd * s} y={p - 20}
          label={HORIZ_LEN} fontSize={10}/>

        {/* Размерные линии — шаг стоек */}
        {/* Стойка у колонны 2 */}
        <HDim x1={p + COL_W * s} x2={p + DOOR_START * s} y={p + CEILING_H * s + 20}
          color={C_FRAME} textColor={C_FRAME} label={PS_W} fontSize={8}/>
        {/* Шаги между стойками после проёма */}
        {STUD_POSITIONS_BATH.slice(1, -1).map((pos, i) => {
          const nextPos = STUD_POSITIONS_BATH[i + 2];
          const step = nextPos - pos;
          if (step > 100 && step < 700) {
            return (
              <HDim key={`step${i}`}
                x1={p + pos * s} x2={p + nextPos * s} y={p + CEILING_H * s + 20}
                label={step} fontSize={8}/>
            );
          }
          return null;
        })}

        {/* Проём (между стойками) */}
        <HDim x1={p + DOOR_START * s} x2={p + DOOR_END * s} y={p + CEILING_H * s + 40}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_W} fontSize={9}/>

        {/* Остаток после проёма */}
        <HDim x1={p + DOOR_END * s} x2={p + partEnd * s} y={p + CEILING_H * s + 40}
          label={partEnd - DOOR_END} fontSize={9}/>

        {/* Общая длина с колоннами */}
        <HDim x1={p} x2={p + TOTAL_LEN * s} y={p + CEILING_H * s + 60}
          label={TOTAL_LEN} fontSize={10}/>

        {/* Высоты */}
        <VDim x={p - 15} y1={p} y2={p + CEILING_H * s} label={CEILING_H} fontSize={9}/>
        {/* Высота двери (у левого края проёма) */}
        <VDim x={p + (DOOR_START + 15) * s} y1={p + (CEILING_H - DOOR_H) * s} y2={p + CEILING_H * s}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_H} fontSize={9} labelX={p + (DOOR_START + 20) * s}/>
        {/* Высота ГКЛ */}
        <VDim x={p + TOTAL_LEN * s + 15} y1={p + DOBOR_H * s} y2={p + CEILING_H * s}
          color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_SHEET_H} fontSize={8} labelX={p + TOTAL_LEN * s + 20}/>

        {/* Курсор */}
        {mouse && mouse.view === 'front' && <>
          <line x1={p + mouse.x * s} y1={p} x2={p + mouse.x * s} y2={p + CEILING_H * s}
            stroke={C_DIM + "44"} strokeDasharray="4"/>
          <line x1={p} y1={p + (CEILING_H - mouse.y) * s} x2={p + TOTAL_LEN * s} y2={p + (CEILING_H - mouse.y) * s}
            stroke={C_DIM + "44"} strokeDasharray="4"/>
          <rect x={p + mouse.x * s + 10} y={p + (CEILING_H - mouse.y) * s - 26} width={90} height={22} rx={4} fill={C_TOOLTIP_BG}/>
          <text x={p + mouse.x * s + 14} y={p + (CEILING_H - mouse.y) * s - 10} fill={C_DIM} fontSize={11}>
            {mouse.x.toFixed(0)}×{mouse.y.toFixed(0)}
          </text>
        </>}

      </svg>
    );
  };

  // === Вид сзади (со стороны коридора/лестницы) ===
  const BackView = () => {
    const p = 70;
    const s = S_FRONT;

    // Зеркальные координаты (0 = колонна 1)
    const doorStartMirror = TOTAL_LEN - DOOR_END; // 1290 (левый край проёма в зеркале)
    const doorEndMirror = TOTAL_LEN - DOOR_START; // 2190 (правый край проёма в зеркале)

    // Позиция начала перегородки (после колонны 1 на зеркальном виде)
    const partStart = COL_W;
    const partEnd = COL_W + HORIZ_LEN;

    // Зеркальные позиции стоек (для стороны коридора)
    const studsMirror = STUD_POSITIONS_CORRIDOR.map(pos => TOTAL_LEN - pos - PS_W).reverse();

    return (
      <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
        style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

        <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
          Л5.Сх2 — Вид со стороны коридора (зеркальный)
        </text>

        {/* Контур помещения */}
        <rect x={p} y={p} width={TOTAL_LEN * s} height={CEILING_H * s}
          fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

        {/* Пол и потолок */}
        <line x1={p} y1={p + CEILING_H * s} x2={p + TOTAL_LEN * s} y2={p + CEILING_H * s}
          stroke={C_TEXT} strokeWidth={2}/>
        <line x1={p} y1={p} x2={p + TOTAL_LEN * s} y2={p}
          stroke={C_TEXT} strokeWidth={2}/>

        {/* Колонна 1 (слева на зеркальном виде) */}
        <rect x={p} y={p} width={COL_W * s} height={CEILING_H * s}
          fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
        <text x={p + COL_W/2 * s} y={p + CEILING_H/2 * s}
          textAnchor="middle" fill={C_COLUMN} fontSize={10} fontWeight="bold">Колонна 1</text>
        <text x={p + COL_W/2 * s} y={p + CEILING_H/2 * s + 14}
          textAnchor="middle" fill={C_COLUMN} fontSize={8}>{COL_W}×{COL_H}</text>

        {/* Колонна 2 (справа на зеркальном виде) */}
        <rect x={p + partEnd * s} y={p} width={COL_W * s} height={CEILING_H * s}
          fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
        <text x={p + (partEnd + COL_W/2) * s} y={p + CEILING_H/2 * s}
          textAnchor="middle" fill={C_COLUMN} fontSize={10} fontWeight="bold">Колонна 2</text>
        <text x={p + (partEnd + COL_W/2) * s} y={p + CEILING_H/2 * s + 14}
          textAnchor="middle" fill={C_COLUMN} fontSize={8}>{COL_W}×{COL_H}</text>

        {/* Направляющие ПН на полу (до проёма) */}
        <rect x={p + partStart * s} y={p + CEILING_H * s - PN_H * s} width={(doorStartMirror - partStart) * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <SpecLabel x={p + (partStart + (doorStartMirror - partStart)/2) * s} y={p + CEILING_H * s - PN_H/2 * s} num={7} color={C_FRAME}/>

        {/* Направляющие ПН на полу (под стойкой у колонны 2, справа в зеркальном виде) */}
        <rect x={p + doorEndMirror * s} y={p + CEILING_H * s - PN_H * s} width={PS_W * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <SpecLabel x={p + (doorEndMirror + PS_W/2) * s} y={p + CEILING_H * s - PN_H/2 * s} num={8} color={C_FRAME}/>

        {/* Направляющие ПН на потолке */}
        <rect x={p + partStart * s} y={p} width={HORIZ_LEN * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <SpecLabel x={p + partStart * s + 30} y={p + PN_H/2 * s} num={9} color={C_FRAME}/>

        {/* Стоечные профили */}
        {studsMirror.map((pos, i) => {
          // Восстанавливаем оригинальную позицию из зеркальной
          const originalPos = TOTAL_LEN - pos - PS_W;
          return (
            <g key={`stud${i}`}>
              <rect x={p + pos * s} y={p + PN_H * s}
                width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
                fill={C_FRAME_FILL}
                stroke={C_FRAME}
                strokeWidth={1}/>
              <StudLabel x={p + (pos + PS_W/2) * s} y={p + CEILING_H/2 * s} num={getStudNumberCorridor(originalPos)} color={C_FRAME}/>
              <SpecLabel x={p + (pos + PS_W/2) * s} y={p + CEILING_H/2 * s + 40} num={13} color={C_FRAME}/>
            </g>
          );
        })}

        {/* Деревянный брус на всю длину перегородки — на высоте 2100 мм */}
        <rect x={p + partStart * s} y={p + (CEILING_H - BEAM_LEVEL - BEAM_H) * s}
          width={HORIZ_LEN * s} height={BEAM_H * s}
          fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
        <SpecLabel x={p + (partStart + HORIZ_LEN/2) * s - 100} y={p + (CEILING_H - BEAM_LEVEL - BEAM_H/2) * s} num={6} color={C_BEAM}/>

        {/* Перемычка ПН над дверью — на высоте 2000 мм, только над проёмом */}
        <rect x={p + doorStartMirror * s} y={p + (CEILING_H - DOOR_H - PN_H) * s}
          width={DOOR_W * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <SpecLabel x={p + (doorStartMirror + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H - PN_H/2) * s} num={11} color={C_FRAME}/>

        {/* Горизонтальная направляющая на стыке ГКЛ/доборки */}
        <rect x={p + partStart * s} y={p + (CEILING_H - GKL_SHEET_H - PN_H / 2) * s}
          width={(doorStartMirror - partStart - PS_W) * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <SpecLabel x={p + (partStart + (doorStartMirror - partStart - PS_W)/2) * s} y={p + (CEILING_H - GKL_SHEET_H) * s} num={12} color={C_FRAME}/>

        {/* Дверной проём */}
        <rect x={p + doorStartMirror * s} y={p + (CEILING_H - DOOR_H) * s}
          width={DOOR_W * s} height={DOOR_H * s}
          fill={C_DOOR + "11"} stroke={C_DOOR} strokeWidth={2} strokeDasharray="6 3"/>
        <text x={p + (doorStartMirror + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H/2) * s}
          textAnchor="middle" fill={C_DOOR} fontSize={12} fontWeight="bold">ПРОЁМ</text>

        {/* ГКЛ над дверью (от перегородки спальни до колонны 2) */}
        {/* Перегородка спальни совпадает с краем проёма, поэтому ГКЛ над дверью начинается от неё */}
        <rect x={p + (TOTAL_LEN - BEDROOM_PART_LEFT) * s} y={p}
          width={BEDROOM_PART_LEFT * s} height={(CEILING_H - DOOR_H) * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (TOTAL_LEN - BEDROOM_PART_LEFT/2) * s} y={p + (CEILING_H - DOOR_H)/2 * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {BEDROOM_PART_LEFT}×{CEILING_H - DOOR_H}</text>
        <SpecLabel x={p + (TOTAL_LEN - BEDROOM_PART_LEFT/2) * s + 60} y={p + (CEILING_H - DOOR_H)/2 * s} num={5} color={C_GKL_PANEL}/>

        {/* ГКЛ правее проёма (закрывает колонну 2 и стойку) — на зеркальном виде */}
        <rect x={p + doorEndMirror * s} y={p + OVER_DOOR_H * s}
          width={(TOTAL_LEN - doorEndMirror) * s} height={(CEILING_H - OVER_DOOR_H) * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (doorEndMirror + (TOTAL_LEN - doorEndMirror)/2) * s} y={p + (OVER_DOOR_H + (CEILING_H - OVER_DOOR_H)/2) * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {TOTAL_LEN - doorEndMirror}×{CEILING_H - OVER_DOOR_H}</text>

        {/* ГКЛ основной лист (от колонны 1 до перегородки спальни) */}
        <rect x={p} y={p + DOBOR_H * s}
          width={(TOTAL_LEN - BEDROOM_PART_RIGHT) * s} height={GKL_SHEET_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (TOTAL_LEN - BEDROOM_PART_RIGHT)/2 * s} y={p + (DOBOR_H + GKL_SHEET_H/2) * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {(TOTAL_LEN - BEDROOM_PART_RIGHT).toFixed(0)}×{GKL_SHEET_H}</text>
        <SpecLabel x={p + (TOTAL_LEN - BEDROOM_PART_RIGHT)/2 * s} y={p + (DOBOR_H + 30)} num={1} color={C_GKL_PANEL}/>

        {/* ГКЛ доборка сверху (от колонны 1 до перегородки спальни) */}
        <rect x={p} y={p}
          width={(TOTAL_LEN - BEDROOM_PART_RIGHT) * s} height={DOBOR_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (TOTAL_LEN - BEDROOM_PART_RIGHT)/2 * s} y={p + DOBOR_H/2 * s + 3}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {(TOTAL_LEN - BEDROOM_PART_RIGHT).toFixed(0)}×{DOBOR_H}</text>

        {/* Примыкание перегородки спальни (пунктирные линии, зеркальные координаты) */}
        <line x1={p + (TOTAL_LEN - BEDROOM_PART_RIGHT) * s} y1={p} x2={p + (TOTAL_LEN - BEDROOM_PART_RIGHT) * s} y2={p + CEILING_H * s}
          stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
        <line x1={p + (TOTAL_LEN - BEDROOM_PART_LEFT) * s} y1={p} x2={p + (TOTAL_LEN - BEDROOM_PART_LEFT) * s} y2={p + CEILING_H * s}
          stroke={C_BEDROOM_PART} strokeWidth={2} strokeDasharray="8 4"/>
        <text x={p + (TOTAL_LEN - BEDROOM_PART_LEFT - BEDROOM_PART_T/2) * s} y={p + CEILING_H * s - 10}
          textAnchor="middle" fill={C_BEDROOM_PART} fontSize={8}>перегородка спальни</text>

        {/* Размерные линии — колонны */}
        <HDim x1={p} x2={p + COL_W * s} y={p - 20}
          color={C_COLUMN} textColor={C_COLUMN} label={COL_W} fontSize={8}/>
        <HDim x1={p + partEnd * s} x2={p + TOTAL_LEN * s} y={p - 20}
          color={C_COLUMN} textColor={C_COLUMN} label={COL_W} fontSize={8}/>

        {/* Размерная линия перегородки */}
        <HDim x1={p + partStart * s} x2={p + partEnd * s} y={p - 20}
          label={HORIZ_LEN} fontSize={10}/>

        {/* Размерные линии — период между стойками (от левой грани до левой грани) */}
        {/* Стойки левее проёма */}
        {studsMirror.filter(pos => pos < doorStartMirror).slice(0, -1).map((pos, i) => {
          const studsBeforeDoor = studsMirror.filter(p => p < doorStartMirror);
          const nextPos = studsBeforeDoor[i + 1];
          if (nextPos) {
            const period = nextPos - pos;
            return (
              <HDim key={`period-back${i}`}
                x1={p + pos * s} x2={p + nextPos * s} y={p + CEILING_H * s + 20}
                label={period} fontSize={8}/>
            );
          }
          return null;
        })}
        {/* Проём */}
        <HDim x1={p + doorStartMirror * s} x2={p + doorEndMirror * s} y={p + CEILING_H * s + 40}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_W} fontSize={9}/>
        {/* Стойка у колонны 2 */}
        <HDim x1={p + doorEndMirror * s} x2={p + partEnd * s} y={p + CEILING_H * s + 40}
          color={C_FRAME} textColor={C_FRAME} label={PS_W} fontSize={8}/>

        {/* Общая длина с колоннами */}
        <HDim x1={p} x2={p + TOTAL_LEN * s} y={p + CEILING_H * s + 60}
          label={TOTAL_LEN} fontSize={10}/>

        {/* Высота */}
        <VDim x={p - 15} y1={p} y2={p + CEILING_H * s} label={CEILING_H} fontSize={9}/>
        {/* Высота двери (у левого края проёма на зеркальном виде) */}
        <VDim x={p + (doorStartMirror + 15) * s} y1={p + (CEILING_H - DOOR_H) * s} y2={p + CEILING_H * s}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_H} fontSize={9} labelX={p + (doorStartMirror + 20) * s}/>
        {/* Высота ГКЛ */}
        <VDim x={p + TOTAL_LEN * s + 15} y1={p + DOBOR_H * s} y2={p + CEILING_H * s}
          color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_SHEET_H} fontSize={8} labelX={p + TOTAL_LEN * s + 20}/>

      </svg>
    );
  };

  // === Вид сверху (план) ===
  const TopView = () => {
    const w = 950;
    const svgH = 340;
    const s = 0.28; // Масштаб

    // Длина кусочка перегородки спальни для отображения
    const bedroomPartLen = 350; // мм

    // Верхний отступ для перегородки спальни
    const topPadding = 70 + bedroomPartLen * s;
    const p = topPadding; // основная перегородка начинается после отступа

    // Глубина перегородки (с ГКЛ)
    const partDepth = PARTITION_T + GKL_T * 2; // 200 мм

    // Позиции слоёв по вертикали (сверху вниз: лестница → коридор → перегородка → ванная)
    // y=0 сверху — сторона лестницы/коридора
    // y=partDepth снизу — сторона ванной
    const gkl1Y = 0;                          // ГКЛ коридор (верх)
    const layer1Y = GKL_T;                    // Каркас слой 1 (коридор)
    const gapY = GKL_T + GKL_LAYER;           // Зазор между слоями
    const layer2Y = GKL_T + GKL_LAYER + GKL_GAP; // Каркас слой 2 (ванная)
    const gkl2Y = GKL_T + PARTITION_T;        // ГКЛ ванная (низ)

    // Смещение колонн относительно перегородки
    const colOffset = (partDepth - COL_H) / 2; // 25 мм

    return (
      <svg viewBox={`0 0 ${w} ${svgH}`}
        style={{ width: w, background: C_BG_SVG, borderRadius: 8 }}>

        <text x={w/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
          Л5.Сх3 — Вид сверху — структура двойной перегородки
        </text>
        <text x={w/2} y={42} textAnchor="middle" fill={C_TEXT_DIM} fontSize={10}>
          Примыкание перегородки спальни к краю дверного проёма
        </text>

        {/* Подписи направлений */}
        <text x={p - 35} y={p + layer1Y * s - bedroomPartLen/2 * s} textAnchor="end" fill={C_TEXT_DIM} fontSize={9}>
          ↑ Лестница
        </text>
        <text x={p - 35} y={p + partDepth/2 * s} textAnchor="end" fill={C_TEXT_DIM} fontSize={9}>
          Коридор
        </text>
        <text x={p - 35} y={p + partDepth * s + 15} textAnchor="end" fill={C_BATH} fontSize={9}>
          ↓ Ванная
        </text>

        {/* === Перегородка спальни (примыкает к стойке СВЕРХУ, со стороны лестницы) === */}
        {/* Нижний край примыкает к каркасу (layer1Y), а не к ГКЛ */}
        {/* Внешний слой спальни (сторона лестницы) */}
        <rect x={p + BEDROOM_PART_LEFT * s} y={p + layer1Y * s - bedroomPartLen * s}
          width={GKL_LAYER * s} height={bedroomPartLen * s}
          fill={C_BEDROOM_PART + "33"} stroke={C_BEDROOM_PART} strokeWidth={1.5}/>
        {/* Зазор перегородки спальни */}
        <rect x={p + (BEDROOM_PART_LEFT + GKL_LAYER) * s} y={p + layer1Y * s - bedroomPartLen * s}
          width={GKL_GAP * s} height={bedroomPartLen * s}
          fill="none" stroke={C_BEDROOM_PART} strokeWidth={1} strokeDasharray="3 2"/>
        {/* Внутренний слой спальни (сторона спальни) */}
        <rect x={p + (BEDROOM_PART_LEFT + GKL_LAYER + GKL_GAP) * s} y={p + layer1Y * s - bedroomPartLen * s}
          width={GKL_LAYER * s} height={bedroomPartLen * s}
          fill={C_BEDROOM_PART + "33"} stroke={C_BEDROOM_PART} strokeWidth={1.5}/>

        {/* Стойка перегородки спальни со стороны проёма (в нижней части) */}
        {/* Стойка в внешнем слое (сторона лестницы) */}
        <line x1={p + BEDROOM_PART_LEFT * s} y1={p + layer1Y * s - PS_W * s}
          x2={p + (BEDROOM_PART_LEFT + GKL_LAYER) * s} y2={p + layer1Y * s - PS_W * s}
          stroke={C_BEDROOM_PART} strokeWidth={1.5}/>
        {/* Брус 75×50 между стойками (в зазоре) */}
        <rect x={p + (BEDROOM_PART_LEFT + GKL_LAYER) * s} y={p + layer1Y * s - PS_W * s}
          width={GKL_GAP * s} height={PS_W * s}
          fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={1.5}/>
        {/* Стойка в внутреннем слое (сторона спальни) */}
        <line x1={p + (BEDROOM_PART_LEFT + GKL_LAYER + GKL_GAP) * s} y1={p + layer1Y * s - PS_W * s}
          x2={p + (BEDROOM_PART_LEFT + BEDROOM_PART_T) * s} y2={p + layer1Y * s - PS_W * s}
          stroke={C_BEDROOM_PART} strokeWidth={1.5}/>

        {/* Подпись */}
        <text x={p + (BEDROOM_PART_LEFT + BEDROOM_PART_T/2) * s} y={p + layer1Y * s - bedroomPartLen/2 * s}
          textAnchor="middle" fill={C_BEDROOM_PART} fontSize={8}
          transform={`rotate(-90,${p + (BEDROOM_PART_LEFT + BEDROOM_PART_T/2) * s},${p + layer1Y * s - bedroomPartLen/2 * s})`}>
          перегородка спальни
        </text>

        {/* Стрелка направления перегородки спальни (к верхней стене) */}
        <defs>
          <marker id="arrowBedroom" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill={C_BEDROOM_PART}/>
          </marker>
        </defs>
        <line x1={p + (BEDROOM_PART_LEFT + BEDROOM_PART_T/2) * s} y1={p + layer1Y * s - bedroomPartLen * s}
          x2={p + (BEDROOM_PART_LEFT + BEDROOM_PART_T/2) * s} y2={p + layer1Y * s - bedroomPartLen * s - 25}
          stroke={C_BEDROOM_PART} strokeWidth={2} markerEnd="url(#arrowBedroom)"/>
        <text x={p + (BEDROOM_PART_LEFT + BEDROOM_PART_T/2) * s + 5} y={p + layer1Y * s - bedroomPartLen * s - 15}
          textAnchor="start" fill={C_BEDROOM_PART} fontSize={7}>к верхней стене</text>

        {/* === Колонна 2 (слева) === */}
        <rect x={p} y={p + colOffset * s} width={COL_W * s} height={COL_H * s}
          fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
        <text x={p + COL_W/2 * s} y={p + colOffset * s + COL_H/2 * s + 3}
          textAnchor="middle" fill={C_COLUMN} fontSize={8}>Кол.2</text>

        {/* === Колонна 1 (справа) === */}
        <rect x={p + (COL_W + HORIZ_LEN) * s} y={p + colOffset * s} width={COL_W * s} height={COL_H * s}
          fill={C_COL_FILL} stroke={C_COLUMN} strokeWidth={2}/>
        <text x={p + (COL_W + HORIZ_LEN + COL_W/2) * s} y={p + colOffset * s + COL_H/2 * s + 3}
          textAnchor="middle" fill={C_COLUMN} fontSize={8}>Кол.1</text>

        {/* === ГКЛ сторона коридора (разделён перегородкой спальни) === */}
        {/* Левая часть: от колонны 2 до перегородки спальни */}
        <rect x={p} y={p + gkl1Y * s} width={BEDROOM_PART_LEFT * s} height={GKL_T * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={1}/>
        <SpecLabel x={p + BEDROOM_PART_LEFT/2 * s} y={p + gkl1Y * s - 12} num={5} size={12} fontSize={8} color={C_GKL_PANEL}/>
        {/* Правая часть: от перегородки спальни до колонны 1 */}
        <rect x={p + BEDROOM_PART_RIGHT * s} y={p + gkl1Y * s} width={(TOTAL_LEN - BEDROOM_PART_RIGHT) * s} height={GKL_T * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={1}/>
        <SpecLabel x={p + (BEDROOM_PART_RIGHT + (TOTAL_LEN - BEDROOM_PART_RIGHT)/2) * s} y={p + gkl1Y * s - 12} num={1} size={12} fontSize={8} color={C_GKL_PANEL}/>

        {/* === Дверной проём (заливка под каркасом) === */}
        <rect x={p + DOOR_START * s} y={p + layer1Y * s} width={DOOR_W * s} height={PARTITION_T * s}
          fill={C_DOOR + "22"} stroke="none"/>

        {/* === Каркас слой 1 (сторона коридора) === */}
        {/* До проёма — стойка у колонны 2 */}
        <rect x={p + COL_W * s} y={p + layer1Y * s} width={PS_W * s} height={GKL_LAYER * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        {/* В проёме — пунктирные линии */}
        <line x1={p + DOOR_START * s} y1={p + layer1Y * s} x2={p + DOOR_END * s} y2={p + layer1Y * s}
          stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
        <line x1={p + DOOR_START * s} y1={p + (layer1Y + GKL_LAYER) * s} x2={p + DOOR_END * s} y2={p + (layer1Y + GKL_LAYER) * s}
          stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
        {/* После проёма до колонны 1 */}
        <rect x={p + DOOR_END * s} y={p + layer1Y * s} width={(COL_W + HORIZ_LEN - DOOR_END) * s} height={GKL_LAYER * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* === Зазор между слоями (ПН 75) === */}
        {/* До проёма — стойка */}
        <rect x={p + COL_W * s} y={p + gapY * s} width={PS_W * s} height={GKL_GAP * s}
          fill="none" stroke={C_FRAME} strokeWidth={1}/>
        {/* Брус 75×50 между стойками у колонны 2 */}
        <rect x={p + COL_W * s} y={p + gapY * s} width={PS_W * s} height={GKL_GAP * s}
          fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={1.5}/>
        <SpecLabel x={p + (COL_W + PS_W/2) * s} y={p + (gapY + GKL_GAP/2) * s} num={6} size={12} fontSize={8} color={C_BEAM}/>
        {/* В проёме — пунктирные линии */}
        <line x1={p + DOOR_START * s} y1={p + gapY * s} x2={p + DOOR_END * s} y2={p + gapY * s}
          stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
        <line x1={p + DOOR_START * s} y1={p + (gapY + GKL_GAP) * s} x2={p + DOOR_END * s} y2={p + (gapY + GKL_GAP) * s}
          stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
        {/* После проёма */}
        <rect x={p + DOOR_END * s} y={p + gapY * s} width={(COL_W + HORIZ_LEN - DOOR_END) * s} height={GKL_GAP * s}
          fill="none" stroke={C_FRAME} strokeWidth={1}/>
        <SpecLabel x={p + (DOOR_END + (COL_W + HORIZ_LEN - DOOR_END)/2) * s} y={p + (gapY + GKL_GAP/2) * s} num={10} size={12} fontSize={8} color={C_FRAME}/>

        {/* === Каркас слой 2 (сторона ванной) === */}
        {/* До проёма — стойка */}
        <rect x={p + COL_W * s} y={p + layer2Y * s} width={PS_W * s} height={GKL_LAYER * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        {/* В проёме — пунктирные линии */}
        <line x1={p + DOOR_START * s} y1={p + layer2Y * s} x2={p + DOOR_END * s} y2={p + layer2Y * s}
          stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
        <line x1={p + DOOR_START * s} y1={p + (layer2Y + GKL_LAYER) * s} x2={p + DOOR_END * s} y2={p + (layer2Y + GKL_LAYER) * s}
          stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
        {/* После проёма */}
        <rect x={p + DOOR_END * s} y={p + layer2Y * s} width={(COL_W + HORIZ_LEN - DOOR_END) * s} height={GKL_LAYER * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* === Стоечные профили ПС в слое 1 (коридор) с номерами === */}
        {STUD_POSITIONS_CORRIDOR.filter(pos => pos < DOOR_START || pos >= DOOR_END).map((pos, i) => (
          <g key={`stud-top1-${i}`}>
            <line x1={p + pos * s} y1={p + layer1Y * s} x2={p + pos * s} y2={p + (layer1Y + GKL_LAYER) * s}
              stroke={C_FRAME} strokeWidth={1.5}/>
            <line x1={p + (pos + PS_W) * s} y1={p + layer1Y * s} x2={p + (pos + PS_W) * s} y2={p + (layer1Y + GKL_LAYER) * s}
              stroke={C_FRAME} strokeWidth={1.5}/>
            <StudLabel x={p + (pos + PS_W/2) * s} y={p + layer1Y * s - 10} num={getStudNumberCorridor(pos)} r={8} fontSize={9} color={C_FRAME}/>
            <SpecLabel x={p + (pos + PS_W/2) * s} y={p + layer1Y * s - 30} num={13} size={12} fontSize={8} color={C_FRAME}/>
          </g>
        ))}

        {/* === Стоечные профили ПС в слое 2 (ванная) с номерами === */}
        {STUD_POSITIONS_BATH.filter(pos => pos < DOOR_START || pos >= DOOR_END).map((pos, i) => (
          <g key={`stud-top2-${i}`}>
            <line x1={p + pos * s} y1={p + layer2Y * s} x2={p + pos * s} y2={p + (layer2Y + GKL_LAYER) * s}
              stroke={C_FRAME} strokeWidth={1.5}/>
            <line x1={p + (pos + PS_W) * s} y1={p + layer2Y * s} x2={p + (pos + PS_W) * s} y2={p + (layer2Y + GKL_LAYER) * s}
              stroke={C_FRAME} strokeWidth={1.5}/>
            <StudLabel x={p + (pos + PS_W/2) * s} y={p + (layer2Y + GKL_LAYER) * s + 10} num={getStudNumberBath(pos)} r={8} fontSize={9} color={C_FRAME}/>
            <SpecLabel x={p + (pos + PS_W/2) * s} y={p + (layer2Y + GKL_LAYER) * s + 30} num={13} size={12} fontSize={8} color={C_FRAME}/>
          </g>
        ))}

        {/* === ГКЛ сторона ванной (непрерывно, включая над проёмом) === */}
        <rect x={p} y={p + gkl2Y * s} width={TOTAL_LEN * s} height={GKL_T * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={1}/>
        <SpecLabel x={p + TOTAL_LEN/2 * s} y={p + (gkl2Y + GKL_T) * s + 12} num={1} size={12} fontSize={8} color={C_GKL_PANEL}/>

        {/* === Дверной проём (контур поверх каркаса) === */}
        <rect x={p + DOOR_START * s} y={p + layer1Y * s} width={DOOR_W * s} height={PARTITION_T * s}
          fill="none" stroke={C_DOOR} strokeWidth={2} strokeDasharray="6 3"/>
        <text x={p + (DOOR_START + DOOR_W/2) * s} y={p + (layer1Y + PARTITION_T/2) * s + 3}
          textAnchor="middle" fill={C_DOOR} fontSize={10} fontWeight="bold">ПРОЁМ {DOOR_W}</text>

        {/* === Размерные линии === */}
        {/* Колонна 2 */}
        <HDim x1={p} x2={p + COL_W * s} y={p + partDepth * s + 20}
          color={C_COLUMN} textColor={C_COLUMN} label={COL_W} fontSize={8}/>
        {/* Стойка у колонны 2 */}
        <HDim x1={p + COL_W * s} x2={p + DOOR_START * s} y={p + partDepth * s + 20}
          color={C_FRAME} textColor={C_FRAME} label={PS_W} fontSize={8}/>
        {/* Проём */}
        <HDim x1={p + DOOR_START * s} x2={p + DOOR_END * s} y={p + partDepth * s + 20}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_W} fontSize={9}/>
        {/* После проёма до колонны 1 */}
        <HDim x1={p + DOOR_END * s} x2={p + (COL_W + HORIZ_LEN) * s} y={p + partDepth * s + 20}
          label={COL_W + HORIZ_LEN - DOOR_END} fontSize={8}/>
        {/* Колонна 1 */}
        <HDim x1={p + (COL_W + HORIZ_LEN) * s} x2={p + TOTAL_LEN * s} y={p + partDepth * s + 20}
          color={C_COLUMN} textColor={C_COLUMN} label={COL_W} fontSize={8}/>

        {/* Общая длина */}
        <HDim x1={p} x2={p + TOTAL_LEN * s} y={p + partDepth * s + 40}
          label={TOTAL_LEN} fontSize={10}/>

        {/* Толщина перегородки (справа) */}
        <VDim x={p + TOTAL_LEN * s + 15} y1={p} y2={p + partDepth * s}
          label={partDepth.toFixed(0)} fontSize={9} labelX={p + TOTAL_LEN * s + 25}/>

        {/* Детализация толщины */}
        <VDim x={p + TOTAL_LEN * s + 45} y1={p} y2={p + GKL_T * s}
          color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_T} fontSize={7} labelX={p + TOTAL_LEN * s + 55}/>
        <VDim x={p + TOTAL_LEN * s + 45} y1={p + layer1Y * s} y2={p + gapY * s}
          color={C_FRAME} textColor={C_FRAME} label={GKL_LAYER} fontSize={7} labelX={p + TOTAL_LEN * s + 55}/>
        <VDim x={p + TOTAL_LEN * s + 45} y1={p + gapY * s} y2={p + layer2Y * s}
          label={GKL_GAP} fontSize={7} labelX={p + TOTAL_LEN * s + 55}/>
        <VDim x={p + TOTAL_LEN * s + 45} y1={p + layer2Y * s} y2={p + gkl2Y * s}
          color={C_FRAME} textColor={C_FRAME} label={GKL_LAYER} fontSize={7} labelX={p + TOTAL_LEN * s + 55}/>
        <VDim x={p + TOTAL_LEN * s + 45} y1={p + gkl2Y * s} y2={p + partDepth * s}
          color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_T} fontSize={7} labelX={p + TOTAL_LEN * s + 55}/>


      </svg>
    );
  };

  // === Легенда ===
  const Legend = () => {
    const items = [
      { fill: C_COL_FILL, stroke: C_COLUMN, label: `Колонна ${COL_W}×${COL_H}` },
      { fill: C_FRAME_FILL, stroke: C_FRAME, label: `Профиль ПС/ПН` },
      { fill: C_BEAM_FILL, stroke: C_BEAM, label: `Брус ${BEAM_W}×${BEAM_H} (механизм)` },
      { fill: C_GKL_FILL, stroke: C_GKL_PANEL, label: `ГКЛ ${GKL_T} мм` },
      { fill: C_DOOR + "11", stroke: C_DOOR, dashed: true, label: "Дверной проём" },
      { fill: "transparent", stroke: C_BEDROOM_PART, dashed: true, label: `Примыкание перег. спальни (${BEDROOM_PART_T} мм)` },
    ];
    return (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", fontSize: 12, color: C_TEXT_DIM }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              width: 20, height: 12,
              background: item.fill,
              border: `2px ${item.dashed ? "dashed" : "solid"} ${item.stroke}`,
              borderRadius: 2
            }}/>
            {item.label}
          </span>
        ))}
        <span style={{ color: C_TEXT_DIM }}>| Шаг стоек: {STUD_STEP} мм | Все размеры в мм</span>
      </div>
    );
  };

  // === Разрез перегородки ===
  const SectionView = () => {
    const w = 420;
    const svgH = 420;
    const s = S_SECTION;
    const h = 300;
    const topY = 55;

    const layer1X = 0;
    const gapX = PS_W;
    const layer2X = PS_W + GKL_GAP;
    const totalW = PS_W * 2 + GKL_GAP; // 175 мм

    const schemaW = (totalW + GKL_T * 2) * s;
    const p = (w - schemaW) / 2 + GKL_T * s;

    return (
      <svg viewBox={`0 0 ${w} ${svgH}`}
        style={{ width: w, background: C_BG_SVG, borderRadius: 8 }}>

        <text x={w/2} y={18} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={13} fontWeight="bold">
          Л5.Сх4 — Разрез двойной перегородки
        </text>
        <text x={w/2} y={34} textAnchor="middle" fill={C_TEXT_DIM} fontSize={10}>
          ГКЛ {GKL_T} мм в 1 слой | ПН 75 между слоями
        </text>

        {/* Слой 1 */}
        <rect x={p + layer1X * s} y={topY} width={PS_W * s} height={h}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <text x={p + PS_W/2 * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={8}>ПС</text>

        {/* Зазор — профиль ПН 75 на полу и потолке */}
        <rect x={p + gapX * s} y={topY} width={GKL_GAP * s} height={h}
          fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>
        {/* ПН 75 на потолке */}
        <rect x={p + gapX * s} y={topY} width={PN_GAP_W * s} height={PN_GAP_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        {/* ПН 75 на полу */}
        <rect x={p + gapX * s} y={topY + h - PN_GAP_H * s} width={PN_GAP_W * s} height={PN_GAP_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <text x={p + (gapX + GKL_GAP/2) * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={7}>ПН 75</text>
        <SpecLabel x={p + (gapX + GKL_GAP/2) * s} y={topY + h/2 + 25} num={10} color={C_FRAME}/>

        {/* Слой 2 */}
        <rect x={p + layer2X * s} y={topY} width={PS_W * s} height={h}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <text x={p + (layer2X + PS_W/2) * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={8}>ПС</text>

        {/* ГКЛ слева */}
        <rect x={p - GKL_T * s} y={topY} width={GKL_T * s} height={h}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>

        {/* ГКЛ справа */}
        <rect x={p + (layer2X + PS_W) * s} y={topY} width={GKL_T * s} height={h}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>

        {/* Подписи */}
        <text x={p - GKL_T * s - 5} y={topY + h/2} textAnchor="end" fill={C_TEXT_DIM} fontSize={8}>Коридор</text>
        <text x={p + (layer2X + PS_W) * s + GKL_T * s + 5} y={topY + h/2} textAnchor="start" fill={C_BATH} fontSize={8}>Ванная</text>

        {/* Размерные линии */}
        <HDim x1={p - GKL_T * s} x2={p} y={topY + h + 15}
          label={GKL_T} fontSize={8}/>
        <HDim x1={p} x2={p + PS_W * s} y={topY + h + 15}
          color={C_FRAME} textColor={C_FRAME} label={PS_W} fontSize={8}/>
        <HDim x1={p + gapX * s} x2={p + layer2X * s} y={topY + h + 15}
          label={GKL_GAP} fontSize={8}/>
        <HDim x1={p + layer2X * s} x2={p + (layer2X + PS_W) * s} y={topY + h + 15}
          color={C_FRAME} textColor={C_FRAME} label={PS_W} fontSize={8}/>
        <HDim x1={p + (layer2X + PS_W) * s} x2={p + (layer2X + PS_W) * s + GKL_T * s} y={topY + h + 15}
          label={GKL_T} fontSize={8}/>

        {/* Общая толщина */}
        <HDim x1={p - GKL_T * s} x2={p + (layer2X + PS_W) * s + GKL_T * s} y={topY + h + 35}
          label={PARTITION_T + GKL_T * 2} fontSize={9}/>

      </svg>
    );
  };

  // === Спецификация ===
  const Specification = () => {
    // ГКЛ основной лист (стандартная ширина, с вырезом)
    const gklMainW = GKL_SHEET_W; // 1200 мм
    // ГКЛ доборка у колонны 1
    const gklColDoborW = TOTAL_LEN - DOOR_END - GKL_SHEET_W; // 90 мм
    // ГКЛ над дверью (до середины стойки справа от проёма)
    const gklOverDoorW = DOOR_END + PS_W/2; // 1175 мм (колонна 2 + стойка + проём + половина стойки)
    // Длина бруса — на всю перегородку
    const beamLen = HORIZ_LEN; // 2040 мм
    // Длина ПН на полу — после проёма (partEnd - DOOR_END)
    const pnFloorLen = COL_W + HORIZ_LEN - DOOR_END; // 1090 мм
    // Длина ПН для стыка ГКЛ
    const pnJointLen = COL_W + HORIZ_LEN - DOOR_END; // 1090 мм

    const items = [
      { num: 1, name: `ГКЛ лист (основной)`, size: `${gklMainW}×${GKL_SHEET_H}×${GKL_T}`, qty: "2 шт", note: "от границы проёма, с вырезом × 2 стороны" },
      { num: 2, name: `ГКЛ (доборка у колонны 1)`, size: `${gklColDoborW.toFixed(0)}×${GKL_SHEET_H}×${GKL_T}`, qty: "2 шт", note: "закрывает колонну 1" },
      { num: 3, name: `ГКЛ (доборка сверху)`, size: `${gklMainW}×${DOBOR_H}×${GKL_T}`, qty: "2 шт", note: "над основным листом" },
      { num: 4, name: `ГКЛ (доборка сверху у кол.1)`, size: `${gklColDoborW.toFixed(0)}×${DOBOR_H}×${GKL_T}`, qty: "2 шт", note: "над колонной 1" },
      { num: 5, name: `ГКЛ (над дверью)`, size: `${gklOverDoorW.toFixed(0)}×${OVER_DOOR_H}×${GKL_T}`, qty: "2 шт", note: "закрывает колонну 2 и механизм" },
      { num: 6, name: `Брус (на всю перегородку)`, size: `${beamLen}×${BEAM_H}×${BEAM_W} мм`, qty: "2 шт", note: `низ на ${BEAM_LEVEL} мм, для механизма × 2 слоя` },
      { num: 7, name: "Профиль ПН 50×40 (пол, после проёма)", size: `${pnFloorLen} мм`, qty: "2 шт", note: "после проёма × 2 слоя" },
      { num: 8, name: "Профиль ПН 50×40 (пол, у кол.2)", size: `${PS_W} мм`, qty: "2 шт", note: "под стойкой у колонны 2 × 2 слоя" },
      { num: 9, name: "Профиль ПН 50×40 (потолок)", size: `${HORIZ_LEN} мм`, qty: "2 шт", note: "на всю длину × 2 слоя" },
      { num: 10, name: "Профиль ПН 75×40 (между слоями)", size: `${HORIZ_LEN} мм`, qty: "2 шт", note: "пол + потолок для зазора 75мм" },
      { num: 11, name: "Профиль ПН 50×40 (над дверью)", size: `${DOOR_W} мм`, qty: "2 шт", note: `только над проёмом, низ на ${DOOR_H} мм × 2 слоя` },
      { num: 12, name: "Профиль ПН 50×40 (стык ГКЛ)", size: `${pnJointLen} мм`, qty: "2 шт", note: `центр на ${GKL_SHEET_H} мм × 2 слоя` },
      { num: 13, name: "Профиль ПС 50×50", size: `${CEILING_H - PN_H * 2} мм`, qty: `${STUD_POSITIONS.length * 2} шт`, note: `${STUD_POSITIONS.length} стоек × 2 слоя` },
    ];

    return (
      <div style={{ background: C_BG_SVG, borderRadius: 8, padding: 16, maxWidth: 750 }}>
        <h3 style={{ color: C_COLUMN_TEXT, margin: "0 0 12px", fontSize: 14 }}>Спецификация материалов</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C_TEXT_DIM}` }}>
              <th style={{ textAlign: "center", padding: "8px 4px", color: C_TEXT, width: 30 }}>№</th>
              <th style={{ textAlign: "left", padding: "8px 4px", color: C_TEXT }}>Элемент</th>
              <th style={{ textAlign: "left", padding: "8px 4px", color: C_TEXT }}>Размер</th>
              <th style={{ textAlign: "center", padding: "8px 4px", color: C_TEXT }}>Кол-во</th>
              <th style={{ textAlign: "left", padding: "8px 4px", color: C_TEXT }}>Примечание</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.num} style={{ borderBottom: `1px solid ${C_TEXT_DIM}33` }}>
                <td style={{ padding: "6px 4px", color: C_DIM, textAlign: "center", fontWeight: "bold" }}>{item.num}</td>
                <td style={{ padding: "6px 4px", color: C_DIM }}>{item.name}</td>
                <td style={{ padding: "6px 4px", color: C_TEXT_DIM }}>{item.size}</td>
                <td style={{ padding: "6px 4px", color: C_TEXT_DIM, textAlign: "center" }}>{item.qty}</td>
                <td style={{ padding: "6px 4px", color: C_TEXT_DIM, fontSize: 10 }}>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 12 }}>
          * Лист ГКЛ от пола | Доборка сверху: {DOBOR_H} мм | Шаг стоек: {STUD_STEP} мм
        </p>
        <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 4 }}>
          * Брус на {BEAM_LEVEL} мм для механизма откатной двери | ПН на {DOOR_H} мм | ГКЛ закрывает механизм ({OVER_DOOR_H} мм)
        </p>
        <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 4 }}>
          * Колонны {COL_W}×{COL_H} мм — несущие, ГКЛ монтируются поверх колонн
        </p>
      </div>
    );
  };

  return (
    <div style={{ background: C_BG, minHeight: "100vh", padding: 20, fontFamily: "sans-serif", color: C_TEXT }}>
      <h2 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "0 0 4px" }}>
        Лист 5 — Каркас перегородки ванной
      </h2>
      <p style={{ textAlign: "center", color: C_TEXT_DIM, margin: "0 0 16px", fontSize: 14 }}>
        Колонны {COL_W}×{COL_H} мм | Двойная перегородка {PARTITION_T} мм | ГКЛ закрывают колонны | Шаг стоек {STUD_STEP} мм
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <FrontView />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <BackView />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <TopView />
      </div>

      {/* Легенда */}
      <div style={{ marginBottom: 20 }}>
        <Legend />
      </div>

      {/* Разрез и спецификация */}
      <h3 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "20px 0 12px", fontSize: 16 }}>
        Разрез и спецификация
      </h3>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
        <SectionView />
        <Specification />
      </div>
    </div>
  );
}
