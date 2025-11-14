import React from "react";
import { Link } from "react-router";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const IntroduccionIng(){
    return(
        <>
        <Header />
        <Navbar />
        <main>
            <Header>
                <h1>Introduccion a Ingenieria de Software</h1>
                <p>Materia: Ingerieria de Software</p>
            </Header>
            <section>
                <h2>Objetivos</h2>
                <ul>
                    <li>Entender el ciclo de vida del desarrollo de soft.</li>
                    <li>Conocer Procesos, modelos y buenas practicas de ing.</li>
                    <li>Aprender a documentar requerimientos y diseñar soluciones</li>
                </ul>
            </section>
            <section>
                <h2>Temario</h2>
                <div>
                    <h3><button>Unidad 1 - Conceptos y modelos</button></h3>
                </div>
                <div>
                    Introduccion a ingenieria de software, procesos, modelos en cascada, iterativos y agiles.
                </div>
                <div>
                    <h3>
                        <button>
                            Unidad 2 - Requeriminetos y analisis
                        </button>
                    </h3>
                    <div>
                        Tecnicas de elicitacion, tipos de requerimientos, caso de uso y modelado.
                    </div>
                </div>
                <div>
                    <h3>
                        <button>
                            Unidad 3 - Diseño, pruebas y mantenimiento
                        </button>
                    </h3>
                    <div>
                        Principios de diseño, pruebas (unitarias, intergracion) y mantenimiento evolutivo.
                    </div>
                </div>
            </section>
            <section>
                <h2>Metodologia y evaluacion</h2>
                <p>Clases teoricas y practicas. Trabajos, parciales</p>
            </section>
            <section>
                <h2>Entregables y recursos</h2>
                <div>
                    <h5>Plantilla de requerimientos</h5>
                    <p>Descarga la plantilla para documentar casos de uso y requerimientos</p>
                    <a href="">Descargar</a>
                </div>
                <div>
                    <h5>Ejemplo corto: Caso de Estudio</h5>
                    <p>Resumen de un caso para analizar en clases</p>
                    <Link to="/requerimientos">Ver seccion Requerimientos</Link>
                </div>
            </section>
            <footer>
                <small>Docente: Silvia - 14/11/25</small>
            </footer>
        </main>
        <Footer />
        </>
    );
}