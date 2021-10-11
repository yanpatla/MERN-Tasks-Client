import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alerts/alertaContexts";
import authContext from "../../context/autenticacion/authContext";
const NuevaCuenta = (props) => {
  //* Extraer los Valores del Context
  const contextAlert = useContext(alertaContext); //? Con esto tenemos Acceso a las Funciones y al State
  const { alerta, mostrarAlerta } = contextAlert;

  const contextAuth = useContext(authContext);
  const { mensaje, autenticado, registrarUsuario } = contextAuth;

  //* En caso de que el Usuario se Haya Autenticado  o Registrado o sea un Registro Duplicado
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
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  //*Extraer de usuario

  const { nombre, email, password, confirmar } = usuario;

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
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los Campos son Obligatorios", "alerta-error");
      return;
    }
    //*Password minimo de 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "El Password Debe ser al Menos de 6 Caracteres",
        "alerta-error"
      );
      return;
    }
    //* Los dos password son iguales
    if (password !== confirmar) {
      mostrarAlerta("Los Passwords no son Iguales", "alerta-error");
      return;
    }
    //* Pasarlo al action que vendria siendo la funcion que vamos a definir en nuestro reducer
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };
  return (
    <div>
      <div className="form-usuario">
        {alerta ? (
          <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}
        <div className="contenedor-form sombra-dark">
          <h1>Obtener una Cuenta</h1>
          <form onSubmit={onSubmit}>
            <div className="campo-form">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                placeholder="Tu Nombre"
                onChange={onChange}
              />
            </div>
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
              <label htmlFor="confirmar">Confirma Password</label>
              <input
                type="password"
                id="confirmar"
                name="confirmar"
                value={confirmar}
                placeholder="Repite tu Password"
                onChange={onChange}
              />
            </div>

            <div className="campo-form">
              <input
                type="submit"
                value="Registrar"
                className="btn btn-primario btn-block"
              />
            </div>
          </form>
          <Link to={"/"} className="enlace-cuenta">
            Iniciar Sesion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NuevaCuenta;
