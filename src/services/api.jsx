import { v4 as uuidv4 } from 'uuid'; // para probar deben instalar uuid: npm install uuid, este sirve para agregar un id unico si el producto no tiene un id

export async function FetchProducts() {
    const url = 'https://fakestoreapi.com/products';
    const STORAGE_KEY = 'cached_products';
    const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    try {
        // Verificar si existe un caché válido
        const cachedData = localStorage.getItem(STORAGE_KEY);
        if (cachedData) {
            const { products, timestamp } = JSON.parse(cachedData);

            // Si el caché aún es válido, devolver los productos desde él
            if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
                console.log('Productos obtenidos desde caché');
                return products;
            }
        }

        // Obtener los productos desde la API si no hay un caché válido
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Transformar los datos y asignar un id único si no existe
        const productsData = data.map((product, index) => ({
            id: product.id || uuidv4(), // Usar el id proporcionado o generar uno único
            title: product.title,
            price: product.price,
            description: product.description,
            images: product.image ? [product.image] : ['https://via.placeholder.com/400'],
            category: product.category || 'Sin categoría',
        }));

        // Guardar en caché los productos con un timestamp
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            products: productsData,
            timestamp: Date.now()
        }));

        console.log('Productos obtenidos:', productsData);
        return productsData;

    } catch (error) {
        console.error('Error al obtener productos:', error);

        // Intentar devolver los productos desde el caché en caso de error
        const cachedData = localStorage.getItem(STORAGE_KEY);
        if (cachedData) {
            const { products } = JSON.parse(cachedData);
            console.log('Productos obtenidos desde caché de respaldo');
            return products;
        }

        return [];
    }
}
