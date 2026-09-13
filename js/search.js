
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Search Overlay HTML
    const overlayHTML = `
        <div id="searchOverlay" style="display: none; position: fixed; inset: 0; background: rgba(58, 29, 15, 0.98); z-index: 9999; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 100px; color: white;">
            <button id="closeSearch" style="position: absolute; top: 30px; right: 40px; background: none; border: none; color: white; font-size: 3rem; cursor: pointer; transition: 0.3s;" onmouseover="this.style.color='#e04f00'" onmouseout="this.style.color='white'"><i class="ri-close-line"></i></button>
            
            <div style="width: 100%; max-width: 800px; padding: 0 20px;">
                <div style="position: relative; margin-bottom: 40px;">
                    <i class="ri-search-line" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); font-size: 2rem; color: #a6958a;"></i>
                    <input type="text" id="searchInput" placeholder="Search for destinations, tours, or keywords..." style="width: 100%; padding: 25px 25px 25px 70px; font-size: 1.5rem; background: transparent; border: none; border-bottom: 2px solid rgba(255,255,255,0.2); color: white; outline: none; font-family: 'Inter', sans-serif;">
                </div>
                
                <div id="searchResults" style="display: flex; flex-direction: column; gap: 15px;">
                    <!-- Results will appear here -->
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', overlayHTML);

    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const closeSearch = document.getElementById('closeSearch');
    
    // Find search icons in nav-icons or hamburger to open it
    const searchIcons = document.querySelectorAll('.ri-search-line');

    // 2. The Search Index
    const siteIndex = [
        {
            title: "Chapter of Highlights (14-Day Tour)",
            url: "chapter-of-highlights.html",
            desc: "Cultural triangle, hill country, southern beaches and wildlife.",
            keywords: "negombo sigiriya dambulla anuradhapura polonnaruwa habarana kaudulla kandy nuwara eliya ella yala southern coast galle unawatuna mirissa tangalle colombo culture wildlife 14 days"
        },
        {
            title: "Chapter of the East Coast (7-Day Tour)",
            url: "chapter-of-the-east-coast.html",
            desc: "Discover Sri Lanka's serene and less-explored eastern coastline.",
            keywords: "east coast trincomalee passikudah kalkudah batticaloa arugam bay kumana national park beach surfing 7 days"
        },
        {
            title: "Chapter of Adventures",
            url: "chapter-of-adventures.html",
            desc: "A relaxed yet engaging private journey for nature lovers and active explorers.",
            keywords: "adventure rafting kitulgala pidurangala hot air balloon zipline horton plains wilpattu udawalawe whale watching surfing kitesurfing scuba diving cooking class trek birdwatching"
        },
        {
            title: "Chapter of Ramayana (8-Day Spiritual Journey)",
            url: "chapter-of-ramayana.html",
            desc: "Trace the legendary Ramayana Trail across Sri Lanka.",
            keywords: "ramayana spiritual temple shiva rama sita hanuman ravana munneswaram koneswaram trincomalee aluviharaya ramboda seetha eliya hakgala divurumpola ravana ella kelaniya 8 days"
        },
        {
            title: "Chapter of Romance & Relaxation (7-Day Honeymoon)",
            url: "chapter-of-romance.html",
            desc: "A dreamy private chauffeur-driven escape for newlyweds.",
            keywords: "romance honeymoon couples newlyweds relax spa private pool hatton castlereagh bentota hill country 7 days"
        },
        {
            title: "Chapter of Serendipitous Snapshot (3-Day Escape)",
            url: "chapter-of-snapshot-escape.html",
            desc: "A whirlwind escape perfect for time-pressed travelers or layovers.",
            keywords: "short tour 3 days 2 nights layover snapshot escape quick trip"
        },
        {
            title: "About Us",
            url: "about.html",
            desc: "Learn why Ceylon Diary is your perfect travel partner.",
            keywords: "about us story why choose team tailor-made support"
        },
        {
            title: "Gallery",
            url: "gallery.html",
            desc: "A visual journey through Sri Lanka's beautiful landscapes.",
            keywords: "gallery photos images pictures visual journey"
        },
        {
            title: "Contact Us",
            url: "contact.html",
            desc: "Get in touch to plan your dream trip to Sri Lanka.",
            keywords: "contact reach us email phone whatsapp location form"
        },
        {
            title: "Home & Private Transfers",
            url: "index.html",
            desc: "Affordable private chauffeur-driven transfers and our main offerings.",
            keywords: "home transfers taxi private car chauffeur affordable reliable airport drop"
        }
    ];

    // 3. Search Logic
    function performSearch(query) {
        query = query.toLowerCase().trim();
        searchResults.innerHTML = '';
        
        if (query.length === 0) return;
        
        const results = siteIndex.filter(page => {
            return page.title.toLowerCase().includes(query) || 
                   page.desc.toLowerCase().includes(query) || 
                   page.keywords.toLowerCase().includes(query);
        });
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p style="color: #a6958a; font-size: 1.2rem;">No results found. Try a different keyword.</p>';
            return;
        }
        
        results.forEach(res => {
            const el = document.createElement('a');
            el.href = res.url;
            el.style.cssText = "display: block; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px; transition: 0.3s; text-decoration: none; border: 1px solid transparent;";
            el.onmouseover = () => { el.style.background = "rgba(255,255,255,0.1)"; el.style.borderColor = "#e04f00"; };
            el.onmouseout = () => { el.style.background = "rgba(255,255,255,0.05)"; el.style.borderColor = "transparent"; };
            
            el.innerHTML = `
                <h4 style="color: #e04f00; font-size: 1.3rem; margin-bottom: 5px;">${res.title}</h4>
                <p style="color: #ccc; font-size: 1rem; margin: 0;">${res.desc}</p>
            `;
            searchResults.appendChild(el);
        });
    }

    // 4. Event Listeners
    searchIcons.forEach(icon => {
        // If it's the search icon in the header nav
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            searchOverlay.style.display = 'flex';
            setTimeout(() => searchInput.focus(), 100);
        });
    });

    closeSearch.addEventListener('click', () => {
        searchOverlay.style.display = 'none';
        searchInput.value = '';
        searchResults.innerHTML = '';
    });

    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.style.display === 'flex') {
            closeSearch.click();
        }
    });
});
