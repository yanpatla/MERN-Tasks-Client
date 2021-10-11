import React, { useState, useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alerts/alertaContexts";
import authContext from "../../context/autenticacion/authContext";
const Login = (props) => {
  //* Extraer los Valores del Context
  const contextAlert = useContext(alertaContext); //? Con esto tenemos Acceso a las Funciones y al State
  const { alerta, mostrarAlerta } = contextAlert;

  const contextAuth = useContext(authContext);
  const { mensaje, autenticado, iniciarSesion } = contextAuth;
    //* En caso de que el password o Usuario no Excista
  //? UseEffect va a Estar al Tanto de los Cambios que suceden en Nuestra APP y va a Recargar y hacer algunos Ajustes
  useEffect(() => {
    if (autenticado) {
      //? Si el Usuario Esta Ustenticado Me Redirecciona a Proyectos
      props.history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
      //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]); //? Dependencias que  vamos a Escuchar el Cambio
  //TODO Como utulizamos React ROuter Dom podemos Acceder a props.history
  //*State para inicar Sesion

  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  //*Extraer de usuario

  const { email, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario, //? Tomo una copia de ususario para que si ponga otra cosa no se reescriba
      [e.target.name]: e.target.value,
    });
  };

  //!Cuando el Usuario quiere inciar sesion
  const onSubmit = (e) => {
    e.preventDefault();

    //*Validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los Campos son Obligatorios", "alerta-error");
    
    }

    //* Pasarlo al action que vendria siendo la funcion que vamos a definir en nuestro reducer
    iniciarSesion({email, password})
  };
  return (
    <div>
      <div className="form-usuario">
        {alerta ? (
          <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}
        <div className="contenedor-form sombra-dark">
          <h1>Iniciar Sesion</h1>
          <form onSubmit={onSubmit}>
            <div className="campo-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Tu Email"
                onChange={onChange}
              />
            </div>
            <div className="campo-form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Tu Password"
                onChange={onChange}
              />
            </div>

            <div className="campo-form">
              <input
                type="submit"
                value="Iniciar Sesion"
                className="btn btn-primario btn-block"
              />
            </div>
          </form>
          <Link to={"/nueva-cuenta"} className="enlace-cuenta">
            Obtener Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
