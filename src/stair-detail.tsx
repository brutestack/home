import { useState } from "react";
const PROEM_W=3.0,PROEM_H=1.7,PLAT_X=0.05,PLAT_W=0.75,MARCH_W=PROEM_H/2;
const M1_STEPS=5,M2_STEPS=8,TREAD=0.25,DOBOR_TREAD=0.20;
const M1_LEN=M1_STEPS*TREAD,M2_LEN=M2_STEPS*TREAD,M2_FULL=M2_LEN+DOBOR_TREAD;
const MX=PLAT_X+PLAT_W,TOTAL_RISES=16,RISE_H=187.5,RISE_M=RISE_H/1000;
const R=(x,y,w,h,sc,pdX,pdY=pdX)=>({x:pdX+x*sc,y:pdY+y*sc,w:w*sc,h:h*sc,r:pdX+(x+w)*sc,b:pdY+(y+h)*sc});

function TopView(){
  const [mouse,setMouse]=useState(null);
  const DS=100;
  const padL=50,padT=85,padR=95,padB=65;
  const pr=R(0,0,PROEM_W,PROEM_H,DS,padL,padT);
  const pl1=R(PLAT_X,0,PLAT_W,MARCH_W,DS,padL,padT);
  const pl2=R(PLAT_X,MARCH_W,PLAT_W,MARCH_W,DS,padL,padT);
  const m1=R(MX,0,M1_LEN,MARCH_W,DS,padL,padT);
  const m2=R(MX,MARCH_W,M2_FULL,MARCH_W,DS,padL,padT);
  const svgW=pr.r+padR,svgH=pr.b+padB;
  return(
    <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{width:1000,height:"auto",background:"#16213e",borderRadius:8}}
      onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();const scale=svgW/r.width;const x=(e.clientX-r.left)*scale,y=(e.clientY-r.top)*scale;if(x>=pr.x&&x<=pr.r&&y>=pr.y&&y<=pr.b)setMouse({x,y});else setMouse(null);}}
      onMouseLeave={()=>setMouse(null)}>
      <text x={svgW/2} y={20} textAnchor="middle" fill="#e0e0e0" fontSize={14} fontWeight="bold">Л2.Сх1 — Лестница: Вид сверху (план)</text>
      <rect x={pr.x} y={pr.y} width={pr.w} height={pr.h} fill="#0d1520" stroke="#ff9800" strokeWidth={2} strokeDasharray="6 3"/>
      <rect x={pl1.x} y={pl1.y} width={pl1.w} height={pl1.h} fill="#1a1200" stroke="#ff980055"/>
      <rect x={pl2.x} y={pl2.y} width={pl2.w} height={pl2.h} fill="#2a1e00" stroke="#ff980077"/>
      <text x={pl1.x+pl1.w/2} y={pl1.y+pl1.h/2} textAnchor="middle" dominantBaseline="middle" fill="#ff9800" fontSize={9} transform={`rotate(-90,${pl1.x+pl1.w/2},${pl1.y+pl1.h/2})`}>площ.▽</text>
      <text x={pl2.x+pl2.w/2} y={pl2.y+pl2.h/2} textAnchor="middle" dominantBaseline="middle" fill="#ff9800" fontSize={9} transform={`rotate(-90,${pl2.x+pl2.w/2},${pl2.y+pl2.h/2})`}>площ.△</text>
      <line x1={pl1.x+2} y1={pl1.b} x2={pl1.r-2} y2={pl1.b} stroke="#ff9800" strokeWidth={2}/>
      {Array.from({length:M1_STEPS},(_,i)=>{const sw=m1.w/M1_STEPS;return <g key={`d1${i}`}>
        <rect x={m1.x+(M1_STEPS-1-i)*sw} y={m1.y} width={sw-1} height={m1.h} fill={`rgba(255,152,0,${.06+i*.03})`} stroke="#ff980044" strokeWidth={.5}/>
        <text x={m1.x+(M1_STEPS-1-i)*sw+sw/2} y={m1.y+m1.h/2+4} textAnchor="middle" fill="#ff9800" fontSize={9}>{i+1}</text>
      </g>;})}
      {Array.from({length:M2_STEPS},(_,i)=>{const sw=M2_LEN*DS/M2_STEPS;const bx=padL+MX*DS;return <g key={`d2${i}`}>
        <rect x={bx+i*sw} y={m2.y} width={sw-1} height={m2.h} fill={`rgba(255,152,0,${.06+i*.025})`} stroke="#ff980044" strokeWidth={.5}/>
        <text x={bx+i*sw+sw/2} y={m2.y+m2.h/2+4} textAnchor="middle" fill="#ff9800" fontSize={9}>{M1_STEPS+2+1+i}</text>
      </g>;})}
      {(()=>{const dx=padL+(MX+M2_LEN)*DS;const dw=DOBOR_TREAD*DS;return <g>
        <rect x={dx} y={m2.y} width={dw-1} height={m2.h} fill="rgba(76,175,80,0.15)" stroke="#4caf50" strokeWidth={1.5}/>
        <text x={dx+dw/2} y={m2.y+m2.h/2+4} textAnchor="middle" fill="#4caf50" fontSize={8} fontWeight="bold">{M1_STEPS+2+M2_STEPS+1}</text>
        <text x={dx+dw/2} y={m2.y-6} textAnchor="middle" fill="#4caf50" fontSize={7}>доб.200</text>
        <line x1={dx} y1={m2.b+40} x2={dx+dw} y2={m2.b+40} stroke="#4caf50"/>
        <text x={dx+dw/2} y={m2.b+54} textAnchor="middle" fill="#4caf50" fontSize={8}>200</text>
      </g>;})()}
      <line x1={m1.r-5} y1={m1.y-8} x2={m1.x+5} y2={m1.y-8} stroke="#ff9800" markerEnd="url(#aD)"/>
      <line x1={m2.x+5} y1={m2.b+10} x2={m2.r-5} y2={m2.b+10} stroke="#ff9800" markerEnd="url(#aD)"/>
      {(()=>{const lx=pr.x+0.05*DS;return <>
        <line x1={lx} y1={pr.y-10} x2={lx} y2={pr.b+10} stroke="#e74c3c88" strokeWidth={1} strokeDasharray="4 3"/>
        <line x1={pr.x} y1={pr.b+6} x2={lx} y2={pr.b+6} stroke="#e74c3c88"/>
        <text x={(pr.x+lx)/2} y={pr.b+18} textAnchor="middle" fill="#e74c3c" fontSize={8}>50</text>
      </>;})()}
      {(()=>{const shx=pr.r-0.2*DS;const s1r=padL+MX*DS+M1_LEN*DS;const dimY=m1.y-32;return <>
        <line x1={s1r} y1={dimY} x2={shx} y2={dimY} stroke="#e74c3c"/>
        <text x={(s1r+shx)/2} y={dimY-4} textAnchor="middle" fill="#e74c3c" fontSize={8}>{Math.round((PROEM_W-0.2-MX-M1_LEN)*1000)}</text>
      </>;})()}
      {(()=>{const lx=pr.r-0.2*DS;return <>
        <line x1={lx} y1={pr.y-10} x2={lx} y2={pr.b+10} stroke="#e74c3c88" strokeWidth={1} strokeDasharray="4 3"/>
        <line x1={lx} y1={pr.y-6} x2={pr.r} y2={pr.y-6} stroke="#e74c3c88"/>
        <text x={(lx+pr.r)/2} y={pr.y-10} textAnchor="middle" fill="#e74c3c" fontSize={8}>200</text>
      </>;})()}
      {(()=>{const dx=padL+(MX+M2_LEN+DOBOR_TREAD)*DS;return <>
        <line x1={dx} y1={pr.y-14} x2={dx} y2={pr.b+60} stroke="#4caf5066" strokeWidth={1} strokeDasharray="3 2"/>
        <text x={dx+4} y={pr.y-4} fill="#4caf50" fontSize={7}>= край проёма</text>
      </>;})()}
      {/* Размеры проёма */}
      <line x1={pr.x} y1={pr.y-30} x2={pr.r} y2={pr.y-30} stroke="#e0e0e0"/>
      <line x1={pr.x} y1={pr.y-32} x2={pr.x} y2={pr.y-28} stroke="#e0e0e0"/>
      <line x1={pr.r} y1={pr.y-32} x2={pr.r} y2={pr.y-28} stroke="#e0e0e0"/>
      <text x={pr.x+pr.w/2} y={pr.y-34} textAnchor="middle" fill="#e0e0e0" fontSize={10} fontWeight="bold">3000</text>
      <line x1={pr.r+14} y1={pr.y} x2={pr.r+14} y2={pr.b} stroke="#e0e0e0"/>
      <line x1={pr.r+12} y1={pr.y} x2={pr.r+16} y2={pr.y} stroke="#e0e0e0"/>
      <line x1={pr.r+12} y1={pr.b} x2={pr.r+16} y2={pr.b} stroke="#e0e0e0"/>
      <text x={pr.r+18} y={pr.y+pr.h/2+4} fill="#e0e0e0" fontSize={10} fontWeight="bold">1700</text>
      {/* Ширина площадки */}
      <line x1={pl1.x} y1={pl2.b+24} x2={pl1.r} y2={pl2.b+24} stroke="#4fc3f7"/>
      <line x1={pl1.x} y1={pl2.b+22} x2={pl1.x} y2={pl2.b+26} stroke="#4fc3f7"/>
      <line x1={pl1.r} y1={pl2.b+22} x2={pl1.r} y2={pl2.b+26} stroke="#4fc3f7"/>
      <text x={pl1.x+pl1.w/2} y={pl2.b+38} textAnchor="middle" fill="#4fc3f7" fontSize={9}>{PLAT_W*1000}</text>
      {/* Глубина площадок */}
      <line x1={pl1.x-14} y1={pl1.y} x2={pl1.x-14} y2={pl1.b} stroke="#4fc3f7"/>
      <line x1={pl1.x-16} y1={pl1.y} x2={pl1.x-12} y2={pl1.y} stroke="#4fc3f7"/>
      <line x1={pl1.x-16} y1={pl1.b} x2={pl1.x-12} y2={pl1.b} stroke="#4fc3f7"/>
      <text x={pl1.x-18} y={pl1.y+pl1.h/2+3} textAnchor="end" fill="#4fc3f7" fontSize={8}>{MARCH_W*1000}</text>
      <line x1={pl2.x-24} y1={pl2.y} x2={pl2.x-24} y2={pl2.b} stroke="#4fc3f7"/>
      <line x1={pl2.x-26} y1={pl2.y} x2={pl2.x-22} y2={pl2.y} stroke="#4fc3f7"/>
      <line x1={pl2.x-26} y1={pl2.b} x2={pl2.x-22} y2={pl2.b} stroke="#4fc3f7"/>
      <text x={pl2.x-28} y={pl2.y+pl2.h/2+3} textAnchor="end" fill="#4fc3f7" fontSize={8}>{MARCH_W*1000}</text>
      {/* Размер проступи */}
      {(()=>{const sw=m1.w/M1_STEPS;const sx=m1.x+(M1_STEPS-1)*sw;return <>
        <line x1={sx} y1={m1.b+14} x2={sx+sw} y2={m1.b+14} stroke="#4fc3f7"/>
        <line x1={sx} y1={m1.b+12} x2={sx} y2={m1.b+16} stroke="#4fc3f7"/>
        <line x1={sx+sw} y1={m1.b+12} x2={sx+sw} y2={m1.b+16} stroke="#4fc3f7"/>
        <text x={sx+sw/2} y={m1.b+26} textAnchor="middle" fill="#4fc3f7" fontSize={8}>{TREAD*1000}</text>
      </>;})()}
      {/* Длина марша 1 */}
      <line x1={m1.x} y1={m1.y-18} x2={m1.r} y2={m1.y-18} stroke="#4fc3f7"/>
      <line x1={m1.x} y1={m1.y-20} x2={m1.x} y2={m1.y-16} stroke="#4fc3f7"/>
      <line x1={m1.r} y1={m1.y-20} x2={m1.r} y2={m1.y-16} stroke="#4fc3f7"/>
      <text x={m1.x+m1.w/2} y={m1.y-22} textAnchor="middle" fill="#4fc3f7" fontSize={9}>{M1_LEN*1000}</text>
      {/* Длина марша 2 */}
      <line x1={m2.x} y1={m2.b+24} x2={m2.r} y2={m2.b+24} stroke="#4fc3f7"/>
      <line x1={m2.x} y1={m2.b+22} x2={m2.x} y2={m2.b+26} stroke="#4fc3f7"/>
      <line x1={m2.r} y1={m2.b+22} x2={m2.r} y2={m2.b+26} stroke="#4fc3f7"/>
      <text x={m2.x+m2.w/2} y={m2.b+38} textAnchor="middle" fill="#4fc3f7" fontSize={9}>{M2_FULL*1000}</text>
      <line x1={m1.r} y1={m1.y+2} x2={m1.r} y2={m1.b-2} stroke="#2196f3" strokeWidth={3}/>
      <line x1={m2.r} y1={m2.y+2} x2={m2.r} y2={m2.b-2} stroke="#4caf50" strokeWidth={3}/>
      {mouse&&<>
        <line x1={mouse.x} y1={pr.y} x2={mouse.x} y2={pr.b} stroke="#4fc3f744" strokeDasharray="4"/>
        <line x1={pr.x} y1={mouse.y} x2={pr.r} y2={mouse.y} stroke="#4fc3f744" strokeDasharray="4"/>
        <rect x={mouse.x+8} y={mouse.y-20} width={90} height={18} rx={3} fill="#000c"/>
        <text x={mouse.x+12} y={mouse.y-6} fill="#4fc3f7" fontSize={9}>{Math.round((mouse.x-(pr.x+PLAT_X*DS))/DS*1000)}×{Math.round((mouse.y-pr.y)/DS*1000)} мм</text>
      </>}
      <defs><marker id="aD" viewBox="0 0 10 10" refX="10" refY="5" markerWidth={6} markerHeight={6} orient="auto"><path d="M0,1 L10,5 L0,9" fill="#ff9800"/></marker></defs>
    </svg>
  );
}

function SideView(){
  const [mouse,setMouse]=useState(null);
  const SW=480,SH=360,SP=50;
  const scX=(SW-SP*2)/PROEM_W,scY=(SH-SP*2)/3.0;
  const bY=SH-SP,tY=SP,x0=SP;
  return(
    <svg viewBox={`0 0 ${SW} ${SH}`} style={{width:1000,height:"auto",background:"#16213e",borderRadius:8}}
      onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();const scale=SW/r.width;const x=(e.clientX-r.left)*scale,y=(e.clientY-r.top)*scale;if(x>=x0&&x<=x0+PROEM_W*scX&&y>=tY&&y<=bY)setMouse({x,y});else setMouse(null);}}
      onMouseLeave={()=>setMouse(null)}>
      <text x={SW/2} y={20} textAnchor="middle" fill="#e0e0e0" fontSize={14} fontWeight="bold">Л2.Сх2 — Лестница: Вид сбоку</text>
      <line x1={20} y1={bY} x2={SW-20} y2={bY} stroke="#e0e0e0" strokeWidth={2}/>
      <text x={16} y={bY+4} textAnchor="end" fill="#888" fontSize={9}>1эт</text>
      <line x1={20} y1={tY} x2={SW-20} y2={tY} stroke="#e0e0e0" strokeWidth={2} strokeDasharray="6 3"/>
      <text x={16} y={tY+4} textAnchor="end" fill="#888" fontSize={9}>2эт</text>
      {(()=>{const y=bY-2.0*scY;return <>
        <line x1={20} y1={y} x2={SW-20} y2={y} stroke="#e74c3c" strokeWidth={1} strokeDasharray="6 3"/>
        <text x={16} y={y+4} textAnchor="end" fill="#e74c3c" fontSize={9}>2м</text>
      </>;})()}
      <line x1={SW-25} y1={tY} x2={SW-25} y2={bY} stroke="#4fc3f7"/>
      <line x1={SW-27} y1={tY} x2={SW-23} y2={tY} stroke="#4fc3f7"/>
      <line x1={SW-27} y1={bY} x2={SW-23} y2={bY} stroke="#4fc3f7"/>
      <text x={SW-12} y={(tY+bY)/2} fill="#4fc3f7" fontSize={10} transform={`rotate(-90,${SW-12},${(tY+bY)/2})`}>3000</text>
      {(()=>{const pt=8;const prR=x0+PROEM_W*scX;const redLine=x0+PLAT_X*scX;const dobEnd=x0+(MX+M2_LEN+DOBOR_TREAD)*scX;const dist=Math.round((MX+M2_LEN+DOBOR_TREAD-PLAT_X)*1000);return <>
        <rect x={prR} y={tY} width={SW-SP-prR+10} height={pt} fill="#555" stroke="#888" strokeWidth={0.5}/>
        <rect x={10} y={tY} width={x0-10} height={pt} fill="#555" stroke="#888" strokeWidth={0.5}/>
        <line x1={redLine} y1={tY-4} x2={dobEnd} y2={tY-4} stroke="#4fc3f7" strokeWidth={1}/>
        <line x1={redLine} y1={tY-6} x2={redLine} y2={tY-2} stroke="#4fc3f7"/>
        <line x1={dobEnd} y1={tY-6} x2={dobEnd} y2={tY-2} stroke="#4fc3f7"/>
        <text x={(redLine+dobEnd)/2} y={tY-8} textAnchor="middle" fill="#4fc3f7" fontSize={8}>{dist}</text>
      </>;})()}
      {/* Марш 1 */}
      {Array.from({length:M1_STEPS},(_,i)=>{
        const sx=MX+(M1_STEPS-1-i)*TREAD;const sy=(i+1)*RISE_M;
        const px1=x0+sx*scX,px2=x0+(sx+TREAD)*scX;
        const py=bY-sy*scY;
        return <g key={`sb1${i}`}>
          <line x1={px1} y1={py} x2={px2} y2={py} stroke="#ff9800" strokeWidth={1.5}/>
          <line x1={px2} y1={py} x2={px2} y2={bY-i*RISE_M*scY} stroke="#ff9800" strokeWidth={1.5}/>
          <text x={(px1+px2)/2} y={py-3} textAnchor="middle" fill="#ff980088" fontSize={7}>{i+1}</text>
        </g>;
      })}
      {/* Площадка нижняя */}
      {(()=>{const py=bY-(M1_STEPS+1)*RISE_M*scY;const pyP=bY-M1_STEPS*RISE_M*scY;const px1=x0+PLAT_X*scX;const px2=x0+MX*scX;return <g>
        <line x1={px1} y1={py} x2={px2} y2={py} stroke="#ffab40" strokeWidth={2.5}/>
        <line x1={px2} y1={py} x2={px2} y2={pyP} stroke="#ffab40" strokeWidth={1.5}/>
        <text x={(px1+px2)/2} y={py-4} textAnchor="middle" fill="#ffab40" fontSize={7}>пл.▽</text>
      </g>;})()}
      {/* Площадка верхняя */}
      {(()=>{const py=bY-(M1_STEPS+2)*RISE_M*scY;const pyP=bY-(M1_STEPS+1)*RISE_M*scY;const px1=x0+PLAT_X*scX;const px2=x0+MX*scX;return <g>
        <line x1={px1} y1={py} x2={px2} y2={py} stroke="#ffab40" strokeWidth={2.5}/>
        <line x1={px1} y1={py} x2={px1} y2={pyP} stroke="#ffab40" strokeWidth={1.5}/>
        <line x1={px2} y1={py} x2={px2} y2={pyP} stroke="#ffab40" strokeWidth={1.5}/>
        <text x={(px1+px2)/2} y={py-4} textAnchor="middle" fill="#ffab40" fontSize={7}>пл.△</text>
      </g>;})()}
      {/* Марш 2 */}
      {Array.from({length:M2_STEPS},(_,i)=>{
        const sx=MX+i*TREAD;const n=M1_STEPS+2+i+1;const sy=n*RISE_M;
        const px1=x0+sx*scX,px2=x0+(sx+TREAD)*scX;
        const py=bY-sy*scY;const pyP=bY-(n-1)*RISE_M*scY;
        return <g key={`sb2${i}`}>
          <line x1={px1} y1={py} x2={px2} y2={py} stroke="#ff9800" strokeWidth={1.5}/>
          <line x1={px1} y1={py} x2={px1} y2={pyP} stroke="#ff9800" strokeWidth={1.5}/>
          <text x={(px1+px2)/2} y={py-3} textAnchor="middle" fill="#ff980088" fontSize={7}>{n}</text>
        </g>;
      })}
      {/* Доборная */}
      {(()=>{const sx=MX+M2_LEN;const n=TOTAL_RISES;const sy=n*RISE_M;
        const px1=x0+sx*scX,px2=x0+(sx+DOBOR_TREAD)*scX;
        const py=bY-sy*scY;const pyP=bY-(n-1)*RISE_M*scY;
        return <g>
          <line x1={px1} y1={py} x2={px2} y2={py} stroke="#4caf50" strokeWidth={2}/>
          <line x1={px1} y1={py} x2={px1} y2={pyP} stroke="#4caf50" strokeWidth={2}/>
          <text x={(px1+px2)/2} y={py-4} textAnchor="middle" fill="#4caf50" fontSize={7} fontWeight="bold">доб.</text>
        </g>;
      })()}
      {/* Пунктир ст.13 */}
      {(()=>{const sx=MX+(13-M1_STEPS-2-1)*TREAD;const px=x0+sx*scX;
        return <line x1={px} y1={bY-13*RISE_M*scY} x2={px} y2={bY} stroke="#e74c3c" strokeWidth={1} strokeDasharray="4 3" opacity={0.6}/>;
      })()}
      {/* Пунктир доборная */}
      {(()=>{const px=x0+(MX+M2_LEN)*scX;
        return <line x1={px} y1={bY-TOTAL_RISES*RISE_M*scY} x2={px} y2={bY} stroke="#4caf50" strokeWidth={1} strokeDasharray="4 3" opacity={0.6}/>;
      })()}
      {/* Пунктир 50мм */}
      {(()=>{const px=x0+0.05*scX;return <>
        <line x1={px} y1={tY-12} x2={px} y2={bY} stroke="#e74c3c88" strokeWidth={1} strokeDasharray="4 3"/>
        <line x1={x0} y1={tY+12} x2={px} y2={tY+12} stroke="#e74c3c"/>
        <line x1={x0} y1={tY+10} x2={x0} y2={tY+14} stroke="#e74c3c"/>
        <line x1={px} y1={tY+10} x2={px} y2={tY+14} stroke="#e74c3c"/>
        <text x={(x0+px)/2} y={tY+22} textAnchor="middle" fill="#e74c3c" fontSize={7}>50</text>
      </>;})()}
      {/* Человек */}
      {(()=>{
        const st13x=x0+(MX+(13-M1_STEPS-2-1)*TREAD)*scX;
        const dobx=x0+(MX+M2_LEN)*scX;
        const manCx=(st13x+dobx)/2;const hPx=1.8*scY;const wPx=0.5*scX;
        const mB=bY,mT=bY-hPx;const hw=wPx/2;
        const sh=hPx*0.1,bh2=hPx*0.45,aY=mT+sh+bh2*0.2;
        return <g opacity={0.7}>
          <circle cx={manCx} cy={mT+sh*0.45} r={sh*0.45} fill="none" stroke="#4fc3f7" strokeWidth={1.2}/>
          <line x1={manCx} y1={mT+sh} x2={manCx} y2={mT+sh+bh2} stroke="#4fc3f7" strokeWidth={1.2}/>
          <line x1={manCx-hw} y1={aY+bh2*0.25} x2={manCx} y2={aY} stroke="#4fc3f7" strokeWidth={1}/>
          <line x1={manCx+hw} y1={aY+bh2*0.25} x2={manCx} y2={aY} stroke="#4fc3f7" strokeWidth={1}/>
          <line x1={manCx} y1={mT+sh+bh2} x2={manCx-hw*0.5} y2={mB} stroke="#4fc3f7" strokeWidth={1.2}/>
          <line x1={manCx} y1={mT+sh+bh2} x2={manCx+hw*0.5} y2={mB} stroke="#4fc3f7" strokeWidth={1.2}/>
          <text x={manCx} y={mT-4} textAnchor="middle" fill="#4fc3f7" fontSize={7}>180см</text>
        </g>;
      })()}
      {/* Размеры */}
      {(()=>{
        const plL=x0+PLAT_X*scX,plR=x0+MX*scX;
        const dL=x0+(MX+M2_LEN)*scX,dR=x0+(MX+M2_LEN+DOBOR_TREAD)*scX;
        const plDimY=bY-(M1_STEPS+0.5)*RISE_M*scY;
        return <>
          <line x1={plL} y1={plDimY} x2={plR} y2={plDimY} stroke="#4fc3f7"/>
          <line x1={plL} y1={plDimY-2} x2={plL} y2={plDimY+2} stroke="#4fc3f7"/>
          <line x1={plR} y1={plDimY-2} x2={plR} y2={plDimY+2} stroke="#4fc3f7"/>
          <text x={(plL+plR)/2} y={plDimY+12} textAnchor="middle" fill="#4fc3f7" fontSize={7}>{PLAT_W*1000}</text>
          <line x1={dL} y1={tY+14} x2={dR} y2={tY+14} stroke="#4caf50"/>
          <line x1={dL} y1={tY+12} x2={dL} y2={tY+16} stroke="#4caf50"/>
          <line x1={dR} y1={tY+12} x2={dR} y2={tY+16} stroke="#4caf50"/>
          <text x={(dL+dR)/2} y={tY+26} textAnchor="middle" fill="#4caf50" fontSize={7}>{DOBOR_TREAD*1000}</text>
        </>;
      })()}
      {/* Размер ступени м1 */}
      {(()=>{const sx=MX+(M1_STEPS-1)*TREAD;const px1=x0+sx*scX,px2=x0+(sx+TREAD)*scX;const py=bY-RISE_M*scY;return <>
        <line x1={px1} y1={py+2} x2={px2} y2={py+2} stroke="#4fc3f7" strokeWidth={0.5}/>
        <line x1={px1} y1={py} x2={px1} y2={py+4} stroke="#4fc3f7" strokeWidth={0.5}/>
        <line x1={px2} y1={py} x2={px2} y2={py+4} stroke="#4fc3f7" strokeWidth={0.5}/>
        <text x={(px1+px2)/2} y={py+12} textAnchor="middle" fill="#4fc3f7" fontSize={6}>{TREAD*1000}</text>
        <line x1={px2+2} y1={py} x2={px2+2} y2={bY} stroke="#4fc3f7" strokeWidth={0.5}/>
        <line x1={px2} y1={py} x2={px2+4} y2={py} stroke="#4fc3f7" strokeWidth={0.5}/>
        <line x1={px2} y1={bY} x2={px2+4} y2={bY} stroke="#4fc3f7" strokeWidth={0.5}/>
        <text x={px2+6} y={(py+bY)/2+3} fill="#4fc3f7" fontSize={6}>{RISE_H}</text>
      </>;})()}
      {/* Размер ступени м2 */}
      {(()=>{const n=M1_STEPS+2+1;const sy=n*RISE_M;const syP=(n-1)*RISE_M;
        const px1=x0+MX*scX,px2=x0+(MX+TREAD)*scX;const py=bY-sy*scY;const pyP=bY-syP*scY;
        return <>
          <line x1={px1-2} y1={py} x2={px1-2} y2={pyP} stroke="#4fc3f7" strokeWidth={0.5}/>
          <line x1={px1-4} y1={py} x2={px1} y2={py} stroke="#4fc3f7" strokeWidth={0.5}/>
          <line x1={px1-4} y1={pyP} x2={px1} y2={pyP} stroke="#4fc3f7" strokeWidth={0.5}/>
          <text x={px1-6} y={(py+pyP)/2+3} textAnchor="end" fill="#4fc3f7" fontSize={6}>{RISE_H}</text>
          <line x1={px1} y1={pyP-2} x2={px2} y2={pyP-2} stroke="#4fc3f7" strokeWidth={0.5}/>
          <line x1={px1} y1={pyP-4} x2={px1} y2={pyP} stroke="#4fc3f7" strokeWidth={0.5}/>
          <line x1={px2} y1={pyP-4} x2={px2} y2={pyP} stroke="#4fc3f7" strokeWidth={0.5}/>
          <text x={(px1+px2)/2} y={pyP-6} textAnchor="middle" fill="#4fc3f7" fontSize={6}>{TREAD*1000}</text>
        </>;
      })()}
      {mouse&&<>
        <line x1={mouse.x} y1={tY} x2={mouse.x} y2={bY} stroke="#4fc3f744" strokeDasharray="4"/>
        <line x1={x0} y1={mouse.y} x2={x0+PROEM_W*scX} y2={mouse.y} stroke="#4fc3f744" strokeDasharray="4"/>
        <rect x={mouse.x+8} y={mouse.y-20} width={110} height={18} rx={3} fill="#000c"/>
        <text x={mouse.x+12} y={mouse.y-6} fill="#4fc3f7" fontSize={9}>{Math.round((mouse.x-(x0+PLAT_X*scX))/scX*1000)}мм | h:{Math.round((bY-mouse.y)/scY*1000)}мм</text>
      </>}
    </svg>
  );
}

function SectionView(){
  const [mouse,setMouse]=useState(null);
  const SW=580,SH=320,BY=280,TY=40,rPx=(BY-TY)/TOTAL_RISES;
  return(
    <svg viewBox={`0 0 ${SW} ${SH}`} style={{width:1000,height:"auto",background:"#16213e",borderRadius:8}}
      onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();const scale=SW/r.width;const x=(e.clientX-r.left)*scale,y=(e.clientY-r.top)*scale;if(x>=20&&x<=560&&y>=TY&&y<=BY)setMouse({x,y});else setMouse(null);}}
      onMouseLeave={()=>setMouse(null)}>
      <text x={SW/2} y={20} textAnchor="middle" fill="#e0e0e0" fontSize={14} fontWeight="bold">Л2.Сх3 — Лестница: Разрез (развёртка)</text>
      <line x1={20} y1={BY} x2={560} y2={BY} stroke="#e0e0e0" strokeWidth={2}/>
      <text x={16} y={BY+4} textAnchor="end" fill="#888" fontSize={9}>1эт</text>
      <line x1={20} y1={TY} x2={560} y2={TY} stroke="#e0e0e0" strokeWidth={2} strokeDasharray="6 3"/>
      <text x={16} y={TY+4} textAnchor="end" fill="#888" fontSize={9}>2эт</text>
      {(()=>{const y=BY-(2000/3000)*(BY-TY);return <>
        <line x1={20} y1={y} x2={560} y2={y} stroke="#e74c3c" strokeWidth={1} strokeDasharray="6 3"/>
        <text x={16} y={y+4} textAnchor="end" fill="#e74c3c" fontSize={9}>2м</text>
      </>;})()}
      <line x1={563} y1={TY} x2={563} y2={BY} stroke="#4fc3f7"/>
      <line x1={561} y1={TY} x2={565} y2={TY} stroke="#4fc3f7"/>
      <line x1={561} y1={BY} x2={565} y2={BY} stroke="#4fc3f7"/>
      <text x={575} y={(TY+BY)/2} fill="#4fc3f7" fontSize={10} transform={`rotate(-90,575,${(TY+BY)/2})`}>3000</text>
      {(()=>{
        const els=[];const sPx=22,pPx=30;let cx=40,cy=BY,n=0;
        for(let i=0;i<M1_STEPS;i++){n++;els.push(<g key={`r${n}`}><line x1={cx} y1={cy} x2={cx} y2={cy-rPx} stroke="#ff9800" strokeWidth={1.5}/><line x1={cx} y1={cy-rPx} x2={cx+sPx} y2={cy-rPx} stroke="#ff9800" strokeWidth={1.5}/><text x={cx+sPx/2} y={cy-rPx-3} textAnchor="middle" fill="#ff980088" fontSize={7}>{n}</text></g>);cx+=sPx;cy-=rPx;}
        n++;els.push(<g key={`r${n}`}><line x1={cx} y1={cy} x2={cx} y2={cy-rPx} stroke="#ffab40" strokeWidth={1.5}/><line x1={cx} y1={cy-rPx} x2={cx+pPx} y2={cy-rPx} stroke="#ffab40" strokeWidth={2.5}/><text x={cx+pPx/2} y={cy-rPx-4} textAnchor="middle" fill="#ffab40" fontSize={7}>пл.▽</text><line x1={cx+pPx} y1={cy-rPx} x2={550} y2={cy-rPx} stroke="#ffab4033" strokeDasharray="2"/><text x={550} y={cy-rPx+4} textAnchor="end" fill="#ffab40" fontSize={7}>{Math.round(n*RISE_H)}мм</text></g>);cx+=pPx;cy-=rPx;
        n++;els.push(<g key={`r${n}`}><line x1={cx} y1={cy} x2={cx} y2={cy-rPx} stroke="#ffab40" strokeWidth={1.5}/><line x1={cx} y1={cy-rPx} x2={cx+pPx} y2={cy-rPx} stroke="#ffab40" strokeWidth={2.5}/><text x={cx+pPx/2} y={cy-rPx-4} textAnchor="middle" fill="#ffab40" fontSize={7}>пл.△</text><line x1={cx+pPx} y1={cy-rPx} x2={550} y2={cy-rPx} stroke="#ffab4033" strokeDasharray="2"/><text x={550} y={cy-rPx+4} textAnchor="end" fill="#ffab40" fontSize={7}>{Math.round(n*RISE_H)}мм</text></g>);cx+=pPx;cy-=rPx;
        els.push(<g key="turn"><text x={cx+2} y={cy+5} fill="#ff980066" fontSize={14}>↩</text></g>);cx+=16;
        let s13x=0;
        for(let i=0;i<M2_STEPS;i++){n++;if(n===13)s13x=cx;els.push(<g key={`r${n}`}><line x1={cx} y1={cy} x2={cx} y2={cy-rPx} stroke="#ff9800" strokeWidth={1.5}/><line x1={cx} y1={cy-rPx} x2={cx+sPx} y2={cy-rPx} stroke="#ff9800" strokeWidth={1.5}/><text x={cx+sPx/2} y={cy-rPx-3} textAnchor="middle" fill="#ff980088" fontSize={7}>{n}</text>{n===13&&<line x1={cx} y1={cy} x2={cx} y2={BY} stroke="#e74c3c" strokeWidth={1} strokeDasharray="4 3" opacity={0.6}/>}</g>);cx+=sPx;cy-=rPx;}
        n++;els.push(<g key={`r${n}`}><line x1={cx} y1={cy} x2={cx} y2={cy-rPx} stroke="#4caf50" strokeWidth={2}/><line x1={cx} y1={cy-rPx} x2={cx+sPx*0.8} y2={cy-rPx} stroke="#4caf50" strokeWidth={2}/><text x={cx+sPx*0.4} y={cy-rPx-4} textAnchor="middle" fill="#4caf50" fontSize={7} fontWeight="bold">доб.</text><line x1={cx+sPx*0.8} y1={cy-rPx} x2={550} y2={cy-rPx} stroke="#4caf5044" strokeDasharray="2"/><text x={550} y={cy-rPx+4} textAnchor="end" fill="#4caf50" fontSize={7}>{Math.round(n*RISE_H)}мм</text><line x1={cx} y1={cy} x2={cx} y2={BY} stroke="#4caf50" strokeWidth={1} strokeDasharray="4 3" opacity={0.6}/></g>);cx+=sPx*0.8;cy-=rPx;
        els.push(<g key="f2"><line x1={cx} y1={cy} x2={cx+28} y2={cy} stroke="#4caf50" strokeWidth={2}/><text x={cx+32} y={cy+4} fill="#4caf50" fontSize={8}>пол 2эт</text></g>);
        const dX=cx-sPx*0.8;const hM=(1800/3000)*(BY-TY);const mCx=(s13x+dX)/2;const mB=BY,mT=BY-hM;const mW=(500/3000)*(BY-TY);const hw=mW/2;const sh=hM*0.1,bh=hM*0.45,aY=mT+sh+bh*0.2;
        els.push(<g key="man" opacity={0.7}>
          <circle cx={mCx} cy={mT+sh*0.45} r={sh*0.45} fill="none" stroke="#4fc3f7" strokeWidth={1.2}/>
          <line x1={mCx} y1={mT+sh} x2={mCx} y2={mT+sh+bh} stroke="#4fc3f7" strokeWidth={1.2}/>
          <line x1={mCx-hw} y1={aY+bh*0.25} x2={mCx} y2={aY} stroke="#4fc3f7" strokeWidth={1}/>
          <line x1={mCx+hw} y1={aY+bh*0.25} x2={mCx} y2={aY} stroke="#4fc3f7" strokeWidth={1}/>
          <line x1={mCx} y1={mT+sh+bh} x2={mCx-hw*0.5} y2={mB} stroke="#4fc3f7" strokeWidth={1.2}/>
          <line x1={mCx} y1={mT+sh+bh} x2={mCx+hw*0.5} y2={mB} stroke="#4fc3f7" strokeWidth={1.2}/>
          <text x={mCx} y={mT-4} textAnchor="middle" fill="#4fc3f7" fontSize={7}>180см</text>
        </g>);
        return els;
      })()}
      <rect x={40} y={BY-rPx} width={22} height={rPx} fill="none" stroke="#4fc3f7" strokeWidth={1}/>
      <text x={66} y={BY-rPx-1} fill="#4fc3f7" fontSize={7}>250мм</text>
      <text x={66} y={BY-rPx+9} fill="#4fc3f7" fontSize={7}>{RISE_H}мм</text>
      {mouse&&(()=>{const hMm=Math.round((BY-mouse.y)/rPx*RISE_H);const step=Math.min(TOTAL_RISES,Math.max(1,Math.ceil((BY-mouse.y)/rPx)));return <>
        <line x1={mouse.x} y1={TY} x2={mouse.x} y2={BY} stroke="#4fc3f744" strokeDasharray="4"/>
        <line x1={20} y1={mouse.y} x2={560} y2={mouse.y} stroke="#4fc3f744" strokeDasharray="4"/>
        <rect x={mouse.x+8} y={mouse.y-20} width={100} height={18} rx={3} fill="#000c"/>
        <text x={mouse.x+12} y={mouse.y-6} fill="#4fc3f7" fontSize={9}>ст.≈{step} | h:{hMm}мм</text>
      </>;})()}
    </svg>
  );
}

export default function StairDetail(){
  return(
    <div style={{background:"#1a1a2e",minHeight:"100vh",padding:20,fontFamily:"sans-serif",color:"#e0e0e0"}}>
      <h2 style={{textAlign:"center",color:"#fff",margin:"0 0 16px"}}>Лист 2 — Детали лестницы</h2>
      <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><TopView/></div>
      <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><SideView/></div>
      <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><SectionView/></div>
      <div style={{maxWidth:560,margin:"20px auto",background:"#1e2d4a",borderRadius:8,padding:16}}>
        <h3 style={{color:"#ff9800",margin:"0 0 12px",fontSize:14,textAlign:"center"}}>Спецификация лестницы</h3>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead>
            <tr style={{borderBottom:"1px solid #ffffff30"}}>
              <th style={{padding:"6px 4px",color:"#888",textAlign:"center",width:30}}>№</th>
              <th style={{padding:"6px 8px",color:"#888",textAlign:"left"}}>Параметр</th>
              <th style={{padding:"6px 8px",color:"#888",textAlign:"left"}}>Значение</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Тип","П-образная, двухуровневая площадка"],
              ["Высота (пол–пол)","3000 мм"],
              ["Проём (Д×Ш)",`${PROEM_W*1000} × ${PROEM_H*1000} мм`],
              ["Подъёмов",`${TOTAL_RISES} (${M1_STEPS}ст + 2пл + ${M2_STEPS}ст + 1доб.=пол)`],
              ["Ступеней",`${M1_STEPS+M2_STEPS+1} (${M1_STEPS} + ${M2_STEPS} + 1доб.)`],
              ["Подступёнок",`${RISE_H} мм`],
              ["Проступь",`${TREAD*1000} мм (доборная: ${DOBOR_TREAD*1000} мм)`],
              ["Марш 1",`${M1_STEPS} ст., ${M1_LEN*1000} мм`],
              ["Марш 2",`${M2_STEPS}+1доб., ${M2_FULL*1000} мм`],
              ["Ширина маршей",`${MARCH_W*1000} мм`],
              ["Площадки",`${PLAT_W*1000}×${MARCH_W*1000} мм (от линии отделки)`],
              ["2h+b",`${2*RISE_H+TREAD*1000} мм ✓ (600–640)`],
              ["Уклон",`${(Math.atan(RISE_H/(TREAD*1000))*180/Math.PI).toFixed(1)}°`],
            ].map(([k,v],i)=>(
              <tr key={i} style={{borderBottom:"1px solid #ffffff10"}}>
                <td style={{padding:"6px 4px",color:"#4fc3f7",textAlign:"center",fontWeight:"bold"}}>{i+1}</td>
                <td style={{padding:"6px 8px",color:"#888"}}>{k}</td>
                <td style={{padding:"6px 8px",color:"#e0e0e0",fontWeight:"bold"}}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{color:"#4caf50",fontSize:12,marginTop:12,textAlign:"center",fontWeight:"bold"}}>✓ Доборная ступень = пол 2-го этажа, совпадает с краем проёма</p>
      </div>
    </div>
  );
}
