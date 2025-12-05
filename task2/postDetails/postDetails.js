let pstId;
let userId;
const wrapper = document.getElementById('wrapper');

async function postDetails() {
    const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts/${pstId}`);
    const currPost = await responsePosts.json();
    const postDiv = document.createElement("div");
    await post(currPost, postDiv);
    postDiv.classList.add("post-div");

    const commentsText = document.createElement("p");
    commentsText.innerHTML = '<strong>Comments:</strong>';
    const commentsDiv = document.createElement("div");
    commentsDiv.classList.add('div-comments');

    const responseComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${currPost.id}/comments`);
    const comments = await responseComments.json();

    for (const comment of comments) {
        commentsToThePost(comment, commentsDiv);
    }
    postDiv.append(commentsText, commentsDiv);
    wrapper.append(postDiv);
}

function commentsToThePost(comment, commentsDiv) {
    const userComments = {
        'post id': comment => comment.postId,
        'id': comment => comment.id,
        'name': comment => comment.name,
        'email': comment => `<a href="mailto: ${comment.email}">${comment.email}</a>`,
        'body': comment => comment.body,
    }
    const div = document.createElement("div");
    div.classList.add('div-comment');
    for (const [key, value] of Object.entries(userComments)) {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${key}: </strong>${value(comment)}`;
        div.append(p);
    }
    commentsDiv.append(div);
}

async function post(currPost, postDiv) {
    const userPost = {
        id: currPost => currPost.id,
        userId: currPost => currPost.userId,
        title: currPost => currPost.title,
        body: currPost => currPost.body,
    }
    for (const [key, value] of Object.entries(userPost)) {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${key}: </strong>` + `${value(currPost)}`;
        postDiv.append(p);
    }
}

async function init(){
    const params = new URLSearchParams(window.location.search);
    userId = params.get('userId');
    pstId = Number(params.get('id'));
    postDetails()
}

init();
