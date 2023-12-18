document.addEventListener("DOMContentLoaded", function() {
  var backToTopButton = document.getElementById('back-to-top');

  // Scroll Event
  window.onscroll = function() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          backToTopButton.style.display = "block";
      } else {
          backToTopButton.style.display = "none";
      }
  };

  // Click Event
  backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({top: 0, behavior: 'smooth'});
  });
});
