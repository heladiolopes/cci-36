var camera, scene, renderer;
var uniforms, material, mesh;
var theta = 0;

var t;

var controls;
var day, night;

init();
var startTime = Date.now();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0.0, 0.0, 10.0);
    camera.up = new THREE.Vector3(0.0, 1.0, 0.0);
    camera.lookAt(0.0, 0.0, 0.0);

    controls = new THREE.OrbitControls(camera);

    scene = new THREE.Scene();

    day = new THREE.TextureLoader().load("texture/earth.jpg");
    day.wrapS = THREE.RepeatWrapping;
    day.wrapT = THREE.RepeatWrapping;
    day.repeat.set(4, 4);

    night = new THREE.TextureLoader().load("texture/night_lights.jpg");
    night.wrapS = THREE.RepeatWrapping;
    night.wrapT = THREE.RepeatWrapping;
    night.repeat.set(4, 4);

    uniforms = {
        time: {type: "f", value: 1.0},
        resolution: {type: "v2", value: new THREE.Vector2()},
        mtexture: new THREE.Uniform(day),
        ntexture: new THREE.Uniform(night)
    };


    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    mesh = new THREE.Mesh(new THREE.SphereGeometry(5.0, 180, 180), material);
    scene.add(mesh);


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    renderer.setClearColor(0x00ffff, 1);
    document.body.appendChild(renderer.domElement);

    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
}

t = 0.0;

function animate() {

    controls.update();

    requestAnimationFrame(animate);
    render();

    t = t + 0.1;
}

function render() {
    var elapsedMilliseconds = Date.now() - startTime;
    var elapsedSeconds = elapsedMilliseconds / 1000.;
    uniforms.time.value = 60. * elapsedSeconds;
    renderer.render(scene, camera);
}
