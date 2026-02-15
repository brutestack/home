import { useState } from "react";
import { Sofa, Bed, Wardrobe, Vanity, Chair, Bathtub, SinkCabinet, Toilet } from "./furniture";
import {
  rgba,
  C_BG, C_BG_SVG, C_ROOM, C_PROEM, C_PLAT1, C_PLAT2, C_GRID,
  C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_TOOLTIP_BG,
  C_STEP, C_STEP_LIGHT, C_STEP_MID, C_STEP_DIM, C_STEP_FAINT, C_STEP_TEXT, C_STEP_FILL,
  C_EXIT, C_EXIT_FAINT, C_ENTER, C_CRITICAL,
  C_DIM, C_DIM_TRANS,
  C_WALL, C_WALL_BORDER, C_COLUMN, C_COLUMN_BORDER,
  C_GKL, C_GKL_BORDER, C_GKL_TEXT,
  C_PIPES, C_PIPES_FILL,
  C_BATH, C_BATH_TRANS, C_BEDROOM
} from "./colors";
import {
  S, W, H, CW, CH, PAD, OWALL_PX, WIN_FRAME_PX,
  IWALL_X, IWALL_LEN, IWALL_T,
  COL_DIST, COL_W, COL_H, COL2_W, COL2_H,
  GKL_LAYER, GKL_GAP, GKL_T, GKL2_T, GKL3_LAYER, GKL3_GAP,
  DOOR_W, DOOR_OFFSET,
  WIN_X, WIN_W, WIN2_X, WIN2_W, WIN3_START, WIN3_W, WIN4_START, WIN4_W,
  WIN5_START, WIN5_W, WIN6_START, WIN6_W, DOOR3_HINGE, DOOR3_LEN,
  PROEM_X, PROEM_Y, PROEM_W, PROEM_H, PIPES_START, PIPES_END,
  SOFA_L, SOFA_S, SOFA_D, SOFA_GAP_BOT, SOFA_X,
  BED_L, BED_W, BED_GAP_TOP, BED_GAP_RIGHT,
  WARDROBE_D, WARDROBE_X, WARDROBE_Y, WARDROBE_L,
  VANITY_W, VANITY_D, VANITY_GAP, VANITY_X,
  CHAIR_W, CHAIR_D, CHAIR_X, CHAIR_Y, HDOOR_X,
  BATH_L, BATH_W, BATH_GAP, WC_L, WC_W, WC_TANK, WC_GAP_LEFT, WC_RIGHT,
  SINK_SIZE, SINK_GAP,
  PLAT_X, PLAT_W, MARCH_W, M1_STEPS, M2_STEPS, DOBOR_TREAD,
  M1_LEN, M2_LEN, M2_FULL, MX, R
} from "./constants";

export default function FloorPlan(){
  const [mouse,setMouse]=useState(null);
  const p=PAD,s=S;
  const pr=R(PROEM_X,PROEM_Y,PROEM_W,PROEM_H,s,p);
  const pl1=R(PLAT_X,0.15,PLAT_W,MARCH_W,s,p);
  const pl2=R(PLAT_X,0.15+MARCH_W,PLAT_W,MARCH_W,s,p);
  const m1=R(MX,0.15,M1_LEN,MARCH_W,s,p);
  const m2=R(MX,0.15+MARCH_W,M2_FULL,MARCH_W,s,p);
  const midY=pl1.b;
  const doborX=p+(MX+M2_LEN)*s,doborW=DOBOR_TREAD*s;
  return(
    <div style={{background:C_BG,minHeight:"100vh",padding:20,fontFamily:"sans-serif",color:C_TEXT}}>
      <h2 style={{textAlign:"center",color:C_COLUMN_TEXT,margin:"0 0 4px"}}>План 2-го этажа</h2>
      <p style={{textAlign:"center",color:C_TEXT_DIM,margin:"0 0 16px",fontSize:14}}>{W*1000}×{H*1000} мм | Высота: 2800 мм | Площадь: {(W*H).toFixed(1)} м² | <span style={{color:C_DIM}}>все размеры в мм</span></p>
      <div style={{display:"flex",justifyContent:"center"}}>
        <svg viewBox={`0 0 ${CW+p*2+OWALL_PX} ${CH+p*2+OWALL_PX}`}
          onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();const scale=(CW+p*2+OWALL_PX)/r.width;const x=(e.clientX-r.left)*scale,y=(e.clientY-r.top)*scale;if(x>=p&&x<=p+CW&&y>=p&&y<=p+CH)setMouse({x,y});else setMouse(null);}}
          onMouseLeave={()=>setMouse(null)}
          style={{width:1000,height:"auto",background:C_BG_SVG,borderRadius:8}}>
          {Array.from({length:Math.floor(W)+1},(_,i)=><line key={`gv${i}`} x1={p+i*s} y1={p} x2={p+i*s} y2={p+CH} stroke={C_GRID}/>)}
          {Array.from({length:Math.floor(H)+1},(_,i)=><line key={`gh${i}`} x1={p} y1={p+i*s} x2={p+CW} y2={p+i*s} stroke={C_GRID}/>)}
          <rect x={p} y={p} width={CW} height={CH} fill={C_ROOM}/>
          <rect x={pr.x} y={pr.y} width={pr.w} height={pr.h} fill={C_PROEM} stroke={C_STEP} strokeWidth={2} strokeDasharray="6 3"/>
          <rect x={pl1.x} y={pl1.y} width={pl1.w} height={pl1.h} fill={C_PLAT1} stroke={C_STEP_LIGHT}/>
          <rect x={pl2.x} y={pl2.y} width={pl2.w} height={pl2.h} fill={C_PLAT2} stroke={C_STEP_MID}/>
          <text x={pl1.x+pl1.w/2} y={pl1.y+pl1.h/2} textAnchor="middle" dominantBaseline="middle" fill={C_STEP} fontSize={7} transform={`rotate(-90,${pl1.x+pl1.w/2},${pl1.y+pl1.h/2})`}>площ.▽</text>
          <text x={pl2.x+pl2.w/2} y={pl2.y+pl2.h/2} textAnchor="middle" dominantBaseline="middle" fill={C_STEP} fontSize={7} transform={`rotate(-90,${pl2.x+pl2.w/2},${pl2.y+pl2.h/2})`}>площ.△</text>
          <path d={`M${pl1.x+pl1.w*.7},${pl1.y+pl1.h*.3} C${pl1.x+pl1.w*.15},${pl1.y+pl1.h*.3} ${pl2.x+pl2.w*.15},${pl2.y+pl2.h*.7} ${pl2.x+pl2.w*.7},${pl2.y+pl2.h*.7}`} fill="none" stroke={C_STEP_MID} strokeWidth={1.5} markerEnd="url(#aF)"/>
          <line x1={m1.x} y1={midY} x2={m2.r} y2={midY} stroke={C_STEP_FAINT} strokeDasharray="3"/>
          {Array.from({length:M1_STEPS},(_,i)=>{const sw=m1.w/M1_STEPS;return <rect key={`s1${i}`} x={m1.x+(M1_STEPS-1-i)*sw} y={m1.y} width={sw-1} height={m1.h} fill={rgba(C_STEP,.05+i*.03)} stroke={C_STEP_FILL} strokeWidth={.5}/>;})}
          <line x1={m1.r-8} y1={m1.y+m1.h/2} x2={m1.x+12} y2={m1.y+m1.h/2} stroke={C_STEP} strokeWidth={1.5} markerEnd="url(#aF)"/>
          <text x={m1.x+m1.w/2} y={m1.y+m1.h/2-8} textAnchor="middle" fill={C_STEP_TEXT} fontSize={8}>м1 ({M1_STEPS}ст.)</text>
          {Array.from({length:M2_STEPS},(_,i)=>{const sw=M2_LEN*s/M2_STEPS;const bx=p+MX*s;return <rect key={`s2${i}`} x={bx+i*sw} y={m2.y} width={sw-1} height={m2.h} fill={rgba(C_STEP,.05+i*.022)} stroke={C_STEP_FILL} strokeWidth={.5}/>;})}
          <rect x={doborX} y={m2.y} width={doborW-1} height={m2.h} fill={C_EXIT_FAINT} stroke={C_EXIT} strokeWidth={1.5}/>
          <text x={doborX+doborW/2} y={m2.y+m2.h/2+3} textAnchor="middle" fill={C_EXIT} fontSize={7} fontWeight="bold">доб.</text>
          <line x1={m2.x+8} y1={m2.y+m2.h/2} x2={m2.r-12} y2={m2.y+m2.h/2} stroke={C_STEP} strokeWidth={1.5} markerEnd="url(#aF)"/>
          <text x={m2.x+m2.w/2} y={m2.y+m2.h/2-8} textAnchor="middle" fill={C_STEP_TEXT} fontSize={8}>м2 ({M2_STEPS}+1доб.)</text>
          <line x1={p+0.05*s} y1={pr.y} x2={p+0.05*s} y2={pr.b} stroke={C_CRITICAL+"88"} strokeWidth={1} strokeDasharray="4 3"/>
          <line x1={m1.r} y1={m1.y+3} x2={m1.r} y2={m1.b-3} stroke={C_ENTER} strokeWidth={3}/>
          <text x={m1.r+6} y={m1.y+m1.h/2+4} fill={C_ENTER} fontSize={10} fontWeight="bold">вход (1эт)</text>
          <line x1={m2.r} y1={m2.y+3} x2={m2.r} y2={m2.b-3} stroke={C_EXIT} strokeWidth={3}/>
          <text x={m2.r+6} y={m2.y+m2.h/2+4} fill={C_EXIT} fontSize={10} fontWeight="bold">выход (2эт)</text>
          <line x1={pr.x} y1={pr.b+14} x2={pr.r} y2={pr.b+14} stroke={C_STEP_DIM}/>
          <text x={pr.x+pr.w/2} y={pr.b+28} textAnchor="middle" fill={C_STEP} fontSize={10}>{PROEM_W*1000}</text>
          <line x1={pr.r+16} y1={pr.y} x2={pr.r+16} y2={pr.b} stroke={C_STEP_DIM}/>
          <text x={pr.r+20} y={pr.y+pr.h/2+4} fill={C_STEP} fontSize={10}>{PROEM_H*1000}</text>
          <line x1={p-12} y1={p} x2={p-12} y2={p+PROEM_Y*s} stroke={C_STEP_DIM}/>
          <text x={p-16} y={p+PROEM_Y*s/2+3} textAnchor="end" fill={C_STEP_TEXT} fontSize={9}>{PROEM_Y*1000}</text>
          {/* Внешние стены толщиной 250мм (снаружи от внутреннего пространства) */}
          {/* Верхняя стена — с разрывом для окна */}
          <rect x={p-OWALL_PX} y={p-OWALL_PX} width={WIN_X*s+OWALL_PX} height={OWALL_PX} fill={C_WALL}/>
          <rect x={p+(WIN_X+WIN_W)*s} y={p-OWALL_PX} width={CW-(WIN_X+WIN_W)*s+OWALL_PX} height={OWALL_PX} fill={C_WALL}/>
          {/* Нижняя стена — с разрывом для окна ванной */}
          <rect x={p-OWALL_PX} y={p+CH} width={WIN2_X*s+OWALL_PX} height={OWALL_PX} fill={C_WALL}/>
          <rect x={p+(WIN2_X+WIN2_W)*s} y={p+CH} width={CW-(WIN2_X+WIN2_W)*s+OWALL_PX} height={OWALL_PX} fill={C_WALL}/>
          {/* Левая стена — с разрывами для форточки и окна */}
          {/* Часть выше форточки */}
          <rect x={p-OWALL_PX} y={p-OWALL_PX} width={OWALL_PX} height={WIN6_START*s+OWALL_PX} fill={C_WALL}/>
          {/* Часть между форточкой и окном */}
          <rect x={p-OWALL_PX} y={p+(WIN6_START+WIN6_W)*s} width={OWALL_PX} height={(H-WIN5_START-WIN5_W-WIN6_START-WIN6_W)*s} fill={C_WALL}/>
          {/* Часть ниже окна */}
          <rect x={p-OWALL_PX} y={p+(H-WIN5_START)*s} width={OWALL_PX} height={WIN5_START*s+OWALL_PX} fill={C_WALL}/>
          {/* Правая стена — с разрывами для верхнего окна и балконной двери */}
          {/* Часть выше верхнего окна */}
          <rect x={p+CW} y={p-OWALL_PX} width={OWALL_PX} height={WIN4_START*s+OWALL_PX} fill={C_WALL}/>
          {/* Часть между верхним окном и балконной дверью */}
          <rect x={p+CW} y={p+(WIN4_START+WIN4_W)*s} width={OWALL_PX} height={(H-WIN3_START-WIN3_W-WIN4_START-WIN4_W)*s} fill={C_WALL}/>
          {/* Часть ниже балконной двери */}
          <rect x={p+CW} y={p+(H-WIN3_START)*s} width={OWALL_PX} height={WIN3_START*s+OWALL_PX} fill={C_WALL}/>
          {/* Внутренняя граница стен */}
          <rect x={p} y={p} width={CW} height={CH} fill="none" stroke={C_WALL_BORDER} strokeWidth={1}/>
          {/* Зона проводки/труб на верхней стене (внутри помещения, 100мм вниз) */}
          <rect x={p+PIPES_START*s} y={p} width={(PIPES_END-PIPES_START)*s} height={0.1*s} fill={C_PIPES_FILL} stroke={C_PIPES} strokeWidth={1}/>
          <text x={p+(PIPES_START+PIPES_END)/2*s} y={p+0.1*s+10} textAnchor="middle" fill={C_PIPES} fontSize={7}>проводка/</text>
          <text x={p+(PIPES_START+PIPES_END)/2*s} y={p+0.1*s+18} textAnchor="middle" fill={C_PIPES} fontSize={7}>трубы</text>
          {/* Окно на верхней стене (рама 70мм у внешнего края) */}
          <rect x={p+WIN_X*s} y={p-OWALL_PX} width={WIN_W*s} height={WIN_FRAME_PX} fill={C_DIM} stroke={C_DIM} strokeWidth={1}/>
          <line x1={p+WIN_X*s} y1={p} x2={p+(WIN_X+WIN_W)*s} y2={p} stroke={C_BG} strokeWidth={2}/>
          <text x={p+(WIN_X+WIN_W/2)*s} y={p-OWALL_PX-4} textAnchor="middle" fill={C_DIM} fontSize={8}>окно {WIN_W*1000}</text>
          {/* Угловой диван в правом нижнем углу */}
          <Sofa p={p} s={s} x={SOFA_X} y={H-SOFA_GAP_BOT-SOFA_S} length={SOFA_L} shortSide={SOFA_S} depth={SOFA_D} H={H} gapBot={SOFA_GAP_BOT}/>
          {/* Двухспальная кровать перпендикулярно верхней стене */}
          <Bed p={p} s={s} x={W-BED_GAP_RIGHT-BED_W} y={BED_GAP_TOP} width={BED_W} length={BED_L} W={W} gapRight={BED_GAP_RIGHT}/>
          {/* Шкаф вдоль двойной вертикальной перегородки */}
          <Wardrobe p={p} s={s} x={WARDROBE_X} y={WARDROBE_Y} depth={WARDROBE_D} length={WARDROBE_L}/>
          {/* Туалетный столик у верхней стены между шкафом и кроватью */}
          <Vanity p={p} s={s} x={VANITY_X} y={VANITY_GAP} width={VANITY_W} depth={VANITY_D} wardrobeRight={WARDROBE_X+WARDROBE_D} bedLeft={W-BED_GAP_RIGHT-BED_W}/>
          {/* Кресло перед туалетным столиком */}
          <Chair p={p} s={s} x={CHAIR_X} y={CHAIR_Y} width={CHAIR_W} depth={CHAIR_D}/>
          {/* Внутренняя стена: от нижней стены вверх */}
          <rect x={p+IWALL_X*s} y={p+(H-IWALL_LEN)*s} width={IWALL_T*s} height={IWALL_LEN*s} fill={C_WALL}/>
          {/* ГКЛ перегородка горизонтальная двойная: от колонны 2 до колонны 1, с двумя проёмами */}
          {/* Колонна 2 (левая, у внутренней стены): 200x150мм */}
          <rect x={p+(IWALL_X+IWALL_T)*s} y={p+(H-IWALL_LEN)*s} width={COL2_W*s} height={COL2_H*s} fill={C_COLUMN} stroke={C_COLUMN_BORDER} strokeWidth={1}/>
          <text x={p+(IWALL_X+IWALL_T+COL2_W/2)*s} y={p+(H-IWALL_LEN+COL2_H/2)*s+3} textAnchor="middle" fill={C_COLUMN_TEXT} fontSize={6}>{COL2_W*1000}×{COL2_H*1000}</text>
          {/* Средняя часть (между двумя проёмами) */}
          <rect x={p+(IWALL_X+IWALL_T+COL2_W+DOOR_W)*s} y={p+(H-IWALL_LEN)*s} width={(HDOOR_X-IWALL_X-IWALL_T-COL2_W-DOOR_W)*s} height={GKL_LAYER*s} fill={C_GKL} stroke={C_GKL_BORDER} strokeWidth={1} strokeDasharray="4 2"/>
          <rect x={p+(IWALL_X+IWALL_T+COL2_W+DOOR_W)*s} y={p+(H-IWALL_LEN+GKL_LAYER+GKL_GAP)*s} width={(HDOOR_X-IWALL_X-IWALL_T-COL2_W-DOOR_W)*s} height={GKL_LAYER*s} fill={C_GKL} stroke={C_GKL_BORDER} strokeWidth={1} strokeDasharray="4 2"/>
          <text x={p+(IWALL_X+IWALL_T+COL2_W+DOOR_W+(HDOOR_X-IWALL_X-IWALL_T-COL2_W-DOOR_W)/2)*s} y={p+(H-IWALL_LEN+GKL_LAYER+GKL_GAP/2)*s+3} textAnchor="middle" fill={C_GKL_TEXT} fontSize={7}>ГКЛ</text>
          {/* Правая часть (после правого проёма, если есть) */}
          {HDOOR_X+DOOR_W < IWALL_X+IWALL_T+COL_DIST && <>
            <rect x={p+(HDOOR_X+DOOR_W)*s} y={p+(H-IWALL_LEN)*s} width={(IWALL_X+IWALL_T+COL_DIST-HDOOR_X-DOOR_W)*s} height={GKL_LAYER*s} fill={C_GKL} stroke={C_GKL_BORDER} strokeWidth={1} strokeDasharray="4 2"/>
            <rect x={p+(HDOOR_X+DOOR_W)*s} y={p+(H-IWALL_LEN+GKL_LAYER+GKL_GAP)*s} width={(IWALL_X+IWALL_T+COL_DIST-HDOOR_X-DOOR_W)*s} height={GKL_LAYER*s} fill={C_GKL} stroke={C_GKL_BORDER} strokeWidth={1} strokeDasharray="4 2"/>
          </>}
          {/* Обозначение левого проёма (от колонны 2) */}
          <line x1={p+(IWALL_X+IWALL_T+COL2_W)*s} y1={p+(H-IWALL_LEN)*s} x2={p+(IWALL_X+IWALL_T+COL2_W+DOOR_W)*s} y2={p+(H-IWALL_LEN+GKL_T)*s} stroke={C_COLUMN_BORDER} strokeWidth={1}/>
          <line x1={p+(IWALL_X+IWALL_T+COL2_W)*s} y1={p+(H-IWALL_LEN+GKL_T)*s} x2={p+(IWALL_X+IWALL_T+COL2_W+DOOR_W)*s} y2={p+(H-IWALL_LEN)*s} stroke={C_COLUMN_BORDER} strokeWidth={1}/>
          <text x={p+(IWALL_X+IWALL_T+COL2_W+DOOR_W/2)*s} y={p+(H-IWALL_LEN+GKL_T/2)*s+3} textAnchor="middle" fill={C_GKL_TEXT} fontSize={7}>{DOOR_W*1000}</text>
          {/* Обозначение правого проёма (у вертикальной перегородки) */}
          <line x1={p+HDOOR_X*s} y1={p+(H-IWALL_LEN)*s} x2={p+(HDOOR_X+DOOR_W)*s} y2={p+(H-IWALL_LEN+GKL_T)*s} stroke={C_COLUMN_BORDER} strokeWidth={1}/>
          <line x1={p+HDOOR_X*s} y1={p+(H-IWALL_LEN+GKL_T)*s} x2={p+(HDOOR_X+DOOR_W)*s} y2={p+(H-IWALL_LEN)*s} stroke={C_COLUMN_BORDER} strokeWidth={1}/>
          <text x={p+(HDOOR_X+DOOR_W/2)*s} y={p+(H-IWALL_LEN+GKL_T/2)*s+3} textAnchor="middle" fill={C_GKL_TEXT} fontSize={7}>{DOOR_W*1000}</text>
          {/* ГКЛ перегородка вертикальная: от колонны до нижней стены, правый край совпадает с правым краем колонны */}
          <rect x={p+(IWALL_X+IWALL_T+COL_DIST+COL_W-GKL2_T)*s} y={p+(H-IWALL_LEN+COL_H)*s} width={GKL2_T*s} height={(IWALL_LEN-COL_H)*s} fill={C_GKL} stroke={C_GKL_BORDER} strokeWidth={1} strokeDasharray="4 2"/>
          <text x={p+(IWALL_X+IWALL_T+COL_DIST+COL_W-GKL2_T/2)*s} y={p+(H-(IWALL_LEN-COL_H)/2)*s} textAnchor="middle" fill={C_GKL_TEXT} fontSize={7} transform={`rotate(-90,${p+(IWALL_X+IWALL_T+COL_DIST+COL_W-GKL2_T/2)*s},${p+(H-(IWALL_LEN-COL_H)/2)*s})`}>ГКЛ</text>
          {/* ГКЛ перегородка вертикальная двойная: от верхней стены до ванной, правее зоны труб, с проёмом */}
          {/* Верхняя часть (до проёма) */}
          <rect x={p+PIPES_END*s} y={p} width={GKL3_LAYER*s} height={(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)*s} fill={C_GKL} stroke={C_GKL_BORDER} strokeWidth={1} strokeDasharray="4 2"/>
          <rect x={p+(PIPES_END+GKL3_LAYER+GKL3_GAP)*s} y={p} width={GKL3_LAYER*s} height={(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)*s} fill={C_GKL} stroke={C_GKL_BORDER} strokeWidth={1} strokeDasharray="4 2"/>
          {/* Нижняя часть (под проёмом) */}
          <rect x={p+PIPES_END*s} y={p+(H-IWALL_LEN-DOOR_OFFSET)*s} width={GKL3_LAYER*s} height={DOOR_OFFSET*s} fill={C_GKL} stroke={C_GKL_BORDER} strokeWidth={1} strokeDasharray="4 2"/>
          <rect x={p+(PIPES_END+GKL3_LAYER+GKL3_GAP)*s} y={p+(H-IWALL_LEN-DOOR_OFFSET)*s} width={GKL3_LAYER*s} height={DOOR_OFFSET*s} fill={C_GKL} stroke={C_GKL_BORDER} strokeWidth={1} strokeDasharray="4 2"/>
          {/* Обозначение проёма */}
          <line x1={p+PIPES_END*s} y1={p+(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)*s} x2={p+(PIPES_END+GKL3_LAYER*2+GKL3_GAP)*s} y2={p+(H-IWALL_LEN-DOOR_OFFSET)*s} stroke={C_COLUMN_BORDER} strokeWidth={1}/>
          <line x1={p+PIPES_END*s} y1={p+(H-IWALL_LEN-DOOR_OFFSET)*s} x2={p+(PIPES_END+GKL3_LAYER*2+GKL3_GAP)*s} y2={p+(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)*s} stroke={C_COLUMN_BORDER} strokeWidth={1}/>
          <text x={p+(PIPES_END+GKL3_LAYER+GKL3_GAP/2)*s} y={p+(H-IWALL_LEN-DOOR_OFFSET-DOOR_W/2)*s} textAnchor="middle" fill={C_GKL_TEXT} fontSize={7}>{DOOR_W*1000}</text>
          <text x={p+(PIPES_END+GKL3_LAYER+GKL3_GAP/2)*s} y={p+(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)/2*s} textAnchor="middle" fill={C_GKL_TEXT} fontSize={7} transform={`rotate(-90,${p+(PIPES_END+GKL3_LAYER+GKL3_GAP/2)*s},${p+(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)/2*s})`}>ГКЛ</text>
          {/* Ванна вдоль правой стены ванной комнаты */}
          <Bathtub p={p} s={s} x={WC_RIGHT-BATH_GAP-BATH_W} y={H-BATH_GAP-BATH_L} width={BATH_W} length={BATH_L}/>
          {/* Угловая тумба с раковиной в нижнем левом углу ванной */}
          <SinkCabinet p={p} s={s} x={IWALL_X+IWALL_T+SINK_GAP} y={H-SINK_GAP-SINK_SIZE} size={SINK_SIZE}/>
          {/* Унитаз у левой стены ванной */}
          {(()=>{
            const gklBottomY=H-IWALL_LEN+GKL_T;
            const sinkTop=H-SINK_GAP-SINK_SIZE;
            const wcTopM=sinkTop-WC_W-0.25;
            return <Toilet p={p} s={s} x={IWALL_X+IWALL_T+WC_GAP_LEFT} y={wcTopM} length={WC_L} width={WC_W} tankDepth={WC_TANK} comfort={0.25} gklBottomY={gklBottomY} bathLeftX={WC_RIGHT-BATH_GAP-BATH_W}/>;
          })()}
                    {/* Расстояние между ванной и горизонтальной перегородкой (зеркально) */}
          {(()=>{
            const bathTop=p+(H-BATH_GAP-BATH_L)*s;
            const gklBottom=p+(H-IWALL_LEN+GKL_T)*s;
            const dimX=p+(WC_RIGHT-BATH_GAP-BATH_W/2)*s;
            const dist=(H-BATH_GAP-BATH_L-(H-IWALL_LEN+GKL_T))*1000;
            return <>
              <line x1={dimX} y1={gklBottom} x2={dimX} y2={bathTop} stroke={C_BATH_TRANS}/>
              <line x1={dimX-2} y1={gklBottom} x2={dimX+2} y2={gklBottom} stroke={C_BATH_TRANS}/>
              <line x1={dimX-2} y1={bathTop} x2={dimX+2} y2={bathTop} stroke={C_BATH_TRANS}/>
              <text x={dimX+4} y={(gklBottom+bathTop)/2+3} fill={C_BATH} fontSize={8}>{dist.toFixed(0)}</text>
            </>;
          })()}
          {/* Окно на нижней стене ванной комнаты (рама 70мм у внешнего края) */}
          <rect x={p+WIN2_X*s} y={p+CH+OWALL_PX-WIN_FRAME_PX} width={WIN2_W*s} height={WIN_FRAME_PX} fill={C_DIM} stroke={C_DIM} strokeWidth={1}/>
          <line x1={p+WIN2_X*s} y1={p+CH} x2={p+(WIN2_X+WIN2_W)*s} y2={p+CH} stroke={C_BG} strokeWidth={2}/>
          <text x={p+(WIN2_X+WIN2_W/2)*s} y={p+CH+OWALL_PX+10} textAnchor="middle" fill={C_DIM} fontSize={8}>окно {WIN2_W*1000}</text>
          {/* Обозначение ванной комнаты */}
          <text x={p+((IWALL_X+IWALL_T)+WC_RIGHT)/2*s} y={p+(H-IWALL_LEN+GKL_T+0.3)*s} textAnchor="middle" dominantBaseline="middle" fill={C_BATH} fontSize={11} fontWeight="bold">Ванная</text>
          {/* Обозначение спальни (комната с диваном) */}
          <text x={p+((PIPES_END+GKL3_LAYER*2+GKL3_GAP)+W)/2*s} y={p+2.8*s} textAnchor="middle" dominantBaseline="middle" fill={C_BEDROOM} fontSize={14} fontWeight="bold">Спальня</text>
          {/* Длина верхней стены спальни (от двойной перегородки до правой стены) */}
          {(()=>{
            const x1=p+(PIPES_END+GKL3_LAYER*2+GKL3_GAP)*s, x2=p+W*s, y=p-OWALL_PX-10;
            const len=(W-(PIPES_END+GKL3_LAYER*2+GKL3_GAP))*1000;
            return <>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke={C_DIM_TRANS}/>
              <line x1={x1} y1={y-2} x2={x1} y2={y+2} stroke={C_DIM_TRANS}/>
              <line x1={x2} y1={y-2} x2={x2} y2={y+2} stroke={C_DIM_TRANS}/>
              <text x={(x1+x2)/2} y={y-4} textAnchor="middle" fill={C_DIM} fontSize={9}>{len.toFixed(0)}</text>
            </>;
          })()}
          {/* Колонна: на уровне торца стены, 2240мм от внутренней стены */}
          <rect x={p+(IWALL_X+IWALL_T+COL_DIST)*s} y={p+(H-IWALL_LEN)*s} width={COL_W*s} height={COL_H*s} fill={C_WALL} stroke={C_GKL_BORDER} strokeWidth={1}/>
          {/* Размеры внутренней стены (слева) с засечками */}
          <line x1={p+IWALL_X*s-10} y1={p+(H-IWALL_LEN)*s} x2={p+IWALL_X*s-10} y2={p+H*s} stroke={C_DIM_TRANS}/>
          <line x1={p+IWALL_X*s-12} y1={p+(H-IWALL_LEN)*s} x2={p+IWALL_X*s-8} y2={p+(H-IWALL_LEN)*s} stroke={C_DIM_TRANS}/>
          <line x1={p+IWALL_X*s-12} y1={p+H*s} x2={p+IWALL_X*s-8} y2={p+H*s} stroke={C_DIM_TRANS}/>
          <text x={p+IWALL_X*s-14} y={p+(H-IWALL_LEN/2)*s} textAnchor="end" fill={C_DIM} fontSize={9}>{(IWALL_LEN*1000).toFixed(0)}</text>
          {/* Расстояние от торца стены до проёма с засечками */}
          <line x1={p+IWALL_X*s-10} y1={pr.b} x2={p+IWALL_X*s-10} y2={p+(H-IWALL_LEN)*s} stroke={C_DIM_TRANS}/>
          <line x1={p+IWALL_X*s-12} y1={pr.b} x2={p+IWALL_X*s-8} y2={pr.b} stroke={C_DIM_TRANS}/>
          <line x1={p+IWALL_X*s-12} y1={p+(H-IWALL_LEN)*s} x2={p+IWALL_X*s-8} y2={p+(H-IWALL_LEN)*s} stroke={C_DIM_TRANS}/>
          <text x={p+IWALL_X*s-14} y={(pr.b+p+(H-IWALL_LEN)*s)/2+3} textAnchor="end" fill={C_DIM} fontSize={9}>{((H-IWALL_LEN-PROEM_Y-PROEM_H)*1000).toFixed(0)}</text>
          {/* Расстояние от левой стены до внутренней стены с засечками */}
          <line x1={p} y1={p+CH+OWALL_PX+24} x2={p+IWALL_X*s} y2={p+CH+OWALL_PX+24} stroke={C_DIM_TRANS}/>
          <line x1={p} y1={p+CH+OWALL_PX+22} x2={p} y2={p+CH+OWALL_PX+26} stroke={C_DIM_TRANS}/>
          <line x1={p+IWALL_X*s} y1={p+CH+OWALL_PX+22} x2={p+IWALL_X*s} y2={p+CH+OWALL_PX+26} stroke={C_DIM_TRANS}/>
          <text x={p+IWALL_X*s/2} y={p+CH+OWALL_PX+38} textAnchor="middle" fill={C_DIM} fontSize={9}>{IWALL_X*1000}</text>
          {/* Ширина ванной комнаты (от внутренней стены до ГКЛ перегородки) */}
          <line x1={p+(IWALL_X+IWALL_T)*s} y1={p+CH+OWALL_PX+24} x2={p+WC_RIGHT*s} y2={p+CH+OWALL_PX+24} stroke={C_BATH_TRANS}/>
          <line x1={p+(IWALL_X+IWALL_T)*s} y1={p+CH+OWALL_PX+22} x2={p+(IWALL_X+IWALL_T)*s} y2={p+CH+OWALL_PX+26} stroke={C_BATH_TRANS}/>
          <line x1={p+WC_RIGHT*s} y1={p+CH+OWALL_PX+22} x2={p+WC_RIGHT*s} y2={p+CH+OWALL_PX+26} stroke={C_BATH_TRANS}/>
          <text x={p+((IWALL_X+IWALL_T)+WC_RIGHT)/2*s} y={p+CH+OWALL_PX+38} textAnchor="middle" fill={C_BATH} fontSize={9}>{((WC_RIGHT-IWALL_X-IWALL_T)*1000).toFixed(0)}</text>
          {/* Ширина спальни (от ГКЛ перегородки до правой стены) */}
          <line x1={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s} y1={p+CH+OWALL_PX+24} x2={p+W*s} y2={p+CH+OWALL_PX+24} stroke={C_DIM_TRANS}/>
          <line x1={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s} y1={p+CH+OWALL_PX+22} x2={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s} y2={p+CH+OWALL_PX+26} stroke={C_DIM_TRANS}/>
          <line x1={p+W*s} y1={p+CH+OWALL_PX+22} x2={p+W*s} y2={p+CH+OWALL_PX+26} stroke={C_DIM_TRANS}/>
          <text x={p+((IWALL_X+IWALL_T+COL_DIST+COL_W)+W)/2*s} y={p+CH+OWALL_PX+38} textAnchor="middle" fill={C_DIM} fontSize={9}>{((W-IWALL_X-IWALL_T-COL_DIST-COL_W)*1000).toFixed(0)}</text>
          <line x1={p} y1={p-OWALL_PX-28} x2={p+CW} y2={p-OWALL_PX-28} stroke={C_DIM}/>
          <text x={p+CW/2} y={p-OWALL_PX-33} textAnchor="middle" fill={C_DIM} fontSize={13} fontWeight="bold">{W*1000}</text>
          {/* Длина правой стены */}
          <line x1={p+CW+OWALL_PX+28} y1={p} x2={p+CW+OWALL_PX+28} y2={p+CH} stroke={C_DIM}/>
          <text x={p+CW+OWALL_PX+33} y={p+CH/2} textAnchor="middle" fill={C_DIM} fontSize={13} fontWeight="bold" transform={`rotate(90,${p+CW+OWALL_PX+33},${p+CH/2})`}>{H*1000}</text>
          {/* Окно на правой стене (балконная дверь, рама 70мм у внешнего края) */}
          {(()=>{
            const winY1=p+(H-WIN3_START)*s; // нижний край окна
            const winY2=p+(H-WIN3_START-WIN3_W)*s; // верхний край окна
            const winX=p+CW; // внутренняя граница стены
            const frameX=winX+OWALL_PX-WIN_FRAME_PX; // внутренняя граница рамы (у внешнего края стены)
            // Позиция петель (40мм от нижнего края окна), на внутренней границе рамы
            const hingeY=winY1-DOOR3_HINGE*s;
            // Длина створки
            const doorLen=DOOR3_LEN*s;
            // Угол открытия двери (приоткрытая ~30°)
            const openAngle=30*Math.PI/180;
            // Координаты конца открытой двери (от внутренней границы рамы)
            const doorEndX=frameX-Math.sin(openAngle)*doorLen;
            const doorEndY=hingeY-Math.cos(openAngle)*doorLen;
            return <>
              {/* Рама окна (70мм у внешнего края стены) */}
              <rect x={frameX} y={winY2} width={WIN_FRAME_PX} height={WIN3_W*s} fill={C_DIM} stroke={C_DIM} strokeWidth={1}/>
              <line x1={winX} y1={winY2} x2={winX} y2={winY1} stroke={C_BG} strokeWidth={2}/>
              {/* Размер окна */}
              <text x={p+CW+OWALL_PX+8} y={(winY1+winY2)/2} textAnchor="middle" fill={C_DIM} fontSize={8} transform={`rotate(90,${p+CW+OWALL_PX+8},${(winY1+winY2)/2})`}>окно {WIN3_W*1000}</text>
              {/* Дуга зоны открытия двери (от закрытого до 90°, от внутренней границы рамы) */}
              <path d={`M${frameX},${hingeY-doorLen} A${doorLen},${doorLen} 0 0 0 ${frameX-doorLen},${hingeY}`} fill="none" stroke={C_DIM+"55"} strokeWidth={1} strokeDasharray="4 2"/>
              {/* Створка двери (приоткрытая, толщина 70мм) */}
              <line x1={frameX} y1={hingeY} x2={doorEndX} y2={doorEndY} stroke={C_DIM} strokeWidth={WIN_FRAME_PX}/>
              {/* Петли (кружок) на внутренней границе рамы */}
              <circle cx={frameX} cy={hingeY} r={WIN_FRAME_PX/2} fill={C_DIM}/>
              {/* Размер створки */}
              <text x={doorEndX-12} y={(hingeY+doorEndY)/2} textAnchor="end" fill={C_DIM} fontSize={7}>{DOOR3_LEN*1000}</text>
            </>;
          })()}
          {/* Верхнее окно на правой стене (рама 70мм у внешнего края) */}
          {(()=>{
            const winY1=p+WIN4_START*s; // верхний край окна
            const winY2=p+(WIN4_START+WIN4_W)*s; // нижний край окна
            const winX=p+CW; // внутренняя граница стены
            const frameX=winX+OWALL_PX-WIN_FRAME_PX; // внутренняя граница рамы
            return <>
              {/* Рама окна (70мм у внешнего края стены) */}
              <rect x={frameX} y={winY1} width={WIN_FRAME_PX} height={WIN4_W*s} fill={C_DIM} stroke={C_DIM} strokeWidth={1}/>
              <line x1={winX} y1={winY1} x2={winX} y2={winY2} stroke={C_BG} strokeWidth={2}/>
              {/* Размер окна */}
              <text x={p+CW+OWALL_PX+8} y={(winY1+winY2)/2} textAnchor="middle" fill={C_DIM} fontSize={8} transform={`rotate(90,${p+CW+OWALL_PX+8},${(winY1+winY2)/2})`}>окно {WIN4_W*1000}</text>
            </>;
          })()}
          {/* Окно на левой стене (рама 70мм у внешнего края) */}
          {(()=>{
            const winY1=p+(H-WIN5_START)*s; // нижний край окна
            const winY2=p+(H-WIN5_START-WIN5_W)*s; // верхний край окна
            const winX=p; // внутренняя граница стены
            const frameX=winX-OWALL_PX; // внешняя граница рамы
            return <>
              {/* Рама окна (70мм у внешнего края стены) */}
              <rect x={frameX} y={winY2} width={WIN_FRAME_PX} height={WIN5_W*s} fill={C_DIM} stroke={C_DIM} strokeWidth={1}/>
              <line x1={winX} y1={winY2} x2={winX} y2={winY1} stroke={C_BG} strokeWidth={2}/>
              {/* Размер окна */}
              <text x={p-OWALL_PX-8} y={(winY1+winY2)/2} textAnchor="middle" fill={C_DIM} fontSize={8} transform={`rotate(-90,${p-OWALL_PX-8},${(winY1+winY2)/2})`}>окно {WIN5_W*1000}</text>
            </>;
          })()}
          {/* Форточка на левой стене (рама 70мм у внешнего края) */}
          {(()=>{
            const winY1=p+WIN6_START*s; // верхний край форточки
            const winY2=p+(WIN6_START+WIN6_W)*s; // нижний край форточки
            const winX=p; // внутренняя граница стены
            const frameX=winX-OWALL_PX; // внешняя граница рамы
            return <>
              {/* Рама форточки (70мм у внешнего края стены) */}
              <rect x={frameX} y={winY1} width={WIN_FRAME_PX} height={WIN6_W*s} fill={C_DIM} stroke={C_DIM} strokeWidth={1}/>
              <line x1={winX} y1={winY1} x2={winX} y2={winY2} stroke={C_BG} strokeWidth={2}/>
              {/* Размер форточки */}
              <text x={p-OWALL_PX-8} y={(winY1+winY2)/2} textAnchor="middle" fill={C_DIM} fontSize={8} transform={`rotate(-90,${p-OWALL_PX-8},${(winY1+winY2)/2})`}>форт. {WIN6_W*1000}</text>
            </>;
          })()}
          {/* Размерные линии окон снаружи помещения */}
          {(()=>{
            const dimOffset=8; // отступ размерной линии от стены
            // Верхняя стена: расстояния до окна (выровнено с размером спальни)
            const topY=p-OWALL_PX-10;
            const topWinLeft=p+WIN_X*s;
            const topWinRight=p+(WIN_X+WIN_W)*s;
            // Нижняя стена: расстояния до окна ванной
            const botY=p+CH+OWALL_PX+dimOffset;
            const botWinLeft=p+WIN2_X*s;
            const botWinRight=p+(WIN2_X+WIN2_W)*s;
            // Левая стена: расстояния до форточки и окна
            const leftX=p-OWALL_PX-dimOffset;
            const leftFortTop=p+WIN6_START*s;
            const leftFortBot=p+(WIN6_START+WIN6_W)*s;
            const leftWinTop=p+(H-WIN5_START-WIN5_W)*s;
            const leftWinBot=p+(H-WIN5_START)*s;
            // Правая стена: расстояния до окон
            const rightX=p+CW+OWALL_PX+dimOffset;
            const rightWin4Top=p+WIN4_START*s;
            const rightWin4Bot=p+(WIN4_START+WIN4_W)*s;
            const rightWin3Top=p+(H-WIN3_START-WIN3_W)*s;
            const rightWin3Bot=p+(H-WIN3_START)*s;
            return <>
              {/* === Верхняя стена === */}
              {/* От левого угла до окна */}
              <line x1={p} y1={topY} x2={topWinLeft} y2={topY} stroke={C_DIM_TRANS}/>
              <line x1={p} y1={topY-2} x2={p} y2={topY+2} stroke={C_DIM_TRANS}/>
              <line x1={topWinLeft} y1={topY-2} x2={topWinLeft} y2={topY+2} stroke={C_DIM_TRANS}/>
              <text x={(p+topWinLeft)/2} y={topY-3} textAnchor="middle" fill={C_DIM} fontSize={7}>{WIN_X*1000}</text>
              {/* От окна до ГКЛ перегородки (PIPES_END) */}
              <line x1={topWinRight} y1={topY} x2={p+PIPES_END*s} y2={topY} stroke={C_DIM_TRANS}/>
              <line x1={topWinRight} y1={topY-2} x2={topWinRight} y2={topY+2} stroke={C_DIM_TRANS}/>
              <line x1={p+PIPES_END*s} y1={topY-2} x2={p+PIPES_END*s} y2={topY+2} stroke={C_DIM_TRANS}/>
              <text x={(topWinRight+p+PIPES_END*s)/2} y={topY-3} textAnchor="middle" fill={C_DIM} fontSize={7}>{((PIPES_END-WIN_X-WIN_W)*1000).toFixed(0)}</text>
              {/* === Нижняя стена (окно ванной) === */}
              {/* От внутренней стены (левая граница ванной) до окна */}
              <line x1={p+(IWALL_X+IWALL_T)*s} y1={botY} x2={botWinLeft} y2={botY} stroke={C_DIM_TRANS}/>
              <line x1={p+(IWALL_X+IWALL_T)*s} y1={botY-2} x2={p+(IWALL_X+IWALL_T)*s} y2={botY+2} stroke={C_DIM_TRANS}/>
              <line x1={botWinLeft} y1={botY-2} x2={botWinLeft} y2={botY+2} stroke={C_DIM_TRANS}/>
              <text x={(p+(IWALL_X+IWALL_T)*s+botWinLeft)/2} y={botY+10} textAnchor="middle" fill={C_DIM} fontSize={7}>{((WIN2_X-IWALL_X-IWALL_T)*1000).toFixed(0)}</text>
              {/* От окна до ГКЛ перегородки (правая граница ванной) */}
              <line x1={botWinRight} y1={botY} x2={p+WC_RIGHT*s} y2={botY} stroke={C_DIM_TRANS}/>
              <line x1={botWinRight} y1={botY-2} x2={botWinRight} y2={botY+2} stroke={C_DIM_TRANS}/>
              <line x1={p+WC_RIGHT*s} y1={botY-2} x2={p+WC_RIGHT*s} y2={botY+2} stroke={C_DIM_TRANS}/>
              <text x={(botWinRight+p+WC_RIGHT*s)/2} y={botY+10} textAnchor="middle" fill={C_DIM} fontSize={7}>{((WC_RIGHT-WIN2_X-WIN2_W)*1000).toFixed(0)}</text>
              {/* === Левая стена === */}
              {/* От верхнего угла до форточки */}
              <line x1={leftX} y1={p} x2={leftX} y2={leftFortTop} stroke={C_DIM_TRANS}/>
              <line x1={leftX-2} y1={p} x2={leftX+2} y2={p} stroke={C_DIM_TRANS}/>
              <line x1={leftX-2} y1={leftFortTop} x2={leftX+2} y2={leftFortTop} stroke={C_DIM_TRANS}/>
              <text x={leftX-3} y={(p+leftFortTop)/2} textAnchor="end" fill={C_DIM} fontSize={7} transform={`rotate(-90,${leftX-3},${(p+leftFortTop)/2})`}>{WIN6_START*1000}</text>
              {/* От форточки до окна */}
              <line x1={leftX} y1={leftFortBot} x2={leftX} y2={leftWinTop} stroke={C_DIM_TRANS}/>
              <line x1={leftX-2} y1={leftFortBot} x2={leftX+2} y2={leftFortBot} stroke={C_DIM_TRANS}/>
              <line x1={leftX-2} y1={leftWinTop} x2={leftX+2} y2={leftWinTop} stroke={C_DIM_TRANS}/>
              <text x={leftX-3} y={(leftFortBot+leftWinTop)/2} textAnchor="end" fill={C_DIM} fontSize={7} transform={`rotate(-90,${leftX-3},${(leftFortBot+leftWinTop)/2})`}>{((H-WIN5_START-WIN5_W-WIN6_START-WIN6_W)*1000).toFixed(0)}</text>
              {/* От окна до нижнего угла */}
              <line x1={leftX} y1={leftWinBot} x2={leftX} y2={p+CH} stroke={C_DIM_TRANS}/>
              <line x1={leftX-2} y1={leftWinBot} x2={leftX+2} y2={leftWinBot} stroke={C_DIM_TRANS}/>
              <line x1={leftX-2} y1={p+CH} x2={leftX+2} y2={p+CH} stroke={C_DIM_TRANS}/>
              <text x={leftX-3} y={(leftWinBot+p+CH)/2} textAnchor="end" fill={C_DIM} fontSize={7} transform={`rotate(-90,${leftX-3},${(leftWinBot+p+CH)/2})`}>{WIN5_START*1000}</text>
              {/* === Правая стена === */}
              {/* От верхнего угла до верхнего окна */}
              <line x1={rightX} y1={p} x2={rightX} y2={rightWin4Top} stroke={C_DIM_TRANS}/>
              <line x1={rightX-2} y1={p} x2={rightX+2} y2={p} stroke={C_DIM_TRANS}/>
              <line x1={rightX-2} y1={rightWin4Top} x2={rightX+2} y2={rightWin4Top} stroke={C_DIM_TRANS}/>
              <text x={rightX+3} y={(p+rightWin4Top)/2} textAnchor="start" fill={C_DIM} fontSize={7} transform={`rotate(90,${rightX+3},${(p+rightWin4Top)/2})`}>{WIN4_START*1000}</text>
              {/* От верхнего окна до балконной двери */}
              <line x1={rightX} y1={rightWin4Bot} x2={rightX} y2={rightWin3Top} stroke={C_DIM_TRANS}/>
              <line x1={rightX-2} y1={rightWin4Bot} x2={rightX+2} y2={rightWin4Bot} stroke={C_DIM_TRANS}/>
              <line x1={rightX-2} y1={rightWin3Top} x2={rightX+2} y2={rightWin3Top} stroke={C_DIM_TRANS}/>
              <text x={rightX+3} y={(rightWin4Bot+rightWin3Top)/2} textAnchor="start" fill={C_DIM} fontSize={7} transform={`rotate(90,${rightX+3},${(rightWin4Bot+rightWin3Top)/2})`}>{((H-WIN3_START-WIN3_W-WIN4_START-WIN4_W)*1000).toFixed(0)}</text>
              {/* От балконной двери до нижнего угла */}
              <line x1={rightX} y1={rightWin3Bot} x2={rightX} y2={p+CH} stroke={C_DIM_TRANS}/>
              <line x1={rightX-2} y1={rightWin3Bot} x2={rightX+2} y2={rightWin3Bot} stroke={C_DIM_TRANS}/>
              <line x1={rightX-2} y1={p+CH} x2={rightX+2} y2={p+CH} stroke={C_DIM_TRANS}/>
              <text x={rightX+3} y={(rightWin3Bot+p+CH)/2} textAnchor="start" fill={C_DIM} fontSize={7} transform={`rotate(90,${rightX+3},${(rightWin3Bot+p+CH)/2})`}>{WIN3_START*1000}</text>
            </>;
          })()}
          {mouse&&<>
            <line x1={mouse.x} y1={p} x2={mouse.x} y2={p+CH} stroke={C_DIM+"44"} strokeDasharray="4"/>
            <line x1={p} y1={mouse.y} x2={p+CW} y2={mouse.y} stroke={C_DIM+"44"} strokeDasharray="4"/>
            <rect x={mouse.x+10} y={mouse.y-26} width={100} height={22} rx={4} fill={C_TOOLTIP_BG}/>
            <text x={mouse.x+14} y={mouse.y-10} fill={C_DIM} fontSize={11}>{((mouse.x-p)/s*1000).toFixed(0)}×{((mouse.y-p)/s*1000).toFixed(0)}</text>
          </>}
          <defs><marker id="aF" viewBox="0 0 10 10" refX="10" refY="5" markerWidth={6} markerHeight={6} orient="auto"><path d="M0,1 L10,5 L0,9" fill={C_STEP}/></marker></defs>
        </svg>
      </div>
      <div style={{textAlign:"center",marginTop:16}}>
        <div style={{display:"inline-flex",gap:16,fontSize:12,color:C_TEXT_DIM,flexWrap:"wrap",justifyContent:"center"}}>
          <span><span style={{color:C_STEP}}>▬ ▬</span> Проём</span>
          <span><span style={{color:C_ENTER}}>▌</span> Вход</span>
          <span><span style={{color:C_EXIT}}>▌</span> Выход / доб. ступень</span>
          <span><span style={{color:C_BEDROOM}}>■</span> Диван 3000×2050</span>
          <span><span style={{color:C_PIPES}}>■</span> Проводка/трубы</span>
          <span><span style={{color:C_DIM}}>■</span> Окно</span>
          <span><span style={{color:C_GKL}}>▬ ▬</span> ГКЛ перегородка</span>
        </div>
      </div>
    </div>
  );
}
