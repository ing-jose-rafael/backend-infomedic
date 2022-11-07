import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

class Seguridad {

  constructor() {

  }
  /**
   * validarJWT
   */
  public validarJWT(req: Request, res: Response, next: NextFunction) {
    // const token = req.header('x-token');

    // if(!token){
    //   return res.status(401).json({
    //     respuesta:'No hay token en la petición'
    //   })
    // }
    if (!req.headers.authorization) {
      return res.status(401).json({
        respuesta: 'No hay token en la petición'
      })
    } else {
      try {

        const token = req.headers.authorization.split(" ")[1] as string;

        const millave = String(process.env.CLAVE_SECRETA);
        const misDatos = jwt.verify(token, millave);
        req.body.datoUsuario = misDatos;

        next();
      } catch (error) {
        res.status(401).json({
          respuesta: 'Token no válido'
        })
      }
    }

  }
}

const seguridad = new Seguridad();
export default seguridad;