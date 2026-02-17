import { HDim, VDim, StudLabel, SpecLabel } from "../svg-primitives";
import {
  CEILING_H_MM, DOOR_W_MM, DOOR_OFFSET_MM, DOOR_H_MM, PANEL_H_MM, PANEL_W_MM,
  LDSP_DOBOR_H_MM, OVER_DOOR_PANEL_H_MM, PN_H_MM, PS_W_MM, BEAM_H_MM,
  BEDROOM_VERT_FULL_LEN_MM, S_FRONT_LDSP, getStudNumberBackLDSP
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_GKL,
  C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_PANEL, C_PANEL_FILL, C_DOBOR, C_DOOR_OPENING
} from "../colors";

export function BackView() {
  const FRONT_W = 1000;
  const FRONT_H = 900;
  const p = 70;
  const s = S_FRONT_LDSP;

  const doorStartMirror = DOOR_OFFSET_MM;
  const doorEndMirror = DOOR_OFFSET_MM + DOOR_W_MM;
  const horizProfileW = PS_W_MM;
  const horizPartitionStart = doorEndMirror;
  const horizPartitionEnd = doorEndMirror + horizProfileW;
  const panelAreaStart = horizPartitionEnd;
  const panelAreaLen = BEDROOM_VERT_FULL_LEN_MM - panelAreaStart;
  const panel1End = panelAreaStart + PANEL_W_MM;
  const remainderW = panelAreaLen - PANEL_W_MM;

  return (
    <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
      style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л3.Сх2 — Внутренний слой, со стороны спальни
      </text>
      <text x={FRONT_W/2} y={42} textAnchor="middle" fill={C_TEXT_DIM} fontSize={10}>
        Короткая перегородка примыкает к этому слою, сдвигая раскладку на {horizProfileW}мм
      </text>

      {/* Контур помещения */}
      <rect x={p} y={p} width={BEDROOM_VERT_FULL_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Направляющие ПН на полу (№9) */}
      <rect x={p} y={p + CEILING_H_MM * s - PN_H_MM * s} width={doorStartMirror * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + doorStartMirror/2 * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={9} color={C_FRAME}/>
      <rect x={p + horizPartitionEnd * s} y={p + CEILING_H_MM * s - PN_H_MM * s} width={panelAreaLen * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (horizPartitionEnd + panelAreaLen/2) * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={9} color={C_FRAME}/>

      {/* Направляющие ПН на потолке (№9) */}
      <rect x={p} y={p} width={BEDROOM_VERT_FULL_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + BEDROOM_VERT_FULL_LEN_MM * s - 30} y={p + PN_H_MM/2 * s} num={9} color={C_FRAME}/>

      {/* Стойка у ванной с брусом (№8) */}
      <rect x={p} y={p + PN_H_MM * s}
        width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={1.5}/>
      <StudLabel x={p + PS_W_MM/2 * s} y={p + CEILING_H_MM/2 * s} num={getStudNumberBackLDSP(0)} color={C_BEAM}/>
      <SpecLabel x={p + PS_W_MM/2 * s} y={p + CEILING_H_MM/2 * s + 40} num={8} color={C_BEAM}/>

      {/* Дверной проём */}
      <rect x={p + doorStartMirror * s} y={p + (CEILING_H_MM - DOOR_H_MM) * s}
        width={DOOR_W_MM * s} height={DOOR_H_MM * s}
        fill={C_DOOR_OPENING + "11"} stroke={C_DOOR_OPENING} strokeWidth={2} strokeDasharray="6 3"/>
      <text x={p + (doorStartMirror + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={12} fontWeight="bold">ПРОЁМ</text>
      <text x={p + (doorStartMirror + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s + 16}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={10}>{DOOR_W_MM}×{DOOR_H_MM}</text>

      {/* Перемычка над дверью (№7) */}
      <rect x={p} y={p + (CEILING_H_MM - DOOR_H_MM - BEAM_H_MM) * s}
        width={horizPartitionEnd * s} height={BEAM_H_MM * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
      <SpecLabel x={p + horizPartitionEnd/2 * s + 60} y={p + (CEILING_H_MM - DOOR_H_MM - BEAM_H_MM/2) * s} num={7} color={C_BEAM}/>

      {/* === Разрез короткой перегородки (50мм) === */}
      <rect x={p + horizPartitionStart * s} y={p} width={horizProfileW * s} height={CEILING_H_MM * s}
        fill={C_GKL + "33"} stroke={C_GKL} strokeWidth={2}/>
      <text x={p + (horizPartitionStart + horizProfileW/2) * s} y={p + CEILING_H_MM/2 * s}
        textAnchor="middle" fill={C_GKL} fontSize={8}
        transform={`rotate(-90,${p + (horizPartitionStart + horizProfileW/2) * s},${p + CEILING_H_MM/2 * s})`}>
        Короткая перегородка (разрез)
      </text>

      {/* Стоечные профили ПС (№11) */}
      <rect x={p + horizPartitionEnd * s} y={p + PN_H_MM * s}
        width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <StudLabel x={p + (horizPartitionEnd + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s} num={getStudNumberBackLDSP(1)} color={C_FRAME}/>
      <SpecLabel x={p + (horizPartitionEnd + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 40} num={11} color={C_FRAME}/>

      <rect x={p + (panel1End - PS_W_MM/2) * s} y={p + PN_H_MM * s}
        width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <StudLabel x={p + panel1End * s} y={p + CEILING_H_MM/2 * s} num={getStudNumberBackLDSP(2)} color={C_FRAME}/>
      <SpecLabel x={p + panel1End * s} y={p + CEILING_H_MM/2 * s + 40} num={11} color={C_FRAME}/>

      <rect x={p + (BEDROOM_VERT_FULL_LEN_MM - PS_W_MM) * s} y={p + PN_H_MM * s}
        width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <StudLabel x={p + (BEDROOM_VERT_FULL_LEN_MM - PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s} num={getStudNumberBackLDSP(3)} color={C_FRAME}/>
      <SpecLabel x={p + (BEDROOM_VERT_FULL_LEN_MM - PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 40} num={11} color={C_FRAME}/>

      {/* ЛДСП панели */}
      <rect x={p + panelAreaStart * s} y={p}
        width={PANEL_W_MM * s} height={PANEL_H_MM * s}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
      <text x={p + (panelAreaStart + PANEL_W_MM/2) * s} y={p + PANEL_H_MM/2 * s}
        textAnchor="middle" fill={C_PANEL} fontSize={9}>ЛДСП {PANEL_W_MM}×{PANEL_H_MM}</text>
      <SpecLabel x={p + (panelAreaStart + PANEL_W_MM - 30) * s} y={p + 30} num={1} color={C_PANEL}/>

      <rect x={p + panel1End * s} y={p}
        width={remainderW * s} height={PANEL_H_MM * s}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
      <text x={p + (panel1End + remainderW/2) * s} y={p + PANEL_H_MM/2 * s}
        textAnchor="middle" fill={C_PANEL} fontSize={9}>ЛДСП {remainderW}×{PANEL_H_MM}</text>
      <SpecLabel x={p + (panel1End + remainderW - 30) * s} y={p + 30} num={1} color={C_PANEL}/>

      {/* Доборка снизу (№6) */}
      <rect x={p + panelAreaStart * s} y={p + PANEL_H_MM * s} width={panelAreaLen * s} height={LDSP_DOBOR_H_MM * s}
        fill="none" stroke={C_DOBOR} strokeWidth={1} strokeDasharray="3 2"/>
      <SpecLabel x={p + (panelAreaStart + panelAreaLen/2) * s} y={p + (PANEL_H_MM + LDSP_DOBOR_H_MM/2) * s} num={6} color={C_DOBOR}/>

      {/* Панель над дверью (№2) */}
      <rect x={p + doorStartMirror * s} y={p}
        width={DOOR_W_MM * s} height={OVER_DOOR_PANEL_H_MM * s}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
      <text x={p + (doorStartMirror + DOOR_W_MM/2) * s} y={p + OVER_DOOR_PANEL_H_MM/2 * s}
        textAnchor="middle" fill={C_PANEL} fontSize={8}>ЛДСП {DOOR_W_MM}×{OVER_DOOR_PANEL_H_MM}</text>
      <SpecLabel x={p + (doorStartMirror + DOOR_W_MM - 30) * s} y={p + 30} num={2} color={C_PANEL}/>

      {/* Панель у ванной — доборка (№5) */}
      <rect x={p} y={p}
        width={doorStartMirror * s} height={PANEL_H_MM * s}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={1} strokeDasharray="4 2"/>
      <text x={p + doorStartMirror/2 * s} y={p + PANEL_H_MM/2 * s}
        textAnchor="middle" fill={C_PANEL} fontSize={7}>{doorStartMirror}</text>
      <SpecLabel x={p + doorStartMirror/2 * s} y={p + 30} num={5} color={C_PANEL}/>

      {/* === Размерные линии === */}
      <HDim x1={p} x2={p + doorStartMirror * s} y={p + CEILING_H_MM * s + 20} label={DOOR_OFFSET_MM} fontSize={8}/>
      <HDim x1={p + doorStartMirror * s} x2={p + doorEndMirror * s} y={p + CEILING_H_MM * s + 20}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_W_MM} fontSize={9}/>
      <HDim x1={p + horizPartitionStart * s} x2={p + horizPartitionEnd * s} y={p + CEILING_H_MM * s + 20}
        color={C_GKL} textColor={C_GKL} label={horizProfileW} fontSize={8}/>
      <HDim x1={p + panelAreaStart * s} x2={p + panel1End * s} y={p + CEILING_H_MM * s + 20} label={PANEL_W_MM} fontSize={9}/>
      <HDim x1={p + panel1End * s} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y={p + CEILING_H_MM * s + 20} label={remainderW} fontSize={8}/>

      <HDim x1={p + panelAreaStart * s} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y={p + CEILING_H_MM * s + 40} label={panelAreaLen} fontSize={9}/>
      <HDim x1={p} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y={p + CEILING_H_MM * s + 60} label={BEDROOM_VERT_FULL_LEN_MM} fontSize={10}/>

      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>
      <VDim x={p + (doorStartMirror + DOOR_W_MM - 30) * s} y1={p + (CEILING_H_MM - DOOR_H_MM) * s} y2={p + CEILING_H_MM * s}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_H_MM} fontSize={9}/>
      <VDim x={p + BEDROOM_VERT_FULL_LEN_MM * s + 15} y1={p} y2={p + PANEL_H_MM * s}
        color={C_PANEL} textColor={C_PANEL} label={PANEL_H_MM} fontSize={8} labelX={p + BEDROOM_VERT_FULL_LEN_MM * s + 20}/>
      <VDim x={p + BEDROOM_VERT_FULL_LEN_MM * s + 15} y1={p + PANEL_H_MM * s} y2={p + CEILING_H_MM * s}
        color={C_DOBOR} textColor={C_DOBOR} label={LDSP_DOBOR_H_MM} fontSize={8} labelX={p + BEDROOM_VERT_FULL_LEN_MM * s + 20}/>

      {/* Подписи направлений */}
      <text x={p - 25} y={p + CEILING_H_MM/3 * s} textAnchor="end" fill={C_TEXT_DIM} fontSize={8}>
        ← Ванная
      </text>
      <text x={p + BEDROOM_VERT_FULL_LEN_MM * s + 30} y={p + CEILING_H_MM/3 * s} textAnchor="start" fill={C_TEXT_DIM} fontSize={8}>
        Внешняя стена →
      </text>

    </svg>
  );
}
