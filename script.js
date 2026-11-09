const header = document.querySelector('header');
const toTop = document.getElementById('to-top');
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav ul li a');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 50 ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none';
  toTop.classList.toggle('show', window.scrollY > 600);

  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const roles = ['Ethical Hacker', 'Network Defender', 'Digital Forensics Learner', 'Security Enthusiast'];
const typedEl = document.getElementById('typed');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const word = roles[roleIndex];
  typedEl.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);

  let delay = deleting ? 45 : 85;

  if (!deleting && charIndex > word.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
    delay = 400;
  }

  setTimeout(type, delay);
}

if (typedEl) type();

const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = form.querySelector('button');
    const data = new FormData(form);

    button.textContent = 'Sending...';
    button.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.innerHTML = `
          <div class="form-success">
            <i class="fas fa-circle-check"></i>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
          </div>
        `;
      } else {
        button.textContent = 'Send Message';
        button.disabled = false;
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      button.textContent = 'Send Message';
      button.disabled = false;
      alert('Network error. Please check your connection.');
    }
  });
}

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();