// scripts/modal.js
document.addEventListener('DOMContentLoaded', () => {
  const subscribeBtn = document.getElementById('subscribeBtn');
  const subscribeModal = document.getElementById('subscribeModal');
  const modalClose = document.getElementById('modalClose');
  const modalSubmit = document.getElementById('modalSubmit');
  
  // Show modal on first visit after 3 seconds if not previously shown.
  if (!localStorage.getItem('modalShown')) {
    setTimeout(() => {
      subscribeModal.showModal();
      localStorage.setItem('modalShown', 'true');
    }, 3000);
  }
  
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      subscribeModal.showModal();
    });
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      subscribeModal.close();
    });
  }
  
  if (modalSubmit) {
    modalSubmit.addEventListener('click', () => {
      subscribeModal.close();
    });
  }
  
  // Close modal if clicking outside its content.
  subscribeModal.addEventListener('click', (e) => {
    const rect = subscribeModal.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      subscribeModal.close();
    }
  });
});