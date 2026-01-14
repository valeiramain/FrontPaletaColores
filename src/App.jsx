import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FormularioColor from "./components/FormularioColor.jsx";

function App() {
  return (
    <main className="container py-4">
      <h1 className="text-center text-light display-5 mb-4">
        Paleta de Colores
      </h1>
      <FormularioColor />
    </main>
  );
}

export default App;
