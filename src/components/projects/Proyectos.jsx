import React, { useContext, useEffect } from "react";
import Barra from "../layout/Barra";
import Sidebar from "../layout/Sidebar";
import FormTarea from "../tasks/FormTarea";
import ListadoTareas from "../tasks/ListadoTareas";
import authContext from "../../context/autenticacion/authContext";

const Proyectos = () => {
  //*Extraer la Info de Atuenticacion
  const contextAuth = useContext(authContext);
  const { usuarioAutenticado } = contextAuth; //? Esto va a cargar la info del Usuario Autenticado
  //? Lo Coloco en un Effect  para que cuando se Actualize vamos a tener esa Info
  useEffect(() => {
    usuarioAutenticado();
      //eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar />

      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
