document.addEventListener('DOMContentLoaded', () => {
  window.setTimeout(() => {
    document.body.classList.add('loaded');
  }, 200);

  const revealItems = document.querySelectorAll('.reveal');

  if (!revealItems.length) {
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.08}s`;
    observer.observe(item);
  });

  const modal = document.getElementById('productModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalPrice = document.querySelector('.modal-price');
  const modalImage = document.querySelector('.modal-image img');
  const closeButton = document.querySelector('.modal-close');

  if (!modal || !modalTitle || !modalDescription || !modalPrice || !modalImage || !closeButton) {
    return;
  }

  const openModal = (item) => {
    modalTitle.textContent = item.dataset.name || '商品名';
    modalDescription.textContent = item.dataset.description || '商品の説明';
    modalPrice.textContent = item.dataset.price || '¥0';
    modalImage.src = item.dataset.image || '';
    modalImage.alt = item.dataset.name || '商品画像';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.menu-item').forEach((item) => {
    item.addEventListener('click', () => openModal(item));

    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(item);
      }
    });
  });

  closeButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.close === 'true') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
});
