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
