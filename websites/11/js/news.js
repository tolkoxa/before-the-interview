class News {
    constructor() {
        this._init();
        this.allCategories;
        this.allNews;
        this.myNews = [];
        this.saved = [];
        this.count = 0;
        this.numberid = document.getElementById('number');


        document.getElementById("newnews").addEventListener('click', (evt) => {
            evt.preventDefault();
            document.getElementById("window").classList.toggle("invisible");
            this.renderWindow();
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
        console.log(this.allNews);
        this.allNews.forEach((item) => {
            console.log(item.readed);
            (!item.readed) ? this.count++: this.count + 0;
        });
        this.renderCount(this.count);
    }

    renderCount(count) {
        this.numberid.classList.toggle('invisible');
        this.numberid.insertAdjacentHTML('beforeend', count);

    }

    renderWindow() {
        this.allNews.forEach((e) => {

        })
    }

    renderNews() {
        let str = `<div class="news__item">
        <p class="news__pic">
            <img class="news__img" alt="Новости">
        </p>
        <div class="news__data">
            <div class="news__text">
                <a class="news__article" href="#">Прокуратура начала проверку из-за ЧП с попавшими под лавину в Хибинах</a>
                <div class="news__symbols">
                    <p class="news__save">
                        <span class="fa fa-bookmark-o" aria-hidden="true"></span>
                    </p>
                    <p class="news__readed">
                        <span class="fa fa-check" aria-hidden="true"></span>
                    </p>
                </div>
            </div>
            <div class="news__info">
                <p class="news__author">Иван К.</p>
                <p class="news__category">//Культура</p>
                <p class="news__date">22.02.2021 21:38</p>
            </div>
        </div>
    </div>`;
    }
}
let testResult = new News();