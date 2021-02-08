class Pult {
    constructor() {
        this.allPortfolio = []
        this.windowWidth = innerWidth;
        this._init();
        this.mainStyle = document.querySelector('.main__style');
    }

    _init() {
        this.getItems();
    }
    async getItems() {
        let response = await fetch('data/pult.json');
        this.allPortfolio = await response.json();
        this.renderItems();
    }

    // renderPagination(){
    //     let i = this.allPortfolio.length;
    //     return {

    //     }
    // }

    renderItems() {
        // let str_pagination = this.renderPagination();
        let str_subtitle = '';
        let str_text = '';
        let str_img = '';
        let str_main = '';
        let str_pag = '';
        this.allPortfolio.forEach((e) => {
            str_img = `
            <div class="slider__img">
                <img src="img/${e.img}" alt="" width="100%" height="auto">
            </div>`;
            str_subtitle = `
            <p class="slider__subtitle">${e.subtitle}</p>
            `;
            str_text = `
            <p class="slider__text">${e.text}</p>
            `;

            str_main = `${str_main}<div class="slider__item">${str_img}${str_subtitle}${str_text}</div>`;

            //
            if ((this.mainStyle.offsetWidth > 640) && (this.mainStyle.offsetWidth < 1279)) {
                if (e.id % 2 !== 0) {
                    str_pag = `${str_pag}
                        <div class="slider__pag ${((e.id == 1)? 'slider__pag_active' : '')}" name="pagination" data-pag="${e.id}" id="pag${e.id}"></div>`;
                } else { str_pag = str_pag; };
            } else if (this.mainStyle.offsetWidth > 1280) {
                str_pag = '';
            } else if (this.mainStyle.offsetWidth < 640) {
                str_pag = `${str_pag}
                <div class="slider__pag ${((e.id == 1)? 'slider__pag_active' : '')}" name="pagination" data-pag="${e.id}" id="pag${e.id}"></div>`;
            }
            //
        });
        document.getElementById('sliderline').insertAdjacentHTML('beforeend', str_main);
        document.getElementById('sliderpag').insertAdjacentHTML('beforeend', str_pag);

        document.getElementById('sliderpag').addEventListener('click', (evt) => {
            evt.preventDefault();
            // let count = 1;
            // (this.mainStyle.offsetWidth > 320) ? count = 2: count = 1;
            let e = evt.target;
            if (e.dataset.pag != undefined) {
                document.getElementById('sliderline').style.left = (-300 * (e.dataset.pag - 1)) + 'px';
                document.querySelector('.slider__pag_active').classList.remove('slider__pag_active');
                document.getElementById(`pag${e.dataset.pag}`).classList.add('slider__pag_active');
            }
        });
    }
}

let resultTest = new Pult();

//element.offsetWidth