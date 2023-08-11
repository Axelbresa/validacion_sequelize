const { where } = require ("Sequelize");
const User = require("../../models/reserva");
const metodos = {};



metodos.lista = (req, res) => {
  res.render("lista_reservas");
};

metodos.crearreserva = (req, res) => {
  res.render("crear");
};

metodos.renderEditar=(req, res)=>{
  const reservaId = req.params.id;
  res.render("editar", { id: reservaId });
};

metodos.crearUsuarios = async (req, res) => {
  const {    
    nombre,
    Usuario,
    email,
    clave
  } = req.body;

    try{
      const NuevaReserva = new User  ({  
        nombre,
        Usuario,
        codigo:  new Date().getTime(),
        email,
        clave })

        await NuevaReserva.save()

        return res.status(201).json({
          message: 'Se creo la reserva'

        })

    }catch{
      console.log('Error al crear la reserva')
        return res.status(500).json({
          message: 'Error al crear la reserva'
        })
    }

};

metodos.listadoReserva= async (req, res)=>{
  try {
    const reservas = await User.findAll({
        where: {
            estado: true
        }
    });

    return res.json(reservas);
} catch (error) {
    console.log('Error al obtener las reservas', error);
    return res.status(500).json({
        message: 'Error al obtener las reservas'
    })
}
}
metodos.EliminarReserva = async (req, res)=>{
  try {
    const { id } = req.params;
    if(!id){
        throw({
            status: 400,
            message: 'No se ha enviado el id de la reserva'
        })
    }
    const reserva = await User.findByPk(id);
    await reserva.update({ estado: false });
    return res.json({ message: 'Reserva se eliminó correctamente' })
} catch (error) {
    console.log('Error al eliminar la reserva', error);
    return res.status(error.status || 500).json({
        message: error.message || 'Error al eliminar la reserva'
    })
}
}

metodos.obtenerUnaReserva= async (req, res)=>{
  try {
    const { id } = req.params;
    const reserva = await User.findOne({
        whare: {
            estado: true,
            id
        }
    });
    return res.json(reserva);
} catch (error) {
    console.log(error);
    return res.status(500).json({
        message: 'Error al obtener la reserva'
    })
}
}
metodos.actualizarReserva=async(req, res)=>{
  try {
    const { id } = req.params;
    const reserva = await User.findByPk(id);
    await reserva.update(req.body)
    return res.json({
        message: 'Reserva actualizada exitosamente'
    });
} catch (error) {
    console.log('Error al actualizar la reserva', error);
    return res.status(error.status || 500).json({
        message: error.message
    })
}
}
module.exports = metodos;
