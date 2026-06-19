const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://newsapi.org/v2/top-headlines";

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
        const articles = data.articles || data.data || [];
        renderNews(articles);
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

/**
 * Renders the articles array dynamically as cards inside #news-grid
 * @param {Array} articles - Array of article objects
 */
function renderNews(articles) {
    const newsGrid = document.getElementById("news-grid");
    if (!newsGrid) return;

    newsGrid.innerHTML = "";

    if (!articles || articles.length === 0) {
        newsGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted); font-weight: 500;">
                No articles found. Try a different query.
            </div>
        `;
        return;
    }

    articles.forEach(article => {
        const card = document.createElement("article");
        card.classList.add("news-card");

        const imageUrl = article.urlToImage || article.image || "";
        const imageHTML = imageUrl 
            ? `<img src="${imageUrl}" alt="${article.title}" class="news-card-image" onerror="this.style.display='none'">` 
            : "";

        card.innerHTML = `
            ${imageHTML}
            <div class="news-card-content">
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-description">${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-card-link">Read More &rarr;</a>
            </div>
        `;
        newsGrid.appendChild(card);
    });
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
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                // Remove active states from categories when searching to be clean
                const currentActive = categoriesNav ? categoriesNav.querySelector(".category-btn.active") : null;
                if (currentActive) {
                    currentActive.classList.remove("active");
                }
                
                const url = `${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
                fetchNews(url);
                searchInput.value = "";
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", init);
