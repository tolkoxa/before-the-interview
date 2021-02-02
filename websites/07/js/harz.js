class Harz {
    constructor() {
        this.stock = 15;
        this.count = 0;
        this.first = true;
        this.mainimg = document.getElementById('mainimg'); //главное изображение
        this.slider = document.getElementById('slider'); //слайдер. родитель
        this.colorpoint = document.getElementById('colorpoint'); //цвета, родитель

        this.slider.addEventListener('click', (evt) => {
            evt.preventDefault();
            let e = evt.target;
            this.chamgeImg(e.dataset.item);
        });

        this.colorpoint.addEventListener('click', (evt) => {
            evt.preventDefault();
            let e = evt.target;
            console.log(e);
            console.log(evt);
            console.log(e.name);
            if (e.dataset.point != undefined) {
                this.changeColor(e.dataset.point);
            }
        });

        this._init();

    }
    _init() {
        document.getElementById('stock').innerHTML = `${this.stock} in stock`;
        this.changeCount();
    }
    chamgeImg(id) {
        this.mainimg.style.backgroundImage = `url(img/backgrounds/cart_bg_0${id}.png)`;
        (id > 1) ? this.mainimg.style.backgroundPosition = `150px center`: this.mainimg.style.backgroundPosition = `70px center`;
    }
    changeColor(id) {
        console.log(id);
        let have = document.querySelector('.cart__color_active');
        if (have != null) {
            have.classList.remove('cart__color_active');
        }
        document.getElementById(`color${id}`).classList.add('cart__color_active');
    }
    changeCount() {
        let button = document.getElementById('button'); //кнопка
        let btn_m = document.getElementById('btn_m');
        let btn_p = document.getElementById('btn_p');
        let number = document.getElementById('number');
        let multiply = document.getElementById('multiply');
        let price = document.getElementById('price');
        let btnBlock = document.getElementById('btnBlock');
        btn_p.addEventListener('click', (evt) => {
            evt.preventDefault();
            (this.count < this.stock) ? this.count++: this.count;
            number.innerHTML = this.count;
            button.style.backgroundColor = '#000000';
            btn_m.style.color = '#ffffff';
            btn_m.style.opacity = '1';
            btn_p.style.color = '#ffffff';
            btn_p.style.opacity = '1';
            number.style.color = '#ffffff';
            price.style.color = '#ffffff';
            multiply.style.display = 'block';
            number.style.display = 'block';
            this.first = false;
        });

        btn_m.addEventListener('click', (evt) => {
            evt.preventDefault();
            if (this.count >= 2) {
                this.count--;
                number.innerHTML = this.count;
            } else if (this.count == 1 && !this.first) {

                this.count = 0;
                btnBlock.innerHTML = '';
                let str = `
                <div class="cart__btn" id="button">
                        <div class="cart__minus" id="btn_m">-</div>
                        <div class="cart__data">
                            <p class="cart__number" id="number"></p>
                            <p class="cart__multiply" id="multiply">x</p>
                            <p class="cart__price" id="price"> 89 € </p>
                        </div>
                        <div class="cart__plus" id="btn_p">+</div>
                    </div>
                    <div>
                        <svg class="cart__heart" width="33" height="30" viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="cart__heart" d="M29.5159 14.81C32.4859 11.791 32.9245 6.80679 30.1139 3.62578C27.2436 0.383988 22.3401 0.100331 19.1309 3.01794C19.0312 3.11925 18.9316 3.20029 18.8319 3.3016L16.5596 5.63164L14.5862 3.64604C11.6162 0.627123 6.7127 0.161115 3.58323 3.03821C0.393969 5.95582 0.114909 10.9401 2.98525 14.2021C3.08491 14.3034 3.16464 14.4047 3.26431 14.506L16.5596 28L29.5159 14.81Z" stroke-width="1.5" stroke-miterlimit="3" stroke-linecap="round"/>
                            </svg>
                    </div>
                `;
                btnBlock.insertAdjacentHTML('beforeend', str);
                this.first = true;
                this._init();
            }
        });

    }
}

let testResult = new Harz();