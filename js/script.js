/* --- Nav scroll --- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* --- Hamburger --- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* --- Dot grid animado --- */
  const grid = document.getElementById('dotGrid');
  if (grid) {
    const ROWS = 8, COLS = 8;
    const dots = [];
    const palette = ['#613A43','#7EC8C8','#849974','#E3BAB3'];
    for (let i = 0; i < ROWS * COLS; i++) {
      const d = document.createElement('div');
      d.className = 'dot';
      dots.push(d);
      grid.appendChild(d);
    }
    function animateDots() {
      const count = Math.floor(Math.random() * 6) + 3;
      for (let k = 0; k < count; k++) {
        const idx = Math.floor(Math.random() * dots.length);
        const col = palette[Math.floor(Math.random() * palette.length)];
        dots[idx].style.background = col + '55';
        dots[idx].style.transform = 'scale(0.6)';
        setTimeout(() => {
          dots[idx].style.background = 'var(--border)';
          dots[idx].style.transform = 'scale(1)';
        }, 800 + Math.random() * 600);
      }
    }
    setInterval(animateDots, 700);
    animateDots();
  }

  /* --- Scroll reveal --- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  /* --- Accordion de projetos --- */
  function toggleProject(id) {
    const card = document.getElementById(id);
    const body = card.querySelector('.project-body');
    const inner = card.querySelector('.project-body-inner');
    const isOpen = card.classList.contains('open');
    // Fecha todos
    document.querySelectorAll('.project-card').forEach(c => {
      c.classList.remove('open');
      c.querySelector('.project-body').style.maxHeight = '0';
    });
    if (!isOpen) {
      card.classList.add('open');
      body.style.maxHeight = inner.scrollHeight + 40 + 'px';
    }
  }

  /* --- Formulário (simulado) --- */
  function handleSubmit(btn) {
    const original = btn.textContent;
    btn.textContent = 'Enviando…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Mensagem enviada!';
      btn.style.background = 'var(--fresh)';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1200);
  }