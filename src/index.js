// Base

// All HTML connections

const posts = document.getElementById('postsContainer');
// const post = document.querySelector('.');
const form = document.getElementById('createPostForm');
// const searchForm = document.getElementById('formSearch');

// API

const BASE_URL = 'http://localhost:3000/posts';

// imports

import { addNewPost } from './modules/create.js';
import { renderPosts } from './modules/read.js';
import { updatePost } from './modules/update.js';
import { deletePost } from './modules/delete.js';

// C - Create

const newPost = {
  title: '',
  subtitle: '',
  comments: [],
};

// Додати новий пост

form.addEventListener('submit', e => {
  e.preventDefault();
  const inputTitle = form.elements.titleInput.value;
  const inputSubtitle = form.elements.contentInput.value;

  newPost.title = inputTitle;
  newPost.subtitle = inputSubtitle;

  posts.insertAdjacentHTML(
    'beforeend',
    `<div class="post active">
        <h2 class="title">${inputTitle}</h2>
        <p class="subtitle">${inputSubtitle}</p>
        <button class='editPostButton' data-id=''>Редагувати</button>
        <button class='deletePostButton' data-id=''>Видалити</button>
        </div>
        `
  );

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  };

  addNewPost(options, BASE_URL);
});

// R - Read

// Пошук

// formSearch.addEventListener('submit', e => {
//   e.preventDefault();
//   const searchInput = formSearch.elements.search.value;
//   console.log(searchInput)
//   searchPost(BASE_URL,searchInput);
// });

// Оновлення відображення постів на сторінці

renderPosts(BASE_URL).then(postsPromise => {
  postsPromise.forEach(element => {
    posts.classList.add('active');
    posts.insertAdjacentHTML(
      'beforeend',
      `
      <div class="post">
        <h2 class="title">${element.title}</h2>
        <p class="subtitle">${element.subtitle}</p>
        <button class='editPostButton' data-id='${element.id}'>Редагувати</button>
        <button class='deletePostButton' data-id='${element.id}'>Видалити</button>
        </div>
      `
    );
  });
});

// U - Update

posts.addEventListener('click', e => {
  if (e.target.nodeName == 'BUTTON') {
    if (e.target.classList == 'editPostButton') {
      const redactTitle = prompt('Нова назва');
      const redactSubtitle = prompt('Новий зміст');

      const updated = {
        title: redactTitle,
        subtitle: redactSubtitle,
      };
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated),
      };

      updatePost(BASE_URL, e.target.dataset.id, options);
      e.target.parentElement.childNodes.forEach(element => {
        if (element.nodeName == 'H2') {
          element.textContent = redactTitle;
        }
        if (element.nodeName == 'P') {
          element.textContent = redactSubtitle;
        }
      });
    }
  }
});

// D - Delete

posts.addEventListener('click', e => {
  if (e.target.nodeName == 'BUTTON') {
    if (e.target.classList.value == 'deletePostButton') {
      deletePost(BASE_URL, e.target.dataset.id);
      e.target.parentElement.classList.add('disactive');
      if (e.target.parentElement.classList.contains('disactive')) {
        setTimeout(function() {
          e.target.parentElement.style.display = 'none';
        }, 500)
      }
    }
  }
});
