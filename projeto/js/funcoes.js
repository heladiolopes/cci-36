
function makeHouse(col=0xf8f8f8, wall=0xf8aaf8, larg = 10*M, alt = 14*M, exp = 0.1*M) {
    // Piso
    var piso_geo = new THREE.BoxGeometry(larg, alt, 0.2*M);
    var piso_mat = new THREE.MeshLambertMaterial({color:col, side:THREE.DoubleSide});
    var piso = new THREE.Mesh(piso_geo, piso_mat);
    piso.position.z = - 1.5*M;

    // Parede
    var parede_mat = new THREE.MeshLambertMaterial({color:wall, side:THREE.DoubleSide});

    var lateral_geo =new THREE.BoxGeometry(exp, alt, 3*M);
    var lateral = new THREE.Mesh(lateral_geo, parede_mat);
    var l = lateral.clone();
    lateral.position.x = - (larg-exp)/2;
    l.position.x = (larg-exp)/2;

    var hor_geo = new THREE.BoxGeometry(larg, exp, 3*M);
    var horizontal = new THREE.Mesh(hor_geo, parede_mat);
    var h = horizontal.clone();
    horizontal.position.y = - (alt-exp)/2;
    h.position.y = (alt-exp)/2;

    // Agrupar
    var g_plane = new THREE.Group();
    g_plane.add(piso);
    g_plane.add(lateral);
    g_plane.add(horizontal);
    g_plane.add(l);
    g_plane.add(h);
    g_plane.position.z =  1.5*M;
    g_plane.position.y = - 2*M;

    return g_plane;
}

function predio1(x = 5*M, y = 7*M, h = 10*M) {
    // Geometria Principal
    var main_geo = new THREE.BoxGeometry(x, y, 2*h/3);
    var main_mat = new THREE.MeshLambertMaterial({color:0xC2BFB0, side:THREE.DoubleSide});
    var main =  new THREE.Mesh(main_geo, main_mat);
    main.position.z = 2*h/3;

    var main_geo1 = new THREE.BoxGeometry(x, y, h/3);
    var main_mat1 = new THREE.MeshLambertMaterial({color:0x6DAC73, side:THREE.DoubleSide});
    var main1 =  new THREE.Mesh(main_geo1, main_mat1);
    main1.position.z = h/6;

    // Janelas
    var window_geo = new THREE.PlaneGeometry(1.25*M, 1.75*M, 32);
    var window_mat = new THREE.MeshLambertMaterial({color:0x51515A, side:THREE.DoubleSide});
    var window = new THREE.Mesh(window_geo, window_mat);
    window.rotation.y = Math.PI/2;
    pos = [[2.51*M, -2.25*M], [2.51*M, 2.25*M]];
    pos_z = [5.5*M, 8.5*M];
    var w_group = new THREE.Group();
    for (var i = 0; i < pos_z.length; i++){
        for (var k = 0; k < pos.length; k++){
            w = window.clone();
            w.position.set(pos[k][0], pos[k][1], pos_z[i]);
            w_group.add(w);
        }
    }

    // Porta
    var door_geo = new THREE.PlaneGeometry(2.5*M, 1.75*M, 32);
    var door_mat = new THREE.MeshLambertMaterial({color:0xB5B4CB, side:THREE.DoubleSide});
    var door = new THREE.Mesh(door_geo, door_mat);
    door.rotation.y = Math.PI/2;
    door.position.set(x/2+x/10+0.05*M, 0, 1.25*M);

    // Detalhes
    var detail_geo = new THREE.BoxGeometry(x/10, y/3, h);
    var detail = new THREE.Mesh(detail_geo, main_mat1);
    detail.position.set(x/2+x/20, 0, h/2);

    // Janelas do meio
    var wind_geo = new THREE.PlaneGeometry(0.75*M, 1.25*M, 32);
    var wind = new THREE.Mesh(wind_geo, window_mat);
    wind.rotation.y = Math.PI/2;
    for (var i = 0; i < pos_z.length; i++){
        w = wind.clone();
        w.position.set(x/2+x/10+0.05*M, 0, pos_z[i]);
        w_group.add(w);
    }



    // Agrupar
    var predio = new THREE.Group();
    predio.add(main);
    predio.add(main1);
    predio.add(door);
    predio.add(w_group);
    predio.add(detail);

    return predio;

}