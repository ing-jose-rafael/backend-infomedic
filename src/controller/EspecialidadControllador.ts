import { Request, Response } from 'express'
import EspecialidadDao from '../dao/EspecialidadDao'


class EspecialidadControlador extends EspecialidadDao {
  public consulta(_req: Request, res: Response): void {
    EspecialidadControlador.obtner(res)
  } 
  public consultaPorId(req: Request, res: Response): void {
    EspecialidadControlador.obtnerPorId(req,res)
  } 
  public crear(req: Request, res: Response): void {
    EspecialidadControlador.crear(req,res)
  } 
  public actualizar(req: Request, res: Response): void {
    EspecialidadControlador.actualizar(req,res)
  }
  public eliminar(req: Request, res: Response): void {
    EspecialidadControlador.eliminar(req,res)
  }
}

const especialidadControlador = new EspecialidadControlador()
export default especialidadControlador