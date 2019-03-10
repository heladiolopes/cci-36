/* DEFINIÇÕES INICIAIS */
// Criando uma cena
var scene = new THREE.Scene();
// Criando a câmera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// Renderizando
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setar posição da câmera
camera.position.set(15, 15, 15);

// Controle de mouse
var controls = new THREE.OrbitControls(camera);
// Eixos ordenados
var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/* FUNÇÔES DOS ELEMENTOS */
// FUNÇÃO CADEIRA
function makeChair(col=0x808080) {
  var material = new THREE.MeshLambertMaterial({color:col});

  // Pernas
  var leg_geom = new THREE.BoxGeometry(0.3,2.0,0.3);
  var leg = new THREE.Mesh(leg_geom, material);

  pos = [[-1,-1], [1,-1], [1,1], [-1,1]];
  var g_leg = new THREE.Group();

  for (var i = 0; i < pos.length; i++) {
    m = leg.clone();
    m.position.x = 0.75*pos[i][0];
    m.position.z = 0.75*pos[i][1];
    m.position.y = 0;
    g_leg.add(m);
 }

 // Assento
 var seat_geom = new THREE.BoxGeometry(1.8,0.2,1.8);
 var seat = new THREE.Mesh(seat_geom, material);
 seat.position.set(0,1.0,0);

 // Costas
 var backrest_geom = new THREE.BoxGeometry(1.8,2.0,0.3);
 var backrest=new THREE.Mesh(backrest_geom, material);
 backrest.position.set(0,2.0,-0.75);

 // Agrupando
 var g_chair = new THREE.Group();
 g_chair.add(g_leg);
 g_chair.add(seat);
 g_chair.add(backrest);
 g_chair.position.y = 1;

 return g_chair;
}

// FUNÇÂO MESA
function makeTable(leg_col=0xff5522, cover_col=0x22cc22) {
  var leg_mat = new THREE.MeshLambertMaterial({color:leg_col});
  var cover_mat = new THREE.MeshLambertMaterial({color:cover_col});

  // Pernas
  var leg_geom = new THREE.BoxGeometry(0.5,3.0,0.5)
  var leg = new THREE.Mesh(leg_geom, leg_mat)

  pos = [[-1,-1], [1,-1], [1,1], [-1,1]];
  var g_leg = new THREE.Group();

  for (var i = 0; i < pos.length; i++) {
    m = leg.clone();
    m.position.x = 4.5*pos[i][0];
    m.position.z = 4.5*pos[i][1];
    m.position.y = 1.5;
    g_leg.add(m);
 }

 var cover_geom = new THREE.BoxGeometry(10,0.3,10);
 var cover=new THREE.Mesh(cover_geom, cover_mat);
 cover.position.set(0,3.0,0);

 var g_table = new THREE.Group();
 g_table.add(g_leg);
 g_table.add(cover);

 return g_table;
}

// FUNÇÂO SALA
function makeRoom(col=0xCCCC55, wall=0xf8f8f8) {
  // Piso
  var plane_geom = new THREE.CircleGeometry(10, 60);
  var plane_mat = new THREE.MeshLambertMaterial({color:col, side:THREE.DoubleSide});
  var plane = new THREE.Mesh(plane_geom, plane_mat);
  // Parede
  var wall_geo = new THREE.CylinderGeometry(10, 10, 10, 60, 1, true, Math.PI/2.0, 3*Math.PI/2.0)
  var wall_mat = new THREE.MeshLambertMaterial({color:wall, side:THREE.DoubleSide});
  var wall = new THREE.Mesh(wall_geo, wall_mat);
  // Agrupar
  var g_plane = new THREE.Group();
  g_plane.add(plane);
  g_plane.add(wall);

  wall.position.y = 5;
  plane.rotation.x = -Math.PI/2.0
  return g_plane;
}

// FUNÇÂO PRATO
function makePlate(col=0xffffff) {
  var plate_geom = new THREE.CylinderGeometry(1,0.8,0.1,32)
  var plate_mat= new THREE.MeshLambertMaterial({color:col})
  var plate = new THREE.Mesh(plate_geom, plate_mat);

  plate.position.set(0,3.20,0);

  return plate;
}

/* DESENHAR ELEMENTOS */
// Cadeiras
g_chairs = new THREE.Group()
position = [[0,-1], [-1,0], [0,1], [1,0]];
for (var i = 0; i < position.length; i++){
  chair = makeChair();
  chair.rotation.y = i*Math.PI/2.0;
  chair.position.x = 5*position[i][0];
  chair.position.z = 5*position[i][1];
  g_chairs.add(chair);
}
scene.add(g_chairs);

// Mesa
table = makeTable();
scene.add(table);

// Sala
room = makeRoom();
scene.add(room)

// Pratos
g_plate = new THREE.Group()
for (var i = 0; i < position.length; i++){
  plate = makePlate();
  plate.position.x = 3.8*position[i][0];
  plate.position.z = 3.8*position[i][1];
  g_plate.add(plate);
}
scene.add(g_plate);

/* ILUMINAÇÂO */
var light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);

var directional_light = new THREE.DirectionalLight( 0xdfebff, 0.75, 0, 2);
directional_light.position.set(10*Math.sin(-Math.PI/4.0), 7, 10*Math.cos(-Math.PI/4.0));
directional_light.target = table;
scene.add(directional_light);

var t=0
var animate = function () {
  requestAnimationFrame( animate );  controls.update();

  // Movimento
  t = (t+1) % 60;

  g_plate.rotation.y = t*Math.PI/60.0;
  // room.rotation.y = -t*Math.PI/30.0;

  if (t < 30) {
    g_plate.position.y = t/10;
  } else {
    g_plate.position.y = 6 - t/10;
  }

  renderer.render( scene, camera );
};

animate();
