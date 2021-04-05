class Frispes {
    constructor() {
        this.sliderIntro = document.getElementById('sliderintro'); //первый слайдер
        this.introPag = document.getElementById('intropag'); //див с пагинацией первого слайдера
        this.facMenu = document.getElementById('facmenu'); //див с кнопками переключения фото
        this.fotoFac = document.getElementById('fotofac'); //див с изображениями

        this._init();
        this.consoleInfo();
    }

    _init() {
        this.introPag.addEventListener('click', (evt) => {
            evt.preventDefault();
            let e = evt.target;
            if (e.name === 'intropag') {
                this.changeSlider(e.dataset.slider);
            }
        });

        this.facMenu.addEventListener('mouseover', (evt) => {
            let e = evt.target;
            if (e.name === 'facmenu') {
                this.changeFacilitiesPhoto(e.dataset.fac);
            }
        });
    }

    changeSlider(id) {
        this.sliderIntro.style.transform = `translateX(${-1110 * (id - 1)}px)`;
        document.querySelector('.slider__pag-item_active').classList.remove('slider__pag-item_active');
        document.getElementById(`slider${id}`).classList.add('slider__pag-item_active');
    }
    changeFacilitiesPhoto(id) {
        document.querySelector('.facilities__menu-item_active').classList.remove('facilities__menu-item_active');
        this.fotoFac.className = "facilities__imgs";
        this.fotoFac.classList.add(`facilities__imgs_${id}`);
        document.getElementById(`fac${id}`).classList.add('facilities__menu-item_active');

    }

    consoleInfo() {
        console.log(`Это решение тестового задания для Krayt от Андрея Халимоненко. \nДругие тестовые задания смотри на http://before-the-interview.tolkoxa.ru\n\nСамый быстрый способ связи со мной – телеграм. https://t.me/pitchtrener`);
    }
}


let Krayt = new Frispes();