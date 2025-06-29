import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-purple-700 text-white p-4 w-full shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
     
        <h1 className="text-2xl font-extrabold flex items-center gap-3 select-none w-1/3 justify-start">
          <span className="text-3xl animate-pulse">🍬</span>
          <Link
            to="/"
            className="hover:underline hover:text-purple-300 transition-colors duration-300"
          >
            Lojinha
          </Link>
        </h1>

   
        <nav className="flex gap-10 text-lg font-semibold w-1/3 justify-center">
          <Link
            to="/"
            className="hover:text-purple-300 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/novo"
            className="hover:text-purple-300 transition-colors duration-300"
          >
            Novo Produto
          </Link>
        </nav>

      
        <div className="w-1/3"></div>

      </div>
    </header>
  );
};

export default Header;
