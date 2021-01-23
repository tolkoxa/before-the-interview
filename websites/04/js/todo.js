class Todo {
    constructor() {
        this.allData; //массив из json–файла
        this.task = document.getElementById('task'); //разметка, куда рендерится список дел.
        this._init();
    }
    _init() {
        this.getList();
    }

    async getList() {
        let response = await fetch('data/todo.json');
        this.allData = await response.json();

        // delete this.allData[0];
        this.render();
    }

    render() {
        this.task.innerHTML = '';
        this.task.insertAdjacentHTML('beforeend', `
        <div class="task__item" id="1">
                    <div class="task__numb" id="numb">1</div>
                    <input class="task__name" id="name" type="text" placeholder="">
                    <div class="task__del" id="del">&times;</div>
                </div>
        `);
        document.getElementById('name').focus();
        console.log(this.allData)
    }

}

let MyWork = new Todo();