import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/projects/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
const FormTarea = () => {
  //*Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  const tareasContext = useContext(tareaContext);
  const {
    errortarea,
    tareaseleccionada,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizaTarea,
  } = tareasContext;

  //?Efect que detecta si hay una Tarea Seleccionada

  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  //? State del Formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });
  const { nombre } = tarea;
  //* Si no hay Proyecto seleccionado
  if (!proyecto) return null;

  //?Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //? Leer los Valores del Formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //*Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //*Si es Edicion o si Es nueva Tarea
    if (tareaseleccionada === null) {
      //*Agregar la Nueva Tarea al state de Tareas
      tarea.proyecto = proyectoActual._id;

      agregarTarea(tarea);
    } else {
      //? Actualizar Tarea Existente
      actualizaTarea(tarea);
    }

    //* Obtner y Filtrart lasTareas del Proyecto Actual
    obtenerTareas(proyectoActual.id);

    //*Reiniciar el Form
    guardarTarea({
      nombre: "",
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
            className="btn btn-primario btn-submit btn-block"
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El Nombre de la Tarea es Obvligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
