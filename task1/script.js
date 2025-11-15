let nameValue;
const regex = /^[a-zA-Z0-9]+$/;
const letters = /[a-zA-Z]/;
const dlt = document.getElementById("dlt");
let pErrMsg = document.getElementById("pErrMsg");
const addValue = document.getElementById("addValue");
const divErrMsg = document.getElementById("divErrMsg");
const sortByName = document.getElementById("sortByName");
const sortByValue = document.getElementById("sortByValue");
const deleteValues = document.getElementById("deleteValues");

addValue.addEventListener("click", (e) => {
    nameValue = document.getElementById("nameValue").value;
    checkValue();
});

sortByName.addEventListener("click", (e) => {
    sort(0);
});

sortByValue.addEventListener("click", (e) => {
    sort(1);
});

deleteValues.addEventListener("click", (e) => {
    deleteValueFromList();
})

function hiddeErrMsg() {
    document.addEventListener('click', function hide ()  {
        divErrMsg.style.display = "none";
        document.removeEventListener('click', hide);
    });
}

function errorMassage(message) {
    pErrMsg.innerText = message;
    divErrMsg.style.display = 'block';
    console.log(message);
    setTimeout(function () {
        hiddeErrMsg()
        }, 100);
}

function checkValue() {
    if (!nameValue) {
        return errorMassage("Please enter a value");
    }
    if (!nameValue.includes('=')){
        return errorMassage("The key and value must be separated by an equal sign");
    }
    let splitValue = nameValue.split("=");
    if (!splitValue[0] || !splitValue[1]) {
        return errorMassage("Missing key or value");
    }
    if(!letters.test(splitValue[0][0])) {
        return errorMassage('The first character of the key must be a letter');
    }
    if (!regex.test(splitValue[0]) || !regex.test(splitValue[1])) {
        return errorMassage("The key and value can only consist of numbers and letters");
    }
    addValueToList()
}

function addValueToList() {
    let selectList = document.getElementById("nameValueList");
    const option = document.createElement("option");
    option.innerText = nameValue;
    option.style.margin = "0";
    selectList.append(option);
}

function sort(sortBy) {
    let nameValueList = document.getElementById("nameValueList");
    let paragraphs = Array.from(
        nameValueList.querySelectorAll('option')
    );
    for (let i = 0; i < paragraphs.length - 1; i++) {
        for (let j = i+1; j < paragraphs.length; j++) {
            const elem1 = paragraphs[i].textContent.split('=')[sortBy];
            const elem2 = paragraphs[j].textContent.split('=')[sortBy];

            if (elem1 > elem2) {
                const temp = paragraphs[i];
                paragraphs[i] = paragraphs[j];
                paragraphs[j] = temp;
            }
        }
    }
    paragraphs.forEach((p) => {nameValueList.appendChild(p)});
}

function deleteValueFromList() {
    let nameValueList = document.getElementById("nameValueList");
    let selected = Array.from(nameValueList.selectedOptions);
    selected.forEach((elem) => {elem.remove()});
}
