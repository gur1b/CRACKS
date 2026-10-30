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