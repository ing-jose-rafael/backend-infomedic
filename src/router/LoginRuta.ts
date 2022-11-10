import { Router } from 'express'
import loginControlador from '../controller/LoginControlador';


class LoginRuta {
  public apiRuta: Router;

  constructor(){
    this.apiRuta =  Router()
    this.configuracion()
  }
  public configuracion(): void{
    this.apiRuta.post('/', loginControlador.iniciar);
    this.apiRuta.get('/regitrarse',loginControlador.registrarse)
  }
}

const loginRuta = new LoginRuta()
export default loginRuta.apiRuta