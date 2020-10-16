//toplines
const countLines = 7;
let topLines = document.getElementById('toplines');
let str = '';
let coordinate = 0;
let linesArr = [];
let checkWindow;

const winWidth = window.outerWidth;
console.log(winWidth);

(winWidth > 600) ? checkWindow = 200: checkWindow = 40;
console.log(winWidth);
console.log(checkWindow);
startPoint = -checkWindow;
lastCoord = checkWindow;
console.log(startPoint);

// let startPoint = -200;
// let lastCoord = 200;





function renderLines() {
    console.log('start1');
    str = '';
    topLines.innerHTML = '';
    startPoint = -checkWindow;
    for (let i = 1; i <= countLines; i++, startPoint = startPoint + checkWindow) {
        str = str + `<div class="line_black" id="line${i}" style="left: ${startPoint}px"></div>`;
        linesArr.push(`line${i}`);
    }
    topLines.insertAdjacentHTML('afterbegin', str);
    let time = setInterval(moveLines, 2000);

    function moveLines() {
        for (let i = 0; i < countLines; i++) {

            let line1 = document.getElementById('line1');
            let left1 = Number.parseInt((line1.style.left).replace(/\D/gm, ''));
            let line2 = document.getElementById('line2');
            let left2 = Number.parseInt((line2.style.left).replace(/\D/gm, ''));
            let line3 = document.getElementById('line3');
            let left3 = Number.parseInt((line3.style.left).replace(/\D/gm, ''));
            let line4 = document.getElementById('line4');
            let left4 = Number.parseInt((line4.style.left).replace(/\D/gm, ''));
            let line5 = document.getElementById('line5');
            let left5 = Number.parseInt((line5.style.left).replace(/\D/gm, ''));
            let line6 = document.getElementById('line6');
            let left6 = Number.parseInt((line6.style.left).replace(/\D/gm, ''));
            let line7 = document.getElementById('line7');
            let left7 = Number.parseInt((line7.style.left).replace(/\D/gm, ''));

            if (coordinate == lastCoord) {
                clearInterval(time)
                coordinate = 0;
                renderLines();
            } else {
                coordinate++;
                for (let i = 1; i <= countLines; i++) {
                    line1.style.left = (left1 + 1) + 'px';
                    line2.style.left = (left2 + 1) + 'px';
                    line3.style.left = (left3 + 1) + 'px';
                    line4.style.left = (left4 + 1) + 'px';
                    line5.style.left = (left5 + 1) + 'px';
                    line6.style.left = (left6 + 1) + 'px';
                    line7.style.left = (left7 + 1) + 'px';
                }

            }
        }

    }

}
renderLines();

/*
class Jug {
    constructor(widthLine = 100, countLines = 6) {
        this._init();
        this.topLines = document.getElementById('toplines');
        this.widthLine = widthLine;
        this.countLines = countLines;
        this.time;
    }
    _init() {
        this.renderLines();
    }

    lines() {
        this.topLines = document.getElementById('toplines');

    }
    renderLines() {
        let startPoint = -200;
        let topLines = document.getElementById('toplines');
        let str = '';


        for (let i = 1; i <= this.countLines; i++, startPoint = startPoint + 200) {
            str = str + `<div class="line_black" id="line${i}" style="left: ${startPoint}px"></div>`;
        }

        topLines.insertAdjacentHTML('afterbegin', str);

        this.time = setInterval(this.moveLines, 100);
        setTimeout(this.moveLines, 10);
        this.moveLines();
    }

    moveLines() {
        console.log('run1');

        let line1 = document.getElementById('line1');
        let left1 = Number.parseInt((line1.style.left).replace(/\D/gm, ''));
        let line2 = document.getElementById('line2');
        let left2 = Number.parseInt((line2.style.left).replace(/\D/gm, ''));
        let line3 = document.getElementById('line3');
        let left3 = Number.parseInt((line3.style.left).replace(/\D/gm, ''));
        let line4 = document.getElementById('line4');
        let left4 = Number.parseInt((line4.style.left).replace(/\D/gm, ''));
        let line5 = document.getElementById('line5');
        let left5 = Number.parseInt((line5.style.left).replace(/\D/gm, ''));
        let line6 = document.getElementById('line6');
        let left6 = Number.parseInt((line6.style.left).replace(/\D/gm, ''));

        this.time = setInterval(() => {
            let coordinate = 0;
            let lastCoord = 10;

            console.log(`-1-${lastCoord}`);
            console.log(`-1-${coordinate}`);

            if (coordinate == 10) {
                clearInterval(this.time);
                console.log('time')
            } else {
                console.log(coordinate);
                for (let j = 0; j <= lastCoord; j++) {
                    console.log(j);
                    console.log(lastCoord);
                    console.log(coordinate);

                    line1.style.left = (left1 + coordinate) + 'px';
                    line2.style.left = (left2 + coordinate) + 'px';
                    line3.style.left = (left3 + coordinate) + 'px';
                    line4.style.left = (left4 + coordinate) + 'px';
                    line5.style.left = (left5 + coordinate) + 'px';
                    line6.style.left = (left6 + coordinate) + 'px';

                }
            }

            coordinate++
        }, 10);
    }
}


let newJug = new Jug();
newJug._init();

*/