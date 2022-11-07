import { connect } from "mongoose";

const ConexionDB = () => {
  const urlConexion = String(process.env.DB_MONGO_CNN);
  // const urlConexion = String(process.env.DB_MONGO);
  connect(urlConexion)
    .then(() => {
      console.log("Conectados a la base de datos", process.env.DB_MONGO_CNN);
    })
    .catch((miError) => {
      console.log("No se puede establecer conexión", miError);
    });
};

export default ConexionDB;
