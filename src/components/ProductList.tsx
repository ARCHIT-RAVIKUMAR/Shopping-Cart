import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { useCartStore } from "../store/cartStore";
import { money } from "../lib";

export default function ProductList() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);

  if (isPending) return <p className="note">Loading products...</p>;

  if (isError)
    return (
      <div className="note">
        <p>Could not load products ({error.message}).</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );

  return (
    <ul className="products">
      {data.map((p) => {
        const inCart = items.find((i) => i.id === p.id)?.quantity ?? 0;
        return (
          <li key={p.id} className="product">
            <div className="thumb" style={{ background: p.tint }} aria-hidden="true">
              {p.emoji}
            </div>
            <div className="info">
              <span className="cat">{p.category}</span>
              <h3>{p.title}</h3>
              <div className="row">
                <span className="price">{money(p.price)}</span>
                <button onClick={() => addItem(p)}>
                  {inCart ? `Add one more (${inCart})` : "Add to cart"}
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
