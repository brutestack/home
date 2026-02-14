import { useEffect, useRef } from "react";
import * as THREE from "three";
const PROEM_W=3.0,PROEM_H=1.7,PLAT_X=0.05,PLAT_W=0.75,MARCH_W=PROEM_H/2;
const M1_STEPS=5,M2_STEPS=8,TREAD=0.25,DOBOR_TREAD=0.20;
const M2_LEN=M2_STEPS*TREAD,MX=PLAT_X+PLAT_W;
const TOTAL_RISES=16,RISE_M=187.5/1000,ST=0.04;

export default function Stair3D(){
  const ref=useRef(null);
  const drag=useRef(false),prev=useRef({x:0,y:0});
  const ang=useRef({t:-0.6,p:0.8}),dist=useRef(5);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const w=850,h=850;
    const scene=new THREE.Scene();scene.background=new THREE.Color(0x16213e);
    const cam=new THREE.PerspectiveCamera(50,w/h,0.1,50);
    const ren=new THREE.WebGLRenderer({antialias:true});
    ren.setSize(w,h);ren.setPixelRatio(window.devicePixelRatio);
    el.appendChild(ren.domElement);
    scene.add(new THREE.AmbientLight(0xffffff,0.5));
    const dl=new THREE.DirectionalLight(0xffffff,0.8);dl.position.set(3,5,4);scene.add(dl);
    const g=new THREE.Group();scene.add(g);
    const sM=new THREE.MeshPhongMaterial({color:0xff9800,transparent:true,opacity:0.85});
    const pM=new THREE.MeshPhongMaterial({color:0xffab40,transparent:true,opacity:0.8});
    const dM=new THREE.MeshPhongMaterial({color:0x4caf50,transparent:true,opacity:0.85});
    const eM=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0.3});
    const cx=-PROEM_W/2,cz=-PROEM_H/2;
    function box(x,y,z,bw,bh,bd,m){
      const ge=new THREE.BoxGeometry(bw,bh,bd);
      const me=new THREE.Mesh(ge,m);me.position.set(x+bw/2+cx,y+bh/2,z+bd/2+cz);g.add(me);
      const eg=new THREE.EdgesGeometry(ge);const ln=new THREE.LineSegments(eg,eM);ln.position.copy(me.position);g.add(ln);
    }
    for(let i=0;i<M1_STEPS;i++) box(MX+(M1_STEPS-1-i)*TREAD,(i+1)*RISE_M-ST,0,TREAD,ST,MARCH_W,sM);
    box(PLAT_X,(M1_STEPS+1)*RISE_M-ST,0,PLAT_W,ST,MARCH_W,pM);
    box(PLAT_X,(M1_STEPS+2)*RISE_M-ST,MARCH_W,PLAT_W,ST,MARCH_W,pM);
    for(let i=0;i<M2_STEPS;i++) box(MX+i*TREAD,(M1_STEPS+2+i+1)*RISE_M-ST,MARCH_W,TREAD,ST,MARCH_W,sM);
    box(MX+M2_LEN,(M1_STEPS+2+M2_STEPS+1)*RISE_M-ST,MARCH_W,DOBOR_TREAD,ST,MARCH_W,dM);
    const f2y=TOTAL_RISES*RISE_M;
    const fM=new THREE.LineBasicMaterial({color:0xff9800});
    const fG=new THREE.EdgesGeometry(new THREE.BoxGeometry(PROEM_W,0.06,PROEM_H));
    const fL=new THREE.LineSegments(fG,fM);fL.position.set(PROEM_W/2+cx,f2y,PROEM_H/2+cz);g.add(fL);
    const fG2=new THREE.EdgesGeometry(new THREE.BoxGeometry(PROEM_W,0.06,PROEM_H));
    const fL2=new THREE.LineSegments(fG2,fM);fL2.position.set(PROEM_W/2+cx,0,PROEM_H/2+cz);g.add(fL2);
    function upCam(){
      const t=ang.current.t,p=ang.current.p,d=dist.current;
      cam.position.set(d*Math.sin(p)*Math.sin(t),d*Math.cos(p),d*Math.sin(p)*Math.cos(t));
      cam.lookAt(0,f2y*0.4,0);
    }
    upCam();
    let aId;function loop(){aId=requestAnimationFrame(loop);ren.render(scene,cam);}loop();
    const dn=e=>{drag.current=true;prev.current={x:e.clientX,y:e.clientY};};
    const up=()=>{drag.current=false;};
    const mv=e=>{if(!drag.current)return;ang.current.t-=(e.clientX-prev.current.x)*0.01;ang.current.p=Math.max(0.2,Math.min(Math.PI-0.2,ang.current.p-(e.clientY-prev.current.y)*0.01));prev.current={x:e.clientX,y:e.clientY};upCam();};
    const wh=e=>{dist.current=Math.max(2,Math.min(12,dist.current+e.deltaY*0.005));upCam();e.preventDefault();};
    ren.domElement.addEventListener("mousedown",dn);
    window.addEventListener("mouseup",up);
    window.addEventListener("mousemove",mv);
    ren.domElement.addEventListener("wheel",wh,{passive:false});
    return()=>{
      cancelAnimationFrame(aId);
      ren.domElement.removeEventListener("mousedown",dn);
      window.removeEventListener("mouseup",up);
      window.removeEventListener("mousemove",mv);
      ren.domElement.removeEventListener("wheel",wh);
      ren.dispose();
      if(el.contains(ren.domElement))el.removeChild(ren.domElement);
    };
  },[]);
  return(
    <div style={{background:"#1a1a2e",minHeight:"100vh",padding:20,fontFamily:"sans-serif",color:"#e0e0e0"}}>
      <h2 style={{textAlign:"center",color:"#fff",margin:"0 0 16px"}}>3D модель лестницы</h2>
      <p style={{color:"#888",fontSize:12,textAlign:"center",margin:"0 0 8px"}}>Перетаскивайте мышью для вращения, скролл для зума</p>
      <div style={{display:"flex",justifyContent:"center"}}><div ref={ref} style={{width:850,borderRadius:8,overflow:"hidden"}}/></div>
      <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:12,fontSize:11,color:"#888"}}>
        <span><span style={{color:"#ff9800"}}>■</span> Ступени</span>
        <span><span style={{color:"#ffab40"}}>■</span> Площадки</span>
        <span><span style={{color:"#4caf50"}}>■</span> Доборная</span>
        <span><span style={{color:"#ff9800"}}>□</span> Проём</span>
      </div>
    </div>
  );
}
