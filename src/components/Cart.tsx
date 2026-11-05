import { useCartStore, selectCount, selectTotal } from "../store/cartStore";
import { money } from "../lib";

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const count = useCartStore(selectCount);
  const total = useCartStore(selectTotal);
  const { addItem, decrementItem, removeItem, clearCart } = useCartStore();

  return (
    <aside className="cart">
      <h2>Cart <span>{count}</span></h2>

      {items.length === 0 ? (
        <p className="note">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((i) => (
              <li key={i.id}>
                <div>
                  <strong>{i.title}</strong>
                  <p>{money(i.price)} each</p>
                </div>
                <div className="stepper">
                  <button aria-label={`Remove one ${i.title}`} onClick={() => decrementItem(i.id)}>-</button>
                  <span>{i.quantity}</span>
                  <button aria-label={`Add one ${i.title}`} onClick={() => addItem(i)}>+</button>
                </div>
                <div className="line-total">
                  {money(i.price * i.quantity)}
                  <button className="text" onClick={() => removeItem(i.id)}>remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </div>
          <button className="text" onClick={clearCart}>Empty cart</button>
        </>
      )}
    </aside>
  );
}
