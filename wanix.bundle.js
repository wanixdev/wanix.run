;(function(){'use strict';function aa(a,b){function c(x){x=x.toString(16);return"#"+"0".repeat(6-x.length)+x}function d(x){var v=256*la,E=8*Q,I=Na?Na.canvas:null;I&&I.width===v&&I.height===E||(I?(I.width=v,I.height=E):(I=new OffscreenCanvas(v,E),Na=I.getContext("2d")),ob=Na.createImageData(v,E));const O=ob.data;let N=0,R;E=pb?function(W){R=R||W;O[N+3]=W;O[N+7]=W;N+=8}:function(W){R=R||W;O[N+3]=W;N+=4};I=32-Q;const ha=v*(Q-1)*4;v=4*(la-v*Q);const ea=1020*la;for(let W=0,za=0;2048>W;++W,za+=I,N+=v){const Aa=W%256;W&&!Aa&&(N+=
ha);R=!1;for(let Ha=0;Ha<Q;++Ha,++za,N+=ea){const Ia=x[za];for(let ra=128;0<ra;ra>>=1)E(Ia&ra?255:0);qb&&E(rb&&192<=Aa&&223>=Aa&&Ia&1?255:0)}Kb[W]=R?1:0}Na.putImageData(ob,0,0)}function e(x,v,E,I){if(v&&E){x.style.width="";x.style.height="";I&&(x.style.transform="");var O=x.getBoundingClientRect();I?x.style.transform=(1===v?"":" scaleX("+v+")")+(1===E?"":" scaleY("+E+")"):(0===v%1&&0===E%1?(f.style.imageRendering="crisp-edges",f.style.imageRendering="pixelated",f.style["-ms-interpolation-mode"]="nearest-neighbor"):
(f.style.imageRendering="",f.style["-ms-interpolation-mode"]=""),I=window.devicePixelRatio||1,0!==I%1&&(v/=I,E/=I));1!==v&&(x.style.width=O.width*v+"px");1!==E&&(x.style.height=O.height*E+"px")}}const g=a.container;this.screen_fill_buffer=b;console.assert(g,"options.container must be provided");this.FLAG_BLINKING=1;this.FLAG_FONT_PAGE_B=2;var f=g.getElementsByTagName("canvas")[0],k=f.getContext("2d",{alpha:!1}),l=g.getElementsByTagName("div")[0],m=document.createElement("div"),n,p,q=void 0!==a.scale?
a.scale:1,r=void 0!==a.scale?a.scale:1,A=1,z,u,F,y,H,P,ma,Na,ob,Kb=new Int8Array(2048),Q,la,qb,pb,rb,sb=0,tb=0,cb,Lb=0,db,ub,eb,vb=[],fb=vb,gb=0,wb=!1;this.init=function(){const x=new Uint16Array([32,9786,9787,9829,9830,9827,9824,8226,9688,9675,9689,9794,9792,9834,9835,9788,9658,9668,8597,8252,182,167,9644,8616,8593,8595,8594,8592,8735,8596,9650,9660]),v=new Uint16Array([8962,199,252,233,226,228,224,229,231,234,235,232,239,238,236,196,197,201,230,198,244,246,242,251,249,255,214,220,162,163,165,8359,
402,225,237,243,250,241,209,170,186,191,8976,172,189,188,161,171,187,9617,9618,9619,9474,9508,9569,9570,9558,9557,9571,9553,9559,9565,9564,9563,9488,9492,9524,9516,9500,9472,9532,9566,9567,9562,9556,9577,9574,9568,9552,9580,9575,9576,9572,9573,9561,9560,9554,9555,9579,9578,9496,9484,9608,9604,9612,9616,9600,945,223,915,960,931,963,181,964,934,920,937,948,8734,966,949,8745,8801,177,8805,8804,8992,8993,247,8776,176,8729,183,8730,8319,178,9632,160]);for(var E=0,I;256>E;E++)I=126<E?v[E-127]:32>E?x[E]:
E,vb.push(String.fromCharCode(I));m.classList.add("cursor");m.style.position="absolute";m.style.backgroundColor="#ccc";m.style.width="7px";m.style.display="inline-block";this.set_mode(!1);this.set_size_text(80,25);2===u&&this.set_size_graphical(720,400,720,400);this.set_scale(q,r);this.timer()};this.make_screenshot=function(){const x=new Image;if(1===u||2===u)x.src=f.toDataURL("image/png");else{const v=[9,16],E=document.createElement("canvas");E.width=y*v[0];E.height=H*v[1];const I=E.getContext("2d");
I.imageSmoothingEnabled=!1;I.font=window.getComputedStyle(l).font;I.textBaseline="top";for(let O=0;O<H;O++)for(let N=0;N<y;N++){const R=4*(O*y+N),ha=F[R+0],ea=F[R+3];I.fillStyle=c(F[R+2]);I.fillRect(N*v[0],O*v[1],v[0],v[1]);I.fillStyle=c(ea);I.fillText(fb[ha],N*v[0],O*v[1])}"none"!==m.style.display&&n<H&&p<y&&(I.fillStyle=m.style.backgroundColor,I.fillRect(p*v[0],n*v[1]+parseInt(m.style.marginTop,10),parseInt(m.style.width,10),parseInt(m.style.height,10)));x.src=E.toDataURL("image/png")}return x};
this.put_char=function(x,v,E,I,O,N){v=4*(x*y+v);F[v+0]=E;F[v+1]=I;F[v+2]=O;F[v+3]=N;z[x]=1};this.timer=function(){gb=requestAnimationFrame(()=>this.update_screen())};this.update_screen=function(){wb||(0===u?this.update_text():1===u?this.update_graphical():this.update_graphical_text());this.timer()};this.update_text=function(){for(var x=0;x<H;x++)z[x]&&(this.text_update_row(x),z[x]=0)};this.update_graphical=function(){this.screen_fill_buffer()};this.update_graphical_text=function(){if(P){var x=performance.now();
if(266<x-Lb){cb=!cb;eb&&(z[n]=1);var v=4*y;for(let ha=0,ea=0;ha<H;++ha)if(z[ha])ea+=v;else for(var E=0;E<y;++E,ea+=4)if(F[ea+1]&1){z[ha]=1;ea+=v-4*E;break}Lb=x}x=Na.canvas;v=ma.canvas;E=4*y;const O=y*la,N=Q;let R=0;for(let ha=0,ea=0,W=0;ha<H;++ha,ea+=Q){if(!z[ha]){W+=E;continue}++R;ma.clearRect(0,N,O,Q);let za,Aa,Ha,Ia;for(let ra=0;ra<O;ra+=la,W+=4){const Mb=F[W+0];var I=F[W+1];const Nb=F[W+2],Ob=F[W+3],Pb=I&2?tb:sb;I=(!(I&1)||cb)&&Kb[(Pb<<8)+Mb];Ha!==Nb&&(void 0!==Ha&&(P.fillStyle=c(Ha),P.fillRect(Ia,
ea,ra-Ia,Q)),Ha=Nb,Ia=ra);za!==Ob&&(void 0!==za&&(ma.fillStyle=c(za),ma.fillRect(Aa,0,ra-Aa,Q)),za=Ob,Aa=ra);I&&ma.drawImage(x,Mb*la,Pb*Q,la,Q,ra,N,la,Q)}ma.fillStyle=c(za);ma.fillRect(Aa,0,O-Aa,Q);ma.globalCompositeOperation="destination-in";ma.drawImage(v,0,N,O,Q,0,0,O,Q);ma.globalCompositeOperation="source-over";P.fillStyle=c(Ha);P.fillRect(Ia,ea,O-Ia,Q);P.drawImage(v,0,0,O,Q,0,ea,O,Q)}R&&(cb&&eb&&z[n]&&(P.fillStyle=c(F[4*(n*y+p)+3]),P.fillRect(p*la,n*Q+db,la,ub-db+1)),z.fill(0));R&&k.drawImage(P.canvas,
0,0)}};this.destroy=function(){gb&&(cancelAnimationFrame(gb),gb=0)};this.pause=function(){wb=!0;m.classList.remove("blinking-cursor")};this.continue=function(){wb=!1;m.classList.add("blinking-cursor")};this.set_mode=function(x){u=x?1:a.use_graphical_text?2:0;0===u?(l.style.display="block",f.style.display="none"):(l.style.display="none",f.style.display="block",2===u&&z&&z.fill(1))};this.set_font_bitmap=function(x,v,E,I,O,N){const R=E?16:v?9:8;if(Q!==x||la!==R||qb!==v||pb!==E||rb!==I||N)N=la!==R||Q!==
x,Q=x,la=R,qb=v,pb=E,rb=I,2===u&&(d(O),z.fill(1),N&&this.set_size_graphical_text())};this.set_font_page=function(x,v){if(sb!==x||tb!==v)sb=x,tb=v,z.fill(1)};this.clear_screen=function(){k.fillStyle="#000";k.fillRect(0,0,f.width,f.height)};this.set_size_graphical_text=function(){if(Na){var x=la*y,v=Q*H,E=2*Q;P&&P.canvas.width===x&&P.canvas.height===v&&ma.canvas.height===E||(P?(P.canvas.width=x,P.canvas.height=v,ma.canvas.width=x,ma.canvas.height=E):(P=(new OffscreenCanvas(x,v)).getContext("2d",{alpha:!1}),
ma=(new OffscreenCanvas(x,E)).getContext("2d")),this.set_size_graphical(x,v,x,v),z.fill(1))}};this.set_size_text=function(x,v){if(x!==y||v!==H)if(z=new Int8Array(v),F=new Int32Array(x*v*4),y=x,H=v,0===u){for(;l.childNodes.length>v;)l.removeChild(l.firstChild);for(;l.childNodes.length<v;)l.appendChild(document.createElement("div"));for(x=0;x<v;x++)this.text_update_row(x);e(l,q,r,!0)}else 2===u&&this.set_size_graphical_text()};this.set_size_graphical=function(x,v){f.style.display="block";f.width=x;
f.height=v;k.imageSmoothingEnabled=!1;A=640>=x&&2*x<window.innerWidth*window.devicePixelRatio&&2*v<window.innerHeight*window.devicePixelRatio?2:1;e(f,q*A,r*A,!1)};this.set_charmap=function(x){fb=x||vb};this.set_scale=function(x,v){q=x;r=v;e(l,q,r,!0);e(f,q*A,r*A,!1)};this.update_cursor_scanline=function(x,v,E){if(x!==db||v!==ub||E!==eb)0===u?E?(m.style.display="inline",m.style.height=v-x+"px",m.style.marginTop=x+"px"):m.style.display="none":2===u&&n<H&&(z[n]=1),db=x,ub=v,eb=E};this.update_cursor=
function(x,v){if(x!==n||v!==p)x<H&&(z[x]=1),n<H&&(z[n]=1),n=x,p=v};this.text_update_row=function(x){var v=4*x*y,E;var I=l.childNodes[x];var O=document.createElement("div");for(var N=0;N<y;){var R=document.createElement("span");var ha=F[v+1]&1;var ea=F[v+2];var W=F[v+3];ha&&R.classList.add("blink");R.style.backgroundColor=c(ea);R.style.color=c(W);for(E="";N<y&&(F[v+1]&1)===ha&&F[v+2]===ea&&F[v+3]===W;)if(E+=fb[F[v+0]],N++,v+=4,x===n)if(N===p)break;else if(N===p+1){m.style.backgroundColor=R.style.color;
O.appendChild(m);break}R.textContent=E;O.appendChild(R)}I.parentNode.replaceChild(O,I)};this.update_buffer=function(x){for(const v of x)k.putImageData(v.image_data,v.screen_x-v.buffer_x,v.screen_y-v.buffer_y,v.buffer_x,v.buffer_y,v.buffer_width,v.buffer_height)};this.get_text_screen=function(){for(var x=[],v=0;v<H;v++)x.push(this.get_text_row(v));return x};this.get_text_row=function(x){let v="";for(let E=0;E<y;E++)v+=fb[F[4*(x*y+E)]];return v};this.init()};function ba(a,b,c){this.fs=a;this.bus=c;this.configspace_tagname=[104,111,115,116,57,112];this.configspace_taglen=this.configspace_tagname.length;this.VERSION="9P2000.L";this.msize=this.BLOCKSIZE=8192;this.replybuffer=new Uint8Array(2*this.msize);this.replybuffersize=0;this.fids=[];this.virtio=new h(b,{name:"virtio-9p",pci_id:48,device_id:4169,subsystem_device_id:9,common:{initial_port:43008,queues:[{size_supported:32,notify_offset:0}],features:[0,32,29,28],on_driver_ok:()=>{}},notification:{initial_port:43264,
single_handler:!1,handlers:[d=>{if(0===d){for(;this.virtqueue.has_request();)d=this.virtqueue.pop_request(),this.ReceiveRequest(d);this.virtqueue.notify_me_after(0)}}]},isr_status:{initial_port:42752},device_specific:{initial_port:42496,struct:[{bytes:2,name:"mount tag length",read:()=>this.configspace_taglen,write:()=>{}}].concat(t.range(254).map(d=>({bytes:1,name:"mount tag name "+d,read:()=>this.configspace_tagname[d]||0,write:()=>{}})))}});this.virtqueue=this.virtio.queues[0];this.tagBufchain=
new Map}ba.prototype.get_state=function(){var a=[];a[0]=this.configspace_tagname;a[1]=this.configspace_taglen;a[2]=this.virtio;a[3]=this.VERSION;a[4]=this.BLOCKSIZE;a[5]=this.msize;a[6]=this.replybuffer;a[7]=this.replybuffersize;a[8]=this.fids.map(function(b){return[b.inodeid,b.type,b.uid,b.dbg_name]});a[9]=this.fs;return a};
ba.prototype.set_state=function(a){this.configspace_tagname=a[0];this.configspace_taglen=a[1];this.virtio.set_state(a[2]);this.virtqueue=this.virtio.queues[0];this.VERSION=a[3];this.BLOCKSIZE=a[4];this.msize=a[5];this.replybuffer=a[6];this.replybuffersize=a[7];this.fids=a[8].map(function(b){return{inodeid:b[0],type:b[1],uid:b[2],dbg_name:b[3]}});this.fs.set_state(a[9])};ba.prototype.Createfid=function(a,b,c,d){return{inodeid:a,type:b,uid:c,dbg_name:d}};
ba.prototype.update_dbg_name=function(a,b){for(const c of this.fids)c.inodeid===a&&(c.dbg_name=b)};ba.prototype.reset=function(){this.fids=[];this.virtio.reset()};ba.prototype.BuildReply=function(a,b,c){ca.Marshall(["w","b","h"],[c+7,a+1,b],this.replybuffer,0);c+7>=this.replybuffer.length&&da.Debug("Error in 9p: payloadsize exceeds maximum length");this.replybuffersize=c+7};ba.prototype.SendError=function(a,b,c){b=ca.Marshall(["w"],[c],this.replybuffer,7);this.BuildReply(6,a,b)};
ba.prototype.SendReply=function(a){a.set_next_blob(this.replybuffer.subarray(0,this.replybuffersize));this.virtqueue.push_reply(a);this.virtqueue.flush_replies()};
ba.prototype.ReceiveRequest=async function(a){const b=new Uint8Array(a.length_readable);a.get_next_blob(b);var c=ca.Unmarshall(["w","b","h"],b,{offset:0})[2];this.tagBufchain.set(c,a);window.wanix&&window.wanix.virtioHandle(b,d=>{var e=ca.Unmarshall(["w","b","h"],d,{offset:0})[2];this.replybuffer=new Uint8Array(d.byteLength);this.replybuffer.set(d);this.replybuffersize=d.byteLength;const g=this.tagBufchain.get(e);g?(g.set_next_blob(d),this.virtqueue.push_reply(g),this.virtqueue.flush_replies(),this.tagBufchain.delete(e)):
console.error("No bufchain found for tag: "+e)})};function w(a){this.ports=[];this.cpu=a;for(var b=0;65536>b;b++)this.ports[b]=this.create_empty_entry();var c=a.memory_size[0];for(b=0;b<<17<c;b++)a.memory_map_read8[b]=a.memory_map_write8[b]=void 0,a.memory_map_read32[b]=a.memory_map_write32[b]=void 0;this.mmap_register(c,4294967296-c,function(d){B(d>>>0,8);return 255},function(d,e){B(d>>>0,8);B(e,2)},function(d){B(d>>>0,8);return-1},function(d,e){B(d>>>0,8);B(e>>>0,8)})}
w.prototype.create_empty_entry=function(){return{read8:this.empty_port_read8,read16:this.empty_port_read16,read32:this.empty_port_read32,write8:this.empty_port_write,write16:this.empty_port_write,write32:this.empty_port_write,device:void 0}};w.prototype.empty_port_read8=function(){return 255};w.prototype.empty_port_read16=function(){return 65535};w.prototype.empty_port_read32=function(){return-1};w.prototype.empty_port_write=function(){};
w.prototype.register_read=function(a,b,c,d,e){c&&(this.ports[a].read8=c);d&&(this.ports[a].read16=d);e&&(this.ports[a].read32=e);this.ports[a].device=b};w.prototype.register_write=function(a,b,c,d,e){c&&(this.ports[a].write8=c);d&&(this.ports[a].write16=d);e&&(this.ports[a].write32=e);this.ports[a].device=b};
w.prototype.register_read_consecutive=function(a,b,c,d,e,g){function f(){return c.call(this)|d.call(this)<<8}function k(){return e.call(this)|g.call(this)<<8}function l(){return c.call(this)|d.call(this)<<8|e.call(this)<<16|g.call(this)<<24}e&&g?(this.register_read(a,b,c,f,l),this.register_read(a+1,b,d),this.register_read(a+2,b,e,k),this.register_read(a+3,b,g)):(this.register_read(a,b,c,f),this.register_read(a+1,b,d))};
w.prototype.register_write_consecutive=function(a,b,c,d,e,g){function f(m){c.call(this,m&255);d.call(this,m>>8&255)}function k(m){e.call(this,m&255);g.call(this,m>>8&255)}function l(m){c.call(this,m&255);d.call(this,m>>8&255);e.call(this,m>>16&255);g.call(this,m>>>24)}e&&g?(this.register_write(a,b,c,f,l),this.register_write(a+1,b,d),this.register_write(a+2,b,e,k),this.register_write(a+3,b,g)):(this.register_write(a,b,c,f),this.register_write(a+1,b,d))};
w.prototype.mmap_read32_shim=function(a){var b=this.cpu.memory_map_read8[a>>>17];return b(a)|b(a+1)<<8|b(a+2)<<16|b(a+3)<<24};w.prototype.mmap_write32_shim=function(a,b){var c=this.cpu.memory_map_write8[a>>>17];c(a,b&255);c(a+1,b>>8&255);c(a+2,b>>16&255);c(a+3,b>>>24)};
w.prototype.mmap_register=function(a,b,c,d,e,g){B(a>>>0,8);B(b,8);e||(e=this.mmap_read32_shim.bind(this));g||(g=this.mmap_write32_shim.bind(this));for(a>>>=17;0<b;a++)this.cpu.memory_map_read8[a]=c,this.cpu.memory_map_write8[a]=d,this.cpu.memory_map_read32[a]=e,this.cpu.memory_map_write32[a]=g,b-=131072};w.prototype.port_write8=function(a,b){var c=this.ports[a];c.write8===this.empty_port_write&&(B(a,4),B(b,2),this.get_port_description(a));return c.write8.call(c.device,b)};
w.prototype.port_write16=function(a,b){var c=this.ports[a];c.write16===this.empty_port_write&&(B(a,4),B(b,4),this.get_port_description(a));return c.write16.call(c.device,b)};w.prototype.port_write32=function(a,b){var c=this.ports[a];c.write32===this.empty_port_write&&(B(a,4),B(b>>>0,8),this.get_port_description(a));return c.write32.call(c.device,b)};
w.prototype.port_read8=function(a){var b=this.ports[a];b.read8===this.empty_port_read8&&(B(a,4),this.get_port_description(a));b=b.read8.call(b.device,a);B(a);return b};w.prototype.port_read16=function(a){var b=this.ports[a];b.read16===this.empty_port_read16&&(B(a,4),this.get_port_description(a));b=b.read16.call(b.device,a);B(a);return b};w.prototype.port_read32=function(a){var b=this.ports[a];b.read32===this.empty_port_read32&&(B(a,4),this.get_port_description(a));return b.read32.call(b.device,a)};
var fa={4:"PORT_DMA_ADDR_2",5:"PORT_DMA_CNT_2",10:"PORT_DMA1_MASK_REG",11:"PORT_DMA1_MODE_REG",12:"PORT_DMA1_CLEAR_FF_REG",13:"PORT_DMA1_MASTER_CLEAR",32:"PORT_PIC1_CMD",33:"PORT_PIC1_DATA",64:"PORT_PIT_COUNTER0",65:"PORT_PIT_COUNTER1",66:"PORT_PIT_COUNTER2",67:"PORT_PIT_MODE",96:"PORT_PS2_DATA",97:"PORT_PS2_CTRLB",100:"PORT_PS2_STATUS",112:"PORT_CMOS_INDEX",113:"PORT_CMOS_DATA",128:"PORT_DIAG",129:"PORT_DMA_PAGE_2",146:"PORT_A20",160:"PORT_PIC2_CMD",161:"PORT_PIC2_DATA",178:"PORT_SMI_CMD",179:"PORT_SMI_STATUS",
212:"PORT_DMA2_MASK_REG",214:"PORT_DMA2_MODE_REG",218:"PORT_DMA2_MASTER_CLEAR",240:"PORT_MATH_CLEAR",368:"PORT_ATA2_CMD_BASE",496:"PORT_ATA1_CMD_BASE",632:"PORT_LPT2",744:"PORT_SERIAL4",760:"PORT_SERIAL2",884:"PORT_ATA2_CTRL_BASE",888:"PORT_LPT1",1E3:"PORT_SERIAL3",1008:"PORT_FD_BASE",1010:"PORT_FD_DOR",1012:"PORT_FD_STATUS",1013:"PORT_FD_DATA",1014:"PORT_HD_DATA",1015:"PORT_FD_DIR",1016:"PORT_SERIAL1",3320:"PORT_PCI_CMD",3321:"PORT_PCI_REBOOT",3324:"PORT_PCI_DATA",1026:"PORT_BIOS_DEBUG",1296:"PORT_QEMU_CFG_CTL",
1297:"PORT_QEMU_CFG_DATA",45056:"PORT_ACPI_PM_BASE",45312:"PORT_SMB_BASE",35072:"PORT_BIOS_APM"};w.prototype.get_port_description=function(a){return fa[a]?"  ("+fa[a]+")":""};function C(a,b){this.stopping=this.running=!1;this.idle=!0;this.tick_counter=0;this.worker=null;this.cpu=new D(a,b,()=>{this.idle&&this.next_tick(0)});this.bus=a;this.register_yield()}C.prototype.run=function(){this.stopping=!1;this.running||(this.running=!0,this.bus.send("emulator-started"));this.next_tick(0)};C.prototype.do_tick=function(){if(this.stopping||!this.running)this.stopping=this.running=!1,this.bus.send("emulator-stopped");else{this.idle=!1;var a=this.cpu.main_loop();this.next_tick(a)}};
C.prototype.next_tick=function(a){const b=++this.tick_counter;this.idle=!0;this.yield(a,b)};C.prototype.yield_callback=function(a){a===this.tick_counter&&this.do_tick()};C.prototype.stop=function(){this.running&&(this.stopping=!0)};C.prototype.destroy=function(){this.unregister_yield()};C.prototype.restart=function(){this.cpu.reset_cpu();this.cpu.load_bios()};C.prototype.init=function(a){this.cpu.init(a,this.bus);this.bus.send("emulator-ready")};
if("undefined"!==typeof process)C.prototype.yield=function(a,b){1>a?global.setImmediate(c=>this.yield_callback(c),b):setTimeout(c=>this.yield_callback(c),a,b)},C.prototype.register_yield=function(){},C.prototype.unregister_yield=function(){};else if("undefined"!==typeof Worker){function a(){let b;globalThis.onmessage=function(c){const d=c.data.t;b=b&&clearTimeout(b);1>d?postMessage(c.data.tick):b=setTimeout(()=>postMessage(c.data.tick),d)}}C.prototype.register_yield=function(){const b=URL.createObjectURL(new Blob(["("+
a.toString()+")()"],{type:"text/javascript"}));this.worker=new Worker(b);this.worker.onmessage=c=>this.yield_callback(c.data);URL.revokeObjectURL(b)};C.prototype.yield=function(b,c){this.worker.postMessage({t:b,tick:c})};C.prototype.unregister_yield=function(){this.worker&&this.worker.terminate();this.worker=null}}else C.prototype.yield=function(a){setTimeout(()=>{this.do_tick()},a)},C.prototype.register_yield=function(){},C.prototype.unregister_yield=function(){};C.prototype.save_state=function(){return this.cpu.save_state()};
C.prototype.restore_state=function(a){return this.cpu.restore_state(a)};if("object"===typeof performance&&performance.now)C.microtick=performance.now.bind(performance);else if("function"===typeof require){const {performance:a}=require("perf_hooks");C.microtick=a.now.bind(a)}else C.microtick="object"===typeof process&&process.hrtime?function(){var a=process.hrtime();return 1E3*a[0]+a[1]/1E6}:Date.now;var G=G||{};G.exportSymbol=function(a,b){"undefined"!==typeof module&&"undefined"!==typeof module.exports?module.exports[a]=b:"undefined"!==typeof window?window[a]=b:"function"===typeof importScripts&&(self[a]=b)};G.exportProperty=function(){};var t=t||{};t.pads=function(a,b){return(a||0===a?a+"":"").padEnd(b," ")};t.pad0=function(a,b){return(a||0===a?a+"":"").padStart(b,"0")};t.zeros=function(a){return Array(a).fill(0)};t.range=function(a){return Array.from(Array(a).keys())};
t.view=function(a,b,c,d){return new Proxy({},{get:function(e,g){e=new a(b.buffer,c,d);const f=e[g];if("function"===typeof f)return f.bind(e);/^\d+$/.test(g);return f},set:function(e,g,f){/^\d+$/.test(g);(new a(b.buffer,c,d))[g]=f;return!0}})};function B(a,b){a=a?a.toString(16):"";return"0x"+t.pad0(a.toUpperCase(),b||1)}
if("undefined"!==typeof crypto&&crypto.getRandomValues){const a=new Int32Array(1);t.get_rand_int=function(){crypto.getRandomValues(a);return a[0]}}else if("undefined"!==typeof require){const a=require("crypto");t.get_rand_int=function(){return a.randomBytes(4).readInt32LE(0)}}
(function(){if("function"===typeof Math.clz32)t.int_log2=function(d){return 31-Math.clz32(d)};else{for(var a=new Int8Array(256),b=0,c=-2;256>b;b++)b&b-1||c++,a[b]=c;t.int_log2=function(d){d>>>=0;var e=d>>>16;if(e){var g=e>>>8;return g?24+a[g]:16+a[e]}return(g=d>>>8)?8+a[g]:a[d]}}})();t.round_up_to_next_power_of_2=function(a){return 1>=a?1:1<<1+t.int_log2(a-1)};
function ia(a){var b=new Uint8Array(a),c,d;this.length=0;this.push=function(e){this.length!==a&&this.length++;b[d]=e;d=d+1&a-1};this.shift=function(){if(this.length){var e=b[c];c=c+1&a-1;this.length--;return e}return-1};this.peek=function(){return this.length?b[c]:-1};this.clear=function(){this.length=d=c=0};this.clear()}function ja(a){this.size=a;this.data=new Float32Array(a);this.length=this.end=this.start=0}
ja.prototype.push=function(a){this.length===this.size?this.start=this.start+1&this.size-1:this.length++;this.data[this.end]=a;this.end=this.end+1&this.size-1};ja.prototype.shift=function(){if(this.length){var a=this.data[this.start];this.start=this.start+1&this.size-1;this.length--;return a}};
ja.prototype.shift_block=function(a){var b=new Float32Array(a);a>this.length&&(a=this.length);var c=this.start+a,d=this.data.subarray(this.start,c);b.set(d);c>=this.size&&(c-=this.size,b.set(this.data.subarray(0,c),d.length));this.start=c;this.length-=a;return b};ja.prototype.peek=function(){if(this.length)return this.data[this.start]};ja.prototype.clear=function(){this.length=this.end=this.start=0};
t.Bitmap=function(a){"number"===typeof a?this.view=new Uint8Array(a+7>>3):a instanceof ArrayBuffer&&(this.view=new Uint8Array(a))};t.Bitmap.prototype.set=function(a,b){const c=a>>3;a=1<<(a&7);this.view[c]=b?this.view[c]|a:this.view[c]&~a};t.Bitmap.prototype.get=function(a){return this.view[a>>3]>>(a&7)&1};t.Bitmap.prototype.get_buffer=function(){return this.view.buffer};t.load_file="undefined"===typeof XMLHttpRequest?ka:na;
function na(a,b,c){function d(){const l=c||0;setTimeout(()=>{na(a,b,l+1)},1E3*([1,1,2,3,5,8,13,21][l]||34))}var e=new XMLHttpRequest;e.open(b.method||"get",a,!0);e.responseType=b.as_json?"json":"arraybuffer";if(b.headers)for(var g=Object.keys(b.headers),f=0;f<g.length;f++){var k=g[f];e.setRequestHeader(k,b.headers[k])}b.range&&(g=b.range.start,e.setRequestHeader("Range","bytes="+g+"-"+(g+b.range.length-1)),e.setRequestHeader("X-Accept-Encoding","identity"),e.onreadystatechange=function(){200===e.status&&
(console.error("Server sent full file in response to ranged request, aborting",{filename:a}),e.abort())});e.onload=function(){if(4===e.readyState)if(200!==e.status&&206!==e.status)console.error("Loading the image "+a+" failed (status %d)",e.status),500<=e.status&&600>e.status&&d();else if(e.response){if(b.range){const l=e.getResponseHeader("Content-Encoding");l&&"identity"!==l&&console.error("Server sent Content-Encoding in response to ranged request",{filename:a,enc:l})}b.done&&b.done(e.response,
e)}};e.onerror=function(l){console.error("Loading the image "+a+" failed",l);d()};b.progress&&(e.onprogress=function(l){b.progress(l)});e.send(null)}
function ka(a,b){const c=require("fs");b.range?c.open(a,"r",(d,e)=>{if(d)throw d;d=b.range.length;var g=Buffer.allocUnsafe(d);c.read(e,g,0,d,b.range.start,f=>{if(f)throw f;b.done&&b.done(new Uint8Array(g));c.close(e,k=>{if(k)throw k;})})}):c.readFile(a,{encoding:b.as_json?"utf-8":null},function(d,e){d?console.log("Could not read file:",a,d):(d=e,d=b.as_json?JSON.parse(d):(new Uint8Array(d)).buffer,b.done(d))})}
t.read_sized_string_from_mem=function(a,b,c){return String.fromCharCode(...(new Uint8Array(a.buffer,b>>>0,c>>>0)))};(function(){function a(f){this.buffer=f;this.byteLength=f.byteLength;this.onprogress=this.onload=void 0}function b(f,k,l){this.filename=f;this.byteLength=k;this.block_cache=new Map;this.block_cache_is_write=new Set;this.fixed_chunk_size=l;this.cache_reads=!!l;this.onprogress=this.onload=void 0}function c(f,k,l,m,n){const p=f.match(/\.[^\.]+(\.zst)?$/);this.extension=p?p[0]:"";this.basename=f.substring(0,f.length-this.extension.length);this.is_zstd=this.extension.endsWith(".zst");this.basename.endsWith("/")||
(this.basename+="-");this.block_cache=new Map;this.block_cache_is_write=new Set;this.byteLength=k;this.fixed_chunk_size=l;this.partfile_alt_format=!!m;this.zstd_decompress=n;this.cache_reads=!!l;this.onprogress=this.onload=void 0}function d(f){this.file=f;this.byteLength=f.size;1073741824<f.size&&console.warn("SyncFileBuffer: Allocating buffer of "+(f.size>>20)+" MB ...");this.buffer=new ArrayBuffer(f.size);this.onprogress=this.onload=void 0}function e(f){this.file=f;this.byteLength=f.size;this.block_cache=
new Map;this.block_cache_is_write=new Set;this.onprogress=this.onload=void 0}t.SyncBuffer=a;t.AsyncXHRBuffer=b;t.AsyncXHRPartfileBuffer=c;t.AsyncFileBuffer=e;t.SyncFileBuffer=d;t.buffer_from_object=function(f,k){if(f.buffer instanceof ArrayBuffer)return new t.SyncBuffer(f.buffer);if("undefined"!==typeof File&&f.buffer instanceof File)return k=f.async,void 0===k&&(k=268435456<=f.buffer.size),k?new t.AsyncFileBuffer(f.buffer):new t.SyncFileBuffer(f.buffer);if(f.url)return f.use_parts?new t.AsyncXHRPartfileBuffer(f.url,
f.size,f.fixed_chunk_size,!1,k):new t.AsyncXHRBuffer(f.url,f.size,f.fixed_chunk_size)};a.prototype.load=function(){this.onload&&this.onload({buffer:this.buffer})};a.prototype.get=function(f,k,l){l(new Uint8Array(this.buffer,f,k))};a.prototype.set=function(f,k,l){(new Uint8Array(this.buffer,f,k.byteLength)).set(k);l()};a.prototype.get_buffer=function(f){f(this.buffer)};a.prototype.get_state=function(){const f=[];f[0]=this.byteLength;f[1]=new Uint8Array(this.buffer);return f};a.prototype.set_state=
function(f){this.byteLength=f[0];this.buffer=f[1].slice().buffer};b.prototype.load=function(){void 0!==this.byteLength?this.onload&&this.onload(Object.create(null)):g(this.filename,(f,k)=>{if(f)throw Error("Cannot use: "+this.filename+". "+f);this.byteLength=k;this.onload&&this.onload(Object.create(null))})};b.prototype.get_from_cache=function(f,k){var l=k/256;f/=256;for(var m=0;m<l;m++)if(!this.block_cache.get(f+m))return;if(1===l)return this.block_cache.get(f);k=new Uint8Array(k);for(m=0;m<l;m++)k.set(this.block_cache.get(f+
m),256*m);return k};b.prototype.get=function(f,k,l){var m=this.get_from_cache(f,k);if(m)l(m);else{var n=f,p=k;this.fixed_chunk_size&&(n=f-f%this.fixed_chunk_size,p=Math.ceil((f-n+k)/this.fixed_chunk_size)*this.fixed_chunk_size);t.load_file(this.filename,{done:function(q){q=new Uint8Array(q);this.handle_read(n,p,q);n===f&&p===k?l(q):l(q.subarray(f-n,f-n+k))}.bind(this),range:{start:n,length:p}})}};b.prototype.set=function(f,k,l){f/=256;for(var m=k.length/256,n=0;n<m;n++){var p=this.block_cache.get(f+
n);if(void 0===p)p=k.slice(256*n,256*(n+1)),this.block_cache.set(f+n,p);else{const q=k.subarray(256*n,256*(n+1));p.set(q)}this.block_cache_is_write.add(f+n)}l()};b.prototype.handle_read=function(f,k,l){f/=256;k/=256;for(var m=0;m<k;m++){const n=this.block_cache.get(f+m);n?l.set(n,256*m):this.cache_reads&&this.block_cache.set(f+m,l.slice(256*m,256*(m+1)))}};b.prototype.get_buffer=function(f){f()};b.prototype.get_state=function(){const f=[],k=[];for(const [l,m]of this.block_cache)isFinite(l),this.block_cache_is_write.has(l)&&
k.push([l,m]);f[0]=k;return f};b.prototype.set_state=function(f){f=f[0];this.block_cache.clear();this.block_cache_is_write.clear();for(const [k,l]of f)isFinite(k),this.block_cache.set(k,l),this.block_cache_is_write.add(k)};c.prototype.load=function(){this.onload&&this.onload(Object.create(null))};c.prototype.get=function(f,k,l){var m=this.get_from_cache(f,k);if(m)l(m);else if(this.fixed_chunk_size){const p=Math.floor(f/this.fixed_chunk_size),q=f-p*this.fixed_chunk_size,r=Math.ceil((q+k)/this.fixed_chunk_size),
A=new Uint8Array(r*this.fixed_chunk_size);let z=0;for(let u=0;u<r;u++){var n=(p+u)*this.fixed_chunk_size;m=this.partfile_alt_format?this.basename+(p+u+"").padStart(8,"0")+this.extension:this.basename+n+"-"+(n+this.fixed_chunk_size)+this.extension;(n=this.get_from_cache(n,this.fixed_chunk_size))?(A.set(n,u*this.fixed_chunk_size),z++,z===r&&l(A.subarray(q,q+k))):t.load_file(m,{done:async function(F){F=new Uint8Array(F);this.is_zstd&&(F=await this.zstd_decompress(this.fixed_chunk_size,F),F=new Uint8Array(F));
A.set(F,u*this.fixed_chunk_size);this.handle_read((p+u)*this.fixed_chunk_size,this.fixed_chunk_size|0,F);z++;z===r&&l(A.subarray(q,q+k))}.bind(this)})}}else t.load_file(this.basename+f+"-"+(f+k)+this.extension,{done:function(p){p=new Uint8Array(p);this.handle_read(f,k,p);l(p)}.bind(this)})};c.prototype.get_from_cache=b.prototype.get_from_cache;c.prototype.set=b.prototype.set;c.prototype.handle_read=b.prototype.handle_read;c.prototype.get_state=b.prototype.get_state;c.prototype.set_state=b.prototype.set_state;
d.prototype.load=function(){this.load_next(0)};d.prototype.load_next=function(f){var k=new FileReader;k.onload=function(m){m=new Uint8Array(m.target.result);(new Uint8Array(this.buffer,f)).set(m);this.load_next(f+4194304)}.bind(this);if(this.onprogress)this.onprogress({loaded:f,total:this.byteLength,lengthComputable:!0});if(f<this.byteLength){var l=this.file.slice(f,Math.min(f+4194304,this.byteLength));k.readAsArrayBuffer(l)}else this.file=void 0,this.onload&&this.onload({buffer:this.buffer})};d.prototype.get=
a.prototype.get;d.prototype.set=a.prototype.set;d.prototype.get_buffer=a.prototype.get_buffer;d.prototype.get_state=a.prototype.get_state;d.prototype.set_state=a.prototype.set_state;e.prototype.load=function(){this.onload&&this.onload(Object.create(null))};e.prototype.get=function(f,k,l){var m=this.get_from_cache(f,k);m?l(m):(m=new FileReader,m.onload=function(n){n=new Uint8Array(n.target.result);this.handle_read(f,k,n);l(n)}.bind(this),m.readAsArrayBuffer(this.file.slice(f,f+k)))};e.prototype.get_from_cache=
b.prototype.get_from_cache;e.prototype.set=b.prototype.set;e.prototype.handle_read=b.prototype.handle_read;e.prototype.get_state=b.prototype.get_state;e.prototype.set_state=b.prototype.set_state;e.prototype.get_buffer=function(f){f()};e.prototype.get_as_file=function(f){for(var k=[],l=Array.from(this.block_cache.keys()).sort(function(r,A){return r-A}),m=0,n=0;n<l.length;n++){var p=l[n],q=this.block_cache.get(p);p*=256;p!==m&&(k.push(this.file.slice(m,p)),m=p);k.push(q);m+=q.length}m!==this.file.size&&
k.push(this.file.slice(m));return new File(k,f)};var g="undefined"===typeof XMLHttpRequest?function(f,k){require("fs").stat(f,(l,m)=>{l?k(l):k(null,m.size)})}:function(f,k){t.load_file(f,{done:(l,m)=>{l=m.getResponseHeader("Content-Range")||"";(m=l.match(/\/(\d+)\s*$/))?k(null,+m[1]):k("`Range: bytes=...` header not supported (Got `"+l+"`)")},headers:{Range:"bytes=0-0","X-Accept-Encoding":"identity"}})}})();function oa(a,b,c,d,e,g){this.master=new J(this,a,b,d,e,0,g);this.slave=new J(this,a,c,!1,e,1,g);this.current_interface=this.master;this.cpu=a;0===e?(this.ata_port=496,this.irq=14,this.pci_id=240):1===e&&(this.ata_port=368,this.irq=15,this.pci_id=248);this.ata_port_high=this.ata_port|516;this.master_port=46080;this.pci_space=[134,128,16,112,5,0,160,2,0,128,1,1,0,0,0,0,this.ata_port&255|1,this.ata_port>>8,0,0,this.ata_port_high&255|1,this.ata_port_high>>8,0,0,0,0,0,0,0,0,0,0,this.master_port&255|1,
this.master_port>>8,0,0,0,0,0,0,0,0,0,0,67,16,212,130,0,0,0,0,0,0,0,0,0,0,0,0,this.irq,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.pci_bars=[{size:8},{size:4},void 0,void 0,{size:16}];this.name="ide"+e;this.device_control=2;a.io.register_read(this.ata_port|7,this,function(){this.cpu.device_lower_irq(this.irq);return this.read_status()});a.io.register_read(this.ata_port_high|
2,this,this.read_status);a.io.register_write(this.ata_port_high|2,this,this.write_control);a.io.register_read(this.ata_port|0,this,function(){return this.current_interface.read_data(1)},function(){return this.current_interface.read_data(2)},function(){return this.current_interface.read_data(4)});a.io.register_read(this.ata_port|1,this,function(){B(this.current_interface.error&255);return this.current_interface.error&255});a.io.register_read(this.ata_port|2,this,function(){B(this.current_interface.bytecount&
255);return this.current_interface.bytecount&255});a.io.register_read(this.ata_port|3,this,function(){B(this.current_interface.sector&255);return this.current_interface.sector&255});a.io.register_read(this.ata_port|4,this,function(){B(this.current_interface.cylinder_low&255);return this.current_interface.cylinder_low&255});a.io.register_read(this.ata_port|5,this,function(){B(this.current_interface.cylinder_high&255);return this.current_interface.cylinder_high&255});a.io.register_read(this.ata_port|
6,this,function(){return this.current_interface.drive_head&255});a.io.register_write(this.ata_port|0,this,function(f){this.current_interface.write_data_port8(f)},function(f){this.current_interface.write_data_port16(f)},function(f){this.current_interface.write_data_port32(f)});a.io.register_write(this.ata_port|1,this,function(f){B(f);this.master.lba_count=(this.master.lba_count<<8|f)&65535;this.slave.lba_count=(this.slave.lba_count<<8|f)&65535});a.io.register_write(this.ata_port|2,this,function(f){B(f);
this.master.bytecount=(this.master.bytecount<<8|f)&65535;this.slave.bytecount=(this.slave.bytecount<<8|f)&65535});a.io.register_write(this.ata_port|3,this,function(f){B(f);this.master.sector=(this.master.sector<<8|f)&65535;this.slave.sector=(this.slave.sector<<8|f)&65535});a.io.register_write(this.ata_port|4,this,function(f){B(f);this.master.cylinder_low=(this.master.cylinder_low<<8|f)&65535;this.slave.cylinder_low=(this.slave.cylinder_low<<8|f)&65535});a.io.register_write(this.ata_port|5,this,function(f){B(f);
this.master.cylinder_high=(this.master.cylinder_high<<8|f)&65535;this.slave.cylinder_high=(this.slave.cylinder_high<<8|f)&65535});a.io.register_write(this.ata_port|6,this,function(f){var k=f&16;B(f,2);this.current_interface=k?this.slave:this.master;this.master.drive_head=f;this.slave.drive_head=f;this.master.is_lba=this.slave.is_lba=f>>6&1;this.master.head=this.slave.head=f&15});this.dma_command=this.dma_status=this.prdt_addr=0;a.io.register_write(this.ata_port|7,this,function(f){this.cpu.device_lower_irq(this.irq);
this.current_interface.ata_command(f)});a.io.register_read(this.master_port|4,this,void 0,void 0,this.dma_read_addr);a.io.register_write(this.master_port|4,this,void 0,void 0,this.dma_set_addr);a.io.register_read(this.master_port,this,this.dma_read_command8,void 0,this.dma_read_command);a.io.register_write(this.master_port,this,this.dma_write_command8,void 0,this.dma_write_command);a.io.register_read(this.master_port|2,this,this.dma_read_status);a.io.register_write(this.master_port|2,this,this.dma_write_status);
a.io.register_read(this.master_port|8,this,function(){return 0});a.io.register_read(this.master_port|10,this,function(){return 0});a.devices.pci.register_device(this)}oa.prototype.read_status=function(){if(this.current_interface.buffer){var a=this.current_interface.status;B(a,2);return a}return 0};oa.prototype.write_control=function(a){B(a,2);a&4&&(this.cpu.device_lower_irq(this.irq),this.master.device_reset(),this.slave.device_reset());this.device_control=a};
oa.prototype.dma_read_addr=function(){B(this.prdt_addr,8);return this.prdt_addr};oa.prototype.dma_set_addr=function(a){B(a,8);this.prdt_addr=a};oa.prototype.dma_read_status=function(){B(this.dma_status);return this.dma_status};oa.prototype.dma_write_status=function(a){B(a);this.dma_status&=~(a&6)};oa.prototype.dma_read_command=function(){return this.dma_read_command8()|this.dma_read_status()<<16};oa.prototype.dma_read_command8=function(){B(this.dma_command);return this.dma_command};
oa.prototype.dma_write_command=function(a){B(a);this.dma_write_command8(a&255);this.dma_write_status(a>>16&255)};
oa.prototype.dma_write_command8=function(a){B(a);const b=this.dma_command;this.dma_command=a&9;if((b&1)!==(a&1))if(0===(a&1))this.dma_status&=-2;else switch(this.dma_status|=1,this.current_interface.current_command){case 37:case 200:this.current_interface.do_ata_read_sectors_dma();break;case 202:case 53:this.current_interface.do_ata_write_sectors_dma();break;case 160:this.current_interface.do_atapi_dma();break;default:B(this.current_interface.current_command)}};
oa.prototype.push_irq=function(){0===(this.device_control&2)&&(this.dma_status|=4,this.cpu.device_raise_irq(this.irq))};oa.prototype.get_state=function(){var a=[];a[0]=this.master;a[1]=this.slave;a[2]=this.ata_port;a[3]=this.irq;a[4]=this.pci_id;a[5]=this.ata_port_high;a[6]=this.master_port;a[7]=this.name;a[8]=this.device_control;a[9]=this.prdt_addr;a[10]=this.dma_status;a[11]=this.current_interface===this.master;a[12]=this.dma_command;return a};
oa.prototype.set_state=function(a){this.master.set_state(a[0]);this.slave.set_state(a[1]);this.ata_port=a[2];this.irq=a[3];this.pci_id=a[4];this.ata_port_high=a[5];this.master_port=a[6];this.name=a[7];this.device_control=a[8];this.prdt_addr=a[9];this.dma_status=a[10];this.current_interface=a[11]?this.master:this.slave;this.dma_command=a[12]};
function J(a,b,c,d,e,g,f){this.device=a;this.bus=f;this.nr=e;this.cpu=b;this.buffer=c;this.sector_size=d?2048:512;this.is_atapi=d;this.cylinder_count=this.sectors_per_track=this.head_count=this.sector_count=0;this.buffer&&(this.sector_count=this.buffer.byteLength/this.sector_size,this.sector_count!==(this.sector_count|0)&&(this.sector_count=Math.ceil(this.sector_count)),d?(this.head_count=1,this.sectors_per_track=0):(this.head_count=16,this.sectors_per_track=63),this.cylinder_count=this.sector_count/
this.head_count/this.sectors_per_track,this.cylinder_count!==(this.cylinder_count|0)&&(this.cylinder_count=Math.floor(this.cylinder_count)),a=b.devices.rtc,a.cmos_write(57,a.cmos_read(57)|1<<4*this.nr),a.cmos_write(18,a.cmos_read(18)&15|240),a.cmos_write(27,this.cylinder_count&255),a.cmos_write(28,this.cylinder_count>>8&255),a.cmos_write(29,this.head_count&255),a.cmos_write(30,255),a.cmos_write(31,255),a.cmos_write(32,200),a.cmos_write(33,this.cylinder_count&255),a.cmos_write(34,this.cylinder_count>>
8&255),a.cmos_write(35,this.sectors_per_track&255));this.buffer=c;this.drive_head=this.head=this.cylinder_high=this.cylinder_low=this.lba_count=this.sector=this.bytecount=this.is_lba=0;this.status=80;this.sectors_per_drq=128;this.data_pointer=this.error=0;this.data=new Uint8Array(65536);this.data16=new Uint16Array(this.data.buffer);this.data32=new Int32Array(this.data.buffer);this.data_end=this.data_length=0;this.current_atapi_command=this.current_command=-1;this.last_io_id=this.write_dest=0;this.in_progress_io_ids=
new Set;this.cancelled_io_ids=new Set;Object.seal(this)}J.prototype.device_reset=function(){this.is_atapi?(this.status=0,this.sector=this.error=this.bytecount=1,this.cylinder_low=20,this.cylinder_high=235):(this.status=81,this.sector=this.error=this.bytecount=1,this.cylinder_high=this.cylinder_low=0);this.cancel_io_operations()};J.prototype.push_irq=function(){this.device.push_irq()};
J.prototype.ata_command=function(a){B(a);if(this.buffer)switch(this.current_command=a,this.error=0,a){case 8:this.data_length=this.data_end=this.data_pointer=0;this.device_reset();this.push_irq();break;case 16:this.status=80;this.cylinder_low=0;this.push_irq();break;case 248:this.status=80;a=this.sector_count-1;this.sector=a&255;this.cylinder_low=a>>8&255;this.cylinder_high=a>>16&255;this.drive_head=this.drive_head&240|a>>24&15;this.push_irq();break;case 39:this.status=80;a=this.sector_count-1;this.sector=
a&255;this.cylinder_low=a>>8&255;this.cylinder_high=a>>16&255;this.sector|=a>>24<<8&65280;this.push_irq();break;case 32:case 36:case 41:case 196:this.ata_read_sectors(a);break;case 48:case 52:case 57:case 197:this.ata_write_sectors(a);break;case 144:this.push_irq();this.error=257;this.status=80;break;case 145:this.status=80;this.push_irq();break;case 160:this.is_atapi&&(this.status=88,this.data_allocate(12),this.data_end=12,this.bytecount=1,this.push_irq());break;case 161:this.is_atapi?(this.create_identify_packet(),
this.status=88,this.cylinder_low=20,this.cylinder_high=235):this.status=65;this.push_irq();break;case 198:B(this.bytecount&255);this.sectors_per_drq=this.bytecount&255;this.status=80;this.push_irq();break;case 37:case 200:this.ata_read_sectors_dma(a);break;case 53:case 202:this.ata_write_sectors_dma(a);break;case 64:this.status=80;this.push_irq();break;case 218:this.status=65;this.error=4;this.push_irq();break;case 224:this.status=80;this.push_irq();break;case 225:this.status=80;this.push_irq();break;
case 231:this.status=80;this.push_irq();break;case 236:if(this.is_atapi){this.status=65;this.error=4;this.push_irq();break}this.create_identify_packet();this.status=88;this.push_irq();break;case 234:this.status=80;this.push_irq();break;case 239:B(this.bytecount&255);this.status=80;this.push_irq();break;case 222:this.status=80;this.push_irq();break;case 245:this.status=80;this.push_irq();break;case 249:this.status=65;this.error=4;break;default:B(a),this.status=65,this.error=4}else this.error=4,this.status=
65,this.push_irq()};
J.prototype.atapi_handle=function(){B(this.data[0]);this.data_pointer=0;this.current_atapi_command=this.data[0];switch(this.current_atapi_command){case 0:this.data_allocate(0);this.data_end=this.data_length;this.status=80;break;case 3:this.data_allocate(this.data[4]);this.data_end=this.data_length;this.status=88;this.data[0]=240;this.data[2]=5;this.data[7]=8;break;case 18:var a=this.data[4];this.status=88;B(this.data[1],2);this.data.set([5,128,1,49,31,0,0,0,83,79,78,89,32,32,32,32,67,68,45,82,79,
77,32,67,68,85,45,49,48,48,48,32,49,46,49,97]);this.data_end=this.data_length=Math.min(36,a);break;case 26:this.data_allocate(this.data[4]);this.data_end=this.data_length;this.status=88;break;case 30:this.data_allocate(0);this.data_end=this.data_length;this.status=80;break;case 37:a=this.sector_count-1;this.data_set(new Uint8Array([a>>24&255,a>>16&255,a>>8&255,a&255,0,0,this.sector_size>>8&255,this.sector_size&255]));this.data_end=this.data_length;this.status=88;break;case 40:this.lba_count&1?this.atapi_read_dma(this.data):
this.atapi_read(this.data);break;case 66:a=this.data[8];this.data_allocate(Math.min(8,a));this.data_end=this.data_length;this.status=88;break;case 67:a=this.data[8]|this.data[7]<<8;var b=this.data[9]>>6;this.data_allocate(a);this.data_end=this.data_length;B(b,2);B(this.data[6]);0===b?(a=this.sector_count,this.data.set(new Uint8Array([0,18,1,1,0,20,1,0,0,0,0,0,0,22,170,0,a>>24,a>>16&255,a>>8&255,a&255]))):1===b&&this.data.set(new Uint8Array([0,10,1,1,0,0,0,0,0,0,0,0]));this.status=88;break;case 70:a=
this.data[8]|this.data[7]<<8;a=Math.min(a,32);this.data_allocate(a);this.data_end=this.data_length;this.data[0]=a-4>>24&255;this.data[1]=a-4>>16&255;this.data[2]=a-4>>8&255;this.data[3]=a-4&255;this.data[6]=8;this.data[10]=3;this.status=88;break;case 81:this.data_allocate(0);this.data_end=this.data_length;this.status=80;break;case 82:B(this.data[0]);this.status=81;this.data_length=0;this.error=80;break;case 90:a=this.data[8]|this.data[7]<<8;b=this.data[2];B(b);42===b&&this.data_allocate(Math.min(30,
a));this.data_end=this.data_length;this.status=88;break;case 189:this.data_allocate(this.data[9]|this.data[8]<<8);this.data_end=this.data_length;this.data[5]=1;this.status=88;break;case 74:this.status=81;this.data_length=0;this.error=80;B(this.data[0]);break;case 190:B(this.data[0]);this.data_allocate(0);this.data_end=this.data_length;this.status=80;break;default:this.status=81,this.data_length=0,this.error=80,B(this.data[0])}this.bytecount=this.bytecount&-8|2;0===(this.status&128)&&this.push_irq();
0===(this.status&128)&&0===this.data_length&&(this.bytecount|=1,this.status&=-9)};J.prototype.do_write=function(){this.status=80;var a=this.data.subarray(0,this.data_length);this.ata_advance(this.current_command,this.data_length/512);this.push_irq();this.buffer.set(this.write_dest,a,function(){});this.report_write(this.data_length)};
J.prototype.atapi_read=function(a){var b=a[2]<<24|a[3]<<16|a[4]<<8|a[5],c=a[7]<<8|a[8];a=a[1];var d=c*this.sector_size,e=b*this.sector_size;pa("CD read lba="+B(b)+" lbacount="+B(c)+" bytecount="+B(d)+" flags="+B(a),32768);this.data_length=0;var g=this.cylinder_high<<8&65280|this.cylinder_low&255;pa(B(this.cylinder_high,2)+" "+B(this.cylinder_low,2),32768);this.cylinder_low=this.cylinder_high=0;65535===g&&g--;g>d&&(g=d);e>=this.buffer.byteLength?(qa(!1,"CD read: Outside of disk  end="+B(e+d)+" size="+
B(this.buffer.byteLength),32768),this.status=255,this.push_irq()):0===d?(this.status=80,this.data_pointer=0):(d=Math.min(d,this.buffer.byteLength-e),this.status=208,this.report_read_start(),this.read_buffer(e,d,f=>{this.data_set(f);this.status=88;this.bytecount=this.bytecount&-8|2;this.push_irq();this.data_end=g&=-4;this.data_end>this.data_length&&(this.data_end=this.data_length);this.cylinder_low=this.data_end&255;this.cylinder_high=this.data_end>>8&255;this.report_read_end(d)}))};
J.prototype.atapi_read_dma=function(a){var b=a[2]<<24|a[3]<<16|a[4]<<8|a[5],c=a[7]<<8|a[8];a=a[1];var d=c*this.sector_size,e=b*this.sector_size;pa("CD read DMA lba="+B(b)+" lbacount="+B(c)+" bytecount="+B(d)+" flags="+B(a),32768);e>=this.buffer.byteLength?(qa(!1,"CD read: Outside of disk  end="+B(e+d)+" size="+B(this.buffer.byteLength),32768),this.status=255,this.push_irq()):(this.status=208,this.report_read_start(),this.read_buffer(e,d,g=>{this.report_read_end(d);this.status=88;this.bytecount=this.bytecount&
-8|2;this.data_set(g);this.do_atapi_dma()}))};
J.prototype.do_atapi_dma=function(){if(0!==(this.device.dma_status&1)&&0!==(this.status&8)){var a=this.device.prdt_addr,b=0,c=this.data;do{var d=this.cpu.read32s(a),e=this.cpu.read16(a+4),g=this.cpu.read8(a+7)&128;e||(e=65536);B(d);B(e);B(this.data_length);this.cpu.write_blob(c.subarray(b,Math.min(b+e,this.data_length)),d);b+=e;a+=8;if(b>=this.data_length&&!g){B(b);B(this.data_length);B(this.current_command);break}}while(!g);this.status=80;this.device.dma_status&=-2;this.bytecount=this.bytecount&
-8|3;this.push_irq()}};J.prototype.read_data=function(a){if(this.data_pointer<this.data_end){B(this.data_pointer);var b=1===a?this.data[this.data_pointer]:2===a?this.data16[this.data_pointer>>>1]:this.data32[this.data_pointer>>>2];this.data_pointer+=a;0===(this.data_pointer&(0===(this.data_end&4095)?4095:255))&&(B(this.data[this.data_pointer],2),B(this.data_pointer),B(this.data_length));this.data_pointer>=this.data_end&&this.read_end();return b}this.data_pointer+=a;return 0};
J.prototype.read_end=function(){B(this.current_command);B(this.data_pointer);B(this.data_end);B(this.data_length);if(160===this.current_command)if(this.data_end===this.data_length)this.status=80,this.bytecount=this.bytecount&-8|3,this.push_irq();else{this.status=88;this.bytecount=this.bytecount&-8|2;this.push_irq();var a=this.cylinder_high<<8&65280|this.cylinder_low&255;this.data_end+a>this.data_length?(this.cylinder_low=this.data_length-this.data_end&255,this.cylinder_high=this.data_length-this.data_end>>
8&255,this.data_end=this.data_length):this.data_end+=a;B(this.data_end)}else this.error=0,this.data_pointer>=this.data_length?this.status=80:(a=196===this.current_command||41===this.current_command?Math.min(this.sectors_per_drq,(this.data_length-this.data_end)/512):1,this.ata_advance(this.current_command,a),this.data_end+=512*a,this.status=88,this.push_irq())};
J.prototype.write_data_port=function(a,b){if(this.data_pointer>=this.data_end)B(a),B(this.data_end),B(this.data_pointer);else{if(0===(this.data_pointer+b&(0===(this.data_end&4095)?4095:255))||20>this.data_end)B(a>>>0),B(this.data_end),B(this.data_pointer);1===b?this.data[this.data_pointer++]=a:2===b?(this.data16[this.data_pointer>>>1]=a,this.data_pointer+=2):(this.data32[this.data_pointer>>>2]=a,this.data_pointer+=4);this.data_pointer===this.data_end&&this.write_end()}};
J.prototype.write_data_port8=function(a){this.write_data_port(a,1)};J.prototype.write_data_port16=function(a){this.write_data_port(a,2)};J.prototype.write_data_port32=function(a){this.write_data_port(a,4)};J.prototype.write_end=function(){160===this.current_command?this.atapi_handle():(B(this.data_pointer),B(this.data_length),this.data_pointer>=this.data_length?this.do_write():(B(this.current_command),this.status=88,this.data_end+=512,this.push_irq()))};
J.prototype.ata_advance=function(a,b){this.bytecount-=b;36===a||41===a||52===a||57===a||37===a||53===a?(a=b+this.get_lba48(),this.sector=a&255|a>>16&65280,this.cylinder_low=a>>8&255,this.cylinder_high=a>>16&255):this.is_lba?(a=b+this.get_lba28(),this.sector=a&255,this.cylinder_low=a>>8&255,this.cylinder_high=a>>16&255,this.head=this.head&-16|a&15):(a=b+this.get_chs(),b=a/(this.head_count*this.sectors_per_track)|0,this.cylinder_low=b&255,this.cylinder_high=b>>8&255,this.head=(a/this.sectors_per_track|
0)%this.head_count&15,this.sector=a%this.sectors_per_track+1&255,this.get_chs())};
J.prototype.ata_read_sectors=function(a){var b=36===a||41===a,c=this.get_count(b);b=this.get_lba(b);var d=32===a||36===a,e=c*this.sector_size,g=b*this.sector_size;pa("ATA read cmd="+B(a)+" mode="+(this.is_lba?"lba":"chs")+" lba="+B(b)+" lbacount="+B(c)+" bytecount="+B(e),32768);g+e>this.buffer.byteLength?(this.status=255,this.push_irq()):(this.status=192,this.report_read_start(),this.read_buffer(g,e,f=>{this.data_set(f);this.status=88;this.data_end=d?512:Math.min(e,512*this.sectors_per_drq);this.ata_advance(a,
d?1:Math.min(c,this.sectors_per_track));this.push_irq();this.report_read_end(e)}))};J.prototype.ata_read_sectors_dma=function(a){var b=37===a;a=this.get_count(b);b=this.get_lba(b);var c=a*this.sector_size,d=b*this.sector_size;B(b);B(a);B(c);d+c>this.buffer.byteLength?(this.status=255,this.push_irq()):(this.status=88,this.device.dma_status|=1)};
J.prototype.do_ata_read_sectors_dma=function(){var a=37===this.current_command,b=this.get_count(a);a=this.get_lba(a);var c=b*this.sector_size;a*=this.sector_size;this.report_read_start();this.read_buffer(a,c,d=>{var e=this.device.prdt_addr,g=0;do{var f=this.cpu.read32s(e),k=this.cpu.read16(e+4),l=this.cpu.read8(e+7)&128;k||(k=65536);B(f);B(k);this.cpu.write_blob(d.subarray(g,g+k),f);g+=k;e+=8}while(!l);this.ata_advance(this.current_command,b);this.status=80;this.device.dma_status&=-2;this.current_command=
-1;this.push_irq();this.report_read_end(c)})};J.prototype.ata_write_sectors=function(a){var b=52===a||57===a,c=this.get_count(b);b=this.get_lba(b);a=48===a||52===a;var d=c*this.sector_size,e=b*this.sector_size;B(b);B(c);B(d);e+d>this.buffer.byteLength?(this.status=255,this.push_irq()):(this.status=88,this.data_allocate_noclear(d),this.data_end=a?512:Math.min(d,512*this.sectors_per_drq),this.write_dest=e)};
J.prototype.ata_write_sectors_dma=function(a){var b=53===a;a=this.get_count(b);b=this.get_lba(b);var c=a*this.sector_size,d=b*this.sector_size;B(b);B(a);B(c);d+c>this.buffer.byteLength?(this.status=255,this.push_irq()):(this.status=88,this.device.dma_status|=1)};
J.prototype.do_ata_write_sectors_dma=function(){var a=53===this.current_command,b=this.get_count(a),c=this.get_lba(a);a=b*this.sector_size;c*=this.sector_size;var d=this.device.prdt_addr,e=0;pa("prdt addr: "+B(d,8),32768);const g=new Uint8Array(a);do{var f=this.cpu.read32s(d),k=this.cpu.read16(d+4),l=this.cpu.read8(d+7)&128;k||(k=65536);pa("dma write transfer dest="+B(f)+" prd_count="+B(k),32768);f=this.cpu.mem8.subarray(f,f+k);g.set(f,e);e+=k;d+=8}while(!l);this.buffer.set(c,g,()=>{this.ata_advance(this.current_command,
b);this.status=80;this.push_irq();this.device.dma_status&=-2;this.current_command=-1});this.report_write(a)};J.prototype.get_chs=function(){return((this.cylinder_low&255|this.cylinder_high<<8&65280)*this.head_count+this.head)*this.sectors_per_track+(this.sector&255)-1};J.prototype.get_lba28=function(){return this.sector&255|this.cylinder_low<<8&65280|this.cylinder_high<<16&16711680|(this.head&15)<<24};
J.prototype.get_lba48=function(){return(this.sector&255|this.cylinder_low<<8&65280|this.cylinder_high<<16&16711680|this.sector>>8<<24&4278190080)>>>0};J.prototype.get_lba=function(a){return a?this.get_lba48():this.is_lba?this.get_lba28():this.get_chs()};J.prototype.get_count=function(a){a?(a=this.bytecount,0===a&&(a=65536)):(a=this.bytecount&255,0===a&&(a=256));return a};
J.prototype.create_identify_packet=function(){if(this.drive_head&16)this.data_allocate(0);else{for(var a=0;512>a;a++)this.data[a]=0;a=Math.min(16383,this.cylinder_count);this.data_set([64,this.is_atapi?133:0,a,a>>8,0,0,this.head_count,this.head_count>>8,this.sectors_per_track/512,this.sectors_per_track/512>>8,0,2,this.sectors_per_track,this.sectors_per_track>>8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,2,4,0,0,0,0,0,0,0,0,0,56,118,32,54,68,72,32,32,32,32,32,32,32,32,32,32,32,32,32,
32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,128,0,1,0,0,2,0,0,0,2,0,2,7,0,a,a>>8,this.head_count,this.head_count>>8,this.sectors_per_track,0,this.sector_count&255,this.sector_count>>8&255,this.sector_count>>16&255,this.sector_count>>24&255,0,0,this.sector_count&255,this.sector_count>>8&255,this.sector_count>>16&255,this.sector_count>>24&255,0,0,160===this.current_command?0:7,160===this.current_command?0:4,0,0,30,0,30,0,30,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,126,0,
0,0,0,0,0,116,0,64,0,64,0,116,0,64,0,0,0,0,0,0,0,0,0,0,1,96,0,0,0,0,0,0,0,0,0,0,0,0,this.sector_count&255,this.sector_count>>8&255,this.sector_count>>16&255,this.sector_count>>24&255]);this.data_end=this.data_length=512}};J.prototype.data_allocate=function(a){this.data_allocate_noclear(a);for(var b=0;b<a+3>>2;b++)this.data32[b]=0};
J.prototype.data_allocate_noclear=function(a){this.data.length<a&&(this.data=new Uint8Array(a+3&-4),this.data16=new Uint16Array(this.data.buffer),this.data32=new Int32Array(this.data.buffer));this.data_length=a;this.data_pointer=0};J.prototype.data_set=function(a){this.data_allocate_noclear(a.length);this.data.set(a)};J.prototype.report_read_start=function(){this.bus.send("ide-read-start")};J.prototype.report_read_end=function(a){this.bus.send("ide-read-end",[this.nr,a,a/this.sector_size|0])};
J.prototype.report_write=function(a){this.bus.send("ide-write-end",[this.nr,a,a/this.sector_size|0])};J.prototype.read_buffer=function(a,b,c){const d=this.last_io_id++;this.in_progress_io_ids.add(d);this.buffer.get(a,b,e=>{this.cancelled_io_ids.delete(d)?this.in_progress_io_ids.has(d):(this.in_progress_io_ids.delete(d),c(e))})};J.prototype.cancel_io_operations=function(){for(const a of this.in_progress_io_ids)this.cancelled_io_ids.add(a);this.in_progress_io_ids.clear()};
J.prototype.get_state=function(){var a=[];a[0]=this.bytecount;a[1]=this.cylinder_count;a[2]=this.cylinder_high;a[3]=this.cylinder_low;a[4]=this.data_pointer;a[5]=0;a[6]=0;a[7]=0;a[8]=0;a[9]=this.drive_head;a[10]=this.error;a[11]=this.head;a[12]=this.head_count;a[13]=this.is_atapi;a[14]=this.is_lba;a[15]=this.lba_count;a[16]=this.data;a[17]=this.data_length;a[18]=this.sector;a[19]=this.sector_count;a[20]=this.sector_size;a[21]=this.sectors_per_drq;a[22]=this.sectors_per_track;a[23]=this.status;a[24]=
this.write_dest;a[25]=this.current_command;a[26]=this.data_end;a[27]=this.current_atapi_command;a[28]=this.buffer;return a};
J.prototype.set_state=function(a){this.bytecount=a[0];this.cylinder_count=a[1];this.cylinder_high=a[2];this.cylinder_low=a[3];this.data_pointer=a[4];this.drive_head=a[9];this.error=a[10];this.head=a[11];this.head_count=a[12];this.is_atapi=a[13];this.is_lba=a[14];this.lba_count=a[15];this.data=a[16];this.data_length=a[17];this.sector=a[18];this.sector_count=a[19];this.sector_size=a[20];this.sectors_per_drq=a[21];this.sectors_per_track=a[22];this.status=a[23];this.write_dest=a[24];this.current_command=
a[25];this.data_end=a[26];this.current_atapi_command=a[27];this.data16=new Uint16Array(this.data.buffer);this.data32=new Int32Array(this.data.buffer);this.buffer&&this.buffer.set_state(a[28])};function sa(a){this.pci_addr=new Uint8Array(4);this.pci_value=new Uint8Array(4);this.pci_response=new Uint8Array(4);this.pci_status=new Uint8Array(4);this.pci_addr32=new Int32Array(this.pci_addr.buffer);this.pci_value32=new Int32Array(this.pci_value.buffer);this.pci_response32=new Int32Array(this.pci_response.buffer);this.pci_status32=new Int32Array(this.pci_status.buffer);this.device_spaces=[];this.devices=[];this.cpu=a;for(var b=0;256>b;b++)this.device_spaces[b]=void 0,this.devices[b]=void 0;this.io=
a.io;a.io.register_write(3324,this,function(c){this.pci_write8(this.pci_addr32[0],c)},function(c){this.pci_write16(this.pci_addr32[0],c)},function(c){this.pci_write32(this.pci_addr32[0],c)});a.io.register_write(3325,this,function(c){this.pci_write8(this.pci_addr32[0]+1|0,c)});a.io.register_write(3326,this,function(c){this.pci_write8(this.pci_addr32[0]+2|0,c)},function(c){this.pci_write16(this.pci_addr32[0]+2|0,c)});a.io.register_write(3327,this,function(c){this.pci_write8(this.pci_addr32[0]+3|0,c)});
a.io.register_read_consecutive(3324,this,function(){return this.pci_response[0]},function(){return this.pci_response[1]},function(){return this.pci_response[2]},function(){return this.pci_response[3]});a.io.register_read_consecutive(3320,this,function(){return this.pci_status[0]},function(){return this.pci_status[1]},function(){return this.pci_status[2]},function(){return this.pci_status[3]});a.io.register_write_consecutive(3320,this,function(c){this.pci_addr[0]=c&252},function(c){2===(this.pci_addr[1]&
6)&&6===(c&6)?a.reboot_internal():this.pci_addr[1]=c},function(c){this.pci_addr[2]=c},function(c){this.pci_addr[3]=c;this.pci_query()});this.register_device({pci_id:0,pci_space:[134,128,55,18,0,0,0,0,2,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0],pci_bars:[],name:"82441FX PMC"});this.isa_bridge={pci_id:8,pci_space:[134,128,0,112,7,0,0,2,0,0,1,6,0,0,128,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],pci_bars:[],name:"82371SB PIIX3 ISA"};this.isa_bridge_space=this.register_device(this.isa_bridge);this.isa_bridge_space8=new Uint8Array(this.isa_bridge_space.buffer)}sa.prototype.get_state=function(){for(var a=[],b=0;256>b;b++)a[b]=this.device_spaces[b];a[256]=this.pci_addr;a[257]=this.pci_value;a[258]=this.pci_response;a[259]=this.pci_status;return a};
sa.prototype.set_state=function(a){for(var b=0;256>b;b++){var c=this.devices[b],d=a[b];if(c&&d){for(var e=0;e<c.pci_bars.length;e++){var g=d[4+e];if(g&1){var f=c.pci_bars[e];this.set_io_bars(f,f.original_bar&65534,g&65534)}}this.device_spaces[b].set(d)}else d&&B(b,2)}this.pci_addr.set(a[256]);this.pci_value.set(a[257]);this.pci_response.set(a[258]);this.pci_status.set(a[259])};
sa.prototype.pci_query=function(){var a=this.pci_addr[2]<<8|this.pci_addr[1],b=this.pci_addr[0]&252,c=a>>3&31;var d="query enabled="+(this.pci_addr[3]>>7)+(" bdf="+B(a,4));d+=" dev="+B(c,2);d+=" addr="+B(b,2);a=this.device_spaces[a];void 0!==a?(this.pci_status32[0]=-2147483648,this.pci_response32[0]=b<a.byteLength?a[b>>2]:0,d+=" "+B(this.pci_addr32[0]>>>0,8)+" -> "+B(this.pci_response32[0]>>>0,8)):(this.pci_response32[0]=-1,this.pci_status32[0]=0)};
sa.prototype.pci_write8=function(a,b){var c=a>>8&65535;a&=255;var d=new Uint8Array(this.device_spaces[c].buffer);B(a);B(c>>3,2);B(a,4);B(b,2);d[a]=b};sa.prototype.pci_write16=function(a,b){var c=a>>8&65535;a&=255;var d=new Uint16Array(this.device_spaces[c].buffer);16<=a&&44>a?B(a):(B(a),B(c>>3,2),B(a,4),B(b,4),d[a>>>1]=b)};
sa.prototype.pci_write32=function(a,b){var c=a>>8&65535;a&=255;var d=this.device_spaces[c],e=this.devices[c];if(d)if(16<=a&&40>a){e=e.pci_bars[a-16>>2];B(b>>>0);B(c>>3,2);if(e){c=a>>2;var g=d[c]&1;-1===(b|3|e.size-1)?(b=~(e.size-1)|g,0===g&&(d[c]=b)):0===g&&(d[c]=e.original_bar);if(1===g){g=d[c]&65534;var f=b&65534;B(g>>>0,8);B(f>>>0,8);this.set_io_bars(e,g,f);d[c]=b|1}}else d[a>>2]=0;B(d[a>>2]>>>0)}else 48===a?(B(c>>3,2),B(b>>>0,8),d[a>>2]=e.pci_rom_size?-1===(b|2047)?-e.pci_rom_size|0:e.pci_rom_address|
0:0):4===a?(B(c>>3,2),B(a,4),B(b>>>0,8)):(B(c>>3,2),B(a,4),B(b>>>0,8),d[a>>>2]=b)};sa.prototype.register_device=function(a){var b=a.pci_id;B(b);var c=new Int32Array(64);c.set(new Int32Array((new Uint8Array(a.pci_space)).buffer));this.device_spaces[b]=c;this.devices[b]=a;b=c.slice(4,10);for(var d=0;d<a.pci_bars.length;d++){var e=a.pci_bars[d];if(e){var g=b[d],f=g&1;e.original_bar=g;e.entries=[];if(0!==f)for(g&=-2,f=0;f<e.size;f++)e.entries[f]=this.io.ports[g+f]}}return c};
sa.prototype.set_io_bars=function(a,b,c){var d=a.size;B(b);B(c);for(var e=this.io.ports,g=0;g<d;g++){var f=e[b+g];4096<=b+g&&(e[b+g]=this.io.create_empty_entry());f.read8===this.io.empty_port_read8&&f.read16===this.io.empty_port_read16&&f.read32===this.io.empty_port_read32&&f.write8===this.io.empty_port_write&&f.write16===this.io.empty_port_write&&f.write32===this.io.empty_port_write&&B(b+g,4);f=a.entries[g];var k=e[c+g];4096<=c+g&&(e[c+g]=f);k.read8!==this.io.empty_port_read8&&k.read16!==this.io.empty_port_read16&&
k.read32!==this.io.empty_port_read32&&k.write8!==this.io.empty_port_write&&k.write16!==this.io.empty_port_write&&k.write32!==this.io.empty_port_write||B(c+g,4)}};sa.prototype.raise_irq=function(a){this.cpu.device_raise_irq(this.isa_bridge_space8[96+((this.device_spaces[a][15]>>8&255)-1+((a>>3)-1&255)&3)])};sa.prototype.lower_irq=function(a){this.cpu.device_lower_irq(this.isa_bridge_space8[96+((this.device_spaces[a][15]>>8&255)+(a>>3&255)-2&3)])};function K(a,b){this.io=a.io;this.cpu=a;this.dma=a.devices.dma;this.bytes_expecting=0;this.receiving_command=new Uint8Array(10);this.receiving_index=0;this.next_command=null;this.response_data=new Uint8Array(10);this.last_head=this.last_cylinder=this.drive=this.status_reg2=this.status_reg1=this.status_reg0=this.response_length=this.response_index=0;this.last_sector=1;this.dir=this.dor=0;this.fdb_image=this.fda_image=null;b?this.set_fda(b):(this.eject_fda(),this.cpu.devices.rtc.cmos_write(16,64));
this.io.register_read(1008,this,this.port3F0_read);this.io.register_read(1010,this,this.port3F2_read);this.io.register_read(1012,this,this.port3F4_read);this.io.register_read(1013,this,this.port3F5_read);this.io.register_read(1015,this,this.port3F7_read);this.io.register_write(1010,this,this.port3F2_write);this.io.register_write(1012,this,this.port3F4_write);this.io.register_write(1013,this,this.port3F5_write)}
K.prototype.eject_fda=function(){this.fda_image=null;this.number_of_cylinders=this.number_of_heads=this.sectors_per_track=0;this.dir=128};
K.prototype.set_fda=function(a){var b={[163840]:{type:1,tracks:40,sectors:8,heads:1},[184320]:{type:1,tracks:40,sectors:9,heads:1},[204800]:{type:1,tracks:40,sectors:10,heads:1},[327680]:{type:1,tracks:40,sectors:8,heads:2},[368640]:{type:1,tracks:40,sectors:9,heads:2},[409600]:{type:1,tracks:40,sectors:10,heads:2},[737280]:{type:3,tracks:80,sectors:9,heads:2},[1228800]:{type:2,tracks:80,sectors:15,heads:2},[1474560]:{type:4,tracks:80,sectors:18,heads:2},[1763328]:{type:5,tracks:82,sectors:21,heads:2},
[2949120]:{type:5,tracks:80,sectors:36,heads:2},512:{type:1,tracks:1,sectors:1,heads:1}};let c=a.byteLength,d=b[c];d||(c=1474560<a.byteLength?2949120:1474560,d=b[c],b=new Uint8Array(c),b.set(new Uint8Array(a.buffer)),a=new t.SyncBuffer(b.buffer));this.sectors_per_track=d.sectors;this.number_of_heads=d.heads;this.number_of_cylinders=d.tracks;this.fda_image=a;this.dir=128;this.cpu.devices.rtc.cmos_write(16,d.type<<4)};
K.prototype.get_state=function(){var a=[];a[0]=this.bytes_expecting;a[1]=this.receiving_command;a[2]=this.receiving_index;a[4]=this.response_data;a[5]=this.response_index;a[6]=this.response_length;a[8]=this.status_reg0;a[9]=this.status_reg1;a[10]=this.status_reg2;a[11]=this.drive;a[12]=this.last_cylinder;a[13]=this.last_head;a[14]=this.last_sector;a[15]=this.dor;a[16]=this.sectors_per_track;a[17]=this.number_of_heads;a[18]=this.number_of_cylinders;return a};
K.prototype.set_state=function(a){this.bytes_expecting=a[0];this.receiving_command=a[1];this.receiving_index=a[2];this.next_command=a[3];this.response_data=a[4];this.response_index=a[5];this.response_length=a[6];this.status_reg0=a[8];this.status_reg1=a[9];this.status_reg2=a[10];this.drive=a[11];this.last_cylinder=a[12];this.last_head=a[13];this.last_sector=a[14];this.dor=a[15];this.sectors_per_track=a[16];this.number_of_heads=a[17];this.number_of_cylinders=a[18]};K.prototype.port3F0_read=function(){return 0};
K.prototype.port3F4_read=function(){var a=128;this.response_index<this.response_length&&(a|=80);0===(this.dor&8)&&(a|=32);return a};K.prototype.port3F7_read=function(){return this.dir};K.prototype.port3F5_read=function(){return this.response_index<this.response_length?(this.cpu.device_lower_irq(6),this.response_data[this.response_index++]):255};K.prototype.port3F4_write=function(a){B(a);a&128&&(this.status_reg0=192,this.cpu.device_raise_irq(6))};
K.prototype.port3F5_write=function(a){pa("3F5 write "+B(a),8192);if(0<this.bytes_expecting)this.receiving_command[this.receiving_index++]=a,this.bytes_expecting--,0===this.bytes_expecting&&this.next_command.call(this,this.receiving_command);else{switch(a){case 3:this.next_command=this.fix_drive_data;this.bytes_expecting=2;break;case 19:this.next_command=this.configure;this.bytes_expecting=3;break;case 4:this.next_command=this.check_drive_status;this.bytes_expecting=1;break;case 5:case 69:case 197:this.next_command=
function(b){this.do_sector(!0,b)};this.bytes_expecting=8;break;case 6:case 70:case 198:case 230:this.next_command=function(b){this.do_sector(!1,b)};this.bytes_expecting=8;break;case 7:this.next_command=this.calibrate;this.bytes_expecting=1;break;case 8:this.check_interrupt_status();break;case 74:this.next_command=this.read_sector_id;this.bytes_expecting=1;break;case 15:this.bytes_expecting=2;this.next_command=this.seek;break;case 14:case 16:this.status_reg0=128;this.response_data[0]=this.status_reg0;
this.response_index=0;this.response_length=1;this.bytes_expecting=0;break;default:qa(!1,"Unimplemented floppy command call "+B(a))}this.receiving_index=0}};K.prototype.port3F2_read=function(){return this.dor};K.prototype.port3F2_write=function(a){4===(a&4)&&0===(this.dor&4)&&(this.status_reg0=192,this.cpu.device_raise_irq(6));B(a>>4);B(a);this.dor=a};K.prototype.check_drive_status=function(){this.status_reg1=this.fda_image?0:5;this.response_index=0;this.response_length=1;this.response_data[0]=0};
K.prototype.seek=function(a){if(0===(a[0]&3)){var b=a[1];a=a[0]>>2&1;b!==this.last_cylinder&&(this.dir=0);this.status_reg1=this.fda_image?0:5;this.status_reg0=32;this.last_cylinder=b;this.last_head=a}this.raise_irq()};K.prototype.calibrate=function(a){this.seek([a[0],0])};K.prototype.check_interrupt_status=function(){this.response_index=0;this.response_length=2;this.response_data[0]=this.status_reg0;this.response_data[1]=this.last_cylinder};
K.prototype.do_sector=function(a,b){var c=b[2],d=b[1],e=b[3],g=128<<b[4],f=b[5]-b[3]+1,k=((c+this.number_of_heads*d)*this.sectors_per_track+e-1)*g;B(k);B(f*g);this.fda_image?(this.status_reg1=0,a?this.dma.do_write(this.fda_image,k,f*g,2,this.done.bind(this,b,d,c,e)):this.dma.do_read(this.fda_image,k,f*g,2,this.done.bind(this,b,d,c,e))):this.status_reg1=5};
K.prototype.done=function(a,b,c,d,e){e||(d++,d>this.sectors_per_track&&(d=1,c++,c>=this.number_of_heads&&(c=0,b++)),b!==this.last_cylinder&&(this.dir=0),this.status_reg0=32,this.last_cylinder=b,this.last_head=c,this.last_sector=d,this.response_index=0,this.response_length=7,this.response_data[0]=c<<2|32,this.response_data[1]=0,this.response_data[2]=0,this.response_data[3]=b,this.response_data[4]=c,this.response_data[5]=d,this.response_data[6]=a[4],this.raise_irq())};
K.prototype.fix_drive_data=function(a){a.slice(0,this.bytes_expecting)};K.prototype.configure=function(a){a.slice(0,this.bytes_expecting)};K.prototype.read_sector_id=function(){this.response_index=0;this.response_length=7;this.response_data[0]=0;this.response_data[1]=0;this.response_data[2]=0;this.response_data[3]=0;this.response_data[4]=0;this.response_data[5]=0;this.response_data[6]=0;this.raise_irq()};K.prototype.raise_irq=function(){this.dor&8&&this.cpu.device_raise_irq(6)};D.prototype.mmap_read8=function(a){return this.memory_map_read8[a>>>17](a)};D.prototype.mmap_write8=function(a,b){this.memory_map_write8[a>>>17](a,b)};D.prototype.mmap_read16=function(a){var b=this.memory_map_read8[a>>>17];return b(a)|b(a+1|0)<<8};D.prototype.mmap_write16=function(a,b){var c=this.memory_map_write8[a>>>17];c(a,b&255);c(a+1|0,b>>8)};D.prototype.mmap_read32=function(a){return this.memory_map_read32[a>>>17](a)};
D.prototype.mmap_write32=function(a,b){this.memory_map_write32[a>>>17](a,b)};D.prototype.mmap_write64=function(a,b,c){var d=this.memory_map_write32[a>>>17];d(a,b);d(a+4,c)};D.prototype.mmap_write128=function(a,b,c,d,e){var g=this.memory_map_write32[a>>>17];g(a,b);g(a+4,c);g(a+8,d);g(a+12,e)};D.prototype.write_blob=function(a,b){a.length&&(this.in_mapped_range(b),this.in_mapped_range(b+a.length-1),this.jit_dirty_cache(b,b+a.length),this.mem8.set(a,b))};
D.prototype.read_blob=function(a,b){b&&(this.in_mapped_range(a),this.in_mapped_range(a+b-1));return this.mem8.subarray(a,a+b)};function L(a){this.cpu=a;this.channel_page=new Uint8Array(8);this.channel_pagehi=new Uint8Array(8);this.channel_addr=new Uint16Array(8);this.channel_addr_init=new Uint16Array(8);this.channel_count=new Uint16Array(8);this.channel_count_init=new Uint16Array(8);this.channel_mask=new Uint8Array(8);this.channel_mode=new Uint8Array(8);this.unmask_listeners=[];this.lsb_msb_flipflop=0;a=a.io;a.register_write(0,this,this.port_addr_write.bind(this,0));a.register_write(2,this,this.port_addr_write.bind(this,
1));a.register_write(4,this,this.port_addr_write.bind(this,2));a.register_write(6,this,this.port_addr_write.bind(this,3));a.register_write(1,this,this.port_count_write.bind(this,0));a.register_write(3,this,this.port_count_write.bind(this,1));a.register_write(5,this,this.port_count_write.bind(this,2));a.register_write(7,this,this.port_count_write.bind(this,3));a.register_read(0,this,this.port_addr_read.bind(this,0));a.register_read(2,this,this.port_addr_read.bind(this,1));a.register_read(4,this,this.port_addr_read.bind(this,
2));a.register_read(6,this,this.port_addr_read.bind(this,3));a.register_read(1,this,this.port_count_read.bind(this,0));a.register_read(3,this,this.port_count_read.bind(this,1));a.register_read(5,this,this.port_count_read.bind(this,2));a.register_read(7,this,this.port_count_read.bind(this,3));a.register_write(192,this,this.port_addr_write.bind(this,4));a.register_write(196,this,this.port_addr_write.bind(this,5));a.register_write(200,this,this.port_addr_write.bind(this,6));a.register_write(204,this,
this.port_addr_write.bind(this,7));a.register_write(194,this,this.port_count_write.bind(this,4));a.register_write(198,this,this.port_count_write.bind(this,5));a.register_write(202,this,this.port_count_write.bind(this,6));a.register_write(206,this,this.port_count_write.bind(this,7));a.register_read(192,this,this.port_addr_read.bind(this,4));a.register_read(196,this,this.port_addr_read.bind(this,5));a.register_read(200,this,this.port_addr_read.bind(this,6));a.register_read(204,this,this.port_addr_read.bind(this,
7));a.register_read(194,this,this.port_count_read.bind(this,4));a.register_read(198,this,this.port_count_read.bind(this,5));a.register_read(202,this,this.port_count_read.bind(this,6));a.register_read(206,this,this.port_count_read.bind(this,7));a.register_write(135,this,this.port_page_write.bind(this,0));a.register_write(131,this,this.port_page_write.bind(this,1));a.register_write(129,this,this.port_page_write.bind(this,2));a.register_write(130,this,this.port_page_write.bind(this,3));a.register_write(143,
this,this.port_page_write.bind(this,4));a.register_write(139,this,this.port_page_write.bind(this,5));a.register_write(137,this,this.port_page_write.bind(this,6));a.register_write(138,this,this.port_page_write.bind(this,7));a.register_read(135,this,this.port_page_read.bind(this,0));a.register_read(131,this,this.port_page_read.bind(this,1));a.register_read(129,this,this.port_page_read.bind(this,2));a.register_read(130,this,this.port_page_read.bind(this,3));a.register_read(143,this,this.port_page_read.bind(this,
4));a.register_read(139,this,this.port_page_read.bind(this,5));a.register_read(137,this,this.port_page_read.bind(this,6));a.register_read(138,this,this.port_page_read.bind(this,7));a.register_write(1159,this,this.port_pagehi_write.bind(this,0));a.register_write(1155,this,this.port_pagehi_write.bind(this,1));a.register_write(1153,this,this.port_pagehi_write.bind(this,2));a.register_write(1154,this,this.port_pagehi_write.bind(this,3));a.register_write(1163,this,this.port_pagehi_write.bind(this,5));
a.register_write(1161,this,this.port_pagehi_write.bind(this,6));a.register_write(1162,this,this.port_pagehi_write.bind(this,7));a.register_read(1159,this,this.port_pagehi_read.bind(this,0));a.register_read(1155,this,this.port_pagehi_read.bind(this,1));a.register_read(1153,this,this.port_pagehi_read.bind(this,2));a.register_read(1154,this,this.port_pagehi_read.bind(this,3));a.register_read(1163,this,this.port_pagehi_read.bind(this,5));a.register_read(1161,this,this.port_pagehi_read.bind(this,6));a.register_read(1162,
this,this.port_pagehi_read.bind(this,7));a.register_write(10,this,this.port_singlemask_write.bind(this,0));a.register_write(212,this,this.port_singlemask_write.bind(this,4));a.register_write(15,this,this.port_multimask_write.bind(this,0));a.register_write(222,this,this.port_multimask_write.bind(this,4));a.register_read(15,this,this.port_multimask_read.bind(this,0));a.register_read(222,this,this.port_multimask_read.bind(this,4));a.register_write(11,this,this.port_mode_write.bind(this,0));a.register_write(214,
this,this.port_mode_write.bind(this,4));a.register_write(12,this,this.portC_write);a.register_write(216,this,this.portC_write)}L.prototype.get_state=function(){return[this.channel_page,this.channel_pagehi,this.channel_addr,this.channel_addr_init,this.channel_count,this.channel_count_init,this.channel_mask,this.channel_mode,this.lsb_msb_flipflop]};
L.prototype.set_state=function(a){this.channel_page=a[0];this.channel_pagehi=a[1];this.channel_addr=a[2];this.channel_addr_init=a[3];this.channel_count=a[4];this.channel_count_init=a[5];this.channel_mask=a[6];this.channel_mode=a[7];this.lsb_msb_flipflop=a[8]};L.prototype.port_count_write=function(a,b){B(b);this.channel_count[a]=this.flipflop_get(this.channel_count[a],b,!1);this.channel_count_init[a]=this.flipflop_get(this.channel_count_init[a],b,!0)};
L.prototype.port_count_read=function(a){B(this.channel_count[a]);return this.flipflop_read(this.channel_count[a])};L.prototype.port_addr_write=function(a,b){B(b);this.channel_addr[a]=this.flipflop_get(this.channel_addr[a],b,!1);this.channel_addr_init[a]=this.flipflop_get(this.channel_addr_init[a],b,!0)};L.prototype.port_addr_read=function(a){B(this.channel_addr[a]);return this.flipflop_read(this.channel_addr[a])};L.prototype.port_pagehi_write=function(a,b){B(b);this.channel_pagehi[a]=b};
L.prototype.port_pagehi_read=function(a){return this.channel_pagehi[a]};L.prototype.port_page_write=function(a,b){B(b);this.channel_page[a]=b};L.prototype.port_page_read=function(a){return this.channel_page[a]};L.prototype.port_singlemask_write=function(a,b){this.update_mask((b&3)+a,b&4?1:0)};L.prototype.port_multimask_write=function(a,b){B(b);for(var c=0;4>c;c++)this.update_mask(a+c,b&1<<c)};
L.prototype.port_multimask_read=function(a){var b=0|this.channel_mask[a+0];b|=this.channel_mask[a+1]<<1;b|=this.channel_mask[a+2]<<2;b|=this.channel_mask[a+3]<<3;B(b);return b};L.prototype.port_mode_write=function(a,b){a=(b&3)+a;B(b);this.channel_mode[a]=b};L.prototype.portC_write=function(){this.lsb_msb_flipflop=0};L.prototype.on_unmask=function(a,b){this.unmask_listeners.push({fn:a,this_value:b})};
L.prototype.update_mask=function(a,b){if(this.channel_mask[a]!==b&&(this.channel_mask[a]=b,!b))for(b=0;b<this.unmask_listeners.length;b++)this.unmask_listeners[b].fn.call(this.unmask_listeners[b].this_value,a)};
L.prototype.do_read=function(a,b,c,d,e){var g=this.count_get_8bit(d),f=this.address_get_8bit(d);pa("to "+B(f)+" len "+B(g),16);c<g&&pa("DMA should read more than provided: "+B(c)+" "+B(g),16);if(b+g>a.byteLength)e(!0);else{var k=this.cpu;this.channel_addr[d]+=g;a.get(b,g,function(l){k.write_blob(l,f);e(!1)})}};
L.prototype.do_write=function(a,b,c,d,e){var g=this.channel_count[d]+1&65535,f=5<=d?2:1,k=g*f,l=this.address_get_8bit(d),m=!1,n=!1,p=this.channel_mode[d]&16;pa("to "+B(l)+" len "+B(k),16);c<k?(g=Math.floor(c/f),k=g*f,m=!0):c>k&&(n=!0);b+k>a.byteLength?e(!0):(this.channel_addr[d]+=g,this.channel_count[d]-=g,!m&&p&&(this.channel_addr[d]=this.channel_addr_init[d],this.channel_count[d]=this.channel_count_init[d]),a.set(b,this.cpu.mem8.subarray(l,l+k),()=>{n&&p?this.do_write(a,b+k,c-k,d,e):e(!1)}))};
L.prototype.address_get_8bit=function(a){var b=this.channel_addr[a];5<=a&&(b<<=1);b=b&65535|this.channel_page[a]<<16;return b|=this.channel_pagehi[a]<<24};L.prototype.count_get_8bit=function(a){var b=this.channel_count[a]+1;5<=a&&(b*=2);return b};L.prototype.flipflop_get=function(a,b,c){c||(this.lsb_msb_flipflop^=1);return this.lsb_msb_flipflop?a&-256|b:a&-65281|b<<8};L.prototype.flipflop_read=function(a){return(this.lsb_msb_flipflop^=1)?a&255:a>>8&255};function ta(a,b){this.cpu=a;this.bus=b;this.counter_start_time=new Float64Array(3);this.counter_start_value=new Uint16Array(3);this.counter_next_low=new Uint8Array(4);this.counter_enabled=new Uint8Array(4);this.counter_mode=new Uint8Array(4);this.counter_read_mode=new Uint8Array(4);this.counter_latch=new Uint8Array(4);this.counter_latch_value=new Uint16Array(3);this.counter_reload=new Uint16Array(3);a.io.register_read(97,this,function(){var c=C.microtick(),d=66.66666666666667*c&1;c=this.did_rollover(2,
c);return d<<4|c<<5});a.io.register_write(97,this,function(c){c&1?this.bus.send("pcspeaker-enable"):this.bus.send("pcspeaker-disable")});a.io.register_read(64,this,function(){return this.counter_read(0)});a.io.register_read(65,this,function(){return this.counter_read(1)});a.io.register_read(66,this,function(){return this.counter_read(2)});a.io.register_write(64,this,function(c){this.counter_write(0,c)});a.io.register_write(65,this,function(c){this.counter_write(1,c)});a.io.register_write(66,this,
function(c){this.counter_write(2,c);this.bus.send("pcspeaker-update",[this.counter_mode[2],this.counter_reload[2]])});a.io.register_write(67,this,this.port43_write)}ta.prototype.get_state=function(){var a=[];a[0]=this.counter_next_low;a[1]=this.counter_enabled;a[2]=this.counter_mode;a[3]=this.counter_read_mode;a[4]=this.counter_latch;a[5]=this.counter_latch_value;a[6]=this.counter_reload;a[7]=this.counter_start_time;a[8]=this.counter_start_value;return a};
ta.prototype.set_state=function(a){this.counter_next_low=a[0];this.counter_enabled=a[1];this.counter_mode=a[2];this.counter_read_mode=a[3];this.counter_latch=a[4];this.counter_latch_value=a[5];this.counter_reload=a[6];this.counter_start_time=a[7];this.counter_start_value=a[8]};
ta.prototype.timer=function(a,b){var c=100;b||(this.counter_enabled[0]&&this.did_rollover(0,a)?(this.counter_start_value[0]=this.get_counter_value(0,a),this.counter_start_time[0]=a,this.cpu.device_lower_irq(0),this.cpu.device_raise_irq(0),0===this.counter_mode[0]&&(this.counter_enabled[0]=0)):this.cpu.device_lower_irq(0),this.counter_enabled[0]&&(c=(this.counter_start_value[0]-Math.floor(1193.1816666*(a-this.counter_start_time[0])))/1193.1816666));return c};
ta.prototype.get_counter_value=function(a,b){if(!this.counter_enabled[a])return 0;b=this.counter_start_value[a]-Math.floor(1193.1816666*(b-this.counter_start_time[a]));a=this.counter_reload[a];b>=a?b%=a:0>b&&(b=b%a+a);return b};ta.prototype.did_rollover=function(a,b){b-=this.counter_start_time[a];return 0>b?!0:this.counter_start_value[a]<Math.floor(1193.1816666*b)};
ta.prototype.counter_read=function(a){var b=this.counter_latch[a];if(b)return this.counter_latch[a]--,2===b?this.counter_latch_value[a]&255:this.counter_latch_value[a]>>8;b=this.counter_next_low[a];3===this.counter_mode[a]&&(this.counter_next_low[a]^=1);a=this.get_counter_value(a,C.microtick());return b?a&255:a>>8};
ta.prototype.counter_write=function(a,b){this.counter_reload[a]=this.counter_next_low[a]?this.counter_reload[a]&-256|b:this.counter_reload[a]&255|b<<8;3===this.counter_read_mode[a]&&this.counter_next_low[a]||(this.counter_reload[a]||(this.counter_reload[a]=65535),this.counter_start_value[a]=this.counter_reload[a],this.counter_enabled[a]=!0,this.counter_start_time[a]=C.microtick(),B(this.counter_reload[a]));3===this.counter_read_mode[a]&&(this.counter_next_low[a]^=1)};
ta.prototype.port43_write=function(a){var b=a>>1&7,c=a>>6&3;a=a>>4&3;3!==c&&(0===a?(this.counter_latch[c]=2,b=this.get_counter_value(c,C.microtick()),this.counter_latch_value[c]=b?b-1:0):(6<=b&&(b&=-5),this.counter_next_low[c]=1===a?0:1,0===c&&this.cpu.device_lower_irq(0),0!==b&&3!==b&&2!==b&&B(b),this.counter_mode[c]=b,this.counter_read_mode[c]=a,2===c&&this.bus.send("pcspeaker-update",[this.counter_mode[2],this.counter_reload[2]])))};ta.prototype.dump=function(){};const ua=Uint32Array.from([655360,655360,720896,753664]),va=Uint32Array.from([131072,65536,32768,32768]);
function M(a,b,c,d){this.cpu=a;this.bus=b;this.screen=c;this.vga_memory_size=d;this.cursor_address=0;this.cursor_scanline_start=14;this.cursor_scanline_end=15;this.max_cols=80;this.max_rows=25;this.virtual_height=this.virtual_width=this.screen_height=this.screen_width=0;this.layers=[];this.start_address_latched=this.start_address=0;this.crtc=new Uint8Array(25);this.line_compare=this.offset_register=this.preset_row_scan=this.underline_location_register=this.vertical_blank_start=this.vertical_display_enable_end=
this.horizontal_blank_start=this.horizontal_display_enable_end=this.crtc_mode=0;this.graphical_mode=!1;this.vga256_palette=new Int32Array(256);this.latch_dword=0;this.svga_version=45253;this.svga_height=this.svga_width=0;this.svga_enabled=!1;this.svga_bpp=32;this.svga_offset_y=this.svga_offset_x=this.svga_offset=this.svga_bank_offset=0;this.vga_memory_size=void 0===this.vga_memory_size||262144>this.vga_memory_size?262144:268435456<this.vga_memory_size?268435456:t.round_up_to_next_power_of_2(this.vga_memory_size);
this.pci_space=[52,18,17,17,3,1,0,0,0,0,0,3,0,0,0,0,8,14680064,57344,224,0,0,0,0,0,0,191,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,244,26,0,17,0,0,190,254,0,0,0,0,0,0,0,0,0,0,0,0];this.pci_id=144;this.pci_bars=[{size:this.vga_memory_size}];this.pci_rom_size=65536;this.pci_rom_address=4272947200;this.name="vga";this.dac_state=this.dac_color_index_read=this.dac_color_index_write=this.index_crtc=0;this.dac_mask=255;this.dac_map=new Uint8Array(16);this.attribute_controller_index=-1;this.palette_source=32;this.color_select=
this.horizontal_panning=this.color_plane_enable=this.attribute_mode=0;this.sequencer_index=-1;this.plane_write_bm=15;this.clocking_mode=this.sequencer_memory_mode=0;this.graphics_index=-1;this.planar_rotate_reg=this.planar_mode=this.plane_read=this.character_map_select=0;this.planar_bitmap=255;this.max_scan_line=this.color_dont_care=this.color_compare=this.miscellaneous_graphics_register=this.planar_setreset_enable=this.planar_setreset=0;this.port_3DA_value=this.miscellaneous_output_register=255;
this.font_page_ab_enabled=!1;b=a.io;b.register_write(960,this,this.port3C0_write);b.register_read(960,this,this.port3C0_read,this.port3C0_read16);b.register_read(961,this,this.port3C1_read);b.register_write(962,this,this.port3C2_write);b.register_write_consecutive(964,this,this.port3C4_write,this.port3C5_write);b.register_read(964,this,this.port3C4_read);b.register_read(965,this,this.port3C5_read);b.register_write_consecutive(974,this,this.port3CE_write,this.port3CF_write);b.register_read(974,this,
this.port3CE_read);b.register_read(975,this,this.port3CF_read);b.register_read(966,this,this.port3C6_read);b.register_write(966,this,this.port3C6_write);b.register_write(967,this,this.port3C7_write);b.register_read(967,this,this.port3C7_read);b.register_write(968,this,this.port3C8_write);b.register_read(968,this,this.port3C8_read);b.register_write(969,this,this.port3C9_write);b.register_read(969,this,this.port3C9_read);b.register_read(972,this,this.port3CC_read);b.register_write(980,this,this.port3D4_write,
this.port3D4_write16);b.register_write(981,this,this.port3D5_write,this.port3D5_write16);b.register_read(980,this,this.port3D4_read);b.register_read(981,this,this.port3D5_read,this.port3D5_read16);b.register_write(948,this,this.port3D4_write,this.port3D4_write16);b.register_write(949,this,this.port3D5_write,this.port3D5_write16);b.register_read(948,this,this.port3D4_read);b.register_read(949,this,this.port3D5_read,this.port3D5_read16);b.register_read(970,this,function(){return 0});b.register_read(986,
this,this.port3DA_read);b.register_read(954,this,this.port3DA_read);this.dispi_index=-1;this.dispi_enable_value=0;b.register_write(462,this,void 0,this.port1CE_write);b.register_write(463,this,void 0,this.port1CF_write);b.register_read(463,this,void 0,this.port1CF_read);c=a.svga_allocate_memory(this.vga_memory_size)>>>0;this.svga_memory=t.view(Uint8Array,a.wasm_memory,c,this.vga_memory_size);this.diff_addr_min=this.vga_memory_size;this.diff_addr_max=0;this.diff_plot_min=this.vga_memory_size;this.diff_plot_max=
0;this.image_data=null;this.vga_memory=new Uint8Array(262144);this.plane0=new Uint8Array(this.vga_memory.buffer,0,65536);this.plane1=new Uint8Array(this.vga_memory.buffer,65536,65536);this.plane2=new Uint8Array(this.vga_memory.buffer,131072,65536);this.plane3=new Uint8Array(this.vga_memory.buffer,196608,65536);this.pixel_buffer=new Uint8Array(524288);b.mmap_register(655360,131072,e=>this.vga_memory_read(e),(e,g)=>this.vga_memory_write(e,g));a.devices.pci.register_device(this)}
M.prototype.get_state=function(){var a=[];a[0]=this.vga_memory_size;a[1]=this.cursor_address;a[2]=this.cursor_scanline_start;a[3]=this.cursor_scanline_end;a[4]=this.max_cols;a[5]=this.max_rows;a[6]=this.vga_memory;a[7]=this.dac_state;a[8]=this.start_address;a[9]=this.graphical_mode;a[10]=this.vga256_palette;a[11]=this.latch_dword;a[12]=this.color_compare;a[13]=this.color_dont_care;a[14]=this.miscellaneous_graphics_register;a[15]=this.svga_width;a[16]=this.svga_height;a[17]=this.crtc_mode;a[18]=this.svga_enabled;
a[19]=this.svga_bpp;a[20]=this.svga_bank_offset;a[21]=this.svga_offset;a[22]=this.index_crtc;a[23]=this.dac_color_index_write;a[24]=this.dac_color_index_read;a[25]=this.dac_map;a[26]=this.sequencer_index;a[27]=this.plane_write_bm;a[28]=this.sequencer_memory_mode;a[29]=this.graphics_index;a[30]=this.plane_read;a[31]=this.planar_mode;a[32]=this.planar_rotate_reg;a[33]=this.planar_bitmap;a[34]=this.max_scan_line;a[35]=this.miscellaneous_output_register;a[36]=this.port_3DA_value;a[37]=this.dispi_index;
a[38]=this.dispi_enable_value;a[39]=this.svga_memory;a[41]=this.attribute_controller_index;a[42]=this.offset_register;a[43]=this.planar_setreset;a[44]=this.planar_setreset_enable;a[45]=this.start_address_latched;a[46]=this.crtc;a[47]=this.horizontal_display_enable_end;a[48]=this.horizontal_blank_start;a[49]=this.vertical_display_enable_end;a[50]=this.vertical_blank_start;a[51]=this.underline_location_register;a[52]=this.preset_row_scan;a[53]=this.offset_register;a[54]=this.palette_source;a[55]=this.attribute_mode;
a[56]=this.color_plane_enable;a[57]=this.horizontal_panning;a[58]=this.color_select;a[59]=this.clocking_mode;a[60]=this.line_compare;a[61]=this.pixel_buffer;a[62]=this.dac_mask;a[63]=this.character_map_select;a[64]=this.font_page_ab_enabled;return a};
M.prototype.set_state=function(a){this.vga_memory_size=a[0];this.cursor_address=a[1];this.cursor_scanline_start=a[2];this.cursor_scanline_end=a[3];this.max_cols=a[4];this.max_rows=a[5];a[6]&&this.vga_memory.set(a[6]);this.dac_state=a[7];this.start_address=a[8];this.graphical_mode=a[9];this.vga256_palette=a[10];this.latch_dword=a[11];this.color_compare=a[12];this.color_dont_care=a[13];this.miscellaneous_graphics_register=a[14];this.svga_width=a[15];this.svga_height=a[16];this.crtc_mode=a[17];this.svga_enabled=
a[18];this.svga_bpp=a[19];this.svga_bank_offset=a[20];this.svga_offset=a[21];this.index_crtc=a[22];this.dac_color_index_write=a[23];this.dac_color_index_read=a[24];this.dac_map=a[25];this.sequencer_index=a[26];this.plane_write_bm=a[27];this.sequencer_memory_mode=a[28];this.graphics_index=a[29];this.plane_read=a[30];this.planar_mode=a[31];this.planar_rotate_reg=a[32];this.planar_bitmap=a[33];this.max_scan_line=a[34];this.miscellaneous_output_register=a[35];this.port_3DA_value=a[36];this.dispi_index=
a[37];this.dispi_enable_value=a[38];this.svga_memory.set(a[39]);this.attribute_controller_index=a[41];this.offset_register=a[42];this.planar_setreset=a[43];this.planar_setreset_enable=a[44];this.start_address_latched=a[45];this.crtc.set(a[46]);this.horizontal_display_enable_end=a[47];this.horizontal_blank_start=a[48];this.vertical_display_enable_end=a[49];this.vertical_blank_start=a[50];this.underline_location_register=a[51];this.preset_row_scan=a[52];this.offset_register=a[53];this.palette_source=
a[54];this.attribute_mode=a[55];this.color_plane_enable=a[56];this.horizontal_panning=a[57];this.color_select=a[58];this.clocking_mode=a[59];this.line_compare=a[60];a[61]&&this.pixel_buffer.set(a[61]);this.dac_mask=void 0===a[62]?255:a[62];this.character_map_select=void 0===a[63]?0:a[63];this.font_page_ab_enabled=void 0===a[64]?0:a[64];this.screen.set_mode(this.graphical_mode);this.graphical_mode?(this.screen_height=this.screen_width=0,this.svga_enabled?(this.set_size_graphical(this.svga_width,this.svga_height,
this.svga_width,this.svga_height,this.svga_bpp),this.update_layers()):(this.update_vga_size(),this.update_layers(),this.complete_replot())):(this.set_font_bitmap(!0),this.set_size_text(this.max_cols,this.max_rows),this.set_font_page(),this.update_cursor_scanline(),this.update_cursor());this.complete_redraw()};
M.prototype.vga_memory_read=function(a){if(this.svga_enabled)return this.cpu.read8((a-655360|this.svga_bank_offset)+3758096384|0);var b=this.miscellaneous_graphics_register>>2&3;a-=ua[b];if(0>a||a>=va[b])return B(a),0;this.latch_dword=this.plane0[a];this.latch_dword|=this.plane1[a]<<8;this.latch_dword|=this.plane2[a]<<16;this.latch_dword|=this.plane3[a]<<24;if(this.planar_mode&8)return b=255,this.color_dont_care&1&&(b&=this.plane0[a]^~(this.color_compare&1?255:0)),this.color_dont_care&2&&(b&=this.plane1[a]^
~(this.color_compare&2?255:0)),this.color_dont_care&4&&(b&=this.plane2[a]^~(this.color_compare&4?255:0)),this.color_dont_care&8&&(b&=this.plane3[a]^~(this.color_compare&8?255:0)),b;b=this.plane_read;this.graphical_mode?this.sequencer_memory_mode&8?(b=a&3,a&=-4):this.planar_mode&16&&(b=a&1,a&=-2):b&=3;return this.vga_memory[b<<16|a]};
M.prototype.vga_memory_write=function(a,b){if(this.svga_enabled)this.cpu.write8((a-655360|this.svga_bank_offset)+3758096384|0,b);else{var c=this.miscellaneous_graphics_register>>2&3;a-=ua[c];0>a||a>=va[c]?(B(a),B(b)):this.graphical_mode?this.vga_memory_write_graphical(a,b):this.plane_write_bm&3?this.vga_memory_write_text_mode(a,b):this.plane_write_bm&4&&(this.plane2[a]=b)}};
M.prototype.vga_memory_write_graphical=function(a,b){var c=this.planar_mode&3,d=this.apply_feed(this.planar_bitmap),e=this.apply_expand(this.planar_setreset),g=this.apply_expand(this.planar_setreset_enable);switch(c){case 0:b=this.apply_rotate(b);var f=this.apply_feed(b);f=this.apply_setreset(f,g);f=this.apply_logical(f,this.latch_dword);f=this.apply_bitmask(f,d);break;case 1:f=this.latch_dword;break;case 2:f=this.apply_expand(b);f=this.apply_logical(f,this.latch_dword);f=this.apply_bitmask(f,d);
break;case 3:b=this.apply_rotate(b),d&=this.apply_feed(b),f=this.apply_bitmask(e,d)}b=15;switch(this.sequencer_memory_mode&12){case 0:b=5<<(a&1);a&=-2;break;case 8:case 12:b=1<<(a&3),a&=-4}b&=this.plane_write_bm;b&1&&(this.plane0[a]=f>>0&255);b&2&&(this.plane1[a]=f>>8&255);b&4&&(this.plane2[a]=f>>16&255);b&8&&(this.plane3[a]=f>>24&255);a=this.vga_addr_to_pixel(a);this.partial_replot(a,a+7)};M.prototype.apply_feed=function(a){return a|a<<8|a<<16|a<<24};
M.prototype.apply_expand=function(a){return(a&1?255:0)|(a&2?255:0)<<8|(a&4?255:0)<<16|(a&8?255:0)<<24};M.prototype.apply_rotate=function(a){return(a|a<<8)>>>(this.planar_rotate_reg&7)&255};M.prototype.apply_setreset=function(a,b){var c=this.apply_expand(this.planar_setreset);return(a|b&c)&(~b|c)};M.prototype.apply_logical=function(a,b){switch(this.planar_rotate_reg&24){case 8:return a&b;case 16:return a|b;case 24:return a^b}return a};M.prototype.apply_bitmask=function(a,b){return b&a|~b&this.latch_dword};
M.prototype.text_mode_redraw=function(){const a=this.scan_line_to_screen_row(this.line_compare),b=Math.max(0,2*(2*this.offset_register-this.max_cols)),c=this.attribute_mode&8,d=this.font_page_ab_enabled?7:15,e=c?7:15,g=this.screen.FLAG_BLINKING,f=this.screen.FLAG_FONT_PAGE_B;let k=this.start_address<<1;for(let l=0;l<this.max_rows;l++){l===a&&(k=0);for(let m=0;m<this.max_cols;m++){const n=this.vga_memory[k],p=this.vga_memory[k|1],q=(c&&p&128?g:0)|(!this.font_page_ab_enabled||p&8?0:f);this.bus.send("screen-put-char",
[l,m,n]);this.screen.put_char(l,m,n,q,this.vga256_palette[this.dac_mask&this.dac_map[p>>4&e]],this.vga256_palette[this.dac_mask&this.dac_map[p&d]]);k+=2}k+=b}};
M.prototype.vga_memory_write_text_mode=function(a,b){this.vga_memory[a]=b;var c=Math.max(this.max_cols,2*this.offset_register);let d;if(a>>1>=this.start_address){var e=(a>>1)-this.start_address;d=e/c|0;c=e%c}else e=a>>1,d=(e/c|0)+this.scan_line_to_screen_row(this.line_compare),c=e%c;if(!(c>=this.max_cols||d>=this.max_rows)){a&1?(e=b,b=this.vga_memory[a&-2]):e=this.vga_memory[a|1];var g=this.attribute_mode&8;a=(g&&e&128?this.screen.FLAG_BLINKING:0)|(!this.font_page_ab_enabled||e&8?0:this.screen.FLAG_FONT_PAGE_B);
var f=this.font_page_ab_enabled?7:15;g=g?7:15;this.bus.send("screen-put-char",[d,c,b]);this.screen.put_char(d,c,b,a,this.vga256_palette[this.dac_mask&this.dac_map[e>>4&g]],this.vga256_palette[this.dac_mask&this.dac_map[e&f]])}};
M.prototype.update_cursor=function(){var a=Math.max(this.max_cols,2*this.offset_register);let b;this.cursor_address>=this.start_address?(b=(this.cursor_address-this.start_address)/a|0,a=(this.cursor_address-this.start_address)%a):(b=(this.cursor_address/a|0)+this.scan_line_to_screen_row(this.line_compare),a=this.cursor_address%a);this.screen.update_cursor(b,a)};
M.prototype.complete_redraw=function(){this.graphical_mode?this.svga_enabled?this.cpu.svga_mark_dirty():(this.diff_addr_min=0,this.diff_addr_max=524288):this.text_mode_redraw()};M.prototype.complete_replot=function(){this.graphical_mode&&!this.svga_enabled&&(this.diff_plot_min=0,this.diff_plot_max=524288,this.complete_redraw())};M.prototype.partial_redraw=function(a,b){a<this.diff_addr_min&&(this.diff_addr_min=a);b>this.diff_addr_max&&(this.diff_addr_max=b)};
M.prototype.partial_replot=function(a,b){a<this.diff_plot_min&&(this.diff_plot_min=a);b>this.diff_plot_max&&(this.diff_plot_max=b);this.partial_redraw(a,b)};M.prototype.reset_diffs=function(){this.diff_addr_min=this.vga_memory_size;this.diff_addr_max=0;this.diff_plot_min=this.vga_memory_size;this.diff_plot_max=0};M.prototype.destroy=function(){};M.prototype.vga_bytes_per_line=function(){var a=this.offset_register<<2;this.underline_location_register&64?a<<=1:this.crtc_mode&64&&(a>>>=1);return a};
M.prototype.vga_addr_shift_count=function(){var a=128+(~this.underline_location_register&this.crtc_mode&64);a-=this.underline_location_register&64;a-=this.attribute_mode&64;return a>>>6};
M.prototype.vga_addr_to_pixel=function(a){var b=this.vga_addr_shift_count();if(~this.crtc_mode&3){var c=a-this.start_address;c&=this.crtc_mode<<13|-24577;c<<=b;var d=c/this.virtual_width|0;c%=this.virtual_width;switch(this.crtc_mode&3){case 2:d=d<<1|a>>13&1;break;case 1:d=d<<1|a>>14&1;break;case 0:d=d<<2|a>>13&3}return d*this.virtual_width+c+(this.start_address<<b)}return a<<b};
M.prototype.scan_line_to_screen_row=function(a){this.max_scan_line&128&&(a>>>=1);a=Math.ceil(a/(1+(this.max_scan_line&31)));this.crtc_mode&1||(a<<=1);this.crtc_mode&2||(a<<=1);return a};M.prototype.set_size_text=function(a,b){this.max_cols=a;this.max_rows=b;this.screen.set_size_text(a,b);this.bus.send("screen-set-size",[a,b,0])};
M.prototype.set_size_graphical=function(a,b,c,d,e){c=Math.max(c,1);d=Math.max(d,1);if(this.screen_width!==a||this.screen_height!==b||this.virtual_width!==c||this.virtual_height!==d){this.screen_width=a;this.screen_height=b;this.virtual_width=c;this.virtual_height=d;if("undefined"!==typeof ImageData){const g=c*d,f=this.cpu.svga_allocate_dest_buffer(g)>>>0;this.dest_buffet_offset=f;this.image_data=new ImageData(new Uint8ClampedArray(this.cpu.wasm_memory.buffer,f,4*g),c,d);this.cpu.svga_mark_dirty()}this.screen.set_size_graphical(a,
b,c,d);this.bus.send("screen-set-size",[a,b,e])}};
M.prototype.update_vga_size=function(){if(!this.svga_enabled){var a=Math.min(1+this.horizontal_display_enable_end,this.horizontal_blank_start),b=Math.min(1+this.vertical_display_enable_end,this.vertical_blank_start);if(a&&b)if(this.graphical_mode){a<<=3;var c=this.offset_register<<4;this.attribute_mode&64&&(a>>>=1,c>>>=1);b=this.scan_line_to_screen_row(b);var d=va[0];const e=this.vga_bytes_per_line();this.set_size_graphical(a,b,c,e?Math.ceil(d/e):b,8);this.update_vertical_retrace();this.update_layers()}else this.max_scan_line&
128&&(b>>>=1),c=b/(1+(this.max_scan_line&31))|0,a&&c&&this.set_size_text(a,c)}};
M.prototype.update_layers=function(){this.graphical_mode||this.text_mode_redraw();if(this.svga_enabled)this.layers=[];else if(this.virtual_width&&this.screen_width)if(!this.palette_source||this.clocking_mode&32)this.layers=[],this.screen.clear_screen();else{var a=this.start_address_latched,b=this.horizontal_panning;this.attribute_mode&64&&(b>>>=1);var c=this.preset_row_scan>>5&3,d=this.vga_addr_to_pixel(a+c);a=d/this.virtual_width|0;var e=d%this.virtual_width+b;d=this.scan_line_to_screen_row(1+this.line_compare);
d=Math.min(d,this.screen_height);var g=this.screen_height-d;this.layers=[];e=-e;for(var f=0;e<this.screen_width;e+=this.virtual_width,f++)this.layers.push({image_data:this.image_data,screen_x:e,screen_y:0,buffer_x:0,buffer_y:a+f,buffer_width:this.virtual_width,buffer_height:d});a=0;this.attribute_mode&32||(a=this.vga_addr_to_pixel(c)+b);e=-a;for(f=0;e<this.screen_width;e+=this.virtual_width,f++)this.layers.push({image_data:this.image_data,screen_x:e,screen_y:d,buffer_x:0,buffer_y:f,buffer_width:this.virtual_width,
buffer_height:g})}};M.prototype.update_vertical_retrace=function(){this.port_3DA_value|=8;this.start_address_latched!==this.start_address&&(this.start_address_latched=this.start_address,this.update_layers())};M.prototype.update_cursor_scanline=function(){var a=this.max_scan_line&31;const b=Math.min(a,this.cursor_scanline_start&31);a=Math.min(a,this.cursor_scanline_end&31);this.screen.update_cursor_scanline(b,a,!(this.cursor_scanline_start&32)&&b<a)};
M.prototype.port3C0_write=function(a){if(-1===this.attribute_controller_index)B(a),this.attribute_controller_index=a&31,B(this.attribute_controller_index),this.palette_source!==(a&32)&&(this.palette_source=a&32,this.update_layers());else{if(16>this.attribute_controller_index)B(this.attribute_controller_index),B(a),this.dac_map[this.attribute_controller_index]=a,this.attribute_mode&64||this.complete_redraw();else switch(this.attribute_controller_index){case 16:B(a);if(this.attribute_mode!==a){var b=
this.attribute_mode;this.attribute_mode=a;const c=0!==(a&1);this.svga_enabled||this.graphical_mode===c||(this.graphical_mode=c,this.screen.set_mode(this.graphical_mode));(b^a)&64&&this.complete_replot();this.update_vga_size();this.complete_redraw();this.set_font_bitmap(!1)}break;case 18:B(a);this.color_plane_enable!==a&&(this.color_plane_enable=a,this.complete_redraw());break;case 19:B(a);this.horizontal_panning!==a&&(this.horizontal_panning=a&15,this.update_layers());break;case 20:B(a);this.color_select!==
a&&(this.color_select=a,this.complete_redraw());break;default:B(this.attribute_controller_index),B(a)}this.attribute_controller_index=-1}};M.prototype.port3C0_read=function(){return(this.attribute_controller_index|this.palette_source)&255};M.prototype.port3C0_read16=function(){return this.port3C0_read()|this.port3C1_read()<<8&65280};
M.prototype.port3C1_read=function(){if(16>this.attribute_controller_index)return B(this.attribute_controller_index),B(this.dac_map[this.attribute_controller_index]),this.dac_map[this.attribute_controller_index]&255;switch(this.attribute_controller_index){case 16:return B(this.attribute_mode),this.attribute_mode;case 18:return B(this.color_plane_enable),this.color_plane_enable;case 19:return B(this.horizontal_panning),this.horizontal_panning;case 20:return B(this.color_select),this.color_select;default:B(this.attribute_controller_index)}return 255};
M.prototype.port3C2_write=function(a){B(a);this.miscellaneous_output_register=a};M.prototype.port3C4_write=function(a){this.sequencer_index=a};M.prototype.port3C4_read=function(){return this.sequencer_index};
M.prototype.port3C5_write=function(a){switch(this.sequencer_index){case 1:B(a);var b=this.clocking_mode;this.clocking_mode=a;(b^a)&32&&this.update_layers();this.set_font_bitmap(!1);break;case 2:B(a);b=this.plane_write_bm;this.plane_write_bm=a;this.graphical_mode||!(b&4)||this.plane_write_bm&4||this.set_font_bitmap(!0);break;case 3:B(a);b=this.character_map_select;this.character_map_select=a;this.graphical_mode||b===a||this.set_font_page();break;case 4:B(a);this.sequencer_memory_mode=a;break;default:B(this.sequencer_index),
B(a)}};M.prototype.port3C5_read=function(){B(this.sequencer_index);switch(this.sequencer_index){case 1:return this.clocking_mode;case 2:return this.plane_write_bm;case 3:return this.character_map_select;case 4:return this.sequencer_memory_mode;case 6:return 18}return 0};M.prototype.port3C6_write=function(a){this.dac_mask!==a&&(this.dac_mask=a,this.complete_redraw())};M.prototype.port3C6_read=function(){return this.dac_mask};
M.prototype.port3C7_write=function(a){B(a);this.dac_color_index_read=3*a;this.dac_state&=0};M.prototype.port3C7_read=function(){return this.dac_state};M.prototype.port3C8_write=function(a){this.dac_color_index_write=3*a;this.dac_state|=3};M.prototype.port3C8_read=function(){return this.dac_color_index_write/3&255};
M.prototype.port3C9_write=function(a){var b=this.dac_color_index_write/3|0,c=this.dac_color_index_write%3,d=this.vga256_palette[b];if(0===(this.dispi_enable_value&32)){a&=63;const e=a&1;a=a<<2|e<<1|e}0===c?d=d&-16711681|a<<16:1===c?d=d&-65281|a<<8:(d=d&-256|a,B(b),B(d));this.vga256_palette[b]!==d&&(this.vga256_palette[b]=d,this.complete_redraw());this.dac_color_index_write++};
M.prototype.port3C9_read=function(){var a=this.vga256_palette[this.dac_color_index_read/3|0]>>8*(2-this.dac_color_index_read%3)&255;this.dac_color_index_read++;return this.dispi_enable_value&32?a:a>>2};M.prototype.port3CC_read=function(){return this.miscellaneous_output_register};M.prototype.port3CE_write=function(a){this.graphics_index=a};M.prototype.port3CE_read=function(){return this.graphics_index};
M.prototype.port3CF_write=function(a){switch(this.graphics_index){case 0:this.planar_setreset=a;B(a);break;case 1:this.planar_setreset_enable=a;B(a);break;case 2:this.color_compare=a;B(a);break;case 3:this.planar_rotate_reg=a;B(a);break;case 4:this.plane_read=a;B(a);break;case 5:var b=this.planar_mode;this.planar_mode=a;B(a);(b^a)&96&&this.complete_replot();break;case 6:B(a);this.miscellaneous_graphics_register!==a&&(this.miscellaneous_graphics_register=a,this.update_vga_size());break;case 7:this.color_dont_care=
a;B(a);break;case 8:this.planar_bitmap=a;B(a);break;default:B(this.graphics_index),B(a)}};M.prototype.port3CF_read=function(){B(this.graphics_index);switch(this.graphics_index){case 0:return this.planar_setreset;case 1:return this.planar_setreset_enable;case 2:return this.color_compare;case 3:return this.planar_rotate_reg;case 4:return this.plane_read;case 5:return this.planar_mode;case 6:return this.miscellaneous_graphics_register;case 7:return this.color_dont_care;case 8:return this.planar_bitmap}return 0};
M.prototype.port3D4_write=function(a){this.index_crtc=a};M.prototype.port3D4_write16=function(a){this.port3D4_write(a&255);this.port3D5_write(a>>8&255)};M.prototype.port3D4_read=function(){return this.index_crtc};
M.prototype.port3D5_write=function(a){switch(this.index_crtc){case 1:B(a);this.horizontal_display_enable_end!==a&&(this.horizontal_display_enable_end=a,this.update_vga_size());break;case 2:this.horizontal_blank_start!==a&&(this.horizontal_blank_start=a,this.update_vga_size());break;case 7:B(a);var b=this.vertical_display_enable_end;this.vertical_display_enable_end&=255;this.vertical_display_enable_end=this.vertical_display_enable_end|a<<3&512|a<<7&256;b!==this.vertical_display_enable_end&&this.update_vga_size();
this.line_compare=this.line_compare&767|a<<4&256;b=this.vertical_blank_start;this.vertical_blank_start=this.vertical_blank_start&767|a<<5&256;b!==this.vertical_blank_start&&this.update_vga_size();this.update_layers();break;case 8:B(a);this.preset_row_scan=a;this.update_layers();break;case 9:B(a);var c=this.max_scan_line;this.max_scan_line=a;this.line_compare=this.line_compare&511|a<<3&512;b=this.vertical_blank_start;this.vertical_blank_start=this.vertical_blank_start&511|a<<4&512;((c^this.max_scan_line)&
159||b!==this.vertical_blank_start)&&this.update_vga_size();this.update_cursor_scanline();this.update_layers();this.set_font_bitmap(!1);break;case 10:B(a);this.cursor_scanline_start=a;this.update_cursor_scanline();break;case 11:B(a);this.cursor_scanline_end=a;this.update_cursor_scanline();break;case 12:(this.start_address>>8&255)!==a&&(this.start_address=this.start_address&255|a<<8,this.update_layers(),~this.crtc_mode&3&&this.complete_replot());B(a);B(this.start_address,4);break;case 13:(this.start_address&
255)!==a&&(this.start_address=this.start_address&65280|a,this.update_layers(),~this.crtc_mode&3&&this.complete_replot());B(a);B(this.start_address,4);break;case 14:B(a);this.cursor_address=this.cursor_address&255|a<<8;this.update_cursor();break;case 15:B(a);this.cursor_address=this.cursor_address&65280|a;this.update_cursor();break;case 18:B(a);(this.vertical_display_enable_end&255)!==a&&(this.vertical_display_enable_end=this.vertical_display_enable_end&768|a,this.update_vga_size());break;case 19:B(a);
this.offset_register!==a&&(this.offset_register=a,this.update_vga_size(),~this.crtc_mode&3&&this.complete_replot());break;case 20:B(a);this.underline_location_register!==a&&(b=this.underline_location_register,this.underline_location_register=a,this.update_vga_size(),(b^a)&64&&this.complete_replot());break;case 21:B(a);(this.vertical_blank_start&255)!==a&&(this.vertical_blank_start=this.vertical_blank_start&768|a,this.update_vga_size());break;case 23:B(a);this.crtc_mode!==a&&(b=this.crtc_mode,this.crtc_mode=
a,this.update_vga_size(),(b^a)&67&&this.complete_replot());break;case 24:B(a);this.line_compare=this.line_compare&768|a;this.update_layers();break;default:this.index_crtc<this.crtc.length&&(this.crtc[this.index_crtc]=a),B(this.index_crtc),B(a)}};M.prototype.port3D5_write16=function(a){B(a,4);this.port3D5_write(a&255)};
M.prototype.port3D5_read=function(){B(this.index_crtc);switch(this.index_crtc){case 1:return this.horizontal_display_enable_end;case 2:return this.horizontal_blank_start;case 7:return this.vertical_display_enable_end>>7&2|this.vertical_blank_start>>5&8|this.line_compare>>4&16|this.vertical_display_enable_end>>3&64;case 8:return this.preset_row_scan;case 9:return this.max_scan_line;case 10:return this.cursor_scanline_start;case 11:return this.cursor_scanline_end;case 12:return this.start_address&255;
case 13:return this.start_address>>8;case 14:return this.cursor_address>>8;case 15:return this.cursor_address&255;case 18:return this.vertical_display_enable_end&255;case 19:return this.offset_register;case 20:return this.underline_location_register;case 21:return this.vertical_blank_start&255;case 23:return this.crtc_mode;case 24:return this.line_compare&255}return this.index_crtc<this.crtc.length?this.crtc[this.index_crtc]:0};M.prototype.port3D5_read16=function(){return this.port3D5_read()};
M.prototype.port3DA_read=function(){var a=this.port_3DA_value;this.graphical_mode?(this.port_3DA_value^=1,this.port_3DA_value&=1):(this.port_3DA_value&1&&(this.port_3DA_value^=8),this.port_3DA_value^=1);this.attribute_controller_index=-1;return a};M.prototype.port1CE_write=function(a){this.dispi_index=a};
M.prototype.port1CF_write=function(a){B(this.dispi_index);B(a);const b=this.svga_enabled;switch(this.dispi_index){case 0:45248<=a&&45253>=a?this.svga_version=a:B(a);break;case 1:this.svga_width=a;2560<this.svga_width&&(this.svga_width=2560);break;case 2:this.svga_height=a;1600<this.svga_height&&(this.svga_height=1600);break;case 3:this.svga_bpp=a;break;case 4:(this.svga_enabled=1===(a&1))&&0===(a&128)&&this.svga_memory.fill(0);this.dispi_enable_value=a;break;case 5:B(a<<16);this.svga_bank_offset=
a<<16;break;case 8:B(a);this.svga_offset_x!==a&&(this.svga_offset_x=a,this.svga_offset=this.svga_offset_y*this.svga_width+this.svga_offset_x,this.complete_redraw());break;case 9:B(a*this.svga_width);B(a);this.svga_offset_y!==a&&(this.svga_offset_y=a,this.svga_offset=this.svga_offset_y*this.svga_width+this.svga_offset_x,this.complete_redraw());break;default:B(this.dispi_index)}!this.svga_enabled||this.svga_width&&this.svga_height||(this.svga_enabled=!1);this.svga_enabled&&!b&&(this.svga_offset_y=this.svga_offset_x=
this.svga_offset=0,this.graphical_mode=!0,this.screen.set_mode(this.graphical_mode),this.set_size_graphical(this.svga_width,this.svga_height,this.svga_width,this.svga_height,this.svga_bpp));this.svga_enabled||(this.svga_bank_offset=0);this.update_layers()};M.prototype.port1CF_read=function(){B(this.dispi_index);return this.svga_register_read(this.dispi_index)};
M.prototype.svga_register_read=function(a){switch(a){case 0:return this.svga_version;case 1:return this.dispi_enable_value&2?2560:this.svga_width;case 2:return this.dispi_enable_value&2?1600:this.svga_height;case 3:return this.dispi_enable_value&2?32:this.svga_bpp;case 4:return this.dispi_enable_value;case 5:return this.svga_bank_offset>>>16;case 6:return this.screen_width?this.screen_width:1;case 8:return this.svga_offset_x;case 9:return this.svga_offset_y;case 10:return this.vga_memory_size/65536|
0;default:B(this.dispi_index)}return 255};
M.prototype.vga_replot=function(){for(var a=this.diff_plot_min&-16,b=Math.min(this.diff_plot_max|15,524287),c=this.vga_addr_shift_count(),d=~this.crtc_mode&3,e=this.planar_mode&96,g=this.attribute_mode&64;a<=b;){var f=a>>>c;if(d){var k=a/this.virtual_width|0,l=a-this.virtual_width*k;switch(d){case 1:f=(k&1)<<13;k>>>=1;break;case 2:f=(k&1)<<14;k>>>=1;break;case 3:f=(k&3)<<13,k>>>=2}f|=(k*this.virtual_width+l>>>c)+this.start_address}k=this.plane0[f];l=this.plane1[f];var m=this.plane2[f],n=this.plane3[f];
f=new Uint8Array(8);switch(e){case 0:k<<=0;l<<=1;m<<=2;n<<=3;for(var p=7;0<=p;p--)f[7-p]=k>>p&1|l>>p&2|m>>p&4|n>>p&8;break;case 32:f[0]=k>>6&3|m>>4&12;f[1]=k>>4&3|m>>2&12;f[2]=k>>2&3|m>>0&12;f[3]=k>>0&3|m<<2&12;f[4]=l>>6&3|n>>4&12;f[5]=l>>4&3|n>>2&12;f[6]=l>>2&3|n>>0&12;f[7]=l>>0&3|n<<2&12;break;case 64:case 96:f[0]=k>>4&15,f[1]=k>>0&15,f[2]=l>>4&15,f[3]=l>>0&15,f[4]=m>>4&15,f[5]=m>>0&15,f[6]=n>>4&15,f[7]=n>>0&15}if(g)for(k=p=0;4>p;p++,a++,k+=2)this.pixel_buffer[a]=f[k]<<4|f[k+1];else for(p=0;8>p;p++,
a++)this.pixel_buffer[a]=f[p]}};
M.prototype.vga_redraw=function(){var a=this.diff_addr_min,b=Math.min(this.diff_addr_max,524287);const c=new Int32Array(this.cpu.wasm_memory.buffer,this.dest_buffet_offset,this.virtual_width*this.virtual_height);var d=255,e=0;this.attribute_mode&128&&(d&=207,e|=this.color_select<<4&48);if(this.attribute_mode&64)for(;a<=b;a++){var g=this.pixel_buffer[a]&d|e;g=this.vga256_palette[g];c[a]=g&65280|g<<16|g>>16|4278190080}else for(d&=63,e|=this.color_select<<4&192;a<=b;a++)g=this.dac_map[this.pixel_buffer[a]&
this.color_plane_enable]&d|e,g=this.vga256_palette[g],c[a]=g&65280|g<<16|g>>16|4278190080};
M.prototype.screen_fill_buffer=function(){if(this.graphical_mode){if(0===this.image_data.data.byteLength){var a=new Uint8ClampedArray(this.cpu.wasm_memory.buffer,this.dest_buffet_offset,4*this.virtual_width*this.virtual_height);this.image_data=new ImageData(a,this.virtual_width,this.virtual_height);this.update_layers()}if(this.svga_enabled){a=0;let d=this.svga_height;if(8===this.svga_bpp){const e=new Int32Array(this.cpu.wasm_memory.buffer,this.dest_buffet_offset,this.screen_width*this.screen_height),
g=new Uint8Array(this.cpu.wasm_memory.buffer,this.svga_memory.byteOffset,this.vga_memory_size);for(var b=0;b<e.length;b++){var c=this.vga256_palette[g[b]];e[b]=c&65280|c<<16|c>>16|4278190080}}else this.cpu.svga_fill_pixel_buffer(this.svga_bpp,this.svga_offset),b=15===this.svga_bpp?2:this.svga_bpp/8,a=((this.cpu.svga_dirty_bitmap_min_offset[0]/b|0)-this.svga_offset)/this.svga_width|0,d=(((this.cpu.svga_dirty_bitmap_max_offset[0]/b|0)-this.svga_offset)/this.svga_width|0)+1;a<d&&(a=Math.max(a,0),d=Math.min(d,
this.svga_height),this.screen.update_buffer([{image_data:this.image_data,screen_x:0,screen_y:a,buffer_x:0,buffer_y:a,buffer_width:this.svga_width,buffer_height:d-a}]))}else this.vga_replot(),this.vga_redraw(),this.screen.update_buffer(this.layers);this.reset_diffs()}this.update_vertical_retrace()};
M.prototype.set_font_bitmap=function(a){const b=this.max_scan_line&31;if(b&&!this.graphical_mode){const c=!!(this.clocking_mode&8);this.screen.set_font_bitmap(b+1,!c&&!(this.clocking_mode&1),c,!!(this.attribute_mode&4),this.plane2,a)}};
M.prototype.set_font_page=function(){const a=[0,2,4,6,1,3,5,7],b=(this.character_map_select&12)>>2|(this.character_map_select&32)>>3,c=this.character_map_select&3|(this.character_map_select&16)>>2;this.font_page_ab_enabled=b!==c;this.screen.set_font_page(a[b],a[c]);this.complete_redraw()};function wa(a,b){this.cpu=a;this.bus=b;this.use_mouse=this.enable_mouse_stream=!1;this.have_mouse=!0;this.mouse_clicks=this.mouse_delta_y=this.mouse_delta_x=0;this.have_keyboard=!0;this.next_read_resolution=this.next_read_rate=this.next_handle_scan_code_set=this.next_read_led=this.next_read_sample=this.next_is_mouse_command=this.enable_keyboard_stream=!1;this.kbd_buffer=new ia(1024);this.last_port60_byte=0;this.sample_rate=100;this.mouse_id=this.mouse_detect_state=0;this.mouse_reset_workaround=!1;
this.wheel_movement=0;this.resolution=4;this.scaling2=!1;this.last_mouse_packet=-1;this.mouse_buffer=new ia(1024);this.next_byte_is_aux=this.next_byte_is_ready=!1;this.bus.register("keyboard-code",function(c){this.kbd_send_code(c)},this);this.bus.register("mouse-click",function(c){this.mouse_send_click(c[0],c[1],c[2])},this);this.bus.register("mouse-delta",function(c){this.mouse_send_delta(c[0],c[1])},this);this.bus.register("mouse-wheel",function(c){this.wheel_movement-=c[0];this.wheel_movement-=
2*c[1];this.wheel_movement=Math.min(7,Math.max(-8,this.wheel_movement));this.send_mouse_packet(0,0)},this);this.command_register=5;this.controller_output_port=0;this.read_controller_output_port=this.read_command_register=this.read_output_register=!1;a.io.register_read(96,this,this.port60_read);a.io.register_read(100,this,this.port64_read);a.io.register_write(96,this,this.port60_write);a.io.register_write(100,this,this.port64_write)}
wa.prototype.get_state=function(){var a=[];a[0]=this.enable_mouse_stream;a[1]=this.use_mouse;a[2]=this.have_mouse;a[3]=this.mouse_delta_x;a[4]=this.mouse_delta_y;a[5]=this.mouse_clicks;a[6]=this.have_keyboard;a[7]=this.enable_keyboard_stream;a[8]=this.next_is_mouse_command;a[9]=this.next_read_sample;a[10]=this.next_read_led;a[11]=this.next_handle_scan_code_set;a[12]=this.next_read_rate;a[13]=this.next_read_resolution;a[15]=this.last_port60_byte;a[16]=this.sample_rate;a[17]=this.resolution;a[18]=this.scaling2;
a[20]=this.command_register;a[21]=this.read_output_register;a[22]=this.read_command_register;a[23]=this.controller_output_port;a[24]=this.read_controller_output_port;a[25]=this.mouse_id;a[26]=this.mouse_detect_state;a[27]=this.mouse_reset_workaround;return a};
wa.prototype.set_state=function(a){this.enable_mouse_stream=a[0];this.use_mouse=a[1];this.have_mouse=a[2];this.mouse_delta_x=a[3];this.mouse_delta_y=a[4];this.mouse_clicks=a[5];this.have_keyboard=a[6];this.enable_keyboard_stream=a[7];this.next_is_mouse_command=a[8];this.next_read_sample=a[9];this.next_read_led=a[10];this.next_handle_scan_code_set=a[11];this.next_read_rate=a[12];this.next_read_resolution=a[13];this.last_port60_byte=a[15];this.sample_rate=a[16];this.resolution=a[17];this.scaling2=a[18];
this.command_register=a[20];this.read_output_register=a[21];this.read_command_register=a[22];this.controller_output_port=a[23];this.read_controller_output_port=a[24];this.mouse_id=a[25]||0;this.mouse_detect_state=a[26]||0;this.mouse_reset_workaround=a[27]||!1;this.next_byte_is_aux=this.next_byte_is_ready=!1;this.kbd_buffer.clear();this.mouse_buffer.clear();this.bus.send("mouse-enable",this.use_mouse)};
wa.prototype.raise_irq=function(){this.next_byte_is_ready||(this.kbd_buffer.length?this.kbd_irq():this.mouse_buffer.length&&this.mouse_irq())};wa.prototype.mouse_irq=function(){this.next_byte_is_aux=this.next_byte_is_ready=!0;this.command_register&2&&(this.cpu.device_lower_irq(12),this.cpu.device_raise_irq(12))};wa.prototype.kbd_irq=function(){this.next_byte_is_ready=!0;this.next_byte_is_aux=!1;this.command_register&1&&(this.cpu.device_lower_irq(1),this.cpu.device_raise_irq(1))};
wa.prototype.kbd_send_code=function(a){this.enable_keyboard_stream&&(B(a),this.kbd_buffer.push(a),this.raise_irq())};wa.prototype.mouse_send_delta=function(a,b){if(this.have_mouse&&this.use_mouse){var c=this.resolution*this.sample_rate/80;this.mouse_delta_x+=a*c;this.mouse_delta_y+=b*c;this.enable_mouse_stream&&(a=this.mouse_delta_x|0,b=this.mouse_delta_y|0,a||b)&&(Date.now(),this.mouse_delta_x-=a,this.mouse_delta_y-=b,this.send_mouse_packet(a,b))}};
wa.prototype.mouse_send_click=function(a,b,c){this.have_mouse&&this.use_mouse&&(this.mouse_clicks=a|c<<1|b<<2,this.enable_mouse_stream&&this.send_mouse_packet(0,0))};
wa.prototype.send_mouse_packet=function(a,b){var c=(0>b)<<5|(0>a)<<4|8|this.mouse_clicks;this.last_mouse_packet=Date.now();this.mouse_buffer.push(c);this.mouse_buffer.push(a);this.mouse_buffer.push(b);4===this.mouse_id?(this.mouse_buffer.push(0|this.wheel_movement&15),this.wheel_movement=0):3===this.mouse_id&&(this.mouse_buffer.push(this.wheel_movement&255),this.wheel_movement=0);this.raise_irq()};
wa.prototype.apply_scaling2=function(a){var b=a>>31;switch(Math.abs(a)){case 0:case 1:case 3:return a;case 2:return b;case 4:return 6*b;case 5:return 9*b;default:return a<<1}};
wa.prototype.port60_read=function(){this.next_byte_is_ready=!1;if(!this.kbd_buffer.length&&!this.mouse_buffer.length)return this.last_port60_byte;this.next_byte_is_aux?(this.cpu.device_lower_irq(12),this.last_port60_byte=this.mouse_buffer.shift()):(this.cpu.device_lower_irq(1),this.last_port60_byte=this.kbd_buffer.shift());B(this.last_port60_byte);(this.kbd_buffer.length||this.mouse_buffer.length)&&this.raise_irq();return this.last_port60_byte};
wa.prototype.port64_read=function(){var a=16;this.next_byte_is_ready&&(a|=1);this.next_byte_is_aux&&(a|=32);B(a);return a};
wa.prototype.port60_write=function(a){B(a);if(this.read_command_register)this.command_register=a,this.read_command_register=!1,B(this.command_register);else if(this.read_output_register)this.read_output_register=!1,this.mouse_buffer.clear(),this.mouse_buffer.push(a),this.mouse_irq();else if(this.next_read_sample){this.next_read_sample=!1;this.mouse_buffer.clear();this.mouse_buffer.push(250);this.sample_rate=a;switch(this.mouse_detect_state){case -1:60===a?(this.mouse_reset_workaround=!0,this.mouse_detect_state=
0):(this.mouse_reset_workaround=!1,this.mouse_detect_state=200===a?1:0);break;case 0:200===a&&(this.mouse_detect_state=1);break;case 1:this.mouse_detect_state=100===a?2:200===a?3:0;break;case 2:80===a&&(this.mouse_id=3);this.mouse_detect_state=-1;break;case 3:80===a&&(this.mouse_id=4),this.mouse_detect_state=-1}B(a);B(this.mouse_id);this.sample_rate||(this.sample_rate=100);this.mouse_irq()}else if(this.next_read_resolution)this.next_read_resolution=!1,this.mouse_buffer.clear(),this.mouse_buffer.push(250),
this.resolution=3<a?4:1<<a,this.mouse_irq();else if(this.next_read_led)this.next_read_led=!1,this.kbd_buffer.push(250),this.kbd_irq();else if(this.next_handle_scan_code_set)this.next_handle_scan_code_set=!1,this.kbd_buffer.push(250),this.kbd_irq(),a||this.kbd_buffer.push(1);else if(this.next_read_rate)this.next_read_rate=!1,this.kbd_buffer.push(250),this.kbd_irq();else if(this.next_is_mouse_command){if(this.next_is_mouse_command=!1,B(a),this.have_mouse){this.kbd_buffer.clear();this.mouse_buffer.clear();
this.mouse_buffer.push(250);switch(a){case 230:this.scaling2=!1;break;case 231:this.scaling2=!0;break;case 232:this.next_read_resolution=!0;break;case 233:this.send_mouse_packet(0,0);break;case 235:this.send_mouse_packet(0,0);break;case 242:B(this.mouse_id);this.mouse_buffer.push(this.mouse_id);this.mouse_clicks=this.mouse_delta_x=this.mouse_delta_y=0;this.raise_irq();break;case 243:this.next_read_sample=!0;break;case 244:this.use_mouse=this.enable_mouse_stream=!0;this.bus.send("mouse-enable",!0);
this.mouse_clicks=this.mouse_delta_x=this.mouse_delta_y=0;break;case 245:this.enable_mouse_stream=!1;break;case 246:this.enable_mouse_stream=!1;this.sample_rate=100;this.scaling2=!1;this.resolution=4;break;case 255:this.mouse_buffer.push(170);this.mouse_buffer.push(0);this.use_mouse=!0;this.bus.send("mouse-enable",!0);this.enable_mouse_stream=!1;this.sample_rate=100;this.scaling2=!1;this.resolution=4;this.mouse_reset_workaround||(this.mouse_id=0);this.mouse_clicks=this.mouse_delta_x=this.mouse_delta_y=
0;break;default:B(a)}this.mouse_irq()}}else if(this.read_controller_output_port)this.read_controller_output_port=!1,this.controller_output_port=a;else{B(a);this.mouse_buffer.clear();this.kbd_buffer.clear();this.kbd_buffer.push(250);switch(a){case 237:this.next_read_led=!0;break;case 240:this.next_handle_scan_code_set=!0;break;case 242:this.kbd_buffer.push(171);this.kbd_buffer.push(131);break;case 243:this.next_read_rate=!0;break;case 244:this.enable_keyboard_stream=!0;break;case 245:this.enable_keyboard_stream=
!1;break;case 246:break;case 255:this.kbd_buffer.clear();this.kbd_buffer.push(250);this.kbd_buffer.push(170);this.kbd_buffer.push(0);break;default:B(a)}this.kbd_irq()}};
wa.prototype.port64_write=function(a){B(a);switch(a){case 32:this.kbd_buffer.clear();this.mouse_buffer.clear();this.kbd_buffer.push(this.command_register);this.kbd_irq();break;case 96:this.read_command_register=!0;break;case 209:this.read_controller_output_port=!0;break;case 211:this.read_output_register=!0;break;case 212:this.next_is_mouse_command=!0;break;case 167:this.command_register|=32;break;case 168:this.command_register&=-33;break;case 169:this.kbd_buffer.clear();this.mouse_buffer.clear();
this.kbd_buffer.push(0);this.kbd_irq();break;case 170:this.kbd_buffer.clear();this.mouse_buffer.clear();this.kbd_buffer.push(85);this.kbd_irq();break;case 171:this.kbd_buffer.clear();this.mouse_buffer.clear();this.kbd_buffer.push(0);this.kbd_irq();break;case 173:this.command_register|=16;break;case 174:this.command_register&=-17;break;case 254:this.cpu.reboot_internal();break;default:B(a)}};function xa(a){this.cpu=a;this.cmos_index=0;this.cmos_data=new Uint8Array(128);this.last_update=this.rtc_time=Date.now();this.next_interrupt_alarm=this.next_interrupt=0;this.periodic_interrupt=!1;this.periodic_interrupt_time=.9765625;this.cmos_a=38;this.cmos_b=2;this.nmi_disabled=this.cmos_c=0;a.io.register_write(112,this,function(b){this.cmos_index=b&127;this.nmi_disabled=b>>7});a.io.register_write(113,this,this.cmos_port_write);a.io.register_read(113,this,this.cmos_port_read)}
xa.prototype.get_state=function(){var a=[];a[0]=this.cmos_index;a[1]=this.cmos_data;a[2]=this.rtc_time;a[3]=this.last_update;a[4]=this.next_interrupt;a[5]=this.next_interrupt_alarm;a[6]=this.periodic_interrupt;a[7]=this.periodic_interrupt_time;a[8]=this.cmos_a;a[9]=this.cmos_b;a[10]=this.cmos_c;a[11]=this.nmi_disabled;return a};
xa.prototype.set_state=function(a){this.cmos_index=a[0];this.cmos_data=a[1];this.rtc_time=a[2];this.last_update=a[3];this.next_interrupt=a[4];this.next_interrupt_alarm=a[5];this.periodic_interrupt=a[6];this.periodic_interrupt_time=a[7];this.cmos_a=a[8];this.cmos_b=a[9];this.cmos_c=a[10];this.nmi_disabled=a[11]};
xa.prototype.timer=function(a){a=Date.now();this.rtc_time+=a-this.last_update;this.last_update=a;this.periodic_interrupt&&this.next_interrupt<a?(this.cpu.device_raise_irq(8),this.cmos_c|=192,this.next_interrupt+=this.periodic_interrupt_time*Math.ceil((a-this.next_interrupt)/this.periodic_interrupt_time)):this.next_interrupt_alarm&&this.next_interrupt_alarm<a&&(this.cpu.device_raise_irq(8),this.cmos_c|=160,this.next_interrupt_alarm=0);let b=100;this.periodic_interrupt&&this.next_interrupt&&(b=Math.min(b,
Math.max(0,this.next_interrupt-a)));this.next_interrupt_alarm&&(b=Math.min(b,Math.max(0,this.next_interrupt_alarm-a)));return b};xa.prototype.bcd_pack=function(a){for(var b=0,c=0,d;a;)d=a%10,c|=d<<4*b,b++,a=(a-d)/10;return c};xa.prototype.bcd_unpack=function(a){return(a&15)+10*(a>>4&15)};xa.prototype.encode_time=function(a){return this.cmos_b&4?a:this.bcd_pack(a)};xa.prototype.decode_time=function(a){return this.cmos_b&4?a:this.bcd_unpack(a)};
xa.prototype.cmos_port_read=function(){var a=this.cmos_index;switch(a){case 0:return B(this.encode_time((new Date(this.rtc_time)).getUTCSeconds())),this.encode_time((new Date(this.rtc_time)).getUTCSeconds());case 2:return B(this.encode_time((new Date(this.rtc_time)).getUTCMinutes())),this.encode_time((new Date(this.rtc_time)).getUTCMinutes());case 4:return B(this.encode_time((new Date(this.rtc_time)).getUTCHours())),this.encode_time((new Date(this.rtc_time)).getUTCHours());case 6:return B(this.encode_time((new Date(this.rtc_time)).getUTCDay()+
1)),this.encode_time((new Date(this.rtc_time)).getUTCDay()+1);case 7:return B(this.encode_time((new Date(this.rtc_time)).getUTCDate())),this.encode_time((new Date(this.rtc_time)).getUTCDate());case 8:return B(this.encode_time((new Date(this.rtc_time)).getUTCMonth()+1)),this.encode_time((new Date(this.rtc_time)).getUTCMonth()+1);case 9:return B(this.encode_time((new Date(this.rtc_time)).getUTCFullYear()%100)),this.encode_time((new Date(this.rtc_time)).getUTCFullYear()%100);case 10:return 999<=C.microtick()%
1E3?this.cmos_a|128:this.cmos_a;case 11:return this.cmos_b;case 12:return this.cpu.device_lower_irq(8),a=this.cmos_c,this.cmos_c&=-241,a;case 13:return 0;case 50:case 55:return B(this.encode_time((new Date(this.rtc_time)).getUTCFullYear()/100|0)),this.encode_time((new Date(this.rtc_time)).getUTCFullYear()/100|0);default:return B(a),this.cmos_data[this.cmos_index]}};
xa.prototype.cmos_port_write=function(a){switch(this.cmos_index){case 10:this.cmos_a=a&127;this.periodic_interrupt_time=1E3/(32768>>(this.cmos_a&15)-1);B(this.cmos_a,2);break;case 11:this.cmos_b=a;this.cmos_b&64&&(this.next_interrupt=Date.now());if(this.cmos_b&32){a=new Date;const b=this.decode_time(this.cmos_data[1]),c=this.decode_time(this.cmos_data[3]),d=this.decode_time(this.cmos_data[5]);this.next_interrupt_alarm=+new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),d,c,b))}B(this.cmos_b,
2);break;case 1:case 3:case 5:this.cmos_write(this.cmos_index,a);break;default:B(this.cmos_index),B(a)}this.periodic_interrupt=64===(this.cmos_b&64)&&0<(this.cmos_a&15)};xa.prototype.cmos_read=function(a){return this.cmos_data[a]};xa.prototype.cmos_write=function(a,b){B(a);B(b);this.cmos_data[a]=b};function ya(a,b,c){this.bus=c;this.cpu=a;this.ints=4;this.line_control=this.baud_rate=0;this.lsr=96;this.ier=this.fifo_control=0;this.iir=1;this.irq=this.scratch_register=this.modem_status=this.modem_control=0;this.input=[];this.current_line="";switch(b){case 1016:this.com=0;this.irq=4;break;case 760:this.com=1;this.irq=3;break;case 1E3:this.com=2;this.irq=4;break;case 744:this.irq=this.com=3;break;default:pa("Invalid serial port: "+B(b),16384),this.com=0,this.irq=4}this.bus.register("serial"+this.com+
"-input",function(d){this.data_received(d)},this);this.bus.register("serial"+this.com+"-modem-status-input",function(d){this.set_modem_status(d)},this);this.bus.register("serial"+this.com+"-carrier-detect-input",function(d){this.set_modem_status(d?this.modem_status|136:this.modem_status&-137)},this);this.bus.register("serial"+this.com+"-ring-indicator-input",function(d){this.set_modem_status(d?this.modem_status|68:this.modem_status&-69)},this);this.bus.register("serial"+this.com+"-data-set-ready-input",
function(d){this.set_modem_status(d?this.modem_status|34:this.modem_status&-35)},this);this.bus.register("serial"+this.com+"-clear-to-send-input",function(d){this.set_modem_status(d?this.modem_status|17:this.modem_status&-18)},this);a=a.io;a.register_write(b,this,function(d){this.write_data(d)},function(d){this.write_data(d&255);this.write_data(d>>8)});a.register_write(b|1,this,function(d){this.line_control&128?(this.baud_rate=this.baud_rate&255|d<<8,B(this.baud_rate)):(0===(this.ier&2)&&d&2&&this.ThrowInterrupt(2),
this.ier=d&15,B(d),this.CheckInterrupt())});a.register_read(b,this,function(){if(this.line_control&128)return this.baud_rate&255;let d=0;0!==this.input.length&&(d=this.input.shift(),B(d));0===this.input.length&&(this.lsr&=-2,this.ClearInterrupt(12),this.ClearInterrupt(4));return d});a.register_read(b|1,this,function(){return this.line_control&128?this.baud_rate>>8:this.ier&15});a.register_read(b|2,this,function(){var d=this.iir&15;B(this.iir);2===this.iir&&this.ClearInterrupt(2);this.fifo_control&
1&&(d|=192);return d});a.register_write(b|2,this,function(d){B(d);this.fifo_control=d});a.register_read(b|3,this,function(){B(this.line_control);return this.line_control});a.register_write(b|3,this,function(d){B(d);this.line_control=d});a.register_read(b|4,this,function(){return this.modem_control});a.register_write(b|4,this,function(d){B(d);this.modem_control=d});a.register_read(b|5,this,function(){B(this.lsr);return this.lsr});a.register_write(b|5,this,function(){});a.register_read(b|6,this,function(){B(this.modem_status);
return this.modem_status&=240});a.register_write(b|6,this,function(d){B(d);this.set_modem_status(d)});a.register_read(b|7,this,function(){return this.scratch_register});a.register_write(b|7,this,function(d){this.scratch_register=d})}ya.prototype.get_state=function(){var a=[];a[0]=this.ints;a[1]=this.baud_rate;a[2]=this.line_control;a[3]=this.lsr;a[4]=this.fifo_control;a[5]=this.ier;a[6]=this.iir;a[7]=this.modem_control;a[8]=this.modem_status;a[9]=this.scratch_register;a[10]=this.irq;return a};
ya.prototype.set_state=function(a){this.ints=a[0];this.baud_rate=a[1];this.line_control=a[2];this.lsr=a[3];this.fifo_control=a[4];this.ier=a[5];this.iir=a[6];this.modem_control=a[7];this.modem_status=a[8];this.scratch_register=a[9];this.irq=a[10]};
ya.prototype.CheckInterrupt=function(){this.ints&4096&&this.ier&1?(this.iir=12,this.cpu.device_raise_irq(this.irq)):this.ints&16&&this.ier&1?(this.iir=4,this.cpu.device_raise_irq(this.irq)):this.ints&4&&this.ier&2?(this.iir=2,this.cpu.device_raise_irq(this.irq)):this.ints&1&&this.ier&8?(this.iir=0,this.cpu.device_raise_irq(this.irq)):(this.iir=1,this.cpu.device_lower_irq(this.irq))};ya.prototype.ThrowInterrupt=function(a){this.ints|=1<<a;this.CheckInterrupt()};
ya.prototype.ClearInterrupt=function(a){this.ints&=~(1<<a);this.CheckInterrupt()};ya.prototype.data_received=function(a){B(a);this.input.push(a);this.lsr|=1;this.fifo_control&1?this.ThrowInterrupt(12):this.ThrowInterrupt(4)};ya.prototype.write_data=function(a){this.line_control&128?this.baud_rate=this.baud_rate&-256|a:(B(a),this.ThrowInterrupt(2),this.bus.send("serial"+this.com+"-output-byte",a))};
ya.prototype.set_modem_status=function(a){B(a);const b=this.modem_status&15;let c=(this.modem_status^a)>>4;this.modem_status=a;this.modem_status=this.modem_status|c|b};function Ba(a){this.cpu=a;var b=a.io;a.devices.pci.register_device({pci_id:56,pci_space:[134,128,19,113,7,0,128,2,8,0,128,6,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,1,0,0],pci_bars:[],name:"acpi"});this.timer_imprecision_offset=this.timer_last_value=0;this.status=1;this.pm1_enable=this.pm1_status=0;this.last_timer=this.get_timer(C.microtick());this.gpe=new Uint8Array(4);b.register_read(45056,this,void 0,function(){return this.pm1_status});
b.register_write(45056,this,void 0,function(c){B(c,4);this.pm1_status&=~c});b.register_read(45058,this,void 0,function(){return this.pm1_enable});b.register_write(45058,this,void 0,function(c){B(c);this.pm1_enable=c});b.register_read(45060,this,void 0,function(){return this.status});b.register_write(45060,this,void 0,function(c){B(c);this.status=c});b.register_read(45064,this,void 0,void 0,function(){return this.get_timer(C.microtick())&16777215});b.register_read(45024,this,function(){return this.gpe[0]});
b.register_read(45025,this,function(){return this.gpe[1]});b.register_read(45026,this,function(){return this.gpe[2]});b.register_read(45027,this,function(){return this.gpe[3]});b.register_write(45024,this,function(c){B(c);this.gpe[0]=c});b.register_write(45025,this,function(c){B(c);this.gpe[1]=c});b.register_write(45026,this,function(c){B(c);this.gpe[2]=c});b.register_write(45027,this,function(c){B(c);this.gpe[3]=c})}
Ba.prototype.timer=function(a){a=this.get_timer(a);var b=0!==((a^this.last_timer)&8388608);this.pm1_enable&1&&b?(this.pm1_status|=1,this.cpu.device_raise_irq(9)):this.cpu.device_lower_irq(9);this.last_timer=a;return 100};
Ba.prototype.get_timer=function(a){a=Math.round(3579.545*a);a===this.timer_last_value?3579.545>this.timer_imprecision_offset&&this.timer_imprecision_offset++:this.timer_last_value+this.timer_imprecision_offset<=a&&(this.timer_imprecision_offset=0,this.timer_last_value=a);return this.timer_last_value+this.timer_imprecision_offset};Ba.prototype.get_state=function(){var a=[];a[0]=this.status;a[1]=this.pm1_status;a[2]=this.pm1_enable;a[3]=this.gpe;return a};
Ba.prototype.set_state=function(a){this.status=a[0];this.pm1_status=a[1];this.pm1_enable=a[2];this.gpe=a[3]};function Ca(a){this.cpu=a;this.timer_divider=this.apic_id=0;this.timer_divider_shift=1;this.timer_current_count=this.timer_initial_count=0;this.next_tick=C.microtick();this.lvt_error=this.lvt_int1=this.lvt_int0=this.lvt_perf_counter=this.lvt_thermal_sensor=this.lvt_timer=65536;this.icr1=this.icr0=this.tpr=0;this.irr=new Int32Array(8);this.isr=new Int32Array(8);this.tmr=new Int32Array(8);this.spurious_vector=254;this.destination_format=-1;this.read_error=this.error=this.local_destination=0;a.io.mmap_register(4276092928,
1048576,b=>{B(b>>>0);var c=b&3;return this.read32(b&-4)>>8*c&255},(b,c)=>{B(b);B(c)},b=>this.read32(b),(b,c)=>this.write32(b,c))}
Ca.prototype.read32=function(a){a=a-4276092928|0;switch(a){case 32:return this.apic_id;case 48:return 327700;case 128:return this.tpr;case 208:return this.local_destination;case 224:return this.destination_format;case 240:return this.spurious_vector;case 256:case 272:case 288:case 304:case 320:case 336:case 352:case 368:return a=a-256>>4,B(this.isr[a]>>>0,8),this.isr[a];case 384:case 400:case 416:case 432:case 448:case 464:case 480:case 496:return a=a-384>>4,B(this.tmr[a]>>>0,8),this.tmr[a];case 512:case 528:case 544:case 560:case 576:case 592:case 608:case 624:return a=
a-512>>4,B(this.irr[a]>>>0,8),this.irr[a];case 640:return B(this.read_error>>>0,8),this.read_error;case 768:return this.icr0;case 784:return this.icr1;case 800:return this.lvt_timer;case 816:return this.lvt_thermal_sensor;case 832:return this.lvt_perf_counter;case 848:return this.lvt_int0;case 864:return this.lvt_int1;case 880:return this.lvt_error;case 992:return this.timer_divider;case 896:return this.timer_initial_count;case 912:return B(this.timer_current_count>>>0,8),this.timer_current_count;
default:return B(a),0}};
Ca.prototype.write32=function(a,b){a=a-4276092928|0;switch(a){case 32:B(b>>>8,8);this.apic_id=b;break;case 48:B(b>>>0,8);break;case 128:this.tpr=b&255;this.check_vector();break;case 176:b=this.highest_isr();-1!==b&&(this.register_clear_bit(this.isr,b),this.register_get_bit(this.tmr,b)&&this.cpu.devices.ioapic.remote_eoi(b),this.check_vector());break;case 208:B(b>>>0,8);this.local_destination=b&4278190080;break;case 224:B(b>>>0,8);this.destination_format=b|16777215;break;case 240:B(b>>>0,8);this.spurious_vector=
b;break;case 640:B(b>>>0,8);this.read_error=this.error;this.error=0;break;case 768:a=b&255;var c=b>>8&7,d=b>>11&1,e=b>>15&1,g=b>>18&3,f=this.icr1>>>24;B(b,8);B(a,2);this.icr0=b&-4097;0===g?this.route(a,c,e,f,d):1===g?this.deliver(a,0,e):2===g&&this.deliver(a,c,e);break;case 784:B(b>>>0,8);this.icr1=b;break;case 800:B(b>>>0,8);this.lvt_timer=b;break;case 816:B(b>>>0,8);this.lvt_thermal_sensor=b;break;case 832:B(b>>>0,8);this.lvt_perf_counter=b;break;case 848:B(b>>>0,8);this.lvt_int0=b;break;case 864:B(b>>>
0,8);this.lvt_int1=b;break;case 880:B(b>>>0,8);this.lvt_error=b;break;case 992:B(b>>>0,8);this.timer_divider=b;b=b&3|(b&8)>>1;this.timer_divider_shift=7===b?0:b+1;break;case 896:B(b>>>0,8);this.timer_initial_count=b>>>0;this.timer_current_count=b>>>0;this.next_tick=C.microtick();this.timer_active=!0;break;case 912:B(b>>>0,8);break;default:B(a),B(b>>>0,8)}};
Ca.prototype.timer=function(a){if(0===this.timer_current_count)return 100;const b=1E6/(1<<this.timer_divider_shift);a=(a-this.next_tick)*b>>>0;this.next_tick+=a/b;this.timer_current_count-=a;0>=this.timer_current_count&&(a=this.lvt_timer&393216,131072===a?(this.timer_current_count%=this.timer_initial_count,0>=this.timer_current_count&&(this.timer_current_count+=this.timer_initial_count),0===(this.lvt_timer&65536)&&this.deliver(this.lvt_timer&255,0,!1)):0===a&&(this.timer_current_count=0,0===(this.lvt_timer&
65536)&&this.deliver(this.lvt_timer&255,0,!1)));return Math.max(0,this.timer_current_count/b)};Ca.prototype.route=function(a,b,c){this.deliver(a,b,c)};Ca.prototype.deliver=function(a,b,c){5!==b&&4!==b&&(this.register_get_bit(this.irr,a)?B(a,2):(this.register_set_bit(this.irr,a),c?this.register_set_bit(this.tmr,a):this.register_clear_bit(this.tmr,a),this.check_vector()))};Ca.prototype.highest_irr=function(){return this.register_get_highest_bit(this.irr)};Ca.prototype.highest_isr=function(){return this.register_get_highest_bit(this.isr)};
Ca.prototype.check_vector=function(){var a=this.highest_irr();-1!==a&&(this.highest_isr()>=a||(a&240)<=(this.tpr&240)||this.cpu.handle_irqs())};Ca.prototype.acknowledge_irq=function(){var a=this.highest_irr();if(-1===a||this.highest_isr()>=a||(a&240)<=(this.tpr&240))return-1;this.register_clear_bit(this.irr,a);this.register_set_bit(this.isr,a);this.check_vector();return a};
Ca.prototype.get_state=function(){var a=[];a[0]=this.apic_id;a[1]=this.timer_divider;a[2]=this.timer_divider_shift;a[3]=this.timer_initial_count;a[4]=this.timer_current_count;a[5]=this.next_tick;a[6]=this.lvt_timer;a[7]=this.lvt_perf_counter;a[8]=this.lvt_int0;a[9]=this.lvt_int1;a[10]=this.lvt_error;a[11]=this.tpr;a[12]=this.icr0;a[13]=this.icr1;a[14]=this.irr;a[15]=this.isr;a[16]=this.tmr;a[17]=this.spurious_vector;a[18]=this.destination_format;a[19]=this.local_destination;a[20]=this.error;a[21]=
this.read_error;a[22]=this.lvt_thermal_sensor;return a};
Ca.prototype.set_state=function(a){this.apic_id=a[0];this.timer_divider=a[1];this.timer_divider_shift=a[2];this.timer_initial_count=a[3];this.timer_current_count=a[4];this.next_tick=a[5];this.lvt_timer=a[6];this.lvt_perf_counter=a[7];this.lvt_int0=a[8];this.lvt_int1=a[9];this.lvt_error=a[10];this.tpr=a[11];this.icr0=a[12];this.icr1=a[13];this.irr=a[14];this.isr=a[15];this.tmr=a[16];this.spurious_vector=a[17];this.destination_format=a[18];this.local_destination=a[19];this.error=a[20];this.read_error=
a[21];this.lvt_thermal_sensor=a[22]||65536};Ca.prototype.register_get_bit=function(a,b){return a[b>>5]>>(b&31)&1};Ca.prototype.register_set_bit=function(a,b){a[b>>5]|=1<<(b&31)};Ca.prototype.register_clear_bit=function(a,b){a[b>>5]&=~(1<<(b&31))};Ca.prototype.register_get_highest_bit=function(a){for(var b=7;0<=b;b--){var c=a[b];if(c)return t.int_log2(c>>>0)|b<<5}return-1};function Da(a){this.cpu=a;this.ioredtbl_config=new Int32Array(24);this.ioredtbl_destination=new Int32Array(24);for(var b=0;b<this.ioredtbl_config.length;b++)this.ioredtbl_config[b]=65536;this.irq_value=this.irr=this.ioapic_id=this.ioregsel=0;a.io.mmap_register(4273995776,131072,c=>{c=c-4273995776|0;if(16<=c&&20>c)return c-=16,B(this.ioregsel),this.read(this.ioregsel)>>8*c&255;B(c>>>0);return 0},c=>{B(c>>>0)},c=>{c=c-4273995776|0;if(0===c)return this.ioregsel;if(16===c)return this.read(this.ioregsel);
B(c>>>0);return 0},(c,d)=>{c=c-4273995776|0;0===c?this.ioregsel=d:16===c?this.write(this.ioregsel,d):(B(c>>>0),B(d>>>0,8))})}Da.prototype.remote_eoi=function(a){for(var b=0;24>b;b++){var c=this.ioredtbl_config[b];(c&255)===a&&c&16384&&(B(b),this.ioredtbl_config[b]&=-16385,this.check_irq(b))}};
Da.prototype.check_irq=function(a){var b=1<<a;if(0!==(this.irr&b)){var c=this.ioredtbl_config[a];if(0===(c&65536)){var d=c>>8&7,e=this.ioredtbl_destination[a]>>>24;if(0===(c&32768))this.irr&=~b;else if(this.ioredtbl_config[a]|=16384,c&16384)return;0!==d&&1!==d||this.cpu.devices.apic.route(c&255,d,32768===(c&32768),e,c>>11&1);this.ioredtbl_config[a]&=-4097}}};
Da.prototype.set_irq=function(a){if(!(24<=a)){var b=1<<a;0===(this.irq_value&b)&&(this.irq_value|=b,65536!==(this.ioredtbl_config[a]&98304)&&(this.irr|=b,this.check_irq(a)))}};Da.prototype.clear_irq=function(a){if(!(24<=a)){var b=1<<a;(this.irq_value&b)===b&&(this.irq_value&=~b,this.ioredtbl_config[a]&32768&&(this.irr&=~b))}};
Da.prototype.read=function(a){if(0===a)return this.ioapic_id<<24;if(1===a)return 1507345;if(2===a)return this.ioapic_id<<24;if(16<=a&&64>a){var b=a-16>>1;a=a&1?this.ioredtbl_destination[b]:this.ioredtbl_config[b];B(b);B(a,8);return a}B(a);return 0};
Da.prototype.write=function(a,b){if(0===a)this.ioapic_id=b>>>24&15;else if(1!==a&&2!==a)if(16<=a&&64>a){var c=a-16>>1;a&1?(this.ioredtbl_destination[c]=b&4278190080,B(b>>>0,8),B(c),B(b>>>24,2)):(this.ioredtbl_config[c]=b&110591|this.ioredtbl_config[c]&-110592,a=b&255,B(b>>>0,8),B(c),B(a,2),this.check_irq(c))}else B(a),B(b>>>0,8)};
Da.prototype.get_state=function(){var a=[];a[0]=this.ioredtbl_config;a[1]=this.ioredtbl_destination;a[2]=this.ioregsel;a[3]=this.ioapic_id;a[4]=this.irr;a[5]=this.irq_value;return a};Da.prototype.set_state=function(a){this.ioredtbl_config=a[0];this.ioredtbl_destination=a[1];this.ioregsel=a[2];this.ioapic_id=a[3];this.irr=a[4];this.irq_value=a[5]};function Ea(a){this.message=a}Ea.prototype=Error();const Fa={Uint8Array,Int8Array,Uint16Array,Int16Array,Uint32Array,Int32Array,Float32Array,Float64Array};
function Ga(a,b){if("object"!==typeof a||null===a)return a;if(Array.isArray(a))return a.map(e=>Ga(e,b));a.constructor===Object&&console.log(a);if(a.BYTES_PER_ELEMENT){var c=new Uint8Array(a.buffer,a.byteOffset,a.length*a.BYTES_PER_ELEMENT);return{__state_type__:a.constructor.name.replace("bound ",""),buffer_id:b.push(c)-1}}a=a.get_state();c=[];for(var d=0;d<a.length;d++)c[d]=Ga(a[d],b);return c}
function Ja(a,b){if("object"!==typeof a||null===a)return a;if(Array.isArray(a)){for(let c=0;c<a.length;c++)a[c]=Ja(a[c],b);return a}return new Fa[a.__state_type__](b[a.buffer_id])}
D.prototype.save_state=function(){for(var a=[],b=Ga(this,a),c=[],d=0,e=0;e<a.length;e++){var g=a[e].byteLength;c[e]={offset:d,length:g};d+=g;d=d+3&-4}e=JSON.stringify({buffer_infos:c,state:b});e=(new TextEncoder).encode(e);b=16+e.length;b=b+3&-4;g=b+d;d=new ArrayBuffer(g);var f=new Int32Array(d,0,4);(new Uint8Array(d,16,e.length)).set(e);b=new Uint8Array(d,b);f[0]=-2039052682;f[1]=6;f[2]=g;f[3]=e.length;for(e=0;e<a.length;e++)b.set(a[e],c[e].offset);return d};
D.prototype.restore_state=function(a){function b(p,q){const r=p.length;if(16>r)throw new Ea("Invalid length: "+r);p=new Int32Array(p.buffer,p.byteOffset,4);if(-2039052682!==p[0])throw new Ea("Invalid header: "+B(p[0]>>>0));if(6!==p[1])throw new Ea("Version mismatch: dump="+p[1]+" we=6");if(q&&p[2]!==r)throw new Ea("Length doesn't match header: real="+r+" header="+p[2]);return p[3]}function c(p){p=(new TextDecoder).decode(p);return JSON.parse(p)}a=new Uint8Array(a);if(4247762216===(new Uint32Array(a.buffer,
0,1))[0]){var d=this.zstd_create_ctx(a.length);(new Uint8Array(this.wasm_memory.buffer,this.zstd_get_src_ptr(d),a.length)).set(a);var e=this.zstd_read(d,16),g=new Uint8Array(this.wasm_memory.buffer,e,16),f=b(g,!1);this.zstd_read_free(e,16);e=this.zstd_read(d,f);g=new Uint8Array(this.wasm_memory.buffer,e,f);g=c(g);this.zstd_read_free(e,f);e=g.state;var k=g.buffer_infos;g=[];f=16+f;for(var l of k){k=(f+3&-4)-f;if(1048576<l.length){var m=this.zstd_read(d,k);this.zstd_read_free(m,k);m=new Uint8Array(l.length);
g.push(m.buffer);for(var n=0;n<l.length;){const p=Math.min(l.length-n,1048576),q=this.zstd_read(d,p);m.set(new Uint8Array(this.wasm_memory.buffer,q,p),n);this.zstd_read_free(q,p);n+=p}}else m=this.zstd_read(d,k+l.length),n=m+k,g.push(this.wasm_memory.buffer.slice(n,n+l.length)),this.zstd_read_free(m,k+l.length);f+=k+l.length}e=Ja(e,g);this.set_state(e);this.zstd_free_ctx(d)}else{d=b(a,!0);if(0>d||d+12>=a.length)throw new Ea("Invalid info block length: "+d);l=a.subarray(16,16+d);e=c(l);l=e.state;e=
e.buffer_infos;let p=16+d;p=p+3&-4;d=e.map(q=>{const r=p+q.offset;return a.buffer.slice(r,r+q.length)});l=Ja(l,d);this.set_state(l)}};function Ka(a,b,c){a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]&&a[3]===b[3]&&a[4]===b[4]&&a[5]===b[5]&&(a[0]=c[0],a[1]=c[1],a[2]=c[2],a[3]=c[3],a[4]=c[4],a[5]=c[5]);a[6]===b[0]&&a[7]===b[1]&&a[8]===b[2]&&a[9]===b[3]&&a[10]===b[4]&&a[11]===b[5]&&(a[6]=c[0],a[7]=c[1],a[8]=c[2],a[9]=c[3],a[10]=c[4],a[11]=c[5]);var d=a[12]<<8|a[13];if(2048===d){if(a=a.subarray(14),4===a[0]>>4&&17===a[9]){a=a.subarray(20);d=a[0]<<8|a[1];var e=a[2]<<8|a[3];B(a[6]<<8|a[7],4);if(67===d||67===e)if(d=a.subarray(8),e=d[236]<<24|d[237]<<
16|d[238]<<8|d[239],1669485411!==e)B(e,8);else for(d[28]===b[0]&&d[29]===b[1]&&d[30]===b[2]&&d[31]===b[3]&&d[32]===b[4]&&d[33]===b[5]&&(d[28]=c[0],d[29]=c[1],d[30]=c[2],d[31]=c[3],d[32]=c[4],d[33]=c[5],a[6]=a[7]=0),e=240;e<d.length;){const g=d[e++];if(255===g)break;const f=d[e++];61===g&&1===d[e+0]&&d[e+1]===b[0]&&d[e+2]===b[1]&&d[e+3]===b[2]&&d[e+4]===b[3]&&d[e+5]===b[4]&&d[e+6]===b[5]&&(d[e+1]=c[0],d[e+2]=c[1],d[e+3]=c[2],d[e+4]=c[3],d[e+5]=c[4],d[e+6]=c[5],a[6]=a[7]=0);e+=f}}}else 2054===d&&(a=
a.subarray(14),La(a.subarray(8,14)),La(a.subarray(18,24)),a[8]===b[0]&&a[9]===b[1]&&a[10]===b[2]&&a[11]===b[3]&&a[12]===b[4]&&a[13]===b[5]&&(a[8]=c[0],a[9]=c[1],a[10]=c[2],a[11]=c[3],a[12]=c[4],a[13]=c[5]))}function La(a){return[a[0].toString(16).padStart(2,"0"),a[1].toString(16).padStart(2,"0"),a[2].toString(16).padStart(2,"0"),a[3].toString(16).padStart(2,"0"),a[4].toString(16).padStart(2,"0"),a[5].toString(16).padStart(2,"0")].join(":")}
function Ma(a,b,c,d,e){this.cpu=a;this.pci=a.devices.pci;this.id=e||0;this.preserve_mac_from_state_image=c;this.mac_address_translation=d;this.bus=b;this.bus.register("net"+this.id+"-receive",function(g){this.receive(g)},this);this.port=768+256*this.id;this.name="ne2k";this.pci_space=[236,16,41,128,3,1,0,0,0,0,0,2,0,0,0,0,this.port&255|1,this.port>>8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,244,26,0,17,0,0,184,254,0,0,0,0,0,0,0,0,0,1,0,0];this.pci_id=(0===this.id?5:7+this.id)<<3;this.pci_bars=
[{size:32}];this.imr=this.isr=0;this.cr=1;this.tpsr=this.tcnt=this.rcnt=this.dcfg=0;this.memory=new Uint8Array(32768);this.txcr=this.rxcr=0;this.tsr=1;this.mac=new Uint8Array([0,34,21,255*Math.random()|0,255*Math.random()|0,255*Math.random()|0]);this.bus.send("net"+this.id+"-mac",La(this.mac));this.mar=Uint8Array.of(255,255,255,255,255,255,255,255);this.mac_address_in_state=null;for(b=0;6>b;b++)this.memory[b<<1]=this.memory[b<<1|1]=this.mac[b];this.memory[28]=this.memory[29]=87;this.memory[30]=this.memory[31]=
87;pa("Mac: "+La(this.mac),1048576);this.rsar=0;this.pstart=64;this.pstop=128;this.boundary=this.curpg=76;b=a.io;b.register_read(this.port|0,this,function(){return this.cr});b.register_write(this.port|0,this,function(g){this.cr=g;B(g,2);B(this.txcr,2);this.cr&1||(g&24&&0===this.rcnt&&this.do_interrupt(64),g&4&&(g=this.tpsr<<8,g=this.memory.subarray(g,g+this.tcnt),this.mac_address_in_state&&(g=new Uint8Array(g),Ka(g,this.mac_address_in_state,this.mac)),this.bus.send("net"+this.id+"-send",g),this.bus.send("eth-transmit-end",
[g.length]),this.cr&=-5,this.do_interrupt(2),B(g.byteLength)))});b.register_read(this.port|13,this,function(){return 1===this.get_page()?this.mar[5]:0});b.register_read(this.port|14,this,function(){return 1===this.get_page()?this.mar[6]:0},function(){this.get_page();return 0});b.register_read(this.port|15,this,function(){return 1===this.get_page()?this.mar[7]:0});b.register_read(this.port|31,this,function(){this.get_page();this.do_interrupt(128);return 0});b.register_write(this.port|31,this,function(g){this.get_page();
B(g,2)});b.register_read(this.port|1,this,function(){var g=this.get_page();return 0===g?this.pstart:1===g?this.mac[0]:2===g?this.pstart:0});b.register_write(this.port|1,this,function(g){var f=this.get_page();0===f?(B(g,2),this.pstart=g):1===f?(B(g),this.mac[0]=g):B(g)});b.register_read(this.port|2,this,function(){var g=this.get_page();return 0===g?this.pstop:1===g?this.mac[1]:2===g?this.pstop:0});b.register_write(this.port|2,this,function(g){var f=this.get_page();0===f?(B(g,2),g>this.memory.length>>
8&&(g=this.memory.length>>8,B(g)),this.pstop=g):1===f?(B(g),this.mac[1]=g):B(g)});b.register_read(this.port|7,this,function(){var g=this.get_page();return 0===g?(B(this.isr,2),this.isr):1===g?(B(this.curpg,2),this.curpg):0});b.register_write(this.port|7,this,function(g){var f=this.get_page();0===f?(B(g,2),this.isr&=~g,this.update_irq()):1===f&&(B(g,2),this.curpg=g)});b.register_write(this.port|13,this,function(g){0===this.get_page()&&(this.txcr=g);B(g,2)});b.register_write(this.port|14,this,function(g){0===
this.get_page()?(B(g,2),this.dcfg=g):B(g,2)});b.register_read(this.port|10,this,function(){var g=this.get_page();return 0===g?80:1===g?this.mar[2]:0});b.register_write(this.port|10,this,function(g){0===this.get_page()?(B(g,2),this.rcnt=this.rcnt&65280|g&255):B(g,2)});b.register_read(this.port|11,this,function(){var g=this.get_page();return 0===g?67:1===g?this.mar[3]:0});b.register_write(this.port|11,this,function(g){0===this.get_page()?(B(g,2),this.rcnt=this.rcnt&255|g<<8&65280):B(g,2)});b.register_read(this.port|
8,this,function(){var g=this.get_page();return 0===g?this.rsar&255:1===g?this.mar[0]:0});b.register_write(this.port|8,this,function(g){0===this.get_page()?(B(g,2),this.rsar=this.rsar&65280|g&255):B(g,2)});b.register_read(this.port|9,this,function(){var g=this.get_page();return 0===g?this.rsar>>8&255:1===g?this.mar[1]:0});b.register_write(this.port|9,this,function(g){0===this.get_page()?(B(g,2),this.rsar=this.rsar&255|g<<8&65280):B(g,2)});b.register_write(this.port|15,this,function(g){0===this.get_page()?
(B(g,2),B(this.isr,2),this.imr=g,this.update_irq()):B(g,2)});b.register_read(this.port|3,this,function(){var g=this.get_page();return 0===g?(B(this.boundary,2),this.boundary):1===g?this.mac[2]:0});b.register_write(this.port|3,this,function(g){var f=this.get_page();0===f?(B(g,2),this.boundary=g):1===f?(B(g),this.mac[2]=g):B(g)});b.register_read(this.port|4,this,function(){var g=this.get_page();return 0===g?this.tsr:1===g?this.mac[3]:0});b.register_write(this.port|4,this,function(g){var f=this.get_page();
0===f?(B(g,2),this.tpsr=g):1===f?(B(g),this.mac[3]=g):B(g)});b.register_read(this.port|5,this,function(){var g=this.get_page();return 0===g?0:1===g?this.mac[4]:0});b.register_write(this.port|5,this,function(g){var f=this.get_page();0===f?(B(g,2),this.tcnt=this.tcnt&-256|g):1===f?(B(g),this.mac[4]=g):B(g)});b.register_read(this.port|6,this,function(){var g=this.get_page();return 0===g?0:1===g?this.mac[5]:0});b.register_write(this.port|6,this,function(g){var f=this.get_page();0===f?(B(g,2),this.tcnt=
this.tcnt&255|g<<8):1===f?(B(g),this.mac[5]=g):B(g)});b.register_read(this.port|12,this,function(){var g=this.get_page();return 0===g?9:1===g?this.mar[4]:0});b.register_write(this.port|12,this,function(g){0===this.get_page()?(B(g,2),this.rxcr=g):B(g)});b.register_read(this.port|16,this,this.data_port_read8,this.data_port_read16,this.data_port_read32);b.register_write(this.port|16,this,this.data_port_write16,this.data_port_write16,this.data_port_write32);a.devices.pci.register_device(this)}
Ma.prototype.get_state=function(){var a=[];a[0]=this.isr;a[1]=this.imr;a[2]=this.cr;a[3]=this.dcfg;a[4]=this.rcnt;a[5]=this.tcnt;a[6]=this.tpsr;a[7]=this.rsar;a[8]=this.pstart;a[9]=this.curpg;a[10]=this.boundary;a[11]=this.pstop;a[12]=this.rxcr;a[13]=this.txcr;a[14]=this.tsr;a[15]=this.mac;a[16]=this.memory;return a};
Ma.prototype.set_state=function(a){this.isr=a[0];this.imr=a[1];this.cr=a[2];this.dcfg=a[3];this.rcnt=a[4];this.tcnt=a[5];this.tpsr=a[6];this.rsar=a[7];this.pstart=a[8];this.curpg=a[9];this.boundary=a[10];this.pstop=a[11];this.rxcr=a[12];this.txcr=a[13];this.tsr=a[14];this.preserve_mac_from_state_image?(this.mac=a[15],this.memory=a[16]):this.mac_address_translation&&(this.mac_address_in_state=a[15],this.memory=a[16],La(this.mac_address_in_state),La(this.mac));this.bus.send("net"+this.id+"-mac",La(this.mac))};
Ma.prototype.do_interrupt=function(a){B(a,2);this.isr|=a;this.update_irq()};Ma.prototype.update_irq=function(){this.imr&this.isr?this.pci.raise_irq(this.pci_id):this.pci.lower_irq(this.pci_id)};Ma.prototype.data_port_write=function(a){if(16>=this.rsar||16384<=this.rsar&&32768>this.rsar)this.memory[this.rsar]=a;this.rsar++;this.rcnt--;this.rsar>=this.pstop<<8&&(this.rsar+=this.pstart-this.pstop<<8);0===this.rcnt&&this.do_interrupt(64)};
Ma.prototype.data_port_write16=function(a){this.data_port_write(a);this.dcfg&1&&this.data_port_write(a>>8)};Ma.prototype.data_port_write32=function(a){this.data_port_write(a);this.data_port_write(a>>8);this.data_port_write(a>>16);this.data_port_write(a>>24)};Ma.prototype.data_port_read=function(){let a=0;32768>this.rsar&&(a=this.memory[this.rsar]);this.rsar++;this.rcnt--;this.rsar>=this.pstop<<8&&(this.rsar+=this.pstart-this.pstop<<8);0===this.rcnt&&this.do_interrupt(64);return a};
Ma.prototype.data_port_read8=function(){return this.data_port_read16()&255};Ma.prototype.data_port_read16=function(){return this.dcfg&1?this.data_port_read()|this.data_port_read()<<8:this.data_port_read()};Ma.prototype.data_port_read32=function(){return this.data_port_read()|this.data_port_read()<<8|this.data_port_read()<<16|this.data_port_read()<<24};
Ma.prototype.receive=function(a){if(!(this.cr&1)&&(this.bus.send("eth-receive-end",[a.length]),this.rxcr&16||this.rxcr&4&&255===a[0]&&255===a[1]&&255===a[2]&&255===a[3]&&255===a[4]&&255===a[5]||!(this.rxcr&8&&1===(a[0]&1)||a[0]!==this.mac[0]||a[1]!==this.mac[1]||a[2]!==this.mac[2]||a[3]!==this.mac[3]||a[4]!==this.mac[4]||a[5]!==this.mac[5]))){this.mac_address_in_state&&(a=new Uint8Array(a),Ka(a,this.mac,this.mac_address_in_state));var b=this.curpg<<8,c=Math.max(60,a.length)+4,d=b+4,e=this.curpg+1+
(c>>8),g=b+c,f=1+(c>>8),k=this.boundary>this.curpg?this.boundary-this.curpg:this.pstop-this.curpg+this.boundary-this.pstart;k<f&&0!==this.boundary?(B(this.pstart),B(this.pstop),B(this.curpg),B(f),B(this.boundary),B(k)):(g>this.pstop<<8?(g=(this.pstop<<8)-d,this.memory.set(a.subarray(0,g),d),this.memory.set(a.subarray(g),this.pstart<<8),B(g)):(this.memory.set(a,d),60>a.length&&this.memory.fill(0,d+a.length,d+60)),e>=this.pstop&&(e+=this.pstart-this.pstop),this.memory[b]=1,this.memory[b+1]=e,this.memory[b+
2]=c,this.memory[b+3]=c>>8,this.curpg=e,B(b),B(c),B(e),this.do_interrupt(1))}};Ma.prototype.get_page=function(){return this.cr>>6&3};var Oa=new Uint8Array(256),Pa=[],Qa=[],Ra=[],Sa=new Uint8Array(256),Ta=[];
function S(a,b){this.cpu=a;this.bus=b;this.write_buffer=new ia(64);this.read_buffer=new ia(64);this.mixer_current_address=this.command_size=this.command=this.read_buffer_lastvalue=0;this.mixer_registers=new Uint8Array(256);this.mixer_reset();this.dummy_speaker_enabled=!1;this.test_register=0;this.dsp_signed=this.dsp_16bit=this.dsp_stereo=this.dsp_highspeed=!1;this.dac_buffers=[new ja(65536),new ja(65536)];this.dma=a.devices.dma;this.dma_channel=this.dma_irq=this.dma_bytes_block=this.dma_bytes_left=
this.dma_bytes_count=this.dma_sample_count=0;this.dma_channel_8bit=1;this.dma_channel_16bit=5;this.dma_autoinit=!1;this.dma_buffer=new ArrayBuffer(65536);this.dma_buffer_int8=new Int8Array(this.dma_buffer);this.dma_buffer_uint8=new Uint8Array(this.dma_buffer);this.dma_buffer_int16=new Int16Array(this.dma_buffer);this.dma_buffer_uint16=new Uint16Array(this.dma_buffer);this.dma_syncbuffer=new t.SyncBuffer(this.dma_buffer);this.dma_paused=this.dma_waiting_transfer=!1;this.sampling_rate=22050;b.send("dac-tell-sampling-rate",
this.sampling_rate);this.bytes_per_sample=1;this.e2_value=170;this.e2_count=0;this.asp_registers=new Uint8Array(256);this.mpu_read_buffer=new ia(64);this.fm_current_address1=this.fm_current_address0=this.mpu_read_buffer_lastvalue=0;this.fm_waveform_select_enable=!1;this.irq=5;this.irq_triggered=new Uint8Array(16);a.io.register_read_consecutive(544,this,this.port2x0_read,this.port2x1_read,this.port2x2_read,this.port2x3_read);a.io.register_read_consecutive(904,this,this.port2x0_read,this.port2x1_read);
a.io.register_read_consecutive(548,this,this.port2x4_read,this.port2x5_read);a.io.register_read(550,this,this.port2x6_read);a.io.register_read(551,this,this.port2x7_read);a.io.register_read(552,this,this.port2x8_read);a.io.register_read(553,this,this.port2x9_read);a.io.register_read(554,this,this.port2xA_read);a.io.register_read(555,this,this.port2xB_read);a.io.register_read(556,this,this.port2xC_read);a.io.register_read(557,this,this.port2xD_read);a.io.register_read_consecutive(558,this,this.port2xE_read,
this.port2xF_read);a.io.register_write_consecutive(544,this,this.port2x0_write,this.port2x1_write,this.port2x2_write,this.port2x3_write);a.io.register_write_consecutive(904,this,this.port2x0_write,this.port2x1_write);a.io.register_write_consecutive(548,this,this.port2x4_write,this.port2x5_write);a.io.register_write(550,this,this.port2x6_write);a.io.register_write(551,this,this.port2x7_write);a.io.register_write_consecutive(552,this,this.port2x8_write,this.port2x9_write);a.io.register_write(554,this,
this.port2xA_write);a.io.register_write(555,this,this.port2xB_write);a.io.register_write(556,this,this.port2xC_write);a.io.register_write(557,this,this.port2xD_write);a.io.register_write(558,this,this.port2xE_write);a.io.register_write(559,this,this.port2xF_write);a.io.register_read_consecutive(816,this,this.port3x0_read,this.port3x1_read);a.io.register_write_consecutive(816,this,this.port3x0_write,this.port3x1_write);this.dma.on_unmask(this.dma_on_unmask,this);b.register("dac-request-data",function(){this.dac_handle_request()},
this);b.register("speaker-has-initialized",function(){this.mixer_reset()},this);b.send("speaker-confirm-initialized");this.dsp_reset()}
S.prototype.dsp_reset=function(){this.write_buffer.clear();this.read_buffer.clear();this.command_size=this.command=0;this.dummy_speaker_enabled=!1;this.test_register=0;this.dsp_signed=this.dsp_16bit=this.dsp_stereo=this.dsp_highspeed=!1;this.dac_buffers[0].clear();this.dac_buffers[1].clear();this.dma_channel=this.dma_irq=this.dma_bytes_block=this.dma_bytes_left=this.dma_bytes_count=this.dma_sample_count=0;this.dma_autoinit=!1;this.dma_buffer_uint8.fill(0);this.dma_paused=this.dma_waiting_transfer=
!1;this.e2_value=170;this.e2_count=0;this.sampling_rate=22050;this.bytes_per_sample=1;this.lower_irq(1);this.irq_triggered.fill(0);this.asp_registers.fill(0);this.asp_registers[5]=1;this.asp_registers[9]=248};
S.prototype.get_state=function(){var a=[];a[2]=this.read_buffer_lastvalue;a[3]=this.command;a[4]=this.command_size;a[5]=this.mixer_current_address;a[6]=this.mixer_registers;a[7]=this.dummy_speaker_enabled;a[8]=this.test_register;a[9]=this.dsp_highspeed;a[10]=this.dsp_stereo;a[11]=this.dsp_16bit;a[12]=this.dsp_signed;a[15]=this.dma_sample_count;a[16]=this.dma_bytes_count;a[17]=this.dma_bytes_left;a[18]=this.dma_bytes_block;a[19]=this.dma_irq;a[20]=this.dma_channel;a[21]=this.dma_channel_8bit;a[22]=
this.dma_channel_16bit;a[23]=this.dma_autoinit;a[24]=this.dma_buffer_uint8;a[25]=this.dma_waiting_transfer;a[26]=this.dma_paused;a[27]=this.sampling_rate;a[28]=this.bytes_per_sample;a[29]=this.e2_value;a[30]=this.e2_count;a[31]=this.asp_registers;a[33]=this.mpu_read_buffer_last_value;a[34]=this.irq;a[35]=this.irq_triggered;return a};
S.prototype.set_state=function(a){this.read_buffer_lastvalue=a[2];this.command=a[3];this.command_size=a[4];this.mixer_current_address=a[5];this.mixer_registers=a[6];this.mixer_full_update();this.dummy_speaker_enabled=a[7];this.test_register=a[8];this.dsp_highspeed=a[9];this.dsp_stereo=a[10];this.dsp_16bit=a[11];this.dsp_signed=a[12];this.dma_sample_count=a[15];this.dma_bytes_count=a[16];this.dma_bytes_left=a[17];this.dma_bytes_block=a[18];this.dma_irq=a[19];this.dma_channel=a[20];this.dma_channel_8bit=
a[21];this.dma_channel_16bit=a[22];this.dma_autoinit=a[23];this.dma_buffer_uint8=a[24];this.dma_waiting_transfer=a[25];this.dma_paused=a[26];this.sampling_rate=a[27];this.bytes_per_sample=a[28];this.e2_value=a[29];this.e2_count=a[30];this.asp_registers=a[31];this.mpu_read_buffer_last_value=a[33];this.irq=a[34];this.irq_triggered=a[35];this.dma_buffer=this.dma_buffer_uint8.buffer;this.dma_buffer_int8=new Int8Array(this.dma_buffer);this.dma_buffer_int16=new Int16Array(this.dma_buffer);this.dma_buffer_uint16=
new Uint16Array(this.dma_buffer);this.dma_syncbuffer=new t.SyncBuffer(this.dma_buffer);this.dma_paused?this.bus.send("dac-disable"):this.bus.send("dac-enable")};S.prototype.port2x0_read=function(){return 255};S.prototype.port2x1_read=function(){return 255};S.prototype.port2x2_read=function(){return 255};S.prototype.port2x3_read=function(){return 255};S.prototype.port2x4_read=function(){return this.mixer_current_address};S.prototype.port2x5_read=function(){return this.mixer_read(this.mixer_current_address)};
S.prototype.port2x6_read=function(){return 255};S.prototype.port2x7_read=function(){return 255};S.prototype.port2x8_read=function(){return 255};S.prototype.port2x9_read=function(){return 255};S.prototype.port2xA_read=function(){this.read_buffer.length&&(this.read_buffer_lastvalue=this.read_buffer.shift());B(this.read_buffer_lastvalue);String.fromCharCode(this.read_buffer_lastvalue);return this.read_buffer_lastvalue};S.prototype.port2xB_read=function(){return 255};S.prototype.port2xC_read=function(){return 127};
S.prototype.port2xD_read=function(){return 255};S.prototype.port2xE_read=function(){this.irq_triggered[1]&&this.lower_irq(1);return(this.read_buffer.length&&!this.dsp_highspeed)<<7|127};S.prototype.port2xF_read=function(){this.lower_irq(2);return 0};S.prototype.port2x0_write=function(a){B(a);this.fm_current_address0=0};S.prototype.port2x1_write=function(a){B(a);var b=Ta[this.fm_current_address0];b||(b=this.fm_default_write);b.call(this,a,0,this.fm_current_address0)};
S.prototype.port2x2_write=function(a){B(a);this.fm_current_address1=0};S.prototype.port2x3_write=function(a){B(a);var b=Ta[this.fm_current_address1];b||(b=this.fm_default_write);b.call(this,a,1,this.fm_current_address1)};S.prototype.port2x4_write=function(a){B(a);this.mixer_current_address=a};S.prototype.port2x5_write=function(a){B(a);this.mixer_write(this.mixer_current_address,a)};
S.prototype.port2x6_write=function(a){B(a);this.dsp_highspeed?this.dsp_highspeed=!1:a&&this.dsp_reset();this.read_buffer.clear();this.read_buffer.push(170)};S.prototype.port2x7_write=function(){};S.prototype.port2x8_write=function(){};S.prototype.port2x9_write=function(){};S.prototype.port2xA_write=function(){};S.prototype.port2xB_write=function(){};
S.prototype.port2xC_write=function(a){0===this.command?(B(a),this.command=a,this.write_buffer.clear(),this.command_size=Oa[a]):(B(a),this.write_buffer.push(a));this.write_buffer.length>=this.command_size&&this.command_do()};S.prototype.port2xD_write=function(){};S.prototype.port2xE_write=function(){};S.prototype.port2xF_write=function(){};
S.prototype.port3x0_read=function(){this.mpu_read_buffer.length&&(this.mpu_read_buffer_lastvalue=this.mpu_read_buffer.shift());B(this.mpu_read_buffer_lastvalue);return this.mpu_read_buffer_lastvalue};S.prototype.port3x0_write=function(a){B(a)};S.prototype.port3x1_read=function(){return 0|128*!this.mpu_read_buffer.length};S.prototype.port3x1_write=function(a){B(a);255===a&&(this.mpu_read_buffer.clear(),this.mpu_read_buffer.push(254))};
S.prototype.command_do=function(){var a=Pa[this.command];a||(a=this.dsp_default_handler);a.call(this);this.command_size=this.command=0;this.write_buffer.clear()};S.prototype.dsp_default_handler=function(){B(this.command)};function T(a,b,c){c||(c=S.prototype.dsp_default_handler);for(var d=0;d<a.length;d++)Oa[a[d]]=b,Pa[a[d]]=c}function Ua(a){for(var b=[],c=0;16>c;c++)b.push(a+c);return b}T([14],2,function(){this.asp_registers[this.write_buffer.shift()]=this.write_buffer.shift()});
T([15],1,function(){this.read_buffer.clear();this.read_buffer.push(this.asp_registers[this.write_buffer.shift()])});T([16],1,function(){var a=this.write_buffer.shift();a=Va(a/127.5+-1,-1,1);this.dac_buffers[0].push(a);this.dac_buffers[1].push(a);this.bus.send("dac-enable")});T([20,21],2,function(){this.dma_irq=1;this.dma_channel=this.dma_channel_8bit;this.dsp_highspeed=this.dsp_16bit=this.dsp_signed=this.dma_autoinit=!1;this.dma_transfer_size_set();this.dma_transfer_start()});T([22],2);T([23],2);
T([28],0,function(){this.dma_irq=1;this.dma_channel=this.dma_channel_8bit;this.dma_autoinit=!0;this.dsp_highspeed=this.dsp_16bit=this.dsp_signed=!1;this.dma_transfer_start()});T([31],0);T([32],0,function(){this.read_buffer.clear();this.read_buffer.push(127)});T([36],2);T([44],0);T([48],0);T([49],0);T([52],0);T([53],0);T([54],0);T([55],0);T([56],0);T([64],1,function(){this.sampling_rate_change(1E6/(256-this.write_buffer.shift())/this.get_channel_count())});
T([65,66],2,function(){this.sampling_rate_change(this.write_buffer.shift()<<8|this.write_buffer.shift())});T([72],2,function(){this.dma_transfer_size_set()});T([116],2);T([117],2);T([118],2);T([119],2);T([125],0);T([127],0);T([128],2);T([144],0,function(){this.dma_irq=1;this.dma_channel=this.dma_channel_8bit;this.dma_autoinit=!0;this.dsp_signed=!1;this.dsp_highspeed=!0;this.dsp_16bit=!1;this.dma_transfer_start()});T([145],0);T([152],0);T([153],0);T([160],0);T([168],0);
T(Ua(176),3,function(){if(this.command&8)this.dsp_default_handler();else{var a=this.write_buffer.shift();this.dma_irq=2;this.dma_channel=this.dma_channel_16bit;this.dma_autoinit=!!(this.command&4);this.dsp_signed=!!(a&16);this.dsp_stereo=!!(a&32);this.dsp_16bit=!0;this.dma_transfer_size_set();this.dma_transfer_start()}});
T(Ua(192),3,function(){if(this.command&8)this.dsp_default_handler();else{var a=this.write_buffer.shift();this.dma_irq=1;this.dma_channel=this.dma_channel_8bit;this.dma_autoinit=!!(this.command&4);this.dsp_signed=!!(a&16);this.dsp_stereo=!!(a&32);this.dsp_16bit=!1;this.dma_transfer_size_set();this.dma_transfer_start()}});T([208],0,function(){this.dma_paused=!0;this.bus.send("dac-disable")});T([209],0,function(){this.dummy_speaker_enabled=!0});T([211],0,function(){this.dummy_speaker_enabled=!1});
T([212],0,function(){this.dma_paused=!1;this.bus.send("dac-enable")});T([213],0,function(){this.dma_paused=!0;this.bus.send("dac-disable")});T([214],0,function(){this.dma_paused=!1;this.bus.send("dac-enable")});T([216],0,function(){this.read_buffer.clear();this.read_buffer.push(255*this.dummy_speaker_enabled)});T([217,218],0,function(){this.dma_autoinit=!1});T([224],1,function(){this.read_buffer.clear();this.read_buffer.push(~this.write_buffer.shift())});
T([225],0,function(){this.read_buffer.clear();this.read_buffer.push(4);this.read_buffer.push(5)});T([226],1);T([227],0,function(){this.read_buffer.clear();for(var a=0;44>a;a++)this.read_buffer.push("COPYRIGHT (C) CREATIVE TECHNOLOGY LTD, 1992.".charCodeAt(a));this.read_buffer.push(0)});T([228],1,function(){this.test_register=this.write_buffer.shift()});T([232],0,function(){this.read_buffer.clear();this.read_buffer.push(this.test_register)});T([242,243],0,function(){this.raise_irq()});var Wa=new Uint8Array(256);
Wa[14]=255;Wa[15]=7;Wa[55]=56;T([249],1,function(){var a=this.write_buffer.shift();this.read_buffer.clear();this.read_buffer.push(Wa[a])});S.prototype.mixer_read=function(a){var b=Qa[a];b?b=b.call(this):(b=this.mixer_registers[a],B(a),B(b));return b};S.prototype.mixer_write=function(a,b){var c=Ra[a];c?c.call(this,b):(B(a),B(b))};S.prototype.mixer_default_read=function(){B(this.mixer_current_address);return this.mixer_registers[this.mixer_current_address]};
S.prototype.mixer_default_write=function(a){B(this.mixer_current_address);B(a);this.mixer_registers[this.mixer_current_address]=a};
S.prototype.mixer_reset=function(){this.mixer_registers[4]=204;this.mixer_registers[34]=204;this.mixer_registers[38]=204;this.mixer_registers[40]=0;this.mixer_registers[46]=0;this.mixer_registers[10]=0;this.mixer_registers[48]=192;this.mixer_registers[49]=192;this.mixer_registers[50]=192;this.mixer_registers[51]=192;this.mixer_registers[52]=192;this.mixer_registers[53]=192;this.mixer_registers[54]=0;this.mixer_registers[55]=0;this.mixer_registers[56]=0;this.mixer_registers[57]=0;this.mixer_registers[59]=
0;this.mixer_registers[60]=31;this.mixer_registers[61]=21;this.mixer_registers[62]=11;this.mixer_registers[63]=0;this.mixer_registers[64]=0;this.mixer_registers[65]=0;this.mixer_registers[66]=0;this.mixer_registers[67]=0;this.mixer_registers[68]=128;this.mixer_registers[69]=128;this.mixer_registers[70]=128;this.mixer_registers[71]=128;this.mixer_full_update()};S.prototype.mixer_full_update=function(){for(var a=1;a<this.mixer_registers.length;a++)Sa[a]||this.mixer_write(a,this.mixer_registers[a])};
function Xa(a,b){b||(b=S.prototype.mixer_default_read);Qa[a]=b}function Ya(a,b){b||(b=S.prototype.mixer_default_write);Ra[a]=b}function Za(a,b,c){Sa[a]=1;Qa[a]=function(){return this.mixer_registers[b]&240|this.mixer_registers[c]>>>4};Ra[a]=function(d){this.mixer_registers[a]=d;var e=d<<4&240|this.mixer_registers[c]&15;this.mixer_write(b,d&240|this.mixer_registers[b]&15);this.mixer_write(c,e)}}
function $a(a,b,c){Qa[a]=S.prototype.mixer_default_read;Ra[a]=function(d){this.mixer_registers[a]=d;this.bus.send("mixer-volume",[b,c,(d>>>2)-62])}}Xa(0,function(){this.mixer_reset();return 0});Ya(0);Za(4,50,51);Za(34,48,49);Za(38,52,53);Za(40,54,55);Za(46,56,57);$a(48,0,0);$a(49,0,1);$a(50,2,0);$a(51,2,1);Xa(59);Ya(59,function(a){this.mixer_registers[59]=a;this.bus.send("mixer-volume",[1,2,6*(a>>>6)-18])});Xa(65);
Ya(65,function(a){this.mixer_registers[65]=a;this.bus.send("mixer-gain-left",6*(a>>>6))});Xa(66);Ya(66,function(a){this.mixer_registers[66]=a;this.bus.send("mixer-gain-right",6*(a>>>6))});Xa(68);Ya(68,function(a){this.mixer_registers[68]=a;a>>>=3;this.bus.send("mixer-treble-left",a-(16>a?14:16))});Xa(69);Ya(69,function(a){this.mixer_registers[69]=a;a>>>=3;this.bus.send("mixer-treble-right",a-(16>a?14:16))});Xa(70);
Ya(70,function(a){this.mixer_registers[70]=a;a>>>=3;this.bus.send("mixer-bass-right",a-(16>a?14:16))});Xa(71);Ya(71,function(a){this.mixer_registers[71]=a;a>>>=3;this.bus.send("mixer-bass-right",a-(16>a?14:16))});Xa(128,function(){switch(this.irq){case 2:return 1;case 5:return 2;case 7:return 4;case 10:return 8;default:return 0}});Ya(128,function(a){a&1&&(this.irq=2);a&2&&(this.irq=5);a&4&&(this.irq=7);a&8&&(this.irq=10)});
Xa(129,function(){var a=0;switch(this.dma_channel_8bit){case 0:a|=1;break;case 1:a|=2;break;case 3:a|=8}switch(this.dma_channel_16bit){case 5:a|=32;break;case 6:a|=64;break;case 7:a|=128}return a});Ya(129,function(a){a&1&&(this.dma_channel_8bit=0);a&2&&(this.dma_channel_8bit=1);a&8&&(this.dma_channel_8bit=3);a&32&&(this.dma_channel_16bit=5);a&64&&(this.dma_channel_16bit=6);a&128&&(this.dma_channel_16bit=7)});Xa(130,function(){for(var a=32,b=0;16>b;b++)a|=b*this.irq_triggered[b];return a});
S.prototype.fm_default_write=function(a,b,c){B(c);B(a)};function ab(a,b){b||(b=S.prototype.fm_default_write);for(var c=0;c<a.length;c++)Ta[a[c]]=b}function bb(a,b){for(var c=[];a<=b;a++)c.push(a);return c}var hb=new Uint8Array(32);hb[0]=0;hb[1]=1;hb[2]=2;hb[3]=3;hb[4]=4;hb[5]=5;hb[8]=6;hb[9]=7;hb[10]=8;hb[11]=9;hb[12]=10;hb[13]=11;hb[16]=12;hb[17]=13;hb[18]=14;hb[19]=15;hb[20]=16;hb[21]=17;ab([1],function(a,b){this.fm_waveform_select_enable[b]=a&1;this.fm_update_waveforms()});ab([2]);ab([3]);
ab([4],function(){});ab([5],function(a,b,c){0===b&&this.fm_default_write(a,b,c)});ab([8],function(){});ab(bb(32,53),function(){});ab(bb(64,85),function(){});ab(bb(96,117),function(){});ab(bb(128,149),function(){});ab(bb(160,168),function(){});ab(bb(176,184),function(){});ab([189],function(){});ab(bb(192,200),function(){});ab(bb(224,245),function(){});S.prototype.fm_update_waveforms=function(){};
S.prototype.sampling_rate_change=function(a){this.sampling_rate=a;this.bus.send("dac-tell-sampling-rate",a)};S.prototype.get_channel_count=function(){return this.dsp_stereo?2:1};S.prototype.dma_transfer_size_set=function(){this.dma_sample_count=1+(this.write_buffer.shift()<<0)+(this.write_buffer.shift()<<8)};
S.prototype.dma_transfer_start=function(){this.bytes_per_sample=1;this.dsp_16bit&&(this.bytes_per_sample*=2);this.dma_bytes_count=this.dma_sample_count*this.bytes_per_sample;this.dma_bytes_block=1024*this.bytes_per_sample;this.dma_bytes_block=Math.min(Math.max(this.dma_bytes_count>>2&-4,32),this.dma_bytes_block);this.dma_waiting_transfer=!0;this.dma.channel_mask[this.dma_channel]||this.dma_on_unmask(this.dma_channel)};
S.prototype.dma_on_unmask=function(a){a===this.dma_channel&&this.dma_waiting_transfer&&(this.dma_waiting_transfer=!1,this.dma_bytes_left=this.dma_bytes_count,this.dma_paused=!1,this.bus.send("dac-enable"))};
S.prototype.dma_transfer_next=function(){var a=Math.min(this.dma_bytes_left,this.dma_bytes_block),b=Math.floor(a/this.bytes_per_sample);this.dma.do_write(this.dma_syncbuffer,0,a,this.dma_channel,c=>{c||(this.dma_to_dac(b),this.dma_bytes_left-=a,this.dma_bytes_left||(this.raise_irq(this.dma_irq),this.dma_autoinit&&(this.dma_bytes_left=this.dma_bytes_count)))})};
S.prototype.dma_to_dac=function(a){var b=this.dsp_16bit?32767.5:127.5,c=this.dsp_signed?0:-1,d=this.dsp_stereo?1:2;var e=this.dsp_16bit?this.dsp_signed?this.dma_buffer_int16:this.dma_buffer_uint16:this.dsp_signed?this.dma_buffer_int8:this.dma_buffer_uint8;for(var g=0,f=0;f<a;f++)for(var k=Va(e[f]/b+c,-1,1),l=0;l<d;l++)this.dac_buffers[g].push(k),g^=1;this.dac_send()};S.prototype.dac_handle_request=function(){!this.dma_bytes_left||this.dma_paused?this.dac_send():this.dma_transfer_next()};
S.prototype.dac_send=function(){if(this.dac_buffers[0].length){var a=this.dac_buffers[0].shift_block(this.dac_buffers[0].length),b=this.dac_buffers[1].shift_block(this.dac_buffers[1].length);this.bus.send("dac-send-data",[a,b],[a.buffer,b.buffer])}};S.prototype.raise_irq=function(a){this.irq_triggered[a]=1;this.cpu.device_raise_irq(this.irq)};S.prototype.lower_irq=function(a){this.irq_triggered[a]=0;this.cpu.device_lower_irq(this.irq)};function Va(a,b,c){return(a<b)*b+(a>c)*c+(b<=a&&a<=c)*a};function h(a,b){this.cpu=a;this.pci=a.devices.pci;this.device_id=b.device_id;this.pci_space=[244,26,b.device_id&255,b.device_id>>8,7,5,16,0,1,0,2,0,0,0,0,0,1,168,0,0,0,16,191,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,244,26,b.subsystem_device_id&255,b.subsystem_device_id>>8,0,0,0,0,64,0,0,0,0,0,0,0,0,1,0,0];this.pci_space=this.pci_space.concat(t.zeros(256-this.pci_space.length));this.pci_id=b.pci_id;this.pci_bars=[];this.name=b.name;this.driver_feature_select=this.device_feature_select=0;this.device_feature=
new Uint32Array(4);this.driver_feature=new Uint32Array(4);for(var c of b.common.features)this.device_feature[c>>>5]|=1<<(c&31),this.driver_feature[c>>>5]|=1<<(c&31);b.common.features.includes(32);this.features_ok=!0;this.device_status=0;this.config_has_changed=!1;this.config_generation=0;this.queues=[];for(const d of b.common.queues)this.queues.push(new U(a,this,d));this.queue_select=0;this.queue_selected=this.queues[0];this.isr_status=0;c=[];c.push(this.create_common_capability(b.common));c.push(this.create_notification_capability(b.notification));
c.push(this.create_isr_capability(b.isr_status));b.device_specific&&c.push(this.create_device_specific_capability(b.device_specific));this.init_capabilities(c);a.devices.pci.register_device(this);this.reset()}
h.prototype.create_common_capability=function(a){return{type:1,bar:0,port:a.initial_port,use_mmio:!1,offset:0,extra:new Uint8Array(0),struct:[{bytes:4,name:"device_feature_select",read:()=>this.device_feature_select,write:b=>{this.device_feature_select=b}},{bytes:4,name:"device_feature",read:()=>this.device_feature[this.device_feature_select]||0,write:()=>{}},{bytes:4,name:"driver_feature_select",read:()=>this.driver_feature_select,write:b=>{this.driver_feature_select=b}},{bytes:4,name:"driver_feature",
read:()=>this.driver_feature[this.driver_feature_select]||0,write:b=>{const c=this.device_feature[this.driver_feature_select];this.driver_feature_select<this.driver_feature.length&&(this.driver_feature[this.driver_feature_select]=b&c);this.features_ok=this.features_ok&&!(b&~c)}},{bytes:2,name:"msix_config",read:()=>65535,write:()=>{}},{bytes:2,name:"num_queues",read:()=>this.queues.length,write:()=>{}},{bytes:1,name:"device_status",read:()=>this.device_status,write:b=>{0===b&&this.reset();b&~this.device_status&
4&&this.device_status&64&&this.notify_config_changes();this.features_ok||(b&=-9);this.device_status=b;if(b&~this.device_status&4)a.on_driver_ok()}},{bytes:1,name:"config_generation",read:()=>this.config_generation,write:()=>{}},{bytes:2,name:"queue_select",read:()=>this.queue_select,write:b=>{this.queue_select=b;this.queue_selected=this.queue_select<this.queues.length?this.queues[this.queue_select]:null}},{bytes:2,name:"queue_size",read:()=>this.queue_selected?this.queue_selected.size:0,write:b=>
{this.queue_selected&&(b&b-1&&(b=1<<t.int_log2(b-1)+1),b>this.queue_selected.size_supported&&(b=this.queue_selected.size_supported),this.queue_selected.set_size(b))}},{bytes:2,name:"queue_msix_vector",read:()=>65535,write:()=>{}},{bytes:2,name:"queue_enable",read:()=>this.queue_selected?this.queue_selected.enabled|0:0,write:b=>{this.queue_selected&&1===b&&this.queue_selected.is_configured()&&this.queue_selected.enable()}},{bytes:2,name:"queue_notify_off",read:()=>this.queue_selected?this.queue_selected.notify_offset:
0,write:()=>{}},{bytes:4,name:"queue_desc (low dword)",read:()=>this.queue_selected?this.queue_selected.desc_addr:0,write:b=>{this.queue_selected&&(this.queue_selected.desc_addr=b)}},{bytes:4,name:"queue_desc (high dword)",read:()=>0,write:()=>{}},{bytes:4,name:"queue_avail (low dword)",read:()=>this.queue_selected?this.queue_selected.avail_addr:0,write:b=>{this.queue_selected&&(this.queue_selected.avail_addr=b)}},{bytes:4,name:"queue_avail (high dword)",read:()=>0,write:()=>{}},{bytes:4,name:"queue_used (low dword)",
read:()=>this.queue_selected?this.queue_selected.used_addr:0,write:b=>{this.queue_selected&&(this.queue_selected.used_addr=b)}},{bytes:4,name:"queue_used (high dword)",read:()=>0,write:()=>{}}]}};
h.prototype.create_notification_capability=function(a){const b=[];let c;c=a.single_handler?0:2;for(const [d,e]of a.handlers.entries())b.push({bytes:2,name:"notify"+d,read:()=>65535,write:e||(()=>{})});return{type:2,bar:1,port:a.initial_port,use_mmio:!1,offset:0,extra:new Uint8Array([c&255,c>>8&255,c>>16&255,c>>24]),struct:b}};
h.prototype.create_isr_capability=function(a){return{type:3,bar:2,port:a.initial_port,use_mmio:!1,offset:0,extra:new Uint8Array(0),struct:[{bytes:1,name:"isr_status",read:()=>{const b=this.isr_status;this.lower_irq();return b},write:()=>{}}]}};h.prototype.create_device_specific_capability=function(a){return{type:4,bar:3,port:a.initial_port,use_mmio:!1,offset:0,extra:new Uint8Array(0),struct:a.struct}};
h.prototype.init_capabilities=function(a){let b=this.pci_space[52]=64;var c=b;for(const e of a){a=16+e.extra.length;c=b;b=c+a;var d=e.struct.reduce((g,f)=>g+f.bytes,0);d+=e.offset;d=16>d?16:1<<t.int_log2(d-1)+1;this.pci_bars[e.bar]={size:d};this.pci_space[c]=9;this.pci_space[c+1]=b;this.pci_space[c+2]=a;this.pci_space[c+3]=e.type;this.pci_space[c+4]=e.bar;this.pci_space[c+5]=0;this.pci_space[c+6]=0;this.pci_space[c+7]=0;this.pci_space[c+8]=e.offset&255;this.pci_space[c+9]=e.offset>>>8&255;this.pci_space[c+
10]=e.offset>>>16&255;this.pci_space[c+11]=e.offset>>>24;this.pci_space[c+12]=d&255;this.pci_space[c+13]=d>>>8&255;this.pci_space[c+14]=d>>>16&255;this.pci_space[c+15]=d>>>24;for(const [g,f]of e.extra.entries())this.pci_space[c+16+g]=f;c=16+4*e.bar;this.pci_space[c]=e.port&254|!e.use_mmio;this.pci_space[c+1]=e.port>>>8&255;this.pci_space[c+2]=e.port>>>16&255;this.pci_space[c+3]=e.port>>>24&255;c=e.port+e.offset;for(const g of e.struct){let f=g.read;a=g.write;if(!e.use_mmio){d=function(l){return f(l&
-2)>>((l&1)<<3)&255};const k=function(l){return f(l&-4)>>((l&3)<<3)&255};switch(g.bytes){case 4:this.cpu.io.register_read(c,this,k,void 0,f);this.cpu.io.register_read(c+1,this,k);this.cpu.io.register_read(c+2,this,k);this.cpu.io.register_read(c+3,this,k);this.cpu.io.register_write(c,this,void 0,void 0,a);break;case 2:this.cpu.io.register_read(c,this,d,f);this.cpu.io.register_read(c+1,this,d);this.cpu.io.register_write(c,this,void 0,a);break;case 1:this.cpu.io.register_read(c,this,f),this.cpu.io.register_write(c,
this,a)}}c+=g.bytes}}this.pci_space[b]=9;this.pci_space[b+1]=0;this.pci_space[b+2]=20;this.pci_space[b+3]=5;this.pci_space[b+4]=0;this.pci_space[b+5]=0;this.pci_space[b+6]=0;this.pci_space[b+7]=0;this.pci_space[b+8]=0;this.pci_space[b+9]=0;this.pci_space[b+10]=0;this.pci_space[b+11]=0;this.pci_space[b+12]=0;this.pci_space[b+13]=0;this.pci_space[b+14]=0;this.pci_space[b+15]=0;this.pci_space[b+16]=0;this.pci_space[b+17]=0;this.pci_space[b+18]=0;this.pci_space[b+19]=0};
h.prototype.get_state=function(){let a=[];a[0]=this.device_feature_select;a[1]=this.driver_feature_select;a[2]=this.device_feature;a[3]=this.driver_feature;a[4]=this.features_ok;a[5]=this.device_status;a[6]=this.config_has_changed;a[7]=this.config_generation;a[8]=this.isr_status;a[9]=this.queue_select;return a=a.concat(this.queues)};
h.prototype.set_state=function(a){this.device_feature_select=a[0];this.driver_feature_select=a[1];this.device_feature=a[2];this.driver_feature=a[3];this.features_ok=a[4];this.device_status=a[5];this.config_has_changed=a[6];this.config_generation=a[7];this.isr_status=a[8];this.queue_select=a[9];let b=0;for(const c of a.slice(10))this.queues[b].set_state(c),b++;this.queue_selected=this.queues[this.queue_select]||null};
h.prototype.reset=function(){this.driver_feature_select=this.device_feature_select=0;this.driver_feature.set(this.device_feature);this.features_ok=!0;this.queue_select=this.device_status=0;this.queue_selected=this.queues[0];for(const a of this.queues)a.reset();this.config_has_changed=!1;this.config_generation=0;this.lower_irq()};h.prototype.notify_config_changes=function(){this.config_has_changed=!0;this.device_status&4&&this.raise_irq(2)};
h.prototype.update_config_generation=function(){this.config_has_changed&&(this.config_generation++,this.config_generation&=255,this.config_has_changed=!1)};h.prototype.is_feature_negotiated=function(a){return 0<(this.driver_feature[a>>>5]&1<<(a&31))};h.prototype.needs_reset=function(){this.device_status|=64;this.device_status&4&&this.notify_config_changes()};h.prototype.raise_irq=function(a){B(a);this.isr_status|=a;this.pci.raise_irq(this.pci_id)};
h.prototype.lower_irq=function(){this.isr_status=0;this.pci.lower_irq(this.pci_id)};function U(a,b,c){this.cpu=a;this.virtio=b;this.size_supported=this.size=c.size_supported;this.mask=this.size-1;this.enabled=!1;this.notify_offset=c.notify_offset;this.num_staged_replies=this.used_addr=this.avail_last_idx=this.avail_addr=this.desc_addr=0;this.reset()}
U.prototype.get_state=function(){const a=[];a[0]=this.size;a[1]=this.size_supported;a[2]=this.enabled;a[3]=this.notify_offset;a[4]=this.desc_addr;a[5]=this.avail_addr;a[6]=this.avail_last_idx;a[7]=this.used_addr;a[8]=this.num_staged_replies;return a};
U.prototype.set_state=function(a){this.size=a[0];this.size_supported=a[1];this.enabled=a[2];this.notify_offset=a[3];this.desc_addr=a[4];this.avail_addr=a[5];this.avail_last_idx=a[6];this.used_addr=a[7];this.num_staged_replies=a[8];this.mask=this.size-1};U.prototype.reset=function(){this.enabled=!1;this.num_staged_replies=this.used_addr=this.avail_last_idx=this.avail_addr=this.desc_addr=0;this.set_size(this.size_supported)};
U.prototype.is_configured=function(){return this.desc_addr&&this.avail_addr&&this.used_addr};U.prototype.enable=function(){this.is_configured();this.enabled=!0};U.prototype.set_size=function(a){this.size=a;this.mask=a-1};U.prototype.count_requests=function(){return this.avail_get_idx()-this.avail_last_idx&65535};U.prototype.has_request=function(){return 0!==this.count_requests()};
U.prototype.pop_request=function(){this.has_request();var a=this.avail_get_entry(this.avail_last_idx);a=new ib(this,a);this.avail_last_idx=this.avail_last_idx+1&65535;return a};U.prototype.push_reply=function(a){const b=this.used_get_idx()+this.num_staged_replies&this.mask;this.used_set_entry(b,a.head_idx,a.length_written);this.num_staged_replies++};
U.prototype.flush_replies=function(){if(0!==this.num_staged_replies){var a=this.used_get_idx()+this.num_staged_replies&65535;this.used_set_idx(a);this.num_staged_replies=0;this.virtio.is_feature_negotiated(29)?(this.avail_get_used_event(),this.virtio.raise_irq(1)):~this.avail_get_flags()&1&&this.virtio.raise_irq(1)}};U.prototype.notify_me_after=function(a){a=this.avail_get_idx()+a&65535;this.used_set_avail_event(a)};
U.prototype.get_descriptor=function(a,b){return{addr_low:this.cpu.read32s(a+16*b),addr_high:this.cpu.read32s(a+16*b+4),len:this.cpu.read32s(a+16*b+8),flags:this.cpu.read16(a+16*b+12),next:this.cpu.read16(a+16*b+14)}};U.prototype.avail_get_flags=function(){return this.cpu.read16(this.avail_addr)};U.prototype.avail_get_idx=function(){return this.cpu.read16(this.avail_addr+2)};U.prototype.avail_get_entry=function(a){return this.cpu.read16(this.avail_addr+4+2*(a&this.mask))};
U.prototype.avail_get_used_event=function(){return this.cpu.read16(this.avail_addr+4+2*this.size)};U.prototype.used_get_flags=function(){return this.cpu.read16(this.used_addr)};U.prototype.used_set_flags=function(a){this.cpu.write16(this.used_addr,a)};U.prototype.used_get_idx=function(){return this.cpu.read16(this.used_addr+2)};U.prototype.used_set_idx=function(a){this.cpu.write16(this.used_addr+2,a)};
U.prototype.used_set_entry=function(a,b,c){this.cpu.write32(this.used_addr+4+8*a,b);this.cpu.write32(this.used_addr+8+8*a,c)};U.prototype.used_set_avail_event=function(a){this.cpu.write16(this.used_addr+4+8*this.size,a)};
function ib(a,b){this.cpu=a.cpu;this.virtio=a.virtio;this.head_idx=b;this.read_buffers=[];this.length_readable=this.read_buffer_offset=this.read_buffer_idx=0;this.write_buffers=[];this.length_writable=this.length_written=this.write_buffer_offset=this.write_buffer_idx=0;let c=a.desc_addr,d=0,e=a.size,g=!1;const f=this.virtio.is_feature_negotiated(28);do{const k=a.get_descriptor(c,b);B(k.addr_high,8);B(k.addr_low,8);B(k.len,8);B(k.flags,4);B(k.next,4);if(f&&k.flags&4)c=k.addr_low,d=b=0,e=k.len/16;else{if(k.flags&
2)g=!0,this.write_buffers.push(k),this.length_writable+=k.len;else{if(g)break;this.read_buffers.push(k);this.length_readable+=k.len}d++;if(d>e)break;if(k.flags&1)b=k.next;else break}}while(1)}
ib.prototype.get_next_blob=function(a){let b=0,c=a.length;for(;c&&this.read_buffer_idx!==this.read_buffers.length;){var d=this.read_buffers[this.read_buffer_idx];const e=d.addr_low+this.read_buffer_offset;d=d.len-this.read_buffer_offset;d>c?(d=c,this.read_buffer_offset+=c):(this.read_buffer_idx++,this.read_buffer_offset=0);a.set(this.cpu.read_blob(e,d),b);b+=d;c-=d}return b};
ib.prototype.set_next_blob=function(a){let b=0,c=a.length;for(;c&&this.write_buffer_idx!==this.write_buffers.length;){var d=this.write_buffers[this.write_buffer_idx];const e=d.addr_low+this.write_buffer_offset;d=d.len-this.write_buffer_offset;d>c?(d=c,this.write_buffer_offset+=c):(this.write_buffer_idx++,this.write_buffer_offset=0);this.cpu.write_blob(a.subarray(b,b+d),e);b+=d;c-=d}this.length_written+=b;return b};function jb(a,b){this.bus=b;this.rows=25;this.cols=80;this.ports=4;b=[{size_supported:16,notify_offset:0},{size_supported:16,notify_offset:1},{size_supported:16,notify_offset:2},{size_supported:16,notify_offset:3}];for(let c=1;c<this.ports;++c)b.push({size_supported:16,notify_offset:0}),b.push({size_supported:8,notify_offset:1});this.virtio=new h(a,{name:"virtio-console",pci_id:96,device_id:4163,subsystem_device_id:3,common:{initial_port:47104,queues:b,features:[0,1,32],on_driver_ok:()=>{}},notification:{initial_port:47360,
single_handler:!1,handlers:[()=>{},c=>{const d=this.virtio.queues[c],e=3<c?c-3>>1:0;for(;d.has_request();){const g=d.pop_request(),f=new Uint8Array(g.length_readable);g.get_next_blob(f);this.bus.send("virtio-console"+e+"-output-bytes",f);this.Ack(c,g)}},c=>{if(2===c)for(c=this.virtio.queues[c];c.count_requests()>c.size-2;)c.pop_request()},c=>{if(3===c)for(var d=this.virtio.queues[c];d.has_request();){var e=d.pop_request(),g=new Uint8Array(e.length_readable);e.get_next_blob(g);var f=ca.Unmarshall(["w",
"h","h"],g,{offset:0});g=f[0];f=f[1];this.Ack(c,e);switch(f){case 0:for(e=0;e<this.ports;++e)this.SendEvent(e,1,0);break;case 3:this.Ack(c,e);this.SendEvent(g,4,1);this.SendName(g,"virtio-"+g);this.SendEvent(g,6,1);break;case 6:this.Ack(c,e);0===g&&this.SendWindowSize(g);break;default:return}}}]},isr_status:{initial_port:46848},device_specific:{initial_port:46592,struct:[{bytes:2,name:"cols",read:()=>this.cols,write:()=>{}},{bytes:2,name:"rows",read:()=>this.rows,write:()=>{}},{bytes:4,name:"max_nr_ports",
read:()=>this.ports,write:()=>{}},{bytes:4,name:"emerg_wr",read:()=>0,write:()=>{}}]}});for(let c=0;c<this.ports;++c){const d=0===c?0:2*c+2;this.bus.register("virtio-console"+c+"-input-bytes",function(e){var g=this.virtio.queues[d];g.has_request()&&(g=g.pop_request(),this.Send(d,g,new Uint8Array(e)))},this);this.bus.register("virtio-console"+c+"-resize",function(e){0===c&&(this.cols=e[0],this.rows=e[1]);this.virtio.queues[2].is_configured()&&this.virtio.queues[2].has_request()&&this.SendWindowSize(c,
e[0],e[1])},this)}}jb.prototype.SendWindowSize=function(a,b,c){c=c||this.rows;b=b||this.cols;const d=this.virtio.queues[2].pop_request(),e=new Uint8Array(12);ca.Marshall(["w","h","h","h","h"],[a,5,0,c,b],e,0);this.Send(2,d,e)};jb.prototype.SendName=function(a,b){const c=this.virtio.queues[2].pop_request();b=(new TextEncoder).encode(b);const d=new Uint8Array(8+b.length+1);ca.Marshall(["w","h","h"],[a,7,1],d,0);for(a=0;a<b.length;++a)d[a+8]=b[a];d[8+b.length]=0;this.Send(2,c,d)};
jb.prototype.get_state=function(){const a=[];a[0]=this.virtio;a[1]=this.rows;a[2]=this.cols;a[3]=this.ports;return a};jb.prototype.set_state=function(a){this.virtio.set_state(a[0]);this.rows=a[1];this.cols=a[2];this.ports=a[3]};jb.prototype.reset=function(){this.virtio.reset()};jb.prototype.SendEvent=function(a,b,c){const d=this.virtio.queues[2].pop_request(),e=new Uint8Array(8);ca.Marshall(["w","h","h"],[a,b,c],e,0);this.Send(2,d,e)};
jb.prototype.Send=function(a,b,c){b.set_next_blob(c);this.virtio.queues[a].push_reply(b);this.virtio.queues[a].flush_replies()};jb.prototype.Ack=function(a,b){b.set_next_blob(new Uint8Array(0));this.virtio.queues[a].push_reply(b);this.virtio.queues[a].flush_replies()};function kb(a,b,c){this.bus=b;this.id=a.devices.net?1:0;this.status=this.pairs=1;this.preserve_mac_from_state_image=c;this.mac=new Uint8Array([0,34,21,255*Math.random()|0,255*Math.random()|0,255*Math.random()|0]);this.bus.send("net"+this.id+"-mac",La(this.mac));b=[];for(c=0;c<this.pairs;++c)b.push({size_supported:1024,notify_offset:0}),b.push({size_supported:1024,notify_offset:1});b.push({size_supported:16,notify_offset:2});this.virtio=new h(a,{name:"virtio-net",pci_id:80,device_id:4161,subsystem_device_id:1,
common:{initial_port:51200,queues:b,features:[5,16,22,3,17,23,32],on_driver_ok:()=>{}},notification:{initial_port:51456,single_handler:!1,handlers:[()=>{},d=>{const e=this.virtio.queues[d];for(;e.has_request();){const g=e.pop_request(),f=new Uint8Array(g.length_readable);g.get_next_blob(f);this.bus.send("net"+this.id+"-send",f.subarray(12));this.bus.send("eth-transmit-end",[f.length-12]);this.virtio.queues[d].push_reply(g)}this.virtio.queues[d].flush_replies()},d=>{if(d===2*this.pairs)for(var e=this.virtio.queues[d];e.has_request();){const g=
e.pop_request(),f=new Uint8Array(g.length_readable);g.get_next_blob(f);const k=ca.Unmarshall(["b","b"],f,{offset:0});switch(k[0]<<8|k[1]){case 1024:ca.Unmarshall(["h"],f,{offset:2});this.Send(d,g,new Uint8Array([0]));break;case 257:this.mac=f.subarray(2,8);this.Send(d,g,new Uint8Array([0]));this.bus.send("net"+this.id+"-mac",La(this.mac));break;default:this.Send(d,g,new Uint8Array([1]));return}}}]},isr_status:{initial_port:50944},device_specific:{initial_port:50688,struct:[0,1,2,3,4,5].map((d,e)=>
({bytes:1,name:"mac_"+e,read:()=>this.mac[e],write:()=>{}})).concat([{bytes:2,name:"status",read:()=>this.status,write:()=>{}},{bytes:2,name:"max_pairs",read:()=>this.pairs,write:()=>{}},{bytes:2,name:"mtu",read:()=>1500,write:()=>{}}])}});this.bus.register("net"+this.id+"-receive",d=>{this.bus.send("eth-receive-end",[d.length]);const e=new Uint8Array(12+d.byteLength);(new DataView(e.buffer,e.byteOffset,e.byteLength)).setInt16(10,1);e.set(d,12);d=this.virtio.queues[0];d.has_request()?(d=d.pop_request(),
d.set_next_blob(e),this.virtio.queues[0].push_reply(d),this.virtio.queues[0].flush_replies()):console.log("No buffer to write into!")},this)}kb.prototype.get_state=function(){const a=[];a[0]=this.virtio;a[1]=this.id;a[2]=this.mac;return a};kb.prototype.set_state=function(a){this.virtio.set_state(a[0]);this.id=a[1];this.preserve_mac_from_state_image&&(this.mac=a[2],this.bus.send("net"+this.id+"-mac",La(this.mac)))};kb.prototype.reset=function(){this.virtio.reset()};
kb.prototype.Send=function(a,b,c){b.set_next_blob(c);this.virtio.queues[a].push_reply(b);this.virtio.queues[a].flush_replies()};kb.prototype.Ack=function(a,b){this.virtio.queues[a].push_reply(b);this.virtio.queues[a].flush_replies()};const lb="SWAP_IN SWAP_OUT MAJFLT MINFLT MEMFREE MEMTOT AVAIL CACHES HTLB_PGALLOC HTLB_PGFAIL".split(" ");
function mb(a,b){this.bus=b;this.zeroed=this.fp_cmd=this.actual=this.num_pages=0;this.virtio=new h(a,{name:"virtio-balloon",pci_id:88,device_id:4165,subsystem_device_id:5,common:{initial_port:55296,queues:[{size_supported:32,notify_offset:0},{size_supported:32,notify_offset:0},{size_supported:2,notify_offset:1},{size_supported:64,notify_offset:2}],features:[1,3,32],on_driver_ok:()=>{}},notification:{initial_port:55552,single_handler:!1,handlers:[c=>{const d=this.virtio.queues[c];for(;d.has_request();){var e=
d.pop_request();const g=new Uint8Array(e.length_readable);e.get_next_blob(g);this.virtio.queues[c].push_reply(e);e=g.byteLength/4;this.actual+=0===c?e:-e}this.virtio.queues[c].flush_replies()},c=>{var d=this.virtio.queues[c];if(d.has_request()){d=d.pop_request();const e=new Uint8Array(d.length_readable);d.get_next_blob(e);let g={};for(let f=0;f<d.length_readable;f+=10){let [k,l]=ca.Unmarshall(["h","d"],e,{offset:f});g[lb[k]]=l}this.virtio.queues[c].push_reply(d);this.stats_cb&&this.stats_cb(g)}},
c=>{const d=this.virtio.queues[c];for(;d.has_request();){const g=d.pop_request();if(0<g.length_readable){var e=new Uint8Array(g.length_readable);g.get_next_blob(e);[e]=ca.Unmarshall(["w"],e,{offset:0});0===e&&(this.free_cb&&this.free_cb(this.zeroed),1<this.fp_cmd&&(this.fp_cmd=1),this.virtio.notify_config_changes())}if(0<g.length_writable)for(new Uint8Array(0),e=0;e<g.write_buffers.length;++e){let f=g.write_buffers[e];this.zeroed+=f.len;this.virtio.cpu.zero_memory(f.addr_low,f.len)}this.virtio.queues[c].push_reply(g)}this.virtio.queues[c].flush_replies()}]},
isr_status:{initial_port:55040},device_specific:{initial_port:54784,struct:[{bytes:4,name:"num_pages",read:()=>this.num_pages,write:()=>{}},{bytes:4,name:"actual",read:()=>this.actual,write:()=>{}},{bytes:4,name:"free_page_hint_cmd_id",read:()=>this.fp_cmd,write:()=>{}}]}})}mb.prototype.Inflate=function(a){this.num_pages+=a;this.virtio.notify_config_changes()};mb.prototype.Deflate=function(a){this.num_pages-=a;this.virtio.notify_config_changes()};
mb.prototype.Cleanup=function(a){this.fp_cmd=2;this.free_cb=a;this.zeroed=0;this.virtio.notify_config_changes()};mb.prototype.get_state=function(){const a=[];a[0]=this.virtio;a[1]=this.num_pages;a[2]=this.actual;return a};mb.prototype.set_state=function(a){this.virtio.set_state(a[0]);this.num_pages=a[1];this.actual=a[2]};mb.prototype.GetStats=function(a){this.stats_cb=a;for(a=this.virtio.queues[2];a.has_request();){const b=a.pop_request();this.virtio.queues[2].push_reply(b)}this.virtio.queues[2].flush_replies()};
mb.prototype.Reset=function(){};var nb={};function xb(){this.listeners={};this.pair=void 0}xb.prototype.register=function(a,b,c){var d=this.listeners[a];void 0===d&&(d=this.listeners[a]=[]);d.push({fn:b,this_value:c})};xb.prototype.unregister=function(a,b){var c=this.listeners[a];void 0!==c&&(this.listeners[a]=c.filter(function(d){return d.fn!==b}))};xb.prototype.send=function(a,b){if(this.pair&&(a=this.pair.listeners[a],void 0!==a))for(var c=0;c<a.length;c++){var d=a[c];d.fn.call(d.this_value,b)}};
xb.prototype.send_async=function(a,b){setTimeout(this.send.bind(this,a,b),0)};nb.create=function(){var a=new xb,b=new xb;a.pair=b;b.pair=a;return[a,b]};function pa(){}function qa(){};function D(a,b,c){this.stop_idling=c;this.wm=b;this.wasm_patch();this.create_jit_imports();this.wasm_memory=b=this.wm.exports.memory;this.memory_size=t.view(Uint32Array,b,812,1);this.mem8=new Uint8Array(0);this.mem32s=new Int32Array(this.mem8.buffer);this.segment_is_null=t.view(Uint8Array,b,724,8);this.segment_offsets=t.view(Int32Array,b,736,8);this.segment_limits=t.view(Uint32Array,b,768,8);this.segment_access_bytes=t.view(Uint8Array,b,512,8);this.protected_mode=t.view(Int32Array,b,800,1);this.idtr_size=
t.view(Int32Array,b,564,1);this.idtr_offset=t.view(Int32Array,b,568,1);this.gdtr_size=t.view(Int32Array,b,572,1);this.gdtr_offset=t.view(Int32Array,b,576,1);this.tss_size_32=t.view(Int32Array,b,1128,1);this.page_fault=t.view(Uint32Array,b,540,8);this.cr=t.view(Int32Array,b,580,8);this.cpl=t.view(Uint8Array,b,612,1);this.is_32=t.view(Int32Array,b,804,1);this.stack_size_32=t.view(Int32Array,b,808,1);this.in_hlt=t.view(Uint8Array,b,616,1);this.last_virt_eip=t.view(Int32Array,b,620,1);this.eip_phys=t.view(Int32Array,
b,624,1);this.sysenter_cs=t.view(Int32Array,b,636,1);this.sysenter_esp=t.view(Int32Array,b,640,1);this.sysenter_eip=t.view(Int32Array,b,644,1);this.prefixes=t.view(Int32Array,b,648,1);this.flags=t.view(Int32Array,b,120,1);this.flags_changed=t.view(Int32Array,b,100,1);this.last_op_size=t.view(Int32Array,b,96,1);this.last_op1=t.view(Int32Array,b,104,1);this.last_result=t.view(Int32Array,b,112,1);this.current_tsc=t.view(Uint32Array,b,960,2);this.devices={};this.instruction_pointer=t.view(Int32Array,
b,556,1);this.previous_ip=t.view(Int32Array,b,560,1);this.apic_enabled=t.view(Uint8Array,b,548,1);this.acpi_enabled=t.view(Uint8Array,b,552,1);this.memory_map_read8=[];this.memory_map_write8=[];this.memory_map_read32=[];this.memory_map_write32=[];this.bios={main:null,vga:null};this.instruction_counter=t.view(Uint32Array,b,664,1);this.reg32=t.view(Int32Array,b,64,8);this.fpu_st=t.view(Int32Array,b,1152,32);this.fpu_stack_empty=t.view(Uint8Array,b,816,1);this.fpu_stack_empty[0]=255;this.fpu_stack_ptr=
t.view(Uint8Array,b,1032,1);this.fpu_stack_ptr[0]=0;this.fpu_control_word=t.view(Uint16Array,b,1036,1);this.fpu_control_word[0]=895;this.fpu_status_word=t.view(Uint16Array,b,1040,1);this.fpu_status_word[0]=0;this.fpu_ip=t.view(Int32Array,b,1048,1);this.fpu_ip[0]=0;this.fpu_ip_selector=t.view(Int32Array,b,1052,1);this.fpu_ip_selector[0]=0;this.fpu_opcode=t.view(Int32Array,b,1044,1);this.fpu_opcode[0]=0;this.fpu_dp=t.view(Int32Array,b,1056,1);this.fpu_dp[0]=0;this.fpu_dp_selector=t.view(Int32Array,
b,1060,1);this.fpu_dp_selector[0]=0;this.reg_xmm32s=t.view(Int32Array,b,832,32);this.mxcsr=t.view(Int32Array,b,824,1);this.sreg=t.view(Uint16Array,b,668,8);this.dreg=t.view(Int32Array,b,684,8);this.reg_pdpte=t.view(Int32Array,b,968,8);this.svga_dirty_bitmap_min_offset=t.view(Uint32Array,b,716,1);this.svga_dirty_bitmap_max_offset=t.view(Uint32Array,b,720,1);this.fw_value=[];this.fw_pointer=0;this.option_roms=[];this.io=void 0;this.bus=a;this.set_tsc(0,0);this.debug_init()}
D.prototype.clear_opstats=function(){(new Uint8Array(this.wasm_memory.buffer,32768,131072)).fill(0);this.wm.exports.profiler_init()};D.prototype.create_jit_imports=function(){const a=Object.create(null);a.m=this.wm.exports.memory;for(const b of Object.keys(this.wm.exports))b.startsWith("_")||b.startsWith("zstd")||b.endsWith("_js")||(a[b]=this.wm.exports[b]);this.jit_imports=a};
D.prototype.wasm_patch=function(){const a=c=>this.wm.exports[c],b=c=>{const d=a(c);console.assert(d,"Missing import: "+c);return d};this.reset_cpu=b("reset_cpu");this.getiopl=b("getiopl");this.get_eflags=b("get_eflags");this.handle_irqs=b("handle_irqs");this.main_loop=b("main_loop");this.set_jit_config=b("set_jit_config");this.read8=b("read8");this.read16=b("read16");this.read32s=b("read32s");this.write8=b("write8");this.write16=b("write16");this.write32=b("write32");this.in_mapped_range=b("in_mapped_range");
this.fpu_load_tag_word=b("fpu_load_tag_word");this.fpu_load_status_word=b("fpu_load_status_word");this.fpu_get_sti_f64=b("fpu_get_sti_f64");this.translate_address_system_read=b("translate_address_system_read_js");this.get_seg_cs=b("get_seg_cs");this.get_real_eip=b("get_real_eip");this.clear_tlb=b("clear_tlb");this.full_clear_tlb=b("full_clear_tlb");this.update_state_flags=b("update_state_flags");this.set_tsc=b("set_tsc");this.store_current_tsc=b("store_current_tsc");this.set_cpuid_level=b("set_cpuid_level");
this.pic_set_irq=b("pic_set_irq");this.pic_clear_irq=b("pic_clear_irq");this.jit_clear_cache=b("jit_clear_cache_js");this.jit_dirty_cache=b("jit_dirty_cache");this.codegen_finalize_finished=b("codegen_finalize_finished");this.allocate_memory=b("allocate_memory");this.zero_memory=b("zero_memory");this.is_memory_zeroed=b("is_memory_zeroed");this.svga_allocate_memory=b("svga_allocate_memory");this.svga_allocate_dest_buffer=b("svga_allocate_dest_buffer");this.svga_fill_pixel_buffer=b("svga_fill_pixel_buffer");
this.svga_mark_dirty=b("svga_mark_dirty");this.get_pic_addr_master=b("get_pic_addr_master");this.get_pic_addr_slave=b("get_pic_addr_slave");this.zstd_create_ctx=b("zstd_create_ctx");this.zstd_get_src_ptr=b("zstd_get_src_ptr");this.zstd_free_ctx=b("zstd_free_ctx");this.zstd_read=b("zstd_read");this.zstd_read_free=b("zstd_read_free");this.port20_read=b("port20_read");this.port21_read=b("port21_read");this.portA0_read=b("portA0_read");this.portA1_read=b("portA1_read");this.port20_write=b("port20_write");
this.port21_write=b("port21_write");this.portA0_write=b("portA0_write");this.portA1_write=b("portA1_write");this.port4D0_read=b("port4D0_read");this.port4D1_read=b("port4D1_read");this.port4D0_write=b("port4D0_write");this.port4D1_write=b("port4D1_write")};D.prototype.jit_force_generate=function(a){this.jit_force_generate_unsafe&&this.jit_force_generate_unsafe(a)};D.prototype.jit_clear_func=function(a){this.wm.wasm_table.set(a+1024,null)};
D.prototype.jit_clear_all_funcs=function(){const a=this.wm.wasm_table;for(let b=0;900>b;b++)a.set(1024+b,null)};
D.prototype.get_state=function(){var a=[];a[0]=this.memory_size[0];a[1]=new Uint8Array([...this.segment_is_null,...this.segment_access_bytes]);a[2]=this.segment_offsets;a[3]=this.segment_limits;a[4]=this.protected_mode[0];a[5]=this.idtr_offset[0];a[6]=this.idtr_size[0];a[7]=this.gdtr_offset[0];a[8]=this.gdtr_size[0];a[9]=this.page_fault[0];a[10]=this.cr;a[11]=this.cpl[0];a[13]=this.is_32[0];a[16]=this.stack_size_32[0];a[17]=this.in_hlt[0];a[18]=this.last_virt_eip[0];a[19]=this.eip_phys[0];a[22]=this.sysenter_cs[0];
a[23]=this.sysenter_eip[0];a[24]=this.sysenter_esp[0];a[25]=this.prefixes[0];a[26]=this.flags[0];a[27]=this.flags_changed[0];a[28]=this.last_op1[0];a[30]=this.last_op_size[0];a[37]=this.instruction_pointer[0];a[38]=this.previous_ip[0];a[39]=this.reg32;a[40]=this.sreg;a[41]=this.dreg;a[42]=this.reg_pdpte;this.store_current_tsc();a[43]=this.current_tsc;a[45]=this.devices.virtio_9p;a[46]=this.devices.apic;a[47]=this.devices.rtc;a[48]=this.devices.pci;a[49]=this.devices.dma;a[50]=this.devices.acpi;a[52]=
this.devices.vga;a[53]=this.devices.ps2;a[54]=this.devices.uart0;a[55]=this.devices.fdc;a[56]=this.devices.cdrom;a[57]=this.devices.hda;a[58]=this.devices.pit;a[59]=this.devices.net;a[60]=this.get_state_pic();a[61]=this.devices.sb16;a[62]=this.fw_value;a[63]=this.devices.ioapic;a[64]=this.tss_size_32[0];a[66]=this.reg_xmm32s;a[67]=this.fpu_st;a[68]=this.fpu_stack_empty[0];a[69]=this.fpu_stack_ptr[0];a[70]=this.fpu_control_word[0];a[71]=this.fpu_ip[0];a[72]=this.fpu_ip_selector[0];a[73]=this.fpu_dp[0];
a[74]=this.fpu_dp_selector[0];a[75]=this.fpu_opcode[0];const {packed_memory:b,bitmap:c}=this.pack_memory();a[77]=b;a[78]=new Uint8Array(c.get_buffer());a[79]=this.devices.uart1;a[80]=this.devices.uart2;a[81]=this.devices.uart3;a[82]=this.devices.virtio_console;a[83]=this.devices.virtio_net;a[84]=this.devices.virtio_balloon;return a};
D.prototype.get_state_pic=function(){const a=new Uint8Array(this.wasm_memory.buffer,this.get_pic_addr_master(),13),b=new Uint8Array(this.wasm_memory.buffer,this.get_pic_addr_slave(),13),c=[],d=[];c[0]=a[0];c[1]=a[1];c[2]=a[2];c[3]=a[3];c[4]=a[4];c[5]=d;c[6]=a[6];c[7]=a[7];c[8]=a[8];c[9]=a[9];c[10]=a[10];c[11]=a[11];c[12]=a[12];d[0]=b[0];d[1]=b[1];d[2]=b[2];d[3]=b[3];d[4]=b[4];d[5]=null;d[6]=b[6];d[7]=b[7];d[8]=b[8];d[9]=b[9];d[10]=b[10];d[11]=b[11];d[12]=b[12];return c};
D.prototype.set_state=function(a){this.memory_size[0]=a[0];this.mem8.length!==this.memory_size[0]&&console.warn("Note: Memory size mismatch. we="+this.mem8.length+" state="+this.memory_size[0]);8===a[1].length?(this.segment_is_null.set(a[1]),this.segment_access_bytes.fill(242),this.segment_access_bytes[1]=250):16===a[1].length&&(this.segment_is_null.set(a[1].subarray(0,8)),this.segment_access_bytes.set(a[1].subarray(8,16)));this.segment_offsets.set(a[2]);this.segment_limits.set(a[3]);this.protected_mode[0]=
a[4];this.idtr_offset[0]=a[5];this.idtr_size[0]=a[6];this.gdtr_offset[0]=a[7];this.gdtr_size[0]=a[8];this.page_fault[0]=a[9];this.cr.set(a[10]);this.cpl[0]=a[11];this.is_32[0]=a[13];this.stack_size_32[0]=a[16];this.in_hlt[0]=a[17];this.last_virt_eip[0]=a[18];this.eip_phys[0]=a[19];this.sysenter_cs[0]=a[22];this.sysenter_eip[0]=a[23];this.sysenter_esp[0]=a[24];this.prefixes[0]=a[25];this.flags[0]=a[26];this.flags_changed[0]=a[27];this.last_op1[0]=a[28];this.last_op_size[0]=a[30];this.instruction_pointer[0]=
a[37];this.previous_ip[0]=a[38];this.reg32.set(a[39]);this.sreg.set(a[40]);this.dreg.set(a[41]);a[42]&&this.reg_pdpte.set(a[42]);this.set_tsc(a[43][0],a[43][1]);this.devices.virtio_9p&&this.devices.virtio_9p.set_state(a[45]);this.devices.apic&&this.devices.apic.set_state(a[46]);this.devices.rtc&&this.devices.rtc.set_state(a[47]);this.devices.pci&&this.devices.pci.set_state(a[48]);this.devices.dma&&this.devices.dma.set_state(a[49]);this.devices.acpi&&this.devices.acpi.set_state(a[50]);this.devices.vga&&
this.devices.vga.set_state(a[52]);this.devices.ps2&&this.devices.ps2.set_state(a[53]);this.devices.uart0&&this.devices.uart0.set_state(a[54]);this.devices.fdc&&this.devices.fdc.set_state(a[55]);this.devices.cdrom&&this.devices.cdrom.set_state(a[56]);this.devices.hda&&this.devices.hda.set_state(a[57]);this.devices.pit&&this.devices.pit.set_state(a[58]);this.devices.net&&this.devices.net.set_state(a[59]);this.set_state_pic(a[60]);this.devices.sb16&&this.devices.sb16.set_state(a[61]);this.devices.uart1&&
this.devices.uart1.set_state(a[79]);this.devices.uart2&&this.devices.uart2.set_state(a[80]);this.devices.uart3&&this.devices.uart3.set_state(a[81]);this.devices.virtio_console&&this.devices.virtio_console.set_state(a[82]);this.devices.virtio_net&&this.devices.virtio_net.set_state(a[83]);this.devices.virtio_balloon&&this.devices.virtio_balloon.set_state(a[84]);this.fw_value=a[62];this.devices.ioapic&&this.devices.ioapic.set_state(a[63]);this.tss_size_32[0]=a[64];this.reg_xmm32s.set(a[66]);this.fpu_st.set(a[67]);
this.fpu_stack_empty[0]=a[68];this.fpu_stack_ptr[0]=a[69];this.fpu_control_word[0]=a[70];this.fpu_ip[0]=a[71];this.fpu_ip_selector[0]=a[72];this.fpu_dp[0]=a[73];this.fpu_dp_selector[0]=a[74];this.fpu_opcode[0]=a[75];const b=new t.Bitmap(a[78].buffer);this.unpack_memory(b,a[77]);this.update_state_flags();this.full_clear_tlb();this.jit_clear_cache()};
D.prototype.set_state_pic=function(a){const b=new Uint8Array(this.wasm_memory.buffer,this.get_pic_addr_master(),13),c=new Uint8Array(this.wasm_memory.buffer,this.get_pic_addr_slave(),13);b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];const d=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=a[12];c[0]=d[0];c[1]=d[1];c[2]=d[2];c[3]=d[3];c[4]=d[4];c[6]=d[6];c[7]=d[7];c[8]=d[8];c[9]=d[9];c[10]=d[10];c[11]=d[11];c[12]=d[12]};
D.prototype.pack_memory=function(){var a=this.mem8.length>>12,b=[];for(var c=0;c<a;c++)this.is_memory_zeroed(c<<12,4096)||b.push(c);a=new t.Bitmap(a);c=new Uint8Array(b.length<<12);for(const [d,e]of b.entries())a.set(e,1),b=e<<12,b=this.mem8.subarray(b,b+4096),c.set(b,d<<12);return{bitmap:a,packed_memory:c}};
D.prototype.unpack_memory=function(a,b){this.zero_memory(0,this.memory_size[0]);const c=this.memory_size[0]>>12;let d=0;for(let g=0;g<c;g++)if(a.get(g)){var e=d<<12;e=b.subarray(e,e+4096);this.mem8.set(e,g<<12);d++}};D.prototype.reboot_internal=function(){this.reset_cpu();this.fw_value=[];this.devices.virtio_9p&&this.devices.virtio_9p.reset();this.devices.virtio_console&&this.devices.virtio_console.reset();this.devices.virtio_net&&this.devices.virtio_net.reset();this.load_bios()};
D.prototype.reset_memory=function(){this.mem8.fill(0)};D.prototype.create_memory=function(a,b){a<b?a=b:0>(a|0)&&(a=Math.pow(2,31)-131072);a=(a-1|131071)+1|0;console.assert(0===this.memory_size[0],"Expected uninitialised memory");this.memory_size[0]=a;b=this.allocate_memory(a);this.mem8=t.view(Uint8Array,this.wasm_memory,b,a);this.mem32s=t.view(Uint32Array,this.wasm_memory,b,a>>2)};
D.prototype.init=function(a,b){this.create_memory(a.memory_size||67108864,a.initrd?67108864:1048576);a.disable_jit&&this.set_jit_config(0,1);a.cpuid_level&&this.set_cpuid_level(a.cpuid_level);this.acpi_enabled[0]=+a.acpi;this.reset_cpu();var c=new w(this);this.io=c;this.bios.main=a.bios;this.bios.vga=a.vga_bios;this.load_bios();if(a.bzimage){const e=yb(this.mem8,a.bzimage,a.initrd,a.cmdline||"");e&&this.option_roms.push(e)}c.register_read(179,this,function(){return 0});var d=0;c.register_read(146,
this,function(){return d});c.register_write(146,this,function(e){d=e});c.register_read(1297,this,function(){return this.fw_pointer<this.fw_value.length?this.fw_value[this.fw_pointer++]:0});c.register_write(1296,this,void 0,function(e){function g(l){return new Uint8Array(Int32Array.of(l).buffer)}function f(l){return l>>8|l<<8&65280}function k(l){return l<<24|l<<8&16711680|l>>8&65280|l>>>24}pa("bios config port, index="+B(e));this.fw_pointer=0;if(0===e)this.fw_value=g(1431127377);else if(1===e)this.fw_value=
g(0);else if(3===e)this.fw_value=g(this.memory_size[0]);else if(5===e)this.fw_value=g(1);else if(15===e)this.fw_value=g(1);else if(13===e)this.fw_value=new Uint8Array(16);else if(25===e){e=new Int32Array(4+64*this.option_roms.length);const l=new Uint8Array(e.buffer);e[0]=k(this.option_roms.length);for(let m=0;m<this.option_roms.length;m++){const {name:n,data:p}=this.option_roms[m],q=4+64*m;e[q+0>>2]=k(p.length);e[q+4>>2]=f(49152+m);for(let r=0;r<n.length;r++)l[q+8+r]=n.charCodeAt(r)}this.fw_value=
l}else 32768<=e&&49152>e?this.fw_value=g(0):49152<=e&&e-49152<this.option_roms.length?this.fw_value=this.option_roms[e-49152].data:(pa("Warning: Unimplemented fw index: "+B(e)),this.fw_value=g(0))});c.register_read(32,this,this.port20_read);c.register_read(33,this,this.port21_read);c.register_read(160,this,this.portA0_read);c.register_read(161,this,this.portA1_read);c.register_write(32,this,this.port20_write);c.register_write(33,this,this.port21_write);c.register_write(160,this,this.portA0_write);
c.register_write(161,this,this.portA1_write);c.register_read(1232,this,this.port4D0_read);c.register_read(1233,this,this.port4D1_read);c.register_write(1232,this,this.port4D0_write);c.register_write(1233,this,this.port4D1_write);this.devices={};a.load_devices&&(this.devices.pci=new sa(this),this.acpi_enabled[0]&&(this.devices.ioapic=new Da(this),this.devices.apic=new Ca(this),this.devices.acpi=new Ba(this)),this.devices.rtc=new xa(this),this.fill_cmos(this.devices.rtc,a),this.devices.dma=new L(this),
this.devices.vga=new M(this,b,a.screen,a.vga_memory_size||8388608),this.devices.ps2=new wa(this,b),this.devices.uart0=new ya(this,1016,b),a.uart1&&(this.devices.uart1=new ya(this,760,b)),a.uart2&&(this.devices.uart2=new ya(this,1E3,b)),a.uart3&&(this.devices.uart3=new ya(this,744,b)),this.devices.fdc=new K(this,a.fda,a.fdb),c=0,a.hda&&(this.devices.hda=new oa(this,a.hda,a.hdb,!1,c++,b)),a.cdrom&&(this.devices.cdrom=new oa(this,a.cdrom,void 0,!0,c++,b)),this.devices.pit=new ta(this,b),"ne2k"===a.net_device.type?
this.devices.net=new Ma(this,b,a.preserve_mac_from_state_image,a.mac_address_translation):"virtio"===a.net_device.type&&(this.devices.virtio_net=new kb(this,b,a.preserve_mac_from_state_image)),a.fs9p&&(this.devices.virtio_9p=new ba(a.fs9p,this,b)),a.virtio_console&&(this.devices.virtio_console=new jb(this,b)),a.virtio_balloon&&(this.devices.virtio_balloon=new mb(this,b)),this.devices.sb16=new S(this,b));a.multiboot&&(a=this.load_multiboot_option_rom(a.multiboot,a.initrd,a.cmdline))&&(this.bios.main?
this.option_roms.push(a):this.reg32[0]=this.io.port_read32(244))};D.prototype.load_multiboot=function(a){this.load_multiboot_option_rom(a,void 0,"")&&(this.reg32[0]=this.io.port_read32(244))};
D.prototype.load_multiboot_option_rom=function(a,b,c){if(8192>a.byteLength){var d=new Int32Array(2048);(new Uint8Array(d.buffer)).set(new Uint8Array(a))}else d=new Int32Array(a,0,2048);for(var e=0;8192>e;e+=4){if(464367618===d[e>>2]){var g=d[e+4>>2];if(464367618+g+d[e+8>>2]|0)continue}else continue;pa("Multiboot magic found, flags: "+B(g>>>0,8),2);var f=this;this.io.register_read(244,this,function(){return 0},function(){return 0},function(){var n=31860,p=0;if(c){p|=4;f.write32(31760,n);c+="\x00";
var q=(new TextEncoder).encode(c);f.write_blob(q,n);n+=q.length}if(g&2){p|=64;q=0;f.write32(31788,0);f.write32(31792,n);var r=0;var A=!1;for(let u=0;4294967296>u;u+=131072)A&&void 0!==f.memory_map_read8[u>>>17]?(f.write32(n,20),f.write32(n+4,r),f.write32(n+8,0),f.write32(n+12,u-r),f.write32(n+16,0),f.write32(n+20,1),n+=24,q+=24,A=!1):A||void 0!==f.memory_map_read8[u>>>17]||(r=u,A=!0);f.write32(31788,q)}f.write32(31744,p);q=p=0;if(g&65536){A=d[e+12>>2];p=d[e+16>>2];var z=d[e+20>>2];q=d[e+24>>2];r=
d[e+28>>2];B(A,8);B(p,8);B(z,8);B(q,8);B(r,8);A=new Uint8Array(a,e-(A-p),0===z?void 0:z-p);f.write_blob(A,p);p=r|0;q=Math.max(z,q)}else if(1179403647===d[0]){r=new DataView(a);const [u,F]=zb(r,Ab);console.assert(52===F);console.assert(1179403647===u.magic,"Bad magic");console.assert(1===u.class,"Unimplemented: 64 bit elf");console.assert(1===u.data,"Unimplemented: big endian");console.assert(1===u.version0,"Bad version0");console.assert(2===u.type,"Unimplemented type");console.assert(1===u.version1,
"Bad version1");console.assert(52===u.ehsize,"Bad header size");console.assert(32===u.phentsize,"Bad program header size");console.assert(40===u.shentsize,"Bad section header size");[p]=Bb(new DataView(r.buffer,r.byteOffset+u.phoff,u.phentsize*u.phnum),Cb,u.phnum);Bb(new DataView(r.buffer,r.byteOffset+u.shoff,u.shentsize*u.shnum),Db,u.shnum);r=u;A=p;p=r.entry;for(z of A)0!==z.type&&(1===z.type?z.paddr+z.memsz<f.memory_size[0]?(z.filesz&&(A=new Uint8Array(a,z.offset,z.filesz),f.write_blob(A,z.paddr)),
q=Math.max(q,z.paddr+z.memsz),p===r.entry&&z.vaddr<=p&&z.vaddr+z.memsz>p&&(p=p-z.vaddr+z.paddr)):B(z.paddr):2===z.type||3===z.type||4===z.type||6===z.type||7===z.type||1685382480===z.type||1685382481===z.type||1685382482===z.type||1685382483===z.type||B(z.type))}b&&(f.write32(31764,1),f.write32(31768,n),z=q,0!==(z&4095)&&(z=(z&-4096)+4096),q=z+b.byteLength,f.write32(n,z),f.write32(n+4,q),f.write32(n+8,0),f.write32(n+12,0),f.write_blob(new Uint8Array(b),z));f.reg32[3]=31744;f.cr[0]=1;f.protected_mode[0]=
1;f.flags[0]=2;f.is_32[0]=1;f.stack_size_32[0]=1;for(n=0;6>n;n++)f.segment_is_null[n]=0,f.segment_offsets[n]=0,f.segment_limits[n]=4294967295,f.sreg[n]=45058;f.instruction_pointer[0]=f.get_seg_cs()+p|0;f.update_state_flags();f.debug.dump_state();f.debug.dump_regs();return 732803074});this.io.register_write_consecutive(244,this,function(n){console.log("Test exited with code "+B(n,2));throw"HALT";},function(){},function(){},function(){});for(let n=0;15>=n;n++){function p(q){B(n);B(q,2);q?this.device_raise_irq(n):
this.device_lower_irq(n)}this.io.register_write(8192+n,this,p,p,p)}const l=new Uint8Array(512);(new Uint16Array(l.buffer))[0]=43605;l[2]=1;var k=3;l[k++]=102;l[k++]=229;l[k++]=244;let m=l[k]=0;for(let n=0;n<l.length;n++)m+=l[n];l[k]=-m;return{name:"genroms/multiboot.bin",data:l}}};
D.prototype.fill_cmos=function(a,b){var c=b.boot_order||291;a.cmos_write(56,1|c>>4&240);a.cmos_write(61,c&255);a.cmos_write(21,128);a.cmos_write(22,2);c=0;1048576<=this.memory_size[0]&&(c=this.memory_size[0]-1048576>>10,c=Math.min(c,65535));a.cmos_write(23,c&255);a.cmos_write(24,c>>8&255);a.cmos_write(48,c&255);a.cmos_write(49,c>>8&255);c=0;16777216<=this.memory_size[0]&&(c=this.memory_size[0]-16777216>>16,c=Math.min(c,65535));a.cmos_write(52,c&255);a.cmos_write(53,c>>8&255);a.cmos_write(91,0);a.cmos_write(92,
0);a.cmos_write(93,0);a.cmos_write(20,47);a.cmos_write(95,0);b.fastboot&&a.cmos_write(63,1)};
D.prototype.load_bios=function(){var a=this.bios.main,b=this.bios.vga;if(a){var c=new Uint8Array(a);this.write_blob(c,1048576-a.byteLength);if(b){var d=new Uint8Array(b);this.write_blob(d,786432);this.io.mmap_register(4272947200,1048576,function(e){e=e-4272947200|0;return e<d.length?d[e]:0},function(){})}this.io.mmap_register(4293918720,1048576,function(e){return this.mem8[e&1048575]}.bind(this),function(e,g){this.mem8[e&1048575]=g}.bind(this))}};
D.prototype.codegen_finalize=function(a,b,c,d,e){const g=new Uint8Array(this.wasm_memory.buffer,d>>>0,e>>>0);WebAssembly.instantiate(g,{e:this.jit_imports}).then(f=>{this.wm.wasm_table.set(a+1024,f.instance.exports.f);this.codegen_finalize_finished(a,b,c);this.test_hook_did_finalize_wasm&&this.test_hook_did_finalize_wasm(g)})};D.prototype.log_uncompiled_code=function(){};D.prototype.dump_function_code=function(){};
D.prototype.run_hardware_timers=function(a,b){const c=this.devices.pit.timer(b,!1),d=this.devices.rtc.timer(b,!1);let e=100,g=100;a&&(e=this.devices.acpi.timer(b),g=this.devices.apic.timer(b));return Math.min(c,d,e,g)};D.prototype.device_raise_irq=function(a){this.pic_set_irq(a);this.devices.ioapic&&this.devices.ioapic.set_irq(a)};D.prototype.device_lower_irq=function(a){this.pic_clear_irq(a);this.devices.ioapic&&this.devices.ioapic.clear_irq(a)};D.prototype.debug_init=function(){var a=this,b={};this.debug=b;b.init=function(){};b.get_regs_short=function(){};b.dump_regs=function(){};b.get_state=function(){};b.dump_state=function(){};b.dump_stack=function(){};b.dump_page_structures=function(){if(a.cr[4]&32)for(var g=0;4>g;g++)a.read32s(a.cr[3]+8*g)};b.dump_gdt_ldt=function(){};b.dump_idt=function(){};b.get_memory_dump=function(){};b.memory_hex_dump=function(){};b.used_memory_dump=function(){};b.debug_interrupt=function(){};let c,d;b.dump_code=
function(g,f,k){if(!d){if(void 0===c&&(c="function"===typeof require?require("./capstone-x86.min.js"):window.cs,void 0===c))return;d=[new c.Capstone(c.ARCH_X86,c.MODE_16),new c.Capstone(c.ARCH_X86,c.MODE_32)]}try{d[g].disasm(f,k).forEach(function(l){pa(B(l.address>>>0)+": "+t.pads(l.bytes.map(m=>B(m,2).slice(-2)).join(" "),20)+" "+l.mnemonic+" "+l.op_str)})}catch(l){pa("Could not disassemble: "+Array.from(f).map(m=>B(m,2)).join(" "))}};let e;b.dump_wasm=function(g){if(void 0===e&&(e="function"===
typeof require?require("./libwabt.js"):new window.WabtModule,void 0===e))return;g=g.slice();try{var f=e.readWasm(g,{readDebugNames:!1});f.generateNames();f.applyNames();f.toText({foldExprs:!0,inlineExport:!0})}catch(m){var k=new Blob([g]),l=document.createElement("a");l.download="failed.wasm";l.href=window.URL.createObjectURL(k);l.dataset.downloadurl=["application/octet-stream",l.download,l.href].join(":");l.click();window.URL.revokeObjectURL(l.src);console.log(m.toString())}finally{f&&f.destroy()}}};const Eb=DataView.prototype,Fb={size:1,get:Eb.getUint8,set:Eb.setUint8},Gb={size:2,get:Eb.getUint16,set:Eb.setUint16},V={size:4,get:Eb.getUint32,set:Eb.setUint32},Ab=Hb([{magic:V},{class:Fb},{data:Fb},{version0:Fb},{osabi:Fb},{abiversion:Fb},{pad0:function(a){return{size:a,get:()=>-1}}(7)},{type:Gb},{machine:Gb},{version1:V},{entry:V},{phoff:V},{shoff:V},{flags:V},{ehsize:Gb},{phentsize:Gb},{phnum:Gb},{shentsize:Gb},{shnum:Gb},{shstrndx:Gb}]);console.assert(52===Ab.reduce((a,b)=>a+b.size,0));
const Cb=Hb([{type:V},{offset:V},{vaddr:V},{paddr:V},{filesz:V},{memsz:V},{flags:V},{align:V}]);console.assert(32===Cb.reduce((a,b)=>a+b.size,0));const Db=Hb([{name:V},{type:V},{flags:V},{addr:V},{offset:V},{size:V},{link:V},{info:V},{addralign:V},{entsize:V}]);console.assert(40===Db.reduce((a,b)=>a+b.size,0));function Hb(a){return a.map(function(b){var c=Object.keys(b);console.assert(1===c.length);c=c[0];b=b[c];console.assert(0<b.size);return{name:c,type:b,size:b.size,get:b.get,set:b.set}})}
function zb(a,b){const c={};let d=0;for(const e of b)b=e.get.call(a,d,!0),console.assert(void 0===c[e.name]),c[e.name]=b,d+=e.size;return[c,d]}function Bb(a,b,c){const d=[];let e=0;for(var g=0;g<c;g++){const [f,k]=zb(new DataView(a.buffer,a.byteOffset+e,void 0),b);d.push(f);e+=k}return[d,e]};function yb(a,b,c,d){var e=new Uint8Array(b);const g=new Uint16Array(b);var f=new Uint32Array(b),k=e[497]||4,l=g[255];if(43605!==l)B(l);else if(l=g[257]|g[258]<<16,1400005704!==l)B(l);else{l=g[259];var m=e[529],n=g[283],p=f[139],q=f[140],r=e[565],A=518<=l?f[142]:255,z=f[146],u=f[147],F=f[150],y=f[151],H=f[152];B(l);B(m);B(n);B(f[133]);B(p);B(q);B(r);B(A);B(z);B(u);B(y);B(F);B(H);e[528]=255;e[529]=m&-97|128;g[274]=56832;g[253]=65535;B(56832);d+="\x00";B(581632);f[138]=581632;for(e=0;e<d.length;e++)a[581632+
e]=d.charCodeAt(e);k=512*(k+1);B(k);d=new Uint8Array(b,0,k);b=new Uint8Array(b,k);e=k=0;c&&(k=67108864,e=c.byteLength,a.set(new Uint8Array(c),k));f[134]=k;f[135]=e;a.set(d,524288);a.set(b,1048576);a=new Uint8Array(512);(new Uint16Array(a.buffer))[0]=43605;a[2]=1;c=3;a[c++]=250;a[c++]=184;a[c++]=32768;a[c++]=128;a[c++]=142;a[c++]=192;a[c++]=142;a[c++]=216;a[c++]=142;a[c++]=224;a[c++]=142;a[c++]=232;a[c++]=142;a[c++]=208;a[c++]=188;a[c++]=57344;a[c++]=224;a[c++]=234;a[c++]=0;a[c++]=0;a[c++]=32800;a[c++]=
128;f=a[c]=0;for(b=0;b<a.length;b++)f+=a[b];a[c]=-f;return{name:"genroms/kernel.bin",data:a}}};const Ib="undefined"!==typeof window&&0<=window.navigator.platform.toString().toLowerCase().search("win");
function Jb(a){function b(y){return y.shiftKey&&y.ctrlKey&&(73===y.keyCode||74===y.keyCode||75===y.keyCode)||!r.emu_enabled?!1:y.target?y.target.classList.contains("phone_keyboard")||"INPUT"!==y.target.nodeName&&"TEXTAREA"!==y.target.nodeName:!0}function c(y){!y.altKey&&m[56]&&k(56,!1);return g(y,!1)}function d(y){!y.altKey&&m[56]&&k(56,!1);return g(y,!0)}function e(){for(var y=Object.keys(m),H,P=0;P<y.length;P++)H=+y[P],m[H]&&k(H,!1);m={}}function g(y,H){if(r.bus&&b(y)){y.preventDefault&&y.preventDefault();
if(Ib&&(n&&(clearTimeout(q),y.getModifierState&&y.getModifierState("AltGraph")&&p===H&&"ControlLeft"===n.code&&"AltRight"===y.code||f(n,p),n=null),"ControlLeft"===y.code))return n=y,p=H,q=setTimeout(()=>{f(n,p);n=null},10),!1;f(y,H);return!1}}function f(y,H){a:{if(void 0!==y.code){var P=F[y.code];if(void 0!==P)break a}P=A[y.keyCode]}P?k(P,H,y.repeat):console.log("Missing char in map: keyCode="+(y.keyCode||-1).toString(16)+" code="+y.code)}function k(y,H,P){if(H)m[y]&&!P&&k(y,!1);else if(!m[y])return;
(m[y]=H)||(y|=128);255<y?(l(y>>8),l(y&255)):l(y)}function l(y){r.bus.send("keyboard-code",y)}var m={},n=null,p=!1,q=0,r=this;this.emu_enabled=!0;var A=new Uint16Array([0,0,0,0,0,0,0,0,14,15,0,0,0,28,0,0,42,29,56,0,58,0,0,0,0,0,0,1,0,0,0,0,57,57417,57425,57423,57415,57419,57416,57421,80,0,0,0,0,82,83,0,11,2,3,4,5,6,7,8,9,10,0,39,0,13,0,0,0,30,48,46,32,18,33,34,35,23,36,37,38,50,49,24,25,16,19,31,20,22,47,17,45,21,44,57435,57436,57437,0,0,82,79,80,81,75,76,77,71,72,73,0,0,0,0,0,0,59,60,61,62,63,64,
65,66,67,68,87,88,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,39,13,51,12,52,53,41,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,43,27,40,0,57435,57400,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),z={8:8,10:13,32:32,39:222,44:188,45:189,46:190,47:191,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,59:186,61:187,91:219,92:220,93:221,96:192,97:65,98:66,99:67,100:68,101:69,102:70,103:71,104:72,105:73,106:74,107:75,
108:76,109:77,110:78,111:79,112:80,113:81,114:82,115:83,116:84,117:85,118:86,119:87,120:88,121:89,122:90},u={33:49,34:222,35:51,36:52,37:53,38:55,40:57,41:48,42:56,43:187,58:186,60:188,62:190,63:191,64:50,65:65,66:66,67:67,68:68,69:69,70:70,71:71,72:72,73:73,74:74,75:75,76:76,77:77,78:78,79:79,80:80,81:81,82:82,83:83,84:84,85:85,86:86,87:87,88:88,89:89,90:90,94:54,95:189,123:219,124:220,125:221,126:192},F={Escape:1,Digit1:2,Digit2:3,Digit3:4,Digit4:5,Digit5:6,Digit6:7,Digit7:8,Digit8:9,Digit9:10,
Digit0:11,Minus:12,Equal:13,Backspace:14,Tab:15,KeyQ:16,KeyW:17,KeyE:18,KeyR:19,KeyT:20,KeyY:21,KeyU:22,KeyI:23,KeyO:24,KeyP:25,BracketLeft:26,BracketRight:27,Enter:28,ControlLeft:29,KeyA:30,KeyS:31,KeyD:32,KeyF:33,KeyG:34,KeyH:35,KeyJ:36,KeyK:37,KeyL:38,Semicolon:39,Quote:40,Backquote:41,ShiftLeft:42,Backslash:43,KeyZ:44,KeyX:45,KeyC:46,KeyV:47,KeyB:48,KeyN:49,KeyM:50,Comma:51,Period:52,Slash:53,IntlRo:53,ShiftRight:54,NumpadMultiply:55,AltLeft:56,Space:57,CapsLock:58,F1:59,F2:60,F3:61,F4:62,F5:63,
F6:64,F7:65,F8:66,F9:67,F10:68,NumLock:69,ScrollLock:70,Numpad7:71,Numpad8:72,Numpad9:73,NumpadSubtract:74,Numpad4:75,Numpad5:76,Numpad6:77,NumpadAdd:78,Numpad1:79,Numpad2:80,Numpad3:81,Numpad0:82,NumpadDecimal:83,IntlBackslash:86,F11:87,F12:88,NumpadEnter:57372,ControlRight:57373,NumpadDivide:57397,AltRight:57400,Home:57415,ArrowUp:57416,PageUp:57417,ArrowLeft:57419,ArrowRight:57421,End:57423,ArrowDown:57424,PageDown:57425,Insert:57426,Delete:57427,OSLeft:57435,OSRight:57436,ContextMenu:57437};this.bus=
a;this.destroy=function(){"undefined"!==typeof window&&(window.removeEventListener("keyup",c,!1),window.removeEventListener("keydown",d,!1),window.removeEventListener("blur",e,!1))};this.init=function(){"undefined"!==typeof window&&(this.destroy(),window.addEventListener("keyup",c,!1),window.addEventListener("keydown",d,!1),window.addEventListener("blur",e,!1))};this.init();this.simulate_press=function(y){y={keyCode:y};g(y,!0);g(y,!1)};this.simulate_char=function(y){var H=y.charCodeAt(0);H in z?this.simulate_press(z[H]):
H in u?(l(42),this.simulate_press(u[H]),l(170)):console.log("ascii -> keyCode not found: ",H,y)}};function Qb(a,b){function c(u){if(!z.enabled||!z.emu_enabled)return!1;var F=b||document.body,y;if(!(y=document.pointerLockElement))a:{for(u=u.target;u.parentNode;){if(u===F){y=!0;break a}u=u.parentNode}y=!1}return y}function d(u){c(u)&&(u=u.changedTouches)&&u.length&&(u=u[u.length-1],r=u.clientX,A=u.clientY)}function e(){if(n||q||p)z.bus.send("mouse-click",[!1,!1,!1]),n=q=p=!1}function g(u){if(z.bus&&c(u)&&z.is_running){var F=0,y=0,H=u.changedTouches;H?H.length&&(H=H[H.length-1],F=H.clientX-r,y=H.clientY-
A,r=H.clientX,A=H.clientY,u.preventDefault()):"number"===typeof u.movementX?(F=u.movementX,y=u.movementY):"number"===typeof u.webkitMovementX?(F=u.webkitMovementX,y=u.webkitMovementY):"number"===typeof u.mozMovementX?(F=u.mozMovementX,y=u.mozMovementY):(F=u.clientX-r,y=u.clientY-A,r=u.clientX,A=u.clientY);z.bus.send("mouse-delta",[.15*F,-(.15*y)]);b&&z.bus.send("mouse-absolute",[u.pageX-b.offsetLeft,u.pageY-b.offsetTop,b.offsetWidth,b.offsetHeight])}}function f(u){c(u)&&l(u,!0)}function k(u){c(u)&&
l(u,!1)}function l(u,F){z.bus&&(1===u.which?n=F:2===u.which?q=F:3===u.which&&(p=F),z.bus.send("mouse-click",[n,q,p]),u.preventDefault())}function m(u){if(c(u)){var F=u.wheelDelta||-u.detail;0>F?F=-1:0<F&&(F=1);z.bus.send("mouse-wheel",[F,0]);u.preventDefault()}}var n=!1,p=!1,q=!1,r=0,A=0,z=this;this.enabled=!1;this.emu_enabled=!0;this.bus=a;this.bus.register("mouse-enable",function(u){this.enabled=u},this);this.is_running=!1;this.bus.register("emulator-stopped",function(){this.is_running=!1},this);
this.bus.register("emulator-started",function(){this.is_running=!0},this);this.destroy=function(){"undefined"!==typeof window&&(window.removeEventListener("touchstart",d,!1),window.removeEventListener("touchend",e,!1),window.removeEventListener("touchmove",g,!1),window.removeEventListener("mousemove",g,!1),window.removeEventListener("mousedown",f,!1),window.removeEventListener("mouseup",k,!1),window.removeEventListener("wheel",m,{passive:!1}))};this.init=function(){"undefined"!==typeof window&&(this.destroy(),
window.addEventListener("touchstart",d,!1),window.addEventListener("touchend",e,!1),window.addEventListener("touchmove",g,!1),window.addEventListener("mousemove",g,!1),window.addEventListener("mousedown",f,!1),window.addEventListener("mouseup",k,!1),window.addEventListener("wheel",m,{passive:!1}))};this.init()};function Rb(a){if("undefined"!==typeof window)if(window.AudioContext||window.webkitAudioContext){var b=window.AudioWorklet?Sb:Tb;this.bus=a;this.audio_context=window.AudioContext?new AudioContext:new webkitAudioContext;this.mixer=new Ub(a,this.audio_context);this.pcspeaker=new Vb(a,this.audio_context,this.mixer);this.dac=new b(a,this.audio_context,this.mixer);this.pcspeaker.start();a.register("emulator-stopped",function(){this.audio_context.suspend()},this);a.register("emulator-started",function(){this.audio_context.resume()},
this);a.register("speaker-confirm-initialized",function(){a.send("speaker-has-initialized")},this);a.send("speaker-has-initialized")}else console.warn("Web browser doesn't support Web Audio API")}Rb.prototype.destroy=function(){this.audio_context&&this.audio_context.close();this.audio_context=null;this.dac&&this.dac.node_processor&&this.dac.node_processor.port.close();this.dac=null};
function Ub(a,b){function c(d){return function(e){d.gain.setValueAtTime(e,this.audio_context.currentTime)}}this.audio_context=b;this.sources=new Map;this.gain_right=this.gain_left=this.volume_right=this.volume_left=this.volume_both=1;this.node_treble_left=this.audio_context.createBiquadFilter();this.node_treble_right=this.audio_context.createBiquadFilter();this.node_treble_left.type="highshelf";this.node_treble_right.type="highshelf";this.node_treble_left.frequency.setValueAtTime(2E3,this.audio_context.currentTime);
this.node_treble_right.frequency.setValueAtTime(2E3,this.audio_context.currentTime);this.node_bass_left=this.audio_context.createBiquadFilter();this.node_bass_right=this.audio_context.createBiquadFilter();this.node_bass_left.type="lowshelf";this.node_bass_right.type="lowshelf";this.node_bass_left.frequency.setValueAtTime(200,this.audio_context.currentTime);this.node_bass_right.frequency.setValueAtTime(200,this.audio_context.currentTime);this.node_gain_left=this.audio_context.createGain();this.node_gain_right=
this.audio_context.createGain();this.node_merger=this.audio_context.createChannelMerger(2);this.input_left=this.node_treble_left;this.input_right=this.node_treble_right;this.node_treble_left.connect(this.node_bass_left);this.node_bass_left.connect(this.node_gain_left);this.node_gain_left.connect(this.node_merger,0,0);this.node_treble_right.connect(this.node_bass_right);this.node_bass_right.connect(this.node_gain_right);this.node_gain_right.connect(this.node_merger,0,1);this.node_merger.connect(this.audio_context.destination);
a.register("mixer-connect",function(d){this.connect_source(d[0],d[1])},this);a.register("mixer-disconnect",function(d){this.disconnect_source(d[0],d[1])},this);a.register("mixer-volume",function(d){var e=d[0],g=d[1];d=Math.pow(10,d[2]/20);e=0===e?this:this.sources.get(e);void 0===e||e.set_volume(d,g)},this);a.register("mixer-gain-left",function(d){this.gain_left=Math.pow(10,d/20);this.update()},this);a.register("mixer-gain-right",function(d){this.gain_right=Math.pow(10,d/20);this.update()},this);
a.register("mixer-treble-left",c(this.node_treble_left),this);a.register("mixer-treble-right",c(this.node_treble_right),this);a.register("mixer-bass-left",c(this.node_bass_left),this);a.register("mixer-bass-right",c(this.node_bass_right),this)}Ub.prototype.add_source=function(a,b){a=new Wb(this.audio_context,a,this.input_left,this.input_right);this.sources.has(b);this.sources.set(b,a);return a};Ub.prototype.connect_source=function(a,b){a=this.sources.get(a);void 0===a||a.connect(b)};
Ub.prototype.disconnect_source=function(a,b){a=this.sources.get(a);void 0===a||a.disconnect(b)};Ub.prototype.set_volume=function(a,b){void 0===b&&(b=2);switch(b){case 0:this.volume_left=a;break;case 1:this.volume_right=a;break;case 2:this.volume_both=a;break;default:return}this.update()};
Ub.prototype.update=function(){var a=this.volume_both*this.volume_right*this.gain_right;this.node_gain_left.gain.setValueAtTime(this.volume_both*this.volume_left*this.gain_left,this.audio_context.currentTime);this.node_gain_right.gain.setValueAtTime(a,this.audio_context.currentTime)};
function Wb(a,b,c,d){this.audio_context=a;this.connected_right=this.connected_left=!0;this.volume_right=this.volume_left=this.volume_both=this.gain_hidden=1;this.node_splitter=a.createChannelSplitter(2);this.node_gain_left=a.createGain();this.node_gain_right=a.createGain();b.connect(this.node_splitter);this.node_splitter.connect(this.node_gain_left,0);this.node_gain_left.connect(c);this.node_splitter.connect(this.node_gain_right,1);this.node_gain_right.connect(d)}
Wb.prototype.update=function(){var a=this.connected_right*this.gain_hidden*this.volume_both*this.volume_right;this.node_gain_left.gain.setValueAtTime(this.connected_left*this.gain_hidden*this.volume_both*this.volume_left,this.audio_context.currentTime);this.node_gain_right.gain.setValueAtTime(a,this.audio_context.currentTime)};Wb.prototype.connect=function(a){var b=!a||2===a;if(b||0===a)this.connected_left=!0;if(b||1===a)this.connected_right=!0;this.update()};
Wb.prototype.disconnect=function(a){var b=!a||2===a;if(b||0===a)this.connected_left=!1;if(b||1===a)this.connected_right=!1;this.update()};Wb.prototype.set_volume=function(a,b){void 0===b&&(b=2);switch(b){case 0:this.volume_left=a;break;case 1:this.volume_right=a;break;case 2:this.volume_both=a;break;default:return}this.update()};Wb.prototype.set_gain_hidden=function(a){this.gain_hidden=a};
function Vb(a,b,c){this.node_oscillator=b.createOscillator();this.node_oscillator.type="square";this.node_oscillator.frequency.setValueAtTime(440,b.currentTime);this.mixer_connection=c.add_source(this.node_oscillator,1);this.mixer_connection.disconnect();a.register("pcspeaker-enable",function(){c.connect_source(1)},this);a.register("pcspeaker-disable",function(){c.disconnect_source(1)},this);a.register("pcspeaker-update",function(d){var e=d[1],g=0;3===d[0]&&(g=Math.min(1193181.6665999999/e,this.node_oscillator.frequency.maxValue),
g=Math.max(g,0));this.node_oscillator.frequency.setValueAtTime(g,b.currentTime)},this)}Vb.prototype.start=function(){this.node_oscillator.start()};
function Sb(a,b,c){this.bus=a;this.audio_context=b;this.enabled=!1;this.sampling_rate=48E3;b=function(){function f(m){if(0===m)return 1;m*=Math.PI;return Math.sin(m)/m}function k(){var m=Reflect.construct(AudioWorkletProcessor,[],k);m.kernel_size=3;m.queue_data=Array(1024);m.queue_start=0;m.queue_end=0;m.queue_length=0;m.queue_size=m.queue_data.length;m.queued_samples=0;m.source_buffer_previous=l;m.source_buffer_current=l;m.source_samples_per_destination=1;m.source_block_start=0;m.source_time=0;m.source_offset=
0;m.port.onmessage=n=>{switch(n.data.type){case "queue":m.queue_push(n.data.value);break;case "sampling-rate":m.source_samples_per_destination=n.data.value/sampleRate}};return m}var l=[new Float32Array(256),new Float32Array(256)];Reflect.setPrototypeOf(k.prototype,AudioWorkletProcessor.prototype);Reflect.setPrototypeOf(k,AudioWorkletProcessor);k.prototype.process=k.prototype.process=function(m,n){for(m=0;m<n[0][0].length;m++){for(var p=0,q=0,r=this.source_offset+this.kernel_size,A=this.source_offset-
this.kernel_size+1;A<=r;A++){var z=this.source_block_start+A;p+=this.get_sample(z,0)*this.kernel(this.source_time-A);q+=this.get_sample(z,1)*this.kernel(this.source_time-A)}if(isNaN(p)||isNaN(q))p=q=0,this.dbg_log("ERROR: NaN values! Ignoring for now.");n[0][0][m]=p;n[0][1][m]=q;this.source_time+=this.source_samples_per_destination;this.source_offset=Math.floor(this.source_time)}n=this.source_offset;n+=this.kernel_size+2;this.source_time-=this.source_offset;this.source_block_start+=this.source_offset;
this.source_offset=0;this.ensure_enough_data(n);return!0};k.prototype.kernel=function(m){return f(m)*f(m/this.kernel_size)};k.prototype.get_sample=function(m,n){return 0>m?(m+=this.source_buffer_previous[0].length,this.source_buffer_previous[n][m]):this.source_buffer_current[n][m]};k.prototype.ensure_enough_data=function(m){var n=this.source_buffer_current[0].length;n-this.source_block_start<m&&(this.prepare_next_buffer(),this.source_block_start-=n)};k.prototype.prepare_next_buffer=function(){256>
this.queued_samples&&this.queue_length&&this.dbg_log("Not enough samples - should not happen during midway of playback");this.source_buffer_previous=this.source_buffer_current;this.source_buffer_current=this.queue_shift();var m=this.source_buffer_current[0].length;if(256>m){for(var n=this.queue_start,p=0;256>m&&p<this.queue_length;)m+=this.queue_data[n][0].length,n=n+1&this.queue_size-1,p++;m=Math.max(m,256);m=[new Float32Array(m),new Float32Array(m)];m[0].set(this.source_buffer_current[0]);m[1].set(this.source_buffer_current[1]);
n=this.source_buffer_current[0].length;for(var q=0;q<p;q++){var r=this.queue_shift();m[0].set(r[0],n);m[1].set(r[1],n);n+=r[0].length}this.source_buffer_current=m}this.pump()};k.prototype.pump=function(){1024>this.queued_samples/this.source_samples_per_destination&&this.port.postMessage({type:"pump"})};k.prototype.queue_push=function(m){this.queue_length<this.queue_size&&(this.queue_data[this.queue_end]=m,this.queue_end=this.queue_end+1&this.queue_size-1,this.queue_length++,this.queued_samples+=m[0].length,
this.pump())};k.prototype.queue_shift=function(){if(!this.queue_length)return l;var m=this.queue_data[this.queue_start];this.queue_data[this.queue_start]=null;this.queue_start=this.queue_start+1&this.queue_size-1;this.queue_length--;this.queued_samples-=m[0].length;return m};k.prototype.dbg_log=function(){};registerProcessor("dac-processor",k)}.toString();var d=b.indexOf("{")+1,e=b.lastIndexOf("}");b=b.substring(d,e);b=new Blob([b],{type:"application/javascript"});var g=URL.createObjectURL(b);this.node_processor=
null;this.node_output=this.audio_context.createGain();this.audio_context.audioWorklet.addModule(g).then(()=>{URL.revokeObjectURL(g);this.node_processor=new AudioWorkletNode(this.audio_context,"dac-processor",{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2],parameterData:{},processorOptions:{}});this.node_processor.port.postMessage({type:"sampling-rate",value:this.sampling_rate});this.node_processor.port.onmessage=f=>{switch(f.data.type){case "pump":this.pump()}};this.node_processor.connect(this.node_output)});
this.mixer_connection=c.add_source(this.node_output,2);this.mixer_connection.set_gain_hidden(3);a.register("dac-send-data",function(f){this.queue(f)},this);a.register("dac-enable",function(){this.enabled=!0},this);a.register("dac-disable",function(){this.enabled=!1},this);a.register("dac-tell-sampling-rate",function(f){this.sampling_rate=f;this.node_processor&&this.node_processor.port.postMessage({type:"sampling-rate",value:f})},this)}
Sb.prototype.queue=function(a){this.node_processor&&this.node_processor.port.postMessage({type:"queue",value:a},[a[0].buffer,a[1].buffer])};Sb.prototype.pump=function(){this.enabled&&this.bus.send("dac-request-data")};
function Tb(a,b,c){this.bus=a;this.audio_context=b;this.enabled=!1;this.sampling_rate=22050;this.buffered_time=0;this.rate_ratio=1;this.node_lowpass=this.audio_context.createBiquadFilter();this.node_lowpass.type="lowpass";this.node_output=this.node_lowpass;this.mixer_connection=c.add_source(this.node_output,2);this.mixer_connection.set_gain_hidden(3);a.register("dac-send-data",function(d){this.queue(d)},this);a.register("dac-enable",function(){this.enabled=!0;this.pump()},this);a.register("dac-disable",
function(){this.enabled=!1},this);a.register("dac-tell-sampling-rate",function(d){this.sampling_rate=d;this.rate_ratio=Math.ceil(8E3/d);this.node_lowpass.frequency.setValueAtTime(d/2,this.audio_context.currentTime)},this)}
Tb.prototype.queue=function(a){var b=a[0].length,c=b/this.sampling_rate;if(1<this.rate_ratio){var d=this.audio_context.createBuffer(2,b*this.rate_ratio,this.sampling_rate*this.rate_ratio);for(var e=d.getChannelData(0),g=d.getChannelData(1),f=0,k=0;k<b;k++)for(var l=0;l<this.rate_ratio;l++,f++)e[f]=a[0][k],g[f]=a[1][k]}else d=this.audio_context.createBuffer(2,b,this.sampling_rate),d.copyToChannel?(d.copyToChannel(a[0],0),d.copyToChannel(a[1],1)):(d.getChannelData(0).set(a[0]),d.getChannelData(1).set(a[1]));
a=this.audio_context.createBufferSource();a.buffer=d;a.connect(this.node_lowpass);a.addEventListener("ended",this.pump.bind(this));d=this.audio_context.currentTime;if(this.buffered_time<d)for(this.buffered_time=d,d=.2-c,b=0;b<=d;)b+=c,this.buffered_time+=c,setTimeout(()=>this.pump(),1E3*b);a.start(this.buffered_time);this.buffered_time+=c;setTimeout(()=>this.pump(),0)};Tb.prototype.pump=function(){this.enabled&&(.2<this.buffered_time-this.audio_context.currentTime||this.bus.send("dac-request-data"))};function Xb(a,b){function c(k){f.bus&&f.enabled&&(f.send_char(k.which),k.preventDefault())}function d(k){var l=k.which;8===l?(f.send_char(127),k.preventDefault()):9===l&&(f.send_char(9),k.preventDefault())}function e(k){if(f.enabled){for(var l=k.clipboardData.getData("text/plain"),m=0;m<l.length;m++)f.send_char(l.charCodeAt(m));k.preventDefault()}}function g(k){k.target!==a&&a.blur()}var f=this;this.enabled=!0;this.bus=b;this.text="";this.text_new_line=!1;this.last_update=0;this.bus.register("serial0-output-byte",
function(k){k=String.fromCharCode(k);this.show_char(k)},this);this.destroy=function(){a.removeEventListener("keypress",c,!1);a.removeEventListener("keydown",d,!1);a.removeEventListener("paste",e,!1);window.removeEventListener("mousedown",g,!1)};this.init=function(){this.destroy();a.style.display="block";a.addEventListener("keypress",c,!1);a.addEventListener("keydown",d,!1);a.addEventListener("paste",e,!1);window.addEventListener("mousedown",g,!1)};this.init();this.show_char=function(k){"\b"===k?(this.text=
this.text.slice(0,-1),this.update()):"\r"!==k&&(this.text+=k,"\n"===k&&(this.text_new_line=!0),this.update())};this.update=function(){var k=Date.now(),l=k-this.last_update;16>l?void 0===this.update_timer&&(this.update_timer=setTimeout(()=>{this.update_timer=void 0;this.last_update=Date.now();this.render()},16-l)):(void 0!==this.update_timer&&(clearTimeout(this.update_timer),this.update_timer=void 0),this.last_update=k,this.render())};this.render=function(){a.value=this.text;this.text_new_line&&(this.text_new_line=
!1,a.scrollTop=1E9)};this.send_char=function(k){f.bus&&f.bus.send("serial0-input",k)}}
function Yb(a,b){this.element=a;if(window.Terminal){var c=this.term=new window.Terminal({logLevel:"off"});c.write("This is the serial console. Whatever you type or paste here will be sent to COM1");var d=c.onData(function(e){for(let g=0;g<e.length;g++)b.send("serial0-input",e.charCodeAt(g))});b.register("serial0-output-byte",function(e){c.write(Uint8Array.of(e))},this);this.destroy=function(){d.dispose();c.dispose()}}}Yb.prototype.show=function(){this.term&&this.term.open(this.element)};function Zb(a,b,c){this.bus=b;this.socket=void 0;this.id=c||0;this.send_queue=[];this.url=a;this.reconnect_interval=1E4;this.last_connect_attempt=Date.now()-this.reconnect_interval;this.send_queue_limit=64;this.destroyed=!1;this.bus.register("net"+this.id+"-send",function(d){this.send(d)},this)}Zb.prototype.handle_message=function(a){this.bus&&this.bus.send("net"+this.id+"-receive",new Uint8Array(a.data))};
Zb.prototype.handle_close=function(){this.destroyed||(this.connect(),setTimeout(this.connect.bind(this),this.reconnect_interval))};Zb.prototype.handle_open=function(){for(var a=0;a<this.send_queue.length;a++)this.send(this.send_queue[a]);this.send_queue=[]};Zb.prototype.handle_error=function(){};Zb.prototype.destroy=function(){this.destroyed=!0;this.socket&&this.socket.close()};
Zb.prototype.connect=function(){if("undefined"!==typeof WebSocket){if(this.socket){var a=this.socket.readyState;if(0===a||1===a)return}a=Date.now();if(!(this.last_connect_attempt+this.reconnect_interval>a)){this.last_connect_attempt=Date.now();try{this.socket=new WebSocket(this.url)}catch(b){console.error(b);return}this.socket.binaryType="arraybuffer";this.socket.onopen=this.handle_open.bind(this);this.socket.onmessage=this.handle_message.bind(this);this.socket.onclose=this.handle_close.bind(this);
this.socket.onerror=this.handle_error.bind(this)}}};Zb.prototype.send=function(a){this.socket&&1===this.socket.readyState?this.socket.send(a):(this.send_queue.push(a),this.send_queue.length>2*this.send_queue_limit&&(this.send_queue=this.send_queue.slice(-this.send_queue_limit)),this.connect())};Zb.prototype.change_proxy=function(a){this.url=a;this.socket&&(this.socket.onclose=function(){},this.socket.onerror=function(){},this.socket.close(),this.socket=void 0)};function X(a){this.cpu_is_running=!1;this.cpu_exception_hook=function(){};var b=nb.create();this.bus=b[0];this.emulator_bus=b[1];var c,d;const e=new WebAssembly.Table({element:"anyfunc",initial:1924});b={cpu_exception_hook:f=>this.cpu_exception_hook(f),run_hardware_timers:function(f,k){return c.run_hardware_timers(f,k)},cpu_event_halt:()=>{this.emulator_bus.send("cpu-event-halt")},abort:function(){},microtick:C.microtick,get_rand_int:function(){return t.get_rand_int()},apic_acknowledge_irq:function(){return c.devices.apic.acknowledge_irq()},
stop_idling:function(){return c.stop_idling()},io_port_read8:function(f){return c.io.port_read8(f)},io_port_read16:function(f){return c.io.port_read16(f)},io_port_read32:function(f){return c.io.port_read32(f)},io_port_write8:function(f,k){c.io.port_write8(f,k)},io_port_write16:function(f,k){c.io.port_write16(f,k)},io_port_write32:function(f,k){c.io.port_write32(f,k)},mmap_read8:function(f){return c.mmap_read8(f)},mmap_read16:function(f){return c.mmap_read16(f)},mmap_read32:function(f){return c.mmap_read32(f)},
mmap_write8:function(f,k){c.mmap_write8(f,k)},mmap_write16:function(f,k){c.mmap_write16(f,k)},mmap_write32:function(f,k){c.mmap_write32(f,k)},mmap_write64:function(f,k,l){c.mmap_write64(f,k,l)},mmap_write128:function(f,k,l,m,n){c.mmap_write128(f,k,l,m,n)},log_from_wasm:function(f,k){t.read_sized_string_from_mem(d,f,k)},console_log_from_wasm:function(f,k){f=t.read_sized_string_from_mem(d,f,k);console.error(f)},dbg_trace_from_wasm:function(){},codegen_finalize:(f,k,l,m,n)=>{c.codegen_finalize(f,k,l,
m,n)},jit_clear_func:f=>c.jit_clear_func(f),jit_clear_all_funcs:()=>c.jit_clear_all_funcs(),__indirect_function_table:e};let g=a.wasm_fn;g||(g=f=>new Promise(k=>{let l="v86.wasm",m="v86-fallback.wasm";if(a.wasm_path){l=a.wasm_path;const n=l.lastIndexOf("/");m=(-1===n?"":l.substr(0,n))+"/"+m}else"undefined"===typeof window&&"string"===typeof __dirname?(l=__dirname+"/"+l,m=__dirname+"/"+m):(l="build/"+l,m="build/"+m);t.load_file(l,{done:async n=>{try{const {instance:p}=await WebAssembly.instantiate(n,
f);this.wasm_source=n;k(p.exports)}catch(p){t.load_file(m,{done:async q=>{const {instance:r}=await WebAssembly.instantiate(q,f);this.wasm_source=q;k(r.exports)}})}},progress:n=>{this.emulator_bus.send("download-progress",{file_index:0,file_count:1,file_name:l,lengthComputable:n.lengthComputable,total:n.total,loaded:n.loaded})}})}));g({env:b}).then(f=>{d=f.memory;f.rust_init();f=this.v86=new C(this.emulator_bus,{exports:f,wasm_table:e});c=f.cpu;this.continue_init(f,a)});this.zstd_worker=null;this.zstd_worker_request_id=
0}G.exportSymbol("V86",X);
X.prototype.continue_init=async function(a,b){function c(q,r){switch(q){case "hda":e.hda=this.disk_images.hda=r;break;case "hdb":e.hdb=this.disk_images.hdb=r;break;case "cdrom":e.cdrom=this.disk_images.cdrom=r;break;case "fda":e.fda=this.disk_images.fda=r;break;case "fdb":e.fdb=this.disk_images.fdb=r;break;case "multiboot":e.multiboot=this.disk_images.multiboot=r.buffer;break;case "bzimage":e.bzimage=this.disk_images.bzimage=r.buffer;break;case "initrd":e.initrd=this.disk_images.initrd=r.buffer;break;
case "bios":e.bios=r.buffer;break;case "vga_bios":e.vga_bios=r.buffer;break;case "initial_state":e.initial_state=r.buffer;break;case "fs9p_json":e.fs9p_json=r}}async function d(){if(e.fs9p&&e.fs9p_json&&!e.initial_state&&(e.fs9p.load_from_json(e.fs9p_json),b.bzimage_initrd_from_filesystem)){const {bzimage_path:q,initrd_path:r}=this.get_bzimage_initrd_from_filesystem(e.fs9p),[A,z]=await Promise.all([e.fs9p.read_file(r),e.fs9p.read_file(q)]);c.call(this,"initrd",new t.SyncBuffer(A.buffer));c.call(this,
"bzimage",new t.SyncBuffer(z.buffer))}this.serial_adapter&&this.serial_adapter.show&&this.serial_adapter.show();this.v86.init(e);e.initial_state&&(a.restore_state(e.initial_state),e.initial_state=void 0);b.autostart&&this.v86.run();this.emulator_bus.send("emulator-loaded")}this.bus.register("emulator-stopped",function(){this.cpu_is_running=!1;this.screen_adapter.pause()},this);this.bus.register("emulator-started",function(){this.cpu_is_running=!0;this.screen_adapter.continue()},this);var e={};this.disk_images=
{fda:void 0,fdb:void 0,hda:void 0,hdb:void 0,cdrom:void 0};var g=b.boot_order?b.boot_order:b.fda?801:b.hda?786:291;e.acpi=b.acpi;e.disable_jit=b.disable_jit;e.load_devices=!0;e.memory_size=b.memory_size||67108864;e.vga_memory_size=b.vga_memory_size||8388608;e.boot_order=g;e.fastboot=b.fastboot||!1;e.fda=void 0;e.fdb=void 0;e.uart1=b.uart1;e.uart2=b.uart2;e.uart3=b.uart3;e.cmdline=b.cmdline;e.preserve_mac_from_state_image=b.preserve_mac_from_state_image;e.mac_address_translation=b.mac_address_translation;
e.cpuid_level=b.cpuid_level;e.virtio_console=b.virtio_console;e.virtio_net=b.virtio_net;e.screen_options=b.screen_options;if(g=b.network_relay_url||b.net_device&&b.net_device.relay_url)"fetch"===g?this.network_adapter=new $b(this.bus,b.net_device):"inbrowser"===g?this.network_adapter=new ac(this.bus,b.net_device):g.startsWith("wisp://")||g.startsWith("wisps://")?this.network_adapter=new bc(g,this.bus,b.net_device):this.network_adapter=new Zb(g,this.bus);e.net_device=b.net_device||{type:"ne2k"};g=
b.screen||{};b.screen_container&&(g.container=b.screen_container);b.disable_keyboard||(this.keyboard_adapter=new Jb(this.bus));b.disable_mouse||(this.mouse_adapter=new Qb(this.bus,g.container));this.screen_adapter=g.container?new aa(g,()=>this.v86.cpu.devices.vga&&this.v86.cpu.devices.vga.screen_fill_buffer()):new cc;e.screen=this.screen_adapter;e.screen_options=g;b.serial_container&&(this.serial_adapter=new Xb(b.serial_container,this.bus));b.serial_container_xtermjs&&(this.serial_adapter=new Yb(b.serial_container_xtermjs,
this.bus));b.disable_speaker||(this.speaker_adapter=new Rb(this.bus));var f=[];g=(q,r)=>{if(r)if(r.get&&r.set&&r.load)f.push({name:q,loadable:r});else{if("bios"===q||"vga_bios"===q||"initial_state"===q||"multiboot"===q||"bzimage"===q||"initrd"===q)r.async=!1;if("fda"===q||"fdb"===q)r.async=!1;r.url&&!r.async?f.push({name:q,url:r.url,size:r.size}):f.push({name:q,loadable:t.buffer_from_object(r,this.zstd_decompress_worker.bind(this))})}};b.state&&console.warn("Warning: Unknown option 'state'. Did you mean 'initial_state'?");
g("bios",b.bios);g("vga_bios",b.vga_bios);g("cdrom",b.cdrom);g("hda",b.hda);g("hdb",b.hdb);g("fda",b.fda);g("fdb",b.fdb);g("initial_state",b.initial_state);g("multiboot",b.multiboot);g("bzimage",b.bzimage);g("initrd",b.initrd);e.fs9p=this.fs9p=new dc;if(b.filesystem){g=b.filesystem.basefs;var k=b.filesystem.baseurl;let q=new ec;k&&(q=new fc(q,k));e.fs9p=this.fs9p=new Y(q);if(g){if("object"===typeof g){var l=g.size;g=g.url}f.push({name:"fs9p_json",url:g,size:l,as_json:!0})}}var m=this,n=f.length,p=
function(q){if(q===n)setTimeout(d.bind(this),0);else{var r=f[q];r.loadable?(r.loadable.onload=function(){c.call(this,r.name,r.loadable);p(q+1)}.bind(this),r.loadable.load()):t.load_file(r.url,{done:function(A){r.url.endsWith(".zst")&&"initial_state"!==r.name&&(A=this.zstd_decompress(r.size,new Uint8Array(A)));c.call(this,r.name,r.as_json?A:new t.SyncBuffer(A));p(q+1)}.bind(this),progress:function(A){200===A.target.status?m.emulator_bus.send("download-progress",{file_index:q,file_count:n,file_name:r.url,
lengthComputable:A.lengthComputable,total:A.total||r.size,loaded:A.loaded}):m.emulator_bus.send("download-error",{file_index:q,file_count:n,file_name:r.url,request:A.target})},as_json:r.as_json})}}.bind(this);p(0)};
X.prototype.zstd_decompress=function(a,b){const c=this.v86.cpu;this.zstd_context=c.zstd_create_ctx(b.length);(new Uint8Array(c.wasm_memory.buffer)).set(b,c.zstd_get_src_ptr(this.zstd_context));b=c.zstd_read(this.zstd_context,a);const d=c.wasm_memory.buffer.slice(b,b+a);c.zstd_read_free(b,a);c.zstd_free_ctx(this.zstd_context);this.zstd_context=null;return d};
X.prototype.zstd_decompress_worker=async function(a,b){if(!this.zstd_worker){const c=URL.createObjectURL(new Blob(["("+function(){let d;globalThis.onmessage=function(e){if(d){var {src:g,decompressed_size:f,id:k}=e.data;e=d.exports;var l=e.zstd_create_ctx(g.length);(new Uint8Array(e.memory.buffer)).set(g,e.zstd_get_src_ptr(l));var m=e.zstd_read(l,f),n=e.memory.buffer.slice(m,m+f);e.zstd_read_free(m,f);e.zstd_free_ctx(l);postMessage({result:n,id:k},[n])}else l=Object.fromEntries("cpu_exception_hook run_hardware_timers cpu_event_halt microtick get_rand_int apic_acknowledge_irq stop_idling io_port_read8 io_port_read16 io_port_read32 io_port_write8 io_port_write16 io_port_write32 mmap_read8 mmap_read16 mmap_read32 mmap_write8 mmap_write16 mmap_write32 mmap_write64 mmap_write128 codegen_finalize jit_clear_func jit_clear_all_funcs".split(" ").map(p=>
[p,()=>console.error("zstd worker unexpectedly called "+p)])),l.__indirect_function_table=new WebAssembly.Table({element:"anyfunc",initial:1024}),l.abort=()=>{throw Error("zstd worker aborted");},l.log_from_wasm=l.console_log_from_wasm=(p,q)=>{console.log(String.fromCharCode(...(new Uint8Array(d.exports.memory.buffer,p,q))))},l.dbg_trace_from_wasm=()=>console.trace(),d=new WebAssembly.Instance(new WebAssembly.Module(e.data),{env:l})}}.toString()+")()"],{type:"text/javascript"}));this.zstd_worker=
new Worker(c);URL.revokeObjectURL(c);this.zstd_worker.postMessage(this.wasm_source,[this.wasm_source])}return new Promise(c=>{const d=this.zstd_worker_request_id++,e=async g=>{g.data.id===d&&(this.zstd_worker.removeEventListener("message",e),c(g.data.result))};this.zstd_worker.addEventListener("message",e);this.zstd_worker.postMessage({src:b,decompressed_size:a,id:d},[b.buffer])})};
X.prototype.get_bzimage_initrd_from_filesystem=function(a){const b=(a.read_dir("/")||[]).map(e=>"/"+e);a=(a.read_dir("/boot/")||[]).map(e=>"/boot/"+e);let c,d;for(const e of[].concat(b,a)){const g=/old/i.test(e)||/fallback/i.test(e),f=/vmlinuz/i.test(e)||/bzimage/i.test(e),k=/initrd/i.test(e)||/initramfs/i.test(e);!f||d&&g||(d=e);!k||c&&g||(c=e)}c&&d||(console.log("Failed to find bzimage or initrd in filesystem. Files:"),console.log(b.join(" ")),console.log(a.join(" ")));return{initrd_path:c,bzimage_path:d}};
X.prototype.run=async function(){this.v86.run()};G.exportProperty(X.prototype,"run",X.prototype.run);X.prototype.stop=async function(){this.cpu_is_running&&await new Promise(a=>{const b=()=>{this.remove_listener("emulator-stopped",b);a()};this.add_listener("emulator-stopped",b);this.v86.stop()})};G.exportProperty(X.prototype,"stop",X.prototype.stop);
X.prototype.destroy=async function(){await this.stop();this.v86.destroy();this.keyboard_adapter&&this.keyboard_adapter.destroy();this.network_adapter&&this.network_adapter.destroy();this.mouse_adapter&&this.mouse_adapter.destroy();this.screen_adapter&&this.screen_adapter.destroy();this.serial_adapter&&this.serial_adapter.destroy();this.speaker_adapter&&this.speaker_adapter.destroy()};G.exportProperty(X.prototype,"destroy",X.prototype.destroy);X.prototype.restart=function(){this.v86.restart()};
G.exportProperty(X.prototype,"restart",X.prototype.restart);X.prototype.add_listener=function(a,b){this.bus.register(a,b,this)};G.exportProperty(X.prototype,"add_listener",X.prototype.add_listener);X.prototype.remove_listener=function(a,b){this.bus.unregister(a,b)};G.exportProperty(X.prototype,"remove_listener",X.prototype.remove_listener);X.prototype.restore_state=async function(a){this.v86.restore_state(a)};G.exportProperty(X.prototype,"restore_state",X.prototype.restore_state);
X.prototype.save_state=async function(){return this.v86.save_state()};G.exportProperty(X.prototype,"save_state",X.prototype.save_state);X.prototype.get_instruction_counter=function(){return this.v86?this.v86.cpu.instruction_counter[0]>>>0:0};G.exportProperty(X.prototype,"get_instruction_counter",X.prototype.get_instruction_counter);X.prototype.is_running=function(){return this.cpu_is_running};G.exportProperty(X.prototype,"is_running",X.prototype.is_running);
X.prototype.set_fda=async function(a){if(a.url&&!a.async)t.load_file(a.url,{done:b=>{this.v86.cpu.devices.fdc.set_fda(new t.SyncBuffer(b))}});else{const b=t.buffer_from_object(a,this.zstd_decompress_worker.bind(this));b.onload=()=>{this.v86.cpu.devices.fdc.set_fda(b)};await b.load()}};G.exportProperty(X.prototype,"set_fda",X.prototype.set_fda);X.prototype.eject_fda=function(){this.v86.cpu.devices.fdc.eject_fda()};G.exportProperty(X.prototype,"eject_fda",X.prototype.eject_fda);
X.prototype.keyboard_send_scancodes=function(a){for(var b=0;b<a.length;b++)this.bus.send("keyboard-code",a[b])};G.exportProperty(X.prototype,"keyboard_send_scancodes",X.prototype.keyboard_send_scancodes);X.prototype.keyboard_send_keys=function(a){for(var b=0;b<a.length;b++)this.keyboard_adapter.simulate_press(a[b])};G.exportProperty(X.prototype,"keyboard_send_keys",X.prototype.keyboard_send_keys);X.prototype.keyboard_send_text=function(a){for(var b=0;b<a.length;b++)this.keyboard_adapter.simulate_char(a[b])};
G.exportProperty(X.prototype,"keyboard_send_text",X.prototype.keyboard_send_text);X.prototype.screen_make_screenshot=function(){return this.screen_adapter?this.screen_adapter.make_screenshot():null};G.exportProperty(X.prototype,"screen_make_screenshot",X.prototype.screen_make_screenshot);X.prototype.screen_set_scale=function(a,b){this.screen_adapter&&this.screen_adapter.set_scale(a,b)};G.exportProperty(X.prototype,"screen_set_scale",X.prototype.screen_set_scale);
X.prototype.screen_go_fullscreen=function(){if(this.screen_adapter){var a=document.getElementById("screen_container");if(a){var b=a.requestFullScreen||a.webkitRequestFullscreen||a.mozRequestFullScreen||a.msRequestFullScreen;b&&(b.call(a),(a=document.getElementsByClassName("phone_keyboard")[0])&&a.focus());try{navigator.keyboard.lock()}catch(c){}this.lock_mouse()}}};G.exportProperty(X.prototype,"screen_go_fullscreen",X.prototype.screen_go_fullscreen);
X.prototype.lock_mouse=function(){var a=document.body,b=a.requestPointerLock||a.mozRequestPointerLock||a.webkitRequestPointerLock;b&&b.call(a)};G.exportProperty(X.prototype,"lock_mouse",X.prototype.lock_mouse);X.prototype.mouse_set_status=function(a){this.mouse_adapter&&(this.mouse_adapter.emu_enabled=a)};X.prototype.keyboard_set_status=function(a){this.keyboard_adapter&&(this.keyboard_adapter.emu_enabled=a)};G.exportProperty(X.prototype,"keyboard_set_status",X.prototype.keyboard_set_status);
X.prototype.serial0_send=function(a){for(var b=0;b<a.length;b++)this.bus.send("serial0-input",a.charCodeAt(b))};G.exportProperty(X.prototype,"serial0_send",X.prototype.serial0_send);X.prototype.serial_send_bytes=function(a,b){for(var c=0;c<b.length;c++)this.bus.send("serial"+a+"-input",b[c])};G.exportProperty(X.prototype,"serial_send_bytes",X.prototype.serial_send_bytes);X.prototype.serial_set_modem_status=function(a,b){this.bus.send("serial"+a+"-modem-status-input",b)};
X.prototype.serial_set_carrier_detect=function(a,b){this.bus.send("serial"+a+"-carrier-detect-input",b)};X.prototype.serial_set_ring_indicator=function(a,b){this.bus.send("serial"+a+"-ring-indicator-input",b)};X.prototype.serial_set_data_set_ready=function(a,b){this.bus.send("serial"+a+"-data-set-ready-input",b)};X.prototype.serial_set_clear_to_send=function(a,b){this.bus.send("serial"+a+"-clear-to-send-input",b)};
X.prototype.mount_fs=async function(a,b,c){var d=new ec;b&&(d=new fc(d,b));d=new Y(d,this.fs9p.qidcounter);b&&d.load_from_json(c);a=this.fs9p.Mount(a,d);if(-2===a)throw new gc;if(-17===a)throw new hc;if(0>a)throw Error("Failed to mount. Error number: "+-a);};G.exportProperty(X.prototype,"mount_fs",X.prototype.mount_fs);X.prototype.create_file=async function(a,b){var c=this.fs9p;if(c){var d=a.split("/");d=d[d.length-1];a=c.SearchPath(a).parentid;if(""!==d&&-1!==a)await c.CreateBinaryFile(d,a,b);else return Promise.reject(new gc)}};
G.exportProperty(X.prototype,"create_file",X.prototype.create_file);X.prototype.read_file=async function(a){var b=this.fs9p;if(b)return(a=await b.read_file(a))?a:Promise.reject(new gc)};G.exportProperty(X.prototype,"read_file",X.prototype.read_file);
X.prototype.automatically=function(a){const b=c=>{const d=c[0];if(d){var e=c.slice(1);d.sleep?setTimeout(()=>b(e),1E3*d.sleep):d.vga_text?this.wait_until_vga_screen_contains(d.vga_text).then(()=>b(e)):d.keyboard_send?(Array.isArray(d.keyboard_send)?this.keyboard_send_scancodes(d.keyboard_send):this.keyboard_send_text(d.keyboard_send),b(e)):d.call&&(d.call(),b(e))}};b(a)};
X.prototype.wait_until_vga_screen_contains=function(a){return new Promise(b=>{function c(f){return"string"===typeof a?f.includes(a):a.test(f)}function d(f){[f]=f;e.add(f)}for(const f of this.screen_adapter.get_text_screen())if(c(f)){b(!0);return}const e=new Set,g=()=>{for(const f of e){const k=this.screen_adapter.get_text_row(f);if(c(k)){this.remove_listener("screen-put-char",d);b();return}}e.clear();setTimeout(g,100)};g();this.add_listener("screen-put-char",d)})};
X.prototype.read_memory=function(a,b){return this.v86.cpu.read_blob(a,b)};X.prototype.write_memory=function(a,b){this.v86.cpu.write_blob(a,b)};X.prototype.set_serial_container_xtermjs=function(a){this.serial_adapter&&this.serial_adapter.destroy&&this.serial_adapter.destroy();this.serial_adapter=new Yb(a,this.bus);this.serial_adapter.show()};function hc(a){this.message=a||"File already exists"}hc.prototype=Error.prototype;function gc(a){this.message=a||"File not found"}gc.prototype=Error.prototype;
"undefined"!==typeof module&&"undefined"!==typeof module.exports?module.exports.V86=X:"undefined"!==typeof window?window.V86=X:"function"===typeof importScripts&&(self.V86=X);var ic={Connector:function(a){this.listeners={};this.pair=a;a.addEventListener("message",function(b){b=b.data;for(var c=this.listeners[b[0]],d=0;d<c.length;d++){var e=c[d];e.fn.call(e.this_value,b[1])}}.bind(this),!1)}};ic.Connector.prototype.register=function(a,b,c){var d=this.listeners[a];void 0===d&&(d=this.listeners[a]=[]);d.push({fn:b,this_value:c})};ic.Connector.prototype.send=function(a,b,c){this.pair&&this.pair.postMessage([a,b],c)};ic.init=function(a){return new ic.Connector(a)};function cc(){var a,b=0,c=0;this.put_char=function(d,e,g){a[d*b+e]=g};this.destroy=function(){};this.pause=function(){};this.continue=function(){};this.set_mode=function(){};this.set_font_bitmap=function(){};this.set_font_page=function(){};this.clear_screen=function(){};this.set_size_text=function(d,e){if(d!==b||e!==c)a=new Uint8Array(d*e),b=d,c=e};this.set_size_graphical=function(){};this.set_scale=function(){};this.update_cursor_scanline=function(){};this.update_cursor=function(){};this.update_buffer=
function(){};this.get_text_screen=function(){for(var d=[],e=0;e<c;e++)d.push(this.get_text_row(e));return d};this.get_text_row=function(d){d*=b;return String.fromCharCode.apply(String,a.subarray(d,d+b))};this.set_size_text(80,25)};function ac(a,b){b=b.id||0;this.bus=a;this.bus_send_msgid=`net${b}-send`;this.bus_recv_msgid=`net${b}-receive`;this.channel=new BroadcastChannel(`v86-inbrowser-${b}`);this.is_open=!0;this.nic_to_hub_fn=c=>{this.channel.postMessage(c)};this.bus.register(this.bus_send_msgid,this.nic_to_hub_fn,this);this.hub_to_nic_fn=c=>{this.bus.send(this.bus_recv_msgid,c.data)};this.channel.addEventListener("message",this.hub_to_nic_fn)}
ac.prototype.destroy=function(){this.is_open&&(this.bus.unregister(this.bus_send_msgid,this.nic_to_hub_fn),this.channel.removeEventListener("message",this.hub_to_nic_fn),this.channel.close(),this.is_open=!1)};const jc=(new Date("1970-01-01T00:00:00Z")).getTime(),kc=(new Date("1900-01-01T00:00:00Z")).getTime(),lc=jc-kc,mc=Math.pow(2,32),nc=[118,56,54];function oc(a){return[0,1,2,3,4,5].map(b=>a[b].toString(16)).map(b=>1===b.length?"0"+b:b).join(":")}function pc(a){return a[0]<<24|a[1]<<16|a[2]<<8|a[3]}
class qc{constructor(a,b){a=Math.min(a,16);this.maximum_capacity=b?Math.max(b,a):0;this.length=this.head=this.tail=0;this.buffer=new Uint8Array(a)}write(a){const b=a.length;var c=this.length+b;let d=this.buffer.length;if(d<c){for(;d<c;)d*=2;if(this.maximum_capacity&&d>this.maximum_capacity)throw Error("stream capacity overflow in GrowableRingbuffer.write(), package dropped");c=new Uint8Array(d);this.peek(c);this.tail=0;this.head=this.length;this.buffer=c}c=this.buffer;const e=this.head+b;if(e>d){const g=
d-this.head;c.set(a.subarray(0,g),this.head);c.set(a.subarray(g))}else c.set(a,this.head);this.head=e%d;this.length+=b}peek(a){const b=Math.min(this.length,a.length);if(b){const e=this.buffer;var c=e.length,d=this.tail+b;d>c?(d%=c,c-=this.tail,a.set(e.subarray(this.tail)),a.set(e.subarray(0,d),c)):a.set(e.subarray(this.tail,d))}return b}remove(a){a>this.length&&(a=this.length);a&&(this.tail=(this.tail+a)%this.buffer.length,this.length-=a);return a}}
function rc(){const a=new Uint8Array(1518),b=a.buffer,c=a.byteOffset;return{eth_frame:a,eth_frame_view:new DataView(b),eth_payload_view:new DataView(b,c+14,1500),ipv4_payload_view:new DataView(b,c+34,1480),udp_payload_view:new DataView(b,c+42,1472),text_encoder:new TextEncoder}}function sc(a,b,c,d){d.eth_frame.set(b,c.byteOffset+a);return b.length}
function tc(a,b,c,d){const e=c.byteOffset+(a&-2);d=d.eth_frame;for(c=c.byteOffset;c<e;c+=2)b+=d[c]<<8|d[c+1];for(a&1&&(b+=d[e]<<8);b>>16;)b=(b&65535)+(b>>16);return~b&65535}
function Z(a,b){a.eth_frame.fill(0);var c=a.eth_frame,d=c.subarray,e=a.eth_frame_view;sc(0,b.eth.dest,e,a);sc(6,b.eth.src,e,a);e.setUint16(12,b.eth.ethertype);e=14;if(b.arp){var g=a.eth_payload_view;g.setUint16(0,b.arp.htype);g.setUint16(2,b.arp.ptype);g.setUint8(4,b.arp.sha.length);g.setUint8(5,b.arp.spa.length);g.setUint16(6,b.arp.oper);sc(8,b.arp.sha,g,a);sc(14,b.arp.spa,g,a);sc(18,b.arp.tha,g,a);sc(24,b.arp.tpa,g,a);e+=28}else if(b.ipv4){g=a.eth_payload_view;var f=20;if(b.icmp){var k=a.ipv4_payload_view;
k.setUint8(0,b.icmp.type);k.setUint8(1,b.icmp.code);k.setUint16(2,0);var l=4+sc(4,b.icmp.data,k,a);k.setUint16(2,tc(l,0,k,a));f+=l}else if(b.udp){k=a.ipv4_payload_view;var m=8;if(b.dhcp){l=m;var n=a.udp_payload_view;n.setUint8(0,b.dhcp.op);n.setUint8(1,b.dhcp.htype);n.setUint8(2,b.dhcp.hlen);n.setUint8(3,b.dhcp.hops);n.setUint32(4,b.dhcp.xid);n.setUint16(8,b.dhcp.secs);n.setUint16(10,b.dhcp.flags);n.setUint32(12,b.dhcp.ciaddr);n.setUint32(16,b.dhcp.yiaddr);n.setUint32(20,b.dhcp.siaddr);n.setUint32(24,
b.dhcp.giaddr);sc(28,b.dhcp.chaddr,n,a);n.setUint32(236,1669485411);m=240;for(var p of b.dhcp.options)m+=sc(m,p,n,a);l+=m}else if(b.dns){p=m;m=a.udp_payload_view;m.setUint16(0,b.dns.id);m.setUint16(2,b.dns.flags);m.setUint16(4,b.dns.questions.length);m.setUint16(6,b.dns.answers.length);let A=12;for(var q=0;q<b.dns.questions.length;++q){var r=b.dns.questions[q];for(n of r.name){const z=a.text_encoder.encodeInto(n,a.eth_frame.subarray(m.byteOffset+(A+1))).written;m.setUint8(A,z);A+=1+z}m.setUint16(A,
r.type);A+=2;m.setUint16(A,r.class);A+=2}for(q=0;q<b.dns.answers.length;++q){n=b.dns.answers[q];for(l of n.name)r=a.text_encoder.encodeInto(l,a.eth_frame.subarray(m.byteOffset+(A+1))).written,m.setUint8(A,r),A+=1+r;m.setUint16(A,n.type);A+=2;m.setUint16(A,n.class);A+=2;m.setUint32(A,n.ttl);A+=4;m.setUint16(A,n.data.length);A+=2;A+=sc(A,n.data,m,a)}l=p+A}else b.ntp?(l=m,n=a.udp_payload_view,n.setUint8(0,b.ntp.flags),n.setUint8(1,b.ntp.stratum),n.setUint8(2,b.ntp.poll),n.setUint8(3,b.ntp.precision),
n.setUint32(4,b.ntp.root_delay),n.setUint32(8,b.ntp.root_disp),n.setUint32(12,b.ntp.ref_id),n.setUint32(16,b.ntp.ref_ts_i),n.setUint32(20,b.ntp.ref_ts_f),n.setUint32(24,b.ntp.ori_ts_i),n.setUint32(28,b.ntp.ori_ts_f),n.setUint32(32,b.ntp.rec_ts_i),n.setUint32(36,b.ntp.rec_ts_f),n.setUint32(40,b.ntp.trans_ts_i),n.setUint32(44,b.ntp.trans_ts_f),l+=48):l=m+sc(0,b.udp.data,a.udp_payload_view,a);m=l;k.setUint16(0,b.udp.sport);k.setUint16(2,b.udp.dport);k.setUint16(4,m);k.setUint16(6,0);k.setUint16(6,tc(m,
(b.ipv4.src[0]<<8|b.ipv4.src[1])+(b.ipv4.src[2]<<8|b.ipv4.src[3])+(b.ipv4.dest[0]<<8|b.ipv4.dest[1])+(b.ipv4.dest[2]<<8|b.ipv4.dest[3])+17+m,k,a));f+=m}else b.tcp&&(k=a.ipv4_payload_view,l=0,n=b.tcp,n.fin&&(l|=1),n.syn&&(l|=2),n.rst&&(l|=4),n.psh&&(l|=8),n.ack&&(l|=16),n.urg&&(l|=32),n.ece&&(l|=64),n.cwr&&(l|=128),k.setUint16(0,n.sport),k.setUint16(2,n.dport),k.setUint32(4,n.seq),k.setUint32(8,n.ackn),k.setUint8(12,80),k.setUint8(13,l),k.setUint16(14,n.winsize),k.setUint16(16,0),k.setUint16(18,n.urgent||
0),l=20,b.tcp_data&&(l+=sc(20,b.tcp_data,k,a)),k.setUint16(16,tc(l,(b.ipv4.src[0]<<8|b.ipv4.src[1])+(b.ipv4.src[2]<<8|b.ipv4.src[3])+(b.ipv4.dest[0]<<8|b.ipv4.dest[1])+(b.ipv4.dest[2]<<8|b.ipv4.dest[3])+6+l,k,a)),f+=l);g.setUint8(0,69);g.setUint8(1,b.ipv4.tos||0);g.setUint16(2,f);g.setUint16(4,b.ipv4.id||0);g.setUint8(6,64);g.setUint8(8,b.ipv4.ttl||32);g.setUint8(9,b.ipv4.proto);g.setUint16(10,0);sc(12,b.ipv4.src,g,a);sc(16,b.ipv4.dest,g,a);g.setUint16(10,tc(20,0,g,a));e+=f}return d.call(c,0,e)}
function uc(a,b){fetch(`https://${b.doh_server||"cloudflare-dns.com"}/dns-query`,{method:"POST",headers:[["content-type","application/dns-message"]],body:a.udp.data}).then(async c=>{c={eth:{ethertype:2048,src:b.router_mac,dest:a.eth.src},ipv4:{proto:17,src:b.router_ip,dest:a.ipv4.src},udp:{sport:53,dport:a.udp.sport,data:new Uint8Array(await c.arrayBuffer())}};b.receive(Z(b.eth_encoder_buf,c))});return!0}
function vc(a,b){let c={};c.eth={ethertype:2048,src:b.router_mac,dest:a.eth.src};c.ipv4={proto:17,src:b.router_ip,dest:b.vm_ip};c.udp={sport:67,dport:68};c.dhcp={htype:1,hlen:6,hops:0,xid:a.dhcp.xid,secs:0,flags:0,ciaddr:0,yiaddr:pc(b.vm_ip),siaddr:pc(b.router_ip),giaddr:pc(b.router_ip),chaddr:a.dhcp.chaddr};let d=[],e=a.dhcp.options.find(function(g){return 53===g[0]});e&&3===e[2]&&(a.dhcp.op=3);1===a.dhcp.op&&(c.dhcp.op=2,d.push(new Uint8Array([53,1,2])));3===a.dhcp.op&&(c.dhcp.op=2,d.push(new Uint8Array([53,
1,5])),d.push(new Uint8Array([51,4,8,0,0,0])));a=[b.router_ip[0],b.router_ip[1],b.router_ip[2],b.router_ip[3]];d.push(new Uint8Array([1,4,255,255,255,0]));b.masquerade&&(d.push(new Uint8Array([3,4].concat(a))),d.push(new Uint8Array([6,4].concat(a))));d.push(new Uint8Array([54,4].concat(a)));d.push(new Uint8Array([60,3].concat(nc)));d.push(new Uint8Array([255,0]));c.dhcp.options=d;b.receive(Z(b.eth_encoder_buf,c))}
function wc(a,b){let c={};var d=(new DataView(a.buffer,a.byteOffset,a.byteLength)).getUint16(12),e={ethertype:d,dest:a.subarray(0,6),dest_s:oc(a.subarray(0,6)),src:a.subarray(6,12),src_s:oc(a.subarray(6,12))};c.eth=e;a=a.subarray(14,a.length);if(2048===d){var g=new DataView(a.buffer,a.byteOffset,a.byteLength),f=a[0]>>4&15;e=a[0]&15;var k=g.getUint8(1),l=g.getUint16(2);let m=g.getUint8(8);d=g.getUint8(9);g=g.getUint16(10);f={version:f,ihl:e,tos:k,len:l,ttl:m,proto:d,ip_checksum:g,src:a.subarray(12,
16),dest:a.subarray(16,20)};c.ipv4=f;e=a.subarray(4*e,l);if(1===d)a=new DataView(e.buffer,e.byteOffset,e.byteLength),a={type:a.getUint8(0),code:a.getUint8(1),checksum:a.getUint16(2),data:e.subarray(4)},c.icmp=a;else if(6===d)d=new DataView(e.buffer,e.byteOffset,e.byteLength),a={sport:d.getUint16(0),dport:d.getUint16(2),seq:d.getUint32(4),ackn:d.getUint32(8),doff:d.getUint8(12)>>4,winsize:d.getUint16(14),checksum:d.getUint16(16),urgent:d.getUint16(18)},d=d.getUint8(13),a.fin=!!(d&1),a.syn=!!(d&2),
a.rst=!!(d&4),a.psh=!!(d&8),a.ack=!!(d&16),a.urg=!!(d&32),a.ece=!!(d&64),a.cwr=!!(d&128),c.tcp=a,c.tcp_data=e.subarray(4*a.doff);else if(17===d){a=new DataView(e.buffer,e.byteOffset,e.byteLength);a={sport:a.getUint16(0),dport:a.getUint16(2),len:a.getUint16(4),checksum:a.getUint16(6),data:e.subarray(8),data_s:(new TextDecoder).decode(e.subarray(8))};if(67===a.dport||67===a.sport){e=e.subarray(8);d=new DataView(e.buffer,e.byteOffset,e.byteLength);e.subarray(44,236);d={op:d.getUint8(0),htype:d.getUint8(1),
hlen:d.getUint8(2),hops:d.getUint8(3),xid:d.getUint32(4),secs:d.getUint16(8),flags:d.getUint16(10),ciaddr:d.getUint32(12),yiaddr:d.getUint32(16),siaddr:d.getUint32(20),giaddr:d.getUint32(24),chaddr:e.subarray(28,44),magic:d.getUint32(236),options:[]};e=e.subarray(240);for(l=0;l<e.length;++l)f=l,0!==e[l]&&(++l,k=e[l],l+=k,d.options.push(e.subarray(f,f+k+2)));c.dhcp=d;c.dhcp_options=d.options}else 53===a.dport||53===a.sport?xc(e.subarray(8),c):123===a.dport&&(d=e.subarray(8),d=new DataView(d.buffer,
d.byteOffset,d.byteLength),c.ntp={flags:d.getUint8(0),stratum:d.getUint8(1),poll:d.getUint8(2),precision:d.getUint8(3),root_delay:d.getUint32(4),root_disp:d.getUint32(8),ref_id:d.getUint32(12),ref_ts_i:d.getUint32(16),ref_ts_f:d.getUint32(20),ori_ts_i:d.getUint32(24),ori_ts_f:d.getUint32(28),rec_ts_i:d.getUint32(32),rec_ts_f:d.getUint32(36),trans_ts_i:d.getUint32(40),trans_ts_f:d.getUint32(44)});c.udp=a}}else 2054===d?(d=new DataView(a.buffer,a.byteOffset,a.byteLength),a={htype:d.getUint16(0),ptype:d.getUint16(2),
oper:d.getUint16(6),sha:a.subarray(8,14),spa:a.subarray(14,18),tha:a.subarray(18,24),tpa:a.subarray(24,28)},c.arp=a):34525!==d&&B(d);if(c.ipv4)if(c.tcp){if(a=`${c.ipv4.src.join(".")}:${c.tcp.sport}:${c.ipv4.dest.join(".")}:${c.tcp.dport}`,!c.tcp.syn||!b.on_tcp_connection(c,a))if(b.tcp_conn[a])b.tcp_conn[a].process(c);else{a=c.tcp.ackn;if(c.tcp.fin||c.tcp.syn)a+=1;d={};d.eth={ethertype:2048,src:b.router_mac,dest:c.eth.src};d.ipv4={proto:6,src:c.ipv4.dest,dest:c.ipv4.src};d.tcp={sport:c.tcp.dport,dport:c.tcp.sport,
seq:a,ackn:c.tcp.seq+(c.tcp.syn?1:0),winsize:c.tcp.winsize,rst:!0,ack:c.tcp.syn};b.receive(Z(b.eth_encoder_buf,d))}}else if(c.udp)if(c.dns)if("static"===b.dns_method){a={};a.eth={ethertype:2048,src:b.router_mac,dest:c.eth.src};a.ipv4={proto:17,src:b.router_ip,dest:c.ipv4.src};a.udp={sport:53,dport:c.udp.sport};d=[];for(e=0;e<c.dns.questions.length;++e)switch(l=c.dns.questions[e],l.type){case 1:d.push({name:l.name,type:l.type,class:l.class,ttl:600,data:[192,168,87,1]})}a.dns={id:c.dns.id,flags:33152,
questions:c.dns.questions,answers:d};b.receive(Z(b.eth_encoder_buf,a))}else uc(c,b);else c.dhcp?vc(c,b):c.ntp?(a=Date.now()+lc,d=a%1E3/1E3*mc,e={},e.eth={ethertype:2048,src:b.router_mac,dest:c.eth.src},e.ipv4={proto:17,src:c.ipv4.dest,dest:c.ipv4.src},e.udp={sport:123,dport:c.udp.sport},e.ntp=Object.assign({},c.ntp),e.ntp.flags=36,e.ntp.poll=10,e.ntp.ori_ts_i=c.ntp.trans_ts_i,e.ntp.ori_ts_f=c.ntp.trans_ts_f,e.ntp.rec_ts_i=a/1E3,e.ntp.rec_ts_f=d,e.ntp.trans_ts_i=a/1E3,e.ntp.trans_ts_f=d,e.ntp.stratum=
2,b.receive(Z(b.eth_encoder_buf,e))):8===c.udp.dport&&(a={},a.eth={ethertype:2048,src:b.router_mac,dest:c.eth.src},a.ipv4={proto:17,src:c.ipv4.dest,dest:c.ipv4.src},a.udp={sport:c.udp.dport,dport:c.udp.sport,data:(new TextEncoder).encode(c.udp.data_s)},b.receive(Z(b.eth_encoder_buf,a)));else c.icmp&&8===c.icmp.type&&(a={},a.eth={ethertype:2048,src:b.router_mac,dest:c.eth.src},a.ipv4={proto:1,src:c.ipv4.dest,dest:c.ipv4.src},a.icmp={type:0,code:c.icmp.code,data:c.icmp.data},b.receive(Z(b.eth_encoder_buf,
a)));else c.arp&&1===c.arp.oper&&2048===c.arp.ptype&&(a=pc(c.arp.tpa)&4294967040,d=pc(b.router_ip)&4294967040,!b.masquerade&&a!==d||a===d&&99<c.arp.tpa[3]||(a={},a.eth={ethertype:2054,src:b.router_mac,dest:c.eth.src},a.arp={htype:1,ptype:2048,oper:2,sha:b.router_mac,spa:c.arp.tpa,tha:c.eth.src,tpa:c.arp.spa},b.receive(Z(b.eth_encoder_buf,a))))}
function xc(a,b){function c(){let m=[],n;do n=d.getUint8(k),m.push((new TextDecoder).decode(a.subarray(k+1,k+1+n))),k+=n+1;while(0<n);return m}let d=new DataView(a.buffer,a.byteOffset,a.byteLength),e={id:d.getUint16(0),flags:d.getUint16(2),questions:[],answers:[]};var g=d.getUint16(4);let f=d.getUint16(6);d.getUint16(8);d.getUint16(10);let k=12;for(var l=0;l<g;l++)e.questions.push({name:c(),type:d.getInt16(k),class:d.getInt16(k+2)}),k+=4;for(g=0;g<f;g++){l={name:c(),type:d.getInt16(k),class:d.getUint16(k+
2),ttl:d.getUint32(k+4)};k+=8;let m=d.getUint16(k);k+=2;l.data=a.subarray(k,k+m);k+=m;e.answers.push(l)}b.dns=e}
function yc(a,b){var c=b.vm_ip.join(".");const d=b.router_ip.join("."),e=16383*Math.random()|0;let g,f,k=0;do g=49152+(e+k)%16383,f=`${c}:${a}:${d}:${g}`;while(16383>++k&&b.tcp_conn[f]);if(b.tcp_conn[f])throw Error("pool of dynamic TCP port numbers exhausted, connection aborted");c=new zc;c.tuple=f;c.hsrc=b.router_mac;c.psrc=b.router_ip;c.sport=g;c.hdest=b.vm_mac;c.dport=a;c.pdest=b.vm_ip;c.net=b;b.tcp_conn[f]=c;c.connect();return c}
function Ac(a,b){return new Promise(c=>{let d=yc(a,b);d.state="syn-probe";d.on("probe",c)})}function zc(){this.state="closed";this.net=null;this.send_buffer=new qc(2048,0);this.send_chunk_buf=new Uint8Array(1460);this.delayed_send_fin=this.in_active_close=!1;this.delayed_state=void 0;this.events_handlers={}}zc.prototype.on=function(a,b){this.events_handlers[a]=b};zc.prototype.emit=function(a,...b){this.events_handlers[a]&&this.events_handlers[a].apply(this,b)};
zc.prototype.ipv4_reply=function(){let a={};a.eth={ethertype:2048,src:this.hsrc,dest:this.hdest};a.ipv4={proto:6,src:this.psrc,dest:this.pdest};a.tcp={sport:this.sport,dport:this.dport,winsize:this.winsize,ackn:this.ack,seq:this.seq,ack:!0};return a};zc.prototype.packet_reply=function(a,b){a={sport:a.tcp.dport,dport:a.tcp.sport,winsize:a.tcp.winsize,ackn:this.ack,seq:this.seq};if(b)for(const c in b)a[c]=b[c];b=this.ipv4_reply();b.tcp=a;return b};
zc.prototype.connect=function(){this.seq=1338;this.ack=1;this.start_seq=0;this.winsize=64240;this.state="syn-sent";let a=this.ipv4_reply();a.ipv4.id=2345;a.tcp={sport:this.sport,dport:this.dport,seq:1337,ackn:0,winsize:0,syn:!0};this.net.receive(Z(this.net.eth_encoder_buf,a))};
zc.prototype.accept=function(a){this.seq=1338;this.ack=a.tcp.seq+1;this.start_seq=a.tcp.seq;this.hsrc=this.net.router_mac;this.psrc=a.ipv4.dest;this.sport=a.tcp.dport;this.hdest=a.eth.src;this.dport=a.tcp.sport;this.pdest=a.ipv4.src;this.winsize=a.tcp.winsize;let b=this.ipv4_reply();b.tcp={sport:this.sport,dport:this.dport,seq:1337,ackn:this.ack,winsize:a.tcp.winsize,syn:!0,ack:!0};this.state="established";this.net.receive(Z(this.net.eth_encoder_buf,b))};
zc.prototype.process=function(a){if("closed"===this.state)a=this.packet_reply(a,{rst:!0}),this.net.receive(Z(this.net.eth_encoder_buf,a));else if(a.tcp.rst){if("syn-probe"===this.state)this.emit("probe",!1);else this.on_close();this.release()}else if(a.tcp.syn)"syn-sent"===this.state&&a.tcp.ack?(this.ack=a.tcp.seq+1,this.start_seq=a.tcp.seq,this.last_received_ackn=a.tcp.ackn,a=this.ipv4_reply(),this.net.receive(Z(this.net.eth_encoder_buf,a)),this.state="established",this.emit("connect")):"syn-probe"===
this.state&&a.tcp.ack&&(this.emit("probe",!0),a=this.packet_reply(a,{rst:!0}),this.net.receive(Z(this.net.eth_encoder_buf,a)),this.release());else{if(a.tcp.ack)if("syn-received"===this.state)this.state="established";else if("fin-wait-1"===this.state)a.tcp.fin||(this.state="fin-wait-2");else if("closing"===this.state||"last-ack"===this.state){this.release();return}if(void 0===this.last_received_ackn)this.last_received_ackn=a.tcp.ackn;else{var b=a.tcp.ackn-this.last_received_ackn;if(0<b){if(this.last_received_ackn=
a.tcp.ackn,this.send_buffer.remove(b),this.seq+=b,this.pending=!1,this.delayed_send_fin&&!this.send_buffer.length){this.delayed_send_fin=!1;this.state=this.delayed_state;a=this.ipv4_reply();a.tcp.fin=!0;this.net.receive(Z(this.net.eth_encoder_buf,a));return}}else if(0>b){a=this.packet_reply(a,{rst:!0});this.net.receive(Z(this.net.eth_encoder_buf,a));this.on_close();this.release();return}}a.tcp.fin?(++this.ack,b=this.packet_reply(a,{}),"established"===this.state?(b.tcp.ack=!0,this.state="close-wait",
this.on_shutdown()):"fin-wait-1"===this.state?(a.tcp.ack?this.release():this.state="closing",b.tcp.ack=!0):"fin-wait-2"===this.state?(this.release(),b.tcp.ack=!0):(this.release(),this.on_close(),b.tcp.rst=!0),this.net.receive(Z(this.net.eth_encoder_buf,b))):this.ack!==a.tcp.seq?(a=this.packet_reply(a,{ack:!0}),this.net.receive(Z(this.net.eth_encoder_buf,a))):a.tcp.ack&&0<a.tcp_data.length&&(this.ack+=a.tcp_data.length,b=this.ipv4_reply(),this.net.receive(Z(this.net.eth_encoder_buf,b)),this.emit("data",
a.tcp_data));this.pump()}};zc.prototype.write=function(a){this.in_active_close||this.send_buffer.write(a);this.pump()};zc.prototype.writev=function(a){if(!this.in_active_close)for(const b of a)this.send_buffer.write(b);this.pump()};
zc.prototype.close=function(){if(!this.in_active_close){this.in_active_close=!0;if("established"===this.state||"syn-received"===this.state)var a="fin-wait-1";else if("close-wait"===this.state)a="last-ack";else{this.release();return}this.send_buffer.length||this.pending?(this.delayed_send_fin=!0,this.delayed_state=a):(this.state=a,a=this.ipv4_reply(),a.tcp.fin=!0,this.net.receive(Z(this.net.eth_encoder_buf,a)))}this.pump()};zc.prototype.on_shutdown=function(){this.emit("shutdown")};
zc.prototype.on_close=function(){this.emit("close")};zc.prototype.release=function(){this.net.tcp_conn[this.tuple]&&(this.state="closed",delete this.net.tcp_conn[this.tuple])};zc.prototype.pump=function(){if(this.send_buffer.length&&!this.pending){const a=this.send_chunk_buf,b=this.send_buffer.peek(a),c=this.ipv4_reply();c.tcp.psh=!0;c.tcp_data=a.subarray(0,b);this.net.receive(Z(this.net.eth_encoder_buf,c));this.pending=!0}};function bc(a,b,c){this.register_ws(a);this.last_stream=1;this.connections={0:{congestion:0}};this.congested_buffer=[];c=c||{};this.bus=b;this.id=c.id||0;this.router_mac=new Uint8Array((c.router_mac||"52:54:0:1:2:3").split(":").map(function(d){return parseInt(d,16)}));this.router_ip=new Uint8Array((c.router_ip||"192.168.86.1").split(".").map(function(d){return parseInt(d,10)}));this.vm_ip=new Uint8Array((c.vm_ip||"192.168.86.100").split(".").map(function(d){return parseInt(d,10)}));this.masquerade=
void 0===c.masquerade||!!c.masquerade;this.vm_mac=new Uint8Array(6);this.dns_method=c.dns_method||"doh";this.doh_server=c.doh_server;this.tcp_conn={};this.eth_encoder_buf=rc();this.bus.register("net"+this.id+"-mac",function(d){this.vm_mac=new Uint8Array(d.split(":").map(function(e){return parseInt(e,16)}))},this);this.bus.register("net"+this.id+"-send",function(d){this.send(d)},this)}
bc.prototype.register_ws=function(a){this.wispws=new WebSocket(a.replace("wisp://","ws://").replace("wisps://","wss://"));this.wispws.binaryType="arraybuffer";this.wispws.onmessage=b=>{this.process_incoming_wisp_frame(new Uint8Array(b.data))};this.wispws.onclose=()=>{setTimeout(()=>{this.register_ws(a)},1E4)}};
bc.prototype.send_packet=function(a,b,c){this.connections[c]&&(0<this.connections[c].congestion?("DATA"===b&&this.connections[c].congestion--,this.wispws.send(a)):(this.connections[c].congested=!0,this.congested_buffer.push({data:a,type:b})))};
bc.prototype.process_incoming_wisp_frame=function(a){const b=new DataView(a.buffer),c=b.getUint32(1,!0);switch(a[0]){case 2:if(this.connections[c])this.connections[c].data_callback(a.slice(5));else throw Error("Got a DATA packet but stream not registered. ID: "+c);break;case 3:this.connections[c]&&(this.connections[c].congestion=b.getUint32(5,!0));if(this.connections[c].congested){for(const d of this.congested_buffer)this.send_packet(d.data,d.type,c);this.connections[c].congested=!1}break;case 4:this.connections[c]&&
this.connections[c].close_callback(b.getUint8(5)),delete this.connections[c]}};
bc.prototype.send_wisp_frame=function(a){let b,c;switch(a.type){case "CONNECT":const d=(new TextEncoder).encode(a.hostname);b=new Uint8Array(8+d.length);c=new DataView(b.buffer);c.setUint8(0,1);c.setUint32(1,a.stream_id,!0);c.setUint8(5,1);c.setUint16(6,a.port,!0);b.set(d,8);this.connections[a.stream_id]={data_callback:a.data_callback,close_callback:a.close_callback,congestion:this.connections[0].congestion};break;case "DATA":b=new Uint8Array(5+a.data.length);c=new DataView(b.buffer);c.setUint8(0,
2);c.setUint32(1,a.stream_id,!0);b.set(a.data,5);break;case "CLOSE":b=new Uint8Array(6),c=new DataView(b.buffer),c.setUint8(0,4),c.setUint32(1,a.stream_id,!0),c.setUint8(5,a.reason)}this.send_packet(b,a.type,a.stream_id)};bc.prototype.destroy=function(){this.wispws&&(this.wispws.onmessage=null,this.wispws.onclose=null,this.wispws.close(),this.wispws=null)};
bc.prototype.on_tcp_connection=function(a,b){let c=new zc;c.state="syn-received";c.net=this;c.tuple=b;c.stream_id=this.last_stream++;this.tcp_conn[b]=c;c.on("data",d=>{0!==d.length&&this.send_wisp_frame({type:"DATA",stream_id:c.stream_id,data:d})});c.on_close=()=>{this.send_wisp_frame({type:"CLOSE",stream_id:c.stream_id,reason:2})};c.on_shutdown=c.on_close;this.send_wisp_frame({type:"CONNECT",stream_id:c.stream_id,hostname:a.ipv4.dest.join("."),port:a.tcp.dport,data_callback:d=>{c.write(d)},close_callback:()=>
{c.close()}});c.accept(a);return!0};bc.prototype.send=function(a){wc(a,this)};bc.prototype.receive=function(a){this.bus.send("net"+this.id+"-receive",new Uint8Array(a))};function $b(a,b){b=b||{};this.bus=a;this.id=b.id||0;this.router_mac=new Uint8Array((b.router_mac||"52:54:0:1:2:3").split(":").map(function(c){return parseInt(c,16)}));this.router_ip=new Uint8Array((b.router_ip||"192.168.86.1").split(".").map(function(c){return parseInt(c,10)}));this.vm_ip=new Uint8Array((b.vm_ip||"192.168.86.100").split(".").map(function(c){return parseInt(c,10)}));this.masquerade=void 0===b.masquerade||!!b.masquerade;this.vm_mac=new Uint8Array(6);this.dns_method=b.dns_method||"static";
this.doh_server=b.doh_server;this.tcp_conn={};this.eth_encoder_buf=rc();this.fetch=(...c)=>fetch(...c);this.cors_proxy=b.cors_proxy;this.bus.register("net"+this.id+"-mac",function(c){this.vm_mac=new Uint8Array(c.split(":").map(function(d){return parseInt(d,16)}))},this);this.bus.register("net"+this.id+"-send",function(c){this.send(c)},this)}G.exportSymbol("FetchNetworkAdapter",$b);$b.prototype.destroy=function(){};
$b.prototype.on_tcp_connection=function(a,b){if(80===a.tcp.dport){let c=new zc;c.state="syn-received";c.net=this;c.on("data",Bc);c.tuple=b;c.accept(a);this.tcp_conn[b]=c;return!0}return!1};$b.prototype.connect=function(a){return yc(a,this)};$b.prototype.tcp_probe=function(a){return Ac(a,this)};
async function Bc(a){this.read=this.read||"";if((this.read+=(new TextDecoder).decode(a))&&-1!==this.read.indexOf("\r\n\r\n")){var b=this.read.indexOf("\r\n\r\n");a=this.read.substring(0,b).split(/\r\n/);b=this.read.substring(b+4);this.read="";let c=a[0].split(" "),d;d=/^https?:/.test(c[1])?new URL(c[1]):new URL("http://host"+c[1]);"undefined"!==typeof window&&"http:"===d.protocol&&"https:"===window.location.protocol&&(d.protocol="https:");let e=new Headers;for(let l=1;l<a.length;++l){const m=this.net.parse_http_header(a[l]);
if(!m){console.warn('The request contains an invalid header: "%s"',a[l]);this.write((new TextEncoder).encode("HTTP/1.1 400 Bad Request\r\nContent-Length: 0"));return}"host"===m.key.toLowerCase()?d.host=m.value:e.append(m.key,m.value)}this.name=d.href;a={method:c[0],headers:e};-1!==["put","post"].indexOf(a.method.toLowerCase())&&(a.body=b);const g=this.net.cors_proxy?this.net.cors_proxy+encodeURIComponent(d.href):d.href,f=new TextEncoder;let k=!1;this.net.fetch(g,a).then(l=>{const m=[`HTTP/1.1 ${l.status} ${l.statusText}`,
`x-was-fetch-redirected: ${!!l.redirected}`,`x-fetch-resp-url: ${l.url}`,"Connection: closed"];for(const [n,p]of l.headers.entries())["content-encoding","connection","content-length","transfer-encoding"].includes(n.toLowerCase())||m.push(`${n}:  ${p}`);this.write(f.encode(m.join("\r\n")+"\r\n\r\n"));k=!0;if(l.body&&l.body.getReader){const n=l.body.getReader(),p=({value:q,done:r})=>{q&&this.write(q);if(r)this.close();else return n.read().then(p)};n.read().then(p)}else l.arrayBuffer().then(n=>{this.write(new Uint8Array(n));
this.close()})}).catch(l=>{console.warn("Fetch Failed: "+g+"\n"+l);k||(l=f.encode(`Fetch ${g} failed:\n\n${l.stack||l.message}`),this.writev([f.encode(["HTTP/1.1 502 Fetch Error","Content-Type: text/plain",`Content-Length: ${l.length}`,"Connection: closed"].join("\r\n")+"\r\n\r\n"),l]));this.close()})}}
$b.prototype.fetch=async function(a,b){this.cors_proxy&&(a=this.cors_proxy+encodeURIComponent(a));try{const c=await fetch(a,b),d=await c.arrayBuffer();return[c,d]}catch(c){return console.warn("Fetch Failed: "+a+"\n"+c),b=new Headers,b.set("Content-Type","text/plain"),[{status:502,statusText:"Fetch Error",headers:b},(new TextEncoder).encode(`Fetch ${a} failed:\n\n${c.stack}`).buffer]}};
$b.prototype.parse_http_header=function(a){var b=a.match(/^([^:]*):(.*)$/);if(b&&(a=b[1],b=b[2].trim(),0!==a.length&&0!==b.length&&/^[\w-]+$/.test(a)&&/^[\x20-\x7E]+$/.test(b)))return{key:a,value:b}};$b.prototype.send=function(a){wc(a,this)};$b.prototype.receive=function(a){this.bus.send("net"+this.id+"-receive",new Uint8Array(a))};const Cc={stats_to_string:function(a){return Cc.print_misc_stats(a)+Cc.print_instruction_counts(a)},print_misc_stats:function(a){let b="";var c="COMPILE COMPILE_SKIPPED_NO_NEW_ENTRY_POINTS COMPILE_WRONG_ADDRESS_SPACE COMPILE_CUT_OFF_AT_END_OF_PAGE COMPILE_WITH_LOOP_SAFETY COMPILE_PAGE COMPILE_PAGE/COMPILE COMPILE_BASIC_BLOCK COMPILE_DUPLICATED_BASIC_BLOCK COMPILE_WASM_BLOCK COMPILE_WASM_LOOP COMPILE_DISPATCHER COMPILE_ENTRY_POINT COMPILE_WASM_TOTAL_BYTES COMPILE_WASM_TOTAL_BYTES/COMPILE_PAGE RUN_INTERPRETED RUN_INTERPRETED_NEW_PAGE RUN_INTERPRETED_PAGE_HAS_CODE RUN_INTERPRETED_PAGE_HAS_ENTRY_AFTER_PAGE_WALK RUN_INTERPRETED_NEAR_END_OF_PAGE RUN_INTERPRETED_DIFFERENT_STATE RUN_INTERPRETED_DIFFERENT_STATE_CPL3 RUN_INTERPRETED_DIFFERENT_STATE_FLAT RUN_INTERPRETED_DIFFERENT_STATE_IS32 RUN_INTERPRETED_DIFFERENT_STATE_SS32 RUN_INTERPRETED_MISSED_COMPILED_ENTRY_RUN_INTERPRETED RUN_INTERPRETED_STEPS RUN_FROM_CACHE RUN_FROM_CACHE_STEPS RUN_FROM_CACHE_STEPS/RUN_FROM_CACHE RUN_FROM_CACHE_STEPS/RUN_INTERPRETED_STEPS DIRECT_EXIT INDIRECT_JUMP INDIRECT_JUMP_NO_ENTRY NORMAL_PAGE_CHANGE NORMAL_FALLTHRU NORMAL_FALLTHRU_WITH_TARGET_BLOCK NORMAL_BRANCH NORMAL_BRANCH_WITH_TARGET_BLOCK CONDITIONAL_JUMP CONDITIONAL_JUMP_PAGE_CHANGE CONDITIONAL_JUMP_EXIT CONDITIONAL_JUMP_FALLTHRU CONDITIONAL_JUMP_FALLTHRU_WITH_TARGET_BLOCK CONDITIONAL_JUMP_BRANCH CONDITIONAL_JUMP_BRANCH_WITH_TARGET_BLOCK DISPATCHER_SMALL DISPATCHER_LARGE LOOP LOOP_SAFETY CONDITION_OPTIMISED CONDITION_UNOPTIMISED CONDITION_UNOPTIMISED_PF CONDITION_UNOPTIMISED_UNHANDLED_L CONDITION_UNOPTIMISED_UNHANDLED_LE FAILED_PAGE_CHANGE SAFE_READ_FAST SAFE_READ_SLOW_PAGE_CROSSED SAFE_READ_SLOW_NOT_VALID SAFE_READ_SLOW_NOT_USER SAFE_READ_SLOW_IN_MAPPED_RANGE SAFE_WRITE_FAST SAFE_WRITE_SLOW_PAGE_CROSSED SAFE_WRITE_SLOW_NOT_VALID SAFE_WRITE_SLOW_NOT_USER SAFE_WRITE_SLOW_IN_MAPPED_RANGE SAFE_WRITE_SLOW_READ_ONLY SAFE_WRITE_SLOW_HAS_CODE SAFE_READ_WRITE_FAST SAFE_READ_WRITE_SLOW_PAGE_CROSSED SAFE_READ_WRITE_SLOW_NOT_VALID SAFE_READ_WRITE_SLOW_NOT_USER SAFE_READ_WRITE_SLOW_IN_MAPPED_RANGE SAFE_READ_WRITE_SLOW_READ_ONLY SAFE_READ_WRITE_SLOW_HAS_CODE PAGE_FAULT TLB_MISS MAIN_LOOP MAIN_LOOP_IDLE DO_MANY_CYCLES CYCLE_INTERNAL INVALIDATE_ALL_MODULES_NO_FREE_WASM_INDICES INVALIDATE_MODULE_WRITTEN_WHILE_COMPILED INVALIDATE_MODULE_UNUSED_AFTER_OVERWRITE INVALIDATE_MODULE_DIRTY_PAGE INVALIDATE_PAGE_HAD_CODE INVALIDATE_PAGE_HAD_ENTRY_POINTS DIRTY_PAGE_DID_NOT_HAVE_CODE RUN_FROM_CACHE_EXIT_SAME_PAGE RUN_FROM_CACHE_EXIT_NEAR_END_OF_PAGE RUN_FROM_CACHE_EXIT_DIFFERENT_PAGE CLEAR_TLB FULL_CLEAR_TLB TLB_FULL TLB_GLOBAL_FULL MODRM_SIMPLE_REG MODRM_SIMPLE_REG_WITH_OFFSET MODRM_SIMPLE_CONST_OFFSET MODRM_COMPLEX SEG_OFFSET_OPTIMISED SEG_OFFSET_NOT_OPTIMISED SEG_OFFSET_NOT_OPTIMISED_ES SEG_OFFSET_NOT_OPTIMISED_FS SEG_OFFSET_NOT_OPTIMISED_GS SEG_OFFSET_NOT_OPTIMISED_NOT_FLAT".split(" "),
d=0;const e={};for(let f=0;f<c.length;f++){const k=c[f];var g=void 0;if(k.includes("/")){d++;const [l,m]=k.split("/");g=e[l]/e[m]}else g=e[k]=a.wm.exports.profiler_stat_get(f-d),g=1E8<=g?Math.round(g/1E6)+"m":1E5<=g?Math.round(g/1E3)+"k":g;b+=k+"="+g+"\n"}b+="\n";c=a.wm.exports.get_valid_tlb_entries_count();d=a.wm.exports.get_valid_global_tlb_entries_count();b=b+("TLB_ENTRIES="+c+" ("+d+" global, "+(c-d)+" non-global)\nWASM_TABLE_FREE=")+(a.wm.exports.jit_get_wasm_table_index_free_list_count()+"\n");
b+="JIT_CACHE_SIZE="+a.wm.exports.jit_get_cache_size()+"\n";b+="FLAT_SEGMENTS="+a.wm.exports.has_flat_segmentation()+"\n";b+="wasm memory size: "+(a.wasm_memory.buffer.byteLength>>20)+"m\n";b=b+"Config:\nJIT_DISABLED="+(a.wm.exports.get_jit_config(0)+"\n");b+="MAX_PAGES="+a.wm.exports.get_jit_config(1)+"\n";b+="JIT_USE_LOOP_SAFETY="+!!a.wm.exports.get_jit_config(2)+"\n";return b+="MAX_EXTRA_BASIC_BLOCKS="+a.wm.exports.get_jit_config(3)+"\n"},print_instruction_counts:function(a){return[Cc.print_instruction_counts_offset(a,
!1,!1,!1,!1),Cc.print_instruction_counts_offset(a,!0,!1,!1,!1),Cc.print_instruction_counts_offset(a,!1,!0,!1,!1),Cc.print_instruction_counts_offset(a,!1,!1,!0,!1),Cc.print_instruction_counts_offset(a,!1,!1,!1,!0)].join("\n\n")},print_instruction_counts_offset:function(a,b,c,d,e){let g="";var f=[],k=b?"compiled":c?"jit exit":d?"unguarded register":e?"wasm size":"executed";for(let n=0;256>n;n++)for(let p=0;8>p;p++)for(const q of[!1,!0]){var l=a.wm.exports.get_opstats_buffer(b,c,d,e,n,!1,q,p);f.push({opcode:n,
count:l,is_mem:q,fixed_g:p});l=a.wm.exports.get_opstats_buffer(b,c,d,e,n,!0,q,p);f.push({opcode:3840|n,count:l,is_mem:q,fixed_g:p})}a=0;b=new Set([38,46,54,62,100,101,102,103,240,242,243]);for(const {count:n,opcode:p}of f)b.has(p)||(a+=n);if(0===a)return"";c=new Uint32Array(256);b=new Uint32Array(256);for(const {opcode:n,count:p}of f)3840===(n&65280)?b[n&255]+=p:c[n&255]+=p;g=g+"------------------\nTotal: "+(a+"\n");const m=1E7<a?1E3:1;d=Math.max.apply(Math,f.map(({count:n})=>Math.round(n/m)));d=
String(d).length;g+=`Instruction counts ${k} (in ${m}):\n`;for(e=0;256>e;e++)g+=e.toString(16).padStart(2,"0")+":"+t.pads(Math.round(c[e]/m),d),g=15===e%16?g+"\n":g+" ";g=g+"\n"+`Instruction counts ${k} (0f, in ${m}):\n`;for(k=0;256>k;k++)g+=(k&255).toString(16).padStart(2,"0")+":"+t.pads(Math.round(b[k]/m),d),g=15===k%16?g+"\n":g+" ";g+="\n";f=f.filter(({count:n})=>n).sort(({count:n},{count:p})=>p-n);for(const {opcode:n,is_mem:p,fixed_g:q,count:r}of f.slice(0,200))f=n.toString(16)+"_"+q+(p?"_m":
"_r"),g+=f+":"+(r/a*100).toFixed(2)+" ";return g+"\n"}};G.exportSymbol("print_stats",Cc);function ec(){this.filedata=new Map}ec.prototype.read=async function(a,b,c){return(a=this.filedata.get(a))?a.subarray(b,b+c):null};ec.prototype.cache=async function(a,b){this.filedata.set(a,b)};ec.prototype.uncache=function(a){this.filedata.delete(a)};function fc(a,b){b.endsWith("/")||(b+="/");this.storage=a;this.baseurl=b}fc.prototype.load_from_server=function(a){return new Promise(b=>{t.load_file(this.baseurl+a,{done:async c=>{c=new Uint8Array(c);await this.cache(a,c);b(c)}})})};
fc.prototype.read=async function(a,b,c){const d=await this.storage.read(a,b,c);return d?d:(await this.load_from_server(a)).subarray(b,b+c)};fc.prototype.cache=async function(a,b){return await this.storage.cache(a,b)};fc.prototype.uncache=function(a){this.storage.uncache(a)};function Y(a,b){this.inodes=[];this.events=[];this.storage=a;this.qidcounter=b||{last_qidnumber:0};this.inodedata={};this.total_size=274877906944;this.used_size=0;this.mounts=[];this.CreateDirectory("",-1)}Y.prototype.get_state=function(){let a=[];a[0]=this.inodes;a[1]=this.qidcounter.last_qidnumber;a[2]=[];for(const [b,c]of Object.entries(this.inodedata))0===(this.inodes[b].mode&16384)&&a[2].push([b,c]);a[3]=this.total_size;a[4]=this.used_size;return a=a.concat(this.mounts)};
Y.prototype.set_state=function(a){this.inodes=a[0].map(b=>{const c=new Dc(0);c.set_state(b);return c});this.qidcounter.last_qidnumber=a[1];this.inodedata={};for(let [b,c]of a[2])c.buffer.byteLength!==c.byteLength&&(c=c.slice()),this.inodedata[b]=c;this.total_size=a[3];this.used_size=a[4];this.mounts=a.slice(5)};Y.prototype.AddEvent=function(a,b){var c=this.inodes[a];0===c.status||2===c.status?b():this.is_forwarder(c)?this.follow_fs(c).AddEvent(c.foreign_id,b):this.events.push({id:a,OnEvent:b})};
Y.prototype.HandleEvent=function(a){var b=this.inodes[a];this.is_forwarder(b)&&this.follow_fs(b).HandleEvent(b.foreign_id);b=[];for(var c=0;c<this.events.length;c++)this.events[c].id===a?this.events[c].OnEvent():b.push(this.events[c]);this.events=b};
Y.prototype.load_from_json=function(a){if(3!==a.version)throw"The filesystem JSON format has changed. Please update your fs2json (https://github.com/copy/fs2json) and recreate the filesystem JSON.";var b=a.fsroot;this.used_size=a.size;for(a=0;a<b.length;a++)this.LoadRecursive(b[a],0)};
Y.prototype.LoadRecursive=function(a,b){var c=this.CreateInode();const d=a[0];c.size=a[1];c.mtime=a[2];c.ctime=c.mtime;c.atime=c.mtime;c.mode=a[3];c.uid=a[4];c.gid=a[5];var e=c.mode&61440;16384===e?(this.PushInode(c,b,d),this.LoadDir(this.inodes.length-1,a[6])):32768===e?(c.status=2,c.sha256sum=a[6],this.PushInode(c,b,d)):40960===e?(c.symlink=a[6],this.PushInode(c,b,d)):49152!==e&&B(e)};Y.prototype.LoadDir=function(a,b){for(var c=0;c<b.length;c++)this.LoadRecursive(b[c],a)};
Y.prototype.should_be_linked=function(a){return!this.is_forwarder(a)||0===a.foreign_id};Y.prototype.link_under_dir=function(a,b,c){const d=this.inodes[b],e=this.inodes[a];this.is_forwarder(e);this.IsDirectory(a);this.should_be_linked(d);e.direntries.has(c);e.direntries.set(c,b);d.nlinks++;this.IsDirectory(b)&&(d.direntries.has(".."),d.direntries.has(".")||d.nlinks++,d.direntries.set(".",b),d.direntries.set("..",a),e.nlinks++)};
Y.prototype.unlink_from_dir=function(a,b){const c=this.Search(a,b),d=this.inodes[c],e=this.inodes[a];this.is_forwarder(e);this.IsDirectory(a);e.direntries.delete(b)&&(d.nlinks--,this.IsDirectory(c)&&(d.direntries.get(".."),d.direntries.delete(".."),e.nlinks--))};
Y.prototype.PushInode=function(a,b,c){-1!==b?(this.inodes.push(a),a.fid=this.inodes.length-1,this.link_under_dir(b,a.fid,c)):0===this.inodes.length?(this.inodes.push(a),a.direntries.set(".",0),a.direntries.set("..",0),a.nlinks=2):(da.Debug("Error in Filesystem: Pushed inode with name = "+c+" has no parent"),da.Abort())};
function Dc(a){this.direntries=new Map;this.minor=this.major=this.mtime=this.atime=this.ctime=this.fid=this.gid=this.uid=this.size=this.status=0;this.symlink="";this.mode=493;this.qid={type:0,version:0,path:a};this.caps=void 0;this.nlinks=0;this.sha256sum="";this.locks=[];this.foreign_id=this.mount_id=-1}
Dc.prototype.get_state=function(){const a=[];a[0]=this.mode;a[1]=16384===(this.mode&61440)?[...this.direntries]:32768===(this.mode&61440)?this.sha256sum:40960===(this.mode&61440)?this.symlink:49152===(this.mode&61440)?[this.minor,this.major]:null;a[2]=this.locks;a[3]=this.status;a[4]=this.size;a[5]=this.uid;a[6]=this.gid;a[7]=this.fid;a[8]=this.ctime;a[9]=this.atime;a[10]=this.mtime;a[11]=this.qid.version;a[12]=this.qid.path;a[13]=this.nlinks;return a};
Dc.prototype.set_state=function(a){this.mode=a[0];if(16384===(this.mode&61440)){this.direntries=new Map;for(const [b,c]of a[1])this.direntries.set(b,c)}else 32768===(this.mode&61440)?this.sha256sum=a[1]:40960===(this.mode&61440)?this.symlink=a[1]:49152===(this.mode&61440)&&([this.minor,this.major]=a[1]);this.locks=[];for(const b of a[2]){const c=new Ec;c.set_state(b);this.locks.push(c)}this.status=a[3];this.size=a[4];this.uid=a[5];this.gid=a[6];this.fid=a[7];this.ctime=a[8];this.atime=a[9];this.mtime=
a[10];this.qid.type=(this.mode&61440)>>8;this.qid.version=a[11];this.qid.path=a[12];this.nlinks=a[13]};
Y.prototype.divert=function(a,b){const c=this.Search(a,b),d=this.inodes[c],e=new Dc(-1);this.IsDirectory(c);Object.assign(e,d);const g=this.inodes.length;this.inodes.push(e);e.fid=g;this.is_forwarder(d)&&this.mounts[d.mount_id].backtrack.set(d.foreign_id,g);this.should_be_linked(d)&&(this.unlink_from_dir(a,b),this.link_under_dir(a,g,b));if(this.IsDirectory(c)&&!this.is_forwarder(d))for(const [f,k]of e.direntries)"."!==f&&".."!==f&&this.IsDirectory(k)&&this.inodes[k].direntries.set("..",g);this.inodedata[g]=
this.inodedata[c];delete this.inodedata[c];d.direntries=new Map;d.nlinks=0;return g};Y.prototype.copy_inode=function(a,b){Object.assign(b,a,{fid:b.fid,direntries:b.direntries,nlinks:b.nlinks})};Y.prototype.CreateInode=function(){const a=Math.round(Date.now()/1E3),b=new Dc(++this.qidcounter.last_qidnumber);b.atime=b.ctime=b.mtime=a;return b};
Y.prototype.CreateDirectory=function(a,b){var c=this.inodes[b];if(0<=b&&this.is_forwarder(c))return b=c.foreign_id,a=this.follow_fs(c).CreateDirectory(a,b),this.create_forwarder(c.mount_id,a);c=this.CreateInode();c.mode=16895;0<=b&&(c.uid=this.inodes[b].uid,c.gid=this.inodes[b].gid,c.mode=this.inodes[b].mode&511|16384);c.qid.type=64;this.PushInode(c,b,a);this.NotifyListeners(this.inodes.length-1,"newdir");return this.inodes.length-1};
Y.prototype.CreateFile=function(a,b){var c=this.inodes[b];if(this.is_forwarder(c))return b=c.foreign_id,a=this.follow_fs(c).CreateFile(a,b),this.create_forwarder(c.mount_id,a);c=this.CreateInode();c.uid=this.inodes[b].uid;c.gid=this.inodes[b].gid;c.qid.type=128;c.mode=this.inodes[b].mode&438|32768;this.PushInode(c,b,a);this.NotifyListeners(this.inodes.length-1,"newfile");return this.inodes.length-1};
Y.prototype.CreateNode=function(a,b,c,d){var e=this.inodes[b];if(this.is_forwarder(e))return b=e.foreign_id,a=this.follow_fs(e).CreateNode(a,b,c,d),this.create_forwarder(e.mount_id,a);e=this.CreateInode();e.major=c;e.minor=d;e.uid=this.inodes[b].uid;e.gid=this.inodes[b].gid;e.qid.type=192;e.mode=this.inodes[b].mode&438;this.PushInode(e,b,a);return this.inodes.length-1};
Y.prototype.CreateSymlink=function(a,b,c){var d=this.inodes[b];if(this.is_forwarder(d))return b=d.foreign_id,a=this.follow_fs(d).CreateSymlink(a,b,c),this.create_forwarder(d.mount_id,a);d=this.CreateInode();d.uid=this.inodes[b].uid;d.gid=this.inodes[b].gid;d.qid.type=160;d.symlink=c;d.mode=40960;this.PushInode(d,b,a);return this.inodes.length-1};
Y.prototype.CreateTextFile=async function(a,b,c){var d=this.inodes[b];if(this.is_forwarder(d))return b=d.foreign_id,c=await this.follow_fs(d).CreateTextFile(a,b,c),this.create_forwarder(d.mount_id,c);d=this.CreateFile(a,b);b=this.inodes[d];a=new Uint8Array(c.length);b.size=c.length;for(b=0;b<c.length;b++)a[b]=c.charCodeAt(b);await this.set_data(d,a);return d};
Y.prototype.CreateBinaryFile=async function(a,b,c){var d=this.inodes[b];if(this.is_forwarder(d))return b=d.foreign_id,c=await this.follow_fs(d).CreateBinaryFile(a,b,c),this.create_forwarder(d.mount_id,c);d=this.CreateFile(a,b);a=this.inodes[d];b=new Uint8Array(c.length);b.set(c);await this.set_data(d,b);a.size=c.length;return d};
Y.prototype.OpenInode=function(a,b){var c=this.inodes[a];if(this.is_forwarder(c))return this.follow_fs(c).OpenInode(c.foreign_id,b);16384===(c.mode&61440)&&this.FillDirectory(a);return!0};Y.prototype.CloseInode=async function(a){var b=this.inodes[a];if(this.is_forwarder(b))return await this.follow_fs(b).CloseInode(b.foreign_id);2===b.status&&this.storage.uncache(b.sha256sum);4===b.status&&(b.status=-1,await this.DeleteData(a))};
Y.prototype.Rename=async function(a,b,c,d){if(a===c&&b===d)return 0;var e=this.Search(a,b);if(-1===e)return-2;var g=this.GetFullPath(a)+"/"+b;if(-1!==this.Search(c,d)){var f=this.Unlink(c,d);if(0>f)return f}var k=this.inodes[e],l=this.inodes[a];f=this.inodes[c];if(this.is_forwarder(l)||this.is_forwarder(f))if(this.is_forwarder(l)&&l.mount_id===f.mount_id){if(a=await this.follow_fs(l).Rename(l.foreign_id,b,f.foreign_id,d),0>a)return a}else{if(this.is_a_root(e)||!this.IsDirectory(e)&&1<this.GetInode(e).nlinks)return-1;
l=this.divert(a,b);const m=this.GetInode(e),n=await this.Read(l,0,m.size);this.is_forwarder(f)?(c=this.follow_fs(f),d=this.IsDirectory(l)?c.CreateDirectory(d,f.foreign_id):c.CreateFile(d,f.foreign_id),c=c.GetInode(d),this.copy_inode(m,c),this.set_forwarder(e,f.mount_id,d)):(this.delete_forwarder(k),this.copy_inode(m,k),this.link_under_dir(c,e,d));await this.ChangeSize(e,m.size);n&&n.length&&await this.Write(e,0,n.length,n);if(this.IsDirectory(e))for(const p of this.GetChildren(l))if(f=await this.Rename(l,
p,e,p),0>f)return f;await this.DeleteData(l);a=this.Unlink(a,b);if(0>a)return a}else this.unlink_from_dir(a,b),this.link_under_dir(c,e,d),k.qid.version++;this.NotifyListeners(e,"rename",{oldpath:g});return 0};
Y.prototype.Write=async function(a,b,c,d){this.NotifyListeners(a,"write");var e=this.inodes[a];if(this.is_forwarder(e))a=e.foreign_id,await this.follow_fs(e).Write(a,b,c,d);else{var g=await this.get_buffer(a);!g||g.length<b+c?(await this.ChangeSize(a,Math.floor(3*(b+c)/2)),e.size=b+c,g=await this.get_buffer(a)):e.size<b+c&&(e.size=b+c);d&&g.set(d.subarray(0,c),b);await this.set_data(a,g)}};
Y.prototype.Read=async function(a,b,c){const d=this.inodes[a];return this.is_forwarder(d)?(a=d.foreign_id,await this.follow_fs(d).Read(a,b,c)):await this.get_data(a,b,c)};Y.prototype.Search=function(a,b){a=this.inodes[a];if(this.is_forwarder(a)){const c=a.foreign_id;b=this.follow_fs(a).Search(c,b);return-1===b?-1:this.get_forwarder(a.mount_id,b)}b=a.direntries.get(b);return void 0===b?-1:b};
Y.prototype.CountUsedInodes=function(){let a=this.inodes.length;for(const {fs:b,backtrack:c}of this.mounts)a+=b.CountUsedInodes(),a-=c.size;return a};Y.prototype.CountFreeInodes=function(){let a=1048576;for(const {fs:b}of this.mounts)a+=b.CountFreeInodes();return a};Y.prototype.GetTotalSize=function(){let a=this.used_size;for(const {fs:b}of this.mounts)a+=b.GetTotalSize();return a};Y.prototype.GetSpace=function(){let a=this.total_size;for(const {fs:b}of this.mounts)a+=b.GetSpace();return this.total_size};
Y.prototype.GetDirectoryName=function(a){const b=this.inodes[this.GetParent(a)];if(this.is_forwarder(b))return this.follow_fs(b).GetDirectoryName(this.inodes[a].foreign_id);if(!b)return"";for(const [c,d]of b.direntries)if(d===a)return c;return""};Y.prototype.GetFullPath=function(a){this.IsDirectory(a);for(var b="";0!==a;)b="/"+this.GetDirectoryName(a)+b,a=this.GetParent(a);return b.substring(1)};
Y.prototype.Link=function(a,b,c){if(this.IsDirectory(b))return-1;const d=this.inodes[a],e=this.inodes[b];if(this.is_forwarder(d))return this.is_forwarder(e)&&e.mount_id===d.mount_id?this.follow_fs(d).Link(d.foreign_id,e.foreign_id,c):-1;if(this.is_forwarder(e))return-1;this.link_under_dir(a,b,c);return 0};
Y.prototype.Unlink=function(a,b){if("."===b||".."===b)return-1;const c=this.Search(a,b),d=this.inodes[c],e=this.inodes[a];if(this.is_forwarder(e))return this.is_forwarder(d),a=e.foreign_id,this.follow_fs(e).Unlink(a,b);if(this.IsDirectory(c)&&!this.IsEmpty(c))return-39;this.unlink_from_dir(a,b);0===d.nlinks&&(d.status=4,this.NotifyListeners(c,"delete"));return 0};
Y.prototype.DeleteData=async function(a){const b=this.inodes[a];this.is_forwarder(b)?await this.follow_fs(b).DeleteData(b.foreign_id):(b.size=0,delete this.inodedata[a])};Y.prototype.get_buffer=async function(a){const b=this.inodes[a];return this.inodedata[a]?this.inodedata[a]:2===b.status?await this.storage.read(b.sha256sum,0,b.size):null};
Y.prototype.get_data=async function(a,b,c){const d=this.inodes[a];return this.inodedata[a]?this.inodedata[a].subarray(b,b+c):2===d.status?await this.storage.read(d.sha256sum,b,c):null};Y.prototype.set_data=async function(a,b){this.inodedata[a]=b;2===this.inodes[a].status&&(this.inodes[a].status=0,this.storage.uncache(this.inodes[a].sha256sum))};Y.prototype.GetInode=function(a){isNaN(a);a=this.inodes[a];return this.is_forwarder(a)?this.follow_fs(a).GetInode(a.foreign_id):a};
Y.prototype.ChangeSize=async function(a,b){var c=this.GetInode(a),d=await this.get_data(a,0,c.size);if(b!==c.size){var e=new Uint8Array(b);c.size=b;d&&e.set(d.subarray(0,Math.min(d.length,c.size)),0);await this.set_data(a,e)}};
Y.prototype.SearchPath=function(a){a=a.replace("//","/");a=a.split("/");0<a.length&&0===a[a.length-1].length&&a.pop();0<a.length&&0===a[0].length&&a.shift();const b=a.length;var c=-1,d=0;let e=null;for(var g=0;g<b;g++)if(c=d,d=this.Search(c,a[g]),!e&&this.is_forwarder(this.inodes[c])&&(e="/"+a.slice(g).join("/")),-1===d)return g<b-1?{id:-1,parentid:-1,name:a[g],forward_path:e}:{id:-1,parentid:c,name:a[g],forward_path:e};return{id:d,parentid:c,name:a[g],forward_path:e}};
Y.prototype.GetRecursiveList=function(a,b){if(this.is_forwarder(this.inodes[a])){const c=this.follow_fs(this.inodes[a]),d=this.inodes[a].mount_id,e=b.length;c.GetRecursiveList(this.inodes[a].foreign_id,b);for(a=e;a<b.length;a++)b[a].parentid=this.get_forwarder(d,b[a].parentid)}else for(const [c,d]of this.inodes[a].direntries)"."!==c&&".."!==c&&(b.push({parentid:a,name:c}),this.IsDirectory(d)&&this.GetRecursiveList(d,b))};
Y.prototype.RecursiveDelete=function(a){var b=[];a=this.SearchPath(a);if(-1!==a.id)for(this.GetRecursiveList(a.id,b),a=b.length-1;0<=a;a--)this.Unlink(b[a].parentid,b[a].name)};Y.prototype.DeleteNode=function(a){var b=this.SearchPath(a);-1!==b.id&&(32768===(this.inodes[b.id].mode&61440)?this.Unlink(b.parentid,b.name):16384===(this.inodes[b.id].mode&61440)&&(this.RecursiveDelete(a),this.Unlink(b.parentid,b.name)))};Y.prototype.NotifyListeners=function(){};
Y.prototype.Check=function(){for(var a=1;a<this.inodes.length;a++)if(-1!==this.inodes[a].status){var b=this.GetInode(a);0>b.nlinks&&da.Debug("Error in filesystem: negative nlinks="+b.nlinks+" at id ="+a);if(this.IsDirectory(a)){b=this.GetInode(a);this.IsDirectory(a)&&0>this.GetParent(a)&&da.Debug("Error in filesystem: negative parent id "+a);for(const [c,d]of b.direntries){0===c.length&&da.Debug("Error in filesystem: inode with no name and id "+d);for(const e of c)32>e&&da.Debug("Error in filesystem: Unallowed char in filename")}}}};
Y.prototype.FillDirectory=function(a){var b=this.inodes[a];if(this.is_forwarder(b))this.follow_fs(b).FillDirectory(b.foreign_id);else{var c=0;for(const d of b.direntries.keys())c+=24+Fc.encode(d).length;a=this.inodedata[a]=new Uint8Array(c);b.size=c;c=0;for(const [d,e]of b.direntries)b=this.GetInode(e),c+=ca.Marshall(["Q","d","b","s"],[b.qid,c+13+8+1+2+Fc.encode(d).length,b.mode>>12,d],a,c)}};
Y.prototype.RoundToDirentry=function(a,b){a=this.inodedata[a];if(b>=a.length)return a.length;let c=0;for(;;){const d=ca.Unmarshall(["Q","d"],a,{offset:c})[1];if(d>b)break;c=d}return c};Y.prototype.IsDirectory=function(a){a=this.inodes[a];return this.is_forwarder(a)?this.follow_fs(a).IsDirectory(a.foreign_id):16384===(a.mode&61440)};
Y.prototype.IsEmpty=function(a){a=this.inodes[a];if(this.is_forwarder(a))return this.follow_fs(a).IsDirectory(a.foreign_id);for(const b of a.direntries.keys())if("."!==b&&".."!==b)return!1;return!0};Y.prototype.GetChildren=function(a){this.IsDirectory(a);a=this.inodes[a];if(this.is_forwarder(a))return this.follow_fs(a).GetChildren(a.foreign_id);const b=[];for(const c of a.direntries.keys())"."!==c&&".."!==c&&b.push(c);return b};
Y.prototype.GetParent=function(a){this.IsDirectory(a);a=this.inodes[a];if(this.should_be_linked(a))return a.direntries.get("..");const b=this.follow_fs(a).GetParent(a.foreign_id);return this.get_forwarder(a.mount_id,b)};
Y.prototype.PrepareCAPs=function(a){a=this.GetInode(a);if(a.caps)return a.caps.length;a.caps=new Uint8Array(20);a.caps[0]=0;a.caps[1]=0;a.caps[2]=0;a.caps[3]=2;a.caps[4]=255;a.caps[5]=255;a.caps[6]=255;a.caps[7]=255;a.caps[8]=255;a.caps[9]=255;a.caps[10]=255;a.caps[11]=255;a.caps[12]=63;a.caps[13]=0;a.caps[14]=0;a.caps[15]=0;a.caps[16]=63;a.caps[17]=0;a.caps[18]=0;a.caps[19]=0;return a.caps.length};function Gc(a){this.fs=a;this.backtrack=new Map}
Gc.prototype.get_state=function(){const a=[];a[0]=this.fs;a[1]=[...this.backtrack];return a};Gc.prototype.set_state=function(a){this.fs=a[0];this.backtrack=new Map(a[1])};Y.prototype.set_forwarder=function(a,b,c){const d=this.inodes[a];this.is_forwarder(d)&&this.mounts[d.mount_id].backtrack.delete(d.foreign_id);d.status=5;d.mount_id=b;d.foreign_id=c;this.mounts[b].backtrack.set(c,a)};
Y.prototype.create_forwarder=function(a,b){const c=this.CreateInode(),d=this.inodes.length;this.inodes.push(c);c.fid=d;this.set_forwarder(d,a,b);return d};Y.prototype.is_forwarder=function(a){return 5===a.status};Y.prototype.is_a_root=function(a){return 0===this.GetInode(a).fid};Y.prototype.get_forwarder=function(a,b){const c=this.mounts[a].backtrack.get(b);return void 0===c?this.create_forwarder(a,b):c};Y.prototype.delete_forwarder=function(a){this.is_forwarder(a);a.status=-1;this.mounts[a.mount_id].backtrack.delete(a.foreign_id)};
Y.prototype.follow_fs=function(a){const b=this.mounts[a.mount_id];this.is_forwarder(a);return b.fs};
Y.prototype.Mount=function(a,b){var c=this.SearchPath(a);if(-1===c.parentid)return console.debug("Mount failed: parent for path not found: "+a,4194304),-2;if(-1!==c.id)return console.debug("Mount failed: file already exists at path: "+a,4194304),-17;if(c.forward_path)return a=this.inodes[c.parentid],c=this.follow_fs(a).Mount(c.forward_path,b),0>c?c:this.get_forwarder(a.mount_id,c);a=this.mounts.length;this.mounts.push(new Gc(b));b=this.create_forwarder(a,0);this.link_under_dir(c.parentid,b,c.name);
return b};function Ec(){this.type=2;this.start=0;this.length=Infinity;this.proc_id=-1;this.client_id=""}Ec.prototype.get_state=function(){const a=[];a[0]=this.type;a[1]=this.start;a[2]=Infinity===this.length?0:this.length;a[3]=this.proc_id;a[4]=this.client_id;return a};Ec.prototype.set_state=function(a){this.type=a[0];this.start=a[1];this.length=0===a[2]?Infinity:a[2];this.proc_id=a[3];this.client_id=a[4]};Ec.prototype.clone=function(){const a=new Ec;a.set_state(this.get_state());return a};
Ec.prototype.conflicts_with=function(a){return this.proc_id===a.proc_id&&this.client_id===a.client_id||2===this.type||2===a.type||1!==this.type&&1!==a.type||this.start+this.length<=a.start||a.start+a.length<=this.start?!1:!0};Ec.prototype.is_alike=function(a){return a.proc_id===this.proc_id&&a.client_id===this.client_id&&a.type===this.type};Ec.prototype.may_merge_after=function(a){return this.is_alike(a)&&a.start+a.length===this.start};
Y.prototype.DescribeLock=function(a,b,c,d,e){const g=new Ec;g.type=a;g.start=b;g.length=c;g.proc_id=d;g.client_id=e;return g};Y.prototype.GetLock=function(a,b){a=this.inodes[a];if(this.is_forwarder(a)){var c=a.foreign_id;return this.follow_fs(a).GetLock(c,b)}for(c of a.locks)if(b.conflicts_with(c))return c.clone();return null};
Y.prototype.Lock=function(a,b,c){const d=this.inodes[a];if(this.is_forwarder(d))return a=d.foreign_id,this.follow_fs(d).Lock(a,b,c);b=b.clone();if(2!==b.type&&this.GetLock(a,b))return 1;for(c=0;c<d.locks.length;c++){a=d.locks[c];if(a.start+a.length<=b.start)continue;if(b.start+b.length<=a.start)break;if(a.proc_id!==b.proc_id||a.client_id!==b.client_id){a.conflicts_with(b);continue}var e=b.start+b.length;const g=b.start-a.start,f=a.start+a.length-e;if(0<g&&0<f&&a.type===b.type)return 0;0<g&&(a.length=
g);if(0>=g&&0<f)a.start=e,a.length=f;else if(0<f){for(;c<d.locks.length&&d.locks[c].start<e;)c++;d.locks.splice(c,0,this.DescribeLock(a.type,e,f,a.proc_id,a.client_id))}else 0>=g&&(d.locks.splice(c,1),c--)}if(2!==b.type){c=b;a=!1;for(e=0;e<d.locks.length&&!(c.may_merge_after(d.locks[e])&&(d.locks[e].length+=b.length,c=d.locks[e],a=!0),b.start<=d.locks[e].start);e++);a||(d.locks.splice(e,0,c),e++);for(;e<d.locks.length;e++)if(d.locks[e].is_alike(c)){d.locks[e].may_merge_after(c)&&(c.length+=d.locks[e].length,
d.locks.splice(e,1));break}}return 0};Y.prototype.read_dir=function(a){a=this.SearchPath(a);if(-1!==a.id)return a=this.GetInode(a.id),Array.from(a.direntries.keys()).filter(b=>"."!==b&&".."!==b)};Y.prototype.read_file=function(a){a=this.SearchPath(a);if(-1===a.id)return Promise.resolve(null);const b=this.GetInode(a.id);return this.Read(a.id,0,b.size)};
Y.prototype.OpenInodeAsync=async function(a,b){var c=this.inodes[a];return this.is_forwarder(c)?await this.follow_fs(c).OpenInodeAsync(c.foreign_id,b):this.OpenInode(a,b)};Y.prototype.SearchAsync=async function(a,b){const c=this.inodes[a];return this.is_forwarder(c)?(a=c.foreign_id,b=await this.follow_fs(c).SearchAsync(a,b),-1===b?-1:this.get_forwarder(c.mount_id,b)):this.Search(a,b)};window&&(window.FS=Y);function dc(){Y.call(this,new ec,void 0);this.CreateFile("empty.txt",0)}dc.prototype=Object.create(Y.prototype);
dc.prototype.constructor=Y;var da={Debug:function(a){[].slice.apply(arguments).join(" ")},Abort:function(){}};var ca={};const Hc=new TextDecoder,Fc=new TextEncoder;
ca.Marshall=function(a,b,c,d){for(var e,g=0,f=0;f<a.length;f++)switch(e=b[f],a[f]){case "w":c[d++]=e&255;c[d++]=e>>8&255;c[d++]=e>>16&255;c[d++]=e>>24&255;g+=4;break;case "d":c[d++]=e&255;c[d++]=e>>8&255;c[d++]=e>>16&255;c[d++]=e>>24&255;c[d++]=0;c[d++]=0;c[d++]=0;c[d++]=0;g+=8;break;case "h":c[d++]=e&255;c[d++]=e>>8;g+=2;break;case "b":c[d++]=e;g+=1;break;case "s":var k=d,l=0;c[d++]=0;c[d++]=0;g+=2;e=Fc.encode(e);g+=e.byteLength;l+=e.byteLength;c.set(e,d);d+=e.byteLength;c[k+0]=l&255;c[k+1]=l>>8&
255;break;case "Q":ca.Marshall(["b","w","d"],[e.type,e.version,e.path],c,d);d+=13;g+=13;break;default:da.Debug("Marshall: Unknown type="+a[f])}return g};
ca.Unmarshall=function(a,b,c){let d=c.offset;for(var e=[],g=0;g<a.length;g++)switch(a[g]){case "w":var f=b[d++];f+=b[d++]<<8;f+=b[d++]<<16;f+=b[d++]<<24>>>0;e.push(f);break;case "d":f=b[d++];f+=b[d++]<<8;f+=b[d++]<<16;f+=b[d++]<<24>>>0;d+=4;e.push(f);break;case "h":f=b[d++];e.push(f+(b[d++]<<8));break;case "b":e.push(b[d++]);break;case "s":f=b[d++];f+=b[d++]<<8;var k=b.slice(d,d+f);d+=f;e.push(Hc.decode(k));break;case "Q":c.offset=d;f=ca.Unmarshall(["b","w","d"],b,c);d=c.offset;e.push({type:f[0],
version:f[1],path:f[2]});break;default:da.Debug("Error in Unmarshall: Unknown type="+a[g])}c.offset=d;return e};}).call(this);
// Copyright 2018 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

"use strict";

(() => {
	const enosys = () => {
		const err = new Error("not implemented");
		err.code = "ENOSYS";
		return err;
	};

	if (!globalThis.fs) {
		let outputBuf = "";
		globalThis.fs = {
			constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 }, // unused
			writeSync(fd, buf) {
				outputBuf += decoder.decode(buf);
				const nl = outputBuf.lastIndexOf("\n");
				if (nl != -1) {
					console.log(outputBuf.substring(0, nl));
					outputBuf = outputBuf.substring(nl + 1);
				}
				return buf.length;
			},
			write(fd, buf, offset, length, position, callback) {
				if (offset !== 0 || length !== buf.length || position !== null) {
					callback(enosys());
					return;
				}
				const n = this.writeSync(fd, buf);
				callback(null, n);
			},
			chmod(path, mode, callback) { callback(enosys()); },
			chown(path, uid, gid, callback) { callback(enosys()); },
			close(fd, callback) { callback(enosys()); },
			fchmod(fd, mode, callback) { callback(enosys()); },
			fchown(fd, uid, gid, callback) { callback(enosys()); },
			fstat(fd, callback) { callback(enosys()); },
			fsync(fd, callback) { callback(null); },
			ftruncate(fd, length, callback) { callback(enosys()); },
			lchown(path, uid, gid, callback) { callback(enosys()); },
			link(path, link, callback) { callback(enosys()); },
			lstat(path, callback) { callback(enosys()); },
			mkdir(path, perm, callback) { callback(enosys()); },
			open(path, flags, mode, callback) { callback(enosys()); },
			read(fd, buffer, offset, length, position, callback) { callback(enosys()); },
			readdir(path, callback) { callback(enosys()); },
			readlink(path, callback) { callback(enosys()); },
			rename(from, to, callback) { callback(enosys()); },
			rmdir(path, callback) { callback(enosys()); },
			stat(path, callback) { callback(enosys()); },
			symlink(path, link, callback) { callback(enosys()); },
			truncate(path, length, callback) { callback(enosys()); },
			unlink(path, callback) { callback(enosys()); },
			utimes(path, atime, mtime, callback) { callback(enosys()); },
		};
	}

	if (!globalThis.process) {
		globalThis.process = {
			getuid() { return -1; },
			getgid() { return -1; },
			geteuid() { return -1; },
			getegid() { return -1; },
			getgroups() { throw enosys(); },
			pid: -1,
			ppid: -1,
			umask() { throw enosys(); },
			cwd() { throw enosys(); },
			chdir() { throw enosys(); },
			exit() {},
		}
	}

	if (!globalThis.crypto) {
		throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
	}

	if (!globalThis.performance) {
		throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
	}

	if (!globalThis.TextEncoder) {
		throw new Error("globalThis.TextEncoder is not available, polyfill required");
	}

	if (!globalThis.TextDecoder) {
		throw new Error("globalThis.TextDecoder is not available, polyfill required");
	}

	const encoder = new TextEncoder("utf-8");
	const decoder = new TextDecoder("utf-8");

	globalThis.Go = class {
		constructor() {
			this.argv = ["js"];
			this.env = {};
			this.exit = (code) => {
				if (code !== 0) {
					console.warn("exit code:", code);
				}
			};
			this._exitPromise = new Promise((resolve) => {
				this._resolveExitPromise = resolve;
			});
			this._pendingEvent = null;
			this._scheduledTimeouts = new Map();
			this._nextCallbackTimeoutID = 1;

			const setInt64 = (addr, v) => {
				this.mem.setUint32(addr + 0, v, true);
				this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
			}

			const setInt32 = (addr, v) => {
				this.mem.setUint32(addr + 0, v, true);
			}

			const getInt64 = (addr) => {
				const low = this.mem.getUint32(addr + 0, true);
				const high = this.mem.getInt32(addr + 4, true);
				return low + high * 4294967296;
			}

			const loadValue = (addr) => {
				const f = this.mem.getFloat64(addr, true);
				if (f === 0) {
					return undefined;
				}
				if (!isNaN(f)) {
					return f;
				}

				const id = this.mem.getUint32(addr, true);
				return this._values[id];
			}

			const storeValue = (addr, v) => {
				const nanHead = 0x7FF80000;

				if (typeof v === "number" && v !== 0) {
					if (isNaN(v)) {
						this.mem.setUint32(addr + 4, nanHead, true);
						this.mem.setUint32(addr, 0, true);
						return;
					}
					this.mem.setFloat64(addr, v, true);
					return;
				}

				if (v === undefined) {
					this.mem.setFloat64(addr, 0, true);
					return;
				}

				let id = this._ids.get(v);
				if (id === undefined) {
					id = this._idPool.pop();
					if (id === undefined) {
						id = this._values.length;
					}
					this._values[id] = v;
					this._goRefCounts[id] = 0;
					this._ids.set(v, id);
				}
				this._goRefCounts[id]++;
				let typeFlag = 0;
				switch (typeof v) {
					case "object":
						if (v !== null) {
							typeFlag = 1;
						}
						break;
					case "string":
						typeFlag = 2;
						break;
					case "symbol":
						typeFlag = 3;
						break;
					case "function":
						typeFlag = 4;
						break;
				}
				this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
				this.mem.setUint32(addr, id, true);
			}

			const loadSlice = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return new Uint8Array(this._inst.exports.mem.buffer, array, len);
			}

			const loadSliceOfValues = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				const a = new Array(len);
				for (let i = 0; i < len; i++) {
					a[i] = loadValue(array + i * 8);
				}
				return a;
			}

			const loadString = (addr) => {
				const saddr = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
			}

			const timeOrigin = Date.now() - performance.now();
			this.importObject = {
				_gotest: {
					add: (a, b) => a + b,
				},
				gojs: {
					// Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
					// may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
					// function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
					// This changes the SP, thus we have to update the SP used by the imported function.

					// func wasmExit(code int32)
					"runtime.wasmExit": (sp) => {
						sp >>>= 0;
						const code = this.mem.getInt32(sp + 8, true);
						this.exited = true;
						delete this._inst;
						delete this._values;
						delete this._goRefCounts;
						delete this._ids;
						delete this._idPool;
						this.exit(code);
					},

					// func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
					"runtime.wasmWrite": (sp) => {
						sp >>>= 0;
						const fd = getInt64(sp + 8);
						const p = getInt64(sp + 16);
						const n = this.mem.getInt32(sp + 24, true);
						fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
					},

					// func resetMemoryDataView()
					"runtime.resetMemoryDataView": (sp) => {
						sp >>>= 0;
						this.mem = new DataView(this._inst.exports.mem.buffer);
					},

					// func nanotime1() int64
					"runtime.nanotime1": (sp) => {
						sp >>>= 0;
						setInt64(sp + 8, (timeOrigin + performance.now()) * 1000000);
					},

					// func walltime() (sec int64, nsec int32)
					"runtime.walltime": (sp) => {
						sp >>>= 0;
						const msec = (new Date).getTime();
						setInt64(sp + 8, msec / 1000);
						this.mem.setInt32(sp + 16, (msec % 1000) * 1000000, true);
					},

					// func scheduleTimeoutEvent(delay int64) int32
					"runtime.scheduleTimeoutEvent": (sp) => {
						sp >>>= 0;
						const id = this._nextCallbackTimeoutID;
						this._nextCallbackTimeoutID++;
						this._scheduledTimeouts.set(id, setTimeout(
							() => {
								this._resume();
								while (this._scheduledTimeouts.has(id)) {
									// for some reason Go failed to register the timeout event, log and try again
									// (temporary workaround for https://github.com/golang/go/issues/28975)
									console.warn("scheduleTimeoutEvent: missed timeout event");
									this._resume();
								}
							},
							getInt64(sp + 8),
						));
						this.mem.setInt32(sp + 16, id, true);
					},

					// func clearTimeoutEvent(id int32)
					"runtime.clearTimeoutEvent": (sp) => {
						sp >>>= 0;
						const id = this.mem.getInt32(sp + 8, true);
						clearTimeout(this._scheduledTimeouts.get(id));
						this._scheduledTimeouts.delete(id);
					},

					// func getRandomData(r []byte)
					"runtime.getRandomData": (sp) => {
						sp >>>= 0;
						crypto.getRandomValues(loadSlice(sp + 8));
					},

					// func finalizeRef(v ref)
					"syscall/js.finalizeRef": (sp) => {
						sp >>>= 0;
						const id = this.mem.getUint32(sp + 8, true);
						this._goRefCounts[id]--;
						if (this._goRefCounts[id] === 0) {
							const v = this._values[id];
							this._values[id] = null;
							this._ids.delete(v);
							this._idPool.push(id);
						}
					},

					// func stringVal(value string) ref
					"syscall/js.stringVal": (sp) => {
						sp >>>= 0;
						storeValue(sp + 24, loadString(sp + 8));
					},

					// func valueGet(v ref, p string) ref
					"syscall/js.valueGet": (sp) => {
						sp >>>= 0;
						const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
						sp = this._inst.exports.getsp() >>> 0; // see comment above
						storeValue(sp + 32, result);
					},

					// func valueSet(v ref, p string, x ref)
					"syscall/js.valueSet": (sp) => {
						sp >>>= 0;
						Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
					},

					// func valueDelete(v ref, p string)
					"syscall/js.valueDelete": (sp) => {
						sp >>>= 0;
						Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
					},

					// func valueIndex(v ref, i int) ref
					"syscall/js.valueIndex": (sp) => {
						sp >>>= 0;
						storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
					},

					// valueSetIndex(v ref, i int, x ref)
					"syscall/js.valueSetIndex": (sp) => {
						sp >>>= 0;
						Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
					},

					// func valueCall(v ref, m string, args []ref) (ref, bool)
					"syscall/js.valueCall": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const m = Reflect.get(v, loadString(sp + 16));
							const args = loadSliceOfValues(sp + 32);
							const result = Reflect.apply(m, v, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 56, result);
							this.mem.setUint8(sp + 64, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 56, err);
							this.mem.setUint8(sp + 64, 0);
						}
					},

					// func valueInvoke(v ref, args []ref) (ref, bool)
					"syscall/js.valueInvoke": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.apply(v, undefined, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueNew(v ref, args []ref) (ref, bool)
					"syscall/js.valueNew": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.construct(v, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueLength(v ref) int
					"syscall/js.valueLength": (sp) => {
						sp >>>= 0;
						setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
					},

					// valuePrepareString(v ref) (ref, int)
					"syscall/js.valuePrepareString": (sp) => {
						sp >>>= 0;
						const str = encoder.encode(String(loadValue(sp + 8)));
						storeValue(sp + 16, str);
						setInt64(sp + 24, str.length);
					},

					// valueLoadString(v ref, b []byte)
					"syscall/js.valueLoadString": (sp) => {
						sp >>>= 0;
						const str = loadValue(sp + 8);
						loadSlice(sp + 16).set(str);
					},

					// func valueInstanceOf(v ref, t ref) bool
					"syscall/js.valueInstanceOf": (sp) => {
						sp >>>= 0;
						this.mem.setUint8(sp + 24, (loadValue(sp + 8) instanceof loadValue(sp + 16)) ? 1 : 0);
					},

					// func copyBytesToGo(dst []byte, src ref) (int, bool)
					"syscall/js.copyBytesToGo": (sp) => {
						sp >>>= 0;
						const dst = loadSlice(sp + 8);
						const src = loadValue(sp + 32);
						if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
							this.mem.setUint8(sp + 48, 0);
							return;
						}
						const toCopy = src.subarray(0, dst.length);
						dst.set(toCopy);
						setInt64(sp + 40, toCopy.length);
						this.mem.setUint8(sp + 48, 1);
					},

					// func copyBytesToJS(dst ref, src []byte) (int, bool)
					"syscall/js.copyBytesToJS": (sp) => {
						sp >>>= 0;
						const dst = loadValue(sp + 8);
						const src = loadSlice(sp + 16);
						if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
							this.mem.setUint8(sp + 48, 0);
							return;
						}
						const toCopy = src.subarray(0, dst.length);
						dst.set(toCopy);
						setInt64(sp + 40, toCopy.length);
						this.mem.setUint8(sp + 48, 1);
					},

					"debug": (value) => {
						console.log(value);
					},
				}
			};
		}

		async run(instance) {
			if (!(instance instanceof WebAssembly.Instance)) {
				throw new Error("Go.run: WebAssembly.Instance expected");
			}
			this._inst = instance;
			this.mem = new DataView(this._inst.exports.mem.buffer);
			this._values = [ // JS values that Go currently has references to, indexed by reference id
				NaN,
				0,
				null,
				true,
				false,
				globalThis,
				this,
			];
			this._goRefCounts = new Array(this._values.length).fill(Infinity); // number of references that Go has to a JS value, indexed by reference id
			this._ids = new Map([ // mapping from JS values to reference ids
				[0, 1],
				[null, 2],
				[true, 3],
				[false, 4],
				[globalThis, 5],
				[this, 6],
			]);
			this._idPool = [];   // unused ids that have been garbage collected
			this.exited = false; // whether the Go program has exited

			// Pass command line arguments and environment variables to WebAssembly by writing them to the linear memory.
			let offset = 4096;

			const strPtr = (str) => {
				const ptr = offset;
				const bytes = encoder.encode(str + "\0");
				new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
				offset += bytes.length;
				if (offset % 8 !== 0) {
					offset += 8 - (offset % 8);
				}
				return ptr;
			};

			const argc = this.argv.length;

			const argvPtrs = [];
			this.argv.forEach((arg) => {
				argvPtrs.push(strPtr(arg));
			});
			argvPtrs.push(0);

			const keys = Object.keys(this.env).sort();
			keys.forEach((key) => {
				argvPtrs.push(strPtr(`${key}=${this.env[key]}`));
			});
			argvPtrs.push(0);

			const argv = offset;
			argvPtrs.forEach((ptr) => {
				this.mem.setUint32(offset, ptr, true);
				this.mem.setUint32(offset + 4, 0, true);
				offset += 8;
			});

			// The linker guarantees global data starts from at least wasmMinDataAddr.
			// Keep in sync with cmd/link/internal/ld/data.go:wasmMinDataAddr.
			const wasmMinDataAddr = 4096 + 8192;
			if (offset >= wasmMinDataAddr) {
				throw new Error("total length of command line and environment variables exceeds limit");
			}

			this._inst.exports.run(argc, argv);
			if (this.exited) {
				this._resolveExitPromise();
			}
			await this._exitPromise;
		}

		_resume() {
			if (this.exited) {
				throw new Error("Go program has already exited");
			}
			this._inst.exports.resume();
			if (this.exited) {
				this._resolveExitPromise();
			}
		}

		_makeFuncWrapper(id) {
			const go = this;
			return function () {
				const event = { id: id, this: this, args: arguments };
				go._pendingEvent = event;
				go._resume();
				return event.result;
			};
		}
	}
})();
document.addEventListener('DOMContentLoaded', () => {
    let activeIframe = null;
    let isResizing = false;
    let isMoving = false;
    let startX, startY, startWidth, startHeight, startLeft, startTop;
    const border = 8;
    
    // Setup iframe controls for all existing and future iframes
    function setupIframeControls() {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        if (!iframe.hasAttribute('data-control-setup')) {
          iframe.style.pointerEvents = 'none';
          iframe.setAttribute('data-control-setup', 'true');
        }
      });
    }
    
    // Initial setup
    setupIframeControls();
    
    // Watch for new iframes being added
    const observer = new MutationObserver(mutations => {
      let needsSetup = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.tagName === 'IFRAME' || node.querySelectorAll) {
              needsSetup = true;
            }
          });
        }
      });
      
      if (needsSetup) {
        setupIframeControls();
      }
    });
    
    // Start observing with configuration
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    document.addEventListener('mousedown', (e) => {
      // Check if click is on any iframe
      document.querySelectorAll('iframe').forEach(iframe => {
        const rect = iframe.getBoundingClientRect();
        
        // Check if click is within iframe boundaries
        if (e.clientX >= rect.left && e.clientX <= rect.right && 
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
          
          // Prevent event from reaching background elements
          e.preventDefault();
          e.stopPropagation();
          
          // Calculate position relative to iframe
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Check if click is in border or corner
          const isInLeftBorder = x < border;
          const isInRightBorder = x > rect.width - border;
          const isInTopBorder = y < border;
          const isInBottomBorder = y > rect.height - border;
          
          if ((isInLeftBorder || isInRightBorder) && (isInTopBorder || isInBottomBorder)) {
            // Corner click - resize
            isResizing = true;
            activeIframe = iframe;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = rect.width;
            startHeight = rect.height;
          } else if (isInLeftBorder || isInRightBorder || isInTopBorder || isInBottomBorder) {
            // Border click - move
            isMoving = true;
            activeIframe = iframe;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = rect.left;
            startTop = rect.top;
          }
        }
      });
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isResizing && activeIframe || isMoving && activeIframe) {
        // Prevent event from reaching background elements
        e.preventDefault();
        e.stopPropagation();
        
        if (isResizing) {
          // Resize
          const width = startWidth + (e.clientX - startX);
          const height = startHeight + (e.clientY - startY);
          activeIframe.style.width = `${width}px`;
          activeIframe.style.height = `${height}px`;
        } else if (isMoving) {
          // Move
          const left = startLeft + (e.clientX - startX);
          const top = startTop + (e.clientY - startY);
          activeIframe.style.left = `${left}px`;
          activeIframe.style.top = `${top}px`;
        }
      }
    });
    
    document.addEventListener('mouseup', (e) => {
      if (isResizing || isMoving) {
        // Prevent event from reaching background elements
        e.preventDefault();
        e.stopPropagation();
      }
      isResizing = false;
      isMoving = false;
      activeIframe = null;
    });
  });
(() => {
  // duplex.min.js
  var hr = Object.defineProperty;
  var yr = (t2, e) => {
    for (var r in e) hr(t2, r, { get: e[r], enumerable: true });
  };
  var it;
  try {
    it = new TextDecoder();
  } catch {
  }
  var p;
  var ee;
  var f = 0;
  var $t = [];
  var pr = 105;
  var mr = 57342;
  var xr = 57343;
  var Nt = 57337;
  var Ht = 6;
  var ae = {};
  var ot = $t;
  var at = 0;
  var U = {};
  var O;
  var Pe;
  var ke = 0;
  var ge = 0;
  var R;
  var H;
  var M = [];
  var ct = [];
  var T;
  var V;
  var we;
  var jt = { useRecords: false, mapsAsObjects: true };
  var be = false;
  var te = class t {
    constructor(e) {
      if (e && ((e.keyMap || e._keyMap) && !e.useRecords && (e.useRecords = false, e.mapsAsObjects = true), e.useRecords === false && e.mapsAsObjects === void 0 && (e.mapsAsObjects = true), e.getStructures && (e.getShared = e.getStructures), e.getShared && !e.structures && ((e.structures = []).uninitialized = true), e.keyMap)) {
        this.mapKey = /* @__PURE__ */ new Map();
        for (let [r, n] of Object.entries(e.keyMap)) this.mapKey.set(n, r);
      }
      Object.assign(this, e);
    }
    decodeKey(e) {
      return this.keyMap && this.mapKey.get(e) || e;
    }
    encodeKey(e) {
      return this.keyMap && this.keyMap.hasOwnProperty(e) ? this.keyMap[e] : e;
    }
    encodeKeys(e) {
      if (!this._keyMap) return e;
      let r = /* @__PURE__ */ new Map();
      for (let [n, s] of Object.entries(e)) r.set(this._keyMap.hasOwnProperty(n) ? this._keyMap[n] : n, s);
      return r;
    }
    decodeKeys(e) {
      if (!this._keyMap || e.constructor.name != "Map") return e;
      if (!this._mapKey) {
        this._mapKey = /* @__PURE__ */ new Map();
        for (let [n, s] of Object.entries(this._keyMap)) this._mapKey.set(s, n);
      }
      let r = {};
      return e.forEach((n, s) => r[v(this._mapKey.has(s) ? this._mapKey.get(s) : s)] = n), r;
    }
    mapDecode(e, r) {
      let n = this.decode(e);
      if (this._keyMap) switch (n.constructor.name) {
        case "Array":
          return n.map((s) => this.decodeKeys(s));
      }
      return n;
    }
    decode(e, r) {
      if (p) return Xt(() => (Oe(), this ? this.decode(e, r) : t.prototype.decode.call(jt, e, r)));
      ee = r > -1 ? r : e.length, f = 0, at = 0, ge = 0, Pe = null, ot = $t, R = null, p = e;
      try {
        V = e.dataView || (e.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength));
      } catch (n) {
        throw p = null, e instanceof Uint8Array ? n : new Error("Source must be a Uint8Array or Buffer but was a " + (e && typeof e == "object" ? e.constructor.name : typeof e));
      }
      if (this instanceof t) {
        if (U = this, T = this.sharedValues && (this.pack ? new Array(this.maxPrivatePackedValues || 16).concat(this.sharedValues) : this.sharedValues), this.structures) return O = this.structures, Se();
        (!O || O.length > 0) && (O = []);
      } else U = jt, (!O || O.length > 0) && (O = []), T = null;
      return Se();
    }
    decodeMultiple(e, r) {
      let n, s = 0;
      try {
        let o = e.length;
        be = true;
        let l = this ? this.decode(e, o) : ht.decode(e, o);
        if (r) {
          if (r(l) === false) return;
          for (; f < o; ) if (s = f, r(Se()) === false) return;
        } else {
          for (n = [l]; f < o; ) s = f, n.push(Se());
          return n;
        }
      } catch (o) {
        throw o.lastPosition = s, o.values = n, o;
      } finally {
        be = false, Oe();
      }
    }
  };
  function Se() {
    try {
      let t2 = D();
      if (R) {
        if (f >= R.postBundlePosition) {
          let e = new Error("Unexpected bundle position");
          throw e.incomplete = true, e;
        }
        f = R.postBundlePosition, R = null;
      }
      if (f == ee) O = null, p = null, H && (H = null);
      else if (f > ee) {
        let e = new Error("Unexpected end of CBOR data");
        throw e.incomplete = true, e;
      } else if (!be) throw new Error("Data read, but end of buffer not reached");
      return t2;
    } catch (t2) {
      throw Oe(), (t2 instanceof RangeError || t2.message.startsWith("Unexpected end of buffer")) && (t2.incomplete = true), t2;
    }
  }
  function D() {
    let t2 = p[f++], e = t2 >> 5;
    if (t2 = t2 & 31, t2 > 23) switch (t2) {
      case 24:
        t2 = p[f++];
        break;
      case 25:
        if (e == 7) return Ir();
        t2 = V.getUint16(f), f += 2;
        break;
      case 26:
        if (e == 7) {
          let r = V.getFloat32(f);
          if (U.useFloat32 > 2) {
            let n = Me[(p[f] & 127) << 1 | p[f + 1] >> 7];
            return f += 4, (n * r + (r > 0 ? 0.5 : -0.5) >> 0) / n;
          }
          return f += 4, r;
        }
        t2 = V.getUint32(f), f += 4;
        break;
      case 27:
        if (e == 7) {
          let r = V.getFloat64(f);
          return f += 8, r;
        }
        if (e > 1) {
          if (V.getUint32(f) > 0) throw new Error("JavaScript does not support arrays, maps, or strings with length over 4294967295");
          t2 = V.getUint32(f + 4);
        } else U.int64AsNumber ? (t2 = V.getUint32(f) * 4294967296, t2 += V.getUint32(f + 4)) : t2 = V.getBigUint64(f);
        f += 8;
        break;
      case 31:
        switch (e) {
          case 2:
          case 3:
            throw new Error("Indefinite length not supported for byte or text strings");
          case 4:
            let r = [], n, s = 0;
            for (; (n = D()) != ae; ) r[s++] = n;
            return e == 4 ? r : e == 3 ? r.join("") : Buffer.concat(r);
          case 5:
            let o;
            if (U.mapsAsObjects) {
              let l = {};
              if (U.keyMap) for (; (o = D()) != ae; ) l[v(U.decodeKey(o))] = D();
              else for (; (o = D()) != ae; ) l[v(o)] = D();
              return l;
            } else {
              we && (U.mapsAsObjects = true, we = false);
              let l = /* @__PURE__ */ new Map();
              if (U.keyMap) for (; (o = D()) != ae; ) l.set(U.decodeKey(o), D());
              else for (; (o = D()) != ae; ) l.set(o, D());
              return l;
            }
          case 7:
            return ae;
          default:
            throw new Error("Invalid major type for indefinite length " + e);
        }
      default:
        throw new Error("Unknown token " + t2);
    }
    switch (e) {
      case 0:
        return t2;
      case 1:
        return ~t2;
      case 2:
        return br(t2);
      case 3:
        if (ge >= f) return Pe.slice(f - ke, (f += t2) - ke);
        if (ge == 0 && ee < 140 && t2 < 32) {
          let s = t2 < 16 ? Gt(t2) : gr(t2);
          if (s != null) return s;
        }
        return wr(t2);
      case 4:
        let r = new Array(t2);
        for (let s = 0; s < t2; s++) r[s] = D();
        return r;
      case 5:
        if (U.mapsAsObjects) {
          let s = {};
          if (U.keyMap) for (let o = 0; o < t2; o++) s[v(U.decodeKey(D()))] = D();
          else for (let o = 0; o < t2; o++) s[v(D())] = D();
          return s;
        } else {
          we && (U.mapsAsObjects = true, we = false);
          let s = /* @__PURE__ */ new Map();
          if (U.keyMap) for (let o = 0; o < t2; o++) s.set(U.decodeKey(D()), D());
          else for (let o = 0; o < t2; o++) s.set(D(), D());
          return s;
        }
      case 6:
        if (t2 >= Nt) {
          let s = O[t2 & 8191];
          if (s) return s.read || (s.read = lt(s)), s.read();
          if (t2 < 65536) {
            if (t2 == xr) {
              let o = le(), l = D(), m = D();
              dt(l, m);
              let g = {};
              if (U.keyMap) for (let x = 2; x < o; x++) {
                let k = U.decodeKey(m[x - 2]);
                g[v(k)] = D();
              }
              else for (let x = 2; x < o; x++) {
                let k = m[x - 2];
                g[v(k)] = D();
              }
              return g;
            } else if (t2 == mr) {
              let o = le(), l = D();
              for (let m = 2; m < o; m++) dt(l++, D());
              return D();
            } else if (t2 == Nt) return Cr();
            if (U.getShared && (ut(), s = O[t2 & 8191], s)) return s.read || (s.read = lt(s)), s.read();
          }
        }
        let n = M[t2];
        if (n) return n.handlesRead ? n(D) : n(D());
        {
          let s = D();
          for (let o = 0; o < ct.length; o++) {
            let l = ct[o](t2, s);
            if (l !== void 0) return l;
          }
          return new j(s, t2);
        }
      case 7:
        switch (t2) {
          case 20:
            return false;
          case 21:
            return true;
          case 22:
            return null;
          case 23:
            return;
          case 31:
          default:
            let s = (T || Q())[t2];
            if (s !== void 0) return s;
            throw new Error("Unknown token " + t2);
        }
      default:
        if (isNaN(t2)) {
          let s = new Error("Unexpected end of CBOR data");
          throw s.incomplete = true, s;
        }
        throw new Error("Unknown CBOR token " + t2);
    }
  }
  var Kt = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
  function lt(t2) {
    function e() {
      let r = p[f++];
      if (r = r & 31, r > 23) switch (r) {
        case 24:
          r = p[f++];
          break;
        case 25:
          r = V.getUint16(f), f += 2;
          break;
        case 26:
          r = V.getUint32(f), f += 4;
          break;
        default:
          throw new Error("Expected array header, but got " + p[f - 1]);
      }
      let n = this.compiledReader;
      for (; n; ) {
        if (n.propertyCount === r) return n(D);
        n = n.next;
      }
      if (this.slowReads++ >= 3) {
        let o = this.length == r ? this : this.slice(0, r);
        return n = U.keyMap ? new Function("r", "return {" + o.map((l) => U.decodeKey(l)).map((l) => Kt.test(l) ? v(l) + ":r()" : "[" + JSON.stringify(l) + "]:r()").join(",") + "}") : new Function("r", "return {" + o.map((l) => Kt.test(l) ? v(l) + ":r()" : "[" + JSON.stringify(l) + "]:r()").join(",") + "}"), this.compiledReader && (n.next = this.compiledReader), n.propertyCount = r, this.compiledReader = n, n(D);
      }
      let s = {};
      if (U.keyMap) for (let o = 0; o < r; o++) s[v(U.decodeKey(this[o]))] = D();
      else for (let o = 0; o < r; o++) s[v(this[o])] = D();
      return s;
    }
    return t2.slowReads = 0, e;
  }
  function v(t2) {
    return t2 === "__proto__" ? "__proto_" : t2;
  }
  var wr = ft;
  function ft(t2) {
    let e;
    if (t2 < 16 && (e = Gt(t2))) return e;
    if (t2 > 64 && it) return it.decode(p.subarray(f, f += t2));
    let r = f + t2, n = [];
    for (e = ""; f < r; ) {
      let s = p[f++];
      if (!(s & 128)) n.push(s);
      else if ((s & 224) === 192) {
        let o = p[f++] & 63;
        n.push((s & 31) << 6 | o);
      } else if ((s & 240) === 224) {
        let o = p[f++] & 63, l = p[f++] & 63;
        n.push((s & 31) << 12 | o << 6 | l);
      } else if ((s & 248) === 240) {
        let o = p[f++] & 63, l = p[f++] & 63, m = p[f++] & 63, g = (s & 7) << 18 | o << 12 | l << 6 | m;
        g > 65535 && (g -= 65536, n.push(g >>> 10 & 1023 | 55296), g = 56320 | g & 1023), n.push(g);
      } else n.push(s);
      n.length >= 4096 && (e += B.apply(String, n), n.length = 0);
    }
    return n.length > 0 && (e += B.apply(String, n)), e;
  }
  var B = String.fromCharCode;
  function gr(t2) {
    let e = f, r = new Array(t2);
    for (let n = 0; n < t2; n++) {
      let s = p[f++];
      if ((s & 128) > 0) {
        f = e;
        return;
      }
      r[n] = s;
    }
    return B.apply(String, r);
  }
  function Gt(t2) {
    if (t2 < 4) if (t2 < 2) {
      if (t2 === 0) return "";
      {
        let e = p[f++];
        if ((e & 128) > 1) {
          f -= 1;
          return;
        }
        return B(e);
      }
    } else {
      let e = p[f++], r = p[f++];
      if ((e & 128) > 0 || (r & 128) > 0) {
        f -= 2;
        return;
      }
      if (t2 < 3) return B(e, r);
      let n = p[f++];
      if ((n & 128) > 0) {
        f -= 3;
        return;
      }
      return B(e, r, n);
    }
    else {
      let e = p[f++], r = p[f++], n = p[f++], s = p[f++];
      if ((e & 128) > 0 || (r & 128) > 0 || (n & 128) > 0 || (s & 128) > 0) {
        f -= 4;
        return;
      }
      if (t2 < 6) {
        if (t2 === 4) return B(e, r, n, s);
        {
          let o = p[f++];
          if ((o & 128) > 0) {
            f -= 5;
            return;
          }
          return B(e, r, n, s, o);
        }
      } else if (t2 < 8) {
        let o = p[f++], l = p[f++];
        if ((o & 128) > 0 || (l & 128) > 0) {
          f -= 6;
          return;
        }
        if (t2 < 7) return B(e, r, n, s, o, l);
        let m = p[f++];
        if ((m & 128) > 0) {
          f -= 7;
          return;
        }
        return B(e, r, n, s, o, l, m);
      } else {
        let o = p[f++], l = p[f++], m = p[f++], g = p[f++];
        if ((o & 128) > 0 || (l & 128) > 0 || (m & 128) > 0 || (g & 128) > 0) {
          f -= 8;
          return;
        }
        if (t2 < 10) {
          if (t2 === 8) return B(e, r, n, s, o, l, m, g);
          {
            let x = p[f++];
            if ((x & 128) > 0) {
              f -= 9;
              return;
            }
            return B(e, r, n, s, o, l, m, g, x);
          }
        } else if (t2 < 12) {
          let x = p[f++], k = p[f++];
          if ((x & 128) > 0 || (k & 128) > 0) {
            f -= 10;
            return;
          }
          if (t2 < 11) return B(e, r, n, s, o, l, m, g, x, k);
          let S = p[f++];
          if ((S & 128) > 0) {
            f -= 11;
            return;
          }
          return B(e, r, n, s, o, l, m, g, x, k, S);
        } else {
          let x = p[f++], k = p[f++], S = p[f++], F = p[f++];
          if ((x & 128) > 0 || (k & 128) > 0 || (S & 128) > 0 || (F & 128) > 0) {
            f -= 12;
            return;
          }
          if (t2 < 14) {
            if (t2 === 12) return B(e, r, n, s, o, l, m, g, x, k, S, F);
            {
              let W = p[f++];
              if ((W & 128) > 0) {
                f -= 13;
                return;
              }
              return B(e, r, n, s, o, l, m, g, x, k, S, F, W);
            }
          } else {
            let W = p[f++], z = p[f++];
            if ((W & 128) > 0 || (z & 128) > 0) {
              f -= 14;
              return;
            }
            if (t2 < 15) return B(e, r, n, s, o, l, m, g, x, k, S, F, W, z);
            let $ = p[f++];
            if (($ & 128) > 0) {
              f -= 15;
              return;
            }
            return B(e, r, n, s, o, l, m, g, x, k, S, F, W, z, $);
          }
        }
      }
    }
  }
  function br(t2) {
    return U.copyBuffers ? Uint8Array.prototype.slice.call(p, f, f += t2) : p.subarray(f, f += t2);
  }
  var Yt = new Float32Array(1);
  var Ce = new Uint8Array(Yt.buffer, 0, 4);
  function Ir() {
    let t2 = p[f++], e = p[f++], r = (t2 & 127) >> 2;
    if (r === 31) return e || t2 & 3 ? NaN : t2 & 128 ? -1 / 0 : 1 / 0;
    if (r === 0) {
      let n = ((t2 & 3) << 8 | e) / 16777216;
      return t2 & 128 ? -n : n;
    }
    return Ce[3] = t2 & 128 | (r >> 1) + 56, Ce[2] = (t2 & 7) << 5 | e >> 3, Ce[1] = e << 5, Ce[0] = 0, Yt[0];
  }
  var en = new Array(4096);
  var j = class {
    constructor(e, r) {
      this.value = e, this.tag = r;
    }
  };
  M[0] = (t2) => new Date(t2);
  M[1] = (t2) => new Date(Math.round(t2 * 1e3));
  M[2] = (t2) => {
    let e = BigInt(0);
    for (let r = 0, n = t2.byteLength; r < n; r++) e = BigInt(t2[r]) + e << BigInt(8);
    return e;
  };
  M[3] = (t2) => BigInt(-1) - M[2](t2);
  M[4] = (t2) => +(t2[1] + "e" + t2[0]);
  M[5] = (t2) => t2[1] * Math.exp(t2[0] * Math.log(2));
  var dt = (t2, e) => {
    t2 = t2 - 57344;
    let r = O[t2];
    r && r.isShared && ((O.restoreStructures || (O.restoreStructures = []))[t2] = r), O[t2] = e, e.read = lt(e);
  };
  M[pr] = (t2) => {
    let e = t2.length, r = t2[1];
    dt(t2[0], r);
    let n = {};
    for (let s = 2; s < e; s++) {
      let o = r[s - 2];
      n[v(o)] = t2[s];
    }
    return n;
  };
  M[14] = (t2) => R ? R[0].slice(R.position0, R.position0 += t2) : new j(t2, 14);
  M[15] = (t2) => R ? R[1].slice(R.position1, R.position1 += t2) : new j(t2, 15);
  var Ar = { Error, RegExp };
  M[27] = (t2) => (Ar[t2[0]] || Error)(t2[1], t2[2]);
  var Jt = (t2) => {
    if (p[f++] != 132) throw new Error("Packed values structure must be followed by a 4 element array");
    let e = t2();
    return T = T ? e.concat(T.slice(e.length)) : e, T.prefixes = t2(), T.suffixes = t2(), t2();
  };
  Jt.handlesRead = true;
  M[51] = Jt;
  M[Ht] = (t2) => {
    if (!T) if (U.getShared) ut();
    else return new j(t2, Ht);
    if (typeof t2 == "number") return T[16 + (t2 >= 0 ? 2 * t2 : -2 * t2 - 1)];
    throw new Error("No support for non-integer packed references yet");
  };
  M[28] = (t2) => {
    H || (H = /* @__PURE__ */ new Map(), H.id = 0);
    let e = H.id++, r = p[f], n;
    r >> 5 == 4 ? n = [] : n = {};
    let s = { target: n };
    H.set(e, s);
    let o = t2();
    return s.used ? Object.assign(n, o) : (s.target = o, o);
  };
  M[28].handlesRead = true;
  M[29] = (t2) => {
    let e = H.get(t2);
    return e.used = true, e.target;
  };
  M[258] = (t2) => new Set(t2);
  (M[259] = (t2) => (U.mapsAsObjects && (U.mapsAsObjects = false, we = true), t2())).handlesRead = true;
  function ce(t2, e) {
    return typeof t2 == "string" ? t2 + e : t2 instanceof Array ? t2.concat(e) : Object.assign({}, t2, e);
  }
  function Q() {
    if (!T) if (U.getShared) ut();
    else throw new Error("No packed values available");
    return T;
  }
  var Dr = 1399353956;
  ct.push((t2, e) => {
    if (t2 >= 225 && t2 <= 255) return ce(Q().prefixes[t2 - 224], e);
    if (t2 >= 28704 && t2 <= 32767) return ce(Q().prefixes[t2 - 28672], e);
    if (t2 >= 1879052288 && t2 <= 2147483647) return ce(Q().prefixes[t2 - 1879048192], e);
    if (t2 >= 216 && t2 <= 223) return ce(e, Q().suffixes[t2 - 216]);
    if (t2 >= 27647 && t2 <= 28671) return ce(e, Q().suffixes[t2 - 27639]);
    if (t2 >= 1811940352 && t2 <= 1879048191) return ce(e, Q().suffixes[t2 - 1811939328]);
    if (t2 == Dr) return { packedValues: T, structures: O.slice(0), version: e };
    if (t2 == 55799) return e;
  });
  var Ur = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1;
  var qt = [Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array, typeof BigUint64Array > "u" ? { name: "BigUint64Array" } : BigUint64Array, Int8Array, Int16Array, Int32Array, typeof BigInt64Array > "u" ? { name: "BigInt64Array" } : BigInt64Array, Float32Array, Float64Array];
  var Er = [64, 68, 69, 70, 71, 72, 77, 78, 79, 85, 86];
  for (let t2 = 0; t2 < qt.length; t2++) Sr(qt[t2], Er[t2]);
  function Sr(t2, e) {
    let r = "get" + t2.name.slice(0, -5);
    typeof t2 != "function" && (t2 = null);
    let n = t2.BYTES_PER_ELEMENT;
    for (let s = 0; s < 2; s++) {
      if (!s && n == 1) continue;
      let o = n == 2 ? 1 : n == 4 ? 2 : 3;
      M[s ? e : e - 4] = n == 1 || s == Ur ? (l) => {
        if (!t2) throw new Error("Could not find typed array for code " + e);
        return new t2(Uint8Array.prototype.slice.call(l, 0).buffer);
      } : (l) => {
        if (!t2) throw new Error("Could not find typed array for code " + e);
        let m = new DataView(l.buffer, l.byteOffset, l.byteLength), g = l.length >> o, x = new t2(g), k = m[r];
        for (let S = 0; S < g; S++) x[S] = k.call(m, S << o, s);
        return x;
      };
    }
  }
  function Cr() {
    let t2 = le(), e = f + D();
    for (let n = 2; n < t2; n++) {
      let s = le();
      f += s;
    }
    let r = f;
    return f = e, R = [ft(le()), ft(le())], R.position0 = 0, R.position1 = 0, R.postBundlePosition = f, f = r, D();
  }
  function le() {
    let t2 = p[f++] & 31;
    if (t2 > 23) switch (t2) {
      case 24:
        t2 = p[f++];
        break;
      case 25:
        t2 = V.getUint16(f), f += 2;
        break;
      case 26:
        t2 = V.getUint32(f), f += 4;
        break;
    }
    return t2;
  }
  function ut() {
    if (U.getShared) {
      let t2 = Xt(() => (p = null, U.getShared())) || {}, e = t2.structures || [];
      U.sharedVersion = t2.version, T = U.sharedValues = t2.packedValues, O === true ? U.structures = O = e : O.splice.apply(O, [0, e.length].concat(e));
    }
  }
  function Xt(t2) {
    let e = ee, r = f, n = at, s = ke, o = ge, l = Pe, m = ot, g = H, x = R, k = new Uint8Array(p.slice(0, ee)), S = O, F = U, W = be, z = t2();
    return ee = e, f = r, at = n, ke = s, ge = o, Pe = l, ot = m, H = g, R = x, p = k, be = W, O = S, U = F, V = new DataView(p.buffer, p.byteOffset, p.byteLength), z;
  }
  function Oe() {
    p = null, H = null, O = null;
  }
  function Zt(t2) {
    M[t2.tag] = t2.decode;
  }
  var Me = new Array(147);
  for (let t2 = 0; t2 < 256; t2++) Me[t2] = +("1e" + Math.floor(45.15 - t2 * 0.30103));
  var ht = new te({ useRecords: false });
  var yt = ht.decode;
  var Pr = ht.decodeMultiple;
  var Re = { NEVER: 0, ALWAYS: 1, DECIMAL_ROUND: 3, DECIMAL_FIT: 4 };
  var _e;
  try {
    _e = new TextEncoder();
  } catch {
  }
  var Fe;
  var bt;
  var Ve = globalThis.Buffer;
  var Ae = typeof Ve < "u";
  var pt = Ae ? Ve.allocUnsafeSlow : Uint8Array;
  var Qt = Ae ? Ve : Uint8Array;
  var er = 256;
  var tr = Ae ? 4294967296 : 2144337920;
  var mt;
  var a;
  var P;
  var i = 0;
  var Y;
  var _ = null;
  var kr = 61440;
  var Or = /[\u0080-\uFFFF]/;
  var L = Symbol("record-id");
  var Ie = class extends te {
    constructor(e) {
      super(e), this.offset = 0;
      let r, n, s, o, l, m;
      e = e || {};
      let g = Qt.prototype.utf8Write ? function(c, y, d) {
        return a.utf8Write(c, y, d);
      } : _e && _e.encodeInto ? function(c, y) {
        return _e.encodeInto(c, a.subarray(y)).written;
      } : false, x = this, k = e.structures || e.saveStructures, S = e.maxSharedStructures;
      if (S == null && (S = k ? 128 : 0), S > 8190) throw new Error("Maximum maxSharedStructure is 8190");
      let F = e.sequential;
      F && (S = 0), this.structures || (this.structures = []), this.saveStructures && (this.saveShared = this.saveStructures);
      let W, z, $ = e.sharedValues, N;
      if ($) {
        N = /* @__PURE__ */ Object.create(null);
        for (let c = 0, y = $.length; c < y; c++) N[$[c]] = c;
      }
      let G = [], et = 0, Ee = 0;
      this.mapEncode = function(c, y) {
        if (this._keyMap && !this._mapped) switch (c.constructor.name) {
          case "Array":
            c = c.map((d) => this.encodeKeys(d));
            break;
        }
        return this.encode(c, y);
      }, this.encode = function(c, y) {
        if (a || (a = new pt(8192), P = new DataView(a.buffer, 0, 8192), i = 0), Y = a.length - 10, Y - i < 2048 ? (a = new pt(a.length), P = new DataView(a.buffer, 0, a.length), Y = a.length - 10, i = 0) : y === gt && (i = i + 7 & 2147483640), n = i, x.useSelfDescribedHeader && (P.setUint32(i, 3654940416), i += 3), m = x.structuredClone ? /* @__PURE__ */ new Map() : null, x.bundleStrings && typeof c != "string" ? (_ = [], _.size = 1 / 0) : _ = null, s = x.structures, s) {
          if (s.uninitialized) {
            let h = x.getShared() || {};
            x.structures = s = h.structures || [], x.sharedVersion = h.version;
            let u = x.sharedValues = h.packedValues;
            if (u) {
              N = {};
              for (let w = 0, b = u.length; w < b; w++) N[u[w]] = w;
            }
          }
          let d = s.length;
          if (d > S && !F && (d = S), !s.transitions) {
            s.transitions = /* @__PURE__ */ Object.create(null);
            for (let h = 0; h < d; h++) {
              let u = s[h];
              if (!u) continue;
              let w, b = s.transitions;
              for (let I = 0, A = u.length; I < A; I++) {
                b[L] === void 0 && (b[L] = h);
                let E = u[I];
                w = b[E], w || (w = b[E] = /* @__PURE__ */ Object.create(null)), b = w;
              }
              b[L] = h | 1048576;
            }
          }
          F || (s.nextId = d);
        }
        if (o && (o = false), l = s || [], z = N, e.pack) {
          let d = /* @__PURE__ */ new Map();
          if (d.values = [], d.encoder = x, d.maxValues = e.maxPrivatePackedValues || (N ? 16 : 1 / 0), d.objectMap = N || false, d.samplingPackedValues = W, Be(c, d), d.values.length > 0) {
            a[i++] = 216, a[i++] = 51, q(4);
            let h = d.values;
            C(h), q(0), q(0), z = Object.create(N || null);
            for (let u = 0, w = h.length; u < w; u++) z[h[u]] = u;
          }
        }
        mt = y & wt;
        try {
          if (mt) return;
          if (C(c), _ && sr(n, C), x.offset = i, m && m.idsToInsert) {
            i += m.idsToInsert.length * 2, i > Y && me(i), x.offset = i;
            let d = _r(a.subarray(n, i), m.idsToInsert);
            return m = null, d;
          }
          return y & gt ? (a.start = n, a.end = i, a) : a.subarray(n, i);
        } finally {
          if (s) {
            if (Ee < 10 && Ee++, s.length > S && (s.length = S), et > 1e4) s.transitions = null, Ee = 0, et = 0, G.length > 0 && (G = []);
            else if (G.length > 0 && !F) {
              for (let d = 0, h = G.length; d < h; d++) G[d][L] = void 0;
              G = [];
            }
          }
          if (o && x.saveShared) {
            x.structures.length > S && (x.structures = x.structures.slice(0, S));
            let d = a.subarray(n, i);
            return x.updateSharedData() === false ? x.encode(c) : d;
          }
          y & vr && (i = n);
        }
      }, this.findCommonStringsToPack = () => (W = /* @__PURE__ */ new Map(), N || (N = /* @__PURE__ */ Object.create(null)), (c) => {
        let y = c && c.threshold || 4, d = this.pack ? c.maxPrivatePackedValues || 16 : 0;
        $ || ($ = this.sharedValues = []);
        for (let [h, u] of W) u.count > y && (N[h] = d++, $.push(h), o = true);
        for (; this.saveShared && this.updateSharedData() === false; ) ;
        W = null;
      });
      let C = (c) => {
        i > Y && (a = me(i));
        var y = typeof c, d;
        if (y === "string") {
          if (z) {
            let b = z[c];
            if (b >= 0) {
              b < 16 ? a[i++] = b + 224 : (a[i++] = 198, b & 1 ? C(15 - b >> 1) : C(b - 16 >> 1));
              return;
            } else if (W && !e.pack) {
              let I = W.get(c);
              I ? I.count++ : W.set(c, { count: 1 });
            }
          }
          let h = c.length;
          if (_ && h >= 4 && h < 1024) {
            if ((_.size += h) > kr) {
              let I, A = (_[0] ? _[0].length * 3 + _[1].length : 0) + 10;
              i + A > Y && (a = me(i + A)), a[i++] = 217, a[i++] = 223, a[i++] = 249, a[i++] = _.position ? 132 : 130, a[i++] = 26, I = i - n, i += 4, _.position && sr(n, C), _ = ["", ""], _.size = 0, _.position = I;
            }
            let b = Or.test(c);
            _[b ? 0 : 1] += c, a[i++] = b ? 206 : 207, C(h);
            return;
          }
          let u;
          h < 32 ? u = 1 : h < 256 ? u = 2 : h < 65536 ? u = 3 : u = 5;
          let w = h * 3;
          if (i + w > Y && (a = me(i + w)), h < 64 || !g) {
            let b, I, A, E = i + u;
            for (b = 0; b < h; b++) I = c.charCodeAt(b), I < 128 ? a[E++] = I : I < 2048 ? (a[E++] = I >> 6 | 192, a[E++] = I & 63 | 128) : (I & 64512) === 55296 && ((A = c.charCodeAt(b + 1)) & 64512) === 56320 ? (I = 65536 + ((I & 1023) << 10) + (A & 1023), b++, a[E++] = I >> 18 | 240, a[E++] = I >> 12 & 63 | 128, a[E++] = I >> 6 & 63 | 128, a[E++] = I & 63 | 128) : (a[E++] = I >> 12 | 224, a[E++] = I >> 6 & 63 | 128, a[E++] = I & 63 | 128);
            d = E - i - u;
          } else d = g(c, i + u, w);
          d < 24 ? a[i++] = 96 | d : d < 256 ? (u < 2 && a.copyWithin(i + 2, i + 1, i + 1 + d), a[i++] = 120, a[i++] = d) : d < 65536 ? (u < 3 && a.copyWithin(i + 3, i + 2, i + 2 + d), a[i++] = 121, a[i++] = d >> 8, a[i++] = d & 255) : (u < 5 && a.copyWithin(i + 5, i + 3, i + 3 + d), a[i++] = 122, P.setUint32(i, d), i += 4), i += d;
        } else if (y === "number") if (!this.alwaysUseFloat && c >>> 0 === c) c < 24 ? a[i++] = c : c < 256 ? (a[i++] = 24, a[i++] = c) : c < 65536 ? (a[i++] = 25, a[i++] = c >> 8, a[i++] = c & 255) : (a[i++] = 26, P.setUint32(i, c), i += 4);
        else if (!this.alwaysUseFloat && c >> 0 === c) c >= -24 ? a[i++] = 31 - c : c >= -256 ? (a[i++] = 56, a[i++] = ~c) : c >= -65536 ? (a[i++] = 57, P.setUint16(i, ~c), i += 2) : (a[i++] = 58, P.setUint32(i, ~c), i += 4);
        else {
          let h;
          if ((h = this.useFloat32) > 0 && c < 4294967296 && c >= -2147483648) {
            a[i++] = 250, P.setFloat32(i, c);
            let u;
            if (h < 4 || (u = c * Me[(a[i] & 127) << 1 | a[i + 1] >> 7]) >> 0 === u) {
              i += 4;
              return;
            } else i--;
          }
          a[i++] = 251, P.setFloat64(i, c), i += 8;
        }
        else if (y === "object") if (!c) a[i++] = 246;
        else {
          if (m) {
            let u = m.get(c);
            if (u) {
              if (a[i++] = 216, a[i++] = 29, a[i++] = 25, !u.references) {
                let w = m.idsToInsert || (m.idsToInsert = []);
                u.references = [], w.push(u);
              }
              u.references.push(i - n), i += 2;
              return;
            } else m.set(c, { offset: i - n });
          }
          let h = c.constructor;
          if (h === Object) tt(c, true);
          else if (h === Array) {
            d = c.length, d < 24 ? a[i++] = 128 | d : q(d);
            for (let u = 0; u < d; u++) C(c[u]);
          } else if (h === Map) if ((this.mapsAsObjects ? this.useTag259ForMaps !== false : this.useTag259ForMaps) && (a[i++] = 217, a[i++] = 1, a[i++] = 3), d = c.size, d < 24 ? a[i++] = 160 | d : d < 256 ? (a[i++] = 184, a[i++] = d) : d < 65536 ? (a[i++] = 185, a[i++] = d >> 8, a[i++] = d & 255) : (a[i++] = 186, P.setUint32(i, d), i += 4), x.keyMap) for (let [u, w] of c) C(x.encodeKey(u)), C(w);
          else for (let [u, w] of c) C(u), C(w);
          else {
            for (let u = 0, w = Fe.length; u < w; u++) {
              let b = bt[u];
              if (c instanceof b) {
                let I = Fe[u], A = I.tag;
                A == null && (A = I.getTag && I.getTag.call(this, c)), A < 24 ? a[i++] = 192 | A : A < 256 ? (a[i++] = 216, a[i++] = A) : A < 65536 ? (a[i++] = 217, a[i++] = A >> 8, a[i++] = A & 255) : A > -1 && (a[i++] = 218, P.setUint32(i, A), i += 4), I.encode.call(this, c, C, me);
                return;
              }
            }
            if (c[Symbol.iterator]) {
              if (mt) {
                let u = new Error("Iterable should be serialized as iterator");
                throw u.iteratorNotHandled = true, u;
              }
              a[i++] = 159;
              for (let u of c) C(u);
              a[i++] = 255;
              return;
            }
            if (c[Symbol.asyncIterator] || xt(c)) {
              let u = new Error("Iterable/blob should be serialized as iterator");
              throw u.iteratorNotHandled = true, u;
            }
            tt(c, !c.hasOwnProperty);
          }
        }
        else if (y === "boolean") a[i++] = c ? 245 : 244;
        else if (y === "bigint") {
          if (c < BigInt(1) << BigInt(64) && c >= 0) a[i++] = 27, P.setBigUint64(i, c);
          else if (c > -(BigInt(1) << BigInt(64)) && c < 0) a[i++] = 59, P.setBigUint64(i, -c - BigInt(1));
          else if (this.largeBigIntToFloat) a[i++] = 251, P.setFloat64(i, Number(c));
          else throw new RangeError(c + " was too large to fit in CBOR 64-bit integer format, set largeBigIntToFloat to convert to float-64");
          i += 8;
        } else if (y === "undefined") a[i++] = 247;
        else throw new Error("Unknown type: " + y);
      }, tt = this.useRecords === false ? this.variableMapSize ? (c) => {
        let y = Object.keys(c), d = Object.values(c), h = y.length;
        h < 24 ? a[i++] = 160 | h : h < 256 ? (a[i++] = 184, a[i++] = h) : h < 65536 ? (a[i++] = 185, a[i++] = h >> 8, a[i++] = h & 255) : (a[i++] = 186, P.setUint32(i, h), i += 4);
        let u;
        if (x.keyMap) for (let w = 0; w < h; w++) C(encodeKey(y[w])), C(d[w]);
        else for (let w = 0; w < h; w++) C(y[w]), C(d[w]);
      } : (c, y) => {
        a[i++] = 185;
        let d = i - n;
        i += 2;
        let h = 0;
        if (x.keyMap) for (let u in c) (y || c.hasOwnProperty(u)) && (C(x.encodeKey(u)), C(c[u]), h++);
        else for (let u in c) (y || c.hasOwnProperty(u)) && (C(u), C(c[u]), h++);
        a[d++ + n] = h >> 8, a[d + n] = h & 255;
      } : (c, y) => {
        let d, h = l.transitions || (l.transitions = /* @__PURE__ */ Object.create(null)), u = 0, w = 0, b, I;
        if (this.keyMap) {
          I = Object.keys(c).map((E) => this.encodeKey(E)), w = I.length;
          for (let E = 0; E < w; E++) {
            let vt = I[E];
            d = h[vt], d || (d = h[vt] = /* @__PURE__ */ Object.create(null), u++), h = d;
          }
        } else for (let E in c) (y || c.hasOwnProperty(E)) && (d = h[E], d || (h[L] & 1048576 && (b = h[L] & 65535), d = h[E] = /* @__PURE__ */ Object.create(null), u++), h = d, w++);
        let A = h[L];
        if (A !== void 0) A &= 65535, a[i++] = 217, a[i++] = A >> 8 | 224, a[i++] = A & 255;
        else if (I || (I = h.__keys__ || (h.__keys__ = Object.keys(c))), b === void 0 ? (A = l.nextId++, A || (A = 0, l.nextId = 1), A >= er && (l.nextId = (A = S) + 1)) : A = b, l[A] = I, A < S) {
          a[i++] = 217, a[i++] = A >> 8 | 224, a[i++] = A & 255, h = l.transitions;
          for (let E = 0; E < w; E++) (h[L] === void 0 || h[L] & 1048576) && (h[L] = A), h = h[I[E]];
          h[L] = A | 1048576, o = true;
        } else {
          if (h[L] = A, P.setUint32(i, 3655335680), i += 3, u && (et += Ee * u), G.length >= er - S && (G.shift()[L] = void 0), G.push(h), q(w + 2), C(57344 + A), C(I), y === null) return;
          for (let E in c) (y || c.hasOwnProperty(E)) && C(c[E]);
          return;
        }
        if (w < 24 ? a[i++] = 128 | w : q(w), y !== null) for (let E in c) (y || c.hasOwnProperty(E)) && C(c[E]);
      }, me = (c) => {
        let y;
        if (c > 16777216) {
          if (c - n > tr) throw new Error("Encoded buffer would be larger than maximum buffer size");
          y = Math.min(tr, Math.round(Math.max((c - n) * (c > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096);
        } else y = (Math.max(c - n << 2, a.length - 1) >> 12) + 1 << 12;
        let d = new pt(y);
        return P = new DataView(d.buffer, 0, y), a.copy ? a.copy(d, 0, n, c) : d.set(a.slice(n, c)), i -= n, n = 0, Y = d.length - 10, a = d;
      }, Z = 100, Vt = 1e3;
      this.encodeAsIterable = function(c, y) {
        return Tt(c, y, oe);
      }, this.encodeAsAsyncIterable = function(c, y) {
        return Tt(c, y, Lt);
      };
      function* oe(c, y, d) {
        let h = c.constructor;
        if (h === Object) {
          let u = x.useRecords !== false;
          u ? tt(c, null) : rr(Object.keys(c).length, 160);
          for (let w in c) {
            let b = c[w];
            u || C(w), b && typeof b == "object" ? y[w] ? yield* oe(b, y[w]) : yield* rt(b, y, w) : C(b);
          }
        } else if (h === Array) {
          let u = c.length;
          q(u);
          for (let w = 0; w < u; w++) {
            let b = c[w];
            b && (typeof b == "object" || i - n > Z) ? y.element ? yield* oe(b, y.element) : yield* rt(b, y, "element") : C(b);
          }
        } else if (c[Symbol.iterator]) {
          a[i++] = 159;
          for (let u of c) u && (typeof u == "object" || i - n > Z) ? y.element ? yield* oe(u, y.element) : yield* rt(u, y, "element") : C(u);
          a[i++] = 255;
        } else xt(c) ? (rr(c.size, 64), yield a.subarray(n, i), yield c, xe()) : c[Symbol.asyncIterator] ? (a[i++] = 159, yield a.subarray(n, i), yield c, xe(), a[i++] = 255) : C(c);
        d && i > n ? yield a.subarray(n, i) : i - n > Z && (yield a.subarray(n, i), xe());
      }
      function* rt(c, y, d) {
        let h = i - n;
        try {
          C(c), i - n > Z && (yield a.subarray(n, i), xe());
        } catch (u) {
          if (u.iteratorNotHandled) y[d] = {}, i = n + h, yield* oe.call(this, c, y[d]);
          else throw u;
        }
      }
      function xe() {
        Z = Vt, x.encode(null, wt);
      }
      function Tt(c, y, d) {
        return y && y.chunkThreshold ? Z = Vt = y.chunkThreshold : Z = 100, c && typeof c == "object" ? (x.encode(null, wt), d(c, x.iterateProperties || (x.iterateProperties = {}), true)) : [x.encode(c)];
      }
      async function* Lt(c, y) {
        for (let d of oe(c, y, true)) {
          let h = d.constructor;
          if (h === Qt || h === Uint8Array) yield d;
          else if (xt(d)) {
            let u = d.stream().getReader(), w;
            for (; !(w = await u.read()).done; ) yield w.value;
          } else if (d[Symbol.asyncIterator]) for await (let u of d) xe(), u ? yield* Lt(u, y.async || (y.async = {})) : yield x.encode(u);
          else yield d;
        }
      }
    }
    useBuffer(e) {
      a = e, P = new DataView(a.buffer, a.byteOffset, a.byteLength), i = 0;
    }
    clearSharedData() {
      this.structures && (this.structures = []), this.sharedValues && (this.sharedValues = void 0);
    }
    updateSharedData() {
      let e = this.sharedVersion || 0;
      this.sharedVersion = e + 1;
      let r = this.structures.slice(0), n = new We(r, this.sharedValues, this.sharedVersion), s = this.saveShared(n, (o) => (o && o.version || 0) == e);
      return s === false ? (n = this.getShared() || {}, this.structures = n.structures || [], this.sharedValues = n.packedValues, this.sharedVersion = n.version, this.structures.nextId = this.structures.length) : r.forEach((o, l) => this.structures[l] = o), s;
    }
  };
  function rr(t2, e) {
    t2 < 24 ? a[i++] = e | t2 : t2 < 256 ? (a[i++] = e | 24, a[i++] = t2) : t2 < 65536 ? (a[i++] = e | 25, a[i++] = t2 >> 8, a[i++] = t2 & 255) : (a[i++] = e | 26, P.setUint32(i, t2), i += 4);
  }
  var We = class {
    constructor(e, r, n) {
      this.structures = e, this.packedValues = r, this.version = n;
    }
  };
  function q(t2) {
    t2 < 24 ? a[i++] = 128 | t2 : t2 < 256 ? (a[i++] = 152, a[i++] = t2) : t2 < 65536 ? (a[i++] = 153, a[i++] = t2 >> 8, a[i++] = t2 & 255) : (a[i++] = 154, P.setUint32(i, t2), i += 4);
  }
  var Mr = typeof Blob > "u" ? function() {
  } : Blob;
  function xt(t2) {
    if (t2 instanceof Mr) return true;
    let e = t2[Symbol.toStringTag];
    return e === "Blob" || e === "File";
  }
  function Be(t2, e) {
    switch (typeof t2) {
      case "string":
        if (t2.length > 3) {
          if (e.objectMap[t2] > -1 || e.values.length >= e.maxValues) return;
          let n = e.get(t2);
          if (n) ++n.count == 2 && e.values.push(t2);
          else if (e.set(t2, { count: 1 }), e.samplingPackedValues) {
            let s = e.samplingPackedValues.get(t2);
            s ? s.count++ : e.samplingPackedValues.set(t2, { count: 1 });
          }
        }
        break;
      case "object":
        if (t2) if (t2 instanceof Array) for (let n = 0, s = t2.length; n < s; n++) Be(t2[n], e);
        else {
          let n = !e.encoder.useRecords;
          for (var r in t2) t2.hasOwnProperty(r) && (n && Be(r, e), Be(t2[r], e));
        }
        break;
      case "function":
        console.log(t2);
    }
  }
  var Rr = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1;
  bt = [Date, Set, Error, RegExp, j, ArrayBuffer, Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array, typeof BigUint64Array > "u" ? function() {
  } : BigUint64Array, Int8Array, Int16Array, Int32Array, typeof BigInt64Array > "u" ? function() {
  } : BigInt64Array, Float32Array, Float64Array, We];
  Fe = [{ tag: 1, encode(t2, e) {
    let r = t2.getTime() / 1e3;
    (this.useTimestamp32 || t2.getMilliseconds() === 0) && r >= 0 && r < 4294967296 ? (a[i++] = 26, P.setUint32(i, r), i += 4) : (a[i++] = 251, P.setFloat64(i, r), i += 8);
  } }, { tag: 258, encode(t2, e) {
    let r = Array.from(t2);
    e(r);
  } }, { tag: 27, encode(t2, e) {
    e([t2.name, t2.message]);
  } }, { tag: 27, encode(t2, e) {
    e(["RegExp", t2.source, t2.flags]);
  } }, { getTag(t2) {
    return t2.tag;
  }, encode(t2, e) {
    e(t2.value);
  } }, { encode(t2, e, r) {
    nr(t2, r);
  } }, { getTag(t2) {
    if (t2.constructor === Uint8Array && (this.tagUint8Array || Ae && this.tagUint8Array !== false)) return 64;
  }, encode(t2, e, r) {
    nr(t2, r);
  } }, K(68, 1), K(69, 2), K(70, 4), K(71, 8), K(72, 1), K(77, 2), K(78, 4), K(79, 8), K(85, 4), K(86, 8), { encode(t2, e) {
    let r = t2.packedValues || [], n = t2.structures || [];
    if (r.values.length > 0) {
      a[i++] = 216, a[i++] = 51, q(4);
      let s = r.values;
      e(s), q(0), q(0), packedObjectMap = Object.create(sharedPackedObjectMap || null);
      for (let o = 0, l = s.length; o < l; o++) packedObjectMap[s[o]] = o;
    }
    if (n) {
      P.setUint32(i, 3655335424), i += 3;
      let s = n.slice(0);
      s.unshift(57344), s.push(new j(t2.version, 1399353956)), e(s);
    } else e(new j(t2.version, 1399353956));
  } }];
  function K(t2, e) {
    return !Rr && e > 1 && (t2 -= 4), { tag: t2, encode: function(n, s) {
      let o = n.byteLength, l = n.byteOffset || 0, m = n.buffer || n;
      s(Ae ? Ve.from(m, l, o) : new Uint8Array(m, l, o));
    } };
  }
  function nr(t2, e) {
    let r = t2.byteLength;
    r < 24 ? a[i++] = 64 + r : r < 256 ? (a[i++] = 88, a[i++] = r) : r < 65536 ? (a[i++] = 89, a[i++] = r >> 8, a[i++] = r & 255) : (a[i++] = 90, P.setUint32(i, r), i += 4), i + r >= a.length && e(i + r), a.set(t2.buffer ? t2 : new Uint8Array(t2), i), i += r;
  }
  function _r(t2, e) {
    let r, n = e.length * 2, s = t2.length - n;
    e.sort((o, l) => o.offset > l.offset ? 1 : -1);
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      l.id = o;
      for (let m of l.references) t2[m++] = o >> 8, t2[m] = o & 255;
    }
    for (; r = e.pop(); ) {
      let o = r.offset;
      t2.copyWithin(o + n, o, s), n -= 2;
      let l = o + n;
      t2[l++] = 216, t2[l++] = 28, s = o;
    }
    return t2;
  }
  function sr(t2, e) {
    P.setUint32(_.position + t2, i - _.position - t2 + 1);
    let r = _;
    _ = null, e(r[0]), e(r[1]);
  }
  function It(t2) {
    if (t2.Class) {
      if (!t2.encode) throw new Error("Extension has no encode function");
      bt.unshift(t2.Class), Fe.unshift(t2);
    }
    Zt(t2);
  }
  var At = new Ie({ useRecords: false });
  var Dt = At.encode;
  var Br = At.encodeAsIterable;
  var Fr = At.encodeAsAsyncIterable;
  var { NEVER: Wr, ALWAYS: Vr, DECIMAL_ROUND: Tr, DECIMAL_FIT: Lr } = Re;
  var gt = 512;
  var vr = 1024;
  var wt = 2048;
  var ir = class {
    debug;
    constructor(e = false, r) {
      this.debug = e, r && r.forEach(It);
    }
    encoder(e) {
      return new Ut(e, this.debug);
    }
    decoder(e) {
      return new Et(e, this.debug);
    }
  };
  var Ut = class {
    w;
    debug;
    constructor(e, r = false) {
      this.w = e, this.debug = r;
    }
    async encode(e) {
      this.debug && console.log("<<", e);
      let r = Dt(e), n = 0;
      for (; n < r.length; ) n += await this.w.write(r.subarray(n));
    }
  };
  var Et = class {
    r;
    debug;
    constructor(e, r = false) {
      this.r = e, this.debug = r;
    }
    async decode(e) {
      let r = new Uint8Array(e), n = 0;
      for (; n < e; ) {
        let o = await this.r.read(r.subarray(n));
        if (o === null) return Promise.resolve(null);
        n += o;
      }
      let s = yt(r);
      return this.debug && console.log(">>", s), Promise.resolve(s);
    }
  };
  function Te(t2, e, r = 0) {
    r = Math.max(0, Math.min(r, e.byteLength));
    let n = e.byteLength - r;
    return t2.byteLength > n && (t2 = t2.subarray(0, n)), e.set(t2, r), t2.byteLength;
  }
  var Le = 32 * 1024;
  var St = 2 ** 32 - 2;
  var ve = class {
    _buf;
    _off;
    constructor(e) {
      this._buf = e === void 0 ? new Uint8Array(0) : new Uint8Array(e), this._off = 0;
    }
    bytes(e = { copy: true }) {
      return e.copy === false ? this._buf.subarray(this._off) : this._buf.slice(this._off);
    }
    empty() {
      return this._buf.byteLength <= this._off;
    }
    get length() {
      return this._buf.byteLength - this._off;
    }
    get capacity() {
      return this._buf.buffer.byteLength;
    }
    truncate(e) {
      if (e === 0) {
        this.reset();
        return;
      }
      if (e < 0 || e > this.length) throw Error("bytes.Buffer: truncation out of range");
      this._reslice(this._off + e);
    }
    reset() {
      this._reslice(0), this._off = 0;
    }
    _tryGrowByReslice(e) {
      let r = this._buf.byteLength;
      return e <= this.capacity - r ? (this._reslice(r + e), r) : -1;
    }
    _reslice(e) {
      this._buf = new Uint8Array(this._buf.buffer, 0, e);
    }
    readSync(e) {
      if (this.empty()) return this.reset(), e.byteLength === 0 ? 0 : null;
      let r = Te(this._buf.subarray(this._off), e);
      return this._off += r, r;
    }
    read(e) {
      let r = this.readSync(e);
      return Promise.resolve(r);
    }
    writeSync(e) {
      let r = this._grow(e.byteLength);
      return Te(e, this._buf, r);
    }
    write(e) {
      let r = this.writeSync(e);
      return Promise.resolve(r);
    }
    _grow(e) {
      let r = this.length;
      r === 0 && this._off !== 0 && this.reset();
      let n = this._tryGrowByReslice(e);
      if (n >= 0) return n;
      let s = this.capacity;
      if (e <= Math.floor(s / 2) - r) Te(this._buf.subarray(this._off), this._buf);
      else {
        if (s + e > St) throw new Error("The buffer cannot be grown beyond the maximum size.");
        {
          let o = new Uint8Array(Math.min(2 * s + e, St));
          Te(this._buf.subarray(this._off), o), this._buf = o;
        }
      }
      return this._off = 0, this._reslice(Math.min(r + e, St)), r;
    }
    grow(e) {
      if (e < 0) throw Error("Buffer.grow: negative count");
      let r = this._grow(e);
      this._reslice(r);
    }
    async readFrom(e) {
      let r = 0, n = new Uint8Array(Le);
      for (; ; ) {
        let s = this.capacity - this.length < Le, o = s ? n : new Uint8Array(this._buf.buffer, this.length), l = await e.read(o);
        if (l === null) return r;
        s ? this.writeSync(o.subarray(0, l)) : this._reslice(this.length + l), r += l;
      }
    }
    readFromSync(e) {
      let r = 0, n = new Uint8Array(Le);
      for (; ; ) {
        let s = this.capacity - this.length < Le, o = s ? n : new Uint8Array(this._buf.buffer, this.length), l = e.readSync(o);
        if (l === null) return r;
        s ? this.writeSync(o.subarray(0, l)) : this._reslice(this.length + l), r += l;
      }
    }
  };
  var fe = class {
    codec;
    constructor(e) {
      this.codec = e;
    }
    encoder(e) {
      return new Ct(e, this.codec);
    }
    decoder(e) {
      return new Pt(e, this.codec.decoder(e));
    }
  };
  var Ct = class {
    w;
    codec;
    constructor(e, r) {
      this.w = e, this.codec = r;
    }
    async encode(e) {
      let r = new ve();
      await this.codec.encoder(r).encode(e);
      let s = new DataView(new ArrayBuffer(4));
      s.setUint32(0, r.length);
      let o = new Uint8Array(r.length + 4);
      o.set(new Uint8Array(s.buffer), 0), o.set(r.bytes(), 4);
      let l = 0;
      for (; l < o.length; ) l += await this.w.write(o.subarray(l));
    }
  };
  var Pt = class {
    r;
    dec;
    constructor(e, r) {
      this.r = e, this.dec = r;
    }
    async decode(e) {
      let r = new Uint8Array(4);
      if (await this.r.read(r) === null) return null;
      let o = new DataView(r.buffer).getUint32(0);
      return await this.dec.decode(o);
    }
  };
  var de = class {
    session;
    codec;
    constructor(e, r) {
      this.session = e, this.codec = r;
    }
    async call(e, r) {
      let n = await this.session.open();
      try {
        let s = new fe(this.codec), o = s.encoder(n), l = s.decoder(n);
        await o.encode({ S: e }), await o.encode(r);
        let m = await l.decode(), g = new ze(n, s);
        if (g.error = m.E, g.error !== void 0 && g.error !== null) throw g.error;
        return g.value = await l.decode(), g.continue = m.C, g.continue || await n.close(), g;
      } catch (s) {
        return await n.close(), Promise.reject(s);
      }
    }
  };
  function ar(t2) {
    function e(r, n) {
      return new Proxy(Object.assign(() => {
      }, { path: r, callable: n }), { get(s, o, l) {
        return o.startsWith("__") ? Reflect.get(s, o, l) : e(s.path ? `${s.path}.${o}` : o, s.callable);
      }, apply(s, o, l = []) {
        return s.callable(s.path, l);
      } });
    }
    return e("", t2.call.bind(t2));
  }
  function Ue(t2) {
    return { respondRPC: t2 };
  }
  function zr() {
    return Ue((t2, e) => {
      t2.return(new Error(`not found: ${e.selector}`));
    });
  }
  function kt(t2) {
    return t2 === "" ? "/" : (t2[0] != "/" && (t2 = "/" + t2), t2 = t2.replace(".", "/"), t2.toLowerCase());
  }
  var J = class {
    handlers;
    constructor() {
      this.handlers = {};
    }
    async respondRPC(e, r) {
      await this.handler(r).respondRPC(e, r);
    }
    handler(e) {
      let r = this.match(e.selector);
      return r || zr();
    }
    remove(e) {
      e = kt(e);
      let r = this.match(e);
      return delete this.handlers[e], r || null;
    }
    match(e) {
      if (e = kt(e), this.handlers.hasOwnProperty(e)) return this.handlers[e];
      let r = Object.keys(this.handlers).filter((n) => n.endsWith("/"));
      r.sort((n, s) => s.length - n.length);
      for (let n of r) if (e.startsWith(n)) {
        let s = this.handlers[n], o = s;
        return o.match && o.match instanceof Function ? o.match(e.slice(n.length)) : s;
      }
      return null;
    }
    handle(e, r) {
      if (e === "") throw "handle: invalid selector";
      let n = kt(e), s = r;
      if (s.match && s.match instanceof Function && !n.endsWith("/") && (n = n + "/"), !r) throw "handle: invalid handler";
      if (this.match(n)) throw "handle: selector already registered";
      this.handlers[n] = r;
    }
  };
  async function cr(t2, e, r) {
    let n = new fe(e), s = n.decoder(t2), o = await s.decode(), l = new Ne(o.S, t2, s);
    l.caller = new de(t2.session, e);
    let m = new He(), g = new Ot(t2, n, m);
    return r || (r = new J()), await r.respondRPC(g, l), g.responded || await g.return(null), Promise.resolve();
  }
  var Ot = class {
    header;
    ch;
    codec;
    responded;
    constructor(e, r, n) {
      this.ch = e, this.codec = r, this.header = n, this.responded = false;
    }
    send(e) {
      return this.codec.encoder(this.ch).encode(e);
    }
    return(e) {
      return this.respond(e, false);
    }
    async continue(e) {
      return await this.respond(e, true), this.ch;
    }
    async respond(e, r) {
      return this.responded = true, this.header.C = r, e instanceof Error && (this.header.E = e.message, e = null), await this.send(this.header), await this.send(e), r || await this.ch.close(), Promise.resolve();
    }
  };
  var Ne = class {
    selector;
    channel;
    caller;
    decoder;
    constructor(e, r, n) {
      this.selector = e, this.channel = r, this.decoder = n;
    }
    receive() {
      return this.decoder.decode();
    }
  };
  var He = class {
    E;
    C;
    constructor() {
      this.E = void 0, this.C = false;
    }
  };
  var ze = class {
    error;
    continue;
    value;
    channel;
    codec;
    constructor(e, r) {
      this.channel = e, this.codec = r, this.error = void 0, this.continue = false;
    }
    send(e) {
      return this.codec.encoder(this.channel).encode(e);
    }
    receive() {
      return this.codec.decoder(this.channel).decode();
    }
  };
  var je = class {
    session;
    caller;
    codec;
    responder;
    constructor(e, r) {
      this.session = e, this.codec = r, this.caller = new de(e, r), this.responder = new J();
    }
    close() {
      return this.session.close();
    }
    async respond() {
      for (; ; ) {
        let e = await this.session.accept();
        if (e === null) break;
        cr(e, this.codec, this.responder);
      }
    }
    async call(e, r) {
      return this.caller.call(e, r);
    }
    handle(e, r) {
      this.responder.handle(e, r);
    }
    respondRPC(e, r) {
      this.responder.respondRPC(e, r);
    }
    virtualize() {
      return ar(this.caller);
    }
  };
  var lr = /* @__PURE__ */ new Map([[100, 12], [101, 16], [102, 4], [103, 8], [104, 8], [105, 4], [106, 4]]);
  var Ke = class {
    w;
    constructor(e) {
      this.w = e;
    }
    async encode(e) {
      ue.messages && console.log("<<ENC", e);
      let r = Hr(e);
      ue.bytes && console.log("<<ENC", r);
      let n = 0;
      for (; n < r.length; ) n += await this.w.write(r.subarray(n));
      return n;
    }
  };
  function Hr(t2) {
    if (t2.ID === 106) {
      let e = t2, r = new DataView(new ArrayBuffer(5));
      return r.setUint8(0, e.ID), r.setUint32(1, e.channelID), new Uint8Array(r.buffer);
    }
    if (t2.ID === 104) {
      let e = t2, r = new DataView(new ArrayBuffer(9));
      r.setUint8(0, e.ID), r.setUint32(1, e.channelID), r.setUint32(5, e.length);
      let n = new Uint8Array(9 + e.length);
      return n.set(new Uint8Array(r.buffer), 0), n.set(e.data, 9), n;
    }
    if (t2.ID === 105) {
      let e = t2, r = new DataView(new ArrayBuffer(5));
      return r.setUint8(0, e.ID), r.setUint32(1, e.channelID), new Uint8Array(r.buffer);
    }
    if (t2.ID === 100) {
      let e = t2, r = new DataView(new ArrayBuffer(13));
      return r.setUint8(0, e.ID), r.setUint32(1, e.senderID), r.setUint32(5, e.windowSize), r.setUint32(9, e.maxPacketSize), new Uint8Array(r.buffer);
    }
    if (t2.ID === 101) {
      let e = t2, r = new DataView(new ArrayBuffer(17));
      return r.setUint8(0, e.ID), r.setUint32(1, e.channelID), r.setUint32(5, e.senderID), r.setUint32(9, e.windowSize), r.setUint32(13, e.maxPacketSize), new Uint8Array(r.buffer);
    }
    if (t2.ID === 102) {
      let e = t2, r = new DataView(new ArrayBuffer(5));
      return r.setUint8(0, e.ID), r.setUint32(1, e.channelID), new Uint8Array(r.buffer);
    }
    if (t2.ID === 103) {
      let e = t2, r = new DataView(new ArrayBuffer(9));
      return r.setUint8(0, e.ID), r.setUint32(1, e.channelID), r.setUint32(5, e.additionalBytes), new Uint8Array(r.buffer);
    }
    throw `marshal of unknown type: ${t2}`;
  }
  function Ge(t2, e) {
    let r = new Uint8Array(e), n = 0;
    return t2.forEach((s) => {
      r.set(s, n), n += s.length;
    }), r;
  }
  var pe = class {
    q;
    waiters;
    closed;
    constructor() {
      this.q = [], this.waiters = [], this.closed = false;
    }
    push(e) {
      if (this.closed) throw "closed queue";
      if (this.waiters.length > 0) {
        let r = this.waiters.shift();
        r && r(e);
        return;
      }
      this.q.push(e);
    }
    shift() {
      return this.closed ? Promise.resolve(null) : new Promise((e) => {
        if (this.q.length > 0) {
          e(this.q.shift() || null);
          return;
        }
        this.waiters.push(e);
      });
    }
    close() {
      this.closed || (this.closed = true, this.waiters.forEach((e) => {
        e(null);
      }));
    }
  };
  var $e = class {
    gotEOF;
    readBuf;
    readers;
    constructor() {
      this.readBuf = new Uint8Array(0), this.gotEOF = false, this.readers = [];
    }
    read(e) {
      return new Promise((r) => {
        let n = () => {
          if (this.readBuf === void 0) {
            r(null);
            return;
          }
          if (this.readBuf.length == 0) {
            if (this.gotEOF) {
              this.readBuf = void 0, r(null);
              return;
            }
            this.readers.push(n);
            return;
          }
          let s = this.readBuf.slice(0, e.length);
          this.readBuf = this.readBuf.slice(s.length), this.readBuf.length == 0 && this.gotEOF && (this.readBuf = void 0), e.set(s), r(s.length);
        };
        n();
      });
    }
    write(e) {
      for (this.readBuf && (this.readBuf = Ge([this.readBuf, e], this.readBuf.length + e.length)); !this.readBuf || this.readBuf.length > 0; ) {
        let r = this.readers.shift();
        if (!r) break;
        r();
      }
      return Promise.resolve(e.length);
    }
    eof() {
      this.gotEOF = true, this.flushReaders();
    }
    close() {
      this.readBuf = void 0, this.flushReaders();
    }
    flushReaders() {
      for (; ; ) {
        let e = this.readers.shift();
        if (!e) return;
        e();
      }
    }
  };
  var Ye = class {
    r;
    constructor(e) {
      this.r = e;
    }
    async decode() {
      let e = await jr(this.r);
      if (e === null) return Promise.resolve(null);
      ue.bytes && console.log(">>DEC", e);
      let r = Kr(e);
      return ue.messages && console.log(">>DEC", r), r;
    }
  };
  async function jr(t2) {
    let e = new Uint8Array(1);
    if (await t2.read(e) === null) return Promise.resolve(null);
    let n = e[0], s = lr.get(n);
    if (s === void 0 || n < 100 || n > 106) return Promise.reject(`bad packet: ${n}`);
    let o = new Uint8Array(s);
    if (await t2.read(o) === null) return Promise.reject("unexpected EOF reading packet");
    if (n === 104) {
      let g = new DataView(o.buffer).getUint32(4), x = 0, k = [];
      for (; x < g; ) {
        let S = new Uint8Array(g - x), F = await t2.read(S);
        if (F === null) return Promise.reject("unexpected EOF reading data chunk");
        x += F, k.push(S.slice(0, F));
      }
      return Ge([e, o, ...k], 1 + o.length + g);
    }
    return Ge([e, o], o.length + 1);
  }
  function Kr(t2) {
    let e = new DataView(t2.buffer);
    switch (t2[0]) {
      case 106:
        return { ID: t2[0], channelID: e.getUint32(1) };
      case 104:
        let r = e.getUint32(5), n = new Uint8Array(t2.buffer.slice(9));
        return { ID: t2[0], channelID: e.getUint32(1), length: r, data: n };
      case 105:
        return { ID: t2[0], channelID: e.getUint32(1) };
      case 100:
        return { ID: t2[0], senderID: e.getUint32(1), windowSize: e.getUint32(5), maxPacketSize: e.getUint32(9) };
      case 101:
        return { ID: t2[0], channelID: e.getUint32(1), senderID: e.getUint32(5), windowSize: e.getUint32(9), maxPacketSize: e.getUint32(13) };
      case 102:
        return { ID: t2[0], channelID: e.getUint32(1) };
      case 103:
        return { ID: t2[0], channelID: e.getUint32(1), additionalBytes: e.getUint32(5) };
      default:
        throw `unmarshal of unknown type: ${t2[0]}`;
    }
  }
  var ue = { messages: false, bytes: false };
  var Rt = 9;
  var _t = Number.MAX_VALUE;
  var Je = class {
    conn;
    channels;
    incoming;
    enc;
    dec;
    done;
    closed;
    constructor(e) {
      this.conn = e, this.enc = new Ke(e), this.dec = new Ye(e), this.channels = [], this.incoming = new pe(), this.done = this.loop(), this.closed = false;
    }
    async open() {
      let e = this.newChannel();
      if (e.maxIncomingPayload = Xe, await this.enc.encode({ ID: 100, windowSize: e.myWindow, maxPacketSize: e.maxIncomingPayload, senderID: e.localId }), await e.ready.shift()) return e;
      throw "failed to open";
    }
    accept() {
      return this.incoming.shift();
    }
    async close() {
      for (let e of Object.keys(this.channels)) {
        let r = parseInt(e);
        this.channels[r] !== void 0 && this.channels[r].shutdown();
      }
      this.conn.close(), this.closed = true, await this.done;
    }
    async loop() {
      try {
        for (; ; ) {
          let e = await this.dec.decode();
          if (e === null) {
            this.close();
            return;
          }
          if (e.ID === 100) {
            await this.handleOpen(e);
            continue;
          }
          let r = e, n = this.getCh(r.channelID);
          if (n === void 0) {
            if (this.closed) return;
            continue;
          }
          await n.handle(r);
        }
      } catch (e) {
        if (e.message && e.message.contains && e.message.contains("Connection reset by peer")) return;
        throw e;
      }
    }
    async handleOpen(e) {
      if (e.maxPacketSize < Rt || e.maxPacketSize > _t) {
        await this.enc.encode({ ID: 102, channelID: e.senderID });
        return;
      }
      let r = this.newChannel();
      r.remoteId = e.senderID, r.maxRemotePayload = e.maxPacketSize, r.remoteWin = e.windowSize, r.maxIncomingPayload = Xe, this.incoming.push(r), await this.enc.encode({ ID: 101, channelID: r.remoteId, senderID: r.localId, windowSize: r.myWindow, maxPacketSize: r.maxIncomingPayload });
    }
    newChannel() {
      let e = new Ze(this);
      return e.remoteWin = 0, e.myWindow = fr, e.localId = this.addCh(e), e;
    }
    getCh(e) {
      let r = this.channels[e];
      return r && r.localId !== e && console.log("bad ids:", e, r.localId, r.remoteId), r;
    }
    addCh(e) {
      return this.channels.forEach((r, n) => {
        if (r === void 0) return this.channels[n] = e, n;
      }), this.channels.push(e), this.channels.length - 1;
    }
    rmCh(e) {
      delete this.channels[e];
    }
  };
  var Xe = 1 << 24;
  var fr = 64 * Xe;
  var Ze = class {
    localId;
    remoteId;
    maxIncomingPayload;
    maxRemotePayload;
    session;
    ready;
    sentEOF;
    sentClose;
    remoteWin;
    myWindow;
    readBuf;
    writers;
    constructor(e) {
      this.localId = 0, this.remoteId = 0, this.maxIncomingPayload = 0, this.maxRemotePayload = 0, this.sentEOF = false, this.sentClose = false, this.remoteWin = 0, this.myWindow = 0, this.ready = new pe(), this.session = e, this.writers = [], this.readBuf = new $e();
    }
    ident() {
      return this.localId;
    }
    async read(e) {
      let r = await this.readBuf.read(e);
      if (r !== null) try {
        await this.adjustWindow(r);
      } catch (n) {
        if (n !== "EOF" && n.name !== "BadResource") throw n;
      }
      return r;
    }
    write(e) {
      return this.sentEOF ? Promise.reject("EOF") : new Promise((r, n) => {
        let s = 0, o = () => {
          if (this.sentEOF || this.sentClose) {
            n("EOF");
            return;
          }
          if (e.byteLength == 0) {
            r(s);
            return;
          }
          let l = Math.min(this.maxRemotePayload, e.length), m = this.reserveWindow(l);
          if (m == 0) {
            this.writers.push(o);
            return;
          }
          let g = e.slice(0, m);
          this.send({ ID: 104, channelID: this.remoteId, length: g.length, data: g }).then(() => {
            if (s += g.length, e = e.slice(g.length), e.length == 0) {
              r(s);
              return;
            }
            this.writers.push(o);
          });
        };
        o();
      });
    }
    reserveWindow(e) {
      return this.remoteWin < e && (e = this.remoteWin), this.remoteWin -= e, e;
    }
    addWindow(e) {
      for (this.remoteWin += e; this.remoteWin > 0; ) {
        let r = this.writers.shift();
        if (!r) break;
        r();
      }
    }
    async closeWrite() {
      this.sentEOF = true, await this.send({ ID: 105, channelID: this.remoteId }), this.writers.forEach((e) => e()), this.writers = [];
    }
    async close() {
      if (this.readBuf.eof(), !this.sentClose) {
        for (await this.send({ ID: 106, channelID: this.remoteId }), this.sentClose = true; await this.ready.shift() !== null; ) ;
        return;
      }
      this.shutdown();
    }
    shutdown() {
      this.readBuf.close(), this.writers.forEach((e) => e()), this.ready.close(), this.session.rmCh(this.localId);
    }
    async adjustWindow(e) {
      this.myWindow += e, await this.send({ ID: 103, channelID: this.remoteId, additionalBytes: e });
    }
    send(e) {
      if (this.sentClose) throw "EOF";
      return this.sentClose = e.ID === 106, this.session.enc.encode(e);
    }
    handle(e) {
      if (e.ID === 104) {
        this.handleData(e);
        return;
      }
      if (e.ID === 106) {
        this.close();
        return;
      }
      if (e.ID === 105 && this.readBuf.eof(), e.ID === 102) {
        this.session.rmCh(e.channelID), this.ready.push(false);
        return;
      }
      if (e.ID === 101) {
        if (e.maxPacketSize < Rt || e.maxPacketSize > _t) throw "invalid max packet size";
        this.remoteId = e.senderID, this.maxRemotePayload = e.maxPacketSize, this.addWindow(e.windowSize), this.ready.push(true);
        return;
      }
      e.ID === 103 && this.addWindow(e.additionalBytes);
    }
    handleData(e) {
      if (e.length > this.maxIncomingPayload) throw "incoming packet exceeds maximum payload size";
      if (this.myWindow < e.length) throw "remote side wrote too much";
      this.myWindow -= e.length, this.readBuf.write(e.data);
    }
  };
  var Bt = {};
  yr(Bt, { Conn: () => Qe, connect: () => $r });
  function $r(t2, e) {
    return new Promise((r) => {
      let n = new WebSocket(t2);
      n.onopen = () => r(new Qe(n)), e && (n.onclose = e);
    });
  }
  var Qe = class {
    ws;
    waiters;
    chunks;
    isClosed;
    constructor(e) {
      this.isClosed = false, this.waiters = [], this.chunks = [], this.ws = e, this.ws.binaryType = "arraybuffer", this.ws.onmessage = (n) => {
        let s = new Uint8Array(n.data);
        if (this.chunks.push(s), this.waiters.length > 0) {
          let o = this.waiters.shift();
          o && o();
        }
      };
      let r = this.ws.onclose;
      this.ws.onclose = (n) => {
        r && r.bind(this.ws)(n), this.close();
      };
    }
    read(e) {
      return new Promise((r) => {
        var n = () => {
          if (this.isClosed) {
            r(null);
            return;
          }
          if (this.chunks.length === 0) {
            this.waiters.push(n);
            return;
          }
          let s = 0;
          for (; s < e.length; ) {
            let o = this.chunks.shift();
            if (o == null) {
              r(s);
              return;
            }
            let l = o.slice(0, e.length - s);
            if (e.set(l, s), s += l.length, o.length > l.length) {
              let m = o.slice(l.length);
              this.chunks.unshift(m);
            }
          }
          r(s);
        };
        n();
      });
    }
    write(e) {
      return this.ws.send(e), Promise.resolve(e.byteLength);
    }
    close() {
      this.isClosed || (this.isClosed = true, this.waiters.forEach((e) => e()), this.ws.close());
    }
  };
  var Ft = class {
    port;
    waiters;
    chunks;
    isClosed;
    constructor(e) {
      this.isClosed = false, this.waiters = [], this.chunks = [], this.port = e, this.port.onmessage = (r) => {
        let n = new Uint8Array(r.data);
        if (this.chunks.push(n), this.waiters.length > 0) {
          let s = this.waiters.shift();
          s && s();
        }
      };
    }
    read(e) {
      return new Promise((r) => {
        var n = () => {
          if (this.isClosed) {
            r(null);
            return;
          }
          if (this.chunks.length === 0) {
            this.waiters.push(n);
            return;
          }
          let s = 0;
          for (; s < e.length; ) {
            let o = this.chunks.shift();
            if (o == null) {
              r(s);
              return;
            }
            let l = o.slice(0, e.length - s);
            if (e.set(l, s), s += l.length, o.length > l.length) {
              let m = o.slice(l.length);
              this.chunks.unshift(m);
            }
          }
          r(s);
        };
        n();
      });
    }
    write(e) {
      return this.port.postMessage(e, [e.buffer]), Promise.resolve(e.byteLength);
    }
    close() {
      this.isClosed || (this.isClosed = true, this.waiters.forEach((e) => e()), this.port.close());
    }
  };

  // wanix.js
  var WanixFS = class {
    constructor(port) {
      const sess = new Je(new Ft(port));
      this.peer = new je(sess, new ir());
    }
    async readDir(name) {
      return (await this.peer.call("ReadDir", [name])).value;
    }
    async makeDir(name) {
      await this.peer.call("Mkdir", [name]);
    }
    async bind(name, newname) {
      await this.peer.call("Bind", [name, newname]);
    }
    async unbind(name, newname) {
      await this.peer.call("Unbind", [name, newname]);
    }
    async readFile(name) {
      return (await this.peer.call("ReadFile", [name])).value;
    }
    async stat(name) {
      return (await this.peer.call("Stat", [name])).value;
    }
    async writeFile(name, contents) {
      if (typeof contents === "string") {
        contents = new TextEncoder().encode(contents);
      }
      return (await this.peer.call("WriteFile", [name, contents])).value;
    }
    async remove(name) {
      await this.peer.call("Remove", [name]);
    }
    async truncate(name, size) {
      await this.peer.call("Truncate", [name, size]);
    }
    async open(name) {
      return (await this.peer.call("Open", [name])).value;
    }
    async read(fd, count) {
      return (await this.peer.call("Read", [fd, count])).value;
    }
    async write(fd, data) {
      return (await this.peer.call("Write", [fd, data])).value;
    }
    async close(fd) {
      return (await this.peer.call("Close", [fd])).value;
    }
    async sync(fd) {
      return (await this.peer.call("Sync", [fd])).value;
    }
  };
  var Wanix = class extends WanixFS {
    constructor(config = {}) {
      if (window.wanix) {
        throw new Error("Wanix already initialized on this page");
      }
      const sys = new MessageChannel();
      super(sys.port1);
      window.wanix = this.context = {
        config,
        instance: this,
        sys: new Ft(sys.port2),
        sw: new MessageChannel(),
        _toport: (port) => new Ft(port)
        // kludge: for worker
      };
      if (config.helpers) {
        setupConsoleHelpers();
      }
      const go = new window.Go();
      WebAssembly.instantiateStreaming(fetch("./wanix.wasm"), go.importObject).then((obj) => {
        go.run(obj.instance);
      });
    }
  };
  window.Wanix = Wanix;
  function setupConsoleHelpers() {
    window.list = (name) => {
      window.wanix.instance.readDir(name).then(console.log);
    };
    window.read = (name) => {
      window.wanix.instance.readFile(name).then((d) => new TextDecoder().decode(d)).then(console.log);
    };
    window.readBytes = (name) => {
      window.wanix.instance.readFile(name).then(console.log);
    };
    window.write = (name, content) => {
      window.wanix.instance.writeFile(name, content);
    };
    window.mkdir = (name) => {
      window.wanix.instance.makeDir(name);
    };
    window.bind = (name, newname) => {
      window.wanix.instance.bind(name, newname);
    };
    window.unbind = (name, newname) => {
      window.wanix.instance.unbind(name, newname);
    };
    window.rm = (name) => {
      window.wanix.instance.remove(name);
    };
    window.stat = (name) => {
      window.wanix.instance.stat(name).then(console.log);
    };
    window.tail = async (name) => {
      const fd = await window.wanix.instance.open(name);
      while (true) {
        const data = await window.wanix.instance.read(fd, 1024);
        if (!data) {
          break;
        }
        console.log(new TextDecoder().decode(data));
      }
      window.wanix.instance.close(fd);
    };
    window.bootShell = async (screen = false) => {
      if (screen) {
        const screen2 = document.createElement("div");
        const div = document.createElement("div");
        const canvas = document.createElement("canvas");
        screen2.appendChild(div);
        screen2.appendChild(canvas);
        screen2.id = "screen";
        document.body.appendChild(screen2);
      }
      const w = window.wanix.instance;
      const query = new URLSearchParams(window.location.search);
      const url = query.get("tty");
      if (url) {
        await w.readFile("cap/new/ws");
        await w.writeFile("cap/1/ctl", `mount ${url}`);
        await w.readFile("web/vm/new");
        await w.writeFile("task/1/ctl", "bind cap/1/data web/vm/1/ttyS0");
      } else {
        await w.readFile("web/dom/new/xterm");
        await w.writeFile("web/dom/body/ctl", "append-child 1");
        await w.readFile("web/vm/new");
        await w.writeFile("task/1/ctl", "bind web/dom/1/data web/vm/1/ttyS0");
      }
      await w.writeFile("task/1/ctl", "bind . web/vm/1/fsys");
      await w.writeFile("task/1/ctl", "bind #shell web/vm/1/fsys");
      await w.writeFile("web/vm/1/ctl", "start");
    };
  }
})();
