let userId;
const postOfCurrentUser = document.getElementById('postOfCurrentUser');
const title = document.getElementById('title');


async function userCard() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await response.json();
    const phone = user.phone.split(' ');
    const phoneCode = phone[1] !== undefined ? phone[1] : '';
    const userFields = {
        id: user => user.id,
        name: user => user.name,
        userName: user => user.username,
        email: user => `<a href="mailto:${user.email}">${user.email}</a>`,
        street: user => user.address.street,
        suite: user => user.address.suite,
        city: user => user.address.city,
        zipcode: user => user.address.zipcode,
        lat: user => user.address.geo.lat,
        lng: user => user.address.geo.lng,
        phone: user => `<a href="tel:${phone[0]}">${phone[0]}</a> ${phoneCode}`,
        website: user => `<a href="http://${user.website}">${user.website}</a>`,
        companyName: user => user.company.name,
        catchPhrase: user => user.company.catchPhrase,
        bs: user => user.company.bs,
    };
    for (const [key, value] of Object.entries(userFields)) {
        const elem = document.getElementById(key);
        elem.innerHTML = `<strong>${key}: </strong>${value(user)}`;
    }
}

async function init() {
    const params = new URLSearchParams(window.location.search);
    userId = params.get('id');
    userCard()
}

postOfCurrentUser.addEventListener('click', async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    const postDetails = await response.json();
    title.style.display = 'flex';
    title.innerText = '';
    for (const post of postDetails) {
        const div = document.createElement('div');
        const textDiv = document.createElement('div');
        const buttonDiv = document.createElement('div');
        const p = document.createElement("p");
        const button = document.createElement("button");
        const a = document.createElement("a");

        div.classList.add('title-block');
        textDiv.classList.add('text-div');
        a.href = `../postDetails/post-details.html?id=${post.id}&userId=${userId}`;
        p.innerText = post.title;
        p.style.marginTop = '0';
        button.innerText = 'post details';
        button.id = post.id;

        textDiv.appendChild(p);
        buttonDiv.appendChild(a);
        a.append(button);
        div.append(textDiv, buttonDiv);
        title.append(div);
    }
});

init()
