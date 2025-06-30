const API_KEY = 'ed2dd5cdabee456fddc007705cbd9570'; // Replace with your API key (secure in production)
const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const resultBox = document.getElementById('resultBox');
const forecastSection = document.getElementById('forecastSection');
const btnCurrentWeather = document.getElementById('btn-current-weather');
const btn5DayForecast = document.getElementById('btn-5-day-forecast');
const innerContainer = document.getElementById('innerContainer');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const forecastContainer = document.getElementById('forecastContainer');
const forecastChart = document.getElementById('forecastChart');
const errorDiv = document.getElementById('error');
const cardViewBtn = document.getElementById('cardViewBtn');
const graphViewBtn = document.getElementById('graphViewBtn');
const unitToggle = document.getElementById('unitToggle');
const historyToggle = document.getElementById('historyToggle');
const clearHistory = document.getElementById('clearHistory');
const historyList = document.querySelector('.history-list');

let units = 'metric'; // Default to Celsius
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
let isFetching = false;

// Check for required DOM elements
if (!form || !cityInput || !resultBox || !forecastSection || !errorDiv) {
  console.error('One or more required DOM elements are missing');
}

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

// Initialize button active states
if (btnCurrentWeather && btn5DayForecast) {
  btnCurrentWeather.classList.add('active');
  btnCurrentWeather.addEventListener('click', () => toggleForecastView(true));
  btn5DayForecast.addEventListener('click', () => toggleForecastView(false));
}

// Card vs Graph view toggle
if (cardViewBtn && graphViewBtn) {
  cardViewBtn.addEventListener('click', () => {
    cardViewBtn.classList.add('active');
    graphViewBtn.classList.remove('active');
    forecastContainer.classList.remove('hidden');
    forecastChart.classList.remove('show');
    forecastChart.classList.add('hidden');
  });
  graphViewBtn.addEventListener('click', () => {
    graphViewBtn.classList.add('active');
    cardViewBtn.classList.remove('active');
    forecastContainer.classList.add('hidden');
    forecastChart.classList.remove('hidden');
    forecastChart.classList.add('show');
  });
}

// Sidebar functionality
if (unitToggle && historyToggle && clearHistory && historyList) {
  unitToggle.addEventListener('click', (e) => {
    e.preventDefault();
    units = units === 'metric' ? 'imperial' : 'metric';
    unitToggle.textContent = units === 'metric' ? '🔁 Switch to °F' : '🔁 Switch to °C';
    if (cityInput.value.trim()) {
      form.dispatchEvent(new Event('submit'));
    }
  });

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

// Helper to toggle visibility
function toggleForecastView(showCurrent) {
  if (showCurrent) {
    btnCurrentWeather.classList.add('active');
    btn5DayForecast.classList.remove('active');
    forecastSection.classList.add('hidden');
    weatherResult.classList.remove('hidden');
  } else {
    btnCurrentWeather.classList.remove('active');
    btn5DayForecast.classList.add('active');
    forecastSection.classList.remove('hidden');
    weatherResult.classList.add('hidden');
  }
}

// Show error message
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
  setTimeout(() => errorDiv.classList.add('hidden'), 5000);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (isFetching) return;
  isFetching = true;

  const city = cityInput.value.trim();
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  if (!city) {
    showError('Please enter a city');
    submitBtn.disabled = false;
    isFetching = false;
    return;
  }

  innerContainer.innerHTML = `<div class='loader'></div>`;

  try {
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`);
    if (!weatherRes.ok) throw new Error('City not found');
    const weatherData = await weatherRes.json();
    if (!weatherData || !weatherData.main || !weatherData.weather) {
      throw new Error('Invalid weather data received');
    } 
    console.log(weatherData);
    
    updateUI(weatherData);
    await fetch5_day_forecast(weatherData.name);

    // Update search history
    if (!searchHistory.includes(city)) {
      searchHistory.unshift(city);
      if (searchHistory.length > 5) searchHistory.pop();
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      updateHistoryUI();
    }

    innerContainer.innerHTML = '';
  } catch (error) {
    innerContainer.innerHTML = '';
    showError(error.message);
    console.log(error); // Fixed from console.log(err)
  } finally {
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

// Fetch 5-day forecast
async function fetch5_day_forecast(city) {
  try {
    forecastContainer.innerHTML = '';
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`);
    if (!res.ok) throw new Error('Forecast not found');

    const data = await res.json();

    // Filter one forecast per day (prefer 12:00:00, fallback to first entry)
    const dailyData = {};
    data.list.forEach(entry => {
      const [date] = entry.dt_txt.split(' ');
      if (!dailyData[date] || entry.dt_txt.includes('12:00:00')) {
        dailyData[date] = entry;
      }
    });

    // Display forecast cards
    Object.keys(dailyData).slice(0, 5).forEach(date => {
      const entry = dailyData[date];
      const card = document.createElement('div');
      card.className = 'forecast-card';
      const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      card.innerHTML = `
        <h4>${dayName}</h4>
        <img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png" alt="">
        <p>${Math.round(entry.main.temp)}${units === 'metric' ? '°C' : '°F'}</p>
        <p>${entry.weather[0].main}</p>
      `;
      forecastContainer.appendChild(card);
    });

    forecastContainer.classList.remove('hidden');
    forecastSection.classList.remove('hidden');

    // Prepare chart data
    const labels = [];
    const temps = [];
    Object.keys(dailyData).slice(0, 5).forEach(date => {
      const entry = dailyData[date];
      const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      labels.push(day);
      temps.push(Math.round(entry.main.temp));
    });

    // Destroy previous chart
    if (window.forecastChart instanceof Chart) {
      window.forecastChart.destroy();
    }

    // Create new chart
    const ctx = forecastChart.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }
    window.forecastChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: `Temperature (${units === 'metric' ? '°C' : '°F'})`,
          data: temps,
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderColor: '#007BFF',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#007BFF',
          pointRadius: 5,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              stepSize: 4
            }
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  } catch (error) {
    showError(error.message);
  }
}