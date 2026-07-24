"use strict";
async function fetchMotorcycles() {
    const response = await fetch("https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json");
    const data = await response.json();
    return data;
}
function renderMotorcycleCard(motorcycle) {
    return `
    <div class="motorcycle-card">
        <img class="motorcycle-card-image-container" src="${motorcycle.image_url}" alt="${motorcycle.name}" />
        <span class="motorcycle-card-year-badge">${motorcycle.year}</span>
        <h3 class="motorcycle-card-title">${motorcycle.name}</h3>
        <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
        <p class="motorcycle-card-category">${motorcycle.category}</p>
        <p class="motorcycle-card-description">${motorcycle.description}</p>
        <p class="motorcycle-card-price">${motorcycle.price.toLocaleString()}</p>
        <p class="motorcycle-card-engine">180hp</p>
    </div>
    `;
}
class MotorcycleGalleryApp {
    constructor() {
        this.allMotorcycles = [];
        this.init();
    }
    async init() {
        this.allMotorcycles = await fetchMotorcycles();
        this.renderMotorcycles(this.allMotorcycles);
        this.setupFilter();
    }
    renderMotorcycles(motorcycles) {
        const grid = document.getElementById("motorcycle-grid");
        const resultsNumber = document.getElementById("results-number");
        if (!grid || !resultsNumber)
            return;
        grid.innerHTML = motorcycles.map(renderMotorcycleCard).join("");
        resultsNumber.textContent = motorcycles.length.toString();
    }
    setupFilter() {
        const input = document.getElementById("name-filter-input");
        input.addEventListener("input", () => {
            const searchTerm = input.value.toLowerCase();
            const filtered = this.allMotorcycles.filter((m) => m.name.toLowerCase().includes(searchTerm));
            this.renderMotorcycles(filtered);
        });
    }
}
new MotorcycleGalleryApp();
