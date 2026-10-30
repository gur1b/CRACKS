const PRECIO_PAQUETE = 3500;

const listaPaquetes =
  document.getElementById("listaPaquetes");

const resumenPedido =
  document.getElementById("resumenPedido");

const agregarClasico =
  document.getElementById("agregarClasico");

const agregarSurtido =
  document.getElementById("agregarSurtido");

const pedidoModal =
  document.getElementById("pedidoModal");

const pedidoModalIcon =
  document.getElementById("pedidoModalIcon");

const pedidoModalTitulo =
  document.getElementById("pedidoModalTitulo");

const pedidoModalMensaje =
  document.getElementById("pedidoModalMensaje");

const cerrarPedidoModal =
  document.getElementById("cerrarPedidoModal");

let paquetes = [];
let siguienteId = 1;


/* =========================
   CREAR PAQUETES
========================= */

function crearClasico() {

  paquetes.push({
    id: siguienteId++,
    tipo: "clasico",
    sabor: "Fangio"
  });

  render();
}


function crearSurtido() {

  paquetes.push({
    id: siguienteId++,
    tipo: "surtido",

    sabores: {
      fangio: 0,
      locomotora: 0,
      messi: 0
    }
  });

  render();
}


/* =========================
   ELIMINAR PAQUETE
========================= */

function eliminarPaquete(id) {

  paquetes =
    paquetes.filter(
      paquete => paquete.id !== id
    );

  render();
}


/* =========================
   CLÁSICO
========================= */

function cambiarSaborClasico(
  id,
  sabor
) {

  const paquete =
    paquetes.find(
      p => p.id === id
    );

  if (!paquete) return;

  paquete.sabor = sabor;

  renderResumen();
}


/* =========================
   SURTIDO
========================= */

function totalSurtido(paquete) {

  return (
    paquete.sabores.fangio +
    paquete.sabores.locomotora +
    paquete.sabores.messi
  );
}


function modificarSabor(
  id,
  sabor,
  cambio
) {

  const paquete =
    paquetes.find(
      p => p.id === id
    );

  if (!paquete) return;


  const totalActual =
    totalSurtido(paquete);


  /* SUMAR */

  if (cambio === 1) {

    if (totalActual >= 6) {
      return;
    }

    paquete.sabores[sabor]++;
  }


  /* RESTAR */

  if (cambio === -1) {

    if (
      paquete.sabores[sabor] <= 0
    ) {
      return;
    }

    paquete.sabores[sabor]--;
  }


  render();
}


/* =========================
   RENDER PAQUETES
========================= */

function renderPaquetes() {

  if (paquetes.length === 0) {

    listaPaquetes.innerHTML = `
      <div class="paquetes-vacio">

        <i class="fa-solid fa-cookie-bite"></i>

        <p>
          Todavía no agregaste ningún paquete.
        </p>

      </div>
    `;

    return;
  }


  listaPaquetes.innerHTML =
    paquetes
      .map(
        (paquete, index) => {

          if (
            paquete.tipo === "clasico"
          ) {

            return renderClasico(
              paquete,
              index
            );
          }


          return renderSurtido(
            paquete,
            index
          );

        }
      )
      .join("");
}


/* =========================
   HTML CLÁSICO
========================= */

function renderClasico(
  paquete,
  index
) {

  return `

    <div class="paquete-item">

      <div class="paquete-item-header">

        <div class="paquete-item-titulo">

          <span class="paquete-numero">
            ${index + 1}
          </span>

          <div>

            <strong>
              Paquete clásico
            </strong>

            <small>
              6 galletitas del mismo sabor
            </small>

          </div>

        </div>


        <button
          type="button"
          class="eliminar-paquete"
          onclick="eliminarPaquete(${paquete.id})"
          title="Eliminar paquete"
        >
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>


      <div class="form-group">

        <label>
          Elegí el sabor
        </label>

        <select
          class="input"
          onchange="cambiarSaborClasico(${paquete.id}, this.value)"
        >

          <option
            value="Fangio"
            ${
              paquete.sabor === "Fangio"
                ? "selected"
                : ""
            }
          >
            Fangio
          </option>


          <option
            value="Locomotora"
            ${
              paquete.sabor === "Locomotora"
                ? "selected"
                : ""
            }
          >
            Locomotora
          </option>


          <option
            value="Messi"
            ${
              paquete.sabor === "Messi"
                ? "selected"
                : ""
            }
          >
            Messi
          </option>

        </select>

      </div>


      <div class="paquete-precio">
        $${PRECIO_PAQUETE.toLocaleString("es-AR")}
      </div>

    </div>
  `;
}


/* =========================
   HTML SURTIDO
========================= */

function renderSurtido(
  paquete,
  index
) {

  const total =
    totalSurtido(paquete);


  return `

    <div class="paquete-item">

      <div class="paquete-item-header">

        <div class="paquete-item-titulo">

          <span class="paquete-numero">
            ${index + 1}
          </span>

          <div>

            <strong>
              Paquete surtido
            </strong>

            <small>
              Elegí 6 galletitas
            </small>

          </div>

        </div>


        <button
          type="button"
          class="eliminar-paquete"
          onclick="eliminarPaquete(${paquete.id})"
          title="Eliminar paquete"
        >
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>


      ${crearFilaSabor(
        paquete,
        "fangio",
        "Fangio"
      )}


      ${crearFilaSabor(
        paquete,
        "locomotora",
        "Locomotora"
      )}


      ${crearFilaSabor(
        paquete,
        "messi",
        "Messi"
      )}


      <div class="
        surtido-total
        ${
          total === 6
            ? "surtido-completo"
            : ""
        }
      ">

        <span>
          Galletitas elegidas
        </span>

        <strong>
          ${total} / 6
        </strong>

      </div>


      <div class="paquete-precio">
        $${PRECIO_PAQUETE.toLocaleString("es-AR")}
      </div>

    </div>
  `;
}


/* =========================
   FILA SABOR
========================= */

function crearFilaSabor(
  paquete,
  key,
  nombre
) {

  return `

    <div class="counter-row">

      <strong>
        ${nombre}
      </strong>


      <div class="counter-controls">

        <button
          type="button"
          class="counter-btn"
          onclick="modificarSabor(${paquete.id}, '${key}', -1)"
        >
          −
        </button>


        <span class="counter-number">
          ${paquete.sabores[key]}
        </span>


        <button
          type="button"
          class="counter-btn counter-plus"
          onclick="modificarSabor(${paquete.id}, '${key}', 1)"
        >
          +
        </button>

      </div>

    </div>
  `;
}


/* =========================
   RESUMEN
========================= */

function renderResumen() {

  if (paquetes.length === 0) {

    resumenPedido.innerHTML = `

      <div class="resumen-vacio">

        <i class="fa-solid fa-basket-shopping"></i>

        <span>
          Todavía no agregaste paquetes.
        </span>

      </div>


      <div class="resumen-total">

        <span>
          Total
        </span>

        <strong>
          $0
        </strong>

      </div>
    `;

    return;
  }


  let html = "";


  paquetes.forEach(
    (paquete, index) => {

      html += `

        <div class="resumen-paquete">

          <div class="resumen-paquete-header">

            <strong>
              Paquete ${index + 1}
            </strong>

            <span>
              $${PRECIO_PAQUETE.toLocaleString("es-AR")}
            </span>

          </div>
      `;


      if (
        paquete.tipo === "clasico"
      ) {

        html += `

          <small>
            Clásico · ${paquete.sabor}
          </small>
        `;

      } else {

        const sabores = [];


        if (
          paquete.sabores.fangio > 0
        ) {

          sabores.push(
            `${paquete.sabores.fangio} Fangio`
          );
        }


        if (
          paquete.sabores.locomotora > 0
        ) {

          sabores.push(
            `${paquete.sabores.locomotora} Locomotora`
          );
        }


        if (
          paquete.sabores.messi > 0
        ) {

          sabores.push(
            `${paquete.sabores.messi} Messi`
          );
        }


        html += `

          <small>
            Surtido · ${
              sabores.length
                ? sabores.join(" · ")
                : "sin completar"
            }
          </small>
        `;
      }


      html += `
        </div>
      `;
    }
  );


  const total =
    paquetes.length *
    PRECIO_PAQUETE;


  html += `

    <div class="resumen-total">

      <span>
        Total
      </span>

      <strong>
        $${total.toLocaleString("es-AR")}
      </strong>

    </div>
  `;


  resumenPedido.innerHTML =
    html;
}


/* =========================
   RENDER GENERAL
========================= */

function render() {

  renderPaquetes();
  renderResumen();

}


/* =========================
   AGREGAR
========================= */

agregarClasico.addEventListener(
  "click",
  crearClasico
);


agregarSurtido.addEventListener(
  "click",
  crearSurtido
);


/* =========================
   FORMULARIO
========================= */

document
  .getElementById("pedidoForm")
  .addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();


      const nombre =
        document
          .getElementById("nombre")
          .value
          .trim();


      const telefono =
        document
          .getElementById("telefono")
          .value
          .trim();


      const pago =
        document
          .querySelector(
            'input[name="pago"]:checked'
          )
          ?.value;


      const comentarios =
        document
          .getElementById("comentarios")
          .value
          .trim();


      /* DATOS OBLIGATORIOS */

      if (
        !nombre ||
        !telefono
      ) {

        mostrarModalPedido(
  "error",
  "Faltan datos",
  "Completá nombre y teléfono."
);

        return;
      }


      /* AL MENOS UN PAQUETE */

      if (
        paquetes.length === 0
      ) {

        mostrarModalPedido(
  "error",
  "Falta tu pedido",
  "Agregá al menos un paquete."
);

        return;
      }


      /* SURTIDOS COMPLETOS */

      const surtidoIncompleto =
        paquetes.find(
          paquete =>
            paquete.tipo === "surtido" &&
            totalSurtido(paquete) !== 6
        );


      if (surtidoIncompleto) {

        mostrarModalPedido(
  "error",
  "Paquete incompleto",
  "Cada paquete surtido debe tener exactamente 6 galletitas."
);

        return;
      }


      const total =
        paquetes.length *
        PRECIO_PAQUETE;


      const payload = {

        nombre,
        telefono,
        pago,
        comentarios,

        paquetes,

        cantidadPaquetes:
          paquetes.length,

        total

      };


      const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyYRmeHCdmRrSqKU5dLINd3GOQmP-1Bha5gYFbKp3QIW-vdlT6wFacCxVaChM_loG0r/exec";


try {

  const datosParaEnviar = {
    ...payload,
    precioPaquete: PRECIO_PAQUETE
  };


  await fetch(
    APPS_SCRIPT_URL,
    {
      method: "POST",

      mode: "no-cors",

      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },

      body:
        JSON.stringify(
          datosParaEnviar
        )
    }
  );


 mostrarModalPedido(
  "ok",
  "¡Pedido enviado! 🍪",
  "Tu pedido fue enviado correctamente."
);

  paquetes = [];

  siguienteId = 1;

  document
    .getElementById("pedidoForm")
    .reset();


  actualizarDatosPago();

  render();


} catch (error) {

  console.error(
    "Error al enviar:",
    error
  );


 mostrarModalPedido(
  "error",
  "No pudimos enviar el pedido",
  "Ocurrió un problema al enviar tu pedido. Probá nuevamente."
);

}

    }
  );


/* =========================
   DATOS DE TRANSFERENCIA
========================= */

const opcionesPago =
  document.querySelectorAll(
    'input[name="pago"]'
  );

const datosTransferencia =
  document.getElementById(
    "datosTransferencia"
  );


function actualizarDatosPago() {

  if (!datosTransferencia) {
    return;
  }


  const pagoSeleccionado =
    document.querySelector(
      'input[name="pago"]:checked'
    )?.value;


  const esTransferencia =
    pagoSeleccionado ===
    "transferencia";


  datosTransferencia.hidden =
    !esTransferencia;


  datosTransferencia.setAttribute(
    "aria-hidden",
    String(!esTransferencia)
  );

}


opcionesPago.forEach(
  opcion => {

    opcion.addEventListener(
      "change",
      actualizarDatosPago
    );

  }
);


actualizarDatosPago();

function actualizarProximaEntrega() {
  const ahora = new Date();

  const diaSemana = ahora.getDay();
  // 0 domingo, 1 lunes, ..., 5 viernes, 6 sábado

  const hora = ahora.getHours();

  let diasHastaSabado =
    (6 - diaSemana + 7) % 7;

  // Si hoy es sábado, queremos el sábado siguiente
  if (diasHastaSabado === 0) {
    diasHastaSabado = 7;
  }

  // Si es viernes después de las 19:00,
  // pasar al sábado de la semana siguiente
  if (
    diaSemana === 5 &&
    hora >= 19
  ) {
    diasHastaSabado += 7;
  }

  const proximaEntrega =
    new Date(ahora);

  proximaEntrega.setDate(
    ahora.getDate() + diasHastaSabado
  );

  const textoFecha =
    proximaEntrega.toLocaleDateString(
      "es-AR",
      {
        weekday: "long",
        day: "numeric",
        month: "long"
      }
    );

  const elemento =
    document.getElementById("proximaEntrega");

  if (elemento) {
    elemento.textContent =
      textoFecha.charAt(0).toUpperCase() +
      textoFecha.slice(1);
  }
}

actualizarProximaEntrega();

function mostrarModalPedido(
  tipo,
  titulo,
  mensaje
) {

  pedidoModalIcon.classList.remove(
    "error"
  );

  if (tipo === "error") {

    pedidoModalIcon.classList.add(
      "error"
    );

    pedidoModalIcon.innerHTML =
      '<i class="fa-solid fa-xmark"></i>';

  } else {

    pedidoModalIcon.innerHTML =
      '<i class="fa-solid fa-check"></i>';

  }

  pedidoModalTitulo.textContent =
    titulo;

  pedidoModalMensaje.textContent =
    mensaje;

  pedidoModal.hidden = false;
}


function ocultarModalPedido() {

  pedidoModal.hidden = true;

}


cerrarPedidoModal.addEventListener(
  "click",
  ocultarModalPedido
);


pedidoModal
  .querySelector(
    ".pedido-modal-overlay"
  )
  .addEventListener(
    "click",
    ocultarModalPedido
  );

render();