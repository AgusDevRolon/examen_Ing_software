import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const TeoriaSistemas() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <header>
          <h1>Teoría de Sistemas</h1>
          <p>
            Principios generales, tipos de sistemas y su aplicación en Ingeniería de Software.
          </p>
        </header>

        <section>
          <h2>Conceptos clave</h2>
          <dl>
            <dt><strong>Sistema</strong></dt>
            <dd>Conjunto de elementos interrelacionados que trabajan juntos para lograr un objetivo común.</dd>

            <dt><strong>Entrada / Proceso / Salida</strong></dt>
            <dd>Modelo básico: recursos que ingresan, transformación y resultado.</dd>

            <dt><strong>Retroalimentación</strong></dt>
            <dd>Mecanismo mediante el cual las salidas influyen en futuras entradas o decisiones.</dd>

            <dt><strong>Entorno</strong></dt>
            <dd>Todo lo externo que afecta al sistema (otras organizaciones, regulaciones, usuarios).</dd>
          </dl>
        </section>

        <section>
          <div>
            <h2>Tipos de sistemas</h2>
            <ul>
              <li><strong>Sistemas abiertos:</strong> intercambian materia/energía/información con el entorno.</li>
              <li><strong>Sistemas cerrados:</strong> sin intercambio significativo con el entorno (más teóricos).</li>
              <li><strong>Sistemas complejos:</strong> muchos componentes e interacciones no lineales.</li>
            </ul>
          </div>

          <div>
            <h2>Modelos comunes</h2>
            <ul>
              <li>Modelo entrada-proceso-salida</li>
              <li>Modelos dinámicos con retroalimentación</li>
              <li>Modelado por capas (presentación, lógica, datos)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Componentes y propiedades importantes</h2>
          <ul>
            <li><strong>Componentes:</strong> subsistemas, interfaces, conexiones.</li>
            <li><strong>Propiedades:</strong> emergentes, homeostasis, resiliencia, modularidad.</li>
            <li><strong>Interconexión:</strong> cómo fluye la información entre partes.</li>
          </ul>
        </section>

        <section>
          <h2>Aplicaciones en Ingeniería de Software</h2>
          <p>
            La teoría de sistemas ayuda a entender arquitecturas, integraciones, comportamiento emergente
            en sistemas distribuidos y la gestión del cambio en grandes soluciones.
          </p>

          <div>
            <div>
              <h3>Arquitectura</h3>
              <p>Diseñar subsistemas con interfaces bien definidas y responsabilidades claras.</p>
            </div>

            <div>
              <h3>Integración</h3>
              <p>Modelar flujos de datos y dependencias entre servicios para evitar acoplamientos indeseados.</p>
            </div>

            <div>
              <h3>Mantenimiento</h3>
              <p>Comprender retroalimentación y efectos secundarios al modificar componentes.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Ejemplo práctico — Sistema de Gestión de Tareas</h2>
          <p>Breve descripción y componentes:</p>
          <ul>
            <li><strong>Entradas:</strong> solicitudes de usuarios, datos de tareas.</li>
            <li><strong>Procesos:</strong> creación, asignación, notificación, priorización.</li>
            <li><strong>Salidas:</strong> tareas asignadas, reportes, métricas.</li>
            <li><strong>Retroalimentación:</strong> métricas de uso que ajustan prioridades y reglas de negocio.</li>
          </ul>
        </section>

        <section>
          <h2>Herramientas y lecturas recomendadas</h2>
          <ul>
            <li>“General Systems Theory” — Ludwig von Bertalanffy (lectura clásica).</li>
            <li>Patrones de arquitectura de software (capas, microservicios, event-driven).</li>
            <li>Modelado con diagramas de bloques, diagramas de flujo y arquitecturas C4.</li>
          </ul>

          <p>
            Recursos adicionales: apuntes de cátedra, artículos y ejemplos en la carpeta compartida.
          </p>
        </section>

        <section>
          <h2>Actividad sugerida</h2>
          <p>En grupo: elegir un sistema simple (p. ej. biblioteca, registro de alumnos, carrito de compras) y:</p>
          <ol>
            <li>Identificar entradas, procesos y salidas.</li>
            <li>Mapear subsistemas y sus interfaces.</li>
            <li>Detectar posibles bucles de retroalimentación y proponer métricas para controlarlos.</li>
          </ol>
          <p>Subir el diagrama y un resumen a la carpeta del grupo.</p>
        </section>

        <section>
          <h2>Enlaces internos</h2>
          <ul>
            <li><Link to="/introduccion">Introducción</Link></li>
            <li><Link to="/requerimientos">Requerimientos</Link></li>
            <li><Link to="/procesos">Procesos de Negocios</Link></li>
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
