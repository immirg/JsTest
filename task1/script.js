let nameValue;
const regex = /^[a-zA-Z0-9]+$/;
let pErrMsg = document.getElementById("pErrMsg");
const addValue = document.getElementById("addValue");
const divErrMsg = document.getElementById("divErrMsg");
const sortByName = document.getElementById("sortByName");
const sortByValue = document.getElementById("sortByValue");
const deleteValues = document.getElementById("deleteValues");

addValue.addEventListener("click", () => {
    // debugger
    nameValue = document.getElementById("nameValue").value.trim();
    checkValue();
    document.getElementById("nameValue").value = '';
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        nameValue = document.getElementById("nameValue").value.trim();
        checkValue();
        document.getElementById("nameValue").value = '';
    }
});

sortByName.addEventListener("click", () => {
    sort(0);
});

sortByValue.addEventListener("click", () => {
    sort(1);
});

deleteValues.addEventListener("click", () => {
    deleteValueFromList();
})

function hideErrMsg() {
    document.addEventListener('click', function hide ()  {
        divErrMsg.style.display = "none";
        document.removeEventListener('click', hide);
    });
}

function errorMessage(message) {
    pErrMsg.innerText = message;
    divErrMsg.style.display = 'block';
    console.log(message);
    setTimeout(function () {
        hideErrMsg()
        }, 100);
}

function checkValue() {
    if (!nameValue) {
        return errorMessage("Please enter a value");
    }
    if (!nameValue.includes('=')){
        return errorMessage("The key and value must be separated by an equal sign");
    }
    let splitValue = nameValue.split('=');
    if (splitValue.length !== 2) {
        return errorMessage("there is more than one equal sign");
    }
    if (!splitValue[0] || !splitValue[1]) {
        return errorMessage("Missing key or value");
    }
    if (!regex.test((splitValue[0]).trim()) || !regex.test((splitValue[1]).trim())) {
        return errorMessage("The key and value can only consist of numbers and letters");
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
    const sortedList = paragraphs.sort((a, b) => {
        const valueA = a.textContent.split('=')[sortBy];
        const valueB = b.textContent.split('=')[sortBy];

        const numA = Number(valueA);
        const numB = Number(valueB);
        const isNumA = !Number.isNaN(numA);
        const isNumB = !Number.isNaN(numB);

        if (isNumA && isNumB) {
            return numA - numB;
        }
        return valueA.localeCompare(valueB)
    });

    sortedList.forEach((p) => {nameValueList.appendChild(p)});
}

function deleteValueFromList() {
    let nameValueList = document.getElementById("nameValueList");
    let selected = Array.from(nameValueList.selectedOptions);
    selected.forEach((elem) => {elem.remove()});
}
