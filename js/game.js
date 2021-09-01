let buttonStart = document.getElementById("button-start"); 

let cvs = document.getElementById("canvas"); // Элемент canvas
let ctx = cvs.getContext("2d"); // Вид игры

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/bird.png"
bg.src = "img/bg.png"
fg.src = "img/fg.png"
pipeUp.src = "img/pipeUp.png"
pipeBottom.src = "img/pipeBottom.png"

// Звуковые файлы
let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";


let gap = 105; // Отступ между трубами

// При нажатии на какую-либо кнопку
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        yPos -= 35;
        fly.play();
    }
    else if (e.keyCode == '40') {
        yPos += 35;
        fly.play();
    }
}

// document.addEventListener("keydown", moveUp);

// function moveUp(){
//     yPos -= 35;
//     fly.play();
// }


// Создание блоков
let pipe = [];

pipe[0] = { // Координаты нового блока
    x: cvs.width,
    y: 0,
}

// Позиция птички
let xPos = 10; 
let yPos = 150;
let grav = 3.5; // Скорость падения птицы
let score = 0; 

function draw(){
    // Отрисовка картинок
    ctx.drawImage(bg, 0, 0);

    
    for(let i = 0; i < pipe.length; i++){
        // Отрисовка новых блоков
        console.log(pipe[i].x);
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        // Передвижение блоков по х
        pipe[i].x--; //?
        
        // Внесение новых блоков в массив блоков
        if(pipe[i].x == 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
            });
        }

        // Отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width 
            && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) 
                || yPos + bird.height >= cvs.height - fg.height){
                    location.reload(); // Перезагрузка страницы
                } 
        

        // Начисление очков
        if(pipe[i].x == 5){
            score++;
            score_audio.play();
        }
    }
    

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, xPos, yPos);

    // Поведение птицы
    yPos += 1;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, 25);

    requestAnimationFrame(draw);
}

buttonStart.onclick = function(){
    draw();
}

// pipeBottom.onload = draw;
