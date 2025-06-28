const API_KEY = 'ed2dd5cdabee456fddc007705cbd9570'; // Replace with your actual API key
const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const forecastSection = document.getElementById('forecastSection');

// Weather elements
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

// Forecast elements
const forecastContainer = document.getElementById('forecastContainer');
const forecastChart = document.getElementById('forecastChart');

// Weather effects
const sun = document.querySelector('.sun');
const clouds = document.querySelector('.clouds');
const rain = document.querySelector('.rain');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        // Fetch current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!currentResponse.ok) {
            throw new Error('City not found');
        }

        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);
        
        // Fetch forecast
        await fetchForecast(currentData.name);
        
        // Set weather effects
        setWeatherEffects(currentData.weather[0].main.toLowerCase());
        
        // Show results
        weatherResult.classList.remove('hidden');
    } catch (error) {
        alert(error.message);
        console.error('Error:', error);
    }
});

function displayCurrentWeather(data) {
    // Log the data for debugging
    console.log(data);
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = Math.round(data.main.temp);
    condition.textContent = data.weather[0].main;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    humidity.textContent = data.main.humidity;
    wind.textContent = Math.round(data.wind.speed * 3.6);
}

async function fetchForecast(city) {
    try {
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!forecastResponse.ok) {
            throw new Error('Forecast not available');
        }

        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
        forecastSection.style.display = 'block';
    } catch (error) {
        console.error('Forecast error:', error);
    }
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';
    const dailyData = {};
    const labels = [];
    const temps = [];

    // Process forecast data
    data.list.forEach(entry => {
        const date = entry.dt_txt.split(' ')[0];
        if (!dailyData[date]) {
            dailyData[date] = entry;
            const day = new Date(entry.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            labels.push(day);
            temps.push(Math.round(entry.main.temp));
        }
    });

    // Create forecast cards
    Object.keys(dailyData).slice(0, 5).forEach(date => {
        const entry = dailyData[date];
        const day = new Date(entry.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <h4>${day}</h4>
            <img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}.png" alt="${entry.weather[0].main}">
            <p>${Math.round(entry.main.temp)}°C</p>
            <p>${entry.weather[0].main}</p>
        `;
        forecastContainer.appendChild(card);
    });

    // Create chart
    createChart(labels, temps);
}

function createChart(labels, data) {
    // Destroy previous chart if exists
  // Check if previous chart exists and is a valid Chart instance
if (window.forecastChart instanceof Chart) {
  window.forecastChart.destroy();
}

    const ctx = forecastChart.getContext('2d');
    window.forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: data,
                backgroundColor: 'rgba(67, 97, 238, 0.2)',
                borderColor: '#4361ee',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function setWeatherEffects(condition) {
    // Reset all effects
    document.body.className = '';
    sun.style.display = 'none';
    clouds.style.display = 'none';
    rain.style.display = 'none';

    // Set appropriate effect based on weather condition
    switch(condition) {
        case 'clear':
            document.body.classList.add('clear');
            sun.style.display = 'block';
            break;
        case 'clouds':
            document.body.classList.add('clouds');
            clouds.style.display = 'block';
            break;
        case 'rain':
        case 'drizzle':
            document.body.classList.add('rain');
            rain.style.display = 'block';
            break;
        default:
            document.body.classList.add('clear');
            sun.style.display = 'block';
    }
}