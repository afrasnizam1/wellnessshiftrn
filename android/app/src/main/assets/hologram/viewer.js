"use strict";(()=>{var di={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},pi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},_h=0,bl=1,xh=2;var xr=1,vh=2,bs=3,Hn=0,Ge=1,tn=2,In=0,Ii=1,Tl=2,Al=3,wl=4,yh=5;var ri=100,Mh=101,Sh=102,bh=103,Th=104,Ah=200,wh=201,Eh=202,Ch=203,oa=204,la=205,Rh=206,Ph=207,Ih=208,Dh=209,Lh=210,Uh=211,Nh=212,Fh=213,Oh=214,ca=0,ha=1,ua=2,Di=3,fa=4,da=5,pa=6,ma=7,El=0,Bh=1,zh=2,yn=0,vr=1,Cl=2,Rl=3,Pl=4,Il=5,Dl=6,Ll=7,cl="attached",kh="detached",Ul=300,mi=301,ki=302,La=303,Ua=304,yr=306,Li=1e3,ln=1001,cs=1002,Pe=1003,Vh=1004;var Mr=1005;var De=1006,Na=1007;var gi=1008;var qe=1009,Nl=1010,Fl=1011,Ts=1012,Fa=1013,Mn=1014,dn=1015,Dn=1016,Oa=1017,Ba=1018,As=1020,Ol=35902,Bl=35899,zl=1021,kl=1022,en=1023,Pn=1026,_i=1027,Vl=1028,za=1029,xi=1030,ka=1031;var Va=1033,Sr=33776,br=33777,Tr=33778,Ar=33779,Ga=35840,Ha=35841,Wa=35842,Xa=35843,qa=36196,Ya=37492,Za=37496,Ja=37488,Ka=37489,wr=37490,$a=37491,ja=37808,Qa=37809,to=37810,eo=37811,no=37812,io=37813,so=37814,ro=37815,ao=37816,oo=37817,lo=37818,co=37819,ho=37820,uo=37821,fo=36492,po=36494,mo=36495,go=36283,_o=36284,Er=36285,xo=36286,Gh=2200,Hh=2201,Wh=2202,Bs=2300,ga=2301,aa=2302,hl=2303,Ci=2400,Ri=2401,zs=2402,vo=2500,Xh=2501;var qh=3200;var yo=0,Yh=1,Le="",$t="srgb",ks="srgb-linear",Vs="linear",Qt="srgb";var Ei=7680;var ul=519,Zh=512,Jh=513,Kh=514,Mo=515,$h=516,jh=517,So=518,Qh=519,fl=35044;var Gl="300 es",xn=2e3,hs=2001;function df(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function pf(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Gs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function tu(){let s=Gs("canvas");return s.style.display="block",s}var kc={},us=null;function Hl(...s){let t="THREE."+s.shift();us?us("log",t,...s):console.log(t,...s)}function eu(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ct(...s){s=eu(s);let t="THREE."+s.shift();if(us)us("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Ut(...s){s=eu(s);let t="THREE."+s.shift();if(us)us("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Pi(...s){let t=s.join(" ");t in kc||(kc[t]=!0,Ct(...s))}function nu(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var iu={[ca]:ha,[ua]:pa,[fa]:ma,[Di]:da,[ha]:ca,[pa]:ua,[ma]:fa,[da]:Di},hn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}},Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vc=1234567,Fs=Math.PI/180,Ui=180/Math.PI;function vi(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[s&255]+Ne[s>>8&255]+Ne[s>>16&255]+Ne[s>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Xt(s,t,e){return Math.max(t,Math.min(e,s))}function Wl(s,t){return(s%t+t)%t}function mf(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function gf(s,t,e){return s!==t?(e-s)/(t-s):0}function Os(s,t,e){return(1-e)*s+e*t}function _f(s,t,e,n){return Os(s,t,1-Math.exp(-e*n))}function xf(s,t=1){return t-Math.abs(Wl(s,t*2)-t)}function vf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function yf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Mf(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Sf(s,t){return s+Math.random()*(t-s)}function bf(s){return s*(.5-Math.random())}function Tf(s){s!==void 0&&(Vc=s);let t=Vc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Af(s){return s*Fs}function wf(s){return s*Ui}function Ef(s){return(s&s-1)===0&&s!==0}function Cf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Rf(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Pf(s,t,e,n,i){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),u=a((t+n)/2),h=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),p=a((n-t)/2);switch(i){case"XYX":s.set(o*u,l*h,l*f,o*c);break;case"YZY":s.set(l*f,o*u,l*h,o*c);break;case"ZXZ":s.set(l*h,l*f,o*u,o*c);break;case"XZX":s.set(o*u,l*p,l*d,o*c);break;case"YXY":s.set(l*d,o*u,l*p,o*c);break;case"ZYZ":s.set(l*p,l*d,o*u,o*c);break;default:Ct("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function os(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ve(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Xl={DEG2RAD:Fs,RAD2DEG:Ui,generateUUID:vi,clamp:Xt,euclideanModulo:Wl,mapLinear:mf,inverseLerp:gf,lerp:Os,damp:_f,pingpong:xf,smoothstep:vf,smootherstep:yf,randInt:Mf,randFloat:Sf,randFloatSpread:bf,seededRandom:Tf,degToRad:Af,radToDeg:wf,isPowerOfTwo:Ef,ceilPowerOfTwo:Cf,floorPowerOfTwo:Rf,setQuaternionFromProperEuler:Pf,normalize:Ve,denormalize:os},It=class s{static{s.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},be=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],f=r[a+0],d=r[a+1],p=r[a+2],_=r[a+3];if(h!==_||l!==f||c!==d||u!==p){let m=l*f+c*d+u*p+h*_;m<0&&(f=-f,d=-d,p=-p,_=-_,m=-m);let g=1-o;if(m<.9995){let A=Math.acos(m),M=Math.sin(A);g=Math.sin(g*A)/M,o=Math.sin(o*A)/M,l=l*g+f*o,c=c*g+d*o,u=u*g+p*o,h=h*g+_*o}else{l=l*g+f*o,c=c*g+d*o,u=u*g+p*o,h=h*g+_*o;let A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=r[a],f=r[a+1],d=r[a+2],p=r[a+3];return t[e]=o*p+u*h+l*d-c*f,t[e+1]=l*p+u*f+c*h-o*d,t[e+2]=c*p+u*d+o*f-l*h,t[e+3]=u*p-o*h-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(i/2),h=o(r/2),f=l(n/2),d=l(i/2),p=l(r/2);switch(a){case"XYZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"YXZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"ZXY":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"ZYX":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"YZX":this._x=f*u*h+c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h-f*d*p;break;case"XZY":this._x=f*u*h-c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h+f*d*p;break;default:Ct("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=n+o+h;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(a-i)*d}else if(n>o&&n>h){let d=2*Math.sqrt(1+n-o-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+c)/d}else if(o>h){let d=2*Math.sqrt(1+o-n-h);this._w=(r-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+h-n-o);this._w=(a-i)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+i*c-r*l,this._y=i*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-i*o,this._w=a*u-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class s{static{s.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),u=2*(o*e-r*i),h=2*(r*n-a*e);return this.x=e+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=i+l*h+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zo.copy(this).projectOnVector(t),this.sub(zo)}reflect(t){return this.sub(zo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},zo=new L,Gc=new be,Bt=class s{static{s.prototype.isMatrix3=!0}constructor(t,e,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=i,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],p=n[8],_=i[0],m=i[3],g=i[6],A=i[1],M=i[4],x=i[7],T=i[2],b=i[5],C=i[8];return r[0]=a*_+o*A+l*T,r[3]=a*m+o*M+l*b,r[6]=a*g+o*x+l*C,r[1]=c*_+u*A+h*T,r[4]=c*m+u*M+h*b,r[7]=c*g+u*x+h*C,r[2]=f*_+d*A+p*T,r[5]=f*m+d*M+p*b,r[8]=f*g+d*x+p*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*r*u+n*o*l+i*r*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=u*a-o*c,f=o*l-u*r,d=c*r-a*l,p=e*h+n*f+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return t[0]=h*_,t[1]=(i*c-u*n)*_,t[2]=(o*n-i*a)*_,t[3]=f*_,t[4]=(u*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Pi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ko.makeScale(t,e)),this}rotate(t){return Pi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ko.makeRotation(-t)),this}translate(t,e){return Pi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ko.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ko=new Bt,Hc=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wc=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function If(){let s={enabled:!0,workingColorSpace:ks,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qt&&(i.r=Gn(i.r),i.g=Gn(i.g),i.b=Gn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qt&&(i.r=ls(i.r),i.g=ls(i.g),i.b=ls(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Le?Vs:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Pi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Pi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[ks]:{primaries:t,whitePoint:n,transfer:Vs,toXYZ:Hc,fromXYZ:Wc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:t,whitePoint:n,transfer:Qt,toXYZ:Hc,fromXYZ:Wc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),s}var Yt=If();function Gn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ls(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Ji,_a=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ji===void 0&&(Ji=Gs("canvas")),Ji.width=t.width,Ji.height=t.height;let i=Ji.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Ji}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Gs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Gn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Gn(e[n]/255)*255):e[n]=Gn(e[n]);return{data:e,width:t.width,height:t.height}}else return Ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Df=0,fs=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=vi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Vo(i[a].image)):r.push(Vo(i[a]))}else r=Vo(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function Vo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?_a.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ct("Texture: Unable to serialize Texture."),{})}var Lf=0,Go=new L,Oe=class s extends hn{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=ln,i=ln,r=De,a=gi,o=en,l=qe,c=s.DEFAULT_ANISOTROPY,u=Le){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=vi(),this.name="",this.source=new fs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Go).x}get height(){return this.source.getSize(Go).y}get depth(){return this.source.getSize(Go).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Ct(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Ct(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ul)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Li:t.x=t.x-Math.floor(t.x);break;case ln:t.x=t.x<0?0:1;break;case cs:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Li:t.y=t.y-Math.floor(t.y);break;case ln:t.y=t.y<0?0:1;break;case cs:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Oe.DEFAULT_IMAGE=null;Oe.DEFAULT_MAPPING=Ul;Oe.DEFAULT_ANISOTROPY=1;var ne=class s{static{s.prototype.isVector4=!0}constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],p=l[9],_=l[2],m=l[6],g=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,x=(d+1)/2,T=(g+1)/2,b=(u+f)/4,C=(h+_)/4,y=(p+m)/4;return M>x&&M>T?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=b/n,r=C/n):x>T?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=b/i,r=y/i):T<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(T),n=C/r,i=y/r),this.set(n,i,r,e),this}let A=Math.sqrt((m-p)*(m-p)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(A)<.001&&(A=1),this.x=(m-p)/A,this.y=(h-_)/A,this.z=(f-u)/A,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},xa=class extends hn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ne(0,0,t,e),this.scissorTest=!1,this.viewport=new ne(0,0,t,e),this.textures=[];let i={width:t,height:e,depth:n.depth},r=new Oe(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:De,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new fs(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},$e=class extends xa{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Hs=class extends Oe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var va=class extends Oe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Gt=class s{static{s.prototype.isMatrix4=!0}constructor(t,e,n,i,r,a,o,l,c,u,h,f,d,p,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,u,h,f,d,p,_,m)}set(t,e,n,i,r,a,o,l,c,u,h,f,d,p,_,m){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=h,g[14]=f,g[3]=d,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/Ki.setFromMatrixColumn(t,0).length(),r=1/Ki.setFromMatrixColumn(t,1).length(),a=1/Ki.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){let f=a*u,d=a*h,p=o*u,_=o*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+p*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=p+d*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*u,d=l*h,p=c*u,_=c*h;e[0]=f+_*o,e[4]=p*o-d,e[8]=a*c,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=d*o-p,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*u,d=l*h,p=c*u,_=c*h;e[0]=f-_*o,e[4]=-a*h,e[8]=p+d*o,e[1]=d+p*o,e[5]=a*u,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*u,d=a*h,p=o*u,_=o*h;e[0]=l*u,e[4]=p*c-d,e[8]=f*c+_,e[1]=l*h,e[5]=_*c+f,e[9]=d*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,d=a*c,p=o*l,_=o*c;e[0]=l*u,e[4]=_-f*h,e[8]=p*h+d,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=d*h+p,e[10]=f-_*h}else if(t.order==="XZY"){let f=a*l,d=a*c,p=o*l,_=o*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+_,e[5]=a*u,e[9]=d*h-p,e[2]=p*h-d,e[6]=o*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Uf,t,Nf)}lookAt(t,e,n){let i=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),jn.crossVectors(n,Je),jn.lengthSq()===0&&(Math.abs(n.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),jn.crossVectors(n,Je)),jn.normalize(),Or.crossVectors(Je,jn),i[0]=jn.x,i[4]=Or.x,i[8]=Je.x,i[1]=jn.y,i[5]=Or.y,i[9]=Je.y,i[2]=jn.z,i[6]=Or.z,i[10]=Je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],p=n[2],_=n[6],m=n[10],g=n[14],A=n[3],M=n[7],x=n[11],T=n[15],b=i[0],C=i[4],y=i[8],w=i[12],R=i[1],P=i[5],I=i[9],V=i[13],W=i[2],N=i[6],G=i[10],X=i[14],$=i[3],Q=i[7],st=i[11],rt=i[15];return r[0]=a*b+o*R+l*W+c*$,r[4]=a*C+o*P+l*N+c*Q,r[8]=a*y+o*I+l*G+c*st,r[12]=a*w+o*V+l*X+c*rt,r[1]=u*b+h*R+f*W+d*$,r[5]=u*C+h*P+f*N+d*Q,r[9]=u*y+h*I+f*G+d*st,r[13]=u*w+h*V+f*X+d*rt,r[2]=p*b+_*R+m*W+g*$,r[6]=p*C+_*P+m*N+g*Q,r[10]=p*y+_*I+m*G+g*st,r[14]=p*w+_*V+m*X+g*rt,r[3]=A*b+M*R+x*W+T*$,r[7]=A*C+M*P+x*N+T*Q,r[11]=A*y+M*I+x*G+T*st,r[15]=A*w+M*V+x*X+T*rt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],d=t[14],p=t[3],_=t[7],m=t[11],g=t[15],A=l*d-c*f,M=o*d-c*h,x=o*f-l*h,T=a*d-c*u,b=a*f-l*u,C=a*h-o*u;return e*(_*A-m*M+g*x)-n*(p*A-m*T+g*b)+i*(p*M-_*T+g*C)-r*(p*x-_*b+m*C)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return e*(a*u-o*c)-n*(r*u-o*l)+i*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],d=t[11],p=t[12],_=t[13],m=t[14],g=t[15],A=e*o-n*a,M=e*l-i*a,x=e*c-r*a,T=n*l-i*o,b=n*c-r*o,C=i*c-r*l,y=u*_-h*p,w=u*m-f*p,R=u*g-d*p,P=h*m-f*_,I=h*g-d*_,V=f*g-d*m,W=A*V-M*I+x*P+T*R-b*w+C*y;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/W;return t[0]=(o*V-l*I+c*P)*N,t[1]=(i*I-n*V-r*P)*N,t[2]=(_*C-m*b+g*T)*N,t[3]=(f*b-h*C-d*T)*N,t[4]=(l*R-a*V-c*w)*N,t[5]=(e*V-i*R+r*w)*N,t[6]=(m*x-p*C-g*M)*N,t[7]=(u*C-f*x+d*M)*N,t[8]=(a*I-o*R+c*y)*N,t[9]=(n*R-e*I-r*y)*N,t[10]=(p*b-_*x+g*A)*N,t[11]=(h*x-u*b-d*A)*N,t[12]=(o*w-a*P-l*y)*N,t[13]=(e*P-n*w+i*y)*N,t[14]=(_*M-p*T-m*A)*N,t[15]=(u*T-h*M+f*A)*N,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+n,u*l-i*a,0,c*l-i*o,u*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,h=o+o,f=r*c,d=r*u,p=r*h,_=a*u,m=a*h,g=o*h,A=l*c,M=l*u,x=l*h,T=n.x,b=n.y,C=n.z;return i[0]=(1-(_+g))*T,i[1]=(d+x)*T,i[2]=(p-M)*T,i[3]=0,i[4]=(d-x)*b,i[5]=(1-(f+g))*b,i[6]=(m+A)*b,i[7]=0,i[8]=(p+M)*C,i[9]=(m-A)*C,i[10]=(1-(f+_))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Ki.set(i[0],i[1],i[2]).length(),o=Ki.set(i[4],i[5],i[6]).length(),l=Ki.set(i[8],i[9],i[10]).length();r<0&&(a=-a),mn.copy(this);let c=1/a,u=1/o,h=1/l;return mn.elements[0]*=c,mn.elements[1]*=c,mn.elements[2]*=c,mn.elements[4]*=u,mn.elements[5]*=u,mn.elements[6]*=u,mn.elements[8]*=h,mn.elements[9]*=h,mn.elements[10]*=h,e.setFromRotationMatrix(mn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,r,a,o=xn,l=!1){let c=this.elements,u=2*r/(e-t),h=2*r/(n-i),f=(e+t)/(e-t),d=(n+i)/(n-i),p,_;if(l)p=r/(a-r),_=a*r/(a-r);else if(o===xn)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===hs)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=xn,l=!1){let c=this.elements,u=2/(e-t),h=2/(n-i),f=-(e+t)/(e-t),d=-(n+i)/(n-i),p,_;if(l)p=1/(a-r),_=a/(a-r);else if(o===xn)p=-2/(a-r),_=-(a+r)/(a-r);else if(o===hs)p=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ki=new L,mn=new Gt,Uf=new L(0,0,0),Nf=new L(1,1,1),jn=new L,Or=new L,Je=new L,Xc=new Gt,qc=new be,un=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Xc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return qc.setFromEuler(this),this.setFromQuaternion(qc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};un.DEFAULT_ORDER="XYZ";var Ws=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Ff=0,Yc=new L,$i=new be,Fn=new Gt,Br=new L,Ps=new L,Of=new L,Bf=new be,Zc=new L(1,0,0),Jc=new L(0,1,0),Kc=new L(0,0,1),$c={type:"added"},zf={type:"removed"},ji={type:"childadded",child:null},Ho={type:"childremoved",child:null},pe=class s extends hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new L,e=new un,n=new be,i=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Gt},normalMatrix:{value:new Bt}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.multiply($i),this}rotateOnWorldAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.premultiply($i),this}rotateX(t){return this.rotateOnAxis(Zc,t)}rotateY(t){return this.rotateOnAxis(Jc,t)}rotateZ(t){return this.rotateOnAxis(Kc,t)}translateOnAxis(t,e){return Yc.copy(t).applyQuaternion(this.quaternion),this.position.add(Yc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zc,t)}translateY(t){return this.translateOnAxis(Jc,t)}translateZ(t){return this.translateOnAxis(Kc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Br.copy(t):Br.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(Ps,Br,this.up):Fn.lookAt(Br,Ps,this.up),this.quaternion.setFromRotationMatrix(Fn),i&&(Fn.extractRotation(i.matrixWorld),$i.setFromRotationMatrix(Fn),this.quaternion.premultiply($i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ut("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($c),ji.child=t,this.dispatchEvent(ji),ji.child=null):Ut("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(zf),Ho.child=t,this.dispatchEvent(Ho),Ho.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($c),ji.child=t,this.dispatchEvent(ji),ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,t,Of),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,Bf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),h=a(t.shapes),f=a(t.skeletons),d=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};pe.DEFAULT_UP=new L(0,1,0);pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var cn=class extends pe{constructor(){super(),this.isGroup=!0,this.type="Group"}},kf={type:"move"},ds=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),g=this._getHandJoint(c,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(kf)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new cn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},su={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},zr={h:0,s:0,l:0};function Wo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Nt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$t){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Yt.workingColorSpace){if(t=Wl(t,1),e=Xt(e,0,1),n=Xt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Wo(a,r,t+1/3),this.g=Wo(a,r,t),this.b=Wo(a,r,t-1/3)}return Yt.colorSpaceToWorking(this,i),this}setStyle(t,e=$t){function n(r){r!==void 0&&parseFloat(r)<1&&Ct("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ct("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ct("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$t){let n=su[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ct("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gn(t.r),this.g=Gn(t.g),this.b=Gn(t.b),this}copyLinearToSRGB(t){return this.r=ls(t.r),this.g=ls(t.g),this.b=ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$t){return Yt.workingToColorSpace(Fe.copy(this),t),Math.round(Xt(Fe.r*255,0,255))*65536+Math.round(Xt(Fe.g*255,0,255))*256+Math.round(Xt(Fe.b*255,0,255))}getHexString(t=$t){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.workingToColorSpace(Fe.copy(this),e);let n=Fe.r,i=Fe.g,r=Fe.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Yt.workingColorSpace){return Yt.workingToColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=$t){Yt.workingToColorSpace(Fe.copy(this),t);let e=Fe.r,n=Fe.g,i=Fe.b;return t!==$t?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Qn),this.setHSL(Qn.h+t,Qn.s+e,Qn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Qn),t.getHSL(zr);let n=Os(Qn.h,zr.h,e),i=Os(Qn.s,zr.s,e),r=Os(Qn.l,zr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fe=new Nt;Nt.NAMES=su;var Xs=class extends pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},gn=new L,On=new L,Xo=new L,Bn=new L,Qi=new L,ts=new L,jc=new L,qo=new L,Yo=new L,Zo=new L,Jo=new ne,Ko=new ne,$o=new ne,si=class s{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),gn.subVectors(t,e),i.cross(gn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){gn.subVectors(i,e),On.subVectors(n,e),Xo.subVectors(t,e);let a=gn.dot(gn),o=gn.dot(On),l=gn.dot(Xo),c=On.dot(On),u=On.dot(Xo),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;let f=1/h,d=(c*l-o*u)*f,p=(a*u-o*l)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bn.x),l.addScaledVector(a,Bn.y),l.addScaledVector(o,Bn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Jo.setScalar(0),Ko.setScalar(0),$o.setScalar(0),Jo.fromBufferAttribute(t,e),Ko.fromBufferAttribute(t,n),$o.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Jo,r.x),a.addScaledVector(Ko,r.y),a.addScaledVector($o,r.z),a}static isFrontFacing(t,e,n,i){return gn.subVectors(n,e),On.subVectors(t,e),gn.cross(On).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return gn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),gn.cross(On).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,a,o;Qi.subVectors(i,n),ts.subVectors(r,n),qo.subVectors(t,n);let l=Qi.dot(qo),c=ts.dot(qo);if(l<=0&&c<=0)return e.copy(n);Yo.subVectors(t,i);let u=Qi.dot(Yo),h=ts.dot(Yo);if(u>=0&&h<=u)return e.copy(i);let f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(Qi,a);Zo.subVectors(t,r);let d=Qi.dot(Zo),p=ts.dot(Zo);if(p>=0&&d<=p)return e.copy(r);let _=d*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(ts,o);let m=u*p-d*h;if(m<=0&&h-u>=0&&d-p>=0)return jc.subVectors(r,i),o=(h-u)/(h-u+(d-p)),e.copy(i).addScaledVector(jc,o);let g=1/(m+_+f);return a=_*g,o=f*g,e.copy(n).addScaledVector(Qi,a).addScaledVector(ts,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},je=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(_n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(_n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=_n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,_n):_n.fromBufferAttribute(r,a),_n.applyMatrix4(t.matrixWorld),this.expandByPoint(_n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),kr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),kr.copy(n.boundingBox)),kr.applyMatrix4(t.matrixWorld),this.union(kr)}let i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,_n),_n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Is),Vr.subVectors(this.max,Is),es.subVectors(t.a,Is),ns.subVectors(t.b,Is),is.subVectors(t.c,Is),ti.subVectors(ns,es),ei.subVectors(is,ns),bi.subVectors(es,is);let e=[0,-ti.z,ti.y,0,-ei.z,ei.y,0,-bi.z,bi.y,ti.z,0,-ti.x,ei.z,0,-ei.x,bi.z,0,-bi.x,-ti.y,ti.x,0,-ei.y,ei.x,0,-bi.y,bi.x,0];return!jo(e,es,ns,is,Vr)||(e=[1,0,0,0,1,0,0,0,1],!jo(e,es,ns,is,Vr))?!1:(Gr.crossVectors(ti,ei),e=[Gr.x,Gr.y,Gr.z],jo(e,es,ns,is,Vr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},zn=[new L,new L,new L,new L,new L,new L,new L,new L],_n=new L,kr=new je,es=new L,ns=new L,is=new L,ti=new L,ei=new L,bi=new L,Is=new L,Vr=new L,Gr=new L,Ti=new L;function jo(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ti.fromArray(s,r);let o=i.x*Math.abs(Ti.x)+i.y*Math.abs(Ti.y)+i.z*Math.abs(Ti.z),l=t.dot(Ti),c=e.dot(Ti),u=n.dot(Ti);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Me=new L,Hr=new It,Vf=0,te=class extends hn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=fl,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Hr.fromBufferAttribute(this,e),Hr.applyMatrix3(t),this.setXY(e,Hr.x,Hr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=os(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ve(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=os(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=os(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=os(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=os(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array),i=Ve(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array),i=Ve(i,this.array),r=Ve(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fl&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}};var qs=class extends te{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ys=class extends te{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var xe=class extends te{constructor(t,e,n){super(new Float32Array(t),e,n)}},Gf=new je,Ds=new L,Qo=new L,ai=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Gf.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ds.subVectors(t,this.center);let e=Ds.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ds,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ds.copy(t.center).add(Qo)),this.expandByPoint(Ds.copy(t.center).sub(Qo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Hf=0,an=new Gt,tl=new pe,ss=new L,Ke=new je,Ls=new je,Re=new L,Be=class s extends hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(df(t)?Ys:qs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return an.makeRotationFromQuaternion(t),this.applyMatrix4(an),this}rotateX(t){return an.makeRotationX(t),this.applyMatrix4(an),this}rotateY(t){return an.makeRotationY(t),this.applyMatrix4(an),this}rotateZ(t){return an.makeRotationZ(t),this.applyMatrix4(an),this}translate(t,e,n){return an.makeTranslation(t,e,n),this.applyMatrix4(an),this}scale(t,e,n){return an.makeScale(t,e,n),this.applyMatrix4(an),this}lookAt(t){return tl.lookAt(t),tl.updateMatrix(),this.applyMatrix4(tl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ss).negate(),this.translate(ss.x,ss.y,ss.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new xe(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new je);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ut("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ut('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ai);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ut("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Ls.setFromBufferAttribute(o),this.morphTargetsRelative?(Re.addVectors(Ke.min,Ls.min),Ke.expandByPoint(Re),Re.addVectors(Ke.max,Ls.max),Ke.expandByPoint(Re)):(Ke.expandByPoint(Ls.min),Ke.expandByPoint(Ls.max))}Ke.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Re.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Re));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Re.fromBufferAttribute(o,c),l&&(ss.fromBufferAttribute(t,c),Re.add(ss)),i=Math.max(i,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ut('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ut("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new te(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<n.count;y++)o[y]=new L,l[y]=new L;let c=new L,u=new L,h=new L,f=new It,d=new It,p=new It,_=new L,m=new L;function g(y,w,R){c.fromBufferAttribute(n,y),u.fromBufferAttribute(n,w),h.fromBufferAttribute(n,R),f.fromBufferAttribute(r,y),d.fromBufferAttribute(r,w),p.fromBufferAttribute(r,R),u.sub(c),h.sub(c),d.sub(f),p.sub(f);let P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(p.y).addScaledVector(h,-d.y).multiplyScalar(P),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(P),o[y].add(_),o[w].add(_),o[R].add(_),l[y].add(m),l[w].add(m),l[R].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let y=0,w=A.length;y<w;++y){let R=A[y],P=R.start,I=R.count;for(let V=P,W=P+I;V<W;V+=3)g(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let M=new L,x=new L,T=new L,b=new L;function C(y){T.fromBufferAttribute(i,y),b.copy(T);let w=o[y];M.copy(w),M.sub(T.multiplyScalar(T.dot(w))).normalize(),x.crossVectors(b,w);let P=x.dot(l[y])<0?-1:1;a.setXYZW(y,M.x,M.y,M.z,P)}for(let y=0,w=A.length;y<w;++y){let R=A[y],P=R.start,I=R.count;for(let V=P,W=P+I;V<W;V+=3)C(t.getX(V+0)),C(t.getX(V+1)),C(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new te(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new L,r=new L,a=new L,o=new L,l=new L,c=new L,u=new L,h=new L;if(t)for(let f=0,d=t.count;f<d;f+=3){let p=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,p),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u),d=0,p=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*u;for(let g=0;g<u;g++)f[p++]=c[d++]}return new te(f,u,h)}if(this.index===null)return Ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){let f=c[u],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){let d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(i[l]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let u=i[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Wf=0,oi=class extends hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=vi(),this.name="",this.type="Material",this.blending=Ii,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oa,this.blendDst=la,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=Di,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ul,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Ct(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Ct(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(n.blending=this.blending),this.side!==Hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oa&&(n.blendSrc=this.blendSrc),this.blendDst!==la&&(n.blendDst=this.blendDst),this.blendEquation!==ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Di&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ul&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Nt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new It().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new It().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var kn=new L,el=new L,Wr=new L,ni=new L,nl=new L,Xr=new L,il=new L,Ni=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(kn.copy(this.origin).addScaledVector(this.direction,e),kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){el.copy(t).add(e).multiplyScalar(.5),Wr.copy(e).sub(t).normalize(),ni.copy(this.origin).sub(el);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Wr),o=ni.dot(this.direction),l=-ni.dot(Wr),c=ni.lengthSq(),u=Math.abs(1-a*a),h,f,d,p;if(u>0)if(h=a*l-o,f=a*o-l,p=r*u,h>=0)if(f>=-p)if(f<=p){let _=1/u;h*=_,f*=_,d=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f<=-p?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=p?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(el).addScaledVector(Wr,f),d}intersectSphere(t,e){kn.subVectors(t.center,this.origin);let n=kn.dot(this.direction),i=kn.dot(kn)-n*n,r=t.radius*t.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,kn)!==null}intersectTriangle(t,e,n,i,r){nl.subVectors(e,t),Xr.subVectors(n,t),il.crossVectors(nl,Xr);let a=this.direction.dot(il),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ni.subVectors(this.origin,t);let l=o*this.direction.dot(Xr.crossVectors(ni,Xr));if(l<0)return null;let c=o*this.direction.dot(nl.cross(ni));if(c<0||l+c>a)return null;let u=-o*ni.dot(il);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Zs=class extends oi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=El,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Qc=new Gt,Ai=new Ni,qr=new ai,th=new L,Yr=new L,Zr=new L,Jr=new L,sl=new L,Kr=new L,eh=new L,$r=new L,ze=class extends pe{constructor(t=new Be,e=new Zs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(r&&o){Kr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],h=r[l];u!==0&&(sl.fromBufferAttribute(h,t),a?Kr.addScaledVector(sl,u):Kr.addScaledVector(sl.sub(e),u))}e.add(Kr)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(r),Ai.copy(t.ray).recast(t.near),!(qr.containsPoint(Ai.origin)===!1&&(Ai.intersectSphere(qr,th)===null||Ai.origin.distanceToSquared(th)>(t.far-t.near)**2))&&(Qc.copy(r).invert(),Ai.copy(t.ray).applyMatrix4(Qc),!(n.boundingBox!==null&&Ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ai)))}_computeIntersections(t,e,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=f.length;p<_;p++){let m=f[p],g=a[m.materialIndex],A=Math.max(m.start,d.start),M=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let x=A,T=M;x<T;x+=3){let b=o.getX(x),C=o.getX(x+1),y=o.getX(x+2);i=jr(this,g,t,n,c,u,h,b,C,y),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let p=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){let A=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);i=jr(this,a,t,n,c,u,h,A,M,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=f.length;p<_;p++){let m=f[p],g=a[m.materialIndex],A=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=A,T=M;x<T;x+=3){let b=x,C=x+1,y=x+2;i=jr(this,g,t,n,c,u,h,b,C,y),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let p=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=p,g=_;m<g;m+=3){let A=m,M=m+1,x=m+2;i=jr(this,a,t,n,c,u,h,A,M,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function Xf(s,t,e,n,i,r,a,o){let l;if(t.side===Ge?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Hn,o),l===null)return null;$r.copy(o),$r.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo($r);return c<e.near||c>e.far?null:{distance:c,point:$r.clone(),object:s}}function jr(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Yr),s.getVertexPosition(l,Zr),s.getVertexPosition(c,Jr);let u=Xf(s,t,e,n,Yr,Zr,Jr,eh);if(u){let h=new L;si.getBarycoord(eh,Yr,Zr,Jr,h),i&&(u.uv=si.getInterpolatedAttribute(i,o,l,c,h,new It)),r&&(u.uv1=si.getInterpolatedAttribute(r,o,l,c,h,new It)),a&&(u.normal=si.getInterpolatedAttribute(a,o,l,c,h,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new L,materialIndex:0};si.getNormal(Yr,Zr,Jr,f.normal),u.face=f,u.barycoord=h}return u}var Us=new ne,nh=new ne,ih=new ne,qf=new ne,sh=new Gt,Qr=new L,rl=new ai,rh=new Gt,al=new Ni,Js=class extends ze{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=cl,this.bindMatrix=new Gt,this.bindMatrixInverse=new Gt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new je),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Qr),this.boundingBox.expandByPoint(Qr)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ai),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Qr),this.boundingSphere.expandByPoint(Qr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rl.copy(this.boundingSphere),rl.applyMatrix4(i),t.ray.intersectsSphere(rl)!==!1&&(rh.copy(i).invert(),al.copy(t.ray).applyMatrix4(rh),!(this.boundingBox!==null&&al.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,al)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new ne,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===cl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===kh?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ct("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,i=this.geometry;nh.fromBufferAttribute(i.attributes.skinIndex,t),ih.fromBufferAttribute(i.attributes.skinWeight,t),e.isVector4?(Us.copy(e),e.set(0,0,0,0)):(Us.set(...e,1),e.set(0,0,0)),Us.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=ih.getComponent(r);if(a!==0){let o=nh.getComponent(r);sh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(qf.copy(Us).applyMatrix4(sh),a)}}return e.isVector4&&(e.w=Us.w),e.applyMatrix4(this.bindMatrixInverse)}},ps=class extends pe{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ks=class extends Oe{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Pe,u=Pe,h,f){super(null,a,o,l,c,u,i,r,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ah=new Gt,Yf=new Gt,$s=class s{constructor(t=[],e=[]){this.uuid=vi(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Ct("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Gt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new Gt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=t.length;r<a;r++){let o=t[r]?t[r].matrixWorld:Yf;ah.multiplyMatrices(o,e[r]),ah.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Ks(e,t,t,en,dn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){let r=t.bones[n],a=e[r];a===void 0&&(Ct("Skeleton: No bone found with UUID:",r),a=new ps),this.bones.push(a),this.boneInverses.push(new Gt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){let a=e[i];t.bones.push(a.uuid);let o=n[i];t.boneInverses.push(o.toArray())}return t}};var ol=new L,Zf=new L,Jf=new Bt,on=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=ol.subVectors(n,e).cross(Zf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(ol),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Jf.getNormalMatrix(t),i=this.coplanarPoint(ol).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},wi=new ai,Kf=new It(.5,.5),ta=new L,ms=class{constructor(t=new on,e=new on,n=new on,i=new on,r=new on,a=new on){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xn,n=!1){let i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],f=r[6],d=r[7],p=r[8],_=r[9],m=r[10],g=r[11],A=r[12],M=r[13],x=r[14],T=r[15];if(i[0].setComponents(c-a,d-u,g-p,T-A).normalize(),i[1].setComponents(c+a,d+u,g+p,T+A).normalize(),i[2].setComponents(c+o,d+h,g+_,T+M).normalize(),i[3].setComponents(c-o,d-h,g-_,T-M).normalize(),n)i[4].setComponents(l,f,m,x).normalize(),i[5].setComponents(c-l,d-f,g-m,T-x).normalize();else if(i[4].setComponents(c-l,d-f,g-m,T-x).normalize(),e===xn)i[5].setComponents(c+l,d+f,g+m,T+x).normalize();else if(e===hs)i[5].setComponents(l,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(t){wi.center.set(0,0,0);let e=Kf.distanceTo(t.center);return wi.radius=.7071067811865476+e,wi.applyMatrix4(t.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(ta.x=i.normal.x>0?t.max.x:t.min.x,ta.y=i.normal.y>0?t.max.y:t.min.y,ta.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ta)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var js=class extends Oe{constructor(t=[],e=mi,n,i,r,a,o,l,c,u){super(t,e,n,i,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Wn=class extends Oe{constructor(t,e,n=Mn,i,r,a,o=Pe,l=Pe,c,u=Pn,h=1){if(u!==Pn&&u!==_i)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:h};super(f,i,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new fs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ya=class extends Wn{constructor(t,e=Mn,n=mi,i,r,a=Pe,o=Pe,l,c=Pn){let u={width:t,height:t,depth:1},h=[u,u,u,u,u,u];super(t,t,e,n,i,r,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Qs=class extends Oe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},li=class s extends Be{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],h=[],f=0,d=0;p("z","y","x",-1,-1,n,e,t,a,r,0),p("z","y","x",1,-1,n,e,-t,a,r,1),p("x","z","y",1,1,t,n,e,i,a,2),p("x","z","y",1,-1,t,n,-e,i,a,3),p("x","y","z",1,-1,t,e,n,i,r,4),p("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new xe(c,3)),this.setAttribute("normal",new xe(u,3)),this.setAttribute("uv",new xe(h,2));function p(_,m,g,A,M,x,T,b,C,y,w){let R=x/C,P=T/y,I=x/2,V=T/2,W=b/2,N=C+1,G=y+1,X=0,$=0,Q=new L;for(let st=0;st<G;st++){let rt=st*P-V;for(let lt=0;lt<N;lt++){let zt=lt*R-I;Q[_]=zt*A,Q[m]=rt*M,Q[g]=W,c.push(Q.x,Q.y,Q.z),Q[_]=0,Q[m]=0,Q[g]=b>0?1:-1,u.push(Q.x,Q.y,Q.z),h.push(lt/C),h.push(1-st/y),X+=1}}for(let st=0;st<y;st++)for(let rt=0;rt<C;rt++){let lt=f+rt+N*st,zt=f+rt+N*(st+1),Zt=f+(rt+1)+N*(st+1),Ft=f+(rt+1)+N*st;l.push(lt,zt,Ft),l.push(zt,Zt,Ft),$+=6}o.addGroup(d,$,w),d+=$,f+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},tr=class s extends Be{constructor(t=1,e=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],u=e/2,h=Math.PI/2*t,f=e,d=2*h+f,p=n*2+r,_=i+1,m=new L,g=new L;for(let A=0;A<=p;A++){let M=0,x=0,T=0,b=0;if(A<=n){let w=A/n,R=w*Math.PI/2;x=-u-t*Math.cos(R),T=t*Math.sin(R),b=-t*Math.cos(R),M=w*h}else if(A<=n+r){let w=(A-n)/r;x=-u+w*e,T=t,b=0,M=h+w*f}else{let w=(A-n-r)/n,R=w*Math.PI/2;x=u+t*Math.sin(R),T=t*Math.cos(R),b=t*Math.sin(R),M=h+f+w*h}let C=Math.max(0,Math.min(1,M/d)),y=0;A===0?y=.5/i:A===p&&(y=-.5/i);for(let w=0;w<=i;w++){let R=w/i,P=R*Math.PI*2,I=Math.sin(P),V=Math.cos(P);g.x=-T*V,g.y=x,g.z=T*I,o.push(g.x,g.y,g.z),m.set(-T*V,b,T*I),m.normalize(),l.push(m.x,m.y,m.z),c.push(R+y,C)}if(A>0){let w=(A-1)*_;for(let R=0;R<i;R++){let P=w+R,I=w+R+1,V=A*_+R,W=A*_+R+1;a.push(P,I,V),a.push(I,W,V)}}}this.setIndex(a),this.setAttribute("position",new xe(o,3)),this.setAttribute("normal",new xe(l,3)),this.setAttribute("uv",new xe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}};var gs=class s extends Be{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let u=[],h=[],f=[],d=[],p=0,_=[],m=n/2,g=0;A(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new xe(h,3)),this.setAttribute("normal",new xe(f,3)),this.setAttribute("uv",new xe(d,2));function A(){let x=new L,T=new L,b=0,C=(e-t)/n;for(let y=0;y<=r;y++){let w=[],R=y/r,P=R*(e-t)+t;for(let I=0;I<=i;I++){let V=I/i,W=V*l+o,N=Math.sin(W),G=Math.cos(W);T.x=P*N,T.y=-R*n+m,T.z=P*G,h.push(T.x,T.y,T.z),x.set(N,C,G).normalize(),f.push(x.x,x.y,x.z),d.push(V,1-R),w.push(p++)}_.push(w)}for(let y=0;y<i;y++)for(let w=0;w<r;w++){let R=_[w][y],P=_[w+1][y],I=_[w+1][y+1],V=_[w][y+1];(t>0||w!==0)&&(u.push(R,P,V),b+=3),(e>0||w!==r-1)&&(u.push(P,I,V),b+=3)}c.addGroup(g,b,0),g+=b}function M(x){let T=p,b=new It,C=new L,y=0,w=x===!0?t:e,R=x===!0?1:-1;for(let I=1;I<=i;I++)h.push(0,m*R,0),f.push(0,R,0),d.push(.5,.5),p++;let P=p;for(let I=0;I<=i;I++){let W=I/i*l+o,N=Math.cos(W),G=Math.sin(W);C.x=w*G,C.y=m*R,C.z=w*N,h.push(C.x,C.y,C.z),f.push(0,R,0),b.x=N*.5+.5,b.y=G*.5*R+.5,d.push(b.x,b.y),p++}for(let I=0;I<i;I++){let V=T+I,W=P+I;x===!0?u.push(W,W+1,V):u.push(W+1,W,V),y+=3}c.addGroup(g,y,x===!0?1:2),g+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},er=class s extends gs{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};function $f(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=ru(s,0,i,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=nd(s,t,r,e)),s.length>80*e){o=s[0],l=s[1];let u=o,h=l;for(let f=e;f<i;f+=e){let d=s[f],p=s[f+1];d<o&&(o=d),p<l&&(l=p),d>u&&(u=d),p>h&&(h=p)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return nr(r,a,e,o,l,c,0),a}function ru(s,t,e,n,i){let r;if(i===dd(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=oh(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=oh(a/n|0,s[a],s[a+1],r);return r&&_s(r,r.next)&&(sr(r),r=r.next),r}function Fi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(_s(e,e.next)||he(e.prev,e,e.next)===0)){if(sr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function nr(s,t,e,n,i,r,a){if(!s)return;!a&&r&&od(s,n,i,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?Qf(s,n,i,r):jf(s)){t.push(l.i,s.i,c.i),sr(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=td(Fi(s),t),nr(s,t,e,n,i,r,2)):a===2&&ed(s,t,e,n,i,r):nr(Fi(s),t,e,n,i,r,1);break}}}function jf(s){let t=s.prev,e=s,n=s.next;if(he(t,e,n)>=0)return!1;let i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,u=Math.min(i,r,a),h=Math.min(o,l,c),f=Math.max(i,r,a),d=Math.max(o,l,c),p=n.next;for(;p!==t;){if(p.x>=u&&p.x<=f&&p.y>=h&&p.y<=d&&Ns(i,o,r,l,a,c,p.x,p.y)&&he(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Qf(s,t,e,n){let i=s.prev,r=s,a=s.next;if(he(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,u=i.y,h=r.y,f=a.y,d=Math.min(o,l,c),p=Math.min(u,h,f),_=Math.max(o,l,c),m=Math.max(u,h,f),g=dl(d,p,t,e,n),A=dl(_,m,t,e,n),M=s.prevZ,x=s.nextZ;for(;M&&M.z>=g&&x&&x.z<=A;){if(M.x>=d&&M.x<=_&&M.y>=p&&M.y<=m&&M!==i&&M!==a&&Ns(o,u,l,h,c,f,M.x,M.y)&&he(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=d&&x.x<=_&&x.y>=p&&x.y<=m&&x!==i&&x!==a&&Ns(o,u,l,h,c,f,x.x,x.y)&&he(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=g;){if(M.x>=d&&M.x<=_&&M.y>=p&&M.y<=m&&M!==i&&M!==a&&Ns(o,u,l,h,c,f,M.x,M.y)&&he(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=A;){if(x.x>=d&&x.x<=_&&x.y>=p&&x.y<=m&&x!==i&&x!==a&&Ns(o,u,l,h,c,f,x.x,x.y)&&he(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function td(s,t){let e=s;do{let n=e.prev,i=e.next.next;!_s(n,i)&&ou(n,e,e.next,i)&&ir(n,i)&&ir(i,n)&&(t.push(n.i,e.i,i.i),sr(e),sr(e.next),e=s=i),e=e.next}while(e!==s);return Fi(e)}function ed(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&hd(a,o)){let l=lu(a,o);a=Fi(a,a.next),l=Fi(l,l.next),nr(a,t,e,n,i,r,0),nr(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function nd(s,t,e,n){let i=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=ru(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(cd(c))}i.sort(id);for(let r=0;r<i.length;r++)e=sd(i[r],e);return e}function id(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function sd(s,t){let e=rd(s,t);if(!e)return t;let n=lu(e,s);return Fi(n,n.next),Fi(e,e.next)}function rd(s,t){let e=t,n=s.x,i=s.y,r=-1/0,a;if(_s(s,e))return e;do{if(_s(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let h=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=n&&h>r&&(r=h,a=e.x<e.next.x?e:e.next,h===n))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&au(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){let h=Math.abs(i-e.y)/(n-e.x);ir(e,s)&&(h<u||h===u&&(e.x>a.x||e.x===a.x&&ad(a,e)))&&(a=e,u=h)}e=e.next}while(e!==o);return a}function ad(s,t){return he(s.prev,s,t.prev)<0&&he(t.next,s,s.next)<0}function od(s,t,e,n){let i=s;do i.z===0&&(i.z=dl(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,ld(i)}function ld(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function dl(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function cd(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function au(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Ns(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&au(s,t,e,n,i,r,a,o)}function hd(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!ud(s,t)&&(ir(s,t)&&ir(t,s)&&fd(s,t)&&(he(s.prev,s,t.prev)||he(s,t.prev,t))||_s(s,t)&&he(s.prev,s,s.next)>0&&he(t.prev,t,t.next)>0)}function he(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function _s(s,t){return s.x===t.x&&s.y===t.y}function ou(s,t,e,n){let i=na(he(s,t,e)),r=na(he(s,t,n)),a=na(he(e,n,s)),o=na(he(e,n,t));return!!(i!==r&&a!==o||i===0&&ea(s,e,t)||r===0&&ea(s,n,t)||a===0&&ea(e,s,n)||o===0&&ea(e,t,n))}function ea(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function na(s){return s>0?1:s<0?-1:0}function ud(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&ou(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function ir(s,t){return he(s.prev,s,s.next)<0?he(s,t,s.next)>=0&&he(s,s.prev,t)>=0:he(s,t,s.prev)<0||he(s,s.next,t)<0}function fd(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function lu(s,t){let e=pl(s.i,s.x,s.y),n=pl(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function oh(s,t,e,n){let i=pl(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function sr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function pl(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function dd(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var ml=class{static triangulate(t,e,n=2){return $f(t,e,n)}},xs=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];lh(t),ch(n,t);let a=t.length;e.forEach(lh);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,ch(n,e[l]);let o=ml.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function lh(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function ch(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var rr=class s extends Be{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,u=l+1,h=t/o,f=e/l,d=[],p=[],_=[],m=[];for(let g=0;g<u;g++){let A=g*f-a;for(let M=0;M<c;M++){let x=M*h-r;p.push(x,-A,0),_.push(0,0,1),m.push(M/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let A=0;A<o;A++){let M=A+c*g,x=A+c*(g+1),T=A+1+c*(g+1),b=A+1+c*g;d.push(M,x,b),d.push(x,T,b)}this.setIndex(d),this.setAttribute("position",new xe(p,3)),this.setAttribute("normal",new xe(_,3)),this.setAttribute("uv",new xe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var ar=class s extends Be{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],h=new L,f=new L,d=[],p=[],_=[],m=[];for(let g=0;g<=n;g++){let A=[],M=g/n,x=a+M*o,T=t*Math.cos(x),b=Math.sqrt(t*t-T*T),C=0;g===0&&a===0?C=.5/e:g===n&&l===Math.PI&&(C=-.5/e);for(let y=0;y<=e;y++){let w=y/e,R=i+w*r;h.x=-b*Math.cos(R),h.y=T,h.z=b*Math.sin(R),p.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(w+C,1-M),A.push(c++)}u.push(A)}for(let g=0;g<n;g++)for(let A=0;A<e;A++){let M=u[g][A+1],x=u[g][A],T=u[g+1][A],b=u[g+1][A+1];(g!==0||a>0)&&d.push(M,x,b),(g!==n-1||l<Math.PI)&&d.push(x,T,b)}this.setIndex(d),this.setAttribute("position",new xe(p,3)),this.setAttribute("normal",new xe(_,3)),this.setAttribute("uv",new xe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Vi(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(hh(i))i.isRenderTargetTexture?(Ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(hh(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function ke(s){let t={};for(let e=0;e<s.length;e++){let n=Vi(s[e]);for(let i in n)t[i]=n[i]}return t}function hh(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function pd(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function ql(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}var cu={clone:Vi,merge:ke},md=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qe=class extends oi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=md,this.fragmentShader=gd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Vi(t.uniforms),this.uniformsGroups=pd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new Nt().setHex(i.value);break;case"v2":this.uniforms[n].value=new It().fromArray(i.value);break;case"v3":this.uniforms[n].value=new L().fromArray(i.value);break;case"v4":this.uniforms[n].value=new ne().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Bt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Gt().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ma=class extends Qe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},vs=class extends oi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yo,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Oi=class extends vs{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new It(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Sa=class extends oi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ba=class extends oi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ia(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function _d(s){function t(i,r){return s[i]-s[r]}let e=s.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function uh(s,t,e){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=e[r]*t;for(let l=0;l!==t;++l)i[a++]=s[o+l]}return i}function xd(s,t,e,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(t.push(r.time),e.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(t.push(r.time),a.toArray(e,e.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(t.push(r.time),e.push(a)),r=s[i++];while(r!==void 0)}var ci=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];t:{e:{let a;n:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=e[++n],t<i)break e}a=e.length;break n}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break e}a=n,n=0;break n}break t}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let a=0;a!==i;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ta=class extends ci{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ci,endingEnd:Ci}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,a=t+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ri:r=t,o=2*e-n;break;case zs:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ri:a=t,l=2*n-e;break;case zs:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-e)/(i-e),_=p*p,m=_*p,g=-f*m+2*f*_-f*p,A=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*p+1,M=(-1-d)*m+(1.5+d)*_+.5*p,x=d*m-d*_;for(let T=0;T!==o;++T)r[T]=g*a[u+T]+A*a[c+T]+M*a[l+T]+x*a[h+T];return r}},or=class extends ci{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(n-e)/(i-e),h=1-u;for(let f=0;f!==o;++f)r[f]=a[c+f]*h+a[l+f]*u;return r}},Aa=class extends ci{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},wa=class extends ci{interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this.inTangents,h=this.outTangents;if(!u||!h){let p=(n-e)/(i-e),_=1-p;for(let m=0;m!==o;++m)r[m]=a[c+m]*_+a[l+m]*p;return r}let f=o*2,d=t-1;for(let p=0;p!==o;++p){let _=a[c+p],m=a[l+p],g=d*f+p*2,A=h[g],M=h[g+1],x=t*f+p*2,T=u[x],b=u[x+1],C=(n-e)/(i-e),y,w,R,P,I;for(let V=0;V<8;V++){y=C*C,w=y*C,R=1-C,P=R*R,I=P*R;let N=I*e+3*P*C*A+3*R*y*T+w*i-n;if(Math.abs(N)<1e-10)break;let G=3*P*(A-e)+6*R*C*(T-A)+3*y*(i-T);if(Math.abs(G)<1e-10)break;C=C-N/G,C=Math.max(0,Math.min(1,C))}r[p]=I*_+3*P*C*M+3*R*y*b+w*m}return r}},Xe=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ia(e,this.TimeBufferType),this.values=ia(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ia(t.times,Array),values:ia(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Aa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new or(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ta(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new wa(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Bs:e=this.InterpolantFactoryMethodDiscrete;break;case ga:e=this.InterpolantFactoryMethodLinear;break;case aa:e=this.InterpolantFactoryMethodSmooth;break;case hl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ct("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Bs;case this.InterpolantFactoryMethodLinear:return ga;case this.InterpolantFactoryMethodSmooth:return aa;case this.InterpolantFactoryMethodBezier:return hl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ut("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Ut("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ut("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Ut("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&pf(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){Ut("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===aa,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(i)l=!0;else{let h=o*n,f=h-n,d=h+n;for(let p=0;p!==n;++p){let _=e[h+p];if(_!==e[f+p]||_!==e[d+p]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let h=o*n,f=a*n;for(let d=0;d!==n;++d)e[f+d]=e[h+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Xe.prototype.ValueTypeName="";Xe.prototype.TimeBufferType=Float32Array;Xe.prototype.ValueBufferType=Float32Array;Xe.prototype.DefaultInterpolation=ga;var Xn=class extends Xe{constructor(t,e,n){super(t,e,n)}};Xn.prototype.ValueTypeName="bool";Xn.prototype.ValueBufferType=Array;Xn.prototype.DefaultInterpolation=Bs;Xn.prototype.InterpolantFactoryMethodLinear=void 0;Xn.prototype.InterpolantFactoryMethodSmooth=void 0;var lr=class extends Xe{constructor(t,e,n,i){super(t,e,n,i)}};lr.prototype.ValueTypeName="color";var ys=class extends Xe{constructor(t,e,n,i){super(t,e,n,i)}};ys.prototype.ValueTypeName="number";var Ea=class extends ci{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let u=c+o;c!==u;c+=4)be.slerpFlat(r,0,a,c-o,a,c,l);return r}},vn=class extends Xe{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Ea(this.times,this.values,this.getValueSize(),t)}};vn.prototype.ValueTypeName="quaternion";vn.prototype.InterpolantFactoryMethodSmooth=void 0;var qn=class extends Xe{constructor(t,e,n){super(t,e,n)}};qn.prototype.ValueTypeName="string";qn.prototype.ValueBufferType=Array;qn.prototype.DefaultInterpolation=Bs;qn.prototype.InterpolantFactoryMethodLinear=void 0;qn.prototype.InterpolantFactoryMethodSmooth=void 0;var fn=class extends Xe{constructor(t,e,n,i){super(t,e,n,i)}};fn.prototype.ValueTypeName="vector";var hi=class{constructor(t="",e=-1,n=[],i=vo){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=vi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,i=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(yd(n[a]).scale(i));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){let e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,a=n.length;r!==a;++r)e.push(Xe.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){let r=e.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let u=_d(l);l=uh(l,1,u),c=uh(c,1,u),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new ys(".morphTargetInfluences["+e[o].name+"]",l,c).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=t.length;o<l;o++){let c=t[o],u=c.name.match(r);if(u&&u.length>1){let h=u[1],f=i[h];f||(i[h]=f=[]),f.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],e,n));return a}resetDuration(){let t=this.tracks,e=0;for(let n=0,i=t.length;n!==i;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};function vd(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ys;case"vector":case"vector2":case"vector3":case"vector4":return fn;case"color":return lr;case"quaternion":return vn;case"bool":case"boolean":return Xn;case"string":return qn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function yd(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=vd(s.type);if(s.times===void 0){let e=[],n=[];xd(s.keys,e,n,"value"),s.times=e,s.values=n}return t.parse!==void 0?t.parse(s):new t(s.name,s.times,s.values,s.interpolation)}var gl={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(fh(s)||(this.files[s]=t))},get:function(s){if(this.enabled!==!1&&!fh(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function fh(s){try{let t=s.slice(s.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var Ca=class{constructor(t,e,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&i.onStart!==void 0&&i.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){let d=c[h],p=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},hu=new Ca,Bi=class{constructor(t){this.manager=t!==void 0?t:hu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Bi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vn={},_l=class extends Error{constructor(t,e){super(t),this.response=e}},cr=class extends Bi{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=gl.get(`file:${t}`);if(r!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0);return}if(Vn[t]!==void 0){Vn[t].push({onLoad:e,onProgress:n,onError:i});return}Vn[t]=[],Vn[t].push({onLoad:e,onProgress:n,onError:i});let a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ct("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Vn[t],h=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,p=d!==0,_=0,m=new ReadableStream({start(g){A();function A(){h.read().then(({done:M,value:x})=>{if(M)g.close();else{_+=x.byteLength;let T=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:d});for(let b=0,C=u.length;b<C;b++){let y=u[b];y.onProgress&&y.onProgress(T)}g.enqueue(x),A()}},M=>{g.error(M)})}}});return new Response(m)}else throw new _l(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{gl.add(`file:${t}`,c);let u=Vn[t];delete Vn[t];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onLoad&&d.onLoad(c)}}).catch(c=>{let u=Vn[t];if(u===void 0)throw this.manager.itemError(t),c;delete Vn[t];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ui=class extends pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var ll=new Gt,dh=new L,ph=new L,hr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.mapType=qe,this.map=null,this.mapPass=null,this.matrix=new Gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ms,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;dh.setFromMatrixPosition(t.matrixWorld),e.position.copy(dh),ph.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ph),e.updateMatrixWorld(),ll.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ll,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===hs||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ll)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},sa=new L,ra=new be,Rn=new L,ur=class extends pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(sa,ra,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sa,ra,Rn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(sa,ra,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sa,ra,Rn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ii=new L,mh=new It,gh=new It,Se=class extends ur{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ui*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Fs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ui*2*Math.atan(Math.tan(Fs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,mh,gh),e.subVectors(gh,mh)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Fs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},xl=class extends hr{constructor(){super(new Se(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=Ui*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},fr=class extends ui{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new xl}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}},vl=class extends hr{constructor(){super(new Se(90,1,.5,500)),this.isPointLightShadow=!0}},dr=class extends ui{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new vl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},fi=class extends ur{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},yl=class extends hr{constructor(){super(new fi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Yn=class extends ui{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.shadow=new yl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},pr=class extends ui{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}},Ms=class extends ui{constructor(t,e,n=10,i=10){super(t,e),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){let e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}};var zi=class{static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}};var rs=-90,as=1,Ra=class extends pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Se(rs,as,t,e);i.layers=this.layers,this.add(i);let r=new Se(rs,as,t,e);r.layers=this.layers,this.add(r);let a=new Se(rs,as,t,e);a.layers=this.layers,this.add(a);let o=new Se(rs,as,t,e);o.layers=this.layers,this.add(o);let l=new Se(rs,as,t,e);l.layers=this.layers,this.add(l);let c=new Se(rs,as,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Pa=class extends Se{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Ia=class{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,r,a;switch(e){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){let n=this.buffer,i=this.valueSize,r=t*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=e}else{a+=e;let o=e/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(t){let e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){let e=this.valueSize,n=this.buffer,i=t*e+e,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=e*this._origIndex;this._mixBufferRegion(n,i,l,1-r,e)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){o.setValue(n,i);break}}saveOriginalState(){let t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let r=n,a=i;r!==a;++r)e[r]=e[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){let t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)t[e+a]=t[n+a]}_slerp(t,e,n,i){be.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,r){let a=this._workIndex*r;be.multiplyQuaternionsFlat(t,a,t,e,t,n),be.slerpFlat(t,e,t,e,t,a,i)}_lerp(t,e,n,i,r){let a=1-i;for(let o=0;o!==r;++o){let l=e+o;t[l]=t[l]*a+t[n+o]*i}}_lerpAdditive(t,e,n,i,r){for(let a=0;a!==r;++a){let o=e+a;t[o]=t[o]+t[n+a]*i}}},Yl="\\[\\]\\.:\\/",Md=new RegExp("["+Yl+"]","g"),Zl="[^"+Yl+"]",Sd="[^"+Yl.replace("\\.","")+"]",bd=/((?:WC+[\/:])*)/.source.replace("WC",Zl),Td=/(WCOD+)?/.source.replace("WCOD",Sd),Ad=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zl),wd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zl),Ed=new RegExp("^"+bd+Td+Ad+wd+"$"),Cd=["material","materials","bones","map"],Ml=class{constructor(t,e,n){let i=n||ce.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ce=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Md,"")}static parseTrackName(t){let e=Ed.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Cd.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ct("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Ut("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ut("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ut("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ut("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ut("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ut("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Ut("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;Ut("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Ut("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ut("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ce.Composite=Ml;ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ce.prototype.GetterByBindingType=[ce.prototype._getValue_direct,ce.prototype._getValue_array,ce.prototype._getValue_arrayElement,ce.prototype._getValue_toArray];ce.prototype.SetterByBindingTypeAndVersioning=[[ce.prototype._setValue_direct,ce.prototype._setValue_direct_setNeedsUpdate,ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_array,ce.prototype._setValue_array_setNeedsUpdate,ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_arrayElement,ce.prototype._setValue_arrayElement_setNeedsUpdate,ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_fromArray,ce.prototype._setValue_fromArray_setNeedsUpdate,ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Da=class{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;let r=e.tracks,a=r.length,o=new Array(a),l={endingStart:Ci,endingEnd:Ci};for(let c=0;c!==a;++c){let u=r[c].createInterpolant(null);o[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Hh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n=!1){if(t.fadeOut(e),this.fadeIn(e),n===!0){let i=this._clip.duration,r=t._clip.duration,a=r/i,o=i/r;t._restoreTimeScale=t.timeScale,this._restoreTimeScale=this.timeScale,t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n=!1){return t.crossFadeFrom(this,e,n)}stopFading(){let t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){let i=this._mixer,r=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=t/a,c[1]=e/a,this}stopWarping(){let t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}let r=this._startTime;if(r!==null){let l=(t-r)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);let a=this._updateTime(e),o=this._updateWeight(t);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Xh:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case vo:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulate(i,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(e===0?this.paused=!0:(this._restoreTimeScale!==null&&(e=this._restoreTimeScale),this.timeScale=e),this.stopWarping())}}return this._effectiveTimeScale=e,e}_updateTime(t){let e=this._clip.duration,n=this.loop,i=this.time+t,r=this._loopCount,a=n===Wh;if(t===0)return r===-1?i:a&&(r&1)===1?e-i:i;if(n===Gh){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=e||i<0){let o=Math.floor(i/e);i-=e*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){let c=t<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=i;if(a&&(r&1)===1)return e-i}return i}_setEndings(t,e,n){let i=this._interpolantSettings;n?(i.endingStart=Ri,i.endingEnd=Ri):(t?i.endingStart=this.zeroSlopeAtStart?Ri:Ci:i.endingStart=zs,e?i.endingEnd=this.zeroSlopeAtEnd?Ri:Ci:i.endingEnd=zs)}_scheduleFading(t,e,n){let i=this._mixer,r=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=e,o[1]=r+t,l[1]=n,this}},Rd=new Float32Array(1),mr=class extends hn{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(t,e){let n=t._localRoot||this._root,i=t._clip.tracks,r=i.length,a=t._propertyBindings,o=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==r;++h){let f=i[h],d=f.name,p=u[d];if(p!==void 0)++p.referenceCount,a[h]=p;else{if(p=a[h],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,d));continue}let _=e&&e._propertyBindings[h].binding.parsedPath;p=new Ia(ce.create(n,d,_),f.ValueTypeName,f.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,d),a[h]=p}o[h].resultBuffer=p.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){let n=(t._localRoot||this._root).uuid,i=t._clip.uuid,r=this._actionsByClip[i];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,i,n)}let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){let e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){let i=this._actions,r=this._actionsByClip,a=r[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=a;else{let o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=i.length,i.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){let e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;let r=t._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],u=t._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),t._byClipCacheIndex=null;let h=o.actionByRoot,f=(t._localRoot||this._root).uuid;delete h[f],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){let e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){let e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){let i=this._bindingsByRootAndName,r=this._bindings,a=i[e];a===void 0&&(a={},i[e]=a),a[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){let e=this._bindings,n=t.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(t){let e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){let e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){let t=this._controlInterpolants,e=this._nActiveControlInterpolants++,n=t[e];return n===void 0&&(n=new or(new Float32Array(2),new Float32Array(2),1,Rd),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){let e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,r=e[i];t.__cacheIndex=i,e[i]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){let i=e||this._root,r=i.uuid,a=typeof t=="string"?hi.findByName(i,t):t,o=a!==null?a.uuid:t,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=vo),l!==void 0){let h=l.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let u=new Da(this,a,e,n);return this._bindAction(u,c),this._addInactiveAction(u,o,r),u}existingAction(t,e){let n=e||this._root,i=n.uuid,r=typeof t=="string"?hi.findByName(n,t):t,a=r?r.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;let e=this._actions,n=this._nActiveActions,i=this.time+=t,r=Math.sign(t),a=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){let e=this._actions,n=t.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let u=c._cacheIndex,h=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,e[u]=h,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){let e=t.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[e];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){let n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var gr=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ct("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}},Ss=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Xt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Sl=class s{static{s.prototype.isMatrix2=!0}constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};var _r=class extends hn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Ct("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Jl(s,t,e,n){let i=Pd(n);switch(e){case zl:return s*t;case Vl:return s*t/i.components*i.byteLength;case za:return s*t/i.components*i.byteLength;case xi:return s*t*2/i.components*i.byteLength;case ka:return s*t*2/i.components*i.byteLength;case kl:return s*t*3/i.components*i.byteLength;case en:return s*t*4/i.components*i.byteLength;case Va:return s*t*4/i.components*i.byteLength;case Sr:case br:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Tr:case Ar:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ha:case Xa:return Math.max(s,16)*Math.max(t,8)/4;case Ga:case Wa:return Math.max(s,8)*Math.max(t,8)/2;case qa:case Ya:case Ja:case Ka:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Za:case wr:case $a:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ja:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Qa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case to:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case eo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case no:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case io:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case so:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ro:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case ao:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case oo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case lo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case co:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case ho:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case uo:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case fo:case po:case mo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case go:case _o:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Er:case xo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Pd(s){switch(s){case qe:case Nl:return{byteLength:1,components:1};case Ts:case Fl:case Dn:return{byteLength:2,components:1};case Oa:case Ba:return{byteLength:2,components:4};case Mn:case Fa:case dn:return{byteLength:4,components:1};case Ol:case Bl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Lu(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Dd(s){let t=new WeakMap;function e(o,l){let c=o.array,u=o.usage,h=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){let u=l.array,h=l.updateRanges;if(s.bindBuffer(c,o),h.length===0)s.bufferSubData(c,0,u);else{h.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<h.length;d++){let p=h[f],_=h[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,p=h.length;d<p;d++){let _=h[d];s.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var Ld=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ud=`#ifdef USE_ALPHAHASH
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
#endif`,Nd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Od=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zd=`#ifdef USE_AOMAP
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
#endif`,kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vd=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Gd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qd=`#ifdef USE_IRIDESCENCE
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
#endif`,Yd=`#ifdef USE_BUMPMAP
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
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Qd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ep=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,np=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,ip=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sp=`vec3 transformedNormal = objectNormal;
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
#endif`,rp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ap=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,op=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cp="gl_FragColor = linearToOutputTexel( gl_FragColor );",hp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,up=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,fp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,dp=`#ifdef USE_ENVMAP
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
#endif`,pp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_p=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yp=`#ifdef USE_GRADIENTMAP
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
}`,Mp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tp=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#endif
#include <lightprobes_pars_fragment>`,Ap=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
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
#endif`,wp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ep=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,Ip=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
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
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Dp=`
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
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Lp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
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
#endif`,Up=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Np=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Fp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Op=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Hp=`#if defined( USE_POINTS_UV )
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
#endif`,Wp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jp=`#ifdef USE_MORPHTARGETS
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
#endif`,Kp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,jp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,em=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,nm=`#ifdef USE_NORMALMAP
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
#endif`,im=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,am=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,om=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,cm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,um=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,gm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_m=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
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
#endif`,xm=`float getShadowMask() {
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,vm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ym=`#ifdef USE_SKINNING
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
#endif`,Mm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sm=`#ifdef USE_SKINNING
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
#endif`,bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Am=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Em=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Cm=`#ifdef USE_TRANSMISSION
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
#endif`,Rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Lm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Um=`uniform sampler2D t2D;
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
}`,Nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zm=`#include <common>
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
}`,km=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Vm=`#define DISTANCE
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
}`,Gm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xm=`uniform float scale;
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
}`,qm=`uniform vec3 diffuse;
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
}`,Ym=`#include <common>
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
}`,Zm=`uniform vec3 diffuse;
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
}`,Jm=`#define LAMBERT
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
}`,Km=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,$m=`#define MATCAP
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
}`,jm=`#define MATCAP
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
}`,Qm=`#define NORMAL
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
}`,tg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,eg=`#define PHONG
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
}`,ng=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,ig=`#define STANDARD
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
}`,sg=`#define STANDARD
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,rg=`#define TOON
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
}`,ag=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,og=`uniform float size;
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
}`,lg=`uniform vec3 diffuse;
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
}`,cg=`#include <common>
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
}`,hg=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,ug=`uniform float rotation;
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
}`,fg=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:Ld,alphahash_pars_fragment:Ud,alphamap_fragment:Nd,alphamap_pars_fragment:Fd,alphatest_fragment:Od,alphatest_pars_fragment:Bd,aomap_fragment:zd,aomap_pars_fragment:kd,batching_pars_vertex:Vd,batching_vertex:Gd,begin_vertex:Hd,beginnormal_vertex:Wd,bsdfs:Xd,iridescence_fragment:qd,bumpmap_pars_fragment:Yd,clipping_planes_fragment:Zd,clipping_planes_pars_fragment:Jd,clipping_planes_pars_vertex:Kd,clipping_planes_vertex:$d,color_fragment:jd,color_pars_fragment:Qd,color_pars_vertex:tp,color_vertex:ep,common:np,cube_uv_reflection_fragment:ip,defaultnormal_vertex:sp,displacementmap_pars_vertex:rp,displacementmap_vertex:ap,emissivemap_fragment:op,emissivemap_pars_fragment:lp,colorspace_fragment:cp,colorspace_pars_fragment:hp,envmap_fragment:up,envmap_common_pars_fragment:fp,envmap_pars_fragment:dp,envmap_pars_vertex:pp,envmap_physical_pars_fragment:Ap,envmap_vertex:mp,fog_vertex:gp,fog_pars_vertex:_p,fog_fragment:xp,fog_pars_fragment:vp,gradientmap_pars_fragment:yp,lightmap_pars_fragment:Mp,lights_lambert_fragment:Sp,lights_lambert_pars_fragment:bp,lights_pars_begin:Tp,lights_toon_fragment:wp,lights_toon_pars_fragment:Ep,lights_phong_fragment:Cp,lights_phong_pars_fragment:Rp,lights_physical_fragment:Pp,lights_physical_pars_fragment:Ip,lights_fragment_begin:Dp,lights_fragment_maps:Lp,lights_fragment_end:Up,lightprobes_pars_fragment:Np,logdepthbuf_fragment:Fp,logdepthbuf_pars_fragment:Op,logdepthbuf_pars_vertex:Bp,logdepthbuf_vertex:zp,map_fragment:kp,map_pars_fragment:Vp,map_particle_fragment:Gp,map_particle_pars_fragment:Hp,metalnessmap_fragment:Wp,metalnessmap_pars_fragment:Xp,morphinstance_vertex:qp,morphcolor_vertex:Yp,morphnormal_vertex:Zp,morphtarget_pars_vertex:Jp,morphtarget_vertex:Kp,normal_fragment_begin:$p,normal_fragment_maps:jp,normal_pars_fragment:Qp,normal_pars_vertex:tm,normal_vertex:em,normalmap_pars_fragment:nm,clearcoat_normal_fragment_begin:im,clearcoat_normal_fragment_maps:sm,clearcoat_pars_fragment:rm,iridescence_pars_fragment:am,opaque_fragment:om,packing:lm,premultiplied_alpha_fragment:cm,project_vertex:hm,dithering_fragment:um,dithering_pars_fragment:fm,roughnessmap_fragment:dm,roughnessmap_pars_fragment:pm,shadowmap_pars_fragment:mm,shadowmap_pars_vertex:gm,shadowmap_vertex:_m,shadowmask_pars_fragment:xm,skinbase_vertex:vm,skinning_pars_vertex:ym,skinning_vertex:Mm,skinnormal_vertex:Sm,specularmap_fragment:bm,specularmap_pars_fragment:Tm,tonemapping_fragment:Am,tonemapping_pars_fragment:wm,transmission_fragment:Em,transmission_pars_fragment:Cm,uv_pars_fragment:Rm,uv_pars_vertex:Pm,uv_vertex:Im,worldpos_vertex:Dm,background_vert:Lm,background_frag:Um,backgroundCube_vert:Nm,backgroundCube_frag:Fm,cube_vert:Om,cube_frag:Bm,depth_vert:zm,depth_frag:km,distance_vert:Vm,distance_frag:Gm,equirect_vert:Hm,equirect_frag:Wm,linedashed_vert:Xm,linedashed_frag:qm,meshbasic_vert:Ym,meshbasic_frag:Zm,meshlambert_vert:Jm,meshlambert_frag:Km,meshmatcap_vert:$m,meshmatcap_frag:jm,meshnormal_vert:Qm,meshnormal_frag:tg,meshphong_vert:eg,meshphong_frag:ng,meshphysical_vert:ig,meshphysical_frag:sg,meshtoon_vert:rg,meshtoon_frag:ag,points_vert:og,points_frag:lg,shadow_vert:cg,shadow_frag:hg,sprite_vert:ug,sprite_frag:fg},dt={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},Un={basic:{uniforms:ke([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:ke([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Nt(0)},envMapIntensity:{value:1}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:ke([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:ke([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:ke([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:ke([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:ke([dt.points,dt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:ke([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:ke([dt.common,dt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:ke([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:ke([dt.sprite,dt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distance:{uniforms:ke([dt.common,dt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distance_vert,fragmentShader:Ht.distance_frag},shadow:{uniforms:ke([dt.lights,dt.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};Un.physical={uniforms:ke([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};var bo={r:0,b:0,g:0},dg=new Gt,Uu=new Bt;Uu.set(-1,0,0,0,1,0,0,0,1);function pg(s,t,e,n,i,r){let a=new Nt(0),o=i===!0?0:1,l,c,u=null,h=0,f=null;function d(A){let M=A.isScene===!0?A.background:null;if(M&&M.isTexture){let x=A.backgroundBlurriness>0;M=t.get(M,x)}return M}function p(A){let M=!1,x=d(A);x===null?m(a,o):x&&x.isColor&&(m(x,1),M=!0);let T=s.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(A,M){let x=d(M);x&&(x.isCubeTexture||x.mapping===yr)?(c===void 0&&(c=new ze(new li(1,1,1),new Qe({name:"BackgroundCubeMaterial",uniforms:Vi(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(dg.makeRotationFromEuler(M.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Uu),c.material.toneMapped=Yt.getTransfer(x.colorSpace)!==Qt,(u!==x||h!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=x,h=x.version,f=s.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ze(new rr(2,2),new Qe({name:"BackgroundMaterial",uniforms:Vi(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Yt.getTransfer(x.colorSpace)!==Qt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||h!==x.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=x,h=x.version,f=s.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function m(A,M){A.getRGB(bo,ql(s)),e.buffers.color.setClear(bo.r,bo.g,bo.b,M,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,M=1){a.set(A),o=M,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,m(a,o)},render:p,addToRenderList:_,dispose:g}}function mg(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null),r=i,a=!1;function o(P,I,V,W,N){let G=!1,X=h(P,W,V,I);r!==X&&(r=X,c(r.object)),G=d(P,W,V,N),G&&p(P,W,V,N),N!==null&&t.update(N,s.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,x(P,I,V,W),N!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function l(){return s.createVertexArray()}function c(P){return s.bindVertexArray(P)}function u(P){return s.deleteVertexArray(P)}function h(P,I,V,W){let N=W.wireframe===!0,G=n[I.id];G===void 0&&(G={},n[I.id]=G);let X=P.isInstancedMesh===!0?P.id:0,$=G[X];$===void 0&&($={},G[X]=$);let Q=$[V.id];Q===void 0&&(Q={},$[V.id]=Q);let st=Q[N];return st===void 0&&(st=f(l()),Q[N]=st),st}function f(P){let I=[],V=[],W=[];for(let N=0;N<e;N++)I[N]=0,V[N]=0,W[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:W,object:P,attributes:{},index:null}}function d(P,I,V,W){let N=r.attributes,G=I.attributes,X=0,$=V.getAttributes();for(let Q in $)if($[Q].location>=0){let rt=N[Q],lt=G[Q];if(lt===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(lt=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(lt=P.instanceColor)),rt===void 0||rt.attribute!==lt||lt&&rt.data!==lt.data)return!0;X++}return r.attributesNum!==X||r.index!==W}function p(P,I,V,W){let N={},G=I.attributes,X=0,$=V.getAttributes();for(let Q in $)if($[Q].location>=0){let rt=G[Q];rt===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(rt=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(rt=P.instanceColor));let lt={};lt.attribute=rt,rt&&rt.data&&(lt.data=rt.data),N[Q]=lt,X++}r.attributes=N,r.attributesNum=X,r.index=W}function _(){let P=r.newAttributes;for(let I=0,V=P.length;I<V;I++)P[I]=0}function m(P){g(P,0)}function g(P,I){let V=r.newAttributes,W=r.enabledAttributes,N=r.attributeDivisors;V[P]=1,W[P]===0&&(s.enableVertexAttribArray(P),W[P]=1),N[P]!==I&&(s.vertexAttribDivisor(P,I),N[P]=I)}function A(){let P=r.newAttributes,I=r.enabledAttributes;for(let V=0,W=I.length;V<W;V++)I[V]!==P[V]&&(s.disableVertexAttribArray(V),I[V]=0)}function M(P,I,V,W,N,G,X){X===!0?s.vertexAttribIPointer(P,I,V,N,G):s.vertexAttribPointer(P,I,V,W,N,G)}function x(P,I,V,W){_();let N=W.attributes,G=V.getAttributes(),X=I.defaultAttributeValues;for(let $ in G){let Q=G[$];if(Q.location>=0){let st=N[$];if(st===void 0&&($==="instanceMatrix"&&P.instanceMatrix&&(st=P.instanceMatrix),$==="instanceColor"&&P.instanceColor&&(st=P.instanceColor)),st!==void 0){let rt=st.normalized,lt=st.itemSize,zt=t.get(st);if(zt===void 0)continue;let Zt=zt.buffer,Ft=zt.type,q=zt.bytesPerElement,nt=Ft===s.INT||Ft===s.UNSIGNED_INT||st.gpuType===Fa;if(st.isInterleavedBufferAttribute){let tt=st.data,et=tt.stride,St=st.offset;if(tt.isInstancedInterleavedBuffer){for(let vt=0;vt<Q.locationSize;vt++)g(Q.location+vt,tt.meshPerAttribute);P.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let vt=0;vt<Q.locationSize;vt++)m(Q.location+vt);s.bindBuffer(s.ARRAY_BUFFER,Zt);for(let vt=0;vt<Q.locationSize;vt++)M(Q.location+vt,lt/Q.locationSize,Ft,rt,et*q,(St+lt/Q.locationSize*vt)*q,nt)}else{if(st.isInstancedBufferAttribute){for(let tt=0;tt<Q.locationSize;tt++)g(Q.location+tt,st.meshPerAttribute);P.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let tt=0;tt<Q.locationSize;tt++)m(Q.location+tt);s.bindBuffer(s.ARRAY_BUFFER,Zt);for(let tt=0;tt<Q.locationSize;tt++)M(Q.location+tt,lt/Q.locationSize,Ft,rt,lt*q,lt/Q.locationSize*tt*q,nt)}}else if(X!==void 0){let rt=X[$];if(rt!==void 0)switch(rt.length){case 2:s.vertexAttrib2fv(Q.location,rt);break;case 3:s.vertexAttrib3fv(Q.location,rt);break;case 4:s.vertexAttrib4fv(Q.location,rt);break;default:s.vertexAttrib1fv(Q.location,rt)}}}}A()}function T(){w();for(let P in n){let I=n[P];for(let V in I){let W=I[V];for(let N in W){let G=W[N];for(let X in G)u(G[X].object),delete G[X];delete W[N]}}delete n[P]}}function b(P){if(n[P.id]===void 0)return;let I=n[P.id];for(let V in I){let W=I[V];for(let N in W){let G=W[N];for(let X in G)u(G[X].object),delete G[X];delete W[N]}}delete n[P.id]}function C(P){for(let I in n){let V=n[I];for(let W in V){let N=V[W];if(N[P.id]===void 0)continue;let G=N[P.id];for(let X in G)u(G[X].object),delete G[X];delete N[P.id]}}}function y(P){for(let I in n){let V=n[I],W=P.isInstancedMesh===!0?P.id:0,N=V[W];if(N!==void 0){for(let G in N){let X=N[G];for(let $ in X)u(X[$].object),delete X[$];delete N[G]}delete V[W],Object.keys(V).length===0&&delete n[I]}}}function w(){R(),a=!0,r!==i&&(r=i,c(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:w,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:A}}function gg(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,u){u!==0&&(s.drawArraysInstanced(n,l,c,u),e.update(c,n,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let f=0;for(let d=0;d<u;d++)f+=c[d];e.update(f,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function _g(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==en&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let y=C===Dn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==qe&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==dn&&!y)}function l(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(Ct("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Ct("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),A=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),T=s.getParameter(s.MAX_SAMPLES),b=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:A,maxVaryings:M,maxFragmentUniforms:x,maxSamples:T,samples:b}}function xg(s){let t=this,e=null,n=0,i=!1,r=!1,a=new on,o=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){let p=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,g=s.get(h);if(!i||p===null||p.length===0||r&&!m)r?u(null):c();else{let A=r?0:n,M=A*4,x=g.clippingState||null;l.value=x,x=u(p,f,M,d);for(let T=0;T!==M;++T)x[T]=e[T];g.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,p){let _=h!==null?h.length:0,m=null;if(_!==0){if(m=l.value,p!==!0||m===null){let g=d+_*4,A=f.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<g)&&(m=new Float32Array(g));for(let M=0,x=d;M!==_;++M,x+=4)a.copy(h[M]).applyMatrix4(A,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}var yi=4,uu=[.125,.215,.35,.446,.526,.582],Gi=20,vg=256,Cr=new fi,fu=new Nt,Kl=null,$l=0,jl=0,Ql=!1,yg=new L,Ao=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:a=256,position:o=yg}=r;Kl=this._renderer.getRenderTarget(),$l=this._renderer.getActiveCubeFace(),jl=this._renderer.getActiveMipmapLevel(),Ql=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Kl,$l,jl),this._renderer.xr.enabled=Ql,t.scissorTest=!1,ws(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===mi||t.mapping===ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Kl=this._renderer.getRenderTarget(),$l=this._renderer.getActiveCubeFace(),jl=this._renderer.getActiveMipmapLevel(),Ql=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:De,minFilter:De,generateMipmaps:!1,type:Dn,format:en,colorSpace:ks,depthBuffer:!1},i=du(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=du(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Mg(r)),this._blurMaterial=bg(r,t,e),this._ggxMaterial=Sg(r,t,e)}return i}_compileMaterial(t){let e=new ze(new Be,t);this._renderer.compile(e,Cr)}_sceneToCubeUV(t,e,n,i,r){let l=new Se(90,1,e,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(fu),h.toneMapping=yn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ze(new li,new Zs({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,g=!1,A=t.background;A?A.isColor&&(m.color.copy(A),t.background=null,g=!0):(m.color.copy(fu),g=!0);for(let M=0;M<6;M++){let x=M%3;x===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[M],r.y,r.z)):x===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[M]));let T=this._cubeSize;ws(i,x*T,M>2?T:0,T,T),h.setRenderTarget(i),g&&h.render(_,l),h.render(t,l)}h.toneMapping=d,h.autoClear=f,t.background=A}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===mi||t.mapping===ki;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=mu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pu());let r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;ws(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Cr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),f=0+c*1.25,d=h*f,{_lodMax:p}=this,_=this._sizeLods[n],m=3*_*(n>p-yi?n-p+yi:0),g=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=p-e,ws(r,m,g,3*_,2*_),i.setRenderTarget(r),i.render(o,Cr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,ws(t,m,g,3*_,2*_),i.setRenderTarget(t),i.render(o,Cr)}_blur(t,e,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ut("blur direction must be either latitudinal or longitudinal!");let u=3,h=this._lodMeshes[i];h.material=c;let f=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Gi-1),_=r/p,m=isFinite(r)?1+Math.floor(u*_):Gi;m>Gi&&Ct(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gi}`);let g=[],A=0;for(let C=0;C<Gi;++C){let y=C/_,w=Math.exp(-y*y/2);g.push(w),C===0?A+=w:C<m&&(A+=2*w)}for(let C=0;C<g.length;C++)g[C]=g[C]/A;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=g,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:M}=this;f.dTheta.value=p,f.mipInt.value=M-n;let x=this._sizeLods[i],T=3*x*(i>M-yi?i-M+yi:0),b=4*(this._cubeSize-x);ws(e,T,b,3*x,2*x),l.setRenderTarget(e),l.render(h,Cr)}};function Mg(s){let t=[],e=[],n=[],i=s,r=s-yi+1+uu.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);t.push(o);let l=1/o;a>s-yi?l=uu[a-s+yi-1]:a===0&&(l=0),e.push(l);let c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,p=6,_=3,m=2,g=1,A=new Float32Array(_*p*d),M=new Float32Array(m*p*d),x=new Float32Array(g*p*d);for(let b=0;b<d;b++){let C=b%3*2/3-1,y=b>2?0:-1,w=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];A.set(w,_*p*b),M.set(f,m*p*b);let R=[b,b,b,b,b,b];x.set(R,g*p*b)}let T=new Be;T.setAttribute("position",new te(A,_)),T.setAttribute("uv",new te(M,m)),T.setAttribute("faceIndex",new te(x,g)),n.push(new ze(T,null)),i>yi&&i--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function du(s,t,e){let n=new $e(s,t,e);return n.texture.mapping=yr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ws(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Sg(s,t,e){return new Qe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:vg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Co(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function bg(s,t,e){let n=new Float32Array(Gi),i=new L(0,1,0);return new Qe({name:"SphericalGaussianBlur",defines:{n:Gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Co(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function pu(){return new Qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Co(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function mu(){return new Qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function Co(){return`

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
	`}var wo=class extends $e{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new js(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new li(5,5,5),r=new Qe({name:"CubemapFromEquirect",uniforms:Vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:In});r.uniforms.tEquirect.value=e;let a=new ze(i,r),o=e.minFilter;return e.minFilter===gi&&(e.minFilter=De),new Ra(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}};function Tg(s){let t=new WeakMap,e=new WeakMap,n=null;function i(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===La||d===Ua)if(t.has(f)){let p=t.get(f).texture;return o(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let _=new wo(p.height);return _.fromEquirectangularTexture(s,f),t.set(f,_),f.addEventListener("dispose",c),o(_.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){let d=f.mapping,p=d===La||d===Ua,_=d===mi||d===ki;if(p||_){let m=e.get(f),g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new Ao(s)),m=p?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{let A=f.image;return p&&A&&A.height>0||_&&A&&l(A)?(n===null&&(n=new Ao(s)),m=p?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function o(f,d){return d===La?f.mapping=mi:d===Ua&&(f.mapping=ki),f}function l(f){let d=0,p=6;for(let _=0;_<p;_++)f[_]!==void 0&&d++;return d===p}function c(f){let d=f.target;d.removeEventListener("dispose",c);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function u(f){let d=f.target;d.removeEventListener("dispose",u);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function h(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:h}}function Ag(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Pi("WebGLRenderer: "+n+" extension not supported."),i}}}function wg(s,t,e,n){let i={},r=new WeakMap;function a(h){let f=h.target;f.index!==null&&t.remove(f.index);for(let p in f.attributes)t.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete i[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(h,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function l(h){let f=h.attributes;for(let d in f)t.update(f[d],s.ARRAY_BUFFER)}function c(h){let f=[],d=h.index,p=h.attributes.position,_=0;if(p===void 0)return;if(d!==null){let A=d.array;_=d.version;for(let M=0,x=A.length;M<x;M+=3){let T=A[M+0],b=A[M+1],C=A[M+2];f.push(T,b,b,C,C,T)}}else{let A=p.array;_=p.version;for(let M=0,x=A.length/3-1;M<x;M+=3){let T=M+0,b=M+1,C=M+2;f.push(T,b,b,C,C,T)}}let m=new(p.count>=65535?Ys:qs)(f,1);m.version=_;let g=r.get(h);g&&t.remove(g),r.set(h,m)}function u(h){let f=r.get(h);if(f){let d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Eg(s,t,e){let n;function i(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){s.drawElements(n,f,r,h*a),e.update(f,n,1)}function c(h,f,d){d!==0&&(s.drawElementsInstanced(n,f,r,h*a,d),e.update(f,n,d))}function u(h,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,d);let _=0;for(let m=0;m<d;m++)_+=f[m];e.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Cg(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Ut("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Rg(s,t,e){let n=new WeakMap,i=new ne;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,f=n.get(o);if(f===void 0||f.count!==h){let w=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",w)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],A=o.morphAttributes.color||[],M=0;d===!0&&(M=1),p===!0&&(M=2),_===!0&&(M=3);let x=o.attributes.position.count*M,T=1;x>t.maxTextureSize&&(T=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let b=new Float32Array(x*T*4*h),C=new Hs(b,x,T,h);C.type=dn,C.needsUpdate=!0;let y=M*4;for(let R=0;R<h;R++){let P=m[R],I=g[R],V=A[R],W=x*T*4*R;for(let N=0;N<P.count;N++){let G=N*y;d===!0&&(i.fromBufferAttribute(P,N),b[W+G+0]=i.x,b[W+G+1]=i.y,b[W+G+2]=i.z,b[W+G+3]=0),p===!0&&(i.fromBufferAttribute(I,N),b[W+G+4]=i.x,b[W+G+5]=i.y,b[W+G+6]=i.z,b[W+G+7]=0),_===!0&&(i.fromBufferAttribute(V,N),b[W+G+8]=i.x,b[W+G+9]=i.y,b[W+G+10]=i.z,b[W+G+11]=V.itemSize===4?i.w:1)}}f={count:h,texture:C,size:new It(x,T)},n.set(o,f),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Pg(s,t,e,n,i){let r=new WeakMap;function a(c){let u=i.render.frame,h=c.geometry,f=t.get(c,h);if(r.get(f)!==u&&(t.update(f),r.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return f}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var Ig={[vr]:"LINEAR_TONE_MAPPING",[Cl]:"REINHARD_TONE_MAPPING",[Rl]:"CINEON_TONE_MAPPING",[Pl]:"ACES_FILMIC_TONE_MAPPING",[Dl]:"AGX_TONE_MAPPING",[Ll]:"NEUTRAL_TONE_MAPPING",[Il]:"CUSTOM_TONE_MAPPING"};function Dg(s,t,e,n,i,r){let a=new $e(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,depthTexture:i?new Wn(t,e):void 0}),o=new $e(t,e,{type:Dn,depthBuffer:!1,stencilBuffer:!1}),l=new Be;l.setAttribute("position",new xe([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new xe([0,2,0,0,2,0],2));let c=new Ma({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new ze(l,c),h=new fi(-1,1,1,-1,0,1),f=null,d=null,p=!1,_,m=null,g=[],A=!1;this.setSize=function(M,x){a.setSize(M,x),o.setSize(M,x);for(let T=0;T<g.length;T++){let b=g[T];b.setSize&&b.setSize(M,x)}},this.setEffects=function(M){g=M,A=g.length>0&&g[0].isRenderPass===!0;let x=a.width,T=a.height;for(let b=0;b<g.length;b++){let C=g[b];C.setSize&&C.setSize(x,T)}},this.begin=function(M,x){if(p||M.toneMapping===yn&&g.length===0)return!1;if(m=x,x!==null){let T=x.width,b=x.height;(a.width!==T||a.height!==b)&&this.setSize(T,b)}return A===!1&&M.setRenderTarget(a),_=M.toneMapping,M.toneMapping=yn,!0},this.hasRenderPass=function(){return A},this.end=function(M,x){M.toneMapping=_,p=!0;let T=a,b=o;for(let C=0;C<g.length;C++){let y=g[C];if(y.enabled!==!1&&(y.render(M,b,T,x),y.needsSwap!==!1)){let w=T;T=b,b=w}}if(f!==M.outputColorSpace||d!==M.toneMapping){f=M.outputColorSpace,d=M.toneMapping,c.defines={},Yt.getTransfer(f)===Qt&&(c.defines.SRGB_TRANSFER="");let C=Ig[d];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,M.setRenderTarget(m),M.render(u,h),m=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}var Nu=new Oe,nc=new Wn(1,1),Fu=new Hs,Ou=new va,Bu=new js,gu=[],_u=[],xu=new Float32Array(16),vu=new Float32Array(9),yu=new Float32Array(4);function Cs(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=gu[i];if(r===void 0&&(r=new Float32Array(i),gu[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Ae(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function we(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Ro(s,t){let e=_u[t];e===void 0&&(e=new Int32Array(t),_u[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Lg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Ug(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2fv(this.addr,t),we(e,t)}}function Ng(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;s.uniform3fv(this.addr,t),we(e,t)}}function Fg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4fv(this.addr,t),we(e,t)}}function Og(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(Ae(e,n))return;yu.set(n),s.uniformMatrix2fv(this.addr,!1,yu),we(e,n)}}function Bg(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(Ae(e,n))return;vu.set(n),s.uniformMatrix3fv(this.addr,!1,vu),we(e,n)}}function zg(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(Ae(e,n))return;xu.set(n),s.uniformMatrix4fv(this.addr,!1,xu),we(e,n)}}function kg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Vg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2iv(this.addr,t),we(e,t)}}function Gg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;s.uniform3iv(this.addr,t),we(e,t)}}function Hg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4iv(this.addr,t),we(e,t)}}function Wg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Xg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2uiv(this.addr,t),we(e,t)}}function qg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;s.uniform3uiv(this.addr,t),we(e,t)}}function Yg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4uiv(this.addr,t),we(e,t)}}function Zg(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(nc.compareFunction=e.isReversedDepthBuffer()?So:Mo,r=nc):r=Nu,e.setTexture2D(t||r,i)}function Jg(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Ou,i)}function Kg(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Bu,i)}function $g(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Fu,i)}function jg(s){switch(s){case 5126:return Lg;case 35664:return Ug;case 35665:return Ng;case 35666:return Fg;case 35674:return Og;case 35675:return Bg;case 35676:return zg;case 5124:case 35670:return kg;case 35667:case 35671:return Vg;case 35668:case 35672:return Gg;case 35669:case 35673:return Hg;case 5125:return Wg;case 36294:return Xg;case 36295:return qg;case 36296:return Yg;case 35678:case 36198:case 36298:case 36306:case 35682:return Zg;case 35679:case 36299:case 36307:return Jg;case 35680:case 36300:case 36308:case 36293:return Kg;case 36289:case 36303:case 36311:case 36292:return $g}}function Qg(s,t){s.uniform1fv(this.addr,t)}function t0(s,t){let e=Cs(t,this.size,2);s.uniform2fv(this.addr,e)}function e0(s,t){let e=Cs(t,this.size,3);s.uniform3fv(this.addr,e)}function n0(s,t){let e=Cs(t,this.size,4);s.uniform4fv(this.addr,e)}function i0(s,t){let e=Cs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function s0(s,t){let e=Cs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function r0(s,t){let e=Cs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function a0(s,t){s.uniform1iv(this.addr,t)}function o0(s,t){s.uniform2iv(this.addr,t)}function l0(s,t){s.uniform3iv(this.addr,t)}function c0(s,t){s.uniform4iv(this.addr,t)}function h0(s,t){s.uniform1uiv(this.addr,t)}function u0(s,t){s.uniform2uiv(this.addr,t)}function f0(s,t){s.uniform3uiv(this.addr,t)}function d0(s,t){s.uniform4uiv(this.addr,t)}function p0(s,t,e){let n=this.cache,i=t.length,r=Ro(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),we(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=nc:a=Nu;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function m0(s,t,e){let n=this.cache,i=t.length,r=Ro(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Ou,r[a])}function g0(s,t,e){let n=this.cache,i=t.length,r=Ro(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Bu,r[a])}function _0(s,t,e){let n=this.cache,i=t.length,r=Ro(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Fu,r[a])}function x0(s){switch(s){case 5126:return Qg;case 35664:return t0;case 35665:return e0;case 35666:return n0;case 35674:return i0;case 35675:return s0;case 35676:return r0;case 5124:case 35670:return a0;case 35667:case 35671:return o0;case 35668:case 35672:return l0;case 35669:case 35673:return c0;case 5125:return h0;case 36294:return u0;case 36295:return f0;case 36296:return d0;case 35678:case 36198:case 36298:case 36306:case 35682:return p0;case 35679:case 36299:case 36307:return m0;case 35680:case 36300:case 36308:case 36293:return g0;case 36289:case 36303:case 36311:case 36292:return _0}}var ic=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=jg(e.type)}},sc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=x0(e.type)}},rc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(t,e[o.id],n)}}},tc=/(\w+)(\])?(\[|\.)?/g;function Mu(s,t){s.seq.push(t),s.map[t.id]=t}function v0(s,t,e){let n=s.name,i=n.length;for(tc.lastIndex=0;;){let r=tc.exec(n),a=tc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Mu(e,c===void 0?new ic(o,s,t):new sc(o,s,t));break}else{let h=e.map[o];h===void 0&&(h=new rc(o),Mu(e,h)),e=h}}}var Es=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);v0(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Su(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var y0=37297,M0=0;function S0(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var bu=new Bt;function b0(s){Yt._getMatrix(bu,Yt.workingColorSpace,s);let t=`mat3( ${bu.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(s)){case Vs:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return Ct("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Tu(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+S0(s.getShaderSource(t),o)}else return r}function T0(s,t){let e=b0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var A0={[vr]:"Linear",[Cl]:"Reinhard",[Rl]:"Cineon",[Pl]:"ACESFilmic",[Dl]:"AgX",[Ll]:"Neutral",[Il]:"Custom"};function w0(s,t){let e=A0[t];return e===void 0?(Ct("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var To=new L;function E0(){Yt.getLuminanceCoefficients(To);let s=To.x.toFixed(4),t=To.y.toFixed(4),e=To.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function C0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Pr).join(`
`)}function R0(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function P0(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Pr(s){return s!==""}function Au(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wu(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var I0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ac(s){return s.replace(I0,L0)}var D0=new Map;function L0(s,t){let e=Ht[t];if(e===void 0){let n=D0.get(t);if(n!==void 0)e=Ht[n],Ct('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return ac(e)}var U0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eu(s){return s.replace(U0,N0)}function N0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Cu(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var F0={[xr]:"SHADOWMAP_TYPE_PCF",[bs]:"SHADOWMAP_TYPE_VSM"};function O0(s){return F0[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var B0={[mi]:"ENVMAP_TYPE_CUBE",[ki]:"ENVMAP_TYPE_CUBE",[yr]:"ENVMAP_TYPE_CUBE_UV"};function z0(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":B0[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var k0={[ki]:"ENVMAP_MODE_REFRACTION"};function V0(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":k0[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var G0={[El]:"ENVMAP_BLENDING_MULTIPLY",[Bh]:"ENVMAP_BLENDING_MIX",[zh]:"ENVMAP_BLENDING_ADD"};function H0(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":G0[s.combine]||"ENVMAP_BLENDING_NONE"}function W0(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function X0(s,t,e,n){let i=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=O0(e),c=z0(e),u=V0(e),h=H0(e),f=W0(e),d=C0(e),p=R0(r),_=i.createProgram(),m,g,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Pr).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Pr).join(`
`),g.length>0&&(g+=`
`)):(m=[Cu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pr).join(`
`),g=[Cu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==yn?"#define TONE_MAPPING":"",e.toneMapping!==yn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==yn?w0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,T0("linearToOutputTexel",e.outputColorSpace),E0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Pr).join(`
`)),a=ac(a),a=Au(a,e),a=wu(a,e),o=ac(o),o=Au(o,e),o=wu(o,e),a=Eu(a),o=Eu(o),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",e.glslVersion===Gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=A+m+a,x=A+g+o,T=Su(i,i.VERTEX_SHADER,M),b=Su(i,i.FRAGMENT_SHADER,x);i.attachShader(_,T),i.attachShader(_,b),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(P){if(s.debug.checkShaderErrors){let I=i.getProgramInfoLog(_)||"",V=i.getShaderInfoLog(T)||"",W=i.getShaderInfoLog(b)||"",N=I.trim(),G=V.trim(),X=W.trim(),$=!0,Q=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if($=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,T,b);else{let st=Tu(i,T,"vertex"),rt=Tu(i,b,"fragment");Ut("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+N+`
`+st+`
`+rt)}else N!==""?Ct("WebGLProgram: Program Info Log:",N):(G===""||X==="")&&(Q=!1);Q&&(P.diagnostics={runnable:$,programLog:N,vertexShader:{log:G,prefix:m},fragmentShader:{log:X,prefix:g}})}i.deleteShader(T),i.deleteShader(b),y=new Es(i,_),w=P0(i,_)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=i.getProgramParameter(_,y0)),R},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=M0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=b,this}var q0=0,oc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new lc(t),e.set(t,n)),n}},lc=class{constructor(t){this.id=q0++,this.code=t,this.usedTimes=0}};function Y0(s){return s===xi||s===wr||s===Er}function Z0(s,t,e,n,i,r){let a=new Ws,o=new oc,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer,f=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return l.add(y),y===0?"uv":`uv${y}`}function _(y,w,R,P,I,V){let W=P.fog,N=I.geometry,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?P.environment:null,X=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,$=t.get(y.envMap||G,X),Q=$&&$.mapping===yr?$.image.height:null,st=d[y.type];y.precision!==null&&(f=n.getMaxPrecision(y.precision),f!==y.precision&&Ct("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let rt=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,lt=rt!==void 0?rt.length:0,zt=0;N.morphAttributes.position!==void 0&&(zt=1),N.morphAttributes.normal!==void 0&&(zt=2),N.morphAttributes.color!==void 0&&(zt=3);let Zt,Ft,q,nt;if(st){let bt=Un[st];Zt=bt.vertexShader,Ft=bt.fragmentShader}else{Zt=y.vertexShader,Ft=y.fragmentShader;let bt=o.getVertexShaderStage(y),fe=o.getFragmentShaderStage(y);o.update(y,bt,fe),q=bt.id,nt=fe.id}let tt=s.getRenderTarget(),et=s.state.buffers.depth.getReversed(),St=I.isInstancedMesh===!0,vt=I.isBatchedMesh===!0,qt=!!y.map,yt=!!y.matcap,Ot=!!$,Dt=!!y.aoMap,Jt=!!y.lightMap,ve=!!y.bumpMap&&y.wireframe===!1,Te=!!y.normalMap,Ce=!!y.displacementMap,Ie=!!y.emissiveMap,ue=!!y.metalnessMap,ye=!!y.roughnessMap,U=y.anisotropy>0,We=y.clearcoat>0,ee=y.dispersion>0,E=y.iridescence>0,v=y.sheen>0,O=y.transmission>0,k=U&&!!y.anisotropyMap,Y=We&&!!y.clearcoatMap,it=We&&!!y.clearcoatNormalMap,ot=We&&!!y.clearcoatRoughnessMap,Z=E&&!!y.iridescenceMap,K=E&&!!y.iridescenceThicknessMap,ct=v&&!!y.sheenColorMap,wt=v&&!!y.sheenRoughnessMap,ft=!!y.specularMap,ht=!!y.specularColorMap,Pt=!!y.specularIntensityMap,Lt=O&&!!y.transmissionMap,kt=O&&!!y.thicknessMap,D=!!y.gradientMap,at=!!y.alphaMap,J=y.alphaTest>0,ut=!!y.alphaHash,_t=!!y.extensions,j=yn;y.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(j=s.toneMapping);let At={shaderID:st,shaderType:y.type,shaderName:y.name,vertexShader:Zt,fragmentShader:Ft,defines:y.defines,customVertexShaderID:q,customFragmentShaderID:nt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:vt,batchingColor:vt&&I._colorsTexture!==null,instancing:St,instancingColor:St&&I.instanceColor!==null,instancingMorph:St&&I.morphTexture!==null,outputColorSpace:tt===null?s.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Yt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:qt,matcap:yt,envMap:Ot,envMapMode:Ot&&$.mapping,envMapCubeUVHeight:Q,aoMap:Dt,lightMap:Jt,bumpMap:ve,normalMap:Te,displacementMap:Ce,emissiveMap:Ie,normalMapObjectSpace:Te&&y.normalMapType===Yh,normalMapTangentSpace:Te&&y.normalMapType===yo,packedNormalMap:Te&&y.normalMapType===yo&&Y0(y.normalMap.format),metalnessMap:ue,roughnessMap:ye,anisotropy:U,anisotropyMap:k,clearcoat:We,clearcoatMap:Y,clearcoatNormalMap:it,clearcoatRoughnessMap:ot,dispersion:ee,iridescence:E,iridescenceMap:Z,iridescenceThicknessMap:K,sheen:v,sheenColorMap:ct,sheenRoughnessMap:wt,specularMap:ft,specularColorMap:ht,specularIntensityMap:Pt,transmission:O,transmissionMap:Lt,thicknessMap:kt,gradientMap:D,opaque:y.transparent===!1&&y.blending===Ii&&y.alphaToCoverage===!1,alphaMap:at,alphaTest:J,alphaHash:ut,combine:y.combine,mapUv:qt&&p(y.map.channel),aoMapUv:Dt&&p(y.aoMap.channel),lightMapUv:Jt&&p(y.lightMap.channel),bumpMapUv:ve&&p(y.bumpMap.channel),normalMapUv:Te&&p(y.normalMap.channel),displacementMapUv:Ce&&p(y.displacementMap.channel),emissiveMapUv:Ie&&p(y.emissiveMap.channel),metalnessMapUv:ue&&p(y.metalnessMap.channel),roughnessMapUv:ye&&p(y.roughnessMap.channel),anisotropyMapUv:k&&p(y.anisotropyMap.channel),clearcoatMapUv:Y&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:it&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:K&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:wt&&p(y.sheenRoughnessMap.channel),specularMapUv:ft&&p(y.specularMap.channel),specularColorMapUv:ht&&p(y.specularColorMap.channel),specularIntensityMapUv:Pt&&p(y.specularIntensityMap.channel),transmissionMapUv:Lt&&p(y.transmissionMap.channel),thicknessMapUv:kt&&p(y.thicknessMap.channel),alphaMapUv:at&&p(y.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Te||U),vertexNormals:!!N.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!N.attributes.uv&&(qt||at),fog:!!W,useFog:y.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||N.attributes.normal===void 0&&Te===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:et,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:lt,morphTextureStride:zt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:j,decodeVideoTexture:qt&&y.map.isVideoTexture===!0&&Yt.getTransfer(y.map.colorSpace)===Qt,decodeVideoTextureEmissive:Ie&&y.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(y.emissiveMap.colorSpace)===Qt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===tn,flipSided:y.side===Ge,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:_t&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&y.extensions.multiDraw===!0||vt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return At.vertexUv1s=l.has(1),At.vertexUv2s=l.has(2),At.vertexUv3s=l.has(3),l.clear(),At}function m(y){let w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(let R in y.defines)w.push(R),w.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(g(w,y),A(w,y),w.push(s.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function g(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function A(y,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function M(y){let w=d[y.type],R;if(w){let P=Un[w];R=cu.clone(P.uniforms)}else R=y.uniforms;return R}function x(y,w){let R=u.get(w);return R!==void 0?++R.usedTimes:(R=new X0(s,w,y,i),c.push(R),u.set(w,R)),R}function T(y){if(--y.usedTimes===0){let w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function b(y){o.remove(y)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:M,acquireProgram:x,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:C}}function J0(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function K0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Ru(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Pu(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,p,_,m,g){let A=s[t];return A===void 0?(A={id:f.id,object:f,geometry:d,material:p,materialVariant:a(f),groupOrder:_,renderOrder:f.renderOrder,z:m,group:g},s[t]=A):(A.id=f.id,A.object=f,A.geometry=d,A.material=p,A.materialVariant=a(f),A.groupOrder=_,A.renderOrder=f.renderOrder,A.z=m,A.group=g),t++,A}function l(f,d,p,_,m,g){let A=o(f,d,p,_,m,g);p.transmission>0?n.push(A):p.transparent===!0?i.push(A):e.push(A)}function c(f,d,p,_,m,g){let A=o(f,d,p,_,m,g);p.transmission>0?n.unshift(A):p.transparent===!0?i.unshift(A):e.unshift(A)}function u(f,d,p){e.length>1&&e.sort(f||K0),n.length>1&&n.sort(d||Ru),i.length>1&&i.sort(d||Ru),p&&(e.reverse(),n.reverse(),i.reverse())}function h(){for(let f=t,d=s.length;f<d;f++){let p=s[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:h,sort:u}}function $0(){let s=new WeakMap;function t(n,i){let r=s.get(n),a;return r===void 0?(a=new Pu,s.set(n,[a])):i>=r.length?(a=new Pu,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function j0(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Nt};break;case"SpotLight":e={position:new L,direction:new L,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new L,halfWidth:new L,halfHeight:new L};break}return s[t.id]=e,e}}}function Q0(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var t_=0;function e_(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function n_(s){let t=new j0,e=Q0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let i=new L,r=new Gt,a=new Gt;function o(c){let u=0,h=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let d=0,p=0,_=0,m=0,g=0,A=0,M=0,x=0,T=0,b=0,C=0;c.sort(e_);for(let w=0,R=c.length;w<R;w++){let P=c[w],I=P.color,V=P.intensity,W=P.distance,N=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===xi?N=P.shadow.map.texture:N=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=I.r*V,h+=I.g*V,f+=I.b*V;else if(P.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(P.sh.coefficients[G],V);C++}else if(P.isDirectionalLight){let G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let X=P.shadow,$=e.get(P);$.shadowIntensity=X.intensity,$.shadowBias=X.bias,$.shadowNormalBias=X.normalBias,$.shadowRadius=X.radius,$.shadowMapSize=X.mapSize,n.directionalShadow[d]=$,n.directionalShadowMap[d]=N,n.directionalShadowMatrix[d]=P.shadow.matrix,A++}n.directional[d]=G,d++}else if(P.isSpotLight){let G=t.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(I).multiplyScalar(V),G.distance=W,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,n.spot[_]=G;let X=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,X.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[_]=X.matrix,P.castShadow){let $=e.get(P);$.shadowIntensity=X.intensity,$.shadowBias=X.bias,$.shadowNormalBias=X.normalBias,$.shadowRadius=X.radius,$.shadowMapSize=X.mapSize,n.spotShadow[_]=$,n.spotShadowMap[_]=N,x++}_++}else if(P.isRectAreaLight){let G=t.get(P);G.color.copy(I).multiplyScalar(V),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=G,m++}else if(P.isPointLight){let G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){let X=P.shadow,$=e.get(P);$.shadowIntensity=X.intensity,$.shadowBias=X.bias,$.shadowNormalBias=X.normalBias,$.shadowRadius=X.radius,$.shadowMapSize=X.mapSize,$.shadowCameraNear=X.camera.near,$.shadowCameraFar=X.camera.far,n.pointShadow[p]=$,n.pointShadowMap[p]=N,n.pointShadowMatrix[p]=P.shadow.matrix,M++}n.point[p]=G,p++}else if(P.isHemisphereLight){let G=t.get(P);G.skyColor.copy(P.color).multiplyScalar(V),G.groundColor.copy(P.groundColor).multiplyScalar(V),n.hemi[g]=G,g++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;let y=n.hash;(y.directionalLength!==d||y.pointLength!==p||y.spotLength!==_||y.rectAreaLength!==m||y.hemiLength!==g||y.numDirectionalShadows!==A||y.numPointShadows!==M||y.numSpotShadows!==x||y.numSpotMaps!==T||y.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=A,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+T-b,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=C,y.directionalLength=d,y.pointLength=p,y.spotLength=_,y.rectAreaLength=m,y.hemiLength=g,y.numDirectionalShadows=A,y.numPointShadows=M,y.numSpotShadows=x,y.numSpotMaps=T,y.numLightProbes=C,n.version=t_++)}function l(c,u){let h=0,f=0,d=0,p=0,_=0,m=u.matrixWorldInverse;for(let g=0,A=c.length;g<A;g++){let M=c[g];if(M.isDirectionalLight){let x=n.directional[h];x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),h++}else if(M.isSpotLight){let x=n.spot[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(M.isRectAreaLight){let x=n.rectArea[p];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),p++}else if(M.isPointLight){let x=n.point[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function Iu(s){let t=new n_(s),e=[],n=[],i=[];function r(f){h.camera=f,e.length=0,n.length=0,i.length=0}function a(f){e.push(f)}function o(f){n.push(f)}function l(f){i.push(f)}function c(){t.setup(e)}function u(f){t.setupView(e,f)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function i_(s){let t=new WeakMap;function e(i,r=0){let a=t.get(i),o;return a===void 0?(o=new Iu(s),t.set(i,[o])):r>=a.length?(o=new Iu(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var s_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,a_=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],o_=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Du=new Gt,Rr=new L,ec=new L;function l_(s,t,e){let n=new ms,i=new It,r=new It,a=new ne,o=new Sa,l=new ba,c={},u=e.maxTextureSize,h={[Hn]:Ge,[Ge]:Hn,[tn]:tn},f=new Qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:s_,fragmentShader:r_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let p=new Be;p.setAttribute("position",new te(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ze(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xr;let g=this.type;this.render=function(b,C,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===vh&&(Ct("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=xr);let w=s.getRenderTarget(),R=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),I=s.state;I.setBlending(In),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let V=g!==this.type;V&&C.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(N=>N.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,N=b.length;W<N;W++){let G=b[W],X=G.shadow;if(X===void 0){Ct("WebGLShadowMap:",G,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);let $=X.getFrameExtents();i.multiply($),r.copy(X.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/$.x),i.x=r.x*$.x,X.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/$.y),i.y=r.y*$.y,X.mapSize.y=r.y));let Q=s.state.buffers.depth.getReversed();if(X.camera._reversedDepth=Q,X.map===null||V===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===bs){if(G.isPointLight){Ct("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new $e(i.x,i.y,{format:xi,type:Dn,minFilter:De,magFilter:De,generateMipmaps:!1}),X.map.texture.name=G.name+".shadowMap",X.map.depthTexture=new Wn(i.x,i.y,dn),X.map.depthTexture.name=G.name+".shadowMapDepth",X.map.depthTexture.format=Pn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Pe,X.map.depthTexture.magFilter=Pe}else G.isPointLight?(X.map=new wo(i.x),X.map.depthTexture=new ya(i.x,Mn)):(X.map=new $e(i.x,i.y),X.map.depthTexture=new Wn(i.x,i.y,Mn)),X.map.depthTexture.name=G.name+".shadowMap",X.map.depthTexture.format=Pn,this.type===xr?(X.map.depthTexture.compareFunction=Q?So:Mo,X.map.depthTexture.minFilter=De,X.map.depthTexture.magFilter=De):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Pe,X.map.depthTexture.magFilter=Pe);X.camera.updateProjectionMatrix()}let st=X.map.isWebGLCubeRenderTarget?6:1;for(let rt=0;rt<st;rt++){if(X.map.isWebGLCubeRenderTarget)s.setRenderTarget(X.map,rt),s.clear();else{rt===0&&(s.setRenderTarget(X.map),s.clear());let lt=X.getViewport(rt);a.set(r.x*lt.x,r.y*lt.y,r.x*lt.z,r.y*lt.w),I.viewport(a)}if(G.isPointLight){let lt=X.camera,zt=X.matrix,Zt=G.distance||lt.far;Zt!==lt.far&&(lt.far=Zt,lt.updateProjectionMatrix()),Rr.setFromMatrixPosition(G.matrixWorld),lt.position.copy(Rr),ec.copy(lt.position),ec.add(a_[rt]),lt.up.copy(o_[rt]),lt.lookAt(ec),lt.updateMatrixWorld(),zt.makeTranslation(-Rr.x,-Rr.y,-Rr.z),Du.multiplyMatrices(lt.projectionMatrix,lt.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Du,lt.coordinateSystem,lt.reversedDepth)}else X.updateMatrices(G);n=X.getFrustum(),x(C,y,X.camera,G,this.type)}X.isPointLightShadow!==!0&&this.type===bs&&A(X,y),X.needsUpdate=!1}g=this.type,m.needsUpdate=!1,s.setRenderTarget(w,R,P)};function A(b,C){let y=t.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new $e(i.x,i.y,{format:xi,type:Dn})),f.uniforms.shadow_pass.value=b.map.depthTexture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(C,null,y,f,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(C,null,y,d,_,null)}function M(b,C,y,w){let R=null,P=y.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)R=P;else if(R=y.isPointLight===!0?l:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let I=R.uuid,V=C.uuid,W=c[I];W===void 0&&(W={},c[I]=W);let N=W[V];N===void 0&&(N=R.clone(),W[V]=N,C.addEventListener("dispose",T)),R=N}if(R.visible=C.visible,R.wireframe=C.wireframe,w===bs?R.side=C.shadowSide!==null?C.shadowSide:C.side:R.side=C.shadowSide!==null?C.shadowSide:h[C.side],R.alphaMap=C.alphaMap,R.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,R.map=C.map,R.clipShadows=C.clipShadows,R.clippingPlanes=C.clippingPlanes,R.clipIntersection=C.clipIntersection,R.displacementMap=C.displacementMap,R.displacementScale=C.displacementScale,R.displacementBias=C.displacementBias,R.wireframeLinewidth=C.wireframeLinewidth,R.linewidth=C.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let I=s.properties.get(R);I.light=y}return R}function x(b,C,y,w,R){if(b.visible===!1)return;if(b.layers.test(C.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&R===bs)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,b.matrixWorld);let V=t.update(b),W=b.material;if(Array.isArray(W)){let N=V.groups;for(let G=0,X=N.length;G<X;G++){let $=N[G],Q=W[$.materialIndex];if(Q&&Q.visible){let st=M(b,Q,w,R);b.onBeforeShadow(s,b,C,y,V,st,$),s.renderBufferDirect(y,null,V,st,b,$),b.onAfterShadow(s,b,C,y,V,st,$)}}}else if(W.visible){let N=M(b,W,w,R);b.onBeforeShadow(s,b,C,y,V,N,null),s.renderBufferDirect(y,null,V,N,b,null),b.onAfterShadow(s,b,C,y,V,N,null)}}let I=b.children;for(let V=0,W=I.length;V<W;V++)x(I[V],C,y,w,R)}function T(b){b.target.removeEventListener("dispose",T);for(let y in c){let w=c[y],R=b.target.uuid;R in w&&(w[R].dispose(),delete w[R])}}}function c_(s,t){function e(){let D=!1,at=new ne,J=null,ut=new ne(0,0,0,0);return{setMask:function(_t){J!==_t&&!D&&(s.colorMask(_t,_t,_t,_t),J=_t)},setLocked:function(_t){D=_t},setClear:function(_t,j,At,bt,fe){fe===!0&&(_t*=bt,j*=bt,At*=bt),at.set(_t,j,At,bt),ut.equals(at)===!1&&(s.clearColor(_t,j,At,bt),ut.copy(at))},reset:function(){D=!1,J=null,ut.set(-1,0,0,0)}}}function n(){let D=!1,at=!1,J=null,ut=null,_t=null;return{setReversed:function(j){if(at!==j){let At=t.get("EXT_clip_control");j?At.clipControlEXT(At.LOWER_LEFT_EXT,At.ZERO_TO_ONE_EXT):At.clipControlEXT(At.LOWER_LEFT_EXT,At.NEGATIVE_ONE_TO_ONE_EXT),at=j;let bt=_t;_t=null,this.setClear(bt)}},getReversed:function(){return at},setTest:function(j){j?tt(s.DEPTH_TEST):et(s.DEPTH_TEST)},setMask:function(j){J!==j&&!D&&(s.depthMask(j),J=j)},setFunc:function(j){if(at&&(j=iu[j]),ut!==j){switch(j){case ca:s.depthFunc(s.NEVER);break;case ha:s.depthFunc(s.ALWAYS);break;case ua:s.depthFunc(s.LESS);break;case Di:s.depthFunc(s.LEQUAL);break;case fa:s.depthFunc(s.EQUAL);break;case da:s.depthFunc(s.GEQUAL);break;case pa:s.depthFunc(s.GREATER);break;case ma:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ut=j}},setLocked:function(j){D=j},setClear:function(j){_t!==j&&(_t=j,at&&(j=1-j),s.clearDepth(j))},reset:function(){D=!1,J=null,ut=null,_t=null,at=!1}}}function i(){let D=!1,at=null,J=null,ut=null,_t=null,j=null,At=null,bt=null,fe=null;return{setTest:function(oe){D||(oe?tt(s.STENCIL_TEST):et(s.STENCIL_TEST))},setMask:function(oe){at!==oe&&!D&&(s.stencilMask(oe),at=oe)},setFunc:function(oe,wn,En){(J!==oe||ut!==wn||_t!==En)&&(s.stencilFunc(oe,wn,En),J=oe,ut=wn,_t=En)},setOp:function(oe,wn,En){(j!==oe||At!==wn||bt!==En)&&(s.stencilOp(oe,wn,En),j=oe,At=wn,bt=En)},setLocked:function(oe){D=oe},setClear:function(oe){fe!==oe&&(s.clearStencil(oe),fe=oe)},reset:function(){D=!1,at=null,J=null,ut=null,_t=null,j=null,At=null,bt=null,fe=null}}}let r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap,u={},h={},f={},d=new WeakMap,p=[],_=null,m=!1,g=null,A=null,M=null,x=null,T=null,b=null,C=null,y=new Nt(0,0,0),w=0,R=!1,P=null,I=null,V=null,W=null,N=null,G=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,$=0,Q=s.getParameter(s.VERSION);Q.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Q)[1]),X=$>=1):Q.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),X=$>=2);let st=null,rt={},lt=s.getParameter(s.SCISSOR_BOX),zt=s.getParameter(s.VIEWPORT),Zt=new ne().fromArray(lt),Ft=new ne().fromArray(zt);function q(D,at,J,ut){let _t=new Uint8Array(4),j=s.createTexture();s.bindTexture(D,j),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let At=0;At<J;At++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(at,0,s.RGBA,1,1,ut,0,s.RGBA,s.UNSIGNED_BYTE,_t):s.texImage2D(at+At,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,_t);return j}let nt={};nt[s.TEXTURE_2D]=q(s.TEXTURE_2D,s.TEXTURE_2D,1),nt[s.TEXTURE_CUBE_MAP]=q(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[s.TEXTURE_2D_ARRAY]=q(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),nt[s.TEXTURE_3D]=q(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),tt(s.DEPTH_TEST),a.setFunc(Di),ve(!1),Te(bl),tt(s.CULL_FACE),Dt(In);function tt(D){u[D]!==!0&&(s.enable(D),u[D]=!0)}function et(D){u[D]!==!1&&(s.disable(D),u[D]=!1)}function St(D,at){return f[D]!==at?(s.bindFramebuffer(D,at),f[D]=at,D===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=at),D===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=at),!0):!1}function vt(D,at){let J=p,ut=!1;if(D){J=d.get(at),J===void 0&&(J=[],d.set(at,J));let _t=D.textures;if(J.length!==_t.length||J[0]!==s.COLOR_ATTACHMENT0){for(let j=0,At=_t.length;j<At;j++)J[j]=s.COLOR_ATTACHMENT0+j;J.length=_t.length,ut=!0}}else J[0]!==s.BACK&&(J[0]=s.BACK,ut=!0);ut&&s.drawBuffers(J)}function qt(D){return _!==D?(s.useProgram(D),_=D,!0):!1}let yt={[ri]:s.FUNC_ADD,[Mh]:s.FUNC_SUBTRACT,[Sh]:s.FUNC_REVERSE_SUBTRACT};yt[bh]=s.MIN,yt[Th]=s.MAX;let Ot={[Ah]:s.ZERO,[wh]:s.ONE,[Eh]:s.SRC_COLOR,[oa]:s.SRC_ALPHA,[Lh]:s.SRC_ALPHA_SATURATE,[Ih]:s.DST_COLOR,[Rh]:s.DST_ALPHA,[Ch]:s.ONE_MINUS_SRC_COLOR,[la]:s.ONE_MINUS_SRC_ALPHA,[Dh]:s.ONE_MINUS_DST_COLOR,[Ph]:s.ONE_MINUS_DST_ALPHA,[Uh]:s.CONSTANT_COLOR,[Nh]:s.ONE_MINUS_CONSTANT_COLOR,[Fh]:s.CONSTANT_ALPHA,[Oh]:s.ONE_MINUS_CONSTANT_ALPHA};function Dt(D,at,J,ut,_t,j,At,bt,fe,oe){if(D===In){m===!0&&(et(s.BLEND),m=!1);return}if(m===!1&&(tt(s.BLEND),m=!0),D!==yh){if(D!==g||oe!==R){if((A!==ri||T!==ri)&&(s.blendEquation(s.FUNC_ADD),A=ri,T=ri),oe)switch(D){case Ii:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Tl:s.blendFunc(s.ONE,s.ONE);break;case Al:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case wl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ut("WebGLState: Invalid blending: ",D);break}else switch(D){case Ii:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Tl:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Al:Ut("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wl:Ut("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ut("WebGLState: Invalid blending: ",D);break}M=null,x=null,b=null,C=null,y.set(0,0,0),w=0,g=D,R=oe}return}_t=_t||at,j=j||J,At=At||ut,(at!==A||_t!==T)&&(s.blendEquationSeparate(yt[at],yt[_t]),A=at,T=_t),(J!==M||ut!==x||j!==b||At!==C)&&(s.blendFuncSeparate(Ot[J],Ot[ut],Ot[j],Ot[At]),M=J,x=ut,b=j,C=At),(bt.equals(y)===!1||fe!==w)&&(s.blendColor(bt.r,bt.g,bt.b,fe),y.copy(bt),w=fe),g=D,R=!1}function Jt(D,at){D.side===tn?et(s.CULL_FACE):tt(s.CULL_FACE);let J=D.side===Ge;at&&(J=!J),ve(J),D.blending===Ii&&D.transparent===!1?Dt(In):Dt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let ut=D.stencilWrite;o.setTest(ut),ut&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ie(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?tt(s.SAMPLE_ALPHA_TO_COVERAGE):et(s.SAMPLE_ALPHA_TO_COVERAGE)}function ve(D){P!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),P=D)}function Te(D){D!==_h?(tt(s.CULL_FACE),D!==I&&(D===bl?s.cullFace(s.BACK):D===xh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):et(s.CULL_FACE),I=D}function Ce(D){D!==V&&(X&&s.lineWidth(D),V=D)}function Ie(D,at,J){D?(tt(s.POLYGON_OFFSET_FILL),(W!==at||N!==J)&&(W=at,N=J,a.getReversed()&&(at=-at),s.polygonOffset(at,J))):et(s.POLYGON_OFFSET_FILL)}function ue(D){D?tt(s.SCISSOR_TEST):et(s.SCISSOR_TEST)}function ye(D){D===void 0&&(D=s.TEXTURE0+G-1),st!==D&&(s.activeTexture(D),st=D)}function U(D,at,J){J===void 0&&(st===null?J=s.TEXTURE0+G-1:J=st);let ut=rt[J];ut===void 0&&(ut={type:void 0,texture:void 0},rt[J]=ut),(ut.type!==D||ut.texture!==at)&&(st!==J&&(s.activeTexture(J),st=J),s.bindTexture(D,at||nt[D]),ut.type=D,ut.texture=at)}function We(){let D=rt[st];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ee(){try{s.compressedTexImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function E(){try{s.compressedTexImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function v(){try{s.texSubImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function O(){try{s.texSubImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function k(){try{s.compressedTexSubImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function Y(){try{s.compressedTexSubImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function it(){try{s.texStorage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function ot(){try{s.texStorage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function Z(){try{s.texImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function K(){try{s.texImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function ct(D){return h[D]!==void 0?h[D]:s.getParameter(D)}function wt(D,at){h[D]!==at&&(s.pixelStorei(D,at),h[D]=at)}function ft(D){Zt.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),Zt.copy(D))}function ht(D){Ft.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),Ft.copy(D))}function Pt(D,at){let J=c.get(at);J===void 0&&(J=new WeakMap,c.set(at,J));let ut=J.get(D);ut===void 0&&(ut=s.getUniformBlockIndex(at,D.name),J.set(D,ut))}function Lt(D,at){let ut=c.get(at).get(D);l.get(at)!==ut&&(s.uniformBlockBinding(at,ut,D.__bindingPointIndex),l.set(at,ut))}function kt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),u={},h={},st=null,rt={},f={},d=new WeakMap,p=[],_=null,m=!1,g=null,A=null,M=null,x=null,T=null,b=null,C=null,y=new Nt(0,0,0),w=0,R=!1,P=null,I=null,V=null,W=null,N=null,Zt.set(0,0,s.canvas.width,s.canvas.height),Ft.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:tt,disable:et,bindFramebuffer:St,drawBuffers:vt,useProgram:qt,setBlending:Dt,setMaterial:Jt,setFlipSided:ve,setCullFace:Te,setLineWidth:Ce,setPolygonOffset:Ie,setScissorTest:ue,activeTexture:ye,bindTexture:U,unbindTexture:We,compressedTexImage2D:ee,compressedTexImage3D:E,texImage2D:Z,texImage3D:K,pixelStorei:wt,getParameter:ct,updateUBOMapping:Pt,uniformBlockBinding:Lt,texStorage2D:it,texStorage3D:ot,texSubImage2D:v,texSubImage3D:O,compressedTexSubImage2D:k,compressedTexSubImage3D:Y,scissor:ft,viewport:ht,reset:kt}}function h_(s,t,e,n,i,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new It,u=new WeakMap,h=new Set,f,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,v){return p?new OffscreenCanvas(E,v):Gs("canvas")}function m(E,v,O){let k=1,Y=ee(E);if((Y.width>O||Y.height>O)&&(k=O/Math.max(Y.width,Y.height)),k<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let it=Math.floor(k*Y.width),ot=Math.floor(k*Y.height);f===void 0&&(f=_(it,ot));let Z=v?_(it,ot):f;return Z.width=it,Z.height=ot,Z.getContext("2d").drawImage(E,0,0,it,ot),Ct("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+it+"x"+ot+")."),Z}else return"data"in E&&Ct("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),E;return E}function g(E){return E.generateMipmaps}function A(E){s.generateMipmap(E)}function M(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(E,v,O,k,Y,it=!1){if(E!==null){if(s[E]!==void 0)return s[E];Ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ot;k&&(ot=t.get("EXT_texture_norm16"),ot||Ct("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=v;if(v===s.RED&&(O===s.FLOAT&&(Z=s.R32F),O===s.HALF_FLOAT&&(Z=s.R16F),O===s.UNSIGNED_BYTE&&(Z=s.R8),O===s.UNSIGNED_SHORT&&ot&&(Z=ot.R16_EXT),O===s.SHORT&&ot&&(Z=ot.R16_SNORM_EXT)),v===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(Z=s.R8UI),O===s.UNSIGNED_SHORT&&(Z=s.R16UI),O===s.UNSIGNED_INT&&(Z=s.R32UI),O===s.BYTE&&(Z=s.R8I),O===s.SHORT&&(Z=s.R16I),O===s.INT&&(Z=s.R32I)),v===s.RG&&(O===s.FLOAT&&(Z=s.RG32F),O===s.HALF_FLOAT&&(Z=s.RG16F),O===s.UNSIGNED_BYTE&&(Z=s.RG8),O===s.UNSIGNED_SHORT&&ot&&(Z=ot.RG16_EXT),O===s.SHORT&&ot&&(Z=ot.RG16_SNORM_EXT)),v===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(Z=s.RG8UI),O===s.UNSIGNED_SHORT&&(Z=s.RG16UI),O===s.UNSIGNED_INT&&(Z=s.RG32UI),O===s.BYTE&&(Z=s.RG8I),O===s.SHORT&&(Z=s.RG16I),O===s.INT&&(Z=s.RG32I)),v===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(Z=s.RGB8UI),O===s.UNSIGNED_SHORT&&(Z=s.RGB16UI),O===s.UNSIGNED_INT&&(Z=s.RGB32UI),O===s.BYTE&&(Z=s.RGB8I),O===s.SHORT&&(Z=s.RGB16I),O===s.INT&&(Z=s.RGB32I)),v===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(Z=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(Z=s.RGBA16UI),O===s.UNSIGNED_INT&&(Z=s.RGBA32UI),O===s.BYTE&&(Z=s.RGBA8I),O===s.SHORT&&(Z=s.RGBA16I),O===s.INT&&(Z=s.RGBA32I)),v===s.RGB&&(O===s.UNSIGNED_SHORT&&ot&&(Z=ot.RGB16_EXT),O===s.SHORT&&ot&&(Z=ot.RGB16_SNORM_EXT),O===s.UNSIGNED_INT_5_9_9_9_REV&&(Z=s.RGB9_E5),O===s.UNSIGNED_INT_10F_11F_11F_REV&&(Z=s.R11F_G11F_B10F)),v===s.RGBA){let K=it?Vs:Yt.getTransfer(Y);O===s.FLOAT&&(Z=s.RGBA32F),O===s.HALF_FLOAT&&(Z=s.RGBA16F),O===s.UNSIGNED_BYTE&&(Z=K===Qt?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT&&ot&&(Z=ot.RGBA16_EXT),O===s.SHORT&&ot&&(Z=ot.RGBA16_SNORM_EXT),O===s.UNSIGNED_SHORT_4_4_4_4&&(Z=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(Z=s.RGB5_A1)}return(Z===s.R16F||Z===s.R32F||Z===s.RG16F||Z===s.RG32F||Z===s.RGBA16F||Z===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function T(E,v){let O;return E?v===null||v===Mn||v===As?O=s.DEPTH24_STENCIL8:v===dn?O=s.DEPTH32F_STENCIL8:v===Ts&&(O=s.DEPTH24_STENCIL8,Ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Mn||v===As?O=s.DEPTH_COMPONENT24:v===dn?O=s.DEPTH_COMPONENT32F:v===Ts&&(O=s.DEPTH_COMPONENT16),O}function b(E,v){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==Pe&&E.minFilter!==De?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function C(E){let v=E.target;v.removeEventListener("dispose",C),w(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&h.delete(v)}function y(E){let v=E.target;v.removeEventListener("dispose",y),P(v)}function w(E){let v=n.get(E);if(v.__webglInit===void 0)return;let O=E.source,k=d.get(O);if(k){let Y=k[v.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&R(E),Object.keys(k).length===0&&d.delete(O)}n.remove(E)}function R(E){let v=n.get(E);s.deleteTexture(v.__webglTexture);let O=E.source,k=d.get(O);delete k[v.__cacheKey],a.memory.textures--}function P(E){let v=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(v.__webglFramebuffer[k]))for(let Y=0;Y<v.__webglFramebuffer[k].length;Y++)s.deleteFramebuffer(v.__webglFramebuffer[k][Y]);else s.deleteFramebuffer(v.__webglFramebuffer[k]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[k])}else{if(Array.isArray(v.__webglFramebuffer))for(let k=0;k<v.__webglFramebuffer.length;k++)s.deleteFramebuffer(v.__webglFramebuffer[k]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let k=0;k<v.__webglColorRenderbuffer.length;k++)v.__webglColorRenderbuffer[k]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[k]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let O=E.textures;for(let k=0,Y=O.length;k<Y;k++){let it=n.get(O[k]);it.__webglTexture&&(s.deleteTexture(it.__webglTexture),a.memory.textures--),n.remove(O[k])}n.remove(E)}let I=0;function V(){I=0}function W(){return I}function N(E){I=E}function G(){let E=I;return E>=i.maxTextures&&Ct("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),I+=1,E}function X(E){let v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function $(E,v){let O=n.get(E);if(E.isVideoTexture&&U(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&O.__version!==E.version){let k=E.image;if(k===null)Ct("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Ct("WebGLRenderer: Texture marked for update but image is incomplete");else{et(O,E,v);return}}else E.isExternalTexture&&(O.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+v)}function Q(E,v){let O=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){et(O,E,v);return}else E.isExternalTexture&&(O.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+v)}function st(E,v){let O=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){et(O,E,v);return}e.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+v)}function rt(E,v){let O=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&O.__version!==E.version){St(O,E,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+v)}let lt={[Li]:s.REPEAT,[ln]:s.CLAMP_TO_EDGE,[cs]:s.MIRRORED_REPEAT},zt={[Pe]:s.NEAREST,[Vh]:s.NEAREST_MIPMAP_NEAREST,[Mr]:s.NEAREST_MIPMAP_LINEAR,[De]:s.LINEAR,[Na]:s.LINEAR_MIPMAP_NEAREST,[gi]:s.LINEAR_MIPMAP_LINEAR},Zt={[Zh]:s.NEVER,[Qh]:s.ALWAYS,[Jh]:s.LESS,[Mo]:s.LEQUAL,[Kh]:s.EQUAL,[So]:s.GEQUAL,[$h]:s.GREATER,[jh]:s.NOTEQUAL};function Ft(E,v){if(v.type===dn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===De||v.magFilter===Na||v.magFilter===Mr||v.magFilter===gi||v.minFilter===De||v.minFilter===Na||v.minFilter===Mr||v.minFilter===gi)&&Ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,lt[v.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,lt[v.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,lt[v.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,zt[v.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,zt[v.minFilter]),v.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,Zt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Pe||v.minFilter!==Mr&&v.minFilter!==gi||v.type===dn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function q(E,v){let O=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",C));let k=v.source,Y=d.get(k);Y===void 0&&(Y={},d.set(k,Y));let it=X(v);if(it!==E.__cacheKey){Y[it]===void 0&&(Y[it]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Y[it].usedTimes++;let ot=Y[E.__cacheKey];ot!==void 0&&(Y[E.__cacheKey].usedTimes--,ot.usedTimes===0&&R(v)),E.__cacheKey=it,E.__webglTexture=Y[it].texture}return O}function nt(E,v,O){return Math.floor(Math.floor(E/O)/v)}function tt(E,v,O,k){let it=E.updateRanges;if(it.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,O,k,v.data);else{it.sort((wt,ft)=>wt.start-ft.start);let ot=0;for(let wt=1;wt<it.length;wt++){let ft=it[ot],ht=it[wt],Pt=ft.start+ft.count,Lt=nt(ht.start,v.width,4),kt=nt(ft.start,v.width,4);ht.start<=Pt+1&&Lt===kt&&nt(ht.start+ht.count-1,v.width,4)===Lt?ft.count=Math.max(ft.count,ht.start+ht.count-ft.start):(++ot,it[ot]=ht)}it.length=ot+1;let Z=e.getParameter(s.UNPACK_ROW_LENGTH),K=e.getParameter(s.UNPACK_SKIP_PIXELS),ct=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let wt=0,ft=it.length;wt<ft;wt++){let ht=it[wt],Pt=Math.floor(ht.start/4),Lt=Math.ceil(ht.count/4),kt=Pt%v.width,D=Math.floor(Pt/v.width),at=Lt,J=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,kt),e.pixelStorei(s.UNPACK_SKIP_ROWS,D),e.texSubImage2D(s.TEXTURE_2D,0,kt,D,at,J,O,k,v.data)}E.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Z),e.pixelStorei(s.UNPACK_SKIP_PIXELS,K),e.pixelStorei(s.UNPACK_SKIP_ROWS,ct)}}function et(E,v,O){let k=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(k=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(k=s.TEXTURE_3D);let Y=q(E,v),it=v.source;e.bindTexture(k,E.__webglTexture,s.TEXTURE0+O);let ot=n.get(it);if(it.version!==ot.__version||Y===!0){if(e.activeTexture(s.TEXTURE0+O),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let J=Yt.getPrimaries(Yt.workingColorSpace),ut=v.colorSpace===Le?null:Yt.getPrimaries(v.colorSpace),_t=v.colorSpace===Le||J===ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t)}e.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment);let K=m(v.image,!1,i.maxTextureSize);K=We(v,K);let ct=r.convert(v.format,v.colorSpace),wt=r.convert(v.type),ft=x(v.internalFormat,ct,wt,v.normalized,v.colorSpace,v.isVideoTexture);Ft(k,v);let ht,Pt=v.mipmaps,Lt=v.isVideoTexture!==!0,kt=ot.__version===void 0||Y===!0,D=it.dataReady,at=b(v,K);if(v.isDepthTexture)ft=T(v.format===_i,v.type),kt&&(Lt?e.texStorage2D(s.TEXTURE_2D,1,ft,K.width,K.height):e.texImage2D(s.TEXTURE_2D,0,ft,K.width,K.height,0,ct,wt,null));else if(v.isDataTexture)if(Pt.length>0){Lt&&kt&&e.texStorage2D(s.TEXTURE_2D,at,ft,Pt[0].width,Pt[0].height);for(let J=0,ut=Pt.length;J<ut;J++)ht=Pt[J],Lt?D&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,ht.width,ht.height,ct,wt,ht.data):e.texImage2D(s.TEXTURE_2D,J,ft,ht.width,ht.height,0,ct,wt,ht.data);v.generateMipmaps=!1}else Lt?(kt&&e.texStorage2D(s.TEXTURE_2D,at,ft,K.width,K.height),D&&tt(v,K,ct,wt)):e.texImage2D(s.TEXTURE_2D,0,ft,K.width,K.height,0,ct,wt,K.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Lt&&kt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,at,ft,Pt[0].width,Pt[0].height,K.depth);for(let J=0,ut=Pt.length;J<ut;J++)if(ht=Pt[J],v.format!==en)if(ct!==null)if(Lt){if(D)if(v.layerUpdates.size>0){let _t=Jl(ht.width,ht.height,v.format,v.type);for(let j of v.layerUpdates){let At=ht.data.subarray(j*_t/ht.data.BYTES_PER_ELEMENT,(j+1)*_t/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,j,ht.width,ht.height,1,ct,At)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,K.depth,ct,ht.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,J,ft,ht.width,ht.height,K.depth,0,ht.data,0,0);else Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Lt?D&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,K.depth,ct,wt,ht.data):e.texImage3D(s.TEXTURE_2D_ARRAY,J,ft,ht.width,ht.height,K.depth,0,ct,wt,ht.data)}else{Lt&&kt&&e.texStorage2D(s.TEXTURE_2D,at,ft,Pt[0].width,Pt[0].height);for(let J=0,ut=Pt.length;J<ut;J++)ht=Pt[J],v.format!==en?ct!==null?Lt?D&&e.compressedTexSubImage2D(s.TEXTURE_2D,J,0,0,ht.width,ht.height,ct,ht.data):e.compressedTexImage2D(s.TEXTURE_2D,J,ft,ht.width,ht.height,0,ht.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Lt?D&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,ht.width,ht.height,ct,wt,ht.data):e.texImage2D(s.TEXTURE_2D,J,ft,ht.width,ht.height,0,ct,wt,ht.data)}else if(v.isDataArrayTexture)if(Lt){if(kt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,at,ft,K.width,K.height,K.depth),D)if(v.layerUpdates.size>0){let J=Jl(K.width,K.height,v.format,v.type);for(let ut of v.layerUpdates){let _t=K.data.subarray(ut*J/K.data.BYTES_PER_ELEMENT,(ut+1)*J/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ut,K.width,K.height,1,ct,wt,_t)}v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,ct,wt,K.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,ft,K.width,K.height,K.depth,0,ct,wt,K.data);else if(v.isData3DTexture)Lt?(kt&&e.texStorage3D(s.TEXTURE_3D,at,ft,K.width,K.height,K.depth),D&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,ct,wt,K.data)):e.texImage3D(s.TEXTURE_3D,0,ft,K.width,K.height,K.depth,0,ct,wt,K.data);else if(v.isFramebufferTexture){if(kt)if(Lt)e.texStorage2D(s.TEXTURE_2D,at,ft,K.width,K.height);else{let J=K.width,ut=K.height;for(let _t=0;_t<at;_t++)e.texImage2D(s.TEXTURE_2D,_t,ft,J,ut,0,ct,wt,null),J>>=1,ut>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in s){let J=s.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),K.parentNode!==J){J.appendChild(K),h.add(v),J.onpaint=ut=>{let _t=ut.changedElements;for(let j of h)_t.includes(j.image)&&(j.needsUpdate=!0)},J.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,K);else{let _t=s.RGBA,j=s.RGBA,At=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,_t,j,At,K)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Pt.length>0){if(Lt&&kt){let J=ee(Pt[0]);e.texStorage2D(s.TEXTURE_2D,at,ft,J.width,J.height)}for(let J=0,ut=Pt.length;J<ut;J++)ht=Pt[J],Lt?D&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,ct,wt,ht):e.texImage2D(s.TEXTURE_2D,J,ft,ct,wt,ht);v.generateMipmaps=!1}else if(Lt){if(kt){let J=ee(K);e.texStorage2D(s.TEXTURE_2D,at,ft,J.width,J.height)}D&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ct,wt,K)}else e.texImage2D(s.TEXTURE_2D,0,ft,ct,wt,K);g(v)&&A(k),ot.__version=it.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function St(E,v,O){if(v.image.length!==6)return;let k=q(E,v),Y=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+O);let it=n.get(Y);if(Y.version!==it.__version||k===!0){e.activeTexture(s.TEXTURE0+O);let ot=Yt.getPrimaries(Yt.workingColorSpace),Z=v.colorSpace===Le?null:Yt.getPrimaries(v.colorSpace),K=v.colorSpace===Le||ot===Z?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let ct=v.isCompressedTexture||v.image[0].isCompressedTexture,wt=v.image[0]&&v.image[0].isDataTexture,ft=[];for(let j=0;j<6;j++)!ct&&!wt?ft[j]=m(v.image[j],!0,i.maxCubemapSize):ft[j]=wt?v.image[j].image:v.image[j],ft[j]=We(v,ft[j]);let ht=ft[0],Pt=r.convert(v.format,v.colorSpace),Lt=r.convert(v.type),kt=x(v.internalFormat,Pt,Lt,v.normalized,v.colorSpace),D=v.isVideoTexture!==!0,at=it.__version===void 0||k===!0,J=Y.dataReady,ut=b(v,ht);Ft(s.TEXTURE_CUBE_MAP,v);let _t;if(ct){D&&at&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ut,kt,ht.width,ht.height);for(let j=0;j<6;j++){_t=ft[j].mipmaps;for(let At=0;At<_t.length;At++){let bt=_t[At];v.format!==en?Pt!==null?D?J&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,At,0,0,bt.width,bt.height,Pt,bt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,At,kt,bt.width,bt.height,0,bt.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,At,0,0,bt.width,bt.height,Pt,Lt,bt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,At,kt,bt.width,bt.height,0,Pt,Lt,bt.data)}}}else{if(_t=v.mipmaps,D&&at){_t.length>0&&ut++;let j=ee(ft[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ut,kt,j.width,j.height)}for(let j=0;j<6;j++)if(wt){D?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ft[j].width,ft[j].height,Pt,Lt,ft[j].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,kt,ft[j].width,ft[j].height,0,Pt,Lt,ft[j].data);for(let At=0;At<_t.length;At++){let fe=_t[At].image[j].image;D?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,At+1,0,0,fe.width,fe.height,Pt,Lt,fe.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,At+1,kt,fe.width,fe.height,0,Pt,Lt,fe.data)}}else{D?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Pt,Lt,ft[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,kt,Pt,Lt,ft[j]);for(let At=0;At<_t.length;At++){let bt=_t[At];D?J&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,At+1,0,0,Pt,Lt,bt.image[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,At+1,kt,Pt,Lt,bt.image[j])}}}g(v)&&A(s.TEXTURE_CUBE_MAP),it.__version=Y.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function vt(E,v,O,k,Y,it){let ot=r.convert(O.format,O.colorSpace),Z=r.convert(O.type),K=x(O.internalFormat,ot,Z,O.normalized,O.colorSpace),ct=n.get(v),wt=n.get(O);if(wt.__renderTarget=v,!ct.__hasExternalTextures){let ft=Math.max(1,v.width>>it),ht=Math.max(1,v.height>>it);Y===s.TEXTURE_3D||Y===s.TEXTURE_2D_ARRAY?e.texImage3D(Y,it,K,ft,ht,v.depth,0,ot,Z,null):e.texImage2D(Y,it,K,ft,ht,0,ot,Z,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),ye(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,k,Y,wt.__webglTexture,0,ue(v)):(Y===s.TEXTURE_2D||Y>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,k,Y,wt.__webglTexture,it),e.bindFramebuffer(s.FRAMEBUFFER,null)}function qt(E,v,O){if(s.bindRenderbuffer(s.RENDERBUFFER,E),v.depthBuffer){let k=v.depthTexture,Y=k&&k.isDepthTexture?k.type:null,it=T(v.stencilBuffer,Y),ot=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;ye(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ue(v),it,v.width,v.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,ue(v),it,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,it,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ot,s.RENDERBUFFER,E)}else{let k=v.textures;for(let Y=0;Y<k.length;Y++){let it=k[Y],ot=r.convert(it.format,it.colorSpace),Z=r.convert(it.type),K=x(it.internalFormat,ot,Z,it.normalized,it.colorSpace);ye(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ue(v),K,v.width,v.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,ue(v),K,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,K,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function yt(E,v,O){let k=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=n.get(v.depthTexture);if(Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),k){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),Y.__webglTexture===void 0){Y.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),Ft(s.TEXTURE_CUBE_MAP,v.depthTexture);let ct=r.convert(v.depthTexture.format),wt=r.convert(v.depthTexture.type),ft;v.depthTexture.format===Pn?ft=s.DEPTH_COMPONENT24:v.depthTexture.format===_i&&(ft=s.DEPTH24_STENCIL8);for(let ht=0;ht<6;ht++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,ft,v.width,v.height,0,ct,wt,null)}}else $(v.depthTexture,0);let it=Y.__webglTexture,ot=ue(v),Z=k?s.TEXTURE_CUBE_MAP_POSITIVE_X+O:s.TEXTURE_2D,K=v.depthTexture.format===_i?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(v.depthTexture.format===Pn)ye(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,Z,it,0,ot):s.framebufferTexture2D(s.FRAMEBUFFER,K,Z,it,0);else if(v.depthTexture.format===_i)ye(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,Z,it,0,ot):s.framebufferTexture2D(s.FRAMEBUFFER,K,Z,it,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ot(E){let v=n.get(E),O=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){let k=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),k){let Y=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,k.removeEventListener("dispose",Y)};k.addEventListener("dispose",Y),v.__depthDisposeCallback=Y}v.__boundDepthTexture=k}if(E.depthTexture&&!v.__autoAllocateDepthBuffer)if(O)for(let k=0;k<6;k++)yt(v.__webglFramebuffer[k],E,k);else{let k=E.texture.mipmaps;k&&k.length>0?yt(v.__webglFramebuffer[0],E,0):yt(v.__webglFramebuffer,E,0)}else if(O){v.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[k]),v.__webglDepthbuffer[k]===void 0)v.__webglDepthbuffer[k]=s.createRenderbuffer(),qt(v.__webglDepthbuffer[k],E,!1);else{let Y=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,it=v.__webglDepthbuffer[k];s.bindRenderbuffer(s.RENDERBUFFER,it),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,it)}}else{let k=E.texture.mipmaps;if(k&&k.length>0?e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),qt(v.__webglDepthbuffer,E,!1);else{let Y=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,it=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,it),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,it)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Dt(E,v,O){let k=n.get(E);v!==void 0&&vt(k.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&Ot(E)}function Jt(E){let v=E.texture,O=n.get(E),k=n.get(v);E.addEventListener("dispose",y);let Y=E.textures,it=E.isWebGLCubeRenderTarget===!0,ot=Y.length>1;if(ot||(k.__webglTexture===void 0&&(k.__webglTexture=s.createTexture()),k.__version=v.version,a.memory.textures++),it){O.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[Z]=[];for(let K=0;K<v.mipmaps.length;K++)O.__webglFramebuffer[Z][K]=s.createFramebuffer()}else O.__webglFramebuffer[Z]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let Z=0;Z<v.mipmaps.length;Z++)O.__webglFramebuffer[Z]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(ot)for(let Z=0,K=Y.length;Z<K;Z++){let ct=n.get(Y[Z]);ct.__webglTexture===void 0&&(ct.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&ye(E)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Z=0;Z<Y.length;Z++){let K=Y[Z];O.__webglColorRenderbuffer[Z]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[Z]);let ct=r.convert(K.format,K.colorSpace),wt=r.convert(K.type),ft=x(K.internalFormat,ct,wt,K.normalized,K.colorSpace,E.isXRRenderTarget===!0),ht=ue(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,ft,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Z,s.RENDERBUFFER,O.__webglColorRenderbuffer[Z])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),qt(O.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(it){e.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture),Ft(s.TEXTURE_CUBE_MAP,v);for(let Z=0;Z<6;Z++)if(v.mipmaps&&v.mipmaps.length>0)for(let K=0;K<v.mipmaps.length;K++)vt(O.__webglFramebuffer[Z][K],E,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,K);else vt(O.__webglFramebuffer[Z],E,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);g(v)&&A(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ot){for(let Z=0,K=Y.length;Z<K;Z++){let ct=Y[Z],wt=n.get(ct),ft=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ft=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ft,wt.__webglTexture),Ft(ft,ct),vt(O.__webglFramebuffer,E,ct,s.COLOR_ATTACHMENT0+Z,ft,0),g(ct)&&A(ft)}e.unbindTexture()}else{let Z=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Z=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Z,k.__webglTexture),Ft(Z,v),v.mipmaps&&v.mipmaps.length>0)for(let K=0;K<v.mipmaps.length;K++)vt(O.__webglFramebuffer[K],E,v,s.COLOR_ATTACHMENT0,Z,K);else vt(O.__webglFramebuffer,E,v,s.COLOR_ATTACHMENT0,Z,0);g(v)&&A(Z),e.unbindTexture()}E.depthBuffer&&Ot(E)}function ve(E){let v=E.textures;for(let O=0,k=v.length;O<k;O++){let Y=v[O];if(g(Y)){let it=M(E),ot=n.get(Y).__webglTexture;e.bindTexture(it,ot),A(it),e.unbindTexture()}}}let Te=[],Ce=[];function Ie(E){if(E.samples>0){if(ye(E)===!1){let v=E.textures,O=E.width,k=E.height,Y=s.COLOR_BUFFER_BIT,it=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ot=n.get(E),Z=v.length>1;if(Z)for(let ct=0;ct<v.length;ct++)e.bindFramebuffer(s.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ot.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ot.__webglMultisampledFramebuffer);let K=E.texture.mipmaps;K&&K.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ot.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let ct=0;ct<v.length;ct++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Y|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Y|=s.STENCIL_BUFFER_BIT)),Z){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ot.__webglColorRenderbuffer[ct]);let wt=n.get(v[ct]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,wt,0)}s.blitFramebuffer(0,0,O,k,0,0,O,k,Y,s.NEAREST),l===!0&&(Te.length=0,Ce.length=0,Te.push(s.COLOR_ATTACHMENT0+ct),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Te.push(it),Ce.push(it),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ce)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Te))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Z)for(let ct=0;ct<v.length;ct++){e.bindFramebuffer(s.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.RENDERBUFFER,ot.__webglColorRenderbuffer[ct]);let wt=n.get(v[ct]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ot.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.TEXTURE_2D,wt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ot.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let v=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function ue(E){return Math.min(i.maxSamples,E.samples)}function ye(E){let v=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function U(E){let v=a.render.frame;u.get(E)!==v&&(u.set(E,v),E.update())}function We(E,v){let O=E.colorSpace,k=E.format,Y=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||O!==ks&&O!==Le&&(Yt.getTransfer(O)===Qt?(k!==en||Y!==qe)&&Ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ut("WebGLTextures: Unsupported texture color space:",O)),v}function ee(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=V,this.getTextureUnits=W,this.setTextureUnits=N,this.setTexture2D=$,this.setTexture2DArray=Q,this.setTexture3D=st,this.setTextureCube=rt,this.rebindTextures=Dt,this.setupRenderTarget=Jt,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=ye,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function u_(s,t){function e(n,i=Le){let r,a=Yt.getTransfer(i);if(n===qe)return s.UNSIGNED_BYTE;if(n===Oa)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ba)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ol)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Bl)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nl)return s.BYTE;if(n===Fl)return s.SHORT;if(n===Ts)return s.UNSIGNED_SHORT;if(n===Fa)return s.INT;if(n===Mn)return s.UNSIGNED_INT;if(n===dn)return s.FLOAT;if(n===Dn)return s.HALF_FLOAT;if(n===zl)return s.ALPHA;if(n===kl)return s.RGB;if(n===en)return s.RGBA;if(n===Pn)return s.DEPTH_COMPONENT;if(n===_i)return s.DEPTH_STENCIL;if(n===Vl)return s.RED;if(n===za)return s.RED_INTEGER;if(n===xi)return s.RG;if(n===ka)return s.RG_INTEGER;if(n===Va)return s.RGBA_INTEGER;if(n===Sr||n===br||n===Tr||n===Ar)if(a===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ar)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ga||n===Ha||n===Wa||n===Xa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ga)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ha)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===qa||n===Ya||n===Za||n===Ja||n===Ka||n===wr||n===$a)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===qa||n===Ya)return a===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Za)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ja)return r.COMPRESSED_R11_EAC;if(n===Ka)return r.COMPRESSED_SIGNED_R11_EAC;if(n===wr)return r.COMPRESSED_RG11_EAC;if(n===$a)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ja||n===Qa||n===to||n===eo||n===no||n===io||n===so||n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ja)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qa)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===to)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===eo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===no)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===io)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===so)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ro)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ao)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===oo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===lo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===co)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ho)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===uo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fo||n===po||n===mo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===fo)return a===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===po)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===mo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===go||n===_o||n===Er||n===xo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===go)return r.COMPRESSED_RED_RGTC1_EXT;if(n===_o)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Er)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===xo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===As?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var f_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d_=`
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

}`,cc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Qs(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Qe({vertexShader:f_,fragmentShader:d_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ze(new rr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},hc=class extends hn{constructor(t,e){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,p=null,_=typeof XRWebGLBinding<"u",m=new cc,g={},A=e.getContextAttributes(),M=null,x=null,T=[],b=[],C=new It,y=null,w=new Se;w.viewport=new ne;let R=new Se;R.viewport=new ne;let P=[w,R],I=new Pa,V=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let nt=T[q];return nt===void 0&&(nt=new ds,T[q]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(q){let nt=T[q];return nt===void 0&&(nt=new ds,T[q]=nt),nt.getGripSpace()},this.getHand=function(q){let nt=T[q];return nt===void 0&&(nt=new ds,T[q]=nt),nt.getHandSpace()};function N(q){let nt=b.indexOf(q.inputSource);if(nt===-1)return;let tt=T[nt];tt!==void 0&&(tt.update(q.inputSource,q.frame,c||a),tt.dispatchEvent({type:q.type,data:q.inputSource}))}function G(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",X);for(let q=0;q<T.length;q++){let nt=b[q];nt!==null&&(b[q]=null,T[q].disconnect(nt))}V=null,W=null,m.reset();for(let q in g)delete g[q];t.setRenderTarget(M),d=null,f=null,h=null,i=null,x=null,Ft.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&Ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&Ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(i,e)),h},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(M=t.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",G),i.addEventListener("inputsourceschange",X),A.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let tt=null,et=null,St=null;A.depth&&(St=A.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=A.stencil?_i:Pn,et=A.stencil?As:Mn);let vt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(vt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new $e(f.textureWidth,f.textureHeight,{format:en,type:qe,depthTexture:new Wn(f.textureWidth,f.textureHeight,et,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:A.stencil,colorSpace:t.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let tt={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,tt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new $e(d.framebufferWidth,d.framebufferHeight,{format:en,type:qe,colorSpace:t.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ft.setContext(i),Ft.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(q){for(let nt=0;nt<q.removed.length;nt++){let tt=q.removed[nt],et=b.indexOf(tt);et>=0&&(b[et]=null,T[et].disconnect(tt))}for(let nt=0;nt<q.added.length;nt++){let tt=q.added[nt],et=b.indexOf(tt);if(et===-1){for(let vt=0;vt<T.length;vt++)if(vt>=b.length){b.push(tt),et=vt;break}else if(b[vt]===null){b[vt]=tt,et=vt;break}if(et===-1)break}let St=T[et];St&&St.connect(tt)}}let $=new L,Q=new L;function st(q,nt,tt){$.setFromMatrixPosition(nt.matrixWorld),Q.setFromMatrixPosition(tt.matrixWorld);let et=$.distanceTo(Q),St=nt.projectionMatrix.elements,vt=tt.projectionMatrix.elements,qt=St[14]/(St[10]-1),yt=St[14]/(St[10]+1),Ot=(St[9]+1)/St[5],Dt=(St[9]-1)/St[5],Jt=(St[8]-1)/St[0],ve=(vt[8]+1)/vt[0],Te=qt*Jt,Ce=qt*ve,Ie=et/(-Jt+ve),ue=Ie*-Jt;if(nt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ue),q.translateZ(Ie),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),St[10]===-1)q.projectionMatrix.copy(nt.projectionMatrix),q.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let ye=qt+Ie,U=yt+Ie,We=Te-ue,ee=Ce+(et-ue),E=Ot*yt/U*ye,v=Dt*yt/U*ye;q.projectionMatrix.makePerspective(We,ee,E,v,ye,U),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function rt(q,nt){nt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(nt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let nt=q.near,tt=q.far;m.texture!==null&&(m.depthNear>0&&(nt=m.depthNear),m.depthFar>0&&(tt=m.depthFar)),I.near=R.near=w.near=nt,I.far=R.far=w.far=tt,(V!==I.near||W!==I.far)&&(i.updateRenderState({depthNear:I.near,depthFar:I.far}),V=I.near,W=I.far),I.layers.mask=q.layers.mask|6,w.layers.mask=I.layers.mask&-5,R.layers.mask=I.layers.mask&-3;let et=q.parent,St=I.cameras;rt(I,et);for(let vt=0;vt<St.length;vt++)rt(St[vt],et);St.length===2?st(I,w,R):I.projectionMatrix.copy(w.projectionMatrix),lt(q,I,et)};function lt(q,nt,tt){tt===null?q.matrix.copy(nt.matrixWorld):(q.matrix.copy(tt.matrixWorld),q.matrix.invert(),q.matrix.multiply(nt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(nt.projectionMatrix),q.projectionMatrixInverse.copy(nt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ui*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(q){return g[q]};let zt=null;function Zt(q,nt){if(u=nt.getViewerPose(c||a),p=nt,u!==null){let tt=u.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let et=!1;tt.length!==I.cameras.length&&(I.cameras.length=0,et=!0);for(let yt=0;yt<tt.length;yt++){let Ot=tt[yt],Dt=null;if(d!==null)Dt=d.getViewport(Ot);else{let ve=h.getViewSubImage(f,Ot);Dt=ve.viewport,yt===0&&(t.setRenderTargetTextures(x,ve.colorTexture,ve.depthStencilTexture),t.setRenderTarget(x))}let Jt=P[yt];Jt===void 0&&(Jt=new Se,Jt.layers.enable(yt),Jt.viewport=new ne,P[yt]=Jt),Jt.matrix.fromArray(Ot.transform.matrix),Jt.matrix.decompose(Jt.position,Jt.quaternion,Jt.scale),Jt.projectionMatrix.fromArray(Ot.projectionMatrix),Jt.projectionMatrixInverse.copy(Jt.projectionMatrix).invert(),Jt.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),yt===0&&(I.matrix.copy(Jt.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),et===!0&&I.cameras.push(Jt)}let St=i.enabledFeatures;if(St&&St.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){h=n.getBinding();let yt=h.getDepthInformation(tt[0]);yt&&yt.isValid&&yt.texture&&m.init(yt,i.renderState)}if(St&&St.includes("camera-access")&&_){t.state.unbindTexture(),h=n.getBinding();for(let yt=0;yt<tt.length;yt++){let Ot=tt[yt].camera;if(Ot){let Dt=g[Ot];Dt||(Dt=new Qs,g[Ot]=Dt);let Jt=h.getCameraImage(Ot);Dt.sourceTexture=Jt}}}}for(let tt=0;tt<T.length;tt++){let et=b[tt],St=T[tt];et!==null&&St!==void 0&&St.update(et,nt,c||a)}zt&&zt(q,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),p=null}let Ft=new Lu;Ft.setAnimationLoop(Zt),this.setAnimationLoop=function(q){zt=q},this.dispose=function(){}}},p_=new Gt,zu=new Bt;zu.set(-1,0,0,0,1,0,0,0,1);function m_(s,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,ql(s)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function i(m,g,A,M,x){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),h(m,g)):g.isMeshPhongMaterial?(r(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,x)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),_(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,A,M):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Ge&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Ge&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let A=t.get(g),M=A.envMap,x=A.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(p_.makeRotationFromEuler(x)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(zu),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,A,M){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*A,m.scale.value=M*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function h(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,A){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Ge&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){let A=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function g_(s,t,e,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,T){let b=T.program;n.uniformBlockBinding(x,b)}function c(x,T){let b=i[x.id];b===void 0&&(m(x),b=u(x),i[x.id]=b,x.addEventListener("dispose",A));let C=T.program;n.updateUBOMapping(x,C);let y=t.render.frame;r[x.id]!==y&&(f(x),r[x.id]=y)}function u(x){let T=h();x.__bindingPointIndex=T;let b=s.createBuffer(),C=x.__size,y=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,C,y),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,T,b),b}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ut("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){let T=i[x.id],b=x.uniforms,C=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,T);for(let y=0,w=b.length;y<w;y++){let R=b[y];if(Array.isArray(R))for(let P=0,I=R.length;P<I;P++)d(R[P],y,P,C);else d(R,y,0,C)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(x,T,b,C){if(_(x,T,b,C)===!0){let y=x.__offset,w=x.value;if(Array.isArray(w)){let R=0;for(let P=0;P<w.length;P++){let I=w[P],V=g(I);p(I,x.__data,R),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(R+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(w,x.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,y,x.__data)}}function p(x,T,b){typeof x=="number"||typeof x=="boolean"?T[0]=x:x.isMatrix3?(T[0]=x.elements[0],T[1]=x.elements[1],T[2]=x.elements[2],T[3]=0,T[4]=x.elements[3],T[5]=x.elements[4],T[6]=x.elements[5],T[7]=0,T[8]=x.elements[6],T[9]=x.elements[7],T[10]=x.elements[8],T[11]=0):ArrayBuffer.isView(x)?T.set(new x.constructor(x.buffer,x.byteOffset,T.length)):x.toArray(T,b)}function _(x,T,b,C){let y=x.value,w=T+"_"+b;if(C[w]===void 0)return typeof y=="number"||typeof y=="boolean"?C[w]=y:ArrayBuffer.isView(y)?C[w]=y.slice():C[w]=y.clone(),!0;{let R=C[w];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return C[w]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(R.equals(y)===!1)return R.copy(y),!0}}return!1}function m(x){let T=x.uniforms,b=0,C=16;for(let w=0,R=T.length;w<R;w++){let P=Array.isArray(T[w])?T[w]:[T[w]];for(let I=0,V=P.length;I<V;I++){let W=P[I],N=Array.isArray(W.value)?W.value:[W.value];for(let G=0,X=N.length;G<X;G++){let $=N[G],Q=g($),st=b%C,rt=st%Q.boundary,lt=st+rt;b+=rt,lt!==0&&C-lt<Q.storage&&(b+=C-lt),W.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=b,b+=Q.storage}}}let y=b%C;return y>0&&(b+=C-y),x.__size=b,x.__cache={},this}function g(x){let T={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(T.boundary=4,T.storage=4):x.isVector2?(T.boundary=8,T.storage=8):x.isVector3||x.isColor?(T.boundary=16,T.storage=12):x.isVector4?(T.boundary=16,T.storage=16):x.isMatrix3?(T.boundary=48,T.storage=48):x.isMatrix4?(T.boundary=64,T.storage=64):x.isTexture?Ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(T.boundary=16,T.storage=x.byteLength):Ct("WebGLRenderer: Unsupported uniform value type.",x),T}function A(x){let T=x.target;T.removeEventListener("dispose",A);let b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(i[T.id]),delete i[T.id],delete r[T.id]}function M(){for(let x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:l,update:c,dispose:M}}var __=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ln=null;function x_(){return Ln===null&&(Ln=new Ks(__,16,16,xi,Dn),Ln.name="DFG_LUT",Ln.minFilter=De,Ln.magFilter=De,Ln.wrapS=ln,Ln.wrapT=ln,Ln.generateMipmaps=!1,Ln.needsUpdate=!0),Ln}var Eo=class{constructor(t={}){let{canvas:e=tu(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:d=qe}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let _=d,m=new Set([Va,ka,za]),g=new Set([qe,Mn,Ts,As,Oa,Ba]),A=new Uint32Array(4),M=new Int32Array(4),x=new L,T=null,b=null,C=[],y=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,P=!1,I=null,V=null,W=null,N=null;this._outputColorSpace=$t;let G=0,X=0,$=null,Q=-1,st=null,rt=new ne,lt=new ne,zt=null,Zt=new Nt(0),Ft=0,q=e.width,nt=e.height,tt=1,et=null,St=null,vt=new ne(0,0,q,nt),qt=new ne(0,0,q,nt),yt=!1,Ot=new ms,Dt=!1,Jt=!1,ve=new Gt,Te=new L,Ce=new ne,Ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ue=!1;function ye(){return $===null?tt:1}let U=n;function We(S,F){return e.getContext(S,F)}try{let S={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"185"}`),e.addEventListener("webglcontextlost",fe,!1),e.addEventListener("webglcontextrestored",oe,!1),e.addEventListener("webglcontextcreationerror",wn,!1),U===null){let F="webgl2";if(U=We(F,S),U===null)throw We(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw Ut("WebGLRenderer: "+S.message),S}let ee,E,v,O,k,Y,it,ot,Z,K,ct,wt,ft,ht,Pt,Lt,kt,D,at,J,ut,_t,j;function At(){ee=new Ag(U),ee.init(),ut=new u_(U,ee),E=new _g(U,ee,t,ut),v=new c_(U,ee),E.reversedDepthBuffer&&f&&v.buffers.depth.setReversed(!0),V=U.createFramebuffer(),W=U.createFramebuffer(),N=U.createFramebuffer(),O=new Cg(U),k=new J0,Y=new h_(U,ee,v,k,E,ut,O),it=new Tg(R),ot=new Dd(U),_t=new mg(U,ot),Z=new wg(U,ot,O,_t),K=new Pg(U,Z,ot,_t,O),D=new Rg(U,E,Y),Pt=new xg(k),ct=new Z0(R,it,ee,E,_t,Pt),wt=new m_(R,k),ft=new $0,ht=new i_(ee),kt=new pg(R,it,v,K,p,l),Lt=new l_(R,K,E),j=new g_(U,O,E,v),at=new gg(U,ee,O),J=new Eg(U,ee,O),O.programs=ct.programs,R.capabilities=E,R.extensions=ee,R.properties=k,R.renderLists=ft,R.shadowMap=Lt,R.state=v,R.info=O}At(),_!==qe&&(w=new Dg(_,e.width,e.height,o,i,r));let bt=new hc(R,U);this.xr=bt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let S=ee.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=ee.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(S){S!==void 0&&(tt=S,this.setSize(q,nt,!1))},this.getSize=function(S){return S.set(q,nt)},this.setSize=function(S,F,H=!0){if(bt.isPresenting){Ct("WebGLRenderer: Can't change size while VR device is presenting.");return}q=S,nt=F,e.width=Math.floor(S*tt),e.height=Math.floor(F*tt),H===!0&&(e.style.width=S+"px",e.style.height=F+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(q*tt,nt*tt).floor()},this.setDrawingBufferSize=function(S,F,H){q=S,nt=F,tt=H,e.width=Math.floor(S*H),e.height=Math.floor(F*H),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(_===qe){Ut("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){Ct("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(rt)},this.getViewport=function(S){return S.copy(vt)},this.setViewport=function(S,F,H,B){S.isVector4?vt.set(S.x,S.y,S.z,S.w):vt.set(S,F,H,B),v.viewport(rt.copy(vt).multiplyScalar(tt).round())},this.getScissor=function(S){return S.copy(qt)},this.setScissor=function(S,F,H,B){S.isVector4?qt.set(S.x,S.y,S.z,S.w):qt.set(S,F,H,B),v.scissor(lt.copy(qt).multiplyScalar(tt).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(S){v.setScissorTest(yt=S)},this.setOpaqueSort=function(S){et=S},this.setTransparentSort=function(S){St=S},this.getClearColor=function(S){return S.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor(...arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,H=!0){let B=0;if(S){let z=!1;if($!==null){let gt=$.texture.format;z=m.has(gt)}if(z){let gt=$.texture.type,Mt=g.has(gt),mt=kt.getClearColor(),Tt=kt.getClearAlpha(),Et=mt.r,Vt=mt.g,Wt=mt.b;Mt?(A[0]=Et,A[1]=Vt,A[2]=Wt,A[3]=Tt,U.clearBufferuiv(U.COLOR,0,A)):(M[0]=Et,M[1]=Vt,M[2]=Wt,M[3]=Tt,U.clearBufferiv(U.COLOR,0,M))}else B|=U.COLOR_BUFFER_BIT}F&&(B|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(B|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),I=S},this.dispose=function(){e.removeEventListener("webglcontextlost",fe,!1),e.removeEventListener("webglcontextrestored",oe,!1),e.removeEventListener("webglcontextcreationerror",wn,!1),kt.dispose(),ft.dispose(),ht.dispose(),k.dispose(),it.dispose(),K.dispose(),_t.dispose(),j.dispose(),ct.dispose(),bt.dispose(),bt.removeEventListener("sessionstart",Dc),bt.removeEventListener("sessionend",Lc),Si.stop()};function fe(S){S.preventDefault(),Hl("WebGLRenderer: Context Lost."),P=!0}function oe(){Hl("WebGLRenderer: Context Restored."),P=!1;let S=O.autoReset,F=Lt.enabled,H=Lt.autoUpdate,B=Lt.needsUpdate,z=Lt.type;At(),O.autoReset=S,Lt.enabled=F,Lt.autoUpdate=H,Lt.needsUpdate=B,Lt.type=z}function wn(S){Ut("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function En(S){let F=S.target;F.removeEventListener("dispose",En),af(F)}function af(S){of(S),k.remove(S)}function of(S){let F=k.get(S).programs;F!==void 0&&(F.forEach(function(H){ct.releaseProgram(H)}),S.isShaderMaterial&&ct.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,H,B,z,gt){F===null&&(F=Ie);let Mt=z.isMesh&&z.matrixWorld.determinantAffine()<0,mt=hf(S,F,H,B,z);v.setMaterial(B,Mt);let Tt=H.index,Et=1;if(B.wireframe===!0){if(Tt=Z.getWireframeAttribute(H),Tt===void 0)return;Et=2}let Vt=H.drawRange,Wt=H.attributes.position,Rt=Vt.start*Et,ie=(Vt.start+Vt.count)*Et;gt!==null&&(Rt=Math.max(Rt,gt.start*Et),ie=Math.min(ie,(gt.start+gt.count)*Et)),Tt!==null?(Rt=Math.max(Rt,0),ie=Math.min(ie,Tt.count)):Wt!=null&&(Rt=Math.max(Rt,0),ie=Math.min(ie,Wt.count));let ge=ie-Rt;if(ge<0||ge===1/0)return;_t.setup(z,B,mt,H,Tt);let de,re=at;if(Tt!==null&&(de=ot.get(Tt),re=J,re.setIndex(de)),z.isMesh)B.wireframe===!0?(v.setLineWidth(B.wireframeLinewidth*ye()),re.setMode(U.LINES)):re.setMode(U.TRIANGLES);else if(z.isLine){let Ue=B.linewidth;Ue===void 0&&(Ue=1),v.setLineWidth(Ue*ye()),z.isLineSegments?re.setMode(U.LINES):z.isLineLoop?re.setMode(U.LINE_LOOP):re.setMode(U.LINE_STRIP)}else z.isPoints?re.setMode(U.POINTS):z.isSprite&&re.setMode(U.TRIANGLES);if(z.isBatchedMesh)if(ee.get("WEBGL_multi_draw"))re.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let Ue=z._multiDrawStarts,xt=z._multiDrawCounts,Ze=z._multiDrawCount,Kt=Tt?ot.get(Tt).bytesPerElement:1,rn=k.get(B).currentProgram.getUniforms();for(let Cn=0;Cn<Ze;Cn++)rn.setValue(U,"_gl_DrawID",Cn),re.render(Ue[Cn]/Kt,xt[Cn])}else if(z.isInstancedMesh)re.renderInstances(Rt,ge,z.count);else if(H.isInstancedBufferGeometry){let Ue=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,xt=Math.min(H.instanceCount,Ue);re.renderInstances(Rt,ge,xt)}else re.render(Rt,ge)};function Ic(S,F,H){S.transparent===!0&&S.side===tn&&S.forceSinglePass===!1?(S.side=Ge,S.needsUpdate=!0,Fr(S,F,H),S.side=Hn,S.needsUpdate=!0,Fr(S,F,H),S.side=tn):Fr(S,F,H)}this.compile=function(S,F,H=null){H===null&&(H=S),b=ht.get(H),b.init(F),y.push(b),H.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(b.pushLight(z),z.castShadow&&b.pushShadow(z))}),S!==H&&S.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(b.pushLight(z),z.castShadow&&b.pushShadow(z))}),b.setupLights();let B=new Set;return S.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let gt=z.material;if(gt)if(Array.isArray(gt))for(let Mt=0;Mt<gt.length;Mt++){let mt=gt[Mt];Ic(mt,H,z),B.add(mt)}else Ic(gt,H,z),B.add(gt)}),b=y.pop(),B},this.compileAsync=function(S,F,H=null){let B=this.compile(S,F,H);return new Promise(z=>{function gt(){if(B.forEach(function(Mt){k.get(Mt).currentProgram.isReady()&&B.delete(Mt)}),B.size===0){z(S);return}setTimeout(gt,10)}ee.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let Oo=null;function lf(S){Oo&&Oo(S)}function Dc(){Si.stop()}function Lc(){Si.start()}let Si=new Lu;Si.setAnimationLoop(lf),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(S){Oo=S,bt.setAnimationLoop(S),S===null?Si.stop():Si.start()},bt.addEventListener("sessionstart",Dc),bt.addEventListener("sessionend",Lc),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){Ut("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;I!==null&&I.renderStart(S,F);let H=bt.enabled===!0&&bt.isPresenting===!0,B=w!==null&&($===null||H)&&w.begin(R,$);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),bt.enabled===!0&&bt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(bt.cameraAutoUpdate===!0&&bt.updateCamera(F),F=bt.getCamera()),S.isScene===!0&&S.onBeforeRender(R,S,F,$),b=ht.get(S,y.length),b.init(F),b.state.textureUnits=Y.getTextureUnits(),y.push(b),ve.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ot.setFromProjectionMatrix(ve,xn,F.reversedDepth),Jt=this.localClippingEnabled,Dt=Pt.init(this.clippingPlanes,Jt),T=ft.get(S,C.length),T.init(),C.push(T),bt.enabled===!0&&bt.isPresenting===!0){let Mt=R.xr.getDepthSensingMesh();Mt!==null&&Bo(Mt,F,-1/0,R.sortObjects)}Bo(S,F,0,R.sortObjects),T.finish(),R.sortObjects===!0&&T.sort(et,St,F.reversedDepth),ue=bt.enabled===!1||bt.isPresenting===!1||bt.hasDepthSensing()===!1,ue&&kt.addToRenderList(T,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Dt===!0&&Pt.beginShadows();let z=b.state.shadowsArray;if(Lt.render(z,S,F),Dt===!0&&Pt.endShadows(),(B&&w.hasRenderPass())===!1){let Mt=T.opaque,mt=T.transmissive;if(b.setupLights(),F.isArrayCamera){let Tt=F.cameras;if(mt.length>0)for(let Et=0,Vt=Tt.length;Et<Vt;Et++){let Wt=Tt[Et];Nc(Mt,mt,S,Wt)}ue&&kt.render(S);for(let Et=0,Vt=Tt.length;Et<Vt;Et++){let Wt=Tt[Et];Uc(T,S,Wt,Wt.viewport)}}else mt.length>0&&Nc(Mt,mt,S,F),ue&&kt.render(S),Uc(T,S,F)}$!==null&&X===0&&(Y.updateMultisampleRenderTarget($),Y.updateRenderTargetMipmap($)),B&&w.end(R),S.isScene===!0&&S.onAfterRender(R,S,F),_t.resetDefaultState(),Q=-1,st=null,y.pop(),y.length>0?(b=y[y.length-1],Y.setTextureUnits(b.state.textureUnits),Dt===!0&&Pt.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,I!==null&&I.renderEnd()};function Bo(S,F,H,B){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)H=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLightProbeGrid)b.pushLightProbeGrid(S);else if(S.isLight)b.pushLight(S),S.castShadow&&b.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ot.intersectsSprite(S)){B&&Ce.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ve);let Mt=K.update(S),mt=S.material;mt.visible&&T.push(S,Mt,mt,H,Ce.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ot.intersectsObject(S))){let Mt=K.update(S),mt=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ce.copy(S.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),Ce.copy(Mt.boundingSphere.center)),Ce.applyMatrix4(S.matrixWorld).applyMatrix4(ve)),Array.isArray(mt)){let Tt=Mt.groups;for(let Et=0,Vt=Tt.length;Et<Vt;Et++){let Wt=Tt[Et],Rt=mt[Wt.materialIndex];Rt&&Rt.visible&&T.push(S,Mt,Rt,H,Ce.z,Wt)}}else mt.visible&&T.push(S,Mt,mt,H,Ce.z,null)}}let gt=S.children;for(let Mt=0,mt=gt.length;Mt<mt;Mt++)Bo(gt[Mt],F,H,B)}function Uc(S,F,H,B){let{opaque:z,transmissive:gt,transparent:Mt}=S;b.setupLightsView(H),Dt===!0&&Pt.setGlobalState(R.clippingPlanes,H),B&&v.viewport(rt.copy(B)),z.length>0&&Nr(z,F,H),gt.length>0&&Nr(gt,F,H),Mt.length>0&&Nr(Mt,F,H),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Nc(S,F,H,B){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[B.id]===void 0){let Rt=ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[B.id]=new $e(1,1,{generateMipmaps:!0,type:Rt?Dn:qe,minFilter:gi,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace})}let gt=b.state.transmissionRenderTarget[B.id],Mt=B.viewport||rt;gt.setSize(Mt.z*R.transmissionResolutionScale,Mt.w*R.transmissionResolutionScale);let mt=R.getRenderTarget(),Tt=R.getActiveCubeFace(),Et=R.getActiveMipmapLevel();R.setRenderTarget(gt),R.getClearColor(Zt),Ft=R.getClearAlpha(),Ft<1&&R.setClearColor(16777215,.5),R.clear(),ue&&kt.render(H);let Vt=R.toneMapping;R.toneMapping=yn;let Wt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),b.setupLightsView(B),Dt===!0&&Pt.setGlobalState(R.clippingPlanes,B),Nr(S,H,B),Y.updateMultisampleRenderTarget(gt),Y.updateRenderTargetMipmap(gt),ee.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let ie=0,ge=F.length;ie<ge;ie++){let de=F[ie],{object:re,geometry:Ue,material:xt,group:Ze}=de;if(xt.side===tn&&re.layers.test(B.layers)){let Kt=xt.side;xt.side=Ge,xt.needsUpdate=!0,Fc(re,H,B,Ue,xt,Ze),xt.side=Kt,xt.needsUpdate=!0,Rt=!0}}Rt===!0&&(Y.updateMultisampleRenderTarget(gt),Y.updateRenderTargetMipmap(gt))}R.setRenderTarget(mt,Tt,Et),R.setClearColor(Zt,Ft),Wt!==void 0&&(B.viewport=Wt),R.toneMapping=Vt}function Nr(S,F,H){let B=F.isScene===!0?F.overrideMaterial:null;for(let z=0,gt=S.length;z<gt;z++){let Mt=S[z],{object:mt,geometry:Tt,group:Et}=Mt,Vt=Mt.material;Vt.allowOverride===!0&&B!==null&&(Vt=B),mt.layers.test(H.layers)&&Fc(mt,F,H,Tt,Vt,Et)}}function Fc(S,F,H,B,z,gt){S.onBeforeRender(R,F,H,B,z,gt),S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),z.onBeforeRender(R,F,H,B,S,gt),z.transparent===!0&&z.side===tn&&z.forceSinglePass===!1?(z.side=Ge,z.needsUpdate=!0,R.renderBufferDirect(H,F,B,z,S,gt),z.side=Hn,z.needsUpdate=!0,R.renderBufferDirect(H,F,B,z,S,gt),z.side=tn):R.renderBufferDirect(H,F,B,z,S,gt),S.onAfterRender(R,F,H,B,z,gt)}function Fr(S,F,H){F.isScene!==!0&&(F=Ie);let B=k.get(S),z=b.state.lights,gt=b.state.shadowsArray,Mt=z.state.version,mt=ct.getParameters(S,z.state,gt,F,H,b.state.lightProbeGridArray),Tt=ct.getProgramCacheKey(mt),Et=B.programs;B.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,B.fog=F.fog;let Vt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;B.envMap=it.get(S.envMap||B.environment,Vt),B.envMapRotation=B.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Et===void 0&&(S.addEventListener("dispose",En),Et=new Map,B.programs=Et);let Wt=Et.get(Tt);if(Wt!==void 0){if(B.currentProgram===Wt&&B.lightsStateVersion===Mt)return Bc(S,mt),Wt}else mt.uniforms=ct.getUniforms(S),I!==null&&S.isNodeMaterial&&I.build(S,H,mt),S.onBeforeCompile(mt,R),Wt=ct.acquireProgram(mt,Tt),Et.set(Tt,Wt),B.uniforms=mt.uniforms;let Rt=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Rt.clippingPlanes=Pt.uniform),Bc(S,mt),B.needsLights=ff(S),B.lightsStateVersion=Mt,B.needsLights&&(Rt.ambientLightColor.value=z.state.ambient,Rt.lightProbe.value=z.state.probe,Rt.directionalLights.value=z.state.directional,Rt.directionalLightShadows.value=z.state.directionalShadow,Rt.spotLights.value=z.state.spot,Rt.spotLightShadows.value=z.state.spotShadow,Rt.rectAreaLights.value=z.state.rectArea,Rt.ltc_1.value=z.state.rectAreaLTC1,Rt.ltc_2.value=z.state.rectAreaLTC2,Rt.pointLights.value=z.state.point,Rt.pointLightShadows.value=z.state.pointShadow,Rt.hemisphereLights.value=z.state.hemi,Rt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Rt.spotLightMatrix.value=z.state.spotLightMatrix,Rt.spotLightMap.value=z.state.spotLightMap,Rt.pointShadowMatrix.value=z.state.pointShadowMatrix),B.lightProbeGrid=b.state.lightProbeGridArray.length>0,B.currentProgram=Wt,B.uniformsList=null,Wt}function Oc(S){if(S.uniformsList===null){let F=S.currentProgram.getUniforms();S.uniformsList=Es.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function Bc(S,F){let H=k.get(S);H.outputColorSpace=F.outputColorSpace,H.batching=F.batching,H.batchingColor=F.batchingColor,H.instancing=F.instancing,H.instancingColor=F.instancingColor,H.instancingMorph=F.instancingMorph,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function cf(S,F){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;x.setFromMatrixPosition(F.matrixWorld);for(let H=0,B=S.length;H<B;H++){let z=S[H];if(z.texture!==null&&z.boundingBox.containsPoint(x))return z}return null}function hf(S,F,H,B,z){F.isScene!==!0&&(F=Ie),Y.resetTextureUnits();let gt=F.fog,Mt=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?F.environment:null,mt=$===null?R.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Yt.workingColorSpace,Tt=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Et=it.get(B.envMap||Mt,Tt),Vt=B.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Wt=!!H.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Rt=!!H.morphAttributes.position,ie=!!H.morphAttributes.normal,ge=!!H.morphAttributes.color,de=yn;B.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(de=R.toneMapping);let re=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ue=re!==void 0?re.length:0,xt=k.get(B),Ze=b.state.lights;if(Dt===!0&&(Jt===!0||S!==st)){let le=S===st&&B.id===Q;Pt.setState(B,S,le)}let Kt=!1;B.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==Ze.state.version||xt.outputColorSpace!==mt||z.isBatchedMesh&&xt.batching===!1||!z.isBatchedMesh&&xt.batching===!0||z.isBatchedMesh&&xt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&xt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&xt.instancing===!1||!z.isInstancedMesh&&xt.instancing===!0||z.isSkinnedMesh&&xt.skinning===!1||!z.isSkinnedMesh&&xt.skinning===!0||z.isInstancedMesh&&xt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&xt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&xt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&xt.instancingMorph===!1&&z.morphTexture!==null||xt.envMap!==Et||B.fog===!0&&xt.fog!==gt||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==Pt.numPlanes||xt.numIntersection!==Pt.numIntersection)||xt.vertexAlphas!==Vt||xt.vertexTangents!==Wt||xt.morphTargets!==Rt||xt.morphNormals!==ie||xt.morphColors!==ge||xt.toneMapping!==de||xt.morphTargetsCount!==Ue||!!xt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Kt=!0):(Kt=!0,xt.__version=B.version);let rn=xt.currentProgram;Kt===!0&&(rn=Fr(B,F,z),I&&B.isNodeMaterial&&I.onUpdateProgram(B,rn,xt));let Cn=!1,Jn=!1,Yi=!1,ae=rn.getUniforms(),_e=xt.uniforms;if(v.useProgram(rn.program)&&(Cn=!0,Jn=!0,Yi=!0),B.id!==Q&&(Q=B.id,Jn=!0),xt.needsLights){let le=cf(b.state.lightProbeGridArray,z);xt.lightProbeGrid!==le&&(xt.lightProbeGrid=le,Jn=!0)}if(Cn||st!==S){v.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ae.setValue(U,"projectionMatrix",S.projectionMatrix),ae.setValue(U,"viewMatrix",S.matrixWorldInverse);let $n=ae.map.cameraPosition;$n!==void 0&&$n.setValue(U,Te.setFromMatrixPosition(S.matrixWorld)),E.logarithmicDepthBuffer&&ae.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ae.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),st!==S&&(st=S,Jn=!0,Yi=!0)}if(xt.needsLights&&(Ze.state.directionalShadowMap.length>0&&ae.setValue(U,"directionalShadowMap",Ze.state.directionalShadowMap,Y),Ze.state.spotShadowMap.length>0&&ae.setValue(U,"spotShadowMap",Ze.state.spotShadowMap,Y),Ze.state.pointShadowMap.length>0&&ae.setValue(U,"pointShadowMap",Ze.state.pointShadowMap,Y)),z.isSkinnedMesh){ae.setOptional(U,z,"bindMatrix"),ae.setOptional(U,z,"bindMatrixInverse");let le=z.skeleton;le&&(le.boneTexture===null&&le.computeBoneTexture(),ae.setValue(U,"boneTexture",le.boneTexture,Y))}z.isBatchedMesh&&(ae.setOptional(U,z,"batchingTexture"),ae.setValue(U,"batchingTexture",z._matricesTexture,Y),ae.setOptional(U,z,"batchingIdTexture"),ae.setValue(U,"batchingIdTexture",z._indirectTexture,Y),ae.setOptional(U,z,"batchingColorTexture"),z._colorsTexture!==null&&ae.setValue(U,"batchingColorTexture",z._colorsTexture,Y));let Kn=H.morphAttributes;if((Kn.position!==void 0||Kn.normal!==void 0||Kn.color!==void 0)&&D.update(z,H,rn),(Jn||xt.receiveShadow!==z.receiveShadow)&&(xt.receiveShadow=z.receiveShadow,ae.setValue(U,"receiveShadow",z.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&F.environment!==null&&(_e.envMapIntensity.value=F.environmentIntensity),_e.dfgLUT!==void 0&&(_e.dfgLUT.value=x_()),Jn){if(ae.setValue(U,"toneMappingExposure",R.toneMappingExposure),xt.needsLights&&uf(_e,Yi),gt&&B.fog===!0&&wt.refreshFogUniforms(_e,gt),wt.refreshMaterialUniforms(_e,B,tt,nt,b.state.transmissionRenderTarget[S.id]),xt.needsLights&&xt.lightProbeGrid){let le=xt.lightProbeGrid;_e.probesSH.value=le.texture,_e.probesMin.value.copy(le.boundingBox.min),_e.probesMax.value.copy(le.boundingBox.max),_e.probesResolution.value.copy(le.resolution)}Es.upload(U,Oc(xt),_e,Y)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Es.upload(U,Oc(xt),_e,Y),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ae.setValue(U,"center",z.center),ae.setValue(U,"modelViewMatrix",z.modelViewMatrix),ae.setValue(U,"normalMatrix",z.normalMatrix),ae.setValue(U,"modelMatrix",z.matrixWorld),B.uniformsGroups!==void 0){let le=B.uniformsGroups;for(let $n=0,Zi=le.length;$n<Zi;$n++){let zc=le[$n];j.update(zc,rn),j.bind(zc,rn)}}return rn}function uf(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function ff(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(S,F,H){let B=k.get(S);B.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),k.get(S.texture).__webglTexture=F,k.get(S.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:H,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){let H=k.get(S);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,H=0){$=S,G=F,X=H;let B=null,z=!1,gt=!1;if(S){let mt=k.get(S);if(mt.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(U.FRAMEBUFFER,mt.__webglFramebuffer),rt.copy(S.viewport),lt.copy(S.scissor),zt=S.scissorTest,v.viewport(rt),v.scissor(lt),v.setScissorTest(zt),Q=-1;return}else if(mt.__webglFramebuffer===void 0)Y.setupRenderTarget(S);else if(mt.__hasExternalTextures)Y.rebindTextures(S,k.get(S.texture).__webglTexture,k.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Vt=S.depthTexture;if(mt.__boundDepthTexture!==Vt){if(Vt!==null&&k.has(Vt)&&(S.width!==Vt.image.width||S.height!==Vt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(S)}}let Tt=S.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(gt=!0);let Et=k.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Et[F])?B=Et[F][H]:B=Et[F],z=!0):S.samples>0&&Y.useMultisampledRTT(S)===!1?B=k.get(S).__webglMultisampledFramebuffer:Array.isArray(Et)?B=Et[H]:B=Et,rt.copy(S.viewport),lt.copy(S.scissor),zt=S.scissorTest}else rt.copy(vt).multiplyScalar(tt).floor(),lt.copy(qt).multiplyScalar(tt).floor(),zt=yt;if(H!==0&&(B=V),v.bindFramebuffer(U.FRAMEBUFFER,B)&&v.drawBuffers(S,B),v.viewport(rt),v.scissor(lt),v.setScissorTest(zt),z){let mt=k.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+F,mt.__webglTexture,H)}else if(gt){let mt=F;for(let Tt=0;Tt<S.textures.length;Tt++){let Et=k.get(S.textures[Tt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Tt,Et.__webglTexture,H,mt)}}else if(S!==null&&H!==0){let mt=k.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,mt.__webglTexture,H)}Q=-1},this.readRenderTargetPixels=function(S,F,H,B,z,gt,Mt,mt=0){if(!(S&&S.isWebGLRenderTarget)){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=k.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Mt!==void 0&&(Tt=Tt[Mt]),Tt){v.bindFramebuffer(U.FRAMEBUFFER,Tt);try{let Et=S.textures[mt],Vt=Et.format,Wt=Et.type;if(S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+mt),!E.textureFormatReadable(Vt)){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!E.textureTypeReadable(Wt)){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-B&&H>=0&&H<=S.height-z&&U.readPixels(F,H,B,z,ut.convert(Vt),ut.convert(Wt),gt)}finally{let Et=$!==null?k.get($).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(S,F,H,B,z,gt,Mt,mt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=k.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Mt!==void 0&&(Tt=Tt[Mt]),Tt)if(F>=0&&F<=S.width-B&&H>=0&&H<=S.height-z){v.bindFramebuffer(U.FRAMEBUFFER,Tt);let Et=S.textures[mt],Vt=Et.format,Wt=Et.type;if(S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+mt),!E.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!E.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Rt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Rt),U.bufferData(U.PIXEL_PACK_BUFFER,gt.byteLength,U.STREAM_READ),U.readPixels(F,H,B,z,ut.convert(Vt),ut.convert(Wt),0);let ie=$!==null?k.get($).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,ie);let ge=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await nu(U,ge,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Rt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,gt),U.deleteBuffer(Rt),U.deleteSync(ge),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,H=0){let B=Math.pow(2,-H),z=Math.floor(S.image.width*B),gt=Math.floor(S.image.height*B),Mt=F!==null?F.x:0,mt=F!==null?F.y:0;Y.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,H,0,0,Mt,mt,z,gt),v.unbindTexture()},this.copyTextureToTexture=function(S,F,H=null,B=null,z=0,gt=0){let Mt,mt,Tt,Et,Vt,Wt,Rt,ie,ge,de=S.isCompressedTexture?S.mipmaps[gt]:S.image;if(H!==null)Mt=H.max.x-H.min.x,mt=H.max.y-H.min.y,Tt=H.isBox3?H.max.z-H.min.z:1,Et=H.min.x,Vt=H.min.y,Wt=H.isBox3?H.min.z:0;else{let _e=Math.pow(2,-z);Mt=Math.floor(de.width*_e),mt=Math.floor(de.height*_e),S.isDataArrayTexture?Tt=de.depth:S.isData3DTexture?Tt=Math.floor(de.depth*_e):Tt=1,Et=0,Vt=0,Wt=0}B!==null?(Rt=B.x,ie=B.y,ge=B.z):(Rt=0,ie=0,ge=0);let re=ut.convert(F.format),Ue=ut.convert(F.type),xt;F.isData3DTexture?(Y.setTexture3D(F,0),xt=U.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Y.setTexture2DArray(F,0),xt=U.TEXTURE_2D_ARRAY):(Y.setTexture2D(F,0),xt=U.TEXTURE_2D),v.activeTexture(U.TEXTURE0),v.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),v.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),v.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);let Ze=v.getParameter(U.UNPACK_ROW_LENGTH),Kt=v.getParameter(U.UNPACK_IMAGE_HEIGHT),rn=v.getParameter(U.UNPACK_SKIP_PIXELS),Cn=v.getParameter(U.UNPACK_SKIP_ROWS),Jn=v.getParameter(U.UNPACK_SKIP_IMAGES);v.pixelStorei(U.UNPACK_ROW_LENGTH,de.width),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,de.height),v.pixelStorei(U.UNPACK_SKIP_PIXELS,Et),v.pixelStorei(U.UNPACK_SKIP_ROWS,Vt),v.pixelStorei(U.UNPACK_SKIP_IMAGES,Wt);let Yi=S.isDataArrayTexture||S.isData3DTexture,ae=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){let _e=k.get(S),Kn=k.get(F),le=k.get(_e.__renderTarget),$n=k.get(Kn.__renderTarget);v.bindFramebuffer(U.READ_FRAMEBUFFER,le.__webglFramebuffer),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let Zi=0;Zi<Tt;Zi++)Yi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,k.get(S).__webglTexture,z,Wt+Zi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,k.get(F).__webglTexture,gt,ge+Zi)),U.blitFramebuffer(Et,Vt,Mt,mt,Rt,ie,Mt,mt,U.DEPTH_BUFFER_BIT,U.NEAREST);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(z!==0||S.isRenderTargetTexture||k.has(S)){let _e=k.get(S),Kn=k.get(F);v.bindFramebuffer(U.READ_FRAMEBUFFER,W),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,N);for(let le=0;le<Tt;le++)Yi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,_e.__webglTexture,z,Wt+le):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,_e.__webglTexture,z),ae?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Kn.__webglTexture,gt,ge+le):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Kn.__webglTexture,gt),z!==0?U.blitFramebuffer(Et,Vt,Mt,mt,Rt,ie,Mt,mt,U.COLOR_BUFFER_BIT,U.NEAREST):ae?U.copyTexSubImage3D(xt,gt,Rt,ie,ge+le,Et,Vt,Mt,mt):U.copyTexSubImage2D(xt,gt,Rt,ie,Et,Vt,Mt,mt);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ae?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(xt,gt,Rt,ie,ge,Mt,mt,Tt,re,Ue,de.data):F.isCompressedArrayTexture?U.compressedTexSubImage3D(xt,gt,Rt,ie,ge,Mt,mt,Tt,re,de.data):U.texSubImage3D(xt,gt,Rt,ie,ge,Mt,mt,Tt,re,Ue,de):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,gt,Rt,ie,Mt,mt,re,Ue,de.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,gt,Rt,ie,de.width,de.height,re,de.data):U.texSubImage2D(U.TEXTURE_2D,gt,Rt,ie,Mt,mt,re,Ue,de);v.pixelStorei(U.UNPACK_ROW_LENGTH,Ze),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Kt),v.pixelStorei(U.UNPACK_SKIP_PIXELS,rn),v.pixelStorei(U.UNPACK_SKIP_ROWS,Cn),v.pixelStorei(U.UNPACK_SKIP_IMAGES,Jn),gt===0&&F.generateMipmaps&&U.generateMipmap(xt),v.unbindTexture()},this.initRenderTarget=function(S){k.get(S).__webglFramebuffer===void 0&&Y.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Y.setTextureCube(S,0):S.isData3DTexture?Y.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Y.setTexture2DArray(S,0):Y.setTexture2D(S,0),v.unbindTexture()},this.resetState=function(){G=0,X=0,$=null,v.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}};var ku={type:"change"},fc={type:"start"},Gu={type:"end"},Po=new Ni,Vu=new on,y_=Math.cos(70*Xl.DEG2RAD),Ee=new L,Ye=2*Math.PI,se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},uc=1e-6,Io=class extends _r{constructor(t,e=null){super(t,e),this.state=se.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:di.ROTATE,MIDDLE:di.DOLLY,RIGHT:di.PAN},this.touches={ONE:pi.ROTATE,TWO:pi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new be,this._lastTargetPosition=new L,this._quat=new be().setFromUnitVectors(t.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ss,this._sphericalDelta=new Ss,this._scale=1,this._panOffset=new L,this._rotateStart=new It,this._rotateEnd=new It,this._rotateDelta=new It,this._panStart=new It,this._panEnd=new It,this._panDelta=new It,this._dollyStart=new It,this._dollyEnd=new It,this._dollyDelta=new It,this._dollyDirection=new L,this._mouse=new It,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=S_.bind(this),this._onPointerDown=M_.bind(this),this._onPointerUp=b_.bind(this),this._onContextMenu=P_.bind(this),this._onMouseWheel=w_.bind(this),this._onKeyDown=E_.bind(this),this._onTouchStart=C_.bind(this),this._onTouchMove=R_.bind(this),this._onMouseDown=T_.bind(this),this._onMouseMove=A_.bind(this),this._interceptControlDown=I_.bind(this),this._interceptControlUp=D_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ku),this.update(),this.state=se.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Ee.copy(e).sub(this.target),Ee.applyQuaternion(this._quat),this._spherical.setFromVector3(Ee),this.autoRotate&&this.state===se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Ye:n>Math.PI&&(n-=Ye),i<-Math.PI?i+=Ye:i>Math.PI&&(i-=Ye),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ee.setFromSpherical(this._spherical),Ee.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ee),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Ee.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ee.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Po.origin.copy(this.object.position),Po.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Po.direction))<y_?this.object.lookAt(this.target):(Vu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Po.intersectPlane(Vu,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>uc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>uc||this._lastTargetPosition.distanceToSquared(this.target)>uc?(this.dispatchEvent(ku),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ye/60*this.autoRotateSpeed*t:Ye/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ee.setFromMatrixColumn(e,0),Ee.multiplyScalar(-t),this._panOffset.add(Ee)}_panUp(t,e){this.screenSpacePanning===!0?Ee.setFromMatrixColumn(e,1):(Ee.setFromMatrixColumn(e,0),Ee.crossVectors(this.object.up,Ee)),Ee.multiplyScalar(t),this._panOffset.add(Ee)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;Ee.copy(i).sub(this.target);let r=Ee.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ye*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ye*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ye*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ye*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ye*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ye*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panStart.set(n,i)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ye*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ye*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new It,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function M_(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function S_(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function b_(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Gu),this.state=se.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function T_(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case di.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=se.DOLLY;break;case di.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=se.ROTATE}break;case di.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=se.PAN}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(fc)}function A_(s){switch(this.state){case se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function w_(s){this.enabled===!1||this.enableZoom===!1||this.state!==se.NONE||(s.preventDefault(),this.dispatchEvent(fc),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Gu))}function E_(s){this.enabled!==!1&&this._handleKeyDown(s)}function C_(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case pi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=se.TOUCH_ROTATE;break;case pi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=se.TOUCH_PAN;break;default:this.state=se.NONE}break;case 2:switch(this.touches.TWO){case pi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=se.TOUCH_DOLLY_PAN;break;case pi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=se.TOUCH_DOLLY_ROTATE;break;default:this.state=se.NONE}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(fc)}function R_(s){switch(this._trackPointer(s),this.state){case se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=se.NONE}}function P_(s){this.enabled!==!1&&s.preventDefault()}function I_(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function D_(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var nn=Uint8Array,Rs=Uint16Array,L_=Int32Array,Hu=new nn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Wu=new nn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),U_=new nn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Xu=function(s,t){for(var e=new Rs(31),n=0;n<31;++n)e[n]=t+=1<<s[n-1];for(var i=new L_(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)i[r]=r-e[n]<<5|n;return{b:e,r:i}},qu=Xu(Hu,2),Yu=qu.b,N_=qu.r;Yu[28]=258,N_[258]=28;var Zu=Xu(Wu,0),F_=Zu.b,TM=Zu.r,gc=new Rs(32768);for(jt=0;jt<32768;++jt)Zn=(jt&43690)>>1|(jt&21845)<<1,Zn=(Zn&52428)>>2|(Zn&13107)<<2,Zn=(Zn&61680)>>4|(Zn&3855)<<4,gc[jt]=((Zn&65280)>>8|(Zn&255)<<8)>>1;var Zn,jt,Ir=(function(s,t,e){for(var n=s.length,i=0,r=new Rs(t);i<n;++i)s[i]&&++r[s[i]-1];var a=new Rs(t);for(i=1;i<t;++i)a[i]=a[i-1]+r[i-1]<<1;var o;if(e){o=new Rs(1<<t);var l=15-t;for(i=0;i<n;++i)if(s[i])for(var c=i<<4|s[i],u=t-s[i],h=a[s[i]-1]++<<u,f=h|(1<<u)-1;h<=f;++h)o[gc[h]>>l]=c}else for(o=new Rs(n),i=0;i<n;++i)s[i]&&(o[i]=gc[a[s[i]-1]++]>>15-s[i]);return o}),Dr=new nn(288);for(jt=0;jt<144;++jt)Dr[jt]=8;var jt;for(jt=144;jt<256;++jt)Dr[jt]=9;var jt;for(jt=256;jt<280;++jt)Dr[jt]=7;var jt;for(jt=280;jt<288;++jt)Dr[jt]=8;var jt,Ju=new nn(32);for(jt=0;jt<32;++jt)Ju[jt]=5;var jt;var O_=Ir(Dr,9,1);var B_=Ir(Ju,5,1),dc=function(s){for(var t=s[0],e=1;e<s.length;++e)s[e]>t&&(t=s[e]);return t},Sn=function(s,t,e){var n=t/8|0;return(s[n]|s[n+1]<<8)>>(t&7)&e},pc=function(s,t){var e=t/8|0;return(s[e]|s[e+1]<<8|s[e+2]<<16)>>(t&7)},z_=function(s){return(s+7)/8|0},xc=function(s,t,e){return(t==null||t<0)&&(t=0),(e==null||e>s.length)&&(e=s.length),new nn(s.subarray(t,e))};var k_=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],pn=function(s,t,e){var n=new Error(t||k_[s]);if(n.code=s,Error.captureStackTrace&&Error.captureStackTrace(n,pn),!e)throw n;return n},V_=function(s,t,e,n){var i=s.length,r=n?n.length:0;if(!i||t.f&&!t.l)return e||new nn(0);var a=!e,o=a||t.i!=2,l=t.i;a&&(e=new nn(i*3));var c=function(vt){var qt=e.length;if(vt>qt){var yt=new nn(Math.max(qt*2,vt));yt.set(e),e=yt}},u=t.f||0,h=t.p||0,f=t.b||0,d=t.l,p=t.d,_=t.m,m=t.n,g=i*8;do{if(!d){u=Sn(s,h,1);var A=Sn(s,h+1,3);if(h+=3,A)if(A==1)d=O_,p=B_,_=9,m=5;else if(A==2){var b=Sn(s,h,31)+257,C=Sn(s,h+10,15)+4,y=b+Sn(s,h+5,31)+1;h+=14;for(var w=new nn(y),R=new nn(19),P=0;P<C;++P)R[U_[P]]=Sn(s,h+P*3,7);h+=C*3;for(var I=dc(R),V=(1<<I)-1,W=Ir(R,I,1),P=0;P<y;){var N=W[Sn(s,h,V)];h+=N&15;var M=N>>4;if(M<16)w[P++]=M;else{var G=0,X=0;for(M==16?(X=3+Sn(s,h,3),h+=2,G=w[P-1]):M==17?(X=3+Sn(s,h,7),h+=3):M==18&&(X=11+Sn(s,h,127),h+=7);X--;)w[P++]=G}}var $=w.subarray(0,b),Q=w.subarray(b);_=dc($),m=dc(Q),d=Ir($,_,1),p=Ir(Q,m,1)}else pn(1);else{var M=z_(h)+4,x=s[M-4]|s[M-3]<<8,T=M+x;if(T>i){l&&pn(0);break}o&&c(f+x),e.set(s.subarray(M,T),f),t.b=f+=x,t.p=h=T*8,t.f=u;continue}if(h>g){l&&pn(0);break}}o&&c(f+131072);for(var st=(1<<_)-1,rt=(1<<m)-1,lt=h;;lt=h){var G=d[pc(s,h)&st],zt=G>>4;if(h+=G&15,h>g){l&&pn(0);break}if(G||pn(2),zt<256)e[f++]=zt;else if(zt==256){lt=h,d=null;break}else{var Zt=zt-254;if(zt>264){var P=zt-257,Ft=Hu[P];Zt=Sn(s,h,(1<<Ft)-1)+Yu[P],h+=Ft}var q=p[pc(s,h)&rt],nt=q>>4;q||pn(3),h+=q&15;var Q=F_[nt];if(nt>3){var Ft=Wu[nt];Q+=pc(s,h)&(1<<Ft)-1,h+=Ft}if(h>g){l&&pn(0);break}o&&c(f+131072);var tt=f+Zt;if(f<Q){var et=r-Q,St=Math.min(Q,tt);for(et+f<0&&pn(3);f<St;++f)e[f]=n[et+f]}for(;f<tt;++f)e[f]=e[f-Q]}}t.l=d,t.p=lt,t.b=f,t.f=u,d&&(u=1,t.m=_,t.d=p,t.n=m)}while(!u);return f!=e.length&&a?xc(e,0,f):e.subarray(0,f)};var G_=new nn(0);var Nn=function(s,t){return s[t]|s[t+1]<<8},bn=function(s,t){return(s[t]|s[t+1]<<8|s[t+2]<<16|s[t+3]<<24)>>>0},mc=function(s,t){return bn(s,t)+bn(s,t+4)*4294967296};function H_(s,t){return V_(s,{i:2},t&&t.out,t&&t.dictionary)}var _c=typeof TextDecoder<"u"&&new TextDecoder,W_=0;try{_c.decode(G_,{stream:!0}),W_=1}catch{}var X_=function(s){for(var t="",e=0;;){var n=s[e++],i=(n>127)+(n>223)+(n>239);if(e+i>s.length)return{s:t,r:xc(s,e-1)};i?i==3?(n=((n&15)<<18|(s[e++]&63)<<12|(s[e++]&63)<<6|s[e++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):i&1?t+=String.fromCharCode((n&31)<<6|s[e++]&63):t+=String.fromCharCode((n&15)<<12|(s[e++]&63)<<6|s[e++]&63):t+=String.fromCharCode(n)}};function q_(s,t){if(t){for(var e="",n=0;n<s.length;n+=16384)e+=String.fromCharCode.apply(null,s.subarray(n,n+16384));return e}else{if(_c)return _c.decode(s);var i=X_(s),r=i.s,e=i.r;return e.length&&pn(8),r}}var Y_=function(s,t){return t+30+Nn(s,t+26)+Nn(s,t+28)},Z_=function(s,t,e){var n=Nn(s,t+28),i=q_(s.subarray(t+46,t+46+n),!(Nn(s,t+8)&2048)),r=t+46+n,a=bn(s,t+20),o=e&&a==4294967295?J_(s,r):[a,bn(s,t+24),bn(s,t+42)],l=o[0],c=o[1],u=o[2];return[Nn(s,t+10),l,c,i,r+Nn(s,t+30)+Nn(s,t+32),u]},J_=function(s,t){for(;Nn(s,t)!=1;t+=4+Nn(s,t+2));return[mc(s,t+12),mc(s,t+4),mc(s,t+20)]};function Ku(s,t){for(var e={},n=s.length-22;bn(s,n)!=101010256;--n)(!n||s.length-n>65558)&&pn(13);var i=Nn(s,n+8);if(!i)return{};var r=bn(s,n+16),a=r==4294967295||i==65535;if(a){var o=bn(s,n-12);a=bn(s,o)==101075792,a&&(i=bn(s,o+32),r=bn(s,o+48))}for(var l=t&&t.filter,c=0;c<i;++c){var u=Z_(s,r,a),h=u[0],f=u[1],d=u[2],p=u[3],_=u[4],m=u[5],g=Y_(s,m);r=_,(!l||l({name:p,size:f,originalSize:d,compression:h}))&&(h?h==8?e[p]=H_(s.subarray(g,g+f),{out:new nn(d)}):pn(14,"unknown compression type "+h):e[p]=xc(s,g,g+f))}return e}var K_=/^def\s+(?:(\w+)\s+)?"?([^"]+)"?$/,$_=/^string\s+(\w+)$/,j_=/^(?:uniform\s+)?(\w+(?:\[\])?)\s+(.+)$/,Do={Attribute:1,Prim:6,Relationship:8},Lo=class{parseText(t){t=this._preprocess(t);let e={},n=t.split(`
`),i=null,r=e,a=[e];for(let o of n)if(o.includes("=")){let l=this._findAssignmentOperator(o);if(l===-1){i=o.trim();continue}let c=o.slice(0,l).trim(),u=o.slice(l+1).trim();if(u.endsWith("{")){let h={};a.push(h),r[c]=h,r=h}else if(u.endsWith("(")){let h=u.slice(0,-1);r[c]=h;let f={};a.push(f),r=f}else r[c]=u}else if(o.includes(":")&&!o.includes("=")){let l=o.indexOf(":"),c=o.slice(0,l).trim(),u=o.slice(l+1).trim();/^[\d.]+$/.test(c)&&(r[c]=u)}else if(o.endsWith("{")){i=o.slice(0,-1).trim()||i;let l=r[i]||{};a.push(l),r[i]=l,r=l}else if(o.endsWith("}")){if(a.pop(),a.length===0)continue;r=a[a.length-1]}else if(o.endsWith("(")){let l={};a.push(l),i=o.split("(")[0].trim()||i,r[i]=l,r=l}else o.endsWith(")")?(a.pop(),r=a[a.length-1]):o.trim()&&(i=o.trim());return e}_preprocess(t){t=this._stripBlockComments(t),t=this._collapseTripleQuotedStrings(t);let e=t.split(`
`),n=[],i=!1,r=0,a=0,o="";for(let l=0;l<e.length;l++){let c=e[l];c=this._stripInlineComment(c);let u=c.trim();if(i){o+=" "+u;for(let h of u)h==="["?r++:h==="]"?r--:h==="("&&r>0?a++:h===")"&&r>0&&a--;r===0&&a===0&&(n.push(o),o="",i=!1)}else{if(u.includes("=")){let h=this._findAssignmentOperator(u);if(h!==-1){let f=u.slice(h+1).trim(),d=0,p=0;for(let _ of f)_==="["?d++:_==="]"&&p++;if(d>p){i=!0,r=d-p,a=0,o=u;continue}}}n.push(u)}}return n.join(`
`)}_stripBlockComments(t){let e="",n=0;for(;n<t.length;)if(t[n]==="/"&&n+1<t.length&&t[n+1]==="*"){let i=n+2;for(;i<t.length;){if(t[i]==="*"&&i+1<t.length&&t[i+1]==="/"){i+=2;break}i++}n=i}else e+=t[n],n++;return e}_collapseTripleQuotedStrings(t){let e="",n=0;for(;n<t.length;){if(n+2<t.length){let i=t.slice(n,n+3);if(i==="'''"||i==='"""'){let r=i;for(e+=r,n+=3;n<t.length;)if(n+2<t.length&&t.slice(n,n+3)===r){e+=r,n+=3;break}else t[n]===`
`?e+="\\n":t[n]!=="\r"&&(e+=t[n]),n++;continue}}e+=t[n],n++}return e}_stripInlineComment(t){if(t.trim().startsWith("#usda"))return t;let e=!1,n=null,i=!1;for(let r=0;r<t.length;r++){let a=t[r];if(i){i=!1;continue}if(a==="\\"){i=!0;continue}if(!e&&(a==='"'||a==="'"))e=!0,n=a;else if(e&&a===n)e=!1,n=null;else if(!e&&a==="#")return t.slice(0,r).trimEnd()}return t}_findAssignmentOperator(t){let e=!1,n=null,i=!1;for(let r=0;r<t.length;r++){let a=t[r];if(i){i=!1;continue}if(a==="\\"){i=!0;continue}if(!e&&(a==='"'||a==="'"))e=!0,n=a;else if(e&&a===n)e=!1,n=null;else if(!e&&a==="=")return r}return-1}parseData(t){let e=this.parseText(t),n={},i={};if("#usda 1.0"in e){let a=e["#usda 1.0"];a.upAxis&&(i.upAxis=a.upAxis.replace(/"/g,"")),a.defaultPrim&&(i.defaultPrim=a.defaultPrim.replace(/"/g,"")),a.metersPerUnit!==void 0&&(i.metersPerUnit=parseFloat(a.metersPerUnit)),a.framesPerSecond!==void 0&&(i.framesPerSecond=parseFloat(a.framesPerSecond)),a.timeCodesPerSecond!==void 0&&(i.timeCodesPerSecond=parseFloat(a.timeCodesPerSecond))}n["/"]={specType:Do.Prim,fields:i};let r=(a,o)=>{let l=[];for(let c in a){if(c==="#usda 1.0"||c==="variants")continue;let u=c.match(K_);if(u){let h=u[1]||"",f=u[2],d=o==="/"?"/"+f:o+"/"+f;l.push(f);let p={typeName:h},_=a[c];this._extractPrimData(_,d,p,n,Do),n[d]={specType:Do.Prim,fields:p},r(_,d)}}l.length>0&&n[o]&&(n[o].fields.primChildren=l)};return r(e,"/"),this._inferSkelElementSize(n),{specsByPath:n}}_inferSkelElementSize(t){for(let e in t){let n=t[e];if(n.specType!==Do.Prim||n.fields.typeName!=="Mesh")continue;let i=t[e+".points"];if(!i||!i.fields.default)continue;let r=i.fields.default.length/3;r!==0&&(this._inferElementSize(t[e+".primvars:skel:jointIndices"],r),this._inferElementSize(t[e+".primvars:skel:jointWeights"],r))}}_inferElementSize(t,e){if(!t||t.fields.elementSize!==void 0||!t.fields.default)return;let n=t.fields.default.length;n>0&&n%e===0&&(t.fields.elementSize=n/e)}_extractPrimData(t,e,n,i,r){if(!(!t||typeof t!="object"))for(let a in t){if(a.startsWith("def "))continue;if(a==="prepend references"){n.references=[t[a]];continue}if(a==="payload"){n.payload=t[a];continue}if(a==="variants"){let l={},c=t[a];for(let u in c){let h=u.match($_);if(h){let f=h[1],d=c[u].replace(/"/g,"");l[f]=d}}Object.keys(l).length>0&&(n.variantSelection=l);continue}if(a.startsWith("rel ")){let l=a.slice(4),c=e+"."+l,u=t[a].replace(/[<>]/g,"");i[c]={specType:r.Relationship,fields:{targetPaths:[u]}};continue}if(a.includes("xformOpOrder")){let l=t[a].replace(/[\[\]]/g,"").split(",").map(c=>c.trim().replace(/"/g,""));n.xformOpOrder=l;continue}let o=a.match(j_);if(o){let l=o[1],c=o[2],u=t[a];if(c.endsWith(".connect")){let h=c.slice(0,-8),f=e+"."+h,d=String(u).trim();d.startsWith("<")&&(d=d.slice(1)),d.endsWith(">")&&(d=d.slice(0,-1)),i[f]||(i[f]={specType:r.Attribute,fields:{typeName:l}}),i[f].fields.connectionPaths=[d];continue}if(c.endsWith(".timeSamples")&&typeof u=="object"){let h=c.slice(0,-12),f=e+"."+h,d=[],p=[];for(let m in u){let g=parseFloat(m);isNaN(g)||(d.push(g),p.push(this._parseAttributeValue(l,u[m])))}let _=d.map((m,g)=>({t:m,v:p[g]})).sort((m,g)=>m.t-g.t);i[f]={specType:r.Attribute,fields:{timeSamples:{times:_.map(m=>m.t),values:_.map(m=>m.v)},typeName:l}}}else{let h=this._parseAttributeValue(l,u),f=e+"."+c;i[f]?(i[f].fields.default=h,i[f].fields.typeName=l):i[f]={specType:r.Attribute,fields:{default:h,typeName:l}}}}}}_parseAttributeValue(t,e){if(e==null)return;let n=String(e).trim();if(t.endsWith("[]")){let i;try{let r=n.replace(/\(/g,"[").replace(/\)/g,"]");r.endsWith(",")&&(r=r.slice(0,-1));let a=JSON.parse(r);i=Array.isArray(a)&&Array.isArray(a[0])?a.flat():a}catch{i=n.replace(/[\[\]]/g,"").split(",").map(o=>{let l=o.trim(),c=parseFloat(l);return isNaN(c)?l.replace(/"/g,""):c})}if(t.startsWith("quat"))for(let r=0;r<i.length;r+=4){let a=i[r];i[r]=i[r+1],i[r+1]=i[r+2],i[r+2]=i[r+3],i[r+3]=a}return i}if(t.includes("3")||t.includes("2")||t.includes("4"))return n.replace(/[()]/g,"").split(",").map(a=>parseFloat(a.trim()));if(t.startsWith("quat")){let r=n.replace(/[()]/g,"").split(",").map(a=>parseFloat(a.trim()));return[r[1],r[2],r[3],r[0]]}return t.includes("matrix")?n.replace(/[()]/g,"").split(",").map(a=>parseFloat(a.trim())):t==="float"||t==="double"||t==="int"?parseFloat(n):t==="string"||t==="token"?this._parseString(n):t==="asset"?n.replace(/@/g,"").replace(/"/g,""):this._parseString(n)}_parseString(t){(t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'"))&&(t=t.slice(1,-1));let e="",n=0;for(;n<t.length;)if(t[n]==="\\"&&n+1<t.length){let i=t[n+1];switch(i){case"n":e+=`
`;break;case"t":e+="	";break;case"r":e+="\r";break;case"\\":e+="\\";break;case'"':e+='"';break;case"'":e+="'";break;default:e+=i;break}n+=2}else e+=t[n],n++;return e}};var vc=new TextDecoder,ju=new Float32Array(32);for(let s=0;s<32;s++)ju[s]=Math.pow(2,s-15);var Q_=Math.pow(2,-14),pt={Invalid:0,Bool:1,UChar:2,Int:3,UInt:4,Int64:5,UInt64:6,Half:7,Float:8,Double:9,String:10,Token:11,AssetPath:12,Matrix2d:13,Matrix3d:14,Matrix4d:15,Quatd:16,Quatf:17,Quath:18,Vec2d:19,Vec2f:20,Vec2h:21,Vec2i:22,Vec3d:23,Vec3f:24,Vec3h:25,Vec3i:26,Vec4d:27,Vec4f:28,Vec4h:29,Vec4i:30,Dictionary:31,TokenListOp:32,StringListOp:33,PathListOp:34,ReferenceListOp:35,IntListOp:36,Int64ListOp:37,UIntListOp:38,UInt64ListOp:39,PathVector:40,TokenVector:41,Specifier:42,Permission:43,Variability:44,VariantSelectionMap:45,TimeSamples:46,Payload:47,DoubleVector:48,LayerOffsetVector:49,StringVector:50,ValueBlock:51,Value:52,UnregisteredValue:53,UnregisteredValueListOp:54,PayloadListOp:55,TimeCode:56,PathExpression:57,Relocates:58,Spline:59,AnimationBlock:60},tx=4294967295,ex=105,nx=116;function $u(s,t,e,n,i,r){for(;t<e;){let a=s[t++];if(t>e)break;let o=a>>4;if(o===15){let h;do{if(t>=e)break;h=s[t++],o+=h}while(h===255&&t<e)}if(o>0){t+o>e&&(o=e-t);for(let h=0;h<o&&!(i>=r);h++)n[i++]=s[t++]}if(t>=e||t+2>e)break;let l=s[t++]|s[t++]<<8;if(l===0)break;let c=(a&15)+4;if(c===19){let h;do{if(t>=e)break;h=s[t++],c+=h}while(h===255&&t<e)}let u=i-l;if(u<0)break;for(let h=0;h<c&&!(i>=r);h++)n[i++]=n[u+h]}return i}function yc(s,t){let e=new Uint8Array(t),n=s[0];if(n===0)return $u(s,1,s.length,e,0,t),e;{let r=1,a=[];for(let c=0;c<n;c++){let u=(s[r]|s[r+1]<<8|s[r+2]<<16|s[r+3]<<24)>>>0;a.push(u),r+=4}let o=r,l=0;for(let c=0;c<n;c++){let u=a[c],h=Math.min(65536,t-l);$u(s,o,o+u,e,l,l+h),o+=u,l+=h}return e}}function Tn(s,t){let e=t*4+(t*2+7>>3)+4,n=yc(new Uint8Array(s),e);return ix(n,t)}function ix(s,t){let e=new DataView(s.buffer,s.byteOffset,s.byteLength),n=0,i=e.getInt32(n,!0);n+=4;let r=t*2+7>>3,a=n,o=n+r,l=new Int32Array(t),c=0,u=a,h=o;for(let f=0;f<t;){let d=s[u++];for(let p=0;p<4&&f<t;p++,f++){let _=d>>p*2&3,m=0;switch(_){case 0:m=i;break;case 1:m=e.getInt8(h),h+=1;break;case 2:m=e.getInt16(h,!0),h+=2;break;case 3:m=e.getInt32(h,!0),h+=4;break}c+=m,l[f]=c}}return l}var Mc=class{constructor(t){this.buffer=t,this.view=new DataView(t),this.offset=0}seek(t){this.offset=t}tell(){return this.offset}readUint8(){let t=this.view.getUint8(this.offset);return this.offset+=1,t}readInt8(){let t=this.view.getInt8(this.offset);return this.offset+=1,t}readUint16(){let t=this.view.getUint16(this.offset,!0);return this.offset+=2,t}readInt16(){let t=this.view.getInt16(this.offset,!0);return this.offset+=2,t}readUint32(){let t=this.view.getUint32(this.offset,!0);return this.offset+=4,t}readInt32(){let t=this.view.getInt32(this.offset,!0);return this.offset+=4,t}readUint64(){let t=this.view.getUint32(this.offset,!0),e=this.view.getUint32(this.offset+4,!0);return this.offset+=8,e*4294967296+t}readInt64(){let t=this.view.getUint32(this.offset,!0),e=this.view.getInt32(this.offset+4,!0);return this.offset+=8,e*4294967296+t}readFloat32(){let t=this.view.getFloat32(this.offset,!0);return this.offset+=4,t}readFloat64(){let t=this.view.getFloat64(this.offset,!0);return this.offset+=8,t}readBytes(t){let e=new Uint8Array(this.buffer,this.offset,t);return this.offset+=t,e}readString(t){let e=this.readBytes(t),n=0;for(;n<t&&e[n]!==0;)n++;return vc.decode(e.subarray(0,n))}},Hi=class{constructor(t,e){this.lo=t,this.hi=e}get isArray(){return(this.hi&2147483648)!==0}get isInlined(){return(this.hi&1073741824)!==0}get isCompressed(){return(this.hi&536870912)!==0}get typeEnum(){return this.hi>>16&255}get payload(){return this.lo+(this.hi&65535)*4294967296}getInlinedValue(){return this.lo}},Uo=class{parseData(t){this.buffer=t instanceof ArrayBuffer?t:t.buffer,this.reader=new Mc(this.buffer),this.version={major:0,minor:0,patch:0},this._conversionBuffer=new ArrayBuffer(4),this._conversionView=new DataView(this._conversionBuffer),this._readBootstrap(),this._readTOC(),this._readTokens(),this._readStrings(),this._readFields(),this._readFieldSets(),this._readPaths(),this._readSpecs(),this.specsByPath={};for(let e of this.specs){let n=this.paths[e.pathIndex];if(!n)continue;let i=this._getFieldsForSpec(e);this.specsByPath[n]={specType:e.specType,fields:i}}return{specsByPath:this.specsByPath}}_readBootstrap(){let t=this.reader;if(t.seek(0),t.readString(8)!=="PXR-USDC")throw new Error("THREE.USDCParser: Not a valid USDC file.");this.version.major=t.readUint8(),this.version.minor=t.readUint8(),this.version.patch=t.readUint8(),t.readBytes(5),this.tocOffset=t.readUint64()}_readTOC(){let t=this.reader;t.seek(this.tocOffset);let e=t.readUint64();this.sections={};for(let n=0;n<e;n++){let i=t.readString(16),r=t.readUint64(),a=t.readUint64();this.sections[i]={start:r,size:a}}}_readTokens(){let t=this.sections.TOKENS;if(!t)return;let e=this.reader;e.seek(t.start);let n=e.readUint64();if(this.tokens=[],this.version.major===0&&this.version.minor<4){let i=e.readUint64(),r=e.readBytes(i),a=0;for(let o=0;o<n;o++){let l=a;for(;l<r.length&&r[l]!==0;)l++;this.tokens.push(vc.decode(r.subarray(a,l))),a=l+1}}else{let i=e.readUint64(),r=e.readUint64(),a=e.readBytes(r),o=yc(a,i),l=0;for(let c=0;c<n;c++){let u=l;for(;u<o.length&&o[u]!==0;)u++;this.tokens.push(vc.decode(o.subarray(l,u))),l=u+1}}}_readStrings(){let t=this.sections.STRINGS;if(!t){this.strings=[];return}let e=this.reader;e.seek(t.start);let n=Math.floor(t.size/4);this.strings=[];for(let i=0;i<n;i++)this.strings.push(e.readUint32())}_readFields(){let t=this.sections.FIELDS;if(!t)return;let e=this.reader;if(e.seek(t.start),this.fields=[],this.version.major===0&&this.version.minor<4){let n=Math.floor(t.size/12);for(let i=0;i<n;i++){let r=e.readUint32(),a=e.readUint32(),o=e.readUint32();this.fields.push({tokenIndex:r,valueRep:new Hi(a,o)})}}else{let n=e.readUint64(),i=e.readUint64(),r=e.readBytes(i),a=Tn(r.buffer.slice(r.byteOffset,r.byteOffset+i),n),o=e.readUint64(),l=e.readBytes(o),c=yc(l,n*8),u=new DataView(c.buffer,c.byteOffset,c.byteLength);for(let h=0;h<n;h++){let f=u.getUint32(h*8,!0),d=u.getUint32(h*8+4,!0);this.fields.push({tokenIndex:a[h],valueRep:new Hi(f,d)})}}}_readFieldSets(){let t=this.sections.FIELDSETS;if(!t)return;let e=this.reader;if(e.seek(t.start),this.fieldSets=[],this.version.major===0&&this.version.minor<4){let n=Math.floor(t.size/4);for(let i=0;i<n;i++)this.fieldSets.push(e.readUint32())}else{let n=e.readUint64(),i=e.readUint64(),r=e.readBytes(i),a=Tn(r.buffer.slice(r.byteOffset,r.byteOffset+i),n);for(let o=0;o<n;o++)this.fieldSets.push(a[o])}}_readPaths(){let t=this.sections.PATHS;if(!t)return;let e=this.reader;e.seek(t.start);let n=e.readUint64();if(this.paths=new Array(n).fill(""),this.version.major===0&&this.version.minor<4)this._readPathsRecursive("");else{e.readUint64();let i=e.readUint64(),r=e.readBytes(i),a=Tn(r.buffer.slice(r.byteOffset,r.byteOffset+i),n),o=e.readUint64(),l=e.readBytes(o),c=Tn(l.buffer.slice(l.byteOffset,l.byteOffset+o),n),u=e.readUint64(),h=e.readBytes(u),f=Tn(h.buffer.slice(h.byteOffset,h.byteOffset+u),n);this._buildPathsFromCompressed(a,c,f)}}_readPathsRecursive(t,e=0){let n=this.reader;if(e>1e3)return;let i=n.readUint32(),r=n.readUint32(),a=n.readUint8(),o=(a&1)!==0,l=(a&2)!==0,c=(a&4)!==0,u;if(t==="")u="/";else{let h=this.tokens[r]||"";c?u=t+"."+h:u=t==="/"?"/"+h:t+"/"+h}if(this.paths[i]=u,o&&l){let h=n.readUint64();this._readPathsRecursive(u,e+1),n.seek(h),this._readPathsRecursive(t,e+1)}else o?this._readPathsRecursive(u,e+1):l&&this._readPathsRecursive(t,e+1)}_buildPathsFromCompressed(t,e,n){let i=(r,a)=>{let o=r;for(;o<t.length;){let l=o++,c=t[l],u=e[l],h=n[l],f;if(a==="")f="/",a=f;else{let _=this.tokens[Math.abs(u)]||"";u<0?f=a+"."+_:f=a==="/"?"/"+_:a+"/"+_}this.paths[c]=f;let d=h>0||h===-1,p=h>=0;if(d){if(p){let _=l+h;i(_,a)}a=f}else if(!p)break}};i(0,"")}_readSpecs(){let t=this.sections.SPECS;if(!t)return;let e=this.reader;if(e.seek(t.start),this.specs=[],this.version.major===0&&this.version.minor<4){let n=this.version.minor===0&&this.version.patch===1?16:12,i=Math.floor(t.size/n);for(let r=0;r<i;r++){let a=e.readUint32(),o=e.readUint32(),l=e.readUint32();n===16&&e.readUint32(),this.specs.push({pathIndex:a,fieldSetIndex:o,specType:l})}}else{let n=e.readUint64(),i=e.readUint64(),r=e.readBytes(i),a=Tn(r.buffer.slice(r.byteOffset,r.byteOffset+i),n),o=e.readUint64(),l=e.readBytes(o),c=Tn(l.buffer.slice(l.byteOffset,l.byteOffset+o),n),u=e.readUint64(),h=e.readBytes(u),f=Tn(h.buffer.slice(h.byteOffset,h.byteOffset+u),n);for(let d=0;d<n;d++)this.specs.push({pathIndex:a[d],fieldSetIndex:c[d],specType:f[d]})}}_readValue(t){let e=t.typeEnum,n=t.isArray,i=t.isInlined;if(e===pt.TimeSamples)return this._readTimeSamples(t);if(i)return this._readInlinedValue(t);let r=t.payload;if(r===0&&n)return[];if(r<0||r>=this.buffer.byteLength)throw new RangeError("USDCParser: Invalid payload offset "+r+" for type "+e+".");let a=this.reader.tell();this.reader.seek(r);let o;return n?o=this._readArrayValue(t):o=this._readScalarValue(e),this.reader.seek(a),o}_readInlinedValue(t){let e=t.typeEnum,n=t.getInlinedValue(),i=this._conversionView;switch(e){case pt.Bool:return n!==0;case pt.UChar:return n&255;case pt.Int:case pt.UInt:return n;case pt.Float:return i.setUint32(0,n,!0),i.getFloat32(0,!0);case pt.Double:return i.setUint32(0,n,!0),i.getFloat32(0,!0);case pt.Token:return this.tokens[n]||"";case pt.String:return this.tokens[this.strings[n]]||"";case pt.AssetPath:return this.tokens[n]||"";case pt.Specifier:return n;case pt.Permission:case pt.Variability:return n;case pt.Vec2h:return i.setUint32(0,n,!0),[this._halfToFloat(i.getUint16(0,!0)),this._halfToFloat(i.getUint16(2,!0))];case pt.Vec2f:case pt.Vec2i:return i.setUint32(0,n,!0),[i.getInt8(0),i.getInt8(1)];case pt.Vec3f:case pt.Vec3i:return i.setUint32(0,n,!0),[i.getInt8(0),i.getInt8(1),i.getInt8(2)];case pt.Vec4f:case pt.Vec4i:return i.setUint32(0,n,!0),[i.getInt8(0),i.getInt8(1),i.getInt8(2),i.getInt8(3)];case pt.Matrix2d:{i.setUint32(0,n,!0);let r=i.getInt8(0),a=i.getInt8(1);return[r,0,0,a]}case pt.Matrix3d:{i.setUint32(0,n,!0);let r=i.getInt8(0),a=i.getInt8(1),o=i.getInt8(2);return[r,0,0,0,a,0,0,0,o]}case pt.Matrix4d:{i.setUint32(0,n,!0);let r=i.getInt8(0),a=i.getInt8(1),o=i.getInt8(2),l=i.getInt8(3);return[r,0,0,0,0,a,0,0,0,0,o,0,0,0,0,l]}default:return n}}_readTimeSamples(t){let e=this.reader,n=t.payload,i=e.tell();e.seek(n);let r=e.tell(),a=e.readInt64();e.seek(r+a);let o=e.readUint32(),l=e.readUint32(),c=new Hi(o,l),u=this._readValue(c),h=r+a+8;e.seek(h);let f=e.tell(),d=e.readInt64();e.seek(f+d);let p=e.readUint64(),_=[];for(let A=0;A<p;A++){let M=e.readUint32(),x=e.readUint32();_.push(new Hi(M,x))}let m=[];for(let A=0;A<p;A++)m.push(this._readValue(_[A]));return e.seek(i),{times:u instanceof Float64Array?Array.from(u):Array.isArray(u)?u:[u],values:m}}_readScalarValue(t){let e=this.reader;switch(t){case pt.Invalid:return null;case pt.Bool:return e.readUint8()!==0;case pt.UChar:return e.readUint8();case pt.Int:return e.readInt32();case pt.UInt:return e.readUint32();case pt.Int64:return e.readInt64();case pt.UInt64:return e.readUint64();case pt.Half:return this._readHalf();case pt.Float:return e.readFloat32();case pt.Double:return e.readFloat64();case pt.String:case pt.Token:{let n=e.readUint32();return this.tokens[n]||""}case pt.AssetPath:{let n=e.readUint32();return this.tokens[n]||""}case pt.Vec2f:return[e.readFloat32(),e.readFloat32()];case pt.Vec2d:return[e.readFloat64(),e.readFloat64()];case pt.Vec2i:return[e.readInt32(),e.readInt32()];case pt.Vec3f:return[e.readFloat32(),e.readFloat32(),e.readFloat32()];case pt.Vec3d:return[e.readFloat64(),e.readFloat64(),e.readFloat64()];case pt.Vec3i:return[e.readInt32(),e.readInt32(),e.readInt32()];case pt.Vec4f:return[e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32()];case pt.Vec4d:return[e.readFloat64(),e.readFloat64(),e.readFloat64(),e.readFloat64()];case pt.Quatf:return[e.readFloat32(),e.readFloat32(),e.readFloat32(),e.readFloat32()];case pt.Quatd:return[e.readFloat64(),e.readFloat64(),e.readFloat64(),e.readFloat64()];case pt.Matrix4d:{let n=[];for(let i=0;i<16;i++)n.push(e.readFloat64());return n}case pt.TokenVector:{let n=e.readUint64(),i=[];for(let r=0;r<n;r++){let a=e.readUint32();i.push(this.tokens[a]||"")}return i}case pt.PathVector:{let n=e.readUint64(),i=[];for(let r=0;r<n;r++){let a=e.readUint32();i.push(this.paths[a]||"")}return i}case pt.DoubleVector:{let n=e.readUint64(),i=new Float64Array(n);for(let r=0;r<n;r++)i[r]=e.readFloat64();return i}case pt.Dictionary:{let n=e.readUint64(),i={};for(let r=0;r<n;r++){let a=e.readUint32(),o=this.tokens[a],l=e.position,c=e.readInt64(),u=l+c,h=e.position;e.position=u;let f=e.readUint64(),d=new Hi(f),p=null;d.isInlined?p=this._readInlinedValue(d):d.isArray?(e.position=d.payload,p=this._readArrayValue(d)):(e.position=d.payload,p=this._readScalarValue(d.typeEnum)),e.position=h,o!==void 0&&p!==null&&(i[o]=p)}return i}case pt.TokenListOp:case pt.StringListOp:case pt.IntListOp:case pt.Int64ListOp:case pt.UIntListOp:case pt.UInt64ListOp:return null;case pt.PathListOp:{let n=e.readUint8(),i=(n&2)!==0,r=(n&4)!==0,a=(n&8)!==0,o=(n&16)!==0,l=(n&32)!==0,c=(n&64)!==0,u=()=>{let _=e.readUint64(),m=[];for(let g=0;g<_;g++){let A=e.readUint32();m.push(this.paths[A])}return m},h=null,f=null,d=null,p=null;return i&&(h=u()),r&&(f=u()),l&&(d=u()),c&&(p=u()),a&&u(),o&&u(),d&&d.length>0?d:h&&h.length>0?h:p&&p.length>0?p:f&&f.length>0?f:null}case pt.VariantSelectionMap:{let n=e.readUint64(),i={};for(let r=0;r<n;r++){let a=e.readUint32(),o=e.readUint32(),l=this.tokens[this.strings[a]],c=this.tokens[this.strings[o]];l&&c&&(i[l]=c)}return i}default:return console.warn("USDCParser: Unsupported scalar type",t),null}}_readArrayValue(t){let e=this.reader,n=t.typeEnum,i=t.isCompressed,r;if(this.version.major===0&&this.version.minor<7?r=e.readUint32():r=e.readUint64(),!Number.isSafeInteger(r)||r<0)throw new RangeError("USDCParser: Invalid array size "+r+" for type "+n+".");if(r>2147483647)throw new RangeError("USDCParser: Array size "+r+" exceeds implementation limits.");if(r===0)return[];if(i)return this._readCompressedArray(n,r);switch(n){case pt.Int:{let a=new Int32Array(r);for(let o=0;o<r;o++)a[o]=e.readInt32();return a}case pt.UInt:{let a=new Uint32Array(r);for(let o=0;o<r;o++)a[o]=e.readUint32();return a}case pt.Float:{let a=new Float32Array(r);for(let o=0;o<r;o++)a[o]=e.readFloat32();return a}case pt.Double:{let a=new Float64Array(r);for(let o=0;o<r;o++)a[o]=e.readFloat64();return a}case pt.Vec2f:{let a=new Float32Array(r*2);for(let o=0;o<r*2;o++)a[o]=e.readFloat32();return a}case pt.Vec3f:{let a=new Float32Array(r*3);for(let o=0;o<r*3;o++)a[o]=e.readFloat32();return a}case pt.Vec4f:{let a=new Float32Array(r*4);for(let o=0;o<r*4;o++)a[o]=e.readFloat32();return a}case pt.Vec3h:{let a=new Float32Array(r*3);for(let o=0;o<r*3;o++)a[o]=this._readHalf();return a}case pt.Quatf:{let a=new Float32Array(r*4);for(let o=0;o<r*4;o++)a[o]=e.readFloat32();return a}case pt.Quath:{let a=new Float32Array(r*4);for(let o=0;o<r*4;o++)a[o]=this._readHalf();return a}case pt.Matrix4d:{let a=new Float64Array(r*16);for(let o=0;o<r*16;o++)a[o]=e.readFloat64();return a}case pt.Token:{let a=[];for(let o=0;o<r;o++){let l=e.readUint32();a.push(this.tokens[l]||"")}return a}case pt.Half:{let a=new Float32Array(r);for(let o=0;o<r;o++)a[o]=this._readHalf();return a}default:return console.warn("USDCParser: Unsupported array type",n),[]}}_readCompressedArray(t,e){let n=this.reader;switch(t){case pt.Int:case pt.UInt:{let i=n.readUint64(),r=n.readBytes(i);return Tn(r.buffer.slice(r.byteOffset,r.byteOffset+i),e)}case pt.Float:{let i=n.readInt8();if(i===ex){let r=n.readUint64(),a=n.readBytes(r),o=Tn(a.buffer.slice(a.byteOffset,a.byteOffset+r),e),l=new Float32Array(e);for(let c=0;c<e;c++)l[c]=o[c];return l}else if(i===nx){let r=n.readUint32(),a=new Float32Array(r);for(let h=0;h<r;h++)a[h]=n.readFloat32();let o=n.readUint64(),l=n.readBytes(o),c=Tn(l.buffer.slice(l.byteOffset,l.byteOffset+o),e),u=new Float32Array(e);for(let h=0;h<e;h++)u[h]=a[c[h]];return u}return console.warn("USDCParser: Unknown float compression code",i),new Float32Array(e)}default:return console.warn("USDCParser: Unsupported compressed array type",t),[]}}_readHalf(){return this._halfToFloat(this.reader.readUint16())}_halfToFloat(t){let e=(t&32768)>>15,n=(t&31744)>>10,i=t&1023;return n===0?i===0?e?-0:0:(e?-1:1)*Q_*(i/1024):n===31?i?NaN:e?-1/0:1/0:(e?-1:1)*ju[n]*(1+i/1024)}_getFieldsForSpec(t){let e={},n=t.fieldSetIndex,i=1e4,r=0;for(;n<this.fieldSets.length&&r<i;){let a=this.fieldSets[n];if(a===tx||a===-1)break;let o=this.fields[a];if(o){let l=this.tokens[o.tokenIndex],c=this._readValue(o.valueRep);e[l]=c}n++,r++}return e}};var sx=/^(.+?)\/\{(\w+)=(\w+)\}\/(.+)$/,Wi={Unknown:0,Attribute:1,Connection:2,Expression:3,Mapper:4,MapperArg:5,Prim:6,PseudoRoot:7,Relationship:8,RelationshipTarget:9,Variant:10,VariantSet:11},An={projection:"perspective",clippingRange:[1,1e6],horizontalAperture:20.955,verticalAperture:15.2908,horizontalApertureOffset:0,verticalApertureOffset:0,focalLength:50,focusDistance:0,fStop:0},Xi=class s{constructor(t=null){this.textureCache={},this.skinnedMeshes=[],this.manager=t,this.texturePromises=[]}compose(t,e={},n={},i=""){this.specsByPath=t.specsByPath,this.assets=e,this.externalVariantSelections=n,this.basePath=i,this.skinnedMeshes=[],this.skeletons={},this.texturePromises=[],this._buildIndexes();let r=this.specsByPath["/"],a=r?r.fields:{};this.fps=a.timeCodesPerSecond||a.framesPerSecond||24;let o=new cn;this._buildHierarchy(o,"/"),this._bindSkeletons();let l=Object.keys(this.skeletons);l.length===1&&(o.skeleton=this.skeletons[l[0]].skeleton),o.animations=this._buildAnimations();let c=a.metersPerUnit;return c!==void 0&&c!==1&&o.scale.setScalar(c),r&&r.fields&&r.fields.upAxis==="Z"&&(o.rotation.x=-Math.PI/2),o}applyTransform(t,e,n={}){let i={...e,...n},r=i.xformOpOrder;if(r&&r.length>0){let a=new Gt,o=new Gt,l=null;for(let c=0;c<r.length;c++){let u=r[c],h=u.startsWith("!invert!"),f=h?u.slice(8):u;if(f==="xformOp:transform"){let d=i["xformOp:transform"];d&&d.length===16&&(o.set(d[0],d[4],d[8],d[12],d[1],d[5],d[9],d[13],d[2],d[6],d[10],d[14],d[3],d[7],d[11],d[15]),h&&o.invert(),a.multiply(o))}else if(f==="xformOp:translate"){let d=i["xformOp:translate"];d&&(o.makeTranslation(d[0],d[1],d[2]),h&&o.invert(),a.multiply(o))}else if(f==="xformOp:translate:pivot"){let d=i["xformOp:translate:pivot"];d&&(o.makeTranslation(d[0],d[1],d[2]),h&&o.invert(),a.multiply(o))}else if(f==="xformOp:scale"){let d=i["xformOp:scale"];d&&(Array.isArray(d)?(o.makeScale(d[0],d[1],d[2]),l=[d[0],d[1],d[2]]):(o.makeScale(d,d,d),l=[d,d,d]),h&&o.invert(),a.multiply(o))}else if(f==="xformOp:rotateXYZ"){let d=i["xformOp:rotateXYZ"];if(d){let p=new un(d[0]*Math.PI/180,d[1]*Math.PI/180,d[2]*Math.PI/180,"ZYX");o.makeRotationFromEuler(p),h&&o.invert(),a.multiply(o)}}else if(f==="xformOp:rotateX"){let d=i["xformOp:rotateX"];d!==void 0&&(o.makeRotationX(d*Math.PI/180),h&&o.invert(),a.multiply(o))}else if(f==="xformOp:rotateY"){let d=i["xformOp:rotateY"];d!==void 0&&(o.makeRotationY(d*Math.PI/180),h&&o.invert(),a.multiply(o))}else if(f==="xformOp:rotateZ"){let d=i["xformOp:rotateZ"];d!==void 0&&(o.makeRotationZ(d*Math.PI/180),h&&o.invert(),a.multiply(o))}else if(f==="xformOp:orient"){let d=i["xformOp:orient"];if(d&&d.length===4){let p=new be(d[0],d[1],d[2],d[3]);o.makeRotationFromQuaternion(p),h&&o.invert(),a.multiply(o)}}}if(t.matrix.copy(a),t.matrix.decompose(t.position,t.quaternion,t.scale),l){let c=l[0]<0,u=l[1]<0,h=l[2]<0;(c?1:0)+(u?1:0)+(h?1:0)===3&&(t.scale.set(l[0],l[1],l[2]),t.quaternion.set(t.quaternion.x,-t.quaternion.y,t.quaternion.z,-t.quaternion.w))}return}if(i["xformOp:translate"]){let a=i["xformOp:translate"];t.position.set(a[0],a[1],a[2])}if(i["xformOp:translate:pivot"]){let a=i["xformOp:translate:pivot"];t.pivot=new L(a[0],a[1],a[2])}if(i["xformOp:scale"]){let a=i["xformOp:scale"];Array.isArray(a)?t.scale.set(a[0],a[1],a[2]):t.scale.set(a,a,a)}if(i["xformOp:rotateXYZ"]){let a=i["xformOp:rotateXYZ"];t.rotation.set(a[0]*Math.PI/180,a[1]*Math.PI/180,a[2]*Math.PI/180)}if(i["xformOp:orient"]){let a=i["xformOp:orient"];a.length===4&&t.quaternion.set(a[0],a[1],a[2],a[3])}}_buildIndexes(){this.childrenByPath=new Map,this.attributesByPrimPath=new Map,this.materialsByRoot=new Map,this.shadersByMaterialPath=new Map,this.geomSubsetsByMeshPath=new Map;for(let t in this.specsByPath){let e=this.specsByPath[t];if(e.specType===Wi.Prim){let n=t.lastIndexOf("/");if(n>0){let r=t.slice(0,n),a=t.slice(n+1);this.childrenByPath.has(r)||this.childrenByPath.set(r,[]),this.childrenByPath.get(r).push({name:a,path:t})}else if(n===0&&t.length>1){let r=t.slice(1);this.childrenByPath.has("/")||this.childrenByPath.set("/",[]),this.childrenByPath.get("/").push({name:r,path:t})}let i=e.fields.typeName;if(i==="Material"){let r=t.split("/"),a=r.length>1?"/"+r[1]:"/";this.materialsByRoot.has(a)||this.materialsByRoot.set(a,[]),this.materialsByRoot.get(a).push(t)}if(i==="Shader"&&n>0){let r=t.slice(0,n);for(;r.length>0;){let a=this.specsByPath[r];if(a&&a.specType===Wi.Prim&&a.fields.typeName==="Material"){this.shadersByMaterialPath.has(r)||this.shadersByMaterialPath.set(r,[]),this.shadersByMaterialPath.get(r).push(t);break}let o=r.lastIndexOf("/");if(o<=0)break;r=r.slice(0,o)}}if(i==="GeomSubset"&&n>0){let r=t.slice(0,n);this.geomSubsetsByMeshPath.has(r)||this.geomSubsetsByMeshPath.set(r,[]),this.geomSubsetsByMeshPath.get(r).push(t)}}else if(e.specType===Wi.Attribute||e.specType===Wi.Relationship){let n=t.lastIndexOf(".");if(n>0){let i=t.slice(0,n),r=t.slice(n+1);this.attributesByPrimPath.has(i)||this.attributesByPrimPath.set(i,new Map),this.attributesByPrimPath.get(i).set(r,e)}}}}_isDirectChild(t,e,n){if(!e.startsWith(n))return!1;let i=e.slice(n.length);return i.length===0||i.startsWith("{")?!1:!i.includes("/")}_buildHierarchy(t,e){let n=[],i=new Set,r=this.childrenByPath.get(e);if(r)for(let o of r)i.has(o.path)||(i.add(o.path),n.push(o));let a=this._getVariantPaths(e);for(let o of a){let l=this.childrenByPath.get(o);if(l)for(let c of l)i.has(c.path)||(i.add(c.path),n.push(c))}for(let{name:o,path:l}of n){let c=this.specsByPath[l];if(!c||c.specType!==Wi.Prim)continue;let u=c.fields.typeName,h=this._getReferences(c);if(h.length>0){let f=this._getLocalVariantSelections(c.fields),d=[];for(let p of h){let _=this._resolveReference(p,f);_&&d.push(_)}if(d.length>0){let p=this._getAttributes(l);if(d.length===1){let m=this._findSingleMesh(d[0]);if(m&&(u==="Xform"||!u)){m.name=o,this.applyTransform(m,c.fields,p),this._applyMaterialBinding(m,l),t.add(m),this._buildHierarchy(m,l);continue}}let _=new pe;_.name=o,this.applyTransform(_,c.fields,p);for(let m of d)for(;m.children.length>0;)_.add(m.children[0]);t.add(_),this._buildHierarchy(_,l);continue}}if(u==="SkelRoot"){let f=new pe;f.name=o,f.userData.isSkelRoot=!0;let d=this._getAttributes(l);this.applyTransform(f,c.fields,d),t.add(f),this._buildHierarchy(f,l)}else if(u==="Skeleton"){let f=this._buildSkeleton(l);f&&(this.skeletons[l]=f),this._buildHierarchy(t,l)}else if(u!=="SkelAnimation"){if(u==="Mesh"){let f=this._buildMesh(l,c);f&&(t.add(f),this._buildHierarchy(f,l))}else if(u==="Camera"){let f=this._buildCamera(l);f.name=o;let d=this._getAttributes(l);this.applyTransform(f,c.fields,d),t.add(f),this._buildHierarchy(f,l)}else if(u==="DistantLight"||u==="SphereLight"||u==="RectLight"||u==="DiskLight"){let f=this._buildLight(l,u);f.name=o;let d=this._getAttributes(l);this.applyTransform(f,c.fields,d),t.add(f),this._buildHierarchy(f,l)}else if(u==="Cube"||u==="Sphere"||u==="Cylinder"||u==="Cone"||u==="Capsule"){let f=this._buildGeomPrimitive(l,c,u);f&&(t.add(f),this._buildHierarchy(f,l))}else if(!(u==="Material"||u==="Shader"||u==="GeomSubset")){let f=new pe;f.name=o;let d=this._getAttributes(l);this.applyTransform(f,c.fields,d),t.add(f),this._buildHierarchy(f,l)}}}}_getVariantPaths(t){let e=this.specsByPath[t],n=e?.fields?.variantSetChildren,i=[];if(!n||n.length===0)return i;for(let r of n){let a=this.externalVariantSelections[r]||null;if(!a){let o=e.fields.variantSelection;a=o?o[r]:null}if(!a){let o=t+"/{"+r+"=}",l=this.specsByPath[o];l?.fields?.variantChildren&&(a=l.fields.variantChildren[0])}if(a){let o=t+"/{"+r+"="+a+"}";i.push(o)}}return i}_resolveFilePath(t){let e=t;if(e.startsWith("./")&&(e=e.slice(2)),!this.basePath)return e;let n=this.basePath.endsWith("/")?this.basePath:this.basePath+"/";return zi.resolveURL(e,n)}_resolveReference(t,e={}){if(!t)return null;let n=t.match(/@([^@]+)@(?:<([^>]+)>)?/);if(!n)return null;let i=n[1],r=n[2],a=this._resolveFilePath(i),o={...e,...this.externalVariantSelections},l=this.assets[a];if(!l)return null;if(l.specsByPath){let c=new s(this.manager),u=this._getBasePath(a),h=c.compose(l,this.assets,o,u);if(r){let f=r.split("/").pop(),d=null;for(let p of h.children)if(p.name===f){d=p;break}if(d){h.remove(d);let p=new cn;return p.add(d),p}}return h}return l.isGroup||l.isObject3D?l.clone():null}_findSingleMesh(t){for(let e of t.children)if(e.isMesh)return t.remove(e),e;if(t.children.length===1){let e=t.children[0];if(e.children&&e.children.length===1){let n=e.children[0];if(n.isMesh&&!this._hasNonIdentityTransform(e))return e.remove(n),n}}return null}_hasNonIdentityTransform(t){let e=t.position,n=t.rotation,i=t.scale,r=e.x!==0||e.y!==0||e.z!==0,a=n.x!==0||n.y!==0||n.z!==0,o=i.x!==1||i.y!==1||i.z!==1;return r||a||o}_getBasePath(t){let e=t.lastIndexOf("/");return e>=0?t.slice(0,e):""}_getLocalVariantSelections(t){let e={};if(t.variantSelection)for(let n in t.variantSelection)e[n]=t.variantSelection[n];return e}_getReferences(t){let e=[];if(t.fields.references&&t.fields.references.length>0){let n=t.fields.references[0];if(typeof n=="string"){let i=n.matchAll(/@([^@]+)@(?:<([^>]+)>)?/g);for(let r of i)e.push(r[0])}else n.assetPath&&e.push("@"+n.assetPath+"@")}if(e.length===0&&t.fields.payload){let n=t.fields.payload;typeof n=="string"?e.push(n):n.assetPath&&e.push("@"+n.assetPath+"@")}return e}_getAttributes(t){let e={};this._collectAttributesFromPath(t,e);let n=t.match(sx);if(n){let i=n[1],r=n[4],a=this._getVariantPaths(i);for(let o of a){if(t.startsWith(o))continue;let l=o+"/"+r;this._collectAttributesFromPath(l,e)}}else{let i=t.split("/");for(let r=1;r<i.length-1;r++){let a=i.slice(0,r+1).join("/"),o=i.slice(r+1).join("/"),l=this._getVariantPaths(a);for(let c of l){let u=c+"/"+o;this._collectAttributesFromPath(u,e)}}}return e}_collectAttributesFromPath(t,e){let n=this.attributesByPrimPath.get(t);if(n)for(let[i,r]of n){if(r.fields?.default!==void 0)e[i]=r.fields.default;else if(r.fields?.timeSamples){let{times:a,values:o}=r.fields.timeSamples;if(a&&o&&a.length>0){let l=a.indexOf(0);e[i]=l>=0?o[l]:o[0]}}r.fields?.elementSize!==void 0&&(e[i+":elementSize"]=r.fields.elementSize),i.startsWith("primvars:")&&r.fields?.typeName!==void 0&&(e[i+":typeName"]=r.fields.typeName)}}_buildGeomPrimitive(t,e,n){let i=this._getAttributes(t),r=t.split("/").pop(),a;switch(n){case"Cube":{let u=i.size||2;a=new li(u,u,u);break}case"Sphere":{let u=i.radius||1;a=new ar(u,32,16);break}case"Cylinder":{let u=i.height||2,h=i.radius||1;a=new gs(h,h,u,32);break}case"Cone":{let u=i.height||2,h=i.radius||1;a=new er(h,u,32);break}case"Capsule":{let u=i.height||1,h=i.radius||.5;a=new tr(h,u,16,32);break}}let o=i.axis||"Z";o==="X"?a.rotateZ(-Math.PI/2):o==="Z"&&a.rotateX(Math.PI/2);let l=this._buildMaterial(t,e.fields),c=new ze(a,l);return c.name=r,this.applyTransform(c,e.fields,i),c}_buildMesh(t,e){let n=this._getAttributes(t),i=n["primvars:skel:jointIndices"],r=n["primvars:skel:jointWeights"],a=i&&r&&i.length>0&&r.length>0,o=this._getGeomSubsets(t),l,c;if(o.length>0){l=this._buildGeometryWithSubsets(n,o,a);let d=this._getMaterialPath(t,e.fields);c=o.map(p=>{let _=p.materialPath||d;return this._buildMaterialForPath(_)})}else l=this._buildGeometry(t,n,a),c=this._buildMaterial(t,e.fields);let u=n["primvars:displayColor"];if(u&&u.length>=3){let d=p=>{p.color&&p.color.r===1&&p.color.g===1&&p.color.b===1&&!p.map&&p.color.setRGB(u[0],u[1],u[2],$t)};Array.isArray(c)?c.forEach(d):d(c)}let h=n["primvars:displayOpacity"];if(h&&h.length===1&&o.length===0){let d=h[0],p=_=>{d<1&&_.opacity===1&&_.transparent===!1&&(_.opacity=d,_.transparent=!0)};Array.isArray(c)?c.forEach(p):p(c)}let f;if(a){f=new Js(l,c);let d=this.specsByPath[t+".skel:skeleton"];d||(d=this.specsByPath[t+".rel skel:skeleton"]);let p=null;d&&(d.fields.targetPaths&&d.fields.targetPaths.length>0?p=d.fields.targetPaths[0]:d.fields.default&&(p=d.fields.default.replace(/<|>/g,"")));let _=n["skel:joints"],m=n["primvars:skel:geomBindTransform"];this.skinnedMeshes.push({mesh:f,skeletonPath:p,path:t,localJoints:_,geomBindTransform:m})}else f=new ze(l,c);return f.name=t.split("/").pop(),this.applyTransform(f,e.fields,n),f}_buildCamera(t){let e=this._getAttributes(t),n=e.projection,i=typeof n=="string"?n.toLowerCase():An.projection,r=e.clippingRange||An.clippingRange,a=Math.max(Number.EPSILON,this._parseNumber(r[0],An.clippingRange[0])),o=Math.max(a+Number.EPSILON,this._parseNumber(r[1],An.clippingRange[1])),l=this._parseNumber(e.horizontalAperture,An.horizontalAperture),c=this._parseNumber(e.verticalAperture,An.verticalAperture),u=this._parseNumber(e.horizontalApertureOffset,An.horizontalApertureOffset),h=this._parseNumber(e.verticalApertureOffset,An.verticalApertureOffset),f=this._parseNumber(e.focalLength,An.focalLength),d=this._parseNumber(e.focusDistance,An.focusDistance),p=this._parseNumber(e.fStop,An.fStop),_;if(i==="orthographic"){let m=l/10,g=c/10,A=u/10,M=h/10;_=new fi(A-m*.5,A+m*.5,M+g*.5,M-g*.5,a,o)}else{let m=Math.max(Number.EPSILON,c),g=Math.max(Number.EPSILON,f),A=l/m,M=2*Math.atan(m/(2*g))*180/Math.PI;_=new Se(M,A,a,o),_.filmGauge=Math.max(l,c),_.filmOffset=u,_.focus=d,_.setFocalLength(g),h!==0&&(_.userData.verticalApertureOffset=h)}return _.userData.fStop=p,_.userData.usdProjection=i,_}_buildLight(t,e){let n=this._getAttributes(t),i=this._parseNumber(n["inputs:intensity"],1),r=n["inputs:color"]||[1,1,1],a=n["inputs:enableColorTemperature"]===!0,o=this._parseNumber(n["inputs:colorTemperature"],6500),l=new Nt(r[0],r[1],r[2]);if(a){let u=this._colorTemperature(o);l.multiply(u)}let c;switch(e){case"DistantLight":c=new Yn(l,i);break;case"SphereLight":{let u=this._parseNumber(n["shaping:cone:angle"],0);if(u>0){let h=u*Math.PI/180,f=this._parseNumber(n["shaping:cone:softness"],0);c=new fr(l,i,0,h,f)}else c=new dr(l,i);break}case"RectLight":{let u=this._parseNumber(n["inputs:width"],1),h=this._parseNumber(n["inputs:height"],1);c=new Ms(l,i,u,h);break}case"DiskLight":{let h=this._parseNumber(n["inputs:radius"],.5)*2;c=new Ms(l,i,h,h);break}}return c}_colorTemperature(t){let e=t/100,n,i,r;return e<=66?(n=1,i=.3900815787690196*Math.log(e)-.6318414437886275):(n=1.292936186062745*Math.pow(e-60,-.1332047592),i=1.1298908608952942*Math.pow(e-60,-.0755148492)),e>=66?r=1:e<=19?r=0:r=.543206789110196*Math.log(e-10)-1.19625408914,new Nt(Math.min(Math.max(n,0),1),Math.min(Math.max(i,0),1),Math.min(Math.max(r,0),1))}_parseNumber(t,e){let n=Number(t);return Number.isFinite(n)?n:e}_getGeomSubsets(t){let e=[],n=this.geomSubsetsByMeshPath.get(t);if(!n)return e;for(let i of n){let a=this._getAttributes(i).indices;if(!a||a.length===0)continue;let o=this._getMaterialBindingTarget(i);e.push({name:i.split("/").pop(),indices:a,materialPath:o})}return e}_getMaterialBindingTarget(t){let e="material:binding",n=t+"."+e,i=this.specsByPath[n];if(i?.fields?.targetPaths?.length>0)return i.fields.targetPaths[0];let r=t.split("/");for(let a=1;a<r.length;a++){let o=r.slice(0,a+1).join("/"),l=r.slice(a+1).join("/"),c=this._getVariantPaths(o);for(let u of c){let h=l?u+"/"+l+"."+e:u+"."+e,f=this.specsByPath[h];if(f?.fields?.targetPaths?.length>0)return f.fields.targetPaths[0]}}return null}_buildGeometry(t,e,n=!1){let i=new Be,r=e.points;if(!r||r.length===0)return i;let a=e.faceVertexIndices,o=e.faceVertexCounts,l=e["primvars:arnold:polygon_holes"],c=this._buildHoleMap(l),u=a,h=null;if(o&&o.length>0){let x=this._triangulateIndicesWithPattern(a,o,r,c);u=x.indices,h=x.pattern}let f=r;u&&u.length>0&&(f=this._expandAttribute(r,u,3)),i.setAttribute("position",new te(new Float32Array(f),3));let d=e.normals||e["primvars:normals"],p=e["normals:indices"]||e["primvars:normals:indices"];if(d&&d.length>0){let x=d;if(p&&p.length>0&&h){let T=this._applyTriangulationPattern(p,h);x=this._expandAttribute(d,T,3)}else if(d.length===r.length)u&&u.length>0&&(x=this._expandAttribute(d,u,3));else if(h){let T=this._applyTriangulationPattern(Array.from({length:d.length/3},(b,C)=>C),h);x=this._expandAttribute(d,T,3)}i.setAttribute("normal",new te(new Float32Array(x),3))}else{let x=this._computeVertexNormals(r,u);i.setAttribute("normal",new te(new Float32Array(this._expandAttribute(x,u,3)),3))}let{uvs:_,uvIndices:m}=this._findUVPrimvar(e),g=a?a.length:0;if(_&&_.length>0){let x=_;if(m&&m.length>0&&h){let T=this._applyTriangulationPattern(m,h);x=this._expandAttribute(_,T,2)}else if(u&&_.length/2===r.length/3)x=this._expandAttribute(_,u,2);else if(h&&_.length/2===g){let T=this._applyTriangulationPattern(Array.from({length:g},(b,C)=>C),h);x=this._expandAttribute(_,T,2)}i.setAttribute("uv",new te(new Float32Array(x),2))}let{uvs2:A,uv2Indices:M}=this._findUV2Primvar(e);if(A&&A.length>0){let x=A;if(M&&M.length>0&&h){let T=this._applyTriangulationPattern(M,h);x=this._expandAttribute(A,T,2)}else if(u&&A.length/2===r.length/3)x=this._expandAttribute(A,u,2);else if(h&&A.length/2===g){let T=this._applyTriangulationPattern(Array.from({length:g},(b,C)=>C),h);x=this._expandAttribute(A,T,2)}i.setAttribute("uv1",new te(new Float32Array(x),2))}if(n){let x=e["primvars:skel:jointIndices"],T=e["primvars:skel:jointWeights"],b=e["primvars:skel:jointIndices:elementSize"]||4;if(x&&T){let C=f.length/3,y,w;u&&u.length>0?(y=this._expandAttribute(x,u,b),w=this._expandAttribute(T,u,b)):(y=x,w=T);let R=new Uint16Array(C*4),P=new Float32Array(C*4);this._selectTopWeights(y,w,b,C,R,P),i.setAttribute("skinIndex",new te(R,4)),i.setAttribute("skinWeight",new te(P,4))}}return i}_buildGeometryWithSubsets(t,e,n=!1){let i=new Be,r=t.points;if(!r||r.length===0)return i;let a=t.faceVertexIndices,o=t.faceVertexCounts;if(!o||o.length===0)return i;let l=t["primvars:arnold:polygon_holes"],c=this._buildHoleMap(l),u=c.holeFaces,h=c.parentToHoles,{uvs:f,uvIndices:d}=this._findUVPrimvar(t),{uvs2:p,uv2Indices:_}=this._findUV2Primvar(t),m=t.normals||t["primvars:normals"],g=t["normals:indices"]||t["primvars:normals:indices"],A=n?t["primvars:skel:jointIndices"]:null,M=n?t["primvars:skel:jointWeights"]:null,x=t["primvars:skel:jointIndices:elementSize"]||4,T=[],b=0;for(let et=0;et<o.length;et++){if(T.push(b),u.has(et))continue;let St=o[et],vt=h.get(et);if(vt&&vt.length>0){let qt=St;for(let yt of vt)qt+=o[yt];b+=qt-2}else St>=3&&(b+=St-2)}let C=new Int32Array(b).fill(-1);for(let et=0;et<e.length;et++){let St=e[et];for(let vt=0;vt<St.indices.length;vt++){let qt=St.indices[vt];if(qt>=o.length)continue;let yt=T[qt],Ot=o[qt]-2;for(let Dt=0;Dt<Ot;Dt++)C[yt+Dt]=et}}let y=[];for(let et=0;et<b;et++)y.push({original:et,subset:C[et]});y.sort((et,St)=>et.subset-St.subset);let w=[],R=y.length>0?y[0].subset:-1,P=0;for(let et=0;et<y.length;et++)y[et].subset!==R&&(R>=0&&w.push({start:P*3,count:(et-P)*3,materialIndex:R}),R=y[et].subset,P=et);R>=0&&y.length>P&&w.push({start:P*3,count:(y.length-P)*3,materialIndex:R});for(let et of w)i.addGroup(et.start,et.count,et.materialIndex);let{indices:I,pattern:V}=this._triangulateIndicesWithPattern(a,o,r,c),W=o.reduce((et,St)=>et+St,0),N=f&&!d&&f.length/2===W||p&&!_&&p.length/2===W?this._applyTriangulationPattern(Array.from({length:W},(et,St)=>St),V):null,G=d?this._applyTriangulationPattern(d,V):f&&f.length/2===W?N:null,X=_?this._applyTriangulationPattern(_,V):p&&p.length/2===W?N:null,$=m&&g&&g.length>0,Q=m&&m.length/3===W,st=$?this._applyTriangulationPattern(g,V):Q?this._applyTriangulationPattern(Array.from({length:W},(et,St)=>St),V):null,rt=!m&&I.length>0?this._computeVertexNormals(r,I):null,lt=b*3,zt=new Float32Array(lt*3),Zt=f?new Float32Array(lt*2):null,Ft=p?new Float32Array(lt*2):null,q=m||rt?new Float32Array(lt*3):null,nt=A?new Uint16Array(lt*x):null,tt=M?new Float32Array(lt*x):null;for(let et=0;et<y.length;et++){let St=y[et].original;for(let vt=0;vt<3;vt++){let qt=St*3+vt,yt=et*3+vt,Ot=I[qt];if(zt[yt*3]=r[Ot*3],zt[yt*3+1]=r[Ot*3+1],zt[yt*3+2]=r[Ot*3+2],Zt&&f)if(G){let Dt=G[qt];Zt[yt*2]=f[Dt*2],Zt[yt*2+1]=f[Dt*2+1]}else f.length/2===r.length/3&&(Zt[yt*2]=f[Ot*2],Zt[yt*2+1]=f[Ot*2+1]);if(Ft&&p)if(X){let Dt=X[qt];Ft[yt*2]=p[Dt*2],Ft[yt*2+1]=p[Dt*2+1]}else p.length/2===r.length/3&&(Ft[yt*2]=p[Ot*2],Ft[yt*2+1]=p[Ot*2+1]);if(q)if(m&&st){let Dt=st[qt];q[yt*3]=m[Dt*3],q[yt*3+1]=m[Dt*3+1],q[yt*3+2]=m[Dt*3+2]}else m&&m.length===r.length?(q[yt*3]=m[Ot*3],q[yt*3+1]=m[Ot*3+1],q[yt*3+2]=m[Ot*3+2]):rt&&(q[yt*3]=rt[Ot*3],q[yt*3+1]=rt[Ot*3+1],q[yt*3+2]=rt[Ot*3+2]);if(nt&&tt&&A&&M)for(let Dt=0;Dt<x;Dt++)nt[yt*x+Dt]=A[Ot*x+Dt]||0,tt[yt*x+Dt]=M[Ot*x+Dt]||0}}if(i.setAttribute("position",new te(zt,3)),Zt&&i.setAttribute("uv",new te(Zt,2)),Ft&&i.setAttribute("uv1",new te(Ft,2)),i.setAttribute("normal",new te(q,3)),nt&&tt){let et=new Uint16Array(lt*4),St=new Float32Array(lt*4);this._selectTopWeights(nt,tt,x,lt,et,St),i.setAttribute("skinIndex",new te(et,4)),i.setAttribute("skinWeight",new te(St,4))}return i}_selectTopWeights(t,e,n,i,r,a){if(n<=4){for(let l=0;l<i;l++)for(let c=0;c<4;c++)c<n?(r[l*4+c]=t[l*n+c]||0,a[l*4+c]=e[l*n+c]||0):(r[l*4+c]=0,a[l*4+c]=0);return}let o=new Uint32Array(n);for(let l=0;l<i;l++){let c=l*n;for(let h=0;h<n;h++)o[h]=h;for(let h=0;h<4;h++){let f=h,d=e[c+o[h]]||0;for(let p=h+1;p<n;p++){let _=e[c+o[p]]||0;_>d&&(d=_,f=p)}if(f!==h){let p=o[h];o[h]=o[f],o[f]=p}}let u=0;for(let h=0;h<4;h++)u+=e[c+o[h]]||0;for(let h=0;h<4;h++){let f=o[h];u>0?(r[l*4+h]=t[c+f]||0,a[l*4+h]=(e[c+f]||0)/u):(r[l*4+h]=0,a[l*4+h]=0)}}}_findUVPrimvar(t){for(let i in t){if(!i.startsWith("primvars:")||i.endsWith(":typeName")||i.endsWith(":elementSize")||i.endsWith(":indices")||i.includes("skel:"))continue;let r=t[i+":typeName"];if(r&&r.includes("texCoord"))return{uvs:t[i],uvIndices:t[i+":indices"]}}let e=t["primvars:st"]||t["primvars:UVMap"],n=t["primvars:st:indices"];return{uvs:e,uvIndices:n}}_findUV2Primvar(t){let e=t["primvars:st1"],n=t["primvars:st1:indices"];return{uvs2:e,uv2Indices:n}}_buildHoleMap(t){if(!t||t.length===0)return{parentToHoles:new Map,holeFaces:new Set};let e=new Map,n=new Set;for(let i=0;i<t.length;i+=2){let r=t[i],a=t[i+1];n.add(r),e.has(a)||e.set(a,[]),e.get(a).push(r)}return{parentToHoles:e,holeFaces:n}}_triangulateIndicesWithPattern(t,e,n=null,i=null){let r=[],a=[],o=[],l=0;for(let f=0;f<e.length;f++)o.push(l),l+=e[f];let c=i?.parentToHoles||new Map,u=i?.holeFaces||new Set,h=0;for(let f=0;f<e.length;f++){let d=e[f];if(u.has(f)){h+=d;continue}let p=c.get(f);if(p&&p.length>0&&n&&n.length>0){let _=new Map,m=[];for(let M=0;M<d;M++){let x=t[h+M];m.push(x),_.set(x,h+M)}let g=[];for(let M of p){let x=o[M],T=e[M],b=[];for(let C=0;C<T;C++){let y=t[x+C];b.push(y),_.set(y,x+C)}g.push(b)}let A=this._triangulateNGonWithHoles(m,g,n);for(let M of A)r.push(M[0],M[1],M[2]),a.push(_.get(M[0]),_.get(M[1]),_.get(M[2]))}else if(d===3)r.push(t[h],t[h+1],t[h+2]),a.push(h,h+1,h+2);else if(d===4)r.push(t[h],t[h+1],t[h+2],t[h],t[h+2],t[h+3]),a.push(h,h+1,h+2,h,h+2,h+3);else if(d>4)if(n&&n.length>0){let _=[];for(let g=0;g<d;g++)_.push(t[h+g]);let m=this._triangulateNGon(_,n);for(let g of m)r.push(g[0],g[1],g[2]),a.push(h+_.indexOf(g[0]),h+_.indexOf(g[1]),h+_.indexOf(g[2]))}else for(let _=1;_<d-1;_++)r.push(t[h],t[h+_],t[h+_+1]),a.push(h,h+_,h+_+1);h+=d}return{indices:r,pattern:a}}_applyTriangulationPattern(t,e){let n=[];for(let i=0;i<e.length;i++)n.push(t[e[i]]);return n}_triangulateNGon(t,e){let n=[],i=[];for(let u of t)i.push(new L(e[u*3],e[u*3+1],e[u*3+2]));let r=new L;for(let u=0;u<i.length;u++){let h=i[u],f=i[(u+1)%i.length];r.x+=(h.y-f.y)*(h.z+f.z),r.y+=(h.z-f.z)*(h.x+f.x),r.z+=(h.x-f.x)*(h.y+f.y)}r.normalize();let a=new L,o=new L;Math.abs(r.y)>.9?a.set(1,0,0):a.set(0,1,0),o.crossVectors(r,a).normalize(),a.crossVectors(o,r).normalize();for(let u of i)n.push(new It(u.dot(a),u.dot(o)));let l=xs.triangulateShape(n,[]),c=[];for(let u of l)c.push([t[u[0]],t[u[1]],t[u[2]]]);return c}_triangulateNGonWithHoles(t,e,n){let i=[];for(let d of t)i.push(new L(n[d*3],n[d*3+1],n[d*3+2]));let r=new L;for(let d=0;d<i.length;d++){let p=i[d],_=i[(d+1)%i.length];r.x+=(p.y-_.y)*(p.z+_.z),r.y+=(p.z-_.z)*(p.x+_.x),r.z+=(p.x-_.x)*(p.y+_.y)}r.normalize();let a=new L,o=new L;Math.abs(r.y)>.9?a.set(1,0,0):a.set(0,1,0),o.crossVectors(r,a).normalize(),a.crossVectors(o,r).normalize();let l=[];for(let d of i)l.push(new It(d.dot(a),d.dot(o)));let c=[];for(let d of e){let p=[];for(let _ of d){let m=new L(n[_*3],n[_*3+1],n[_*3+2]);p.push(new It(m.dot(a),m.dot(o)))}c.push(p)}let u=[...t];for(let d of e)u.push(...d);let h=xs.triangulateShape(l,c),f=[];for(let d of h)f.push([u[d[0]],u[d[1]],u[d[2]]]);return f}_triangulateIndices(t,e){let n=[],i=0;for(let r=0;r<e.length;r++){let a=e[r];if(a===3)n.push(t[i],t[i+1],t[i+2]);else if(a===4)n.push(t[i],t[i+1],t[i+2],t[i],t[i+2],t[i+3]);else if(a>4)for(let o=1;o<a-1;o++)n.push(t[i],t[i+o],t[i+o+1]);i+=a}return n}_expandAttribute(t,e,n){let i=new Array(e.length*n);for(let r=0;r<e.length;r++){let a=e[r];for(let o=0;o<n;o++)i[r*n+o]=t[a*n+o]}return i}_computeVertexNormals(t,e){let n=t.length/3,i=new Float32Array(n*3);for(let r=0;r<e.length;r+=3){let a=e[r],o=e[r+1],l=e[r+2],c=t[a*3],u=t[a*3+1],h=t[a*3+2],f=t[o*3],d=t[o*3+1],p=t[o*3+2],_=t[l*3],m=t[l*3+1],g=t[l*3+2],A=f-c,M=d-u,x=p-h,T=_-c,b=m-u,C=g-h,y=M*C-x*b,w=x*T-A*C,R=A*b-M*T;i[a*3]+=y,i[a*3+1]+=w,i[a*3+2]+=R,i[o*3]+=y,i[o*3+1]+=w,i[o*3+2]+=R,i[l*3]+=y,i[l*3+1]+=w,i[l*3+2]+=R}for(let r=0;r<n;r++){let a=i[r*3],o=i[r*3+1],l=i[r*3+2],c=Math.sqrt(a*a+o*o+l*l);c>0&&(i[r*3]/=c,i[r*3+1]/=c,i[r*3+2]/=c)}return i}_getMaterialPath(t,e){let n=null,i=e["material:binding"];return i&&(n=Array.isArray(i)?i[0]:i),n||(n=this._getMaterialBindingTarget(t)),n}_buildMaterial(t,e){let n=new Oi,i=null,r=e["material:binding"];if(r&&(i=Array.isArray(r)?r[0]:r),i||(i=this._getMaterialBindingTarget(t)),!i){let a=[],o=t+"/";for(let l in this.specsByPath){if(!l.startsWith(o)||!l.endsWith(".material:binding"))continue;let c=this.specsByPath[l];if(!c)continue;let u=c.fields.targetPaths;u&&u.length>0&&a.push(u[0])}a.length>0&&(i=this._pickBestMaterial(a))}if(!i){let o="/"+t.split("/")[1],l=this.materialsByRoot.get(o);if(l){for(let c of l)if(c.startsWith(o+"/Looks/")||c.startsWith(o+"/Materials/")){i=c;break}}}return i&&this._applyMaterial(n,i),n}_buildMaterialForPath(t){let e=new Oi;return t&&this._applyMaterial(e,t),e}_applyMaterialBinding(t,e){let n=e+".material:binding",i=this.specsByPath[n];if(!i)return;let r=null,a=i.fields?.targetPaths||i.fields?.default;if(a&&(r=Array.isArray(a)?a[0]:a),!r)return;r=String(r).replace(/^<|>$/g,"");let o=new Oi;this._applyMaterial(o,r),t.material=o}_pickBestMaterial(t){for(let e of t){let n=this.shadersByMaterialPath.get(e);if(n)for(let i of n){let r=this._getAttributes(i);if(r["info:id"]==="UsdUVTexture"&&r["inputs:file"])return e}}return t[0]}_applyMaterial(t,e){if(!this.specsByPath[e])return;let i=this.shadersByMaterialPath.get(e);if(i)for(let r of i){let a=this.specsByPath[r];if(!a)continue;let l=this._getAttributes(r)["info:id"]||a.fields["info:id"];l==="UsdPreviewSurface"||l==="ND_UsdPreviewSurface_surfaceshader"?this._applyPreviewSurface(t,r):l==="arnold:openpbr_surface"&&this._applyOpenPBRSurface(t,r)}}_applyTextureOrValue(t,e,n,i,r,a,o,l){let c=e+"."+i,u=this.specsByPath[c];if(u&&u.fields.connectionPaths&&u.fields.connectionPaths.length>0){let h=l===this._getTextureFromOpenPBRConnection?u.fields.connectionPaths:[u.fields.connectionPaths[0]];for(let f of h){let d=l.call(this,f);if(d)return d.colorSpace=a,t[r]=d,!0}}return n[i]!==void 0&&o&&o(n[i]),!1}_applyPreviewSurface(t,e){let n=this._getAttributes(e),i=(h,f,d,p)=>this._applyTextureOrValue(t,e,n,h,f,d,p,this._getTextureFromConnection),r=h=>{let f=e+"."+h;return this.specsByPath[f]};if(i("inputs:diffuseColor","map",$t,h=>{Array.isArray(h)&&h.length>=3&&t.color.setRGB(h[0],h[1],h[2],$t)}),t.map&&t.map.userData.scale){let h=t.map.userData.scale;Array.isArray(h)&&h.length>=3&&t.color.setRGB(h[0],h[1],h[2],$t)}if(i("inputs:emissiveColor","emissiveMap",$t,h=>{Array.isArray(h)&&h.length>=3&&t.emissive.setRGB(h[0],h[1],h[2],$t)}),t.emissiveMap)if(t.emissiveMap.userData.scale){let h=t.emissiveMap.userData.scale;Array.isArray(h)&&h.length>=3&&t.emissive.setRGB(h[0],h[1],h[2],$t)}else t.emissive.set(16777215);if(i("inputs:normal","normalMap",Le,null),t.normalMap&&t.normalMap.userData.scale){let h=t.normalMap.userData.scale;t.normalScale=new It(h[0],h[1])}if(i("inputs:roughness","roughnessMap",Le,h=>{t.roughness=h})&&(t.roughness=1),i("inputs:metallic","metalnessMap",Le,h=>{t.metalness=h})&&(t.metalness=1),i("inputs:occlusion","aoMap",Le,null),n["inputs:ior"]!==void 0&&(t.ior=n["inputs:ior"]),i("inputs:specularColor","specularColorMap",$t,h=>{Array.isArray(h)&&h.length>=3&&t.specularColor.setRGB(h[0],h[1],h[2],$t)}),t.specularColorMap&&t.specularColorMap.userData.scale){let h=t.specularColorMap.userData.scale;Array.isArray(h)&&h.length>=3&&t.specularColor.setRGB(h[0],h[1],h[2],$t)}n["inputs:clearcoat"]!==void 0&&(t.clearcoat=n["inputs:clearcoat"]),n["inputs:clearcoatRoughness"]!==void 0&&(t.clearcoatRoughness=n["inputs:clearcoatRoughness"]);let l=n["inputs:opacityThreshold"]!==void 0?n["inputs:opacityThreshold"]:0;if(r("inputs:opacity")?.fields?.connectionPaths?.length>0)l>0?(t.alphaTest=l,t.transparent=!1):t.transparent=!0;else{let h=n["inputs:opacity"]!==void 0?n["inputs:opacity"]:1;h<1&&(t.transparent=!0,t.opacity=h)}}_applyOpenPBRSurface(t,e){let n=this._getAttributes(e),i=(_,m,g,A)=>this._applyTextureOrValue(t,e,n,_,m,g,A,this._getTextureFromOpenPBRConnection);if(i("inputs:base_color","map",$t,_=>{Array.isArray(_)&&_.length>=3&&t.color.setRGB(_[0],_[1],_[2],$t)}),t.map&&t.map.userData.scale){let _=t.map.userData.scale;Array.isArray(_)&&_.length>=3&&t.color.setRGB(_[0],_[1],_[2],$t)}i("inputs:base_metalness","metalnessMap",Le,_=>{typeof _=="number"&&(t.metalness=_)}),i("inputs:specular_roughness","roughnessMap",Le,_=>{typeof _=="number"&&(t.roughness=_)});let r=i("inputs:emission_color","emissiveMap",$t,_=>{Array.isArray(_)&&_.length>=3&&t.emissive.setRGB(_[0],_[1],_[2],$t)}),a=n["inputs:emission_luminance"];a!==void 0&&a>0&&(r?t.emissiveIntensity=a:t.emissive.multiplyScalar(a));let o=n["inputs:transmission_weight"];if(o!==void 0&&o>0){t.transmission=o;let _=n["inputs:transmission_depth"];_!==void 0&&(t.thickness=_);let m=n["inputs:transmission_color"];m!==void 0&&Array.isArray(m)&&(t.attenuationColor.setRGB(m[0],m[1],m[2]),t.attenuationDistance=_||1)}let l=n["inputs:geometry_opacity"];l!==void 0&&l<1&&(t.opacity=l,t.transparent=!0);let c=n["inputs:specular_ior"];c!==void 0&&(t.ior=c);let u=n["inputs:coat_weight"];if(u!==void 0&&u>0){t.clearcoat=u;let _=n["inputs:coat_roughness"];_!==void 0&&(t.clearcoatRoughness=_)}let h=n["inputs:thin_film_weight"];if(h!==void 0&&h>0){t.iridescence=h;let _=n["inputs:thin_film_ior"];_!==void 0&&(t.iridescenceIOR=_);let m=n["inputs:thin_film_thickness"];if(m!==void 0){let g=m*1e3;t.iridescenceThicknessRange=[g,g]}}let f=n["inputs:specular_weight"];f!==void 0&&(t.specularIntensity=f);let d=n["inputs:specular_color"];d!==void 0&&Array.isArray(d)&&t.specularColor.setRGB(d[0],d[1],d[2]);let p=n["inputs:specular_roughness_anisotropy"];p!==void 0&&p>0&&(t.anisotropy=p),i("inputs:geometry_normal","normalMap",Le,null)}_getTextureFromOpenPBRConnection(t){let e=t.replace(/<|>/g,""),n=e.split(".")[0],i=this.specsByPath[n];if(!i)return null;let r=this._getAttributes(n),a=r["info:id"]||i.fields["info:id"];if(i.fields.typeName==="NodeGraph"){let c=e.split(".")[1],u=n+"."+c,h=this.specsByPath[u];return h?.fields?.connectionPaths?.length>0?this._getTextureFromOpenPBRConnection(h.fields.connectionPaths[0]):null}if(a==="arnold:image"){let c=r["inputs:filename"];return c?this._loadTextureFromPath(c):null}if(a&&a.startsWith("ND_image_")){let c=r["inputs:file"];return c?this._loadTextureFromPath(c):null}if(a==="MayaND_fileTexture_color4"){let c=n+".inputs:inColor",u=this.specsByPath[c];return u?.fields?.connectionPaths?.length>0?this._getTextureFromOpenPBRConnection(u.fields.connectionPaths[0]):null}if(a&&a.startsWith("ND_convert_")){let c=n+".inputs:in",u=this.specsByPath[c];return u?.fields?.connectionPaths?.length>0?this._getTextureFromOpenPBRConnection(u.fields.connectionPaths[0]):null}if(a==="arnold:bump2d"){let c=n+".inputs:bump_map",u=this.specsByPath[c];return u?.fields?.connectionPaths?.length>0?this._getTextureFromOpenPBRConnection(u.fields.connectionPaths[0]):null}if(a==="arnold:color_correct"){let c=n+".inputs:input",u=this.specsByPath[c];return u?.fields?.connectionPaths?.length>0?this._getTextureFromOpenPBRConnection(u.fields.connectionPaths[0]):null}let l=n.substring(0,n.lastIndexOf("/"));if(l){let c=this.specsByPath[l];if(c){let u=this._getAttributes(l);if((u["info:id"]||c.fields["info:id"])==="arnold:image"){let f=u["inputs:filename"];if(f)return this._loadTextureFromPath(f)}}}return null}_loadTextureFromPath(t){if(!t)return null;if(this.textureCache[t])return this.textureCache[t];let e=this._loadTexture(t,null,null);return e&&(this.textureCache[t]=e),e}_getTextureFromConnection(t){let e=t.split(".")[0],n=this.specsByPath[e];if(!n)return null;let i=this._getAttributes(e);if((i["info:id"]||n.fields["info:id"])!=="UsdUVTexture")return null;let a=i["inputs:file"];if(!a)return null;let o=null,l=0,c=e+".inputs:st",u=this.specsByPath[c];if(u?.fields?.connectionPaths?.length>0){let m=u.fields.connectionPaths[0].replace(/<|>/g,"").split(".")[0],g=this.specsByPath[m];if(g){let A=this._getAttributes(m),M=A["info:id"]||g.fields["info:id"];if(M==="UsdTransform2d"){o=A;let x=m+".inputs:in",T=this.specsByPath[x];if(T?.fields?.connectionPaths?.length>0){let C=T.fields.connectionPaths[0].replace(/<|>/g,"").split(".")[0],w=this._getAttributes(C)["inputs:varname"];w==="st1"?l=1:w==="st2"&&(l=2)}}else if(M==="UsdPrimvarReader_float2"){let x=A["inputs:varname"];x==="st1"?l=1:x==="st2"&&(l=2)}}}let h=i["inputs:scale"],f=i["inputs:bias"],d=a;if(h&&(d+=":s"+h.join(",")),f&&(d+=":b"+f.join(",")),this.textureCache[d])return this.textureCache[d];let p=this._loadTexture(a,i,o);return p&&(h&&(p.userData.scale=h),f&&(p.userData.bias=f),l!==0&&(p.channel=l),this.textureCache[d]=p),p}_applyTextureTransforms(t,e){if(!e)return;let n=e["inputs:scale"];n&&Array.isArray(n)&&n.length>=2&&t.repeat.set(n[0],n[1]);let i=e["inputs:translation"];i&&Array.isArray(i)&&i.length>=2&&t.offset.set(i[0],i[1]);let r=e["inputs:rotation"];typeof r=="number"&&(t.rotation=r*Math.PI/180)}_loadTexture(t,e,n){let i=t;i.startsWith("@")&&(i=i.slice(1)),i.endsWith("@")&&(i=i.slice(0,-1));let r=this._resolveFilePath(i),a=this.assets[r];if(a||(a=this.assets[i]),!a){let o=i.split("/").pop();for(let l in this.assets)if(l.endsWith(o)||l.endsWith("/"+o))return this._createTextureFromData(this.assets[l],e,n);if(this.basePath)return this._createTextureFromData(r,e,n);if(this.manager){let l=this.manager.resolveURL(o);if(l!==o)return this._createTextureFromData(l,e,n)}return console.warn("USDLoader: Texture not found:",i),null}return this._createTextureFromData(a,e,n)}_createTextureFromData(t,e,n){if(!t)return null;let i=this,r=new Oe,a;if(typeof t=="string")a=t;else if(t instanceof Uint8Array||t instanceof ArrayBuffer){let l=new Blob([t]);a=URL.createObjectURL(l)}else return null;let o=new Image;return this.texturePromises.push(new Promise(l=>{o.onload=function(){r.image=o,e&&(r.wrapS=i._getWrapMode(e["inputs:wrapS"]),r.wrapT=i._getWrapMode(e["inputs:wrapT"])),i._applyTextureTransforms(r,n),r.needsUpdate=!0,typeof t!="string"&&URL.revokeObjectURL(a),l()},o.onerror=function(){console.warn("USDLoader: Failed to load texture:",a),typeof t!="string"&&URL.revokeObjectURL(a),l()}})),o.src=a,r}_getWrapMode(t){return t==="repeat"?Li:t==="mirror"?cs:t==="clamp"?ln:Li}_buildSkeleton(t){let e=this._getAttributes(t),n=e.joints;if(!n||n.length===0)return null;let i=e.bindTransforms,r=e.restTransforms,a=this._flattenMatrixArray(i,n.length),o=this._flattenMatrixArray(r,n.length),l=[],c={},u=[];for(let p=0;p<n.length;p++){let _=n[p],m=_.split("/").pop(),g=new ps;if(g.name=m,l.push(g),c[_]={bone:g,index:p},a&&a.length>=(p+1)*16){let A=new Gt,M=a.slice(p*16,(p+1)*16);A.set(M[0],M[4],M[8],M[12],M[1],M[5],M[9],M[13],M[2],M[6],M[10],M[14],M[3],M[7],M[11],M[15]);let x=A.clone().invert();u.push(x)}else u.push(new Gt)}for(let p=0;p<n.length;p++){let m=n[p].split("/");if(m.length>1){let g=m.slice(0,-1).join("/"),A=c[g];A&&A.bone.add(l[p])}}if(o&&o.length>=n.length*16)for(let p=0;p<n.length;p++){let _=new Gt,m=o.slice(p*16,(p+1)*16);_.set(m[0],m[4],m[8],m[12],m[1],m[5],m[9],m[13],m[2],m[6],m[10],m[14],m[3],m[7],m[11],m[15]),_.decompose(l[p].position,l[p].quaternion,l[p].scale)}let h=l.filter(p=>!p.parent||!p.parent.isBone),f=this.specsByPath[t+".skel:animationSource"],d=null;return f&&f.fields.targetPaths&&f.fields.targetPaths.length>0&&(d=f.fields.targetPaths[0]),{skeleton:new $s(l,u),joints:n,rootBones:h,animationPath:d,path:t}}_bindSkeletons(){for(let t of this.skinnedMeshes){let{mesh:e,skeletonPath:n,localJoints:i,geomBindTransform:r}=t,a=null;if(n&&this.skeletons[n]&&(a=this.skeletons[n]),!a){for(let h in this.skeletons)if(n&&(n.includes(h)||h.includes(n))){a=this.skeletons[h];break}}if(!a){let h=Object.keys(this.skeletons);h.length>0&&(a=this.skeletons[h[0]])}if(!a){console.warn("USDComposer: No skeleton found for skinned mesh",e.name);continue}let{skeleton:o,rootBones:l,joints:c}=a;if(i&&i.length>0){let h=e.geometry.attributes.skinIndex;if(h){let f=[];for(let p=0;p<i.length;p++){let _=i[p],m=c.indexOf(_);f[p]=m>=0?m:0}let d=h.array;for(let p=0;p<d.length;p++){let _=d[p];_<f.length&&(d[p]=f[_])}}}for(let h of l)e.add(h);let u=new Gt;if(r&&r.length===16){let h=r;u.set(h[0],h[4],h[8],h[12],h[1],h[5],h[9],h[13],h[2],h[6],h[10],h[14],h[3],h[7],h[11],h[15])}e.bind(o,u)}}_buildAnimations(){let t=[];for(let n in this.specsByPath){let i=this.specsByPath[n];if(i.specType!==Wi.Prim||i.fields.typeName!=="SkelAnimation")continue;let r=this._buildAnimationClip(n);r&&t.push(r)}let e=this._buildTransformAnimations();return e.length>0&&t.push(new hi("TransformAnimation",-1,e)),t}_buildTransformAnimations(){let t=[];for(let e in this.specsByPath){let n=this.specsByPath[e];if(n.specType!==Wi.Prim)continue;let i=n.fields?.typeName;if(i!=="Xform"&&i!=="Scope"&&i!=="Mesh")continue;let r=e.split("/").pop(),a=e+".xformOp:orient",o=this.specsByPath[a];if(o?.fields?.timeSamples){let{times:_,values:m}=o.fields.timeSamples,g=[],A=[];for(let M=0;M<_.length;M++){g.push(_[M]/this.fps);let x=m[M];A.push(x[0],x[1],x[2],x[3])}g.length>0&&t.push(new vn(r+".quaternion",new Float32Array(g),new Float32Array(A)))}let l=e+".xformOp:rotateXYZ",c=this.specsByPath[l];if(c?.fields?.timeSamples){let{times:_,values:m}=c.fields.timeSamples,g=[],A=[],M=new un,x=new be;for(let T=0;T<_.length;T++){g.push(_[T]/this.fps);let b=m[T];M.set(b[0]*Math.PI/180,b[1]*Math.PI/180,b[2]*Math.PI/180,"ZYX"),x.setFromEuler(M),A.push(x.x,x.y,x.z,x.w)}g.length>0&&t.push(new vn(r+".quaternion",new Float32Array(g),new Float32Array(A)))}let u=e+".xformOp:translate",h=this.specsByPath[u];if(h?.fields?.timeSamples){let{times:_,values:m}=h.fields.timeSamples,g=[],A=[];for(let M=0;M<_.length;M++){g.push(_[M]/this.fps);let x=m[M];A.push(x[0],x[1],x[2])}g.length>0&&t.push(new fn(r+".position",new Float32Array(g),new Float32Array(A)))}let f=e+".xformOp:scale",d=this.specsByPath[f];if(d?.fields?.timeSamples){let{times:_,values:m}=d.fields.timeSamples,g=[],A=[];for(let M=0;M<_.length;M++){g.push(_[M]/this.fps);let x=m[M];A.push(x[0],x[1],x[2])}g.length>0&&t.push(new fn(r+".scale",new Float32Array(g),new Float32Array(A)))}let p=n.fields?.properties||[];for(let _ of p){if(!_.startsWith("xformOp:transform"))continue;let m=e+"."+_,g=this.specsByPath[m];if(!g?.fields?.timeSamples)continue;let{times:A,values:M}=g.fields.timeSamples,x=[],T=[],b=[],C=[],y=[],w=[],R=new Gt,P=new L,I=new be,V=new L;for(let W=0;W<A.length;W++){let N=M[W];if(!N||N.length<16)continue;let G=A[W]/this.fps;R.set(N[0],N[4],N[8],N[12],N[1],N[5],N[9],N[13],N[2],N[6],N[10],N[14],N[3],N[7],N[11],N[15]),R.decompose(P,I,V),x.push(G),T.push(P.x,P.y,P.z),b.push(G),C.push(I.x,I.y,I.z,I.w),y.push(G),w.push(V.x,V.y,V.z)}x.length>0&&(t.push(new fn(r+".position",new Float32Array(x),new Float32Array(T))),t.push(new vn(r+".quaternion",new Float32Array(b),new Float32Array(C))),t.push(new fn(r+".scale",new Float32Array(y),new Float32Array(w))));break}}return t}_buildAnimationClip(t){let n=this._getAttributes(t).joints;if(!n||n.length===0)return null;let i=[],r=this._getTimeSampledAttribute(t,"rotations");if(r&&r.times&&r.values){let{times:c,values:u}=r;for(let h=0;h<n.length;h++){let f=n[h].split("/").pop(),d=[],p=[];for(let _=0;_<c.length;_++){let m=u[_];if(!m||m.length<(h+1)*4)continue;d.push(c[_]/this.fps);let g=m[h*4+0],A=m[h*4+1],M=m[h*4+2],x=m[h*4+3];p.push(g,A,M,x)}d.length>0&&i.push(new vn(f+".quaternion",new Float32Array(d),new Float32Array(p)))}}let a=this._getTimeSampledAttribute(t,"translations");if(a&&a.times&&a.values){let{times:c,values:u}=a;for(let h=0;h<n.length;h++){let f=n[h].split("/").pop(),d=[],p=[];for(let _=0;_<c.length;_++){let m=u[_];!m||m.length<(h+1)*3||(d.push(c[_]/this.fps),p.push(m[h*3+0],m[h*3+1],m[h*3+2]))}d.length>0&&i.push(new fn(f+".position",new Float32Array(d),new Float32Array(p)))}}let o=this._getTimeSampledAttribute(t,"scales");if(o&&o.times&&o.values){let{times:c,values:u}=o;for(let h=0;h<n.length;h++){let f=n[h].split("/").pop(),d=[],p=[];for(let _=0;_<c.length;_++){let m=u[_];!m||m.length<(h+1)*3||(d.push(c[_]/this.fps),p.push(m[h*3+0],m[h*3+1],m[h*3+2]))}d.length>0&&i.push(new fn(f+".scale",new Float32Array(d),new Float32Array(p)))}}if(i.length===0)return null;let l=t.split("/").pop();return new hi(l,-1,i)}_getTimeSampledAttribute(t,e){let n=t+"."+e,i=this.specsByPath[n];if(i&&i.fields.timeSamples){let r=i.fields.timeSamples;if(r.times&&r.values)return r}return null}_flattenMatrixArray(t,e){if(!t||t.length===0)return null;if(typeof t[0]=="number")return t;let n=[];for(let i=0;i<e;i++)for(let r=0;r<4;r++){let a=t[i*4+r];a&&a.length===4?n.push(a[0],a[1],a[2],a[3]):n.push(r===0?1:0,r===1?1:0,r===2?1:0,r===3?1:0)}return n}};var No=class extends Bi{constructor(t){super(t)}load(t,e,n,i){let r=this,a=r.path===""?zi.extractUrlBase(t):r.path,o=new cr(r.manager);o.setPath(r.path),o.setResponseType("arraybuffer"),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(t,function(l){try{r.parse(l,a,e,i)}catch(c){i?i(c):console.error(c),r.manager.itemError(t)}},n,i)}parse(t,e="",n,i){let r=new Lo,a=new Uo,o=new TextDecoder;function l(M){return M instanceof ArrayBuffer?M:M.byteOffset===0&&M.byteLength===M.buffer.byteLength?M.buffer:M.buffer.slice(M.byteOffset,M.byteOffset+M.byteLength)}function c(M){let x=M.lastIndexOf(".");return x<0||M.lastIndexOf("/")>x?"":M.slice(x+1).toLowerCase()}function u(M){let x={};for(let T in M){let b=M[T],C=c(T);if(C==="png"||C==="jpg"||C==="jpeg"||C==="avif"){x[T]=b;continue}C!=="usd"&&C!=="usda"&&C!=="usdc"||(h(b)?x[T]=a.parseData(l(b)):x[T]=r.parseData(o.decode(b)))}return x}function h(M){let x=new Uint8Array([80,88,82,45,85,83,68,67]),T=M instanceof Uint8Array?M:new Uint8Array(M);if(T.byteLength<x.length)return!1;for(let b=0;b<x.length;b++)if(T[b]!==x[b])return!1;return!0}function f(M){let x=Object.keys(M);if(x.length<1)return{file:void 0,filename:"",basePath:""};let T=x[0],b=c(T),C=!1,y=T.lastIndexOf("/"),w=y>=0?T.slice(0,y):"";if(b==="usda")return{file:M[T],filename:T,basePath:w};if(b==="usdc")C=!0;else if(b==="usd")if(h(M[T]))C=!0;else return{file:M[T],filename:T,basePath:w};return C?{file:M[T],filename:T,basePath:w}:{file:void 0,filename:"",basePath:""}}let d=this,p=(M,x)=>(n&&Promise.all(M.texturePromises).then(()=>n(x)).catch(T=>i?i(T):console.error(T)),x);if(typeof t=="string"){let M=new Xi(d.manager),x=r.parseData(t);return p(M,M.compose(x,{},{},e))}if(h(t)){let M=new Xi(d.manager),x=a.parseData(l(t));return p(M,M.compose(x,{},{},e))}let _=new Uint8Array(t);if(_[0]===80&&_[1]===75){let M=Ku(_),x=u(M),{file:T,filename:b,basePath:C}=f(M);if(!T)throw new Error("THREE.USDLoader: Invalid USDZ package. The first ZIP entry must be a USD layer (.usd/.usda/.usdc).");let y=new Xi(d.manager),w=x[b];if(!w)throw new Error('THREE.USDLoader: Failed to parse root layer "'+b+'".');return p(y,y.compose(w,x,{},C))}let m=new Xi(d.manager),g=o.decode(_),A=r.parseData(g);return p(m,m.compose(A,{},{},e))}};var Ac=new URLSearchParams(window.location.search),rx=Ac.get("model")||"Beating-heart",ax=Ac.get("preset")||"beatingHeart",wc=Ac.get("autoRotate")==="1",Ec=document.getElementById("c"),Sc=document.getElementById("status"),Qu=document.getElementById("hint");Qu&&wc&&(Qu.textContent="Rotates slowly \xB7 Pinch & drag to explore");var Mi=new Eo({canvas:Ec,antialias:!1,alpha:!1,powerPreference:"high-performance"});Mi.setClearColor(0,1);Mi.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));Mi.outputColorSpace=$t;Mi.toneMapping=vr;Mi.toneMappingExposure=1.05;var qi=new Xs;qi.background=new Nt(0);var He=new Se(55,1,.01,100);He.position.set(0,0,3);var me=new Io(He,Ec);me.enableDamping=!0;me.dampingFactor=.12;me.enablePan=!1;me.target.set(0,0,0);me.minDistance=.4;me.maxDistance=18;me.autoRotate=wc;me.autoRotateSpeed=1.85;var Ur=!0,bc,Fo=()=>{Ur=!0};me.addEventListener("change",Fo);me.addEventListener("start",()=>{me.autoRotate=!1,Fo(),bc&&window.clearTimeout(bc)});me.addEventListener("end",()=>{Fo(),wc&&(bc=window.setTimeout(()=>{me.autoRotate=!0,Fo()},2200))});var Lr=null,sn=null,Cc=!1,tf=new gr;function nf(){let s=Math.max(1,window.innerWidth),t=Math.max(1,window.innerHeight);Mi.setSize(s,t,!0),He.aspect=s/t,He.updateProjectionMatrix(),Ur=!0}window.addEventListener("resize",nf);nf();Ec.addEventListener("dblclick",()=>{if(sn){let s=sn.userData.fill||1.22,t=sn.userData.fieldOfView||He.fov;Pc(sn,t,s)}else me.reset()});var ef=!1;function ox(s,t,e){if(ef)return;ef=!0;let n=new Yn(e?16775152:16777215,e?1.35:2);n.position.set(3.2,4.5,3.8),qi.add(n);let i=new Yn(16777215,e?.55:.35);i.position.set(-2.4,1.8,2.2),qi.add(i);let r=new pr(16777215,e?.55:.8);qi.add(r);let a=new Yn(s,t);a.position.set(-1.6,.4,-2.4),qi.add(a)}function sf(s){return s.updateWorldMatrix(!0,!0),new je().setFromObject(s)}function Rc(s){s.updateWorldMatrix(!0,!0);let t=new je,e=!1;return s.traverse(n=>{let i=n;if(!i.isMesh||!i.geometry)return;i.isSkinnedMesh&&i.skeleton&&(i.skeleton.update(),i.updateMatrixWorld(!0));let r=new je().setFromObject(i);r.isEmpty()||(t.union(r),e=!0)}),e?t:sf(s)}function Tc(s){let t=Rc(s).getCenter(new L);if(!Number.isFinite(t.x))return;let e=s.parent;if(!e){s.position.sub(t),s.updateWorldMatrix(!0,!0);return}s.position.sub(e.worldToLocal(t.clone())),s.updateWorldMatrix(!0,!0)}function lx(s){let t=2.15,e=50,n=1.26,i=65535,r=.9,a=!1;switch(s){case"brain":t=2.2,e=50,n=1.35;break;case"anatomy":t=2.2,n=1.22,i=16765373,r=.35,a=!0;break;case"lung":t=2.25,n=1.4;break;case"stomach":t=2.1,e=48,n=1.2;break;case"skeleton":t=2.35,n=1.3;break;case"ecorche":t=2.35,n=1.3,i=16765373,r=.35,a=!0;break;case"beatingHeart":t=1.45,e=52,n=1.75,i=16711680,r=1,Cc=!0;break;case"heartLungs":t=2.3,e=52,n=1.32,i=16777215;break;case"heartBronchial":t=2.25,n=1.28,i=16777215;break;default:break}return{targetSize:t,fieldOfView:e,fill:n,accent:i,accentIntensity:r,naturalColor:a}}function cx(s){let t=[];s.traverse(e=>{e.isCamera&&t.push(e)}),t.forEach(e=>e.parent?.remove(e))}function hx(s){s.traverse(t=>{t.frustumCulled=!0;let e=t;if(e.isPoints&&e.geometry){let r=e.geometry.getAttribute("position"),a=r?.count??0;if(a>4e4&&r){let l=a>12e4?3:2,c=Math.floor(a/l),u=r.array,h=new Float32Array(c*3);for(let f=0,d=0;f<c;f++,d+=l){let p=d*3;h[f*3]=u[p],h[f*3+1]=u[p+1],h[f*3+2]=u[p+2]}e.geometry.setAttribute("position",new te(h,3)),e.geometry.computeBoundingSphere()}(Array.isArray(e.material)?e.material:[e.material]).forEach(l=>{let c=l;c.isPointsMaterial&&(c.size=Math.min(c.size||.02,.035),c.sizeAttenuation=!0,c.transparent=!1,c.depthWrite=!0,c.needsUpdate=!0)});return}let n=t;if(!n.isMesh||!n.material)return;(Array.isArray(n.material)?n.material:[n.material]).forEach(r=>{r.precision="mediump","envMap"in r&&(r.envMap=null),"flatShading"in r&&(r.flatShading=!1),r.needsUpdate=!0})})}function Pc(s,t,e){let n=Rc(s),i=n.getSize(new L),r=n.getCenter(new L);if(!Number.isFinite(r.x)||!Number.isFinite(r.y)||!Number.isFinite(r.z))return;let a=Math.max(i.y,.01),o=Math.max(i.x,.01),l=Math.max(o,a,i.z*.35,.8),c=t*Math.PI/180,u=Math.max(He.aspect,.2),h=a/2/Math.tan(c/2),f=2*Math.atan(Math.tan(c/2)*u),d=o/2/Math.tan(f/2),p=Math.max(h,d)*e,_=e>=1.6?Math.max(l*1.25,1.9):l*.4,m=Math.max(p,_);He.fov=t,He.near=Math.max(.05,m/80),He.far=Math.max(100,m*20),He.up.set(0,1,0),He.position.set(r.x,r.y,r.z+m),He.lookAt(r.x,r.y,r.z),He.updateProjectionMatrix(),me.target.set(r.x,r.y,r.z),me.minDistance=m*.55,me.maxDistance=m*5,me.update(),me.saveState(),Ur=!0}function ux(s){let t=Math.max(s.r,s.g,s.b),e=Math.min(s.r,s.g,s.b);return(t>.001?(t-e)/t:0)<.18&&t>.4}function fx(s){if(s.isMeshStandardMaterial)return s;let t=s;return new vs({color:t.color?.clone?.()??new Nt(16777215),map:t.map??null,roughness:.52,metalness:.08,side:tn})}function dx(s,t){let e=new Nt("#C45A48"),n=new Nt("#F3EEE8");s.updateWorldMatrix(!0,!0),s.traverse(i=>{let r=i;if(!r.isMesh||!r.material||!r.geometry)return;let a=Array.isArray(r.material)?r.material:[r.material],o=sf(r),l=o.min.x,c=o.max.x,u=(l+c)/2,h=t&&l<-.02&&c>.02&&c-l>.08;t&&h&&px(r,s,e,n);let f=a.map(d=>{let p=fx(d);if(t&&h)p.vertexColors=!0,p.color.set("#ffffff");else if(t)p.vertexColors=!1,p.color.copy(u>=0?n:e),p.metalness=u>=0?.12:.08,p.roughness=u>=0?.42:.52;else{let _=!!r.geometry.getAttribute("color");_&&(p.vertexColors=!0),!p.map&&!_&&ux(p.color)&&p.color.copy(e)}return p.side=tn,p.needsUpdate=!0,p});r.material=f.length===1?f[0]:f})}function px(s,t,e,n){let i=s.geometry.clone(),r=i.getAttribute("position");if(!r)return;s.geometry=i;let a=new Float32Array(r.count*3),o=new L,l=new Nt;for(let c=0;c<r.count;c++){o.fromBufferAttribute(r,c),s.localToWorld(o),t.worldToLocal(o);let u=Math.min(1,Math.max(0,(o.x+.015)/.03));l.copy(e).lerp(n,u),a[c*3]=l.r,a[c*3+1]=l.g,a[c*3+2]=l.b}i.setAttribute("color",new te(a,3))}function mx(s,t){let e=lx(t),n=new cn;qi.add(n),n.add(s),Tc(s);let i=Rc(s).getSize(new L),r=Math.max(i.x,i.y,i.z)||1,a=Math.min(Math.max(e.targetSize/r,.02),25);n.scale.setScalar(a),n.userData.baseScale=a,n.userData.fill=e.fill,n.userData.fieldOfView=e.fieldOfView,Tc(s),e.naturalColor&&(dx(s,t==="anatomy"),Mi.toneMappingExposure=1.18),ox(e.accent,e.accentIntensity,e.naturalColor),Pc(n,e.fieldOfView,e.fill),sn=n}async function gx(){Sc.textContent="Loading 3D model\u2026";let s=new No,t=`./models/${encodeURIComponent(rx)}.usdz`;try{let e=await s.loadAsync(t),n=e?.scene??e;if(!n)throw new Error("Empty model");cx(n),hx(n),mx(n,ax);let i=e?.animations??[];i.length>0&&(Lr=new mr(n),i.forEach(a=>Lr.clipAction(a).play()),Cc=!1);let r=()=>{if(!sn)return;Lr?.update(0);let a=sn.children[0];a&&Tc(a);let o=sn.userData.fill||1.22,l=sn.userData.fieldOfView||He.fov;Pc(sn,l,o)};requestAnimationFrame(r),window.setTimeout(r,350),window.setTimeout(r,900),Sc.style.display="none"}catch(e){console.error(e),Sc.textContent="Couldn\u2019t load 3D model"}}function rf(){requestAnimationFrame(rf);let s=tf.getDelta(),t=!1;if(Lr&&(Lr.update(s),t=!0),Cc&&sn){let i=(sn.userData.baseScale||1)*(1+Math.sin(tf.elapsedTime*6.8)*.035);sn.scale.setScalar(i),t=!0}let e=me.update();(t||e||me.autoRotate||Ur)&&(Mi.render(qi,He),Ur=!!(e||me.autoRotate||t))}gx();rf();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/examples/jsm/libs/fflate.module.js:
  (*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.8.2
  *)
*/
