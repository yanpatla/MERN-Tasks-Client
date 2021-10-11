//todo Aqui vamos a importar tanto Context como Reducer
//!Carpeta principal ya que tanto el Reducer como el Context Reacaen aqui
import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import clienteAxios from "../../config/axios";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
} from "../../types";
const TareaState = (props) => {
  //* Aqui es donde Definimos un State Inicial

  const initalState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  //* Crear el Dispatch y el State

  const [state, dispatch] = useReducer(tareaReducer, initalState); //? Toma como Parametros el reducer y el stateinicial(initalState)

  //?Crear las Funciones

  //* Obtener las Tareas de un Proyecto
  const obtenerTareas = async (proyecto) => {
    console.log(proyecto);
    try {
      const resultado = await clienteAxios.get(`/api/tareas`, {params: {proyecto}});
       
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //*Agregar una Tarea al Proyecto Seleccionado
  const agregarTarea = async (tarea) => {
    console.log(tarea);
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      console.log(resultado);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //*Valida y Mustra un Error en caso de que sea ncesario
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //*Elimiar Tarea por ID

  const eliminarTarea = async(id,proyecto) => {
 try {
await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});

  dispatch({
    type: ELIMINAR_TAREA,
    payload: id,
  });
 } catch (error) {
   console.log(error);
 }
  };

  //* CAMBIA EL ESTADO DE CADA TAREA

 //* Edita/Modifica Tarea

 const actualizaTarea = async(tarea) => {
 try {
   const resultado = await  clienteAxios.put(`/api/tareas/${tarea._id}`,tarea)
console.log(resultado);
  dispatch({
    type: ACTUALIZAR_TAREA,
    payload: resultado.data,
  });
 } catch (error) {
   
 }
 
};


  //*Extrae una tarea para Edicion
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

 
  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizaTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
