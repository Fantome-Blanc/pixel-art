const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

let largeur = canvas.width / 32;
let hauteur = canvas.height / 32;
let colorSet = "#000000";

// Sélectionnez toutes les div avec la classe "color"
const colorElements = document.querySelectorAll('.color');

// Ajoutez un gestionnaire d'événements à chaque élément de couleur
colorElements.forEach(element => {
    element.addEventListener('click', function() {
        // Obtenez la couleur du fond de la div cliquée
        const backgroundColor = element.style.backgroundColor;

        // Mettez à jour la letiable colorSet
        colorSet = backgroundColor;
    });
});

effacerImage();
dessinerCercle();

function dessinerCaseCercle(x,y){
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(largeur * x, hauteur * y, largeur, hauteur);
};

function dessinerCase(x, y){
    ctx.fillStyle = colorSet;
    ctx.fillRect(largeur * x, hauteur * y, largeur, hauteur);
    dessinerCercle();

    //  Activer ou desactiver la grille 
    //  dessinerGrille();
}

function dessinerGrille(){
    ctx.strokeStyle = 'rgb(220, 220, 220)';

    for(let x=0 ; x<33 ; x++){
        ctx.beginPath();
        ctx.moveTo(x*largeur, 0);   // Point de départ
        ctx.lineTo(x*largeur, canvas.width); // Point d'arrivée
        ctx.stroke();       // Afficher la ligne
    }

    for(let y=0 ; y<33 ; y++){
        ctx.beginPath();
        ctx.moveTo(0, y*hauteur);   // Point de départ
        ctx.lineTo(canvas.height, y*hauteur); // Point d'arrivée
        ctx.stroke();       // Afficher la ligne
    }
}

let isMouseDown = false;

canvas.addEventListener('mousedown', function(event) {
    isMouseDown = true;
    handleDrawing(event);
});

canvas.addEventListener('mousemove', function(event) {
    if (isMouseDown) {
        handleDrawing(event);
    }
});

canvas.addEventListener('mouseup', function() {
    isMouseDown = false;
});

function handleDrawing(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Assurer que les coordonnées restent entre 0 et 31
    const clampedX = Math.floor(mouseX / largeur);
    const clampedY = Math.floor(mouseY / hauteur);

    dessinerCase(clampedX, clampedY);
}

// Fonction pour télécharger le canvas
function downloadCanvas() {
    // Créer une URL de données à partir du contenu du canvas
    let dataURL = canvas.toDataURL('image/png');

    // Créer un lien de téléchargement
    let downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'canvas_image.png';

    // Ajouter le lien au document
    document.body.appendChild(downloadLink);

    // Simuler un clic sur le lien pour déclencher le téléchargement
    downloadLink.click();

    // Supprimer le lien du document
    document.body.removeChild(downloadLink);
}

function dessinerCercle(){
    for(let x = 0; x < 32; x++) {
        for(let y = 0; y < 32; y++) {
            // Calcul des distances par rapport au centre décalé (-16, 16)
            let distanceVertical = x - 15.5;
            let distanceHorizontal = 15.5 - y;
            let distance = Math.pow(distanceVertical, 2) + Math.pow(distanceHorizontal, 2);
            
            // Calcul de la distance finale en prenant la racine carrée
            let distanceFinal = Math.sqrt(distance);

            // Vérification si la distance est inférieure à 1 (ou une autre valeur selon vos besoins)
            if(distanceFinal > 16) {
                dessinerCaseCercle(x, y);
            }
        }
    }
}

function effacerImage(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    dessinerCercle();

    //  Activer ou desactiver la grille 
    //  dessinerGrille();
}