const searchBtn = document.getElementById("searchBtn");
const inputUserContainer = document.getElementById("searchBar");
searchBtn.addEventListener("click", getSearchResults);
const countryInfo = document.getElementById("countryInfo");

async function getRestCountries(input) {
  const response = await fetch("https://restcountries.com/v3.1/name/" + input);
  const data = await response.json();

  return data;

  /*const newArrayCountries = data.map((country) => {
    return {
      name: country.name.common,
      population: country.population,
      picture: country.flags.png,
    };
  });

  return newArrayCountries;*/
}

async function getSearchResults() {
  countryInfo.innerHTML = "";
  const input = inputUserContainer.value;
  if (input === "") {
    return;
  }

  const countries = await getRestCountries(input);
  console.log(countries);
  if (countries.status === 404) {
    alert("results not found");
  }
  countries.forEach((country) => {
    displayCountry(country);
  });
}

function displayCountry(country) {
  const countryContainer = document.createElement("div");
  const countryName = document.createElement("div");
  countryName.classList.add("country-name");
  const countryPopulation = document.createElement("div");
  countryPopulation.classList.add("country-population");
  countryPopulation.innerText = `Population: ${country.population} `;
  const countryPicture = document.createElement("img");
  countryPicture.classList.add("country-picture");
  countryPicture.src = country.flags.png;
  countryName.innerText = `Name: ${country.name.common}`;
  countryContainer.append(countryName, countryPopulation, countryPicture);
  countryContainer.classList.add("country-details");
  countryInfo.appendChild(countryContainer);
  countryInfo.classList.add("country-details");
  countryName.addEventListener("click", () => {
    console.log(country);
    window.open(country.maps.googleMaps);
  });
}
