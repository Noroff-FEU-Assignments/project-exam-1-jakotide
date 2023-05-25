function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
};

export function validateNewsletter(event){
  event.preventDefault();
  const newsInput = document.querySelector(".news-input");
  const newsError = document.querySelector(".newsletter-error");
  const newsSuccess = document.querySelector(".newsletter-success");

  if (validateEmail(newsInput.value) === true) {
    newsError.style.display = "none";
    newsSuccess.style.display = "block";
    newsInput.value = "";
  } else {
    newsError.style.display = "block";
    newsSuccess.style.display = "none";
  };
}