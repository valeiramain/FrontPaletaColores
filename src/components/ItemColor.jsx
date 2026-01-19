import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { borrarColorApi } from "../helpers/queries.js";
import Swal from "sweetalert2";

const ItemColor = ({ color, colores, setColores }) => {
  const eliminarColor = () => {
    Swal.fire({
      title: "Está seguro que desea eliminar el Color?",
      text: "No se puede revertir este proceso !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuestaBorrarColor = await borrarColorApi(color._id);
        if (respuestaBorrarColor && respuestaBorrarColor.status === 200) {
          Swal.fire({
            title: "Color Borrado!",
            text: `El Color ${color.nombre} fue eliminado correctamente`,
            icon: "success",
          });
          //actualizar contenido tabla en pantalla
          const coloressActualizados = colores.filter(
            (item) => item._id !== color._id,
          );
          setColores(coloressActualizados);
        } else {
          Swal.fire({
            title: "ocurrió un error al intentar borrar un color!",
            text: `El color ${color.nombre} no se pudo borrar. Inténtelo més tarde.`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>{color.nombre}</Card.Title>
            <article className="d-flex justify-content-center mb-2">
              <div
                className="border cuadrado"
                style={{ backgroundColor: color.nombre || "transparent" }}
              ></div>
            </article>
            <div className="d-flex justify-content-center mt-4">
              <Button variant="warning me-2"><i className="bi bi-pencil">editar</i></Button>
              <Button variant="danger" onClick={eliminarColor}>
                <i className="bi bi-trash">borrar</i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default ItemColor;
