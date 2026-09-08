(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pl="169",tf=0,eh=1,nf=2,Xu=1,Ku=2,Mi=3,Ri=0,xn=1,Gt=2,qi=0,Ws=1,Fr=2,th=3,nh=4,sf=5,cs=100,rf=101,of=102,af=103,cf=104,lf=200,hf=201,uf=202,df=203,pc=204,mc=205,ff=206,pf=207,mf=208,gf=209,xf=210,_f=211,vf=212,yf=213,Mf=214,gc=0,xc=1,_c=2,Ys=3,vc=4,yc=5,Mc=6,Sc=7,qu=0,Sf=1,wf=2,Yi=0,bf=1,Ef=2,Tf=3,Yu=4,Af=5,Rf=6,Cf=7,ih="attached",Pf="detached",$u=300,$s=301,js=302,wc=303,bc=304,na=306,ji=1e3,ti=1001,Yo=1002,gn=1003,ju=1004,Ar=1005,en=1006,zo=1007,ni=1008,Ci=1009,Zu=1010,Ju=1011,Or=1012,ml=1013,fs=1014,Sn=1015,Ti=1016,gl=1017,xl=1018,Zs=1020,Qu=35902,ed=1021,td=1022,Nn=1023,nd=1024,id=1025,Xs=1026,Js=1027,_l=1028,vl=1029,sd=1030,yl=1031,Ml=1033,ko=33776,Bo=33777,Ho=33778,Go=33779,Ec=35840,Tc=35841,Ac=35842,Rc=35843,Cc=36196,Pc=37492,Lc=37496,Ic=37808,Dc=37809,Nc=37810,Uc=37811,Fc=37812,Oc=37813,zc=37814,kc=37815,Bc=37816,Hc=37817,Gc=37818,Vc=37819,Wc=37820,Xc=37821,Vo=36492,Kc=36494,qc=36495,rd=36283,Yc=36284,$c=36285,jc=36286,zr=2300,kr=2301,xa=2302,sh=2400,rh=2401,oh=2402,Lf=2500,If=0,od=1,Zc=2,Df=3200,Nf=3201,ad=0,Uf=1,Wi="",ln="srgb",tn="srgb-linear",Sl="display-p3",ia="display-p3-linear",$o="linear",Et="srgb",jo="rec709",Zo="p3",Ms=7680,ah=519,Ff=512,Of=513,zf=514,cd=515,kf=516,Bf=517,Hf=518,Gf=519,Jc=35044,ch="300 es",Ai=2e3,Jo=2001;class sr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let lh=1234567;const Pr=Math.PI/180,Qs=180/Math.PI;function Un(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rn[i&255]+rn[i>>8&255]+rn[i>>16&255]+rn[i>>24&255]+"-"+rn[e&255]+rn[e>>8&255]+"-"+rn[e>>16&15|64]+rn[e>>24&255]+"-"+rn[t&63|128]+rn[t>>8&255]+"-"+rn[t>>16&255]+rn[t>>24&255]+rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]).toLowerCase()}function Vt(i,e,t){return Math.max(e,Math.min(t,i))}function wl(i,e){return(i%e+e)%e}function Vf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Wf(i,e,t){return i!==e?(t-i)/(e-i):0}function Lr(i,e,t){return(1-t)*i+t*e}function Xf(i,e,t,n){return Lr(i,e,1-Math.exp(-t*n))}function Kf(i,e=1){return e-Math.abs(wl(i,e*2)-e)}function qf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Yf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function $f(i,e){return i+Math.floor(Math.random()*(e-i+1))}function jf(i,e){return i+Math.random()*(e-i)}function Zf(i){return i*(.5-Math.random())}function Jf(i){i!==void 0&&(lh=i);let e=lh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Qf(i){return i*Pr}function ep(i){return i*Qs}function tp(i){return(i&i-1)===0&&i!==0}function np(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ip(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function sp(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),f=r((e-n)/2),u=o((e-n)/2),p=r((n-e)/2),m=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*f,c*u,a*l);break;case"YZY":i.set(c*u,a*h,c*f,a*l);break;case"ZXZ":i.set(c*f,c*u,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function _t(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const rp={DEG2RAD:Pr,RAD2DEG:Qs,generateUUID:Un,clamp:Vt,euclideanModulo:wl,mapLinear:Vf,inverseLerp:Wf,lerp:Lr,damp:Xf,pingpong:Kf,smoothstep:qf,smootherstep:Yf,randInt:$f,randFloat:jf,randFloatSpread:Zf,seededRandom:Jf,degToRad:Qf,radToDeg:ep,isPowerOfTwo:tp,ceilPowerOfTwo:np,floorPowerOfTwo:ip,setQuaternionFromProperEuler:sp,normalize:_t,denormalize:Wn};class we{constructor(e=0,t=0){we.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nt{constructor(e,t,n,s,r,o,a,c,l){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],p=n[5],m=n[8],x=s[0],d=s[3],g=s[6],M=s[1],v=s[4],S=s[7],T=s[2],E=s[5],w=s[8];return r[0]=o*x+a*M+c*T,r[3]=o*d+a*v+c*E,r[6]=o*g+a*S+c*w,r[1]=l*x+h*M+f*T,r[4]=l*d+h*v+f*E,r[7]=l*g+h*S+f*w,r[2]=u*x+p*M+m*T,r[5]=u*d+p*v+m*E,r[8]=u*g+p*S+m*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],f=h*o-a*l,u=a*c-h*r,p=l*r-o*c,m=t*f+n*u+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=f*x,e[1]=(s*l-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=u*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(_a.makeScale(e,t)),this}rotate(e){return this.premultiply(_a.makeRotation(-e)),this}translate(e,t){return this.premultiply(_a.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _a=new nt;function ld(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function op(){const i=Br("canvas");return i.style.display="block",i}const hh={};function Wo(i){i in hh||(hh[i]=!0,console.warn(i))}function ap(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function cp(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function lp(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const uh=new nt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),dh=new nt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fr={[tn]:{transfer:$o,primaries:jo,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[ln]:{transfer:Et,primaries:jo,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[ia]:{transfer:$o,primaries:Zo,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(dh),fromReference:i=>i.applyMatrix3(uh)},[Sl]:{transfer:Et,primaries:Zo,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(dh),fromReference:i=>i.applyMatrix3(uh).convertLinearToSRGB()}},hp=new Set([tn,ia]),pt={enabled:!0,_workingColorSpace:tn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!hp.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=fr[e].toReference,s=fr[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return fr[i].primaries},getTransfer:function(i){return i===Wi?$o:fr[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(fr[e].luminanceCoefficients)}};function Ks(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function va(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ss;class up{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ss===void 0&&(Ss=Br("canvas")),Ss.width=e.width,Ss.height=e.height;const n=Ss.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ss}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Br("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ks(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ks(t[n]/255)*255):t[n]=Ks(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let dp=0;class hd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Un(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ya(s[o].image)):r.push(ya(s[o]))}else r=ya(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ya(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?up.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let fp=0;class Wt extends sr{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,n=ti,s=ti,r=en,o=ni,a=Nn,c=Ci,l=Wt.DEFAULT_ANISOTROPY,h=Wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=Un(),this.name="",this.source=new hd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$u)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ji:e.x=e.x-Math.floor(e.x);break;case ti:e.x=e.x<0?0:1;break;case Yo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ji:e.y=e.y-Math.floor(e.y);break;case ti:e.y=e.y<0?0:1;break;case Yo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=$u;Wt.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,t=0,n=0,s=1){mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],p=c[5],m=c[9],x=c[2],d=c[6],g=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-x)<.01&&Math.abs(m-d)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+x)<.1&&Math.abs(m+d)<.1&&Math.abs(l+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,S=(p+1)/2,T=(g+1)/2,E=(h+u)/4,w=(f+x)/4,A=(m+d)/4;return v>S&&v>T?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=E/n,r=w/n):S>T?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=E/s,r=A/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=w/r,s=A/r),this.set(n,s,r,t),this}let M=Math.sqrt((d-m)*(d-m)+(f-x)*(f-x)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(d-m)/M,this.y=(f-x)/M,this.z=(u-h)/M,this.w=Math.acos((l+p+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pp extends sr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Wt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new hd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ps extends pp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ud extends Wt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class mp extends Wt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3];const u=r[o+0],p=r[o+1],m=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f;return}if(a===1){e[t+0]=u,e[t+1]=p,e[t+2]=m,e[t+3]=x;return}if(f!==x||c!==u||l!==p||h!==m){let d=1-a;const g=c*u+l*p+h*m+f*x,M=g>=0?1:-1,v=1-g*g;if(v>Number.EPSILON){const T=Math.sqrt(v),E=Math.atan2(T,g*M);d=Math.sin(d*E)/T,a=Math.sin(a*E)/T}const S=a*M;if(c=c*d+u*S,l=l*d+p*S,h=h*d+m*S,f=f*d+x*S,d===1-a){const T=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=T,l*=T,h*=T,f*=T}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[o],u=r[o+1],p=r[o+2],m=r[o+3];return e[t]=a*m+h*f+c*p-l*u,e[t+1]=c*m+h*u+l*f-a*p,e[t+2]=l*m+h*p+a*u-c*f,e[t+3]=h*m-a*f-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),f=a(r/2),u=c(n/2),p=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=u*h*f+l*p*m,this._y=l*p*f-u*h*m,this._z=l*h*m+u*p*f,this._w=l*h*f-u*p*m;break;case"YXZ":this._x=u*h*f+l*p*m,this._y=l*p*f-u*h*m,this._z=l*h*m-u*p*f,this._w=l*h*f+u*p*m;break;case"ZXY":this._x=u*h*f-l*p*m,this._y=l*p*f+u*h*m,this._z=l*h*m+u*p*f,this._w=l*h*f-u*p*m;break;case"ZYX":this._x=u*h*f-l*p*m,this._y=l*p*f+u*h*m,this._z=l*h*m-u*p*f,this._w=l*h*f+u*p*m;break;case"YZX":this._x=u*h*f+l*p*m,this._y=l*p*f+u*h*m,this._z=l*h*m-u*p*f,this._w=l*h*f-u*p*m;break;case"XZY":this._x=u*h*f-l*p*m,this._y=l*p*f-u*h*m,this._z=l*h*m+u*p*f,this._w=l*h*f+u*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],f=t[10],u=n+a+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>f){const p=2*Math.sqrt(1+n-a-f);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>f){const p=2*Math.sqrt(1+a-n-f);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+f-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Vt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=o*f+this._w*u,this._x=n*f+this._x*u,this._y=s*f+this._y*u,this._z=r*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,n=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),f=2*(r*n-o*t);return this.x=t+c*l+o*f-a*h,this.y=n+c*h+a*l-r*f,this.z=s+c*f+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ma.copy(this).projectOnVector(e),this.sub(Ma)}reflect(e){return this.sub(Ma.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ma=new F,fh=new hn;class si{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(zn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(zn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=zn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,zn):zn.fromBufferAttribute(r,o),zn.applyMatrix4(e.matrixWorld),this.expandByPoint(zn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),jr.copy(n.boundingBox)),jr.applyMatrix4(e.matrixWorld),this.union(jr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,zn),zn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),Zr.subVectors(this.max,pr),ws.subVectors(e.a,pr),bs.subVectors(e.b,pr),Es.subVectors(e.c,pr),Ii.subVectors(bs,ws),Di.subVectors(Es,bs),Qi.subVectors(ws,Es);let t=[0,-Ii.z,Ii.y,0,-Di.z,Di.y,0,-Qi.z,Qi.y,Ii.z,0,-Ii.x,Di.z,0,-Di.x,Qi.z,0,-Qi.x,-Ii.y,Ii.x,0,-Di.y,Di.x,0,-Qi.y,Qi.x,0];return!Sa(t,ws,bs,Es,Zr)||(t=[1,0,0,0,1,0,0,0,1],!Sa(t,ws,bs,Es,Zr))?!1:(Jr.crossVectors(Ii,Di),t=[Jr.x,Jr.y,Jr.z],Sa(t,ws,bs,Es,Zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,zn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(zn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const pi=[new F,new F,new F,new F,new F,new F,new F,new F],zn=new F,jr=new si,ws=new F,bs=new F,Es=new F,Ii=new F,Di=new F,Qi=new F,pr=new F,Zr=new F,Jr=new F,es=new F;function Sa(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){es.fromArray(i,r);const a=s.x*Math.abs(es.x)+s.y*Math.abs(es.y)+s.z*Math.abs(es.z),c=e.dot(es),l=t.dot(es),h=n.dot(es);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const gp=new si,mr=new F,wa=new F;class ri{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):gp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mr.subVectors(e,this.center);const t=mr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(mr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mr.copy(e.center).add(wa)),this.expandByPoint(mr.copy(e.center).sub(wa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const mi=new F,ba=new F,Qr=new F,Ni=new F,Ea=new F,eo=new F,Ta=new F;class sa{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mi.copy(this.origin).addScaledVector(this.direction,t),mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ba.copy(e).add(t).multiplyScalar(.5),Qr.copy(t).sub(e).normalize(),Ni.copy(this.origin).sub(ba);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Qr),a=Ni.dot(this.direction),c=-Ni.dot(Qr),l=Ni.lengthSq(),h=Math.abs(1-o*o);let f,u,p,m;if(h>0)if(f=o*c-a,u=o*a-c,m=r*h,f>=0)if(u>=-m)if(u<=m){const x=1/h;f*=x,u*=x,p=f*(f+o*u+2*a)+u*(o*f+u+2*c)+l}else u=r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;else u<=-m?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l):u<=m?(f=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+u*(u+2*c)+l);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),p=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ba).addScaledVector(Qr,u),p}intersectSphere(e,t){mi.subVectors(e.center,this.origin);const n=mi.dot(this.direction),s=mi.dot(mi)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(a=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,mi)!==null}intersectTriangle(e,t,n,s,r){Ea.subVectors(t,e),eo.subVectors(n,e),Ta.crossVectors(Ea,eo);let o=this.direction.dot(Ta),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ni.subVectors(this.origin,e);const c=a*this.direction.dot(eo.crossVectors(Ni,eo));if(c<0)return null;const l=a*this.direction.dot(Ea.cross(Ni));if(l<0||c+l>o)return null;const h=-a*Ni.dot(Ta);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ze{constructor(e,t,n,s,r,o,a,c,l,h,f,u,p,m,x,d){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,f,u,p,m,x,d)}set(e,t,n,s,r,o,a,c,l,h,f,u,p,m,x,d){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=f,g[14]=u,g[3]=p,g[7]=m,g[11]=x,g[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ts.setFromMatrixColumn(e,0).length(),r=1/Ts.setFromMatrixColumn(e,1).length(),o=1/Ts.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const u=o*h,p=o*f,m=a*h,x=a*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=p+m*l,t[5]=u-x*l,t[9]=-a*c,t[2]=x-u*l,t[6]=m+p*l,t[10]=o*c}else if(e.order==="YXZ"){const u=c*h,p=c*f,m=l*h,x=l*f;t[0]=u+x*a,t[4]=m*a-p,t[8]=o*l,t[1]=o*f,t[5]=o*h,t[9]=-a,t[2]=p*a-m,t[6]=x+u*a,t[10]=o*c}else if(e.order==="ZXY"){const u=c*h,p=c*f,m=l*h,x=l*f;t[0]=u-x*a,t[4]=-o*f,t[8]=m+p*a,t[1]=p+m*a,t[5]=o*h,t[9]=x-u*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const u=o*h,p=o*f,m=a*h,x=a*f;t[0]=c*h,t[4]=m*l-p,t[8]=u*l+x,t[1]=c*f,t[5]=x*l+u,t[9]=p*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const u=o*c,p=o*l,m=a*c,x=a*l;t[0]=c*h,t[4]=x-u*f,t[8]=m*f+p,t[1]=f,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*f+m,t[10]=u-x*f}else if(e.order==="XZY"){const u=o*c,p=o*l,m=a*c,x=a*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=u*f+x,t[5]=o*h,t[9]=p*f-m,t[2]=m*f-p,t[6]=a*h,t[10]=x*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xp,e,_p)}lookAt(e,t,n){const s=this.elements;return En.subVectors(e,t),En.lengthSq()===0&&(En.z=1),En.normalize(),Ui.crossVectors(n,En),Ui.lengthSq()===0&&(Math.abs(n.z)===1?En.x+=1e-4:En.z+=1e-4,En.normalize(),Ui.crossVectors(n,En)),Ui.normalize(),to.crossVectors(En,Ui),s[0]=Ui.x,s[4]=to.x,s[8]=En.x,s[1]=Ui.y,s[5]=to.y,s[9]=En.y,s[2]=Ui.z,s[6]=to.z,s[10]=En.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],p=n[13],m=n[2],x=n[6],d=n[10],g=n[14],M=n[3],v=n[7],S=n[11],T=n[15],E=s[0],w=s[4],A=s[8],N=s[12],_=s[1],y=s[5],P=s[9],I=s[13],D=s[2],O=s[6],U=s[10],V=s[14],z=s[3],ce=s[7],le=s[11],be=s[15];return r[0]=o*E+a*_+c*D+l*z,r[4]=o*w+a*y+c*O+l*ce,r[8]=o*A+a*P+c*U+l*le,r[12]=o*N+a*I+c*V+l*be,r[1]=h*E+f*_+u*D+p*z,r[5]=h*w+f*y+u*O+p*ce,r[9]=h*A+f*P+u*U+p*le,r[13]=h*N+f*I+u*V+p*be,r[2]=m*E+x*_+d*D+g*z,r[6]=m*w+x*y+d*O+g*ce,r[10]=m*A+x*P+d*U+g*le,r[14]=m*N+x*I+d*V+g*be,r[3]=M*E+v*_+S*D+T*z,r[7]=M*w+v*y+S*O+T*ce,r[11]=M*A+v*P+S*U+T*le,r[15]=M*N+v*I+S*V+T*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],p=e[14],m=e[3],x=e[7],d=e[11],g=e[15];return m*(+r*c*f-s*l*f-r*a*u+n*l*u+s*a*p-n*c*p)+x*(+t*c*p-t*l*u+r*o*u-s*o*p+s*l*h-r*c*h)+d*(+t*l*f-t*a*p-r*o*f+n*o*p+r*a*h-n*l*h)+g*(-s*a*h-t*c*f+t*a*u+s*o*f-n*o*u+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],p=e[11],m=e[12],x=e[13],d=e[14],g=e[15],M=f*d*l-x*u*l+x*c*p-a*d*p-f*c*g+a*u*g,v=m*u*l-h*d*l-m*c*p+o*d*p+h*c*g-o*u*g,S=h*x*l-m*f*l+m*a*p-o*x*p-h*a*g+o*f*g,T=m*f*c-h*x*c-m*a*u+o*x*u+h*a*d-o*f*d,E=t*M+n*v+s*S+r*T;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/E;return e[0]=M*w,e[1]=(x*u*r-f*d*r-x*s*p+n*d*p+f*s*g-n*u*g)*w,e[2]=(a*d*r-x*c*r+x*s*l-n*d*l-a*s*g+n*c*g)*w,e[3]=(f*c*r-a*u*r-f*s*l+n*u*l+a*s*p-n*c*p)*w,e[4]=v*w,e[5]=(h*d*r-m*u*r+m*s*p-t*d*p-h*s*g+t*u*g)*w,e[6]=(m*c*r-o*d*r-m*s*l+t*d*l+o*s*g-t*c*g)*w,e[7]=(o*u*r-h*c*r+h*s*l-t*u*l-o*s*p+t*c*p)*w,e[8]=S*w,e[9]=(m*f*r-h*x*r-m*n*p+t*x*p+h*n*g-t*f*g)*w,e[10]=(o*x*r-m*a*r+m*n*l-t*x*l-o*n*g+t*a*g)*w,e[11]=(h*a*r-o*f*r-h*n*l+t*f*l+o*n*p-t*a*p)*w,e[12]=T*w,e[13]=(h*x*s-m*f*s+m*n*u-t*x*u-h*n*d+t*f*d)*w,e[14]=(m*a*s-o*x*s-m*n*c+t*x*c+o*n*d-t*a*d)*w,e[15]=(o*f*s-h*a*s+h*n*c-t*f*c-o*n*u+t*a*u)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,f=a+a,u=r*l,p=r*h,m=r*f,x=o*h,d=o*f,g=a*f,M=c*l,v=c*h,S=c*f,T=n.x,E=n.y,w=n.z;return s[0]=(1-(x+g))*T,s[1]=(p+S)*T,s[2]=(m-v)*T,s[3]=0,s[4]=(p-S)*E,s[5]=(1-(u+g))*E,s[6]=(d+M)*E,s[7]=0,s[8]=(m+v)*w,s[9]=(d-M)*w,s[10]=(1-(u+x))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ts.set(s[0],s[1],s[2]).length();const o=Ts.set(s[4],s[5],s[6]).length(),a=Ts.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],kn.copy(this);const l=1/r,h=1/o,f=1/a;return kn.elements[0]*=l,kn.elements[1]*=l,kn.elements[2]*=l,kn.elements[4]*=h,kn.elements[5]*=h,kn.elements[6]*=h,kn.elements[8]*=f,kn.elements[9]*=f,kn.elements[10]*=f,t.setFromRotationMatrix(kn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Ai){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),f=(t+e)/(t-e),u=(n+s)/(n-s);let p,m;if(a===Ai)p=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===Jo)p=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Ai){const c=this.elements,l=1/(t-e),h=1/(n-s),f=1/(o-r),u=(t+e)*l,p=(n+s)*h;let m,x;if(a===Ai)m=(o+r)*f,x=-2*f;else if(a===Jo)m=r*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ts=new F,kn=new Ze,xp=new F(0,0,0),_p=new F(1,1,1),Ui=new F,to=new F,En=new F,ph=new Ze,mh=new hn;class _n{constructor(e=0,t=0,n=0,s=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],f=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Vt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ph.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ph,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mh.setFromEuler(this),this.setFromQuaternion(mh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class dd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vp=0;const gh=new F,As=new hn,gi=new Ze,no=new F,gr=new F,yp=new F,Mp=new hn,xh=new F(1,0,0),_h=new F(0,1,0),vh=new F(0,0,1),yh={type:"added"},Sp={type:"removed"},Rs={type:"childadded",child:null},Aa={type:"childremoved",child:null};class bt extends sr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=Un(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new F,t=new _n,n=new hn,s=new F(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ze},normalMatrix:{value:new nt}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(xh,e)}rotateY(e){return this.rotateOnAxis(_h,e)}rotateZ(e){return this.rotateOnAxis(vh,e)}translateOnAxis(e,t){return gh.copy(e).applyQuaternion(this.quaternion),this.position.add(gh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xh,e)}translateY(e){return this.translateOnAxis(_h,e)}translateZ(e){return this.translateOnAxis(vh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?no.copy(e):no.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(gr,no,this.up):gi.lookAt(no,gr,this.up),this.quaternion.setFromRotationMatrix(gi),s&&(gi.extractRotation(s.matrixWorld),As.setFromRotationMatrix(gi),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yh),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sp),Aa.child=e,this.dispatchEvent(Aa),Aa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gi.multiply(e.parent.matrixWorld)),e.applyMatrix4(gi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yh),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,e,yp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,Mp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),f=o(e.shapes),u=o(e.skeletons),p=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}bt.DEFAULT_UP=new F(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Bn=new F,xi=new F,Ra=new F,_i=new F,Cs=new F,Ps=new F,Mh=new F,Ca=new F,Pa=new F,La=new F,Ia=new mt,Da=new mt,Na=new mt;class Dn{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Bn.subVectors(e,t),s.cross(Bn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Bn.subVectors(s,t),xi.subVectors(n,t),Ra.subVectors(e,t);const o=Bn.dot(Bn),a=Bn.dot(xi),c=Bn.dot(Ra),l=xi.dot(xi),h=xi.dot(Ra),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const u=1/f,p=(l*c-a*h)*u,m=(o*h-a*c)*u;return r.set(1-p-m,m,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,_i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,_i.x),c.addScaledVector(o,_i.y),c.addScaledVector(a,_i.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Ia.setScalar(0),Da.setScalar(0),Na.setScalar(0),Ia.fromBufferAttribute(e,t),Da.fromBufferAttribute(e,n),Na.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ia,r.x),o.addScaledVector(Da,r.y),o.addScaledVector(Na,r.z),o}static isFrontFacing(e,t,n,s){return Bn.subVectors(n,t),xi.subVectors(e,t),Bn.cross(xi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),Bn.cross(xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Dn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Cs.subVectors(s,n),Ps.subVectors(r,n),Ca.subVectors(e,n);const c=Cs.dot(Ca),l=Ps.dot(Ca);if(c<=0&&l<=0)return t.copy(n);Pa.subVectors(e,s);const h=Cs.dot(Pa),f=Ps.dot(Pa);if(h>=0&&f<=h)return t.copy(s);const u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Cs,o);La.subVectors(e,r);const p=Cs.dot(La),m=Ps.dot(La);if(m>=0&&p<=m)return t.copy(r);const x=p*l-c*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(Ps,a);const d=h*m-p*f;if(d<=0&&f-h>=0&&p-m>=0)return Mh.subVectors(r,s),a=(f-h)/(f-h+(p-m)),t.copy(s).addScaledVector(Mh,a);const g=1/(d+x+u);return o=x*g,a=u*g,t.copy(n).addScaledVector(Cs,o).addScaledVector(Ps,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fi={h:0,s:0,l:0},io={h:0,s:0,l:0};function Ua(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class We{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=pt.workingColorSpace){if(e=wl(e,1),t=Vt(t,0,1),n=Vt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ua(o,r,e+1/3),this.g=Ua(o,r,e),this.b=Ua(o,r,e-1/3)}return pt.toWorkingColorSpace(this,s),this}setStyle(e,t=ln){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ln){const n=fd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ks(e.r),this.g=Ks(e.g),this.b=Ks(e.b),this}copyLinearToSRGB(e){return this.r=va(e.r),this.g=va(e.g),this.b=va(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return pt.fromWorkingColorSpace(on.copy(this),e),Math.round(Vt(on.r*255,0,255))*65536+Math.round(Vt(on.g*255,0,255))*256+Math.round(Vt(on.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.fromWorkingColorSpace(on.copy(this),t);const n=on.r,s=on.g,r=on.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=pt.workingColorSpace){return pt.fromWorkingColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=ln){pt.fromWorkingColorSpace(on.copy(this),e);const t=on.r,n=on.g,s=on.b;return e!==ln?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Fi),this.setHSL(Fi.h+e,Fi.s+t,Fi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Fi),e.getHSL(io);const n=Lr(Fi.h,io.h,t),s=Lr(Fi.s,io.s,t),r=Lr(Fi.l,io.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new We;We.NAMES=fd;let wp=0;class Xn extends sr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=Un(),this.name="",this.type="Material",this.blending=Ws,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pc,this.blendDst=mc,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ah,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ms,this.stencilZFail=Ms,this.stencilZPass=Ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(n.blending=this.blending),this.side!==Ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==pc&&(n.blendSrc=this.blendSrc),this.blendDst!==mc&&(n.blendDst=this.blendDst),this.blendEquation!==cs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ys&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ah&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ms&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ms&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ms&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Mt extends Xn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=qu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ei=bp();function bp(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(l&8388608);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function Ep(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Vt(i,-65504,65504),Ei.floatView[0]=i;const e=Ei.uint32View[0],t=e>>23&511;return Ei.baseTable[t]+((e&8388607)>>Ei.shiftTable[t])}function Tp(i){const e=i>>10;return Ei.uint32View[0]=Ei.mantissaTable[Ei.offsetTable[e]+(i&1023)]+Ei.exponentTable[e],Ei.floatView[0]}const so={toHalfFloat:Ep,fromHalfFloat:Tp},kt=new F,ro=new we;class Xt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Jc,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ro.fromBufferAttribute(this,t),ro.applyMatrix3(e),this.setXY(t,ro.x,ro.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),s=_t(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),s=_t(s,this.array),r=_t(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jc&&(e.usage=this.usage),e}}class pd extends Xt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class md extends Xt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class wt extends Xt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ap=0;const Cn=new Ze,Fa=new bt,Ls=new F,Tn=new si,xr=new si,jt=new F;class Ot extends sr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ap++}),this.uuid=Un(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ld(e)?md:pd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new nt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Cn.makeRotationFromQuaternion(e),this.applyMatrix4(Cn),this}rotateX(e){return Cn.makeRotationX(e),this.applyMatrix4(Cn),this}rotateY(e){return Cn.makeRotationY(e),this.applyMatrix4(Cn),this}rotateZ(e){return Cn.makeRotationZ(e),this.applyMatrix4(Cn),this}translate(e,t,n){return Cn.makeTranslation(e,t,n),this.applyMatrix4(Cn),this}scale(e,t,n){return Cn.makeScale(e,t,n),this.applyMatrix4(Cn),this}lookAt(e){return Fa.lookAt(e),Fa.updateMatrix(),this.applyMatrix4(Fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ls).negate(),this.translate(Ls.x,Ls.y,Ls.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new wt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ri);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(Tn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];xr.setFromBufferAttribute(a),this.morphTargetsRelative?(jt.addVectors(Tn.min,xr.min),Tn.expandByPoint(jt),jt.addVectors(Tn.max,xr.max),Tn.expandByPoint(jt)):(Tn.expandByPoint(xr.min),Tn.expandByPoint(xr.max))}Tn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)jt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(jt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)jt.fromBufferAttribute(a,l),c&&(Ls.fromBufferAttribute(e,l),jt.add(Ls)),s=Math.max(s,n.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let A=0;A<n.count;A++)a[A]=new F,c[A]=new F;const l=new F,h=new F,f=new F,u=new we,p=new we,m=new we,x=new F,d=new F;function g(A,N,_){l.fromBufferAttribute(n,A),h.fromBufferAttribute(n,N),f.fromBufferAttribute(n,_),u.fromBufferAttribute(r,A),p.fromBufferAttribute(r,N),m.fromBufferAttribute(r,_),h.sub(l),f.sub(l),p.sub(u),m.sub(u);const y=1/(p.x*m.y-m.x*p.y);isFinite(y)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(y),d.copy(f).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(y),a[A].add(x),a[N].add(x),a[_].add(x),c[A].add(d),c[N].add(d),c[_].add(d))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let A=0,N=M.length;A<N;++A){const _=M[A],y=_.start,P=_.count;for(let I=y,D=y+P;I<D;I+=3)g(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const v=new F,S=new F,T=new F,E=new F;function w(A){T.fromBufferAttribute(s,A),E.copy(T);const N=a[A];v.copy(N),v.sub(T.multiplyScalar(T.dot(N))).normalize(),S.crossVectors(E,N);const y=S.dot(c[A])<0?-1:1;o.setXYZW(A,v.x,v.y,v.z,y)}for(let A=0,N=M.length;A<N;++A){const _=M[A],y=_.start,P=_.count;for(let I=y,D=y+P;I<D;I+=3)w(e.getX(I+0)),w(e.getX(I+1)),w(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Xt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const s=new F,r=new F,o=new F,a=new F,c=new F,l=new F,h=new F,f=new F;if(e)for(let u=0,p=e.count;u<p;u+=3){const m=e.getX(u+0),x=e.getX(u+1),d=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,d),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,d),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(d,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,f=a.normalized,u=new l.constructor(c.length*h);let p=0,m=0;for(let x=0,d=c.length;x<d;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*h;for(let g=0;g<h;g++)u[m++]=l[p++]}return new Xt(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ot,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,f=l.length;h<f;h++){const u=l[h],p=e(u,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){const p=l[f];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],f=r[l];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Sh=new Ze,ts=new sa,oo=new ri,wh=new F,ao=new F,co=new F,lo=new F,Oa=new F,ho=new F,bh=new F,uo=new F;class X extends bt{constructor(e=new Ot,t=new Mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){ho.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],f=r[c];h!==0&&(Oa.fromBufferAttribute(f,e),o?ho.addScaledVector(Oa,h):ho.addScaledVector(Oa.sub(t),h))}t.add(ho)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),oo.copy(n.boundingSphere),oo.applyMatrix4(r),ts.copy(e.ray).recast(e.near),!(oo.containsPoint(ts.origin)===!1&&(ts.intersectSphere(oo,wh)===null||ts.origin.distanceToSquared(wh)>(e.far-e.near)**2))&&(Sh.copy(r).invert(),ts.copy(e.ray).applyMatrix4(Sh),!(n.boundingBox!==null&&ts.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ts)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=u.length;m<x;m++){const d=u[m],g=o[d.materialIndex],M=Math.max(d.start,p.start),v=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let S=M,T=v;S<T;S+=3){const E=a.getX(S),w=a.getX(S+1),A=a.getX(S+2);s=fo(this,g,e,n,l,h,f,E,w,A),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let d=m,g=x;d<g;d+=3){const M=a.getX(d),v=a.getX(d+1),S=a.getX(d+2);s=fo(this,o,e,n,l,h,f,M,v,S),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,x=u.length;m<x;m++){const d=u[m],g=o[d.materialIndex],M=Math.max(d.start,p.start),v=Math.min(c.count,Math.min(d.start+d.count,p.start+p.count));for(let S=M,T=v;S<T;S+=3){const E=S,w=S+1,A=S+2;s=fo(this,g,e,n,l,h,f,E,w,A),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let d=m,g=x;d<g;d+=3){const M=d,v=d+1,S=d+2;s=fo(this,o,e,n,l,h,f,M,v,S),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}}}function Rp(i,e,t,n,s,r,o,a){let c;if(e.side===xn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Ri,a),c===null)return null;uo.copy(a),uo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(uo);return l<t.near||l>t.far?null:{distance:l,point:uo.clone(),object:i}}function fo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,ao),i.getVertexPosition(c,co),i.getVertexPosition(l,lo);const h=Rp(i,e,t,n,ao,co,lo,bh);if(h){const f=new F;Dn.getBarycoord(bh,ao,co,lo,f),s&&(h.uv=Dn.getInterpolatedAttribute(s,a,c,l,f,new we)),r&&(h.uv1=Dn.getInterpolatedAttribute(r,a,c,l,f,new we)),o&&(h.normal=Dn.getInterpolatedAttribute(o,a,c,l,f,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new F,materialIndex:0};Dn.getNormal(ao,co,lo,u.normal),h.face=u,h.barycoord=f}return h}class fe extends Ot{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],f=[];let u=0,p=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new wt(l,3)),this.setAttribute("normal",new wt(h,3)),this.setAttribute("uv",new wt(f,2));function m(x,d,g,M,v,S,T,E,w,A,N){const _=S/w,y=T/A,P=S/2,I=T/2,D=E/2,O=w+1,U=A+1;let V=0,z=0;const ce=new F;for(let le=0;le<U;le++){const be=le*y-I;for(let j=0;j<O;j++){const Re=j*_-P;ce[x]=Re*M,ce[d]=be*v,ce[g]=D,l.push(ce.x,ce.y,ce.z),ce[x]=0,ce[d]=0,ce[g]=E>0?1:-1,h.push(ce.x,ce.y,ce.z),f.push(j/w),f.push(1-le/A),V+=1}}for(let le=0;le<A;le++)for(let be=0;be<w;be++){const j=u+be+O*le,Re=u+be+O*(le+1),K=u+(be+1)+O*(le+1),ae=u+(be+1)+O*le;c.push(j,Re,ae),c.push(Re,K,ae),z+=6}a.addGroup(p,z,N),p+=z,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fe(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function er(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function pn(i){const e={};for(let t=0;t<i.length;t++){const n=er(i[t]);for(const s in n)e[s]=n[s]}return e}function Cp(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function gd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}const xd={clone:er,merge:pn};var Pp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pi extends Xn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pp,this.fragmentShader=Lp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=er(e.uniforms),this.uniformsGroups=Cp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class _d extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=Ai}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new F,Eh=new we,Th=new we;class mn extends _d{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qs*2*Math.atan(Math.tan(Pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,t){return this.getViewBounds(e,Eh,Th),t.subVectors(Th,Eh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Pr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Is=-90,Ds=1;class Ip extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new mn(Is,Ds,e,t);s.layers=this.layers,this.add(s);const r=new mn(Is,Ds,e,t);r.layers=this.layers,this.add(r);const o=new mn(Is,Ds,e,t);o.layers=this.layers,this.add(o);const a=new mn(Is,Ds,e,t);a.layers=this.layers,this.add(a);const c=new mn(Is,Ds,e,t);c.layers=this.layers,this.add(c);const l=new mn(Is,Ds,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Ai)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Jo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(f,u,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class vd extends Wt{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:$s,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Dp extends ps{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new vd(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:en}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fe(5,5,5),r=new Pi({name:"CubemapFromEquirect",uniforms:er(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:xn,blending:qi});r.uniforms.tEquirect.value=t;const o=new X(s,r),a=t.minFilter;return t.minFilter===ni&&(t.minFilter=en),new Ip(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const za=new F,Np=new F,Up=new nt;class os{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=za.subVectors(n,t).cross(Np.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(za),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Up.getNormalMatrix(e),s=this.coplanarPoint(za).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ns=new ri,po=new F;class bl{constructor(e=new os,t=new os,n=new os,s=new os,r=new os,o=new os){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ai){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],f=s[6],u=s[7],p=s[8],m=s[9],x=s[10],d=s[11],g=s[12],M=s[13],v=s[14],S=s[15];if(n[0].setComponents(c-r,u-l,d-p,S-g).normalize(),n[1].setComponents(c+r,u+l,d+p,S+g).normalize(),n[2].setComponents(c+o,u+h,d+m,S+M).normalize(),n[3].setComponents(c-o,u-h,d-m,S-M).normalize(),n[4].setComponents(c-a,u-f,d-x,S-v).normalize(),t===Ai)n[5].setComponents(c+a,u+f,d+x,S+v).normalize();else if(t===Jo)n[5].setComponents(a,f,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ns.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ns)}intersectsSprite(e){return ns.center.set(0,0,0),ns.radius=.7071067811865476,ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(ns)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(po.x=s.normal.x>0?e.max.x:e.min.x,po.y=s.normal.y>0?e.max.y:e.min.y,po.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(po)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function yd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Fp(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((p,m)=>p.start-m.start);let u=0;for(let p=1;p<f.length;p++){const m=f[u],x=f[p];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++u,f[u]=x)}f.length=u+1;for(let p=0,m=f.length;p<m;p++){const x=f[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class Lt extends Ot{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,f=e/a,u=t/c,p=[],m=[],x=[],d=[];for(let g=0;g<h;g++){const M=g*u-o;for(let v=0;v<l;v++){const S=v*f-r;m.push(S,-M,0),x.push(0,0,1),d.push(v/a),d.push(1-g/c)}}for(let g=0;g<c;g++)for(let M=0;M<a;M++){const v=M+l*g,S=M+l*(g+1),T=M+1+l*(g+1),E=M+1+l*g;p.push(v,S,E),p.push(S,T,E)}this.setIndex(p),this.setAttribute("position",new wt(m,3)),this.setAttribute("normal",new wt(x,3)),this.setAttribute("uv",new wt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lt(e.width,e.height,e.widthSegments,e.heightSegments)}}var Op=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zp=`#ifdef USE_ALPHAHASH
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
#endif`,kp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vp=`#ifdef USE_AOMAP
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
#endif`,Wp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xp=`#ifdef USE_BATCHING
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
#endif`,Kp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$p=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jp=`#ifdef USE_IRIDESCENCE
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
#endif`,Zp=`#ifdef USE_BUMPMAP
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
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,em=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,im=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,om=`#define PI 3.141592653589793
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
} // validated`,am=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cm=`vec3 transformedNormal = objectNormal;
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
#endif`,lm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,um=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fm="gl_FragColor = linearToOutputTexel( gl_FragColor );",pm=`
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
}`,mm=`#ifdef USE_ENVMAP
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
#endif`,gm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xm=`#ifdef USE_ENVMAP
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
#endif`,_m=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vm=`#ifdef USE_ENVMAP
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
#endif`,ym=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bm=`#ifdef USE_GRADIENTMAP
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
}`,Em=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Am=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rm=`uniform bool receiveShadow;
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
#endif`,Cm=`#ifdef USE_ENVMAP
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
#endif`,Pm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Im=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nm=`PhysicalMaterial material;
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
#endif`,Um=`struct PhysicalMaterial {
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
}`,Fm=`
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
#endif`,Om=`#if defined( RE_IndirectDiffuse )
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
#endif`,zm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,km=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Km=`#if defined( USE_POINTS_UV )
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
#endif`,qm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ym=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$m=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jm=`#ifdef USE_MORPHTARGETS
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
#endif`,Qm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,e0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,t0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,n0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,i0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,s0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,r0=`#ifdef USE_NORMALMAP
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
#endif`,o0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,a0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,c0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,l0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,h0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,u0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,d0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,f0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,p0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,m0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,g0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,x0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,v0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,y0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,M0=`float getShadowMask() {
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
}`,S0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,w0=`#ifdef USE_SKINNING
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
#endif`,b0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,E0=`#ifdef USE_SKINNING
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
#endif`,T0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,A0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,R0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,C0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,P0=`#ifdef USE_TRANSMISSION
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
#endif`,L0=`#ifdef USE_TRANSMISSION
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
#endif`,I0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,D0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,N0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,U0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const F0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,O0=`uniform sampler2D t2D;
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
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,B0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,G0=`#include <common>
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
}`,V0=`#if DEPTH_PACKING == 3200
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
}`,W0=`#define DISTANCE
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
}`,X0=`#define DISTANCE
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
}`,K0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,q0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y0=`uniform float scale;
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
}`,$0=`uniform vec3 diffuse;
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
}`,j0=`#include <common>
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
}`,Z0=`uniform vec3 diffuse;
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
}`,J0=`#define LAMBERT
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
}`,Q0=`#define LAMBERT
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
}`,eg=`#define MATCAP
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
}`,tg=`#define MATCAP
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
}`,ng=`#define NORMAL
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
}`,ig=`#define NORMAL
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
}`,sg=`#define PHONG
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
}`,rg=`#define PHONG
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
}`,og=`#define STANDARD
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
}`,ag=`#define STANDARD
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
}`,cg=`#define TOON
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
}`,lg=`#define TOON
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
}`,hg=`uniform float size;
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
}`,ug=`uniform vec3 diffuse;
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
}`,dg=`#include <common>
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
}`,fg=`uniform vec3 color;
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
}`,pg=`uniform float rotation;
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
}`,mg=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:Op,alphahash_pars_fragment:zp,alphamap_fragment:kp,alphamap_pars_fragment:Bp,alphatest_fragment:Hp,alphatest_pars_fragment:Gp,aomap_fragment:Vp,aomap_pars_fragment:Wp,batching_pars_vertex:Xp,batching_vertex:Kp,begin_vertex:qp,beginnormal_vertex:Yp,bsdfs:$p,iridescence_fragment:jp,bumpmap_pars_fragment:Zp,clipping_planes_fragment:Jp,clipping_planes_pars_fragment:Qp,clipping_planes_pars_vertex:em,clipping_planes_vertex:tm,color_fragment:nm,color_pars_fragment:im,color_pars_vertex:sm,color_vertex:rm,common:om,cube_uv_reflection_fragment:am,defaultnormal_vertex:cm,displacementmap_pars_vertex:lm,displacementmap_vertex:hm,emissivemap_fragment:um,emissivemap_pars_fragment:dm,colorspace_fragment:fm,colorspace_pars_fragment:pm,envmap_fragment:mm,envmap_common_pars_fragment:gm,envmap_pars_fragment:xm,envmap_pars_vertex:_m,envmap_physical_pars_fragment:Cm,envmap_vertex:vm,fog_vertex:ym,fog_pars_vertex:Mm,fog_fragment:Sm,fog_pars_fragment:wm,gradientmap_pars_fragment:bm,lightmap_pars_fragment:Em,lights_lambert_fragment:Tm,lights_lambert_pars_fragment:Am,lights_pars_begin:Rm,lights_toon_fragment:Pm,lights_toon_pars_fragment:Lm,lights_phong_fragment:Im,lights_phong_pars_fragment:Dm,lights_physical_fragment:Nm,lights_physical_pars_fragment:Um,lights_fragment_begin:Fm,lights_fragment_maps:Om,lights_fragment_end:zm,logdepthbuf_fragment:km,logdepthbuf_pars_fragment:Bm,logdepthbuf_pars_vertex:Hm,logdepthbuf_vertex:Gm,map_fragment:Vm,map_pars_fragment:Wm,map_particle_fragment:Xm,map_particle_pars_fragment:Km,metalnessmap_fragment:qm,metalnessmap_pars_fragment:Ym,morphinstance_vertex:$m,morphcolor_vertex:jm,morphnormal_vertex:Zm,morphtarget_pars_vertex:Jm,morphtarget_vertex:Qm,normal_fragment_begin:e0,normal_fragment_maps:t0,normal_pars_fragment:n0,normal_pars_vertex:i0,normal_vertex:s0,normalmap_pars_fragment:r0,clearcoat_normal_fragment_begin:o0,clearcoat_normal_fragment_maps:a0,clearcoat_pars_fragment:c0,iridescence_pars_fragment:l0,opaque_fragment:h0,packing:u0,premultiplied_alpha_fragment:d0,project_vertex:f0,dithering_fragment:p0,dithering_pars_fragment:m0,roughnessmap_fragment:g0,roughnessmap_pars_fragment:x0,shadowmap_pars_fragment:_0,shadowmap_pars_vertex:v0,shadowmap_vertex:y0,shadowmask_pars_fragment:M0,skinbase_vertex:S0,skinning_pars_vertex:w0,skinning_vertex:b0,skinnormal_vertex:E0,specularmap_fragment:T0,specularmap_pars_fragment:A0,tonemapping_fragment:R0,tonemapping_pars_fragment:C0,transmission_fragment:P0,transmission_pars_fragment:L0,uv_pars_fragment:I0,uv_pars_vertex:D0,uv_vertex:N0,worldpos_vertex:U0,background_vert:F0,background_frag:O0,backgroundCube_vert:z0,backgroundCube_frag:k0,cube_vert:B0,cube_frag:H0,depth_vert:G0,depth_frag:V0,distanceRGBA_vert:W0,distanceRGBA_frag:X0,equirect_vert:K0,equirect_frag:q0,linedashed_vert:Y0,linedashed_frag:$0,meshbasic_vert:j0,meshbasic_frag:Z0,meshlambert_vert:J0,meshlambert_frag:Q0,meshmatcap_vert:eg,meshmatcap_frag:tg,meshnormal_vert:ng,meshnormal_frag:ig,meshphong_vert:sg,meshphong_frag:rg,meshphysical_vert:og,meshphysical_frag:ag,meshtoon_vert:cg,meshtoon_frag:lg,points_vert:hg,points_frag:ug,shadow_vert:dg,shadow_frag:fg,sprite_vert:pg,sprite_frag:mg},Ae={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},envMapRotation:{value:new nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},ei={basic:{uniforms:pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new We(0)}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:pn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:pn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new We(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:pn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:pn([Ae.points,Ae.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:pn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:pn([Ae.common,Ae.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:pn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:pn([Ae.sprite,Ae.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new nt}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distanceRGBA:{uniforms:pn([Ae.common,Ae.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distanceRGBA_vert,fragmentShader:tt.distanceRGBA_frag},shadow:{uniforms:pn([Ae.lights,Ae.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};ei.physical={uniforms:pn([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const mo={r:0,b:0,g:0},is=new _n,gg=new Ze;function xg(i,e,t,n,s,r,o){const a=new We(0);let c=r===!0?0:1,l,h,f=null,u=0,p=null;function m(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?t:e).get(v)),v}function x(M){let v=!1;const S=m(M);S===null?g(a,c):S&&S.isColor&&(g(S,1),v=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function d(M,v){const S=m(v);S&&(S.isCubeTexture||S.mapping===na)?(h===void 0&&(h=new X(new fe(1,1,1),new Pi({name:"BackgroundCubeMaterial",uniforms:er(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,E,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),is.copy(v.backgroundRotation),is.x*=-1,is.y*=-1,is.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(is.y*=-1,is.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(gg.makeRotationFromEuler(is)),h.material.toneMapped=pt.getTransfer(S.colorSpace)!==Et,(f!==S||u!==S.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,f=S,u=S.version,p=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new X(new Lt(2,2),new Pi({name:"BackgroundMaterial",uniforms:er(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=pt.getTransfer(S.colorSpace)!==Et,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||u!==S.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,f=S,u=S.version,p=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,v){M.getRGB(mo,gd(i)),n.buffers.color.setClear(mo.r,mo.g,mo.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(M,v=1){a.set(M),c=v,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,g(a,c)},render:x,addToRenderList:d}}function _g(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(_,y,P,I,D){let O=!1;const U=f(I,P,y);r!==U&&(r=U,l(r.object)),O=p(_,I,P,D),O&&m(_,I,P,D),D!==null&&e.update(D,i.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,S(_,y,P,I),D!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function c(){return i.createVertexArray()}function l(_){return i.bindVertexArray(_)}function h(_){return i.deleteVertexArray(_)}function f(_,y,P){const I=P.wireframe===!0;let D=n[_.id];D===void 0&&(D={},n[_.id]=D);let O=D[y.id];O===void 0&&(O={},D[y.id]=O);let U=O[I];return U===void 0&&(U=u(c()),O[I]=U),U}function u(_){const y=[],P=[],I=[];for(let D=0;D<t;D++)y[D]=0,P[D]=0,I[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:P,attributeDivisors:I,object:_,attributes:{},index:null}}function p(_,y,P,I){const D=r.attributes,O=y.attributes;let U=0;const V=P.getAttributes();for(const z in V)if(V[z].location>=0){const le=D[z];let be=O[z];if(be===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&(be=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&(be=_.instanceColor)),le===void 0||le.attribute!==be||be&&le.data!==be.data)return!0;U++}return r.attributesNum!==U||r.index!==I}function m(_,y,P,I){const D={},O=y.attributes;let U=0;const V=P.getAttributes();for(const z in V)if(V[z].location>=0){let le=O[z];le===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&(le=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&(le=_.instanceColor));const be={};be.attribute=le,le&&le.data&&(be.data=le.data),D[z]=be,U++}r.attributes=D,r.attributesNum=U,r.index=I}function x(){const _=r.newAttributes;for(let y=0,P=_.length;y<P;y++)_[y]=0}function d(_){g(_,0)}function g(_,y){const P=r.newAttributes,I=r.enabledAttributes,D=r.attributeDivisors;P[_]=1,I[_]===0&&(i.enableVertexAttribArray(_),I[_]=1),D[_]!==y&&(i.vertexAttribDivisor(_,y),D[_]=y)}function M(){const _=r.newAttributes,y=r.enabledAttributes;for(let P=0,I=y.length;P<I;P++)y[P]!==_[P]&&(i.disableVertexAttribArray(P),y[P]=0)}function v(_,y,P,I,D,O,U){U===!0?i.vertexAttribIPointer(_,y,P,D,O):i.vertexAttribPointer(_,y,P,I,D,O)}function S(_,y,P,I){x();const D=I.attributes,O=P.getAttributes(),U=y.defaultAttributeValues;for(const V in O){const z=O[V];if(z.location>=0){let ce=D[V];if(ce===void 0&&(V==="instanceMatrix"&&_.instanceMatrix&&(ce=_.instanceMatrix),V==="instanceColor"&&_.instanceColor&&(ce=_.instanceColor)),ce!==void 0){const le=ce.normalized,be=ce.itemSize,j=e.get(ce);if(j===void 0)continue;const Re=j.buffer,K=j.type,ae=j.bytesPerElement,xe=K===i.INT||K===i.UNSIGNED_INT||ce.gpuType===ml;if(ce.isInterleavedBufferAttribute){const te=ce.data,me=te.stride,Se=ce.offset;if(te.isInstancedInterleavedBuffer){for(let De=0;De<z.locationSize;De++)g(z.location+De,te.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let De=0;De<z.locationSize;De++)d(z.location+De);i.bindBuffer(i.ARRAY_BUFFER,Re);for(let De=0;De<z.locationSize;De++)v(z.location+De,be/z.locationSize,K,le,me*ae,(Se+be/z.locationSize*De)*ae,xe)}else{if(ce.isInstancedBufferAttribute){for(let te=0;te<z.locationSize;te++)g(z.location+te,ce.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let te=0;te<z.locationSize;te++)d(z.location+te);i.bindBuffer(i.ARRAY_BUFFER,Re);for(let te=0;te<z.locationSize;te++)v(z.location+te,be/z.locationSize,K,le,be*ae,be/z.locationSize*te*ae,xe)}}else if(U!==void 0){const le=U[V];if(le!==void 0)switch(le.length){case 2:i.vertexAttrib2fv(z.location,le);break;case 3:i.vertexAttrib3fv(z.location,le);break;case 4:i.vertexAttrib4fv(z.location,le);break;default:i.vertexAttrib1fv(z.location,le)}}}}M()}function T(){A();for(const _ in n){const y=n[_];for(const P in y){const I=y[P];for(const D in I)h(I[D].object),delete I[D];delete y[P]}delete n[_]}}function E(_){if(n[_.id]===void 0)return;const y=n[_.id];for(const P in y){const I=y[P];for(const D in I)h(I[D].object),delete I[D];delete y[P]}delete n[_.id]}function w(_){for(const y in n){const P=n[y];if(P[_.id]===void 0)continue;const I=P[_.id];for(const D in I)h(I[D].object),delete I[D];delete P[_.id]}}function A(){N(),o=!0,r!==s&&(r=s,l(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:N,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:d,disableUnusedAttributes:M}}function vg(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),t.update(h,n,f))}function a(l,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let p=0;for(let m=0;m<f;m++)p+=h[m];t.update(p,n,1)}function c(l,h,f,u){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<l.length;m++)o(l[m],h[m],u[m]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,f);let m=0;for(let x=0;x<f;x++)m+=h[x];for(let x=0;x<u.length;x++)t.update(m,n,u[x])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function yg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Nn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const A=w===Ti&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Ci&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Sn&&!A)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const w=e.get("EXT_clip_control");w.clipControlEXT(w.LOWER_LEFT_EXT,w.ZERO_TO_ONE_EXT)}const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:u,maxTextures:p,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:d,maxAttributes:g,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:S,vertexTextures:T,maxSamples:E}}function Mg(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new os,a=new nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||n!==0||s;return s=u,n=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,p){const m=f.clippingPlanes,x=f.clipIntersection,d=f.clipShadows,g=i.get(f);if(!s||m===null||m.length===0||r&&!d)r?h(null):l();else{const M=r?0:n,v=M*4;let S=g.clippingState||null;c.value=S,S=h(m,u,v,p);for(let T=0;T!==v;++T)S[T]=t[T];g.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,p,m){const x=f!==null?f.length:0;let d=null;if(x!==0){if(d=c.value,m!==!0||d===null){const g=p+x*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(d===null||d.length<g)&&(d=new Float32Array(g));for(let v=0,S=p;v!==x;++v,S+=4)o.copy(f[v]).applyMatrix4(M,a),o.normal.toArray(d,S),d[S+3]=o.constant}c.value=d,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,d}}function Sg(i){let e=new WeakMap;function t(o,a){return a===wc?o.mapping=$s:a===bc&&(o.mapping=js),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===wc||a===bc)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Dp(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class El extends _d{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Hs=4,Ah=[.125,.215,.35,.446,.526,.582],ls=20,ka=new El,Rh=new We;let Ba=null,Ha=0,Ga=0,Va=!1;const as=(1+Math.sqrt(5))/2,Ns=1/as,Ch=[new F(-as,Ns,0),new F(as,Ns,0),new F(-Ns,0,as),new F(Ns,0,as),new F(0,as,-Ns),new F(0,as,Ns),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Qc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Ba=this._renderer.getRenderTarget(),Ha=this._renderer.getActiveCubeFace(),Ga=this._renderer.getActiveMipmapLevel(),Va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ba,Ha,Ga),this._renderer.xr.enabled=Va,e.scissorTest=!1,go(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===$s||e.mapping===js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ba=this._renderer.getRenderTarget(),Ha=this._renderer.getActiveCubeFace(),Ga=this._renderer.getActiveMipmapLevel(),Va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:Ti,format:Nn,colorSpace:tn,depthBuffer:!1},s=Ph(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ph(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wg(r)),this._blurMaterial=bg(r,e,t)}return s}_compileMaterial(e){const t=new X(this._lodPlanes[0],e);this._renderer.compile(t,ka)}_sceneToCubeUV(e,t,n,s){const a=new mn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,u=h.toneMapping;h.getClearColor(Rh),h.toneMapping=Yi,h.autoClear=!1;const p=new Mt({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1}),m=new X(new fe,p);let x=!1;const d=e.background;d?d.isColor&&(p.color.copy(d),e.background=null,x=!0):(p.color.copy(Rh),x=!0);for(let g=0;g<6;g++){const M=g%3;M===0?(a.up.set(0,c[g],0),a.lookAt(l[g],0,0)):M===1?(a.up.set(0,0,c[g]),a.lookAt(0,l[g],0)):(a.up.set(0,c[g],0),a.lookAt(0,0,l[g]));const v=this._cubeSize;go(s,M*v,g>2?v:0,v,v),h.setRenderTarget(s),x&&h.render(m,a),h.render(e,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=u,h.autoClear=f,e.background=d}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===$s||e.mapping===js;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new X(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;go(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,ka)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ch[(s-r-1)%Ch.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new X(this._lodPlanes[s],l),u=l.uniforms,p=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ls-1),x=r/m,d=isFinite(r)?1+Math.floor(h*x):ls;d>ls&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${ls}`);const g=[];let M=0;for(let w=0;w<ls;++w){const A=w/x,N=Math.exp(-A*A/2);g.push(N),w===0?M+=N:w<d&&(M+=2*N)}for(let w=0;w<g.length;w++)g[w]=g[w]/M;u.envMap.value=e.texture,u.samples.value=d,u.weights.value=g,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:v}=this;u.dTheta.value=m,u.mipInt.value=v-n;const S=this._sizeLods[s],T=3*S*(s>v-Hs?s-v+Hs:0),E=4*(this._cubeSize-S);go(t,T,E,3*S,2*S),c.setRenderTarget(t),c.render(f,ka)}}function wg(i){const e=[],t=[],n=[];let s=i;const r=i-Hs+1+Ah.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Hs?c=Ah[o-i+Hs-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,m=6,x=3,d=2,g=1,M=new Float32Array(x*m*p),v=new Float32Array(d*m*p),S=new Float32Array(g*m*p);for(let E=0;E<p;E++){const w=E%3*2/3-1,A=E>2?0:-1,N=[w,A,0,w+2/3,A,0,w+2/3,A+1,0,w,A,0,w+2/3,A+1,0,w,A+1,0];M.set(N,x*m*E),v.set(u,d*m*E);const _=[E,E,E,E,E,E];S.set(_,g*m*E)}const T=new Ot;T.setAttribute("position",new Xt(M,x)),T.setAttribute("uv",new Xt(v,d)),T.setAttribute("faceIndex",new Xt(S,g)),e.push(T),s>Hs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ph(i,e,t){const n=new ps(i,e,t);return n.texture.mapping=na,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function go(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function bg(i,e,t){const n=new Float32Array(ls),s=new F(0,1,0);return new Pi({name:"SphericalGaussianBlur",defines:{n:ls,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Tl(),fragmentShader:`

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
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Lh(){return new Pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tl(),fragmentShader:`

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
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Ih(){return new Pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Tl(){return`

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
	`}function Eg(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===wc||c===bc,h=c===$s||c===js;if(l||h){let f=e.get(a);const u=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return t===null&&(t=new Qc(i)),f=l?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Qc(i)),f=l?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Tg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Wo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ag(i,e,t,n){const s={},r=new WeakMap;function o(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);for(const m in u.morphAttributes){const x=u.morphAttributes[m];for(let d=0,g=x.length;d<g;d++)e.remove(x[d])}u.removeEventListener("dispose",o),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(f,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function c(f){const u=f.attributes;for(const m in u)e.update(u[m],i.ARRAY_BUFFER);const p=f.morphAttributes;for(const m in p){const x=p[m];for(let d=0,g=x.length;d<g;d++)e.update(x[d],i.ARRAY_BUFFER)}}function l(f){const u=[],p=f.index,m=f.attributes.position;let x=0;if(p!==null){const M=p.array;x=p.version;for(let v=0,S=M.length;v<S;v+=3){const T=M[v+0],E=M[v+1],w=M[v+2];u.push(T,E,E,w,w,T)}}else if(m!==void 0){const M=m.array;x=m.version;for(let v=0,S=M.length/3-1;v<S;v+=3){const T=v+0,E=v+1,w=v+2;u.push(T,E,E,w,w,T)}}else return;const d=new(ld(u)?md:pd)(u,1);d.version=x;const g=r.get(f);g&&e.remove(g),r.set(f,d)}function h(f){const u=r.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function Rg(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,p){i.drawElements(n,p,r,u*o),t.update(p,n,1)}function l(u,p,m){m!==0&&(i.drawElementsInstanced(n,p,r,u*o,m),t.update(p,n,m))}function h(u,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,m);let d=0;for(let g=0;g<m;g++)d+=p[g];t.update(d,n,1)}function f(u,p,m,x){if(m===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<u.length;g++)l(u[g]/o,p[g],x[g]);else{d.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,x,0,m);let g=0;for(let M=0;M<m;M++)g+=p[M];for(let M=0;M<x.length;M++)t.update(g,n,x[M])}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function Cg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Pg(i,e,t){const n=new WeakMap,s=new mt;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==f){let _=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",_)};var p=_;u!==void 0&&u.texture.dispose();const m=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,d=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let S=0;m===!0&&(S=1),x===!0&&(S=2),d===!0&&(S=3);let T=a.attributes.position.count*S,E=1;T>e.maxTextureSize&&(E=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const w=new Float32Array(T*E*4*f),A=new ud(w,T,E,f);A.type=Sn,A.needsUpdate=!0;const N=S*4;for(let y=0;y<f;y++){const P=g[y],I=M[y],D=v[y],O=T*E*4*y;for(let U=0;U<P.count;U++){const V=U*N;m===!0&&(s.fromBufferAttribute(P,U),w[O+V+0]=s.x,w[O+V+1]=s.y,w[O+V+2]=s.z,w[O+V+3]=0),x===!0&&(s.fromBufferAttribute(I,U),w[O+V+4]=s.x,w[O+V+5]=s.y,w[O+V+6]=s.z,w[O+V+7]=0),d===!0&&(s.fromBufferAttribute(D,U),w[O+V+8]=s.x,w[O+V+9]=s.y,w[O+V+10]=s.z,w[O+V+11]=D.itemSize===4?s.w:1)}}u={count:f,texture:A,size:new we(T,E)},n.set(a,u),a.addEventListener("dispose",_)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let m=0;for(let d=0;d<l.length;d++)m+=l[d];const x=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Lg(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,f=e.get(c,h);if(s.get(f)!==l&&(e.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return f}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class Md extends Wt{constructor(e,t,n,s,r,o,a,c,l,h=Xs){if(h!==Xs&&h!==Js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Xs&&(n=fs),n===void 0&&h===Js&&(n=Zs),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:gn,this.minFilter=c!==void 0?c:gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Sd=new Wt,Dh=new Md(1,1),wd=new ud,bd=new mp,Ed=new vd,Nh=[],Uh=[],Fh=new Float32Array(16),Oh=new Float32Array(9),zh=new Float32Array(4);function rr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Nh[s];if(r===void 0&&(r=new Float32Array(s),Nh[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function qt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ra(i,e){let t=Uh[e];t===void 0&&(t=new Int32Array(e),Uh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ig(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Dg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;i.uniform2fv(this.addr,e),qt(t,e)}}function Ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Kt(t,e))return;i.uniform3fv(this.addr,e),qt(t,e)}}function Ug(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;i.uniform4fv(this.addr,e),qt(t,e)}}function Fg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Kt(t,n))return;zh.set(n),i.uniformMatrix2fv(this.addr,!1,zh),qt(t,n)}}function Og(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Kt(t,n))return;Oh.set(n),i.uniformMatrix3fv(this.addr,!1,Oh),qt(t,n)}}function zg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Kt(t,n))return;Fh.set(n),i.uniformMatrix4fv(this.addr,!1,Fh),qt(t,n)}}function kg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Bg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;i.uniform2iv(this.addr,e),qt(t,e)}}function Hg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;i.uniform3iv(this.addr,e),qt(t,e)}}function Gg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;i.uniform4iv(this.addr,e),qt(t,e)}}function Vg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Wg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;i.uniform2uiv(this.addr,e),qt(t,e)}}function Xg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;i.uniform3uiv(this.addr,e),qt(t,e)}}function Kg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;i.uniform4uiv(this.addr,e),qt(t,e)}}function qg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Dh.compareFunction=cd,r=Dh):r=Sd,t.setTexture2D(e||r,s)}function Yg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||bd,s)}function $g(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ed,s)}function jg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||wd,s)}function Zg(i){switch(i){case 5126:return Ig;case 35664:return Dg;case 35665:return Ng;case 35666:return Ug;case 35674:return Fg;case 35675:return Og;case 35676:return zg;case 5124:case 35670:return kg;case 35667:case 35671:return Bg;case 35668:case 35672:return Hg;case 35669:case 35673:return Gg;case 5125:return Vg;case 36294:return Wg;case 36295:return Xg;case 36296:return Kg;case 35678:case 36198:case 36298:case 36306:case 35682:return qg;case 35679:case 36299:case 36307:return Yg;case 35680:case 36300:case 36308:case 36293:return $g;case 36289:case 36303:case 36311:case 36292:return jg}}function Jg(i,e){i.uniform1fv(this.addr,e)}function Qg(i,e){const t=rr(e,this.size,2);i.uniform2fv(this.addr,t)}function ex(i,e){const t=rr(e,this.size,3);i.uniform3fv(this.addr,t)}function tx(i,e){const t=rr(e,this.size,4);i.uniform4fv(this.addr,t)}function nx(i,e){const t=rr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ix(i,e){const t=rr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function sx(i,e){const t=rr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function rx(i,e){i.uniform1iv(this.addr,e)}function ox(i,e){i.uniform2iv(this.addr,e)}function ax(i,e){i.uniform3iv(this.addr,e)}function cx(i,e){i.uniform4iv(this.addr,e)}function lx(i,e){i.uniform1uiv(this.addr,e)}function hx(i,e){i.uniform2uiv(this.addr,e)}function ux(i,e){i.uniform3uiv(this.addr,e)}function dx(i,e){i.uniform4uiv(this.addr,e)}function fx(i,e,t){const n=this.cache,s=e.length,r=ra(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Sd,r[o])}function px(i,e,t){const n=this.cache,s=e.length,r=ra(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||bd,r[o])}function mx(i,e,t){const n=this.cache,s=e.length,r=ra(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Ed,r[o])}function gx(i,e,t){const n=this.cache,s=e.length,r=ra(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||wd,r[o])}function xx(i){switch(i){case 5126:return Jg;case 35664:return Qg;case 35665:return ex;case 35666:return tx;case 35674:return nx;case 35675:return ix;case 35676:return sx;case 5124:case 35670:return rx;case 35667:case 35671:return ox;case 35668:case 35672:return ax;case 35669:case 35673:return cx;case 5125:return lx;case 36294:return hx;case 36295:return ux;case 36296:return dx;case 35678:case 36198:case 36298:case 36306:case 35682:return fx;case 35679:case 36299:case 36307:return px;case 35680:case 36300:case 36308:case 36293:return mx;case 36289:case 36303:case 36311:case 36292:return gx}}class _x{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Zg(t.type)}}class vx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=xx(t.type)}}class yx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Wa=/(\w+)(\])?(\[|\.)?/g;function kh(i,e){i.seq.push(e),i.map[e.id]=e}function Mx(i,e,t){const n=i.name,s=n.length;for(Wa.lastIndex=0;;){const r=Wa.exec(n),o=Wa.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){kh(t,l===void 0?new _x(a,i,e):new vx(a,i,e));break}else{let f=t.map[a];f===void 0&&(f=new yx(a),kh(t,f)),t=f}}}class Xo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Mx(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Bh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Sx=37297;let wx=0;function bx(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Ex(i){const e=pt.getPrimaries(pt.workingColorSpace),t=pt.getPrimaries(i);let n;switch(e===t?n="":e===Zo&&t===jo?n="LinearDisplayP3ToLinearSRGB":e===jo&&t===Zo&&(n="LinearSRGBToLinearDisplayP3"),i){case tn:case ia:return[n,"LinearTransferOETF"];case ln:case Sl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Hh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+bx(i.getShaderSource(e),o)}else return s}function Tx(i,e){const t=Ex(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Ax(i,e){let t;switch(e){case bf:t="Linear";break;case Ef:t="Reinhard";break;case Tf:t="Cineon";break;case Yu:t="ACESFilmic";break;case Rf:t="AgX";break;case Cf:t="Neutral";break;case Af:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const xo=new F;function Rx(){pt.getLuminanceCoefficients(xo);const i=xo.x.toFixed(4),e=xo.y.toFixed(4),t=xo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rr).join(`
`)}function Px(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Lx(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Rr(i){return i!==""}function Gh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ix=/^[ \t]*#include +<([\w\d./]+)>/gm;function el(i){return i.replace(Ix,Nx)}const Dx=new Map;function Nx(i,e){let t=tt[e];if(t===void 0){const n=Dx.get(e);if(n!==void 0)t=tt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return el(t)}const Ux=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wh(i){return i.replace(Ux,Fx)}function Fx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Ox(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Xu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ku?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Mi&&(e="SHADOWMAP_TYPE_VSM"),e}function zx(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case $s:case js:e="ENVMAP_TYPE_CUBE";break;case na:e="ENVMAP_TYPE_CUBE_UV";break}return e}function kx(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case js:e="ENVMAP_MODE_REFRACTION";break}return e}function Bx(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case qu:e="ENVMAP_BLENDING_MULTIPLY";break;case Sf:e="ENVMAP_BLENDING_MIX";break;case wf:e="ENVMAP_BLENDING_ADD";break}return e}function Hx(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Gx(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Ox(t),l=zx(t),h=kx(t),f=Bx(t),u=Hx(t),p=Cx(t),m=Px(r),x=s.createProgram();let d,g,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Rr).join(`
`),d.length>0&&(d+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Rr).join(`
`),g.length>0&&(g+=`
`)):(d=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rr).join(`
`),g=[Xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yi?"#define TONE_MAPPING":"",t.toneMapping!==Yi?tt.tonemapping_pars_fragment:"",t.toneMapping!==Yi?Ax("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,Tx("linearToOutputTexel",t.outputColorSpace),Rx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Rr).join(`
`)),o=el(o),o=Gh(o,t),o=Vh(o,t),a=el(a),a=Gh(a,t),a=Vh(a,t),o=Wh(o),a=Wh(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,d=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,g=["#define varying in",t.glslVersion===ch?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ch?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const v=M+d+o,S=M+g+a,T=Bh(s,s.VERTEX_SHADER,v),E=Bh(s,s.FRAGMENT_SHADER,S);s.attachShader(x,T),s.attachShader(x,E),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(y){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(x).trim(),I=s.getShaderInfoLog(T).trim(),D=s.getShaderInfoLog(E).trim();let O=!0,U=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,E);else{const V=Hh(s,T,"vertex"),z=Hh(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+P+`
`+V+`
`+z)}else P!==""?console.warn("THREE.WebGLProgram: Program Info Log:",P):(I===""||D==="")&&(U=!1);U&&(y.diagnostics={runnable:O,programLog:P,vertexShader:{log:I,prefix:d},fragmentShader:{log:D,prefix:g}})}s.deleteShader(T),s.deleteShader(E),A=new Xo(s,x),N=Lx(s,x)}let A;this.getUniforms=function(){return A===void 0&&w(this),A};let N;this.getAttributes=function(){return N===void 0&&w(this),N};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(x,Sx)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wx++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=E,this}let Vx=0;class Wx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Xx(e),t.set(e,n)),n}}class Xx{constructor(e){this.id=Vx++,this.code=e,this.usedTimes=0}}function Kx(i,e,t,n,s,r,o){const a=new dd,c=new Wx,l=new Set,h=[],f=s.logarithmicDepthBuffer,u=s.reverseDepthBuffer,p=s.vertexTextures;let m=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(_){return l.add(_),_===0?"uv":`uv${_}`}function g(_,y,P,I,D){const O=I.fog,U=D.geometry,V=_.isMeshStandardMaterial?I.environment:null,z=(_.isMeshStandardMaterial?t:e).get(_.envMap||V),ce=z&&z.mapping===na?z.image.height:null,le=x[_.type];_.precision!==null&&(m=s.getMaxPrecision(_.precision),m!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",m,"instead."));const be=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,j=be!==void 0?be.length:0;let Re=0;U.morphAttributes.position!==void 0&&(Re=1),U.morphAttributes.normal!==void 0&&(Re=2),U.morphAttributes.color!==void 0&&(Re=3);let K,ae,xe,te;if(le){const sn=ei[le];K=sn.vertexShader,ae=sn.fragmentShader}else K=_.vertexShader,ae=_.fragmentShader,c.update(_),xe=c.getVertexShaderID(_),te=c.getFragmentShaderID(_);const me=i.getRenderTarget(),Se=D.isInstancedMesh===!0,De=D.isBatchedMesh===!0,$e=!!_.map,oe=!!_.matcap,L=!!z,q=!!_.aoMap,ge=!!_.lightMap,Q=!!_.bumpMap,he=!!_.normalMap,ye=!!_.displacementMap,_e=!!_.emissiveMap,C=!!_.metalnessMap,b=!!_.roughnessMap,B=_.anisotropy>0,ie=_.clearcoat>0,ee=_.dispersion>0,ne=_.iridescence>0,se=_.sheen>0,ve=_.transmission>0,Te=B&&!!_.anisotropyMap,Ke=ie&&!!_.clearcoatMap,pe=ie&&!!_.clearcoatNormalMap,Ie=ie&&!!_.clearcoatRoughnessMap,je=ne&&!!_.iridescenceMap,ke=ne&&!!_.iridescenceThicknessMap,Ne=se&&!!_.sheenColorMap,it=se&&!!_.sheenRoughnessMap,Xe=!!_.specularMap,ht=!!_.specularColorMap,H=!!_.specularIntensityMap,Pe=ve&&!!_.transmissionMap,J=ve&&!!_.thicknessMap,ue=!!_.gradientMap,Ee=!!_.alphaMap,Ce=_.alphaTest>0,rt=!!_.alphaHash,at=!!_.extensions;let nn=Yi;_.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(nn=i.toneMapping);const et={shaderID:le,shaderType:_.type,shaderName:_.name,vertexShader:K,fragmentShader:ae,defines:_.defines,customVertexShaderID:xe,customFragmentShaderID:te,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:m,batching:De,batchingColor:De&&D._colorsTexture!==null,instancing:Se,instancingColor:Se&&D.instanceColor!==null,instancingMorph:Se&&D.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:me===null?i.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:tn,alphaToCoverage:!!_.alphaToCoverage,map:$e,matcap:oe,envMap:L,envMapMode:L&&z.mapping,envMapCubeUVHeight:ce,aoMap:q,lightMap:ge,bumpMap:Q,normalMap:he,displacementMap:p&&ye,emissiveMap:_e,normalMapObjectSpace:he&&_.normalMapType===Uf,normalMapTangentSpace:he&&_.normalMapType===ad,metalnessMap:C,roughnessMap:b,anisotropy:B,anisotropyMap:Te,clearcoat:ie,clearcoatMap:Ke,clearcoatNormalMap:pe,clearcoatRoughnessMap:Ie,dispersion:ee,iridescence:ne,iridescenceMap:je,iridescenceThicknessMap:ke,sheen:se,sheenColorMap:Ne,sheenRoughnessMap:it,specularMap:Xe,specularColorMap:ht,specularIntensityMap:H,transmission:ve,transmissionMap:Pe,thicknessMap:J,gradientMap:ue,opaque:_.transparent===!1&&_.blending===Ws&&_.alphaToCoverage===!1,alphaMap:Ee,alphaTest:Ce,alphaHash:rt,combine:_.combine,mapUv:$e&&d(_.map.channel),aoMapUv:q&&d(_.aoMap.channel),lightMapUv:ge&&d(_.lightMap.channel),bumpMapUv:Q&&d(_.bumpMap.channel),normalMapUv:he&&d(_.normalMap.channel),displacementMapUv:ye&&d(_.displacementMap.channel),emissiveMapUv:_e&&d(_.emissiveMap.channel),metalnessMapUv:C&&d(_.metalnessMap.channel),roughnessMapUv:b&&d(_.roughnessMap.channel),anisotropyMapUv:Te&&d(_.anisotropyMap.channel),clearcoatMapUv:Ke&&d(_.clearcoatMap.channel),clearcoatNormalMapUv:pe&&d(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ie&&d(_.clearcoatRoughnessMap.channel),iridescenceMapUv:je&&d(_.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&d(_.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&d(_.sheenColorMap.channel),sheenRoughnessMapUv:it&&d(_.sheenRoughnessMap.channel),specularMapUv:Xe&&d(_.specularMap.channel),specularColorMapUv:ht&&d(_.specularColorMap.channel),specularIntensityMapUv:H&&d(_.specularIntensityMap.channel),transmissionMapUv:Pe&&d(_.transmissionMap.channel),thicknessMapUv:J&&d(_.thicknessMap.channel),alphaMapUv:Ee&&d(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(he||B),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!U.attributes.uv&&($e||Ee),fog:!!O,useFog:_.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:u,skinning:D.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:Re,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:nn,decodeVideoTexture:$e&&_.map.isVideoTexture===!0&&pt.getTransfer(_.map.colorSpace)===Et,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Gt,flipSided:_.side===xn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:at&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(at&&_.extensions.multiDraw===!0||De)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return et.vertexUv1s=l.has(1),et.vertexUv2s=l.has(2),et.vertexUv3s=l.has(3),l.clear(),et}function M(_){const y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)y.push(P),y.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(v(y,_),S(y,_),y.push(i.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function v(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function S(_,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),_.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.alphaToCoverage&&a.enable(20),_.push(a.mask)}function T(_){const y=x[_.type];let P;if(y){const I=ei[y];P=xd.clone(I.uniforms)}else P=_.uniforms;return P}function E(_,y){let P;for(let I=0,D=h.length;I<D;I++){const O=h[I];if(O.cacheKey===y){P=O,++P.usedTimes;break}}return P===void 0&&(P=new Gx(i,y,_,r),h.push(P)),P}function w(_){if(--_.usedTimes===0){const y=h.indexOf(_);h[y]=h[h.length-1],h.pop(),_.destroy()}}function A(_){c.remove(_)}function N(){c.dispose()}return{getParameters:g,getProgramCacheKey:M,getUniforms:T,acquireProgram:E,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:N}}function qx(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Yx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Kh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function qh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f,u,p,m,x,d){let g=i[e];return g===void 0?(g={id:f.id,object:f,geometry:u,material:p,groupOrder:m,renderOrder:f.renderOrder,z:x,group:d},i[e]=g):(g.id=f.id,g.object=f,g.geometry=u,g.material=p,g.groupOrder=m,g.renderOrder=f.renderOrder,g.z=x,g.group=d),e++,g}function a(f,u,p,m,x,d){const g=o(f,u,p,m,x,d);p.transmission>0?n.push(g):p.transparent===!0?s.push(g):t.push(g)}function c(f,u,p,m,x,d){const g=o(f,u,p,m,x,d);p.transmission>0?n.unshift(g):p.transparent===!0?s.unshift(g):t.unshift(g)}function l(f,u){t.length>1&&t.sort(f||Yx),n.length>1&&n.sort(u||Kh),s.length>1&&s.sort(u||Kh)}function h(){for(let f=e,u=i.length;f<u;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function $x(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new qh,i.set(n,[o])):s>=r.length?(o=new qh,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function jx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new We};break;case"SpotLight":t={position:new F,direction:new F,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new F,halfWidth:new F,halfHeight:new F};break}return i[e.id]=t,t}}}function Zx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Jx=0;function Qx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function e_(i){const e=new jx,t=Zx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const s=new F,r=new Ze,o=new Ze;function a(l){let h=0,f=0,u=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let p=0,m=0,x=0,d=0,g=0,M=0,v=0,S=0,T=0,E=0,w=0;l.sort(Qx);for(let N=0,_=l.length;N<_;N++){const y=l[N],P=y.color,I=y.intensity,D=y.distance,O=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)h+=P.r*I,f+=P.g*I,u+=P.b*I;else if(y.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(y.sh.coefficients[U],I);w++}else if(y.isDirectionalLight){const U=e.get(y);if(U.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const V=y.shadow,z=t.get(y);z.shadowIntensity=V.intensity,z.shadowBias=V.bias,z.shadowNormalBias=V.normalBias,z.shadowRadius=V.radius,z.shadowMapSize=V.mapSize,n.directionalShadow[p]=z,n.directionalShadowMap[p]=O,n.directionalShadowMatrix[p]=y.shadow.matrix,M++}n.directional[p]=U,p++}else if(y.isSpotLight){const U=e.get(y);U.position.setFromMatrixPosition(y.matrixWorld),U.color.copy(P).multiplyScalar(I),U.distance=D,U.coneCos=Math.cos(y.angle),U.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),U.decay=y.decay,n.spot[x]=U;const V=y.shadow;if(y.map&&(n.spotLightMap[T]=y.map,T++,V.updateMatrices(y),y.castShadow&&E++),n.spotLightMatrix[x]=V.matrix,y.castShadow){const z=t.get(y);z.shadowIntensity=V.intensity,z.shadowBias=V.bias,z.shadowNormalBias=V.normalBias,z.shadowRadius=V.radius,z.shadowMapSize=V.mapSize,n.spotShadow[x]=z,n.spotShadowMap[x]=O,S++}x++}else if(y.isRectAreaLight){const U=e.get(y);U.color.copy(P).multiplyScalar(I),U.halfWidth.set(y.width*.5,0,0),U.halfHeight.set(0,y.height*.5,0),n.rectArea[d]=U,d++}else if(y.isPointLight){const U=e.get(y);if(U.color.copy(y.color).multiplyScalar(y.intensity),U.distance=y.distance,U.decay=y.decay,y.castShadow){const V=y.shadow,z=t.get(y);z.shadowIntensity=V.intensity,z.shadowBias=V.bias,z.shadowNormalBias=V.normalBias,z.shadowRadius=V.radius,z.shadowMapSize=V.mapSize,z.shadowCameraNear=V.camera.near,z.shadowCameraFar=V.camera.far,n.pointShadow[m]=z,n.pointShadowMap[m]=O,n.pointShadowMatrix[m]=y.shadow.matrix,v++}n.point[m]=U,m++}else if(y.isHemisphereLight){const U=e.get(y);U.skyColor.copy(y.color).multiplyScalar(I),U.groundColor.copy(y.groundColor).multiplyScalar(I),n.hemi[g]=U,g++}}d>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const A=n.hash;(A.directionalLength!==p||A.pointLength!==m||A.spotLength!==x||A.rectAreaLength!==d||A.hemiLength!==g||A.numDirectionalShadows!==M||A.numPointShadows!==v||A.numSpotShadows!==S||A.numSpotMaps!==T||A.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=d,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=S+T-E,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=w,A.directionalLength=p,A.pointLength=m,A.spotLength=x,A.rectAreaLength=d,A.hemiLength=g,A.numDirectionalShadows=M,A.numPointShadows=v,A.numSpotShadows=S,A.numSpotMaps=T,A.numLightProbes=w,n.version=Jx++)}function c(l,h){let f=0,u=0,p=0,m=0,x=0;const d=h.matrixWorldInverse;for(let g=0,M=l.length;g<M;g++){const v=l[g];if(v.isDirectionalLight){const S=n.directional[f];S.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(d),f++}else if(v.isSpotLight){const S=n.spot[p];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(d),S.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(d),p++}else if(v.isRectAreaLight){const S=n.rectArea[m];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(d),o.identity(),r.copy(v.matrixWorld),r.premultiply(d),o.extractRotation(r),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),m++}else if(v.isPointLight){const S=n.point[u];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(d),u++}else if(v.isHemisphereLight){const S=n.hemi[x];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(d),x++}}}return{setup:a,setupView:c,state:n}}function Yh(i){const e=new e_(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function t_(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Yh(i),e.set(s,[a])):r>=o.length?(a=new Yh(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class n_ extends Xn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Df,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class i_ extends Xn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const s_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r_=`uniform sampler2D shadow_pass;
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
}`;function o_(i,e,t){let n=new bl;const s=new we,r=new we,o=new mt,a=new n_({depthPacking:Nf}),c=new i_,l={},h=t.maxTextureSize,f={[Ri]:xn,[xn]:Ri,[Gt]:Gt},u=new Pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:s_,fragmentShader:r_}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const m=new Ot;m.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new X(m,u),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xu;let g=this.type;this.render=function(E,w,A){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||E.length===0)return;const N=i.getRenderTarget(),_=i.getActiveCubeFace(),y=i.getActiveMipmapLevel(),P=i.state;P.setBlending(qi),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const I=g!==Mi&&this.type===Mi,D=g===Mi&&this.type!==Mi;for(let O=0,U=E.length;O<U;O++){const V=E[O],z=V.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const ce=z.getFrameExtents();if(s.multiply(ce),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ce.x),s.x=r.x*ce.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ce.y),s.y=r.y*ce.y,z.mapSize.y=r.y)),z.map===null||I===!0||D===!0){const be=this.type!==Mi?{minFilter:gn,magFilter:gn}:{};z.map!==null&&z.map.dispose(),z.map=new ps(s.x,s.y,be),z.map.texture.name=V.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const le=z.getViewportCount();for(let be=0;be<le;be++){const j=z.getViewport(be);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),P.viewport(o),z.updateMatrices(V,be),n=z.getFrustum(),S(w,A,z.camera,V,this.type)}z.isPointLightShadow!==!0&&this.type===Mi&&M(z,A),z.needsUpdate=!1}g=this.type,d.needsUpdate=!1,i.setRenderTarget(N,_,y)};function M(E,w){const A=e.update(x);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ps(s.x,s.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(w,null,A,u,x,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(w,null,A,p,x,null)}function v(E,w,A,N){let _=null;const y=A.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(y!==void 0)_=y;else if(_=A.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const P=_.uuid,I=w.uuid;let D=l[P];D===void 0&&(D={},l[P]=D);let O=D[I];O===void 0&&(O=_.clone(),D[I]=O,w.addEventListener("dispose",T)),_=O}if(_.visible=w.visible,_.wireframe=w.wireframe,N===Mi?_.side=w.shadowSide!==null?w.shadowSide:w.side:_.side=w.shadowSide!==null?w.shadowSide:f[w.side],_.alphaMap=w.alphaMap,_.alphaTest=w.alphaTest,_.map=w.map,_.clipShadows=w.clipShadows,_.clippingPlanes=w.clippingPlanes,_.clipIntersection=w.clipIntersection,_.displacementMap=w.displacementMap,_.displacementScale=w.displacementScale,_.displacementBias=w.displacementBias,_.wireframeLinewidth=w.wireframeLinewidth,_.linewidth=w.linewidth,A.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const P=i.properties.get(_);P.light=A}return _}function S(E,w,A,N,_){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&_===Mi)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,E.matrixWorld);const I=e.update(E),D=E.material;if(Array.isArray(D)){const O=I.groups;for(let U=0,V=O.length;U<V;U++){const z=O[U],ce=D[z.materialIndex];if(ce&&ce.visible){const le=v(E,ce,N,_);E.onBeforeShadow(i,E,w,A,I,le,z),i.renderBufferDirect(A,null,I,le,E,z),E.onAfterShadow(i,E,w,A,I,le,z)}}}else if(D.visible){const O=v(E,D,N,_);E.onBeforeShadow(i,E,w,A,I,O,null),i.renderBufferDirect(A,null,I,O,E,null),E.onAfterShadow(i,E,w,A,I,O,null)}}const P=E.children;for(let I=0,D=P.length;I<D;I++)S(P[I],w,A,N,_)}function T(E){E.target.removeEventListener("dispose",T);for(const A in l){const N=l[A],_=E.target.uuid;_ in N&&(N[_].dispose(),delete N[_])}}}const a_={[gc]:xc,[_c]:Mc,[vc]:Sc,[Ys]:yc,[xc]:gc,[Mc]:_c,[Sc]:vc,[yc]:Ys};function c_(i){function e(){let H=!1;const Pe=new mt;let J=null;const ue=new mt(0,0,0,0);return{setMask:function(Ee){J!==Ee&&!H&&(i.colorMask(Ee,Ee,Ee,Ee),J=Ee)},setLocked:function(Ee){H=Ee},setClear:function(Ee,Ce,rt,at,nn){nn===!0&&(Ee*=at,Ce*=at,rt*=at),Pe.set(Ee,Ce,rt,at),ue.equals(Pe)===!1&&(i.clearColor(Ee,Ce,rt,at),ue.copy(Pe))},reset:function(){H=!1,J=null,ue.set(-1,0,0,0)}}}function t(){let H=!1,Pe=!1,J=null,ue=null,Ee=null;return{setReversed:function(Ce){Pe=Ce},setTest:function(Ce){Ce?xe(i.DEPTH_TEST):te(i.DEPTH_TEST)},setMask:function(Ce){J!==Ce&&!H&&(i.depthMask(Ce),J=Ce)},setFunc:function(Ce){if(Pe&&(Ce=a_[Ce]),ue!==Ce){switch(Ce){case gc:i.depthFunc(i.NEVER);break;case xc:i.depthFunc(i.ALWAYS);break;case _c:i.depthFunc(i.LESS);break;case Ys:i.depthFunc(i.LEQUAL);break;case vc:i.depthFunc(i.EQUAL);break;case yc:i.depthFunc(i.GEQUAL);break;case Mc:i.depthFunc(i.GREATER);break;case Sc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ue=Ce}},setLocked:function(Ce){H=Ce},setClear:function(Ce){Ee!==Ce&&(i.clearDepth(Ce),Ee=Ce)},reset:function(){H=!1,J=null,ue=null,Ee=null}}}function n(){let H=!1,Pe=null,J=null,ue=null,Ee=null,Ce=null,rt=null,at=null,nn=null;return{setTest:function(et){H||(et?xe(i.STENCIL_TEST):te(i.STENCIL_TEST))},setMask:function(et){Pe!==et&&!H&&(i.stencilMask(et),Pe=et)},setFunc:function(et,sn,ot){(J!==et||ue!==sn||Ee!==ot)&&(i.stencilFunc(et,sn,ot),J=et,ue=sn,Ee=ot)},setOp:function(et,sn,ot){(Ce!==et||rt!==sn||at!==ot)&&(i.stencilOp(et,sn,ot),Ce=et,rt=sn,at=ot)},setLocked:function(et){H=et},setClear:function(et){nn!==et&&(i.clearStencil(et),nn=et)},reset:function(){H=!1,Pe=null,J=null,ue=null,Ee=null,Ce=null,rt=null,at=null,nn=null}}}const s=new e,r=new t,o=new n,a=new WeakMap,c=new WeakMap;let l={},h={},f=new WeakMap,u=[],p=null,m=!1,x=null,d=null,g=null,M=null,v=null,S=null,T=null,E=new We(0,0,0),w=0,A=!1,N=null,_=null,y=null,P=null,I=null;const D=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,U=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(V)[1]),O=U>=1):V.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),O=U>=2);let z=null,ce={};const le=i.getParameter(i.SCISSOR_BOX),be=i.getParameter(i.VIEWPORT),j=new mt().fromArray(le),Re=new mt().fromArray(be);function K(H,Pe,J,ue){const Ee=new Uint8Array(4),Ce=i.createTexture();i.bindTexture(H,Ce),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let rt=0;rt<J;rt++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(Pe,0,i.RGBA,1,1,ue,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(Pe+rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return Ce}const ae={};ae[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),ae[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ae[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),xe(i.DEPTH_TEST),r.setFunc(Ys),ge(!1),Q(eh),xe(i.CULL_FACE),L(qi);function xe(H){l[H]!==!0&&(i.enable(H),l[H]=!0)}function te(H){l[H]!==!1&&(i.disable(H),l[H]=!1)}function me(H,Pe){return h[H]!==Pe?(i.bindFramebuffer(H,Pe),h[H]=Pe,H===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Pe),H===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Pe),!0):!1}function Se(H,Pe){let J=u,ue=!1;if(H){J=f.get(Pe),J===void 0&&(J=[],f.set(Pe,J));const Ee=H.textures;if(J.length!==Ee.length||J[0]!==i.COLOR_ATTACHMENT0){for(let Ce=0,rt=Ee.length;Ce<rt;Ce++)J[Ce]=i.COLOR_ATTACHMENT0+Ce;J.length=Ee.length,ue=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ue=!0);ue&&i.drawBuffers(J)}function De(H){return p!==H?(i.useProgram(H),p=H,!0):!1}const $e={[cs]:i.FUNC_ADD,[rf]:i.FUNC_SUBTRACT,[of]:i.FUNC_REVERSE_SUBTRACT};$e[af]=i.MIN,$e[cf]=i.MAX;const oe={[lf]:i.ZERO,[hf]:i.ONE,[uf]:i.SRC_COLOR,[pc]:i.SRC_ALPHA,[xf]:i.SRC_ALPHA_SATURATE,[mf]:i.DST_COLOR,[ff]:i.DST_ALPHA,[df]:i.ONE_MINUS_SRC_COLOR,[mc]:i.ONE_MINUS_SRC_ALPHA,[gf]:i.ONE_MINUS_DST_COLOR,[pf]:i.ONE_MINUS_DST_ALPHA,[_f]:i.CONSTANT_COLOR,[vf]:i.ONE_MINUS_CONSTANT_COLOR,[yf]:i.CONSTANT_ALPHA,[Mf]:i.ONE_MINUS_CONSTANT_ALPHA};function L(H,Pe,J,ue,Ee,Ce,rt,at,nn,et){if(H===qi){m===!0&&(te(i.BLEND),m=!1);return}if(m===!1&&(xe(i.BLEND),m=!0),H!==sf){if(H!==x||et!==A){if((d!==cs||v!==cs)&&(i.blendEquation(i.FUNC_ADD),d=cs,v=cs),et)switch(H){case Ws:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fr:i.blendFunc(i.ONE,i.ONE);break;case th:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Ws:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case th:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}g=null,M=null,S=null,T=null,E.set(0,0,0),w=0,x=H,A=et}return}Ee=Ee||Pe,Ce=Ce||J,rt=rt||ue,(Pe!==d||Ee!==v)&&(i.blendEquationSeparate($e[Pe],$e[Ee]),d=Pe,v=Ee),(J!==g||ue!==M||Ce!==S||rt!==T)&&(i.blendFuncSeparate(oe[J],oe[ue],oe[Ce],oe[rt]),g=J,M=ue,S=Ce,T=rt),(at.equals(E)===!1||nn!==w)&&(i.blendColor(at.r,at.g,at.b,nn),E.copy(at),w=nn),x=H,A=!1}function q(H,Pe){H.side===Gt?te(i.CULL_FACE):xe(i.CULL_FACE);let J=H.side===xn;Pe&&(J=!J),ge(J),H.blending===Ws&&H.transparent===!1?L(qi):L(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),r.setFunc(H.depthFunc),r.setTest(H.depthTest),r.setMask(H.depthWrite),s.setMask(H.colorWrite);const ue=H.stencilWrite;o.setTest(ue),ue&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),ye(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?xe(i.SAMPLE_ALPHA_TO_COVERAGE):te(i.SAMPLE_ALPHA_TO_COVERAGE)}function ge(H){N!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),N=H)}function Q(H){H!==tf?(xe(i.CULL_FACE),H!==_&&(H===eh?i.cullFace(i.BACK):H===nf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):te(i.CULL_FACE),_=H}function he(H){H!==y&&(O&&i.lineWidth(H),y=H)}function ye(H,Pe,J){H?(xe(i.POLYGON_OFFSET_FILL),(P!==Pe||I!==J)&&(i.polygonOffset(Pe,J),P=Pe,I=J)):te(i.POLYGON_OFFSET_FILL)}function _e(H){H?xe(i.SCISSOR_TEST):te(i.SCISSOR_TEST)}function C(H){H===void 0&&(H=i.TEXTURE0+D-1),z!==H&&(i.activeTexture(H),z=H)}function b(H,Pe,J){J===void 0&&(z===null?J=i.TEXTURE0+D-1:J=z);let ue=ce[J];ue===void 0&&(ue={type:void 0,texture:void 0},ce[J]=ue),(ue.type!==H||ue.texture!==Pe)&&(z!==J&&(i.activeTexture(J),z=J),i.bindTexture(H,Pe||ae[H]),ue.type=H,ue.texture=Pe)}function B(){const H=ce[z];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ie(){try{i.compressedTexImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ee(){try{i.compressedTexImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ne(){try{i.texSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function se(){try{i.texSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ve(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Te(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ke(){try{i.texStorage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function pe(){try{i.texStorage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ie(){try{i.texImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function je(){try{i.texImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ke(H){j.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),j.copy(H))}function Ne(H){Re.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),Re.copy(H))}function it(H,Pe){let J=c.get(Pe);J===void 0&&(J=new WeakMap,c.set(Pe,J));let ue=J.get(H);ue===void 0&&(ue=i.getUniformBlockIndex(Pe,H.name),J.set(H,ue))}function Xe(H,Pe){const ue=c.get(Pe).get(H);a.get(Pe)!==ue&&(i.uniformBlockBinding(Pe,ue,H.__bindingPointIndex),a.set(Pe,ue))}function ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},z=null,ce={},h={},f=new WeakMap,u=[],p=null,m=!1,x=null,d=null,g=null,M=null,v=null,S=null,T=null,E=new We(0,0,0),w=0,A=!1,N=null,_=null,y=null,P=null,I=null,j.set(0,0,i.canvas.width,i.canvas.height),Re.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:xe,disable:te,bindFramebuffer:me,drawBuffers:Se,useProgram:De,setBlending:L,setMaterial:q,setFlipSided:ge,setCullFace:Q,setLineWidth:he,setPolygonOffset:ye,setScissorTest:_e,activeTexture:C,bindTexture:b,unbindTexture:B,compressedTexImage2D:ie,compressedTexImage3D:ee,texImage2D:Ie,texImage3D:je,updateUBOMapping:it,uniformBlockBinding:Xe,texStorage2D:Ke,texStorage3D:pe,texSubImage2D:ne,texSubImage3D:se,compressedTexSubImage2D:ve,compressedTexSubImage3D:Te,scissor:ke,viewport:Ne,reset:ht}}function $h(i,e,t,n){const s=l_(n);switch(t){case ed:return i*e;case nd:return i*e;case id:return i*e*2;case _l:return i*e/s.components*s.byteLength;case vl:return i*e/s.components*s.byteLength;case sd:return i*e*2/s.components*s.byteLength;case yl:return i*e*2/s.components*s.byteLength;case td:return i*e*3/s.components*s.byteLength;case Nn:return i*e*4/s.components*s.byteLength;case Ml:return i*e*4/s.components*s.byteLength;case ko:case Bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ho:case Go:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Tc:case Rc:return Math.max(i,16)*Math.max(e,8)/4;case Ec:case Ac:return Math.max(i,8)*Math.max(e,8)/2;case Cc:case Pc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Lc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ic:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Dc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Nc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Fc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Oc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case zc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case kc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Bc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Hc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Gc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Vc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Wc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Xc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Vo:case Kc:case qc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case rd:case Yc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case $c:case jc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function l_(i){switch(i){case Ci:case Zu:return{byteLength:1,components:1};case Or:case Ju:case Ti:return{byteLength:2,components:1};case gl:case xl:return{byteLength:2,components:4};case fs:case ml:case Sn:return{byteLength:4,components:1};case Qu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function h_(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new we,h=new WeakMap;let f;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,b){return p?new OffscreenCanvas(C,b):Br("canvas")}function x(C,b,B){let ie=1;const ee=_e(C);if((ee.width>B||ee.height>B)&&(ie=B/Math.max(ee.width,ee.height)),ie<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ne=Math.floor(ie*ee.width),se=Math.floor(ie*ee.height);f===void 0&&(f=m(ne,se));const ve=b?m(ne,se):f;return ve.width=ne,ve.height=se,ve.getContext("2d").drawImage(C,0,0,ne,se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+ne+"x"+se+")."),ve}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),C;return C}function d(C){return C.generateMipmaps&&C.minFilter!==gn&&C.minFilter!==en}function g(C){i.generateMipmap(C)}function M(C,b,B,ie,ee=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ne=b;if(b===i.RED&&(B===i.FLOAT&&(ne=i.R32F),B===i.HALF_FLOAT&&(ne=i.R16F),B===i.UNSIGNED_BYTE&&(ne=i.R8)),b===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(ne=i.R8UI),B===i.UNSIGNED_SHORT&&(ne=i.R16UI),B===i.UNSIGNED_INT&&(ne=i.R32UI),B===i.BYTE&&(ne=i.R8I),B===i.SHORT&&(ne=i.R16I),B===i.INT&&(ne=i.R32I)),b===i.RG&&(B===i.FLOAT&&(ne=i.RG32F),B===i.HALF_FLOAT&&(ne=i.RG16F),B===i.UNSIGNED_BYTE&&(ne=i.RG8)),b===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(ne=i.RG8UI),B===i.UNSIGNED_SHORT&&(ne=i.RG16UI),B===i.UNSIGNED_INT&&(ne=i.RG32UI),B===i.BYTE&&(ne=i.RG8I),B===i.SHORT&&(ne=i.RG16I),B===i.INT&&(ne=i.RG32I)),b===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(ne=i.RGB8UI),B===i.UNSIGNED_SHORT&&(ne=i.RGB16UI),B===i.UNSIGNED_INT&&(ne=i.RGB32UI),B===i.BYTE&&(ne=i.RGB8I),B===i.SHORT&&(ne=i.RGB16I),B===i.INT&&(ne=i.RGB32I)),b===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(ne=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(ne=i.RGBA16UI),B===i.UNSIGNED_INT&&(ne=i.RGBA32UI),B===i.BYTE&&(ne=i.RGBA8I),B===i.SHORT&&(ne=i.RGBA16I),B===i.INT&&(ne=i.RGBA32I)),b===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(ne=i.RGB9_E5),b===i.RGBA){const se=ee?$o:pt.getTransfer(ie);B===i.FLOAT&&(ne=i.RGBA32F),B===i.HALF_FLOAT&&(ne=i.RGBA16F),B===i.UNSIGNED_BYTE&&(ne=se===Et?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function v(C,b){let B;return C?b===null||b===fs||b===Zs?B=i.DEPTH24_STENCIL8:b===Sn?B=i.DEPTH32F_STENCIL8:b===Or&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===fs||b===Zs?B=i.DEPTH_COMPONENT24:b===Sn?B=i.DEPTH_COMPONENT32F:b===Or&&(B=i.DEPTH_COMPONENT16),B}function S(C,b){return d(C)===!0||C.isFramebufferTexture&&C.minFilter!==gn&&C.minFilter!==en?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function T(C){const b=C.target;b.removeEventListener("dispose",T),w(b),b.isVideoTexture&&h.delete(b)}function E(C){const b=C.target;b.removeEventListener("dispose",E),N(b)}function w(C){const b=n.get(C);if(b.__webglInit===void 0)return;const B=C.source,ie=u.get(B);if(ie){const ee=ie[b.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&A(C),Object.keys(ie).length===0&&u.delete(B)}n.remove(C)}function A(C){const b=n.get(C);i.deleteTexture(b.__webglTexture);const B=C.source,ie=u.get(B);delete ie[b.__cacheKey],o.memory.textures--}function N(C){const b=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(b.__webglFramebuffer[ie]))for(let ee=0;ee<b.__webglFramebuffer[ie].length;ee++)i.deleteFramebuffer(b.__webglFramebuffer[ie][ee]);else i.deleteFramebuffer(b.__webglFramebuffer[ie]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[ie])}else{if(Array.isArray(b.__webglFramebuffer))for(let ie=0;ie<b.__webglFramebuffer.length;ie++)i.deleteFramebuffer(b.__webglFramebuffer[ie]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ie=0;ie<b.__webglColorRenderbuffer.length;ie++)b.__webglColorRenderbuffer[ie]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[ie]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const B=C.textures;for(let ie=0,ee=B.length;ie<ee;ie++){const ne=n.get(B[ie]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),o.memory.textures--),n.remove(B[ie])}n.remove(C)}let _=0;function y(){_=0}function P(){const C=_;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),_+=1,C}function I(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function D(C,b){const B=n.get(C);if(C.isVideoTexture&&he(C),C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){const ie=C.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Re(B,C,b);return}}t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+b)}function O(C,b){const B=n.get(C);if(C.version>0&&B.__version!==C.version){Re(B,C,b);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+b)}function U(C,b){const B=n.get(C);if(C.version>0&&B.__version!==C.version){Re(B,C,b);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+b)}function V(C,b){const B=n.get(C);if(C.version>0&&B.__version!==C.version){K(B,C,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+b)}const z={[ji]:i.REPEAT,[ti]:i.CLAMP_TO_EDGE,[Yo]:i.MIRRORED_REPEAT},ce={[gn]:i.NEAREST,[ju]:i.NEAREST_MIPMAP_NEAREST,[Ar]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[zo]:i.LINEAR_MIPMAP_NEAREST,[ni]:i.LINEAR_MIPMAP_LINEAR},le={[Ff]:i.NEVER,[Gf]:i.ALWAYS,[Of]:i.LESS,[cd]:i.LEQUAL,[zf]:i.EQUAL,[Hf]:i.GEQUAL,[kf]:i.GREATER,[Bf]:i.NOTEQUAL};function be(C,b){if(b.type===Sn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===en||b.magFilter===zo||b.magFilter===Ar||b.magFilter===ni||b.minFilter===en||b.minFilter===zo||b.minFilter===Ar||b.minFilter===ni)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,z[b.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,z[b.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,z[b.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ce[b.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ce[b.minFilter]),b.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,le[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===gn||b.minFilter!==Ar&&b.minFilter!==ni||b.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function j(C,b){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",T));const ie=b.source;let ee=u.get(ie);ee===void 0&&(ee={},u.set(ie,ee));const ne=I(b);if(ne!==C.__cacheKey){ee[ne]===void 0&&(ee[ne]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),ee[ne].usedTimes++;const se=ee[C.__cacheKey];se!==void 0&&(ee[C.__cacheKey].usedTimes--,se.usedTimes===0&&A(b)),C.__cacheKey=ne,C.__webglTexture=ee[ne].texture}return B}function Re(C,b,B){let ie=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ie=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ie=i.TEXTURE_3D);const ee=j(C,b),ne=b.source;t.bindTexture(ie,C.__webglTexture,i.TEXTURE0+B);const se=n.get(ne);if(ne.version!==se.__version||ee===!0){t.activeTexture(i.TEXTURE0+B);const ve=pt.getPrimaries(pt.workingColorSpace),Te=b.colorSpace===Wi?null:pt.getPrimaries(b.colorSpace),Ke=b.colorSpace===Wi||ve===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);let pe=x(b.image,!1,s.maxTextureSize);pe=ye(b,pe);const Ie=r.convert(b.format,b.colorSpace),je=r.convert(b.type);let ke=M(b.internalFormat,Ie,je,b.colorSpace,b.isVideoTexture);be(ie,b);let Ne;const it=b.mipmaps,Xe=b.isVideoTexture!==!0,ht=se.__version===void 0||ee===!0,H=ne.dataReady,Pe=S(b,pe);if(b.isDepthTexture)ke=v(b.format===Js,b.type),ht&&(Xe?t.texStorage2D(i.TEXTURE_2D,1,ke,pe.width,pe.height):t.texImage2D(i.TEXTURE_2D,0,ke,pe.width,pe.height,0,Ie,je,null));else if(b.isDataTexture)if(it.length>0){Xe&&ht&&t.texStorage2D(i.TEXTURE_2D,Pe,ke,it[0].width,it[0].height);for(let J=0,ue=it.length;J<ue;J++)Ne=it[J],Xe?H&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Ne.width,Ne.height,Ie,je,Ne.data):t.texImage2D(i.TEXTURE_2D,J,ke,Ne.width,Ne.height,0,Ie,je,Ne.data);b.generateMipmaps=!1}else Xe?(ht&&t.texStorage2D(i.TEXTURE_2D,Pe,ke,pe.width,pe.height),H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe.width,pe.height,Ie,je,pe.data)):t.texImage2D(i.TEXTURE_2D,0,ke,pe.width,pe.height,0,Ie,je,pe.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Xe&&ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Pe,ke,it[0].width,it[0].height,pe.depth);for(let J=0,ue=it.length;J<ue;J++)if(Ne=it[J],b.format!==Nn)if(Ie!==null)if(Xe){if(H)if(b.layerUpdates.size>0){const Ee=$h(Ne.width,Ne.height,b.format,b.type);for(const Ce of b.layerUpdates){const rt=Ne.data.subarray(Ce*Ee/Ne.data.BYTES_PER_ELEMENT,(Ce+1)*Ee/Ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,Ce,Ne.width,Ne.height,1,Ie,rt,0,0)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Ne.width,Ne.height,pe.depth,Ie,Ne.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,ke,Ne.width,Ne.height,pe.depth,0,Ne.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xe?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Ne.width,Ne.height,pe.depth,Ie,je,Ne.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,ke,Ne.width,Ne.height,pe.depth,0,Ie,je,Ne.data)}else{Xe&&ht&&t.texStorage2D(i.TEXTURE_2D,Pe,ke,it[0].width,it[0].height);for(let J=0,ue=it.length;J<ue;J++)Ne=it[J],b.format!==Nn?Ie!==null?Xe?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,Ne.width,Ne.height,Ie,Ne.data):t.compressedTexImage2D(i.TEXTURE_2D,J,ke,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?H&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Ne.width,Ne.height,Ie,je,Ne.data):t.texImage2D(i.TEXTURE_2D,J,ke,Ne.width,Ne.height,0,Ie,je,Ne.data)}else if(b.isDataArrayTexture)if(Xe){if(ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Pe,ke,pe.width,pe.height,pe.depth),H)if(b.layerUpdates.size>0){const J=$h(pe.width,pe.height,b.format,b.type);for(const ue of b.layerUpdates){const Ee=pe.data.subarray(ue*J/pe.data.BYTES_PER_ELEMENT,(ue+1)*J/pe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ue,pe.width,pe.height,1,Ie,je,Ee)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,Ie,je,pe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ke,pe.width,pe.height,pe.depth,0,Ie,je,pe.data);else if(b.isData3DTexture)Xe?(ht&&t.texStorage3D(i.TEXTURE_3D,Pe,ke,pe.width,pe.height,pe.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,Ie,je,pe.data)):t.texImage3D(i.TEXTURE_3D,0,ke,pe.width,pe.height,pe.depth,0,Ie,je,pe.data);else if(b.isFramebufferTexture){if(ht)if(Xe)t.texStorage2D(i.TEXTURE_2D,Pe,ke,pe.width,pe.height);else{let J=pe.width,ue=pe.height;for(let Ee=0;Ee<Pe;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,ke,J,ue,0,Ie,je,null),J>>=1,ue>>=1}}else if(it.length>0){if(Xe&&ht){const J=_e(it[0]);t.texStorage2D(i.TEXTURE_2D,Pe,ke,J.width,J.height)}for(let J=0,ue=it.length;J<ue;J++)Ne=it[J],Xe?H&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Ie,je,Ne):t.texImage2D(i.TEXTURE_2D,J,ke,Ie,je,Ne);b.generateMipmaps=!1}else if(Xe){if(ht){const J=_e(pe);t.texStorage2D(i.TEXTURE_2D,Pe,ke,J.width,J.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ie,je,pe)}else t.texImage2D(i.TEXTURE_2D,0,ke,Ie,je,pe);d(b)&&g(ie),se.__version=ne.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function K(C,b,B){if(b.image.length!==6)return;const ie=j(C,b),ee=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+B);const ne=n.get(ee);if(ee.version!==ne.__version||ie===!0){t.activeTexture(i.TEXTURE0+B);const se=pt.getPrimaries(pt.workingColorSpace),ve=b.colorSpace===Wi?null:pt.getPrimaries(b.colorSpace),Te=b.colorSpace===Wi||se===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Ke=b.isCompressedTexture||b.image[0].isCompressedTexture,pe=b.image[0]&&b.image[0].isDataTexture,Ie=[];for(let ue=0;ue<6;ue++)!Ke&&!pe?Ie[ue]=x(b.image[ue],!0,s.maxCubemapSize):Ie[ue]=pe?b.image[ue].image:b.image[ue],Ie[ue]=ye(b,Ie[ue]);const je=Ie[0],ke=r.convert(b.format,b.colorSpace),Ne=r.convert(b.type),it=M(b.internalFormat,ke,Ne,b.colorSpace),Xe=b.isVideoTexture!==!0,ht=ne.__version===void 0||ie===!0,H=ee.dataReady;let Pe=S(b,je);be(i.TEXTURE_CUBE_MAP,b);let J;if(Ke){Xe&&ht&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Pe,it,je.width,je.height);for(let ue=0;ue<6;ue++){J=Ie[ue].mipmaps;for(let Ee=0;Ee<J.length;Ee++){const Ce=J[Ee];b.format!==Nn?ke!==null?Xe?H&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee,0,0,Ce.width,Ce.height,ke,Ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee,it,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xe?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee,0,0,Ce.width,Ce.height,ke,Ne,Ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee,it,Ce.width,Ce.height,0,ke,Ne,Ce.data)}}}else{if(J=b.mipmaps,Xe&&ht){J.length>0&&Pe++;const ue=_e(Ie[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Pe,it,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(pe){Xe?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Ie[ue].width,Ie[ue].height,ke,Ne,Ie[ue].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,it,Ie[ue].width,Ie[ue].height,0,ke,Ne,Ie[ue].data);for(let Ee=0;Ee<J.length;Ee++){const rt=J[Ee].image[ue].image;Xe?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee+1,0,0,rt.width,rt.height,ke,Ne,rt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee+1,it,rt.width,rt.height,0,ke,Ne,rt.data)}}else{Xe?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,ke,Ne,Ie[ue]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,it,ke,Ne,Ie[ue]);for(let Ee=0;Ee<J.length;Ee++){const Ce=J[Ee];Xe?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee+1,0,0,ke,Ne,Ce.image[ue]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ee+1,it,ke,Ne,Ce.image[ue])}}}d(b)&&g(i.TEXTURE_CUBE_MAP),ne.__version=ee.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function ae(C,b,B,ie,ee,ne){const se=r.convert(B.format,B.colorSpace),ve=r.convert(B.type),Te=M(B.internalFormat,se,ve,B.colorSpace);if(!n.get(b).__hasExternalTextures){const pe=Math.max(1,b.width>>ne),Ie=Math.max(1,b.height>>ne);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,ne,Te,pe,Ie,b.depth,0,se,ve,null):t.texImage2D(ee,ne,Te,pe,Ie,0,se,ve,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Q(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,ee,n.get(B).__webglTexture,0,ge(b)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ie,ee,n.get(B).__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xe(C,b,B){if(i.bindRenderbuffer(i.RENDERBUFFER,C),b.depthBuffer){const ie=b.depthTexture,ee=ie&&ie.isDepthTexture?ie.type:null,ne=v(b.stencilBuffer,ee),se=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=ge(b);Q(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ve,ne,b.width,b.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,ne,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ne,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,C)}else{const ie=b.textures;for(let ee=0;ee<ie.length;ee++){const ne=ie[ee],se=r.convert(ne.format,ne.colorSpace),ve=r.convert(ne.type),Te=M(ne.internalFormat,se,ve,ne.colorSpace),Ke=ge(b);B&&Q(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ke,Te,b.width,b.height):Q(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ke,Te,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Te,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function te(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),D(b.depthTexture,0);const ie=n.get(b.depthTexture).__webglTexture,ee=ge(b);if(b.depthTexture.format===Xs)Q(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ie,0);else if(b.depthTexture.format===Js)Q(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function me(C){const b=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){const ie=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ie){const ee=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ie.removeEventListener("dispose",ee)};ie.addEventListener("dispose",ee),b.__depthDisposeCallback=ee}b.__boundDepthTexture=ie}if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");te(b.__webglFramebuffer,C)}else if(B){b.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[ie]),b.__webglDepthbuffer[ie]===void 0)b.__webglDepthbuffer[ie]=i.createRenderbuffer(),xe(b.__webglDepthbuffer[ie],C,!1);else{const ee=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=b.__webglDepthbuffer[ie];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,ne)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),xe(b.__webglDepthbuffer,C,!1);else{const ie=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,ee)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Se(C,b,B){const ie=n.get(C);b!==void 0&&ae(ie.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&me(C)}function De(C){const b=C.texture,B=n.get(C),ie=n.get(b);C.addEventListener("dispose",E);const ee=C.textures,ne=C.isWebGLCubeRenderTarget===!0,se=ee.length>1;if(se||(ie.__webglTexture===void 0&&(ie.__webglTexture=i.createTexture()),ie.__version=b.version,o.memory.textures++),ne){B.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer[ve]=[];for(let Te=0;Te<b.mipmaps.length;Te++)B.__webglFramebuffer[ve][Te]=i.createFramebuffer()}else B.__webglFramebuffer[ve]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer=[];for(let ve=0;ve<b.mipmaps.length;ve++)B.__webglFramebuffer[ve]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(se)for(let ve=0,Te=ee.length;ve<Te;ve++){const Ke=n.get(ee[ve]);Ke.__webglTexture===void 0&&(Ke.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&Q(C)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ve=0;ve<ee.length;ve++){const Te=ee[ve];B.__webglColorRenderbuffer[ve]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ve]);const Ke=r.convert(Te.format,Te.colorSpace),pe=r.convert(Te.type),Ie=M(Te.internalFormat,Ke,pe,Te.colorSpace,C.isXRRenderTarget===!0),je=ge(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,je,Ie,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,B.__webglColorRenderbuffer[ve])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),xe(B.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),be(i.TEXTURE_CUBE_MAP,b);for(let ve=0;ve<6;ve++)if(b.mipmaps&&b.mipmaps.length>0)for(let Te=0;Te<b.mipmaps.length;Te++)ae(B.__webglFramebuffer[ve][Te],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Te);else ae(B.__webglFramebuffer[ve],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);d(b)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(se){for(let ve=0,Te=ee.length;ve<Te;ve++){const Ke=ee[ve],pe=n.get(Ke);t.bindTexture(i.TEXTURE_2D,pe.__webglTexture),be(i.TEXTURE_2D,Ke),ae(B.__webglFramebuffer,C,Ke,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,0),d(Ke)&&g(i.TEXTURE_2D)}t.unbindTexture()}else{let ve=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ve=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,ie.__webglTexture),be(ve,b),b.mipmaps&&b.mipmaps.length>0)for(let Te=0;Te<b.mipmaps.length;Te++)ae(B.__webglFramebuffer[Te],C,b,i.COLOR_ATTACHMENT0,ve,Te);else ae(B.__webglFramebuffer,C,b,i.COLOR_ATTACHMENT0,ve,0);d(b)&&g(ve),t.unbindTexture()}C.depthBuffer&&me(C)}function $e(C){const b=C.textures;for(let B=0,ie=b.length;B<ie;B++){const ee=b[B];if(d(ee)){const ne=C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,se=n.get(ee).__webglTexture;t.bindTexture(ne,se),g(ne),t.unbindTexture()}}}const oe=[],L=[];function q(C){if(C.samples>0){if(Q(C)===!1){const b=C.textures,B=C.width,ie=C.height;let ee=i.COLOR_BUFFER_BIT;const ne=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=n.get(C),ve=b.length>1;if(ve)for(let Te=0;Te<b.length;Te++)t.bindFramebuffer(i.FRAMEBUFFER,se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,se.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglFramebuffer);for(let Te=0;Te<b.length;Te++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),ve){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,se.__webglColorRenderbuffer[Te]);const Ke=n.get(b[Te]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ke,0)}i.blitFramebuffer(0,0,B,ie,0,0,B,ie,ee,i.NEAREST),c===!0&&(oe.length=0,L.length=0,oe.push(i.COLOR_ATTACHMENT0+Te),C.depthBuffer&&C.resolveDepthBuffer===!1&&(oe.push(ne),L.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,oe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ve)for(let Te=0;Te<b.length;Te++){t.bindFramebuffer(i.FRAMEBUFFER,se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,se.__webglColorRenderbuffer[Te]);const Ke=n.get(b[Te]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,Ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const b=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function ge(C){return Math.min(s.maxSamples,C.samples)}function Q(C){const b=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function he(C){const b=o.render.frame;h.get(C)!==b&&(h.set(C,b),C.update())}function ye(C,b){const B=C.colorSpace,ie=C.format,ee=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==tn&&B!==Wi&&(pt.getTransfer(B)===Et?(ie!==Nn||ee!==Ci)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),b}function _e(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=P,this.resetTextureUnits=y,this.setTexture2D=D,this.setTexture2DArray=O,this.setTexture3D=U,this.setTextureCube=V,this.rebindTextures=Se,this.setupRenderTarget=De,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=q,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=Q}function u_(i,e){function t(n,s=Wi){let r;const o=pt.getTransfer(s);if(n===Ci)return i.UNSIGNED_BYTE;if(n===gl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===xl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Qu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Zu)return i.BYTE;if(n===Ju)return i.SHORT;if(n===Or)return i.UNSIGNED_SHORT;if(n===ml)return i.INT;if(n===fs)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===Ti)return i.HALF_FLOAT;if(n===ed)return i.ALPHA;if(n===td)return i.RGB;if(n===Nn)return i.RGBA;if(n===nd)return i.LUMINANCE;if(n===id)return i.LUMINANCE_ALPHA;if(n===Xs)return i.DEPTH_COMPONENT;if(n===Js)return i.DEPTH_STENCIL;if(n===_l)return i.RED;if(n===vl)return i.RED_INTEGER;if(n===sd)return i.RG;if(n===yl)return i.RG_INTEGER;if(n===Ml)return i.RGBA_INTEGER;if(n===ko||n===Bo||n===Ho||n===Go)if(o===Et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ko)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ko)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ho)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Go)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ec||n===Tc||n===Ac||n===Rc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ec)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Tc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ac)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Rc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Cc||n===Pc||n===Lc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Cc||n===Pc)return o===Et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Lc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ic||n===Dc||n===Nc||n===Uc||n===Fc||n===Oc||n===zc||n===kc||n===Bc||n===Hc||n===Gc||n===Vc||n===Wc||n===Xc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ic)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Dc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Nc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Oc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===zc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===kc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Bc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Hc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Gc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vo||n===Kc||n===qc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Vo)return o===Et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Kc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===rd||n===Yc||n===$c||n===jc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$c)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class d_ extends mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Qe extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const f_={type:"move"};class Xa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const x of e.hand.values()){const d=t.getJointPose(x,n),g=this._getHandJoint(l,x);d!==null&&(g.matrix.fromArray(d.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=d.radius),g.visible=d!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,m=.005;l.inputState.pinching&&u>p+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(f_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Qe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const p_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,m_=`
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

}`;class g_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Wt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Pi({vertexShader:p_,fragmentShader:m_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new X(new Lt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class x_ extends sr{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,u=null,p=null,m=null;const x=new g_,d=t.getContextAttributes();let g=null,M=null;const v=[],S=[],T=new we;let E=null;const w=new mn;w.layers.enable(1),w.viewport=new mt;const A=new mn;A.layers.enable(2),A.viewport=new mt;const N=[w,A],_=new d_;_.layers.enable(1),_.layers.enable(2);let y=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ae=v[K];return ae===void 0&&(ae=new Xa,v[K]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(K){let ae=v[K];return ae===void 0&&(ae=new Xa,v[K]=ae),ae.getGripSpace()},this.getHand=function(K){let ae=v[K];return ae===void 0&&(ae=new Xa,v[K]=ae),ae.getHandSpace()};function I(K){const ae=S.indexOf(K.inputSource);if(ae===-1)return;const xe=v[ae];xe!==void 0&&(xe.update(K.inputSource,K.frame,l||o),xe.dispatchEvent({type:K.type,data:K.inputSource}))}function D(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",O);for(let K=0;K<v.length;K++){const ae=S[K];ae!==null&&(S[K]=null,v[K].disconnect(ae))}y=null,P=null,x.reset(),e.setRenderTarget(g),p=null,u=null,f=null,s=null,M=null,Re.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(g=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",D),s.addEventListener("inputsourceschange",O),d.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(T),s.renderState.layers===void 0){const ae={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new ps(p.framebufferWidth,p.framebufferHeight,{format:Nn,type:Ci,colorSpace:e.outputColorSpace,stencilBuffer:d.stencil})}else{let ae=null,xe=null,te=null;d.depth&&(te=d.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=d.stencil?Js:Xs,xe=d.stencil?Zs:fs);const me={colorFormat:t.RGBA8,depthFormat:te,scaleFactor:r};f=new XRWebGLBinding(s,t),u=f.createProjectionLayer(me),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new ps(u.textureWidth,u.textureHeight,{format:Nn,type:Ci,depthTexture:new Md(u.textureWidth,u.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:d.stencil,colorSpace:e.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Re.setContext(s),Re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function O(K){for(let ae=0;ae<K.removed.length;ae++){const xe=K.removed[ae],te=S.indexOf(xe);te>=0&&(S[te]=null,v[te].disconnect(xe))}for(let ae=0;ae<K.added.length;ae++){const xe=K.added[ae];let te=S.indexOf(xe);if(te===-1){for(let Se=0;Se<v.length;Se++)if(Se>=S.length){S.push(xe),te=Se;break}else if(S[Se]===null){S[Se]=xe,te=Se;break}if(te===-1)break}const me=v[te];me&&me.connect(xe)}}const U=new F,V=new F;function z(K,ae,xe){U.setFromMatrixPosition(ae.matrixWorld),V.setFromMatrixPosition(xe.matrixWorld);const te=U.distanceTo(V),me=ae.projectionMatrix.elements,Se=xe.projectionMatrix.elements,De=me[14]/(me[10]-1),$e=me[14]/(me[10]+1),oe=(me[9]+1)/me[5],L=(me[9]-1)/me[5],q=(me[8]-1)/me[0],ge=(Se[8]+1)/Se[0],Q=De*q,he=De*ge,ye=te/(-q+ge),_e=ye*-q;if(ae.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(_e),K.translateZ(ye),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),me[10]===-1)K.projectionMatrix.copy(ae.projectionMatrix),K.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const C=De+ye,b=$e+ye,B=Q-_e,ie=he+(te-_e),ee=oe*$e/b*C,ne=L*$e/b*C;K.projectionMatrix.makePerspective(B,ie,ee,ne,C,b),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ce(K,ae){ae===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ae.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let ae=K.near,xe=K.far;x.texture!==null&&(x.depthNear>0&&(ae=x.depthNear),x.depthFar>0&&(xe=x.depthFar)),_.near=A.near=w.near=ae,_.far=A.far=w.far=xe,(y!==_.near||P!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),y=_.near,P=_.far);const te=K.parent,me=_.cameras;ce(_,te);for(let Se=0;Se<me.length;Se++)ce(me[Se],te);me.length===2?z(_,w,A):_.projectionMatrix.copy(w.projectionMatrix),le(K,_,te)};function le(K,ae,xe){xe===null?K.matrix.copy(ae.matrixWorld):(K.matrix.copy(xe.matrixWorld),K.matrix.invert(),K.matrix.multiply(ae.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ae.projectionMatrix),K.projectionMatrixInverse.copy(ae.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Qs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(_)};let be=null;function j(K,ae){if(h=ae.getViewerPose(l||o),m=ae,h!==null){const xe=h.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let te=!1;xe.length!==_.cameras.length&&(_.cameras.length=0,te=!0);for(let Se=0;Se<xe.length;Se++){const De=xe[Se];let $e=null;if(p!==null)$e=p.getViewport(De);else{const L=f.getViewSubImage(u,De);$e=L.viewport,Se===0&&(e.setRenderTargetTextures(M,L.colorTexture,u.ignoreDepthValues?void 0:L.depthStencilTexture),e.setRenderTarget(M))}let oe=N[Se];oe===void 0&&(oe=new mn,oe.layers.enable(Se),oe.viewport=new mt,N[Se]=oe),oe.matrix.fromArray(De.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(De.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set($e.x,$e.y,$e.width,$e.height),Se===0&&(_.matrix.copy(oe.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),te===!0&&_.cameras.push(oe)}const me=s.enabledFeatures;if(me&&me.includes("depth-sensing")){const Se=f.getDepthInformation(xe[0]);Se&&Se.isValid&&Se.texture&&x.init(e,Se,s.renderState)}}for(let xe=0;xe<v.length;xe++){const te=S[xe],me=v[xe];te!==null&&me!==void 0&&me.update(te,ae,l||o)}be&&be(K,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),m=null}const Re=new yd;Re.setAnimationLoop(j),this.setAnimationLoop=function(K){be=K},this.dispose=function(){}}}const ss=new _n,__=new Ze;function v_(i,e){function t(d,g){d.matrixAutoUpdate===!0&&d.updateMatrix(),g.value.copy(d.matrix)}function n(d,g){g.color.getRGB(d.fogColor.value,gd(i)),g.isFog?(d.fogNear.value=g.near,d.fogFar.value=g.far):g.isFogExp2&&(d.fogDensity.value=g.density)}function s(d,g,M,v,S){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(d,g):g.isMeshToonMaterial?(r(d,g),f(d,g)):g.isMeshPhongMaterial?(r(d,g),h(d,g)):g.isMeshStandardMaterial?(r(d,g),u(d,g),g.isMeshPhysicalMaterial&&p(d,g,S)):g.isMeshMatcapMaterial?(r(d,g),m(d,g)):g.isMeshDepthMaterial?r(d,g):g.isMeshDistanceMaterial?(r(d,g),x(d,g)):g.isMeshNormalMaterial?r(d,g):g.isLineBasicMaterial?(o(d,g),g.isLineDashedMaterial&&a(d,g)):g.isPointsMaterial?c(d,g,M,v):g.isSpriteMaterial?l(d,g):g.isShadowMaterial?(d.color.value.copy(g.color),d.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(d,g){d.opacity.value=g.opacity,g.color&&d.diffuse.value.copy(g.color),g.emissive&&d.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(d.map.value=g.map,t(g.map,d.mapTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.bumpMap&&(d.bumpMap.value=g.bumpMap,t(g.bumpMap,d.bumpMapTransform),d.bumpScale.value=g.bumpScale,g.side===xn&&(d.bumpScale.value*=-1)),g.normalMap&&(d.normalMap.value=g.normalMap,t(g.normalMap,d.normalMapTransform),d.normalScale.value.copy(g.normalScale),g.side===xn&&d.normalScale.value.negate()),g.displacementMap&&(d.displacementMap.value=g.displacementMap,t(g.displacementMap,d.displacementMapTransform),d.displacementScale.value=g.displacementScale,d.displacementBias.value=g.displacementBias),g.emissiveMap&&(d.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,d.emissiveMapTransform)),g.specularMap&&(d.specularMap.value=g.specularMap,t(g.specularMap,d.specularMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest);const M=e.get(g),v=M.envMap,S=M.envMapRotation;v&&(d.envMap.value=v,ss.copy(S),ss.x*=-1,ss.y*=-1,ss.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ss.y*=-1,ss.z*=-1),d.envMapRotation.value.setFromMatrix4(__.makeRotationFromEuler(ss)),d.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=g.reflectivity,d.ior.value=g.ior,d.refractionRatio.value=g.refractionRatio),g.lightMap&&(d.lightMap.value=g.lightMap,d.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,d.lightMapTransform)),g.aoMap&&(d.aoMap.value=g.aoMap,d.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,d.aoMapTransform))}function o(d,g){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,g.map&&(d.map.value=g.map,t(g.map,d.mapTransform))}function a(d,g){d.dashSize.value=g.dashSize,d.totalSize.value=g.dashSize+g.gapSize,d.scale.value=g.scale}function c(d,g,M,v){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,d.size.value=g.size*M,d.scale.value=v*.5,g.map&&(d.map.value=g.map,t(g.map,d.uvTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest)}function l(d,g){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,d.rotation.value=g.rotation,g.map&&(d.map.value=g.map,t(g.map,d.mapTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest)}function h(d,g){d.specular.value.copy(g.specular),d.shininess.value=Math.max(g.shininess,1e-4)}function f(d,g){g.gradientMap&&(d.gradientMap.value=g.gradientMap)}function u(d,g){d.metalness.value=g.metalness,g.metalnessMap&&(d.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,d.metalnessMapTransform)),d.roughness.value=g.roughness,g.roughnessMap&&(d.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,d.roughnessMapTransform)),g.envMap&&(d.envMapIntensity.value=g.envMapIntensity)}function p(d,g,M){d.ior.value=g.ior,g.sheen>0&&(d.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),d.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(d.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,d.sheenColorMapTransform)),g.sheenRoughnessMap&&(d.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,d.sheenRoughnessMapTransform))),g.clearcoat>0&&(d.clearcoat.value=g.clearcoat,d.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(d.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,d.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(d.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===xn&&d.clearcoatNormalScale.value.negate())),g.dispersion>0&&(d.dispersion.value=g.dispersion),g.iridescence>0&&(d.iridescence.value=g.iridescence,d.iridescenceIOR.value=g.iridescenceIOR,d.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(d.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,d.iridescenceMapTransform)),g.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),g.transmission>0&&(d.transmission.value=g.transmission,d.transmissionSamplerMap.value=M.texture,d.transmissionSamplerSize.value.set(M.width,M.height),g.transmissionMap&&(d.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,d.transmissionMapTransform)),d.thickness.value=g.thickness,g.thicknessMap&&(d.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=g.attenuationDistance,d.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(d.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(d.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=g.specularIntensity,d.specularColor.value.copy(g.specularColor),g.specularColorMap&&(d.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,d.specularColorMapTransform)),g.specularIntensityMap&&(d.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,d.specularIntensityMapTransform))}function m(d,g){g.matcap&&(d.matcap.value=g.matcap)}function x(d,g){const M=e.get(g).light;d.referencePosition.value.setFromMatrixPosition(M.matrixWorld),d.nearDistance.value=M.shadow.camera.near,d.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function y_(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,v){const S=v.program;n.uniformBlockBinding(M,S)}function l(M,v){let S=s[M.id];S===void 0&&(m(M),S=h(M),s[M.id]=S,M.addEventListener("dispose",d));const T=v.program;n.updateUBOMapping(M,T);const E=e.render.frame;r[M.id]!==E&&(u(M),r[M.id]=E)}function h(M){const v=f();M.__bindingPointIndex=v;const S=i.createBuffer(),T=M.__size,E=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,T,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,S),S}function f(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const v=s[M.id],S=M.uniforms,T=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let E=0,w=S.length;E<w;E++){const A=Array.isArray(S[E])?S[E]:[S[E]];for(let N=0,_=A.length;N<_;N++){const y=A[N];if(p(y,E,N,T)===!0){const P=y.__offset,I=Array.isArray(y.value)?y.value:[y.value];let D=0;for(let O=0;O<I.length;O++){const U=I[O],V=x(U);typeof U=="number"||typeof U=="boolean"?(y.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,P+D,y.__data)):U.isMatrix3?(y.__data[0]=U.elements[0],y.__data[1]=U.elements[1],y.__data[2]=U.elements[2],y.__data[3]=0,y.__data[4]=U.elements[3],y.__data[5]=U.elements[4],y.__data[6]=U.elements[5],y.__data[7]=0,y.__data[8]=U.elements[6],y.__data[9]=U.elements[7],y.__data[10]=U.elements[8],y.__data[11]=0):(U.toArray(y.__data,D),D+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,y.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,v,S,T){const E=M.value,w=v+"_"+S;if(T[w]===void 0)return typeof E=="number"||typeof E=="boolean"?T[w]=E:T[w]=E.clone(),!0;{const A=T[w];if(typeof E=="number"||typeof E=="boolean"){if(A!==E)return T[w]=E,!0}else if(A.equals(E)===!1)return A.copy(E),!0}return!1}function m(M){const v=M.uniforms;let S=0;const T=16;for(let w=0,A=v.length;w<A;w++){const N=Array.isArray(v[w])?v[w]:[v[w]];for(let _=0,y=N.length;_<y;_++){const P=N[_],I=Array.isArray(P.value)?P.value:[P.value];for(let D=0,O=I.length;D<O;D++){const U=I[D],V=x(U),z=S%T,ce=z%V.boundary,le=z+ce;S+=ce,le!==0&&T-le<V.storage&&(S+=T-le),P.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=S,S+=V.storage}}}const E=S%T;return E>0&&(S+=T-E),M.__size=S,M.__cache={},this}function x(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function d(M){const v=M.target;v.removeEventListener("dispose",d);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function g(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:g}}class M_{constructor(e={}){const{canvas:t=op(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=o;const p=new Uint32Array(4),m=new Int32Array(4);let x=null,d=null;const g=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ln,this.toneMapping=Yi,this.toneMappingExposure=1;const v=this;let S=!1,T=0,E=0,w=null,A=-1,N=null;const _=new mt,y=new mt;let P=null;const I=new We(0);let D=0,O=t.width,U=t.height,V=1,z=null,ce=null;const le=new mt(0,0,O,U),be=new mt(0,0,O,U);let j=!1;const Re=new bl;let K=!1,ae=!1;const xe=new Ze,te=new Ze,me=new F,Se=new mt,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $e=!1;function oe(){return w===null?V:1}let L=n;function q(R,G){return t.getContext(R,G)}try{const R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${pl}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",Ce,!1),L===null){const G="webgl2";if(L=q(G,R),L===null)throw q(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ge,Q,he,ye,_e,C,b,B,ie,ee,ne,se,ve,Te,Ke,pe,Ie,je,ke,Ne,it,Xe,ht,H;function Pe(){ge=new Tg(L),ge.init(),Xe=new u_(L,ge),Q=new yg(L,ge,e,Xe),he=new c_(L),Q.reverseDepthBuffer&&he.buffers.depth.setReversed(!0),ye=new Cg(L),_e=new qx,C=new h_(L,ge,he,_e,Q,Xe,ye),b=new Sg(v),B=new Eg(v),ie=new Fp(L),ht=new _g(L,ie),ee=new Ag(L,ie,ye,ht),ne=new Lg(L,ee,ie,ye),ke=new Pg(L,Q,C),pe=new Mg(_e),se=new Kx(v,b,B,ge,Q,ht,pe),ve=new v_(v,_e),Te=new $x,Ke=new t_(ge),je=new xg(v,b,B,he,ne,u,c),Ie=new o_(v,ne,Q),H=new y_(L,ye,Q,he),Ne=new vg(L,ge,ye),it=new Rg(L,ge,ye),ye.programs=se.programs,v.capabilities=Q,v.extensions=ge,v.properties=_e,v.renderLists=Te,v.shadowMap=Ie,v.state=he,v.info=ye}Pe();const J=new x_(v,L);this.xr=J,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const R=ge.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ge.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(R){R!==void 0&&(V=R,this.setSize(O,U,!1))},this.getSize=function(R){return R.set(O,U)},this.setSize=function(R,G,Y=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=R,U=G,t.width=Math.floor(R*V),t.height=Math.floor(G*V),Y===!0&&(t.style.width=R+"px",t.style.height=G+"px"),this.setViewport(0,0,R,G)},this.getDrawingBufferSize=function(R){return R.set(O*V,U*V).floor()},this.setDrawingBufferSize=function(R,G,Y){O=R,U=G,V=Y,t.width=Math.floor(R*Y),t.height=Math.floor(G*Y),this.setViewport(0,0,R,G)},this.getCurrentViewport=function(R){return R.copy(_)},this.getViewport=function(R){return R.copy(le)},this.setViewport=function(R,G,Y,Z){R.isVector4?le.set(R.x,R.y,R.z,R.w):le.set(R,G,Y,Z),he.viewport(_.copy(le).multiplyScalar(V).round())},this.getScissor=function(R){return R.copy(be)},this.setScissor=function(R,G,Y,Z){R.isVector4?be.set(R.x,R.y,R.z,R.w):be.set(R,G,Y,Z),he.scissor(y.copy(be).multiplyScalar(V).round())},this.getScissorTest=function(){return j},this.setScissorTest=function(R){he.setScissorTest(j=R)},this.setOpaqueSort=function(R){z=R},this.setTransparentSort=function(R){ce=R},this.getClearColor=function(R){return R.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor.apply(je,arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha.apply(je,arguments)},this.clear=function(R=!0,G=!0,Y=!0){let Z=0;if(R){let W=!1;if(w!==null){const Me=w.texture.format;W=Me===Ml||Me===yl||Me===vl}if(W){const Me=w.texture.type,Le=Me===Ci||Me===fs||Me===Or||Me===Zs||Me===gl||Me===xl,Fe=je.getClearColor(),ze=je.getClearAlpha(),Be=Fe.r,He=Fe.g,Oe=Fe.b;Le?(p[0]=Be,p[1]=He,p[2]=Oe,p[3]=ze,L.clearBufferuiv(L.COLOR,0,p)):(m[0]=Be,m[1]=He,m[2]=Oe,m[3]=ze,L.clearBufferiv(L.COLOR,0,m))}else Z|=L.COLOR_BUFFER_BIT}G&&(Z|=L.DEPTH_BUFFER_BIT,L.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),Y&&(Z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",Ce,!1),Te.dispose(),Ke.dispose(),_e.dispose(),b.dispose(),B.dispose(),ne.dispose(),ht.dispose(),H.dispose(),se.dispose(),J.dispose(),J.removeEventListener("sessionstart",Fn),J.removeEventListener("sessionend",On),Rn.stop()};function ue(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const R=ye.autoReset,G=Ie.enabled,Y=Ie.autoUpdate,Z=Ie.needsUpdate,W=Ie.type;Pe(),ye.autoReset=R,Ie.enabled=G,Ie.autoUpdate=Y,Ie.needsUpdate=Z,Ie.type=W}function Ce(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function rt(R){const G=R.target;G.removeEventListener("dispose",rt),at(G)}function at(R){nn(R),_e.remove(R)}function nn(R){const G=_e.get(R).programs;G!==void 0&&(G.forEach(function(Y){se.releaseProgram(Y)}),R.isShaderMaterial&&se.releaseShaderCache(R))}this.renderBufferDirect=function(R,G,Y,Z,W,Me){G===null&&(G=De);const Le=W.isMesh&&W.matrixWorld.determinant()<0,Fe=Yt(R,G,Y,Z,W);he.setMaterial(Z,Le);let ze=Y.index,Be=1;if(Z.wireframe===!0){if(ze=ee.getWireframeAttribute(Y),ze===void 0)return;Be=2}const He=Y.drawRange,Oe=Y.attributes.position;let ut=He.start*Be,gt=(He.start+He.count)*Be;Me!==null&&(ut=Math.max(ut,Me.start*Be),gt=Math.min(gt,(Me.start+Me.count)*Be)),ze!==null?(ut=Math.max(ut,0),gt=Math.min(gt,ze.count)):Oe!=null&&(ut=Math.max(ut,0),gt=Math.min(gt,Oe.count));const Tt=gt-ut;if(Tt<0||Tt===1/0)return;ht.setup(W,Z,Fe,Y,ze);let Dt,dt=Ne;if(ze!==null&&(Dt=ie.get(ze),dt=it,dt.setIndex(Dt)),W.isMesh)Z.wireframe===!0?(he.setLineWidth(Z.wireframeLinewidth*oe()),dt.setMode(L.LINES)):dt.setMode(L.TRIANGLES);else if(W.isLine){let k=Z.linewidth;k===void 0&&(k=1),he.setLineWidth(k*oe()),W.isLineSegments?dt.setMode(L.LINES):W.isLineLoop?dt.setMode(L.LINE_LOOP):dt.setMode(L.LINE_STRIP)}else W.isPoints?dt.setMode(L.POINTS):W.isSprite&&dt.setMode(L.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)dt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(ge.get("WEBGL_multi_draw"))dt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const k=W._multiDrawStarts,re=W._multiDrawCounts,de=W._multiDrawCount,ct=ze?ie.get(ze).bytesPerElement:1,qe=_e.get(Z).currentProgram.getUniforms();for(let Je=0;Je<de;Je++)qe.setValue(L,"_gl_DrawID",Je),dt.render(k[Je]/ct,re[Je])}else if(W.isInstancedMesh)dt.renderInstances(ut,Tt,W.count);else if(Y.isInstancedBufferGeometry){const k=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,re=Math.min(Y.instanceCount,k);dt.renderInstances(ut,Tt,re)}else dt.render(ut,Tt)};function et(R,G,Y){R.transparent===!0&&R.side===Gt&&R.forceSinglePass===!1?(R.side=xn,R.needsUpdate=!0,li(R,G,Y),R.side=Ri,R.needsUpdate=!0,li(R,G,Y),R.side=Gt):li(R,G,Y)}this.compile=function(R,G,Y=null){Y===null&&(Y=R),d=Ke.get(Y),d.init(G),M.push(d),Y.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(d.pushLight(W),W.castShadow&&d.pushShadow(W))}),R!==Y&&R.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(d.pushLight(W),W.castShadow&&d.pushShadow(W))}),d.setupLights();const Z=new Set;return R.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Me=W.material;if(Me)if(Array.isArray(Me))for(let Le=0;Le<Me.length;Le++){const Fe=Me[Le];et(Fe,Y,W),Z.add(Fe)}else et(Me,Y,W),Z.add(Me)}),M.pop(),d=null,Z},this.compileAsync=function(R,G,Y=null){const Z=this.compile(R,G,Y);return new Promise(W=>{function Me(){if(Z.forEach(function(Le){_e.get(Le).currentProgram.isReady()&&Z.delete(Le)}),Z.size===0){W(R);return}setTimeout(Me,10)}ge.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let sn=null;function ot(R){sn&&sn(R)}function Fn(){Rn.stop()}function On(){Rn.start()}const Rn=new yd;Rn.setAnimationLoop(ot),typeof self<"u"&&Rn.setContext(self),this.setAnimationLoop=function(R){sn=R,J.setAnimationLoop(R),R===null?Rn.stop():Rn.start()},J.addEventListener("sessionstart",Fn),J.addEventListener("sessionend",On),this.render=function(R,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(G),G=J.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,G,w),d=Ke.get(R,M.length),d.init(G),M.push(d),te.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Re.setFromProjectionMatrix(te),ae=this.localClippingEnabled,K=pe.init(this.clippingPlanes,ae),x=Te.get(R,g.length),x.init(),g.push(x),J.enabled===!0&&J.isPresenting===!0){const Me=v.xr.getDepthSensingMesh();Me!==null&&Zi(Me,G,-1/0,v.sortObjects)}Zi(R,G,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(z,ce),$e=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,$e&&je.addToRenderList(x,R),this.info.render.frame++,K===!0&&pe.beginShadows();const Y=d.state.shadowsArray;Ie.render(Y,R,G),K===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=x.opaque,W=x.transmissive;if(d.setupLights(),G.isArrayCamera){const Me=G.cameras;if(W.length>0)for(let Le=0,Fe=Me.length;Le<Fe;Le++){const ze=Me[Le];qr(Z,W,R,ze)}$e&&je.render(R);for(let Le=0,Fe=Me.length;Le<Fe;Le++){const ze=Me[Le];Kr(x,R,ze,ze.viewport)}}else W.length>0&&qr(Z,W,R,G),$e&&je.render(R),Kr(x,R,G);w!==null&&(C.updateMultisampleRenderTarget(w),C.updateRenderTargetMipmap(w)),R.isScene===!0&&R.onAfterRender(v,R,G),ht.resetDefaultState(),A=-1,N=null,M.pop(),M.length>0?(d=M[M.length-1],K===!0&&pe.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,g.pop(),g.length>0?x=g[g.length-1]:x=null};function Zi(R,G,Y,Z){if(R.visible===!1)return;if(R.layers.test(G.layers)){if(R.isGroup)Y=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(G);else if(R.isLight)d.pushLight(R),R.castShadow&&d.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Re.intersectsSprite(R)){Z&&Se.setFromMatrixPosition(R.matrixWorld).applyMatrix4(te);const Le=ne.update(R),Fe=R.material;Fe.visible&&x.push(R,Le,Fe,Y,Se.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Re.intersectsObject(R))){const Le=ne.update(R),Fe=R.material;if(Z&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Se.copy(R.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Se.copy(Le.boundingSphere.center)),Se.applyMatrix4(R.matrixWorld).applyMatrix4(te)),Array.isArray(Fe)){const ze=Le.groups;for(let Be=0,He=ze.length;Be<He;Be++){const Oe=ze[Be],ut=Fe[Oe.materialIndex];ut&&ut.visible&&x.push(R,Le,ut,Y,Se.z,Oe)}}else Fe.visible&&x.push(R,Le,Fe,Y,Se.z,null)}}const Me=R.children;for(let Le=0,Fe=Me.length;Le<Fe;Le++)Zi(Me[Le],G,Y,Z)}function Kr(R,G,Y,Z){const W=R.opaque,Me=R.transmissive,Le=R.transparent;d.setupLightsView(Y),K===!0&&pe.setGlobalState(v.clippingPlanes,Y),Z&&he.viewport(_.copy(Z)),W.length>0&&_s(W,G,Y),Me.length>0&&_s(Me,G,Y),Le.length>0&&_s(Le,G,Y),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function qr(R,G,Y,Z){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[Z.id]===void 0&&(d.state.transmissionRenderTarget[Z.id]=new ps(1,1,{generateMipmaps:!0,type:ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float")?Ti:Ci,minFilter:ni,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pt.workingColorSpace}));const Me=d.state.transmissionRenderTarget[Z.id],Le=Z.viewport||_;Me.setSize(Le.z,Le.w);const Fe=v.getRenderTarget();v.setRenderTarget(Me),v.getClearColor(I),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear(),$e&&je.render(Y);const ze=v.toneMapping;v.toneMapping=Yi;const Be=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),d.setupLightsView(Z),K===!0&&pe.setGlobalState(v.clippingPlanes,Z),_s(R,Y,Z),C.updateMultisampleRenderTarget(Me),C.updateRenderTargetMipmap(Me),ge.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Oe=0,ut=G.length;Oe<ut;Oe++){const gt=G[Oe],Tt=gt.object,Dt=gt.geometry,dt=gt.material,k=gt.group;if(dt.side===Gt&&Tt.layers.test(Z.layers)){const re=dt.side;dt.side=xn,dt.needsUpdate=!0,cr(Tt,Y,Z,Dt,dt,k),dt.side=re,dt.needsUpdate=!0,He=!0}}He===!0&&(C.updateMultisampleRenderTarget(Me),C.updateRenderTargetMipmap(Me))}v.setRenderTarget(Fe),v.setClearColor(I,D),Be!==void 0&&(Z.viewport=Be),v.toneMapping=ze}function _s(R,G,Y){const Z=G.isScene===!0?G.overrideMaterial:null;for(let W=0,Me=R.length;W<Me;W++){const Le=R[W],Fe=Le.object,ze=Le.geometry,Be=Z===null?Le.material:Z,He=Le.group;Fe.layers.test(Y.layers)&&cr(Fe,G,Y,ze,Be,He)}}function cr(R,G,Y,Z,W,Me){R.onBeforeRender(v,G,Y,Z,W,Me),R.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),W.onBeforeRender(v,G,Y,Z,R,Me),W.transparent===!0&&W.side===Gt&&W.forceSinglePass===!1?(W.side=xn,W.needsUpdate=!0,v.renderBufferDirect(Y,G,Z,W,R,Me),W.side=Ri,W.needsUpdate=!0,v.renderBufferDirect(Y,G,Z,W,R,Me),W.side=Gt):v.renderBufferDirect(Y,G,Z,W,R,Me),R.onAfterRender(v,G,Y,Z,W,Me)}function li(R,G,Y){G.isScene!==!0&&(G=De);const Z=_e.get(R),W=d.state.lights,Me=d.state.shadowsArray,Le=W.state.version,Fe=se.getParameters(R,W.state,Me,G,Y),ze=se.getProgramCacheKey(Fe);let Be=Z.programs;Z.environment=R.isMeshStandardMaterial?G.environment:null,Z.fog=G.fog,Z.envMap=(R.isMeshStandardMaterial?B:b).get(R.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&R.envMap===null?G.environmentRotation:R.envMapRotation,Be===void 0&&(R.addEventListener("dispose",rt),Be=new Map,Z.programs=Be);let He=Be.get(ze);if(He!==void 0){if(Z.currentProgram===He&&Z.lightsStateVersion===Le)return hi(R,Fe),He}else Fe.uniforms=se.getUniforms(R),R.onBeforeCompile(Fe,v),He=se.acquireProgram(Fe,ze),Be.set(ze,He),Z.uniforms=Fe.uniforms;const Oe=Z.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Oe.clippingPlanes=pe.uniform),hi(R,Fe),Z.needsLights=Li(R),Z.lightsStateVersion=Le,Z.needsLights&&(Oe.ambientLightColor.value=W.state.ambient,Oe.lightProbe.value=W.state.probe,Oe.directionalLights.value=W.state.directional,Oe.directionalLightShadows.value=W.state.directionalShadow,Oe.spotLights.value=W.state.spot,Oe.spotLightShadows.value=W.state.spotShadow,Oe.rectAreaLights.value=W.state.rectArea,Oe.ltc_1.value=W.state.rectAreaLTC1,Oe.ltc_2.value=W.state.rectAreaLTC2,Oe.pointLights.value=W.state.point,Oe.pointLightShadows.value=W.state.pointShadow,Oe.hemisphereLights.value=W.state.hemi,Oe.directionalShadowMap.value=W.state.directionalShadowMap,Oe.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Oe.spotShadowMap.value=W.state.spotShadowMap,Oe.spotLightMatrix.value=W.state.spotLightMatrix,Oe.spotLightMap.value=W.state.spotLightMap,Oe.pointShadowMap.value=W.state.pointShadowMap,Oe.pointShadowMatrix.value=W.state.pointShadowMatrix),Z.currentProgram=He,Z.uniformsList=null,He}function wn(R){if(R.uniformsList===null){const G=R.currentProgram.getUniforms();R.uniformsList=Xo.seqWithValue(G.seq,R.uniforms)}return R.uniformsList}function hi(R,G){const Y=_e.get(R);Y.outputColorSpace=G.outputColorSpace,Y.batching=G.batching,Y.batchingColor=G.batchingColor,Y.instancing=G.instancing,Y.instancingColor=G.instancingColor,Y.instancingMorph=G.instancingMorph,Y.skinning=G.skinning,Y.morphTargets=G.morphTargets,Y.morphNormals=G.morphNormals,Y.morphColors=G.morphColors,Y.morphTargetsCount=G.morphTargetsCount,Y.numClippingPlanes=G.numClippingPlanes,Y.numIntersection=G.numClipIntersection,Y.vertexAlphas=G.vertexAlphas,Y.vertexTangents=G.vertexTangents,Y.toneMapping=G.toneMapping}function Yt(R,G,Y,Z,W){G.isScene!==!0&&(G=De),C.resetTextureUnits();const Me=G.fog,Le=Z.isMeshStandardMaterial?G.environment:null,Fe=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:tn,ze=(Z.isMeshStandardMaterial?B:b).get(Z.envMap||Le),Be=Z.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,He=!!Y.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Oe=!!Y.morphAttributes.position,ut=!!Y.morphAttributes.normal,gt=!!Y.morphAttributes.color;let Tt=Yi;Z.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Tt=v.toneMapping);const Dt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,dt=Dt!==void 0?Dt.length:0,k=_e.get(Z),re=d.state.lights;if(K===!0&&(ae===!0||R!==N)){const Nt=R===N&&Z.id===A;pe.setState(Z,R,Nt)}let de=!1;Z.version===k.__version?(k.needsLights&&k.lightsStateVersion!==re.state.version||k.outputColorSpace!==Fe||W.isBatchedMesh&&k.batching===!1||!W.isBatchedMesh&&k.batching===!0||W.isBatchedMesh&&k.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&k.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&k.instancing===!1||!W.isInstancedMesh&&k.instancing===!0||W.isSkinnedMesh&&k.skinning===!1||!W.isSkinnedMesh&&k.skinning===!0||W.isInstancedMesh&&k.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&k.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&k.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&k.instancingMorph===!1&&W.morphTexture!==null||k.envMap!==ze||Z.fog===!0&&k.fog!==Me||k.numClippingPlanes!==void 0&&(k.numClippingPlanes!==pe.numPlanes||k.numIntersection!==pe.numIntersection)||k.vertexAlphas!==Be||k.vertexTangents!==He||k.morphTargets!==Oe||k.morphNormals!==ut||k.morphColors!==gt||k.toneMapping!==Tt||k.morphTargetsCount!==dt)&&(de=!0):(de=!0,k.__version=Z.version);let ct=k.currentProgram;de===!0&&(ct=li(Z,G,W));let qe=!1,Je=!1,$t=!1;const lt=ct.getUniforms(),yt=k.uniforms;if(he.useProgram(ct.program)&&(qe=!0,Je=!0,$t=!0),Z.id!==A&&(A=Z.id,Je=!0),qe||N!==R){Q.reverseDepthBuffer?(xe.copy(R.projectionMatrix),cp(xe),lp(xe),lt.setValue(L,"projectionMatrix",xe)):lt.setValue(L,"projectionMatrix",R.projectionMatrix),lt.setValue(L,"viewMatrix",R.matrixWorldInverse);const Nt=lt.map.cameraPosition;Nt!==void 0&&Nt.setValue(L,me.setFromMatrixPosition(R.matrixWorld)),Q.logarithmicDepthBuffer&&lt.setValue(L,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&lt.setValue(L,"isOrthographic",R.isOrthographicCamera===!0),N!==R&&(N=R,Je=!0,$t=!0)}if(W.isSkinnedMesh){lt.setOptional(L,W,"bindMatrix"),lt.setOptional(L,W,"bindMatrixInverse");const Nt=W.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),lt.setValue(L,"boneTexture",Nt.boneTexture,C))}W.isBatchedMesh&&(lt.setOptional(L,W,"batchingTexture"),lt.setValue(L,"batchingTexture",W._matricesTexture,C),lt.setOptional(L,W,"batchingIdTexture"),lt.setValue(L,"batchingIdTexture",W._indirectTexture,C),lt.setOptional(L,W,"batchingColorTexture"),W._colorsTexture!==null&&lt.setValue(L,"batchingColorTexture",W._colorsTexture,C));const vn=Y.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0)&&ke.update(W,Y,ct),(Je||k.receiveShadow!==W.receiveShadow)&&(k.receiveShadow=W.receiveShadow,lt.setValue(L,"receiveShadow",W.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(yt.envMap.value=ze,yt.flipEnvMap.value=ze.isCubeTexture&&ze.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&G.environment!==null&&(yt.envMapIntensity.value=G.environmentIntensity),Je&&(lt.setValue(L,"toneMappingExposure",v.toneMappingExposure),k.needsLights&&vs(yt,$t),Me&&Z.fog===!0&&ve.refreshFogUniforms(yt,Me),ve.refreshMaterialUniforms(yt,Z,V,U,d.state.transmissionRenderTarget[R.id]),Xo.upload(L,wn(k),yt,C)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Xo.upload(L,wn(k),yt,C),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&lt.setValue(L,"center",W.center),lt.setValue(L,"modelViewMatrix",W.modelViewMatrix),lt.setValue(L,"normalMatrix",W.normalMatrix),lt.setValue(L,"modelMatrix",W.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const Nt=Z.uniformsGroups;for(let yn=0,At=Nt.length;yn<At;yn++){const dn=Nt[yn];H.update(dn,ct),H.bind(dn,ct)}}return ct}function vs(R,G){R.ambientLightColor.needsUpdate=G,R.lightProbe.needsUpdate=G,R.directionalLights.needsUpdate=G,R.directionalLightShadows.needsUpdate=G,R.pointLights.needsUpdate=G,R.pointLightShadows.needsUpdate=G,R.spotLights.needsUpdate=G,R.spotLightShadows.needsUpdate=G,R.rectAreaLights.needsUpdate=G,R.hemisphereLights.needsUpdate=G}function Li(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(R,G,Y){_e.get(R.texture).__webglTexture=G,_e.get(R.depthTexture).__webglTexture=Y;const Z=_e.get(R);Z.__hasExternalTextures=!0,Z.__autoAllocateDepthBuffer=Y===void 0,Z.__autoAllocateDepthBuffer||ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,G){const Y=_e.get(R);Y.__webglFramebuffer=G,Y.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(R,G=0,Y=0){w=R,T=G,E=Y;let Z=!0,W=null,Me=!1,Le=!1;if(R){const ze=_e.get(R);if(ze.__useDefaultFramebuffer!==void 0)he.bindFramebuffer(L.FRAMEBUFFER,null),Z=!1;else if(ze.__webglFramebuffer===void 0)C.setupRenderTarget(R);else if(ze.__hasExternalTextures)C.rebindTextures(R,_e.get(R.texture).__webglTexture,_e.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Oe=R.depthTexture;if(ze.__boundDepthTexture!==Oe){if(Oe!==null&&_e.has(Oe)&&(R.width!==Oe.image.width||R.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(R)}}const Be=R.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(Le=!0);const He=_e.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(He[G])?W=He[G][Y]:W=He[G],Me=!0):R.samples>0&&C.useMultisampledRTT(R)===!1?W=_e.get(R).__webglMultisampledFramebuffer:Array.isArray(He)?W=He[Y]:W=He,_.copy(R.viewport),y.copy(R.scissor),P=R.scissorTest}else _.copy(le).multiplyScalar(V).floor(),y.copy(be).multiplyScalar(V).floor(),P=j;if(he.bindFramebuffer(L.FRAMEBUFFER,W)&&Z&&he.drawBuffers(R,W),he.viewport(_),he.scissor(y),he.setScissorTest(P),Me){const ze=_e.get(R.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+G,ze.__webglTexture,Y)}else if(Le){const ze=_e.get(R.texture),Be=G||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,ze.__webglTexture,Y||0,Be)}A=-1},this.readRenderTargetPixels=function(R,G,Y,Z,W,Me,Le){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=_e.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(Fe=Fe[Le]),Fe){he.bindFramebuffer(L.FRAMEBUFFER,Fe);try{const ze=R.texture,Be=ze.format,He=ze.type;if(!Q.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Q.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=R.width-Z&&Y>=0&&Y<=R.height-W&&L.readPixels(G,Y,Z,W,Xe.convert(Be),Xe.convert(He),Me)}finally{const ze=w!==null?_e.get(w).__webglFramebuffer:null;he.bindFramebuffer(L.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(R,G,Y,Z,W,Me,Le){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=_e.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(Fe=Fe[Le]),Fe){const ze=R.texture,Be=ze.format,He=ze.type;if(!Q.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Q.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=R.width-Z&&Y>=0&&Y<=R.height-W){he.bindFramebuffer(L.FRAMEBUFFER,Fe);const Oe=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Oe),L.bufferData(L.PIXEL_PACK_BUFFER,Me.byteLength,L.STREAM_READ),L.readPixels(G,Y,Z,W,Xe.convert(Be),Xe.convert(He),0);const ut=w!==null?_e.get(w).__webglFramebuffer:null;he.bindFramebuffer(L.FRAMEBUFFER,ut);const gt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await ap(L,gt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Oe),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Me),L.deleteBuffer(Oe),L.deleteSync(gt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,G=null,Y=0){R.isTexture!==!0&&(Wo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,R=arguments[1]);const Z=Math.pow(2,-Y),W=Math.floor(R.image.width*Z),Me=Math.floor(R.image.height*Z),Le=G!==null?G.x:0,Fe=G!==null?G.y:0;C.setTexture2D(R,0),L.copyTexSubImage2D(L.TEXTURE_2D,Y,0,0,Le,Fe,W,Me),he.unbindTexture()},this.copyTextureToTexture=function(R,G,Y=null,Z=null,W=0){R.isTexture!==!0&&(Wo("WebGLRenderer: copyTextureToTexture function signature has changed."),Z=arguments[0]||null,R=arguments[1],G=arguments[2],W=arguments[3]||0,Y=null);let Me,Le,Fe,ze,Be,He;Y!==null?(Me=Y.max.x-Y.min.x,Le=Y.max.y-Y.min.y,Fe=Y.min.x,ze=Y.min.y):(Me=R.image.width,Le=R.image.height,Fe=0,ze=0),Z!==null?(Be=Z.x,He=Z.y):(Be=0,He=0);const Oe=Xe.convert(G.format),ut=Xe.convert(G.type);C.setTexture2D(G,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,G.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,G.unpackAlignment);const gt=L.getParameter(L.UNPACK_ROW_LENGTH),Tt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Dt=L.getParameter(L.UNPACK_SKIP_PIXELS),dt=L.getParameter(L.UNPACK_SKIP_ROWS),k=L.getParameter(L.UNPACK_SKIP_IMAGES),re=R.isCompressedTexture?R.mipmaps[W]:R.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,re.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,re.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Fe),L.pixelStorei(L.UNPACK_SKIP_ROWS,ze),R.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,W,Be,He,Me,Le,Oe,ut,re.data):R.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,W,Be,He,re.width,re.height,Oe,re.data):L.texSubImage2D(L.TEXTURE_2D,W,Be,He,Me,Le,Oe,ut,re),L.pixelStorei(L.UNPACK_ROW_LENGTH,gt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Tt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Dt),L.pixelStorei(L.UNPACK_SKIP_ROWS,dt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,k),W===0&&G.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),he.unbindTexture()},this.copyTextureToTexture3D=function(R,G,Y=null,Z=null,W=0){R.isTexture!==!0&&(Wo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,Z=arguments[1]||null,R=arguments[2],G=arguments[3],W=arguments[4]||0);let Me,Le,Fe,ze,Be,He,Oe,ut,gt;const Tt=R.isCompressedTexture?R.mipmaps[W]:R.image;Y!==null?(Me=Y.max.x-Y.min.x,Le=Y.max.y-Y.min.y,Fe=Y.max.z-Y.min.z,ze=Y.min.x,Be=Y.min.y,He=Y.min.z):(Me=Tt.width,Le=Tt.height,Fe=Tt.depth,ze=0,Be=0,He=0),Z!==null?(Oe=Z.x,ut=Z.y,gt=Z.z):(Oe=0,ut=0,gt=0);const Dt=Xe.convert(G.format),dt=Xe.convert(G.type);let k;if(G.isData3DTexture)C.setTexture3D(G,0),k=L.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)C.setTexture2DArray(G,0),k=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,G.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,G.unpackAlignment);const re=L.getParameter(L.UNPACK_ROW_LENGTH),de=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ct=L.getParameter(L.UNPACK_SKIP_PIXELS),qe=L.getParameter(L.UNPACK_SKIP_ROWS),Je=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Tt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Tt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ze),L.pixelStorei(L.UNPACK_SKIP_ROWS,Be),L.pixelStorei(L.UNPACK_SKIP_IMAGES,He),R.isDataTexture||R.isData3DTexture?L.texSubImage3D(k,W,Oe,ut,gt,Me,Le,Fe,Dt,dt,Tt.data):G.isCompressedArrayTexture?L.compressedTexSubImage3D(k,W,Oe,ut,gt,Me,Le,Fe,Dt,Tt.data):L.texSubImage3D(k,W,Oe,ut,gt,Me,Le,Fe,Dt,dt,Tt),L.pixelStorei(L.UNPACK_ROW_LENGTH,re),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,de),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ct),L.pixelStorei(L.UNPACK_SKIP_ROWS,qe),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Je),W===0&&G.generateMipmaps&&L.generateMipmap(k),he.unbindTexture()},this.initRenderTarget=function(R){_e.get(R).__webglFramebuffer===void 0&&C.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?C.setTextureCube(R,0):R.isData3DTexture?C.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?C.setTexture2DArray(R,0):C.setTexture2D(R,0),he.unbindTexture()},this.resetState=function(){T=0,E=0,w=null,he.reset(),ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Sl?"display-p3":"srgb",t.unpackColorSpace=pt.workingColorSpace===ia?"display-p3":"srgb"}}class Al{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new We(e),this.near=t,this.far=n}clone(){return new Al(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class S_ extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Td{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Jc,this.updateRanges=[],this.version=0,this.uuid=Un()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const fn=new F;class Hr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.applyMatrix4(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.applyNormalMatrix(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.transformDirection(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),s=_t(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),s=_t(s,this.array),r=_t(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Xt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Hr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ft extends Xn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Us;const _r=new F,Fs=new F,Os=new F,zs=new we,vr=new we,Ad=new Ze,_o=new F,yr=new F,vo=new F,jh=new we,Ka=new we,Zh=new we;class Ht extends bt{constructor(e=new Ft){if(super(),this.isSprite=!0,this.type="Sprite",Us===void 0){Us=new Ot;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Td(t,5);Us.setIndex([0,1,2,0,2,3]),Us.setAttribute("position",new Hr(n,3,0,!1)),Us.setAttribute("uv",new Hr(n,2,3,!1))}this.geometry=Us,this.material=e,this.center=new we(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fs.setFromMatrixScale(this.matrixWorld),Ad.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Os.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fs.multiplyScalar(-Os.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;yo(_o.set(-.5,-.5,0),Os,o,Fs,s,r),yo(yr.set(.5,-.5,0),Os,o,Fs,s,r),yo(vo.set(.5,.5,0),Os,o,Fs,s,r),jh.set(0,0),Ka.set(1,0),Zh.set(1,1);let a=e.ray.intersectTriangle(_o,yr,vo,!1,_r);if(a===null&&(yo(yr.set(-.5,.5,0),Os,o,Fs,s,r),Ka.set(0,1),a=e.ray.intersectTriangle(_o,vo,yr,!1,_r),a===null))return;const c=e.ray.origin.distanceTo(_r);c<e.near||c>e.far||t.push({distance:c,point:_r.clone(),uv:Dn.getInterpolation(_r,_o,yr,vo,jh,Ka,Zh,new we),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function yo(i,e,t,n,s,r){zs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(vr.x=r*zs.x-s*zs.y,vr.y=s*zs.x+r*zs.y):vr.copy(zs),i.copy(e),i.x+=vr.x,i.y+=vr.y,i.applyMatrix4(Ad)}const Jh=new F,Qh=new mt,eu=new mt,w_=new F,tu=new Ze,Mo=new F,qa=new ri,nu=new Ze,Ya=new sa;class b_ extends X{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ih,this.bindMatrix=new Ze,this.bindMatrixInverse=new Ze,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new si),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Mo),this.boundingBox.expandByPoint(Mo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ri),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Mo),this.boundingSphere.expandByPoint(Mo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qa.copy(this.boundingSphere),qa.applyMatrix4(s),e.ray.intersectsSphere(qa)!==!1&&(nu.copy(s).invert(),Ya.copy(e.ray).applyMatrix4(nu),!(this.boundingBox!==null&&Ya.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ya)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new mt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ih?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Pf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Qh.fromBufferAttribute(s.attributes.skinIndex,e),eu.fromBufferAttribute(s.attributes.skinWeight,e),Jh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=eu.getComponent(r);if(o!==0){const a=Qh.getComponent(r);tu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(w_.copy(Jh).applyMatrix4(tu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Rd extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Rl extends Wt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=gn,h=gn,f,u){super(null,o,a,c,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const iu=new Ze,E_=new Ze;class Cl{constructor(e=[],t=[]){this.uuid=Un(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ze;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:E_;iu.multiplyMatrices(a,t[r]),iu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Cl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Rl(t,e,e,Nn,Sn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Rd),this.bones.push(o),this.boneInverses.push(new Ze().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class tl extends Xt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ks=new Ze,su=new Ze,So=[],ru=new si,T_=new Ze,Mr=new X,Sr=new ri;class Qn extends X{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new tl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,T_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new si),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ks),ru.copy(e.boundingBox).applyMatrix4(ks),this.boundingBox.union(ru)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ri),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ks),Sr.copy(e.boundingSphere).applyMatrix4(ks),this.boundingSphere.union(Sr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Mr.geometry=this.geometry,Mr.material=this.material,Mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Sr.copy(this.boundingSphere),Sr.applyMatrix4(n),e.ray.intersectsSphere(Sr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ks),su.multiplyMatrices(n,ks),Mr.matrixWorld=su,Mr.raycast(e,So);for(let o=0,a=So.length;o<a;o++){const c=So[o];c.instanceId=r,c.object=this,t.push(c)}So.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new tl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Rl(new Float32Array(s*this.count),s,this.count,_l,Sn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Pl extends Xn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Qo=new F,ea=new F,ou=new Ze,wr=new sa,wo=new ri,$a=new F,au=new F;class oa extends bt{constructor(e=new Ot,t=new Pl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Qo.fromBufferAttribute(t,s-1),ea.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Qo.distanceTo(ea);e.setAttribute("lineDistance",new wt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wo.copy(n.boundingSphere),wo.applyMatrix4(s),wo.radius+=r,e.ray.intersectsSphere(wo)===!1)return;ou.copy(s).invert(),wr.copy(e.ray).applyMatrix4(ou);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let x=p,d=m-1;x<d;x+=l){const g=h.getX(x),M=h.getX(x+1),v=bo(this,e,wr,c,g,M);v&&t.push(v)}if(this.isLineLoop){const x=h.getX(m-1),d=h.getX(p),g=bo(this,e,wr,c,x,d);g&&t.push(g)}}else{const p=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let x=p,d=m-1;x<d;x+=l){const g=bo(this,e,wr,c,x,x+1);g&&t.push(g)}if(this.isLineLoop){const x=bo(this,e,wr,c,m-1,p);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function bo(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(Qo.fromBufferAttribute(o,s),ea.fromBufferAttribute(o,r),t.distanceSqToSegment(Qo,ea,$a,au)>n)return;$a.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo($a);if(!(c<e.near||c>e.far))return{distance:c,point:au.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const cu=new F,lu=new F;class A_ extends oa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)cu.fromBufferAttribute(t,s),lu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+cu.distanceTo(lu);e.setAttribute("lineDistance",new wt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class R_ extends oa{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class aa extends Xn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hu=new Ze,nl=new sa,Eo=new ri,To=new F;class Ll extends bt{constructor(e=new Ot,t=new aa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(s),Eo.radius+=r,e.ray.intersectsSphere(Eo)===!1)return;hu.copy(s).invert(),nl.copy(e.ray).applyMatrix4(hu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,f=n.attributes.position;if(l!==null){const u=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let m=u,x=p;m<x;m++){const d=l.getX(m);To.fromBufferAttribute(f,d),uu(To,d,c,s,e,t,this)}}else{const u=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let m=u,x=p;m<x;m++)To.fromBufferAttribute(f,m),uu(To,m,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function uu(i,e,t,n,s,r,o){const a=nl.distanceSqToPoint(i);if(a<t){const c=new F;nl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class un extends Wt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class oi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],u=n[s+1]-h,p=(o-h)/u;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new we:new F);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new F,s=[],r=[],o=[],a=new F,c=new Ze;for(let p=0;p<=e;p++){const m=p/e;s[p]=this.getTangentAt(m,new F)}r[0]=new F,o[0]=new F;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Vt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,m))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Vt(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],p*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Il extends oi{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new we){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=c-this.aX,p=l-this.aY;c=u*h-p*f+this.aX,l=u*f+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class C_ extends Il{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Dl(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,f){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+f)+(c-a)/f;u*=h,p*=h,s(o,a,u,p)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const Ao=new F,ja=new Dl,Za=new Dl,Ja=new Dl;class P_ extends oi{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new F){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Ao.subVectors(s[0],s[1]).add(s[0]),l=Ao);const f=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Ao.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ao),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(f),p),x=Math.pow(f.distanceToSquared(u),p),d=Math.pow(u.distanceToSquared(h),p);x<1e-4&&(x=1),m<1e-4&&(m=x),d<1e-4&&(d=x),ja.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,m,x,d),Za.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,m,x,d),Ja.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,m,x,d)}else this.curveType==="catmullrom"&&(ja.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),Za.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),Ja.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return n.set(ja.calc(c),Za.calc(c),Ja.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new F().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function du(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function L_(i,e){const t=1-i;return t*t*e}function I_(i,e){return 2*(1-i)*i*e}function D_(i,e){return i*i*e}function Ir(i,e,t,n){return L_(i,e)+I_(i,t)+D_(i,n)}function N_(i,e){const t=1-i;return t*t*t*e}function U_(i,e){const t=1-i;return 3*t*t*i*e}function F_(i,e){return 3*(1-i)*i*i*e}function O_(i,e){return i*i*i*e}function Dr(i,e,t,n,s){return N_(i,e)+U_(i,t)+F_(i,n)+O_(i,s)}class Cd extends oi{constructor(e=new we,t=new we,n=new we,s=new we){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new we){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Dr(e,s.x,r.x,o.x,a.x),Dr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class z_ extends oi{constructor(e=new F,t=new F,n=new F,s=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new F){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Dr(e,s.x,r.x,o.x,a.x),Dr(e,s.y,r.y,o.y,a.y),Dr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Pd extends oi{constructor(e=new we,t=new we){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new we){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new we){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class k_ extends oi{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ld extends oi{constructor(e=new we,t=new we,n=new we){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new we){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ir(e,s.x,r.x,o.x),Ir(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class B_ extends oi{constructor(e=new F,t=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new F){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ir(e,s.x,r.x,o.x),Ir(e,s.y,r.y,o.y),Ir(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Id extends oi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new we){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(du(a,c.x,l.x,h.x,f.x),du(a,c.y,l.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new we().fromArray(s))}return this}}var il=Object.freeze({__proto__:null,ArcCurve:C_,CatmullRomCurve3:P_,CubicBezierCurve:Cd,CubicBezierCurve3:z_,EllipseCurve:Il,LineCurve:Pd,LineCurve3:k_,QuadraticBezierCurve:Ld,QuadraticBezierCurve3:B_,SplineCurve:Id});class H_ extends oi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new il[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new il[s.type]().fromJSON(s))}return this}}class fu extends H_{constructor(e){super(),this.type="Path",this.currentPoint=new we,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Pd(this.currentPoint.clone(),new we(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Ld(this.currentPoint.clone(),new we(e,t),new we(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new Cd(this.currentPoint.clone(),new we(e,t),new we(n,s),new we(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Id(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){const l=new Il(e,t,n,s,r,o,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ms extends Ot{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new F,h=new we;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,u=3;f<=t;f++,u+=3){const p=n+f/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,c.push(h.x,h.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new wt(o,3)),this.setAttribute("normal",new wt(a,3)),this.setAttribute("uv",new wt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ms(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ue extends Ot{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],u=[],p=[];let m=0;const x=[],d=n/2;let g=0;M(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new wt(f,3)),this.setAttribute("normal",new wt(u,3)),this.setAttribute("uv",new wt(p,2));function M(){const S=new F,T=new F;let E=0;const w=(t-e)/n;for(let A=0;A<=r;A++){const N=[],_=A/r,y=_*(t-e)+e;for(let P=0;P<=s;P++){const I=P/s,D=I*c+a,O=Math.sin(D),U=Math.cos(D);T.x=y*O,T.y=-_*n+d,T.z=y*U,f.push(T.x,T.y,T.z),S.set(O,w,U).normalize(),u.push(S.x,S.y,S.z),p.push(I,1-_),N.push(m++)}x.push(N)}for(let A=0;A<s;A++)for(let N=0;N<r;N++){const _=x[N][A],y=x[N+1][A],P=x[N+1][A+1],I=x[N][A+1];e>0&&(h.push(_,y,I),E+=3),t>0&&(h.push(y,P,I),E+=3)}l.addGroup(g,E,0),g+=E}function v(S){const T=m,E=new we,w=new F;let A=0;const N=S===!0?e:t,_=S===!0?1:-1;for(let P=1;P<=s;P++)f.push(0,d*_,0),u.push(0,_,0),p.push(.5,.5),m++;const y=m;for(let P=0;P<=s;P++){const D=P/s*c+a,O=Math.cos(D),U=Math.sin(D);w.x=N*U,w.y=d*_,w.z=N*O,f.push(w.x,w.y,w.z),u.push(0,_,0),E.x=O*.5+.5,E.y=U*.5*_+.5,p.push(E.x,E.y),m++}for(let P=0;P<s;P++){const I=T+P,D=y+P;S===!0?h.push(D,D+1,I):h.push(D+1,D,I),A+=3}l.addGroup(g,A,S===!0?1:2),g+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ue(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Jt extends Ue{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Jt(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ca extends fu{constructor(e){super(e),this.uuid=Un(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new fu().fromJSON(s))}return this}}const G_={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Dd(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,f,u,p;if(n&&(r=q_(i,e,r,t)),i.length>80*t){a=l=i[0],c=h=i[1];for(let m=t;m<s;m+=t)f=i[m],u=i[m+1],f<a&&(a=f),u<c&&(c=u),f>l&&(l=f),u>h&&(h=u);p=Math.max(l-a,h-c),p=p!==0?32767/p:0}return Gr(r,o,t,a,c,p,0),o}};function Dd(i,e,t,n,s){let r,o;if(s===sv(i,e,t,n)>0)for(r=e;r<t;r+=n)o=pu(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=pu(r,i[r],i[r+1],o);return o&&la(o,o.next)&&(Wr(o),o=o.next),o}function gs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(la(t,t.next)||Ct(t.prev,t,t.next)===0)){if(Wr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Gr(i,e,t,n,s,r,o){if(!i)return;!o&&r&&J_(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?W_(i,n,s,r):V_(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),Wr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=X_(gs(i),e,t),Gr(i,e,t,n,s,r,2)):o===2&&K_(i,e,t,n,s,r):Gr(gs(i),e,t,n,s,r,1);break}}}function V_(i){const e=i.prev,t=i,n=i.next;if(Ct(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,f=a<c?a<l?a:l:c<l?c:l,u=s>r?s>o?s:o:r>o?r:o,p=a>c?a>l?a:l:c>l?c:l;let m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=u&&m.y>=f&&m.y<=p&&Gs(s,a,r,c,o,l,m.x,m.y)&&Ct(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function W_(i,e,t,n){const s=i.prev,r=i,o=i.next;if(Ct(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,f=r.y,u=o.y,p=a<c?a<l?a:l:c<l?c:l,m=h<f?h<u?h:u:f<u?f:u,x=a>c?a>l?a:l:c>l?c:l,d=h>f?h>u?h:u:f>u?f:u,g=sl(p,m,e,t,n),M=sl(x,d,e,t,n);let v=i.prevZ,S=i.nextZ;for(;v&&v.z>=g&&S&&S.z<=M;){if(v.x>=p&&v.x<=x&&v.y>=m&&v.y<=d&&v!==s&&v!==o&&Gs(a,h,c,f,l,u,v.x,v.y)&&Ct(v.prev,v,v.next)>=0||(v=v.prevZ,S.x>=p&&S.x<=x&&S.y>=m&&S.y<=d&&S!==s&&S!==o&&Gs(a,h,c,f,l,u,S.x,S.y)&&Ct(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;v&&v.z>=g;){if(v.x>=p&&v.x<=x&&v.y>=m&&v.y<=d&&v!==s&&v!==o&&Gs(a,h,c,f,l,u,v.x,v.y)&&Ct(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;S&&S.z<=M;){if(S.x>=p&&S.x<=x&&S.y>=m&&S.y<=d&&S!==s&&S!==o&&Gs(a,h,c,f,l,u,S.x,S.y)&&Ct(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function X_(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!la(s,r)&&Nd(s,n,n.next,r)&&Vr(s,r)&&Vr(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Wr(n),Wr(n.next),n=i=r),n=n.next}while(n!==i);return gs(n)}function K_(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&tv(o,a)){let c=Ud(o,a);o=gs(o,o.next),c=gs(c,c.next),Gr(o,e,t,n,s,r,0),Gr(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function q_(i,e,t,n){const s=[];let r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=Dd(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(ev(l));for(s.sort(Y_),r=0;r<s.length;r++)t=$_(s[r],t);return t}function Y_(i,e){return i.x-e.x}function $_(i,e){const t=j_(i,e);if(!t)return e;const n=Ud(t,i);return gs(n,n.next),gs(t,t.next)}function j_(i,e){let t=e,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const u=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=r&&u>n&&(n=u,s=t.x<t.next.x?t:t.next,u===r))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,f;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&Gs(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(f=Math.abs(o-t.y)/(r-t.x),Vr(t,i)&&(f<h||f===h&&(t.x>s.x||t.x===s.x&&Z_(s,t)))&&(s=t,h=f)),t=t.next;while(t!==a);return s}function Z_(i,e){return Ct(i.prev,i,e.prev)<0&&Ct(e.next,i,i.next)<0}function J_(i,e,t,n){let s=i;do s.z===0&&(s.z=sl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Q_(s)}function Q_(i){let e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function sl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function ev(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Gs(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function tv(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!nv(i,e)&&(Vr(i,e)&&Vr(e,i)&&iv(i,e)&&(Ct(i.prev,i,e.prev)||Ct(i,e.prev,e))||la(i,e)&&Ct(i.prev,i,i.next)>0&&Ct(e.prev,e,e.next)>0)}function Ct(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function la(i,e){return i.x===e.x&&i.y===e.y}function Nd(i,e,t,n){const s=Co(Ct(i,e,t)),r=Co(Ct(i,e,n)),o=Co(Ct(t,n,i)),a=Co(Ct(t,n,e));return!!(s!==r&&o!==a||s===0&&Ro(i,t,e)||r===0&&Ro(i,n,e)||o===0&&Ro(t,i,n)||a===0&&Ro(t,e,n))}function Ro(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Co(i){return i>0?1:i<0?-1:0}function nv(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Nd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Vr(i,e){return Ct(i.prev,i,i.next)<0?Ct(i,e,i.next)>=0&&Ct(i,i.prev,e)>=0:Ct(i,e,i.prev)<0||Ct(i,i.next,e)<0}function iv(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ud(i,e){const t=new rl(i.i,i.x,i.y),n=new rl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function pu(i,e,t,n){const s=new rl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Wr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function rl(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function sv(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class $i{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return $i.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];mu(e),gu(n,e);let o=e.length;t.forEach(mu);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,gu(n,t[c]);const a=G_.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function mu(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function gu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Nl extends Ot{constructor(e=new ca([new we(.5,.5),new we(-.5,.5),new we(-.5,-.5),new we(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new wt(s,3)),this.setAttribute("uv",new wt(r,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:p-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,d=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:rv;let v,S=!1,T,E,w,A;g&&(v=g.getSpacedPoints(h),S=!0,u=!1,T=g.computeFrenetFrames(h,!1),E=new F,w=new F,A=new F),u||(d=0,p=0,m=0,x=0);const N=a.extractPoints(l);let _=N.shape;const y=N.holes;if(!$i.isClockWise(_)){_=_.reverse();for(let oe=0,L=y.length;oe<L;oe++){const q=y[oe];$i.isClockWise(q)&&(y[oe]=q.reverse())}}const I=$i.triangulateShape(_,y),D=_;for(let oe=0,L=y.length;oe<L;oe++){const q=y[oe];_=_.concat(q)}function O(oe,L,q){return L||console.error("THREE.ExtrudeGeometry: vec does not exist"),oe.clone().addScaledVector(L,q)}const U=_.length,V=I.length;function z(oe,L,q){let ge,Q,he;const ye=oe.x-L.x,_e=oe.y-L.y,C=q.x-oe.x,b=q.y-oe.y,B=ye*ye+_e*_e,ie=ye*b-_e*C;if(Math.abs(ie)>Number.EPSILON){const ee=Math.sqrt(B),ne=Math.sqrt(C*C+b*b),se=L.x-_e/ee,ve=L.y+ye/ee,Te=q.x-b/ne,Ke=q.y+C/ne,pe=((Te-se)*b-(Ke-ve)*C)/(ye*b-_e*C);ge=se+ye*pe-oe.x,Q=ve+_e*pe-oe.y;const Ie=ge*ge+Q*Q;if(Ie<=2)return new we(ge,Q);he=Math.sqrt(Ie/2)}else{let ee=!1;ye>Number.EPSILON?C>Number.EPSILON&&(ee=!0):ye<-Number.EPSILON?C<-Number.EPSILON&&(ee=!0):Math.sign(_e)===Math.sign(b)&&(ee=!0),ee?(ge=-_e,Q=ye,he=Math.sqrt(B)):(ge=ye,Q=_e,he=Math.sqrt(B/2))}return new we(ge/he,Q/he)}const ce=[];for(let oe=0,L=D.length,q=L-1,ge=oe+1;oe<L;oe++,q++,ge++)q===L&&(q=0),ge===L&&(ge=0),ce[oe]=z(D[oe],D[q],D[ge]);const le=[];let be,j=ce.concat();for(let oe=0,L=y.length;oe<L;oe++){const q=y[oe];be=[];for(let ge=0,Q=q.length,he=Q-1,ye=ge+1;ge<Q;ge++,he++,ye++)he===Q&&(he=0),ye===Q&&(ye=0),be[ge]=z(q[ge],q[he],q[ye]);le.push(be),j=j.concat(be)}for(let oe=0;oe<d;oe++){const L=oe/d,q=p*Math.cos(L*Math.PI/2),ge=m*Math.sin(L*Math.PI/2)+x;for(let Q=0,he=D.length;Q<he;Q++){const ye=O(D[Q],ce[Q],ge);te(ye.x,ye.y,-q)}for(let Q=0,he=y.length;Q<he;Q++){const ye=y[Q];be=le[Q];for(let _e=0,C=ye.length;_e<C;_e++){const b=O(ye[_e],be[_e],ge);te(b.x,b.y,-q)}}}const Re=m+x;for(let oe=0;oe<U;oe++){const L=u?O(_[oe],j[oe],Re):_[oe];S?(w.copy(T.normals[0]).multiplyScalar(L.x),E.copy(T.binormals[0]).multiplyScalar(L.y),A.copy(v[0]).add(w).add(E),te(A.x,A.y,A.z)):te(L.x,L.y,0)}for(let oe=1;oe<=h;oe++)for(let L=0;L<U;L++){const q=u?O(_[L],j[L],Re):_[L];S?(w.copy(T.normals[oe]).multiplyScalar(q.x),E.copy(T.binormals[oe]).multiplyScalar(q.y),A.copy(v[oe]).add(w).add(E),te(A.x,A.y,A.z)):te(q.x,q.y,f/h*oe)}for(let oe=d-1;oe>=0;oe--){const L=oe/d,q=p*Math.cos(L*Math.PI/2),ge=m*Math.sin(L*Math.PI/2)+x;for(let Q=0,he=D.length;Q<he;Q++){const ye=O(D[Q],ce[Q],ge);te(ye.x,ye.y,f+q)}for(let Q=0,he=y.length;Q<he;Q++){const ye=y[Q];be=le[Q];for(let _e=0,C=ye.length;_e<C;_e++){const b=O(ye[_e],be[_e],ge);S?te(b.x,b.y+v[h-1].y,v[h-1].x+q):te(b.x,b.y,f+q)}}}K(),ae();function K(){const oe=s.length/3;if(u){let L=0,q=U*L;for(let ge=0;ge<V;ge++){const Q=I[ge];me(Q[2]+q,Q[1]+q,Q[0]+q)}L=h+d*2,q=U*L;for(let ge=0;ge<V;ge++){const Q=I[ge];me(Q[0]+q,Q[1]+q,Q[2]+q)}}else{for(let L=0;L<V;L++){const q=I[L];me(q[2],q[1],q[0])}for(let L=0;L<V;L++){const q=I[L];me(q[0]+U*h,q[1]+U*h,q[2]+U*h)}}n.addGroup(oe,s.length/3-oe,0)}function ae(){const oe=s.length/3;let L=0;xe(D,L),L+=D.length;for(let q=0,ge=y.length;q<ge;q++){const Q=y[q];xe(Q,L),L+=Q.length}n.addGroup(oe,s.length/3-oe,1)}function xe(oe,L){let q=oe.length;for(;--q>=0;){const ge=q;let Q=q-1;Q<0&&(Q=oe.length-1);for(let he=0,ye=h+d*2;he<ye;he++){const _e=U*he,C=U*(he+1),b=L+ge+_e,B=L+Q+_e,ie=L+Q+C,ee=L+ge+C;Se(b,B,ie,ee)}}}function te(oe,L,q){c.push(oe),c.push(L),c.push(q)}function me(oe,L,q){De(oe),De(L),De(q);const ge=s.length/3,Q=M.generateTopUV(n,s,ge-3,ge-2,ge-1);$e(Q[0]),$e(Q[1]),$e(Q[2])}function Se(oe,L,q,ge){De(oe),De(L),De(ge),De(L),De(q),De(ge);const Q=s.length/3,he=M.generateSideWallUV(n,s,Q-6,Q-3,Q-2,Q-1);$e(he[0]),$e(he[1]),$e(he[3]),$e(he[1]),$e(he[2]),$e(he[3])}function De(oe){s.push(c[oe*3+0]),s.push(c[oe*3+1]),s.push(c[oe*3+2])}function $e(oe){r.push(oe.x),r.push(oe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return ov(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new il[s.type]().fromJSON(s)),new Nl(n,e.options)}}const rv={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new we(r,o),new we(a,c),new we(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],f=e[n*3+2],u=e[s*3],p=e[s*3+1],m=e[s*3+2],x=e[r*3],d=e[r*3+1],g=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new we(o,1-c),new we(l,1-f),new we(u,1-m),new we(x,1-g)]:[new we(a,1-c),new we(h,1-f),new we(p,1-m),new we(d,1-g)]}};function ov(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Ul extends Ot{constructor(e=new ca([new we(0,.5),new we(-.5,-.5),new we(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new wt(s,3)),this.setAttribute("normal",new wt(r,3)),this.setAttribute("uv",new wt(o,2));function l(h){const f=s.length/3,u=h.extractPoints(t);let p=u.shape;const m=u.holes;$i.isClockWise(p)===!1&&(p=p.reverse());for(let d=0,g=m.length;d<g;d++){const M=m[d];$i.isClockWise(M)===!0&&(m[d]=M.reverse())}const x=$i.triangulateShape(p,m);for(let d=0,g=m.length;d<g;d++){const M=m[d];p=p.concat(M)}for(let d=0,g=p.length;d<g;d++){const M=p[d];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let d=0,g=x.length;d<g;d++){const M=x[d],v=M[0]+f,S=M[1]+f,T=M[2]+f;n.push(v,S,T),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return av(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];n.push(o)}return new Ul(n,e.curveSegments)}}function av(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class Ut extends Ot{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],f=new F,u=new F,p=[],m=[],x=[],d=[];for(let g=0;g<=n;g++){const M=[],v=g/n;let S=0;g===0&&o===0?S=.5/t:g===n&&c===Math.PI&&(S=-.5/t);for(let T=0;T<=t;T++){const E=T/t;f.x=-e*Math.cos(s+E*r)*Math.sin(o+v*a),f.y=e*Math.cos(o+v*a),f.z=e*Math.sin(s+E*r)*Math.sin(o+v*a),m.push(f.x,f.y,f.z),u.copy(f).normalize(),x.push(u.x,u.y,u.z),d.push(E+S,1-v),M.push(l++)}h.push(M)}for(let g=0;g<n;g++)for(let M=0;M<t;M++){const v=h[g][M+1],S=h[g][M],T=h[g+1][M],E=h[g+1][M+1];(g!==0||o>0)&&p.push(v,S,E),(g!==n-1||c<Math.PI)&&p.push(S,T,E)}this.setIndex(p),this.setAttribute("position",new wt(m,3)),this.setAttribute("normal",new wt(x,3)),this.setAttribute("uv",new wt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ut(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ha extends Ot{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new F,f=new F,u=new F;for(let p=0;p<=n;p++)for(let m=0;m<=s;m++){const x=m/s*r,d=p/n*Math.PI*2;f.x=(e+t*Math.cos(d))*Math.cos(x),f.y=(e+t*Math.cos(d))*Math.sin(x),f.z=t*Math.sin(d),a.push(f.x,f.y,f.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),u.subVectors(f,h).normalize(),c.push(u.x,u.y,u.z),l.push(m/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let m=1;m<=s;m++){const x=(s+1)*p+m-1,d=(s+1)*(p-1)+m-1,g=(s+1)*(p-1)+m,M=(s+1)*p+m;o.push(x,d,M),o.push(d,g,M)}this.setIndex(o),this.setAttribute("position",new wt(a,3)),this.setAttribute("normal",new wt(c,3)),this.setAttribute("uv",new wt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ha(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class $ extends Xn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ad,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ai extends ${constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new we(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Vt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new We(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new We(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new We(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Po(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function cv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function lv(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function xu(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function Fd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class Xr{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class hv extends Xr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sh,endingEnd:sh}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case rh:r=e,a=2*t-n;break;case oh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case rh:o=e,c=2*n-t;break;case oh:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,p=this._weightNext,m=(n-t)/(s-t),x=m*m,d=x*m,g=-u*d+2*u*x-u*m,M=(1+u)*d+(-1.5-2*u)*x+(-.5+u)*m+1,v=(-1-p)*d+(1.5+p)*x+.5*m,S=p*d-p*x;for(let T=0;T!==a;++T)r[T]=g*o[h+T]+M*o[l+T]+v*o[c+T]+S*o[f+T];return r}}class uv extends Xr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),f=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*f+o[c+u]*h;return r}}class dv extends Xr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class ci{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Po(t,this.TimeBufferType),this.values=Po(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Po(e.times,Array),values:Po(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new dv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new uv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new hv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case zr:t=this.InterpolantFactoryMethodDiscrete;break;case kr:t=this.InterpolantFactoryMethodLinear;break;case xa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return zr;case this.InterpolantFactoryMethodLinear:return kr;case this.InterpolantFactoryMethodSmooth:return xa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&cv(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===xa,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{const f=a*n,u=f-n,p=f+n;for(let m=0;m!==n;++m){const x=t[f+m];if(x!==t[u+m]||x!==t[p+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const f=a*n,u=o*n;for(let p=0;p!==n;++p)t[u+p]=t[f+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}ci.prototype.TimeBufferType=Float32Array;ci.prototype.ValueBufferType=Float32Array;ci.prototype.DefaultInterpolation=kr;class or extends ci{constructor(e,t,n){super(e,t,n)}}or.prototype.ValueTypeName="bool";or.prototype.ValueBufferType=Array;or.prototype.DefaultInterpolation=zr;or.prototype.InterpolantFactoryMethodLinear=void 0;or.prototype.InterpolantFactoryMethodSmooth=void 0;class Od extends ci{}Od.prototype.ValueTypeName="color";class tr extends ci{}tr.prototype.ValueTypeName="number";class fv extends Xr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t);let l=e*a;for(let h=l+a;l!==h;l+=4)hn.slerpFlat(r,0,o,l-a,o,l,c);return r}}class nr extends ci{InterpolantFactoryMethodLinear(e){return new fv(this.times,this.values,this.getValueSize(),e)}}nr.prototype.ValueTypeName="quaternion";nr.prototype.InterpolantFactoryMethodSmooth=void 0;class ar extends ci{constructor(e,t,n){super(e,t,n)}}ar.prototype.ValueTypeName="string";ar.prototype.ValueBufferType=Array;ar.prototype.DefaultInterpolation=zr;ar.prototype.InterpolantFactoryMethodLinear=void 0;ar.prototype.InterpolantFactoryMethodSmooth=void 0;class ir extends ci{}ir.prototype.ValueTypeName="vector";class pv{constructor(e="",t=-1,n=[],s=Lf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Un(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(gv(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(ci.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=lv(c);c=xu(c,1,h),l=xu(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new tr(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(r);if(h&&h.length>1){const f=h[1];let u=s[f];u||(s[f]=u=[]),u.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(f,u,p,m,x){if(p.length!==0){const d=[],g=[];Fd(p,d,g,m),d.length!==0&&x.push(new f(u,d,g))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let f=0;f<l.length;f++){const u=l[f].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const p={};let m;for(m=0;m<u.length;m++)if(u[m].morphTargets)for(let x=0;x<u[m].morphTargets.length;x++)p[u[m].morphTargets[x]]=-1;for(const x in p){const d=[],g=[];for(let M=0;M!==u[m].morphTargets.length;++M){const v=u[m];d.push(v.time),g.push(v.morphTarget===x?1:0)}s.push(new tr(".morphTargetInfluence["+x+"]",d,g))}c=p.length*o}else{const p=".bones["+t[f].name+"]";n(ir,p+".position",u,"pos",s),n(nr,p+".quaternion",u,"rot",s),n(ir,p+".scale",u,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function mv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return tr;case"vector":case"vector2":case"vector3":case"vector4":return ir;case"color":return Od;case"quaternion":return nr;case"bool":case"boolean":return or;case"string":return ar}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function gv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=mv(i.type);if(i.times===void 0){const t=[],n=[];Fd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Ki={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class xv{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){const f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=l.length;f<u;f+=2){const p=l[f],m=l[f+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null}}}const _v=new xv;class xs{constructor(e){this.manager=e!==void 0?e:_v,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}xs.DEFAULT_MATERIAL_NAME="__DEFAULT";const vi={};class vv extends Error{constructor(e,t){super(e),this.response=t}}class Fl extends xs{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ki.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(vi[e]!==void 0){vi[e].push({onLoad:t,onProgress:n,onError:s});return}vi[e]=[],vi[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=vi[e],f=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=u?parseInt(u):0,m=p!==0;let x=0;const d=new ReadableStream({start(g){M();function M(){f.read().then(({done:v,value:S})=>{if(v)g.close();else{x+=S.byteLength;const T=new ProgressEvent("progress",{lengthComputable:m,loaded:x,total:p});for(let E=0,w=h.length;E<w;E++){const A=h[E];A.onProgress&&A.onProgress(T)}g.enqueue(S),M()}},v=>{g.error(v)})}}});return new Response(d)}else throw new vv(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),u=f&&f[1]?f[1].toLowerCase():void 0,p=new TextDecoder(u);return l.arrayBuffer().then(m=>p.decode(m))}}}).then(l=>{Ki.add(e,l);const h=vi[e];delete vi[e];for(let f=0,u=h.length;f<u;f++){const p=h[f];p.onLoad&&p.onLoad(l)}}).catch(l=>{const h=vi[e];if(h===void 0)throw this.manager.itemError(e),l;delete vi[e];for(let f=0,u=h.length;f<u;f++){const p=h[f];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class yv extends xs{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ki.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Br("img");function c(){h(),Ki.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(f){h(),s&&s(f),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Mv extends xs{constructor(e){super(e)}load(e,t,n,s){const r=this,o=new Rl,a=new Fl(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(s!==void 0)s(h);else{console.error(h);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:ti,o.wrapT=l.wrapT!==void 0?l.wrapT:ti,o.magFilter=l.magFilter!==void 0?l.magFilter:en,o.minFilter=l.minFilter!==void 0?l.minFilter:en,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(o.colorSpace=l.colorSpace),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=ni),l.mipmapCount===1&&(o.minFilter=en),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,t&&t(o,l)},n,s),o}}class Sv extends xs{constructor(e){super(e)}load(e,t,n,s){const r=new Wt,o=new yv(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class ua extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class wv extends ua{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Qa=new Ze,_u=new F,vu=new F;class Ol{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bl,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;_u.setFromMatrixPosition(e.matrixWorld),t.position.copy(_u),vu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vu),t.updateMatrixWorld(),Qa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Qa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class bv extends Ol{constructor(){super(new mn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Qs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class zd extends ua{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new bv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const yu=new Ze,br=new F,ec=new F;class Ev extends Ol{constructor(){super(new mn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new we(4,2),this._viewportCount=6,this._viewports=[new mt(2,1,1,1),new mt(0,1,1,1),new mt(3,1,1,1),new mt(1,1,1,1),new mt(3,0,1,1),new mt(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),br.setFromMatrixPosition(e.matrixWorld),n.position.copy(br),ec.copy(n.position),ec.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ec),n.updateMatrixWorld(),s.makeTranslation(-br.x,-br.y,-br.z),yu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yu)}}class Tv extends ua{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ev}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Av extends Ol{constructor(){super(new El(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class kd extends ua{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new Av}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Nr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Rv extends xs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ki.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ki.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Ki.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ki.add(e,c),r.manager.itemStart(e)}}const zl="\\[\\]\\.:\\/",Cv=new RegExp("["+zl+"]","g"),kl="[^"+zl+"]",Pv="[^"+zl.replace("\\.","")+"]",Lv=/((?:WC+[\/:])*)/.source.replace("WC",kl),Iv=/(WCOD+)?/.source.replace("WCOD",Pv),Dv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",kl),Nv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",kl),Uv=new RegExp("^"+Lv+Iv+Dv+Nv+"$"),Fv=["material","materials","bones","map"];class Ov{constructor(e,t,n){const s=n||vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class vt{constructor(e,t,n){this.path=t,this.parsedPath=n||vt.parseTrackName(t),this.node=vt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new vt.Composite(e,t,n):new vt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Cv,"")}static parseTrackName(e){const t=Uv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Fv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=vt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[s];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}vt.Composite=Ov;vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};vt.prototype.GetterByBindingType=[vt.prototype._getValue_direct,vt.prototype._getValue_array,vt.prototype._getValue_arrayElement,vt.prototype._getValue_toArray];vt.prototype.SetterByBindingTypeAndVersioning=[[vt.prototype._setValue_direct,vt.prototype._setValue_direct_setNeedsUpdate,vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_array,vt.prototype._setValue_array_setNeedsUpdate,vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_arrayElement,vt.prototype._setValue_arrayElement_setNeedsUpdate,vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_fromArray,vt.prototype._setValue_fromArray_setNeedsUpdate,vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pl);const xt={mass:1043,wingArea:16.2,wingSpan:11,chord:1.47,CL0:.25,CLalpha:4.8,CLflap:.55,CD0:.032,kInduced:.055,CDflap:.09,CDgear:.02,alphaCrit:15*Math.PI/180,thrustMax:5200,rho0:1.225,gearHeight:1.1,Vr:26,stallWarn:12*Math.PI/180},zv={...xt};function Mu(i={}){Object.assign(xt,zv,i)}const tc={Vfe:85,Vno:129,Vne:163},nc=.514444,ic={Vfe:tc.Vfe*nc,Vno:tc.Vno*nc,Vne:tc.Vne*nc};function Bd(i){return xt.rho0*Math.exp(-i/8500)}function kv(i,e,t,n,s,r={}){const{x:o,y:a,z:c}=i,l=-c,h=-a,f=Math.hypot(o,a,c),u=Bd(Math.max(0,s)),p=.5*u*f*f;let m=0,x=0;f>.5&&(m=Math.atan2(h,Math.max(.1,l)),x=Math.asin(Math.max(-1,Math.min(1,o/f))));const d=xt.wingArea,g=xt.alphaCrit-t*(2*Math.PI/180)+(r.critBonus||0);let M=xt.CL0+xt.CLalpha*m+xt.CLflap*t,v=xt.CD0+xt.kInduced*M*M+xt.CDflap*t+(n?xt.CDgear:0);const S=m>g&&f>5;if(S){const w=Math.min(.5,(m-g)*2.2);M*=1-w,v+=w*1.6}const T=p*d*M*(r.liftMul||1),E=p*d*v;return{V:f,alpha:m,beta:x,q:p,rho:u,CL:M,CD:v,lift:T,drag:E,stalled:S,alphaCrit:g}}function Bv(i,e,t,n=1){const s=Bd(t)/xt.rho0,r=Math.max(.25,1-e/110);return i*xt.thrustMax*(.55+.45*r)*(.6+.4*s)*n}function Hv(i,e,t){const n=Math.max(0,1-e/55),s=i*n*.35+i*Math.max(0,t)*.5*n,r=-i*n*.28;return{yawRate:s,rollRate:r}}function Gv(i,e,t){const n=[];return e>.01&&i>ic.Vfe&&n.push("flap-overspeed"),i>ic.Vne?n.push("vne"):i>ic.Vno&&n.push("vno"),n}function Vv(i,e,t=1.7){if(!e)return null;const n=e===1?.5:1.4;return{x:(Math.sin(i*2.1*t)+Math.sin(i*5.7)*.5)*n,y:(Math.sin(i*1.7+2)+Math.sin(i*4.3+1)*.5)*n*.7,z:Math.sin(i*1.3+4)*n*.5,roll:Math.sin(i*3.1+.7)*n*.25}}const Ur=[0,10,20,30];function Wv(i){return Ur[Math.max(0,Math.min(Ur.length-1,i))]/30}const Hd=Math.sqrt(3),Xv=.5*(Hd-1),Er=(3-Hd)/6,Su=i=>Math.floor(i)|0,wu=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);function Kv(i=Math.random){const e=qv(i),t=new Float64Array(e).map(s=>wu[s%12*2]),n=new Float64Array(e).map(s=>wu[s%12*2+1]);return function(r,o){let a=0,c=0,l=0;const h=(r+o)*Xv,f=Su(r+h),u=Su(o+h),p=(f+u)*Er,m=f-p,x=u-p,d=r-m,g=o-x;let M,v;d>g?(M=1,v=0):(M=0,v=1);const S=d-M+Er,T=g-v+Er,E=d-1+2*Er,w=g-1+2*Er,A=f&255,N=u&255;let _=.5-d*d-g*g;if(_>=0){const I=A+e[N],D=t[I],O=n[I];_*=_,a=_*_*(D*d+O*g)}let y=.5-S*S-T*T;if(y>=0){const I=A+M+e[N+v],D=t[I],O=n[I];y*=y,c=y*y*(D*S+O*T)}let P=.5-E*E-w*w;if(P>=0){const I=A+1+e[N+1],D=t[I],O=n[I];P*=P,l=P*P*(D*E+O*w)}return 70*(a+c+l)}}function qv(i){const t=new Uint8Array(512);for(let n=0;n<512/2;n++)t[n]=n;for(let n=0;n<512/2-1;n++){const s=n+~~(i()*(256-n)),r=t[n];t[n]=t[s],t[s]=r}for(let n=256;n<512;n++)t[n]=t[n-256];return t}class da extends X{constructor(){const e=da.SkyShader,t=new Pi({name:e.name,uniforms:xd.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:xn,depthWrite:!1});super(new fe(1,1,1),t),this.isSky=!0}}da.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new F},up:{value:new F(0,1,0)}},vertexShader:`
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

		}`};const St={elev:6,halfLen:600,halfWid:15},cn={x0:40,x1:170,z0:60,z1:280},Bt={elev:12,x:2500,z:1900,halfLen:300,halfWid:10},Qt={elev:20,x:-1500,z:-5600,halfLen:280,halfWid:10},Kn={elev:8,x:-500,z:1050,halfLen:180,halfWid:8,name:"Harborview Strip"},qn={elev:4,x:8340,z:7240,halfLen:220,halfWid:9,name:"Seabreeze Strip"},Yn={elev:12,x:-6820,z:1340,halfLen:260,halfWid:10,name:"City Strip"},$n={elev:10,x:80,z:-1300,halfLen:170,halfWid:7,name:"Lighthouse Strip"},Gd=[Kn,qn,Yn,$n],Yv=[[-1500,-6e3,2600,90],[-7e3,1500,2300,70],[7500,-2500,2800,210],[8500,7500,2100,55],[-13500,5500,2800,150],[13500,2e3,2200,90],[3e3,13e3,2400,80],[4e3,-5500,500,12],[-4500,-3500,600,15],[5500,4500,450,10]],Lo={x:-300,z:920},Gi={x:60,z:310},Vd=[{name:"PILOT SHOP",x:-300,z:920},{name:"AIRPORT SUPPLY",x:122,z:-30},{name:"BEACH GEAR",x:8420,z:7410},{name:"CITY PILOT SUPPLY",x:-6940,z:1560},{name:"GENERAL STORE",x:-1150,z:-5240},{name:"BAIT & TACKLE",x:2590,z:2050}],Zt={x:130,z:-140},zi={x0:30,x1:230,z0:-450,z1:450};function $v(i,e){const t=It(zi.x0-80,zi.x0+30,i)*(1-It(zi.x1-30,zi.x1+80,i)),n=It(zi.z0-80,zi.z0+30,e)*(1-It(zi.z1-30,zi.z1+80,e));return t*n}const Vs=Kv(ii(1337));function It(i,e,t){const n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)}function ii(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function jv(i,e){const t=Math.hypot(i,e),n=1-It(900,3400,t);let s;if(n<=0)s=-8;else{s=Vs(i*9e-4,e*9e-4)*120+Vs(i*.004+7.3,e*.004-2.1)*28+Vs(i*.02,e*.02)*4,s=(s*.5+60)*n;const o=Math.hypot(i-1800,e+600);s+=Math.max(0,1-o/900)*320*n}for(const[o,a,c,l]of Yv){const h=Math.hypot(i-o,e-a);if(h<c){const f=1-It(c*.45,c,h),u=-8*(1-f)+(l+Vs(i*.003+o*.13,e*.003)*l*.4)*f;u>s&&(s=u)}}const r=Math.hypot(i-Bt.x,e-Bt.z);if(r<1100){const o=1-It(500,1100,r),a=-8*(1-o)+30*o;a>s&&(s=a)}return s<=-8?-8:s-6}function Zv(i,e){const t=Math.abs(i),n=Math.abs(e);return(1-It(St.halfWid+40,St.halfWid+220,t))*(1-It(St.halfLen+60,St.halfLen+400,n))}function Jv(i,e){const t=It(cn.x0-60,cn.x0+20,i)*(1-It(cn.x1-20,cn.x1+60,i)),n=It(cn.z0-60,cn.z0+20,e)*(1-It(cn.z1-20,cn.z1+60,e));return t*n}function Ve(i,e){let t=jv(i,e);const n=Math.max(Zv(i,e),Jv(i,e),$v(i,e));t=t*(1-n)+St.elev*n;const s=Math.abs(i-Bt.x),r=Math.abs(e-Bt.z),o=(1-It(Bt.halfWid+25,Bt.halfWid+150,s))*(1-It(Bt.halfLen+40,Bt.halfLen+250,r));t=t*(1-o)+Bt.elev*o;const a=Math.abs(i-Qt.x),c=Math.abs(e-Qt.z),l=(1-It(Qt.halfWid+25,Qt.halfWid+150,a))*(1-It(Qt.halfLen+40,Qt.halfLen+250,c));t=t*(1-l)+Qt.elev*l;for(const h of Gd){const f=Math.abs(i-h.x),u=Math.abs(e-h.z),p=(1-It(h.halfWid+15,h.halfWid+100,f))*(1-It(h.halfLen+25,h.halfLen+180,u));p>.01&&(t=t*(1-p)+h.elev*p)}return t}function Io(i,e,t){return[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t]}function Qv(i,e,t){const n=[.76,.7,.5],s=[.3,.5,.24],r=[.42,.55,.28],o=[.16,.32,.16],a=[.45,.42,.38],c=[.9,.9,.93];let l;return i<1.6?l=n:i<45?l=Io(s,r,t):i<150?l=Io(o,s,It(90,150,i)*.5):i<260?l=a:l=c,l=Io(l,a,It(.45,.8,e)),l=Io(n,l,It(.8,2.2,i)),l}function ey(i){i.fog=new Al(10336470,2500,22e3);const e=new da;e.scale.setScalar(9e4);const t=e.material.uniforms;t.turbidity.value=6,t.rayleigh.value=1.8,t.mieCoefficient.value=.004,t.mieDirectionalG.value=.85;const n=new F().setFromSphericalCoords(1,Math.PI*.46,Math.PI*.25);t.sunPosition.value.copy(n),i.add(e);const s=new kd(16773853,2.6);s.position.copy(n).multiplyScalar(3e3),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.near=500,s.shadow.camera.far=6e3;const r=260;Object.assign(s.shadow.camera,{left:-r,right:r,top:r,bottom:-r}),s.shadow.bias=-4e-4,i.add(s),i.add(s.target);const o=new wv(12375807,3825455,.75);i.add(o);const a=36e3,c=352,l=new Lt(a,a,c,c);l.rotateX(-Math.PI/2);const h=l.attributes.position,f=new Float32Array(h.count*3);for(let _=0;_<h.count;_++){const y=h.getX(_),P=h.getZ(_),I=Ve(y,P);h.setY(_,I);const D=Math.abs(Ve(y+8,P)-I)/8+Math.abs(Ve(y,P+8)-I)/8,O=Vs(y*.008+40,P*.008-17)*.5+.5,[U,V,z]=Qv(I,D,O),ce=Vs(y*.06,P*.06)*.035;f[_*3]=U+ce,f[_*3+1]=V+ce,f[_*3+2]=z+ce}l.setAttribute("color",new Xt(f,3)),l.computeVertexNormals();const u=new X(l,new $({vertexColors:!0,roughness:1,metalness:0,map:sy()}));u.receiveShadow=!0,i.add(u);const p={uTime:{value:0}},m=new Lt(12e4,12e4,96,96),x=new $({color:1328766,roughness:.18,metalness:.55});x.onBeforeCompile=_=>{_.uniforms.uTime=p.uTime,_.vertexShader=`uniform float uTime;
`+_.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vec2 wxz = (modelMatrix * vec4(position,1.0)).xz;
       transformed.y += sin(wxz.x*0.021 + uTime*0.9)*0.35 + sin(wxz.y*0.017 - uTime*0.7)*0.3 + sin((wxz.x+wxz.y)*0.05 + uTime*1.7)*0.12;`)};const d=new X(m,x);d.rotation.x=-Math.PI/2,d.position.y=0,d.name="ocean",i.add(d);const g=[];ty(i,g);const M=ny(i),v=iy(i),S=cy(i),T=ly(i),E=[...S.nightMats,...g],w=[],A=[];[...S.nightGlows],i.traverse(_=>{_.userData.blink&&w.push(_),_.userData.tlCycle&&A.push(_.userData.tlCycle),_.userData.nightLamp});function N(_,y,P,I){p.uTime.value=y,I&&(d.position.x=I.x,d.position.z=I.z);const D=I?I.x:0,O=I?I.z:0,U=18e3;for(const z of v.children)z.position.x+=P.x*.6*_+_*1.2,z.position.z+=P.z*.6*_,z.position.x>D+U&&(z.position.x-=U*2),z.position.z>O+U&&(z.position.z-=U*2),z.position.x<D-U&&(z.position.x+=U*2),z.position.z<O-U&&(z.position.z+=U*2);const V=i.getObjectByName("windsock");if(V&&P){const z=Math.hypot(P.x,P.z);V.rotation.y=Math.atan2(P.x,P.z),V.rotation.x=-.15-Math.min(1,z/8)*1.25}for(const z of w){const le=(y*(z.userData.rate||1)+(z.userData.phase||0))%1<(z.userData.duty||.08);z.material.opacity=le?1:0,z.visible=le||z.userData.dim===!0,z.userData.dim&&(z.material.opacity=le?1:.12)}for(const z of A){const ce=(y+z.off)%22;z.mats.g.emissiveIntensity=ce<10?2:.08,z.mats.y.emissiveIntensity=ce>=10&&ce<12?2:.08,z.mats.r.emissiveIntensity=ce>=12?2:.08}T.update(_,y,P)}return{sunLight:s,hemi:o,skyUni:t,clouds:v,trees:M,update:N,sightFound:T.found,balloons:T.balloons,nightGlows:S.nightGlows,nightMats:E,roadLoops:S.roadLoops}}function ty(i,e){const t=St.elev,n=new Qe,s=new $({color:3487292,roughness:.95}),r=new $({color:9080208,roughness:.95}),o=new X(new fe(St.halfWid*2,.3,St.halfLen*2),s);o.position.y=t+.15,o.receiveShadow=!0,n.add(o);const a=new X(new fe(cn.x1-cn.x0,.3,cn.z1-cn.z0),r);a.position.set((cn.x0+cn.x1)/2,t+.12,(cn.z0+cn.z1)/2),a.receiveShadow=!0,n.add(a);const c=new X(new fe(70,.28,14),s);c.position.set(50,t+.12,170),c.receiveShadow=!0,n.add(c);const l=new Mt({color:15263976});for(let _=-510;_<St.halfLen-60;_+=60){const y=new X(new Lt(1.1,24),l);y.rotation.x=-Math.PI/2,y.position.set(0,t+.32,_),n.add(y)}for(const _ of[-1,1]){const y=_*(St.halfLen-18);for(let D=-3;D<=3;D++){if(D===0)continue;const O=new X(new Lt(2.2,26),l);O.rotation.x=-Math.PI/2,O.position.set(D*3.4,t+.32,y),n.add(O)}for(const D of[152,305])for(const O of[-7,7]){const U=new X(new Lt(3,14),l);U.rotation.x=-Math.PI/2,U.position.set(O,t+.32,_*(St.halfLen-D)),n.add(U)}const P=ay(_<0?"36":"18",220),I=new X(new Lt(13,20),new Mt({map:P,transparent:!0}));I.rotation.x=-Math.PI/2,I.rotation.z=_<0?Math.PI:0,I.position.set(0,t+.33,_*(St.halfLen-55)),n.add(I)}const h=new Ut(.55,8,8),f=new Mt({color:12571903});for(let _=-600;_<=St.halfLen;_+=80)for(const y of[-15-2.5,St.halfWid+2.5]){const P=new X(h,f);P.position.set(y,t+1,_),n.add(P)}for(let _=0;_<4;_++){const y=new X(new fe(1.2,1,1.2),new Mt({color:_<2?16724787:16777215}));y.position.set(-23-_*3,t+1,-450),n.add(y)}const u=us();for(const _ of[-19,St.halfWid+4]){const y=new Ht(new Ft({map:u,color:16777215,transparent:!0,depthWrite:!1}));y.position.set(_,t+2,-606),y.scale.set(6,6,1),y.userData={blink:!0,rate:1.2,duty:.06,phase:_>0?.5:0},n.add(y)}const p=new $({color:10134184,roughness:.5,metalness:.6}),m=new $({color:1316378,roughness:1});for(const[_,y]of[[120,110],[120,220]]){const P=new X(new Ue(13,13,34,20,1,!1,0,Math.PI),p);P.rotation.z=Math.PI/2,P.rotation.y=Math.PI/2,P.position.set(_,t+.2,y),P.castShadow=P.receiveShadow=!0,n.add(P);const I=new X(new Lt(24,11),m);I.position.set(_-17.1,t+5.5,y),I.rotation.y=-Math.PI/2,n.add(I)}const x=new X(new Ue(.18,.18,11),new $({color:13421772,roughness:.5,metalness:.5}));x.position.set(28,t+5.5,St.halfLen-60),x.castShadow=!0,n.add(x);const d=new Qe;d.position.set(28,t+10.6,St.halfLen-60);const g=oy(),M=new X(new Jt(1.1,5.5,12,1,!0),new $({map:g,side:Gt,roughness:.8}));M.rotation.x=-Math.PI/2,M.position.z=2.9,d.add(M),d.name="windsock",n.add(d);const v=new X(new Ue(.5,.8,16),new $({color:7829367,roughness:.7}));v.position.set(-45,t+8,300),v.castShadow=!0,n.add(v);const S=new Ht(new Ft({map:u,color:6750088,transparent:!0,depthWrite:!1}));S.position.set(-45,t+16.6,300),S.scale.set(7,7,1),S.userData={blink:!0,rate:.8,duty:.12},n.add(S);const T=[12724778,2777026,14721056];[[70,110,.4],[95,200,-.3],[70,240,.2]].forEach(([_,y,P],I)=>{const D=bu(T[I]);D.position.set(_,t+.3,y),D.rotation.y=P,n.add(D)});const E=(_,y,P,I)=>{const D=new X(new fe(_,.24,y),r);D.position.set(P,t+.1,I),D.receiveShadow=!0,n.add(D)},w=new X(new fe(12,.28,St.halfLen*2),s);w.position.set(65,t+.12,0),w.receiveShadow=!0,n.add(w);const A=new Mt({color:14198816}),N=new X(new fe(.4,.06,St.halfLen*2-40),A);N.position.set(65,t+.3,0),n.add(N);for(const _ of[-400,0,400]){const y=new X(new fe(80,.28,10),s);y.position.set(55,t+.12,_),y.receiveShadow=!0,n.add(y);const P=new X(new fe(80,.06,.4),A);P.position.set(55,t+.3,_),n.add(P);for(const I of[26,28.5]){const D=new X(new fe(.6,.06,9),A);D.position.set(I,t+.3,_),n.add(D)}}{const _=[];for(let I=-600;I<=St.halfLen;I+=60)_.push([58,I],[72,I]);for(const I of[-400,0,400])for(let D=20;D<=95;D+=38)_.push([D,I-6],[D,I+6]);const y=new Qn(new Ut(.35,8,6),new Mt({color:3828479}),_.length),P=new Ze;_.forEach(([I,D],O)=>{P.makeTranslation(I,t+.6,D),y.setMatrixAt(O,P)}),n.add(y)}for(const _ of[-1,1]){const y=_*St.halfLen;for(let P=-3;P<=3;P++){const I=P*3.6,D=new X(new fe(.9,.5,.5),new Mt({color:2293572}));D.position.set(I,t+.5,y+_*2.5),n.add(D);const O=new X(new fe(.9,.5,.5),new Mt({color:16720418}));O.position.set(I,t+.5,y-_*2.5),n.add(O)}}for(let _=0;_<5;_++){const y=-700-_*100,P=Ve(0,y),I=t+5,D=new X(new Ue(.25,.35,Math.max(1,I-P)),new $({color:6710886,roughness:.7}));D.position.set(0,(P+I)/2,y),n.add(D);const O=new X(new fe(4,.5,.5),new Mt({color:16777215}));O.position.set(0,I,y),n.add(O);const U=new Ht(new Ft({map:u,color:16777215,transparent:!0,depthWrite:!1}));U.position.set(0,I+1,y),U.scale.set(7,7,1),U.userData={blink:!0,rate:1,duty:.07,phase:(4-_)*.18},n.add(U)}E(48,26,150,-60);{const _=new $({color:14210248,roughness:.85}),y=new X(new fe(38,9,16),_);y.position.set(150,t+4.5,-60),y.castShadow=y.receiveShadow=!0,n.add(y);const P=new $({color:1582127,roughness:.15,metalness:.5,emissive:16763514,emissiveIntensity:0});e.push(P);const I=new X(new fe(36,3.4,.4),P);I.position.set(150,t+5.2,-60-8.1),n.add(I);const D=I.clone();D.position.set(150,t+5.2,-60+8.1),n.add(D);const O=new X(new fe(40,.7,18),new $({color:3820122,roughness:.8}));O.position.set(150,t+9.3,-60),O.castShadow=!0,n.add(O);for(const ce of[138,162]){const le=new X(new Ue(.3,.3,4.4),new $({color:13421772,metalness:.5,roughness:.4}));le.position.set(ce,t+2.2,-71),n.add(le)}const U=new X(new fe(30,.4,7),new $({color:2776970,roughness:.6}));U.position.set(150,t+4.5,-60-11.5),U.castShadow=!0,n.add(U);const V=new X(new Lt(30,4),new Mt({map:Wd("HARBORVIEW • KHVR"),transparent:!1}));V.position.set(150-19.2,t+6.5,-60),V.rotation.y=-Math.PI/2,n.add(V);const z=new Ht(new Ft({map:u,color:12573183,transparent:!0,depthWrite:!1}));z.position.set(150,t+10,-60),z.scale.set(26,14,1),z.userData={nightLamp:!0},n.add(z)}E(18,18,Zt.x,Zt.z);{const _=new X(new fe(7,26,7),new $({color:12106946,roughness:.85}));_.position.set(Zt.x,t+13,Zt.z),_.castShadow=!0,n.add(_);const y=new $({color:1055784,roughness:.1,metalness:.6,emissive:16767392,emissiveIntensity:0});e.push(y);const P=new X(new fe(10.5,3.6,10.5),y);P.position.set(Zt.x,t+27.5,Zt.z),P.castShadow=!0,n.add(P);const I=new X(new fe(10.7,.5,10.7),new $({color:2237996,roughness:.6}));I.position.set(Zt.x,t+29.4,Zt.z),n.add(I);const D=new X(new fe(11.5,.7,11.5),new $({color:9054762,roughness:.7}));D.position.set(Zt.x,t+30,Zt.z),D.castShadow=!0,n.add(D);const O=new X(new Ue(.12,.2,9),new $({color:4473924,roughness:.6}));O.position.set(Zt.x,t+34.5,Zt.z),n.add(O);const U=new Ht(new Ft({map:u,color:16724787,transparent:!0,depthWrite:!1}));U.position.set(Zt.x,t+39.2,Zt.z),U.scale.set(5,5,1),U.userData={blink:!0,rate:.7,duty:.15},n.add(U);const V=new Ht(new Ft({map:u,color:16767392,transparent:!0,depthWrite:!1}));V.position.set(Zt.x,t+27.5,Zt.z),V.scale.set(14,8,1),V.userData={nightLamp:!0},n.add(V)}for(const[_,y]of[[170,-200],[170,-280]]){const P=new X(new Ue(11,11,30,18,1,!1,0,Math.PI),p);P.rotation.z=Math.PI/2,P.rotation.y=Math.PI/2,P.position.set(_,t+.2,y),P.castShadow=P.receiveShadow=!0,n.add(P);const I=new X(new Lt(20,9),m);I.position.set(_-15.1,t+4.5,y),I.rotation.y=-Math.PI/2,n.add(I)}{const _=new $({color:14198816,roughness:.8}),y=[2787914,15263976,9054762];[[-60,140],[-60,210],[-60,280]].forEach(([P,I],D)=>{const O=Ve(P,I),U=new X(new fe(14,.3,10),_);U.position.set(P,O+.15,I),U.receiveShadow=!0,n.add(U);const V=bu(y[D]);V.position.set(P,O+.3,I),V.rotation.y=.15*(D-1),n.add(V)})}E(26,16,190,300);{const _=new $({color:15263976,roughness:.4,metalness:.3});for(const I of[-4,4]){const D=new X(new Ue(3,3,10,16),_);D.rotation.z=Math.PI/2,D.position.set(190,t+3.4,300+I),D.castShadow=!0,n.add(D)}new $({color:12763842,roughness:.5});const y=new X(new fe(2.4,2.2,2.6),new $({color:12724778,roughness:.5}));y.position.set(182,t+1.4,306),y.castShadow=!0;const P=new X(new Ue(1.3,1.3,5.5,12),_);P.rotation.x=Math.PI/2,P.position.set(182,t+1.6,301),P.castShadow=!0,n.add(y,P)}E(22,16,100,-260);{const _=new X(new fe(16,6,10),new $({color:11022898,roughness:.8}));_.position.set(100,t+3,-260),_.castShadow=_.receiveShadow=!0,n.add(_);const y=new X(new Lt(11,4.4),new $({color:14540253,roughness:.5,metalness:.4}));y.position.set(100-8.1,t+2.4,-260),y.rotation.y=-Math.PI/2,n.add(y);const P=new $({color:14169397,roughness:.45}),I=new X(new fe(3,2.4,8),P);I.position.set(88,t+1.5,-252),I.castShadow=!0;const D=new X(new fe(1.6,.35,.6),new Mt({color:16720418}));D.position.set(88,t+2.9,-252),D.userData={blink:!0,rate:2.2,duty:.5},n.add(I,D)}i.add(n)}function bu(i){const e=new Qe,t=new $({color:i,roughness:.4,metalness:.2}),n=new $({color:15922422,roughness:.4,metalness:.1}),s=new X(new Ue(.8,.5,7,10),n);s.rotation.x=Math.PI/2,s.position.y=1.2,e.add(s);const r=new X(new fe(10.5,.16,1.5),t);r.position.set(0,2.1,-.4),e.add(r);const o=new X(new fe(3.2,.12,1),n);o.position.set(0,1.5,3.3),e.add(o);const a=new X(new fe(.12,1.6,1.2),t);return a.position.set(0,2.2,3.3),e.add(a),e.traverse(c=>{c.isMesh&&(c.castShadow=!0)}),e}function ny(i){const e=ii(1337),t=[],n=[],s=[];let r=0;const o=8e3;for(;t.length+n.length+s.length<o&&r++<3e5;){const u=(e()*2-1)*16e3,p=(e()*2-1)*16e3,m=Ve(u,p);if(m<3||m>160||Math.abs(u)<260&&Math.abs(p)<1050||u>0&&u<220&&p>0&&p<340||u>20&&u<280&&p>-500&&p<500||Math.abs(u-Bt.x)<200&&Math.abs(p-Bt.z)<500||Math.abs(u-Qt.x)<200&&Math.abs(p-Qt.z)<500||Math.abs(u-Kn.x)<120&&Math.abs(p-Kn.z)<300||Math.abs(u-qn.x)<130&&Math.abs(p-qn.z)<320||Math.abs(u-Yn.x)<140&&Math.abs(p-Yn.z)<350||Math.abs(u-$n.x)<110&&Math.abs(p-$n.z)<280||Math.hypot(u+330,p-860)<320||Math.hypot(u-8500,p-7500)<420||Math.abs(Ve(u+10,p)-m)+Math.abs(Ve(u,p+10)-m)>14)continue;const d=.7+e()*.9,g=e()*Math.PI*2,M={x:u,h:m,z:p,s:d,r:g};m<6&&e()<.6?s.push(M):m>60||m>25&&e()<.5?t.push(M):n.push(M)}const a=new Ze,c=new hn,l=new _n,h=new F,f=new F;{const u=new Ue(.2,.45,5,6),p=new $({color:4861984,roughness:1}),m=new Qn(u,p,t.length),x=[new $({color:1718808,roughness:1}),new $({color:1983008,roughness:1}),new $({color:2247204,roughness:1})],g=[new Jt(3,4.5,7),new Jt(2.2,3.8,7),new Jt(1.4,3,7)].map((M,v)=>new Qn(M,x[v],t.length));t.forEach((M,v)=>{l.set(0,M.r,0),c.setFromEuler(l),h.set(M.x,M.h+2.5*M.s,M.z),f.set(M.s,M.s,M.s),a.compose(h,c,f),m.setMatrixAt(v,a);const S=M.h+4*M.s;[[0,4.5,3],[.3,3.8,2.2],[.15,3,1.4]].forEach(([E,w,A],N)=>{h.set(M.x,S+(E+w*.5)*M.s+N*1.8*M.s,M.z),f.set(M.s,M.s,M.s),a.compose(h,c,f),g[N].setMatrixAt(v,a)})}),m.castShadow=!0,g.forEach(M=>{M.castShadow=M.receiveShadow=!0}),i.add(m,...g)}{const u=new Ue(.3,.55,4.5,6),p=new $({color:5913118,roughness:1}),m=new Qn(u,p,n.length),x=new $({color:2775586,roughness:1}),d=new $({color:3439146,roughness:1}),g=new Ut(3.2,8,6),M=new Ut(2.6,8,6),v=new Qn(g,x,n.length),S=new Qn(M,d,n.length);n.forEach((T,E)=>{l.set(0,T.r,0),c.setFromEuler(l),h.set(T.x,T.h+2.25*T.s,T.z),f.set(T.s,T.s,T.s),a.compose(h,c,f),m.setMatrixAt(E,a),h.set(T.x,T.h+(4.5+2)*T.s,T.z),f.set(T.s*1.1,T.s*.9,T.s*1.1),a.compose(h,c,f),v.setMatrixAt(E,a);const w=Math.sin(T.r*3)*1.2*T.s,A=Math.cos(T.r*3)*1.2*T.s;h.set(T.x+w,T.h+(4.5+2.8)*T.s,T.z+A),f.set(T.s*.8,T.s*.7,T.s*.8),a.compose(h,c,f),S.setMatrixAt(E,a)}),m.castShadow=!0,v.castShadow=v.receiveShadow=!0,S.castShadow=S.receiveShadow=!0,i.add(m,v,S)}{const u=new Ue(.18,.3,8,6),p=new $({color:6967344,roughness:1}),m=new Qn(u,p,s.length),x=new Lt(1.2,5.5);x.translate(0,2.75,0);const d=new $({color:2783778,roughness:.9,side:Gt}),g=new Qn(x,d,s.length*6);s.forEach((M,v)=>{l.set(0,M.r,0),c.setFromEuler(l),h.set(M.x,M.h+4*M.s,M.z),f.set(M.s,M.s,M.s),a.compose(h,c,f),m.setMatrixAt(v,a);const S=M.h+8*M.s;for(let T=0;T<6;T++){const E=M.r+T/6*Math.PI*2,w=.5+e()*.3,A=new hn;A.setFromEuler(new _n(-w,E,0)),h.set(M.x,S,M.z),f.set(M.s*(.8+e()*.4),M.s,M.s*(.8+e()*.4)),a.compose(h,A,f),g.setMatrixAt(v*6+T,a)}}),m.castShadow=!0,g.castShadow=g.receiveShadow=!0,i.add(m,g)}return{count:t.length+n.length+s.length}}function iy(i){const e=ry(),t=ii(77),n=new Qe;for(let s=0;s<40;s++){const r=new Qe,o=4+Math.floor(t()*3);for(let l=0;l<o;l++){const h=.82+t()*.18,f=new Ht(new Ft({map:e,transparent:!0,opacity:.8,depthWrite:!1,color:new We(h,h,h*1.02)}));f.position.set((t()-.5)*420,(t()-.5)*60,(t()-.5)*180);const u=220+t()*260;f.scale.set(u,u*.5,1),r.add(f)}const a=t()*Math.PI*2,c=1500+t()*15e3;r.position.set(Math.cos(a)*c,520+t()*650,Math.sin(a)*c),n.add(r)}return i.add(n),n}function sy(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d"),t=e.createImageData(256,256),n=ii(9);for(let r=0;r<t.data.length;r+=4){const o=228+Math.floor(n()*28);t.data[r]=t.data[r+1]=t.data[r+2]=o,t.data[r+3]=255}e.putImageData(t,0,0);const s=new un(i);return s.wrapS=s.wrapT=ji,s.repeat.set(300,300),s}function ry(){const i=document.createElement("canvas");i.width=i.height=128;const e=i.getContext("2d"),t=ii(5);for(let n=0;n<46;n++){const s=24+t()*80,r=46+t()*36,o=10+t()*22,a=e.createRadialGradient(s,r,0,s,r,o);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=a,e.beginPath(),e.arc(s,r,o,0,7),e.fill()}return new un(i)}function us(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,0.6)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new un(i)}function oy(){const i=document.createElement("canvas");i.width=128,i.height=16;const e=i.getContext("2d");for(let n=0;n<6;n++)e.fillStyle=n%2?"#e8641e":"#f2f2f2",e.fillRect(n*22,0,22,16);const t=new un(i);return t.wrapS=ji,t}function ay(i,e){const t=document.createElement("canvas");t.width=128,t.height=192;const n=t.getContext("2d");n.clearRect(0,0,128,192),n.fillStyle="#f2f2f2",n.font=`bold ${e}px monospace`,n.textAlign="center",n.textBaseline="middle",n.fillText(i[0],64,52),n.fillText(i[1],64,140);const s=new un(t);return s.anisotropy=4,s}function Wd(i){const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");t.fillStyle="#14202e",t.fillRect(0,0,512,128),t.strokeStyle="#ffb020",t.lineWidth=8,t.strokeRect(6,6,500,116),t.fillStyle="#ffd97a",t.textAlign="center",t.textBaseline="middle";let n=64;for(t.font=`bold ${n}px Arial`;t.measureText(i).width>470&&n>20;)n-=4,t.font=`bold ${n}px Arial`;t.fillText(i,256,66);const s=new un(e);return s.anisotropy=4,s}function sc(i,e,t,n,s,r,o){const a=e.length,c=[],l=[];for(let u=0;u<a;u++){const[p,m]=e[u],[x,d]=e[(u+1)%a],[g,M]=e[(u-1+a)%a];let v=x-g,S=d-M;const T=Math.hypot(v,S)||1;v/=T,S/=T;const E=-S,w=v,A=p+E*n,N=m+w*n,_=A+E*s/2,y=N+w*s/2,P=A-E*s/2,I=N-w*s/2;if(c.push(_,Ve(_,y)+r,y,P,Ve(P,I)+r,I),t||u<a-1){const D=u*2,O=u*2+1,U=(u+1)%a*2,V=(u+1)%a*2+1;l.push(D,O,U,O,V,U)}}const h=new Ot;h.setAttribute("position",new wt(c,3)),h.setIndex(l),h.computeVertexNormals();const f=new X(h,o);f.receiveShadow=!0,i.add(f)}function Do(i,e,t,n=!0){const s=[],r=e.length,o=n?r:r-1;for(let v=0;v<o;v++){const[S,T]=e[v],[E,w]=e[(v+1)%r],A=Math.hypot(E-S,w-T),N=Math.max(2,Math.round(A/12));for(let _=0;_<N;_++){const y=_/N;s.push([S+(E-S)*y,T+(w-T)*y])}}const a=new $({color:3356220,roughness:1}),c=new $({color:10133670,roughness:.95});sc(i,s,n,0,t,.18,a),sc(i,s,n,t/2+.6,1.1,.32,c),sc(i,s,n,-t/2-.6,1.1,.32,c);const l=new fe(.35,.06,3),h=new Mt({color:14211280}),f=[];for(let v=0;v<s.length;v+=2)f.push(s[v]);const u=new Qn(l,h,f.length),p=new Ze,m=new hn,x=new _n,d=new F,g=new F(1,1,1);f.forEach(([v,S],T)=>{const[E,w]=f[(T+1)%f.length];x.set(0,Math.atan2(E-v,w-S),0),m.setFromEuler(x),d.set(v,Ve(v,S)+.24,S),p.compose(d,m,g),u.setMatrixAt(T,p)}),i.add(u);const M=[];for(let v=0;v<s.length;v+=2)M.push({x:s[v][0],z:s[v][1]});return M}function cy(i){const e=new Qe,t=ii(4242),n=[],s=[],r=[],o=[15260864,14213864,15255736,13162680,14733544,15788240],a=[9059114,3824250,5921370,7031338],c=o.map(S=>new $({color:S,roughness:.9})),l=a.map(S=>new $({color:S,roughness:.9})),h=new $({color:1053980,roughness:.15,metalness:.6,emissive:16763514,emissiveIntensity:0});s.push(h);const f=new $({color:4862496,roughness:.9}),u=(S,T=.9)=>new $({color:S,roughness:T}),p=(S,T,E=1)=>{const w=Ve(S,T);if(w<3)return!1;const A=(7+t()*5)*E,N=(6+t()*4)*E,_=3.5+t()*2,y=new X(new fe(A,_,N),c[Math.floor(t()*6)]);y.position.set(S,w+_/2-.4,T),y.rotation.y=t()*Math.PI,y.castShadow=y.receiveShadow=!0,e.add(y);for(const O of[-1,1])for(const U of[-.22,.22]){const V=new X(new Lt(1.1,1.1),h);V.position.set(U*A,.3,O*(N/2+.03)),O<0&&(V.rotation.y=Math.PI),y.add(V);const z=u(4876858+Math.floor(t()*2105376)&16777215,.9);for(const ce of[-.7,.7]){const le=new X(new fe(.25,1.2,.06),z);le.position.set(U*A+ce,.3,O*(N/2+.05)),O<0&&(le.rotation.y=Math.PI),y.add(le)}}const P=new X(new fe(1.1,2.2,.1),f);if(P.position.set(0,-_/2+1.1,N/2+.03),y.add(P),t()<.7){const O=A*.35+1,U=new X(new fe(O,.15,1.8),u(9075304,.9));U.position.set(0,-_/2+2.4,N/2+.9),U.castShadow=!0,y.add(U);for(const V of[-O/2+.15,O/2-.15]){const z=new X(new Ue(.08,.08,2.5,6),u(6969928,.9));z.position.set(V,-_/2+1.25,N/2+1.7),y.add(z)}}const I=new X(new fe(.7,2.2,.7),new $({color:9076856,roughness:.9}));I.position.set(A/4,_/2+.8,0),I.castShadow=!0,y.add(I);const D=t();if(D<.5){const O=Math.max(A,N)*.55,U=2.2+t()*.8;for(const V of[-1,1]){const z=new X(new Lt(O,U+.4),l[Math.floor(t()*4)]);z.position.set(0,_/2+U*.35,V*N*.28),z.rotation.x=V*.52,z.castShadow=!0,y.add(z)}}else if(D<.8){const O=new X(new Jt(Math.max(A,N)*.75,2.6,4),l[Math.floor(t()*4)]);O.position.set(S,w+_+.9,T),O.rotation.y=Math.PI/4,O.castShadow=!0,e.add(O)}else{const O=new X(new fe(A+.4,.3,N+.4),u(6974058,.9));O.position.set(S,w+_-.25,T),O.castShadow=!0,e.add(O);const U=new X(new fe(1.2,.8,1.2),u(8947848,.8));U.position.set(S+A*.2,w+_+.15,T+N*.2),U.castShadow=!0,e.add(U)}return!0},m=(S,T,E,w,A)=>{let N=0,_=0;for(;N<A&&_++<400;){const y=S+t()*(T-S),P=E+t()*(w-E),I=Ve(y,P);I<4||Math.abs(Ve(y+12,P)-I)+Math.abs(Ve(y,P+12)-I)>18||p(y,P)&&N++}};m(-140,60,760,1020,9),m(8380,8620,7380,7620,14);const x=(S,T,E,w)=>{const A=Ve(S,T),N=13+t()*3,_=10+t()*2,y=5.5+t()*1.5,P=new X(new fe(N,y,_),new $({color:w,roughness:.8}));P.position.set(S,A+y/2-.3,T),P.castShadow=P.receiveShadow=!0,e.add(P);const I=new X(new fe(N+1.2,.6,_+1.2),new $({color:1846336,roughness:.8}));I.position.set(S,A+y+.1,T),I.castShadow=!0,e.add(I);const D=new X(new fe(10,2.5,.4),new $({color:1710634,roughness:.6}));D.position.set(S,A+y-1.3,T-_/2-.25),D.castShadow=!0,e.add(D);const O=new X(new Lt(10,2.5),new Mt({map:Wd(E),transparent:!1}));O.position.set(S,A+y-1.3,T-_/2-.05),O.rotation.y=Math.PI,e.add(O);const V=u([13382451,3368618,2263108,11167266,8926122][Math.floor(t()*5)],.9),z=new X(new fe(N*.9,.1,2.2),V);z.position.set(S,A+y-.6,T-_/2-1.1),z.rotation.x=.15,z.castShadow=!0,e.add(z);const ce=new $({color:657940,roughness:.1,metalness:.7});for(const be of[-N*.25,N*.25]){const j=new X(new fe(N*.3,y*.5,.08),ce);j.position.set(S+be,A+y*.25,T-_/2+.05),e.add(j)}const le=new Ht(new Ft({map:us(),color:16767354,transparent:!0,depthWrite:!1}));le.position.set(S,A+y+.8,T-_/2-1.5),le.scale.set(6,6,1),le.userData.night=!0,e.add(le),n.push(le)};x(Lo.x,Lo.z,"PILOT SHOP",3033704),x(122,-30,"AIRPORT SUPPLY",7031434),x(8420,7410,"BEACH GEAR",2787962),x(-6940,1560,"CITY PILOT SUPPLY",9054778),x(-1150,-5240,"GENERAL STORE",8020552),x(2590,2050,"BAIT & TACKLE",4877194);{const S=Lo.x,T=Lo.z,E=Ve(S,T),w=new X(new fe(1,2,.7),new $({color:12724778,roughness:.5}));w.position.set(S+8,E+1,T-2),w.castShadow=!0,e.add(w)}{const S=[14764875,4947425,14787659,4968842,14777032];[[7260,6410],[7220,6380],[7180,6350],[7300,6430],[7130,6310]].forEach(([O,U],V)=>{const z=Ve(O,U);if(z<.4||z>9)return;const ce=new X(new Ue(.08,.08,3),new $({color:15658734}));ce.position.set(O,z+1.5,U),e.add(ce);const le=new X(new Jt(2.2,1.2,8),new $({color:S[V%S.length],roughness:.8}));le.position.set(O,z+3.2,U),le.castShadow=!0,e.add(le)});const E=7225,w=6378,A=-.75,N=-.66,_=100,y=new $({color:9071432,roughness:.9}),P=new X(new fe(7,.5,_),y),I=E+A*_,D=w+N*_;P.position.set((E+I)/2,5.6,(w+D)/2),P.rotation.y=Math.atan2(A,N),P.castShadow=P.receiveShadow=!0,e.add(P);for(let O=0;O<=_;O+=12){const U=E+A*O,V=w+N*O,z=Math.max(Ve(U,V),-8),ce=new X(new Ue(.25,.25,5.6-z),new $({color:5916210}));ce.position.set(U,(5.6+z)/2,V),e.add(ce)}}const d=us(),g=S=>{for(let T=0;T<S.length;T+=6){const E=S[T],w=Ve(E.x,E.z);if(w<2)continue;const A=new X(new Ue(.12,.16,7),new $({color:3817285,roughness:.7}));A.position.set(E.x+4.5,w+3.5,E.z),A.castShadow=!0,e.add(A);const N=new Ht(new Ft({map:d,color:16767392,transparent:!0,depthWrite:!1}));N.position.set(E.x+4.5,w+7.2,E.z),N.scale.set(7,7,1),N.userData.night=!0,e.add(N),n.push(N)}},M=[[-480,740],[-180,740],[-180,980],[-480,980]],v=[[8350,7350],[8650,7350],[8650,7650],[8350,7650]];for(const S of[M,v]){const T=Do(e,S,6);r.push(T),g(T)}{const{x:S,z:T,halfLen:E,halfWid:w,elev:A}=Qt,N=new X(new fe(w*2,.25,E*2),new $({color:4483888,roughness:1}));N.position.set(S,A+.1,T),N.receiveShadow=!0,e.add(N);const _=new $({color:15790320,roughness:.9});for(let P=-E;P<=E;P+=56)for(const I of[-w-2,w+2]){const D=new X(new Ue(.7,.7,.5,10),_);D.position.set(S+I,A+.4,T+P),e.add(D)}const y=new X(new fe(5,3,4),new $({color:8020552,roughness:.9}));y.position.set(S+20,A+1.5,T+30),y.castShadow=!0,e.add(y)}m(-1350,-1050,-5450,-5150,8);{const E=Ve(-1200,-5300),w=new X(new fe(7,4.5,10),new $({color:15920608,roughness:.9}));w.position.set(-1200,E+2.2-.3,-5300),w.castShadow=w.receiveShadow=!0,e.add(w);const A=new X(new fe(2.4,7,2.4),new $({color:15920608,roughness:.9}));A.position.set(-1200,E+5.5,-5300-5.5),A.castShadow=!0,e.add(A)}m(2500,2740,1960,2200,8);{const S=ii(31337);for(let T=0;T<3;T++){const E=2560+S()*120,w=2020+S()*120,A=Ve(E,w);if(A<1)continue;const N=new Qe,_=new X(new fe(1.4,.6,3.4),new $({color:[2777026,12763842,14721056][T],roughness:.8}));_.castShadow=!0,N.add(_),N.position.set(E,A+.35,w),N.rotation.y=S()*Math.PI,T===1&&(N.rotation.z=Math.PI),e.add(N)}}{const A=document.createElement("canvas");A.width=64,A.height=128;const N=document.createElement("canvas");N.width=64,N.height=128;const _=A.getContext("2d"),y=N.getContext("2d"),P=ii(777);_.fillStyle="#c9d1d8",_.fillRect(0,0,64,128),y.fillStyle="#000000",y.fillRect(0,0,64,128);for(let Q=0;Q<16;Q++)for(let he=0;he<6;he++){const ye=4+he*10,_e=4+Q*7.6;_.fillStyle="#232c38",_.fillRect(ye,_e,7,4.6),P()<.35&&(y.fillStyle="#ffd97a",y.fillRect(ye,_e,7,4.6))}const I=new $({map:new un(A),emissiveMap:new un(N),emissive:16777215,emissiveIntensity:0,roughness:.75});s.push(I);const D=new Ze,O=new hn,U=new _n,V=new F,z=new F;new We,new $({color:10132128,roughness:.8});const ce=new $({color:1714746,roughness:.15,metalness:.6});new $({color:660512,roughness:.1,metalness:.7});const le=new $({color:8026746,roughness:.7}),be=new $({color:3816010,roughness:.5});let j=0;for(let Q=-2;Q<=2&&j<25;Q++)for(let he=-2;he<=2&&j<25;he++){if(Math.abs(Q)<1&&Math.abs(he)<1)continue;const ye=-7e3+Q*62+(P()-.5)*10,_e=1500+he*62+(P()-.5)*10,C=Ve(ye,_e);if(C<4)continue;const b=Math.hypot(Q,he),B=Math.max(22,72-b*14+P()*14),ie=20+P()*8,ee=20+P()*8,ne=P()<.5?0:Math.PI/2;U.set(0,ne,0),O.setFromEuler(U);const se=B*.6;V.set(ye,C+se/2-2,_e),z.set(ie,se,ee),D.compose(V,O,z);const ve=new X(new fe(ie,se,ee),I);if(ve.position.set(ye,C+se/2-2,_e),ve.rotation.y=ne,ve.castShadow=ve.receiveShadow=!0,e.add(ve),B>35){const Ke=ie*(.55+P()*.15),pe=ee*(.55+P()*.15),Ie=B*.35,je=C+se-2,ke=new X(new fe(Ke,Ie,pe),I);ke.position.set(ye,je+Ie/2,_e),ke.rotation.y=ne,ke.castShadow=ke.receiveShadow=!0,e.add(ke)}const Te=C+B-2;for(let Ke=0;Ke<2+Math.floor(P()*3);Ke++){const pe=new X(new fe(1.2+P(),.7,1.2+P()),le);pe.position.set(ye+(P()-.5)*ie*.5,Te+.35,_e+(P()-.5)*ee*.5),pe.castShadow=!0,e.add(pe)}if(B>50&&P()<.6){const Ke=new X(new Ue(.08,.12,B*.2,6),be);Ke.position.set(ye,Te+B*.1,_e),Ke.castShadow=!0,e.add(Ke);const pe=new Ht(new Ft({map:us(),color:16720418,transparent:!0,depthWrite:!1}));pe.position.set(ye,Te+B*.2,_e),pe.scale.set(4,4,1),pe.userData={blink:!0,rate:.7,duty:.15},e.add(pe)}if(P()<.5){const Ke=ie*(.3+P()*.3),pe=new X(new fe(Ke,se*.8,.15),ce);pe.position.set(ye,C+se*.4-2,_e-ee/2-.1),pe.rotation.y=ne,e.add(pe)}j++}const Re=Ve(-7e3,1500),K=new X(new ms(46,24),new $({color:3037736,roughness:1}));K.rotation.x=-Math.PI/2,K.position.set(-7e3,Re+.4,1500),K.receiveShadow=!0,e.add(K);const ae=new X(new ms(12,20),new $({color:2779802,roughness:.2,metalness:.4}));ae.rotation.x=-Math.PI/2,ae.position.set(-6988,Re+.55,1508),e.add(ae);const xe=new X(new Ue(4,6,92,12),new $({color:9081760,roughness:.5,metalness:.4}));xe.position.set(-7040,Re+46,1470),xe.castShadow=!0,e.add(xe);const te=new Ht(new Ft({map:us(),color:16729156,transparent:!0,depthWrite:!1}));te.position.set(-7040,Re+93,1470),te.scale.set(9,9,1),te.userData={blink:!0,rate:.7,duty:.15},e.add(te),m(-7450,-6550,1700,1950,8),m(-7450,-6550,1050,1300,8);const me=[];for(const Q of[-7150,-7e3,-6850])me.push(Do(e,[[Q,1050],[Q,1950]],7,!1));for(const Q of[1350,1500,1650])me.push(Do(e,[[-7450,Q],[-6550,Q]],7,!1));me.forEach(g);const Se=[[-7380,1120],[-6620,1120],[-6620,1880],[-7380,1880]];r.push(Do(e,Se,7));const De=[];for(let Q=0;Q<2;Q++){const he={r:new $({color:3342336,emissive:16720418,emissiveIntensity:.1}),y:new $({color:3351040,emissive:16759586,emissiveIntensity:.1}),g:new $({color:13056,emissive:2293572,emissiveIntensity:.1})};De.push(he)}[[-7e3,1350],[-6850,1500]].forEach(([Q,he],ye)=>{const _e=Ve(Q,he),C=new X(new Ue(.15,.2,6.5),new $({color:2764083,roughness:.7}));C.position.set(Q+5,_e+3.2,he+5),C.castShadow=!0,e.add(C);const b=new X(new fe(1,2.6,1),new $({color:1118740,roughness:.6}));b.position.set(Q+5,_e+7,he+5),e.add(b);const B=De[ye%2],ie=[[B.r,.85],[B.y,0],[B.g,-.85]];for(const[ne,se]of ie){const ve=new X(new Ut(.32,10,8),ne);ve.position.set(Q+5,_e+7+se,he+4.45),e.add(ve)}const ee=new Qe;ee.userData.tlCycle={mats:B,off:ye*7},ee.position.set(Q,_e,he),e.add(ee)});const $e=[3828418,15263976,2764083,12728890];[[-6930,1420,.3],[-7070,1580,-.2],[-300,800,.9],[8450,7420,1.8]].forEach(([Q,he,ye],_e)=>{const C=new Qe,b=new $({color:$e[_e%4],roughness:.4,metalness:.3}),B=new X(new fe(2,.9,4.2),b);B.position.y=.85,B.castShadow=!0;const ie=new X(new fe(1.7,.65,2.1),new $({color:1053980,roughness:.1,metalness:.8}));ie.position.set(0,1.5,-.2),C.add(B,ie);const ee=new Ue(.42,.42,.35,10),ne=new $({color:1315860,roughness:.9});for(const[ve,Te]of[[-.95,1.4],[.95,1.4],[-.95,-1.4],[.95,-1.4]]){const Ke=new X(ee,ne);Ke.rotation.z=Math.PI/2,Ke.position.set(ve,.42,Te),C.add(Ke)}const se=Ve(Q,he);C.position.set(Q,se<1?1:se+.15,he),C.rotation.y=ye,e.add(C)});const oe=new Qe,L=new X(new fe(16,7,55),new $({color:8003616,roughness:.6}));L.position.y=1,L.castShadow=!0;const q=new X(new fe(12,9,8),new $({color:15263976,roughness:.6}));q.position.set(0,8,-20),q.castShadow=!0,oe.add(L,q);const ge=[12728890,3828418,3843669,14721056];for(let Q=0;Q<8;Q++){const he=new X(new fe(3.4,3,5),new $({color:ge[Q%4],roughness:.7}));he.position.set(Q%2?-4:4,6,2+Math.floor(Q/2)*6),oe.add(he)}oe.position.set(-4880,.5,1040),oe.rotation.y=.4,e.add(oe)}return i.add(e),{nightGlows:n,nightMats:s,roadLoops:r}}const Vi=[{name:"Coral Strip",blurb:"a 600 m grass strip on the south-east island — landable!",x:Bt.x,z:Bt.z,r:420},{name:"Harborview",blurb:"hillside town in the west valley",x:-330,z:860,r:380},{name:"Harborview Strip",blurb:"a short grass strip near the harbor town",x:Kn.x,z:Kn.z,r:280},{name:"Lighthouse Point",blurb:"the rotating beacon on the north cape",x:150,z:-1450,r:320},{name:"Lighthouse Strip",blurb:"a tiny grass strip by the lighthouse",x:$n.x,z:$n.z,r:240},{name:"Sailboat Marina",blurb:"floating docks off the south-west coast",x:-2132,z:2251,r:380},{name:"Wind Farm",blurb:"three turbines on the east ridge",x:1400,z:-500,r:320},{name:"Summit Lookout",blurb:"fire tower on the 300 m peak",x:1800,z:-600,r:280},{name:"Seabreeze",blurb:"resort town on the north-east island",x:8500,z:7500,r:480},{name:"Seabreeze Strip",blurb:"a grass strip near the beach resort",x:qn.x,z:qn.z,r:300},{name:"North Strip",blurb:"a lonely grass strip on the north island",x:Qt.x,z:Qt.z,r:420},{name:"Aurora City",blurb:"the big city on the west island",x:-7e3,z:1500,r:700},{name:"City Strip",blurb:"a grass landing strip on the edge of the city",x:Yn.x,z:Yn.z,r:340},{name:"Northville",blurb:"hamlet by the North Strip",x:-1200,z:-5300,r:300},{name:"Coral Bay",blurb:"fishing village on the coral shore",x:2620,z:2080,r:300},{name:"Shipwreck Cove",blurb:"a wreck rotting in the shallows SE of Coral",x:3150,z:2550,r:320},{name:"Observatory",blurb:"star dome on the east peak",x:7400,z:-2400,r:320},{name:"Ember Isle",blurb:"a smoking volcano far to the south",x:3e3,z:13e3,r:600}];function ly(i){const e=ii(2024),t=new Qe,n=(m,x,d,g,M,v=0)=>{const S=new X(m,x);return S.position.set(d,g,M),S.rotation.y=v,S.castShadow=S.receiveShadow=!0,t.add(S),S};{const{x:m,z:x,halfLen:d,halfWid:g,elev:M}=Bt,v=n(new fe(g*2,.25,d*2),new $({color:4025135,roughness:1}),m,M+.1,x);v.castShadow=!1;const S=new $({color:15790320,roughness:.9});for(let w=-d;w<=d;w+=60)for(const A of[-g-2,g+2]){const N=new X(new Ue(.7,.7,.5,10),S);N.position.set(m+A,M+.4,x+w),t.add(N)}n(new fe(6,3.4,5),new $({color:9071432,roughness:.9}),m+22,M+1.7,x+40);const T=n(new Jt(4.8,2,4),new $({color:5913384,roughness:.9}),m+22,M+4.3,x+40,Math.PI/4);T.castShadow=!0;const E=n(new Ue(.15,.15,9),new $({color:13421772}),m-18,M+4.5,x-d+30);E.castShadow=!0}for(const m of Gd){const{x,z:d,halfLen:g,halfWid:M,elev:v}=m,S=n(new fe(M*2,.22,g*2),new $({color:4880954,roughness:1}),x,v+.1,d);S.castShadow=!1;const T=new $({color:15658734,roughness:.7});for(const A of[-g+5,g-5])for(const N of[-M-1.5,M+1.5]){const _=new X(new Ue(.12,.12,1.8,6),T);_.position.set(x+N,v+.9,d+A),t.add(_)}const E=n(new Ue(.1,.12,6),new $({color:12303291}),x,v+3,d-g-6);E.castShadow=!0;const w=new X(new Jt(.5,2.5,8),new $({color:16738850,roughness:.9}));w.position.set(x,v+5.5,d-g-6),w.rotation.z=Math.PI/2,w.castShadow=!0,t.add(w),n(new fe(4,2.6,3.5),new $({color:8022616,roughness:.9}),x+M+8,v+1.3,d)}{const m=[15260864,14213864,15255736,13162680,14733544,15788240],x=[9059114,3824250,5921370,7031338];let d=0,g=0;for(;d<16&&g++<600;){const N=-480+e()*320,_=720+e()*280,y=Ve(N,_);if(y<4||Math.abs(Ve(N+12,_)-y)+Math.abs(Ve(N,_+12)-y)>16)continue;const I=7+e()*5,D=6+e()*4,O=3.5+e()*2;n(new fe(I,O,D),new $({color:m[d%m.length],roughness:.9}),N,y+O/2-.4,_,e()*Math.PI);const U=new X(new Jt(Math.max(I,D)*.75,2.6,4),new $({color:x[d%x.length],roughness:.9}));U.position.set(N,y+O+.9,_),U.rotation.y=Math.PI/4+e()*.2,U.castShadow=!0,t.add(U),d++}const M=-330,v=860,S=Ve(M,v);n(new fe(10,6,14),new $({color:15920608,roughness:.9}),M,S+3-.4,v),n(new fe(3.4,12,3.4),new $({color:15920608,roughness:.9}),M,S+6-.4,v-8);const T=new X(new Jt(2.6,6,4),new $({color:3820122,roughness:.8}));T.position.set(M,S+15-.4,v-8),T.rotation.y=Math.PI/4,T.castShadow=!0,t.add(T);const E=-240,w=790,A=Ve(E,w);for(const[N,_]of[[-2,-2],[2,-2],[-2,2],[2,2]])n(new Ue(.25,.25,14),new $({color:7829367}),E+N,A+7,w+_);n(new Ut(4,14,10),new $({color:10139852,roughness:.6,metalness:.3}),E,A+16,w)}{const d=Ve(150,-1450),g=document.createElement("canvas");g.width=16,g.height=128;const M=g.getContext("2d");for(let A=0;A<8;A++)M.fillStyle=A%2?"#c22":"#eee",M.fillRect(0,A*16,16,16);const v=new un(g),S=n(new Ue(3.2,4.2,26,14),new $({map:v,roughness:.7}),150,d+13,-1450);S.castShadow=!0,n(new Ue(3.6,3.6,2.4,14),new $({color:2238e3,roughness:.5,metalness:.4}),150,d+27,-1450);const T=new Ht(new Ft({map:us(),color:16773808,transparent:!0,depthWrite:!1}));T.position.set(150,d+27.5,-1450),T.scale.set(10,10,1),T.userData={blink:!0,rate:.5,duty:.5,dim:!0},t.add(T);const E=new Mt({color:16773808,transparent:!0,opacity:.13,blending:Fr,depthWrite:!1,side:Gt}),w=new Qe;for(const A of[0,Math.PI]){const N=new Qe;N.rotation.y=A;const _=new X(new Jt(7,220,12,1,!0),E);_.rotation.z=Math.PI/2,_.position.x=110,N.add(_),w.add(N)}w.position.set(150,d+27.5,-1450),w.name="lightbeams",t.add(w)}const s=new Qe;s.name="boats";{const d=new $({color:9071432,roughness:.9});for(const M of[-30,30]){const v=new X(new fe(60,.6,4),d);v.position.set(-2132,.5,2251+M),v.castShadow=v.receiveShadow=!0,t.add(v)}const g=[16777215,16765562,8046847,16751226,14221272];for(let M=0;M<6;M++){const v=new Qe,S=new X(new fe(2.2,1.2,7),new $({color:[12724778,2777026,15658734][M%3],roughness:.5}));S.position.y=.4,S.castShadow=!0;const T=new X(new Ue(.09,.09,9),new $({color:7031338,roughness:.8}));T.position.y=5,T.castShadow=!0;const E=new ca;E.moveTo(0,0),E.lineTo(0,7.6),E.lineTo(3.4,.6),E.lineTo(0,0);const w=new X(new Ul(E),new $({color:g[M%g.length],side:Gt,roughness:.8}));w.position.set(.15,1.2,-.5),v.add(S,T,w),v.position.set(-2156+M%3*24,0,2251+(M<3?-30:30)+6),v.rotation.y=(e()-.5)*.6,v.userData.phase=e()*7,s.add(v)}t.add(s)}const r=[];{const m=new $({color:15265007,roughness:.4,metalness:.2});for(const[x,d]of[[1400,-500],[1470,-420],[1330,-410]]){const g=Ve(x,d),M=n(new Ue(1.1,1.6,42,10),m,x,g+21,d);M.castShadow=!0;const v=new Qe;v.position.set(x,g+42,d-1.8);for(let S=0;S<3;S++){const T=new X(new fe(.7,15,.18),m);T.geometry=T.geometry.clone(),T.geometry.translate(0,8.2,0);const E=new Qe;E.rotation.z=S/3*Math.PI*2,E.add(T),T.castShadow=!0,v.add(E)}t.add(v),r.push(v)}}{const d=Ve(1800,-600),g=new $({color:5916210,roughness:.9});for(const[M,v]of[[-3,-3],[3,-3],[-3,3],[3,3]]){const S=new X(new Ue(.3,.3,18),g);S.position.set(1800+M,d+9,-600+v),S.castShadow=!0,t.add(S)}n(new fe(9,4,9),new $({color:8020552,roughness:.9}),1800,d+20,-600),n(new Jt(7,3,4),new $({color:3820090,roughness:.9}),1800,d+23.5,-600,Math.PI/4)}{const m=new Qe,x=new $({color:3812902,roughness:.95}),d=new X(new fe(10,6,34),x);d.castShadow=!0;const g=new X(new Ue(5,5,6,3,1),x);g.rotation.y=Math.PI,g.position.z=-19;const M=new X(new Ue(.3,.4,18),new $({color:4864554,roughness:.9}));M.position.set(0,8,4),M.rotation.z=.35,M.castShadow=!0,m.add(d,g,M),m.position.set(3150,-1.5,2550),m.rotation.set(.08,.7,.42),t.add(m)}{const d=Ve(7400,-2400);n(new Ue(6,6.5,7,14),new $({color:12106946,roughness:.8}),7400,d+3.5,-2400);const g=new X(new Ut(5.5,18,12,0,Math.PI*2,0,Math.PI/2),new $({color:15265010,roughness:.35,metalness:.2}));g.position.set(7400,d+7,-2400),g.castShadow=!0,t.add(g);const M=new X(new fe(1.6,4.5,.6),new $({color:1316380,roughness:.6}));M.position.set(7400,d+9,-2400-5.2),M.rotation.x=-.25,t.add(M)}let o=null;{const d=Ve(3e3,13e3),g=new X(new Jt(150,110,24,1,!0),new $({color:3813936,roughness:1,side:Gt}));g.position.set(3e3,d+55,13e3),t.add(g),o=new $({color:5446149,emissive:16734720,emissiveIntensity:1.6,roughness:.8});const M=new X(new ms(26,24),o);M.rotation.x=-Math.PI/2,M.position.set(3e3,d+108,13e3),t.add(M);const v=new Ht(new Ft({map:us(),color:16742946,transparent:!0,depthWrite:!1}));v.position.set(3e3,d+130,13e3),v.scale.set(180,180,1),v.userData={blink:!0,rate:.6,duty:.8,dim:!0},t.add(v)}const a=[];{const m=new Mt({color:16054008,side:Gt}),x=[{x:-2132,z:2251,n:5},{x:-4880,z:1040,n:4}],d=ii(5150);for(const g of x)for(let M=0;M<g.n;M++){const v=new Qe,S=new Lt(1.6,.5);S.translate(.8,0,0),S.rotateX(-Math.PI/2);const T=new X(S,m),E=new X(S,m);E.rotation.y=Math.PI,v.add(T,E),v.userData={cx:g.x,cz:g.z,r:30+d()*55,h:14+d()*22,sp:.25+d()*.3,ph:d()*7,wl:T,wr:E},t.add(v),a.push(v)}}const c=new Qe;c.name="balloons";{const m=[14764875,4947425,14787659];for(let x=0;x<3;x++){const d=new Qe,g=new X(new Ut(9,16,12),new $({color:m[x],roughness:.7}));g.scale.y=1.15;const M=new X(new fe(2.4,2,2.4),new $({color:7031338,roughness:.9}));M.position.y=-12,d.add(g,M);const v=x/3*Math.PI*2;d.position.set(Math.cos(v)*1500,420+x*90,Math.sin(v)*1500),d.userData.phase=v,c.add(d)}t.add(c)}const l=[];{const m=new Mt({color:6737151,transparent:!0,opacity:.35,blending:Fr,depthWrite:!1,side:Gt});Vi.forEach((x,d)=>{const g=Math.max(0,Ve(x.x,x.z)),M=new X(new Ue(6,14,700,10,1,!0),m.clone());M.position.set(x.x,g+350,x.z),M.name="pillar-"+d,t.add(M),l.push(M)})}i.add(t);function h(m){const x=l[m];x&&(x.visible=!1)}const f=t.getObjectByName("lightbeams"),u=c.children.map(m=>m.position);function p(m,x,d){for(const M of s.children){const v=M.userData.phase||0;M.position.y=Math.sin(x*.9+v)*.35,M.rotation.z=Math.sin(x*.7+v)*.05,M.rotation.x=Math.cos(x*.6+v)*.04}const g=d?Math.hypot(d.x,d.z):3;for(const M of r)M.rotation.z+=m*(.8+g*.35);for(const M of c.children){M.userData.phase+=m*.008;const v=M.userData.phase;M.position.x=Math.cos(v)*1500+(d?d.x*8:0),M.position.z=Math.sin(v)*1500+(d?d.z*8:0),M.position.y+=Math.sin(x*.3+v*5)*m*2}f&&(f.rotation.y=x*.5),o&&(o.emissiveIntensity=1.3+Math.sin(x*3.1)*.35+Math.sin(x*7.7)*.15);for(const M of a){const v=M.userData,S=x*v.sp+v.ph;M.position.set(v.cx+Math.cos(S)*v.r,v.h+Math.sin(x*.9+v.ph)*2,v.cz+Math.sin(S)*v.r),M.rotation.y=-S;const T=Math.sin(x*9+v.ph)*.55;v.wl.rotation.x=T,v.wr.rotation.x=-T}for(const M of l)M.visible&&(M.material.opacity=.28+Math.sin(x*2+M.position.x)*.12,M.rotation.y+=m*.3)}return{found:h,update:p,balloons:u}}const Ge={enabled:!1,mode:"hidden",stickOn:!1,stickX:0,stickY:0,yaw:0,throttle:0,brakes:!1,run:!1};function hy(){try{if(new URLSearchParams(location.search).has("touch")||matchMedia("(pointer: coarse)").matches||"ontouchstart"in window&&navigator.maxTouchPoints>0)return!0}catch{}return!1}function Pn(i,e,t,n=""){const s=document.createElement(i);return s.className=e,s.innerHTML=n,t.appendChild(s),s}function No(i,{down:e,move:t,up:n}){let s=null;const r=a=>{const c=i.getBoundingClientRect();return{x:a.clientX-c.left,y:a.clientY-c.top,w:c.width,h:c.height}};i.addEventListener("touchstart",a=>{if(a.preventDefault(),s!==null)return;const c=a.changedTouches[0];s=c.identifier,e&&e(r(c),c)},{passive:!1}),i.addEventListener("touchmove",a=>{a.preventDefault();for(const c of a.changedTouches)c.identifier===s&&t&&t(r(c),c)},{passive:!1});const o=a=>{for(const c of a.changedTouches)c.identifier===s&&(s=null,n&&n())};i.addEventListener("touchend",o),i.addEventListener("touchcancel",o)}function uy(i){if(Ge.enabled=hy(),!Ge.enabled)return{setMode(){},isTouch:!1};document.body.classList.add("touch");const e=Pn("div","touch-hidden",document.body);e.id="touch-ui";const t=Pn("div","t-stick",e),n=Pn("div","t-knob",t),s=(E,w)=>{n.style.transform=`translate(${E}px, ${w}px)`};No(t,{down:E=>r(E),move:E=>r(E),up:()=>{Ge.stickOn=!1,Ge.stickX=Ge.stickY=0,s(0,0),i.onStick&&i.onStick(0,0)}});function r(E){const w=Math.max(30,E.w/2-10);let A=E.x-E.w/2,N=E.y-E.h/2;const _=Math.hypot(A,N)||1,y=Math.min(1,_/w);A=A/_*y*w,N=N/_*y*w,s(A,N),Ge.stickOn=!0,Ge.stickX=A/w,Ge.stickY=-N/w,i.onStick&&i.onStick(Ge.stickX,Ge.stickY)}const o=Pn("div","t-thr",e);Pn("div","t-thr-fill",o);const a=Pn("div","t-thr-lab",o,"0%"),c=o.querySelector(".t-thr-fill"),l=(E,w=!0)=>{Ge.throttle=Math.max(0,Math.min(1,E)),c.style.height=`${Ge.throttle*100}%`,w&&(a.textContent=`${Math.round(Ge.throttle*100)}%`)};No(o,{down:E=>l(1-E.y/E.h),move:E=>l(1-E.y/E.h),up:()=>{}});const h=Pn("div","t-rud",e),f=(E,w)=>{const A=Pn("button","t-btn",h,E);return No(A,{down:()=>{Ge.yaw=w},up:()=>{Ge.yaw===w&&(Ge.yaw=0)}}),A};f("◀ RUD",-1),f("RUD ▶",1);const u=Pn("div","t-sys t-sys-fly",e),p=Pn("div","t-sys t-sys-walk",e),m=(E,w,A,N)=>{const _=Pn("button","t-btn",E,w);return N?No(_,{down:()=>{Ge.brakes=!0,_.classList.add("held")},up:()=>{Ge.brakes=!1,_.classList.remove("held")}}):A!=="run"&&_.addEventListener("touchstart",y=>{y.preventDefault(),i.onAction&&i.onAction(A)},{passive:!1}),_};m(u,"⏸","pause"),m(u,"📷","cam"),m(u,"✓","next"),m(u,"FL+","flapUp"),m(u,"FL−","flapDown"),m(u,"GEAR","gear"),m(u,"BRK","brakes",!0),m(u,"🚶","walk"),m(u,"🪂","dive");const x=m(p,"🏃","run");m(p,"⏸","pause"),m(p,"📷","cam"),m(p,"✓","next"),m(p,"E","interact"),m(p,"🚶","walk"),x.addEventListener("touchstart",E=>{E.preventDefault(),Ge.run=!Ge.run,x.classList.toggle("held",Ge.run)},{passive:!1});const d=Pn("div","t-look",e);let g=null,M=0,v=0;d.addEventListener("touchstart",E=>{if(E.preventDefault(),g!==null)return;const w=E.changedTouches[0];g=w.identifier,M=w.clientX,v=w.clientY},{passive:!1}),d.addEventListener("touchmove",E=>{E.preventDefault();for(const w of E.changedTouches)w.identifier===g&&(i.onLook&&i.onLook((w.clientX-M)*1.6,(w.clientY-v)*1.6),M=w.clientX,v=w.clientY)},{passive:!1});const S=E=>{for(const w of E.changedTouches)w.identifier===g&&(g=null)};d.addEventListener("touchend",S),d.addEventListener("touchcancel",S),addEventListener("touchstart",function(){document.body.classList.add("touch")},{once:!0,passive:!0});function T(E){Ge.mode=E,Ge.stickOn=!1,Ge.stickX=Ge.stickY=0,Ge.yaw=0,Ge.brakes=!1,s(0,0),e.className=E==="hidden"?"touch-hidden":"",e.dataset.mode=E,E==="fly"&&i.getThrottle&&l(i.getThrottle()),E!=="walk"&&(Ge.run=!1,x.classList.remove("held"))}return T("hidden"),{setMode:T,isTouch:!0}}function dy(i){const e=new Set,t={pitch:0,roll:0,yaw:0,trim:0,throttle:0,flapIdx:0,gearDown:!0,brakes:!1,locked:!1};let n=!1;addEventListener("keydown",o=>{if(o.repeat){e.add(o.code);return}e.add(o.code),o.code==="KeyF"&&(t.flapIdx=Math.min(3,t.flapIdx+1)),o.code==="KeyV"&&(t.flapIdx=Math.max(0,t.flapIdx-1)),o.code==="KeyG"&&(t.gearDown=!t.gearDown),o.code==="Enter"&&!t.locked&&(n=!0)}),addEventListener("keyup",o=>e.delete(o.code)),addEventListener("wheel",o=>{t.throttle=Hn(t.throttle-Math.sign(o.deltaY)*.05,0,1)},{passive:!0}),document.addEventListener("pointerlockchange",()=>{t.locked=document.pointerLockElement===document.body}),document.addEventListener("mousemove",o=>{if(!t.locked)return;const a=i?.sensitivity??1;t.roll=Hn(t.roll+o.movementX*.0022*a,-1,1),t.pitch=Hn(t.pitch-o.movementY*.0022*a,-1,1)}),document.body.addEventListener("click",()=>{Ge.enabled||((n||!t.locked)&&document.body.requestPointerLock?.(),n=!1)});function s(o){if(n&&(n=!1,!Ge.enabled))try{const l=document.body.requestPointerLock?.();l&&typeof l.catch=="function"&&l.catch(()=>{})}catch{}(e.has("KeyW")||e.has("ShiftLeft"))&&(t.throttle=Hn(t.throttle+o*.5,0,1)),(e.has("KeyS")||e.has("ControlLeft"))&&(t.throttle=Hn(t.throttle-o*.6,0,1)),t.yaw=(e.has("KeyD")?1:0)-(e.has("KeyA")?1:0),e.has("KeyX")&&(t.trim=Hn(t.trim+o*.4,-1,1)),e.has("KeyZ")&&(t.trim=Hn(t.trim-o*.4,-1,1)),e.has("ArrowUp")&&(t.pitch=Hn(t.pitch+o*1.5,-1,1)),e.has("ArrowDown")&&(t.pitch=Hn(t.pitch-o*1.5,-1,1)),e.has("ArrowLeft")&&(t.roll=Hn(t.roll-o*2,-1,1)),e.has("ArrowRight")&&(t.roll=Hn(t.roll+o*2,-1,1)),t.brakes=e.has("KeyB");const a=Math.min(1,o*1.6),c=Math.min(1,o*.25);if(!e.has("ArrowLeft")&&!e.has("ArrowRight")&&(t.roll-=t.roll*a),!e.has("ArrowUp")&&!e.has("ArrowDown")&&(t.pitch-=t.pitch*c),Ge.mode==="fly"){if(t.throttle=Ge.throttle,Ge.stickOn)t.pitch=Ge.stickY,t.roll=Ge.stickX;else{const l=Math.min(1,o*6);t.pitch-=t.pitch*l,t.roll-=t.roll*l}Ge.yaw!==0&&(t.yaw=Ge.yaw),Ge.brakes&&(t.brakes=!0)}return t}const r=o=>{const a=e.has(o);return a&&e.delete(o),a};return{st:t,poll:s,keys:e,consumeReset:()=>r("KeyR"),consumeCam:()=>r("KeyC"),consumeHelp:()=>r("KeyH"),consumePause:()=>r("KeyP"),consumeWalk:()=>r("KeyK"),consumeInteract:()=>r("KeyE"),consumeSkydive:()=>r("KeyJ"),consumeMap:()=>r("KeyM"),consumeTutorialAdvance:()=>r("KeyT")||r("Enter")}}function Hn(i,e,t){return Math.max(e,Math.min(t,i))}function Eu(i,e){if(e===If)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Zc||e===od){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Zc)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class fy extends xs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new _y(t)}),this.register(function(t){return new vy(t)}),this.register(function(t){return new Ry(t)}),this.register(function(t){return new Cy(t)}),this.register(function(t){return new Py(t)}),this.register(function(t){return new My(t)}),this.register(function(t){return new Sy(t)}),this.register(function(t){return new wy(t)}),this.register(function(t){return new by(t)}),this.register(function(t){return new xy(t)}),this.register(function(t){return new Ey(t)}),this.register(function(t){return new yy(t)}),this.register(function(t){return new Ay(t)}),this.register(function(t){return new Ty(t)}),this.register(function(t){return new my(t)}),this.register(function(t){return new Ly(t)}),this.register(function(t){return new Iy(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Nr.extractUrlBase(e);o=Nr.resolveURL(l,this.path)}else o=Nr.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Fl(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Xd){try{o[st.KHR_BINARY_GLTF]=new Dy(e)}catch(f){s&&s(f);return}r=JSON.parse(o[st.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Ky(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const f=this.pluginCallbacks[h](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const f=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(f){case st.KHR_MATERIALS_UNLIT:o[f]=new gy;break;case st.KHR_DRACO_MESH_COMPRESSION:o[f]=new Ny(r,this.dracoLoader);break;case st.KHR_TEXTURE_TRANSFORM:o[f]=new Uy;break;case st.KHR_MESH_QUANTIZATION:o[f]=new Fy;break;default:u.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function py(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const st={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class my{constructor(e){this.parser=e,this.name=st.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new We(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],tn);const f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new kd(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Tv(h),l.distance=f;break;case"spot":l=new zd(h),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,wi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class gy{constructor(){this.name=st.KHR_MATERIALS_UNLIT}getMaterialType(){return Mt}extendParams(e,t,n){const s=[];e.color=new We(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],tn),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,ln))}return Promise.all(s)}}class xy{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class _y{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new we(a,a)}return Promise.all(r)}}class vy{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class yy{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class My{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new We(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],tn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,ln)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class Sy{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class wy{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new We().setRGB(a[0],a[1],a[2],tn),Promise.all(r)}}class by{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Ey{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new We().setRGB(a[0],a[1],a[2],tn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,ln)),Promise.all(r)}}class Ty{constructor(e){this.parser=e,this.name=st.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class Ay{constructor(e){this.parser=e,this.name=st.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ai}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class Ry{constructor(e){this.parser=e,this.name=st.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class Cy{constructor(e){this.parser=e,this.name=st.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Py{constructor(e){this.parser=e,this.name=st.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ly{constructor(e){this.name=st.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,h=s.count,f=s.byteStride,u=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,f,u,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(h*f);return o.decodeGltfBuffer(new Uint8Array(p),h,f,u,s.mode,s.filter),p})})}else return null}}class Iy{constructor(e){this.name=st.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==In.TRIANGLES&&l.mode!==In.TRIANGLE_STRIP&&l.mode!==In.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),f=h.isGroup?h.children:[h],u=l[0].count,p=[];for(const m of f){const x=new Ze,d=new F,g=new hn,M=new F(1,1,1),v=new Qn(m.geometry,m.material,u);for(let S=0;S<u;S++)c.TRANSLATION&&d.fromBufferAttribute(c.TRANSLATION,S),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,S),c.SCALE&&M.fromBufferAttribute(c.SCALE,S),v.setMatrixAt(S,x.compose(d,g,M));for(const S in c)if(S==="_COLOR_0"){const T=c[S];v.instanceColor=new tl(T.array,T.itemSize,T.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&m.geometry.setAttribute(S,c[S]);bt.prototype.copy.call(v,m),this.parser.assignFinalMaterial(v),p.push(v)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const Xd="glTF",Tr=12,Tu={JSON:1313821514,BIN:5130562};class Dy{constructor(e){this.name=st.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Tr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Xd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Tr,r=new DataView(e,Tr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Tu.JSON){const l=new Uint8Array(e,Tr+o,a);this.content=n.decode(l)}else if(c===Tu.BIN){const l=Tr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ny{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=st.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const f=ol[h]||h.toLowerCase();a[f]=o[h]}for(const h in e.attributes){const f=ol[h]||h.toLowerCase();if(o[h]!==void 0){const u=n.accessors[e.attributes[h]],p=qs[u.componentType];l[f]=p.name,c[f]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(f,u){s.decodeDracoFile(h,function(p){for(const m in p.attributes){const x=p.attributes[m],d=c[m];d!==void 0&&(x.normalized=d)}f(p)},a,l,tn,u)})})}}class Uy{constructor(){this.name=st.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Fy{constructor(){this.name=st.KHR_MESH_QUANTIZATION}}class Kd extends Xr{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,f=(n-t)/h,u=f*f,p=u*f,m=e*l,x=m-l,d=-2*p+3*u,g=p-u,M=1-d,v=g-u+f;for(let S=0;S!==a;S++){const T=o[x+S+a],E=o[x+S+c]*h,w=o[m+S+a],A=o[m+S]*h;r[S]=M*T+v*E+d*w+g*A}return r}}const Oy=new hn;class zy extends Kd{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return Oy.fromArray(r).normalize().toArray(r),r}}const In={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},qs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Au={9728:gn,9729:en,9984:ju,9985:zo,9986:Ar,9987:ni},Ru={33071:ti,33648:Yo,10497:ji},rc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ol={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ki={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},ky={CUBICSPLINE:void 0,LINEAR:kr,STEP:zr},oc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function By(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new $({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ri})),i.DefaultMaterial}function rs(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function wi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Hy(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const f=e[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const f=e[l];if(n){const u=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):i.attributes.position;o.push(u)}if(s){const u=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):i.attributes.normal;a.push(u)}if(r){const u=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):i.attributes.color;c.push(u)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],f=l[1],u=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=f),r&&(i.morphAttributes.color=u),i.morphTargetsRelative=!0,i})}function Gy(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Vy(i){let e;const t=i.extensions&&i.extensions[st.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ac(t.attributes):e=i.indices+":"+ac(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+ac(i.targets[n]);return e}function ac(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function al(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Wy(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Xy=new Ze;class Ky{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new py,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Sv(this.options.manager):this.textureLoader=new Rv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Fl(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return rs(r,a,s),wi(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[st.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(Nr.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=rc[s.type],a=qs[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Xt(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=rc[s.type],l=qs[s.componentType],h=l.BYTES_PER_ELEMENT,f=h*c,u=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0;let x,d;if(p&&p!==f){const g=Math.floor(u/p),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count;let v=t.cache.get(M);v||(x=new l(a,g*p,s.count*p/h),v=new Td(x,p/h),t.cache.add(M,v)),d=new Hr(v,c,u%p/h,m)}else a===null?x=new l(s.count*c):x=new l(a,u,s.count*c),d=new Xt(x,c,m);if(s.sparse!==void 0){const g=rc.SCALAR,M=qs[s.sparse.indices.componentType],v=s.sparse.indices.byteOffset||0,S=s.sparse.values.byteOffset||0,T=new M(o[1],v,s.sparse.count*g),E=new l(o[2],S,s.sparse.count*c);a!==null&&(d=new Xt(d.array.slice(),d.itemSize,d.normalized)),d.normalized=!1;for(let w=0,A=T.length;w<A;w++){const N=T[w];if(d.setX(N,E[w*c]),c>=2&&d.setY(N,E[w*c+1]),c>=3&&d.setZ(N,E[w*c+2]),c>=4&&d.setW(N,E[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}d.normalized=m}return d})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const u=(r.samplers||{})[o.sampler]||{};return h.magFilter=Au[u.magFilter]||en,h.minFilter=Au[u.minFilter]||ni,h.wrapS=Ru[u.wrapS]||ji,h.wrapT=Ru[u.wrapT]||ji,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const o=s.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(f){l=!0;const u=new Blob([f],{type:o.mimeType});return c=a.createObjectURL(u),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(f){return new Promise(function(u,p){let m=u;t.isImageBitmapLoader===!0&&(m=function(x){const d=new Wt(x);d.needsUpdate=!0,u(d)}),t.load(Nr.resolveURL(f,r.path),m,void 0,p)})}).then(function(f){return l===!0&&a.revokeObjectURL(c),wi(f,o),f.userData.mimeType=o.mimeType||Wy(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[st.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[st.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[st.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new aa,Xn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Pl,Xn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return $}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[st.KHR_MATERIALS_UNLIT]){const f=s[st.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),l.push(f.extendParams(a,r,t))}else{const f=r.pbrMetallicRoughness||{};if(a.color=new We(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const u=f.baseColorFactor;a.color.setRGB(u[0],u[1],u[2],tn),a.opacity=u[3]}f.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",f.baseColorTexture,ln)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Gt);const h=r.alphaMode||oc.OPAQUE;if(h===oc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===oc.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Mt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new we(1,1),r.normalTexture.scale!==void 0)){const f=r.normalTexture.scale;a.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&o!==Mt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Mt){const f=r.emissiveFactor;a.emissive=new We().setRGB(f[0],f[1],f[2],tn)}return r.emissiveTexture!==void 0&&o!==Mt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,ln)),Promise.all(l).then(function(){const f=new o(a);return r.name&&(f.name=r.name),wi(f,r),t.associations.set(f,{materials:e}),r.extensions&&rs(s,f,r),f})}createUniqueName(e){const t=vt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[st.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Cu(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=Vy(l),f=s[h];if(f)o.push(f.promise);else{let u;l.extensions&&l.extensions[st.KHR_DRACO_MESH_COMPRESSION]?u=r(l):u=Cu(new Ot,l,t),s[h]={primitive:l,promise:u},o.push(u)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?By(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],f=[];for(let p=0,m=h.length;p<m;p++){const x=h[p],d=o[p];let g;const M=l[p];if(d.mode===In.TRIANGLES||d.mode===In.TRIANGLE_STRIP||d.mode===In.TRIANGLE_FAN||d.mode===void 0)g=r.isSkinnedMesh===!0?new b_(x,M):new X(x,M),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),d.mode===In.TRIANGLE_STRIP?g.geometry=Eu(g.geometry,od):d.mode===In.TRIANGLE_FAN&&(g.geometry=Eu(g.geometry,Zc));else if(d.mode===In.LINES)g=new A_(x,M);else if(d.mode===In.LINE_STRIP)g=new oa(x,M);else if(d.mode===In.LINE_LOOP)g=new R_(x,M);else if(d.mode===In.POINTS)g=new Ll(x,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+d.mode);Object.keys(g.geometry.morphAttributes).length>0&&Gy(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),wi(g,r),d.extensions&&rs(s,g,d),t.assignFinalMaterial(g),f.push(g)}for(let p=0,m=f.length;p<m;p++)t.associations.set(f[p],{meshes:e,primitives:p});if(f.length===1)return r.extensions&&rs(s,f[0],r),f[0];const u=new Qe;r.extensions&&rs(s,u,r),t.associations.set(u,{meshes:e});for(let p=0,m=f.length;p<m;p++)u.add(f[p]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new mn(rp.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new El(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),wi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const f=o[l];if(f){a.push(f);const u=new Ze;r!==null&&u.fromArray(r.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Cl(a,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let f=0,u=s.channels.length;f<u;f++){const p=s.channels[f],m=s.samplers[p.sampler],x=p.target,d=x.node,g=s.parameters!==void 0?s.parameters[m.input]:m.input,M=s.parameters!==void 0?s.parameters[m.output]:m.output;x.node!==void 0&&(o.push(this.getDependency("node",d)),a.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",M)),l.push(m),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){const u=f[0],p=f[1],m=f[2],x=f[3],d=f[4],g=[];for(let M=0,v=u.length;M<v;M++){const S=u[M],T=p[M],E=m[M],w=x[M],A=d[M];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();const N=n._createAnimationTracks(S,T,E,w,A);if(N)for(let _=0;_<N.length;_++)g.push(N[_])}return new pv(r,void 0,g)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const h=l[0],f=l[1],u=l[2];u!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(u,Xy)});for(let p=0,m=f.length;p<m;p++)h.add(f[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Rd:l.length>1?h=new Qe:l.length===1?h=l[0]:h=new bt,h!==l[0])for(let f=0,u=l.length;f<u;f++)h.add(l[f]);if(r.name&&(h.userData.name=r.name,h.name=o),wi(h,r),r.extensions&&rs(n,h,r),r.matrix!==void 0){const f=new Ze;f.fromArray(r.matrix),h.applyMatrix4(f)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Qe;n.name&&(r.name=s.createUniqueName(n.name)),wi(r,n),n.extensions&&rs(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,f=c.length;h<f;h++)r.add(c[h]);const l=h=>{const f=new Map;for(const[u,p]of s.associations)(u instanceof Xn||u instanceof Wt)&&f.set(u,p);return h.traverse(u=>{const p=s.associations.get(u);p!=null&&f.set(u,p)}),f};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,c=[];ki[r.path]===ki.weights?e.traverse(function(u){u.morphTargetInfluences&&c.push(u.name?u.name:u.uuid)}):c.push(a);let l;switch(ki[r.path]){case ki.weights:l=tr;break;case ki.rotation:l=nr;break;case ki.position:case ki.scale:l=ir;break;default:switch(n.itemSize){case 1:l=tr;break;case 2:case 3:default:l=ir;break}break}const h=s.interpolation!==void 0?ky[s.interpolation]:kr,f=this._getArrayFromAccessor(n);for(let u=0,p=c.length;u<p;u++){const m=new l(c[u]+"."+ki[r.path],t.array,f,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=al(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof nr?zy:Kd;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function qy(i,e,t){const n=e.attributes,s=new si;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new F(c[0],c[1],c[2]),new F(l[0],l[1],l[2])),a.normalized){const h=al(qs[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new F,c=new F;for(let l=0,h=r.length;l<h;l++){const f=r[l];if(f.POSITION!==void 0){const u=t.json.accessors[f.POSITION],p=u.min,m=u.max;if(p!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(m[2]))),u.normalized){const x=al(qs[u.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new ri;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Cu(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=ol[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return pt.workingColorSpace!==tn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${pt.workingColorSpace}" not supported.`),wi(i,e),qy(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Hy(i,e.targets,t):i})}function Yy(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,0.55)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new un(i)}function $y(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d"),t=e.createRadialGradient(128,128,20,128,128,128);t.addColorStop(0,"rgba(200,200,200,0)"),t.addColorStop(.55,"rgba(210,210,210,0.28)"),t.addColorStop(.85,"rgba(220,220,220,0.5)"),t.addColorStop(1,"rgba(230,230,230,0)"),e.fillStyle=t,e.fillRect(0,0,256,256),e.strokeStyle="rgba(60,60,60,0.35)",e.lineWidth=10;for(let n=0;n<2;n++)e.beginPath(),e.arc(128,128,95,n*Math.PI,n*Math.PI+2.4),e.stroke();return new un(i)}function jy(i){const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");t.clearRect(0,0,512,128),t.fillStyle="#b31b1b",t.font="bold 84px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText(i,256,68);const n=new un(e);return n.anisotropy=4,n}const Zy={wing:"high",tires:"std",body:16054008,accent:11737883,canopy:!1,hopper:!1,reg:"N172FS"};async function Pu(i,e={}){const t={...Zy,...e.look||{}};if(e.useGLB!==!1)try{const q=(await new fy().loadAsync("models/plane.glb")).scene;q.traverse(Q=>{Q.isMesh&&(Q.castShadow=!0)});const ge=Qy(q);return i.add(ge),eM(q)}catch{}const n=new Qe,s=new $({color:t.body,roughness:.32,metalness:.12}),r=new $({color:t.accent,roughness:.38,metalness:.1}),o=new $({color:1842980,roughness:.55,metalness:.3}),a=new $({color:922651,roughness:.06,metalness:.9}),c=new $({color:1381653,roughness:.9}),l=new $({color:10133670,roughness:.35,metalness:.8}),h=(L,q,ge=0,Q=0,he=0)=>{const ye=new X(L,q);return ye.position.set(ge,Q,he),ye.castShadow=!0,n.add(ye),ye},f=new ca;f.moveTo(3.55,-.45),f.quadraticCurveTo(3.75,.1,3.35,.42),f.lineTo(2.1,.52),f.quadraticCurveTo(1.2,1.28,.2,1.3),f.lineTo(-1,1.28),f.quadraticCurveTo(-2.4,1.05,-3.55,.42),f.lineTo(-3.62,-.05),f.quadraticCurveTo(-2,-.62,-.6,-.68),f.lineTo(1.6,-.7),f.quadraticCurveTo(2.9,-.68,3.55,-.45);const u=new Nl(f,{depth:1.35,bevelEnabled:!0,bevelThickness:.18,bevelSize:.18,bevelSegments:3,steps:1});u.rotateY(Math.PI/2),u.translate(-.675,0,0);const p=new X(u,s);p.castShadow=p.receiveShadow=!0,n.add(p);const x=h(new fe(.02,.22,5.6),r,-.86,-.05,.4).clone();x.position.x=.86,n.add(x);const d=jy(t.reg);for(const L of[-1,1]){const q=new X(new Lt(1.9,.48),new Mt({map:d,transparent:!0}));q.position.set(L*.868,.28,1.9),q.rotation.y=L*Math.PI/2,n.add(q)}const g=h(new fe(t.canopy?1.25:1.15,t.canopy?.78:.62,.06),a,0,t.canopy?1.06:1.02,-1.68);g.rotation.x=.8;for(const L of[-1,1]){const q=h(new fe(.06,t.canopy?.68:.55,1.05),a,L*.87,t.canopy?1:.95,-.85);q.rotation.y=-L*.12,t.canopy||h(new fe(.06,.5,.85),a,L*.87,.93,.25)}if(t.hopper){const L=h(new fe(1.15,.75,1),new $({color:10133670,roughness:.6,metalness:.4}),0,1.15,.75);L.castShadow=!0}const M=t.wing==="high"?1.5:-.12,v=s;for(const L of[-1,1]){const q=h(new fe(5.4,.16,1.55),v,L*2.75,M,-.35);q.rotation.z=-L*.035;const ge=h(new fe(.5,.14,1.3),r,L*5.35,M+.1,-.35);if(ge.rotation.z=-L*.035,t.wing==="high"){const Q=h(new Ue(.06,.06,2.6),l,L*1.35,.45,-.25);Q.rotation.z=L*.62}}h(new fe(1.2,.18,1.55),v,0,M+.02,-.35);const S=(L,q,ge,Q,he,ye,_e,C)=>{const b=new fe(L,q,ge);C==="x"&&b.translate(0,0,ge/2),C==="y"&&b.translate(0,0,ge/2);const B=new X(b,Q);return B.position.set(he,ye,_e),B.castShadow=!0,n.add(B),B},T=S(2,.12,.5,r,-4.15,M+.01,.18,"x"),E=S(2,.12,.5,r,4.15,M+.01,.18,"x"),w=S(1.7,.12,.55,v,-1,M,.18,"x"),A=S(1.7,.12,.55,v,1,M,.18,"x");h(new fe(3.5,.13,1.05),v,0,.42,3.15);const N=S(3.3,.11,.5,r,0,.42,3.62,"x");h(new fe(.13,1.75,1.35),r,0,1.15,3.15);const _=S(.11,1.6,.65,s,0,1.12,3.78,"y"),y=new Qe;y.position.set(0,.05,-4.02);const P=new fe(.16,1.1,.07);P.translate(0,.55,0);const I=new X(P,o);I.castShadow=!0;const D=I.clone();D.rotation.z=Math.PI;const O=new X(new Jt(.26,.62,14),r);O.rotation.x=-Math.PI/2,O.position.z=-.1,O.castShadow=!0;const U=new X(new ms(1.02,40),new Mt({map:$y(),transparent:!0,opacity:0,side:Gt,depthWrite:!1}));U.position.z=.02,y.add(I,D,O,U),n.add(y);const V=new Qe,z=t.tires==="tundra",ce=z?.46:.3,le=z?-.8:-.78,be=(L,q,ge)=>{const Q=new X(new Ue(.07,.07,ge),l);if(Q.position.set(L,-ge/2,q),Q.castShadow=!0,L!==0&&(Q.rotation.z=Math.sign(L)*.2),V.add(Q),!z){const ye=new X(new Ut(.34,12,10),s);ye.scale.set(.75,1.05,1.5),ye.position.set(L,-.78,q),ye.castShadow=!0,V.add(ye)}const he=new X(new Ue(ce,ce,z?.3:.2,14),c);he.rotation.z=Math.PI/2,he.position.set(L,le,q+.08),he.castShadow=!0,V.add(he)};be(0,-2.35,.9),be(-.95,-.15,.9),be(.95,-.15,.9),n.add(V);const j=h(new Ue(.09,.11,.5),o,.45,-.75,-2.9);j.rotation.x=Math.PI/2,h(new Ue(.025,.025,.7),l,-3.1,M+.08,-.2).rotation.x=Math.PI/2,h(new Jt(.05,.35,8),o,0,1.48,-.3),h(new Jt(.04,.28,8),o,0,-.85,1.6).rotation.x=Math.PI;const Re=Yy(),K=new Ht(new Ft({map:Re,color:16720418,transparent:!0,depthWrite:!1}));K.position.set(-5.68,M+.1,-.35),K.scale.set(1.2,1.2,1),n.add(K);const ae=K.clone();ae.material=K.material.clone(),ae.material.color.set(2293572),ae.position.x=5.68,n.add(ae);const xe=K.clone();xe.material=K.material.clone(),xe.material.color.set(16777215),xe.position.set(0,.5,3.85),xe.scale.set(.9,.9,1),n.add(xe);const te=new Ht(new Ft({map:Re,color:16777215,transparent:!0,depthWrite:!1}));te.position.copy(K.position),te.scale.set(3.2,3.2,1),n.add(te);const me=te.clone();me.position.copy(ae.position),n.add(me);const Se=new Ht(new Ft({map:Re,color:16724770,transparent:!0,depthWrite:!1}));Se.position.set(0,1.62,-.3),Se.scale.set(2.2,2.2,1),n.add(Se);const De=new Ht(new Ft({map:Re,color:16774872,transparent:!0,depthWrite:!1}));De.position.set(-1.8,M,-1.15),De.scale.set(2.6,2.6,1),n.add(De);const $e=h(new ms(.16,12),new Mt({color:16774872}),-1.8,M,-1.14);$e.rotation.y=Math.PI;const oe=new Qe;return oe.position.set(0,.42,-1.78),n.add(oe),i.add(n),Jy(n,{aileronL:T,aileronR:E,elevator:N,rudder:_,flapL:w,flapR:A,prop:y,blade1:I,blade2:D,blur:U,gear:V,strobeL:te,strobeR:me,beaconT:Se,landGlow:De,landLens:$e,dashAnchor:oe,paintRef:s,accentRef:r})}function Jy(i,e){let t=0;return{root:i,dashAnchor:e.dashAnchor,setPaint(n,s){i.traverse(r=>{!r.isMesh||!r.material||!r.material.color||(r.material===e.paintRef&&r.material.color.setHex(n),r.material===e.accentRef&&r.material.color.setHex(s))})},setState({pos:n,quat:s}){i.position.copy(n),i.quaternion.copy(s)},animate({roll:n,pitch:s,yaw:r,flapFrac:o,gearDown:a,rpm01:c},l,h=0){t+=l*(3+c*95),e.prop.rotation.z=t;const f=Math.min(1,Math.max(0,(c-.25)/.5));e.blur.material.opacity=f*.9,e.blade1.visible=e.blade2.visible=f<.85,e.aileronL.rotation.x=n*.45,e.aileronR.rotation.x=-n*.45,e.elevator.rotation.x=-s*.45,e.rudder.rotation.y=r*.5,e.flapL.rotation.x=e.flapR.rotation.x=o*.65;const u=a?0:-1.05;e.gear.position.y+=(u-e.gear.position.y)*Math.min(1,l*2.2);const p=h%1.1,m=p<.05||p>.12&&p<.17;e.strobeL.material.opacity=e.strobeR.material.opacity=m?1:0,e.strobeL.visible=e.strobeR.visible=m;const d=h%1.4/1.4<.12;e.beaconT.material.opacity=d?1:.05;const g=a?.85:0;e.landGlow.material.opacity=g,e.landLens.material.color.setScalar(a?1:.25)},pilotEye(){return new F(.38,.82,-.95)}}}function Qy(i){const e=new si().setFromObject(i),t=e.getSize(new F),n=e.getCenter(new F),s=Math.max(t.x,t.z),r=s>0?11/s:1;i.scale.multiplyScalar(r),i.position.sub(n.clone().multiplyScalar(r));const o=[];if(i.updateMatrixWorld(!0),i.traverse(c=>{/prop|spinner|nose|engine|cockpit|windshield/i.test(c.name)&&o.push(c.getWorldPosition(new F))}),o.length){const c=new F;for(const h of o)c.add(h);c.divideScalar(o.length);const l=c.sub(n);l.y=0,l.lengthSq()>1e-6&&(i.rotation.y=Math.atan2(l.x,l.z)+Math.PI)}const a=new Qe;return a.add(i),i.userData.fitWrap=a,a}function eM(i){const e=i.userData.fitWrap||i;let t=null;i.traverse(o=>{!t&&/prop/i.test(o.name)&&(t=o)});let n=0,s=null;i.traverse(o=>{!s&&/cockpit|pilot|seat/i.test(o.name)&&(s=o)});const r=new Qe;return r.position.set(0,.4,-1.8),(e===i?i:e).add(r),{root:e===i?i:e,dashAnchor:r,setPaint(){},setState({pos:o,quat:a}){this.root.position.copy(o),this.root.quaternion.copy(a)},animate({rpm01:o},a){n+=a*(3+o*95),t&&(t.rotation.z=n)},pilotEye(){if(s){const o=new F;return s.getWorldPosition(o),this.root.worldToLocal(o)}return new F(.3,1.2,-1)}}}const Rt=i=>document.getElementById(i);function tM(){const i={ias:Rt("h-ias"),alt:Rt("h-alt"),vsi:Rt("h-vsi"),hdg:Rt("h-hdg"),thr:Rt("h-thr"),rpm:Rt("h-rpm"),flap:Rt("h-flap"),gear:Rt("h-gear"),aoa:Rt("h-aoa"),agl:Rt("h-agl"),wind:Rt("h-wind"),cam:Rt("h-cam"),fps:Rt("h-fps"),stall:Rt("w-stall"),gearWarn:Rt("w-gear"),trim:Rt("h-trim"),over:Rt("w-over"),sights:Rt("h-sights"),money:Rt("h-money"),clock:Rt("h-clock"),hint:Rt("hint"),hintText:Rt("hint-text"),horizon:Rt("horizon")},e=i.horizon.getContext("2d");function t(o,a){e.clearRect(0,0,150,150),e.save(),e.beginPath(),e.arc(75,75,70,0,7),e.clip(),e.translate(75,75),e.rotate(-a*Math.PI/180);const u=o*1.6;e.fillStyle="#3a7bd5",e.fillRect(-90,-90+u,180,90-u+90),e.fillStyle="#8a5a2b",e.fillRect(-90,u,180,180),e.strokeStyle="#fff",e.lineWidth=1.5,e.beginPath(),e.moveTo(-90,u),e.lineTo(90,u),e.stroke(),e.font="9px monospace",e.fillStyle="#fff",e.textAlign="center";for(let p=-20;p<=20;p+=10){if(!p)continue;const m=u-p*1.6;e.beginPath(),e.moveTo(-22,m),e.lineTo(22,m),e.stroke(),e.fillText(String(Math.abs(p)),0,m-3)}e.restore(),e.strokeStyle="#ff0",e.lineWidth=3,e.beginPath(),e.moveTo(41,75),e.lineTo(65,75),e.lineTo(75,81),e.lineTo(85,75),e.lineTo(109,75),e.stroke(),e.beginPath(),e.arc(75,75,70,0,7),e.strokeStyle="rgba(255,255,255,.5)",e.lineWidth=2,e.stroke()}let n=performance.now(),s=60;function r(o){i.ias.textContent=Math.round(o.iasKt),i.alt.textContent=Math.round(o.altFt);const a=Math.round(o.vsiFpm/50)*50;i.vsi.textContent=(a>=0?"+":"")+a,i.hdg.textContent=String(Math.round(o.hdgDeg)).padStart(3,"0"),i.thr.textContent=Math.round(o.throttle*100),i.rpm.textContent=Math.round(o.rpm),i.flap.textContent=o.flapDeg,i.gear.textContent=o.gearDown?"DOWN":"UP",i.gear.style.color=o.gearDown?"#7fff5f":"#faa",i.aoa.textContent=o.aoaDeg.toFixed(1),i.agl.textContent=Math.round(o.aglFt),i.wind.textContent=Math.round(o.windKt),i.cam.textContent=o.cam,i.sights&&o.sights&&(i.sights.textContent=o.sights),i.money&&o.money!=null&&(i.money.textContent=o.money),i.clock&&o.clock&&(i.clock.textContent=o.clock),i.trim&&(i.trim.textContent=(o.trim>=0?"+":"")+(o.trim*100).toFixed(0)),i.stall.style.display=o.stalled?"block":"none",i.gearWarn.style.display=!o.gearDown&&o.aglFt<500&&o.vsiFpm<-100?"block":"none",i.over&&(i.over.style.display=o.overspeed?"block":"none",i.over.textContent=o.overspeed||""),i.hint&&(i.hint.style.display=o.hint?"block":"none",o.hint&&(i.hintText.textContent=o.hint)),t(o.pitchDeg,o.rollDeg);const c=performance.now();s+=(1e3/Math.max(1,c-n)-s)*.05,n=c,i.fps.textContent=Math.round(s)}return{update:r}}function ft(i,e=2600){const t=document.getElementById("toast");t.textContent=i,t.style.display="block",clearTimeout(t._h),t._h=setTimeout(()=>t.style.display="none",e)}const nM="audio/sfx/",cc=new Map;function Bl(i){if(cc.has(i))return cc.get(i);try{const e=new Audio(nM+i+".mp3");return e.preload="auto",e.volume=1,cc.set(i,e),e}catch{return null}}function Mn(i,e=.7){const t=Bl(i);if(!t)return null;try{const n=t.cloneNode(!0);return n.volume=e,n.play().catch(()=>{}),n}catch{return null}}let An=null,Cr=null,Ko=null,qo=null,cl=!1,Si=null;function qd(){if(!cl)try{An=new(window.AudioContext||window.webkitAudioContext),Cr=An.createOscillator(),Cr.type="sawtooth",Ko=An.createGain(),Ko.gain.value=0;const i=An.createBiquadFilter();i.type="lowpass",i.frequency.value=900,Cr.connect(i).connect(Ko).connect(An.destination),Cr.start();const e=An.sampleRate*2,t=An.createBuffer(1,e,An.sampleRate),n=t.getChannelData(0);for(let o=0;o<e;o++)n[o]=Math.random()*2-1;const s=An.createBufferSource();s.buffer=t,s.loop=!0;const r=An.createBiquadFilter();r.type="bandpass",r.frequency.value=600,qo=An.createGain(),qo.gain.value=0,s.connect(r).connect(qo).connect(An.destination),s.start(),cl=!0,Si=Bl("stall_warn"),document.addEventListener("click",o=>{o.target.closest('button, .btn, [role="button"]')&&Mn("ui_click",.35)})}catch{}}addEventListener("pointerdown",qd,{once:!1});addEventListener("keydown",qd,{once:!1});setTimeout(()=>{["crash_0","crash_1","crash_2","land_soft","land_hard","splash","step_0","step_1","ui_click","gear","chute_deploy","canopy","stall_warn"].forEach(Bl)},500);function iM(){let i=!1;function e(x,d,g){if(!cl)return;const M=An.currentTime;if(Cr.frequency.setTargetAtTime(45+x*90+(g?8:0),M,.1),Ko.gain.setTargetAtTime(.02+x*.05,M,.1),qo.gain.setTargetAtTime(d*d*.12,M,.2),g&&!i&&Si)try{Si.currentTime=0,Si.loop=!0,Si.volume=.45,Si.play().catch(()=>{}),i=!0}catch{}else!g&&i&&Si&&(Si.pause(),Si.currentTime=0,i=!1)}function t(){const x=Math.floor(Math.random()*5);Mn("crash_"+x,.8)}function n(){Mn("land_hard",.75)}function s(){Mn("land_soft",.5)}function r(){Mn("splash",.7)}function o(){const x=Math.floor(Math.random()*4);Mn("step_"+x,.3)}function a(){Mn("ui_click",.5)}function c(){Mn("ui_select",.55)}function l(){Mn("ui_open",.45)}function h(){Mn("ui_close",.45)}function f(){Mn("ui_confirm",.55)}function u(){Mn("gear",.6)}function p(){Mn("canopy",.7)}function m(){Mn("chute_deploy",.65)}return{update:e,crash:t,landHard:n,landSoft:s,splash:r,step:o,uiClick:a,uiSelect:c,uiOpen:l,uiClose:h,uiConfirm:f,gearToggle:u,canopyOpen:p,chuteDeploy:m}}const Lu={windKt:6,turbulence:1,sensitivity:1,realism:!0,startTOD:"morning",dayLengthMin:12,weather:0};function sM(){try{const i=localStorage.getItem("flightsim-settings");if(i)return{...Lu,...JSON.parse(i)}}catch{}return{...Lu}}function rM(){const i=sM(),e=["home","fly","howto","settings"],t={menu:document.getElementById("menu"),pause:document.getElementById("pause"),help:document.getElementById("help"),instructor:document.getElementById("instructor")};let n=()=>{},s=()=>{};function r(d){for(const g of e)document.getElementById("screen-"+g)?.classList.toggle("active",g===d);t.menu.classList.toggle("hidden",!d)}function o(){t.menu.classList.add("hidden")}document.querySelectorAll("[data-nav]").forEach(d=>d.addEventListener("click",()=>r(d.dataset.nav))),document.getElementById("quit-btn")?.addEventListener("click",()=>{s()}),document.querySelectorAll("[data-fly]").forEach(d=>d.addEventListener("click",()=>{o();try{const g=document.body.requestPointerLock?.();g&&typeof g.catch=="function"&&g.catch(()=>{})}catch{}n(d.dataset.fly)})),document.getElementById("resume-btn")?.addEventListener("click",()=>u(!1)),document.getElementById("pause-restart-btn")?.addEventListener("click",()=>{u(!1),document.dispatchEvent(new CustomEvent("flightsim-restart"))}),document.getElementById("pause-menu-btn")?.addEventListener("click",()=>{u(!1),r("home"),document.exitPointerLock?.()});const a=(d,g,M=Number)=>{const v=document.getElementById(d);if(!v)return;v.value=i[g],v.addEventListener("input",()=>{i[g]=M(v.value);const T=document.getElementById(d+"-val");T&&(T.textContent=v.value+(d==="set-wind"?" kt":d==="set-sens"?"×":""));try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}});const S=document.getElementById(d+"-val");S&&(S.textContent=v.value+(d==="set-wind"?" kt":d==="set-sens"?"×":""))};a("set-wind","windKt"),a("set-sens","sensitivity",Number);const c=document.getElementById("set-turb");c&&(c.value=String(i.turbulence),c.addEventListener("change",()=>{i.turbulence=Number(c.value);try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}));const l=document.getElementById("set-realism");l&&(l.checked=i.realism,l.addEventListener("change",()=>{i.realism=l.checked;try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}));const h=(d,g,M=v=>v)=>{const v=document.getElementById(d);v&&(v.value=String(i[g]),v.addEventListener("change",()=>{i[g]=M(v.value);try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}))};h("set-tod","startTOD"),h("set-daylen","dayLengthMin",Number),h("set-weather","weather",Number);let f=!1;function u(d){f=d,t.pause.classList.toggle("hidden",!d),d&&document.exitPointerLock?.()}function p(d){if(!d){t.instructor.classList.add("hidden");return}t.instructor.classList.remove("hidden"),t.instructor.innerHTML=d}document.getElementById("tut-next")?.addEventListener("click",()=>document.dispatchEvent(new CustomEvent("flightsim-tut-next"))),document.getElementById("tut-skip")?.addEventListener("click",()=>document.dispatchEvent(new CustomEvent("flightsim-tut-skip")));function m(d){t.help.classList.toggle("hidden",!d)}function x(){return!t.help.classList.contains("hidden")}return{settings:i,show:r,hide:o,setPaused:u,isPaused:()=>f,setInstructor:p,setHelpVisible:m,isHelpVisible:x,onFly:d=>n=d,onQuitToMenu:d=>s=d}}function Iu(i,e=0){return Number(i).toFixed(e)}const Uo={takeoff:{title:"Lesson 1 — Takeoff & Climb",steps:[{title:"Set flaps 10°",text:"Real takeoffs use a little flap for extra lift. Press <b>F</b> once (top-left shows FLAP 10°), then press <b>T</b> or click Next.",done:i=>i.advanced||i.flapDeg===10},{title:"Full power",text:"Hold <b>W</b> (or scroll up) until THR reads 100%. The engine needs a second to spool up — watch RPM rise. Keep rolling straight with <b>A / D</b> rudder.",done:i=>i.throttle>.95&&i.rpm>2200},{title:"Rotate at 55 kt",text:"Steer the centerline with rudder. At <b>55 kt (Vr)</b>, ease the mouse upward to lift the nose. Don’t yank — 5° pitch is plenty.",done:i=>!i.onGround&&i.aglFt>20},{title:"Climb at 74 kt (Vy)",text:"Lower the nose slightly and hold <b>74 kt</b> — best climb rate. Add a touch of right rudder: the propeller tries to yaw you left (P-factor). Climb to 500 ft AGL.",done:i=>i.aglFt>500},{title:"Clean up",text:"Above 500 ft: flaps up (<b>V</b> until FLAP 0° — check speed is below 85 kt first!) and ease power to ~75%. Trim with <b>X / Z</b> so she flies hands-off.",done:i=>i.advanced||i.flapDeg===0&&i.aglFt>600},{title:"Gentle turns",text:"Roll into a 20° bank with the mouse, then lead the rollout with opposite stick. Rudder into the turn (adverse yaw). Make one left and one right 90° turn.",done:i=>i.advanced||i.turnsDone>=2},{title:"Lesson complete 🎉",text:"You can take off, climb and turn. Press <b>T</b> to finish — try Lesson 2 (landing) from the menu, or keep free-flying!",done:i=>i.advanced}]},landing:{title:"Lesson 2 — Approach & Landing",steps:[{title:"You’re on final",text:"You’re 3 nm out, lined up with the runway at ~65 kt with full flaps. Your only job: keep the runway threshold steady in the windshield with small pitch/power corrections.",done:i=>i.advanced||i.aglFt<700},{title:"Stabilized: 65 kt, −500 fpm",text:"Aim for <b>65 kt (Vapp)</b> and about <b>−500 fpm</b>. Fast? Reduce power a touch. Slow? Add power — never pull up to stretch the glide (that’s how stalls happen).",done:i=>i.advanced||i.aglFt<400&&i.iasKt>55&&i.iasKt<80},{title:"Flare",text:"At ~30 ft, ease the mouse up to slow the descent — look at the far end of the runway, not the ground. Let the wheels kiss, nosewheel last.",done:i=>i.touchedDown},{title:"Rollout",text:"Power idle (<b>S</b> to 0%), rudder to stay centered, brakes (<b>B</b>) below 40 kt. Lesson complete when you stop on the runway! 🎉",done:i=>i.advanced||i.touchedDown&&i.iasKt<8}]}};function oM(){let i=null,e=0,t=0,n=0,s=0,r=null,o=!1,a=!1;document.addEventListener("flightsim-tut-next",()=>{a=!0}),document.addEventListener("flightsim-tut-skip",()=>{l()});function c(m){return i=Uo[m]?m:null,e=0,t=0,n=0,s=0,r=null,o=!1,a=!1,i}function l(){i=null,e=0}function h(){return!!i}function f(m){if(m.hdgDeg==null||!m.airborne){r=m.hdgDeg;return}if(r==null){r=m.hdgDeg;return}let x=m.hdgDeg-r;x>180&&(x-=360),x<-180&&(x+=360),r=m.hdgDeg;const d=Math.sign(x);d!==0&&d!==n&&Math.abs(s)>60?(t++,s=0,n=d):d!==0&&n!==0&&d!==n?(s=x,n=d):(n===0&&d!==0&&(n=d),s+=x,Math.abs(s)>80&&(t++,s=0))}function u(m){if(!i)return null;m.touchedDown&&(o=!0),f({...m});const x=Uo[i].steps,d={...m,turnsDone:t,touchedDown:o,advanced:a};if(x[e].done(d))if(a=!1,e<x.length-1)e++;else return{finished:!0,lesson:i,step:e,html:p(Uo[i].title,e+1,x.length,"🎉 Lesson complete!","Head to the menu (Esc) for the next lesson, or press R and free-fly.")};const M=x[e];return{finished:!1,lesson:i,step:e,html:p(Uo[i].title,e+1,x.length,M.title,M.text)}}function p(m,x,d,g,M){return`<b>${m} — step ${Iu(x)}/${Iu(d)}</b><br><br>✈️ <b>${g}</b><br>${M}<br><br><span style="opacity:.65">Press <b>T</b> to skip a step · <b>Esc</b> to exit lesson</span>`}return{start:c,stop:l,active:h,update:u}}const Yd=1024,$d=512,Vn="#e8ecf2",Xi="#8a93a3",ll="#ff4444",ta="#39d353",aM="#ffb020";function cM(i){const e=document.createElement("canvas");e.width=Yd,e.height=$d;const t=e.getContext("2d"),n=new un(e);n.anisotropy=4,n.colorSpace=ln;const s=new Qe,r=new X(new fe(1.55,.72,.16),new $({color:1711394,roughness:.85}));s.add(r);const o=new X(new Lt(1.5,.68),new Mt({map:n}));o.position.z=.085,s.add(o);const a=new X(new fe(1.6,.1,.42),new $({color:1053205,roughness:1}));a.position.set(0,.4,.1),s.add(a);const c=new Qe,l=new X(new Ue(.035,.035,.5),new $({color:546,roughness:.6}));l.rotation.x=1.1,l.position.set(0,-.18,.25);const h=new Qe,f=new X(new ha(.14,.025,8,24),new $({color:1118740,roughness:.5})),u=new X(new fe(.26,.04,.03),new $({color:1118740,roughness:.5}));h.add(f,u),h.position.set(0,-.32,.42),c.add(l,h),s.add(c),i.add(s);let p=1;function m(d,g){h.rotation.z=-(d.rollIn||0)*1.1,h.position.y=-.32+(d.pitchIn||0)*.12,p+=g,!(p<.05)&&(p=0,Du(t,d),n.needsUpdate=!0)}Du(t,{}),n.needsUpdate=!0;function x(d){s.removeFromParent(),d.add(s)}return{update:m,mount:x}}const ds=(i,e,t,n)=>{i.beginPath(),i.arc(e,t,n,0,7)};function Bs(i,e,t,n,s){ds(i,e,t,n),i.fillStyle="#0b0d11",i.fill(),ds(i,e,t,n),i.lineWidth=3,i.strokeStyle="#3a4150",i.stroke(),i.fillStyle=Xi,i.font="bold 17px monospace",i.textAlign="center",i.fillText(s,e,t+n-12)}function Fo(i,e,t,n,s,r="#ff5b4d",o=4){const a=(s-90)*Math.PI/180;i.strokeStyle=r,i.lineWidth=o,i.lineCap="round",i.beginPath(),i.moveTo(e,t),i.lineTo(e+Math.cos(a)*n*.88,t+Math.sin(a)*n*.88),i.stroke(),ds(i,e,t,7),i.fillStyle="#22262e",i.fill()}function lc(i,e,t,n,s,r,o,a,c){i.textAlign="center";for(let l=s;l<=r+1e-6;l+=a){const h=hl(l,s,r),f=Math.abs((l-s)/o-Math.round((l-s)/o))<1e-6,u=n*(f?.78:.87),p=n*.95;i.strokeStyle=f?Vn:Xi,i.lineWidth=f?3:1.5,i.beginPath(),i.moveTo(e+Math.cos(h)*u,t+Math.sin(h)*u),i.lineTo(e+Math.cos(h)*p,t+Math.sin(h)*p),i.stroke(),f&&c&&(i.fillStyle=Vn,i.font="bold 16px monospace",i.fillText(c(l),e+Math.cos(h)*n*.58,t+Math.sin(h)*n*.58+6))}}function hl(i,e,t){return(-135+Math.max(0,Math.min(1,(i-e)/(t-e)))*270-90)*Math.PI/180}function Du(i,e){const t=e.iasKt||0,n=e.altFt||0,s=e.vsiFpm||0,r=e.hdgDeg||0,o=e.pitchDeg||0,a=e.rollDeg||0;i.fillStyle="#05070a",i.fillRect(0,0,Yd,$d),Bs(i,105,120,92,"AIRSPEED KT"),lc(i,105,120,92,0,160,20,10,p=>String(p)),Nu(i,105,120,78,50,129,0,160,ta),Nu(i,105,120,78,129,160,0,160,aM),Fo(i,105,120,92,-135+Math.max(0,Math.min(1,t/160))*270),Bs(i,315,120,92,"ATTITUDE"),i.save(),ds(i,315,120,84),i.clip(),i.translate(315,120),i.rotate(-a*Math.PI/180);const c=o*2.2;i.fillStyle="#2f6fd0",i.fillRect(-95,-95+c,190,95-c+95),i.fillStyle="#7a4a22",i.fillRect(-95,c,190,190),i.strokeStyle="#fff",i.lineWidth=2.5,i.beginPath(),i.moveTo(-95,c),i.lineTo(95,c),i.stroke(),i.fillStyle="#fff",i.font="bold 13px monospace",i.textAlign="center";for(let p=-20;p<=20;p+=10){if(!p)continue;const m=c-p*2.2;i.beginPath(),i.moveTo(-20,m),i.lineTo(20,m),i.stroke()}i.restore(),i.strokeStyle="#ffb020",i.lineWidth=5,i.beginPath(),i.moveTo(263,120),i.lineTo(301,120),i.lineTo(315,128),i.lineTo(329,120),i.lineTo(367,120),i.stroke(),Bs(i,525,120,92,"ALT FT"),lc(i,525,120,92,0,10,2,1,p=>String(p));const l=n%1e3/100;Fo(i,525,120,92,-135+l/10*270),Fo(i,525,120,55,-135+n/1e4%1*270,"#e8ecf2",6),i.fillStyle="#0b0d11",i.fillRect(485,168,80,26),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(485,168,80,26),i.fillStyle=Vn,i.font="bold 20px monospace",i.textAlign="center",i.fillText(String(Math.round(n)).padStart(5,"0"),525,189),Bs(i,735,120,92,"TURN");const h=Math.max(-30,Math.min(30,a*.6));i.save(),i.translate(735,120),i.rotate(-h*Math.PI/180),i.fillStyle=Vn,i.fillRect(-46,-6,34,12),i.fillRect(12,-6,34,12),i.restore(),i.fillStyle=Xi,i.font="bold 15px monospace",i.textAlign="center",i.fillText("L",677,124),i.fillText("R",793,124);const f=735+Math.max(-30,Math.min(30,-(e.betaDeg||0)*6));i.strokeStyle=Xi,i.lineWidth=3,i.beginPath(),i.moveTo(701,168),i.lineTo(769,168),i.stroke(),ds(i,f,168,8),i.fillStyle="#111",i.fill(),ds(i,f,168,8),i.strokeStyle=Vn,i.lineWidth=2,i.stroke(),Bs(i,920,120,92,"HEADING"),i.save(),ds(i,920,120,84),i.clip(),i.translate(920,120),i.rotate(r*Math.PI/180),i.fillStyle="#0b0d11",i.fillRect(-90,-90,180,180),i.textAlign="center";for(let p=0;p<360;p+=10){const m=p*Math.PI/180,x=p%30===0;if(i.strokeStyle=x?Vn:Xi,i.lineWidth=x?3:1.5,i.beginPath(),i.moveTo(Math.sin(m)*66,-Math.cos(m)*66),i.lineTo(Math.sin(m)*80,-Math.cos(m)*80),i.stroke(),x){const d={0:"N",90:"E",180:"S",270:"W"};i.fillStyle=Vn,i.font="bold 17px monospace",i.fillText(d[p]??String(p/10),Math.sin(m)*48,-Math.cos(m)*48+6)}}i.restore(),i.fillStyle="#ffb020",i.fillRect(917,28,6,16),Bs(i,105,356,92,"VSI FPM"),lc(i,105,356,92,-2e3,2e3,1e3,500,p=>p===0?"0":String(Math.abs(p)/1e3)+""),Fo(i,105,356,92,-135+(Math.max(-2e3,Math.min(2e3,s))+2e3)/4e3*270),Uu(i,235,320,200,"RPM",(e.rpm||0)/2700,String(Math.round(e.rpm||0))),Uu(i,235,368,200,"THR",e.throttle||0,Math.round((e.throttle||0)*100)+"%"),hc(i,480,320,"STALL",e.stalled?ll:null),hc(i,620,320,e.gearDown?"GEAR DN":"GEAR UP",e.gearDown?ta:ll),hc(i,760,320,"FLAP "+(e.flapDeg??0),(e.flapDeg??0)>0?Vn:null),i.fillStyle=Xi,i.font="bold 15px monospace",i.textAlign="center",i.fillText("TRIM",900,312),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(850,320,100,12);const u=850+((e.trim??0)*.5+.5)*100;i.fillStyle=Vn,i.fillRect(u-3,318,6,16),i.fillStyle=Xi,i.font="15px monospace",i.textAlign="left",i.fillText("Vr55 Vy74 Vfe85 Vapp65 Vno129 Vne163",235,420),i.fillStyle="#5a6373",i.fillText("N172FS · SKYHAWK",235,445)}function Nu(i,e,t,n,s,r,o,a,c){const l=hl(s,o,a)+Math.PI/2,h=hl(r,o,a)+Math.PI/2;i.strokeStyle=c,i.lineWidth=6,i.beginPath(),i.arc(e,t,n,l,h),i.stroke()}function Uu(i,e,t,n,s,r,o){i.fillStyle=Xi,i.font="bold 15px monospace",i.textAlign="left",i.fillText(s,e,t-6),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(e,t,n,16),i.fillStyle=r>.9?ll:ta,i.fillRect(e+2,t+2,(n-4)*Math.max(0,Math.min(1,r)),12),i.fillStyle=Vn,i.textAlign="right",i.fillText(o,e+n+62,t+14)}function hc(i,e,t,n,s){i.fillStyle=s?"#2a0d0d":"#0b0d11",s===ta&&(i.fillStyle="#0d2a14"),s===Vn&&(i.fillStyle="#1a2030"),Fu(i,e-62,t-20,124,40,6),i.fill(),i.strokeStyle=s||"#2a3040",i.lineWidth=2,Fu(i,e-62,t-20,124,40,6),i.stroke(),i.fillStyle=s||"#3a4150",i.font="bold 18px monospace",i.textAlign="center",i.fillText(n,e,t+6)}function Fu(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}const Ou={dawn:6.4,morning:9.5,noon:13,dusk:17.4,night:23.5},lM=new We(10336470),hM=new We(329742),uM=new We(16773853),dM=new We(16751181),fM=new We(9087231);function pM(i,e,t){const n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)}function mM(i,e,t,n,s,r,o,a=[]){const l=new Float32Array(2700);for(let E=0;E<900;E++){const w=Math.random()*Math.PI*2,A=Math.asin(Math.random()*.98+.02),N=6e4;l[E*3]=Math.cos(w)*Math.cos(A)*N,l[E*3+1]=Math.sin(A)*N,l[E*3+2]=Math.sin(w)*Math.cos(A)*N}const h=new Ot;h.setAttribute("position",new Xt(l,3));const f=new aa({color:13621503,size:2.4,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1}),u=new Ll(h,f);u.frustumCulled=!1,i.add(u);const p=new F(0,1,0),m=new F(0,1,0);let x=Ou[o.startTOD]??10,d=1;const g=new We,M=new We;function v(E){const w=Math.max(2,o.dayLengthMin||12);x=(x+E*24/(w*60))%24;const A=(x-6)/12*Math.PI,N=Math.sin(A);p.set(Math.cos(A),Math.max(-.3,N),.35).normalize(),s.sunPosition.value.copy(p),d=pM(-.06,.14,N);const _=Math.max(0,1-Math.abs(N)*4);m.set(-p.x,Math.abs(p.y)+.45,-p.z).normalize();const y=N>-.02?p:m;t.userData.dir=y,t.intensity=N>-.02?.15+d*2.45:.22,N>-.02?M.copy(uM).lerp(dM,Math.min(1,_*1.4)):M.copy(fM),t.color.copy(M),n.intensity=.07+d*.68,g.copy(hM).lerp(lM,d),i.fog.color.copy(g);const P=o.weather||0;i.fog.near=P===2?400:P===1?900:2500,i.fog.far=P===2?9e3:P===1?17e3:3e4,e.toneMappingExposure=.55+d*.2,f.opacity=1-d;const I=d<.4;for(const D of r)D.visible=I;for(const D of a)D.emissiveIntensity=I?1.2:0}const S=()=>String(Math.floor(x)).padStart(2,"0"),T=()=>String(Math.floor(x%1*60)).padStart(2,"0");return{update:v,sunDir:p,reset:()=>{x=Ou[o.startTOD]??10},isNight:()=>d<.45,clock:()=>`${S()}:${T()}`,icon:()=>d<.45?"🌙":d<.75?"🌅":"☀"}}function zu(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function gM(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d");return e.fillStyle="#9cf",e.font="bold 44px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText("Z",32,34),new un(i)}function xM(i){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");t.clearRect(0,0,64,64);const n=32;if(i===3)t.fillStyle="#141414",t.fillRect(14,22,16,10),t.fillRect(34,22,16,10),t.fillRect(28,24,8,4);else{t.fillStyle="#1a1a1a";const r=i===1?3:0;t.beginPath(),t.arc(24-r,26,3.2,0,7),t.fill(),t.beginPath(),t.arc(40+r,26,3.2,0,7),t.fill(),t.fillRect(19-r,18,10,2.5),t.fillRect(35+r,18,10,2.5)}return t.strokeStyle="#5a2e22",t.lineWidth=2.5,t.beginPath(),i===2?t.arc(n,44,6,Math.PI*1.15,Math.PI*1.85):t.arc(n,40,6,Math.PI*.15,Math.PI*.85),t.stroke(),i===1&&(t.fillStyle="rgba(230,120,120,.6)",t.beginPath(),t.arc(18,36,4,0,7),t.fill(),t.beginPath(),t.arc(46,36,4,0,7),t.fill()),new un(e)}const uc=[];function _M(i){return uc[i]||(uc[i]=new Mt({map:xM(i),transparent:!0})),uc[i]}const ku=[15251850,1578e4,13208922,9067066,5913126],Bu=[3828418,12728890,3843669,14203194,9063874,5096130,14711354,15263976,2764083,12745392],Hu=[2764083,3824266,9075290,5921370,4877114,8010298],Gu=[1710618,4861466,9071162,12105912,8007214],dc={};function Pt(i,e){return dc[i]||(dc[i]=e()),dc[i]}const fc=new Map;function yi(i,e=.9){const t=i+":"+e;return fc.has(t)||fc.set(t,new $({color:i,roughness:e})),fc.get(t)}function ul(i={}){const e=i.rand||Math.random,t=i.gender?i.gender==="female":e()<.45,n=i.shirt??Bu[Math.floor(e()*Bu.length)],s=i.pants??Hu[Math.floor(e()*Hu.length)],r=i.skin??ku[Math.floor(e()*ku.length)],o=i.cap??null,a=new Qe,c=new Qe;a.add(c);const l=i.unique?new $({color:n,roughness:.9}):yi(n),h=i.unique?new $({color:s,roughness:.9}):yi(s),f=i.unique?new $({color:r,roughness:.8}):yi(r,.8),u=(te,me)=>{const Se=new X(te,me);return Se.castShadow=!0,c.add(Se),Se},p=i.bodyType??(e()<.3?"thin":e()<.7?"avg":"stocky"),m=t?.23:p==="stocky"?.3:p==="thin"?.24:.27,x=t?p==="thin"?.09:.11:p==="stocky"?.13:.11,d=t?p==="thin"?.15:.17:p==="stocky"?.22:.2,g=.95,M=Pt("uleg",()=>{const te=new Ue(.075,.065,.48,8);return te.translate(0,-.24,0),te}),v=Pt("lleg",()=>{const te=new Ue(.065,.05,.42,8);return te.translate(0,-.21,0),te}),S=Pt("shoe",()=>new fe(.14,.1,.32)),T=yi(1842208,.7);function E(te){const me=new X(M,h);me.castShadow=!0,me.position.set(te,g,0),c.add(me);const Se=new X(v,h);Se.castShadow=!0,Se.position.set(0,-.46,0),me.add(Se);const De=new X(S,T);return De.position.set(0,-.42,.06),De.castShadow=!0,Se.add(De),me}const w=E(-x),A=E(x);if(t&&(i.skirt??e()<.5)){const te=u(Pt("skirt",()=>new Ue(.17,.26,.46,10)),h);te.position.y=.76}const N=Pt(t?"torsoF2":"torsoM2",()=>{const me=t?d*.92:d,Se=d*.82;return new Ue(me,Se,.65,10)}),_=u(N,l);_.position.y=1.3;const y=Pt("belt",()=>new Ue(d*.85,d*.85,.05,10)),P=yi(p==="stocky"?2763306:3811866,.85),I=u(y,P);I.position.y=.98;const D=u(Pt("collar2",()=>new Ue(.09,.12,.1,8)),l);D.position.y=1.63;const O=Pt("uarm",()=>{const te=new Ue(.05,.045,.32,8);return te.translate(0,-.16,0),te}),U=Pt("larm",()=>{const te=new Ue(.045,.035,.3,8);return te.translate(0,-.15,0),te}),V=Pt("hand2",()=>new Ut(.055,8,6));function z(te){const me=new X(O,l);me.castShadow=!0,me.position.set(te,1.55,0),c.add(me);const Se=new X(U,l);Se.castShadow=!0,Se.position.set(0,-.31,0),me.add(Se);const De=new X(V,f);return De.position.y=-.32,De.castShadow=!0,Se.add(De),me}const ce=z(-m),le=z(m),be=u(Pt("neck2",()=>new Ue(.05,.055,.12,8)),f);be.position.y=1.67;const j=u(Pt("head2",()=>new Ut(.14,14,10)),f);j.position.y=1.83;for(const te of[-1,1]){const me=new X(Pt("ear",()=>new Ut(.03,6,5)),f);me.position.set(te*.135,1.83,0),me.scale.set(.6,1,.7),c.add(me)}const Re=new X(new Lt(.2,.2),_M(Math.floor(e()*4)));Re.position.set(0,1.83,.13),c.add(Re);let K=null;const ae=Gu[Math.floor(e()*Gu.length)];if(o!=null){K=i.unique?new $({color:o,roughness:.8}):yi(o,.8);const te=u(Pt("cap2",()=>new Ue(.13,.155,.12,10)),K);te.position.y=1.94,u(Pt("brim2",()=>new fe(.22,.03,.17)),K).position.set(0,1.9,.16)}else{const te=i.hair??(t&&e()<.55?"long":["short","short","afro","bald","buzz","ponytail"][Math.floor(e()*6)]),me=yi(ae,1);if(te==="long")u(Pt("mane2",()=>new fe(.22,.48,.12)),me).position.set(0,1.64,-.12);else if(te==="afro"){const Se=u(Pt("afro2",()=>new Ut(.175,10,8)),me);Se.position.y=1.88}else if(te==="buzz"){const Se=u(Pt("buzz",()=>new Ut(.145,10,8)),me);Se.scale.y=.65,Se.position.y=1.9}else if(te==="ponytail"){const Se=u(Pt("ptop",()=>new Ut(.14,10,8)),me);Se.scale.y=.6,Se.position.y=1.9;const De=u(Pt("ptail",()=>new Ue(.03,.025,.28,6)),me);De.position.set(0,1.72,-.12),De.rotation.x=.4}else if(te!=="bald"){const Se=u(Pt("top2",()=>new Ut(.145,10,8)),me);Se.scale.y=.55,Se.position.y=1.9}}if(!o&&e()<.15){const te=new X(new fe(.22,.04,.02),yi(1118481,.3));te.position.set(0,1.85,.135),c.add(te)}!t&&p!=="thin"&&e()<.12&&u(Pt("bp",()=>new fe(.22,.32,.12)),yi(3820122,.85)).position.set(0,1.35,-.16),a.scale.setScalar(.93+e()*.12);let xe=null;return{group:a,rig:c,armL:ce,armR:le,legL:w,legR:A,head:j,body:_,mats:{shirt:l,pants:h,skin:f,cap:K},walkPhase:Math.random()*7,zzz(){return xe||(xe=new Ht(new Ft({map:gM(),transparent:!0,depthWrite:!1})),xe.scale.set(.8,.8,1),a.add(xe)),xe.visible=!0,xe},hideZzz(){xe&&(xe.visible=!1)}}}function Vu(i,e,t,n,s=6){let o=Math.atan2(e-i.position.x,t-i.position.z)-i.rotation.y;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;return i.rotation.y+=Math.max(-s*n,Math.min(s*n,o)),Math.abs(o)<.2}function vM(i,e){const t=zu(99),n=[],s=(u,p,m,x)=>{const d=zu(x);for(let g=0;g<m;g++){const M=ul({rand:d,cap:d()<.35?3355443:null}),v=u+(d()-.5)*160,S=p+(d()-.5)*160,T=[];for(let E=0;E<5;E++)T.push({x:u+(d()-.5)*260,z:p+(d()-.5)*260});i.add(M.group),n.push({p:M,home:{x:v,z:S},wps:T,wpi:Math.floor(d()*5),idleT:0,sleeping:!1})}};s(-330,860,7,7),s(8500,7500,4,42),s(-7e3,1500,5,5),s(-1200,-5300,2,6),s(2620,2080,2,7);const r=ul({shirt:14182942,pants:3357252,cap:14182942,gender:"female",hair:"long"});i.add(r.group);const o=[],a=[12728890,3828418,14721056];(e||[]).forEach((u,p)=>{if(!u.length)return;const m=new Qe,x=new $({color:a[p%3],roughness:.4,metalness:.3}),d=new $({color:1053980,roughness:.1,metalness:.8}),g=new X(new fe(2,.9,4.2),x);g.position.y=.85,g.castShadow=!0;const M=new X(new fe(1.7,.7,2.2),d);M.position.set(0,1.5,-.2),M.castShadow=!0,m.add(g,M);const v=[],S=new Ue(.42,.42,.35,12),T=new $({color:1315860,roughness:.9});for(const[E,w]of[[-.95,1.4],[.95,1.4],[-.95,-1.4],[.95,-1.4]]){const A=new X(S,T);A.rotation.z=Math.PI/2,A.position.set(E,.42,w),m.add(A),v.push(A)}i.add(m),o.push({g:m,wheels:v,loop:u,seg:Math.floor(t()*u.length),speed:8+t()*3})});function c(u,p,m,x){for(const d of n){const{p:g}=d,M=g.group.position.x,v=g.group.position.z;if(m){const S=d.home.x-M,T=d.home.z-v;if(Math.hypot(S,T)>3?(l(g,d.home.x,d.home.z,u,1.6),d.sleeping=!1,g.hideZzz()):d.sleeping||(d.sleeping=!0),d.sleeping){const E=Ve(M,v);g.group.position.y+=(E+.3-g.group.position.y)*Math.min(1,3*u),g.rig.rotation.x+=(-Math.PI/2-g.rig.rotation.x)*Math.min(1,3*u),g.zzz().position.set(.5,1.2+Math.sin(p*2)*.15,0)}continue}if(d.sleeping=!1,g.hideZzz(),g.rig.rotation.x+=(0-g.rig.rotation.x)*Math.min(1,5*u),d.idleT>0)d.idleT-=u,h(g,p);else{const S=d.wps[d.wpi];l(g,S.x,S.z,u,1.5)&&(d.wpi=(d.wpi+1)%d.wps.length,d.idleT=2+Math.random()*5)}}{const d=Ve(Gi.x,Gi.z);r.group.position.set(Gi.x,d,Gi.z),(x?Math.hypot(x.x-Gi.x,x.z-Gi.z):99)<12?(Vu(r.group,x.x,x.z,u,8),r.armR.rotation.x=-2.4+Math.sin(p*7)*.45,r.armL.rotation.x=Math.sin(p*1.7)*.06):(r.group.rotation.y+=u*.15,h(r,p))}for(const d of o){if(d.taken)continue;if(m){const A=d.loop[0];d.g.position.set(A.x,Ve(A.x,A.z)+.15,A.z);continue}const g=d.loop[d.seg%d.loop.length],M=d.loop[(d.seg+1)%d.loop.length],v=M.x-d.g.position.x,S=M.z-d.g.position.z,T=Math.hypot(v,S);if(T<4){d.seg=(d.seg+1)%d.loop.length;continue}d.g.position.lengthSq()===0&&d.g.position.set(g.x,0,g.z);const E=v/T,w=S/T;d.g.position.x+=E*d.speed*u,d.g.position.z+=w*d.speed*u,d.g.position.y=Ve(d.g.position.x,d.g.position.z)+.15,d.g.rotation.y=Math.atan2(E,w);for(const A of d.wheels)A.rotation.x+=d.speed*u/.42}}function l(u,p,m,x,d){const g=Vu(u.group,p,m,x),M=p-u.group.position.x,v=m-u.group.position.z,S=Math.hypot(M,v),T=g&&S>2;T&&(u.group.position.x+=M/S*d*x,u.group.position.z+=v/S*d*x);const E=Ve(u.group.position.x,u.group.position.z);u.group.position.y+=((E<1?1:E)-u.group.position.y)*Math.min(1,5*x),u.walkPhase+=x*(T?d*3.4:1.2);const w=T?.55:.05;return u.legL.rotation.x=Math.sin(u.walkPhase)*w,u.legR.rotation.x=-Math.sin(u.walkPhase)*w,u.armL.rotation.x=-Math.sin(u.walkPhase)*w*.8,u.armR.rotation.x=Math.sin(u.walkPhase)*w*.8,u.rig.position.y=T?Math.abs(Math.sin(u.walkPhase))*.05:0,S<2.5}function h(u,p){u.legL.rotation.x*=.9,u.legR.rotation.x*=.9,u.armL.rotation.x=Math.sin(p*1.7)*.06,!(u.armR.rotation.x<-1)&&(u.armR.rotation.x=Math.sin(p*1.7+1)*.06,u.rig.position.y=Math.sin(p*2.2)*.015)}function f(u,p,m=7){let x=null,d=m;for(const g of o){if(g.taken)continue;const M=Math.hypot(g.g.position.x-u,g.g.position.z-p);M<d&&(d=M,x=g)}return x}return{update:c,marta:r,cars:o,nearestCar:f,townsfolk:n}}function yM(){const i=new Qe,e=new Qe;i.add(e);const t=(O,U)=>{const V=new X(O,U);return V.castShadow=!0,e.add(V),V},n=new $({color:14711328,roughness:.85}),s=new $({color:2763306,roughness:.7}),r=new $({color:15790320,roughness:.4,metalness:.15}),o=new $({color:1710634,roughness:.1,metalness:.6}),a=new $({color:13935988,roughness:.8}),c=new $({color:2236962,roughness:.8}),l=new Ue(.08,.065,.48,8);l.translate(0,-.24,0);const h=new Ue(.065,.055,.42,8);h.translate(0,-.21,0);const f=new fe(.14,.14,.28);function u(O){const U=new X(l,n);U.castShadow=!0,U.position.set(O,.95,0),e.add(U);const V=new X(h,n);V.castShadow=!0,V.position.set(0,-.46,0),U.add(V);const z=new X(f,c);return z.position.set(0,-.44,.04),z.castShadow=!0,V.add(z),U}const p=u(-.11),m=u(.11),x=t(new Ue(.2,.16,.65,10),n);x.position.y=1.3,t(new fe(.32,.06,.04),s).position.set(0,1.48,.17),t(new fe(.34,.05,.04),s).position.set(0,1.02,.16);const M=t(new ha(.06,.015,6,10),s);M.position.set(0,1.5,-.18),M.rotation.x=Math.PI/2;const v=new Ue(.05,.045,.32,8);v.translate(0,-.16,0);const S=new Ue(.045,.038,.3,8);S.translate(0,-.15,0);const T=new Ut(.055,8,6);function E(O){const U=new X(v,n);U.castShadow=!0,U.position.set(O,1.55,0),e.add(U);const V=new X(S,n);V.castShadow=!0,V.position.set(0,-.31,0),U.add(V);const z=new X(T,a);return z.position.y=-.32,z.castShadow=!0,V.add(z),U}const w=E(-.27),A=E(.27),N=t(new Ue(.05,.055,.12,8),a);N.position.y=1.67;const _=t(new Ut(.14,14,10),a);_.position.y=1.83;const y=t(new Ut(.165,14,10),r);y.position.y=1.86,y.scale.set(1.05,.95,1.05),t(new fe(.24,.08,.06),o).position.set(0,1.82,.14),t(new fe(.18,.03,.12),s).position.set(0,1.74,0);const D=t(new Ue(.035,.035,.02,8),o);return D.position.set(-.32,1.12,.06),D.rotation.x=Math.PI/2,i.scale.setScalar(1),{group:i,rig:e,armL:w,armR:A,legL:p,legR:m,head:_,body:x,mats:{suit:n,helmet:r,skin:a,harness:s}}}function MM(){const i=new Qe,e=new fe(6,.12,3.5);new $({color:14496563,roughness:.8,side:Gt});const t=e.attributes.position,n=new Float32Array(t.count*3),s=[[.9,.2,.15],[.95,.95,.95],[.2,.5,.9]];for(let c=0;c<t.count;c++){const l=t.getX(c),h=Math.floor((l+3)/2)%3;n[c*3]=s[h][0],n[c*3+1]=s[h][1],n[c*3+2]=s[h][2]}e.setAttribute("color",new Xt(n,3));const r=new X(e,new $({vertexColors:!0,roughness:.8,side:Gt}));r.position.y=5,r.castShadow=!0,i.add(r);const o=new Pl({color:8947848}),a=[[-2.8,5,-1.6],[-1.4,5,-1.6],[0,5,-1.6],[1.4,5,-1.6],[2.8,5,-1.6],[-2.8,5,1.6],[-1.4,5,1.6],[0,5,1.6],[1.4,5,1.6],[2.8,5,1.6]];for(const[c,l,h]of a){const f=[new F(c,l,h),new F(0,0,0)],u=new Ot().setFromPoints(f);i.add(new oa(u,o))}return i.visible=!1,{group:i,show(){i.visible=!0},hide(){i.visible=!1},update(c){i.position.copy(c),i.position.y+=5}}}function SM(i,e){const t=ul({shirt:3037756,pants:2764083,cap:15658734,unique:!0});t.group.visible=!1,i.add(t.group);const n=new F;let s=0,r=-.18;const o=new Set;addEventListener("keydown",x=>o.add(x.code)),addEventListener("keyup",x=>o.delete(x.code)),document.addEventListener("mousemove",x=>{document.pointerLockElement!==document.body||!t.group.visible||(s-=x.movementX*.0026,r=Math.max(-.9,Math.min(.45,r-x.movementY*.0022)))});function a(x,d,g,M){n.set(x,d,g),s=M,t.group.visible=!0,u()}function c(){t.group.visible=!1,o.clear()}function l(){return t.group.visible}function h(x,d){s-=x*.0026,r=Math.max(-.9,Math.min(.45,r-d*.0022))}function f(x={}){x.shirt!=null&&t.mats.shirt.color.setHex(x.shirt),x.pants!=null&&t.mats.pants.color.setHex(x.pants),x.cap!=null&&t.mats.cap&&t.mats.cap.color.setHex(x.cap)}function u(x){t.group.position.copy(n),t.group.rotation.y=s+Math.PI}const p=new F;function m(x){if(!t.group.visible)return;const d=(o.has("KeyW")?1:0)-(o.has("KeyS")?1:0),g=(o.has("KeyD")?1:0)-(o.has("KeyA")?1:0),v=o.has("ShiftLeft")||o.has("ShiftRight")?7:4,S=d!==0||g!==0;if(S){const I=Math.sin(s),D=Math.cos(s),O=-I,U=-D,V=D,z=-I;n.x+=(O*d+V*g)*v*x,n.z+=(U*d+z*g)*v*x;const ce=O*d+V*g,le=U*d+z*g;let j=Math.atan2(ce,le)-t.group.rotation.y;for(;j>Math.PI;)j-=Math.PI*2;for(;j<-Math.PI;)j+=Math.PI*2;t.group.rotation.y+=j*Math.min(1,12*x)}const T=Ve(n.x,n.z);n.y+=((T<.5?.5:T)-n.y)*Math.min(1,12*x),t.group.position.copy(n),t.walkPhase+=x*(S?v*2.4:1.2);const E=S?.6:.04,w=t.walkPhase;t.legL.rotation.x=Math.sin(w)*E,t.legR.rotation.x=-Math.sin(w)*E,t.armL.rotation.x=-Math.sin(w)*E*.8,t.armR.rotation.x=Math.sin(w)*E*.8,t.rig.rotation.z=S?Math.sin(w*.5)*.03:0,t.rig.position.y=S?Math.abs(Math.sin(w))*.06:Math.sin(w*.4)*.015,t.head&&(t.head.rotation.x=S?Math.sin(w*2)*.04:0);const A=5.2,N=2.1,_=n.x+Math.sin(s)*Math.cos(r)*A,y=n.z+Math.cos(s)*Math.cos(r)*A,P=Math.max(n.y+1.5+Math.sin(-r)*A*.9,Ve(_,y)+.5);e.position.set(_,P,y),p.set(n.x-_,0,n.z-y),e.lookAt(n.x,n.y+N,n.z)}return{place:a,hide:c,active:l,addLook:h,setOutfit:f,update:m,pos:n,keys:o}}const wM=["marta-hi","marta-job","marta-nice","marta-bye","marta-cash","les-rotate","les-climb","les-flaps","les-final","les-flare","les-stall","atc-takeoff","atc-land","atc-wind","atc-grease","atc-taxi","tower-hello","folk-hi1","folk-hi2","folk-hi3","folk-hi4","shop-hi"];function bM(){try{return localStorage.getItem("flightsim-muted")==="1"}catch{return!1}}const an={muted:bM(),_last:{},_ok:{},toggle(){this.muted=!this.muted;try{localStorage.setItem("flightsim-muted",this.muted?"1":"0")}catch{}return this.muted},play(i,e=0){if(this.muted||!wM.includes(i))return!1;const t=performance.now()/1e3;if(e>0&&t-(this._last[i]||-1e9)<e)return!1;this._last[i]=t;try{const n=new Audio(`audio/${i}.mp3`);return n.volume=.9,n.play().catch(()=>{}),!0}catch{return!1}},playRandom(i,e=20){if(this.muted||!i.length)return!1;const t=performance.now()/1e3;return t-(this._last._rand||-1e9)<e?!1:(this._last._rand=t,this.play(i[Math.floor(Math.random()*i.length)]))}};function bi(i,e){try{return JSON.parse(localStorage.getItem(i))??e}catch{return e}}function Gn(i,e){try{localStorage.setItem(i,JSON.stringify(e))}catch{}}const Ye={money:bi("flightsim-money",100),items:new Set(bi("flightsim-items",[])),paints:bi("flightsim-paints",{}),aircraft:new Set(bi("flightsim-aircraft",["skyhawk"])),selected:bi("flightsim-selected","skyhawk"),outfits:new Set(bi("flightsim-outfits",["aviator"])),outfit:bi("flightsim-outfit","aviator"),add(i){this.money+=i,Gn("flightsim-money",this.money)},spend(i){return this.money<i?!1:(this.money-=i,Gn("flightsim-money",this.money),!0)},has(i){return this.items.has(i)},give(i){this.items.add(i),Gn("flightsim-items",[...this.items])},take(i){this.items.delete(i),Gn("flightsim-items",[...this.items])},setPaint(i,e){this.paints[i]=e,Gn("flightsim-paints",this.paints)},paintFor(i){return this.paints[i]||null},ownAircraft(i){this.aircraft.add(i),Gn("flightsim-aircraft",[...this.aircraft])},selectAircraft(i){this.selected=i,Gn("flightsim-selected",i)},wearOutfit(i){this.outfit=i,Gn("flightsim-outfit",i)},ownOutfit(i){this.outfits.add(i),Gn("flightsim-outfits",[...this.outfits])}},hs=[{id:"skyhawk",name:"✈️ Skyhawk 172",price:0,desc:"Trusty trainer. Balanced, forgiving, yours.",specs:{},look:{wing:"high",tires:"std",body:16054008,accent:11737883,reg:"N172FS"}},{id:"duster",name:"🌾 CropHopper Duster",price:1500,desc:"Light low-wing workhorse. Leaps off short strips, cruises slow.",specs:{mass:720,wingArea:14,thrustMax:4300,CD0:.042,CLflap:.7,Vr:22},look:{wing:"low",tires:"std",hopper:!0,body:15913276,accent:2783786,reg:"N-DUST"}},{id:"falcon",name:"🚀 Falcon S Sport",price:3500,desc:"Fast and twitchy low-wing rocket. Not for beginners.",specs:{mass:800,wingArea:12,thrustMax:7800,CD0:.026,CL0:.2,Vr:30},look:{wing:"low",tires:"std",canopy:!0,body:14212320,accent:12720923,reg:"N-FAST"}},{id:"bush",name:"🏔️ Tundra King",price:2500,desc:"Big tires, huge flaps. Grass strips fear it.",specs:{mass:950,wingArea:17.5,CLflap:.75,CDflap:.11,thrustMax:5600,Vr:20,gearHeight:1.25},look:{wing:"high",tires:"tundra",body:3828538,accent:2236962,reg:"N-BUSH"}}],jd=[{id:"aviator",name:"🧥 Aviator Jacket",price:0,colors:{shirt:3037756,pants:2764083,cap:15658734}},{id:"hawaiian",name:"🌺 Hawaiian Shirt",price:75,colors:{shirt:2005642,pants:12759680,cap:14201434}},{id:"parka",name:"🧣 Alpine Parka",price:120,colors:{shirt:14711328,pants:2767450,cap:12724778}},{id:"tux",name:"🤵 Tuxedo",price:200,colors:{shirt:1315860,pants:1315860,cap:1315860}},{id:"captain",name:"🧑‍✈️ Captain",price:350,colors:{shirt:1714778,pants:15263976,cap:16777215}}];function EM(){return{liftMul:Ye.has("stol")?1.12:1,critBonus:Ye.has("vg")?2*Math.PI/180:0,powerMul:Ye.has("turbo")?1.12:1,rollDecel:Ye.has("tundra")?.12:.3}}const dl=[{id:"binoculars",name:"🔭 Binoculars",price:150,desc:"Hold RIGHT MOUSE to zoom in flight."},{id:"paint-blue",name:"🎨 Ocean Blue paint",price:100,paint:2777026,desc:"Repaint your current plane."},{id:"paint-orange",name:"🎨 Sunset Orange paint",price:100,paint:14711328,desc:"Repaint your current plane."},{id:"paint-black",name:"🎨 Stealth Black paint",price:250,paint:2303531,desc:"Repaint your current plane. Spooky."},{id:"vg",name:"🌀 Vortex Generators",price:350,desc:"+2° stall angle. Forgiving wings."},{id:"stol",name:"🛬 STOL Kit",price:600,desc:"+12% lift. Short strips love it."},{id:"turbo",name:"⚡ Turbocharger",price:800,desc:"+12% engine power."},{id:"tundra",name:"🛞 Tundra Tires",price:250,desc:"Grass strips feel like pavement."},{id:"chute2",name:"🪂 Cruiser Canopy",price:400,desc:"Faster canopy: 14 m/s forward flight. (Chutes are free — this is an upgrade.)"},{id:"chute3",name:"🪂🪂 Speedster Canopy",price:900,desc:"Race canopy: 20 m/s forward, sporty sink. Needs Cruiser."},{id:"spotlight",name:"💡 Landing Light Pro",price:200,desc:"A real spotlight for night ops."}];function Wu(){return Ye.has("chute3")?3:Ye.has("chute2")?2:1}function TM(i={}){const{onPaint:e=()=>{},onAircraft:t=()=>{},onOutfit:n=()=>{}}=i,s=document.getElementById("shop"),r=document.getElementById("shop-items"),o=document.getElementById("shop-money");let a=!1;document.getElementById("shop-close")?.addEventListener("click",()=>p());const c=(m,x,d)=>{const g=document.createElement("button");return g.className="btn",g.textContent=m,g.disabled=!!x,x||(g.onclick=d),g},l=(m,x,d)=>{const g=document.createElement("div");g.className="shop-row",g.innerHTML=`<div><b>${m}</b><br><small>${x}</small></div>`,g.appendChild(d),r.appendChild(g)},h=m=>{const x=document.createElement("div");x.className="shop-sec",x.textContent=m,r.appendChild(x)};function f(){o.textContent="$"+Ye.money,r.innerHTML="",h("✈️ AIRCRAFT — buying or selecting swaps your plane instantly");for(const m of hs){const x=Ye.aircraft.has(m.id),d=Ye.selected===m.id,g=d?' <span class="vtag">FLYING</span>':"";x?l(m.name+g,m.desc,c(d?"FLYING":"SELECT",d,()=>{t(m.id),f()})):l(m.name+g,`${m.desc} — <b>$${m.price}</b>`,c(`BUY $${m.price}`,Ye.money<m.price,()=>{Ye.spend(m.price)&&(Ye.ownAircraft(m.id),t(m.id),f())}))}h("🔧 UPGRADES — apply to every plane you own");for(const m of dl.filter(x=>!x.paint)){const x=Ye.has(m.id),d=m.id==="chute3"&&!Ye.has("chute2");x&&!m.consumable?l(`${m.name} <span class="vtag">OWNED</span>`,m.desc,c("OWNED",!0)):d?l(m.name,`${m.desc} — <b>$${m.price}</b>`,c("NEEDS CRUISER",!0)):l(m.name,`${m.desc} — <b>$${m.price}</b>`,c(`BUY $${m.price}`,Ye.money<m.price,()=>{Ye.spend(m.price)&&(Ye.give(m.id),f())}))}h(`🎨 PAINT — for your ${hs.find(m=>m.id===Ye.selected)?.name||"plane"}`);for(const m of dl.filter(x=>x.paint)){const x=Ye.has(m.id),d=Ye.paintFor(Ye.selected)===m.id;x?l(`${m.name}${d?' <span class="vtag">APPLIED</span>':""}`,m.desc,c(d?"ON":"APPLY",d,()=>{Ye.setPaint(Ye.selected,m.id),e(m.paint),f()})):l(m.name,`${m.desc} — <b>$${m.price}</b>`,c(`BUY $${m.price}`,Ye.money<m.price,()=>{Ye.spend(m.price)&&(Ye.give(m.id),Ye.setPaint(Ye.selected,m.id),e(m.paint),f())}))}h("👕 PILOT OUTFITS — look sharp on foot");for(const m of jd){const x=Ye.outfits.has(m.id),d=Ye.outfit===m.id;x?l(`${m.name}${d?' <span class="vtag">WORN</span>':""}`,"In your closet",c(d?"WORN":"WEAR",d,()=>{Ye.wearOutfit(m.id),n(m.colors),f()})):l(m.name,`Strut around town — <b>$${m.price}</b>`,c(`BUY $${m.price}`,Ye.money<m.price,()=>{Ye.spend(m.price)&&(Ye.ownOutfit(m.id),Ye.wearOutfit(m.id),n(m.colors),f())}))}}function u(m){if(a=!0,document.exitPointerLock?.(),m){const x=document.getElementById("shop-title");x&&(x.textContent=m)}s.classList.remove("hidden"),Ye.money<150?an.play("marta-job"):an.play("shop-hi"),f()}function p(){a=!1,s.classList.add("hidden")}return{open:u,close:p,isOpen:()=>a,refresh:f}}const fl=[{id:"marta",name:"Say hello to Marta",hint:"Walk up to Marta by the hangars (E to talk)",reward:50},{id:"takeoff",name:"First Solo",hint:"Take off from any runway",reward:200},{id:"clouds",name:"Cloud Surfer",hint:"Climb above 3,000 ft",reward:150},{id:"coral",name:"Coral Hopper",hint:"Land on the Coral Strip (SE island)",reward:400},{id:"sights",name:"Sightseer",hint:"Discover 3 sights (follow blue beacons)",reward:300},{id:"grease",name:"Greaser",hint:"Land softer than 150 fpm",reward:350,item:"chute2"},{id:"night",name:"Night Owl",hint:"Be airborne at night",reward:250},{id:"tour",name:"Three-Strip Tour",hint:"Land at all 3 airstrips",reward:800},{id:"balloon",name:"Balloon Chaser",hint:"Fly within 600 ft of a hot-air balloon",reward:300},{id:"far",name:"Long Haul",hint:"Fly 15 km from the home airport",reward:350},{id:"buzz",name:"Rooftop Buzz",hint:"Skim Harborview below 300 ft",reward:250},{id:"nightlanding",name:"Night Landing",hint:"Land after dark",reward:450},{id:"northstrip",name:"Mountain Goat",hint:"Land the lonely North Strip",reward:500},{id:"sights6",name:"Globetrotter",hint:"Discover 6 sights",reward:600},{id:"aerobat",name:"Aerobat",hint:"Bank past 60° in flight",reward:200},{id:"speed",name:"Speed Demon",hint:"Top 140 kt",reward:200},{id:"storm",name:"Storm Chaser",hint:"Fly in storm weather",reward:350},{id:"cartographer",name:"Cartographer",hint:"Discover 10 sights",reward:700},{id:"driver",name:"Sunday Driver",hint:"Drive 1 km around town",reward:250},{id:"dive",name:"Geronimo",hint:"Skydive out and walk away (J)",reward:400}];function AM(){const i=new Set(bi("flightsim-quests",[])),e=new Set(bi("flightsim-strips",[])),t=Object.fromEntries(fl.map(a=>[a.id,a]));let n=()=>{};function s(a){!a||i.has(a.id)||(i.add(a.id),Gn("flightsim-quests",[...i]),Ye.add(a.reward),a.item&&!Ye.has(a.item)&&Ye.give(a.item),n(a))}function r(a,c={}){a==="marta"&&s(t.marta),a==="takeoff"&&s(t.takeoff),a==="alt"&&c.ft>3e3&&s(t.clouds),a==="touchdown"&&c.strip==="coral"&&s(t.coral),a==="sights"&&c.n>=3&&s(t.sights),a==="sights"&&c.n>=6&&s(t.sights6),a==="sights"&&c.n>=10&&s(t.cartographer),a==="balloon"&&s(t.balloon),a==="far"&&s(t.far),a==="buzz"&&s(t.buzz),a==="nightlanding"&&s(t.nightlanding),a==="northstrip"&&s(t.northstrip),a==="aerobat"&&s(t.aerobat),a==="speed"&&s(t.speed),a==="storm"&&s(t.storm),a==="driver"&&s(t.driver),a==="dive"&&s(t.dive),a==="touchdown"&&c.fpm!=null&&-c.fpm<150&&c.airborne&&s(t.grease),a==="nightair"&&s(t.night),a==="touchdown"&&c.strip&&(e.add(c.strip),Gn("flightsim-strips",[...e]),e.has("main")&&e.has("coral")&&e.has("north")&&s(t.tour))}function o(){return fl.find(a=>!i.has(a.id))}return{done:i,notify:r,next:o,onComplete:a=>n=a,strips:e}}function RM(i){const e=document.getElementById("dialogue");let t=!1;document.getElementById("dlg-close")?.addEventListener("click",()=>s());function n(){t=!0,document.exitPointerLock?.(),i.notify("marta"),an.play(i.done.size>3?"marta-nice":"marta-hi");const r=i.next();document.getElementById("dlg-quests").innerHTML=fl.map(o=>`<div class="qrow ${i.done.has(o.id)?"qdone":""}">${i.done.has(o.id)?"✅":"◈"} <b>${o.name}</b> — $${o.reward}${o.item?" + 🎁":""}<br><small>${o.hint}</small></div>`).join(""),document.getElementById("dlg-next").innerHTML=r?`Next up: <b>${r.name}</b> — ${r.hint}`:"You're done, ace! All quests complete. 🏆",e.classList.remove("hidden")}function s(){t=!1,e.classList.add("hidden")}return{open:n,close:()=>{s(),an.play("marta-bye",30)},isOpen:()=>t}}function CM(i){const e=document.getElementById("quest-tracker");e&&(i?(e.classList.remove("hidden"),e.innerHTML=i):e.classList.add("hidden"))}const Bi=18500,Hi=150;function PM(i){return i<.5?[16,60,110]:i<2.5?[118,110,80]:i<45?[46,80,40]:i<150?[30,58,32]:i<260?[74,70,62]:[150,150,155]}function LM(){const i=document.createElement("div");i.id="minimap";const e=document.createElement("canvas");e.width=e.height=180,i.appendChild(e),document.body.appendChild(i);const t=e.getContext("2d"),n=document.createElement("canvas");n.width=n.height=Hi;const s=n.getContext("2d"),r=s.createImageData(Hi,Hi);for(let u=0;u<Hi;u++)for(let p=0;p<Hi;p++){const m=(p+.5)/Hi*2*Bi-Bi,x=(u+.5)/Hi*2*Bi-Bi,[d,g,M]=PM(Ve(m,x)),v=(u*Hi+p)*4;r.data[v]=d,r.data[v+1]=g,r.data[v+2]=M,r.data[v+3]=255}s.putImageData(r,0,0);let o=!1,a=!1;i.addEventListener("click",()=>{o=!o,i.classList.toggle("big",o),e.width=e.height=o?300:180});const c=(u,p,m)=>[(u+Bi)/(2*Bi)*m,(p+Bi)/(2*Bi)*m];let l=1;function h(u,p){if(l+=p,l<.12||a)return;l=0;const m=e.width;t.clearRect(0,0,m,m),t.save(),t.beginPath(),t.arc(m/2,m/2,m/2,0,7),t.clip(),t.drawImage(n,0,0,m,m),t.strokeStyle="#fff",t.lineWidth=o?3:2;const x=(v,S,T,E)=>{const[w,A]=c(v,S-T,m),[N,_]=c(v,S+T,m);t.beginPath(),t.moveTo(w,A),t.lineTo(N,_),t.stroke()};x(0,0,St.halfLen),x(Bt.x,Bt.z,Bt.halfLen),x(Qt.x,Qt.z,Qt.halfLen),x(Kn.x,Kn.z,Kn.halfLen),x(qn.x,qn.z,qn.halfLen),x(Yn.x,Yn.z,Yn.halfLen),x($n.x,$n.z,$n.halfLen),t.fillStyle="#4dff88",t.font=`bold ${o?13:10}px monospace`,t.textAlign="center";for(const v of Vd){const[S,T]=c(v.x,v.z,m);t.fillText("$",S,T+(o?4:3))}Vi.forEach((v,S)=>{const[T,E]=c(v.x,v.z,m),w=u.sightsFound&&u.sightsFound.has(S);t.fillStyle=w?"rgba(160,170,190,.7)":"#ffcf4d",t.beginPath(),t.arc(T,E,o?5:3.5,0,7),t.fill(),w||(t.strokeStyle="rgba(255,207,77,.5)",t.beginPath(),t.arc(T,E,o?9:6.5,0,7),t.stroke())});const[d,g]=c(u.x,u.z,m);t.save(),t.translate(d,g),t.rotate((u.hdgDeg||0)*Math.PI/180),t.fillStyle=u.onFoot?"#7dff9a":"#fff",t.strokeStyle="#000",t.lineWidth=2;const M=o?11:8;t.beginPath(),t.moveTo(0,-M),t.lineTo(M*.7,M*.8),t.lineTo(0,M*.35),t.lineTo(-M*.7,M*.8),t.closePath(),t.fill(),t.stroke(),t.restore(),t.fillStyle="#fff",t.font=`bold ${o?16:12}px monospace`,t.textAlign="center",t.fillText("N",m/2,o?18:14),t.restore(),t.strokeStyle="rgba(140,190,255,.6)",t.lineWidth=3,t.beginPath(),t.arc(m/2,m/2,m/2-1.5,0,7),t.stroke()}function f(u){a=u,i.style.display=u?"none":"block"}return{update:h,setHidden:f,isHidden:()=>a}}const Oo=1400,Ln=130;function IM(i){const e=new Float32Array(Oo*3),t=new Float32Array(Oo);for(let c=0;c<Oo;c++)e[c*3]=(Math.random()-.5)*Ln,e[c*3+1]=Math.random()*Ln,e[c*3+2]=(Math.random()-.5)*Ln,t[c]=28+Math.random()*22;const n=new Ot;n.setAttribute("position",new Xt(e,3));const s=new aa({color:11191517,size:.32,transparent:!0,opacity:.55,depthWrite:!1}),r=new Ll(n,s);r.frustumCulled=!1,r.visible=!1,i.add(r);function o(c,l,h,f,u=!1){e[c*3]=l+(Math.random()-.5)*Ln,e[c*3+1]=u?h+Ln/2:h+(Math.random()-.5)*Ln,e[c*3+2]=f+(Math.random()-.5)*Ln}function a(c,l,h){if(!h){r.visible=!1;return}r.visible=!0,s.opacity=h===2?.7:.45;const f=l.x,u=l.y,p=l.z,m=h===2?1.5:1;for(let x=0;x<Oo;x++){let d=e[x*3+1]-t[x]*m*c;d<u-Ln/2?o(x,f,u,p,!0):(Math.abs(e[x*3]-f)>Ln&&(e[x*3]=f+(Math.random()-.5)*Ln),Math.abs(e[x*3+2]-p)>Ln&&(e[x*3+2]=p+(Math.random()-.5)*Ln),e[x*3+1]=d)}n.attributes.position.needsUpdate=!0}return{update:a}}class DM extends Mv{constructor(e){super(e),this.type=Ti}parse(e){const o=function(A,N){switch(A){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(N||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(N||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(N||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(N||""))}},h=`
`,f=function(A,N,_){N=N||1024;let P=A.pos,I=-1,D=0,O="",U=String.fromCharCode.apply(null,new Uint16Array(A.subarray(P,P+128)));for(;0>(I=U.indexOf(h))&&D<N&&P<A.byteLength;)O+=U,D+=U.length,P+=128,U+=String.fromCharCode.apply(null,new Uint16Array(A.subarray(P,P+128)));return-1<I?(A.pos+=D+I+1,O+U.slice(0,I)):!1},u=function(A){const N=/^#\?(\S+)/,_=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,y=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,P=/^\s*FORMAT=(\S+)\s*$/,I=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,D={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let O,U;for((A.pos>=A.byteLength||!(O=f(A)))&&o(1,"no header found"),(U=O.match(N))||o(3,"bad initial token"),D.valid|=1,D.programtype=U[1],D.string+=O+`
`;O=f(A),O!==!1;){if(D.string+=O+`
`,O.charAt(0)==="#"){D.comments+=O+`
`;continue}if((U=O.match(_))&&(D.gamma=parseFloat(U[1])),(U=O.match(y))&&(D.exposure=parseFloat(U[1])),(U=O.match(P))&&(D.valid|=2,D.format=U[1]),(U=O.match(I))&&(D.valid|=4,D.height=parseInt(U[1],10),D.width=parseInt(U[2],10)),D.valid&2&&D.valid&4)break}return D.valid&2||o(3,"missing format specifier"),D.valid&4||o(3,"missing image size specifier"),D},p=function(A,N,_){const y=N;if(y<8||y>32767||A[0]!==2||A[1]!==2||A[2]&128)return new Uint8Array(A);y!==(A[2]<<8|A[3])&&o(3,"wrong scanline width");const P=new Uint8Array(4*N*_);P.length||o(4,"unable to allocate buffer space");let I=0,D=0;const O=4*y,U=new Uint8Array(4),V=new Uint8Array(O);let z=_;for(;z>0&&D<A.byteLength;){D+4>A.byteLength&&o(1),U[0]=A[D++],U[1]=A[D++],U[2]=A[D++],U[3]=A[D++],(U[0]!=2||U[1]!=2||(U[2]<<8|U[3])!=y)&&o(3,"bad rgbe scanline format");let ce=0,le;for(;ce<O&&D<A.byteLength;){le=A[D++];const j=le>128;if(j&&(le-=128),(le===0||ce+le>O)&&o(3,"bad scanline data"),j){const Re=A[D++];for(let K=0;K<le;K++)V[ce++]=Re}else V.set(A.subarray(D,D+le),ce),ce+=le,D+=le}const be=y;for(let j=0;j<be;j++){let Re=0;P[I]=V[j+Re],Re+=y,P[I+1]=V[j+Re],Re+=y,P[I+2]=V[j+Re],Re+=y,P[I+3]=V[j+Re],I+=4}z--}return P},m=function(A,N,_,y){const P=A[N+3],I=Math.pow(2,P-128)/255;_[y+0]=A[N+0]*I,_[y+1]=A[N+1]*I,_[y+2]=A[N+2]*I,_[y+3]=1},x=function(A,N,_,y){const P=A[N+3],I=Math.pow(2,P-128)/255;_[y+0]=so.toHalfFloat(Math.min(A[N+0]*I,65504)),_[y+1]=so.toHalfFloat(Math.min(A[N+1]*I,65504)),_[y+2]=so.toHalfFloat(Math.min(A[N+2]*I,65504)),_[y+3]=so.toHalfFloat(1)},d=new Uint8Array(e);d.pos=0;const g=u(d),M=g.width,v=g.height,S=p(d.subarray(d.pos),M,v);let T,E,w;switch(this.type){case Sn:w=S.length/4;const A=new Float32Array(w*4);for(let _=0;_<w;_++)m(S,_*4,A,_*4);T=A,E=Sn;break;case Ti:w=S.length/4;const N=new Uint16Array(w*4);for(let _=0;_<w;_++)x(S,_*4,N,_*4);T=N,E=Ti;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:M,height:v,data:T,header:g.string,gamma:g.gamma,exposure:g.exposure,type:E}}setDataType(e){return this.type=e,this}load(e,t,n,s){function r(o,a){switch(o.type){case Sn:case Ti:o.colorSpace=tn,o.minFilter=en,o.magFilter=en,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,r,n,s)}}(async()=>{const n=(k,re,de)=>Math.max(re,Math.min(de,k)),s=document.getElementById("app"),r=new M_({antialias:!0});r.setSize(innerWidth,innerHeight),r.setPixelRatio(Math.min(devicePixelRatio,2)),r.shadowMap.enabled=!0,r.shadowMap.type=Ku,r.toneMapping=Yu,r.toneMappingExposure=.75,s.appendChild(r.domElement);const o=new S_,a=new mn(60,innerWidth/innerHeight,.3,15e4),{sunLight:c,hemi:l,skyUni:h,update:f,sightFound:u,balloons:p,nightGlows:m,nightMats:x,roadLoops:d}=ey(o);new DM().load("hdri/sky_1k.hdr",k=>{try{const re=new Qc(r);o.environment=re.fromEquirectangular(k).texture,"environmentIntensity"in o&&(o.environmentIntensity=.5),k.dispose(),re.dispose()}catch{}}),addEventListener("resize",()=>{a.aspect=innerWidth/innerHeight,a.updateProjectionMatrix(),r.setSize(innerWidth,innerHeight)});const g=new Set;try{for(const k of JSON.parse(localStorage.getItem("flightsim-sights")||"[]"))Vi[k]&&(g.add(k),u(k))}catch{}let M=0,v=!0;function S(){Vi.forEach((k,re)=>{if(!g.has(re)&&Math.hypot(j.x-k.x,j.z-k.z)<k.r){g.add(re),u(re);try{localStorage.setItem("flightsim-sights",JSON.stringify([...g]))}catch{}ft(`📍 Discovered: ${k.name} — ${k.blurb} (${g.size}/${Vi.length})`,4200)}})}const T=rM(),E=oM();let w="free",A=!1;const N=mM(o,r,c,l,h,m,T.settings,x),_=vM(o,d),y=SM(o,a),P=AM(),I=RM(P);function D(k){const re=k===2303531;J.setPaint(re?k:16054008,re?987411:k)}function O(){const k=hs.find(de=>de.id===Ye.selected)||hs[0],re=dl.find(de=>de.id===Ye.paintFor(k.id));re?.paint?D(re.paint):J.setPaint(k.look.body,k.look.accent)}async function U(k,re=!1){const de=hs.find(ct=>ct.id===k);!de||!Ye.aircraft.has(k)||(Mu(de.specs),Ye.selectAircraft(k),o.remove(J.root),J=await Pu(o,{look:de.look,useGLB:k==="skyhawk"}),ue.mount(J.dashAnchor),J.root.add(ce),J.root.add(le),ce.position.set(-1.8,de.look.wing==="high"?1.5:-.02,-1.1),le.position.set(-1.8,-30,-220),O(),J.setState({pos:j,quat:K}),re||ft(`✈️ Now flying: ${de.name}`))}const V=TM({onPaint:k=>D(k),onAircraft:k=>U(k),onOutfit:k=>y.setOutfit(k)});P.onComplete(k=>{ft(`✅ Quest complete: ${k.name} (+$${k.reward})${k.item?" + 🎁 gift!":""}`,4200),an.play("marta-cash",15),z()});function z(){const k=P.next();CM(k?`◈ ${k.name} <small>${k.hint}</small>`:"🏆 All quests complete!")}z();{const k=document.getElementById("mute-btn"),re=()=>{k&&(k.firstChild.textContent=an.muted?"🔇 ":"🔊 ")};re(),k?.addEventListener("click",()=>{an.toggle(),re()})}const ce=new zd(16774872,0,900,.32,.5,1.2),le=new bt;let be=!1;addEventListener("contextmenu",k=>k.preventDefault()),addEventListener("mousedown",k=>{k.button===2&&(be=!0)}),addEventListener("mouseup",k=>{k.button===2&&(be=!1)});const j=new F,Re=new F,K=new hn,ae=new F;let xe=0,te=!1,me=!1,Se=!1,De="",$e=0;const oe=["CHASE","COCKPIT","TOWER"],L=new F(45,St.elev+14,St.halfLen+120),q=dy(T.settings);function ge(k){k==="final"?(j.set(0,St.elev+305,-6156),K.setFromAxisAngle(new F(0,1,0),Math.PI),Re.set(0,-2.5,33),q.st.throttle=.3,q.st.flapIdx=3,q.st.gearDown=!0,q.st.trim=.1):(j.set(0,St.elev+xt.gearHeight+.02,480),Re.set(0,0,0),K.identity(),q.st.throttle=0,q.st.pitch=0,q.st.roll=0,q.st.flapIdx=0,q.st.gearDown=!0,q.st.trim=0),xe=q.st.throttle,ae.set(0,0,0),te=k==="final",me=!1,Se=!1,De=""}function Q(){pe(),Te(),ge(w==="landing"?"final":"runway")}function he(){$e=($e+1)%3,ft("Camera: "+oe[$e])}function ye(){A?C?je():y.pos.distanceTo(j)<9?(A=!1,y.hide(),Dt(),ft("Back in the cockpit — have fun!")):ft("Too far from the plane — walk back to it (K)"):v&&Re.length()<3?(A=!0,q.st.throttle=0,y.place(j.x+4,j.y,j.z+2,Math.atan2(Ee.x,Ee.z)+Math.PI),Dt(),ft("On foot — WASD / stick to walk · E shop/talk · K back to plane",3600)):ft("Slow down and stop on the ground first!")}function _e(){if(C){je();return}const k=_.nearestCar(y.pos.x,y.pos.z);if(k){Ie(k);return}let re=null,de=12;for(const qe of Vd){const Je=Math.hypot(y.pos.x-qe.x,y.pos.z-qe.z);Je<de&&(de=Je,re=qe)}const ct=Math.hypot(y.pos.x-Gi.x,y.pos.z-Gi.z);re?V.open(re.name):ct<8?I.openMarta():ft("Nothing to interact with here — find a car, a shop or Marta")}let C=null,b=0,B=0,ie=0;const ee=yM();ee.group.visible=!1,o.add(ee.group);const ne=MM();o.add(ne.group);const se={active:!1,vel:new F,hx:0,hz:-1,deployed:!1,hint:""};function ve(){if(se.active||A||me)return;const k=Ve(j.x,j.z);if(!te||j.y-k<60){ft("Too low to jump! Climb first.");return}se.active=!0,se.deployed=!1,se.vel.copy(Re);const re=Math.hypot(Ee.x,Ee.z)||1;se.hx=Ee.x/re,se.hz=Ee.z/re,ee.group.position.copy(j),ee.group.visible=!0,ne.hide(),ft(`GERONIMO! ${["","STOCK CANOPY","CRUISER CANOPY","SPEEDSTER CANOPY"][Wu()]} — opens at 400 ft, steer with the mouse.`,3600)}function Te(){se.active=!1,ee.group.visible=!1,ne.hide()}function Ke(k){const re=ee.group.position,de=Ve(re.x,re.z),ct=re.y-de,qe=Wu(),Je=[-5.5,-6.5,-8][qe-1],$t=[9,14,20][qe-1];!se.deployed&&ct<122&&se.vel.y<0&&(se.deployed=!0,se.vel.multiplyScalar(.25),Xe.canopyOpen(),ne.show(),ft("🪂 CANOPY OUT — steer to a landing!",3e3));const lt=se.deployed?Je:-52;se.vel.y+=(lt-se.vel.y)*Math.min(1,(se.deployed?1.6:.8)*k);const yt=se.deployed?$t:12,vn=-se.hz,Nt=se.hx,yn=se.hx*(se.pitch||0)*yt+vn*(se.roll||0)*yt+Rn.x*.3,At=se.hz*(se.pitch||0)*yt+Nt*(se.roll||0)*yt+Rn.z*.3;se.vel.x+=(yn-se.vel.x)*Math.min(1,2*k),se.vel.z+=(At-se.vel.z)*Math.min(1,2*k),re.x+=se.vel.x*k,re.y+=se.vel.y*k,re.z+=se.vel.z*k;const dn=se.deployed?.15:1.25;if(ee.armL.rotation.z=dn,ee.armR.rotation.z=-dn,ee.legL.rotation.z=dn*.3,ee.legR.rotation.z=-dn*.3,ee.armL.rotation.x=ee.armR.rotation.x=0,ee.group.rotation.y=Math.atan2(se.hx,se.hz),se.deployed&&(ne.group.position.set(re.x,re.y+5,re.z),ne.group.visible=!0),re.y<=de+.2){if(de<.5||!se.deployed&&se.vel.y<-15){Te(),Xe.splash(),ft(de<.5?"💦 Splashdown! Back in the plane (R).":"💥 Too fast, too low! (R)",3600),Q();return}Te(),A=!0,q.st.throttle=0,Xe.landSoft(),y.place(re.x,re.y,re.z,Math.atan2(se.hx,se.hz)),Dt(),P.notify("dive"),ft("🦶 Touchdown! That was epic. Walk it off.",3600);return}se.hint=se.deployed?`Canopy out — steer to landing (${Math.round(ct*3.28084)} ft)`:`FREEFALL — canopy at 400 ft (${Math.round(ct*3.28084)} ft)`,at.set(re.x-se.hx*11,re.y+4,re.z-se.hz*11),Fn.lerp(at,1-Math.pow(.001,k)),On.set(re.x+se.hx*8,re.y,re.z+se.hz*8),a.position.copy(Fn),a.lookAt(On)}function pe(){C&&(C.taken=!1),C=null,b=0}function Ie(k){C=k,k.taken=!0,b=0,B=k.g.rotation.y,y.hide(),ft("Driving! WASD steer · E/K hop out",3e3)}function je(){if(!C)return;const k=C.g.position;C.taken=!1;let re=0,de=1e9;C.loop.forEach((ct,qe)=>{const Je=Math.hypot(ct.x-k.x,ct.z-k.z);Je<de&&(de=Je,re=qe)}),C.seg=re,y.place(k.x+2.5,k.y,k.z,B),C=null,b=0}const ke=new F;function Ne(k){const re=Ge.mode==="walk"&&Ge.stickOn,de=q.keys.has("KeyW")||re&&Ge.stickY>.25,ct=q.keys.has("KeyS")||re&&Ge.stickY<-.25,qe=q.keys.has("KeyA")||re&&Ge.stickX<-.25,Je=q.keys.has("KeyD")||re&&Ge.stickX>.25,$t=q.keys.has("ShiftLeft")||q.keys.has("ShiftRight")||Ge.run;de&&(b+=9*k),ct&&(b-=(b>1?14:7)*k),b-=b*.6*k,b=n(b,-7,$t?34:26);const lt=((qe?1:0)-(Je?1:0))*n(1.5/(1+Math.abs(b)*.09),.35,1.5);B+=lt*k*Math.sign(b)*Math.min(1,Math.abs(b)/3);const yt=C.g.position;ke.set(Math.sin(B),0,Math.cos(B)),yt.x+=ke.x*b*k,yt.z+=ke.z*b*k;const vn=Ve(yt.x,yt.z);yt.y=vn<0?.4:vn+.15,vn<0&&(b*=Math.max(0,1-2*k)),C.g.rotation.y=B;for(const Nt of C.wheels)Nt.rotation.x+=b*k/.42;ie+=Math.abs(b)*k,ie>1e3&&P.notify("driver"),at.copy(yt).addScaledVector(ke,-10).add(Ce.set(0,4.2,0)),Fn.lerp(at,1-Math.pow(.001,k)),On.copy(yt).addScaledVector(ke,9),a.position.copy(Fn),a.lookAt(On)}const it=tM(),Xe=iM(),ht=LM(),H=IM(o),Pe=hs.find(k=>k.id===Ye.selected&&Ye.aircraft.has(k.id))||hs[0];Mu(Pe.specs);let J=await Pu(o,{look:Pe.look,useGLB:Pe.id==="skyhawk"});const ue=cM(J.dashAnchor);J.root.add(ce),ce.position.set(-1.8,Pe.look.wing==="high"?1.5:-.02,-1.1),le.position.set(-1.8,-30,-220),J.root.add(le),ce.target=le,O();{const k=jd.find(re=>re.id===Ye.outfit);k&&y.setOutfit(k.colors)}ge("runway"),J.setState({pos:j,quat:K}),T.show("home"),T.onFly(k=>{w=k,A=!1,y.hide(),N.reset(),Q(),Dt(),T.setHelpVisible(!1),k==="takeoff"?(E.start("takeoff"),ft("Lesson 1: follow the instructor (bottom). Press H for controls.")):k==="landing"?(E.start("landing"),an.play("atc-land"),ft("Lesson 2: you are on final — fly 65 kt to the threshold.")):(E.stop(),T.setInstructor(null),an.play("atc-wind"),ft("Full throttle (W), rotate at 55 kt — good luck!"))}),T.onQuitToMenu(()=>{E.stop(),T.setInstructor(null),A=!1,y.hide(),pe(),ge("runway"),J.setState({pos:j,quat:K}),Dt()}),document.addEventListener("flightsim-restart",()=>{A=!1,y.hide(),Q(),Dt(),ft("Flight restarted")}),document.addEventListener("flightsim-tut-skip",()=>{E.stop(),T.setInstructor(null)});const Ee=new F,Ce=new F,rt=new F,at=new F,nn=new F,et=new F,sn=new hn,ot=new _n,Fn=new F(0,30,520),On=new F,Rn=new F;document.addEventListener("pointerlockchange",()=>{const k=document.pointerLockElement===document.body,re=!document.getElementById("menu").classList.contains("hidden");if(!k&&!re&&!T.isPaused()){if(typeof V<"u"&&(V.isOpen()||I.isOpen()))return;Zi&&T.setPaused(!0)}});let Zi=!1;function Kr(k,re){return(Math.abs(Ve(k+6,re)-Ve(k-6,re))+Math.abs(Ve(k,re+6)-Ve(k,re-6)))/(2*6)}function qr(k,re){const de=(T.settings.windKt||0)*.514444,ct=Math.sin(k*.23)*de*.25+Math.sin(k*1.1)*de*.08;re.set(Math.sin(k*.17)*1,0,de+ct);const qe=Vv(k,T.settings.turbulence);return qe&&(re.x+=qe.x,re.y+=qe.y,re.z+=qe.z),{out:re,g:qe}}function _s(k,re){const de=q.poll(k);if(q.consumeReset()&&(Q(),ft(w==="landing"?"Reset on final approach":"Reset on Runway 36")),q.consumeCam()&&he(),q.consumeHelp()&&T.setHelpVisible(!T.isHelpVisible()),q.consumePause()&&T.setPaused(!T.isPaused()),q.consumeTutorialAdvance()&&E.active()&&document.dispatchEvent(new CustomEvent("flightsim-tut-next")),q.consumeMap()&&ht.setHidden(!ht.isHidden()),q.consumeSkydive()&&ve(),se.active){se.pitch=de.pitch,se.roll=de.roll,de.pitch=0,de.roll=0,de.yaw=0,de.brakes=!1,Ke(k);const zt=Math.max(0,ee.group.position.y-Ve(ee.group.position.x,ee.group.position.z));it.update({iasKt:se.vel.length()*1.94384,altFt:ee.group.position.y*3.28084,vsiFpm:se.vel.y*196.85,hdgDeg:0,throttle:0,rpm:0,flapDeg:0,gearDown:!0,trim:0,aoaDeg:0,aglFt:zt*3.28084,windKt:Rn.length()*1.94384,cam:"DIVE",pitchDeg:0,rollDeg:0,stalled:!1,overspeed:"",hint:se.hint,sights:`${g.size}/${Vi.length}`,money:"$"+Ye.money,clock:N.icon()+" "+N.clock()}),Xe.update(0,0,!1);return}q.consumeWalk()&&ye();const ct=Ve(j.x,j.z),qe=j.y-xt.gearHeight-ct,Je=qe<=.02;xe+=(de.throttle-xe)*Math.min(1,k*1.4),Ee.set(0,0,-1).applyQuaternion(K),Ce.set(0,1,0).applyQuaternion(K),rt.set(1,0,0).applyQuaternion(K),sn.copy(K).invert();const{out:$t,g:lt}=qr(re,Rn);at.copy(Re).sub($t),nn.copy(at).applyQuaternion(sn);const yt=Wv(de.flapIdx),vn=Math.max(0,j.y),Nt=EM(),yn=Ge.enabled;yn&&(Nt.critBonus+=3*Math.PI/180);const At=kv(nn,de.throttle,yt,de.gearDown,vn,Nt);et.set(0,0,0);const dn=At.V;if(dn>.5){at.copy(Re).sub($t).normalize();let zt=At.drag,bn=At.lift;if(qe<xt.wingSpan&&qe>-2){const Zn=1-n(qe/xt.wingSpan,0,1);bn*=1+.1*Zn,zt*=1-.25*Zn}et.addScaledVector(at,-zt);const jn=Ce.dot(at),Ji=Ce.clone().addScaledVector(at,-jn).normalize();et.addScaledVector(Ji,bn),et.addScaledVector(rt,-At.beta*At.q*xt.wingArea*.9)}et.addScaledVector(Ee,Bv(xe,dn,vn,Nt.powerMul)),et.y-=xt.mass*9.81,me&&et.multiplyScalar(.05),Re.addScaledVector(et,k/xt.mass),j.addScaledVector(Re,k);const ui=.35+.65*(n(At.q/150,0,1)*(me?.2:1)),Yr=n(de.pitch+de.trim*.6,-1,1);ot.setFromQuaternion(K,"YXZ");const Hl=Je?.3:1;let fa=Yr*1.4*ui,Gl=(-de.yaw*.9-At.beta*1.1*Hl+de.roll*(yn?-.5:.28))*ui,lr=(-de.roll*(yn?2:2.4)+n(-ot.z*(yn?.9:.5),yn?-.6:-.35,yn?.6:.35))*ui;const Vl=T.settings.realism?yn?.35:1:.25,Wl=Hv(xe,dn,At.alpha);Gl+=Wl.yawRate*ui*Hl*Vl,lr-=Wl.rollRate*ui*(Je?.4:Vl),lt&&(lr+=lt.roll*ui),At.stalled&&(lr+=Math.sin(re*13)*(yn?.4:.9),fa+=-.9*ui),At.stalled&&!Y&&te&&an.play("les-stall",90),Y=At.stalled,Ge.mode==="fly"&&!Ge.stickOn&&!Je&&!me&&!At.stalled&&(fa+=n(-ot.x*1.8,-.9,.9)*ui,lr+=n(-ot.z*1.5,-.9,.9)*ui);const Xl=At.stalled?1.6:2.6;ae.x+=(fa-ae.x)*Math.min(1,Xl*k),ae.y+=(Gl-ae.y)*Math.min(1,2.2*k),ae.z+=(lr-ae.z)*Math.min(1,Xl*k);const Kl=ae.length();if(Kl>1e-6){const zt=new hn().setFromAxisAngle(at.set(ae.x,ae.y,ae.z).normalize(),Kl*k);K.multiply(zt).normalize()}ot.setFromQuaternion(K,"YXZ"),ot.x=n(ot.x,-1.2,1.2);const di=Ve(j.x,j.z),ql=j.y-xt.gearHeight;let Yl=!1;if(ql<=di){j.y=di+xt.gearHeight;const zt=Re.y,bn=Math.abs(Ee.dot(Re));if(te&&(Yl=!0),(!Je||!te)&&te){const dr=zt*196.85,$r=Math.abs(ot.z),Zl=Math.abs(j.x)<80&&Math.abs(j.z)<St.halfLen+120?"main":Math.abs(j.x-Bt.x)<170&&Math.abs(j.z-Bt.z)<Bt.halfLen+120?"coral":Math.abs(j.x-Qt.x)<170&&Math.abs(j.z-Qt.z)<Qt.halfLen+120?"north":Math.abs(j.x-Kn.x)<120&&Math.abs(j.z-Kn.z)<Kn.halfLen+100?"harborview":Math.abs(j.x-qn.x)<130&&Math.abs(j.z-qn.z)<qn.halfLen+100?"seabreeze":Math.abs(j.x-Yn.x)<140&&Math.abs(j.z-Yn.z)<Yn.halfLen+100?"city":Math.abs(j.x-$n.x)<110&&Math.abs(j.z-$n.z)<$n.halfLen+100?"lighthouse":null,Jl=Kr(j.x,j.z)>.28,Ql=Ge.enabled,Qd=Ql?-11:-8,ef=Ql?.6:.45;if(zt<Qd||$r>ef||Jl)me=!0,q.st.throttle=0,ut(j),Xe.crash(),ft(Jl?"💥 Into the mountainside — press R":`💥 CRASHED (${Math.round(-dr)} fpm) — press R`);else{const Jn=-dr;Jn<=60?ft("🧈 GREASED IT! A+  — textbook touchdown"):Jn<=120?ft(`🥇 Excellent landing (${Math.round(Jn)} fpm) — A`):Jn<=200?ft(`🥈 Good landing (${Math.round(Jn)} fpm) — B`):Jn<=300?ft(`🥉 Acceptable (${Math.round(Jn)} fpm) — C`):Jn<=400?ft(`✓ Nice landing (${Math.round(Jn)} fpm)`):ft(`Hard landing (${Math.round(Jn)} fpm) — flare earlier next time`),an.play("atc-grease"),P.notify("touchdown",{strip:Zl,fpm:dr,airborne:!0}),N.isNight()&&P.notify("nightlanding"),Zl==="north"&&P.notify("northstrip")}}zt<0&&(Re.y=0);const jn=Re.x,Ji=Re.z,Zn=Math.hypot(jn,Ji);if(Zn>.01){const dr=de.brakes?4.5:Nt.rollDecel,$r=Math.min(Zn,dr*k);Re.x-=jn/Zn*$r,Re.z-=Ji/Zn*$r}const Zd=de.yaw*n(bn/12,0,1)*1.4,Jd=new hn().setFromAxisAngle(Ce,-Zd*k);K.premultiply(Jd).normalize(),ot.setFromQuaternion(K,"YXZ"),bn>xt.Vr&&Yr>.1?(ot.x=n(ot.x,-.05,.22),ot.z=n(ot.z,-.1,.1),K.setFromEuler(ot)):(ot.x+=(0-ot.x)*Math.min(1,6*k),ot.z+=(0-ot.z)*Math.min(1,6*k),K.setFromEuler(ot),ae.multiplyScalar(Math.max(0,1-8*k)));const ga=dn*1.94384,jl=Math.round(xt.Vr*1.94384);Je&&de.throttle<.2&&(Z=!1,W=!1),Je&&!W&&ga>8&&de.throttle>.5&&(W=!0,an.play("atc-taxi")),Je&&!Z&&ga>20&&de.throttle>.9&&(Z=!0,an.play("atc-takeoff")),!Se&&ga>=jl&&de.throttle>.8&&(Se=!0,ft(`Rotate! (Vr ${jl} kt)`)),te=!1}else j.y-di>5&&!te&&(te=!0,P.notify("takeoff")),j.y*3.28084>3e3&&P.notify("alt",{ft:j.y*3.28084}),te&&N.isNight()&&P.notify("nightair"),j.y<.3&&di<-2&&(me||(me=!0,q.st.throttle=0,ut(j),Xe.splash(),ft("💥 Ditched in the ocean — press R")),me&&(j.y=.3,Re.multiplyScalar(.9)));j.y<di+.5&&!(ql<=di)&&(me||(me=!0,q.st.throttle=0,ut(j),Xe.crash(),ft("💥 Terrain strike — press R"))),J.setState({pos:j,quat:K}),J.animate({roll:de.roll,pitch:Yr,yaw:de.yaw,flapFrac:yt,gearDown:de.gearDown,rpm01:xe},k,re);const pa=c.userData.dir||N.sunDir;if(c.position.set(j.x+pa.x*2800,j.y+Math.max(400,pa.y*2800),j.z+pa.z*2800),c.target.position.copy(j),ce.intensity=Ye.has("spotlight")&&(N.isNight()||Je)?900:0,$e===0)at.set(0,3.4,10.5).applyQuaternion(K).add(j),Fn.lerp(at,1-Math.pow(1e-4,k)),On.copy(j).addScaledVector(Ee,12),a.position.copy(Fn),a.lookAt(On);else if($e===1){const zt=J.pilotEye().applyQuaternion(K).add(j);a.position.copy(zt),On.copy(zt).addScaledVector(Ee,50),a.lookAt(On),a.rotation.z+=-de.roll*.06,Fn.copy(a.position)}else a.position.lerp(L,1-Math.pow(.01,k)),a.lookAt(j),Fn.copy(a.position);const $l=be&&Ye.has("binoculars")?16:60;Math.abs(a.fov-$l)>.2&&(a.fov+=($l-a.fov)*Math.min(1,8*k),a.updateProjectionMatrix());const ma=Gv(dn,yt);let fi="";ma.includes("vne")?fi="⚠ VNE — REDUCE SPEED":ma.includes("vno")?fi="CAUTION: ABOVE Vno (129 kt)":ma.includes("flap-overspeed")&&(fi="⚠ FLAP OVERSPEED (Vfe 85 kt)"),fi&&fi!==De&&(ft(fi),De=fi),fi||(De=""),ot.setFromQuaternion(K,"YXZ");const hr=(ot.y*-180/Math.PI%360+360)%360,ys=dn*1.94384;let ur="";if(!E.active()&&!me&&(Je&&de.throttle<.5&&ys<10?ur="Hold W for full takeoff power":Je&&ys<xt.Vr*1.94384?ur=`Accelerating… rotate at ${Math.round(xt.Vr*1.94384)} kt`:Je?ur="ROTATE — ease the mouse UP ⬆":At.stalled&&(ur="STALL — push mouse DOWN, full power!")),it.update({iasKt:ys,altFt:j.y*3.28084,vsiFpm:Re.y*196.85,hdgDeg:hr===0&&Ee.z<0?0:hr,throttle:de.throttle,rpm:700+xe*2e3,flapDeg:Ur[de.flapIdx],gearDown:de.gearDown,trim:de.trim,aoaDeg:At.alpha*180/Math.PI,aglFt:Math.max(0,j.y-xt.gearHeight-di)*3.28084,windKt:$t.length()*1.94384,cam:oe[$e],pitchDeg:ot.x*180/Math.PI,rollDeg:-ot.z*180/Math.PI,stalled:At.stalled,overspeed:fi,hint:ur,sights:`${g.size}/${Vi.length}`,money:"$"+Ye.money,clock:N.icon()+" "+N.clock()}),Xe.update(xe,n(dn/70,0,1),At.stalled),hi.copy($t),v=Je,M++%30===0&&!me&&(S(),P.notify("sights",{n:g.size}),te)){for(const bn of p){const jn=j.x-bn.x,Ji=j.y-bn.y,Zn=j.z-bn.z;if(jn*jn+Ji*Ji+Zn*Zn<200*200){P.notify("balloon");break}}Math.hypot(j.x,j.z)>15e3&&P.notify("far"),Math.abs(ot.z)>60*Math.PI/180&&P.notify("aerobat"),ys>140&&P.notify("speed"),(T.settings.weather||0)===2&&P.notify("storm"),Math.hypot(j.x+330,j.z-860)<400&&(j.y-xt.gearHeight-di)*3.28084<300&&P.notify("buzz")}if(Yt.iasKt=ys,Yt.altFt=j.y*3.28084,Yt.vsiFpm=Re.y*196.85,Yt.hdgDeg=hr,Yt.pitchDeg=ot.x*180/Math.PI,Yt.rollDeg=-ot.z*180/Math.PI,Yt.betaDeg=At.beta*180/Math.PI,Yt.rpm=700+xe*2e3,Yt.throttle=de.throttle,Yt.flapDeg=Ur[de.flapIdx],Yt.gearDown=de.gearDown,Yt.stalled=At.stalled,Yt.trim=de.trim,Yt.pitchIn=Yr,Yt.rollIn=de.roll,E.active()||(G=""),E.active()){const zt=E.update({iasKt:ys,aglFt:Math.max(0,j.y-xt.gearHeight-di)*3.28084,throttle:de.throttle,rpm:700+xe*2e3,flapDeg:Ur[de.flapIdx],onGround:Je,airborne:te,hdgDeg:hr,touchedDown:Yl,crashed:me});if(zt){T.setInstructor(zt.html);const bn=zt.lesson+":"+zt.step;if(bn!==G){G=bn;const jn=R[bn];jn&&an.play(jn)}zt.finished&&(E.stop(),setTimeout(()=>T.setInstructor(null),8e3))}}ht.update({x:j.x,z:j.z,hdgDeg:hr,sightsFound:g,onFoot:!1},k)}let cr=performance.now()/1e3,li=0,wn=0;const hi=new F(-2,0,1.5),Yt={};let vs=.6,Li=0;const R={"takeoff:2":"les-rotate","takeoff:3":"les-climb","takeoff:4":"les-flaps","landing:0":"les-final","landing:2":"les-flare"};let G="",Y=!1,Z=!1,W=!1,Me=0;function Le(k,re){const de=document.createElement("canvas");de.width=de.height=64;const ct=de.getContext("2d"),qe=ct.createRadialGradient(32,32,2,32,32,32);return qe.addColorStop(0,k),qe.addColorStop(.5,re),qe.addColorStop(1,"rgba(0,0,0,0)"),ct.fillStyle=qe,ct.fillRect(0,0,64,64),new un(de)}const Fe=Le("rgba(255,240,180,1)","rgba(255,90,10,0.7)"),ze=Le("rgba(80,80,85,0.85)","rgba(40,40,45,0.4)"),Be=new Ht(new Ft({map:Fe,transparent:!0,depthWrite:!1,blending:Fr})),He=new Ht(new Ft({map:ze,transparent:!0,depthWrite:!1}));Be.visible=He.visible=!1,o.add(Be,He);let Oe=1e9;function ut(k){Be.position.copy(k),He.position.copy(k),Be.visible=He.visible=!0,Oe=0,Li=1}function gt(k){if(Oe>12){Be.visible=He.visible=!1;return}Oe+=k;const re=Math.min(1,Oe/9);Be.scale.setScalar(5+Oe*2.5),Be.material.opacity=1-re,He.position.y+=k*3.5,He.scale.setScalar(7+Oe*4),He.material.opacity=.85*(1-re),Li=Math.max(0,Li-k*.45)}const Tt=uy({getThrottle:()=>q.st.throttle,onLook:(k,re)=>y.addLook(k,re),onAction:k=>{switch(k){case"flapUp":q.st.flapIdx=Math.min(3,q.st.flapIdx+1);break;case"flapDown":q.st.flapIdx=Math.max(0,q.st.flapIdx-1);break;case"gear":q.st.gearDown=!q.st.gearDown,Xe.gearToggle(),ft(q.st.gearDown?"Gear DOWN":"Gear UP");break;case"cam":he();break;case"pause":T.setPaused(!0);break;case"walk":ye();break;case"dive":ve();break;case"interact":A&&_e();break;case"next":document.dispatchEvent(new CustomEvent("flightsim-tut-next"));break}}});function Dt(){Tt.setMode(document.getElementById("menu").classList.contains("hidden")?A?"walk":"fly":"hidden")}function dt(){requestAnimationFrame(dt);const k=performance.now()/1e3;let re=Math.min(.1,k-cr);cr=k;const de=!document.getElementById("menu").classList.contains("hidden");de||(Zi=!0);const ct=V.isOpen()||I.isOpen();if(de)vs+=re*.11,a.position.set(j.x+Math.cos(vs)*16,j.y+4.5+Math.sin(vs*.6)*1.2,j.z+Math.sin(vs)*16),a.lookAt(j.x,j.y+.8,j.z),N.update(re),f(re,wn,hi,j),_.update(re,wn,N.isNight(),j),gt(re);else if(!T.isPaused()&&Zi&&!ct)if(N.update(re),A){if(q.keys.has("KeyP")&&(q.keys.delete("KeyP"),T.setPaused(!T.isPaused())),q.keys.has("KeyH")&&(q.keys.delete("KeyH"),T.setHelpVisible(!T.isHelpVisible())),q.consumeMap()&&ht.setHidden(!ht.isHidden()),Xe.update(0,0,!1),q.consumeWalk()&&ye(),q.consumeInteract()&&_e(),q.consumeReset()&&(Q(),A=!1,y.hide(),Dt()),Ge.mode==="walk"&&!C){const Je=Ge.stickOn?Ge.stickX:0,$t=Ge.stickOn?Ge.stickY:0,lt=(yt,vn)=>{vn?y.keys.add(yt):y.keys.delete(yt)};lt("KeyW",$t>.25),lt("KeyS",$t<-.25),lt("KeyD",Je>.25),lt("KeyA",Je<-.25),lt("ShiftLeft",Ge.run)}C?Ne(re):y.update(re),y.active()?(y._stepT||(y._stepT=0),y._stepT+=re,y._stepT>.35&&(y._stepT=0,Xe.step())):y._stepT=0,J.animate({roll:0,pitch:0,yaw:0,flapFrac:0,gearDown:!0,rpm01:0},re,wn);const qe=C?C.g.position:y.pos;f(re,wn,hi,qe),_.update(re,wn,N.isNight(),qe),Me+=re,Me>1.5&&(Me=0,_.townsfolk.some($t=>Math.hypot($t.p.group.position.x-qe.x,$t.p.group.position.z-qe.z)<9)&&an.playRandom(["folk-hi1","folk-hi2","folk-hi3","folk-hi4"],25),Math.hypot(qe.x-Zt.x,qe.z-Zt.z)<18&&an.play("tower-hello",120)),c.position.set(qe.x+1400,1600,qe.z+700),c.target.position.copy(qe),it.update({iasKt:C?Math.abs(b)*1.94384:0,altFt:qe.y*3.28084,vsiFpm:0,hdgDeg:0,throttle:0,rpm:0,flapDeg:0,gearDown:!0,trim:0,aoaDeg:0,aglFt:0,windKt:hi.length()*1.94384,cam:C?"DRIVE":"FOOT",pitchDeg:0,rollDeg:0,stalled:!1,overspeed:"",hint:C?`🚗 ${Math.round(Math.abs(b)*3.6)} km/h — E/K hop out`:"WASD walk · E drive/shop/talk · K plane",sights:`${g.size}/${Vi.length}`,money:"$"+Ye.money,clock:N.icon()+" "+N.clock()}),ht.update({x:qe.x,z:qe.z,hdgDeg:0,sightsFound:g,onFoot:!0},re),gt(re)}else{li+=re;const qe=1/120;let Je=0;for(;li>=qe&&Je<40;)_s(qe,wn),wn+=qe,li-=qe,Je++;f(re,wn,hi,j),_.update(re,wn,N.isNight(),j),ue.update(Yt,re),gt(re),Li>.01&&(a.position.x+=(Math.random()-.5)*Li*.7,a.position.y+=(Math.random()-.5)*Li*.7)}else li=0,f(re,wn,hi,j),gt(re);H.update(re,a.position,T.settings.weather||0),r.render(o,a)}dt()})();
