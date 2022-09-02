const userSurname = document.querySelector('[name="surname"]');
const userName =  document.querySelector('[name="name"]');

const goodsElements = document.querySelectorAll('[name="goods"]');
const countElements =  document.querySelectorAll('[type="number"]');

const btn = document.querySelector(".btn");
const resultElem = document.querySelector(".sum");

let sum = 0;


btn.addEventListener("click", function() {
    if (userName.value !== '' && userSurname.value !== '') {
        if (sum === 0) {
            alert (`Заказачик: ${userSurname.value} ${userName.value} \nВыберите товары`);
        }
        else {
            alert (`Заказачик: ${userSurname.value} ${userName.value} \nИтого: ${sum} р.`);
        }
    }
    else if (userName.value === '' && userSurname.value !== '') {
        alert ("Пожалуйста, введите имя");
    }
    else if (userName.value !== '' && userSurname.value === '') {
        alert ("Пожалйста, введите фамилию");
    }
    else {
        alert ("Пожалуйста, введите имя и фамилию");
    }
});

goodsElements.forEach((element, i) => {
    element.addEventListener("change", function() { 
        if (element.checked && countElements[i].value === 0) {
            countElements[i].value = 1;
        }
        if (!element.checked) {
            countElements[i].value = 0;
        }
        reloadPrice();
        resultElem.textContent = `${sum} р.`;
    });
});
countElements.forEach((element, i) => {
    element.addEventListener("change", function() {
        element.onblur = () => {
            if(/^0\d+|^$|[^\d]/.test(element.value)) {
                alert ('ВНИМАНИЕ! ДАННЫЕ ВВЕДЕНЫ НЕКОРРЕКТНО!');
                element.value = 0;
                element.focus();
            }
            if (element.value === 0) {
                goodsElements[i].checked = false;
                reloadPrice();
            }
            else {
                goodsElements[i].checked = true;
                reloadPrice();
            }
            if (goodsElements[i].checked) {
                reloadPrice();
            }
            resultElem.textContent = `${sum} р.`;
        }
    });
});

function reloadPrice() {
    curSum = 0;
    goodsElements.forEach((el, i) => {
        if (el.checked) {
            curSum += el.value * countElements[i].value;
        }
    })
    sum = curSum;
}