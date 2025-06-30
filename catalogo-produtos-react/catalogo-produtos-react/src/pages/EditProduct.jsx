import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProdutoById, updateProduto } from "../api/produtos";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    descricao: "",
    imagem: "",
    categoria: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getProdutoById(id)
      .then((res) => {
        setForm(res.data);
      })
      .catch(() => setError("Erro ao carregar produto."));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProduto(id, form);
      navigate("/");
    } catch {
      setError("Erro ao atualizar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" className="border p-2 rounded" />
        <input name="preco" value={form.preco} onChange={handleChange} placeholder="Preço" type="number" className="border p-2 rounded" />
        <input name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" className="border p-2 rounded" />
        <input name="imagem" value={form.imagem} onChange={handleChange} placeholder="URL da imagem" className="border p-2 rounded" />
        <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoria" className="border p-2 rounded" />
        <button type="submit" disabled={loading} className="bg-purple-700 text-white py-2 rounded hover:bg-purple-800">
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
