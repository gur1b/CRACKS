(function () {
  const modal = document.getElementById("pedidoModal");
  if (!modal) return;

  const titulo = document.getElementById("pedidoModalTitulo");
  const icono = document.getElementById("pedidoModalIcon");
  const tarjeta = modal.querySelector(".pedido-modal-card");

  if (!titulo || !icono || !tarjeta) return;

  let pie = tarjeta.querySelector(".pedido-modal-comunidad");
  if (!pie) {
    pie = document.createElement("div");
    pie.className = "pedido-modal-comunidad";
    pie.textContent = "Comunidad Raider Fortaleza de María";
    tarjeta.appendChild(pie);
  }

  const observer = new MutationObserver(function () {
    if (modal.hidden) return;

    const esError = icono.classList.contains("error");
    pie.hidden = esError;

    if (!esError && titulo.textContent !== "¡Gracias por tu pedido!") {
      titulo.textContent = "¡Gracias por tu pedido!";
    }
  });

  observer.observe(modal, {
    attributes: true,
    attributeFilter: ["hidden"],
  });

  observer.observe(titulo, {
    childList: true,
    characterData: true,
    subtree: true,
  });

  observer.observe(icono, {
    attributes: true,
    attributeFilter: ["class"],
  });
})();
