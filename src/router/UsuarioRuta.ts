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
    this.apiRutaUsuario.get('perfil/:id',usuarioControlador.consultaXPerfil)
    this.apiRutaUsuario.get('/perfil/doctors',usuarioControlador.consultaXDoctor);
    this.apiRutaUsuario.get('cantxperfil/:id',usuarioControlador.cantidadEnPerfil)
    this.apiRutaUsuario.post('/',usuarioControlador.crear)
    this.apiRutaUsuario.put('/:id',usuarioControlador.actualizar)
    this.apiRutaUsuario.delete('/:id',usuarioControlador.eliminar)

    // this.apiRutaUsuario.post('/iniciar', usuarioControlador.iniciar);
  }
}

const usuarioRuta = new UsuarioRuta()
export default usuarioRuta.apiRutaUsuario