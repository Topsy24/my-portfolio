// ── 1. Navbar: Add shadow when user scrolls down ──
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
  } else {
    header.style.boxShadow = 'none';
  }
});


// ── 2. Active nav link highlights based on which section you're in ──
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});


// ── 3. Fade-in animation as sections scroll into view ──
const fadeElements = document.querySelectorAll('section, .project-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));


// ── 4. Form: Show a thank you message after submission ──
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


// ── 5. Mobile menu toggle ──
const menuToggle = document.createElement('button');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').appendChild(menuToggle);

const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const isOpen = navMenu.classList.contains('open');
  menuToggle.innerHTML = isOpen
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});