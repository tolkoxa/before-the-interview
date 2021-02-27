let dates = document.querySelectorAll('.news__subtitle');

let months = ['января', 'февраля', 'марта', 'апреля', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    date = new Date(),
    searchDay = 1, //0–вс, 1–пн, 2–вт, 3–ср, 4–пт, 6–сб
    secondDate = new Date(),
    delta = searchDay - date.getDay();
if (delta >= 0) { secondDate.setDate(date.getDate() + delta) } else { secondDate.setDate(date.getDate() + 7 + delta) }
let str = `${secondDate.getDate()} ${months[secondDate.getMonth()]} ${secondDate.getFullYear()}`;

dates.forEach((e) => {
    e.innerHTML = '';
    e.insertAdjacentHTML('beforeend', str);
})