import { Request, Response } from 'express'
import PerfilEsquema from '../scheme/PerfilEsquema'

const esAdminRole = async (req: any, res: Response, next:Function ) => {
  // Validar token
  if ( !req.usuario ) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero'
    })
  }
  // leer el perfil que corresponde al uid
  const { nombreUsuaio, codPerfil  } = req.usuario;

  const perfil = await PerfilEsquema.findById( codPerfil );
  
  if ( perfil?.nombrePerfil !== 'Admin' ) {
    return res.status(401).json({
      respuesta: `${ nombreUsuaio } no es administrador - no puede hacer esto`
    });
  }
  next();
}

module.exports = {
  esAdminRole
}