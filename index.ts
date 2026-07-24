type Category =
    | "Sport"
    | "Cruiser"
    | "Touring"
    | "Dirt"
    | "Adventure"
    | "Naked"
    | "Electric";

// Creating shape of the object
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

// This function downloads the motorcycle data from the internet
// "async" allows us to use the "await" keyword inside the function
async function fetchMotorcycles(): Promise<Motorcycle[]> {
    // Send an HTTP GET request to the JSON endpoint
    // fetch() returns a Promise<Response>
    const response = await fetch(
        "https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json",
    );

    // Convert the response body from JSON into JavaScript objects
    const motorcycles = (await response.json()) as Motorcycle[];

    // Convert every created_at string into a real Date
    return motorcycles.map((motorcycle) => ({
        ...motorcycle,
        created_at: new Date(motorcycle.created_at),
    }));
}

function renderMotorcycleCard(motorcycle: Motorcycle): string {
    return `
    <div class="motorcycle-card">
        <img src="${motorcycle.image_url}" class="motorcycle-card-image-container" alt="${motorcycle.name}"/>
        <div class="motorcycle-card-year-badge">${motorcycle.year}</div>
        <h2 class="motorcycle-card-title">${motorcycle.name}</h2>
        <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
        <p class="motorcycle-card-category">${motorcycle.category}</p>
        <p class="motorcycle-card-description">${motorcycle.description}</p>
        <p class="motorcycle-card-price">$${motorcycle.price.toLocaleString()}</p>
    </div>
    `;
}
