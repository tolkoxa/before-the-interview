class News {
    constructor() {
        this._init();
        this.allCategories;
        this.allNews;
        this.myNews = [];
        this.saved = [];
        this.count = 0;
        this.mainSearch1;
        this.mainSearch2;
        this.saveSearch1 = true;
        this.saveSearch2 = false;
        this.numberid = document.getElementById('number');
        this.items = document.getElementById('items');


        document.getElementById("newnews").addEventListener('click', (evt) => {
            evt.preventDefault();
            document.getElementById("window").classList.toggle("invisible");
            this.renderNews('all');
        });

        document.getElementById("window").addEventListener('click', (evt) => {
            let e = evt.target;
            if (e.name == 'header') { this.renderNews(e.dataset.menu); }
        });
    }
    _init() {
        this.getCategories();
        this.getNews();
    }
    async getCategories() {
        let response = await fetch('data/categories.json');
        this.allCategories = await response.json();
    }

    async getNews() {
        let response = await fetch('data/news.json');
        this.allNews = await response.json();
        this.allNews.forEach((item) => {
            (!item.readed) ? this.count++: this.count + 0;
        });
        this.renderCount(this.count);
    }

    renderCount(count) {
        if (count > 0) {
            this.numberid.classList.remove('invisible');
        } else {
            this.numberid.classList.add('invisible');
        }
        this.numberid.innerHTML = '';
        this.numberid.insertAdjacentHTML('beforeend', count);

        let Data = new Date(),
            Hour = Data.getHours(),
            Minutes = Data.getMinutes();
        (Hour < 10) ? Hour = `0${Hour}`: Hour = Hour;
        (Minutes < 10) ? Minutes = `0${Minutes}`: Minutes = Minutes;
        document.getElementById('time').innerHTML = `${Hour}:${Minutes}`;
    }

    renderNews(type) {
        let str = '';
        document.querySelector('.news__header_selected').classList.remove('news__header_selected');
        document.getElementById(type).classList.add('news__header_selected');
        if (type == 'all') {
            this.mainSearch1 = true;
            this.mainSearch2 = false;
            this.saveSearch1 = true;
            this.saveSearch2 = false;
        } else if (type == 'main') {
            this.mainSearch1 = true;
            this.mainSearch2 = true;
            this.saveSearch1 = true;
            this.saveSearch2 = false;
        } else if (type == 'save') {
            this.mainSearch1 = true;
            this.mainSearch2 = false;
            this.saveSearch1 = true;
            this.saveSearch2 = true;
        }
        this.items.innerHTML = '';
        str = '';

        if (type != 'my') {

            this.allNews.forEach((e) => {
                if (((e.main == this.mainSearch1) || (e.main == this.mainSearch2)) && (e.saved == this.saveSearch1) || (e.saved == this.saveSearch2)) {
                    str = str +
                        `<div class="news__item"">
                        <p class="news__pic">
                            <img class="news__img" alt="${e.article}" src="img/news/${e.img}">
                        </p>
                        <div class="news__data">
                            <div class="news__text">
                                <a class="news__article ${(!e.readed) ? 'news__article_bold' : ''}" href="${e.link}" id="a${e.news_id}">${e.article}</a>
                                <div class="news__symbols">
                                    <p class="news__save">
                                        <span class="fa fa-bookmark-o" aria-hidden="true" id="s${e.news_id}" onclick="testResult.saveNews(${e.news_id})"></span>
                                    </p>
                                    <p class="news__readed ${(e.readed) ? 'news__readed_green' : ''}">
                                        <span class="news__readed ${(e.readed) ? 'news__readed_green' : ''} fa fa-check" aria-hidden="true" id="r${e.news_id}" onclick="testResult.readNews(${e.news_id})"></span>
                                    </p>
                                </div>
                            </div>
                            <div class="news__info">
                                <p class="news__author">${e.author}</p>
                                <p class="news__category">//${this.allCategories[e.cat_id].name}</p>
                                <p class="news__date">${e.date}</p>
                            </div>
                        </div>
                    </div>`;
                }
            });
        }

        if (type == 'my') {
            if (this.myNews.length == 0) {
                let strStart = `<h3>Укажите интересующие вас категории, чтобы только по ним просматривать новости</h3>`;
                let strCat = '';

                this.allCategories.forEach((e) => {
                    strCat = strCat + `<p><input type="checkbox" name="${e.id}" value="${e.id}"><label for="${e.id}"> ${e.name}</label></p>`
                });

                let strEnd = `<button id="btnmynews"> Показать новости</button>`;
                str = strStart + strCat + strEnd;

                setTimeout(() => {
                    document.getElementById("btnmynews").addEventListener('click', (evt) => {
                        evt.preventDefault();
                        let checkArr = document.querySelectorAll('input.checkbox:checked');
                        let myNewsArr = Array.from(checkArr).map(cb => cb.value);
                        console.log(checkArr);
                        console.log(myNewsArr);
                        return myNewsArr;

                    });

                }, 1000);

            } else {
                console.log('Мои новости');
            }
        }

        this.items.innerHTML = '';
        this.items.insertAdjacentHTML('beforeend', str);

    }
    readNews(id) {
        document.getElementById(`a${id}`).classList.remove('news__article_bold');
        document.getElementById(`r${id}`).classList.add('news__readed_green');
        this.allNews.forEach((e) => {
            if (e.news_id == id) {
                e.readed = true;
                this.count--;
            };
        });
        testResult.renderCount(this.count);
    }
    saveNews(id) {
        document.getElementById(`s${id}`).classList.remove('fa-bookmark-o');
        document.getElementById(`s${id}`).classList.add('fa-bookmark');
        this.allNews.forEach((e) => {
            if (e.news_id == id) {
                e.saved = true;
            };
        });
    }
}
let testResult = new News();