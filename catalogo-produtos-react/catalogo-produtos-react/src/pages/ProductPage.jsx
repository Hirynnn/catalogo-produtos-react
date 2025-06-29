import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProdutoById, deleteProduto } from "../api/produtos"; // 👈 adicionar aqui

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProdutoById(id)
      .then((res) => {
        setProduto(res.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar produto:", err);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este produto?");
    if (confirmar) {
      try {
        await deleteProduto(id);
        navigate("/");
      } catch (err) {
        alert("Erro ao excluir produto.");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-blue-600">Carregando produto...</div>
    );
  }

  if (!produto) {
    return (
      <div className="p-6 text-center text-red-600">Produto não encontrado.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold mb-4">{produto.nome}</h1>
      <img
        src={produto.imagem || "https://via.placeholder.com/400"}
        alt={produto.nome}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <p className="text-lg font-semibold mb-2 text-green-600">
        R$ {produto.preco}
      </p>
      <p className="text-gray-700 mb-4">{produto.descricao}</p>
      <p className="text-sm text-gray-500 italic mb-6">
        Categoria: {produto.categoria}
      </p>

      {/* Botão de deletar */}
      <button
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
      >
        Excluir Produto
      </button>
    </div>
  );
};

export default ProductPage;
