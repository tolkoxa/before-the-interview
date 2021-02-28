let dates = document.getElementById('sale');
let date = new Date(),
    searchDay = 1, //0–вс, 1–пн, 2–вт, 3–ср, 4–пт, 6–сб
    secondDate = new Date(),
    delta = searchDay - date.getDay();
if (delta >= 0) { secondDate.setDate(date.getDate() + delta) } else { secondDate.setDate(date.getDate() + 7 + delta) };

let day = (secondDate.getDate() < 10) ? `0${secondDate.getDate()}` : secondDate.getDate();
let month = ((secondDate.getMonth() + 1) < 10) ? `0${secondDate.getMonth()+1}` : secondDate.getMonth() + 1;

let str = `${day}.${month}.${secondDate.getFullYear()-2000}`;

dates.innerHTML = '';
dates.insertAdjacentHTML('beforeend', str);