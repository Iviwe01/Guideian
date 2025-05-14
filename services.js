document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  const howItWorks = document.querySelector('.how-it-works');
  
  // Set "All Services" as active by default
  filterButtons[0].classList.add('active-filter');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active-filter'));
      
      // Add active class to clicked button
      this.classList.add('active-filter');
      
      const filterValue = this.textContent.trim();
      
      // Show/hide services based on filter
      serviceCards.forEach(card => {
        const cardTitle = card.querySelector('.service-title').textContent.trim();
        
        if (filterValue === 'All Services' || filterValue === cardTitle) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Always show the "How It Works" section
      howItWorks.style.display = 'block';
    });
  });
});