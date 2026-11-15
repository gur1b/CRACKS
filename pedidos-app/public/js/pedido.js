const PRECIO_PAQUETE = 3500;
const PRECIO_SALSA_CHOCOLATE = 1000;
const PAQUETES_POR_SALSA_GRATIS = 3;

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
    sabor: "Fangio",
    chocolate: 0
  });

  render();
}


function crearSurtido() {

  paquetes.push({
    id: siguienteId++,
    tipo: "surtido",

    sabores: {
      fangio: 2,
      locomotora: 2,
      messi: 2
    },
    chocolate: 0
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


function cambiarChocolate(
  id,
  agregado
) {

  const paquete =
    paquetes.find(
      p => p.id === id
    );

  if (!paquete) return;

  paquete.chocolate =
    agregado ? 1 : 0;

  render();
}


function calcularPrecioPaquete(paquete) {

  return (
    PRECIO_PAQUETE +
    Number(paquete.chocolate || 0) *
      PRECIO_SALSA_CHOCOLATE
  );
}


function cantidadSalsasGratis() {

  return Math.floor(
    paquetes.length /
      PAQUETES_POR_SALSA_GRATIS
  );
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


      <label class="salsa-chocolate-opcion">

        <input
          type="checkbox"
          ${paquete.chocolate ? "checked" : ""}
          onchange="cambiarChocolate(${paquete.id}, this.checked)"
        />

        <span class="salsa-chocolate-icono">
          <svg class="salsa-chocolate-svg" viewBox="0 0 24 24" aria-hidden="true">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
              <path d="M5 13V4.75a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V13l-1.75-1.25L15.5 13l-1.75-1.25L12 13l-1.75-1.25L8.5 13l-1.75-1.25Zm7-10.25V12M5 7.5h14"/>
              <path d="m5 13l1.75-1.25L8.5 13l1.75-1.25L12 13l1.75-1.25L15.5 13l1.75-1.25L19 13v6.25a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/>
            </g>
          </svg>
        </span>

        <span class="salsa-chocolate-detalle">
          <strong>Salsa de chocolate</strong>
          <small>Agregar por $${PRECIO_SALSA_CHOCOLATE.toLocaleString("es-AR")}</small>
        </span>

      </label>


      <div class="paquete-precio">
        $${calcularPrecioPaquete(paquete).toLocaleString("es-AR")}
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
              2 galletitas de cada sabor
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

      <div class="surtido-regla">
        <i class="fa-solid fa-circle-info"></i>
        <span>Incluye 2 galletitas Fangio, 2 Locomotora y 2 Messi.</span>
      </div>

      <label class="salsa-chocolate-opcion">

        <input
          type="checkbox"
          ${paquete.chocolate ? "checked" : ""}
          onchange="cambiarChocolate(${paquete.id}, this.checked)"
        />

        <span class="salsa-chocolate-icono">
          <svg class="salsa-chocolate-svg" viewBox="0 0 24 24" aria-hidden="true">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
              <path d="M5 13V4.75a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V13l-1.75-1.25L15.5 13l-1.75-1.25L12 13l-1.75-1.25L8.5 13l-1.75-1.25Zm7-10.25V12M5 7.5h14"/>
              <path d="m5 13l1.75-1.25L8.5 13l1.75-1.25L12 13l1.75-1.25L15.5 13l1.75-1.25L19 13v6.25a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/>
            </g>
          </svg>
        </span>

        <span class="salsa-chocolate-detalle">
          <strong>Salsa de chocolate</strong>
          <small>Agregar por $${PRECIO_SALSA_CHOCOLATE.toLocaleString("es-AR")}</small>
        </span>

      </label>

      <div class="paquete-precio">
        $${calcularPrecioPaquete(paquete).toLocaleString("es-AR")}
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
              $${calcularPrecioPaquete(paquete).toLocaleString("es-AR")}
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
                : "2 Fangio · 2 Locomotora · 2 Messi"
            }
          </small>
        `;
      }

      if (paquete.chocolate) {
        html += `

          <small>
            <svg class="salsa-chocolate-svg salsa-chocolate-mini-icon" viewBox="0 0 24 24" aria-hidden="true">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                <path d="M5 13V4.75a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V13l-1.75-1.25L15.5 13l-1.75-1.25L12 13l-1.75-1.25L8.5 13l-1.75-1.25Zm7-10.25V12M5 7.5h14"/>
                <path d="m5 13l1.75-1.25L8.5 13l1.75-1.25L12 13l1.75-1.25L15.5 13l1.75-1.25L19 13v6.25a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/>
              </g>
            </svg>
            Salsa de chocolate
          </small>
        `;
      }


      html += `
        </div>
      `;
    }
  );

  const salsasGratis =
    cantidadSalsasGratis();

  if (salsasGratis > 0) {
    html += `

      <div class="resumen-paquete resumen-promo-salsa">

        <div class="resumen-paquete-header">

          <strong>
            <i class="fa-solid fa-gift"></i>
            Salsa${salsasGratis > 1 ? "s" : ""} de chocolate gratis
            ${salsasGratis > 1 ? `× ${salsasGratis}` : ""}
          </strong>

          <span>
            Gratis
          </span>

        </div>

        <small>
          Promo: una salsa gratis por cada 3 paquetes.
        </small>

      </div>
    `;
  }


  const total =
    paquetes.reduce(
      (acumulado, paquete) =>
        acumulado + calcularPrecioPaquete(paquete),
      0
    );


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


function renderPromoSalsa() {

  const promoSalsa =
    document.getElementById("promoSalsa");

  if (!promoSalsa) return;

  const salsasGratis =
    cantidadSalsasGratis();

  const paquetesParaProximaSalsa =
    PAQUETES_POR_SALSA_GRATIS -
    (paquetes.length % PAQUETES_POR_SALSA_GRATIS);

  let mensaje;

  if (salsasGratis > 0) {
    mensaje =
      `¡Promo de cierre! Te llevás ${salsasGratis} ` +
      `salsa${salsasGratis > 1 ? "s" : ""} de chocolate gratis.`;
  } else {
    mensaje =
      `¡Promo! Una salsa de chocolate gratis por cada ` +
      `${PAQUETES_POR_SALSA_GRATIS} paquetes.`;
  }

  promoSalsa.innerHTML = `

    <span class="promo-salsa-icono">
      <i class="fa-solid fa-gift" aria-hidden="true"></i>
    </span>

    <span class="promo-salsa-contenido">
      <strong>${mensaje}</strong>
      <small>
        Agregá ${paquetesParaProximaSalsa}
        paquete${paquetesParaProximaSalsa === 1 ? "" : "s"} más
        para la próxima salsa gratis.
      </small>
    </span>
  `;
}


/* =========================
   RENDER GENERAL
========================= */

function render() {

  renderPaquetes();
  renderResumen();
  renderPromoSalsa();

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
            (
              paquete.sabores.fangio !== 2 ||
              paquete.sabores.locomotora !== 2 ||
              paquete.sabores.messi !== 2
            )
        );


      if (surtidoIncompleto) {

        mostrarModalPedido(
  "error",
  "Paquete incompleto",
  "Cada paquete surtido debe tener exactamente 2 galletitas de cada sabor."
);

        return;
      }


      const total =
        paquetes.reduce(
          (acumulado, paquete) =>
            acumulado + calcularPrecioPaquete(paquete),
          0
        );

      const salsasGratis =
        cantidadSalsasGratis();

      const paquetesParaEnviar =
        paquetes.map(
          (paquete, index) => {
            const tieneSalsaGratis =
              (index + 1) %
                PAQUETES_POR_SALSA_GRATIS ===
              0;

            return {
              ...paquete,
              chocolate:
                Number(paquete.chocolate || 0) +
                (tieneSalsaGratis ? 1 : 0),
              precioPaquete:
                calcularPrecioPaquete(paquete),
              comentarios: [
                comentarios,
                tieneSalsaGratis
                  ? "Salsa gratis"
                  : ""
              ]
                .filter(Boolean)
                .join(" | ")
            };
          }
        );


      const payload = {

        nombre,
        telefono,
        pago,
        comentarios,

        paquetes: paquetesParaEnviar,

        cantidadPaquetes:
          paquetes.length,

        salsasGratis,

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
  const elemento =
    document.getElementById("proximaEntrega");

  if (elemento) {
    elemento.textContent = "Sábado, 21 de noviembre";
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