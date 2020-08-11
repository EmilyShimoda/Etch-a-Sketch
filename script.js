/*CONTAINER*/
const container = document.getElementById("container");
const containerWidth = container.clientWidth;
const containerHeigth = container.clientHeight;
/*BUTTONS*/
const resize = document.getElementById("resize");
const clear = document.getElementById("clear");
const random = document.getElementById("random");
const newColor = document.getElementById("newColor");

let side = 16, randomize = false;

createGrid();
eventListeners();

function getItems() {
    return document.querySelectorAll('.grid');
}

function color() {
     return document.getElementById("newColor").value;
}

function createGrid()
{
    for(let i = 0; i < side*side; i++) {
        var gridElement = document.createElement('div');
        gridElement.setAttribute('style', `border: 1px solid black; width: ${(containerWidth/side) - 2}px; height: ${(containerHeigth/side) - 2}px;`);
        gridElement.classList.add('grid');
        container.appendChild(gridElement);
    }
}

function eventListeners() {
    getItems().forEach(grid => grid.addEventListener('mouseover', BGcolor));
    resize.addEventListener('click', resizeGrid);
    clear.addEventListener('click', clearGrid);
    random.addEventListener('click', isRandom);
    newColor.addEventListener('click', deRandomize);
}

function isRandom () {
    randomize = true;
    clearGrid();
}

function deRandomize () {
    clearGrid();
    randomize = false; 
}
function BGcolor (e) {
    if(randomize) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
        return;
    }
    e.target.style.backgroundColor = color();
}

function clearGrid() {
    getItems().forEach(grid => grid.style.setProperty('background-color', 'white'));
}

function removeGrid() {
    let gridItem = getItems();
    for (let i = 0; i < side*side; i++) {
        container.removeChild(gridItem[i]);
    }
}

function resizeGrid(){
    removeGrid();
    side = parseInt(prompt("Set the number of squares per side between 1 and 100"));
    if(side <= 0 || side > 100 || isNaN(side)) {resizeGrid();}
    createGrid();
    eventListeners();
}

