//Defining---------------------------------------------------------------------
let canvas = document.querySelector('#main');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let size = document.querySelector('#size');
let context = canvas.getContext('2d');
let sv = document.querySelector('save');
let name = document.querySelector('#nm');
let canvasName = size;

let md = false;
canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', toggledraw);
canvas.addEventListener('mouseout', toggledraw);
canvas.addEventListener('resize', resize, false);
canvas.addEventListener('mousemove', _ =>{
    let mousePos = getMousePos (canvas, _);
    let posx = mousePos.x;
    let posy = mousePos.y;
    draw(canvas, posx, posy);
});
context.lineWidth = 12;
size.addEventListener("input", _ =>{
        context.lineWidth = size.innerText;
    }
)
//----------------------------------------------------------------------------------
context.beginPath();
context.rect(0, 0, 2000, 2000);
context.fillStyle = "White";
context.fill();
setColor("Black");
//Canvas Events------------------------------------------------------------
function resize(){
    context.canvas.width = window.innderWidth;
    context.canvas.height = window.innerHeight;
}
function down(){
    context.beginPath();
    md = true;
}

function toggledraw(){
    md = false;
}

function getMousePos(canvas, _){
    let rect = canvas.getBoundingClientRect();
    return {
        x: _.clientX - rect.left,
        y: _.clientY - rect.top,
    }
}

function draw(canvas, posx, posy){
    if(md){
        //context.moveTo(posx, posy);
        context.lineTo(posx, posy);
        context.stroke();
    }
}
function go(l){
    window.location.replace(l);
}
//---------------------------------------------------------------------------
//--Tools-------------------------------------------------------------
size.onclick = e =>{ size.innerText = " "}
name.onclick = e =>{name.innerText = " "}

name.onkeypress = _ =>{if(_.key === 'Enter'){return false;}}

function cls(){
    console.log('Cleared!');
    location.reload();
}

function sve(){
    localStorage.setItem("canvas", canvas.toDataURL());
}

function lod(){
    let dataURL = localStorage.getItem("canvas");
    let img = new Image;
    img.src = dataURL;
    img.onload = function () {
    context.drawImage(img, 0, 0);
    };
}

function dow(){
    image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = name.innerText + ".png";
    link.href = image;
    link.click();
}

function setColor(c){context.strokeStyle = c;}
//-------------------------------------------------------------------------