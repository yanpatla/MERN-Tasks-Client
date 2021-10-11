import React, { Fragment, useContext } from "react";
import Tareas from "./Tareas";
import proyectoContext from "../../context/projects/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;
  //*Obtener las Tareas del Proyecto
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;

  //* Si no hay Proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un Proyecto</h2>;

  //?Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //* Elimina un Proyecto

  const onClickEliminarProyecto = () => {
    eliminarProyecto(proyectoActual._id);
  };
  return (
    <Fragment>
      <h2>Proyecto:{proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay Tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map((tarea) => (
              <CSSTransition timeout={200} classNames="tarea" key={tarea._id}>
                <Tareas tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminarProyecto}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
