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
    UsuarioControlador.crearUsuario(req,res)
  } 
  public actualizar(req: Request, res: Response): void {
    UsuarioControlador.actualizarPerfil(req,res)
  }
  public eliminar(req: Request, res: Response): void {
    UsuarioControlador.eliminarUsuario(req,res)
  }

  public consultaXPerfil(req: Request, res: Response): void {
    UsuarioControlador.obtenerUsuariosPerfil(req, res);
  }
  public cantidadEnPerfil(req: Request, res: Response): void {
    UsuarioControlador.cantidadUsuariosEnPerfil(req, res);
  }


}

const usuarioControlador = new UsuarioControlador()
export default usuarioControlador