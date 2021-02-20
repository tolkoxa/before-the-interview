class Pult {
    constructor() {
        this.allPortfolio = []
        this.windowWidth = innerWidth;
        this._init();
        this.mainStyle = document.querySelector('.main__style');
        this.wrapper = document.getElementById('wrapper');
        this.display = 4;
        this.count = 0;
        this.length;
        this.remains;
    }

    _init() {
        this.getItems();
    }
    async getItems() {
        let response = await fetch('data/pult.json');
        this.allPortfolio = await response.json();
        this.renderItems();
        this.length = this.allPortfolio.length;
        this.remains = this.length - this.display;
    }

    renderItems() {
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
            // console.log(this.mainStyle.innerWidth);
            if ((this.mainStyle.offsetWidth > 320) && (this.mainStyle.offsetWidth < 1279)) {
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
        console.log(this.wrapper.offsetWidth);
        let arr_width;
        let arr_height;
        if (this.wrapper.offsetWidth >= 1920) {
            arr_width = 16;
            arr_height = 32;
        } else if (this.wrapper.offsetWidth >= 1280) {
            arr_width = 10;
            arr_height = 18;
        } else if (this.wrapper.offsetWidth < 1280) {
            document.getElementById('leftarrow').style.display = 'none';
            document.getElementById('rightarrow').style.display = 'none';
        }

        let str_left_arrow = `
            <svg width="${arr_width}" height="${arr_height}" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg" name="wrapper" data-arrow="1">
                <path d="M9 17L1 9L9 1" stroke="#A89365" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" name="wrapper" data-arrow="1"/>
            </svg>
        `;

        let str_right_arrow = `
            <svg width="${arr_width}" height="${arr_height}" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 17L9 9L1 1" stroke="#A89365" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        document.getElementById('leftarrow').innerHTML = '';
        document.getElementById('rightarrow').innerHTML = '';

        document.getElementById('leftarrow').insertAdjacentHTML('beforeend', str_left_arrow);
        document.getElementById('rightarrow').insertAdjacentHTML('beforeend', str_right_arrow);

        this.wrapper.addEventListener('click', (evt) => {
            let e = evt.target,
                step = +e.dataset.arrow;

            if (e.name === 'wrapper') {
                let wrapwidth;
                (this.wrapper.offsetWidth < 1920) ? wrapwidth = 300: wrapwidth = 450;
                this.changeSlider(step, wrapwidth);
            }
        });
    }
    changeSlider(step, width) {
        console.log(step);
        console.log(typeof step);
        if (step === -1) {
            if (this.remains >= this.display) {
                this.count = this.count + this.display;
                this.remains = this.remains - this.display;
            } else if (this.remains < this.display) {
                this.count = this.count + this.remains;
                this.remains = 0;
            };
        } else if (step === 1) {
            if (this.remains == 0) {
                this.count = (this.count - this.display);
                step = step * -1;
                this.remains = this.display;
            } else if (this.count >= this.display) {
                this.count = this.count - this.display;
                this.remains = this.remains + this.display;
                step = step * -1;
            } else if (this.count < this.display) {
                this.remains = this.remains + this.count;
                this.count = 0;
            }
        }

        document.getElementById('sliderline').style.left = (width * this.count * step) + 'px';
    }
}

let resultTest = new Pult();