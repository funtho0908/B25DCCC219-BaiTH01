'use strict';
const menuButton=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
menuButton.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Đóng menu':'Mở menu');menuButton.textContent=open?'✕':'☰';});
navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Mở menu');menuButton.textContent='☰';}));
const themeButton=document.querySelector('.theme-toggle');
const storedTheme=localStorage.getItem('portfolio-theme');
if(storedTheme==='dark'){document.body.classList.add('dark');}
function updateThemeIcon(){themeButton.textContent=document.body.classList.contains('dark')?'☀️':'🌙';}
updateThemeIcon();
themeButton.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('portfolio-theme',document.body.classList.contains('dark')?'dark':'light');updateThemeIcon();});
const searchInput=document.querySelector('#project-search');
const filterButtons=document.querySelectorAll('.filter');
const projects=document.querySelectorAll('.project-card');
let activeFilter='all';
function filterProjects(){const keyword=searchInput.value.trim().toLocaleLowerCase('vi');let visible=0;projects.forEach(project=>{const tags=project.dataset.tags.split(' ');const text=project.dataset.search.toLocaleLowerCase('vi');const match=(activeFilter==='all'||tags.includes(activeFilter))&&text.includes(keyword);project.hidden=!match;if(match)visible++;});document.querySelector('#no-projects').hidden=visible>0;}
searchInput.addEventListener('input',filterProjects);
filterButtons.forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;filterButtons.forEach(b=>b.classList.toggle('active',b===button));filterProjects();}));
const message=document.querySelector('#message');
const charCount=document.querySelector('#char-count');
message.addEventListener('input',()=>{charCount.textContent=`${message.value.length}/500 ký tự`;});
const form=document.querySelector('#contact-form');
form.addEventListener('submit',event=>{event.preventDefault();const name=document.querySelector('#name').value.trim();const email=document.querySelector('#email').value.trim();const msg=message.value.trim();const errors={name:'',email:'',message:''};if(name.length<2)errors.name='Họ tên phải có ít nhất 2 ký tự.';else if(name.length>60)errors.name='Họ tên không được quá 60 ký tự.';if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))errors.email='Vui lòng nhập email hợp lệ.';if(msg.length<10)errors.message='Lời nhắn phải có ít nhất 10 ký tự.';else if(msg.length>500)errors.message='Lời nhắn tối đa 500 ký tự.';Object.entries(errors).forEach(([field,error])=>{document.querySelector(`#${field}-error`).textContent=error;document.querySelector(`#${field}`).setAttribute('aria-invalid',String(Boolean(error)));});const status=document.querySelector('#form-status');if(Object.values(errors).some(Boolean)){status.textContent='Vui lòng sửa các thông tin chưa hợp lệ.';status.style.color='#e11d48';}else{status.textContent='Thông tin hợp lệ! Đây là form minh họa, chưa gửi đến máy chủ.';status.style.color='#16a34a';}});
if('IntersectionObserver' in window){const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
document.querySelector('#year').textContent=new Date().getFullYear();
