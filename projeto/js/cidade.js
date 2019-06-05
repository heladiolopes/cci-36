/************************************
 *  Apartamento Virtual             *
 *  Heládio Lopes                   *
 *  Sebastião Beethoven             *
 ************************************/


/**
 * DEFINIÇÕES INICIAIS
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEFA);
document.body.appendChild(renderer.domElement);



const M = 10;

/**
 *  TERRENO
 */
var plane_geom = new THREE.PlaneGeometry(15*M, 25*M, 32);
var plane_mat = new THREE.MeshLambertMaterial({color:0xCCCC55, side:THREE.DoubleSide});
var plane = new THREE.Mesh(plane_geom, plane_mat);
scene.add(plane);

/**
 *  CERCADO (USAR IDEIA DO LAB 2
 */


/**
 *  FUNÇÃO CASA
 */

var house = predio1();
scene.add(house);

/**
 * ILUMINAÇÃO
 */
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

/**
 * CONSTRUÇÂO DO TABULEIRO E PEÇAS
 */

var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

camera.position.x = 0;
camera.position.y = -2*M;
camera.position.z = 100;
camera.up.set(0, 0, 1);
camera.lookAt(new THREE.Vector3(0, -2*M, 0,));

// Controle de mouse
var controls = new THREE.OrbitControls(camera);

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();
