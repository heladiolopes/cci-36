/************************************
 *  Apartamento Virtual             *
 *  Heládio Lopes                   *
 *  Sebastião Beethoven             *
 ************************************/


/**
 * DEFINIÇÕES INICIAIS
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0x87CEFA);
document.body.appendChild(renderer.domElement);

// Point Lock
var objects = [];
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();

/**
 * CONSTANTES
 */
const M = 10;
const sz = 5;

/**
 * CÉU
 */
var sky = new THREE.Sky();
sky.scale.setScalar( 450000 );
scene.add( sky );

var uniforms = sky.material.uniforms;
uniforms[ "turbidity" ].value = 10;
uniforms[ "rayleigh" ].value = 2;
uniforms[ "luminance" ].value = 1;
uniforms[ "mieCoefficient" ].value = 0.005;
uniforms[ "mieDirectionalG" ].value = 0.8;

function sunPosition(inclination, azimuth) {
    const distance = 400000;

    const theta = Math.PI * ( inclination - 0.5 );
    const phi = 2 * Math.PI * ( azimuth - 0.5 );

    const p = new THREE.Vector3(distance * Math.cos( phi ),
                    distance * Math.sin( phi ) * Math.sin( theta ),
                    distance * Math.sin( phi ) * Math.cos( theta ));

    return p;
}

uniforms[ "sunPosition" ].value = sunPosition(0.49, 0.25);

/**
 * ILUMINAÇÃO
 */
var light = new THREE.PointLight(0xffffff, 1.2);
scene.add(light);

var ambientlight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientlight);


/**
 * CIDADE ALEATÓRIA
 */
var terreno = cidade();
scene.add(terreno);

/**
 * NUVENS
 */
var nuv, pos = [], ranges = [];
var g_nuv = new THREE.Group();
for (var i = -sz; i <= sz+1; i++){
    for (var k = -sz; k < sz+1; k++){
        if (rand(10) < 4){
            nuv = nuvem(rand(3)*M + M);
            nuv.position.set(15*i*M, 25*M, 15*k*M);
            ranges.push(Math.random()*10 - 5);
            pos.push([i, k]);
            g_nuv.add(nuv);
        }
    }
}
scene.add(g_nuv);

/**
 * CONSTRUÇÂO DO TABULEIRO E PEÇAS
 */

var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// camera.position.x = 10*M;
// camera.position.z = 10*M;
camera.position.y = 0.5*M;
// camera.up.set(0, 1, 0);
// camera.lookAt(new THREE.Vector3(15*M, 0, -20*M,));

/**
 * CONSTROLES
 */
// var controls = new THREE.OrbitControls(camera);
// // controls.enableZoom = false;
// controls.enableKeys = false;
// // controls.enableRotate = false;
// // controls.enablePan = false;
var controls = new THREE.PointerLockControls( camera );
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );

instructions.addEventListener( 'click', function () {
    controls.lock();
}, false );

controls.addEventListener( 'lock', function () {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
} );

controls.addEventListener( 'unlock', function () {
    blocker.style.display = 'block';
    instructions.style.display = '';
} );

scene.add( controls.getObject() );

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

/**
 * MUSICA AMBIENTE
 */
 // var listener = new THREE.AudioListener();
 // camera.add( listener );
 //
 // // create a global audio source
 // var sound = new THREE.Audio( listener );
 //
 // // load a sound and set it as the Audio object's buffer
 // var audioLoader = new THREE.AudioLoader();
 // audioLoader.load( 'sounds/the_sims.mp3', function( buffer ) {
 // 	sound.setBuffer( buffer );
 // 	sound.setLoop( true );
 // 	sound.setVolume( 0.1 );
 // 	sound.play();
 // });

/**
 * ANIMATE
 */

var t = 0
function animate() {
    requestAnimationFrame(animate);
    // controls.update();

    t = t + 0.01 % 60;

    // Ajustar Shader
    var intensidade = Math.sin(Math.PI*t/10)**2;
    uniforms[ "sunPosition" ].value = sunPosition(0.5*intensidade, 0.25);

    // Ajustar Luz
    var p = sunPosition(0.4*intensidade, 0.25);
    light.position.set(p.x, p.y, p.z);

    // Movimento da nuvem
    var obj, a, b, d;
    for (var i = 0; i < g_nuv.children.length; i++) {
        obj = g_nuv.children[i];
        d = ranges[i]*M;
        a = pos[i][0];
        b = pos[i][1];
        obj.position.set(15*a*M + d*Math.sin(Math.PI*t/2), 25*M, 15*b*M + d*Math.cos(Math.PI*t/5));
    }

    // Movimento com o mouse
    if ( controls.isLocked === true ) {

        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;
        velocity.x -= velocity.x * 5.0 * delta;
        velocity.z -= velocity.z * 5.0 * delta;
        velocity.y -= 9.8 * 10.0 * delta; // 100.0 = mass
        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveLeft ) - Number( moveRight );
        direction.normalize(); // this ensures consistent movements in all directions
        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        controls.getObject().translateX( velocity.x * delta );
        controls.getObject().position.y += ( velocity.y * delta); // new behavior
        controls.getObject().translateZ( velocity.z * delta );
        if ( controls.getObject().position.y < 10 ) {
            velocity.y = 0;
            controls.getObject().position.y = 10;
            canJump = true;
        }
        prevTime = time;
    }

    renderer.render(scene, camera);
}

window.addEventListener( 'resize', onWindowResize, false );
animate();
