(()=>{"use strict";(()=>{const t={modes:["net"],mode:"net",wsPort:8088,logger:".log",networkDebug:!1,vibrate:10};function e(t,e,n){const r=e.querySelector(".name-form-cont"),o=t.sessionStorage.getItem("username");if(o)return r.replaceChildren(),void n(o);const i=e.querySelector("#nameform").content.cloneNode(!0).firstElementChild;r.replaceChildren(i);const s=e.querySelector(".nameform"),a=e.querySelector(".nameinput");a.focus(),s.addEventListener("submit",(function(e){var o;e.preventDefault(),o=a.value,t.sessionStorage.setItem("username",o),n(o),r.replaceChildren()}))}function n(t){}async function r(t,e,n){const r=t.querySelector(".chat-window"),o=t.querySelector("#message-template").content.cloneNode(!0).firstElementChild;o.classList.add(n),o.querySelector(".msg").innerText=e.text,o.querySelector(".username").innerText=e.username,o.querySelector("minidenticon-svg").setAttribute("username",e.username);const i=new Date(e.date);o.querySelector(".timestamp").innerText=i.toLocaleTimeString(),r.appendChild(o),r.scrollTop=r.scrollHeight}function o(t,e){if(t&&window.navigator.vibrate){Date.now()-e>1e3*t&&window.navigator.vibrate([200])}}function i(t,i,s){const a=i.querySelector(".chat-input"),u=i.querySelector(".chat-input input");let c=Date.now(),l="",h=!1;function g(){c=Date.now()}!function(t,e){const n=()=>{""==t.value?t.classList.remove("good"):t.classList.add("good"),"function"==typeof e&&e()};t.addEventListener("keyup",n),t.addEventListener("change",n)}(u,g),function(t,e,n){function r(){const r=e.querySelector(".chat-window");if(r.scrollTop=r.scrollHeight,t.visualViewport){const n=Math.floor(t.visualViewport.height)+"px";e.documentElement.style.setProperty("--window-inner-height",n)}t.scrollTo({top:0,behavior:"smooth"}),"function"==typeof n&&n()}t.onresize=r,t.visualViewport&&t.visualViewport.addEventListener("resize",r)}(t,i,g);const f={message:n};function d(){h&&l&&a.classList.remove("hidden")}const m=t=>{l=t,g(),d(),u.focus()};e(t,i,m),a.addEventListener("submit",(n=>{n.preventDefault(),g(),u.focus({preventScroll:!0}),""!==l?""!==u.value&&(!function(t){const e={text:t,date:Date.now(),username:l};f.message(e),r(i,e,"msg-self")}(u.value),u.value="",u.classList.remove("good")):e(t,i,m)}));return{on:function(t,e){f[t]=e},onConnect:()=>{h=!0,d()},actionKeys:()=>Object.keys(f),onMessage:function(t){return r(i,t,"msg-remote"),o(s.vibrate,c),!0}}}function s(t,e,n){n&&(n.innerHTML+="object"==typeof e?(JSON&&JSON.stringify?JSON.stringify(e):e)+"<br />":e+"<br />")}function a(t){switch(t.toLowerCase().trim()){case"true":case"yes":case"1":return!0;case"false":case"no":case"0":case null:return!1;default:return Boolean(t)}}const u=function(t){return{message:e=>t.onMessage(e)}};function c(t){this.mode=h.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,n=this.data.length;e<n;e++){var r=[],o=this.data.charCodeAt(e);o>65536?(r[0]=240|(1835008&o)>>>18,r[1]=128|(258048&o)>>>12,r[2]=128|(4032&o)>>>6,r[3]=128|63&o):o>2048?(r[0]=224|(61440&o)>>>12,r[1]=128|(4032&o)>>>6,r[2]=128|63&o):o>128?(r[0]=192|(1984&o)>>>6,r[1]=128|63&o):r[0]=o,this.parsedData.push(r)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function l(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}c.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,n=this.parsedData.length;e<n;e++)t.put(this.parsedData[e],8)}},l.prototype={addData:function(t){var e=new c(t);this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++){this.modules[n]=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++)this.modules[n][r]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=l.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var n=-1;n<=7;n++)if(!(t+n<=-1||this.moduleCount<=t+n))for(var r=-1;r<=7;r++)e+r<=-1||this.moduleCount<=e+r||(this.modules[t+n][e+r]=0<=n&&n<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==n||6==n)||2<=n&&n<=4&&2<=r&&r<=4)},getBestMaskPattern:function(){for(var t=0,e=0,n=0;n<8;n++){this.makeImpl(!0,n);var r=L.getLostPoint(this);(0==n||t>r)&&(t=r,e=n)}return e},createMovieClip:function(t,e,n){var r=t.createEmptyMovieClip(e,n);this.make();for(var o=0;o<this.modules.length;o++)for(var i=1*o,s=0;s<this.modules[o].length;s++){var a=1*s;this.modules[o][s]&&(r.beginFill(0,100),r.moveTo(a,i),r.lineTo(a+1,i),r.lineTo(a+1,i+1),r.lineTo(a,i+1),r.endFill())}return r},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=L.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var n=0;n<t.length;n++){var r=t[e],o=t[n];if(null==this.modules[r][o])for(var i=-2;i<=2;i++)for(var s=-2;s<=2;s++)this.modules[r+i][o+s]=-2==i||2==i||-2==s||2==s||0==i&&0==s}},setupTypeNumber:function(t){for(var e=L.getBCHTypeNumber(this.typeNumber),n=0;n<18;n++){var r=!t&&1==(e>>n&1);this.modules[Math.floor(n/3)][n%3+this.moduleCount-8-3]=r}for(n=0;n<18;n++){r=!t&&1==(e>>n&1);this.modules[n%3+this.moduleCount-8-3][Math.floor(n/3)]=r}},setupTypeInfo:function(t,e){for(var n=this.errorCorrectLevel<<3|e,r=L.getBCHTypeInfo(n),o=0;o<15;o++){var i=!t&&1==(r>>o&1);o<6?this.modules[o][8]=i:o<8?this.modules[o+1][8]=i:this.modules[this.moduleCount-15+o][8]=i}for(o=0;o<15;o++){i=!t&&1==(r>>o&1);o<8?this.modules[8][this.moduleCount-o-1]=i:o<9?this.modules[8][15-o-1+1]=i:this.modules[8][15-o-1]=i}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var n=-1,r=this.moduleCount-1,o=7,i=0,s=this.moduleCount-1;s>0;s-=2)for(6==s&&s--;;){for(var a=0;a<2;a++)if(null==this.modules[r][s-a]){var u=!1;i<t.length&&(u=1==(t[i]>>>o&1)),L.getMask(e,r,s-a)&&(u=!u),this.modules[r][s-a]=u,-1==--o&&(i++,o=7)}if((r+=n)<0||this.moduleCount<=r){r-=n,n=-n;break}}}},l.PAD0=236,l.PAD1=17,l.createData=function(t,e,n){for(var r=B.getRSBlocks(t,e),o=new k,i=0;i<n.length;i++){var s=n[i];o.put(s.mode,4),o.put(s.getLength(),L.getLengthInBits(s.mode,t)),s.write(o)}var a=0;for(i=0;i<r.length;i++)a+=r[i].dataCount;if(o.getLengthInBits()>8*a)throw new Error("code length overflow. ("+o.getLengthInBits()+">"+8*a+")");for(o.getLengthInBits()+4<=8*a&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*a||(o.put(l.PAD0,8),o.getLengthInBits()>=8*a));)o.put(l.PAD1,8);return l.createBytes(o,r)},l.createBytes=function(t,e){for(var n=0,r=0,o=0,i=new Array(e.length),s=new Array(e.length),a=0;a<e.length;a++){var u=e[a].dataCount,c=e[a].totalCount-u;r=Math.max(r,u),o=Math.max(o,c),i[a]=new Array(u);for(var l=0;l<i[a].length;l++)i[a][l]=255&t.buffer[l+n];n+=u;var h=L.getErrorCorrectPolynomial(c),g=new D(i[a],h.getLength()-1).mod(h);s[a]=new Array(h.getLength()-1);for(l=0;l<s[a].length;l++){var f=l+g.getLength()-s[a].length;s[a][l]=f>=0?g.get(f):0}}var d=0;for(l=0;l<e.length;l++)d+=e[l].totalCount;var m=new Array(d),p=0;for(l=0;l<r;l++)for(a=0;a<e.length;a++)l<i[a].length&&(m[p++]=i[a][l]);for(l=0;l<o;l++)for(a=0;a<e.length;a++)l<s[a].length&&(m[p++]=s[a][l]);return m};for(var h={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},g={L:1,M:0,Q:3,H:2},f=0,d=1,m=2,p=3,v=4,w=5,y=6,E=7,L={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;L.getBCHDigit(e)-L.getBCHDigit(L.G15)>=0;)e^=L.G15<<L.getBCHDigit(e)-L.getBCHDigit(L.G15);return(t<<10|e)^L.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;L.getBCHDigit(e)-L.getBCHDigit(L.G18)>=0;)e^=L.G18<<L.getBCHDigit(e)-L.getBCHDigit(L.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return L.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,n){switch(t){case f:return(e+n)%2==0;case d:return e%2==0;case m:return n%3==0;case p:return(e+n)%3==0;case v:return(Math.floor(e/2)+Math.floor(n/3))%2==0;case w:return e*n%2+e*n%3==0;case y:return(e*n%2+e*n%3)%2==0;case E:return(e*n%3+(e+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new D([1],0),n=0;n<t;n++)e=e.multiply(new D([1,C.gexp(n)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case h.MODE_NUMBER:return 10;case h.MODE_ALPHA_NUM:return 9;case h.MODE_8BIT_BYTE:case h.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case h.MODE_NUMBER:return 12;case h.MODE_ALPHA_NUM:return 11;case h.MODE_8BIT_BYTE:return 16;case h.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case h.MODE_NUMBER:return 14;case h.MODE_ALPHA_NUM:return 13;case h.MODE_8BIT_BYTE:return 16;case h.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),n=0,r=0;r<e;r++)for(var o=0;o<e;o++){for(var i=0,s=t.isDark(r,o),a=-1;a<=1;a++)if(!(r+a<0||e<=r+a))for(var u=-1;u<=1;u++)o+u<0||e<=o+u||0==a&&0==u||s==t.isDark(r+a,o+u)&&i++;i>5&&(n+=3+i-5)}for(r=0;r<e-1;r++)for(o=0;o<e-1;o++){var c=0;t.isDark(r,o)&&c++,t.isDark(r+1,o)&&c++,t.isDark(r,o+1)&&c++,t.isDark(r+1,o+1)&&c++,0!=c&&4!=c||(n+=3)}for(r=0;r<e;r++)for(o=0;o<e-6;o++)t.isDark(r,o)&&!t.isDark(r,o+1)&&t.isDark(r,o+2)&&t.isDark(r,o+3)&&t.isDark(r,o+4)&&!t.isDark(r,o+5)&&t.isDark(r,o+6)&&(n+=40);for(o=0;o<e;o++)for(r=0;r<e-6;r++)t.isDark(r,o)&&!t.isDark(r+1,o)&&t.isDark(r+2,o)&&t.isDark(r+3,o)&&t.isDark(r+4,o)&&!t.isDark(r+5,o)&&t.isDark(r+6,o)&&(n+=40);var l=0;for(o=0;o<e;o++)for(r=0;r<e;r++)t.isDark(r,o)&&l++;return n+=10*(Math.abs(100*l/e/e-50)/5)}},C={glog:function(t){if(t<1)throw new Error("glog("+t+")");return C.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return C.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},b=0;b<8;b++)C.EXP_TABLE[b]=1<<b;for(b=8;b<256;b++)C.EXP_TABLE[b]=C.EXP_TABLE[b-4]^C.EXP_TABLE[b-5]^C.EXP_TABLE[b-6]^C.EXP_TABLE[b-8];for(b=0;b<255;b++)C.LOG_TABLE[C.EXP_TABLE[b]]=b;function D(t,e){if(null==t.length)throw new Error(t.length+"/"+e);for(var n=0;n<t.length&&0==t[n];)n++;this.num=new Array(t.length-n+e);for(var r=0;r<t.length-n;r++)this.num[r]=t[r+n]}function B(t,e){this.totalCount=t,this.dataCount=e}function k(){this.buffer=[],this.length=0}D.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),n=0;n<this.getLength();n++)for(var r=0;r<t.getLength();r++)e[n+r]^=C.gexp(C.glog(this.get(n))+C.glog(t.get(r)));return new D(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=C.glog(this.get(0))-C.glog(t.get(0)),n=new Array(this.getLength()),r=0;r<this.getLength();r++)n[r]=this.get(r);for(r=0;r<t.getLength();r++)n[r]^=C.gexp(C.glog(t.get(r))+e);return new D(n,0).mod(t)}},B.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],B.getRSBlocks=function(t,e){var n=B.getRsBlockTable(t,e);if(null==n)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var r=n.length/3,o=[],i=0;i<r;i++)for(var s=n[3*i+0],a=n[3*i+1],u=n[3*i+2],c=0;c<s;c++)o.push(new B(a,u));return o},B.getRsBlockTable=function(t,e){switch(e){case g.L:return B.RS_BLOCK_TABLE[4*(t-1)+0];case g.M:return B.RS_BLOCK_TABLE[4*(t-1)+1];case g.Q:return B.RS_BLOCK_TABLE[4*(t-1)+2];case g.H:return B.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},k.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var n=0;n<e;n++)this.putBit(1==(t>>>e-n-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var A=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function T(t){if(this.options={padding:4,width:256,height:256,typeNumber:4,color:"#000000",background:"#ffffff",ecl:"M"},"string"==typeof t&&(t={content:t}),t)for(var e in t)this.options[e]=t[e];if("string"!=typeof this.options.content)throw new Error("Expected 'content' as string!");if(0===this.options.content.length)throw new Error("Expected 'content' to be non-empty!");if(!(this.options.padding>=0))throw new Error("Expected 'padding' value to be non-negative!");if(!(this.options.width>0&&this.options.height>0))throw new Error("Expected 'width' or 'height' value to be higher than zero!");var n=this.options.content,r=function(t,e){for(var n=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),r=1,o=0,i=0,s=A.length;i<=s;i++){var a=A[i];if(!a)throw new Error("Content too long: expected "+o+" but got "+n);switch(e){case"L":o=a[0];break;case"M":o=a[1];break;case"Q":o=a[2];break;case"H":o=a[3];break;default:throw new Error("Unknwon error correction level: "+e)}if(n<=o)break;r++}if(r>A.length)throw new Error("Content too long");return r}(n,this.options.ecl),o=function(t){switch(t){case"L":return g.L;case"M":return g.M;case"Q":return g.Q;case"H":return g.H;default:throw new Error("Unknwon error correction level: "+t)}}(this.options.ecl);this.qrcode=new l(r,o),this.qrcode.addData(n),this.qrcode.make()}T.prototype.svg=function(t){var e=this.options||{},n=this.qrcode.modules;void 0===t&&(t={container:e.container||"svg"});for(var r=void 0===e.pretty||!!e.pretty,o=r?"  ":"",i=r?"\r\n":"",s=e.width,a=e.height,u=n.length,c=s/(u+2*e.padding),l=a/(u+2*e.padding),h=void 0!==e.join&&!!e.join,g=void 0!==e.swap&&!!e.swap,f=void 0===e.xmlDeclaration||!!e.xmlDeclaration,d=void 0!==e.predefined&&!!e.predefined,m=d?o+'<defs><path id="qrmodule" d="M0 0 h'+l+" v"+c+' H0 z" style="fill:'+e.color+';shape-rendering:crispEdges;" /></defs>'+i:"",p=o+'<rect x="0" y="0" width="'+s+'" height="'+a+'" style="fill:'+e.background+';shape-rendering:crispEdges;"/>'+i,v="",w="",y=0;y<u;y++)for(var E=0;E<u;E++){if(n[E][y]){var L=E*c+e.padding*c,C=y*l+e.padding*l;if(g){var b=L;L=C,C=b}if(h){var D=c+L,B=l+C;L=Number.isInteger(L)?Number(L):L.toFixed(2),C=Number.isInteger(C)?Number(C):C.toFixed(2),D=Number.isInteger(D)?Number(D):D.toFixed(2),w+="M"+L+","+C+" V"+(B=Number.isInteger(B)?Number(B):B.toFixed(2))+" H"+D+" V"+C+" H"+L+" Z "}else v+=d?o+'<use x="'+L.toString()+'" y="'+C.toString()+'" href="#qrmodule" />'+i:o+'<rect x="'+L.toString()+'" y="'+C.toString()+'" width="'+c+'" height="'+l+'" style="fill:'+e.color+';shape-rendering:crispEdges;"/>'+i}}h&&(v=o+'<path x="0" y="0" style="fill:'+e.color+';shape-rendering:crispEdges;" d="'+w+'" />');var k="";switch(t.container){case"svg":f&&(k+='<?xml version="1.0" standalone="yes"?>'+i),k+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="'+s+'" height="'+a+'">'+i,k+=m+p+v,k+="</svg>";break;case"svg-viewbox":f&&(k+='<?xml version="1.0" standalone="yes"?>'+i),k+='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 '+s+" "+a+'">'+i,k+=m+p+v,k+="</svg>";break;case"g":k+='<g width="'+s+'" height="'+a+'">'+i,k+=m+p+v,k+="</g>";break;default:k+=(m+p+v).replace(/^\s+/,"")}return k};const M=function(t,e){const n=new T({content:t,container:"svg-viewbox",join:!0}).svg();var r;return e.innerHTML=n,(r=e).addEventListener("click",(()=>r.classList.toggle("big"))),e};function _(){}const P={createSignalingChannel:function(t,e,n,r,o){const i=new WebSocket(e),s={onmessage:_,send:(e,r,o)=>{const s={from:t,to:o,action:e,data:r};return n.log("Sending ["+t+"] to ["+o+"]: "+JSON.stringify(r)),i.send(JSON.stringify(s))},close:()=>{r.error=_,i.close()}};function a(t){n.log("Websocket message received: "+t);const e=JSON.parse(t);return s.onmessage(e)}return i.onopen=function(){return o(t)},i.onclose=function(e){return n.log("Websocket closed "+e.code+" "+e.reason),r.socket_close(t)},i.onmessage=function(t){if(t.data instanceof Blob){const e=new FileReader;return e.onload=()=>a(e.result),e.readAsText(t.data)}return a(t.data)},i.onerror=function(t){return n.error(t),r.error("ws error")},s}};function S(t){}function N(t,e,n,r){const o={recv:S,open:S,socket_open:S,socket_close:S,close:S,error:S,disconnect:S};return{connect:function(){return new Promise(((i,s)=>{const a=t.wh?t.wh:"https:"===e.protocol?null:"ws://"+e.hostname+":"+t.wsPort;null==a&&s("Can't determine ws address");const u=P.createSignalingChannel(n,a,r,o,(function(){i({sendTo:h,sendAllExceptMe:c,sendAll:l})}));u.onmessage=async function(t){t.from!==n?t.to===n||"all"==t.to?"gamemessage"===t.action&&await o.recv(t.data,t.from):r.log("another user"):r.error("same user")};const c=t=>(r.log(t),u.send("gamemessage",t,"all")),l=c,h=S}))},on:function(t,e){o[t]=e}}}const x={makeId:function(t,e){let n="";const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let o=0;o<t;o++)n+=r.charAt(Math.floor(62*e()));return n}};function I(t,e){const n={method:e};return n[e]=t,n}function O(t,e){return{log:n=>{e.networkDebug&&t&&s(0,t)},error:e=>{var n;t&&s(0,t,n)}}}function H(t,e,n,r){return new Promise(((o,i)=>{const s=(a=6,x.makeId(a,Math.random));var a;const c=n.logger?e.querySelector(n.logger):null,l=O(c,n),h=N(n,t.location,s,l);h.on("error",(t=>{l.error(t,c)}));const g=function(){const t={};let e=0,n=0;function r(){return n-e}return{enqueue:function(e){t[n]=e,n++},dequeue:function(){const n=t[e];return e++,n},peek:function(){return t[e]},length:r,isEmpty:function(){return 0===r()}}}(),f=r(t,e,n),d=u(f);!function(t,e,n){t.on("recv",((t,r)=>{const o=t[t.method],i=e[t.method];"function"==typeof i&&n.enqueue({callback:i,res:o,fName:t.method,id:r})}))}(h,d,g),function(t,e){let n=!1;e.requestAnimationFrame((async function r(){if(!t.isEmpty()&&!n){const{callback:e,res:r,id:o}=t.dequeue();n=!0,await e(r,o),n=!1}e.requestAnimationFrame(r)}))}(g,t),h.connect().then((r=>{const o=function(t,e,n){const r=n.sh||t.location.href,o=new URL(r);return M(o.toString(),e.querySelector(".qrcode"))}(t,e,n);h.on("socket_close",(()=>{var t;(t=o)&&t.remove()}));for(const t of f.actionKeys())f.on(t,(e=>r.sendAll(I(e,t))));f.onConnect()})).catch((t=>{l.error(t,c),i(t)})),o(f)}))}const q=5;function R(t){return t.split("").reduce(((t,e)=>(t^e.charCodeAt(0))*-q),q)>>>2}function G(t="",e=95,n=45,r=R){const o=r(t),i=o%9*40;return[...Array(t?25:0)].reduce(((t,e,n)=>o&1<<n%15?t+`<rect x="${n>14?7-~~(n/5):~~(n/5)}" y="${n%5}" width="1" height="1"/>`:t),`<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(${i} ${e}% ${n}%)">`)+"</svg>"}const K=globalThis.customElements?.define("minidenticon-svg",class t extends HTMLElement{static observedAttributes=["username","saturation","lightness"];static#t={};#e=!1;connectedCallback(){this.#n(),this.#e=!0}attributeChangedCallback(){this.#e&&this.#n()}#n(){const e=t.observedAttributes.map((t=>this.getAttribute(t)||void 0)),n=e.join(",");this.innerHTML=t.#t[n]??=G(...e)}});(async function(e,n){!function(t,e,n){const r=t.location.search,o=new URLSearchParams(r);for(const[t,e]of o)"number"==typeof n[t]?n[t]=parseInt(e,10):"boolean"==typeof n[t]?n[t]=a(e):n[t]=e}(e,0,t),H(e,n,t,i)})(window,document),window.minidenticonSvg=K})()})();