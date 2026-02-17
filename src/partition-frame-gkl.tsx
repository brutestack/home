import { useState } from "react";
import { HDim, VDim } from "./svg-primitives";
import {
  C_BG, C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_TOOLTIP_BG,
  C_DIM, C_GKL, C_WARDROBE
} from "./colors";

// === Константы перегородки (вариант ГКЛ) ===
const CEILING_H = 2800;        // Высота потолка (мм)
const GKL_SHEET_H = 2500;      // Высота листа ГКЛ (мм)
const GKL_SHEET_W = 1200;      // Ширина листа ГКЛ (мм)
const GKL_T = 12.5;            // Толщина листа ГКЛ (мм)
const DOBOR_H = CEILING_H - GKL_SHEET_H; // Доборка сверху (300мм)

const DOOR_W = 900;            // Ширина дверного проёма (мм)
const DOOR_H = 2000;           // Высота проёма до ГКЛ (мм)
const BEAM_LEVEL = 2100;       // Высота нижней грани бруса от пола (мм) — для механизма двери
const DOOR_OFFSET = 50;        // Отступ проёма от ванной (мм)
const OVER_DOOR_H = CEILING_H - DOOR_H; // ГКЛ над дверью (800мм)

const GKL_LAYER = 50;          // Толщина слоя каркаса (мм)
const GKL_GAP = 75;            // Зазор между слоями (мм) — профиль ПН 75×40
const PARTITION_T = GKL_LAYER * 2 + GKL_GAP; // Общая толщина каркаса (175мм)

// Профиль между слоями (для равномерного зазора)
const PN_GAP_W = 75;           // Ширина направляющего профиля между слоями (мм)
const PN_GAP_H = 40;           // Высота направляющего профиля между слоями (мм)

const HORIZ_W = 700;           // Длина горизонтальной части (мм)
const HORIZ_T = 50;            // Толщина горизонтальной части (мм)

// Общая длина вертикальной перегородки (от верхней стены до ванной)
const VERT_LEN = 2770;         // 5400 - 2630 = 2770 мм

// Шаг стоечных профилей для однослойного ГКЛ
const STUD_STEP = 600;         // 600 мм — стандартный шаг

// Профили каркаса
const PN_W = 50;               // Ширина направляющего профиля (мм)
const PN_H = 40;               // Высота направляющего профиля (мм)
const PS_W = 50;               // Ширина стоечного профиля (мм)
const PS_H = 50;               // Толщина стоечного профиля (мм)

// Брус над дверью
const BEAM_W = 50;             // Ширина бруса (мм)
const BEAM_H = 70;             // Высота бруса (мм)

// Цвета
const C_FRAME = "#8B4513";     // Профиль каркаса (коричневый)
const C_FRAME_FILL = "#8B451333";
const C_BEAM = "#A0522D";      // Деревянный брус (сиена)
const C_BEAM_FILL = "#A0522D55";
const C_GKL_PANEL = "#9E9E9E"; // ГКЛ лист (серый)
const C_GKL_FILL = "#9E9E9E22";
const C_DOBOR = "#757575";     // Доборка ГКЛ
const C_DOOR = "#228B22";      // Дверной проём (зелёный)

// Расчёт позиций стоек
// Проём: 1820-2720 мм (ширина 900, отступ 50 от ванной)
const DOOR_START = VERT_LEN - DOOR_OFFSET - DOOR_W; // 1820 мм
const DOOR_END = VERT_LEN - DOOR_OFFSET;            // 2720 мм
const DOOR_STUD_LEFT = DOOR_START - PS_W;           // 1770 мм — левая стойка у проёма
const DOOR_STUD_LEFT_MID = DOOR_STUD_LEFT + PS_W / 2; // 1795 мм — середина левой стойки

// Раскладка ГКЛ: узкий лист у стены, полный лист к проёму
// Лист 1: 0 - 620 мм (обрезной)
// Лист 2: 620 - 1820 мм (полный 1200 мм)
const NARROW_SHEET_W = DOOR_START - GKL_SHEET_W; // 620 мм
const SHEET_JOINT = NARROW_SHEET_W; // Стык листов на 620 мм

// Стойки: у стены, центрированная на стыке листов, с шагом 600, у проёма
// Стойка центрируется на стыке, чтобы дать нахлёст ~25 мм с каждой стороны
const getStudPositions = () => {
  const studs: number[] = [0]; // Стойка у стены (левый край)
  studs.push(SHEET_JOINT - PS_W / 2); // Стойка центрирована на стыке (595 мм)
  // Дополнительные стойки с шагом 600 мм от стыка
  let pos = SHEET_JOINT + STUD_STEP; // 1220
  while (pos < DOOR_START - PS_W) {
    studs.push(pos - PS_W / 2); // Центрируем
    pos += STUD_STEP;
  }
  // Стойка у начала проёма (правый край на doorStart)
  studs.push(DOOR_START - PS_W); // 1770
  // Стойка у конца проёма (левый край на doorEnd)
  studs.push(DOOR_END); // 2720
  return studs;
};

const STUD_POSITIONS = getStudPositions();

export default function PartitionFrameGkl() {
  const [mouse, setMouse] = useState<{x: number, y: number, view: string} | null>(null);

  // === Масштабы для разных видов ===
  const S_FRONT = 0.28;        // Масштаб вида спереди (px/мм)
  const S_SECTION = 1.3;       // Масштаб разреза (px/мм)

  // === Размеры SVG ===
  const FRONT_W = 1000;
  const FRONT_H = 900;

  // === Вид спереди (со стороны лестницы) ===
  const FrontView = () => {
    const p = 70; // padding
    const s = S_FRONT;

    return (
      <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          const scale = FRONT_W / r.width;
          const x = (e.clientX - r.left) * scale - p;
          const y = (e.clientY - r.top) * scale - p;
          if (x >= 0 && x <= VERT_LEN * s && y >= 0 && y <= CEILING_H * s) {
            setMouse({ x: x / s, y: CEILING_H - y / s, view: 'front' });
          } else {
            setMouse(null);
          }
        }}
        onMouseLeave={() => setMouse(null)}
        style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

        <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
          Вид спереди — каркас под ГКЛ (шаг стоек {STUD_STEP} мм)
        </text>

        {/* Общая ширина конструкции (сверху) */}
        <HDim x1={p} x2={p + VERT_LEN * s} y={p - 20} label={VERT_LEN} fontSize={10}/>

        {/* Контур помещения */}
        <rect x={p} y={p} width={VERT_LEN * s} height={CEILING_H * s}
          fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

        {/* Пол и потолок */}
        <line x1={p} y1={p + CEILING_H * s} x2={p + VERT_LEN * s} y2={p + CEILING_H * s}
          stroke={C_TEXT} strokeWidth={2}/>
        <line x1={p} y1={p} x2={p + VERT_LEN * s} y2={p}
          stroke={C_TEXT} strokeWidth={2}/>

        {/* Направляющие профили ПН на полу */}
        <rect x={p} y={p + CEILING_H * s - PN_H * s} width={DOOR_START * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <rect x={p + DOOR_END * s} y={p + CEILING_H * s - PN_H * s} width={(VERT_LEN - DOOR_END) * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Направляющие профили ПН на потолке */}
        <rect x={p} y={p} width={VERT_LEN * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Стоечные профили ПС */}
        {STUD_POSITIONS.map((pos, i) => {
          const isEdgeStud = pos === DOOR_START - PS_W || pos === DOOR_END;
          return (
            <g key={`stud${i}`}>
              <rect x={p + pos * s} y={p + PN_H * s}
                width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
                fill={isEdgeStud ? C_BEAM_FILL : C_FRAME_FILL}
                stroke={isEdgeStud ? C_BEAM : C_FRAME}
                strokeWidth={isEdgeStud ? 1.5 : 1}/>
              {/* Подпись позиции */}
              <text x={p + (pos + PS_W/2) * s} y={p + 60}
                textAnchor="middle" fill={C_TEXT_DIM} fontSize={7}>{pos}</text>
            </g>
          );
        })}

        {/* Перемычка над дверью — деревянный брус на 2100 мм (для механизма откатной двери) */}
        <rect x={p} y={p + (CEILING_H - BEAM_LEVEL - BEAM_H) * s}
          width={DOOR_END * s} height={BEAM_H * s}
          fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
        <text x={p + DOOR_END/2 * s} y={p + (CEILING_H - BEAM_LEVEL - BEAM_H/2) * s + 3}
          textAnchor="middle" fill={C_BEAM} fontSize={8}>брус {DOOR_END}×{BEAM_H}×{BEAM_W}</text>

        {/* Горизонтальная направляющая ПН над дверью (для крепления нижнего края ГКЛ) */}
        {/* От середины левой стойки проёма до ванной, низ на 2000 мм */}
        <rect x={p + DOOR_STUD_LEFT_MID * s} y={p + (CEILING_H - DOOR_H - PN_H) * s}
          width={(VERT_LEN - DOOR_STUD_LEFT_MID) * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Горизонтальная направляющая ПН на стыке ГКЛ/доборки */}
        {/* От стены до середины левой стойки, центрирована на 2500 мм */}
        <rect x={p} y={p + (CEILING_H - GKL_SHEET_H - PN_H / 2) * s}
          width={DOOR_STUD_LEFT_MID * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Дверной проём */}
        <rect x={p + DOOR_START * s} y={p + (CEILING_H - DOOR_H) * s}
          width={DOOR_W * s} height={DOOR_H * s}
          fill={C_DOOR + "11"} stroke={C_DOOR} strokeWidth={2} strokeDasharray="6 3"/>
        <text x={p + (DOOR_START + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H/2) * s}
          textAnchor="middle" fill={C_DOOR} fontSize={12} fontWeight="bold">ПРОЁМ</text>
        <text x={p + (DOOR_START + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H/2) * s + 16}
          textAnchor="middle" fill={C_DOOR} fontSize={10}>{DOOR_W}×{DOOR_H}</text>

        {/* ГКЛ листы (основные, от пола) */}
        {/* Лист 1: 0-620 (обрезной, у стены) */}
        <rect x={p} y={p + DOBOR_H * s}
          width={NARROW_SHEET_W * s} height={GKL_SHEET_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + NARROW_SHEET_W/2 * s} y={p + (DOBOR_H + GKL_SHEET_H/2) * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {NARROW_SHEET_W}×{GKL_SHEET_H}</text>

        {/* Лист 2: 620-1820 (полный, к проёму) с вырезом в верхнем правом углу */}
        <polygon
          points={`
            ${p + NARROW_SHEET_W * s},${p + DOBOR_H * s}
            ${p + DOOR_STUD_LEFT_MID * s},${p + DOBOR_H * s}
            ${p + DOOR_STUD_LEFT_MID * s},${p + OVER_DOOR_H * s}
            ${p + DOOR_START * s},${p + OVER_DOOR_H * s}
            ${p + DOOR_START * s},${p + CEILING_H * s}
            ${p + NARROW_SHEET_W * s},${p + CEILING_H * s}
          `}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (NARROW_SHEET_W + GKL_SHEET_W/2) * s} y={p + (DOBOR_H + GKL_SHEET_H/2) * s + 50}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {GKL_SHEET_W}×{GKL_SHEET_H}</text>
        <text x={p + (NARROW_SHEET_W + GKL_SHEET_W/2) * s} y={p + (DOBOR_H + GKL_SHEET_H/2) * s + 62}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>(с вырезом)</text>

        {/* ГКЛ сверху (от стены до середины стойки у проёма) */}
        <rect x={p} y={p}
          width={DOOR_STUD_LEFT_MID * s} height={DOBOR_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + DOOR_STUD_LEFT_MID/2 * s} y={p + DOBOR_H/2 * s + 3}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {DOOR_STUD_LEFT_MID}×{DOBOR_H}</text>

        {/* ГКЛ над дверью — от середины левой стойки до ванной */}
        {/* Высота 800 мм (от 2000 до 2800), закрывает механизм откатной двери */}
        <rect x={p + DOOR_STUD_LEFT_MID * s} y={p}
          width={(VERT_LEN - DOOR_STUD_LEFT_MID) * s} height={OVER_DOOR_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (DOOR_STUD_LEFT_MID + (VERT_LEN - DOOR_STUD_LEFT_MID)/2) * s} y={p + OVER_DOOR_H/2 * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {VERT_LEN - DOOR_STUD_LEFT_MID}×{OVER_DOOR_H}</text>

        {/* ГКЛ после проёма (узкая полоска у ванной, до 2000 мм) */}
        <rect x={p + DOOR_END * s} y={p + (CEILING_H - DOOR_H) * s}
          width={(VERT_LEN - DOOR_END) * s} height={DOOR_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (DOOR_END + (VERT_LEN - DOOR_END)/2) * s} y={p + (CEILING_H - DOOR_H/2) * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>{VERT_LEN - DOOR_END}×{DOOR_H}</text>

        {/* Размерные линии — шаг стоек */}
        {STUD_POSITIONS.slice(0, -2).map((pos, i) => {
          const nextPos = STUD_POSITIONS[i + 1];
          const step = nextPos - pos;
          if (step > 100) {
            return (
              <HDim key={`step${i}`}
                x1={p + pos * s} x2={p + nextPos * s} y={p + CEILING_H * s + 20}
                label={step} fontSize={8}/>
            );
          }
          return null;
        })}

        {/* Проём и отступ от ванной */}
        <HDim x1={p + DOOR_START * s} x2={p + DOOR_END * s} y={p + CEILING_H * s + 20}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_W} fontSize={9}/>
        <HDim x1={p + DOOR_END * s} x2={p + VERT_LEN * s} y={p + CEILING_H * s + 20}
          label={DOOR_OFFSET} fontSize={9}/>

        {/* Длина до проёма */}
        <HDim x1={p} x2={p + DOOR_START * s} y={p + CEILING_H * s + 40}
          color={C_GKL} textColor={C_GKL} label={DOOR_START} fontSize={9}/>

        {/* Общая длина */}
        <HDim x1={p} x2={p + VERT_LEN * s} y={p + CEILING_H * s + 60}
          label={VERT_LEN} fontSize={10}/>

        {/* Высоты */}
        <VDim x={p - 15} y1={p} y2={p + CEILING_H * s} label={CEILING_H} fontSize={9}/>
        {/* ГКЛ сверху (300 мм) — у внешней стены */}
        <VDim x={p - 35} y1={p} y2={p + DOBOR_H * s}
          color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={DOBOR_H} fontSize={8} labelX={p - 45}/>
        {/* Высота двери */}
        <VDim x={p + (DOOR_START + 30) * s} y1={p + (CEILING_H - DOOR_H) * s} y2={p + CEILING_H * s}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_H} fontSize={9} labelX={p + (DOOR_START + 35) * s}/>
        {/* Высота ГКЛ */}
        <VDim x={p + VERT_LEN * s + 15} y1={p + DOBOR_H * s} y2={p + CEILING_H * s}
          color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_SHEET_H} fontSize={8} labelX={p + VERT_LEN * s + 20}/>

        {/* Курсор */}
        {mouse && mouse.view === 'front' && <>
          <line x1={p + mouse.x * s} y1={p} x2={p + mouse.x * s} y2={p + CEILING_H * s}
            stroke={C_DIM + "44"} strokeDasharray="4"/>
          <line x1={p} y1={p + (CEILING_H - mouse.y) * s} x2={p + VERT_LEN * s} y2={p + (CEILING_H - mouse.y) * s}
            stroke={C_DIM + "44"} strokeDasharray="4"/>
          <rect x={p + mouse.x * s + 10} y={p + (CEILING_H - mouse.y) * s - 26} width={90} height={22} rx={4} fill={C_TOOLTIP_BG}/>
          <text x={p + mouse.x * s + 14} y={p + (CEILING_H - mouse.y) * s - 10} fill={C_DIM} fontSize={11}>
            {mouse.x.toFixed(0)}×{mouse.y.toFixed(0)}
          </text>
        </>}

      </svg>
    );
  };

  // === Вид сзади (со стороны спальни) ===
  const BackView = () => {
    const p = 70;
    const s = S_FRONT;

    // Зеркальные координаты (0 = ванная)
    const doorStartMirror = DOOR_OFFSET; // 50
    const doorEndMirror = DOOR_OFFSET + DOOR_W; // 950

    // Зеркальные позиции стоек
    const studsMirror = STUD_POSITIONS.map(pos => VERT_LEN - pos - PS_W).reverse();

    return (
      <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
        style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

        <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
          Вид сзади (со стороны спальни)
        </text>

        {/* Общая ширина конструкции (сверху) */}
        <HDim x1={p} x2={p + VERT_LEN * s} y={p - 20} label={VERT_LEN} fontSize={10}/>

        {/* Контур помещения */}
        <rect x={p} y={p} width={VERT_LEN * s} height={CEILING_H * s}
          fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

        {/* Пол и потолок */}
        <line x1={p} y1={p + CEILING_H * s} x2={p + VERT_LEN * s} y2={p + CEILING_H * s}
          stroke={C_TEXT} strokeWidth={2}/>
        <line x1={p} y1={p} x2={p + VERT_LEN * s} y2={p}
          stroke={C_TEXT} strokeWidth={2}/>

        {/* Направляющие ПН на полу */}
        <rect x={p} y={p + CEILING_H * s - PN_H * s} width={doorStartMirror * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <rect x={p + doorEndMirror * s} y={p + CEILING_H * s - PN_H * s} width={(VERT_LEN - doorEndMirror) * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Направляющие ПН на потолке */}
        <rect x={p} y={p} width={VERT_LEN * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Стоечные профили */}
        {studsMirror.map((pos, i) => {
          const isEdgeStud = i === 0 || pos === doorEndMirror;
          return (
            <rect key={`stud${i}`} x={p + pos * s} y={p + PN_H * s}
              width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
              fill={isEdgeStud ? C_BEAM_FILL : C_FRAME_FILL}
              stroke={isEdgeStud ? C_BEAM : C_FRAME}
              strokeWidth={isEdgeStud ? 1.5 : 1}/>
          );
        })}

        {/* Дверной проём */}
        <rect x={p + doorStartMirror * s} y={p + (CEILING_H - DOOR_H) * s}
          width={DOOR_W * s} height={DOOR_H * s}
          fill={C_DOOR + "11"} stroke={C_DOOR} strokeWidth={2} strokeDasharray="6 3"/>
        <text x={p + (doorStartMirror + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H/2) * s}
          textAnchor="middle" fill={C_DOOR} fontSize={12} fontWeight="bold">ПРОЁМ</text>

        {/* Перемычка над дверью — брус на 2100 мм */}
        <rect x={p} y={p + (CEILING_H - BEAM_LEVEL - BEAM_H) * s}
          width={(doorEndMirror + PS_W) * s} height={BEAM_H * s}
          fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>

        {/* Горизонтальная направляющая ПН над дверью — от ванной до середины стойки, низ на 2000 мм */}
        <rect x={p} y={p + (CEILING_H - DOOR_H - PN_H) * s}
          width={(VERT_LEN - DOOR_STUD_LEFT_MID) * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Горизонтальная направляющая ПН на стыке ГКЛ/доборки — от середины стойки до стены, центрирована на 2500 мм */}
        <rect x={p + (VERT_LEN - DOOR_STUD_LEFT_MID) * s} y={p + (CEILING_H - GKL_SHEET_H - PN_H / 2) * s}
          width={DOOR_STUD_LEFT_MID * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* ГКЛ листы (со смещением швов на 600 мм относительно лицевой стороны) */}
        {/* Раскладка вразбежку: полный лист от проёма, узкий у стены */}
        {/* Лист 1: 950-2150 (полный 1200 мм, от проёма) с вырезом в верхнем левом углу */}
        <polygon
          points={`
            ${p + (VERT_LEN - DOOR_STUD_LEFT_MID) * s},${p + DOBOR_H * s}
            ${p + (doorEndMirror + GKL_SHEET_W) * s},${p + DOBOR_H * s}
            ${p + (doorEndMirror + GKL_SHEET_W) * s},${p + CEILING_H * s}
            ${p + doorEndMirror * s},${p + CEILING_H * s}
            ${p + doorEndMirror * s},${p + OVER_DOOR_H * s}
            ${p + (VERT_LEN - DOOR_STUD_LEFT_MID) * s},${p + OVER_DOOR_H * s}
          `}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (doorEndMirror + GKL_SHEET_W/2) * s} y={p + (DOBOR_H + GKL_SHEET_H/2) * s + 50}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {GKL_SHEET_W}×{GKL_SHEET_H}</text>
        <text x={p + (doorEndMirror + GKL_SHEET_W/2) * s} y={p + (DOBOR_H + GKL_SHEET_H/2) * s + 62}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={7}>(с вырезом)</text>

        {/* Лист 2: 2150-2770 (обрезной 620 мм, у стены) */}
        <rect x={p + (doorEndMirror + GKL_SHEET_W) * s} y={p + DOBOR_H * s}
          width={NARROW_SHEET_W * s} height={GKL_SHEET_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (doorEndMirror + GKL_SHEET_W + NARROW_SHEET_W/2) * s} y={p + (DOBOR_H + GKL_SHEET_H/2) * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={9}>ГКЛ {NARROW_SHEET_W}×{GKL_SHEET_H}</text>

        {/* ГКЛ над дверью — от ванной до середины стойки */}
        <rect x={p} y={p}
          width={(VERT_LEN - DOOR_STUD_LEFT_MID) * s} height={OVER_DOOR_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (VERT_LEN - DOOR_STUD_LEFT_MID)/2 * s} y={p + OVER_DOOR_H/2 * s}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {VERT_LEN - DOOR_STUD_LEFT_MID}×{OVER_DOOR_H}</text>

        {/* ГКЛ сверху (от середины стойки до стены) */}
        <rect x={p + (VERT_LEN - DOOR_STUD_LEFT_MID) * s} y={p}
          width={DOOR_STUD_LEFT_MID * s} height={DOBOR_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>
        <text x={p + (VERT_LEN - DOOR_STUD_LEFT_MID/2) * s} y={p + DOBOR_H/2 * s + 3}
          textAnchor="middle" fill={C_GKL_PANEL} fontSize={8}>ГКЛ {DOOR_STUD_LEFT_MID}×{DOBOR_H}</text>

        {/* Узкая полоска у ванной (до 2000 мм) */}
        <rect x={p} y={p + (CEILING_H - DOOR_H) * s}
          width={doorStartMirror * s} height={DOOR_H * s}
          fill={C_GKL_FILL} stroke={C_GKL_PANEL} strokeWidth={2}/>

        {/* Размерные линии */}
        <HDim x1={p} x2={p + doorStartMirror * s} y={p + CEILING_H * s + 20}
          label={DOOR_OFFSET} fontSize={8}/>
        <HDim x1={p + doorStartMirror * s} x2={p + doorEndMirror * s} y={p + CEILING_H * s + 20}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_W} fontSize={9}/>

        {/* Общая длина */}
        <HDim x1={p} x2={p + VERT_LEN * s} y={p + CEILING_H * s + 60}
          label={VERT_LEN} fontSize={10}/>

        {/* Высота */}
        <VDim x={p - 15} y1={p} y2={p + CEILING_H * s} label={CEILING_H} fontSize={9}/>

        {/* Подписи направлений */}
        <text x={p - 25} y={p + CEILING_H/3 * s} textAnchor="end" fill={C_TEXT_DIM} fontSize={8}>
          ← Ванная
        </text>
        <text x={p + VERT_LEN * s + 30} y={p + CEILING_H/3 * s} textAnchor="start" fill={C_TEXT_DIM} fontSize={8}>
          Внешняя стена →
        </text>

      </svg>
    );
  };

  // === Легенда ===
  const Legend = () => {
    const items = [
      { fill: C_FRAME_FILL, stroke: C_FRAME, label: `Профиль ПС/ПН` },
      { fill: C_BEAM_FILL, stroke: C_BEAM, label: `Брус ${BEAM_W}×${BEAM_H} (усиление)` },
      { fill: C_GKL_FILL, stroke: C_GKL_PANEL, label: `ГКЛ ${GKL_T} мм` },
      { fill: "transparent", stroke: C_DOBOR, dashed: true, label: "Доборка ГКЛ" },
      { fill: C_DOOR + "11", stroke: C_DOOR, dashed: true, label: "Дверной проём" },
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
          Разрез двойной перегородки
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
        <text x={p - GKL_T * s - 5} y={topY + h/2} textAnchor="end" fill={C_TEXT_DIM} fontSize={8}>Лестница</text>
        <text x={p + (layer2X + PS_W) * s + GKL_T * s + 5} y={topY + h/2} textAnchor="start" fill={C_WARDROBE} fontSize={8}>Спальня</text>

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

        <text x={w/2} y={topY + h + 55} textAnchor="middle" fill={C_TEXT_DIM} fontSize={9}>
          При обшивке ГКЛ 12.5мм внутри останется 50мм для двери
        </text>
      </svg>
    );
  };

  // === Спецификация ===
  const Specification = () => {
    const items = [
      { name: `ГКЛ лист (полный, к проёму)`, size: `${GKL_SHEET_W}×${GKL_SHEET_H}×${GKL_T}`, qty: "4 шт", note: "2 листа × 2 стороны, с вырезом в углу" },
      { name: `ГКЛ лист (обрезной, у стены)`, size: `${NARROW_SHEET_W}×${GKL_SHEET_H}×${GKL_T}`, qty: "2 шт", note: "1 лист × 2 стороны" },
      { name: `ГКЛ (над дверью)`, size: `${VERT_LEN - DOOR_STUD_LEFT_MID}×${OVER_DOOR_H}×${GKL_T}`, qty: "2 шт", note: "от середины стойки до ванной, закрывает механизм" },
      { name: `ГКЛ (сверху)`, size: `${DOOR_STUD_LEFT_MID}×${DOBOR_H}×${GKL_T}`, qty: "2 шт", note: "от стены до середины стойки" },
      { name: `ГКЛ (у ванной)`, size: `${VERT_LEN - DOOR_END}×${DOOR_H}×${GKL_T}`, qty: "2 шт", note: "узкая полоса, высота до 2000 мм" },
      { name: "Брус (над дверью)", size: `${DOOR_END}×${BEAM_H}×${BEAM_W}`, qty: "2 шт", note: "для механизма откатной двери × 2 слоя" },
      { name: "Профиль ПН 50×40 (пол/потолок)", size: `${VERT_LEN} мм`, qty: "4 шт", note: "пол + потолок × 2 слоя" },
      { name: "Профиль ПН 75×40 (между слоями)", size: `${VERT_LEN} мм`, qty: "2 шт", note: "пол + потолок для зазора 75мм" },
      { name: "Профиль ПН 50×40 (над дверью)", size: `${VERT_LEN - DOOR_STUD_LEFT_MID} мм`, qty: "2 шт", note: `низ на ${DOOR_H} мм × 2 слоя` },
      { name: "Профиль ПН 50×40 (стык ГКЛ)", size: `${DOOR_STUD_LEFT_MID} мм`, qty: "2 шт", note: `центр на ${GKL_SHEET_H} мм × 2 слоя` },
      { name: "Профиль ПС 50×50", size: `${CEILING_H - PN_H * 2} мм`, qty: `${STUD_POSITIONS.length * 2} шт`, note: `${STUD_POSITIONS.length} стоек × 2 слоя` },
    ];

    return (
      <div style={{ background: C_BG_SVG, borderRadius: 8, padding: 16, maxWidth: 700 }}>
        <h3 style={{ color: C_COLUMN_TEXT, margin: "0 0 12px", fontSize: 14 }}>Спецификация материалов (вариант ГКЛ)</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C_TEXT_DIM}` }}>
              <th style={{ textAlign: "left", padding: "8px 4px", color: C_TEXT }}>Элемент</th>
              <th style={{ textAlign: "left", padding: "8px 4px", color: C_TEXT }}>Размер</th>
              <th style={{ textAlign: "center", padding: "8px 4px", color: C_TEXT }}>Кол-во</th>
              <th style={{ textAlign: "left", padding: "8px 4px", color: C_TEXT }}>Примечание</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C_TEXT_DIM}33` }}>
                <td style={{ padding: "6px 4px", color: C_DIM }}>{item.name}</td>
                <td style={{ padding: "6px 4px", color: C_TEXT_DIM }}>{item.size}</td>
                <td style={{ padding: "6px 4px", color: C_TEXT_DIM, textAlign: "center" }}>{item.qty}</td>
                <td style={{ padding: "6px 4px", color: C_TEXT_DIM, fontSize: 10 }}>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 12 }}>
          * Лист ГКЛ от пола | Доборка сверху: {DOBOR_H} мм до потолка | Шаг стоек: {STUD_STEP} мм | Высота проёма: {DOOR_H} мм
        </p>
        <p style={{ color: C_TEXT_DIM, fontSize: 10, marginTop: 4 }}>
          * ПН 75 между слоями: при обшивке ГКЛ 12.5мм с каждой стороны останется 50мм для откатной двери
        </p>
      </div>
    );
  };

  return (
    <div style={{ background: C_BG, minHeight: "100vh", padding: 20, fontFamily: "sans-serif", color: C_TEXT }}>
      <h2 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "0 0 4px" }}>
        Каркас перегородки спальни — вариант ГКЛ
      </h2>
      <p style={{ textAlign: "center", color: C_TEXT_DIM, margin: "0 0 16px", fontSize: 14 }}>
        Двойная перегородка {PARTITION_T} мм | ГКЛ {GKL_SHEET_W}×{GKL_SHEET_H}×{GKL_T} мм | Шаг стоек {STUD_STEP} мм
      </p>

      {/* Вид спереди */}
      <h3 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "20px 0 12px", fontSize: 16 }}>
        Внешний слой (со стороны лестницы)
      </h3>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <FrontView />
      </div>

      {/* Вид сзади */}
      <h3 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "20px 0 12px", fontSize: 16 }}>
        Внутренний слой (со стороны спальни) — швы вразбежку
      </h3>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <BackView />
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
