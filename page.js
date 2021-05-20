let searchInput = document.getElementById("searchInput");
let spinnerEle = document.getElementById("spinner")
let resultOfCountries = document.getElementById("resultCountries");
let countriesList = []
let searchInputValue = "";
createAndAppendCountry = (country) => {
    let countryCard = document.createElement("div");
    countryCard.classList.add("country-card", "col-11", "col-md-5")
    resultOfCountries.appendChild(countryCard);

    //country flag 
    let countryFlag = document.createElement("img");
    countryFlag.src = country.flag;
    countryFlag.classList.add("country-flag")
    countryCard.appendChild(countryFlag)
    //country info 
    let countyInfo = document.createElement("div");
    countyInfo.classList.add("country-info");
    countryCard.appendChild(countyInfo)

    //country name 
    let countryNameE = document.createElement("h1");
    countryNameE.textContent = country.name
    countryNameE.classList.add("country-name");
    countyInfo.appendChild(countryNameE);

    //country population
    let countryPopulation = document.createElement("p");
    countryPopulation.textContent = country.population
    countryPopulation.classList.add("country-population")
    countyInfo.appendChild(countryPopulation)

}


displaySearchResult = () => {
    console.log(countriesList)
    for (let country of countriesList) {
        let countryName = country.name
        countryName = countryName.toLowerCase();
        if (countryName.includes(searchInputValue)) {
            console.log(country)
            createAndAppendCountry(country);
        }
    }
}
searchCountry = () => {
    let url = "https://restcountries.eu/rest/v2/all?fields=name;population;flag"
    let options = {
        method: "GET"
    };
    resultOfCountries.textContent = ""
    spinnerEle.classList.remove("d-none")
    resultOfCountries.classList.add("d-none")
    fetch(url, options)
        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            spinnerEle.classList.add("d-none");
            resultOfCountries.classList.remove("d-none");
            countriesList = jsonData
            displaySearchResult()
        })

}
onChangeSearchInput = (event) => {
    searchInputValue = event.target.value;
    console.log(searchInputValue)
    searchInputValue = searchInputValue.toLowerCase();
    searchCountry();
}
searchCountry();
searchInput.addEventListener("keydown", onChangeSearchInput)
