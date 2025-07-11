const API_KEY = 'ed2dd5cdabee456fddc007705cbd9570'; // Replace with your API key (secure in production)
const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const resultBox = document.getElementById('resultBox');
const innerContainer = document.getElementById('innerContainer');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const errorDiv = document.getElementById('error');
const historyToggle = document.getElementById('historyToggle');
const clearHistory = document.getElementById('clearHistory');
const historyList = document.querySelector('.history-list');
const loader = document.getElementById('loader');

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
let isFetching = false;

// Check for required DOM elements
// if (!form || !cityInput || !resultBox || !errorDiv || !weatherResult || !innerContainer || !loader) {
//   console.error('One or more required DOM elements are missing');
// }

// Initialize sidebar
const nav = document.querySelector('.nav-container');
if (nav) {
  const toggle = nav.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-active');
    });
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) {
        nav.classList.remove('is-active');
      }
    });
  }
}

// Sidebar functionality
if (historyToggle && clearHistory && historyList) {
  historyToggle.addEventListener('click', (e) => {
    e.preventDefault();
    historyList.classList.toggle('hidden');
  });

  clearHistory.addEventListener('click', (e) => {
    e.preventDefault();
    searchHistory = [];
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    updateHistoryUI();
  });

  historyList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI' && e.target.textContent !== 'No history available') {
      cityInput.value = e.target.textContent;
      form.dispatchEvent(new Event('submit'));
    }
  });
}

// Update history UI
function updateHistoryUI() {
  historyList.innerHTML = searchHistory.length
    ? searchHistory.map(city => `<li>${city}</li>`).join('')
    : '<li>No history available</li>';
}

// Initialize history
updateHistoryUI();

// Show error message
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
  setTimeout(() => errorDiv.classList.add('hidden'), 5000);
}

// Handle form submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (isFetching) return;
  isFetching = true;

  const city = cityInput.value.trim();
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  loader.classList.remove('hidden');
  resultBox.classList.add('hidden');

  if (!city) {
    showError('Please enter a city');
    submitBtn.disabled = false;
    loader.classList.add('hidden');
    isFetching = false;
    return;
  }

  try {
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!weatherRes.ok) throw new Error('City not found');
    const weatherData = await weatherRes.json();
    if (!weatherData || !weatherData.main || !weatherData.weather) {
      throw new Error('Invalid weather data received');
    }

    updateUI(weatherData);

    // Update search history
    if (!searchHistory.map(c => c.toLowerCase()).includes(city.toLowerCase())) {
      searchHistory.unshift(city);
      if (searchHistory.length > 5) searchHistory.pop();
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      updateHistoryUI();
    }
  } catch (error) {
    showError(error.message);
    console.error('Error fetching weather:', error);
  } finally {
    loader.classList.add('hidden');
    submitBtn.disabled = false;
    isFetching = false;
  }
});

// Update current weather UI
function updateUI(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = Math.round(data.main.temp);
  condition.textContent = data.weather[0].main;
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed;
  const iconCode = data.weather[0].icon || '01d';
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].description || 'Weather Icon';
  weatherResult.classList.remove('hidden');
  resultBox.classList.remove('hidden');
  console.log('Weather Data:', data); // Debug API response
  setWeather(data.weather[0].main.toLowerCase());
}

// Set weather background/overlay
function setWeather(condition) {
  document.body.className = '';
  document.querySelector('.sun').style.display = 'none';
  document.querySelector('.cloudsPart').style.display = 'none';
  document.querySelector('.rainPart').style.display = 'none';

  if (condition.includes('clear')) {
    document.body.classList.add('clear');
    document.querySelector('.sun').style.display = 'block';
  } else if (condition.includes('cloud')) {
    document.body.classList.add('clouds');
    document.querySelector('.cloudsPart').style.display = 'block';
  } else if (condition.includes('rain')) {
    document.body.classList.add('rain');
    document.querySelector('.rainPart').style.display = 'block';
    generateRaindrops(100);
  }
}

// Generate rain drops
function generateRaindrops(count) {
  const container = document.querySelector('.rainPart');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.top = Math.random() * -20 + 'vh';
    drop.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(drop);
  }
}