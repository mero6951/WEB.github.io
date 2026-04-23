let startX, startY;
let count = 0;



document.querySelector('.newShape').addEventListener('click', () => {//New shape button  listener
    //const shapes = ['square', 'square', 'square'];
    //const pick = shapes[Math.floor(Math.random() * 3)];

    const options = ['square', 'square1', 'square2', /*'triangle', 'circle'*/];
    //const pick = options[count];
    const pick = options[Math.floor(Math.random() * options.length)];


    /*  -equaly rotate through all
    count++; //rotate through all 3
    //console.log(count, pick);
    if (count == 3){
    count = 0;
    } */

    const shape = document.createElement('div');
    shape.classList.add(pick);
    shape.style.position = 'fixed';

    if (pick !== 'triangle' && pick !== 'circle') {
        const size = Math.floor(Math.random() * 21) + 85; // 45-135px
        shape.style.height = size + 'px';
        shape.style.width = size + 'px';
    }
    
    shape.style.left = '185px'; 
    shape.style.top = '280px';  

document.body.appendChild(shape);
shape.addEventListener('mousedown', mouseDown);
});


//https://www.google.com/search?q=how+to+make+things+draggable+javascript+for+html&rlz=1C1VDKB_enUS1123US1123&oq=how+to+make+things+draggable+javascript+for+html&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRigATIHCAQQIRigATIHCAUQIRirAjIHCAYQIRirAjIHCAcQIRifBdIBCDkxMjVqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:7384741b,vid:ymDjvycjgUM,st:0 - click and drag vid
function mouseDown(a){
    const shape = a.target;
    //a.clientX/Y - location of cursor
    startX = a.clientX - shape.getBoundingClientRect().left;//calc how far in shape has been clicked
    startY = a.clientY - shape.getBoundingClientRect().top;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    function mouseMove(a){
        shape.style.left = (a.clientX - startX) + 'px';
        shape.style.top = (a.clientY - startY) + 'px';
         calculateCoverage();
    }
    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);

       /* //trash listener
    const trash = document.querySelector('.trash');
    const trashBox = trash.getBoundingClientRect();
        if (a.clientX > trashBox.left && a.clientX < trashBox.right && a.clientY > trashBox.top && a.clientY < trashBox.bottom) {
            shape.remove();

    }
     */       
    }
}

function calculateCoverage() {
    const box = document.querySelector('.box');
    const boxRect = box.getBoundingClientRect();
    const boxArea = boxRect.width * boxRect.height;

    let coveredArea = 0;

    document.querySelectorAll('.square, .square1, .square2, .triangle, .circle').forEach(shape => {
        const shapeRect = shape.getBoundingClientRect();
        const overlapLeft = Math.max(shapeRect.left, boxRect.left);
        const overlapRight = Math.min(shapeRect.right, boxRect.right);
        const overlapTop = Math.max(shapeRect.top, boxRect.top);
        const overlapBottom = Math.min(shapeRect.bottom, boxRect.bottom);
        const overlapWidth = overlapRight - overlapLeft;
        const overlapHeight = overlapBottom - overlapTop;


    if (overlapWidth > 0 && overlapHeight > 0) {
        coveredArea += overlapWidth * overlapHeight;
        }
    });

let percent = Math.min(Math.round((coveredArea / boxArea) * 100), 100);
percent = 100 - percent; 
document.querySelector('.title').textContent = 'Volume: ' + percent + '%';
return percent;
}


document.querySelector('.submit').addEventListener('click', () => {
    const finalVolume = calculateCoverage();
   
    document.querySelectorAll('.square, .square1, .square2, .triangle, .circle').forEach(
        shape =>{
            shape.remove();
        }
    )

    document.querySelector('.greyOut').style.display = 'flex';
    document.querySelector('.final').textContent = 'Your volume has been set at: ' + finalVolume + '%';

    document.querySelector('#closeBtn').addEventListener('click', () => {
        document.querySelector('.greyOut').style.display = 'none';
    });


    calculateCoverage();
});
