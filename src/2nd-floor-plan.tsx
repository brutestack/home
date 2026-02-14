import { useState } from "react";
const S=70,WALL=4,W=9.4,H=5.4,CW=W*S,CH=H*S,PAD=60;
const PROEM_X=0,PROEM_Y=0.15,PROEM_W=3.0,PROEM_H=1.7;
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
      <p style={{textAlign:"center",color:"#888",margin:"0 0 16px",fontSize:14}}>{W}м × {H}м | Высота: 2.8м | Площадь: {(W*H).toFixed(1)}м²</p>
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
          <text x={pr.x+pr.w/2} y={pr.b+28} textAnchor="middle" fill="#ff9800" fontSize={10}>3.0м</text>
          <line x1={pr.r+16} y1={pr.y} x2={pr.r+16} y2={pr.b} stroke="#ff980088"/>
          <text x={pr.r+20} y={pr.y+pr.h/2+4} fill="#ff9800" fontSize={10}>1.7м</text>
          <line x1={p-12} y1={p} x2={p-12} y2={p+PROEM_Y*s} stroke="#ff980066"/>
          <text x={p-16} y={p+PROEM_Y*s/2+3} textAnchor="end" fill="#ff980099" fontSize={9}>0.15</text>
          <rect x={p} y={p} width={CW} height={CH} fill="none" stroke="#e0e0e0" strokeWidth={WALL}/>
          <line x1={p} y1={p-28} x2={p+CW} y2={p-28} stroke="#4fc3f7"/>
          <text x={p+CW/2} y={p-33} textAnchor="middle" fill="#4fc3f7" fontSize={13} fontWeight="bold">{W} м</text>
          <line x1={p-28} y1={p} x2={p-28} y2={p+CH} stroke="#4fc3f7"/>
          <text x={p-33} y={p+CH/2} textAnchor="middle" fill="#4fc3f7" fontSize={13} fontWeight="bold" transform={`rotate(-90,${p-33},${p+CH/2})`}>{H} м</text>
          {mouse&&<>
            <line x1={mouse.x} y1={p} x2={mouse.x} y2={p+CH} stroke="#4fc3f744" strokeDasharray="4"/>
            <line x1={p} y1={mouse.y} x2={p+CW} y2={mouse.y} stroke="#4fc3f744" strokeDasharray="4"/>
            <rect x={mouse.x+10} y={mouse.y-26} width={100} height={22} rx={4} fill="#000c"/>
            <text x={mouse.x+14} y={mouse.y-10} fill="#4fc3f7" fontSize={11}>{((mouse.x-p)/s).toFixed(2)}м × {((mouse.y-p)/s).toFixed(2)}м</text>
          </>}
          <defs><marker id="aF" viewBox="0 0 10 10" refX="10" refY="5" markerWidth={6} markerHeight={6} orient="auto"><path d="M0,1 L10,5 L0,9" fill="#ff9800"/></marker></defs>
        </svg>
      </div>
      <div style={{textAlign:"center",marginTop:16}}>
        <div style={{display:"inline-flex",gap:16,fontSize:12,color:"#888",flexWrap:"wrap",justifyContent:"center"}}>
          <span><span style={{color:"#ff9800"}}>▬ ▬</span> Проём</span>
          <span><span style={{color:"#2196f3"}}>▌</span> Вход</span>
          <span><span style={{color:"#4caf50"}}>▌</span> Выход / доб. ступень</span>
        </div>
      </div>
    </div>
  );
}
