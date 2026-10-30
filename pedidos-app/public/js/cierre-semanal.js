(function () {
  // Cambiar a false para mostrar la pagina normalmente.
  const CARTEL_HABILITADO = false;

  // Fecha en que activas el cartel (AAAA-MM-DD).
  // La entrega se calcula para el primer sábado que esté al menos una semana después.
  const CARTEL_ACTIVADO_EL = "2026-10-30";

  if (!CARTEL_HABILITADO) return;

  const partes = CARTEL_ACTIVADO_EL.split("-").map(Number);
  const activacion = new Date(partes[0], partes[1] - 1, partes[2]);
  const desde = new Date(activacion);
  desde.setDate(desde.getDate() + 7);

  while (desde.getDay() !== 6) {
    desde.setDate(desde.getDate() + 1);
  }

  const fechaEntrega = desde.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });
  const fechaEntregaConMayuscula =
    fechaEntrega.charAt(0).toUpperCase() + fechaEntrega.slice(1);

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
      <h1 class="cierre-semanal-titulo">¡Gracias por todas sus compras!</h1>
      <p class="cierre-semanal-mensaje">
        Los pedidos de esta semana ya están cerrados.<br>
        A partir de mañana podés volver a hacer tu pedido para la próxima entrega, el
        <strong>${fechaEntregaConMayuscula}</strong>.
      </p>
      <div class="cierre-semanal-pie">Comunidad Raider Fortaleza de María</div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add("cierre-semanal-bloqueado");

  overlay.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
  });

  document.addEventListener("keydown", function (event) {
    if (["Tab", "Escape", "Enter"].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
})();
