
const cores = [0x6DAC73, 0x708AAD, 0x90B884, 0x800000, 0x4682B4, 0x8B4513, 0xDAA520, 0xDCDCDC];

function rand(range){
    return Math.abs(Math.floor(Math.random() * 100) % range);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function cidade(x = 50*M, y = 50*M){
    var plane_geom = new THREE.PlaneGeometry(sz*30*M + 25*M, sz*30*M + 25*M, 32);
    var plane_mat = new THREE.MeshLambertMaterial({color:0x2C2C2C, side:THREE.DoubleSide});
    var plane = new THREE.Mesh(plane_geom, plane_mat);
    plane.position.z = -0.3*M;

    var bloco_geo = new THREE.BoxGeometry(10.1*M, 10.1*M, 0.3*M);
    var bloco_mat = new THREE.MeshLambertMaterial({color:0xFFFFFF, side:THREE.DoubleSide});
    var bloco = new THREE.Mesh(bloco_geo, bloco_mat);

    var b_group = new THREE.Group();
    for (var i = -sz; i < sz+1; i++){
        for (var k = -sz; k < sz+1; k++) {
            b = quarteirao();
            b.position.set(i*15*M, k*15*M, 0.01*M);
            b_group.add(b);

            a = bloco.clone()
            a.position.set(i*15*M, k*15*M, -0.15*M);
            b_group.add(a);
        }
    }

    var city = new THREE.Group();
    city.add(plane);
    city.add(b_group);

    city.rotation.x = -Math.PI/2;

    return city;
}

function quarteirao(){

    var q;
    tipo = rand(5);
    rotacao = rand(4);

    switch(tipo) {
        case 0: q = q0();break;
        case 1: q = q1();break;
        case 2: q = q2();break;
        case 3: q = q3();break;
        case 4: q = q4();break;
    }

    q.rotation.z = rotacao*Math.PI/2;
    return q;
}

// Predio 1
function q0(){
    var q_group = new THREE.Group();

    var bloco = new THREE.Mesh(
        new THREE.PlaneGeometry(10*M, 10*M, 32),
        new THREE.MeshLambertMaterial({color:0x708090, side:THREE.DoubleSide})
    );
    bloco.position.z = 0.02*M;
    q_group.add(bloco);

    var p = predio1(color=cores[rand(cores.length)]);
    p.position.x = -M;
    q_group.add(p);

    var a = arvore();
    a.position.x = 3*M;
    b = a.clone()
    a.position.y = 2.5*M;
    b.position.y = -2.5*M;
    q_group.add(a);
    q_group.add(b);

    return q_group;
}

// Fabrica
function q1(){
    var q_group = new THREE.Group();

    var p = fabrica(color=cores[rand(cores.length)]);
    p.position.x = -1.5*M;
    q_group.add(p);

    var bloco = new THREE.Mesh(
        new THREE.PlaneGeometry(10*M, 10*M, 32),
        new THREE.MeshLambertMaterial({color:0x606166, side:THREE.DoubleSide})
    );
    bloco.position.z = 0.02*M;
    q_group.add(bloco);

    if (rand(10) < 7){
        h = hidrante();
        h.position.set(4*M, -4*M, 0);
        q_group.add(h);
    }

    if (rand(10) < 7){
        c = carro(color = cores[rand(cores.length)]);
        c.position.set(3*M, 3*M, 0);
        c.rotation.z = Math.PI/2;
        q_group.add(c);
    }

    return q_group;
}

// Parque
function q2(){
    var q_group = new THREE.Group();

    var bloco = new THREE.Mesh(
        new THREE.PlaneGeometry(10*M, 10*M, 32),
        new THREE.MeshLambertMaterial({color:0x556B2F, side:THREE.DoubleSide})
    );
    bloco.position.z = 0.02*M;
    q_group.add(bloco);

    var arv = arvore();
    for (var k = -1; k < 2; k++){
        a = arv.clone();
        a.position.set(3*M, 3*k*M, 0);
        b = arv.clone();
        b.position.set(-3*M, 3*k*M, 0);
        ba = banco();
        ba.position.set(0, 3*k*M, 0);

        q_group.add(a);
        q_group.add(b);
        q_group.add(ba);
    }

    return q_group;
}

// Predio 2
function q3(){
    var q_group = new THREE.Group();

    var bloco = new THREE.Mesh(
        new THREE.PlaneGeometry(10*M, 10*M, 32),
        new THREE.MeshLambertMaterial({color:0xE6E6FA, side:THREE.DoubleSide})
    );
    bloco.position.z = 0.02*M;
    q_group.add(bloco);

    var p = predio2(color=cores[rand(cores.length)]);
    p.position.x = -0.5*M;
    q_group.add(p);

    if (rand(10) < 4){
        h = hidrante();
        h.position.set(4*M, 4*M, 0);
        q_group.add(h);0
    }

    return q_group;
}

// Predio 3
function q4(){
    var q_group = new THREE.Group();

    var bloco = new THREE.Mesh(
        new THREE.PlaneGeometry(10*M, 10*M, 32),
        new THREE.MeshLambertMaterial({color:0x606166, side:THREE.DoubleSide})
    );
    bloco.position.z = 0.02*M;
    q_group.add(bloco);

    var p = predio3(color=cores[rand(cores.length)]);
    p.position.x = -2*M;
    q_group.add(p);

    if (rand(10) < 7){
        h = hidrante();
        h.position.set(4*M, 4*M, 0);
        q_group.add(h);0
    }

    if (rand(10) < 5){
        c = carro(color = cores[rand(cores.length)]);
        c.position.set(3*M, -3*M, 0);
        c.rotation.z = Math.PI/2;
        q_group.add(c);
        if (rand(10) < 8){
            c = carro(color = cores[rand(cores.length)]);
            c.position.set(3*M, -1*M, 0);
            c.rotation.z = Math.PI/2;
            q_group.add(c);
        }
    }




    return q_group;
}

// Keys do teclado
var onKeyDown = function ( event ) {
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            moveForward = true;
            break;
        case 37: // left
        case 65: // a
            moveLeft = true;
            break;
        case 40: // down
        case 83: // s
            moveBackward = true;
            break;
        case 39: // right
        case 68: // d
            moveRight = true;
            break;
        case 32: // space
            if ( canJump === true ) velocity.y += 350;
            canJump = false;
            break;
    }
};
var onKeyUp = function ( event ) {
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;
        case 37: // left
        case 65: // a
            moveLeft = false;
            break;
        case 40: // down
        case 83: // s
            moveBackward = false;
            break;
        case 39: // right
        case 68: // d
            moveRight = false;
            break;
    }
};
