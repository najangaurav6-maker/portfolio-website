// Reveal on scroll
const onScroll = () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('show');
    }
  });
};
document.addEventListener('scroll', onScroll);
window.addEventListener('load', () => {
  onScroll();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Contact form mailto fallback
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    // Basic validation
    if (!data.get('name') || !data.get('email') || !data.get('message')) {
      if (status) status.textContent = 'Please fill out all fields before submitting.';
      return;
    }

    const subject = encodeURIComponent('New inquiry from portfolio');
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nMessage:\n${data.get('message')}`
    );

    // Mailto fallback
    window.location.href = `mailto:webdesignergn@gmail.com?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent =
        'Opening your email app… If it doesn’t open, email me directly at webdesignergn@gmail.com.';
    }

    // Reset form after submission
    form.reset();
  });
}

// Lightweight conversion tracking (contact link clicks)
document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], a[href*="instagram.com"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('Conversion: contact click', link.href);

    // Optional: send to analytics endpoint
    // fetch('/track', { method: 'POST', body: JSON.stringify({ type: 'contact', href: link.href }) });
  });
});
