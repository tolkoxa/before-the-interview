class Alfa {
    constructor() {
        this.maxsum = 50000;
        this.userSum;
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
        this.smth();
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
        //Инвестиции
        let suminvest = Math.trunc((sum * 36) * (1 + this.invest));
        this.maxSumInvest = Math.trunc((this.maxsum * 36) * (1 + this.invest));
        let coinsInvestRender = this.rendercoin(suminvest);
        //Под матрасом
        this.maxSumMattress = this.maxsum * 36;
        let coinsMattressRender = this.rendercoin(sum * 36);
        //Депозит
        let sumdeposit = Math.trunc(((sum * 36) * ((1 + this.deposit) * (1 + this.deposit) * (1 + this.deposit))));
        this.maxSumDeposit = Math.trunc(((this.maxsum * 36) * ((1 + this.deposit) * (1 + this.deposit) * (1 + this.deposit))));
        let coinsDepositRender = this.rendercoin(sumdeposit);


        //Меняем сумму не впервый раз
        if (this.firstchoose) {
            //Сумма в заголовке
            let resnumb = document.getElementById('resnumb');
            resnumb.innerHTML = this.formatter.format(sum);
            //Под матрасом
            let summattress = document.getElementById('summattress');
            summattress.innerHTML = `~${this.formatter.format(sum * 36)} ₽`;
            let coinsmattress = document.getElementById('coinsmattress');
            coinsmattress.innerHTML = coinsMattressRender;
            //Депозит
            let sumDepositId = document.getElementById('sumdepositid');
            sumDepositId.innerHTML = `~${this.formatter.format(sumdeposit)} ₽`;
            let coinsdeposit = document.getElementById('coinsdeposit');
            coinsdeposit.innerHTML = coinsDepositRender;
            //Инвестиции
            let sumInvestId = document.getElementById('suminvestid');
            sumInvestId.innerHTML = `до ~${this.formatter.format(suminvest)} ₽`;
            let coinsinvest = document.getElementById('coinsinvest');
            coinsinvest.innerHTML = coinsInvestRender;

        } else {

            let startChoose = document.getElementById('start');
            let strAll = '';
            let strResult = `
            <section class="result transition container__white">
                <h2 class="result__title">Вы откладываете <span class="result__title" id="resnumb">${this.formatter.format(sum)}</span> ₽ в месяц. За три года вы бы заработали:</h2>
                <div class="result__data">
                    <div class="result__item">
                        <div class="result__coins" id="coinsmattress">
                        ${coinsMattressRender}
                        </div>
                        <p class="result__sum" id="summattress">~${this.formatter.format(sum * 36)} ₽</p>
                        <p class="result__text" id="openmodalmattress">
                            если откладывать под матрас <span class="result__quetion" name="modallink" data-modallink="mattress" id="linkmattress">?</span>
                        </p>
                        <div class="open-modal" id="openmodalmat"></div>
                    </div>
                    <div class="result__item">
                        <div class="result__coins" id="coinsdeposit">
                            ${coinsDepositRender}
                        </div>
                        <p class="result__sum" id="sumdepositid">~${this.formatter.format(sumdeposit)} ₽</p>
                        <p class="result__text">
                            если откладывать на депозит <span class="result__quetion" name="modallink" data-modallink="deposit" id="linkdeposit">?</span>
                        </p>
                        <div class="open-modal" id="openmodaldep"></div>
                    </div>
                    <div class="result__item">
                        <div class="result__coins" id="coinsinvest">
                            ${coinsInvestRender}
                        </div>
                        <p class="result__sum" id="suminvestid">до ~${this.formatter.format(suminvest)} ₽</p>
                        <p class="result__text">
                            если инвестировать в ПИФ «Альфа-Капитала» <span class="result__quetion" name="modallink" data-modallink="invest" id="linkinvest">?</span>
                        </p>
                        <div class="open-modal" id="openmodalinv"></div>
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

        let modal = document.getElementById('body');

        modal.addEventListener('click', (evt) => {
            let e = evt.target;

            let openmodalmat = document.getElementById('openmodalmat');
            let openmodaldep = document.getElementById('openmodaldep');
            let openmodalinv = document.getElementById('openmodalinv');
            if (e.getAttribute('name') === 'modallink') {
                let menuItem = e.dataset.modallink;
                let strOpenModal = '';

                if (menuItem === 'mattress') {
                    if (document.getElementById('linkdeposit').classList.contains('result__quetion-active')) {
                        document.getElementById('linkdeposit').classList.remove('result__quetion-active')
                    }
                    if (document.getElementById('linkinvest').classList.contains('result__quetion-active')) {
                        document.getElementById('linkinvest').classList.remove('result__quetion-active')
                    }
                    openmodalmat.classList.remove('invisible');
                    openmodaldep.innerHTML = '';
                    openmodalinv.innerHTML = '';
                    strOpenModal = '';
                    strOpenModal = `
                    <div class="open-mattress" id="modalopen" name="modallink">В этом мало смысла — такие 
                    накопления «съедает» инфляция</div>`;
                    openmodalmat.insertAdjacentHTML('beforeend', strOpenModal);
                    document.getElementById('linkmattress').classList.add('result__quetion-active');
                } else if (menuItem === 'deposit') {
                    if (document.getElementById('linkmattress').classList.contains('result__quetion-active')) {
                        document.getElementById('linkmattress').classList.remove('result__quetion-active')
                    }
                    if (document.getElementById('linkinvest').classList.contains('result__quetion-active')) {
                        document.getElementById('linkinvest').classList.remove('result__quetion-active')
                    }
                    openmodaldep.classList.remove('invisible');
                    openmodalmat.innerHTML = '';
                    openmodalinv.innerHTML = '';
                    strOpenModal = '';
                    strOpenModal = `
                    <div class="open-deposit" id="modalopen" name="modallink">Ставки по вкладам различны в разных
                    банках и зависят от многих факторов, 
                    в частности, от ключевой ставки 
                    Центрального банка РФ <a class="open-link" href="https://vc.ru/promo/76505-alfa-kapital-yuridicheskaya-informaciya?ea=678fa71362d1b64dda32a1e6c54730abd442d756633f11fa1548bfcc17e7bfb5#1" target="_blank"><sup>1</sup></a>.</div>`;
                    openmodaldep.insertAdjacentHTML('beforeend', strOpenModal);
                    document.getElementById('linkdeposit').classList.add('result__quetion-active');
                } else if (menuItem === 'invest') {
                    if (document.getElementById('linkmattress').classList.contains('result__quetion-active')) {
                        document.getElementById('linkmattress').classList.remove('result__quetion-active')
                    }
                    if (document.getElementById('linkdeposit').classList.contains('result__quetion-active')) {
                        document.getElementById('linkdeposit').classList.remove('result__quetion-active')
                    }

                    openmodalinv.classList.remove('invisible');
                    openmodalmat.innerHTML = '';
                    openmodaldep.innerHTML = '';
                    strOpenModal = '';
                    strOpenModal = `
                    <div class="open-invest" id="modalopen" name="modallink">Вы становитесь инвестором набора компаний, который определяют профессиональные управляющие. Они решают, когда покупать и продавать ценные бумаги, чтобы обеспечить инвестиционный доход.  Купить или продать паи фонда можно в любой момент <a class="open-link" href="https://vc.ru/promo/76505-alfa-kapital-yuridicheskaya-informaciya?ea=678fa71362d1b64dda32a1e6c54730abd442d756633f11fa1548bfcc17e7bfb5#2" target="_blank"><sup>2</sup></a>.</div>`;
                    openmodalinv.insertAdjacentHTML('beforeend', strOpenModal);
                    document.getElementById('linkinvest').classList.add('result__quetion-active');
                }


            }

            if (e.getAttribute('name') != 'modallink') {
                openmodalmat.innerHTML = '';
                openmodaldep.innerHTML = '';
                openmodalinv.innerHTML = '';

                if (document.getElementById('linkmattress').classList.contains('result__quetion-active')) {
                    document.getElementById('linkmattress').classList.remove('result__quetion-active')
                }
                if (document.getElementById('linkdeposit').classList.contains('result__quetion-active')) {
                    document.getElementById('linkdeposit').classList.remove('result__quetion-active')
                }
                if (document.getElementById('linkinvest').classList.contains('result__quetion-active')) {
                    document.getElementById('linkinvest').classList.remove('result__quetion-active')
                }
            }
        })
    }

    morelink() {
        let picsArr = ['money_1.png', 'money_2.png', 'money_3.png', 'money_4.png', 'money_5.png'];
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
            let averageUserSum = 15240;
            let graphImg;
            graphImg = picsArr[`${Math.floor(averageUserSum/10000)}`];
            let strGraph = `
            <section class="chart container__pink transition" id="chartid">
                <div class="chart__coins">
                    <p class="chart__img" id="chartimg">
                        <img src="img/${graphImg}" alt="Деньги" width="auto" height="auto">
                    </p>
                    <p class="chart__sum" id="chartsum">~ ${this.formatter.format(averageUserSum)} &#8381</p>
                </div>
                <p class="chart__text">в среднем откладывают читатели vc.ru</p>
                <div class="chart__items">
                    <div class="chart__item">
                        <div class="chart__graph" id="graph1">
                        <svg width="100%" height="100%" viewBox="0 0 42 42">
                            <circle cx="21" cy="21" r="13.91549430918954" fill="transparent" stroke="#ffffff" stroke-width="4"></circle>
                            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#FE4D4A" stroke-width="8" stroke-dasharray="50 50" stroke-dashoffset="25"></circle>
                        </svg>
                    </div>
                        <p class="chart__legend" id="legend1">50%</p>
                        <p class="chart__desc">читателей откладывают больше 1&nbsp;000 &#8381 в месяц</p>
                    </div>
                    <div class="chart__item">
                        <div class="chart__graph" id="graph2">
                            <svg width="100%" height="100%" viewBox="0 0 42 42">
                                <circle cx="21" cy="21" r="13.91549430918954" fill="transparent" stroke="#ffffff" stroke-width="4"></circle>
                                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#FE4D4A" stroke-width="8" stroke-dasharray="7 93" stroke-dashoffset="25"></circle>
                            </svg>
                        </div>
                        <p class="chart__legend" id="legend2">7%</p>
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
            document.getElementById('chartid').scrollIntoView({ block: "start", behavior: "smooth" });

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
        document.getElementById('chartid').classList.add('invisible');
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
            document.getElementById('chartid').scrollIntoView({ block: "start", behavior: "smooth" });
        })
    }

    rendercoin(typesum) {
        let strCoin = '';
        let coinsCount;

        coinsCount = Math.round(typesum / (this.maxSumInvest / 10));

        for (let i = 1; i <= coinsCount; i++) {
            strCoin = strCoin + `<span class="renderCoin"></span>`;
        }
        return strCoin;
    }

    smth() {
        console.log('Решение тестового задания от Андрея Халимоненко (http://tolkoxa.ru)')
    }
}

let widget = new Alfa();