import React, { useReducer } from "react";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  PROYECTO_ERROR,
  VALIDAR_FORMULARIO,
  PORYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
} from "../../types/index";
import clienteAxios from "../../config/axios";

const ProyectoState = (props) => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null,
  };

  //Dispatch  para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //? Serie de Funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //* Obtener los Proyectos
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");

      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //*Agregar Nuevo Proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);

      //? Insertar Proyecto en el State con un Dispatch
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //*Validar Formulario por Errores

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };
  //* Selecciona el Proyecto que el usuario dio Click
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PORYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  //*Elimina un Proyecto
  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };
  return (
    <proyectoContext.Provider
      value={{
        //*states
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        //*Functions
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};
export default ProyectoState;
