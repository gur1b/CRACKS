(function () {
  const marcas = document.querySelectorAll(".brand > div:not(.brand-icon)");

  marcas.forEach(function (marca) {
    if (marca.querySelector(".brand-comunidad")) return;

    const nombre = document.createElement("span");
    nombre.className = "brand-comunidad";
    nombre.textContent = "Comunidad Raider Fortaleza de María";
    marca.appendChild(nombre);
  });
})();
