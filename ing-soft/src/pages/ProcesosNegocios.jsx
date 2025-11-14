import React from "react";
import { Link } from "react-router";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const ProcesosNegocios(){
    return(
        <>
        <Header />
        <Navbar />
        <main>
            <Header>
                <h1>Procesos de Negocios</h1>
                <p>Modelado, analisis y mejora de procesos - conceptos y ejemplos</p>
            </Header>
            <section>
                <h2>Definiciones</h2>
                <dl>
                    <dt>Procesos</li>
                    <dd>Conjunto de Actividades relacionadas que transforman entradas en salidas</li>
                    <dt>Actor / Rol</dt></li>
                    <dd>Entidad que realiza actividades dentro del proceso (usuario, sistema, area)</dd>
                    <dt>BPMN</dt>
                    <dd>Notacion estandar para modelar procesos mediante eventos, actividades</dd>
                </dl>
            </section>
            <section>
                <h2>Diagrama</h2>
                <p>Ejemplo simple: Proceso “Solicitud de compra”.</p>
                <div>
                    <p>
                    Aquí pueden insertar una imagen del diagrama exportado desde draw.io o Bizagi.
                    Si no tienen todavía, usen un placeholder y suban la imagen a /public/assets/.
                    </p>
                    <img
                    src="/assets/diagrama_solicitud_placeholder.png"
                    alt="Diagrama solicitud de compra (placeholder)"
                    className="diagram-img"
                    />
                </div>
            </section>
            <section>
          <h2>Ejemplo práctico — Solicitud de compra</h2>
          <ol>
            <li>Empleado completa formulario de solicitud.</li>
            <li>Jefe revisa y aprueba o rechaza.</li>
            <li>Compras genera orden y la envía al proveedor.</li>
            <li>Recepción confirma ingreso de bienes.</li>
          </ol>
          <p>Roles: Empleado, Jefe, Compras, Recepción.</p>
        </section>

    
        <section>
          <div>
            <h2>Herramientas</h2>
            <ul>
              <li>Bizagi Modeler</li>
              <li>draw.io / diagrams.net</li>
              <li>Camunda, Signavio (avanzado)</li>
            </ul>
          </div>

          <div>
            <h2>Buenas prácticas</h2>
            <ul>
              <li>Usar verbos en las actividades (“Enviar orden”).</li>
              <li>Indicar responsables y tiempos estimados.</li>
              <li>Medir eficiencia: tiempo, retrasos, errores.</li>
              <li>Versionar los diagramas.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Recursos y actividad</h2>

          <div>
            <div>
              <h3>Plantilla SIPOC</h3>
              <p>Mapa de proveedores, entradas, proceso y salidas.</p>
              <a href="/assets/plantilla_sipoc.xlsx" className="btn">Descargar</a>
            </div>

            <div>
              <h3>Checklist de análisis</h3>
              <p>Puntos clave para evaluar un proceso.</p>
              <Link to="/requerimientos" className="btn">Ir a Requerimientos</Link>
            </div>

            <div>
              <h3>Actividad grupal</h3>
              <p>Mapear un proceso real (5–8 pasos) y subir el PNG.</p>
              <button
                onClick={() => alert("Actividad registrada.")}
              >
                Registrar
              </button>
            </div>
          </div>
        </section>

        <footer>
          Fecha: 14/11/2025
        </footer>
      </main>

      <Footer />
    </>
  );
}