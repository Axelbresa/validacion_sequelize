const obtenerDatos = async () => {
    // Pedir las reservas al servidor
    const data = await fetch('/api', {
        method: 'GET'
    });
    const reservas = await data.json();
    return reservas;
}


const mostrarReservas = (reservas, tablaElement) => {
    let registros = '';
    reservas.forEach(reserva => {
        registros += `
            <tr>
                <td>${reserva.codigo}</td>
                <td>${reserva.nombre}</td>
                <td>${reserva.Usuario}</td>
                <td>${reserva.email}</td>
                <td>${reserva.clave}</td>
                <td class="gap-1">               
                    <a href="/editar/${reserva.id}" class="btn btn-sm btn-warning fa-regular fa-pen-to-square">
                        editar
                    </a>
                    <button class="btn btn-sm btn-danger" data-id="${reserva.id}" onClick=eliminarReserva(event)>eliminar
                    </button>
                </td>
            </tr>
        `
    })

    tablaElement.innerHTML = registros;

}


const eliminarReserva = async (e) => {

    console.log(e)
    const id = e.target.dataset.id;

    // Se pregunta al usuario si está seguro de eliminar la reserva

 

    const response = await fetch(`/api/${id}`, {
        method: 'DELETE',
    })

    const data = await response.json();

    alert(data.message)
    window.location.href = "/";

}


document.addEventListener('DOMContentLoaded', async () => {
    // Mostrar las reservas en la tabla
    const tbody = document.querySelector('#listadoReservas');
    const reservas = await obtenerDatos() // undefined si no obtenerDatos no retorna nada
    mostrarReservas(reservas, tbody)

});