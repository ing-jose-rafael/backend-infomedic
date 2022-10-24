import { Router } from 'express'
import usuarioControlador from '../controller/UsuarioControllador';


// const router = Router()

// router.get('/', perfilControlador.consulta)

class UsuarioRuta {
  public apiRutaUsuario: Router;

  constructor(){
    this.apiRutaUsuario =  Router()
    this.configuracion()
  }
  public configuracion(): void{
    this.apiRutaUsuario.get('/',usuarioControlador.consulta)
    this.apiRutaUsuario.get('/:id',usuarioControlador.consultaPorId)
    this.apiRutaUsuario.post('/',usuarioControlador.crear)
    this.apiRutaUsuario.put('/:id',usuarioControlador.actualizar)
    this.apiRutaUsuario.delete('/:id',usuarioControlador.eliminar)
  }
}

const usuarioRuta = new UsuarioRuta()
export default usuarioRuta.apiRutaUsuario