class Pult {
    constructor() {
        this.allPortfolio = []

        this._init();
    }

    _init() {
        this.getItems();
        this.renderItems();

    }
    async getItems() {
        let response = await fetch('data/pult.json');
        this.allPortfolio = await response.json();
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
        this.allPortfolio.forEach((e) => {
            console.log(`Номер ${e.id}. ${e.subtitle}.
            И ещё ${e.text}`);
        })
    }
}

let resultTest = new Pult();

//element.offsetWidth