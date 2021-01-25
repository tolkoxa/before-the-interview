let submenutext = document.getElementById('submenutext');
let str_subtext = '';

let sub_menu_1 = document.getElementById('submenu1');
let sub_menu_1_1 = document.getElementById('submenu11');
let sub_menu_1_2 = document.getElementById('submenu12');

let sub_menu_2 = document.getElementById('submenu2');
let sub_menu_2_1 = document.getElementById('submenu21');
let sub_menu_2_2 = document.getElementById('submenu22');

let sub_menu_3 = document.getElementById('submenu3');
let sub_menu_3_1 = document.getElementById('submenu31');
let sub_menu_3_2 = document.getElementById('submenu32');
let status = 1;

function one_two() {
    sub_menu_1_1.className = 'delivery__rama_text block-right';
    sub_menu_1_2.className = 'delivery__rama_btn';
    sub_menu_2_1.className = 'delivery__kab_text';
    sub_menu_2_2.className = 'delivery__kab_btn block-left';

    sub_menu_1_2.classList.add('btn-right-minus');
    sub_menu_2_1.classList.add('text-left-minus');
    sub_menu_2_2.classList.add('btn-right-plus');
    sub_menu_1_1.classList.add('text-left-plus');

    status = 2;
}

function two_one() {
    sub_menu_1_1.className = 'delivery__rama_text';
    sub_menu_1_2.className = 'delivery__rama_btn block-right';
    sub_menu_2_1.className = 'delivery__kab_text block-left';
    sub_menu_2_2.className = 'delivery__kab_btn';

    sub_menu_2_2.classList.add('btn-left-minus');
    sub_menu_1_2.classList.add('btn-left-plus');
    sub_menu_1_1.classList.add('text-right-minus');
    sub_menu_2_1.classList.add('text-right-plus');

    status = 1;
}

function two_three() {
    sub_menu_2_1.className = 'delivery__kab_text block-right';
    sub_menu_2_2.className = 'delivery__kab_btn';
    sub_menu_3_1.className = 'delivery__kofr_text';
    sub_menu_3_2.className = 'delivery__kofr_btn block-left';

    sub_menu_2_2.classList.add('btn-right-minus');
    sub_menu_3_2.classList.add('btn-right-plus');
    sub_menu_3_1.classList.add('text-left-minus');
    sub_menu_2_1.classList.add('text-left-plus');

    status = 3;
}

function three_two() {
    sub_menu_2_1.className = 'delivery__kab_text';
    sub_menu_2_2.className = 'delivery__kab_btn block-right';
    sub_menu_3_1.className = 'delivery__kofr_text block-left';
    sub_menu_3_2.className = 'delivery__kofr_btn';

    sub_menu_2_2.classList.add('btn-left-plus');
    sub_menu_3_2.classList.add('btn-left-minus');
    sub_menu_3_1.classList.add('text-right-plus');
    sub_menu_2_1.classList.add('text-right-minus');

    status = 2;
}

sub_menu_1.addEventListener('click', () => {
    if (status == 2) {
        two_one();
    } else if (status == 3) {
        three_two();
        setTimeout(two_one(), 500);
    }
    submenutext.innerHTML = '';
    str_subtext = `Текст, которого небыло в макете.`;
    submenutext.insertAdjacentHTML('beforeend', str_subtext);
});

sub_menu_2.addEventListener('click', () => {
    if (status == 1) {
        one_two();
    } else if (status == 3) {
        three_two();
    }
    submenutext.innerHTML = '';
    str_subtext = `Кабинеты&nbsp;&#151; большие сборные элементы, каждый из которых упакован индивидуально. Конструкция кабинета защищена от повреждений, <br>а упаковка позволит избежать попадания грязи и пыли.`;
    submenutext.insertAdjacentHTML('beforeend', str_subtext);
});

sub_menu_3.addEventListener('click', () => {
    if (status == 2) {
        two_three();
    } else if (status == 1) {
        one_two();
        setTimeout(two_three(), 500);
    }
    submenutext.innerHTML = '';
    str_subtext = `Транспортный кофр понадобится, если в дальнейшем планируется перевозка экрана с объекта на объект.<br>Его мы не предоставляем в аренду, возможна только покупка целиком`;
    submenutext.insertAdjacentHTML('beforeend', str_subtext);

});

let menu1 = document.getElementById('menu1');
let dopmenu = document.getElementById('dopmenu');
let base = document.getElementById('base');
let dopmenu_status = false;
menu1.addEventListener('click', () => {
    if (!dopmenu_status) {
        dopmenu.classList.remove('invisible');
        base.classList.remove('invisible');
        dopmenu.classList.add('dop-menu-action');
        menu1.classList.add('header__item_active');
        dopmenu_status = true;

        base.addEventListener('click', (evt) => {
            if (!dopmenu.contains(evt.target)) {
                dopmenu.className = 'dop-menu invisible shadow__main';
                base.className = 'click_base invisible';
                dopmenu_status = false;
                menu1.classList.remove('header__item_active');
            }
        })

    } else {
        dopmenu.className = 'dop-menu invisible shadow__main';
        base.className = 'click_base invisible';
        menu1.classList.remove('header__item_active');
        dopmenu_status = false;
    }
})