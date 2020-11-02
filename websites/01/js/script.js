const countLines = 7;
let topLines = document.getElementById('toplines');
let str = '';
let coordinate = 0;
let linesArr = [];
let checkWindow;
const winWidth = window.outerWidth;
let time2sec;

(winWidth > 375) ? (checkWindow = 200, time2sec = 50) : (checkWindow = 80, time2sec = 130);
startPoint = -checkWindow;
lastCoord = checkWindow;

function renderLines() {
    str = '';
    topLines.innerHTML = '';
    startPoint = -checkWindow;
    for (let i = 1; i <= countLines; i++, startPoint = startPoint + checkWindow) {
        str = str + `<div class="line_black" id="line${i}" style="left: ${startPoint}px"></div>`;
        linesArr.push(`line${i}`);
    }
    topLines.insertAdjacentHTML('afterbegin', str);
    let time = setInterval(moveLines, time2sec);

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

class Jug {
    constructor(winWidth) {
        this._init();
        this.checkModal = false;
        this.checkBuy = false;
        this.checkFuck = false;
        this.winWidth = winWidth;
        this.modalWin;
        this.strModalWin = '';
        this.footer;
        this.header;
        this.main;
    }
    _init() {
        console.log('Сделал Андрей Халимоненко. Подробнее на http://cv.tolkoxa.ru');
        this.start();
    }

    start() {
        const btns = document.getElementById('btns');
        btns.addEventListener('click', (evt) => {
            let e = evt.target;
            if (e.name === 'btn-modal') {
                let btnItem = e.dataset.btn;
                if (btnItem === 'buy' || btnItem === 'fuck') { winWidth > 375 ? this.renderDesktopModal() : this.renderMobileModal(btnItem) };
            }
        })
    }

    renderMobileModal(btnItem) {
        this.modalWin = document.getElementById('reaction');
        this.header = document.getElementById('header');
        this.main = document.getElementById('main');
        this.footer = document.getElementById('footer');
        this.header.classList.add('disable');
        this.main.classList.add('disable');
        this.modalWin.classList.remove('disable');
        this.footer.classList.add('mobile-padding');
        this.modalWin.innerHTML = '';

        this.strModalWin = `
        <a name="fuck"></a>
        <div class="reaction__block reaction__block_black">
                <div class="reaction__text reaction_padding-black">
                    <img src="img/facepalm_mobile.png" alt="Послать в жопу" width="40" height="40">
                    <p class="reaction__title reaction__title_white">Идите в жопу!</p>
                </div>
                <div class="reaction__form-fuck" id="fucks">
                    <button class="reaction__btn-fuck" name="btn-fuck" data-btn="price">Вы свои цены видели?</button>
                    <button class="reaction__btn-fuck" name="btn-fuck" data-btn="report">Доклады ни о чем</button>
                    <button class="reaction__btn-fuck" name="btn-fuck" data-btn="crazy">У вас там всё хорошо?</button>
                    <button class="reaction__btn-fuck" name="btn-fuck" data-btn="money">Денег нет, но вы держитесь</button>
                </div>
            </div>
            <a name="buy"></a>
            <div class="reaction__block reaction__block_white">
                <div class="reaction__text reaction_padding-white">
                    <img src="img/handsup_mobile.png" alt="Хочу знать" width="40" height="40">
                    <p class="reaction__title reaction__title_black">Я хочу знать, когда будет офлайн</p>
                </div>
                <div class="reaction__form-sub" id="form">
                    <div class="reaction__insert">
                        <input class="reaction__input" placeholder="Укажите email" id="input"></input>
                        <button class="reaction__btn-sub" id=sub>Подписаться</button>
                    </div>
                    <p class="reaction__conf">Нажимая на кнопку вы соглашаетесь на обработку
                        <a class="reaction__conf reaction__conf-link">персональных данных</a>
                    </p>
                </div>
            </div>
            <div class="reaction__click" id="close">
                Я кликнул просто посмотреть
            </div>`;

        this.modalWin.insertAdjacentHTML('beforeend', this.strModalWin);
        document.location.href = `#${btnItem}`;
        this.strModalWin = '';

        let closeMW = document.getElementById('close');
        closeMW.addEventListener('click', () => { this.closeModalWindow('mobile') });

        let checkEmail = false
        let emailFocus = false;
        let input = document.getElementById('input');
        input.addEventListener('focus', () => {
            input.placeholder = '';
            emailFocus = true;
        });

        input.addEventListener('mouseout', () => {
            (input.value != '') ? input.placeholder = input.value: input.placeholder = "Укажите email";

            checkEmail = this.checkEmailMask(input.value);
            if (!checkEmail && emailFocus) {
                input.classList.add('input_error');
            } else {
                input.classList.remove('input_error');
            }
        });

        let subBtn = document.getElementById('sub');
        subBtn.addEventListener('click', (() => {
            emailFocus = true;
            if (checkEmail) {
                let formThnx = document.getElementById('form');
                formThnx.innerHTML = '';
                let strThnx = `
                <div class="reaction__thnx-mob">
                    <p><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8181 19.7674L18.3267 26.3636L29.0908 15.4545" stroke="black" stroke-linecap="round"/>
                    <circle cx="20" cy="20" r="19.5" stroke="black"/>
                    </svg></p>
                    <p class="reaction__thnx">Спасибо, что подписались на нашу рассылку!</p>
                </div>
                `;
                formThnx.insertAdjacentHTML('beforeend', strThnx);
            } else {
                input.classList.add('input_error');
            }
        }))
    }

    renderDesktopModal() {
        this.modalWin = document.getElementById('reaction');
        this.modalWin.classList.remove('disable');

        this.strModalWin = `
        <div class="reaction__style">
            <div class="reaction__blocks">
                <div class="reaction__block reaction__block_white">
                    <div class="reaction__text reaction_padding-white">
                        <img src="img/desktop/handsup_reaction.png" alt="Хочу знать" width="60" height="60">
                        <p class="reaction__title reaction__title_black">Я хочу знать, когда будет офлайн</p>
                    </div>
                    <div class="reaction__form-sub" id="form">
                        <div class="reaction__insert">
                            <input class="reaction__input" placeholder="Укажите email" id="input"></input>
                            <button class="reaction__btn-sub" id=sub>Подписаться</button>
                        </div>
                        <p class="reaction__conf">Нажимая на кнопку вы соглашаетесь на обработку
                            <a class="reaction__conf reaction__conf-link">персональных данных</a>
                        </p>
                    </div>
                </div>
                <div class="reaction__block reaction__block_black">
                    <div class="reaction__text reaction_padding-black">
                        <img src="img/desktop/facepalm_reaction.png" alt="Послать в жопу" width="60" height="60">
                        <p class="reaction__title reaction__title_white">Идите в жопу!</p>
                    </div>
                    <div class="reaction__form-fuck" id="fucks">
                        <button class="reaction__btn-fuck" name="btn-fuck" data-btn="price">Вы свои цены видели?</button>
                        <button class="reaction__btn-fuck" name="btn-fuck" data-btn="report">Доклады ни о чем</button>
                        <button class="reaction__btn-fuck" name="btn-fuck" data-btn="crazy">У вас там всё хорошо?</button>
                        <button class="reaction__btn-fuck" name="btn-fuck" data-btn="money">Денег нет, но вы держитесь</button>
                    </div>
                </div>
            </div>
            <div class="reaction__click" id="close">
                Я кликнул просто посмотреть
            </div>
        </div>`;

        if (!this.checkModal) {
            this.modalWin.insertAdjacentHTML('beforeend', this.strModalWin);
            this.checkModal = true;
        };
        let checkEmail = false
        let emailFocus = false;
        let input = document.getElementById('input');
        input.addEventListener('focus', () => {
            input.placeholder = '';
            emailFocus = true;
        });
        input.addEventListener('mouseout', () => {
            (input.value != '') ? input.placeholder = input.value: input.placeholder = "Укажите email";

            checkEmail = this.checkEmailMask(input.value);
            if (!checkEmail && emailFocus) {
                input.classList.add('input_error');
            } else {
                input.classList.remove('input_error');
            }
        });

        let subBtn = document.getElementById('sub');
        subBtn.addEventListener('click', (() => {
            emailFocus = true;
            if (checkEmail) {
                let formThnx = document.getElementById('form');
                formThnx.innerHTML = '';
                let strThnx = `
                <p class="reaction__thnx">Спасибо, что подписались на нашу рассылку!</p>
                `;
                formThnx.insertAdjacentHTML('beforeend', strThnx);
            } else {
                input.classList.add('input_error');
            }
        }))

        const fucks = document.getElementById('fucks');

        fucks.addEventListener('click', (evt) => {
            let e = evt.target;

            if (e.name === 'btn-fuck') {
                let btnItem = e.dataset.btn;
                if (btnItem === 'price' || btnItem === 'report' || btnItem === 'crazy' || btnItem === 'money') {
                    fucks.innerHTML = '';
                    let strFuck = `
                    <div class="reaction__fuck-thnx">
                        <img src="img/desktop/fucks-like.png" alt="Спасибо за ваше мнение" width="100" height="100">
                        <p class="reaction__fuck-thnx-text">Спасибо, что поделились!</p>
                    </div>`;
                    fucks.insertAdjacentHTML('beforeend', strFuck);
                }
            }
        })

        let closeModal = document.getElementById('close');
        closeModal.addEventListener('click', () => { this.closeModalWindow('desktop') });
    }

    checkEmailMask(value) {
        return (/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(value))
    }

    closeModalWindow(type) {
        if (type === 'desktop') {
            this.modalWin.classList.add('disable');
            this.strModalWin = '';
        } else {
            this.modalWin.classList.add('disable');
            this.strModalWin = '';
            this.footer.classList.remove('mobile-padding');
            this.header.classList.remove('disable');
            this.main.classList.remove('disable');
        }
    }
}

let newJug = new Jug();