import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import UsuarioEsquema from "../scheme/UsuarioEsquema";
import PerfilEsquema from "../scheme/PerfilEsquema";
import PerfilEntidad from "../entities/PerfilEntidad";

class LoginDao {
  // iniciar sesión
  // Iniciar sesión
  protected static async iniciarSesion(req: Request, res: Response): Promise<any> {
    const { correoUsuario, claveUsuario } = req.body;
    // const miCorreo = parametros.correoUsuario;
    // const miClave = parametros.claveUsuario;
    UsuarioEsquema.findOne({ correoUsuario }).populate({ path: "codPerfil", select: "nombrePerfil" })
      .exec((miError, objeto) => {
        if (objeto) {
          const claveCorrecta = bcryptjs.compareSync(claveUsuario, objeto.claveUsuario);
          if (claveCorrecta) {
            const datosVisibles = {
              codUsuario: objeto._id,
              correo: correoUsuario,
              perfil: objeto.codPerfil.nombrePerfil
            };
            const llavePrivada = String(process.env.CLAVE_SECRETA);
            const miToken = jwt.sign(datosVisibles, llavePrivada, { expiresIn: '72h' });
            res.status(200).json({ tokenMintic: miToken, avatarMintic:objeto.avatar});
          } else {
            res.status(400).json({ respuesta: "Credenciales incorrectas" });
          }
        } else {
          res.status(400).json({ respuesta: "Credenciales incorrectas" });
        }
      });
  }
  protected static async crearUsuario(req: Request, res: Response): Promise<any> {
    const { correoUsuario, claveUsuario, codPerfil } = req.body
    
    
    const nombrePerfilPorDefecto = String(process.env.PERFIL_USUARIO_EXTERNO);
    
    const jsonPerfil = { nombrePerfil: nombrePerfilPorDefecto };
    const existePerfil = await PerfilEsquema.findOne(jsonPerfil).exec();
    
  
    if (existePerfil) {
      req.body.codPerfil = existePerfil._id;
    } else {
      const objPerfil = new PerfilEsquema(jsonPerfil);
      objPerfil.save();
      req.body.codPerfil = objPerfil._id;
    } 
    
    const existe = await UsuarioEsquema.findOne({ correoUsuario: correoUsuario });

    if (existe) {
      return res.status(400).json({ respuesta: "El correo ya existe" });
    } else {
      const obj = new UsuarioEsquema({ ...req.body });

      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      obj.claveUsuario = bcryptjs.hashSync(claveUsuario, salt);

      obj.save()
        .then(result => {
          const datosVisibles = {
            codUsuario: result._id,
            correo: correoUsuario,
            perfil: nombrePerfilPorDefecto 
          };
          const llavePrivada = String(process.env.CLAVE_SECRETA);
          const miToken = jwt.sign(datosVisibles, llavePrivada, { expiresIn: '72h' })
          
          res.status(200).json({ tokenMintic: miToken, avatarMintic: result.avatar });
          // res.status(200).json({ respuesta: "Usuario creado", token: miToken })
        })
        .catch(err => res.status(400).json({ respuesta: "No se puede crear el usuario", error: err }));

    }
  }


}

export default LoginDao;