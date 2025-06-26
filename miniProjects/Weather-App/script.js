const API_KEY = 'ed2dd5cdabee456fddc007705cbd9570'; // Replace with your OpenWeatherMap API key
const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const resultBox = document.getElementById('weatherResult');

const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const weatherIcon = document.getElementById('weatherIcon');

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
    updateUI(data);
  } catch (error) {
    alert(error.message);
  }
});

function updateUI(data) {
    console.log(data.weather[0].main.toLowerCase()); // Log the data for debugging
    
    
    const weatherCondition = data.weather[0].main.toLowerCase(); // e.g., "clear", "rain", "clouds"
    document.body.className = ""; // reset previous
    document.body.classList.add(weatherCondition); // add new condition as class

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = Math.round(data.main.temp);
  condition.textContent = data.weather[0].main;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  resultBox.classList.remove('hidden');
}
