const menu=document.querySelector('.menu');
const nav=document.querySelector('nav');
const navLinks=[...document.querySelectorAll('nav a')];
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
navLinks.forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();

const revealItems=[...document.querySelectorAll('.section-heading,.book-feature,.second-book,.project-strip,.timeline article,.contact>*,.reveal-group>*')];
revealItems.forEach((item,index)=>{item.classList.add('reveal');item.style.setProperty('--reveal-index',index%6)});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
revealItems.forEach(item=>revealObserver.observe(item));

const sections=[...document.querySelectorAll('main section[id]')];
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`))}})},{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section=>sectionObserver.observe(section));

const counter=document.querySelector('.counter');
const counterObserver=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)return;const target=Number(counter.dataset.target);const start=performance.now();const duration=1200;const tick=now=>{const progress=Math.min((now-start)/duration,1);counter.textContent=Math.round(target*(1-Math.pow(1-progress,3))).toLocaleString();if(progress<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);counterObserver.disconnect()},{threshold:.7});
counterObserver.observe(counter);

const backToTop=document.querySelector('.back-to-top');
window.addEventListener('scroll',()=>backToTop.classList.toggle('show',window.scrollY>700),{passive:true});
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){revealItems.forEach(item=>item.classList.add('visible'))}
