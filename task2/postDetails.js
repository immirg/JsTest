let pstId;
let userId;
const wrapper = document.getElementById('wrapper');

async function postDetails() {
    const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    const posts = await responsePosts.json();
    console.log(posts);
    let currPost;
    for (let i = 0; i < posts.length; i++) {
        if (+posts[i].id === +pstId) {
            currPost = posts[i];
        }
    }
    const postDiv = document.createElement("div");
    const postId = document.createElement("p");
    const postUserId = document.createElement("p");
    const postTitle = document.createElement("p");
    const postBody = document.createElement("p");
    const commentsText = document.createElement("p");

    postId.innerHTML = '<strong>post id: </strong>' + `${currPost.id}`;
    postUserId.innerHTML = '<strong>user id: </strong>' + `${currPost.userId}`;
    postTitle.innerHTML = '<strong>postTitle: </strong>' + `${currPost.title}`;
    postBody.innerHTML = '<strong>postBody: </strong>' + `${currPost.body}`;
    postDiv.style.padding = '60px 35px';
    postId.style.marginTop = '5px';
    postTitle.style.marginTop = '5px';
    postUserId.style.marginTop = '5px';
    commentsText.innerHTML = '<strong>Comments:</strong>';

    postBody.style.marginTop = '5px';
    const commentsDiv = document.createElement("div");
    commentsDiv.style.display = 'flex';
    commentsDiv.style.flexWrap = 'wrap';
    commentsDiv.style.justifyContent = 'space-between';
    commentsDiv.style.marginTop = '10px';
    commentsDiv.style.marginLeft = '40px';
    const responseComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${currPost.id}/comments`);
    const comments = await responseComments.json();

    for (const comment of comments) {
        const commentDiv = document.createElement("div");
        const commentPostId = document.createElement("p");
        const commentId = document.createElement("p");
        const commentName = document.createElement("p");
        const commentEmail = document.createElement("p");
        const commentBody = document.createElement("p");

        commentPostId.innerHTML = `<em><strong>post id: </strong> ${comment.postId}</em>`;
        commentId.innerHTML = `<em><strong>id: </strong>${comment.id}</em>`;
        commentName.innerHTML = `<em><strong>name: </strong>${comment.name}</em>`;
        commentEmail.innerHTML = '<em><strong>email: </strong></em>' + `<a href="mailto: ${comment.email}">${comment.email}</a>`;
        commentBody.innerHTML = `<em><strong>body: </strong>${comment.body}</em>`;

        commentPostId.style.marginTop = '0';
        commentPostId.style.paddingTop = '3px';
        commentDiv.style.padding = '0 10px 5px 10px';
        commentDiv.style.marginBottom = '17px';
        commentDiv.style.width = '22%';
        commentDiv.style.border = '1px solid green';
        commentId.style.marginTop = '5px';
        commentName.style.marginTop = '5px';
        commentEmail.style.marginTop = '5px';
        commentBody.style.marginTop = '5px';
        commentDiv.style.background = '#d8d8d8'

        commentDiv.append(commentPostId, commentId, commentName, commentEmail, commentBody);
        commentsDiv.append(commentDiv);
    }

    postDiv.append(postTitle, postId, postUserId, postBody, commentsText, commentsDiv);
    wrapper.append(postDiv);
}

async function init(){
    const currUrl = window.location.href;
    pstId = currUrl.split('=')[1].split('&userId')[0];
    userId = currUrl.split('userId=')[1];
    console.log(pstId);
    console.log(userId);
    postDetails()
}

init();
