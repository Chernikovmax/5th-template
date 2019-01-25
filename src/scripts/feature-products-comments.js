const comments = [];
let commentId = 0;
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

fetch('https://jsonplaceholder.typicode.com/comments/4')
  .then(response => response.json())
  .then(json => comments.push(json));

function renderComments() {
  const commentsField = document.querySelector('.comments');
  let out = '';

// global.comments = comments.

  comments.forEach(function(item) {
    out += `
      <section class="user-comment-wrapper" id="${item.postId}">
        <section class="user-comment__data">
          <img src="../src/icons/avatar.png" class="user-comment__avatar">
          <section class="user-comment__name">${item.name} (${item.email})</section>
          <section class="user-comment__date">${convertTime(item.time)}</section>
        </section>
        <p class="user-comment__text">
          ${item.body}
        </p>
        <button class="reply-comment-btn">REPLY</button>
      </section>
    `;
  });
  commentsField.innerHTML = out;
}

renderComments();

addCommentBtn.addEventListener('click', () => {
  event.preventDefault();
  const commentatorName = document.querySelector('[name="commentator-name"]');
  const commentatorEmail = document.querySelector('[name="commentator-email"]');
  const commentatorText = document.querySelector('[name="comment-text"]');

  let comment = {
    name: commentatorName.value,
    email: commentatorEmail.value,
    time: Math.floor(Date.now()/1000),
    body: commentatorText.value,
    postId: commentId++
  };

  document.querySelector('[name="comment-form"]').reset();

  comments.push(comment);
  showComment(comment);
});

function showComment(obj) {
  const commentsField = document.querySelector('.comments');
  let out = `
      <section class="user-comment-wrapper" id="${obj.postId}">
        <section class="user-comment__data">
          <img src="../src/icons/avatar.png" class="user-comment__avatar">
          <section class="user-comment__name">${obj.name} (${obj.email})</section>
          <section class="user-comment__date">${convertTime(obj.time)}</section>
        </section>
        <p class="user-comment__text">
          ${obj.body}
        </p>
        <button class="reply-comment-btn">REPLY</button>
      </section>
    `;
    console.log(out);
  commentsField.innerHTML = out;
}
// 
// function showReply(obj) {
//
// }

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
