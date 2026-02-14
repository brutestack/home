import { useState } from "react";
const S=70,WALL=4,W=9.4,H=5.4,CW=W*S,CH=H*S,PAD=60;
// Внутренняя стена: 3м от левой стены, длина 2630мм, толщина 250мм
const IWALL_X=3.0,IWALL_LEN=2.63,IWALL_T=0.25;
// Колонна: 200x150мм, на расстоянии 2240мм от внутренней стены, на уровне торца внутренней стены
const COL_DIST=2.24,COL_W=0.2,COL_H=0.15;
// ГКЛ перегородка горизонтальная двойная: от торца внутренней стены до колонны, 50+50+50мм
const GKL_LAYER=0.05,GKL_GAP=0.05; // слой 50мм, промежуток 50мм
const GKL_T=GKL_LAYER*2+GKL_GAP; // общая толщина 150мм
// ГКЛ перегородка вертикальная: от колонны до нижней стены, толщина 100мм
const GKL2_T=0.1;
// ГКЛ перегородка вертикальная двойная: от верхней стены до ванной, 50+50+50мм
const GKL3_LAYER=0.05,GKL3_GAP=0.05; // слой 50мм, промежуток 50мм
// Проём в перегородках: ширина 900мм, отступ 50мм
const DOOR_W=0.9,DOOR_OFFSET=0.05;
// Угловой диван: 3000x2050мм, глубина 1050мм
const SOFA_L=3.0,SOFA_S=2.05,SOFA_D=1.05;
// Позиция дивана: зазор от колонны 100мм, отступ от нижней стены 100мм
const SOFA_GAP_COL=0.1,SOFA_GAP_BOT=0.1;
const SOFA_X=IWALL_X+IWALL_T+COL_DIST+COL_W+SOFA_GAP_COL; // левый край дивана
const PROEM_X=0,PROEM_Y=0.15,PROEM_W=3.0,PROEM_H=1.7;
// Зона проводки/труб на верхней стене: от 840мм до 1430мм правее проёма
const PIPES_START=PROEM_W+0.84,PIPES_END=PROEM_W+1.43;
// Проём в горизонтальной двойной перегородке: сразу от вертикальной перегородки
const HDOOR_X=PIPES_END+GKL3_LAYER*2+GKL3_GAP; // начало правого проёма
// Левый проём: отступ 200мм от внутренней стены
const HDOOR_L_OFFSET=0.2;
// Ванна: 1700x800мм, вдоль левой стены ванной комнаты, отступ 50мм от стен
const BATH_L=1.7,BATH_W=0.8,BATH_GAP=0.05;
// Унитаз: 650x380мм (бачок 200мм), отступ 50мм от нижней стены, 250мм от правой перегородки
const WC_L=0.65,WC_W=0.38,WC_TANK=0.2,WC_GAP_BOT=0.05,WC_GAP_RIGHT=0.25;
const WC_RIGHT=IWALL_X+IWALL_T+COL_DIST+COL_W-GKL2_T; // правая стена ванной (левый край ГКЛ)
// Окно на верхней стене: от 2540мм, ширина 1250мм
const WIN_X=2.54,WIN_W=1.25;
const PLAT_X=0.05,PLAT_W=0.75,MARCH_W=PROEM_H/2;
const M1_STEPS=5,M2_STEPS=8,TREAD=0.25,DOBOR_TREAD=0.20;
const M1_LEN=M1_STEPS*TREAD,M2_LEN=M2_STEPS*TREAD,M2_FULL=M2_LEN+DOBOR_TREAD;
const MX=PLAT_X+PLAT_W;
const R=(x,y,w,h,sc,pd)=>({x:pd+x*sc,y:pd+y*sc,w:w*sc,h:h*sc,r:pd+(x+w)*sc,b:pd+(y+h)*sc});

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
    <div style={{background:"#1a1a2e",minHeight:"100vh",padding:20,fontFamily:"sans-serif",color:"#e0e0e0"}}>
      <h2 style={{textAlign:"center",color:"#fff",margin:"0 0 4px"}}>План 2-го этажа</h2>
      <p style={{textAlign:"center",color:"#888",margin:"0 0 16px",fontSize:14}}>{W*1000}×{H*1000} мм | Высота: 2800 мм | Площадь: {(W*H).toFixed(1)} м² | <span style={{color:"#4fc3f7"}}>все размеры в мм</span></p>
      <div style={{display:"flex",justifyContent:"center"}}>
        <svg viewBox={`0 0 ${CW+p*2} ${CH+p*2}`}
          onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();const scale=(CW+p*2)/r.width;const x=(e.clientX-r.left)*scale,y=(e.clientY-r.top)*scale;if(x>=p&&x<=p+CW&&y>=p&&y<=p+CH)setMouse({x,y});else setMouse(null);}}
          onMouseLeave={()=>setMouse(null)}
          style={{width:1000,height:"auto",background:"#16213e",borderRadius:8}}>
          {Array.from({length:Math.floor(W)+1},(_,i)=><line key={`gv${i}`} x1={p+i*s} y1={p} x2={p+i*s} y2={p+CH} stroke="#ffffff08"/>)}
          {Array.from({length:Math.floor(H)+1},(_,i)=><line key={`gh${i}`} x1={p} y1={p+i*s} x2={p+CW} y2={p+i*s} stroke="#ffffff08"/>)}
          <rect x={p} y={p} width={CW} height={CH} fill="#1e2d4a"/>
          <rect x={pr.x} y={pr.y} width={pr.w} height={pr.h} fill="#0d1520" stroke="#ff9800" strokeWidth={2} strokeDasharray="6 3"/>
          <rect x={pl1.x} y={pl1.y} width={pl1.w} height={pl1.h} fill="#1a1200" stroke="#ff980055"/>
          <rect x={pl2.x} y={pl2.y} width={pl2.w} height={pl2.h} fill="#2a1e00" stroke="#ff980077"/>
          <text x={pl1.x+pl1.w/2} y={pl1.y+pl1.h/2} textAnchor="middle" dominantBaseline="middle" fill="#ff9800" fontSize={7} transform={`rotate(-90,${pl1.x+pl1.w/2},${pl1.y+pl1.h/2})`}>площ.▽</text>
          <text x={pl2.x+pl2.w/2} y={pl2.y+pl2.h/2} textAnchor="middle" dominantBaseline="middle" fill="#ff9800" fontSize={7} transform={`rotate(-90,${pl2.x+pl2.w/2},${pl2.y+pl2.h/2})`}>площ.△</text>
          <path d={`M${pl1.x+pl1.w*.7},${pl1.y+pl1.h*.3} C${pl1.x+pl1.w*.15},${pl1.y+pl1.h*.3} ${pl2.x+pl2.w*.15},${pl2.y+pl2.h*.7} ${pl2.x+pl2.w*.7},${pl2.y+pl2.h*.7}`} fill="none" stroke="#ff980077" strokeWidth={1.5} markerEnd="url(#aF)"/>
          <line x1={m1.x} y1={midY} x2={m2.r} y2={midY} stroke="#ff980044" strokeDasharray="3"/>
          {Array.from({length:M1_STEPS},(_,i)=>{const sw=m1.w/M1_STEPS;return <rect key={`s1${i}`} x={m1.x+(M1_STEPS-1-i)*sw} y={m1.y} width={sw-1} height={m1.h} fill={`rgba(255,152,0,${.05+i*.03})`} stroke="#ff980033" strokeWidth={.5}/>;})}
          <line x1={m1.r-8} y1={m1.y+m1.h/2} x2={m1.x+12} y2={m1.y+m1.h/2} stroke="#ff9800" strokeWidth={1.5} markerEnd="url(#aF)"/>
          <text x={m1.x+m1.w/2} y={m1.y+m1.h/2-8} textAnchor="middle" fill="#ff9800aa" fontSize={8}>м1 ({M1_STEPS}ст.)</text>
          {Array.from({length:M2_STEPS},(_,i)=>{const sw=M2_LEN*s/M2_STEPS;const bx=p+MX*s;return <rect key={`s2${i}`} x={bx+i*sw} y={m2.y} width={sw-1} height={m2.h} fill={`rgba(255,152,0,${.05+i*.022})`} stroke="#ff980033" strokeWidth={.5}/>;})}
          <rect x={doborX} y={m2.y} width={doborW-1} height={m2.h} fill="rgba(76,175,80,0.15)" stroke="#4caf50" strokeWidth={1.5}/>
          <text x={doborX+doborW/2} y={m2.y+m2.h/2+3} textAnchor="middle" fill="#4caf50" fontSize={7} fontWeight="bold">доб.</text>
          <line x1={m2.x+8} y1={m2.y+m2.h/2} x2={m2.r-12} y2={m2.y+m2.h/2} stroke="#ff9800" strokeWidth={1.5} markerEnd="url(#aF)"/>
          <text x={m2.x+m2.w/2} y={m2.y+m2.h/2-8} textAnchor="middle" fill="#ff9800aa" fontSize={8}>м2 ({M2_STEPS}+1доб.)</text>
          <line x1={p+0.05*s} y1={pr.y} x2={p+0.05*s} y2={pr.b} stroke="#e74c3c88" strokeWidth={1} strokeDasharray="4 3"/>
          <line x1={m1.r} y1={m1.y+3} x2={m1.r} y2={m1.b-3} stroke="#2196f3" strokeWidth={3}/>
          <text x={m1.r+6} y={m1.y+m1.h/2+4} fill="#2196f3" fontSize={10} fontWeight="bold">вход (1эт)</text>
          <line x1={m2.r} y1={m2.y+3} x2={m2.r} y2={m2.b-3} stroke="#4caf50" strokeWidth={3}/>
          <text x={m2.r+6} y={m2.y+m2.h/2+4} fill="#4caf50" fontSize={10} fontWeight="bold">выход (2эт)</text>
          <line x1={pr.x} y1={pr.b+14} x2={pr.r} y2={pr.b+14} stroke="#ff980088"/>
          <text x={pr.x+pr.w/2} y={pr.b+28} textAnchor="middle" fill="#ff9800" fontSize={10}>{PROEM_W*1000}</text>
          <line x1={pr.r+16} y1={pr.y} x2={pr.r+16} y2={pr.b} stroke="#ff980088"/>
          <text x={pr.r+20} y={pr.y+pr.h/2+4} fill="#ff9800" fontSize={10}>{PROEM_H*1000}</text>
          <line x1={p-12} y1={p} x2={p-12} y2={p+PROEM_Y*s} stroke="#ff980066"/>
          <text x={p-16} y={p+PROEM_Y*s/2+3} textAnchor="end" fill="#ff980099" fontSize={9}>{PROEM_Y*1000}</text>
          <rect x={p} y={p} width={CW} height={CH} fill="none" stroke="#e0e0e0" strokeWidth={WALL}/>
          {/* Зона проводки/труб на верхней стене */}
          <rect x={p+PIPES_START*s} y={p-WALL/2} width={(PIPES_END-PIPES_START)*s} height={12} fill="#e91e63" stroke="#e91e63" strokeWidth={1}/>
          <text x={p+(PIPES_START+PIPES_END)/2*s} y={p-WALL/2-4} textAnchor="middle" fill="#e91e63" fontSize={7}>проводка/трубы</text>
          {/* Окно на верхней стене */}
          <rect x={p+WIN_X*s} y={p-WALL/2} width={WIN_W*s} height={WALL} fill="#4fc3f7" stroke="#4fc3f7" strokeWidth={1}/>
          <line x1={p+WIN_X*s} y1={p} x2={p+(WIN_X+WIN_W)*s} y2={p} stroke="#1a1a2e" strokeWidth={2}/>
          <text x={p+(WIN_X+WIN_W/2)*s} y={p-12} textAnchor="middle" fill="#4fc3f7" fontSize={8}>окно {WIN_W*1000}</text>
          {/* Угловой диван в правом нижнем углу (L-форма со скруглёнными углами) */}
          {(()=>{
            const r=4,sx=p+SOFA_X*s,sy1=p+(H-SOFA_GAP_BOT-SOFA_S)*s,sx2=p+(SOFA_X+SOFA_D)*s,sy2=p+(H-SOFA_GAP_BOT-SOFA_D)*s,sx3=p+(SOFA_X+SOFA_L)*s,sy3=p+(H-SOFA_GAP_BOT)*s;
            return <path d={`M${sx+r},${sy1} L${sx2-r},${sy1} A${r},${r} 0 0 1 ${sx2},${sy1+r} L${sx2},${sy2-r} A${r},${r} 0 0 0 ${sx2+r},${sy2} L${sx3-r},${sy2} A${r},${r} 0 0 1 ${sx3},${sy2+r} L${sx3},${sy3-r} A${r},${r} 0 0 1 ${sx3-r},${sy3} L${sx+r},${sy3} A${r},${r} 0 0 1 ${sx},${sy3-r} L${sx},${sy1+r} A${r},${r} 0 0 1 ${sx+r},${sy1} Z`} fill="#6a5acd33" stroke="#6a5acd" strokeWidth={1.5}/>;
          })()}
          <text x={p+(SOFA_X+SOFA_L/2)*s} y={p+(H-SOFA_GAP_BOT-SOFA_D/2)*s} textAnchor="middle" dominantBaseline="middle" fill="#6a5acd" fontSize={9}>диван</text>
          {/* Внутренняя стена: от нижней стены вверх */}
          <rect x={p+IWALL_X*s} y={p+(H-IWALL_LEN)*s} width={IWALL_T*s} height={IWALL_LEN*s} fill="#e0e0e0"/>
          {/* ГКЛ перегородка горизонтальная двойная: от торца внутренней стены до колонны, с двумя проёмами */}
          {/* Левая часть (до левого проёма) */}
          <rect x={p+(IWALL_X+IWALL_T)*s} y={p+(H-IWALL_LEN)*s} width={HDOOR_L_OFFSET*s} height={GKL_LAYER*s} fill="#a0a0a0" stroke="#888" strokeWidth={1} strokeDasharray="4 2"/>
          <rect x={p+(IWALL_X+IWALL_T)*s} y={p+(H-IWALL_LEN+GKL_LAYER+GKL_GAP)*s} width={HDOOR_L_OFFSET*s} height={GKL_LAYER*s} fill="#a0a0a0" stroke="#888" strokeWidth={1} strokeDasharray="4 2"/>
          {/* Средняя часть (между двумя проёмами) */}
          <rect x={p+(IWALL_X+IWALL_T+HDOOR_L_OFFSET+DOOR_W)*s} y={p+(H-IWALL_LEN)*s} width={(HDOOR_X-IWALL_X-IWALL_T-HDOOR_L_OFFSET-DOOR_W)*s} height={GKL_LAYER*s} fill="#a0a0a0" stroke="#888" strokeWidth={1} strokeDasharray="4 2"/>
          <rect x={p+(IWALL_X+IWALL_T+HDOOR_L_OFFSET+DOOR_W)*s} y={p+(H-IWALL_LEN+GKL_LAYER+GKL_GAP)*s} width={(HDOOR_X-IWALL_X-IWALL_T-HDOOR_L_OFFSET-DOOR_W)*s} height={GKL_LAYER*s} fill="#a0a0a0" stroke="#888" strokeWidth={1} strokeDasharray="4 2"/>
          <text x={p+(IWALL_X+IWALL_T+HDOOR_L_OFFSET+DOOR_W+(HDOOR_X-IWALL_X-IWALL_T-HDOOR_L_OFFSET-DOOR_W)/2)*s} y={p+(H-IWALL_LEN+GKL_LAYER+GKL_GAP/2)*s+3} textAnchor="middle" fill="#666" fontSize={7}>ГКЛ</text>
          {/* Правая часть (после правого проёма, если есть) */}
          {HDOOR_X+DOOR_W < IWALL_X+IWALL_T+COL_DIST && <>
            <rect x={p+(HDOOR_X+DOOR_W)*s} y={p+(H-IWALL_LEN)*s} width={(IWALL_X+IWALL_T+COL_DIST-HDOOR_X-DOOR_W)*s} height={GKL_LAYER*s} fill="#a0a0a0" stroke="#888" strokeWidth={1} strokeDasharray="4 2"/>
            <rect x={p+(HDOOR_X+DOOR_W)*s} y={p+(H-IWALL_LEN+GKL_LAYER+GKL_GAP)*s} width={(IWALL_X+IWALL_T+COL_DIST-HDOOR_X-DOOR_W)*s} height={GKL_LAYER*s} fill="#a0a0a0" stroke="#888" strokeWidth={1} strokeDasharray="4 2"/>
          </>}
          {/* Обозначение левого проёма (с отступом 200мм от внутренней стены) */}
          <line x1={p+(IWALL_X+IWALL_T+HDOOR_L_OFFSET)*s} y1={p+(H-IWALL_LEN)*s} x2={p+(IWALL_X+IWALL_T+HDOOR_L_OFFSET+DOOR_W)*s} y2={p+(H-IWALL_LEN+GKL_T)*s} stroke="#666" strokeWidth={1}/>
          <line x1={p+(IWALL_X+IWALL_T+HDOOR_L_OFFSET)*s} y1={p+(H-IWALL_LEN+GKL_T)*s} x2={p+(IWALL_X+IWALL_T+HDOOR_L_OFFSET+DOOR_W)*s} y2={p+(H-IWALL_LEN)*s} stroke="#666" strokeWidth={1}/>
          <text x={p+(IWALL_X+IWALL_T+HDOOR_L_OFFSET+DOOR_W/2)*s} y={p+(H-IWALL_LEN+GKL_T/2)*s+3} textAnchor="middle" fill="#666" fontSize={7}>{DOOR_W*1000}</text>
          {/* Обозначение правого проёма (у вертикальной перегородки) */}
          <line x1={p+HDOOR_X*s} y1={p+(H-IWALL_LEN)*s} x2={p+(HDOOR_X+DOOR_W)*s} y2={p+(H-IWALL_LEN+GKL_T)*s} stroke="#666" strokeWidth={1}/>
          <line x1={p+HDOOR_X*s} y1={p+(H-IWALL_LEN+GKL_T)*s} x2={p+(HDOOR_X+DOOR_W)*s} y2={p+(H-IWALL_LEN)*s} stroke="#666" strokeWidth={1}/>
          <text x={p+(HDOOR_X+DOOR_W/2)*s} y={p+(H-IWALL_LEN+GKL_T/2)*s+3} textAnchor="middle" fill="#666" fontSize={7}>{DOOR_W*1000}</text>
          {/* ГКЛ перегородка вертикальная: от колонны до нижней стены, правый край совпадает с правым краем колонны */}
          <rect x={p+(IWALL_X+IWALL_T+COL_DIST+COL_W-GKL2_T)*s} y={p+(H-IWALL_LEN+COL_H)*s} width={GKL2_T*s} height={(IWALL_LEN-COL_H)*s} fill="#a0a0a0" stroke="#888" strokeWidth={1} strokeDasharray="4 2"/>
          <text x={p+(IWALL_X+IWALL_T+COL_DIST+COL_W-GKL2_T/2)*s} y={p+(H-(IWALL_LEN-COL_H)/2)*s} textAnchor="middle" fill="#666" fontSize={7} transform={`rotate(-90,${p+(IWALL_X+IWALL_T+COL_DIST+COL_W-GKL2_T/2)*s},${p+(H-(IWALL_LEN-COL_H)/2)*s})`}>ГКЛ</text>
          {/* ГКЛ перегородка вертикальная двойная: от верхней стены до ванной, правее зоны труб, с проёмом */}
          {/* Верхняя часть (до проёма) */}
          <rect x={p+PIPES_END*s} y={p} width={GKL3_LAYER*s} height={(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)*s} fill="#a0a0a0" stroke="#888" strokeWidth={1} strokeDasharray="4 2"/>
          <rect x={p+(PIPES_END+GKL3_LAYER+GKL3_GAP)*s} y={p} width={GKL3_LAYER*s} height={(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)*s} fill="#a0a0a0" stroke="#888" strokeWidth={1} strokeDasharray="4 2"/>
          {/* Нижняя часть (под проёмом) */}
          <rect x={p+PIPES_END*s} y={p+(H-IWALL_LEN-DOOR_OFFSET)*s} width={GKL3_LAYER*s} height={DOOR_OFFSET*s} fill="#a0a0a0" stroke="#888" strokeWidth={1} strokeDasharray="4 2"/>
          <rect x={p+(PIPES_END+GKL3_LAYER+GKL3_GAP)*s} y={p+(H-IWALL_LEN-DOOR_OFFSET)*s} width={GKL3_LAYER*s} height={DOOR_OFFSET*s} fill="#a0a0a0" stroke="#888" strokeWidth={1} strokeDasharray="4 2"/>
          {/* Обозначение проёма */}
          <line x1={p+PIPES_END*s} y1={p+(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)*s} x2={p+(PIPES_END+GKL3_LAYER*2+GKL3_GAP)*s} y2={p+(H-IWALL_LEN-DOOR_OFFSET)*s} stroke="#666" strokeWidth={1}/>
          <line x1={p+PIPES_END*s} y1={p+(H-IWALL_LEN-DOOR_OFFSET)*s} x2={p+(PIPES_END+GKL3_LAYER*2+GKL3_GAP)*s} y2={p+(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)*s} stroke="#666" strokeWidth={1}/>
          <text x={p+(PIPES_END+GKL3_LAYER+GKL3_GAP/2)*s} y={p+(H-IWALL_LEN-DOOR_OFFSET-DOOR_W/2)*s} textAnchor="middle" fill="#666" fontSize={7}>{DOOR_W*1000}</text>
          <text x={p+(PIPES_END+GKL3_LAYER+GKL3_GAP/2)*s} y={p+(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)/2*s} textAnchor="middle" fill="#666" fontSize={7} transform={`rotate(-90,${p+(PIPES_END+GKL3_LAYER+GKL3_GAP/2)*s},${p+(H-IWALL_LEN-DOOR_OFFSET-DOOR_W)/2*s})`}>ГКЛ</text>
          {/* Ванна вдоль левой стены ванной комнаты, отступ 50мм от стен */}
          <rect x={p+(IWALL_X+IWALL_T+BATH_GAP)*s} y={p+(H-BATH_GAP-BATH_L)*s} width={BATH_W*s} height={BATH_L*s} fill="#5dade233" stroke="#5dade2" strokeWidth={1.5} rx={3}/>
          <text x={p+(IWALL_X+IWALL_T+BATH_GAP+BATH_W/2)*s} y={p+(H-BATH_GAP-BATH_L/2)*s} textAnchor="middle" dominantBaseline="middle" fill="#5dade2" fontSize={8}>ванна</text>
          {/* Унитаз в правом нижнем углу ванной (бачок к стене) */}
          {(()=>{
            const wcX=p+(WC_RIGHT-WC_GAP_RIGHT-WC_W)*s,wcBowlY=p+(H-WC_GAP_BOT-WC_L)*s,wcTankY=p+(H-WC_GAP_BOT-WC_TANK)*s;
            const bowlH=(WC_L-WC_TANK)*s,tankH=WC_TANK*s,wcW=WC_W*s;
            const comfort=0.25*s; // 250мм зона комфорта
            return <>
              {/* Зона комфорта унитаза (250мм слева, справа, спереди) */}
              <rect x={wcX-comfort} y={wcBowlY-comfort} width={wcW+comfort*2} height={(WC_L)*s+comfort} fill="none" stroke="#5dade255" strokeWidth={1} strokeDasharray="4 2" rx={3}/>
              {/* Общие размеры зоны комфорта (внутри) */}
              {/* Ширина (сверху внутри) */}
              <line x1={wcX-comfort} y1={wcBowlY-comfort+4} x2={wcX+wcW+comfort} y2={wcBowlY-comfort+4} stroke="#5dade266"/>
              <line x1={wcX-comfort} y1={wcBowlY-comfort+2} x2={wcX-comfort} y2={wcBowlY-comfort+6} stroke="#5dade266"/>
              <line x1={wcX+wcW+comfort} y1={wcBowlY-comfort+2} x2={wcX+wcW+comfort} y2={wcBowlY-comfort+6} stroke="#5dade266"/>
              <text x={wcX+wcW/2} y={wcBowlY-comfort+14} textAnchor="middle" fill="#5dade2" fontSize={7}>{(WC_W*1000+500).toFixed(0)}</text>
              {/* Длина унитаза (слева внутри) */}
              <line x1={wcX-comfort+4} y1={wcBowlY} x2={wcX-comfort+4} y2={wcTankY+tankH} stroke="#5dade266"/>
              <line x1={wcX-comfort+2} y1={wcBowlY} x2={wcX-comfort+6} y2={wcBowlY} stroke="#5dade266"/>
              <line x1={wcX-comfort+2} y1={wcTankY+tankH} x2={wcX-comfort+6} y2={wcTankY+tankH} stroke="#5dade266"/>
              <text x={wcX-comfort+12} y={wcBowlY+WC_L*s/2} fill="#5dade2" fontSize={7} textAnchor="middle" transform={`rotate(-90,${wcX-comfort+12},${wcBowlY+WC_L*s/2})`}>{(WC_L*1000).toFixed(0)}</text>
              {/* Бачок (прямоугольный) */}
              <rect x={wcX} y={wcTankY} width={wcW} height={tankH} fill="#5dade233" stroke="#5dade2" strokeWidth={1} rx={2}/>
              {/* Чаша (овальная форма) */}
              <rect x={wcX} y={wcBowlY} width={wcW} height={bowlH} fill="#5dade233" stroke="#5dade2" strokeWidth={1.5} rx={wcW/2}/>
              <text x={wcX+wcW/2} y={wcBowlY+bowlH/2} textAnchor="middle" dominantBaseline="middle" fill="#5dade2" fontSize={7}>WC</text>
            </>;
          })()}
          {/* Расстояние между ванной и зоной комфорта унитаза */}
          {(()=>{
            const bathRight=p+(IWALL_X+IWALL_T+BATH_GAP+BATH_W)*s;
            const comfortLeft=p+(WC_RIGHT-WC_GAP_RIGHT-WC_W-0.25)*s;
            const dimY=p+(H-WC_GAP_BOT-WC_TANK/2)*s;
            const dist=((WC_RIGHT-WC_GAP_RIGHT-WC_W-0.25)-(IWALL_X+IWALL_T+BATH_GAP+BATH_W))*1000;
            return <>
              <line x1={bathRight} y1={dimY} x2={comfortLeft} y2={dimY} stroke="#5dade288"/>
              <line x1={bathRight} y1={dimY-2} x2={bathRight} y2={dimY+2} stroke="#5dade288"/>
              <line x1={comfortLeft} y1={dimY-2} x2={comfortLeft} y2={dimY+2} stroke="#5dade288"/>
              <text x={(bathRight+comfortLeft)/2} y={dimY-4} textAnchor="middle" fill="#5dade2" fontSize={8}>{dist.toFixed(0)}</text>
            </>;
          })()}
          {/* Расстояние между ванной и горизонтальной перегородкой */}
          {(()=>{
            const bathTop=p+(H-BATH_GAP-BATH_L)*s;
            const gklBottom=p+(H-IWALL_LEN+GKL_T)*s;
            const dimX=p+(IWALL_X+IWALL_T+BATH_GAP+BATH_W/2)*s;
            const dist=(H-BATH_GAP-BATH_L-(H-IWALL_LEN+GKL_T))*1000;
            return <>
              <line x1={dimX} y1={gklBottom} x2={dimX} y2={bathTop} stroke="#5dade288"/>
              <line x1={dimX-2} y1={gklBottom} x2={dimX+2} y2={gklBottom} stroke="#5dade288"/>
              <line x1={dimX-2} y1={bathTop} x2={dimX+2} y2={bathTop} stroke="#5dade288"/>
              <text x={dimX+4} y={(gklBottom+bathTop)/2+3} fill="#5dade2" fontSize={8}>{dist.toFixed(0)}</text>
            </>;
          })()}
          {/* Обозначение ванной комнаты */}
          <text x={p+(IWALL_X+IWALL_T+BATH_W+(COL_DIST+COL_W-GKL2_T-BATH_W)/2)*s} y={p+(H-(IWALL_LEN-GKL_T)/2)*s} textAnchor="middle" dominantBaseline="middle" fill="#5dade2" fontSize={11} fontWeight="bold">Ванная</text>
          {/* Колонна: на уровне торца стены, 2240мм от внутренней стены */}
          <rect x={p+(IWALL_X+IWALL_T+COL_DIST)*s} y={p+(H-IWALL_LEN)*s} width={COL_W*s} height={COL_H*s} fill="#e0e0e0" stroke="#888" strokeWidth={1}/>
          {/* Размеры от верхнего правого угла колонны до стен с засечками */}
          {/* До правой стены */}
          <line x1={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s} y1={p+(H-IWALL_LEN)*s} x2={p+W*s} y2={p+(H-IWALL_LEN)*s} stroke="#88888888"/>
          <line x1={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s} y1={p+(H-IWALL_LEN)*s-2} x2={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s} y2={p+(H-IWALL_LEN)*s+2} stroke="#88888888"/>
          <line x1={p+W*s} y1={p+(H-IWALL_LEN)*s-2} x2={p+W*s} y2={p+(H-IWALL_LEN)*s+2} stroke="#88888888"/>
          <text x={p+((IWALL_X+IWALL_T+COL_DIST+COL_W)+W)/2*s} y={p+(H-IWALL_LEN)*s-4} textAnchor="middle" fill="#888" fontSize={8}>{((W-IWALL_X-IWALL_T-COL_DIST-COL_W)*1000).toFixed(0)}</text>
          {/* До верхней стены */}
          <line x1={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s} y1={p} x2={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s} y2={p+(H-IWALL_LEN)*s} stroke="#88888888"/>
          <line x1={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s-2} y1={p} x2={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s+2} y2={p} stroke="#88888888"/>
          <line x1={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s-2} y1={p+(H-IWALL_LEN)*s} x2={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s+2} y2={p+(H-IWALL_LEN)*s} stroke="#88888888"/>
          <text x={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s+4} y={p+(H-IWALL_LEN)/2*s} fill="#888" fontSize={8}>{((H-IWALL_LEN)*1000).toFixed(0)}</text>
          {/* До нижней стены */}
          <line x1={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s} y1={p+(H-IWALL_LEN)*s} x2={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s} y2={p+H*s} stroke="#88888888"/>
          <line x1={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s-2} y1={p+(H-IWALL_LEN)*s} x2={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s+2} y2={p+(H-IWALL_LEN)*s} stroke="#88888888"/>
          <line x1={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s-2} y1={p+H*s} x2={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s+2} y2={p+H*s} stroke="#88888888"/>
          <text x={p+(IWALL_X+IWALL_T+COL_DIST+COL_W)*s+4} y={p+(H-IWALL_LEN+IWALL_LEN/2)*s} fill="#888" fontSize={8}>{(IWALL_LEN*1000).toFixed(0)}</text>
          {/* Размеры внутренней стены (слева) с засечками */}
          <line x1={p+IWALL_X*s-10} y1={p+(H-IWALL_LEN)*s} x2={p+IWALL_X*s-10} y2={p+H*s} stroke="#4fc3f788"/>
          <line x1={p+IWALL_X*s-12} y1={p+(H-IWALL_LEN)*s} x2={p+IWALL_X*s-8} y2={p+(H-IWALL_LEN)*s} stroke="#4fc3f788"/>
          <line x1={p+IWALL_X*s-12} y1={p+H*s} x2={p+IWALL_X*s-8} y2={p+H*s} stroke="#4fc3f788"/>
          <text x={p+IWALL_X*s-14} y={p+(H-IWALL_LEN/2)*s} textAnchor="end" fill="#4fc3f7" fontSize={9}>{(IWALL_LEN*1000).toFixed(0)}</text>
          {/* Расстояние от торца стены до проёма с засечками */}
          <line x1={p+IWALL_X*s-10} y1={pr.b} x2={p+IWALL_X*s-10} y2={p+(H-IWALL_LEN)*s} stroke="#4fc3f788"/>
          <line x1={p+IWALL_X*s-12} y1={pr.b} x2={p+IWALL_X*s-8} y2={pr.b} stroke="#4fc3f788"/>
          <line x1={p+IWALL_X*s-12} y1={p+(H-IWALL_LEN)*s} x2={p+IWALL_X*s-8} y2={p+(H-IWALL_LEN)*s} stroke="#4fc3f788"/>
          <text x={p+IWALL_X*s-14} y={(pr.b+p+(H-IWALL_LEN)*s)/2+3} textAnchor="end" fill="#4fc3f7" fontSize={9}>{((H-IWALL_LEN-PROEM_Y-PROEM_H)*1000).toFixed(0)}</text>
          {/* Расстояние от левой стены до внутренней стены с засечками */}
          <line x1={p} y1={p+CH+16} x2={p+IWALL_X*s} y2={p+CH+16} stroke="#4fc3f788"/>
          <line x1={p} y1={p+CH+14} x2={p} y2={p+CH+18} stroke="#4fc3f788"/>
          <line x1={p+IWALL_X*s} y1={p+CH+14} x2={p+IWALL_X*s} y2={p+CH+18} stroke="#4fc3f788"/>
          <text x={p+IWALL_X*s/2} y={p+CH+30} textAnchor="middle" fill="#4fc3f7" fontSize={9}>{IWALL_X*1000}</text>
          <line x1={p} y1={p-28} x2={p+CW} y2={p-28} stroke="#4fc3f7"/>
          <text x={p+CW/2} y={p-33} textAnchor="middle" fill="#4fc3f7" fontSize={13} fontWeight="bold">{W*1000}</text>
          <line x1={p-28} y1={p} x2={p-28} y2={p+CH} stroke="#4fc3f7"/>
          <text x={p-33} y={p+CH/2} textAnchor="middle" fill="#4fc3f7" fontSize={13} fontWeight="bold" transform={`rotate(-90,${p-33},${p+CH/2})`}>{H*1000}</text>
          {mouse&&<>
            <line x1={mouse.x} y1={p} x2={mouse.x} y2={p+CH} stroke="#4fc3f744" strokeDasharray="4"/>
            <line x1={p} y1={mouse.y} x2={p+CW} y2={mouse.y} stroke="#4fc3f744" strokeDasharray="4"/>
            <rect x={mouse.x+10} y={mouse.y-26} width={100} height={22} rx={4} fill="#000c"/>
            <text x={mouse.x+14} y={mouse.y-10} fill="#4fc3f7" fontSize={11}>{((mouse.x-p)/s*1000).toFixed(0)}×{((mouse.y-p)/s*1000).toFixed(0)}</text>
          </>}
          <defs><marker id="aF" viewBox="0 0 10 10" refX="10" refY="5" markerWidth={6} markerHeight={6} orient="auto"><path d="M0,1 L10,5 L0,9" fill="#ff9800"/></marker></defs>
        </svg>
      </div>
      <div style={{textAlign:"center",marginTop:16}}>
        <div style={{display:"inline-flex",gap:16,fontSize:12,color:"#888",flexWrap:"wrap",justifyContent:"center"}}>
          <span><span style={{color:"#ff9800"}}>▬ ▬</span> Проём</span>
          <span><span style={{color:"#2196f3"}}>▌</span> Вход</span>
          <span><span style={{color:"#4caf50"}}>▌</span> Выход / доб. ступень</span>
          <span><span style={{color:"#6a5acd"}}>■</span> Диван 3000×2050</span>
          <span><span style={{color:"#e91e63"}}>■</span> Проводка/трубы</span>
          <span><span style={{color:"#4fc3f7"}}>■</span> Окно</span>
          <span><span style={{color:"#a0a0a0"}}>▬ ▬</span> ГКЛ перегородка</span>
        </div>
      </div>
    </div>
  );
}
