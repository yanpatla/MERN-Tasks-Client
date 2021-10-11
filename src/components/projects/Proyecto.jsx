import React, { useContext } from "react";
import proyectoContext from "../../context/projects/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
//TODO Cada proyecto va a ser una componente

const Proyecto = ({ proyecto }) => {
  //*Obtener el State de Proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;
  //* Obtener la funcion del Context de Tarea
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;
  //* Funcion para Agregar el Proyecto Actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id); //?Fijar un Proyecto Actrual
    obtenerTareas(id); //Filtrar las tareas cuando se de click
  };
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
