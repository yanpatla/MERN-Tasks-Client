import React, { useReducer } from "react";
import alertaReducer from "./alertaReducer";
import alertaContext from "./alertaContexts";

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = (props) => {
  //*Esto se require para el useReducer que  importamos
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(alertaReducer, initialState);

  //*Functions
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria,
      },
    });
    //*Luego de 5seg Limpia el Error
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };

  return (
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta,
      }}
    >
      {props.children}
    </alertaContext.Provider>
  );
};

export default AlertaState;
