function actualizarProximaEntrega() {
  const elemento =
    document.getElementById("proximaEntrega");

  if (elemento) {
    elemento.textContent = "Sábado, 14 de noviembre";
  }
}

actualizarProximaEntrega();