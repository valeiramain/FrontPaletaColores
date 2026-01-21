import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PaletaColores from "./PaletaColores.jsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { listarColoresApi, crearColorApi } from "../helpers/queries.js";
import Swal from "sweetalert2";

const FormularioColor = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  //array de colores donde se guarda la respuesta del BE para armar grilla
  const [colores, setColores] = useState([]);

  // para observar el input "nombre" en tiempo real, y cambiar el color del recuadro:
  const colorEscrito = watch("nombre");

  useEffect(() => {
    cargarColores();
  }, []);

  const cargarColores = async () => {
    const respuestaColores = await listarColoresApi();
    if (respuestaColores && respuestaColores.status === 200) {
      const datos = await respuestaColores.json();
      // guarda en array los datos de la solicitud get
      setColores(datos);
    } else {
      Swal.fire({
        title: "Ocurrió un error !",
        text: `No se pueden mostrar los colores`,
        icon: "error",
      });
    }
  };

  const onSubmit = async (data) => {
    // CREAR color
    const respuestaColorCreado = await crearColorApi(data);
    if (respuestaColorCreado && respuestaColorCreado.status === 201) {
      Swal.fire({
        title: "Color Creado!",
        text: `El Color ${data.nombre} fue creado correctamente.`,
        icon: "success",
      });
      reset();
      //se actualiza la grilla de colores
      cargarColores();
      // setColores([...colores, respuestaColorCreado.json()]);
    } else {
      Swal.fire({
        title: "Ocurrio un error al Crear el color!",
        text: `El color ${data.nombre} no pudo ser creado.`,
        icon: "error",
      });
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border rounded shadow-sm mb-3"
      >
        <h5 className="text-center text-light">Ingrese Color</h5>
        {/* Contenedor principal: se vuelve flex a partir de md */}
        <div className="d-md-flex gap-2 align-items-md-center">
          <Form.Group
            className="mb-md-0 d-flex gap-2 flex-grow-1 align-items-center"
            controlId="formBasicColor"
          >
            <div
              className="border cuadrado"
              style={{ backgroundColor: colorEscrito || "transparent" }}
            ></div>
            <Form.Control
              type="text"
              placeholder="Color en inglés, #HEX, RGB o RGBA"
              {...register("nombre", {
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
              {errors.nombre?.message}
            </Form.Text>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form.Group>
        </div>
      </Form>

      <PaletaColores colores={colores} setColores={setColores}></PaletaColores>
    </>
  );
};

export default FormularioColor;
