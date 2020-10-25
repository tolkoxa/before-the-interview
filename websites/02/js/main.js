class Alfa {
    constructor() {
        this.maxsum = 50000;
        this.firstchoose = false;
        this.moreLinkCheck = false;
        this.formatter = new Intl.NumberFormat('ru');
        this.deposit = 0.0698;
        this.invest = 0.7121;
        this.maxSumMattress;
        this.maxSumDeposit;
        this.maxSumInvest;
        this._init();
    }

    _init() {
        let maxSumId = document.getElementById('maxsumid');
        maxSumId.innerHTML = this.formatter.format(this.maxsum);
        this.start();
    }

    start() {
        let slider = document.getElementById('choose');
        let selector = document.getElementById('selector');
        let output = document.getElementById('output');
        let progress = document.getElementById('progress');

        slider.oninput = function() {
            //Если значение ползунка равно 0 – убираю блок со значениям
            if (this.value == 0) {
                output.classList.add('choose__value-white')
            } else {
                output.classList.remove('choose__value-white')
            };

            output.innerHTML = widget.formatter.format(this.value) + ' ₽';
            selector.style.left = (100 / (50000 / this.value)) + '%';
            progress.style.width = (100 / (50000 / this.value)) + '%';

            this.onmouseup = () => {
                widget.renderResult(this.value);
            };
        }
    }

    renderResult(sum) {
        //Под матрасом
        this.maxSumMattress = this.maxsum * 36;
        //Депозит
        let sumdeposit = Math.trunc(((sum * 36) * ((1 + this.deposit) * (1 + this.deposit) * (1 + this.deposit))));
        this.maxSumDeposit = Math.trunc(((this.maxsum * 36) * ((1 + this.deposit) * (1 + this.deposit) * (1 + this.deposit))));
        //Инвестиции
        let suminvest = this.formatter.format(Math.trunc((sum * 36) * (1 + this.invest)));
        this.maxSumInvest = this.formatter.format(Math.trunc((this.maxsum * 36) * (1 + this.invest)))

        //Меняем сумму не впервый раз
        if (this.firstchoose) {
            let resnumb = document.getElementById('resnumb');
            resnumb.innerHTML = '';
            resnumb.innerHTML = this.formatter.format(sum);
            let summattress = document.getElementById('summattress');
            summattress.innerHTML = '';
            summattress.innerHTML = `~${this.formatter.format(sum * 36)} ₽`;
            let sumDepositId = document.getElementById('sumdepositid');
            sumDepositId.innerHTML = '';
            sumDepositId.innerHTML = `~${this.formatter.format(sumdeposit)} ₽`
            let sumInvestId = document.getElementById('suminvestid');
            sumInvestId.innerHTML = '';
            sumInvestId.innerHTML = `до ~${suminvest} ₽`;

        } else {

            let startChoose = document.getElementById('start');
            let strAll = '';
            let strResult = `
            <section class="result container__white">
                <h2 class="result__title">Вы откладываете <span class="result__title" id="resnumb">${this.formatter.format(sum)}</span> ₽ в месяц. За три года вы бы заработали:</h2>
                <div class="result__data">
                    <div class="result__item">
                        <div class="result__coins" id="coinsmattress">
                            <img src="img/coin.png" alt="Монета" width="55" height="56">
                        </div>
                        <p class="result__sum" id="summattress">~${this.formatter.format(sum * 36)} ₽</p>
                        <p class="result__text">
                            если откладывать под матрас <span class="result__quetion" id="linkmattress">?</span>
                        </p>
                    </div>
                    <div class="result__item">
                        <div class="result__coins" id="coinsdeposit">
                            <img src="img/coin.png" alt="Монета" width="55" height="56">
                        </div>
                        <p class="result__sum" id="sumdepositid">~${this.formatter.format(sumdeposit)} ₽</p>
                        <p class="result__text">
                            если откладывать на депозит <span class="result__quetion" id="linkdeposit">?</span>
                        </p>
                    </div>
                    <div class="result__item">
                        <div class="result__coins" id="coinsinvest">
                            <img src="img/coin.png" alt="Монета" width="55" height="56">
                        </div>
                        <p class="result__sum" id="suminvestid">до ~${suminvest} ₽</p>
                        <p class="result__text">
                            если инвестировать в ПИФ «Альфа-Капитала» <span class="result__quetion" id="linkinvest">?</span>
                        </p>
                    </div>
                </div>
            </section>`;

            let strMoreLink = `
            <section class="readers container__pink" id="changelink">
                <a class="readers__link" id="morelinkid">А как в среднем у читателей vc.ru?
                    <div class="readers__arrow">
                        <svg class="readers__scg" width="16" height="7" viewBox="0 0 16 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7.55598 5.95238L14.0892 1" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </a>
            </section>`;

            let strBtnMore = `
            <section class="howknow container__white">
                <p class="howknow__text">Как начать инвестировать?</p>
                <a class="howknow__btn" href="https://alfabank.ru/make-money/investments/" target="_blank" id="morebtn">Узнать</a>
            </section>`;

            strAll = `<div class="invisible" id="allblocks">${strResult} ${strMoreLink} ${strBtnMore}</div>`;

            startChoose.insertAdjacentHTML('afterend', strAll);
            document.getElementById('allblocks').classList.add('plusblocks');

            document.getElementById('morelinkid').addEventListener('click', () => {
                this.morelink();
            })
        }
        this.firstchoose = true;
    }

    morelink() {
        console.log('graph');
        let changeLink = document.getElementById('changelink');
        if (this.moreLinkCheck) {
            document.getElementById('chartid').style.display = 'flex';
            document.getElementById('chartid').classList.remove('invisible');

            let strLessLink = `
                <a class="readers__link" id="lesslinkid">Свернуть
                    <div class="readers__arrow">
                        <svg width="16" height="7" viewBox="0 0 16 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.0891 5.95242L7.53313 1.00004L0.999928 5.95242"  stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </a>`;


            changeLink.innerHTML = '';
            changeLink.innerHTML = strLessLink;
            let lessLink = document.getElementById('lesslinkid');
            lessLink.addEventListener('click', () => {
                this.lesslink();
            })

        } else {
            let strGraph = `
            <section class="chart container__pink" id="chartid">
                <div class="chart__coins">
                    <p class="chart__img" id="chartimg">
                        <img src="img/money_5.png" alt="Деньги" width="auto" height="auto">
                    </p>
                    <p class="chart__sum" id="chartsum">~ 15 240 &#8381</p>
                </div>
                <p class="chart__text">в среднем откладывают читатели vc.ru</p>
                <div class="chart__items">
                    <div class="chart__item">
                        <div class="chart__graph" id="graph1"></div>
                        <p class="chart__legend" id="legend1">50%</p>
                        <p class="chart__desc">читателей откладывают больше 1&nbsp;000 &#8381 в месяц</p>
                    </div>
                    <div class="chart__item">
                        <div class="chart__graph" id="graph2"></div>
                        <p class="chart__legend" id="legend2">70%</p>
                        <p class="chart__desc">читателей откладывают больше 10&nbsp;000 &#8381 в месяц</p>
                    </div>
                </div>
            </section>`;

            let strLessLink = `
                <a class="readers__link" id="lesslinkid">Свернуть
                    <div class="readers__arrow">
                        <svg width="16" height="7" viewBox="0 0 16 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.0891 5.95242L7.53313 1.00004L0.999928 5.95242"  stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </a>`;


            changeLink.insertAdjacentHTML('beforebegin', strGraph);
            document.getElementById('chartid').classList.add('plusblocks-flex');

            changeLink.innerHTML = '';
            changeLink.innerHTML = strLessLink;
            this.moreLinkCheck = true;

            let lessLink = document.getElementById('lesslinkid');
            lessLink.addEventListener('click', () => {
                this.lesslink();
            })
        }
    }

    lesslink() {
        let chartId = document.getElementById('chartid');
        chartId.style.display = 'none';
        let changeLink = document.getElementById('changelink');
        let strMoreLink = `
                <a class="readers__link" id="morelinkid">А как в среднем у читателей vc.ru?
                    <div class="readers__arrow">
                        <svg class="readers__scg" width="16" height="7" viewBox="0 0 16 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7.55598 5.95238L14.0892 1" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </a>`;
        changeLink.innerHTML = '';
        changeLink.insertAdjacentHTML('beforeend', strMoreLink);

        document.getElementById('morelinkid').addEventListener('click', () => {
            this.morelink();
        })
    }
}

let widget = new Alfa();