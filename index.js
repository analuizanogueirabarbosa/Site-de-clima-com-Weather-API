// variavel e selecao de elemento

const apiKey = 'cdaf9f9e2d32ad50510f2185f1bbd911';


const cityInput = document.querySelector('#city-input') // input cidade
const searchBtn = document.querySelector('#search') // botao search

// --------

const cityElement = document.querySelector('#city') // nome cidade
const tempElement = document.querySelector('#temperature span') // temperatura
const descElement = document.querySelector('#description') // descricao
const weatherIconElement = document.querySelector('#weather-icon') // icone temperatura
const countryElement = document.querySelector('#country') // bandeira pais
const humidityElement = document.querySelector('#humidity span') // umidade
const windElement = document.querySelector('#wind span') // vento


const weatherContainer = document.querySelector('#weather-data');

// Funcao p consultar dado da api
// Funcao assincrona pra esperar os dados

const getWeatherData = async(city) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL) // fetch api, await = esperar o fetch
    const data = await res.json() // transforma os dados em json

    return data;
}

// Funcao dom, fica assincrona para esperar os dados para nao receber uma promise
const showWeatherData = async (city) =>{
    const data = await getWeatherData (city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp); // deixará a temperatura em numero inteiro
    descElement.innerText = data.weather[0].description; // descricao do tempo
    weatherIconElement.setAttribute('src',`http://openweathermap.org/img/wn${data.weather[0].icon}.png`); // p acessar icon
    countryElement.setAttribute('src', apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove('hide')

   
};

// Eventos click botao (e) funcao anonima

searchBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);

});
// Enter funcionar ao pesquisar

cityInput.addEventListener('keyup', (e) =>{
    const city = e.target.value
    showWeatherData(city)
})