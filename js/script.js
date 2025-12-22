// Prosty skrypt: obsługa menu mobilnego, przewijanie i walidacja formularza
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
    nav.setAttribute('aria-hidden', 'false');
    toggle.classList.add('open');
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    nav.setAttribute('aria-hidden', 'true');
    toggle.classList.remove('open');
  }

  toggle && toggle.addEventListener('click', (e) => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded)
      closeMenu();
    else
      openMenu();
  });

  // Smooth scroll and close menu when a link is clicked
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        if (nav && nav.contains(this)) closeMenu();
        target.scrollIntoView({behavior: 'smooth'});
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Close when clicking outside nav on mobile
  document.addEventListener('click', function(e) {
    if (!nav || !toggle) return;
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnToggle = toggle.contains(e.target);
    if (!isClickInsideNav && !isClickOnToggle &&
        nav.classList.contains('open')) {
      closeMenu();
    }
  });

  // Reset nav when resizing to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 800) {
      nav.classList.remove('open');
      nav.style.display = '';
      nav.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      nav.setAttribute('aria-hidden', 'true');
    }
  });

  // Prosta walidacja formularza
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = form.querySelector('#name');
      const phone = form.querySelector('#phone');

      if (!name.value.trim() || !phone.value.trim()) {
        alert('Proszę podać imię i numer telefonu.');
        return;
      }

      // Tu można dodać wysyłkę przez fetch do backendu
      alert(
          'Dziękujemy! Twoje zapytanie zostało wysłane. Skontaktujemy się wkrótce.');
      form.reset();
    });
  }
  // Przycisk "Zadzwoń" — zawsze widoczny
  const callButton = document.getElementById('callButton');
  if (callButton) {
    // Upewnij się, że nie ma klasy ukrywającej i pozostaw przycisk widoczny
    callButton.classList.remove('hidden');
  }
});