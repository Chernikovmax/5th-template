import {convertTime, validateEmail} from './utils';

(function () {
  const commentsField = document.querySelector('.comments');
  const addCommentBtn = document.getElementById('add-comment');
  let comments = [];

  const topCommentsNav = document.querySelector('#top-comments-nav');
  const bottomCommentsNav = document.querySelector('#bottom-comments-nav');

  const fetchComments = () => {
    return fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json());
  };

  // const renderComment = (comment) => {
  //   const commentsField = document.querySelector('.comments');
  //   let out = `
  //       <section class="user-comment__data">
  //         <img src="../src/icons/avatar.png" class="user-comment__avatar">
  //         <section class="user-comment__name">${comment.name} (${comment.email})</section>
  //         <section class="user-comment__date">${convertTime(comment.time)}</section>
  //       </section>
  //       <p class="user-comment__text">
  //         ${comment.body}
  //       </p>
  //       <button class="reply-comment-btn" id="${comment.id}" type="submit">REPLY</button>
  //   `;
  //   let commentElement = document.createElement('section');
  //   commentElement.setAttribute('class', 'user-comment-wrapper');
  //   commentElement.innerHTML = out;
  //
  //   commentsField.insertBefore(commentElement, commentsField.firstChild);
  // }

  const renderComments = (commentsList) => commentsList.forEach((item) => {
    let out = `
      <section class="user-comment__data">
        <img src="../src/icons/avatar.png" class="user-comment__avatar">
        <section class="user-comment__name">${item.name} (${item.email})</section>
        <section class="user-comment__date">${convertTime(item.time)}</section>
      </section>
      <p class="user-comment__text">
        ${item.body}
      </p>
      <button class="reply-comment-btn" id="${item.id}" type="submit">REPLY</button>
  `;
    let comment = document.createElement('section');
    comment.setAttribute('class', 'user-comment-wrapper');
    comment.innerHTML = out;
    commentsField.insertBefore(comment, commentsField.firstChild);
  });

// ----------------------Button wich activates comment field ---------------------
  let commentsRendered = false;
  const showCommentsBtn = document.querySelector('.show-comments-btn');

  function activateComments() {
    if (commentsRendered === false) {
      commentsRendered = true;
      showCommentsBtn.innerText = 'Hide comments';
    } else {
      commentsRendered = false;
      showCommentsBtn.innerText = 'Show comments';
      }
    document.querySelector('.comments-field').classList.toggle('comments-field--active');
    renderCommentBundleBtns();
    return renderComments(comments.slice((comments.length >= 15) ? comments.length-15 : 0));
  }

  showCommentsBtn.addEventListener('click', activateComments);

// --------------------------------------------------------------------------------

// ----------------------Button wich add a new comment and render it immediatly------------------------------

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
    comments.push(comment);

    document.querySelector('[name="comment-form"]').reset();

    // comments = [...comments, comment];
    renderCommentBundleBtns();
    renderComments(comments.slice((comments.length >= 15) ? comments.length-15 : 0));
  };

  addCommentBtn.addEventListener('click', addCommentButton);

// ------------------------------------------------------------------------------------

  fetchComments().then((data) => {
    comments = data;
    global.comments = comments;
  });
// .then(alert(comments.length))
  // alert(comments.lenght);
  // renderCommentBundleBtns();

  function renderCommentBundleBtns() {
    clearComments();

    const sortedCommentsQuantity = Math.ceil(comments.length/15);

    createBtn("comments-nav__btn", "comments-nav__prev", "<", topCommentsNav);
    createBtn("comments-nav__btn", "comments-nav__prev", "<", bottomCommentsNav);

    for (let i = 0; i < sortedCommentsQuantity; i++) {
      createBtn("comments-nav__btn", `comments-top${i}`, i+1, topCommentsNav, `renderCertainComments(${i})`);
      createBtn("comments-nav__btn", `comments-bottom${i}`, i+1, bottomCommentsNav, `renderCertainComments(${i})`);
    }

    createBtn("comments-nav__btn", "comments-nav__next", ">", topCommentsNav);
    createBtn("comments-nav__btn", "comments-nav__next", ">", bottomCommentsNav);
  }

  function renderCertainComments(index) {
    let end = (comments.length) - ((index) * 15);
    let begin = end - 15;
    if (begin < 0) {begin = 0;}
    clearComments();
    renderCommentBundleBtns();
    renderComments(comments.slice(begin, end));
  }
  global.renderCertainComments = renderCertainComments;

  // let buttons = document.querySelectorAll('.comments-nav__btn');
  // parseInt(buttons[1].innerText, 10);

  function createBtn(btnClass, btnId, btnName, btnLocation, onClick) {
    let commentsBundleBtn = document.createElement("button");
    commentsBundleBtn.setAttribute('class', `${btnClass}`);
    commentsBundleBtn.setAttribute('id', `${btnId}`);
    if (onClick) {
      commentsBundleBtn.setAttribute('onclick', `${onClick}`);
    }
    commentsBundleBtn.innerHTML = btnName;
    btnLocation.appendChild(commentsBundleBtn);
  }

  function clearComments() {
    topCommentsNav.innerHTML = '';
    commentsField.innerHTML = '';
    bottomCommentsNav.innerHTML = '';
  }
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
