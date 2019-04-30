/**
 * Constantes
 */
const UNIT = 1;
const boardcenter = new THREE.Vector3(4 * UNIT, 4 * UNIT, 0);
const piecename = {'p': 'pawn', 'r': 'rook', 'k': 'knight', 'b': 'bishop', 'K': 'king', 'q': 'queen'};


// Texture Loader
const textureLoader = new THREE.TextureLoader();
textureLoader.setPath('chess/');
const textura = {
    'p': textureLoader.load('pawn.png'),
    'r': textureLoader.load('rook.png'),
    'k': textureLoader.load('knight.png'),
    'b': textureLoader.load('bishop.png'),
    'K': textureLoader.load('king.png'),
    'q': textureLoader.load('queen.png')
};

// Geometrias
const slot_geo = new THREE.BoxGeometry(1, 1, 0.2);
const piece_geo = new THREE.CylinderGeometry(0.36, 0.36, 0.4, 32);

// Materiais
const mat_clear = new THREE.MeshLambertMaterial({color: 0xffff88});
const mat_dark = new THREE.MeshLambertMaterial({color: 0x665522});

const mat_white = {
    'p': new THREE.MeshLambertMaterial({color: 0xffffff, map: textura['p']}),
    'r': new THREE.MeshLambertMaterial({color: 0xffffff, map: textura['r']}),
    'k': new THREE.MeshLambertMaterial({color: 0xffffff, map: textura['k']}),
    'b': new THREE.MeshLambertMaterial({color: 0xffffff, map: textura['b']}),
    'K': new THREE.MeshLambertMaterial({color: 0xffffff, map: textura['K']}),
    'q': new THREE.MeshLambertMaterial({color: 0xffffff, map: textura['q']})
};

const mat_black = {
    'p': new THREE.MeshLambertMaterial({color: 0x334411, map: textura['p']}),
    'r': new THREE.MeshLambertMaterial({color: 0x334411, map: textura['r']}),
    'k': new THREE.MeshLambertMaterial({color: 0x334411, map: textura['k']}),
    'b': new THREE.MeshLambertMaterial({color: 0x334411, map: textura['b']}),
    'K': new THREE.MeshLambertMaterial({color: 0x334411, map: textura['K']}),
    'q': new THREE.MeshLambertMaterial({color: 0x334411, map: textura['q']})
};

const mat_highlight = new THREE.MeshBasicMaterial({color: 0xAAFFAA});