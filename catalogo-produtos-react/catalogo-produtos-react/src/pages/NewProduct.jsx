import { useState } from "react";
import { createProduto } from "../api/produtos";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    descricao: "",
    imagem: "",
    categoria: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.preco || !form.descricao || !form.categoria) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      await createProduto(form);
      navigate("/");
    } catch (err) {
      setError("Erro ao salvar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-4">Novo Produto</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="preco"
          placeholder="Preço"
          value={form.preco}
          onChange={handleChange}
          type="number"
          step="0.01"
          className="border p-2 rounded"
        />
        <input
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="imagem"
          placeholder="URL da imagem"
          value={form.imagem}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="categoria"
          placeholder="Categoria"
          value={form.categoria}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          {loading ? "Salvando..." : "Salvar Produto"}
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
