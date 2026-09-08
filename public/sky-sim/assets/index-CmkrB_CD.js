(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $l="169",rp=0,Fh=1,op=2,Pd=1,Ld=2,Li=3,zi=0,vn=1,Jt=2,os=0,or=1,to=2,Oh=3,zh=4,ap=5,Ms=100,cp=101,lp=102,hp=103,up=104,dp=200,fp=201,pp=202,mp=203,qc=204,Yc=205,gp=206,xp=207,_p=208,vp=209,yp=210,Mp=211,Sp=212,wp=213,bp=214,Kc=0,$c=1,jc=2,pr=3,Zc=4,Jc=5,Qc=6,el=7,Id=0,Ep=1,Tp=2,as=0,Ap=1,Rp=2,Cp=3,Dd=4,Pp=5,Lp=6,Ip=7,Bh="attached",Dp="detached",Nd=300,mr=301,gr=302,tl=303,nl=304,La=306,ls=1e3,mi=1001,va=1002,_n=1003,Ud=1004,Wr=1005,Qt=1006,ca=1007,gi=1008,Bi=1009,Fd=1010,Od=1011,no=1012,jl=1013,Ts=1014,En=1015,Fi=1016,Zl=1017,Jl=1018,xr=1020,zd=35902,Bd=1021,kd=1022,Wn=1023,Hd=1024,Gd=1025,ar=1026,_r=1027,Ql=1028,eh=1029,Vd=1030,th=1031,nh=1033,la=33776,ha=33777,ua=33778,da=33779,il=35840,sl=35841,rl=35842,ol=35843,al=36196,cl=37492,ll=37496,hl=37808,ul=37809,dl=37810,fl=37811,pl=37812,ml=37813,gl=37814,xl=37815,_l=37816,vl=37817,yl=37818,Ml=37819,Sl=37820,wl=37821,fa=36492,bl=36494,El=36495,Wd=36283,Tl=36284,Al=36285,Rl=36286,io=2300,so=2301,Wa=2302,kh=2400,Hh=2401,Gh=2402,Np=2500,Up=0,Xd=1,Cl=2,Fp=3200,Op=3201,qd=0,zp=1,es="",un="srgb",tn="srgb-linear",ih="display-p3",Ia="display-p3-linear",ya="linear",bt="srgb",Ma="rec709",Sa="p3",Ns=7680,Vh=519,Bp=512,kp=513,Hp=514,Yd=515,Gp=516,Vp=517,Wp=518,Xp=519,Pl=35044,Wh="300 es",Oi=2e3,wa=2001;class Er{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Xh=1234567;const $r=Math.PI/180,vr=180/Math.PI;function Xn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]+"-"+on[e&255]+on[e>>8&255]+"-"+on[e>>16&15|64]+on[e>>24&255]+"-"+on[t&63|128]+on[t>>8&255]+"-"+on[t>>16&255]+on[t>>24&255]+on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]).toLowerCase()}function Ht(i,e,t){return Math.max(e,Math.min(t,i))}function sh(i,e){return(i%e+e)%e}function qp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Yp(i,e,t){return i!==e?(t-i)/(e-i):0}function jr(i,e,t){return(1-t)*i+t*e}function Kp(i,e,t,n){return jr(i,e,1-Math.exp(-t*n))}function $p(i,e=1){return e-Math.abs(sh(i,e*2)-e)}function jp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Zp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Jp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Qp(i,e){return i+Math.random()*(e-i)}function em(i){return i*(.5-Math.random())}function tm(i){i!==void 0&&(Xh=i);let e=Xh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function nm(i){return i*$r}function im(i){return i*vr}function sm(i){return(i&i-1)===0&&i!==0}function rm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function om(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function am(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),f=r((e-n)/2),u=o((e-n)/2),p=r((n-e)/2),m=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*f,c*u,a*l);break;case"YZY":i.set(c*u,a*h,c*f,a*l);break;case"ZXZ":i.set(c*f,c*u,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ti(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ft(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const cm={DEG2RAD:$r,RAD2DEG:vr,generateUUID:Xn,clamp:Ht,euclideanModulo:sh,mapLinear:qp,inverseLerp:Yp,lerp:jr,damp:Kp,pingpong:$p,smoothstep:jp,smootherstep:Zp,randInt:Jp,randFloat:Qp,randFloatSpread:em,seededRandom:tm,degToRad:nm,radToDeg:im,isPowerOfTwo:sm,ceilPowerOfTwo:rm,floorPowerOfTwo:om,setQuaternionFromProperEuler:am,normalize:ft,denormalize:ti};class fe{constructor(e=0,t=0){fe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,t,n,s,r,o,a,c,l){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],p=n[5],m=n[8],x=s[0],d=s[3],g=s[6],y=s[1],v=s[4],M=s[7],A=s[2],w=s[5],b=s[8];return r[0]=o*x+a*y+c*A,r[3]=o*d+a*v+c*w,r[6]=o*g+a*M+c*b,r[1]=l*x+h*y+f*A,r[4]=l*d+h*v+f*w,r[7]=l*g+h*M+f*b,r[2]=u*x+p*y+m*A,r[5]=u*d+p*v+m*w,r[8]=u*g+p*M+m*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],f=h*o-a*l,u=a*c-h*r,p=l*r-o*c,m=t*f+n*u+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=f*x,e[1]=(s*l-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=u*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Xa.makeScale(e,t)),this}rotate(e){return this.premultiply(Xa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xa=new Qe;function Kd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ro(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function lm(){const i=ro("canvas");return i.style.display="block",i}const qh={};function pa(i){i in qh||(qh[i]=!0,console.warn(i))}function hm(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function um(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function dm(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Yh=new Qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Kh=new Qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Cr={[tn]:{transfer:ya,primaries:Ma,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[un]:{transfer:bt,primaries:Ma,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ia]:{transfer:ya,primaries:Sa,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Kh),fromReference:i=>i.applyMatrix3(Yh)},[ih]:{transfer:bt,primaries:Sa,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Kh),fromReference:i=>i.applyMatrix3(Yh).convertLinearToSRGB()}},fm=new Set([tn,Ia]),rt={enabled:!0,_workingColorSpace:tn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!fm.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Cr[e].toReference,s=Cr[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Cr[i].primaries},getTransfer:function(i){return i===es?ya:Cr[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(Cr[e].luminanceCoefficients)}};function cr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qa(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Us;class pm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Us===void 0&&(Us=ro("canvas")),Us.width=e.width,Us.height=e.height;const n=Us.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Us}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ro("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=cr(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(cr(t[n]/255)*255):t[n]=cr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mm=0;class $d{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=Xn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ya(s[o].image)):r.push(Ya(s[o]))}else r=Ya(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ya(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let gm=0;class Gt extends Er{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=mi,s=mi,r=Qt,o=gi,a=Wn,c=Bi,l=Gt.DEFAULT_ANISOTROPY,h=es){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=Xn(),this.name="",this.source=new $d(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ls:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case va:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ls:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case va:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Nd;Gt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,s=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],p=c[5],m=c[9],x=c[2],d=c[6],g=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-x)<.01&&Math.abs(m-d)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+x)<.1&&Math.abs(m+d)<.1&&Math.abs(l+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,M=(p+1)/2,A=(g+1)/2,w=(h+u)/4,b=(f+x)/4,T=(m+d)/4;return v>M&&v>A?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=w/n,r=b/n):M>A?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=w/s,r=T/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=b/r,s=T/r),this.set(n,s,r,t),this}let y=Math.sqrt((d-m)*(d-m)+(f-x)*(f-x)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(d-m)/y,this.y=(f-x)/y,this.z=(u-h)/y,this.w=Math.acos((l+p+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xm extends Er{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Gt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new $d(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class As extends xm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class jd extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=_n,this.minFilter=_n,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _m extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=_n,this.minFilter=_n,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3];const u=r[o+0],p=r[o+1],m=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f;return}if(a===1){e[t+0]=u,e[t+1]=p,e[t+2]=m,e[t+3]=x;return}if(f!==x||c!==u||l!==p||h!==m){let d=1-a;const g=c*u+l*p+h*m+f*x,y=g>=0?1:-1,v=1-g*g;if(v>Number.EPSILON){const A=Math.sqrt(v),w=Math.atan2(A,g*y);d=Math.sin(d*w)/A,a=Math.sin(a*w)/A}const M=a*y;if(c=c*d+u*M,l=l*d+p*M,h=h*d+m*M,f=f*d+x*M,d===1-a){const A=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=A,l*=A,h*=A,f*=A}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[o],u=r[o+1],p=r[o+2],m=r[o+3];return e[t]=a*m+h*f+c*p-l*u,e[t+1]=c*m+h*u+l*f-a*p,e[t+2]=l*m+h*p+a*u-c*f,e[t+3]=h*m-a*f-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),f=a(r/2),u=c(n/2),p=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=u*h*f+l*p*m,this._y=l*p*f-u*h*m,this._z=l*h*m+u*p*f,this._w=l*h*f-u*p*m;break;case"YXZ":this._x=u*h*f+l*p*m,this._y=l*p*f-u*h*m,this._z=l*h*m-u*p*f,this._w=l*h*f+u*p*m;break;case"ZXY":this._x=u*h*f-l*p*m,this._y=l*p*f+u*h*m,this._z=l*h*m+u*p*f,this._w=l*h*f-u*p*m;break;case"ZYX":this._x=u*h*f-l*p*m,this._y=l*p*f+u*h*m,this._z=l*h*m-u*p*f,this._w=l*h*f+u*p*m;break;case"YZX":this._x=u*h*f+l*p*m,this._y=l*p*f+u*h*m,this._z=l*h*m-u*p*f,this._w=l*h*f-u*p*m;break;case"XZY":this._x=u*h*f-l*p*m,this._y=l*p*f-u*h*m,this._z=l*h*m+u*p*f,this._w=l*h*f+u*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],f=t[10],u=n+a+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>f){const p=2*Math.sqrt(1+n-a-f);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>f){const p=2*Math.sqrt(1+a-n-f);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+f-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ht(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=o*f+this._w*u,this._x=n*f+this._x*u,this._y=s*f+this._y*u,this._z=r*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($h.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($h.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),f=2*(r*n-o*t);return this.x=t+c*l+o*f-a*h,this.y=n+c*h+a*l-r*f,this.z=s+c*f+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ka.copy(this).projectOnVector(e),this.sub(Ka)}reflect(e){return this.sub(Ka.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ka=new U,$h=new fn;class _i{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Kn):Kn.fromBufferAttribute(r,o),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),go.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),go.copy(n.boundingBox)),go.applyMatrix4(e.matrixWorld),this.union(go)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pr),xo.subVectors(this.max,Pr),Fs.subVectors(e.a,Pr),Os.subVectors(e.b,Pr),zs.subVectors(e.c,Pr),Gi.subVectors(Os,Fs),Vi.subVectors(zs,Os),ds.subVectors(Fs,zs);let t=[0,-Gi.z,Gi.y,0,-Vi.z,Vi.y,0,-ds.z,ds.y,Gi.z,0,-Gi.x,Vi.z,0,-Vi.x,ds.z,0,-ds.x,-Gi.y,Gi.x,0,-Vi.y,Vi.x,0,-ds.y,ds.x,0];return!$a(t,Fs,Os,zs,xo)||(t=[1,0,0,0,1,0,0,0,1],!$a(t,Fs,Os,zs,xo))?!1:(_o.crossVectors(Gi,Vi),t=[_o.x,_o.y,_o.z],$a(t,Fs,Os,zs,xo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const bi=[new U,new U,new U,new U,new U,new U,new U,new U],Kn=new U,go=new _i,Fs=new U,Os=new U,zs=new U,Gi=new U,Vi=new U,ds=new U,Pr=new U,xo=new U,_o=new U,fs=new U;function $a(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){fs.fromArray(i,r);const a=s.x*Math.abs(fs.x)+s.y*Math.abs(fs.y)+s.z*Math.abs(fs.z),c=e.dot(fs),l=t.dot(fs),h=n.dot(fs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const vm=new _i,Lr=new U,ja=new U;class vi{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):vm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);const t=Lr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Lr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ja.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(ja)),this.expandByPoint(Lr.copy(e.center).sub(ja))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ei=new U,Za=new U,vo=new U,Wi=new U,Ja=new U,yo=new U,Qa=new U;class Da{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ei.copy(this.origin).addScaledVector(this.direction,t),Ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Za.copy(e).add(t).multiplyScalar(.5),vo.copy(t).sub(e).normalize(),Wi.copy(this.origin).sub(Za);const r=e.distanceTo(t)*.5,o=-this.direction.dot(vo),a=Wi.dot(this.direction),c=-Wi.dot(vo),l=Wi.lengthSq(),h=Math.abs(1-o*o);let f,u,p,m;if(h>0)if(f=o*c-a,u=o*a-c,m=r*h,f>=0)if(u>=-m)if(u<=m){const x=1/h;f*=x,u*=x,p=f*(f+o*u+2*a)+u*(o*f+u+2*c)+l}else u=r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;else u<=-m?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l):u<=m?(f=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Za).addScaledVector(vo,u),p}intersectSphere(e,t){Ei.subVectors(e.center,this.origin);const n=Ei.dot(this.direction),s=Ei.dot(Ei)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(a=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ei)!==null}intersectTriangle(e,t,n,s,r){Ja.subVectors(t,e),yo.subVectors(n,e),Qa.crossVectors(Ja,yo);let o=this.direction.dot(Qa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Wi.subVectors(this.origin,e);const c=a*this.direction.dot(yo.crossVectors(Wi,yo));if(c<0)return null;const l=a*this.direction.dot(Ja.cross(Wi));if(l<0||c+l>o)return null;const h=-a*Wi.dot(Qa);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ke{constructor(e,t,n,s,r,o,a,c,l,h,f,u,p,m,x,d){Ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,f,u,p,m,x,d)}set(e,t,n,s,r,o,a,c,l,h,f,u,p,m,x,d){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=f,g[14]=u,g[3]=p,g[7]=m,g[11]=x,g[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ke().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Bs.setFromMatrixColumn(e,0).length(),r=1/Bs.setFromMatrixColumn(e,1).length(),o=1/Bs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const u=o*h,p=o*f,m=a*h,x=a*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=p+m*l,t[5]=u-x*l,t[9]=-a*c,t[2]=x-u*l,t[6]=m+p*l,t[10]=o*c}else if(e.order==="YXZ"){const u=c*h,p=c*f,m=l*h,x=l*f;t[0]=u+x*a,t[4]=m*a-p,t[8]=o*l,t[1]=o*f,t[5]=o*h,t[9]=-a,t[2]=p*a-m,t[6]=x+u*a,t[10]=o*c}else if(e.order==="ZXY"){const u=c*h,p=c*f,m=l*h,x=l*f;t[0]=u-x*a,t[4]=-o*f,t[8]=m+p*a,t[1]=p+m*a,t[5]=o*h,t[9]=x-u*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const u=o*h,p=o*f,m=a*h,x=a*f;t[0]=c*h,t[4]=m*l-p,t[8]=u*l+x,t[1]=c*f,t[5]=x*l+u,t[9]=p*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const u=o*c,p=o*l,m=a*c,x=a*l;t[0]=c*h,t[4]=x-u*f,t[8]=m*f+p,t[1]=f,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*f+m,t[10]=u-x*f}else if(e.order==="XZY"){const u=o*c,p=o*l,m=a*c,x=a*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=u*f+x,t[5]=o*h,t[9]=p*f-m,t[2]=m*f-p,t[6]=a*h,t[10]=x*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ym,e,Mm)}lookAt(e,t,n){const s=this.elements;return Cn.subVectors(e,t),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),Xi.crossVectors(n,Cn),Xi.lengthSq()===0&&(Math.abs(n.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),Xi.crossVectors(n,Cn)),Xi.normalize(),Mo.crossVectors(Cn,Xi),s[0]=Xi.x,s[4]=Mo.x,s[8]=Cn.x,s[1]=Xi.y,s[5]=Mo.y,s[9]=Cn.y,s[2]=Xi.z,s[6]=Mo.z,s[10]=Cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],p=n[13],m=n[2],x=n[6],d=n[10],g=n[14],y=n[3],v=n[7],M=n[11],A=n[15],w=s[0],b=s[4],T=s[8],F=s[12],_=s[1],S=s[5],D=s[9],I=s[13],P=s[2],O=s[6],N=s[10],W=s[14],z=s[3],te=s[7],ne=s[11],ce=s[15];return r[0]=o*w+a*_+c*P+l*z,r[4]=o*b+a*S+c*O+l*te,r[8]=o*T+a*D+c*N+l*ne,r[12]=o*F+a*I+c*W+l*ce,r[1]=h*w+f*_+u*P+p*z,r[5]=h*b+f*S+u*O+p*te,r[9]=h*T+f*D+u*N+p*ne,r[13]=h*F+f*I+u*W+p*ce,r[2]=m*w+x*_+d*P+g*z,r[6]=m*b+x*S+d*O+g*te,r[10]=m*T+x*D+d*N+g*ne,r[14]=m*F+x*I+d*W+g*ce,r[3]=y*w+v*_+M*P+A*z,r[7]=y*b+v*S+M*O+A*te,r[11]=y*T+v*D+M*N+A*ne,r[15]=y*F+v*I+M*W+A*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],p=e[14],m=e[3],x=e[7],d=e[11],g=e[15];return m*(+r*c*f-s*l*f-r*a*u+n*l*u+s*a*p-n*c*p)+x*(+t*c*p-t*l*u+r*o*u-s*o*p+s*l*h-r*c*h)+d*(+t*l*f-t*a*p-r*o*f+n*o*p+r*a*h-n*l*h)+g*(-s*a*h-t*c*f+t*a*u+s*o*f-n*o*u+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],p=e[11],m=e[12],x=e[13],d=e[14],g=e[15],y=f*d*l-x*u*l+x*c*p-a*d*p-f*c*g+a*u*g,v=m*u*l-h*d*l-m*c*p+o*d*p+h*c*g-o*u*g,M=h*x*l-m*f*l+m*a*p-o*x*p-h*a*g+o*f*g,A=m*f*c-h*x*c-m*a*u+o*x*u+h*a*d-o*f*d,w=t*y+n*v+s*M+r*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/w;return e[0]=y*b,e[1]=(x*u*r-f*d*r-x*s*p+n*d*p+f*s*g-n*u*g)*b,e[2]=(a*d*r-x*c*r+x*s*l-n*d*l-a*s*g+n*c*g)*b,e[3]=(f*c*r-a*u*r-f*s*l+n*u*l+a*s*p-n*c*p)*b,e[4]=v*b,e[5]=(h*d*r-m*u*r+m*s*p-t*d*p-h*s*g+t*u*g)*b,e[6]=(m*c*r-o*d*r-m*s*l+t*d*l+o*s*g-t*c*g)*b,e[7]=(o*u*r-h*c*r+h*s*l-t*u*l-o*s*p+t*c*p)*b,e[8]=M*b,e[9]=(m*f*r-h*x*r-m*n*p+t*x*p+h*n*g-t*f*g)*b,e[10]=(o*x*r-m*a*r+m*n*l-t*x*l-o*n*g+t*a*g)*b,e[11]=(h*a*r-o*f*r-h*n*l+t*f*l+o*n*p-t*a*p)*b,e[12]=A*b,e[13]=(h*x*s-m*f*s+m*n*u-t*x*u-h*n*d+t*f*d)*b,e[14]=(m*a*s-o*x*s-m*n*c+t*x*c+o*n*d-t*a*d)*b,e[15]=(o*f*s-h*a*s+h*n*c-t*f*c-o*n*u+t*a*u)*b,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,f=a+a,u=r*l,p=r*h,m=r*f,x=o*h,d=o*f,g=a*f,y=c*l,v=c*h,M=c*f,A=n.x,w=n.y,b=n.z;return s[0]=(1-(x+g))*A,s[1]=(p+M)*A,s[2]=(m-v)*A,s[3]=0,s[4]=(p-M)*w,s[5]=(1-(u+g))*w,s[6]=(d+y)*w,s[7]=0,s[8]=(m+v)*b,s[9]=(d-y)*b,s[10]=(1-(u+x))*b,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Bs.set(s[0],s[1],s[2]).length();const o=Bs.set(s[4],s[5],s[6]).length(),a=Bs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],$n.copy(this);const l=1/r,h=1/o,f=1/a;return $n.elements[0]*=l,$n.elements[1]*=l,$n.elements[2]*=l,$n.elements[4]*=h,$n.elements[5]*=h,$n.elements[6]*=h,$n.elements[8]*=f,$n.elements[9]*=f,$n.elements[10]*=f,t.setFromRotationMatrix($n),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Oi){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),f=(t+e)/(t-e),u=(n+s)/(n-s);let p,m;if(a===Oi)p=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===wa)p=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Oi){const c=this.elements,l=1/(t-e),h=1/(n-s),f=1/(o-r),u=(t+e)*l,p=(n+s)*h;let m,x;if(a===Oi)m=(o+r)*f,x=-2*f;else if(a===wa)m=r*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Bs=new U,$n=new Ke,ym=new U(0,0,0),Mm=new U(1,1,1),Xi=new U,Mo=new U,Cn=new U,jh=new Ke,Zh=new fn;class yn{constructor(e=0,t=0,n=0,s=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],f=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ht(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zh.setFromEuler(this),this.setFromQuaternion(Zh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class Zd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sm=0;const Jh=new U,ks=new fn,Ti=new Ke,So=new U,Ir=new U,wm=new U,bm=new fn,Qh=new U(1,0,0),eu=new U(0,1,0),tu=new U(0,0,1),nu={type:"added"},Em={type:"removed"},Hs={type:"childadded",child:null},ec={type:"childremoved",child:null};class St extends Er{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new U,t=new yn,n=new fn,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ke},normalMatrix:{value:new Qe}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(Qh,e)}rotateY(e){return this.rotateOnAxis(eu,e)}rotateZ(e){return this.rotateOnAxis(tu,e)}translateOnAxis(e,t){return Jh.copy(e).applyQuaternion(this.quaternion),this.position.add(Jh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qh,e)}translateY(e){return this.translateOnAxis(eu,e)}translateZ(e){return this.translateOnAxis(tu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?So.copy(e):So.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(Ir,So,this.up):Ti.lookAt(So,Ir,this.up),this.quaternion.setFromRotationMatrix(Ti),s&&(Ti.extractRotation(s.matrixWorld),ks.setFromRotationMatrix(Ti),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nu),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Em),ec.child=e,this.dispatchEvent(ec),ec.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nu),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,e,wm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,bm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),f=o(e.shapes),u=o(e.skeletons),p=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}St.DEFAULT_UP=new U(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jn=new U,Ai=new U,tc=new U,Ri=new U,Gs=new U,Vs=new U,iu=new U,nc=new U,ic=new U,sc=new U,rc=new at,oc=new at,ac=new at;class Vn{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),jn.subVectors(e,t),s.cross(jn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){jn.subVectors(s,t),Ai.subVectors(n,t),tc.subVectors(e,t);const o=jn.dot(jn),a=jn.dot(Ai),c=jn.dot(tc),l=Ai.dot(Ai),h=Ai.dot(tc),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const u=1/f,p=(l*c-a*h)*u,m=(o*h-a*c)*u;return r.set(1-p-m,m,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ri.x),c.addScaledVector(o,Ri.y),c.addScaledVector(a,Ri.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return rc.setScalar(0),oc.setScalar(0),ac.setScalar(0),rc.fromBufferAttribute(e,t),oc.fromBufferAttribute(e,n),ac.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(rc,r.x),o.addScaledVector(oc,r.y),o.addScaledVector(ac,r.z),o}static isFrontFacing(e,t,n,s){return jn.subVectors(n,t),Ai.subVectors(e,t),jn.cross(Ai).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),jn.cross(Ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Vn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Gs.subVectors(s,n),Vs.subVectors(r,n),nc.subVectors(e,n);const c=Gs.dot(nc),l=Vs.dot(nc);if(c<=0&&l<=0)return t.copy(n);ic.subVectors(e,s);const h=Gs.dot(ic),f=Vs.dot(ic);if(h>=0&&f<=h)return t.copy(s);const u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Gs,o);sc.subVectors(e,r);const p=Gs.dot(sc),m=Vs.dot(sc);if(m>=0&&p<=m)return t.copy(r);const x=p*l-c*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(Vs,a);const d=h*m-p*f;if(d<=0&&f-h>=0&&p-m>=0)return iu.subVectors(r,s),a=(f-h)/(f-h+(p-m)),t.copy(s).addScaledVector(iu,a);const g=1/(d+x+u);return o=x*g,a=u*g,t.copy(n).addScaledVector(Gs,o).addScaledVector(Vs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Jd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},wo={h:0,s:0,l:0};function cc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,rt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=rt.workingColorSpace){if(e=sh(e,1),t=Ht(t,0,1),n=Ht(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=cc(o,r,e+1/3),this.g=cc(o,r,e),this.b=cc(o,r,e-1/3)}return rt.toWorkingColorSpace(this,s),this}setStyle(e,t=un){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=un){const n=Jd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=cr(e.r),this.g=cr(e.g),this.b=cr(e.b),this}copyLinearToSRGB(e){return this.r=qa(e.r),this.g=qa(e.g),this.b=qa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=un){return rt.fromWorkingColorSpace(an.copy(this),e),Math.round(Ht(an.r*255,0,255))*65536+Math.round(Ht(an.g*255,0,255))*256+Math.round(Ht(an.b*255,0,255))}getHexString(e=un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.fromWorkingColorSpace(an.copy(this),t);const n=an.r,s=an.g,r=an.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=rt.workingColorSpace){return rt.fromWorkingColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=un){rt.fromWorkingColorSpace(an.copy(this),e);const t=an.r,n=an.g,s=an.b;return e!==un?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(wo);const n=jr(qi.h,wo.h,t),s=jr(qi.s,wo.s,t),r=jr(qi.l,wo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new ke;ke.NAMES=Jd;let Tm=0;class si extends Er{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Xn(),this.name="",this.type="Material",this.blending=or,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qc,this.blendDst=Yc,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ns,this.stencilZFail=Ns,this.stencilZPass=Ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==or&&(n.blending=this.blending),this.side!==zi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==qc&&(n.blendSrc=this.blendSrc),this.blendDst!==Yc&&(n.blendDst=this.blendDst),this.blendEquation!==Ms&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==pr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ns&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ns&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ns&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class mt extends si{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=Id,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ui=Am();function Am(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(l&8388608);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function Rm(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Ht(i,-65504,65504),Ui.floatView[0]=i;const e=Ui.uint32View[0],t=e>>23&511;return Ui.baseTable[t]+((e&8388607)>>Ui.shiftTable[t])}function Cm(i){const e=i>>10;return Ui.uint32View[0]=Ui.mantissaTable[Ui.offsetTable[e]+(i&1023)]+Ui.exponentTable[e],Ui.floatView[0]}const bo={toHalfFloat:Rm,fromHalfFloat:Cm},Ut=new U,Eo=new fe;class en{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pl,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Eo.fromBufferAttribute(this,t),Eo.applyMatrix3(e),this.setXY(t,Eo.x,Eo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pl&&(e.usage=this.usage),e}}class Qd extends en{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ef extends en{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class _t extends en{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Pm=0;const Un=new Ke,lc=new St,Ws=new U,Pn=new _i,Dr=new _i,Xt=new U;class kt extends Er{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Kd(e)?ef:Qd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Un.makeRotationFromQuaternion(e),this.applyMatrix4(Un),this}rotateX(e){return Un.makeRotationX(e),this.applyMatrix4(Un),this}rotateY(e){return Un.makeRotationY(e),this.applyMatrix4(Un),this}rotateZ(e){return Un.makeRotationZ(e),this.applyMatrix4(Un),this}translate(e,t,n){return Un.makeTranslation(e,t,n),this.applyMatrix4(Un),this}scale(e,t,n){return Un.makeScale(e,t,n),this.applyMatrix4(Un),this}lookAt(e){return lc.lookAt(e),lc.updateMatrix(),this.applyMatrix4(lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ws).negate(),this.translate(Ws.x,Ws.y,Ws.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new _t(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Pn.setFromBufferAttribute(r),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Pn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Dr.setFromBufferAttribute(a),this.morphTargetsRelative?(Xt.addVectors(Pn.min,Dr.min),Pn.expandByPoint(Xt),Xt.addVectors(Pn.max,Dr.max),Pn.expandByPoint(Xt)):(Pn.expandByPoint(Dr.min),Pn.expandByPoint(Dr.max))}Pn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Xt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Xt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Xt.fromBufferAttribute(a,l),c&&(Ws.fromBufferAttribute(e,l),Xt.add(Ws)),s=Math.max(s,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let T=0;T<n.count;T++)a[T]=new U,c[T]=new U;const l=new U,h=new U,f=new U,u=new fe,p=new fe,m=new fe,x=new U,d=new U;function g(T,F,_){l.fromBufferAttribute(n,T),h.fromBufferAttribute(n,F),f.fromBufferAttribute(n,_),u.fromBufferAttribute(r,T),p.fromBufferAttribute(r,F),m.fromBufferAttribute(r,_),h.sub(l),f.sub(l),p.sub(u),m.sub(u);const S=1/(p.x*m.y-m.x*p.y);isFinite(S)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(S),d.copy(f).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(S),a[T].add(x),a[F].add(x),a[_].add(x),c[T].add(d),c[F].add(d),c[_].add(d))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let T=0,F=y.length;T<F;++T){const _=y[T],S=_.start,D=_.count;for(let I=S,P=S+D;I<P;I+=3)g(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const v=new U,M=new U,A=new U,w=new U;function b(T){A.fromBufferAttribute(s,T),w.copy(A);const F=a[T];v.copy(F),v.sub(A.multiplyScalar(A.dot(F))).normalize(),M.crossVectors(w,F);const S=M.dot(c[T])<0?-1:1;o.setXYZW(T,v.x,v.y,v.z,S)}for(let T=0,F=y.length;T<F;++T){const _=y[T],S=_.start,D=_.count;for(let I=S,P=S+D;I<P;I+=3)b(e.getX(I+0)),b(e.getX(I+1)),b(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new en(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,h=new U,f=new U;if(e)for(let u=0,p=e.count;u<p;u+=3){const m=e.getX(u+0),x=e.getX(u+1),d=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,d),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,d),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(d,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,f=a.normalized,u=new l.constructor(c.length*h);let p=0,m=0;for(let x=0,d=c.length;x<d;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*h;for(let g=0;g<h;g++)u[m++]=l[p++]}return new en(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new kt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,f=l.length;h<f;h++){const u=l[h],p=e(u,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){const p=l[f];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],f=r[l];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const su=new Ke,ps=new Da,To=new vi,ru=new U,Ao=new U,Ro=new U,Co=new U,hc=new U,Po=new U,ou=new U,Lo=new U;class V extends St{constructor(e=new kt,t=new mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Po.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],f=r[c];h!==0&&(hc.fromBufferAttribute(f,e),o?Po.addScaledVector(hc,h):Po.addScaledVector(hc.sub(t),h))}t.add(Po)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),To.copy(n.boundingSphere),To.applyMatrix4(r),ps.copy(e.ray).recast(e.near),!(To.containsPoint(ps.origin)===!1&&(ps.intersectSphere(To,ru)===null||ps.origin.distanceToSquared(ru)>(e.far-e.near)**2))&&(su.copy(r).invert(),ps.copy(e.ray).applyMatrix4(su),!(n.boundingBox!==null&&ps.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ps)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=u.length;m<x;m++){const d=u[m],g=o[d.materialIndex],y=Math.max(d.start,p.start),v=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let M=y,A=v;M<A;M+=3){const w=a.getX(M),b=a.getX(M+1),T=a.getX(M+2);s=Io(this,g,e,n,l,h,f,w,b,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let d=m,g=x;d<g;d+=3){const y=a.getX(d),v=a.getX(d+1),M=a.getX(d+2);s=Io(this,o,e,n,l,h,f,y,v,M),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,x=u.length;m<x;m++){const d=u[m],g=o[d.materialIndex],y=Math.max(d.start,p.start),v=Math.min(c.count,Math.min(d.start+d.count,p.start+p.count));for(let M=y,A=v;M<A;M+=3){const w=M,b=M+1,T=M+2;s=Io(this,g,e,n,l,h,f,w,b,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let d=m,g=x;d<g;d+=3){const y=d,v=d+1,M=d+2;s=Io(this,o,e,n,l,h,f,y,v,M),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}}}function Lm(i,e,t,n,s,r,o,a){let c;if(e.side===vn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===zi,a),c===null)return null;Lo.copy(a),Lo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Lo);return l<t.near||l>t.far?null:{distance:l,point:Lo.clone(),object:i}}function Io(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Ao),i.getVertexPosition(c,Ro),i.getVertexPosition(l,Co);const h=Lm(i,e,t,n,Ao,Ro,Co,ou);if(h){const f=new U;Vn.getBarycoord(ou,Ao,Ro,Co,f),s&&(h.uv=Vn.getInterpolatedAttribute(s,a,c,l,f,new fe)),r&&(h.uv1=Vn.getInterpolatedAttribute(r,a,c,l,f,new fe)),o&&(h.normal=Vn.getInterpolatedAttribute(o,a,c,l,f,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new U,materialIndex:0};Vn.getNormal(Ao,Ro,Co,u.normal),h.face=u,h.barycoord=f}return h}class he extends kt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],f=[];let u=0,p=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new _t(l,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(f,2));function m(x,d,g,y,v,M,A,w,b,T,F){const _=M/b,S=A/T,D=M/2,I=A/2,P=w/2,O=b+1,N=T+1;let W=0,z=0;const te=new U;for(let ne=0;ne<N;ne++){const ce=ne*S-I;for(let Ae=0;Ae<O;Ae++){const Le=Ae*_-D;te[x]=Le*y,te[d]=ce*v,te[g]=P,l.push(te.x,te.y,te.z),te[x]=0,te[d]=0,te[g]=w>0?1:-1,h.push(te.x,te.y,te.z),f.push(Ae/b),f.push(1-ne/T),W+=1}}for(let ne=0;ne<T;ne++)for(let ce=0;ce<b;ce++){const Ae=u+ce+O*ne,Le=u+ce+O*(ne+1),X=u+(ce+1)+O*(ne+1),ae=u+(ce+1)+O*ne;c.push(Ae,Le,ae),c.push(Le,X,ae),z+=6}a.addGroup(p,z,F),p+=z,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new he(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function yr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function gn(i){const e={};for(let t=0;t<i.length;t++){const n=yr(i[t]);for(const s in n)e[s]=n[s]}return e}function Im(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function tf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}const nf={clone:yr,merge:gn};var Dm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ki extends si{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dm,this.fragmentShader=Nm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=yr(e.uniforms),this.uniformsGroups=Im(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class sf extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=Oi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yi=new U,au=new fe,cu=new fe;class xn extends sf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($r*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vr*2*Math.atan(Math.tan($r*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z),Yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z)}getViewSize(e,t){return this.getViewBounds(e,au,cu),t.subVectors(cu,au)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan($r*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Xs=-90,qs=1;class Um extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new xn(Xs,qs,e,t);s.layers=this.layers,this.add(s);const r=new xn(Xs,qs,e,t);r.layers=this.layers,this.add(r);const o=new xn(Xs,qs,e,t);o.layers=this.layers,this.add(o);const a=new xn(Xs,qs,e,t);a.layers=this.layers,this.add(a);const c=new xn(Xs,qs,e,t);c.layers=this.layers,this.add(c);const l=new xn(Xs,qs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Oi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===wa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(f,u,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class rf extends Gt{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:mr,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Fm extends As{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new rf(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Qt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new he(5,5,5),r=new ki({name:"CubemapFromEquirect",uniforms:yr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:vn,blending:os});r.uniforms.tEquirect.value=t;const o=new V(s,r),a=t.minFilter;return t.minFilter===gi&&(t.minFilter=Qt),new Um(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const uc=new U,Om=new U,zm=new Qe;class vs{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=uc.subVectors(n,t).cross(Om.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(uc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||zm.getNormalMatrix(e),s=this.coplanarPoint(uc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ms=new vi,Do=new U;class rh{constructor(e=new vs,t=new vs,n=new vs,s=new vs,r=new vs,o=new vs){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Oi){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],f=s[6],u=s[7],p=s[8],m=s[9],x=s[10],d=s[11],g=s[12],y=s[13],v=s[14],M=s[15];if(n[0].setComponents(c-r,u-l,d-p,M-g).normalize(),n[1].setComponents(c+r,u+l,d+p,M+g).normalize(),n[2].setComponents(c+o,u+h,d+m,M+y).normalize(),n[3].setComponents(c-o,u-h,d-m,M-y).normalize(),n[4].setComponents(c-a,u-f,d-x,M-v).normalize(),t===Oi)n[5].setComponents(c+a,u+f,d+x,M+v).normalize();else if(t===wa)n[5].setComponents(a,f,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ms.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ms.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ms)}intersectsSprite(e){return ms.center.set(0,0,0),ms.radius=.7071067811865476,ms.applyMatrix4(e.matrixWorld),this.intersectsSphere(ms)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Do.x=s.normal.x>0?e.max.x:e.min.x,Do.y=s.normal.y>0?e.max.y:e.min.y,Do.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Do)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function of(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Bm(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((p,m)=>p.start-m.start);let u=0;for(let p=1;p<f.length;p++){const m=f[u],x=f[p];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++u,f[u]=x)}f.length=u+1;for(let p=0,m=f.length;p<m;p++){const x=f[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class Ct extends kt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,f=e/a,u=t/c,p=[],m=[],x=[],d=[];for(let g=0;g<h;g++){const y=g*u-o;for(let v=0;v<l;v++){const M=v*f-r;m.push(M,-y,0),x.push(0,0,1),d.push(v/a),d.push(1-g/c)}}for(let g=0;g<c;g++)for(let y=0;y<a;y++){const v=y+l*g,M=y+l*(g+1),A=y+1+l*(g+1),w=y+1+l*g;p.push(v,M,w),p.push(M,A,w)}this.setIndex(p),this.setAttribute("position",new _t(m,3)),this.setAttribute("normal",new _t(x,3)),this.setAttribute("uv",new _t(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ct(e.width,e.height,e.widthSegments,e.heightSegments)}}var km=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Gm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ym=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Km=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,$m=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Qm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,e0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,i0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,s0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,o0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,a0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,c0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,l0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,h0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,u0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,d0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,f0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,p0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,m0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,g0="gl_FragColor = linearToOutputTexel( gl_FragColor );",x0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,v0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,y0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,M0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,S0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,w0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,b0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,E0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,T0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,A0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,R0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,C0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,P0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,L0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,I0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,D0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,N0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,U0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,F0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,z0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,B0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,k0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,H0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,G0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,V0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,W0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,q0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Y0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,K0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,j0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Z0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,J0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Q0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,eg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ng=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ig=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,rg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,og=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ag=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ug=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_g=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Sg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Eg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ag=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ig=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ng=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Og=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,qg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Yg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ex=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ix=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ox=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ax=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,hx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ux=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,px=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_x=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Je={alphahash_fragment:km,alphahash_pars_fragment:Hm,alphamap_fragment:Gm,alphamap_pars_fragment:Vm,alphatest_fragment:Wm,alphatest_pars_fragment:Xm,aomap_fragment:qm,aomap_pars_fragment:Ym,batching_pars_vertex:Km,batching_vertex:$m,begin_vertex:jm,beginnormal_vertex:Zm,bsdfs:Jm,iridescence_fragment:Qm,bumpmap_pars_fragment:e0,clipping_planes_fragment:t0,clipping_planes_pars_fragment:n0,clipping_planes_pars_vertex:i0,clipping_planes_vertex:s0,color_fragment:r0,color_pars_fragment:o0,color_pars_vertex:a0,color_vertex:c0,common:l0,cube_uv_reflection_fragment:h0,defaultnormal_vertex:u0,displacementmap_pars_vertex:d0,displacementmap_vertex:f0,emissivemap_fragment:p0,emissivemap_pars_fragment:m0,colorspace_fragment:g0,colorspace_pars_fragment:x0,envmap_fragment:_0,envmap_common_pars_fragment:v0,envmap_pars_fragment:y0,envmap_pars_vertex:M0,envmap_physical_pars_fragment:I0,envmap_vertex:S0,fog_vertex:w0,fog_pars_vertex:b0,fog_fragment:E0,fog_pars_fragment:T0,gradientmap_pars_fragment:A0,lightmap_pars_fragment:R0,lights_lambert_fragment:C0,lights_lambert_pars_fragment:P0,lights_pars_begin:L0,lights_toon_fragment:D0,lights_toon_pars_fragment:N0,lights_phong_fragment:U0,lights_phong_pars_fragment:F0,lights_physical_fragment:O0,lights_physical_pars_fragment:z0,lights_fragment_begin:B0,lights_fragment_maps:k0,lights_fragment_end:H0,logdepthbuf_fragment:G0,logdepthbuf_pars_fragment:V0,logdepthbuf_pars_vertex:W0,logdepthbuf_vertex:X0,map_fragment:q0,map_pars_fragment:Y0,map_particle_fragment:K0,map_particle_pars_fragment:$0,metalnessmap_fragment:j0,metalnessmap_pars_fragment:Z0,morphinstance_vertex:J0,morphcolor_vertex:Q0,morphnormal_vertex:eg,morphtarget_pars_vertex:tg,morphtarget_vertex:ng,normal_fragment_begin:ig,normal_fragment_maps:sg,normal_pars_fragment:rg,normal_pars_vertex:og,normal_vertex:ag,normalmap_pars_fragment:cg,clearcoat_normal_fragment_begin:lg,clearcoat_normal_fragment_maps:hg,clearcoat_pars_fragment:ug,iridescence_pars_fragment:dg,opaque_fragment:fg,packing:pg,premultiplied_alpha_fragment:mg,project_vertex:gg,dithering_fragment:xg,dithering_pars_fragment:_g,roughnessmap_fragment:vg,roughnessmap_pars_fragment:yg,shadowmap_pars_fragment:Mg,shadowmap_pars_vertex:Sg,shadowmap_vertex:wg,shadowmask_pars_fragment:bg,skinbase_vertex:Eg,skinning_pars_vertex:Tg,skinning_vertex:Ag,skinnormal_vertex:Rg,specularmap_fragment:Cg,specularmap_pars_fragment:Pg,tonemapping_fragment:Lg,tonemapping_pars_fragment:Ig,transmission_fragment:Dg,transmission_pars_fragment:Ng,uv_pars_fragment:Ug,uv_pars_vertex:Fg,uv_vertex:Og,worldpos_vertex:zg,background_vert:Bg,background_frag:kg,backgroundCube_vert:Hg,backgroundCube_frag:Gg,cube_vert:Vg,cube_frag:Wg,depth_vert:Xg,depth_frag:qg,distanceRGBA_vert:Yg,distanceRGBA_frag:Kg,equirect_vert:$g,equirect_frag:jg,linedashed_vert:Zg,linedashed_frag:Jg,meshbasic_vert:Qg,meshbasic_frag:ex,meshlambert_vert:tx,meshlambert_frag:nx,meshmatcap_vert:ix,meshmatcap_frag:sx,meshnormal_vert:rx,meshnormal_frag:ox,meshphong_vert:ax,meshphong_frag:cx,meshphysical_vert:lx,meshphysical_frag:hx,meshtoon_vert:ux,meshtoon_frag:dx,points_vert:fx,points_frag:px,shadow_vert:mx,shadow_frag:gx,sprite_vert:xx,sprite_frag:_x},Se={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},pi={basic:{uniforms:gn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:gn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new ke(0)}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:gn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:gn([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:gn([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new ke(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:gn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:gn([Se.points,Se.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:gn([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:gn([Se.common,Se.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:gn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:gn([Se.sprite,Se.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distanceRGBA:{uniforms:gn([Se.common,Se.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distanceRGBA_vert,fragmentShader:Je.distanceRGBA_frag},shadow:{uniforms:gn([Se.lights,Se.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};pi.physical={uniforms:gn([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};const No={r:0,b:0,g:0},gs=new yn,vx=new Ke;function yx(i,e,t,n,s,r,o){const a=new ke(0);let c=r===!0?0:1,l,h,f=null,u=0,p=null;function m(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function x(y){let v=!1;const M=m(y);M===null?g(a,c):M&&M.isColor&&(g(M,1),v=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function d(y,v){const M=m(v);M&&(M.isCubeTexture||M.mapping===La)?(h===void 0&&(h=new V(new he(1,1,1),new ki({name:"BackgroundCubeMaterial",uniforms:yr(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,w,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),gs.copy(v.backgroundRotation),gs.x*=-1,gs.y*=-1,gs.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(vx.makeRotationFromEuler(gs)),h.material.toneMapped=rt.getTransfer(M.colorSpace)!==bt,(f!==M||u!==M.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,f=M,u=M.version,p=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new V(new Ct(2,2),new ki({name:"BackgroundMaterial",uniforms:yr(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=rt.getTransfer(M.colorSpace)!==bt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||u!==M.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,f=M,u=M.version,p=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,v){y.getRGB(No,tf(i)),n.buffers.color.setClear(No.r,No.g,No.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),c=v,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,g(a,c)},render:x,addToRenderList:d}}function Mx(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(_,S,D,I,P){let O=!1;const N=f(I,D,S);r!==N&&(r=N,l(r.object)),O=p(_,I,D,P),O&&m(_,I,D,P),P!==null&&e.update(P,i.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,M(_,S,D,I),P!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(P).buffer))}function c(){return i.createVertexArray()}function l(_){return i.bindVertexArray(_)}function h(_){return i.deleteVertexArray(_)}function f(_,S,D){const I=D.wireframe===!0;let P=n[_.id];P===void 0&&(P={},n[_.id]=P);let O=P[S.id];O===void 0&&(O={},P[S.id]=O);let N=O[I];return N===void 0&&(N=u(c()),O[I]=N),N}function u(_){const S=[],D=[],I=[];for(let P=0;P<t;P++)S[P]=0,D[P]=0,I[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:D,attributeDivisors:I,object:_,attributes:{},index:null}}function p(_,S,D,I){const P=r.attributes,O=S.attributes;let N=0;const W=D.getAttributes();for(const z in W)if(W[z].location>=0){const ne=P[z];let ce=O[z];if(ce===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&(ce=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&(ce=_.instanceColor)),ne===void 0||ne.attribute!==ce||ce&&ne.data!==ce.data)return!0;N++}return r.attributesNum!==N||r.index!==I}function m(_,S,D,I){const P={},O=S.attributes;let N=0;const W=D.getAttributes();for(const z in W)if(W[z].location>=0){let ne=O[z];ne===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&(ne=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&(ne=_.instanceColor));const ce={};ce.attribute=ne,ne&&ne.data&&(ce.data=ne.data),P[z]=ce,N++}r.attributes=P,r.attributesNum=N,r.index=I}function x(){const _=r.newAttributes;for(let S=0,D=_.length;S<D;S++)_[S]=0}function d(_){g(_,0)}function g(_,S){const D=r.newAttributes,I=r.enabledAttributes,P=r.attributeDivisors;D[_]=1,I[_]===0&&(i.enableVertexAttribArray(_),I[_]=1),P[_]!==S&&(i.vertexAttribDivisor(_,S),P[_]=S)}function y(){const _=r.newAttributes,S=r.enabledAttributes;for(let D=0,I=S.length;D<I;D++)S[D]!==_[D]&&(i.disableVertexAttribArray(D),S[D]=0)}function v(_,S,D,I,P,O,N){N===!0?i.vertexAttribIPointer(_,S,D,P,O):i.vertexAttribPointer(_,S,D,I,P,O)}function M(_,S,D,I){x();const P=I.attributes,O=D.getAttributes(),N=S.defaultAttributeValues;for(const W in O){const z=O[W];if(z.location>=0){let te=P[W];if(te===void 0&&(W==="instanceMatrix"&&_.instanceMatrix&&(te=_.instanceMatrix),W==="instanceColor"&&_.instanceColor&&(te=_.instanceColor)),te!==void 0){const ne=te.normalized,ce=te.itemSize,Ae=e.get(te);if(Ae===void 0)continue;const Le=Ae.buffer,X=Ae.type,ae=Ae.bytesPerElement,ge=X===i.INT||X===i.UNSIGNED_INT||te.gpuType===jl;if(te.isInterleavedBufferAttribute){const ee=te.data,xe=ee.stride,de=te.offset;if(ee.isInstancedInterleavedBuffer){for(let Re=0;Re<z.locationSize;Re++)g(z.location+Re,ee.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Re=0;Re<z.locationSize;Re++)d(z.location+Re);i.bindBuffer(i.ARRAY_BUFFER,Le);for(let Re=0;Re<z.locationSize;Re++)v(z.location+Re,ce/z.locationSize,X,ne,xe*ae,(de+ce/z.locationSize*Re)*ae,ge)}else{if(te.isInstancedBufferAttribute){for(let ee=0;ee<z.locationSize;ee++)g(z.location+ee,te.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ee=0;ee<z.locationSize;ee++)d(z.location+ee);i.bindBuffer(i.ARRAY_BUFFER,Le);for(let ee=0;ee<z.locationSize;ee++)v(z.location+ee,ce/z.locationSize,X,ne,ce*ae,ce/z.locationSize*ee*ae,ge)}}else if(N!==void 0){const ne=N[W];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv(z.location,ne);break;case 3:i.vertexAttrib3fv(z.location,ne);break;case 4:i.vertexAttrib4fv(z.location,ne);break;default:i.vertexAttrib1fv(z.location,ne)}}}}y()}function A(){T();for(const _ in n){const S=n[_];for(const D in S){const I=S[D];for(const P in I)h(I[P].object),delete I[P];delete S[D]}delete n[_]}}function w(_){if(n[_.id]===void 0)return;const S=n[_.id];for(const D in S){const I=S[D];for(const P in I)h(I[P].object),delete I[P];delete S[D]}delete n[_.id]}function b(_){for(const S in n){const D=n[S];if(D[_.id]===void 0)continue;const I=D[_.id];for(const P in I)h(I[P].object),delete I[P];delete D[_.id]}}function T(){F(),o=!0,r!==s&&(r=s,l(r.object))}function F(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:F,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:b,initAttributes:x,enableAttribute:d,disableUnusedAttributes:y}}function Sx(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),t.update(h,n,f))}function a(l,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let p=0;for(let m=0;m<f;m++)p+=h[m];t.update(p,n,1)}function c(l,h,f,u){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<l.length;m++)o(l[m],h[m],u[m]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,f);let m=0;for(let x=0;x<f;x++)m+=h[x];for(let x=0;x<u.length;x++)t.update(m,n,u[x])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function wx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==Wn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const T=b===Fi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==Bi&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==En&&!T)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const b=e.get("EXT_clip_control");b.clipControlEXT(b.LOWER_LEFT_EXT,b.ZERO_TO_ONE_EXT)}const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=m>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:u,maxTextures:p,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:d,maxAttributes:g,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:M,vertexTextures:A,maxSamples:w}}function bx(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new vs,a=new Qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||n!==0||s;return s=u,n=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,p){const m=f.clippingPlanes,x=f.clipIntersection,d=f.clipShadows,g=i.get(f);if(!s||m===null||m.length===0||r&&!d)r?h(null):l();else{const y=r?0:n,v=y*4;let M=g.clippingState||null;c.value=M,M=h(m,u,v,p);for(let A=0;A!==v;++A)M[A]=t[A];g.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,p,m){const x=f!==null?f.length:0;let d=null;if(x!==0){if(d=c.value,m!==!0||d===null){const g=p+x*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(d===null||d.length<g)&&(d=new Float32Array(g));for(let v=0,M=p;v!==x;++v,M+=4)o.copy(f[v]).applyMatrix4(y,a),o.normal.toArray(d,M),d[M+3]=o.constant}c.value=d,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,d}}function Ex(i){let e=new WeakMap;function t(o,a){return a===tl?o.mapping=mr:a===nl&&(o.mapping=gr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===tl||a===nl)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Fm(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class oh extends sf{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const nr=4,lu=[.125,.215,.35,.446,.526,.582],Ss=20,dc=new oh,hu=new ke;let fc=null,pc=0,mc=0,gc=!1;const ys=(1+Math.sqrt(5))/2,Ys=1/ys,uu=[new U(-ys,Ys,0),new U(ys,Ys,0),new U(-Ys,0,ys),new U(Ys,0,ys),new U(0,ys,-Ys),new U(0,ys,Ys),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class Ll{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fc,pc,mc),this._renderer.xr.enabled=gc,e.scissorTest=!1,Uo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===mr||e.mapping===gr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:Fi,format:Wn,colorSpace:tn,depthBuffer:!1},s=du(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=du(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Tx(r)),this._blurMaterial=Ax(r,e,t)}return s}_compileMaterial(e){const t=new V(this._lodPlanes[0],e);this._renderer.compile(t,dc)}_sceneToCubeUV(e,t,n,s){const a=new xn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,u=h.toneMapping;h.getClearColor(hu),h.toneMapping=as,h.autoClear=!1;const p=new mt({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1}),m=new V(new he,p);let x=!1;const d=e.background;d?d.isColor&&(p.color.copy(d),e.background=null,x=!0):(p.color.copy(hu),x=!0);for(let g=0;g<6;g++){const y=g%3;y===0?(a.up.set(0,c[g],0),a.lookAt(l[g],0,0)):y===1?(a.up.set(0,0,c[g]),a.lookAt(0,l[g],0)):(a.up.set(0,c[g],0),a.lookAt(0,0,l[g]));const v=this._cubeSize;Uo(s,y*v,g>2?v:0,v,v),h.setRenderTarget(s),x&&h.render(m,a),h.render(e,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=u,h.autoClear=f,e.background=d}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===mr||e.mapping===gr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=pu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new V(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Uo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,dc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=uu[(s-r-1)%uu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new V(this._lodPlanes[s],l),u=l.uniforms,p=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ss-1),x=r/m,d=isFinite(r)?1+Math.floor(h*x):Ss;d>Ss&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Ss}`);const g=[];let y=0;for(let b=0;b<Ss;++b){const T=b/x,F=Math.exp(-T*T/2);g.push(F),b===0?y+=F:b<d&&(y+=2*F)}for(let b=0;b<g.length;b++)g[b]=g[b]/y;u.envMap.value=e.texture,u.samples.value=d,u.weights.value=g,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:v}=this;u.dTheta.value=m,u.mipInt.value=v-n;const M=this._sizeLods[s],A=3*M*(s>v-nr?s-v+nr:0),w=4*(this._cubeSize-M);Uo(t,A,w,3*M,2*M),c.setRenderTarget(t),c.render(f,dc)}}function Tx(i){const e=[],t=[],n=[];let s=i;const r=i-nr+1+lu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-nr?c=lu[o-i+nr-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,m=6,x=3,d=2,g=1,y=new Float32Array(x*m*p),v=new Float32Array(d*m*p),M=new Float32Array(g*m*p);for(let w=0;w<p;w++){const b=w%3*2/3-1,T=w>2?0:-1,F=[b,T,0,b+2/3,T,0,b+2/3,T+1,0,b,T,0,b+2/3,T+1,0,b,T+1,0];y.set(F,x*m*w),v.set(u,d*m*w);const _=[w,w,w,w,w,w];M.set(_,g*m*w)}const A=new kt;A.setAttribute("position",new en(y,x)),A.setAttribute("uv",new en(v,d)),A.setAttribute("faceIndex",new en(M,g)),e.push(A),s>nr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function du(i,e,t){const n=new As(i,e,t);return n.texture.mapping=La,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Uo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ax(i,e,t){const n=new Float32Array(Ss),s=new U(0,1,0);return new ki({name:"SphericalGaussianBlur",defines:{n:Ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ah(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:os,depthTest:!1,depthWrite:!1})}function fu(){return new ki({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ah(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:os,depthTest:!1,depthWrite:!1})}function pu(){return new ki({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ah(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:os,depthTest:!1,depthWrite:!1})}function ah(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Rx(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===tl||c===nl,h=c===mr||c===gr;if(l||h){let f=e.get(a);const u=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return t===null&&(t=new Ll(i)),f=l?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Ll(i)),f=l?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Cx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&pa("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Px(i,e,t,n){const s={},r=new WeakMap;function o(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);for(const m in u.morphAttributes){const x=u.morphAttributes[m];for(let d=0,g=x.length;d<g;d++)e.remove(x[d])}u.removeEventListener("dispose",o),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(f,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function c(f){const u=f.attributes;for(const m in u)e.update(u[m],i.ARRAY_BUFFER);const p=f.morphAttributes;for(const m in p){const x=p[m];for(let d=0,g=x.length;d<g;d++)e.update(x[d],i.ARRAY_BUFFER)}}function l(f){const u=[],p=f.index,m=f.attributes.position;let x=0;if(p!==null){const y=p.array;x=p.version;for(let v=0,M=y.length;v<M;v+=3){const A=y[v+0],w=y[v+1],b=y[v+2];u.push(A,w,w,b,b,A)}}else if(m!==void 0){const y=m.array;x=m.version;for(let v=0,M=y.length/3-1;v<M;v+=3){const A=v+0,w=v+1,b=v+2;u.push(A,w,w,b,b,A)}}else return;const d=new(Kd(u)?ef:Qd)(u,1);d.version=x;const g=r.get(f);g&&e.remove(g),r.set(f,d)}function h(f){const u=r.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function Lx(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,p){i.drawElements(n,p,r,u*o),t.update(p,n,1)}function l(u,p,m){m!==0&&(i.drawElementsInstanced(n,p,r,u*o,m),t.update(p,n,m))}function h(u,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,m);let d=0;for(let g=0;g<m;g++)d+=p[g];t.update(d,n,1)}function f(u,p,m,x){if(m===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<u.length;g++)l(u[g]/o,p[g],x[g]);else{d.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,x,0,m);let g=0;for(let y=0;y<m;y++)g+=p[y];for(let y=0;y<x.length;y++)t.update(g,n,x[y])}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function Ix(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Dx(i,e,t){const n=new WeakMap,s=new at;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==f){let F=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",F)};u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let v=0;p===!0&&(v=1),m===!0&&(v=2),x===!0&&(v=3);let M=a.attributes.position.count*v,A=1;M>e.maxTextureSize&&(A=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const w=new Float32Array(M*A*4*f),b=new jd(w,M,A,f);b.type=En,b.needsUpdate=!0;const T=v*4;for(let _=0;_<f;_++){const S=d[_],D=g[_],I=y[_],P=M*A*4*_;for(let O=0;O<S.count;O++){const N=O*T;p===!0&&(s.fromBufferAttribute(S,O),w[P+N+0]=s.x,w[P+N+1]=s.y,w[P+N+2]=s.z,w[P+N+3]=0),m===!0&&(s.fromBufferAttribute(D,O),w[P+N+4]=s.x,w[P+N+5]=s.y,w[P+N+6]=s.z,w[P+N+7]=0),x===!0&&(s.fromBufferAttribute(I,O),w[P+N+8]=s.x,w[P+N+9]=s.y,w[P+N+10]=s.z,w[P+N+11]=I.itemSize===4?s.w:1)}}u={count:f,texture:b,size:new fe(M,A)},n.set(a,u),a.addEventListener("dispose",F)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];const m=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Nx(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,f=e.get(c,h);if(s.get(f)!==l&&(e.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return f}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class af extends Gt{constructor(e,t,n,s,r,o,a,c,l,h=ar){if(h!==ar&&h!==_r)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ar&&(n=Ts),n===void 0&&h===_r&&(n=xr),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:_n,this.minFilter=c!==void 0?c:_n,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const cf=new Gt,mu=new af(1,1),lf=new jd,hf=new _m,uf=new rf,gu=[],xu=[],_u=new Float32Array(16),vu=new Float32Array(9),yu=new Float32Array(4);function Tr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=gu[s];if(r===void 0&&(r=new Float32Array(s),gu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Wt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Na(i,e){let t=xu[e];t===void 0&&(t=new Int32Array(e),xu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ux(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Fx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2fv(this.addr,e),Wt(t,e)}}function Ox(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;i.uniform3fv(this.addr,e),Wt(t,e)}}function zx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4fv(this.addr,e),Wt(t,e)}}function Bx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,n))return;yu.set(n),i.uniformMatrix2fv(this.addr,!1,yu),Wt(t,n)}}function kx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,n))return;vu.set(n),i.uniformMatrix3fv(this.addr,!1,vu),Wt(t,n)}}function Hx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,n))return;_u.set(n),i.uniformMatrix4fv(this.addr,!1,_u),Wt(t,n)}}function Gx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Vx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2iv(this.addr,e),Wt(t,e)}}function Wx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3iv(this.addr,e),Wt(t,e)}}function Xx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4iv(this.addr,e),Wt(t,e)}}function qx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Yx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2uiv(this.addr,e),Wt(t,e)}}function Kx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3uiv(this.addr,e),Wt(t,e)}}function $x(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4uiv(this.addr,e),Wt(t,e)}}function jx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(mu.compareFunction=Yd,r=mu):r=cf,t.setTexture2D(e||r,s)}function Zx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||hf,s)}function Jx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||uf,s)}function Qx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||lf,s)}function e_(i){switch(i){case 5126:return Ux;case 35664:return Fx;case 35665:return Ox;case 35666:return zx;case 35674:return Bx;case 35675:return kx;case 35676:return Hx;case 5124:case 35670:return Gx;case 35667:case 35671:return Vx;case 35668:case 35672:return Wx;case 35669:case 35673:return Xx;case 5125:return qx;case 36294:return Yx;case 36295:return Kx;case 36296:return $x;case 35678:case 36198:case 36298:case 36306:case 35682:return jx;case 35679:case 36299:case 36307:return Zx;case 35680:case 36300:case 36308:case 36293:return Jx;case 36289:case 36303:case 36311:case 36292:return Qx}}function t_(i,e){i.uniform1fv(this.addr,e)}function n_(i,e){const t=Tr(e,this.size,2);i.uniform2fv(this.addr,t)}function i_(i,e){const t=Tr(e,this.size,3);i.uniform3fv(this.addr,t)}function s_(i,e){const t=Tr(e,this.size,4);i.uniform4fv(this.addr,t)}function r_(i,e){const t=Tr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function o_(i,e){const t=Tr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function a_(i,e){const t=Tr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function c_(i,e){i.uniform1iv(this.addr,e)}function l_(i,e){i.uniform2iv(this.addr,e)}function h_(i,e){i.uniform3iv(this.addr,e)}function u_(i,e){i.uniform4iv(this.addr,e)}function d_(i,e){i.uniform1uiv(this.addr,e)}function f_(i,e){i.uniform2uiv(this.addr,e)}function p_(i,e){i.uniform3uiv(this.addr,e)}function m_(i,e){i.uniform4uiv(this.addr,e)}function g_(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||cf,r[o])}function x_(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||hf,r[o])}function __(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||uf,r[o])}function v_(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||lf,r[o])}function y_(i){switch(i){case 5126:return t_;case 35664:return n_;case 35665:return i_;case 35666:return s_;case 35674:return r_;case 35675:return o_;case 35676:return a_;case 5124:case 35670:return c_;case 35667:case 35671:return l_;case 35668:case 35672:return h_;case 35669:case 35673:return u_;case 5125:return d_;case 36294:return f_;case 36295:return p_;case 36296:return m_;case 35678:case 36198:case 36298:case 36306:case 35682:return g_;case 35679:case 36299:case 36307:return x_;case 35680:case 36300:case 36308:case 36293:return __;case 36289:case 36303:case 36311:case 36292:return v_}}class M_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=e_(t.type)}}class S_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=y_(t.type)}}class w_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const xc=/(\w+)(\])?(\[|\.)?/g;function Mu(i,e){i.seq.push(e),i.map[e.id]=e}function b_(i,e,t){const n=i.name,s=n.length;for(xc.lastIndex=0;;){const r=xc.exec(n),o=xc.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Mu(t,l===void 0?new M_(a,i,e):new S_(a,i,e));break}else{let f=t.map[a];f===void 0&&(f=new w_(a),Mu(t,f)),t=f}}}class ma{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);b_(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Su(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const E_=37297;let T_=0;function A_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function R_(i){const e=rt.getPrimaries(rt.workingColorSpace),t=rt.getPrimaries(i);let n;switch(e===t?n="":e===Sa&&t===Ma?n="LinearDisplayP3ToLinearSRGB":e===Ma&&t===Sa&&(n="LinearSRGBToLinearDisplayP3"),i){case tn:case Ia:return[n,"LinearTransferOETF"];case un:case ih:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function wu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+A_(i.getShaderSource(e),o)}else return s}function C_(i,e){const t=R_(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function P_(i,e){let t;switch(e){case Ap:t="Linear";break;case Rp:t="Reinhard";break;case Cp:t="Cineon";break;case Dd:t="ACESFilmic";break;case Lp:t="AgX";break;case Ip:t="Neutral";break;case Pp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Fo=new U;function L_(){rt.getLuminanceCoefficients(Fo);const i=Fo.x.toFixed(4),e=Fo.y.toFixed(4),t=Fo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function I_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xr).join(`
`)}function D_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function N_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Xr(i){return i!==""}function bu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Eu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const U_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Il(i){return i.replace(U_,O_)}const F_=new Map;function O_(i,e){let t=Je[e];if(t===void 0){const n=F_.get(e);if(n!==void 0)t=Je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Il(t)}const z_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tu(i){return i.replace(z_,B_)}function B_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Au(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function k_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Pd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ld?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Li&&(e="SHADOWMAP_TYPE_VSM"),e}function H_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case mr:case gr:e="ENVMAP_TYPE_CUBE";break;case La:e="ENVMAP_TYPE_CUBE_UV";break}return e}function G_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case gr:e="ENVMAP_MODE_REFRACTION";break}return e}function V_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Id:e="ENVMAP_BLENDING_MULTIPLY";break;case Ep:e="ENVMAP_BLENDING_MIX";break;case Tp:e="ENVMAP_BLENDING_ADD";break}return e}function W_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function X_(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=k_(t),l=H_(t),h=G_(t),f=V_(t),u=W_(t),p=I_(t),m=D_(r),x=s.createProgram();let d,g,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Xr).join(`
`),d.length>0&&(d+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Xr).join(`
`),g.length>0&&(g+=`
`)):(d=[Au(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xr).join(`
`),g=[Au(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==as?"#define TONE_MAPPING":"",t.toneMapping!==as?Je.tonemapping_pars_fragment:"",t.toneMapping!==as?P_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,C_("linearToOutputTexel",t.outputColorSpace),L_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xr).join(`
`)),o=Il(o),o=bu(o,t),o=Eu(o,t),a=Il(a),a=bu(a,t),a=Eu(a,t),o=Tu(o),a=Tu(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,g=["#define varying in",t.glslVersion===Wh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const v=y+d+o,M=y+g+a,A=Su(s,s.VERTEX_SHADER,v),w=Su(s,s.FRAGMENT_SHADER,M);s.attachShader(x,A),s.attachShader(x,w),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function b(S){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(x).trim(),I=s.getShaderInfoLog(A).trim(),P=s.getShaderInfoLog(w).trim();let O=!0,N=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,w);else{const W=wu(s,A,"vertex"),z=wu(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+D+`
`+W+`
`+z)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(I===""||P==="")&&(N=!1);N&&(S.diagnostics={runnable:O,programLog:D,vertexShader:{log:I,prefix:d},fragmentShader:{log:P,prefix:g}})}s.deleteShader(A),s.deleteShader(w),T=new ma(s,x),F=N_(s,x)}let T;this.getUniforms=function(){return T===void 0&&b(this),T};let F;this.getAttributes=function(){return F===void 0&&b(this),F};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(x,E_)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=T_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=w,this}let q_=0;class Y_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new K_(e),t.set(e,n)),n}}class K_{constructor(e){this.id=q_++,this.code=e,this.usedTimes=0}}function $_(i,e,t,n,s,r,o){const a=new Zd,c=new Y_,l=new Set,h=[],f=s.logarithmicDepthBuffer,u=s.reverseDepthBuffer,p=s.vertexTextures;let m=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(_){return l.add(_),_===0?"uv":`uv${_}`}function g(_,S,D,I,P){const O=I.fog,N=P.geometry,W=_.isMeshStandardMaterial?I.environment:null,z=(_.isMeshStandardMaterial?t:e).get(_.envMap||W),te=z&&z.mapping===La?z.image.height:null,ne=x[_.type];_.precision!==null&&(m=s.getMaxPrecision(_.precision),m!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",m,"instead."));const ce=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Ae=ce!==void 0?ce.length:0;let Le=0;N.morphAttributes.position!==void 0&&(Le=1),N.morphAttributes.normal!==void 0&&(Le=2),N.morphAttributes.color!==void 0&&(Le=3);let X,ae,ge,ee;if(ne){const Sn=pi[ne];X=Sn.vertexShader,ae=Sn.fragmentShader}else X=_.vertexShader,ae=_.fragmentShader,c.update(_),ge=c.getVertexShaderID(_),ee=c.getFragmentShaderID(_);const xe=i.getRenderTarget(),de=P.isInstancedMesh===!0,Re=P.isBatchedMesh===!0,He=!!_.map,ie=!!_.matcap,C=!!z,le=!!_.aoMap,j=!!_.lightMap,$=!!_.bumpMap,se=!!_.normalMap,pe=!!_.displacementMap,me=!!_.emissiveMap,L=!!_.metalnessMap,E=!!_.roughnessMap,G=_.anisotropy>0,Q=_.clearcoat>0,re=_.dispersion>0,Z=_.iridescence>0,we=_.sheen>0,ye=_.transmission>0,Me=G&&!!_.anisotropyMap,Xe=Q&&!!_.clearcoatMap,ue=Q&&!!_.clearcoatNormalMap,Te=Q&&!!_.clearcoatRoughnessMap,Ge=Z&&!!_.iridescenceMap,je=Z&&!!_.iridescenceThicknessMap,Ie=we&&!!_.sheenColorMap,nt=we&&!!_.sheenRoughnessMap,Ze=!!_.specularMap,vt=!!_.specularColorMap,B=!!_.specularIntensityMap,Ce=ye&&!!_.transmissionMap,J=ye&&!!_.thicknessMap,oe=!!_.gradientMap,be=!!_.alphaMap,Pe=_.alphaTest>0,it=!!_.alphaHash,Nt=!!_.extensions;let Mn=as;_.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(Mn=i.toneMapping);const ot={shaderID:ne,shaderType:_.type,shaderName:_.name,vertexShader:X,fragmentShader:ae,defines:_.defines,customVertexShaderID:ge,customFragmentShaderID:ee,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:m,batching:Re,batchingColor:Re&&P._colorsTexture!==null,instancing:de,instancingColor:de&&P.instanceColor!==null,instancingMorph:de&&P.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:tn,alphaToCoverage:!!_.alphaToCoverage,map:He,matcap:ie,envMap:C,envMapMode:C&&z.mapping,envMapCubeUVHeight:te,aoMap:le,lightMap:j,bumpMap:$,normalMap:se,displacementMap:p&&pe,emissiveMap:me,normalMapObjectSpace:se&&_.normalMapType===zp,normalMapTangentSpace:se&&_.normalMapType===qd,metalnessMap:L,roughnessMap:E,anisotropy:G,anisotropyMap:Me,clearcoat:Q,clearcoatMap:Xe,clearcoatNormalMap:ue,clearcoatRoughnessMap:Te,dispersion:re,iridescence:Z,iridescenceMap:Ge,iridescenceThicknessMap:je,sheen:we,sheenColorMap:Ie,sheenRoughnessMap:nt,specularMap:Ze,specularColorMap:vt,specularIntensityMap:B,transmission:ye,transmissionMap:Ce,thicknessMap:J,gradientMap:oe,opaque:_.transparent===!1&&_.blending===or&&_.alphaToCoverage===!1,alphaMap:be,alphaTest:Pe,alphaHash:it,combine:_.combine,mapUv:He&&d(_.map.channel),aoMapUv:le&&d(_.aoMap.channel),lightMapUv:j&&d(_.lightMap.channel),bumpMapUv:$&&d(_.bumpMap.channel),normalMapUv:se&&d(_.normalMap.channel),displacementMapUv:pe&&d(_.displacementMap.channel),emissiveMapUv:me&&d(_.emissiveMap.channel),metalnessMapUv:L&&d(_.metalnessMap.channel),roughnessMapUv:E&&d(_.roughnessMap.channel),anisotropyMapUv:Me&&d(_.anisotropyMap.channel),clearcoatMapUv:Xe&&d(_.clearcoatMap.channel),clearcoatNormalMapUv:ue&&d(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&d(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Ge&&d(_.iridescenceMap.channel),iridescenceThicknessMapUv:je&&d(_.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&d(_.sheenColorMap.channel),sheenRoughnessMapUv:nt&&d(_.sheenRoughnessMap.channel),specularMapUv:Ze&&d(_.specularMap.channel),specularColorMapUv:vt&&d(_.specularColorMap.channel),specularIntensityMapUv:B&&d(_.specularIntensityMap.channel),transmissionMapUv:Ce&&d(_.transmissionMap.channel),thicknessMapUv:J&&d(_.thicknessMap.channel),alphaMapUv:be&&d(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(se||G),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!N.attributes.uv&&(He||be),fog:!!O,useFog:_.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:u,skinning:P.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:Le,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Mn,decodeVideoTexture:He&&_.map.isVideoTexture===!0&&rt.getTransfer(_.map.colorSpace)===bt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Jt,flipSided:_.side===vn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Nt&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Nt&&_.extensions.multiDraw===!0||Re)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ot.vertexUv1s=l.has(1),ot.vertexUv2s=l.has(2),ot.vertexUv3s=l.has(3),l.clear(),ot}function y(_){const S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(const D in _.defines)S.push(D),S.push(_.defines[D]);return _.isRawShaderMaterial===!1&&(v(S,_),M(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function v(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function M(_,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.alphaToCoverage&&a.enable(20),_.push(a.mask)}function A(_){const S=x[_.type];let D;if(S){const I=pi[S];D=nf.clone(I.uniforms)}else D=_.uniforms;return D}function w(_,S){let D;for(let I=0,P=h.length;I<P;I++){const O=h[I];if(O.cacheKey===S){D=O,++D.usedTimes;break}}return D===void 0&&(D=new X_(i,S,_,r),h.push(D)),D}function b(_){if(--_.usedTimes===0){const S=h.indexOf(_);h[S]=h[h.length-1],h.pop(),_.destroy()}}function T(_){c.remove(_)}function F(){c.dispose()}return{getParameters:g,getProgramCacheKey:y,getUniforms:A,acquireProgram:w,releaseProgram:b,releaseShaderCache:T,programs:h,dispose:F}}function j_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Z_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ru(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Cu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f,u,p,m,x,d){let g=i[e];return g===void 0?(g={id:f.id,object:f,geometry:u,material:p,groupOrder:m,renderOrder:f.renderOrder,z:x,group:d},i[e]=g):(g.id=f.id,g.object=f,g.geometry=u,g.material=p,g.groupOrder=m,g.renderOrder=f.renderOrder,g.z=x,g.group=d),e++,g}function a(f,u,p,m,x,d){const g=o(f,u,p,m,x,d);p.transmission>0?n.push(g):p.transparent===!0?s.push(g):t.push(g)}function c(f,u,p,m,x,d){const g=o(f,u,p,m,x,d);p.transmission>0?n.unshift(g):p.transparent===!0?s.unshift(g):t.unshift(g)}function l(f,u){t.length>1&&t.sort(f||Z_),n.length>1&&n.sort(u||Ru),s.length>1&&s.sort(u||Ru)}function h(){for(let f=e,u=i.length;f<u;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function J_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new Cu,i.set(n,[o])):s>=r.length?(o=new Cu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Q_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new ke};break;case"SpotLight":t={position:new U,direction:new U,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function ev(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let tv=0;function nv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function iv(i){const e=new Q_,t=ev(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new U);const s=new U,r=new Ke,o=new Ke;function a(l){let h=0,f=0,u=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let p=0,m=0,x=0,d=0,g=0,y=0,v=0,M=0,A=0,w=0,b=0;l.sort(nv);for(let F=0,_=l.length;F<_;F++){const S=l[F],D=S.color,I=S.intensity,P=S.distance,O=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)h+=D.r*I,f+=D.g*I,u+=D.b*I;else if(S.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(S.sh.coefficients[N],I);b++}else if(S.isDirectionalLight){const N=e.get(S);if(N.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const W=S.shadow,z=t.get(S);z.shadowIntensity=W.intensity,z.shadowBias=W.bias,z.shadowNormalBias=W.normalBias,z.shadowRadius=W.radius,z.shadowMapSize=W.mapSize,n.directionalShadow[p]=z,n.directionalShadowMap[p]=O,n.directionalShadowMatrix[p]=S.shadow.matrix,y++}n.directional[p]=N,p++}else if(S.isSpotLight){const N=e.get(S);N.position.setFromMatrixPosition(S.matrixWorld),N.color.copy(D).multiplyScalar(I),N.distance=P,N.coneCos=Math.cos(S.angle),N.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),N.decay=S.decay,n.spot[x]=N;const W=S.shadow;if(S.map&&(n.spotLightMap[A]=S.map,A++,W.updateMatrices(S),S.castShadow&&w++),n.spotLightMatrix[x]=W.matrix,S.castShadow){const z=t.get(S);z.shadowIntensity=W.intensity,z.shadowBias=W.bias,z.shadowNormalBias=W.normalBias,z.shadowRadius=W.radius,z.shadowMapSize=W.mapSize,n.spotShadow[x]=z,n.spotShadowMap[x]=O,M++}x++}else if(S.isRectAreaLight){const N=e.get(S);N.color.copy(D).multiplyScalar(I),N.halfWidth.set(S.width*.5,0,0),N.halfHeight.set(0,S.height*.5,0),n.rectArea[d]=N,d++}else if(S.isPointLight){const N=e.get(S);if(N.color.copy(S.color).multiplyScalar(S.intensity),N.distance=S.distance,N.decay=S.decay,S.castShadow){const W=S.shadow,z=t.get(S);z.shadowIntensity=W.intensity,z.shadowBias=W.bias,z.shadowNormalBias=W.normalBias,z.shadowRadius=W.radius,z.shadowMapSize=W.mapSize,z.shadowCameraNear=W.camera.near,z.shadowCameraFar=W.camera.far,n.pointShadow[m]=z,n.pointShadowMap[m]=O,n.pointShadowMatrix[m]=S.shadow.matrix,v++}n.point[m]=N,m++}else if(S.isHemisphereLight){const N=e.get(S);N.skyColor.copy(S.color).multiplyScalar(I),N.groundColor.copy(S.groundColor).multiplyScalar(I),n.hemi[g]=N,g++}}d>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Se.LTC_FLOAT_1,n.rectAreaLTC2=Se.LTC_FLOAT_2):(n.rectAreaLTC1=Se.LTC_HALF_1,n.rectAreaLTC2=Se.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const T=n.hash;(T.directionalLength!==p||T.pointLength!==m||T.spotLength!==x||T.rectAreaLength!==d||T.hemiLength!==g||T.numDirectionalShadows!==y||T.numPointShadows!==v||T.numSpotShadows!==M||T.numSpotMaps!==A||T.numLightProbes!==b)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=d,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=M+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=b,T.directionalLength=p,T.pointLength=m,T.spotLength=x,T.rectAreaLength=d,T.hemiLength=g,T.numDirectionalShadows=y,T.numPointShadows=v,T.numSpotShadows=M,T.numSpotMaps=A,T.numLightProbes=b,n.version=tv++)}function c(l,h){let f=0,u=0,p=0,m=0,x=0;const d=h.matrixWorldInverse;for(let g=0,y=l.length;g<y;g++){const v=l[g];if(v.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(d),f++}else if(v.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(d),M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(d),p++}else if(v.isRectAreaLight){const M=n.rectArea[m];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(d),o.identity(),r.copy(v.matrixWorld),r.premultiply(d),o.extractRotation(r),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),m++}else if(v.isPointLight){const M=n.point[u];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(d),u++}else if(v.isHemisphereLight){const M=n.hemi[x];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(d),x++}}}return{setup:a,setupView:c,state:n}}function Pu(i){const e=new iv(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function sv(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Pu(i),e.set(s,[a])):r>=o.length?(a=new Pu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class rv extends si{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ov extends si{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const av=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function lv(i,e,t){let n=new rh;const s=new fe,r=new fe,o=new at,a=new rv({depthPacking:Op}),c=new ov,l={},h=t.maxTextureSize,f={[zi]:vn,[vn]:zi,[Jt]:Jt},u=new ki({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:av,fragmentShader:cv}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const m=new kt;m.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new V(m,u),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pd;let g=this.type;this.render=function(w,b,T){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||w.length===0)return;const F=i.getRenderTarget(),_=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),D=i.state;D.setBlending(os),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const I=g!==Li&&this.type===Li,P=g===Li&&this.type!==Li;for(let O=0,N=w.length;O<N;O++){const W=w[O],z=W.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const te=z.getFrameExtents();if(s.multiply(te),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/te.x),s.x=r.x*te.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/te.y),s.y=r.y*te.y,z.mapSize.y=r.y)),z.map===null||I===!0||P===!0){const ce=this.type!==Li?{minFilter:_n,magFilter:_n}:{};z.map!==null&&z.map.dispose(),z.map=new As(s.x,s.y,ce),z.map.texture.name=W.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const ne=z.getViewportCount();for(let ce=0;ce<ne;ce++){const Ae=z.getViewport(ce);o.set(r.x*Ae.x,r.y*Ae.y,r.x*Ae.z,r.y*Ae.w),D.viewport(o),z.updateMatrices(W,ce),n=z.getFrustum(),M(b,T,z.camera,W,this.type)}z.isPointLightShadow!==!0&&this.type===Li&&y(z,T),z.needsUpdate=!1}g=this.type,d.needsUpdate=!1,i.setRenderTarget(F,_,S)};function y(w,b){const T=e.update(x);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new As(s.x,s.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(b,null,T,u,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(b,null,T,p,x,null)}function v(w,b,T,F){let _=null;const S=T.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(S!==void 0)_=S;else if(_=T.isPointLight===!0?c:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const D=_.uuid,I=b.uuid;let P=l[D];P===void 0&&(P={},l[D]=P);let O=P[I];O===void 0&&(O=_.clone(),P[I]=O,b.addEventListener("dispose",A)),_=O}if(_.visible=b.visible,_.wireframe=b.wireframe,F===Li?_.side=b.shadowSide!==null?b.shadowSide:b.side:_.side=b.shadowSide!==null?b.shadowSide:f[b.side],_.alphaMap=b.alphaMap,_.alphaTest=b.alphaTest,_.map=b.map,_.clipShadows=b.clipShadows,_.clippingPlanes=b.clippingPlanes,_.clipIntersection=b.clipIntersection,_.displacementMap=b.displacementMap,_.displacementScale=b.displacementScale,_.displacementBias=b.displacementBias,_.wireframeLinewidth=b.wireframeLinewidth,_.linewidth=b.linewidth,T.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const D=i.properties.get(_);D.light=T}return _}function M(w,b,T,F,_){if(w.visible===!1)return;if(w.layers.test(b.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&_===Li)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,w.matrixWorld);const I=e.update(w),P=w.material;if(Array.isArray(P)){const O=I.groups;for(let N=0,W=O.length;N<W;N++){const z=O[N],te=P[z.materialIndex];if(te&&te.visible){const ne=v(w,te,F,_);w.onBeforeShadow(i,w,b,T,I,ne,z),i.renderBufferDirect(T,null,I,ne,w,z),w.onAfterShadow(i,w,b,T,I,ne,z)}}}else if(P.visible){const O=v(w,P,F,_);w.onBeforeShadow(i,w,b,T,I,O,null),i.renderBufferDirect(T,null,I,O,w,null),w.onAfterShadow(i,w,b,T,I,O,null)}}const D=w.children;for(let I=0,P=D.length;I<P;I++)M(D[I],b,T,F,_)}function A(w){w.target.removeEventListener("dispose",A);for(const T in l){const F=l[T],_=w.target.uuid;_ in F&&(F[_].dispose(),delete F[_])}}}const hv={[Kc]:$c,[jc]:Qc,[Zc]:el,[pr]:Jc,[$c]:Kc,[Qc]:jc,[el]:Zc,[Jc]:pr};function uv(i){function e(){let B=!1;const Ce=new at;let J=null;const oe=new at(0,0,0,0);return{setMask:function(be){J!==be&&!B&&(i.colorMask(be,be,be,be),J=be)},setLocked:function(be){B=be},setClear:function(be,Pe,it,Nt,Mn){Mn===!0&&(be*=Nt,Pe*=Nt,it*=Nt),Ce.set(be,Pe,it,Nt),oe.equals(Ce)===!1&&(i.clearColor(be,Pe,it,Nt),oe.copy(Ce))},reset:function(){B=!1,J=null,oe.set(-1,0,0,0)}}}function t(){let B=!1,Ce=!1,J=null,oe=null,be=null;return{setReversed:function(Pe){Ce=Pe},setTest:function(Pe){Pe?ge(i.DEPTH_TEST):ee(i.DEPTH_TEST)},setMask:function(Pe){J!==Pe&&!B&&(i.depthMask(Pe),J=Pe)},setFunc:function(Pe){if(Ce&&(Pe=hv[Pe]),oe!==Pe){switch(Pe){case Kc:i.depthFunc(i.NEVER);break;case $c:i.depthFunc(i.ALWAYS);break;case jc:i.depthFunc(i.LESS);break;case pr:i.depthFunc(i.LEQUAL);break;case Zc:i.depthFunc(i.EQUAL);break;case Jc:i.depthFunc(i.GEQUAL);break;case Qc:i.depthFunc(i.GREATER);break;case el:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=Pe}},setLocked:function(Pe){B=Pe},setClear:function(Pe){be!==Pe&&(i.clearDepth(Pe),be=Pe)},reset:function(){B=!1,J=null,oe=null,be=null}}}function n(){let B=!1,Ce=null,J=null,oe=null,be=null,Pe=null,it=null,Nt=null,Mn=null;return{setTest:function(ot){B||(ot?ge(i.STENCIL_TEST):ee(i.STENCIL_TEST))},setMask:function(ot){Ce!==ot&&!B&&(i.stencilMask(ot),Ce=ot)},setFunc:function(ot,Sn,wi){(J!==ot||oe!==Sn||be!==wi)&&(i.stencilFunc(ot,Sn,wi),J=ot,oe=Sn,be=wi)},setOp:function(ot,Sn,wi){(Pe!==ot||it!==Sn||Nt!==wi)&&(i.stencilOp(ot,Sn,wi),Pe=ot,it=Sn,Nt=wi)},setLocked:function(ot){B=ot},setClear:function(ot){Mn!==ot&&(i.clearStencil(ot),Mn=ot)},reset:function(){B=!1,Ce=null,J=null,oe=null,be=null,Pe=null,it=null,Nt=null,Mn=null}}}const s=new e,r=new t,o=new n,a=new WeakMap,c=new WeakMap;let l={},h={},f=new WeakMap,u=[],p=null,m=!1,x=null,d=null,g=null,y=null,v=null,M=null,A=null,w=new ke(0,0,0),b=0,T=!1,F=null,_=null,S=null,D=null,I=null;const P=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,N=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(W)[1]),O=N>=1):W.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),O=N>=2);let z=null,te={};const ne=i.getParameter(i.SCISSOR_BOX),ce=i.getParameter(i.VIEWPORT),Ae=new at().fromArray(ne),Le=new at().fromArray(ce);function X(B,Ce,J,oe){const be=new Uint8Array(4),Pe=i.createTexture();i.bindTexture(B,Pe),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let it=0;it<J;it++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(Ce,0,i.RGBA,1,1,oe,0,i.RGBA,i.UNSIGNED_BYTE,be):i.texImage2D(Ce+it,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,be);return Pe}const ae={};ae[i.TEXTURE_2D]=X(i.TEXTURE_2D,i.TEXTURE_2D,1),ae[i.TEXTURE_CUBE_MAP]=X(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[i.TEXTURE_2D_ARRAY]=X(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ae[i.TEXTURE_3D]=X(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ge(i.DEPTH_TEST),r.setFunc(pr),j(!1),$(Fh),ge(i.CULL_FACE),C(os);function ge(B){l[B]!==!0&&(i.enable(B),l[B]=!0)}function ee(B){l[B]!==!1&&(i.disable(B),l[B]=!1)}function xe(B,Ce){return h[B]!==Ce?(i.bindFramebuffer(B,Ce),h[B]=Ce,B===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Ce),B===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Ce),!0):!1}function de(B,Ce){let J=u,oe=!1;if(B){J=f.get(Ce),J===void 0&&(J=[],f.set(Ce,J));const be=B.textures;if(J.length!==be.length||J[0]!==i.COLOR_ATTACHMENT0){for(let Pe=0,it=be.length;Pe<it;Pe++)J[Pe]=i.COLOR_ATTACHMENT0+Pe;J.length=be.length,oe=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,oe=!0);oe&&i.drawBuffers(J)}function Re(B){return p!==B?(i.useProgram(B),p=B,!0):!1}const He={[Ms]:i.FUNC_ADD,[cp]:i.FUNC_SUBTRACT,[lp]:i.FUNC_REVERSE_SUBTRACT};He[hp]=i.MIN,He[up]=i.MAX;const ie={[dp]:i.ZERO,[fp]:i.ONE,[pp]:i.SRC_COLOR,[qc]:i.SRC_ALPHA,[yp]:i.SRC_ALPHA_SATURATE,[_p]:i.DST_COLOR,[gp]:i.DST_ALPHA,[mp]:i.ONE_MINUS_SRC_COLOR,[Yc]:i.ONE_MINUS_SRC_ALPHA,[vp]:i.ONE_MINUS_DST_COLOR,[xp]:i.ONE_MINUS_DST_ALPHA,[Mp]:i.CONSTANT_COLOR,[Sp]:i.ONE_MINUS_CONSTANT_COLOR,[wp]:i.CONSTANT_ALPHA,[bp]:i.ONE_MINUS_CONSTANT_ALPHA};function C(B,Ce,J,oe,be,Pe,it,Nt,Mn,ot){if(B===os){m===!0&&(ee(i.BLEND),m=!1);return}if(m===!1&&(ge(i.BLEND),m=!0),B!==ap){if(B!==x||ot!==T){if((d!==Ms||v!==Ms)&&(i.blendEquation(i.FUNC_ADD),d=Ms,v=Ms),ot)switch(B){case or:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case to:i.blendFunc(i.ONE,i.ONE);break;case Oh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case or:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case to:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Oh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}g=null,y=null,M=null,A=null,w.set(0,0,0),b=0,x=B,T=ot}return}be=be||Ce,Pe=Pe||J,it=it||oe,(Ce!==d||be!==v)&&(i.blendEquationSeparate(He[Ce],He[be]),d=Ce,v=be),(J!==g||oe!==y||Pe!==M||it!==A)&&(i.blendFuncSeparate(ie[J],ie[oe],ie[Pe],ie[it]),g=J,y=oe,M=Pe,A=it),(Nt.equals(w)===!1||Mn!==b)&&(i.blendColor(Nt.r,Nt.g,Nt.b,Mn),w.copy(Nt),b=Mn),x=B,T=!1}function le(B,Ce){B.side===Jt?ee(i.CULL_FACE):ge(i.CULL_FACE);let J=B.side===vn;Ce&&(J=!J),j(J),B.blending===or&&B.transparent===!1?C(os):C(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),r.setFunc(B.depthFunc),r.setTest(B.depthTest),r.setMask(B.depthWrite),s.setMask(B.colorWrite);const oe=B.stencilWrite;o.setTest(oe),oe&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),pe(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?ge(i.SAMPLE_ALPHA_TO_COVERAGE):ee(i.SAMPLE_ALPHA_TO_COVERAGE)}function j(B){F!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),F=B)}function $(B){B!==rp?(ge(i.CULL_FACE),B!==_&&(B===Fh?i.cullFace(i.BACK):B===op?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ee(i.CULL_FACE),_=B}function se(B){B!==S&&(O&&i.lineWidth(B),S=B)}function pe(B,Ce,J){B?(ge(i.POLYGON_OFFSET_FILL),(D!==Ce||I!==J)&&(i.polygonOffset(Ce,J),D=Ce,I=J)):ee(i.POLYGON_OFFSET_FILL)}function me(B){B?ge(i.SCISSOR_TEST):ee(i.SCISSOR_TEST)}function L(B){B===void 0&&(B=i.TEXTURE0+P-1),z!==B&&(i.activeTexture(B),z=B)}function E(B,Ce,J){J===void 0&&(z===null?J=i.TEXTURE0+P-1:J=z);let oe=te[J];oe===void 0&&(oe={type:void 0,texture:void 0},te[J]=oe),(oe.type!==B||oe.texture!==Ce)&&(z!==J&&(i.activeTexture(J),z=J),i.bindTexture(B,Ce||ae[B]),oe.type=B,oe.texture=Ce)}function G(){const B=te[z];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function Q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function re(){try{i.compressedTexImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function we(){try{i.texSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ye(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Me(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Xe(){try{i.texStorage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ue(){try{i.texStorage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Te(){try{i.texImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ge(){try{i.texImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function je(B){Ae.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),Ae.copy(B))}function Ie(B){Le.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),Le.copy(B))}function nt(B,Ce){let J=c.get(Ce);J===void 0&&(J=new WeakMap,c.set(Ce,J));let oe=J.get(B);oe===void 0&&(oe=i.getUniformBlockIndex(Ce,B.name),J.set(B,oe))}function Ze(B,Ce){const oe=c.get(Ce).get(B);a.get(Ce)!==oe&&(i.uniformBlockBinding(Ce,oe,B.__bindingPointIndex),a.set(Ce,oe))}function vt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},z=null,te={},h={},f=new WeakMap,u=[],p=null,m=!1,x=null,d=null,g=null,y=null,v=null,M=null,A=null,w=new ke(0,0,0),b=0,T=!1,F=null,_=null,S=null,D=null,I=null,Ae.set(0,0,i.canvas.width,i.canvas.height),Le.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:ge,disable:ee,bindFramebuffer:xe,drawBuffers:de,useProgram:Re,setBlending:C,setMaterial:le,setFlipSided:j,setCullFace:$,setLineWidth:se,setPolygonOffset:pe,setScissorTest:me,activeTexture:L,bindTexture:E,unbindTexture:G,compressedTexImage2D:Q,compressedTexImage3D:re,texImage2D:Te,texImage3D:Ge,updateUBOMapping:nt,uniformBlockBinding:Ze,texStorage2D:Xe,texStorage3D:ue,texSubImage2D:Z,texSubImage3D:we,compressedTexSubImage2D:ye,compressedTexSubImage3D:Me,scissor:je,viewport:Ie,reset:vt}}function Lu(i,e,t,n){const s=dv(n);switch(t){case Bd:return i*e;case Hd:return i*e;case Gd:return i*e*2;case Ql:return i*e/s.components*s.byteLength;case eh:return i*e/s.components*s.byteLength;case Vd:return i*e*2/s.components*s.byteLength;case th:return i*e*2/s.components*s.byteLength;case kd:return i*e*3/s.components*s.byteLength;case Wn:return i*e*4/s.components*s.byteLength;case nh:return i*e*4/s.components*s.byteLength;case la:case ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ua:case da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sl:case ol:return Math.max(i,16)*Math.max(e,8)/4;case il:case rl:return Math.max(i,8)*Math.max(e,8)/2;case al:case cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ll:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ul:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case dl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case pl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ml:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case gl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case xl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case vl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case yl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ml:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Sl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case wl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case fa:case bl:case El:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Wd:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Al:case Rl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function dv(i){switch(i){case Bi:case Fd:return{byteLength:1,components:1};case no:case Od:case Fi:return{byteLength:2,components:1};case Zl:case Jl:return{byteLength:2,components:4};case Ts:case jl:case En:return{byteLength:4,components:1};case zd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function fv(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new fe,h=new WeakMap;let f;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(L,E){return p?new OffscreenCanvas(L,E):ro("canvas")}function x(L,E,G){let Q=1;const re=me(L);if((re.width>G||re.height>G)&&(Q=G/Math.max(re.width,re.height)),Q<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const Z=Math.floor(Q*re.width),we=Math.floor(Q*re.height);f===void 0&&(f=m(Z,we));const ye=E?m(Z,we):f;return ye.width=Z,ye.height=we,ye.getContext("2d").drawImage(L,0,0,Z,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+Z+"x"+we+")."),ye}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),L;return L}function d(L){return L.generateMipmaps&&L.minFilter!==_n&&L.minFilter!==Qt}function g(L){i.generateMipmap(L)}function y(L,E,G,Q,re=!1){if(L!==null){if(i[L]!==void 0)return i[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Z=E;if(E===i.RED&&(G===i.FLOAT&&(Z=i.R32F),G===i.HALF_FLOAT&&(Z=i.R16F),G===i.UNSIGNED_BYTE&&(Z=i.R8)),E===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.R8UI),G===i.UNSIGNED_SHORT&&(Z=i.R16UI),G===i.UNSIGNED_INT&&(Z=i.R32UI),G===i.BYTE&&(Z=i.R8I),G===i.SHORT&&(Z=i.R16I),G===i.INT&&(Z=i.R32I)),E===i.RG&&(G===i.FLOAT&&(Z=i.RG32F),G===i.HALF_FLOAT&&(Z=i.RG16F),G===i.UNSIGNED_BYTE&&(Z=i.RG8)),E===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.RG8UI),G===i.UNSIGNED_SHORT&&(Z=i.RG16UI),G===i.UNSIGNED_INT&&(Z=i.RG32UI),G===i.BYTE&&(Z=i.RG8I),G===i.SHORT&&(Z=i.RG16I),G===i.INT&&(Z=i.RG32I)),E===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),G===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),G===i.UNSIGNED_INT&&(Z=i.RGB32UI),G===i.BYTE&&(Z=i.RGB8I),G===i.SHORT&&(Z=i.RGB16I),G===i.INT&&(Z=i.RGB32I)),E===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),G===i.UNSIGNED_INT&&(Z=i.RGBA32UI),G===i.BYTE&&(Z=i.RGBA8I),G===i.SHORT&&(Z=i.RGBA16I),G===i.INT&&(Z=i.RGBA32I)),E===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),E===i.RGBA){const we=re?ya:rt.getTransfer(Q);G===i.FLOAT&&(Z=i.RGBA32F),G===i.HALF_FLOAT&&(Z=i.RGBA16F),G===i.UNSIGNED_BYTE&&(Z=we===bt?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function v(L,E){let G;return L?E===null||E===Ts||E===xr?G=i.DEPTH24_STENCIL8:E===En?G=i.DEPTH32F_STENCIL8:E===no&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ts||E===xr?G=i.DEPTH_COMPONENT24:E===En?G=i.DEPTH_COMPONENT32F:E===no&&(G=i.DEPTH_COMPONENT16),G}function M(L,E){return d(L)===!0||L.isFramebufferTexture&&L.minFilter!==_n&&L.minFilter!==Qt?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function A(L){const E=L.target;E.removeEventListener("dispose",A),b(E),E.isVideoTexture&&h.delete(E)}function w(L){const E=L.target;E.removeEventListener("dispose",w),F(E)}function b(L){const E=n.get(L);if(E.__webglInit===void 0)return;const G=L.source,Q=u.get(G);if(Q){const re=Q[E.__cacheKey];re.usedTimes--,re.usedTimes===0&&T(L),Object.keys(Q).length===0&&u.delete(G)}n.remove(L)}function T(L){const E=n.get(L);i.deleteTexture(E.__webglTexture);const G=L.source,Q=u.get(G);delete Q[E.__cacheKey],o.memory.textures--}function F(L){const E=n.get(L);if(L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(E.__webglFramebuffer[Q]))for(let re=0;re<E.__webglFramebuffer[Q].length;re++)i.deleteFramebuffer(E.__webglFramebuffer[Q][re]);else i.deleteFramebuffer(E.__webglFramebuffer[Q]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[Q])}else{if(Array.isArray(E.__webglFramebuffer))for(let Q=0;Q<E.__webglFramebuffer.length;Q++)i.deleteFramebuffer(E.__webglFramebuffer[Q]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Q=0;Q<E.__webglColorRenderbuffer.length;Q++)E.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[Q]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const G=L.textures;for(let Q=0,re=G.length;Q<re;Q++){const Z=n.get(G[Q]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(G[Q])}n.remove(L)}let _=0;function S(){_=0}function D(){const L=_;return L>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),_+=1,L}function I(L){const E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.colorSpace),E.join()}function P(L,E){const G=n.get(L);if(L.isVideoTexture&&se(L),L.isRenderTargetTexture===!1&&L.version>0&&G.__version!==L.version){const Q=L.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Le(G,L,E);return}}t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+E)}function O(L,E){const G=n.get(L);if(L.version>0&&G.__version!==L.version){Le(G,L,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+E)}function N(L,E){const G=n.get(L);if(L.version>0&&G.__version!==L.version){Le(G,L,E);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+E)}function W(L,E){const G=n.get(L);if(L.version>0&&G.__version!==L.version){X(G,L,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+E)}const z={[ls]:i.REPEAT,[mi]:i.CLAMP_TO_EDGE,[va]:i.MIRRORED_REPEAT},te={[_n]:i.NEAREST,[Ud]:i.NEAREST_MIPMAP_NEAREST,[Wr]:i.NEAREST_MIPMAP_LINEAR,[Qt]:i.LINEAR,[ca]:i.LINEAR_MIPMAP_NEAREST,[gi]:i.LINEAR_MIPMAP_LINEAR},ne={[Bp]:i.NEVER,[Xp]:i.ALWAYS,[kp]:i.LESS,[Yd]:i.LEQUAL,[Hp]:i.EQUAL,[Wp]:i.GEQUAL,[Gp]:i.GREATER,[Vp]:i.NOTEQUAL};function ce(L,E){if(E.type===En&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Qt||E.magFilter===ca||E.magFilter===Wr||E.magFilter===gi||E.minFilter===Qt||E.minFilter===ca||E.minFilter===Wr||E.minFilter===gi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,z[E.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,z[E.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,z[E.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,te[E.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,te[E.minFilter]),E.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,ne[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===_n||E.minFilter!==Wr&&E.minFilter!==gi||E.type===En&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Ae(L,E){let G=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",A));const Q=E.source;let re=u.get(Q);re===void 0&&(re={},u.set(Q,re));const Z=I(E);if(Z!==L.__cacheKey){re[Z]===void 0&&(re[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,G=!0),re[Z].usedTimes++;const we=re[L.__cacheKey];we!==void 0&&(re[L.__cacheKey].usedTimes--,we.usedTimes===0&&T(E)),L.__cacheKey=Z,L.__webglTexture=re[Z].texture}return G}function Le(L,E,G){let Q=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Q=i.TEXTURE_3D);const re=Ae(L,E),Z=E.source;t.bindTexture(Q,L.__webglTexture,i.TEXTURE0+G);const we=n.get(Z);if(Z.version!==we.__version||re===!0){t.activeTexture(i.TEXTURE0+G);const ye=rt.getPrimaries(rt.workingColorSpace),Me=E.colorSpace===es?null:rt.getPrimaries(E.colorSpace),Xe=E.colorSpace===es||ye===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let ue=x(E.image,!1,s.maxTextureSize);ue=pe(E,ue);const Te=r.convert(E.format,E.colorSpace),Ge=r.convert(E.type);let je=y(E.internalFormat,Te,Ge,E.colorSpace,E.isVideoTexture);ce(Q,E);let Ie;const nt=E.mipmaps,Ze=E.isVideoTexture!==!0,vt=we.__version===void 0||re===!0,B=Z.dataReady,Ce=M(E,ue);if(E.isDepthTexture)je=v(E.format===_r,E.type),vt&&(Ze?t.texStorage2D(i.TEXTURE_2D,1,je,ue.width,ue.height):t.texImage2D(i.TEXTURE_2D,0,je,ue.width,ue.height,0,Te,Ge,null));else if(E.isDataTexture)if(nt.length>0){Ze&&vt&&t.texStorage2D(i.TEXTURE_2D,Ce,je,nt[0].width,nt[0].height);for(let J=0,oe=nt.length;J<oe;J++)Ie=nt[J],Ze?B&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Ie.width,Ie.height,Te,Ge,Ie.data):t.texImage2D(i.TEXTURE_2D,J,je,Ie.width,Ie.height,0,Te,Ge,Ie.data);E.generateMipmaps=!1}else Ze?(vt&&t.texStorage2D(i.TEXTURE_2D,Ce,je,ue.width,ue.height),B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue.width,ue.height,Te,Ge,ue.data)):t.texImage2D(i.TEXTURE_2D,0,je,ue.width,ue.height,0,Te,Ge,ue.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ze&&vt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,je,nt[0].width,nt[0].height,ue.depth);for(let J=0,oe=nt.length;J<oe;J++)if(Ie=nt[J],E.format!==Wn)if(Te!==null)if(Ze){if(B)if(E.layerUpdates.size>0){const be=Lu(Ie.width,Ie.height,E.format,E.type);for(const Pe of E.layerUpdates){const it=Ie.data.subarray(Pe*be/Ie.data.BYTES_PER_ELEMENT,(Pe+1)*be/Ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,Pe,Ie.width,Ie.height,1,Te,it,0,0)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Ie.width,Ie.height,ue.depth,Te,Ie.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,je,Ie.width,Ie.height,ue.depth,0,Ie.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ze?B&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Ie.width,Ie.height,ue.depth,Te,Ge,Ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,je,Ie.width,Ie.height,ue.depth,0,Te,Ge,Ie.data)}else{Ze&&vt&&t.texStorage2D(i.TEXTURE_2D,Ce,je,nt[0].width,nt[0].height);for(let J=0,oe=nt.length;J<oe;J++)Ie=nt[J],E.format!==Wn?Te!==null?Ze?B&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,Ie.width,Ie.height,Te,Ie.data):t.compressedTexImage2D(i.TEXTURE_2D,J,je,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?B&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Ie.width,Ie.height,Te,Ge,Ie.data):t.texImage2D(i.TEXTURE_2D,J,je,Ie.width,Ie.height,0,Te,Ge,Ie.data)}else if(E.isDataArrayTexture)if(Ze){if(vt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,je,ue.width,ue.height,ue.depth),B)if(E.layerUpdates.size>0){const J=Lu(ue.width,ue.height,E.format,E.type);for(const oe of E.layerUpdates){const be=ue.data.subarray(oe*J/ue.data.BYTES_PER_ELEMENT,(oe+1)*J/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,ue.width,ue.height,1,Te,Ge,be)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Te,Ge,ue.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,je,ue.width,ue.height,ue.depth,0,Te,Ge,ue.data);else if(E.isData3DTexture)Ze?(vt&&t.texStorage3D(i.TEXTURE_3D,Ce,je,ue.width,ue.height,ue.depth),B&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Te,Ge,ue.data)):t.texImage3D(i.TEXTURE_3D,0,je,ue.width,ue.height,ue.depth,0,Te,Ge,ue.data);else if(E.isFramebufferTexture){if(vt)if(Ze)t.texStorage2D(i.TEXTURE_2D,Ce,je,ue.width,ue.height);else{let J=ue.width,oe=ue.height;for(let be=0;be<Ce;be++)t.texImage2D(i.TEXTURE_2D,be,je,J,oe,0,Te,Ge,null),J>>=1,oe>>=1}}else if(nt.length>0){if(Ze&&vt){const J=me(nt[0]);t.texStorage2D(i.TEXTURE_2D,Ce,je,J.width,J.height)}for(let J=0,oe=nt.length;J<oe;J++)Ie=nt[J],Ze?B&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Te,Ge,Ie):t.texImage2D(i.TEXTURE_2D,J,je,Te,Ge,Ie);E.generateMipmaps=!1}else if(Ze){if(vt){const J=me(ue);t.texStorage2D(i.TEXTURE_2D,Ce,je,J.width,J.height)}B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Te,Ge,ue)}else t.texImage2D(i.TEXTURE_2D,0,je,Te,Ge,ue);d(E)&&g(Q),we.__version=Z.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function X(L,E,G){if(E.image.length!==6)return;const Q=Ae(L,E),re=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+G);const Z=n.get(re);if(re.version!==Z.__version||Q===!0){t.activeTexture(i.TEXTURE0+G);const we=rt.getPrimaries(rt.workingColorSpace),ye=E.colorSpace===es?null:rt.getPrimaries(E.colorSpace),Me=E.colorSpace===es||we===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Xe=E.isCompressedTexture||E.image[0].isCompressedTexture,ue=E.image[0]&&E.image[0].isDataTexture,Te=[];for(let oe=0;oe<6;oe++)!Xe&&!ue?Te[oe]=x(E.image[oe],!0,s.maxCubemapSize):Te[oe]=ue?E.image[oe].image:E.image[oe],Te[oe]=pe(E,Te[oe]);const Ge=Te[0],je=r.convert(E.format,E.colorSpace),Ie=r.convert(E.type),nt=y(E.internalFormat,je,Ie,E.colorSpace),Ze=E.isVideoTexture!==!0,vt=Z.__version===void 0||Q===!0,B=re.dataReady;let Ce=M(E,Ge);ce(i.TEXTURE_CUBE_MAP,E);let J;if(Xe){Ze&&vt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,nt,Ge.width,Ge.height);for(let oe=0;oe<6;oe++){J=Te[oe].mipmaps;for(let be=0;be<J.length;be++){const Pe=J[be];E.format!==Wn?je!==null?Ze?B&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,be,0,0,Pe.width,Pe.height,je,Pe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,be,nt,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ze?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,be,0,0,Pe.width,Pe.height,je,Ie,Pe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,be,nt,Pe.width,Pe.height,0,je,Ie,Pe.data)}}}else{if(J=E.mipmaps,Ze&&vt){J.length>0&&Ce++;const oe=me(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,nt,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(ue){Ze?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Te[oe].width,Te[oe].height,je,Ie,Te[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,nt,Te[oe].width,Te[oe].height,0,je,Ie,Te[oe].data);for(let be=0;be<J.length;be++){const it=J[be].image[oe].image;Ze?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,be+1,0,0,it.width,it.height,je,Ie,it.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,be+1,nt,it.width,it.height,0,je,Ie,it.data)}}else{Ze?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,je,Ie,Te[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,nt,je,Ie,Te[oe]);for(let be=0;be<J.length;be++){const Pe=J[be];Ze?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,be+1,0,0,je,Ie,Pe.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,be+1,nt,je,Ie,Pe.image[oe])}}}d(E)&&g(i.TEXTURE_CUBE_MAP),Z.__version=re.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function ae(L,E,G,Q,re,Z){const we=r.convert(G.format,G.colorSpace),ye=r.convert(G.type),Me=y(G.internalFormat,we,ye,G.colorSpace);if(!n.get(E).__hasExternalTextures){const ue=Math.max(1,E.width>>Z),Te=Math.max(1,E.height>>Z);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,Z,Me,ue,Te,E.depth,0,we,ye,null):t.texImage2D(re,Z,Me,ue,Te,0,we,ye,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),$(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,re,n.get(G).__webglTexture,0,j(E)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,re,n.get(G).__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(L,E,G){if(i.bindRenderbuffer(i.RENDERBUFFER,L),E.depthBuffer){const Q=E.depthTexture,re=Q&&Q.isDepthTexture?Q.type:null,Z=v(E.stencilBuffer,re),we=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=j(E);$(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye,Z,E.width,E.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,Z,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Z,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,we,i.RENDERBUFFER,L)}else{const Q=E.textures;for(let re=0;re<Q.length;re++){const Z=Q[re],we=r.convert(Z.format,Z.colorSpace),ye=r.convert(Z.type),Me=y(Z.internalFormat,we,ye,Z.colorSpace),Xe=j(E);G&&$(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Xe,Me,E.width,E.height):$(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Xe,Me,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Me,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ee(L,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),P(E.depthTexture,0);const Q=n.get(E.depthTexture).__webglTexture,re=j(E);if(E.depthTexture.format===ar)$(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(E.depthTexture.format===_r)$(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function xe(L){const E=n.get(L),G=L.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==L.depthTexture){const Q=L.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),Q){const re=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,Q.removeEventListener("dispose",re)};Q.addEventListener("dispose",re),E.__depthDisposeCallback=re}E.__boundDepthTexture=Q}if(L.depthTexture&&!E.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");ee(E.__webglFramebuffer,L)}else if(G){E.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[Q]),E.__webglDepthbuffer[Q]===void 0)E.__webglDepthbuffer[Q]=i.createRenderbuffer(),ge(E.__webglDepthbuffer[Q],L,!1);else{const re=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=E.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ge(E.__webglDepthbuffer,L,!1);else{const Q=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,re)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function de(L,E,G){const Q=n.get(L);E!==void 0&&ae(Q.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&xe(L)}function Re(L){const E=L.texture,G=n.get(L),Q=n.get(E);L.addEventListener("dispose",w);const re=L.textures,Z=L.isWebGLCubeRenderTarget===!0,we=re.length>1;if(we||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=E.version,o.memory.textures++),Z){G.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer[ye]=[];for(let Me=0;Me<E.mipmaps.length;Me++)G.__webglFramebuffer[ye][Me]=i.createFramebuffer()}else G.__webglFramebuffer[ye]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer=[];for(let ye=0;ye<E.mipmaps.length;ye++)G.__webglFramebuffer[ye]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(we)for(let ye=0,Me=re.length;ye<Me;ye++){const Xe=n.get(re[ye]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=i.createTexture(),o.memory.textures++)}if(L.samples>0&&$(L)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ye=0;ye<re.length;ye++){const Me=re[ye];G.__webglColorRenderbuffer[ye]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[ye]);const Xe=r.convert(Me.format,Me.colorSpace),ue=r.convert(Me.type),Te=y(Me.internalFormat,Xe,ue,Me.colorSpace,L.isXRRenderTarget===!0),Ge=j(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge,Te,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,G.__webglColorRenderbuffer[ye])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),ge(G.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),ce(i.TEXTURE_CUBE_MAP,E);for(let ye=0;ye<6;ye++)if(E.mipmaps&&E.mipmaps.length>0)for(let Me=0;Me<E.mipmaps.length;Me++)ae(G.__webglFramebuffer[ye][Me],L,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Me);else ae(G.__webglFramebuffer[ye],L,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);d(E)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let ye=0,Me=re.length;ye<Me;ye++){const Xe=re[ye],ue=n.get(Xe);t.bindTexture(i.TEXTURE_2D,ue.__webglTexture),ce(i.TEXTURE_2D,Xe),ae(G.__webglFramebuffer,L,Xe,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,0),d(Xe)&&g(i.TEXTURE_2D)}t.unbindTexture()}else{let ye=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ye=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ye,Q.__webglTexture),ce(ye,E),E.mipmaps&&E.mipmaps.length>0)for(let Me=0;Me<E.mipmaps.length;Me++)ae(G.__webglFramebuffer[Me],L,E,i.COLOR_ATTACHMENT0,ye,Me);else ae(G.__webglFramebuffer,L,E,i.COLOR_ATTACHMENT0,ye,0);d(E)&&g(ye),t.unbindTexture()}L.depthBuffer&&xe(L)}function He(L){const E=L.textures;for(let G=0,Q=E.length;G<Q;G++){const re=E[G];if(d(re)){const Z=L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,we=n.get(re).__webglTexture;t.bindTexture(Z,we),g(Z),t.unbindTexture()}}}const ie=[],C=[];function le(L){if(L.samples>0){if($(L)===!1){const E=L.textures,G=L.width,Q=L.height;let re=i.COLOR_BUFFER_BIT;const Z=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,we=n.get(L),ye=E.length>1;if(ye)for(let Me=0;Me<E.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Me=0;Me<E.length;Me++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),ye){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,we.__webglColorRenderbuffer[Me]);const Xe=n.get(E[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Xe,0)}i.blitFramebuffer(0,0,G,Q,0,0,G,Q,re,i.NEAREST),c===!0&&(ie.length=0,C.length=0,ie.push(i.COLOR_ATTACHMENT0+Me),L.depthBuffer&&L.resolveDepthBuffer===!1&&(ie.push(Z),C.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,C)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ye)for(let Me=0;Me<E.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,we.__webglColorRenderbuffer[Me]);const Xe=n.get(E[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,Xe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&c){const E=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function j(L){return Math.min(s.maxSamples,L.samples)}function $(L){const E=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function se(L){const E=o.render.frame;h.get(L)!==E&&(h.set(L,E),L.update())}function pe(L,E){const G=L.colorSpace,Q=L.format,re=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||G!==tn&&G!==es&&(rt.getTransfer(G)===bt?(Q!==Wn||re!==Bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),E}function me(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=S,this.setTexture2D=P,this.setTexture2DArray=O,this.setTexture3D=N,this.setTextureCube=W,this.rebindTextures=de,this.setupRenderTarget=Re,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=le,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=$}function pv(i,e){function t(n,s=es){let r;const o=rt.getTransfer(s);if(n===Bi)return i.UNSIGNED_BYTE;if(n===Zl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Jl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===zd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Fd)return i.BYTE;if(n===Od)return i.SHORT;if(n===no)return i.UNSIGNED_SHORT;if(n===jl)return i.INT;if(n===Ts)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===Fi)return i.HALF_FLOAT;if(n===Bd)return i.ALPHA;if(n===kd)return i.RGB;if(n===Wn)return i.RGBA;if(n===Hd)return i.LUMINANCE;if(n===Gd)return i.LUMINANCE_ALPHA;if(n===ar)return i.DEPTH_COMPONENT;if(n===_r)return i.DEPTH_STENCIL;if(n===Ql)return i.RED;if(n===eh)return i.RED_INTEGER;if(n===Vd)return i.RG;if(n===th)return i.RG_INTEGER;if(n===nh)return i.RGBA_INTEGER;if(n===la||n===ha||n===ua||n===da)if(o===bt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===la)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===la)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===da)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===il||n===sl||n===rl||n===ol)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===il)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ol)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===al||n===cl||n===ll)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===al||n===cl)return o===bt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ll)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===xl||n===_l||n===vl||n===yl||n===Ml||n===Sl||n===wl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===hl)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ul)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dl)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fl)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===pl)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ml)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===gl)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xl)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_l)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===vl)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===yl)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ml)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sl)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wl)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fa||n===bl||n===El)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===fa)return o===bt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===El)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Wd||n===Tl||n===Al||n===Rl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===fa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Al)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class mv extends xn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class et extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gv={type:"move"};class _c{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new et,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new et,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new et,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const x of e.hand.values()){const d=t.getJointPose(x,n),g=this._getHandJoint(l,x);d!==null&&(g.matrix.fromArray(d.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=d.radius),g.visible=d!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,m=.005;l.inputState.pinching&&u>p+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(gv)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new et;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const xv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_v=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class vv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Gt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ki({vertexShader:xv,fragmentShader:_v,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new V(new Ct(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class yv extends Er{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,u=null,p=null,m=null;const x=new vv,d=t.getContextAttributes();let g=null,y=null;const v=[],M=[],A=new fe;let w=null;const b=new xn;b.layers.enable(1),b.viewport=new at;const T=new xn;T.layers.enable(2),T.viewport=new at;const F=[b,T],_=new mv;_.layers.enable(1),_.layers.enable(2);let S=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ae=v[X];return ae===void 0&&(ae=new _c,v[X]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(X){let ae=v[X];return ae===void 0&&(ae=new _c,v[X]=ae),ae.getGripSpace()},this.getHand=function(X){let ae=v[X];return ae===void 0&&(ae=new _c,v[X]=ae),ae.getHandSpace()};function I(X){const ae=M.indexOf(X.inputSource);if(ae===-1)return;const ge=v[ae];ge!==void 0&&(ge.update(X.inputSource,X.frame,l||o),ge.dispatchEvent({type:X.type,data:X.inputSource}))}function P(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",P),s.removeEventListener("inputsourceschange",O);for(let X=0;X<v.length;X++){const ae=M[X];ae!==null&&(M[X]=null,v[X].disconnect(ae))}S=null,D=null,x.reset(),e.setRenderTarget(g),p=null,u=null,f=null,s=null,y=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(g=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",P),s.addEventListener("inputsourceschange",O),d.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(A),s.renderState.layers===void 0){const ae={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new As(p.framebufferWidth,p.framebufferHeight,{format:Wn,type:Bi,colorSpace:e.outputColorSpace,stencilBuffer:d.stencil})}else{let ae=null,ge=null,ee=null;d.depth&&(ee=d.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=d.stencil?_r:ar,ge=d.stencil?xr:Ts);const xe={colorFormat:t.RGBA8,depthFormat:ee,scaleFactor:r};f=new XRWebGLBinding(s,t),u=f.createProjectionLayer(xe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new As(u.textureWidth,u.textureHeight,{format:Wn,type:Bi,depthTexture:new af(u.textureWidth,u.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:d.stencil,colorSpace:e.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Le.setContext(s),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function O(X){for(let ae=0;ae<X.removed.length;ae++){const ge=X.removed[ae],ee=M.indexOf(ge);ee>=0&&(M[ee]=null,v[ee].disconnect(ge))}for(let ae=0;ae<X.added.length;ae++){const ge=X.added[ae];let ee=M.indexOf(ge);if(ee===-1){for(let de=0;de<v.length;de++)if(de>=M.length){M.push(ge),ee=de;break}else if(M[de]===null){M[de]=ge,ee=de;break}if(ee===-1)break}const xe=v[ee];xe&&xe.connect(ge)}}const N=new U,W=new U;function z(X,ae,ge){N.setFromMatrixPosition(ae.matrixWorld),W.setFromMatrixPosition(ge.matrixWorld);const ee=N.distanceTo(W),xe=ae.projectionMatrix.elements,de=ge.projectionMatrix.elements,Re=xe[14]/(xe[10]-1),He=xe[14]/(xe[10]+1),ie=(xe[9]+1)/xe[5],C=(xe[9]-1)/xe[5],le=(xe[8]-1)/xe[0],j=(de[8]+1)/de[0],$=Re*le,se=Re*j,pe=ee/(-le+j),me=pe*-le;if(ae.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(me),X.translateZ(pe),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),xe[10]===-1)X.projectionMatrix.copy(ae.projectionMatrix),X.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const L=Re+pe,E=He+pe,G=$-me,Q=se+(ee-me),re=ie*He/E*L,Z=C*He/E*L;X.projectionMatrix.makePerspective(G,Q,re,Z,L,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function te(X,ae){ae===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ae.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let ae=X.near,ge=X.far;x.texture!==null&&(x.depthNear>0&&(ae=x.depthNear),x.depthFar>0&&(ge=x.depthFar)),_.near=T.near=b.near=ae,_.far=T.far=b.far=ge,(S!==_.near||D!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),S=_.near,D=_.far);const ee=X.parent,xe=_.cameras;te(_,ee);for(let de=0;de<xe.length;de++)te(xe[de],ee);xe.length===2?z(_,b,T):_.projectionMatrix.copy(b.projectionMatrix),ne(X,_,ee)};function ne(X,ae,ge){ge===null?X.matrix.copy(ae.matrixWorld):(X.matrix.copy(ge.matrixWorld),X.matrix.invert(),X.matrix.multiply(ae.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ae.projectionMatrix),X.projectionMatrixInverse.copy(ae.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=vr*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(X){c=X,u!==null&&(u.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(_)};let ce=null;function Ae(X,ae){if(h=ae.getViewerPose(l||o),m=ae,h!==null){const ge=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let ee=!1;ge.length!==_.cameras.length&&(_.cameras.length=0,ee=!0);for(let de=0;de<ge.length;de++){const Re=ge[de];let He=null;if(p!==null)He=p.getViewport(Re);else{const C=f.getViewSubImage(u,Re);He=C.viewport,de===0&&(e.setRenderTargetTextures(y,C.colorTexture,u.ignoreDepthValues?void 0:C.depthStencilTexture),e.setRenderTarget(y))}let ie=F[de];ie===void 0&&(ie=new xn,ie.layers.enable(de),ie.viewport=new at,F[de]=ie),ie.matrix.fromArray(Re.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(Re.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(He.x,He.y,He.width,He.height),de===0&&(_.matrix.copy(ie.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ee===!0&&_.cameras.push(ie)}const xe=s.enabledFeatures;if(xe&&xe.includes("depth-sensing")){const de=f.getDepthInformation(ge[0]);de&&de.isValid&&de.texture&&x.init(e,de,s.renderState)}}for(let ge=0;ge<v.length;ge++){const ee=M[ge],xe=v[ge];ee!==null&&xe!==void 0&&xe.update(ee,ae,l||o)}ce&&ce(X,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),m=null}const Le=new of;Le.setAnimationLoop(Ae),this.setAnimationLoop=function(X){ce=X},this.dispose=function(){}}}const xs=new yn,Mv=new Ke;function Sv(i,e){function t(d,g){d.matrixAutoUpdate===!0&&d.updateMatrix(),g.value.copy(d.matrix)}function n(d,g){g.color.getRGB(d.fogColor.value,tf(i)),g.isFog?(d.fogNear.value=g.near,d.fogFar.value=g.far):g.isFogExp2&&(d.fogDensity.value=g.density)}function s(d,g,y,v,M){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(d,g):g.isMeshToonMaterial?(r(d,g),f(d,g)):g.isMeshPhongMaterial?(r(d,g),h(d,g)):g.isMeshStandardMaterial?(r(d,g),u(d,g),g.isMeshPhysicalMaterial&&p(d,g,M)):g.isMeshMatcapMaterial?(r(d,g),m(d,g)):g.isMeshDepthMaterial?r(d,g):g.isMeshDistanceMaterial?(r(d,g),x(d,g)):g.isMeshNormalMaterial?r(d,g):g.isLineBasicMaterial?(o(d,g),g.isLineDashedMaterial&&a(d,g)):g.isPointsMaterial?c(d,g,y,v):g.isSpriteMaterial?l(d,g):g.isShadowMaterial?(d.color.value.copy(g.color),d.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(d,g){d.opacity.value=g.opacity,g.color&&d.diffuse.value.copy(g.color),g.emissive&&d.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(d.map.value=g.map,t(g.map,d.mapTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.bumpMap&&(d.bumpMap.value=g.bumpMap,t(g.bumpMap,d.bumpMapTransform),d.bumpScale.value=g.bumpScale,g.side===vn&&(d.bumpScale.value*=-1)),g.normalMap&&(d.normalMap.value=g.normalMap,t(g.normalMap,d.normalMapTransform),d.normalScale.value.copy(g.normalScale),g.side===vn&&d.normalScale.value.negate()),g.displacementMap&&(d.displacementMap.value=g.displacementMap,t(g.displacementMap,d.displacementMapTransform),d.displacementScale.value=g.displacementScale,d.displacementBias.value=g.displacementBias),g.emissiveMap&&(d.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,d.emissiveMapTransform)),g.specularMap&&(d.specularMap.value=g.specularMap,t(g.specularMap,d.specularMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest);const y=e.get(g),v=y.envMap,M=y.envMapRotation;v&&(d.envMap.value=v,xs.copy(M),xs.x*=-1,xs.y*=-1,xs.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),d.envMapRotation.value.setFromMatrix4(Mv.makeRotationFromEuler(xs)),d.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=g.reflectivity,d.ior.value=g.ior,d.refractionRatio.value=g.refractionRatio),g.lightMap&&(d.lightMap.value=g.lightMap,d.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,d.lightMapTransform)),g.aoMap&&(d.aoMap.value=g.aoMap,d.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,d.aoMapTransform))}function o(d,g){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,g.map&&(d.map.value=g.map,t(g.map,d.mapTransform))}function a(d,g){d.dashSize.value=g.dashSize,d.totalSize.value=g.dashSize+g.gapSize,d.scale.value=g.scale}function c(d,g,y,v){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,d.size.value=g.size*y,d.scale.value=v*.5,g.map&&(d.map.value=g.map,t(g.map,d.uvTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest)}function l(d,g){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,d.rotation.value=g.rotation,g.map&&(d.map.value=g.map,t(g.map,d.mapTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest)}function h(d,g){d.specular.value.copy(g.specular),d.shininess.value=Math.max(g.shininess,1e-4)}function f(d,g){g.gradientMap&&(d.gradientMap.value=g.gradientMap)}function u(d,g){d.metalness.value=g.metalness,g.metalnessMap&&(d.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,d.metalnessMapTransform)),d.roughness.value=g.roughness,g.roughnessMap&&(d.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,d.roughnessMapTransform)),g.envMap&&(d.envMapIntensity.value=g.envMapIntensity)}function p(d,g,y){d.ior.value=g.ior,g.sheen>0&&(d.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),d.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(d.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,d.sheenColorMapTransform)),g.sheenRoughnessMap&&(d.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,d.sheenRoughnessMapTransform))),g.clearcoat>0&&(d.clearcoat.value=g.clearcoat,d.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(d.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,d.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(d.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===vn&&d.clearcoatNormalScale.value.negate())),g.dispersion>0&&(d.dispersion.value=g.dispersion),g.iridescence>0&&(d.iridescence.value=g.iridescence,d.iridescenceIOR.value=g.iridescenceIOR,d.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(d.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,d.iridescenceMapTransform)),g.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),g.transmission>0&&(d.transmission.value=g.transmission,d.transmissionSamplerMap.value=y.texture,d.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(d.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,d.transmissionMapTransform)),d.thickness.value=g.thickness,g.thicknessMap&&(d.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=g.attenuationDistance,d.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(d.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(d.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=g.specularIntensity,d.specularColor.value.copy(g.specularColor),g.specularColorMap&&(d.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,d.specularColorMapTransform)),g.specularIntensityMap&&(d.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,d.specularIntensityMapTransform))}function m(d,g){g.matcap&&(d.matcap.value=g.matcap)}function x(d,g){const y=e.get(g).light;d.referencePosition.value.setFromMatrixPosition(y.matrixWorld),d.nearDistance.value=y.shadow.camera.near,d.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function wv(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,v){const M=v.program;n.uniformBlockBinding(y,M)}function l(y,v){let M=s[y.id];M===void 0&&(m(y),M=h(y),s[y.id]=M,y.addEventListener("dispose",d));const A=v.program;n.updateUBOMapping(y,A);const w=e.render.frame;r[y.id]!==w&&(u(y),r[y.id]=w)}function h(y){const v=f();y.__bindingPointIndex=v;const M=i.createBuffer(),A=y.__size,w=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,M),M}function f(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const v=s[y.id],M=y.uniforms,A=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let w=0,b=M.length;w<b;w++){const T=Array.isArray(M[w])?M[w]:[M[w]];for(let F=0,_=T.length;F<_;F++){const S=T[F];if(p(S,w,F,A)===!0){const D=S.__offset,I=Array.isArray(S.value)?S.value:[S.value];let P=0;for(let O=0;O<I.length;O++){const N=I[O],W=x(N);typeof N=="number"||typeof N=="boolean"?(S.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,D+P,S.__data)):N.isMatrix3?(S.__data[0]=N.elements[0],S.__data[1]=N.elements[1],S.__data[2]=N.elements[2],S.__data[3]=0,S.__data[4]=N.elements[3],S.__data[5]=N.elements[4],S.__data[6]=N.elements[5],S.__data[7]=0,S.__data[8]=N.elements[6],S.__data[9]=N.elements[7],S.__data[10]=N.elements[8],S.__data[11]=0):(N.toArray(S.__data,P),P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,v,M,A){const w=y.value,b=v+"_"+M;if(A[b]===void 0)return typeof w=="number"||typeof w=="boolean"?A[b]=w:A[b]=w.clone(),!0;{const T=A[b];if(typeof w=="number"||typeof w=="boolean"){if(T!==w)return A[b]=w,!0}else if(T.equals(w)===!1)return T.copy(w),!0}return!1}function m(y){const v=y.uniforms;let M=0;const A=16;for(let b=0,T=v.length;b<T;b++){const F=Array.isArray(v[b])?v[b]:[v[b]];for(let _=0,S=F.length;_<S;_++){const D=F[_],I=Array.isArray(D.value)?D.value:[D.value];for(let P=0,O=I.length;P<O;P++){const N=I[P],W=x(N),z=M%A,te=z%W.boundary,ne=z+te;M+=te,ne!==0&&A-ne<W.storage&&(M+=A-ne),D.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=M,M+=W.storage}}}const w=M%A;return w>0&&(M+=A-w),y.__size=M,y.__cache={},this}function x(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function d(y){const v=y.target;v.removeEventListener("dispose",d);const M=o.indexOf(v.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function g(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:g}}class bv{constructor(e={}){const{canvas:t=lm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=o;const p=new Uint32Array(4),m=new Int32Array(4);let x=null,d=null;const g=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=un,this.toneMapping=as,this.toneMappingExposure=1;const v=this;let M=!1,A=0,w=0,b=null,T=-1,F=null;const _=new at,S=new at;let D=null;const I=new ke(0);let P=0,O=t.width,N=t.height,W=1,z=null,te=null;const ne=new at(0,0,O,N),ce=new at(0,0,O,N);let Ae=!1;const Le=new rh;let X=!1,ae=!1;const ge=new Ke,ee=new Ke,xe=new U,de=new at,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let He=!1;function ie(){return b===null?W:1}let C=n;function le(R,k){return t.getContext(R,k)}try{const R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${$l}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),C===null){const k="webgl2";if(C=le(k,R),C===null)throw le(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let j,$,se,pe,me,L,E,G,Q,re,Z,we,ye,Me,Xe,ue,Te,Ge,je,Ie,nt,Ze,vt,B;function Ce(){j=new Cx(C),j.init(),Ze=new pv(C,j),$=new wx(C,j,e,Ze),se=new uv(C),$.reverseDepthBuffer&&se.buffers.depth.setReversed(!0),pe=new Ix(C),me=new j_,L=new fv(C,j,se,me,$,Ze,pe),E=new Ex(v),G=new Rx(v),Q=new Bm(C),vt=new Mx(C,Q),re=new Px(C,Q,pe,vt),Z=new Nx(C,re,Q,pe),je=new Dx(C,$,L),ue=new bx(me),we=new $_(v,E,G,j,$,vt,ue),ye=new Sv(v,me),Me=new J_,Xe=new sv(j),Ge=new yx(v,E,G,se,Z,u,c),Te=new lv(v,Z,$),B=new wv(C,pe,$,se),Ie=new Sx(C,j,pe),nt=new Lx(C,j,pe),pe.programs=we.programs,v.capabilities=$,v.extensions=j,v.properties=me,v.renderLists=Me,v.shadowMap=Te,v.state=se,v.info=pe}Ce();const J=new yv(v,C);this.xr=J,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const R=j.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=j.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(R){R!==void 0&&(W=R,this.setSize(O,N,!1))},this.getSize=function(R){return R.set(O,N)},this.setSize=function(R,k,q=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=R,N=k,t.width=Math.floor(R*W),t.height=Math.floor(k*W),q===!0&&(t.style.width=R+"px",t.style.height=k+"px"),this.setViewport(0,0,R,k)},this.getDrawingBufferSize=function(R){return R.set(O*W,N*W).floor()},this.setDrawingBufferSize=function(R,k,q){O=R,N=k,W=q,t.width=Math.floor(R*q),t.height=Math.floor(k*q),this.setViewport(0,0,R,k)},this.getCurrentViewport=function(R){return R.copy(_)},this.getViewport=function(R){return R.copy(ne)},this.setViewport=function(R,k,q,Y){R.isVector4?ne.set(R.x,R.y,R.z,R.w):ne.set(R,k,q,Y),se.viewport(_.copy(ne).multiplyScalar(W).round())},this.getScissor=function(R){return R.copy(ce)},this.setScissor=function(R,k,q,Y){R.isVector4?ce.set(R.x,R.y,R.z,R.w):ce.set(R,k,q,Y),se.scissor(S.copy(ce).multiplyScalar(W).round())},this.getScissorTest=function(){return Ae},this.setScissorTest=function(R){se.setScissorTest(Ae=R)},this.setOpaqueSort=function(R){z=R},this.setTransparentSort=function(R){te=R},this.getClearColor=function(R){return R.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor.apply(Ge,arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha.apply(Ge,arguments)},this.clear=function(R=!0,k=!0,q=!0){let Y=0;if(R){let H=!1;if(b!==null){const _e=b.texture.format;H=_e===nh||_e===th||_e===eh}if(H){const _e=b.texture.type,Ee=_e===Bi||_e===Ts||_e===no||_e===xr||_e===Zl||_e===Jl,De=Ge.getClearColor(),Ne=Ge.getClearAlpha(),qe=De.r,$e=De.g,Fe=De.b;Ee?(p[0]=qe,p[1]=$e,p[2]=Fe,p[3]=Ne,C.clearBufferuiv(C.COLOR,0,p)):(m[0]=qe,m[1]=$e,m[2]=Fe,m[3]=Ne,C.clearBufferiv(C.COLOR,0,m))}else Y|=C.COLOR_BUFFER_BIT}k&&(Y|=C.DEPTH_BUFFER_BIT,C.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),q&&(Y|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),Me.dispose(),Xe.dispose(),me.dispose(),E.dispose(),G.dispose(),Z.dispose(),vt.dispose(),B.dispose(),we.dispose(),J.dispose(),J.removeEventListener("sessionstart",Rh),J.removeEventListener("sessionend",Ch),us.stop()};function oe(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function be(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const R=pe.autoReset,k=Te.enabled,q=Te.autoUpdate,Y=Te.needsUpdate,H=Te.type;Ce(),pe.autoReset=R,Te.enabled=k,Te.autoUpdate=q,Te.needsUpdate=Y,Te.type=H}function Pe(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function it(R){const k=R.target;k.removeEventListener("dispose",it),Nt(k)}function Nt(R){Mn(R),me.remove(R)}function Mn(R){const k=me.get(R).programs;k!==void 0&&(k.forEach(function(q){we.releaseProgram(q)}),R.isShaderMaterial&&we.releaseShaderCache(R))}this.renderBufferDirect=function(R,k,q,Y,H,_e){k===null&&(k=Re);const Ee=H.isMesh&&H.matrixWorld.determinant()<0,De=tp(R,k,q,Y,H);se.setMaterial(Y,Ee);let Ne=q.index,qe=1;if(Y.wireframe===!0){if(Ne=re.getWireframeAttribute(q),Ne===void 0)return;qe=2}const $e=q.drawRange,Fe=q.attributes.position;let dt=$e.start*qe,wt=($e.start+$e.count)*qe;_e!==null&&(dt=Math.max(dt,_e.start*qe),wt=Math.min(wt,(_e.start+_e.count)*qe)),Ne!==null?(dt=Math.max(dt,0),wt=Math.min(wt,Ne.count)):Fe!=null&&(dt=Math.max(dt,0),wt=Math.min(wt,Fe.count));const At=wt-dt;if(At<0||At===1/0)return;vt.setup(H,Y,De,q,Ne);let An,ct=Ie;if(Ne!==null&&(An=Q.get(Ne),ct=nt,ct.setIndex(An)),H.isMesh)Y.wireframe===!0?(se.setLineWidth(Y.wireframeLinewidth*ie()),ct.setMode(C.LINES)):ct.setMode(C.TRIANGLES);else if(H.isLine){let Oe=Y.linewidth;Oe===void 0&&(Oe=1),se.setLineWidth(Oe*ie()),H.isLineSegments?ct.setMode(C.LINES):H.isLineLoop?ct.setMode(C.LINE_LOOP):ct.setMode(C.LINE_STRIP)}else H.isPoints?ct.setMode(C.POINTS):H.isSprite&&ct.setMode(C.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)ct.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(j.get("WEBGL_multi_draw"))ct.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Oe=H._multiDrawStarts,nn=H._multiDrawCounts,lt=H._multiDrawCount,Yn=Ne?Q.get(Ne).bytesPerElement:1,Ds=me.get(Y).currentProgram.getUniforms();for(let Rn=0;Rn<lt;Rn++)Ds.setValue(C,"_gl_DrawID",Rn),ct.render(Oe[Rn]/Yn,nn[Rn])}else if(H.isInstancedMesh)ct.renderInstances(dt,At,H.count);else if(q.isInstancedBufferGeometry){const Oe=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,nn=Math.min(q.instanceCount,Oe);ct.renderInstances(dt,At,nn)}else ct.render(dt,At)};function ot(R,k,q){R.transparent===!0&&R.side===Jt&&R.forceSinglePass===!1?(R.side=vn,R.needsUpdate=!0,mo(R,k,q),R.side=zi,R.needsUpdate=!0,mo(R,k,q),R.side=Jt):mo(R,k,q)}this.compile=function(R,k,q=null){q===null&&(q=R),d=Xe.get(q),d.init(k),y.push(d),q.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(d.pushLight(H),H.castShadow&&d.pushShadow(H))}),R!==q&&R.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(d.pushLight(H),H.castShadow&&d.pushShadow(H))}),d.setupLights();const Y=new Set;return R.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const _e=H.material;if(_e)if(Array.isArray(_e))for(let Ee=0;Ee<_e.length;Ee++){const De=_e[Ee];ot(De,q,H),Y.add(De)}else ot(_e,q,H),Y.add(_e)}),y.pop(),d=null,Y},this.compileAsync=function(R,k,q=null){const Y=this.compile(R,k,q);return new Promise(H=>{function _e(){if(Y.forEach(function(Ee){me.get(Ee).currentProgram.isReady()&&Y.delete(Ee)}),Y.size===0){H(R);return}setTimeout(_e,10)}j.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let Sn=null;function wi(R){Sn&&Sn(R)}function Rh(){us.stop()}function Ch(){us.start()}const us=new of;us.setAnimationLoop(wi),typeof self<"u"&&us.setContext(self),this.setAnimationLoop=function(R){Sn=R,J.setAnimationLoop(R),R===null?us.stop():us.start()},J.addEventListener("sessionstart",Rh),J.addEventListener("sessionend",Ch),this.render=function(R,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(k),k=J.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,k,b),d=Xe.get(R,y.length),d.init(k),y.push(d),ee.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Le.setFromProjectionMatrix(ee),ae=this.localClippingEnabled,X=ue.init(this.clippingPlanes,ae),x=Me.get(R,g.length),x.init(),g.push(x),J.enabled===!0&&J.isPresenting===!0){const _e=v.xr.getDepthSensingMesh();_e!==null&&ka(_e,k,-1/0,v.sortObjects)}ka(R,k,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(z,te),He=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,He&&Ge.addToRenderList(x,R),this.info.render.frame++,X===!0&&ue.beginShadows();const q=d.state.shadowsArray;Te.render(q,R,k),X===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=x.opaque,H=x.transmissive;if(d.setupLights(),k.isArrayCamera){const _e=k.cameras;if(H.length>0)for(let Ee=0,De=_e.length;Ee<De;Ee++){const Ne=_e[Ee];Lh(Y,H,R,Ne)}He&&Ge.render(R);for(let Ee=0,De=_e.length;Ee<De;Ee++){const Ne=_e[Ee];Ph(x,R,Ne,Ne.viewport)}}else H.length>0&&Lh(Y,H,R,k),He&&Ge.render(R),Ph(x,R,k);b!==null&&(L.updateMultisampleRenderTarget(b),L.updateRenderTargetMipmap(b)),R.isScene===!0&&R.onAfterRender(v,R,k),vt.resetDefaultState(),T=-1,F=null,y.pop(),y.length>0?(d=y[y.length-1],X===!0&&ue.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,g.pop(),g.length>0?x=g[g.length-1]:x=null};function ka(R,k,q,Y){if(R.visible===!1)return;if(R.layers.test(k.layers)){if(R.isGroup)q=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(k);else if(R.isLight)d.pushLight(R),R.castShadow&&d.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Le.intersectsSprite(R)){Y&&de.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ee);const Ee=Z.update(R),De=R.material;De.visible&&x.push(R,Ee,De,q,de.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Le.intersectsObject(R))){const Ee=Z.update(R),De=R.material;if(Y&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),de.copy(R.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),de.copy(Ee.boundingSphere.center)),de.applyMatrix4(R.matrixWorld).applyMatrix4(ee)),Array.isArray(De)){const Ne=Ee.groups;for(let qe=0,$e=Ne.length;qe<$e;qe++){const Fe=Ne[qe],dt=De[Fe.materialIndex];dt&&dt.visible&&x.push(R,Ee,dt,q,de.z,Fe)}}else De.visible&&x.push(R,Ee,De,q,de.z,null)}}const _e=R.children;for(let Ee=0,De=_e.length;Ee<De;Ee++)ka(_e[Ee],k,q,Y)}function Ph(R,k,q,Y){const H=R.opaque,_e=R.transmissive,Ee=R.transparent;d.setupLightsView(q),X===!0&&ue.setGlobalState(v.clippingPlanes,q),Y&&se.viewport(_.copy(Y)),H.length>0&&po(H,k,q),_e.length>0&&po(_e,k,q),Ee.length>0&&po(Ee,k,q),se.buffers.depth.setTest(!0),se.buffers.depth.setMask(!0),se.buffers.color.setMask(!0),se.setPolygonOffset(!1)}function Lh(R,k,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[Y.id]===void 0&&(d.state.transmissionRenderTarget[Y.id]=new As(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")||j.has("EXT_color_buffer_float")?Fi:Bi,minFilter:gi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));const _e=d.state.transmissionRenderTarget[Y.id],Ee=Y.viewport||_;_e.setSize(Ee.z,Ee.w);const De=v.getRenderTarget();v.setRenderTarget(_e),v.getClearColor(I),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear(),He&&Ge.render(q);const Ne=v.toneMapping;v.toneMapping=as;const qe=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),d.setupLightsView(Y),X===!0&&ue.setGlobalState(v.clippingPlanes,Y),po(R,q,Y),L.updateMultisampleRenderTarget(_e),L.updateRenderTargetMipmap(_e),j.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let Fe=0,dt=k.length;Fe<dt;Fe++){const wt=k[Fe],At=wt.object,An=wt.geometry,ct=wt.material,Oe=wt.group;if(ct.side===Jt&&At.layers.test(Y.layers)){const nn=ct.side;ct.side=vn,ct.needsUpdate=!0,Ih(At,q,Y,An,ct,Oe),ct.side=nn,ct.needsUpdate=!0,$e=!0}}$e===!0&&(L.updateMultisampleRenderTarget(_e),L.updateRenderTargetMipmap(_e))}v.setRenderTarget(De),v.setClearColor(I,P),qe!==void 0&&(Y.viewport=qe),v.toneMapping=Ne}function po(R,k,q){const Y=k.isScene===!0?k.overrideMaterial:null;for(let H=0,_e=R.length;H<_e;H++){const Ee=R[H],De=Ee.object,Ne=Ee.geometry,qe=Y===null?Ee.material:Y,$e=Ee.group;De.layers.test(q.layers)&&Ih(De,k,q,Ne,qe,$e)}}function Ih(R,k,q,Y,H,_e){R.onBeforeRender(v,k,q,Y,H,_e),R.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),H.onBeforeRender(v,k,q,Y,R,_e),H.transparent===!0&&H.side===Jt&&H.forceSinglePass===!1?(H.side=vn,H.needsUpdate=!0,v.renderBufferDirect(q,k,Y,H,R,_e),H.side=zi,H.needsUpdate=!0,v.renderBufferDirect(q,k,Y,H,R,_e),H.side=Jt):v.renderBufferDirect(q,k,Y,H,R,_e),R.onAfterRender(v,k,q,Y,H,_e)}function mo(R,k,q){k.isScene!==!0&&(k=Re);const Y=me.get(R),H=d.state.lights,_e=d.state.shadowsArray,Ee=H.state.version,De=we.getParameters(R,H.state,_e,k,q),Ne=we.getProgramCacheKey(De);let qe=Y.programs;Y.environment=R.isMeshStandardMaterial?k.environment:null,Y.fog=k.fog,Y.envMap=(R.isMeshStandardMaterial?G:E).get(R.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&R.envMap===null?k.environmentRotation:R.envMapRotation,qe===void 0&&(R.addEventListener("dispose",it),qe=new Map,Y.programs=qe);let $e=qe.get(Ne);if($e!==void 0){if(Y.currentProgram===$e&&Y.lightsStateVersion===Ee)return Nh(R,De),$e}else De.uniforms=we.getUniforms(R),R.onBeforeCompile(De,v),$e=we.acquireProgram(De,Ne),qe.set(Ne,$e),Y.uniforms=De.uniforms;const Fe=Y.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Fe.clippingPlanes=ue.uniform),Nh(R,De),Y.needsLights=ip(R),Y.lightsStateVersion=Ee,Y.needsLights&&(Fe.ambientLightColor.value=H.state.ambient,Fe.lightProbe.value=H.state.probe,Fe.directionalLights.value=H.state.directional,Fe.directionalLightShadows.value=H.state.directionalShadow,Fe.spotLights.value=H.state.spot,Fe.spotLightShadows.value=H.state.spotShadow,Fe.rectAreaLights.value=H.state.rectArea,Fe.ltc_1.value=H.state.rectAreaLTC1,Fe.ltc_2.value=H.state.rectAreaLTC2,Fe.pointLights.value=H.state.point,Fe.pointLightShadows.value=H.state.pointShadow,Fe.hemisphereLights.value=H.state.hemi,Fe.directionalShadowMap.value=H.state.directionalShadowMap,Fe.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Fe.spotShadowMap.value=H.state.spotShadowMap,Fe.spotLightMatrix.value=H.state.spotLightMatrix,Fe.spotLightMap.value=H.state.spotLightMap,Fe.pointShadowMap.value=H.state.pointShadowMap,Fe.pointShadowMatrix.value=H.state.pointShadowMatrix),Y.currentProgram=$e,Y.uniformsList=null,$e}function Dh(R){if(R.uniformsList===null){const k=R.currentProgram.getUniforms();R.uniformsList=ma.seqWithValue(k.seq,R.uniforms)}return R.uniformsList}function Nh(R,k){const q=me.get(R);q.outputColorSpace=k.outputColorSpace,q.batching=k.batching,q.batchingColor=k.batchingColor,q.instancing=k.instancing,q.instancingColor=k.instancingColor,q.instancingMorph=k.instancingMorph,q.skinning=k.skinning,q.morphTargets=k.morphTargets,q.morphNormals=k.morphNormals,q.morphColors=k.morphColors,q.morphTargetsCount=k.morphTargetsCount,q.numClippingPlanes=k.numClippingPlanes,q.numIntersection=k.numClipIntersection,q.vertexAlphas=k.vertexAlphas,q.vertexTangents=k.vertexTangents,q.toneMapping=k.toneMapping}function tp(R,k,q,Y,H){k.isScene!==!0&&(k=Re),L.resetTextureUnits();const _e=k.fog,Ee=Y.isMeshStandardMaterial?k.environment:null,De=b===null?v.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:tn,Ne=(Y.isMeshStandardMaterial?G:E).get(Y.envMap||Ee),qe=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,$e=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Fe=!!q.morphAttributes.position,dt=!!q.morphAttributes.normal,wt=!!q.morphAttributes.color;let At=as;Y.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(At=v.toneMapping);const An=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ct=An!==void 0?An.length:0,Oe=me.get(Y),nn=d.state.lights;if(X===!0&&(ae===!0||R!==F)){const Nn=R===F&&Y.id===T;ue.setState(Y,R,Nn)}let lt=!1;Y.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==nn.state.version||Oe.outputColorSpace!==De||H.isBatchedMesh&&Oe.batching===!1||!H.isBatchedMesh&&Oe.batching===!0||H.isBatchedMesh&&Oe.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Oe.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Oe.instancing===!1||!H.isInstancedMesh&&Oe.instancing===!0||H.isSkinnedMesh&&Oe.skinning===!1||!H.isSkinnedMesh&&Oe.skinning===!0||H.isInstancedMesh&&Oe.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Oe.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Oe.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Oe.instancingMorph===!1&&H.morphTexture!==null||Oe.envMap!==Ne||Y.fog===!0&&Oe.fog!==_e||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==ue.numPlanes||Oe.numIntersection!==ue.numIntersection)||Oe.vertexAlphas!==qe||Oe.vertexTangents!==$e||Oe.morphTargets!==Fe||Oe.morphNormals!==dt||Oe.morphColors!==wt||Oe.toneMapping!==At||Oe.morphTargetsCount!==ct)&&(lt=!0):(lt=!0,Oe.__version=Y.version);let Yn=Oe.currentProgram;lt===!0&&(Yn=mo(Y,k,H));let Ds=!1,Rn=!1,Ha=!1;const It=Yn.getUniforms(),Hi=Oe.uniforms;if(se.useProgram(Yn.program)&&(Ds=!0,Rn=!0,Ha=!0),Y.id!==T&&(T=Y.id,Rn=!0),Ds||F!==R){$.reverseDepthBuffer?(ge.copy(R.projectionMatrix),um(ge),dm(ge),It.setValue(C,"projectionMatrix",ge)):It.setValue(C,"projectionMatrix",R.projectionMatrix),It.setValue(C,"viewMatrix",R.matrixWorldInverse);const Nn=It.map.cameraPosition;Nn!==void 0&&Nn.setValue(C,xe.setFromMatrixPosition(R.matrixWorld)),$.logarithmicDepthBuffer&&It.setValue(C,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&It.setValue(C,"isOrthographic",R.isOrthographicCamera===!0),F!==R&&(F=R,Rn=!0,Ha=!0)}if(H.isSkinnedMesh){It.setOptional(C,H,"bindMatrix"),It.setOptional(C,H,"bindMatrixInverse");const Nn=H.skeleton;Nn&&(Nn.boneTexture===null&&Nn.computeBoneTexture(),It.setValue(C,"boneTexture",Nn.boneTexture,L))}H.isBatchedMesh&&(It.setOptional(C,H,"batchingTexture"),It.setValue(C,"batchingTexture",H._matricesTexture,L),It.setOptional(C,H,"batchingIdTexture"),It.setValue(C,"batchingIdTexture",H._indirectTexture,L),It.setOptional(C,H,"batchingColorTexture"),H._colorsTexture!==null&&It.setValue(C,"batchingColorTexture",H._colorsTexture,L));const Ga=q.morphAttributes;if((Ga.position!==void 0||Ga.normal!==void 0||Ga.color!==void 0)&&je.update(H,q,Yn),(Rn||Oe.receiveShadow!==H.receiveShadow)&&(Oe.receiveShadow=H.receiveShadow,It.setValue(C,"receiveShadow",H.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Hi.envMap.value=Ne,Hi.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&k.environment!==null&&(Hi.envMapIntensity.value=k.environmentIntensity),Rn&&(It.setValue(C,"toneMappingExposure",v.toneMappingExposure),Oe.needsLights&&np(Hi,Ha),_e&&Y.fog===!0&&ye.refreshFogUniforms(Hi,_e),ye.refreshMaterialUniforms(Hi,Y,W,N,d.state.transmissionRenderTarget[R.id]),ma.upload(C,Dh(Oe),Hi,L)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(ma.upload(C,Dh(Oe),Hi,L),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&It.setValue(C,"center",H.center),It.setValue(C,"modelViewMatrix",H.modelViewMatrix),It.setValue(C,"normalMatrix",H.normalMatrix),It.setValue(C,"modelMatrix",H.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Nn=Y.uniformsGroups;for(let Va=0,sp=Nn.length;Va<sp;Va++){const Uh=Nn[Va];B.update(Uh,Yn),B.bind(Uh,Yn)}}return Yn}function np(R,k){R.ambientLightColor.needsUpdate=k,R.lightProbe.needsUpdate=k,R.directionalLights.needsUpdate=k,R.directionalLightShadows.needsUpdate=k,R.pointLights.needsUpdate=k,R.pointLightShadows.needsUpdate=k,R.spotLights.needsUpdate=k,R.spotLightShadows.needsUpdate=k,R.rectAreaLights.needsUpdate=k,R.hemisphereLights.needsUpdate=k}function ip(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(R,k,q){me.get(R.texture).__webglTexture=k,me.get(R.depthTexture).__webglTexture=q;const Y=me.get(R);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=q===void 0,Y.__autoAllocateDepthBuffer||j.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,k){const q=me.get(R);q.__webglFramebuffer=k,q.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(R,k=0,q=0){b=R,A=k,w=q;let Y=!0,H=null,_e=!1,Ee=!1;if(R){const Ne=me.get(R);if(Ne.__useDefaultFramebuffer!==void 0)se.bindFramebuffer(C.FRAMEBUFFER,null),Y=!1;else if(Ne.__webglFramebuffer===void 0)L.setupRenderTarget(R);else if(Ne.__hasExternalTextures)L.rebindTextures(R,me.get(R.texture).__webglTexture,me.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Fe=R.depthTexture;if(Ne.__boundDepthTexture!==Fe){if(Fe!==null&&me.has(Fe)&&(R.width!==Fe.image.width||R.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(R)}}const qe=R.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Ee=!0);const $e=me.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray($e[k])?H=$e[k][q]:H=$e[k],_e=!0):R.samples>0&&L.useMultisampledRTT(R)===!1?H=me.get(R).__webglMultisampledFramebuffer:Array.isArray($e)?H=$e[q]:H=$e,_.copy(R.viewport),S.copy(R.scissor),D=R.scissorTest}else _.copy(ne).multiplyScalar(W).floor(),S.copy(ce).multiplyScalar(W).floor(),D=Ae;if(se.bindFramebuffer(C.FRAMEBUFFER,H)&&Y&&se.drawBuffers(R,H),se.viewport(_),se.scissor(S),se.setScissorTest(D),_e){const Ne=me.get(R.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ne.__webglTexture,q)}else if(Ee){const Ne=me.get(R.texture),qe=k||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ne.__webglTexture,q||0,qe)}T=-1},this.readRenderTargetPixels=function(R,k,q,Y,H,_e,Ee){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=me.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ee!==void 0&&(De=De[Ee]),De){se.bindFramebuffer(C.FRAMEBUFFER,De);try{const Ne=R.texture,qe=Ne.format,$e=Ne.type;if(!$.textureFormatReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$.textureTypeReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=R.width-Y&&q>=0&&q<=R.height-H&&C.readPixels(k,q,Y,H,Ze.convert(qe),Ze.convert($e),_e)}finally{const Ne=b!==null?me.get(b).__webglFramebuffer:null;se.bindFramebuffer(C.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(R,k,q,Y,H,_e,Ee){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=me.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ee!==void 0&&(De=De[Ee]),De){const Ne=R.texture,qe=Ne.format,$e=Ne.type;if(!$.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=R.width-Y&&q>=0&&q<=R.height-H){se.bindFramebuffer(C.FRAMEBUFFER,De);const Fe=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Fe),C.bufferData(C.PIXEL_PACK_BUFFER,_e.byteLength,C.STREAM_READ),C.readPixels(k,q,Y,H,Ze.convert(qe),Ze.convert($e),0);const dt=b!==null?me.get(b).__webglFramebuffer:null;se.bindFramebuffer(C.FRAMEBUFFER,dt);const wt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await hm(C,wt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Fe),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,_e),C.deleteBuffer(Fe),C.deleteSync(wt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,k=null,q=0){R.isTexture!==!0&&(pa("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,R=arguments[1]);const Y=Math.pow(2,-q),H=Math.floor(R.image.width*Y),_e=Math.floor(R.image.height*Y),Ee=k!==null?k.x:0,De=k!==null?k.y:0;L.setTexture2D(R,0),C.copyTexSubImage2D(C.TEXTURE_2D,q,0,0,Ee,De,H,_e),se.unbindTexture()},this.copyTextureToTexture=function(R,k,q=null,Y=null,H=0){R.isTexture!==!0&&(pa("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,R=arguments[1],k=arguments[2],H=arguments[3]||0,q=null);let _e,Ee,De,Ne,qe,$e;q!==null?(_e=q.max.x-q.min.x,Ee=q.max.y-q.min.y,De=q.min.x,Ne=q.min.y):(_e=R.image.width,Ee=R.image.height,De=0,Ne=0),Y!==null?(qe=Y.x,$e=Y.y):(qe=0,$e=0);const Fe=Ze.convert(k.format),dt=Ze.convert(k.type);L.setTexture2D(k,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,k.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,k.unpackAlignment);const wt=C.getParameter(C.UNPACK_ROW_LENGTH),At=C.getParameter(C.UNPACK_IMAGE_HEIGHT),An=C.getParameter(C.UNPACK_SKIP_PIXELS),ct=C.getParameter(C.UNPACK_SKIP_ROWS),Oe=C.getParameter(C.UNPACK_SKIP_IMAGES),nn=R.isCompressedTexture?R.mipmaps[H]:R.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,nn.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,nn.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,De),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ne),R.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,H,qe,$e,_e,Ee,Fe,dt,nn.data):R.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,H,qe,$e,nn.width,nn.height,Fe,nn.data):C.texSubImage2D(C.TEXTURE_2D,H,qe,$e,_e,Ee,Fe,dt,nn),C.pixelStorei(C.UNPACK_ROW_LENGTH,wt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,At),C.pixelStorei(C.UNPACK_SKIP_PIXELS,An),C.pixelStorei(C.UNPACK_SKIP_ROWS,ct),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Oe),H===0&&k.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),se.unbindTexture()},this.copyTextureToTexture3D=function(R,k,q=null,Y=null,H=0){R.isTexture!==!0&&(pa("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,Y=arguments[1]||null,R=arguments[2],k=arguments[3],H=arguments[4]||0);let _e,Ee,De,Ne,qe,$e,Fe,dt,wt;const At=R.isCompressedTexture?R.mipmaps[H]:R.image;q!==null?(_e=q.max.x-q.min.x,Ee=q.max.y-q.min.y,De=q.max.z-q.min.z,Ne=q.min.x,qe=q.min.y,$e=q.min.z):(_e=At.width,Ee=At.height,De=At.depth,Ne=0,qe=0,$e=0),Y!==null?(Fe=Y.x,dt=Y.y,wt=Y.z):(Fe=0,dt=0,wt=0);const An=Ze.convert(k.format),ct=Ze.convert(k.type);let Oe;if(k.isData3DTexture)L.setTexture3D(k,0),Oe=C.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)L.setTexture2DArray(k,0),Oe=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,k.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,k.unpackAlignment);const nn=C.getParameter(C.UNPACK_ROW_LENGTH),lt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Yn=C.getParameter(C.UNPACK_SKIP_PIXELS),Ds=C.getParameter(C.UNPACK_SKIP_ROWS),Rn=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,At.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,At.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ne),C.pixelStorei(C.UNPACK_SKIP_ROWS,qe),C.pixelStorei(C.UNPACK_SKIP_IMAGES,$e),R.isDataTexture||R.isData3DTexture?C.texSubImage3D(Oe,H,Fe,dt,wt,_e,Ee,De,An,ct,At.data):k.isCompressedArrayTexture?C.compressedTexSubImage3D(Oe,H,Fe,dt,wt,_e,Ee,De,An,At.data):C.texSubImage3D(Oe,H,Fe,dt,wt,_e,Ee,De,An,ct,At),C.pixelStorei(C.UNPACK_ROW_LENGTH,nn),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,lt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Yn),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ds),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Rn),H===0&&k.generateMipmaps&&C.generateMipmap(Oe),se.unbindTexture()},this.initRenderTarget=function(R){me.get(R).__webglFramebuffer===void 0&&L.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?L.setTextureCube(R,0):R.isData3DTexture?L.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?L.setTexture2DArray(R,0):L.setTexture2D(R,0),se.unbindTexture()},this.resetState=function(){A=0,w=0,b=null,se.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ih?"display-p3":"srgb",t.unpackColorSpace=rt.workingColorSpace===Ia?"display-p3":"srgb"}}class ch{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ke(e),this.near=t,this.far=n}clone(){return new ch(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ev extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class df{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Pl,this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const mn=new U;class oo{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ti(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new en(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new oo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Dt extends si{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ks;const Nr=new U,$s=new U,js=new U,Zs=new fe,Ur=new fe,ff=new Ke,Oo=new U,Fr=new U,zo=new U,Iu=new fe,vc=new fe,Du=new fe;class Bt extends St{constructor(e=new Dt){if(super(),this.isSprite=!0,this.type="Sprite",Ks===void 0){Ks=new kt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new df(t,5);Ks.setIndex([0,1,2,0,2,3]),Ks.setAttribute("position",new oo(n,3,0,!1)),Ks.setAttribute("uv",new oo(n,2,3,!1))}this.geometry=Ks,this.material=e,this.center=new fe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),$s.setFromMatrixScale(this.matrixWorld),ff.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),js.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&$s.multiplyScalar(-js.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Bo(Oo.set(-.5,-.5,0),js,o,$s,s,r),Bo(Fr.set(.5,-.5,0),js,o,$s,s,r),Bo(zo.set(.5,.5,0),js,o,$s,s,r),Iu.set(0,0),vc.set(1,0),Du.set(1,1);let a=e.ray.intersectTriangle(Oo,Fr,zo,!1,Nr);if(a===null&&(Bo(Fr.set(-.5,.5,0),js,o,$s,s,r),vc.set(0,1),a=e.ray.intersectTriangle(Oo,zo,Fr,!1,Nr),a===null))return;const c=e.ray.origin.distanceTo(Nr);c<e.near||c>e.far||t.push({distance:c,point:Nr.clone(),uv:Vn.getInterpolation(Nr,Oo,Fr,zo,Iu,vc,Du,new fe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Bo(i,e,t,n,s,r){Zs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Ur.x=r*Zs.x-s*Zs.y,Ur.y=s*Zs.x+r*Zs.y):Ur.copy(Zs),i.copy(e),i.x+=Ur.x,i.y+=Ur.y,i.applyMatrix4(ff)}const Nu=new U,Uu=new at,Fu=new at,Tv=new U,Ou=new Ke,ko=new U,yc=new vi,zu=new Ke,Mc=new Da;class Av extends V{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Bh,this.bindMatrix=new Ke,this.bindMatrixInverse=new Ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new _i),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ko),this.boundingBox.expandByPoint(ko)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new vi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ko),this.boundingSphere.expandByPoint(ko)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yc.copy(this.boundingSphere),yc.applyMatrix4(s),e.ray.intersectsSphere(yc)!==!1&&(zu.copy(s).invert(),Mc.copy(e.ray).applyMatrix4(zu),!(this.boundingBox!==null&&Mc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Mc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Bh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Dp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Uu.fromBufferAttribute(s.attributes.skinIndex,e),Fu.fromBufferAttribute(s.attributes.skinWeight,e),Nu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Fu.getComponent(r);if(o!==0){const a=Uu.getComponent(r);Ou.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Tv.copy(Nu).applyMatrix4(Ou),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class pf extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class lh extends Gt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=_n,h=_n,f,u){super(null,o,a,c,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Bu=new Ke,Rv=new Ke;class hh{constructor(e=[],t=[]){this.uuid=Xn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:Rv;Bu.multiplyMatrices(a,t[r]),Bu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new hh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new lh(t,e,e,Wn,En);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new pf),this.bones.push(o),this.boneInverses.push(new Ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class Dl extends en{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Js=new Ke,ku=new Ke,Ho=[],Hu=new _i,Cv=new Ke,Or=new V,zr=new vi;class fi extends V{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Dl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Cv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new _i),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Js),Hu.copy(e.boundingBox).applyMatrix4(Js),this.boundingBox.union(Hu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Js),zr.copy(e.boundingSphere).applyMatrix4(Js),this.boundingSphere.union(zr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Or.geometry=this.geometry,Or.material=this.material,Or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zr.copy(this.boundingSphere),zr.applyMatrix4(n),e.ray.intersectsSphere(zr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Js),ku.multiplyMatrices(n,Js),Or.matrixWorld=ku,Or.raycast(e,Ho);for(let o=0,a=Ho.length;o<a;o++){const c=Ho[o];c.instanceId=r,c.object=this,t.push(c)}Ho.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Dl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new lh(new Float32Array(s*this.count),s,this.count,Ql,En));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class mf extends si{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ba=new U,Ea=new U,Gu=new Ke,Br=new Da,Go=new vi,Sc=new U,Vu=new U;class uh extends St{constructor(e=new kt,t=new mf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ba.fromBufferAttribute(t,s-1),Ea.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ba.distanceTo(Ea);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Go.copy(n.boundingSphere),Go.applyMatrix4(s),Go.radius+=r,e.ray.intersectsSphere(Go)===!1)return;Gu.copy(s).invert(),Br.copy(e.ray).applyMatrix4(Gu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let x=p,d=m-1;x<d;x+=l){const g=h.getX(x),y=h.getX(x+1),v=Vo(this,e,Br,c,g,y);v&&t.push(v)}if(this.isLineLoop){const x=h.getX(m-1),d=h.getX(p),g=Vo(this,e,Br,c,x,d);g&&t.push(g)}}else{const p=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let x=p,d=m-1;x<d;x+=l){const g=Vo(this,e,Br,c,x,x+1);g&&t.push(g)}if(this.isLineLoop){const x=Vo(this,e,Br,c,m-1,p);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Vo(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(ba.fromBufferAttribute(o,s),Ea.fromBufferAttribute(o,r),t.distanceSqToSegment(ba,Ea,Sc,Vu)>n)return;Sc.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Sc);if(!(c<e.near||c>e.far))return{distance:c,point:Vu.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Wu=new U,Xu=new U;class Pv extends uh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Wu.fromBufferAttribute(t,s),Xu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Wu.distanceTo(Xu);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Lv extends uh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ua extends si{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const qu=new Ke,Nl=new Da,Wo=new vi,Xo=new U;class dh extends St{constructor(e=new kt,t=new Ua){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wo.copy(n.boundingSphere),Wo.applyMatrix4(s),Wo.radius+=r,e.ray.intersectsSphere(Wo)===!1)return;qu.copy(s).invert(),Nl.copy(e.ray).applyMatrix4(qu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,f=n.attributes.position;if(l!==null){const u=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let m=u,x=p;m<x;m++){const d=l.getX(m);Xo.fromBufferAttribute(f,d),Yu(Xo,d,c,s,e,t,this)}}else{const u=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let m=u,x=p;m<x;m++)Xo.fromBufferAttribute(f,m),Yu(Xo,m,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Yu(i,e,t,n,s,r,o){const a=Nl.distanceSqToPoint(i);if(a<t){const c=new U;Nl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class pn extends Gt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class yi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],u=n[s+1]-h,p=(o-h)/u;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new fe:new U);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new U,s=[],r=[],o=[],a=new U,c=new Ke;for(let p=0;p<=e;p++){const m=p/e;s[p]=this.getTangentAt(m,new U)}r[0]=new U,o[0]=new U;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Ht(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,m))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Ht(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],p*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class fh extends yi{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new fe){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=c-this.aX,p=l-this.aY;c=u*h-p*f+this.aX,l=u*f+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Iv extends fh{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ph(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,f){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+f)+(c-a)/f;u*=h,p*=h,s(o,a,u,p)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const qo=new U,wc=new ph,bc=new ph,Ec=new ph;class Dv extends yi{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new U){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(qo.subVectors(s[0],s[1]).add(s[0]),l=qo);const f=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(qo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=qo),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(f),p),x=Math.pow(f.distanceToSquared(u),p),d=Math.pow(u.distanceToSquared(h),p);x<1e-4&&(x=1),m<1e-4&&(m=x),d<1e-4&&(d=x),wc.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,m,x,d),bc.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,m,x,d),Ec.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,m,x,d)}else this.curveType==="catmullrom"&&(wc.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),bc.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),Ec.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return n.set(wc.calc(c),bc.calc(c),Ec.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new U().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ku(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function Nv(i,e){const t=1-i;return t*t*e}function Uv(i,e){return 2*(1-i)*i*e}function Fv(i,e){return i*i*e}function Zr(i,e,t,n){return Nv(i,e)+Uv(i,t)+Fv(i,n)}function Ov(i,e){const t=1-i;return t*t*t*e}function zv(i,e){const t=1-i;return 3*t*t*i*e}function Bv(i,e){return 3*(1-i)*i*i*e}function kv(i,e){return i*i*i*e}function Jr(i,e,t,n,s){return Ov(i,e)+zv(i,t)+Bv(i,n)+kv(i,s)}class gf extends yi{constructor(e=new fe,t=new fe,n=new fe,s=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new fe){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Jr(e,s.x,r.x,o.x,a.x),Jr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Hv extends yi{constructor(e=new U,t=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new U){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Jr(e,s.x,r.x,o.x,a.x),Jr(e,s.y,r.y,o.y,a.y),Jr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class xf extends yi{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gv extends yi{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _f extends yi{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Zr(e,s.x,r.x,o.x),Zr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vv extends yi{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Zr(e,s.x,r.x,o.x),Zr(e,s.y,r.y,o.y),Zr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class vf extends yi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(Ku(a,c.x,l.x,h.x,f.x),Ku(a,c.y,l.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new fe().fromArray(s))}return this}}var Ul=Object.freeze({__proto__:null,ArcCurve:Iv,CatmullRomCurve3:Dv,CubicBezierCurve:gf,CubicBezierCurve3:Hv,EllipseCurve:fh,LineCurve:xf,LineCurve3:Gv,QuadraticBezierCurve:_f,QuadraticBezierCurve3:Vv,SplineCurve:vf});class Wv extends yi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ul[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Ul[s.type]().fromJSON(s))}return this}}class $u extends Wv{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new xf(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new _f(this.currentPoint.clone(),new fe(e,t),new fe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new gf(this.currentPoint.clone(),new fe(e,t),new fe(n,s),new fe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new vf(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){const l=new fh(e,t,n,s,r,o,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Rs extends kt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new U,h=new fe;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,u=3;f<=t;f++,u+=3){const p=n+f/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,c.push(h.x,h.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new _t(o,3)),this.setAttribute("normal",new _t(a,3)),this.setAttribute("uv",new _t(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ue extends kt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],u=[],p=[];let m=0;const x=[],d=n/2;let g=0;y(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new _t(f,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(p,2));function y(){const M=new U,A=new U;let w=0;const b=(t-e)/n;for(let T=0;T<=r;T++){const F=[],_=T/r,S=_*(t-e)+e;for(let D=0;D<=s;D++){const I=D/s,P=I*c+a,O=Math.sin(P),N=Math.cos(P);A.x=S*O,A.y=-_*n+d,A.z=S*N,f.push(A.x,A.y,A.z),M.set(O,b,N).normalize(),u.push(M.x,M.y,M.z),p.push(I,1-_),F.push(m++)}x.push(F)}for(let T=0;T<s;T++)for(let F=0;F<r;F++){const _=x[F][T],S=x[F+1][T],D=x[F+1][T+1],I=x[F][T+1];e>0&&(h.push(_,S,I),w+=3),t>0&&(h.push(S,D,I),w+=3)}l.addGroup(g,w,0),g+=w}function v(M){const A=m,w=new fe,b=new U;let T=0;const F=M===!0?e:t,_=M===!0?1:-1;for(let D=1;D<=s;D++)f.push(0,d*_,0),u.push(0,_,0),p.push(.5,.5),m++;const S=m;for(let D=0;D<=s;D++){const P=D/s*c+a,O=Math.cos(P),N=Math.sin(P);b.x=F*N,b.y=d*_,b.z=F*O,f.push(b.x,b.y,b.z),u.push(0,_,0),w.x=O*.5+.5,w.y=N*.5*_+.5,p.push(w.x,w.y),m++}for(let D=0;D<s;D++){const I=A+D,P=S+D;M===!0?h.push(P,P+1,I):h.push(P+1,P,I),T+=3}l.addGroup(g,T,M===!0?1:2),g+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ue(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $t extends Ue{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new $t(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Fa extends $u{constructor(e){super(e),this.uuid=Xn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new $u().fromJSON(s))}return this}}const Xv={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=yf(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,f,u,p;if(n&&(r=jv(i,e,r,t)),i.length>80*t){a=l=i[0],c=h=i[1];for(let m=t;m<s;m+=t)f=i[m],u=i[m+1],f<a&&(a=f),u<c&&(c=u),f>l&&(l=f),u>h&&(h=u);p=Math.max(l-a,h-c),p=p!==0?32767/p:0}return ao(r,o,t,a,c,p,0),o}};function yf(i,e,t,n,s){let r,o;if(s===ay(i,e,t,n)>0)for(r=e;r<t;r+=n)o=ju(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=ju(r,i[r],i[r+1],o);return o&&Oa(o,o.next)&&(lo(o),o=o.next),o}function Cs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Oa(t,t.next)||Tt(t.prev,t,t.next)===0)){if(lo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ao(i,e,t,n,s,r,o){if(!i)return;!o&&r&&ty(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Yv(i,n,s,r):qv(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),lo(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Kv(Cs(i),e,t),ao(i,e,t,n,s,r,2)):o===2&&$v(i,e,t,n,s,r):ao(Cs(i),e,t,n,s,r,1);break}}}function qv(i){const e=i.prev,t=i,n=i.next;if(Tt(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,f=a<c?a<l?a:l:c<l?c:l,u=s>r?s>o?s:o:r>o?r:o,p=a>c?a>l?a:l:c>l?c:l;let m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=u&&m.y>=f&&m.y<=p&&ir(s,a,r,c,o,l,m.x,m.y)&&Tt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Yv(i,e,t,n){const s=i.prev,r=i,o=i.next;if(Tt(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,f=r.y,u=o.y,p=a<c?a<l?a:l:c<l?c:l,m=h<f?h<u?h:u:f<u?f:u,x=a>c?a>l?a:l:c>l?c:l,d=h>f?h>u?h:u:f>u?f:u,g=Fl(p,m,e,t,n),y=Fl(x,d,e,t,n);let v=i.prevZ,M=i.nextZ;for(;v&&v.z>=g&&M&&M.z<=y;){if(v.x>=p&&v.x<=x&&v.y>=m&&v.y<=d&&v!==s&&v!==o&&ir(a,h,c,f,l,u,v.x,v.y)&&Tt(v.prev,v,v.next)>=0||(v=v.prevZ,M.x>=p&&M.x<=x&&M.y>=m&&M.y<=d&&M!==s&&M!==o&&ir(a,h,c,f,l,u,M.x,M.y)&&Tt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;v&&v.z>=g;){if(v.x>=p&&v.x<=x&&v.y>=m&&v.y<=d&&v!==s&&v!==o&&ir(a,h,c,f,l,u,v.x,v.y)&&Tt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;M&&M.z<=y;){if(M.x>=p&&M.x<=x&&M.y>=m&&M.y<=d&&M!==s&&M!==o&&ir(a,h,c,f,l,u,M.x,M.y)&&Tt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Kv(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!Oa(s,r)&&Mf(s,n,n.next,r)&&co(s,r)&&co(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),lo(n),lo(n.next),n=i=r),n=n.next}while(n!==i);return Cs(n)}function $v(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&sy(o,a)){let c=Sf(o,a);o=Cs(o,o.next),c=Cs(c,c.next),ao(o,e,t,n,s,r,0),ao(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function jv(i,e,t,n){const s=[];let r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=yf(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(iy(l));for(s.sort(Zv),r=0;r<s.length;r++)t=Jv(s[r],t);return t}function Zv(i,e){return i.x-e.x}function Jv(i,e){const t=Qv(i,e);if(!t)return e;const n=Sf(t,i);return Cs(n,n.next),Cs(t,t.next)}function Qv(i,e){let t=e,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const u=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=r&&u>n&&(n=u,s=t.x<t.next.x?t:t.next,u===r))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,f;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&ir(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(f=Math.abs(o-t.y)/(r-t.x),co(t,i)&&(f<h||f===h&&(t.x>s.x||t.x===s.x&&ey(s,t)))&&(s=t,h=f)),t=t.next;while(t!==a);return s}function ey(i,e){return Tt(i.prev,i,e.prev)<0&&Tt(e.next,i,i.next)<0}function ty(i,e,t,n){let s=i;do s.z===0&&(s.z=Fl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,ny(s)}function ny(i){let e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function Fl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function iy(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function ir(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function sy(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!ry(i,e)&&(co(i,e)&&co(e,i)&&oy(i,e)&&(Tt(i.prev,i,e.prev)||Tt(i,e.prev,e))||Oa(i,e)&&Tt(i.prev,i,i.next)>0&&Tt(e.prev,e,e.next)>0)}function Tt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Oa(i,e){return i.x===e.x&&i.y===e.y}function Mf(i,e,t,n){const s=Ko(Tt(i,e,t)),r=Ko(Tt(i,e,n)),o=Ko(Tt(t,n,i)),a=Ko(Tt(t,n,e));return!!(s!==r&&o!==a||s===0&&Yo(i,t,e)||r===0&&Yo(i,n,e)||o===0&&Yo(t,i,n)||a===0&&Yo(t,e,n))}function Yo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ko(i){return i>0?1:i<0?-1:0}function ry(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Mf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function co(i,e){return Tt(i.prev,i,i.next)<0?Tt(i,e,i.next)>=0&&Tt(i,i.prev,e)>=0:Tt(i,e,i.prev)<0||Tt(i,i.next,e)<0}function oy(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Sf(i,e){const t=new Ol(i.i,i.x,i.y),n=new Ol(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ju(i,e,t,n){const s=new Ol(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function lo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ol(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ay(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class cs{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return cs.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Zu(e),Ju(n,e);let o=e.length;t.forEach(Zu);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,Ju(n,t[c]);const a=Xv.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Zu(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Ju(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class mh extends kt{constructor(e=new Fa([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new _t(s,3)),this.setAttribute("uv",new _t(r,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:p-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,d=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:cy;let v,M=!1,A,w,b,T;g&&(v=g.getSpacedPoints(h),M=!0,u=!1,A=g.computeFrenetFrames(h,!1),w=new U,b=new U,T=new U),u||(d=0,p=0,m=0,x=0);const F=a.extractPoints(l);let _=F.shape;const S=F.holes;if(!cs.isClockWise(_)){_=_.reverse();for(let ie=0,C=S.length;ie<C;ie++){const le=S[ie];cs.isClockWise(le)&&(S[ie]=le.reverse())}}const I=cs.triangulateShape(_,S),P=_;for(let ie=0,C=S.length;ie<C;ie++){const le=S[ie];_=_.concat(le)}function O(ie,C,le){return C||console.error("THREE.ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(C,le)}const N=_.length,W=I.length;function z(ie,C,le){let j,$,se;const pe=ie.x-C.x,me=ie.y-C.y,L=le.x-ie.x,E=le.y-ie.y,G=pe*pe+me*me,Q=pe*E-me*L;if(Math.abs(Q)>Number.EPSILON){const re=Math.sqrt(G),Z=Math.sqrt(L*L+E*E),we=C.x-me/re,ye=C.y+pe/re,Me=le.x-E/Z,Xe=le.y+L/Z,ue=((Me-we)*E-(Xe-ye)*L)/(pe*E-me*L);j=we+pe*ue-ie.x,$=ye+me*ue-ie.y;const Te=j*j+$*$;if(Te<=2)return new fe(j,$);se=Math.sqrt(Te/2)}else{let re=!1;pe>Number.EPSILON?L>Number.EPSILON&&(re=!0):pe<-Number.EPSILON?L<-Number.EPSILON&&(re=!0):Math.sign(me)===Math.sign(E)&&(re=!0),re?(j=-me,$=pe,se=Math.sqrt(G)):(j=pe,$=me,se=Math.sqrt(G/2))}return new fe(j/se,$/se)}const te=[];for(let ie=0,C=P.length,le=C-1,j=ie+1;ie<C;ie++,le++,j++)le===C&&(le=0),j===C&&(j=0),te[ie]=z(P[ie],P[le],P[j]);const ne=[];let ce,Ae=te.concat();for(let ie=0,C=S.length;ie<C;ie++){const le=S[ie];ce=[];for(let j=0,$=le.length,se=$-1,pe=j+1;j<$;j++,se++,pe++)se===$&&(se=0),pe===$&&(pe=0),ce[j]=z(le[j],le[se],le[pe]);ne.push(ce),Ae=Ae.concat(ce)}for(let ie=0;ie<d;ie++){const C=ie/d,le=p*Math.cos(C*Math.PI/2),j=m*Math.sin(C*Math.PI/2)+x;for(let $=0,se=P.length;$<se;$++){const pe=O(P[$],te[$],j);ee(pe.x,pe.y,-le)}for(let $=0,se=S.length;$<se;$++){const pe=S[$];ce=ne[$];for(let me=0,L=pe.length;me<L;me++){const E=O(pe[me],ce[me],j);ee(E.x,E.y,-le)}}}const Le=m+x;for(let ie=0;ie<N;ie++){const C=u?O(_[ie],Ae[ie],Le):_[ie];M?(b.copy(A.normals[0]).multiplyScalar(C.x),w.copy(A.binormals[0]).multiplyScalar(C.y),T.copy(v[0]).add(b).add(w),ee(T.x,T.y,T.z)):ee(C.x,C.y,0)}for(let ie=1;ie<=h;ie++)for(let C=0;C<N;C++){const le=u?O(_[C],Ae[C],Le):_[C];M?(b.copy(A.normals[ie]).multiplyScalar(le.x),w.copy(A.binormals[ie]).multiplyScalar(le.y),T.copy(v[ie]).add(b).add(w),ee(T.x,T.y,T.z)):ee(le.x,le.y,f/h*ie)}for(let ie=d-1;ie>=0;ie--){const C=ie/d,le=p*Math.cos(C*Math.PI/2),j=m*Math.sin(C*Math.PI/2)+x;for(let $=0,se=P.length;$<se;$++){const pe=O(P[$],te[$],j);ee(pe.x,pe.y,f+le)}for(let $=0,se=S.length;$<se;$++){const pe=S[$];ce=ne[$];for(let me=0,L=pe.length;me<L;me++){const E=O(pe[me],ce[me],j);M?ee(E.x,E.y+v[h-1].y,v[h-1].x+le):ee(E.x,E.y,f+le)}}}X(),ae();function X(){const ie=s.length/3;if(u){let C=0,le=N*C;for(let j=0;j<W;j++){const $=I[j];xe($[2]+le,$[1]+le,$[0]+le)}C=h+d*2,le=N*C;for(let j=0;j<W;j++){const $=I[j];xe($[0]+le,$[1]+le,$[2]+le)}}else{for(let C=0;C<W;C++){const le=I[C];xe(le[2],le[1],le[0])}for(let C=0;C<W;C++){const le=I[C];xe(le[0]+N*h,le[1]+N*h,le[2]+N*h)}}n.addGroup(ie,s.length/3-ie,0)}function ae(){const ie=s.length/3;let C=0;ge(P,C),C+=P.length;for(let le=0,j=S.length;le<j;le++){const $=S[le];ge($,C),C+=$.length}n.addGroup(ie,s.length/3-ie,1)}function ge(ie,C){let le=ie.length;for(;--le>=0;){const j=le;let $=le-1;$<0&&($=ie.length-1);for(let se=0,pe=h+d*2;se<pe;se++){const me=N*se,L=N*(se+1),E=C+j+me,G=C+$+me,Q=C+$+L,re=C+j+L;de(E,G,Q,re)}}}function ee(ie,C,le){c.push(ie),c.push(C),c.push(le)}function xe(ie,C,le){Re(ie),Re(C),Re(le);const j=s.length/3,$=y.generateTopUV(n,s,j-3,j-2,j-1);He($[0]),He($[1]),He($[2])}function de(ie,C,le,j){Re(ie),Re(C),Re(j),Re(C),Re(le),Re(j);const $=s.length/3,se=y.generateSideWallUV(n,s,$-6,$-3,$-2,$-1);He(se[0]),He(se[1]),He(se[3]),He(se[1]),He(se[2]),He(se[3])}function Re(ie){s.push(c[ie*3+0]),s.push(c[ie*3+1]),s.push(c[ie*3+2])}function He(ie){r.push(ie.x),r.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return ly(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ul[s.type]().fromJSON(s)),new mh(n,e.options)}}const cy={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new fe(r,o),new fe(a,c),new fe(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],f=e[n*3+2],u=e[s*3],p=e[s*3+1],m=e[s*3+2],x=e[r*3],d=e[r*3+1],g=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new fe(o,1-c),new fe(l,1-f),new fe(u,1-m),new fe(x,1-g)]:[new fe(a,1-c),new fe(h,1-f),new fe(p,1-m),new fe(d,1-g)]}};function ly(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class gh extends kt{constructor(e=new Fa([new fe(0,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new _t(s,3)),this.setAttribute("normal",new _t(r,3)),this.setAttribute("uv",new _t(o,2));function l(h){const f=s.length/3,u=h.extractPoints(t);let p=u.shape;const m=u.holes;cs.isClockWise(p)===!1&&(p=p.reverse());for(let d=0,g=m.length;d<g;d++){const y=m[d];cs.isClockWise(y)===!0&&(m[d]=y.reverse())}const x=cs.triangulateShape(p,m);for(let d=0,g=m.length;d<g;d++){const y=m[d];p=p.concat(y)}for(let d=0,g=p.length;d<g;d++){const y=p[d];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let d=0,g=x.length;d<g;d++){const y=x[d],v=y[0]+f,M=y[1]+f,A=y[2]+f;n.push(v,M,A),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return hy(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];n.push(o)}return new gh(n,e.curveSegments)}}function hy(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class jt extends kt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],f=new U,u=new U,p=[],m=[],x=[],d=[];for(let g=0;g<=n;g++){const y=[],v=g/n;let M=0;g===0&&o===0?M=.5/t:g===n&&c===Math.PI&&(M=-.5/t);for(let A=0;A<=t;A++){const w=A/t;f.x=-e*Math.cos(s+w*r)*Math.sin(o+v*a),f.y=e*Math.cos(o+v*a),f.z=e*Math.sin(s+w*r)*Math.sin(o+v*a),m.push(f.x,f.y,f.z),u.copy(f).normalize(),x.push(u.x,u.y,u.z),d.push(w+M,1-v),y.push(l++)}h.push(y)}for(let g=0;g<n;g++)for(let y=0;y<t;y++){const v=h[g][y+1],M=h[g][y],A=h[g+1][y],w=h[g+1][y+1];(g!==0||o>0)&&p.push(v,M,w),(g!==n-1||c<Math.PI)&&p.push(M,A,w)}this.setIndex(p),this.setAttribute("position",new _t(m,3)),this.setAttribute("normal",new _t(x,3)),this.setAttribute("uv",new _t(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class xh extends kt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new U,f=new U,u=new U;for(let p=0;p<=n;p++)for(let m=0;m<=s;m++){const x=m/s*r,d=p/n*Math.PI*2;f.x=(e+t*Math.cos(d))*Math.cos(x),f.y=(e+t*Math.cos(d))*Math.sin(x),f.z=t*Math.sin(d),a.push(f.x,f.y,f.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),u.subVectors(f,h).normalize(),c.push(u.x,u.y,u.z),l.push(m/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let m=1;m<=s;m++){const x=(s+1)*p+m-1,d=(s+1)*(p-1)+m-1,g=(s+1)*(p-1)+m,y=(s+1)*p+m;o.push(x,d,y),o.push(d,g,y)}this.setIndex(o),this.setAttribute("position",new _t(a,3)),this.setAttribute("normal",new _t(c,3)),this.setAttribute("uv",new _t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xh(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class K extends si{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qd,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Mi extends K{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new fe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ke(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ke(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ke(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function $o(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function uy(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function dy(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Qu(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function wf(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class uo{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class fy extends uo{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:kh,endingEnd:kh}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Hh:r=e,a=2*t-n;break;case Gh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Hh:o=e,c=2*n-t;break;case Gh:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,p=this._weightNext,m=(n-t)/(s-t),x=m*m,d=x*m,g=-u*d+2*u*x-u*m,y=(1+u)*d+(-1.5-2*u)*x+(-.5+u)*m+1,v=(-1-p)*d+(1.5+p)*x+.5*m,M=p*d-p*x;for(let A=0;A!==a;++A)r[A]=g*o[h+A]+y*o[l+A]+v*o[c+A]+M*o[f+A];return r}}class py extends uo{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),f=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*f+o[c+u]*h;return r}}class my extends uo{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Si{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=$o(t,this.TimeBufferType),this.values=$o(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:$o(e.times,Array),values:$o(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new my(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new py(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new fy(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case io:t=this.InterpolantFactoryMethodDiscrete;break;case so:t=this.InterpolantFactoryMethodLinear;break;case Wa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return io;case this.InterpolantFactoryMethodLinear:return so;case this.InterpolantFactoryMethodSmooth:return Wa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&uy(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Wa,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{const f=a*n,u=f-n,p=f+n;for(let m=0;m!==n;++m){const x=t[f+m];if(x!==t[u+m]||x!==t[p+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const f=a*n,u=o*n;for(let p=0;p!==n;++p)t[u+p]=t[f+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Si.prototype.TimeBufferType=Float32Array;Si.prototype.ValueBufferType=Float32Array;Si.prototype.DefaultInterpolation=so;class Ar extends Si{constructor(e,t,n){super(e,t,n)}}Ar.prototype.ValueTypeName="bool";Ar.prototype.ValueBufferType=Array;Ar.prototype.DefaultInterpolation=io;Ar.prototype.InterpolantFactoryMethodLinear=void 0;Ar.prototype.InterpolantFactoryMethodSmooth=void 0;class bf extends Si{}bf.prototype.ValueTypeName="color";class Mr extends Si{}Mr.prototype.ValueTypeName="number";class gy extends uo{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t);let l=e*a;for(let h=l+a;l!==h;l+=4)fn.slerpFlat(r,0,o,l-a,o,l,c);return r}}class Sr extends Si{InterpolantFactoryMethodLinear(e){return new gy(this.times,this.values,this.getValueSize(),e)}}Sr.prototype.ValueTypeName="quaternion";Sr.prototype.InterpolantFactoryMethodSmooth=void 0;class Rr extends Si{constructor(e,t,n){super(e,t,n)}}Rr.prototype.ValueTypeName="string";Rr.prototype.ValueBufferType=Array;Rr.prototype.DefaultInterpolation=io;Rr.prototype.InterpolantFactoryMethodLinear=void 0;Rr.prototype.InterpolantFactoryMethodSmooth=void 0;class wr extends Si{}wr.prototype.ValueTypeName="vector";class xy{constructor(e="",t=-1,n=[],s=Np){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Xn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(vy(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Si.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=dy(c);c=Qu(c,1,h),l=Qu(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Mr(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(r);if(h&&h.length>1){const f=h[1];let u=s[f];u||(s[f]=u=[]),u.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(f,u,p,m,x){if(p.length!==0){const d=[],g=[];wf(p,d,g,m),d.length!==0&&x.push(new f(u,d,g))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let f=0;f<l.length;f++){const u=l[f].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const p={};let m;for(m=0;m<u.length;m++)if(u[m].morphTargets)for(let x=0;x<u[m].morphTargets.length;x++)p[u[m].morphTargets[x]]=-1;for(const x in p){const d=[],g=[];for(let y=0;y!==u[m].morphTargets.length;++y){const v=u[m];d.push(v.time),g.push(v.morphTarget===x?1:0)}s.push(new Mr(".morphTargetInfluence["+x+"]",d,g))}c=p.length*o}else{const p=".bones["+t[f].name+"]";n(wr,p+".position",u,"pos",s),n(Sr,p+".quaternion",u,"rot",s),n(wr,p+".scale",u,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function _y(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Mr;case"vector":case"vector2":case"vector3":case"vector4":return wr;case"color":return bf;case"quaternion":return Sr;case"bool":case"boolean":return Ar;case"string":return Rr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function vy(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=_y(i.type);if(i.times===void 0){const t=[],n=[];wf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const ns={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class yy{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){const f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=l.length;f<u;f+=2){const p=l[f],m=l[f+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null}}}const My=new yy;class Is{constructor(e){this.manager=e!==void 0?e:My,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Is.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ci={};class Sy extends Error{constructor(e,t){super(e),this.response=t}}class _h extends Is{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ns.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ci[e]!==void 0){Ci[e].push({onLoad:t,onProgress:n,onError:s});return}Ci[e]=[],Ci[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Ci[e],f=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=u?parseInt(u):0,m=p!==0;let x=0;const d=new ReadableStream({start(g){y();function y(){f.read().then(({done:v,value:M})=>{if(v)g.close();else{x+=M.byteLength;const A=new ProgressEvent("progress",{lengthComputable:m,loaded:x,total:p});for(let w=0,b=h.length;w<b;w++){const T=h[w];T.onProgress&&T.onProgress(A)}g.enqueue(M),y()}},v=>{g.error(v)})}}});return new Response(d)}else throw new Sy(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),u=f&&f[1]?f[1].toLowerCase():void 0,p=new TextDecoder(u);return l.arrayBuffer().then(m=>p.decode(m))}}}).then(l=>{ns.add(e,l);const h=Ci[e];delete Ci[e];for(let f=0,u=h.length;f<u;f++){const p=h[f];p.onLoad&&p.onLoad(l)}}).catch(l=>{const h=Ci[e];if(h===void 0)throw this.manager.itemError(e),l;delete Ci[e];for(let f=0,u=h.length;f<u;f++){const p=h[f];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class wy extends Is{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ns.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=ro("img");function c(){h(),ns.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(f){h(),s&&s(f),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class by extends Is{constructor(e){super(e)}load(e,t,n,s){const r=this,o=new lh,a=new _h(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(s!==void 0)s(h);else{console.error(h);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:mi,o.wrapT=l.wrapT!==void 0?l.wrapT:mi,o.magFilter=l.magFilter!==void 0?l.magFilter:Qt,o.minFilter=l.minFilter!==void 0?l.minFilter:Qt,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(o.colorSpace=l.colorSpace),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=gi),l.mipmapCount===1&&(o.minFilter=Qt),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,t&&t(o,l)},n,s),o}}class Ey extends Is{constructor(e){super(e)}load(e,t,n,s){const r=new Gt,o=new wy(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class za extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ty extends za{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Tc=new Ke,ed=new U,td=new U;class vh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.map=null,this.mapPass=null,this.matrix=new Ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rh,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ed.setFromMatrixPosition(e.matrixWorld),t.position.copy(ed),td.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(td),t.updateMatrixWorld(),Tc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Tc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ay extends vh{constructor(){super(new xn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=vr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Ef extends za{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Ay}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const nd=new Ke,kr=new U,Ac=new U;class Ry extends vh{constructor(){super(new xn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new fe(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),kr.setFromMatrixPosition(e.matrixWorld),n.position.copy(kr),Ac.copy(n.position),Ac.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ac),n.updateMatrixWorld(),s.makeTranslation(-kr.x,-kr.y,-kr.z),nd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nd)}}class Cy extends za{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ry}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Py extends vh{constructor(){super(new oh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tf extends za{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new Py}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Qr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Ly extends Is{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ns.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ns.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),ns.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ns.add(e,c),r.manager.itemStart(e)}}const yh="\\[\\]\\.:\\/",Iy=new RegExp("["+yh+"]","g"),Mh="[^"+yh+"]",Dy="[^"+yh.replace("\\.","")+"]",Ny=/((?:WC+[\/:])*)/.source.replace("WC",Mh),Uy=/(WCOD+)?/.source.replace("WCOD",Dy),Fy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mh),Oy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mh),zy=new RegExp("^"+Ny+Uy+Fy+Oy+"$"),By=["material","materials","bones","map"];class ky{constructor(e,t,n){const s=n||pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class pt{constructor(e,t,n){this.path=t,this.parsedPath=n||pt.parseTrackName(t),this.node=pt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new pt.Composite(e,t,n):new pt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Iy,"")}static parseTrackName(e){const t=zy.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);By.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=pt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[s];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}pt.Composite=ky;pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray];pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$l}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$l);const ht={mass:1043,wingArea:16.2,wingSpan:11,chord:1.47,CL0:.25,CLalpha:4.8,CLflap:.55,CD0:.032,kInduced:.055,CDflap:.09,CDgear:.02,alphaCrit:15*Math.PI/180,thrustMax:5200,rho0:1.225,gearHeight:1.1,Vr:26,stallWarn:12*Math.PI/180},Hy={...ht};function Af(i={}){Object.assign(ht,Hy,i)}const Rc={Vfe:85,Vno:129,Vne:163},Cc=.514444,Pc={Vfe:Rc.Vfe*Cc,Vno:Rc.Vno*Cc,Vne:Rc.Vne*Cc};function Rf(i){return ht.rho0*Math.exp(-i/8500)}function Gy(i,e,t,n,s,r={}){const{x:o,y:a,z:c}=i,l=-c,h=-a,f=Math.hypot(o,a,c),u=Rf(Math.max(0,s)),p=.5*u*f*f;let m=0,x=0;f>.5&&(m=Math.atan2(h,Math.max(.1,l)),x=Math.asin(Math.max(-1,Math.min(1,o/f))));const d=ht.wingArea,g=ht.alphaCrit-t*(2*Math.PI/180)+(r.critBonus||0);let y=ht.CL0+ht.CLalpha*m+ht.CLflap*t,v=ht.CD0+ht.kInduced*y*y+ht.CDflap*t+(n?ht.CDgear:0);const M=m>g&&f>5;if(M){const b=Math.min(.5,(m-g)*2.2);y*=1-b,v+=b*1.6}const A=p*d*y*(r.liftMul||1),w=p*d*v;return{V:f,alpha:m,beta:x,q:p,rho:u,CL:y,CD:v,lift:A,drag:w,stalled:M,alphaCrit:g}}function Vy(i,e,t,n=1){const s=Rf(t)/ht.rho0,r=Math.max(.25,1-e/110);return i*ht.thrustMax*(.55+.45*r)*(.6+.4*s)*n}function Wy(i,e,t){const n=Math.max(0,1-e/55),s=i*n*.35+i*Math.max(0,t)*.5*n,r=-i*n*.28;return{yawRate:s,rollRate:r}}function Xy(i,e,t){const n=[];return e>.01&&i>Pc.Vfe&&n.push("flap-overspeed"),i>Pc.Vne?n.push("vne"):i>Pc.Vno&&n.push("vno"),n}function qy(i,e,t=1.7){if(!e)return null;const n=e===1?.5:1.4;return{x:(Math.sin(i*2.1*t)+Math.sin(i*5.7)*.5)*n,y:(Math.sin(i*1.7+2)+Math.sin(i*4.3+1)*.5)*n*.7,z:Math.sin(i*1.3+4)*n*.5,roll:Math.sin(i*3.1+.7)*n*.25}}const eo=[0,10,20,30];function Yy(i){return eo[Math.max(0,Math.min(eo.length-1,i))]/30}const Cf=Math.sqrt(3),Ky=.5*(Cf-1),Hr=(3-Cf)/6,id=i=>Math.floor(i)|0,sd=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);function $y(i=Math.random){const e=jy(i),t=new Float64Array(e).map(s=>sd[s%12*2]),n=new Float64Array(e).map(s=>sd[s%12*2+1]);return function(r,o){let a=0,c=0,l=0;const h=(r+o)*Ky,f=id(r+h),u=id(o+h),p=(f+u)*Hr,m=f-p,x=u-p,d=r-m,g=o-x;let y,v;d>g?(y=1,v=0):(y=0,v=1);const M=d-y+Hr,A=g-v+Hr,w=d-1+2*Hr,b=g-1+2*Hr,T=f&255,F=u&255;let _=.5-d*d-g*g;if(_>=0){const I=T+e[F],P=t[I],O=n[I];_*=_,a=_*_*(P*d+O*g)}let S=.5-M*M-A*A;if(S>=0){const I=T+y+e[F+v],P=t[I],O=n[I];S*=S,c=S*S*(P*M+O*A)}let D=.5-w*w-b*b;if(D>=0){const I=T+1+e[F+1],P=t[I],O=n[I];D*=D,l=D*D*(P*w+O*b)}return 70*(a+c+l)}}function jy(i){const t=new Uint8Array(512);for(let n=0;n<512/2;n++)t[n]=n;for(let n=0;n<512/2-1;n++){const s=n+~~(i()*(256-n)),r=t[n];t[n]=t[s],t[s]=r}for(let n=256;n<512;n++)t[n]=t[n-256];return t}class Ba extends V{constructor(){const e=Ba.SkyShader,t=new ki({name:e.name,uniforms:nf.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:vn,depthWrite:!1});super(new he(1,1,1),t),this.isSky=!0}}Ba.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new U},up:{value:new U(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};const xt={elev:6,halfLen:600,halfWid:15},ln={x0:40,x1:170,z0:60,z1:280},zt={elev:12,x:2500,z:1900,halfLen:300,halfWid:10},Zt={elev:20,x:-1500,z:-5600,halfLen:280,halfWid:10},ri={elev:8,x:-500,z:1050,halfLen:180,halfWid:8,name:"Harborview Strip"},oi={elev:4,x:8340,z:7240,halfLen:220,halfWid:9,name:"Seabreeze Strip"},ai={elev:12,x:-6820,z:1340,halfLen:260,halfWid:10,name:"City Strip"},ci={elev:10,x:80,z:-1300,halfLen:170,halfWid:7,name:"Lighthouse Strip"},Pf=[ri,oi,ai,ci],Zy=[[-1500,-6e3,2600,90],[-7e3,1500,2300,70],[7500,-2500,2800,210],[8500,7500,2100,55],[-13500,5500,2800,150],[13500,2e3,2200,90],[3e3,13e3,2400,80],[4e3,-5500,500,12],[-4500,-3500,600,15],[5500,4500,450,10]],jo={x:-300,z:920},Qi={x:60,z:310},Lf=[{name:"PILOT SHOP",x:-300,z:920},{name:"AIRPORT SUPPLY",x:122,z:-30},{name:"BEACH GEAR",x:8420,z:7410},{name:"CITY PILOT SUPPLY",x:-6940,z:1560},{name:"GENERAL STORE",x:-1150,z:-5240},{name:"BAIT & TACKLE",x:2590,z:2050}],qt={x:130,z:-140},Ki={x0:30,x1:230,z0:-450,z1:450};function Jy(i,e){const t=Lt(Ki.x0-80,Ki.x0+30,i)*(1-Lt(Ki.x1-30,Ki.x1+80,i)),n=Lt(Ki.z0-80,Ki.z0+30,e)*(1-Lt(Ki.z1-30,Ki.z1+80,e));return t*n}const sr=$y(xi(1337));function Lt(i,e,t){const n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)}function xi(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Qy(i,e){const t=Math.hypot(i,e),n=1-Lt(900,3400,t);let s;if(n<=0)s=-8;else{s=sr(i*9e-4,e*9e-4)*120+sr(i*.004+7.3,e*.004-2.1)*28+sr(i*.02,e*.02)*4,s=(s*.5+60)*n;const o=Math.hypot(i-1800,e+600);s+=Math.max(0,1-o/900)*320*n}for(const[o,a,c,l]of Zy){const h=Math.hypot(i-o,e-a);if(h<c){const f=1-Lt(c*.45,c,h),u=-8*(1-f)+(l+sr(i*.003+o*.13,e*.003)*l*.4)*f;u>s&&(s=u)}}const r=Math.hypot(i-zt.x,e-zt.z);if(r<1100){const o=1-Lt(500,1100,r),a=-8*(1-o)+30*o;a>s&&(s=a)}return s<=-8?-8:s-6}function eM(i,e){const t=Math.abs(i),n=Math.abs(e);return(1-Lt(xt.halfWid+40,xt.halfWid+220,t))*(1-Lt(xt.halfLen+60,xt.halfLen+400,n))}function tM(i,e){const t=Lt(ln.x0-60,ln.x0+20,i)*(1-Lt(ln.x1-20,ln.x1+60,i)),n=Lt(ln.z0-60,ln.z0+20,e)*(1-Lt(ln.z1-20,ln.z1+60,e));return t*n}function Be(i,e){let t=Qy(i,e);const n=Math.max(eM(i,e),tM(i,e),Jy(i,e));t=t*(1-n)+xt.elev*n;const s=Math.abs(i-zt.x),r=Math.abs(e-zt.z),o=(1-Lt(zt.halfWid+25,zt.halfWid+150,s))*(1-Lt(zt.halfLen+40,zt.halfLen+250,r));t=t*(1-o)+zt.elev*o;const a=Math.abs(i-Zt.x),c=Math.abs(e-Zt.z),l=(1-Lt(Zt.halfWid+25,Zt.halfWid+150,a))*(1-Lt(Zt.halfLen+40,Zt.halfLen+250,c));t=t*(1-l)+Zt.elev*l;for(const h of Pf){const f=Math.abs(i-h.x),u=Math.abs(e-h.z),p=(1-Lt(h.halfWid+15,h.halfWid+100,f))*(1-Lt(h.halfLen+25,h.halfLen+180,u));p>.01&&(t=t*(1-p)+h.elev*p)}return t}function Zo(i,e,t){return[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t]}function nM(i,e,t){const n=[.76,.7,.5],s=[.3,.5,.24],r=[.42,.55,.28],o=[.16,.32,.16],a=[.45,.42,.38],c=[.9,.9,.93];let l;return i<1.6?l=n:i<45?l=Zo(s,r,t):i<150?l=Zo(o,s,Lt(90,150,i)*.5):i<260?l=a:l=c,l=Zo(l,a,Lt(.45,.8,e)),l=Zo(n,l,Lt(.8,2.2,i)),l}function iM(i){i.fog=new ch(10336470,2500,22e3);const e=new Ba;e.scale.setScalar(9e4);const t=e.material.uniforms;t.turbidity.value=6,t.rayleigh.value=1.8,t.mieCoefficient.value=.004,t.mieDirectionalG.value=.85;const n=new U().setFromSphericalCoords(1,Math.PI*.46,Math.PI*.25);t.sunPosition.value.copy(n),i.add(e);const s=new Tf(16773853,2.6);s.position.copy(n).multiplyScalar(3e3),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.near=500,s.shadow.camera.far=6e3;const r=260;Object.assign(s.shadow.camera,{left:-r,right:r,top:r,bottom:-r}),s.shadow.bias=-4e-4,i.add(s),i.add(s.target);const o=new Ty(12375807,3825455,.75);i.add(o);const a=36e3,c=352,l=new Ct(a,a,c,c);l.rotateX(-Math.PI/2);const h=l.attributes.position,f=new Float32Array(h.count*3);for(let _=0;_<h.count;_++){const S=h.getX(_),D=h.getZ(_),I=Be(S,D);h.setY(_,I);const P=Math.abs(Be(S+8,D)-I)/8+Math.abs(Be(S,D+8)-I)/8,O=sr(S*.008+40,D*.008-17)*.5+.5,[N,W,z]=nM(I,P,O),te=sr(S*.06,D*.06)*.035;f[_*3]=N+te,f[_*3+1]=W+te,f[_*3+2]=z+te}l.setAttribute("color",new en(f,3)),l.computeVertexNormals();const u=new V(l,new K({vertexColors:!0,roughness:1,metalness:0,map:aM()}));u.receiveShadow=!0,i.add(u);const p={uTime:{value:0}},m=new Ct(12e4,12e4,96,96),x=new K({color:1328766,roughness:.18,metalness:.55});x.onBeforeCompile=_=>{_.uniforms.uTime=p.uTime,_.vertexShader=`uniform float uTime;
`+_.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vec2 wxz = (modelMatrix * vec4(position,1.0)).xz;
       transformed.y += sin(wxz.x*0.021 + uTime*0.9)*0.35 + sin(wxz.y*0.017 - uTime*0.7)*0.3 + sin((wxz.x+wxz.y)*0.05 + uTime*1.7)*0.12;`)};const d=new V(m,x);d.rotation.x=-Math.PI/2,d.position.y=0,d.name="ocean",i.add(d);const g=[];sM(i,g);const y=rM(i),v=oM(i),M=uM(i),A=dM(i),w=[...M.nightMats,...g],b=[],T=[];[...M.nightGlows],i.traverse(_=>{_.userData.blink&&b.push(_),_.userData.tlCycle&&T.push(_.userData.tlCycle),_.userData.nightLamp});function F(_,S,D,I){p.uTime.value=S,I&&(d.position.x=I.x,d.position.z=I.z);const P=I?I.x:0,O=I?I.z:0,N=18e3;for(const z of v.children)z.position.x+=D.x*.6*_+_*1.2,z.position.z+=D.z*.6*_,z.position.x>P+N&&(z.position.x-=N*2),z.position.z>O+N&&(z.position.z-=N*2),z.position.x<P-N&&(z.position.x+=N*2),z.position.z<O-N&&(z.position.z+=N*2);const W=i.getObjectByName("windsock");if(W&&D){const z=Math.hypot(D.x,D.z);W.rotation.y=Math.atan2(D.x,D.z),W.rotation.x=-.15-Math.min(1,z/8)*1.25}for(const z of b){const ne=(S*(z.userData.rate||1)+(z.userData.phase||0))%1<(z.userData.duty||.08);z.material.opacity=ne?1:0,z.visible=ne||z.userData.dim===!0,z.userData.dim&&(z.material.opacity=ne?1:.12)}for(const z of T){const te=(S+z.off)%22;z.mats.g.emissiveIntensity=te<10?2:.08,z.mats.y.emissiveIntensity=te>=10&&te<12?2:.08,z.mats.r.emissiveIntensity=te>=12?2:.08}A.update(_,S,D)}return{sunLight:s,hemi:o,skyUni:t,clouds:v,trees:y,update:F,sightFound:A.found,balloons:A.balloons,nightGlows:M.nightGlows,nightMats:w,roadLoops:M.roadLoops}}function sM(i,e){const t=xt.elev,n=new et,s=new K({color:3487292,roughness:.95}),r=new K({color:9080208,roughness:.95}),o=new V(new he(xt.halfWid*2,.3,xt.halfLen*2),s);o.position.y=t+.15,o.receiveShadow=!0,n.add(o);const a=new V(new he(ln.x1-ln.x0,.3,ln.z1-ln.z0),r);a.position.set((ln.x0+ln.x1)/2,t+.12,(ln.z0+ln.z1)/2),a.receiveShadow=!0,n.add(a);const c=new V(new he(70,.28,14),s);c.position.set(50,t+.12,170),c.receiveShadow=!0,n.add(c);const l=new mt({color:15263976});for(let _=-510;_<xt.halfLen-60;_+=60){const S=new V(new Ct(1.1,24),l);S.rotation.x=-Math.PI/2,S.position.set(0,t+.32,_),n.add(S)}for(const _ of[-1,1]){const S=_*(xt.halfLen-18);for(let P=-3;P<=3;P++){if(P===0)continue;const O=new V(new Ct(2.2,26),l);O.rotation.x=-Math.PI/2,O.position.set(P*3.4,t+.32,S),n.add(O)}for(const P of[152,305])for(const O of[-7,7]){const N=new V(new Ct(3,14),l);N.rotation.x=-Math.PI/2,N.position.set(O,t+.32,_*(xt.halfLen-P)),n.add(N)}const D=hM(_<0?"36":"18",220),I=new V(new Ct(13,20),new mt({map:D,transparent:!0}));I.rotation.x=-Math.PI/2,I.rotation.z=_<0?Math.PI:0,I.position.set(0,t+.33,_*(xt.halfLen-55)),n.add(I)}const h=new jt(.55,8,8),f=new mt({color:12571903});for(let _=-600;_<=xt.halfLen;_+=80)for(const S of[-15-2.5,xt.halfWid+2.5]){const D=new V(h,f);D.position.set(S,t+1,_),n.add(D)}for(let _=0;_<4;_++){const S=new V(new he(1.2,1,1.2),new mt({color:_<2?16724787:16777215}));S.position.set(-23-_*3,t+1,-450),n.add(S)}const u=ws();for(const _ of[-19,xt.halfWid+4]){const S=new Bt(new Dt({map:u,color:16777215,transparent:!0,depthWrite:!1}));S.position.set(_,t+2,-606),S.scale.set(6,6,1),S.userData={blink:!0,rate:1.2,duty:.06,phase:_>0?.5:0},n.add(S)}const p=new K({color:10134184,roughness:.5,metalness:.6}),m=new K({color:1316378,roughness:1});for(const[_,S]of[[120,110],[120,220]]){const D=new V(new Ue(13,13,34,20,1,!1,0,Math.PI),p);D.rotation.z=Math.PI/2,D.rotation.y=Math.PI/2,D.position.set(_,t+.2,S),D.castShadow=D.receiveShadow=!0,n.add(D);const I=new V(new Ct(24,11),m);I.position.set(_-17.1,t+5.5,S),I.rotation.y=-Math.PI/2,n.add(I)}const x=new V(new Ue(.18,.18,11),new K({color:13421772,roughness:.5,metalness:.5}));x.position.set(28,t+5.5,xt.halfLen-60),x.castShadow=!0,n.add(x);const d=new et;d.position.set(28,t+10.6,xt.halfLen-60);const g=lM(),y=new V(new $t(1.1,5.5,12,1,!0),new K({map:g,side:Jt,roughness:.8}));y.rotation.x=-Math.PI/2,y.position.z=2.9,d.add(y),d.name="windsock",n.add(d);const v=new V(new Ue(.5,.8,16),new K({color:7829367,roughness:.7}));v.position.set(-45,t+8,300),v.castShadow=!0,n.add(v);const M=new Bt(new Dt({map:u,color:6750088,transparent:!0,depthWrite:!1}));M.position.set(-45,t+16.6,300),M.scale.set(7,7,1),M.userData={blink:!0,rate:.8,duty:.12},n.add(M);const A=[12724778,2777026,14721056];[[70,110,.4],[95,200,-.3],[70,240,.2]].forEach(([_,S,D],I)=>{const P=rd(A[I]);P.position.set(_,t+.3,S),P.rotation.y=D,n.add(P)});const w=(_,S,D,I)=>{const P=new V(new he(_,.24,S),r);P.position.set(D,t+.1,I),P.receiveShadow=!0,n.add(P)},b=new V(new he(12,.28,xt.halfLen*2),s);b.position.set(65,t+.12,0),b.receiveShadow=!0,n.add(b);const T=new mt({color:14198816}),F=new V(new he(.4,.06,xt.halfLen*2-40),T);F.position.set(65,t+.3,0),n.add(F);for(const _ of[-400,0,400]){const S=new V(new he(80,.28,10),s);S.position.set(55,t+.12,_),S.receiveShadow=!0,n.add(S);const D=new V(new he(80,.06,.4),T);D.position.set(55,t+.3,_),n.add(D);for(const I of[26,28.5]){const P=new V(new he(.6,.06,9),T);P.position.set(I,t+.3,_),n.add(P)}}{const _=[];for(let I=-600;I<=xt.halfLen;I+=60)_.push([58,I],[72,I]);for(const I of[-400,0,400])for(let P=20;P<=95;P+=38)_.push([P,I-6],[P,I+6]);const S=new fi(new jt(.35,8,6),new mt({color:3828479}),_.length),D=new Ke;_.forEach(([I,P],O)=>{D.makeTranslation(I,t+.6,P),S.setMatrixAt(O,D)}),n.add(S)}for(const _ of[-1,1]){const S=_*xt.halfLen;for(let D=-3;D<=3;D++){const I=D*3.6,P=new V(new he(.9,.5,.5),new mt({color:2293572}));P.position.set(I,t+.5,S+_*2.5),n.add(P);const O=new V(new he(.9,.5,.5),new mt({color:16720418}));O.position.set(I,t+.5,S-_*2.5),n.add(O)}}for(let _=0;_<5;_++){const S=-700-_*100,D=Be(0,S),I=t+5,P=new V(new Ue(.25,.35,Math.max(1,I-D)),new K({color:6710886,roughness:.7}));P.position.set(0,(D+I)/2,S),n.add(P);const O=new V(new he(4,.5,.5),new mt({color:16777215}));O.position.set(0,I,S),n.add(O);const N=new Bt(new Dt({map:u,color:16777215,transparent:!0,depthWrite:!1}));N.position.set(0,I+1,S),N.scale.set(7,7,1),N.userData={blink:!0,rate:1,duty:.07,phase:(4-_)*.18},n.add(N)}w(48,26,150,-60);{const _=new K({color:14210248,roughness:.85}),S=new V(new he(38,9,16),_);S.position.set(150,t+4.5,-60),S.castShadow=S.receiveShadow=!0,n.add(S);const D=new K({color:1582127,roughness:.15,metalness:.5,emissive:16763514,emissiveIntensity:0});e.push(D);const I=new V(new he(36,3.4,.4),D);I.position.set(150,t+5.2,-60-8.1),n.add(I);const P=I.clone();P.position.set(150,t+5.2,-60+8.1),n.add(P);const O=new V(new he(40,.7,18),new K({color:3820122,roughness:.8}));O.position.set(150,t+9.3,-60),O.castShadow=!0,n.add(O);for(const te of[138,162]){const ne=new V(new Ue(.3,.3,4.4),new K({color:13421772,metalness:.5,roughness:.4}));ne.position.set(te,t+2.2,-71),n.add(ne)}const N=new V(new he(30,.4,7),new K({color:2776970,roughness:.6}));N.position.set(150,t+4.5,-60-11.5),N.castShadow=!0,n.add(N);const W=new V(new Ct(30,4),new mt({map:If("HARBORVIEW • KHVR"),transparent:!1}));W.position.set(150-19.2,t+6.5,-60),W.rotation.y=-Math.PI/2,n.add(W);const z=new Bt(new Dt({map:u,color:12573183,transparent:!0,depthWrite:!1}));z.position.set(150,t+10,-60),z.scale.set(26,14,1),z.userData={nightLamp:!0},n.add(z)}w(18,18,qt.x,qt.z);{const _=new V(new he(7,26,7),new K({color:12106946,roughness:.85}));_.position.set(qt.x,t+13,qt.z),_.castShadow=!0,n.add(_);const S=new K({color:1055784,roughness:.1,metalness:.6,emissive:16767392,emissiveIntensity:0});e.push(S);const D=new V(new he(10.5,3.6,10.5),S);D.position.set(qt.x,t+27.5,qt.z),D.castShadow=!0,n.add(D);const I=new V(new he(10.7,.5,10.7),new K({color:2237996,roughness:.6}));I.position.set(qt.x,t+29.4,qt.z),n.add(I);const P=new V(new he(11.5,.7,11.5),new K({color:9054762,roughness:.7}));P.position.set(qt.x,t+30,qt.z),P.castShadow=!0,n.add(P);const O=new V(new Ue(.12,.2,9),new K({color:4473924,roughness:.6}));O.position.set(qt.x,t+34.5,qt.z),n.add(O);const N=new Bt(new Dt({map:u,color:16724787,transparent:!0,depthWrite:!1}));N.position.set(qt.x,t+39.2,qt.z),N.scale.set(5,5,1),N.userData={blink:!0,rate:.7,duty:.15},n.add(N);const W=new Bt(new Dt({map:u,color:16767392,transparent:!0,depthWrite:!1}));W.position.set(qt.x,t+27.5,qt.z),W.scale.set(14,8,1),W.userData={nightLamp:!0},n.add(W)}for(const[_,S]of[[170,-200],[170,-280]]){const D=new V(new Ue(11,11,30,18,1,!1,0,Math.PI),p);D.rotation.z=Math.PI/2,D.rotation.y=Math.PI/2,D.position.set(_,t+.2,S),D.castShadow=D.receiveShadow=!0,n.add(D);const I=new V(new Ct(20,9),m);I.position.set(_-15.1,t+4.5,S),I.rotation.y=-Math.PI/2,n.add(I)}{const _=new K({color:14198816,roughness:.8}),S=[2787914,15263976,9054762];[[-60,140],[-60,210],[-60,280]].forEach(([D,I],P)=>{const O=Be(D,I),N=new V(new he(14,.3,10),_);N.position.set(D,O+.15,I),N.receiveShadow=!0,n.add(N);const W=rd(S[P]);W.position.set(D,O+.3,I),W.rotation.y=.15*(P-1),n.add(W)})}w(26,16,190,300);{const _=new K({color:15263976,roughness:.4,metalness:.3});for(const I of[-4,4]){const P=new V(new Ue(3,3,10,16),_);P.rotation.z=Math.PI/2,P.position.set(190,t+3.4,300+I),P.castShadow=!0,n.add(P)}new K({color:12763842,roughness:.5});const S=new V(new he(2.4,2.2,2.6),new K({color:12724778,roughness:.5}));S.position.set(182,t+1.4,306),S.castShadow=!0;const D=new V(new Ue(1.3,1.3,5.5,12),_);D.rotation.x=Math.PI/2,D.position.set(182,t+1.6,301),D.castShadow=!0,n.add(S,D)}w(22,16,100,-260);{const _=new V(new he(16,6,10),new K({color:11022898,roughness:.8}));_.position.set(100,t+3,-260),_.castShadow=_.receiveShadow=!0,n.add(_);const S=new V(new Ct(11,4.4),new K({color:14540253,roughness:.5,metalness:.4}));S.position.set(100-8.1,t+2.4,-260),S.rotation.y=-Math.PI/2,n.add(S);const D=new K({color:14169397,roughness:.45}),I=new V(new he(3,2.4,8),D);I.position.set(88,t+1.5,-252),I.castShadow=!0;const P=new V(new he(1.6,.35,.6),new mt({color:16720418}));P.position.set(88,t+2.9,-252),P.userData={blink:!0,rate:2.2,duty:.5},n.add(I,P)}i.add(n)}function rd(i){const e=new et,t=new K({color:i,roughness:.4,metalness:.2}),n=new K({color:15922422,roughness:.4,metalness:.1}),s=new V(new Ue(.8,.5,7,10),n);s.rotation.x=Math.PI/2,s.position.y=1.2,e.add(s);const r=new V(new he(10.5,.16,1.5),t);r.position.set(0,2.1,-.4),e.add(r);const o=new V(new he(3.2,.12,1),n);o.position.set(0,1.5,3.3),e.add(o);const a=new V(new he(.12,1.6,1.2),t);return a.position.set(0,2.2,3.3),e.add(a),e.traverse(c=>{c.isMesh&&(c.castShadow=!0)}),e}function rM(i){const e=xi(1337),t=[],n=[],s=[];let r=0;const o=8e3;for(;t.length+n.length+s.length<o&&r++<3e5;){const u=(e()*2-1)*16e3,p=(e()*2-1)*16e3,m=Be(u,p);if(m<3||m>160||Math.abs(u)<260&&Math.abs(p)<1050||u>0&&u<220&&p>0&&p<340||u>20&&u<280&&p>-500&&p<500||Math.abs(u-zt.x)<200&&Math.abs(p-zt.z)<500||Math.abs(u-Zt.x)<200&&Math.abs(p-Zt.z)<500||Math.abs(u-ri.x)<120&&Math.abs(p-ri.z)<300||Math.abs(u-oi.x)<130&&Math.abs(p-oi.z)<320||Math.abs(u-ai.x)<140&&Math.abs(p-ai.z)<350||Math.abs(u-ci.x)<110&&Math.abs(p-ci.z)<280||Math.hypot(u+330,p-860)<320||Math.hypot(u-8500,p-7500)<420||Math.abs(Be(u+10,p)-m)+Math.abs(Be(u,p+10)-m)>14)continue;const d=.7+e()*.9,g=e()*Math.PI*2,y={x:u,h:m,z:p,s:d,r:g};m<6&&e()<.6?s.push(y):m>60||m>25&&e()<.5?t.push(y):n.push(y)}const a=new Ke,c=new fn,l=new yn,h=new U,f=new U;{const u=new Ue(.2,.45,5,6),p=new K({color:4861984,roughness:1}),m=new fi(u,p,t.length),x=[new K({color:1718808,roughness:1}),new K({color:1983008,roughness:1}),new K({color:2247204,roughness:1})],g=[new $t(3,4.5,7),new $t(2.2,3.8,7),new $t(1.4,3,7)].map((y,v)=>new fi(y,x[v],t.length));t.forEach((y,v)=>{l.set(0,y.r,0),c.setFromEuler(l),h.set(y.x,y.h+2.5*y.s,y.z),f.set(y.s,y.s,y.s),a.compose(h,c,f),m.setMatrixAt(v,a);const M=y.h+4*y.s;[[0,4.5,3],[.3,3.8,2.2],[.15,3,1.4]].forEach(([w,b,T],F)=>{h.set(y.x,M+(w+b*.5)*y.s+F*1.8*y.s,y.z),f.set(y.s,y.s,y.s),a.compose(h,c,f),g[F].setMatrixAt(v,a)})}),m.castShadow=!0,g.forEach(y=>{y.castShadow=y.receiveShadow=!0}),i.add(m,...g)}{const u=new Ue(.3,.55,4.5,6),p=new K({color:5913118,roughness:1}),m=new fi(u,p,n.length),x=new K({color:2775586,roughness:1}),d=new K({color:3439146,roughness:1}),g=new jt(3.2,8,6),y=new jt(2.6,8,6),v=new fi(g,x,n.length),M=new fi(y,d,n.length);n.forEach((A,w)=>{l.set(0,A.r,0),c.setFromEuler(l),h.set(A.x,A.h+2.25*A.s,A.z),f.set(A.s,A.s,A.s),a.compose(h,c,f),m.setMatrixAt(w,a),h.set(A.x,A.h+(4.5+2)*A.s,A.z),f.set(A.s*1.1,A.s*.9,A.s*1.1),a.compose(h,c,f),v.setMatrixAt(w,a);const b=Math.sin(A.r*3)*1.2*A.s,T=Math.cos(A.r*3)*1.2*A.s;h.set(A.x+b,A.h+(4.5+2.8)*A.s,A.z+T),f.set(A.s*.8,A.s*.7,A.s*.8),a.compose(h,c,f),M.setMatrixAt(w,a)}),m.castShadow=!0,v.castShadow=v.receiveShadow=!0,M.castShadow=M.receiveShadow=!0,i.add(m,v,M)}{const u=new Ue(.18,.3,8,6),p=new K({color:6967344,roughness:1}),m=new fi(u,p,s.length),x=new Ct(1.2,5.5);x.translate(0,2.75,0);const d=new K({color:2783778,roughness:.9,side:Jt}),g=new fi(x,d,s.length*6);s.forEach((y,v)=>{l.set(0,y.r,0),c.setFromEuler(l),h.set(y.x,y.h+4*y.s,y.z),f.set(y.s,y.s,y.s),a.compose(h,c,f),m.setMatrixAt(v,a);const M=y.h+8*y.s;for(let A=0;A<6;A++){const w=y.r+A/6*Math.PI*2,b=.5+e()*.3,T=new fn;T.setFromEuler(new yn(-b,w,0)),h.set(y.x,M,y.z),f.set(y.s*(.8+e()*.4),y.s,y.s*(.8+e()*.4)),a.compose(h,T,f),g.setMatrixAt(v*6+A,a)}}),m.castShadow=!0,g.castShadow=g.receiveShadow=!0,i.add(m,g)}return{count:t.length+n.length+s.length}}function oM(i){const e=cM(),t=xi(77),n=new et;for(let s=0;s<40;s++){const r=new et,o=4+Math.floor(t()*3);for(let l=0;l<o;l++){const h=.82+t()*.18,f=new Bt(new Dt({map:e,transparent:!0,opacity:.8,depthWrite:!1,color:new ke(h,h,h*1.02)}));f.position.set((t()-.5)*420,(t()-.5)*60,(t()-.5)*180);const u=220+t()*260;f.scale.set(u,u*.5,1),r.add(f)}const a=t()*Math.PI*2,c=1500+t()*15e3;r.position.set(Math.cos(a)*c,520+t()*650,Math.sin(a)*c),n.add(r)}return i.add(n),n}function aM(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d"),t=e.createImageData(256,256),n=xi(9);for(let r=0;r<t.data.length;r+=4){const o=228+Math.floor(n()*28);t.data[r]=t.data[r+1]=t.data[r+2]=o,t.data[r+3]=255}e.putImageData(t,0,0);const s=new pn(i);return s.wrapS=s.wrapT=ls,s.repeat.set(300,300),s}function cM(){const i=document.createElement("canvas");i.width=i.height=128;const e=i.getContext("2d"),t=xi(5);for(let n=0;n<46;n++){const s=24+t()*80,r=46+t()*36,o=10+t()*22,a=e.createRadialGradient(s,r,0,s,r,o);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=a,e.beginPath(),e.arc(s,r,o,0,7),e.fill()}return new pn(i)}function ws(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,0.6)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new pn(i)}function lM(){const i=document.createElement("canvas");i.width=128,i.height=16;const e=i.getContext("2d");for(let n=0;n<6;n++)e.fillStyle=n%2?"#e8641e":"#f2f2f2",e.fillRect(n*22,0,22,16);const t=new pn(i);return t.wrapS=ls,t}function hM(i,e){const t=document.createElement("canvas");t.width=128,t.height=192;const n=t.getContext("2d");n.clearRect(0,0,128,192),n.fillStyle="#f2f2f2",n.font=`bold ${e}px monospace`,n.textAlign="center",n.textBaseline="middle",n.fillText(i[0],64,52),n.fillText(i[1],64,140);const s=new pn(t);return s.anisotropy=4,s}function If(i){const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");t.fillStyle="#14202e",t.fillRect(0,0,512,128),t.strokeStyle="#ffb020",t.lineWidth=8,t.strokeRect(6,6,500,116),t.fillStyle="#ffd97a",t.textAlign="center",t.textBaseline="middle";let n=64;for(t.font=`bold ${n}px Arial`;t.measureText(i).width>470&&n>20;)n-=4,t.font=`bold ${n}px Arial`;t.fillText(i,256,66);const s=new pn(e);return s.anisotropy=4,s}function Lc(i,e,t,n,s,r,o){const a=e.length,c=[],l=[];for(let u=0;u<a;u++){const[p,m]=e[u],[x,d]=e[(u+1)%a],[g,y]=e[(u-1+a)%a];let v=x-g,M=d-y;const A=Math.hypot(v,M)||1;v/=A,M/=A;const w=-M,b=v,T=p+w*n,F=m+b*n,_=T+w*s/2,S=F+b*s/2,D=T-w*s/2,I=F-b*s/2;if(c.push(_,Be(_,S)+r,S,D,Be(D,I)+r,I),t||u<a-1){const P=u*2,O=u*2+1,N=(u+1)%a*2,W=(u+1)%a*2+1;l.push(P,O,N,O,W,N)}}const h=new kt;h.setAttribute("position",new _t(c,3)),h.setIndex(l),h.computeVertexNormals();const f=new V(h,o);f.receiveShadow=!0,i.add(f)}function Jo(i,e,t,n=!0){const s=[],r=e.length,o=n?r:r-1;for(let v=0;v<o;v++){const[M,A]=e[v],[w,b]=e[(v+1)%r],T=Math.hypot(w-M,b-A),F=Math.max(2,Math.round(T/12));for(let _=0;_<F;_++){const S=_/F;s.push([M+(w-M)*S,A+(b-A)*S])}}const a=new K({color:3356220,roughness:1}),c=new K({color:10133670,roughness:.95});Lc(i,s,n,0,t,.18,a),Lc(i,s,n,t/2+.6,1.1,.32,c),Lc(i,s,n,-t/2-.6,1.1,.32,c);const l=new he(.35,.06,3),h=new mt({color:14211280}),f=[];for(let v=0;v<s.length;v+=2)f.push(s[v]);const u=new fi(l,h,f.length),p=new Ke,m=new fn,x=new yn,d=new U,g=new U(1,1,1);f.forEach(([v,M],A)=>{const[w,b]=f[(A+1)%f.length];x.set(0,Math.atan2(w-v,b-M),0),m.setFromEuler(x),d.set(v,Be(v,M)+.24,M),p.compose(d,m,g),u.setMatrixAt(A,p)}),i.add(u);const y=[];for(let v=0;v<s.length;v+=2)y.push({x:s[v][0],z:s[v][1]});return y}function uM(i){const e=new et,t=xi(4242),n=[],s=[],r=[],o=[15260864,14213864,15255736,13162680,14733544,15788240],a=[9059114,3824250,5921370,7031338],c=o.map(v=>new K({color:v,roughness:.9})),l=a.map(v=>new K({color:v,roughness:.9})),h=new K({color:1053980,roughness:.15,metalness:.6,emissive:16763514,emissiveIntensity:0});s.push(h);const f=new K({color:4862496,roughness:.9}),u=(v,M,A=1)=>{const w=Be(v,M);if(w<3)return!1;const b=(7+t()*5)*A,T=(6+t()*4)*A,F=3.5+t()*2,_=new V(new he(b,F,T),c[Math.floor(t()*6)]);_.position.set(v,w+F/2-.4,M),_.rotation.y=t()*Math.PI,_.castShadow=_.receiveShadow=!0,e.add(_);for(const P of[-1,1])for(const O of[-.22,.22]){const N=new V(new Ct(1.1,1.1),h);N.position.set(O*b,.3,P*(T/2+.03)),P<0&&(N.rotation.y=Math.PI),_.add(N);const W=mat(4876858+Math.floor(t()*2105376)&16777215,.9);for(const z of[-.7,.7]){const te=new V(new he(.25,1.2,.06),W);te.position.set(O*b+z,.3,P*(T/2+.05)),P<0&&(te.rotation.y=Math.PI),_.add(te)}}const S=new V(new he(1.1,2.2,.1),f);if(S.position.set(0,-F/2+1.1,T/2+.03),_.add(S),t()<.7){const P=b*.35+1,O=new V(new he(P,.15,1.8),mat(9075304,.9));O.position.set(0,-F/2+2.4,T/2+.9),O.castShadow=!0,_.add(O);for(const N of[-P/2+.15,P/2-.15]){const W=new V(new Ue(.08,.08,2.5,6),mat(6969928,.9));W.position.set(N,-F/2+1.25,T/2+1.7),_.add(W)}}const D=new V(new he(.7,2.2,.7),new K({color:9076856,roughness:.9}));D.position.set(b/4,F/2+.8,0),D.castShadow=!0,_.add(D);const I=t();if(I<.5){const P=Math.max(b,T)*.55,O=2.2+t()*.8;for(const N of[-1,1]){const W=new V(new Ct(P,O+.4),l[Math.floor(t()*4)]);W.position.set(0,F/2+O*.35,N*T*.28),W.rotation.x=N*.52,W.castShadow=!0,_.add(W)}}else if(I<.8){const P=new V(new $t(Math.max(b,T)*.75,2.6,4),l[Math.floor(t()*4)]);P.position.set(v,w+F+.9,M),P.rotation.y=Math.PI/4,P.castShadow=!0,e.add(P)}else{const P=new V(new he(b+.4,.3,T+.4),mat(6974058,.9));P.position.set(v,w+F-.25,M),P.castShadow=!0,e.add(P);const O=new V(new he(1.2,.8,1.2),mat(8947848,.8));O.position.set(v+b*.2,w+F+.15,M+T*.2),O.castShadow=!0,e.add(O)}return!0},p=(v,M,A,w,b)=>{let T=0,F=0;for(;T<b&&F++<400;){const _=v+t()*(M-v),S=A+t()*(w-A),D=Be(_,S);D<4||Math.abs(Be(_+12,S)-D)+Math.abs(Be(_,S+12)-D)>18||u(_,S)&&T++}};p(-140,60,760,1020,9),p(8380,8620,7380,7620,14);const m=(v,M,A,w)=>{const b=Be(v,M),T=13+t()*3,F=10+t()*2,_=5.5+t()*1.5,S=new V(new he(T,_,F),new K({color:w,roughness:.8}));S.position.set(v,b+_/2-.3,M),S.castShadow=S.receiveShadow=!0,e.add(S);const D=new V(new he(T+1.2,.6,F+1.2),new K({color:1846336,roughness:.8}));D.position.set(v,b+_+.1,M),D.castShadow=!0,e.add(D);const I=new V(new he(10,2.5,.4),new K({color:1710634,roughness:.6}));I.position.set(v,b+_-1.3,M-F/2-.25),I.castShadow=!0,e.add(I);const P=new V(new Ct(10,2.5),new mt({map:If(A),transparent:!1}));P.position.set(v,b+_-1.3,M-F/2-.05),P.rotation.y=Math.PI,e.add(P);const O=[13382451,3368618,2263108,11167266,8926122],N=mat(O[Math.floor(t()*5)],.9),W=new V(new he(T*.9,.1,2.2),N);W.position.set(v,b+_-.6,M-F/2-1.1),W.rotation.x=.15,W.castShadow=!0,e.add(W);const z=new K({color:657940,roughness:.1,metalness:.7});for(const ne of[-T*.25,T*.25]){const ce=new V(new he(T*.3,_*.5,.08),z);ce.position.set(v+ne,b+_*.25,M-F/2+.05),e.add(ce)}const te=new Bt(new Dt({map:ws(),color:16767354,transparent:!0,depthWrite:!1}));te.position.set(v,b+_+.8,M-F/2-1.5),te.scale.set(6,6,1),te.userData.night=!0,e.add(te),n.push(te)};m(jo.x,jo.z,"PILOT SHOP",3033704),m(122,-30,"AIRPORT SUPPLY",7031434),m(8420,7410,"BEACH GEAR",2787962),m(-6940,1560,"CITY PILOT SUPPLY",9054778),m(-1150,-5240,"GENERAL STORE",8020552),m(2590,2050,"BAIT & TACKLE",4877194);{const v=jo.x,M=jo.z,A=Be(v,M),w=new V(new he(1,2,.7),new K({color:12724778,roughness:.5}));w.position.set(v+8,A+1,M-2),w.castShadow=!0,e.add(w)}{const v=[14764875,4947425,14787659,4968842,14777032];[[7260,6410],[7220,6380],[7180,6350],[7300,6430],[7130,6310]].forEach(([P,O],N)=>{const W=Be(P,O);if(W<.4||W>9)return;const z=new V(new Ue(.08,.08,3),new K({color:15658734}));z.position.set(P,W+1.5,O),e.add(z);const te=new V(new $t(2.2,1.2,8),new K({color:v[N%v.length],roughness:.8}));te.position.set(P,W+3.2,O),te.castShadow=!0,e.add(te)});const A=7225,w=6378,b=-.75,T=-.66,F=100,_=new K({color:9071432,roughness:.9}),S=new V(new he(7,.5,F),_),D=A+b*F,I=w+T*F;S.position.set((A+D)/2,5.6,(w+I)/2),S.rotation.y=Math.atan2(b,T),S.castShadow=S.receiveShadow=!0,e.add(S);for(let P=0;P<=F;P+=12){const O=A+b*P,N=w+T*P,W=Math.max(Be(O,N),-8),z=new V(new Ue(.25,.25,5.6-W),new K({color:5916210}));z.position.set(O,(5.6+W)/2,N),e.add(z)}}const x=ws(),d=v=>{for(let M=0;M<v.length;M+=6){const A=v[M],w=Be(A.x,A.z);if(w<2)continue;const b=new V(new Ue(.12,.16,7),new K({color:3817285,roughness:.7}));b.position.set(A.x+4.5,w+3.5,A.z),b.castShadow=!0,e.add(b);const T=new Bt(new Dt({map:x,color:16767392,transparent:!0,depthWrite:!1}));T.position.set(A.x+4.5,w+7.2,A.z),T.scale.set(7,7,1),T.userData.night=!0,e.add(T),n.push(T)}},g=[[-480,740],[-180,740],[-180,980],[-480,980]],y=[[8350,7350],[8650,7350],[8650,7650],[8350,7650]];for(const v of[g,y]){const M=Jo(e,v,6);r.push(M),d(M)}{const{x:v,z:M,halfLen:A,halfWid:w,elev:b}=Zt,T=new V(new he(w*2,.25,A*2),new K({color:4483888,roughness:1}));T.position.set(v,b+.1,M),T.receiveShadow=!0,e.add(T);const F=new K({color:15790320,roughness:.9});for(let S=-A;S<=A;S+=56)for(const D of[-w-2,w+2]){const I=new V(new Ue(.7,.7,.5,10),F);I.position.set(v+D,b+.4,M+S),e.add(I)}const _=new V(new he(5,3,4),new K({color:8020552,roughness:.9}));_.position.set(v+20,b+1.5,M+30),_.castShadow=!0,e.add(_)}p(-1350,-1050,-5450,-5150,8);{const A=Be(-1200,-5300),w=new V(new he(7,4.5,10),new K({color:15920608,roughness:.9}));w.position.set(-1200,A+2.2-.3,-5300),w.castShadow=w.receiveShadow=!0,e.add(w);const b=new V(new he(2.4,7,2.4),new K({color:15920608,roughness:.9}));b.position.set(-1200,A+5.5,-5300-5.5),b.castShadow=!0,e.add(b)}p(2500,2740,1960,2200,8);{const v=xi(31337);for(let M=0;M<3;M++){const A=2560+v()*120,w=2020+v()*120,b=Be(A,w);if(b<1)continue;const T=new et,F=new V(new he(1.4,.6,3.4),new K({color:[2777026,12763842,14721056][M],roughness:.8}));F.castShadow=!0,T.add(F),T.position.set(A,b+.35,w),T.rotation.y=v()*Math.PI,M===1&&(T.rotation.z=Math.PI),e.add(T)}}{const b=document.createElement("canvas");b.width=64,b.height=128;const T=document.createElement("canvas");T.width=64,T.height=128;const F=b.getContext("2d"),_=T.getContext("2d"),S=xi(777);F.fillStyle="#c9d1d8",F.fillRect(0,0,64,128),_.fillStyle="#000000",_.fillRect(0,0,64,128);for(let j=0;j<16;j++)for(let $=0;$<6;$++){const se=4+$*10,pe=4+j*7.6;F.fillStyle="#232c38",F.fillRect(se,pe,7,4.6),S()<.35&&(_.fillStyle="#ffd97a",_.fillRect(se,pe,7,4.6))}const D=new K({map:new pn(b),emissiveMap:new pn(T),emissive:16777215,emissiveIntensity:0,roughness:.75});s.push(D);const I=new Ke,P=new fn,O=new yn,N=new U,W=new U;new ke,new K({color:10132128,roughness:.8});const z=new K({color:1714746,roughness:.15,metalness:.6});new K({color:660512,roughness:.1,metalness:.7});const te=new K({color:8026746,roughness:.7}),ne=new K({color:3816010,roughness:.5});let ce=0;for(let j=-2;j<=2&&ce<25;j++)for(let $=-2;$<=2&&ce<25;$++){if(Math.abs(j)<1&&Math.abs($)<1)continue;const se=-7e3+j*62+(S()-.5)*10,pe=1500+$*62+(S()-.5)*10,me=Be(se,pe);if(me<4)continue;const L=Math.hypot(j,$),E=Math.max(22,72-L*14+S()*14),G=20+S()*8,Q=20+S()*8,re=S()<.5?0:Math.PI/2;O.set(0,re,0),P.setFromEuler(O);const Z=E*.6;N.set(se,me+Z/2-2,pe),W.set(G,Z,Q),I.compose(N,P,W);const we=new V(new he(G,Z,Q),D);if(we.position.set(se,me+Z/2-2,pe),we.rotation.y=re,we.castShadow=we.receiveShadow=!0,e.add(we),E>35){const Me=G*(.55+S()*.15),Xe=Q*(.55+S()*.15),ue=E*.35,Te=me+Z-2,Ge=new V(new he(Me,ue,Xe),D);Ge.position.set(se,Te+ue/2,pe),Ge.rotation.y=re,Ge.castShadow=Ge.receiveShadow=!0,e.add(Ge)}const ye=me+E-2;for(let Me=0;Me<2+Math.floor(S()*3);Me++){const Xe=new V(new he(1.2+S(),.7,1.2+S()),te);Xe.position.set(se+(S()-.5)*G*.5,ye+.35,pe+(S()-.5)*Q*.5),Xe.castShadow=!0,e.add(Xe)}if(E>50&&S()<.6){const Me=new V(new Ue(.08,.12,E*.2,6),ne);Me.position.set(se,ye+E*.1,pe),Me.castShadow=!0,e.add(Me);const Xe=new Bt(new Dt({map:ws(),color:16720418,transparent:!0,depthWrite:!1}));Xe.position.set(se,ye+E*.2,pe),Xe.scale.set(4,4,1),Xe.userData={blink:!0,rate:.7,duty:.15},e.add(Xe)}if(S()<.5){const Me=G*(.3+S()*.3),Xe=new V(new he(Me,Z*.8,.15),z);Xe.position.set(se,me+Z*.4-2,pe-Q/2-.1),Xe.rotation.y=re,e.add(Xe)}ce++}const Ae=Be(-7e3,1500),Le=new V(new Rs(46,24),new K({color:3037736,roughness:1}));Le.rotation.x=-Math.PI/2,Le.position.set(-7e3,Ae+.4,1500),Le.receiveShadow=!0,e.add(Le);const X=new V(new Rs(12,20),new K({color:2779802,roughness:.2,metalness:.4}));X.rotation.x=-Math.PI/2,X.position.set(-6988,Ae+.55,1508),e.add(X);const ae=new V(new Ue(4,6,92,12),new K({color:9081760,roughness:.5,metalness:.4}));ae.position.set(-7040,Ae+46,1470),ae.castShadow=!0,e.add(ae);const ge=new Bt(new Dt({map:ws(),color:16729156,transparent:!0,depthWrite:!1}));ge.position.set(-7040,Ae+93,1470),ge.scale.set(9,9,1),ge.userData={blink:!0,rate:.7,duty:.15},e.add(ge),p(-7450,-6550,1700,1950,8),p(-7450,-6550,1050,1300,8);const ee=[];for(const j of[-7150,-7e3,-6850])ee.push(Jo(e,[[j,1050],[j,1950]],7,!1));for(const j of[1350,1500,1650])ee.push(Jo(e,[[-7450,j],[-6550,j]],7,!1));ee.forEach(d);const xe=[[-7380,1120],[-6620,1120],[-6620,1880],[-7380,1880]];r.push(Jo(e,xe,7));const de=[];for(let j=0;j<2;j++){const $={r:new K({color:3342336,emissive:16720418,emissiveIntensity:.1}),y:new K({color:3351040,emissive:16759586,emissiveIntensity:.1}),g:new K({color:13056,emissive:2293572,emissiveIntensity:.1})};de.push($)}[[-7e3,1350],[-6850,1500]].forEach(([j,$],se)=>{const pe=Be(j,$),me=new V(new Ue(.15,.2,6.5),new K({color:2764083,roughness:.7}));me.position.set(j+5,pe+3.2,$+5),me.castShadow=!0,e.add(me);const L=new V(new he(1,2.6,1),new K({color:1118740,roughness:.6}));L.position.set(j+5,pe+7,$+5),e.add(L);const E=de[se%2],G=[[E.r,.85],[E.y,0],[E.g,-.85]];for(const[re,Z]of G){const we=new V(new jt(.32,10,8),re);we.position.set(j+5,pe+7+Z,$+4.45),e.add(we)}const Q=new et;Q.userData.tlCycle={mats:E,off:se*7},Q.position.set(j,pe,$),e.add(Q)});const Re=[3828418,15263976,2764083,12728890];[[-6930,1420,.3],[-7070,1580,-.2],[-300,800,.9],[8450,7420,1.8]].forEach(([j,$,se],pe)=>{const me=new et,L=new K({color:Re[pe%4],roughness:.4,metalness:.3}),E=new V(new he(2,.9,4.2),L);E.position.y=.85,E.castShadow=!0;const G=new V(new he(1.7,.65,2.1),new K({color:1053980,roughness:.1,metalness:.8}));G.position.set(0,1.5,-.2),me.add(E,G);const Q=new Ue(.42,.42,.35,10),re=new K({color:1315860,roughness:.9});for(const[we,ye]of[[-.95,1.4],[.95,1.4],[-.95,-1.4],[.95,-1.4]]){const Me=new V(Q,re);Me.rotation.z=Math.PI/2,Me.position.set(we,.42,ye),me.add(Me)}const Z=Be(j,$);me.position.set(j,Z<1?1:Z+.15,$),me.rotation.y=se,e.add(me)});const He=new et,ie=new V(new he(16,7,55),new K({color:8003616,roughness:.6}));ie.position.y=1,ie.castShadow=!0;const C=new V(new he(12,9,8),new K({color:15263976,roughness:.6}));C.position.set(0,8,-20),C.castShadow=!0,He.add(ie,C);const le=[12728890,3828418,3843669,14721056];for(let j=0;j<8;j++){const $=new V(new he(3.4,3,5),new K({color:le[j%4],roughness:.7}));$.position.set(j%2?-4:4,6,2+Math.floor(j/2)*6),He.add($)}He.position.set(-4880,.5,1040),He.rotation.y=.4,e.add(He)}return i.add(e),{nightGlows:n,nightMats:s,roadLoops:r}}const hs=[{name:"Coral Strip",blurb:"a 600 m grass strip on the south-east island — landable!",x:zt.x,z:zt.z,r:420},{name:"Harborview",blurb:"hillside town in the west valley",x:-330,z:860,r:380},{name:"Harborview Strip",blurb:"a short grass strip near the harbor town",x:ri.x,z:ri.z,r:280},{name:"Lighthouse Point",blurb:"the rotating beacon on the north cape",x:150,z:-1450,r:320},{name:"Lighthouse Strip",blurb:"a tiny grass strip by the lighthouse",x:ci.x,z:ci.z,r:240},{name:"Sailboat Marina",blurb:"floating docks off the south-west coast",x:-2132,z:2251,r:380},{name:"Wind Farm",blurb:"three turbines on the east ridge",x:1400,z:-500,r:320},{name:"Summit Lookout",blurb:"fire tower on the 300 m peak",x:1800,z:-600,r:280},{name:"Seabreeze",blurb:"resort town on the north-east island",x:8500,z:7500,r:480},{name:"Seabreeze Strip",blurb:"a grass strip near the beach resort",x:oi.x,z:oi.z,r:300},{name:"North Strip",blurb:"a lonely grass strip on the north island",x:Zt.x,z:Zt.z,r:420},{name:"Aurora City",blurb:"the big city on the west island",x:-7e3,z:1500,r:700},{name:"City Strip",blurb:"a grass landing strip on the edge of the city",x:ai.x,z:ai.z,r:340},{name:"Northville",blurb:"hamlet by the North Strip",x:-1200,z:-5300,r:300},{name:"Coral Bay",blurb:"fishing village on the coral shore",x:2620,z:2080,r:300},{name:"Shipwreck Cove",blurb:"a wreck rotting in the shallows SE of Coral",x:3150,z:2550,r:320},{name:"Observatory",blurb:"star dome on the east peak",x:7400,z:-2400,r:320},{name:"Ember Isle",blurb:"a smoking volcano far to the south",x:3e3,z:13e3,r:600}];function dM(i){const e=xi(2024),t=new et,n=(m,x,d,g,y,v=0)=>{const M=new V(m,x);return M.position.set(d,g,y),M.rotation.y=v,M.castShadow=M.receiveShadow=!0,t.add(M),M};{const{x:m,z:x,halfLen:d,halfWid:g,elev:y}=zt,v=n(new he(g*2,.25,d*2),new K({color:4025135,roughness:1}),m,y+.1,x);v.castShadow=!1;const M=new K({color:15790320,roughness:.9});for(let b=-d;b<=d;b+=60)for(const T of[-g-2,g+2]){const F=new V(new Ue(.7,.7,.5,10),M);F.position.set(m+T,y+.4,x+b),t.add(F)}n(new he(6,3.4,5),new K({color:9071432,roughness:.9}),m+22,y+1.7,x+40);const A=n(new $t(4.8,2,4),new K({color:5913384,roughness:.9}),m+22,y+4.3,x+40,Math.PI/4);A.castShadow=!0;const w=n(new Ue(.15,.15,9),new K({color:13421772}),m-18,y+4.5,x-d+30);w.castShadow=!0}for(const m of Pf){const{x,z:d,halfLen:g,halfWid:y,elev:v}=m,M=n(new he(y*2,.22,g*2),new K({color:4880954,roughness:1}),x,v+.1,d);M.castShadow=!1;const A=new K({color:15658734,roughness:.7});for(const T of[-g+5,g-5])for(const F of[-y-1.5,y+1.5]){const _=new V(new Ue(.12,.12,1.8,6),A);_.position.set(x+F,v+.9,d+T),t.add(_)}const w=n(new Ue(.1,.12,6),new K({color:12303291}),x,v+3,d-g-6);w.castShadow=!0;const b=new V(new $t(.5,2.5,8),new K({color:16738850,roughness:.9}));b.position.set(x,v+5.5,d-g-6),b.rotation.z=Math.PI/2,b.castShadow=!0,t.add(b),n(new he(4,2.6,3.5),new K({color:8022616,roughness:.9}),x+y+8,v+1.3,d)}{const m=[15260864,14213864,15255736,13162680,14733544,15788240],x=[9059114,3824250,5921370,7031338];let d=0,g=0;for(;d<16&&g++<600;){const F=-480+e()*320,_=720+e()*280,S=Be(F,_);if(S<4||Math.abs(Be(F+12,_)-S)+Math.abs(Be(F,_+12)-S)>16)continue;const I=7+e()*5,P=6+e()*4,O=3.5+e()*2;n(new he(I,O,P),new K({color:m[d%m.length],roughness:.9}),F,S+O/2-.4,_,e()*Math.PI);const N=new V(new $t(Math.max(I,P)*.75,2.6,4),new K({color:x[d%x.length],roughness:.9}));N.position.set(F,S+O+.9,_),N.rotation.y=Math.PI/4+e()*.2,N.castShadow=!0,t.add(N),d++}const y=-330,v=860,M=Be(y,v);n(new he(10,6,14),new K({color:15920608,roughness:.9}),y,M+3-.4,v),n(new he(3.4,12,3.4),new K({color:15920608,roughness:.9}),y,M+6-.4,v-8);const A=new V(new $t(2.6,6,4),new K({color:3820122,roughness:.8}));A.position.set(y,M+15-.4,v-8),A.rotation.y=Math.PI/4,A.castShadow=!0,t.add(A);const w=-240,b=790,T=Be(w,b);for(const[F,_]of[[-2,-2],[2,-2],[-2,2],[2,2]])n(new Ue(.25,.25,14),new K({color:7829367}),w+F,T+7,b+_);n(new jt(4,14,10),new K({color:10139852,roughness:.6,metalness:.3}),w,T+16,b)}{const d=Be(150,-1450),g=document.createElement("canvas");g.width=16,g.height=128;const y=g.getContext("2d");for(let T=0;T<8;T++)y.fillStyle=T%2?"#c22":"#eee",y.fillRect(0,T*16,16,16);const v=new pn(g),M=n(new Ue(3.2,4.2,26,14),new K({map:v,roughness:.7}),150,d+13,-1450);M.castShadow=!0,n(new Ue(3.6,3.6,2.4,14),new K({color:2238e3,roughness:.5,metalness:.4}),150,d+27,-1450);const A=new Bt(new Dt({map:ws(),color:16773808,transparent:!0,depthWrite:!1}));A.position.set(150,d+27.5,-1450),A.scale.set(10,10,1),A.userData={blink:!0,rate:.5,duty:.5,dim:!0},t.add(A);const w=new mt({color:16773808,transparent:!0,opacity:.13,blending:to,depthWrite:!1,side:Jt}),b=new et;for(const T of[0,Math.PI]){const F=new et;F.rotation.y=T;const _=new V(new $t(7,220,12,1,!0),w);_.rotation.z=Math.PI/2,_.position.x=110,F.add(_),b.add(F)}b.position.set(150,d+27.5,-1450),b.name="lightbeams",t.add(b)}const s=new et;s.name="boats";{const d=new K({color:9071432,roughness:.9});for(const y of[-30,30]){const v=new V(new he(60,.6,4),d);v.position.set(-2132,.5,2251+y),v.castShadow=v.receiveShadow=!0,t.add(v)}const g=[16777215,16765562,8046847,16751226,14221272];for(let y=0;y<6;y++){const v=new et,M=new V(new he(2.2,1.2,7),new K({color:[12724778,2777026,15658734][y%3],roughness:.5}));M.position.y=.4,M.castShadow=!0;const A=new V(new Ue(.09,.09,9),new K({color:7031338,roughness:.8}));A.position.y=5,A.castShadow=!0;const w=new Fa;w.moveTo(0,0),w.lineTo(0,7.6),w.lineTo(3.4,.6),w.lineTo(0,0);const b=new V(new gh(w),new K({color:g[y%g.length],side:Jt,roughness:.8}));b.position.set(.15,1.2,-.5),v.add(M,A,b),v.position.set(-2156+y%3*24,0,2251+(y<3?-30:30)+6),v.rotation.y=(e()-.5)*.6,v.userData.phase=e()*7,s.add(v)}t.add(s)}const r=[];{const m=new K({color:15265007,roughness:.4,metalness:.2});for(const[x,d]of[[1400,-500],[1470,-420],[1330,-410]]){const g=Be(x,d),y=n(new Ue(1.1,1.6,42,10),m,x,g+21,d);y.castShadow=!0;const v=new et;v.position.set(x,g+42,d-1.8);for(let M=0;M<3;M++){const A=new V(new he(.7,15,.18),m);A.geometry=A.geometry.clone(),A.geometry.translate(0,8.2,0);const w=new et;w.rotation.z=M/3*Math.PI*2,w.add(A),A.castShadow=!0,v.add(w)}t.add(v),r.push(v)}}{const d=Be(1800,-600),g=new K({color:5916210,roughness:.9});for(const[y,v]of[[-3,-3],[3,-3],[-3,3],[3,3]]){const M=new V(new Ue(.3,.3,18),g);M.position.set(1800+y,d+9,-600+v),M.castShadow=!0,t.add(M)}n(new he(9,4,9),new K({color:8020552,roughness:.9}),1800,d+20,-600),n(new $t(7,3,4),new K({color:3820090,roughness:.9}),1800,d+23.5,-600,Math.PI/4)}{const m=new et,x=new K({color:3812902,roughness:.95}),d=new V(new he(10,6,34),x);d.castShadow=!0;const g=new V(new Ue(5,5,6,3,1),x);g.rotation.y=Math.PI,g.position.z=-19;const y=new V(new Ue(.3,.4,18),new K({color:4864554,roughness:.9}));y.position.set(0,8,4),y.rotation.z=.35,y.castShadow=!0,m.add(d,g,y),m.position.set(3150,-1.5,2550),m.rotation.set(.08,.7,.42),t.add(m)}{const d=Be(7400,-2400);n(new Ue(6,6.5,7,14),new K({color:12106946,roughness:.8}),7400,d+3.5,-2400);const g=new V(new jt(5.5,18,12,0,Math.PI*2,0,Math.PI/2),new K({color:15265010,roughness:.35,metalness:.2}));g.position.set(7400,d+7,-2400),g.castShadow=!0,t.add(g);const y=new V(new he(1.6,4.5,.6),new K({color:1316380,roughness:.6}));y.position.set(7400,d+9,-2400-5.2),y.rotation.x=-.25,t.add(y)}let o=null;{const d=Be(3e3,13e3),g=new V(new $t(150,110,24,1,!0),new K({color:3813936,roughness:1,side:Jt}));g.position.set(3e3,d+55,13e3),t.add(g),o=new K({color:5446149,emissive:16734720,emissiveIntensity:1.6,roughness:.8});const y=new V(new Rs(26,24),o);y.rotation.x=-Math.PI/2,y.position.set(3e3,d+108,13e3),t.add(y);const v=new Bt(new Dt({map:ws(),color:16742946,transparent:!0,depthWrite:!1}));v.position.set(3e3,d+130,13e3),v.scale.set(180,180,1),v.userData={blink:!0,rate:.6,duty:.8,dim:!0},t.add(v)}const a=[];{const m=new mt({color:16054008,side:Jt}),x=[{x:-2132,z:2251,n:5},{x:-4880,z:1040,n:4}],d=xi(5150);for(const g of x)for(let y=0;y<g.n;y++){const v=new et,M=new Ct(1.6,.5);M.translate(.8,0,0),M.rotateX(-Math.PI/2);const A=new V(M,m),w=new V(M,m);w.rotation.y=Math.PI,v.add(A,w),v.userData={cx:g.x,cz:g.z,r:30+d()*55,h:14+d()*22,sp:.25+d()*.3,ph:d()*7,wl:A,wr:w},t.add(v),a.push(v)}}const c=new et;c.name="balloons";{const m=[14764875,4947425,14787659];for(let x=0;x<3;x++){const d=new et,g=new V(new jt(9,16,12),new K({color:m[x],roughness:.7}));g.scale.y=1.15;const y=new V(new he(2.4,2,2.4),new K({color:7031338,roughness:.9}));y.position.y=-12,d.add(g,y);const v=x/3*Math.PI*2;d.position.set(Math.cos(v)*1500,420+x*90,Math.sin(v)*1500),d.userData.phase=v,c.add(d)}t.add(c)}const l=[];{const m=new mt({color:6737151,transparent:!0,opacity:.35,blending:to,depthWrite:!1,side:Jt});hs.forEach((x,d)=>{const g=Math.max(0,Be(x.x,x.z)),y=new V(new Ue(6,14,700,10,1,!0),m.clone());y.position.set(x.x,g+350,x.z),y.name="pillar-"+d,t.add(y),l.push(y)})}i.add(t);function h(m){const x=l[m];x&&(x.visible=!1)}const f=t.getObjectByName("lightbeams"),u=c.children.map(m=>m.position);function p(m,x,d){for(const y of s.children){const v=y.userData.phase||0;y.position.y=Math.sin(x*.9+v)*.35,y.rotation.z=Math.sin(x*.7+v)*.05,y.rotation.x=Math.cos(x*.6+v)*.04}const g=d?Math.hypot(d.x,d.z):3;for(const y of r)y.rotation.z+=m*(.8+g*.35);for(const y of c.children){y.userData.phase+=m*.008;const v=y.userData.phase;y.position.x=Math.cos(v)*1500+(d?d.x*8:0),y.position.z=Math.sin(v)*1500+(d?d.z*8:0),y.position.y+=Math.sin(x*.3+v*5)*m*2}f&&(f.rotation.y=x*.5),o&&(o.emissiveIntensity=1.3+Math.sin(x*3.1)*.35+Math.sin(x*7.7)*.15);for(const y of a){const v=y.userData,M=x*v.sp+v.ph;y.position.set(v.cx+Math.cos(M)*v.r,v.h+Math.sin(x*.9+v.ph)*2,v.cz+Math.sin(M)*v.r),y.rotation.y=-M;const A=Math.sin(x*9+v.ph)*.55;v.wl.rotation.x=A,v.wr.rotation.x=-A}for(const y of l)y.visible&&(y.material.opacity=.28+Math.sin(x*2+y.position.x)*.12,y.rotation.y+=m*.3)}return{found:h,update:p,balloons:u}}const ze={enabled:!1,mode:"hidden",stickOn:!1,stickX:0,stickY:0,yaw:0,throttle:0,brakes:!1,run:!1};function fM(){try{if(new URLSearchParams(location.search).has("touch")||matchMedia("(pointer: coarse)").matches||"ontouchstart"in window&&navigator.maxTouchPoints>0)return!0}catch{}return!1}function Fn(i,e,t,n=""){const s=document.createElement(i);return s.className=e,s.innerHTML=n,t.appendChild(s),s}function Qo(i,{down:e,move:t,up:n}){let s=null;const r=a=>{const c=i.getBoundingClientRect();return{x:a.clientX-c.left,y:a.clientY-c.top,w:c.width,h:c.height}};i.addEventListener("touchstart",a=>{if(a.preventDefault(),s!==null)return;const c=a.changedTouches[0];s=c.identifier,e&&e(r(c),c)},{passive:!1}),i.addEventListener("touchmove",a=>{a.preventDefault();for(const c of a.changedTouches)c.identifier===s&&t&&t(r(c),c)},{passive:!1});const o=a=>{for(const c of a.changedTouches)c.identifier===s&&(s=null,n&&n())};i.addEventListener("touchend",o),i.addEventListener("touchcancel",o)}function pM(i){if(ze.enabled=fM(),!ze.enabled)return{setMode(){},isTouch:!1};document.body.classList.add("touch");const e=Fn("div","touch-hidden",document.body);e.id="touch-ui";const t=Fn("div","t-stick",e),n=Fn("div","t-knob",t),s=(w,b)=>{n.style.transform=`translate(${w}px, ${b}px)`};Qo(t,{down:w=>r(w),move:w=>r(w),up:()=>{ze.stickOn=!1,ze.stickX=ze.stickY=0,s(0,0),i.onStick&&i.onStick(0,0)}});function r(w){const b=Math.max(30,w.w/2-10);let T=w.x-w.w/2,F=w.y-w.h/2;const _=Math.hypot(T,F)||1,S=Math.min(1,_/b);T=T/_*S*b,F=F/_*S*b,s(T,F),ze.stickOn=!0,ze.stickX=T/b,ze.stickY=-F/b,i.onStick&&i.onStick(ze.stickX,ze.stickY)}const o=Fn("div","t-thr",e);Fn("div","t-thr-fill",o);const a=Fn("div","t-thr-lab",o,"0%"),c=o.querySelector(".t-thr-fill"),l=(w,b=!0)=>{ze.throttle=Math.max(0,Math.min(1,w)),c.style.height=`${ze.throttle*100}%`,b&&(a.textContent=`${Math.round(ze.throttle*100)}%`)};Qo(o,{down:w=>l(1-w.y/w.h),move:w=>l(1-w.y/w.h),up:()=>{}});const h=Fn("div","t-rud",e),f=(w,b)=>{const T=Fn("button","t-btn",h,w);return Qo(T,{down:()=>{ze.yaw=b},up:()=>{ze.yaw===b&&(ze.yaw=0)}}),T};f("◀ RUD",-1),f("RUD ▶",1);const u=Fn("div","t-sys t-sys-fly",e),p=Fn("div","t-sys t-sys-walk",e),m=(w,b,T,F)=>{const _=Fn("button","t-btn",w,b);return F?Qo(_,{down:()=>{ze.brakes=!0,_.classList.add("held")},up:()=>{ze.brakes=!1,_.classList.remove("held")}}):T!=="run"&&_.addEventListener("touchstart",S=>{S.preventDefault(),i.onAction&&i.onAction(T)},{passive:!1}),_};m(u,"⏸","pause"),m(u,"📷","cam"),m(u,"✓","next"),m(u,"FL+","flapUp"),m(u,"FL−","flapDown"),m(u,"GEAR","gear"),m(u,"BRK","brakes",!0),m(u,"🚶","walk"),m(u,"🪂","dive");const x=m(p,"🏃","run");m(p,"⏸","pause"),m(p,"📷","cam"),m(p,"✓","next"),m(p,"E","interact"),m(p,"🚶","walk"),x.addEventListener("touchstart",w=>{w.preventDefault(),ze.run=!ze.run,x.classList.toggle("held",ze.run)},{passive:!1});const d=Fn("div","t-look",e);let g=null,y=0,v=0;d.addEventListener("touchstart",w=>{if(w.preventDefault(),g!==null)return;const b=w.changedTouches[0];g=b.identifier,y=b.clientX,v=b.clientY},{passive:!1}),d.addEventListener("touchmove",w=>{w.preventDefault();for(const b of w.changedTouches)b.identifier===g&&(i.onLook&&i.onLook((b.clientX-y)*1.6,(b.clientY-v)*1.6),y=b.clientX,v=b.clientY)},{passive:!1});const M=w=>{for(const b of w.changedTouches)b.identifier===g&&(g=null)};d.addEventListener("touchend",M),d.addEventListener("touchcancel",M),addEventListener("touchstart",function(){document.body.classList.add("touch")},{once:!0,passive:!0});function A(w){ze.mode=w,ze.stickOn=!1,ze.stickX=ze.stickY=0,ze.yaw=0,ze.brakes=!1,s(0,0),e.className=w==="hidden"?"touch-hidden":"",e.dataset.mode=w,w==="fly"&&i.getThrottle&&l(i.getThrottle()),w!=="walk"&&(ze.run=!1,x.classList.remove("held"))}return A("hidden"),{setMode:A,isTouch:!0}}function mM(i){const e=new Set,t={pitch:0,roll:0,yaw:0,trim:0,throttle:0,flapIdx:0,gearDown:!0,brakes:!1,locked:!1};let n=!1;addEventListener("keydown",o=>{if(o.repeat){e.add(o.code);return}e.add(o.code),o.code==="KeyF"&&(t.flapIdx=Math.min(3,t.flapIdx+1)),o.code==="KeyV"&&(t.flapIdx=Math.max(0,t.flapIdx-1)),o.code==="KeyG"&&(t.gearDown=!t.gearDown),o.code==="Enter"&&!t.locked&&(n=!0)}),addEventListener("keyup",o=>e.delete(o.code)),addEventListener("wheel",o=>{t.throttle=Zn(t.throttle-Math.sign(o.deltaY)*.05,0,1)},{passive:!0}),document.addEventListener("pointerlockchange",()=>{t.locked=document.pointerLockElement===document.body}),document.addEventListener("mousemove",o=>{if(!t.locked)return;const a=i?.sensitivity??1;t.roll=Zn(t.roll+o.movementX*.0022*a,-1,1),t.pitch=Zn(t.pitch-o.movementY*.0022*a,-1,1)}),document.body.addEventListener("click",()=>{ze.enabled||((n||!t.locked)&&document.body.requestPointerLock?.(),n=!1)});function s(o){if(n&&(n=!1,!ze.enabled))try{const l=document.body.requestPointerLock?.();l&&typeof l.catch=="function"&&l.catch(()=>{})}catch{}(e.has("KeyW")||e.has("ShiftLeft"))&&(t.throttle=Zn(t.throttle+o*.5,0,1)),(e.has("KeyS")||e.has("ControlLeft"))&&(t.throttle=Zn(t.throttle-o*.6,0,1)),t.yaw=(e.has("KeyD")?1:0)-(e.has("KeyA")?1:0),e.has("KeyX")&&(t.trim=Zn(t.trim+o*.4,-1,1)),e.has("KeyZ")&&(t.trim=Zn(t.trim-o*.4,-1,1)),e.has("ArrowUp")&&(t.pitch=Zn(t.pitch+o*1.5,-1,1)),e.has("ArrowDown")&&(t.pitch=Zn(t.pitch-o*1.5,-1,1)),e.has("ArrowLeft")&&(t.roll=Zn(t.roll-o*2,-1,1)),e.has("ArrowRight")&&(t.roll=Zn(t.roll+o*2,-1,1)),t.brakes=e.has("KeyB");const a=Math.min(1,o*1.6),c=Math.min(1,o*.25);if(!e.has("ArrowLeft")&&!e.has("ArrowRight")&&(t.roll-=t.roll*a),!e.has("ArrowUp")&&!e.has("ArrowDown")&&(t.pitch-=t.pitch*c),ze.mode==="fly"){if(t.throttle=ze.throttle,ze.stickOn)t.pitch=ze.stickY,t.roll=ze.stickX;else{const l=Math.min(1,o*6);t.pitch-=t.pitch*l,t.roll-=t.roll*l}ze.yaw!==0&&(t.yaw=ze.yaw),ze.brakes&&(t.brakes=!0)}return t}const r=o=>{const a=e.has(o);return a&&e.delete(o),a};return{st:t,poll:s,keys:e,consumeReset:()=>r("KeyR"),consumeCam:()=>r("KeyC"),consumeHelp:()=>r("KeyH"),consumePause:()=>r("KeyP"),consumeWalk:()=>r("KeyK"),consumeInteract:()=>r("KeyE"),consumeSkydive:()=>r("KeyJ"),consumeMap:()=>r("KeyM"),consumeTutorialAdvance:()=>r("KeyT")||r("Enter")}}function Zn(i,e,t){return Math.max(e,Math.min(t,i))}function od(i,e){if(e===Up)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Cl||e===Xd){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Cl)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class gM extends Is{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new MM(t)}),this.register(function(t){return new SM(t)}),this.register(function(t){return new LM(t)}),this.register(function(t){return new IM(t)}),this.register(function(t){return new DM(t)}),this.register(function(t){return new bM(t)}),this.register(function(t){return new EM(t)}),this.register(function(t){return new TM(t)}),this.register(function(t){return new AM(t)}),this.register(function(t){return new yM(t)}),this.register(function(t){return new RM(t)}),this.register(function(t){return new wM(t)}),this.register(function(t){return new PM(t)}),this.register(function(t){return new CM(t)}),this.register(function(t){return new _M(t)}),this.register(function(t){return new NM(t)}),this.register(function(t){return new UM(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Qr.extractUrlBase(e);o=Qr.resolveURL(l,this.path)}else o=Qr.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new _h(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Df){try{o[tt.KHR_BINARY_GLTF]=new FM(e)}catch(f){s&&s(f);return}r=JSON.parse(o[tt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new $M(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const f=this.pluginCallbacks[h](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const f=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(f){case tt.KHR_MATERIALS_UNLIT:o[f]=new vM;break;case tt.KHR_DRACO_MESH_COMPRESSION:o[f]=new OM(r,this.dracoLoader);break;case tt.KHR_TEXTURE_TRANSFORM:o[f]=new zM;break;case tt.KHR_MESH_QUANTIZATION:o[f]=new BM;break;default:u.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function xM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const tt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class _M{constructor(e){this.parser=e,this.name=tt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new ke(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],tn);const f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Tf(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Cy(h),l.distance=f;break;case"spot":l=new Ef(h),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Di(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class vM{constructor(){this.name=tt.KHR_MATERIALS_UNLIT}getMaterialType(){return mt}extendParams(e,t,n){const s=[];e.color=new ke(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],tn),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,un))}return Promise.all(s)}}class yM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class MM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new fe(a,a)}return Promise.all(r)}}class SM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class wM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class bM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ke(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],tn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,un)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class EM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class TM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ke().setRGB(a[0],a[1],a[2],tn),Promise.all(r)}}class AM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class RM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ke().setRGB(a[0],a[1],a[2],tn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,un)),Promise.all(r)}}class CM{constructor(e){this.parser=e,this.name=tt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class PM{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Mi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class LM{constructor(e){this.parser=e,this.name=tt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class IM{constructor(e){this.parser=e,this.name=tt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class DM{constructor(e){this.parser=e,this.name=tt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class NM{constructor(e){this.name=tt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,h=s.count,f=s.byteStride,u=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,f,u,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(h*f);return o.decodeGltfBuffer(new Uint8Array(p),h,f,u,s.mode,s.filter),p})})}else return null}}class UM{constructor(e){this.name=tt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==kn.TRIANGLES&&l.mode!==kn.TRIANGLE_STRIP&&l.mode!==kn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),f=h.isGroup?h.children:[h],u=l[0].count,p=[];for(const m of f){const x=new Ke,d=new U,g=new fn,y=new U(1,1,1),v=new fi(m.geometry,m.material,u);for(let M=0;M<u;M++)c.TRANSLATION&&d.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,M),c.SCALE&&y.fromBufferAttribute(c.SCALE,M),v.setMatrixAt(M,x.compose(d,g,y));for(const M in c)if(M==="_COLOR_0"){const A=c[M];v.instanceColor=new Dl(A.array,A.itemSize,A.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&m.geometry.setAttribute(M,c[M]);St.prototype.copy.call(v,m),this.parser.assignFinalMaterial(v),p.push(v)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const Df="glTF",Gr=12,ad={JSON:1313821514,BIN:5130562};class FM{constructor(e){this.name=tt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Gr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Df)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Gr,r=new DataView(e,Gr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===ad.JSON){const l=new Uint8Array(e,Gr+o,a);this.content=n.decode(l)}else if(c===ad.BIN){const l=Gr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class OM{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=tt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const f=zl[h]||h.toLowerCase();a[f]=o[h]}for(const h in e.attributes){const f=zl[h]||h.toLowerCase();if(o[h]!==void 0){const u=n.accessors[e.attributes[h]],p=lr[u.componentType];l[f]=p.name,c[f]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(f,u){s.decodeDracoFile(h,function(p){for(const m in p.attributes){const x=p.attributes[m],d=c[m];d!==void 0&&(x.normalized=d)}f(p)},a,l,tn,u)})})}}class zM{constructor(){this.name=tt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class BM{constructor(){this.name=tt.KHR_MESH_QUANTIZATION}}class Nf extends uo{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,f=(n-t)/h,u=f*f,p=u*f,m=e*l,x=m-l,d=-2*p+3*u,g=p-u,y=1-d,v=g-u+f;for(let M=0;M!==a;M++){const A=o[x+M+a],w=o[x+M+c]*h,b=o[m+M+a],T=o[m+M]*h;r[M]=y*A+v*w+d*b+g*T}return r}}const kM=new fn;class HM extends Nf{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return kM.fromArray(r).normalize().toArray(r),r}}const kn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},lr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},cd={9728:_n,9729:Qt,9984:Ud,9985:ca,9986:Wr,9987:gi},ld={33071:mi,33648:va,10497:ls},Ic={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},zl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},$i={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},GM={CUBICSPLINE:void 0,LINEAR:so,STEP:io},Dc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function VM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new K({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:zi})),i.DefaultMaterial}function _s(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Di(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function WM(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const f=e[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const f=e[l];if(n){const u=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):i.attributes.position;o.push(u)}if(s){const u=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):i.attributes.normal;a.push(u)}if(r){const u=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):i.attributes.color;c.push(u)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],f=l[1],u=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=f),r&&(i.morphAttributes.color=u),i.morphTargetsRelative=!0,i})}function XM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function qM(i){let e;const t=i.extensions&&i.extensions[tt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Nc(t.attributes):e=i.indices+":"+Nc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Nc(i.targets[n]);return e}function Nc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Bl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function YM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const KM=new Ke;class $M{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new xM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Ey(this.options.manager):this.textureLoader=new Ly(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new _h(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return _s(r,a,s),Di(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[tt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(Qr.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=Ic[s.type],a=lr[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new en(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=Ic[s.type],l=lr[s.componentType],h=l.BYTES_PER_ELEMENT,f=h*c,u=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0;let x,d;if(p&&p!==f){const g=Math.floor(u/p),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count;let v=t.cache.get(y);v||(x=new l(a,g*p,s.count*p/h),v=new df(x,p/h),t.cache.add(y,v)),d=new oo(v,c,u%p/h,m)}else a===null?x=new l(s.count*c):x=new l(a,u,s.count*c),d=new en(x,c,m);if(s.sparse!==void 0){const g=Ic.SCALAR,y=lr[s.sparse.indices.componentType],v=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,A=new y(o[1],v,s.sparse.count*g),w=new l(o[2],M,s.sparse.count*c);a!==null&&(d=new en(d.array.slice(),d.itemSize,d.normalized)),d.normalized=!1;for(let b=0,T=A.length;b<T;b++){const F=A[b];if(d.setX(F,w[b*c]),c>=2&&d.setY(F,w[b*c+1]),c>=3&&d.setZ(F,w[b*c+2]),c>=4&&d.setW(F,w[b*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}d.normalized=m}return d})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const u=(r.samplers||{})[o.sampler]||{};return h.magFilter=cd[u.magFilter]||Qt,h.minFilter=cd[u.minFilter]||gi,h.wrapS=ld[u.wrapS]||ls,h.wrapT=ld[u.wrapT]||ls,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const o=s.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(f){l=!0;const u=new Blob([f],{type:o.mimeType});return c=a.createObjectURL(u),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(f){return new Promise(function(u,p){let m=u;t.isImageBitmapLoader===!0&&(m=function(x){const d=new Gt(x);d.needsUpdate=!0,u(d)}),t.load(Qr.resolveURL(f,r.path),m,void 0,p)})}).then(function(f){return l===!0&&a.revokeObjectURL(c),Di(f,o),f.userData.mimeType=o.mimeType||YM(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[tt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[tt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[tt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Ua,si.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new mf,si.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return K}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[tt.KHR_MATERIALS_UNLIT]){const f=s[tt.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),l.push(f.extendParams(a,r,t))}else{const f=r.pbrMetallicRoughness||{};if(a.color=new ke(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const u=f.baseColorFactor;a.color.setRGB(u[0],u[1],u[2],tn),a.opacity=u[3]}f.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",f.baseColorTexture,un)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Jt);const h=r.alphaMode||Dc.OPAQUE;if(h===Dc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Dc.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==mt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new fe(1,1),r.normalTexture.scale!==void 0)){const f=r.normalTexture.scale;a.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&o!==mt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==mt){const f=r.emissiveFactor;a.emissive=new ke().setRGB(f[0],f[1],f[2],tn)}return r.emissiveTexture!==void 0&&o!==mt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,un)),Promise.all(l).then(function(){const f=new o(a);return r.name&&(f.name=r.name),Di(f,r),t.associations.set(f,{materials:e}),r.extensions&&_s(s,f,r),f})}createUniqueName(e){const t=pt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[tt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return hd(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=qM(l),f=s[h];if(f)o.push(f.promise);else{let u;l.extensions&&l.extensions[tt.KHR_DRACO_MESH_COMPRESSION]?u=r(l):u=hd(new kt,l,t),s[h]={primitive:l,promise:u},o.push(u)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?VM(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],f=[];for(let p=0,m=h.length;p<m;p++){const x=h[p],d=o[p];let g;const y=l[p];if(d.mode===kn.TRIANGLES||d.mode===kn.TRIANGLE_STRIP||d.mode===kn.TRIANGLE_FAN||d.mode===void 0)g=r.isSkinnedMesh===!0?new Av(x,y):new V(x,y),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),d.mode===kn.TRIANGLE_STRIP?g.geometry=od(g.geometry,Xd):d.mode===kn.TRIANGLE_FAN&&(g.geometry=od(g.geometry,Cl));else if(d.mode===kn.LINES)g=new Pv(x,y);else if(d.mode===kn.LINE_STRIP)g=new uh(x,y);else if(d.mode===kn.LINE_LOOP)g=new Lv(x,y);else if(d.mode===kn.POINTS)g=new dh(x,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+d.mode);Object.keys(g.geometry.morphAttributes).length>0&&XM(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),Di(g,r),d.extensions&&_s(s,g,d),t.assignFinalMaterial(g),f.push(g)}for(let p=0,m=f.length;p<m;p++)t.associations.set(f[p],{meshes:e,primitives:p});if(f.length===1)return r.extensions&&_s(s,f[0],r),f[0];const u=new et;r.extensions&&_s(s,u,r),t.associations.set(u,{meshes:e});for(let p=0,m=f.length;p<m;p++)u.add(f[p]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new xn(cm.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new oh(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Di(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const f=o[l];if(f){a.push(f);const u=new Ke;r!==null&&u.fromArray(r.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new hh(a,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let f=0,u=s.channels.length;f<u;f++){const p=s.channels[f],m=s.samplers[p.sampler],x=p.target,d=x.node,g=s.parameters!==void 0?s.parameters[m.input]:m.input,y=s.parameters!==void 0?s.parameters[m.output]:m.output;x.node!==void 0&&(o.push(this.getDependency("node",d)),a.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",y)),l.push(m),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){const u=f[0],p=f[1],m=f[2],x=f[3],d=f[4],g=[];for(let y=0,v=u.length;y<v;y++){const M=u[y],A=p[y],w=m[y],b=x[y],T=d[y];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const F=n._createAnimationTracks(M,A,w,b,T);if(F)for(let _=0;_<F.length;_++)g.push(F[_])}return new xy(r,void 0,g)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const h=l[0],f=l[1],u=l[2];u!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(u,KM)});for(let p=0,m=f.length;p<m;p++)h.add(f[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new pf:l.length>1?h=new et:l.length===1?h=l[0]:h=new St,h!==l[0])for(let f=0,u=l.length;f<u;f++)h.add(l[f]);if(r.name&&(h.userData.name=r.name,h.name=o),Di(h,r),r.extensions&&_s(n,h,r),r.matrix!==void 0){const f=new Ke;f.fromArray(r.matrix),h.applyMatrix4(f)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new et;n.name&&(r.name=s.createUniqueName(n.name)),Di(r,n),n.extensions&&_s(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,f=c.length;h<f;h++)r.add(c[h]);const l=h=>{const f=new Map;for(const[u,p]of s.associations)(u instanceof si||u instanceof Gt)&&f.set(u,p);return h.traverse(u=>{const p=s.associations.get(u);p!=null&&f.set(u,p)}),f};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,c=[];$i[r.path]===$i.weights?e.traverse(function(u){u.morphTargetInfluences&&c.push(u.name?u.name:u.uuid)}):c.push(a);let l;switch($i[r.path]){case $i.weights:l=Mr;break;case $i.rotation:l=Sr;break;case $i.position:case $i.scale:l=wr;break;default:switch(n.itemSize){case 1:l=Mr;break;case 2:case 3:default:l=wr;break}break}const h=s.interpolation!==void 0?GM[s.interpolation]:so,f=this._getArrayFromAccessor(n);for(let u=0,p=c.length;u<p;u++){const m=new l(c[u]+"."+$i[r.path],t.array,f,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Bl(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Sr?HM:Nf;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function jM(i,e,t){const n=e.attributes,s=new _i;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new U(c[0],c[1],c[2]),new U(l[0],l[1],l[2])),a.normalized){const h=Bl(lr[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new U,c=new U;for(let l=0,h=r.length;l<h;l++){const f=r[l];if(f.POSITION!==void 0){const u=t.json.accessors[f.POSITION],p=u.min,m=u.max;if(p!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(m[2]))),u.normalized){const x=Bl(lr[u.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new vi;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function hd(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=zl[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return rt.workingColorSpace!==tn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${rt.workingColorSpace}" not supported.`),Di(i,e),jM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?WM(i,e.targets,t):i})}function ZM(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,0.55)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new pn(i)}function JM(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d"),t=e.createRadialGradient(128,128,20,128,128,128);t.addColorStop(0,"rgba(200,200,200,0)"),t.addColorStop(.55,"rgba(210,210,210,0.28)"),t.addColorStop(.85,"rgba(220,220,220,0.5)"),t.addColorStop(1,"rgba(230,230,230,0)"),e.fillStyle=t,e.fillRect(0,0,256,256),e.strokeStyle="rgba(60,60,60,0.35)",e.lineWidth=10;for(let n=0;n<2;n++)e.beginPath(),e.arc(128,128,95,n*Math.PI,n*Math.PI+2.4),e.stroke();return new pn(i)}function QM(i){const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");t.clearRect(0,0,512,128),t.fillStyle="#b31b1b",t.font="bold 84px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText(i,256,68);const n=new pn(e);return n.anisotropy=4,n}const eS={wing:"high",tires:"std",body:16054008,accent:11737883,canopy:!1,hopper:!1,reg:"N172FS"};async function Uf(i,e={}){const t={...eS,...e.look||{}};if(e.useGLB!==!1)try{const le=(await new gM().loadAsync("models/plane.glb")).scene;le.traverse($=>{$.isMesh&&($.castShadow=!0)});const j=nS(le);return i.add(j),iS(le)}catch{}const n=new et,s=new K({color:t.body,roughness:.32,metalness:.12}),r=new K({color:t.accent,roughness:.38,metalness:.1}),o=new K({color:1842980,roughness:.55,metalness:.3}),a=new K({color:922651,roughness:.06,metalness:.9}),c=new K({color:1381653,roughness:.9}),l=new K({color:10133670,roughness:.35,metalness:.8}),h=(C,le,j=0,$=0,se=0)=>{const pe=new V(C,le);return pe.position.set(j,$,se),pe.castShadow=!0,n.add(pe),pe},f=new Fa;f.moveTo(3.55,-.45),f.quadraticCurveTo(3.75,.1,3.35,.42),f.lineTo(2.1,.52),f.quadraticCurveTo(1.2,1.28,.2,1.3),f.lineTo(-1,1.28),f.quadraticCurveTo(-2.4,1.05,-3.55,.42),f.lineTo(-3.62,-.05),f.quadraticCurveTo(-2,-.62,-.6,-.68),f.lineTo(1.6,-.7),f.quadraticCurveTo(2.9,-.68,3.55,-.45);const u=new mh(f,{depth:1.35,bevelEnabled:!0,bevelThickness:.18,bevelSize:.18,bevelSegments:3,steps:1});u.rotateY(Math.PI/2),u.translate(-.675,0,0);const p=new V(u,s);p.castShadow=p.receiveShadow=!0,n.add(p);const x=h(new he(.02,.22,5.6),r,-.86,-.05,.4).clone();x.position.x=.86,n.add(x);const d=QM(t.reg);for(const C of[-1,1]){const le=new V(new Ct(1.9,.48),new mt({map:d,transparent:!0}));le.position.set(C*.868,.28,1.9),le.rotation.y=C*Math.PI/2,n.add(le)}const g=h(new he(t.canopy?1.25:1.15,t.canopy?.78:.62,.06),a,0,t.canopy?1.06:1.02,-1.68);g.rotation.x=.8;for(const C of[-1,1]){const le=h(new he(.06,t.canopy?.68:.55,1.05),a,C*.87,t.canopy?1:.95,-.85);le.rotation.y=-C*.12,t.canopy||h(new he(.06,.5,.85),a,C*.87,.93,.25)}if(t.hopper){const C=h(new he(1.15,.75,1),new K({color:10133670,roughness:.6,metalness:.4}),0,1.15,.75);C.castShadow=!0}const y=t.wing==="high"?1.5:-.12,v=s;for(const C of[-1,1]){const le=h(new he(5.4,.16,1.55),v,C*2.75,y,-.35);le.rotation.z=-C*.035;const j=h(new he(.5,.14,1.3),r,C*5.35,y+.1,-.35);if(j.rotation.z=-C*.035,t.wing==="high"){const $=h(new Ue(.06,.06,2.6),l,C*1.35,.45,-.25);$.rotation.z=C*.62}}h(new he(1.2,.18,1.55),v,0,y+.02,-.35);const M=(C,le,j,$,se,pe,me,L)=>{const E=new he(C,le,j);L==="x"&&E.translate(0,0,j/2),L==="y"&&E.translate(0,0,j/2);const G=new V(E,$);return G.position.set(se,pe,me),G.castShadow=!0,n.add(G),G},A=M(2,.12,.5,r,-4.15,y+.01,.18,"x"),w=M(2,.12,.5,r,4.15,y+.01,.18,"x"),b=M(1.7,.12,.55,v,-1,y,.18,"x"),T=M(1.7,.12,.55,v,1,y,.18,"x");h(new he(3.5,.13,1.05),v,0,.42,3.15);const F=M(3.3,.11,.5,r,0,.42,3.62,"x");h(new he(.13,1.75,1.35),r,0,1.15,3.15);const _=M(.11,1.6,.65,s,0,1.12,3.78,"y"),S=new et;S.position.set(0,.05,-4.02);const D=new he(.16,1.1,.07);D.translate(0,.55,0);const I=new V(D,o);I.castShadow=!0;const P=I.clone();P.rotation.z=Math.PI;const O=new V(new $t(.26,.62,14),r);O.rotation.x=-Math.PI/2,O.position.z=-.1,O.castShadow=!0;const N=new V(new Rs(1.02,40),new mt({map:JM(),transparent:!0,opacity:0,side:Jt,depthWrite:!1}));N.position.z=.02,S.add(I,P,O,N),n.add(S);const W=new et,z=t.tires==="tundra",te=z?.46:.3,ne=z?-.8:-.78,ce=(C,le,j)=>{const $=new V(new Ue(.07,.07,j),l);if($.position.set(C,-j/2,le),$.castShadow=!0,C!==0&&($.rotation.z=Math.sign(C)*.2),W.add($),!z){const pe=new V(new jt(.34,12,10),s);pe.scale.set(.75,1.05,1.5),pe.position.set(C,-.78,le),pe.castShadow=!0,W.add(pe)}const se=new V(new Ue(te,te,z?.3:.2,14),c);se.rotation.z=Math.PI/2,se.position.set(C,ne,le+.08),se.castShadow=!0,W.add(se)};ce(0,-2.35,.9),ce(-.95,-.15,.9),ce(.95,-.15,.9),n.add(W);const Ae=h(new Ue(.09,.11,.5),o,.45,-.75,-2.9);Ae.rotation.x=Math.PI/2,h(new Ue(.025,.025,.7),l,-3.1,y+.08,-.2).rotation.x=Math.PI/2,h(new $t(.05,.35,8),o,0,1.48,-.3),h(new $t(.04,.28,8),o,0,-.85,1.6).rotation.x=Math.PI;const Le=ZM(),X=new Bt(new Dt({map:Le,color:16720418,transparent:!0,depthWrite:!1}));X.position.set(-5.68,y+.1,-.35),X.scale.set(1.2,1.2,1),n.add(X);const ae=X.clone();ae.material=X.material.clone(),ae.material.color.set(2293572),ae.position.x=5.68,n.add(ae);const ge=X.clone();ge.material=X.material.clone(),ge.material.color.set(16777215),ge.position.set(0,.5,3.85),ge.scale.set(.9,.9,1),n.add(ge);const ee=new Bt(new Dt({map:Le,color:16777215,transparent:!0,depthWrite:!1}));ee.position.copy(X.position),ee.scale.set(3.2,3.2,1),n.add(ee);const xe=ee.clone();xe.position.copy(ae.position),n.add(xe);const de=new Bt(new Dt({map:Le,color:16724770,transparent:!0,depthWrite:!1}));de.position.set(0,1.62,-.3),de.scale.set(2.2,2.2,1),n.add(de);const Re=new Bt(new Dt({map:Le,color:16774872,transparent:!0,depthWrite:!1}));Re.position.set(-1.8,y,-1.15),Re.scale.set(2.6,2.6,1),n.add(Re);const He=h(new Rs(.16,12),new mt({color:16774872}),-1.8,y,-1.14);He.rotation.y=Math.PI;const ie=new et;return ie.position.set(0,.42,-1.78),n.add(ie),i.add(n),tS(n,{aileronL:A,aileronR:w,elevator:F,rudder:_,flapL:b,flapR:T,prop:S,blade1:I,blade2:P,blur:N,gear:W,strobeL:ee,strobeR:xe,beaconT:de,landGlow:Re,landLens:He,dashAnchor:ie,paintRef:s,accentRef:r})}function tS(i,e){let t=0;return{root:i,dashAnchor:e.dashAnchor,setPaint(n,s){i.traverse(r=>{!r.isMesh||!r.material||!r.material.color||(r.material===e.paintRef&&r.material.color.setHex(n),r.material===e.accentRef&&r.material.color.setHex(s))})},setState({pos:n,quat:s}){i.position.copy(n),i.quaternion.copy(s)},animate({roll:n,pitch:s,yaw:r,flapFrac:o,gearDown:a,rpm01:c},l,h=0){t+=l*(3+c*95),e.prop.rotation.z=t;const f=Math.min(1,Math.max(0,(c-.25)/.5));e.blur.material.opacity=f*.9,e.blade1.visible=e.blade2.visible=f<.85,e.aileronL.rotation.x=n*.45,e.aileronR.rotation.x=-n*.45,e.elevator.rotation.x=-s*.45,e.rudder.rotation.y=r*.5,e.flapL.rotation.x=e.flapR.rotation.x=o*.65;const u=a?0:-1.05;e.gear.position.y+=(u-e.gear.position.y)*Math.min(1,l*2.2);const p=h%1.1,m=p<.05||p>.12&&p<.17;e.strobeL.material.opacity=e.strobeR.material.opacity=m?1:0,e.strobeL.visible=e.strobeR.visible=m;const d=h%1.4/1.4<.12;e.beaconT.material.opacity=d?1:.05;const g=a?.85:0;e.landGlow.material.opacity=g,e.landLens.material.color.setScalar(a?1:.25)},pilotEye(){return new U(.38,.82,-.95)}}}function nS(i){const e=new _i().setFromObject(i),t=e.getSize(new U),n=e.getCenter(new U),s=Math.max(t.x,t.z),r=s>0?11/s:1;i.scale.multiplyScalar(r),i.position.sub(n.clone().multiplyScalar(r));const o=[];if(i.updateMatrixWorld(!0),i.traverse(c=>{/prop|spinner|nose|engine|cockpit|windshield/i.test(c.name)&&o.push(c.getWorldPosition(new U))}),o.length){const c=new U;for(const h of o)c.add(h);c.divideScalar(o.length);const l=c.sub(n);l.y=0,l.lengthSq()>1e-6&&(i.rotation.y=Math.atan2(l.x,l.z)+Math.PI)}const a=new et;return a.add(i),i.userData.fitWrap=a,a}function iS(i){const e=i.userData.fitWrap||i;let t=null;i.traverse(o=>{!t&&/prop/i.test(o.name)&&(t=o)});let n=0,s=null;i.traverse(o=>{!s&&/cockpit|pilot|seat/i.test(o.name)&&(s=o)});const r=new et;return r.position.set(0,.4,-1.8),(e===i?i:e).add(r),{root:e===i?i:e,dashAnchor:r,setPaint(){},setState({pos:o,quat:a}){this.root.position.copy(o),this.root.quaternion.copy(a)},animate({rpm01:o},a){n+=a*(3+o*95),t&&(t.rotation.z=n)},pilotEye(){if(s){const o=new U;return s.getWorldPosition(o),this.root.worldToLocal(o)}return new U(.3,1.2,-1)}}}const Et=i=>document.getElementById(i);function sS(){const i={ias:Et("h-ias"),alt:Et("h-alt"),vsi:Et("h-vsi"),hdg:Et("h-hdg"),thr:Et("h-thr"),rpm:Et("h-rpm"),flap:Et("h-flap"),gear:Et("h-gear"),aoa:Et("h-aoa"),agl:Et("h-agl"),wind:Et("h-wind"),cam:Et("h-cam"),fps:Et("h-fps"),stall:Et("w-stall"),gearWarn:Et("w-gear"),trim:Et("h-trim"),over:Et("w-over"),sights:Et("h-sights"),money:Et("h-money"),clock:Et("h-clock"),hint:Et("hint"),hintText:Et("hint-text"),horizon:Et("horizon")},e=i.horizon.getContext("2d");function t(o,a){e.clearRect(0,0,150,150),e.save(),e.beginPath(),e.arc(75,75,70,0,7),e.clip(),e.translate(75,75),e.rotate(-a*Math.PI/180);const u=o*1.6;e.fillStyle="#3a7bd5",e.fillRect(-90,-90+u,180,90-u+90),e.fillStyle="#8a5a2b",e.fillRect(-90,u,180,180),e.strokeStyle="#fff",e.lineWidth=1.5,e.beginPath(),e.moveTo(-90,u),e.lineTo(90,u),e.stroke(),e.font="9px monospace",e.fillStyle="#fff",e.textAlign="center";for(let p=-20;p<=20;p+=10){if(!p)continue;const m=u-p*1.6;e.beginPath(),e.moveTo(-22,m),e.lineTo(22,m),e.stroke(),e.fillText(String(Math.abs(p)),0,m-3)}e.restore(),e.strokeStyle="#ff0",e.lineWidth=3,e.beginPath(),e.moveTo(41,75),e.lineTo(65,75),e.lineTo(75,81),e.lineTo(85,75),e.lineTo(109,75),e.stroke(),e.beginPath(),e.arc(75,75,70,0,7),e.strokeStyle="rgba(255,255,255,.5)",e.lineWidth=2,e.stroke()}let n=performance.now(),s=60;function r(o){i.ias.textContent=Math.round(o.iasKt),i.alt.textContent=Math.round(o.altFt);const a=Math.round(o.vsiFpm/50)*50;i.vsi.textContent=(a>=0?"+":"")+a,i.hdg.textContent=String(Math.round(o.hdgDeg)).padStart(3,"0"),i.thr.textContent=Math.round(o.throttle*100),i.rpm.textContent=Math.round(o.rpm),i.flap.textContent=o.flapDeg,i.gear.textContent=o.gearDown?"DOWN":"UP",i.gear.style.color=o.gearDown?"#7fff5f":"#faa",i.aoa.textContent=o.aoaDeg.toFixed(1),i.agl.textContent=Math.round(o.aglFt),i.wind.textContent=Math.round(o.windKt),i.cam.textContent=o.cam,i.sights&&o.sights&&(i.sights.textContent=o.sights),i.money&&o.money!=null&&(i.money.textContent=o.money),i.clock&&o.clock&&(i.clock.textContent=o.clock),i.trim&&(i.trim.textContent=(o.trim>=0?"+":"")+(o.trim*100).toFixed(0)),i.stall.style.display=o.stalled?"block":"none",i.gearWarn.style.display=!o.gearDown&&o.aglFt<500&&o.vsiFpm<-100?"block":"none",i.over&&(i.over.style.display=o.overspeed?"block":"none",i.over.textContent=o.overspeed||""),i.hint&&(i.hint.style.display=o.hint?"block":"none",o.hint&&(i.hintText.textContent=o.hint)),t(o.pitchDeg,o.rollDeg);const c=performance.now();s+=(1e3/Math.max(1,c-n)-s)*.05,n=c,i.fps.textContent=Math.round(s)}return{update:r}}function st(i,e=2600){const t=document.getElementById("toast");t.textContent=i,t.style.display="block",clearTimeout(t._h),t._h=setTimeout(()=>t.style.display="none",e)}const rS="audio/sfx/",Uc=new Map;function Sh(i){if(Uc.has(i))return Uc.get(i);try{const e=new Audio(rS+i+".mp3");return e.preload="auto",e.volume=1,Uc.set(i,e),e}catch{return null}}function wn(i,e=.7){const t=Sh(i);if(!t)return null;try{const n=t.cloneNode(!0);return n.volume=e,n.play().catch(()=>{}),n}catch{return null}}let Ln=null,qr=null,ga=null,xa=null,kl=!1,Ii=null;function Ff(){if(!kl)try{Ln=new(window.AudioContext||window.webkitAudioContext),qr=Ln.createOscillator(),qr.type="sawtooth",ga=Ln.createGain(),ga.gain.value=0;const i=Ln.createBiquadFilter();i.type="lowpass",i.frequency.value=900,qr.connect(i).connect(ga).connect(Ln.destination),qr.start();const e=Ln.sampleRate*2,t=Ln.createBuffer(1,e,Ln.sampleRate),n=t.getChannelData(0);for(let o=0;o<e;o++)n[o]=Math.random()*2-1;const s=Ln.createBufferSource();s.buffer=t,s.loop=!0;const r=Ln.createBiquadFilter();r.type="bandpass",r.frequency.value=600,xa=Ln.createGain(),xa.gain.value=0,s.connect(r).connect(xa).connect(Ln.destination),s.start(),kl=!0,Ii=Sh("stall_warn"),document.addEventListener("click",o=>{o.target.closest('button, .btn, [role="button"]')&&wn("ui_click",.35)})}catch{}}addEventListener("pointerdown",Ff,{once:!1});addEventListener("keydown",Ff,{once:!1});setTimeout(()=>{["crash_0","crash_1","crash_2","land_soft","land_hard","splash","step_0","step_1","ui_click","gear","chute_deploy","canopy","stall_warn"].forEach(Sh)},500);function oS(){let i=!1;function e(x,d,g){if(!kl)return;const y=Ln.currentTime;if(qr.frequency.setTargetAtTime(45+x*90+(g?8:0),y,.1),ga.gain.setTargetAtTime(.02+x*.05,y,.1),xa.gain.setTargetAtTime(d*d*.12,y,.2),g&&!i&&Ii)try{Ii.currentTime=0,Ii.loop=!0,Ii.volume=.45,Ii.play().catch(()=>{}),i=!0}catch{}else!g&&i&&Ii&&(Ii.pause(),Ii.currentTime=0,i=!1)}function t(){const x=Math.floor(Math.random()*5);wn("crash_"+x,.8)}function n(){wn("land_hard",.75)}function s(){wn("land_soft",.5)}function r(){wn("splash",.7)}function o(){const x=Math.floor(Math.random()*4);wn("step_"+x,.3)}function a(){wn("ui_click",.5)}function c(){wn("ui_select",.55)}function l(){wn("ui_open",.45)}function h(){wn("ui_close",.45)}function f(){wn("ui_confirm",.55)}function u(){wn("gear",.6)}function p(){wn("canopy",.7)}function m(){wn("chute_deploy",.65)}return{update:e,crash:t,landHard:n,landSoft:s,splash:r,step:o,uiClick:a,uiSelect:c,uiOpen:l,uiClose:h,uiConfirm:f,gearToggle:u,canopyOpen:p,chuteDeploy:m}}const ud={windKt:6,turbulence:1,sensitivity:1,realism:!0,startTOD:"morning",dayLengthMin:12,weather:0};function aS(){try{const i=localStorage.getItem("flightsim-settings");if(i)return{...ud,...JSON.parse(i)}}catch{}return{...ud}}function cS(){const i=aS(),e=["home","fly","howto","settings"],t={menu:document.getElementById("menu"),pause:document.getElementById("pause"),help:document.getElementById("help"),instructor:document.getElementById("instructor")};let n=()=>{},s=()=>{};function r(d){for(const g of e)document.getElementById("screen-"+g)?.classList.toggle("active",g===d);t.menu.classList.toggle("hidden",!d)}function o(){t.menu.classList.add("hidden")}document.querySelectorAll("[data-nav]").forEach(d=>d.addEventListener("click",()=>r(d.dataset.nav))),document.getElementById("quit-btn")?.addEventListener("click",()=>{s()}),document.querySelectorAll("[data-fly]").forEach(d=>d.addEventListener("click",()=>{o();try{const g=document.body.requestPointerLock?.();g&&typeof g.catch=="function"&&g.catch(()=>{})}catch{}n(d.dataset.fly)})),document.getElementById("resume-btn")?.addEventListener("click",()=>u(!1)),document.getElementById("pause-restart-btn")?.addEventListener("click",()=>{u(!1),document.dispatchEvent(new CustomEvent("flightsim-restart"))}),document.getElementById("pause-menu-btn")?.addEventListener("click",()=>{u(!1),r("home"),document.exitPointerLock?.()});const a=(d,g,y=Number)=>{const v=document.getElementById(d);if(!v)return;v.value=i[g],v.addEventListener("input",()=>{i[g]=y(v.value);const A=document.getElementById(d+"-val");A&&(A.textContent=v.value+(d==="set-wind"?" kt":d==="set-sens"?"×":""));try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}});const M=document.getElementById(d+"-val");M&&(M.textContent=v.value+(d==="set-wind"?" kt":d==="set-sens"?"×":""))};a("set-wind","windKt"),a("set-sens","sensitivity",Number);const c=document.getElementById("set-turb");c&&(c.value=String(i.turbulence),c.addEventListener("change",()=>{i.turbulence=Number(c.value);try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}));const l=document.getElementById("set-realism");l&&(l.checked=i.realism,l.addEventListener("change",()=>{i.realism=l.checked;try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}));const h=(d,g,y=v=>v)=>{const v=document.getElementById(d);v&&(v.value=String(i[g]),v.addEventListener("change",()=>{i[g]=y(v.value);try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}))};h("set-tod","startTOD"),h("set-daylen","dayLengthMin",Number),h("set-weather","weather",Number);let f=!1;function u(d){f=d,t.pause.classList.toggle("hidden",!d),d&&document.exitPointerLock?.()}function p(d){if(!d){t.instructor.classList.add("hidden");return}t.instructor.classList.remove("hidden"),t.instructor.innerHTML=d}document.getElementById("tut-next")?.addEventListener("click",()=>document.dispatchEvent(new CustomEvent("flightsim-tut-next"))),document.getElementById("tut-skip")?.addEventListener("click",()=>document.dispatchEvent(new CustomEvent("flightsim-tut-skip")));function m(d){t.help.classList.toggle("hidden",!d)}function x(){return!t.help.classList.contains("hidden")}return{settings:i,show:r,hide:o,setPaused:u,isPaused:()=>f,setInstructor:p,setHelpVisible:m,isHelpVisible:x,onFly:d=>n=d,onQuitToMenu:d=>s=d}}function dd(i,e=0){return Number(i).toFixed(e)}const ea={takeoff:{title:"Lesson 1 — Takeoff & Climb",steps:[{title:"Set flaps 10°",text:"Real takeoffs use a little flap for extra lift. Press <b>F</b> once (top-left shows FLAP 10°), then press <b>T</b> or click Next.",done:i=>i.advanced||i.flapDeg===10},{title:"Full power",text:"Hold <b>W</b> (or scroll up) until THR reads 100%. The engine needs a second to spool up — watch RPM rise. Keep rolling straight with <b>A / D</b> rudder.",done:i=>i.throttle>.95&&i.rpm>2200},{title:"Rotate at 55 kt",text:"Steer the centerline with rudder. At <b>55 kt (Vr)</b>, ease the mouse upward to lift the nose. Don’t yank — 5° pitch is plenty.",done:i=>!i.onGround&&i.aglFt>20},{title:"Climb at 74 kt (Vy)",text:"Lower the nose slightly and hold <b>74 kt</b> — best climb rate. Add a touch of right rudder: the propeller tries to yaw you left (P-factor). Climb to 500 ft AGL.",done:i=>i.aglFt>500},{title:"Clean up",text:"Above 500 ft: flaps up (<b>V</b> until FLAP 0° — check speed is below 85 kt first!) and ease power to ~75%. Trim with <b>X / Z</b> so she flies hands-off.",done:i=>i.advanced||i.flapDeg===0&&i.aglFt>600},{title:"Gentle turns",text:"Roll into a 20° bank with the mouse, then lead the rollout with opposite stick. Rudder into the turn (adverse yaw). Make one left and one right 90° turn.",done:i=>i.advanced||i.turnsDone>=2},{title:"Lesson complete 🎉",text:"You can take off, climb and turn. Press <b>T</b> to finish — try Lesson 2 (landing) from the menu, or keep free-flying!",done:i=>i.advanced}]},landing:{title:"Lesson 2 — Approach & Landing",steps:[{title:"You’re on final",text:"You’re 3 nm out, lined up with the runway at ~65 kt with full flaps. Your only job: keep the runway threshold steady in the windshield with small pitch/power corrections.",done:i=>i.advanced||i.aglFt<700},{title:"Stabilized: 65 kt, −500 fpm",text:"Aim for <b>65 kt (Vapp)</b> and about <b>−500 fpm</b>. Fast? Reduce power a touch. Slow? Add power — never pull up to stretch the glide (that’s how stalls happen).",done:i=>i.advanced||i.aglFt<400&&i.iasKt>55&&i.iasKt<80},{title:"Flare",text:"At ~30 ft, ease the mouse up to slow the descent — look at the far end of the runway, not the ground. Let the wheels kiss, nosewheel last.",done:i=>i.touchedDown},{title:"Rollout",text:"Power idle (<b>S</b> to 0%), rudder to stay centered, brakes (<b>B</b>) below 40 kt. Lesson complete when you stop on the runway! 🎉",done:i=>i.advanced||i.touchedDown&&i.iasKt<8}]}};function lS(){let i=null,e=0,t=0,n=0,s=0,r=null,o=!1,a=!1;document.addEventListener("flightsim-tut-next",()=>{a=!0}),document.addEventListener("flightsim-tut-skip",()=>{l()});function c(m){return i=ea[m]?m:null,e=0,t=0,n=0,s=0,r=null,o=!1,a=!1,i}function l(){i=null,e=0}function h(){return!!i}function f(m){if(m.hdgDeg==null||!m.airborne){r=m.hdgDeg;return}if(r==null){r=m.hdgDeg;return}let x=m.hdgDeg-r;x>180&&(x-=360),x<-180&&(x+=360),r=m.hdgDeg;const d=Math.sign(x);d!==0&&d!==n&&Math.abs(s)>60?(t++,s=0,n=d):d!==0&&n!==0&&d!==n?(s=x,n=d):(n===0&&d!==0&&(n=d),s+=x,Math.abs(s)>80&&(t++,s=0))}function u(m){if(!i)return null;m.touchedDown&&(o=!0),f({...m});const x=ea[i].steps,d={...m,turnsDone:t,touchedDown:o,advanced:a};if(x[e].done(d))if(a=!1,e<x.length-1)e++;else return{finished:!0,lesson:i,step:e,html:p(ea[i].title,e+1,x.length,"🎉 Lesson complete!","Head to the menu (Esc) for the next lesson, or press R and free-fly.")};const y=x[e];return{finished:!1,lesson:i,step:e,html:p(ea[i].title,e+1,x.length,y.title,y.text)}}function p(m,x,d,g,y){return`<b>${m} — step ${dd(x)}/${dd(d)}</b><br><br>✈️ <b>${g}</b><br>${y}<br><br><span style="opacity:.65">Press <b>T</b> to skip a step · <b>Esc</b> to exit lesson</span>`}return{start:c,stop:l,active:h,update:u}}const Of=1024,zf=512,Qn="#e8ecf2",ts="#8a93a3",Hl="#ff4444",Ta="#39d353",hS="#ffb020";function uS(i){const e=document.createElement("canvas");e.width=Of,e.height=zf;const t=e.getContext("2d"),n=new pn(e);n.anisotropy=4,n.colorSpace=un;const s=new et,r=new V(new he(1.55,.72,.16),new K({color:1711394,roughness:.85}));s.add(r);const o=new V(new Ct(1.5,.68),new mt({map:n}));o.position.z=.085,s.add(o);const a=new V(new he(1.6,.1,.42),new K({color:1053205,roughness:1}));a.position.set(0,.4,.1),s.add(a);const c=new et,l=new V(new Ue(.035,.035,.5),new K({color:546,roughness:.6}));l.rotation.x=1.1,l.position.set(0,-.18,.25);const h=new et,f=new V(new xh(.14,.025,8,24),new K({color:1118740,roughness:.5})),u=new V(new he(.26,.04,.03),new K({color:1118740,roughness:.5}));h.add(f,u),h.position.set(0,-.32,.42),c.add(l,h),s.add(c),i.add(s);let p=1;function m(d,g){h.rotation.z=-(d.rollIn||0)*1.1,h.position.y=-.32+(d.pitchIn||0)*.12,p+=g,!(p<.05)&&(p=0,fd(t,d),n.needsUpdate=!0)}fd(t,{}),n.needsUpdate=!0;function x(d){s.removeFromParent(),d.add(s)}return{update:m,mount:x}}const bs=(i,e,t,n)=>{i.beginPath(),i.arc(e,t,n,0,7)};function Qs(i,e,t,n,s){bs(i,e,t,n),i.fillStyle="#0b0d11",i.fill(),bs(i,e,t,n),i.lineWidth=3,i.strokeStyle="#3a4150",i.stroke(),i.fillStyle=ts,i.font="bold 17px monospace",i.textAlign="center",i.fillText(s,e,t+n-12)}function ta(i,e,t,n,s,r="#ff5b4d",o=4){const a=(s-90)*Math.PI/180;i.strokeStyle=r,i.lineWidth=o,i.lineCap="round",i.beginPath(),i.moveTo(e,t),i.lineTo(e+Math.cos(a)*n*.88,t+Math.sin(a)*n*.88),i.stroke(),bs(i,e,t,7),i.fillStyle="#22262e",i.fill()}function Fc(i,e,t,n,s,r,o,a,c){i.textAlign="center";for(let l=s;l<=r+1e-6;l+=a){const h=Gl(l,s,r),f=Math.abs((l-s)/o-Math.round((l-s)/o))<1e-6,u=n*(f?.78:.87),p=n*.95;i.strokeStyle=f?Qn:ts,i.lineWidth=f?3:1.5,i.beginPath(),i.moveTo(e+Math.cos(h)*u,t+Math.sin(h)*u),i.lineTo(e+Math.cos(h)*p,t+Math.sin(h)*p),i.stroke(),f&&c&&(i.fillStyle=Qn,i.font="bold 16px monospace",i.fillText(c(l),e+Math.cos(h)*n*.58,t+Math.sin(h)*n*.58+6))}}function Gl(i,e,t){return(-135+Math.max(0,Math.min(1,(i-e)/(t-e)))*270-90)*Math.PI/180}function fd(i,e){const t=e.iasKt||0,n=e.altFt||0,s=e.vsiFpm||0,r=e.hdgDeg||0,o=e.pitchDeg||0,a=e.rollDeg||0;i.fillStyle="#05070a",i.fillRect(0,0,Of,zf),Qs(i,105,120,92,"AIRSPEED KT"),Fc(i,105,120,92,0,160,20,10,p=>String(p)),pd(i,105,120,78,50,129,0,160,Ta),pd(i,105,120,78,129,160,0,160,hS),ta(i,105,120,92,-135+Math.max(0,Math.min(1,t/160))*270),Qs(i,315,120,92,"ATTITUDE"),i.save(),bs(i,315,120,84),i.clip(),i.translate(315,120),i.rotate(-a*Math.PI/180);const c=o*2.2;i.fillStyle="#2f6fd0",i.fillRect(-95,-95+c,190,95-c+95),i.fillStyle="#7a4a22",i.fillRect(-95,c,190,190),i.strokeStyle="#fff",i.lineWidth=2.5,i.beginPath(),i.moveTo(-95,c),i.lineTo(95,c),i.stroke(),i.fillStyle="#fff",i.font="bold 13px monospace",i.textAlign="center";for(let p=-20;p<=20;p+=10){if(!p)continue;const m=c-p*2.2;i.beginPath(),i.moveTo(-20,m),i.lineTo(20,m),i.stroke()}i.restore(),i.strokeStyle="#ffb020",i.lineWidth=5,i.beginPath(),i.moveTo(263,120),i.lineTo(301,120),i.lineTo(315,128),i.lineTo(329,120),i.lineTo(367,120),i.stroke(),Qs(i,525,120,92,"ALT FT"),Fc(i,525,120,92,0,10,2,1,p=>String(p));const l=n%1e3/100;ta(i,525,120,92,-135+l/10*270),ta(i,525,120,55,-135+n/1e4%1*270,"#e8ecf2",6),i.fillStyle="#0b0d11",i.fillRect(485,168,80,26),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(485,168,80,26),i.fillStyle=Qn,i.font="bold 20px monospace",i.textAlign="center",i.fillText(String(Math.round(n)).padStart(5,"0"),525,189),Qs(i,735,120,92,"TURN");const h=Math.max(-30,Math.min(30,a*.6));i.save(),i.translate(735,120),i.rotate(-h*Math.PI/180),i.fillStyle=Qn,i.fillRect(-46,-6,34,12),i.fillRect(12,-6,34,12),i.restore(),i.fillStyle=ts,i.font="bold 15px monospace",i.textAlign="center",i.fillText("L",677,124),i.fillText("R",793,124);const f=735+Math.max(-30,Math.min(30,-(e.betaDeg||0)*6));i.strokeStyle=ts,i.lineWidth=3,i.beginPath(),i.moveTo(701,168),i.lineTo(769,168),i.stroke(),bs(i,f,168,8),i.fillStyle="#111",i.fill(),bs(i,f,168,8),i.strokeStyle=Qn,i.lineWidth=2,i.stroke(),Qs(i,920,120,92,"HEADING"),i.save(),bs(i,920,120,84),i.clip(),i.translate(920,120),i.rotate(r*Math.PI/180),i.fillStyle="#0b0d11",i.fillRect(-90,-90,180,180),i.textAlign="center";for(let p=0;p<360;p+=10){const m=p*Math.PI/180,x=p%30===0;if(i.strokeStyle=x?Qn:ts,i.lineWidth=x?3:1.5,i.beginPath(),i.moveTo(Math.sin(m)*66,-Math.cos(m)*66),i.lineTo(Math.sin(m)*80,-Math.cos(m)*80),i.stroke(),x){const d={0:"N",90:"E",180:"S",270:"W"};i.fillStyle=Qn,i.font="bold 17px monospace",i.fillText(d[p]??String(p/10),Math.sin(m)*48,-Math.cos(m)*48+6)}}i.restore(),i.fillStyle="#ffb020",i.fillRect(917,28,6,16),Qs(i,105,356,92,"VSI FPM"),Fc(i,105,356,92,-2e3,2e3,1e3,500,p=>p===0?"0":String(Math.abs(p)/1e3)+""),ta(i,105,356,92,-135+(Math.max(-2e3,Math.min(2e3,s))+2e3)/4e3*270),md(i,235,320,200,"RPM",(e.rpm||0)/2700,String(Math.round(e.rpm||0))),md(i,235,368,200,"THR",e.throttle||0,Math.round((e.throttle||0)*100)+"%"),Oc(i,480,320,"STALL",e.stalled?Hl:null),Oc(i,620,320,e.gearDown?"GEAR DN":"GEAR UP",e.gearDown?Ta:Hl),Oc(i,760,320,"FLAP "+(e.flapDeg??0),(e.flapDeg??0)>0?Qn:null),i.fillStyle=ts,i.font="bold 15px monospace",i.textAlign="center",i.fillText("TRIM",900,312),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(850,320,100,12);const u=850+((e.trim??0)*.5+.5)*100;i.fillStyle=Qn,i.fillRect(u-3,318,6,16),i.fillStyle=ts,i.font="15px monospace",i.textAlign="left",i.fillText("Vr55 Vy74 Vfe85 Vapp65 Vno129 Vne163",235,420),i.fillStyle="#5a6373",i.fillText("N172FS · SKYHAWK",235,445)}function pd(i,e,t,n,s,r,o,a,c){const l=Gl(s,o,a)+Math.PI/2,h=Gl(r,o,a)+Math.PI/2;i.strokeStyle=c,i.lineWidth=6,i.beginPath(),i.arc(e,t,n,l,h),i.stroke()}function md(i,e,t,n,s,r,o){i.fillStyle=ts,i.font="bold 15px monospace",i.textAlign="left",i.fillText(s,e,t-6),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(e,t,n,16),i.fillStyle=r>.9?Hl:Ta,i.fillRect(e+2,t+2,(n-4)*Math.max(0,Math.min(1,r)),12),i.fillStyle=Qn,i.textAlign="right",i.fillText(o,e+n+62,t+14)}function Oc(i,e,t,n,s){i.fillStyle=s?"#2a0d0d":"#0b0d11",s===Ta&&(i.fillStyle="#0d2a14"),s===Qn&&(i.fillStyle="#1a2030"),gd(i,e-62,t-20,124,40,6),i.fill(),i.strokeStyle=s||"#2a3040",i.lineWidth=2,gd(i,e-62,t-20,124,40,6),i.stroke(),i.fillStyle=s||"#3a4150",i.font="bold 18px monospace",i.textAlign="center",i.fillText(n,e,t+6)}function gd(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}const xd={dawn:6.4,morning:9.5,noon:13,dusk:17.4,night:23.5},dS=new ke(10336470),fS=new ke(329742),pS=new ke(16773853),mS=new ke(16751181),gS=new ke(9087231);function xS(i,e,t){const n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)}function _S(i,e,t,n,s,r,o,a=[]){const l=new Float32Array(2700);for(let w=0;w<900;w++){const b=Math.random()*Math.PI*2,T=Math.asin(Math.random()*.98+.02),F=6e4;l[w*3]=Math.cos(b)*Math.cos(T)*F,l[w*3+1]=Math.sin(T)*F,l[w*3+2]=Math.sin(b)*Math.cos(T)*F}const h=new kt;h.setAttribute("position",new en(l,3));const f=new Ua({color:13621503,size:2.4,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1}),u=new dh(h,f);u.frustumCulled=!1,i.add(u);const p=new U(0,1,0),m=new U(0,1,0);let x=xd[o.startTOD]??10,d=1;const g=new ke,y=new ke;function v(w){const b=Math.max(2,o.dayLengthMin||12);x=(x+w*24/(b*60))%24;const T=(x-6)/12*Math.PI,F=Math.sin(T);p.set(Math.cos(T),Math.max(-.3,F),.35).normalize(),s.sunPosition.value.copy(p),d=xS(-.06,.14,F);const _=Math.max(0,1-Math.abs(F)*4);m.set(-p.x,Math.abs(p.y)+.45,-p.z).normalize();const S=F>-.02?p:m;t.userData.dir=S,t.intensity=F>-.02?.15+d*2.45:.22,F>-.02?y.copy(pS).lerp(mS,Math.min(1,_*1.4)):y.copy(gS),t.color.copy(y),n.intensity=.07+d*.68,g.copy(fS).lerp(dS,d),i.fog.color.copy(g);const D=o.weather||0;i.fog.near=D===2?400:D===1?900:2500,i.fog.far=D===2?9e3:D===1?17e3:3e4,e.toneMappingExposure=.55+d*.2,f.opacity=1-d;const I=d<.4;for(const P of r)P.visible=I;for(const P of a)P.emissiveIntensity=I?1.2:0}const M=()=>String(Math.floor(x)).padStart(2,"0"),A=()=>String(Math.floor(x%1*60)).padStart(2,"0");return{update:v,sunDir:p,reset:()=>{x=xd[o.startTOD]??10},isNight:()=>d<.45,clock:()=>`${M()}:${A()}`,icon:()=>d<.45?"🌙":d<.75?"🌅":"☀"}}function _d(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function vS(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d");return e.fillStyle="#9cf",e.font="bold 44px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText("Z",32,34),new pn(i)}function yS(i){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");t.clearRect(0,0,64,64);const n=32;if(i===3)t.fillStyle="#141414",t.fillRect(14,22,16,10),t.fillRect(34,22,16,10),t.fillRect(28,24,8,4);else{t.fillStyle="#1a1a1a";const r=i===1?3:0;t.beginPath(),t.arc(24-r,26,3.2,0,7),t.fill(),t.beginPath(),t.arc(40+r,26,3.2,0,7),t.fill(),t.fillRect(19-r,18,10,2.5),t.fillRect(35+r,18,10,2.5)}return t.strokeStyle="#5a2e22",t.lineWidth=2.5,t.beginPath(),i===2?t.arc(n,44,6,Math.PI*1.15,Math.PI*1.85):t.arc(n,40,6,Math.PI*.15,Math.PI*.85),t.stroke(),i===1&&(t.fillStyle="rgba(230,120,120,.6)",t.beginPath(),t.arc(18,36,4,0,7),t.fill(),t.beginPath(),t.arc(46,36,4,0,7),t.fill()),new pn(e)}const zc=[];function MS(i){return zc[i]||(zc[i]=new mt({map:yS(i),transparent:!0})),zc[i]}const vd=[15251850,1578e4,13208922,9067066,5913126],yd=[3828418,12728890,3843669,14203194,9063874,5096130,14711354,15263976,2764083,12745392],Md=[2764083,3824266,9075290,5921370,4877114,8010298],Sd=[1710618,4861466,9071162,12105912,8007214],Bc={};function Rt(i,e){return Bc[i]||(Bc[i]=e()),Bc[i]}const kc=new Map;function Pi(i,e=.9){const t=i+":"+e;return kc.has(t)||kc.set(t,new K({color:i,roughness:e})),kc.get(t)}function Aa(i={}){const e=i.rand||Math.random,t=i.gender?i.gender==="female":e()<.45,n=i.shirt??yd[Math.floor(e()*yd.length)],s=i.pants??Md[Math.floor(e()*Md.length)],r=i.skin??vd[Math.floor(e()*vd.length)],o=i.cap??null,a=new et,c=new et;a.add(c);const l=i.unique?new K({color:n,roughness:.9}):Pi(n),h=i.unique?new K({color:s,roughness:.9}):Pi(s),f=i.unique?new K({color:r,roughness:.8}):Pi(r,.8),u=(ee,xe)=>{const de=new V(ee,xe);return de.castShadow=!0,c.add(de),de},p=i.bodyType??(e()<.3?"thin":e()<.7?"avg":"stocky"),m=t?.23:p==="stocky"?.3:p==="thin"?.24:.27,x=t?p==="thin"?.09:.11:p==="stocky"?.13:.11,d=t?p==="thin"?.15:.17:p==="stocky"?.22:.2,g=.95,y=Rt("uleg",()=>{const ee=new Ue(.075,.065,.48,8);return ee.translate(0,-.24,0),ee}),v=Rt("lleg",()=>{const ee=new Ue(.065,.05,.42,8);return ee.translate(0,-.21,0),ee}),M=Rt("shoe",()=>new he(.14,.1,.32)),A=Pi(1842208,.7);function w(ee){const xe=new V(y,h);xe.castShadow=!0,xe.position.set(ee,g,0),c.add(xe);const de=new V(v,h);de.castShadow=!0,de.position.set(0,-.46,0),xe.add(de);const Re=new V(M,A);return Re.position.set(0,-.42,.06),Re.castShadow=!0,de.add(Re),xe}const b=w(-x),T=w(x);if(t&&(i.skirt??e()<.5)){const ee=u(Rt("skirt",()=>new Ue(.17,.26,.46,10)),h);ee.position.y=.76}const F=Rt(t?"torsoF2":"torsoM2",()=>{const xe=t?d*.92:d,de=d*.82;return new Ue(xe,de,.65,10)}),_=u(F,l);_.position.y=1.3;const S=Rt("belt",()=>new Ue(d*.85,d*.85,.05,10)),D=Pi(p==="stocky"?2763306:3811866,.85),I=u(S,D);I.position.y=.98;const P=u(Rt("collar2",()=>new Ue(.09,.12,.1,8)),l);P.position.y=1.63;const O=Rt("uarm",()=>{const ee=new Ue(.05,.045,.32,8);return ee.translate(0,-.16,0),ee}),N=Rt("larm",()=>{const ee=new Ue(.045,.035,.3,8);return ee.translate(0,-.15,0),ee}),W=Rt("hand2",()=>new jt(.055,8,6));function z(ee){const xe=new V(O,l);xe.castShadow=!0,xe.position.set(ee,1.55,0),c.add(xe);const de=new V(N,l);de.castShadow=!0,de.position.set(0,-.31,0),xe.add(de);const Re=new V(W,f);return Re.position.y=-.32,Re.castShadow=!0,de.add(Re),xe}const te=z(-m),ne=z(m),ce=u(Rt("neck2",()=>new Ue(.05,.055,.12,8)),f);ce.position.y=1.67;const Ae=u(Rt("head2",()=>new jt(.14,14,10)),f);Ae.position.y=1.83;for(const ee of[-1,1]){const xe=new V(Rt("ear",()=>new jt(.03,6,5)),f);xe.position.set(ee*.135,1.83,0),xe.scale.set(.6,1,.7),c.add(xe)}const Le=new V(new Ct(.2,.2),MS(Math.floor(e()*4)));Le.position.set(0,1.83,.13),c.add(Le);let X=null;const ae=Sd[Math.floor(e()*Sd.length)];if(o!=null){X=i.unique?new K({color:o,roughness:.8}):Pi(o,.8);const ee=u(Rt("cap2",()=>new Ue(.13,.155,.12,10)),X);ee.position.y=1.94,u(Rt("brim2",()=>new he(.22,.03,.17)),X).position.set(0,1.9,.16)}else{const ee=i.hair??(t&&e()<.55?"long":["short","short","afro","bald","buzz","ponytail"][Math.floor(e()*6)]),xe=Pi(ae,1);if(ee==="long")u(Rt("mane2",()=>new he(.22,.48,.12)),xe).position.set(0,1.64,-.12);else if(ee==="afro"){const de=u(Rt("afro2",()=>new jt(.175,10,8)),xe);de.position.y=1.88}else if(ee==="buzz"){const de=u(Rt("buzz",()=>new jt(.145,10,8)),xe);de.scale.y=.65,de.position.y=1.9}else if(ee==="ponytail"){const de=u(Rt("ptop",()=>new jt(.14,10,8)),xe);de.scale.y=.6,de.position.y=1.9;const Re=u(Rt("ptail",()=>new Ue(.03,.025,.28,6)),xe);Re.position.set(0,1.72,-.12),Re.rotation.x=.4}else if(ee!=="bald"){const de=u(Rt("top2",()=>new jt(.145,10,8)),xe);de.scale.y=.55,de.position.y=1.9}}if(!o&&e()<.15){const ee=new V(new he(.22,.04,.02),Pi(1118481,.3));ee.position.set(0,1.85,.135),c.add(ee)}!t&&p!=="thin"&&e()<.12&&u(Rt("bp",()=>new he(.22,.32,.12)),Pi(3820122,.85)).position.set(0,1.35,-.16),a.scale.setScalar(.93+e()*.12);let ge=null;return{group:a,rig:c,armL:te,armR:ne,legL:b,legR:T,head:Ae,body:_,mats:{shirt:l,pants:h,skin:f,cap:X},walkPhase:Math.random()*7,zzz(){return ge||(ge=new Bt(new Dt({map:vS(),transparent:!0,depthWrite:!1})),ge.scale.set(.8,.8,1),a.add(ge)),ge.visible=!0,ge},hideZzz(){ge&&(ge.visible=!1)}}}function wd(i,e,t,n,s=6){let o=Math.atan2(e-i.position.x,t-i.position.z)-i.rotation.y;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;return i.rotation.y+=Math.max(-s*n,Math.min(s*n,o)),Math.abs(o)<.2}function SS(i,e){const t=_d(99),n=[],s=(u,p,m,x)=>{const d=_d(x);for(let g=0;g<m;g++){const y=Aa({rand:d,cap:d()<.35?3355443:null}),v=u+(d()-.5)*160,M=p+(d()-.5)*160,A=[];for(let w=0;w<5;w++)A.push({x:u+(d()-.5)*260,z:p+(d()-.5)*260});i.add(y.group),n.push({p:y,home:{x:v,z:M},wps:A,wpi:Math.floor(d()*5),idleT:0,sleeping:!1})}};s(-330,860,7,7),s(8500,7500,4,42),s(-7e3,1500,5,5),s(-1200,-5300,2,6),s(2620,2080,2,7);const r=Aa({shirt:14182942,pants:3357252,cap:14182942,gender:"female",hair:"long"});i.add(r.group);const o=[],a=[12728890,3828418,14721056];(e||[]).forEach((u,p)=>{if(!u.length)return;const m=new et,x=new K({color:a[p%3],roughness:.4,metalness:.3}),d=new K({color:1053980,roughness:.1,metalness:.8}),g=new V(new he(2,.9,4.2),x);g.position.y=.85,g.castShadow=!0;const y=new V(new he(1.7,.7,2.2),d);y.position.set(0,1.5,-.2),y.castShadow=!0,m.add(g,y);const v=[],M=new Ue(.42,.42,.35,12),A=new K({color:1315860,roughness:.9});for(const[w,b]of[[-.95,1.4],[.95,1.4],[-.95,-1.4],[.95,-1.4]]){const T=new V(M,A);T.rotation.z=Math.PI/2,T.position.set(w,.42,b),m.add(T),v.push(T)}i.add(m),o.push({g:m,wheels:v,loop:u,seg:Math.floor(t()*u.length),speed:8+t()*3})});function c(u,p,m,x){for(const d of n){const{p:g}=d,y=g.group.position.x,v=g.group.position.z;if(m){const M=d.home.x-y,A=d.home.z-v;if(Math.hypot(M,A)>3?(l(g,d.home.x,d.home.z,u,1.6),d.sleeping=!1,g.hideZzz()):d.sleeping||(d.sleeping=!0),d.sleeping){const w=Be(y,v);g.group.position.y+=(w+.3-g.group.position.y)*Math.min(1,3*u),g.rig.rotation.x+=(-Math.PI/2-g.rig.rotation.x)*Math.min(1,3*u),g.zzz().position.set(.5,1.2+Math.sin(p*2)*.15,0)}continue}if(d.sleeping=!1,g.hideZzz(),g.rig.rotation.x+=(0-g.rig.rotation.x)*Math.min(1,5*u),d.idleT>0)d.idleT-=u,h(g,p);else{const M=d.wps[d.wpi];l(g,M.x,M.z,u,1.5)&&(d.wpi=(d.wpi+1)%d.wps.length,d.idleT=2+Math.random()*5)}}{const d=Be(Qi.x,Qi.z);r.group.position.set(Qi.x,d,Qi.z),(x?Math.hypot(x.x-Qi.x,x.z-Qi.z):99)<12?(wd(r.group,x.x,x.z,u,8),r.armR.rotation.x=-2.4+Math.sin(p*7)*.45,r.armL.rotation.x=Math.sin(p*1.7)*.06):(r.group.rotation.y+=u*.15,h(r,p))}for(const d of o){if(d.taken)continue;if(m){const T=d.loop[0];d.g.position.set(T.x,Be(T.x,T.z)+.15,T.z);continue}const g=d.loop[d.seg%d.loop.length],y=d.loop[(d.seg+1)%d.loop.length],v=y.x-d.g.position.x,M=y.z-d.g.position.z,A=Math.hypot(v,M);if(A<4){d.seg=(d.seg+1)%d.loop.length;continue}d.g.position.lengthSq()===0&&d.g.position.set(g.x,0,g.z);const w=v/A,b=M/A;d.g.position.x+=w*d.speed*u,d.g.position.z+=b*d.speed*u,d.g.position.y=Be(d.g.position.x,d.g.position.z)+.15,d.g.rotation.y=Math.atan2(w,b);for(const T of d.wheels)T.rotation.x+=d.speed*u/.42}}function l(u,p,m,x,d){const g=wd(u.group,p,m,x),y=p-u.group.position.x,v=m-u.group.position.z,M=Math.hypot(y,v),A=g&&M>2;A&&(u.group.position.x+=y/M*d*x,u.group.position.z+=v/M*d*x);const w=Be(u.group.position.x,u.group.position.z);u.group.position.y+=((w<1?1:w)-u.group.position.y)*Math.min(1,5*x),u.walkPhase+=x*(A?d*3.4:1.2);const b=A?.55:.05;return u.legL.rotation.x=Math.sin(u.walkPhase)*b,u.legR.rotation.x=-Math.sin(u.walkPhase)*b,u.armL.rotation.x=-Math.sin(u.walkPhase)*b*.8,u.armR.rotation.x=Math.sin(u.walkPhase)*b*.8,u.rig.position.y=A?Math.abs(Math.sin(u.walkPhase))*.05:0,M<2.5}function h(u,p){u.legL.rotation.x*=.9,u.legR.rotation.x*=.9,u.armL.rotation.x=Math.sin(p*1.7)*.06,!(u.armR.rotation.x<-1)&&(u.armR.rotation.x=Math.sin(p*1.7+1)*.06,u.rig.position.y=Math.sin(p*2.2)*.015)}function f(u,p,m=7){let x=null,d=m;for(const g of o){if(g.taken)continue;const y=Math.hypot(g.g.position.x-u,g.g.position.z-p);y<d&&(d=y,x=g)}return x}return{update:c,marta:r,cars:o,nearestCar:f,townsfolk:n}}function wS(i,e){const t=Aa({shirt:3037756,pants:2764083,cap:15658734,unique:!0});t.group.visible=!1,i.add(t.group);const n=new U;let s=0,r=-.18;const o=new Set;addEventListener("keydown",x=>o.add(x.code)),addEventListener("keyup",x=>o.delete(x.code)),document.addEventListener("mousemove",x=>{document.pointerLockElement!==document.body||!t.group.visible||(s-=x.movementX*.0026,r=Math.max(-.9,Math.min(.45,r-x.movementY*.0022)))});function a(x,d,g,y){n.set(x,d,g),s=y,t.group.visible=!0,u()}function c(){t.group.visible=!1,o.clear()}function l(){return t.group.visible}function h(x,d){s-=x*.0026,r=Math.max(-.9,Math.min(.45,r-d*.0022))}function f(x={}){x.shirt!=null&&t.mats.shirt.color.setHex(x.shirt),x.pants!=null&&t.mats.pants.color.setHex(x.pants),x.cap!=null&&t.mats.cap&&t.mats.cap.color.setHex(x.cap)}function u(x){t.group.position.copy(n),t.group.rotation.y=s+Math.PI}const p=new U;function m(x){if(!t.group.visible)return;const d=(o.has("KeyW")?1:0)-(o.has("KeyS")?1:0),g=(o.has("KeyD")?1:0)-(o.has("KeyA")?1:0),v=o.has("ShiftLeft")||o.has("ShiftRight")?7:4,M=d!==0||g!==0;if(M){const D=Math.sin(s),I=Math.cos(s),P=-D,O=-I,N=I,W=-D;n.x+=(P*d+N*g)*v*x,n.z+=(O*d+W*g)*v*x;const z=P*d+N*g,te=O*d+W*g;let ce=Math.atan2(z,te)-t.group.rotation.y;for(;ce>Math.PI;)ce-=Math.PI*2;for(;ce<-Math.PI;)ce+=Math.PI*2;t.group.rotation.y+=ce*Math.min(1,12*x)}const A=Be(n.x,n.z);n.y+=((A<.5?.5:A)-n.y)*Math.min(1,12*x),t.group.position.copy(n),t.walkPhase+=x*(M?v*2.4:1.2);const w=M?.6:.04;t.legL.rotation.x=Math.sin(t.walkPhase)*w,t.legR.rotation.x=-Math.sin(t.walkPhase)*w,t.armL.rotation.x=-Math.sin(t.walkPhase)*w*.8,t.armR.rotation.x=Math.sin(t.walkPhase)*w*.8,t.rig.position.y=M?Math.abs(Math.sin(t.walkPhase))*.06:Math.sin(t.walkPhase*.4)*.015;const b=5.2,T=2.1,F=n.x+Math.sin(s)*Math.cos(r)*b,_=n.z+Math.cos(s)*Math.cos(r)*b,S=Math.max(n.y+1.5+Math.sin(-r)*b*.9,Be(F,_)+.5);e.position.set(F,S,_),p.set(n.x-F,0,n.z-_),e.lookAt(n.x,n.y+T,n.z)}return{place:a,hide:c,active:l,addLook:h,setOutfit:f,update:m,pos:n,keys:o}}const bS=["marta-hi","marta-job","marta-nice","marta-bye","marta-cash","les-rotate","les-climb","les-flaps","les-final","les-flare","les-stall","atc-takeoff","atc-land","atc-wind","atc-grease","atc-taxi","tower-hello","folk-hi1","folk-hi2","folk-hi3","folk-hi4","shop-hi"];function ES(){try{return localStorage.getItem("flightsim-muted")==="1"}catch{return!1}}const dn={muted:ES(),_last:{},_ok:{},toggle(){this.muted=!this.muted;try{localStorage.setItem("flightsim-muted",this.muted?"1":"0")}catch{}return this.muted},play(i,e=0){if(this.muted||!bS.includes(i))return!1;const t=performance.now()/1e3;if(e>0&&t-(this._last[i]||-1e9)<e)return!1;this._last[i]=t;try{const n=new Audio(`audio/${i}.mp3`);return n.volume=.9,n.play().catch(()=>{}),!0}catch{return!1}},playRandom(i,e=20){if(this.muted||!i.length)return!1;const t=performance.now()/1e3;return t-(this._last._rand||-1e9)<e?!1:(this._last._rand=t,this.play(i[Math.floor(Math.random()*i.length)]))}};function Ni(i,e){try{return JSON.parse(localStorage.getItem(i))??e}catch{return e}}function Jn(i,e){try{localStorage.setItem(i,JSON.stringify(e))}catch{}}const Ve={money:Ni("flightsim-money",100),items:new Set(Ni("flightsim-items",[])),paints:Ni("flightsim-paints",{}),aircraft:new Set(Ni("flightsim-aircraft",["skyhawk"])),selected:Ni("flightsim-selected","skyhawk"),outfits:new Set(Ni("flightsim-outfits",["aviator"])),outfit:Ni("flightsim-outfit","aviator"),add(i){this.money+=i,Jn("flightsim-money",this.money)},spend(i){return this.money<i?!1:(this.money-=i,Jn("flightsim-money",this.money),!0)},has(i){return this.items.has(i)},give(i){this.items.add(i),Jn("flightsim-items",[...this.items])},take(i){this.items.delete(i),Jn("flightsim-items",[...this.items])},setPaint(i,e){this.paints[i]=e,Jn("flightsim-paints",this.paints)},paintFor(i){return this.paints[i]||null},ownAircraft(i){this.aircraft.add(i),Jn("flightsim-aircraft",[...this.aircraft])},selectAircraft(i){this.selected=i,Jn("flightsim-selected",i)},wearOutfit(i){this.outfit=i,Jn("flightsim-outfit",i)},ownOutfit(i){this.outfits.add(i),Jn("flightsim-outfits",[...this.outfits])}},Ps=[{id:"skyhawk",name:"✈️ Skyhawk 172",price:0,desc:"Trusty trainer. Balanced, forgiving, yours.",specs:{},look:{wing:"high",tires:"std",body:16054008,accent:11737883,reg:"N172FS"}},{id:"duster",name:"🌾 CropHopper Duster",price:1500,desc:"Light low-wing workhorse. Leaps off short strips, cruises slow.",specs:{mass:720,wingArea:14,thrustMax:4300,CD0:.042,CLflap:.7,Vr:22},look:{wing:"low",tires:"std",hopper:!0,body:15913276,accent:2783786,reg:"N-DUST"}},{id:"falcon",name:"🚀 Falcon S Sport",price:3500,desc:"Fast and twitchy low-wing rocket. Not for beginners.",specs:{mass:800,wingArea:12,thrustMax:7800,CD0:.026,CL0:.2,Vr:30},look:{wing:"low",tires:"std",canopy:!0,body:14212320,accent:12720923,reg:"N-FAST"}},{id:"bush",name:"🏔️ Tundra King",price:2500,desc:"Big tires, huge flaps. Grass strips fear it.",specs:{mass:950,wingArea:17.5,CLflap:.75,CDflap:.11,thrustMax:5600,Vr:20,gearHeight:1.25},look:{wing:"high",tires:"tundra",body:3828538,accent:2236962,reg:"N-BUSH"}}],Bf=[{id:"aviator",name:"🧥 Aviator Jacket",price:0,colors:{shirt:3037756,pants:2764083,cap:15658734}},{id:"hawaiian",name:"🌺 Hawaiian Shirt",price:75,colors:{shirt:2005642,pants:12759680,cap:14201434}},{id:"parka",name:"🧣 Alpine Parka",price:120,colors:{shirt:14711328,pants:2767450,cap:12724778}},{id:"tux",name:"🤵 Tuxedo",price:200,colors:{shirt:1315860,pants:1315860,cap:1315860}},{id:"captain",name:"🧑‍✈️ Captain",price:350,colors:{shirt:1714778,pants:15263976,cap:16777215}}];function TS(){return{liftMul:Ve.has("stol")?1.12:1,critBonus:Ve.has("vg")?2*Math.PI/180:0,powerMul:Ve.has("turbo")?1.12:1,rollDecel:Ve.has("tundra")?.12:.3}}const Vl=[{id:"binoculars",name:"🔭 Binoculars",price:150,desc:"Hold RIGHT MOUSE to zoom in flight."},{id:"paint-blue",name:"🎨 Ocean Blue paint",price:100,paint:2777026,desc:"Repaint your current plane."},{id:"paint-orange",name:"🎨 Sunset Orange paint",price:100,paint:14711328,desc:"Repaint your current plane."},{id:"paint-black",name:"🎨 Stealth Black paint",price:250,paint:2303531,desc:"Repaint your current plane. Spooky."},{id:"vg",name:"🌀 Vortex Generators",price:350,desc:"+2° stall angle. Forgiving wings."},{id:"stol",name:"🛬 STOL Kit",price:600,desc:"+12% lift. Short strips love it."},{id:"turbo",name:"⚡ Turbocharger",price:800,desc:"+12% engine power."},{id:"tundra",name:"🛞 Tundra Tires",price:250,desc:"Grass strips feel like pavement."},{id:"chute2",name:"🪂 Cruiser Canopy",price:400,desc:"Faster canopy: 14 m/s forward flight. (Chutes are free — this is an upgrade.)"},{id:"chute3",name:"🪂🪂 Speedster Canopy",price:900,desc:"Race canopy: 20 m/s forward, sporty sink. Needs Cruiser."},{id:"spotlight",name:"💡 Landing Light Pro",price:200,desc:"A real spotlight for night ops."}];function kf(){return Ve.has("chute3")?3:Ve.has("chute2")?2:1}function AS(i={}){const{onPaint:e=()=>{},onAircraft:t=()=>{},onOutfit:n=()=>{}}=i,s=document.getElementById("shop"),r=document.getElementById("shop-items"),o=document.getElementById("shop-money");let a=!1;document.getElementById("shop-close")?.addEventListener("click",()=>p());const c=(m,x,d)=>{const g=document.createElement("button");return g.className="btn",g.textContent=m,g.disabled=!!x,x||(g.onclick=d),g},l=(m,x,d)=>{const g=document.createElement("div");g.className="shop-row",g.innerHTML=`<div><b>${m}</b><br><small>${x}</small></div>`,g.appendChild(d),r.appendChild(g)},h=m=>{const x=document.createElement("div");x.className="shop-sec",x.textContent=m,r.appendChild(x)};function f(){o.textContent="$"+Ve.money,r.innerHTML="",h("✈️ AIRCRAFT — buying or selecting swaps your plane instantly");for(const m of Ps){const x=Ve.aircraft.has(m.id),d=Ve.selected===m.id,g=d?' <span class="vtag">FLYING</span>':"";x?l(m.name+g,m.desc,c(d?"FLYING":"SELECT",d,()=>{t(m.id),f()})):l(m.name+g,`${m.desc} — <b>$${m.price}</b>`,c(`BUY $${m.price}`,Ve.money<m.price,()=>{Ve.spend(m.price)&&(Ve.ownAircraft(m.id),t(m.id),f())}))}h("🔧 UPGRADES — apply to every plane you own");for(const m of Vl.filter(x=>!x.paint)){const x=Ve.has(m.id),d=m.id==="chute3"&&!Ve.has("chute2");x&&!m.consumable?l(`${m.name} <span class="vtag">OWNED</span>`,m.desc,c("OWNED",!0)):d?l(m.name,`${m.desc} — <b>$${m.price}</b>`,c("NEEDS CRUISER",!0)):l(m.name,`${m.desc} — <b>$${m.price}</b>`,c(`BUY $${m.price}`,Ve.money<m.price,()=>{Ve.spend(m.price)&&(Ve.give(m.id),f())}))}h(`🎨 PAINT — for your ${Ps.find(m=>m.id===Ve.selected)?.name||"plane"}`);for(const m of Vl.filter(x=>x.paint)){const x=Ve.has(m.id),d=Ve.paintFor(Ve.selected)===m.id;x?l(`${m.name}${d?' <span class="vtag">APPLIED</span>':""}`,m.desc,c(d?"ON":"APPLY",d,()=>{Ve.setPaint(Ve.selected,m.id),e(m.paint),f()})):l(m.name,`${m.desc} — <b>$${m.price}</b>`,c(`BUY $${m.price}`,Ve.money<m.price,()=>{Ve.spend(m.price)&&(Ve.give(m.id),Ve.setPaint(Ve.selected,m.id),e(m.paint),f())}))}h("👕 PILOT OUTFITS — look sharp on foot");for(const m of Bf){const x=Ve.outfits.has(m.id),d=Ve.outfit===m.id;x?l(`${m.name}${d?' <span class="vtag">WORN</span>':""}`,"In your closet",c(d?"WORN":"WEAR",d,()=>{Ve.wearOutfit(m.id),n(m.colors),f()})):l(m.name,`Strut around town — <b>$${m.price}</b>`,c(`BUY $${m.price}`,Ve.money<m.price,()=>{Ve.spend(m.price)&&(Ve.ownOutfit(m.id),Ve.wearOutfit(m.id),n(m.colors),f())}))}}function u(m){if(a=!0,document.exitPointerLock?.(),m){const x=document.getElementById("shop-title");x&&(x.textContent=m)}s.classList.remove("hidden"),Ve.money<150?dn.play("marta-job"):dn.play("shop-hi"),f()}function p(){a=!1,s.classList.add("hidden")}return{open:u,close:p,isOpen:()=>a,refresh:f}}const Wl=[{id:"marta",name:"Say hello to Marta",hint:"Walk up to Marta by the hangars (E to talk)",reward:50},{id:"takeoff",name:"First Solo",hint:"Take off from any runway",reward:200},{id:"clouds",name:"Cloud Surfer",hint:"Climb above 3,000 ft",reward:150},{id:"coral",name:"Coral Hopper",hint:"Land on the Coral Strip (SE island)",reward:400},{id:"sights",name:"Sightseer",hint:"Discover 3 sights (follow blue beacons)",reward:300},{id:"grease",name:"Greaser",hint:"Land softer than 150 fpm",reward:350,item:"chute2"},{id:"night",name:"Night Owl",hint:"Be airborne at night",reward:250},{id:"tour",name:"Three-Strip Tour",hint:"Land at all 3 airstrips",reward:800},{id:"balloon",name:"Balloon Chaser",hint:"Fly within 600 ft of a hot-air balloon",reward:300},{id:"far",name:"Long Haul",hint:"Fly 15 km from the home airport",reward:350},{id:"buzz",name:"Rooftop Buzz",hint:"Skim Harborview below 300 ft",reward:250},{id:"nightlanding",name:"Night Landing",hint:"Land after dark",reward:450},{id:"northstrip",name:"Mountain Goat",hint:"Land the lonely North Strip",reward:500},{id:"sights6",name:"Globetrotter",hint:"Discover 6 sights",reward:600},{id:"aerobat",name:"Aerobat",hint:"Bank past 60° in flight",reward:200},{id:"speed",name:"Speed Demon",hint:"Top 140 kt",reward:200},{id:"storm",name:"Storm Chaser",hint:"Fly in storm weather",reward:350},{id:"cartographer",name:"Cartographer",hint:"Discover 10 sights",reward:700},{id:"driver",name:"Sunday Driver",hint:"Drive 1 km around town",reward:250},{id:"dive",name:"Geronimo",hint:"Skydive out and walk away (J)",reward:400}];function RS(){const i=new Set(Ni("flightsim-quests",[])),e=new Set(Ni("flightsim-strips",[])),t=Object.fromEntries(Wl.map(a=>[a.id,a]));let n=()=>{};function s(a){!a||i.has(a.id)||(i.add(a.id),Jn("flightsim-quests",[...i]),Ve.add(a.reward),a.item&&!Ve.has(a.item)&&Ve.give(a.item),n(a))}function r(a,c={}){a==="marta"&&s(t.marta),a==="takeoff"&&s(t.takeoff),a==="alt"&&c.ft>3e3&&s(t.clouds),a==="touchdown"&&c.strip==="coral"&&s(t.coral),a==="sights"&&c.n>=3&&s(t.sights),a==="sights"&&c.n>=6&&s(t.sights6),a==="sights"&&c.n>=10&&s(t.cartographer),a==="balloon"&&s(t.balloon),a==="far"&&s(t.far),a==="buzz"&&s(t.buzz),a==="nightlanding"&&s(t.nightlanding),a==="northstrip"&&s(t.northstrip),a==="aerobat"&&s(t.aerobat),a==="speed"&&s(t.speed),a==="storm"&&s(t.storm),a==="driver"&&s(t.driver),a==="dive"&&s(t.dive),a==="touchdown"&&c.fpm!=null&&-c.fpm<150&&c.airborne&&s(t.grease),a==="nightair"&&s(t.night),a==="touchdown"&&c.strip&&(e.add(c.strip),Jn("flightsim-strips",[...e]),e.has("main")&&e.has("coral")&&e.has("north")&&s(t.tour))}function o(){return Wl.find(a=>!i.has(a.id))}return{done:i,notify:r,next:o,onComplete:a=>n=a,strips:e}}function CS(i){const e=document.getElementById("dialogue");let t=!1;document.getElementById("dlg-close")?.addEventListener("click",()=>s());function n(){t=!0,document.exitPointerLock?.(),i.notify("marta"),dn.play(i.done.size>3?"marta-nice":"marta-hi");const r=i.next();document.getElementById("dlg-quests").innerHTML=Wl.map(o=>`<div class="qrow ${i.done.has(o.id)?"qdone":""}">${i.done.has(o.id)?"✅":"◈"} <b>${o.name}</b> — $${o.reward}${o.item?" + 🎁":""}<br><small>${o.hint}</small></div>`).join(""),document.getElementById("dlg-next").innerHTML=r?`Next up: <b>${r.name}</b> — ${r.hint}`:"You're done, ace! All quests complete. 🏆",e.classList.remove("hidden")}function s(){t=!1,e.classList.add("hidden")}return{open:n,close:()=>{s(),dn.play("marta-bye",30)},isOpen:()=>t}}function PS(i){const e=document.getElementById("quest-tracker");e&&(i?(e.classList.remove("hidden"),e.innerHTML=i):e.classList.add("hidden"))}const ji=18500,Zi=150;function LS(i){return i<.5?[16,60,110]:i<2.5?[118,110,80]:i<45?[46,80,40]:i<150?[30,58,32]:i<260?[74,70,62]:[150,150,155]}function IS(){const i=document.createElement("div");i.id="minimap";const e=document.createElement("canvas");e.width=e.height=180,i.appendChild(e),document.body.appendChild(i);const t=e.getContext("2d"),n=document.createElement("canvas");n.width=n.height=Zi;const s=n.getContext("2d"),r=s.createImageData(Zi,Zi);for(let u=0;u<Zi;u++)for(let p=0;p<Zi;p++){const m=(p+.5)/Zi*2*ji-ji,x=(u+.5)/Zi*2*ji-ji,[d,g,y]=LS(Be(m,x)),v=(u*Zi+p)*4;r.data[v]=d,r.data[v+1]=g,r.data[v+2]=y,r.data[v+3]=255}s.putImageData(r,0,0);let o=!1,a=!1;i.addEventListener("click",()=>{o=!o,i.classList.toggle("big",o),e.width=e.height=o?300:180});const c=(u,p,m)=>[(u+ji)/(2*ji)*m,(p+ji)/(2*ji)*m];let l=1;function h(u,p){if(l+=p,l<.12||a)return;l=0;const m=e.width;t.clearRect(0,0,m,m),t.save(),t.beginPath(),t.arc(m/2,m/2,m/2,0,7),t.clip(),t.drawImage(n,0,0,m,m),t.strokeStyle="#fff",t.lineWidth=o?3:2;const x=(v,M,A,w)=>{const[b,T]=c(v,M-A,m),[F,_]=c(v,M+A,m);t.beginPath(),t.moveTo(b,T),t.lineTo(F,_),t.stroke()};x(0,0,xt.halfLen),x(zt.x,zt.z,zt.halfLen),x(Zt.x,Zt.z,Zt.halfLen),x(ri.x,ri.z,ri.halfLen),x(oi.x,oi.z,oi.halfLen),x(ai.x,ai.z,ai.halfLen),x(ci.x,ci.z,ci.halfLen),t.fillStyle="#4dff88",t.font=`bold ${o?13:10}px monospace`,t.textAlign="center";for(const v of Lf){const[M,A]=c(v.x,v.z,m);t.fillText("$",M,A+(o?4:3))}hs.forEach((v,M)=>{const[A,w]=c(v.x,v.z,m),b=u.sightsFound&&u.sightsFound.has(M);t.fillStyle=b?"rgba(160,170,190,.7)":"#ffcf4d",t.beginPath(),t.arc(A,w,o?5:3.5,0,7),t.fill(),b||(t.strokeStyle="rgba(255,207,77,.5)",t.beginPath(),t.arc(A,w,o?9:6.5,0,7),t.stroke())});const[d,g]=c(u.x,u.z,m);t.save(),t.translate(d,g),t.rotate((u.hdgDeg||0)*Math.PI/180),t.fillStyle=u.onFoot?"#7dff9a":"#fff",t.strokeStyle="#000",t.lineWidth=2;const y=o?11:8;t.beginPath(),t.moveTo(0,-y),t.lineTo(y*.7,y*.8),t.lineTo(0,y*.35),t.lineTo(-y*.7,y*.8),t.closePath(),t.fill(),t.stroke(),t.restore(),t.fillStyle="#fff",t.font=`bold ${o?16:12}px monospace`,t.textAlign="center",t.fillText("N",m/2,o?18:14),t.restore(),t.strokeStyle="rgba(140,190,255,.6)",t.lineWidth=3,t.beginPath(),t.arc(m/2,m/2,m/2-1.5,0,7),t.stroke()}function f(u){a=u,i.style.display=u?"none":"block"}return{update:h,setHidden:f,isHidden:()=>a}}const na=1400,On=130;function DS(i){const e=new Float32Array(na*3),t=new Float32Array(na);for(let c=0;c<na;c++)e[c*3]=(Math.random()-.5)*On,e[c*3+1]=Math.random()*On,e[c*3+2]=(Math.random()-.5)*On,t[c]=28+Math.random()*22;const n=new kt;n.setAttribute("position",new en(e,3));const s=new Ua({color:11191517,size:.32,transparent:!0,opacity:.55,depthWrite:!1}),r=new dh(n,s);r.frustumCulled=!1,r.visible=!1,i.add(r);function o(c,l,h,f,u=!1){e[c*3]=l+(Math.random()-.5)*On,e[c*3+1]=u?h+On/2:h+(Math.random()-.5)*On,e[c*3+2]=f+(Math.random()-.5)*On}function a(c,l,h){if(!h){r.visible=!1;return}r.visible=!0,s.opacity=h===2?.7:.45;const f=l.x,u=l.y,p=l.z,m=h===2?1.5:1;for(let x=0;x<na;x++){let d=e[x*3+1]-t[x]*m*c;d<u-On/2?o(x,f,u,p,!0):(Math.abs(e[x*3]-f)>On&&(e[x*3]=f+(Math.random()-.5)*On),Math.abs(e[x*3+2]-p)>On&&(e[x*3+2]=p+(Math.random()-.5)*On),e[x*3+1]=d)}n.attributes.position.needsUpdate=!0}return{update:a}}class NS extends by{constructor(e){super(e),this.type=Fi}parse(e){const o=function(T,F){switch(T){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(F||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(F||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(F||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(F||""))}},h=`
`,f=function(T,F,_){F=F||1024;let D=T.pos,I=-1,P=0,O="",N=String.fromCharCode.apply(null,new Uint16Array(T.subarray(D,D+128)));for(;0>(I=N.indexOf(h))&&P<F&&D<T.byteLength;)O+=N,P+=N.length,D+=128,N+=String.fromCharCode.apply(null,new Uint16Array(T.subarray(D,D+128)));return-1<I?(T.pos+=P+I+1,O+N.slice(0,I)):!1},u=function(T){const F=/^#\?(\S+)/,_=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,S=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,D=/^\s*FORMAT=(\S+)\s*$/,I=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,P={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let O,N;for((T.pos>=T.byteLength||!(O=f(T)))&&o(1,"no header found"),(N=O.match(F))||o(3,"bad initial token"),P.valid|=1,P.programtype=N[1],P.string+=O+`
`;O=f(T),O!==!1;){if(P.string+=O+`
`,O.charAt(0)==="#"){P.comments+=O+`
`;continue}if((N=O.match(_))&&(P.gamma=parseFloat(N[1])),(N=O.match(S))&&(P.exposure=parseFloat(N[1])),(N=O.match(D))&&(P.valid|=2,P.format=N[1]),(N=O.match(I))&&(P.valid|=4,P.height=parseInt(N[1],10),P.width=parseInt(N[2],10)),P.valid&2&&P.valid&4)break}return P.valid&2||o(3,"missing format specifier"),P.valid&4||o(3,"missing image size specifier"),P},p=function(T,F,_){const S=F;if(S<8||S>32767||T[0]!==2||T[1]!==2||T[2]&128)return new Uint8Array(T);S!==(T[2]<<8|T[3])&&o(3,"wrong scanline width");const D=new Uint8Array(4*F*_);D.length||o(4,"unable to allocate buffer space");let I=0,P=0;const O=4*S,N=new Uint8Array(4),W=new Uint8Array(O);let z=_;for(;z>0&&P<T.byteLength;){P+4>T.byteLength&&o(1),N[0]=T[P++],N[1]=T[P++],N[2]=T[P++],N[3]=T[P++],(N[0]!=2||N[1]!=2||(N[2]<<8|N[3])!=S)&&o(3,"bad rgbe scanline format");let te=0,ne;for(;te<O&&P<T.byteLength;){ne=T[P++];const Ae=ne>128;if(Ae&&(ne-=128),(ne===0||te+ne>O)&&o(3,"bad scanline data"),Ae){const Le=T[P++];for(let X=0;X<ne;X++)W[te++]=Le}else W.set(T.subarray(P,P+ne),te),te+=ne,P+=ne}const ce=S;for(let Ae=0;Ae<ce;Ae++){let Le=0;D[I]=W[Ae+Le],Le+=S,D[I+1]=W[Ae+Le],Le+=S,D[I+2]=W[Ae+Le],Le+=S,D[I+3]=W[Ae+Le],I+=4}z--}return D},m=function(T,F,_,S){const D=T[F+3],I=Math.pow(2,D-128)/255;_[S+0]=T[F+0]*I,_[S+1]=T[F+1]*I,_[S+2]=T[F+2]*I,_[S+3]=1},x=function(T,F,_,S){const D=T[F+3],I=Math.pow(2,D-128)/255;_[S+0]=bo.toHalfFloat(Math.min(T[F+0]*I,65504)),_[S+1]=bo.toHalfFloat(Math.min(T[F+1]*I,65504)),_[S+2]=bo.toHalfFloat(Math.min(T[F+2]*I,65504)),_[S+3]=bo.toHalfFloat(1)},d=new Uint8Array(e);d.pos=0;const g=u(d),y=g.width,v=g.height,M=p(d.subarray(d.pos),y,v);let A,w,b;switch(this.type){case En:b=M.length/4;const T=new Float32Array(b*4);for(let _=0;_<b;_++)m(M,_*4,T,_*4);A=T,w=En;break;case Fi:b=M.length/4;const F=new Uint16Array(b*4);for(let _=0;_<b;_++)x(M,_*4,F,_*4);A=F,w=Fi;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:y,height:v,data:A,header:g.string,gamma:g.gamma,exposure:g.exposure,type:w}}setDataType(e){return this.type=e,this}load(e,t,n,s){function r(o,a){switch(o.type){case En:case Fi:o.colorSpace=tn,o.minFilter=Qt,o.magFilter=Qt,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,r,n,s)}}const di=1.94384,Hn=3.28084,ia=196.85,In=(i,e,t)=>Math.max(e,Math.min(t,i)),US=document.getElementById("app"),li=new bv({antialias:!0});li.setSize(innerWidth,innerHeight);li.setPixelRatio(Math.min(devicePixelRatio,2));li.shadowMap.enabled=!0;li.shadowMap.type=Ld;li.toneMapping=Dd;li.toneMappingExposure=.75;US.appendChild(li.domElement);const Tn=new Ev,Mt=new xn(60,innerWidth/innerHeight,.3,15e4),{sunLight:hr,hemi:FS,skyUni:OS,update:sa,sightFound:Hf,balloons:zS,nightGlows:BS,nightMats:kS,roadLoops:HS}=iM(Tn);new NS().load("hdri/sky_1k.hdr",i=>{try{const e=new Ll(li);Tn.environment=e.fromEquirectangular(i).texture,"environmentIntensity"in Tn&&(Tn.environmentIntensity=.5),i.dispose(),e.dispose()}catch{}});addEventListener("resize",()=>{Mt.aspect=innerWidth/innerHeight,Mt.updateProjectionMatrix(),li.setSize(innerWidth,innerHeight)});const ii=new Set;try{for(const i of JSON.parse(localStorage.getItem("flightsim-sights")||"[]"))hs[i]&&(ii.add(i),Hf(i))}catch{}let GS=0,Gf=!0;function VS(){hs.forEach((i,e)=>{if(!ii.has(e)&&Math.hypot(ve.x-i.x,ve.z-i.z)<i.r){ii.add(e),Hf(e);try{localStorage.setItem("flightsim-sights",JSON.stringify([...ii]))}catch{}st(`📍 Discovered: ${i.name} — ${i.blurb} (${ii.size}/${hs.length})`,4200)}})}const gt=cS(),ei=lS();let wh="free",qn=!1;const hn=_S(Tn,li,hr,FS,OS,BS,gt.settings,kS),Yr=SS(Tn,HS),ut=wS(Tn,Mt),Kt=RS(),bh=CS(Kt);function Vf(i){const e=i===2303531;rn.setPaint(e?i:16054008,e?987411:i)}function Wf(){const i=Ps.find(t=>t.id===Ve.selected)||Ps[0],e=Vl.find(t=>t.id===Ve.paintFor(i.id));e?.paint?Vf(e.paint):rn.setPaint(i.look.body,i.look.accent)}async function WS(i,e=!1){const t=Ps.find(n=>n.id===i);!t||!Ve.aircraft.has(i)||(Af(t.specs),Ve.selectAircraft(i),Tn.remove(rn.root),rn=await Uf(Tn,{look:t.look,useGLB:i==="skyhawk"}),Jf.mount(rn.dashAnchor),rn.root.add(br),rn.root.add(ho),br.position.set(-1.8,t.look.wing==="high"?1.5:-.02,-1.1),ho.position.set(-1.8,-30,-220),Wf(),rn.setState({pos:ve,quat:Ft}),e||st(`✈️ Now flying: ${t.name}`))}const Ra=AS({onPaint:i=>Vf(i),onAircraft:i=>WS(i),onOutfit:i=>ut.setOutfit(i)});Kt.onComplete(i=>{st(`✅ Quest complete: ${i.name} (+$${i.reward})${i.item?" + 🎁 gift!":""}`,4200),dn.play("marta-cash",15),Xf()});function Xf(){const i=Kt.next();PS(i?`◈ ${i.name} <small>${i.hint}</small>`:"🏆 All quests complete!")}Xf();{const i=document.getElementById("mute-btn"),e=()=>{i&&(i.firstChild.textContent=dn.muted?"🔇 ":"🔊 ")};e(),i?.addEventListener("click",()=>{dn.toggle(),e()})}const br=new Ef(16774872,0,900,.32,.5,1.2),ho=new St;let Eh=!1;addEventListener("contextmenu",i=>i.preventDefault());addEventListener("mousedown",i=>{i.button===2&&(Eh=!0)});addEventListener("mouseup",i=>{i.button===2&&(Eh=!1)});const ve=new U,Yt=new U,Ft=new fn,zn=new U;let ui=0,Bn=!1,bn=!1,Xl=!1,_a="",ur=0;const qf=["CHASE","COCKPIT","TOWER"],XS=new U(45,xt.elev+14,xt.halfLen+120),Ye=mM(gt.settings);function Th(i){i==="final"?(ve.set(0,xt.elev+305,-6156),Ft.setFromAxisAngle(new U(0,1,0),Math.PI),Yt.set(0,-2.5,33),Ye.st.throttle=.3,Ye.st.flapIdx=3,Ye.st.gearDown=!0,Ye.st.trim=.1):(ve.set(0,xt.elev+ht.gearHeight+.02,480),Yt.set(0,0,0),Ft.identity(),Ye.st.throttle=0,Ye.st.pitch=0,Ye.st.roll=0,Ye.st.flapIdx=0,Ye.st.gearDown=!0,Ye.st.trim=0),ui=Ye.st.throttle,zn.set(0,0,0),Bn=i==="final",bn=!1,Xl=!1,_a=""}function fo(){jf(),ql(),Th(wh==="landing"?"final":"runway")}function Yf(){ur=(ur+1)%3,st("Camera: "+qf[ur])}function Ah(){qn?Pt?Zf():ut.pos.distanceTo(ve)<9?(qn=!1,ut.hide(),Ls(),st("Back in the cockpit — have fun!")):st("Too far from the plane — walk back to it (K)"):Gf&&Yt.length()<3?(qn=!0,Ye.st.throttle=0,ut.place(ve.x+4,ve.y,ve.z+2,Math.atan2(Gn.x,Gn.z)+Math.PI),Ls(),st("On foot — WASD / stick to walk · E shop/talk · K back to plane",3600)):st("Slow down and stop on the ground first!")}function Kf(){if(Pt){Zf();return}const i=Yr.nearestCar(ut.pos.x,ut.pos.z);if(i){YS(i);return}let e=null,t=12;for(const s of Lf){const r=Math.hypot(ut.pos.x-s.x,ut.pos.z-s.z);r<t&&(t=r,e=s)}const n=Math.hypot(ut.pos.x-Qi.x,ut.pos.z-Qi.z);e?Ra.open(e.name):n<8?bh.openMarta():st("Nothing to interact with here — find a car, a shop or Marta")}let Pt=null,Ot=0,rr=0,bd=0;const sn=Aa({shirt:14711328,pants:2764083,cap:14711328});sn.group.visible=!1;Tn.add(sn.group);const We={active:!1,vel:new U,hx:0,hz:-1,deployed:!1,hint:""};function $f(){if(We.active||qn||bn)return;const i=Be(ve.x,ve.z);if(!Bn||ve.y-i<60){st("Too low to jump! Climb first.");return}We.active=!0,We.deployed=!1,We.vel.copy(Yt);const e=Math.hypot(Gn.x,Gn.z)||1;We.hx=Gn.x/e,We.hz=Gn.z/e,sn.group.position.copy(ve),sn.group.visible=!0,st(`GERONIMO! ${["","STOCK CANOPY","CRUISER CANOPY","SPEEDSTER CANOPY"][kf()]} — opens at 400 ft, steer with the mouse.`,3600)}function ql(){We.active=!1,sn.group.visible=!1}function qS(i){const e=sn.group.position,t=Be(e.x,e.z),n=e.y-t,s=kf(),r=[-5.5,-6.5,-8][s-1],o=[9,14,20][s-1];!We.deployed&&n<122&&We.vel.y<0&&(We.deployed=!0,We.vel.multiplyScalar(.25),ni.canopyOpen(),st("🪂 CANOPY OUT — steer to a landing!",3e3));const a=We.deployed?r:-52;We.vel.y+=(a-We.vel.y)*Math.min(1,(We.deployed?1.6:.8)*i);const c=We.deployed?o:12,l=-We.hz,h=We.hx,f=We.hx*(We.pitch||0)*c+l*(We.roll||0)*c+Pa.x*.3,u=We.hz*(We.pitch||0)*c+h*(We.roll||0)*c+Pa.z*.3;We.vel.x+=(f-We.vel.x)*Math.min(1,2*i),We.vel.z+=(u-We.vel.z)*Math.min(1,2*i),e.x+=We.vel.x*i,e.y+=We.vel.y*i,e.z+=We.vel.z*i;const p=We.deployed?.15:1.25;if(sn.armL.rotation.z=p,sn.armR.rotation.z=-p,sn.legL.rotation.z=p*.3,sn.legR.rotation.z=-p*.3,sn.armL.rotation.x=sn.armR.rotation.x=0,sn.group.rotation.y=Math.atan2(We.hx,We.hz),e.y<=t+.2){if(t<.5||!We.deployed&&We.vel.y<-15){ql(),ni.splash(),st(t<.5?"💦 Splashdown! Back in the plane (R).":"💥 Too fast, too low! (R)",3600),fo();return}ql(),qn=!0,Ye.st.throttle=0,ni.landSoft(),ut.place(e.x,e.y,e.z,Math.atan2(We.hx,We.hz)),Ls(),Kt.notify("dive"),st("🦶 Touchdown! That was epic. Walk it off.",3600);return}We.hint=We.deployed?`Canopy out — steer to landing (${Math.round(n*Hn)} ft)`:`FREEFALL — canopy at 400 ft (${Math.round(n*Hn)} ft)`,Dn.set(e.x-We.hx*11,e.y+4,e.z-We.hz*11),is.lerp(Dn,1-Math.pow(.001,i)),ss.set(e.x+We.hx*8,e.y,e.z+We.hz*8),Mt.position.copy(is),Mt.lookAt(ss)}function jf(){Pt&&(Pt.taken=!1),Pt=null,Ot=0}function YS(i){Pt=i,i.taken=!0,Ot=0,rr=i.g.rotation.y,ut.hide(),st("Driving! WASD steer · E/K hop out",3e3)}function Zf(){if(!Pt)return;const i=Pt.g.position;Pt.taken=!1;let e=0,t=1e9;Pt.loop.forEach((n,s)=>{const r=Math.hypot(n.x-i.x,n.z-i.z);r<t&&(t=r,e=s)}),Pt.seg=e,ut.place(i.x+2.5,i.y,i.z,rr),Pt=null,Ot=0}const Vr=new U;function KS(i){const e=ze.mode==="walk"&&ze.stickOn,t=Ye.keys.has("KeyW")||e&&ze.stickY>.25,n=Ye.keys.has("KeyS")||e&&ze.stickY<-.25,s=Ye.keys.has("KeyA")||e&&ze.stickX<-.25,r=Ye.keys.has("KeyD")||e&&ze.stickX>.25,o=Ye.keys.has("ShiftLeft")||Ye.keys.has("ShiftRight")||ze.run;t&&(Ot+=9*i),n&&(Ot-=(Ot>1?14:7)*i),Ot-=Ot*.6*i,Ot=In(Ot,-7,o?34:26);const a=((s?1:0)-(r?1:0))*In(1.5/(1+Math.abs(Ot)*.09),.35,1.5);rr+=a*i*Math.sign(Ot)*Math.min(1,Math.abs(Ot)/3);const c=Pt.g.position;Vr.set(Math.sin(rr),0,Math.cos(rr)),c.x+=Vr.x*Ot*i,c.z+=Vr.z*Ot*i;const l=Be(c.x,c.z);c.y=l<0?.4:l+.15,l<0&&(Ot*=Math.max(0,1-2*i)),Pt.g.rotation.y=rr;for(const h of Pt.wheels)h.rotation.x+=Ot*i/.42;bd+=Math.abs(Ot)*i,bd>1e3&&Kt.notify("driver"),Dn.copy(c).addScaledVector(Vr,-10).add(Kr.set(0,4.2,0)),is.lerp(Dn,1-Math.pow(.001,i)),ss.copy(c).addScaledVector(Vr,9),Mt.position.copy(is),Mt.lookAt(ss)}const Yl=sS(),ni=oS(),dr=IS(),$S=DS(Tn),Ca=Ps.find(i=>i.id===Ve.selected&&Ve.aircraft.has(i.id))||Ps[0];Af(Ca.specs);let rn=await Uf(Tn,{look:Ca.look,useGLB:Ca.id==="skyhawk"});const Jf=uS(rn.dashAnchor);rn.root.add(br);br.position.set(-1.8,Ca.look.wing==="high"?1.5:-.02,-1.1);ho.position.set(-1.8,-30,-220);rn.root.add(ho);br.target=ho;Wf();{const i=Bf.find(e=>e.id===Ve.outfit);i&&ut.setOutfit(i.colors)}Th("runway");rn.setState({pos:ve,quat:Ft});gt.show("home");gt.onFly(i=>{wh=i,qn=!1,ut.hide(),hn.reset(),fo(),Ls(),gt.setHelpVisible(!1),i==="takeoff"?(ei.start("takeoff"),st("Lesson 1: follow the instructor (bottom). Press H for controls.")):i==="landing"?(ei.start("landing"),dn.play("atc-land"),st("Lesson 2: you are on final — fly 65 kt to the threshold.")):(ei.stop(),gt.setInstructor(null),dn.play("atc-wind"),st("Full throttle (W), rotate at 55 kt — good luck!"))});gt.onQuitToMenu(()=>{ei.stop(),gt.setInstructor(null),qn=!1,ut.hide(),jf(),Th("runway"),rn.setState({pos:ve,quat:Ft}),Ls()});document.addEventListener("flightsim-restart",()=>{qn=!1,ut.hide(),fo(),Ls(),st("Flight restarted")});document.addEventListener("flightsim-tut-skip",()=>{ei.stop(),gt.setInstructor(null)});const Gn=new U,Kr=new U,Ed=new U,Dn=new U,Td=new U,Ji=new U,Ad=new fn,yt=new yn,is=new U(0,30,520),ss=new U,Pa=new U;document.addEventListener("pointerlockchange",()=>{const i=document.pointerLockElement===document.body,e=!document.getElementById("menu").classList.contains("hidden");if(!i&&!e&&!gt.isPaused()){if(typeof Ra<"u"&&(Ra.isOpen()||bh.isOpen()))return;Kl&&gt.setPaused(!0)}});let Kl=!1;function jS(i,e){return(Math.abs(Be(i+6,e)-Be(i-6,e))+Math.abs(Be(i,e+6)-Be(i,e-6)))/(2*6)}function ZS(i,e){const t=(gt.settings.windKt||0)*.514444,n=Math.sin(i*.23)*t*.25+Math.sin(i*1.1)*t*.08;e.set(Math.sin(i*.17)*1,0,t+n);const s=qy(i,gt.settings.turbulence);return s&&(e.x+=s.x,e.y+=s.y,e.z+=s.z),{out:e,g:s}}function JS(i,e){const t=Ye.poll(i);if(Ye.consumeReset()&&(fo(),st(wh==="landing"?"Reset on final approach":"Reset on Runway 36")),Ye.consumeCam()&&Yf(),Ye.consumeHelp()&&gt.setHelpVisible(!gt.isHelpVisible()),Ye.consumePause()&&gt.setPaused(!gt.isPaused()),Ye.consumeTutorialAdvance()&&ei.active()&&document.dispatchEvent(new CustomEvent("flightsim-tut-next")),Ye.consumeMap()&&dr.setHidden(!dr.isHidden()),Ye.consumeSkydive()&&$f(),We.active){We.pitch=t.pitch,We.roll=t.roll,t.pitch=0,t.roll=0,t.yaw=0,t.brakes=!1,qS(i);const ne=Math.max(0,sn.group.position.y-Be(sn.group.position.x,sn.group.position.z));Yl.update({iasKt:We.vel.length()*di,altFt:sn.group.position.y*Hn,vsiFpm:We.vel.y*ia,hdgDeg:0,throttle:0,rpm:0,flapDeg:0,gearDown:!0,trim:0,aoaDeg:0,aglFt:ne*Hn,windKt:Pa.length()*di,cam:"DIVE",pitchDeg:0,rollDeg:0,stalled:!1,overspeed:"",hint:We.hint,sights:`${ii.size}/${hs.length}`,money:"$"+Ve.money,clock:hn.icon()+" "+hn.clock()}),ni.update(0,0,!1);return}Ye.consumeWalk()&&Ah();const n=Be(ve.x,ve.z),s=ve.y-ht.gearHeight-n,r=s<=.02;ui+=(t.throttle-ui)*Math.min(1,i*1.4),Gn.set(0,0,-1).applyQuaternion(Ft),Kr.set(0,1,0).applyQuaternion(Ft),Ed.set(1,0,0).applyQuaternion(Ft),Ad.copy(Ft).invert();const{out:o,g:a}=ZS(e,Pa);Dn.copy(Yt).sub(o),Td.copy(Dn).applyQuaternion(Ad);const c=Yy(t.flapIdx),l=Math.max(0,ve.y),h=TS(),f=ze.enabled;f&&(h.critBonus+=3*Math.PI/180);const u=Gy(Td,t.throttle,c,t.gearDown,l,h);Ji.set(0,0,0);const p=u.V;if(p>.5){Dn.copy(Yt).sub(o).normalize();let ne=u.drag,ce=u.lift;if(s<ht.wingSpan&&s>-2){const X=1-In(s/ht.wingSpan,0,1);ce*=1+.1*X,ne*=1-.25*X}Ji.addScaledVector(Dn,-ne);const Ae=Kr.dot(Dn),Le=Kr.clone().addScaledVector(Dn,-Ae).normalize();Ji.addScaledVector(Le,ce),Ji.addScaledVector(Ed,-u.beta*u.q*ht.wingArea*.9)}Ji.addScaledVector(Gn,Vy(ui,p,l,h.powerMul)),Ji.y-=ht.mass*9.81,bn&&Ji.multiplyScalar(.05),Yt.addScaledVector(Ji,i/ht.mass),ve.addScaledVector(Yt,i);const x=.35+.65*(In(u.q/150,0,1)*(bn?.2:1)),d=In(t.pitch+t.trim*.6,-1,1);yt.setFromQuaternion(Ft,"YXZ");const g=r?.3:1;let y=d*1.4*x,v=(-t.yaw*.9-u.beta*1.1*g+t.roll*(f?-.5:.28))*x,M=(-t.roll*(f?2:2.4)+In(-yt.z*(f?.9:.5),f?-.6:-.35,f?.6:.35))*x;const A=gt.settings.realism?f?.35:1:.25,w=Wy(ui,p,u.alpha);v+=w.yawRate*x*g*A,M-=w.rollRate*x*(r?.4:A),a&&(M+=a.roll*x),u.stalled&&(M+=Math.sin(e*13)*(f?.4:.9),y+=-.9*x),u.stalled&&!Cd&&Bn&&dn.play("les-stall",90),Cd=u.stalled,ze.mode==="fly"&&!ze.stickOn&&!r&&!bn&&!u.stalled&&(y+=In(-yt.x*1.8,-.9,.9)*x,M+=In(-yt.z*1.5,-.9,.9)*x);const T=u.stalled?1.6:2.6;zn.x+=(y-zn.x)*Math.min(1,T*i),zn.y+=(v-zn.y)*Math.min(1,2.2*i),zn.z+=(M-zn.z)*Math.min(1,T*i);const F=zn.length();if(F>1e-6){const ne=new fn().setFromAxisAngle(Dn.set(zn.x,zn.y,zn.z).normalize(),F*i);Ft.multiply(ne).normalize()}yt.setFromQuaternion(Ft,"YXZ"),yt.x=In(yt.x,-1.2,1.2);const _=Be(ve.x,ve.z),S=ve.y-ht.gearHeight;let D=!1;if(S<=_){ve.y=_+ht.gearHeight;const ne=Yt.y,ce=Math.abs(Gn.dot(Yt));if(Bn&&(D=!0),(!r||!Bn)&&Bn){const Re=ne*ia,He=Math.abs(yt.z),ie=Math.abs(ve.x)<80&&Math.abs(ve.z)<xt.halfLen+120?"main":Math.abs(ve.x-zt.x)<170&&Math.abs(ve.z-zt.z)<zt.halfLen+120?"coral":Math.abs(ve.x-Zt.x)<170&&Math.abs(ve.z-Zt.z)<Zt.halfLen+120?"north":Math.abs(ve.x-ri.x)<120&&Math.abs(ve.z-ri.z)<ri.halfLen+100?"harborview":Math.abs(ve.x-oi.x)<130&&Math.abs(ve.z-oi.z)<oi.halfLen+100?"seabreeze":Math.abs(ve.x-ai.x)<140&&Math.abs(ve.z-ai.z)<ai.halfLen+100?"city":Math.abs(ve.x-ci.x)<110&&Math.abs(ve.z-ci.z)<ci.halfLen+100?"lighthouse":null,C=jS(ve.x,ve.z)>.28,le=ze.enabled,j=le?-11:-8,$=le?.6:.45;if(ne<j||He>$||C)bn=!0,Ye.st.throttle=0,Xc(ve),ni.crash(),st(C?"💥 Into the mountainside — press R":`💥 CRASHED (${Math.round(-Re)} fpm) — press R`);else{const se=-Re;se<=60?st("🧈 GREASED IT! A+  — textbook touchdown"):se<=120?st(`🥇 Excellent landing (${Math.round(se)} fpm) — A`):se<=200?st(`🥈 Good landing (${Math.round(se)} fpm) — B`):se<=300?st(`🥉 Acceptable (${Math.round(se)} fpm) — C`):se<=400?st(`✓ Nice landing (${Math.round(se)} fpm)`):st(`Hard landing (${Math.round(se)} fpm) — flare earlier next time`),dn.play("atc-grease"),Kt.notify("touchdown",{strip:ie,fpm:Re,airborne:!0}),hn.isNight()&&Kt.notify("nightlanding"),ie==="north"&&Kt.notify("northstrip")}}ne<0&&(Yt.y=0);const Ae=Yt.x,Le=Yt.z,X=Math.hypot(Ae,Le);if(X>.01){const Re=t.brakes?4.5:h.rollDecel,He=Math.min(X,Re*i);Yt.x-=Ae/X*He,Yt.z-=Le/X*He}const ae=t.yaw*In(ce/12,0,1)*1.4,ge=new fn().setFromAxisAngle(Kr,-ae*i);Ft.premultiply(ge).normalize(),yt.setFromQuaternion(Ft,"YXZ"),ce>ht.Vr&&d>.1?(yt.x=In(yt.x,-.05,.22),yt.z=In(yt.z,-.1,.1),Ft.setFromEuler(yt)):(yt.x+=(0-yt.x)*Math.min(1,6*i),yt.z+=(0-yt.z)*Math.min(1,6*i),Ft.setFromEuler(yt),zn.multiplyScalar(Math.max(0,1-8*i)));const xe=p*di,de=Math.round(ht.Vr*di);r&&t.throttle<.2&&(Gc=!1,Vc=!1),r&&!Vc&&xe>8&&t.throttle>.5&&(Vc=!0,dn.play("atc-taxi")),r&&!Gc&&xe>20&&t.throttle>.9&&(Gc=!0,dn.play("atc-takeoff")),!Xl&&xe>=de&&t.throttle>.8&&(Xl=!0,st(`Rotate! (Vr ${de} kt)`)),Bn=!1}else ve.y-_>5&&!Bn&&(Bn=!0,Kt.notify("takeoff")),ve.y*Hn>3e3&&Kt.notify("alt",{ft:ve.y*Hn}),Bn&&hn.isNight()&&Kt.notify("nightair"),ve.y<.3&&_<-2&&(bn||(bn=!0,Ye.st.throttle=0,Xc(ve),ni.splash(),st("💥 Ditched in the ocean — press R")),bn&&(ve.y=.3,Yt.multiplyScalar(.9)));ve.y<_+.5&&!(S<=_)&&(bn||(bn=!0,Ye.st.throttle=0,Xc(ve),ni.crash(),st("💥 Terrain strike — press R"))),rn.setState({pos:ve,quat:Ft}),rn.animate({roll:t.roll,pitch:d,yaw:t.yaw,flapFrac:c,gearDown:t.gearDown,rpm01:ui},i,e);const I=hr.userData.dir||hn.sunDir;if(hr.position.set(ve.x+I.x*2800,ve.y+Math.max(400,I.y*2800),ve.z+I.z*2800),hr.target.position.copy(ve),br.intensity=Ve.has("spotlight")&&(hn.isNight()||r)?900:0,ur===0)Dn.set(0,3.4,10.5).applyQuaternion(Ft).add(ve),is.lerp(Dn,1-Math.pow(1e-4,i)),ss.copy(ve).addScaledVector(Gn,12),Mt.position.copy(is),Mt.lookAt(ss);else if(ur===1){const ne=rn.pilotEye().applyQuaternion(Ft).add(ve);Mt.position.copy(ne),ss.copy(ne).addScaledVector(Gn,50),Mt.lookAt(ss),Mt.rotation.z+=-t.roll*.06,is.copy(Mt.position)}else Mt.position.lerp(XS,1-Math.pow(.01,i)),Mt.lookAt(ve),is.copy(Mt.position);const P=Eh&&Ve.has("binoculars")?16:60;Math.abs(Mt.fov-P)>.2&&(Mt.fov+=(P-Mt.fov)*Math.min(1,8*i),Mt.updateProjectionMatrix());const O=Xy(p,c);let N="";O.includes("vne")?N="⚠ VNE — REDUCE SPEED":O.includes("vno")?N="CAUTION: ABOVE Vno (129 kt)":O.includes("flap-overspeed")&&(N="⚠ FLAP OVERSPEED (Vfe 85 kt)"),N&&N!==_a&&(st(N),_a=N),N||(_a=""),yt.setFromQuaternion(Ft,"YXZ");const W=(yt.y*-180/Math.PI%360+360)%360,z=p*di;let te="";if(!ei.active()&&!bn&&(r&&t.throttle<.5&&z<10?te="Hold W for full takeoff power":r&&z<ht.Vr*di?te=`Accelerating… rotate at ${Math.round(ht.Vr*di)} kt`:r?te="ROTATE — ease the mouse UP ⬆":u.stalled&&(te="STALL — push mouse DOWN, full power!")),Yl.update({iasKt:z,altFt:ve.y*Hn,vsiFpm:Yt.y*ia,hdgDeg:W===0&&Gn.z<0?0:W,throttle:t.throttle,rpm:700+ui*2e3,flapDeg:eo[t.flapIdx],gearDown:t.gearDown,trim:t.trim,aoaDeg:u.alpha*180/Math.PI,aglFt:Math.max(0,ve.y-ht.gearHeight-_)*Hn,windKt:o.length()*di,cam:qf[ur],pitchDeg:yt.x*180/Math.PI,rollDeg:-yt.z*180/Math.PI,stalled:u.stalled,overspeed:N,hint:te,sights:`${ii.size}/${hs.length}`,money:"$"+Ve.money,clock:hn.icon()+" "+hn.clock()}),ni.update(ui,In(p/70,0,1),u.stalled),er.copy(o),Gf=r,GS++%30===0&&!bn&&(VS(),Kt.notify("sights",{n:ii.size}),Bn)){for(const ce of zS){const Ae=ve.x-ce.x,Le=ve.y-ce.y,X=ve.z-ce.z;if(Ae*Ae+Le*Le+X*X<200*200){Kt.notify("balloon");break}}Math.hypot(ve.x,ve.z)>15e3&&Kt.notify("far"),Math.abs(yt.z)>60*Math.PI/180&&Kt.notify("aerobat"),z>140&&Kt.notify("speed"),(gt.settings.weather||0)===2&&Kt.notify("storm"),Math.hypot(ve.x+330,ve.z-860)<400&&(ve.y-ht.gearHeight-_)*Hn<300&&Kt.notify("buzz")}if(cn.iasKt=z,cn.altFt=ve.y*Hn,cn.vsiFpm=Yt.y*ia,cn.hdgDeg=W,cn.pitchDeg=yt.x*180/Math.PI,cn.rollDeg=-yt.z*180/Math.PI,cn.betaDeg=u.beta*180/Math.PI,cn.rpm=700+ui*2e3,cn.throttle=t.throttle,cn.flapDeg=eo[t.flapIdx],cn.gearDown=t.gearDown,cn.stalled=u.stalled,cn.trim=t.trim,cn.pitchIn=d,cn.rollIn=t.roll,ei.active()||(Hc=""),ei.active()){const ne=ei.update({iasKt:z,aglFt:Math.max(0,ve.y-ht.gearHeight-_)*Hn,throttle:t.throttle,rpm:700+ui*2e3,flapDeg:eo[t.flapIdx],onGround:r,airborne:Bn,hdgDeg:W,touchedDown:D,crashed:bn});if(ne){gt.setInstructor(ne.html);const ce=ne.lesson+":"+ne.step;if(ce!==Hc){Hc=ce;const Ae=QS[ce];Ae&&dn.play(Ae)}ne.finished&&(ei.stop(),setTimeout(()=>gt.setInstructor(null),8e3))}}dr.update({x:ve.x,z:ve.z,hdgDeg:W,sightsFound:ii,onFoot:!1},i)}let Rd=performance.now()/1e3,ra=0,hi=0;const er=new U(-2,0,1.5),cn={};let oa=.6,fr=0;const QS={"takeoff:2":"les-rotate","takeoff:3":"les-climb","takeoff:4":"les-flaps","landing:0":"les-final","landing:2":"les-flare"};let Hc="",Cd=!1,Gc=!1,Vc=!1,Wc=0;function Qf(i,e){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),s=n.createRadialGradient(32,32,2,32,32,32);return s.addColorStop(0,i),s.addColorStop(.5,e),s.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=s,n.fillRect(0,0,64,64),new pn(t)}const e1=Qf("rgba(255,240,180,1)","rgba(255,90,10,0.7)"),t1=Qf("rgba(80,80,85,0.85)","rgba(40,40,45,0.4)"),Es=new Bt(new Dt({map:e1,transparent:!0,depthWrite:!1,blending:to})),rs=new Bt(new Dt({map:t1,transparent:!0,depthWrite:!1}));Es.visible=rs.visible=!1;Tn.add(Es,rs);let tr=1e9;function Xc(i){Es.position.copy(i),rs.position.copy(i),Es.visible=rs.visible=!0,tr=0,fr=1}function aa(i){if(tr>12){Es.visible=rs.visible=!1;return}tr+=i;const e=Math.min(1,tr/9);Es.scale.setScalar(5+tr*2.5),Es.material.opacity=1-e,rs.position.y+=i*3.5,rs.scale.setScalar(7+tr*4),rs.material.opacity=.85*(1-e),fr=Math.max(0,fr-i*.45)}const n1=pM({getThrottle:()=>Ye.st.throttle,onLook:(i,e)=>ut.addLook(i,e),onAction:i=>{switch(i){case"flapUp":Ye.st.flapIdx=Math.min(3,Ye.st.flapIdx+1);break;case"flapDown":Ye.st.flapIdx=Math.max(0,Ye.st.flapIdx-1);break;case"gear":Ye.st.gearDown=!Ye.st.gearDown,ni.gearToggle(),st(Ye.st.gearDown?"Gear DOWN":"Gear UP");break;case"cam":Yf();break;case"pause":gt.setPaused(!0);break;case"walk":Ah();break;case"dive":$f();break;case"interact":qn&&Kf();break;case"next":document.dispatchEvent(new CustomEvent("flightsim-tut-next"));break}}});function Ls(){n1.setMode(document.getElementById("menu").classList.contains("hidden")?qn?"walk":"fly":"hidden")}function ep(){requestAnimationFrame(ep);const i=performance.now()/1e3;let e=Math.min(.1,i-Rd);Rd=i;const t=!document.getElementById("menu").classList.contains("hidden");t||(Kl=!0);const n=Ra.isOpen()||bh.isOpen();if(t)oa+=e*.11,Mt.position.set(ve.x+Math.cos(oa)*16,ve.y+4.5+Math.sin(oa*.6)*1.2,ve.z+Math.sin(oa)*16),Mt.lookAt(ve.x,ve.y+.8,ve.z),hn.update(e),sa(e,hi,er,ve),Yr.update(e,hi,hn.isNight(),ve),aa(e);else if(!gt.isPaused()&&Kl&&!n)if(hn.update(e),qn){if(Ye.keys.has("KeyP")&&(Ye.keys.delete("KeyP"),gt.setPaused(!gt.isPaused())),Ye.keys.has("KeyH")&&(Ye.keys.delete("KeyH"),gt.setHelpVisible(!gt.isHelpVisible())),Ye.consumeMap()&&dr.setHidden(!dr.isHidden()),ni.update(0,0,!1),Ye.consumeWalk()&&Ah(),Ye.consumeInteract()&&Kf(),Ye.consumeReset()&&(fo(),qn=!1,ut.hide(),Ls()),ze.mode==="walk"&&!Pt){const r=ze.stickOn?ze.stickX:0,o=ze.stickOn?ze.stickY:0,a=(c,l)=>{l?ut.keys.add(c):ut.keys.delete(c)};a("KeyW",o>.25),a("KeyS",o<-.25),a("KeyD",r>.25),a("KeyA",r<-.25),a("ShiftLeft",ze.run)}Pt?KS(e):ut.update(e),ut.active()?(ut._stepT||(ut._stepT=0),ut._stepT+=e,ut._stepT>.35&&(ut._stepT=0,ni.step())):ut._stepT=0,rn.animate({roll:0,pitch:0,yaw:0,flapFrac:0,gearDown:!0,rpm01:0},e,hi);const s=Pt?Pt.g.position:ut.pos;sa(e,hi,er,s),Yr.update(e,hi,hn.isNight(),s),Wc+=e,Wc>1.5&&(Wc=0,Yr.townsfolk.some(o=>Math.hypot(o.p.group.position.x-s.x,o.p.group.position.z-s.z)<9)&&dn.playRandom(["folk-hi1","folk-hi2","folk-hi3","folk-hi4"],25),Math.hypot(s.x-qt.x,s.z-qt.z)<18&&dn.play("tower-hello",120)),hr.position.set(s.x+1400,1600,s.z+700),hr.target.position.copy(s),Yl.update({iasKt:Pt?Math.abs(Ot)*di:0,altFt:s.y*Hn,vsiFpm:0,hdgDeg:0,throttle:0,rpm:0,flapDeg:0,gearDown:!0,trim:0,aoaDeg:0,aglFt:0,windKt:er.length()*di,cam:Pt?"DRIVE":"FOOT",pitchDeg:0,rollDeg:0,stalled:!1,overspeed:"",hint:Pt?`🚗 ${Math.round(Math.abs(Ot)*3.6)} km/h — E/K hop out`:"WASD walk · E drive/shop/talk · K plane",sights:`${ii.size}/${hs.length}`,money:"$"+Ve.money,clock:hn.icon()+" "+hn.clock()}),dr.update({x:s.x,z:s.z,hdgDeg:0,sightsFound:ii,onFoot:!0},e),aa(e)}else{ra+=e;const s=1/120;let r=0;for(;ra>=s&&r<40;)JS(s,hi),hi+=s,ra-=s,r++;sa(e,hi,er,ve),Yr.update(e,hi,hn.isNight(),ve),Jf.update(cn,e),aa(e),fr>.01&&(Mt.position.x+=(Math.random()-.5)*fr*.7,Mt.position.y+=(Math.random()-.5)*fr*.7)}else ra=0,sa(e,hi,er,ve),aa(e);$S.update(e,Mt.position,gt.settings.weather||0),li.render(Tn,Mt)}ep();
