// Цветовая схема проекта

// === Вспомогательная функция ===
// Конвертирует hex цвет в rgba с заданной прозрачностью
export const rgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

// === Лестница ===
export const C_STEP = "#ff9800";           // Ступени, проём
export const C_STEP_LIGHT = "#ff980055";   // Ступени (прозрачный)
export const C_STEP_MID = "#ff980077";     // Ступени (средний)
export const C_STEP_DIM = "#ff980088";     // Ступени (полупрозрачный)
export const C_STEP_FAINT = "#ff980044";   // Ступени (очень прозрачный)
export const C_STEP_TEXT = "#ff9800aa";    // Текст ступеней
export const C_STEP_FILL = "#ff980033";    // Заливка ступеней
export const C_PLATFORM = "#ffab40";       // Площадки
export const C_EXIT = "#4caf50";           // Доборная ступень, выход на 2-й этаж
export const C_EXIT_FAINT = "#4caf5026";   // Выход (очень прозрачный)
export const C_ENTER = "#2196f3";          // Вход с 1-го этажа
export const C_CRITICAL = "#e74c3c";       // Критические размеры, линия 2м, базовая линия

// === Размерные линии ===
export const C_DIM = "#4fc3f7";            // Размерные линии, окна
export const C_DIM_TRANS = "#4fc3f788";    // Размерные линии (прозрачные)
export const C_DIM_LIGHT = "#4fc3f766";    // Размерные линии (светлые)

// === Мебель спальни ===
export const C_BEDROOM = "#6a5acd";        // Диван, кровать, надпись "Спальня"
export const C_BEDROOM_FILL = "#6a5acd33"; // Заливка мебели спальни
export const C_BEDROOM_LIGHT = "#6a5acd22";// Заливка кровати
export const C_BEDROOM_DIM = "#6a5acd66";  // Размерные линии мебели
export const C_BEDROOM_STROKE = "#6a5acd88";// Обводка деталей

export const C_WARDROBE = "#8b4513";       // Шкаф
export const C_WARDROBE_FILL = "#8b451322";
export const C_WARDROBE_DIM = "#8b451366";

export const C_VANITY = "#daa520";         // Туалетный столик, кресло
export const C_VANITY_FILL = "#daa52022";
export const C_VANITY_DIM = "#daa52066";
export const C_VANITY_LIGHT = "#daa52033";
export const C_VANITY_STROKE = "#daa52088";

// === Ванная комната ===
export const C_BATH = "#5dade2";           // Ванная комната
export const C_BATH_FILL = "#5dade233";
export const C_BATH_DIM = "#5dade266";
export const C_BATH_TRANS = "#5dade288";
export const C_BATH_LIGHT = "#5dade255";
export const C_BATH_FAINT = "#5dade211";

// === Стены и перегородки ===
export const C_WALL = "#e0e0e0";           // Стены
export const C_WALL_BORDER = "#c0c0c0";    // Граница стен
export const C_COLUMN = "#888888";         // Колонна
export const C_COLUMN_BORDER = "#666";     // Обводка колонны
export const C_COLUMN_TEXT = "#fff";       // Текст на колонне
export const C_GKL = "#a0a0a0";            // ГКЛ перегородки
export const C_GKL_BORDER = "#888";        // Обводка ГКЛ
export const C_GKL_TEXT = "#666";          // Текст ГКЛ/проёмы

// === Зоны ===
export const C_PIPES = "#e91e63";          // Зона проводки/труб
export const C_PIPES_FILL = "#e91e6333";

// === Фон ===
export const C_BG = "#1a1a2e";             // Фон страницы
export const C_BG_SVG = "#16213e";         // Фон SVG
export const C_ROOM = "#1e2d4a";           // Фон комнаты
export const C_PROEM = "#0d1520";          // Фон проёма лестницы
export const C_PLAT1 = "#1a1200";          // Фон площадки 1
export const C_PLAT2 = "#2a1e00";          // Фон площадки 2
export const C_GRID = "#ffffff08";         // Сетка

// === Текст ===
export const C_TEXT = "#e0e0e0";           // Основной текст
export const C_TEXT_DIM = "#888";          // Приглушённый текст

// === UI элементы ===
export const C_TOOLTIP_BG = "#000c";       // Фон подсказок

// === Каркас перегородок (детальные чертежи) ===
export const C_FRAME = "#8B4513";          // Профиль каркаса (коричневый)
export const C_FRAME_FILL = "#8B451333";
export const C_BEAM = "#A0522D";           // Деревянный брус (сиена)
export const C_BEAM_FILL = "#A0522D55";
export const C_GKL_PANEL = "#9E9E9E";      // ГКЛ лист (серый)
export const C_GKL_PANEL_FILL = "#9E9E9E22";
export const C_DOOR_OPENING = "#228B22";   // Дверной проём (зелёный)
export const C_COL_FILL = "#88888855";     // Заливка колонны

// === Примыкание перегородки спальни ===
export const C_BEDROOM_PART = "#9C27B0";   // Фиолетовый

// === ЛДСП панели (Лист 3) ===
export const C_PANEL = "#DEB887";          // ЛДСП панель (бежевый)
export const C_PANEL_FILL = "#DEB88733";
export const C_DOBOR = "#D2691E";          // Доборная планка ЛДСП
export const C_DOBOR_GKL = "#757575";      // Доборка ГКЛ
