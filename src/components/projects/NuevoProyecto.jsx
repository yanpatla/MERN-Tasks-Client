import React, { Fragment, useContext, useState } from "react";
import proyectoContext from "../../context/projects/proyectoContext";

const NuevoProyecto = () => {
  //?obtener el State del Formulario

  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  //?State para Proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });
console.log(proyecto);
  //*Extraer nombre de Proyecto
  const { nombre } = proyecto;

  //? Lee los Contenidos del input
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //?Cuando el Usuario envia un Proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();
    // Validar el Proyecto
    if (nombre === "") {
      mostrarError()
      return;
    }

    //Agregar al Statre
    agregarProyecto(proyecto);
    //Reiniciar el Form
    guardarProyecto({
      nombre: "",
    });
  };

  //Mostarar el Formulario
  const onClickFormulario = () => {
    mostrarFormulario();
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            type="submit"
            value="Agregar Proyecto"
            className="btn btn-primario btn-block"
          />
        </form>
      ) : null}

      {errorformulario ? <p className="mensaje error">El Nombre del Proyecto es Obvligatorio</p>:null}
    </Fragment>
  );
};

export default NuevoProyecto;
