import { Response, Request } from 'express'

import CitaEsquema from '../scheme/CitaEsquema'
import UsuarioEsquema from '../scheme/UsuarioEsquema'

class CitaDao {

  // Obtener citas en orden descendente (-1)
  protected static async obtner(res: Response): Promise<any> {
    const datos = await CitaEsquema.find().sort({ _id: -1 })
      .populate('codDoctor','nombreUsuario')
      .populate('codPaciente','nombreUsuario');
    res.status(200).json(datos)
  }

  // Consultar los datos de un cita por un código específico
  protected static async obtnerPorId(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    try {

      const datos = await CitaEsquema.findById(id);

      datos
        ? res.status(200).json(datos)
        : res.status(404).end()

    } catch (err: any) {
      console.log(err.name);
      res.status(400).end();
    }

  }

  // Crear perfil verificando su existencia
  protected static async crear(req: Request,res: Response): Promise<any> {
    const { codDoctor, codPaciente } = req.body;
    //Todo: vereficar que el id sea de mongoose
    // verificando paciente y doctor
    const [paciente, doctor] = await Promise.all([
      UsuarioEsquema.findById({ _id: codDoctor }).sort({ _id: -1 }),
      UsuarioEsquema.findById({ _id: codPaciente }).sort({ _id: -1 })
    ]);

    // const existe = await PerfilEsquema.findOne({ nombrePerfil })

    if (!paciente) {
      return res.status(400).json({ respuesta: "El paciente no existe" });
    }
    if (!doctor) {
      return res.status(400).json({ respuesta: "El doctor no existe" });
    }

    const obj = new CitaEsquema({ ...req.body });

    obj.save()
      .then(result => res.status(200).json({ respuesta: "Cita creada", id: result._id }))
      .catch(err => res.status(400).json({ respuesta: "No se puede crear la cita", error: err }));

  }

  // Actualizar perfil por código
  protected static async actualizar(req: Request, res: Response): Promise<any> {
    //const { nombrePerfil } = req.body
    const { id } = req.params

    try {
      const existe = await CitaEsquema.findById(id);

      if (!existe) {
        return res.status(404).json({
          respuesta: 'No existe con el id ' + id
        });
      }

      const datos = await CitaEsquema.findOneAndUpdate({ _id: id }, { ...req.body }, {
        new: true
      })

      res.status(200).json({ nuevo: datos })
    } catch (error: any) {
      console.log(error.name);
      res.status(400).json({ respuesta: 'No se pudo actualizar' });
    }

  }

  // Eliminar perfil por código, verificando antes que no tenga usuarios asociados
  protected static async eliminar(req: Request, res: Response): Promise<any> {
    const { id } = req.params

    try {

      const data = await CitaEsquema.findById(id).exec();

      if (!data) {
        return res.status(404).json({
          respuesta: 'No existe con el id ' + id
        });
      }

      // let perfildeletedCountque = await perfil.deleteOne()
      let deleted = await CitaEsquema.deleteOne({ _id: id });
      res.json({ respuesta: 'Perfil eliminado ', eliminado: deleted.deletedCount, id });

    } catch (error: any) {
      console.log(error.name);
      res.status(400).json({ respuesta: 'No se puede eliminar con el id ' + id });
    }

    // const datos = await PerfilEsquema.deleteOne({_id:id})
    // PerfilEsquema.findByIdAndRemove(id)
    //   .then(result => {
    //     res.status(204)
    //   })
    //   .catch(err => { 
    //     console.log(err.name);
    //     res.status(400).end();   
    //   })
  }

}

export default CitaDao