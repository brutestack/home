// Константы плана 2-го этажа

// === Базовые параметры ===
export const S = 70;           // Масштаб (пикселей на метр)
export const W = 9.4;          // Ширина помещения (м)
export const H = 5.4;          // Высота помещения (м)
export const CW = W * S;       // Ширина в пикселях
export const CH = H * S;       // Высота в пикселях

// === Стены ===
export const OWALL_T = 0.25;   // Толщина внешних стен (м)
export const OWALL_PX = OWALL_T * S;
export const WIN_FRAME = 0.07; // Толщина рамы окна (м)
export const WIN_FRAME_PX = WIN_FRAME * S;
export const PAD = 60 + OWALL_PX; // Отступ SVG

// Внутренняя стена: 3м от левой стены, длина 2630мм, толщина 250мм
export const IWALL_X = 3.0;
export const IWALL_LEN = 2.63;
export const IWALL_T = 0.25;

// === Колонны ===
// Колонна 1: 200x150мм, на расстоянии 2240мм от внутренней стены
export const COL_DIST = 2.24;
export const COL_W = 0.2;
export const COL_H = 0.15;

// Колонна 2 (левая, у внутренней стены): 200x150мм
export const COL2_W = 0.2;
export const COL2_H = 0.15;

// === ГКЛ перегородки ===
// Горизонтальная двойная: от колонны 2 до колонны 1, 50+75+50мм
// Между слоями профиль ПН 75×40 (пол + потолок) для равномерного зазора
export const GKL_LAYER = 0.05;
export const GKL_GAP = 0.075;
export const GKL_T = GKL_LAYER * 2 + GKL_GAP; // 175мм

// Вертикальная (ванная): от колонны до нижней стены, 100мм
export const GKL2_T = 0.1;

// Вертикальная двойная: от верхней стены до ванной, 50+75+50мм
// Между слоями профиль ПН 75×40 (пол + потолок) для равномерного зазора
export const GKL3_LAYER = 0.05;
export const GKL3_GAP = 0.075;

// Горизонтальная одинарная (над проёмом в спальню): 700×50мм
export const GKL4_W = 0.7;
export const GKL4_T = 0.05;

// Проём в перегородках: ширина 900мм, отступ 50мм
export const DOOR_W = 0.9;
export const DOOR_OFFSET = 0.05;

// === Окна ===
// Верхняя стена: от 2540мм, ширина 1250мм
export const WIN_X = 2.54;
export const WIN_W = 1.25;

// Балконная дверь (правая стена): от 620мм от нижнего угла, ширина 2270мм
export const WIN3_START = 0.62;
export const WIN3_W = 2.27;
export const DOOR3_HINGE = 0.04; // Петли на 40мм от нижнего края
export const DOOR3_LEN = 0.75;   // Длина створки

// Верхнее окно (правая стена): от 620мм от верхнего угла, ширина 1250мм
export const WIN4_START = 0.62;
export const WIN4_W = 1.25;

// Окно на левой стене: от 620мм от нижнего угла, ширина 1250мм
export const WIN5_START = 0.62;
export const WIN5_W = 1.25;

// Форточка на левой стене: от 1640мм от верхнего угла, ширина 910мм
export const WIN6_START = 1.64;
export const WIN6_W = 0.91;

// Окно на нижней стене ванной: 630мм от левой стены ванной, ширина 1250мм
export const WIN2_X = IWALL_X + IWALL_T + 0.63;
export const WIN2_W = 1.25;

// === Зона проводки/труб ===
export const PROEM_X = 0;
export const PROEM_Y = 0.15;
export const PROEM_W = 3.0;
export const PROEM_H = 1.7;
export const PIPES_START = PROEM_W + 0.84;
export const PIPES_END = PROEM_W + 1.40;

// === Мебель спальни ===
// Угловой диван: 3000x2050мм, глубина 1050мм
export const SOFA_L = 3.0;
export const SOFA_S = 2.05;
export const SOFA_D = 1.05;
export const SOFA_GAP_COL = 0.1;
export const SOFA_GAP_BOT = 0.1;
export const SOFA_X = IWALL_X + IWALL_T + COL_DIST + COL_W + SOFA_GAP_COL;

// Двухспальная кровать: 2000x1600мм
export const BED_L = 2.0;
export const BED_W = 1.6;
export const BED_GAP_TOP = 0.1;
export const BED_GAP_RIGHT = W - (SOFA_X + SOFA_L);

// Шкаф: глубина 700мм
export const WARDROBE_D = 0.7;
export const WARDROBE_X = PIPES_END + GKL3_LAYER * 2 + GKL3_GAP;
export const WARDROBE_Y = 0.02;
export const WARDROBE_L = H - IWALL_LEN - DOOR_OFFSET - DOOR_W - GKL4_T - WARDROBE_Y;

// Туалетный столик: 1000x450мм
export const VANITY_W = 1.0;
export const VANITY_D = 0.45;
export const VANITY_GAP = 0.15;
export const VANITY_X = WARDROBE_X + WARDROBE_D + (W - BED_GAP_RIGHT - BED_W - WARDROBE_X - WARDROBE_D - VANITY_W) / 2;

// Кресло: 820x960мм
export const CHAIR_W = 0.82;
export const CHAIR_D = 0.96;
export const CHAIR_X = VANITY_X + (VANITY_W - CHAIR_W) / 2;
export const CHAIR_Y = VANITY_GAP + VANITY_D + 0.25;

// Проём в горизонтальной перегородке
export const HDOOR_X = PIPES_END + GKL3_LAYER * 2 + GKL3_GAP;

// === Ванная комната ===
// Ванна: 1400x700мм
export const BATH_L = 1.4;
export const BATH_W = 0.7;
export const BATH_GAP = 0.05;

// Унитаз: 650x380мм (бачок 200мм)
export const WC_L = 0.65;
export const WC_W = 0.38;
export const WC_TANK = 0.2;
export const WC_GAP_LEFT = 0.05;
export const WC_RIGHT = IWALL_X + IWALL_T + COL_DIST + COL_W - GKL2_T;

// Угловая тумба с раковиной: 550x550мм
export const SINK_SIZE = 0.55;
export const SINK_GAP = 0.05;

// === Лестница ===
export const PLAT_X = 0.05;
export const PLAT_W = 0.75;
export const MARCH_W = PROEM_H / 2;
export const M1_STEPS = 5;
export const M2_STEPS = 8;
export const TREAD = 0.25;
export const DOBOR_TREAD = 0.20;
export const M1_LEN = M1_STEPS * TREAD;
export const M2_LEN = M2_STEPS * TREAD;
export const M2_FULL = M2_LEN + DOBOR_TREAD;
export const MX = PLAT_X + PLAT_W;

// === Вспомогательная функция ===
export const R = (x: number, y: number, w: number, h: number, sc: number, pd: number) => ({
  x: pd + x * sc,
  y: pd + y * sc,
  w: w * sc,
  h: h * sc,
  r: pd + (x + w) * sc,
  b: pd + (y + h) * sc
});

// ============================================================
// === ДЕТАЛЬНЫЕ ЧЕРТЕЖИ (размеры в мм) ===
// ============================================================

// === Общие параметры помещения (мм) ===
export const CEILING_H_MM = 2800;        // Высота потолка
export const GKL_SHEET_H_MM = 2500;      // Высота листа ГКЛ
export const GKL_SHEET_W_MM = 1200;      // Ширина листа ГКЛ
export const GKL_THICKNESS_MM = 12.5;    // Толщина листа ГКЛ
export const DOBOR_H_MM = CEILING_H_MM - GKL_SHEET_H_MM; // Доборка сверху (300мм)

// === Дверные проёмы (мм) ===
export const DOOR_W_MM = 900;            // Ширина дверного проёма
export const DOOR_H_MM = 2000;           // Высота проёма до ГКЛ
export const DOOR_OFFSET_MM = 50;        // Отступ проёма
export const OVER_DOOR_H_MM = CEILING_H_MM - DOOR_H_MM; // ГКЛ над дверью (800мм)

// === Брус для механизма двери (мм) ===
export const BEAM_LEVEL_MM = 2100;       // Высота нижней грани бруса от пола
export const BEAM_W_MM = 50;             // Ширина бруса
export const BEAM_H_MM = 70;             // Высота бруса

// === Каркас перегородки (мм) ===
export const GKL_LAYER_MM = 50;          // Толщина слоя каркаса
export const GKL_GAP_MM = 75;            // Зазор между слоями (профиль ПН 75×40)
export const PARTITION_T_MM = GKL_LAYER_MM * 2 + GKL_GAP_MM; // Общая толщина каркаса (175мм)

// === Профили каркаса (мм) ===
export const PN_W_MM = 50;               // Ширина направляющего профиля
export const PN_H_MM = 40;               // Высота направляющего профиля
export const PN_GAP_W_MM = 75;           // Ширина ПН между слоями
export const PN_GAP_H_MM = 40;           // Высота ПН между слоями
export const PS_W_MM = 50;               // Ширина стоечного профиля
export const PS_H_MM = 50;               // Толщина стоечного профиля
export const STUD_STEP_MM = 600;         // Шаг стоечных профилей

// === Колонны (мм) ===
export const COL_W_MM = 200;             // Ширина колонны
export const COL_H_MM = 150;             // Глубина колонны

// === Перегородка ванной (Лист 5) ===
export const BATH_HORIZ_LEN_MM = 2040;   // Длина горизонтальной перегородки (от кол.2 до кол.1)
export const BATH_TOTAL_LEN_MM = COL_W_MM + BATH_HORIZ_LEN_MM + COL_W_MM; // 2440 мм

// Позиции проёма ванной
export const BATH_COL2_STUD_POS_MM = COL_W_MM;   // Стойка у колонны 2 (200 мм)
export const BATH_DOOR_START_MM = COL_W_MM + PS_W_MM; // Начало проёма (250 мм)
export const BATH_DOOR_END_MM = BATH_DOOR_START_MM + DOOR_W_MM; // Конец проёма (1150 мм)
export const BATH_DOOR_STUD_POS_MM = BATH_DOOR_END_MM; // Стойка у проёма справа

// === Примыкание перегородки спальни (мм) ===
export const BEDROOM_PART_LEFT_MM = 1150;   // Левый край (совпадает с DOOR_END)
export const BEDROOM_PART_T_MM = 175;       // Толщина перегородки спальни
export const BEDROOM_PART_RIGHT_MM = BEDROOM_PART_LEFT_MM + BEDROOM_PART_T_MM; // 1325 мм

// === Перегородка спальни (Лист 3, 4) ===
export const BEDROOM_VERT_LEN_MM = 2770;    // Длина вертикальной перегородки (5400 - 2630)
export const BEDROOM_DOOR_START_MM = BEDROOM_VERT_LEN_MM - DOOR_OFFSET_MM - DOOR_W_MM; // 1820 мм
export const BEDROOM_DOOR_END_MM = BEDROOM_VERT_LEN_MM - DOOR_OFFSET_MM; // 2720 мм

// === Масштабы схем ===
export const S_FRONT = 0.32;             // Масштаб вида спереди (px/мм)
export const S_FRONT_BEDROOM = 0.28;     // Масштаб для перегородки спальни
export const S_SECTION = 1.3;            // Масштаб разреза (px/мм)

// === Размеры SVG схем ===
export const FRONT_W = 950;
export const FRONT_H = 1100;
export const FRONT_W_BEDROOM = 1000;
export const FRONT_H_BEDROOM = 900;

// === Расчёт позиций стоек перегородки ванной ===
// Стойки для стороны коридора (с перегородкой спальни)
const getStudPositionsCorridor = () => {
  const studs: number[] = [];
  studs.push(BATH_COL2_STUD_POS_MM);           // Стойка у колонны 2
  studs.push(BATH_DOOR_STUD_POS_MM);           // Стойка у проёма справа
  studs.push(BEDROOM_PART_RIGHT_MM);           // Стойка после перегородки спальни
  let pos = BEDROOM_PART_RIGHT_MM + STUD_STEP_MM;
  while (pos < COL_W_MM + BATH_HORIZ_LEN_MM - PS_W_MM) {
    studs.push(pos);
    pos += STUD_STEP_MM;
  }
  studs.push(COL_W_MM + BATH_HORIZ_LEN_MM - PS_W_MM); // Стойка у колонны 1
  return studs;
};

// Стойки для стороны ванной (без перегородки спальни)
const getStudPositionsBath = () => {
  const studs: number[] = [];
  studs.push(BATH_COL2_STUD_POS_MM);           // Стойка у колонны 2
  studs.push(BATH_DOOR_STUD_POS_MM);           // Стойка у проёма справа
  let pos = BATH_DOOR_END_MM + STUD_STEP_MM;
  while (pos < COL_W_MM + BATH_HORIZ_LEN_MM - PS_W_MM) {
    studs.push(pos);
    pos += STUD_STEP_MM;
  }
  studs.push(COL_W_MM + BATH_HORIZ_LEN_MM - PS_W_MM); // Стойка у колонны 1
  return studs;
};

export const STUD_POSITIONS_CORRIDOR = getStudPositionsCorridor();
export const STUD_POSITIONS_BATH = getStudPositionsBath();
export const STUD_POSITIONS = STUD_POSITIONS_CORRIDOR; // Для совместимости

// Номера стоек: коридор 1-N, ванная (N+1)-M
export const getStudNumberCorridor = (pos: number) => STUD_POSITIONS_CORRIDOR.indexOf(pos) + 1;
export const getStudNumberBath = (pos: number) => STUD_POSITIONS_BATH.indexOf(pos) + 1 + STUD_POSITIONS_CORRIDOR.length;

// ============================================================
// === ПЕРЕГОРОДКА СПАЛЬНИ ЛДСП (Лист 3) ===
// ============================================================

// ЛДСП панели
export const PANEL_H_MM = 2700;              // Высота ЛДСП панели
export const PANEL_W_MM = 900;               // Ширина ЛДСП панели
export const PANEL_T_MM = 16;                // Толщина ЛДСП панели
export const LDSP_DOBOR_H_MM = CEILING_H_MM - PANEL_H_MM; // Доборка снизу (100 мм)

// Панель над дверью (ЛДСП)
export const OVER_DOOR_PANEL_H_MM = OVER_DOOR_H_MM + 100; // С перекрытием для механизма (800 мм)

// Горизонтальная часть перегородки
export const HORIZ_W_MM = 700;               // Длина горизонтальной части
export const HORIZ_T_MM = 50;                // Толщина горизонтальной части

// Длина вертикальной перегородки спальни
export const BEDROOM_VERT_FULL_LEN_MM = 2770; // От верхней стены до ванной

// Позиции стоек перегородки спальни (внешний слой, со стороны лестницы)
const getStudPositionsFrontLDSP = () => {
  const GAP_LEFT = BEDROOM_VERT_FULL_LEN_MM - DOOR_OFFSET_MM - DOOR_W_MM - PANEL_W_MM * 2; // 20 мм
  const stud1 = GAP_LEFT;
  const stud2 = GAP_LEFT + PANEL_W_MM;
  const doorStart = GAP_LEFT + PANEL_W_MM * 2;
  const doorEnd = BEDROOM_VERT_FULL_LEN_MM - DOOR_OFFSET_MM;
  return [0, stud1, stud2, doorStart - PS_W_MM, doorEnd];
};

// Позиции стоек перегородки спальни (внутренний слой, со стороны спальни)
const getStudPositionsBackLDSP = () => {
  const doorStartMirror = DOOR_OFFSET_MM;
  const doorEndMirror = DOOR_OFFSET_MM + DOOR_W_MM;
  const horizPartitionEnd = doorEndMirror + PS_W_MM;
  const panelAreaStart = horizPartitionEnd;
  const panel1End = panelAreaStart + PANEL_W_MM;
  return [0, panelAreaStart, panel1End - PS_W_MM / 2, BEDROOM_VERT_FULL_LEN_MM - PS_W_MM];
};

export const STUD_POSITIONS_FRONT_LDSP = getStudPositionsFrontLDSP();
export const STUD_POSITIONS_BACK_LDSP = getStudPositionsBackLDSP();
export const getStudNumberFrontLDSP = (index: number) => index + 1;
export const getStudNumberBackLDSP = (index: number) => index + 1 + STUD_POSITIONS_FRONT_LDSP.length;

// Масштабы схем Листа 3
export const S_FRONT_LDSP = 0.28;
export const S_TOP_LDSP = 1.5;
export const S_SECTION_LDSP = 0.8;

// ============================================================
// === ПЕРЕГОРОДКА СПАЛЬНИ ГКЛ (Лист 4) ===
// ============================================================

// Раскладка ГКЛ (Лист 4)
export const GKL_DOOR_START_MM = BEDROOM_VERT_FULL_LEN_MM - DOOR_OFFSET_MM - DOOR_W_MM; // 1820
export const GKL_DOOR_END_MM = BEDROOM_VERT_FULL_LEN_MM - DOOR_OFFSET_MM;               // 2720
export const GKL_DOOR_STUD_LEFT_MM = GKL_DOOR_START_MM - PS_W_MM;                       // 1770
export const GKL_DOOR_STUD_LEFT_MID_MM = GKL_DOOR_STUD_LEFT_MM + PS_W_MM / 2;           // 1795

// Узкий лист у стены: 1820 - 1200 = 620
export const GKL_NARROW_SHEET_W_MM = GKL_DOOR_START_MM - GKL_SHEET_W_MM;                // 620
export const GKL_SHEET_JOINT_MM = GKL_NARROW_SHEET_W_MM;                                // 620

// Позиции стоек для ГКЛ варианта
const getStudPositionsGkl = () => {
  const studs: number[] = [0];
  studs.push(GKL_SHEET_JOINT_MM - PS_W_MM / 2);
  let pos = GKL_SHEET_JOINT_MM + STUD_STEP_MM;
  while (pos < GKL_DOOR_START_MM - PS_W_MM) {
    studs.push(pos - PS_W_MM / 2);
    pos += STUD_STEP_MM;
  }
  studs.push(GKL_DOOR_START_MM - PS_W_MM);
  studs.push(GKL_DOOR_END_MM);
  return studs;
};

export const STUD_POSITIONS_GKL = getStudPositionsGkl();
export const STUD_POSITIONS_GKL_BEDROOM = STUD_POSITIONS_GKL.map(pos => BEDROOM_VERT_FULL_LEN_MM - pos - PS_W_MM).reverse();
export const getStudNumberGklStairs = (pos: number) => STUD_POSITIONS_GKL.indexOf(pos) + 1;
export const getStudNumberGklBedroom = (pos: number) => STUD_POSITIONS_GKL_BEDROOM.indexOf(pos) + 1 + STUD_POSITIONS_GKL.length;

// Цвет доборки ГКЛ
// (уже есть в colors.ts как C_GKL_PANEL)
