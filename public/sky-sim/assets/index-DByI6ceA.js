(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xl="169",ep=0,Ih=1,tp=2,Td=1,Ad=2,bi=3,Ii=0,gn=1,tn=2,es=0,er=1,Zr=2,Dh=3,Nh=4,np=5,ms=100,ip=101,sp=102,rp=103,op=104,ap=200,cp=201,lp=202,hp=203,Vc=204,Gc=205,up=206,dp=207,fp=208,pp=209,mp=210,gp=211,_p=212,xp=213,vp=214,Wc=0,Xc=1,qc=2,lr=3,Kc=4,Yc=5,$c=6,jc=7,Rd=0,yp=1,Mp=2,ts=0,Sp=1,wp=2,Ep=3,Cd=4,bp=5,Tp=6,Ap=7,Uh="attached",Rp="detached",Pd=300,hr=301,ur=302,Zc=303,Jc=304,Aa=306,is=1e3,hi=1001,ma=1002,mn=1003,Ld=1004,kr=1005,$t=1006,sa=1007,ui=1008,Di=1009,Id=1010,Dd=1011,Jr=1012,ql=1013,vs=1014,wn=1015,Pi=1016,Kl=1017,Yl=1018,dr=1020,Nd=35902,Ud=1021,Fd=1022,Wn=1023,Od=1024,Bd=1025,tr=1026,fr=1027,$l=1028,jl=1029,zd=1030,Zl=1031,Jl=1033,ra=33776,oa=33777,aa=33778,ca=33779,Qc=35840,el=35841,tl=35842,nl=35843,il=36196,sl=37492,rl=37496,ol=37808,al=37809,cl=37810,ll=37811,hl=37812,ul=37813,dl=37814,fl=37815,pl=37816,ml=37817,gl=37818,_l=37819,xl=37820,vl=37821,la=36492,yl=36494,Ml=36495,kd=36283,Sl=36284,wl=36285,El=36286,Qr=2300,eo=2301,ka=2302,Fh=2400,Oh=2401,Bh=2402,Cp=2500,Pp=0,Hd=1,bl=2,Lp=3200,Ip=3201,Vd=0,Dp=1,Yi="",cn="srgb",Zt="srgb-linear",Ql="display-p3",Ra="display-p3-linear",ga="linear",Et="srgb",_a="rec709",xa="p3",As=7680,zh=519,Np=512,Up=513,Fp=514,Gd=515,Op=516,Bp=517,zp=518,kp=519,Tl=35044,kh="300 es",Li=2e3,va=2001;class Mr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hh=1234567;const Xr=Math.PI/180,pr=180/Math.PI;function Xn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[t&63|128]+nn[t>>8&255]+"-"+nn[t>>16&255]+nn[t>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function zt(i,e,t){return Math.max(e,Math.min(t,i))}function eh(i,e){return(i%e+e)%e}function Hp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Vp(i,e,t){return i!==e?(t-i)/(e-i):0}function qr(i,e,t){return(1-t)*i+t*e}function Gp(i,e,t,n){return qr(i,e,1-Math.exp(-t*n))}function Wp(i,e=1){return e-Math.abs(eh(i,e*2)-e)}function Xp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function qp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Kp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Yp(i,e){return i+Math.random()*(e-i)}function $p(i){return i*(.5-Math.random())}function jp(i){i!==void 0&&(Hh=i);let e=Hh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Zp(i){return i*Xr}function Jp(i){return i*pr}function Qp(i){return(i&i-1)===0&&i!==0}function em(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function tm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function nm(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),f=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),m=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*f,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*f,a*l);break;case"ZXZ":i.set(c*f,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ti(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ft(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const im={DEG2RAD:Xr,RAD2DEG:pr,generateUUID:Xn,clamp:zt,euclideanModulo:eh,mapLinear:Hp,inverseLerp:Vp,lerp:qr,damp:Gp,pingpong:Wp,smoothstep:Xp,smootherstep:qp,randInt:Kp,randFloat:Yp,randFloatSpread:$p,seededRandom:jp,degToRad:Zp,radToDeg:Jp,isPowerOfTwo:Qp,ceilPowerOfTwo:em,floorPowerOfTwo:tm,setQuaternionFromProperEuler:nm,normalize:ft,denormalize:ti};class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Je{constructor(e,t,n,s,r,o,a,c,l){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],d=n[2],p=n[5],m=n[8],_=s[0],u=s[3],g=s[6],S=s[1],v=s[4],M=s[7],R=s[2],w=s[5],b=s[8];return r[0]=o*_+a*S+c*R,r[3]=o*u+a*v+c*w,r[6]=o*g+a*M+c*b,r[1]=l*_+h*S+f*R,r[4]=l*u+h*v+f*w,r[7]=l*g+h*M+f*b,r[2]=d*_+p*S+m*R,r[5]=d*u+p*v+m*w,r[8]=d*g+p*M+m*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],f=h*o-a*l,d=a*c-h*r,p=l*r-o*c,m=t*f+n*d+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=f*_,e[1]=(s*l-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ha.makeScale(e,t)),this}rotate(e){return this.premultiply(Ha.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ha.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ha=new Je;function Wd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function to(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function sm(){const i=to("canvas");return i.style.display="block",i}const Vh={};function ha(i){i in Vh||(Vh[i]=!0,console.warn(i))}function rm(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function om(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function am(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Gh=new Je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Wh=new Je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),br={[Zt]:{transfer:ga,primaries:_a,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[cn]:{transfer:Et,primaries:_a,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ra]:{transfer:ga,primaries:xa,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Wh),fromReference:i=>i.applyMatrix3(Gh)},[Ql]:{transfer:Et,primaries:xa,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Wh),fromReference:i=>i.applyMatrix3(Gh).convertLinearToSRGB()}},cm=new Set([Zt,Ra]),rt={enabled:!0,_workingColorSpace:Zt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!cm.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=br[e].toReference,s=br[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return br[i].primaries},getTransfer:function(i){return i===Yi?ga:br[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(br[e].luminanceCoefficients)}};function nr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Va(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Rs;class lm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Rs===void 0&&(Rs=to("canvas")),Rs.width=e.width,Rs.height=e.height;const n=Rs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Rs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=to("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=nr(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(nr(t[n]/255)*255):t[n]=nr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hm=0;class Xd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=Xn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ga(s[o].image)):r.push(Ga(s[o]))}else r=Ga(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ga(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?lm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let um=0;class Ht extends Mr{constructor(e=Ht.DEFAULT_IMAGE,t=Ht.DEFAULT_MAPPING,n=hi,s=hi,r=$t,o=ui,a=Wn,c=Di,l=Ht.DEFAULT_ANISOTROPY,h=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=Xn(),this.name="",this.source=new Xd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case is:e.x=e.x-Math.floor(e.x);break;case hi:e.x=e.x<0?0:1;break;case ma:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case is:e.y=e.y-Math.floor(e.y);break;case hi:e.y=e.y<0?0:1;break;case ma:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=Pd;Ht.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,s=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],f=c[8],d=c[1],p=c[5],m=c[9],_=c[2],u=c[6],g=c[10];if(Math.abs(h-d)<.01&&Math.abs(f-_)<.01&&Math.abs(m-u)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+_)<.1&&Math.abs(m+u)<.1&&Math.abs(l+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,M=(p+1)/2,R=(g+1)/2,w=(h+d)/4,b=(f+_)/4,T=(m+u)/4;return v>M&&v>R?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=w/n,r=b/n):M>R?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=w/s,r=T/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=b/r,s=T/r),this.set(n,s,r,t),this}let S=Math.sqrt((u-m)*(u-m)+(f-_)*(f-_)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(u-m)/S,this.y=(f-_)/S,this.z=(d-h)/S,this.w=Math.acos((l+p+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class dm extends Mr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$t,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ht(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Xd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ys extends dm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class qd extends Ht{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class fm extends Ht{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _n{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3];const d=r[o+0],p=r[o+1],m=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=m,e[t+3]=_;return}if(f!==_||c!==d||l!==p||h!==m){let u=1-a;const g=c*d+l*p+h*m+f*_,S=g>=0?1:-1,v=1-g*g;if(v>Number.EPSILON){const R=Math.sqrt(v),w=Math.atan2(R,g*S);u=Math.sin(u*w)/R,a=Math.sin(a*w)/R}const M=a*S;if(c=c*u+d*M,l=l*u+p*M,h=h*u+m*M,f=f*u+_*M,u===1-a){const R=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=R,l*=R,h*=R,f*=R}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[o],d=r[o+1],p=r[o+2],m=r[o+3];return e[t]=a*m+h*f+c*p-l*d,e[t+1]=c*m+h*d+l*f-a*p,e[t+2]=l*m+h*p+a*d-c*f,e[t+3]=h*m-a*f-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),f=a(r/2),d=c(n/2),p=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=d*h*f+l*p*m,this._y=l*p*f-d*h*m,this._z=l*h*m+d*p*f,this._w=l*h*f-d*p*m;break;case"YXZ":this._x=d*h*f+l*p*m,this._y=l*p*f-d*h*m,this._z=l*h*m-d*p*f,this._w=l*h*f+d*p*m;break;case"ZXY":this._x=d*h*f-l*p*m,this._y=l*p*f+d*h*m,this._z=l*h*m+d*p*f,this._w=l*h*f-d*p*m;break;case"ZYX":this._x=d*h*f-l*p*m,this._y=l*p*f+d*h*m,this._z=l*h*m-d*p*f,this._w=l*h*f+d*p*m;break;case"YZX":this._x=d*h*f+l*p*m,this._y=l*p*f+d*h*m,this._z=l*h*m-d*p*f,this._w=l*h*f-d*p*m;break;case"XZY":this._x=d*h*f-l*p*m,this._y=l*p*f-d*h*m,this._z=l*h*m+d*p*f,this._w=l*h*f+d*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],f=t[10],d=n+a+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>f){const p=2*Math.sqrt(1+n-a-f);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>f){const p=2*Math.sqrt(1+a-n-f);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+f-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*f+this._w*d,this._x=n*f+this._x*d,this._y=s*f+this._y*d,this._z=r*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),f=2*(r*n-o*t);return this.x=t+c*l+o*f-a*h,this.y=n+c*h+a*l-r*f,this.z=s+c*f+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Wa.copy(this).projectOnVector(e),this.sub(Wa)}reflect(e){return this.sub(Wa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wa=new N,Xh=new _n;class fi{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Yn):Yn.fromBufferAttribute(r,o),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),uo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),uo.copy(n.boundingBox)),uo.applyMatrix4(e.matrixWorld),this.union(uo)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Tr),fo.subVectors(this.max,Tr),Cs.subVectors(e.a,Tr),Ps.subVectors(e.b,Tr),Ls.subVectors(e.c,Tr),Fi.subVectors(Ps,Cs),Oi.subVectors(Ls,Ps),os.subVectors(Cs,Ls);let t=[0,-Fi.z,Fi.y,0,-Oi.z,Oi.y,0,-os.z,os.y,Fi.z,0,-Fi.x,Oi.z,0,-Oi.x,os.z,0,-os.x,-Fi.y,Fi.x,0,-Oi.y,Oi.x,0,-os.y,os.x,0];return!Xa(t,Cs,Ps,Ls,fo)||(t=[1,0,0,0,1,0,0,0,1],!Xa(t,Cs,Ps,Ls,fo))?!1:(po.crossVectors(Fi,Oi),t=[po.x,po.y,po.z],Xa(t,Cs,Ps,Ls,fo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const vi=[new N,new N,new N,new N,new N,new N,new N,new N],Yn=new N,uo=new fi,Cs=new N,Ps=new N,Ls=new N,Fi=new N,Oi=new N,os=new N,Tr=new N,fo=new N,po=new N,as=new N;function Xa(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){as.fromArray(i,r);const a=s.x*Math.abs(as.x)+s.y*Math.abs(as.y)+s.z*Math.abs(as.z),c=e.dot(as),l=t.dot(as),h=n.dot(as);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const pm=new fi,Ar=new N,qa=new N;class pi{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):pm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ar.subVectors(e,this.center);const t=Ar.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ar,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ar.copy(e.center).add(qa)),this.expandByPoint(Ar.copy(e.center).sub(qa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yi=new N,Ka=new N,mo=new N,Bi=new N,Ya=new N,go=new N,$a=new N;class Ca{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yi.copy(this.origin).addScaledVector(this.direction,t),yi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ka.copy(e).add(t).multiplyScalar(.5),mo.copy(t).sub(e).normalize(),Bi.copy(this.origin).sub(Ka);const r=e.distanceTo(t)*.5,o=-this.direction.dot(mo),a=Bi.dot(this.direction),c=-Bi.dot(mo),l=Bi.lengthSq(),h=Math.abs(1-o*o);let f,d,p,m;if(h>0)if(f=o*c-a,d=o*a-c,m=r*h,f>=0)if(d>=-m)if(d<=m){const _=1/h;f*=_,d*=_,p=f*(f+o*d+2*a)+d*(o*f+d+2*c)+l}else d=r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;else d<=-m?(f=Math.max(0,-(-o*r+a)),d=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+d*(d+2*c)+l):d<=m?(f=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(f=Math.max(0,-(o*r+a)),d=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+d*(d+2*c)+l);else d=o>0?-r:r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Ka).addScaledVector(mo,d),p}intersectSphere(e,t){yi.subVectors(e.center,this.origin);const n=yi.dot(this.direction),s=yi.dot(yi)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,yi)!==null}intersectTriangle(e,t,n,s,r){Ya.subVectors(t,e),go.subVectors(n,e),$a.crossVectors(Ya,go);let o=this.direction.dot($a),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bi.subVectors(this.origin,e);const c=a*this.direction.dot(go.crossVectors(Bi,go));if(c<0)return null;const l=a*this.direction.dot(Ya.cross(Bi));if(l<0||c+l>o)return null;const h=-a*Bi.dot($a);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qe{constructor(e,t,n,s,r,o,a,c,l,h,f,d,p,m,_,u){qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,f,d,p,m,_,u)}set(e,t,n,s,r,o,a,c,l,h,f,d,p,m,_,u){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=f,g[14]=d,g[3]=p,g[7]=m,g[11]=_,g[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Is.setFromMatrixColumn(e,0).length(),r=1/Is.setFromMatrixColumn(e,1).length(),o=1/Is.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const d=o*h,p=o*f,m=a*h,_=a*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=p+m*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=m+p*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,p=c*f,m=l*h,_=l*f;t[0]=d+_*a,t[4]=m*a-p,t[8]=o*l,t[1]=o*f,t[5]=o*h,t[9]=-a,t[2]=p*a-m,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,p=c*f,m=l*h,_=l*f;t[0]=d-_*a,t[4]=-o*f,t[8]=m+p*a,t[1]=p+m*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,p=o*f,m=a*h,_=a*f;t[0]=c*h,t[4]=m*l-p,t[8]=d*l+_,t[1]=c*f,t[5]=_*l+d,t[9]=p*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,p=o*l,m=a*c,_=a*l;t[0]=c*h,t[4]=_-d*f,t[8]=m*f+p,t[1]=f,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*f+m,t[10]=d-_*f}else if(e.order==="XZY"){const d=o*c,p=o*l,m=a*c,_=a*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=d*f+_,t[5]=o*h,t[9]=p*f-m,t[2]=m*f-p,t[6]=a*h,t[10]=_*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mm,e,gm)}lookAt(e,t,n){const s=this.elements;return Rn.subVectors(e,t),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),zi.crossVectors(n,Rn),zi.lengthSq()===0&&(Math.abs(n.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),zi.crossVectors(n,Rn)),zi.normalize(),_o.crossVectors(Rn,zi),s[0]=zi.x,s[4]=_o.x,s[8]=Rn.x,s[1]=zi.y,s[5]=_o.y,s[9]=Rn.y,s[2]=zi.z,s[6]=_o.z,s[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],d=n[9],p=n[13],m=n[2],_=n[6],u=n[10],g=n[14],S=n[3],v=n[7],M=n[11],R=n[15],w=s[0],b=s[4],T=s[8],F=s[12],x=s[1],y=s[5],D=s[9],L=s[13],I=s[2],B=s[6],U=s[10],G=s[14],O=s[3],J=s[7],j=s[11],ce=s[15];return r[0]=o*w+a*x+c*I+l*O,r[4]=o*b+a*y+c*B+l*J,r[8]=o*T+a*D+c*U+l*j,r[12]=o*F+a*L+c*G+l*ce,r[1]=h*w+f*x+d*I+p*O,r[5]=h*b+f*y+d*B+p*J,r[9]=h*T+f*D+d*U+p*j,r[13]=h*F+f*L+d*G+p*ce,r[2]=m*w+_*x+u*I+g*O,r[6]=m*b+_*y+u*B+g*J,r[10]=m*T+_*D+u*U+g*j,r[14]=m*F+_*L+u*G+g*ce,r[3]=S*w+v*x+M*I+R*O,r[7]=S*b+v*y+M*B+R*J,r[11]=S*T+v*D+M*U+R*j,r[15]=S*F+v*L+M*G+R*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],f=e[6],d=e[10],p=e[14],m=e[3],_=e[7],u=e[11],g=e[15];return m*(+r*c*f-s*l*f-r*a*d+n*l*d+s*a*p-n*c*p)+_*(+t*c*p-t*l*d+r*o*d-s*o*p+s*l*h-r*c*h)+u*(+t*l*f-t*a*p-r*o*f+n*o*p+r*a*h-n*l*h)+g*(-s*a*h-t*c*f+t*a*d+s*o*f-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],f=e[9],d=e[10],p=e[11],m=e[12],_=e[13],u=e[14],g=e[15],S=f*u*l-_*d*l+_*c*p-a*u*p-f*c*g+a*d*g,v=m*d*l-h*u*l-m*c*p+o*u*p+h*c*g-o*d*g,M=h*_*l-m*f*l+m*a*p-o*_*p-h*a*g+o*f*g,R=m*f*c-h*_*c-m*a*d+o*_*d+h*a*u-o*f*u,w=t*S+n*v+s*M+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/w;return e[0]=S*b,e[1]=(_*d*r-f*u*r-_*s*p+n*u*p+f*s*g-n*d*g)*b,e[2]=(a*u*r-_*c*r+_*s*l-n*u*l-a*s*g+n*c*g)*b,e[3]=(f*c*r-a*d*r-f*s*l+n*d*l+a*s*p-n*c*p)*b,e[4]=v*b,e[5]=(h*u*r-m*d*r+m*s*p-t*u*p-h*s*g+t*d*g)*b,e[6]=(m*c*r-o*u*r-m*s*l+t*u*l+o*s*g-t*c*g)*b,e[7]=(o*d*r-h*c*r+h*s*l-t*d*l-o*s*p+t*c*p)*b,e[8]=M*b,e[9]=(m*f*r-h*_*r-m*n*p+t*_*p+h*n*g-t*f*g)*b,e[10]=(o*_*r-m*a*r+m*n*l-t*_*l-o*n*g+t*a*g)*b,e[11]=(h*a*r-o*f*r-h*n*l+t*f*l+o*n*p-t*a*p)*b,e[12]=R*b,e[13]=(h*_*s-m*f*s+m*n*d-t*_*d-h*n*u+t*f*u)*b,e[14]=(m*a*s-o*_*s-m*n*c+t*_*c+o*n*u-t*a*u)*b,e[15]=(o*f*s-h*a*s+h*n*c-t*f*c-o*n*d+t*a*d)*b,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,f=a+a,d=r*l,p=r*h,m=r*f,_=o*h,u=o*f,g=a*f,S=c*l,v=c*h,M=c*f,R=n.x,w=n.y,b=n.z;return s[0]=(1-(_+g))*R,s[1]=(p+M)*R,s[2]=(m-v)*R,s[3]=0,s[4]=(p-M)*w,s[5]=(1-(d+g))*w,s[6]=(u+S)*w,s[7]=0,s[8]=(m+v)*b,s[9]=(u-S)*b,s[10]=(1-(d+_))*b,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Is.set(s[0],s[1],s[2]).length();const o=Is.set(s[4],s[5],s[6]).length(),a=Is.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],$n.copy(this);const l=1/r,h=1/o,f=1/a;return $n.elements[0]*=l,$n.elements[1]*=l,$n.elements[2]*=l,$n.elements[4]*=h,$n.elements[5]*=h,$n.elements[6]*=h,$n.elements[8]*=f,$n.elements[9]*=f,$n.elements[10]*=f,t.setFromRotationMatrix($n),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Li){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s);let p,m;if(a===Li)p=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===va)p=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Li){const c=this.elements,l=1/(t-e),h=1/(n-s),f=1/(o-r),d=(t+e)*l,p=(n+s)*h;let m,_;if(a===Li)m=(o+r)*f,_=-2*f;else if(a===va)m=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Is=new N,$n=new qe,mm=new N(0,0,0),gm=new N(1,1,1),zi=new N,_o=new N,Rn=new N,qh=new qe,Kh=new _n;class bn{constructor(e=0,t=0,n=0,s=bn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],f=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(zt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-zt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kh.setFromEuler(this),this.setFromQuaternion(Kh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bn.DEFAULT_ORDER="XYZ";class Kd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let _m=0;const Yh=new N,Ds=new _n,Mi=new qe,xo=new N,Rr=new N,xm=new N,vm=new _n,$h=new N(1,0,0),jh=new N(0,1,0),Zh=new N(0,0,1),Jh={type:"added"},ym={type:"removed"},Ns={type:"childadded",child:null},ja={type:"childremoved",child:null};class St extends Mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new N,t=new bn,n=new _n,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qe},normalMatrix:{value:new Je}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ds.setFromAxisAngle(e,t),this.quaternion.multiply(Ds),this}rotateOnWorldAxis(e,t){return Ds.setFromAxisAngle(e,t),this.quaternion.premultiply(Ds),this}rotateX(e){return this.rotateOnAxis($h,e)}rotateY(e){return this.rotateOnAxis(jh,e)}rotateZ(e){return this.rotateOnAxis(Zh,e)}translateOnAxis(e,t){return Yh.copy(e).applyQuaternion(this.quaternion),this.position.add(Yh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($h,e)}translateY(e){return this.translateOnAxis(jh,e)}translateZ(e){return this.translateOnAxis(Zh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xo.copy(e):xo.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mi.lookAt(Rr,xo,this.up):Mi.lookAt(xo,Rr,this.up),this.quaternion.setFromRotationMatrix(Mi),s&&(Mi.extractRotation(s.matrixWorld),Ds.setFromRotationMatrix(Mi),this.quaternion.premultiply(Ds.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Jh),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ym),ja.child=e,this.dispatchEvent(ja),ja.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Jh),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,e,xm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rr,vm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}St.DEFAULT_UP=new N(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jn=new N,Si=new N,Za=new N,wi=new N,Us=new N,Fs=new N,Qh=new N,Ja=new N,Qa=new N,ec=new N,tc=new at,nc=new at,ic=new at;class Gn{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),jn.subVectors(e,t),s.cross(jn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){jn.subVectors(s,t),Si.subVectors(n,t),Za.subVectors(e,t);const o=jn.dot(jn),a=jn.dot(Si),c=jn.dot(Za),l=Si.dot(Si),h=Si.dot(Za),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const d=1/f,p=(l*c-a*h)*d,m=(o*h-a*c)*d;return r.set(1-p-m,m,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,wi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,wi.x),c.addScaledVector(o,wi.y),c.addScaledVector(a,wi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return tc.setScalar(0),nc.setScalar(0),ic.setScalar(0),tc.fromBufferAttribute(e,t),nc.fromBufferAttribute(e,n),ic.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(tc,r.x),o.addScaledVector(nc,r.y),o.addScaledVector(ic,r.z),o}static isFrontFacing(e,t,n,s){return jn.subVectors(n,t),Si.subVectors(e,t),jn.cross(Si).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jn.subVectors(this.c,this.b),Si.subVectors(this.a,this.b),jn.cross(Si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Gn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Us.subVectors(s,n),Fs.subVectors(r,n),Ja.subVectors(e,n);const c=Us.dot(Ja),l=Fs.dot(Ja);if(c<=0&&l<=0)return t.copy(n);Qa.subVectors(e,s);const h=Us.dot(Qa),f=Fs.dot(Qa);if(h>=0&&f<=h)return t.copy(s);const d=c*f-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Us,o);ec.subVectors(e,r);const p=Us.dot(ec),m=Fs.dot(ec);if(m>=0&&p<=m)return t.copy(r);const _=p*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(Fs,a);const u=h*m-p*f;if(u<=0&&f-h>=0&&p-m>=0)return Qh.subVectors(r,s),a=(f-h)/(f-h+(p-m)),t.copy(s).addScaledVector(Qh,a);const g=1/(u+_+d);return o=_*g,a=d*g,t.copy(n).addScaledVector(Us,o).addScaledVector(Fs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Yd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ki={h:0,s:0,l:0},vo={h:0,s:0,l:0};function sc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,rt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=rt.workingColorSpace){if(e=eh(e,1),t=zt(t,0,1),n=zt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=sc(o,r,e+1/3),this.g=sc(o,r,e),this.b=sc(o,r,e-1/3)}return rt.toWorkingColorSpace(this,s),this}setStyle(e,t=cn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=cn){const n=Yd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=nr(e.r),this.g=nr(e.g),this.b=nr(e.b),this}copyLinearToSRGB(e){return this.r=Va(e.r),this.g=Va(e.g),this.b=Va(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=cn){return rt.fromWorkingColorSpace(sn.copy(this),e),Math.round(zt(sn.r*255,0,255))*65536+Math.round(zt(sn.g*255,0,255))*256+Math.round(zt(sn.b*255,0,255))}getHexString(e=cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.fromWorkingColorSpace(sn.copy(this),t);const n=sn.r,s=sn.g,r=sn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=rt.workingColorSpace){return rt.fromWorkingColorSpace(sn.copy(this),t),e.r=sn.r,e.g=sn.g,e.b=sn.b,e}getStyle(e=cn){rt.fromWorkingColorSpace(sn.copy(this),e);const t=sn.r,n=sn.g,s=sn.b;return e!==cn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ki),this.setHSL(ki.h+e,ki.s+t,ki.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ki),e.getHSL(vo);const n=qr(ki.h,vo.h,t),s=qr(ki.s,vo.s,t),r=qr(ki.l,vo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const sn=new ze;ze.NAMES=Yd;let Mm=0;class si extends Mr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=Xn(),this.name="",this.type="Material",this.blending=er,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vc,this.blendDst=Gc,this.blendEquation=ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=As,this.stencilZFail=As,this.stencilZPass=As,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==er&&(n.blending=this.blending),this.side!==Ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Vc&&(n.blendSrc=this.blendSrc),this.blendDst!==Gc&&(n.blendDst=this.blendDst),this.blendEquation!==ms&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==lr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==As&&(n.stencilFail=this.stencilFail),this.stencilZFail!==As&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==As&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class mt extends si{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Rd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ci=Sm();function Sm(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(l&8388608);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function wm(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=zt(i,-65504,65504),Ci.floatView[0]=i;const e=Ci.uint32View[0],t=e>>23&511;return Ci.baseTable[t]+((e&8388607)>>Ci.shiftTable[t])}function Em(i){const e=i>>10;return Ci.uint32View[0]=Ci.mantissaTable[Ci.offsetTable[e]+(i&1023)]+Ci.exponentTable[e],Ci.floatView[0]}const yo={toHalfFloat:wm,fromHalfFloat:Em},Lt=new N,Mo=new ue;class jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Tl,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Mo.fromBufferAttribute(this,t),Mo.applyMatrix3(e),this.setXY(t,Mo.x,Mo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Tl&&(e.usage=this.usage),e}}class $d extends jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class jd extends jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class xt extends jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let bm=0;const Un=new qe,rc=new St,Os=new N,Cn=new fi,Cr=new fi,Wt=new N;class Bt extends Mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wd(e)?jd:$d)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Un.makeRotationFromQuaternion(e),this.applyMatrix4(Un),this}rotateX(e){return Un.makeRotationX(e),this.applyMatrix4(Un),this}rotateY(e){return Un.makeRotationY(e),this.applyMatrix4(Un),this}rotateZ(e){return Un.makeRotationZ(e),this.applyMatrix4(Un),this}translate(e,t,n){return Un.makeTranslation(e,t,n),this.applyMatrix4(Un),this}scale(e,t,n){return Un.makeScale(e,t,n),this.applyMatrix4(Un),this}lookAt(e){return rc.lookAt(e),rc.updateMatrix(),this.applyMatrix4(rc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new xt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Cr.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(Cn.min,Cr.min),Cn.expandByPoint(Wt),Wt.addVectors(Cn.max,Cr.max),Cn.expandByPoint(Wt)):(Cn.expandByPoint(Cr.min),Cn.expandByPoint(Cr.max))}Cn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Wt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Wt.fromBufferAttribute(a,l),c&&(Os.fromBufferAttribute(e,l),Wt.add(Os)),s=Math.max(s,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let T=0;T<n.count;T++)a[T]=new N,c[T]=new N;const l=new N,h=new N,f=new N,d=new ue,p=new ue,m=new ue,_=new N,u=new N;function g(T,F,x){l.fromBufferAttribute(n,T),h.fromBufferAttribute(n,F),f.fromBufferAttribute(n,x),d.fromBufferAttribute(r,T),p.fromBufferAttribute(r,F),m.fromBufferAttribute(r,x),h.sub(l),f.sub(l),p.sub(d),m.sub(d);const y=1/(p.x*m.y-m.x*p.y);isFinite(y)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(y),u.copy(f).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(y),a[T].add(_),a[F].add(_),a[x].add(_),c[T].add(u),c[F].add(u),c[x].add(u))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let T=0,F=S.length;T<F;++T){const x=S[T],y=x.start,D=x.count;for(let L=y,I=y+D;L<I;L+=3)g(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const v=new N,M=new N,R=new N,w=new N;function b(T){R.fromBufferAttribute(s,T),w.copy(R);const F=a[T];v.copy(F),v.sub(R.multiplyScalar(R.dot(F))).normalize(),M.crossVectors(w,F);const y=M.dot(c[T])<0?-1:1;o.setXYZW(T,v.x,v.y,v.z,y)}for(let T=0,F=S.length;T<F;++T){const x=S[T],y=x.start,D=x.count;for(let L=y,I=y+D;L<I;L+=3)b(e.getX(L+0)),b(e.getX(L+1)),b(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new N,r=new N,o=new N,a=new N,c=new N,l=new N,h=new N,f=new N;if(e)for(let d=0,p=e.count;d<p;d+=3){const m=e.getX(d+0),_=e.getX(d+1),u=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,u),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,u),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(u,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,f=a.normalized,d=new l.constructor(c.length*h);let p=0,m=0;for(let _=0,u=c.length;_<u;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let g=0;g<h;g++)d[m++]=l[p++]}return new jt(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Bt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,f=l.length;h<f;h++){const d=l[h],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,d=l.length;f<d;f++){const p=l[f];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],f=r[l];for(let d=0,p=f.length;d<p;d++)h.push(f[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eu=new qe,cs=new Ca,So=new pi,tu=new N,wo=new N,Eo=new N,bo=new N,oc=new N,To=new N,nu=new N,Ao=new N;class X extends St{constructor(e=new Bt,t=new mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){To.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],f=r[c];h!==0&&(oc.fromBufferAttribute(f,e),o?To.addScaledVector(oc,h):To.addScaledVector(oc.sub(t),h))}t.add(To)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),So.copy(n.boundingSphere),So.applyMatrix4(r),cs.copy(e.ray).recast(e.near),!(So.containsPoint(cs.origin)===!1&&(cs.intersectSphere(So,tu)===null||cs.origin.distanceToSquared(tu)>(e.far-e.near)**2))&&(eu.copy(r).invert(),cs.copy(e.ray).applyMatrix4(eu),!(n.boundingBox!==null&&cs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,cs)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const u=d[m],g=o[u.materialIndex],S=Math.max(u.start,p.start),v=Math.min(a.count,Math.min(u.start+u.count,p.start+p.count));for(let M=S,R=v;M<R;M+=3){const w=a.getX(M),b=a.getX(M+1),T=a.getX(M+2);s=Ro(this,g,e,n,l,h,f,w,b,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=u.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let u=m,g=_;u<g;u+=3){const S=a.getX(u),v=a.getX(u+1),M=a.getX(u+2);s=Ro(this,o,e,n,l,h,f,S,v,M),s&&(s.faceIndex=Math.floor(u/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const u=d[m],g=o[u.materialIndex],S=Math.max(u.start,p.start),v=Math.min(c.count,Math.min(u.start+u.count,p.start+p.count));for(let M=S,R=v;M<R;M+=3){const w=M,b=M+1,T=M+2;s=Ro(this,g,e,n,l,h,f,w,b,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=u.materialIndex,t.push(s))}}else{const m=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let u=m,g=_;u<g;u+=3){const S=u,v=u+1,M=u+2;s=Ro(this,o,e,n,l,h,f,S,v,M),s&&(s.faceIndex=Math.floor(u/3),t.push(s))}}}}function Tm(i,e,t,n,s,r,o,a){let c;if(e.side===gn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Ii,a),c===null)return null;Ao.copy(a),Ao.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ao);return l<t.near||l>t.far?null:{distance:l,point:Ao.clone(),object:i}}function Ro(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,wo),i.getVertexPosition(c,Eo),i.getVertexPosition(l,bo);const h=Tm(i,e,t,n,wo,Eo,bo,nu);if(h){const f=new N;Gn.getBarycoord(nu,wo,Eo,bo,f),s&&(h.uv=Gn.getInterpolatedAttribute(s,a,c,l,f,new ue)),r&&(h.uv1=Gn.getInterpolatedAttribute(r,a,c,l,f,new ue)),o&&(h.normal=Gn.getInterpolatedAttribute(o,a,c,l,f,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new N,materialIndex:0};Gn.getNormal(wo,Eo,bo,d.normal),h.face=d,h.barycoord=f}return h}class he extends Bt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],f=[];let d=0,p=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new xt(l,3)),this.setAttribute("normal",new xt(h,3)),this.setAttribute("uv",new xt(f,2));function m(_,u,g,S,v,M,R,w,b,T,F){const x=M/b,y=R/T,D=M/2,L=R/2,I=w/2,B=b+1,U=T+1;let G=0,O=0;const J=new N;for(let j=0;j<U;j++){const ce=j*y-L;for(let Te=0;Te<B;Te++){const Le=Te*x-D;J[_]=Le*S,J[u]=ce*v,J[g]=I,l.push(J.x,J.y,J.z),J[_]=0,J[u]=0,J[g]=w>0?1:-1,h.push(J.x,J.y,J.z),f.push(Te/b),f.push(1-j/T),G+=1}}for(let j=0;j<T;j++)for(let ce=0;ce<b;ce++){const Te=d+ce+B*j,Le=d+ce+B*(j+1),K=d+(ce+1)+B*(j+1),ae=d+(ce+1)+B*j;c.push(Te,Le,ae),c.push(Le,K,ae),O+=6}a.addGroup(p,O,F),p+=O,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new he(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function mr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function dn(i){const e={};for(let t=0;t<i.length;t++){const n=mr(i[t]);for(const s in n)e[s]=n[s]}return e}function Am(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Zd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}const Jd={clone:mr,merge:dn};var Rm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ni extends si{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rm,this.fragmentShader=Cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mr(e.uniforms),this.uniformsGroups=Am(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Qd extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=Li}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hi=new N,iu=new ue,su=new ue;class fn extends Qd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=pr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pr*2*Math.atan(Math.tan(Xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z)}getViewSize(e,t){return this.getViewBounds(e,iu,su),t.subVectors(su,iu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Xr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Bs=-90,zs=1;class Pm extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new fn(Bs,zs,e,t);s.layers=this.layers,this.add(s);const r=new fn(Bs,zs,e,t);r.layers=this.layers,this.add(r);const o=new fn(Bs,zs,e,t);o.layers=this.layers,this.add(o);const a=new fn(Bs,zs,e,t);a.layers=this.layers,this.add(a);const c=new fn(Bs,zs,e,t);c.layers=this.layers,this.add(c);const l=new fn(Bs,zs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Li)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===va)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(f,d,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class ef extends Ht{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:hr,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Lm extends ys{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ef(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:$t}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new he(5,5,5),r=new Ni({name:"CubemapFromEquirect",uniforms:mr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:es});r.uniforms.tEquirect.value=t;const o=new X(s,r),a=t.minFilter;return t.minFilter===ui&&(t.minFilter=$t),new Pm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const ac=new N,Im=new N,Dm=new Je;class fs{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ac.subVectors(n,t).cross(Im.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ac),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Dm.getNormalMatrix(e),s=this.coplanarPoint(ac).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ls=new pi,Co=new N;class th{constructor(e=new fs,t=new fs,n=new fs,s=new fs,r=new fs,o=new fs){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Li){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],f=s[6],d=s[7],p=s[8],m=s[9],_=s[10],u=s[11],g=s[12],S=s[13],v=s[14],M=s[15];if(n[0].setComponents(c-r,d-l,u-p,M-g).normalize(),n[1].setComponents(c+r,d+l,u+p,M+g).normalize(),n[2].setComponents(c+o,d+h,u+m,M+S).normalize(),n[3].setComponents(c-o,d-h,u-m,M-S).normalize(),n[4].setComponents(c-a,d-f,u-_,M-v).normalize(),t===Li)n[5].setComponents(c+a,d+f,u+_,M+v).normalize();else if(t===va)n[5].setComponents(a,f,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(e){return ls.center.set(0,0,0),ls.radius=.7071067811865476,ls.applyMatrix4(e.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Co.x=s.normal.x>0?e.max.x:e.min.x,Co.y=s.normal.y>0?e.max.y:e.min.y,Co.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Co)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function tf(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Nm(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,f=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((p,m)=>p.start-m.start);let d=0;for(let p=1;p<f.length;p++){const m=f[d],_=f[p];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,f[d]=_)}f.length=d+1;for(let p=0,m=f.length;p<m;p++){const _=f[p];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class Nt extends Bt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,f=e/a,d=t/c,p=[],m=[],_=[],u=[];for(let g=0;g<h;g++){const S=g*d-o;for(let v=0;v<l;v++){const M=v*f-r;m.push(M,-S,0),_.push(0,0,1),u.push(v/a),u.push(1-g/c)}}for(let g=0;g<c;g++)for(let S=0;S<a;S++){const v=S+l*g,M=S+l*(g+1),R=S+1+l*(g+1),w=S+1+l*g;p.push(v,M,w),p.push(M,R,w)}this.setIndex(p),this.setAttribute("position",new xt(m,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nt(e.width,e.height,e.widthSegments,e.heightSegments)}}var Um=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fm=`#ifdef USE_ALPHAHASH
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
#endif`,Om=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,km=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hm=`#ifdef USE_AOMAP
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
#endif`,Vm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gm=`#ifdef USE_BATCHING
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
#endif`,Wm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Km=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ym=`#ifdef USE_IRIDESCENCE
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
#endif`,$m=`#ifdef USE_BUMPMAP
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
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,e0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,t0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,s0=`#define PI 3.141592653589793
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
} // validated`,r0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,o0=`vec3 transformedNormal = objectNormal;
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
#endif`,a0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,c0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,l0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,h0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,u0="gl_FragColor = linearToOutputTexel( gl_FragColor );",d0=`
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
}`,f0=`#ifdef USE_ENVMAP
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
#endif`,p0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,m0=`#ifdef USE_ENVMAP
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
#endif`,g0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_0=`#ifdef USE_ENVMAP
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
#endif`,x0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,v0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,y0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,M0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,S0=`#ifdef USE_GRADIENTMAP
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
}`,w0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,E0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,b0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,T0=`uniform bool receiveShadow;
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
#endif`,A0=`#ifdef USE_ENVMAP
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
#endif`,R0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,C0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,P0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,L0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,I0=`PhysicalMaterial material;
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
#endif`,D0=`struct PhysicalMaterial {
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
}`,N0=`
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
#endif`,U0=`#if defined( RE_IndirectDiffuse )
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
#endif`,F0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,O0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,B0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,z0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,H0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,V0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,G0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,W0=`#if defined( USE_POINTS_UV )
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
#endif`,X0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,q0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,K0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Y0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,j0=`#ifdef USE_MORPHTARGETS
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
#endif`,Z0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Q0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ng=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ig=`#ifdef USE_NORMALMAP
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
#endif`,sg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,og=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ag=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ug=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_g=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vg=`float getShadowMask() {
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
}`,yg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mg=`#ifdef USE_SKINNING
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
#endif`,Sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wg=`#ifdef USE_SKINNING
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
#endif`,Eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ag=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rg=`#ifdef USE_TRANSMISSION
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
#endif`,Cg=`#ifdef USE_TRANSMISSION
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
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ng=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ug=`uniform sampler2D t2D;
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
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Og=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`#include <common>
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
}`,Hg=`#if DEPTH_PACKING == 3200
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
}`,Vg=`#define DISTANCE
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
}`,Gg=`#define DISTANCE
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
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`uniform float scale;
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
}`,Kg=`uniform vec3 diffuse;
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
}`,Yg=`#include <common>
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
}`,$g=`uniform vec3 diffuse;
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
}`,jg=`#define LAMBERT
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
}`,Zg=`#define LAMBERT
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
}`,Jg=`#define MATCAP
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
}`,Qg=`#define MATCAP
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
}`,e_=`#define NORMAL
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
}`,t_=`#define NORMAL
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
}`,n_=`#define PHONG
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
}`,i_=`#define PHONG
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
}`,s_=`#define STANDARD
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
}`,r_=`#define STANDARD
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
}`,o_=`#define TOON
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
}`,a_=`#define TOON
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
}`,c_=`uniform float size;
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
}`,l_=`uniform vec3 diffuse;
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
}`,h_=`#include <common>
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
}`,u_=`uniform vec3 color;
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
}`,d_=`uniform float rotation;
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
}`,f_=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:Um,alphahash_pars_fragment:Fm,alphamap_fragment:Om,alphamap_pars_fragment:Bm,alphatest_fragment:zm,alphatest_pars_fragment:km,aomap_fragment:Hm,aomap_pars_fragment:Vm,batching_pars_vertex:Gm,batching_vertex:Wm,begin_vertex:Xm,beginnormal_vertex:qm,bsdfs:Km,iridescence_fragment:Ym,bumpmap_pars_fragment:$m,clipping_planes_fragment:jm,clipping_planes_pars_fragment:Zm,clipping_planes_pars_vertex:Jm,clipping_planes_vertex:Qm,color_fragment:e0,color_pars_fragment:t0,color_pars_vertex:n0,color_vertex:i0,common:s0,cube_uv_reflection_fragment:r0,defaultnormal_vertex:o0,displacementmap_pars_vertex:a0,displacementmap_vertex:c0,emissivemap_fragment:l0,emissivemap_pars_fragment:h0,colorspace_fragment:u0,colorspace_pars_fragment:d0,envmap_fragment:f0,envmap_common_pars_fragment:p0,envmap_pars_fragment:m0,envmap_pars_vertex:g0,envmap_physical_pars_fragment:A0,envmap_vertex:_0,fog_vertex:x0,fog_pars_vertex:v0,fog_fragment:y0,fog_pars_fragment:M0,gradientmap_pars_fragment:S0,lightmap_pars_fragment:w0,lights_lambert_fragment:E0,lights_lambert_pars_fragment:b0,lights_pars_begin:T0,lights_toon_fragment:R0,lights_toon_pars_fragment:C0,lights_phong_fragment:P0,lights_phong_pars_fragment:L0,lights_physical_fragment:I0,lights_physical_pars_fragment:D0,lights_fragment_begin:N0,lights_fragment_maps:U0,lights_fragment_end:F0,logdepthbuf_fragment:O0,logdepthbuf_pars_fragment:B0,logdepthbuf_pars_vertex:z0,logdepthbuf_vertex:k0,map_fragment:H0,map_pars_fragment:V0,map_particle_fragment:G0,map_particle_pars_fragment:W0,metalnessmap_fragment:X0,metalnessmap_pars_fragment:q0,morphinstance_vertex:K0,morphcolor_vertex:Y0,morphnormal_vertex:$0,morphtarget_pars_vertex:j0,morphtarget_vertex:Z0,normal_fragment_begin:J0,normal_fragment_maps:Q0,normal_pars_fragment:eg,normal_pars_vertex:tg,normal_vertex:ng,normalmap_pars_fragment:ig,clearcoat_normal_fragment_begin:sg,clearcoat_normal_fragment_maps:rg,clearcoat_pars_fragment:og,iridescence_pars_fragment:ag,opaque_fragment:cg,packing:lg,premultiplied_alpha_fragment:hg,project_vertex:ug,dithering_fragment:dg,dithering_pars_fragment:fg,roughnessmap_fragment:pg,roughnessmap_pars_fragment:mg,shadowmap_pars_fragment:gg,shadowmap_pars_vertex:_g,shadowmap_vertex:xg,shadowmask_pars_fragment:vg,skinbase_vertex:yg,skinning_pars_vertex:Mg,skinning_vertex:Sg,skinnormal_vertex:wg,specularmap_fragment:Eg,specularmap_pars_fragment:bg,tonemapping_fragment:Tg,tonemapping_pars_fragment:Ag,transmission_fragment:Rg,transmission_pars_fragment:Cg,uv_pars_fragment:Pg,uv_pars_vertex:Lg,uv_vertex:Ig,worldpos_vertex:Dg,background_vert:Ng,background_frag:Ug,backgroundCube_vert:Fg,backgroundCube_frag:Og,cube_vert:Bg,cube_frag:zg,depth_vert:kg,depth_frag:Hg,distanceRGBA_vert:Vg,distanceRGBA_frag:Gg,equirect_vert:Wg,equirect_frag:Xg,linedashed_vert:qg,linedashed_frag:Kg,meshbasic_vert:Yg,meshbasic_frag:$g,meshlambert_vert:jg,meshlambert_frag:Zg,meshmatcap_vert:Jg,meshmatcap_frag:Qg,meshnormal_vert:e_,meshnormal_frag:t_,meshphong_vert:n_,meshphong_frag:i_,meshphysical_vert:s_,meshphysical_frag:r_,meshtoon_vert:o_,meshtoon_frag:a_,points_vert:c_,points_frag:l_,shadow_vert:h_,shadow_frag:u_,sprite_vert:d_,sprite_frag:f_},xe={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},li={basic:{uniforms:dn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:dn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:dn([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:dn([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:dn([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:dn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:dn([xe.points,xe.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:dn([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:dn([xe.common,xe.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:dn([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:dn([xe.sprite,xe.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:dn([xe.common,xe.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:dn([xe.lights,xe.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};li.physical={uniforms:dn([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Po={r:0,b:0,g:0},hs=new bn,p_=new qe;function m_(i,e,t,n,s,r,o){const a=new ze(0);let c=r===!0?0:1,l,h,f=null,d=0,p=null;function m(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function _(S){let v=!1;const M=m(S);M===null?g(a,c):M&&M.isColor&&(g(M,1),v=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function u(S,v){const M=m(v);M&&(M.isCubeTexture||M.mapping===Aa)?(h===void 0&&(h=new X(new he(1,1,1),new Ni({name:"BackgroundCubeMaterial",uniforms:mr(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,w,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),hs.copy(v.backgroundRotation),hs.x*=-1,hs.y*=-1,hs.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(p_.makeRotationFromEuler(hs)),h.material.toneMapped=rt.getTransfer(M.colorSpace)!==Et,(f!==M||d!==M.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,f=M,d=M.version,p=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new X(new Nt(2,2),new Ni({name:"BackgroundMaterial",uniforms:mr(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=rt.getTransfer(M.colorSpace)!==Et,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||d!==M.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,f=M,d=M.version,p=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function g(S,v){S.getRGB(Po,Zd(i)),n.buffers.color.setClear(Po.r,Po.g,Po.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(S,v=1){a.set(S),c=v,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,g(a,c)},render:_,addToRenderList:u}}function g_(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(x,y,D,L,I){let B=!1;const U=f(L,D,y);r!==U&&(r=U,l(r.object)),B=p(x,L,D,I),B&&m(x,L,D,I),I!==null&&e.update(I,i.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,M(x,y,D,L),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function f(x,y,D){const L=D.wireframe===!0;let I=n[x.id];I===void 0&&(I={},n[x.id]=I);let B=I[y.id];B===void 0&&(B={},I[y.id]=B);let U=B[L];return U===void 0&&(U=d(c()),B[L]=U),U}function d(x){const y=[],D=[],L=[];for(let I=0;I<t;I++)y[I]=0,D[I]=0,L[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:D,attributeDivisors:L,object:x,attributes:{},index:null}}function p(x,y,D,L){const I=r.attributes,B=y.attributes;let U=0;const G=D.getAttributes();for(const O in G)if(G[O].location>=0){const j=I[O];let ce=B[O];if(ce===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&(ce=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&(ce=x.instanceColor)),j===void 0||j.attribute!==ce||ce&&j.data!==ce.data)return!0;U++}return r.attributesNum!==U||r.index!==L}function m(x,y,D,L){const I={},B=y.attributes;let U=0;const G=D.getAttributes();for(const O in G)if(G[O].location>=0){let j=B[O];j===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&(j=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&(j=x.instanceColor));const ce={};ce.attribute=j,j&&j.data&&(ce.data=j.data),I[O]=ce,U++}r.attributes=I,r.attributesNum=U,r.index=L}function _(){const x=r.newAttributes;for(let y=0,D=x.length;y<D;y++)x[y]=0}function u(x){g(x,0)}function g(x,y){const D=r.newAttributes,L=r.enabledAttributes,I=r.attributeDivisors;D[x]=1,L[x]===0&&(i.enableVertexAttribArray(x),L[x]=1),I[x]!==y&&(i.vertexAttribDivisor(x,y),I[x]=y)}function S(){const x=r.newAttributes,y=r.enabledAttributes;for(let D=0,L=y.length;D<L;D++)y[D]!==x[D]&&(i.disableVertexAttribArray(D),y[D]=0)}function v(x,y,D,L,I,B,U){U===!0?i.vertexAttribIPointer(x,y,D,I,B):i.vertexAttribPointer(x,y,D,L,I,B)}function M(x,y,D,L){_();const I=L.attributes,B=D.getAttributes(),U=y.defaultAttributeValues;for(const G in B){const O=B[G];if(O.location>=0){let J=I[G];if(J===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(J=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(J=x.instanceColor)),J!==void 0){const j=J.normalized,ce=J.itemSize,Te=e.get(J);if(Te===void 0)continue;const Le=Te.buffer,K=Te.type,ae=Te.bytesPerElement,_e=K===i.INT||K===i.UNSIGNED_INT||J.gpuType===ql;if(J.isInterleavedBufferAttribute){const fe=J.data,De=fe.stride,Ne=J.offset;if(fe.isInstancedInterleavedBuffer){for(let Pe=0;Pe<O.locationSize;Pe++)g(O.location+Pe,fe.meshPerAttribute);x.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let Pe=0;Pe<O.locationSize;Pe++)u(O.location+Pe);i.bindBuffer(i.ARRAY_BUFFER,Le);for(let Pe=0;Pe<O.locationSize;Pe++)v(O.location+Pe,ce/O.locationSize,K,j,De*ae,(Ne+ce/O.locationSize*Pe)*ae,_e)}else{if(J.isInstancedBufferAttribute){for(let fe=0;fe<O.locationSize;fe++)g(O.location+fe,J.meshPerAttribute);x.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let fe=0;fe<O.locationSize;fe++)u(O.location+fe);i.bindBuffer(i.ARRAY_BUFFER,Le);for(let fe=0;fe<O.locationSize;fe++)v(O.location+fe,ce/O.locationSize,K,j,ce*ae,ce/O.locationSize*fe*ae,_e)}}else if(U!==void 0){const j=U[G];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(O.location,j);break;case 3:i.vertexAttrib3fv(O.location,j);break;case 4:i.vertexAttrib4fv(O.location,j);break;default:i.vertexAttrib1fv(O.location,j)}}}}S()}function R(){T();for(const x in n){const y=n[x];for(const D in y){const L=y[D];for(const I in L)h(L[I].object),delete L[I];delete y[D]}delete n[x]}}function w(x){if(n[x.id]===void 0)return;const y=n[x.id];for(const D in y){const L=y[D];for(const I in L)h(L[I].object),delete L[I];delete y[D]}delete n[x.id]}function b(x){for(const y in n){const D=n[y];if(D[x.id]===void 0)continue;const L=D[x.id];for(const I in L)h(L[I].object),delete L[I];delete D[x.id]}}function T(){F(),o=!0,r!==s&&(r=s,l(r.object))}function F(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:F,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:u,disableUnusedAttributes:S}}function __(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),t.update(h,n,f))}function a(l,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let p=0;for(let m=0;m<f;m++)p+=h[m];t.update(p,n,1)}function c(l,h,f,d){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<l.length;m++)o(l[m],h[m],d[m]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,f);let m=0;for(let _=0;_<f;_++)m+=h[_];for(let _=0;_<d.length;_++)t.update(m,n,d[_])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function x_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==Wn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const T=b===Pi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==Di&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==wn&&!T)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(d===!0){const b=e.get("EXT_clip_control");b.clipControlEXT(b.LOWER_LEFT_EXT,b.ZERO_TO_ONE_EXT)}const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),u=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:u,maxAttributes:g,maxVertexUniforms:S,maxVaryings:v,maxFragmentUniforms:M,vertexTextures:R,maxSamples:w}}function v_(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new fs,a=new Je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||n!==0||s;return s=d,n=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,p){const m=f.clippingPlanes,_=f.clipIntersection,u=f.clipShadows,g=i.get(f);if(!s||m===null||m.length===0||r&&!u)r?h(null):l();else{const S=r?0:n,v=S*4;let M=g.clippingState||null;c.value=M,M=h(m,d,v,p);for(let R=0;R!==v;++R)M[R]=t[R];g.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,d,p,m){const _=f!==null?f.length:0;let u=null;if(_!==0){if(u=c.value,m!==!0||u===null){const g=p+_*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(u===null||u.length<g)&&(u=new Float32Array(g));for(let v=0,M=p;v!==_;++v,M+=4)o.copy(f[v]).applyMatrix4(S,a),o.normal.toArray(u,M),u[M+3]=o.constant}c.value=u,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,u}}function y_(i){let e=new WeakMap;function t(o,a){return a===Zc?o.mapping=hr:a===Jc&&(o.mapping=ur),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Zc||a===Jc)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Lm(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class nh extends Qd{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const js=4,ru=[.125,.215,.35,.446,.526,.582],gs=20,cc=new nh,ou=new ze;let lc=null,hc=0,uc=0,dc=!1;const ps=(1+Math.sqrt(5))/2,ks=1/ps,au=[new N(-ps,ks,0),new N(ps,ks,0),new N(-ks,0,ps),new N(ks,0,ps),new N(0,ps,-ks),new N(0,ps,ks),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Al{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){lc=this._renderer.getRenderTarget(),hc=this._renderer.getActiveCubeFace(),uc=this._renderer.getActiveMipmapLevel(),dc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(lc,hc,uc),this._renderer.xr.enabled=dc,e.scissorTest=!1,Lo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===hr||e.mapping===ur?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),lc=this._renderer.getRenderTarget(),hc=this._renderer.getActiveCubeFace(),uc=this._renderer.getActiveMipmapLevel(),dc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:$t,minFilter:$t,generateMipmaps:!1,type:Pi,format:Wn,colorSpace:Zt,depthBuffer:!1},s=cu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cu(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=M_(r)),this._blurMaterial=S_(r,e,t)}return s}_compileMaterial(e){const t=new X(this._lodPlanes[0],e);this._renderer.compile(t,cc)}_sceneToCubeUV(e,t,n,s){const a=new fn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(ou),h.toneMapping=ts,h.autoClear=!1;const p=new mt({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1}),m=new X(new he,p);let _=!1;const u=e.background;u?u.isColor&&(p.color.copy(u),e.background=null,_=!0):(p.color.copy(ou),_=!0);for(let g=0;g<6;g++){const S=g%3;S===0?(a.up.set(0,c[g],0),a.lookAt(l[g],0,0)):S===1?(a.up.set(0,0,c[g]),a.lookAt(0,l[g],0)):(a.up.set(0,c[g],0),a.lookAt(0,0,l[g]));const v=this._cubeSize;Lo(s,S*v,g>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(m,a),h.render(e,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=u}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===hr||e.mapping===ur;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new X(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Lo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,cc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=au[(s-r-1)%au.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new X(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*gs-1),_=r/m,u=isFinite(r)?1+Math.floor(h*_):gs;u>gs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${u} samples when the maximum is set to ${gs}`);const g=[];let S=0;for(let b=0;b<gs;++b){const T=b/_,F=Math.exp(-T*T/2);g.push(F),b===0?S+=F:b<u&&(S+=2*F)}for(let b=0;b<g.length;b++)g[b]=g[b]/S;d.envMap.value=e.texture,d.samples.value=u,d.weights.value=g,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=m,d.mipInt.value=v-n;const M=this._sizeLods[s],R=3*M*(s>v-js?s-v+js:0),w=4*(this._cubeSize-M);Lo(t,R,w,3*M,2*M),c.setRenderTarget(t),c.render(f,cc)}}function M_(i){const e=[],t=[],n=[];let s=i;const r=i-js+1+ru.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-js?c=ru[o-i+js-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,f=1+l,d=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,m=6,_=3,u=2,g=1,S=new Float32Array(_*m*p),v=new Float32Array(u*m*p),M=new Float32Array(g*m*p);for(let w=0;w<p;w++){const b=w%3*2/3-1,T=w>2?0:-1,F=[b,T,0,b+2/3,T,0,b+2/3,T+1,0,b,T,0,b+2/3,T+1,0,b,T+1,0];S.set(F,_*m*w),v.set(d,u*m*w);const x=[w,w,w,w,w,w];M.set(x,g*m*w)}const R=new Bt;R.setAttribute("position",new jt(S,_)),R.setAttribute("uv",new jt(v,u)),R.setAttribute("faceIndex",new jt(M,g)),e.push(R),s>js&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function cu(i,e,t){const n=new ys(i,e,t);return n.texture.mapping=Aa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Lo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function S_(i,e,t){const n=new Float32Array(gs),s=new N(0,1,0);return new Ni({name:"SphericalGaussianBlur",defines:{n:gs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ih(),fragmentShader:`

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
		`,blending:es,depthTest:!1,depthWrite:!1})}function lu(){return new Ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ih(),fragmentShader:`

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
		`,blending:es,depthTest:!1,depthWrite:!1})}function hu(){return new Ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ih(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:es,depthTest:!1,depthWrite:!1})}function ih(){return`

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
	`}function w_(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Zc||c===Jc,h=c===hr||c===ur;if(l||h){let f=e.get(a);const d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Al(i)),f=l?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Al(i)),f=l?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function E_(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ha("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function b_(i,e,t,n){const s={},r=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);for(const m in d.morphAttributes){const _=d.morphAttributes[m];for(let u=0,g=_.length;u<g;u++)e.remove(_[u])}d.removeEventListener("dispose",o),delete s[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const m in d)e.update(d[m],i.ARRAY_BUFFER);const p=f.morphAttributes;for(const m in p){const _=p[m];for(let u=0,g=_.length;u<g;u++)e.update(_[u],i.ARRAY_BUFFER)}}function l(f){const d=[],p=f.index,m=f.attributes.position;let _=0;if(p!==null){const S=p.array;_=p.version;for(let v=0,M=S.length;v<M;v+=3){const R=S[v+0],w=S[v+1],b=S[v+2];d.push(R,w,w,b,b,R)}}else if(m!==void 0){const S=m.array;_=m.version;for(let v=0,M=S.length/3-1;v<M;v+=3){const R=v+0,w=v+1,b=v+2;d.push(R,w,w,b,b,R)}}else return;const u=new(Wd(d)?jd:$d)(d,1);u.version=_;const g=r.get(f);g&&e.remove(g),r.set(f,u)}function h(f){const d=r.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function T_(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,p){i.drawElements(n,p,r,d*o),t.update(p,n,1)}function l(d,p,m){m!==0&&(i.drawElementsInstanced(n,p,r,d*o,m),t.update(p,n,m))}function h(d,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,m);let u=0;for(let g=0;g<m;g++)u+=p[g];t.update(u,n,1)}function f(d,p,m,_){if(m===0)return;const u=e.get("WEBGL_multi_draw");if(u===null)for(let g=0;g<d.length;g++)l(d[g]/o,p[g],_[g]);else{u.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,_,0,m);let g=0;for(let S=0;S<m;S++)g+=p[S];for(let S=0;S<_.length;S++)t.update(g,n,_[S])}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function A_(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function R_(i,e,t){const n=new WeakMap,s=new at;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==f){let F=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",F)};d!==void 0&&d.texture.dispose();const p=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let v=0;p===!0&&(v=1),m===!0&&(v=2),_===!0&&(v=3);let M=a.attributes.position.count*v,R=1;M>e.maxTextureSize&&(R=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const w=new Float32Array(M*R*4*f),b=new qd(w,M,R,f);b.type=wn,b.needsUpdate=!0;const T=v*4;for(let x=0;x<f;x++){const y=u[x],D=g[x],L=S[x],I=M*R*4*x;for(let B=0;B<y.count;B++){const U=B*T;p===!0&&(s.fromBufferAttribute(y,B),w[I+U+0]=s.x,w[I+U+1]=s.y,w[I+U+2]=s.z,w[I+U+3]=0),m===!0&&(s.fromBufferAttribute(D,B),w[I+U+4]=s.x,w[I+U+5]=s.y,w[I+U+6]=s.z,w[I+U+7]=0),_===!0&&(s.fromBufferAttribute(L,B),w[I+U+8]=s.x,w[I+U+9]=s.y,w[I+U+10]=s.z,w[I+U+11]=L.itemSize===4?s.w:1)}}d={count:f,texture:b,size:new ue(M,R)},n.set(a,d),a.addEventListener("dispose",F)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];const m=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function C_(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,f=e.get(c,h);if(s.get(f)!==l&&(e.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return f}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class nf extends Ht{constructor(e,t,n,s,r,o,a,c,l,h=tr){if(h!==tr&&h!==fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===tr&&(n=vs),n===void 0&&h===fr&&(n=dr),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:mn,this.minFilter=c!==void 0?c:mn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const sf=new Ht,uu=new nf(1,1),rf=new qd,of=new fm,af=new ef,du=[],fu=[],pu=new Float32Array(16),mu=new Float32Array(9),gu=new Float32Array(4);function Sr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=du[s];if(r===void 0&&(r=new Float32Array(s),du[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Pa(i,e){let t=fu[e];t===void 0&&(t=new Int32Array(e),fu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function P_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function L_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function I_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function D_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function N_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;gu.set(n),i.uniformMatrix2fv(this.addr,!1,gu),Gt(t,n)}}function U_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;mu.set(n),i.uniformMatrix3fv(this.addr,!1,mu),Gt(t,n)}}function F_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;pu.set(n),i.uniformMatrix4fv(this.addr,!1,pu),Gt(t,n)}}function O_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function B_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function z_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function k_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function H_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function V_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function G_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function W_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function X_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(uu.compareFunction=Gd,r=uu):r=sf,t.setTexture2D(e||r,s)}function q_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||of,s)}function K_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||af,s)}function Y_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||rf,s)}function $_(i){switch(i){case 5126:return P_;case 35664:return L_;case 35665:return I_;case 35666:return D_;case 35674:return N_;case 35675:return U_;case 35676:return F_;case 5124:case 35670:return O_;case 35667:case 35671:return B_;case 35668:case 35672:return z_;case 35669:case 35673:return k_;case 5125:return H_;case 36294:return V_;case 36295:return G_;case 36296:return W_;case 35678:case 36198:case 36298:case 36306:case 35682:return X_;case 35679:case 36299:case 36307:return q_;case 35680:case 36300:case 36308:case 36293:return K_;case 36289:case 36303:case 36311:case 36292:return Y_}}function j_(i,e){i.uniform1fv(this.addr,e)}function Z_(i,e){const t=Sr(e,this.size,2);i.uniform2fv(this.addr,t)}function J_(i,e){const t=Sr(e,this.size,3);i.uniform3fv(this.addr,t)}function Q_(i,e){const t=Sr(e,this.size,4);i.uniform4fv(this.addr,t)}function ex(i,e){const t=Sr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function tx(i,e){const t=Sr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function nx(i,e){const t=Sr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ix(i,e){i.uniform1iv(this.addr,e)}function sx(i,e){i.uniform2iv(this.addr,e)}function rx(i,e){i.uniform3iv(this.addr,e)}function ox(i,e){i.uniform4iv(this.addr,e)}function ax(i,e){i.uniform1uiv(this.addr,e)}function cx(i,e){i.uniform2uiv(this.addr,e)}function lx(i,e){i.uniform3uiv(this.addr,e)}function hx(i,e){i.uniform4uiv(this.addr,e)}function ux(i,e,t){const n=this.cache,s=e.length,r=Pa(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||sf,r[o])}function dx(i,e,t){const n=this.cache,s=e.length,r=Pa(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||of,r[o])}function fx(i,e,t){const n=this.cache,s=e.length,r=Pa(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||af,r[o])}function px(i,e,t){const n=this.cache,s=e.length,r=Pa(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||rf,r[o])}function mx(i){switch(i){case 5126:return j_;case 35664:return Z_;case 35665:return J_;case 35666:return Q_;case 35674:return ex;case 35675:return tx;case 35676:return nx;case 5124:case 35670:return ix;case 35667:case 35671:return sx;case 35668:case 35672:return rx;case 35669:case 35673:return ox;case 5125:return ax;case 36294:return cx;case 36295:return lx;case 36296:return hx;case 35678:case 36198:case 36298:case 36306:case 35682:return ux;case 35679:case 36299:case 36307:return dx;case 35680:case 36300:case 36308:case 36293:return fx;case 36289:case 36303:case 36311:case 36292:return px}}class gx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$_(t.type)}}class _x{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mx(t.type)}}class xx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const fc=/(\w+)(\])?(\[|\.)?/g;function _u(i,e){i.seq.push(e),i.map[e.id]=e}function vx(i,e,t){const n=i.name,s=n.length;for(fc.lastIndex=0;;){const r=fc.exec(n),o=fc.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){_u(t,l===void 0?new gx(a,i,e):new _x(a,i,e));break}else{let f=t.map[a];f===void 0&&(f=new xx(a),_u(t,f)),t=f}}}class ua{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);vx(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function xu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const yx=37297;let Mx=0;function Sx(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function wx(i){const e=rt.getPrimaries(rt.workingColorSpace),t=rt.getPrimaries(i);let n;switch(e===t?n="":e===xa&&t===_a?n="LinearDisplayP3ToLinearSRGB":e===_a&&t===xa&&(n="LinearSRGBToLinearDisplayP3"),i){case Zt:case Ra:return[n,"LinearTransferOETF"];case cn:case Ql:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function vu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Sx(i.getShaderSource(e),o)}else return s}function Ex(i,e){const t=wx(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function bx(i,e){let t;switch(e){case Sp:t="Linear";break;case wp:t="Reinhard";break;case Ep:t="Cineon";break;case Cd:t="ACESFilmic";break;case Tp:t="AgX";break;case Ap:t="Neutral";break;case bp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Io=new N;function Tx(){rt.getLuminanceCoefficients(Io);const i=Io.x.toFixed(4),e=Io.y.toFixed(4),t=Io.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ax(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hr).join(`
`)}function Rx(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Cx(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Hr(i){return i!==""}function yu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Px=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rl(i){return i.replace(Px,Ix)}const Lx=new Map;function Ix(i,e){let t=Ze[e];if(t===void 0){const n=Lx.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Rl(t)}const Dx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Su(i){return i.replace(Dx,Nx)}function Nx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Ux(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Td?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ad?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===bi&&(e="SHADOWMAP_TYPE_VSM"),e}function Fx(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case hr:case ur:e="ENVMAP_TYPE_CUBE";break;case Aa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ox(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ur:e="ENVMAP_MODE_REFRACTION";break}return e}function Bx(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Rd:e="ENVMAP_BLENDING_MULTIPLY";break;case yp:e="ENVMAP_BLENDING_MIX";break;case Mp:e="ENVMAP_BLENDING_ADD";break}return e}function zx(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function kx(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Ux(t),l=Fx(t),h=Ox(t),f=Bx(t),d=zx(t),p=Ax(t),m=Rx(r),_=s.createProgram();let u,g,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Hr).join(`
`),u.length>0&&(u+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Hr).join(`
`),g.length>0&&(g+=`
`)):(u=[wu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hr).join(`
`),g=[wu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ts?"#define TONE_MAPPING":"",t.toneMapping!==ts?Ze.tonemapping_pars_fragment:"",t.toneMapping!==ts?bx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Ex("linearToOutputTexel",t.outputColorSpace),Tx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hr).join(`
`)),o=Rl(o),o=yu(o,t),o=Mu(o,t),a=Rl(a),a=yu(a,t),a=Mu(a,t),o=Su(o),a=Su(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,u=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,g=["#define varying in",t.glslVersion===kh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===kh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const v=S+u+o,M=S+g+a,R=xu(s,s.VERTEX_SHADER,v),w=xu(s,s.FRAGMENT_SHADER,M);s.attachShader(_,R),s.attachShader(_,w),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function b(y){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(_).trim(),L=s.getShaderInfoLog(R).trim(),I=s.getShaderInfoLog(w).trim();let B=!0,U=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,w);else{const G=vu(s,R,"vertex"),O=vu(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+D+`
`+G+`
`+O)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(L===""||I==="")&&(U=!1);U&&(y.diagnostics={runnable:B,programLog:D,vertexShader:{log:L,prefix:u},fragmentShader:{log:I,prefix:g}})}s.deleteShader(R),s.deleteShader(w),T=new ua(s,_),F=Cx(s,_)}let T;this.getUniforms=function(){return T===void 0&&b(this),T};let F;this.getAttributes=function(){return F===void 0&&b(this),F};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,yx)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Mx++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=w,this}let Hx=0;class Vx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Gx(e),t.set(e,n)),n}}class Gx{constructor(e){this.id=Hx++,this.code=e,this.usedTimes=0}}function Wx(i,e,t,n,s,r,o){const a=new Kd,c=new Vx,l=new Set,h=[],f=s.logarithmicDepthBuffer,d=s.reverseDepthBuffer,p=s.vertexTextures;let m=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(x){return l.add(x),x===0?"uv":`uv${x}`}function g(x,y,D,L,I){const B=L.fog,U=I.geometry,G=x.isMeshStandardMaterial?L.environment:null,O=(x.isMeshStandardMaterial?t:e).get(x.envMap||G),J=O&&O.mapping===Aa?O.image.height:null,j=_[x.type];x.precision!==null&&(m=s.getMaxPrecision(x.precision),m!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",m,"instead."));const ce=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Te=ce!==void 0?ce.length:0;let Le=0;U.morphAttributes.position!==void 0&&(Le=1),U.morphAttributes.normal!==void 0&&(Le=2),U.morphAttributes.color!==void 0&&(Le=3);let K,ae,_e,fe;if(j){const vn=li[j];K=vn.vertexShader,ae=vn.fragmentShader}else K=x.vertexShader,ae=x.fragmentShader,c.update(x),_e=c.getVertexShaderID(x),fe=c.getFragmentShaderID(x);const De=i.getRenderTarget(),Ne=I.isInstancedMesh===!0,Pe=I.isBatchedMesh===!0,He=!!x.map,ie=!!x.matcap,C=!!O,Y=!!x.aoMap,ee=!!x.lightMap,ne=!!x.bumpMap,se=!!x.normalMap,pe=!!x.displacementMap,ge=!!x.emissiveMap,P=!!x.metalnessMap,E=!!x.roughnessMap,V=x.anisotropy>0,te=x.clearcoat>0,re=x.dispersion>0,Q=x.iridescence>0,Re=x.sheen>0,me=x.transmission>0,Ee=V&&!!x.anisotropyMap,tt=te&&!!x.clearcoatMap,le=te&&!!x.clearcoatNormalMap,be=te&&!!x.clearcoatRoughnessMap,Ye=Q&&!!x.iridescenceMap,$e=Q&&!!x.iridescenceThicknessMap,Ae=Re&&!!x.sheenColorMap,nt=Re&&!!x.sheenRoughnessMap,je=!!x.specularMap,vt=!!x.specularColorMap,z=!!x.specularIntensityMap,Se=me&&!!x.transmissionMap,$=me&&!!x.thicknessMap,oe=!!x.gradientMap,ye=!!x.alphaMap,we=x.alphaTest>0,it=!!x.alphaHash,Pt=!!x.extensions;let xn=ts;x.toneMapped&&(De===null||De.isXRRenderTarget===!0)&&(xn=i.toneMapping);const ot={shaderID:j,shaderType:x.type,shaderName:x.name,vertexShader:K,fragmentShader:ae,defines:x.defines,customVertexShaderID:_e,customFragmentShaderID:fe,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:m,batching:Pe,batchingColor:Pe&&I._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&I.instanceColor!==null,instancingMorph:Ne&&I.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:De===null?i.outputColorSpace:De.isXRRenderTarget===!0?De.texture.colorSpace:Zt,alphaToCoverage:!!x.alphaToCoverage,map:He,matcap:ie,envMap:C,envMapMode:C&&O.mapping,envMapCubeUVHeight:J,aoMap:Y,lightMap:ee,bumpMap:ne,normalMap:se,displacementMap:p&&pe,emissiveMap:ge,normalMapObjectSpace:se&&x.normalMapType===Dp,normalMapTangentSpace:se&&x.normalMapType===Vd,metalnessMap:P,roughnessMap:E,anisotropy:V,anisotropyMap:Ee,clearcoat:te,clearcoatMap:tt,clearcoatNormalMap:le,clearcoatRoughnessMap:be,dispersion:re,iridescence:Q,iridescenceMap:Ye,iridescenceThicknessMap:$e,sheen:Re,sheenColorMap:Ae,sheenRoughnessMap:nt,specularMap:je,specularColorMap:vt,specularIntensityMap:z,transmission:me,transmissionMap:Se,thicknessMap:$,gradientMap:oe,opaque:x.transparent===!1&&x.blending===er&&x.alphaToCoverage===!1,alphaMap:ye,alphaTest:we,alphaHash:it,combine:x.combine,mapUv:He&&u(x.map.channel),aoMapUv:Y&&u(x.aoMap.channel),lightMapUv:ee&&u(x.lightMap.channel),bumpMapUv:ne&&u(x.bumpMap.channel),normalMapUv:se&&u(x.normalMap.channel),displacementMapUv:pe&&u(x.displacementMap.channel),emissiveMapUv:ge&&u(x.emissiveMap.channel),metalnessMapUv:P&&u(x.metalnessMap.channel),roughnessMapUv:E&&u(x.roughnessMap.channel),anisotropyMapUv:Ee&&u(x.anisotropyMap.channel),clearcoatMapUv:tt&&u(x.clearcoatMap.channel),clearcoatNormalMapUv:le&&u(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&u(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ye&&u(x.iridescenceMap.channel),iridescenceThicknessMapUv:$e&&u(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&u(x.sheenColorMap.channel),sheenRoughnessMapUv:nt&&u(x.sheenRoughnessMap.channel),specularMapUv:je&&u(x.specularMap.channel),specularColorMapUv:vt&&u(x.specularColorMap.channel),specularIntensityMapUv:z&&u(x.specularIntensityMap.channel),transmissionMapUv:Se&&u(x.transmissionMap.channel),thicknessMapUv:$&&u(x.thicknessMap.channel),alphaMapUv:ye&&u(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(se||V),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!U.attributes.uv&&(He||ye),fog:!!B,useFog:x.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:d,skinning:I.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Le,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:xn,decodeVideoTexture:He&&x.map.isVideoTexture===!0&&rt.getTransfer(x.map.colorSpace)===Et,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===tn,flipSided:x.side===gn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Pt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&x.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ot.vertexUv1s=l.has(1),ot.vertexUv2s=l.has(2),ot.vertexUv3s=l.has(3),l.clear(),ot}function S(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)y.push(D),y.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(v(y,x),M(y,x),y.push(i.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function v(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function M(x,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.alphaToCoverage&&a.enable(20),x.push(a.mask)}function R(x){const y=_[x.type];let D;if(y){const L=li[y];D=Jd.clone(L.uniforms)}else D=x.uniforms;return D}function w(x,y){let D;for(let L=0,I=h.length;L<I;L++){const B=h[L];if(B.cacheKey===y){D=B,++D.usedTimes;break}}return D===void 0&&(D=new kx(i,y,x,r),h.push(D)),D}function b(x){if(--x.usedTimes===0){const y=h.indexOf(x);h[y]=h[h.length-1],h.pop(),x.destroy()}}function T(x){c.remove(x)}function F(){c.dispose()}return{getParameters:g,getProgramCacheKey:S,getUniforms:R,acquireProgram:w,releaseProgram:b,releaseShaderCache:T,programs:h,dispose:F}}function Xx(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function qx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Eu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f,d,p,m,_,u){let g=i[e];return g===void 0?(g={id:f.id,object:f,geometry:d,material:p,groupOrder:m,renderOrder:f.renderOrder,z:_,group:u},i[e]=g):(g.id=f.id,g.object=f,g.geometry=d,g.material=p,g.groupOrder=m,g.renderOrder=f.renderOrder,g.z=_,g.group=u),e++,g}function a(f,d,p,m,_,u){const g=o(f,d,p,m,_,u);p.transmission>0?n.push(g):p.transparent===!0?s.push(g):t.push(g)}function c(f,d,p,m,_,u){const g=o(f,d,p,m,_,u);p.transmission>0?n.unshift(g):p.transparent===!0?s.unshift(g):t.unshift(g)}function l(f,d){t.length>1&&t.sort(f||qx),n.length>1&&n.sort(d||Eu),s.length>1&&s.sort(d||Eu)}function h(){for(let f=e,d=i.length;f<d;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Kx(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new bu,i.set(n,[o])):s>=r.length?(o=new bu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Yx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new ze};break;case"SpotLight":t={position:new N,direction:new N,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function $x(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let jx=0;function Zx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Jx(i){const e=new Yx,t=$x(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new qe,o=new qe;function a(l){let h=0,f=0,d=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let p=0,m=0,_=0,u=0,g=0,S=0,v=0,M=0,R=0,w=0,b=0;l.sort(Zx);for(let F=0,x=l.length;F<x;F++){const y=l[F],D=y.color,L=y.intensity,I=y.distance,B=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)h+=D.r*L,f+=D.g*L,d+=D.b*L;else if(y.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(y.sh.coefficients[U],L);b++}else if(y.isDirectionalLight){const U=e.get(y);if(U.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const G=y.shadow,O=t.get(y);O.shadowIntensity=G.intensity,O.shadowBias=G.bias,O.shadowNormalBias=G.normalBias,O.shadowRadius=G.radius,O.shadowMapSize=G.mapSize,n.directionalShadow[p]=O,n.directionalShadowMap[p]=B,n.directionalShadowMatrix[p]=y.shadow.matrix,S++}n.directional[p]=U,p++}else if(y.isSpotLight){const U=e.get(y);U.position.setFromMatrixPosition(y.matrixWorld),U.color.copy(D).multiplyScalar(L),U.distance=I,U.coneCos=Math.cos(y.angle),U.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),U.decay=y.decay,n.spot[_]=U;const G=y.shadow;if(y.map&&(n.spotLightMap[R]=y.map,R++,G.updateMatrices(y),y.castShadow&&w++),n.spotLightMatrix[_]=G.matrix,y.castShadow){const O=t.get(y);O.shadowIntensity=G.intensity,O.shadowBias=G.bias,O.shadowNormalBias=G.normalBias,O.shadowRadius=G.radius,O.shadowMapSize=G.mapSize,n.spotShadow[_]=O,n.spotShadowMap[_]=B,M++}_++}else if(y.isRectAreaLight){const U=e.get(y);U.color.copy(D).multiplyScalar(L),U.halfWidth.set(y.width*.5,0,0),U.halfHeight.set(0,y.height*.5,0),n.rectArea[u]=U,u++}else if(y.isPointLight){const U=e.get(y);if(U.color.copy(y.color).multiplyScalar(y.intensity),U.distance=y.distance,U.decay=y.decay,y.castShadow){const G=y.shadow,O=t.get(y);O.shadowIntensity=G.intensity,O.shadowBias=G.bias,O.shadowNormalBias=G.normalBias,O.shadowRadius=G.radius,O.shadowMapSize=G.mapSize,O.shadowCameraNear=G.camera.near,O.shadowCameraFar=G.camera.far,n.pointShadow[m]=O,n.pointShadowMap[m]=B,n.pointShadowMatrix[m]=y.shadow.matrix,v++}n.point[m]=U,m++}else if(y.isHemisphereLight){const U=e.get(y);U.skyColor.copy(y.color).multiplyScalar(L),U.groundColor.copy(y.groundColor).multiplyScalar(L),n.hemi[g]=U,g++}}u>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=d;const T=n.hash;(T.directionalLength!==p||T.pointLength!==m||T.spotLength!==_||T.rectAreaLength!==u||T.hemiLength!==g||T.numDirectionalShadows!==S||T.numPointShadows!==v||T.numSpotShadows!==M||T.numSpotMaps!==R||T.numLightProbes!==b)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=u,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=M+R-w,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=b,T.directionalLength=p,T.pointLength=m,T.spotLength=_,T.rectAreaLength=u,T.hemiLength=g,T.numDirectionalShadows=S,T.numPointShadows=v,T.numSpotShadows=M,T.numSpotMaps=R,T.numLightProbes=b,n.version=jx++)}function c(l,h){let f=0,d=0,p=0,m=0,_=0;const u=h.matrixWorldInverse;for(let g=0,S=l.length;g<S;g++){const v=l[g];if(v.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(u),f++}else if(v.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(u),M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(u),p++}else if(v.isRectAreaLight){const M=n.rectArea[m];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(u),o.identity(),r.copy(v.matrixWorld),r.premultiply(u),o.extractRotation(r),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),m++}else if(v.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(u),d++}else if(v.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(u),_++}}}return{setup:a,setupView:c,state:n}}function Tu(i){const e=new Jx(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Qx(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Tu(i),e.set(s,[a])):r>=o.length?(a=new Tu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class ev extends si{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class tv extends si{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const nv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iv=`uniform sampler2D shadow_pass;
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
}`;function sv(i,e,t){let n=new th;const s=new ue,r=new ue,o=new at,a=new ev({depthPacking:Ip}),c=new tv,l={},h=t.maxTextureSize,f={[Ii]:gn,[gn]:Ii,[tn]:tn},d=new Ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:nv,fragmentShader:iv}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const m=new Bt;m.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new X(m,d),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Td;let g=this.type;this.render=function(w,b,T){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||w.length===0)return;const F=i.getRenderTarget(),x=i.getActiveCubeFace(),y=i.getActiveMipmapLevel(),D=i.state;D.setBlending(es),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const L=g!==bi&&this.type===bi,I=g===bi&&this.type!==bi;for(let B=0,U=w.length;B<U;B++){const G=w[B],O=G.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const J=O.getFrameExtents();if(s.multiply(J),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,O.mapSize.y=r.y)),O.map===null||L===!0||I===!0){const ce=this.type!==bi?{minFilter:mn,magFilter:mn}:{};O.map!==null&&O.map.dispose(),O.map=new ys(s.x,s.y,ce),O.map.texture.name=G.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const j=O.getViewportCount();for(let ce=0;ce<j;ce++){const Te=O.getViewport(ce);o.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),D.viewport(o),O.updateMatrices(G,ce),n=O.getFrustum(),M(b,T,O.camera,G,this.type)}O.isPointLightShadow!==!0&&this.type===bi&&S(O,T),O.needsUpdate=!1}g=this.type,u.needsUpdate=!1,i.setRenderTarget(F,x,y)};function S(w,b){const T=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ys(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(b,null,T,d,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(b,null,T,p,_,null)}function v(w,b,T,F){let x=null;const y=T.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(y!==void 0)x=y;else if(x=T.isPointLight===!0?c:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const D=x.uuid,L=b.uuid;let I=l[D];I===void 0&&(I={},l[D]=I);let B=I[L];B===void 0&&(B=x.clone(),I[L]=B,b.addEventListener("dispose",R)),x=B}if(x.visible=b.visible,x.wireframe=b.wireframe,F===bi?x.side=b.shadowSide!==null?b.shadowSide:b.side:x.side=b.shadowSide!==null?b.shadowSide:f[b.side],x.alphaMap=b.alphaMap,x.alphaTest=b.alphaTest,x.map=b.map,x.clipShadows=b.clipShadows,x.clippingPlanes=b.clippingPlanes,x.clipIntersection=b.clipIntersection,x.displacementMap=b.displacementMap,x.displacementScale=b.displacementScale,x.displacementBias=b.displacementBias,x.wireframeLinewidth=b.wireframeLinewidth,x.linewidth=b.linewidth,T.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const D=i.properties.get(x);D.light=T}return x}function M(w,b,T,F,x){if(w.visible===!1)return;if(w.layers.test(b.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===bi)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,w.matrixWorld);const L=e.update(w),I=w.material;if(Array.isArray(I)){const B=L.groups;for(let U=0,G=B.length;U<G;U++){const O=B[U],J=I[O.materialIndex];if(J&&J.visible){const j=v(w,J,F,x);w.onBeforeShadow(i,w,b,T,L,j,O),i.renderBufferDirect(T,null,L,j,w,O),w.onAfterShadow(i,w,b,T,L,j,O)}}}else if(I.visible){const B=v(w,I,F,x);w.onBeforeShadow(i,w,b,T,L,B,null),i.renderBufferDirect(T,null,L,B,w,null),w.onAfterShadow(i,w,b,T,L,B,null)}}const D=w.children;for(let L=0,I=D.length;L<I;L++)M(D[L],b,T,F,x)}function R(w){w.target.removeEventListener("dispose",R);for(const T in l){const F=l[T],x=w.target.uuid;x in F&&(F[x].dispose(),delete F[x])}}}const rv={[Wc]:Xc,[qc]:$c,[Kc]:jc,[lr]:Yc,[Xc]:Wc,[$c]:qc,[jc]:Kc,[Yc]:lr};function ov(i){function e(){let z=!1;const Se=new at;let $=null;const oe=new at(0,0,0,0);return{setMask:function(ye){$!==ye&&!z&&(i.colorMask(ye,ye,ye,ye),$=ye)},setLocked:function(ye){z=ye},setClear:function(ye,we,it,Pt,xn){xn===!0&&(ye*=Pt,we*=Pt,it*=Pt),Se.set(ye,we,it,Pt),oe.equals(Se)===!1&&(i.clearColor(ye,we,it,Pt),oe.copy(Se))},reset:function(){z=!1,$=null,oe.set(-1,0,0,0)}}}function t(){let z=!1,Se=!1,$=null,oe=null,ye=null;return{setReversed:function(we){Se=we},setTest:function(we){we?_e(i.DEPTH_TEST):fe(i.DEPTH_TEST)},setMask:function(we){$!==we&&!z&&(i.depthMask(we),$=we)},setFunc:function(we){if(Se&&(we=rv[we]),oe!==we){switch(we){case Wc:i.depthFunc(i.NEVER);break;case Xc:i.depthFunc(i.ALWAYS);break;case qc:i.depthFunc(i.LESS);break;case lr:i.depthFunc(i.LEQUAL);break;case Kc:i.depthFunc(i.EQUAL);break;case Yc:i.depthFunc(i.GEQUAL);break;case $c:i.depthFunc(i.GREATER);break;case jc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=we}},setLocked:function(we){z=we},setClear:function(we){ye!==we&&(i.clearDepth(we),ye=we)},reset:function(){z=!1,$=null,oe=null,ye=null}}}function n(){let z=!1,Se=null,$=null,oe=null,ye=null,we=null,it=null,Pt=null,xn=null;return{setTest:function(ot){z||(ot?_e(i.STENCIL_TEST):fe(i.STENCIL_TEST))},setMask:function(ot){Se!==ot&&!z&&(i.stencilMask(ot),Se=ot)},setFunc:function(ot,vn,xi){($!==ot||oe!==vn||ye!==xi)&&(i.stencilFunc(ot,vn,xi),$=ot,oe=vn,ye=xi)},setOp:function(ot,vn,xi){(we!==ot||it!==vn||Pt!==xi)&&(i.stencilOp(ot,vn,xi),we=ot,it=vn,Pt=xi)},setLocked:function(ot){z=ot},setClear:function(ot){xn!==ot&&(i.clearStencil(ot),xn=ot)},reset:function(){z=!1,Se=null,$=null,oe=null,ye=null,we=null,it=null,Pt=null,xn=null}}}const s=new e,r=new t,o=new n,a=new WeakMap,c=new WeakMap;let l={},h={},f=new WeakMap,d=[],p=null,m=!1,_=null,u=null,g=null,S=null,v=null,M=null,R=null,w=new ze(0,0,0),b=0,T=!1,F=null,x=null,y=null,D=null,L=null;const I=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,U=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(G)[1]),B=U>=1):G.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),B=U>=2);let O=null,J={};const j=i.getParameter(i.SCISSOR_BOX),ce=i.getParameter(i.VIEWPORT),Te=new at().fromArray(j),Le=new at().fromArray(ce);function K(z,Se,$,oe){const ye=new Uint8Array(4),we=i.createTexture();i.bindTexture(z,we),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let it=0;it<$;it++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(Se,0,i.RGBA,1,1,oe,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(Se+it,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return we}const ae={};ae[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),ae[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ae[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),_e(i.DEPTH_TEST),r.setFunc(lr),ee(!1),ne(Ih),_e(i.CULL_FACE),C(es);function _e(z){l[z]!==!0&&(i.enable(z),l[z]=!0)}function fe(z){l[z]!==!1&&(i.disable(z),l[z]=!1)}function De(z,Se){return h[z]!==Se?(i.bindFramebuffer(z,Se),h[z]=Se,z===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Se),z===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Se),!0):!1}function Ne(z,Se){let $=d,oe=!1;if(z){$=f.get(Se),$===void 0&&($=[],f.set(Se,$));const ye=z.textures;if($.length!==ye.length||$[0]!==i.COLOR_ATTACHMENT0){for(let we=0,it=ye.length;we<it;we++)$[we]=i.COLOR_ATTACHMENT0+we;$.length=ye.length,oe=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,oe=!0);oe&&i.drawBuffers($)}function Pe(z){return p!==z?(i.useProgram(z),p=z,!0):!1}const He={[ms]:i.FUNC_ADD,[ip]:i.FUNC_SUBTRACT,[sp]:i.FUNC_REVERSE_SUBTRACT};He[rp]=i.MIN,He[op]=i.MAX;const ie={[ap]:i.ZERO,[cp]:i.ONE,[lp]:i.SRC_COLOR,[Vc]:i.SRC_ALPHA,[mp]:i.SRC_ALPHA_SATURATE,[fp]:i.DST_COLOR,[up]:i.DST_ALPHA,[hp]:i.ONE_MINUS_SRC_COLOR,[Gc]:i.ONE_MINUS_SRC_ALPHA,[pp]:i.ONE_MINUS_DST_COLOR,[dp]:i.ONE_MINUS_DST_ALPHA,[gp]:i.CONSTANT_COLOR,[_p]:i.ONE_MINUS_CONSTANT_COLOR,[xp]:i.CONSTANT_ALPHA,[vp]:i.ONE_MINUS_CONSTANT_ALPHA};function C(z,Se,$,oe,ye,we,it,Pt,xn,ot){if(z===es){m===!0&&(fe(i.BLEND),m=!1);return}if(m===!1&&(_e(i.BLEND),m=!0),z!==np){if(z!==_||ot!==T){if((u!==ms||v!==ms)&&(i.blendEquation(i.FUNC_ADD),u=ms,v=ms),ot)switch(z){case er:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zr:i.blendFunc(i.ONE,i.ONE);break;case Dh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case er:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Dh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}g=null,S=null,M=null,R=null,w.set(0,0,0),b=0,_=z,T=ot}return}ye=ye||Se,we=we||$,it=it||oe,(Se!==u||ye!==v)&&(i.blendEquationSeparate(He[Se],He[ye]),u=Se,v=ye),($!==g||oe!==S||we!==M||it!==R)&&(i.blendFuncSeparate(ie[$],ie[oe],ie[we],ie[it]),g=$,S=oe,M=we,R=it),(Pt.equals(w)===!1||xn!==b)&&(i.blendColor(Pt.r,Pt.g,Pt.b,xn),w.copy(Pt),b=xn),_=z,T=!1}function Y(z,Se){z.side===tn?fe(i.CULL_FACE):_e(i.CULL_FACE);let $=z.side===gn;Se&&($=!$),ee($),z.blending===er&&z.transparent===!1?C(es):C(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),r.setFunc(z.depthFunc),r.setTest(z.depthTest),r.setMask(z.depthWrite),s.setMask(z.colorWrite);const oe=z.stencilWrite;o.setTest(oe),oe&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),pe(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?_e(i.SAMPLE_ALPHA_TO_COVERAGE):fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function ee(z){F!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),F=z)}function ne(z){z!==ep?(_e(i.CULL_FACE),z!==x&&(z===Ih?i.cullFace(i.BACK):z===tp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):fe(i.CULL_FACE),x=z}function se(z){z!==y&&(B&&i.lineWidth(z),y=z)}function pe(z,Se,$){z?(_e(i.POLYGON_OFFSET_FILL),(D!==Se||L!==$)&&(i.polygonOffset(Se,$),D=Se,L=$)):fe(i.POLYGON_OFFSET_FILL)}function ge(z){z?_e(i.SCISSOR_TEST):fe(i.SCISSOR_TEST)}function P(z){z===void 0&&(z=i.TEXTURE0+I-1),O!==z&&(i.activeTexture(z),O=z)}function E(z,Se,$){$===void 0&&(O===null?$=i.TEXTURE0+I-1:$=O);let oe=J[$];oe===void 0&&(oe={type:void 0,texture:void 0},J[$]=oe),(oe.type!==z||oe.texture!==Se)&&(O!==$&&(i.activeTexture($),O=$),i.bindTexture(z,Se||ae[z]),oe.type=z,oe.texture=Se)}function V(){const z=J[O];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function te(){try{i.compressedTexImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function re(){try{i.compressedTexImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Q(){try{i.texSubImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Re(){try{i.texSubImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function me(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ee(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function tt(){try{i.texStorage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function le(){try{i.texStorage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function be(){try{i.texImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ye(){try{i.texImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function $e(z){Te.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),Te.copy(z))}function Ae(z){Le.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),Le.copy(z))}function nt(z,Se){let $=c.get(Se);$===void 0&&($=new WeakMap,c.set(Se,$));let oe=$.get(z);oe===void 0&&(oe=i.getUniformBlockIndex(Se,z.name),$.set(z,oe))}function je(z,Se){const oe=c.get(Se).get(z);a.get(Se)!==oe&&(i.uniformBlockBinding(Se,oe,z.__bindingPointIndex),a.set(Se,oe))}function vt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},O=null,J={},h={},f=new WeakMap,d=[],p=null,m=!1,_=null,u=null,g=null,S=null,v=null,M=null,R=null,w=new ze(0,0,0),b=0,T=!1,F=null,x=null,y=null,D=null,L=null,Te.set(0,0,i.canvas.width,i.canvas.height),Le.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:_e,disable:fe,bindFramebuffer:De,drawBuffers:Ne,useProgram:Pe,setBlending:C,setMaterial:Y,setFlipSided:ee,setCullFace:ne,setLineWidth:se,setPolygonOffset:pe,setScissorTest:ge,activeTexture:P,bindTexture:E,unbindTexture:V,compressedTexImage2D:te,compressedTexImage3D:re,texImage2D:be,texImage3D:Ye,updateUBOMapping:nt,uniformBlockBinding:je,texStorage2D:tt,texStorage3D:le,texSubImage2D:Q,texSubImage3D:Re,compressedTexSubImage2D:me,compressedTexSubImage3D:Ee,scissor:$e,viewport:Ae,reset:vt}}function Au(i,e,t,n){const s=av(n);switch(t){case Ud:return i*e;case Od:return i*e;case Bd:return i*e*2;case $l:return i*e/s.components*s.byteLength;case jl:return i*e/s.components*s.byteLength;case zd:return i*e*2/s.components*s.byteLength;case Zl:return i*e*2/s.components*s.byteLength;case Fd:return i*e*3/s.components*s.byteLength;case Wn:return i*e*4/s.components*s.byteLength;case Jl:return i*e*4/s.components*s.byteLength;case ra:case oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case aa:case ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case el:case nl:return Math.max(i,16)*Math.max(e,8)/4;case Qc:case tl:return Math.max(i,8)*Math.max(e,8)/2;case il:case sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case al:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case cl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ll:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case hl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ul:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case dl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case fl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case pl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ml:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case gl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case xl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case vl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case la:case yl:case Ml:return Math.ceil(i/4)*Math.ceil(e/4)*16;case kd:case Sl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case wl:case El:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function av(i){switch(i){case Di:case Id:return{byteLength:1,components:1};case Jr:case Dd:case Pi:return{byteLength:2,components:1};case Kl:case Yl:return{byteLength:2,components:4};case vs:case ql:case wn:return{byteLength:4,components:1};case Nd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function cv(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ue,h=new WeakMap;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,E){return p?new OffscreenCanvas(P,E):to("canvas")}function _(P,E,V){let te=1;const re=ge(P);if((re.width>V||re.height>V)&&(te=V/Math.max(re.width,re.height)),te<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Q=Math.floor(te*re.width),Re=Math.floor(te*re.height);f===void 0&&(f=m(Q,Re));const me=E?m(Q,Re):f;return me.width=Q,me.height=Re,me.getContext("2d").drawImage(P,0,0,Q,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+Q+"x"+Re+")."),me}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),P;return P}function u(P){return P.generateMipmaps&&P.minFilter!==mn&&P.minFilter!==$t}function g(P){i.generateMipmap(P)}function S(P,E,V,te,re=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Q=E;if(E===i.RED&&(V===i.FLOAT&&(Q=i.R32F),V===i.HALF_FLOAT&&(Q=i.R16F),V===i.UNSIGNED_BYTE&&(Q=i.R8)),E===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.R8UI),V===i.UNSIGNED_SHORT&&(Q=i.R16UI),V===i.UNSIGNED_INT&&(Q=i.R32UI),V===i.BYTE&&(Q=i.R8I),V===i.SHORT&&(Q=i.R16I),V===i.INT&&(Q=i.R32I)),E===i.RG&&(V===i.FLOAT&&(Q=i.RG32F),V===i.HALF_FLOAT&&(Q=i.RG16F),V===i.UNSIGNED_BYTE&&(Q=i.RG8)),E===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RG8UI),V===i.UNSIGNED_SHORT&&(Q=i.RG16UI),V===i.UNSIGNED_INT&&(Q=i.RG32UI),V===i.BYTE&&(Q=i.RG8I),V===i.SHORT&&(Q=i.RG16I),V===i.INT&&(Q=i.RG32I)),E===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),V===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),V===i.UNSIGNED_INT&&(Q=i.RGB32UI),V===i.BYTE&&(Q=i.RGB8I),V===i.SHORT&&(Q=i.RGB16I),V===i.INT&&(Q=i.RGB32I)),E===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),V===i.UNSIGNED_INT&&(Q=i.RGBA32UI),V===i.BYTE&&(Q=i.RGBA8I),V===i.SHORT&&(Q=i.RGBA16I),V===i.INT&&(Q=i.RGBA32I)),E===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),E===i.RGBA){const Re=re?ga:rt.getTransfer(te);V===i.FLOAT&&(Q=i.RGBA32F),V===i.HALF_FLOAT&&(Q=i.RGBA16F),V===i.UNSIGNED_BYTE&&(Q=Re===Et?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function v(P,E){let V;return P?E===null||E===vs||E===dr?V=i.DEPTH24_STENCIL8:E===wn?V=i.DEPTH32F_STENCIL8:E===Jr&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===vs||E===dr?V=i.DEPTH_COMPONENT24:E===wn?V=i.DEPTH_COMPONENT32F:E===Jr&&(V=i.DEPTH_COMPONENT16),V}function M(P,E){return u(P)===!0||P.isFramebufferTexture&&P.minFilter!==mn&&P.minFilter!==$t?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function R(P){const E=P.target;E.removeEventListener("dispose",R),b(E),E.isVideoTexture&&h.delete(E)}function w(P){const E=P.target;E.removeEventListener("dispose",w),F(E)}function b(P){const E=n.get(P);if(E.__webglInit===void 0)return;const V=P.source,te=d.get(V);if(te){const re=te[E.__cacheKey];re.usedTimes--,re.usedTimes===0&&T(P),Object.keys(te).length===0&&d.delete(V)}n.remove(P)}function T(P){const E=n.get(P);i.deleteTexture(E.__webglTexture);const V=P.source,te=d.get(V);delete te[E.__cacheKey],o.memory.textures--}function F(P){const E=n.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(E.__webglFramebuffer[te]))for(let re=0;re<E.__webglFramebuffer[te].length;re++)i.deleteFramebuffer(E.__webglFramebuffer[te][re]);else i.deleteFramebuffer(E.__webglFramebuffer[te]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[te])}else{if(Array.isArray(E.__webglFramebuffer))for(let te=0;te<E.__webglFramebuffer.length;te++)i.deleteFramebuffer(E.__webglFramebuffer[te]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let te=0;te<E.__webglColorRenderbuffer.length;te++)E.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[te]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const V=P.textures;for(let te=0,re=V.length;te<re;te++){const Q=n.get(V[te]);Q.__webglTexture&&(i.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(V[te])}n.remove(P)}let x=0;function y(){x=0}function D(){const P=x;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),x+=1,P}function L(P){const E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function I(P,E){const V=n.get(P);if(P.isVideoTexture&&se(P),P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){const te=P.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Le(V,P,E);return}}t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+E)}function B(P,E){const V=n.get(P);if(P.version>0&&V.__version!==P.version){Le(V,P,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+E)}function U(P,E){const V=n.get(P);if(P.version>0&&V.__version!==P.version){Le(V,P,E);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+E)}function G(P,E){const V=n.get(P);if(P.version>0&&V.__version!==P.version){K(V,P,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+E)}const O={[is]:i.REPEAT,[hi]:i.CLAMP_TO_EDGE,[ma]:i.MIRRORED_REPEAT},J={[mn]:i.NEAREST,[Ld]:i.NEAREST_MIPMAP_NEAREST,[kr]:i.NEAREST_MIPMAP_LINEAR,[$t]:i.LINEAR,[sa]:i.LINEAR_MIPMAP_NEAREST,[ui]:i.LINEAR_MIPMAP_LINEAR},j={[Np]:i.NEVER,[kp]:i.ALWAYS,[Up]:i.LESS,[Gd]:i.LEQUAL,[Fp]:i.EQUAL,[zp]:i.GEQUAL,[Op]:i.GREATER,[Bp]:i.NOTEQUAL};function ce(P,E){if(E.type===wn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===$t||E.magFilter===sa||E.magFilter===kr||E.magFilter===ui||E.minFilter===$t||E.minFilter===sa||E.minFilter===kr||E.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,O[E.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,O[E.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,O[E.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,J[E.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,J[E.minFilter]),E.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,j[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===mn||E.minFilter!==kr&&E.minFilter!==ui||E.type===wn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Te(P,E){let V=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",R));const te=E.source;let re=d.get(te);re===void 0&&(re={},d.set(te,re));const Q=L(E);if(Q!==P.__cacheKey){re[Q]===void 0&&(re[Q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),re[Q].usedTimes++;const Re=re[P.__cacheKey];Re!==void 0&&(re[P.__cacheKey].usedTimes--,Re.usedTimes===0&&T(E)),P.__cacheKey=Q,P.__webglTexture=re[Q].texture}return V}function Le(P,E,V){let te=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(te=i.TEXTURE_3D);const re=Te(P,E),Q=E.source;t.bindTexture(te,P.__webglTexture,i.TEXTURE0+V);const Re=n.get(Q);if(Q.version!==Re.__version||re===!0){t.activeTexture(i.TEXTURE0+V);const me=rt.getPrimaries(rt.workingColorSpace),Ee=E.colorSpace===Yi?null:rt.getPrimaries(E.colorSpace),tt=E.colorSpace===Yi||me===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let le=_(E.image,!1,s.maxTextureSize);le=pe(E,le);const be=r.convert(E.format,E.colorSpace),Ye=r.convert(E.type);let $e=S(E.internalFormat,be,Ye,E.colorSpace,E.isVideoTexture);ce(te,E);let Ae;const nt=E.mipmaps,je=E.isVideoTexture!==!0,vt=Re.__version===void 0||re===!0,z=Q.dataReady,Se=M(E,le);if(E.isDepthTexture)$e=v(E.format===fr,E.type),vt&&(je?t.texStorage2D(i.TEXTURE_2D,1,$e,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,$e,le.width,le.height,0,be,Ye,null));else if(E.isDataTexture)if(nt.length>0){je&&vt&&t.texStorage2D(i.TEXTURE_2D,Se,$e,nt[0].width,nt[0].height);for(let $=0,oe=nt.length;$<oe;$++)Ae=nt[$],je?z&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,Ae.width,Ae.height,be,Ye,Ae.data):t.texImage2D(i.TEXTURE_2D,$,$e,Ae.width,Ae.height,0,be,Ye,Ae.data);E.generateMipmaps=!1}else je?(vt&&t.texStorage2D(i.TEXTURE_2D,Se,$e,le.width,le.height),z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le.width,le.height,be,Ye,le.data)):t.texImage2D(i.TEXTURE_2D,0,$e,le.width,le.height,0,be,Ye,le.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){je&&vt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,$e,nt[0].width,nt[0].height,le.depth);for(let $=0,oe=nt.length;$<oe;$++)if(Ae=nt[$],E.format!==Wn)if(be!==null)if(je){if(z)if(E.layerUpdates.size>0){const ye=Au(Ae.width,Ae.height,E.format,E.type);for(const we of E.layerUpdates){const it=Ae.data.subarray(we*ye/Ae.data.BYTES_PER_ELEMENT,(we+1)*ye/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,we,Ae.width,Ae.height,1,be,it,0,0)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Ae.width,Ae.height,le.depth,be,Ae.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,$e,Ae.width,Ae.height,le.depth,0,Ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?z&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Ae.width,Ae.height,le.depth,be,Ye,Ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,$e,Ae.width,Ae.height,le.depth,0,be,Ye,Ae.data)}else{je&&vt&&t.texStorage2D(i.TEXTURE_2D,Se,$e,nt[0].width,nt[0].height);for(let $=0,oe=nt.length;$<oe;$++)Ae=nt[$],E.format!==Wn?be!==null?je?z&&t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,Ae.width,Ae.height,be,Ae.data):t.compressedTexImage2D(i.TEXTURE_2D,$,$e,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?z&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,Ae.width,Ae.height,be,Ye,Ae.data):t.texImage2D(i.TEXTURE_2D,$,$e,Ae.width,Ae.height,0,be,Ye,Ae.data)}else if(E.isDataArrayTexture)if(je){if(vt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,$e,le.width,le.height,le.depth),z)if(E.layerUpdates.size>0){const $=Au(le.width,le.height,E.format,E.type);for(const oe of E.layerUpdates){const ye=le.data.subarray(oe*$/le.data.BYTES_PER_ELEMENT,(oe+1)*$/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,le.width,le.height,1,be,Ye,ye)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,be,Ye,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,$e,le.width,le.height,le.depth,0,be,Ye,le.data);else if(E.isData3DTexture)je?(vt&&t.texStorage3D(i.TEXTURE_3D,Se,$e,le.width,le.height,le.depth),z&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,be,Ye,le.data)):t.texImage3D(i.TEXTURE_3D,0,$e,le.width,le.height,le.depth,0,be,Ye,le.data);else if(E.isFramebufferTexture){if(vt)if(je)t.texStorage2D(i.TEXTURE_2D,Se,$e,le.width,le.height);else{let $=le.width,oe=le.height;for(let ye=0;ye<Se;ye++)t.texImage2D(i.TEXTURE_2D,ye,$e,$,oe,0,be,Ye,null),$>>=1,oe>>=1}}else if(nt.length>0){if(je&&vt){const $=ge(nt[0]);t.texStorage2D(i.TEXTURE_2D,Se,$e,$.width,$.height)}for(let $=0,oe=nt.length;$<oe;$++)Ae=nt[$],je?z&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,be,Ye,Ae):t.texImage2D(i.TEXTURE_2D,$,$e,be,Ye,Ae);E.generateMipmaps=!1}else if(je){if(vt){const $=ge(le);t.texStorage2D(i.TEXTURE_2D,Se,$e,$.width,$.height)}z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,be,Ye,le)}else t.texImage2D(i.TEXTURE_2D,0,$e,be,Ye,le);u(E)&&g(te),Re.__version=Q.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function K(P,E,V){if(E.image.length!==6)return;const te=Te(P,E),re=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+V);const Q=n.get(re);if(re.version!==Q.__version||te===!0){t.activeTexture(i.TEXTURE0+V);const Re=rt.getPrimaries(rt.workingColorSpace),me=E.colorSpace===Yi?null:rt.getPrimaries(E.colorSpace),Ee=E.colorSpace===Yi||Re===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const tt=E.isCompressedTexture||E.image[0].isCompressedTexture,le=E.image[0]&&E.image[0].isDataTexture,be=[];for(let oe=0;oe<6;oe++)!tt&&!le?be[oe]=_(E.image[oe],!0,s.maxCubemapSize):be[oe]=le?E.image[oe].image:E.image[oe],be[oe]=pe(E,be[oe]);const Ye=be[0],$e=r.convert(E.format,E.colorSpace),Ae=r.convert(E.type),nt=S(E.internalFormat,$e,Ae,E.colorSpace),je=E.isVideoTexture!==!0,vt=Q.__version===void 0||te===!0,z=re.dataReady;let Se=M(E,Ye);ce(i.TEXTURE_CUBE_MAP,E);let $;if(tt){je&&vt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,nt,Ye.width,Ye.height);for(let oe=0;oe<6;oe++){$=be[oe].mipmaps;for(let ye=0;ye<$.length;ye++){const we=$[ye];E.format!==Wn?$e!==null?je?z&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye,0,0,we.width,we.height,$e,we.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye,nt,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye,0,0,we.width,we.height,$e,Ae,we.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye,nt,we.width,we.height,0,$e,Ae,we.data)}}}else{if($=E.mipmaps,je&&vt){$.length>0&&Se++;const oe=ge(be[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,nt,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(le){je?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,be[oe].width,be[oe].height,$e,Ae,be[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,nt,be[oe].width,be[oe].height,0,$e,Ae,be[oe].data);for(let ye=0;ye<$.length;ye++){const it=$[ye].image[oe].image;je?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye+1,0,0,it.width,it.height,$e,Ae,it.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye+1,nt,it.width,it.height,0,$e,Ae,it.data)}}else{je?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,$e,Ae,be[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,nt,$e,Ae,be[oe]);for(let ye=0;ye<$.length;ye++){const we=$[ye];je?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye+1,0,0,$e,Ae,we.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ye+1,nt,$e,Ae,we.image[oe])}}}u(E)&&g(i.TEXTURE_CUBE_MAP),Q.__version=re.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function ae(P,E,V,te,re,Q){const Re=r.convert(V.format,V.colorSpace),me=r.convert(V.type),Ee=S(V.internalFormat,Re,me,V.colorSpace);if(!n.get(E).__hasExternalTextures){const le=Math.max(1,E.width>>Q),be=Math.max(1,E.height>>Q);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,Q,Ee,le,be,E.depth,0,Re,me,null):t.texImage2D(re,Q,Ee,le,be,0,Re,me,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),ne(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,re,n.get(V).__webglTexture,0,ee(E)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,re,n.get(V).__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function _e(P,E,V){if(i.bindRenderbuffer(i.RENDERBUFFER,P),E.depthBuffer){const te=E.depthTexture,re=te&&te.isDepthTexture?te.type:null,Q=v(E.stencilBuffer,re),Re=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=ee(E);ne(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,me,Q,E.width,E.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,me,Q,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Q,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Re,i.RENDERBUFFER,P)}else{const te=E.textures;for(let re=0;re<te.length;re++){const Q=te[re],Re=r.convert(Q.format,Q.colorSpace),me=r.convert(Q.type),Ee=S(Q.internalFormat,Re,me,Q.colorSpace),tt=ee(E);V&&ne(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,Ee,E.width,E.height):ne(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,tt,Ee,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Ee,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function fe(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),I(E.depthTexture,0);const te=n.get(E.depthTexture).__webglTexture,re=ee(E);if(E.depthTexture.format===tr)ne(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(E.depthTexture.format===fr)ne(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function De(P){const E=n.get(P),V=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){const te=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),te){const re=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,te.removeEventListener("dispose",re)};te.addEventListener("dispose",re),E.__depthDisposeCallback=re}E.__boundDepthTexture=te}if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");fe(E.__webglFramebuffer,P)}else if(V){E.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[te]),E.__webglDepthbuffer[te]===void 0)E.__webglDepthbuffer[te]=i.createRenderbuffer(),_e(E.__webglDepthbuffer[te],P,!1);else{const re=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=E.__webglDepthbuffer[te];i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,Q)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),_e(E.__webglDepthbuffer,P,!1);else{const te=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,re)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ne(P,E,V){const te=n.get(P);E!==void 0&&ae(te.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&De(P)}function Pe(P){const E=P.texture,V=n.get(P),te=n.get(E);P.addEventListener("dispose",w);const re=P.textures,Q=P.isWebGLCubeRenderTarget===!0,Re=re.length>1;if(Re||(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=E.version,o.memory.textures++),Q){V.__webglFramebuffer=[];for(let me=0;me<6;me++)if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer[me]=[];for(let Ee=0;Ee<E.mipmaps.length;Ee++)V.__webglFramebuffer[me][Ee]=i.createFramebuffer()}else V.__webglFramebuffer[me]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer=[];for(let me=0;me<E.mipmaps.length;me++)V.__webglFramebuffer[me]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Re)for(let me=0,Ee=re.length;me<Ee;me++){const tt=n.get(re[me]);tt.__webglTexture===void 0&&(tt.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&ne(P)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let me=0;me<re.length;me++){const Ee=re[me];V.__webglColorRenderbuffer[me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[me]);const tt=r.convert(Ee.format,Ee.colorSpace),le=r.convert(Ee.type),be=S(Ee.internalFormat,tt,le,Ee.colorSpace,P.isXRRenderTarget===!0),Ye=ee(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ye,be,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,V.__webglColorRenderbuffer[me])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),_e(V.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Q){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),ce(i.TEXTURE_CUBE_MAP,E);for(let me=0;me<6;me++)if(E.mipmaps&&E.mipmaps.length>0)for(let Ee=0;Ee<E.mipmaps.length;Ee++)ae(V.__webglFramebuffer[me][Ee],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ee);else ae(V.__webglFramebuffer[me],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);u(E)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let me=0,Ee=re.length;me<Ee;me++){const tt=re[me],le=n.get(tt);t.bindTexture(i.TEXTURE_2D,le.__webglTexture),ce(i.TEXTURE_2D,tt),ae(V.__webglFramebuffer,P,tt,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,0),u(tt)&&g(i.TEXTURE_2D)}t.unbindTexture()}else{let me=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(me=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,te.__webglTexture),ce(me,E),E.mipmaps&&E.mipmaps.length>0)for(let Ee=0;Ee<E.mipmaps.length;Ee++)ae(V.__webglFramebuffer[Ee],P,E,i.COLOR_ATTACHMENT0,me,Ee);else ae(V.__webglFramebuffer,P,E,i.COLOR_ATTACHMENT0,me,0);u(E)&&g(me),t.unbindTexture()}P.depthBuffer&&De(P)}function He(P){const E=P.textures;for(let V=0,te=E.length;V<te;V++){const re=E[V];if(u(re)){const Q=P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Re=n.get(re).__webglTexture;t.bindTexture(Q,Re),g(Q),t.unbindTexture()}}}const ie=[],C=[];function Y(P){if(P.samples>0){if(ne(P)===!1){const E=P.textures,V=P.width,te=P.height;let re=i.COLOR_BUFFER_BIT;const Q=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=n.get(P),me=E.length>1;if(me)for(let Ee=0;Ee<E.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Ee=0;Ee<E.length;Ee++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),me){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Re.__webglColorRenderbuffer[Ee]);const tt=n.get(E[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,tt,0)}i.blitFramebuffer(0,0,V,te,0,0,V,te,re,i.NEAREST),c===!0&&(ie.length=0,C.length=0,ie.push(i.COLOR_ATTACHMENT0+Ee),P.depthBuffer&&P.resolveDepthBuffer===!1&&(ie.push(Q),C.push(Q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,C)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),me)for(let Ee=0;Ee<E.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,Re.__webglColorRenderbuffer[Ee]);const tt=n.get(E[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,tt,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const E=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function ee(P){return Math.min(s.maxSamples,P.samples)}function ne(P){const E=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function se(P){const E=o.render.frame;h.get(P)!==E&&(h.set(P,E),P.update())}function pe(P,E){const V=P.colorSpace,te=P.format,re=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||V!==Zt&&V!==Yi&&(rt.getTransfer(V)===Et?(te!==Wn||re!==Di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),E}function ge(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=y,this.setTexture2D=I,this.setTexture2DArray=B,this.setTexture3D=U,this.setTextureCube=G,this.rebindTextures=Ne,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=ne}function lv(i,e){function t(n,s=Yi){let r;const o=rt.getTransfer(s);if(n===Di)return i.UNSIGNED_BYTE;if(n===Kl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Nd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Id)return i.BYTE;if(n===Dd)return i.SHORT;if(n===Jr)return i.UNSIGNED_SHORT;if(n===ql)return i.INT;if(n===vs)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===Pi)return i.HALF_FLOAT;if(n===Ud)return i.ALPHA;if(n===Fd)return i.RGB;if(n===Wn)return i.RGBA;if(n===Od)return i.LUMINANCE;if(n===Bd)return i.LUMINANCE_ALPHA;if(n===tr)return i.DEPTH_COMPONENT;if(n===fr)return i.DEPTH_STENCIL;if(n===$l)return i.RED;if(n===jl)return i.RED_INTEGER;if(n===zd)return i.RG;if(n===Zl)return i.RG_INTEGER;if(n===Jl)return i.RGBA_INTEGER;if(n===ra||n===oa||n===aa||n===ca)if(o===Et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qc||n===el||n===tl||n===nl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===el)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===nl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===il||n===sl||n===rl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===il||n===sl)return o===Et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===rl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ol||n===al||n===cl||n===ll||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===xl||n===vl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ol)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===al)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===cl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ll)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===hl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ul)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ml)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===gl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_l)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===la||n===yl||n===Ml)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===la)return o===Et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ml)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kd||n===Sl||n===wl||n===El)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===la)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Sl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===El)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===dr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class hv extends fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Qe extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const uv={type:"move"};class pc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const u=t.getJointPose(_,n),g=this._getHandJoint(l,_);u!==null&&(g.matrix.fromArray(u.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=u.radius),g.visible=u!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=h.position.distanceTo(f.position),p=.02,m=.005;l.inputState.pinching&&d>p+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(uv)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Qe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const dv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fv=`
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

}`;class pv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Ht,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ni({vertexShader:dv,fragmentShader:fv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new X(new Nt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mv extends Mr{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,d=null,p=null,m=null;const _=new pv,u=t.getContextAttributes();let g=null,S=null;const v=[],M=[],R=new ue;let w=null;const b=new fn;b.layers.enable(1),b.viewport=new at;const T=new fn;T.layers.enable(2),T.viewport=new at;const F=[b,T],x=new hv;x.layers.enable(1),x.layers.enable(2);let y=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ae=v[K];return ae===void 0&&(ae=new pc,v[K]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(K){let ae=v[K];return ae===void 0&&(ae=new pc,v[K]=ae),ae.getGripSpace()},this.getHand=function(K){let ae=v[K];return ae===void 0&&(ae=new pc,v[K]=ae),ae.getHandSpace()};function L(K){const ae=M.indexOf(K.inputSource);if(ae===-1)return;const _e=v[ae];_e!==void 0&&(_e.update(K.inputSource,K.frame,l||o),_e.dispatchEvent({type:K.type,data:K.inputSource}))}function I(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",I),s.removeEventListener("inputsourceschange",B);for(let K=0;K<v.length;K++){const ae=M[K];ae!==null&&(M[K]=null,v[K].disconnect(ae))}y=null,D=null,_.reset(),e.setRenderTarget(g),p=null,d=null,f=null,s=null,S=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(g=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",I),s.addEventListener("inputsourceschange",B),u.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(R),s.renderState.layers===void 0){const ae={antialias:u.antialias,alpha:!0,depth:u.depth,stencil:u.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ae),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new ys(p.framebufferWidth,p.framebufferHeight,{format:Wn,type:Di,colorSpace:e.outputColorSpace,stencilBuffer:u.stencil})}else{let ae=null,_e=null,fe=null;u.depth&&(fe=u.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=u.stencil?fr:tr,_e=u.stencil?dr:vs);const De={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:r};f=new XRWebGLBinding(s,t),d=f.createProjectionLayer(De),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new ys(d.textureWidth,d.textureHeight,{format:Wn,type:Di,depthTexture:new nf(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:u.stencil,colorSpace:e.outputColorSpace,samples:u.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Le.setContext(s),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function B(K){for(let ae=0;ae<K.removed.length;ae++){const _e=K.removed[ae],fe=M.indexOf(_e);fe>=0&&(M[fe]=null,v[fe].disconnect(_e))}for(let ae=0;ae<K.added.length;ae++){const _e=K.added[ae];let fe=M.indexOf(_e);if(fe===-1){for(let Ne=0;Ne<v.length;Ne++)if(Ne>=M.length){M.push(_e),fe=Ne;break}else if(M[Ne]===null){M[Ne]=_e,fe=Ne;break}if(fe===-1)break}const De=v[fe];De&&De.connect(_e)}}const U=new N,G=new N;function O(K,ae,_e){U.setFromMatrixPosition(ae.matrixWorld),G.setFromMatrixPosition(_e.matrixWorld);const fe=U.distanceTo(G),De=ae.projectionMatrix.elements,Ne=_e.projectionMatrix.elements,Pe=De[14]/(De[10]-1),He=De[14]/(De[10]+1),ie=(De[9]+1)/De[5],C=(De[9]-1)/De[5],Y=(De[8]-1)/De[0],ee=(Ne[8]+1)/Ne[0],ne=Pe*Y,se=Pe*ee,pe=fe/(-Y+ee),ge=pe*-Y;if(ae.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ge),K.translateZ(pe),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),De[10]===-1)K.projectionMatrix.copy(ae.projectionMatrix),K.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const P=Pe+pe,E=He+pe,V=ne-ge,te=se+(fe-ge),re=ie*He/E*P,Q=C*He/E*P;K.projectionMatrix.makePerspective(V,te,re,Q,P,E),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function J(K,ae){ae===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ae.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let ae=K.near,_e=K.far;_.texture!==null&&(_.depthNear>0&&(ae=_.depthNear),_.depthFar>0&&(_e=_.depthFar)),x.near=T.near=b.near=ae,x.far=T.far=b.far=_e,(y!==x.near||D!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),y=x.near,D=x.far);const fe=K.parent,De=x.cameras;J(x,fe);for(let Ne=0;Ne<De.length;Ne++)J(De[Ne],fe);De.length===2?O(x,b,T):x.projectionMatrix.copy(b.projectionMatrix),j(K,x,fe)};function j(K,ae,_e){_e===null?K.matrix.copy(ae.matrixWorld):(K.matrix.copy(_e.matrixWorld),K.matrix.invert(),K.matrix.multiply(ae.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ae.projectionMatrix),K.projectionMatrixInverse.copy(ae.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=pr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(K){c=K,d!==null&&(d.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let ce=null;function Te(K,ae){if(h=ae.getViewerPose(l||o),m=ae,h!==null){const _e=h.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let fe=!1;_e.length!==x.cameras.length&&(x.cameras.length=0,fe=!0);for(let Ne=0;Ne<_e.length;Ne++){const Pe=_e[Ne];let He=null;if(p!==null)He=p.getViewport(Pe);else{const C=f.getViewSubImage(d,Pe);He=C.viewport,Ne===0&&(e.setRenderTargetTextures(S,C.colorTexture,d.ignoreDepthValues?void 0:C.depthStencilTexture),e.setRenderTarget(S))}let ie=F[Ne];ie===void 0&&(ie=new fn,ie.layers.enable(Ne),ie.viewport=new at,F[Ne]=ie),ie.matrix.fromArray(Pe.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(Pe.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(He.x,He.y,He.width,He.height),Ne===0&&(x.matrix.copy(ie.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),fe===!0&&x.cameras.push(ie)}const De=s.enabledFeatures;if(De&&De.includes("depth-sensing")){const Ne=f.getDepthInformation(_e[0]);Ne&&Ne.isValid&&Ne.texture&&_.init(e,Ne,s.renderState)}}for(let _e=0;_e<v.length;_e++){const fe=M[_e],De=v[_e];fe!==null&&De!==void 0&&De.update(fe,ae,l||o)}ce&&ce(K,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),m=null}const Le=new tf;Le.setAnimationLoop(Te),this.setAnimationLoop=function(K){ce=K},this.dispose=function(){}}}const us=new bn,gv=new qe;function _v(i,e){function t(u,g){u.matrixAutoUpdate===!0&&u.updateMatrix(),g.value.copy(u.matrix)}function n(u,g){g.color.getRGB(u.fogColor.value,Zd(i)),g.isFog?(u.fogNear.value=g.near,u.fogFar.value=g.far):g.isFogExp2&&(u.fogDensity.value=g.density)}function s(u,g,S,v,M){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(u,g):g.isMeshToonMaterial?(r(u,g),f(u,g)):g.isMeshPhongMaterial?(r(u,g),h(u,g)):g.isMeshStandardMaterial?(r(u,g),d(u,g),g.isMeshPhysicalMaterial&&p(u,g,M)):g.isMeshMatcapMaterial?(r(u,g),m(u,g)):g.isMeshDepthMaterial?r(u,g):g.isMeshDistanceMaterial?(r(u,g),_(u,g)):g.isMeshNormalMaterial?r(u,g):g.isLineBasicMaterial?(o(u,g),g.isLineDashedMaterial&&a(u,g)):g.isPointsMaterial?c(u,g,S,v):g.isSpriteMaterial?l(u,g):g.isShadowMaterial?(u.color.value.copy(g.color),u.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(u,g){u.opacity.value=g.opacity,g.color&&u.diffuse.value.copy(g.color),g.emissive&&u.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(u.map.value=g.map,t(g.map,u.mapTransform)),g.alphaMap&&(u.alphaMap.value=g.alphaMap,t(g.alphaMap,u.alphaMapTransform)),g.bumpMap&&(u.bumpMap.value=g.bumpMap,t(g.bumpMap,u.bumpMapTransform),u.bumpScale.value=g.bumpScale,g.side===gn&&(u.bumpScale.value*=-1)),g.normalMap&&(u.normalMap.value=g.normalMap,t(g.normalMap,u.normalMapTransform),u.normalScale.value.copy(g.normalScale),g.side===gn&&u.normalScale.value.negate()),g.displacementMap&&(u.displacementMap.value=g.displacementMap,t(g.displacementMap,u.displacementMapTransform),u.displacementScale.value=g.displacementScale,u.displacementBias.value=g.displacementBias),g.emissiveMap&&(u.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,u.emissiveMapTransform)),g.specularMap&&(u.specularMap.value=g.specularMap,t(g.specularMap,u.specularMapTransform)),g.alphaTest>0&&(u.alphaTest.value=g.alphaTest);const S=e.get(g),v=S.envMap,M=S.envMapRotation;v&&(u.envMap.value=v,us.copy(M),us.x*=-1,us.y*=-1,us.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(us.y*=-1,us.z*=-1),u.envMapRotation.value.setFromMatrix4(gv.makeRotationFromEuler(us)),u.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=g.reflectivity,u.ior.value=g.ior,u.refractionRatio.value=g.refractionRatio),g.lightMap&&(u.lightMap.value=g.lightMap,u.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,u.lightMapTransform)),g.aoMap&&(u.aoMap.value=g.aoMap,u.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,u.aoMapTransform))}function o(u,g){u.diffuse.value.copy(g.color),u.opacity.value=g.opacity,g.map&&(u.map.value=g.map,t(g.map,u.mapTransform))}function a(u,g){u.dashSize.value=g.dashSize,u.totalSize.value=g.dashSize+g.gapSize,u.scale.value=g.scale}function c(u,g,S,v){u.diffuse.value.copy(g.color),u.opacity.value=g.opacity,u.size.value=g.size*S,u.scale.value=v*.5,g.map&&(u.map.value=g.map,t(g.map,u.uvTransform)),g.alphaMap&&(u.alphaMap.value=g.alphaMap,t(g.alphaMap,u.alphaMapTransform)),g.alphaTest>0&&(u.alphaTest.value=g.alphaTest)}function l(u,g){u.diffuse.value.copy(g.color),u.opacity.value=g.opacity,u.rotation.value=g.rotation,g.map&&(u.map.value=g.map,t(g.map,u.mapTransform)),g.alphaMap&&(u.alphaMap.value=g.alphaMap,t(g.alphaMap,u.alphaMapTransform)),g.alphaTest>0&&(u.alphaTest.value=g.alphaTest)}function h(u,g){u.specular.value.copy(g.specular),u.shininess.value=Math.max(g.shininess,1e-4)}function f(u,g){g.gradientMap&&(u.gradientMap.value=g.gradientMap)}function d(u,g){u.metalness.value=g.metalness,g.metalnessMap&&(u.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,u.metalnessMapTransform)),u.roughness.value=g.roughness,g.roughnessMap&&(u.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,u.roughnessMapTransform)),g.envMap&&(u.envMapIntensity.value=g.envMapIntensity)}function p(u,g,S){u.ior.value=g.ior,g.sheen>0&&(u.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),u.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(u.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,u.sheenColorMapTransform)),g.sheenRoughnessMap&&(u.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,u.sheenRoughnessMapTransform))),g.clearcoat>0&&(u.clearcoat.value=g.clearcoat,u.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(u.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,u.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(u.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===gn&&u.clearcoatNormalScale.value.negate())),g.dispersion>0&&(u.dispersion.value=g.dispersion),g.iridescence>0&&(u.iridescence.value=g.iridescence,u.iridescenceIOR.value=g.iridescenceIOR,u.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],u.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(u.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,u.iridescenceMapTransform)),g.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),g.transmission>0&&(u.transmission.value=g.transmission,u.transmissionSamplerMap.value=S.texture,u.transmissionSamplerSize.value.set(S.width,S.height),g.transmissionMap&&(u.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,u.transmissionMapTransform)),u.thickness.value=g.thickness,g.thicknessMap&&(u.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=g.attenuationDistance,u.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(u.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(u.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=g.specularIntensity,u.specularColor.value.copy(g.specularColor),g.specularColorMap&&(u.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,u.specularColorMapTransform)),g.specularIntensityMap&&(u.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,u.specularIntensityMapTransform))}function m(u,g){g.matcap&&(u.matcap.value=g.matcap)}function _(u,g){const S=e.get(g).light;u.referencePosition.value.setFromMatrixPosition(S.matrixWorld),u.nearDistance.value=S.shadow.camera.near,u.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function xv(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,v){const M=v.program;n.uniformBlockBinding(S,M)}function l(S,v){let M=s[S.id];M===void 0&&(m(S),M=h(S),s[S.id]=M,S.addEventListener("dispose",u));const R=v.program;n.updateUBOMapping(S,R);const w=e.render.frame;r[S.id]!==w&&(d(S),r[S.id]=w)}function h(S){const v=f();S.__bindingPointIndex=v;const M=i.createBuffer(),R=S.__size,w=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,R,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,M),M}function f(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const v=s[S.id],M=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let w=0,b=M.length;w<b;w++){const T=Array.isArray(M[w])?M[w]:[M[w]];for(let F=0,x=T.length;F<x;F++){const y=T[F];if(p(y,w,F,R)===!0){const D=y.__offset,L=Array.isArray(y.value)?y.value:[y.value];let I=0;for(let B=0;B<L.length;B++){const U=L[B],G=_(U);typeof U=="number"||typeof U=="boolean"?(y.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,D+I,y.__data)):U.isMatrix3?(y.__data[0]=U.elements[0],y.__data[1]=U.elements[1],y.__data[2]=U.elements[2],y.__data[3]=0,y.__data[4]=U.elements[3],y.__data[5]=U.elements[4],y.__data[6]=U.elements[5],y.__data[7]=0,y.__data[8]=U.elements[6],y.__data[9]=U.elements[7],y.__data[10]=U.elements[8],y.__data[11]=0):(U.toArray(y.__data,I),I+=G.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,y.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(S,v,M,R){const w=S.value,b=v+"_"+M;if(R[b]===void 0)return typeof w=="number"||typeof w=="boolean"?R[b]=w:R[b]=w.clone(),!0;{const T=R[b];if(typeof w=="number"||typeof w=="boolean"){if(T!==w)return R[b]=w,!0}else if(T.equals(w)===!1)return T.copy(w),!0}return!1}function m(S){const v=S.uniforms;let M=0;const R=16;for(let b=0,T=v.length;b<T;b++){const F=Array.isArray(v[b])?v[b]:[v[b]];for(let x=0,y=F.length;x<y;x++){const D=F[x],L=Array.isArray(D.value)?D.value:[D.value];for(let I=0,B=L.length;I<B;I++){const U=L[I],G=_(U),O=M%R,J=O%G.boundary,j=O+J;M+=J,j!==0&&R-j<G.storage&&(M+=R-j),D.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=M,M+=G.storage}}}const w=M%R;return w>0&&(M+=R-w),S.__size=M,S.__cache={},this}function _(S){const v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=48,v.storage=48):S.isMatrix4?(v.boundary=64,v.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),v}function u(S){const v=S.target;v.removeEventListener("dispose",u);const M=o.indexOf(v.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function g(){for(const S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:c,update:l,dispose:g}}class vv{constructor(e={}){const{canvas:t=sm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),m=new Int32Array(4);let _=null,u=null;const g=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=cn,this.toneMapping=ts,this.toneMappingExposure=1;const v=this;let M=!1,R=0,w=0,b=null,T=-1,F=null;const x=new at,y=new at;let D=null;const L=new ze(0);let I=0,B=t.width,U=t.height,G=1,O=null,J=null;const j=new at(0,0,B,U),ce=new at(0,0,B,U);let Te=!1;const Le=new th;let K=!1,ae=!1;const _e=new qe,fe=new qe,De=new N,Ne=new at,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let He=!1;function ie(){return b===null?G:1}let C=n;function Y(A,k){return t.getContext(A,k)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xl}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",we,!1),C===null){const k="webgl2";if(C=Y(k,A),C===null)throw Y(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let ee,ne,se,pe,ge,P,E,V,te,re,Q,Re,me,Ee,tt,le,be,Ye,$e,Ae,nt,je,vt,z;function Se(){ee=new E_(C),ee.init(),je=new lv(C,ee),ne=new x_(C,ee,e,je),se=new ov(C),ne.reverseDepthBuffer&&se.buffers.depth.setReversed(!0),pe=new A_(C),ge=new Xx,P=new cv(C,ee,se,ge,ne,je,pe),E=new y_(v),V=new w_(v),te=new Nm(C),vt=new g_(C,te),re=new b_(C,te,pe,vt),Q=new C_(C,re,te,pe),$e=new R_(C,ne,P),le=new v_(ge),Re=new Wx(v,E,V,ee,ne,vt,le),me=new _v(v,ge),Ee=new Kx,tt=new Qx(ee),Ye=new m_(v,E,V,se,Q,d,c),be=new sv(v,Q,ne),z=new xv(C,pe,ne,se),Ae=new __(C,ee,pe),nt=new T_(C,ee,pe),pe.programs=Re.programs,v.capabilities=ne,v.extensions=ee,v.properties=ge,v.renderLists=Ee,v.shadowMap=be,v.state=se,v.info=pe}Se();const $=new mv(v,C);this.xr=$,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const A=ee.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ee.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(A){A!==void 0&&(G=A,this.setSize(B,U,!1))},this.getSize=function(A){return A.set(B,U)},this.setSize=function(A,k,W=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=A,U=k,t.width=Math.floor(A*G),t.height=Math.floor(k*G),W===!0&&(t.style.width=A+"px",t.style.height=k+"px"),this.setViewport(0,0,A,k)},this.getDrawingBufferSize=function(A){return A.set(B*G,U*G).floor()},this.setDrawingBufferSize=function(A,k,W){B=A,U=k,G=W,t.width=Math.floor(A*W),t.height=Math.floor(k*W),this.setViewport(0,0,A,k)},this.getCurrentViewport=function(A){return A.copy(x)},this.getViewport=function(A){return A.copy(j)},this.setViewport=function(A,k,W,q){A.isVector4?j.set(A.x,A.y,A.z,A.w):j.set(A,k,W,q),se.viewport(x.copy(j).multiplyScalar(G).round())},this.getScissor=function(A){return A.copy(ce)},this.setScissor=function(A,k,W,q){A.isVector4?ce.set(A.x,A.y,A.z,A.w):ce.set(A,k,W,q),se.scissor(y.copy(ce).multiplyScalar(G).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(A){se.setScissorTest(Te=A)},this.setOpaqueSort=function(A){O=A},this.setTransparentSort=function(A){J=A},this.getClearColor=function(A){return A.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(A=!0,k=!0,W=!0){let q=0;if(A){let H=!1;if(b!==null){const de=b.texture.format;H=de===Jl||de===Zl||de===jl}if(H){const de=b.texture.type,Me=de===Di||de===vs||de===Jr||de===dr||de===Kl||de===Yl,Ce=Ye.getClearColor(),Ie=Ye.getClearAlpha(),We=Ce.r,Ke=Ce.g,Ue=Ce.b;Me?(p[0]=We,p[1]=Ke,p[2]=Ue,p[3]=Ie,C.clearBufferuiv(C.COLOR,0,p)):(m[0]=We,m[1]=Ke,m[2]=Ue,m[3]=Ie,C.clearBufferiv(C.COLOR,0,m))}else q|=C.COLOR_BUFFER_BIT}k&&(q|=C.DEPTH_BUFFER_BIT,C.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),W&&(q|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",we,!1),Ee.dispose(),tt.dispose(),ge.dispose(),E.dispose(),V.dispose(),Q.dispose(),vt.dispose(),z.dispose(),Re.dispose(),$.dispose(),$.removeEventListener("sessionstart",Eh),$.removeEventListener("sessionend",bh),rs.stop()};function oe(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const A=pe.autoReset,k=be.enabled,W=be.autoUpdate,q=be.needsUpdate,H=be.type;Se(),pe.autoReset=A,be.enabled=k,be.autoUpdate=W,be.needsUpdate=q,be.type=H}function we(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function it(A){const k=A.target;k.removeEventListener("dispose",it),Pt(k)}function Pt(A){xn(A),ge.remove(A)}function xn(A){const k=ge.get(A).programs;k!==void 0&&(k.forEach(function(W){Re.releaseProgram(W)}),A.isShaderMaterial&&Re.releaseShaderCache(A))}this.renderBufferDirect=function(A,k,W,q,H,de){k===null&&(k=Pe);const Me=H.isMesh&&H.matrixWorld.determinant()<0,Ce=jf(A,k,W,q,H);se.setMaterial(q,Me);let Ie=W.index,We=1;if(q.wireframe===!0){if(Ie=re.getWireframeAttribute(W),Ie===void 0)return;We=2}const Ke=W.drawRange,Ue=W.attributes.position;let dt=Ke.start*We,wt=(Ke.start+Ke.count)*We;de!==null&&(dt=Math.max(dt,de.start*We),wt=Math.min(wt,(de.start+de.count)*We)),Ie!==null?(dt=Math.max(dt,0),wt=Math.min(wt,Ie.count)):Ue!=null&&(dt=Math.max(dt,0),wt=Math.min(wt,Ue.count));const At=wt-dt;if(At<0||At===1/0)return;vt.setup(H,q,Ce,W,Ie);let Tn,ct=Ae;if(Ie!==null&&(Tn=te.get(Ie),ct=nt,ct.setIndex(Tn)),H.isMesh)q.wireframe===!0?(se.setLineWidth(q.wireframeLinewidth*ie()),ct.setMode(C.LINES)):ct.setMode(C.TRIANGLES);else if(H.isLine){let Fe=q.linewidth;Fe===void 0&&(Fe=1),se.setLineWidth(Fe*ie()),H.isLineSegments?ct.setMode(C.LINES):H.isLineLoop?ct.setMode(C.LINE_LOOP):ct.setMode(C.LINE_STRIP)}else H.isPoints?ct.setMode(C.POINTS):H.isSprite&&ct.setMode(C.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)ct.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(ee.get("WEBGL_multi_draw"))ct.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Fe=H._multiDrawStarts,Jt=H._multiDrawCounts,lt=H._multiDrawCount,Kn=Ie?te.get(Ie).bytesPerElement:1,Ts=ge.get(q).currentProgram.getUniforms();for(let An=0;An<lt;An++)Ts.setValue(C,"_gl_DrawID",An),ct.render(Fe[An]/Kn,Jt[An])}else if(H.isInstancedMesh)ct.renderInstances(dt,At,H.count);else if(W.isInstancedBufferGeometry){const Fe=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Jt=Math.min(W.instanceCount,Fe);ct.renderInstances(dt,At,Jt)}else ct.render(dt,At)};function ot(A,k,W){A.transparent===!0&&A.side===tn&&A.forceSinglePass===!1?(A.side=gn,A.needsUpdate=!0,ho(A,k,W),A.side=Ii,A.needsUpdate=!0,ho(A,k,W),A.side=tn):ho(A,k,W)}this.compile=function(A,k,W=null){W===null&&(W=A),u=tt.get(W),u.init(k),S.push(u),W.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(u.pushLight(H),H.castShadow&&u.pushShadow(H))}),A!==W&&A.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(u.pushLight(H),H.castShadow&&u.pushShadow(H))}),u.setupLights();const q=new Set;return A.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const de=H.material;if(de)if(Array.isArray(de))for(let Me=0;Me<de.length;Me++){const Ce=de[Me];ot(Ce,W,H),q.add(Ce)}else ot(de,W,H),q.add(de)}),S.pop(),u=null,q},this.compileAsync=function(A,k,W=null){const q=this.compile(A,k,W);return new Promise(H=>{function de(){if(q.forEach(function(Me){ge.get(Me).currentProgram.isReady()&&q.delete(Me)}),q.size===0){H(A);return}setTimeout(de,10)}ee.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let vn=null;function xi(A){vn&&vn(A)}function Eh(){rs.stop()}function bh(){rs.start()}const rs=new tf;rs.setAnimationLoop(xi),typeof self<"u"&&rs.setContext(self),this.setAnimationLoop=function(A){vn=A,$.setAnimationLoop(A),A===null?rs.stop():rs.start()},$.addEventListener("sessionstart",Eh),$.addEventListener("sessionend",bh),this.render=function(A,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(k),k=$.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,k,b),u=tt.get(A,S.length),u.init(k),S.push(u),fe.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Le.setFromProjectionMatrix(fe),ae=this.localClippingEnabled,K=le.init(this.clippingPlanes,ae),_=Ee.get(A,g.length),_.init(),g.push(_),$.enabled===!0&&$.isPresenting===!0){const de=v.xr.getDepthSensingMesh();de!==null&&Fa(de,k,-1/0,v.sortObjects)}Fa(A,k,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(O,J),He=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,He&&Ye.addToRenderList(_,A),this.info.render.frame++,K===!0&&le.beginShadows();const W=u.state.shadowsArray;be.render(W,A,k),K===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=_.opaque,H=_.transmissive;if(u.setupLights(),k.isArrayCamera){const de=k.cameras;if(H.length>0)for(let Me=0,Ce=de.length;Me<Ce;Me++){const Ie=de[Me];Ah(q,H,A,Ie)}He&&Ye.render(A);for(let Me=0,Ce=de.length;Me<Ce;Me++){const Ie=de[Me];Th(_,A,Ie,Ie.viewport)}}else H.length>0&&Ah(q,H,A,k),He&&Ye.render(A),Th(_,A,k);b!==null&&(P.updateMultisampleRenderTarget(b),P.updateRenderTargetMipmap(b)),A.isScene===!0&&A.onAfterRender(v,A,k),vt.resetDefaultState(),T=-1,F=null,S.pop(),S.length>0?(u=S[S.length-1],K===!0&&le.setGlobalState(v.clippingPlanes,u.state.camera)):u=null,g.pop(),g.length>0?_=g[g.length-1]:_=null};function Fa(A,k,W,q){if(A.visible===!1)return;if(A.layers.test(k.layers)){if(A.isGroup)W=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(k);else if(A.isLight)u.pushLight(A),A.castShadow&&u.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Le.intersectsSprite(A)){q&&Ne.setFromMatrixPosition(A.matrixWorld).applyMatrix4(fe);const Me=Q.update(A),Ce=A.material;Ce.visible&&_.push(A,Me,Ce,W,Ne.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Le.intersectsObject(A))){const Me=Q.update(A),Ce=A.material;if(q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ne.copy(A.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ne.copy(Me.boundingSphere.center)),Ne.applyMatrix4(A.matrixWorld).applyMatrix4(fe)),Array.isArray(Ce)){const Ie=Me.groups;for(let We=0,Ke=Ie.length;We<Ke;We++){const Ue=Ie[We],dt=Ce[Ue.materialIndex];dt&&dt.visible&&_.push(A,Me,dt,W,Ne.z,Ue)}}else Ce.visible&&_.push(A,Me,Ce,W,Ne.z,null)}}const de=A.children;for(let Me=0,Ce=de.length;Me<Ce;Me++)Fa(de[Me],k,W,q)}function Th(A,k,W,q){const H=A.opaque,de=A.transmissive,Me=A.transparent;u.setupLightsView(W),K===!0&&le.setGlobalState(v.clippingPlanes,W),q&&se.viewport(x.copy(q)),H.length>0&&lo(H,k,W),de.length>0&&lo(de,k,W),Me.length>0&&lo(Me,k,W),se.buffers.depth.setTest(!0),se.buffers.depth.setMask(!0),se.buffers.color.setMask(!0),se.setPolygonOffset(!1)}function Ah(A,k,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[q.id]===void 0&&(u.state.transmissionRenderTarget[q.id]=new ys(1,1,{generateMipmaps:!0,type:ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float")?Pi:Di,minFilter:ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));const de=u.state.transmissionRenderTarget[q.id],Me=q.viewport||x;de.setSize(Me.z,Me.w);const Ce=v.getRenderTarget();v.setRenderTarget(de),v.getClearColor(L),I=v.getClearAlpha(),I<1&&v.setClearColor(16777215,.5),v.clear(),He&&Ye.render(W);const Ie=v.toneMapping;v.toneMapping=ts;const We=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),u.setupLightsView(q),K===!0&&le.setGlobalState(v.clippingPlanes,q),lo(A,W,q),P.updateMultisampleRenderTarget(de),P.updateRenderTargetMipmap(de),ee.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let Ue=0,dt=k.length;Ue<dt;Ue++){const wt=k[Ue],At=wt.object,Tn=wt.geometry,ct=wt.material,Fe=wt.group;if(ct.side===tn&&At.layers.test(q.layers)){const Jt=ct.side;ct.side=gn,ct.needsUpdate=!0,Rh(At,W,q,Tn,ct,Fe),ct.side=Jt,ct.needsUpdate=!0,Ke=!0}}Ke===!0&&(P.updateMultisampleRenderTarget(de),P.updateRenderTargetMipmap(de))}v.setRenderTarget(Ce),v.setClearColor(L,I),We!==void 0&&(q.viewport=We),v.toneMapping=Ie}function lo(A,k,W){const q=k.isScene===!0?k.overrideMaterial:null;for(let H=0,de=A.length;H<de;H++){const Me=A[H],Ce=Me.object,Ie=Me.geometry,We=q===null?Me.material:q,Ke=Me.group;Ce.layers.test(W.layers)&&Rh(Ce,k,W,Ie,We,Ke)}}function Rh(A,k,W,q,H,de){A.onBeforeRender(v,k,W,q,H,de),A.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(v,k,W,q,A,de),H.transparent===!0&&H.side===tn&&H.forceSinglePass===!1?(H.side=gn,H.needsUpdate=!0,v.renderBufferDirect(W,k,q,H,A,de),H.side=Ii,H.needsUpdate=!0,v.renderBufferDirect(W,k,q,H,A,de),H.side=tn):v.renderBufferDirect(W,k,q,H,A,de),A.onAfterRender(v,k,W,q,H,de)}function ho(A,k,W){k.isScene!==!0&&(k=Pe);const q=ge.get(A),H=u.state.lights,de=u.state.shadowsArray,Me=H.state.version,Ce=Re.getParameters(A,H.state,de,k,W),Ie=Re.getProgramCacheKey(Ce);let We=q.programs;q.environment=A.isMeshStandardMaterial?k.environment:null,q.fog=k.fog,q.envMap=(A.isMeshStandardMaterial?V:E).get(A.envMap||q.environment),q.envMapRotation=q.environment!==null&&A.envMap===null?k.environmentRotation:A.envMapRotation,We===void 0&&(A.addEventListener("dispose",it),We=new Map,q.programs=We);let Ke=We.get(Ie);if(Ke!==void 0){if(q.currentProgram===Ke&&q.lightsStateVersion===Me)return Ph(A,Ce),Ke}else Ce.uniforms=Re.getUniforms(A),A.onBeforeCompile(Ce,v),Ke=Re.acquireProgram(Ce,Ie),We.set(Ie,Ke),q.uniforms=Ce.uniforms;const Ue=q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ue.clippingPlanes=le.uniform),Ph(A,Ce),q.needsLights=Jf(A),q.lightsStateVersion=Me,q.needsLights&&(Ue.ambientLightColor.value=H.state.ambient,Ue.lightProbe.value=H.state.probe,Ue.directionalLights.value=H.state.directional,Ue.directionalLightShadows.value=H.state.directionalShadow,Ue.spotLights.value=H.state.spot,Ue.spotLightShadows.value=H.state.spotShadow,Ue.rectAreaLights.value=H.state.rectArea,Ue.ltc_1.value=H.state.rectAreaLTC1,Ue.ltc_2.value=H.state.rectAreaLTC2,Ue.pointLights.value=H.state.point,Ue.pointLightShadows.value=H.state.pointShadow,Ue.hemisphereLights.value=H.state.hemi,Ue.directionalShadowMap.value=H.state.directionalShadowMap,Ue.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ue.spotShadowMap.value=H.state.spotShadowMap,Ue.spotLightMatrix.value=H.state.spotLightMatrix,Ue.spotLightMap.value=H.state.spotLightMap,Ue.pointShadowMap.value=H.state.pointShadowMap,Ue.pointShadowMatrix.value=H.state.pointShadowMatrix),q.currentProgram=Ke,q.uniformsList=null,Ke}function Ch(A){if(A.uniformsList===null){const k=A.currentProgram.getUniforms();A.uniformsList=ua.seqWithValue(k.seq,A.uniforms)}return A.uniformsList}function Ph(A,k){const W=ge.get(A);W.outputColorSpace=k.outputColorSpace,W.batching=k.batching,W.batchingColor=k.batchingColor,W.instancing=k.instancing,W.instancingColor=k.instancingColor,W.instancingMorph=k.instancingMorph,W.skinning=k.skinning,W.morphTargets=k.morphTargets,W.morphNormals=k.morphNormals,W.morphColors=k.morphColors,W.morphTargetsCount=k.morphTargetsCount,W.numClippingPlanes=k.numClippingPlanes,W.numIntersection=k.numClipIntersection,W.vertexAlphas=k.vertexAlphas,W.vertexTangents=k.vertexTangents,W.toneMapping=k.toneMapping}function jf(A,k,W,q,H){k.isScene!==!0&&(k=Pe),P.resetTextureUnits();const de=k.fog,Me=q.isMeshStandardMaterial?k.environment:null,Ce=b===null?v.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Zt,Ie=(q.isMeshStandardMaterial?V:E).get(q.envMap||Me),We=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ke=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ue=!!W.morphAttributes.position,dt=!!W.morphAttributes.normal,wt=!!W.morphAttributes.color;let At=ts;q.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(At=v.toneMapping);const Tn=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ct=Tn!==void 0?Tn.length:0,Fe=ge.get(q),Jt=u.state.lights;if(K===!0&&(ae===!0||A!==F)){const Nn=A===F&&q.id===T;le.setState(q,A,Nn)}let lt=!1;q.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==Jt.state.version||Fe.outputColorSpace!==Ce||H.isBatchedMesh&&Fe.batching===!1||!H.isBatchedMesh&&Fe.batching===!0||H.isBatchedMesh&&Fe.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Fe.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Fe.instancing===!1||!H.isInstancedMesh&&Fe.instancing===!0||H.isSkinnedMesh&&Fe.skinning===!1||!H.isSkinnedMesh&&Fe.skinning===!0||H.isInstancedMesh&&Fe.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Fe.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Fe.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Fe.instancingMorph===!1&&H.morphTexture!==null||Fe.envMap!==Ie||q.fog===!0&&Fe.fog!==de||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==le.numPlanes||Fe.numIntersection!==le.numIntersection)||Fe.vertexAlphas!==We||Fe.vertexTangents!==Ke||Fe.morphTargets!==Ue||Fe.morphNormals!==dt||Fe.morphColors!==wt||Fe.toneMapping!==At||Fe.morphTargetsCount!==ct)&&(lt=!0):(lt=!0,Fe.__version=q.version);let Kn=Fe.currentProgram;lt===!0&&(Kn=ho(q,k,H));let Ts=!1,An=!1,Oa=!1;const Ct=Kn.getUniforms(),Ui=Fe.uniforms;if(se.useProgram(Kn.program)&&(Ts=!0,An=!0,Oa=!0),q.id!==T&&(T=q.id,An=!0),Ts||F!==A){ne.reverseDepthBuffer?(_e.copy(A.projectionMatrix),om(_e),am(_e),Ct.setValue(C,"projectionMatrix",_e)):Ct.setValue(C,"projectionMatrix",A.projectionMatrix),Ct.setValue(C,"viewMatrix",A.matrixWorldInverse);const Nn=Ct.map.cameraPosition;Nn!==void 0&&Nn.setValue(C,De.setFromMatrixPosition(A.matrixWorld)),ne.logarithmicDepthBuffer&&Ct.setValue(C,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Ct.setValue(C,"isOrthographic",A.isOrthographicCamera===!0),F!==A&&(F=A,An=!0,Oa=!0)}if(H.isSkinnedMesh){Ct.setOptional(C,H,"bindMatrix"),Ct.setOptional(C,H,"bindMatrixInverse");const Nn=H.skeleton;Nn&&(Nn.boneTexture===null&&Nn.computeBoneTexture(),Ct.setValue(C,"boneTexture",Nn.boneTexture,P))}H.isBatchedMesh&&(Ct.setOptional(C,H,"batchingTexture"),Ct.setValue(C,"batchingTexture",H._matricesTexture,P),Ct.setOptional(C,H,"batchingIdTexture"),Ct.setValue(C,"batchingIdTexture",H._indirectTexture,P),Ct.setOptional(C,H,"batchingColorTexture"),H._colorsTexture!==null&&Ct.setValue(C,"batchingColorTexture",H._colorsTexture,P));const Ba=W.morphAttributes;if((Ba.position!==void 0||Ba.normal!==void 0||Ba.color!==void 0)&&$e.update(H,W,Kn),(An||Fe.receiveShadow!==H.receiveShadow)&&(Fe.receiveShadow=H.receiveShadow,Ct.setValue(C,"receiveShadow",H.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Ui.envMap.value=Ie,Ui.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&k.environment!==null&&(Ui.envMapIntensity.value=k.environmentIntensity),An&&(Ct.setValue(C,"toneMappingExposure",v.toneMappingExposure),Fe.needsLights&&Zf(Ui,Oa),de&&q.fog===!0&&me.refreshFogUniforms(Ui,de),me.refreshMaterialUniforms(Ui,q,G,U,u.state.transmissionRenderTarget[A.id]),ua.upload(C,Ch(Fe),Ui,P)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(ua.upload(C,Ch(Fe),Ui,P),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Ct.setValue(C,"center",H.center),Ct.setValue(C,"modelViewMatrix",H.modelViewMatrix),Ct.setValue(C,"normalMatrix",H.normalMatrix),Ct.setValue(C,"modelMatrix",H.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const Nn=q.uniformsGroups;for(let za=0,Qf=Nn.length;za<Qf;za++){const Lh=Nn[za];z.update(Lh,Kn),z.bind(Lh,Kn)}}return Kn}function Zf(A,k){A.ambientLightColor.needsUpdate=k,A.lightProbe.needsUpdate=k,A.directionalLights.needsUpdate=k,A.directionalLightShadows.needsUpdate=k,A.pointLights.needsUpdate=k,A.pointLightShadows.needsUpdate=k,A.spotLights.needsUpdate=k,A.spotLightShadows.needsUpdate=k,A.rectAreaLights.needsUpdate=k,A.hemisphereLights.needsUpdate=k}function Jf(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(A,k,W){ge.get(A.texture).__webglTexture=k,ge.get(A.depthTexture).__webglTexture=W;const q=ge.get(A);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=W===void 0,q.__autoAllocateDepthBuffer||ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,k){const W=ge.get(A);W.__webglFramebuffer=k,W.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(A,k=0,W=0){b=A,R=k,w=W;let q=!0,H=null,de=!1,Me=!1;if(A){const Ie=ge.get(A);if(Ie.__useDefaultFramebuffer!==void 0)se.bindFramebuffer(C.FRAMEBUFFER,null),q=!1;else if(Ie.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(Ie.__hasExternalTextures)P.rebindTextures(A,ge.get(A.texture).__webglTexture,ge.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ue=A.depthTexture;if(Ie.__boundDepthTexture!==Ue){if(Ue!==null&&ge.has(Ue)&&(A.width!==Ue.image.width||A.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}const We=A.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Me=!0);const Ke=ge.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ke[k])?H=Ke[k][W]:H=Ke[k],de=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?H=ge.get(A).__webglMultisampledFramebuffer:Array.isArray(Ke)?H=Ke[W]:H=Ke,x.copy(A.viewport),y.copy(A.scissor),D=A.scissorTest}else x.copy(j).multiplyScalar(G).floor(),y.copy(ce).multiplyScalar(G).floor(),D=Te;if(se.bindFramebuffer(C.FRAMEBUFFER,H)&&q&&se.drawBuffers(A,H),se.viewport(x),se.scissor(y),se.setScissorTest(D),de){const Ie=ge.get(A.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ie.__webglTexture,W)}else if(Me){const Ie=ge.get(A.texture),We=k||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ie.__webglTexture,W||0,We)}T=-1},this.readRenderTargetPixels=function(A,k,W,q,H,de,Me){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){se.bindFramebuffer(C.FRAMEBUFFER,Ce);try{const Ie=A.texture,We=Ie.format,Ke=Ie.type;if(!ne.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ne.textureTypeReadable(Ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=A.width-q&&W>=0&&W<=A.height-H&&C.readPixels(k,W,q,H,je.convert(We),je.convert(Ke),de)}finally{const Ie=b!==null?ge.get(b).__webglFramebuffer:null;se.bindFramebuffer(C.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(A,k,W,q,H,de,Me){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){const Ie=A.texture,We=Ie.format,Ke=Ie.type;if(!ne.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ne.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=A.width-q&&W>=0&&W<=A.height-H){se.bindFramebuffer(C.FRAMEBUFFER,Ce);const Ue=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Ue),C.bufferData(C.PIXEL_PACK_BUFFER,de.byteLength,C.STREAM_READ),C.readPixels(k,W,q,H,je.convert(We),je.convert(Ke),0);const dt=b!==null?ge.get(b).__webglFramebuffer:null;se.bindFramebuffer(C.FRAMEBUFFER,dt);const wt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await rm(C,wt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Ue),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,de),C.deleteBuffer(Ue),C.deleteSync(wt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,k=null,W=0){A.isTexture!==!0&&(ha("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,A=arguments[1]);const q=Math.pow(2,-W),H=Math.floor(A.image.width*q),de=Math.floor(A.image.height*q),Me=k!==null?k.x:0,Ce=k!==null?k.y:0;P.setTexture2D(A,0),C.copyTexSubImage2D(C.TEXTURE_2D,W,0,0,Me,Ce,H,de),se.unbindTexture()},this.copyTextureToTexture=function(A,k,W=null,q=null,H=0){A.isTexture!==!0&&(ha("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,A=arguments[1],k=arguments[2],H=arguments[3]||0,W=null);let de,Me,Ce,Ie,We,Ke;W!==null?(de=W.max.x-W.min.x,Me=W.max.y-W.min.y,Ce=W.min.x,Ie=W.min.y):(de=A.image.width,Me=A.image.height,Ce=0,Ie=0),q!==null?(We=q.x,Ke=q.y):(We=0,Ke=0);const Ue=je.convert(k.format),dt=je.convert(k.type);P.setTexture2D(k,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,k.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,k.unpackAlignment);const wt=C.getParameter(C.UNPACK_ROW_LENGTH),At=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Tn=C.getParameter(C.UNPACK_SKIP_PIXELS),ct=C.getParameter(C.UNPACK_SKIP_ROWS),Fe=C.getParameter(C.UNPACK_SKIP_IMAGES),Jt=A.isCompressedTexture?A.mipmaps[H]:A.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,Jt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Jt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ce),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ie),A.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,H,We,Ke,de,Me,Ue,dt,Jt.data):A.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,H,We,Ke,Jt.width,Jt.height,Ue,Jt.data):C.texSubImage2D(C.TEXTURE_2D,H,We,Ke,de,Me,Ue,dt,Jt),C.pixelStorei(C.UNPACK_ROW_LENGTH,wt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,At),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Tn),C.pixelStorei(C.UNPACK_SKIP_ROWS,ct),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Fe),H===0&&k.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),se.unbindTexture()},this.copyTextureToTexture3D=function(A,k,W=null,q=null,H=0){A.isTexture!==!0&&(ha("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,q=arguments[1]||null,A=arguments[2],k=arguments[3],H=arguments[4]||0);let de,Me,Ce,Ie,We,Ke,Ue,dt,wt;const At=A.isCompressedTexture?A.mipmaps[H]:A.image;W!==null?(de=W.max.x-W.min.x,Me=W.max.y-W.min.y,Ce=W.max.z-W.min.z,Ie=W.min.x,We=W.min.y,Ke=W.min.z):(de=At.width,Me=At.height,Ce=At.depth,Ie=0,We=0,Ke=0),q!==null?(Ue=q.x,dt=q.y,wt=q.z):(Ue=0,dt=0,wt=0);const Tn=je.convert(k.format),ct=je.convert(k.type);let Fe;if(k.isData3DTexture)P.setTexture3D(k,0),Fe=C.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)P.setTexture2DArray(k,0),Fe=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,k.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,k.unpackAlignment);const Jt=C.getParameter(C.UNPACK_ROW_LENGTH),lt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Kn=C.getParameter(C.UNPACK_SKIP_PIXELS),Ts=C.getParameter(C.UNPACK_SKIP_ROWS),An=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,At.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,At.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ie),C.pixelStorei(C.UNPACK_SKIP_ROWS,We),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ke),A.isDataTexture||A.isData3DTexture?C.texSubImage3D(Fe,H,Ue,dt,wt,de,Me,Ce,Tn,ct,At.data):k.isCompressedArrayTexture?C.compressedTexSubImage3D(Fe,H,Ue,dt,wt,de,Me,Ce,Tn,At.data):C.texSubImage3D(Fe,H,Ue,dt,wt,de,Me,Ce,Tn,ct,At),C.pixelStorei(C.UNPACK_ROW_LENGTH,Jt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,lt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Kn),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ts),C.pixelStorei(C.UNPACK_SKIP_IMAGES,An),H===0&&k.generateMipmaps&&C.generateMipmap(Fe),se.unbindTexture()},this.initRenderTarget=function(A){ge.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),se.unbindTexture()},this.resetState=function(){R=0,w=0,b=null,se.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ql?"display-p3":"srgb",t.unpackColorSpace=rt.workingColorSpace===Ra?"display-p3":"srgb"}}class sh{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ze(e),this.near=t,this.far=n}clone(){return new sh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class yv extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class cf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Tl,this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const un=new N;class no{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ti(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new no(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ft extends si{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Hs;const Pr=new N,Vs=new N,Gs=new N,Ws=new ue,Lr=new ue,lf=new qe,Do=new N,Ir=new N,No=new N,Ru=new ue,mc=new ue,Cu=new ue;class kt extends St{constructor(e=new Ft){if(super(),this.isSprite=!0,this.type="Sprite",Hs===void 0){Hs=new Bt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new cf(t,5);Hs.setIndex([0,1,2,0,2,3]),Hs.setAttribute("position",new no(n,3,0,!1)),Hs.setAttribute("uv",new no(n,2,3,!1))}this.geometry=Hs,this.material=e,this.center=new ue(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Vs.setFromMatrixScale(this.matrixWorld),lf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Gs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Vs.multiplyScalar(-Gs.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Uo(Do.set(-.5,-.5,0),Gs,o,Vs,s,r),Uo(Ir.set(.5,-.5,0),Gs,o,Vs,s,r),Uo(No.set(.5,.5,0),Gs,o,Vs,s,r),Ru.set(0,0),mc.set(1,0),Cu.set(1,1);let a=e.ray.intersectTriangle(Do,Ir,No,!1,Pr);if(a===null&&(Uo(Ir.set(-.5,.5,0),Gs,o,Vs,s,r),mc.set(0,1),a=e.ray.intersectTriangle(Do,No,Ir,!1,Pr),a===null))return;const c=e.ray.origin.distanceTo(Pr);c<e.near||c>e.far||t.push({distance:c,point:Pr.clone(),uv:Gn.getInterpolation(Pr,Do,Ir,No,Ru,mc,Cu,new ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Uo(i,e,t,n,s,r){Ws.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Lr.x=r*Ws.x-s*Ws.y,Lr.y=s*Ws.x+r*Ws.y):Lr.copy(Ws),i.copy(e),i.x+=Lr.x,i.y+=Lr.y,i.applyMatrix4(lf)}const Pu=new N,Lu=new at,Iu=new at,Mv=new N,Du=new qe,Fo=new N,gc=new pi,Nu=new qe,_c=new Ca;class Sv extends X{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Uh,this.bindMatrix=new qe,this.bindMatrixInverse=new qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new fi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fo),this.boundingBox.expandByPoint(Fo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new pi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fo),this.boundingSphere.expandByPoint(Fo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gc.copy(this.boundingSphere),gc.applyMatrix4(s),e.ray.intersectsSphere(gc)!==!1&&(Nu.copy(s).invert(),_c.copy(e.ray).applyMatrix4(Nu),!(this.boundingBox!==null&&_c.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,_c)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Uh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Rp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Lu.fromBufferAttribute(s.attributes.skinIndex,e),Iu.fromBufferAttribute(s.attributes.skinWeight,e),Pu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Iu.getComponent(r);if(o!==0){const a=Lu.getComponent(r);Du.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Mv.copy(Pu).applyMatrix4(Du),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class hf extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class rh extends Ht{constructor(e=null,t=1,n=1,s,r,o,a,c,l=mn,h=mn,f,d){super(null,o,a,c,l,h,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Uu=new qe,wv=new qe;class oh{constructor(e=[],t=[]){this.uuid=Xn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:wv;Uu.multiplyMatrices(a,t[r]),Uu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new oh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new rh(t,e,e,Wn,wn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new hf),this.bones.push(o),this.boneInverses.push(new qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class Cl extends jt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Xs=new qe,Fu=new qe,Oo=[],Ou=new fi,Ev=new qe,Dr=new X,Nr=new pi;class gr extends X{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Cl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ev)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new fi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Xs),Ou.copy(e.boundingBox).applyMatrix4(Xs),this.boundingBox.union(Ou)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Xs),Nr.copy(e.boundingSphere).applyMatrix4(Xs),this.boundingSphere.union(Nr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Dr.geometry=this.geometry,Dr.material=this.material,Dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Nr.copy(this.boundingSphere),Nr.applyMatrix4(n),e.ray.intersectsSphere(Nr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Xs),Fu.multiplyMatrices(n,Xs),Dr.matrixWorld=Fu,Dr.raycast(e,Oo);for(let o=0,a=Oo.length;o<a;o++){const c=Oo[o];c.instanceId=r,c.object=this,t.push(c)}Oo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Cl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new rh(new Float32Array(s*this.count),s,this.count,$l,wn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class uf extends si{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ya=new N,Ma=new N,Bu=new qe,Ur=new Ca,Bo=new pi,xc=new N,zu=new N;class ah extends St{constructor(e=new Bt,t=new uf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ya.fromBufferAttribute(t,s-1),Ma.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ya.distanceTo(Ma);e.setAttribute("lineDistance",new xt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bo.copy(n.boundingSphere),Bo.applyMatrix4(s),Bo.radius+=r,e.ray.intersectsSphere(Bo)===!1)return;Bu.copy(s).invert(),Ur.copy(e.ray).applyMatrix4(Bu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=p,u=m-1;_<u;_+=l){const g=h.getX(_),S=h.getX(_+1),v=zo(this,e,Ur,c,g,S);v&&t.push(v)}if(this.isLineLoop){const _=h.getX(m-1),u=h.getX(p),g=zo(this,e,Ur,c,_,u);g&&t.push(g)}}else{const p=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=p,u=m-1;_<u;_+=l){const g=zo(this,e,Ur,c,_,_+1);g&&t.push(g)}if(this.isLineLoop){const _=zo(this,e,Ur,c,m-1,p);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function zo(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(ya.fromBufferAttribute(o,s),Ma.fromBufferAttribute(o,r),t.distanceSqToSegment(ya,Ma,xc,zu)>n)return;xc.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(xc);if(!(c<e.near||c>e.far))return{distance:c,point:zu.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const ku=new N,Hu=new N;class bv extends ah{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)ku.fromBufferAttribute(t,s),Hu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ku.distanceTo(Hu);e.setAttribute("lineDistance",new xt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Tv extends ah{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class La extends si{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Vu=new qe,Pl=new Ca,ko=new pi,Ho=new N;class ch extends St{constructor(e=new Bt,t=new La){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ko.copy(n.boundingSphere),ko.applyMatrix4(s),ko.radius+=r,e.ray.intersectsSphere(ko)===!1)return;Vu.copy(s).invert(),Pl.copy(e.ray).applyMatrix4(Vu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,f=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let m=d,_=p;m<_;m++){const u=l.getX(m);Ho.fromBufferAttribute(f,u),Gu(Ho,u,c,s,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let m=d,_=p;m<_;m++)Ho.fromBufferAttribute(f,m),Gu(Ho,m,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Gu(i,e,t,n,s,r,o){const a=Pl.distanceSqToPoint(i);if(a<t){const c=new N;Pl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class hn extends Ht{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class mi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,p=(o-h)/d;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new ue:new N);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new N,s=[],r=[],o=[],a=new N,c=new qe;for(let p=0;p<=e;p++){const m=p/e;s[p]=this.getTangentAt(m,new N)}r[0]=new N,o[0]=new N;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(zt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,m))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(zt(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],p*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class lh extends mi{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ue){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*f+this.aX,l=d*f+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Av extends lh{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function hh(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,f){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+f)+(c-a)/f;d*=h,p*=h,s(o,a,d,p)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const Vo=new N,vc=new hh,yc=new hh,Mc=new hh;class Rv extends mi{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new N){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Vo.subVectors(s[0],s[1]).add(s[0]),l=Vo);const f=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Vo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Vo),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(f),p),_=Math.pow(f.distanceToSquared(d),p),u=Math.pow(d.distanceToSquared(h),p);_<1e-4&&(_=1),m<1e-4&&(m=_),u<1e-4&&(u=_),vc.initNonuniformCatmullRom(l.x,f.x,d.x,h.x,m,_,u),yc.initNonuniformCatmullRom(l.y,f.y,d.y,h.y,m,_,u),Mc.initNonuniformCatmullRom(l.z,f.z,d.z,h.z,m,_,u)}else this.curveType==="catmullrom"&&(vc.initCatmullRom(l.x,f.x,d.x,h.x,this.tension),yc.initCatmullRom(l.y,f.y,d.y,h.y,this.tension),Mc.initCatmullRom(l.z,f.z,d.z,h.z,this.tension));return n.set(vc.calc(c),yc.calc(c),Mc.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new N().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Wu(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function Cv(i,e){const t=1-i;return t*t*e}function Pv(i,e){return 2*(1-i)*i*e}function Lv(i,e){return i*i*e}function Kr(i,e,t,n){return Cv(i,e)+Pv(i,t)+Lv(i,n)}function Iv(i,e){const t=1-i;return t*t*t*e}function Dv(i,e){const t=1-i;return 3*t*t*i*e}function Nv(i,e){return 3*(1-i)*i*i*e}function Uv(i,e){return i*i*i*e}function Yr(i,e,t,n,s){return Iv(i,e)+Dv(i,t)+Nv(i,n)+Uv(i,s)}class df extends mi{constructor(e=new ue,t=new ue,n=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ue){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Yr(e,s.x,r.x,o.x,a.x),Yr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Fv extends mi{constructor(e=new N,t=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new N){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Yr(e,s.x,r.x,o.x,a.x),Yr(e,s.y,r.y,o.y,a.y),Yr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ff extends mi{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ov extends mi{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pf extends mi{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Kr(e,s.x,r.x,o.x),Kr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bv extends mi{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Kr(e,s.x,r.x,o.x),Kr(e,s.y,r.y,o.y),Kr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mf extends mi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(Wu(a,c.x,l.x,h.x,f.x),Wu(a,c.y,l.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ue().fromArray(s))}return this}}var Ll=Object.freeze({__proto__:null,ArcCurve:Av,CatmullRomCurve3:Rv,CubicBezierCurve:df,CubicBezierCurve3:Fv,EllipseCurve:lh,LineCurve:ff,LineCurve3:Ov,QuadraticBezierCurve:pf,QuadraticBezierCurve3:Bv,SplineCurve:mf});class zv extends mi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ll[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Ll[s.type]().fromJSON(s))}return this}}class Xu extends zv{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new ff(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new pf(this.currentPoint.clone(),new ue(e,t),new ue(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new df(this.currentPoint.clone(),new ue(e,t),new ue(n,s),new ue(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new mf(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){const l=new lh(e,t,n,s,r,o,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ms extends Bt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new N,h=new ue;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=t;f++,d+=3){const p=n+f/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new xt(o,3)),this.setAttribute("normal",new xt(a,3)),this.setAttribute("uv",new xt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ms(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ge extends Bt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],d=[],p=[];let m=0;const _=[],u=n/2;let g=0;S(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new xt(f,3)),this.setAttribute("normal",new xt(d,3)),this.setAttribute("uv",new xt(p,2));function S(){const M=new N,R=new N;let w=0;const b=(t-e)/n;for(let T=0;T<=r;T++){const F=[],x=T/r,y=x*(t-e)+e;for(let D=0;D<=s;D++){const L=D/s,I=L*c+a,B=Math.sin(I),U=Math.cos(I);R.x=y*B,R.y=-x*n+u,R.z=y*U,f.push(R.x,R.y,R.z),M.set(B,b,U).normalize(),d.push(M.x,M.y,M.z),p.push(L,1-x),F.push(m++)}_.push(F)}for(let T=0;T<s;T++)for(let F=0;F<r;F++){const x=_[F][T],y=_[F+1][T],D=_[F+1][T+1],L=_[F][T+1];e>0&&(h.push(x,y,L),w+=3),t>0&&(h.push(y,D,L),w+=3)}l.addGroup(g,w,0),g+=w}function v(M){const R=m,w=new ue,b=new N;let T=0;const F=M===!0?e:t,x=M===!0?1:-1;for(let D=1;D<=s;D++)f.push(0,u*x,0),d.push(0,x,0),p.push(.5,.5),m++;const y=m;for(let D=0;D<=s;D++){const I=D/s*c+a,B=Math.cos(I),U=Math.sin(I);b.x=F*U,b.y=u*x,b.z=F*B,f.push(b.x,b.y,b.z),d.push(0,x,0),w.x=B*.5+.5,w.y=U*.5*x+.5,p.push(w.x,w.y),m++}for(let D=0;D<s;D++){const L=R+D,I=y+D;M===!0?h.push(I,I+1,L):h.push(I+1,I,L),T+=3}l.addGroup(g,T,M===!0?1:2),g+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ge(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class pn extends Ge{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new pn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ia extends Xu{constructor(e){super(e),this.uuid=Xn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Xu().fromJSON(s))}return this}}const kv={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=gf(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,f,d,p;if(n&&(r=Xv(i,e,r,t)),i.length>80*t){a=l=i[0],c=h=i[1];for(let m=t;m<s;m+=t)f=i[m],d=i[m+1],f<a&&(a=f),d<c&&(c=d),f>l&&(l=f),d>h&&(h=d);p=Math.max(l-a,h-c),p=p!==0?32767/p:0}return io(r,o,t,a,c,p,0),o}};function gf(i,e,t,n,s){let r,o;if(s===ny(i,e,t,n)>0)for(r=e;r<t;r+=n)o=qu(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=qu(r,i[r],i[r+1],o);return o&&Da(o,o.next)&&(ro(o),o=o.next),o}function Ss(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Da(t,t.next)||Tt(t.prev,t,t.next)===0)){if(ro(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function io(i,e,t,n,s,r,o){if(!i)return;!o&&r&&jv(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Vv(i,n,s,r):Hv(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),ro(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Gv(Ss(i),e,t),io(i,e,t,n,s,r,2)):o===2&&Wv(i,e,t,n,s,r):io(Ss(i),e,t,n,s,r,1);break}}}function Hv(i){const e=i.prev,t=i,n=i.next;if(Tt(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,f=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,p=a>c?a>l?a:l:c>l?c:l;let m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=f&&m.y<=p&&Zs(s,a,r,c,o,l,m.x,m.y)&&Tt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Vv(i,e,t,n){const s=i.prev,r=i,o=i.next;if(Tt(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,f=r.y,d=o.y,p=a<c?a<l?a:l:c<l?c:l,m=h<f?h<d?h:d:f<d?f:d,_=a>c?a>l?a:l:c>l?c:l,u=h>f?h>d?h:d:f>d?f:d,g=Il(p,m,e,t,n),S=Il(_,u,e,t,n);let v=i.prevZ,M=i.nextZ;for(;v&&v.z>=g&&M&&M.z<=S;){if(v.x>=p&&v.x<=_&&v.y>=m&&v.y<=u&&v!==s&&v!==o&&Zs(a,h,c,f,l,d,v.x,v.y)&&Tt(v.prev,v,v.next)>=0||(v=v.prevZ,M.x>=p&&M.x<=_&&M.y>=m&&M.y<=u&&M!==s&&M!==o&&Zs(a,h,c,f,l,d,M.x,M.y)&&Tt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;v&&v.z>=g;){if(v.x>=p&&v.x<=_&&v.y>=m&&v.y<=u&&v!==s&&v!==o&&Zs(a,h,c,f,l,d,v.x,v.y)&&Tt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;M&&M.z<=S;){if(M.x>=p&&M.x<=_&&M.y>=m&&M.y<=u&&M!==s&&M!==o&&Zs(a,h,c,f,l,d,M.x,M.y)&&Tt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Gv(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!Da(s,r)&&_f(s,n,n.next,r)&&so(s,r)&&so(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),ro(n),ro(n.next),n=i=r),n=n.next}while(n!==i);return Ss(n)}function Wv(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Qv(o,a)){let c=xf(o,a);o=Ss(o,o.next),c=Ss(c,c.next),io(o,e,t,n,s,r,0),io(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Xv(i,e,t,n){const s=[];let r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=gf(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Jv(l));for(s.sort(qv),r=0;r<s.length;r++)t=Kv(s[r],t);return t}function qv(i,e){return i.x-e.x}function Kv(i,e){const t=Yv(i,e);if(!t)return e;const n=xf(t,i);return Ss(n,n.next),Ss(t,t.next)}function Yv(i,e){let t=e,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,s=t.x<t.next.x?t:t.next,d===r))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,f;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&Zs(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(f=Math.abs(o-t.y)/(r-t.x),so(t,i)&&(f<h||f===h&&(t.x>s.x||t.x===s.x&&$v(s,t)))&&(s=t,h=f)),t=t.next;while(t!==a);return s}function $v(i,e){return Tt(i.prev,i,e.prev)<0&&Tt(e.next,i,i.next)<0}function jv(i,e,t,n){let s=i;do s.z===0&&(s.z=Il(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Zv(s)}function Zv(i){let e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function Il(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Jv(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Zs(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Qv(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!ey(i,e)&&(so(i,e)&&so(e,i)&&ty(i,e)&&(Tt(i.prev,i,e.prev)||Tt(i,e.prev,e))||Da(i,e)&&Tt(i.prev,i,i.next)>0&&Tt(e.prev,e,e.next)>0)}function Tt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Da(i,e){return i.x===e.x&&i.y===e.y}function _f(i,e,t,n){const s=Wo(Tt(i,e,t)),r=Wo(Tt(i,e,n)),o=Wo(Tt(t,n,i)),a=Wo(Tt(t,n,e));return!!(s!==r&&o!==a||s===0&&Go(i,t,e)||r===0&&Go(i,n,e)||o===0&&Go(t,i,n)||a===0&&Go(t,e,n))}function Go(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Wo(i){return i>0?1:i<0?-1:0}function ey(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&_f(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function so(i,e){return Tt(i.prev,i,i.next)<0?Tt(i,e,i.next)>=0&&Tt(i,i.prev,e)>=0:Tt(i,e,i.prev)<0||Tt(i,i.next,e)<0}function ty(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function xf(i,e){const t=new Dl(i.i,i.x,i.y),n=new Dl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function qu(i,e,t,n){const s=new Dl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ro(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Dl(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ny(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class ns{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return ns.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Ku(e),Yu(n,e);let o=e.length;t.forEach(Ku);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,Yu(n,t[c]);const a=kv.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Ku(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Yu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class uh extends Bt{constructor(e=new Ia([new ue(.5,.5),new ue(-.5,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new xt(s,3)),this.setAttribute("uv",new xt(r,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:p-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,u=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:iy;let v,M=!1,R,w,b,T;g&&(v=g.getSpacedPoints(h),M=!0,d=!1,R=g.computeFrenetFrames(h,!1),w=new N,b=new N,T=new N),d||(u=0,p=0,m=0,_=0);const F=a.extractPoints(l);let x=F.shape;const y=F.holes;if(!ns.isClockWise(x)){x=x.reverse();for(let ie=0,C=y.length;ie<C;ie++){const Y=y[ie];ns.isClockWise(Y)&&(y[ie]=Y.reverse())}}const L=ns.triangulateShape(x,y),I=x;for(let ie=0,C=y.length;ie<C;ie++){const Y=y[ie];x=x.concat(Y)}function B(ie,C,Y){return C||console.error("THREE.ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(C,Y)}const U=x.length,G=L.length;function O(ie,C,Y){let ee,ne,se;const pe=ie.x-C.x,ge=ie.y-C.y,P=Y.x-ie.x,E=Y.y-ie.y,V=pe*pe+ge*ge,te=pe*E-ge*P;if(Math.abs(te)>Number.EPSILON){const re=Math.sqrt(V),Q=Math.sqrt(P*P+E*E),Re=C.x-ge/re,me=C.y+pe/re,Ee=Y.x-E/Q,tt=Y.y+P/Q,le=((Ee-Re)*E-(tt-me)*P)/(pe*E-ge*P);ee=Re+pe*le-ie.x,ne=me+ge*le-ie.y;const be=ee*ee+ne*ne;if(be<=2)return new ue(ee,ne);se=Math.sqrt(be/2)}else{let re=!1;pe>Number.EPSILON?P>Number.EPSILON&&(re=!0):pe<-Number.EPSILON?P<-Number.EPSILON&&(re=!0):Math.sign(ge)===Math.sign(E)&&(re=!0),re?(ee=-ge,ne=pe,se=Math.sqrt(V)):(ee=pe,ne=ge,se=Math.sqrt(V/2))}return new ue(ee/se,ne/se)}const J=[];for(let ie=0,C=I.length,Y=C-1,ee=ie+1;ie<C;ie++,Y++,ee++)Y===C&&(Y=0),ee===C&&(ee=0),J[ie]=O(I[ie],I[Y],I[ee]);const j=[];let ce,Te=J.concat();for(let ie=0,C=y.length;ie<C;ie++){const Y=y[ie];ce=[];for(let ee=0,ne=Y.length,se=ne-1,pe=ee+1;ee<ne;ee++,se++,pe++)se===ne&&(se=0),pe===ne&&(pe=0),ce[ee]=O(Y[ee],Y[se],Y[pe]);j.push(ce),Te=Te.concat(ce)}for(let ie=0;ie<u;ie++){const C=ie/u,Y=p*Math.cos(C*Math.PI/2),ee=m*Math.sin(C*Math.PI/2)+_;for(let ne=0,se=I.length;ne<se;ne++){const pe=B(I[ne],J[ne],ee);fe(pe.x,pe.y,-Y)}for(let ne=0,se=y.length;ne<se;ne++){const pe=y[ne];ce=j[ne];for(let ge=0,P=pe.length;ge<P;ge++){const E=B(pe[ge],ce[ge],ee);fe(E.x,E.y,-Y)}}}const Le=m+_;for(let ie=0;ie<U;ie++){const C=d?B(x[ie],Te[ie],Le):x[ie];M?(b.copy(R.normals[0]).multiplyScalar(C.x),w.copy(R.binormals[0]).multiplyScalar(C.y),T.copy(v[0]).add(b).add(w),fe(T.x,T.y,T.z)):fe(C.x,C.y,0)}for(let ie=1;ie<=h;ie++)for(let C=0;C<U;C++){const Y=d?B(x[C],Te[C],Le):x[C];M?(b.copy(R.normals[ie]).multiplyScalar(Y.x),w.copy(R.binormals[ie]).multiplyScalar(Y.y),T.copy(v[ie]).add(b).add(w),fe(T.x,T.y,T.z)):fe(Y.x,Y.y,f/h*ie)}for(let ie=u-1;ie>=0;ie--){const C=ie/u,Y=p*Math.cos(C*Math.PI/2),ee=m*Math.sin(C*Math.PI/2)+_;for(let ne=0,se=I.length;ne<se;ne++){const pe=B(I[ne],J[ne],ee);fe(pe.x,pe.y,f+Y)}for(let ne=0,se=y.length;ne<se;ne++){const pe=y[ne];ce=j[ne];for(let ge=0,P=pe.length;ge<P;ge++){const E=B(pe[ge],ce[ge],ee);M?fe(E.x,E.y+v[h-1].y,v[h-1].x+Y):fe(E.x,E.y,f+Y)}}}K(),ae();function K(){const ie=s.length/3;if(d){let C=0,Y=U*C;for(let ee=0;ee<G;ee++){const ne=L[ee];De(ne[2]+Y,ne[1]+Y,ne[0]+Y)}C=h+u*2,Y=U*C;for(let ee=0;ee<G;ee++){const ne=L[ee];De(ne[0]+Y,ne[1]+Y,ne[2]+Y)}}else{for(let C=0;C<G;C++){const Y=L[C];De(Y[2],Y[1],Y[0])}for(let C=0;C<G;C++){const Y=L[C];De(Y[0]+U*h,Y[1]+U*h,Y[2]+U*h)}}n.addGroup(ie,s.length/3-ie,0)}function ae(){const ie=s.length/3;let C=0;_e(I,C),C+=I.length;for(let Y=0,ee=y.length;Y<ee;Y++){const ne=y[Y];_e(ne,C),C+=ne.length}n.addGroup(ie,s.length/3-ie,1)}function _e(ie,C){let Y=ie.length;for(;--Y>=0;){const ee=Y;let ne=Y-1;ne<0&&(ne=ie.length-1);for(let se=0,pe=h+u*2;se<pe;se++){const ge=U*se,P=U*(se+1),E=C+ee+ge,V=C+ne+ge,te=C+ne+P,re=C+ee+P;Ne(E,V,te,re)}}}function fe(ie,C,Y){c.push(ie),c.push(C),c.push(Y)}function De(ie,C,Y){Pe(ie),Pe(C),Pe(Y);const ee=s.length/3,ne=S.generateTopUV(n,s,ee-3,ee-2,ee-1);He(ne[0]),He(ne[1]),He(ne[2])}function Ne(ie,C,Y,ee){Pe(ie),Pe(C),Pe(ee),Pe(C),Pe(Y),Pe(ee);const ne=s.length/3,se=S.generateSideWallUV(n,s,ne-6,ne-3,ne-2,ne-1);He(se[0]),He(se[1]),He(se[3]),He(se[1]),He(se[2]),He(se[3])}function Pe(ie){s.push(c[ie*3+0]),s.push(c[ie*3+1]),s.push(c[ie*3+2])}function He(ie){r.push(ie.x),r.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return sy(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ll[s.type]().fromJSON(s)),new uh(n,e.options)}}const iy={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new ue(r,o),new ue(a,c),new ue(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],f=e[n*3+2],d=e[s*3],p=e[s*3+1],m=e[s*3+2],_=e[r*3],u=e[r*3+1],g=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ue(o,1-c),new ue(l,1-f),new ue(d,1-m),new ue(_,1-g)]:[new ue(a,1-c),new ue(h,1-f),new ue(p,1-m),new ue(u,1-g)]}};function sy(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class dh extends Bt{constructor(e=new Ia([new ue(0,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new xt(s,3)),this.setAttribute("normal",new xt(r,3)),this.setAttribute("uv",new xt(o,2));function l(h){const f=s.length/3,d=h.extractPoints(t);let p=d.shape;const m=d.holes;ns.isClockWise(p)===!1&&(p=p.reverse());for(let u=0,g=m.length;u<g;u++){const S=m[u];ns.isClockWise(S)===!0&&(m[u]=S.reverse())}const _=ns.triangulateShape(p,m);for(let u=0,g=m.length;u<g;u++){const S=m[u];p=p.concat(S)}for(let u=0,g=p.length;u<g;u++){const S=p[u];s.push(S.x,S.y,0),r.push(0,0,1),o.push(S.x,S.y)}for(let u=0,g=_.length;u<g;u++){const S=_[u],v=S[0]+f,M=S[1]+f,R=S[2]+f;n.push(v,M,R),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return ry(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];n.push(o)}return new dh(n,e.curveSegments)}}function ry(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class Dn extends Bt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],f=new N,d=new N,p=[],m=[],_=[],u=[];for(let g=0;g<=n;g++){const S=[],v=g/n;let M=0;g===0&&o===0?M=.5/t:g===n&&c===Math.PI&&(M=-.5/t);for(let R=0;R<=t;R++){const w=R/t;f.x=-e*Math.cos(s+w*r)*Math.sin(o+v*a),f.y=e*Math.cos(o+v*a),f.z=e*Math.sin(s+w*r)*Math.sin(o+v*a),m.push(f.x,f.y,f.z),d.copy(f).normalize(),_.push(d.x,d.y,d.z),u.push(w+M,1-v),S.push(l++)}h.push(S)}for(let g=0;g<n;g++)for(let S=0;S<t;S++){const v=h[g][S+1],M=h[g][S],R=h[g+1][S],w=h[g+1][S+1];(g!==0||o>0)&&p.push(v,M,w),(g!==n-1||c<Math.PI)&&p.push(M,R,w)}this.setIndex(p),this.setAttribute("position",new xt(m,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class fh extends Bt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new N,f=new N,d=new N;for(let p=0;p<=n;p++)for(let m=0;m<=s;m++){const _=m/s*r,u=p/n*Math.PI*2;f.x=(e+t*Math.cos(u))*Math.cos(_),f.y=(e+t*Math.cos(u))*Math.sin(_),f.z=t*Math.sin(u),a.push(f.x,f.y,f.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(f,h).normalize(),c.push(d.x,d.y,d.z),l.push(m/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let m=1;m<=s;m++){const _=(s+1)*p+m-1,u=(s+1)*(p-1)+m-1,g=(s+1)*(p-1)+m,S=(s+1)*p+m;o.push(_,u,S),o.push(u,g,S)}this.setIndex(o),this.setAttribute("position",new xt(a,3)),this.setAttribute("normal",new xt(c,3)),this.setAttribute("uv",new xt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fh(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Z extends si{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vd,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gi extends Z{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return zt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Xo(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function oy(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ay(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function $u(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function vf(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class ao{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class cy extends ao{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fh,endingEnd:Fh}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Oh:r=e,a=2*t-n;break;case Bh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Oh:o=e,c=2*n-t;break;case Bh:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,p=this._weightNext,m=(n-t)/(s-t),_=m*m,u=_*m,g=-d*u+2*d*_-d*m,S=(1+d)*u+(-1.5-2*d)*_+(-.5+d)*m+1,v=(-1-p)*u+(1.5+p)*_+.5*m,M=p*u-p*_;for(let R=0;R!==a;++R)r[R]=g*o[h+R]+S*o[l+R]+v*o[c+R]+M*o[f+R];return r}}class ly extends ao{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),f=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*f+o[c+d]*h;return r}}class hy extends ao{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class _i{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Xo(t,this.TimeBufferType),this.values=Xo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Xo(e.times,Array),values:Xo(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new hy(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ly(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new cy(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Qr:t=this.InterpolantFactoryMethodDiscrete;break;case eo:t=this.InterpolantFactoryMethodLinear;break;case ka:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Qr;case this.InterpolantFactoryMethodLinear:return eo;case this.InterpolantFactoryMethodSmooth:return ka}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&oy(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ka,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{const f=a*n,d=f-n,p=f+n;for(let m=0;m!==n;++m){const _=t[f+m];if(_!==t[d+m]||_!==t[p+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const f=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[f+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}_i.prototype.TimeBufferType=Float32Array;_i.prototype.ValueBufferType=Float32Array;_i.prototype.DefaultInterpolation=eo;class wr extends _i{constructor(e,t,n){super(e,t,n)}}wr.prototype.ValueTypeName="bool";wr.prototype.ValueBufferType=Array;wr.prototype.DefaultInterpolation=Qr;wr.prototype.InterpolantFactoryMethodLinear=void 0;wr.prototype.InterpolantFactoryMethodSmooth=void 0;class yf extends _i{}yf.prototype.ValueTypeName="color";class _r extends _i{}_r.prototype.ValueTypeName="number";class uy extends ao{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t);let l=e*a;for(let h=l+a;l!==h;l+=4)_n.slerpFlat(r,0,o,l-a,o,l,c);return r}}class xr extends _i{InterpolantFactoryMethodLinear(e){return new uy(this.times,this.values,this.getValueSize(),e)}}xr.prototype.ValueTypeName="quaternion";xr.prototype.InterpolantFactoryMethodSmooth=void 0;class Er extends _i{constructor(e,t,n){super(e,t,n)}}Er.prototype.ValueTypeName="string";Er.prototype.ValueBufferType=Array;Er.prototype.DefaultInterpolation=Qr;Er.prototype.InterpolantFactoryMethodLinear=void 0;Er.prototype.InterpolantFactoryMethodSmooth=void 0;class vr extends _i{}vr.prototype.ValueTypeName="vector";class dy{constructor(e="",t=-1,n=[],s=Cp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Xn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(py(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(_i.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=ay(c);c=$u(c,1,h),l=$u(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new _r(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(r);if(h&&h.length>1){const f=h[1];let d=s[f];d||(s[f]=d=[]),d.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(f,d,p,m,_){if(p.length!==0){const u=[],g=[];vf(p,u,g,m),u.length!==0&&_.push(new f(d,u,g))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let f=0;f<l.length;f++){const d=l[f].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)p[d[m].morphTargets[_]]=-1;for(const _ in p){const u=[],g=[];for(let S=0;S!==d[m].morphTargets.length;++S){const v=d[m];u.push(v.time),g.push(v.morphTarget===_?1:0)}s.push(new _r(".morphTargetInfluence["+_+"]",u,g))}c=p.length*o}else{const p=".bones["+t[f].name+"]";n(vr,p+".position",d,"pos",s),n(xr,p+".quaternion",d,"rot",s),n(vr,p+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function fy(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return _r;case"vector":case"vector2":case"vector3":case"vector4":return vr;case"color":return yf;case"quaternion":return xr;case"bool":case"boolean":return wr;case"string":return Er}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function py(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=fy(i.type);if(i.times===void 0){const t=[],n=[];vf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const ji={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class my{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){const f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=l.length;f<d;f+=2){const p=l[f],m=l[f+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null}}}const gy=new my;class bs{constructor(e){this.manager=e!==void 0?e:gy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}bs.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ei={};class _y extends Error{constructor(e,t){super(e),this.response=t}}class ph extends bs{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ji.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ei[e]!==void 0){Ei[e].push({onLoad:t,onProgress:n,onError:s});return}Ei[e]=[],Ei[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Ei[e],f=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=d?parseInt(d):0,m=p!==0;let _=0;const u=new ReadableStream({start(g){S();function S(){f.read().then(({done:v,value:M})=>{if(v)g.close();else{_+=M.byteLength;const R=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:p});for(let w=0,b=h.length;w<b;w++){const T=h[w];T.onProgress&&T.onProgress(R)}g.enqueue(M),S()}},v=>{g.error(v)})}}});return new Response(u)}else throw new _y(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),d=f&&f[1]?f[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(m=>p.decode(m))}}}).then(l=>{ji.add(e,l);const h=Ei[e];delete Ei[e];for(let f=0,d=h.length;f<d;f++){const p=h[f];p.onLoad&&p.onLoad(l)}}).catch(l=>{const h=Ei[e];if(h===void 0)throw this.manager.itemError(e),l;delete Ei[e];for(let f=0,d=h.length;f<d;f++){const p=h[f];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class xy extends bs{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ji.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=to("img");function c(){h(),ji.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(f){h(),s&&s(f),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class vy extends bs{constructor(e){super(e)}load(e,t,n,s){const r=this,o=new rh,a=new ph(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(s!==void 0)s(h);else{console.error(h);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:hi,o.wrapT=l.wrapT!==void 0?l.wrapT:hi,o.magFilter=l.magFilter!==void 0?l.magFilter:$t,o.minFilter=l.minFilter!==void 0?l.minFilter:$t,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(o.colorSpace=l.colorSpace),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=ui),l.mipmapCount===1&&(o.minFilter=$t),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,t&&t(o,l)},n,s),o}}class yy extends bs{constructor(e){super(e)}load(e,t,n,s){const r=new Ht,o=new xy(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Na extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class My extends Na{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Sc=new qe,ju=new N,Zu=new N;class mh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new th,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ju.setFromMatrixPosition(e.matrixWorld),t.position.copy(ju),Zu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zu),t.updateMatrixWorld(),Sc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Sc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Sy extends mh{constructor(){super(new fn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=pr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Mf extends Na{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Sy}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Ju=new qe,Fr=new N,wc=new N;class wy extends mh{constructor(){super(new fn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Fr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Fr),wc.copy(n.position),wc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(wc),n.updateMatrixWorld(),s.makeTranslation(-Fr.x,-Fr.y,-Fr.z),Ju.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ju)}}class Ey extends Na{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new wy}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class by extends mh{constructor(){super(new nh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Sf extends Na{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new by}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class $r{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Ty extends bs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ji.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ji.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),ji.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ji.add(e,c),r.manager.itemStart(e)}}const gh="\\[\\]\\.:\\/",Ay=new RegExp("["+gh+"]","g"),_h="[^"+gh+"]",Ry="[^"+gh.replace("\\.","")+"]",Cy=/((?:WC+[\/:])*)/.source.replace("WC",_h),Py=/(WCOD+)?/.source.replace("WCOD",Ry),Ly=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",_h),Iy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",_h),Dy=new RegExp("^"+Cy+Py+Ly+Iy+"$"),Ny=["material","materials","bones","map"];class Uy{constructor(e,t,n){const s=n||pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class pt{constructor(e,t,n){this.path=t,this.parsedPath=n||pt.parseTrackName(t),this.node=pt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new pt.Composite(e,t,n):new pt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ay,"")}static parseTrackName(e){const t=Dy.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Ny.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=pt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[s];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}pt.Composite=Uy;pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray];pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xl);const ht={mass:1043,wingArea:16.2,wingSpan:11,chord:1.47,CL0:.25,CLalpha:4.8,CLflap:.55,CD0:.032,kInduced:.055,CDflap:.09,CDgear:.02,alphaCrit:15*Math.PI/180,thrustMax:5200,rho0:1.225,gearHeight:1.1,Vr:26,stallWarn:12*Math.PI/180},Fy={...ht};function wf(i={}){Object.assign(ht,Fy,i)}const Ec={Vfe:85,Vno:129,Vne:163},bc=.514444,Tc={Vfe:Ec.Vfe*bc,Vno:Ec.Vno*bc,Vne:Ec.Vne*bc};function Ef(i){return ht.rho0*Math.exp(-i/8500)}function Oy(i,e,t,n,s,r={}){const{x:o,y:a,z:c}=i,l=-c,h=-a,f=Math.hypot(o,a,c),d=Ef(Math.max(0,s)),p=.5*d*f*f;let m=0,_=0;f>.5&&(m=Math.atan2(h,Math.max(.1,l)),_=Math.asin(Math.max(-1,Math.min(1,o/f))));const u=ht.wingArea,g=ht.alphaCrit-t*(2*Math.PI/180)+(r.critBonus||0);let S=ht.CL0+ht.CLalpha*m+ht.CLflap*t,v=ht.CD0+ht.kInduced*S*S+ht.CDflap*t+(n?ht.CDgear:0);const M=m>g&&f>5;if(M){const b=Math.min(.5,(m-g)*2.2);S*=1-b,v+=b*1.6}const R=p*u*S*(r.liftMul||1),w=p*u*v;return{V:f,alpha:m,beta:_,q:p,rho:d,CL:S,CD:v,lift:R,drag:w,stalled:M,alphaCrit:g}}function By(i,e,t,n=1){const s=Ef(t)/ht.rho0,r=Math.max(.25,1-e/110);return i*ht.thrustMax*(.55+.45*r)*(.6+.4*s)*n}function zy(i,e,t){const n=Math.max(0,1-e/55),s=i*n*.35+i*Math.max(0,t)*.5*n,r=-i*n*.28;return{yawRate:s,rollRate:r}}function ky(i,e,t){const n=[];return e>.01&&i>Tc.Vfe&&n.push("flap-overspeed"),i>Tc.Vne?n.push("vne"):i>Tc.Vno&&n.push("vno"),n}function Hy(i,e,t=1.7){if(!e)return null;const n=e===1?.5:1.4;return{x:(Math.sin(i*2.1*t)+Math.sin(i*5.7)*.5)*n,y:(Math.sin(i*1.7+2)+Math.sin(i*4.3+1)*.5)*n*.7,z:Math.sin(i*1.3+4)*n*.5,roll:Math.sin(i*3.1+.7)*n*.25}}const jr=[0,10,20,30];function Vy(i){return jr[Math.max(0,Math.min(jr.length-1,i))]/30}const bf=Math.sqrt(3),Gy=.5*(bf-1),Or=(3-bf)/6,Qu=i=>Math.floor(i)|0,ed=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);function Wy(i=Math.random){const e=Xy(i),t=new Float64Array(e).map(s=>ed[s%12*2]),n=new Float64Array(e).map(s=>ed[s%12*2+1]);return function(r,o){let a=0,c=0,l=0;const h=(r+o)*Gy,f=Qu(r+h),d=Qu(o+h),p=(f+d)*Or,m=f-p,_=d-p,u=r-m,g=o-_;let S,v;u>g?(S=1,v=0):(S=0,v=1);const M=u-S+Or,R=g-v+Or,w=u-1+2*Or,b=g-1+2*Or,T=f&255,F=d&255;let x=.5-u*u-g*g;if(x>=0){const L=T+e[F],I=t[L],B=n[L];x*=x,a=x*x*(I*u+B*g)}let y=.5-M*M-R*R;if(y>=0){const L=T+S+e[F+v],I=t[L],B=n[L];y*=y,c=y*y*(I*M+B*R)}let D=.5-w*w-b*b;if(D>=0){const L=T+1+e[F+1],I=t[L],B=n[L];D*=D,l=D*D*(I*w+B*b)}return 70*(a+c+l)}}function Xy(i){const t=new Uint8Array(512);for(let n=0;n<512/2;n++)t[n]=n;for(let n=0;n<512/2-1;n++){const s=n+~~(i()*(256-n)),r=t[n];t[n]=t[s],t[s]=r}for(let n=256;n<512;n++)t[n]=t[n-256];return t}class Ua extends X{constructor(){const e=Ua.SkyShader,t=new Ni({name:e.name,uniforms:Jd.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:gn,depthWrite:!1});super(new he(1,1,1),t),this.isSky=!0}}Ua.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new N},up:{value:new N(0,1,0)}},vertexShader:`
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

		}`};const _t={elev:6,halfLen:600,halfWid:15},on={x0:40,x1:170,z0:60,z1:280},Ut={elev:12,x:2500,z:1900,halfLen:300,halfWid:10},Yt={elev:20,x:-1500,z:-5600,halfLen:280,halfWid:10},qy=[[-1500,-6e3,2600,90],[-7e3,1500,2300,70],[7500,-2500,2800,210],[8500,7500,2100,55],[-13500,5500,2800,150],[13500,2e3,2200,90],[3e3,13e3,2400,80],[4e3,-5500,500,12],[-4500,-3500,600,15],[5500,4500,450,10]],qo={x:-300,z:920},Ki={x:60,z:310},Tf=[{name:"PILOT SHOP",x:-300,z:920},{name:"AIRPORT SUPPLY",x:122,z:-30},{name:"BEACH GEAR",x:8420,z:7410},{name:"CITY PILOT SUPPLY",x:-6940,z:1560},{name:"GENERAL STORE",x:-1150,z:-5240},{name:"BAIT & TACKLE",x:2590,z:2050}],Xt={x:130,z:-140},Vi={x0:30,x1:230,z0:-450,z1:450};function Ky(i,e){const t=Ot(Vi.x0-80,Vi.x0+30,i)*(1-Ot(Vi.x1-30,Vi.x1+80,i)),n=Ot(Vi.z0-80,Vi.z0+30,e)*(1-Ot(Vi.z1-30,Vi.z1+80,e));return t*n}const Js=Wy(di(1337));function Ot(i,e,t){const n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)}function di(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Yy(i,e){const t=Math.hypot(i,e),n=1-Ot(900,3400,t);let s;if(n<=0)s=-8;else{s=Js(i*9e-4,e*9e-4)*120+Js(i*.004+7.3,e*.004-2.1)*28+Js(i*.02,e*.02)*4,s=(s*.5+60)*n;const o=Math.hypot(i-1800,e+600);s+=Math.max(0,1-o/900)*320*n}for(const[o,a,c,l]of qy){const h=Math.hypot(i-o,e-a);if(h<c){const f=1-Ot(c*.45,c,h),d=-8*(1-f)+(l+Js(i*.003+o*.13,e*.003)*l*.4)*f;d>s&&(s=d)}}const r=Math.hypot(i-Ut.x,e-Ut.z);if(r<1100){const o=1-Ot(500,1100,r),a=-8*(1-o)+30*o;a>s&&(s=a)}return s<=-8?-8:s-6}function $y(i,e){const t=Math.abs(i),n=Math.abs(e);return(1-Ot(_t.halfWid+40,_t.halfWid+220,t))*(1-Ot(_t.halfLen+60,_t.halfLen+400,n))}function jy(i,e){const t=Ot(on.x0-60,on.x0+20,i)*(1-Ot(on.x1-20,on.x1+60,i)),n=Ot(on.z0-60,on.z0+20,e)*(1-Ot(on.z1-20,on.z1+60,e));return t*n}function Be(i,e){let t=Yy(i,e);const n=Math.max($y(i,e),jy(i,e),Ky(i,e));t=t*(1-n)+_t.elev*n;const s=Math.abs(i-Ut.x),r=Math.abs(e-Ut.z),o=(1-Ot(Ut.halfWid+25,Ut.halfWid+150,s))*(1-Ot(Ut.halfLen+40,Ut.halfLen+250,r));t=t*(1-o)+Ut.elev*o;const a=Math.abs(i-Yt.x),c=Math.abs(e-Yt.z),l=(1-Ot(Yt.halfWid+25,Yt.halfWid+150,a))*(1-Ot(Yt.halfLen+40,Yt.halfLen+250,c));return t=t*(1-l)+Yt.elev*l,t}function Ko(i,e,t){return[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t]}function Zy(i,e,t){const n=[.76,.7,.5],s=[.3,.5,.24],r=[.42,.55,.28],o=[.16,.32,.16],a=[.45,.42,.38],c=[.9,.9,.93];let l;return i<1.6?l=n:i<45?l=Ko(s,r,t):i<150?l=Ko(o,s,Ot(90,150,i)*.5):i<260?l=a:l=c,l=Ko(l,a,Ot(.45,.8,e)),l=Ko(n,l,Ot(.8,2.2,i)),l}function Jy(i){i.fog=new sh(10336470,2500,22e3);const e=new Ua;e.scale.setScalar(9e4);const t=e.material.uniforms;t.turbidity.value=6,t.rayleigh.value=1.8,t.mieCoefficient.value=.004,t.mieDirectionalG.value=.85;const n=new N().setFromSphericalCoords(1,Math.PI*.46,Math.PI*.25);t.sunPosition.value.copy(n),i.add(e);const s=new Sf(16773853,2.6);s.position.copy(n).multiplyScalar(3e3),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.near=500,s.shadow.camera.far=6e3;const r=260;Object.assign(s.shadow.camera,{left:-r,right:r,top:r,bottom:-r}),s.shadow.bias=-4e-4,i.add(s),i.add(s.target);const o=new My(12375807,3825455,.75);i.add(o);const a=36e3,c=352,l=new Nt(a,a,c,c);l.rotateX(-Math.PI/2);const h=l.attributes.position,f=new Float32Array(h.count*3);for(let x=0;x<h.count;x++){const y=h.getX(x),D=h.getZ(x),L=Be(y,D);h.setY(x,L);const I=Math.abs(Be(y+8,D)-L)/8+Math.abs(Be(y,D+8)-L)/8,B=Js(y*.008+40,D*.008-17)*.5+.5,[U,G,O]=Zy(L,I,B),J=Js(y*.06,D*.06)*.035;f[x*3]=U+J,f[x*3+1]=G+J,f[x*3+2]=O+J}l.setAttribute("color",new jt(f,3)),l.computeVertexNormals();const d=new X(l,new Z({vertexColors:!0,roughness:1,metalness:0,map:nM()}));d.receiveShadow=!0,i.add(d);const p={uTime:{value:0}},m=new Nt(12e4,12e4,96,96),_=new Z({color:1328766,roughness:.18,metalness:.55});_.onBeforeCompile=x=>{x.uniforms.uTime=p.uTime,x.vertexShader=`uniform float uTime;
`+x.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vec2 wxz = (modelMatrix * vec4(position,1.0)).xz;
       transformed.y += sin(wxz.x*0.021 + uTime*0.9)*0.35 + sin(wxz.y*0.017 - uTime*0.7)*0.3 + sin((wxz.x+wxz.y)*0.05 + uTime*1.7)*0.12;`)};const u=new X(m,_);u.rotation.x=-Math.PI/2,u.position.y=0,u.name="ocean",i.add(u);const g=[];Qy(i,g);const S=eM(i),v=tM(i),M=oM(i),R=aM(i),w=[...M.nightMats,...g],b=[],T=[];[...M.nightGlows],i.traverse(x=>{x.userData.blink&&b.push(x),x.userData.tlCycle&&T.push(x.userData.tlCycle),x.userData.nightLamp});function F(x,y,D,L){p.uTime.value=y,L&&(u.position.x=L.x,u.position.z=L.z);const I=L?L.x:0,B=L?L.z:0,U=18e3;for(const O of v.children)O.position.x+=D.x*.6*x+x*1.2,O.position.z+=D.z*.6*x,O.position.x>I+U&&(O.position.x-=U*2),O.position.z>B+U&&(O.position.z-=U*2),O.position.x<I-U&&(O.position.x+=U*2),O.position.z<B-U&&(O.position.z+=U*2);const G=i.getObjectByName("windsock");if(G&&D){const O=Math.hypot(D.x,D.z);G.rotation.y=Math.atan2(D.x,D.z),G.rotation.x=-.15-Math.min(1,O/8)*1.25}for(const O of b){const j=(y*(O.userData.rate||1)+(O.userData.phase||0))%1<(O.userData.duty||.08);O.material.opacity=j?1:0,O.visible=j||O.userData.dim===!0,O.userData.dim&&(O.material.opacity=j?1:.12)}for(const O of T){const J=(y+O.off)%22;O.mats.g.emissiveIntensity=J<10?2:.08,O.mats.y.emissiveIntensity=J>=10&&J<12?2:.08,O.mats.r.emissiveIntensity=J>=12?2:.08}R.update(x,y,D)}return{sunLight:s,hemi:o,skyUni:t,clouds:v,trees:S,update:F,sightFound:R.found,balloons:R.balloons,nightGlows:M.nightGlows,nightMats:w,roadLoops:M.roadLoops}}function Qy(i,e){const t=_t.elev,n=new Qe,s=new Z({color:3487292,roughness:.95}),r=new Z({color:9080208,roughness:.95}),o=new X(new he(_t.halfWid*2,.3,_t.halfLen*2),s);o.position.y=t+.15,o.receiveShadow=!0,n.add(o);const a=new X(new he(on.x1-on.x0,.3,on.z1-on.z0),r);a.position.set((on.x0+on.x1)/2,t+.12,(on.z0+on.z1)/2),a.receiveShadow=!0,n.add(a);const c=new X(new he(70,.28,14),s);c.position.set(50,t+.12,170),c.receiveShadow=!0,n.add(c);const l=new mt({color:15263976});for(let x=-510;x<_t.halfLen-60;x+=60){const y=new X(new Nt(1.1,24),l);y.rotation.x=-Math.PI/2,y.position.set(0,t+.32,x),n.add(y)}for(const x of[-1,1]){const y=x*(_t.halfLen-18);for(let I=-3;I<=3;I++){if(I===0)continue;const B=new X(new Nt(2.2,26),l);B.rotation.x=-Math.PI/2,B.position.set(I*3.4,t+.32,y),n.add(B)}for(const I of[152,305])for(const B of[-7,7]){const U=new X(new Nt(3,14),l);U.rotation.x=-Math.PI/2,U.position.set(B,t+.32,x*(_t.halfLen-I)),n.add(U)}const D=rM(x<0?"36":"18",220),L=new X(new Nt(13,20),new mt({map:D,transparent:!0}));L.rotation.x=-Math.PI/2,L.rotation.z=x<0?Math.PI:0,L.position.set(0,t+.33,x*(_t.halfLen-55)),n.add(L)}const h=new Dn(.55,8,8),f=new mt({color:12571903});for(let x=-600;x<=_t.halfLen;x+=80)for(const y of[-15-2.5,_t.halfWid+2.5]){const D=new X(h,f);D.position.set(y,t+1,x),n.add(D)}for(let x=0;x<4;x++){const y=new X(new he(1.2,1,1.2),new mt({color:x<2?16724787:16777215}));y.position.set(-23-x*3,t+1,-450),n.add(y)}const d=ir();for(const x of[-19,_t.halfWid+4]){const y=new kt(new Ft({map:d,color:16777215,transparent:!0,depthWrite:!1}));y.position.set(x,t+2,-606),y.scale.set(6,6,1),y.userData={blink:!0,rate:1.2,duty:.06,phase:x>0?.5:0},n.add(y)}const p=new Z({color:10134184,roughness:.5,metalness:.6}),m=new Z({color:1316378,roughness:1});for(const[x,y]of[[120,110],[120,220]]){const D=new X(new Ge(13,13,34,20,1,!1,0,Math.PI),p);D.rotation.z=Math.PI/2,D.rotation.y=Math.PI/2,D.position.set(x,t+.2,y),D.castShadow=D.receiveShadow=!0,n.add(D);const L=new X(new Nt(24,11),m);L.position.set(x-17.1,t+5.5,y),L.rotation.y=-Math.PI/2,n.add(L)}const _=new X(new Ge(.18,.18,11),new Z({color:13421772,roughness:.5,metalness:.5}));_.position.set(28,t+5.5,_t.halfLen-60),_.castShadow=!0,n.add(_);const u=new Qe;u.position.set(28,t+10.6,_t.halfLen-60);const g=sM(),S=new X(new pn(1.1,5.5,12,1,!0),new Z({map:g,side:tn,roughness:.8}));S.rotation.x=-Math.PI/2,S.position.z=2.9,u.add(S),u.name="windsock",n.add(u);const v=new X(new Ge(.5,.8,16),new Z({color:7829367,roughness:.7}));v.position.set(-45,t+8,300),v.castShadow=!0,n.add(v);const M=new kt(new Ft({map:d,color:6750088,transparent:!0,depthWrite:!1}));M.position.set(-45,t+16.6,300),M.scale.set(7,7,1),M.userData={blink:!0,rate:.8,duty:.12},n.add(M);const R=[12724778,2777026,14721056];[[70,110,.4],[95,200,-.3],[70,240,.2]].forEach(([x,y,D],L)=>{const I=td(R[L]);I.position.set(x,t+.3,y),I.rotation.y=D,n.add(I)});const w=(x,y,D,L)=>{const I=new X(new he(x,.24,y),r);I.position.set(D,t+.1,L),I.receiveShadow=!0,n.add(I)},b=new X(new he(12,.28,_t.halfLen*2),s);b.position.set(65,t+.12,0),b.receiveShadow=!0,n.add(b);const T=new mt({color:14198816}),F=new X(new he(.4,.06,_t.halfLen*2-40),T);F.position.set(65,t+.3,0),n.add(F);for(const x of[-400,0,400]){const y=new X(new he(80,.28,10),s);y.position.set(55,t+.12,x),y.receiveShadow=!0,n.add(y);const D=new X(new he(80,.06,.4),T);D.position.set(55,t+.3,x),n.add(D);for(const L of[26,28.5]){const I=new X(new he(.6,.06,9),T);I.position.set(L,t+.3,x),n.add(I)}}{const x=[];for(let L=-600;L<=_t.halfLen;L+=60)x.push([58,L],[72,L]);for(const L of[-400,0,400])for(let I=20;I<=95;I+=38)x.push([I,L-6],[I,L+6]);const y=new gr(new Dn(.35,8,6),new mt({color:3828479}),x.length),D=new qe;x.forEach(([L,I],B)=>{D.makeTranslation(L,t+.6,I),y.setMatrixAt(B,D)}),n.add(y)}for(const x of[-1,1]){const y=x*_t.halfLen;for(let D=-3;D<=3;D++){const L=D*3.6,I=new X(new he(.9,.5,.5),new mt({color:2293572}));I.position.set(L,t+.5,y+x*2.5),n.add(I);const B=new X(new he(.9,.5,.5),new mt({color:16720418}));B.position.set(L,t+.5,y-x*2.5),n.add(B)}}for(let x=0;x<5;x++){const y=-700-x*100,D=Be(0,y),L=t+5,I=new X(new Ge(.25,.35,Math.max(1,L-D)),new Z({color:6710886,roughness:.7}));I.position.set(0,(D+L)/2,y),n.add(I);const B=new X(new he(4,.5,.5),new mt({color:16777215}));B.position.set(0,L,y),n.add(B);const U=new kt(new Ft({map:d,color:16777215,transparent:!0,depthWrite:!1}));U.position.set(0,L+1,y),U.scale.set(7,7,1),U.userData={blink:!0,rate:1,duty:.07,phase:(4-x)*.18},n.add(U)}w(48,26,150,-60);{const x=new Z({color:14210248,roughness:.85}),y=new X(new he(38,9,16),x);y.position.set(150,t+4.5,-60),y.castShadow=y.receiveShadow=!0,n.add(y);const D=new Z({color:1582127,roughness:.15,metalness:.5,emissive:16763514,emissiveIntensity:0});e.push(D);const L=new X(new he(36,3.4,.4),D);L.position.set(150,t+5.2,-60-8.1),n.add(L);const I=L.clone();I.position.set(150,t+5.2,-60+8.1),n.add(I);const B=new X(new he(40,.7,18),new Z({color:3820122,roughness:.8}));B.position.set(150,t+9.3,-60),B.castShadow=!0,n.add(B);for(const J of[138,162]){const j=new X(new Ge(.3,.3,4.4),new Z({color:13421772,metalness:.5,roughness:.4}));j.position.set(J,t+2.2,-71),n.add(j)}const U=new X(new he(30,.4,7),new Z({color:2776970,roughness:.6}));U.position.set(150,t+4.5,-60-11.5),U.castShadow=!0,n.add(U);const G=new X(new Nt(30,4),new mt({map:Af("HARBORVIEW • KHVR"),transparent:!1}));G.position.set(150-19.2,t+6.5,-60),G.rotation.y=-Math.PI/2,n.add(G);const O=new kt(new Ft({map:d,color:12573183,transparent:!0,depthWrite:!1}));O.position.set(150,t+10,-60),O.scale.set(26,14,1),O.userData={nightLamp:!0},n.add(O)}w(18,18,Xt.x,Xt.z);{const x=new X(new he(7,26,7),new Z({color:12106946,roughness:.85}));x.position.set(Xt.x,t+13,Xt.z),x.castShadow=!0,n.add(x);const y=new Z({color:1055784,roughness:.1,metalness:.6,emissive:16767392,emissiveIntensity:0});e.push(y);const D=new X(new he(10.5,3.6,10.5),y);D.position.set(Xt.x,t+27.5,Xt.z),D.castShadow=!0,n.add(D);const L=new X(new he(10.7,.5,10.7),new Z({color:2237996,roughness:.6}));L.position.set(Xt.x,t+29.4,Xt.z),n.add(L);const I=new X(new he(11.5,.7,11.5),new Z({color:9054762,roughness:.7}));I.position.set(Xt.x,t+30,Xt.z),I.castShadow=!0,n.add(I);const B=new X(new Ge(.12,.2,9),new Z({color:4473924,roughness:.6}));B.position.set(Xt.x,t+34.5,Xt.z),n.add(B);const U=new kt(new Ft({map:d,color:16724787,transparent:!0,depthWrite:!1}));U.position.set(Xt.x,t+39.2,Xt.z),U.scale.set(5,5,1),U.userData={blink:!0,rate:.7,duty:.15},n.add(U);const G=new kt(new Ft({map:d,color:16767392,transparent:!0,depthWrite:!1}));G.position.set(Xt.x,t+27.5,Xt.z),G.scale.set(14,8,1),G.userData={nightLamp:!0},n.add(G)}for(const[x,y]of[[170,-200],[170,-280]]){const D=new X(new Ge(11,11,30,18,1,!1,0,Math.PI),p);D.rotation.z=Math.PI/2,D.rotation.y=Math.PI/2,D.position.set(x,t+.2,y),D.castShadow=D.receiveShadow=!0,n.add(D);const L=new X(new Nt(20,9),m);L.position.set(x-15.1,t+4.5,y),L.rotation.y=-Math.PI/2,n.add(L)}{const x=new Z({color:14198816,roughness:.8}),y=[2787914,15263976,9054762];[[-60,140],[-60,210],[-60,280]].forEach(([D,L],I)=>{const B=Be(D,L),U=new X(new he(14,.3,10),x);U.position.set(D,B+.15,L),U.receiveShadow=!0,n.add(U);const G=td(y[I]);G.position.set(D,B+.3,L),G.rotation.y=.15*(I-1),n.add(G)})}w(26,16,190,300);{const x=new Z({color:15263976,roughness:.4,metalness:.3});for(const L of[-4,4]){const I=new X(new Ge(3,3,10,16),x);I.rotation.z=Math.PI/2,I.position.set(190,t+3.4,300+L),I.castShadow=!0,n.add(I)}new Z({color:12763842,roughness:.5});const y=new X(new he(2.4,2.2,2.6),new Z({color:12724778,roughness:.5}));y.position.set(182,t+1.4,306),y.castShadow=!0;const D=new X(new Ge(1.3,1.3,5.5,12),x);D.rotation.x=Math.PI/2,D.position.set(182,t+1.6,301),D.castShadow=!0,n.add(y,D)}w(22,16,100,-260);{const x=new X(new he(16,6,10),new Z({color:11022898,roughness:.8}));x.position.set(100,t+3,-260),x.castShadow=x.receiveShadow=!0,n.add(x);const y=new X(new Nt(11,4.4),new Z({color:14540253,roughness:.5,metalness:.4}));y.position.set(100-8.1,t+2.4,-260),y.rotation.y=-Math.PI/2,n.add(y);const D=new Z({color:14169397,roughness:.45}),L=new X(new he(3,2.4,8),D);L.position.set(88,t+1.5,-252),L.castShadow=!0;const I=new X(new he(1.6,.35,.6),new mt({color:16720418}));I.position.set(88,t+2.9,-252),I.userData={blink:!0,rate:2.2,duty:.5},n.add(L,I)}i.add(n)}function td(i){const e=new Qe,t=new Z({color:i,roughness:.4,metalness:.2}),n=new Z({color:15922422,roughness:.4,metalness:.1}),s=new X(new Ge(.8,.5,7,10),n);s.rotation.x=Math.PI/2,s.position.y=1.2,e.add(s);const r=new X(new he(10.5,.16,1.5),t);r.position.set(0,2.1,-.4),e.add(r);const o=new X(new he(3.2,.12,1),n);o.position.set(0,1.5,3.3),e.add(o);const a=new X(new he(.12,1.6,1.2),t);return a.position.set(0,2.2,3.3),e.add(a),e.traverse(c=>{c.isMesh&&(c.castShadow=!0)}),e}function eM(i){const e=di(1337),t=[];let n=0;for(;t.length<8e3&&n++<2e5;){const _=(e()*2-1)*16e3,u=(e()*2-1)*16e3,g=Be(_,u);g<3||g>160||Math.abs(_)<260&&Math.abs(u)<1050||_>0&&_<220&&u>0&&u<340||_>20&&_<280&&u>-500&&u<500||Math.abs(_-Ut.x)<200&&Math.abs(u-Ut.z)<500||Math.abs(_-Yt.x)<200&&Math.abs(u-Yt.z)<500||Math.hypot(_+330,u-860)<320||Math.hypot(_-8500,u-7500)<420||Math.abs(Be(_+10,u)-g)+Math.abs(Be(_,u+10)-g)>14||t.push({x:_,h:g,z:u,s:.7+e()*.9,r:e()*Math.PI*2})}const s=new Ge(.35,.5,4,6),r=new pn(2.6,9,7),o=new Z({color:5914664,roughness:1}),a=new Z({color:1983520,roughness:1}),c=new gr(s,o,t.length),l=new gr(r,a,t.length),h=new qe,f=new _n,d=new bn,p=new N,m=new N;return t.forEach((_,u)=>{d.set(0,_.r,0),f.setFromEuler(d),p.set(_.x,_.h+2*_.s,_.z),m.set(_.s,_.s,_.s),h.compose(p,f,m),c.setMatrixAt(u,h),p.set(_.x,_.h+(4+4.5)*_.s,_.z),h.compose(p,f,m),l.setMatrixAt(u,h)}),c.castShadow=l.castShadow=!0,l.receiveShadow=!0,i.add(c,l),{count:t.length}}function tM(i){const e=iM(),t=di(77),n=new Qe;for(let s=0;s<40;s++){const r=new Qe,o=4+Math.floor(t()*3);for(let l=0;l<o;l++){const h=.82+t()*.18,f=new kt(new Ft({map:e,transparent:!0,opacity:.8,depthWrite:!1,color:new ze(h,h,h*1.02)}));f.position.set((t()-.5)*420,(t()-.5)*60,(t()-.5)*180);const d=220+t()*260;f.scale.set(d,d*.5,1),r.add(f)}const a=t()*Math.PI*2,c=1500+t()*15e3;r.position.set(Math.cos(a)*c,520+t()*650,Math.sin(a)*c),n.add(r)}return i.add(n),n}function nM(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d"),t=e.createImageData(256,256),n=di(9);for(let r=0;r<t.data.length;r+=4){const o=228+Math.floor(n()*28);t.data[r]=t.data[r+1]=t.data[r+2]=o,t.data[r+3]=255}e.putImageData(t,0,0);const s=new hn(i);return s.wrapS=s.wrapT=is,s.repeat.set(300,300),s}function iM(){const i=document.createElement("canvas");i.width=i.height=128;const e=i.getContext("2d"),t=di(5);for(let n=0;n<46;n++){const s=24+t()*80,r=46+t()*36,o=10+t()*22,a=e.createRadialGradient(s,r,0,s,r,o);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=a,e.beginPath(),e.arc(s,r,o,0,7),e.fill()}return new hn(i)}function ir(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,0.6)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new hn(i)}function sM(){const i=document.createElement("canvas");i.width=128,i.height=16;const e=i.getContext("2d");for(let n=0;n<6;n++)e.fillStyle=n%2?"#e8641e":"#f2f2f2",e.fillRect(n*22,0,22,16);const t=new hn(i);return t.wrapS=is,t}function rM(i,e){const t=document.createElement("canvas");t.width=128,t.height=192;const n=t.getContext("2d");n.clearRect(0,0,128,192),n.fillStyle="#f2f2f2",n.font=`bold ${e}px monospace`,n.textAlign="center",n.textBaseline="middle",n.fillText(i[0],64,52),n.fillText(i[1],64,140);const s=new hn(t);return s.anisotropy=4,s}function Af(i){const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");t.fillStyle="#14202e",t.fillRect(0,0,512,128),t.strokeStyle="#ffb020",t.lineWidth=8,t.strokeRect(6,6,500,116),t.fillStyle="#ffd97a",t.textAlign="center",t.textBaseline="middle";let n=64;for(t.font=`bold ${n}px Arial`;t.measureText(i).width>470&&n>20;)n-=4,t.font=`bold ${n}px Arial`;t.fillText(i,256,66);const s=new hn(e);return s.anisotropy=4,s}function Ac(i,e,t,n,s,r,o){const a=e.length,c=[],l=[];for(let d=0;d<a;d++){const[p,m]=e[d],[_,u]=e[(d+1)%a],[g,S]=e[(d-1+a)%a];let v=_-g,M=u-S;const R=Math.hypot(v,M)||1;v/=R,M/=R;const w=-M,b=v,T=p+w*n,F=m+b*n,x=T+w*s/2,y=F+b*s/2,D=T-w*s/2,L=F-b*s/2;if(c.push(x,Be(x,y)+r,y,D,Be(D,L)+r,L),t||d<a-1){const I=d*2,B=d*2+1,U=(d+1)%a*2,G=(d+1)%a*2+1;l.push(I,B,U,B,G,U)}}const h=new Bt;h.setAttribute("position",new xt(c,3)),h.setIndex(l),h.computeVertexNormals();const f=new X(h,o);f.receiveShadow=!0,i.add(f)}function Yo(i,e,t,n=!0){const s=[],r=e.length,o=n?r:r-1;for(let v=0;v<o;v++){const[M,R]=e[v],[w,b]=e[(v+1)%r],T=Math.hypot(w-M,b-R),F=Math.max(2,Math.round(T/12));for(let x=0;x<F;x++){const y=x/F;s.push([M+(w-M)*y,R+(b-R)*y])}}const a=new Z({color:3356220,roughness:1}),c=new Z({color:10133670,roughness:.95});Ac(i,s,n,0,t,.18,a),Ac(i,s,n,t/2+.6,1.1,.32,c),Ac(i,s,n,-t/2-.6,1.1,.32,c);const l=new he(.35,.06,3),h=new mt({color:14211280}),f=[];for(let v=0;v<s.length;v+=2)f.push(s[v]);const d=new gr(l,h,f.length),p=new qe,m=new _n,_=new bn,u=new N,g=new N(1,1,1);f.forEach(([v,M],R)=>{const[w,b]=f[(R+1)%f.length];_.set(0,Math.atan2(w-v,b-M),0),m.setFromEuler(_),u.set(v,Be(v,M)+.24,M),p.compose(u,m,g),d.setMatrixAt(R,p)}),i.add(d);const S=[];for(let v=0;v<s.length;v+=2)S.push({x:s[v][0],z:s[v][1]});return S}function oM(i){const e=new Qe,t=di(4242),n=[],s=[],r=[],o=[15260864,14213864,15255736,13162680,14733544,15788240],a=[9059114,3824250,5921370,7031338],c=o.map(v=>new Z({color:v,roughness:.9})),l=a.map(v=>new Z({color:v,roughness:.9})),h=new Z({color:1053980,roughness:.15,metalness:.6,emissive:16763514,emissiveIntensity:0});s.push(h);const f=new Z({color:4862496,roughness:.9}),d=(v,M,R=1)=>{const w=Be(v,M);if(w<3)return!1;const b=(7+t()*5)*R,T=(6+t()*4)*R,F=3.5+t()*2,x=new X(new he(b,F,T),c[Math.floor(t()*6)]);x.position.set(v,w+F/2-.4,M),x.rotation.y=t()*Math.PI,x.castShadow=x.receiveShadow=!0,e.add(x);for(const I of[-1,1])for(const B of[-.22,.22]){const U=new X(new Nt(1.1,1.1),h);U.position.set(B*b,.3,I*(T/2+.03)),I<0&&(U.rotation.y=Math.PI),x.add(U)}const y=new X(new he(1.1,2.2,.1),f);y.position.set(0,-F/2+1.1,T/2+.03),x.add(y);const D=new X(new he(.7,2.2,.7),new Z({color:9076856,roughness:.9}));D.position.set(b/4,F/2+.8,0),D.castShadow=!0,x.add(D);const L=new X(new pn(Math.max(b,T)*.75,2.6,4),l[Math.floor(t()*4)]);return L.position.set(v,w+F+.9,M),L.rotation.y=Math.PI/4,L.castShadow=!0,e.add(L),!0},p=(v,M,R,w,b)=>{let T=0,F=0;for(;T<b&&F++<400;){const x=v+t()*(M-v),y=R+t()*(w-R),D=Be(x,y);D<4||Math.abs(Be(x+12,y)-D)+Math.abs(Be(x,y+12)-D)>18||d(x,y)&&T++}};p(-140,60,760,1020,9),p(8380,8620,7380,7620,14);const m=(v,M,R,w)=>{const b=Be(v,M),T=new X(new he(13,5.5,10),new Z({color:w,roughness:.8}));T.position.set(v,b+2.75-.3,M),T.castShadow=T.receiveShadow=!0,e.add(T);const F=new X(new he(14,.6,11),new Z({color:1846336,roughness:.8}));F.position.set(v,b+5.6,M),F.castShadow=!0,e.add(F);const x=new X(new Nt(10,2.5),new mt({map:Af(R),transparent:!1}));x.position.set(v,b+4.2,M-5.15),x.rotation.y=Math.PI,e.add(x);const y=new kt(new Ft({map:ir(),color:16767354,transparent:!0,depthWrite:!1}));y.position.set(v,b+5.4,M-5.6),y.scale.set(6,6,1),y.userData.night=!0,e.add(y),n.push(y)};m(qo.x,qo.z,"PILOT SHOP",3033704),m(122,-30,"AIRPORT SUPPLY",7031434),m(8420,7410,"BEACH GEAR",2787962),m(-6940,1560,"CITY PILOT SUPPLY",9054778),m(-1150,-5240,"GENERAL STORE",8020552),m(2590,2050,"BAIT & TACKLE",4877194);{const v=qo.x,M=qo.z,R=Be(v,M),w=new X(new he(1,2,.7),new Z({color:12724778,roughness:.5}));w.position.set(v+8,R+1,M-2),w.castShadow=!0,e.add(w)}{const v=[14764875,4947425,14787659,4968842,14777032];[[7260,6410],[7220,6380],[7180,6350],[7300,6430],[7130,6310]].forEach(([I,B],U)=>{const G=Be(I,B);if(G<.4||G>9)return;const O=new X(new Ge(.08,.08,3),new Z({color:15658734}));O.position.set(I,G+1.5,B),e.add(O);const J=new X(new pn(2.2,1.2,8),new Z({color:v[U%v.length],roughness:.8}));J.position.set(I,G+3.2,B),J.castShadow=!0,e.add(J)});const R=7225,w=6378,b=-.75,T=-.66,F=100,x=new Z({color:9071432,roughness:.9}),y=new X(new he(7,.5,F),x),D=R+b*F,L=w+T*F;y.position.set((R+D)/2,5.6,(w+L)/2),y.rotation.y=Math.atan2(b,T),y.castShadow=y.receiveShadow=!0,e.add(y);for(let I=0;I<=F;I+=12){const B=R+b*I,U=w+T*I,G=Math.max(Be(B,U),-8),O=new X(new Ge(.25,.25,5.6-G),new Z({color:5916210}));O.position.set(B,(5.6+G)/2,U),e.add(O)}}const _=ir(),u=v=>{for(let M=0;M<v.length;M+=6){const R=v[M],w=Be(R.x,R.z);if(w<2)continue;const b=new X(new Ge(.12,.16,7),new Z({color:3817285,roughness:.7}));b.position.set(R.x+4.5,w+3.5,R.z),b.castShadow=!0,e.add(b);const T=new kt(new Ft({map:_,color:16767392,transparent:!0,depthWrite:!1}));T.position.set(R.x+4.5,w+7.2,R.z),T.scale.set(7,7,1),T.userData.night=!0,e.add(T),n.push(T)}},g=[[-480,740],[-180,740],[-180,980],[-480,980]],S=[[8350,7350],[8650,7350],[8650,7650],[8350,7650]];for(const v of[g,S]){const M=Yo(e,v,6);r.push(M),u(M)}{const{x:v,z:M,halfLen:R,halfWid:w,elev:b}=Yt,T=new X(new he(w*2,.25,R*2),new Z({color:4483888,roughness:1}));T.position.set(v,b+.1,M),T.receiveShadow=!0,e.add(T);const F=new Z({color:15790320,roughness:.9});for(let y=-R;y<=R;y+=56)for(const D of[-w-2,w+2]){const L=new X(new Ge(.7,.7,.5,10),F);L.position.set(v+D,b+.4,M+y),e.add(L)}const x=new X(new he(5,3,4),new Z({color:8020552,roughness:.9}));x.position.set(v+20,b+1.5,M+30),x.castShadow=!0,e.add(x)}p(-1350,-1050,-5450,-5150,8);{const R=Be(-1200,-5300),w=new X(new he(7,4.5,10),new Z({color:15920608,roughness:.9}));w.position.set(-1200,R+2.2-.3,-5300),w.castShadow=w.receiveShadow=!0,e.add(w);const b=new X(new he(2.4,7,2.4),new Z({color:15920608,roughness:.9}));b.position.set(-1200,R+5.5,-5300-5.5),b.castShadow=!0,e.add(b)}p(2500,2740,1960,2200,8);{const v=di(31337);for(let M=0;M<3;M++){const R=2560+v()*120,w=2020+v()*120,b=Be(R,w);if(b<1)continue;const T=new Qe,F=new X(new he(1.4,.6,3.4),new Z({color:[2777026,12763842,14721056][M],roughness:.8}));F.castShadow=!0,T.add(F),T.position.set(R,b+.35,w),T.rotation.y=v()*Math.PI,M===1&&(T.rotation.z=Math.PI),e.add(T)}}{const b=document.createElement("canvas");b.width=64,b.height=128;const T=document.createElement("canvas");T.width=64,T.height=128;const F=b.getContext("2d"),x=T.getContext("2d"),y=di(777);F.fillStyle="#c9d1d8",F.fillRect(0,0,64,128),x.fillStyle="#000000",x.fillRect(0,0,64,128);for(let Y=0;Y<16;Y++)for(let ee=0;ee<6;ee++){const ne=4+ee*10,se=4+Y*7.6;F.fillStyle="#232c38",F.fillRect(ne,se,7,4.6),y()<.35&&(x.fillStyle="#ffd97a",x.fillRect(ne,se,7,4.6))}const D=new Z({map:new hn(b),emissiveMap:new hn(T),emissive:16777215,emissiveIntensity:0,roughness:.75});s.push(D);const L=new gr(new he(1,1,1),D,25),I=new qe,B=new _n,U=new bn,G=new N,O=new N,J=new ze;let j=0;for(let Y=-2;Y<=2&&j<25;Y++)for(let ee=-2;ee<=2&&j<25;ee++){if(Math.abs(Y)<1&&Math.abs(ee)<1)continue;const ne=-7e3+Y*62+(y()-.5)*10,se=1500+ee*62+(y()-.5)*10,pe=Be(ne,se);if(pe<4)continue;const ge=Math.hypot(Y,ee),P=Math.max(22,72-ge*14+y()*14),E=20+y()*8,V=20+y()*8;U.set(0,y()<.5?0:Math.PI/2,0),B.setFromEuler(U),G.set(ne,pe+P/2-2,se),O.set(E,P,V),I.compose(G,B,O),L.setMatrixAt(j,I),J.setHSL(.58,.08+y()*.1,.82+y()*.12),L.setColorAt(j,J),j++}L.count=j,L.castShadow=L.receiveShadow=!0,e.add(L);const ce=Be(-7e3,1500),Te=new X(new Ms(46,24),new Z({color:3037736,roughness:1}));Te.rotation.x=-Math.PI/2,Te.position.set(-7e3,ce+.4,1500),Te.receiveShadow=!0,e.add(Te);const Le=new X(new Ms(12,20),new Z({color:2779802,roughness:.2,metalness:.4}));Le.rotation.x=-Math.PI/2,Le.position.set(-6988,ce+.55,1508),e.add(Le);const K=new X(new Ge(4,6,92,12),new Z({color:9081760,roughness:.5,metalness:.4}));K.position.set(-7040,ce+46,1470),K.castShadow=!0,e.add(K);const ae=new kt(new Ft({map:ir(),color:16729156,transparent:!0,depthWrite:!1}));ae.position.set(-7040,ce+93,1470),ae.scale.set(9,9,1),ae.userData={blink:!0,rate:.7,duty:.15},e.add(ae),p(-7450,-6550,1700,1950,8),p(-7450,-6550,1050,1300,8);const _e=[];for(const Y of[-7150,-7e3,-6850])_e.push(Yo(e,[[Y,1050],[Y,1950]],7,!1));for(const Y of[1350,1500,1650])_e.push(Yo(e,[[-7450,Y],[-6550,Y]],7,!1));_e.forEach(u);const fe=[[-7380,1120],[-6620,1120],[-6620,1880],[-7380,1880]];r.push(Yo(e,fe,7));const De=[];for(let Y=0;Y<2;Y++){const ee={r:new Z({color:3342336,emissive:16720418,emissiveIntensity:.1}),y:new Z({color:3351040,emissive:16759586,emissiveIntensity:.1}),g:new Z({color:13056,emissive:2293572,emissiveIntensity:.1})};De.push(ee)}[[-7e3,1350],[-6850,1500]].forEach(([Y,ee],ne)=>{const se=Be(Y,ee),pe=new X(new Ge(.15,.2,6.5),new Z({color:2764083,roughness:.7}));pe.position.set(Y+5,se+3.2,ee+5),pe.castShadow=!0,e.add(pe);const ge=new X(new he(1,2.6,1),new Z({color:1118740,roughness:.6}));ge.position.set(Y+5,se+7,ee+5),e.add(ge);const P=De[ne%2],E=[[P.r,.85],[P.y,0],[P.g,-.85]];for(const[te,re]of E){const Q=new X(new Dn(.32,10,8),te);Q.position.set(Y+5,se+7+re,ee+4.45),e.add(Q)}const V=new Qe;V.userData.tlCycle={mats:P,off:ne*7},V.position.set(Y,se,ee),e.add(V)});const Ne=[3828418,15263976,2764083,12728890];[[-6930,1420,.3],[-7070,1580,-.2],[-300,800,.9],[8450,7420,1.8]].forEach(([Y,ee,ne],se)=>{const pe=new Qe,ge=new Z({color:Ne[se%4],roughness:.4,metalness:.3}),P=new X(new he(2,.9,4.2),ge);P.position.y=.85,P.castShadow=!0;const E=new X(new he(1.7,.65,2.1),new Z({color:1053980,roughness:.1,metalness:.8}));E.position.set(0,1.5,-.2),pe.add(P,E);const V=new Ge(.42,.42,.35,10),te=new Z({color:1315860,roughness:.9});for(const[Q,Re]of[[-.95,1.4],[.95,1.4],[-.95,-1.4],[.95,-1.4]]){const me=new X(V,te);me.rotation.z=Math.PI/2,me.position.set(Q,.42,Re),pe.add(me)}const re=Be(Y,ee);pe.position.set(Y,re<1?1:re+.15,ee),pe.rotation.y=ne,e.add(pe)});const Pe=new Qe,He=new X(new he(16,7,55),new Z({color:8003616,roughness:.6}));He.position.y=1,He.castShadow=!0;const ie=new X(new he(12,9,8),new Z({color:15263976,roughness:.6}));ie.position.set(0,8,-20),ie.castShadow=!0,Pe.add(He,ie);const C=[12728890,3828418,3843669,14721056];for(let Y=0;Y<8;Y++){const ee=new X(new he(3.4,3,5),new Z({color:C[Y%4],roughness:.7}));ee.position.set(Y%2?-4:4,6,2+Math.floor(Y/2)*6),Pe.add(ee)}Pe.position.set(-4880,.5,1040),Pe.rotation.y=.4,e.add(Pe)}return i.add(e),{nightGlows:n,nightMats:s,roadLoops:r}}const ss=[{name:"Coral Strip",blurb:"a 600 m grass strip on the south-east island — landable!",x:Ut.x,z:Ut.z,r:420},{name:"Harborview",blurb:"hillside town in the west valley",x:-330,z:860,r:380},{name:"Lighthouse Point",blurb:"the rotating beacon on the north cape",x:150,z:-1450,r:320},{name:"Sailboat Marina",blurb:"floating docks off the south-west coast",x:-2132,z:2251,r:380},{name:"Wind Farm",blurb:"three turbines on the east ridge",x:1400,z:-500,r:320},{name:"Summit Lookout",blurb:"fire tower on the 300 m peak",x:1800,z:-600,r:280},{name:"Seabreeze",blurb:"resort town on the north-east island",x:8500,z:7500,r:480},{name:"North Strip",blurb:"a lonely grass strip on the north island",x:Yt.x,z:Yt.z,r:420},{name:"Aurora City",blurb:"the big city on the west island",x:-7e3,z:1500,r:700},{name:"Northville",blurb:"hamlet by the North Strip",x:-1200,z:-5300,r:300},{name:"Coral Bay",blurb:"fishing village on the coral shore",x:2620,z:2080,r:300},{name:"Shipwreck Cove",blurb:"a wreck rotting in the shallows SE of Coral",x:3150,z:2550,r:320},{name:"Observatory",blurb:"star dome on the east peak",x:7400,z:-2400,r:320},{name:"Ember Isle",blurb:"a smoking volcano far to the south",x:3e3,z:13e3,r:600}];function aM(i){const e=di(2024),t=new Qe,n=(m,_,u,g,S,v=0)=>{const M=new X(m,_);return M.position.set(u,g,S),M.rotation.y=v,M.castShadow=M.receiveShadow=!0,t.add(M),M};{const{x:m,z:_,halfLen:u,halfWid:g,elev:S}=Ut,v=n(new he(g*2,.25,u*2),new Z({color:4025135,roughness:1}),m,S+.1,_);v.castShadow=!1;const M=new Z({color:15790320,roughness:.9});for(let b=-u;b<=u;b+=60)for(const T of[-g-2,g+2]){const F=new X(new Ge(.7,.7,.5,10),M);F.position.set(m+T,S+.4,_+b),t.add(F)}n(new he(6,3.4,5),new Z({color:9071432,roughness:.9}),m+22,S+1.7,_+40);const R=n(new pn(4.8,2,4),new Z({color:5913384,roughness:.9}),m+22,S+4.3,_+40,Math.PI/4);R.castShadow=!0;const w=n(new Ge(.15,.15,9),new Z({color:13421772}),m-18,S+4.5,_-u+30);w.castShadow=!0}{const m=[15260864,14213864,15255736,13162680,14733544,15788240],_=[9059114,3824250,5921370,7031338];let u=0,g=0;for(;u<16&&g++<600;){const F=-480+e()*320,x=720+e()*280,y=Be(F,x);if(y<4||Math.abs(Be(F+12,x)-y)+Math.abs(Be(F,x+12)-y)>16)continue;const L=7+e()*5,I=6+e()*4,B=3.5+e()*2;n(new he(L,B,I),new Z({color:m[u%m.length],roughness:.9}),F,y+B/2-.4,x,e()*Math.PI);const U=new X(new pn(Math.max(L,I)*.75,2.6,4),new Z({color:_[u%_.length],roughness:.9}));U.position.set(F,y+B+.9,x),U.rotation.y=Math.PI/4+e()*.2,U.castShadow=!0,t.add(U),u++}const S=-330,v=860,M=Be(S,v);n(new he(10,6,14),new Z({color:15920608,roughness:.9}),S,M+3-.4,v),n(new he(3.4,12,3.4),new Z({color:15920608,roughness:.9}),S,M+6-.4,v-8);const R=new X(new pn(2.6,6,4),new Z({color:3820122,roughness:.8}));R.position.set(S,M+15-.4,v-8),R.rotation.y=Math.PI/4,R.castShadow=!0,t.add(R);const w=-240,b=790,T=Be(w,b);for(const[F,x]of[[-2,-2],[2,-2],[-2,2],[2,2]])n(new Ge(.25,.25,14),new Z({color:7829367}),w+F,T+7,b+x);n(new Dn(4,14,10),new Z({color:10139852,roughness:.6,metalness:.3}),w,T+16,b)}{const u=Be(150,-1450),g=document.createElement("canvas");g.width=16,g.height=128;const S=g.getContext("2d");for(let T=0;T<8;T++)S.fillStyle=T%2?"#c22":"#eee",S.fillRect(0,T*16,16,16);const v=new hn(g),M=n(new Ge(3.2,4.2,26,14),new Z({map:v,roughness:.7}),150,u+13,-1450);M.castShadow=!0,n(new Ge(3.6,3.6,2.4,14),new Z({color:2238e3,roughness:.5,metalness:.4}),150,u+27,-1450);const R=new kt(new Ft({map:ir(),color:16773808,transparent:!0,depthWrite:!1}));R.position.set(150,u+27.5,-1450),R.scale.set(10,10,1),R.userData={blink:!0,rate:.5,duty:.5,dim:!0},t.add(R);const w=new mt({color:16773808,transparent:!0,opacity:.13,blending:Zr,depthWrite:!1,side:tn}),b=new Qe;for(const T of[0,Math.PI]){const F=new Qe;F.rotation.y=T;const x=new X(new pn(7,220,12,1,!0),w);x.rotation.z=Math.PI/2,x.position.x=110,F.add(x),b.add(F)}b.position.set(150,u+27.5,-1450),b.name="lightbeams",t.add(b)}const s=new Qe;s.name="boats";{const u=new Z({color:9071432,roughness:.9});for(const S of[-30,30]){const v=new X(new he(60,.6,4),u);v.position.set(-2132,.5,2251+S),v.castShadow=v.receiveShadow=!0,t.add(v)}const g=[16777215,16765562,8046847,16751226,14221272];for(let S=0;S<6;S++){const v=new Qe,M=new X(new he(2.2,1.2,7),new Z({color:[12724778,2777026,15658734][S%3],roughness:.5}));M.position.y=.4,M.castShadow=!0;const R=new X(new Ge(.09,.09,9),new Z({color:7031338,roughness:.8}));R.position.y=5,R.castShadow=!0;const w=new Ia;w.moveTo(0,0),w.lineTo(0,7.6),w.lineTo(3.4,.6),w.lineTo(0,0);const b=new X(new dh(w),new Z({color:g[S%g.length],side:tn,roughness:.8}));b.position.set(.15,1.2,-.5),v.add(M,R,b),v.position.set(-2156+S%3*24,0,2251+(S<3?-30:30)+6),v.rotation.y=(e()-.5)*.6,v.userData.phase=e()*7,s.add(v)}t.add(s)}const r=[];{const m=new Z({color:15265007,roughness:.4,metalness:.2});for(const[_,u]of[[1400,-500],[1470,-420],[1330,-410]]){const g=Be(_,u),S=n(new Ge(1.1,1.6,42,10),m,_,g+21,u);S.castShadow=!0;const v=new Qe;v.position.set(_,g+42,u-1.8);for(let M=0;M<3;M++){const R=new X(new he(.7,15,.18),m);R.geometry=R.geometry.clone(),R.geometry.translate(0,8.2,0);const w=new Qe;w.rotation.z=M/3*Math.PI*2,w.add(R),R.castShadow=!0,v.add(w)}t.add(v),r.push(v)}}{const u=Be(1800,-600),g=new Z({color:5916210,roughness:.9});for(const[S,v]of[[-3,-3],[3,-3],[-3,3],[3,3]]){const M=new X(new Ge(.3,.3,18),g);M.position.set(1800+S,u+9,-600+v),M.castShadow=!0,t.add(M)}n(new he(9,4,9),new Z({color:8020552,roughness:.9}),1800,u+20,-600),n(new pn(7,3,4),new Z({color:3820090,roughness:.9}),1800,u+23.5,-600,Math.PI/4)}{const m=new Qe,_=new Z({color:3812902,roughness:.95}),u=new X(new he(10,6,34),_);u.castShadow=!0;const g=new X(new Ge(5,5,6,3,1),_);g.rotation.y=Math.PI,g.position.z=-19;const S=new X(new Ge(.3,.4,18),new Z({color:4864554,roughness:.9}));S.position.set(0,8,4),S.rotation.z=.35,S.castShadow=!0,m.add(u,g,S),m.position.set(3150,-1.5,2550),m.rotation.set(.08,.7,.42),t.add(m)}{const u=Be(7400,-2400);n(new Ge(6,6.5,7,14),new Z({color:12106946,roughness:.8}),7400,u+3.5,-2400);const g=new X(new Dn(5.5,18,12,0,Math.PI*2,0,Math.PI/2),new Z({color:15265010,roughness:.35,metalness:.2}));g.position.set(7400,u+7,-2400),g.castShadow=!0,t.add(g);const S=new X(new he(1.6,4.5,.6),new Z({color:1316380,roughness:.6}));S.position.set(7400,u+9,-2400-5.2),S.rotation.x=-.25,t.add(S)}let o=null;{const u=Be(3e3,13e3),g=new X(new pn(150,110,24,1,!0),new Z({color:3813936,roughness:1,side:tn}));g.position.set(3e3,u+55,13e3),t.add(g),o=new Z({color:5446149,emissive:16734720,emissiveIntensity:1.6,roughness:.8});const S=new X(new Ms(26,24),o);S.rotation.x=-Math.PI/2,S.position.set(3e3,u+108,13e3),t.add(S);const v=new kt(new Ft({map:ir(),color:16742946,transparent:!0,depthWrite:!1}));v.position.set(3e3,u+130,13e3),v.scale.set(180,180,1),v.userData={blink:!0,rate:.6,duty:.8,dim:!0},t.add(v)}const a=[];{const m=new mt({color:16054008,side:tn}),_=[{x:-2132,z:2251,n:5},{x:-4880,z:1040,n:4}],u=di(5150);for(const g of _)for(let S=0;S<g.n;S++){const v=new Qe,M=new Nt(1.6,.5);M.translate(.8,0,0),M.rotateX(-Math.PI/2);const R=new X(M,m),w=new X(M,m);w.rotation.y=Math.PI,v.add(R,w),v.userData={cx:g.x,cz:g.z,r:30+u()*55,h:14+u()*22,sp:.25+u()*.3,ph:u()*7,wl:R,wr:w},t.add(v),a.push(v)}}const c=new Qe;c.name="balloons";{const m=[14764875,4947425,14787659];for(let _=0;_<3;_++){const u=new Qe,g=new X(new Dn(9,16,12),new Z({color:m[_],roughness:.7}));g.scale.y=1.15;const S=new X(new he(2.4,2,2.4),new Z({color:7031338,roughness:.9}));S.position.y=-12,u.add(g,S);const v=_/3*Math.PI*2;u.position.set(Math.cos(v)*1500,420+_*90,Math.sin(v)*1500),u.userData.phase=v,c.add(u)}t.add(c)}const l=[];{const m=new mt({color:6737151,transparent:!0,opacity:.35,blending:Zr,depthWrite:!1,side:tn});ss.forEach((_,u)=>{const g=Math.max(0,Be(_.x,_.z)),S=new X(new Ge(6,14,700,10,1,!0),m.clone());S.position.set(_.x,g+350,_.z),S.name="pillar-"+u,t.add(S),l.push(S)})}i.add(t);function h(m){const _=l[m];_&&(_.visible=!1)}const f=t.getObjectByName("lightbeams"),d=c.children.map(m=>m.position);function p(m,_,u){for(const S of s.children){const v=S.userData.phase||0;S.position.y=Math.sin(_*.9+v)*.35,S.rotation.z=Math.sin(_*.7+v)*.05,S.rotation.x=Math.cos(_*.6+v)*.04}const g=u?Math.hypot(u.x,u.z):3;for(const S of r)S.rotation.z+=m*(.8+g*.35);for(const S of c.children){S.userData.phase+=m*.008;const v=S.userData.phase;S.position.x=Math.cos(v)*1500+(u?u.x*8:0),S.position.z=Math.sin(v)*1500+(u?u.z*8:0),S.position.y+=Math.sin(_*.3+v*5)*m*2}f&&(f.rotation.y=_*.5),o&&(o.emissiveIntensity=1.3+Math.sin(_*3.1)*.35+Math.sin(_*7.7)*.15);for(const S of a){const v=S.userData,M=_*v.sp+v.ph;S.position.set(v.cx+Math.cos(M)*v.r,v.h+Math.sin(_*.9+v.ph)*2,v.cz+Math.sin(M)*v.r),S.rotation.y=-M;const R=Math.sin(_*9+v.ph)*.55;v.wl.rotation.x=R,v.wr.rotation.x=-R}for(const S of l)S.visible&&(S.material.opacity=.28+Math.sin(_*2+S.position.x)*.12,S.rotation.y+=m*.3)}return{found:h,update:p,balloons:d}}const Oe={enabled:!1,mode:"hidden",stickOn:!1,stickX:0,stickY:0,yaw:0,throttle:0,brakes:!1,run:!1};function cM(){try{if(new URLSearchParams(location.search).has("touch")||matchMedia("(pointer: coarse)").matches||"ontouchstart"in window&&navigator.maxTouchPoints>0)return!0}catch{}return!1}function Fn(i,e,t,n=""){const s=document.createElement(i);return s.className=e,s.innerHTML=n,t.appendChild(s),s}function $o(i,{down:e,move:t,up:n}){let s=null;const r=a=>{const c=i.getBoundingClientRect();return{x:a.clientX-c.left,y:a.clientY-c.top,w:c.width,h:c.height}};i.addEventListener("touchstart",a=>{if(a.preventDefault(),s!==null)return;const c=a.changedTouches[0];s=c.identifier,e&&e(r(c),c)},{passive:!1}),i.addEventListener("touchmove",a=>{a.preventDefault();for(const c of a.changedTouches)c.identifier===s&&t&&t(r(c),c)},{passive:!1});const o=a=>{for(const c of a.changedTouches)c.identifier===s&&(s=null,n&&n())};i.addEventListener("touchend",o),i.addEventListener("touchcancel",o)}function lM(i){if(Oe.enabled=cM(),!Oe.enabled)return{setMode(){},isTouch:!1};document.body.classList.add("touch");const e=Fn("div","touch-hidden",document.body);e.id="touch-ui";const t=Fn("div","t-stick",e),n=Fn("div","t-knob",t),s=(w,b)=>{n.style.transform=`translate(${w}px, ${b}px)`};$o(t,{down:w=>r(w),move:w=>r(w),up:()=>{Oe.stickOn=!1,Oe.stickX=Oe.stickY=0,s(0,0),i.onStick&&i.onStick(0,0)}});function r(w){const b=Math.max(30,w.w/2-10);let T=w.x-w.w/2,F=w.y-w.h/2;const x=Math.hypot(T,F)||1,y=Math.min(1,x/b);T=T/x*y*b,F=F/x*y*b,s(T,F),Oe.stickOn=!0,Oe.stickX=T/b,Oe.stickY=-F/b,i.onStick&&i.onStick(Oe.stickX,Oe.stickY)}const o=Fn("div","t-thr",e);Fn("div","t-thr-fill",o);const a=Fn("div","t-thr-lab",o,"0%"),c=o.querySelector(".t-thr-fill"),l=(w,b=!0)=>{Oe.throttle=Math.max(0,Math.min(1,w)),c.style.height=`${Oe.throttle*100}%`,b&&(a.textContent=`${Math.round(Oe.throttle*100)}%`)};$o(o,{down:w=>l(1-w.y/w.h),move:w=>l(1-w.y/w.h),up:()=>{}});const h=Fn("div","t-rud",e),f=(w,b)=>{const T=Fn("button","t-btn",h,w);return $o(T,{down:()=>{Oe.yaw=b},up:()=>{Oe.yaw===b&&(Oe.yaw=0)}}),T};f("◀ RUD",-1),f("RUD ▶",1);const d=Fn("div","t-sys t-sys-fly",e),p=Fn("div","t-sys t-sys-walk",e),m=(w,b,T,F)=>{const x=Fn("button","t-btn",w,b);return F?$o(x,{down:()=>{Oe.brakes=!0,x.classList.add("held")},up:()=>{Oe.brakes=!1,x.classList.remove("held")}}):T!=="run"&&x.addEventListener("touchstart",y=>{y.preventDefault(),i.onAction&&i.onAction(T)},{passive:!1}),x};m(d,"⏸","pause"),m(d,"📷","cam"),m(d,"✓","next"),m(d,"FL+","flapUp"),m(d,"FL−","flapDown"),m(d,"GEAR","gear"),m(d,"BRK","brakes",!0),m(d,"🚶","walk"),m(d,"🪂","dive");const _=m(p,"🏃","run");m(p,"⏸","pause"),m(p,"📷","cam"),m(p,"✓","next"),m(p,"E","interact"),m(p,"🚶","walk"),_.addEventListener("touchstart",w=>{w.preventDefault(),Oe.run=!Oe.run,_.classList.toggle("held",Oe.run)},{passive:!1});const u=Fn("div","t-look",e);let g=null,S=0,v=0;u.addEventListener("touchstart",w=>{if(w.preventDefault(),g!==null)return;const b=w.changedTouches[0];g=b.identifier,S=b.clientX,v=b.clientY},{passive:!1}),u.addEventListener("touchmove",w=>{w.preventDefault();for(const b of w.changedTouches)b.identifier===g&&(i.onLook&&i.onLook((b.clientX-S)*1.6,(b.clientY-v)*1.6),S=b.clientX,v=b.clientY)},{passive:!1});const M=w=>{for(const b of w.changedTouches)b.identifier===g&&(g=null)};u.addEventListener("touchend",M),u.addEventListener("touchcancel",M),addEventListener("touchstart",function(){document.body.classList.add("touch")},{once:!0,passive:!0});function R(w){Oe.mode=w,Oe.stickOn=!1,Oe.stickX=Oe.stickY=0,Oe.yaw=0,Oe.brakes=!1,s(0,0),e.className=w==="hidden"?"touch-hidden":"",e.dataset.mode=w,w==="fly"&&i.getThrottle&&l(i.getThrottle()),w!=="walk"&&(Oe.run=!1,_.classList.remove("held"))}return R("hidden"),{setMode:R,isTouch:!0}}function hM(i){const e=new Set,t={pitch:0,roll:0,yaw:0,trim:0,throttle:0,flapIdx:0,gearDown:!0,brakes:!1,locked:!1};let n=!1;addEventListener("keydown",o=>{if(o.repeat){e.add(o.code);return}e.add(o.code),o.code==="KeyF"&&(t.flapIdx=Math.min(3,t.flapIdx+1)),o.code==="KeyV"&&(t.flapIdx=Math.max(0,t.flapIdx-1)),o.code==="KeyG"&&(t.gearDown=!t.gearDown),o.code==="Enter"&&!t.locked&&(n=!0)}),addEventListener("keyup",o=>e.delete(o.code)),addEventListener("wheel",o=>{t.throttle=Zn(t.throttle-Math.sign(o.deltaY)*.05,0,1)},{passive:!0}),document.addEventListener("pointerlockchange",()=>{t.locked=document.pointerLockElement===document.body}),document.addEventListener("mousemove",o=>{if(!t.locked)return;const a=i?.sensitivity??1;t.roll=Zn(t.roll+o.movementX*.0022*a,-1,1),t.pitch=Zn(t.pitch-o.movementY*.0022*a,-1,1)}),document.body.addEventListener("click",()=>{Oe.enabled||((n||!t.locked)&&document.body.requestPointerLock?.(),n=!1)});function s(o){if(n&&(n=!1,!Oe.enabled))try{const l=document.body.requestPointerLock?.();l&&typeof l.catch=="function"&&l.catch(()=>{})}catch{}(e.has("KeyW")||e.has("ShiftLeft"))&&(t.throttle=Zn(t.throttle+o*.5,0,1)),(e.has("KeyS")||e.has("ControlLeft"))&&(t.throttle=Zn(t.throttle-o*.6,0,1)),t.yaw=(e.has("KeyD")?1:0)-(e.has("KeyA")?1:0),e.has("KeyX")&&(t.trim=Zn(t.trim+o*.4,-1,1)),e.has("KeyZ")&&(t.trim=Zn(t.trim-o*.4,-1,1)),e.has("ArrowUp")&&(t.pitch=Zn(t.pitch+o*1.5,-1,1)),e.has("ArrowDown")&&(t.pitch=Zn(t.pitch-o*1.5,-1,1)),e.has("ArrowLeft")&&(t.roll=Zn(t.roll-o*2,-1,1)),e.has("ArrowRight")&&(t.roll=Zn(t.roll+o*2,-1,1)),t.brakes=e.has("KeyB");const a=Math.min(1,o*1.6),c=Math.min(1,o*.25);if(!e.has("ArrowLeft")&&!e.has("ArrowRight")&&(t.roll-=t.roll*a),!e.has("ArrowUp")&&!e.has("ArrowDown")&&(t.pitch-=t.pitch*c),Oe.mode==="fly"){if(t.throttle=Oe.throttle,Oe.stickOn)t.pitch=Oe.stickY,t.roll=Oe.stickX;else{const l=Math.min(1,o*6);t.pitch-=t.pitch*l,t.roll-=t.roll*l}Oe.yaw!==0&&(t.yaw=Oe.yaw),Oe.brakes&&(t.brakes=!0)}return t}const r=o=>{const a=e.has(o);return a&&e.delete(o),a};return{st:t,poll:s,keys:e,consumeReset:()=>r("KeyR"),consumeCam:()=>r("KeyC"),consumeHelp:()=>r("KeyH"),consumePause:()=>r("KeyP"),consumeWalk:()=>r("KeyK"),consumeInteract:()=>r("KeyE"),consumeSkydive:()=>r("KeyJ"),consumeMap:()=>r("KeyM"),consumeTutorialAdvance:()=>r("KeyT")||r("Enter")}}function Zn(i,e,t){return Math.max(e,Math.min(t,i))}function nd(i,e){if(e===Pp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===bl||e===Hd){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===bl)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class uM extends bs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new gM(t)}),this.register(function(t){return new _M(t)}),this.register(function(t){return new TM(t)}),this.register(function(t){return new AM(t)}),this.register(function(t){return new RM(t)}),this.register(function(t){return new vM(t)}),this.register(function(t){return new yM(t)}),this.register(function(t){return new MM(t)}),this.register(function(t){return new SM(t)}),this.register(function(t){return new mM(t)}),this.register(function(t){return new wM(t)}),this.register(function(t){return new xM(t)}),this.register(function(t){return new bM(t)}),this.register(function(t){return new EM(t)}),this.register(function(t){return new fM(t)}),this.register(function(t){return new CM(t)}),this.register(function(t){return new PM(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=$r.extractUrlBase(e);o=$r.resolveURL(l,this.path)}else o=$r.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new ph(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Rf){try{o[et.KHR_BINARY_GLTF]=new LM(e)}catch(f){s&&s(f);return}r=JSON.parse(o[et.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new WM(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const f=this.pluginCallbacks[h](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const f=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(f){case et.KHR_MATERIALS_UNLIT:o[f]=new pM;break;case et.KHR_DRACO_MESH_COMPRESSION:o[f]=new IM(r,this.dracoLoader);break;case et.KHR_TEXTURE_TRANSFORM:o[f]=new DM;break;case et.KHR_MESH_QUANTIZATION:o[f]=new NM;break;default:d.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function dM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const et={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class fM{constructor(e){this.parser=e,this.name=et.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new ze(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Zt);const f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Sf(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ey(h),l.distance=f;break;case"spot":l=new Mf(h),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Ai(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class pM{constructor(){this.name=et.KHR_MATERIALS_UNLIT}getMaterialType(){return mt}extendParams(e,t,n){const s=[];e.color=new ze(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Zt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,cn))}return Promise.all(s)}}class mM{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class gM{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ue(a,a)}return Promise.all(r)}}class _M{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class xM{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class vM{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ze(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Zt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,cn)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class yM{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class MM{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ze().setRGB(a[0],a[1],a[2],Zt),Promise.all(r)}}class SM{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class wM{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ze().setRGB(a[0],a[1],a[2],Zt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,cn)),Promise.all(r)}}class EM{constructor(e){this.parser=e,this.name=et.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class bM{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class TM{constructor(e){this.parser=e,this.name=et.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class AM{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class RM{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class CM{constructor(e){this.name=et.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,h=s.count,f=s.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,f,d,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(h*f);return o.decodeGltfBuffer(new Uint8Array(p),h,f,d,s.mode,s.filter),p})})}else return null}}class PM{constructor(e){this.name=et.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==kn.TRIANGLES&&l.mode!==kn.TRIANGLE_STRIP&&l.mode!==kn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),f=h.isGroup?h.children:[h],d=l[0].count,p=[];for(const m of f){const _=new qe,u=new N,g=new _n,S=new N(1,1,1),v=new gr(m.geometry,m.material,d);for(let M=0;M<d;M++)c.TRANSLATION&&u.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,M),c.SCALE&&S.fromBufferAttribute(c.SCALE,M),v.setMatrixAt(M,_.compose(u,g,S));for(const M in c)if(M==="_COLOR_0"){const R=c[M];v.instanceColor=new Cl(R.array,R.itemSize,R.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&m.geometry.setAttribute(M,c[M]);St.prototype.copy.call(v,m),this.parser.assignFinalMaterial(v),p.push(v)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const Rf="glTF",Br=12,id={JSON:1313821514,BIN:5130562};class LM{constructor(e){this.name=et.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Br),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Rf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Br,r=new DataView(e,Br);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===id.JSON){const l=new Uint8Array(e,Br+o,a);this.content=n.decode(l)}else if(c===id.BIN){const l=Br+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class IM{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=et.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const f=Nl[h]||h.toLowerCase();a[f]=o[h]}for(const h in e.attributes){const f=Nl[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],p=sr[d.componentType];l[f]=p.name,c[f]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(f,d){s.decodeDracoFile(h,function(p){for(const m in p.attributes){const _=p.attributes[m],u=c[m];u!==void 0&&(_.normalized=u)}f(p)},a,l,Zt,d)})})}}class DM{constructor(){this.name=et.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class NM{constructor(){this.name=et.KHR_MESH_QUANTIZATION}}class Cf extends ao{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,f=(n-t)/h,d=f*f,p=d*f,m=e*l,_=m-l,u=-2*p+3*d,g=p-d,S=1-u,v=g-d+f;for(let M=0;M!==a;M++){const R=o[_+M+a],w=o[_+M+c]*h,b=o[m+M+a],T=o[m+M]*h;r[M]=S*R+v*w+u*b+g*T}return r}}const UM=new _n;class FM extends Cf{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return UM.fromArray(r).normalize().toArray(r),r}}const kn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},sr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},sd={9728:mn,9729:$t,9984:Ld,9985:sa,9986:kr,9987:ui},rd={33071:hi,33648:ma,10497:is},Rc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Nl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Gi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},OM={CUBICSPLINE:void 0,LINEAR:eo,STEP:Qr},Cc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function BM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Z({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ii})),i.DefaultMaterial}function ds(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ai(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function zM(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const f=e[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const f=e[l];if(n){const d=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):i.attributes.position;o.push(d)}if(s){const d=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):i.attributes.normal;a.push(d)}if(r){const d=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],f=l[1],d=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=f),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function kM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function HM(i){let e;const t=i.extensions&&i.extensions[et.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Pc(t.attributes):e=i.indices+":"+Pc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Pc(i.targets[n]);return e}function Pc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Ul(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function VM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const GM=new qe;class WM{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new dM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new yy(this.options.manager):this.textureLoader=new Ty(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ph(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return ds(r,a,s),Ai(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[et.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load($r.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=Rc[s.type],a=sr[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new jt(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=Rc[s.type],l=sr[s.componentType],h=l.BYTES_PER_ELEMENT,f=h*c,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0;let _,u;if(p&&p!==f){const g=Math.floor(d/p),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count;let v=t.cache.get(S);v||(_=new l(a,g*p,s.count*p/h),v=new cf(_,p/h),t.cache.add(S,v)),u=new no(v,c,d%p/h,m)}else a===null?_=new l(s.count*c):_=new l(a,d,s.count*c),u=new jt(_,c,m);if(s.sparse!==void 0){const g=Rc.SCALAR,S=sr[s.sparse.indices.componentType],v=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,R=new S(o[1],v,s.sparse.count*g),w=new l(o[2],M,s.sparse.count*c);a!==null&&(u=new jt(u.array.slice(),u.itemSize,u.normalized)),u.normalized=!1;for(let b=0,T=R.length;b<T;b++){const F=R[b];if(u.setX(F,w[b*c]),c>=2&&u.setY(F,w[b*c+1]),c>=3&&u.setZ(F,w[b*c+2]),c>=4&&u.setW(F,w[b*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}u.normalized=m}return u})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=sd[d.magFilter]||$t,h.minFilter=sd[d.minFilter]||ui,h.wrapS=rd[d.wrapS]||is,h.wrapT=rd[d.wrapT]||is,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const o=s.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(f){l=!0;const d=new Blob([f],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(f){return new Promise(function(d,p){let m=d;t.isImageBitmapLoader===!0&&(m=function(_){const u=new Ht(_);u.needsUpdate=!0,d(u)}),t.load($r.resolveURL(f,r.path),m,void 0,p)})}).then(function(f){return l===!0&&a.revokeObjectURL(c),Ai(f,o),f.userData.mimeType=o.mimeType||VM(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[et.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[et.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[et.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new La,si.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new uf,si.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Z}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[et.KHR_MATERIALS_UNLIT]){const f=s[et.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),l.push(f.extendParams(a,r,t))}else{const f=r.pbrMetallicRoughness||{};if(a.color=new ze(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const d=f.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Zt),a.opacity=d[3]}f.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",f.baseColorTexture,cn)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=tn);const h=r.alphaMode||Cc.OPAQUE;if(h===Cc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Cc.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==mt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ue(1,1),r.normalTexture.scale!==void 0)){const f=r.normalTexture.scale;a.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&o!==mt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==mt){const f=r.emissiveFactor;a.emissive=new ze().setRGB(f[0],f[1],f[2],Zt)}return r.emissiveTexture!==void 0&&o!==mt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,cn)),Promise.all(l).then(function(){const f=new o(a);return r.name&&(f.name=r.name),Ai(f,r),t.associations.set(f,{materials:e}),r.extensions&&ds(s,f,r),f})}createUniqueName(e){const t=pt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[et.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return od(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=HM(l),f=s[h];if(f)o.push(f.promise);else{let d;l.extensions&&l.extensions[et.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=od(new Bt,l,t),s[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?BM(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],f=[];for(let p=0,m=h.length;p<m;p++){const _=h[p],u=o[p];let g;const S=l[p];if(u.mode===kn.TRIANGLES||u.mode===kn.TRIANGLE_STRIP||u.mode===kn.TRIANGLE_FAN||u.mode===void 0)g=r.isSkinnedMesh===!0?new Sv(_,S):new X(_,S),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),u.mode===kn.TRIANGLE_STRIP?g.geometry=nd(g.geometry,Hd):u.mode===kn.TRIANGLE_FAN&&(g.geometry=nd(g.geometry,bl));else if(u.mode===kn.LINES)g=new bv(_,S);else if(u.mode===kn.LINE_STRIP)g=new ah(_,S);else if(u.mode===kn.LINE_LOOP)g=new Tv(_,S);else if(u.mode===kn.POINTS)g=new ch(_,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+u.mode);Object.keys(g.geometry.morphAttributes).length>0&&kM(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),Ai(g,r),u.extensions&&ds(s,g,u),t.assignFinalMaterial(g),f.push(g)}for(let p=0,m=f.length;p<m;p++)t.associations.set(f[p],{meshes:e,primitives:p});if(f.length===1)return r.extensions&&ds(s,f[0],r),f[0];const d=new Qe;r.extensions&&ds(s,d,r),t.associations.set(d,{meshes:e});for(let p=0,m=f.length;p<m;p++)d.add(f[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new fn(im.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new nh(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ai(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const f=o[l];if(f){a.push(f);const d=new qe;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new oh(a,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let f=0,d=s.channels.length;f<d;f++){const p=s.channels[f],m=s.samplers[p.sampler],_=p.target,u=_.node,g=s.parameters!==void 0?s.parameters[m.input]:m.input,S=s.parameters!==void 0?s.parameters[m.output]:m.output;_.node!==void 0&&(o.push(this.getDependency("node",u)),a.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",S)),l.push(m),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){const d=f[0],p=f[1],m=f[2],_=f[3],u=f[4],g=[];for(let S=0,v=d.length;S<v;S++){const M=d[S],R=p[S],w=m[S],b=_[S],T=u[S];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const F=n._createAnimationTracks(M,R,w,b,T);if(F)for(let x=0;x<F.length;x++)g.push(F[x])}return new dy(r,void 0,g)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const h=l[0],f=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,GM)});for(let p=0,m=f.length;p<m;p++)h.add(f[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new hf:l.length>1?h=new Qe:l.length===1?h=l[0]:h=new St,h!==l[0])for(let f=0,d=l.length;f<d;f++)h.add(l[f]);if(r.name&&(h.userData.name=r.name,h.name=o),Ai(h,r),r.extensions&&ds(n,h,r),r.matrix!==void 0){const f=new qe;f.fromArray(r.matrix),h.applyMatrix4(f)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Qe;n.name&&(r.name=s.createUniqueName(n.name)),Ai(r,n),n.extensions&&ds(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,f=c.length;h<f;h++)r.add(c[h]);const l=h=>{const f=new Map;for(const[d,p]of s.associations)(d instanceof si||d instanceof Ht)&&f.set(d,p);return h.traverse(d=>{const p=s.associations.get(d);p!=null&&f.set(d,p)}),f};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,c=[];Gi[r.path]===Gi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(Gi[r.path]){case Gi.weights:l=_r;break;case Gi.rotation:l=xr;break;case Gi.position:case Gi.scale:l=vr;break;default:switch(n.itemSize){case 1:l=_r;break;case 2:case 3:default:l=vr;break}break}const h=s.interpolation!==void 0?OM[s.interpolation]:eo,f=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){const m=new l(c[d]+"."+Gi[r.path],t.array,f,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ul(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof xr?FM:Cf;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function XM(i,e,t){const n=e.attributes,s=new fi;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),a.normalized){const h=Ul(sr[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new N,c=new N;for(let l=0,h=r.length;l<h;l++){const f=r[l];if(f.POSITION!==void 0){const d=t.json.accessors[f.POSITION],p=d.min,m=d.max;if(p!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(m[2]))),d.normalized){const _=Ul(sr[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new pi;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function od(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=Nl[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return rt.workingColorSpace!==Zt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${rt.workingColorSpace}" not supported.`),Ai(i,e),XM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?zM(i,e.targets,t):i})}function qM(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,0.55)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new hn(i)}function KM(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d"),t=e.createRadialGradient(128,128,20,128,128,128);t.addColorStop(0,"rgba(200,200,200,0)"),t.addColorStop(.55,"rgba(210,210,210,0.28)"),t.addColorStop(.85,"rgba(220,220,220,0.5)"),t.addColorStop(1,"rgba(230,230,230,0)"),e.fillStyle=t,e.fillRect(0,0,256,256),e.strokeStyle="rgba(60,60,60,0.35)",e.lineWidth=10;for(let n=0;n<2;n++)e.beginPath(),e.arc(128,128,95,n*Math.PI,n*Math.PI+2.4),e.stroke();return new hn(i)}function YM(i){const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");t.clearRect(0,0,512,128),t.fillStyle="#b31b1b",t.font="bold 84px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText(i,256,68);const n=new hn(e);return n.anisotropy=4,n}const $M={wing:"high",tires:"std",body:16054008,accent:11737883,canopy:!1,hopper:!1,reg:"N172FS"};async function Pf(i,e={}){const t={...$M,...e.look||{}};if(e.useGLB!==!1)try{const Y=(await new uM().loadAsync("models/plane.glb")).scene;Y.traverse(ne=>{ne.isMesh&&(ne.castShadow=!0)});const ee=ZM(Y);return i.add(ee),JM(Y)}catch{}const n=new Qe,s=new Z({color:t.body,roughness:.32,metalness:.12}),r=new Z({color:t.accent,roughness:.38,metalness:.1}),o=new Z({color:1842980,roughness:.55,metalness:.3}),a=new Z({color:922651,roughness:.06,metalness:.9}),c=new Z({color:1381653,roughness:.9}),l=new Z({color:10133670,roughness:.35,metalness:.8}),h=(C,Y,ee=0,ne=0,se=0)=>{const pe=new X(C,Y);return pe.position.set(ee,ne,se),pe.castShadow=!0,n.add(pe),pe},f=new Ia;f.moveTo(3.55,-.45),f.quadraticCurveTo(3.75,.1,3.35,.42),f.lineTo(2.1,.52),f.quadraticCurveTo(1.2,1.28,.2,1.3),f.lineTo(-1,1.28),f.quadraticCurveTo(-2.4,1.05,-3.55,.42),f.lineTo(-3.62,-.05),f.quadraticCurveTo(-2,-.62,-.6,-.68),f.lineTo(1.6,-.7),f.quadraticCurveTo(2.9,-.68,3.55,-.45);const d=new uh(f,{depth:1.35,bevelEnabled:!0,bevelThickness:.18,bevelSize:.18,bevelSegments:3,steps:1});d.rotateY(Math.PI/2),d.translate(-.675,0,0);const p=new X(d,s);p.castShadow=p.receiveShadow=!0,n.add(p);const _=h(new he(.02,.22,5.6),r,-.86,-.05,.4).clone();_.position.x=.86,n.add(_);const u=YM(t.reg);for(const C of[-1,1]){const Y=new X(new Nt(1.9,.48),new mt({map:u,transparent:!0}));Y.position.set(C*.868,.28,1.9),Y.rotation.y=C*Math.PI/2,n.add(Y)}const g=h(new he(t.canopy?1.25:1.15,t.canopy?.78:.62,.06),a,0,t.canopy?1.06:1.02,-1.68);g.rotation.x=.8;for(const C of[-1,1]){const Y=h(new he(.06,t.canopy?.68:.55,1.05),a,C*.87,t.canopy?1:.95,-.85);Y.rotation.y=-C*.12,t.canopy||h(new he(.06,.5,.85),a,C*.87,.93,.25)}if(t.hopper){const C=h(new he(1.15,.75,1),new Z({color:10133670,roughness:.6,metalness:.4}),0,1.15,.75);C.castShadow=!0}const S=t.wing==="high"?1.5:-.12,v=s;for(const C of[-1,1]){const Y=h(new he(5.4,.16,1.55),v,C*2.75,S,-.35);Y.rotation.z=-C*.035;const ee=h(new he(.5,.14,1.3),r,C*5.35,S+.1,-.35);if(ee.rotation.z=-C*.035,t.wing==="high"){const ne=h(new Ge(.06,.06,2.6),l,C*1.35,.45,-.25);ne.rotation.z=C*.62}}h(new he(1.2,.18,1.55),v,0,S+.02,-.35);const M=(C,Y,ee,ne,se,pe,ge,P)=>{const E=new he(C,Y,ee);P==="x"&&E.translate(0,0,ee/2),P==="y"&&E.translate(0,0,ee/2);const V=new X(E,ne);return V.position.set(se,pe,ge),V.castShadow=!0,n.add(V),V},R=M(2,.12,.5,r,-4.15,S+.01,.18,"x"),w=M(2,.12,.5,r,4.15,S+.01,.18,"x"),b=M(1.7,.12,.55,v,-1,S,.18,"x"),T=M(1.7,.12,.55,v,1,S,.18,"x");h(new he(3.5,.13,1.05),v,0,.42,3.15);const F=M(3.3,.11,.5,r,0,.42,3.62,"x");h(new he(.13,1.75,1.35),r,0,1.15,3.15);const x=M(.11,1.6,.65,s,0,1.12,3.78,"y"),y=new Qe;y.position.set(0,.05,-4.02);const D=new he(.16,1.1,.07);D.translate(0,.55,0);const L=new X(D,o);L.castShadow=!0;const I=L.clone();I.rotation.z=Math.PI;const B=new X(new pn(.26,.62,14),r);B.rotation.x=-Math.PI/2,B.position.z=-.1,B.castShadow=!0;const U=new X(new Ms(1.02,40),new mt({map:KM(),transparent:!0,opacity:0,side:tn,depthWrite:!1}));U.position.z=.02,y.add(L,I,B,U),n.add(y);const G=new Qe,O=t.tires==="tundra",J=O?.46:.3,j=O?-.8:-.78,ce=(C,Y,ee)=>{const ne=new X(new Ge(.07,.07,ee),l);if(ne.position.set(C,-ee/2,Y),ne.castShadow=!0,C!==0&&(ne.rotation.z=Math.sign(C)*.2),G.add(ne),!O){const pe=new X(new Dn(.34,12,10),s);pe.scale.set(.75,1.05,1.5),pe.position.set(C,-.78,Y),pe.castShadow=!0,G.add(pe)}const se=new X(new Ge(J,J,O?.3:.2,14),c);se.rotation.z=Math.PI/2,se.position.set(C,j,Y+.08),se.castShadow=!0,G.add(se)};ce(0,-2.35,.9),ce(-.95,-.15,.9),ce(.95,-.15,.9),n.add(G);const Te=h(new Ge(.09,.11,.5),o,.45,-.75,-2.9);Te.rotation.x=Math.PI/2,h(new Ge(.025,.025,.7),l,-3.1,S+.08,-.2).rotation.x=Math.PI/2,h(new pn(.05,.35,8),o,0,1.48,-.3),h(new pn(.04,.28,8),o,0,-.85,1.6).rotation.x=Math.PI;const Le=qM(),K=new kt(new Ft({map:Le,color:16720418,transparent:!0,depthWrite:!1}));K.position.set(-5.68,S+.1,-.35),K.scale.set(1.2,1.2,1),n.add(K);const ae=K.clone();ae.material=K.material.clone(),ae.material.color.set(2293572),ae.position.x=5.68,n.add(ae);const _e=K.clone();_e.material=K.material.clone(),_e.material.color.set(16777215),_e.position.set(0,.5,3.85),_e.scale.set(.9,.9,1),n.add(_e);const fe=new kt(new Ft({map:Le,color:16777215,transparent:!0,depthWrite:!1}));fe.position.copy(K.position),fe.scale.set(3.2,3.2,1),n.add(fe);const De=fe.clone();De.position.copy(ae.position),n.add(De);const Ne=new kt(new Ft({map:Le,color:16724770,transparent:!0,depthWrite:!1}));Ne.position.set(0,1.62,-.3),Ne.scale.set(2.2,2.2,1),n.add(Ne);const Pe=new kt(new Ft({map:Le,color:16774872,transparent:!0,depthWrite:!1}));Pe.position.set(-1.8,S,-1.15),Pe.scale.set(2.6,2.6,1),n.add(Pe);const He=h(new Ms(.16,12),new mt({color:16774872}),-1.8,S,-1.14);He.rotation.y=Math.PI;const ie=new Qe;return ie.position.set(0,.42,-1.78),n.add(ie),i.add(n),jM(n,{aileronL:R,aileronR:w,elevator:F,rudder:x,flapL:b,flapR:T,prop:y,blade1:L,blade2:I,blur:U,gear:G,strobeL:fe,strobeR:De,beaconT:Ne,landGlow:Pe,landLens:He,dashAnchor:ie,paintRef:s,accentRef:r})}function jM(i,e){let t=0;return{root:i,dashAnchor:e.dashAnchor,setPaint(n,s){i.traverse(r=>{!r.isMesh||!r.material||!r.material.color||(r.material===e.paintRef&&r.material.color.setHex(n),r.material===e.accentRef&&r.material.color.setHex(s))})},setState({pos:n,quat:s}){i.position.copy(n),i.quaternion.copy(s)},animate({roll:n,pitch:s,yaw:r,flapFrac:o,gearDown:a,rpm01:c},l,h=0){t+=l*(3+c*95),e.prop.rotation.z=t;const f=Math.min(1,Math.max(0,(c-.25)/.5));e.blur.material.opacity=f*.9,e.blade1.visible=e.blade2.visible=f<.85,e.aileronL.rotation.x=n*.45,e.aileronR.rotation.x=-n*.45,e.elevator.rotation.x=-s*.45,e.rudder.rotation.y=r*.5,e.flapL.rotation.x=e.flapR.rotation.x=o*.65;const d=a?0:-1.05;e.gear.position.y+=(d-e.gear.position.y)*Math.min(1,l*2.2);const p=h%1.1,m=p<.05||p>.12&&p<.17;e.strobeL.material.opacity=e.strobeR.material.opacity=m?1:0,e.strobeL.visible=e.strobeR.visible=m;const u=h%1.4/1.4<.12;e.beaconT.material.opacity=u?1:.05;const g=a?.85:0;e.landGlow.material.opacity=g,e.landLens.material.color.setScalar(a?1:.25)},pilotEye(){return new N(.38,.82,-.95)}}}function ZM(i){const e=new fi().setFromObject(i),t=e.getSize(new N),n=e.getCenter(new N),s=Math.max(t.x,t.z),r=s>0?11/s:1;i.scale.multiplyScalar(r),i.position.sub(n.clone().multiplyScalar(r));const o=[];if(i.updateMatrixWorld(!0),i.traverse(c=>{/prop|spinner|nose|engine|cockpit|windshield/i.test(c.name)&&o.push(c.getWorldPosition(new N))}),o.length){const c=new N;for(const h of o)c.add(h);c.divideScalar(o.length);const l=c.sub(n);l.y=0,l.lengthSq()>1e-6&&(i.rotation.y=Math.atan2(l.x,l.z)+Math.PI)}const a=new Qe;return a.add(i),i.userData.fitWrap=a,a}function JM(i){const e=i.userData.fitWrap||i;let t=null;i.traverse(o=>{!t&&/prop/i.test(o.name)&&(t=o)});let n=0,s=null;i.traverse(o=>{!s&&/cockpit|pilot|seat/i.test(o.name)&&(s=o)});const r=new Qe;return r.position.set(0,.4,-1.8),(e===i?i:e).add(r),{root:e===i?i:e,dashAnchor:r,setPaint(){},setState({pos:o,quat:a}){this.root.position.copy(o),this.root.quaternion.copy(a)},animate({rpm01:o},a){n+=a*(3+o*95),t&&(t.rotation.z=n)},pilotEye(){if(s){const o=new N;return s.getWorldPosition(o),this.root.worldToLocal(o)}return new N(.3,1.2,-1)}}}const bt=i=>document.getElementById(i);function QM(){const i={ias:bt("h-ias"),alt:bt("h-alt"),vsi:bt("h-vsi"),hdg:bt("h-hdg"),thr:bt("h-thr"),rpm:bt("h-rpm"),flap:bt("h-flap"),gear:bt("h-gear"),aoa:bt("h-aoa"),agl:bt("h-agl"),wind:bt("h-wind"),cam:bt("h-cam"),fps:bt("h-fps"),stall:bt("w-stall"),gearWarn:bt("w-gear"),trim:bt("h-trim"),over:bt("w-over"),sights:bt("h-sights"),money:bt("h-money"),clock:bt("h-clock"),hint:bt("hint"),hintText:bt("hint-text"),horizon:bt("horizon")},e=i.horizon.getContext("2d");function t(o,a){e.clearRect(0,0,150,150),e.save(),e.beginPath(),e.arc(75,75,70,0,7),e.clip(),e.translate(75,75),e.rotate(-a*Math.PI/180);const d=o*1.6;e.fillStyle="#3a7bd5",e.fillRect(-90,-90+d,180,90-d+90),e.fillStyle="#8a5a2b",e.fillRect(-90,d,180,180),e.strokeStyle="#fff",e.lineWidth=1.5,e.beginPath(),e.moveTo(-90,d),e.lineTo(90,d),e.stroke(),e.font="9px monospace",e.fillStyle="#fff",e.textAlign="center";for(let p=-20;p<=20;p+=10){if(!p)continue;const m=d-p*1.6;e.beginPath(),e.moveTo(-22,m),e.lineTo(22,m),e.stroke(),e.fillText(String(Math.abs(p)),0,m-3)}e.restore(),e.strokeStyle="#ff0",e.lineWidth=3,e.beginPath(),e.moveTo(41,75),e.lineTo(65,75),e.lineTo(75,81),e.lineTo(85,75),e.lineTo(109,75),e.stroke(),e.beginPath(),e.arc(75,75,70,0,7),e.strokeStyle="rgba(255,255,255,.5)",e.lineWidth=2,e.stroke()}let n=performance.now(),s=60;function r(o){i.ias.textContent=Math.round(o.iasKt),i.alt.textContent=Math.round(o.altFt);const a=Math.round(o.vsiFpm/50)*50;i.vsi.textContent=(a>=0?"+":"")+a,i.hdg.textContent=String(Math.round(o.hdgDeg)).padStart(3,"0"),i.thr.textContent=Math.round(o.throttle*100),i.rpm.textContent=Math.round(o.rpm),i.flap.textContent=o.flapDeg,i.gear.textContent=o.gearDown?"DOWN":"UP",i.gear.style.color=o.gearDown?"#7fff5f":"#faa",i.aoa.textContent=o.aoaDeg.toFixed(1),i.agl.textContent=Math.round(o.aglFt),i.wind.textContent=Math.round(o.windKt),i.cam.textContent=o.cam,i.sights&&o.sights&&(i.sights.textContent=o.sights),i.money&&o.money!=null&&(i.money.textContent=o.money),i.clock&&o.clock&&(i.clock.textContent=o.clock),i.trim&&(i.trim.textContent=(o.trim>=0?"+":"")+(o.trim*100).toFixed(0)),i.stall.style.display=o.stalled?"block":"none",i.gearWarn.style.display=!o.gearDown&&o.aglFt<500&&o.vsiFpm<-100?"block":"none",i.over&&(i.over.style.display=o.overspeed?"block":"none",i.over.textContent=o.overspeed||""),i.hint&&(i.hint.style.display=o.hint?"block":"none",o.hint&&(i.hintText.textContent=o.hint)),t(o.pitchDeg,o.rollDeg);const c=performance.now();s+=(1e3/Math.max(1,c-n)-s)*.05,n=c,i.fps.textContent=Math.round(s)}return{update:r}}function st(i,e=2600){const t=document.getElementById("toast");t.textContent=i,t.style.display="block",clearTimeout(t._h),t._h=setTimeout(()=>t.style.display="none",e)}const eS="audio/sfx/",Lc=new Map;function xh(i){if(Lc.has(i))return Lc.get(i);try{const e=new Audio(eS+i+".mp3");return e.preload="auto",e.volume=1,Lc.set(i,e),e}catch{return null}}function Mn(i,e=.7){const t=xh(i);if(!t)return null;try{const n=t.cloneNode(!0);return n.volume=e,n.play().catch(()=>{}),n}catch{return null}}let Pn=null,Vr=null,da=null,fa=null,Fl=!1,Ti=null;function Lf(){if(!Fl)try{Pn=new(window.AudioContext||window.webkitAudioContext),Vr=Pn.createOscillator(),Vr.type="sawtooth",da=Pn.createGain(),da.gain.value=0;const i=Pn.createBiquadFilter();i.type="lowpass",i.frequency.value=900,Vr.connect(i).connect(da).connect(Pn.destination),Vr.start();const e=Pn.sampleRate*2,t=Pn.createBuffer(1,e,Pn.sampleRate),n=t.getChannelData(0);for(let o=0;o<e;o++)n[o]=Math.random()*2-1;const s=Pn.createBufferSource();s.buffer=t,s.loop=!0;const r=Pn.createBiquadFilter();r.type="bandpass",r.frequency.value=600,fa=Pn.createGain(),fa.gain.value=0,s.connect(r).connect(fa).connect(Pn.destination),s.start(),Fl=!0,Ti=xh("stall_warn"),document.addEventListener("click",o=>{o.target.closest('button, .btn, [role="button"]')&&Mn("ui_click",.35)})}catch{}}addEventListener("pointerdown",Lf,{once:!1});addEventListener("keydown",Lf,{once:!1});setTimeout(()=>{["crash_0","crash_1","crash_2","land_soft","land_hard","splash","step_0","step_1","ui_click","gear","chute_deploy","canopy","stall_warn"].forEach(xh)},500);function tS(){let i=!1;function e(_,u,g){if(!Fl)return;const S=Pn.currentTime;if(Vr.frequency.setTargetAtTime(45+_*90+(g?8:0),S,.1),da.gain.setTargetAtTime(.02+_*.05,S,.1),fa.gain.setTargetAtTime(u*u*.12,S,.2),g&&!i&&Ti)try{Ti.currentTime=0,Ti.loop=!0,Ti.volume=.45,Ti.play().catch(()=>{}),i=!0}catch{}else!g&&i&&Ti&&(Ti.pause(),Ti.currentTime=0,i=!1)}function t(){const _=Math.floor(Math.random()*5);Mn("crash_"+_,.8)}function n(){Mn("land_hard",.75)}function s(){Mn("land_soft",.5)}function r(){Mn("splash",.7)}function o(){const _=Math.floor(Math.random()*4);Mn("step_"+_,.3)}function a(){Mn("ui_click",.5)}function c(){Mn("ui_select",.55)}function l(){Mn("ui_open",.45)}function h(){Mn("ui_close",.45)}function f(){Mn("ui_confirm",.55)}function d(){Mn("gear",.6)}function p(){Mn("canopy",.7)}function m(){Mn("chute_deploy",.65)}return{update:e,crash:t,landHard:n,landSoft:s,splash:r,step:o,uiClick:a,uiSelect:c,uiOpen:l,uiClose:h,uiConfirm:f,gearToggle:d,canopyOpen:p,chuteDeploy:m}}const ad={windKt:6,turbulence:1,sensitivity:1,realism:!0,startTOD:"morning",dayLengthMin:12,weather:0};function nS(){try{const i=localStorage.getItem("flightsim-settings");if(i)return{...ad,...JSON.parse(i)}}catch{}return{...ad}}function iS(){const i=nS(),e=["home","fly","howto","settings"],t={menu:document.getElementById("menu"),pause:document.getElementById("pause"),help:document.getElementById("help"),instructor:document.getElementById("instructor")};let n=()=>{},s=()=>{};function r(u){for(const g of e)document.getElementById("screen-"+g)?.classList.toggle("active",g===u);t.menu.classList.toggle("hidden",!u)}function o(){t.menu.classList.add("hidden")}document.querySelectorAll("[data-nav]").forEach(u=>u.addEventListener("click",()=>r(u.dataset.nav))),document.getElementById("quit-btn")?.addEventListener("click",()=>{s()}),document.querySelectorAll("[data-fly]").forEach(u=>u.addEventListener("click",()=>{o();try{const g=document.body.requestPointerLock?.();g&&typeof g.catch=="function"&&g.catch(()=>{})}catch{}n(u.dataset.fly)})),document.getElementById("resume-btn")?.addEventListener("click",()=>d(!1)),document.getElementById("pause-restart-btn")?.addEventListener("click",()=>{d(!1),document.dispatchEvent(new CustomEvent("flightsim-restart"))}),document.getElementById("pause-menu-btn")?.addEventListener("click",()=>{d(!1),r("home"),document.exitPointerLock?.()});const a=(u,g,S=Number)=>{const v=document.getElementById(u);if(!v)return;v.value=i[g],v.addEventListener("input",()=>{i[g]=S(v.value);const R=document.getElementById(u+"-val");R&&(R.textContent=v.value+(u==="set-wind"?" kt":u==="set-sens"?"×":""));try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}});const M=document.getElementById(u+"-val");M&&(M.textContent=v.value+(u==="set-wind"?" kt":u==="set-sens"?"×":""))};a("set-wind","windKt"),a("set-sens","sensitivity",Number);const c=document.getElementById("set-turb");c&&(c.value=String(i.turbulence),c.addEventListener("change",()=>{i.turbulence=Number(c.value);try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}));const l=document.getElementById("set-realism");l&&(l.checked=i.realism,l.addEventListener("change",()=>{i.realism=l.checked;try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}));const h=(u,g,S=v=>v)=>{const v=document.getElementById(u);v&&(v.value=String(i[g]),v.addEventListener("change",()=>{i[g]=S(v.value);try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}))};h("set-tod","startTOD"),h("set-daylen","dayLengthMin",Number),h("set-weather","weather",Number);let f=!1;function d(u){f=u,t.pause.classList.toggle("hidden",!u),u&&document.exitPointerLock?.()}function p(u){if(!u){t.instructor.classList.add("hidden");return}t.instructor.classList.remove("hidden"),t.instructor.innerHTML=u}document.getElementById("tut-next")?.addEventListener("click",()=>document.dispatchEvent(new CustomEvent("flightsim-tut-next"))),document.getElementById("tut-skip")?.addEventListener("click",()=>document.dispatchEvent(new CustomEvent("flightsim-tut-skip")));function m(u){t.help.classList.toggle("hidden",!u)}function _(){return!t.help.classList.contains("hidden")}return{settings:i,show:r,hide:o,setPaused:d,isPaused:()=>f,setInstructor:p,setHelpVisible:m,isHelpVisible:_,onFly:u=>n=u,onQuitToMenu:u=>s=u}}function cd(i,e=0){return Number(i).toFixed(e)}const jo={takeoff:{title:"Lesson 1 — Takeoff & Climb",steps:[{title:"Set flaps 10°",text:"Real takeoffs use a little flap for extra lift. Press <b>F</b> once (top-left shows FLAP 10°), then press <b>T</b> or click Next.",done:i=>i.advanced||i.flapDeg===10},{title:"Full power",text:"Hold <b>W</b> (or scroll up) until THR reads 100%. The engine needs a second to spool up — watch RPM rise. Keep rolling straight with <b>A / D</b> rudder.",done:i=>i.throttle>.95&&i.rpm>2200},{title:"Rotate at 55 kt",text:"Steer the centerline with rudder. At <b>55 kt (Vr)</b>, ease the mouse upward to lift the nose. Don’t yank — 5° pitch is plenty.",done:i=>!i.onGround&&i.aglFt>20},{title:"Climb at 74 kt (Vy)",text:"Lower the nose slightly and hold <b>74 kt</b> — best climb rate. Add a touch of right rudder: the propeller tries to yaw you left (P-factor). Climb to 500 ft AGL.",done:i=>i.aglFt>500},{title:"Clean up",text:"Above 500 ft: flaps up (<b>V</b> until FLAP 0° — check speed is below 85 kt first!) and ease power to ~75%. Trim with <b>X / Z</b> so she flies hands-off.",done:i=>i.advanced||i.flapDeg===0&&i.aglFt>600},{title:"Gentle turns",text:"Roll into a 20° bank with the mouse, then lead the rollout with opposite stick. Rudder into the turn (adverse yaw). Make one left and one right 90° turn.",done:i=>i.advanced||i.turnsDone>=2},{title:"Lesson complete 🎉",text:"You can take off, climb and turn. Press <b>T</b> to finish — try Lesson 2 (landing) from the menu, or keep free-flying!",done:i=>i.advanced}]},landing:{title:"Lesson 2 — Approach & Landing",steps:[{title:"You’re on final",text:"You’re 3 nm out, lined up with the runway at ~65 kt with full flaps. Your only job: keep the runway threshold steady in the windshield with small pitch/power corrections.",done:i=>i.advanced||i.aglFt<700},{title:"Stabilized: 65 kt, −500 fpm",text:"Aim for <b>65 kt (Vapp)</b> and about <b>−500 fpm</b>. Fast? Reduce power a touch. Slow? Add power — never pull up to stretch the glide (that’s how stalls happen).",done:i=>i.advanced||i.aglFt<400&&i.iasKt>55&&i.iasKt<80},{title:"Flare",text:"At ~30 ft, ease the mouse up to slow the descent — look at the far end of the runway, not the ground. Let the wheels kiss, nosewheel last.",done:i=>i.touchedDown},{title:"Rollout",text:"Power idle (<b>S</b> to 0%), rudder to stay centered, brakes (<b>B</b>) below 40 kt. Lesson complete when you stop on the runway! 🎉",done:i=>i.advanced||i.touchedDown&&i.iasKt<8}]}};function sS(){let i=null,e=0,t=0,n=0,s=0,r=null,o=!1,a=!1;document.addEventListener("flightsim-tut-next",()=>{a=!0}),document.addEventListener("flightsim-tut-skip",()=>{l()});function c(m){return i=jo[m]?m:null,e=0,t=0,n=0,s=0,r=null,o=!1,a=!1,i}function l(){i=null,e=0}function h(){return!!i}function f(m){if(m.hdgDeg==null||!m.airborne){r=m.hdgDeg;return}if(r==null){r=m.hdgDeg;return}let _=m.hdgDeg-r;_>180&&(_-=360),_<-180&&(_+=360),r=m.hdgDeg;const u=Math.sign(_);u!==0&&u!==n&&Math.abs(s)>60?(t++,s=0,n=u):u!==0&&n!==0&&u!==n?(s=_,n=u):(n===0&&u!==0&&(n=u),s+=_,Math.abs(s)>80&&(t++,s=0))}function d(m){if(!i)return null;m.touchedDown&&(o=!0),f({...m});const _=jo[i].steps,u={...m,turnsDone:t,touchedDown:o,advanced:a};if(_[e].done(u))if(a=!1,e<_.length-1)e++;else return{finished:!0,lesson:i,step:e,html:p(jo[i].title,e+1,_.length,"🎉 Lesson complete!","Head to the menu (Esc) for the next lesson, or press R and free-fly.")};const S=_[e];return{finished:!1,lesson:i,step:e,html:p(jo[i].title,e+1,_.length,S.title,S.text)}}function p(m,_,u,g,S){return`<b>${m} — step ${cd(_)}/${cd(u)}</b><br><br>✈️ <b>${g}</b><br>${S}<br><br><span style="opacity:.65">Press <b>T</b> to skip a step · <b>Esc</b> to exit lesson</span>`}return{start:c,stop:l,active:h,update:d}}const If=1024,Df=512,Qn="#e8ecf2",$i="#8a93a3",Ol="#ff4444",Sa="#39d353",rS="#ffb020";function oS(i){const e=document.createElement("canvas");e.width=If,e.height=Df;const t=e.getContext("2d"),n=new hn(e);n.anisotropy=4,n.colorSpace=cn;const s=new Qe,r=new X(new he(1.55,.72,.16),new Z({color:1711394,roughness:.85}));s.add(r);const o=new X(new Nt(1.5,.68),new mt({map:n}));o.position.z=.085,s.add(o);const a=new X(new he(1.6,.1,.42),new Z({color:1053205,roughness:1}));a.position.set(0,.4,.1),s.add(a);const c=new Qe,l=new X(new Ge(.035,.035,.5),new Z({color:546,roughness:.6}));l.rotation.x=1.1,l.position.set(0,-.18,.25);const h=new Qe,f=new X(new fh(.14,.025,8,24),new Z({color:1118740,roughness:.5})),d=new X(new he(.26,.04,.03),new Z({color:1118740,roughness:.5}));h.add(f,d),h.position.set(0,-.32,.42),c.add(l,h),s.add(c),i.add(s);let p=1;function m(u,g){h.rotation.z=-(u.rollIn||0)*1.1,h.position.y=-.32+(u.pitchIn||0)*.12,p+=g,!(p<.05)&&(p=0,ld(t,u),n.needsUpdate=!0)}ld(t,{}),n.needsUpdate=!0;function _(u){s.removeFromParent(),u.add(s)}return{update:m,mount:_}}const _s=(i,e,t,n)=>{i.beginPath(),i.arc(e,t,n,0,7)};function qs(i,e,t,n,s){_s(i,e,t,n),i.fillStyle="#0b0d11",i.fill(),_s(i,e,t,n),i.lineWidth=3,i.strokeStyle="#3a4150",i.stroke(),i.fillStyle=$i,i.font="bold 17px monospace",i.textAlign="center",i.fillText(s,e,t+n-12)}function Zo(i,e,t,n,s,r="#ff5b4d",o=4){const a=(s-90)*Math.PI/180;i.strokeStyle=r,i.lineWidth=o,i.lineCap="round",i.beginPath(),i.moveTo(e,t),i.lineTo(e+Math.cos(a)*n*.88,t+Math.sin(a)*n*.88),i.stroke(),_s(i,e,t,7),i.fillStyle="#22262e",i.fill()}function Ic(i,e,t,n,s,r,o,a,c){i.textAlign="center";for(let l=s;l<=r+1e-6;l+=a){const h=Bl(l,s,r),f=Math.abs((l-s)/o-Math.round((l-s)/o))<1e-6,d=n*(f?.78:.87),p=n*.95;i.strokeStyle=f?Qn:$i,i.lineWidth=f?3:1.5,i.beginPath(),i.moveTo(e+Math.cos(h)*d,t+Math.sin(h)*d),i.lineTo(e+Math.cos(h)*p,t+Math.sin(h)*p),i.stroke(),f&&c&&(i.fillStyle=Qn,i.font="bold 16px monospace",i.fillText(c(l),e+Math.cos(h)*n*.58,t+Math.sin(h)*n*.58+6))}}function Bl(i,e,t){return(-135+Math.max(0,Math.min(1,(i-e)/(t-e)))*270-90)*Math.PI/180}function ld(i,e){const t=e.iasKt||0,n=e.altFt||0,s=e.vsiFpm||0,r=e.hdgDeg||0,o=e.pitchDeg||0,a=e.rollDeg||0;i.fillStyle="#05070a",i.fillRect(0,0,If,Df),qs(i,105,120,92,"AIRSPEED KT"),Ic(i,105,120,92,0,160,20,10,p=>String(p)),hd(i,105,120,78,50,129,0,160,Sa),hd(i,105,120,78,129,160,0,160,rS),Zo(i,105,120,92,-135+Math.max(0,Math.min(1,t/160))*270),qs(i,315,120,92,"ATTITUDE"),i.save(),_s(i,315,120,84),i.clip(),i.translate(315,120),i.rotate(-a*Math.PI/180);const c=o*2.2;i.fillStyle="#2f6fd0",i.fillRect(-95,-95+c,190,95-c+95),i.fillStyle="#7a4a22",i.fillRect(-95,c,190,190),i.strokeStyle="#fff",i.lineWidth=2.5,i.beginPath(),i.moveTo(-95,c),i.lineTo(95,c),i.stroke(),i.fillStyle="#fff",i.font="bold 13px monospace",i.textAlign="center";for(let p=-20;p<=20;p+=10){if(!p)continue;const m=c-p*2.2;i.beginPath(),i.moveTo(-20,m),i.lineTo(20,m),i.stroke()}i.restore(),i.strokeStyle="#ffb020",i.lineWidth=5,i.beginPath(),i.moveTo(263,120),i.lineTo(301,120),i.lineTo(315,128),i.lineTo(329,120),i.lineTo(367,120),i.stroke(),qs(i,525,120,92,"ALT FT"),Ic(i,525,120,92,0,10,2,1,p=>String(p));const l=n%1e3/100;Zo(i,525,120,92,-135+l/10*270),Zo(i,525,120,55,-135+n/1e4%1*270,"#e8ecf2",6),i.fillStyle="#0b0d11",i.fillRect(485,168,80,26),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(485,168,80,26),i.fillStyle=Qn,i.font="bold 20px monospace",i.textAlign="center",i.fillText(String(Math.round(n)).padStart(5,"0"),525,189),qs(i,735,120,92,"TURN");const h=Math.max(-30,Math.min(30,a*.6));i.save(),i.translate(735,120),i.rotate(-h*Math.PI/180),i.fillStyle=Qn,i.fillRect(-46,-6,34,12),i.fillRect(12,-6,34,12),i.restore(),i.fillStyle=$i,i.font="bold 15px monospace",i.textAlign="center",i.fillText("L",677,124),i.fillText("R",793,124);const f=735+Math.max(-30,Math.min(30,-(e.betaDeg||0)*6));i.strokeStyle=$i,i.lineWidth=3,i.beginPath(),i.moveTo(701,168),i.lineTo(769,168),i.stroke(),_s(i,f,168,8),i.fillStyle="#111",i.fill(),_s(i,f,168,8),i.strokeStyle=Qn,i.lineWidth=2,i.stroke(),qs(i,920,120,92,"HEADING"),i.save(),_s(i,920,120,84),i.clip(),i.translate(920,120),i.rotate(r*Math.PI/180),i.fillStyle="#0b0d11",i.fillRect(-90,-90,180,180),i.textAlign="center";for(let p=0;p<360;p+=10){const m=p*Math.PI/180,_=p%30===0;if(i.strokeStyle=_?Qn:$i,i.lineWidth=_?3:1.5,i.beginPath(),i.moveTo(Math.sin(m)*66,-Math.cos(m)*66),i.lineTo(Math.sin(m)*80,-Math.cos(m)*80),i.stroke(),_){const u={0:"N",90:"E",180:"S",270:"W"};i.fillStyle=Qn,i.font="bold 17px monospace",i.fillText(u[p]??String(p/10),Math.sin(m)*48,-Math.cos(m)*48+6)}}i.restore(),i.fillStyle="#ffb020",i.fillRect(917,28,6,16),qs(i,105,356,92,"VSI FPM"),Ic(i,105,356,92,-2e3,2e3,1e3,500,p=>p===0?"0":String(Math.abs(p)/1e3)+""),Zo(i,105,356,92,-135+(Math.max(-2e3,Math.min(2e3,s))+2e3)/4e3*270),ud(i,235,320,200,"RPM",(e.rpm||0)/2700,String(Math.round(e.rpm||0))),ud(i,235,368,200,"THR",e.throttle||0,Math.round((e.throttle||0)*100)+"%"),Dc(i,480,320,"STALL",e.stalled?Ol:null),Dc(i,620,320,e.gearDown?"GEAR DN":"GEAR UP",e.gearDown?Sa:Ol),Dc(i,760,320,"FLAP "+(e.flapDeg??0),(e.flapDeg??0)>0?Qn:null),i.fillStyle=$i,i.font="bold 15px monospace",i.textAlign="center",i.fillText("TRIM",900,312),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(850,320,100,12);const d=850+((e.trim??0)*.5+.5)*100;i.fillStyle=Qn,i.fillRect(d-3,318,6,16),i.fillStyle=$i,i.font="15px monospace",i.textAlign="left",i.fillText("Vr55 Vy74 Vfe85 Vapp65 Vno129 Vne163",235,420),i.fillStyle="#5a6373",i.fillText("N172FS · SKYHAWK",235,445)}function hd(i,e,t,n,s,r,o,a,c){const l=Bl(s,o,a)+Math.PI/2,h=Bl(r,o,a)+Math.PI/2;i.strokeStyle=c,i.lineWidth=6,i.beginPath(),i.arc(e,t,n,l,h),i.stroke()}function ud(i,e,t,n,s,r,o){i.fillStyle=$i,i.font="bold 15px monospace",i.textAlign="left",i.fillText(s,e,t-6),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(e,t,n,16),i.fillStyle=r>.9?Ol:Sa,i.fillRect(e+2,t+2,(n-4)*Math.max(0,Math.min(1,r)),12),i.fillStyle=Qn,i.textAlign="right",i.fillText(o,e+n+62,t+14)}function Dc(i,e,t,n,s){i.fillStyle=s?"#2a0d0d":"#0b0d11",s===Sa&&(i.fillStyle="#0d2a14"),s===Qn&&(i.fillStyle="#1a2030"),dd(i,e-62,t-20,124,40,6),i.fill(),i.strokeStyle=s||"#2a3040",i.lineWidth=2,dd(i,e-62,t-20,124,40,6),i.stroke(),i.fillStyle=s||"#3a4150",i.font="bold 18px monospace",i.textAlign="center",i.fillText(n,e,t+6)}function dd(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}const fd={dawn:6.4,morning:9.5,noon:13,dusk:17.4,night:23.5},aS=new ze(10336470),cS=new ze(329742),lS=new ze(16773853),hS=new ze(16751181),uS=new ze(9087231);function dS(i,e,t){const n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)}function fS(i,e,t,n,s,r,o,a=[]){const l=new Float32Array(2700);for(let w=0;w<900;w++){const b=Math.random()*Math.PI*2,T=Math.asin(Math.random()*.98+.02),F=6e4;l[w*3]=Math.cos(b)*Math.cos(T)*F,l[w*3+1]=Math.sin(T)*F,l[w*3+2]=Math.sin(b)*Math.cos(T)*F}const h=new Bt;h.setAttribute("position",new jt(l,3));const f=new La({color:13621503,size:2.4,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1}),d=new ch(h,f);d.frustumCulled=!1,i.add(d);const p=new N(0,1,0),m=new N(0,1,0);let _=fd[o.startTOD]??10,u=1;const g=new ze,S=new ze;function v(w){const b=Math.max(2,o.dayLengthMin||12);_=(_+w*24/(b*60))%24;const T=(_-6)/12*Math.PI,F=Math.sin(T);p.set(Math.cos(T),Math.max(-.3,F),.35).normalize(),s.sunPosition.value.copy(p),u=dS(-.06,.14,F);const x=Math.max(0,1-Math.abs(F)*4);m.set(-p.x,Math.abs(p.y)+.45,-p.z).normalize();const y=F>-.02?p:m;t.userData.dir=y,t.intensity=F>-.02?.15+u*2.45:.22,F>-.02?S.copy(lS).lerp(hS,Math.min(1,x*1.4)):S.copy(uS),t.color.copy(S),n.intensity=.07+u*.68,g.copy(cS).lerp(aS,u),i.fog.color.copy(g);const D=o.weather||0;i.fog.near=D===2?400:D===1?900:2500,i.fog.far=D===2?9e3:D===1?17e3:3e4,e.toneMappingExposure=.55+u*.2,f.opacity=1-u;const L=u<.4;for(const I of r)I.visible=L;for(const I of a)I.emissiveIntensity=L?1.2:0}const M=()=>String(Math.floor(_)).padStart(2,"0"),R=()=>String(Math.floor(_%1*60)).padStart(2,"0");return{update:v,sunDir:p,reset:()=>{_=fd[o.startTOD]??10},isNight:()=>u<.45,clock:()=>`${M()}:${R()}`,icon:()=>u<.45?"🌙":u<.75?"🌅":"☀"}}function pd(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function pS(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d");return e.fillStyle="#9cf",e.font="bold 44px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText("Z",32,34),new hn(i)}function mS(i){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");t.clearRect(0,0,64,64);const n=32;if(i===3)t.fillStyle="#141414",t.fillRect(14,22,16,10),t.fillRect(34,22,16,10),t.fillRect(28,24,8,4);else{t.fillStyle="#1a1a1a";const r=i===1?3:0;t.beginPath(),t.arc(24-r,26,3.2,0,7),t.fill(),t.beginPath(),t.arc(40+r,26,3.2,0,7),t.fill(),t.fillRect(19-r,18,10,2.5),t.fillRect(35+r,18,10,2.5)}return t.strokeStyle="#5a2e22",t.lineWidth=2.5,t.beginPath(),i===2?t.arc(n,44,6,Math.PI*1.15,Math.PI*1.85):t.arc(n,40,6,Math.PI*.15,Math.PI*.85),t.stroke(),i===1&&(t.fillStyle="rgba(230,120,120,.6)",t.beginPath(),t.arc(18,36,4,0,7),t.fill(),t.beginPath(),t.arc(46,36,4,0,7),t.fill()),new hn(e)}const Nc=[];function gS(i){return Nc[i]||(Nc[i]=new mt({map:mS(i),transparent:!0})),Nc[i]}const md=[15251850,1578e4,13208922,9067066,5913126],gd=[3828418,12728890,3843669,14203194,9063874,5096130,14711354,15263976,2764083,12745392],_d=[2764083,3824266,9075290,5921370,4877114,8010298],xd=[1710618,4861466,9071162,12105912,8007214],Uc={};function yn(i,e){return Uc[i]||(Uc[i]=e()),Uc[i]}const Fc=new Map;function Ks(i,e=.9){const t=i+":"+e;return Fc.has(t)||Fc.set(t,new Z({color:i,roughness:e})),Fc.get(t)}function wa(i={}){const e=i.rand||Math.random,t=i.gender?i.gender==="female":e()<.45,n=i.shirt??gd[Math.floor(e()*gd.length)],s=i.pants??_d[Math.floor(e()*_d.length)],r=i.skin??md[Math.floor(e()*md.length)],o=i.cap??null,a=new Qe,c=new Qe;a.add(c);const l=i.unique?new Z({color:n,roughness:.9}):Ks(n),h=i.unique?new Z({color:s,roughness:.9}):Ks(s),f=i.unique?new Z({color:r,roughness:.8}):Ks(r,.8),d=(O,J)=>{const j=new X(O,J);return j.castShadow=!0,c.add(j),j},p=.95,m=t?.1:.11,_=yn("leg",()=>{const O=new Ge(.085,.06,.85,8);return O.translate(0,-.425,0),O}),u=d(_,h);u.position.set(-m,p,0);const g=d(_,h);g.position.set(m,p,0);const S=yn("shoe",()=>new he(.13,.1,.3)),v=Ks(1842208,.7);for(const O of[u,g]){const J=new X(S,v);J.position.set(0,-.8,.06),J.castShadow=!0,O.add(J)}if(t&&(i.skirt??e()<.5)){const O=d(yn("skirt",()=>new Ge(.17,.24,.42,10)),h);O.position.y=.78}const M=yn(t?"torsoF":"torsoM",()=>t?new Ge(.165,.15,.62,10):new Ge(.2,.15,.62,10)),R=d(M,l);R.position.y=1.28;const w=d(yn("collar",()=>new Ge(.09,.12,.1,8)),l);w.position.y=1.6;const b=yn("arm",()=>{const O=new Ge(.055,.045,.62,8);return O.translate(0,-.31,0),O}),T=yn("hand",()=>new Dn(.06,8,6)),F=t?.23:.27,x=d(b,l);x.position.set(-F,1.53,0);const y=d(b,l);y.position.set(F,1.53,0);for(const O of[x,y]){const J=new X(T,f);J.position.y=-.62,J.castShadow=!0,O.add(J)}const D=d(yn("neck",()=>new Ge(.05,.055,.12,8)),f);D.position.y=1.64;const L=d(yn("head",()=>new Dn(.135,14,10)),f);L.position.y=1.8;const I=new X(new Nt(.19,.19),gS(Math.floor(e()*4)));I.position.set(0,1.8,.125),c.add(I);let B=null;const U=xd[Math.floor(e()*xd.length)];if(o!=null){B=i.unique?new Z({color:o,roughness:.8}):Ks(o,.8);const O=d(yn("cap",()=>new Ge(.125,.15,.12,10)),B);O.position.y=1.9,d(yn("brim",()=>new he(.2,.03,.16)),B).position.set(0,1.86,.16)}else{const O=i.hair??(t&&e()<.55?"long":["short","short","afro","bald"][Math.floor(e()*4)]),J=Ks(U,1);if(O==="long")d(yn("mane",()=>new he(.2,.42,.1)),J).position.set(0,1.62,-.11);else if(O==="afro"){const j=d(yn("afro",()=>new Dn(.165,10,8)),J);j.position.y=1.83}else if(O!=="bald"){const j=d(yn("top",()=>new Dn(.14,10,8)),J);j.scale.y=.55,j.position.y=1.86}}a.scale.setScalar(.93+e()*.12);let G=null;return{group:a,rig:c,armL:x,armR:y,legL:u,legR:g,head:L,body:R,mats:{shirt:l,pants:h,skin:f,cap:B},walkPhase:Math.random()*7,zzz(){return G||(G=new kt(new Ft({map:pS(),transparent:!0,depthWrite:!1})),G.scale.set(.8,.8,1),a.add(G)),G.visible=!0,G},hideZzz(){G&&(G.visible=!1)}}}function vd(i,e,t,n,s=6){let o=Math.atan2(e-i.position.x,t-i.position.z)-i.rotation.y;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;return i.rotation.y+=Math.max(-s*n,Math.min(s*n,o)),Math.abs(o)<.2}function _S(i,e){const t=pd(99),n=[],s=(d,p,m,_)=>{const u=pd(_);for(let g=0;g<m;g++){const S=wa({rand:u,cap:u()<.35?3355443:null}),v=d+(u()-.5)*160,M=p+(u()-.5)*160,R=[];for(let w=0;w<5;w++)R.push({x:d+(u()-.5)*260,z:p+(u()-.5)*260});i.add(S.group),n.push({p:S,home:{x:v,z:M},wps:R,wpi:Math.floor(u()*5),idleT:0,sleeping:!1})}};s(-330,860,7,7),s(8500,7500,4,42),s(-7e3,1500,5,5),s(-1200,-5300,2,6),s(2620,2080,2,7);const r=wa({shirt:14182942,pants:3357252,cap:14182942,gender:"female",hair:"long"});i.add(r.group);const o=[],a=[12728890,3828418,14721056];(e||[]).forEach((d,p)=>{if(!d.length)return;const m=new Qe,_=new Z({color:a[p%3],roughness:.4,metalness:.3}),u=new Z({color:1053980,roughness:.1,metalness:.8}),g=new X(new he(2,.9,4.2),_);g.position.y=.85,g.castShadow=!0;const S=new X(new he(1.7,.7,2.2),u);S.position.set(0,1.5,-.2),S.castShadow=!0,m.add(g,S);const v=[],M=new Ge(.42,.42,.35,12),R=new Z({color:1315860,roughness:.9});for(const[w,b]of[[-.95,1.4],[.95,1.4],[-.95,-1.4],[.95,-1.4]]){const T=new X(M,R);T.rotation.z=Math.PI/2,T.position.set(w,.42,b),m.add(T),v.push(T)}i.add(m),o.push({g:m,wheels:v,loop:d,seg:Math.floor(t()*d.length),speed:8+t()*3})});function c(d,p,m,_){for(const u of n){const{p:g}=u,S=g.group.position.x,v=g.group.position.z;if(m){const M=u.home.x-S,R=u.home.z-v;if(Math.hypot(M,R)>3?(l(g,u.home.x,u.home.z,d,1.6),u.sleeping=!1,g.hideZzz()):u.sleeping||(u.sleeping=!0),u.sleeping){const w=Be(S,v);g.group.position.y+=(w+.3-g.group.position.y)*Math.min(1,3*d),g.rig.rotation.x+=(-Math.PI/2-g.rig.rotation.x)*Math.min(1,3*d),g.zzz().position.set(.5,1.2+Math.sin(p*2)*.15,0)}continue}if(u.sleeping=!1,g.hideZzz(),g.rig.rotation.x+=(0-g.rig.rotation.x)*Math.min(1,5*d),u.idleT>0)u.idleT-=d,h(g,p);else{const M=u.wps[u.wpi];l(g,M.x,M.z,d,1.5)&&(u.wpi=(u.wpi+1)%u.wps.length,u.idleT=2+Math.random()*5)}}{const u=Be(Ki.x,Ki.z);r.group.position.set(Ki.x,u,Ki.z),(_?Math.hypot(_.x-Ki.x,_.z-Ki.z):99)<12?(vd(r.group,_.x,_.z,d,8),r.armR.rotation.x=-2.4+Math.sin(p*7)*.45,r.armL.rotation.x=Math.sin(p*1.7)*.06):(r.group.rotation.y+=d*.15,h(r,p))}for(const u of o){if(u.taken)continue;if(m){const T=u.loop[0];u.g.position.set(T.x,Be(T.x,T.z)+.15,T.z);continue}const g=u.loop[u.seg%u.loop.length],S=u.loop[(u.seg+1)%u.loop.length],v=S.x-u.g.position.x,M=S.z-u.g.position.z,R=Math.hypot(v,M);if(R<4){u.seg=(u.seg+1)%u.loop.length;continue}u.g.position.lengthSq()===0&&u.g.position.set(g.x,0,g.z);const w=v/R,b=M/R;u.g.position.x+=w*u.speed*d,u.g.position.z+=b*u.speed*d,u.g.position.y=Be(u.g.position.x,u.g.position.z)+.15,u.g.rotation.y=Math.atan2(w,b);for(const T of u.wheels)T.rotation.x+=u.speed*d/.42}}function l(d,p,m,_,u){const g=vd(d.group,p,m,_),S=p-d.group.position.x,v=m-d.group.position.z,M=Math.hypot(S,v),R=g&&M>2;R&&(d.group.position.x+=S/M*u*_,d.group.position.z+=v/M*u*_);const w=Be(d.group.position.x,d.group.position.z);d.group.position.y+=((w<1?1:w)-d.group.position.y)*Math.min(1,5*_),d.walkPhase+=_*(R?u*3.4:1.2);const b=R?.55:.05;return d.legL.rotation.x=Math.sin(d.walkPhase)*b,d.legR.rotation.x=-Math.sin(d.walkPhase)*b,d.armL.rotation.x=-Math.sin(d.walkPhase)*b*.8,d.armR.rotation.x=Math.sin(d.walkPhase)*b*.8,d.rig.position.y=R?Math.abs(Math.sin(d.walkPhase))*.05:0,M<2.5}function h(d,p){d.legL.rotation.x*=.9,d.legR.rotation.x*=.9,d.armL.rotation.x=Math.sin(p*1.7)*.06,!(d.armR.rotation.x<-1)&&(d.armR.rotation.x=Math.sin(p*1.7+1)*.06,d.rig.position.y=Math.sin(p*2.2)*.015)}function f(d,p,m=7){let _=null,u=m;for(const g of o){if(g.taken)continue;const S=Math.hypot(g.g.position.x-d,g.g.position.z-p);S<u&&(u=S,_=g)}return _}return{update:c,marta:r,cars:o,nearestCar:f,townsfolk:n}}function xS(i,e){const t=wa({shirt:3037756,pants:2764083,cap:15658734,unique:!0});t.group.visible=!1,i.add(t.group);const n=new N;let s=0,r=-.18;const o=new Set;addEventListener("keydown",_=>o.add(_.code)),addEventListener("keyup",_=>o.delete(_.code)),document.addEventListener("mousemove",_=>{document.pointerLockElement!==document.body||!t.group.visible||(s-=_.movementX*.0026,r=Math.max(-.9,Math.min(.45,r-_.movementY*.0022)))});function a(_,u,g,S){n.set(_,u,g),s=S,t.group.visible=!0,d()}function c(){t.group.visible=!1,o.clear()}function l(){return t.group.visible}function h(_,u){s-=_*.0026,r=Math.max(-.9,Math.min(.45,r-u*.0022))}function f(_={}){_.shirt!=null&&t.mats.shirt.color.setHex(_.shirt),_.pants!=null&&t.mats.pants.color.setHex(_.pants),_.cap!=null&&t.mats.cap&&t.mats.cap.color.setHex(_.cap)}function d(_){t.group.position.copy(n),t.group.rotation.y=s+Math.PI}const p=new N;function m(_){if(!t.group.visible)return;const u=(o.has("KeyW")?1:0)-(o.has("KeyS")?1:0),g=(o.has("KeyD")?1:0)-(o.has("KeyA")?1:0),v=o.has("ShiftLeft")||o.has("ShiftRight")?7:4,M=u!==0||g!==0;if(M){const D=Math.sin(s),L=Math.cos(s),I=-D,B=-L,U=L,G=-D;n.x+=(I*u+U*g)*v*_,n.z+=(B*u+G*g)*v*_;const O=I*u+U*g,J=B*u+G*g;let ce=Math.atan2(O,J)-t.group.rotation.y;for(;ce>Math.PI;)ce-=Math.PI*2;for(;ce<-Math.PI;)ce+=Math.PI*2;t.group.rotation.y+=ce*Math.min(1,12*_)}const R=Be(n.x,n.z);n.y+=((R<.5?.5:R)-n.y)*Math.min(1,12*_),t.group.position.copy(n),t.walkPhase+=_*(M?v*2.4:1.2);const w=M?.6:.04;t.legL.rotation.x=Math.sin(t.walkPhase)*w,t.legR.rotation.x=-Math.sin(t.walkPhase)*w,t.armL.rotation.x=-Math.sin(t.walkPhase)*w*.8,t.armR.rotation.x=Math.sin(t.walkPhase)*w*.8,t.rig.position.y=M?Math.abs(Math.sin(t.walkPhase))*.06:Math.sin(t.walkPhase*.4)*.015;const b=5.2,T=2.1,F=n.x+Math.sin(s)*Math.cos(r)*b,x=n.z+Math.cos(s)*Math.cos(r)*b,y=Math.max(n.y+1.5+Math.sin(-r)*b*.9,Be(F,x)+.5);e.position.set(F,y,x),p.set(n.x-F,0,n.z-x),e.lookAt(n.x,n.y+T,n.z)}return{place:a,hide:c,active:l,addLook:h,setOutfit:f,update:m,pos:n,keys:o}}const vS=["marta-hi","marta-job","marta-nice","marta-bye","marta-cash","les-rotate","les-climb","les-flaps","les-final","les-flare","les-stall","atc-takeoff","atc-land","atc-wind","atc-grease","atc-taxi","tower-hello","folk-hi1","folk-hi2","folk-hi3","folk-hi4","shop-hi"];function yS(){try{return localStorage.getItem("flightsim-muted")==="1"}catch{return!1}}const ln={muted:yS(),_last:{},_ok:{},toggle(){this.muted=!this.muted;try{localStorage.setItem("flightsim-muted",this.muted?"1":"0")}catch{}return this.muted},play(i,e=0){if(this.muted||!vS.includes(i))return!1;const t=performance.now()/1e3;if(e>0&&t-(this._last[i]||-1e9)<e)return!1;this._last[i]=t;try{const n=new Audio(`audio/${i}.mp3`);return n.volume=.9,n.play().catch(()=>{}),!0}catch{return!1}},playRandom(i,e=20){if(this.muted||!i.length)return!1;const t=performance.now()/1e3;return t-(this._last._rand||-1e9)<e?!1:(this._last._rand=t,this.play(i[Math.floor(Math.random()*i.length)]))}};function Ri(i,e){try{return JSON.parse(localStorage.getItem(i))??e}catch{return e}}function Jn(i,e){try{localStorage.setItem(i,JSON.stringify(e))}catch{}}const ke={money:Ri("flightsim-money",100),items:new Set(Ri("flightsim-items",[])),paints:Ri("flightsim-paints",{}),aircraft:new Set(Ri("flightsim-aircraft",["skyhawk"])),selected:Ri("flightsim-selected","skyhawk"),outfits:new Set(Ri("flightsim-outfits",["aviator"])),outfit:Ri("flightsim-outfit","aviator"),add(i){this.money+=i,Jn("flightsim-money",this.money)},spend(i){return this.money<i?!1:(this.money-=i,Jn("flightsim-money",this.money),!0)},has(i){return this.items.has(i)},give(i){this.items.add(i),Jn("flightsim-items",[...this.items])},take(i){this.items.delete(i),Jn("flightsim-items",[...this.items])},setPaint(i,e){this.paints[i]=e,Jn("flightsim-paints",this.paints)},paintFor(i){return this.paints[i]||null},ownAircraft(i){this.aircraft.add(i),Jn("flightsim-aircraft",[...this.aircraft])},selectAircraft(i){this.selected=i,Jn("flightsim-selected",i)},wearOutfit(i){this.outfit=i,Jn("flightsim-outfit",i)},ownOutfit(i){this.outfits.add(i),Jn("flightsim-outfits",[...this.outfits])}},ws=[{id:"skyhawk",name:"✈️ Skyhawk 172",price:0,desc:"Trusty trainer. Balanced, forgiving, yours.",specs:{},look:{wing:"high",tires:"std",body:16054008,accent:11737883,reg:"N172FS"}},{id:"duster",name:"🌾 CropHopper Duster",price:1500,desc:"Light low-wing workhorse. Leaps off short strips, cruises slow.",specs:{mass:720,wingArea:14,thrustMax:4300,CD0:.042,CLflap:.7,Vr:22},look:{wing:"low",tires:"std",hopper:!0,body:15913276,accent:2783786,reg:"N-DUST"}},{id:"falcon",name:"🚀 Falcon S Sport",price:3500,desc:"Fast and twitchy low-wing rocket. Not for beginners.",specs:{mass:800,wingArea:12,thrustMax:7800,CD0:.026,CL0:.2,Vr:30},look:{wing:"low",tires:"std",canopy:!0,body:14212320,accent:12720923,reg:"N-FAST"}},{id:"bush",name:"🏔️ Tundra King",price:2500,desc:"Big tires, huge flaps. Grass strips fear it.",specs:{mass:950,wingArea:17.5,CLflap:.75,CDflap:.11,thrustMax:5600,Vr:20,gearHeight:1.25},look:{wing:"high",tires:"tundra",body:3828538,accent:2236962,reg:"N-BUSH"}}],Nf=[{id:"aviator",name:"🧥 Aviator Jacket",price:0,colors:{shirt:3037756,pants:2764083,cap:15658734}},{id:"hawaiian",name:"🌺 Hawaiian Shirt",price:75,colors:{shirt:2005642,pants:12759680,cap:14201434}},{id:"parka",name:"🧣 Alpine Parka",price:120,colors:{shirt:14711328,pants:2767450,cap:12724778}},{id:"tux",name:"🤵 Tuxedo",price:200,colors:{shirt:1315860,pants:1315860,cap:1315860}},{id:"captain",name:"🧑‍✈️ Captain",price:350,colors:{shirt:1714778,pants:15263976,cap:16777215}}];function MS(){return{liftMul:ke.has("stol")?1.12:1,critBonus:ke.has("vg")?2*Math.PI/180:0,powerMul:ke.has("turbo")?1.12:1,rollDecel:ke.has("tundra")?.12:.3}}const zl=[{id:"binoculars",name:"🔭 Binoculars",price:150,desc:"Hold RIGHT MOUSE to zoom in flight."},{id:"paint-blue",name:"🎨 Ocean Blue paint",price:100,paint:2777026,desc:"Repaint your current plane."},{id:"paint-orange",name:"🎨 Sunset Orange paint",price:100,paint:14711328,desc:"Repaint your current plane."},{id:"paint-black",name:"🎨 Stealth Black paint",price:250,paint:2303531,desc:"Repaint your current plane. Spooky."},{id:"vg",name:"🌀 Vortex Generators",price:350,desc:"+2° stall angle. Forgiving wings."},{id:"stol",name:"🛬 STOL Kit",price:600,desc:"+12% lift. Short strips love it."},{id:"turbo",name:"⚡ Turbocharger",price:800,desc:"+12% engine power."},{id:"tundra",name:"🛞 Tundra Tires",price:250,desc:"Grass strips feel like pavement."},{id:"chute2",name:"🪂 Cruiser Canopy",price:400,desc:"Faster canopy: 14 m/s forward flight. (Chutes are free — this is an upgrade.)"},{id:"chute3",name:"🪂🪂 Speedster Canopy",price:900,desc:"Race canopy: 20 m/s forward, sporty sink. Needs Cruiser."},{id:"spotlight",name:"💡 Landing Light Pro",price:200,desc:"A real spotlight for night ops."}];function Uf(){return ke.has("chute3")?3:ke.has("chute2")?2:1}function SS(i={}){const{onPaint:e=()=>{},onAircraft:t=()=>{},onOutfit:n=()=>{}}=i,s=document.getElementById("shop"),r=document.getElementById("shop-items"),o=document.getElementById("shop-money");let a=!1;document.getElementById("shop-close")?.addEventListener("click",()=>p());const c=(m,_,u)=>{const g=document.createElement("button");return g.className="btn",g.textContent=m,g.disabled=!!_,_||(g.onclick=u),g},l=(m,_,u)=>{const g=document.createElement("div");g.className="shop-row",g.innerHTML=`<div><b>${m}</b><br><small>${_}</small></div>`,g.appendChild(u),r.appendChild(g)},h=m=>{const _=document.createElement("div");_.className="shop-sec",_.textContent=m,r.appendChild(_)};function f(){o.textContent="$"+ke.money,r.innerHTML="",h("✈️ AIRCRAFT — buying or selecting swaps your plane instantly");for(const m of ws){const _=ke.aircraft.has(m.id),u=ke.selected===m.id,g=u?' <span class="vtag">FLYING</span>':"";_?l(m.name+g,m.desc,c(u?"FLYING":"SELECT",u,()=>{t(m.id),f()})):l(m.name+g,`${m.desc} — <b>$${m.price}</b>`,c(`BUY $${m.price}`,ke.money<m.price,()=>{ke.spend(m.price)&&(ke.ownAircraft(m.id),t(m.id),f())}))}h("🔧 UPGRADES — apply to every plane you own");for(const m of zl.filter(_=>!_.paint)){const _=ke.has(m.id),u=m.id==="chute3"&&!ke.has("chute2");_&&!m.consumable?l(`${m.name} <span class="vtag">OWNED</span>`,m.desc,c("OWNED",!0)):u?l(m.name,`${m.desc} — <b>$${m.price}</b>`,c("NEEDS CRUISER",!0)):l(m.name,`${m.desc} — <b>$${m.price}</b>`,c(`BUY $${m.price}`,ke.money<m.price,()=>{ke.spend(m.price)&&(ke.give(m.id),f())}))}h(`🎨 PAINT — for your ${ws.find(m=>m.id===ke.selected)?.name||"plane"}`);for(const m of zl.filter(_=>_.paint)){const _=ke.has(m.id),u=ke.paintFor(ke.selected)===m.id;_?l(`${m.name}${u?' <span class="vtag">APPLIED</span>':""}`,m.desc,c(u?"ON":"APPLY",u,()=>{ke.setPaint(ke.selected,m.id),e(m.paint),f()})):l(m.name,`${m.desc} — <b>$${m.price}</b>`,c(`BUY $${m.price}`,ke.money<m.price,()=>{ke.spend(m.price)&&(ke.give(m.id),ke.setPaint(ke.selected,m.id),e(m.paint),f())}))}h("👕 PILOT OUTFITS — look sharp on foot");for(const m of Nf){const _=ke.outfits.has(m.id),u=ke.outfit===m.id;_?l(`${m.name}${u?' <span class="vtag">WORN</span>':""}`,"In your closet",c(u?"WORN":"WEAR",u,()=>{ke.wearOutfit(m.id),n(m.colors),f()})):l(m.name,`Strut around town — <b>$${m.price}</b>`,c(`BUY $${m.price}`,ke.money<m.price,()=>{ke.spend(m.price)&&(ke.ownOutfit(m.id),ke.wearOutfit(m.id),n(m.colors),f())}))}}function d(m){if(a=!0,document.exitPointerLock?.(),m){const _=document.getElementById("shop-title");_&&(_.textContent=m)}s.classList.remove("hidden"),ke.money<150?ln.play("marta-job"):ln.play("shop-hi"),f()}function p(){a=!1,s.classList.add("hidden")}return{open:d,close:p,isOpen:()=>a,refresh:f}}const kl=[{id:"marta",name:"Say hello to Marta",hint:"Walk up to Marta by the hangars (E to talk)",reward:50},{id:"takeoff",name:"First Solo",hint:"Take off from any runway",reward:200},{id:"clouds",name:"Cloud Surfer",hint:"Climb above 3,000 ft",reward:150},{id:"coral",name:"Coral Hopper",hint:"Land on the Coral Strip (SE island)",reward:400},{id:"sights",name:"Sightseer",hint:"Discover 3 sights (follow blue beacons)",reward:300},{id:"grease",name:"Greaser",hint:"Land softer than 150 fpm",reward:350,item:"chute2"},{id:"night",name:"Night Owl",hint:"Be airborne at night",reward:250},{id:"tour",name:"Three-Strip Tour",hint:"Land at all 3 airstrips",reward:800},{id:"balloon",name:"Balloon Chaser",hint:"Fly within 600 ft of a hot-air balloon",reward:300},{id:"far",name:"Long Haul",hint:"Fly 15 km from the home airport",reward:350},{id:"buzz",name:"Rooftop Buzz",hint:"Skim Harborview below 300 ft",reward:250},{id:"nightlanding",name:"Night Landing",hint:"Land after dark",reward:450},{id:"northstrip",name:"Mountain Goat",hint:"Land the lonely North Strip",reward:500},{id:"sights6",name:"Globetrotter",hint:"Discover 6 sights",reward:600},{id:"aerobat",name:"Aerobat",hint:"Bank past 60° in flight",reward:200},{id:"speed",name:"Speed Demon",hint:"Top 140 kt",reward:200},{id:"storm",name:"Storm Chaser",hint:"Fly in storm weather",reward:350},{id:"cartographer",name:"Cartographer",hint:"Discover 10 sights",reward:700},{id:"driver",name:"Sunday Driver",hint:"Drive 1 km around town",reward:250},{id:"dive",name:"Geronimo",hint:"Skydive out and walk away (J)",reward:400}];function wS(){const i=new Set(Ri("flightsim-quests",[])),e=new Set(Ri("flightsim-strips",[])),t=Object.fromEntries(kl.map(a=>[a.id,a]));let n=()=>{};function s(a){!a||i.has(a.id)||(i.add(a.id),Jn("flightsim-quests",[...i]),ke.add(a.reward),a.item&&!ke.has(a.item)&&ke.give(a.item),n(a))}function r(a,c={}){a==="marta"&&s(t.marta),a==="takeoff"&&s(t.takeoff),a==="alt"&&c.ft>3e3&&s(t.clouds),a==="touchdown"&&c.strip==="coral"&&s(t.coral),a==="sights"&&c.n>=3&&s(t.sights),a==="sights"&&c.n>=6&&s(t.sights6),a==="sights"&&c.n>=10&&s(t.cartographer),a==="balloon"&&s(t.balloon),a==="far"&&s(t.far),a==="buzz"&&s(t.buzz),a==="nightlanding"&&s(t.nightlanding),a==="northstrip"&&s(t.northstrip),a==="aerobat"&&s(t.aerobat),a==="speed"&&s(t.speed),a==="storm"&&s(t.storm),a==="driver"&&s(t.driver),a==="dive"&&s(t.dive),a==="touchdown"&&c.fpm!=null&&-c.fpm<150&&c.airborne&&s(t.grease),a==="nightair"&&s(t.night),a==="touchdown"&&c.strip&&(e.add(c.strip),Jn("flightsim-strips",[...e]),e.has("main")&&e.has("coral")&&e.has("north")&&s(t.tour))}function o(){return kl.find(a=>!i.has(a.id))}return{done:i,notify:r,next:o,onComplete:a=>n=a,strips:e}}function ES(i){const e=document.getElementById("dialogue");let t=!1;document.getElementById("dlg-close")?.addEventListener("click",()=>s());function n(){t=!0,document.exitPointerLock?.(),i.notify("marta"),ln.play(i.done.size>3?"marta-nice":"marta-hi");const r=i.next();document.getElementById("dlg-quests").innerHTML=kl.map(o=>`<div class="qrow ${i.done.has(o.id)?"qdone":""}">${i.done.has(o.id)?"✅":"◈"} <b>${o.name}</b> — $${o.reward}${o.item?" + 🎁":""}<br><small>${o.hint}</small></div>`).join(""),document.getElementById("dlg-next").innerHTML=r?`Next up: <b>${r.name}</b> — ${r.hint}`:"You're done, ace! All quests complete. 🏆",e.classList.remove("hidden")}function s(){t=!1,e.classList.add("hidden")}return{open:n,close:()=>{s(),ln.play("marta-bye",30)},isOpen:()=>t}}function bS(i){const e=document.getElementById("quest-tracker");e&&(i?(e.classList.remove("hidden"),e.innerHTML=i):e.classList.add("hidden"))}const Wi=18500,Xi=150;function TS(i){return i<.5?[16,60,110]:i<2.5?[118,110,80]:i<45?[46,80,40]:i<150?[30,58,32]:i<260?[74,70,62]:[150,150,155]}function AS(){const i=document.createElement("div");i.id="minimap";const e=document.createElement("canvas");e.width=e.height=180,i.appendChild(e),document.body.appendChild(i);const t=e.getContext("2d"),n=document.createElement("canvas");n.width=n.height=Xi;const s=n.getContext("2d"),r=s.createImageData(Xi,Xi);for(let d=0;d<Xi;d++)for(let p=0;p<Xi;p++){const m=(p+.5)/Xi*2*Wi-Wi,_=(d+.5)/Xi*2*Wi-Wi,[u,g,S]=TS(Be(m,_)),v=(d*Xi+p)*4;r.data[v]=u,r.data[v+1]=g,r.data[v+2]=S,r.data[v+3]=255}s.putImageData(r,0,0);let o=!1,a=!1;i.addEventListener("click",()=>{o=!o,i.classList.toggle("big",o),e.width=e.height=o?300:180});const c=(d,p,m)=>[(d+Wi)/(2*Wi)*m,(p+Wi)/(2*Wi)*m];let l=1;function h(d,p){if(l+=p,l<.12||a)return;l=0;const m=e.width;t.clearRect(0,0,m,m),t.save(),t.beginPath(),t.arc(m/2,m/2,m/2,0,7),t.clip(),t.drawImage(n,0,0,m,m),t.strokeStyle="#fff",t.lineWidth=o?3:2;const _=(v,M,R,w)=>{const[b,T]=c(v,M-R,m),[F,x]=c(v,M+R,m);t.beginPath(),t.moveTo(b,T),t.lineTo(F,x),t.stroke()};_(0,0,_t.halfLen),_(Ut.x,Ut.z,Ut.halfLen),_(Yt.x,Yt.z,Yt.halfLen),t.fillStyle="#4dff88",t.font=`bold ${o?13:10}px monospace`,t.textAlign="center";for(const v of Tf){const[M,R]=c(v.x,v.z,m);t.fillText("$",M,R+(o?4:3))}ss.forEach((v,M)=>{const[R,w]=c(v.x,v.z,m),b=d.sightsFound&&d.sightsFound.has(M);t.fillStyle=b?"rgba(160,170,190,.7)":"#ffcf4d",t.beginPath(),t.arc(R,w,o?5:3.5,0,7),t.fill(),b||(t.strokeStyle="rgba(255,207,77,.5)",t.beginPath(),t.arc(R,w,o?9:6.5,0,7),t.stroke())});const[u,g]=c(d.x,d.z,m);t.save(),t.translate(u,g),t.rotate((d.hdgDeg||0)*Math.PI/180),t.fillStyle=d.onFoot?"#7dff9a":"#fff",t.strokeStyle="#000",t.lineWidth=2;const S=o?11:8;t.beginPath(),t.moveTo(0,-S),t.lineTo(S*.7,S*.8),t.lineTo(0,S*.35),t.lineTo(-S*.7,S*.8),t.closePath(),t.fill(),t.stroke(),t.restore(),t.fillStyle="#fff",t.font=`bold ${o?16:12}px monospace`,t.textAlign="center",t.fillText("N",m/2,o?18:14),t.restore(),t.strokeStyle="rgba(140,190,255,.6)",t.lineWidth=3,t.beginPath(),t.arc(m/2,m/2,m/2-1.5,0,7),t.stroke()}function f(d){a=d,i.style.display=d?"none":"block"}return{update:h,setHidden:f,isHidden:()=>a}}const Jo=1400,On=130;function RS(i){const e=new Float32Array(Jo*3),t=new Float32Array(Jo);for(let c=0;c<Jo;c++)e[c*3]=(Math.random()-.5)*On,e[c*3+1]=Math.random()*On,e[c*3+2]=(Math.random()-.5)*On,t[c]=28+Math.random()*22;const n=new Bt;n.setAttribute("position",new jt(e,3));const s=new La({color:11191517,size:.32,transparent:!0,opacity:.55,depthWrite:!1}),r=new ch(n,s);r.frustumCulled=!1,r.visible=!1,i.add(r);function o(c,l,h,f,d=!1){e[c*3]=l+(Math.random()-.5)*On,e[c*3+1]=d?h+On/2:h+(Math.random()-.5)*On,e[c*3+2]=f+(Math.random()-.5)*On}function a(c,l,h){if(!h){r.visible=!1;return}r.visible=!0,s.opacity=h===2?.7:.45;const f=l.x,d=l.y,p=l.z,m=h===2?1.5:1;for(let _=0;_<Jo;_++){let u=e[_*3+1]-t[_]*m*c;u<d-On/2?o(_,f,d,p,!0):(Math.abs(e[_*3]-f)>On&&(e[_*3]=f+(Math.random()-.5)*On),Math.abs(e[_*3+2]-p)>On&&(e[_*3+2]=p+(Math.random()-.5)*On),e[_*3+1]=u)}n.attributes.position.needsUpdate=!0}return{update:a}}class CS extends vy{constructor(e){super(e),this.type=Pi}parse(e){const o=function(T,F){switch(T){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(F||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(F||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(F||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(F||""))}},h=`
`,f=function(T,F,x){F=F||1024;let D=T.pos,L=-1,I=0,B="",U=String.fromCharCode.apply(null,new Uint16Array(T.subarray(D,D+128)));for(;0>(L=U.indexOf(h))&&I<F&&D<T.byteLength;)B+=U,I+=U.length,D+=128,U+=String.fromCharCode.apply(null,new Uint16Array(T.subarray(D,D+128)));return-1<L?(T.pos+=I+L+1,B+U.slice(0,L)):!1},d=function(T){const F=/^#\?(\S+)/,x=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,y=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,D=/^\s*FORMAT=(\S+)\s*$/,L=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,I={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let B,U;for((T.pos>=T.byteLength||!(B=f(T)))&&o(1,"no header found"),(U=B.match(F))||o(3,"bad initial token"),I.valid|=1,I.programtype=U[1],I.string+=B+`
`;B=f(T),B!==!1;){if(I.string+=B+`
`,B.charAt(0)==="#"){I.comments+=B+`
`;continue}if((U=B.match(x))&&(I.gamma=parseFloat(U[1])),(U=B.match(y))&&(I.exposure=parseFloat(U[1])),(U=B.match(D))&&(I.valid|=2,I.format=U[1]),(U=B.match(L))&&(I.valid|=4,I.height=parseInt(U[1],10),I.width=parseInt(U[2],10)),I.valid&2&&I.valid&4)break}return I.valid&2||o(3,"missing format specifier"),I.valid&4||o(3,"missing image size specifier"),I},p=function(T,F,x){const y=F;if(y<8||y>32767||T[0]!==2||T[1]!==2||T[2]&128)return new Uint8Array(T);y!==(T[2]<<8|T[3])&&o(3,"wrong scanline width");const D=new Uint8Array(4*F*x);D.length||o(4,"unable to allocate buffer space");let L=0,I=0;const B=4*y,U=new Uint8Array(4),G=new Uint8Array(B);let O=x;for(;O>0&&I<T.byteLength;){I+4>T.byteLength&&o(1),U[0]=T[I++],U[1]=T[I++],U[2]=T[I++],U[3]=T[I++],(U[0]!=2||U[1]!=2||(U[2]<<8|U[3])!=y)&&o(3,"bad rgbe scanline format");let J=0,j;for(;J<B&&I<T.byteLength;){j=T[I++];const Te=j>128;if(Te&&(j-=128),(j===0||J+j>B)&&o(3,"bad scanline data"),Te){const Le=T[I++];for(let K=0;K<j;K++)G[J++]=Le}else G.set(T.subarray(I,I+j),J),J+=j,I+=j}const ce=y;for(let Te=0;Te<ce;Te++){let Le=0;D[L]=G[Te+Le],Le+=y,D[L+1]=G[Te+Le],Le+=y,D[L+2]=G[Te+Le],Le+=y,D[L+3]=G[Te+Le],L+=4}O--}return D},m=function(T,F,x,y){const D=T[F+3],L=Math.pow(2,D-128)/255;x[y+0]=T[F+0]*L,x[y+1]=T[F+1]*L,x[y+2]=T[F+2]*L,x[y+3]=1},_=function(T,F,x,y){const D=T[F+3],L=Math.pow(2,D-128)/255;x[y+0]=yo.toHalfFloat(Math.min(T[F+0]*L,65504)),x[y+1]=yo.toHalfFloat(Math.min(T[F+1]*L,65504)),x[y+2]=yo.toHalfFloat(Math.min(T[F+2]*L,65504)),x[y+3]=yo.toHalfFloat(1)},u=new Uint8Array(e);u.pos=0;const g=d(u),S=g.width,v=g.height,M=p(u.subarray(u.pos),S,v);let R,w,b;switch(this.type){case wn:b=M.length/4;const T=new Float32Array(b*4);for(let x=0;x<b;x++)m(M,x*4,T,x*4);R=T,w=wn;break;case Pi:b=M.length/4;const F=new Uint16Array(b*4);for(let x=0;x<b;x++)_(M,x*4,F,x*4);R=F,w=Pi;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:S,height:v,data:R,header:g.string,gamma:g.gamma,exposure:g.exposure,type:w}}setDataType(e){return this.type=e,this}load(e,t,n,s){function r(o,a){switch(o.type){case wn:case Pi:o.colorSpace=Zt,o.minFilter=$t,o.magFilter=$t,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,r,n,s)}}const ci=1.94384,Hn=3.28084,Qo=196.85,Ln=(i,e,t)=>Math.max(e,Math.min(t,i)),PS=document.getElementById("app"),ri=new vv({antialias:!0});ri.setSize(innerWidth,innerHeight);ri.setPixelRatio(Math.min(devicePixelRatio,2));ri.shadowMap.enabled=!0;ri.shadowMap.type=Ad;ri.toneMapping=Cd;ri.toneMappingExposure=.75;PS.appendChild(ri.domElement);const En=new yv,Mt=new fn(60,innerWidth/innerHeight,.3,15e4),{sunLight:rr,hemi:LS,skyUni:IS,update:ea,sightFound:Ff,balloons:DS,nightGlows:NS,nightMats:US,roadLoops:FS}=Jy(En);new CS().load("hdri/sky_1k.hdr",i=>{try{const e=new Al(ri);En.environment=e.fromEquirectangular(i).texture,"environmentIntensity"in En&&(En.environmentIntensity=.5),i.dispose(),e.dispose()}catch{}});addEventListener("resize",()=>{Mt.aspect=innerWidth/innerHeight,Mt.updateProjectionMatrix(),ri.setSize(innerWidth,innerHeight)});const ii=new Set;try{for(const i of JSON.parse(localStorage.getItem("flightsim-sights")||"[]"))ss[i]&&(ii.add(i),Ff(i))}catch{}let OS=0,Of=!0;function BS(){ss.forEach((i,e)=>{if(!ii.has(e)&&Math.hypot(ve.x-i.x,ve.z-i.z)<i.r){ii.add(e),Ff(e);try{localStorage.setItem("flightsim-sights",JSON.stringify([...ii]))}catch{}st(`📍 Discovered: ${i.name} — ${i.blurb} (${ii.size}/${ss.length})`,4200)}})}const gt=iS(),ei=sS();let vh="free",qn=!1;const an=fS(En,ri,rr,LS,IS,NS,gt.settings,US),Gr=_S(En,FS),ut=xS(En,Mt),Kt=wS(),yh=ES(Kt);function Bf(i){const e=i===2303531;en.setPaint(e?i:16054008,e?987411:i)}function zf(){const i=ws.find(t=>t.id===ke.selected)||ws[0],e=zl.find(t=>t.id===ke.paintFor(i.id));e?.paint?Bf(e.paint):en.setPaint(i.look.body,i.look.accent)}async function zS(i,e=!1){const t=ws.find(n=>n.id===i);!t||!ke.aircraft.has(i)||(wf(t.specs),ke.selectAircraft(i),En.remove(en.root),en=await Pf(En,{look:t.look,useGLB:i==="skyhawk"}),Kf.mount(en.dashAnchor),en.root.add(yr),en.root.add(oo),yr.position.set(-1.8,t.look.wing==="high"?1.5:-.02,-1.1),oo.position.set(-1.8,-30,-220),zf(),en.setState({pos:ve,quat:It}),e||st(`✈️ Now flying: ${t.name}`))}const Ea=SS({onPaint:i=>Bf(i),onAircraft:i=>zS(i),onOutfit:i=>ut.setOutfit(i)});Kt.onComplete(i=>{st(`✅ Quest complete: ${i.name} (+$${i.reward})${i.item?" + 🎁 gift!":""}`,4200),ln.play("marta-cash",15),kf()});function kf(){const i=Kt.next();bS(i?`◈ ${i.name} <small>${i.hint}</small>`:"🏆 All quests complete!")}kf();{const i=document.getElementById("mute-btn"),e=()=>{i&&(i.firstChild.textContent=ln.muted?"🔇 ":"🔊 ")};e(),i?.addEventListener("click",()=>{ln.toggle(),e()})}const yr=new Mf(16774872,0,900,.32,.5,1.2),oo=new St;let Mh=!1;addEventListener("contextmenu",i=>i.preventDefault());addEventListener("mousedown",i=>{i.button===2&&(Mh=!0)});addEventListener("mouseup",i=>{i.button===2&&(Mh=!1)});const ve=new N,qt=new N,It=new _n,Bn=new N;let ai=0,zn=!1,Sn=!1,Hl=!1,pa="",or=0;const Hf=["CHASE","COCKPIT","TOWER"],kS=new N(45,_t.elev+14,_t.halfLen+120),Xe=hM(gt.settings);function Sh(i){i==="final"?(ve.set(0,_t.elev+305,-6156),It.setFromAxisAngle(new N(0,1,0),Math.PI),qt.set(0,-2.5,33),Xe.st.throttle=.3,Xe.st.flapIdx=3,Xe.st.gearDown=!0,Xe.st.trim=.1):(ve.set(0,_t.elev+ht.gearHeight+.02,480),qt.set(0,0,0),It.identity(),Xe.st.throttle=0,Xe.st.pitch=0,Xe.st.roll=0,Xe.st.flapIdx=0,Xe.st.gearDown=!0,Xe.st.trim=0),ai=Xe.st.throttle,Bn.set(0,0,0),zn=i==="final",Sn=!1,Hl=!1,pa=""}function co(){Xf(),Vl(),Sh(vh==="landing"?"final":"runway")}function Vf(){or=(or+1)%3,st("Camera: "+Hf[or])}function wh(){qn?Rt?qf():ut.pos.distanceTo(ve)<9?(qn=!1,ut.hide(),Es(),st("Back in the cockpit — have fun!")):st("Too far from the plane — walk back to it (K)"):Of&&qt.length()<3?(qn=!0,Xe.st.throttle=0,ut.place(ve.x+4,ve.y,ve.z+2,Math.atan2(Vn.x,Vn.z)+Math.PI),Es(),st("On foot — WASD / stick to walk · E shop/talk · K back to plane",3600)):st("Slow down and stop on the ground first!")}function Gf(){if(Rt){qf();return}const i=Gr.nearestCar(ut.pos.x,ut.pos.z);if(i){VS(i);return}let e=null,t=12;for(const s of Tf){const r=Math.hypot(ut.pos.x-s.x,ut.pos.z-s.z);r<t&&(t=r,e=s)}const n=Math.hypot(ut.pos.x-Ki.x,ut.pos.z-Ki.z);e?Ea.open(e.name):n<8?yh.openMarta():st("Nothing to interact with here — find a car, a shop or Marta")}let Rt=null,Dt=0,Qs=0,yd=0;const Qt=wa({shirt:14711328,pants:2764083,cap:14711328});Qt.group.visible=!1;En.add(Qt.group);const Ve={active:!1,vel:new N,hx:0,hz:-1,deployed:!1,hint:""};function Wf(){if(Ve.active||qn||Sn)return;const i=Be(ve.x,ve.z);if(!zn||ve.y-i<60){st("Too low to jump! Climb first.");return}Ve.active=!0,Ve.deployed=!1,Ve.vel.copy(qt);const e=Math.hypot(Vn.x,Vn.z)||1;Ve.hx=Vn.x/e,Ve.hz=Vn.z/e,Qt.group.position.copy(ve),Qt.group.visible=!0,st(`GERONIMO! ${["","STOCK CANOPY","CRUISER CANOPY","SPEEDSTER CANOPY"][Uf()]} — opens at 400 ft, steer with the mouse.`,3600)}function Vl(){Ve.active=!1,Qt.group.visible=!1}function HS(i){const e=Qt.group.position,t=Be(e.x,e.z),n=e.y-t,s=Uf(),r=[-5.5,-6.5,-8][s-1],o=[9,14,20][s-1];!Ve.deployed&&n<122&&Ve.vel.y<0&&(Ve.deployed=!0,Ve.vel.multiplyScalar(.25),ni.canopyOpen(),st("🪂 CANOPY OUT — steer to a landing!",3e3));const a=Ve.deployed?r:-52;Ve.vel.y+=(a-Ve.vel.y)*Math.min(1,(Ve.deployed?1.6:.8)*i);const c=Ve.deployed?o:12,l=-Ve.hz,h=Ve.hx,f=Ve.hx*(Ve.pitch||0)*c+l*(Ve.roll||0)*c+Ta.x*.3,d=Ve.hz*(Ve.pitch||0)*c+h*(Ve.roll||0)*c+Ta.z*.3;Ve.vel.x+=(f-Ve.vel.x)*Math.min(1,2*i),Ve.vel.z+=(d-Ve.vel.z)*Math.min(1,2*i),e.x+=Ve.vel.x*i,e.y+=Ve.vel.y*i,e.z+=Ve.vel.z*i;const p=Ve.deployed?.15:1.25;if(Qt.armL.rotation.z=p,Qt.armR.rotation.z=-p,Qt.legL.rotation.z=p*.3,Qt.legR.rotation.z=-p*.3,Qt.armL.rotation.x=Qt.armR.rotation.x=0,Qt.group.rotation.y=Math.atan2(Ve.hx,Ve.hz),e.y<=t+.2){if(t<.5||!Ve.deployed&&Ve.vel.y<-15){Vl(),ni.splash(),st(t<.5?"💦 Splashdown! Back in the plane (R).":"💥 Too fast, too low! (R)",3600),co();return}Vl(),qn=!0,Xe.st.throttle=0,ni.landSoft(),ut.place(e.x,e.y,e.z,Math.atan2(Ve.hx,Ve.hz)),Es(),Kt.notify("dive"),st("🦶 Touchdown! That was epic. Walk it off.",3600);return}Ve.hint=Ve.deployed?`Canopy out — steer to landing (${Math.round(n*Hn)} ft)`:`FREEFALL — canopy at 400 ft (${Math.round(n*Hn)} ft)`,In.set(e.x-Ve.hx*11,e.y+4,e.z-Ve.hz*11),Zi.lerp(In,1-Math.pow(.001,i)),Ji.set(e.x+Ve.hx*8,e.y,e.z+Ve.hz*8),Mt.position.copy(Zi),Mt.lookAt(Ji)}function Xf(){Rt&&(Rt.taken=!1),Rt=null,Dt=0}function VS(i){Rt=i,i.taken=!0,Dt=0,Qs=i.g.rotation.y,ut.hide(),st("Driving! WASD steer · E/K hop out",3e3)}function qf(){if(!Rt)return;const i=Rt.g.position;Rt.taken=!1;let e=0,t=1e9;Rt.loop.forEach((n,s)=>{const r=Math.hypot(n.x-i.x,n.z-i.z);r<t&&(t=r,e=s)}),Rt.seg=e,ut.place(i.x+2.5,i.y,i.z,Qs),Rt=null,Dt=0}const zr=new N;function GS(i){const e=Oe.mode==="walk"&&Oe.stickOn,t=Xe.keys.has("KeyW")||e&&Oe.stickY>.25,n=Xe.keys.has("KeyS")||e&&Oe.stickY<-.25,s=Xe.keys.has("KeyA")||e&&Oe.stickX<-.25,r=Xe.keys.has("KeyD")||e&&Oe.stickX>.25,o=Xe.keys.has("ShiftLeft")||Xe.keys.has("ShiftRight")||Oe.run;t&&(Dt+=9*i),n&&(Dt-=(Dt>1?14:7)*i),Dt-=Dt*.6*i,Dt=Ln(Dt,-7,o?34:26);const a=((s?1:0)-(r?1:0))*Ln(1.5/(1+Math.abs(Dt)*.09),.35,1.5);Qs+=a*i*Math.sign(Dt)*Math.min(1,Math.abs(Dt)/3);const c=Rt.g.position;zr.set(Math.sin(Qs),0,Math.cos(Qs)),c.x+=zr.x*Dt*i,c.z+=zr.z*Dt*i;const l=Be(c.x,c.z);c.y=l<0?.4:l+.15,l<0&&(Dt*=Math.max(0,1-2*i)),Rt.g.rotation.y=Qs;for(const h of Rt.wheels)h.rotation.x+=Dt*i/.42;yd+=Math.abs(Dt)*i,yd>1e3&&Kt.notify("driver"),In.copy(c).addScaledVector(zr,-10).add(Wr.set(0,4.2,0)),Zi.lerp(In,1-Math.pow(.001,i)),Ji.copy(c).addScaledVector(zr,9),Mt.position.copy(Zi),Mt.lookAt(Ji)}const Gl=QM(),ni=tS(),ar=AS(),WS=RS(En),ba=ws.find(i=>i.id===ke.selected&&ke.aircraft.has(i.id))||ws[0];wf(ba.specs);let en=await Pf(En,{look:ba.look,useGLB:ba.id==="skyhawk"});const Kf=oS(en.dashAnchor);en.root.add(yr);yr.position.set(-1.8,ba.look.wing==="high"?1.5:-.02,-1.1);oo.position.set(-1.8,-30,-220);en.root.add(oo);yr.target=oo;zf();{const i=Nf.find(e=>e.id===ke.outfit);i&&ut.setOutfit(i.colors)}Sh("runway");en.setState({pos:ve,quat:It});gt.show("home");gt.onFly(i=>{vh=i,qn=!1,ut.hide(),an.reset(),co(),Es(),gt.setHelpVisible(!1),i==="takeoff"?(ei.start("takeoff"),st("Lesson 1: follow the instructor (bottom). Press H for controls.")):i==="landing"?(ei.start("landing"),ln.play("atc-land"),st("Lesson 2: you are on final — fly 65 kt to the threshold.")):(ei.stop(),gt.setInstructor(null),ln.play("atc-wind"),st("Full throttle (W), rotate at 55 kt — good luck!"))});gt.onQuitToMenu(()=>{ei.stop(),gt.setInstructor(null),qn=!1,ut.hide(),Xf(),Sh("runway"),en.setState({pos:ve,quat:It}),Es()});document.addEventListener("flightsim-restart",()=>{qn=!1,ut.hide(),co(),Es(),st("Flight restarted")});document.addEventListener("flightsim-tut-skip",()=>{ei.stop(),gt.setInstructor(null)});const Vn=new N,Wr=new N,Md=new N,In=new N,Sd=new N,qi=new N,wd=new _n,yt=new bn,Zi=new N(0,30,520),Ji=new N,Ta=new N;document.addEventListener("pointerlockchange",()=>{const i=document.pointerLockElement===document.body,e=!document.getElementById("menu").classList.contains("hidden");if(!i&&!e&&!gt.isPaused()){if(typeof Ea<"u"&&(Ea.isOpen()||yh.isOpen()))return;Wl&&gt.setPaused(!0)}});let Wl=!1;function XS(i,e){return(Math.abs(Be(i+6,e)-Be(i-6,e))+Math.abs(Be(i,e+6)-Be(i,e-6)))/(2*6)}function qS(i,e){const t=(gt.settings.windKt||0)*.514444,n=Math.sin(i*.23)*t*.25+Math.sin(i*1.1)*t*.08;e.set(Math.sin(i*.17)*1,0,t+n);const s=Hy(i,gt.settings.turbulence);return s&&(e.x+=s.x,e.y+=s.y,e.z+=s.z),{out:e,g:s}}function KS(i,e){const t=Xe.poll(i);if(Xe.consumeReset()&&(co(),st(vh==="landing"?"Reset on final approach":"Reset on Runway 36")),Xe.consumeCam()&&Vf(),Xe.consumeHelp()&&gt.setHelpVisible(!gt.isHelpVisible()),Xe.consumePause()&&gt.setPaused(!gt.isPaused()),Xe.consumeTutorialAdvance()&&ei.active()&&document.dispatchEvent(new CustomEvent("flightsim-tut-next")),Xe.consumeMap()&&ar.setHidden(!ar.isHidden()),Xe.consumeSkydive()&&Wf(),Ve.active){Ve.pitch=t.pitch,Ve.roll=t.roll,t.pitch=0,t.roll=0,t.yaw=0,t.brakes=!1,HS(i);const j=Math.max(0,Qt.group.position.y-Be(Qt.group.position.x,Qt.group.position.z));Gl.update({iasKt:Ve.vel.length()*ci,altFt:Qt.group.position.y*Hn,vsiFpm:Ve.vel.y*Qo,hdgDeg:0,throttle:0,rpm:0,flapDeg:0,gearDown:!0,trim:0,aoaDeg:0,aglFt:j*Hn,windKt:Ta.length()*ci,cam:"DIVE",pitchDeg:0,rollDeg:0,stalled:!1,overspeed:"",hint:Ve.hint,sights:`${ii.size}/${ss.length}`,money:"$"+ke.money,clock:an.icon()+" "+an.clock()}),ni.update(0,0,!1);return}Xe.consumeWalk()&&wh();const n=Be(ve.x,ve.z),s=ve.y-ht.gearHeight-n,r=s<=.02;ai+=(t.throttle-ai)*Math.min(1,i*1.4),Vn.set(0,0,-1).applyQuaternion(It),Wr.set(0,1,0).applyQuaternion(It),Md.set(1,0,0).applyQuaternion(It),wd.copy(It).invert();const{out:o,g:a}=qS(e,Ta);In.copy(qt).sub(o),Sd.copy(In).applyQuaternion(wd);const c=Vy(t.flapIdx),l=Math.max(0,ve.y),h=MS(),f=Oe.enabled;f&&(h.critBonus+=3*Math.PI/180);const d=Oy(Sd,t.throttle,c,t.gearDown,l,h);qi.set(0,0,0);const p=d.V;if(p>.5){In.copy(qt).sub(o).normalize();let j=d.drag,ce=d.lift;if(s<ht.wingSpan&&s>-2){const K=1-Ln(s/ht.wingSpan,0,1);ce*=1+.1*K,j*=1-.25*K}qi.addScaledVector(In,-j);const Te=Wr.dot(In),Le=Wr.clone().addScaledVector(In,-Te).normalize();qi.addScaledVector(Le,ce),qi.addScaledVector(Md,-d.beta*d.q*ht.wingArea*.9)}qi.addScaledVector(Vn,By(ai,p,l,h.powerMul)),qi.y-=ht.mass*9.81,Sn&&qi.multiplyScalar(.05),qt.addScaledVector(qi,i/ht.mass),ve.addScaledVector(qt,i);const _=.35+.65*(Ln(d.q/150,0,1)*(Sn?.2:1)),u=Ln(t.pitch+t.trim*.6,-1,1);yt.setFromQuaternion(It,"YXZ");const g=r?.3:1;let S=u*1.4*_,v=(-t.yaw*.9-d.beta*1.1*g+t.roll*(f?-.5:.28))*_,M=(-t.roll*(f?2:2.4)+Ln(-yt.z*(f?.9:.5),f?-.6:-.35,f?.6:.35))*_;const R=gt.settings.realism?f?.35:1:.25,w=zy(ai,p,d.alpha);v+=w.yawRate*_*g*R,M-=w.rollRate*_*(r?.4:R),a&&(M+=a.roll*_),d.stalled&&(M+=Math.sin(e*13)*(f?.4:.9),S+=-.9*_),d.stalled&&!bd&&zn&&ln.play("les-stall",90),bd=d.stalled,Oe.mode==="fly"&&!Oe.stickOn&&!r&&!Sn&&!d.stalled&&(S+=Ln(-yt.x*1.8,-.9,.9)*_,M+=Ln(-yt.z*1.5,-.9,.9)*_);const T=d.stalled?1.6:2.6;Bn.x+=(S-Bn.x)*Math.min(1,T*i),Bn.y+=(v-Bn.y)*Math.min(1,2.2*i),Bn.z+=(M-Bn.z)*Math.min(1,T*i);const F=Bn.length();if(F>1e-6){const j=new _n().setFromAxisAngle(In.set(Bn.x,Bn.y,Bn.z).normalize(),F*i);It.multiply(j).normalize()}yt.setFromQuaternion(It,"YXZ"),yt.x=Ln(yt.x,-1.2,1.2);const x=Be(ve.x,ve.z),y=ve.y-ht.gearHeight;let D=!1;if(y<=x){ve.y=x+ht.gearHeight;const j=qt.y,ce=Math.abs(Vn.dot(qt));if(zn&&(D=!0),(!r||!zn)&&zn){const Pe=j*Qo,He=Math.abs(yt.z),ie=Math.abs(ve.x)<80&&Math.abs(ve.z)<_t.halfLen+120?"main":Math.abs(ve.x-Ut.x)<170&&Math.abs(ve.z-Ut.z)<Ut.halfLen+120?"coral":Math.abs(ve.x-Yt.x)<170&&Math.abs(ve.z-Yt.z)<Yt.halfLen+120?"north":null,C=XS(ve.x,ve.z)>.28,Y=Oe.enabled,ee=Y?-11:-8,ne=Y?.6:.45;if(j<ee||He>ne||C)Sn=!0,Xe.st.throttle=0,Hc(ve),ni.crash(),st(C?"💥 Into the mountainside — press R":`💥 CRASHED (${Math.round(-Pe)} fpm) — press R`);else{const se=-Pe;se<=60?st("🧈 GREASED IT! A+  — textbook touchdown"):se<=120?st(`🥇 Excellent landing (${Math.round(se)} fpm) — A`):se<=200?st(`🥈 Good landing (${Math.round(se)} fpm) — B`):se<=300?st(`🥉 Acceptable (${Math.round(se)} fpm) — C`):se<=400?st(`✓ Nice landing (${Math.round(se)} fpm)`):st(`Hard landing (${Math.round(se)} fpm) — flare earlier next time`),ln.play("atc-grease"),Kt.notify("touchdown",{strip:ie,fpm:Pe,airborne:!0}),an.isNight()&&Kt.notify("nightlanding"),ie==="north"&&Kt.notify("northstrip")}}j<0&&(qt.y=0);const Te=qt.x,Le=qt.z,K=Math.hypot(Te,Le);if(K>.01){const Pe=t.brakes?4.5:h.rollDecel,He=Math.min(K,Pe*i);qt.x-=Te/K*He,qt.z-=Le/K*He}const ae=t.yaw*Ln(ce/12,0,1)*1.4,_e=new _n().setFromAxisAngle(Wr,-ae*i);It.premultiply(_e).normalize(),yt.setFromQuaternion(It,"YXZ"),ce>ht.Vr&&u>.1?(yt.x=Ln(yt.x,-.05,.22),yt.z=Ln(yt.z,-.1,.1),It.setFromEuler(yt)):(yt.x+=(0-yt.x)*Math.min(1,6*i),yt.z+=(0-yt.z)*Math.min(1,6*i),It.setFromEuler(yt),Bn.multiplyScalar(Math.max(0,1-8*i)));const De=p*ci,Ne=Math.round(ht.Vr*ci);r&&t.throttle<.2&&(Bc=!1,zc=!1),r&&!zc&&De>8&&t.throttle>.5&&(zc=!0,ln.play("atc-taxi")),r&&!Bc&&De>20&&t.throttle>.9&&(Bc=!0,ln.play("atc-takeoff")),!Hl&&De>=Ne&&t.throttle>.8&&(Hl=!0,st(`Rotate! (Vr ${Ne} kt)`)),zn=!1}else ve.y-x>5&&!zn&&(zn=!0,Kt.notify("takeoff")),ve.y*Hn>3e3&&Kt.notify("alt",{ft:ve.y*Hn}),zn&&an.isNight()&&Kt.notify("nightair"),ve.y<.3&&x<-2&&(Sn||(Sn=!0,Xe.st.throttle=0,Hc(ve),ni.splash(),st("💥 Ditched in the ocean — press R")),Sn&&(ve.y=.3,qt.multiplyScalar(.9)));ve.y<x+.5&&!(y<=x)&&(Sn||(Sn=!0,Xe.st.throttle=0,Hc(ve),ni.crash(),st("💥 Terrain strike — press R"))),en.setState({pos:ve,quat:It}),en.animate({roll:t.roll,pitch:u,yaw:t.yaw,flapFrac:c,gearDown:t.gearDown,rpm01:ai},i,e);const L=rr.userData.dir||an.sunDir;if(rr.position.set(ve.x+L.x*2800,ve.y+Math.max(400,L.y*2800),ve.z+L.z*2800),rr.target.position.copy(ve),yr.intensity=ke.has("spotlight")&&(an.isNight()||r)?900:0,or===0)In.set(0,3.4,10.5).applyQuaternion(It).add(ve),Zi.lerp(In,1-Math.pow(1e-4,i)),Ji.copy(ve).addScaledVector(Vn,12),Mt.position.copy(Zi),Mt.lookAt(Ji);else if(or===1){const j=en.pilotEye().applyQuaternion(It).add(ve);Mt.position.copy(j),Ji.copy(j).addScaledVector(Vn,50),Mt.lookAt(Ji),Mt.rotation.z+=-t.roll*.06,Zi.copy(Mt.position)}else Mt.position.lerp(kS,1-Math.pow(.01,i)),Mt.lookAt(ve),Zi.copy(Mt.position);const I=Mh&&ke.has("binoculars")?16:60;Math.abs(Mt.fov-I)>.2&&(Mt.fov+=(I-Mt.fov)*Math.min(1,8*i),Mt.updateProjectionMatrix());const B=ky(p,c);let U="";B.includes("vne")?U="⚠ VNE — REDUCE SPEED":B.includes("vno")?U="CAUTION: ABOVE Vno (129 kt)":B.includes("flap-overspeed")&&(U="⚠ FLAP OVERSPEED (Vfe 85 kt)"),U&&U!==pa&&(st(U),pa=U),U||(pa=""),yt.setFromQuaternion(It,"YXZ");const G=(yt.y*-180/Math.PI%360+360)%360,O=p*ci;let J="";if(!ei.active()&&!Sn&&(r&&t.throttle<.5&&O<10?J="Hold W for full takeoff power":r&&O<ht.Vr*ci?J=`Accelerating… rotate at ${Math.round(ht.Vr*ci)} kt`:r?J="ROTATE — ease the mouse UP ⬆":d.stalled&&(J="STALL — push mouse DOWN, full power!")),Gl.update({iasKt:O,altFt:ve.y*Hn,vsiFpm:qt.y*Qo,hdgDeg:G===0&&Vn.z<0?0:G,throttle:t.throttle,rpm:700+ai*2e3,flapDeg:jr[t.flapIdx],gearDown:t.gearDown,trim:t.trim,aoaDeg:d.alpha*180/Math.PI,aglFt:Math.max(0,ve.y-ht.gearHeight-x)*Hn,windKt:o.length()*ci,cam:Hf[or],pitchDeg:yt.x*180/Math.PI,rollDeg:-yt.z*180/Math.PI,stalled:d.stalled,overspeed:U,hint:J,sights:`${ii.size}/${ss.length}`,money:"$"+ke.money,clock:an.icon()+" "+an.clock()}),ni.update(ai,Ln(p/70,0,1),d.stalled),Ys.copy(o),Of=r,OS++%30===0&&!Sn&&(BS(),Kt.notify("sights",{n:ii.size}),zn)){for(const ce of DS){const Te=ve.x-ce.x,Le=ve.y-ce.y,K=ve.z-ce.z;if(Te*Te+Le*Le+K*K<200*200){Kt.notify("balloon");break}}Math.hypot(ve.x,ve.z)>15e3&&Kt.notify("far"),Math.abs(yt.z)>60*Math.PI/180&&Kt.notify("aerobat"),O>140&&Kt.notify("speed"),(gt.settings.weather||0)===2&&Kt.notify("storm"),Math.hypot(ve.x+330,ve.z-860)<400&&(ve.y-ht.gearHeight-x)*Hn<300&&Kt.notify("buzz")}if(rn.iasKt=O,rn.altFt=ve.y*Hn,rn.vsiFpm=qt.y*Qo,rn.hdgDeg=G,rn.pitchDeg=yt.x*180/Math.PI,rn.rollDeg=-yt.z*180/Math.PI,rn.betaDeg=d.beta*180/Math.PI,rn.rpm=700+ai*2e3,rn.throttle=t.throttle,rn.flapDeg=jr[t.flapIdx],rn.gearDown=t.gearDown,rn.stalled=d.stalled,rn.trim=t.trim,rn.pitchIn=u,rn.rollIn=t.roll,ei.active()||(Oc=""),ei.active()){const j=ei.update({iasKt:O,aglFt:Math.max(0,ve.y-ht.gearHeight-x)*Hn,throttle:t.throttle,rpm:700+ai*2e3,flapDeg:jr[t.flapIdx],onGround:r,airborne:zn,hdgDeg:G,touchedDown:D,crashed:Sn});if(j){gt.setInstructor(j.html);const ce=j.lesson+":"+j.step;if(ce!==Oc){Oc=ce;const Te=YS[ce];Te&&ln.play(Te)}j.finished&&(ei.stop(),setTimeout(()=>gt.setInstructor(null),8e3))}}ar.update({x:ve.x,z:ve.z,hdgDeg:G,sightsFound:ii,onFoot:!1},i)}let Ed=performance.now()/1e3,ta=0,oi=0;const Ys=new N(-2,0,1.5),rn={};let na=.6,cr=0;const YS={"takeoff:2":"les-rotate","takeoff:3":"les-climb","takeoff:4":"les-flaps","landing:0":"les-final","landing:2":"les-flare"};let Oc="",bd=!1,Bc=!1,zc=!1,kc=0;function Yf(i,e){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),s=n.createRadialGradient(32,32,2,32,32,32);return s.addColorStop(0,i),s.addColorStop(.5,e),s.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=s,n.fillRect(0,0,64,64),new hn(t)}const $S=Yf("rgba(255,240,180,1)","rgba(255,90,10,0.7)"),jS=Yf("rgba(80,80,85,0.85)","rgba(40,40,45,0.4)"),xs=new kt(new Ft({map:$S,transparent:!0,depthWrite:!1,blending:Zr})),Qi=new kt(new Ft({map:jS,transparent:!0,depthWrite:!1}));xs.visible=Qi.visible=!1;En.add(xs,Qi);let $s=1e9;function Hc(i){xs.position.copy(i),Qi.position.copy(i),xs.visible=Qi.visible=!0,$s=0,cr=1}function ia(i){if($s>12){xs.visible=Qi.visible=!1;return}$s+=i;const e=Math.min(1,$s/9);xs.scale.setScalar(5+$s*2.5),xs.material.opacity=1-e,Qi.position.y+=i*3.5,Qi.scale.setScalar(7+$s*4),Qi.material.opacity=.85*(1-e),cr=Math.max(0,cr-i*.45)}const ZS=lM({getThrottle:()=>Xe.st.throttle,onLook:(i,e)=>ut.addLook(i,e),onAction:i=>{switch(i){case"flapUp":Xe.st.flapIdx=Math.min(3,Xe.st.flapIdx+1);break;case"flapDown":Xe.st.flapIdx=Math.max(0,Xe.st.flapIdx-1);break;case"gear":Xe.st.gearDown=!Xe.st.gearDown,ni.gearToggle(),st(Xe.st.gearDown?"Gear DOWN":"Gear UP");break;case"cam":Vf();break;case"pause":gt.setPaused(!0);break;case"walk":wh();break;case"dive":Wf();break;case"interact":qn&&Gf();break;case"next":document.dispatchEvent(new CustomEvent("flightsim-tut-next"));break}}});function Es(){ZS.setMode(document.getElementById("menu").classList.contains("hidden")?qn?"walk":"fly":"hidden")}function $f(){requestAnimationFrame($f);const i=performance.now()/1e3;let e=Math.min(.1,i-Ed);Ed=i;const t=!document.getElementById("menu").classList.contains("hidden");t||(Wl=!0);const n=Ea.isOpen()||yh.isOpen();if(t)na+=e*.11,Mt.position.set(ve.x+Math.cos(na)*16,ve.y+4.5+Math.sin(na*.6)*1.2,ve.z+Math.sin(na)*16),Mt.lookAt(ve.x,ve.y+.8,ve.z),an.update(e),ea(e,oi,Ys,ve),Gr.update(e,oi,an.isNight(),ve),ia(e);else if(!gt.isPaused()&&Wl&&!n)if(an.update(e),qn){if(Xe.keys.has("KeyP")&&(Xe.keys.delete("KeyP"),gt.setPaused(!gt.isPaused())),Xe.keys.has("KeyH")&&(Xe.keys.delete("KeyH"),gt.setHelpVisible(!gt.isHelpVisible())),Xe.consumeMap()&&ar.setHidden(!ar.isHidden()),ni.update(0,0,!1),Xe.consumeWalk()&&wh(),Xe.consumeInteract()&&Gf(),Xe.consumeReset()&&(co(),qn=!1,ut.hide(),Es()),Oe.mode==="walk"&&!Rt){const r=Oe.stickOn?Oe.stickX:0,o=Oe.stickOn?Oe.stickY:0,a=(c,l)=>{l?ut.keys.add(c):ut.keys.delete(c)};a("KeyW",o>.25),a("KeyS",o<-.25),a("KeyD",r>.25),a("KeyA",r<-.25),a("ShiftLeft",Oe.run)}Rt?GS(e):ut.update(e),ut.active()?(ut._stepT||(ut._stepT=0),ut._stepT+=e,ut._stepT>.35&&(ut._stepT=0,ni.step())):ut._stepT=0,en.animate({roll:0,pitch:0,yaw:0,flapFrac:0,gearDown:!0,rpm01:0},e,oi);const s=Rt?Rt.g.position:ut.pos;ea(e,oi,Ys,s),Gr.update(e,oi,an.isNight(),s),kc+=e,kc>1.5&&(kc=0,Gr.townsfolk.some(o=>Math.hypot(o.p.group.position.x-s.x,o.p.group.position.z-s.z)<9)&&ln.playRandom(["folk-hi1","folk-hi2","folk-hi3","folk-hi4"],25),Math.hypot(s.x-Xt.x,s.z-Xt.z)<18&&ln.play("tower-hello",120)),rr.position.set(s.x+1400,1600,s.z+700),rr.target.position.copy(s),Gl.update({iasKt:Rt?Math.abs(Dt)*ci:0,altFt:s.y*Hn,vsiFpm:0,hdgDeg:0,throttle:0,rpm:0,flapDeg:0,gearDown:!0,trim:0,aoaDeg:0,aglFt:0,windKt:Ys.length()*ci,cam:Rt?"DRIVE":"FOOT",pitchDeg:0,rollDeg:0,stalled:!1,overspeed:"",hint:Rt?`🚗 ${Math.round(Math.abs(Dt)*3.6)} km/h — E/K hop out`:"WASD walk · E drive/shop/talk · K plane",sights:`${ii.size}/${ss.length}`,money:"$"+ke.money,clock:an.icon()+" "+an.clock()}),ar.update({x:s.x,z:s.z,hdgDeg:0,sightsFound:ii,onFoot:!0},e),ia(e)}else{ta+=e;const s=1/120;let r=0;for(;ta>=s&&r<40;)KS(s,oi),oi+=s,ta-=s,r++;ea(e,oi,Ys,ve),Gr.update(e,oi,an.isNight(),ve),Kf.update(rn,e),ia(e),cr>.01&&(Mt.position.x+=(Math.random()-.5)*cr*.7,Mt.position.y+=(Math.random()-.5)*cr*.7)}else ta=0,ea(e,oi,Ys,ve),ia(e);WS.update(e,Mt.position,gt.settings.weather||0),ri.render(En,Mt)}$f();
