import { useState } from "react";
import { HDim, VDim, StudLabel, SpecLabel } from "../svg-primitives";
import {
  CEILING_H_MM, DOOR_W_MM, DOOR_OFFSET_MM, PANEL_H_MM, PANEL_W_MM, PANEL_T_MM,
  LDSP_DOBOR_H_MM, OVER_DOOR_PANEL_H_MM, PN_H_MM, PS_W_MM, BEAM_W_MM, BEAM_H_MM,
  BEDROOM_VERT_FULL_LEN_MM, DOOR_H_MM, S_FRONT_LDSP,
  STUD_POSITIONS_FRONT_LDSP, getStudNumberFrontLDSP
} from "../constants";
import {
  C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_TOOLTIP_BG, C_DIM, C_GKL,
  C_FRAME, C_FRAME_FILL, C_BEAM, C_BEAM_FILL, C_PANEL, C_PANEL_FILL, C_DOBOR, C_DOOR_OPENING
} from "../colors";

interface FrontViewProps {
  onMouseMove?: (pos: {x: number, y: number} | null) => void;
  mouse?: {x: number, y: number, view: string} | null;
}

export function FrontView({ onMouseMove, mouse }: FrontViewProps) {
  const FRONT_W = 1000;
  const FRONT_H = 900;
  const p = 70;
  const s = S_FRONT_LDSP;

  const GAP_LEFT = BEDROOM_VERT_FULL_LEN_MM - DOOR_OFFSET_MM - DOOR_W_MM - PANEL_W_MM * 2;
  const stud1 = GAP_LEFT;
  const stud2 = GAP_LEFT + PANEL_W_MM;
  const doorStart = GAP_LEFT + PANEL_W_MM * 2;
  const doorEnd = BEDROOM_VERT_FULL_LEN_MM - DOOR_OFFSET_MM;

  return (
    <svg viewBox={`0 0 ${FRONT_W} ${FRONT_H}`}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        const scale = FRONT_W / r.width;
        const x = (e.clientX - r.left) * scale - p;
        const y = (e.clientY - r.top) * scale - p;
        if (x >= 0 && x <= BEDROOM_VERT_FULL_LEN_MM * s && y >= 0 && y <= CEILING_H_MM * s) {
          onMouseMove?.({ x: x / s, y: CEILING_H_MM - y / s });
        } else {
          onMouseMove?.(null);
        }
      }}
      onMouseLeave={() => onMouseMove?.(null)}
      style={{ width: FRONT_W, background: C_BG_SVG, borderRadius: 8 }}>

      <text x={FRONT_W/2} y={24} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={14} fontWeight="bold">
        Л3.Сх1 — Внешний слой, со стороны лестницы
      </text>

      {/* Контур помещения */}
      <rect x={p} y={p} width={BEDROOM_VERT_FULL_LEN_MM * s} height={CEILING_H_MM * s}
        fill="none" stroke={C_TEXT_DIM} strokeWidth={1} strokeDasharray="4 2"/>

      {/* Пол и потолок */}
      <line x1={p} y1={p + CEILING_H_MM * s} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y2={p + CEILING_H_MM * s}
        stroke={C_TEXT} strokeWidth={2}/>
      <line x1={p} y1={p} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y2={p}
        stroke={C_TEXT} strokeWidth={2}/>

      {/* Направляющие профили ПН на полу (№9) */}
      <rect x={p} y={p + CEILING_H_MM * s - PN_H_MM * s} width={doorStart * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + doorStart/2 * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={9} color={C_FRAME}/>
      <rect x={p + doorEnd * s} y={p + CEILING_H_MM * s - PN_H_MM * s} width={(BEDROOM_VERT_FULL_LEN_MM - doorEnd) * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + (doorEnd + (BEDROOM_VERT_FULL_LEN_MM - doorEnd)/2) * s} y={p + CEILING_H_MM * s - PN_H_MM/2 * s} num={9} color={C_FRAME}/>

      {/* Направляющие профили ПН на потолке (№9) */}
      <rect x={p} y={p} width={BEDROOM_VERT_FULL_LEN_MM * s} height={PN_H_MM * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <SpecLabel x={p + BEDROOM_VERT_FULL_LEN_MM * s - 30} y={p + PN_H_MM/2 * s} num={9} color={C_FRAME}/>

      {/* Стоечные профили ПС (№11) */}
      {/* Стойка у стены (0) */}
      <rect x={p} y={p + PN_H_MM * s}
        width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <StudLabel x={p + PS_W_MM/2 * s} y={p + CEILING_H_MM/2 * s} num={getStudNumberFrontLDSP(0)} color={C_FRAME}/>
      <SpecLabel x={p + PS_W_MM/2 * s} y={p + CEILING_H_MM/2 * s + 40} num={11} color={C_FRAME}/>

      {/* Стойки под панели (центрированы) */}
      {[stud1, stud2].map((pos, i) => (
        <g key={`stud${i}`}>
          <rect x={p + pos * s - PS_W_MM/2 * s} y={p + PN_H_MM * s}
            width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
            fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
          <StudLabel x={p + pos * s} y={p + CEILING_H_MM/2 * s} num={getStudNumberFrontLDSP(i + 1)} color={C_FRAME}/>
          <SpecLabel x={p + pos * s} y={p + CEILING_H_MM/2 * s + 40} num={11} color={C_FRAME}/>
        </g>
      ))}

      {/* Стойка у начала проёма */}
      <rect x={p + (doorStart - PS_W_MM) * s} y={p + PN_H_MM * s}
        width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
        fill={C_FRAME_FILL} stroke={C_FRAME} strokeWidth={1}/>
      <StudLabel x={p + (doorStart - PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s} num={getStudNumberFrontLDSP(3)} color={C_FRAME}/>
      <SpecLabel x={p + (doorStart - PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 40} num={11} color={C_FRAME}/>

      {/* Стойка у ванной с брусом (№8) */}
      <rect x={p + doorEnd * s} y={p + PN_H_MM * s}
        width={PS_W_MM * s} height={(CEILING_H_MM - PN_H_MM * 2) * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={1.5}/>
      <text x={p + (doorEnd + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s - 50}
        textAnchor="middle" fill={C_BEAM} fontSize={7}
        transform={`rotate(-90,${p + (doorEnd + PS_W_MM/2) * s},${p + CEILING_H_MM/2 * s - 50})`}>брус {BEAM_W_MM}×{BEAM_H_MM}</text>
      <StudLabel x={p + (doorEnd + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 60} num={getStudNumberFrontLDSP(4)} color={C_BEAM}/>
      <SpecLabel x={p + (doorEnd + PS_W_MM/2) * s} y={p + CEILING_H_MM/2 * s + 100} num={8} color={C_BEAM}/>

      {/* Перемычка над дверью — деревянный брус 50×70 (№7) */}
      <rect x={p} y={p + (CEILING_H_MM - DOOR_H_MM - BEAM_H_MM) * s}
        width={doorEnd * s} height={BEAM_H_MM * s}
        fill={C_BEAM_FILL} stroke={C_BEAM} strokeWidth={2}/>
      <text x={p + doorEnd/2 * s} y={p + (CEILING_H_MM - DOOR_H_MM - BEAM_H_MM/2) * s + 3}
        textAnchor="middle" fill={C_BEAM} fontSize={8}>брус {doorEnd}×{BEAM_H_MM}×{BEAM_W_MM}</text>
      <SpecLabel x={p + doorEnd/2 * s + 100} y={p + (CEILING_H_MM - DOOR_H_MM - BEAM_H_MM/2) * s} num={7} color={C_BEAM}/>

      {/* Дверной проём */}
      <rect x={p + doorStart * s} y={p + (CEILING_H_MM - DOOR_H_MM) * s}
        width={DOOR_W_MM * s} height={DOOR_H_MM * s}
        fill={C_DOOR_OPENING + "11"} stroke={C_DOOR_OPENING} strokeWidth={2} strokeDasharray="6 3"/>
      <text x={p + (doorStart + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={12} fontWeight="bold">ПРОЁМ</text>
      <text x={p + (doorStart + DOOR_W_MM/2) * s} y={p + (CEILING_H_MM - DOOR_H_MM/2) * s + 16}
        textAnchor="middle" fill={C_DOOR_OPENING} fontSize={10}>{DOOR_W_MM}×{DOOR_H_MM}</text>

      {/* ЛДСП панели до проёма (№1) — вплотную к потолку */}
      <rect x={p + stud1 * s} y={p}
        width={PANEL_W_MM * s} height={PANEL_H_MM * s}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
      <text x={p + (stud1 + PANEL_W_MM/2) * s} y={p + PANEL_H_MM/2 * s}
        textAnchor="middle" fill={C_PANEL} fontSize={9}>ЛДСП {PANEL_W_MM}×{PANEL_H_MM}×{PANEL_T_MM}</text>
      <SpecLabel x={p + (stud1 + PANEL_W_MM - 20) * s} y={p + 30} num={1} color={C_PANEL}/>

      <rect x={p + stud2 * s} y={p}
        width={PANEL_W_MM * s} height={PANEL_H_MM * s}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
      <text x={p + (stud2 + PANEL_W_MM/2) * s} y={p + PANEL_H_MM/2 * s}
        textAnchor="middle" fill={C_PANEL} fontSize={9}>ЛДСП {PANEL_W_MM}×{PANEL_H_MM}×{PANEL_T_MM}</text>
      <SpecLabel x={p + (stud2 + PANEL_W_MM - 20) * s} y={p + 30} num={1} color={C_PANEL}/>

      {/* Доборные планки снизу (№6) */}
      <rect x={p + stud1 * s} y={p + PANEL_H_MM * s}
        width={PANEL_W_MM * 2 * s} height={LDSP_DOBOR_H_MM * s}
        fill="none" stroke={C_DOBOR} strokeWidth={1} strokeDasharray="3 2"/>
      <text x={p + (stud1 + PANEL_W_MM) * s} y={p + (PANEL_H_MM + LDSP_DOBOR_H_MM/2) * s + 3}
        textAnchor="middle" fill={C_DOBOR} fontSize={8}>доборка {LDSP_DOBOR_H_MM}</text>
      <SpecLabel x={p + (stud1 + PANEL_W_MM) * s + 50} y={p + (PANEL_H_MM + LDSP_DOBOR_H_MM/2) * s} num={6} color={C_DOBOR}/>

      {/* Панель над дверью (№2) */}
      <rect x={p + doorStart * s} y={p}
        width={DOOR_W_MM * s} height={OVER_DOOR_PANEL_H_MM * s}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={2}/>
      <text x={p + (doorStart + DOOR_W_MM/2) * s} y={p + OVER_DOOR_PANEL_H_MM/2 * s}
        textAnchor="middle" fill={C_PANEL} fontSize={8}>ЛДСП {DOOR_W_MM}×{OVER_DOOR_PANEL_H_MM}</text>
      <SpecLabel x={p + (doorStart + DOOR_W_MM - 30) * s} y={p + 30} num={2} color={C_PANEL}/>

      {/* Панель после проёма — доборка (№5) */}
      <rect x={p + doorEnd * s} y={p}
        width={(BEDROOM_VERT_FULL_LEN_MM - doorEnd) * s} height={PANEL_H_MM * s}
        fill={C_PANEL_FILL} stroke={C_PANEL} strokeWidth={1} strokeDasharray="4 2"/>
      <text x={p + (doorEnd + (BEDROOM_VERT_FULL_LEN_MM - doorEnd)/2) * s} y={p + PANEL_H_MM/2 * s}
        textAnchor="middle" fill={C_PANEL} fontSize={7}>{BEDROOM_VERT_FULL_LEN_MM - doorEnd}</text>
      <SpecLabel x={p + (doorEnd + 15) * s} y={p + 30} num={5} color={C_PANEL}/>

      {/* Размерные линии */}
      <HDim x1={p} x2={p + GAP_LEFT * s} y={p + CEILING_H_MM * s + 20} label={GAP_LEFT} fontSize={8}/>
      <HDim x1={p + stud1 * s} x2={p + stud2 * s} y={p + CEILING_H_MM * s + 20} label={PANEL_W_MM} fontSize={9}/>
      <HDim x1={p + stud2 * s} x2={p + doorStart * s} y={p + CEILING_H_MM * s + 20} label={PANEL_W_MM} fontSize={9}/>
      <HDim x1={p + doorStart * s} x2={p + doorEnd * s} y={p + CEILING_H_MM * s + 20}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_W_MM} fontSize={9}/>
      <HDim x1={p + doorEnd * s} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y={p + CEILING_H_MM * s + 20} label={DOOR_OFFSET_MM} fontSize={9}/>

      <HDim x1={p} x2={p + doorStart * s} y={p + CEILING_H_MM * s + 40}
        color={C_GKL} textColor={C_GKL} label={doorStart} fontSize={9}/>
      <HDim x1={p} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y={p + CEILING_H_MM * s + 60} label={BEDROOM_VERT_FULL_LEN_MM} fontSize={10}/>

      <VDim x={p - 15} y1={p} y2={p + CEILING_H_MM * s} label={CEILING_H_MM} fontSize={9}/>
      <VDim x={p + (doorStart + 30) * s} y1={p + (CEILING_H_MM - DOOR_H_MM) * s} y2={p + CEILING_H_MM * s}
        color={C_DOOR_OPENING} textColor={C_DOOR_OPENING} label={DOOR_H_MM} fontSize={9} labelX={p + (doorStart + 35) * s}/>
      <VDim x={p + (doorStart + 70) * s} y1={p} y2={p + OVER_DOOR_PANEL_H_MM * s}
        color={C_PANEL} textColor={C_PANEL} label={OVER_DOOR_PANEL_H_MM} fontSize={8} labelX={p + (doorStart + 75) * s}/>
      <VDim x={p + BEDROOM_VERT_FULL_LEN_MM * s + 15} y1={p} y2={p + PANEL_H_MM * s}
        color={C_PANEL} textColor={C_PANEL} label={PANEL_H_MM} fontSize={8} labelX={p + BEDROOM_VERT_FULL_LEN_MM * s + 20}/>
      <VDim x={p + BEDROOM_VERT_FULL_LEN_MM * s + 15} y1={p + PANEL_H_MM * s} y2={p + CEILING_H_MM * s}
        color={C_DOBOR} textColor={C_DOBOR} label={LDSP_DOBOR_H_MM} fontSize={8} labelX={p + BEDROOM_VERT_FULL_LEN_MM * s + 20}/>

      {/* Курсор */}
      {mouse && mouse.view === 'front' && <>
        <line x1={p + mouse.x * s} y1={p} x2={p + mouse.x * s} y2={p + CEILING_H_MM * s}
          stroke={C_DIM + "44"} strokeDasharray="4"/>
        <line x1={p} y1={p + (CEILING_H_MM - mouse.y) * s} x2={p + BEDROOM_VERT_FULL_LEN_MM * s} y2={p + (CEILING_H_MM - mouse.y) * s}
          stroke={C_DIM + "44"} strokeDasharray="4"/>
        <rect x={p + mouse.x * s + 10} y={p + (CEILING_H_MM - mouse.y) * s - 26} width={90} height={22} rx={4} fill={C_TOOLTIP_BG}/>
        <text x={p + mouse.x * s + 14} y={p + (CEILING_H_MM - mouse.y) * s - 10} fill={C_DIM} fontSize={11}>
          {mouse.x.toFixed(0)}×{mouse.y.toFixed(0)}
        </text>
      </>}

    </svg>
  );
}
