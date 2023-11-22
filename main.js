
let cityIdMap={
    'a': '1185241', // Bangladesh
    'b': '4155751', // Florida
    'c': '5128581'  // New York
}

async function getWeatherData(cityId) {
    const apiKey = '85b68f8d9a265d211a5303ed6f1c9027';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        updateWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function selectCity() {
    const dropdown = document.getElementById('mySelect');
    const selectedOption = dropdown.value;
    const selectedCityId = cityIdMap[selectedOption];

    getWeatherData(selectedCityId);
}

function updateWeather(data) {
    document.getElementById('location').innerText = 'Weather Statistics For ' + data.city.name +' Which is Based in ' +data.city.country;

    updateWeatherInfo('today-container', data.list[0]);
    updateWeatherInfo('tomorrow-container', data.list[8]);
    updateWeatherInfo('dayAfter-container', data.list[16]);
}

function updateWeatherInfo(containerId, weatherData) {
    document.getElementById("myAudio").play();
    const container = document.getElementById(containerId);

    const temperature = weatherData.main.temp;
    const weather = weatherData.weather[0].main;
    const date = new Date(weatherData.dt * 1000).toLocaleDateString();
    const realFeel = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;
    const cloudCover = weatherData.clouds.all;
    const visibility = weatherData.visibility;

    container.innerHTML = `
        <div class="container-left">
            <h3>Temp: ${temperature}</h3>
            <h3>Weather: ${weather}</h3>
            <h3>Date: ${date}</h3>
        </div>
        <div class="container-right">
            <p>RealFeel: ${realFeel}</p>
            <p>Humidity: ${humidity}</p>
            <p>Pressure: ${pressure}</p>
            <p>Cloud Cover: ${cloudCover}</p>
            <p>Visibility: ${visibility}</p>
        </div>
    `;

     
}

getWeatherData(cityIdMap['a']);