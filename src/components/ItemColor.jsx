import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";   

const ItemColor = ({color}) => {
    return (
        <>
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
           
        </>

    );
};

export default ItemColor;