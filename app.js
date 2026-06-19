const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://newsapi.org/v2/top-headlines";

async function fetchNews(queryUrl) {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) {
        spinner.style.display = "block";
    }

    const response = await fetch(queryUrl);

    if (spinner) {
        spinner.style.display = "none";
    }

    const data = await response.json();
    console.log(data);
}

function init() {
    const url = `${BASE_URL}?category=general&apiKey=${API_KEY}`;
    fetchNews(url);
}

document.addEventListener("DOMContentLoaded", init);
