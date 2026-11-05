export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
};

type ProductsResponse = { products: Product[] };

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://dummyjson.com/products?limit=20&select=title,price,thumbnail,category"
  );
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data: ProductsResponse = await res.json();
  return data.products;
}
