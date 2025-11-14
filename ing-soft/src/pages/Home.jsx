import React from "react";
import { Link } from "react-router";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Home(){
    return(
        <>
        <Header />
        <Navbar />
        <main>
            <section>
                <h1>Carpeta Virtual de Ingenieria de Software</h1>
                <p>Trabajo Practico Grupal. Reune recursos de la materia.</p>
            </section>
            <section>
                <div>
                    <h5>Introducion</h5>
                    <p>Conceptos Basicos y objetivos del curso</p>
                    <Link to="/introduccion">Ir a introduccion</Link>
                </div>
                <div>
                    <h5>Procesos de Negocios</h5>
                    <p>Modelos y ejemplos aplicados</p>
                    <Link to="/procesos">Ir a Procesos</Link>
                </div>
                <div>
                    <h5>Requerimientos</h5>
                    <p>Tipos de Requerimientos</p>
                    <Link to="/requerimientos">Ir a Requerimietos</Link>
                </div>
                <div>
                    <h5>Teoria de Sistemas</h5>
                    <p>Modelos y ejemplos</p>
                    <Link to="/teoria">Ir a Teoria de Sistemas</Link>
                </div>
            </section>
            <section>
                <small>Fecha: 14/11/25</small>
            </section>
        </main>
        <Footer />
        </>
    );
}