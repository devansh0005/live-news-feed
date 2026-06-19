// ─── Config ───────────────────────────────────────────────────────────────────
// GNews API is CORS-friendly and works from local file:// and GitHub Pages.
// Free tier: 100 req/day. Get your own key at https://gnews.io
const GNEWS_API_KEY = "pub_demo"; // replace with your own GNews key if you have one
const GNEWS_BASE    = "https://gnews.io/api/v4";

// ─── Mock data ─────────────────────────────────────────────────────────────────
// Used when the API key is placeholder or the network request fails.
const MOCK_ARTICLES = {
    general: [
        {
            title: "Global Leaders Meet to Discuss Climate Action Roadmap",
            description: "World leaders gathered in Geneva this week for a landmark summit aimed at finalizing commitments to reduce carbon emissions by 2035.",
            url: "https://example.com/climate-summit",
            image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format",
            source: { name: "World News Daily" },
            publishedAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
            title: "Breakthrough in Renewable Energy Storage Announced",
            description: "Scientists have developed a new battery technology that could store solar energy for up to 18 months, revolutionizing the clean energy sector.",
            url: "https://example.com/energy-storage",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format",
            source: { name: "Science Today" },
            publishedAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
            title: "Space Agency Confirms Plans for Lunar Base by 2032",
            description: "A multinational space agency coalition has confirmed ambitious plans to establish a permanent lunar base within the next decade.",
            url: "https://example.com/lunar-base",
            image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&auto=format",
            source: { name: "Space Insider" },
            publishedAt: new Date(Date.now() - 10800000).toISOString()
        },
        {
            title: "New Study Reveals Benefits of Mediterranean Diet",
            description: "A decade-long study has found that people following a Mediterranean diet have significantly lower rates of heart disease and cognitive decline.",
            url: "https://example.com/mediterranean-diet",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format",
            source: { name: "Health Weekly" },
            publishedAt: new Date(Date.now() - 14400000).toISOString()
        },
        {
            title: "Cities Around the World Adopt 4-Day Work Week Pilot",
            description: "Dozens of major cities are launching a coordinated four-day work week pilot programme, citing improved productivity and worker well-being.",
            url: "https://example.com/4-day-week",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format",
            source: { name: "Business Report" },
            publishedAt: new Date(Date.now() - 18000000).toISOString()
        },
        {
            title: "Ocean Cleanup Project Removes Record Tonnes of Plastic",
            description: "The international ocean cleanup initiative reports its most successful year, removing over 100,000 tonnes of plastic from the Pacific.",
            url: "https://example.com/ocean-cleanup",
            image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&auto=format",
            source: { name: "Environment Today" },
            publishedAt: new Date(Date.now() - 21600000).toISOString()
        },
    ],
    technology: [
        {
            title: "AI Models Now Write Production-Ready Code Autonomously",
            description: "The latest generation of AI coding assistants can now autonomously build, test and deploy full-stack web applications with minimal human input.",
            url: "https://example.com/ai-coding",
            image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format",
            source: { name: "TechCrunch" },
            publishedAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
            title: "Quantum Computing Achieves Commercial Viability Milestone",
            description: "A leading quantum computing firm has demonstrated a 1000-qubit processor stable enough for real-world enterprise workloads.",
            url: "https://example.com/quantum-computing",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format",
            source: { name: "IEEE Spectrum" },
            publishedAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
            title: "Open-Source Browser Engine Gains Major Adoption",
            description: "A newly released open-source rendering engine is being adopted by multiple browser vendors, challenging the dominance of existing engines.",
            url: "https://example.com/browser-engine",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format",
            source: { name: "The Verge" },
            publishedAt: new Date(Date.now() - 10800000).toISOString()
        },
        {
            title: "Foldable Devices Hit Mainstream Price Points This Year",
            description: "Major smartphone manufacturers are aggressively pricing foldable devices under $600, opening the form factor to a mass market.",
            url: "https://example.com/foldables",
            image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&auto=format",
            source: { name: "Wired" },
            publishedAt: new Date(Date.now() - 14400000).toISOString()
        },
        {
            title: "WebAssembly Surpasses JavaScript in Performance Benchmarks",
            description: "New benchmarks show WebAssembly outperforming JavaScript by up to 10x on compute-heavy web tasks, accelerating its adoption.",
            url: "https://example.com/wasm",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format",
            source: { name: "Dev.to" },
            publishedAt: new Date(Date.now() - 18000000).toISOString()
        },
        {
            title: "Edge Computing Brings AI Inference Directly to Devices",
            description: "A new chip architecture allows large language models to run locally on consumer hardware without any cloud dependency.",
            url: "https://example.com/edge-ai",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format",
            source: { name: "Ars Technica" },
            publishedAt: new Date(Date.now() - 21600000).toISOString()
        },
    ],
    sports: [
        {
            title: "Record Attendance at International Athletics Championship",
            description: "This year's World Athletics Championships broke all previous attendance records, with over 2 million spectators across the 10-day event.",
            url: "https://example.com/athletics",
            image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a26?w=600&auto=format",
            source: { name: "Sports Illustrated" },
            publishedAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
            title: "Young Footballer Breaks Scoring Record at 17",
            description: "A 17-year-old sensation has shattered the all-time league scoring record, drawing comparisons to the greatest players in the sport's history.",
            url: "https://example.com/football-record",
            image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&auto=format",
            source: { name: "ESPN" },
            publishedAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
            title: "Electric Motorsport Series Attracts Massive Global Audience",
            description: "The premier electric racing series hit a record 500 million viewers globally this season, rivalling traditional combustion motorsport.",
            url: "https://example.com/electric-racing",
            image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format",
            source: { name: "Motorsport Week" },
            publishedAt: new Date(Date.now() - 10800000).toISOString()
        },
        {
            title: "Olympic Committee Announces New eSports Exhibition Events",
            description: "The IOC has confirmed that competitive gaming will feature as exhibition events at the next Summer Olympics.",
            url: "https://example.com/esports-olympics",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format",
            source: { name: "Olympic News" },
            publishedAt: new Date(Date.now() - 14400000).toISOString()
        },
        {
            title: "Women's Cricket World Cup Viewership Triples",
            description: "The Women's Cricket World Cup set new broadcast records this year, with viewership nearly triple that of the previous edition.",
            url: "https://example.com/cricket-wc",
            image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format",
            source: { name: "CricInfo" },
            publishedAt: new Date(Date.now() - 18000000).toISOString()
        },
        {
            title: "Marathon Runner Sets New World Record in Berlin",
            description: "An Ethiopian distance runner smashed the marathon world record in Berlin, finishing in an astonishing 1 hour 55 minutes.",
            url: "https://example.com/marathon-record",
            image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&auto=format",
            source: { name: "Runner's World" },
            publishedAt: new Date(Date.now() - 21600000).toISOString()
        },
    ],
    business: [
        {
            title: "Global Startups Raised Record $500B in Venture Funding",
            description: "Last year marked the highest ever year for venture capital investment, with startups globally raising over half a trillion dollars.",
            url: "https://example.com/vc-funding",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format",
            source: { name: "Forbes" },
            publishedAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
            title: "Central Banks Signal End of Interest Rate Hike Cycle",
            description: "Major central banks have signalled that the aggressive interest rate hike cycle of the past two years is coming to a close.",
            url: "https://example.com/interest-rates",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format",
            source: { name: "Financial Times" },
            publishedAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
            title: "E-Commerce Giants Invest in Same-Day Delivery Infrastructure",
            description: "Leading e-commerce platforms are investing billions in last-mile logistics to guarantee same-day delivery in over 200 cities worldwide.",
            url: "https://example.com/ecommerce-delivery",
            image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format",
            source: { name: "Bloomberg" },
            publishedAt: new Date(Date.now() - 10800000).toISOString()
        },
        {
            title: "Remote Work Now Permanent for 60% of Knowledge Workers",
            description: "A new global workforce survey shows that remote and hybrid work arrangements are now permanent for the majority of desk-based employees.",
            url: "https://example.com/remote-work",
            image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&auto=format",
            source: { name: "Harvard Business Review" },
            publishedAt: new Date(Date.now() - 14400000).toISOString()
        },
        {
            title: "Sustainable Business Practices Drive Higher Consumer Trust",
            description: "A major survey reveals that brands with verified sustainability commitments enjoy up to 30% higher consumer trust scores.",
            url: "https://example.com/sustainability-trust",
            image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&auto=format",
            source: { name: "McKinsey Insights" },
            publishedAt: new Date(Date.now() - 18000000).toISOString()
        },
        {
            title: "Asian Markets Outperform as Tech Sector Rebounds",
            description: "Asian stock markets led global gains this quarter as technology sector earnings beat analyst expectations by a wide margin.",
            url: "https://example.com/asian-markets",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format",
            source: { name: "Reuters" },
            publishedAt: new Date(Date.now() - 21600000).toISOString()
        },
    ]
};

// ─── State ─────────────────────────────────────────────────────────────────────
let currentCategory = "general";

// ─── Helpers ───────────────────────────────────────────────────────────────────
function timeAgo(dateString) {
    const diff = Math.floor((Date.now() - new Date(dateString)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

function setLoading(state) {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.style.display = state ? "block" : "none";
}

// ─── Render ────────────────────────────────────────────────────────────────────
function renderNews(articles) {
    const grid = document.getElementById("news-grid");
    if (!grid) return;
    grid.innerHTML = "";

    if (!articles || articles.length === 0) {
        grid.innerHTML = `<div class="no-results" style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);font-weight:500;">No articles found. Try a different query.</div>`;
        return;
    }

    articles.forEach(article => {
        const card = document.createElement("article");
        card.className = "news-card";

        const img = article.image || article.urlToImage || "";
        const imgHTML = img
            ? `<img src="${img}" alt="${article.title}" class="news-card-image" onerror="this.style.display='none'">`
            : "";

        const sourceName = (article.source && article.source.name) ? article.source.name : "Unknown";
        const timeLabel = article.publishedAt ? timeAgo(article.publishedAt) : "";

        card.innerHTML = `
            ${imgHTML}
            <div class="news-card-content">
                <div class="news-card-meta">
                    <span class="news-source">${sourceName}</span>
                    <span class="news-time">${timeLabel}</span>
                </div>
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-description">${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-card-link">Read More &rarr;</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ─── Fetch (GNews) with mock fallback ─────────────────────────────────────────
async function fetchNews(category = "general", query = "") {
    setLoading(true);

    // If the key is the placeholder, go straight to mock data
    if (GNEWS_API_KEY === "pub_demo") {
        setLoading(false);
        const pool = query
            ? Object.values(MOCK_ARTICLES).flat().filter(a =>
                a.title.toLowerCase().includes(query.toLowerCase()) ||
                (a.description || "").toLowerCase().includes(query.toLowerCase())
              )
            : MOCK_ARTICLES[category] || MOCK_ARTICLES.general;
        renderNews(pool);
        return;
    }

    try {
        let url;
        if (query) {
            url = `${GNEWS_BASE}/search?q=${encodeURIComponent(query)}&lang=en&token=${GNEWS_API_KEY}`;
        } else {
            url = `${GNEWS_BASE}/top-headlines?category=${category}&lang=en&token=${GNEWS_API_KEY}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setLoading(false);
        renderNews(data.articles || []);
    } catch (err) {
        console.warn("GNews API failed, falling back to mock data.", err);
        setLoading(false);
        const pool = query
            ? Object.values(MOCK_ARTICLES).flat().filter(a =>
                a.title.toLowerCase().includes(query.toLowerCase()) ||
                (a.description || "").toLowerCase().includes(query.toLowerCase())
              )
            : MOCK_ARTICLES[category] || MOCK_ARTICLES.general;
        renderNews(pool);
    }
}

// ─── Init ──────────────────────────────────────────────────────────────────────
function init() {
    fetchNews(currentCategory);

    // Category buttons
    const categoriesNav = document.querySelector(".categories-nav");
    if (categoriesNav) {
        categoriesNav.addEventListener("click", e => {
            if (!e.target.classList.contains("category-btn")) return;
            categoriesNav.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            currentCategory = e.target.dataset.category || e.target.textContent.trim().toLowerCase();
            fetchNews(currentCategory);
        });
    }

    // Search form
    const searchForm  = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", e => {
            e.preventDefault();
            const q = searchInput.value.trim();
            if (!q) return;
            if (categoriesNav) {
                categoriesNav.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            }
            fetchNews(currentCategory, q);
            searchInput.value = "";
        });
    }
}

document.addEventListener("DOMContentLoaded", init);
