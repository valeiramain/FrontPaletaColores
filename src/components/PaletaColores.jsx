import ItemColor from "./ItemColor.jsx";
import { Row } from "react-bootstrap";

const PaletaColores = ({ colores }) => {
  return (
    <>
      <h1 className="text-center text-light display-5 mb-4">
        Paleta de Colores
      </h1>
      {/* sistema de grillas con las cards */}
      <Row xs={1} md={3} lg={4} className="g-4">
        {colores.map((color) => (
          <ItemColor key={color._id} color={color.nombre}></ItemColor>
        ))}
      </Row>
    </>
  );
};

export default PaletaColores;
