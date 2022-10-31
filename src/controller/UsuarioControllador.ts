import { Request, Response } from 'express'
import UsuarioDao from '../dao/UsuarioDao'


class UsuarioControlador extends UsuarioDao {
  public consulta(_req: Request, res: Response): void {
    UsuarioControlador.obtnerUsuario(res)
  } 
  public consultaPorId(req: Request, res: Response): void {
    UsuarioControlador.obtnerUsuarioPorId(req,res)
  } 
  public crear(req: Request, res: Response): void {
    UsuarioControlador.crearUsuario(res,req)
  } 
  public actualizar(req: Request, res: Response): void {
    UsuarioControlador.actualizarPerfil(req,res)
  }
  public eliminar(req: Request, res: Response): void {
    UsuarioControlador.eliminarUsuario(req,res)
  }

  public iniciar(req: Request, res: Response): void {
    UsuarioControlador.iniciarSesion(req.body, res);
  }


}

const usuarioControlador = new UsuarioControlador()
export default usuarioControlador