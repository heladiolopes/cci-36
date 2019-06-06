
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

//////////////////////////////////////////////
function predio2(x = 6*M, y = 9*M, h = 15*M) {
    // Geometria Principal (Predio)
    var main_geo = new THREE.BoxGeometry(x, y, h);
    var main_mat = new THREE.MeshLambertMaterial({color:0x90B884, side:THREE.DoubleSide});
    var main =  new THREE.Mesh(main_geo, main_mat);
    main.position.x = x;
    main.position.y = y;
    main.position.z = h/2;

    // Parte "para fora" 1
    var out1_group = new THREE.Group();
    var out_geo1 = new THREE.BoxGeometry(5*x/12, 13*y/18, 0.05*h);
    var out_mat1 = new THREE.MeshLambertMaterial({color:0x354E3A, side:THREE.DoubleSide});
    var out1 =  new THREE.Mesh(out_geo1, out_mat1);
    out1.position.x = main.position.x + x/2;
    out1.position.y = main.position.y;
    out1.position.z = 0.9*h;

    for (var i = 0; i < 3; i++){
        out_aux1 = out1.clone()
        out_aux1.position.z = out_aux1.position.z - i*0.2*h;
        out1_group.add(out_aux1);
        out_aux2 = out1.clone()
        out_aux2.position.z = out_aux2.position.z - i*0.2*h - 2*h/15;
        out1_group.add(out_aux2);
    }

    // Parte "para fora" 2
    var out2_group = new THREE.Group();
    var out_geo2 = new THREE.BoxGeometry(5*x/12, y/18, 2*h/15);
    var out_mat2 = new THREE.MeshLambertMaterial({color:0x354E3A, side:THREE.DoubleSide});
    var out2 =  new THREE.Mesh(out_geo2, out_mat2);
    out2.position.x = main.position.x + x/2;
    out2.position.y = main.position.y;
    out2.position.z = 5*h/6;

    for (var i = 0; i < 3; i++){
        out_aux1 = out2.clone()
        out_aux1.position.y = out_aux1.position.y - y/3;
        out_aux1.position.z = out_aux1.position.z - i*0.2*h;
        out2_group.add(out_aux1);

        out_aux2 = out2.clone()
        out_aux2.position.y = out_aux2.position.y + y/3;
        out_aux2.position.z = out_aux2.position.z - i*0.2*h;
        out2_group.add(out_aux2)
    }

    // Porta
    var door_geo2 = new THREE.PlaneGeometry(4*M, 3*M, 32);
    var door_mat2 = new THREE.MeshLambertMaterial({color:0x585E6E, side:THREE.DoubleSide});
    var door2 = new THREE.Mesh(door_geo2, door_mat2);
    door2.rotation.y = Math.PI/2;
    door2.position.set(main.position.x + x/2 + 0.025*M, main.position.y, 2*M);

    // Janelas
    var w_group = new THREE.Group();
    var w_geo = new THREE.PlaneGeometry(M, 1.75*M, 32);
    var w_mat = new THREE.MeshLambertMaterial({color:0x354E3A, side:THREE.DoubleSide});
    var w =  new THREE.Mesh(w_geo, w_mat);
    w.rotation.y = Math.PI/2;

    w.position.x = main.position.x + x/2 +0.025*M;
    w.position.y = main.position.y;
    w.position.z = 12.5*M;

    for (var i = 0; i < 3; i++){
        w_aux1 = w.clone()
        w_aux1.position.y = w_aux1.position.y - y/6;
        w_aux1.position.z = w_aux1.position.z - i*0.2*h;
        w_group.add(w_aux1);

        w_aux2 = w.clone()
        w_aux2.position.y = w_aux2.position.y + y/6;
        w_aux2.position.z = w_aux2.position.z - i*0.2*h;
        w_group.add(w_aux2)
    }

    // Agrupar
    var predio = new THREE.Group();
    predio.add(main);
    predio.add(out1_group);
    predio.add(out2_group);
    predio.add(door2);
    predio.add(w_group);

    return predio;
}

//////////////////////////////////////////////
function predio3(x = 4*M, y = 4*M, h = 5*M) {
    // Geometria Principal (Predio)
    var main_geo = new THREE.BoxGeometry(x, y, h);
    var main_mat = new THREE.MeshLambertMaterial({color:0x3A5C39, side:THREE.DoubleSide});
    var main =  new THREE.Mesh(main_geo, main_mat);
    main.position.x = 1.5*x;
    main.position.y = -2*y;
    main.position.z = h/2;

    // Predio Secundario
    var main_geo1 = new THREE.BoxGeometry(2*x/3, 3*y/5, h);
    var main_mat1 = new THREE.MeshLambertMaterial({color:0x92B289, side:THREE.DoubleSide});
    var main1 =  new THREE.Mesh(main_geo1, main_mat1);
    main1.position.x = main.position.x;
    main1.position.y = main.position.y - y/2 - 1.5*y/5;
    main1.position.z = h/2;

    var main_geo2 = new THREE.BoxGeometry(2*x/3, 3*y/5, h);
    var main_mat2 = new THREE.MeshLambertMaterial({color:0x92B289, side:THREE.DoubleSide});
    var main2 =  new THREE.Mesh(main_geo2, main_mat2);
    main2.position.x = main.position.x;
    main2.position.y = main.position.y + y/2 + 1.5*y/5;
    main2.position.z = h/2;

    // Topo
    var top_geo1 = new THREE.BoxGeometry(x + 0.5*M, y + 0.5*M, 0.5*M);
    var top_mat1 = new THREE.MeshLambertMaterial({color:0xE2E5EC, side:THREE.DoubleSide});
    var top1 = new THREE.Mesh(top_geo1, top_mat1);
    top1.position.set(main.position.x, main.position.y, h + 0.25*M);

    // "Sombra"
    var show_geo1 = new THREE.BoxGeometry(2*M, 3.5*M, 0.5*M);
    var show_mat1 = new THREE.MeshLambertMaterial({color:0xE2E5EC, side:THREE.DoubleSide});
    var show1 = new THREE.Mesh(show_geo1, show_mat1);
    show1.position.set(main.position.x + x/2, main.position.y, 5*h/8);

    // Portas
    var door_geo1 = new THREE.PlaneGeometry(2.5*M, 1.25*M, 32);
    var door_mat1 = new THREE.MeshLambertMaterial({color:0xB5B4CB, side:THREE.DoubleSide});
    var door1 = new THREE.Mesh(door_geo1, door_mat1);
    door1.rotation.y = Math.PI/2;
    door1.position.set(main.position.x + x/2 + 0.025*M, main.position.y + y/4, 1.25*M + 0.05*M);

    var door_geo2 = new THREE.PlaneGeometry(2.5*M, 1.25*M, 32);
    var door_mat2 = new THREE.MeshLambertMaterial({color:0xB5B4CB, side:THREE.DoubleSide});
    var door2 = new THREE.Mesh(door_geo2, door_mat2);
    door2.rotation.y = Math.PI/2;
    door2.position.set(main.position.x + x/2 + 0.025*M, main.position.y - y/4, 1.25*M + 0.05*M);

    // Janelas
    var w_geo1 = new THREE.PlaneGeometry(2*M, 1.5*M, 32);
    var w_mat1 = new THREE.MeshLambertMaterial({color:0xB5B4CB, side:THREE.DoubleSide});
    var w1 = new THREE.Mesh(w_geo1, w_mat1);
    w1.rotation.y = Math.PI/2;
    w1.position.set(main1.position.x + x/3 + 0.025*M, main1.position.y, h/2);

    var w_geo2 = new THREE.PlaneGeometry(2*M, 1.5*M, 32);
    var w_mat2 = new THREE.MeshLambertMaterial({color:0xB5B4CB, side:THREE.DoubleSide});
    var w2 = new THREE.Mesh(w_geo2, w_mat2);
    w2.rotation.y = Math.PI/2;
    w2.position.set(main2.position.x + x/3 + 0.025*M, main2.position.y, h/2);

    // Placa
    var p_geo = new THREE.PlaneGeometry(M, 3.5*M, 32);
    var p_mat = new THREE.MeshLambertMaterial({color:0x405A7B, side:THREE.DoubleSide});
    var p = new THREE.Mesh(p_geo, p_mat);
    p.rotation.y = Math.PI/2;
    p.position.set(main.position.x + x/2 + 0.025*M, main.position.y, 5*h/6 + 0.05*M);

    // Agrupar
    var predio = new THREE.Group();
    predio.add(main);
    predio.add(main1);
    predio.add(main2);
    predio.add(show1);
    predio.add(top1);
    predio.add(door1);
    predio.add(door2);
    predio.add(p);
    predio.add(w1);
    predio.add(w2);

    return predio;
}

function nuvem(){
    var sp_group = new THREE.Group();

    var geometry1 = new THREE.OctahedronGeometry( 3*M, 1 );
    var material1 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere1 = new THREE.Mesh( geometry1, material1 );
    sphere1.position.set(20*M, 20*M, 30*M);
    var geometry2 = new THREE.OctahedronGeometry( 3*M, 1 );
    var material2 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere2 = new THREE.Mesh( geometry2, material2 );
    sphere2.position.set(18*M, 22*M, 32*M);
    var geometry3 = new THREE.OctahedronGeometry( 4*M, 1 );
    var material3 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere3 = new THREE.Mesh( geometry3, material3 );
    sphere3.position.set(21*M, 19*M, 29*M);

    var geometry4 = new THREE.OctahedronGeometry( 2*M, 1 );
    var material4 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere4 = new THREE.Mesh( geometry4, material4 );
    sphere4.position.set(22*M, 22*M, 28*M);
    var geometry5 = new THREE.OctahedronGeometry( 5*M, 1 );
    var material5 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere5 = new THREE.Mesh( geometry5, material5 );
    sphere5.position.set(24*M, 24*M, 30*M);
    var geometry6 = new THREE.OctahedronGeometry( 3*M, 1 );
    var material6 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere6 = new THREE.Mesh( geometry6, material6 );
    sphere6.position.set(23*M, 21*M, 27*M);

    sp_group.add(sphere1);
    sp_group.add(sphere2);
    sp_group.add(sphere3);

    sp_group.add(sphere4);
    sp_group.add(sphere5);
    sp_group.add(sphere6);

    return sp_group;
}