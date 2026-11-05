export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  emoji: string;
  tint: string;
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${import.meta.env.BASE_URL}products.json`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}
