let startX, startY;

document.querySelector('.newShape').addEventListener('click', () => {//NEW SHAPE BUTTON waiting for click
    const shapes = ['circle', 'square', 'triangle'];
    const pick = shapes[Math.floor(Math.random() * 3)];

    const shape = document.createElement('div');
    shape.classList.add(pick);//<add class of what was picked
    shape.style.position = 'fixed';
    document.body.appendChild(shape);

    shape.addEventListener('mousedown', mouseDown);
});


//https://www.google.com/search?q=how+to+make+things+draggable+javascript+for+html&rlz=1C1VDKB_enUS1123US1123&oq=how+to+make+things+draggable+javascript+for+html&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRigATIHCAQQIRigATIHCAUQIRirAjIHCAYQIRirAjIHCAcQIRifBdIBCDkxMjVqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:7384741b,vid:ymDjvycjgUM,st:0 - click and drag vid
function mouseDown(e) {
    const shape = e.target;
    //e.clientX/Y - location of cursor
    startX = e.clientX - shape.getBoundingClientRect().left;//calc how far in shape has been clicked
    startY = e.clientY - shape.getBoundingClientRect().top;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    function mouseMove(e) {
        shape.style.left = (e.clientX - startX) + 'px';
        shape.style.top = (e.clientY - startY) + 'px';
    }

    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);

        //trash listener
    const trash = document.querySelector('.trash');
    const trashBox = trash.getBoundingClientRect();
        if (
            e.clientX > trashBox.left &&
            e.clientX < trashBox.right &&
            e.clientY > trashBox.top &&
            e.clientY < trashBox.bottom
        ) {
            shape.remove();
    }}
}



