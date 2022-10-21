import { Response, Request } from 'express'
import UsuarioEsquema from '../scheme/UsuarioEsquema';

class UsuarioDao
 {
  
  protected static async obtnerUsuario(res: Response): Promise<any>{
    const datos = await UsuarioEsquema.find().sort({_id:-1})
    res.status(200).json(datos)
  }

  protected static async obtnerUsuarioPorId(req:Request, res: Response): Promise<any>{
    const { id } = req.params
    try {
      
      const datos = await UsuarioEsquema.findById(id);
      
      datos 
        ? res.status(200).json(datos) 
        : res.status(404).end()     
      
    } catch (err:any) {
      console.log(err.name);
      res.status(400).end();      
    }

  }

  protected static async crearUsuario(res: Response, req: Request): Promise<any>{
    const { correoUsuaio } = req.body
    
    const existe = await UsuarioEsquema.findOne({ correoUsuaio })
    
    if (existe) {
      res.status(400).json({respuesta:"El correo ya existe"});
    } else {
      const obj = new UsuarioEsquema({ ...req.body });
      
      // obj.save((miError,result)=>{
      //   if (miError) {
      //     res.status(400).json({respuesta:"No se puede crear el perfil"});
      //   } else {
      //     res.status(200).json({respuesta:"Perfil creado", codigo:result._id});
      //   }
      // });
      obj.save()
        .then(result => res.status(200).json({respuesta:"Usuario creado", codigo:result._id}))
        .catch(err => res.status(400).json({respuesta:"No se puede crear el usuario",error:err}));
     
    }
  }

  protected static async actualizarPerfil(req: Request, res: Response): Promise<any>{
    //const { nombrePerfil } = req.body
    const { id } = req.params
    
    try {
      const existe = await UsuarioEsquema.findById(id);
    
      if (!existe) {
        return res.status(404).json({
          respuesta: 'No existe el usuario con el id ' + id
        });
      }


      
      const datos = await UsuarioEsquema.findOneAndUpdate({_id:id},{...req.body},{
        new: true
      })
      
      res.status(200).json(datos)
    } catch (error:any) {
      console.log(error.name);
      res.status(400).json({respuesta:'No se pudo actualizar el usuario'}); 
    }
   
  }

  protected static async eliminarUsuario(req: Request, res: Response): Promise<any>{
    const { id } = req.params
    try {
      
      const existe = await UsuarioEsquema.findById(id).exec();
  
      if ( !existe ) {
        return res.status(404).json({
          respuesta: 'No existe el usuario con el id ' + id
        });
      }
      
      // let perfildeletedCountque = await perfil.deleteOne()
      let deleted = await UsuarioEsquema.deleteOne({_id:id});
      res.json({respuesta: 'Usuario eliminado ',elinimado:deleted.deletedCount});

    } catch (error:any) {
      console.log(error.name);
      res.status(400).json({respuesta: 'No se puede eliminar el usuario con el id ' + id}); 
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
