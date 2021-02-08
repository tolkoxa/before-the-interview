//document.documentElement.clientWidth - ширина браузера
class Four {
    constructor() {
        this.burger = document.getElementById('burger'); //кнопка меню бургер
        this.heart = document.getElementById('heart');
        this.base = document.getElementById('base'); //подложка для модальных окон
        this.burgerMenu = document.getElementById('burgermenu'); //модальное окно бургер–меню
        this.favorites = document.getElementById('favorites'); //модальное окно избранного
        this.pagcarousel = document.getElementById('pagcarousel'); //див с пагинацией
        this.advantages = document.getElementById('advantages'); //преимущества
        this.allrooms = document.getElementById('allrooms'); //меню со всеми комнатами
        this.submenu = document.getElementById('submenu'); //меню со всеми комнатами
        this.room_1 = [];
        this.room_2 = [];
        this.room_3 = [];
        this.room_4 = [];
        this.room_5 = [];
        this.allTypes = [];
        this.typesRoom1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.typesRoom2 = [1, 2, 3, 4, 5, 6, 7, 9, 10];
        this.typesRoom3 = [2, 10, 12];
        this.typesRoom4 = [1, 2, 3, 4, 6, 9, 11];
        this.typesRoom5 = [4, 6, 9, 10, 12];

        this.burger.addEventListener('click', () => {
            this.openBurger();
        });

        this.heart.addEventListener('click', () => {
            this.openFavoriets();
        });

        this.pagcarousel.addEventListener('click', (evt) => {
            evt.preventDefault();
            let e = evt.target;
            this.changeCarousel(e.dataset.pag);
        });

        document.getElementById('pagadv2').addEventListener('click', () => {
            this.advantages.style.left = -20 + '%';
            document.getElementById('pagadv1').classList.remove('pagination__item_active');
            document.getElementById('pagadv2').classList.add('pagination__item_active');
        });

        document.getElementById('pagadv1').addEventListener('click', () => {
            this.advantages.style.left = 0;
            document.getElementById('pagadv2').classList.remove('pagination__item_active');
            document.getElementById('pagadv1').classList.add('pagination__item_active');
        });

        this.allrooms.addEventListener('click', (evt) => {
            evt.preventDefault();
            let e = evt.target;
            this.renderSubMenu(e.dataset.room);
        })



        this._init();

    }
    _init() {
        this.getTypes();
    }
    async getTypes() {
        let response = await fetch('data/type.json');
        this.allTypes = await response.json();
    }

    changeCarousel(e) {
        console.log(e);
        document.getElementById('carousel').style.left = (-297 * (e - 1)) + 'px';
        document.querySelector('.pagination__item_active').classList.remove('pagination__item_active');
        document.getElementById(`pag${e}`).classList.add('pagination__item_active');


    }
    openBurger() {
        this.base.classList.remove('invisible');
        this.burgerMenu.classList.remove('invisible');

        let str = `
        <div class="bmenu__close" id="close">&times;</div>
        <div class="bmenu__menu">
            <a class="bmenu__item" href="#">Кухни</a>
            <a class="bmenu__item" href="#">Детские</a>
            <a class="bmenu__item" href="#">Спальни</a>
            <a class="bmenu__item" href="#">Корпусная мебель</a>
            <a class="bmenu__item" href="#">Офисная мебель</a>
            <a class="bmenu__item" href="#">Торговое оборудование</a>
        </div>
        <div class="bmenu__dopmenu">
            <a href="" class="bmenu__dop-item">Акции и скидки</a>
            <a href="" class="bmenu__dop-item">Услуги</a>
            <a href="" class="bmenu__dop-item">Статьи</a>
        </div>
        <div class="bmenu__links">
            <div class="bmenu__icons">
                <div class="bmenu__icon">
                    <img src="img/mobil/burger/m_burger_phone.png" alt="" width="28" height="26">
                </div>
                <a class="bmenu__link" href="tel:+79119859822">+ 7 911 985 98 22</a>
            </div>
            <div class="bmenu__icons">
                <div class="bmenu__icon">
                    <img src="img/mobil/burger/m_burger_mail.png" alt="" width="29" height="31">
                </div>
                <a class="bmenu__link" href="mailto:mebel@mail.ru">mebel@mail.ru</a>
            </div>
            <div class="bmenu__icons">
                <div class="bmenu__icon">
                    <img src="img/mobil/burger/m_burger_map.png" alt="" width="35" height="31">
                </div>
                <a class="bmenu__link">Санкт-Петербург, ул. Ленина, д. 1</a>
            </div>
            <div class="bmenu__icons">
                <div class="bmenu__icon">
                    <img src="img/mobil/burger/m_burger_pay.png" alt="" width="37" height="37">
                </div>
                <a class="bmenu__link">Оплата</a>
            </div>
            <div class="bmenu__icons">
                <div class="bmenu__icon">
                    <img src="img/mobil/burger/m_burger_delivery.png" alt="" width="27" height="28">
                </div>
                <a class="bmenu__link">Доставка</a>
            </div>
        </div>
        `;

        this.burgerMenu.insertAdjacentHTML('beforeend', str);

        document.getElementById('close').addEventListener('click', () => {
            this.closeModal();
        });
        this.base.addEventListener('click', () => {
            this.closeModal();
        });
    }

    openFavoriets() {
        this.base.classList.remove('invisible');
        this.favorites.classList.remove('invisible');
        let str = `
        <div class="favorites__close" id="close">&times;</div>
                <div class="favorites__header">
                    <img src="img/mobil/favorites/heart.png" alt="" width="18" height="15">
                    <p class="favorites__title">Избранное</p>
                </div>
                <div class="favorites__chapter">
                    <p class="favorites__title">Кухни</p>
                    <div class="favorites__items">
                        <div class="favorites__item">
                            <div class="fitem_favorites fitem__small_favorites">
                                <div class="fitem__img">
                                    <img src="img/mobil/fotos/foto_03_s.png" width="130" height="117">
                                </div>
                                <div class="fitem__lighten_favorites"></div>
                                <div class="fitem__text fitem__small_favorites">
                                    <div class="fitem__top">
                                        <div class="fitem__type">Спальня</div>
                                        <div class="fitem__heart">
                                            <svg class="fitem__heart_svg_favorites" width="14" height="12" viewBox="0 -28 512.00002 512" xmlns="http://www.w3.org/2000/svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>
                                        </div>
                                    </div>
                                    <div class="fitem__bottom">
                                        <p class="fitem__title">Кровать двухспальная</p>
                                        <p class="fitem__title">30 000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="favorites__item">
                            <div class="fitem_favorites fitem__small_favorites">
                                <div class="fitem__img">
                                    <img src="img/mobil/fotos/foto_03_s.png" width="130" height="117">
                                </div>
                                <div class="fitem__lighten_favorites"></div>
                                <div class="fitem__text fitem__small_favorites">
                                    <div class="fitem__top">
                                        <div class="fitem__type">Спальня</div>
                                        <div class="fitem__heart">
                                            <svg class="fitem__heart_svg_favorites" width="14" height="12" viewBox="0 -28 512.00002 512" xmlns="http://www.w3.org/2000/svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>
                                        </div>
                                    </div>
                                    <div class="fitem__bottom">
                                        <p class="fitem__title">Кровать двухспальная</p>
                                        <p class="fitem__title">30 000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="favorites__chapter">
                    <p class="favorites__title">Кухни</p>
                    <div class="favorites__items">
                        <div class="favorites__item">
                            <div class="fitem_favorites fitem__small_favorites">
                                <div class="fitem__img">
                                    <img src="img/mobil/fotos/foto_03_s.png" width="130" height="117">
                                </div>
                                <div class="fitem__lighten_favorites"></div>
                                <div class="fitem__text fitem__small_favorites">
                                    <div class="fitem__top">
                                        <div class="fitem__type">Спальня</div>
                                        <div class="fitem__heart">
                                            <svg class="fitem__heart_svg_favorites" width="14" height="12" viewBox="0 -28 512.00002 512" xmlns="http://www.w3.org/2000/svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>
                                        </div>
                                    </div>
                                    <div class="fitem__bottom">
                                        <p class="fitem__title">Кровать двухспальная</p>
                                        <p class="fitem__title">30 000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="favorites__item">
                            <div class="fitem_favorites fitem__small_favorites">
                                <div class="fitem__img">
                                    <img src="img/mobil/fotos/foto_03_s.png" width="130" height="117">
                                </div>
                                <div class="fitem__lighten_favorites"></div>
                                <div class="fitem__text fitem__small_favorites">
                                    <div class="fitem__top">
                                        <div class="fitem__type">Спальня</div>
                                        <div class="fitem__heart">
                                            <svg class="fitem__heart_svg_favorites" width="14" height="12" viewBox="0 -28 512.00002 512" xmlns="http://www.w3.org/2000/svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>
                                        </div>
                                    </div>
                                    <div class="fitem__bottom">
                                        <p class="fitem__title">Кровать двухспальная</p>
                                        <p class="fitem__title">30 000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        this.favorites.insertAdjacentHTML('beforeend', str);

        document.getElementById('close').addEventListener('click', () => {
            this.closeModal();
        });
        this.base.addEventListener('click', () => {
            this.closeModal();
        });

    }

    closeModal() {
        this.favorites.innerHTML = '';
        this.burgerMenu.innerHTML = '';
        if (!this.base.classList.contains('invisible')) { this.base.classList.add('invisible'); }
        if (!this.burgerMenu.classList.contains('invisible')) { this.burgerMenu.classList.add('invisible'); }
        if (!this.favorites.classList.contains('invisible')) { this.favorites.classList.add('invisible') };
    }

    renderSubMenu(id) {
        this.submenu.innerHTML = '';
        document.getElementById('room1').classList.remove('m_room_1_active');
        document.getElementById('room2').classList.remove('m_room_2_active');
        document.getElementById('room3').classList.remove('m_room_3_active');
        document.getElementById('room4').classList.remove('m_room_4_active');
        document.getElementById('room5').classList.remove('m_room_5_active');
        let subArr = [];
        if (id == 1) { subArr = this.typesRoom1 };
        if (id == 2) { subArr = this.typesRoom2 };
        if (id == 3) { subArr = this.typesRoom3 };
        if (id == 4) { subArr = this.typesRoom4 };
        if (id == 5) { subArr = this.typesRoom5 };

        let str = '';
        subArr.forEach(x => {
            let item = this.allTypes.find(item => item.id === x);
            // console.log(item.name)
            str = str + `<div class="submenu__item">${item.name}</div>`
        });
        document.querySelector(`.m_room_${id}`).classList.add(`m_room_${id}_active`);
        this.submenu.insertAdjacentHTML('beforeend', str);
    }
}

let Furniture = new Four();