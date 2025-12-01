# B2-VideoTextures-ThreeJS
Repositorio de ejemplo con tutorial sobre cómo configurar videos que se rendericen como texturas en WebGL usando la librería Three.JS.


## INSTRUCCIONES.
1. Cargar video usando HTML.
  *. No es necesario mostrar el video en pantalla, yo lo estoy haciendo para ilustrar la idea de que el video se renderiza normal en HTML primero y luego lo tomamos para volverlo textura 3D.

  *. Por lo tanto, estilizar el video con CSS no es necesario, de hecho lo vas a tener que ocultar, usando display: none; ese va a ser el único estilo que le apliques en tu proyecto. 


2. Obtener el video del HTML.
3. Crear la textura del video.
4. Aplicar la textura a un material y luego a un mesh.
  4.1. Crear la geometría del mesh (prueba diferentes geometrías para ver cómo se adapta el video a cada una).
  4.2. Crear el material del mesh.
    4.2.3. Es un material básico, que no reacciona a las luces de la escena, solamente estamos especificando el color o textura base (la textura del video) y qué lados renderizar (frente, vuelta o ambos, en este caso ambos).

  4.3. Crear el mesh.
    4.3.1. Posicionar el mesh en la escena, ligeramente adelante del prisma rectangular para evitar la superposición o "z fighting" (efecto de superposición de polígonos).
    4.3.2. Agregar el mesh a la escena.

*. Animación de rotación, solo lo agregué para hacer más obvio que es una textura 3D.



# Three.js Journey build.

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
