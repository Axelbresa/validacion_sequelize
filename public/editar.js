const formReserva = document.querySelector('#formNuevaReserva');
const reservaId = formReserva.dataset.id;

// Aleternativa utilizando la captura del pathname
// const reservaId = window.location.pathname.split('/').pop();
const nombre = document.querySelector("#nombre").value;
const Usuario = document.querySelector("#usuario").value;
const email = document.querySelector("#email").value;
const clave = document.querySelector("#clave").value;

document.addEventListener('DOMContentLoaded', async () => {
  // Traemos la reserva que se va a editar
  const response = await fetch(`/api/${reservaId}`);
  const data = await response.json();

  // Mostrar en el formulario los datos de la reserva que se quiere actualizar
  nombre.value = data.nombre;
  Usuario.value = data.Usuario;
  email.value = data.email;
  clave.value = data.clave;

});

formReserva.addEventListener('submit', async (e) => {
  e.preventDefault();

  reservaActualizada = {
    nombre: nombre.value,
    usuario: usuario.value,
    email: email.value,
    clave: clave.value,
  };

  // Se envÃ­an los nuevos datos al servidor express
  const response = await fetch(`/api/${reservaId}`, {
    method: 'PUT',
    body: JSON.stringify(reservaActualizada),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const respToJson = await response.json();

  if (response.status !== 200) {
    return Swal.fire({
      title: 'Error',
      text: respToJson.message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  setTimeout(() => {
    // Redireccionar al usuario
    window.location.href = '/';
  }, 1000);
})