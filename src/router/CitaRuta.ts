import { Router } from 'express'
import citaControlador from '../controller/CItaControllador';

// const router = Router()

// router.get('/', perfilControlador.consulta)

class CitaRuta {
  public apiRutaCita: Router;

  constructor(){
    this.apiRutaCita =  Router()
    this.configuracion()
  }
  public configuracion(): void{
    this.apiRutaCita.get('/',citaControlador.consulta)
    this.apiRutaCita.get('/:id',citaControlador.consultaPorId)
    this.apiRutaCita.post('/',citaControlador.crear)
    this.apiRutaCita.put('/:id',citaControlador.actualizar)
    this.apiRutaCita.delete('/:id',citaControlador.eliminar)
  }
}

const citaRuta = new CitaRuta()
export default citaRuta.apiRutaCita;