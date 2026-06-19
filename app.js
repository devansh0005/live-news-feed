const API_KEY = "YOUR_API_KEY_HERE";

async function fetchNews(queryUrl) {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) {
        spinner.style.display = "block";
    }

    const response = await fetch(queryUrl);

    if (spinner) {
        spinner.style.display = "none";
    }
}
