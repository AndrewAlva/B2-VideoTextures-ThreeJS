import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1.7, 1, 1)
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    roughness: 1,
    metalness: 1,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Lights
 */
const pointLight = new THREE.PointLight(0xffffff, 1000, 10, 2)
pointLight.position.set(1, 5, 5)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, 2, 10, 2)
pointLight2.position.set(-1, -1, -1)
scene.add(pointLight2)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Fullscreen
 */
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




////////////////////////////////////////////////////////////
////// AQUÍ OLI! ///////////////////////////////////////////
////////////////////////////////////////////////////////////
/**
 * Video Textures
 */
// 2. Obtener el video del HTML.
const video = document.getElementById('video');
video.play(); // En algunos dispositivos (en especial celulares) solo podemos reproducir videos después de una interacción del usuario, clicks o presionar el teclado principalmente.


// 3. Crear la textura del video.
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;

// 4. Aplicar la textura a un material y luego a un mesh.

// 4.1. Crear la geometría del mesh (prueba diferentes geometrías para ver cómo se adapta el video a cada una).
const TVScreenGeometry = new THREE.PlaneGeometry(1.6, 0.9); // Manten la proporción del aspect ratio del video.
// const TVScreenGeometry = new THREE.BoxGeometry(1.6, 0.9, 2.2);
// const TVScreenGeometry = new THREE.ConeGeometry(0.8, 0.8, 32);
// const TVScreenGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 32);

// 4.2. Crear el material del mesh.
// 4.2.3. Es un material básico, que no reacciona a las luces de la escena, solamente estamos especificando el color o textura base (la textura del video) y qué lados renderizar (frente, vuelta o ambos, en este caso ambos).
const TVScreenMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.DoubleSide,
});

// 4.3. Crear el mesh.
const TVScreenMesh = new THREE.Mesh(TVScreenGeometry, TVScreenMaterial);
// 4.3.1. Posicionar el mesh en la escena, ligeramente adelante del prisma rectangular para evitar la superposición o "z fighting" (efecto de superposición de polígonos).
TVScreenMesh.position.set(0, 0, 0.51)

// 4.3.2. Agregar el mesh a la escena.
scene.add(TVScreenMesh);


// *. Animación de rotación, solo lo agregué para hacer más obvio que es una textura 3D.
const TVGroup = new THREE.Group();
TVGroup.add(TVScreenMesh);
TVGroup.add(mesh);

scene.add(TVGroup);





/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    TVGroup.rotation.x = elapsedTime * 0.25;
    TVGroup.rotation.y = elapsedTime * 0.5;
    TVGroup.rotation.z = elapsedTime * 0.15;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()