import { Link } from "react-router-dom";

const ProductCard = ({ produto }) => {
  return (
    <div className="border rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col bg-white">
      <img
        src={produto.imagem || "https://via.placeholder.com/300"}
        alt={produto.nome}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <h2 className="text-xl font-semibold mb-1">{produto.nome}</h2>
      <p className="text-gray-700 font-medium mb-1">R$ {produto.preco}</p>
      <p className="text-sm text-gray-500 italic mb-4">{produto.categoria}</p>

      <Link
        to={`/produto/${produto.id}`}
        className="mt-auto inline-block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
      >
        Ver detalhes
      </Link>
    </div>
  );
};

export default ProductCard;
