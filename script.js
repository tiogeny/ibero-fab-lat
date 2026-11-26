document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isHidden = mobileNav.hasAttribute('hidden');
      if (isHidden) {
        mobileNav.removeAttribute('hidden');
        menuToggle.setAttribute('aria-expanded', 'true');
      } else {
        mobileNav.setAttribute('hidden', '');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.setAttribute('hidden', '');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const nodeCards = document.querySelectorAll('.node-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const region = btn.dataset.region;

      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      nodeCards.forEach((card) => {
        if (region === 'all' || card.dataset.region === region) {
          card.removeAttribute('hidden');
        } else {
          card.setAttribute('hidden', '');
        }
      });
    });
  });

  const joinForm = document.getElementById('joinForm');
  const formFeedback = document.getElementById('formFeedback');

  if (joinForm && formFeedback) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const country = document.getElementById('country').value;
      const program = document.getElementById('program').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !country || !message) {
        formFeedback.textContent = 'Por favor completa todos los campos requeridos.';
        formFeedback.className = 'form-feedback error';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formFeedback.textContent = 'Ingresa un correo electrónico válido.';
        formFeedback.className = 'form-feedback error';
        return;
      }

      formFeedback.textContent = `¡Gracias, ${name}! Tu solicitud desde ${country} (${program}) ha sido registrada para ibero.fab.lat.`;
      formFeedback.className = 'form-feedback success';
      joinForm.reset();
    });
  }
});
