const boton = document.getElementById("probarBackend");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", async () => {
  const respuesta = await fetch("/api/test");

  const datos = await respuesta.json();

  resultado.textContent = datos.mensaje;
});