//import 'bootstrap';
import {createMySender} from "./mySender.js";
const REQ_URL = 'https://api.slapform.com/6GwzT3iSU';

function addAnswer(idAnswer, text){
    const ans = document.querySelector(`${idAnswer}`);

    ans.textContent = text;
}

const mySender = createMySender(REQ_URL,'#form');

document.querySelector('#form').addEventListener('submit', (event) => {
    event.preventDefault();
    const sending = document.querySelector('.sending');

    sending.classList.add('show-block');
    addAnswer('#answer', '');
    mySender.send()
        .then((resp) => {
            addAnswer('#answer', resp);
            console.log(mySender.getStatus());
            sending.classList.remove('show-block');
        })
});

document.querySelector('#cancelBtn').addEventListener('click', (event) => {
    event.preventDefault();
    mySender.cancel();
})