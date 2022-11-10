import { Request, Response } from 'express'
import PerfilDao from '../dao/PerfilDao'

class PerfilControlador extends PerfilDao {
  public consulta(_req: Request, res: Response): void {
    PerfilControlador.obtenerPerfiles(res)
  } 
  public consultaPorId(req: Request, res: Response): void {
    PerfilControlador.obtnerPerfilesPorId(req,res)
  } 
  public crear(req: Request, res: Response): void {
    PerfilControlador.crearPerfil(res,req)
  } 
  public actualizar(req: Request, res: Response): void {
    PerfilControlador.actualizarPerfil(req,res)
  }
  public eliminar(req: Request, res: Response): void {
    PerfilControlador.eliminarPerfil(req,res)
  }

  protected shadia(h:any,x:any){}

}

const perfilControlador = new PerfilControlador()
export default perfilControlador