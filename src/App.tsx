import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  return (
    <>
      <header>
        <h1>Kirana Corner</h1>
      </header>
      <main>
        <ProductList />
        <Cart />
      </main>
    </>
  );
}
