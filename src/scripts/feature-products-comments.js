const comments = [];
const addCommentBtn = document.getElementById('add-comment');

fetch('https://jsonplaceholder.typicode.com/comments/1')
  .then(response => response.json())
  .then(json => comments.push(json));

fetch('https://jsonplaceholder.typicode.com/comments/2')
  .then(response => response.json())
  .then(json => comments.push(json));

fetch('https://jsonplaceholder.typicode.com/comments/3')
  .then(response => response.json())
  .then(json => comments.push(json));

fetch('https://jsonplaceholder.typicode.com/comments/4')
  .then(response => response.json())
  .then(json => comments.push(json));

fetch('https://jsonplaceholder.typicode.com/comments/5')
  .then(response => response.json())
  .then(json => comments.push(json));

let commentId = comments.length;

function renderComments() {
  const commentsField = document.querySelector('.comments');

comments.forEach((item) => {
  let out = `
      <section class="user-comment__data">
        <img src="../src/icons/avatar.png" class="user-comment__avatar">
        <section class="user-comment__name">${item.name} (${item.email})</section>
        <section class="user-comment__date">Jan/29/2019 20:42:09</section>
      </section>
      <p class="user-comment__text">
        ${item.body}
      </p>
      <button class="reply-comment-btn" id="${item.id}" type="submit">REPLY</button>
  `;
  let comment = document.createElement('section');
  comment.setAttribute('class', 'user-comment-wrapper');
  // comment.setAttribute('id', `${item.postId}`);
  comment.innerHTML = out;
  commentsField.appendChild(comment);
});
}

setTimeout(renderComments, 1000);

addCommentBtn.addEventListener('click', () => {
  // event.preventDefault();
  const commentatorName = document.querySelector('[name="commentator-name"]');
  const commentatorEmail = document.querySelector('[name="commentator-email"]');
  const commentatorText = document.querySelector('[name="comment-text"]');

    if(commentatorName.value == "" || commentatorEmail.value == "" || commentatorText.value == "") {
      return;
    }

    if(validateEmail(commentatorEmail.value) !== true) return;

  let comment = {
    name: commentatorName.value,
    email: commentatorEmail.value,
    time: Math.floor(Date.now()/1000),
    body: commentatorText.value,
    id: comments.length +1
  };

  document.querySelector('[name="comment-form"]').reset();

  comments.push(comment);
  printComment(comment);
});

function printComment(obj) {
  const commentsField = document.querySelector('.comments');
  let out = `
        <section class="user-comment__data">
          <img src="../src/icons/avatar.png" class="user-comment__avatar">
          <section class="user-comment__name">${obj.name} (${obj.email})</section>
          <section class="user-comment__date">${convertTime(obj.time)}</section>
        </section>
        <p class="user-comment__text">
          ${obj.body}
        </p>
        <button class="reply-comment-btn" id="${obj.id}" type="submit">REPLY</button>
    `;
  let comment = document.createElement('section');
  comment.setAttribute('class', 'user-comment-wrapper');
  comment.innerHTML = out;

  commentsField.appendChild(comment);
}



function convertTime(secs) {
  const d = new Date(secs * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  const time = `${month}/${date}/${year} ${addZeros(hour)}:${addZeros(min)}:${addZeros(sec)}`
  return time;
}

function addZeros(num) {
  if(String(num).length < 2) {
    return `0${num}`;
  } else return num;
}

function validateEmail(email) {
  var required = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return required.test(email);
}
