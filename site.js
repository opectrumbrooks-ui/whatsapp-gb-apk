const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  mobileNav?.classList.toggle('open', open);
});
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const options = {
  privacidade: { title:'Ajuste quem vê sua atividade.', text:'O WhatsApp oficial permite revisar presença online, foto, Status e grupos nas configurações de privacidade.', guide:'/guias/privacidade-whatsapp-gb-online/', label:'Ler o guia de privacidade' },
  contas: { title:'Considere a alternância oficial.', text:'A documentação do WhatsApp descreve duas contas no mesmo celular para quem controla dois números e usa dispositivo compatível.', guide:'/guias/duas-contas-whatsapp-sem-mod/', label:'Ver como funcionam duas contas' },
  midia: { title:'Experimente o envio em HD.', text:'Fotos e vídeos em HD são uma função documentada do WhatsApp oficial. Para arquivo original, compare a opção de documento.', guide:'/guias/fotos-hd-whatsapp-sem-gb/', label:'Entender mídia em HD' },
  negocios: { title:'Avalie o WhatsApp Business.', text:'Perfil comercial e ferramentas de atendimento são oferecidos pelo aplicativo oficial voltado a pequenos negócios.', guide:'/guias/whatsapp-business-ou-gb/', label:'Comparar opções para negócios' }
};
document.querySelectorAll('[data-decision]').forEach(button => button.addEventListener('click', () => {
  const choice = options[button.dataset.decision];
  if (!choice) return;
  document.querySelectorAll('[data-decision]').forEach(item => { const active=item===button; item.classList.toggle('active',active); item.setAttribute('aria-pressed',String(active)); });
  document.querySelector('#answer-title').textContent=choice.title;
  document.querySelector('#answer-text').textContent=choice.text;
  const link=document.querySelector('#answer-guide');
  link.href=choice.guide;
  link.innerHTML=`${choice.label} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>`;
}));

const search=document.querySelector('#guide-search');
const filters=document.querySelectorAll('[data-category]');
const cards=document.querySelectorAll('.all-guides .guide-card');
const count=document.querySelector('#guide-count');
const empty=document.querySelector('#guide-empty');
let activeCategory='Todos';
function applyFilters(){
  const query=(search?.value||'').trim().toLocaleLowerCase('pt-BR');
  let visible=0;
  cards.forEach(card=>{const category=card.querySelector('.badge')?.textContent||'';const show=(activeCategory==='Todos'||category===activeCategory)&&card.textContent.toLocaleLowerCase('pt-BR').includes(query);card.hidden=!show;if(show)visible++;});
  if(count)count.textContent=`${visible} ${visible===1?'guia disponível':'guias disponíveis'}`;
  if(empty)empty.hidden=visible!==0;
}
search?.addEventListener('input',applyFilters);
filters.forEach(button=>button.addEventListener('click',()=>{activeCategory=button.dataset.category;filters.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});applyFilters();}));

document.querySelectorAll('[data-copy-link]').forEach(button=>button.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(location.href);button.textContent='Link copiado';setTimeout(()=>{button.textContent='Copiar link'},2200);}catch{button.textContent='Copie o endereço do navegador';}
}));
