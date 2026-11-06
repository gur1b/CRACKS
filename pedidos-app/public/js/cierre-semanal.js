(function () {
  // Cambiar a false para mostrar la página normalmente.
  const CARTEL_HABILITADO = true;

  // Fecha de la próxima entrega (AAAA-MM-DD).
  const FECHA_PROXIMA_ENTREGA = "2026-11-14";

  if (!CARTEL_HABILITADO) return;

  // Convertir la fecha de entrega.
  const partes = FECHA_PROXIMA_ENTREGA.split("-").map(Number);
  const desde = new Date(partes[0], partes[1] - 1, partes[2]);

  // Formatear fecha en español.
  const fechaEntrega = desde.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });

  const fechaEntregaConMayuscula =
    fechaEntrega.charAt(0).toUpperCase() + fechaEntrega.slice(1);

  // Crear el cartel.
  const overlay = document.createElement("div");
  overlay.className = "cierre-semanal";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Pedidos cerrados por esta semana");

  overlay.innerHTML = `
    <div class="cierre-semanal-tarjeta">
      <div class="cierre-semanal-icono" aria-hidden="true">
        <i class="fa-solid fa-cookie-bite"></i>
      </div>

      <h1 class="cierre-semanal-titulo">
        ¡Gracias por todas sus compras!
      </h1>

      <p class="cierre-semanal-mensaje">
        Los pedidos de esta semana ya están cerrados.<br>
        A partir de mañana podés volver a hacer tu pedido
        para la próxima entrega, el
        <strong>${fechaEntregaConMayuscula}</strong>.
      </p>

      <div class="cierre-semanal-pie">
        Comunidad Raider Fortaleza de María
      </div>
    </div>
  `;

  // Mostrar el cartel.
  document.body.appendChild(overlay);
  document.body.classList.add("cierre-semanal-bloqueado");

  // Bloquear clics en el cartel.
  overlay.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
  });

  // Bloquear determinadas teclas.
  document.addEventListener(
    "keydown",
    function (event) {
      if (["Tab", "Escape", "Enter"].includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    true
  );
})();
