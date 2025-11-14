
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Requerimientos() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <header>
          <h1>Requerimientos</h1>
          <p>
            Tipos, técnicas de elicitation, plantillas y ejemplos prácticos.
          </p>
        </header>

        <section>
          <h2>¿Qué es un requerimiento?</h2>
          <p>
            Un requerimiento describe una capacidad, restricción o característica que el sistema debe cumplir.
            Puede ser funcional (qué hace el sistema) o no funcional (calidad, rendimiento, seguridad).
          </p>

          <h3>Tipos principales</h3>
          <ul>
            <li><strong>Requerimientos funcionales:</strong> casos de uso, historias de usuario, reglas de negocio.</li>
            <li><strong>Requerimientos no funcionales:</strong> rendimiento, seguridad, usabilidad, disponibilidad.</li>
            <li><strong>Requerimientos del dominio:</strong> especificaciones propias del área (legal, normativas).</li>
          </ul>
        </section>

        <section>
          <h2>Técnicas de elicitation</h2>
          <ol>
            <li><strong>Entrevistas</strong> con stakeholders: abiertas y estructuradas.</li>
            <li><strong>Talleres</strong> colaborativos (workshops, brainstorming).</li>
            <li><strong>Observación</strong> en sitio (shadowing) para capturar tareas reales.</li>
            <li><strong>Cuestionarios</strong> y encuestas para obtener datos cuantitativos.</li>
            <li><strong>Prototipos</strong> y mockups para validar funciones y UI.</li>
          </ol>
        </section>

        <section>
          <h2>Plantillas y ejemplos</h2>
          <p>Descargá plantillas y mirá ejemplos para usar en los trabajos prácticos.</p>

          <div>
            <div>
              <h3>Plantilla — Documento de Requerimientos</h3>
              <p>Estructura: introducción, alcance, actores, casos de uso, requerimientos funcionales y no funcionales.</p>
              <a href="/assets/plantilla_requerimientos.docx" className="btn">Descargar plantilla</a>
            </div>

            <div>
              <h3>Ejemplo: Historia de Usuario</h3>
              <p>Formato: "Como [actor], quiero [acción], para [beneficio]".</p>
              <button onClick={() => alert("Ejemplo de historia de usuario:\nComo cliente, quiero crear una cuenta para gestionar mis pedidos.")}>
                Ver ejemplo
              </button>
            </div>

            <div>
              <h3>Checklist de calidad</h3>
              <p>Puntos para revisar cada requerimiento (claro, verificable, completo, sin ambigüedades).</p>
              <a href="/assets/checklist_requerimientos.pdf" className="btn">Descargar checklist</a>
            </div>
          </div>
        </section>

        <section>
          <h2>Casos de uso y modelado</h2>
          <p>
            Los casos de uso describen interacciones usuario-sistema. Para modelarlos podés usar diagramas simples,
            tablas de pasos y condiciones de éxito/fracaso.
          </p>

          <div>
            <h3>Ejemplo corto — Caso de uso: "Realizar pedido"</h3>
            <p><strong>Actor:</strong> Cliente</p>
            <p><strong>Descripción:</strong> El cliente selecciona productos, completa datos y confirma el pedido.</p>
            <p><strong>Flujo principal:</strong></p>
            <ol>
              <li>Cliente agrega productos al carrito.</li>
              <li>Cliente proporciona dirección y medio de pago.</li>
              <li>Sistema procesa pago y confirma orden.</li>
            </ol>
            <p>Precondición: Cliente autenticado. Postcondición: Pedido registrado.</p>
          </div>
        </section>

        <section>
          <div>
            <h2>Buenas prácticas</h2>
            <ul>
              <li>Escribir requerimientos con lenguaje claro y medible.</li>
              <li>Evitar ambigüedades y términos vagos.</li>
              <li>Relacionar requerimientos con pruebas (criterios de aceptación).</li>
              <li>Versionar y mantener un histórico de cambios.</li>
            </ul>
          </div>

          <div>
            <h2>Validación</h2>
            <p>Validar con stakeholders mediante revisiones, prototipos y casos de prueba. Asegurar trazabilidad entre requerimientos y pruebas.</p>
          </div>
        </section>

        <section>
          <h2>Actividad práctica (sugerida)</h2>
          <p>En grupo: elegir un proceso simple del entorno (p. ej. "Registro de alumno") y generar:</p>
          <ol>
            <li>3 historias de usuario.</li>
            <li>1 caso de uso con flujo principal y alternativo.</li>
            <li>Checklist de aceptación para cada historia.</li>
          </ol>
          <p>Subir los archivos a la carpeta compartida y dejar el enlace en la sección de entregables.</p>
        </section>

        <section className="section">
          <h2>Enlaces útiles</h2>
          <ul>
            <li><Link to="/introduccion">Introducción a la materia</Link></li>
            <li><Link to="/procesos">Procesos de Negocios</Link></li>
            <li><Link to="/teoria">Teoría de Sistemas</Link></li>
          </ul>
        </section>

        <footer>
          Fecha: 14/11/2025
        </footer>
      </main>

      <Footer />
    </>
  );
}
