import ItemColor from "./ItemColor.jsx";
import { Row } from "react-bootstrap";


const PaletaColores = ({colores}) => {
  return (
    <>
    {/* sistema de grillas con las cards */}
      <Row xs={1} md={3} lg={4} className="g-4">
        {colores.map((color) => (
          <ItemColor key={color._id} color={color.nombre} ></ItemColor>
        ))}
      </Row>
   </>
   
  )};

  export default PaletaColores;
