import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const key = 'feedback-form-state';
const userData = {};

const formFill = () => {
  const userInfo = JSON.parse(localStorage.getItem(key));

  if (userInfo === null) {
    return;
  }

  for (const key in userInfo) {
    form.elements[key].value = userInfo[key];
    userData[key] = userInfo[key];
  }
};

formFill();

const formInput = evt => {
  const { target: elements } = evt;

  const elValue = elements.value;
  const elName = elements.name;

  userData[elName] = elValue;

  localStorage.setItem(key, JSON.stringify(userData));
};

const formSubmit = evt => {
  evt.preventDefault();
  console.log(userData);
  form.reset();
  localStorage.removeItem(key);
  userData.email = '';
  userData.message = '';
};

form.addEventListener('input', throttle(formInput, 500));
form.addEventListener('submit', formSubmit);
