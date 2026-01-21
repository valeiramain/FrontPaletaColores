import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Button, Modal, Form } from "react-bootstrap";
import {
  borrarColorApi,
  editarColorApi,
  buscarColorApi,
} from "../helpers/queries.js";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ItemColor = ({ color, colores, setColores }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  // ---- Estados para el Modal para EDITAR------
  const [show, setShow] = useState(false);
  const [nuevoColor, setNuevoColor] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const valorObservado = watch("nuevoColor");
  //---------------------------------
  

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
            text: `El Color "${color.nombre}" fue eliminado correctamente`,
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
            text: `El color "${color.nombre}" no pudo borrar. Inténtelo més tarde.`,
            icon: "error",
          });
        }
      }
    });
  };
  
  const onSubmit = async (data) => {
    // data tiene los datos del formulario para editar color
    data._id = color._id;
    const respuestaEditarColor = await editarColorApi(data.nuevoColor, data._id);
    if (respuestaEditarColor && respuestaEditarColor.status === 200) {
      Swal.fire({
        title: "Color Editado!",
        text: `El Color ${data.nuevoColor} fue editado correctamente.`,
        icon: "success",
      });

      // actualizar la tabla
      const coloresActualizados = colores.map((item) => {
        if (item._id === data._id) {
          return { ...item, nombre: data.nuevoColor };
        }
        return item;
      });
      setColores(coloresActualizados);
    } else {
      Swal.fire({
        title: "Ocurrió un Error!",
        text: `El Color ${data.nuevoColor} no pudo ser editado. Inténtelo en unos minutos.`,
        icon: "error",
      });
    }
    handleClose();
  };

  return (
    <>
      <Col>
        <Card className="sombra">
          <Card.Body>
            <Card.Title className="text-center">{color.nombre}</Card.Title>
            <article className="d-flex justify-content-center mb-2">
              <div
                className="border colorCard"
                style={{ backgroundColor: color.nombre || "transparent" }}
              ></div>
            </article>
            <div className="d-flex justify-content-center mt-4">
              <Button variant="warning me-2" onClick={handleShow}>
                <i className="bi bi-pencil"></i>
              </Button>
              <Button variant="danger" onClick={eliminarColor}>
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* //---- ventana modal para editar color ----// */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-secondary border-bottom-0">
          <Modal.Title className="text-dark">Editar Color</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="text-center mb-5">
              <p>
                Color actual: <strong>{color.nombre}</strong>
              </p>
              <div
                className="mx-auto border mb-3 cuadrado"
                style={{
                  backgroundColor: color.nombre,
                }}
              ></div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>
                Ingrese el nuevo color (Nombre, Hex o RGB)
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Blue, #0000FF o rgb(0,0,255)"
                {...register("nuevoColor", {
                  required: "El color es un dato obligatorio",
                  minLength: {
                    value: 3,
                    message: "El color debe contener como minimo 3 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "El color debe contener como maximo 30 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.nuevoColor?.message}
              </Form.Text>
            </Form.Group>

            <div className="text-center">
              {/* <p>Vista previa del nuevo color:</p> */}
              <div
                className="mx-auto border cuadrado"
                style={{
                  backgroundColor: valorObservado || "transparent",
                }}
              ></div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-secondary border-bottom-0 d-flex justify-content-center">
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* //---- fin ventana modal ----// */}
    </>
  );
};

export default ItemColor;
