import * as THREE from 'three';
// import { gsap } from '../gsap.min.js';
import { GLTFLoader } from '../GLTFLoader.js';
import { OrbitControls } from "../OrbitControls.js";
import { BufferGeometryUtils } from "../BufferGeometryUtils.js";














// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow map in the renderer
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optionally use soft shadows
document.getElementById('scene-container').appendChild(renderer.domElement);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Load textures
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('textures/Wood092_8K-PNG_Color.png');
const blanketTexture = textureLoader.load('textures/Fabric023_8K-JPG_Color.jpg');
const floorTexture = textureLoader.load('textures/WoodFloor043_16K-JPG_Color.jpg');
const carpetTexture = textureLoader.load('textures/Carpet004_8K-JPG_Color.jpg');
const wallTexture = textureLoader.load('textures/WoodSiding002_8K-JPG_Color.jpg');
const ceilingTexture = textureLoader.load('textures/Wood092_8K-PNG_Color.png');
const tvFrameTexture = textureLoader.load('textures/Metal036_8K-JPG_Color.jpg'); // Load texture for TV frame
const tvScreenTexture = textureLoader.load('https://picsum.photos/seed/picsum/400/300'); // Load placeholder image texture for TV screen
const fridgeTexture = textureLoader.load('textures/red.jpg');


// BEGIN SCENE BUILDING


// Create a group to hold the bed parts
const bedGroup = new THREE.Group();

// Function to create a bed
function createBed() {
    // Create bed frame (without base)
    const frameGeometry = new THREE.BoxGeometry(3, 0.2, 2);
    const frameMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });
    const bedFrame = new THREE.Mesh(frameGeometry, frameMaterial);
    bedFrame.position.y = 0.35;
    bedFrame.castShadow = true;
    bedFrame.receiveShadow = true;

    // Create headboard
    const headboardGeometry = new THREE.BoxGeometry(3, 1.5, 0.2);
    const headboardMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });
    const headboard = new THREE.Mesh(headboardGeometry, headboardMaterial);
    headboard.position.set(0, 1, -1.1); // Adjusted to be above the bed frame and behind the pillows
    headboard.castShadow = true;
    headboard.receiveShadow = true;

    // Create mattress
    const mattressGeometry = new THREE.BoxGeometry(3, 0.5, 2);
    const mattressMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
    mattress.position.y = 0.75;
    mattress.castShadow = true;
    mattress.receiveShadow = true;

    // Create blanket
    const blanketGeometry = new THREE.BoxGeometry(3, 0.1, 2);
    const blanketMaterial = new THREE.MeshStandardMaterial({ map: blanketTexture });
    const blanket = new THREE.Mesh(blanketGeometry, blanketMaterial);
    blanket.position.y = 1.05;
    blanket.castShadow = true;
    blanket.receiveShadow = true;

    // Create pillows
    const pillowGeometry = new THREE.BoxGeometry(1, 0.2, 0.5);
    const pillowMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const pillow1 = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow1.position.set(1, 1.15, -0.75);
    pillow1.castShadow = true;
    pillow1.receiveShadow = true;

    const pillow2 = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow2.position.set(-1, 1.15, -0.75);
    pillow2.castShadow = true;
    pillow2.receiveShadow = true;

    // Create legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32);
    const legMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });

    const leg1 = new THREE.Mesh(legGeometry, legMaterial);
    leg1.position.set(1.4, 0.25, 0.9);
    leg1.castShadow = true;
    leg1.receiveShadow = true;

    const leg2 = new THREE.Mesh(legGeometry, legMaterial);
    leg2.position.set(-1.4, 0.25, 0.9);
    leg2.castShadow = true;
    leg2.receiveShadow = true;

    const leg3 = new THREE.Mesh(legGeometry, legMaterial);
    leg3.position.set(1.4, 0.25, -0.9);
    leg3.castShadow = true;
    leg3.receiveShadow = true;

    const leg4 = new THREE.Mesh(legGeometry, legMaterial);
    leg4.position.set(-1.4, 0.25, -0.9);
    leg4.castShadow = true;
    leg4.receiveShadow = true;

    // Add all parts to the bed group
    bedGroup.add(bedFrame);
    bedGroup.add(mattress);
    bedGroup.add(blanket);
    bedGroup.add(pillow1);
    bedGroup.add(pillow2);
    bedGroup.add(leg1);
    bedGroup.add(leg2);
    bedGroup.add(leg3);
    bedGroup.add(leg4);
    bedGroup.add(headboard);

    // Rotate the bed by 90 degrees around the y-axis to align with the left wall
    bedGroup.rotation.y = Math.PI / 2;

    // Position the bed along the left wall and in the far corner
    bedGroup.position.set(-1.8, 0, 0);
    bedGroup.scale.set(0.8, 0.8, 0.8);
}

// Function to create the room
function createRoom() {
    const backWallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
    const leftWallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
    const rightWallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
    const ceilingMaterial = new THREE.MeshStandardMaterial({ map: ceilingTexture });
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });

    // Back wall
    const backWallGeometry = new THREE.BoxGeometry(6, 3, 0.1);
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(0, 1.5, -3);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left wall
    const leftWallGeometry = new THREE.BoxGeometry(0.1, 3, 6);
    const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
    leftWall.position.set(-3, 1.5, 0);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right wall
    const rightWallGeometry = new THREE.BoxGeometry(0.1, 3, 6);
    const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
    rightWall.position.set(3, 1.5, 0);
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Ceiling
    const ceilingGeometry = new THREE.BoxGeometry(6, 0.1, 6);
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.position.set(0, 3, 0);
    ceiling.castShadow = true;
    ceiling.receiveShadow = true;
    scene.add(ceiling);

    // Floor
    const floorGeometry = new THREE.BoxGeometry(6, 0.1, 6);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(0, 0, 0);
    floor.castShadow = true;
    floor.receiveShadow = true;
    scene.add(floor);

    // Create carpet
    const carpetGeometry = new THREE.BoxGeometry(2, 0.01, 3);
    const carpetMaterial = new THREE.MeshStandardMaterial({ map: carpetTexture });
    const carpet = new THREE.Mesh(carpetGeometry, carpetMaterial);
    carpet.position.set(0, 0.05, 0);
    carpet.castShadow = true;
    carpet.receiveShadow = true;
    scene.add(carpet);
}

// Function to create a long table with drawers
function createTable() {
    const tableGroup = new THREE.Group();

    // Create table top
    const tableTopGeometry = new THREE.BoxGeometry(5, 0.2, 1);
    const tableTopMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });
    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
    tableTop.position.y = 1;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;

    // Create drawers
    const drawerGeometry = new THREE.BoxGeometry(1, 0.5, 0.8);
    const drawerMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

    const drawer1 = new THREE.Mesh(drawerGeometry, drawerMaterial);
    drawer1.position.set(-2, 0.75, 0);
    drawer1.castShadow = true;
    drawer1.receiveShadow = true;

    const drawer2 = new THREE.Mesh(drawerGeometry, drawerMaterial);
    drawer2.position.set(0, 0.75, 0);
    drawer2.castShadow = true;
    drawer2.receiveShadow = true;

    const drawer3 = new THREE.Mesh(drawerGeometry, drawerMaterial);
    drawer3.position.set(2, 0.75, 0);
    drawer3.castShadow = true;
    drawer3.receiveShadow = true;

    // Add all parts to the table group
    tableGroup.add(tableTop);
    tableGroup.add(drawer1);
    tableGroup.add(drawer2);
    tableGroup.add(drawer3);

    // Position the table across the room
    tableGroup.position.set(2.5, -0.44, 0);
    tableGroup.rotation.y = Math.PI / 2;

    // Add table group to the scene
    scene.add(tableGroup);




    // this was an attempt to make a button in the scene that zooms into the tv screen when clicked
    const buttonGeometry = new THREE.PlaneGeometry(1, 0.3);
    const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0.5, transparent: true });
    const callToActionButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    callToActionButton.position.set(0, 1, 0.07); // Slightly in front of the clickable plane

    tableGroup.add(callToActionButton);

    // Make the button appear and disappear
    function toggleButtonVisibility() {
        callToActionButton.visible = !callToActionButton.visible;
        setTimeout(toggleButtonVisibility, Math.random() * 2000 + 1000); // Toggle visibility randomly between 1-3 seconds
    }
    toggleButtonVisibility();
}

// Create the bed, room, and table
createBed();
createRoom();
createTable();

// Add the bed group to the scene
scene.add(bedGroup);

// Position the camera
camera.position.z = 8;

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

// Raycaster and mouse vector for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Event listener for mouse clicks
function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the ray
    const intersects = raycaster.intersectObjects(scene.children, true);

    // Check if any object is intersected and if it has userData.clickable
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.userData.clickable) {
            // If the intersected object is the fridge door, toggle its state
            if (intersects[i].object === fridgeDoor) {
                onFridgeDoorClick();
                break;
            }
        }
    }
}

// Event listener for mouse moves
function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the ray
    const intersects = raycaster.intersectObjects(scene.children, true);

    // Check if any object is intersected and if it has userData.clickable
    let isHovering = false;
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.userData.clickable) {
            isHovering = true;
            break;
        }
    }

    // Change cursor style
    renderer.domElement.style.cursor = isHovering ? 'pointer' : 'auto';
}

window.addEventListener('click', onMouseClick, false);
window.addEventListener('mousemove', onMouseMove, false);

// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Update the controls
    controls.update();

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Function to create a mini fridge next to the table
function createMiniFridge() {
    const fridgeGroup = new THREE.Group();

    // Create fridge exterior panels (thicker and hollow)
    const exteriorMaterial = new THREE.MeshStandardMaterial({ map: fridgeTexture }); // Dark red color
    const interiorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // White interior color

    const exteriorLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.5, 1), exteriorMaterial);
    exteriorLeft.position.set(-0.53, 0, 0);
    exteriorLeft.castShadow = true;
    exteriorLeft.receiveShadow = true;

    const interiorLeft = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.4, 0.9), interiorMaterial);
    interiorLeft.position.set(-0.51, 0, 0);
    interiorLeft.castShadow = true;
    interiorLeft.receiveShadow = true;

    const exteriorRight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.5, 1), exteriorMaterial);
    exteriorRight.position.set(0.55, 0, 0);
    exteriorRight.castShadow = true;
    exteriorRight.receiveShadow = true;
    
    const interiorRight = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.4, 0.9), interiorMaterial);
    interiorRight.position.set(0.52, 0, 0);
    interiorRight.castShadow = true;
    interiorRight.receiveShadow = true;

    const exteriorTop = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 1), exteriorMaterial);
    exteriorTop.position.set(0, 0.75, 0);
    exteriorTop.castShadow = true;
    exteriorTop.receiveShadow = true;
    
    const interiorTop = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.07, 0.9), interiorMaterial);
    interiorTop.position.set(0, 0.72, 0);
    interiorTop.castShadow = true;
    interiorTop.receiveShadow = true;

    const exteriorBottom = new THREE.Mesh(new THREE.BoxGeometry(1, 0.1, 1), exteriorMaterial);
    exteriorBottom.position.set(0, -0.8, 0);
    exteriorBottom.castShadow = true;
    exteriorBottom.receiveShadow = true;
    
    const interiorBottom = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.07, 0.9), interiorMaterial);
    interiorBottom.position.set(0, -0.77, 0);
    interiorBottom.castShadow = true;
    interiorBottom.receiveShadow = true;

    const exteriorBack = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.07), exteriorMaterial);
    exteriorBack.position.set(0, 0, -0.51);
    exteriorBack.castShadow = true;
    exteriorBack.receiveShadow = true;

    
    const interiorBack = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.03), interiorMaterial);
    interiorBack.position.set(0, 0, -0.45);
    interiorBack.castShadow = true;
    interiorBack.receiveShadow = true;

    // Create fridge door (thicker and interactive)
    const fridgeDoorGeometry = new THREE.BoxGeometry(1, 1.5, 0.2); // Thicker door
    const fridgeDoorMaterial = new THREE.MeshStandardMaterial({ map: fridgeTexture });
    const fridgeDoor = new THREE.Mesh(fridgeDoorGeometry, fridgeDoorMaterial);
    fridgeDoor.userData.clickable = true; // Make the door interactive
    fridgeDoor.castShadow = true;
    fridgeDoor.receiveShadow = true;

    // Adjust pivot point for the fridge door
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-0.5, 0, 0.45); // Pivot at the left edge of the door
    doorPivot.add(fridgeDoor);
    fridgeDoor.position.set(0.5, 0, 0); // Adjust door position within the pivot

    // Add fridge body, door pivot, and exterior panels to the fridge group
    fridgeGroup.add(exteriorLeft);
    fridgeGroup.add(exteriorRight);
    fridgeGroup.add(exteriorTop);
    fridgeGroup.add(exteriorBottom);
    fridgeGroup.add(exteriorBack);
    fridgeGroup.add(interiorLeft);
    fridgeGroup.add(interiorRight);
    fridgeGroup.add(interiorTop);
    fridgeGroup.add(interiorBottom);
    fridgeGroup.add(interiorBack);
    fridgeGroup.add(doorPivot);

    // Create an intense light inside the fridge
    const fridgeLight = new THREE.SpotLight(0xffffff, 1, 2, Math.PI / 4, 1, 2);
    fridgeLight.position.set(0, 0.80, -0.3); // Adjust position to fit within the fridge
    fridgeLight.target.position.set(0, -0.5, 0); // Adjust target position
    fridgeLight.castShadow = true;
    fridgeLight.visible = false; // Initially turned off
    fridgeLight.intensity = 12;
    fridgeLight.spread = 12;
    fridgeGroup.add(fridgeLight);
    fridgeGroup.add(fridgeLight.target);

    const fridgeLightB = new THREE.SpotLight(0xffffff, 1, 2, Math.PI / 4, 1, 2);
    fridgeLightB.position.set(0.6, 0.80, -0.3); // Adjust position to fit within the fridge
    fridgeLightB.target.position.set(0, -0.5, 0); // Adjust target position
    fridgeLightB.castShadow = true;
    fridgeLightB.visible = false; // Initially turned off
    fridgeLightB.intensity = 12;
    fridgeLightB.spread = 12;
    fridgeGroup.add(fridgeLightB);
    fridgeGroup.add(fridgeLightB.target);

    // Create and position the edge cylinders for curved edges
    const edgeMaterial = new THREE.MeshStandardMaterial({ map: fridgeTexture });
    const edgeRadius = 0.05;
    const edgeHeight = 1;

    // Create edge cylinders for the fridge body
    const edgeGeometry = new THREE.CylinderGeometry(edgeRadius, edgeRadius, edgeHeight, 32);
    const edge1 = new THREE.Mesh(edgeGeometry, edgeMaterial);
    edge1.position.set(0, 0.75, 0.5);
    edge1.rotation.z = Math.PI / 2;
    edge1.castShadow = true;
    edge1.receiveShadow = true;

    const edge2 = new THREE.Mesh(edgeGeometry, edgeMaterial);
    edge2.position.set(0, 0.75, -0.5);
    edge2.rotation.z = Math.PI / 2;
    edge2.castShadow = true;
    edge2.receiveShadow = true;

    const edge3 = new THREE.Mesh(edgeGeometry, edgeMaterial);
    edge3.position.set(-0.53, 0.752, 0);
    edge3.rotation.x = Math.PI / 2;
    edge3.castShadow = true;
    edge3.receiveShadow = true;

    const edge4 = new THREE.Mesh(edgeGeometry, edgeMaterial);
    edge4.position.set(0.55, 0.75, 0);
    edge4.rotation.x = Math.PI / 2;
    edge4.castShadow = true;
    edge4.receiveShadow = true;

    // Add edge cylinders to the fridge group
    fridgeGroup.add(edge1);
    fridgeGroup.add(edge2);
    fridgeGroup.add(edge3);
    fridgeGroup.add(edge4);

    // Position the fridge next to the table
    fridgeGroup.position.set(-2.3, 0.9, 2.3);

    // Add the fridge group to the scene
    scene.add(fridgeGroup);
    fridgeGroup.rotation.y = -Math.PI / -2;

    // Variable to track door state
    let isDoorOpen = false;

    // Function to handle fridge door click
    function onFridgeDoorClick() {
        if (isDoorOpen) {
            // Close the door and turn off the light
            gsap.to(doorPivot.rotation, { duration: 1, y: 0 });
            fridgeLight.visible = false;
            fridgeLightB.visible = false;
        } else {
            // Open the door and turn on the light
            gsap.to(doorPivot.rotation, { duration: 1, y: -Math.PI / 2 });
            fridgeLight.visible = true;
            fridgeLightB.visible = true;
            fridgeLight.intensity = 5;
            fridgeLightB.intensity = 5;
        }
        isDoorOpen = !isDoorOpen;
    }

    // Raycaster and mouse vector for detecting clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Event listener for mouse clicks
    function onMouseClick(event) {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the ray
        const intersects = raycaster.intersectObjects(scene.children, true);

        // Check if any object is intersected and if it has userData.clickable
        for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.userData.clickable) {
                // If the intersected object is the fridge door, toggle its state
                if (intersects[i].object === fridgeDoor) {
                    onFridgeDoorClick();
                    break;
                }
            }
        }
    }

    window.addEventListener('click', onMouseClick, false);
}

// Create the mini fridge
createMiniFridge();


 

// commenting this out because it was causing issues for some reason



/// Initialize the GLTFLoaders
const deskLoader = new GLTFLoader();
const tvLoader = new GLTFLoader();

// Path to the models (make sure the paths are correct)
const deskModelPath = 'models/Desk.glb'; // or .gltf
const tvModelPath = 'models/TV.glb'; // or .gltf

// Load the desk model
deskLoader.load(
    deskModelPath,
    function (gltf) {
        // Add the loaded model to the scene
        const model = gltf.scene;
        model.scale.set(1, 1, 1); // Adjust the scale if necessary
        model.position.set(6, 0, -3.1); // Adjust the position if necessary
        model.rotation.y = Math.PI / 2;
        model.castShadow = true;
        model.receiveShadow = true;
        scene.add(model);
    },
    function (xhr) {
        // Called while loading is progressing
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        // Called when loading has errors
        console.error('An error happened', error);
    }
);

// Load the TV model
tvLoader.load(
    tvModelPath,
    function (gltf) {
        const tvModel = gltf.scene;
        tvModel.position.set(2.5, 0.85, 0);
        tvModel.castShadow = true;
        tvModel.receiveShadow = true;
        tvModel.scale.set(1, 1, 1);
        scene.add(tvModel);
        tvModel.traverse(function (object) {
            if (object.isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });
    },
    undefined,
    function (error) {
        console.error('Error loading the TV model:', error);
    }
);

// Start the animation loop
function animation() {
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
}
animation();








// END SCENE BUILDING





// Function to create a 3D axis helper
function createAxisHelper() {
    const axisHelper = new THREE.AxesHelper(5); // 5 units length for each axis
    scene.add(axisHelper);
}

// Create the 3D axis helper
createAxisHelper();

// Add ambient light from the TV screen
const tvLight = new THREE.PointLight(0x00ffff, 1, 12);
tvLight.position.set(2.4, 1.6, 0.1); // Position near the TV screen
scene.add(tvLight);

