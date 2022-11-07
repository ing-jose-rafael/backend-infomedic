import { Router } from 'express'
import especialidadControlador from '../controller/EspecialidadControllador';

class EspecialidadRuta {
  public apiRutaEspecialidad: Router;

  constructor(){
    this.apiRutaEspecialidad =  Router()
    this.configuracion()
  }
  public configuracion(): void{
    this.apiRutaEspecialidad.get('/',especialidadControlador.consulta)
    this.apiRutaEspecialidad.get('/:id',especialidadControlador.consultaPorId)
    this.apiRutaEspecialidad.post('/',especialidadControlador.crear)
    this.apiRutaEspecialidad.put('/:id',especialidadControlador.actualizar)
    this.apiRutaEspecialidad.delete('/:id',especialidadControlador.eliminar)
  }
}

const especialidad = new EspecialidadRuta()
export default especialidad.apiRutaEspecialidad;