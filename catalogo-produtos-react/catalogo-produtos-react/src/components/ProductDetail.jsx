import { useParams, useNavigate } from "react-router-dom";
import { deleteProduto, getProdutoById } from "../api/produtos";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getProdutoById(id)
      .then((res) => {
        setProduto(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar produto:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProduto(id);
      navigate("/");
    } catch (err) {
      console.error("Erro ao excluir:", err);
    }
  };

  if (loading) return <p className="p-6">Carregando...</p>;

  if (!produto) return <p className="p-6">Produto não encontrado.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{produto.nome}</h1>
      <p className="text-gray-600 mb-2">Preço: R$ {produto.preco}</p>
      <p className="mb-4">{produto.descricao}</p>
      <img
        src={produto.imagem}
        alt={produto.nome}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="mb-4 text-sm text-gray-500">Categoria: {produto.categoria}</p>

      <div className="flex gap-4">
        <button
          onClick={() => setShowPopup(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Excluir
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Voltar
        </button>
      </div>

      {/* POPUP de confirmação */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm">
            <p className="mb-4 text-lg">Tem certeza que deseja excluir este produto?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
