
function init() {

    // Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    //Variables globales
    var R = 10; //Radio de la esfera

    //Factores de escala
    var Sz = 3; //Factor de escala en z
    var Sy = 0.5; //Factor de escala en y
    var Sx = Sy; //Factor de escala en x

    //Angulos de rotacion
    var Rx; //Angulo de rotacion en x en radianes
    var Ry; //Angulo de rotacion en y en radianes
    var Rz; //Angulo de rotacion en z en radianes
    
    //Dimensiones de translacion 
    var Tx; //Dimension de translacion en x
    var Ty; //Dimension de translacion en y
    var Tz; //Dimension de translacion en z


    var size = 700;
    var arrowSize = 100;
    var divisions = 20;
    var origin = new THREE.Vector3( 0, 0, 0 );
    var x = new THREE.Vector3( 1, 0, 0 );
    var y = new THREE.Vector3( 0, 1, 0 );
    var z = new THREE.Vector3( 0, 0, 1 );
    var color2 = new THREE.Color( 0x333333 );  /// 0x333333
    var colorR = new THREE.Color( 0xAA0000 );
    var colorG = new THREE.Color( 0x00AA00 );
    var colorB = new THREE.Color( 0x0000AA );

    //Crear la Grilla
    var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

    //Flechas
    var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
    var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
    var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
        
    //Cámara
    camera.position.x = 000;
    camera.position.y = 100;
    camera.position.z = 600;
    camera.lookAt(scene.position);

    // Colores
    var   color=[{color:0xFF2626},{color:0x7EFF0C},{color:0x37FFC9}]; //Colores utilizados en el material
    var material=[new THREE.MeshStandardMaterial(color[0]),new THREE.MeshLambertMaterial(color[1]),new THREE.MeshPhongMaterial(color[2])];

    //Lado de la base de la piramide
    lado=40; 

    //Altura de la piramide
    h=50; 
/*
    v1=[0,0,0];
    v2=[lado,0,0];
    v3=[lado,0,lado];
    v4=[0,0,lado];
    v5=[lado/2,h,lado/2];

    vertices=[v1,v2,v3,v4,v5,v1,v4,v3,v5,v2]; */

    vertices2 = [v1];

    geom=Geometria(vertices);

    geom2= new THREE.SphereGeometry([R,R,R]);


    //[v1,v2,v3,v4,v5]= [[0,0,0],[lado,0,0],[lado,0,lado],[0,0,lado], [lado/2,h,lado/2]]
    //materiales para las piramides

    material=[];
    for(i=0;i<2;i++)
        material.push(new THREE.PointsMaterial(color[i]));


    //Figuras paras las piramides

    fig=[];
    vt=[2*lado,2*lado,0];
    fig.push(new THREE.Line(geom,material[0]));
    fig.push(new THREE.Mesh(geom2,material[1]));

    //Translacion en [2*lado, 2*lado, 0]
    fig[0].applyMatrix(Traslation(vt));

    //Escalado a 1.5 en x,y,z
    RealScale(fig[0],vt,[1.5,1.5,1.5]);

    //Rotacion de 45 grados en x
    RealXRotate(fig[0],vt,45);

    //Rotacion de 45 grados en y
    RealYRotate(fig[0],vt,45);
    
    //Rotacion de 45 grados en z
    RealZRotate(fig[0],vt,60);
    
    // En el documento HTML
    document.body.appendChild(renderer.domElement);

    // Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);	
    scene.add(arrowY);	
    scene.add(arrowZ);

    for (let i=0; i<2; i++) {
        scene.add( fig[i] ); //Agregar Esfera
    }

    fig[1].position.x = 0;
    fig[1].position.y = 0;
    fig[1].position.z = 0;

    renderer.render(scene, camera);
}

init();  // otra forma: window.onload = init;
