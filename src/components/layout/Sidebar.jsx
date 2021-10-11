import React from "react";
import ListadoProyecto from "../projects/ListadoProyecto";
import NuevoProyecto from "../projects/NuevoProyecto";

const Sidebar = () => {
  return (
    <aside>
      <h1>
        MERN <span>Tasks</span>
      </h1>
      <NuevoProyecto />
      <div className="proyectos">
        <h2>Tus Proyectos</h2>
        <ListadoProyecto />
      </div>
    </aside>
  );
};

export default Sidebar;
