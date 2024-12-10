export async function FetchProducts() {
  const url = 'https://fakestoreapi.com/products';
  const STORAGE_KEY = 'cached_products';
  const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  try {
    // Check if cached products exist and are still valid
    const cachedData = localStorage.getItem(STORAGE_KEY);
    if (cachedData) {
      const { products, timestamp } = JSON.parse(cachedData);
      
      // Check if cache is still valid
      if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
        console.log('Productos obtenidos desde caché');
        return products;
      }
    }

    // Fetch products if no valid cache exists
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const productsData = data.map((product) => ({
      title: product.title,
      price: product.price,
      description: product.description,
      images: product.image ? [product.image] : ['https://via.placeholder.com/400'],
      category: product.category || 'Sin categoría',
    }));

    // Cache the products with a timestamp
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      products: productsData,
      timestamp: Date.now()
    }));

    console.log('Productos obtenidos:', productsData);
    return productsData;

  } catch (error) {
    console.error('Error al obtener productos:', error);

    // If there's an error, try to return cached products
    const cachedData = localStorage.getItem(STORAGE_KEY);
    if (cachedData) {
      const { products } = JSON.parse(cachedData);
      console.log('Productos obtenidos desde caché de respaldo');
      return products;
    }

    return [];
  }
}