const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const toolSelect = document.getElementById('tool');
const clearBtn = document.getElementById('clearBtn');
const colorPalette = document.getElementById('colorPalette');
const colorOptions = document.querySelectorAll('.color');

let drawing = false;
let currentTool = 'brush';
let currentColor = 'black';

canvas.addEventListener('mousedown', (e) => {
drawing = true;
draw(e);
});

canvas.addEventListener('mouseup', () => {
drawing = false;    
});

//done by Levi Joel

canvas.addEventListener('mouseout', () => {
drawing = false;    
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('click', fillIfNeeded);

toolSelect.addEventListener('change', () => {
currentTool = toolSelect.value; 
updatePaletteVisibility();    
});

clearBtn.addEventListener('click', () => {
ctx.clearRect(0, 0, canvas.width, canvas.height);    
});

colorOptions.forEach(colorDiv => {
colorDiv.addEventListener('click', () => {
currentColor = colorDiv.getAttribute('data-color');    
});
});

function updatePaletteVisibility() {
if (currentTool === 'brush' || currentTool === 'fill') {
colorPalette.classList.remove('hidden');
} else {
colorPalette.classList.add('hidden');    
}    
}

function draw(e) {
if (!drawing) return;

const x = e.offsetX;
const y = e.offsetY;

if (currentTool === 'brush') {
ctx.fillStyle = currentColor;
ctx.fillRect(x, y, 5, 5);
} else if (currentTool === 'eraser') {
ctx.clearRect(x, y, 10, 10);
}
}

function fillIfNeeded(e) {
if (currentTool === 'fill') {
ctx.fillStyle = currentColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);    
}
}

updatePaletteVisibility();