const form = document.querySelector(".contact-form");
const firstName = document.querySelector("#firstname");
const firstError = document.querySelector("#firstNameError");

const subject = document.querySelector("#subject");
const subError = document.querySelector("#subError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const message = document.querySelector("#message");
const textError = document.querySelector("#textError");

const successMessage = document.querySelector(".successMessage");

const newsLetter = document.querySelector(".newsletter")



function validateForm(event) {
    event.preventDefault();

  if (checkLength(firstName.value, 5) === true) {
    firstError.style.display = "none";
  } else {
    firstError.style.display = "block";
  }

  if (checkLength(subject.value, 15) === true) {
    subError.style.display = "none";
  } else {
    subError.style.display = "block";
  }

  if (checkLength(message.value, 25) === true) {
    textError.style.display = "none";
  } else {
    textError.style.display = "block";
  }

  if(validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (checkLength(firstName.value, 5) && checkLength(subject.value, 15) && validateEmail(email.value) && checkLength(message.value, 25)) {
    successMessage.style.display = "block";
  } else {
    successMessage.style.display = "none";
  }
};

function checkLength(value, len) {
  if(value.trim().length > len){
    return true;
  } else {
    return false;
  }
};

export function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
};

form.addEventListener("submit", validateForm);