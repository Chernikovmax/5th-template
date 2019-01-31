import {convertTime, validateEmail} from './utils';

(function () {
  const commentsField = document.querySelector('.comments');
  const addCommentBtn = document.getElementById('add-comment');
  let comments = [];

  const fetchComments = () => {
    return fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json());
  };

  const renderComment = (comment) => {
    const commentsField = document.querySelector('.comments');
    let out = `
        <section class="user-comment__data">
          <img src="../src/icons/avatar.png" class="user-comment__avatar">
          <section class="user-comment__name">${comment.name} (${comment.email})</section>
          <section class="user-comment__date">${convertTime(comment.time)}</section>
        </section>
        <p class="user-comment__text">
          ${comment.body}
        </p>
        <button class="reply-comment-btn" id="${comment.id}" type="submit">REPLY</button>
    `;
    let commentElement = document.createElement('section');
    commentElement.setAttribute('class', 'user-comment-wrapper');
    commentElement.innerHTML = out;

    commentsField.appendChild(commentElement);
  }

  const renderComments = (comments1) => comments1.forEach((item) => {

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
    comment.innerHTML = out;
    commentsField.appendChild(comment);
  });

  const addCommentButton = () => {
    const commentatorName = document.querySelector('[name="commentator-name"]');
    const commentatorEmail = document.querySelector('[name="commentator-email"]');
    const commentatorText = document.querySelector('[name="comment-text"]');

    if (commentatorName.value === "" || commentatorEmail.value === "" || commentatorText.value === "") {
      return;
    }

    if (validateEmail(commentatorEmail.value) !== true) return;

    let comment = {
      name: commentatorName.value,
      email: commentatorEmail.value,
      time: Math.floor(Date.now() / 1000),
      body: commentatorText.value,
      id: comments.length + 1
    };

    document.querySelector('[name="comment-form"]').reset();

    comments = [...comments, comment];
    renderComment(comment);
  };

  addCommentBtn.addEventListener('click', addCommentButton);

  fetchComments().then((data) => {
    comments = data.slice(2);
    renderComments(comments);
  });
})();

/*
const commentList = {
  comments: [{
    title: 'sdf',
    id: 'asd',
    subComments: [{}]
  }],
}
*/
