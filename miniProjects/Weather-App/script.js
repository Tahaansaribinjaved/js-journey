const API_KEY = 'ed2dd5cdabee456fddc007705cbd9570'; // Replace with your OpenWeatherMap API key
const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const resultBox = document.getElementById('weatherResult');

const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const weatherIcon = document.getElementById('weatherIcon');

// document.getElementById("toggleSidebar").addEventListener("click", () => {
//   const sidebar = document.getElementById("sidebar");
//   sidebar.classList.toggle("open");
// });
const nav = document.querySelector('.nav-container');

if (nav) {
  const toggle = nav.querySelector('.nav-toggle');

  if (toggle) {
    // When the toggle button is clicked, toggle the menu open/close
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-active');
    });

    // When clicking outside the menu, close it
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) {
        nav.classList.remove('is-active');
      }
    });
  }
}


const btnCurrentWeather = document.getElementById('btn-current-weather');
const btn5DayForecast = document.getElementById('btn-5-day-forecast');
const innerContainer = document.getElementById('innerContainer');



form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (city === '') {
    alert('Please enter a city');
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error('City not found');
    }

    const data = await res.json();
    console.log(data); // Log the data for debugging
    await fetch5_day_forecast(data.name); // Fetch and display the 5-day forecast
    // cityInput.value = ''; // Clear the input field after submission
    setWeather(data.weather[0].main.toLowerCase()); // Set the weather condition for UI
    updateUI(data);
  } catch (error) {
    alert(error.message);
  }
});

function updateUI(data) {
    // console.log(data.weather[0].main.toLowerCase()); // Log the data for debugging
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = Math.round(data.main.temp);
  condition.textContent = data.weather[0].main;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  resultBox.classList.remove('hidden');
}
// Example for toggling classes and display
function setWeather(condition) {
  // Remove all specific classes
  document.body.className = ''; 

  // Always hide all overlays first
  document.querySelector('.sun').style.display = 'none';
  document.querySelector('.cloudsPart').style.display = 'none';
  document.querySelector('.rainPart').style.display = 'none';

  // Add class and show overlay based on condition
  if (condition === 'clear') {
    document.body.classList.add('clear');
    document.querySelector('.sun').style.display = 'block';

  } else if (condition === 'clouds') {
    document.body.classList.add('clouds');
    document.querySelector('.cloudsPart').style.display = 'block';

  } else if (condition === 'rain') {
    document.body.classList.add('rain');
    document.querySelector('.rainPart').style.display = 'block';
    generateRaindrops(100);
  }
}

function generateRaindrops(count) {
  const container = document.querySelector('.rainPart');
  for (let i = 0; i < count; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.top = Math.random() * -20 + 'vh'; // start above view
    drop.style.animationDelay = Math.random() * 2 + 's'; // vary speed
    container.appendChild(drop);
  }
}


const fetch5_day_forecast = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error('City not found');
    }

    const data = await res.json();
    console.log(data); // Log the 5-day forecast data for debugging
    const forecastContainer = document.getElementById('forecastContainer');
forecastContainer.innerHTML = ''; // Clear previous

const dailyData = {};

// Filter one reading per day (e.g., 12:00:00)
data.list.forEach(entry => {
  const date = entry.dt_txt.split(' ')[0];
  const time = entry.dt_txt.split(' ')[1];
  if (time === "12:00:00") {
    dailyData[date] = entry;
  }
});

// Loop through 5 days max
Object.keys(dailyData).slice(0, 5).forEach(date => {
  const entry = dailyData[date];
  const card = document.createElement('div');
  card.className = 'forecast-card';

  const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

  card.innerHTML = `
    <h4>${dayName}</h4>
    <img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png" alt="">
    <p>${Math.round(entry.main.temp)}°C</p>
    <p>${entry.weather[0].main}</p>
  `;

  forecastContainer.appendChild(card);
});

forecastContainer.classList.remove('hidden');
document.getElementById('forecastSection').classList.remove('hidden');
// Prepare data for Chart
const labels = [];
const temps = [];

Object.keys(dailyData).slice(0, 5).forEach(date => {
  const entry = dailyData[date];
  const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
  labels.push(day);
  temps.push(Math.round(entry.main.temp));
});

// Destroy previous chart if any
// Check if previous chart exists and is a valid Chart instance
if (window.forecastChart instanceof Chart) {
  window.forecastChart.destroy();
}

// Create new chart
const ctx = document.getElementById('forecastChart').getContext('2d');
window.forecastChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Temperature (°C)',
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
          stepSize: 4 // Adjust step size for better readability
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
document.getElementById('forecastChart').classList.add('show');


  } catch (error) {
    alert(error.message);
  }
}
// Example usage

