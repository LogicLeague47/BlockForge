(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rl="169",Df=0,ph=1,Nf=2,ad=1,cd=2,vi=3,Ti=0,fn=1,jt=2,Yi=0,Ks=1,Vr=2,mh=3,gh=4,Uf=5,cs=100,Ff=101,Of=102,Bf=103,zf=104,kf=200,Hf=201,Vf=202,Gf=203,Ac=204,Rc=205,Wf=206,Xf=207,qf=208,Kf=209,Yf=210,$f=211,jf=212,Zf=213,Jf=214,Cc=0,Pc=1,Lc=2,nr=3,Ic=4,Dc=5,Nc=6,Uc=7,ld=0,Qf=1,ep=2,$i=0,tp=1,np=2,ip=3,hd=4,sp=5,rp=6,op=7,_h="attached",ap="detached",ud=300,ir=301,sr=302,Fc=303,Oc=304,ga=306,Zi=1e3,ni=1001,sa=1002,un=1003,dd=1004,Ir=1005,Xt=1006,$o=1007,ii=1008,Ai=1009,fd=1010,pd=1011,Gr=1012,Cl=1013,ds=1014,vn=1015,bi=1016,Pl=1017,Ll=1018,rr=1020,md=35902,gd=1021,_d=1022,On=1023,xd=1024,vd=1025,Ys=1026,or=1027,Il=1028,Dl=1029,yd=1030,Nl=1031,Ul=1033,jo=33776,Zo=33777,Jo=33778,Qo=33779,Bc=35840,zc=35841,kc=35842,Hc=35843,Vc=36196,Gc=37492,Wc=37496,Xc=37808,qc=37809,Kc=37810,Yc=37811,$c=37812,jc=37813,Zc=37814,Jc=37815,Qc=37816,el=37817,tl=37818,nl=37819,il=37820,sl=37821,ea=36492,rl=36494,ol=36495,Md=36283,al=36284,cl=36285,ll=36286,Wr=2300,Xr=2301,Ca=2302,xh=2400,vh=2401,yh=2402,cp=2500,lp=0,Sd=1,hl=2,hp=3200,up=3201,wd=0,dp=1,Vi="",nn="srgb",Kt="srgb-linear",Fl="display-p3",_a="display-p3-linear",ra="linear",yt="srgb",oa="rec709",aa="p3",Ms=7680,Mh=519,fp=512,pp=513,mp=514,bd=515,gp=516,_p=517,xp=518,vp=519,ul=35044,Sh="300 es",Ei=2e3,ca=2001;class fr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let wh=1234567;const Fr=Math.PI/180,ar=180/Math.PI;function Bn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function Bt(i,e,t){return Math.max(e,Math.min(t,i))}function Ol(i,e){return(i%e+e)%e}function yp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Mp(i,e,t){return i!==e?(t-i)/(e-i):0}function Or(i,e,t){return(1-t)*i+t*e}function Sp(i,e,t,n){return Or(i,e,1-Math.exp(-t*n))}function wp(i,e=1){return e-Math.abs(Ol(i,e*2)-e)}function bp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Ep(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Tp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Ap(i,e){return i+Math.random()*(e-i)}function Rp(i){return i*(.5-Math.random())}function Cp(i){i!==void 0&&(wh=i);let e=wh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Pp(i){return i*Fr}function Lp(i){return i*ar}function Ip(i){return(i&i-1)===0&&i!==0}function Dp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Np(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Up(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),f=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*f,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*f,a*l);break;case"ZXZ":i.set(c*f,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function jn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function dt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Fp={DEG2RAD:Fr,RAD2DEG:ar,generateUUID:Bn,clamp:Bt,euclideanModulo:Ol,mapLinear:yp,inverseLerp:Mp,lerp:Or,damp:Sp,pingpong:wp,smoothstep:bp,smootherstep:Ep,randInt:Tp,randFloat:Ap,randFloatSpread:Rp,seededRandom:Cp,degToRad:Pp,radToDeg:Lp,isPowerOfTwo:Ip,ceilPowerOfTwo:Dp,floorPowerOfTwo:Np,setQuaternionFromProperEuler:Up,normalize:dt,denormalize:jn};class he{constructor(e=0,t=0){he.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ze{constructor(e,t,n,s,r,o,a,c,l){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],d=n[2],p=n[5],g=n[8],_=s[0],u=s[3],m=s[6],y=s[1],x=s[4],M=s[7],A=s[2],S=s[5],b=s[8];return r[0]=o*_+a*y+c*A,r[3]=o*u+a*x+c*S,r[6]=o*m+a*M+c*b,r[1]=l*_+h*y+f*A,r[4]=l*u+h*x+f*S,r[7]=l*m+h*M+f*b,r[2]=d*_+p*y+g*A,r[5]=d*u+p*x+g*S,r[8]=d*m+p*M+g*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],f=h*o-a*l,d=a*c-h*r,p=l*r-o*c,g=t*f+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(s*l-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Pa.makeScale(e,t)),this}rotate(e){return this.premultiply(Pa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pa=new Ze;function Ed(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function qr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Op(){const i=qr("canvas");return i.style.display="block",i}const bh={};function ta(i){i in bh||(bh[i]=!0,console.warn(i))}function Bp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function zp(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function kp(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Eh=new Ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Th=new Ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),_r={[Kt]:{transfer:ra,primaries:oa,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[nn]:{transfer:yt,primaries:oa,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[_a]:{transfer:ra,primaries:aa,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Th),fromReference:i=>i.applyMatrix3(Eh)},[Fl]:{transfer:yt,primaries:aa,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Th),fromReference:i=>i.applyMatrix3(Eh).convertLinearToSRGB()}},Hp=new Set([Kt,_a]),rt={enabled:!0,_workingColorSpace:Kt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Hp.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=_r[e].toReference,s=_r[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return _r[i].primaries},getTransfer:function(i){return i===Vi?ra:_r[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(_r[e].luminanceCoefficients)}};function $s(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function La(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ss;class Vp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ss===void 0&&(Ss=qr("canvas")),Ss.width=e.width,Ss.height=e.height;const n=Ss.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ss}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=$s(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor($s(t[n]/255)*255):t[n]=$s(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gp=0;class Td{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=Bn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ia(s[o].image)):r.push(Ia(s[o]))}else r=Ia(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ia(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wp=0;class zt extends fr{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,n=ni,s=ni,r=Xt,o=ii,a=On,c=Ai,l=zt.DEFAULT_ANISOTROPY,h=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wp++}),this.uuid=Bn(),this.name="",this.source=new Td(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ud)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Zi:e.x=e.x-Math.floor(e.x);break;case ni:e.x=e.x<0?0:1;break;case sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Zi:e.y=e.y-Math.floor(e.y);break;case ni:e.y=e.y<0?0:1;break;case sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=ud;zt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,s=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],f=c[8],d=c[1],p=c[5],g=c[9],_=c[2],u=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(f-_)<.01&&Math.abs(g-u)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+_)<.1&&Math.abs(g+u)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,M=(p+1)/2,A=(m+1)/2,S=(h+d)/4,b=(f+_)/4,T=(g+u)/4;return x>M&&x>A?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=S/n,r=b/n):M>A?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=S/s,r=T/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=b/r,s=T/r),this.set(n,s,r,t),this}let y=Math.sqrt((u-g)*(u-g)+(f-_)*(f-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(u-g)/y,this.y=(f-_)/y,this.z=(d-h)/y,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xp extends fr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new zt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Td(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fs extends Xp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ad extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qp extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3];const d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(f!==_||c!==d||l!==p||h!==g){let u=1-a;const m=c*d+l*p+h*g+f*_,y=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const A=Math.sqrt(x),S=Math.atan2(A,m*y);u=Math.sin(u*S)/A,a=Math.sin(a*S)/A}const M=a*y;if(c=c*u+d*M,l=l*u+p*M,h=h*u+g*M,f=f*u+_*M,u===1-a){const A=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=A,l*=A,h*=A,f*=A}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*f+c*p-l*d,e[t+1]=c*g+h*d+l*f-a*p,e[t+2]=l*g+h*p+a*d-c*f,e[t+3]=h*g-a*f-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),f=a(r/2),d=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*f+l*p*g,this._y=l*p*f-d*h*g,this._z=l*h*g+d*p*f,this._w=l*h*f-d*p*g;break;case"YXZ":this._x=d*h*f+l*p*g,this._y=l*p*f-d*h*g,this._z=l*h*g-d*p*f,this._w=l*h*f+d*p*g;break;case"ZXY":this._x=d*h*f-l*p*g,this._y=l*p*f+d*h*g,this._z=l*h*g+d*p*f,this._w=l*h*f-d*p*g;break;case"ZYX":this._x=d*h*f-l*p*g,this._y=l*p*f+d*h*g,this._z=l*h*g-d*p*f,this._w=l*h*f+d*p*g;break;case"YZX":this._x=d*h*f+l*p*g,this._y=l*p*f+d*h*g,this._z=l*h*g-d*p*f,this._w=l*h*f-d*p*g;break;case"XZY":this._x=d*h*f-l*p*g,this._y=l*p*f-d*h*g,this._z=l*h*g+d*p*f,this._w=l*h*f+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],f=t[10],d=n+a+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>f){const p=2*Math.sqrt(1+n-a-f);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>f){const p=2*Math.sqrt(1+a-n-f);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+f-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Bt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*f+this._w*d,this._x=n*f+this._x*d,this._y=s*f+this._y*d,this._z=r*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ah.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ah.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),f=2*(r*n-o*t);return this.x=t+c*l+o*f-a*h,this.y=n+c*h+a*l-r*f,this.z=s+c*f+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Da.copy(this).projectOnVector(e),this.sub(Da)}reflect(e){return this.sub(Da.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Da=new I,Ah=new pn;class ai{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Hn):Hn.fromBufferAttribute(r,o),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),io.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),io.copy(n.boundingBox)),io.applyMatrix4(e.matrixWorld),this.union(io)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xr),so.subVectors(this.max,xr),ws.subVectors(e.a,xr),bs.subVectors(e.b,xr),Es.subVectors(e.c,xr),Pi.subVectors(bs,ws),Li.subVectors(Es,bs),Qi.subVectors(ws,Es);let t=[0,-Pi.z,Pi.y,0,-Li.z,Li.y,0,-Qi.z,Qi.y,Pi.z,0,-Pi.x,Li.z,0,-Li.x,Qi.z,0,-Qi.x,-Pi.y,Pi.x,0,-Li.y,Li.x,0,-Qi.y,Qi.x,0];return!Na(t,ws,bs,Es,so)||(t=[1,0,0,0,1,0,0,0,1],!Na(t,ws,bs,Es,so))?!1:(ro.crossVectors(Pi,Li),t=[ro.x,ro.y,ro.z],Na(t,ws,bs,Es,so))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const fi=[new I,new I,new I,new I,new I,new I,new I,new I],Hn=new I,io=new ai,ws=new I,bs=new I,Es=new I,Pi=new I,Li=new I,Qi=new I,xr=new I,so=new I,ro=new I,es=new I;function Na(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){es.fromArray(i,r);const a=s.x*Math.abs(es.x)+s.y*Math.abs(es.y)+s.z*Math.abs(es.z),c=e.dot(es),l=t.dot(es),h=n.dot(es);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Kp=new ai,vr=new I,Ua=new I;class ci{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Kp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vr.subVectors(e,this.center);const t=vr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(vr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ua.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vr.copy(e.center).add(Ua)),this.expandByPoint(vr.copy(e.center).sub(Ua))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const pi=new I,Fa=new I,oo=new I,Ii=new I,Oa=new I,ao=new I,Ba=new I;class xa{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Fa.copy(e).add(t).multiplyScalar(.5),oo.copy(t).sub(e).normalize(),Ii.copy(this.origin).sub(Fa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(oo),a=Ii.dot(this.direction),c=-Ii.dot(oo),l=Ii.lengthSq(),h=Math.abs(1-o*o);let f,d,p,g;if(h>0)if(f=o*c-a,d=o*a-c,g=r*h,f>=0)if(d>=-g)if(d<=g){const _=1/h;f*=_,d*=_,p=f*(f+o*d+2*a)+d*(o*f+d+2*c)+l}else d=r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;else d<=-g?(f=Math.max(0,-(-o*r+a)),d=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+d*(d+2*c)+l):d<=g?(f=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(f=Math.max(0,-(o*r+a)),d=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+d*(d+2*c)+l);else d=o>0?-r:r,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Fa).addScaledVector(oo,d),p}intersectSphere(e,t){pi.subVectors(e.center,this.origin);const n=pi.dot(this.direction),s=pi.dot(pi)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,n,s,r){Oa.subVectors(t,e),ao.subVectors(n,e),Ba.crossVectors(Oa,ao);let o=this.direction.dot(Ba),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ii.subVectors(this.origin,e);const c=a*this.direction.dot(ao.crossVectors(Ii,ao));if(c<0)return null;const l=a*this.direction.dot(Oa.cross(Ii));if(l<0||c+l>o)return null;const h=-a*Ii.dot(Ba);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qe{constructor(e,t,n,s,r,o,a,c,l,h,f,d,p,g,_,u){qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,f,d,p,g,_,u)}set(e,t,n,s,r,o,a,c,l,h,f,d,p,g,_,u){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=f,m[14]=d,m[3]=p,m[7]=g,m[11]=_,m[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ts.setFromMatrixColumn(e,0).length(),r=1/Ts.setFromMatrixColumn(e,1).length(),o=1/Ts.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const d=o*h,p=o*f,g=a*h,_=a*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=p+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,p=c*f,g=l*h,_=l*f;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*f,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,p=c*f,g=l*h,_=l*f;t[0]=d-_*a,t[4]=-o*f,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,p=o*f,g=a*h,_=a*f;t[0]=c*h,t[4]=g*l-p,t[8]=d*l+_,t[1]=c*f,t[5]=_*l+d,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*f,t[8]=g*f+p,t[1]=f,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*f+g,t[10]=d-_*f}else if(e.order==="XZY"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=d*f+_,t[5]=o*h,t[9]=p*f-g,t[2]=g*f-p,t[6]=a*h,t[10]=_*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yp,e,$p)}lookAt(e,t,n){const s=this.elements;return En.subVectors(e,t),En.lengthSq()===0&&(En.z=1),En.normalize(),Di.crossVectors(n,En),Di.lengthSq()===0&&(Math.abs(n.z)===1?En.x+=1e-4:En.z+=1e-4,En.normalize(),Di.crossVectors(n,En)),Di.normalize(),co.crossVectors(En,Di),s[0]=Di.x,s[4]=co.x,s[8]=En.x,s[1]=Di.y,s[5]=co.y,s[9]=En.y,s[2]=Di.z,s[6]=co.z,s[10]=En.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],d=n[9],p=n[13],g=n[2],_=n[6],u=n[10],m=n[14],y=n[3],x=n[7],M=n[11],A=n[15],S=s[0],b=s[4],T=s[8],L=s[12],v=s[1],w=s[5],F=s[9],U=s[13],N=s[2],z=s[6],D=s[10],X=s[14],V=s[3],te=s[7],oe=s[11],ce=s[15];return r[0]=o*S+a*v+c*N+l*V,r[4]=o*b+a*w+c*z+l*te,r[8]=o*T+a*F+c*D+l*oe,r[12]=o*L+a*U+c*X+l*ce,r[1]=h*S+f*v+d*N+p*V,r[5]=h*b+f*w+d*z+p*te,r[9]=h*T+f*F+d*D+p*oe,r[13]=h*L+f*U+d*X+p*ce,r[2]=g*S+_*v+u*N+m*V,r[6]=g*b+_*w+u*z+m*te,r[10]=g*T+_*F+u*D+m*oe,r[14]=g*L+_*U+u*X+m*ce,r[3]=y*S+x*v+M*N+A*V,r[7]=y*b+x*w+M*z+A*te,r[11]=y*T+x*F+M*D+A*oe,r[15]=y*L+x*U+M*X+A*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],f=e[6],d=e[10],p=e[14],g=e[3],_=e[7],u=e[11],m=e[15];return g*(+r*c*f-s*l*f-r*a*d+n*l*d+s*a*p-n*c*p)+_*(+t*c*p-t*l*d+r*o*d-s*o*p+s*l*h-r*c*h)+u*(+t*l*f-t*a*p-r*o*f+n*o*p+r*a*h-n*l*h)+m*(-s*a*h-t*c*f+t*a*d+s*o*f-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],f=e[9],d=e[10],p=e[11],g=e[12],_=e[13],u=e[14],m=e[15],y=f*u*l-_*d*l+_*c*p-a*u*p-f*c*m+a*d*m,x=g*d*l-h*u*l-g*c*p+o*u*p+h*c*m-o*d*m,M=h*_*l-g*f*l+g*a*p-o*_*p-h*a*m+o*f*m,A=g*f*c-h*_*c-g*a*d+o*_*d+h*a*u-o*f*u,S=t*y+n*x+s*M+r*A;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/S;return e[0]=y*b,e[1]=(_*d*r-f*u*r-_*s*p+n*u*p+f*s*m-n*d*m)*b,e[2]=(a*u*r-_*c*r+_*s*l-n*u*l-a*s*m+n*c*m)*b,e[3]=(f*c*r-a*d*r-f*s*l+n*d*l+a*s*p-n*c*p)*b,e[4]=x*b,e[5]=(h*u*r-g*d*r+g*s*p-t*u*p-h*s*m+t*d*m)*b,e[6]=(g*c*r-o*u*r-g*s*l+t*u*l+o*s*m-t*c*m)*b,e[7]=(o*d*r-h*c*r+h*s*l-t*d*l-o*s*p+t*c*p)*b,e[8]=M*b,e[9]=(g*f*r-h*_*r-g*n*p+t*_*p+h*n*m-t*f*m)*b,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*m+t*a*m)*b,e[11]=(h*a*r-o*f*r-h*n*l+t*f*l+o*n*p-t*a*p)*b,e[12]=A*b,e[13]=(h*_*s-g*f*s+g*n*d-t*_*d-h*n*u+t*f*u)*b,e[14]=(g*a*s-o*_*s-g*n*c+t*_*c+o*n*u-t*a*u)*b,e[15]=(o*f*s-h*a*s+h*n*c-t*f*c-o*n*d+t*a*d)*b,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,f=a+a,d=r*l,p=r*h,g=r*f,_=o*h,u=o*f,m=a*f,y=c*l,x=c*h,M=c*f,A=n.x,S=n.y,b=n.z;return s[0]=(1-(_+m))*A,s[1]=(p+M)*A,s[2]=(g-x)*A,s[3]=0,s[4]=(p-M)*S,s[5]=(1-(d+m))*S,s[6]=(u+y)*S,s[7]=0,s[8]=(g+x)*b,s[9]=(u-y)*b,s[10]=(1-(d+_))*b,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ts.set(s[0],s[1],s[2]).length();const o=Ts.set(s[4],s[5],s[6]).length(),a=Ts.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Vn.copy(this);const l=1/r,h=1/o,f=1/a;return Vn.elements[0]*=l,Vn.elements[1]*=l,Vn.elements[2]*=l,Vn.elements[4]*=h,Vn.elements[5]*=h,Vn.elements[6]*=h,Vn.elements[8]*=f,Vn.elements[9]*=f,Vn.elements[10]*=f,t.setFromRotationMatrix(Vn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Ei){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s);let p,g;if(a===Ei)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ca)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Ei){const c=this.elements,l=1/(t-e),h=1/(n-s),f=1/(o-r),d=(t+e)*l,p=(n+s)*h;let g,_;if(a===Ei)g=(o+r)*f,_=-2*f;else if(a===ca)g=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ts=new I,Vn=new qe,Yp=new I(0,0,0),$p=new I(1,1,1),Di=new I,co=new I,En=new I,Rh=new qe,Ch=new pn;class Sn{constructor(e=0,t=0,n=0,s=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],f=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Bt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Bt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Bt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ch.setFromEuler(this),this.setFromQuaternion(Ch,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class Rd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jp=0;const Ph=new I,As=new pn,mi=new qe,lo=new I,yr=new I,Zp=new I,Jp=new pn,Lh=new I(1,0,0),Ih=new I(0,1,0),Dh=new I(0,0,1),Nh={type:"added"},Qp={type:"removed"},Rs={type:"childadded",child:null},za={type:"childremoved",child:null};class xt extends fr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jp++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new I,t=new Sn,n=new pn,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qe},normalMatrix:{value:new Ze}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(Lh,e)}rotateY(e){return this.rotateOnAxis(Ih,e)}rotateZ(e){return this.rotateOnAxis(Dh,e)}translateOnAxis(e,t){return Ph.copy(e).applyQuaternion(this.quaternion),this.position.add(Ph.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Lh,e)}translateY(e){return this.translateOnAxis(Ih,e)}translateZ(e){return this.translateOnAxis(Dh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?lo.copy(e):lo.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(yr,lo,this.up):mi.lookAt(lo,yr,this.up),this.quaternion.setFromRotationMatrix(mi),s&&(mi.extractRotation(s.matrixWorld),As.setFromRotationMatrix(mi),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nh),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qp),za.child=e,this.dispatchEvent(za),za.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nh),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,e,Zp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,Jp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}xt.DEFAULT_UP=new I(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Gn=new I,gi=new I,ka=new I,_i=new I,Cs=new I,Ps=new I,Uh=new I,Ha=new I,Va=new I,Ga=new I,Wa=new at,Xa=new at,qa=new at;class Fn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Gn.subVectors(e,t),s.cross(Gn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Gn.subVectors(s,t),gi.subVectors(n,t),ka.subVectors(e,t);const o=Gn.dot(Gn),a=Gn.dot(gi),c=Gn.dot(ka),l=gi.dot(gi),h=gi.dot(ka),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const d=1/f,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,_i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,_i.x),c.addScaledVector(o,_i.y),c.addScaledVector(a,_i.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Wa.setScalar(0),Xa.setScalar(0),qa.setScalar(0),Wa.fromBufferAttribute(e,t),Xa.fromBufferAttribute(e,n),qa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Wa,r.x),o.addScaledVector(Xa,r.y),o.addScaledVector(qa,r.z),o}static isFrontFacing(e,t,n,s){return Gn.subVectors(n,t),gi.subVectors(e,t),Gn.cross(gi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Gn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Fn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Cs.subVectors(s,n),Ps.subVectors(r,n),Ha.subVectors(e,n);const c=Cs.dot(Ha),l=Ps.dot(Ha);if(c<=0&&l<=0)return t.copy(n);Va.subVectors(e,s);const h=Cs.dot(Va),f=Ps.dot(Va);if(h>=0&&f<=h)return t.copy(s);const d=c*f-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Cs,o);Ga.subVectors(e,r);const p=Cs.dot(Ga),g=Ps.dot(Ga);if(g>=0&&p<=g)return t.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Ps,a);const u=h*g-p*f;if(u<=0&&f-h>=0&&p-g>=0)return Uh.subVectors(r,s),a=(f-h)/(f-h+(p-g)),t.copy(s).addScaledVector(Uh,a);const m=1/(u+_+d);return o=_*m,a=d*m,t.copy(n).addScaledVector(Cs,o).addScaledVector(Ps,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Cd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},ho={h:0,s:0,l:0};function Ka(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,rt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=rt.workingColorSpace){if(e=Ol(e,1),t=Bt(t,0,1),n=Bt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ka(o,r,e+1/3),this.g=Ka(o,r,e),this.b=Ka(o,r,e-1/3)}return rt.toWorkingColorSpace(this,s),this}setStyle(e,t=nn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){const n=Cd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$s(e.r),this.g=$s(e.g),this.b=$s(e.b),this}copyLinearToSRGB(e){return this.r=La(e.r),this.g=La(e.g),this.b=La(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return rt.fromWorkingColorSpace(Qt.copy(this),e),Math.round(Bt(Qt.r*255,0,255))*65536+Math.round(Bt(Qt.g*255,0,255))*256+Math.round(Bt(Qt.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.fromWorkingColorSpace(Qt.copy(this),t);const n=Qt.r,s=Qt.g,r=Qt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=rt.workingColorSpace){return rt.fromWorkingColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=nn){rt.fromWorkingColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,s=Qt.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+t,Ni.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ni),e.getHSL(ho);const n=Or(Ni.h,ho.h,t),s=Or(Ni.s,ho.s,t),r=Or(Ni.l,ho.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new ze;ze.NAMES=Cd;let em=0;class Zn extends fr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=Ks,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ac,this.blendDst=Rc,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ms,this.stencilZFail=Ms,this.stencilZPass=Ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ks&&(n.blending=this.blending),this.side!==Ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ac&&(n.blendSrc=this.blendSrc),this.blendDst!==Rc&&(n.blendDst=this.blendDst),this.blendEquation!==cs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==nr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ms&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ms&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ms&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Pt extends Zn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=ld,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wi=tm();function tm(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(l&8388608);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function nm(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Bt(i,-65504,65504),wi.floatView[0]=i;const e=wi.uint32View[0],t=e>>23&511;return wi.baseTable[t]+((e&8388607)>>wi.shiftTable[t])}function im(i){const e=i>>10;return wi.uint32View[0]=wi.mantissaTable[wi.offsetTable[e]+(i&1023)]+wi.exponentTable[e],wi.floatView[0]}const uo={toHalfFloat:nm,fromHalfFloat:im},It=new I,fo=new he;class qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ul,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fo.fromBufferAttribute(this,t),fo.applyMatrix3(e),this.setXY(t,fo.x,fo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array),r=dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ul&&(e.usage=this.usage),e}}class Pd extends qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ld extends qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class mt extends qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let sm=0;const Pn=new qe,Ya=new xt,Ls=new I,Tn=new ai,Mr=new ai,Vt=new I;class Ot extends fr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ed(e)?Ld:Pd)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,t,n){return Pn.makeTranslation(e,t,n),this.applyMatrix4(Pn),this}scale(e,t,n){return Pn.makeScale(e,t,n),this.applyMatrix4(Pn),this}lookAt(e){return Ya.lookAt(e),Ya.updateMatrix(),this.applyMatrix4(Ya.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ls).negate(),this.translate(Ls.x,Ls.y,Ls.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new mt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ci);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Tn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Mr.setFromBufferAttribute(a),this.morphTargetsRelative?(Vt.addVectors(Tn.min,Mr.min),Tn.expandByPoint(Vt),Vt.addVectors(Tn.max,Mr.max),Tn.expandByPoint(Vt)):(Tn.expandByPoint(Mr.min),Tn.expandByPoint(Mr.max))}Tn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Vt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Vt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Vt.fromBufferAttribute(a,l),c&&(Ls.fromBufferAttribute(e,l),Vt.add(Ls)),s=Math.max(s,n.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let T=0;T<n.count;T++)a[T]=new I,c[T]=new I;const l=new I,h=new I,f=new I,d=new he,p=new he,g=new he,_=new I,u=new I;function m(T,L,v){l.fromBufferAttribute(n,T),h.fromBufferAttribute(n,L),f.fromBufferAttribute(n,v),d.fromBufferAttribute(r,T),p.fromBufferAttribute(r,L),g.fromBufferAttribute(r,v),h.sub(l),f.sub(l),p.sub(d),g.sub(d);const w=1/(p.x*g.y-g.x*p.y);isFinite(w)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(w),u.copy(f).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(w),a[T].add(_),a[L].add(_),a[v].add(_),c[T].add(u),c[L].add(u),c[v].add(u))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let T=0,L=y.length;T<L;++T){const v=y[T],w=v.start,F=v.count;for(let U=w,N=w+F;U<N;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const x=new I,M=new I,A=new I,S=new I;function b(T){A.fromBufferAttribute(s,T),S.copy(A);const L=a[T];x.copy(L),x.sub(A.multiplyScalar(A.dot(L))).normalize(),M.crossVectors(S,L);const w=M.dot(c[T])<0?-1:1;o.setXYZW(T,x.x,x.y,x.z,w)}for(let T=0,L=y.length;T<L;++T){const v=y[T],w=v.start,F=v.count;for(let U=w,N=w+F;U<N;U+=3)b(e.getX(U+0)),b(e.getX(U+1)),b(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new I,r=new I,o=new I,a=new I,c=new I,l=new I,h=new I,f=new I;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),_=e.getX(d+1),u=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,u),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,u),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(u,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,f=a.normalized,d=new l.constructor(c.length*h);let p=0,g=0;for(let _=0,u=c.length;_<u;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let m=0;m<h;m++)d[g++]=l[p++]}return new qt(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ot,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,f=l.length;h<f;h++){const d=l[h],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,d=l.length;f<d;f++){const p=l[f];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],f=r[l];for(let d=0,p=f.length;d<p;d++)h.push(f[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fh=new qe,ts=new xa,po=new ci,Oh=new I,mo=new I,go=new I,_o=new I,$a=new I,xo=new I,Bh=new I,vo=new I;class Q extends xt{constructor(e=new Ot,t=new Pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){xo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],f=r[c];h!==0&&($a.fromBufferAttribute(f,e),o?xo.addScaledVector($a,h):xo.addScaledVector($a.sub(t),h))}t.add(xo)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(r),ts.copy(e.ray).recast(e.near),!(po.containsPoint(ts.origin)===!1&&(ts.intersectSphere(po,Oh)===null||ts.origin.distanceToSquared(Oh)>(e.far-e.near)**2))&&(Fh.copy(r).invert(),ts.copy(e.ray).applyMatrix4(Fh),!(n.boundingBox!==null&&ts.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ts)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const u=d[g],m=o[u.materialIndex],y=Math.max(u.start,p.start),x=Math.min(a.count,Math.min(u.start+u.count,p.start+p.count));for(let M=y,A=x;M<A;M+=3){const S=a.getX(M),b=a.getX(M+1),T=a.getX(M+2);s=yo(this,m,e,n,l,h,f,S,b,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=u.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let u=g,m=_;u<m;u+=3){const y=a.getX(u),x=a.getX(u+1),M=a.getX(u+2);s=yo(this,o,e,n,l,h,f,y,x,M),s&&(s.faceIndex=Math.floor(u/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const u=d[g],m=o[u.materialIndex],y=Math.max(u.start,p.start),x=Math.min(c.count,Math.min(u.start+u.count,p.start+p.count));for(let M=y,A=x;M<A;M+=3){const S=M,b=M+1,T=M+2;s=yo(this,m,e,n,l,h,f,S,b,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=u.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let u=g,m=_;u<m;u+=3){const y=u,x=u+1,M=u+2;s=yo(this,o,e,n,l,h,f,y,x,M),s&&(s.faceIndex=Math.floor(u/3),t.push(s))}}}}function rm(i,e,t,n,s,r,o,a){let c;if(e.side===fn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Ti,a),c===null)return null;vo.copy(a),vo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(vo);return l<t.near||l>t.far?null:{distance:l,point:vo.clone(),object:i}}function yo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,mo),i.getVertexPosition(c,go),i.getVertexPosition(l,_o);const h=rm(i,e,t,n,mo,go,_o,Bh);if(h){const f=new I;Fn.getBarycoord(Bh,mo,go,_o,f),s&&(h.uv=Fn.getInterpolatedAttribute(s,a,c,l,f,new he)),r&&(h.uv1=Fn.getInterpolatedAttribute(r,a,c,l,f,new he)),o&&(h.normal=Fn.getInterpolatedAttribute(o,a,c,l,f,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new I,materialIndex:0};Fn.getNormal(mo,go,_o,d.normal),h.face=d,h.barycoord=f}return h}class Ee extends Ot{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],f=[];let d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(f,2));function g(_,u,m,y,x,M,A,S,b,T,L){const v=M/b,w=A/T,F=M/2,U=A/2,N=S/2,z=b+1,D=T+1;let X=0,V=0;const te=new I;for(let oe=0;oe<D;oe++){const ce=oe*w-U;for(let Le=0;Le<z;Le++){const Ce=Le*v-F;te[_]=Ce*y,te[u]=ce*x,te[m]=N,l.push(te.x,te.y,te.z),te[_]=0,te[u]=0,te[m]=S>0?1:-1,h.push(te.x,te.y,te.z),f.push(Le/b),f.push(1-oe/T),X+=1}}for(let oe=0;oe<T;oe++)for(let ce=0;ce<b;ce++){const Le=d+ce+z*oe,Ce=d+ce+z*(oe+1),q=d+(ce+1)+z*(oe+1),re=d+(ce+1)+z*oe;c.push(Le,Ce,re),c.push(Ce,q,re),V+=6}a.addGroup(p,V,L),p+=V,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ee(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function cr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function an(i){const e={};for(let t=0;t<i.length;t++){const n=cr(i[t]);for(const s in n)e[s]=n[s]}return e}function om(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Id(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}const Dd={clone:cr,merge:an};var am=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ri extends Zn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=am,this.fragmentShader=cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cr(e.uniforms),this.uniformsGroups=om(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Nd extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=Ei}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ui=new I,zh=new he,kh=new he;class ln extends Nd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ar*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Fr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(Fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,t){return this.getViewBounds(e,zh,kh),t.subVectors(kh,zh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Fr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Is=-90,Ds=1;class lm extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ln(Is,Ds,e,t);s.layers=this.layers,this.add(s);const r=new ln(Is,Ds,e,t);r.layers=this.layers,this.add(r);const o=new ln(Is,Ds,e,t);o.layers=this.layers,this.add(o);const a=new ln(Is,Ds,e,t);a.layers=this.layers,this.add(a);const c=new ln(Is,Ds,e,t);c.layers=this.layers,this.add(c);const l=new ln(Is,Ds,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Ei)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ca)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(f,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ud extends zt{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:ir,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hm extends fs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ud(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Xt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ee(5,5,5),r=new Ri({name:"CubemapFromEquirect",uniforms:cr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:fn,blending:Yi});r.uniforms.tEquirect.value=t;const o=new Q(s,r),a=t.minFilter;return t.minFilter===ii&&(t.minFilter=Xt),new lm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const ja=new I,um=new I,dm=new Ze;class os{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ja.subVectors(n,t).cross(um.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ja),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||dm.getNormalMatrix(e),s=this.coplanarPoint(ja).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ns=new ci,Mo=new I;class Bl{constructor(e=new os,t=new os,n=new os,s=new os,r=new os,o=new os){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ei){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],f=s[6],d=s[7],p=s[8],g=s[9],_=s[10],u=s[11],m=s[12],y=s[13],x=s[14],M=s[15];if(n[0].setComponents(c-r,d-l,u-p,M-m).normalize(),n[1].setComponents(c+r,d+l,u+p,M+m).normalize(),n[2].setComponents(c+o,d+h,u+g,M+y).normalize(),n[3].setComponents(c-o,d-h,u-g,M-y).normalize(),n[4].setComponents(c-a,d-f,u-_,M-x).normalize(),t===Ei)n[5].setComponents(c+a,d+f,u+_,M+x).normalize();else if(t===ca)n[5].setComponents(a,f,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ns.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ns)}intersectsSprite(e){return ns.center.set(0,0,0),ns.radius=.7071067811865476,ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(ns)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Mo.x=s.normal.x>0?e.max.x:e.min.x,Mo.y=s.normal.y>0?e.max.y:e.min.y,Mo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Mo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Fd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function fm(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,f=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<f.length;p++){const g=f[d],_=f[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,f[d]=_)}f.length=d+1;for(let p=0,g=f.length;p<g;p++){const _=f[p];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class Zt extends Ot{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,f=e/a,d=t/c,p=[],g=[],_=[],u=[];for(let m=0;m<h;m++){const y=m*d-o;for(let x=0;x<l;x++){const M=x*f-r;g.push(M,-y,0),_.push(0,0,1),u.push(x/a),u.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<a;y++){const x=y+l*m,M=y+l*(m+1),A=y+1+l*(m+1),S=y+1+l*m;p.push(x,M,S),p.push(M,A,S)}this.setIndex(p),this.setAttribute("position",new mt(g,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zt(e.width,e.height,e.widthSegments,e.heightSegments)}}var pm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mm=`#ifdef USE_ALPHAHASH
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
#endif`,gm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_m=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ym=`#ifdef USE_AOMAP
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
#endif`,Mm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sm=`#ifdef USE_BATCHING
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
#endif`,wm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Em=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Am=`#ifdef USE_IRIDESCENCE
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
#endif`,Rm=`#ifdef USE_BUMPMAP
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
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Nm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Um=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Fm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Om=`#define PI 3.141592653589793
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
} // validated`,Bm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zm=`vec3 transformedNormal = objectNormal;
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
#endif`,km=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xm=`
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
}`,qm=`#ifdef USE_ENVMAP
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
#endif`,Km=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ym=`#ifdef USE_ENVMAP
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
#endif`,$m=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jm=`#ifdef USE_ENVMAP
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
#endif`,Zm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,e0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,t0=`#ifdef USE_GRADIENTMAP
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
}`,n0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,i0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,s0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,r0=`uniform bool receiveShadow;
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
#endif`,o0=`#ifdef USE_ENVMAP
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
#endif`,a0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,c0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,l0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,h0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,u0=`PhysicalMaterial material;
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
#endif`,d0=`struct PhysicalMaterial {
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
}`,f0=`
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
#endif`,p0=`#if defined( RE_IndirectDiffuse )
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
#endif`,m0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,g0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,x0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,v0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,y0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,M0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,S0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,w0=`#if defined( USE_POINTS_UV )
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
#endif`,b0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,E0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,T0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,A0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,R0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,C0=`#ifdef USE_MORPHTARGETS
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
#endif`,P0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,I0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,D0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,U0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,F0=`#ifdef USE_NORMALMAP
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
#endif`,O0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,B0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,z0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,k0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,H0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,V0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,G0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,W0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,X0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,q0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,K0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Y0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,j0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Z0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,J0=`float getShadowMask() {
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
}`,Q0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,eg=`#ifdef USE_SKINNING
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
#endif`,tg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ng=`#ifdef USE_SKINNING
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
#endif`,ig=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,og=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ag=`#ifdef USE_TRANSMISSION
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
#endif`,cg=`#ifdef USE_TRANSMISSION
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
#endif`,lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pg=`uniform sampler2D t2D;
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
}`,mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`#include <common>
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
}`,yg=`#if DEPTH_PACKING == 3200
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
}`,Mg=`#define DISTANCE
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
}`,Sg=`#define DISTANCE
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
}`,wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`uniform float scale;
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
}`,Tg=`uniform vec3 diffuse;
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
}`,Ag=`#include <common>
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
}`,Rg=`uniform vec3 diffuse;
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
}`,Cg=`#define LAMBERT
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
}`,Pg=`#define LAMBERT
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
}`,Lg=`#define MATCAP
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
}`,Ig=`#define MATCAP
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
}`,Dg=`#define NORMAL
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
}`,Ng=`#define NORMAL
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
}`,Ug=`#define PHONG
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
}`,Fg=`#define PHONG
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
}`,Og=`#define STANDARD
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
}`,Bg=`#define STANDARD
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
}`,zg=`#define TOON
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
}`,kg=`#define TOON
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
}`,Hg=`uniform float size;
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
}`,Vg=`uniform vec3 diffuse;
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
}`,Gg=`#include <common>
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
}`,Wg=`uniform vec3 color;
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
}`,Xg=`uniform float rotation;
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
}`,qg=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:pm,alphahash_pars_fragment:mm,alphamap_fragment:gm,alphamap_pars_fragment:_m,alphatest_fragment:xm,alphatest_pars_fragment:vm,aomap_fragment:ym,aomap_pars_fragment:Mm,batching_pars_vertex:Sm,batching_vertex:wm,begin_vertex:bm,beginnormal_vertex:Em,bsdfs:Tm,iridescence_fragment:Am,bumpmap_pars_fragment:Rm,clipping_planes_fragment:Cm,clipping_planes_pars_fragment:Pm,clipping_planes_pars_vertex:Lm,clipping_planes_vertex:Im,color_fragment:Dm,color_pars_fragment:Nm,color_pars_vertex:Um,color_vertex:Fm,common:Om,cube_uv_reflection_fragment:Bm,defaultnormal_vertex:zm,displacementmap_pars_vertex:km,displacementmap_vertex:Hm,emissivemap_fragment:Vm,emissivemap_pars_fragment:Gm,colorspace_fragment:Wm,colorspace_pars_fragment:Xm,envmap_fragment:qm,envmap_common_pars_fragment:Km,envmap_pars_fragment:Ym,envmap_pars_vertex:$m,envmap_physical_pars_fragment:o0,envmap_vertex:jm,fog_vertex:Zm,fog_pars_vertex:Jm,fog_fragment:Qm,fog_pars_fragment:e0,gradientmap_pars_fragment:t0,lightmap_pars_fragment:n0,lights_lambert_fragment:i0,lights_lambert_pars_fragment:s0,lights_pars_begin:r0,lights_toon_fragment:a0,lights_toon_pars_fragment:c0,lights_phong_fragment:l0,lights_phong_pars_fragment:h0,lights_physical_fragment:u0,lights_physical_pars_fragment:d0,lights_fragment_begin:f0,lights_fragment_maps:p0,lights_fragment_end:m0,logdepthbuf_fragment:g0,logdepthbuf_pars_fragment:_0,logdepthbuf_pars_vertex:x0,logdepthbuf_vertex:v0,map_fragment:y0,map_pars_fragment:M0,map_particle_fragment:S0,map_particle_pars_fragment:w0,metalnessmap_fragment:b0,metalnessmap_pars_fragment:E0,morphinstance_vertex:T0,morphcolor_vertex:A0,morphnormal_vertex:R0,morphtarget_pars_vertex:C0,morphtarget_vertex:P0,normal_fragment_begin:L0,normal_fragment_maps:I0,normal_pars_fragment:D0,normal_pars_vertex:N0,normal_vertex:U0,normalmap_pars_fragment:F0,clearcoat_normal_fragment_begin:O0,clearcoat_normal_fragment_maps:B0,clearcoat_pars_fragment:z0,iridescence_pars_fragment:k0,opaque_fragment:H0,packing:V0,premultiplied_alpha_fragment:G0,project_vertex:W0,dithering_fragment:X0,dithering_pars_fragment:q0,roughnessmap_fragment:K0,roughnessmap_pars_fragment:Y0,shadowmap_pars_fragment:$0,shadowmap_pars_vertex:j0,shadowmap_vertex:Z0,shadowmask_pars_fragment:J0,skinbase_vertex:Q0,skinning_pars_vertex:eg,skinning_vertex:tg,skinnormal_vertex:ng,specularmap_fragment:ig,specularmap_pars_fragment:sg,tonemapping_fragment:rg,tonemapping_pars_fragment:og,transmission_fragment:ag,transmission_pars_fragment:cg,uv_pars_fragment:lg,uv_pars_vertex:hg,uv_vertex:ug,worldpos_vertex:dg,background_vert:fg,background_frag:pg,backgroundCube_vert:mg,backgroundCube_frag:gg,cube_vert:_g,cube_frag:xg,depth_vert:vg,depth_frag:yg,distanceRGBA_vert:Mg,distanceRGBA_frag:Sg,equirect_vert:wg,equirect_frag:bg,linedashed_vert:Eg,linedashed_frag:Tg,meshbasic_vert:Ag,meshbasic_frag:Rg,meshlambert_vert:Cg,meshlambert_frag:Pg,meshmatcap_vert:Lg,meshmatcap_frag:Ig,meshnormal_vert:Dg,meshnormal_frag:Ng,meshphong_vert:Ug,meshphong_frag:Fg,meshphysical_vert:Og,meshphysical_frag:Bg,meshtoon_vert:zg,meshtoon_frag:kg,points_vert:Hg,points_frag:Vg,shadow_vert:Gg,shadow_frag:Wg,sprite_vert:Xg,sprite_frag:qg},ge={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},ti={basic:{uniforms:an([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:an([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new ze(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:an([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:an([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:an([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new ze(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:an([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:an([ge.points,ge.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:an([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:an([ge.common,ge.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:an([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:an([ge.sprite,ge.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:an([ge.common,ge.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:an([ge.lights,ge.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};ti.physical={uniforms:an([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const So={r:0,b:0,g:0},is=new Sn,Kg=new qe;function Yg(i,e,t,n,s,r,o){const a=new ze(0);let c=r===!0?0:1,l,h,f=null,d=0,p=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?t:e).get(x)),x}function _(y){let x=!1;const M=g(y);M===null?m(a,c):M&&M.isColor&&(m(M,1),x=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function u(y,x){const M=g(x);M&&(M.isCubeTexture||M.mapping===ga)?(h===void 0&&(h=new Q(new Ee(1,1,1),new Ri({name:"BackgroundCubeMaterial",uniforms:cr(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,S,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),is.copy(x.backgroundRotation),is.x*=-1,is.y*=-1,is.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(is.y*=-1,is.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Kg.makeRotationFromEuler(is)),h.material.toneMapped=rt.getTransfer(M.colorSpace)!==yt,(f!==M||d!==M.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,f=M,d=M.version,p=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Q(new Zt(2,2),new Ri({name:"BackgroundMaterial",uniforms:cr(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=rt.getTransfer(M.colorSpace)!==yt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||d!==M.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,f=M,d=M.version,p=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,x){y.getRGB(So,Id(i)),n.buffers.color.setClear(So.r,So.g,So.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),c=x,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,m(a,c)},render:_,addToRenderList:u}}function $g(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(v,w,F,U,N){let z=!1;const D=f(U,F,w);r!==D&&(r=D,l(r.object)),z=p(v,U,F,N),z&&g(v,U,F,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,M(v,w,F,U),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function c(){return i.createVertexArray()}function l(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function f(v,w,F){const U=F.wireframe===!0;let N=n[v.id];N===void 0&&(N={},n[v.id]=N);let z=N[w.id];z===void 0&&(z={},N[w.id]=z);let D=z[U];return D===void 0&&(D=d(c()),z[U]=D),D}function d(v){const w=[],F=[],U=[];for(let N=0;N<t;N++)w[N]=0,F[N]=0,U[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:F,attributeDivisors:U,object:v,attributes:{},index:null}}function p(v,w,F,U){const N=r.attributes,z=w.attributes;let D=0;const X=F.getAttributes();for(const V in X)if(X[V].location>=0){const oe=N[V];let ce=z[V];if(ce===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(ce=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(ce=v.instanceColor)),oe===void 0||oe.attribute!==ce||ce&&oe.data!==ce.data)return!0;D++}return r.attributesNum!==D||r.index!==U}function g(v,w,F,U){const N={},z=w.attributes;let D=0;const X=F.getAttributes();for(const V in X)if(X[V].location>=0){let oe=z[V];oe===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(oe=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(oe=v.instanceColor));const ce={};ce.attribute=oe,oe&&oe.data&&(ce.data=oe.data),N[V]=ce,D++}r.attributes=N,r.attributesNum=D,r.index=U}function _(){const v=r.newAttributes;for(let w=0,F=v.length;w<F;w++)v[w]=0}function u(v){m(v,0)}function m(v,w){const F=r.newAttributes,U=r.enabledAttributes,N=r.attributeDivisors;F[v]=1,U[v]===0&&(i.enableVertexAttribArray(v),U[v]=1),N[v]!==w&&(i.vertexAttribDivisor(v,w),N[v]=w)}function y(){const v=r.newAttributes,w=r.enabledAttributes;for(let F=0,U=w.length;F<U;F++)w[F]!==v[F]&&(i.disableVertexAttribArray(F),w[F]=0)}function x(v,w,F,U,N,z,D){D===!0?i.vertexAttribIPointer(v,w,F,N,z):i.vertexAttribPointer(v,w,F,U,N,z)}function M(v,w,F,U){_();const N=U.attributes,z=F.getAttributes(),D=w.defaultAttributeValues;for(const X in z){const V=z[X];if(V.location>=0){let te=N[X];if(te===void 0&&(X==="instanceMatrix"&&v.instanceMatrix&&(te=v.instanceMatrix),X==="instanceColor"&&v.instanceColor&&(te=v.instanceColor)),te!==void 0){const oe=te.normalized,ce=te.itemSize,Le=e.get(te);if(Le===void 0)continue;const Ce=Le.buffer,q=Le.type,re=Le.bytesPerElement,xe=q===i.INT||q===i.UNSIGNED_INT||te.gpuType===Cl;if(te.isInterleavedBufferAttribute){const ue=te.data,Ne=ue.stride,Te=te.offset;if(ue.isInstancedInterleavedBuffer){for(let De=0;De<V.locationSize;De++)m(V.location+De,ue.meshPerAttribute);v.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let De=0;De<V.locationSize;De++)u(V.location+De);i.bindBuffer(i.ARRAY_BUFFER,Ce);for(let De=0;De<V.locationSize;De++)x(V.location+De,ce/V.locationSize,q,oe,Ne*re,(Te+ce/V.locationSize*De)*re,xe)}else{if(te.isInstancedBufferAttribute){for(let ue=0;ue<V.locationSize;ue++)m(V.location+ue,te.meshPerAttribute);v.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ue=0;ue<V.locationSize;ue++)u(V.location+ue);i.bindBuffer(i.ARRAY_BUFFER,Ce);for(let ue=0;ue<V.locationSize;ue++)x(V.location+ue,ce/V.locationSize,q,oe,ce*re,ce/V.locationSize*ue*re,xe)}}else if(D!==void 0){const oe=D[X];if(oe!==void 0)switch(oe.length){case 2:i.vertexAttrib2fv(V.location,oe);break;case 3:i.vertexAttrib3fv(V.location,oe);break;case 4:i.vertexAttrib4fv(V.location,oe);break;default:i.vertexAttrib1fv(V.location,oe)}}}}y()}function A(){T();for(const v in n){const w=n[v];for(const F in w){const U=w[F];for(const N in U)h(U[N].object),delete U[N];delete w[F]}delete n[v]}}function S(v){if(n[v.id]===void 0)return;const w=n[v.id];for(const F in w){const U=w[F];for(const N in U)h(U[N].object),delete U[N];delete w[F]}delete n[v.id]}function b(v){for(const w in n){const F=n[w];if(F[v.id]===void 0)continue;const U=F[v.id];for(const N in U)h(U[N].object),delete U[N];delete F[v.id]}}function T(){L(),o=!0,r!==s&&(r=s,l(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:L,dispose:A,releaseStatesOfGeometry:S,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:u,disableUnusedAttributes:y}}function jg(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),t.update(h,n,f))}function a(l,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let p=0;for(let g=0;g<f;g++)p+=h[g];t.update(p,n,1)}function c(l,h,f,d){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_];for(let _=0;_<d.length;_++)t.update(g,n,d[_])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Zg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==On&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const T=b===bi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==Ai&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==vn&&!T)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(d===!0){const b=e.get("EXT_clip_control");b.clipControlEXT(b.LOWER_LEFT_EXT,b.ZERO_TO_ONE_EXT)}const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),u=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,S=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:u,maxAttributes:m,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:M,vertexTextures:A,maxSamples:S}}function Jg(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new os,a=new Ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||n!==0||s;return s=d,n=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,p){const g=f.clippingPlanes,_=f.clipIntersection,u=f.clipShadows,m=i.get(f);if(!s||g===null||g.length===0||r&&!u)r?h(null):l();else{const y=r?0:n,x=y*4;let M=m.clippingState||null;c.value=M,M=h(g,d,x,p);for(let A=0;A!==x;++A)M[A]=t[A];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,d,p,g){const _=f!==null?f.length:0;let u=null;if(_!==0){if(u=c.value,g!==!0||u===null){const m=p+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(u===null||u.length<m)&&(u=new Float32Array(m));for(let x=0,M=p;x!==_;++x,M+=4)o.copy(f[x]).applyMatrix4(y,a),o.normal.toArray(u,M),u[M+3]=o.constant}c.value=u,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,u}}function Qg(i){let e=new WeakMap;function t(o,a){return a===Fc?o.mapping=ir:a===Oc&&(o.mapping=sr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Fc||a===Oc)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new hm(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class zl extends Nd{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Gs=4,Hh=[.125,.215,.35,.446,.526,.582],ls=20,Za=new zl,Vh=new ze;let Ja=null,Qa=0,ec=0,tc=!1;const as=(1+Math.sqrt(5))/2,Ns=1/as,Gh=[new I(-as,Ns,0),new I(as,Ns,0),new I(-Ns,0,as),new I(Ns,0,as),new I(0,as,-Ns),new I(0,as,Ns),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class dl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Ja=this._renderer.getRenderTarget(),Qa=this._renderer.getActiveCubeFace(),ec=this._renderer.getActiveMipmapLevel(),tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ja,Qa,ec),this._renderer.xr.enabled=tc,e.scissorTest=!1,wo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ir||e.mapping===sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ja=this._renderer.getRenderTarget(),Qa=this._renderer.getActiveCubeFace(),ec=this._renderer.getActiveMipmapLevel(),tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:bi,format:On,colorSpace:Kt,depthBuffer:!1},s=Wh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=e_(r)),this._blurMaterial=t_(r,e,t)}return s}_compileMaterial(e){const t=new Q(this._lodPlanes[0],e);this._renderer.compile(t,Za)}_sceneToCubeUV(e,t,n,s){const a=new ln(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Vh),h.toneMapping=$i,h.autoClear=!1;const p=new Pt({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1}),g=new Q(new Ee,p);let _=!1;const u=e.background;u?u.isColor&&(p.color.copy(u),e.background=null,_=!0):(p.color.copy(Vh),_=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):y===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const x=this._cubeSize;wo(s,y*x,m>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=u}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ir||e.mapping===sr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=qh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Q(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;wo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Za)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Gh[(s-r-1)%Gh.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Q(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ls-1),_=r/g,u=isFinite(r)?1+Math.floor(h*_):ls;u>ls&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${u} samples when the maximum is set to ${ls}`);const m=[];let y=0;for(let b=0;b<ls;++b){const T=b/_,L=Math.exp(-T*T/2);m.push(L),b===0?y+=L:b<u&&(y+=2*L)}for(let b=0;b<m.length;b++)m[b]=m[b]/y;d.envMap.value=e.texture,d.samples.value=u,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const M=this._sizeLods[s],A=3*M*(s>x-Gs?s-x+Gs:0),S=4*(this._cubeSize-M);wo(t,A,S,3*M,2*M),c.setRenderTarget(t),c.render(f,Za)}}function e_(i){const e=[],t=[],n=[];let s=i;const r=i-Gs+1+Hh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Gs?c=Hh[o-i+Gs-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,f=1+l,d=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,g=6,_=3,u=2,m=1,y=new Float32Array(_*g*p),x=new Float32Array(u*g*p),M=new Float32Array(m*g*p);for(let S=0;S<p;S++){const b=S%3*2/3-1,T=S>2?0:-1,L=[b,T,0,b+2/3,T,0,b+2/3,T+1,0,b,T,0,b+2/3,T+1,0,b,T+1,0];y.set(L,_*g*S),x.set(d,u*g*S);const v=[S,S,S,S,S,S];M.set(v,m*g*S)}const A=new Ot;A.setAttribute("position",new qt(y,_)),A.setAttribute("uv",new qt(x,u)),A.setAttribute("faceIndex",new qt(M,m)),e.push(A),s>Gs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Wh(i,e,t){const n=new fs(i,e,t);return n.texture.mapping=ga,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function t_(i,e,t){const n=new Float32Array(ls),s=new I(0,1,0);return new Ri({name:"SphericalGaussianBlur",defines:{n:ls,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:kl(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Xh(){return new Ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kl(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function qh(){return new Ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function kl(){return`

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
	`}function n_(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Fc||c===Oc,h=c===ir||c===sr;if(l||h){let f=e.get(a);const d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new dl(i)),f=l?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new dl(i)),f=l?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function i_(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ta("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function s_(i,e,t,n){const s={},r=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let u=0,m=_.length;u<m;u++)e.remove(_[u])}d.removeEventListener("dispose",o),delete s[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const p=f.morphAttributes;for(const g in p){const _=p[g];for(let u=0,m=_.length;u<m;u++)e.update(_[u],i.ARRAY_BUFFER)}}function l(f){const d=[],p=f.index,g=f.attributes.position;let _=0;if(p!==null){const y=p.array;_=p.version;for(let x=0,M=y.length;x<M;x+=3){const A=y[x+0],S=y[x+1],b=y[x+2];d.push(A,S,S,b,b,A)}}else if(g!==void 0){const y=g.array;_=g.version;for(let x=0,M=y.length/3-1;x<M;x+=3){const A=x+0,S=x+1,b=x+2;d.push(A,S,S,b,b,A)}}else return;const u=new(Ed(d)?Ld:Pd)(d,1);u.version=_;const m=r.get(f);m&&e.remove(m),r.set(f,u)}function h(f){const d=r.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function r_(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,p){i.drawElements(n,p,r,d*o),t.update(p,n,1)}function l(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*o,g),t.update(p,n,g))}function h(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let u=0;for(let m=0;m<g;m++)u+=p[m];t.update(u,n,1)}function f(d,p,g,_){if(g===0)return;const u=e.get("WEBGL_multi_draw");if(u===null)for(let m=0;m<d.length;m++)l(d[m]/o,p[m],_[m]);else{u.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,_,0,g);let m=0;for(let y=0;y<g;y++)m+=p[y];for(let y=0;y<_.length;y++)t.update(m,n,_[y])}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function o_(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function a_(i,e,t){const n=new WeakMap,s=new at;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==f){let L=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",L)};d!==void 0&&d.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;p===!0&&(x=1),g===!0&&(x=2),_===!0&&(x=3);let M=a.attributes.position.count*x,A=1;M>e.maxTextureSize&&(A=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const S=new Float32Array(M*A*4*f),b=new Ad(S,M,A,f);b.type=vn,b.needsUpdate=!0;const T=x*4;for(let v=0;v<f;v++){const w=u[v],F=m[v],U=y[v],N=M*A*4*v;for(let z=0;z<w.count;z++){const D=z*T;p===!0&&(s.fromBufferAttribute(w,z),S[N+D+0]=s.x,S[N+D+1]=s.y,S[N+D+2]=s.z,S[N+D+3]=0),g===!0&&(s.fromBufferAttribute(F,z),S[N+D+4]=s.x,S[N+D+5]=s.y,S[N+D+6]=s.z,S[N+D+7]=0),_===!0&&(s.fromBufferAttribute(U,z),S[N+D+8]=s.x,S[N+D+9]=s.y,S[N+D+10]=s.z,S[N+D+11]=U.itemSize===4?s.w:1)}}d={count:f,texture:b,size:new he(M,A)},n.set(a,d),a.addEventListener("dispose",L)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];const g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function c_(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,f=e.get(c,h);if(s.get(f)!==l&&(e.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return f}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class Od extends zt{constructor(e,t,n,s,r,o,a,c,l,h=Ys){if(h!==Ys&&h!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ys&&(n=ds),n===void 0&&h===or&&(n=rr),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:un,this.minFilter=c!==void 0?c:un,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Bd=new zt,Kh=new Od(1,1),zd=new Ad,kd=new qp,Hd=new Ud,Yh=[],$h=[],jh=new Float32Array(16),Zh=new Float32Array(9),Jh=new Float32Array(4);function pr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Yh[s];if(r===void 0&&(r=new Float32Array(s),Yh[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ht(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function va(i,e){let t=$h[e];t===void 0&&(t=new Int32Array(e),$h[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function l_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function h_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Ht(t,e)}}function u_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Ht(t,e)}}function d_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Ht(t,e)}}function f_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(kt(t,n))return;Jh.set(n),i.uniformMatrix2fv(this.addr,!1,Jh),Ht(t,n)}}function p_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(kt(t,n))return;Zh.set(n),i.uniformMatrix3fv(this.addr,!1,Zh),Ht(t,n)}}function m_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(kt(t,n))return;jh.set(n),i.uniformMatrix4fv(this.addr,!1,jh),Ht(t,n)}}function g_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function __(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Ht(t,e)}}function x_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Ht(t,e)}}function v_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Ht(t,e)}}function y_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function M_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Ht(t,e)}}function S_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Ht(t,e)}}function w_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Ht(t,e)}}function b_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Kh.compareFunction=bd,r=Kh):r=Bd,t.setTexture2D(e||r,s)}function E_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||kd,s)}function T_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Hd,s)}function A_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||zd,s)}function R_(i){switch(i){case 5126:return l_;case 35664:return h_;case 35665:return u_;case 35666:return d_;case 35674:return f_;case 35675:return p_;case 35676:return m_;case 5124:case 35670:return g_;case 35667:case 35671:return __;case 35668:case 35672:return x_;case 35669:case 35673:return v_;case 5125:return y_;case 36294:return M_;case 36295:return S_;case 36296:return w_;case 35678:case 36198:case 36298:case 36306:case 35682:return b_;case 35679:case 36299:case 36307:return E_;case 35680:case 36300:case 36308:case 36293:return T_;case 36289:case 36303:case 36311:case 36292:return A_}}function C_(i,e){i.uniform1fv(this.addr,e)}function P_(i,e){const t=pr(e,this.size,2);i.uniform2fv(this.addr,t)}function L_(i,e){const t=pr(e,this.size,3);i.uniform3fv(this.addr,t)}function I_(i,e){const t=pr(e,this.size,4);i.uniform4fv(this.addr,t)}function D_(i,e){const t=pr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function N_(i,e){const t=pr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function U_(i,e){const t=pr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function F_(i,e){i.uniform1iv(this.addr,e)}function O_(i,e){i.uniform2iv(this.addr,e)}function B_(i,e){i.uniform3iv(this.addr,e)}function z_(i,e){i.uniform4iv(this.addr,e)}function k_(i,e){i.uniform1uiv(this.addr,e)}function H_(i,e){i.uniform2uiv(this.addr,e)}function V_(i,e){i.uniform3uiv(this.addr,e)}function G_(i,e){i.uniform4uiv(this.addr,e)}function W_(i,e,t){const n=this.cache,s=e.length,r=va(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Bd,r[o])}function X_(i,e,t){const n=this.cache,s=e.length,r=va(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||kd,r[o])}function q_(i,e,t){const n=this.cache,s=e.length,r=va(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Hd,r[o])}function K_(i,e,t){const n=this.cache,s=e.length,r=va(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||zd,r[o])}function Y_(i){switch(i){case 5126:return C_;case 35664:return P_;case 35665:return L_;case 35666:return I_;case 35674:return D_;case 35675:return N_;case 35676:return U_;case 5124:case 35670:return F_;case 35667:case 35671:return O_;case 35668:case 35672:return B_;case 35669:case 35673:return z_;case 5125:return k_;case 36294:return H_;case 36295:return V_;case 36296:return G_;case 35678:case 36198:case 36298:case 36306:case 35682:return W_;case 35679:case 36299:case 36307:return X_;case 35680:case 36300:case 36308:case 36293:return q_;case 36289:case 36303:case 36311:case 36292:return K_}}class $_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=R_(t.type)}}class j_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Y_(t.type)}}class Z_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const nc=/(\w+)(\])?(\[|\.)?/g;function Qh(i,e){i.seq.push(e),i.map[e.id]=e}function J_(i,e,t){const n=i.name,s=n.length;for(nc.lastIndex=0;;){const r=nc.exec(n),o=nc.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Qh(t,l===void 0?new $_(a,i,e):new j_(a,i,e));break}else{let f=t.map[a];f===void 0&&(f=new Z_(a),Qh(t,f)),t=f}}}class na{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);J_(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function eu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Q_=37297;let ex=0;function tx(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function nx(i){const e=rt.getPrimaries(rt.workingColorSpace),t=rt.getPrimaries(i);let n;switch(e===t?n="":e===aa&&t===oa?n="LinearDisplayP3ToLinearSRGB":e===oa&&t===aa&&(n="LinearSRGBToLinearDisplayP3"),i){case Kt:case _a:return[n,"LinearTransferOETF"];case nn:case Fl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function tu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+tx(i.getShaderSource(e),o)}else return s}function ix(i,e){const t=nx(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function sx(i,e){let t;switch(e){case tp:t="Linear";break;case np:t="Reinhard";break;case ip:t="Cineon";break;case hd:t="ACESFilmic";break;case rp:t="AgX";break;case op:t="Neutral";break;case sp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const bo=new I;function rx(){rt.getLuminanceCoefficients(bo);const i=bo.x.toFixed(4),e=bo.y.toFixed(4),t=bo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ox(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Dr).join(`
`)}function ax(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function cx(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Dr(i){return i!==""}function nu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function iu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lx=/^[ \t]*#include +<([\w\d./]+)>/gm;function fl(i){return i.replace(lx,ux)}const hx=new Map;function ux(i,e){let t=je[e];if(t===void 0){const n=hx.get(e);if(n!==void 0)t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return fl(t)}const dx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function su(i){return i.replace(dx,fx)}function fx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ru(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function px(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ad?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===cd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===vi&&(e="SHADOWMAP_TYPE_VSM"),e}function mx(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ir:case sr:e="ENVMAP_TYPE_CUBE";break;case ga:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gx(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case sr:e="ENVMAP_MODE_REFRACTION";break}return e}function _x(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ld:e="ENVMAP_BLENDING_MULTIPLY";break;case Qf:e="ENVMAP_BLENDING_MIX";break;case ep:e="ENVMAP_BLENDING_ADD";break}return e}function xx(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function vx(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=px(t),l=mx(t),h=gx(t),f=_x(t),d=xx(t),p=ox(t),g=ax(r),_=s.createProgram();let u,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Dr).join(`
`),u.length>0&&(u+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Dr).join(`
`),m.length>0&&(m+=`
`)):(u=[ru(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Dr).join(`
`),m=[ru(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$i?"#define TONE_MAPPING":"",t.toneMapping!==$i?je.tonemapping_pars_fragment:"",t.toneMapping!==$i?sx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,ix("linearToOutputTexel",t.outputColorSpace),rx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Dr).join(`
`)),o=fl(o),o=nu(o,t),o=iu(o,t),a=fl(a),a=nu(a,t),a=iu(a,t),o=su(o),a=su(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,u=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,m=["#define varying in",t.glslVersion===Sh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=y+u+o,M=y+m+a,A=eu(s,s.VERTEX_SHADER,x),S=eu(s,s.FRAGMENT_SHADER,M);s.attachShader(_,A),s.attachShader(_,S),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function b(w){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(_).trim(),U=s.getShaderInfoLog(A).trim(),N=s.getShaderInfoLog(S).trim();let z=!0,D=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,S);else{const X=tu(s,A,"vertex"),V=tu(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+F+`
`+X+`
`+V)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(U===""||N==="")&&(D=!1);D&&(w.diagnostics={runnable:z,programLog:F,vertexShader:{log:U,prefix:u},fragmentShader:{log:N,prefix:m}})}s.deleteShader(A),s.deleteShader(S),T=new na(s,_),L=cx(s,_)}let T;this.getUniforms=function(){return T===void 0&&b(this),T};let L;this.getAttributes=function(){return L===void 0&&b(this),L};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,Q_)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ex++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=S,this}let yx=0;class Mx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Sx(e),t.set(e,n)),n}}class Sx{constructor(e){this.id=yx++,this.code=e,this.usedTimes=0}}function wx(i,e,t,n,s,r,o){const a=new Rd,c=new Mx,l=new Set,h=[],f=s.logarithmicDepthBuffer,d=s.reverseDepthBuffer,p=s.vertexTextures;let g=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(v){return l.add(v),v===0?"uv":`uv${v}`}function m(v,w,F,U,N){const z=U.fog,D=N.geometry,X=v.isMeshStandardMaterial?U.environment:null,V=(v.isMeshStandardMaterial?t:e).get(v.envMap||X),te=V&&V.mapping===ga?V.image.height:null,oe=_[v.type];v.precision!==null&&(g=s.getMaxPrecision(v.precision),g!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",g,"instead."));const ce=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,Le=ce!==void 0?ce.length:0;let Ce=0;D.morphAttributes.position!==void 0&&(Ce=1),D.morphAttributes.normal!==void 0&&(Ce=2),D.morphAttributes.color!==void 0&&(Ce=3);let q,re,xe,ue;if(oe){const gn=ti[oe];q=gn.vertexShader,re=gn.fragmentShader}else q=v.vertexShader,re=v.fragmentShader,c.update(v),xe=c.getVertexShaderID(v),ue=c.getFragmentShaderID(v);const Ne=i.getRenderTarget(),Te=N.isInstancedMesh===!0,De=N.isBatchedMesh===!0,He=!!v.map,J=!!v.matcap,R=!!V,$=!!v.aoMap,ne=!!v.lightMap,K=!!v.bumpMap,ae=!!v.normalMap,_e=!!v.displacementMap,fe=!!v.emissiveMap,P=!!v.metalnessMap,E=!!v.roughnessMap,H=v.anisotropy>0,j=v.clearcoat>0,ee=v.dispersion>0,Z=v.iridescence>0,Ae=v.sheen>0,me=v.transmission>0,we=H&&!!v.anisotropyMap,nt=j&&!!v.clearcoatMap,le=j&&!!v.clearcoatNormalMap,be=j&&!!v.clearcoatRoughnessMap,Ke=Z&&!!v.iridescenceMap,Ye=Z&&!!v.iridescenceThicknessMap,Re=Ae&&!!v.sheenColorMap,it=Ae&&!!v.sheenRoughnessMap,$e=!!v.specularMap,gt=!!v.specularColorMap,O=!!v.specularIntensityMap,Me=me&&!!v.transmissionMap,Y=me&&!!v.thicknessMap,ie=!!v.gradientMap,ve=!!v.alphaMap,Se=v.alphaTest>0,st=!!v.alphaHash,Lt=!!v.extensions;let mn=$i;v.toneMapped&&(Ne===null||Ne.isXRRenderTarget===!0)&&(mn=i.toneMapping);const ot={shaderID:oe,shaderType:v.type,shaderName:v.name,vertexShader:q,fragmentShader:re,defines:v.defines,customVertexShaderID:xe,customFragmentShaderID:ue,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:g,batching:De,batchingColor:De&&N._colorsTexture!==null,instancing:Te,instancingColor:Te&&N.instanceColor!==null,instancingMorph:Te&&N.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:Ne===null?i.outputColorSpace:Ne.isXRRenderTarget===!0?Ne.texture.colorSpace:Kt,alphaToCoverage:!!v.alphaToCoverage,map:He,matcap:J,envMap:R,envMapMode:R&&V.mapping,envMapCubeUVHeight:te,aoMap:$,lightMap:ne,bumpMap:K,normalMap:ae,displacementMap:p&&_e,emissiveMap:fe,normalMapObjectSpace:ae&&v.normalMapType===dp,normalMapTangentSpace:ae&&v.normalMapType===wd,metalnessMap:P,roughnessMap:E,anisotropy:H,anisotropyMap:we,clearcoat:j,clearcoatMap:nt,clearcoatNormalMap:le,clearcoatRoughnessMap:be,dispersion:ee,iridescence:Z,iridescenceMap:Ke,iridescenceThicknessMap:Ye,sheen:Ae,sheenColorMap:Re,sheenRoughnessMap:it,specularMap:$e,specularColorMap:gt,specularIntensityMap:O,transmission:me,transmissionMap:Me,thicknessMap:Y,gradientMap:ie,opaque:v.transparent===!1&&v.blending===Ks&&v.alphaToCoverage===!1,alphaMap:ve,alphaTest:Se,alphaHash:st,combine:v.combine,mapUv:He&&u(v.map.channel),aoMapUv:$&&u(v.aoMap.channel),lightMapUv:ne&&u(v.lightMap.channel),bumpMapUv:K&&u(v.bumpMap.channel),normalMapUv:ae&&u(v.normalMap.channel),displacementMapUv:_e&&u(v.displacementMap.channel),emissiveMapUv:fe&&u(v.emissiveMap.channel),metalnessMapUv:P&&u(v.metalnessMap.channel),roughnessMapUv:E&&u(v.roughnessMap.channel),anisotropyMapUv:we&&u(v.anisotropyMap.channel),clearcoatMapUv:nt&&u(v.clearcoatMap.channel),clearcoatNormalMapUv:le&&u(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&u(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Ke&&u(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&u(v.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&u(v.sheenColorMap.channel),sheenRoughnessMapUv:it&&u(v.sheenRoughnessMap.channel),specularMapUv:$e&&u(v.specularMap.channel),specularColorMapUv:gt&&u(v.specularColorMap.channel),specularIntensityMapUv:O&&u(v.specularIntensityMap.channel),transmissionMapUv:Me&&u(v.transmissionMap.channel),thicknessMapUv:Y&&u(v.thicknessMap.channel),alphaMapUv:ve&&u(v.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(ae||H),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!D.attributes.uv&&(He||ve),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:d,skinning:N.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:Le,morphTextureStride:Ce,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:mn,decodeVideoTexture:He&&v.map.isVideoTexture===!0&&rt.getTransfer(v.map.colorSpace)===yt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===jt,flipSided:v.side===fn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Lt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&v.extensions.multiDraw===!0||De)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ot.vertexUv1s=l.has(1),ot.vertexUv2s=l.has(2),ot.vertexUv3s=l.has(3),l.clear(),ot}function y(v){const w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(const F in v.defines)w.push(F),w.push(v.defines[F]);return v.isRawShaderMaterial===!1&&(x(w,v),M(w,v),w.push(i.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function x(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function M(v,w){a.disableAll(),w.supportsVertexTextures&&a.enable(0),w.instancing&&a.enable(1),w.instancingColor&&a.enable(2),w.instancingMorph&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),w.dispersion&&a.enable(20),w.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reverseDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.alphaToCoverage&&a.enable(20),v.push(a.mask)}function A(v){const w=_[v.type];let F;if(w){const U=ti[w];F=Dd.clone(U.uniforms)}else F=v.uniforms;return F}function S(v,w){let F;for(let U=0,N=h.length;U<N;U++){const z=h[U];if(z.cacheKey===w){F=z,++F.usedTimes;break}}return F===void 0&&(F=new vx(i,w,v,r),h.push(F)),F}function b(v){if(--v.usedTimes===0){const w=h.indexOf(v);h[w]=h[h.length-1],h.pop(),v.destroy()}}function T(v){c.remove(v)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:A,acquireProgram:S,releaseProgram:b,releaseShaderCache:T,programs:h,dispose:L}}function bx(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ex(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ou(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function au(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f,d,p,g,_,u){let m=i[e];return m===void 0?(m={id:f.id,object:f,geometry:d,material:p,groupOrder:g,renderOrder:f.renderOrder,z:_,group:u},i[e]=m):(m.id=f.id,m.object=f,m.geometry=d,m.material=p,m.groupOrder=g,m.renderOrder=f.renderOrder,m.z=_,m.group=u),e++,m}function a(f,d,p,g,_,u){const m=o(f,d,p,g,_,u);p.transmission>0?n.push(m):p.transparent===!0?s.push(m):t.push(m)}function c(f,d,p,g,_,u){const m=o(f,d,p,g,_,u);p.transmission>0?n.unshift(m):p.transparent===!0?s.unshift(m):t.unshift(m)}function l(f,d){t.length>1&&t.sort(f||Ex),n.length>1&&n.sort(d||ou),s.length>1&&s.sort(d||ou)}function h(){for(let f=e,d=i.length;f<d;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Tx(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new au,i.set(n,[o])):s>=r.length?(o=new au,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Ax(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new ze};break;case"SpotLight":t={position:new I,direction:new I,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function Rx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Cx=0;function Px(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Lx(i){const e=new Ax,t=Rx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,r=new qe,o=new qe;function a(l){let h=0,f=0,d=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let p=0,g=0,_=0,u=0,m=0,y=0,x=0,M=0,A=0,S=0,b=0;l.sort(Px);for(let L=0,v=l.length;L<v;L++){const w=l[L],F=w.color,U=w.intensity,N=w.distance,z=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=F.r*U,f+=F.g*U,d+=F.b*U;else if(w.isLightProbe){for(let D=0;D<9;D++)n.probe[D].addScaledVector(w.sh.coefficients[D],U);b++}else if(w.isDirectionalLight){const D=e.get(w);if(D.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const X=w.shadow,V=t.get(w);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,n.directionalShadow[p]=V,n.directionalShadowMap[p]=z,n.directionalShadowMatrix[p]=w.shadow.matrix,y++}n.directional[p]=D,p++}else if(w.isSpotLight){const D=e.get(w);D.position.setFromMatrixPosition(w.matrixWorld),D.color.copy(F).multiplyScalar(U),D.distance=N,D.coneCos=Math.cos(w.angle),D.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),D.decay=w.decay,n.spot[_]=D;const X=w.shadow;if(w.map&&(n.spotLightMap[A]=w.map,A++,X.updateMatrices(w),w.castShadow&&S++),n.spotLightMatrix[_]=X.matrix,w.castShadow){const V=t.get(w);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=z,M++}_++}else if(w.isRectAreaLight){const D=e.get(w);D.color.copy(F).multiplyScalar(U),D.halfWidth.set(w.width*.5,0,0),D.halfHeight.set(0,w.height*.5,0),n.rectArea[u]=D,u++}else if(w.isPointLight){const D=e.get(w);if(D.color.copy(w.color).multiplyScalar(w.intensity),D.distance=w.distance,D.decay=w.decay,w.castShadow){const X=w.shadow,V=t.get(w);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,V.shadowCameraNear=X.camera.near,V.shadowCameraFar=X.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=z,n.pointShadowMatrix[g]=w.shadow.matrix,x++}n.point[g]=D,g++}else if(w.isHemisphereLight){const D=e.get(w);D.skyColor.copy(w.color).multiplyScalar(U),D.groundColor.copy(w.groundColor).multiplyScalar(U),n.hemi[m]=D,m++}}u>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=d;const T=n.hash;(T.directionalLength!==p||T.pointLength!==g||T.spotLength!==_||T.rectAreaLength!==u||T.hemiLength!==m||T.numDirectionalShadows!==y||T.numPointShadows!==x||T.numSpotShadows!==M||T.numSpotMaps!==A||T.numLightProbes!==b)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=u,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=M+A-S,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=b,T.directionalLength=p,T.pointLength=g,T.spotLength=_,T.rectAreaLength=u,T.hemiLength=m,T.numDirectionalShadows=y,T.numPointShadows=x,T.numSpotShadows=M,T.numSpotMaps=A,T.numLightProbes=b,n.version=Cx++)}function c(l,h){let f=0,d=0,p=0,g=0,_=0;const u=h.matrixWorldInverse;for(let m=0,y=l.length;m<y;m++){const x=l[m];if(x.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(u),f++}else if(x.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(u),M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(u),p++}else if(x.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(u),o.identity(),r.copy(x.matrixWorld),r.premultiply(u),o.extractRotation(r),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(u),d++}else if(x.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(u),_++}}}return{setup:a,setupView:c,state:n}}function cu(i){const e=new Lx(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Ix(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new cu(i),e.set(s,[a])):r>=o.length?(a=new cu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Dx extends Zn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Nx extends Zn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ux=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fx=`uniform sampler2D shadow_pass;
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
}`;function Ox(i,e,t){let n=new Bl;const s=new he,r=new he,o=new at,a=new Dx({depthPacking:up}),c=new Nx,l={},h=t.maxTextureSize,f={[Ti]:fn,[fn]:Ti,[jt]:jt},d=new Ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:Ux,fragmentShader:Fx}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ot;g.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Q(g,d),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ad;let m=this.type;this.render=function(S,b,T){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||S.length===0)return;const L=i.getRenderTarget(),v=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Yi),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const U=m!==vi&&this.type===vi,N=m===vi&&this.type!==vi;for(let z=0,D=S.length;z<D;z++){const X=S[z],V=X.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const te=V.getFrameExtents();if(s.multiply(te),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/te.x),s.x=r.x*te.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/te.y),s.y=r.y*te.y,V.mapSize.y=r.y)),V.map===null||U===!0||N===!0){const ce=this.type!==vi?{minFilter:un,magFilter:un}:{};V.map!==null&&V.map.dispose(),V.map=new fs(s.x,s.y,ce),V.map.texture.name=X.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const oe=V.getViewportCount();for(let ce=0;ce<oe;ce++){const Le=V.getViewport(ce);o.set(r.x*Le.x,r.y*Le.y,r.x*Le.z,r.y*Le.w),F.viewport(o),V.updateMatrices(X,ce),n=V.getFrustum(),M(b,T,V.camera,X,this.type)}V.isPointLightShadow!==!0&&this.type===vi&&y(V,T),V.needsUpdate=!1}m=this.type,u.needsUpdate=!1,i.setRenderTarget(L,v,w)};function y(S,b){const T=e.update(_);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new fs(s.x,s.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(b,null,T,d,_,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(b,null,T,p,_,null)}function x(S,b,T,L){let v=null;const w=T.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(w!==void 0)v=w;else if(v=T.isPointLight===!0?c:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const F=v.uuid,U=b.uuid;let N=l[F];N===void 0&&(N={},l[F]=N);let z=N[U];z===void 0&&(z=v.clone(),N[U]=z,b.addEventListener("dispose",A)),v=z}if(v.visible=b.visible,v.wireframe=b.wireframe,L===vi?v.side=b.shadowSide!==null?b.shadowSide:b.side:v.side=b.shadowSide!==null?b.shadowSide:f[b.side],v.alphaMap=b.alphaMap,v.alphaTest=b.alphaTest,v.map=b.map,v.clipShadows=b.clipShadows,v.clippingPlanes=b.clippingPlanes,v.clipIntersection=b.clipIntersection,v.displacementMap=b.displacementMap,v.displacementScale=b.displacementScale,v.displacementBias=b.displacementBias,v.wireframeLinewidth=b.wireframeLinewidth,v.linewidth=b.linewidth,T.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const F=i.properties.get(v);F.light=T}return v}function M(S,b,T,L,v){if(S.visible===!1)return;if(S.layers.test(b.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&v===vi)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,S.matrixWorld);const U=e.update(S),N=S.material;if(Array.isArray(N)){const z=U.groups;for(let D=0,X=z.length;D<X;D++){const V=z[D],te=N[V.materialIndex];if(te&&te.visible){const oe=x(S,te,L,v);S.onBeforeShadow(i,S,b,T,U,oe,V),i.renderBufferDirect(T,null,U,oe,S,V),S.onAfterShadow(i,S,b,T,U,oe,V)}}}else if(N.visible){const z=x(S,N,L,v);S.onBeforeShadow(i,S,b,T,U,z,null),i.renderBufferDirect(T,null,U,z,S,null),S.onAfterShadow(i,S,b,T,U,z,null)}}const F=S.children;for(let U=0,N=F.length;U<N;U++)M(F[U],b,T,L,v)}function A(S){S.target.removeEventListener("dispose",A);for(const T in l){const L=l[T],v=S.target.uuid;v in L&&(L[v].dispose(),delete L[v])}}}const Bx={[Cc]:Pc,[Lc]:Nc,[Ic]:Uc,[nr]:Dc,[Pc]:Cc,[Nc]:Lc,[Uc]:Ic,[Dc]:nr};function zx(i){function e(){let O=!1;const Me=new at;let Y=null;const ie=new at(0,0,0,0);return{setMask:function(ve){Y!==ve&&!O&&(i.colorMask(ve,ve,ve,ve),Y=ve)},setLocked:function(ve){O=ve},setClear:function(ve,Se,st,Lt,mn){mn===!0&&(ve*=Lt,Se*=Lt,st*=Lt),Me.set(ve,Se,st,Lt),ie.equals(Me)===!1&&(i.clearColor(ve,Se,st,Lt),ie.copy(Me))},reset:function(){O=!1,Y=null,ie.set(-1,0,0,0)}}}function t(){let O=!1,Me=!1,Y=null,ie=null,ve=null;return{setReversed:function(Se){Me=Se},setTest:function(Se){Se?xe(i.DEPTH_TEST):ue(i.DEPTH_TEST)},setMask:function(Se){Y!==Se&&!O&&(i.depthMask(Se),Y=Se)},setFunc:function(Se){if(Me&&(Se=Bx[Se]),ie!==Se){switch(Se){case Cc:i.depthFunc(i.NEVER);break;case Pc:i.depthFunc(i.ALWAYS);break;case Lc:i.depthFunc(i.LESS);break;case nr:i.depthFunc(i.LEQUAL);break;case Ic:i.depthFunc(i.EQUAL);break;case Dc:i.depthFunc(i.GEQUAL);break;case Nc:i.depthFunc(i.GREATER);break;case Uc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ie=Se}},setLocked:function(Se){O=Se},setClear:function(Se){ve!==Se&&(i.clearDepth(Se),ve=Se)},reset:function(){O=!1,Y=null,ie=null,ve=null}}}function n(){let O=!1,Me=null,Y=null,ie=null,ve=null,Se=null,st=null,Lt=null,mn=null;return{setTest:function(ot){O||(ot?xe(i.STENCIL_TEST):ue(i.STENCIL_TEST))},setMask:function(ot){Me!==ot&&!O&&(i.stencilMask(ot),Me=ot)},setFunc:function(ot,gn,di){(Y!==ot||ie!==gn||ve!==di)&&(i.stencilFunc(ot,gn,di),Y=ot,ie=gn,ve=di)},setOp:function(ot,gn,di){(Se!==ot||st!==gn||Lt!==di)&&(i.stencilOp(ot,gn,di),Se=ot,st=gn,Lt=di)},setLocked:function(ot){O=ot},setClear:function(ot){mn!==ot&&(i.clearStencil(ot),mn=ot)},reset:function(){O=!1,Me=null,Y=null,ie=null,ve=null,Se=null,st=null,Lt=null,mn=null}}}const s=new e,r=new t,o=new n,a=new WeakMap,c=new WeakMap;let l={},h={},f=new WeakMap,d=[],p=null,g=!1,_=null,u=null,m=null,y=null,x=null,M=null,A=null,S=new ze(0,0,0),b=0,T=!1,L=null,v=null,w=null,F=null,U=null;const N=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,D=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(D=parseFloat(/^WebGL (\d)/.exec(X)[1]),z=D>=1):X.indexOf("OpenGL ES")!==-1&&(D=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),z=D>=2);let V=null,te={};const oe=i.getParameter(i.SCISSOR_BOX),ce=i.getParameter(i.VIEWPORT),Le=new at().fromArray(oe),Ce=new at().fromArray(ce);function q(O,Me,Y,ie){const ve=new Uint8Array(4),Se=i.createTexture();i.bindTexture(O,Se),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let st=0;st<Y;st++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(Me,0,i.RGBA,1,1,ie,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(Me+st,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return Se}const re={};re[i.TEXTURE_2D]=q(i.TEXTURE_2D,i.TEXTURE_2D,1),re[i.TEXTURE_CUBE_MAP]=q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[i.TEXTURE_2D_ARRAY]=q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),re[i.TEXTURE_3D]=q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),xe(i.DEPTH_TEST),r.setFunc(nr),ne(!1),K(ph),xe(i.CULL_FACE),R(Yi);function xe(O){l[O]!==!0&&(i.enable(O),l[O]=!0)}function ue(O){l[O]!==!1&&(i.disable(O),l[O]=!1)}function Ne(O,Me){return h[O]!==Me?(i.bindFramebuffer(O,Me),h[O]=Me,O===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Me),O===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Me),!0):!1}function Te(O,Me){let Y=d,ie=!1;if(O){Y=f.get(Me),Y===void 0&&(Y=[],f.set(Me,Y));const ve=O.textures;if(Y.length!==ve.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let Se=0,st=ve.length;Se<st;Se++)Y[Se]=i.COLOR_ATTACHMENT0+Se;Y.length=ve.length,ie=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,ie=!0);ie&&i.drawBuffers(Y)}function De(O){return p!==O?(i.useProgram(O),p=O,!0):!1}const He={[cs]:i.FUNC_ADD,[Ff]:i.FUNC_SUBTRACT,[Of]:i.FUNC_REVERSE_SUBTRACT};He[Bf]=i.MIN,He[zf]=i.MAX;const J={[kf]:i.ZERO,[Hf]:i.ONE,[Vf]:i.SRC_COLOR,[Ac]:i.SRC_ALPHA,[Yf]:i.SRC_ALPHA_SATURATE,[qf]:i.DST_COLOR,[Wf]:i.DST_ALPHA,[Gf]:i.ONE_MINUS_SRC_COLOR,[Rc]:i.ONE_MINUS_SRC_ALPHA,[Kf]:i.ONE_MINUS_DST_COLOR,[Xf]:i.ONE_MINUS_DST_ALPHA,[$f]:i.CONSTANT_COLOR,[jf]:i.ONE_MINUS_CONSTANT_COLOR,[Zf]:i.CONSTANT_ALPHA,[Jf]:i.ONE_MINUS_CONSTANT_ALPHA};function R(O,Me,Y,ie,ve,Se,st,Lt,mn,ot){if(O===Yi){g===!0&&(ue(i.BLEND),g=!1);return}if(g===!1&&(xe(i.BLEND),g=!0),O!==Uf){if(O!==_||ot!==T){if((u!==cs||x!==cs)&&(i.blendEquation(i.FUNC_ADD),u=cs,x=cs),ot)switch(O){case Ks:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vr:i.blendFunc(i.ONE,i.ONE);break;case mh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Ks:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case mh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}m=null,y=null,M=null,A=null,S.set(0,0,0),b=0,_=O,T=ot}return}ve=ve||Me,Se=Se||Y,st=st||ie,(Me!==u||ve!==x)&&(i.blendEquationSeparate(He[Me],He[ve]),u=Me,x=ve),(Y!==m||ie!==y||Se!==M||st!==A)&&(i.blendFuncSeparate(J[Y],J[ie],J[Se],J[st]),m=Y,y=ie,M=Se,A=st),(Lt.equals(S)===!1||mn!==b)&&(i.blendColor(Lt.r,Lt.g,Lt.b,mn),S.copy(Lt),b=mn),_=O,T=!1}function $(O,Me){O.side===jt?ue(i.CULL_FACE):xe(i.CULL_FACE);let Y=O.side===fn;Me&&(Y=!Y),ne(Y),O.blending===Ks&&O.transparent===!1?R(Yi):R(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),s.setMask(O.colorWrite);const ie=O.stencilWrite;o.setTest(ie),ie&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),_e(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?xe(i.SAMPLE_ALPHA_TO_COVERAGE):ue(i.SAMPLE_ALPHA_TO_COVERAGE)}function ne(O){L!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),L=O)}function K(O){O!==Df?(xe(i.CULL_FACE),O!==v&&(O===ph?i.cullFace(i.BACK):O===Nf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ue(i.CULL_FACE),v=O}function ae(O){O!==w&&(z&&i.lineWidth(O),w=O)}function _e(O,Me,Y){O?(xe(i.POLYGON_OFFSET_FILL),(F!==Me||U!==Y)&&(i.polygonOffset(Me,Y),F=Me,U=Y)):ue(i.POLYGON_OFFSET_FILL)}function fe(O){O?xe(i.SCISSOR_TEST):ue(i.SCISSOR_TEST)}function P(O){O===void 0&&(O=i.TEXTURE0+N-1),V!==O&&(i.activeTexture(O),V=O)}function E(O,Me,Y){Y===void 0&&(V===null?Y=i.TEXTURE0+N-1:Y=V);let ie=te[Y];ie===void 0&&(ie={type:void 0,texture:void 0},te[Y]=ie),(ie.type!==O||ie.texture!==Me)&&(V!==Y&&(i.activeTexture(Y),V=Y),i.bindTexture(O,Me||re[O]),ie.type=O,ie.texture=Me)}function H(){const O=te[V];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{i.compressedTexImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ae(){try{i.texSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function me(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function we(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function nt(){try{i.texStorage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function le(){try{i.texStorage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function be(){try{i.texImage2D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ke(){try{i.texImage3D.apply(i,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ye(O){Le.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Le.copy(O))}function Re(O){Ce.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Ce.copy(O))}function it(O,Me){let Y=c.get(Me);Y===void 0&&(Y=new WeakMap,c.set(Me,Y));let ie=Y.get(O);ie===void 0&&(ie=i.getUniformBlockIndex(Me,O.name),Y.set(O,ie))}function $e(O,Me){const ie=c.get(Me).get(O);a.get(Me)!==ie&&(i.uniformBlockBinding(Me,ie,O.__bindingPointIndex),a.set(Me,ie))}function gt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},V=null,te={},h={},f=new WeakMap,d=[],p=null,g=!1,_=null,u=null,m=null,y=null,x=null,M=null,A=null,S=new ze(0,0,0),b=0,T=!1,L=null,v=null,w=null,F=null,U=null,Le.set(0,0,i.canvas.width,i.canvas.height),Ce.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:xe,disable:ue,bindFramebuffer:Ne,drawBuffers:Te,useProgram:De,setBlending:R,setMaterial:$,setFlipSided:ne,setCullFace:K,setLineWidth:ae,setPolygonOffset:_e,setScissorTest:fe,activeTexture:P,bindTexture:E,unbindTexture:H,compressedTexImage2D:j,compressedTexImage3D:ee,texImage2D:be,texImage3D:Ke,updateUBOMapping:it,uniformBlockBinding:$e,texStorage2D:nt,texStorage3D:le,texSubImage2D:Z,texSubImage3D:Ae,compressedTexSubImage2D:me,compressedTexSubImage3D:we,scissor:Ye,viewport:Re,reset:gt}}function lu(i,e,t,n){const s=kx(n);switch(t){case gd:return i*e;case xd:return i*e;case vd:return i*e*2;case Il:return i*e/s.components*s.byteLength;case Dl:return i*e/s.components*s.byteLength;case yd:return i*e*2/s.components*s.byteLength;case Nl:return i*e*2/s.components*s.byteLength;case _d:return i*e*3/s.components*s.byteLength;case On:return i*e*4/s.components*s.byteLength;case Ul:return i*e*4/s.components*s.byteLength;case jo:case Zo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Jo:case Qo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zc:case Hc:return Math.max(i,16)*Math.max(e,8)/4;case Bc:case kc:return Math.max(i,8)*Math.max(e,8)/2;case Vc:case Gc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Wc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Kc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Yc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case $c:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case jc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Zc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Jc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Qc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case el:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case tl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case nl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case il:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case sl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ea:case rl:case ol:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Md:case al:return Math.ceil(i/4)*Math.ceil(e/4)*8;case cl:case ll:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function kx(i){switch(i){case Ai:case fd:return{byteLength:1,components:1};case Gr:case pd:case bi:return{byteLength:2,components:1};case Pl:case Ll:return{byteLength:2,components:4};case ds:case Cl:case vn:return{byteLength:4,components:1};case md:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Hx(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new he,h=new WeakMap;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,E){return p?new OffscreenCanvas(P,E):qr("canvas")}function _(P,E,H){let j=1;const ee=fe(P);if((ee.width>H||ee.height>H)&&(j=H/Math.max(ee.width,ee.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Z=Math.floor(j*ee.width),Ae=Math.floor(j*ee.height);f===void 0&&(f=g(Z,Ae));const me=E?g(Z,Ae):f;return me.width=Z,me.height=Ae,me.getContext("2d").drawImage(P,0,0,Z,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Z+"x"+Ae+")."),me}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),P;return P}function u(P){return P.generateMipmaps&&P.minFilter!==un&&P.minFilter!==Xt}function m(P){i.generateMipmap(P)}function y(P,E,H,j,ee=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Z=E;if(E===i.RED&&(H===i.FLOAT&&(Z=i.R32F),H===i.HALF_FLOAT&&(Z=i.R16F),H===i.UNSIGNED_BYTE&&(Z=i.R8)),E===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.R8UI),H===i.UNSIGNED_SHORT&&(Z=i.R16UI),H===i.UNSIGNED_INT&&(Z=i.R32UI),H===i.BYTE&&(Z=i.R8I),H===i.SHORT&&(Z=i.R16I),H===i.INT&&(Z=i.R32I)),E===i.RG&&(H===i.FLOAT&&(Z=i.RG32F),H===i.HALF_FLOAT&&(Z=i.RG16F),H===i.UNSIGNED_BYTE&&(Z=i.RG8)),E===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RG8UI),H===i.UNSIGNED_SHORT&&(Z=i.RG16UI),H===i.UNSIGNED_INT&&(Z=i.RG32UI),H===i.BYTE&&(Z=i.RG8I),H===i.SHORT&&(Z=i.RG16I),H===i.INT&&(Z=i.RG32I)),E===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),H===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),H===i.UNSIGNED_INT&&(Z=i.RGB32UI),H===i.BYTE&&(Z=i.RGB8I),H===i.SHORT&&(Z=i.RGB16I),H===i.INT&&(Z=i.RGB32I)),E===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),H===i.UNSIGNED_INT&&(Z=i.RGBA32UI),H===i.BYTE&&(Z=i.RGBA8I),H===i.SHORT&&(Z=i.RGBA16I),H===i.INT&&(Z=i.RGBA32I)),E===i.RGB&&H===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),E===i.RGBA){const Ae=ee?ra:rt.getTransfer(j);H===i.FLOAT&&(Z=i.RGBA32F),H===i.HALF_FLOAT&&(Z=i.RGBA16F),H===i.UNSIGNED_BYTE&&(Z=Ae===yt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function x(P,E){let H;return P?E===null||E===ds||E===rr?H=i.DEPTH24_STENCIL8:E===vn?H=i.DEPTH32F_STENCIL8:E===Gr&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ds||E===rr?H=i.DEPTH_COMPONENT24:E===vn?H=i.DEPTH_COMPONENT32F:E===Gr&&(H=i.DEPTH_COMPONENT16),H}function M(P,E){return u(P)===!0||P.isFramebufferTexture&&P.minFilter!==un&&P.minFilter!==Xt?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function A(P){const E=P.target;E.removeEventListener("dispose",A),b(E),E.isVideoTexture&&h.delete(E)}function S(P){const E=P.target;E.removeEventListener("dispose",S),L(E)}function b(P){const E=n.get(P);if(E.__webglInit===void 0)return;const H=P.source,j=d.get(H);if(j){const ee=j[E.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&T(P),Object.keys(j).length===0&&d.delete(H)}n.remove(P)}function T(P){const E=n.get(P);i.deleteTexture(E.__webglTexture);const H=P.source,j=d.get(H);delete j[E.__cacheKey],o.memory.textures--}function L(P){const E=n.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(E.__webglFramebuffer[j]))for(let ee=0;ee<E.__webglFramebuffer[j].length;ee++)i.deleteFramebuffer(E.__webglFramebuffer[j][ee]);else i.deleteFramebuffer(E.__webglFramebuffer[j]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[j])}else{if(Array.isArray(E.__webglFramebuffer))for(let j=0;j<E.__webglFramebuffer.length;j++)i.deleteFramebuffer(E.__webglFramebuffer[j]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let j=0;j<E.__webglColorRenderbuffer.length;j++)E.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[j]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const H=P.textures;for(let j=0,ee=H.length;j<ee;j++){const Z=n.get(H[j]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(H[j])}n.remove(P)}let v=0;function w(){v=0}function F(){const P=v;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),v+=1,P}function U(P){const E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function N(P,E){const H=n.get(P);if(P.isVideoTexture&&ae(P),P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){const j=P.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(H,P,E);return}}t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+E)}function z(P,E){const H=n.get(P);if(P.version>0&&H.__version!==P.version){Ce(H,P,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+E)}function D(P,E){const H=n.get(P);if(P.version>0&&H.__version!==P.version){Ce(H,P,E);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+E)}function X(P,E){const H=n.get(P);if(P.version>0&&H.__version!==P.version){q(H,P,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+E)}const V={[Zi]:i.REPEAT,[ni]:i.CLAMP_TO_EDGE,[sa]:i.MIRRORED_REPEAT},te={[un]:i.NEAREST,[dd]:i.NEAREST_MIPMAP_NEAREST,[Ir]:i.NEAREST_MIPMAP_LINEAR,[Xt]:i.LINEAR,[$o]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},oe={[fp]:i.NEVER,[vp]:i.ALWAYS,[pp]:i.LESS,[bd]:i.LEQUAL,[mp]:i.EQUAL,[xp]:i.GEQUAL,[gp]:i.GREATER,[_p]:i.NOTEQUAL};function ce(P,E){if(E.type===vn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Xt||E.magFilter===$o||E.magFilter===Ir||E.magFilter===ii||E.minFilter===Xt||E.minFilter===$o||E.minFilter===Ir||E.minFilter===ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,V[E.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,V[E.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,V[E.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,te[E.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,te[E.minFilter]),E.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,oe[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===un||E.minFilter!==Ir&&E.minFilter!==ii||E.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Le(P,E){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",A));const j=E.source;let ee=d.get(j);ee===void 0&&(ee={},d.set(j,ee));const Z=U(E);if(Z!==P.__cacheKey){ee[Z]===void 0&&(ee[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ee[Z].usedTimes++;const Ae=ee[P.__cacheKey];Ae!==void 0&&(ee[P.__cacheKey].usedTimes--,Ae.usedTimes===0&&T(E)),P.__cacheKey=Z,P.__webglTexture=ee[Z].texture}return H}function Ce(P,E,H){let j=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(j=i.TEXTURE_3D);const ee=Le(P,E),Z=E.source;t.bindTexture(j,P.__webglTexture,i.TEXTURE0+H);const Ae=n.get(Z);if(Z.version!==Ae.__version||ee===!0){t.activeTexture(i.TEXTURE0+H);const me=rt.getPrimaries(rt.workingColorSpace),we=E.colorSpace===Vi?null:rt.getPrimaries(E.colorSpace),nt=E.colorSpace===Vi||me===we?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let le=_(E.image,!1,s.maxTextureSize);le=_e(E,le);const be=r.convert(E.format,E.colorSpace),Ke=r.convert(E.type);let Ye=y(E.internalFormat,be,Ke,E.colorSpace,E.isVideoTexture);ce(j,E);let Re;const it=E.mipmaps,$e=E.isVideoTexture!==!0,gt=Ae.__version===void 0||ee===!0,O=Z.dataReady,Me=M(E,le);if(E.isDepthTexture)Ye=x(E.format===or,E.type),gt&&($e?t.texStorage2D(i.TEXTURE_2D,1,Ye,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,Ye,le.width,le.height,0,be,Ke,null));else if(E.isDataTexture)if(it.length>0){$e&&gt&&t.texStorage2D(i.TEXTURE_2D,Me,Ye,it[0].width,it[0].height);for(let Y=0,ie=it.length;Y<ie;Y++)Re=it[Y],$e?O&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,Re.width,Re.height,be,Ke,Re.data):t.texImage2D(i.TEXTURE_2D,Y,Ye,Re.width,Re.height,0,be,Ke,Re.data);E.generateMipmaps=!1}else $e?(gt&&t.texStorage2D(i.TEXTURE_2D,Me,Ye,le.width,le.height),O&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le.width,le.height,be,Ke,le.data)):t.texImage2D(i.TEXTURE_2D,0,Ye,le.width,le.height,0,be,Ke,le.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){$e&&gt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Ye,it[0].width,it[0].height,le.depth);for(let Y=0,ie=it.length;Y<ie;Y++)if(Re=it[Y],E.format!==On)if(be!==null)if($e){if(O)if(E.layerUpdates.size>0){const ve=lu(Re.width,Re.height,E.format,E.type);for(const Se of E.layerUpdates){const st=Re.data.subarray(Se*ve/Re.data.BYTES_PER_ELEMENT,(Se+1)*ve/Re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,Se,Re.width,Re.height,1,be,st,0,0)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Re.width,Re.height,le.depth,be,Re.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Ye,Re.width,Re.height,le.depth,0,Re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?O&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Re.width,Re.height,le.depth,be,Ke,Re.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,Ye,Re.width,Re.height,le.depth,0,be,Ke,Re.data)}else{$e&&gt&&t.texStorage2D(i.TEXTURE_2D,Me,Ye,it[0].width,it[0].height);for(let Y=0,ie=it.length;Y<ie;Y++)Re=it[Y],E.format!==On?be!==null?$e?O&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,Re.width,Re.height,be,Re.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,Ye,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?O&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,Re.width,Re.height,be,Ke,Re.data):t.texImage2D(i.TEXTURE_2D,Y,Ye,Re.width,Re.height,0,be,Ke,Re.data)}else if(E.isDataArrayTexture)if($e){if(gt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,Ye,le.width,le.height,le.depth),O)if(E.layerUpdates.size>0){const Y=lu(le.width,le.height,E.format,E.type);for(const ie of E.layerUpdates){const ve=le.data.subarray(ie*Y/le.data.BYTES_PER_ELEMENT,(ie+1)*Y/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ie,le.width,le.height,1,be,Ke,ve)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,be,Ke,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ye,le.width,le.height,le.depth,0,be,Ke,le.data);else if(E.isData3DTexture)$e?(gt&&t.texStorage3D(i.TEXTURE_3D,Me,Ye,le.width,le.height,le.depth),O&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,be,Ke,le.data)):t.texImage3D(i.TEXTURE_3D,0,Ye,le.width,le.height,le.depth,0,be,Ke,le.data);else if(E.isFramebufferTexture){if(gt)if($e)t.texStorage2D(i.TEXTURE_2D,Me,Ye,le.width,le.height);else{let Y=le.width,ie=le.height;for(let ve=0;ve<Me;ve++)t.texImage2D(i.TEXTURE_2D,ve,Ye,Y,ie,0,be,Ke,null),Y>>=1,ie>>=1}}else if(it.length>0){if($e&&gt){const Y=fe(it[0]);t.texStorage2D(i.TEXTURE_2D,Me,Ye,Y.width,Y.height)}for(let Y=0,ie=it.length;Y<ie;Y++)Re=it[Y],$e?O&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,be,Ke,Re):t.texImage2D(i.TEXTURE_2D,Y,Ye,be,Ke,Re);E.generateMipmaps=!1}else if($e){if(gt){const Y=fe(le);t.texStorage2D(i.TEXTURE_2D,Me,Ye,Y.width,Y.height)}O&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,be,Ke,le)}else t.texImage2D(i.TEXTURE_2D,0,Ye,be,Ke,le);u(E)&&m(j),Ae.__version=Z.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function q(P,E,H){if(E.image.length!==6)return;const j=Le(P,E),ee=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+H);const Z=n.get(ee);if(ee.version!==Z.__version||j===!0){t.activeTexture(i.TEXTURE0+H);const Ae=rt.getPrimaries(rt.workingColorSpace),me=E.colorSpace===Vi?null:rt.getPrimaries(E.colorSpace),we=E.colorSpace===Vi||Ae===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const nt=E.isCompressedTexture||E.image[0].isCompressedTexture,le=E.image[0]&&E.image[0].isDataTexture,be=[];for(let ie=0;ie<6;ie++)!nt&&!le?be[ie]=_(E.image[ie],!0,s.maxCubemapSize):be[ie]=le?E.image[ie].image:E.image[ie],be[ie]=_e(E,be[ie]);const Ke=be[0],Ye=r.convert(E.format,E.colorSpace),Re=r.convert(E.type),it=y(E.internalFormat,Ye,Re,E.colorSpace),$e=E.isVideoTexture!==!0,gt=Z.__version===void 0||j===!0,O=ee.dataReady;let Me=M(E,Ke);ce(i.TEXTURE_CUBE_MAP,E);let Y;if(nt){$e&&gt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,it,Ke.width,Ke.height);for(let ie=0;ie<6;ie++){Y=be[ie].mipmaps;for(let ve=0;ve<Y.length;ve++){const Se=Y[ve];E.format!==On?Ye!==null?$e?O&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,0,0,Se.width,Se.height,Ye,Se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,it,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?O&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,0,0,Se.width,Se.height,Ye,Re,Se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,it,Se.width,Se.height,0,Ye,Re,Se.data)}}}else{if(Y=E.mipmaps,$e&&gt){Y.length>0&&Me++;const ie=fe(be[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,it,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(le){$e?O&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,be[ie].width,be[ie].height,Ye,Re,be[ie].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,it,be[ie].width,be[ie].height,0,Ye,Re,be[ie].data);for(let ve=0;ve<Y.length;ve++){const st=Y[ve].image[ie].image;$e?O&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,0,0,st.width,st.height,Ye,Re,st.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,it,st.width,st.height,0,Ye,Re,st.data)}}else{$e?O&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ye,Re,be[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,it,Ye,Re,be[ie]);for(let ve=0;ve<Y.length;ve++){const Se=Y[ve];$e?O&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,0,0,Ye,Re,Se.image[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,it,Ye,Re,Se.image[ie])}}}u(E)&&m(i.TEXTURE_CUBE_MAP),Z.__version=ee.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function re(P,E,H,j,ee,Z){const Ae=r.convert(H.format,H.colorSpace),me=r.convert(H.type),we=y(H.internalFormat,Ae,me,H.colorSpace);if(!n.get(E).__hasExternalTextures){const le=Math.max(1,E.width>>Z),be=Math.max(1,E.height>>Z);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,Z,we,le,be,E.depth,0,Ae,me,null):t.texImage2D(ee,Z,we,le,be,0,Ae,me,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),K(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,ee,n.get(H).__webglTexture,0,ne(E)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,ee,n.get(H).__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xe(P,E,H){if(i.bindRenderbuffer(i.RENDERBUFFER,P),E.depthBuffer){const j=E.depthTexture,ee=j&&j.isDepthTexture?j.type:null,Z=x(E.stencilBuffer,ee),Ae=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=ne(E);K(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,me,Z,E.width,E.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,me,Z,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Z,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ae,i.RENDERBUFFER,P)}else{const j=E.textures;for(let ee=0;ee<j.length;ee++){const Z=j[ee],Ae=r.convert(Z.format,Z.colorSpace),me=r.convert(Z.type),we=y(Z.internalFormat,Ae,me,Z.colorSpace),nt=ne(E);H&&K(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,we,E.width,E.height):K(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt,we,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,we,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ue(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),N(E.depthTexture,0);const j=n.get(E.depthTexture).__webglTexture,ee=ne(E);if(E.depthTexture.format===Ys)K(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(E.depthTexture.format===or)K(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,ee):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Ne(P){const E=n.get(P),H=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){const j=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),j){const ee=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,j.removeEventListener("dispose",ee)};j.addEventListener("dispose",ee),E.__depthDisposeCallback=ee}E.__boundDepthTexture=j}if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");ue(E.__webglFramebuffer,P)}else if(H){E.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[j]),E.__webglDepthbuffer[j]===void 0)E.__webglDepthbuffer[j]=i.createRenderbuffer(),xe(E.__webglDepthbuffer[j],P,!1);else{const ee=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=E.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),xe(E.__webglDepthbuffer,P,!1);else{const j=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,ee)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(P,E,H){const j=n.get(P);E!==void 0&&re(j.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ne(P)}function De(P){const E=P.texture,H=n.get(P),j=n.get(E);P.addEventListener("dispose",S);const ee=P.textures,Z=P.isWebGLCubeRenderTarget===!0,Ae=ee.length>1;if(Ae||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=E.version,o.memory.textures++),Z){H.__webglFramebuffer=[];for(let me=0;me<6;me++)if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer[me]=[];for(let we=0;we<E.mipmaps.length;we++)H.__webglFramebuffer[me][we]=i.createFramebuffer()}else H.__webglFramebuffer[me]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer=[];for(let me=0;me<E.mipmaps.length;me++)H.__webglFramebuffer[me]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(Ae)for(let me=0,we=ee.length;me<we;me++){const nt=n.get(ee[me]);nt.__webglTexture===void 0&&(nt.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&K(P)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let me=0;me<ee.length;me++){const we=ee[me];H.__webglColorRenderbuffer[me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[me]);const nt=r.convert(we.format,we.colorSpace),le=r.convert(we.type),be=y(we.internalFormat,nt,le,we.colorSpace,P.isXRRenderTarget===!0),Ke=ne(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ke,be,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,H.__webglColorRenderbuffer[me])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),xe(H.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),ce(i.TEXTURE_CUBE_MAP,E);for(let me=0;me<6;me++)if(E.mipmaps&&E.mipmaps.length>0)for(let we=0;we<E.mipmaps.length;we++)re(H.__webglFramebuffer[me][we],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,we);else re(H.__webglFramebuffer[me],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);u(E)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let me=0,we=ee.length;me<we;me++){const nt=ee[me],le=n.get(nt);t.bindTexture(i.TEXTURE_2D,le.__webglTexture),ce(i.TEXTURE_2D,nt),re(H.__webglFramebuffer,P,nt,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,0),u(nt)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let me=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(me=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,j.__webglTexture),ce(me,E),E.mipmaps&&E.mipmaps.length>0)for(let we=0;we<E.mipmaps.length;we++)re(H.__webglFramebuffer[we],P,E,i.COLOR_ATTACHMENT0,me,we);else re(H.__webglFramebuffer,P,E,i.COLOR_ATTACHMENT0,me,0);u(E)&&m(me),t.unbindTexture()}P.depthBuffer&&Ne(P)}function He(P){const E=P.textures;for(let H=0,j=E.length;H<j;H++){const ee=E[H];if(u(ee)){const Z=P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Ae=n.get(ee).__webglTexture;t.bindTexture(Z,Ae),m(Z),t.unbindTexture()}}}const J=[],R=[];function $(P){if(P.samples>0){if(K(P)===!1){const E=P.textures,H=P.width,j=P.height;let ee=i.COLOR_BUFFER_BIT;const Z=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(P),me=E.length>1;if(me)for(let we=0;we<E.length;we++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let we=0;we<E.length;we++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),me){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[we]);const nt=n.get(E[we]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,nt,0)}i.blitFramebuffer(0,0,H,j,0,0,H,j,ee,i.NEAREST),c===!0&&(J.length=0,R.length=0,J.push(i.COLOR_ATTACHMENT0+we),P.depthBuffer&&P.resolveDepthBuffer===!1&&(J.push(Z),R.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,R)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,J))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),me)for(let we=0;we<E.length;we++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[we]);const nt=n.get(E[we]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,nt,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const E=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function ne(P){return Math.min(s.maxSamples,P.samples)}function K(P){const E=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function ae(P){const E=o.render.frame;h.get(P)!==E&&(h.set(P,E),P.update())}function _e(P,E){const H=P.colorSpace,j=P.format,ee=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==Kt&&H!==Vi&&(rt.getTransfer(H)===yt?(j!==On||ee!==Ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),E}function fe(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=w,this.setTexture2D=N,this.setTexture2DArray=z,this.setTexture3D=D,this.setTextureCube=X,this.rebindTextures=Te,this.setupRenderTarget=De,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=$,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=re,this.useMultisampledRTT=K}function Vx(i,e){function t(n,s=Vi){let r;const o=rt.getTransfer(s);if(n===Ai)return i.UNSIGNED_BYTE;if(n===Pl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ll)return i.UNSIGNED_SHORT_5_5_5_1;if(n===md)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===fd)return i.BYTE;if(n===pd)return i.SHORT;if(n===Gr)return i.UNSIGNED_SHORT;if(n===Cl)return i.INT;if(n===ds)return i.UNSIGNED_INT;if(n===vn)return i.FLOAT;if(n===bi)return i.HALF_FLOAT;if(n===gd)return i.ALPHA;if(n===_d)return i.RGB;if(n===On)return i.RGBA;if(n===xd)return i.LUMINANCE;if(n===vd)return i.LUMINANCE_ALPHA;if(n===Ys)return i.DEPTH_COMPONENT;if(n===or)return i.DEPTH_STENCIL;if(n===Il)return i.RED;if(n===Dl)return i.RED_INTEGER;if(n===yd)return i.RG;if(n===Nl)return i.RG_INTEGER;if(n===Ul)return i.RGBA_INTEGER;if(n===jo||n===Zo||n===Jo||n===Qo)if(o===yt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===jo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===jo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bc||n===zc||n===kc||n===Hc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Bc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===zc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===kc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Hc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Vc||n===Gc||n===Wc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Vc||n===Gc)return o===yt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wc)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xc||n===qc||n===Kc||n===Yc||n===$c||n===jc||n===Zc||n===Jc||n===Qc||n===el||n===tl||n===nl||n===il||n===sl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xc)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qc)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Kc)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Yc)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===$c)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===jc)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Zc)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Jc)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qc)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===el)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===tl)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===nl)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===il)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sl)return o===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ea||n===rl||n===ol)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ea)return o===yt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===rl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ol)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Md||n===al||n===cl||n===ll)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ea)return r.COMPRESSED_RED_RGTC1_EXT;if(n===al)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===cl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ll)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Gx extends ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Je extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wx={type:"move"};class ic{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const u=t.getJointPose(_,n),m=this._getHandJoint(l,_);u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=u.radius),m.visible=u!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=h.position.distanceTo(f.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Wx)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Je;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Xx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qx=`
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

}`;class Kx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new zt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ri({vertexShader:Xx,fragmentShader:qx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Q(new Zt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Yx extends fr{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,d=null,p=null,g=null;const _=new Kx,u=t.getContextAttributes();let m=null,y=null;const x=[],M=[],A=new he;let S=null;const b=new ln;b.layers.enable(1),b.viewport=new at;const T=new ln;T.layers.enable(2),T.viewport=new at;const L=[b,T],v=new Gx;v.layers.enable(1),v.layers.enable(2);let w=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let re=x[q];return re===void 0&&(re=new ic,x[q]=re),re.getTargetRaySpace()},this.getControllerGrip=function(q){let re=x[q];return re===void 0&&(re=new ic,x[q]=re),re.getGripSpace()},this.getHand=function(q){let re=x[q];return re===void 0&&(re=new ic,x[q]=re),re.getHandSpace()};function U(q){const re=M.indexOf(q.inputSource);if(re===-1)return;const xe=x[re];xe!==void 0&&(xe.update(q.inputSource,q.frame,l||o),xe.dispatchEvent({type:q.type,data:q.inputSource}))}function N(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",N),s.removeEventListener("inputsourceschange",z);for(let q=0;q<x.length;q++){const re=M[q];re!==null&&(M[q]=null,x[q].disconnect(re))}w=null,F=null,_.reset(),e.setRenderTarget(m),p=null,d=null,f=null,s=null,y=null,Ce.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",N),s.addEventListener("inputsourceschange",z),u.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(A),s.renderState.layers===void 0){const re={antialias:u.antialias,alpha:!0,depth:u.depth,stencil:u.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,re),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new fs(p.framebufferWidth,p.framebufferHeight,{format:On,type:Ai,colorSpace:e.outputColorSpace,stencilBuffer:u.stencil})}else{let re=null,xe=null,ue=null;u.depth&&(ue=u.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=u.stencil?or:Ys,xe=u.stencil?rr:ds);const Ne={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:r};f=new XRWebGLBinding(s,t),d=f.createProjectionLayer(Ne),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new fs(d.textureWidth,d.textureHeight,{format:On,type:Ai,depthTexture:new Od(d.textureWidth,d.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:u.stencil,colorSpace:e.outputColorSpace,samples:u.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ce.setContext(s),Ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function z(q){for(let re=0;re<q.removed.length;re++){const xe=q.removed[re],ue=M.indexOf(xe);ue>=0&&(M[ue]=null,x[ue].disconnect(xe))}for(let re=0;re<q.added.length;re++){const xe=q.added[re];let ue=M.indexOf(xe);if(ue===-1){for(let Te=0;Te<x.length;Te++)if(Te>=M.length){M.push(xe),ue=Te;break}else if(M[Te]===null){M[Te]=xe,ue=Te;break}if(ue===-1)break}const Ne=x[ue];Ne&&Ne.connect(xe)}}const D=new I,X=new I;function V(q,re,xe){D.setFromMatrixPosition(re.matrixWorld),X.setFromMatrixPosition(xe.matrixWorld);const ue=D.distanceTo(X),Ne=re.projectionMatrix.elements,Te=xe.projectionMatrix.elements,De=Ne[14]/(Ne[10]-1),He=Ne[14]/(Ne[10]+1),J=(Ne[9]+1)/Ne[5],R=(Ne[9]-1)/Ne[5],$=(Ne[8]-1)/Ne[0],ne=(Te[8]+1)/Te[0],K=De*$,ae=De*ne,_e=ue/(-$+ne),fe=_e*-$;if(re.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(fe),q.translateZ(_e),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ne[10]===-1)q.projectionMatrix.copy(re.projectionMatrix),q.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const P=De+_e,E=He+_e,H=K-fe,j=ae+(ue-fe),ee=J*He/E*P,Z=R*He/E*P;q.projectionMatrix.makePerspective(H,j,ee,Z,P,E),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function te(q,re){re===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(re.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let re=q.near,xe=q.far;_.texture!==null&&(_.depthNear>0&&(re=_.depthNear),_.depthFar>0&&(xe=_.depthFar)),v.near=T.near=b.near=re,v.far=T.far=b.far=xe,(w!==v.near||F!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),w=v.near,F=v.far);const ue=q.parent,Ne=v.cameras;te(v,ue);for(let Te=0;Te<Ne.length;Te++)te(Ne[Te],ue);Ne.length===2?V(v,b,T):v.projectionMatrix.copy(b.projectionMatrix),oe(q,v,ue)};function oe(q,re,xe){xe===null?q.matrix.copy(re.matrixWorld):(q.matrix.copy(xe.matrixWorld),q.matrix.invert(),q.matrix.multiply(re.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(re.projectionMatrix),q.projectionMatrixInverse.copy(re.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ar*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(q){c=q,d!==null&&(d.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let ce=null;function Le(q,re){if(h=re.getViewerPose(l||o),g=re,h!==null){const xe=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let ue=!1;xe.length!==v.cameras.length&&(v.cameras.length=0,ue=!0);for(let Te=0;Te<xe.length;Te++){const De=xe[Te];let He=null;if(p!==null)He=p.getViewport(De);else{const R=f.getViewSubImage(d,De);He=R.viewport,Te===0&&(e.setRenderTargetTextures(y,R.colorTexture,d.ignoreDepthValues?void 0:R.depthStencilTexture),e.setRenderTarget(y))}let J=L[Te];J===void 0&&(J=new ln,J.layers.enable(Te),J.viewport=new at,L[Te]=J),J.matrix.fromArray(De.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(De.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(He.x,He.y,He.width,He.height),Te===0&&(v.matrix.copy(J.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ue===!0&&v.cameras.push(J)}const Ne=s.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")){const Te=f.getDepthInformation(xe[0]);Te&&Te.isValid&&Te.texture&&_.init(e,Te,s.renderState)}}for(let xe=0;xe<x.length;xe++){const ue=M[xe],Ne=x[xe];ue!==null&&Ne!==void 0&&Ne.update(ue,re,l||o)}ce&&ce(q,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),g=null}const Ce=new Fd;Ce.setAnimationLoop(Le),this.setAnimationLoop=function(q){ce=q},this.dispose=function(){}}}const ss=new Sn,$x=new qe;function jx(i,e){function t(u,m){u.matrixAutoUpdate===!0&&u.updateMatrix(),m.value.copy(u.matrix)}function n(u,m){m.color.getRGB(u.fogColor.value,Id(i)),m.isFog?(u.fogNear.value=m.near,u.fogFar.value=m.far):m.isFogExp2&&(u.fogDensity.value=m.density)}function s(u,m,y,x,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(u,m):m.isMeshToonMaterial?(r(u,m),f(u,m)):m.isMeshPhongMaterial?(r(u,m),h(u,m)):m.isMeshStandardMaterial?(r(u,m),d(u,m),m.isMeshPhysicalMaterial&&p(u,m,M)):m.isMeshMatcapMaterial?(r(u,m),g(u,m)):m.isMeshDepthMaterial?r(u,m):m.isMeshDistanceMaterial?(r(u,m),_(u,m)):m.isMeshNormalMaterial?r(u,m):m.isLineBasicMaterial?(o(u,m),m.isLineDashedMaterial&&a(u,m)):m.isPointsMaterial?c(u,m,y,x):m.isSpriteMaterial?l(u,m):m.isShadowMaterial?(u.color.value.copy(m.color),u.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(u,m){u.opacity.value=m.opacity,m.color&&u.diffuse.value.copy(m.color),m.emissive&&u.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(u.map.value=m.map,t(m.map,u.mapTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,t(m.alphaMap,u.alphaMapTransform)),m.bumpMap&&(u.bumpMap.value=m.bumpMap,t(m.bumpMap,u.bumpMapTransform),u.bumpScale.value=m.bumpScale,m.side===fn&&(u.bumpScale.value*=-1)),m.normalMap&&(u.normalMap.value=m.normalMap,t(m.normalMap,u.normalMapTransform),u.normalScale.value.copy(m.normalScale),m.side===fn&&u.normalScale.value.negate()),m.displacementMap&&(u.displacementMap.value=m.displacementMap,t(m.displacementMap,u.displacementMapTransform),u.displacementScale.value=m.displacementScale,u.displacementBias.value=m.displacementBias),m.emissiveMap&&(u.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,u.emissiveMapTransform)),m.specularMap&&(u.specularMap.value=m.specularMap,t(m.specularMap,u.specularMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest);const y=e.get(m),x=y.envMap,M=y.envMapRotation;x&&(u.envMap.value=x,ss.copy(M),ss.x*=-1,ss.y*=-1,ss.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ss.y*=-1,ss.z*=-1),u.envMapRotation.value.setFromMatrix4($x.makeRotationFromEuler(ss)),u.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=m.reflectivity,u.ior.value=m.ior,u.refractionRatio.value=m.refractionRatio),m.lightMap&&(u.lightMap.value=m.lightMap,u.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,u.lightMapTransform)),m.aoMap&&(u.aoMap.value=m.aoMap,u.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,u.aoMapTransform))}function o(u,m){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,m.map&&(u.map.value=m.map,t(m.map,u.mapTransform))}function a(u,m){u.dashSize.value=m.dashSize,u.totalSize.value=m.dashSize+m.gapSize,u.scale.value=m.scale}function c(u,m,y,x){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,u.size.value=m.size*y,u.scale.value=x*.5,m.map&&(u.map.value=m.map,t(m.map,u.uvTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,t(m.alphaMap,u.alphaMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest)}function l(u,m){u.diffuse.value.copy(m.color),u.opacity.value=m.opacity,u.rotation.value=m.rotation,m.map&&(u.map.value=m.map,t(m.map,u.mapTransform)),m.alphaMap&&(u.alphaMap.value=m.alphaMap,t(m.alphaMap,u.alphaMapTransform)),m.alphaTest>0&&(u.alphaTest.value=m.alphaTest)}function h(u,m){u.specular.value.copy(m.specular),u.shininess.value=Math.max(m.shininess,1e-4)}function f(u,m){m.gradientMap&&(u.gradientMap.value=m.gradientMap)}function d(u,m){u.metalness.value=m.metalness,m.metalnessMap&&(u.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,u.metalnessMapTransform)),u.roughness.value=m.roughness,m.roughnessMap&&(u.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,u.roughnessMapTransform)),m.envMap&&(u.envMapIntensity.value=m.envMapIntensity)}function p(u,m,y){u.ior.value=m.ior,m.sheen>0&&(u.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),u.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(u.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,u.sheenColorMapTransform)),m.sheenRoughnessMap&&(u.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,u.sheenRoughnessMapTransform))),m.clearcoat>0&&(u.clearcoat.value=m.clearcoat,u.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(u.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,u.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(u.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===fn&&u.clearcoatNormalScale.value.negate())),m.dispersion>0&&(u.dispersion.value=m.dispersion),m.iridescence>0&&(u.iridescence.value=m.iridescence,u.iridescenceIOR.value=m.iridescenceIOR,u.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],u.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(u.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,u.iridescenceMapTransform)),m.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),m.transmission>0&&(u.transmission.value=m.transmission,u.transmissionSamplerMap.value=y.texture,u.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(u.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,u.transmissionMapTransform)),u.thickness.value=m.thickness,m.thicknessMap&&(u.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=m.attenuationDistance,u.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(u.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(u.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=m.specularIntensity,u.specularColor.value.copy(m.specularColor),m.specularColorMap&&(u.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,u.specularColorMapTransform)),m.specularIntensityMap&&(u.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,u.specularIntensityMapTransform))}function g(u,m){m.matcap&&(u.matcap.value=m.matcap)}function _(u,m){const y=e.get(m).light;u.referencePosition.value.setFromMatrixPosition(y.matrixWorld),u.nearDistance.value=y.shadow.camera.near,u.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Zx(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,x){const M=x.program;n.uniformBlockBinding(y,M)}function l(y,x){let M=s[y.id];M===void 0&&(g(y),M=h(y),s[y.id]=M,y.addEventListener("dispose",u));const A=x.program;n.updateUBOMapping(y,A);const S=e.render.frame;r[y.id]!==S&&(d(y),r[y.id]=S)}function h(y){const x=f();y.__bindingPointIndex=x;const M=i.createBuffer(),A=y.__size,S=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,A,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,M),M}function f(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const x=s[y.id],M=y.uniforms,A=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let S=0,b=M.length;S<b;S++){const T=Array.isArray(M[S])?M[S]:[M[S]];for(let L=0,v=T.length;L<v;L++){const w=T[L];if(p(w,S,L,A)===!0){const F=w.__offset,U=Array.isArray(w.value)?w.value:[w.value];let N=0;for(let z=0;z<U.length;z++){const D=U[z],X=_(D);typeof D=="number"||typeof D=="boolean"?(w.__data[0]=D,i.bufferSubData(i.UNIFORM_BUFFER,F+N,w.__data)):D.isMatrix3?(w.__data[0]=D.elements[0],w.__data[1]=D.elements[1],w.__data[2]=D.elements[2],w.__data[3]=0,w.__data[4]=D.elements[3],w.__data[5]=D.elements[4],w.__data[6]=D.elements[5],w.__data[7]=0,w.__data[8]=D.elements[6],w.__data[9]=D.elements[7],w.__data[10]=D.elements[8],w.__data[11]=0):(D.toArray(w.__data,N),N+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,x,M,A){const S=y.value,b=x+"_"+M;if(A[b]===void 0)return typeof S=="number"||typeof S=="boolean"?A[b]=S:A[b]=S.clone(),!0;{const T=A[b];if(typeof S=="number"||typeof S=="boolean"){if(T!==S)return A[b]=S,!0}else if(T.equals(S)===!1)return T.copy(S),!0}return!1}function g(y){const x=y.uniforms;let M=0;const A=16;for(let b=0,T=x.length;b<T;b++){const L=Array.isArray(x[b])?x[b]:[x[b]];for(let v=0,w=L.length;v<w;v++){const F=L[v],U=Array.isArray(F.value)?F.value:[F.value];for(let N=0,z=U.length;N<z;N++){const D=U[N],X=_(D),V=M%A,te=V%X.boundary,oe=V+te;M+=te,oe!==0&&A-oe<X.storage&&(M+=A-oe),F.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=X.storage}}}const S=M%A;return S>0&&(M+=A-S),y.__size=M,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function u(y){const x=y.target;x.removeEventListener("dispose",u);const M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:m}}class Jx{constructor(e={}){const{canvas:t=Op(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,u=null;const m=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nn,this.toneMapping=$i,this.toneMappingExposure=1;const x=this;let M=!1,A=0,S=0,b=null,T=-1,L=null;const v=new at,w=new at;let F=null;const U=new ze(0);let N=0,z=t.width,D=t.height,X=1,V=null,te=null;const oe=new at(0,0,z,D),ce=new at(0,0,z,D);let Le=!1;const Ce=new Bl;let q=!1,re=!1;const xe=new qe,ue=new qe,Ne=new I,Te=new at,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let He=!1;function J(){return b===null?X:1}let R=n;function $(C,B){return t.getContext(C,B)}try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Rl}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",ve,!1),t.addEventListener("webglcontextcreationerror",Se,!1),R===null){const B="webgl2";if(R=$(B,C),R===null)throw $(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let ne,K,ae,_e,fe,P,E,H,j,ee,Z,Ae,me,we,nt,le,be,Ke,Ye,Re,it,$e,gt,O;function Me(){ne=new i_(R),ne.init(),$e=new Vx(R,ne),K=new Zg(R,ne,e,$e),ae=new zx(R),K.reverseDepthBuffer&&ae.buffers.depth.setReversed(!0),_e=new o_(R),fe=new bx,P=new Hx(R,ne,ae,fe,K,$e,_e),E=new Qg(x),H=new n_(x),j=new fm(R),gt=new $g(R,j),ee=new s_(R,j,_e,gt),Z=new c_(R,ee,j,_e),Ye=new a_(R,K,P),le=new Jg(fe),Ae=new wx(x,E,H,ne,K,gt,le),me=new jx(x,fe),we=new Tx,nt=new Ix(ne),Ke=new Yg(x,E,H,ae,Z,d,c),be=new Ox(x,Z,K),O=new Zx(R,_e,K,ae),Re=new jg(R,ne,_e),it=new r_(R,ne,_e),_e.programs=Ae.programs,x.capabilities=K,x.extensions=ne,x.properties=fe,x.renderLists=we,x.shadowMap=be,x.state=ae,x.info=_e}Me();const Y=new Yx(x,R);this.xr=Y,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const C=ne.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ne.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(C){C!==void 0&&(X=C,this.setSize(z,D,!1))},this.getSize=function(C){return C.set(z,D)},this.setSize=function(C,B,G=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=C,D=B,t.width=Math.floor(C*X),t.height=Math.floor(B*X),G===!0&&(t.style.width=C+"px",t.style.height=B+"px"),this.setViewport(0,0,C,B)},this.getDrawingBufferSize=function(C){return C.set(z*X,D*X).floor()},this.setDrawingBufferSize=function(C,B,G){z=C,D=B,X=G,t.width=Math.floor(C*G),t.height=Math.floor(B*G),this.setViewport(0,0,C,B)},this.getCurrentViewport=function(C){return C.copy(v)},this.getViewport=function(C){return C.copy(oe)},this.setViewport=function(C,B,G,W){C.isVector4?oe.set(C.x,C.y,C.z,C.w):oe.set(C,B,G,W),ae.viewport(v.copy(oe).multiplyScalar(X).round())},this.getScissor=function(C){return C.copy(ce)},this.setScissor=function(C,B,G,W){C.isVector4?ce.set(C.x,C.y,C.z,C.w):ce.set(C,B,G,W),ae.scissor(w.copy(ce).multiplyScalar(X).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(C){ae.setScissorTest(Le=C)},this.setOpaqueSort=function(C){V=C},this.setTransparentSort=function(C){te=C},this.getClearColor=function(C){return C.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor.apply(Ke,arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha.apply(Ke,arguments)},this.clear=function(C=!0,B=!0,G=!0){let W=0;if(C){let k=!1;if(b!==null){const de=b.texture.format;k=de===Ul||de===Nl||de===Dl}if(k){const de=b.texture.type,ye=de===Ai||de===ds||de===Gr||de===rr||de===Pl||de===Ll,Pe=Ke.getClearColor(),Ie=Ke.getClearAlpha(),Ge=Pe.r,Xe=Pe.g,Ue=Pe.b;ye?(p[0]=Ge,p[1]=Xe,p[2]=Ue,p[3]=Ie,R.clearBufferuiv(R.COLOR,0,p)):(g[0]=Ge,g[1]=Xe,g[2]=Ue,g[3]=Ie,R.clearBufferiv(R.COLOR,0,g))}else W|=R.COLOR_BUFFER_BIT}B&&(W|=R.DEPTH_BUFFER_BIT,R.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),G&&(W|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",ve,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),we.dispose(),nt.dispose(),fe.dispose(),E.dispose(),H.dispose(),Z.dispose(),gt.dispose(),O.dispose(),Ae.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",oh),Y.removeEventListener("sessionend",ah),Ji.stop()};function ie(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function ve(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const C=_e.autoReset,B=be.enabled,G=be.autoUpdate,W=be.needsUpdate,k=be.type;Me(),_e.autoReset=C,be.enabled=B,be.autoUpdate=G,be.needsUpdate=W,be.type=k}function Se(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function st(C){const B=C.target;B.removeEventListener("dispose",st),Lt(B)}function Lt(C){mn(C),fe.remove(C)}function mn(C){const B=fe.get(C).programs;B!==void 0&&(B.forEach(function(G){Ae.releaseProgram(G)}),C.isShaderMaterial&&Ae.releaseShaderCache(C))}this.renderBufferDirect=function(C,B,G,W,k,de){B===null&&(B=De);const ye=k.isMesh&&k.matrixWorld.determinant()<0,Pe=Cf(C,B,G,W,k);ae.setMaterial(W,ye);let Ie=G.index,Ge=1;if(W.wireframe===!0){if(Ie=ee.getWireframeAttribute(G),Ie===void 0)return;Ge=2}const Xe=G.drawRange,Ue=G.attributes.position;let ut=Xe.start*Ge,vt=(Xe.start+Xe.count)*Ge;de!==null&&(ut=Math.max(ut,de.start*Ge),vt=Math.min(vt,(de.start+de.count)*Ge)),Ie!==null?(ut=Math.max(ut,0),vt=Math.min(vt,Ie.count)):Ue!=null&&(ut=Math.max(ut,0),vt=Math.min(vt,Ue.count));const Tt=vt-ut;if(Tt<0||Tt===1/0)return;gt.setup(k,W,Pe,G,Ie);let wn,ct=Re;if(Ie!==null&&(wn=j.get(Ie),ct=it,ct.setIndex(wn)),k.isMesh)W.wireframe===!0?(ae.setLineWidth(W.wireframeLinewidth*J()),ct.setMode(R.LINES)):ct.setMode(R.TRIANGLES);else if(k.isLine){let Oe=W.linewidth;Oe===void 0&&(Oe=1),ae.setLineWidth(Oe*J()),k.isLineSegments?ct.setMode(R.LINES):k.isLineLoop?ct.setMode(R.LINE_LOOP):ct.setMode(R.LINE_STRIP)}else k.isPoints?ct.setMode(R.POINTS):k.isSprite&&ct.setMode(R.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ct.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))ct.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Oe=k._multiDrawStarts,Yt=k._multiDrawCounts,lt=k._multiDrawCount,kn=Ie?j.get(Ie).bytesPerElement:1,ys=fe.get(W).currentProgram.getUniforms();for(let bn=0;bn<lt;bn++)ys.setValue(R,"_gl_DrawID",bn),ct.render(Oe[bn]/kn,Yt[bn])}else if(k.isInstancedMesh)ct.renderInstances(ut,Tt,k.count);else if(G.isInstancedBufferGeometry){const Oe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Yt=Math.min(G.instanceCount,Oe);ct.renderInstances(ut,Tt,Yt)}else ct.render(ut,Tt)};function ot(C,B,G){C.transparent===!0&&C.side===jt&&C.forceSinglePass===!1?(C.side=fn,C.needsUpdate=!0,no(C,B,G),C.side=Ti,C.needsUpdate=!0,no(C,B,G),C.side=jt):no(C,B,G)}this.compile=function(C,B,G=null){G===null&&(G=C),u=nt.get(G),u.init(B),y.push(u),G.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(u.pushLight(k),k.castShadow&&u.pushShadow(k))}),C!==G&&C.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(u.pushLight(k),k.castShadow&&u.pushShadow(k))}),u.setupLights();const W=new Set;return C.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const de=k.material;if(de)if(Array.isArray(de))for(let ye=0;ye<de.length;ye++){const Pe=de[ye];ot(Pe,G,k),W.add(Pe)}else ot(de,G,k),W.add(de)}),y.pop(),u=null,W},this.compileAsync=function(C,B,G=null){const W=this.compile(C,B,G);return new Promise(k=>{function de(){if(W.forEach(function(ye){fe.get(ye).currentProgram.isReady()&&W.delete(ye)}),W.size===0){k(C);return}setTimeout(de,10)}ne.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let gn=null;function di(C){gn&&gn(C)}function oh(){Ji.stop()}function ah(){Ji.start()}const Ji=new Fd;Ji.setAnimationLoop(di),typeof self<"u"&&Ji.setContext(self),this.setAnimationLoop=function(C){gn=C,Y.setAnimationLoop(C),C===null?Ji.stop():Ji.start()},Y.addEventListener("sessionstart",oh),Y.addEventListener("sessionend",ah),this.render=function(C,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(B),B=Y.getCamera()),C.isScene===!0&&C.onBeforeRender(x,C,B,b),u=nt.get(C,y.length),u.init(B),y.push(u),ue.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ce.setFromProjectionMatrix(ue),re=this.localClippingEnabled,q=le.init(this.clippingPlanes,re),_=we.get(C,m.length),_.init(),m.push(_),Y.enabled===!0&&Y.isPresenting===!0){const de=x.xr.getDepthSensingMesh();de!==null&&Ea(de,B,-1/0,x.sortObjects)}Ea(C,B,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(V,te),He=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,He&&Ke.addToRenderList(_,C),this.info.render.frame++,q===!0&&le.beginShadows();const G=u.state.shadowsArray;be.render(G,C,B),q===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=_.opaque,k=_.transmissive;if(u.setupLights(),B.isArrayCamera){const de=B.cameras;if(k.length>0)for(let ye=0,Pe=de.length;ye<Pe;ye++){const Ie=de[ye];lh(W,k,C,Ie)}He&&Ke.render(C);for(let ye=0,Pe=de.length;ye<Pe;ye++){const Ie=de[ye];ch(_,C,Ie,Ie.viewport)}}else k.length>0&&lh(W,k,C,B),He&&Ke.render(C),ch(_,C,B);b!==null&&(P.updateMultisampleRenderTarget(b),P.updateRenderTargetMipmap(b)),C.isScene===!0&&C.onAfterRender(x,C,B),gt.resetDefaultState(),T=-1,L=null,y.pop(),y.length>0?(u=y[y.length-1],q===!0&&le.setGlobalState(x.clippingPlanes,u.state.camera)):u=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Ea(C,B,G,W){if(C.visible===!1)return;if(C.layers.test(B.layers)){if(C.isGroup)G=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(B);else if(C.isLight)u.pushLight(C),C.castShadow&&u.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Ce.intersectsSprite(C)){W&&Te.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ue);const ye=Z.update(C),Pe=C.material;Pe.visible&&_.push(C,ye,Pe,G,Te.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Ce.intersectsObject(C))){const ye=Z.update(C),Pe=C.material;if(W&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Te.copy(C.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Te.copy(ye.boundingSphere.center)),Te.applyMatrix4(C.matrixWorld).applyMatrix4(ue)),Array.isArray(Pe)){const Ie=ye.groups;for(let Ge=0,Xe=Ie.length;Ge<Xe;Ge++){const Ue=Ie[Ge],ut=Pe[Ue.materialIndex];ut&&ut.visible&&_.push(C,ye,ut,G,Te.z,Ue)}}else Pe.visible&&_.push(C,ye,Pe,G,Te.z,null)}}const de=C.children;for(let ye=0,Pe=de.length;ye<Pe;ye++)Ea(de[ye],B,G,W)}function ch(C,B,G,W){const k=C.opaque,de=C.transmissive,ye=C.transparent;u.setupLightsView(G),q===!0&&le.setGlobalState(x.clippingPlanes,G),W&&ae.viewport(v.copy(W)),k.length>0&&to(k,B,G),de.length>0&&to(de,B,G),ye.length>0&&to(ye,B,G),ae.buffers.depth.setTest(!0),ae.buffers.depth.setMask(!0),ae.buffers.color.setMask(!0),ae.setPolygonOffset(!1)}function lh(C,B,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[W.id]===void 0&&(u.state.transmissionRenderTarget[W.id]=new fs(1,1,{generateMipmaps:!0,type:ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float")?bi:Ai,minFilter:ii,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace}));const de=u.state.transmissionRenderTarget[W.id],ye=W.viewport||v;de.setSize(ye.z,ye.w);const Pe=x.getRenderTarget();x.setRenderTarget(de),x.getClearColor(U),N=x.getClearAlpha(),N<1&&x.setClearColor(16777215,.5),x.clear(),He&&Ke.render(G);const Ie=x.toneMapping;x.toneMapping=$i;const Ge=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),u.setupLightsView(W),q===!0&&le.setGlobalState(x.clippingPlanes,W),to(C,G,W),P.updateMultisampleRenderTarget(de),P.updateRenderTargetMipmap(de),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let Ue=0,ut=B.length;Ue<ut;Ue++){const vt=B[Ue],Tt=vt.object,wn=vt.geometry,ct=vt.material,Oe=vt.group;if(ct.side===jt&&Tt.layers.test(W.layers)){const Yt=ct.side;ct.side=fn,ct.needsUpdate=!0,hh(Tt,G,W,wn,ct,Oe),ct.side=Yt,ct.needsUpdate=!0,Xe=!0}}Xe===!0&&(P.updateMultisampleRenderTarget(de),P.updateRenderTargetMipmap(de))}x.setRenderTarget(Pe),x.setClearColor(U,N),Ge!==void 0&&(W.viewport=Ge),x.toneMapping=Ie}function to(C,B,G){const W=B.isScene===!0?B.overrideMaterial:null;for(let k=0,de=C.length;k<de;k++){const ye=C[k],Pe=ye.object,Ie=ye.geometry,Ge=W===null?ye.material:W,Xe=ye.group;Pe.layers.test(G.layers)&&hh(Pe,B,G,Ie,Ge,Xe)}}function hh(C,B,G,W,k,de){C.onBeforeRender(x,B,G,W,k,de),C.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),k.onBeforeRender(x,B,G,W,C,de),k.transparent===!0&&k.side===jt&&k.forceSinglePass===!1?(k.side=fn,k.needsUpdate=!0,x.renderBufferDirect(G,B,W,k,C,de),k.side=Ti,k.needsUpdate=!0,x.renderBufferDirect(G,B,W,k,C,de),k.side=jt):x.renderBufferDirect(G,B,W,k,C,de),C.onAfterRender(x,B,G,W,k,de)}function no(C,B,G){B.isScene!==!0&&(B=De);const W=fe.get(C),k=u.state.lights,de=u.state.shadowsArray,ye=k.state.version,Pe=Ae.getParameters(C,k.state,de,B,G),Ie=Ae.getProgramCacheKey(Pe);let Ge=W.programs;W.environment=C.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(C.isMeshStandardMaterial?H:E).get(C.envMap||W.environment),W.envMapRotation=W.environment!==null&&C.envMap===null?B.environmentRotation:C.envMapRotation,Ge===void 0&&(C.addEventListener("dispose",st),Ge=new Map,W.programs=Ge);let Xe=Ge.get(Ie);if(Xe!==void 0){if(W.currentProgram===Xe&&W.lightsStateVersion===ye)return dh(C,Pe),Xe}else Pe.uniforms=Ae.getUniforms(C),C.onBeforeCompile(Pe,x),Xe=Ae.acquireProgram(Pe,Ie),Ge.set(Ie,Xe),W.uniforms=Pe.uniforms;const Ue=W.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ue.clippingPlanes=le.uniform),dh(C,Pe),W.needsLights=Lf(C),W.lightsStateVersion=ye,W.needsLights&&(Ue.ambientLightColor.value=k.state.ambient,Ue.lightProbe.value=k.state.probe,Ue.directionalLights.value=k.state.directional,Ue.directionalLightShadows.value=k.state.directionalShadow,Ue.spotLights.value=k.state.spot,Ue.spotLightShadows.value=k.state.spotShadow,Ue.rectAreaLights.value=k.state.rectArea,Ue.ltc_1.value=k.state.rectAreaLTC1,Ue.ltc_2.value=k.state.rectAreaLTC2,Ue.pointLights.value=k.state.point,Ue.pointLightShadows.value=k.state.pointShadow,Ue.hemisphereLights.value=k.state.hemi,Ue.directionalShadowMap.value=k.state.directionalShadowMap,Ue.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ue.spotShadowMap.value=k.state.spotShadowMap,Ue.spotLightMatrix.value=k.state.spotLightMatrix,Ue.spotLightMap.value=k.state.spotLightMap,Ue.pointShadowMap.value=k.state.pointShadowMap,Ue.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=Xe,W.uniformsList=null,Xe}function uh(C){if(C.uniformsList===null){const B=C.currentProgram.getUniforms();C.uniformsList=na.seqWithValue(B.seq,C.uniforms)}return C.uniformsList}function dh(C,B){const G=fe.get(C);G.outputColorSpace=B.outputColorSpace,G.batching=B.batching,G.batchingColor=B.batchingColor,G.instancing=B.instancing,G.instancingColor=B.instancingColor,G.instancingMorph=B.instancingMorph,G.skinning=B.skinning,G.morphTargets=B.morphTargets,G.morphNormals=B.morphNormals,G.morphColors=B.morphColors,G.morphTargetsCount=B.morphTargetsCount,G.numClippingPlanes=B.numClippingPlanes,G.numIntersection=B.numClipIntersection,G.vertexAlphas=B.vertexAlphas,G.vertexTangents=B.vertexTangents,G.toneMapping=B.toneMapping}function Cf(C,B,G,W,k){B.isScene!==!0&&(B=De),P.resetTextureUnits();const de=B.fog,ye=W.isMeshStandardMaterial?B.environment:null,Pe=b===null?x.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Kt,Ie=(W.isMeshStandardMaterial?H:E).get(W.envMap||ye),Ge=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Xe=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ue=!!G.morphAttributes.position,ut=!!G.morphAttributes.normal,vt=!!G.morphAttributes.color;let Tt=$i;W.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(Tt=x.toneMapping);const wn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ct=wn!==void 0?wn.length:0,Oe=fe.get(W),Yt=u.state.lights;if(q===!0&&(re===!0||C!==L)){const Cn=C===L&&W.id===T;le.setState(W,C,Cn)}let lt=!1;W.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Yt.state.version||Oe.outputColorSpace!==Pe||k.isBatchedMesh&&Oe.batching===!1||!k.isBatchedMesh&&Oe.batching===!0||k.isBatchedMesh&&Oe.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Oe.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Oe.instancing===!1||!k.isInstancedMesh&&Oe.instancing===!0||k.isSkinnedMesh&&Oe.skinning===!1||!k.isSkinnedMesh&&Oe.skinning===!0||k.isInstancedMesh&&Oe.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Oe.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Oe.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Oe.instancingMorph===!1&&k.morphTexture!==null||Oe.envMap!==Ie||W.fog===!0&&Oe.fog!==de||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==le.numPlanes||Oe.numIntersection!==le.numIntersection)||Oe.vertexAlphas!==Ge||Oe.vertexTangents!==Xe||Oe.morphTargets!==Ue||Oe.morphNormals!==ut||Oe.morphColors!==vt||Oe.toneMapping!==Tt||Oe.morphTargetsCount!==ct)&&(lt=!0):(lt=!0,Oe.__version=W.version);let kn=Oe.currentProgram;lt===!0&&(kn=no(W,B,k));let ys=!1,bn=!1,Ta=!1;const Rt=kn.getUniforms(),Ci=Oe.uniforms;if(ae.useProgram(kn.program)&&(ys=!0,bn=!0,Ta=!0),W.id!==T&&(T=W.id,bn=!0),ys||L!==C){K.reverseDepthBuffer?(xe.copy(C.projectionMatrix),zp(xe),kp(xe),Rt.setValue(R,"projectionMatrix",xe)):Rt.setValue(R,"projectionMatrix",C.projectionMatrix),Rt.setValue(R,"viewMatrix",C.matrixWorldInverse);const Cn=Rt.map.cameraPosition;Cn!==void 0&&Cn.setValue(R,Ne.setFromMatrixPosition(C.matrixWorld)),K.logarithmicDepthBuffer&&Rt.setValue(R,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Rt.setValue(R,"isOrthographic",C.isOrthographicCamera===!0),L!==C&&(L=C,bn=!0,Ta=!0)}if(k.isSkinnedMesh){Rt.setOptional(R,k,"bindMatrix"),Rt.setOptional(R,k,"bindMatrixInverse");const Cn=k.skeleton;Cn&&(Cn.boneTexture===null&&Cn.computeBoneTexture(),Rt.setValue(R,"boneTexture",Cn.boneTexture,P))}k.isBatchedMesh&&(Rt.setOptional(R,k,"batchingTexture"),Rt.setValue(R,"batchingTexture",k._matricesTexture,P),Rt.setOptional(R,k,"batchingIdTexture"),Rt.setValue(R,"batchingIdTexture",k._indirectTexture,P),Rt.setOptional(R,k,"batchingColorTexture"),k._colorsTexture!==null&&Rt.setValue(R,"batchingColorTexture",k._colorsTexture,P));const Aa=G.morphAttributes;if((Aa.position!==void 0||Aa.normal!==void 0||Aa.color!==void 0)&&Ye.update(k,G,kn),(bn||Oe.receiveShadow!==k.receiveShadow)&&(Oe.receiveShadow=k.receiveShadow,Rt.setValue(R,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ci.envMap.value=Ie,Ci.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&B.environment!==null&&(Ci.envMapIntensity.value=B.environmentIntensity),bn&&(Rt.setValue(R,"toneMappingExposure",x.toneMappingExposure),Oe.needsLights&&Pf(Ci,Ta),de&&W.fog===!0&&me.refreshFogUniforms(Ci,de),me.refreshMaterialUniforms(Ci,W,X,D,u.state.transmissionRenderTarget[C.id]),na.upload(R,uh(Oe),Ci,P)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(na.upload(R,uh(Oe),Ci,P),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Rt.setValue(R,"center",k.center),Rt.setValue(R,"modelViewMatrix",k.modelViewMatrix),Rt.setValue(R,"normalMatrix",k.normalMatrix),Rt.setValue(R,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Cn=W.uniformsGroups;for(let Ra=0,If=Cn.length;Ra<If;Ra++){const fh=Cn[Ra];O.update(fh,kn),O.bind(fh,kn)}}return kn}function Pf(C,B){C.ambientLightColor.needsUpdate=B,C.lightProbe.needsUpdate=B,C.directionalLights.needsUpdate=B,C.directionalLightShadows.needsUpdate=B,C.pointLights.needsUpdate=B,C.pointLightShadows.needsUpdate=B,C.spotLights.needsUpdate=B,C.spotLightShadows.needsUpdate=B,C.rectAreaLights.needsUpdate=B,C.hemisphereLights.needsUpdate=B}function Lf(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(C,B,G){fe.get(C.texture).__webglTexture=B,fe.get(C.depthTexture).__webglTexture=G;const W=fe.get(C);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,B){const G=fe.get(C);G.__webglFramebuffer=B,G.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(C,B=0,G=0){b=C,A=B,S=G;let W=!0,k=null,de=!1,ye=!1;if(C){const Ie=fe.get(C);if(Ie.__useDefaultFramebuffer!==void 0)ae.bindFramebuffer(R.FRAMEBUFFER,null),W=!1;else if(Ie.__webglFramebuffer===void 0)P.setupRenderTarget(C);else if(Ie.__hasExternalTextures)P.rebindTextures(C,fe.get(C.texture).__webglTexture,fe.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Ue=C.depthTexture;if(Ie.__boundDepthTexture!==Ue){if(Ue!==null&&fe.has(Ue)&&(C.width!==Ue.image.width||C.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(C)}}const Ge=C.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(ye=!0);const Xe=fe.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Xe[B])?k=Xe[B][G]:k=Xe[B],de=!0):C.samples>0&&P.useMultisampledRTT(C)===!1?k=fe.get(C).__webglMultisampledFramebuffer:Array.isArray(Xe)?k=Xe[G]:k=Xe,v.copy(C.viewport),w.copy(C.scissor),F=C.scissorTest}else v.copy(oe).multiplyScalar(X).floor(),w.copy(ce).multiplyScalar(X).floor(),F=Le;if(ae.bindFramebuffer(R.FRAMEBUFFER,k)&&W&&ae.drawBuffers(C,k),ae.viewport(v),ae.scissor(w),ae.setScissorTest(F),de){const Ie=fe.get(C.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ie.__webglTexture,G)}else if(ye){const Ie=fe.get(C.texture),Ge=B||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ie.__webglTexture,G||0,Ge)}T=-1},this.readRenderTargetPixels=function(C,B,G,W,k,de,ye){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=fe.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ye!==void 0&&(Pe=Pe[ye]),Pe){ae.bindFramebuffer(R.FRAMEBUFFER,Pe);try{const Ie=C.texture,Ge=Ie.format,Xe=Ie.type;if(!K.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!K.textureTypeReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=C.width-W&&G>=0&&G<=C.height-k&&R.readPixels(B,G,W,k,$e.convert(Ge),$e.convert(Xe),de)}finally{const Ie=b!==null?fe.get(b).__webglFramebuffer:null;ae.bindFramebuffer(R.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(C,B,G,W,k,de,ye){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=fe.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ye!==void 0&&(Pe=Pe[ye]),Pe){const Ie=C.texture,Ge=Ie.format,Xe=Ie.type;if(!K.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!K.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=C.width-W&&G>=0&&G<=C.height-k){ae.bindFramebuffer(R.FRAMEBUFFER,Pe);const Ue=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Ue),R.bufferData(R.PIXEL_PACK_BUFFER,de.byteLength,R.STREAM_READ),R.readPixels(B,G,W,k,$e.convert(Ge),$e.convert(Xe),0);const ut=b!==null?fe.get(b).__webglFramebuffer:null;ae.bindFramebuffer(R.FRAMEBUFFER,ut);const vt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Bp(R,vt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Ue),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,de),R.deleteBuffer(Ue),R.deleteSync(vt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,B=null,G=0){C.isTexture!==!0&&(ta("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,C=arguments[1]);const W=Math.pow(2,-G),k=Math.floor(C.image.width*W),de=Math.floor(C.image.height*W),ye=B!==null?B.x:0,Pe=B!==null?B.y:0;P.setTexture2D(C,0),R.copyTexSubImage2D(R.TEXTURE_2D,G,0,0,ye,Pe,k,de),ae.unbindTexture()},this.copyTextureToTexture=function(C,B,G=null,W=null,k=0){C.isTexture!==!0&&(ta("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,C=arguments[1],B=arguments[2],k=arguments[3]||0,G=null);let de,ye,Pe,Ie,Ge,Xe;G!==null?(de=G.max.x-G.min.x,ye=G.max.y-G.min.y,Pe=G.min.x,Ie=G.min.y):(de=C.image.width,ye=C.image.height,Pe=0,Ie=0),W!==null?(Ge=W.x,Xe=W.y):(Ge=0,Xe=0);const Ue=$e.convert(B.format),ut=$e.convert(B.type);P.setTexture2D(B,0),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,B.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,B.unpackAlignment);const vt=R.getParameter(R.UNPACK_ROW_LENGTH),Tt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),wn=R.getParameter(R.UNPACK_SKIP_PIXELS),ct=R.getParameter(R.UNPACK_SKIP_ROWS),Oe=R.getParameter(R.UNPACK_SKIP_IMAGES),Yt=C.isCompressedTexture?C.mipmaps[k]:C.image;R.pixelStorei(R.UNPACK_ROW_LENGTH,Yt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Yt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Pe),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ie),C.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,k,Ge,Xe,de,ye,Ue,ut,Yt.data):C.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,k,Ge,Xe,Yt.width,Yt.height,Ue,Yt.data):R.texSubImage2D(R.TEXTURE_2D,k,Ge,Xe,de,ye,Ue,ut,Yt),R.pixelStorei(R.UNPACK_ROW_LENGTH,vt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Tt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,wn),R.pixelStorei(R.UNPACK_SKIP_ROWS,ct),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Oe),k===0&&B.generateMipmaps&&R.generateMipmap(R.TEXTURE_2D),ae.unbindTexture()},this.copyTextureToTexture3D=function(C,B,G=null,W=null,k=0){C.isTexture!==!0&&(ta("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,C=arguments[2],B=arguments[3],k=arguments[4]||0);let de,ye,Pe,Ie,Ge,Xe,Ue,ut,vt;const Tt=C.isCompressedTexture?C.mipmaps[k]:C.image;G!==null?(de=G.max.x-G.min.x,ye=G.max.y-G.min.y,Pe=G.max.z-G.min.z,Ie=G.min.x,Ge=G.min.y,Xe=G.min.z):(de=Tt.width,ye=Tt.height,Pe=Tt.depth,Ie=0,Ge=0,Xe=0),W!==null?(Ue=W.x,ut=W.y,vt=W.z):(Ue=0,ut=0,vt=0);const wn=$e.convert(B.format),ct=$e.convert(B.type);let Oe;if(B.isData3DTexture)P.setTexture3D(B,0),Oe=R.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)P.setTexture2DArray(B,0),Oe=R.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,B.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,B.unpackAlignment);const Yt=R.getParameter(R.UNPACK_ROW_LENGTH),lt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),kn=R.getParameter(R.UNPACK_SKIP_PIXELS),ys=R.getParameter(R.UNPACK_SKIP_ROWS),bn=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,Tt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Tt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ie),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ge),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Xe),C.isDataTexture||C.isData3DTexture?R.texSubImage3D(Oe,k,Ue,ut,vt,de,ye,Pe,wn,ct,Tt.data):B.isCompressedArrayTexture?R.compressedTexSubImage3D(Oe,k,Ue,ut,vt,de,ye,Pe,wn,Tt.data):R.texSubImage3D(Oe,k,Ue,ut,vt,de,ye,Pe,wn,ct,Tt),R.pixelStorei(R.UNPACK_ROW_LENGTH,Yt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,lt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,kn),R.pixelStorei(R.UNPACK_SKIP_ROWS,ys),R.pixelStorei(R.UNPACK_SKIP_IMAGES,bn),k===0&&B.generateMipmaps&&R.generateMipmap(Oe),ae.unbindTexture()},this.initRenderTarget=function(C){fe.get(C).__webglFramebuffer===void 0&&P.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?P.setTextureCube(C,0):C.isData3DTexture?P.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?P.setTexture2DArray(C,0):P.setTexture2D(C,0),ae.unbindTexture()},this.resetState=function(){A=0,S=0,b=null,ae.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Fl?"display-p3":"srgb",t.unpackColorSpace=rt.workingColorSpace===_a?"display-p3":"srgb"}}class Hl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ze(e),this.near=t,this.far=n}clone(){return new Hl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Qx extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Vd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ul,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const on=new I;class Kr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyMatrix4(e),this.setXYZ(t,on.x,on.y,on.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyNormalMatrix(e),this.setXYZ(t,on.x,on.y,on.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.transformDirection(e),this.setXYZ(t,on.x,on.y,on.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=jn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=jn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=jn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=jn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array),r=dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Kr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class sn extends Zn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Us;const Sr=new I,Fs=new I,Os=new I,Bs=new he,wr=new he,Gd=new qe,Eo=new I,br=new I,To=new I,hu=new he,sc=new he,uu=new he;class dn extends xt{constructor(e=new sn){if(super(),this.isSprite=!0,this.type="Sprite",Us===void 0){Us=new Ot;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Vd(t,5);Us.setIndex([0,1,2,0,2,3]),Us.setAttribute("position",new Kr(n,3,0,!1)),Us.setAttribute("uv",new Kr(n,2,3,!1))}this.geometry=Us,this.material=e,this.center=new he(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fs.setFromMatrixScale(this.matrixWorld),Gd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Os.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fs.multiplyScalar(-Os.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Ao(Eo.set(-.5,-.5,0),Os,o,Fs,s,r),Ao(br.set(.5,-.5,0),Os,o,Fs,s,r),Ao(To.set(.5,.5,0),Os,o,Fs,s,r),hu.set(0,0),sc.set(1,0),uu.set(1,1);let a=e.ray.intersectTriangle(Eo,br,To,!1,Sr);if(a===null&&(Ao(br.set(-.5,.5,0),Os,o,Fs,s,r),sc.set(0,1),a=e.ray.intersectTriangle(Eo,To,br,!1,Sr),a===null))return;const c=e.ray.origin.distanceTo(Sr);c<e.near||c>e.far||t.push({distance:c,point:Sr.clone(),uv:Fn.getInterpolation(Sr,Eo,br,To,hu,sc,uu,new he),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ao(i,e,t,n,s,r){Bs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(wr.x=r*Bs.x-s*Bs.y,wr.y=s*Bs.x+r*Bs.y):wr.copy(Bs),i.copy(e),i.x+=wr.x,i.y+=wr.y,i.applyMatrix4(Gd)}const du=new I,fu=new at,pu=new at,ev=new I,mu=new qe,Ro=new I,rc=new ci,gu=new qe,oc=new xa;class tv extends Q{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=_h,this.bindMatrix=new qe,this.bindMatrixInverse=new qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ai),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ro),this.boundingBox.expandByPoint(Ro)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ci),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ro),this.boundingSphere.expandByPoint(Ro)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rc.copy(this.boundingSphere),rc.applyMatrix4(s),e.ray.intersectsSphere(rc)!==!1&&(gu.copy(s).invert(),oc.copy(e.ray).applyMatrix4(gu),!(this.boundingBox!==null&&oc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,oc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===_h?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ap?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;fu.fromBufferAttribute(s.attributes.skinIndex,e),pu.fromBufferAttribute(s.attributes.skinWeight,e),du.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=pu.getComponent(r);if(o!==0){const a=fu.getComponent(r);mu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(ev.copy(du).applyMatrix4(mu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Wd extends xt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Vl extends zt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=un,h=un,f,d){super(null,o,a,c,l,h,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const _u=new qe,nv=new qe;class Gl{constructor(e=[],t=[]){this.uuid=Bn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:nv;_u.multiplyMatrices(a,t[r]),_u.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Gl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Vl(t,e,e,On,vn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Wd),this.bones.push(o),this.boneInverses.push(new qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class pl extends qt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const zs=new qe,xu=new qe,Co=[],vu=new ai,iv=new qe,Er=new Q,Tr=new ci;class Yr extends Q{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new pl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,iv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ai),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zs),vu.copy(e.boundingBox).applyMatrix4(zs),this.boundingBox.union(vu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ci),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zs),Tr.copy(e.boundingSphere).applyMatrix4(zs),this.boundingSphere.union(Tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Er.geometry=this.geometry,Er.material=this.material,Er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Tr.copy(this.boundingSphere),Tr.applyMatrix4(n),e.ray.intersectsSphere(Tr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,zs),xu.multiplyMatrices(n,zs),Er.matrixWorld=xu,Er.raycast(e,Co);for(let o=0,a=Co.length;o<a;o++){const c=Co[o];c.instanceId=r,c.object=this,t.push(c)}Co.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new pl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Vl(new Float32Array(s*this.count),s,this.count,Il,vn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Xd extends Zn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const la=new I,ha=new I,yu=new qe,Ar=new xa,Po=new ci,ac=new I,Mu=new I;class Wl extends xt{constructor(e=new Ot,t=new Xd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)la.fromBufferAttribute(t,s-1),ha.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=la.distanceTo(ha);e.setAttribute("lineDistance",new mt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Po.copy(n.boundingSphere),Po.applyMatrix4(s),Po.radius+=r,e.ray.intersectsSphere(Po)===!1)return;yu.copy(s).invert(),Ar.copy(e.ray).applyMatrix4(yu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,u=g-1;_<u;_+=l){const m=h.getX(_),y=h.getX(_+1),x=Lo(this,e,Ar,c,m,y);x&&t.push(x)}if(this.isLineLoop){const _=h.getX(g-1),u=h.getX(p),m=Lo(this,e,Ar,c,_,u);m&&t.push(m)}}else{const p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=p,u=g-1;_<u;_+=l){const m=Lo(this,e,Ar,c,_,_+1);m&&t.push(m)}if(this.isLineLoop){const _=Lo(this,e,Ar,c,g-1,p);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Lo(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(la.fromBufferAttribute(o,s),ha.fromBufferAttribute(o,r),t.distanceSqToSegment(la,ha,ac,Mu)>n)return;ac.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ac);if(!(c<e.near||c>e.far))return{distance:c,point:Mu.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Su=new I,wu=new I;class sv extends Wl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Su.fromBufferAttribute(t,s),wu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Su.distanceTo(wu);e.setAttribute("lineDistance",new mt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class rv extends Wl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class ya extends Zn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const bu=new qe,ml=new xa,Io=new ci,Do=new I;class Xl extends xt{constructor(e=new Ot,t=new ya){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(s),Io.radius+=r,e.ray.intersectsSphere(Io)===!1)return;bu.copy(s).invert(),ml.copy(e.ray).applyMatrix4(bu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,f=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=d,_=p;g<_;g++){const u=l.getX(g);Do.fromBufferAttribute(f,u),Eu(Do,u,c,s,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let g=d,_=p;g<_;g++)Do.fromBufferAttribute(f,g),Eu(Do,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Eu(i,e,t,n,s,r,o){const a=ml.distanceSqToPoint(i);if(a<t){const c=new I;ml.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class rn extends zt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class li{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,p=(o-h)/d;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new he:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new I,s=[],r=[],o=[],a=new I,c=new qe;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Bt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Bt(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ql extends li{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new he){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*f+this.aX,l=d*f+p*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ov extends ql{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Kl(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,f){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+f)+(c-a)/f;d*=h,p*=h,s(o,a,d,p)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const No=new I,cc=new Kl,lc=new Kl,hc=new Kl;class av extends li{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new I){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(No.subVectors(s[0],s[1]).add(s[0]),l=No);const f=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(No.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=No),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),p),_=Math.pow(f.distanceToSquared(d),p),u=Math.pow(d.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),u<1e-4&&(u=_),cc.initNonuniformCatmullRom(l.x,f.x,d.x,h.x,g,_,u),lc.initNonuniformCatmullRom(l.y,f.y,d.y,h.y,g,_,u),hc.initNonuniformCatmullRom(l.z,f.z,d.z,h.z,g,_,u)}else this.curveType==="catmullrom"&&(cc.initCatmullRom(l.x,f.x,d.x,h.x,this.tension),lc.initCatmullRom(l.y,f.y,d.y,h.y,this.tension),hc.initCatmullRom(l.z,f.z,d.z,h.z,this.tension));return n.set(cc.calc(c),lc.calc(c),hc.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new I().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Tu(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function cv(i,e){const t=1-i;return t*t*e}function lv(i,e){return 2*(1-i)*i*e}function hv(i,e){return i*i*e}function Br(i,e,t,n){return cv(i,e)+lv(i,t)+hv(i,n)}function uv(i,e){const t=1-i;return t*t*t*e}function dv(i,e){const t=1-i;return 3*t*t*i*e}function fv(i,e){return 3*(1-i)*i*i*e}function pv(i,e){return i*i*i*e}function zr(i,e,t,n,s){return uv(i,e)+dv(i,t)+fv(i,n)+pv(i,s)}class qd extends li{constructor(e=new he,t=new he,n=new he,s=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new he){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(zr(e,s.x,r.x,o.x,a.x),zr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class mv extends li{constructor(e=new I,t=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new I){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(zr(e,s.x,r.x,o.x,a.x),zr(e,s.y,r.y,o.y,a.y),zr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Kd extends li{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gv extends li{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Yd extends li{constructor(e=new he,t=new he,n=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new he){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Br(e,s.x,r.x,o.x),Br(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _v extends li{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Br(e,s.x,r.x,o.x),Br(e,s.y,r.y,o.y),Br(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $d extends li{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(Tu(a,c.x,l.x,h.x,f.x),Tu(a,c.y,l.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new he().fromArray(s))}return this}}var gl=Object.freeze({__proto__:null,ArcCurve:ov,CatmullRomCurve3:av,CubicBezierCurve:qd,CubicBezierCurve3:mv,EllipseCurve:ql,LineCurve:Kd,LineCurve3:gv,QuadraticBezierCurve:Yd,QuadraticBezierCurve3:_v,SplineCurve:$d});class xv extends li{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new gl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new gl[s.type]().fromJSON(s))}return this}}class Au extends xv{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Kd(this.currentPoint.clone(),new he(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Yd(this.currentPoint.clone(),new he(e,t),new he(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new qd(this.currentPoint.clone(),new he(e,t),new he(n,s),new he(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new $d(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){const l=new ql(e,t,n,s,r,o,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ps extends Ot{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new I,h=new he;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,d=3;f<=t;f++,d+=3){const p=n+f/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new mt(o,3)),this.setAttribute("normal",new mt(a,3)),this.setAttribute("uv",new mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ps(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class tt extends Ot{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],d=[],p=[];let g=0;const _=[],u=n/2;let m=0;y(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new mt(f,3)),this.setAttribute("normal",new mt(d,3)),this.setAttribute("uv",new mt(p,2));function y(){const M=new I,A=new I;let S=0;const b=(t-e)/n;for(let T=0;T<=r;T++){const L=[],v=T/r,w=v*(t-e)+e;for(let F=0;F<=s;F++){const U=F/s,N=U*c+a,z=Math.sin(N),D=Math.cos(N);A.x=w*z,A.y=-v*n+u,A.z=w*D,f.push(A.x,A.y,A.z),M.set(z,b,D).normalize(),d.push(M.x,M.y,M.z),p.push(U,1-v),L.push(g++)}_.push(L)}for(let T=0;T<s;T++)for(let L=0;L<r;L++){const v=_[L][T],w=_[L+1][T],F=_[L+1][T+1],U=_[L][T+1];e>0&&(h.push(v,w,U),S+=3),t>0&&(h.push(w,F,U),S+=3)}l.addGroup(m,S,0),m+=S}function x(M){const A=g,S=new he,b=new I;let T=0;const L=M===!0?e:t,v=M===!0?1:-1;for(let F=1;F<=s;F++)f.push(0,u*v,0),d.push(0,v,0),p.push(.5,.5),g++;const w=g;for(let F=0;F<=s;F++){const N=F/s*c+a,z=Math.cos(N),D=Math.sin(N);b.x=L*D,b.y=u*v,b.z=L*z,f.push(b.x,b.y,b.z),d.push(0,v,0),S.x=z*.5+.5,S.y=D*.5*v+.5,p.push(S.x,S.y),g++}for(let F=0;F<s;F++){const U=A+F,N=w+F;M===!0?h.push(N,N+1,U):h.push(N+1,N,U),T+=3}l.addGroup(m,T,M===!0?1:2),m+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class hn extends tt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new hn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ma extends Au{constructor(e){super(e),this.uuid=Bn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Au().fromJSON(s))}return this}}const vv={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=jd(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,f,d,p;if(n&&(r=bv(i,e,r,t)),i.length>80*t){a=l=i[0],c=h=i[1];for(let g=t;g<s;g+=t)f=i[g],d=i[g+1],f<a&&(a=f),d<c&&(c=d),f>l&&(l=f),d>h&&(h=d);p=Math.max(l-a,h-c),p=p!==0?32767/p:0}return $r(r,o,t,a,c,p,0),o}};function jd(i,e,t,n,s){let r,o;if(s===Uv(i,e,t,n)>0)for(r=e;r<t;r+=n)o=Ru(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=Ru(r,i[r],i[r+1],o);return o&&Sa(o,o.next)&&(Zr(o),o=o.next),o}function ms(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Sa(t,t.next)||Et(t.prev,t,t.next)===0)){if(Zr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function $r(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Cv(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Mv(i,n,s,r):yv(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),Zr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Sv(ms(i),e,t),$r(i,e,t,n,s,r,2)):o===2&&wv(i,e,t,n,s,r):$r(ms(i),e,t,n,s,r,1);break}}}function yv(i){const e=i.prev,t=i,n=i.next;if(Et(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,f=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,p=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=f&&g.y<=p&&Ws(s,a,r,c,o,l,g.x,g.y)&&Et(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Mv(i,e,t,n){const s=i.prev,r=i,o=i.next;if(Et(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,f=r.y,d=o.y,p=a<c?a<l?a:l:c<l?c:l,g=h<f?h<d?h:d:f<d?f:d,_=a>c?a>l?a:l:c>l?c:l,u=h>f?h>d?h:d:f>d?f:d,m=_l(p,g,e,t,n),y=_l(_,u,e,t,n);let x=i.prevZ,M=i.nextZ;for(;x&&x.z>=m&&M&&M.z<=y;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=u&&x!==s&&x!==o&&Ws(a,h,c,f,l,d,x.x,x.y)&&Et(x.prev,x,x.next)>=0||(x=x.prevZ,M.x>=p&&M.x<=_&&M.y>=g&&M.y<=u&&M!==s&&M!==o&&Ws(a,h,c,f,l,d,M.x,M.y)&&Et(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;x&&x.z>=m;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=u&&x!==s&&x!==o&&Ws(a,h,c,f,l,d,x.x,x.y)&&Et(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;M&&M.z<=y;){if(M.x>=p&&M.x<=_&&M.y>=g&&M.y<=u&&M!==s&&M!==o&&Ws(a,h,c,f,l,d,M.x,M.y)&&Et(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Sv(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!Sa(s,r)&&Zd(s,n,n.next,r)&&jr(s,r)&&jr(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Zr(n),Zr(n.next),n=i=r),n=n.next}while(n!==i);return ms(n)}function wv(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Iv(o,a)){let c=Jd(o,a);o=ms(o,o.next),c=ms(c,c.next),$r(o,e,t,n,s,r,0),$r(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function bv(i,e,t,n){const s=[];let r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=jd(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Lv(l));for(s.sort(Ev),r=0;r<s.length;r++)t=Tv(s[r],t);return t}function Ev(i,e){return i.x-e.x}function Tv(i,e){const t=Av(i,e);if(!t)return e;const n=Jd(t,i);return ms(n,n.next),ms(t,t.next)}function Av(i,e){let t=e,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,s=t.x<t.next.x?t:t.next,d===r))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,f;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&Ws(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(f=Math.abs(o-t.y)/(r-t.x),jr(t,i)&&(f<h||f===h&&(t.x>s.x||t.x===s.x&&Rv(s,t)))&&(s=t,h=f)),t=t.next;while(t!==a);return s}function Rv(i,e){return Et(i.prev,i,e.prev)<0&&Et(e.next,i,i.next)<0}function Cv(i,e,t,n){let s=i;do s.z===0&&(s.z=_l(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Pv(s)}function Pv(i){let e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function _l(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Lv(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Ws(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Iv(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Dv(i,e)&&(jr(i,e)&&jr(e,i)&&Nv(i,e)&&(Et(i.prev,i,e.prev)||Et(i,e.prev,e))||Sa(i,e)&&Et(i.prev,i,i.next)>0&&Et(e.prev,e,e.next)>0)}function Et(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Sa(i,e){return i.x===e.x&&i.y===e.y}function Zd(i,e,t,n){const s=Fo(Et(i,e,t)),r=Fo(Et(i,e,n)),o=Fo(Et(t,n,i)),a=Fo(Et(t,n,e));return!!(s!==r&&o!==a||s===0&&Uo(i,t,e)||r===0&&Uo(i,n,e)||o===0&&Uo(t,i,n)||a===0&&Uo(t,e,n))}function Uo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Fo(i){return i>0?1:i<0?-1:0}function Dv(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Zd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function jr(i,e){return Et(i.prev,i,i.next)<0?Et(i,e,i.next)>=0&&Et(i,i.prev,e)>=0:Et(i,e,i.prev)<0||Et(i,i.next,e)<0}function Nv(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Jd(i,e){const t=new xl(i.i,i.x,i.y),n=new xl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Ru(i,e,t,n){const s=new xl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Zr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function xl(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Uv(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class ji{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return ji.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Cu(e),Pu(n,e);let o=e.length;t.forEach(Cu);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,Pu(n,t[c]);const a=vv.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Cu(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Pu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Yl extends Ot{constructor(e=new Ma([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new mt(s,3)),this.setAttribute("uv",new mt(r,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,u=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:Fv;let x,M=!1,A,S,b,T;m&&(x=m.getSpacedPoints(h),M=!0,d=!1,A=m.computeFrenetFrames(h,!1),S=new I,b=new I,T=new I),d||(u=0,p=0,g=0,_=0);const L=a.extractPoints(l);let v=L.shape;const w=L.holes;if(!ji.isClockWise(v)){v=v.reverse();for(let J=0,R=w.length;J<R;J++){const $=w[J];ji.isClockWise($)&&(w[J]=$.reverse())}}const U=ji.triangulateShape(v,w),N=v;for(let J=0,R=w.length;J<R;J++){const $=w[J];v=v.concat($)}function z(J,R,$){return R||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(R,$)}const D=v.length,X=U.length;function V(J,R,$){let ne,K,ae;const _e=J.x-R.x,fe=J.y-R.y,P=$.x-J.x,E=$.y-J.y,H=_e*_e+fe*fe,j=_e*E-fe*P;if(Math.abs(j)>Number.EPSILON){const ee=Math.sqrt(H),Z=Math.sqrt(P*P+E*E),Ae=R.x-fe/ee,me=R.y+_e/ee,we=$.x-E/Z,nt=$.y+P/Z,le=((we-Ae)*E-(nt-me)*P)/(_e*E-fe*P);ne=Ae+_e*le-J.x,K=me+fe*le-J.y;const be=ne*ne+K*K;if(be<=2)return new he(ne,K);ae=Math.sqrt(be/2)}else{let ee=!1;_e>Number.EPSILON?P>Number.EPSILON&&(ee=!0):_e<-Number.EPSILON?P<-Number.EPSILON&&(ee=!0):Math.sign(fe)===Math.sign(E)&&(ee=!0),ee?(ne=-fe,K=_e,ae=Math.sqrt(H)):(ne=_e,K=fe,ae=Math.sqrt(H/2))}return new he(ne/ae,K/ae)}const te=[];for(let J=0,R=N.length,$=R-1,ne=J+1;J<R;J++,$++,ne++)$===R&&($=0),ne===R&&(ne=0),te[J]=V(N[J],N[$],N[ne]);const oe=[];let ce,Le=te.concat();for(let J=0,R=w.length;J<R;J++){const $=w[J];ce=[];for(let ne=0,K=$.length,ae=K-1,_e=ne+1;ne<K;ne++,ae++,_e++)ae===K&&(ae=0),_e===K&&(_e=0),ce[ne]=V($[ne],$[ae],$[_e]);oe.push(ce),Le=Le.concat(ce)}for(let J=0;J<u;J++){const R=J/u,$=p*Math.cos(R*Math.PI/2),ne=g*Math.sin(R*Math.PI/2)+_;for(let K=0,ae=N.length;K<ae;K++){const _e=z(N[K],te[K],ne);ue(_e.x,_e.y,-$)}for(let K=0,ae=w.length;K<ae;K++){const _e=w[K];ce=oe[K];for(let fe=0,P=_e.length;fe<P;fe++){const E=z(_e[fe],ce[fe],ne);ue(E.x,E.y,-$)}}}const Ce=g+_;for(let J=0;J<D;J++){const R=d?z(v[J],Le[J],Ce):v[J];M?(b.copy(A.normals[0]).multiplyScalar(R.x),S.copy(A.binormals[0]).multiplyScalar(R.y),T.copy(x[0]).add(b).add(S),ue(T.x,T.y,T.z)):ue(R.x,R.y,0)}for(let J=1;J<=h;J++)for(let R=0;R<D;R++){const $=d?z(v[R],Le[R],Ce):v[R];M?(b.copy(A.normals[J]).multiplyScalar($.x),S.copy(A.binormals[J]).multiplyScalar($.y),T.copy(x[J]).add(b).add(S),ue(T.x,T.y,T.z)):ue($.x,$.y,f/h*J)}for(let J=u-1;J>=0;J--){const R=J/u,$=p*Math.cos(R*Math.PI/2),ne=g*Math.sin(R*Math.PI/2)+_;for(let K=0,ae=N.length;K<ae;K++){const _e=z(N[K],te[K],ne);ue(_e.x,_e.y,f+$)}for(let K=0,ae=w.length;K<ae;K++){const _e=w[K];ce=oe[K];for(let fe=0,P=_e.length;fe<P;fe++){const E=z(_e[fe],ce[fe],ne);M?ue(E.x,E.y+x[h-1].y,x[h-1].x+$):ue(E.x,E.y,f+$)}}}q(),re();function q(){const J=s.length/3;if(d){let R=0,$=D*R;for(let ne=0;ne<X;ne++){const K=U[ne];Ne(K[2]+$,K[1]+$,K[0]+$)}R=h+u*2,$=D*R;for(let ne=0;ne<X;ne++){const K=U[ne];Ne(K[0]+$,K[1]+$,K[2]+$)}}else{for(let R=0;R<X;R++){const $=U[R];Ne($[2],$[1],$[0])}for(let R=0;R<X;R++){const $=U[R];Ne($[0]+D*h,$[1]+D*h,$[2]+D*h)}}n.addGroup(J,s.length/3-J,0)}function re(){const J=s.length/3;let R=0;xe(N,R),R+=N.length;for(let $=0,ne=w.length;$<ne;$++){const K=w[$];xe(K,R),R+=K.length}n.addGroup(J,s.length/3-J,1)}function xe(J,R){let $=J.length;for(;--$>=0;){const ne=$;let K=$-1;K<0&&(K=J.length-1);for(let ae=0,_e=h+u*2;ae<_e;ae++){const fe=D*ae,P=D*(ae+1),E=R+ne+fe,H=R+K+fe,j=R+K+P,ee=R+ne+P;Te(E,H,j,ee)}}}function ue(J,R,$){c.push(J),c.push(R),c.push($)}function Ne(J,R,$){De(J),De(R),De($);const ne=s.length/3,K=y.generateTopUV(n,s,ne-3,ne-2,ne-1);He(K[0]),He(K[1]),He(K[2])}function Te(J,R,$,ne){De(J),De(R),De(ne),De(R),De($),De(ne);const K=s.length/3,ae=y.generateSideWallUV(n,s,K-6,K-3,K-2,K-1);He(ae[0]),He(ae[1]),He(ae[3]),He(ae[1]),He(ae[2]),He(ae[3])}function De(J){s.push(c[J*3+0]),s.push(c[J*3+1]),s.push(c[J*3+2])}function He(J){r.push(J.x),r.push(J.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ov(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new gl[s.type]().fromJSON(s)),new Yl(n,e.options)}}const Fv={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new he(r,o),new he(a,c),new he(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],f=e[n*3+2],d=e[s*3],p=e[s*3+1],g=e[s*3+2],_=e[r*3],u=e[r*3+1],m=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new he(o,1-c),new he(l,1-f),new he(d,1-g),new he(_,1-m)]:[new he(a,1-c),new he(h,1-f),new he(p,1-g),new he(u,1-m)]}};function Ov(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class $l extends Ot{constructor(e=new Ma([new he(0,.5),new he(-.5,-.5),new he(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new mt(s,3)),this.setAttribute("normal",new mt(r,3)),this.setAttribute("uv",new mt(o,2));function l(h){const f=s.length/3,d=h.extractPoints(t);let p=d.shape;const g=d.holes;ji.isClockWise(p)===!1&&(p=p.reverse());for(let u=0,m=g.length;u<m;u++){const y=g[u];ji.isClockWise(y)===!0&&(g[u]=y.reverse())}const _=ji.triangulateShape(p,g);for(let u=0,m=g.length;u<m;u++){const y=g[u];p=p.concat(y)}for(let u=0,m=p.length;u<m;u++){const y=p[u];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let u=0,m=_.length;u<m;u++){const y=_[u],x=y[0]+f,M=y[1]+f,A=y[2]+f;n.push(x,M,A),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Bv(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];n.push(o)}return new $l(n,e.curveSegments)}}function Bv(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class ri extends Ot{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],f=new I,d=new I,p=[],g=[],_=[],u=[];for(let m=0;m<=n;m++){const y=[],x=m/n;let M=0;m===0&&o===0?M=.5/t:m===n&&c===Math.PI&&(M=-.5/t);for(let A=0;A<=t;A++){const S=A/t;f.x=-e*Math.cos(s+S*r)*Math.sin(o+x*a),f.y=e*Math.cos(o+x*a),f.z=e*Math.sin(s+S*r)*Math.sin(o+x*a),g.push(f.x,f.y,f.z),d.copy(f).normalize(),_.push(d.x,d.y,d.z),u.push(S+M,1-x),y.push(l++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<t;y++){const x=h[m][y+1],M=h[m][y],A=h[m+1][y],S=h[m+1][y+1];(m!==0||o>0)&&p.push(x,M,S),(m!==n-1||c<Math.PI)&&p.push(M,A,S)}this.setIndex(p),this.setAttribute("position",new mt(g,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ri(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class jl extends Ot{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new I,f=new I,d=new I;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const _=g/s*r,u=p/n*Math.PI*2;f.x=(e+t*Math.cos(u))*Math.cos(_),f.y=(e+t*Math.cos(u))*Math.sin(_),f.z=t*Math.sin(u),a.push(f.x,f.y,f.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(f,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,u=(s+1)*(p-1)+g-1,m=(s+1)*(p-1)+g,y=(s+1)*p+g;o.push(_,u,y),o.push(u,m,y)}this.setIndex(o),this.setAttribute("position",new mt(a,3)),this.setAttribute("normal",new mt(c,3)),this.setAttribute("uv",new mt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jl(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class se extends Zn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wd,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class hi extends se{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new he(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Bt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Oo(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function zv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function kv(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Lu(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function Qd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class Qr{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Hv extends Qr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xh,endingEnd:xh}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case vh:r=e,a=2*t-n;break;case yh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case vh:o=e,c=2*n-t;break;case yh:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),_=g*g,u=_*g,m=-d*u+2*d*_-d*g,y=(1+d)*u+(-1.5-2*d)*_+(-.5+d)*g+1,x=(-1-p)*u+(1.5+p)*_+.5*g,M=p*u-p*_;for(let A=0;A!==a;++A)r[A]=m*o[h+A]+y*o[l+A]+x*o[c+A]+M*o[f+A];return r}}class Vv extends Qr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),f=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*f+o[c+d]*h;return r}}class Gv extends Qr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class ui{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Oo(t,this.TimeBufferType),this.values=Oo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Oo(e.times,Array),values:Oo(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Gv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Vv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Hv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Wr:t=this.InterpolantFactoryMethodDiscrete;break;case Xr:t=this.InterpolantFactoryMethodLinear;break;case Ca:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Wr;case this.InterpolantFactoryMethodLinear:return Xr;case this.InterpolantFactoryMethodSmooth:return Ca}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&zv(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ca,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{const f=a*n,d=f-n,p=f+n;for(let g=0;g!==n;++g){const _=t[f+g];if(_!==t[d+g]||_!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const f=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[f+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}ui.prototype.TimeBufferType=Float32Array;ui.prototype.ValueBufferType=Float32Array;ui.prototype.DefaultInterpolation=Xr;class mr extends ui{constructor(e,t,n){super(e,t,n)}}mr.prototype.ValueTypeName="bool";mr.prototype.ValueBufferType=Array;mr.prototype.DefaultInterpolation=Wr;mr.prototype.InterpolantFactoryMethodLinear=void 0;mr.prototype.InterpolantFactoryMethodSmooth=void 0;class ef extends ui{}ef.prototype.ValueTypeName="color";class lr extends ui{}lr.prototype.ValueTypeName="number";class Wv extends Qr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t);let l=e*a;for(let h=l+a;l!==h;l+=4)pn.slerpFlat(r,0,o,l-a,o,l,c);return r}}class hr extends ui{InterpolantFactoryMethodLinear(e){return new Wv(this.times,this.values,this.getValueSize(),e)}}hr.prototype.ValueTypeName="quaternion";hr.prototype.InterpolantFactoryMethodSmooth=void 0;class gr extends ui{constructor(e,t,n){super(e,t,n)}}gr.prototype.ValueTypeName="string";gr.prototype.ValueBufferType=Array;gr.prototype.DefaultInterpolation=Wr;gr.prototype.InterpolantFactoryMethodLinear=void 0;gr.prototype.InterpolantFactoryMethodSmooth=void 0;class ur extends ui{}ur.prototype.ValueTypeName="vector";class Xv{constructor(e="",t=-1,n=[],s=cp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Bn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Kv(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(ui.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=kv(c);c=Lu(c,1,h),l=Lu(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new lr(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(r);if(h&&h.length>1){const f=h[1];let d=s[f];d||(s[f]=d=[]),d.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(f,d,p,g,_){if(p.length!==0){const u=[],m=[];Qd(p,u,m,g),u.length!==0&&_.push(new f(d,u,m))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let f=0;f<l.length;f++){const d=l[f].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)p[d[g].morphTargets[_]]=-1;for(const _ in p){const u=[],m=[];for(let y=0;y!==d[g].morphTargets.length;++y){const x=d[g];u.push(x.time),m.push(x.morphTarget===_?1:0)}s.push(new lr(".morphTargetInfluence["+_+"]",u,m))}c=p.length*o}else{const p=".bones["+t[f].name+"]";n(ur,p+".position",d,"pos",s),n(hr,p+".quaternion",d,"rot",s),n(ur,p+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function qv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return lr;case"vector":case"vector2":case"vector3":case"vector4":return ur;case"color":return ef;case"quaternion":return hr;case"bool":case"boolean":return mr;case"string":return gr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Kv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=qv(i.type);if(i.times===void 0){const t=[],n=[];Qd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Wi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Yv{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){const f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=l.length;f<d;f+=2){const p=l[f],g=l[f+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const $v=new Yv;class vs{constructor(e){this.manager=e!==void 0?e:$v,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}vs.DEFAULT_MATERIAL_NAME="__DEFAULT";const xi={};class jv extends Error{constructor(e,t){super(e),this.response=t}}class Zl extends vs{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Wi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(xi[e]!==void 0){xi[e].push({onLoad:t,onProgress:n,onError:s});return}xi[e]=[],xi[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=xi[e],f=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0;let _=0;const u=new ReadableStream({start(m){y();function y(){f.read().then(({done:x,value:M})=>{if(x)m.close();else{_+=M.byteLength;const A=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let S=0,b=h.length;S<b;S++){const T=h[S];T.onProgress&&T.onProgress(A)}m.enqueue(M),y()}},x=>{m.error(x)})}}});return new Response(u)}else throw new jv(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),d=f&&f[1]?f[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Wi.add(e,l);const h=xi[e];delete xi[e];for(let f=0,d=h.length;f<d;f++){const p=h[f];p.onLoad&&p.onLoad(l)}}).catch(l=>{const h=xi[e];if(h===void 0)throw this.manager.itemError(e),l;delete xi[e];for(let f=0,d=h.length;f<d;f++){const p=h[f];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Zv extends vs{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Wi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=qr("img");function c(){h(),Wi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(f){h(),s&&s(f),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Jv extends vs{constructor(e){super(e)}load(e,t,n,s){const r=this,o=new Vl,a=new Zl(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(s!==void 0)s(h);else{console.error(h);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:ni,o.wrapT=l.wrapT!==void 0?l.wrapT:ni,o.magFilter=l.magFilter!==void 0?l.magFilter:Xt,o.minFilter=l.minFilter!==void 0?l.minFilter:Xt,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(o.colorSpace=l.colorSpace),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=ii),l.mipmapCount===1&&(o.minFilter=Xt),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,t&&t(o,l)},n,s),o}}class Qv extends vs{constructor(e){super(e)}load(e,t,n,s){const r=new zt,o=new Zv(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class wa extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ey extends wa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const uc=new qe,Iu=new I,Du=new I;class Jl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bl,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Iu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Iu),Du.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Du),t.updateMatrixWorld(),uc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(uc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ty extends Jl{constructor(){super(new ln(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=ar*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class tf extends wa{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new ty}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Nu=new qe,Rr=new I,dc=new I;class ny extends Jl{constructor(){super(new ln(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new he(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Rr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Rr),dc.copy(n.position),dc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(dc),n.updateMatrixWorld(),s.makeTranslation(-Rr.x,-Rr.y,-Rr.z),Nu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nu)}}class iy extends wa{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ny}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class sy extends Jl{constructor(){super(new zl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class nf extends wa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new sy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class kr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class ry extends vs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Wi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Wi.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Wi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Wi.add(e,c),r.manager.itemStart(e)}}const Ql="\\[\\]\\.:\\/",oy=new RegExp("["+Ql+"]","g"),eh="[^"+Ql+"]",ay="[^"+Ql.replace("\\.","")+"]",cy=/((?:WC+[\/:])*)/.source.replace("WC",eh),ly=/(WCOD+)?/.source.replace("WCOD",ay),hy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",eh),uy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",eh),dy=new RegExp("^"+cy+ly+hy+uy+"$"),fy=["material","materials","bones","map"];class py{constructor(e,t,n){const s=n||ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ft{constructor(e,t,n){this.path=t,this.parsedPath=n||ft.parseTrackName(t),this.node=ft.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ft.Composite(e,t,n):new ft(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(oy,"")}static parseTrackName(e){const t=dy.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);fy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=ft.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[s];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ft.Composite=py;ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ft.prototype.GetterByBindingType=[ft.prototype._getValue_direct,ft.prototype._getValue_array,ft.prototype._getValue_arrayElement,ft.prototype._getValue_toArray];ft.prototype.SetterByBindingTypeAndVersioning=[[ft.prototype._setValue_direct,ft.prototype._setValue_direct_setNeedsUpdate,ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_array,ft.prototype._setValue_array_setNeedsUpdate,ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_arrayElement,ft.prototype._setValue_arrayElement_setNeedsUpdate,ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_fromArray,ft.prototype._setValue_fromArray_setNeedsUpdate,ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rl);const ht={mass:1043,wingArea:16.2,wingSpan:11,chord:1.47,CL0:.25,CLalpha:4.8,CLflap:.55,CD0:.032,kInduced:.055,CDflap:.09,CDgear:.02,alphaCrit:15*Math.PI/180,thrustMax:5200,rho0:1.225,gearHeight:1.1,Vr:26,stallWarn:12*Math.PI/180},my={...ht};function sf(i={}){Object.assign(ht,my,i)}const fc={Vfe:85,Vno:129,Vne:163},pc=.514444,mc={Vfe:fc.Vfe*pc,Vno:fc.Vno*pc,Vne:fc.Vne*pc};function rf(i){return ht.rho0*Math.exp(-i/8500)}function gy(i,e,t,n,s,r={}){const{x:o,y:a,z:c}=i,l=-c,h=-a,f=Math.hypot(o,a,c),d=rf(Math.max(0,s)),p=.5*d*f*f;let g=0,_=0;f>.5&&(g=Math.atan2(h,Math.max(.1,l)),_=Math.asin(Math.max(-1,Math.min(1,o/f))));const u=ht.wingArea,m=ht.alphaCrit-t*(2*Math.PI/180)+(r.critBonus||0);let y=ht.CL0+ht.CLalpha*g+ht.CLflap*t,x=ht.CD0+ht.kInduced*y*y+ht.CDflap*t+(n?ht.CDgear:0);const M=g>m&&f>5;if(M){const b=Math.min(.5,(g-m)*2.2);y*=1-b,x+=b*1.6}const A=p*u*y*(r.liftMul||1),S=p*u*x;return{V:f,alpha:g,beta:_,q:p,rho:d,CL:y,CD:x,lift:A,drag:S,stalled:M,alphaCrit:m}}function _y(i,e,t,n=1){const s=rf(t)/ht.rho0,r=Math.max(.25,1-e/110);return i*ht.thrustMax*(.55+.45*r)*(.6+.4*s)*n}function xy(i,e,t){const n=Math.max(0,1-e/55),s=i*n*.35+i*Math.max(0,t)*.5*n,r=-i*n*.28;return{yawRate:s,rollRate:r}}function vy(i,e,t){const n=[];return e>.01&&i>mc.Vfe&&n.push("flap-overspeed"),i>mc.Vne?n.push("vne"):i>mc.Vno&&n.push("vno"),n}function yy(i,e,t=1.7){if(!e)return null;const n=e===1?.5:1.4;return{x:(Math.sin(i*2.1*t)+Math.sin(i*5.7)*.5)*n,y:(Math.sin(i*1.7+2)+Math.sin(i*4.3+1)*.5)*n*.7,z:Math.sin(i*1.3+4)*n*.5,roll:Math.sin(i*3.1+.7)*n*.25}}const Hr=[0,10,20,30];function My(i){return Hr[Math.max(0,Math.min(Hr.length-1,i))]/30}const of=Math.sqrt(3),Sy=.5*(of-1),Cr=(3-of)/6,Uu=i=>Math.floor(i)|0,Fu=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);function wy(i=Math.random){const e=by(i),t=new Float64Array(e).map(s=>Fu[s%12*2]),n=new Float64Array(e).map(s=>Fu[s%12*2+1]);return function(r,o){let a=0,c=0,l=0;const h=(r+o)*Sy,f=Uu(r+h),d=Uu(o+h),p=(f+d)*Cr,g=f-p,_=d-p,u=r-g,m=o-_;let y,x;u>m?(y=1,x=0):(y=0,x=1);const M=u-y+Cr,A=m-x+Cr,S=u-1+2*Cr,b=m-1+2*Cr,T=f&255,L=d&255;let v=.5-u*u-m*m;if(v>=0){const U=T+e[L],N=t[U],z=n[U];v*=v,a=v*v*(N*u+z*m)}let w=.5-M*M-A*A;if(w>=0){const U=T+y+e[L+x],N=t[U],z=n[U];w*=w,c=w*w*(N*M+z*A)}let F=.5-S*S-b*b;if(F>=0){const U=T+1+e[L+1],N=t[U],z=n[U];F*=F,l=F*F*(N*S+z*b)}return 70*(a+c+l)}}function by(i){const t=new Uint8Array(512);for(let n=0;n<512/2;n++)t[n]=n;for(let n=0;n<512/2-1;n++){const s=n+~~(i()*(256-n)),r=t[n];t[n]=t[s],t[s]=r}for(let n=256;n<512;n++)t[n]=t[n-256];return t}class ba extends Q{constructor(){const e=ba.SkyShader,t=new Ri({name:e.name,uniforms:Dd.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:fn,depthWrite:!1});super(new Ee(1,1,1),t),this.isSky=!0}}ba.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new I},up:{value:new I(0,1,0)}},vertexShader:`
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

		}`};const wt={elev:6,halfLen:600,halfWid:15},tn={x0:40,x1:170,z0:60,z1:280},Ut={elev:12,x:2500,z:1900,halfLen:300,halfWid:10},Wt={elev:20,x:-1500,z:-5600,halfLen:280,halfWid:10},Ey=[[-1500,-6e3,2600,90],[-7e3,1500,2300,70],[7500,-2500,2800,210],[8500,7500,2100,55],[-13500,5500,2800,150],[13500,2e3,2200,90],[3e3,13e3,2400,80],[4e3,-5500,500,12],[-4500,-3500,600,15],[5500,4500,450,10]],ua={x:-300,z:920},Hi={x:60,z:310},Fi={x0:30,x1:230,z0:-450,z1:450};function Ty(i,e){const t=Ft(Fi.x0-80,Fi.x0+30,i)*(1-Ft(Fi.x1-30,Fi.x1+80,i)),n=Ft(Fi.z0-80,Fi.z0+30,e)*(1-Ft(Fi.z1-30,Fi.z1+80,e));return t*n}const Xs=wy(oi(1337));function Ft(i,e,t){const n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)}function oi(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Ay(i,e){const t=Math.hypot(i,e),n=1-Ft(900,3400,t);let s;if(n<=0)s=-8;else{s=Xs(i*9e-4,e*9e-4)*120+Xs(i*.004+7.3,e*.004-2.1)*28+Xs(i*.02,e*.02)*4,s=(s*.5+60)*n;const o=Math.hypot(i-1800,e+600);s+=Math.max(0,1-o/900)*320*n}for(const[o,a,c,l]of Ey){const h=Math.hypot(i-o,e-a);if(h<c){const f=1-Ft(c*.45,c,h),d=-8*(1-f)+(l+Xs(i*.003+o*.13,e*.003)*l*.4)*f;d>s&&(s=d)}}const r=Math.hypot(i-Ut.x,e-Ut.z);if(r<1100){const o=1-Ft(500,1100,r),a=-8*(1-o)+30*o;a>s&&(s=a)}return s<=-8?-8:s-6}function Ry(i,e){const t=Math.abs(i),n=Math.abs(e);return(1-Ft(wt.halfWid+40,wt.halfWid+220,t))*(1-Ft(wt.halfLen+60,wt.halfLen+400,n))}function Cy(i,e){const t=Ft(tn.x0-60,tn.x0+20,i)*(1-Ft(tn.x1-20,tn.x1+60,i)),n=Ft(tn.z0-60,tn.z0+20,e)*(1-Ft(tn.z1-20,tn.z1+60,e));return t*n}function ke(i,e){let t=Ay(i,e);const n=Math.max(Ry(i,e),Cy(i,e),Ty(i,e));t=t*(1-n)+wt.elev*n;const s=Math.abs(i-Ut.x),r=Math.abs(e-Ut.z),o=(1-Ft(Ut.halfWid+25,Ut.halfWid+150,s))*(1-Ft(Ut.halfLen+40,Ut.halfLen+250,r));t=t*(1-o)+Ut.elev*o;const a=Math.abs(i-Wt.x),c=Math.abs(e-Wt.z),l=(1-Ft(Wt.halfWid+25,Wt.halfWid+150,a))*(1-Ft(Wt.halfLen+40,Wt.halfLen+250,c));return t=t*(1-l)+Wt.elev*l,t}function Bo(i,e,t){return[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t]}function Py(i,e,t){const n=[.76,.7,.5],s=[.3,.5,.24],r=[.42,.55,.28],o=[.16,.32,.16],a=[.45,.42,.38],c=[.9,.9,.93];let l;return i<1.6?l=n:i<45?l=Bo(s,r,t):i<150?l=Bo(o,s,Ft(90,150,i)*.5):i<260?l=a:l=c,l=Bo(l,a,Ft(.45,.8,e)),l=Bo(n,l,Ft(.8,2.2,i)),l}function Ly(i){i.fog=new Hl(10336470,2500,22e3);const e=new ba;e.scale.setScalar(9e4);const t=e.material.uniforms;t.turbidity.value=6,t.rayleigh.value=1.8,t.mieCoefficient.value=.004,t.mieDirectionalG.value=.85;const n=new I().setFromSphericalCoords(1,Math.PI*.46,Math.PI*.25);t.sunPosition.value.copy(n),i.add(e);const s=new nf(16773853,2.6);s.position.copy(n).multiplyScalar(3e3),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.near=500,s.shadow.camera.far=6e3;const r=260;Object.assign(s.shadow.camera,{left:-r,right:r,top:r,bottom:-r}),s.shadow.bias=-4e-4,i.add(s),i.add(s.target);const o=new ey(12375807,3825455,.75);i.add(o);const a=36e3,c=352,l=new Zt(a,a,c,c);l.rotateX(-Math.PI/2);const h=l.attributes.position,f=new Float32Array(h.count*3);for(let T=0;T<h.count;T++){const L=h.getX(T),v=h.getZ(T),w=ke(L,v);h.setY(T,w);const F=Math.abs(ke(L+8,v)-w)/8+Math.abs(ke(L,v+8)-w)/8,U=Xs(L*.008+40,v*.008-17)*.5+.5,[N,z,D]=Py(w,F,U),X=Xs(L*.06,v*.06)*.035;f[T*3]=N+X,f[T*3+1]=z+X,f[T*3+2]=D+X}l.setAttribute("color",new qt(f,3)),l.computeVertexNormals();const d=new Q(l,new se({vertexColors:!0,roughness:1,metalness:0,map:Fy()}));d.receiveShadow=!0,i.add(d);const p={uTime:{value:0}},g=new Zt(12e4,12e4,96,96),_=new se({color:1328766,roughness:.18,metalness:.55});_.onBeforeCompile=T=>{T.uniforms.uTime=p.uTime,T.vertexShader=`uniform float uTime;
`+T.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vec2 wxz = (modelMatrix * vec4(position,1.0)).xz;
       transformed.y += sin(wxz.x*0.021 + uTime*0.9)*0.35 + sin(wxz.y*0.017 - uTime*0.7)*0.3 + sin((wxz.x+wxz.y)*0.05 + uTime*1.7)*0.12;`)};const u=new Q(g,_);u.rotation.x=-Math.PI/2,u.position.y=0,u.name="ocean",i.add(u),Iy(i);const m=Ny(i),y=Uy(i),x=Hy(i),M=Vy(i),A=[],S=[];i.traverse(T=>{T.userData.blink&&A.push(T),T.userData.tlCycle&&S.push(T.userData.tlCycle)});function b(T,L,v,w){p.uTime.value=L,w&&(u.position.x=w.x,u.position.z=w.z);const F=w?w.x:0,U=w?w.z:0,N=18e3;for(const D of y.children)D.position.x+=v.x*.6*T+T*1.2,D.position.z+=v.z*.6*T,D.position.x>F+N&&(D.position.x-=N*2),D.position.z>U+N&&(D.position.z-=N*2),D.position.x<F-N&&(D.position.x+=N*2),D.position.z<U-N&&(D.position.z+=N*2);const z=i.getObjectByName("windsock");if(z&&v){const D=Math.hypot(v.x,v.z);z.rotation.y=Math.atan2(v.x,v.z),z.rotation.x=-.15-Math.min(1,D/8)*1.25}for(const D of A){const V=(L*(D.userData.rate||1)+(D.userData.phase||0))%1<(D.userData.duty||.08);D.material.opacity=V?1:0,D.visible=V||D.userData.dim===!0,D.userData.dim&&(D.material.opacity=V?1:.12)}for(const D of S){const X=(L+D.off)%22;D.mats.g.emissiveIntensity=X<10?2:.08,D.mats.y.emissiveIntensity=X>=10&&X<12?2:.08,D.mats.r.emissiveIntensity=X>=12?2:.08}M.update(T,L,v)}return{sunLight:s,hemi:o,skyUni:t,clouds:y,trees:m,update:b,sightFound:M.found,balloons:M.balloons,nightGlows:x.nightGlows,nightMats:x.nightMats,roadLoops:x.roadLoops}}function Iy(i){const e=wt.elev,t=new Je,n=new se({color:3487292,roughness:.95}),s=new se({color:9080208,roughness:.95}),r=new Q(new Ee(wt.halfWid*2,.3,wt.halfLen*2),n);r.position.y=e+.15,r.receiveShadow=!0,t.add(r);const o=new Q(new Ee(tn.x1-tn.x0,.3,tn.z1-tn.z0),s);o.position.set((tn.x0+tn.x1)/2,e+.12,(tn.z0+tn.z1)/2),o.receiveShadow=!0,t.add(o);const a=new Q(new Ee(70,.28,14),n);a.position.set(50,e+.12,170),a.receiveShadow=!0,t.add(a);const c=new Pt({color:15263976});for(let A=-510;A<wt.halfLen-60;A+=60){const S=new Q(new Zt(1.1,24),c);S.rotation.x=-Math.PI/2,S.position.set(0,e+.32,A),t.add(S)}for(const A of[-1,1]){const S=A*(wt.halfLen-18);for(let L=-3;L<=3;L++){if(L===0)continue;const v=new Q(new Zt(2.2,26),c);v.rotation.x=-Math.PI/2,v.position.set(L*3.4,e+.32,S),t.add(v)}for(const L of[152,305])for(const v of[-7,7]){const w=new Q(new Zt(3,14),c);w.rotation.x=-Math.PI/2,w.position.set(v,e+.32,A*(wt.halfLen-L)),t.add(w)}const b=zy(A<0?"36":"18",220),T=new Q(new Zt(13,20),new Pt({map:b,transparent:!0}));T.rotation.x=-Math.PI/2,T.rotation.z=A<0?Math.PI:0,T.position.set(0,e+.33,A*(wt.halfLen-55)),t.add(T)}const l=new ri(.55,8,8),h=new Pt({color:12571903});for(let A=-600;A<=wt.halfLen;A+=80)for(const S of[-15-2.5,wt.halfWid+2.5]){const b=new Q(l,h);b.position.set(S,e+1,A),t.add(b)}for(let A=0;A<4;A++){const S=new Q(new Ee(1.2,1,1.2),new Pt({color:A<2?16724787:16777215}));S.position.set(-23-A*3,e+1,-450),t.add(S)}const f=js();for(const A of[-19,wt.halfWid+4]){const S=new dn(new sn({map:f,color:16777215,transparent:!0,depthWrite:!1}));S.position.set(A,e+2,-606),S.scale.set(6,6,1),S.userData={blink:!0,rate:1.2,duty:.06,phase:A>0?.5:0},t.add(S)}const d=new se({color:10134184,roughness:.5,metalness:.6}),p=new se({color:1316378,roughness:1});for(const[A,S]of[[120,110],[120,220]]){const b=new Q(new tt(13,13,34,20,1,!1,0,Math.PI),d);b.rotation.z=Math.PI/2,b.rotation.y=Math.PI/2,b.position.set(A,e+.2,S),b.castShadow=b.receiveShadow=!0,t.add(b);const T=new Q(new Zt(24,11),p);T.position.set(A-17.1,e+5.5,S),T.rotation.y=-Math.PI/2,t.add(T)}const g=new Q(new tt(.18,.18,11),new se({color:13421772,roughness:.5,metalness:.5}));g.position.set(28,e+5.5,wt.halfLen-60),g.castShadow=!0,t.add(g);const _=new Je;_.position.set(28,e+10.6,wt.halfLen-60);const u=By(),m=new Q(new hn(1.1,5.5,12,1,!0),new se({map:u,side:jt,roughness:.8}));m.rotation.x=-Math.PI/2,m.position.z=2.9,_.add(m),_.name="windsock",t.add(_);const y=new Q(new tt(.5,.8,16),new se({color:7829367,roughness:.7}));y.position.set(-45,e+8,300),y.castShadow=!0,t.add(y);const x=new dn(new sn({map:f,color:6750088,transparent:!0,depthWrite:!1}));x.position.set(-45,e+16.6,300),x.scale.set(7,7,1),x.userData={blink:!0,rate:.8,duty:.12},t.add(x);const M=[12724778,2777026,14721056];[[70,110,.4],[95,200,-.3],[70,240,.2]].forEach(([A,S,b],T)=>{const L=Dy(M[T]);L.position.set(A,e+.3,S),L.rotation.y=b,t.add(L)}),i.add(t)}function Dy(i){const e=new Je,t=new se({color:i,roughness:.4,metalness:.2}),n=new se({color:15922422,roughness:.4,metalness:.1}),s=new Q(new tt(.8,.5,7,10),n);s.rotation.x=Math.PI/2,s.position.y=1.2,e.add(s);const r=new Q(new Ee(10.5,.16,1.5),t);r.position.set(0,2.1,-.4),e.add(r);const o=new Q(new Ee(3.2,.12,1),n);o.position.set(0,1.5,3.3),e.add(o);const a=new Q(new Ee(.12,1.6,1.2),t);return a.position.set(0,2.2,3.3),e.add(a),e.traverse(c=>{c.isMesh&&(c.castShadow=!0)}),e}function Ny(i){const e=oi(1337),t=[];let n=0;for(;t.length<8e3&&n++<2e5;){const _=(e()*2-1)*16e3,u=(e()*2-1)*16e3,m=ke(_,u);m<3||m>160||Math.abs(_)<260&&Math.abs(u)<1050||_>0&&_<220&&u>0&&u<340||Math.abs(_-Ut.x)<200&&Math.abs(u-Ut.z)<500||Math.abs(_-Wt.x)<200&&Math.abs(u-Wt.z)<500||Math.hypot(_+330,u-860)<320||Math.hypot(_-8500,u-7500)<420||Math.abs(ke(_+10,u)-m)+Math.abs(ke(_,u+10)-m)>14||t.push({x:_,h:m,z:u,s:.7+e()*.9,r:e()*Math.PI*2})}const s=new tt(.35,.5,4,6),r=new hn(2.6,9,7),o=new se({color:5914664,roughness:1}),a=new se({color:1983520,roughness:1}),c=new Yr(s,o,t.length),l=new Yr(r,a,t.length),h=new qe,f=new pn,d=new Sn,p=new I,g=new I;return t.forEach((_,u)=>{d.set(0,_.r,0),f.setFromEuler(d),p.set(_.x,_.h+2*_.s,_.z),g.set(_.s,_.s,_.s),h.compose(p,f,g),c.setMatrixAt(u,h),p.set(_.x,_.h+(4+4.5)*_.s,_.z),h.compose(p,f,g),l.setMatrixAt(u,h)}),c.castShadow=l.castShadow=!0,l.receiveShadow=!0,i.add(c,l),{count:t.length}}function Uy(i){const e=Oy(),t=oi(77),n=new Je;for(let s=0;s<40;s++){const r=new Je,o=4+Math.floor(t()*3);for(let l=0;l<o;l++){const h=.82+t()*.18,f=new dn(new sn({map:e,transparent:!0,opacity:.8,depthWrite:!1,color:new ze(h,h,h*1.02)}));f.position.set((t()-.5)*420,(t()-.5)*60,(t()-.5)*180);const d=220+t()*260;f.scale.set(d,d*.5,1),r.add(f)}const a=t()*Math.PI*2,c=1500+t()*15e3;r.position.set(Math.cos(a)*c,520+t()*650,Math.sin(a)*c),n.add(r)}return i.add(n),n}function Fy(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d"),t=e.createImageData(256,256),n=oi(9);for(let r=0;r<t.data.length;r+=4){const o=228+Math.floor(n()*28);t.data[r]=t.data[r+1]=t.data[r+2]=o,t.data[r+3]=255}e.putImageData(t,0,0);const s=new rn(i);return s.wrapS=s.wrapT=Zi,s.repeat.set(300,300),s}function Oy(){const i=document.createElement("canvas");i.width=i.height=128;const e=i.getContext("2d"),t=oi(5);for(let n=0;n<46;n++){const s=24+t()*80,r=46+t()*36,o=10+t()*22,a=e.createRadialGradient(s,r,0,s,r,o);a.addColorStop(0,"rgba(255,255,255,0.5)"),a.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=a,e.beginPath(),e.arc(s,r,o,0,7),e.fill()}return new rn(i)}function js(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,0.6)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new rn(i)}function By(){const i=document.createElement("canvas");i.width=128,i.height=16;const e=i.getContext("2d");for(let n=0;n<6;n++)e.fillStyle=n%2?"#e8641e":"#f2f2f2",e.fillRect(n*22,0,22,16);const t=new rn(i);return t.wrapS=Zi,t}function zy(i,e){const t=document.createElement("canvas");t.width=128,t.height=192;const n=t.getContext("2d");n.clearRect(0,0,128,192),n.fillStyle="#f2f2f2",n.font=`bold ${e}px monospace`,n.textAlign="center",n.textBaseline="middle",n.fillText(i[0],64,52),n.fillText(i[1],64,140);const s=new rn(t);return s.anisotropy=4,s}function ky(i){const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");t.fillStyle="#14202e",t.fillRect(0,0,512,128),t.strokeStyle="#ffb020",t.lineWidth=8,t.strokeRect(6,6,500,116),t.fillStyle="#ffd97a",t.font="bold 64px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText(i,256,66);const n=new rn(e);return n.anisotropy=4,n}function gc(i,e,t,n,s,r,o){const a=e.length,c=[],l=[];for(let d=0;d<a;d++){const[p,g]=e[d],[_,u]=e[(d+1)%a],[m,y]=e[(d-1+a)%a];let x=_-m,M=u-y;const A=Math.hypot(x,M)||1;x/=A,M/=A;const S=-M,b=x,T=p+S*n,L=g+b*n,v=T+S*s/2,w=L+b*s/2,F=T-S*s/2,U=L-b*s/2;if(c.push(v,ke(v,w)+r,w,F,ke(F,U)+r,U),t||d<a-1){const N=d*2,z=d*2+1,D=(d+1)%a*2,X=(d+1)%a*2+1;l.push(N,z,D,z,X,D)}}const h=new Ot;h.setAttribute("position",new mt(c,3)),h.setIndex(l),h.computeVertexNormals();const f=new Q(h,o);f.receiveShadow=!0,i.add(f)}function zo(i,e,t,n=!0){const s=[],r=e.length,o=n?r:r-1;for(let x=0;x<o;x++){const[M,A]=e[x],[S,b]=e[(x+1)%r],T=Math.hypot(S-M,b-A),L=Math.max(2,Math.round(T/12));for(let v=0;v<L;v++){const w=v/L;s.push([M+(S-M)*w,A+(b-A)*w])}}const a=new se({color:3356220,roughness:1}),c=new se({color:10133670,roughness:.95});gc(i,s,n,0,t,.18,a),gc(i,s,n,t/2+.6,1.1,.32,c),gc(i,s,n,-t/2-.6,1.1,.32,c);const l=new Ee(.35,.06,3),h=new Pt({color:14211280}),f=[];for(let x=0;x<s.length;x+=2)f.push(s[x]);const d=new Yr(l,h,f.length),p=new qe,g=new pn,_=new Sn,u=new I,m=new I(1,1,1);f.forEach(([x,M],A)=>{const[S,b]=f[(A+1)%f.length];_.set(0,Math.atan2(S-x,b-M),0),g.setFromEuler(_),u.set(x,ke(x,M)+.24,M),p.compose(u,g,m),d.setMatrixAt(A,p)}),i.add(d);const y=[];for(let x=0;x<s.length;x+=2)y.push({x:s[x][0],z:s[x][1]});return y}function Hy(i){const e=new Je,t=oi(4242),n=[],s=[],r=[],o=[15260864,14213864,15255736,13162680,14733544,15788240],a=[9059114,3824250,5921370,7031338],c=o.map(y=>new se({color:y,roughness:.9})),l=a.map(y=>new se({color:y,roughness:.9})),h=new se({color:1053980,roughness:.15,metalness:.6,emissive:16763514,emissiveIntensity:0});s.push(h);const f=new se({color:4862496,roughness:.9}),d=(y,x,M=1)=>{const A=ke(y,x);if(A<3)return!1;const S=(7+t()*5)*M,b=(6+t()*4)*M,T=3.5+t()*2,L=new Q(new Ee(S,T,b),c[Math.floor(t()*6)]);L.position.set(y,A+T/2-.4,x),L.rotation.y=t()*Math.PI,L.castShadow=L.receiveShadow=!0,e.add(L);for(const U of[-1,1])for(const N of[-.22,.22]){const z=new Q(new Zt(1.1,1.1),h);z.position.set(N*S,.3,U*(b/2+.03)),U<0&&(z.rotation.y=Math.PI),L.add(z)}const v=new Q(new Ee(1.1,2.2,.1),f);v.position.set(0,-T/2+1.1,b/2+.03),L.add(v);const w=new Q(new Ee(.7,2.2,.7),new se({color:9076856,roughness:.9}));w.position.set(S/4,T/2+.8,0),w.castShadow=!0,L.add(w);const F=new Q(new hn(Math.max(S,b)*.75,2.6,4),l[Math.floor(t()*4)]);return F.position.set(y,A+T+.9,x),F.rotation.y=Math.PI/4,F.castShadow=!0,e.add(F),!0},p=(y,x,M,A,S)=>{let b=0,T=0;for(;b<S&&T++<400;){const L=y+t()*(x-y),v=M+t()*(A-M),w=ke(L,v);w<4||Math.abs(ke(L+12,v)-w)+Math.abs(ke(L,v+12)-w)>18||d(L,v)&&b++}};p(-140,60,760,1020,9),p(8380,8620,7380,7620,14);{const y=ua.x,x=ua.z,M=ke(y,x),A=new Q(new Ee(13,5.5,10),new se({color:3033704,roughness:.8}));A.position.set(y,M+2.75-.3,x),A.castShadow=A.receiveShadow=!0,e.add(A);const S=new Q(new Ee(14,.6,11),new se({color:1846336,roughness:.8}));S.position.set(y,M+5.6,x),S.castShadow=!0,e.add(S);const b=new Q(new Zt(10,2.5),new Pt({map:ky("PILOT SHOP"),transparent:!1}));b.position.set(y,M+4.2,x-5.15),b.rotation.y=Math.PI,e.add(b);const T=new dn(new sn({map:js(),color:16767354,transparent:!0,depthWrite:!1}));T.position.set(y,M+5.4,x-5.6),T.scale.set(6,6,1),T.userData.night=!0,e.add(T),n.push(T);const L=new Q(new Ee(1,2,.7),new se({color:12724778,roughness:.5}));L.position.set(y+8,M+1,x-2),L.castShadow=!0,e.add(L)}{const y=[14764875,4947425,14787659,4968842,14777032];[[7260,6410],[7220,6380],[7180,6350],[7300,6430],[7130,6310]].forEach(([U,N],z)=>{const D=ke(U,N);if(D<.4||D>9)return;const X=new Q(new tt(.08,.08,3),new se({color:15658734}));X.position.set(U,D+1.5,N),e.add(X);const V=new Q(new hn(2.2,1.2,8),new se({color:y[z%y.length],roughness:.8}));V.position.set(U,D+3.2,N),V.castShadow=!0,e.add(V)});const M=7225,A=6378,S=-.75,b=-.66,T=100,L=new se({color:9071432,roughness:.9}),v=new Q(new Ee(7,.5,T),L),w=M+S*T,F=A+b*T;v.position.set((M+w)/2,5.6,(A+F)/2),v.rotation.y=Math.atan2(S,b),v.castShadow=v.receiveShadow=!0,e.add(v);for(let U=0;U<=T;U+=12){const N=M+S*U,z=A+b*U,D=Math.max(ke(N,z),-8),X=new Q(new tt(.25,.25,5.6-D),new se({color:5916210}));X.position.set(N,(5.6+D)/2,z),e.add(X)}}const g=js(),_=y=>{for(let x=0;x<y.length;x+=6){const M=y[x],A=ke(M.x,M.z);if(A<2)continue;const S=new Q(new tt(.12,.16,7),new se({color:3817285,roughness:.7}));S.position.set(M.x+4.5,A+3.5,M.z),S.castShadow=!0,e.add(S);const b=new dn(new sn({map:g,color:16767392,transparent:!0,depthWrite:!1}));b.position.set(M.x+4.5,A+7.2,M.z),b.scale.set(7,7,1),b.userData.night=!0,e.add(b),n.push(b)}},u=[[-480,740],[-180,740],[-180,980],[-480,980]],m=[[8350,7350],[8650,7350],[8650,7650],[8350,7650]];for(const y of[u,m]){const x=zo(e,y,6);r.push(x),_(x)}{const{x:y,z:x,halfLen:M,halfWid:A,elev:S}=Wt,b=new Q(new Ee(A*2,.25,M*2),new se({color:4483888,roughness:1}));b.position.set(y,S+.1,x),b.receiveShadow=!0,e.add(b);const T=new se({color:15790320,roughness:.9});for(let v=-M;v<=M;v+=56)for(const w of[-A-2,A+2]){const F=new Q(new tt(.7,.7,.5,10),T);F.position.set(y+w,S+.4,x+v),e.add(F)}const L=new Q(new Ee(5,3,4),new se({color:8020552,roughness:.9}));L.position.set(y+20,S+1.5,x+30),L.castShadow=!0,e.add(L)}p(-1350,-1050,-5450,-5150,8);{const M=ke(-1200,-5300),A=new Q(new Ee(7,4.5,10),new se({color:15920608,roughness:.9}));A.position.set(-1200,M+2.2-.3,-5300),A.castShadow=A.receiveShadow=!0,e.add(A);const S=new Q(new Ee(2.4,7,2.4),new se({color:15920608,roughness:.9}));S.position.set(-1200,M+5.5,-5300-5.5),S.castShadow=!0,e.add(S)}p(2500,2740,1960,2200,8);{const y=oi(31337);for(let x=0;x<3;x++){const M=2560+y()*120,A=2020+y()*120,S=ke(M,A);if(S<1)continue;const b=new Je,T=new Q(new Ee(1.4,.6,3.4),new se({color:[2777026,12763842,14721056][x],roughness:.8}));T.castShadow=!0,b.add(T),b.position.set(M,S+.35,A),b.rotation.y=y()*Math.PI,x===1&&(b.rotation.z=Math.PI),e.add(b)}}{const S=document.createElement("canvas");S.width=64,S.height=128;const b=document.createElement("canvas");b.width=64,b.height=128;const T=S.getContext("2d"),L=b.getContext("2d"),v=oi(777);T.fillStyle="#c9d1d8",T.fillRect(0,0,64,128),L.fillStyle="#000000",L.fillRect(0,0,64,128);for(let R=0;R<16;R++)for(let $=0;$<6;$++){const ne=4+$*10,K=4+R*7.6;T.fillStyle="#232c38",T.fillRect(ne,K,7,4.6),v()<.35&&(L.fillStyle="#ffd97a",L.fillRect(ne,K,7,4.6))}const w=new se({map:new rn(S),emissiveMap:new rn(b),emissive:16777215,emissiveIntensity:0,roughness:.75});s.push(w);const F=new Yr(new Ee(1,1,1),w,25),U=new qe,N=new pn,z=new Sn,D=new I,X=new I,V=new ze;let te=0;for(let R=-2;R<=2&&te<25;R++)for(let $=-2;$<=2&&te<25;$++){if(Math.abs(R)<1&&Math.abs($)<1)continue;const ne=-7e3+R*62+(v()-.5)*10,K=1500+$*62+(v()-.5)*10,ae=ke(ne,K);if(ae<4)continue;const _e=Math.hypot(R,$),fe=Math.max(22,72-_e*14+v()*14),P=20+v()*8,E=20+v()*8;z.set(0,v()<.5?0:Math.PI/2,0),N.setFromEuler(z),D.set(ne,ae+fe/2-2,K),X.set(P,fe,E),U.compose(D,N,X),F.setMatrixAt(te,U),V.setHSL(.58,.08+v()*.1,.82+v()*.12),F.setColorAt(te,V),te++}F.count=te,F.castShadow=F.receiveShadow=!0,e.add(F);const oe=ke(-7e3,1500),ce=new Q(new ps(46,24),new se({color:3037736,roughness:1}));ce.rotation.x=-Math.PI/2,ce.position.set(-7e3,oe+.4,1500),ce.receiveShadow=!0,e.add(ce);const Le=new Q(new ps(12,20),new se({color:2779802,roughness:.2,metalness:.4}));Le.rotation.x=-Math.PI/2,Le.position.set(-6988,oe+.55,1508),e.add(Le);const Ce=new Q(new tt(4,6,92,12),new se({color:9081760,roughness:.5,metalness:.4}));Ce.position.set(-7040,oe+46,1470),Ce.castShadow=!0,e.add(Ce);const q=new dn(new sn({map:js(),color:16729156,transparent:!0,depthWrite:!1}));q.position.set(-7040,oe+93,1470),q.scale.set(9,9,1),q.userData={blink:!0,rate:.7,duty:.15},e.add(q),p(-7450,-6550,1700,1950,8),p(-7450,-6550,1050,1300,8);const re=[];for(const R of[-7150,-7e3,-6850])re.push(zo(e,[[R,1050],[R,1950]],7,!1));for(const R of[1350,1500,1650])re.push(zo(e,[[-7450,R],[-6550,R]],7,!1));re.forEach(_);const xe=[[-7380,1120],[-6620,1120],[-6620,1880],[-7380,1880]];r.push(zo(e,xe,7));const ue=[];for(let R=0;R<2;R++){const $={r:new se({color:3342336,emissive:16720418,emissiveIntensity:.1}),y:new se({color:3351040,emissive:16759586,emissiveIntensity:.1}),g:new se({color:13056,emissive:2293572,emissiveIntensity:.1})};ue.push($)}[[-7e3,1350],[-6850,1500]].forEach(([R,$],ne)=>{const K=ke(R,$),ae=new Q(new tt(.15,.2,6.5),new se({color:2764083,roughness:.7}));ae.position.set(R+5,K+3.2,$+5),ae.castShadow=!0,e.add(ae);const _e=new Q(new Ee(1,2.6,1),new se({color:1118740,roughness:.6}));_e.position.set(R+5,K+7,$+5),e.add(_e);const fe=ue[ne%2],P=[[fe.r,.85],[fe.y,0],[fe.g,-.85]];for(const[H,j]of P){const ee=new Q(new ri(.32,10,8),H);ee.position.set(R+5,K+7+j,$+4.45),e.add(ee)}const E=new Je;E.userData.tlCycle={mats:fe,off:ne*7},E.position.set(R,K,$),e.add(E)});const Ne=[3828418,15263976,2764083,12728890];[[-6930,1420,.3],[-7070,1580,-.2],[-300,800,.9],[8450,7420,1.8]].forEach(([R,$,ne],K)=>{const ae=new Je,_e=new se({color:Ne[K%4],roughness:.4,metalness:.3}),fe=new Q(new Ee(2,.9,4.2),_e);fe.position.y=.85,fe.castShadow=!0;const P=new Q(new Ee(1.7,.65,2.1),new se({color:1053980,roughness:.1,metalness:.8}));P.position.set(0,1.5,-.2),ae.add(fe,P);const E=new tt(.42,.42,.35,10),H=new se({color:1315860,roughness:.9});for(const[ee,Z]of[[-.95,1.4],[.95,1.4],[-.95,-1.4],[.95,-1.4]]){const Ae=new Q(E,H);Ae.rotation.z=Math.PI/2,Ae.position.set(ee,.42,Z),ae.add(Ae)}const j=ke(R,$);ae.position.set(R,j<1?1:j+.15,$),ae.rotation.y=ne,e.add(ae)});const Te=new Je,De=new Q(new Ee(16,7,55),new se({color:8003616,roughness:.6}));De.position.y=1,De.castShadow=!0;const He=new Q(new Ee(12,9,8),new se({color:15263976,roughness:.6}));He.position.set(0,8,-20),He.castShadow=!0,Te.add(De,He);const J=[12728890,3828418,3843669,14721056];for(let R=0;R<8;R++){const $=new Q(new Ee(3.4,3,5),new se({color:J[R%4],roughness:.7}));$.position.set(R%2?-4:4,6,2+Math.floor(R/2)*6),Te.add($)}Te.position.set(-4880,.5,1040),Te.rotation.y=.4,e.add(Te)}return i.add(e),{nightGlows:n,nightMats:s,roadLoops:r}}const gs=[{name:"Coral Strip",blurb:"a 600 m grass strip on the south-east island — landable!",x:Ut.x,z:Ut.z,r:420},{name:"Harborview",blurb:"hillside town in the west valley",x:-330,z:860,r:380},{name:"Lighthouse Point",blurb:"the rotating beacon on the north cape",x:150,z:-1450,r:320},{name:"Sailboat Marina",blurb:"floating docks off the south-west coast",x:-2132,z:2251,r:380},{name:"Wind Farm",blurb:"three turbines on the east ridge",x:1400,z:-500,r:320},{name:"Summit Lookout",blurb:"fire tower on the 300 m peak",x:1800,z:-600,r:280},{name:"Seabreeze",blurb:"resort town on the north-east island",x:8500,z:7500,r:480},{name:"North Strip",blurb:"a lonely grass strip on the north island",x:Wt.x,z:Wt.z,r:420},{name:"Aurora City",blurb:"the big city on the west island",x:-7e3,z:1500,r:700},{name:"Northville",blurb:"hamlet by the North Strip",x:-1200,z:-5300,r:300},{name:"Coral Bay",blurb:"fishing village on the coral shore",x:2620,z:2080,r:300},{name:"Shipwreck Cove",blurb:"a wreck rotting in the shallows SE of Coral",x:3150,z:2550,r:320},{name:"Observatory",blurb:"star dome on the east peak",x:7400,z:-2400,r:320},{name:"Ember Isle",blurb:"a smoking volcano far to the south",x:3e3,z:13e3,r:600}];function Vy(i){const e=oi(2024),t=new Je,n=(g,_,u,m,y,x=0)=>{const M=new Q(g,_);return M.position.set(u,m,y),M.rotation.y=x,M.castShadow=M.receiveShadow=!0,t.add(M),M};{const{x:g,z:_,halfLen:u,halfWid:m,elev:y}=Ut,x=n(new Ee(m*2,.25,u*2),new se({color:4025135,roughness:1}),g,y+.1,_);x.castShadow=!1;const M=new se({color:15790320,roughness:.9});for(let b=-u;b<=u;b+=60)for(const T of[-m-2,m+2]){const L=new Q(new tt(.7,.7,.5,10),M);L.position.set(g+T,y+.4,_+b),t.add(L)}n(new Ee(6,3.4,5),new se({color:9071432,roughness:.9}),g+22,y+1.7,_+40);const A=n(new hn(4.8,2,4),new se({color:5913384,roughness:.9}),g+22,y+4.3,_+40,Math.PI/4);A.castShadow=!0;const S=n(new tt(.15,.15,9),new se({color:13421772}),g-18,y+4.5,_-u+30);S.castShadow=!0}{const g=[15260864,14213864,15255736,13162680,14733544,15788240],_=[9059114,3824250,5921370,7031338];let u=0,m=0;for(;u<16&&m++<600;){const L=-480+e()*320,v=720+e()*280,w=ke(L,v);if(w<4||Math.abs(ke(L+12,v)-w)+Math.abs(ke(L,v+12)-w)>16)continue;const U=7+e()*5,N=6+e()*4,z=3.5+e()*2;n(new Ee(U,z,N),new se({color:g[u%g.length],roughness:.9}),L,w+z/2-.4,v,e()*Math.PI);const D=new Q(new hn(Math.max(U,N)*.75,2.6,4),new se({color:_[u%_.length],roughness:.9}));D.position.set(L,w+z+.9,v),D.rotation.y=Math.PI/4+e()*.2,D.castShadow=!0,t.add(D),u++}const y=-330,x=860,M=ke(y,x);n(new Ee(10,6,14),new se({color:15920608,roughness:.9}),y,M+3-.4,x),n(new Ee(3.4,12,3.4),new se({color:15920608,roughness:.9}),y,M+6-.4,x-8);const A=new Q(new hn(2.6,6,4),new se({color:3820122,roughness:.8}));A.position.set(y,M+15-.4,x-8),A.rotation.y=Math.PI/4,A.castShadow=!0,t.add(A);const S=-240,b=790,T=ke(S,b);for(const[L,v]of[[-2,-2],[2,-2],[-2,2],[2,2]])n(new tt(.25,.25,14),new se({color:7829367}),S+L,T+7,b+v);n(new ri(4,14,10),new se({color:10139852,roughness:.6,metalness:.3}),S,T+16,b)}{const u=ke(150,-1450),m=document.createElement("canvas");m.width=16,m.height=128;const y=m.getContext("2d");for(let T=0;T<8;T++)y.fillStyle=T%2?"#c22":"#eee",y.fillRect(0,T*16,16,16);const x=new rn(m),M=n(new tt(3.2,4.2,26,14),new se({map:x,roughness:.7}),150,u+13,-1450);M.castShadow=!0,n(new tt(3.6,3.6,2.4,14),new se({color:2238e3,roughness:.5,metalness:.4}),150,u+27,-1450);const A=new dn(new sn({map:js(),color:16773808,transparent:!0,depthWrite:!1}));A.position.set(150,u+27.5,-1450),A.scale.set(10,10,1),A.userData={blink:!0,rate:.5,duty:.5,dim:!0},t.add(A);const S=new Pt({color:16773808,transparent:!0,opacity:.13,blending:Vr,depthWrite:!1,side:jt}),b=new Je;for(const T of[0,Math.PI]){const L=new Je;L.rotation.y=T;const v=new Q(new hn(7,220,12,1,!0),S);v.rotation.z=Math.PI/2,v.position.x=110,L.add(v),b.add(L)}b.position.set(150,u+27.5,-1450),b.name="lightbeams",t.add(b)}const s=new Je;s.name="boats";{const u=new se({color:9071432,roughness:.9});for(const y of[-30,30]){const x=new Q(new Ee(60,.6,4),u);x.position.set(-2132,.5,2251+y),x.castShadow=x.receiveShadow=!0,t.add(x)}const m=[16777215,16765562,8046847,16751226,14221272];for(let y=0;y<6;y++){const x=new Je,M=new Q(new Ee(2.2,1.2,7),new se({color:[12724778,2777026,15658734][y%3],roughness:.5}));M.position.y=.4,M.castShadow=!0;const A=new Q(new tt(.09,.09,9),new se({color:7031338,roughness:.8}));A.position.y=5,A.castShadow=!0;const S=new Ma;S.moveTo(0,0),S.lineTo(0,7.6),S.lineTo(3.4,.6),S.lineTo(0,0);const b=new Q(new $l(S),new se({color:m[y%m.length],side:jt,roughness:.8}));b.position.set(.15,1.2,-.5),x.add(M,A,b),x.position.set(-2156+y%3*24,0,2251+(y<3?-30:30)+6),x.rotation.y=(e()-.5)*.6,x.userData.phase=e()*7,s.add(x)}t.add(s)}const r=[];{const g=new se({color:15265007,roughness:.4,metalness:.2});for(const[_,u]of[[1400,-500],[1470,-420],[1330,-410]]){const m=ke(_,u),y=n(new tt(1.1,1.6,42,10),g,_,m+21,u);y.castShadow=!0;const x=new Je;x.position.set(_,m+42,u-1.8);for(let M=0;M<3;M++){const A=new Q(new Ee(.7,15,.18),g);A.geometry=A.geometry.clone(),A.geometry.translate(0,8.2,0);const S=new Je;S.rotation.z=M/3*Math.PI*2,S.add(A),A.castShadow=!0,x.add(S)}t.add(x),r.push(x)}}{const u=ke(1800,-600),m=new se({color:5916210,roughness:.9});for(const[y,x]of[[-3,-3],[3,-3],[-3,3],[3,3]]){const M=new Q(new tt(.3,.3,18),m);M.position.set(1800+y,u+9,-600+x),M.castShadow=!0,t.add(M)}n(new Ee(9,4,9),new se({color:8020552,roughness:.9}),1800,u+20,-600),n(new hn(7,3,4),new se({color:3820090,roughness:.9}),1800,u+23.5,-600,Math.PI/4)}{const g=new Je,_=new se({color:3812902,roughness:.95}),u=new Q(new Ee(10,6,34),_);u.castShadow=!0;const m=new Q(new tt(5,5,6,3,1),_);m.rotation.y=Math.PI,m.position.z=-19;const y=new Q(new tt(.3,.4,18),new se({color:4864554,roughness:.9}));y.position.set(0,8,4),y.rotation.z=.35,y.castShadow=!0,g.add(u,m,y),g.position.set(3150,-1.5,2550),g.rotation.set(.08,.7,.42),t.add(g)}{const u=ke(7400,-2400);n(new tt(6,6.5,7,14),new se({color:12106946,roughness:.8}),7400,u+3.5,-2400);const m=new Q(new ri(5.5,18,12,0,Math.PI*2,0,Math.PI/2),new se({color:15265010,roughness:.35,metalness:.2}));m.position.set(7400,u+7,-2400),m.castShadow=!0,t.add(m);const y=new Q(new Ee(1.6,4.5,.6),new se({color:1316380,roughness:.6}));y.position.set(7400,u+9,-2400-5.2),y.rotation.x=-.25,t.add(y)}let o=null;{const u=ke(3e3,13e3),m=new Q(new hn(150,110,24,1,!0),new se({color:3813936,roughness:1,side:jt}));m.position.set(3e3,u+55,13e3),t.add(m),o=new se({color:5446149,emissive:16734720,emissiveIntensity:1.6,roughness:.8});const y=new Q(new ps(26,24),o);y.rotation.x=-Math.PI/2,y.position.set(3e3,u+108,13e3),t.add(y);const x=new dn(new sn({map:js(),color:16742946,transparent:!0,depthWrite:!1}));x.position.set(3e3,u+130,13e3),x.scale.set(180,180,1),x.userData={blink:!0,rate:.6,duty:.8,dim:!0},t.add(x)}const a=[];{const g=new Pt({color:16054008,side:jt}),_=[{x:-2132,z:2251,n:5},{x:-4880,z:1040,n:4}],u=oi(5150);for(const m of _)for(let y=0;y<m.n;y++){const x=new Je,M=new Zt(1.6,.5);M.translate(.8,0,0),M.rotateX(-Math.PI/2);const A=new Q(M,g),S=new Q(M,g);S.rotation.y=Math.PI,x.add(A,S),x.userData={cx:m.x,cz:m.z,r:30+u()*55,h:14+u()*22,sp:.25+u()*.3,ph:u()*7,wl:A,wr:S},t.add(x),a.push(x)}}const c=new Je;c.name="balloons";{const g=[14764875,4947425,14787659];for(let _=0;_<3;_++){const u=new Je,m=new Q(new ri(9,16,12),new se({color:g[_],roughness:.7}));m.scale.y=1.15;const y=new Q(new Ee(2.4,2,2.4),new se({color:7031338,roughness:.9}));y.position.y=-12,u.add(m,y);const x=_/3*Math.PI*2;u.position.set(Math.cos(x)*1500,420+_*90,Math.sin(x)*1500),u.userData.phase=x,c.add(u)}t.add(c)}const l=[];{const g=new Pt({color:6737151,transparent:!0,opacity:.35,blending:Vr,depthWrite:!1,side:jt});gs.forEach((_,u)=>{const m=Math.max(0,ke(_.x,_.z)),y=new Q(new tt(6,14,700,10,1,!0),g.clone());y.position.set(_.x,m+350,_.z),y.name="pillar-"+u,t.add(y),l.push(y)})}i.add(t);function h(g){const _=l[g];_&&(_.visible=!1)}const f=t.getObjectByName("lightbeams"),d=c.children.map(g=>g.position);function p(g,_,u){for(const y of s.children){const x=y.userData.phase||0;y.position.y=Math.sin(_*.9+x)*.35,y.rotation.z=Math.sin(_*.7+x)*.05,y.rotation.x=Math.cos(_*.6+x)*.04}const m=u?Math.hypot(u.x,u.z):3;for(const y of r)y.rotation.z+=g*(.8+m*.35);for(const y of c.children){y.userData.phase+=g*.008;const x=y.userData.phase;y.position.x=Math.cos(x)*1500+(u?u.x*8:0),y.position.z=Math.sin(x)*1500+(u?u.z*8:0),y.position.y+=Math.sin(_*.3+x*5)*g*2}f&&(f.rotation.y=_*.5),o&&(o.emissiveIntensity=1.3+Math.sin(_*3.1)*.35+Math.sin(_*7.7)*.15);for(const y of a){const x=y.userData,M=_*x.sp+x.ph;y.position.set(x.cx+Math.cos(M)*x.r,x.h+Math.sin(_*.9+x.ph)*2,x.cz+Math.sin(M)*x.r),y.rotation.y=-M;const A=Math.sin(_*9+x.ph)*.55;x.wl.rotation.x=A,x.wr.rotation.x=-A}for(const y of l)y.visible&&(y.material.opacity=.28+Math.sin(_*2+y.position.x)*.12,y.rotation.y+=g*.3)}return{found:h,update:p,balloons:d}}const Ve={enabled:!1,mode:"hidden",stickOn:!1,stickX:0,stickY:0,yaw:0,throttle:0,brakes:!1,run:!1};function Gy(){try{if(new URLSearchParams(location.search).has("touch")||matchMedia("(pointer: coarse)").matches||"ontouchstart"in window&&navigator.maxTouchPoints>0)return!0}catch{}return!1}function Ln(i,e,t,n=""){const s=document.createElement(i);return s.className=e,s.innerHTML=n,t.appendChild(s),s}function ko(i,{down:e,move:t,up:n}){let s=null;const r=a=>{const c=i.getBoundingClientRect();return{x:a.clientX-c.left,y:a.clientY-c.top,w:c.width,h:c.height}};i.addEventListener("touchstart",a=>{if(a.preventDefault(),s!==null)return;const c=a.changedTouches[0];s=c.identifier,e&&e(r(c),c)},{passive:!1}),i.addEventListener("touchmove",a=>{a.preventDefault();for(const c of a.changedTouches)c.identifier===s&&t&&t(r(c),c)},{passive:!1});const o=a=>{for(const c of a.changedTouches)c.identifier===s&&(s=null,n&&n())};i.addEventListener("touchend",o),i.addEventListener("touchcancel",o)}function Wy(i){if(Ve.enabled=Gy(),!Ve.enabled)return{setMode(){},isTouch:!1};document.body.classList.add("touch");const e=Ln("div","touch-hidden",document.body);e.id="touch-ui";const t=Ln("div","t-stick",e),n=Ln("div","t-knob",t),s=(S,b)=>{n.style.transform=`translate(${S}px, ${b}px)`};ko(t,{down:S=>r(S),move:S=>r(S),up:()=>{Ve.stickOn=!1,Ve.stickX=Ve.stickY=0,s(0,0),i.onStick&&i.onStick(0,0)}});function r(S){const b=Math.max(30,S.w/2-10);let T=S.x-S.w/2,L=S.y-S.h/2;const v=Math.hypot(T,L)||1,w=Math.min(1,v/b);T=T/v*w*b,L=L/v*w*b,s(T,L),Ve.stickOn=!0,Ve.stickX=T/b,Ve.stickY=-L/b,i.onStick&&i.onStick(Ve.stickX,Ve.stickY)}const o=Ln("div","t-thr",e);Ln("div","t-thr-fill",o);const a=Ln("div","t-thr-lab",o,"0%"),c=o.querySelector(".t-thr-fill"),l=(S,b=!0)=>{Ve.throttle=Math.max(0,Math.min(1,S)),c.style.height=`${Ve.throttle*100}%`,b&&(a.textContent=`${Math.round(Ve.throttle*100)}%`)};ko(o,{down:S=>l(1-S.y/S.h),move:S=>l(1-S.y/S.h),up:()=>{}});const h=Ln("div","t-rud",e),f=(S,b)=>{const T=Ln("button","t-btn",h,S);return ko(T,{down:()=>{Ve.yaw=b},up:()=>{Ve.yaw===b&&(Ve.yaw=0)}}),T};f("◀ RUD",-1),f("RUD ▶",1);const d=Ln("div","t-sys t-sys-fly",e),p=Ln("div","t-sys t-sys-walk",e),g=(S,b,T,L)=>{const v=Ln("button","t-btn",S,b);return L?ko(v,{down:()=>{Ve.brakes=!0,v.classList.add("held")},up:()=>{Ve.brakes=!1,v.classList.remove("held")}}):T!=="run"&&v.addEventListener("touchstart",w=>{w.preventDefault(),i.onAction&&i.onAction(T)},{passive:!1}),v};g(d,"⏸","pause"),g(d,"📷","cam"),g(d,"✓","next"),g(d,"FL+","flapUp"),g(d,"FL−","flapDown"),g(d,"GEAR","gear"),g(d,"BRK","brakes",!0),g(d,"🚶","walk"),g(d,"🪂","dive");const _=g(p,"🏃","run");g(p,"⏸","pause"),g(p,"📷","cam"),g(p,"✓","next"),g(p,"E","interact"),g(p,"🚶","walk"),_.addEventListener("touchstart",S=>{S.preventDefault(),Ve.run=!Ve.run,_.classList.toggle("held",Ve.run)},{passive:!1});const u=Ln("div","t-look",e);let m=null,y=0,x=0;u.addEventListener("touchstart",S=>{if(S.preventDefault(),m!==null)return;const b=S.changedTouches[0];m=b.identifier,y=b.clientX,x=b.clientY},{passive:!1}),u.addEventListener("touchmove",S=>{S.preventDefault();for(const b of S.changedTouches)b.identifier===m&&(i.onLook&&i.onLook((b.clientX-y)*1.6,(b.clientY-x)*1.6),y=b.clientX,x=b.clientY)},{passive:!1});const M=S=>{for(const b of S.changedTouches)b.identifier===m&&(m=null)};u.addEventListener("touchend",M),u.addEventListener("touchcancel",M),addEventListener("touchstart",function(){document.body.classList.add("touch")},{once:!0,passive:!0});function A(S){Ve.mode=S,e.className=S==="hidden"?"touch-hidden":"",e.dataset.mode=S,S==="fly"&&i.getThrottle&&l(i.getThrottle()),S!=="walk"&&(Ve.run=!1,_.classList.remove("held"))}return A("hidden"),{setMode:A,isTouch:!0}}function Xy(i){const e=new Set,t={pitch:0,roll:0,yaw:0,trim:0,throttle:0,flapIdx:0,gearDown:!0,brakes:!1,locked:!1};let n=!1;addEventListener("keydown",o=>{if(o.repeat){e.add(o.code);return}e.add(o.code),o.code==="KeyF"&&(t.flapIdx=Math.min(3,t.flapIdx+1)),o.code==="KeyV"&&(t.flapIdx=Math.max(0,t.flapIdx-1)),o.code==="KeyG"&&(t.gearDown=!t.gearDown),o.code==="Enter"&&!t.locked&&(n=!0)}),addEventListener("keyup",o=>e.delete(o.code)),addEventListener("wheel",o=>{t.throttle=Wn(t.throttle-Math.sign(o.deltaY)*.05,0,1)},{passive:!0}),document.addEventListener("pointerlockchange",()=>{t.locked=document.pointerLockElement===document.body}),document.addEventListener("mousemove",o=>{if(!t.locked)return;const a=i?.sensitivity??1;t.roll=Wn(t.roll+o.movementX*.0022*a,-1,1),t.pitch=Wn(t.pitch-o.movementY*.0022*a,-1,1)}),document.body.addEventListener("click",()=>{Ve.enabled||((n||!t.locked)&&document.body.requestPointerLock?.(),n=!1)});function s(o){if(n&&(n=!1,!Ve.enabled))try{const l=document.body.requestPointerLock?.();l&&typeof l.catch=="function"&&l.catch(()=>{})}catch{}(e.has("KeyW")||e.has("ShiftLeft"))&&(t.throttle=Wn(t.throttle+o*.5,0,1)),(e.has("KeyS")||e.has("ControlLeft"))&&(t.throttle=Wn(t.throttle-o*.6,0,1)),t.yaw=(e.has("KeyD")?1:0)-(e.has("KeyA")?1:0),e.has("KeyX")&&(t.trim=Wn(t.trim+o*.4,-1,1)),e.has("KeyZ")&&(t.trim=Wn(t.trim-o*.4,-1,1)),e.has("ArrowUp")&&(t.pitch=Wn(t.pitch+o*1.5,-1,1)),e.has("ArrowDown")&&(t.pitch=Wn(t.pitch-o*1.5,-1,1)),e.has("ArrowLeft")&&(t.roll=Wn(t.roll-o*2,-1,1)),e.has("ArrowRight")&&(t.roll=Wn(t.roll+o*2,-1,1)),t.brakes=e.has("KeyB");const a=Math.min(1,o*1.6),c=Math.min(1,o*.25);return!e.has("ArrowLeft")&&!e.has("ArrowRight")&&(t.roll-=t.roll*a),!e.has("ArrowUp")&&!e.has("ArrowDown")&&(t.pitch-=t.pitch*c),Ve.mode==="fly"&&(t.throttle=Ve.throttle,Ve.stickOn&&(t.pitch=Ve.stickY,t.roll=Ve.stickX),Ve.yaw!==0&&(t.yaw=Ve.yaw),Ve.brakes&&(t.brakes=!0)),t}const r=o=>{const a=e.has(o);return a&&e.delete(o),a};return{st:t,poll:s,keys:e,consumeReset:()=>r("KeyR"),consumeCam:()=>r("KeyC"),consumeHelp:()=>r("KeyH"),consumePause:()=>r("KeyP"),consumeWalk:()=>r("KeyK"),consumeInteract:()=>r("KeyE"),consumeSkydive:()=>r("KeyJ"),consumeMap:()=>r("KeyM"),consumeTutorialAdvance:()=>r("KeyT")||r("Enter")}}function Wn(i,e,t){return Math.max(e,Math.min(t,i))}function Ou(i,e){if(e===lp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===hl||e===Sd){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===hl)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class qy extends vs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Zy(t)}),this.register(function(t){return new Jy(t)}),this.register(function(t){return new aM(t)}),this.register(function(t){return new cM(t)}),this.register(function(t){return new lM(t)}),this.register(function(t){return new eM(t)}),this.register(function(t){return new tM(t)}),this.register(function(t){return new nM(t)}),this.register(function(t){return new iM(t)}),this.register(function(t){return new jy(t)}),this.register(function(t){return new sM(t)}),this.register(function(t){return new Qy(t)}),this.register(function(t){return new oM(t)}),this.register(function(t){return new rM(t)}),this.register(function(t){return new Yy(t)}),this.register(function(t){return new hM(t)}),this.register(function(t){return new uM(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=kr.extractUrlBase(e);o=kr.resolveURL(l,this.path)}else o=kr.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Zl(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===af){try{o[Qe.KHR_BINARY_GLTF]=new dM(e)}catch(f){s&&s(f);return}r=JSON.parse(o[Qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new EM(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const f=this.pluginCallbacks[h](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const f=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(f){case Qe.KHR_MATERIALS_UNLIT:o[f]=new $y;break;case Qe.KHR_DRACO_MESH_COMPRESSION:o[f]=new fM(r,this.dracoLoader);break;case Qe.KHR_TEXTURE_TRANSFORM:o[f]=new pM;break;case Qe.KHR_MESH_QUANTIZATION:o[f]=new mM;break;default:d.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function Ky(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Yy{constructor(e){this.parser=e,this.name=Qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new ze(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Kt);const f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new nf(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new iy(h),l.distance=f;break;case"spot":l=new tf(h),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,yi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class $y{constructor(){this.name=Qe.KHR_MATERIALS_UNLIT}getMaterialType(){return Pt}extendParams(e,t,n){const s=[];e.color=new ze(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Kt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,nn))}return Promise.all(s)}}class jy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Zy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new he(a,a)}return Promise.all(r)}}class Jy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Qy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class eM{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ze(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Kt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,nn)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class tM{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class nM{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ze().setRGB(a[0],a[1],a[2],Kt),Promise.all(r)}}class iM{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class sM{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ze().setRGB(a[0],a[1],a[2],Kt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,nn)),Promise.all(r)}}class rM{constructor(e){this.parser=e,this.name=Qe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class oM{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class aM{constructor(e){this.parser=e,this.name=Qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class cM{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class lM{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class hM{constructor(e){this.name=Qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,h=s.count,f=s.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,f,d,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(h*f);return o.decodeGltfBuffer(new Uint8Array(p),h,f,d,s.mode,s.filter),p})})}else return null}}class uM{constructor(e){this.name=Qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==Nn.TRIANGLES&&l.mode!==Nn.TRIANGLE_STRIP&&l.mode!==Nn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),f=h.isGroup?h.children:[h],d=l[0].count,p=[];for(const g of f){const _=new qe,u=new I,m=new pn,y=new I(1,1,1),x=new Yr(g.geometry,g.material,d);for(let M=0;M<d;M++)c.TRANSLATION&&u.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,M),c.SCALE&&y.fromBufferAttribute(c.SCALE,M),x.setMatrixAt(M,_.compose(u,m,y));for(const M in c)if(M==="_COLOR_0"){const A=c[M];x.instanceColor=new pl(A.array,A.itemSize,A.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,c[M]);xt.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),p.push(x)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const af="glTF",Pr=12,Bu={JSON:1313821514,BIN:5130562};class dM{constructor(e){this.name=Qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Pr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==af)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Pr,r=new DataView(e,Pr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Bu.JSON){const l=new Uint8Array(e,Pr+o,a);this.content=n.decode(l)}else if(c===Bu.BIN){const l=Pr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class fM{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const f=vl[h]||h.toLowerCase();a[f]=o[h]}for(const h in e.attributes){const f=vl[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],p=Zs[d.componentType];l[f]=p.name,c[f]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(f,d){s.decodeDracoFile(h,function(p){for(const g in p.attributes){const _=p.attributes[g],u=c[g];u!==void 0&&(_.normalized=u)}f(p)},a,l,Kt,d)})})}}class pM{constructor(){this.name=Qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class mM{constructor(){this.name=Qe.KHR_MESH_QUANTIZATION}}class cf extends Qr{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,f=(n-t)/h,d=f*f,p=d*f,g=e*l,_=g-l,u=-2*p+3*d,m=p-d,y=1-u,x=m-d+f;for(let M=0;M!==a;M++){const A=o[_+M+a],S=o[_+M+c]*h,b=o[g+M+a],T=o[g+M]*h;r[M]=y*A+x*S+u*b+m*T}return r}}const gM=new pn;class _M extends cf{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return gM.fromArray(r).normalize().toArray(r),r}}const Nn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Zs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},zu={9728:un,9729:Xt,9984:dd,9985:$o,9986:Ir,9987:ii},ku={33071:ni,33648:sa,10497:Zi},_c={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},vl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Oi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},xM={CUBICSPLINE:void 0,LINEAR:Xr,STEP:Wr},xc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function vM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new se({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ti})),i.DefaultMaterial}function rs(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function yi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function yM(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const f=e[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const f=e[l];if(n){const d=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):i.attributes.position;o.push(d)}if(s){const d=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):i.attributes.normal;a.push(d)}if(r){const d=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],f=l[1],d=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=f),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function MM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function SM(i){let e;const t=i.extensions&&i.extensions[Qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+vc(t.attributes):e=i.indices+":"+vc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+vc(i.targets[n]);return e}function vc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function yl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function wM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const bM=new qe;class EM{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Ky,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Qv(this.options.manager):this.textureLoader=new ry(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Zl(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return rs(r,a,s),yi(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qe.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(kr.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=_c[s.type],a=Zs[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new qt(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=_c[s.type],l=Zs[s.componentType],h=l.BYTES_PER_ELEMENT,f=h*c,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,u;if(p&&p!==f){const m=Math.floor(d/p),y="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count;let x=t.cache.get(y);x||(_=new l(a,m*p,s.count*p/h),x=new Vd(_,p/h),t.cache.add(y,x)),u=new Kr(x,c,d%p/h,g)}else a===null?_=new l(s.count*c):_=new l(a,d,s.count*c),u=new qt(_,c,g);if(s.sparse!==void 0){const m=_c.SCALAR,y=Zs[s.sparse.indices.componentType],x=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,A=new y(o[1],x,s.sparse.count*m),S=new l(o[2],M,s.sparse.count*c);a!==null&&(u=new qt(u.array.slice(),u.itemSize,u.normalized)),u.normalized=!1;for(let b=0,T=A.length;b<T;b++){const L=A[b];if(u.setX(L,S[b*c]),c>=2&&u.setY(L,S[b*c+1]),c>=3&&u.setZ(L,S[b*c+2]),c>=4&&u.setW(L,S[b*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}u.normalized=g}return u})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=zu[d.magFilter]||Xt,h.minFilter=zu[d.minFilter]||ii,h.wrapS=ku[d.wrapS]||Zi,h.wrapT=ku[d.wrapT]||Zi,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const o=s.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(f){l=!0;const d=new Blob([f],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(f){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const u=new zt(_);u.needsUpdate=!0,d(u)}),t.load(kr.resolveURL(f,r.path),g,void 0,p)})}).then(function(f){return l===!0&&a.revokeObjectURL(c),yi(f,o),f.userData.mimeType=o.mimeType||wM(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Qe.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[Qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new ya,Zn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Xd,Zn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return se}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[Qe.KHR_MATERIALS_UNLIT]){const f=s[Qe.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),l.push(f.extendParams(a,r,t))}else{const f=r.pbrMetallicRoughness||{};if(a.color=new ze(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const d=f.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Kt),a.opacity=d[3]}f.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",f.baseColorTexture,nn)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=jt);const h=r.alphaMode||xc.OPAQUE;if(h===xc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===xc.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Pt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new he(1,1),r.normalTexture.scale!==void 0)){const f=r.normalTexture.scale;a.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&o!==Pt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Pt){const f=r.emissiveFactor;a.emissive=new ze().setRGB(f[0],f[1],f[2],Kt)}return r.emissiveTexture!==void 0&&o!==Pt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,nn)),Promise.all(l).then(function(){const f=new o(a);return r.name&&(f.name=r.name),yi(f,r),t.associations.set(f,{materials:e}),r.extensions&&rs(s,f,r),f})}createUniqueName(e){const t=ft.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Hu(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=SM(l),f=s[h];if(f)o.push(f.promise);else{let d;l.extensions&&l.extensions[Qe.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Hu(new Ot,l,t),s[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?vM(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],f=[];for(let p=0,g=h.length;p<g;p++){const _=h[p],u=o[p];let m;const y=l[p];if(u.mode===Nn.TRIANGLES||u.mode===Nn.TRIANGLE_STRIP||u.mode===Nn.TRIANGLE_FAN||u.mode===void 0)m=r.isSkinnedMesh===!0?new tv(_,y):new Q(_,y),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),u.mode===Nn.TRIANGLE_STRIP?m.geometry=Ou(m.geometry,Sd):u.mode===Nn.TRIANGLE_FAN&&(m.geometry=Ou(m.geometry,hl));else if(u.mode===Nn.LINES)m=new sv(_,y);else if(u.mode===Nn.LINE_STRIP)m=new Wl(_,y);else if(u.mode===Nn.LINE_LOOP)m=new rv(_,y);else if(u.mode===Nn.POINTS)m=new Xl(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+u.mode);Object.keys(m.geometry.morphAttributes).length>0&&MM(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),yi(m,r),u.extensions&&rs(s,m,u),t.assignFinalMaterial(m),f.push(m)}for(let p=0,g=f.length;p<g;p++)t.associations.set(f[p],{meshes:e,primitives:p});if(f.length===1)return r.extensions&&rs(s,f[0],r),f[0];const d=new Je;r.extensions&&rs(s,d,r),t.associations.set(d,{meshes:e});for(let p=0,g=f.length;p<g;p++)d.add(f[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ln(Fp.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new zl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),yi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const f=o[l];if(f){a.push(f);const d=new qe;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Gl(a,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let f=0,d=s.channels.length;f<d;f++){const p=s.channels[f],g=s.samplers[p.sampler],_=p.target,u=_.node,m=s.parameters!==void 0?s.parameters[g.input]:g.input,y=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",u)),a.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",y)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){const d=f[0],p=f[1],g=f[2],_=f[3],u=f[4],m=[];for(let y=0,x=d.length;y<x;y++){const M=d[y],A=p[y],S=g[y],b=_[y],T=u[y];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const L=n._createAnimationTracks(M,A,S,b,T);if(L)for(let v=0;v<L.length;v++)m.push(L[v])}return new Xv(r,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const h=l[0],f=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,bM)});for(let p=0,g=f.length;p<g;p++)h.add(f[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Wd:l.length>1?h=new Je:l.length===1?h=l[0]:h=new xt,h!==l[0])for(let f=0,d=l.length;f<d;f++)h.add(l[f]);if(r.name&&(h.userData.name=r.name,h.name=o),yi(h,r),r.extensions&&rs(n,h,r),r.matrix!==void 0){const f=new qe;f.fromArray(r.matrix),h.applyMatrix4(f)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Je;n.name&&(r.name=s.createUniqueName(n.name)),yi(r,n),n.extensions&&rs(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,f=c.length;h<f;h++)r.add(c[h]);const l=h=>{const f=new Map;for(const[d,p]of s.associations)(d instanceof Zn||d instanceof zt)&&f.set(d,p);return h.traverse(d=>{const p=s.associations.get(d);p!=null&&f.set(d,p)}),f};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,c=[];Oi[r.path]===Oi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(Oi[r.path]){case Oi.weights:l=lr;break;case Oi.rotation:l=hr;break;case Oi.position:case Oi.scale:l=ur;break;default:switch(n.itemSize){case 1:l=lr;break;case 2:case 3:default:l=ur;break}break}const h=s.interpolation!==void 0?xM[s.interpolation]:Xr,f=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){const g=new l(c[d]+"."+Oi[r.path],t.array,f,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=yl(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof hr?_M:cf;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function TM(i,e,t){const n=e.attributes,s=new ai;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new I(c[0],c[1],c[2]),new I(l[0],l[1],l[2])),a.normalized){const h=yl(Zs[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new I,c=new I;for(let l=0,h=r.length;l<h;l++){const f=r[l];if(f.POSITION!==void 0){const d=t.json.accessors[f.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){const _=yl(Zs[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new ci;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Hu(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=vl[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return rt.workingColorSpace!==Kt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${rt.workingColorSpace}" not supported.`),yi(i,e),TM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?yM(i,e.targets,t):i})}function AM(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,0.55)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new rn(i)}function RM(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d"),t=e.createRadialGradient(128,128,20,128,128,128);t.addColorStop(0,"rgba(200,200,200,0)"),t.addColorStop(.55,"rgba(210,210,210,0.28)"),t.addColorStop(.85,"rgba(220,220,220,0.5)"),t.addColorStop(1,"rgba(230,230,230,0)"),e.fillStyle=t,e.fillRect(0,0,256,256),e.strokeStyle="rgba(60,60,60,0.35)",e.lineWidth=10;for(let n=0;n<2;n++)e.beginPath(),e.arc(128,128,95,n*Math.PI,n*Math.PI+2.4),e.stroke();return new rn(i)}function CM(i){const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d");t.clearRect(0,0,512,128),t.fillStyle="#b31b1b",t.font="bold 84px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText(i,256,68);const n=new rn(e);return n.anisotropy=4,n}const PM={wing:"high",tires:"std",body:16054008,accent:11737883,canopy:!1,hopper:!1,reg:"N172FS"};async function lf(i,e={}){const t={...PM,...e.look||{}};if(e.useGLB!==!1)try{const $=(await new qy().loadAsync("models/plane.glb")).scene;$.traverse(K=>{K.isMesh&&(K.castShadow=!0)});const ne=IM($);return i.add(ne),DM($)}catch{}const n=new Je,s=new se({color:t.body,roughness:.32,metalness:.12}),r=new se({color:t.accent,roughness:.38,metalness:.1}),o=new se({color:1842980,roughness:.55,metalness:.3}),a=new se({color:922651,roughness:.06,metalness:.9}),c=new se({color:1381653,roughness:.9}),l=new se({color:10133670,roughness:.35,metalness:.8}),h=(R,$,ne=0,K=0,ae=0)=>{const _e=new Q(R,$);return _e.position.set(ne,K,ae),_e.castShadow=!0,n.add(_e),_e},f=new Ma;f.moveTo(3.55,-.45),f.quadraticCurveTo(3.75,.1,3.35,.42),f.lineTo(2.1,.52),f.quadraticCurveTo(1.2,1.28,.2,1.3),f.lineTo(-1,1.28),f.quadraticCurveTo(-2.4,1.05,-3.55,.42),f.lineTo(-3.62,-.05),f.quadraticCurveTo(-2,-.62,-.6,-.68),f.lineTo(1.6,-.7),f.quadraticCurveTo(2.9,-.68,3.55,-.45);const d=new Yl(f,{depth:1.35,bevelEnabled:!0,bevelThickness:.18,bevelSize:.18,bevelSegments:3,steps:1});d.rotateY(Math.PI/2),d.translate(-.675,0,0);const p=new Q(d,s);p.castShadow=p.receiveShadow=!0,n.add(p);const _=h(new Ee(.02,.22,5.6),r,-.86,-.05,.4).clone();_.position.x=.86,n.add(_);const u=CM(t.reg);for(const R of[-1,1]){const $=new Q(new Zt(1.9,.48),new Pt({map:u,transparent:!0}));$.position.set(R*.868,.28,1.9),$.rotation.y=R*Math.PI/2,n.add($)}const m=h(new Ee(t.canopy?1.25:1.15,t.canopy?.78:.62,.06),a,0,t.canopy?1.06:1.02,-1.68);m.rotation.x=.8;for(const R of[-1,1]){const $=h(new Ee(.06,t.canopy?.68:.55,1.05),a,R*.87,t.canopy?1:.95,-.85);$.rotation.y=-R*.12,t.canopy||h(new Ee(.06,.5,.85),a,R*.87,.93,.25)}if(t.hopper){const R=h(new Ee(1.15,.75,1),new se({color:10133670,roughness:.6,metalness:.4}),0,1.15,.75);R.castShadow=!0}const y=t.wing==="high"?1.5:-.12,x=s;for(const R of[-1,1]){const $=h(new Ee(5.4,.16,1.55),x,R*2.75,y,-.35);$.rotation.z=-R*.035;const ne=h(new Ee(.5,.14,1.3),r,R*5.35,y+.1,-.35);if(ne.rotation.z=-R*.035,t.wing==="high"){const K=h(new tt(.06,.06,2.6),l,R*1.35,.45,-.25);K.rotation.z=R*.62}}h(new Ee(1.2,.18,1.55),x,0,y+.02,-.35);const M=(R,$,ne,K,ae,_e,fe,P)=>{const E=new Ee(R,$,ne);P==="x"&&E.translate(0,0,ne/2),P==="y"&&E.translate(0,0,ne/2);const H=new Q(E,K);return H.position.set(ae,_e,fe),H.castShadow=!0,n.add(H),H},A=M(2,.12,.5,r,-4.15,y+.01,.18,"x"),S=M(2,.12,.5,r,4.15,y+.01,.18,"x"),b=M(1.7,.12,.55,x,-1,y,.18,"x"),T=M(1.7,.12,.55,x,1,y,.18,"x");h(new Ee(3.5,.13,1.05),x,0,.42,3.15);const L=M(3.3,.11,.5,r,0,.42,3.62,"x");h(new Ee(.13,1.75,1.35),r,0,1.15,3.15);const v=M(.11,1.6,.65,s,0,1.12,3.78,"y"),w=new Je;w.position.set(0,.05,-4.02);const F=new Ee(.16,1.1,.07);F.translate(0,.55,0);const U=new Q(F,o);U.castShadow=!0;const N=U.clone();N.rotation.z=Math.PI;const z=new Q(new hn(.26,.62,14),r);z.rotation.x=-Math.PI/2,z.position.z=-.1,z.castShadow=!0;const D=new Q(new ps(1.02,40),new Pt({map:RM(),transparent:!0,opacity:0,side:jt,depthWrite:!1}));D.position.z=.02,w.add(U,N,z,D),n.add(w);const X=new Je,V=t.tires==="tundra",te=V?.46:.3,oe=V?-.8:-.78,ce=(R,$,ne)=>{const K=new Q(new tt(.07,.07,ne),l);if(K.position.set(R,-ne/2,$),K.castShadow=!0,R!==0&&(K.rotation.z=Math.sign(R)*.2),X.add(K),!V){const _e=new Q(new ri(.34,12,10),s);_e.scale.set(.75,1.05,1.5),_e.position.set(R,-.78,$),_e.castShadow=!0,X.add(_e)}const ae=new Q(new tt(te,te,V?.3:.2,14),c);ae.rotation.z=Math.PI/2,ae.position.set(R,oe,$+.08),ae.castShadow=!0,X.add(ae)};ce(0,-2.35,.9),ce(-.95,-.15,.9),ce(.95,-.15,.9),n.add(X);const Le=h(new tt(.09,.11,.5),o,.45,-.75,-2.9);Le.rotation.x=Math.PI/2,h(new tt(.025,.025,.7),l,-3.1,y+.08,-.2).rotation.x=Math.PI/2,h(new hn(.05,.35,8),o,0,1.48,-.3),h(new hn(.04,.28,8),o,0,-.85,1.6).rotation.x=Math.PI;const Ce=AM(),q=new dn(new sn({map:Ce,color:16720418,transparent:!0,depthWrite:!1}));q.position.set(-5.68,y+.1,-.35),q.scale.set(1.2,1.2,1),n.add(q);const re=q.clone();re.material=q.material.clone(),re.material.color.set(2293572),re.position.x=5.68,n.add(re);const xe=q.clone();xe.material=q.material.clone(),xe.material.color.set(16777215),xe.position.set(0,.5,3.85),xe.scale.set(.9,.9,1),n.add(xe);const ue=new dn(new sn({map:Ce,color:16777215,transparent:!0,depthWrite:!1}));ue.position.copy(q.position),ue.scale.set(3.2,3.2,1),n.add(ue);const Ne=ue.clone();Ne.position.copy(re.position),n.add(Ne);const Te=new dn(new sn({map:Ce,color:16724770,transparent:!0,depthWrite:!1}));Te.position.set(0,1.62,-.3),Te.scale.set(2.2,2.2,1),n.add(Te);const De=new dn(new sn({map:Ce,color:16774872,transparent:!0,depthWrite:!1}));De.position.set(-1.8,y,-1.15),De.scale.set(2.6,2.6,1),n.add(De);const He=h(new ps(.16,12),new Pt({color:16774872}),-1.8,y,-1.14);He.rotation.y=Math.PI;const J=new Je;return J.position.set(0,.42,-1.78),n.add(J),i.add(n),LM(n,{aileronL:A,aileronR:S,elevator:L,rudder:v,flapL:b,flapR:T,prop:w,blade1:U,blade2:N,blur:D,gear:X,strobeL:ue,strobeR:Ne,beaconT:Te,landGlow:De,landLens:He,dashAnchor:J,paintRef:s,accentRef:r})}function LM(i,e){let t=0;return{root:i,dashAnchor:e.dashAnchor,setPaint(n,s){i.traverse(r=>{!r.isMesh||!r.material||!r.material.color||(r.material===e.paintRef&&r.material.color.setHex(n),r.material===e.accentRef&&r.material.color.setHex(s))})},setState({pos:n,quat:s}){i.position.copy(n),i.quaternion.copy(s)},animate({roll:n,pitch:s,yaw:r,flapFrac:o,gearDown:a,rpm01:c},l,h=0){t+=l*(3+c*95),e.prop.rotation.z=t;const f=Math.min(1,Math.max(0,(c-.25)/.5));e.blur.material.opacity=f*.9,e.blade1.visible=e.blade2.visible=f<.85,e.aileronL.rotation.x=n*.45,e.aileronR.rotation.x=-n*.45,e.elevator.rotation.x=-s*.45,e.rudder.rotation.y=r*.5,e.flapL.rotation.x=e.flapR.rotation.x=o*.65;const d=a?0:-1.05;e.gear.position.y+=(d-e.gear.position.y)*Math.min(1,l*2.2);const p=h%1.1,g=p<.05||p>.12&&p<.17;e.strobeL.material.opacity=e.strobeR.material.opacity=g?1:0,e.strobeL.visible=e.strobeR.visible=g;const u=h%1.4/1.4<.12;e.beaconT.material.opacity=u?1:.05;const m=a?.85:0;e.landGlow.material.opacity=m,e.landLens.material.color.setScalar(a?1:.25)},pilotEye(){return new I(.38,.82,-.95)}}}function IM(i){const e=new ai().setFromObject(i),t=e.getSize(new I),n=e.getCenter(new I),s=Math.max(t.x,t.z),r=s>0?11/s:1;i.scale.multiplyScalar(r),i.position.sub(n.clone().multiplyScalar(r));const o=[];if(i.updateMatrixWorld(!0),i.traverse(c=>{/prop|spinner|nose|engine|cockpit|windshield/i.test(c.name)&&o.push(c.getWorldPosition(new I))}),o.length){const c=new I;for(const h of o)c.add(h);c.divideScalar(o.length);const l=c.sub(n);l.y=0,l.lengthSq()>1e-6&&(i.rotation.y=Math.atan2(l.x,l.z)+Math.PI)}const a=new Je;return a.add(i),i.userData.fitWrap=a,a}function DM(i){const e=i.userData.fitWrap||i;let t=null;i.traverse(o=>{!t&&/prop/i.test(o.name)&&(t=o)});let n=0,s=null;i.traverse(o=>{!s&&/cockpit|pilot|seat/i.test(o.name)&&(s=o)});const r=new Je;return r.position.set(0,.4,-1.8),(e===i?i:e).add(r),{root:e===i?i:e,dashAnchor:r,setPaint(){},setState({pos:o,quat:a}){this.root.position.copy(o),this.root.quaternion.copy(a)},animate({rpm01:o},a){n+=a*(3+o*95),t&&(t.rotation.z=n)},pilotEye(){if(s){const o=new I;return s.getWorldPosition(o),this.root.worldToLocal(o)}return new I(.3,1.2,-1)}}}const St=i=>document.getElementById(i);function NM(){const i={ias:St("h-ias"),alt:St("h-alt"),vsi:St("h-vsi"),hdg:St("h-hdg"),thr:St("h-thr"),rpm:St("h-rpm"),flap:St("h-flap"),gear:St("h-gear"),aoa:St("h-aoa"),agl:St("h-agl"),wind:St("h-wind"),cam:St("h-cam"),fps:St("h-fps"),stall:St("w-stall"),gearWarn:St("w-gear"),trim:St("h-trim"),over:St("w-over"),sights:St("h-sights"),money:St("h-money"),clock:St("h-clock"),hint:St("hint"),hintText:St("hint-text"),horizon:St("horizon")},e=i.horizon.getContext("2d");function t(o,a){e.clearRect(0,0,150,150),e.save(),e.beginPath(),e.arc(75,75,70,0,7),e.clip(),e.translate(75,75),e.rotate(-a*Math.PI/180);const d=o*1.6;e.fillStyle="#3a7bd5",e.fillRect(-90,-90+d,180,90-d+90),e.fillStyle="#8a5a2b",e.fillRect(-90,d,180,180),e.strokeStyle="#fff",e.lineWidth=1.5,e.beginPath(),e.moveTo(-90,d),e.lineTo(90,d),e.stroke(),e.font="9px monospace",e.fillStyle="#fff",e.textAlign="center";for(let p=-20;p<=20;p+=10){if(!p)continue;const g=d-p*1.6;e.beginPath(),e.moveTo(-22,g),e.lineTo(22,g),e.stroke(),e.fillText(String(Math.abs(p)),0,g-3)}e.restore(),e.strokeStyle="#ff0",e.lineWidth=3,e.beginPath(),e.moveTo(41,75),e.lineTo(65,75),e.lineTo(75,81),e.lineTo(85,75),e.lineTo(109,75),e.stroke(),e.beginPath(),e.arc(75,75,70,0,7),e.strokeStyle="rgba(255,255,255,.5)",e.lineWidth=2,e.stroke()}let n=performance.now(),s=60;function r(o){i.ias.textContent=Math.round(o.iasKt),i.alt.textContent=Math.round(o.altFt);const a=Math.round(o.vsiFpm/50)*50;i.vsi.textContent=(a>=0?"+":"")+a,i.hdg.textContent=String(Math.round(o.hdgDeg)).padStart(3,"0"),i.thr.textContent=Math.round(o.throttle*100),i.rpm.textContent=Math.round(o.rpm),i.flap.textContent=o.flapDeg,i.gear.textContent=o.gearDown?"DOWN":"UP",i.gear.style.color=o.gearDown?"#7fff5f":"#faa",i.aoa.textContent=o.aoaDeg.toFixed(1),i.agl.textContent=Math.round(o.aglFt),i.wind.textContent=Math.round(o.windKt),i.cam.textContent=o.cam,i.sights&&o.sights&&(i.sights.textContent=o.sights),i.money&&o.money!=null&&(i.money.textContent=o.money),i.clock&&o.clock&&(i.clock.textContent=o.clock),i.trim&&(i.trim.textContent=(o.trim>=0?"+":"")+(o.trim*100).toFixed(0)),i.stall.style.display=o.stalled?"block":"none",i.gearWarn.style.display=!o.gearDown&&o.aglFt<500&&o.vsiFpm<-100?"block":"none",i.over&&(i.over.style.display=o.overspeed?"block":"none",i.over.textContent=o.overspeed||""),i.hint&&(i.hint.style.display=o.hint?"block":"none",o.hint&&(i.hintText.textContent=o.hint)),t(o.pitchDeg,o.rollDeg);const c=performance.now();s+=(1e3/Math.max(1,c-n)-s)*.05,n=c,i.fps.textContent=Math.round(s)}return{update:r}}function et(i,e=2600){const t=document.getElementById("toast");t.textContent=i,t.style.display="block",clearTimeout(t._h),t._h=setTimeout(()=>t.style.display="none",e)}function UM(){let i=null,e=null,t=null,n=null,s=null,r=null,o=!1;function a(){if(!o)try{i=new(window.AudioContext||window.webkitAudioContext),e=i.createOscillator(),e.type="sawtooth",t=i.createGain(),t.gain.value=0;const l=i.createBiquadFilter();l.type="lowpass",l.frequency.value=900,e.connect(l).connect(t).connect(i.destination),e.start();const h=i.sampleRate*2,f=i.createBuffer(1,h,i.sampleRate),d=f.getChannelData(0);for(let _=0;_<h;_++)d[_]=Math.random()*2-1;const p=i.createBufferSource();p.buffer=f,p.loop=!0;const g=i.createBiquadFilter();g.type="bandpass",g.frequency.value=600,n=i.createGain(),n.gain.value=0,p.connect(g).connect(n).connect(i.destination),p.start(),s=i.createOscillator(),s.type="square",s.frequency.value=392,r=i.createGain(),r.gain.value=0,s.connect(r).connect(i.destination),s.start(),o=!0}catch{}}addEventListener("pointerdown",a,{once:!1}),addEventListener("keydown",a,{once:!1});function c(l,h,f){if(!o)return;const d=i.currentTime;e.frequency.setTargetAtTime(45+l*90+(f?8:0),d,.1),t.gain.setTargetAtTime(.02+l*.05,d,.1),n.gain.setTargetAtTime(h*.09,d,.2),r.gain.setTargetAtTime(f?.035:0,d,f?.03:.15)}return{update:c}}const Vu={windKt:6,turbulence:1,sensitivity:1,realism:!0,startTOD:"morning",dayLengthMin:12,weather:0};function FM(){try{const i=localStorage.getItem("flightsim-settings");if(i)return{...Vu,...JSON.parse(i)}}catch{}return{...Vu}}function OM(){const i=FM(),e=["home","fly","howto","settings"],t={menu:document.getElementById("menu"),pause:document.getElementById("pause"),help:document.getElementById("help"),instructor:document.getElementById("instructor")};let n=()=>{},s=()=>{};function r(u){for(const m of e)document.getElementById("screen-"+m)?.classList.toggle("active",m===u);t.menu.classList.toggle("hidden",!u)}function o(){t.menu.classList.add("hidden")}document.querySelectorAll("[data-nav]").forEach(u=>u.addEventListener("click",()=>r(u.dataset.nav))),document.getElementById("quit-btn")?.addEventListener("click",()=>{s()}),document.querySelectorAll("[data-fly]").forEach(u=>u.addEventListener("click",()=>{o();try{const m=document.body.requestPointerLock?.();m&&typeof m.catch=="function"&&m.catch(()=>{})}catch{}n(u.dataset.fly)})),document.getElementById("resume-btn")?.addEventListener("click",()=>d(!1)),document.getElementById("pause-restart-btn")?.addEventListener("click",()=>{d(!1),document.dispatchEvent(new CustomEvent("flightsim-restart"))}),document.getElementById("pause-menu-btn")?.addEventListener("click",()=>{d(!1),r("home"),document.exitPointerLock?.()});const a=(u,m,y=Number)=>{const x=document.getElementById(u);if(!x)return;x.value=i[m],x.addEventListener("input",()=>{i[m]=y(x.value);const A=document.getElementById(u+"-val");A&&(A.textContent=x.value+(u==="set-wind"?" kt":u==="set-sens"?"×":""));try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}});const M=document.getElementById(u+"-val");M&&(M.textContent=x.value+(u==="set-wind"?" kt":u==="set-sens"?"×":""))};a("set-wind","windKt"),a("set-sens","sensitivity",Number);const c=document.getElementById("set-turb");c&&(c.value=String(i.turbulence),c.addEventListener("change",()=>{i.turbulence=Number(c.value);try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}));const l=document.getElementById("set-realism");l&&(l.checked=i.realism,l.addEventListener("change",()=>{i.realism=l.checked;try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}));const h=(u,m,y=x=>x)=>{const x=document.getElementById(u);x&&(x.value=String(i[m]),x.addEventListener("change",()=>{i[m]=y(x.value);try{localStorage.setItem("flightsim-settings",JSON.stringify(i))}catch{}}))};h("set-tod","startTOD"),h("set-daylen","dayLengthMin",Number),h("set-weather","weather",Number);let f=!1;function d(u){f=u,t.pause.classList.toggle("hidden",!u),u&&document.exitPointerLock?.()}function p(u){if(!u){t.instructor.classList.add("hidden");return}t.instructor.classList.remove("hidden"),t.instructor.innerHTML=u}document.getElementById("tut-next")?.addEventListener("click",()=>document.dispatchEvent(new CustomEvent("flightsim-tut-next"))),document.getElementById("tut-skip")?.addEventListener("click",()=>document.dispatchEvent(new CustomEvent("flightsim-tut-skip")));function g(u){t.help.classList.toggle("hidden",!u)}function _(){return!t.help.classList.contains("hidden")}return{settings:i,show:r,hide:o,setPaused:d,isPaused:()=>f,setInstructor:p,setHelpVisible:g,isHelpVisible:_,onFly:u=>n=u,onQuitToMenu:u=>s=u}}function Gu(i,e=0){return Number(i).toFixed(e)}const Ho={takeoff:{title:"Lesson 1 — Takeoff & Climb",steps:[{title:"Set flaps 10°",text:"Real takeoffs use a little flap for extra lift. Press <b>F</b> once (top-left shows FLAP 10°), then press <b>T</b> or click Next.",done:i=>i.advanced||i.flapDeg===10},{title:"Full power",text:"Hold <b>W</b> (or scroll up) until THR reads 100%. The engine needs a second to spool up — watch RPM rise. Keep rolling straight with <b>A / D</b> rudder.",done:i=>i.throttle>.95&&i.rpm>2200},{title:"Rotate at 55 kt",text:"Steer the centerline with rudder. At <b>55 kt (Vr)</b>, ease the mouse upward to lift the nose. Don’t yank — 5° pitch is plenty.",done:i=>!i.onGround&&i.aglFt>20},{title:"Climb at 74 kt (Vy)",text:"Lower the nose slightly and hold <b>74 kt</b> — best climb rate. Add a touch of right rudder: the propeller tries to yaw you left (P-factor). Climb to 500 ft AGL.",done:i=>i.aglFt>500},{title:"Clean up",text:"Above 500 ft: flaps up (<b>V</b> until FLAP 0° — check speed is below 85 kt first!) and ease power to ~75%. Trim with <b>X / Z</b> so she flies hands-off.",done:i=>i.advanced||i.flapDeg===0&&i.aglFt>600},{title:"Gentle turns",text:"Roll into a 20° bank with the mouse, then lead the rollout with opposite stick. Rudder into the turn (adverse yaw). Make one left and one right 90° turn.",done:i=>i.advanced||i.turnsDone>=2},{title:"Lesson complete 🎉",text:"You can take off, climb and turn. Press <b>T</b> to finish — try Lesson 2 (landing) from the menu, or keep free-flying!",done:i=>i.advanced}]},landing:{title:"Lesson 2 — Approach & Landing",steps:[{title:"You’re on final",text:"You’re 3 nm out, lined up with the runway at ~65 kt with full flaps. Your only job: keep the runway threshold steady in the windshield with small pitch/power corrections.",done:i=>i.advanced||i.aglFt<700},{title:"Stabilized: 65 kt, −500 fpm",text:"Aim for <b>65 kt (Vapp)</b> and about <b>−500 fpm</b>. Fast? Reduce power a touch. Slow? Add power — never pull up to stretch the glide (that’s how stalls happen).",done:i=>i.advanced||i.aglFt<400&&i.iasKt>55&&i.iasKt<80},{title:"Flare",text:"At ~30 ft, ease the mouse up to slow the descent — look at the far end of the runway, not the ground. Let the wheels kiss, nosewheel last.",done:i=>i.touchedDown},{title:"Rollout",text:"Power idle (<b>S</b> to 0%), rudder to stay centered, brakes (<b>B</b>) below 40 kt. Lesson complete when you stop on the runway! 🎉",done:i=>i.advanced||i.touchedDown&&i.iasKt<8}]}};function BM(){let i=null,e=0,t=0,n=0,s=0,r=null,o=!1,a=!1;document.addEventListener("flightsim-tut-next",()=>{a=!0}),document.addEventListener("flightsim-tut-skip",()=>{l()});function c(g){return i=Ho[g]?g:null,e=0,t=0,n=0,s=0,r=null,o=!1,a=!1,i}function l(){i=null,e=0}function h(){return!!i}function f(g){if(g.hdgDeg==null||!g.airborne){r=g.hdgDeg;return}if(r==null){r=g.hdgDeg;return}let _=g.hdgDeg-r;_>180&&(_-=360),_<-180&&(_+=360),r=g.hdgDeg;const u=Math.sign(_);u!==0&&u!==n&&Math.abs(s)>60?(t++,s=0,n=u):u!==0&&n!==0&&u!==n?(s=_,n=u):(n===0&&u!==0&&(n=u),s+=_,Math.abs(s)>80&&(t++,s=0))}function d(g){if(!i)return null;g.touchedDown&&(o=!0),f({...g});const _=Ho[i].steps,u={...g,turnsDone:t,touchedDown:o,advanced:a};if(_[e].done(u))if(a=!1,e<_.length-1)e++;else return{finished:!0,lesson:i,step:e,html:p(Ho[i].title,e+1,_.length,"🎉 Lesson complete!","Head to the menu (Esc) for the next lesson, or press R and free-fly.")};const y=_[e];return{finished:!1,lesson:i,step:e,html:p(Ho[i].title,e+1,_.length,y.title,y.text)}}function p(g,_,u,m,y){return`<b>${g} — step ${Gu(_)}/${Gu(u)}</b><br><br>✈️ <b>${m}</b><br>${y}<br><br><span style="opacity:.65">Press <b>T</b> to skip a step · <b>Esc</b> to exit lesson</span>`}return{start:c,stop:l,active:h,update:d}}const hf=1024,uf=512,Yn="#e8ecf2",Gi="#8a93a3",Ml="#ff4444",da="#39d353",zM="#ffb020";function kM(i){const e=document.createElement("canvas");e.width=hf,e.height=uf;const t=e.getContext("2d"),n=new rn(e);n.anisotropy=4,n.colorSpace=nn;const s=new Je,r=new Q(new Ee(1.55,.72,.16),new se({color:1711394,roughness:.85}));s.add(r);const o=new Q(new Zt(1.5,.68),new Pt({map:n}));o.position.z=.085,s.add(o);const a=new Q(new Ee(1.6,.1,.42),new se({color:1053205,roughness:1}));a.position.set(0,.4,.1),s.add(a);const c=new Je,l=new Q(new tt(.035,.035,.5),new se({color:546,roughness:.6}));l.rotation.x=1.1,l.position.set(0,-.18,.25);const h=new Je,f=new Q(new jl(.14,.025,8,24),new se({color:1118740,roughness:.5})),d=new Q(new Ee(.26,.04,.03),new se({color:1118740,roughness:.5}));h.add(f,d),h.position.set(0,-.32,.42),c.add(l,h),s.add(c),i.add(s);let p=1;function g(u,m){h.rotation.z=-(u.rollIn||0)*1.1,h.position.y=-.32+(u.pitchIn||0)*.12,p+=m,!(p<.05)&&(p=0,Wu(t,u),n.needsUpdate=!0)}Wu(t,{}),n.needsUpdate=!0;function _(u){s.removeFromParent(),u.add(s)}return{update:g,mount:_}}const hs=(i,e,t,n)=>{i.beginPath(),i.arc(e,t,n,0,7)};function ks(i,e,t,n,s){hs(i,e,t,n),i.fillStyle="#0b0d11",i.fill(),hs(i,e,t,n),i.lineWidth=3,i.strokeStyle="#3a4150",i.stroke(),i.fillStyle=Gi,i.font="bold 17px monospace",i.textAlign="center",i.fillText(s,e,t+n-12)}function Vo(i,e,t,n,s,r="#ff5b4d",o=4){const a=(s-90)*Math.PI/180;i.strokeStyle=r,i.lineWidth=o,i.lineCap="round",i.beginPath(),i.moveTo(e,t),i.lineTo(e+Math.cos(a)*n*.88,t+Math.sin(a)*n*.88),i.stroke(),hs(i,e,t,7),i.fillStyle="#22262e",i.fill()}function yc(i,e,t,n,s,r,o,a,c){i.textAlign="center";for(let l=s;l<=r+1e-6;l+=a){const h=Sl(l,s,r),f=Math.abs((l-s)/o-Math.round((l-s)/o))<1e-6,d=n*(f?.78:.87),p=n*.95;i.strokeStyle=f?Yn:Gi,i.lineWidth=f?3:1.5,i.beginPath(),i.moveTo(e+Math.cos(h)*d,t+Math.sin(h)*d),i.lineTo(e+Math.cos(h)*p,t+Math.sin(h)*p),i.stroke(),f&&c&&(i.fillStyle=Yn,i.font="bold 16px monospace",i.fillText(c(l),e+Math.cos(h)*n*.58,t+Math.sin(h)*n*.58+6))}}function Sl(i,e,t){return(-135+Math.max(0,Math.min(1,(i-e)/(t-e)))*270-90)*Math.PI/180}function Wu(i,e){const t=e.iasKt||0,n=e.altFt||0,s=e.vsiFpm||0,r=e.hdgDeg||0,o=e.pitchDeg||0,a=e.rollDeg||0;i.fillStyle="#05070a",i.fillRect(0,0,hf,uf),ks(i,105,120,92,"AIRSPEED KT"),yc(i,105,120,92,0,160,20,10,p=>String(p)),Xu(i,105,120,78,50,129,0,160,da),Xu(i,105,120,78,129,160,0,160,zM),Vo(i,105,120,92,-135+Math.max(0,Math.min(1,t/160))*270),ks(i,315,120,92,"ATTITUDE"),i.save(),hs(i,315,120,84),i.clip(),i.translate(315,120),i.rotate(-a*Math.PI/180);const c=o*2.2;i.fillStyle="#2f6fd0",i.fillRect(-95,-95+c,190,95-c+95),i.fillStyle="#7a4a22",i.fillRect(-95,c,190,190),i.strokeStyle="#fff",i.lineWidth=2.5,i.beginPath(),i.moveTo(-95,c),i.lineTo(95,c),i.stroke(),i.fillStyle="#fff",i.font="bold 13px monospace",i.textAlign="center";for(let p=-20;p<=20;p+=10){if(!p)continue;const g=c-p*2.2;i.beginPath(),i.moveTo(-20,g),i.lineTo(20,g),i.stroke()}i.restore(),i.strokeStyle="#ffb020",i.lineWidth=5,i.beginPath(),i.moveTo(263,120),i.lineTo(301,120),i.lineTo(315,128),i.lineTo(329,120),i.lineTo(367,120),i.stroke(),ks(i,525,120,92,"ALT FT"),yc(i,525,120,92,0,10,2,1,p=>String(p));const l=n%1e3/100;Vo(i,525,120,92,-135+l/10*270),Vo(i,525,120,55,-135+n/1e4%1*270,"#e8ecf2",6),i.fillStyle="#0b0d11",i.fillRect(485,168,80,26),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(485,168,80,26),i.fillStyle=Yn,i.font="bold 20px monospace",i.textAlign="center",i.fillText(String(Math.round(n)).padStart(5,"0"),525,189),ks(i,735,120,92,"TURN");const h=Math.max(-30,Math.min(30,a*.6));i.save(),i.translate(735,120),i.rotate(-h*Math.PI/180),i.fillStyle=Yn,i.fillRect(-46,-6,34,12),i.fillRect(12,-6,34,12),i.restore(),i.fillStyle=Gi,i.font="bold 15px monospace",i.textAlign="center",i.fillText("L",677,124),i.fillText("R",793,124);const f=735+Math.max(-30,Math.min(30,-(e.betaDeg||0)*6));i.strokeStyle=Gi,i.lineWidth=3,i.beginPath(),i.moveTo(701,168),i.lineTo(769,168),i.stroke(),hs(i,f,168,8),i.fillStyle="#111",i.fill(),hs(i,f,168,8),i.strokeStyle=Yn,i.lineWidth=2,i.stroke(),ks(i,920,120,92,"HEADING"),i.save(),hs(i,920,120,84),i.clip(),i.translate(920,120),i.rotate(r*Math.PI/180),i.fillStyle="#0b0d11",i.fillRect(-90,-90,180,180),i.textAlign="center";for(let p=0;p<360;p+=10){const g=p*Math.PI/180,_=p%30===0;if(i.strokeStyle=_?Yn:Gi,i.lineWidth=_?3:1.5,i.beginPath(),i.moveTo(Math.sin(g)*66,-Math.cos(g)*66),i.lineTo(Math.sin(g)*80,-Math.cos(g)*80),i.stroke(),_){const u={0:"N",90:"E",180:"S",270:"W"};i.fillStyle=Yn,i.font="bold 17px monospace",i.fillText(u[p]??String(p/10),Math.sin(g)*48,-Math.cos(g)*48+6)}}i.restore(),i.fillStyle="#ffb020",i.fillRect(917,28,6,16),ks(i,105,356,92,"VSI FPM"),yc(i,105,356,92,-2e3,2e3,1e3,500,p=>p===0?"0":String(Math.abs(p)/1e3)+""),Vo(i,105,356,92,-135+(Math.max(-2e3,Math.min(2e3,s))+2e3)/4e3*270),qu(i,235,320,200,"RPM",(e.rpm||0)/2700,String(Math.round(e.rpm||0))),qu(i,235,368,200,"THR",e.throttle||0,Math.round((e.throttle||0)*100)+"%"),Mc(i,480,320,"STALL",e.stalled?Ml:null),Mc(i,620,320,e.gearDown?"GEAR DN":"GEAR UP",e.gearDown?da:Ml),Mc(i,760,320,"FLAP "+(e.flapDeg??0),(e.flapDeg??0)>0?Yn:null),i.fillStyle=Gi,i.font="bold 15px monospace",i.textAlign="center",i.fillText("TRIM",900,312),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(850,320,100,12);const d=850+((e.trim??0)*.5+.5)*100;i.fillStyle=Yn,i.fillRect(d-3,318,6,16),i.fillStyle=Gi,i.font="15px monospace",i.textAlign="left",i.fillText("Vr55 Vy74 Vfe85 Vapp65 Vno129 Vne163",235,420),i.fillStyle="#5a6373",i.fillText("N172FS · SKYHAWK",235,445)}function Xu(i,e,t,n,s,r,o,a,c){const l=Sl(s,o,a)+Math.PI/2,h=Sl(r,o,a)+Math.PI/2;i.strokeStyle=c,i.lineWidth=6,i.beginPath(),i.arc(e,t,n,l,h),i.stroke()}function qu(i,e,t,n,s,r,o){i.fillStyle=Gi,i.font="bold 15px monospace",i.textAlign="left",i.fillText(s,e,t-6),i.strokeStyle="#3a4150",i.lineWidth=2,i.strokeRect(e,t,n,16),i.fillStyle=r>.9?Ml:da,i.fillRect(e+2,t+2,(n-4)*Math.max(0,Math.min(1,r)),12),i.fillStyle=Yn,i.textAlign="right",i.fillText(o,e+n+62,t+14)}function Mc(i,e,t,n,s){i.fillStyle=s?"#2a0d0d":"#0b0d11",s===da&&(i.fillStyle="#0d2a14"),s===Yn&&(i.fillStyle="#1a2030"),Ku(i,e-62,t-20,124,40,6),i.fill(),i.strokeStyle=s||"#2a3040",i.lineWidth=2,Ku(i,e-62,t-20,124,40,6),i.stroke(),i.fillStyle=s||"#3a4150",i.font="bold 18px monospace",i.textAlign="center",i.fillText(n,e,t+6)}function Ku(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}const Yu={dawn:6.4,morning:9.5,noon:13,dusk:17.4,night:23.5},HM=new ze(10336470),VM=new ze(329742),GM=new ze(16773853),WM=new ze(16751181),XM=new ze(9087231);function qM(i,e,t){const n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)}function KM(i,e,t,n,s,r,o,a=[]){const l=new Float32Array(2700);for(let S=0;S<900;S++){const b=Math.random()*Math.PI*2,T=Math.asin(Math.random()*.98+.02),L=6e4;l[S*3]=Math.cos(b)*Math.cos(T)*L,l[S*3+1]=Math.sin(T)*L,l[S*3+2]=Math.sin(b)*Math.cos(T)*L}const h=new Ot;h.setAttribute("position",new qt(l,3));const f=new ya({color:13621503,size:2.4,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1}),d=new Xl(h,f);d.frustumCulled=!1,i.add(d);const p=new I(0,1,0),g=new I(0,1,0);let _=Yu[o.startTOD]??10,u=1;const m=new ze,y=new ze;function x(S){const b=Math.max(2,o.dayLengthMin||12);_=(_+S*24/(b*60))%24;const T=(_-6)/12*Math.PI,L=Math.sin(T);p.set(Math.cos(T),Math.max(-.3,L),.35).normalize(),s.sunPosition.value.copy(p),u=qM(-.06,.14,L);const v=Math.max(0,1-Math.abs(L)*4);g.set(-p.x,Math.abs(p.y)+.45,-p.z).normalize();const w=L>-.02?p:g;t.userData.dir=w,t.intensity=L>-.02?.15+u*2.45:.22,L>-.02?y.copy(GM).lerp(WM,Math.min(1,v*1.4)):y.copy(XM),t.color.copy(y),n.intensity=.07+u*.68,m.copy(VM).lerp(HM,u),i.fog.color.copy(m);const F=o.weather||0;i.fog.near=F===2?400:F===1?900:2500,i.fog.far=F===2?9e3:F===1?17e3:3e4,e.toneMappingExposure=.55+u*.2,f.opacity=1-u;const U=u<.4;for(const N of r)N.visible=U;for(const N of a)N.emissiveIntensity=U?1.2:0}const M=()=>String(Math.floor(_)).padStart(2,"0"),A=()=>String(Math.floor(_%1*60)).padStart(2,"0");return{update:x,sunDir:p,reset:()=>{_=Yu[o.startTOD]??10},isNight:()=>u<.45,clock:()=>`${M()}:${A()}`,icon:()=>u<.45?"🌙":u<.75?"🌅":"☀"}}function $u(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function YM(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d");return e.fillStyle="#9cf",e.font="bold 44px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText("Z",32,34),new rn(i)}function $M(i){const e=document.createElement("canvas");e.width=64,e.height=64;const t=e.getContext("2d");t.clearRect(0,0,64,64);const n=32;if(i===3)t.fillStyle="#141414",t.fillRect(14,22,16,10),t.fillRect(34,22,16,10),t.fillRect(28,24,8,4);else{t.fillStyle="#1a1a1a";const r=i===1?3:0;t.beginPath(),t.arc(24-r,26,3.2,0,7),t.fill(),t.beginPath(),t.arc(40+r,26,3.2,0,7),t.fill(),t.fillRect(19-r,18,10,2.5),t.fillRect(35+r,18,10,2.5)}return t.strokeStyle="#5a2e22",t.lineWidth=2.5,t.beginPath(),i===2?t.arc(n,44,6,Math.PI*1.15,Math.PI*1.85):t.arc(n,40,6,Math.PI*.15,Math.PI*.85),t.stroke(),i===1&&(t.fillStyle="rgba(230,120,120,.6)",t.beginPath(),t.arc(18,36,4,0,7),t.fill(),t.beginPath(),t.arc(46,36,4,0,7),t.fill()),new rn(e)}const Sc=[];function jM(i){return Sc[i]||(Sc[i]=new Pt({map:$M(i),transparent:!0})),Sc[i]}const ju=[15251850,1578e4,13208922,9067066,5913126],Zu=[3828418,12728890,3843669,14203194,9063874,5096130,14711354,15263976,2764083,12745392],Ju=[2764083,3824266,9075290,5921370,4877114,8010298],Qu=[1710618,4861466,9071162,12105912,8007214];function fa(i={}){const e=i.rand||Math.random,t=i.shirt??Zu[Math.floor(e()*Zu.length)],n=i.pants??Ju[Math.floor(e()*Ju.length)],s=i.skin??ju[Math.floor(e()*ju.length)],r=i.cap??null,o=new Je,a=new Je;o.add(a);const c=(S,b)=>{const T=new Q(S,b);return T.castShadow=!0,a.add(T),T},l=new se({color:t,roughness:.9}),h=new se({color:n,roughness:.9}),f=new se({color:s,roughness:.8}),d=c(new Ee(.2,.8,.24),h);d.geometry.translate(0,-.32,0),d.position.set(-.14,.8,0);const p=d.clone();p.position.x=.14,a.add(p);const g=new se({color:1842208,roughness:.7});for(const S of[d,p]){const b=new Q(new Ee(.22,.14,.36),g);b.position.set(0,-.68,.05),b.castShadow=!0,S.add(b)}const _=c(new Ee(.52,.68,.3),l);_.position.y=1.14;const u=c(new Ee(.15,.66,.18),l);u.geometry.translate(0,-.26,0),u.position.set(-.35,1.42,0);const m=u.clone();m.position.x=.35,a.add(m);const y=c(new ri(.17,12,10),f);y.position.y=1.66;const x=new Q(new Zt(.24,.24),jM(Math.floor(e()*4)));x.position.set(0,1.66,.155),a.add(x);let M=null;if(r!=null){M=new se({color:r,roughness:.8});const S=c(new tt(.14,.19,.14,10),M);S.position.y=1.82}else{const S=Qu[Math.floor(e()*Qu.length)],b=e()<.25,T=c(new ri(b?.2:.175,10,8),new se({color:S,roughness:1}));T.scale.y=b?1:.55,T.position.y=b?1.7:1.76}let A=null;return{group:o,rig:a,armL:u,armR:m,legL:d,legR:p,head:y,body:_,mats:{shirt:l,pants:h,skin:f,cap:M},walkPhase:Math.random()*7,zzz(){return A||(A=new dn(new sn({map:YM(),transparent:!0,depthWrite:!1})),A.scale.set(.8,.8,1),o.add(A)),A.visible=!0,A},hideZzz(){A&&(A.visible=!1)}}}function ed(i,e,t,n,s=6){let o=Math.atan2(e-i.position.x,t-i.position.z)-i.rotation.y;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;return i.rotation.y+=Math.max(-s*n,Math.min(s*n,o)),Math.abs(o)<.2}function ZM(i,e){const t=$u(99),n=[],s=(d,p,g,_)=>{const u=$u(_);for(let m=0;m<g;m++){const y=fa({rand:u,cap:u()<.35?3355443:null}),x=d+(u()-.5)*160,M=p+(u()-.5)*160,A=[];for(let S=0;S<5;S++)A.push({x:d+(u()-.5)*260,z:p+(u()-.5)*260});i.add(y.group),n.push({p:y,home:{x,z:M},wps:A,wpi:Math.floor(u()*5),idleT:0,sleeping:!1})}};s(-330,860,7,7),s(8500,7500,4,42),s(-7e3,1500,5,5),s(-1200,-5300,2,6),s(2620,2080,2,7);const r=fa({shirt:14182942,pants:3357252,cap:14182942});i.add(r.group);const o=[],a=[12728890,3828418,14721056];(e||[]).forEach((d,p)=>{if(!d.length)return;const g=new Je,_=new se({color:a[p%3],roughness:.4,metalness:.3}),u=new se({color:1053980,roughness:.1,metalness:.8}),m=new Q(new Ee(2,.9,4.2),_);m.position.y=.85,m.castShadow=!0;const y=new Q(new Ee(1.7,.7,2.2),u);y.position.set(0,1.5,-.2),y.castShadow=!0,g.add(m,y);const x=[],M=new tt(.42,.42,.35,12),A=new se({color:1315860,roughness:.9});for(const[S,b]of[[-.95,1.4],[.95,1.4],[-.95,-1.4],[.95,-1.4]]){const T=new Q(M,A);T.rotation.z=Math.PI/2,T.position.set(S,.42,b),g.add(T),x.push(T)}i.add(g),o.push({g,wheels:x,loop:d,seg:Math.floor(t()*d.length),speed:8+t()*3})});function c(d,p,g,_){for(const u of n){const{p:m}=u,y=m.group.position.x,x=m.group.position.z;if(g){const M=u.home.x-y,A=u.home.z-x;if(Math.hypot(M,A)>3?(l(m,u.home.x,u.home.z,d,1.6),u.sleeping=!1,m.hideZzz()):u.sleeping||(u.sleeping=!0),u.sleeping){const S=ke(y,x);m.group.position.y+=(S+.3-m.group.position.y)*Math.min(1,3*d),m.rig.rotation.x+=(-Math.PI/2-m.rig.rotation.x)*Math.min(1,3*d),m.zzz().position.set(.5,1.2+Math.sin(p*2)*.15,0)}continue}if(u.sleeping=!1,m.hideZzz(),m.rig.rotation.x+=(0-m.rig.rotation.x)*Math.min(1,5*d),u.idleT>0)u.idleT-=d,h(m,p);else{const M=u.wps[u.wpi];l(m,M.x,M.z,d,1.5)&&(u.wpi=(u.wpi+1)%u.wps.length,u.idleT=2+Math.random()*5)}}{const u=ke(Hi.x,Hi.z);r.group.position.set(Hi.x,u,Hi.z),(_?Math.hypot(_.x-Hi.x,_.z-Hi.z):99)<12?(ed(r.group,_.x,_.z,d,8),r.armR.rotation.x=-2.4+Math.sin(p*7)*.45,r.armL.rotation.x=Math.sin(p*1.7)*.06):(r.group.rotation.y+=d*.15,h(r,p))}for(const u of o){if(u.taken)continue;if(g){const T=u.loop[0];u.g.position.set(T.x,ke(T.x,T.z)+.15,T.z);continue}const m=u.loop[u.seg%u.loop.length],y=u.loop[(u.seg+1)%u.loop.length],x=y.x-u.g.position.x,M=y.z-u.g.position.z,A=Math.hypot(x,M);if(A<4){u.seg=(u.seg+1)%u.loop.length;continue}u.g.position.lengthSq()===0&&u.g.position.set(m.x,0,m.z);const S=x/A,b=M/A;u.g.position.x+=S*u.speed*d,u.g.position.z+=b*u.speed*d,u.g.position.y=ke(u.g.position.x,u.g.position.z)+.15,u.g.rotation.y=Math.atan2(S,b);for(const T of u.wheels)T.rotation.x+=u.speed*d/.42}}function l(d,p,g,_,u){const m=ed(d.group,p,g,_),y=p-d.group.position.x,x=g-d.group.position.z,M=Math.hypot(y,x),A=m&&M>2;A&&(d.group.position.x+=y/M*u*_,d.group.position.z+=x/M*u*_);const S=ke(d.group.position.x,d.group.position.z);d.group.position.y+=((S<1?1:S)-d.group.position.y)*Math.min(1,5*_),d.walkPhase+=_*(A?u*3.4:1.2);const b=A?.55:.05;return d.legL.rotation.x=Math.sin(d.walkPhase)*b,d.legR.rotation.x=-Math.sin(d.walkPhase)*b,d.armL.rotation.x=-Math.sin(d.walkPhase)*b*.8,d.armR.rotation.x=Math.sin(d.walkPhase)*b*.8,d.rig.position.y=A?Math.abs(Math.sin(d.walkPhase))*.05:0,M<2.5}function h(d,p){d.legL.rotation.x*=.9,d.legR.rotation.x*=.9,d.armL.rotation.x=Math.sin(p*1.7)*.06,!(d.armR.rotation.x<-1)&&(d.armR.rotation.x=Math.sin(p*1.7+1)*.06,d.rig.position.y=Math.sin(p*2.2)*.015)}function f(d,p,g=7){let _=null,u=g;for(const m of o){if(m.taken)continue;const y=Math.hypot(m.g.position.x-d,m.g.position.z-p);y<u&&(u=y,_=m)}return _}return{update:c,marta:r,cars:o,nearestCar:f,townsfolk:n}}function JM(i,e){const t=fa({shirt:3037756,pants:2764083,cap:15658734});t.group.visible=!1,i.add(t.group);const n=new I;let s=0,r=-.18;const o=new Set;addEventListener("keydown",_=>o.add(_.code)),addEventListener("keyup",_=>o.delete(_.code)),document.addEventListener("mousemove",_=>{document.pointerLockElement!==document.body||!t.group.visible||(s-=_.movementX*.0026,r=Math.max(-.9,Math.min(.45,r-_.movementY*.0022)))});function a(_,u,m,y){n.set(_,u,m),s=y,t.group.visible=!0,d()}function c(){t.group.visible=!1,o.clear()}function l(){return t.group.visible}function h(_,u){s-=_*.0026,r=Math.max(-.9,Math.min(.45,r-u*.0022))}function f(_={}){_.shirt!=null&&t.mats.shirt.color.setHex(_.shirt),_.pants!=null&&t.mats.pants.color.setHex(_.pants),_.cap!=null&&t.mats.cap&&t.mats.cap.color.setHex(_.cap)}function d(_){t.group.position.copy(n),t.group.rotation.y=s+Math.PI}const p=new I;function g(_){if(!t.group.visible)return;const u=(o.has("KeyW")?1:0)-(o.has("KeyS")?1:0),m=(o.has("KeyD")?1:0)-(o.has("KeyA")?1:0),x=o.has("ShiftLeft")||o.has("ShiftRight")?7:4,M=u!==0||m!==0;if(M){const F=Math.sin(s),U=Math.cos(s),N=-F,z=-U,D=U,X=-F;n.x+=(N*u+D*m)*x*_,n.z+=(z*u+X*m)*x*_;const V=N*u+D*m,te=z*u+X*m;let ce=Math.atan2(V,te)-t.group.rotation.y;for(;ce>Math.PI;)ce-=Math.PI*2;for(;ce<-Math.PI;)ce+=Math.PI*2;t.group.rotation.y+=ce*Math.min(1,12*_)}const A=ke(n.x,n.z);n.y+=((A<.5?.5:A)-n.y)*Math.min(1,12*_),t.group.position.copy(n),t.walkPhase+=_*(M?x*2.4:1.2);const S=M?.6:.04;t.legL.rotation.x=Math.sin(t.walkPhase)*S,t.legR.rotation.x=-Math.sin(t.walkPhase)*S,t.armL.rotation.x=-Math.sin(t.walkPhase)*S*.8,t.armR.rotation.x=Math.sin(t.walkPhase)*S*.8,t.rig.position.y=M?Math.abs(Math.sin(t.walkPhase))*.06:Math.sin(t.walkPhase*.4)*.015;const b=5.2,T=2.1,L=n.x+Math.sin(s)*Math.cos(r)*b,v=n.z+Math.cos(s)*Math.cos(r)*b,w=Math.max(n.y+1.5+Math.sin(-r)*b*.9,ke(L,v)+.5);e.position.set(L,w,v),p.set(n.x-L,0,n.z-v),e.lookAt(n.x,n.y+T,n.z)}return{place:a,hide:c,active:l,addLook:h,setOutfit:f,update:g,pos:n,keys:o}}const QM=["marta-hi","marta-job","marta-nice","marta-bye","marta-cash","les-rotate","les-climb","les-flaps","les-final","les-flare","les-stall","atc-takeoff","atc-land","atc-wind","atc-grease","folk-hi1","folk-hi2","folk-hi3","folk-hi4","shop-hi"];function eS(){try{return localStorage.getItem("flightsim-muted")==="1"}catch{return!1}}const yn={muted:eS(),_last:{},_ok:{},toggle(){this.muted=!this.muted;try{localStorage.setItem("flightsim-muted",this.muted?"1":"0")}catch{}return this.muted},play(i,e=0){if(this.muted||!QM.includes(i))return!1;const t=performance.now()/1e3;if(e>0&&t-(this._last[i]||-1e9)<e)return!1;this._last[i]=t;try{const n=new Audio(`audio/${i}.mp3`);return n.volume=.9,n.play().catch(()=>{}),!0}catch{return!1}},playRandom(i,e=20){if(this.muted||!i.length)return!1;const t=performance.now()/1e3;return t-(this._last._rand||-1e9)<e?!1:(this._last._rand=t,this.play(i[Math.floor(Math.random()*i.length)]))}};function Mi(i,e){try{return JSON.parse(localStorage.getItem(i))??e}catch{return e}}function Xn(i,e){try{localStorage.setItem(i,JSON.stringify(e))}catch{}}const Be={money:Mi("flightsim-money",100),items:new Set(Mi("flightsim-items",[])),paints:Mi("flightsim-paints",{}),aircraft:new Set(Mi("flightsim-aircraft",["skyhawk"])),selected:Mi("flightsim-selected","skyhawk"),outfits:new Set(Mi("flightsim-outfits",["aviator"])),outfit:Mi("flightsim-outfit","aviator"),add(i){this.money+=i,Xn("flightsim-money",this.money)},spend(i){return this.money<i?!1:(this.money-=i,Xn("flightsim-money",this.money),!0)},has(i){return this.items.has(i)},give(i){this.items.add(i),Xn("flightsim-items",[...this.items])},take(i){this.items.delete(i),Xn("flightsim-items",[...this.items])},setPaint(i,e){this.paints[i]=e,Xn("flightsim-paints",this.paints)},paintFor(i){return this.paints[i]||null},ownAircraft(i){this.aircraft.add(i),Xn("flightsim-aircraft",[...this.aircraft])},selectAircraft(i){this.selected=i,Xn("flightsim-selected",i)},wearOutfit(i){this.outfit=i,Xn("flightsim-outfit",i)},ownOutfit(i){this.outfits.add(i),Xn("flightsim-outfits",[...this.outfits])}},_s=[{id:"skyhawk",name:"✈️ Skyhawk 172",price:0,desc:"Trusty trainer. Balanced, forgiving, yours.",specs:{},look:{wing:"high",tires:"std",body:16054008,accent:11737883,reg:"N172FS"}},{id:"duster",name:"🌾 CropHopper Duster",price:1500,desc:"Light low-wing workhorse. Leaps off short strips, cruises slow.",specs:{mass:720,wingArea:14,thrustMax:4300,CD0:.042,CLflap:.7,Vr:22},look:{wing:"low",tires:"std",hopper:!0,body:15913276,accent:2783786,reg:"N-DUST"}},{id:"falcon",name:"🚀 Falcon S Sport",price:3500,desc:"Fast and twitchy low-wing rocket. Not for beginners.",specs:{mass:800,wingArea:12,thrustMax:7800,CD0:.026,CL0:.2,Vr:30},look:{wing:"low",tires:"std",canopy:!0,body:14212320,accent:12720923,reg:"N-FAST"}},{id:"bush",name:"🏔️ Tundra King",price:2500,desc:"Big tires, huge flaps. Grass strips fear it.",specs:{mass:950,wingArea:17.5,CLflap:.75,CDflap:.11,thrustMax:5600,Vr:20,gearHeight:1.25},look:{wing:"high",tires:"tundra",body:3828538,accent:2236962,reg:"N-BUSH"}}],df=[{id:"aviator",name:"🧥 Aviator Jacket",price:0,colors:{shirt:3037756,pants:2764083,cap:15658734}},{id:"hawaiian",name:"🌺 Hawaiian Shirt",price:75,colors:{shirt:2005642,pants:12759680,cap:14201434}},{id:"parka",name:"🧣 Alpine Parka",price:120,colors:{shirt:14711328,pants:2767450,cap:12724778}},{id:"tux",name:"🤵 Tuxedo",price:200,colors:{shirt:1315860,pants:1315860,cap:1315860}},{id:"captain",name:"🧑‍✈️ Captain",price:350,colors:{shirt:1714778,pants:15263976,cap:16777215}}];function tS(){return{liftMul:Be.has("stol")?1.12:1,critBonus:Be.has("vg")?2*Math.PI/180:0,powerMul:Be.has("turbo")?1.12:1,rollDecel:Be.has("tundra")?.12:.3}}const wl=[{id:"binoculars",name:"🔭 Binoculars",price:150,desc:"Hold RIGHT MOUSE to zoom in flight."},{id:"paint-blue",name:"🎨 Ocean Blue paint",price:100,paint:2777026,desc:"Repaint your current plane."},{id:"paint-orange",name:"🎨 Sunset Orange paint",price:100,paint:14711328,desc:"Repaint your current plane."},{id:"paint-black",name:"🎨 Stealth Black paint",price:250,paint:2303531,desc:"Repaint your current plane. Spooky."},{id:"vg",name:"🌀 Vortex Generators",price:350,desc:"+2° stall angle. Forgiving wings."},{id:"stol",name:"🛬 STOL Kit",price:600,desc:"+12% lift. Short strips love it."},{id:"turbo",name:"⚡ Turbocharger",price:800,desc:"+12% engine power."},{id:"tundra",name:"🛞 Tundra Tires",price:250,desc:"Grass strips feel like pavement."},{id:"chute",name:"🪂 Parachute",price:300,desc:"Walk away from one crash. Rebuyable.",consumable:!0},{id:"spotlight",name:"💡 Landing Light Pro",price:200,desc:"A real spotlight for night ops."}];function nS(i={}){const{onPaint:e=()=>{},onAircraft:t=()=>{},onOutfit:n=()=>{}}=i,s=document.getElementById("shop"),r=document.getElementById("shop-items"),o=document.getElementById("shop-money");let a=!1;document.getElementById("shop-close")?.addEventListener("click",()=>p());const c=(g,_,u)=>{const m=document.createElement("button");return m.className="btn",m.textContent=g,m.disabled=!!_,_||(m.onclick=u),m},l=(g,_,u)=>{const m=document.createElement("div");m.className="shop-row",m.innerHTML=`<div><b>${g}</b><br><small>${_}</small></div>`,m.appendChild(u),r.appendChild(m)},h=g=>{const _=document.createElement("div");_.className="shop-sec",_.textContent=g,r.appendChild(_)};function f(){o.textContent="$"+Be.money,r.innerHTML="",h("✈️ AIRCRAFT — buying or selecting swaps your plane instantly");for(const g of _s){const _=Be.aircraft.has(g.id),u=Be.selected===g.id,m=u?' <span class="vtag">FLYING</span>':"";_?l(g.name+m,g.desc,c(u?"FLYING":"SELECT",u,()=>{t(g.id),f()})):l(g.name+m,`${g.desc} — <b>$${g.price}</b>`,c(`BUY $${g.price}`,Be.money<g.price,()=>{Be.spend(g.price)&&(Be.ownAircraft(g.id),t(g.id),f())}))}h("🔧 UPGRADES — apply to every plane you own");for(const g of wl.filter(_=>!_.paint))Be.has(g.id)&&!g.consumable?l(`${g.name} <span class="vtag">OWNED</span>`,g.desc,c("OWNED",!0)):l(g.name,`${g.desc} — <b>$${g.price}</b>`,c(`BUY $${g.price}`,Be.money<g.price,()=>{Be.spend(g.price)&&(Be.give(g.id),f())}));h(`🎨 PAINT — for your ${_s.find(g=>g.id===Be.selected)?.name||"plane"}`);for(const g of wl.filter(_=>_.paint)){const _=Be.has(g.id),u=Be.paintFor(Be.selected)===g.id;_?l(`${g.name}${u?' <span class="vtag">APPLIED</span>':""}`,g.desc,c(u?"ON":"APPLY",u,()=>{Be.setPaint(Be.selected,g.id),e(g.paint),f()})):l(g.name,`${g.desc} — <b>$${g.price}</b>`,c(`BUY $${g.price}`,Be.money<g.price,()=>{Be.spend(g.price)&&(Be.give(g.id),Be.setPaint(Be.selected,g.id),e(g.paint),f())}))}h("👕 PILOT OUTFITS — look sharp on foot");for(const g of df){const _=Be.outfits.has(g.id),u=Be.outfit===g.id;_?l(`${g.name}${u?' <span class="vtag">WORN</span>':""}`,"In your closet",c(u?"WORN":"WEAR",u,()=>{Be.wearOutfit(g.id),n(g.colors),f()})):l(g.name,`Strut around town — <b>$${g.price}</b>`,c(`BUY $${g.price}`,Be.money<g.price,()=>{Be.spend(g.price)&&(Be.ownOutfit(g.id),Be.wearOutfit(g.id),n(g.colors),f())}))}}function d(){a=!0,document.exitPointerLock?.(),s.classList.remove("hidden"),Be.money<150?yn.play("marta-job"):yn.play("shop-hi"),f()}function p(){a=!1,s.classList.add("hidden")}return{open:d,close:p,isOpen:()=>a,refresh:f}}const bl=[{id:"marta",name:"Say hello to Marta",hint:"Walk up to Marta by the hangars (E to talk)",reward:50},{id:"takeoff",name:"First Solo",hint:"Take off from any runway",reward:200},{id:"clouds",name:"Cloud Surfer",hint:"Climb above 3,000 ft",reward:150},{id:"coral",name:"Coral Hopper",hint:"Land on the Coral Strip (SE island)",reward:400},{id:"sights",name:"Sightseer",hint:"Discover 3 sights (follow blue beacons)",reward:300},{id:"grease",name:"Greaser",hint:"Land softer than 150 fpm",reward:350,item:"chute"},{id:"night",name:"Night Owl",hint:"Be airborne at night",reward:250},{id:"tour",name:"Three-Strip Tour",hint:"Land at all 3 airstrips",reward:800},{id:"balloon",name:"Balloon Chaser",hint:"Fly within 600 ft of a hot-air balloon",reward:300},{id:"far",name:"Long Haul",hint:"Fly 15 km from the home airport",reward:350},{id:"buzz",name:"Rooftop Buzz",hint:"Skim Harborview below 300 ft",reward:250},{id:"nightlanding",name:"Night Landing",hint:"Land after dark",reward:450},{id:"northstrip",name:"Mountain Goat",hint:"Land the lonely North Strip",reward:500},{id:"sights6",name:"Globetrotter",hint:"Discover 6 sights",reward:600},{id:"aerobat",name:"Aerobat",hint:"Bank past 60° in flight",reward:200},{id:"speed",name:"Speed Demon",hint:"Top 140 kt",reward:200},{id:"storm",name:"Storm Chaser",hint:"Fly in storm weather",reward:350},{id:"cartographer",name:"Cartographer",hint:"Discover 10 sights",reward:700},{id:"driver",name:"Sunday Driver",hint:"Drive 1 km around town",reward:250},{id:"dive",name:"Geronimo",hint:"Skydive out and walk away (J)",reward:400}];function iS(){const i=new Set(Mi("flightsim-quests",[])),e=new Set(Mi("flightsim-strips",[])),t=Object.fromEntries(bl.map(a=>[a.id,a]));let n=()=>{};function s(a){!a||i.has(a.id)||(i.add(a.id),Xn("flightsim-quests",[...i]),Be.add(a.reward),a.item&&!Be.has(a.item)&&Be.give(a.item),n(a))}function r(a,c={}){a==="marta"&&s(t.marta),a==="takeoff"&&s(t.takeoff),a==="alt"&&c.ft>3e3&&s(t.clouds),a==="touchdown"&&c.strip==="coral"&&s(t.coral),a==="sights"&&c.n>=3&&s(t.sights),a==="sights"&&c.n>=6&&s(t.sights6),a==="sights"&&c.n>=10&&s(t.cartographer),a==="balloon"&&s(t.balloon),a==="far"&&s(t.far),a==="buzz"&&s(t.buzz),a==="nightlanding"&&s(t.nightlanding),a==="northstrip"&&s(t.northstrip),a==="aerobat"&&s(t.aerobat),a==="speed"&&s(t.speed),a==="storm"&&s(t.storm),a==="driver"&&s(t.driver),a==="dive"&&s(t.dive),a==="touchdown"&&c.fpm!=null&&-c.fpm<150&&c.airborne&&s(t.grease),a==="nightair"&&s(t.night),a==="touchdown"&&c.strip&&(e.add(c.strip),Xn("flightsim-strips",[...e]),e.has("main")&&e.has("coral")&&e.has("north")&&s(t.tour))}function o(){return bl.find(a=>!i.has(a.id))}return{done:i,notify:r,next:o,onComplete:a=>n=a,strips:e}}function sS(i){const e=document.getElementById("dialogue");let t=!1;document.getElementById("dlg-close")?.addEventListener("click",()=>s());function n(){t=!0,document.exitPointerLock?.(),i.notify("marta"),yn.play(i.done.size>3?"marta-nice":"marta-hi");const r=i.next();document.getElementById("dlg-quests").innerHTML=bl.map(o=>`<div class="qrow ${i.done.has(o.id)?"qdone":""}">${i.done.has(o.id)?"✅":"◈"} <b>${o.name}</b> — $${o.reward}${o.item?" + 🎁":""}<br><small>${o.hint}</small></div>`).join(""),document.getElementById("dlg-next").innerHTML=r?`Next up: <b>${r.name}</b> — ${r.hint}`:"You're done, ace! All quests complete. 🏆",e.classList.remove("hidden")}function s(){t=!1,e.classList.add("hidden")}return{open:n,close:()=>{s(),yn.play("marta-bye",30)},isOpen:()=>t}}function rS(i){const e=document.getElementById("quest-tracker");e&&(i?(e.classList.remove("hidden"),e.innerHTML=i):e.classList.add("hidden"))}const Bi=18500,zi=150;function oS(i){return i<.5?[16,60,110]:i<2.5?[118,110,80]:i<45?[46,80,40]:i<150?[30,58,32]:i<260?[74,70,62]:[150,150,155]}function aS(){const i=document.createElement("div");i.id="minimap";const e=document.createElement("canvas");e.width=e.height=180,i.appendChild(e),document.body.appendChild(i);const t=e.getContext("2d"),n=document.createElement("canvas");n.width=n.height=zi;const s=n.getContext("2d"),r=s.createImageData(zi,zi);for(let d=0;d<zi;d++)for(let p=0;p<zi;p++){const g=(p+.5)/zi*2*Bi-Bi,_=(d+.5)/zi*2*Bi-Bi,[u,m,y]=oS(ke(g,_)),x=(d*zi+p)*4;r.data[x]=u,r.data[x+1]=m,r.data[x+2]=y,r.data[x+3]=255}s.putImageData(r,0,0);let o=!1,a=!1;i.addEventListener("click",()=>{o=!o,i.classList.toggle("big",o),e.width=e.height=o?300:180});const c=(d,p,g)=>[(d+Bi)/(2*Bi)*g,(p+Bi)/(2*Bi)*g];let l=1;function h(d,p){if(l+=p,l<.12||a)return;l=0;const g=e.width;t.clearRect(0,0,g,g),t.save(),t.beginPath(),t.arc(g/2,g/2,g/2,0,7),t.clip(),t.drawImage(n,0,0,g,g),t.strokeStyle="#fff",t.lineWidth=o?3:2;const _=(x,M,A,S)=>{const[b,T]=c(x,M-A,g),[L,v]=c(x,M+A,g);t.beginPath(),t.moveTo(b,T),t.lineTo(L,v),t.stroke()};_(0,0,wt.halfLen),_(Ut.x,Ut.z,Ut.halfLen),_(Wt.x,Wt.z,Wt.halfLen),gs.forEach((x,M)=>{const[A,S]=c(x.x,x.z,g),b=d.sightsFound&&d.sightsFound.has(M);t.fillStyle=b?"rgba(160,170,190,.7)":"#ffcf4d",t.beginPath(),t.arc(A,S,o?5:3.5,0,7),t.fill(),b||(t.strokeStyle="rgba(255,207,77,.5)",t.beginPath(),t.arc(A,S,o?9:6.5,0,7),t.stroke())});const[u,m]=c(d.x,d.z,g);t.save(),t.translate(u,m),t.rotate((d.hdgDeg||0)*Math.PI/180),t.fillStyle=d.onFoot?"#7dff9a":"#fff",t.strokeStyle="#000",t.lineWidth=2;const y=o?11:8;t.beginPath(),t.moveTo(0,-y),t.lineTo(y*.7,y*.8),t.lineTo(0,y*.35),t.lineTo(-y*.7,y*.8),t.closePath(),t.fill(),t.stroke(),t.restore(),t.fillStyle="#fff",t.font=`bold ${o?16:12}px monospace`,t.textAlign="center",t.fillText("N",g/2,o?18:14),t.restore(),t.strokeStyle="rgba(140,190,255,.6)",t.lineWidth=3,t.beginPath(),t.arc(g/2,g/2,g/2-1.5,0,7),t.stroke()}function f(d){a=d,i.style.display=d?"none":"block"}return{update:h,setHidden:f,isHidden:()=>a}}const Go=1400,In=130;function cS(i){const e=new Float32Array(Go*3),t=new Float32Array(Go);for(let c=0;c<Go;c++)e[c*3]=(Math.random()-.5)*In,e[c*3+1]=Math.random()*In,e[c*3+2]=(Math.random()-.5)*In,t[c]=28+Math.random()*22;const n=new Ot;n.setAttribute("position",new qt(e,3));const s=new ya({color:11191517,size:.32,transparent:!0,opacity:.55,depthWrite:!1}),r=new Xl(n,s);r.frustumCulled=!1,r.visible=!1,i.add(r);function o(c,l,h,f,d=!1){e[c*3]=l+(Math.random()-.5)*In,e[c*3+1]=d?h+In/2:h+(Math.random()-.5)*In,e[c*3+2]=f+(Math.random()-.5)*In}function a(c,l,h){if(!h){r.visible=!1;return}r.visible=!0,s.opacity=h===2?.7:.45;const f=l.x,d=l.y,p=l.z,g=h===2?1.5:1;for(let _=0;_<Go;_++){let u=e[_*3+1]-t[_]*g*c;u<d-In/2?o(_,f,d,p,!0):(Math.abs(e[_*3]-f)>In&&(e[_*3]=f+(Math.random()-.5)*In),Math.abs(e[_*3+2]-p)>In&&(e[_*3+2]=p+(Math.random()-.5)*In),e[_*3+1]=u)}n.attributes.position.needsUpdate=!0}return{update:a}}class lS extends Jv{constructor(e){super(e),this.type=bi}parse(e){const o=function(T,L){switch(T){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(L||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(L||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(L||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(L||""))}},h=`
`,f=function(T,L,v){L=L||1024;let F=T.pos,U=-1,N=0,z="",D=String.fromCharCode.apply(null,new Uint16Array(T.subarray(F,F+128)));for(;0>(U=D.indexOf(h))&&N<L&&F<T.byteLength;)z+=D,N+=D.length,F+=128,D+=String.fromCharCode.apply(null,new Uint16Array(T.subarray(F,F+128)));return-1<U?(T.pos+=N+U+1,z+D.slice(0,U)):!1},d=function(T){const L=/^#\?(\S+)/,v=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,w=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,F=/^\s*FORMAT=(\S+)\s*$/,U=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,N={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let z,D;for((T.pos>=T.byteLength||!(z=f(T)))&&o(1,"no header found"),(D=z.match(L))||o(3,"bad initial token"),N.valid|=1,N.programtype=D[1],N.string+=z+`
`;z=f(T),z!==!1;){if(N.string+=z+`
`,z.charAt(0)==="#"){N.comments+=z+`
`;continue}if((D=z.match(v))&&(N.gamma=parseFloat(D[1])),(D=z.match(w))&&(N.exposure=parseFloat(D[1])),(D=z.match(F))&&(N.valid|=2,N.format=D[1]),(D=z.match(U))&&(N.valid|=4,N.height=parseInt(D[1],10),N.width=parseInt(D[2],10)),N.valid&2&&N.valid&4)break}return N.valid&2||o(3,"missing format specifier"),N.valid&4||o(3,"missing image size specifier"),N},p=function(T,L,v){const w=L;if(w<8||w>32767||T[0]!==2||T[1]!==2||T[2]&128)return new Uint8Array(T);w!==(T[2]<<8|T[3])&&o(3,"wrong scanline width");const F=new Uint8Array(4*L*v);F.length||o(4,"unable to allocate buffer space");let U=0,N=0;const z=4*w,D=new Uint8Array(4),X=new Uint8Array(z);let V=v;for(;V>0&&N<T.byteLength;){N+4>T.byteLength&&o(1),D[0]=T[N++],D[1]=T[N++],D[2]=T[N++],D[3]=T[N++],(D[0]!=2||D[1]!=2||(D[2]<<8|D[3])!=w)&&o(3,"bad rgbe scanline format");let te=0,oe;for(;te<z&&N<T.byteLength;){oe=T[N++];const Le=oe>128;if(Le&&(oe-=128),(oe===0||te+oe>z)&&o(3,"bad scanline data"),Le){const Ce=T[N++];for(let q=0;q<oe;q++)X[te++]=Ce}else X.set(T.subarray(N,N+oe),te),te+=oe,N+=oe}const ce=w;for(let Le=0;Le<ce;Le++){let Ce=0;F[U]=X[Le+Ce],Ce+=w,F[U+1]=X[Le+Ce],Ce+=w,F[U+2]=X[Le+Ce],Ce+=w,F[U+3]=X[Le+Ce],U+=4}V--}return F},g=function(T,L,v,w){const F=T[L+3],U=Math.pow(2,F-128)/255;v[w+0]=T[L+0]*U,v[w+1]=T[L+1]*U,v[w+2]=T[L+2]*U,v[w+3]=1},_=function(T,L,v,w){const F=T[L+3],U=Math.pow(2,F-128)/255;v[w+0]=uo.toHalfFloat(Math.min(T[L+0]*U,65504)),v[w+1]=uo.toHalfFloat(Math.min(T[L+1]*U,65504)),v[w+2]=uo.toHalfFloat(Math.min(T[L+2]*U,65504)),v[w+3]=uo.toHalfFloat(1)},u=new Uint8Array(e);u.pos=0;const m=d(u),y=m.width,x=m.height,M=p(u.subarray(u.pos),y,x);let A,S,b;switch(this.type){case vn:b=M.length/4;const T=new Float32Array(b*4);for(let v=0;v<b;v++)g(M,v*4,T,v*4);A=T,S=vn;break;case bi:b=M.length/4;const L=new Uint16Array(b*4);for(let v=0;v<b;v++)_(M,v*4,L,v*4);A=L,S=bi;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:y,height:x,data:A,header:m.string,gamma:m.gamma,exposure:m.exposure,type:S}}setDataType(e){return this.type=e,this}load(e,t,n,s){function r(o,a){switch(o.type){case vn:case bi:o.colorSpace=Kt,o.minFilter=Xt,o.magFilter=Xt,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,r,n,s)}}const Si=1.94384,Kn=3.28084,Wo=196.85,qn=(i,e,t)=>Math.max(e,Math.min(t,i)),hS=document.getElementById("app"),Jn=new Jx({antialias:!0});Jn.setSize(innerWidth,innerHeight);Jn.setPixelRatio(Math.min(devicePixelRatio,2));Jn.shadowMap.enabled=!0;Jn.shadowMap.type=cd;Jn.toneMapping=hd;Jn.toneMappingExposure=.75;hS.appendChild(Jn.domElement);const Mn=new Qx,_t=new ln(60,innerWidth/innerHeight,.3,15e4),{sunLight:Js,hemi:uS,skyUni:dS,update:Xo,sightFound:ff,balloons:fS,nightGlows:pS,nightMats:mS,roadLoops:gS}=Ly(Mn);new lS().load("hdri/sky_1k.hdr",i=>{try{const e=new dl(Jn);Mn.environment=e.fromEquirectangular(i).texture,"environmentIntensity"in Mn&&(Mn.environmentIntensity=.5),i.dispose(),e.dispose()}catch{}});addEventListener("resize",()=>{_t.aspect=innerWidth/innerHeight,_t.updateProjectionMatrix(),Jn.setSize(innerWidth,innerHeight)});const si=new Set;try{for(const i of JSON.parse(localStorage.getItem("flightsim-sights")||"[]"))gs[i]&&(si.add(i),ff(i))}catch{}let _S=0,pf=!0;function xS(){gs.forEach((i,e)=>{if(!si.has(e)&&Math.hypot(pe.x-i.x,pe.z-i.z)<i.r){si.add(e),ff(e);try{localStorage.setItem("flightsim-sights",JSON.stringify([...si]))}catch{}et(`📍 Discovered: ${i.name} — ${i.blurb} (${si.size}/${gs.length})`,4200)}})}const pt=OM(),$n=BM();let th="free",zn=!1;const xn=KM(Mn,Jn,Js,uS,dS,pS,pt.settings,mS),Nr=ZM(Mn,gS),bt=JM(Mn,_t),Gt=iS(),nh=sS(Gt);function mf(i){const e=i===2303531;$t.setPaint(e?i:16054008,e?987411:i)}function gf(){const i=_s.find(t=>t.id===Be.selected)||_s[0],e=wl.find(t=>t.id===Be.paintFor(i.id));e?.paint?mf(e.paint):$t.setPaint(i.look.body,i.look.accent)}async function vS(i,e=!1){const t=_s.find(n=>n.id===i);!t||!Be.aircraft.has(i)||(sf(t.specs),Be.selectAircraft(i),Mn.remove($t.root),$t=await lf(Mn,{look:t.look,useGLB:i==="skyhawk"}),Tf.mount($t.dashAnchor),$t.root.add(dr),$t.root.add(Jr),dr.position.set(-1.8,t.look.wing==="high"?1.5:-.02,-1.1),Jr.position.set(-1.8,-30,-220),gf(),$t.setState({pos:pe,quat:Dt}),e||et(`✈️ Now flying: ${t.name}`))}const pa=nS({onPaint:i=>mf(i),onAircraft:i=>vS(i),onOutfit:i=>bt.setOutfit(i)});Gt.onComplete(i=>{et(`✅ Quest complete: ${i.name} (+$${i.reward})${i.item?" + 🎁 gift!":""}`,4200),yn.play("marta-cash",15),_f()});function _f(){const i=Gt.next();rS(i?`◈ ${i.name} <small>${i.hint}</small>`:"🏆 All quests complete!")}_f();{const i=document.getElementById("mute-btn"),e=()=>{i&&(i.firstChild.textContent=yn.muted?"🔇 ":"🔊 ")};e(),i?.addEventListener("click",()=>{yn.toggle(),e()})}const dr=new tf(16774872,0,900,.32,.5,1.2),Jr=new xt;let ih=!1;addEventListener("contextmenu",i=>i.preventDefault());addEventListener("mousedown",i=>{i.button===2&&(ih=!0)});addEventListener("mouseup",i=>{i.button===2&&(ih=!1)});const pe=new I,Ct=new I,Dt=new pn,Dn=new I;let ei=0,cn=!1,An=!1,El=!1,ia="",Qs=0;const xf=["CHASE","COCKPIT","TOWER"],yS=new I(45,wt.elev+14,wt.halfLen+120),We=Xy(pt.settings);function sh(i){i==="final"?(pe.set(0,wt.elev+305,-6156),Dt.setFromAxisAngle(new I(0,1,0),Math.PI),Ct.set(0,-2.5,33),We.st.throttle=.3,We.st.flapIdx=3,We.st.gearDown=!0,We.st.trim=.1):(pe.set(0,wt.elev+ht.gearHeight+.02,480),Ct.set(0,0,0),Dt.identity(),We.st.throttle=0,We.st.pitch=0,We.st.roll=0,We.st.flapIdx=0,We.st.gearDown=!0,We.st.trim=0),ei=We.st.throttle,Dn.set(0,0,0),cn=i==="final",An=!1,El=!1,ia=""}function eo(){Sf(),Tl(),sh(th==="landing"?"final":"runway")}function vf(){Qs=(Qs+1)%3,et("Camera: "+xf[Qs])}function rh(){zn?At?wf():bt.pos.distanceTo(pe)<9?(zn=!1,bt.hide(),xs(),et("Back in the cockpit — have fun!")):et("Too far from the plane — walk back to it (K)"):pf&&Ct.length()<3?(zn=!0,We.st.throttle=0,bt.place(pe.x+4,pe.y,pe.z+2,Math.atan2(Un.x,Un.z)+Math.PI),xs(),et("On foot — WASD / stick to walk · E shop/talk · K back to plane",3600)):et("Slow down and stop on the ground first!")}function yf(){if(At){wf();return}const i=Nr.nearestCar(bt.pos.x,bt.pos.z);if(i){SS(i);return}const e=Math.hypot(bt.pos.x-ua.x,bt.pos.z-ua.z),t=Math.hypot(bt.pos.x-Hi.x,bt.pos.z-Hi.z);e<10?pa.open():t<8?nh.openMarta():et("Nothing to interact with here — find a car, the blue-roof Pilot Shop or Marta")}let At=null,Nt=0,qs=0,td=0;const _n=fa({shirt:14711328,pants:2764083,cap:14711328});_n.group.visible=!1;Mn.add(_n.group);const Fe={active:!1,vel:new I,hx:0,hz:-1,deployed:!1,hint:""};function Mf(){if(Fe.active||zn||An)return;const i=ke(pe.x,pe.z);if(!cn||pe.y-i<60){et("Too low to jump! Climb first.");return}Fe.active=!0,Fe.deployed=!1,Fe.vel.copy(Ct);const e=Math.hypot(Un.x,Un.z)||1;Fe.hx=Un.x/e,Fe.hz=Un.z/e,_n.group.position.copy(pe),_n.group.visible=!0,Be.has("chute")?et("GERONIMO! Canopy opens at 400 ft — steer with the mouse.",3600):et("No parachute!! This will hurt. (Buy one at the shop.)",3600)}function Tl(){Fe.active=!1,_n.group.visible=!1}function MS(i){const e=_n.group.position,t=ke(e.x,e.z),n=e.y-t,s=Be.has("chute");!Fe.deployed&&s&&n<122&&Fe.vel.y<0&&(Fe.deployed=!0,Fe.vel.multiplyScalar(.25),et("🪂 CANOPY OUT — steer to a landing!",3e3));const r=Fe.deployed?-5.5:-52;Fe.vel.y+=(r-Fe.vel.y)*Math.min(1,(Fe.deployed?1.6:.8)*i);const o=Fe.deployed?9:12,a=-Fe.hz,c=Fe.hx,l=Fe.hx*(Fe.pitch||0)*o+a*(Fe.roll||0)*o+windVec.x*.3,h=Fe.hz*(Fe.pitch||0)*o+c*(Fe.roll||0)*o+windVec.z*.3;Fe.vel.x+=(l-Fe.vel.x)*Math.min(1,2*i),Fe.vel.z+=(h-Fe.vel.z)*Math.min(1,2*i),e.x+=Fe.vel.x*i,e.y+=Fe.vel.y*i,e.z+=Fe.vel.z*i;const f=Fe.deployed?.15:1.25;if(_n.armL.rotation.z=f,_n.armR.rotation.z=-f,_n.legL.rotation.z=f*.3,_n.legR.rotation.z=-f*.3,_n.armL.rotation.x=_n.armR.rotation.x=0,_n.group.rotation.y=Math.atan2(Fe.hx,Fe.hz),e.y<=t+.2){if(t<.5||!Fe.deployed&&Fe.vel.y<-15){Tl(),et(t<.5?"💦 Splashdown! Back in the plane (R).":"💥 Should have bought the chute! (R)",3600),eo();return}Tl(),zn=!0,We.st.throttle=0,bt.place(e.x,e.y,e.z,Math.atan2(Fe.hx,Fe.hz)),xs(),Gt.notify("dive"),et("🦶 Touchdown! That was epic. Walk it off.",3600);return}Fe.hint=Fe.deployed?`Canopy out — steer to landing (${Math.round(n*Kn)} ft)`:`FREEFALL — canopy at 400 ft (${Math.round(n*Kn)} ft)`,Rn.set(e.x-Fe.hx*11,e.y+4,e.z-Fe.hz*11),Xi.lerp(Rn,1-Math.pow(.001,i)),qi.set(e.x+Fe.hx*8,e.y,e.z+Fe.hz*8),_t.position.copy(Xi),_t.lookAt(qi)}function Sf(){At&&(At.taken=!1),At=null,Nt=0}function SS(i){At=i,i.taken=!0,Nt=0,qs=i.g.rotation.y,bt.hide(),et("Driving! WASD steer · E/K hop out",3e3)}function wf(){if(!At)return;const i=At.g.position;At.taken=!1;let e=0,t=1e9;At.loop.forEach((n,s)=>{const r=Math.hypot(n.x-i.x,n.z-i.z);r<t&&(t=r,e=s)}),At.seg=e,bt.place(i.x+2.5,i.y,i.z,qs),At=null,Nt=0}const Lr=new I;function wS(i){const e=Ve.mode==="walk"&&Ve.stickOn,t=We.keys.has("KeyW")||e&&Ve.stickY>.25,n=We.keys.has("KeyS")||e&&Ve.stickY<-.25,s=We.keys.has("KeyA")||e&&Ve.stickX<-.25,r=We.keys.has("KeyD")||e&&Ve.stickX>.25,o=We.keys.has("ShiftLeft")||We.keys.has("ShiftRight")||Ve.run;t&&(Nt+=9*i),n&&(Nt-=(Nt>1?14:7)*i),Nt-=Nt*.6*i,Nt=qn(Nt,-7,o?34:26);const a=((s?1:0)-(r?1:0))*qn(1.5/(1+Math.abs(Nt)*.09),.35,1.5);qs+=a*i*Math.sign(Nt)*Math.min(1,Math.abs(Nt)/3);const c=At.g.position;Lr.set(Math.sin(qs),0,Math.cos(qs)),c.x+=Lr.x*Nt*i,c.z+=Lr.z*Nt*i;const l=ke(c.x,c.z);c.y=l<0?.4:l+.15,l<0&&(Nt*=Math.max(0,1-2*i)),At.g.rotation.y=qs;for(const h of At.wheels)h.rotation.x+=Nt*i/.42;td+=Math.abs(Nt)*i,td>1e3&&Gt.notify("driver"),Rn.copy(c).addScaledVector(Lr,-10).add(Ur.set(0,4.2,0)),Xi.lerp(Rn,1-Math.pow(.001,i)),qi.copy(c).addScaledVector(Lr,9),_t.position.copy(Xi),_t.lookAt(qi)}const bf=NM(),Ef=UM(),er=aS(),bS=cS(Mn),ma=_s.find(i=>i.id===Be.selected&&Be.aircraft.has(i.id))||_s[0];sf(ma.specs);let $t=await lf(Mn,{look:ma.look,useGLB:ma.id==="skyhawk"});const Tf=kM($t.dashAnchor);$t.root.add(dr);dr.position.set(-1.8,ma.look.wing==="high"?1.5:-.02,-1.1);Jr.position.set(-1.8,-30,-220);$t.root.add(Jr);dr.target=Jr;gf();{const i=df.find(e=>e.id===Be.outfit);i&&bt.setOutfit(i.colors)}sh("runway");$t.setState({pos:pe,quat:Dt});pt.show("home");pt.onFly(i=>{th=i,zn=!1,bt.hide(),xn.reset(),eo(),xs(),pt.setHelpVisible(!1),i==="takeoff"?($n.start("takeoff"),et("Lesson 1: follow the instructor (bottom). Press H for controls.")):i==="landing"?($n.start("landing"),yn.play("atc-land"),et("Lesson 2: you are on final — fly 65 kt to the threshold.")):($n.stop(),pt.setInstructor(null),yn.play("atc-wind"),et("Full throttle (W), rotate at 55 kt — good luck!"))});pt.onQuitToMenu(()=>{$n.stop(),pt.setInstructor(null),zn=!1,bt.hide(),Sf(),sh("runway"),$t.setState({pos:pe,quat:Dt}),xs()});document.addEventListener("flightsim-restart",()=>{zn=!1,bt.hide(),eo(),xs(),et("Flight restarted")});document.addEventListener("flightsim-tut-skip",()=>{$n.stop(),pt.setInstructor(null)});const Un=new I,Ur=new I,nd=new I,Rn=new I,id=new I,ki=new I,sd=new pn,Mt=new Sn,Xi=new I(0,30,520),qi=new I,ES=new I;document.addEventListener("pointerlockchange",()=>{const i=document.pointerLockElement===document.body,e=!document.getElementById("menu").classList.contains("hidden");if(!i&&!e&&!pt.isPaused()){if(typeof pa<"u"&&(pa.isOpen()||nh.isOpen()))return;Al&&pt.setPaused(!0)}});let Al=!1;function TS(i,e){return(Math.abs(ke(i+6,e)-ke(i-6,e))+Math.abs(ke(i,e+6)-ke(i,e-6)))/(2*6)}function AS(i,e){const t=(pt.settings.windKt||0)*.514444,n=Math.sin(i*.23)*t*.25+Math.sin(i*1.1)*t*.08;e.set(Math.sin(i*.17)*1,0,t+n);const s=yy(i,pt.settings.turbulence);return s&&(e.x+=s.x,e.y+=s.y,e.z+=s.z),{out:e,g:s}}function RS(i,e){const t=We.poll(i);We.consumeReset()&&(eo(),et(th==="landing"?"Reset on final approach":"Reset on Runway 36")),We.consumeCam()&&vf(),We.consumeHelp()&&pt.setHelpVisible(!pt.isHelpVisible()),We.consumePause()&&pt.setPaused(!pt.isPaused()),We.consumeTutorialAdvance()&&$n.active()&&document.dispatchEvent(new CustomEvent("flightsim-tut-next")),We.consumeMap()&&er.setHidden(!er.isHidden()),We.consumeSkydive()&&Mf(),Fe.active&&(Fe.pitch=t.pitch,Fe.roll=t.roll,t.pitch=0,t.roll=0,t.yaw=0,t.brakes=!1),We.consumeWalk()&&rh();const n=ke(pe.x,pe.z),s=pe.y-ht.gearHeight-n,r=s<=.02;ei+=(t.throttle-ei)*Math.min(1,i*1.4),Un.set(0,0,-1).applyQuaternion(Dt),Ur.set(0,1,0).applyQuaternion(Dt),nd.set(1,0,0).applyQuaternion(Dt),sd.copy(Dt).invert();const{out:o,g:a}=AS(e,ES);Rn.copy(Ct).sub(o),id.copy(Rn).applyQuaternion(sd);const c=My(t.flapIdx),l=Math.max(0,pe.y),h=tS(),f=Ve.enabled;f&&(h.critBonus+=3*Math.PI/180);const d=gy(id,t.throttle,c,t.gearDown,l,h);ki.set(0,0,0);const p=d.V;if(p>.5){Rn.copy(Ct).sub(o).normalize();let te=d.drag,oe=d.lift;if(s<ht.wingSpan&&s>-2){const Ce=1-qn(s/ht.wingSpan,0,1);oe*=1+.1*Ce,te*=1-.25*Ce}ki.addScaledVector(Rn,-te);const ce=Ur.dot(Rn),Le=Ur.clone().addScaledVector(Rn,-ce).normalize();ki.addScaledVector(Le,oe),ki.addScaledVector(nd,-d.beta*d.q*ht.wingArea*.9)}ki.addScaledVector(Un,_y(ei,p,l,h.powerMul)),ki.y-=ht.mass*9.81,An&&ki.multiplyScalar(.05),Ct.addScaledVector(ki,i/ht.mass),pe.addScaledVector(Ct,i);const _=.35+.65*(qn(d.q/150,0,1)*(An?.2:1)),u=qn(t.pitch+t.trim*.6,-1,1);Mt.setFromQuaternion(Dt,"YXZ");const m=r?.3:1;let y=u*1.4*_,x=(-t.yaw*.9-d.beta*1.1*m+t.roll*(f?-.5:.28))*_,M=(-t.roll*(f?2:2.4)+qn(-Mt.z*(f?.9:.5),f?-.6:-.35,f?.6:.35))*_;const A=pt.settings.realism?f?.35:1:.25,S=xy(ei,p,d.alpha);x+=S.yawRate*_*m*A,M-=S.rollRate*_*(r?.4:A),a&&(M+=a.roll*_),d.stalled&&(M+=Math.sin(e*13)*(f?.4:.9),y+=-.9*_),d.stalled&&!od&&cn&&yn.play("les-stall",90),od=d.stalled;const b=d.stalled?1.6:2.6;Dn.x+=(y-Dn.x)*Math.min(1,b*i),Dn.y+=(x-Dn.y)*Math.min(1,2.2*i),Dn.z+=(M-Dn.z)*Math.min(1,b*i);const T=Dn.length();if(T>1e-6){const te=new pn().setFromAxisAngle(Rn.set(Dn.x,Dn.y,Dn.z).normalize(),T*i);Dt.multiply(te).normalize()}Mt.setFromQuaternion(Dt,"YXZ"),Mt.x=qn(Mt.x,-1.2,1.2);const L=ke(pe.x,pe.z),v=pe.y-ht.gearHeight;let w=!1;if(v<=L){pe.y=L+ht.gearHeight;const te=Ct.y,oe=Math.abs(Un.dot(Ct));if(cn&&(w=!0),(!r||!cn)&&cn){const Te=te*Wo,De=Math.abs(Mt.z),He=Math.abs(pe.x)<80&&Math.abs(pe.z)<wt.halfLen+120?"main":Math.abs(pe.x-Ut.x)<170&&Math.abs(pe.z-Ut.z)<Ut.halfLen+120?"coral":Math.abs(pe.x-Wt.x)<170&&Math.abs(pe.z-Wt.z)<Wt.halfLen+120?"north":null,J=TS(pe.x,pe.z)>.28,R=Ve.enabled,$=R?-11:-8,ne=R?.6:.45;if(te<$||De>ne||J)Be.has("chute")&&cn&&!J?(Be.take("chute"),Ct.multiplyScalar(.15),et("🪂 Parachute saved you! Buy another at the Pilot Shop.",4200)):(An=!0,We.st.throttle=0,Tc(pe),et(J?"💥 Into the mountainside — press R":`💥 CRASHED (${Math.round(-Te)} fpm) — press R`));else{const K=-Te;K<=60?et("🧈 GREASED IT! A+  — textbook touchdown"):K<=120?et(`🥇 Excellent landing (${Math.round(K)} fpm) — A`):K<=200?et(`🥈 Good landing (${Math.round(K)} fpm) — B`):K<=300?et(`🥉 Acceptable (${Math.round(K)} fpm) — C`):K<=400?et(`✓ Nice landing (${Math.round(K)} fpm)`):et(`Hard landing (${Math.round(K)} fpm) — flare earlier next time`),yn.play("atc-grease"),Gt.notify("touchdown",{strip:He,fpm:Te,airborne:!0}),xn.isNight()&&Gt.notify("nightlanding"),He==="north"&&Gt.notify("northstrip")}}te<0&&(Ct.y=0);const ce=Ct.x,Le=Ct.z,Ce=Math.hypot(ce,Le);if(Ce>.01){const Te=t.brakes?4.5:h.rollDecel,De=Math.min(Ce,Te*i);Ct.x-=ce/Ce*De,Ct.z-=Le/Ce*De}const q=t.yaw*qn(oe/12,0,1)*1.4,re=new pn().setFromAxisAngle(Ur,-q*i);Dt.premultiply(re).normalize(),Mt.setFromQuaternion(Dt,"YXZ"),oe>ht.Vr&&u>.1?(Mt.x=qn(Mt.x,-.05,.22),Mt.z=qn(Mt.z,-.1,.1),Dt.setFromEuler(Mt)):(Mt.x+=(0-Mt.x)*Math.min(1,6*i),Mt.z+=(0-Mt.z)*Math.min(1,6*i),Dt.setFromEuler(Mt),Dn.multiplyScalar(Math.max(0,1-8*i)));const ue=p*Si,Ne=Math.round(ht.Vr*Si);r&&t.throttle<.2&&(bc=!1),r&&!bc&&ue>20&&t.throttle>.9&&(bc=!0,yn.play("atc-takeoff")),!El&&ue>=Ne&&t.throttle>.8&&(El=!0,et(`Rotate! (Vr ${Ne} kt)`)),cn=!1}else pe.y-L>5&&!cn&&(cn=!0,Gt.notify("takeoff")),pe.y*Kn>3e3&&Gt.notify("alt",{ft:pe.y*Kn}),cn&&xn.isNight()&&Gt.notify("nightair"),pe.y<.3&&L<-2&&(An||(Be.has("chute")&&cn?(Be.take("chute"),Ct.multiplyScalar(.15),pe.y=2,et("🪂 Parachute saved you! Buy another at the Pilot Shop.",4200)):(An=!0,We.st.throttle=0,Tc(pe),et("💥 Ditched in the ocean — press R"))),An&&(pe.y=.3,Ct.multiplyScalar(.9)));pe.y<L+.5&&!(v<=L)&&(An||(Be.has("chute")&&cn?(Be.take("chute"),Ct.multiplyScalar(.15),pe.y=L+30,et("🪂 Parachute saved you! Buy another at the Pilot Shop.",4200)):(An=!0,We.st.throttle=0,Tc(pe),et("💥 Terrain strike — press R")))),$t.setState({pos:pe,quat:Dt}),$t.animate({roll:t.roll,pitch:u,yaw:t.yaw,flapFrac:c,gearDown:t.gearDown,rpm01:ei},i,e);const F=Js.userData.dir||xn.sunDir;if(Js.position.set(pe.x+F.x*2800,pe.y+Math.max(400,F.y*2800),pe.z+F.z*2800),Js.target.position.copy(pe),dr.intensity=Be.has("spotlight")&&(xn.isNight()||r)?900:0,Fe.active&&MS(i),Qs===0&&!Fe.active)Rn.set(0,3.4,10.5).applyQuaternion(Dt).add(pe),Xi.lerp(Rn,1-Math.pow(1e-4,i)),qi.copy(pe).addScaledVector(Un,12),_t.position.copy(Xi),_t.lookAt(qi);else if(Qs===1){const te=$t.pilotEye().applyQuaternion(Dt).add(pe);_t.position.copy(te),qi.copy(te).addScaledVector(Un,50),_t.lookAt(qi),_t.rotation.z+=-t.roll*.06,Xi.copy(_t.position)}else _t.position.lerp(yS,1-Math.pow(.01,i)),_t.lookAt(pe),Xi.copy(_t.position);const U=ih&&Be.has("binoculars")?16:60;Math.abs(_t.fov-U)>.2&&(_t.fov+=(U-_t.fov)*Math.min(1,8*i),_t.updateProjectionMatrix());const N=vy(p,c);let z="";N.includes("vne")?z="⚠ VNE — REDUCE SPEED":N.includes("vno")?z="CAUTION: ABOVE Vno (129 kt)":N.includes("flap-overspeed")&&(z="⚠ FLAP OVERSPEED (Vfe 85 kt)"),z&&z!==ia&&(et(z),ia=z),z||(ia=""),Mt.setFromQuaternion(Dt,"YXZ");const D=(Mt.y*-180/Math.PI%360+360)%360,X=p*Si;let V="";if(!$n.active()&&!An&&(r&&t.throttle<.5&&X<10?V="Hold W for full takeoff power":r&&X<ht.Vr*Si?V=`Accelerating… rotate at ${Math.round(ht.Vr*Si)} kt`:r?V="ROTATE — ease the mouse UP ⬆":d.stalled&&(V="STALL — push mouse DOWN, full power!")),bf.update({iasKt:Fe.active?Fe.vel.length()*Si:X,altFt:Fe.active?_n.group.position.y*Kn:pe.y*Kn,vsiFpm:Fe.active?Fe.vel.y*Wo:Ct.y*Wo,hdgDeg:D===0&&Un.z<0?0:D,throttle:t.throttle,rpm:700+ei*2e3,flapDeg:Hr[t.flapIdx],gearDown:t.gearDown,trim:t.trim,aoaDeg:d.alpha*180/Math.PI,aglFt:Math.max(0,pe.y-ht.gearHeight-L)*Kn,windKt:o.length()*Si,cam:xf[Qs],pitchDeg:Mt.x*180/Math.PI,rollDeg:-Mt.z*180/Math.PI,stalled:d.stalled,overspeed:z,hint:Fe.active?Fe.hint:V,sights:`${si.size}/${gs.length}`,money:"$"+Be.money,clock:xn.icon()+" "+xn.clock()}),Ef.update(ei,qn(p/70,0,1),d.stalled),Hs.copy(o),pf=r,_S++%30===0&&!An&&(xS(),Gt.notify("sights",{n:si.size}),cn)){for(const oe of fS){const ce=pe.x-oe.x,Le=pe.y-oe.y,Ce=pe.z-oe.z;if(ce*ce+Le*Le+Ce*Ce<200*200){Gt.notify("balloon");break}}Math.hypot(pe.x,pe.z)>15e3&&Gt.notify("far"),Math.abs(Mt.z)>60*Math.PI/180&&Gt.notify("aerobat"),X>140&&Gt.notify("speed"),(pt.settings.weather||0)===2&&Gt.notify("storm"),Math.hypot(pe.x+330,pe.z-860)<400&&(pe.y-ht.gearHeight-L)*Kn<300&&Gt.notify("buzz")}if(en.iasKt=X,en.altFt=pe.y*Kn,en.vsiFpm=Ct.y*Wo,en.hdgDeg=D,en.pitchDeg=Mt.x*180/Math.PI,en.rollDeg=-Mt.z*180/Math.PI,en.betaDeg=d.beta*180/Math.PI,en.rpm=700+ei*2e3,en.throttle=t.throttle,en.flapDeg=Hr[t.flapIdx],en.gearDown=t.gearDown,en.stalled=d.stalled,en.trim=t.trim,en.pitchIn=u,en.rollIn=t.roll,$n.active()||(wc=""),$n.active()){const te=$n.update({iasKt:X,aglFt:Math.max(0,pe.y-ht.gearHeight-L)*Kn,throttle:t.throttle,rpm:700+ei*2e3,flapDeg:Hr[t.flapIdx],onGround:r,airborne:cn,hdgDeg:D,touchedDown:w,crashed:An});if(te){pt.setInstructor(te.html);const oe=te.lesson+":"+te.step;if(oe!==wc){wc=oe;const ce=CS[oe];ce&&yn.play(ce)}te.finished&&($n.stop(),setTimeout(()=>pt.setInstructor(null),8e3))}}er.update({x:pe.x,z:pe.z,hdgDeg:D,sightsFound:si,onFoot:!1},i)}let rd=performance.now()/1e3,qo=0,Qn=0;const Hs=new I(-2,0,1.5),en={};let Ko=.6,tr=0;const CS={"takeoff:2":"les-rotate","takeoff:3":"les-climb","takeoff:4":"les-flaps","landing:0":"les-final","landing:2":"les-flare"};let wc="",od=!1,bc=!1,Ec=0;function Af(i,e){const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),s=n.createRadialGradient(32,32,2,32,32,32);return s.addColorStop(0,i),s.addColorStop(.5,e),s.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=s,n.fillRect(0,0,64,64),new rn(t)}const PS=Af("rgba(255,240,180,1)","rgba(255,90,10,0.7)"),LS=Af("rgba(80,80,85,0.85)","rgba(40,40,45,0.4)"),us=new dn(new sn({map:PS,transparent:!0,depthWrite:!1,blending:Vr})),Ki=new dn(new sn({map:LS,transparent:!0,depthWrite:!1}));us.visible=Ki.visible=!1;Mn.add(us,Ki);let Vs=1e9;function Tc(i){us.position.copy(i),Ki.position.copy(i),us.visible=Ki.visible=!0,Vs=0,tr=1}function Yo(i){if(Vs>12){us.visible=Ki.visible=!1;return}Vs+=i;const e=Math.min(1,Vs/9);us.scale.setScalar(5+Vs*2.5),us.material.opacity=1-e,Ki.position.y+=i*3.5,Ki.scale.setScalar(7+Vs*4),Ki.material.opacity=.85*(1-e),tr=Math.max(0,tr-i*.45)}const IS=Wy({getThrottle:()=>We.st.throttle,onLook:(i,e)=>bt.addLook(i,e),onAction:i=>{switch(i){case"flapUp":We.st.flapIdx=Math.min(3,We.st.flapIdx+1);break;case"flapDown":We.st.flapIdx=Math.max(0,We.st.flapIdx-1);break;case"gear":We.st.gearDown=!We.st.gearDown,et(We.st.gearDown?"Gear DOWN":"Gear UP");break;case"cam":vf();break;case"pause":pt.setPaused(!0);break;case"walk":rh();break;case"dive":Mf();break;case"interact":zn&&yf();break;case"next":document.dispatchEvent(new CustomEvent("flightsim-tut-next"));break}}});function xs(){IS.setMode(document.getElementById("menu").classList.contains("hidden")?zn?"walk":"fly":"hidden")}function Rf(){requestAnimationFrame(Rf);const i=performance.now()/1e3;let e=Math.min(.1,i-rd);rd=i;const t=!document.getElementById("menu").classList.contains("hidden");t||(Al=!0);const n=pa.isOpen()||nh.isOpen();if(t)Ko+=e*.11,_t.position.set(pe.x+Math.cos(Ko)*16,pe.y+4.5+Math.sin(Ko*.6)*1.2,pe.z+Math.sin(Ko)*16),_t.lookAt(pe.x,pe.y+.8,pe.z),xn.update(e),Xo(e,Qn,Hs,pe),Nr.update(e,Qn,xn.isNight(),pe),Yo(e);else if(!pt.isPaused()&&Al&&!n)if(xn.update(e),zn){if(We.keys.has("KeyP")&&(We.keys.delete("KeyP"),pt.setPaused(!pt.isPaused())),We.keys.has("KeyH")&&(We.keys.delete("KeyH"),pt.setHelpVisible(!pt.isHelpVisible())),We.consumeMap()&&er.setHidden(!er.isHidden()),Ef.update(0,0,!1),We.consumeWalk()&&rh(),We.consumeInteract()&&yf(),We.consumeReset()&&(eo(),zn=!1,bt.hide(),xs()),Ve.mode==="walk"&&!At){const r=Ve.stickOn?Ve.stickX:0,o=Ve.stickOn?Ve.stickY:0,a=(c,l)=>{l?bt.keys.add(c):bt.keys.delete(c)};a("KeyW",o>.25),a("KeyS",o<-.25),a("KeyD",r>.25),a("KeyA",r<-.25),a("ShiftLeft",Ve.run)}At?wS(e):bt.update(e),$t.animate({roll:0,pitch:0,yaw:0,flapFrac:0,gearDown:!0,rpm01:0},e,Qn);const s=At?At.g.position:bt.pos;Xo(e,Qn,Hs,s),Nr.update(e,Qn,xn.isNight(),s),Ec+=e,Ec>1.5&&(Ec=0,Nr.townsfolk.some(o=>Math.hypot(o.p.group.position.x-s.x,o.p.group.position.z-s.z)<9)&&yn.playRandom(["folk-hi1","folk-hi2","folk-hi3","folk-hi4"],25)),Js.position.set(s.x+1400,1600,s.z+700),Js.target.position.copy(s),bf.update({iasKt:At?Math.abs(Nt)*Si:0,altFt:s.y*Kn,vsiFpm:0,hdgDeg:0,throttle:0,rpm:0,flapDeg:0,gearDown:!0,trim:0,aoaDeg:0,aglFt:0,windKt:Hs.length()*Si,cam:At?"DRIVE":"FOOT",pitchDeg:0,rollDeg:0,stalled:!1,overspeed:"",hint:At?`🚗 ${Math.round(Math.abs(Nt)*3.6)} km/h — E/K hop out`:"WASD walk · E drive/shop/talk · K plane",sights:`${si.size}/${gs.length}`,money:"$"+Be.money,clock:xn.icon()+" "+xn.clock()}),er.update({x:s.x,z:s.z,hdgDeg:0,sightsFound:si,onFoot:!0},e),Yo(e)}else{qo+=e;const s=1/120;let r=0;for(;qo>=s&&r<40;)RS(s,Qn),Qn+=s,qo-=s,r++;Xo(e,Qn,Hs,pe),Nr.update(e,Qn,xn.isNight(),pe),Tf.update(en,e),Yo(e),tr>.01&&(_t.position.x+=(Math.random()-.5)*tr*.7,_t.position.y+=(Math.random()-.5)*tr*.7)}else qo=0,Xo(e,Qn,Hs,pe),Yo(e);bS.update(e,_t.position,pt.settings.weather||0),Jn.render(Mn,_t)}Rf();
