function actualizarProximaEntrega() {
  const elemento =
    document.getElementById("proximaEntrega");

  if (elemento) {
    elemento.textContent = "Sábado, 21 de noviembre";
  }
}

actualizarProximaEntrega();