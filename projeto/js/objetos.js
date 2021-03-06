
function predio1(color = 0x6DAC73, x = 5*M, y = 7*M, h = 10*M) {
    // Geometria Principal
    var main_geo = new THREE.BoxGeometry(x, y, 2*h/3);
    var main_mat = new THREE.MeshLambertMaterial({color:0xC2BFB0, side:THREE.DoubleSide});
    var main =  new THREE.Mesh(main_geo, main_mat);
    main.position.z = 2*h/3;

    var main_geo1 = new THREE.BoxGeometry(x, y, h/3);
    var main_mat1 = new THREE.MeshLambertMaterial({color:color, side:THREE.DoubleSide});
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

function predio2(color = 0x90B884, x = 6*M, y = 9*M, h = 15*M) {
    // Geometria Principal (Predio)
    var main_geo = new THREE.BoxGeometry(x, y, h);
    var main_mat = new THREE.MeshLambertMaterial({color:color, side:THREE.DoubleSide});
    var main =  new THREE.Mesh(main_geo, main_mat);
    main.position.x = 0;
    main.position.y = 0;
    main.position.z = h/2;

    // Parte "para fora" 1
    var out1_group = new THREE.Group();
    var out_geo1 = new THREE.BoxGeometry(5*x/12, 13*y/18, 0.05*h);
    var out_mat1 = new THREE.MeshLambertMaterial({color:0xC2BFB0, side:THREE.DoubleSide});
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
    var out_mat2 = new THREE.MeshLambertMaterial({color:0xC2BFB0, side:THREE.DoubleSide});
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
    var w_mat = new THREE.MeshLambertMaterial({color:0x51515A, side:THREE.DoubleSide});
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

function predio3(color = 0x3A5C39, x = 4*M, y = 4*M, h = 5*M) {
    // Geometria Principal (Predio)
    var main_geo = new THREE.BoxGeometry(x, y, h);
    var main_mat = new THREE.MeshLambertMaterial({color:color, side:THREE.DoubleSide});
    var main =  new THREE.Mesh(main_geo, main_mat);
    main.position.x = 0;
    main.position.y = 0;
    main.position.z = h/2;

    // Predio Secundario
    var main_geo1 = new THREE.BoxGeometry(2*x/3, 3*y/5, h);
    var main_mat1 = new THREE.MeshLambertMaterial({color:0x51515A, side:THREE.DoubleSide});
    var main1 =  new THREE.Mesh(main_geo1, main_mat1);
    main1.position.x = main.position.x;
    main1.position.y = main.position.y - y/2 - 1.5*y/5;
    main1.position.z = h/2;

    var main_geo2 = new THREE.BoxGeometry(2*x/3, 3*y/5, h);
    var main_mat2 = new THREE.MeshLambertMaterial({color:0x51515A, side:THREE.DoubleSide});
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
    var p_mat = new THREE.MeshLambertMaterial({color:0xFFD700, side:THREE.DoubleSide});
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

function fabrica(color = 0x708AAD, x = 5*M, y = 7*M, h = 3*M) {
    // Geometria Principal
    var main_geo = new THREE.BoxGeometry(x, y, h/2);
    var main_mat = new THREE.MeshLambertMaterial({color:color, side:THREE.DoubleSide});
    var main =  new THREE.Mesh(main_geo, main_mat);
    main.position.z = h/4;

    var main_geo1 = new THREE.BoxGeometry(x, 2*y/3, h/2);
    var main1 = new THREE.Mesh(main_geo1, main_mat);
    main1.position.z = 3*h/4;
    main1.position.y = -y/6;


    // Teto
    var teto_geo = new THREE.CylinderGeometry(x/3, x/3, 2*y/3, 3);
    var teto_mat = new THREE.MeshLambertMaterial({color:0x96A1A7, side:THREE.DoubleSide});
    var teto = new THREE.Mesh( teto_geo, teto_mat );
    t = teto.clone();
    teto.position.set(x/4, -y/6, 1.18*h)
    t.position.set(-x/4, -y/6, 1.18*h)


    // Cilindros
    var cylinder_geo = new THREE.CylinderGeometry( x/14, x/11, 1.5*h, 32 );
    var c1 = new THREE.Mesh( cylinder_geo, teto_mat );
    c1.rotation.x = Math.PI/2;
    c2 = c1.clone();
    c1.position.set(x/4, y/3, 1.25*h);
    c2.position.set(-x/4, y/3, 1.25*h);


    // Janelas
    var window_geo = new THREE.PlaneGeometry(3*x/4, x/5, 32);
    var window_mat = new THREE.MeshLambertMaterial({color:0x51515A, side:THREE.DoubleSide});
    var window = new THREE.Mesh(window_geo, window_mat);
    window.rotation.x = Math.PI/2;
    window.position.set(0, -y/2-0.01*M, 1.5*x/5);


    // Porta
    var door_geo = new THREE.PlaneGeometry(2*M, 2.5*M, 32);
    var door_mat = new THREE.MeshLambertMaterial({color:0xB5B4CB, side:THREE.DoubleSide});
    var door = new THREE.Mesh(door_geo, door_mat);
    door.rotation.y = Math.PI/2;
    door.position.set(x/2+0.05*M, -y/6, M);



    // Agrupar
    var predio = new THREE.Group();
    predio.add(main);
    predio.add(main1);
    predio.add(window);
    predio.add(teto);
    predio.add(t);
    predio.add(door);
    predio.add(c1);
    predio.add(c2);

    return predio;

}

function arvore(r = 0.25*M, h = 2*M) {

    // Tronco
    var tronco_geo = new THREE.CylinderGeometry( r, r, h, 32 );
    var tronco_mat = new THREE.MeshLambertMaterial({color:0x3A2B2D, side:THREE.DoubleSide});
    var tronco = new THREE.Mesh( tronco_geo, tronco_mat );
    tronco.rotation.x = Math.PI/2;
    tronco.position.z = h/2;

    // Folhas
    var folha_geo = new THREE.IcosahedronGeometry(1.5*r, 1);
    var folha_mat = new THREE.MeshLambertMaterial({color:0x417D2C, side:THREE.DoubleSide});
    var folha = new THREE.Mesh( folha_geo, folha_mat );

    var f_group = new THREE.Group();
    f = folha.clone();
    f.position.z = h;
    f_group.add(f);

    h_f = [3*h/4, h/2];
    p_f = [[r, r], [-r, r], [r, -r], [-r, -r]];
    for (var i = 0; i < h_f.length; i++){
        for (var k = 0; k < p_f.length; k++){
            f = folha.clone();
            f.position.set(p_f[k][0], p_f[k][1], h_f[i]);
            f_group.add(f);
        }
    }


    var arv = new THREE.Group();
    arv.add(tronco);
    arv.add(f_group);

    return arv;
}

function nuvem(r = 3*M){
    var sp_group = new THREE.Group();

    x = 0;//20*M;
    y = 0;//20*M;
    z = 0;//30*M;

    var geometry1 = new THREE.OctahedronGeometry( r, 1 );
    var material1 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere1 = new THREE.Mesh( geometry1, material1 );
    sphere1.position.set(x, y, z);
    var geometry2 = new THREE.OctahedronGeometry( r, 1 );
    var material2 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere2 = new THREE.Mesh( geometry2, material2 );
    sphere2.position.set(x - 2*r/3, y + 2*r/3, z + 2*r/3);
    var geometry3 = new THREE.OctahedronGeometry( 4*r/3, 1 );
    var material3 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere3 = new THREE.Mesh( geometry3, material3 );
    sphere3.position.set(x + r/3, y - r/3, z - r/3);

    var geometry4 = new THREE.OctahedronGeometry( 2*r/3, 1 );
    var material4 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere4 = new THREE.Mesh( geometry4, material4 );
    sphere4.position.set(x + 2*r/3, y + 2*r/3, z - 2*r/3);
    var geometry5 = new THREE.OctahedronGeometry( 5*r/3, 1 );
    var material5 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere5 = new THREE.Mesh( geometry5, material5 );
    sphere5.position.set(x + 4*r/3, y + 4*r/3, z);
    var geometry6 = new THREE.OctahedronGeometry( r, 1 );
    var material6 = new THREE.MeshBasicMaterial( {color: 0xFCFCFC} );
    var sphere6 = new THREE.Mesh( geometry6, material6 );
    sphere6.position.set(x + 3*r/3, y + r/3, z - 3*r/3);

    sp_group.add(sphere1);
    sp_group.add(sphere2);
    sp_group.add(sphere3);

    sp_group.add(sphere4);
    sp_group.add(sphere5);
    sp_group.add(sphere6);

    sp_group.rotation.x = Math.PI/2;

    return sp_group;
}

function banco(x = 0.5*M, y = 2*M, h = 0.10*M){
    // Parte Principal
    var main_geo = new THREE.BoxGeometry(x, y, h);
    var main_mat = new THREE.MeshLambertMaterial({color:0x8B4513, side:THREE.DoubleSide});
    var main =  new THREE.Mesh(main_geo, main_mat);
    // main.position.x = 10*M;
    // main.position.y = 10*M;
    main.position.z = 0.5*M;

    // Pernas
    var perna_geo = new THREE.BoxGeometry(0.1*M, 0.1*M, main.position.z);
    var perna_mat = new THREE.MeshLambertMaterial({color:0x030303, side:THREE.DoubleSide});
    var perna =  new THREE.Mesh(perna_geo, perna_mat);
    perna.position.z = main.position.z/2;

    perna_1 = perna.clone();
    perna_1.position.x = main.position.x + x/2 - 0.05*M;
    perna_1.position.y = main.position.y + y/2 - 0.05*M;

    perna_2 = perna.clone();
    perna_2.position.x = main.position.x + x/2 - 0.05*M;
    perna_2.position.y = main.position.y - y/2 + 0.05*M;

    perna_3 = perna.clone();
    perna_3.position.x = main.position.x - x/2 + 0.05*M;
    perna_3.position.y = main.position.y + y/2 - 0.05*M;

    perna_4 = perna.clone();
    perna_4.position.x = main.position.x - x/2 + 0.05*M;
    perna_4.position.y = main.position.y - y/2 + 0.05*M;

    var banco = new THREE.Group();
    banco.add(main)
    banco.add(perna_1)
    banco.add(perna_2)
    banco.add(perna_3)
    banco.add(perna_4)

    banco.rotation.z = Math.PI/2;

    return banco;
}

function hidrante(r1 = 0.15*M, r2 = 0.15*M, h = 0.75*M){
    // Cilindro Principal
    var geometry = new THREE.CylinderGeometry( r1, r2, h, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xB22222} );
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.rotation.x = Math.PI/2;

    // cylinder.position.x = -10*M;
    // cylinder.position.y = -10*M;
    cylinder.position.z = h/2;

    // Chapéu
    var geometry_1 = new THREE.SphereGeometry( r1, 32, 32);
    var material_1 = new THREE.MeshBasicMaterial( {color: 0xB22222} );
    var top_1 = new THREE.Mesh( geometry_1, material_1 );

    top_1.position.x = cylinder.position.x;
    top_1.position.y = cylinder.position.y;
    top_1.position.z = h;

    // Cilindro Lateral
    var geometry_2 = new THREE.CylinderGeometry( 4*r1/3, 4*r1/3, 4*r1/3, 32 );
    var material_2 = new THREE.MeshBasicMaterial( {color: 0xA52A2A} );
    var hat = new THREE.Mesh( geometry_2, material_2 );
    hat.rotation.x = Math.PI/2;

    hat.position.x = cylinder.position.x;
    hat.position.y = cylinder.position.y;
    hat.position.z = 3*h/4;

    var hidrante = new THREE.Group();
    hidrante.add(cylinder);
    hidrante.add(top_1);
    hidrante.add(hat);

    return hidrante
}

function carro(color = 0x90B884, x = 1.75*M, y = 3.5*M, h = 1.25*M){
    // Parte Principal
    var main_geo = new THREE.BoxGeometry(x, y, h);
    var main_mat = new THREE.MeshLambertMaterial({color:color, side:THREE.DoubleSide});
    var main =  new THREE.Mesh(main_geo, main_mat);
    main.position.x = 0;//8*x;
    main.position.y = 0;//8*y;
    main.position.z = h/2 + 0.25*M;

    // Parte Secundaria
    var main_geo1 = new THREE.BoxGeometry(x, 2*y/3, 2*h/3);
    var main_mat1 = new THREE.MeshLambertMaterial({color:0xC0C0C0, side:THREE.DoubleSide});
    var main_1 =  new THREE.Mesh(main_geo1, main_mat1);
    main_1.position.x = main.position.x;
    main_1.position.y = main.position.y - y/6;
    main_1.position.z = 4*h/3 + 0.25*M;

    // Rodas
    var r_geometry = new THREE.CylinderGeometry( 0.5*M, 0.5*M, 1.80*M, 32 );
    var r_material = new THREE.MeshBasicMaterial( {color: 0x030303} );
    var roda = new THREE.Mesh( r_geometry, r_material );
    roda.rotation.z = Math.PI/2;
    roda.position.x = main.position.x;
    roda.position.y = main.position.y + y/2 - 0.5*M - 0.025*M;
    roda.position.z = M/2;

    var rr_geometry = new THREE.CylinderGeometry( 0.5*M, 0.5*M, 1.80*M, 32 );
    var rr_material = new THREE.MeshBasicMaterial( {color: 0x030303} );
    var rroda = new THREE.Mesh( rr_geometry, rr_material );
    rroda.rotation.z = Math.PI/2;
    rroda.position.x = main.position.x;
    rroda.position.y = main.position.y - y/2 + 0.5*M + 0.025*M;
    rroda.position.z = M/2;

    // Parabrisa
    var w_geo = new THREE.PlaneGeometry(x, 2*h/3, 32);
    var w_mat = new THREE.MeshLambertMaterial({color:0x030303, side:THREE.DoubleSide});
    var w = new THREE.Mesh(w_geo, w_mat);
    w.rotation.x = Math.PI/2;
    w.position.set(main_1.position.x, main_1.position.y + y/3 + 0.025*M, 4*h/3 + 0.25*M);

    // Farol
    var f_geo = new THREE.PlaneGeometry(x/3, h/3, 32);
    var f_mat = new THREE.MeshLambertMaterial({color:0xDCDCDC, side:THREE.DoubleSide});
    var f = new THREE.Mesh(f_geo, f_mat);
    f.rotation.x = Math.PI/2;

    f1 = f.clone();
    f1.position.set(main.position.x - 0.5*M, main.position.y + y/2 + 0.025*M, h/2 + 0.25*M);

    f2 = f.clone();
    f2.position.set(main.position.x + 0.5*M, main.position.y + y/2 + 0.025*M, h/2 + 0.25*M);

    var carro = new THREE.Group();
    carro.add(main);
    carro.add(main_1);
    carro.add(roda);
    carro.add(rroda);
    carro.add(w);
    carro.add(f1);
    carro.add(f2);

    carro.scale.setScalar(0.8);

    return carro;
}
