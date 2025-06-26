function setWeather(condition) {
  // Remove previous classes
  document.body.className = '';

  // Add new class for theme
  document.body.classList.add(condition);

  // Toggle animated elements
  document.querySelector('.sun').style.display = (condition === 'sunny') ? 'block' : 'none';
  document.querySelector('.clouds').style.display = (condition === 'cloudy') ? 'block' : 'none';
  document.querySelector('.rain').innerHTML = ''; // Clear previous raindrops
  document.querySelector('.rain').style.display = (condition === 'rainy') ? 'block' : 'none';

  // Generate raindrops if rainy
  if (condition === 'rainy') {
    generateRaindrops(100); // Number of droplets
  }
}

function generateRaindrops(count) {
  const container = document.querySelector('.rain');
  for (let i = 0; i < count; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.top = Math.random() * -20 + 'vh'; // start above view
    drop.style.animationDelay = Math.random() * 2 + 's'; // vary speed
    container.appendChild(drop);
  }
}