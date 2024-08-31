const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityname");
const card = document.querySelector(".card");
const api = "adcb4502d9dbfe17f4ee8c5adcdc7734";

weatherform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityinput.value;

    if (city) {
        try {
            const weather = await getweatherdata(city);
            displayweather(weather);
        } catch (error) {
            console.error(error);
            displayError("Error fetching weather data. Please try again.");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getweatherdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
}

function displayweather(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }],
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const temp1 = document.createElement("p");
    const humidity1 = document.createElement("p");
    const describe1 = document.createElement("p");
    const emoji1 = document.createElement("p");

    citydisplay.textContent = city;
    temp1.textContent = `${(temp - 273.15).toFixed(1)} °C`;
    humidity1.textContent = `Humidity: ${humidity}%`;
    describe1.textContent = description;
    emoji1.textContent = emoji(id);

    citydisplay.classList.add("citydisplay");
    temp1.classList.add("temp");
    humidity1.classList.add("humidity");
    describe1.classList.add("describe");
    emoji1.classList.add("emoji");

    card.appendChild(citydisplay);
    card.appendChild(temp1);
    card.appendChild(humidity1);
    card.appendChild(describe1);
    card.appendChild(emoji1);
}

function emoji(weatherId) {
    switch (true) {
        case weatherId >= 200 && weatherId < 300:
            return "⛈";
        case weatherId >= 300 && weatherId < 400:
            return "🌧";
        case weatherId >= 500 && weatherId < 600:
            return "🌦";
        case weatherId >= 600 && weatherId < 700:
            return "🌨";
        case weatherId >= 700 && weatherId < 800:
            return "🌫";
        case weatherId === 800:
            return "☀";
        case weatherId > 800:
            return "🌤";
        default:
            return "😎";
    }
}

function displayError(message) {
    const display = document.createElement("p");
    display.textContent = message;
    display.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(display);
}
