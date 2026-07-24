type Category =
    | "Sport"
    | "Cruiser"
    | "Touring"
    | "Dirt"
    | "Adventure"
    | "Naked"
    | "Electric";

interface Motorcycle {
    id: string;
    name: string;
    manufacturer: string;
    category: Category;
    price: number;
    image_url: string;
    created_at: Date;
    description: string;
    year: number;
}

async function fetchMotorcycles(): Promise<Motorcycle[]> {
    const response = await fetch(
        "https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json",
    );
    const data: Motorcycle[] = await response.json();
    return data;
}

function renderMotorcycleCard(motorcycle: Motorcycle): string {
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
    private allMotorcycles: Motorcycle[] = [];

    constructor() {
        this.init();
    }

    private async init(): Promise<void> {
        this.allMotorcycles = await fetchMotorcycles();
        this.renderMotorcycles(this.allMotorcycles);
        this.setupFilter();
    }

    renderMotorcycles(motorcycles: Motorcycle[]): void {
        if (!motorcycles || motorcycles.length === 0) return;
        const grid = document.getElementById("motorcycle-grid");
        const resultsNumber = document.getElementById("results-number");

        if (!grid || !resultsNumber) return;

        grid.innerHTML = motorcycles.map(renderMotorcycleCard).join("");
        resultsNumber.textContent = motorcycles.length.toString();
    }

    private setupFilter(): void {
        const input = document.getElementById(
            "name-filter-input",
        ) as HTMLInputElement;

        input.addEventListener("input", () => {
            const searchTerm = input.value.toLowerCase();
            const filtered = this.allMotorcycles.filter((m) =>
                m.name.toLowerCase().includes(searchTerm),
            );

            this.renderMotorcycles(filtered);
        });
    }
}

new MotorcycleGalleryApp();
