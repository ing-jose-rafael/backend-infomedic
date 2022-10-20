import { Router } from 'express'
import perfilControlador from '../controller/PerfilControllador'

// const router = Router()

// router.get('/', perfilControlador.consulta)

class PerfilRuta {
  public apiRutaPerfil: Router;

  constructor(){
    this.apiRutaPerfil =  Router()
    this.configuracion()
  }
  public configuracion(): void{
    this.apiRutaPerfil.get('/todos',perfilControlador.consulta)
    this.apiRutaPerfil.get('/:id',perfilControlador.consultaPorId)
    this.apiRutaPerfil.post('/',perfilControlador.crear)
    this.apiRutaPerfil.put('/:id',perfilControlador.actualizar)
    this.apiRutaPerfil.delete('/:id',perfilControlador.eliminar)
  }
}

const perfilRuta = new PerfilRuta()
export default perfilRuta.apiRutaPerfil