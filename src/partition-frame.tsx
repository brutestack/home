import { useState } from "react";
import { HDim, VDim } from "./svg-primitives";
import {
  C_BG, C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_TOOLTIP_BG,
  C_DIM, C_DIM_TRANS, C_GKL, C_GKL_BORDER, C_WARDROBE, C_WARDROBE_FILL
} from "./colors";

// === Константы перегородки ===
const CEILING_H = 2800;        // Высота потолка (мм)
const PANEL_H = 2700;          // Высота ЛДСП панели (мм)
const PANEL_W = 900;           // Ширина ЛДСП панели (мм)
const PANEL_T = 16;            // Толщина ЛДСП панели (мм)
const DOBOR_H = CEILING_H - PANEL_H; // Доборная планка снизу (100мм)

const DOOR_W = 900;            // Ширина дверного проёма (мм)
const DOOR_H = 2100;           // Высота дверного проёма (мм)
const DOOR_OFFSET = 50;        // Отступ проёма от ванной (мм)
const OVER_DOOR_H = CEILING_H - DOOR_H; // Над дверью (700мм)
const OVER_DOOR_PANEL_H = OVER_DOOR_H + 100; // Панель над дверью с перекрытием для механизма (800мм)

const GKL_LAYER = 50;          // Толщина слоя ГКЛ (мм)
const GKL_GAP = 50;            // Зазор между слоями (мм)
const PARTITION_T = GKL_LAYER * 2 + GKL_GAP; // Общая толщина (150мм)

const HORIZ_W = 700;           // Длина горизонтальной части (мм)
const HORIZ_T = 50;            // Толщина горизонтальной части (мм)

// Общая длина вертикальной перегородки (от верхней стены до ванной)
const VERT_LEN = 2770;         // 5400 - 2630 = 2770 мм

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
const C_PANEL = "#DEB887";     // ЛДСП панель (бежевый)
const C_PANEL_FILL = "#DEB88733";
const C_DOBOR = "#D2691E";     // Доборная планка
const C_DOOR = "#228B22";      // Дверной проём (зелёный)

export default function PartitionFrame() {
  const [mouse, setMouse] = useState<{x: number, y: number, view: string} | null>(null);

  // === Масштабы для разных видов ===
  const S_FRONT = 0.28;        // Масштаб вида спереди (px/мм)
  const S_TOP = 1.5;           // Масштаб вида сверху (px/мм)
  const S_SECTION = 0.8;       // Масштаб разреза (px/мм)

  // === Размеры SVG ===
  const FRONT_W = 1000;
  const FRONT_H = 900;
  const TOP_W = 500;
  const TOP_H = 350;

  // === Вид спереди (со стороны лестницы) ===
  const FrontView = () => {
    const p = 80; // padding
    const s = S_FRONT;

    // Расчёт позиций стоек (шаг под панели 900мм)
    // Проём: отступ 50мм от ванной, ширина 900мм
    // Конец проёма: 2770 - 50 = 2720 мм
    // Начало проёма: 2720 - 900 = 1820 мм
    // Зазор 20мм слева (у верхней стены), панели примыкают к проёму
    const GAP_LEFT = VERT_LEN - DOOR_OFFSET - DOOR_W - PANEL_W * 2; // 20 мм
    const stud1 = GAP_LEFT; // 20 (начало первой панели)
    const stud2 = GAP_LEFT + PANEL_W; // 920
    const doorStart = GAP_LEFT + PANEL_W * 2; // 1820 (начало проёма)
    const stud3 = doorStart; // 1820 (край проёма, стойка)
    const doorEnd = VERT_LEN - DOOR_OFFSET; // 2720 (конец проёма)
    const stud4 = doorEnd; // 2720 (после проёма)
    const partEnd = VERT_LEN; // 2770

    // Горизонтальная часть начинается от правого края двойной перегородки
    const horizStart = VERT_LEN;

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
          Вид спереди (со стороны лестницы)
        </text>

        {/* Контур помещения */}
        <rect x={p} y={p} width={VERT_LEN * s} height={CEILING_H * s}
          fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

        {/* Пол и потолок */}
        <line x1={p} y1={p + CEILING_H * s} x2={p + VERT_LEN * s} y2={p + CEILING_H * s}
          stroke={C_TEXT} strokeWidth={2}/>
        <line x1={p} y1={p} x2={p + VERT_LEN * s} y2={p}
          stroke={C_TEXT} strokeWidth={2}/>

        {/* Направляющие профили ПН на полу */}
        <rect x={p} y={p + CEILING_H * s - PN_H * s} width={doorStart * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <rect x={p + doorEnd * s} y={p + CEILING_H * s - PN_H * s} width={(VERT_LEN - doorEnd) * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Направляющие профили ПН на потолке */}
        <rect x={p} y={p} width={VERT_LEN * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Стоечные профили ПС */}
        {/* Стойка у стены (0) — левый край на линии стены */}
        <rect x={p} y={p + PN_H * s}
          width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        {/* Стойки под панели (центрированы) */}
        {[stud1, stud2].map((pos, i) => (
          <rect key={`stud${i}`} x={p + pos * s - PS_W/2 * s} y={p + PN_H * s}
            width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
            fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        ))}
        {/* Стойка у начала проёма — правый край на doorStart (не выступает в проём) */}
        <rect x={p + (doorStart - PS_W) * s} y={p + PN_H * s}
          width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        {/* Стойка у конца проёма — левый край на doorEnd (не выступает в проём) */}
        <rect x={p + doorEnd * s} y={p + PN_H * s}
          width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        {/* Брус внутри стойки справа от двери */}
        <rect x={p + doorEnd * s} y={p + PN_H * s}
          width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={1.5}/>
        <text x={p + (doorEnd + PS_W/2) * s} y={p + CEILING_H/2 * s}
          textAnchor="middle" fill={C_BEAM} fontSize={7}
          transform={`rotate(-90,${p + (doorEnd + PS_W/2) * s},${p + CEILING_H/2 * s})`}>брус {BEAM_W}×{BEAM_H}</text>

        {/* Перемычка над дверью — деревянный брус 50×70, от стены до конца проёма */}
        <rect x={p} y={p + (CEILING_H - DOOR_H - BEAM_H) * s}
          width={doorEnd * s} height={BEAM_H * s}
          fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
        <text x={p + doorEnd/2 * s} y={p + (CEILING_H - DOOR_H - BEAM_H/2) * s + 3}
          textAnchor="middle" fill={C_BEAM} fontSize={8}>брус {doorEnd}×{BEAM_H}×{BEAM_W}</text>

        {/* Дверной проём */}
        <rect x={p + doorStart * s} y={p + (CEILING_H - DOOR_H) * s}
          width={DOOR_W * s} height={DOOR_H * s}
          fill={C_DOOR + "11"} stroke={C_DOOR} strokeWidth={2} strokeDasharray="6 3"/>
        <text x={p + (doorStart + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H/2) * s}
          textAnchor="middle" fill={C_DOOR} fontSize={12} fontWeight="bold">ПРОЁМ</text>
        <text x={p + (doorStart + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H/2) * s + 16}
          textAnchor="middle" fill={C_DOOR} fontSize={10}>{DOOR_W}×{DOOR_H}</text>

        {/* ЛДСП панели (до проёма) — вплотную к потолку */}
        {/* Панель 1: 20-920 */}
        <rect x={p + stud1 * s} y={p}
          width={PANEL_W * s} height={PANEL_H * s}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
        <text x={p + (stud1 + PANEL_W/2) * s} y={p + PANEL_H/2 * s}
          textAnchor="middle" fill={C_PANEL} fontSize={9}>ЛДСП {PANEL_W}×{PANEL_H}×{PANEL_T}</text>

        {/* Панель 2: 920-1820 */}
        <rect x={p + stud2 * s} y={p}
          width={PANEL_W * s} height={PANEL_H * s}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
        <text x={p + (stud2 + PANEL_W/2) * s} y={p + PANEL_H/2 * s}
          textAnchor="middle" fill={C_PANEL} fontSize={9}>ЛДСП {PANEL_W}×{PANEL_H}×{PANEL_T}</text>

        {/* Доборные планки снизу (у пола) */}
        <rect x={p + stud1 * s} y={p + PANEL_H * s}
          width={PANEL_W * 2 * s} height={DOBOR_H * s}
          fill="none" stroke={C_DOBOR} strokeWidth={1} strokeDasharray="3 2"/>
        <text x={p + (stud1 + PANEL_W) * s} y={p + (PANEL_H + DOBOR_H/2) * s + 3}
          textAnchor="middle" fill={C_DOBOR} fontSize={8}>доборка {DOBOR_H}</text>

        {/* Панель над дверью — до потолка + 100мм перекрытия для механизма */}
        <rect x={p + doorStart * s} y={p}
          width={DOOR_W * s} height={OVER_DOOR_PANEL_H * s}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
        <text x={p + (doorStart + DOOR_W/2) * s} y={p + OVER_DOOR_PANEL_H/2 * s}
          textAnchor="middle" fill={C_PANEL} fontSize={8}>ЛДСП {DOOR_W}×{OVER_DOOR_PANEL_H}</text>

        {/* Панель после проёма (короткая часть до ванной) */}
        <rect x={p + doorEnd * s} y={p}
          width={(VERT_LEN - doorEnd) * s} height={PANEL_H * s}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={1} strokeDasharray="4 2"/>
        <text x={p + (doorEnd + (VERT_LEN - doorEnd)/2) * s} y={p + PANEL_H/2 * s}
          textAnchor="middle" fill={C_PANEL} fontSize={7}>{VERT_LEN - doorEnd}</text>

        {/* Размерные линии */}
        {/* Зазор слева (у верхней стены) */}
        <HDim x1={p} x2={p + GAP_LEFT * s} y={p + CEILING_H * s + 20}
          label={GAP_LEFT} fontSize={8}/>
        {/* Ширина панелей */}
        <HDim x1={p + stud1 * s} x2={p + stud2 * s} y={p + CEILING_H * s + 20}
          label={PANEL_W} fontSize={9}/>
        <HDim x1={p + stud2 * s} x2={p + doorStart * s} y={p + CEILING_H * s + 20}
          label={PANEL_W} fontSize={9}/>
        {/* Проём и отступ от ванной */}
        <HDim x1={p + doorStart * s} x2={p + doorEnd * s} y={p + CEILING_H * s + 20}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_W} fontSize={9}/>
        <HDim x1={p + doorEnd * s} x2={p + VERT_LEN * s} y={p + CEILING_H * s + 20}
          label={DOOR_OFFSET} fontSize={9}/>

        {/* Длина до проёма */}
        <HDim x1={p} x2={p + doorStart * s} y={p + CEILING_H * s + 40}
          color={C_GKL} textColor={C_GKL} label={doorStart} fontSize={9}/>

        {/* Общая длина */}
        <HDim x1={p} x2={p + VERT_LEN * s} y={p + CEILING_H * s + 60}
          label={VERT_LEN} fontSize={10}/>

        {/* Высоты */}
        <VDim x={p - 15} y1={p} y2={p + CEILING_H * s} label={CEILING_H} fontSize={9}/>
        {/* Высота двери — внутри проёма */}
        <VDim x={p + (doorStart + 30) * s} y1={p + (CEILING_H - DOOR_H) * s} y2={p + CEILING_H * s}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_H} fontSize={9} labelX={p + (doorStart + 35) * s}/>
        {/* Высота панели над дверью — правее линии проёма, видно перекрытие */}
        <VDim x={p + (doorStart + 70) * s} y1={p} y2={p + OVER_DOOR_PANEL_H * s}
          color={C_PANEL} textColor={C_PANEL} label={OVER_DOOR_PANEL_H} fontSize={8} labelX={p + (doorStart + 75) * s}/>
        <VDim x={p + VERT_LEN * s + 15} y1={p} y2={p + PANEL_H * s}
          color={C_PANEL} textColor={C_PANEL} label={PANEL_H} fontSize={8} labelX={p + VERT_LEN * s + 20}/>
        <VDim x={p + VERT_LEN * s + 15} y1={p + PANEL_H * s} y2={p + CEILING_H * s}
          color={C_DOBOR} textColor={C_DOBOR} label={DOBOR_H} fontSize={8} labelX={p + VERT_LEN * s + 20}/>

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

  // === Вид сзади (со стороны спальни) — внутренний слой ===
  // Зеркальное отображение: слева ванная, справа верхняя стена
  const BackView = () => {
    const p = 80;
    const s = S_FRONT;

    // Позиции в зеркальной системе координат (0 = ванная, 2770 = верхняя стена)
    // Проём: 50мм от ванной, ширина 900мм
    const doorStartMirror = DOOR_OFFSET; // 50 (от ванной)
    const doorEndMirror = DOOR_OFFSET + DOOR_W; // 950

    // Короткая перегородка примыкает у конца проёма (со стороны верхней стены)
    const horizProfileW = PS_W; // 50мм — толщина профиля
    const horizPartitionStart = doorEndMirror; // 950
    const horizPartitionEnd = doorEndMirror + horizProfileW; // 1000

    // Раскладка панелей от короткой перегородки к верхней стене
    // Доступное пространство: от 1000 до 2770 = 1770мм
    const panelAreaStart = horizPartitionEnd; // 1000
    const panelAreaLen = VERT_LEN - panelAreaStart; // 1770мм
    // 1 панель 900мм + остаток 870мм
    const panel1End = panelAreaStart + PANEL_W; // 1900
    const remainderW = panelAreaLen - PANEL_W; // 870мм

    return (
      <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
        style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

        <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
          Вид сзади (со стороны спальни) — внутренний слой
        </text>
        <text x={FRONT_W/2} y={42} textAnchor="middle" fill={C_TEXT_DIM} fontSize={10}>
          Короткая перегородка примыкает к этому слою, сдвигая раскладку на {horizProfileW}мм
        </text>

        {/* Контур помещения */}
        <rect x={p} y={p} width={VERT_LEN * s} height={CEILING_H * s}
          fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

        {/* Пол и потолок */}
        <line x1={p} y1={p + CEILING_H * s} x2={p + VERT_LEN * s} y2={p + CEILING_H * s}
          stroke={C_TEXT} strokeWidth={2}/>
        <line x1={p} y1={p} x2={p + VERT_LEN * s} y2={p}
          stroke={C_TEXT} strokeWidth={2}/>

        {/* Направляющие ПН на полу — с учётом проёма */}
        <rect x={p} y={p + CEILING_H * s - PN_H * s} width={doorStartMirror * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <rect x={p + horizPartitionEnd * s} y={p + CEILING_H * s - PN_H * s} width={panelAreaLen * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Направляющие ПН на потолке */}
        <rect x={p} y={p} width={VERT_LEN * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Стойка у ванной */}
        <rect x={p} y={p + PN_H * s}
          width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        {/* Брус внутри стойки у ванной */}
        <rect x={p} y={p + PN_H * s}
          width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={1.5}/>

        {/* Дверной проём */}
        <rect x={p + doorStartMirror * s} y={p + (CEILING_H - DOOR_H) * s}
          width={DOOR_W * s} height={DOOR_H * s}
          fill={C_DOOR + "11"} stroke={C_DOOR} strokeWidth={2} strokeDasharray="6 3"/>
        <text x={p + (doorStartMirror + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H/2) * s}
          textAnchor="middle" fill={C_DOOR} fontSize={12} fontWeight="bold">ПРОЁМ</text>
        <text x={p + (doorStartMirror + DOOR_W/2) * s} y={p + (CEILING_H - DOOR_H/2) * s + 16}
          textAnchor="middle" fill={C_DOOR} fontSize={10}>{DOOR_W}×{DOOR_H}</text>

        {/* Перемычка над дверью — от ванной до конца короткой перегородки */}
        <rect x={p} y={p + (CEILING_H - DOOR_H - BEAM_H) * s}
          width={horizPartitionEnd * s} height={BEAM_H * s}
          fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>

        {/* === Разрез короткой перегородки (50мм) === */}
        <rect x={p + horizPartitionStart * s} y={p} width={horizProfileW * s} height={CEILING_H * s}
          fill={C_GKL + "33"} stroke={C_GKL} strokeWidth={2}/>
        <text x={p + (horizPartitionStart + horizProfileW/2) * s} y={p + CEILING_H/2 * s}
          textAnchor="middle" fill={C_GKL} fontSize={8}
          transform={`rotate(-90,${p + (horizPartitionStart + horizProfileW/2) * s},${p + CEILING_H/2 * s})`}>
          Короткая перегородка (разрез)
        </text>

        {/* Стойка после короткой перегородки */}
        <rect x={p + horizPartitionEnd * s} y={p + PN_H * s}
          width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* === ЛДСП панели (от короткой перегородки к внешней стене) — вплотную к потолку === */}
        {/* Панель 1: 1000-1900 (900мм) */}
        <rect x={p + panelAreaStart * s} y={p}
          width={PANEL_W * s} height={PANEL_H * s}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
        <text x={p + (panelAreaStart + PANEL_W/2) * s} y={p + PANEL_H/2 * s}
          textAnchor="middle" fill={C_PANEL} fontSize={9}>ЛДСП {PANEL_W}×{PANEL_H}</text>

        {/* Стойка между панелями */}
        <rect x={p + (panel1End - PS_W/2) * s} y={p + PN_H * s}
          width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Остаток у внешней стены: 1900-2770 (870мм) */}
        <rect x={p + panel1End * s} y={p}
          width={remainderW * s} height={PANEL_H * s}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
        <text x={p + (panel1End + remainderW/2) * s} y={p + PANEL_H/2 * s}
          textAnchor="middle" fill={C_PANEL} fontSize={9}>ЛДСП {remainderW}×{PANEL_H}</text>

        {/* Стойка у внешней стены */}
        <rect x={p + (VERT_LEN - PS_W) * s} y={p + PN_H * s}
          width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Доборка снизу (у пола) */}
        <rect x={p + panelAreaStart * s} y={p + PANEL_H * s} width={panelAreaLen * s} height={DOBOR_H * s}
          fill="none" stroke={C_DOBOR} strokeWidth={1} strokeDasharray="3 2"/>

        {/* Панель над дверью */}
        <rect x={p + doorStartMirror * s} y={p}
          width={DOOR_W * s} height={OVER_DOOR_PANEL_H * s}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
        <text x={p + (doorStartMirror + DOOR_W/2) * s} y={p + OVER_DOOR_PANEL_H/2 * s}
          textAnchor="middle" fill={C_PANEL} fontSize={8}>ЛДСП {DOOR_W}×{OVER_DOOR_PANEL_H}</text>

        {/* Панель у ванной (маленькая) */}
        <rect x={p} y={p}
          width={doorStartMirror * s} height={PANEL_H * s}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={1} strokeDasharray="4 2"/>
        <text x={p + doorStartMirror/2 * s} y={p + PANEL_H/2 * s}
          textAnchor="middle" fill={C_PANEL} fontSize={7}>{doorStartMirror}</text>

        {/* === Размерные линии === */}
        {/* Отступ от ванной */}
        <HDim x1={p} x2={p + doorStartMirror * s} y={p + CEILING_H * s + 20}
          label={DOOR_OFFSET} fontSize={8}/>
        {/* Проём */}
        <HDim x1={p + doorStartMirror * s} x2={p + doorEndMirror * s} y={p + CEILING_H * s + 20}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_W} fontSize={9}/>
        {/* Профиль короткой перегородки */}
        <HDim x1={p + horizPartitionStart * s} x2={p + horizPartitionEnd * s} y={p + CEILING_H * s + 20}
          color={C_GKL} textColor={C_GKL} label={horizProfileW} fontSize={8}/>
        {/* Панель */}
        <HDim x1={p + panelAreaStart * s} x2={p + panel1End * s} y={p + CEILING_H * s + 20}
          label={PANEL_W} fontSize={9}/>
        {/* Остаток */}
        <HDim x1={p + panel1End * s} x2={p + VERT_LEN * s} y={p + CEILING_H * s + 20}
          label={remainderW} fontSize={8}/>

        {/* Общая длина панельной зоны */}
        <HDim x1={p + panelAreaStart * s} x2={p + VERT_LEN * s} y={p + CEILING_H * s + 40}
          label={panelAreaLen} fontSize={9}/>

        {/* Общая длина */}
        <HDim x1={p} x2={p + VERT_LEN * s} y={p + CEILING_H * s + 60}
          label={VERT_LEN} fontSize={10}/>

        {/* Высота */}
        <VDim x={p - 15} y1={p} y2={p + CEILING_H * s} label={CEILING_H} fontSize={9}/>
        <VDim x={p + (doorStartMirror + DOOR_W - 30) * s} y1={p + (CEILING_H - DOOR_H) * s} y2={p + CEILING_H * s}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_H} fontSize={9}/>
        {/* Высота панели */}
        <VDim x={p + VERT_LEN * s + 15} y1={p} y2={p + PANEL_H * s}
          color={C_PANEL} textColor={C_PANEL} label={PANEL_H} fontSize={8} labelX={p + VERT_LEN * s + 20}/>
        {/* Доборка снизу */}
        <VDim x={p + VERT_LEN * s + 15} y1={p + PANEL_H * s} y2={p + CEILING_H * s}
          color={C_DOBOR} textColor={C_DOBOR} label={DOBOR_H} fontSize={8} labelX={p + VERT_LEN * s + 20}/>

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

  // === Легенда (отдельный компонент) ===
  const Legend = () => {
    const items = [
      { fill: C_FRAME_FILL, stroke: C_FRAME, label: "Профиль каркаса" },
      { fill: C_BEAM_FILL, stroke: C_BEAM, label: `Брус ${BEAM_W}×${BEAM_H}` },
      { fill: C_PANEL_FILL, stroke: C_PANEL, label: "ЛДСП панель" },
      { fill: "transparent", stroke: C_DOBOR, dashed: true, label: "Доборная планка" },
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
        <span style={{ color: C_TEXT_DIM }}>| Все размеры в мм</span>
      </div>
    );
  };

  // === Разрез двойной перегородки ===
  const SectionView = () => {
    const w = 408;
    const svgH = 476;
    const s = 1.02;
    const h = 255; // Высота схемы
    const topY = 85; // Начало схемы от верха

    // Позиции слоёв
    const layer1X = 0;
    const gapX = PS_W;
    const layer2X = PS_W + GKL_GAP;
    const totalW = PS_W * 2 + GKL_GAP; // 150 мм

    // Центрирование по горизонтали
    const schemaW = (totalW + PANEL_T * 2) * s;
    const p = (w - schemaW) / 2 + PANEL_T * s;

    return (
      <svg viewBox={`0 0 ${w} ${svgH}`}
        style={{ width: w, background: C_BG_SVG, borderRadius: 8 }}>

        <text x={w/2} y={18} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={13} fontWeight="bold">
          Разрез двойной перегородки
        </text>
        <text x={w/2} y={34} textAnchor="middle" fill={C_TEXT_DIM} fontSize={10}>
          ЛДСП только снаружи
        </text>

        {/* Слой 1 (сторона лестницы) */}
        <rect x={p + layer1X * s} y={topY} width={PS_W * s} height={h}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <text x={p + PS_W/2 * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={8}>ПС</text>

        {/* Зазор между слоями */}
        <rect x={p + gapX * s} y={topY} width={GKL_GAP * s} height={h}
          fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>
        <text x={p + (gapX + GKL_GAP/2) * s} y={topY + h/2} textAnchor="middle" fill={C_TEXT_DIM} fontSize={7}>зазор</text>

        {/* Слой 2 (сторона спальни) */}
        <rect x={p + layer2X * s} y={topY} width={PS_W * s} height={h}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <text x={p + (layer2X + PS_W/2) * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={8}>ПС</text>

        {/* ЛДСП только снаружи — слева (сторона лестницы) */}
        <rect x={p - PANEL_T * s} y={topY} width={PANEL_T * s} height={h}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>

        {/* ЛДСП только снаружи — справа (сторона спальни) */}
        <rect x={p + (layer2X + PS_W) * s} y={topY} width={PANEL_T * s} height={h}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>

        {/* Подписи сторон */}
        <text x={p - PANEL_T * s - 5} y={topY + h/2} textAnchor="end" fill={C_TEXT_DIM} fontSize={8}>Лестница</text>
        <text x={p + (layer2X + PS_W) * s + PANEL_T * s + 5} y={topY + h/2} textAnchor="start" fill={C_WARDROBE} fontSize={8}>Спальня</text>

        {/* Размерные линии */}
        <HDim x1={p - PANEL_T * s} x2={p} y={topY + h + 15}
          label={PANEL_T} fontSize={8}/>
        <HDim x1={p} x2={p + PS_W * s} y={topY + h + 15}
          color={C_FRAME} textColor={C_FRAME} label={PS_W} fontSize={8}/>
        <HDim x1={p + gapX * s} x2={p + layer2X * s} y={topY + h + 15}
          label={GKL_GAP} fontSize={8}/>
        <HDim x1={p + layer2X * s} x2={p + (layer2X + PS_W) * s} y={topY + h + 15}
          color={C_FRAME} textColor={C_FRAME} label={PS_W} fontSize={8}/>
        <HDim x1={p + (layer2X + PS_W) * s} x2={p + (layer2X + PS_W) * s + PANEL_T * s} y={topY + h + 15}
          label={PANEL_T} fontSize={8}/>

        {/* Общая толщина */}
        <HDim x1={p - PANEL_T * s} x2={p + (layer2X + PS_W) * s + PANEL_T * s} y={topY + h + 35}
          label={PARTITION_T + PANEL_T * 2} fontSize={9}/>

        {/* Подпись */}
        <text x={w/2} y={topY + h + 55} textAnchor="middle" fill={C_TEXT_DIM} fontSize={9}>
          Внутри без ЛДСП
        </text>
      </svg>
    );
  };

  // === Вид спереди горизонтальной части (со стороны двери в ванную) ===
  const HorizFrontView = () => {
    const s = 0.266;
    const w = 585;
    const topY = 73; // верхний отступ для схемы
    const schemaH = CEILING_H * s; // 745px
    const svgH = topY + schemaH + 60; // 878px

    // Горизонтальное центрирование (только чертёж, без размерных линий)
    const drawingW = (PARTITION_T + GKL_LAYER + HORIZ_W) * s;
    const p = (w - drawingW) / 2;

    // Внешний слой + зазор слева от внутреннего слоя
    const outerPartW = GKL_LAYER + GKL_GAP; // 100 мм
    // Внутренний слой — это начало горизонтальной части
    const innerLayerX = p + outerPartW * s;

    return (
      <svg viewBox={`0 0 ${w} ${svgH}`}
        style={{ width: w, background: C_BG_SVG, borderRadius: 8 }}>

        <text x={w/2} y={18} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={13} fontWeight="bold">
          Горизонтальная часть — вид со стороны двери в ванную
        </text>
        <text x={w/2} y={34} textAnchor="middle" fill={C_TEXT_DIM} fontSize={10}>
          Внутренний слой двойной перегородки продолжается как горизонтальная часть
        </text>

        {/* === Внешний слой двойной перегородки (сторона лестницы) === */}
        <rect x={p} y={topY} width={GKL_LAYER * s} height={CEILING_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        {/* ЛДСП на внешнем слое — вплотную к потолку */}
        <rect x={p - PANEL_T * s} y={topY} width={PANEL_T * s} height={PANEL_H * s}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={1.5}/>

        {/* Зазор между слоями — над проёмом */}
        <rect x={p + GKL_LAYER * s} y={topY} width={GKL_GAP * s} height={(CEILING_H - DOOR_H) * s}
          fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="2 2"/>
        {/* Проём в двойной перегородке — зазор открыт */}
        <rect x={p + GKL_LAYER * s} y={topY + (CEILING_H - DOOR_H) * s} width={GKL_GAP * s} height={DOOR_H * s}
          fill={C_DOOR + "22"} stroke={C_DOOR} strokeWidth={1.5} strokeDasharray="4 2"/>

        {/* Подписи слева */}
        <text x={p - PANEL_T * s - 28} y={topY + CEILING_H/3 * s} textAnchor="end" fill={C_TEXT_DIM} fontSize={7}>
          ← Лестница
        </text>

        {/* Проём подпись */}
        <text x={p + (GKL_LAYER + GKL_GAP/2) * s} y={topY + (CEILING_H - DOOR_H/2) * s}
          textAnchor="middle" fill={C_DOOR} fontSize={7}
          transform={`rotate(-90,${p + (GKL_LAYER + GKL_GAP/2) * s},${topY + (CEILING_H - DOOR_H/2) * s})`}>
          ПРОЁМ {DOOR_H}
        </text>

        {/* === Внутренний слой = горизонтальная часть (единая конструкция) === */}
        {/* Контур помещения */}
        <rect x={innerLayerX} y={topY} width={(GKL_LAYER + HORIZ_W) * s} height={CEILING_H * s}
          fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

        {/* Пол и потолок */}
        <line x1={innerLayerX} y1={topY + CEILING_H * s} x2={innerLayerX + (GKL_LAYER + HORIZ_W) * s} y2={topY + CEILING_H * s}
          stroke={C_TEXT} strokeWidth={2}/>
        <line x1={innerLayerX} y1={topY} x2={innerLayerX + (GKL_LAYER + HORIZ_W) * s} y2={topY}
          stroke={C_TEXT} strokeWidth={2}/>

        {/* Направляющие ПН (на всю длину: внутренний слой + горизонтальная часть) */}
        <rect x={innerLayerX} y={topY} width={(GKL_LAYER + HORIZ_W) * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <rect x={innerLayerX} y={topY + (CEILING_H - PN_H) * s} width={(GKL_LAYER + HORIZ_W) * s} height={PN_H * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Стойка внутреннего слоя (у проёма) */}
        <rect x={innerLayerX} y={topY + PN_H * s} width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1.5}/>

        {/* Стойка горизонтальной части (у начала ЛДСП) */}
        <rect x={innerLayerX + GKL_LAYER * s} y={topY + PN_H * s} width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* Стойка в конце горизонтальной части (у шкафа) */}
        <rect x={innerLayerX + (GKL_LAYER + HORIZ_W - PS_W) * s} y={topY + PN_H * s} width={PS_W * s} height={(CEILING_H - PN_H * 2) * s}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

        {/* ЛДСП панель (сторона шкафа) — вплотную к потолку */}
        <rect x={innerLayerX + GKL_LAYER * s} y={topY} width={HORIZ_W * s} height={PANEL_H * s}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
        <text x={innerLayerX + (GKL_LAYER + HORIZ_W/2) * s} y={topY + PANEL_H/2 * s}
          textAnchor="middle" fill={C_PANEL} fontSize={9}>ЛДСП {HORIZ_W}×{PANEL_H}</text>

        {/* Доборка снизу (у пола) */}
        <rect x={innerLayerX + GKL_LAYER * s} y={topY + PANEL_H * s} width={HORIZ_W * s} height={DOBOR_H * s}
          fill="none" stroke={C_DOBOR} strokeWidth={1} strokeDasharray="3 2"/>


        {/* Разделительная линия между зонами (пунктир) */}
        <line x1={innerLayerX + GKL_LAYER * s} y1={topY} x2={innerLayerX + GKL_LAYER * s} y2={topY + CEILING_H * s}
          stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="6 3"/>
        <text x={innerLayerX + GKL_LAYER * s} y={topY - 5} textAnchor="middle" fill={C_TEXT_DIM} fontSize={7}>
          ← внутр. слой | гориз. часть →
        </text>

        {/* === Размерные линии === */}
        {/* Внешний слой */}
        <HDim x1={p} x2={p + GKL_LAYER * s} y={topY + CEILING_H * s + 20}
          color={C_FRAME} textColor={C_FRAME} label={GKL_LAYER} fontSize={8}/>
        {/* Зазор (проём) */}
        <HDim x1={p + GKL_LAYER * s} x2={innerLayerX} y={topY + CEILING_H * s + 20}
          color={C_DOOR} textColor={C_DOOR} label={GKL_GAP} fontSize={8}/>
        {/* Внутренний слой */}
        <HDim x1={innerLayerX} x2={innerLayerX + GKL_LAYER * s} y={topY + CEILING_H * s + 20}
          color={C_FRAME} textColor={C_FRAME} label={GKL_LAYER} fontSize={8}/>
        {/* Горизонтальная часть */}
        <HDim x1={innerLayerX + GKL_LAYER * s} x2={innerLayerX + (GKL_LAYER + HORIZ_W) * s} y={topY + CEILING_H * s + 20}
          label={HORIZ_W} fontSize={9}/>

        {/* Общая толщина двойной перегородки */}
        <HDim x1={p} x2={innerLayerX + GKL_LAYER * s} y={topY + CEILING_H * s + 40}
          label={PARTITION_T} fontSize={9}/>

        {/* Высота */}
        <VDim x={innerLayerX + (GKL_LAYER + HORIZ_W) * s + 15} y1={topY} y2={topY + CEILING_H * s}
          label={CEILING_H} fontSize={9} labelX={innerLayerX + (GKL_LAYER + HORIZ_W) * s + 25}/>
        {/* Доборка снизу */}
        <VDim x={innerLayerX + (GKL_LAYER + HORIZ_W) * s + 35} y1={topY + PANEL_H * s} y2={topY + CEILING_H * s}
          color={C_DOBOR} textColor={C_DOBOR} label={DOBOR_H} fontSize={8} labelX={innerLayerX + (GKL_LAYER + HORIZ_W) * s + 45}/>
        {/* Высота проёма */}
        <VDim x={p - PANEL_T * s - 15} y1={topY + (CEILING_H - DOOR_H) * s} y2={topY + CEILING_H * s}
          color={C_DOOR} textColor={C_DOOR} label={DOOR_H} fontSize={8}/>
      </svg>
    );
  };

  // === Разрез горизонтальной части (одинарная 50 мм с ЛДСП с двух сторон) ===
  const HorizSectionView = () => {
    const w = 408;
    const svgH = 476;
    const s = 1.36;
    const h = 255; // Высота схемы
    const topY = 85; // Начало схемы от верха

    // Центрирование по горизонтали
    const schemaW = (PS_W + PANEL_T * 2) * s;
    const p = (w - schemaW) / 2 + PANEL_T * s;

    return (
      <svg viewBox={`0 0 ${w} ${svgH}`}
        style={{ width: w, background: C_BG_SVG, borderRadius: 8 }}>

        <text x={w/2} y={18} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={13} fontWeight="bold">
          Разрез горизонтальной части
        </text>
        <text x={w/2} y={34} textAnchor="middle" fill={C_TEXT_DIM} fontSize={10}>
          Одинарная 50 мм, ЛДСП с двух сторон
        </text>

        {/* ЛДСП слева (сторона проёма) */}
        <rect x={p - PANEL_T * s} y={topY} width={PANEL_T * s} height={h}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>

        {/* Каркас ПС */}
        <rect x={p} y={topY} width={PS_W * s} height={h}
          fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
        <text x={p + PS_W/2 * s} y={topY + h/2} textAnchor="middle" fill={C_FRAME} fontSize={9}>ПС</text>

        {/* ЛДСП справа (сторона шкафа) */}
        <rect x={p + PS_W * s} y={topY} width={PANEL_T * s} height={h}
          fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>

        {/* Подписи сторон */}
        <text x={p - PANEL_T * s - 5} y={topY + h/2} textAnchor="end" fill={C_DOOR} fontSize={8}>Проём</text>
        <text x={p + PS_W * s + PANEL_T * s + 5} y={topY + h/2} textAnchor="start" fill={C_WARDROBE} fontSize={8}>Шкаф</text>

        {/* Размерные линии */}
        <HDim x1={p - PANEL_T * s} x2={p} y={topY + h + 15}
          label={PANEL_T} fontSize={8}/>
        <HDim x1={p} x2={p + PS_W * s} y={topY + h + 15}
          color={C_FRAME} textColor={C_FRAME} label={PS_W} fontSize={8}/>
        <HDim x1={p + PS_W * s} x2={p + PS_W * s + PANEL_T * s} y={topY + h + 15}
          label={PANEL_T} fontSize={8}/>

        {/* Общая толщина */}
        <HDim x1={p - PANEL_T * s} x2={p + PS_W * s + PANEL_T * s} y={topY + h + 35}
          label={HORIZ_T + PANEL_T * 2} fontSize={9}/>
      </svg>
    );
  };

  // === Спецификация ===
  const Specification = () => {
    const gapLeft = VERT_LEN - DOOR_OFFSET - DOOR_W - PANEL_W * 2; // 20 мм
    const items = [
      { name: "ЛДСП панель (до проёма)", size: `${PANEL_W}×${PANEL_H}×${PANEL_T}`, qty: "4 шт", note: "2 панели × 2 стороны перегородки" },
      { name: "ЛДСП панель (над дверью)", size: `${DOOR_W}×${OVER_DOOR_PANEL_H}×${PANEL_T}`, qty: "2 шт", note: "до потолка + 100мм для механизма двери" },
      { name: "ЛДСП панель (горизонтальная)", size: `${HORIZ_W}×${PANEL_H}×${PANEL_T}`, qty: "2 шт", note: "верх и низ горизонтальной части" },
      { name: "ЛДСП доборка (у стены)", size: `${gapLeft}×${PANEL_H}×${PANEL_T}`, qty: "2 шт", note: "зазор у верхней стены" },
      { name: "ЛДСП доборка (после проёма)", size: `${DOOR_OFFSET}×${PANEL_H}×${PANEL_T}`, qty: "2 шт", note: "от проёма до ванной" },
      { name: "Доборная планка (верх)", size: `~1800×${DOBOR_H}×${PANEL_T}`, qty: "2 шт", note: "над панелями до потолка" },
      { name: "Брус (над дверью)", size: `${VERT_LEN - DOOR_OFFSET}×${BEAM_H}×${BEAM_W}`, qty: "2 шт", note: "от стены до конца проёма × 2 слоя" },
      { name: "Брус (в стойке)", size: `${CEILING_H - PN_H * 2}×${BEAM_H}×${BEAM_W}`, qty: "2 шт", note: "усиление стойки у ванной × 2 слоя" },
      { name: "Профиль ПН 50×40", size: `${VERT_LEN} мм`, qty: "4 шт", note: "пол + потолок × 2 слоя" },
      { name: "Профиль ПС 50×50", size: `${CEILING_H - PN_H * 2} мм`, qty: "10 шт", note: "5 стоек × 2 слоя" },
    ];

    return (
      <div style={{ background: C_BG_SVG, borderRadius: 8, padding: 16, maxWidth: 700 }}>
        <h3 style={{ color: C_COLUMN_TEXT, margin: "0 0 12px", fontSize: 14 }}>Спецификация материалов</h3>
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
          * Панель вплотную к потолку | Доборка снизу: {DOBOR_H} мм | Высота проёма: {DOOR_H} мм | Отступ проёма от ванной: {DOOR_OFFSET} мм
        </p>
      </div>
    );
  };

  return (
    <div style={{ background: C_BG, minHeight: "100vh", padding: 20, fontFamily: "sans-serif", color: C_TEXT }}>
      <h2 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "0 0 4px" }}>
        Каркас перегородки спальни
      </h2>
      <p style={{ textAlign: "center", color: C_TEXT_DIM, margin: "0 0 16px", fontSize: 14 }}>
        Двойная вертикальная перегородка {PARTITION_T} мм + горизонтальная часть {HORIZ_W}×{HORIZ_T} мм |
        Обшивка ЛДСП {PANEL_T} мм
      </p>

      {/* Вид спереди (внешний слой) */}
      <h3 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "20px 0 12px", fontSize: 16 }}>
        Внешний слой (со стороны лестницы)
      </h3>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <FrontView />
      </div>

      {/* Вид сзади (внутренний слой) */}
      <h3 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "20px 0 12px", fontSize: 16 }}>
        Внутренний слой (со стороны спальни)
      </h3>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <BackView />
      </div>

      {/* Легенда */}
      <div style={{ marginBottom: 20 }}>
        <Legend />
      </div>

      {/* Разрезы перегородок */}
      <h3 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "20px 0 12px", fontSize: 16 }}>
        Разрезы перегородок
      </h3>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
        <SectionView />
        <HorizSectionView />
      </div>

      {/* Горизонтальная часть и спецификация */}
      <h3 style={{ textAlign: "center", color: C_COLUMN_TEXT, margin: "20px 0 12px", fontSize: 16 }}>
        Горизонтальная одинарная перегородка (отгораживает шкаф)
      </h3>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
        <HorizFrontView />
        <Specification />
      </div>
    </div>
  );
}
