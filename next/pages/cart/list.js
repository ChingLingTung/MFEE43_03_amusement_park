import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CartsNavbar from "@/components/CartsNavbar";
import CartsProducts from "@/components/CartsProducts";
import CartsCart from "@/components/CartsCart";
import { CartsContextProvider } from "@/contexts/CartsContext";

export default function Carts() {
  return (
    <CartsContextProvider>
      <BrowserRouter>
        {/* <CartsNavbar /> */}
        <Routes>
          <Route path="/cart" element={<CartsCart />} />
          <Route path="/*" element={<CartsProducts />} />
        </Routes>
      </BrowserRouter>
    </CartsContextProvider>
  );
}
