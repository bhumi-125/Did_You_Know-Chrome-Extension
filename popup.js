document.addEventListener('DOMContentLoaded', () => {
  const factElement = document.getElementById('fact');
  const anotherFactButton = document.getElementById('another-fact');
  const closeButton = document.getElementById('close');

  function fetchFact() {
    factElement.textContent = 'Loading...';
    factElement.classList.remove('fade-in');
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
      .then(response => response.json())
      .then(data => {
        factElement.textContent = data.text;
        factElement.classList.add('fade-in');
      })
      .catch(error => {
        factElement.textContent = "Oops! Couldn't fetch a fact right now.";
        console.error('Error fetching fact:', error);
      });
  }

  // Fetch initial fact
  fetchFact();

  // Fetch another fact when the button is clicked
  anotherFactButton.addEventListener('click', fetchFact);

  // Close the pop-up when the close button is clicked
  closeButton.addEventListener('click', () => {
    window.close();
  });

  // Add hover effect to the fact card
  const factCard = document.querySelector('.fact-card');
  factCard.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = factCard.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    factCard.style.transform = `
      perspective(1000px)
      rotateY(${(x - 0.5) * 10}deg)
      rotateX(${(y - 0.5) * -10}deg)
    `;
  });

  factCard.addEventListener('mouseleave', () => {
    factCard.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  });
});