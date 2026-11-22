document.querySelectorAll('.mini-home').forEach((home) => {
  const slides = [...home.querySelectorAll('.hero-slide')];
  const controls = home.querySelector('.slide-controls');
  const dots = home.querySelector('.slide-dots');

  if (slides.length > 1 && controls && dots) {
    let activeIndex = 0;
    let timer;
    slides.forEach((slide, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Xem ảnh ${index + 1}`);
      dot.classList.toggle('active', index === 0);
      dot.addEventListener('click', () => showSlide(index));
      dots.append(dot);
    });
    const dotButtons = [...dots.children];
    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === activeIndex);
        slide.setAttribute('aria-hidden', String(i !== activeIndex));
      });
      dotButtons.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
    }
    function restart() {
      window.clearInterval(timer);
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        timer = window.setInterval(() => showSlide(activeIndex + 1), 5000);
      }
    }
    controls.querySelector('.previous').addEventListener('click', () => { showSlide(activeIndex - 1); restart(); });
    controls.querySelector('.next').addEventListener('click', () => { showSlide(activeIndex + 1); restart(); });
    home.querySelector('.mini-slider').addEventListener('mouseenter', () => window.clearInterval(timer));
    home.querySelector('.mini-slider').addEventListener('mouseleave', restart);
    restart();
  }

  home.querySelectorAll('.tabs [data-sort]').forEach((tab) => {
    tab.addEventListener('click', () => {
      const grid = home.querySelector('.featured-grid');
      if (!grid) return;
      const cards = [...grid.querySelectorAll('.featured')];
      const sort = tab.dataset.sort;
      cards.sort((a, b) => {
        if (sort === 'price-ascending') return Number(a.dataset.price) - Number(b.dataset.price);
        if (sort === 'price-descending') return Number(b.dataset.price) - Number(a.dataset.price);
        return Number(b.dataset.created) - Number(a.dataset.created);
      }).forEach((card) => grid.append(card));
      home.querySelectorAll('.tabs .tab').forEach((button) => button.classList.toggle('active', button === tab));
    });
  });

  const categorySelect = home.querySelector('.search select');
  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      if (categorySelect.value) {
        const target = [...home.querySelectorAll('.category')].find((link) => link.textContent.trim().startsWith(categorySelect.value));
        if (target) window.location.assign(target.href);
      }
    });
  }
});
