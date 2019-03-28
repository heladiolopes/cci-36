// DEFINIÇÕES INICIAIS
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x656565);
document.body.appendChild(renderer.domElement);
//******************************************************************************


// DEFININDO CONSTANTES DO PROBLEMA
var altura = 90;
var lateral = 180;
var raio = 20;
var vert = 2 + (2*altura - 2)*lateral;
var cor = new THREE.Color(0x000000);
// var cor = new THREE.Color(0x4169E1);
var geo = new THREE.Geometry();
//******************************************************************************


// POSICIONAR PONTOS
// Colocando os pontos
for (var i = -altura; i <= altura; i++)
    for (var j = 1; j <= lateral; j++)
    {
        if (Math.abs(i) == altura){
            geo.vertices.push(new THREE.Vector3(0, 0, raio*i/Math.abs(i)));
            geo.colors.push(new THREE.Color(0xffffff));
            break;
        }
        else if (i != 0){
            var z = i*raio/altura;
            var r = Math.sqrt(raio**2 - z**2);
            var x = r*Math.cos(2*j*Math.PI/lateral);
            var y = r*Math.sin(2*j*Math.PI/lateral);
            geo.vertices.push(new THREE.Vector3(x, y, z));
            geo.colors.push(new THREE.Color(0xffffff));
        }
    }
//******************************************************************************


// DEFININDO FACES
geo.faceVertexUvs= new Array()
geo.faceVertexUvs.push(new Array())
// Faces das extremidades
for (var i = 0; i < lateral; i++){
    if (i != lateral-1){
        var face = new THREE.Face3(0, i+2, i+1)
        geo.faces.push(face);

        face = new THREE.Face3(vert-1, vert-(i+3), vert-(i+2))
        geo.faces.push(face);
    }
    else {
        geo.faces.push(new THREE.Face3(0, 1, i+1));
        geo.faces.push(new THREE.Face3(vert-1, vert-2, vert-(i+2)));
    }
}
// Faces do meio
for (var i = 0; i < 2*altura - 3; i++){
    var off1 = lateral*i
    var off2 = lateral*(i+1);
    for (var j = 1; j <= lateral; j++) {
        if (j != lateral){
            var face = new THREE.Face3(off1+j, off1+j+1, off2+j);
            geo.faces.push(face);

            geo.faces.push(new THREE.Face3(off2+j, off1+j+1, off2+j+1));

        }
        else {
            var face = new THREE.Face3(off1+j, off1+1, off2+j);
            geo.faces.push(face);

            geo.faces.push(new THREE.Face3(off2+j, off1+1, off2+1));

        }
    }
}
//******************************************************************************


//MAPEAR TEXTURA
// Extremidades
for (var i = 0; i < lateral; i++){
    geo.faceVertexUvs[0].push([
        new THREE.Vector2((2*i+1)/2, -0.1),
        new THREE.Vector2(i+1, 0),
        new THREE.Vector2(i, 0),
    ]);
    geo.faceVertexUvs[0].push([
        new THREE.Vector2((2*i+1)/2, 1.1),
        new THREE.Vector2(i,  1),
        new THREE.Vector2(i+1,1),
    ]);
}
// Meio
var camadas = 2*altura - 3;
for (var i = 0; i < camadas; i++) {
    for (var j = 0; j < lateral; j++){
        geo.faceVertexUvs[0].push( [
            new THREE.Vector2((j)/lateral, i/(2*altura - 3)),
            new THREE.Vector2((j+1)/lateral, i/(2*altura - 3)),
            new THREE.Vector2((j)/lateral, (i+1)/(2*altura - 3)),
        ])
        geo.faceVertexUvs[0].push( [
            new THREE.Vector2((j)/lateral, (i+1)/(2*altura - 3)),
            new THREE.Vector2((j+1)/lateral, i/(2*altura - 3)),
            new THREE.Vector2((j+1)/lateral, (i+1)/(2*altura - 3)),
        ])
    }
}
//******************************************************************************


// SETAR FLAGS
geo.computeFaceNormals();
geo.computeVertexNormals();

geo.colorsNeedUpdate = true;
geo.verticesNeedUpdate = true;
geo.uvsNeedUpdate = true;
//******************************************************************************


// ADICIONAR TEXTURA NO SÒLIDO
var textureLoader = new THREE.TextureLoader();
var tex = textureLoader.load( "texture/earth.png" );
var material = new THREE.MeshPhongMaterial({
    vertexColors: THREE.VertexColors,
    flatShading: true,
    // side: THREE.DoubleSide,
    map: tex,
})
var mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
//******************************************************************************


// EIXOS ORDENADOS
var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
//******************************************************************************


// ADICIONANDO ILUMINAÇÃO
var light = new THREE.PointLight(0xf49e12, 1.0);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
//******************************************************************************


// POCISIONAMENTO DA CAMERA
camera.up = new THREE.Vector3(0, 0, 1);

var t = 0;

// Controle de orbita
// var controls = new THREE.OrbitControls( camera );

function animate() {
    requestAnimationFrame(animate);
    // controls.update()

    // Movimento da camera
    t=t+0.1;
    var x = 50*Math.sin(t*Math.PI/15);
    var y = 50*Math.cos(t*Math.PI/15);
    var z = raio/2;
    camera.position.set(x, y, raio*Math.sin(t*Math.PI/40));
    light.position.set(x, y, z);
    camera.lookAt(new THREE.Vector3(0, 0, -z/4));

    renderer.render(scene, camera);
}

animate();
