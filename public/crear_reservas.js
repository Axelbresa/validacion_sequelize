const formCrearReserva = document.querySelector("#formNuevaReserva");

formCrearReserva.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const email = document.querySelector("#email").value;
  const clave = document.querySelector("#clave").value;
  const Usuario = document.querySelector("#Usuario").value;
  



  const reserva = {
    nombre,
    Usuario,
    email,
    clave
  };

  const response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify(reserva),
    headers: {
      "Content-Type": "application/json", // Cuando se envían datos JSON al servidor
    },
  });

  const data = await response.json();

  alert(data.message);
  window.location.href = "/";
});
