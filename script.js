
function ready() {
    let existDent = JSON.parse(localStorage.getItem('DentistKey'));
    let existCardio=JSON.parse(localStorage.getItem('CardioKey'));
    let existTerapist=JSON.parse(localStorage.getItem('TerapistKey'));

    if(existDent){existDent.forEach(function (item, index, arr) {
        item[index]=refreshCard(item);
    });
    }

    if(existCardio){existCardio.forEach(function (item,index,arr) {
           item[index]= refreshCard(item);
       });
    }

    if(existTerapist){existTerapist.forEach(function (item,index,arr) {
        item[index]=refreshCard(item);
    });
    }

/* создание карточки */
function refreshCard(something) {
let Card=document.createElement("div");
Card.className="cardProperties";
if(something.options==="Dentist") {Card.classList.add("colorDentist");}/* у каждого врача должен быть свой css-класс*/
if(something.options==="Terapist"){Card.classList.add("colorTerapist");}/* у каждого врача должен быть свой css-класс*/

placeCard.appendChild(Card);
info.style.display="none";
modal.style.display="none";

let paragraphOption=document.createElement("h3");
let paragraphName=document.createElement("h3");
let buttonDetails=document.createElement("button");
let buttonDelete=document.createElement("button");
buttonDelete.innerText="Delete";
buttonDelete.className="modalBtn";
buttonDetails.className="modalBtn";
buttonDetails.innerText="See details";
paragraphName.innerText=something.name; /*передаем в DOM элементы значения из объекта*/
paragraphOption.innerText=something.options;  /*передаем в DOM элементы значения из объекта*/
Card.appendChild(paragraphName);
Card.appendChild(paragraphOption);
Card.appendChild(buttonDetails);
Card.appendChild(buttonDelete);
placeCard.appendChild(Card);
makeDragonDrop(Card);//в каждом вызове

/*события по нажатию на кнопки в карточке - отобразить дополнительные данные из объекта*/
buttonDetails.onclick=function(){
    let paragraphDate=document.createElement("h3");
    let paragraphTarget = document.createElement("h3");
    let paragraphAge = document.createElement("h3");
    let paragraphPresure = document.createElement("h3");
    let paragraphBmi = document.createElement("h3");
    let paragraphDiseases = document.createElement("h3");

    if(something.options==="Dentist") {
        paragraphTarget.innerText=something.target;
        paragraphDate.innerText=something.lastVisit;
        Card.insertBefore(paragraphTarget,buttonDetails);
        Card.insertBefore(paragraphDate,buttonDetails);
    }
    if(something.options==="Terapist"){
        paragraphTarget.innerText=something.target;
        paragraphAge.innerText=something.age;
        Card.insertBefore(paragraphTarget,buttonDetails);
        Card.insertBefore(paragraphAge,buttonDetails);
    }
    if(something.options==="Cardiologist"){
        paragraphTarget.innerText=something.target;
        paragraphAge.innerText=something.age;
        paragraphPresure.innerText=something.presure;
        paragraphBmi.innerText=something.mas;
        paragraphDiseases.innerText=something.diseases;
        Card.insertBefore(paragraphTarget,buttonDetails);
        Card.insertBefore(paragraphAge,buttonDetails);
        Card.insertBefore(paragraphPresure,buttonDetails);
        Card.insertBefore(paragraphBmi,buttonDetails);
        Card.insertBefore(paragraphDiseases,buttonDetails);
    }
}
buttonDelete.onclick=function deleteCard(){
    if(something.options==="Dentist") {localStorage.removeItem('DentistKey');}/*должен указываться свой ключ*/
    if(something.options==="Terapist"){localStorage.removeItem('TerapistKey');}
    if(something.options==="Cardiologist"){localStorage.removeItem('CardioKey');}
    Card.remove();
}}}

document.addEventListener("DOMContentLoaded", ready);

/*------------------------Modal--Window-----------------------------------------------------------*/
/*Step OOP*/

var modal=document.getElementById('myModal');
var btn=document.getElementById('myBtn');
var span=document.getElementsByClassName("close")[0];
span.style.cursor="pointer";

btn.onclick=function () {/* функция- открыть модальное окно*/
    modal.style.display="block";
}

span.onclick=function () {/* функция - закрыть модальное окно*/
modal.style.display="none";
}
window.onclick=function (event) {/* функция - закрытие модального окна при нажатии на экране - вне окна*/
    if(event.target===modal){
        modal.style.display="none";
    }
}
/*------------------------Modal--Window-End------------------------------------------------------*/

/*Creation class Visit*/
class Visit {
    constructor(title,fullName,data){
        this._title=title;
        this._fullName=fullName;
        this._data=data;
        this.appointment=false;
    }
    recepton(){
        this.appointment=true;
        console.log('Appointment to '+ `${this._title}` + ' was successful');
    }
    get title(){
        return this._title;
    }
    get fullName(){
        return this._fullName;
    }
    get data(){
        return this._data;
    }
    set title(value){
        this._title=value;
    }
}

class Cardiolodist extends Visit{
    constructor(title,fullName,visitTarget,bloodPressure,bmi,diseases,age){
        super(title,fullName);
        this.visitTarget=visitTarget;
        this.presure=bloodPressure;
        this.bmi=bmi;/* body mass index*/
        this.diseases=diseases;
        this.age=age;
    }
    recepton() {
        super.recepton();
        console.log('Appointment to '+ `${this.title}` +'from Cardiologist class');
    }
}

class Dentist extends Visit{
    constructor(title,fullName,data,visitTarget){
        super(title,fullName,data);
        this.visitTarget=visitTarget;
    }

}

class Terapist extends Visit{
    constructor(title,fullName,visitTarget,age){
        super(title,fullName);
        this.visitTarget=visitTarget;
        this.age=age;
    }

}

var info=document.getElementsByTagName("h2")[0];
var placeCard=document.getElementsByClassName("main")[0];
var modalBtn=document.getElementById("myCard");
var cardioForm=document.getElementById("cardio");
var terapistForm=document.getElementById("terapist");
var dentistForm=document.getElementById("dentist");


/*-------------------------Receiving--Data--from--User----------------------*/
function doctorFunction() {/*получение значения option*/
    var elementOption = document.getElementById('mySelect');
    var userOption =elementOption.options[elementOption.selectedIndex].text;
    if (userOption === "Dentist") {
        dentistForm.classList.remove("hide-form");
        terapistForm.classList.add("hide-form");
        cardioForm.classList.add("hide-form");

    } else if (userOption === "Terapist") {
        dentistForm.classList.add("hide-form");
        terapistForm.classList.remove("hide-form");
        cardioForm.classList.add("hide-form");

    } else if (userOption === "Cardiologist") {
        dentistForm.classList.add("hide-form");
        terapistForm.classList.add("hide-form");
        cardioForm.classList.remove("hide-form");
    }

}
let arrCards= [];
function cardioCreateCard(form) {
   elementOption=document.getElementById('mySelect');
   userOption=elementOption.options[elementOption.selectedIndex].text;

   var userName=form.name.value;    /*получаем данные в переменные из формы*/
   var userTarget=form.target.value;
   var userPressure=form.pressure.value;
   var userMass=form.mass.value;
   var userDiseases=form.diseases.value;
   var userAge=form.age.value;

   /* создать объект для хранения значений пользователя*/
   let objCardio = { options: userOption, name : userName,target :userTarget, presure : userPressure, mas : userMass, diseases: userDiseases,age: userAge}
   arrCards.push(objCardio);

   localStorage.setItem("CardioKey",JSON.stringify(arrCards));

    var cardioCard=new Cardiolodist(userOption,userName,userTarget,userPressure,userMass,userDiseases,userAge);
    form.reset();


    /* создание карточки */
    var Card=document.createElement("div");
    Card.className="cardProperties";
    placeCard.appendChild(Card);
    info.style.display="none";
    modal.style.display="none";

    let paragraphOption=document.createElement("h3");
    let paragraphName=document.createElement("h3");
    let buttonDetails=document.createElement("button");
    let buttonDelete=document.createElement("button");
    buttonDelete.innerText="Delete";
    buttonDelete.className="modalBtn";
    buttonDetails.className="modalBtn";
    buttonDetails.innerText="See details";
    paragraphName.innerText=cardioCard.fullName; /*передаем в DOM элементы значения из объекта*/
    paragraphOption.innerText=cardioCard.title;  /*передаем в DOM элементы значения из объекта*/
    Card.appendChild(paragraphName);
    Card.appendChild(paragraphOption);
    Card.appendChild(buttonDetails);
    Card.appendChild(buttonDelete);
    placeCard.appendChild(Card);
    makeDragonDrop(Card);//в каждом вызове

    /*события по нажатию на кнопки в карточке - отобразить дополнительные данные из объекта*/
    buttonDetails.onclick=function(){
        let paragraphTarget=document.createElement("h3");
        let paragraphAge=document.createElement("h3");
        let paragraphPresure=document.createElement("h3");
        let paragraphBmi=document.createElement("h3");
        let paragraphDiseases=document.createElement("h3");
        paragraphTarget.innerText=cardioCard.visitTarget;
        paragraphAge.innerText=cardioCard.age;
        paragraphPresure.innerText=cardioCard.presure;
        paragraphBmi.innerText=cardioCard.bmi;
        paragraphDiseases.innerText=cardioCard.diseases;
        Card.insertBefore(paragraphTarget,buttonDetails);
        Card.insertBefore(paragraphAge,buttonDetails);
        Card.insertBefore(paragraphPresure,buttonDetails);
        Card.insertBefore(paragraphBmi,buttonDetails);
        Card.insertBefore(paragraphDiseases,buttonDetails);
    }
    buttonDelete.onclick=function deleteCard(){
        localStorage.removeItem('CardioKey');
        Card.remove();

    }
    info.style.display="none";
    modal.style.display="none";
}
let arrCardsDentist= [];
function dentistCreateCard(form){
    elementOption=document.getElementById('mySelect');
    userOption=elementOption.options[elementOption.selectedIndex].text;
    userName=form.name.value;
    userTarget=form.target.value;
    userDate=form.lastVisit.value;

    let objDent = {options: userOption, name: userName, target: userTarget, lastVisit: userDate}
    arrCardsDentist.push(objDent);

    localStorage.setItem("DentistKey", JSON.stringify(arrCardsDentist));
    var dentistCard=new Dentist(userOption,userName,userDate,userTarget);
    form.reset();


    /* создание карточки */
    dentistCard.recepton();
    console.log(dentistCard);
    var Card=document.createElement("div");
    Card.className="cardProperties";
    Card.classList.add("colorDentist");
    placeCard.appendChild(Card);
    info.style.display="none";
    modal.style.display="none";

    let paragraphOption=document.createElement("h3");
    let paragraphName=document.createElement("h3");
    let buttonDetails=document.createElement("button");
    let buttonDelete=document.createElement("button");
    buttonDelete.innerText="Delete";
    buttonDelete.className="modalBtn";
    buttonDetails.className="modalBtn";
    buttonDetails.innerText="See details";
    paragraphName.innerText=dentistCard.fullName; /*передаем в DOM элементы значения из объекта*/
    paragraphOption.innerText=dentistCard.title; /*передаем в DOM элементы значения из объекта*/
    Card.appendChild(paragraphName);
    Card.appendChild(paragraphOption);
    Card.appendChild(buttonDetails);
    Card.appendChild(buttonDelete);
    placeCard.appendChild(Card);
    makeDragonDrop(Card);//в каждом вызове


    /*события по нажатию на кнопки в карточке - отобразить дополнительные данные из объекта*/
    buttonDetails.onclick=function(){
        let paragraphTarget=document.createElement("h3");
        let paragraphDate=document.createElement("h3");
        paragraphTarget.innerText=dentistCard.visitTarget;
        paragraphDate.innerText=dentistCard.data;
        Card.insertBefore(paragraphTarget,buttonDetails);
        Card.insertBefore(paragraphDate,buttonDetails);
    }
    buttonDelete.onclick=function deleteCard(){
        localStorage.removeItem('DentistKey');
        Card.remove();
    }
    info.style.display="none";
    modal.style.display="none";
}
let arrCardsTerapist= [];
function terapistCreateCard(form){
    elementOption=document.getElementById('mySelect');
    userOption=elementOption.options[elementOption.selectedIndex].text;
    userName=form.name.value;
    userTarget=form.target.value;
    userAge=form.age.value;

    /* создать объект для хранения значений пользователя*/
    let objTerapist = { options: userOption, name : userName,target :userTarget, age: userAge };
    arrCardsTerapist.push(objTerapist);
    localStorage.setItem("TerapistKey",JSON.stringify(arrCardsTerapist));

    var terapistCard=new Terapist(userOption,userName,userTarget,userAge);
    form.reset();


    /* создание карточки */
    terapistCard.recepton();
    console.log(terapistCard);
    var Card=document.createElement("div");
    Card.className="cardProperties";
    Card.classList.add("colorTerapist");

    let paragraphOption=document.createElement("h3");
    let paragraphName=document.createElement("h3");
    let buttonDetails=document.createElement("button");
    let buttonDelete=document.createElement("button");
    buttonDelete.innerText="Delete";
    buttonDelete.className="modalBtn";
    buttonDetails.className="modalBtn";
    buttonDetails.innerText="See details";
    paragraphName.innerText=terapistCard.fullName; /*передаем в DOM элементы значения из объекта*/
    paragraphOption.innerText=terapistCard.title;  /*передаем в DOM элементы значения из объекта*/
    Card.appendChild(paragraphName);
    Card.appendChild(paragraphOption);
    Card.appendChild(buttonDetails);
    Card.appendChild(buttonDelete);
    placeCard.appendChild(Card);
    makeDragonDrop(Card);//в каждом вызове

    /*события по нажатию на кнопки в карточке - отобразить дополнительные данные из объекта*/
    buttonDetails.onclick=function(){
        let paragraphTarget=document.createElement("h3");
        let paragraphAge=document.createElement("h3");
        paragraphTarget.innerText=terapistCard.visitTarget;
        paragraphAge.innerText=terapistCard.age;
        Card.insertBefore(paragraphTarget,buttonDetails);
        Card.insertBefore(paragraphAge,buttonDetails);
    }
    buttonDelete.onclick=function deleteCard(){
        Card.remove();

    }
    info.style.display="none";
    modal.style.display="none";
}
const  desk=document.getElementsByClassName('main')[0];

function makeDragonDrop(cardTarget) {
    let card = cardTarget;
    function move(e) {
        let cord = card.getBoundingClientRect();
        let dek = desk.getBoundingClientRect();
        if ((cord.x - 20 - dek.x) < 0) {
            card.mousePositionX = e.clientX + card.offsetLeft - 20;
        }
        if ((cord.y - 20 - dek.y) < 0) {
            card.mousePositionY = e.clientY + card.offsetTop - 20;
        }
        if (((dek.x + dek.width) - (cord.x + cord.width + 20)) < 0) {
            card.mousePositionX = (card.offsetLeft + cord.width - dek.width) + e.clientX + 30;
        }
        if (((dek.y + dek.height) - (cord.y + cord.height + 20)) < 0) {
            card.mousePositionY = (card.offsetTop + cord.height - dek.height) + e.clientY + 30;
        }
        card.style.transform = `translate(${e.clientX - card.mousePositionX}px,${e.clientY - card.mousePositionY}px)`;
    }

    card.addEventListener('mousedown',(e)=>{
        if (card.style.transform) {
            const transforms = card.style.transform;
            const transformX = parseFloat(transforms.split('(')[1].split(',')[0]);
            const transformY = parseFloat(transforms.split('(')[1].split(',')[1]);
            card.mousePositionX = e.clientX - transformX;
            card.mousePositionY = e.clientY - transformY;
        } else {
            card.mousePositionX = e.clientX;
            card.mousePositionY = e.clientY;
        }
        document.addEventListener('mousemove',move);
    });

    document.addEventListener('mouseup', e => {

        document.removeEventListener('mousemove',move);
    });
}







