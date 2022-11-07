import { Response, Request } from 'express'
import EspecialidadEsquema from '../scheme/EspecialidadEsquema';
import UsuarioEsquema from '../scheme/UsuarioEsquema';

class EspecialidadDao {

  // Obtener citas en orden descendente (-1)
  protected static async obtner(res: Response): Promise<any> {
    const datos = await EspecialidadEsquema.find().sort({ _id: -1 })
    res.status(200).json(datos)
  }

  // Consultar los datos de un cita por un código específico
  protected static async obtnerPorId(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    try {

      const datos = await EspecialidadEsquema.findById(id);

      datos
        ? res.status(200).json(datos)
        : res.status(404).end()

    } catch (err: any) {
      console.log(err.name);
      res.status(400).end();
    }

  }

  // Crear verificando su existencia
  protected static async crear(req: Request, res: Response): Promise<any> {
    const { nombre } = req.body;

    const existeDB = await EspecialidadEsquema.findOne({ nombre });

    // const existe = await PerfilEsquema.findOne({ nombrePerfil })

    if (existeDB) {
      return res.status(400).json({ respuesta: "La especialidad ya existe" });
    }


    const obj = new EspecialidadEsquema({ nombre });

    obj.save()
      .then(result => res.status(200).json({ respuesta: "Especialidad creada", id: result._id }))
      .catch(err => res.status(400).json({ respuesta: "No se puede crear la especialidad", error: err }));

  }

  // Actualizar por código
  protected static async actualizar(req: Request, res: Response): Promise<any> {
    //const { nombrePerfil } = req.body
    const { id } = req.params

    try {
      const existe = await EspecialidadEsquema.findById(id);

      if (!existe) {
        return res.status(404).json({ respuesta: 'No existe con el id ' + id });
      }

      const datos = await EspecialidadEsquema.findOneAndUpdate({ _id: id }, { ...req.body }, {
        new: true
      })

      res.status(200).json({ nuevo: datos });

    } catch (error: any) {
      console.log(error.name);
      res.status(400).json({ respuesta: 'No se pudo actualizar' });
    }

  }

  // Eliminar por código, verificando antes que no tenga usuarios asociados
  protected static async eliminar(req: Request, res: Response): Promise<any> {
    const { id } = req.params

    const cantidad = await UsuarioEsquema.countDocuments({ codPerfil: id });
    if (cantidad > 0) {
      return res.status(400).json({ respuesta: 'Error, la especialidad tiene usuarios relacionados' });
    } else {
      try {

        const data = await EspecialidadEsquema.findById(id).exec();

        if (!data) {
          return res.status(404).json({ respuesta: 'No existe con el id ' + id });
        }

        // let perfildeletedCountque = await perfil.deleteOne()
        let deleted = await EspecialidadEsquema.deleteOne({ _id: id });
        res.json({ respuesta: 'Perfil eliminado ', eliminado: deleted.deletedCount, id });

      } catch (error: any) {
        console.log(error.name);
        res.status(400).json({ respuesta: 'No se puede eliminar con el id ' + id });
      }
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

export default EspecialidadDao