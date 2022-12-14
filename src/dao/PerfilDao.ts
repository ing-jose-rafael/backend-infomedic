import { Response, Request } from 'express'
import PerfilEsquema from '../scheme/PerfilEsquema'
import UsuarioEsquema from '../scheme/UsuarioEsquema'

class PerfilDao {

  // Obtener perfiles en orden descendente (-1)
  protected static async obtnerPerfiles(res: Response): Promise<any> {
    const datos = await PerfilEsquema.find().sort({ _id: -1 })
    res.status(200).json(datos)
  }

  // Consultar los datos de un perfil por un código específico
  protected static async obtnerPerfilesPorId(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    try {

      const datos = await PerfilEsquema.findById(id);

      datos
        ? res.status(200).json(datos)
        : res.status(404).end()

    } catch (err: any) {
      console.log(err.name);
      res.status(400).end();
    }

  }

  // Crear perfil verificando su existencia
  protected static async crearPerfil(res: Response, req: Request): Promise<any> {
    const { nombrePerfil, estadoPerfil = 1 } = req.body

    const existe = await PerfilEsquema.findOne({ nombrePerfil })

    if (existe) {
      res.status(400).json({ respuesta: "El perfil ya existe" });
    } else {
      const objPerfil = new PerfilEsquema({ ...req.body });

      // objPerfil.save((miError,result)=>{
      //   if (miError) {
      //     res.status(400).json({respuesta:"No se puede crear el perfil"});
      //   } else {
      //     res.status(200).json({respuesta:"Perfil creado", codigo:result._id});
      //   }
      // });
      objPerfil.save()
        .then(result => res.status(200).json({ respuesta: "Perfil creado", id: result._id }))
        .catch(err => res.status(400).json({ respuesta: "No se puede crear el perfil", error: err }));

    }
  }

  // Actualizar perfil por código
  protected static async actualizarPerfil(req: Request, res: Response): Promise<any> {
    //const { nombrePerfil } = req.body
    const { id } = req.params

    try {
      const existe = await PerfilEsquema.findById(id);

      if (!existe) {
        return res.status(404).json({
          respuesta: 'No existe el perfil con el id ' + id
        });
      }

      const datos = await PerfilEsquema.findOneAndUpdate({ _id: id }, { ...req.body }, {
        new: true
      })

      res.status(200).json({ nuevo: datos })
    } catch (error: any) {
      console.log(error.name);
      res.status(400).json({ respuesta: 'No se pudo actualizar el perfil' });
    }

  }

  // Eliminar perfil por código, verificando antes que no tenga usuarios asociados
  protected static async eliminarPerfil(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const cantidad = await UsuarioEsquema.countDocuments({ codPerfil: id });

    if (cantidad > 0) {
      return res.status(400).json({ respuesta: 'Error, el perfil tiene usuarios relacionados' });
    } else {
      try {

        const perfil = await PerfilEsquema.findById(id).exec();

        if (!perfil) {
          return res.status(404).json({
            respuesta: 'No existe el perfil con el id ' + id
          });
        }

        // let perfildeletedCountque = await perfil.deleteOne()
        let perfildeleted = await PerfilEsquema.deleteOne({ _id: id });
        res.json({ respuesta: 'Perfil eliminado ', eliminado: perfildeleted.deletedCount, id });

      } catch (error: any) {
        console.log(error.name);
        res.status(400).json({ respuesta: 'No se puede eliminar el perfil con el id ' + id });
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

  protected static async actualizarPerfil2(codigo: string, parametros: any, res: Response): Promise<any> {
    const existe = await PerfilEsquema.findById(codigo).exec();
    if (existe) {
      PerfilEsquema.findByIdAndUpdate({ _id: codigo }, { $set: parametros }, (miError: any, miObjeto: any) => {
        if (miError) {
          res.status(400).json({ Respuesta: "No se puede actualizar el perfil" });
        } else {
          res
            .status(200)
            .json({
              Respuesta: "Perfil Actualizado",
              Antiguo: miObjeto,
              Nuevo: parametros
            });
        }
      });
    } else {
      res.status(400).json({ Respuesta: "El perfil a actualizar no existe" });
    }
  }
  // Obtener perfiles con orden y contando la cantidas de usuario que tiene el perfil
  // ************************************************************************************
  protected static async obtenerPerfiles(res: Response): Promise<any> {
    const datos = await PerfilEsquema.aggregate([
      { $lookup: { from: "Usuario", localField: "_id", foreignField: "codPerfil", as: "cantUsuarios" } },
      { $addFields: { cantUsuarios: { $size: "$cantUsuarios" } } }
    ]).sort({ _id: 1 });
    res.status(200).json(datos);
  }
  // ************************************************************************************


}

export default PerfilDao