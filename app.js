const API_KEY = "YOUR_API_KEY_HERE";

async function fetchNews(queryUrl) {
    const spinner = document.getElementById("loading-spinner");
    try {
        if (spinner) {
            spinner.style.display = "block";
        }

        const response = await fetch(queryUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (spinner) {
            spinner.style.display = "none";
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        if (spinner) {
            spinner.style.display = "none";
        }
        console.error(error);
        
        const newsGrid = document.getElementById("news-grid");
        if (newsGrid) {
            newsGrid.innerHTML = `
                <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-color); font-weight: 500;">
                    Unable to load news. Please try again later.
                </div>
            `;
        }
    }
}
