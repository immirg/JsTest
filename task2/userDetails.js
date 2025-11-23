let userId;
const userCardId = document.getElementById('id');
const userCardName = document.getElementById('name');
const userCardUserName = document.getElementById('userName');
const userCardEmail = document.getElementById('email');
const userCardStreet = document.getElementById('street');
const userCardSuite = document.getElementById('suite');
const userCardCity = document.getElementById('city');
const userCardZipcode = document.getElementById('zipcode');
const userCardLat = document.getElementById('lat');
const userCardLng = document.getElementById('lng');
const userCardPhone = document.getElementById('phone');
const userCardWebsite = document.getElementById('website');
const userCardCompanyName = document.getElementById('companyName');
const userCardCatchPhrase = document.getElementById('catchPhrase');
const userCardBs = document.getElementById('bs');
const postOfCurrentUser = document.getElementById('postOfCurrentUser');
const title = document.getElementById('title');


async function userCard() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    const user = await users[userId-1];

    const phone = user.phone.split(' ');
    userCardId.innerHTML = '<strong>id: </strong>' + `${user.id}`;
    userCardName.innerHTML = '<strong>name: </strong>' + `${user.name}`;
    userCardUserName.innerHTML = '<strong>user name: </strong>' + `${user.username}`;
    userCardEmail.innerHTML = '<strong>email: </strong>' + `<a href="mailto: ${user.email}">${user.email}</a>`;
    userCardStreet.innerHTML = '<strong>street: </strong>' + `${user.address.street}`;
    userCardSuite.innerHTML = '<strong>suite: </strong>' + `${user.address.suite}`;
    userCardCity.innerHTML = '<strong>city: </strong>' + `${user.address.city}`;
    userCardZipcode.innerHTML = '<strong>zipcode: </strong>' + `${user.address.zipcode}`;
    userCardLat.innerHTML = '<strong>lat: </strong>' + `${user.address.geo.lat}`;
    userCardLng.innerHTML = '<strong>lng: </strong>' + `${user.address.geo.lng}`;
    userCardPhone.innerHTML = '<strong>phone: </strong>'+`<a href="tel:${phone[0]}">${phone[0]}</a>`+` ${phone[1]}`;
    userCardWebsite.innerHTML = '<strong>website: </strong>' + `<a href="${user.website}">${user.website}</a>`;
    userCardCompanyName.innerHTML = '<strong>company name: </strong>' + `${user.company.name}`
    userCardCatchPhrase.innerHTML = '<strong>catch phrase: </strong>' + `${user.company.catchPhrase}`
    userCardBs.innerHTML = '<strong>bs: </strong>' + `${user.company.bs}`
}

async function init() {
    const currentUrl = window.location.href;
    userId = currentUrl.split('=')[1];
    userCard()
}

postOfCurrentUser.addEventListener('click', async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    const postDetails = await response.json();

    title.style.display = 'flex';
    title.innerText = '';

    console.log(postDetails);
    for (const {title, id} of postDetails) {
        const div = document.createElement('div');
        const textDiv = document.createElement('div');
        const buttonDiv = document.createElement('div');
        const p = document.createElement("p");
        const button = document.createElement("button");
        const a = document.createElement("a");

        div.className = 'title-block';
        textDiv.style.height = '70%';
        div.style.width = '18%';
        div.style.height = '90px';
        div.style.padding = '5px';
        div.style.gap = '5px';
        a.href = `post-details.html?id=${id}&userId=${userId}`;
        p.innerText = title;
        p.style.marginTop = '0';
        button.innerText = 'post details';
        button.id = id;
        buttonDiv.style.merginBottom = '15px';
        div.style.border = '1px solid black';
        div.style.background = '#CABDBDFF';
        div.style.margin = '10px 5px';

        textDiv.appendChild(p);
        buttonDiv.appendChild(a);
        a.append(button);
        div.append(textDiv, buttonDiv);
        this.title.append(div);
    }
});

init()
