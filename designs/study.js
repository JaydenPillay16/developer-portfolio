import { gsap } from "gsap";
import { Vector3, OrthographicCamera, Euler, Matrix4, CatmullRomCurve3 } from "three";

const theme = document.body.className;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const timeline = gsap.timeline({ paused: true });
const phase = { turn: 0, lift: 0 };
const camera = new OrthographicCamera(-4.4, 4.4, 3.1, -3.1, 0.1, 100);
camera.position.set(0, 0, 15);
camera.updateMatrixWorld();
const matrix = new Matrix4();
const point = new Vector3();
const rotation = new Euler();
const strokes = [];
function strand(points, color, width, fill) { strokes.push({ points, color, width, fill }); }
if (theme === "switchyard") {
  // A loom of routed signal conductors, with a half twist at the interchange.
  for (let i = 0; i < 38; i++) {
    const p = i / 37 - 0.5;
    const anchors = [[-3.9,p*2.8,0],[-2.65,p*2.8,0],[-1.5,p*1.6,p*1.1],[-0.5,1.35+p*.45,1.2+p*2.2],[.65,1.15-p*1.1,1.3+p*1.7],[1.6,-.82-p*1.65,.2+p],[3.9,-.84-p*1.65,0]];
    const wire = new CatmullRomCurve3(anchors.map(v=>new Vector3(...v))).getPoints(90);
    strand(wire, i%9 < 3 ? "#e4a382" : i%3 ? "#b9b9aa" : "#73776f", .019);
  }
} else if (theme === "highveld") {
  // Opaque cross sections give the ridge a cut-paper edge and hide distant lines.
  for (let j=0;j<62;j++) {
    const z=-2.8+j*.09;
    const ridge=[];
    for(let i=0;i<=110;i++){
      const x=-4.7+i*.086;
      const d=z-.42*Math.sin(x*1.3);
      const h=1.85*Math.exp(-d*d*.56)*(.72+.25*Math.cos(x*1.32)+.11*Math.sin(x*3.3+z))+.17*Math.sin(x*2+z)*Math.exp(-z*z*.45);
      ridge.push(new Vector3(x,h-.65,z));
    }
    ridge.push(new Vector3(4.76,-1.05,z),new Vector3(-4.7,-1.05,z));
    strand(ridge,j%6===0?"#6b764e":"#879263",.013,"#e6e8d7");
  }
} else {
  // Registration arcs and fiducials frame the portrait like a printer's proof.
  for(let i=0;i<21;i++){
    const pts=[];
    for(let k=0;k<=160;k++){
      const a=k*Math.PI/80;
      pts.push(new Vector3(3.55*Math.cos(a),2.3*Math.sin(a),-.9+i*.092));
    }
    strand(pts,i%5===0?"#8f3329":"#b2a396",.013);
  }
}
function render(){
  const rect=canvas.getBoundingClientRect();
  if(!rect.width || !rect.height) return;
  const ratio=Math.min(devicePixelRatio || 1,2);
  const width=Math.round(rect.width*ratio),height=Math.round(rect.height*ratio);
  if(canvas.width!==width || canvas.height!==height){canvas.width=width;canvas.height=height;}
  ctx.clearRect(0,0,width,height);
  const scale=Math.min(width/8.35,height/5.2);
  rotation.set(theme==="highveld"?.34:theme==="press"?-.16:.28, (theme==="press"?.64:-.22)+phase.turn,theme==="switchyard"?-.17:theme==="press"?-.14:.025);
  matrix.makeRotationFromEuler(rotation);
  for(const [i,line] of strokes.entries()){
    ctx.beginPath();
    for(const [k,v] of line.points.entries()){
      point.copy(v); point.y+=phase.lift*Math.sin(i*.1); point.applyMatrix4(matrix).project(camera);
      const horizontalScale = theme === "highveld" ? Math.min(width / 10.2, scale * 2) : scale;
      const x=width/2+point.x*4.4*horizontalScale,y=height/2-point.y*3.1*scale;
      if(k===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    if(line.fill){ctx.closePath();ctx.fillStyle=line.fill;ctx.fill();}
    ctx.lineWidth=Math.max(.52*ratio,line.width*scale);ctx.strokeStyle=line.color;ctx.stroke();
  }
}
const replay=document.querySelector(".replay");
function finish(){replay.textContent="Replay motion";}
timeline.to(phase,{turn:.22,lift:.42,duration:1.1,ease:"sine.inOut",onUpdate:render})
  .to(phase,{turn:0,lift:0,duration:1.35,ease:"power2.inOut",onUpdate:render,onComplete:finish});
replay.addEventListener("click",()=>{
  if(reduce.matches)return;
  if(timeline.isActive()){timeline.pause();replay.textContent="Resume motion";}
  else {replay.textContent="Pause motion"; if(timeline.progress()===1)timeline.restart();else timeline.play();}
});
function preference(){timeline.pause(0);finish();replay.hidden=reduce.matches;render();}
reduce.addEventListener("change",preference);
new ResizeObserver(render).observe(canvas);preference();

// Keep the custom halo, updating its transform once per animation frame.
const halo=document.querySelector(".halo");
const pointer=matchMedia("(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)");
let pending=0,x=0,y=0;
document.addEventListener("pointermove",event=>{
  if(!pointer.matches || event.pointerType!=="mouse")return;
  x=event.clientX;y=event.clientY;
  if(!pending)pending=requestAnimationFrame(()=>{halo.style.transform=`translate3d(${x-12}px,${y-12}px,0)`;halo.hidden=false;pending=0;});
},{passive:true});
document.documentElement.addEventListener("pointerleave",()=>{cancelAnimationFrame(pending);pending=0;halo.hidden=true;});
const menu=document.querySelector(".mobile");
function closeMenu(){menu.open=false;}
menu.addEventListener("click",e=>{if(e.target.closest("a"))closeMenu();});
document.addEventListener("keydown",e=>{if(e.key==="Escape" && menu.open){closeMenu();menu.querySelector("summary").focus();}});

const form=document.querySelector("form");
form.noValidate=true;
const feedback = form.querySelector(".feedback");
const submit = form.querySelector("button[type=submit]");
const previewFailure = new URLSearchParams(location.search).has("delivery-error");
function deliveryError() {
  feedback.textContent = "Delivery preview: the message could not be sent. Your entries are saved in this form. Try again or use the LinkedIn link below.";
  submit.textContent = "Try again";
}
if (previewFailure) deliveryError();
form.addEventListener("submit",event=>{
  event.preventDefault();
  let first;
  for(const field of form.querySelectorAll("[required]")){
    let message="";
    if(!field.value.trim())message="Please enter your "+field.name+".";
    else if(!field.validity.valid)message=field.name==="email"?"Enter a full email address, such as you@example.com.":"Please use at least 10 characters.";
    else if(field.name==="message" && field.value.trim().length<10)message="Please use at least 10 characters.";
    field.setAttribute("aria-invalid",String(!!message));
    document.getElementById(field.name+"-error").textContent=message;
    if(message && !first)first=field;
  }
  if(first){first.focus();return;}
  submit.disabled = true;
  submit.textContent = "Checking...";
  window.setTimeout(() => {
    submit.disabled = false;
    submit.textContent = "Check message";
    feedback.textContent = "Your message is ready. This preview keeps it on your device.";
  }, 350);
});
form.addEventListener("input",e=>{const field=e.target;field.removeAttribute("aria-invalid");const error=document.getElementById(field.name+"-error");if(error)error.textContent="";document.querySelector(".feedback").textContent="";});
