import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PaletaColores from "./PaletaColores.jsx";
import { useForm } from "react-hook-form";
import { useState } from "react";

const FormularioColor = () => {
  const [color, setColor] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Contenedor principal: se vuelve flex a partir de md */}
        <div className="d-md-flex gap-2 align-items-md-center">
          <Form.Group
            className="mb-3 mb-md-0 d-flex gap-2 flex-grow-1 align-items-center"
            controlId="formBasicColor"
          >
            <div
              className="border cuadrado"
              style={{ backgroundColor: color || "transparent" }}
            ></div>
            <Form.Control
              type="text"
              onChange={(e) => setColor(e.target.value)} value={color}
              placeholder="Color en inglés, hexadecimal ó RGB/RGBA"
              {...register("color", {
                required: "El color es un dato obligatorio",
                minLength: {
                  value: 5,
                  message: "El color debe contener como minimo 3 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "El color debe contener como maximo 20 caracteres",
                },
              })}
            />

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form.Group>
        </div>
      </Form>
      <PaletaColores></PaletaColores>
    </>
  );
};

export default FormularioColor;
