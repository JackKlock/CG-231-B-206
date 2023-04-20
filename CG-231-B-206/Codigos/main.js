
function init() {

    // Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    //Variables globales
    var R = 5; //Radio de la esfera

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

    var geometry= new THREE.SphereGeometry(R,32,16);
    var material = new THREE.MeshPhongMaterial( { color: 0xFF2626 } );
    var esferag = new THREE.Mesh(geometry, material);;

    //Posicion en el origen
    vt=[0,0,0];

    //Translacion en [2*lado, 2*lado, 0]
    esferag.applyMatrix(Translation(vt));

    //Escalado a 1.5 en x,y,z
    RealScale(esferag,vt,[Sx,Sy,Sz]);

    //Rotacion de 45 grados en x
 /* RealXRotate(fig[0],vt,45);

    //Rotacion de 45 grados en y
    RealYRotate(fig[0],vt,45);
    
    //Rotacion de 45 grados en z
    RealZRotate(fig[0],vt,60); */


    // En el documento HTML
    document.body.appendChild(renderer.domElement);

    // Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);	
    scene.add(arrowY);	
    scene.add(arrowZ);

    scene.add(esferag[0]);

    renderer.render(scene, camera);
}

init();  // otra forma: window.onload = init;
