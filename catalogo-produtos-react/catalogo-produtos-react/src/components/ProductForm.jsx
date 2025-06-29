import { useState } from "react";
import { createProduto } from "../api/produtos";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [categoria, setCategoria] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoProduto = {
      nome,
      preco,
      descricao,
      imagem,
      categoria,
    };

    await createProduto(novoProduto);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="URL da Imagem"
        value={imagem}
        onChange={(e) => setImagem(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Adicionar Produto
      </button>
    </form>
  );
};

export default ProductForm;
