/* SEDUCTEC — script.js (JavaScript puro) */
(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var root=document.documentElement;
function store(k,v){try{if(v===null)localStorage.removeItem(k);else if(v===undefined)return localStorage.getItem(k);else localStorage.setItem(k,v)}catch(e){}}

/* ---------- DADOS: 10 componentes (links e imagens originais) ---------- */
var BASE='https://seductec.seduc.pi.gov.br/';
var COMPS=[
{n:'Arquitetura de Microsserviços',area:'arq',ico:'01',id:70903,img:'images/componentes/01-arquitetura-microsservicos.jpg',d:'Estudo de como organizar sistemas em serviços independentes que se comunicam entre si.'},
{n:'Introdução ao Ecossistema DevOps',area:'arq',ico:'02',id:70810,img:'images/componentes/02-devops.jpg',d:'Primeiro contato com a cultura e as práticas que aproximam desenvolvimento e operações.'},
{n:'Manutenção de Sistemas',area:'prog',ico:'03',id:70798,img:'images/componentes/03-manutencao-sistemas.jpg',d:'Conteúdos sobre a evolução, correção e cuidado com sistemas já existentes.'},
{n:'Programação Orientada a Objetos (POO)',area:'prog',ico:'04',id:70756,img:'images/componentes/04-poo.jpg',d:'Abordagem de programação baseada em objetos, classes e suas relações.'},
{n:'Programação para Dispositivos Móveis',area:'web',ico:'05',id:70519,img:'images/componentes/05-mobile.jpg',d:'Introdução ao desenvolvimento de aplicações para celulares e tablets.'},
{n:'Fundamentos de UI/UX ou IHC',area:'ux',ico:'06',id:70518,img:'images/componentes/06-ui-ux.jpg',d:'Princípios de interface, experiência do usuário e interação humano-computador.'},
{n:'Programação Web Front-End',area:'web',ico:'07',id:70517,img:'images/componentes/07-front-end.jpg',d:'Criação das interfaces de sites e aplicações que rodam no navegador.'},
{n:'Programação Estruturada',area:'prog',ico:'08',id:70516,img:'images/componentes/08-estruturada.jpg',d:'Base da programação: sequências, decisões, repetições e organização do código.'},
{n:'Pensamento Computacional II',area:'logica',ico:'09',id:70515,img:'images/componentes/09-pensamento-computacional.png',d:'Desenvolvimento do raciocínio lógico para decompor e resolver problemas.'},
{n:'Mentorias Tech II',area:'mentor',ico:'10',id:70514,img:'images/componentes/10-mentorias-tech.png',d:'Espaço de acompanhamento e orientação ao longo da jornada de aprendizagem.'}
];
var AREAS={
logica:{n:'Lógica e Pensamento Computacional',ico:'01',d:'Raciocínio para resolver problemas.'},
prog:{n:'Programação e Desenvolvimento',ico:'02',d:'Linguagens, estruturas e manutenção de software.'},
web:{n:'Desenvolvimento Web e Mobile',ico:'03',d:'Interfaces e aplicações para web e celulares.'},
ux:{n:'Design e Experiência do Usuário',ico:'04',d:'Interfaces pensadas para as pessoas.'},
arq:{n:'Arquitetura e Infraestrutura',ico:'05',d:'Microsserviços e cultura DevOps.'},
mentor:{n:'Mentorias e Aprendizado',ico:'06',d:'Acompanhamento da jornada de estudos.'}
};
var estado={q:'',area:'todos'};
var norm=function(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()};

/* ---------- cartões ---------- */
function renderCards(){
  var box=$('#cards');box.innerHTML='';
  var lista=COMPS.map(function(c,i){c.i=i;return c}).filter(function(c){
    return (estado.area==='todos'||c.area===estado.area)&&norm(c.n).indexOf(norm(estado.q))>-1});
  lista.forEach(function(c){
    var url=BASE+'course/view.php?id='+c.id,a=document.createElement('a');
    a.className='card comp reveal';a.href=url;a.target='_blank';a.rel='noopener';
    a.setAttribute('aria-label','Conhecer componente '+c.n);
    a.innerHTML='<div class="thumb">'+
      '<img src="'+c.img+'" alt="Capa do componente '+c.n+'" loading="lazy"></div>'+
      '<div class="comp-b"><span class="cur">Curso Técnico em Desenvolvimento de Sistemas</span><h3>'+c.n+'</h3><p>'+c.d+'</p>'+
      '<span class="btn btn-sm">Conhecer componente →</span></div>';
    box.appendChild(a);
  });
  $('#vazio').hidden=lista.length>0;
  $('#contagem').textContent='Exibindo '+lista.length+' de '+COMPS.length+' componentes';
  observar();
}
function renderFiltros(){
  var f=$('#filtros'),h='<button class="on" data-a="todos">Todos</button>';
  Object.keys(AREAS).forEach(function(k){h+='<button data-a="'+k+'">'+AREAS[k].n+'</button>'});
  f.innerHTML=h;
  f.addEventListener('click',function(e){var b=e.target.closest('button');if(b)setArea(b.dataset.a)});
}
function setArea(a){
  estado.area=a;$$('#filtros button').forEach(function(b){b.classList.toggle('on',b.dataset.a===a)});renderCards();
}
function renderAreas(){
  var g=$('#areasGrid');
  Object.keys(AREAS).forEach(function(k){
    var A=AREAS[k],tags=COMPS.filter(function(c){return c.area===k}).map(function(c){return '<button data-a="'+k+'">'+c.n+'</button>'}).join('');
    var d=document.createElement('article');d.className='card area reveal';
    d.innerHTML='<h3>'+A.n+'</h3><p>'+A.d+'</p><div class="tags">'+tags+'</div>';
    g.appendChild(d);
  });
  g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    $('#busca').value='';estado.q='';setArea(b.dataset.a);$('#componentes').scrollIntoView({behavior:'smooth'})});
}
$('#busca').addEventListener('input',function(e){estado.q=e.target.value;renderCards()});
$('#verTodos').addEventListener('click',function(){$('#busca').value='';estado.q='';setArea('todos')});

/* ---------- animação de entrada ---------- */
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){
  es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
function observar(){$$('.reveal:not(.in)').forEach(function(el){io?io.observe(el):el.classList.add('in')})}

/* ---------- tema claro/escuro ---------- */
$('#themeBtn').addEventListener('click',function(){
  var t=root.getAttribute('data-theme')==='dark'?'light':'dark';
  root.setAttribute('data-theme',t);store('sdt-theme',t)});
if(!store('sdt-theme')&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)root.setAttribute('data-theme','dark');

/* ---------- acessibilidade: fonte e contraste ---------- */
var nivel=parseInt(store('sdt-font')||'0',10),SIZES={'-1':88,'0':100,'1':115,'2':130};
function aplicaFonte(){root.style.setProperty('--fs',SIZES[nivel]+'%')}
function aplicaContraste(c){
  if(c==='normal')root.removeAttribute('data-contrast');else root.setAttribute('data-contrast',c);
  $$('[data-contrast]',$('.a11y')).forEach(function(b){b.setAttribute('aria-pressed',b.dataset.contrast===c)});store('sdt-contrast',c)}
$('.a11y').addEventListener('click',function(e){
  var b=e.target.closest('button');if(!b)return;
  if(b.dataset.font!==undefined){var v=+b.dataset.font;nivel=v===0?0:Math.max(-1,Math.min(2,nivel+v));aplicaFonte();store('sdt-font',nivel)}
  if(b.dataset.contrast)aplicaContraste(b.dataset.contrast)});
$('#a11yReset').addEventListener('click',function(){nivel=0;aplicaFonte();aplicaContraste('normal');
  root.removeAttribute('data-theme');store('sdt-theme',null);store('sdt-font',null);store('sdt-contrast',null)});
aplicaFonte();aplicaContraste(store('sdt-contrast')||'normal');

/* ---------- menu mobile ---------- */
var menu=$('#menu'),burger=$('#burger'),scrim=$('#scrim');
function menuToggle(o){menu.classList.toggle('on',o);scrim.classList.toggle('on',o);burger.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}
burger.addEventListener('click',function(){menuToggle(true)});
$('#menuX').addEventListener('click',function(){menuToggle(false)});
scrim.addEventListener('click',function(){menuToggle(false)});
menu.addEventListener('click',function(e){if(e.target.closest('a'))menuToggle(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')menuToggle(false)});

/* ---------- rolagem: header, link ativo, voltar ao topo ---------- */
var links=$$('.menu a[href^="#"]'),secs=links.map(function(a){return $(a.getAttribute('href'))});
function onScroll(){
  var y=window.scrollY;$('#header').classList.toggle('scrolled',y>10);$('#totop').classList.toggle('on',y>600);
  var atual=0;secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<140)atual=i});
  links.forEach(function(a,i){a.classList.toggle('on',i===atual)})}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
$('#totop').addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});

renderFiltros();renderAreas();renderCards();observar();
})();
