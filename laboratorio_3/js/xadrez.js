/************************************
 *  MINIJOGO DE XADREZ              *
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
renderer.setClearColor(0x220000);
document.body.appendChild(renderer.domElement);


/**
 * CONSTRUÇÂO DO TABULEIRO E PEÇAS
 */

// Objetos
var slots = [];
var pieces = [];

// Panorama do tabuleiro
var board = [
    ['rw', 'pw', 'nn', 'nn', 'nn', 'nn', 'pb', 'rb'],
    ['kw', 'pw', 'nn', 'nn', 'nn', 'nn', 'pb', 'kb'],
    ['bw', 'pw', 'nn', 'nn', 'nn', 'nn', 'pb', 'bb'],
    ['qw', 'pw', 'nn', 'nn', 'nn', 'nn', 'pb', 'qb'],
    ['Kw', 'pw', 'nn', 'nn', 'nn', 'nn', 'pb', 'Kb'],
    ['bw', 'pw', 'nn', 'nn', 'nn', 'nn', 'pb', 'bb'],
    ['kw', 'pw', 'nn', 'nn', 'nn', 'nn', 'pb', 'kb'],
    ['rw', 'pw', 'nn', 'nn', 'nn', 'nn', 'pb', 'rb'],
];


// Criar slots e peças
init_board();

/**
 * ILUMINAÇÂO
 */
// Luz
var light = new THREE.PointLight(0xffffff, 1.0);
light.position.set(4, 4, 2);
scene.add(light);

// Pocisionamento da câmera
var t_blacks = Math.PI / 2.0;
var t_whites = 3.0 * Math.PI / 2.0;
var anim_time = 0;

t = t_whites;

/**
 * MOVIMENTAÇÂO
 */

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(-1000, -1000);
var nmouse = new THREE.Vector2(-1000, -1000);


var state = 'preselect';
var grab = null;
var whites_turn = true;

var grab_x, grab_y, type, ax, ay, col, kill;

function state_update(event) {

    if (event.type !== 'paint') {
        for (var i = 0; i < pieces.length; i++)
            if (pieces[i].is_white) {
                pieces[i].material = mat_white[pieces[i].type];
            } else
                pieces[i].material = mat_black[pieces[i].type];

        for (var i = 0; i < slots.length; i++)
            slots[i].material = slots[i].is_clear ? mat_clear : mat_dark;

        updateCursor();
    }

    if (event.type === 'mousemove' && state === 'preselect') {

        intersects = raycaster.intersectObjects(pieces);
        if (intersects.length) {
            if (intersects[0].object.is_white === whites_turn) intersects[0].object.material = mat_highlight;
        }
    }

    if (event.type === 'mousedown' && state === 'preselect') {
        intersects = raycaster.intersectObjects(pieces);
        if (intersects.length) {
            if (intersects[0].object.is_white === whites_turn) {
                state = 'grab';
                grab = intersects[0].object;
                col = grab.is_white;
                grab.position.z = 1.0;
                grab_x = grab.position.x;
                grab_y = grab.position.y;
                ax = grab_x;
                ay = grab_y;
                type = grab.type;
                return; // sempre retornar se mudou de estado
            }
        }
    }

    if (event.type === 'mousemove' && state === 'grab') {
        intersects = raycaster.intersectObjects(slots);
        if (intersects.length) {
            target_slot = intersects[0].object;
            if (get_possibilites(ax, ay)) {
                target_slot.material = mat_highlight;
                grab_x = target_slot.position.x;
                grab_y = target_slot.position.y;
            }
        }
    }

    if (event.type === 'mouseup' && state === 'grab') {
        console.log(event.type);
        intersects = raycaster.intersectObjects(slots);
        if (intersects.length) {
            target_slot = intersects[0].object;
            if (get_possibilites(ax, ay)) {

                if (kill) {
                    scene.remove(target_slot.piece);
                }

                origin_slot = grab.slot;
                origin_slot.piece = null;
                target_slot.piece = grab;
                grab.slot = target_slot;
                grab.position.x = target_slot.position.x;
                grab.position.y = target_slot.position.y;
                grab.position.z = 0.5;
                state = 'turning';
                anim_time = 0;
                whites_turn = !whites_turn;

                update_board();

                grab = null;
                return; // sempre retornar se mudou de estado
            }
        }
        state = 'preselect';
        origin_slot = grab.slot;
        grab.position.x = origin_slot.position.x;
        grab.position.y = origin_slot.position.y;
        grab.position.z = 0.4;
        grab = null;
        return; // sempre retornar se mudou de estado

    }

    if (event.type === 'paint' && state === 'turning') {
        anim_time = anim_time + 0.05;
        if (whites_turn) t = t_blacks + anim_time;
        else t = t_whites + anim_time;
        if (anim_time > Math.PI) state = 'preselect';
    }

    if (event.type === 'paint' && state === 'grab') {
        var vel = 0.1;
        var x = grab.position.x;
        var y = grab.position.y;
        var dirx = grab_x - x;
        var diry = grab_y - y;
        var dist = Math.sqrt(dirx * dirx + diry * diry);
        if (dist > vel) {
            grab.position.x = x + vel * dirx / dist;
            grab.position.y = y + vel * diry / dist;
        } else {
            grab.position.x = grab_x;
            grab.position.y = grab_y;
        }
    }


}

window.addEventListener('mousemove', state_update, false);
window.addEventListener('mouseup', state_update, false);
window.addEventListener('mousedown', state_update, false);
animate();
