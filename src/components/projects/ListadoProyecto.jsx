import React, { useContext, useEffect } from "react";
import proyectoContext from "../../context/projects/proyectoContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import alertaContext from "../../context/alerts/alertaContexts";
import Proyecto from "./Proyecto";

const ListadoProyecto = () => {
  //?Extraer Proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  //*Extraer alertas de state
  const contextAlertas = useContext(alertaContext);
  const { alerta, mostrarAlerta } = contextAlertas;

  //? Obtener Proyectos Cuando Carga el Componente
  useEffect(() => {
    //*Si hay un Error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
      //eslint-disable-next-line
  }, [mensaje]);
  //?Revisar si tiene contenido
  if (proyectos.length === 0)
    return <p>No Hay Proyectos, Comienza Creando Uno</p>; //! NUNCA ANTES DEL USEEFFECT DEBE HABER UN RETURN

  return (
    <ul className="listado-proyectos">
      {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyecto;
