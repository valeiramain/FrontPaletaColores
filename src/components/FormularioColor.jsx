import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PaletaColores from "./PaletaColores.jsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const FormularioColor = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  // 1. Creamos la referencia al valor del input "nombre"
  const nombreColor = watch("nombre");
  
  const onSubmit = (data) => {
    console.log("Datos para enviar al backend:", data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm">
        {/* Contenedor principal: se vuelve flex a partir de md */}
        <div className="d-md-flex gap-2 align-items-md-center">
          <Form.Group
            className="mb-md-0 d-flex gap-2 flex-grow-1 align-items-center"
            controlId="formBasicColor"
          >
            <div
              className="border cuadrado"
              style={{ backgroundColor: nombreColor || "transparent" }}
            ></div>
            <Form.Control
              type="text"
              onChange={(e) => setColor(e.target.value)}
              // value={color}
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
