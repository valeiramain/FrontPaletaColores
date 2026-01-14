import ItemColor from "./ItemColor.jsx";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Row, Button } from "react-bootstrap";

const PaletaColores = () => {
  const color = "red";
  return (
    
      <section className="container border border-secondary shadow p-3 rounded mt-3">
        <Row xs={1} md={3} className="g-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{color}</Card.Title>
                <article className="d-flex justify-content-center mb-2">
                  <div
                    className="border cuadrado"
                    style={{ backgroundColor: color || "transparent" }}
                  ></div>
                </article>
                <div className="d-flex justify-content-center mt-4">
                  <Button variant="warning me-2">Editar</Button>
                  <Button variant="danger">Borrar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* {
                    arrayColores.map((color, indice) => <ItemColor key={indice} color={color} borrarColor={borrarColor}></ItemColor>)
                } */}
        </Row>
      </section>
    
  );
};

export default PaletaColores;
