import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; //? ELementos necesarios para habilitar el Routing en nuestro proyecto
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/projects/Proyectos";

//*Contexts
import ProyectoState from "./context/projects/proyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alerts/alertaState";
import AuthState from "./context/autenticacion/authState";

//*TOKEN
import { tokenAuth } from "./config/tokenAuth";

//* HOC
import PrivateRoute from "./components/routes/PrivateRoute";

//*Revisar si Tenemos un Token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    //? Lo que este por fuera de Switch se va a ver en todas las paginas
    // TODO lo que coloques dentro del Switch van a ser las diferentes paginas
    //*Con Route definis las rutas

    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <PrivateRoute exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
