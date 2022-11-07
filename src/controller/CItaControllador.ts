import { Request, Response } from 'express'
import CitaDao from '../dao/CitaDao'

class CitaControlador extends CitaDao {
  public consulta(_req: Request, res: Response): void {
    CitaControlador.obtner(res)
  } 
  public consultaPorId(req: Request, res: Response): void {
    CitaControlador.obtnerPorId(req,res)
  } 
  public crear(req: Request, res: Response): void {
    CitaControlador.crear(req,res)
  } 
  public actualizar(req: Request, res: Response): void {
    CitaControlador.actualizar(req,res)
  }
  public eliminar(req: Request, res: Response): void {
    CitaControlador.eliminar(req,res)
  }
}

const citaControlador = new CitaControlador()
export default citaControlador