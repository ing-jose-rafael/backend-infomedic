# Creación  package json
# =========================================
npm init


# Librerias obligatorias
# ==========================================
npm i cors
npm i morgan
npm i express
npm i mongoose
npm i bcryptjs
npm i jsonwebtoken

npm i dotenv --save-dev
npm i nodemon --save-dev

npm i @types/cors --save-dev
npm i @types/morgan --save-dev
npm i @types/express --save-dev
npm i @types/jsonwebtoken --save-dev


# Como configurar la powershell en windows
# ============================================
get-executionpolicy
set-executionpolicy unrestricted


# Configurar scripts de ejecución en package.json
# ============================================
"dev": "nodemon build/index.js",
"build": "tsc -w"


# Como incluir typescript en mi proyecto
# ======================================================
tsc --init  


# Recordar configurar tsconfig.json
# ======================================================
"outDir": "./build",


# Crear cascaron a mano
# ======================================================
 1- Se crea la carpeta src en tu proyecto.
 2- Dentro de la carpeta src se crean:
 src
    -configuracion
    -entidad
    -dao
    -controlador
    -esquema
    -ruta
    -middleware
Por último se genera el(archivo) index.ts donde va el servidor


# Comandos para construir y lanzar el backend
# ======================================================
# Nota: se debe hacer siempre en el siguiente orden (en terminales distintas)
npm run build
npm run dev

# Espacios de trabajo en terminal usualmente son 3 :
# ==============================================================
-build (se ejecuta primero permite ver los errores)
-dev (lanza el backend para recibir peticiones)
-cmd (se utiliza para comandos adicionales)


