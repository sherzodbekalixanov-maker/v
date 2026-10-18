const $=s=>document.querySelector(s),U=()=>JSON.parse(localStorage.es_users||'[]'),me=U().find(u=>u.e==localStorage.es_me),cur=location.pathname.split('/').pop()||'index.html';
const P=[['index.html','Bosh sahifa'],['muammolar.html','Muammolar'],['darsliklar.html','Darsliklar'],['test.html','Test'],['haqimizda.html','Biz haqimizda'],['kirish.html',me?'Salom, '+me.n.replace(/[<>&"]/g,''):'Kirish']];
document.body.insertAdjacentHTML('afterbegin','<div id="bg"><img src="assets/bg.svg" alt=""></div><div id="sh"></div><div id="bar"></div><div id="pg"></div><nav><b>EduSmart AI</b>'+P.map(p=>`<a href="${p[0]}" class="${p[0]==cur?'on':''}">${p[1]}</a>`).join('')+'</nav>');
document.body.insertAdjacentHTML('beforeend','<footer>EduSmart AI — har bir o‘quvchi uchun shaxsiy ustoz</footer>');
const bg=$('#bg'),bar=$('#bar'),sc=()=>{const p=scrollY/(document.body.scrollHeight-innerHeight||1);bg.style.transform=`translateY(${-scrollY*.07}px) scale(${1+p*.2})`;bar.style.width=p*100+'%'};
addEventListener('scroll',sc,{passive:true});sc();
function split(el){const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),ts=[];let n=0;while(w.nextNode())ts.push(w.currentNode);ts.forEach(t=>{const f=document.createDocumentFragment();t.textContent.split(/(\s+)/).forEach(p=>{if(!p||/^\s+$/.test(p))return f.append(p);const wd=document.createElement('span');wd.className='w';[...p].forEach(c=>{const s=document.createElement('span');s.className='ch';s.textContent=c;s.style.setProperty('--i',n++);wd.append(s)});f.append(wd)});t.replaceWith(f)});el.classList.add('lt')}
document.querySelectorAll('h1,h2').forEach(split);
document.querySelectorAll('.card,section>p').forEach(e=>e.classList.add('rv'));
const io=new IntersectionObserver(r=>r.forEach(e=>{if(e.isIntersecting){e.target.classList.add(e.target.classList.contains('lt')?'on':'in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.lt,.rv').forEach(e=>io.observe(e));
const pg=$('#pg');
if(sessionStorage.flip){sessionStorage.removeItem('flip');pg.innerHTML='<i class="in"></i>';document.documentElement.classList.remove('fl');setTimeout(()=>pg.innerHTML='',700)}
addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target||/^(#|http|mailto)/.test(a.getAttribute('href')))return;e.preventDefault();sessionStorage.flip=1;pg.innerHTML='<i class="out"></i>';setTimeout(()=>location.href=a.href,450)});
addEventListener('pageshow',e=>{if(e.persisted)pg.innerHTML=''});
const nm=s=>s.toLowerCase().replace(/[\s‘’'`ʻʼ]/g,'');
let cx=null,aw=null,ss=-1,ini=0;const dd=()=>localStorage.es_d||(me&&me.d)||'';
document.body.insertAdjacentHTML('beforeend','<button id="aib">Ustoz AI</button><div id="aip"><header>Ustoz AI<span id="ax" style="cursor:pointer">✕</span></header><div id="am"></div><div id="ac"></div><form id="af"><input id="ai" placeholder="Savolingizni yozing" autocomplete="off"><button>Yuborish</button></form></div>');
const say=(t,w='a')=>{const m=document.createElement('div');m.className='mg '+w;m.innerHTML=t;$('#am').append(m);$('#am').scrollTop=1e5};
const chips=a=>{$('#ac').innerHTML='';a.forEach(t=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>ask(t);$('#ac').append(b)})};
const LS=()=>{const d=dd();return D[d]?D[d].l.map(l=>l[0]):Object.values(D).map(x=>x.n)};
const fl=n=>{for(const k in D)for(const l of D[k].l){const m=nm(l[0]);if(n.includes(m)||(n.length>3&&m.includes(n)))return[l,k]}return null};
const P1=l=>l[1].split(/(?<=\.)\s/);
function lesson(l,k){cx={l,d:k};ss=-1;aw=l[3].split('|');say(`<b>${l[0]}</b><br>${l[1]}<br><i>Misol:</i> ${l[2]}<br><br>Mashq: ${aw[0]}`);chips(['Tushunmadim'].concat(LS().slice(0,3)))}
function sos(){const l=cx.l,p=P1(l);ss++;aw=null;if(ss==0){say(`Xavotir olmang! Bu mavzu ko‘pchilikka boshida qiyin tuyuladi, birgalikda osongina o‘rganamiz.<br>${l[4]}<br>Shu o‘xshatish tushunarlimi?`);chips(['Ha, tushundim','Yana tushuntir'])}else if(ss<=p.length){say(`${ss}-qadam: ${p[ss-1]}<br>Shuni o‘z so‘zingiz bilan aytib bera olasizmi?`);chips(['Tushundim','Yana tushuntir'])}else{aw=l[3].split('|');ss=-1;say(`Endi o‘zingiz urinib ko‘ring: ${aw[0]}`);chips([])}}
function ask(t){say(t,'u');const x=t.toLowerCase(),n=nm(t),f=fl(n);
if(aw&&ss<0&&!f&&!/tushunmadim|maslahat|qiyin/.test(x)){if(aw[1].split('/').some(a=>nm(a)==n)){aw=null;say(`To‘g‘ri! ${P1(cx.l)[0]} Keyingi mavzuga o‘tamizmi?`);chips(LS().slice(0,4))}else say(`Hali emas, lekin yaqinsiz. Ishora: ${aw[2]} Yana urinib ko‘rasizmi?`);return}
if(/tushunmadim|qiyin|qaytadan|yana tushuntir/.test(x)){if(cx){if(/yana/.test(x)&&ss>0)ss--;sos()}else{say('Xavotir olmang, birgalikda tushunamiz! Qaysi mavzu qiyin tuyuldi?');chips(LS())}return}
if(cx&&ss>=0&&/tushund|ha|davom/.test(x)&&!f){sos();return}
if(f){lesson(f[0],f[1]);return}
for(const k in D)if(n.includes(nm(D[k].n).slice(0,5))){say(`${D[k].n} yo‘nalishida shu mavzular bor: ${D[k].l.map(l=>l[0]).join(', ')}. Qaysi biridan boshlaymiz?`);chips(D[k].l.map(l=>l[0]));return}
if(/maslahat|qanday o‘rgan|qanday organ/.test(x)){say('Kichik qadamlar bilan o‘rganing: avval tushuntirishni o‘qing, keyin mashq qiling, oxirida do‘stingizga aytib bering. Bugun qaysi mavzudan boshlaymiz?');chips(LS().slice(0,4));return}
say('Aniq topolmadim. Mavzu nomini yozing (masalan, “'+LS()[0]+'”) yoki tugmalardan tanlang. Qaysi mavzu qiziq?');chips(LS().slice(0,4))}
$('#aib').onclick=()=>{$('#aip').classList.toggle('op');if(!ini){ini=1;const d=dd();say(`Salom${me?', '+me.n.replace(/[<>&"]/g,''):''}! Men Ustoz AI. ${D[d]?D[d].n+' yo‘nalishi bo‘yicha':'Istalgan fan bo‘yicha'} yordam beraman. Qaysi mavzuni birga o‘rganamiz?`);chips(LS().slice(0,4).concat(['Maslahat']))}};
$('#ax').onclick=()=>$('#aip').classList.remove('op');
$('#af').onsubmit=e=>{e.preventDefault();const v=$('#ai').value.trim();if(v){$('#ai').value='';ask(v)}};
window.aiOpen=(d,i)=>{if(!$('#aip').classList.contains('op'))$('#aib').click();cx={l:D[d].l[i],d};ss=-1;aw=null;ask('Tushunmadim')};
