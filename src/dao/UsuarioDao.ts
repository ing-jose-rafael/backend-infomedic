import { Response, Request } from 'express'
import { Types } from "mongoose";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'
import UsuarioEsquema from '../scheme/UsuarioEsquema';
import PerfilEsquema from '../scheme/PerfilEsquema';
import PerfilEntidad from '../entities/PerfilEntidad';

class UsuarioDao {

  protected static async obtnerUsuario(res: Response): Promise<any> {
    const datos = await UsuarioEsquema.find().sort({ _id: -1 }).populate('codPerfil','nombrePerfil');
    res.status(200).json(datos)
  }

  protected static async obtnerUsuarioPorId(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    try {

      const datos = await UsuarioEsquema.findById(id).sort({ _id: -1 }).populate('codPerfil','nombrePerfil');

      datos
        ? res.status(200).json(datos)
        : res.status(404).json({ respuesta: "Error en la consulta" });

    } catch (err: any) {
      console.log(err.name);
      res.status(400).end();
    }

  }

  // Obtener todos los usuarios con un perfil dado y con datos específicos
  // ************************************************************************************
  protected static async obtenerUsuariosPerfil(req:Request, res: Response): Promise<any> {
    const { codPerfil } = req.params;
    if (Types.ObjectId.isValid(codPerfil)) {
      UsuarioEsquema.find({ codPerfil }).sort({ _id: -1 })
        .populate({ path: "codPerfil", select: "nombrePerfil" })
        .exec((miError, objeto) => {
          if (miError) {
            console.log(miError);
            res.status(400).json({ respuesta: "Error en la consulta" });
          } else {
            res.status(200).json(objeto);
          }
        });
    } else {
      res.status(400).json({ respuesta: "Identificador incorrecto" });
    }
  }
  // ************************************************************************************
  // Obtener todos los usuarios con un perfil dado y con datos específicos
  // ************************************************************************************
  protected static async obtenerUsuariosDoctores(res: Response): Promise<any> {
    const existDoc = await PerfilEsquema.findOne({nombrePerfil:'Doctores'});
    if (existDoc) {
      UsuarioEsquema.find({ codPerfil:existDoc.id }).sort({ _id: -1 })
        .populate({ path: "codPerfil", select: "nombrePerfil" })
        .exec((miError, objeto) => {
          if (miError) {
            console.log(miError);
            res.status(400).json({ respuesta: "Error en la consulta" });
          } else {
            res.status(200).json(objeto);
          }
        });
    } else {
      res.status(400).json({ respuesta: "Identificador incorrecto" });
    }
  }
  // ************************************************************************************

  protected static async crearUsuario( req: Request, res: Response): Promise<any> {
    const {  _id, datosUsuario,...data } = req.body
    data.nombreImagenUsuario = data.nombreImagenUsuario.substring(data.nombreImagenUsuario.lastIndexOf("\\") + 1);
    
    
    const existe = await UsuarioEsquema.findOne({ correoUsuario: data.correoUsuario });

    if (existe) {
      return res.status(400).json({ respuesta: "El correo ya existe" });
    } else {
      
      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      data.claveUsuario = bcryptjs.hashSync(data.claveUsuario, salt);
      const obj = new UsuarioEsquema({ ...data });

      obj.save()
        .then(result => {
          res.status(200).json({ id: result._id });
          // res.status(200).json({ respuesta: "Usuario creado", token: miToken })
        })
        .catch(err => res.status(400).json({ respuesta: "No se puede crear el usuario", error: err }));

    }
  }

  protected static async actualizarPerfil(req: Request, res: Response): Promise<any> {
    //const { nombrePerfil } = req.body
    const { id } = req.params

    try {
      const existe = await UsuarioEsquema.findById(id);

      if (!existe) {
        return res.status(404).json({
          respuesta: 'No existe el usuario con el id ' + id
        });
      }



      const datos = await UsuarioEsquema.findOneAndUpdate({ _id: id }, { ...req.body }, {
        new: true
      })

      res.status(200).json(datos)
    } catch (error: any) {
      console.log(error.name);
      res.status(400).json({ respuesta: 'No se pudo actualizar el usuario' });
    }

  }

  protected static async eliminarUsuario(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    try {

      const existe = await UsuarioEsquema.findById(id).exec();

      if (!existe) {
        return res.status(404).json({
          respuesta: 'No existe el usuario con el id ' + id
        });
      }

      // let perfildeletedCountque = await perfil.deleteOne()
      let deleted = await UsuarioEsquema.deleteOne({ _id: id });
      res.json({ respuesta: 'Usuario eliminado ', eliminado: deleted.deletedCount });

    } catch (error: any) {
      console.log(error.name);
      res.status(400).json({ respuesta: 'No se puede eliminar el usuario con el id ' + id });
    }
    // const datos = await UsuarioEsquema.deleteOne({_id:id})
    // UsuarioEsquema.findByIdAndRemove(id)
    //   .then(result => {
    //     res.status(204)
    //   })
    //   .catch(err => { 
    //     console.log(err.name);
    //     res.status(400).end();   
    //   })
  }

  
  // Cantidad de usuarios x perfil dado
  // ************************************************************************************
  protected static async cantidadUsuariosEnPerfil(req: Request, res: Response): Promise<any> {
    const { codPerfil } = req.params;
    if (Types.ObjectId.isValid(codPerfil)) {
      const cantidad = await UsuarioEsquema.countDocuments({ codPerfil });
      res.status(200).json({ respuesta: cantidad });
    } else {
      res.status(400).json({ respuesta: "Identificador incorrecto" });
    }
  }
  // ************************************************************************************
  // protected static async actualizarPerfil2(codigo: string, parametros: any, res: Response): Promise<any> {
  //   const existe = await UsuarioEsquema.findById(codigo).exec();
  //   if (existe) {
  //     UsuarioEsquema.findByIdAndUpdate({_id:codigo},{$set:parametros},(miError: any, miObjeto: any) => {
  //       if (miError) {
  //         res.status(400).json({ Respuesta: "No se puede actualizar el perfil" });
  //       } else {
  //         res
  //           .status(200)
  //           .json({
  //             Respuesta: "Perfil Actualizado",
  //             Antiguo: miObjeto,
  //             Nuevo: parametros
  //           });
  //       }
  //     });
  //   } else {
  //     res.status(400).json({ Respuesta: "El perfil a actualizar no existe" });
  //   }
  // }

}

export default UsuarioDao
