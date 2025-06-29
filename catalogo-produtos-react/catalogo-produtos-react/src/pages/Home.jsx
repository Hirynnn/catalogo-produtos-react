import { useEffect, useState } from "react";
import { getProdutos } from "../api/produtos";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");

  useEffect(() => {
    getProdutos()
      .then((res) => {
        setProdutos(res.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar produtos:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const categorias = ["todas", ...new Set(produtos.map((p) => p.categoria))];

  const produtosFiltrados =
    categoriaSelecionada === "todas"
      ? produtos
      : produtos.filter((p) => p.categoria === categoriaSelecionada);

  if (loading) return <p className="p-6 text-center">Carregando produtos...</p>;

  if (produtos.length === 0)
    return <p className="p-6 text-center">Nenhum produto cadastrado.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Catálogo de Produtos</h1>

      {/* Filtro de categoria */}
      <div className="mb-6 flex justify-center">
        <select
          className="border border-gray-300 p-2 rounded"
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
        >
          {categorias.map((cat, index) => (
            <option key={index} value={cat}>
              {cat[0].toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtosFiltrados.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default Home;
