/* ============================================================
   MÉTODO G.E.L.A — script.js
   Timer, FAQ, Testimonials, Scroll Reveal, Smooth Scroll
   ============================================================ */

/* ===== COUNTDOWN TIMER (15 min, loops) ===== */
(function () {
  const DURATION_MS = 15 * 60 * 1000; // 15 minutes

  function pad(n) { return String(n).padStart(2, '0'); }

  function getEnd() {
    const stored = localStorage.getItem('gela_timer_end_v2');
    const now = Date.now();
    if (stored) {
      const end = parseInt(stored, 10);
      if (end > now) return end;
    }
    const newEnd = now + DURATION_MS;
    localStorage.setItem('gela_timer_end_v2', newEnd);
    return newEnd;
  }

  let endTime = getEnd();

  function tick() {
    const now = Date.now();
    let diff = endTime - now;

    if (diff <= 0) {
      // Reset and restart
      endTime = Date.now() + DURATION_MS;
      localStorage.setItem('gela_timer_end_v2', endTime);
      diff = DURATION_MS;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;

    const elM = document.getElementById('timer-m');
    const elS = document.getElementById('timer-s');
    if (elM) elM.textContent = pad(m);
    if (elS) elS.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);
})();

/* ===== FAQ ACCORDION ===== */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Expose globally for inline onclick
window.toggleFaq = toggleFaq;

/* ===== TESTIMONIALS DATA ===== */
const testimonials = [
  {
    name: 'Ana Cláudia S.',
    location: 'São Paulo, SP',
    text: 'Comecei do zero e em 3 semanas já estava vendendo 200 geladinhos por semana! O método é incrível, simples e muito prático. 😍',
    avatar: '#e8537a',
    initials: 'AC'
  },
  {
    name: 'Fernanda Lima',
    location: 'Fortaleza, CE',
    text: 'Nunca pensei que geladinho pudesse dar tanto lucro. Com o G.E.L.A aprendi a precificar certo e meu faturamento triplicou!',
    avatar: '#d4933c',
    initials: 'FL'
  },
  {
    name: 'Mariana Costa',
    location: 'Belo Horizonte, MG',
    text: 'O módulo de estratégia de sabores é ouro! Parei de vender o que eu gostava e comecei a vender o que o cliente quer. Resultado: fila de pedidos!',
    avatar: '#9b59b6',
    initials: 'MC'
  },
  {
    name: 'Juliana Reis',
    location: 'Salvador, BA',
    text: 'Minha maior dificuldade era a textura. Depois do G.E.L.A, meus geladinhos ficaram cremosos demais e meus clientes estão viciados! ❤️',
    avatar: '#2a9d5c',
    initials: 'JR'
  },
  {
    name: 'Priscila Alves',
    location: 'Recife, PE',
    text: 'Em poucos dias recuperei o investimento. Hoje faturando R$ 2.800 por mês com geladinhos. Não tem desculpa pra não começar!',
    avatar: '#e8537a',
    initials: 'PA'
  },
  {
    name: 'Tatiane Moura',
    location: 'Cuiabá, MT',
    text: 'Moro numa cidade quente e o método foi perfeito! Aprendi quais sabores explodem nas vendas no calor. Melhor investimento que já fiz!',
    avatar: '#d4933c',
    initials: 'TM'
  },
  {
    name: 'Carla Mendes',
    location: 'Goiânia, GO',
    text: 'Em 2 meses consegui pagar minha conta de luz, internet e ainda sobrou. Tudo graças ao Método G.E.L.A. Recomendo de olhos fechados! 🍦',
    avatar: '#9b59b6',
    initials: 'CM'
  },
  {
    name: 'Débora Santos',
    location: 'Manaus, AM',
    text: 'A planilha de precificação do bônus mudou tudo! Eu vendia barato sem saber. Agora sei o quanto vale cada geladinho e meu lucro disparou.',
    avatar: '#2a9d5c',
    initials: 'DS'
  }
];

function buildTestimonials() {
  const row = document.getElementById('marquee-row');
  if (!row) return;

  // Duplicate array for seamless infinite scroll
  const all = [...testimonials, ...testimonials];

  all.forEach(t => {
    const card = document.createElement('div');
    card.className = 'testi-card';
    card.innerHTML = `
      <div class="testi-stars">★★★★★</div>
      <p class="testi-quote">"${t.text}"</p>
      <div class="testi-author">
        <div class="testi-avatar" style="background:${t.avatar}">${t.initials}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-location">${t.location}</div>
        </div>
      </div>
    `;
    row.appendChild(card);
  });
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  buildTestimonials();
  initScrollReveal();
  initSmoothScroll();
});
