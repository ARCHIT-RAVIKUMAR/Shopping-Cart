import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  return (
    <>
      <header>
        <h1>Corner Store</h1>
      </header>
      <main>
        <ProductList />
        <Cart />
      </main>
    </>
  );
}
