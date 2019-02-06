import {convertTime, validateEmail} from './utils';

(function () {
  const commentsField = document.querySelector('.comments');
  const addCommentBtn = document.getElementById('add-comment');
  let comments = [];

  const topCommentsNav = document.querySelector('#top-comments-nav');
  const bottomCommentsNav = document.querySelector('#bottom-comments-nav');
  let commentBundleIndex;

  const fetchComments = () => {
    return fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json());
  };

  const renderComments = (commentsList) => commentsList.forEach((item) => {
    let out = `
      <a name="anchor-${item.id}"></a>
      <section class="user-comment__data">
        <img src="../src/icons/avatar.png" class="user-comment__avatar">
        <section class="user-comment__name">${item.name} (${item.email})</section>
        <section class="user-comment__date">${convertTime(item.time)}</section>
      </section>
      <p class="user-comment__text">
        ${item.body}
      </p>
      <section class="wrapper-comment-interactions">
        <button class="reply-comment-btn" id="${item.id}" type="submit" oncklick="replyThisComment(${item.id}, )">REPLY</button>
        <button class="comment-replies-btn" id="${item.id}" type="submit" oncklick="replyThisComment(${item.id}, anchor-${item.id})">
        Show replied comments (${(item.subCommentsQuantity !== undefined) ? item.subCommentsQuantity : 0})
        </button>
      </section>
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
    commentBundleIndex = 0;
    renderCommentBundleBtns();
    document.querySelector(`#comments-bottom0`).classList.add('comments-nav__btn--active');
    document.querySelector(`#comments-top0`).classList.add('comments-nav__btn--active');
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
      id: comments.length + 1,
      subCommentsQuantity: 0
    };
    comments.push(comment);

    document.querySelector('[name="comment-form"]').reset();

    renderCommentBundleBtns();
    renderComments(comments.slice((comments.length >= 15) ? comments.length-15 : 0));
  };

  addCommentBtn.addEventListener('click', addCommentButton);

// ------------------------------------------------------------------------------------

  fetchComments().then((data) => {
    comments = data;
    global.comments = comments;
  });

  function renderCommentBundleBtns() {
    clearCommentBundleBtns();

    const sortedCommentsQuantity = Math.ceil(comments.length/15);

    createBtn("comments-nav__btn", "comments-nav__prev", "<", topCommentsNav, `prevCommentBundle(${commentBundleIndex - 1})`);
    createBtn("comments-nav__btn", "comments-nav__prev", "<", bottomCommentsNav, `prevCommentBundle(${commentBundleIndex - 1})`);

    for (let i = 0; i < sortedCommentsQuantity; i++) {
      createBtn("comments-nav__btn", `comments-top${i}`, i+1, topCommentsNav, `renderCertainComments(${i})`);
      createBtn("comments-nav__btn", `comments-bottom${i}`, i+1, bottomCommentsNav, `renderCertainComments(${i})`);
    }

    createBtn("comments-nav__btn", "comments-nav__next", ">", topCommentsNav, `nextCommentBundle(${commentBundleIndex + 1})`);
    createBtn("comments-nav__btn", "comments-nav__next", ">", bottomCommentsNav, `nextCommentBundle(${commentBundleIndex + 1})`);
  }

  function renderCertainComments(index) {
    let end = (comments.length) - ((index) * 15);
    let begin = end - 15;
    if (begin < 0) {begin = 0;}
    clearComments();
    if (commentBundleIndex !== undefined) {
      document.querySelector(`#comments-bottom${commentBundleIndex}`).classList.remove('comments-nav__btn--active');
      document.querySelector(`#comments-top${commentBundleIndex}`).classList.remove('comments-nav__btn--active');
    }
    commentBundleIndex = index;
    global.commentBundleIndex = commentBundleIndex;
    renderCommentBundleBtns();
    document.querySelector(`#comments-bottom${index}`).classList.add('comments-nav__btn--active');
    document.querySelector(`#comments-top${index}`).classList.add('comments-nav__btn--active');
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
    commentsField.innerHTML = '';
  }

  function clearCommentBundleBtns() {
    topCommentsNav.innerHTML = '';
    bottomCommentsNav.innerHTML = '';
  }

  function prevCommentBundle(index) {
    if (index < 0) {
      index = Math.floor(comments.length/15);
    }
    renderCertainComments(index);
  }
  global.prevCommentBundle = prevCommentBundle;

  function nextCommentBundle(index) {
    if (index > Math.floor(comments.length/15)) {
      index = 0;
    }
    renderCertainComments(index);
  }
  global.nextCommentBundle = nextCommentBundle;


/*----------------------------------------------------------------------------------------Subcomments-----------------------------------------------------------------------*/
  const subComments = [];


  function replyThisComment(commentId, anchor) {

  }

  // const renderSubComments = (comment) => {
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

})();
