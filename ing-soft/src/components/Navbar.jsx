import {Link, useNavigate} from "react-router";

export const Navbar = ({isAuth, onLogout}) => {
    const logoutClick {


    



    };

    return(
        <nav>
            <div>
                <h1><span>Ingenieria de Software</span></h1>
            </div>
            <div>
                {isAuth === "authenticated" ? (
                    <>
                    <Link to="/home">Inicio</Link>
                    <Link to="/introduccion">Introduccion a Ingenieria de Software</Link>
                    <Link to="/requerimientos">Requerimientos</Link>
                    <Link to="/teoria">Teoria de Sistemas</Link>
                    <Link to="/procesos">Procesos de Negocios</Link>
                    </>
                ) : (
                    <>
                    <Link to="/login">Iniciar Sesión</Link>
                    <Link to="/register">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    );
};