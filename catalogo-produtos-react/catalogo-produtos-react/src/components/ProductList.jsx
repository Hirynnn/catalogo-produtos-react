import { useEffect, useState } from "react";
import { getProdutos } from "../api/produtos";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    getProdutos().then(response => {
      setProdutos(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {produtos.map(produto => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
};

export default ProductList;
