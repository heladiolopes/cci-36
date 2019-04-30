/**
 * Método para auxiliar construção do tabuleiro
 */
function init_board() {
    for (var i = 0; i < 8; i++)
        for (var j = 0; j < 8; j++) {
            var slot = new THREE.Mesh(slot_geo, (i + j) % 2 ? mat_clear : mat_dark);
            slot.is_clear = (i + j) % 2;
            slot.position.x = i;
            slot.position.y = j;
            scene.add(slot);
            slots.push(slot);
            slot.piece = null; // slot vazio

            var p = board[i][j];
            if (p !== 'nn') {
                piece = new THREE.Mesh(piece_geo, p[1] === 'w' ? mat_white[p[0]] : mat_black[p[0]]);
                piece.type = p[0];
                piece.is_white = p[1] === 'w';
                piece.position.x = i;
                piece.position.y = j;
                piece.position.z = 0.4;
                piece.rotation.x = Math.PI / 2.0;
                scene.add(piece);
                pieces.push(piece);
                slot.piece = piece; // slot tem peça
                piece.slot = slot; // slot da peça
            }
        }
}

/**
 * Atualiza posição do cursor do mouse
 */
function updateCursor() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    nmouse.x = (event.clientX / width) * 2 - 1;
    nmouse.y = -(event.clientY / height) * 2 + 1;

    mouse.x = event.clientX - width / 2;
    mouse.y = -event.clientY + height / 2;

    raycaster.setFromCamera(nmouse, camera);
}

/**
 * Auxilia na animação da cena
 */
function animate() {
    requestAnimationFrame(animate);
    state_update(new Event('paint'));

    camera.position.x = 4 * Math.cos(t) + 4;
    camera.position.y = 4 * Math.sin(t) + 4;
    camera.position.z = 6 + Math.sin(t / 2.0) + 2 * Math.sin(t * 2.0);
    camera.up.set(0, 0, 1);
    camera.lookAt(boardcenter);

    renderer.render(scene, camera);
}

/**
 * Retorna se a posição (x, y) desejada
 * é válida
 */
function get_possibilites(x, y) {

    kill = target_slot.piece && target_slot.piece.is_white !== grab.is_white;
    var kill2 = kill || !target_slot.piece;

    // Verificar limites horizontal e vertical
    var vertical = [true, true, true, true, true, true, true, true];
    var horizontal = [true, true, true, true, true, true, true, true];

    vertical[y] = false;
    horizontal[x] = false;

    if (type === 'r' || type === 'q') {
        var i, c = board[x][y][1],
            up = false,
            down = false,
            left = false,
            right = false;

        for (i = y + 1; i < 8; i++)
            if (up || board[x][i] !== 'nn') {
                vertical[i] = false;
                if (!up && board[x][i][1] !== c) vertical[i] = true;
                up = true;
            }

        for (i = y - 1; i >= 0; i--)
            if (down || board[x][i] !== 'nn') {
                vertical[i] = false;
                if (!down && board[x][i][1] !== c) vertical[i] = true;
                down = true;
            }

        for (i = x + 1; i < 8; i++)
            if (right || board[i][y] !== 'nn') {
                horizontal[i] = false;
                if (!right && board[i][y][1] !== c) horizontal[i] = true;
                right = true;
            }

        for (i = x - 1; i >= 0; i--)
            if (left || board[i][y] !== 'nn') {
                horizontal[i] = false;
                if (!left && board[i][y][1] !== c) horizontal[i] = true;
                left = true;
            }
    }

    // Varificar limites diagonais
    var bispo;
    if (type === 'b' || type === 'q') {
        bispo = new Array(8);
        for (var i = 0; i < 8; i++)
            bispo[i] = new Array(8);
        for (var i = 0; i < 8; i++)
            for (var j = 0; j < 8; j++)
                bispo[i][j] = false;

        var i, c = board[x][y][1],
            u_l = false,
            u_r = false,
            d_l = false,
            d_r = false;

        for (i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++) {
            if (board[i][j][1] === c) {
                u_l = true;
                bispo[i][j] = false;
            } else if (board[i][j] === 'nn' && !u_l) {
                bispo[i][j] = true;
            } else if (board[i][j][1] !== c && !u_l) {
                u_l = true;
                bispo[i][j] = true;
            }
        }

        for (i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j][1] === c) {
                d_r = true;
                bispo[i][j] = false;
            } else if (board[i][j] === 'nn' && !d_r) {
                bispo[i][j] = true;
            } else if (board[i][j][1] !== c && !d_r) {
                d_r = true;
                bispo[i][j] = true;
            }
        }

        for (i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
            if (board[i][j][1] === c) {
                d_l = true;
                bispo[i][j] = false;
            } else if (board[i][j] === 'nn' && !d_l) {
                bispo[i][j] = true;
            } else if (board[i][j][1] !== c && !d_l) {
                d_l = true;
                bispo[i][j] = true;
            }
        }

        for (i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
            if (board[i][j][1] === c) {
                u_r = true;
                bispo[i][j] = false;
            } else if (board[i][j] === 'nn' && !u_r) {
                bispo[i][j] = true;
            } else if (board[i][j][1] !== c && !u_r) {
                u_r = true;
                bispo[i][j] = true;
            }
        }

    }

    switch (type) {

        case 'p':
            if (whites_turn)
                return target_slot.position.y === y + 1 && target_slot.position.x === x && kill2;
            else
                return target_slot.position.y === y - 1 && target_slot.position.x === x && kill2;

        case 'r':

            if (!vertical[target_slot.position.y] && !horizontal[target_slot.position.x])
                return false;

            return (target_slot.position.x === x || target_slot.position.y === y);

        case 'k':
            var knight1 = (Math.abs(target_slot.position.x - x) === 1 && Math.abs(target_slot.position.y - y) === 2);
            var knight2 = (Math.abs(target_slot.position.x - x) === 2 && Math.abs(target_slot.position.y - y) === 1);

            return (knight1 || knight2) && kill2;

        case 'b':
            if (!bispo[target_slot.position.x][target_slot.position.y])
                return false;

            var bishop = Math.abs(target_slot.position.x - x) === Math.abs(target_slot.position.y - y);

            return bishop && kill2;

        case 'K':
            var king1 = Math.abs(target_slot.position.x - x) <= 1;
            var king2 = Math.abs(target_slot.position.y - y) <= 1;

            return (king1 && king2) && kill2;

        case 'q':

            var b_rule = !bispo[target_slot.position.x][target_slot.position.y];
            var r_rule = !vertical[target_slot.position.y] && !horizontal[target_slot.position.x];
            if (b_rule && r_rule)
                return false;

            var queen1 = Math.abs(target_slot.position.x - x) === Math.abs(target_slot.position.y - y);
            var queen2 = target_slot.position.x === x || target_slot.position.y === y;
            return (queen1 || queen2) && kill2;
    }
}

/**
 * Atualiza a matriz board contendo
 * informações do tabuleiro
 */
function update_board() {
    var element = board[origin_slot.position.x][origin_slot.position.y];
    board[origin_slot.position.x][origin_slot.position.y] = 'nn';
    board[target_slot.position.x][target_slot.position.y] = element;

}

