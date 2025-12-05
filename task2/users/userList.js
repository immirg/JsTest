// import {userCard} from "../userDetails/userDetails.js";
const divWrapper = document.getElementById('wrapper');

async function allUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    for (const {id, name} of users) {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const button = document.createElement("button");
        const a = document.createElement("a");

        a.href = `../userDetails/user-details.html?id=${id}`;
        p.innerText = `id: ${id} - ${name}`;
        button.innerText = 'details';
        button.id = `button_${id}`;
        div.classList.add('user-block');

        a.appendChild(button);
        div.append(p, a);
        divWrapper.appendChild(div);
    }
}
allUsers();
