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

    const categoriesNav = document.querySelector(".categories-nav");
    if (categoriesNav) {
        categoriesNav.addEventListener("click", (event) => {
            if (event.target.classList.contains("category-btn")) {
                const currentActive = categoriesNav.querySelector(".category-btn.active");
                if (currentActive) {
                    currentActive.classList.remove("active");
                }
                event.target.classList.add("active");

                const category = event.target.textContent.trim().toLowerCase();
                const url = `${BASE_URL}?category=${category}&apiKey=${API_KEY}`;
                fetchNews(url);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", init);
