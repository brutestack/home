import { HDim, VDim, StudLabel, SpecLabel, Crosshair, createMouseHandler, MousePos, SchemaArea } from "../svg-primitives";
import {
  PARTITION_T_MM, GKL_THICKNESS_MM, GKL_LAYER_MM, GKL_GAP_MM,
  BATH_TOTAL_LEN_MM,
  PS_W_MM, DOOR_W_MM, BATH_DOOR_START_MM, BATH_DOOR_END_MM,
  BEDROOM_PART_LEFT_MM, BEDROOM_PART_T_MM, BEDROOM_PART_RIGHT_MM,
  STUD_POSITIONS_CORRIDOR, STUD_POSITIONS_BATH,
  getStudNumberCorridor, getStudNumberBath
} from "../constants";
import {
  C_BG_SVG, C_TEXT_DIM, C_COLUMN_TEXT, C_BATH,
  C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_GKL_PANEL, C_GKL_PANEL_FILL,
  C_GKL_LAYER2, C_GKL_LAYER2_FILL,
  C_DOOR_OPENING, C_BEDROOM_PART
} from "../colors";

export function TopView({ onMouseMove, mouse }: {
  onMouseMove?: (pos: MousePos | null) => void;
  mouse?: MousePos | null;
}) {
  const w = 950;
  const svgH = 360;
  const s = 0.28; // Масштаб

  // Длина кусочка перегородки спальни для отображения
  const bedroomPartLen = 350; // мм

  // Верхний отступ для перегородки спальни
  const topPadding = 70 + bedroomPartLen * s;
  const p = topPadding; // основная перегородка начинается после отступа

  // Глубина перегородки (с ГКЛ: 1 слой коридор + 2 слоя ванная)
  const partDepth = PARTITION_T_MM + GKL_THICKNESS_MM * 3; // 212.5 мм

  // Позиции слоёв по вертикали (сверху вниз: лестница → коридор → перегородка → ванная)
  const gkl1Y = 0;                                                    // ГКЛ коридор (верх)
  const layer1Y = GKL_THICKNESS_MM;                                   // Каркас слой 1 (коридор)
  const gapY = GKL_THICKNESS_MM + GKL_LAYER_MM;                      // Зазор между слоями
  const layer2Y = GKL_THICKNESS_MM + GKL_LAYER_MM + GKL_GAP_MM;      // Каркас слой 2 (ванная)
  const gkl2Y = GKL_THICKNESS_MM + PARTITION_T_MM;                    // ГКЛ ванная 1-й слой
  const gkl3Y = GKL_THICKNESS_MM + PARTITION_T_MM + GKL_THICKNESS_MM; // ГКЛ ванная 2-й слой

  // Область для курсора (вид сверху: X = позиция, Y = глубина от коридора к ванной)
  const totalWidthMm = BATH_TOTAL_LEN_MM;
  const heightMm = partDepth;
  const area: SchemaArea = {
    paddingX: p,
    paddingY: p,
    scale: s,
    width: totalWidthMm,
    height: heightMm,
    svgWidth: w,
    invertY: false  // вид сверху: Y растёт вниз
  };

  return (
    <svg viewBox={`0 0 ${w} ${svgH}`}
      style={{ width: w, background: C_BG_SVG, borderRadius: 8, cursor: onMouseMove ? "crosshair" : undefined }}
      onMouseMove={onMouseMove ? createMouseHandler(area, onMouseMove) : undefined}
      onMouseLeave={onMouseMove ? () => onMouseMove(null) : undefined}>

      <text x={w/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л5.Сх4 — Вид сверху — структура двойной перегородки
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
      <rect x={p + BEDROOM_PART_LEFT_MM * s} y={p + layer1Y * s - bedroomPartLen * s}
        width={GKL_LAYER_MM * s} height={bedroomPartLen * s}
        fill={C_BEDROOM_PART + "33"} stroke={C_BEDROOM_PART} strokeWidth={1.5}/>
      {/* Зазор перегородки спальни */}
      <rect x={p + (BEDROOM_PART_LEFT_MM + GKL_LAYER_MM) * s} y={p + layer1Y * s - bedroomPartLen * s}
        width={GKL_GAP_MM * s} height={bedroomPartLen * s}
        fill="none" stroke={C_BEDROOM_PART} strokeWidth={1} strokeDasharray="3 2"/>
      {/* Внутренний слой спальни (сторона спальни) */}
      <rect x={p + (BEDROOM_PART_LEFT_MM + GKL_LAYER_MM + GKL_GAP_MM) * s} y={p + layer1Y * s - bedroomPartLen * s}
        width={GKL_LAYER_MM * s} height={bedroomPartLen * s}
        fill={C_BEDROOM_PART + "33"} stroke={C_BEDROOM_PART} strokeWidth={1.5}/>

      {/* Стойка перегородки спальни со стороны проёма (в нижней части) */}
      {/* Стойка в внешнем слое (сторона лестницы) */}
      <line x1={p + BEDROOM_PART_LEFT_MM * s} y1={p + layer1Y * s - PS_W_MM * s}
        x2={p + (BEDROOM_PART_LEFT_MM + GKL_LAYER_MM) * s} y2={p + layer1Y * s - PS_W_MM * s}
        stroke={C_BEDROOM_PART} strokeWidth={1.5}/>
      {/* Брус 75×50 между стойками (в зазоре) */}
      <rect x={p + (BEDROOM_PART_LEFT_MM + GKL_LAYER_MM) * s} y={p + layer1Y * s - PS_W_MM * s}
        width={GKL_GAP_MM * s} height={PS_W_MM * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={1.5}/>
      <SpecLabel x={p + (BEDROOM_PART_LEFT_MM + GKL_LAYER_MM + GKL_GAP_MM/2) * s} y={p + layer1Y * s - PS_W_MM/2 * s} num={13} size={12} fontSize={8} color={C_BEAM}/>
      {/* Стойка в внутреннем слое (сторона спальни) */}
      <line x1={p + (BEDROOM_PART_LEFT_MM + GKL_LAYER_MM + GKL_GAP_MM) * s} y1={p + layer1Y * s - PS_W_MM * s}
        x2={p + (BEDROOM_PART_LEFT_MM + BEDROOM_PART_T_MM) * s} y2={p + layer1Y * s - PS_W_MM * s}
        stroke={C_BEDROOM_PART} strokeWidth={1.5}/>

      {/* Подпись */}
      <text x={p + (BEDROOM_PART_LEFT_MM + BEDROOM_PART_T_MM/2) * s} y={p + layer1Y * s - bedroomPartLen/2 * s}
        textAnchor="middle" fill={C_BEDROOM_PART} fontSize={8}
        transform={`rotate(-90,${p + (BEDROOM_PART_LEFT_MM + BEDROOM_PART_T_MM/2) * s},${p + layer1Y * s - bedroomPartLen/2 * s})`}>
        перегородка спальни
      </text>

      {/* Стрелка направления перегородки спальни (к верхней стене) */}
      <defs>
        <marker id="arrowBedroom" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill={C_BEDROOM_PART}/>
        </marker>
      </defs>
      <line x1={p + (BEDROOM_PART_LEFT_MM + BEDROOM_PART_T_MM/2) * s} y1={p + layer1Y * s - bedroomPartLen * s}
        x2={p + (BEDROOM_PART_LEFT_MM + BEDROOM_PART_T_MM/2) * s} y2={p + layer1Y * s - bedroomPartLen * s - 25}
        stroke={C_BEDROOM_PART} strokeWidth={2} markerEnd="url(#arrowBedroom)"/>
      <text x={p + (BEDROOM_PART_LEFT_MM + BEDROOM_PART_T_MM/2) * s + 5} y={p + layer1Y * s - bedroomPartLen * s - 15}
        textAnchor="start" fill={C_BEDROOM_PART} fontSize={7}>к верхней стене</text>

      {/* === ГКЛ сторона коридора (разделён перегородкой спальни) === */}
      {/* Левая часть: от начала стены до перегородки спальни */}
      <rect x={p} y={p + gkl1Y * s} width={BEDROOM_PART_LEFT_MM * s} height={GKL_THICKNESS_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={1}/>
      <SpecLabel x={p + BEDROOM_PART_LEFT_MM/2 * s} y={p + gkl1Y * s - 12} num={4} size={12} fontSize={8} color={C_GKL_PANEL}/>
      {/* Правая часть: от перегородки спальни до конца стены */}
      <rect x={p + BEDROOM_PART_RIGHT_MM * s} y={p + gkl1Y * s} width={(BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM) * s} height={GKL_THICKNESS_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={1}/>
      <SpecLabel x={p + (BEDROOM_PART_RIGHT_MM + (BATH_TOTAL_LEN_MM - BEDROOM_PART_RIGHT_MM)/2) * s} y={p + gkl1Y * s - 12} num={1} size={12} fontSize={8} color={C_GKL_PANEL}/>

      {/* === Дверной проём (заливка под каркасом) === */}
      <rect x={p + BATH_DOOR_START_MM * s} y={p + layer1Y * s} width={DOOR_W_MM * s} height={PARTITION_T_MM * s}
        fill={C_DOOR_OPENING + "22"} stroke="none"/>

      {/* === Каркас слой 1 (сторона коридора) === */}
      {/* До проёма — краевая стойка */}
      <rect x={p} y={p + layer1Y * s} width={PS_W_MM * s} height={GKL_LAYER_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      {/* В проёме — пунктирные линии */}
      <line x1={p + BATH_DOOR_START_MM * s} y1={p + layer1Y * s} x2={p + BATH_DOOR_END_MM * s} y2={p + layer1Y * s}
        stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
      <line x1={p + BATH_DOOR_START_MM * s} y1={p + (layer1Y + GKL_LAYER_MM) * s} x2={p + BATH_DOOR_END_MM * s} y2={p + (layer1Y + GKL_LAYER_MM) * s}
        stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
      {/* После проёма до конца стены */}
      <rect x={p + BATH_DOOR_END_MM * s} y={p + layer1Y * s} width={(BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM) * s} height={GKL_LAYER_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

      {/* === Зазор между слоями (ПН 75) === */}
      {/* До проёма — краевая стойка */}
      <rect x={p} y={p + gapY * s} width={PS_W_MM * s} height={GKL_GAP_MM * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={1.5}/>
      <SpecLabel x={p + PS_W_MM/2 * s} y={p + (gapY + GKL_GAP_MM/2) * s} num={13} size={12} fontSize={8} color={C_BEAM}/>
      {/* В проёме — пунктирные линии */}
      <line x1={p + BATH_DOOR_START_MM * s} y1={p + gapY * s} x2={p + BATH_DOOR_END_MM * s} y2={p + gapY * s}
        stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
      <line x1={p + BATH_DOOR_START_MM * s} y1={p + (gapY + GKL_GAP_MM) * s} x2={p + BATH_DOOR_END_MM * s} y2={p + (gapY + GKL_GAP_MM) * s}
        stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
      {/* После проёма */}
      <rect x={p + BATH_DOOR_END_MM * s} y={p + gapY * s} width={(BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM) * s} height={GKL_GAP_MM * s}
        fill="none" stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (BATH_DOOR_END_MM + (BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM)/2) * s} y={p + (gapY + GKL_GAP_MM/2) * s} num={9} size={12} fontSize={8} color={C_FRAME}/>

      {/* === Каркас слой 2 (сторона ванной) === */}
      {/* До проёма — краевая стойка */}
      <rect x={p} y={p + layer2Y * s} width={PS_W_MM * s} height={GKL_LAYER_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      {/* В проёме — пунктирные линии */}
      <line x1={p + BATH_DOOR_START_MM * s} y1={p + layer2Y * s} x2={p + BATH_DOOR_END_MM * s} y2={p + layer2Y * s}
        stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
      <line x1={p + BATH_DOOR_START_MM * s} y1={p + (layer2Y + GKL_LAYER_MM) * s} x2={p + BATH_DOOR_END_MM * s} y2={p + (layer2Y + GKL_LAYER_MM) * s}
        stroke={C_FRAME} strokeWidth={1} strokeDasharray="4 3"/>
      {/* После проёма */}
      <rect x={p + BATH_DOOR_END_MM * s} y={p + layer2Y * s} width={(BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM) * s} height={GKL_LAYER_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>

      {/* === Стоечные профили ПС в слое 1 (коридор) с номерами === */}
      {STUD_POSITIONS_CORRIDOR.filter(pos => pos < BATH_DOOR_START_MM || pos >= BATH_DOOR_END_MM).map((pos, i) => (
        <g key={`stud-top1-${i}`}>
          <line x1={p + pos * s} y1={p + layer1Y * s} x2={p + pos * s} y2={p + (layer1Y + GKL_LAYER_MM) * s}
            stroke={C_FRAME} strokeWidth={1.5}/>
          <line x1={p + (pos + PS_W_MM) * s} y1={p + layer1Y * s} x2={p + (pos + PS_W_MM) * s} y2={p + (layer1Y + GKL_LAYER_MM) * s}
            stroke={C_FRAME} strokeWidth={1.5}/>
          <StudLabel x={p + (pos + PS_W_MM/2) * s} y={p + layer1Y * s - 10} num={getStudNumberCorridor(pos)} r={8} fontSize={9} color={C_FRAME}/>
          <SpecLabel x={p + (pos + PS_W_MM/2) * s} y={p + layer1Y * s - 30} num={12} size={12} fontSize={8} color={C_FRAME}/>
        </g>
      ))}

      {/* === Стоечные профили ПС в слое 2 (ванная) с номерами === */}
      {STUD_POSITIONS_BATH.filter(pos => pos < BATH_DOOR_START_MM || pos >= BATH_DOOR_END_MM).map((pos, i) => (
        <g key={`stud-top2-${i}`}>
          <line x1={p + pos * s} y1={p + layer2Y * s} x2={p + pos * s} y2={p + (layer2Y + GKL_LAYER_MM) * s}
            stroke={C_FRAME} strokeWidth={1.5}/>
          <line x1={p + (pos + PS_W_MM) * s} y1={p + layer2Y * s} x2={p + (pos + PS_W_MM) * s} y2={p + (layer2Y + GKL_LAYER_MM) * s}
            stroke={C_FRAME} strokeWidth={1.5}/>
          <StudLabel x={p + (pos + PS_W_MM/2) * s} y={p + (layer2Y + GKL_LAYER_MM) * s + 10} num={getStudNumberBath(pos)} r={8} fontSize={9} color={C_FRAME}/>
          <SpecLabel x={p + (pos + PS_W_MM/2) * s} y={p + (layer2Y + GKL_LAYER_MM) * s + 30} num={12} size={12} fontSize={8} color={C_FRAME}/>
        </g>
      ))}

      {/* === ГКЛ сторона ванной — 1-й слой (непрерывно, включая над проёмом) === */}
      <rect x={p} y={p + gkl2Y * s} width={BATH_TOTAL_LEN_MM * s} height={GKL_THICKNESS_MM * s}
        fill={C_GKL_PANEL_FILL} stroke={C_GKL_PANEL} strokeWidth={1}/>
      <SpecLabel x={p + BATH_TOTAL_LEN_MM/4 * s} y={p + (gkl2Y + GKL_THICKNESS_MM) * s + 12} num={1} size={12} fontSize={8} color={C_GKL_PANEL}/>

      {/* === ГКЛ сторона ванной — 2-й слой (горизонтальный) === */}
      <rect x={p} y={p + gkl3Y * s} width={BATH_TOTAL_LEN_MM * s} height={GKL_THICKNESS_MM * s}
        fill={C_GKL_LAYER2_FILL} stroke={C_GKL_LAYER2} strokeWidth={1}/>
      <SpecLabel x={p + BATH_TOTAL_LEN_MM * 3/4 * s} y={p + (gkl3Y + GKL_THICKNESS_MM) * s + 12} num={14} size={12} fontSize={8} color={C_GKL_LAYER2}/>

      {/* === Дверной проём (контур поверх каркаса) === */}
      <rect x={p + BATH_DOOR_START_MM * s} y={p + layer1Y * s} width={DOOR_W_MM * s} height={PARTITION_T_MM * s}
        fill="none" stroke={C_DOOR_OPENING} strokeWidth={2} strokeDasharray="6 3"/>
      <text x={p + (BATH_DOOR_START_MM + DOOR_W_MM/2) * s} y={p + (layer1Y + PARTITION_T_MM/2) * s + 3}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={10} fontWeight="bold">ПРОЁМ {DOOR_W_MM}</text>

      {/* === Размерные линии === */}
      {/* Краевая стойка */}
      <HDim x1={p} x2={p + BATH_DOOR_START_MM * s} y={p + partDepth * s + 20}
        color={C_FRAME} textColor={C_FRAME} label={PS_W_MM} fontSize={8}/>
      {/* Проём */}
      <HDim x1={p + BATH_DOOR_START_MM * s} x2={p + BATH_DOOR_END_MM * s} y={p + partDepth * s + 20}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_W_MM} fontSize={9}/>
      {/* После проёма до конца */}
      <HDim x1={p + BATH_DOOR_END_MM * s} x2={p + BATH_TOTAL_LEN_MM * s} y={p + partDepth * s + 20}
        label={BATH_TOTAL_LEN_MM - BATH_DOOR_END_MM} fontSize={8}/>

      {/* Общая длина */}
      <HDim x1={p} x2={p + BATH_TOTAL_LEN_MM * s} y={p + partDepth * s + 40}
        label={BATH_TOTAL_LEN_MM} fontSize={10}/>

      {/* Толщина перегородки (справа) */}
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 15} y1={p} y2={p + partDepth * s}
        label={partDepth.toFixed(1)} fontSize={9} labelX={p + BATH_TOTAL_LEN_MM * s + 25}/>

      {/* Детализация толщины */}
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 45} y1={p} y2={p + GKL_THICKNESS_MM * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_THICKNESS_MM} fontSize={7} labelX={p + BATH_TOTAL_LEN_MM * s + 55}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 45} y1={p + layer1Y * s} y2={p + gapY * s}
        color={C_FRAME} textColor={C_FRAME} label={GKL_LAYER_MM} fontSize={7} labelX={p + BATH_TOTAL_LEN_MM * s + 55}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 45} y1={p + gapY * s} y2={p + layer2Y * s}
        label={GKL_GAP_MM} fontSize={7} labelX={p + BATH_TOTAL_LEN_MM * s + 55}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 45} y1={p + layer2Y * s} y2={p + gkl2Y * s}
        color={C_FRAME} textColor={C_FRAME} label={GKL_LAYER_MM} fontSize={7} labelX={p + BATH_TOTAL_LEN_MM * s + 55}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 45} y1={p + gkl2Y * s} y2={p + gkl3Y * s}
        color={C_GKL_PANEL} textColor={C_GKL_PANEL} label={GKL_THICKNESS_MM} fontSize={7} labelX={p + BATH_TOTAL_LEN_MM * s + 55}/>
      <VDim x={p + BATH_TOTAL_LEN_MM * s + 45} y1={p + gkl3Y * s} y2={p + partDepth * s}
        color={C_GKL_LAYER2} textColor={C_GKL_LAYER2} label={GKL_THICKNESS_MM} fontSize={7} labelX={p + BATH_TOTAL_LEN_MM * s + 55}/>

      {/* Курсор */}
      <Crosshair mouse={mouse ?? null} area={area} />
    </svg>
  );
}
