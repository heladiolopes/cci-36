
			function init() {
				// manager
				function loadModel() {
					object.traverse( function ( child ) {
						if ( child.isMesh ) child.material.map = texture;
					} );
          object.rotation.set(-Math.PI/2.0,Math.PI/2.0,0);
          object.scale.set(0.05, 0.05, 0.05);
					object.position.set(0, 5.0, 0)
					scene.add( object );
				}
				var manager = new THREE.LoadingManager( loadModel );
				manager.onProgress = function ( item, loaded, total ) {
					console.log( item, loaded, total );
				};
				// texture
				var textureLoader = new THREE.TextureLoader( manager );
				var texture = textureLoader.load( 'models/chicken.jpg' );
				// model
				function onProgress( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
					}
				}
				function onError() {}
				var loader = new THREE.OBJLoader( manager );
				loader.load( 'models/10864_rotisserie_chicken_v2_L3.obj', function ( obj ) {
					object = obj;
				}, onProgress, onError );
			}
	init();
