const characters = {
  // object of letters, numbers & symbols, keys properties must be like 'value' of 'id' inputs
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
  space: " ",
};

// Preview Password

const previewPassword = document.querySelector("#random-password");
const clipboard = document.querySelector(".copy-icon");
const previewIndicator = document.querySelector(".length-strength");

// Play Range

const length_strn = document.querySelector(".length");
const rangeInput = document.querySelector("#generator-input");
const generateBtn = document.querySelector(".generate-btn");

// Settings
const options = document.querySelectorAll("ul li input");
const [
  lowercase,
  uppercase,
  numbers,
  symbols,
  exclude_duplicate,
  include_spaces,
] = Array.from(document.querySelector("ul").children).map((li) => {
  return li.querySelector("input");
});

// Hard Settings for lowercase input (Disable Input)
lowercase.checked = true;
lowercase.disabled = true;
// console.log(lowercase.attributes);

// Functions
generateBtn.addEventListener("click", generate);
function generate() {
  const length = rangeInput.value; // get length of generated password
  let exc_duplicate = false; // default
  let staticPassword = "";
  let randomPassword = "";
  options.forEach((option) => {
    // Get Characters of the option which checked
    if (option.checked) {
      if (option.id === "duplicate")
        exc_duplicate = true; // if option is "duplicate" so make it true
      else staticPassword += characters[option.id]; // store all value of each option, then we will shuffle it depending on "length".
    }
  });

  for (let i = 0; i < length; i++) {
    const randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)]; // first get the character, to check if duplicated or not
    if (exc_duplicate) {
      randomPassword.includes(randomChar)
        ? randomChar == " "
          ? (randomPassword += randomChar) // if space is duplicated is OK
          : --i // if another character is duplicated (not space because space is ok) we will re-loop to get different character, and so on.
        : (randomPassword += randomChar); // if this first character (not duplicated) so store it.
    } else {
      randomPassword += randomChar; // if "duplication input check" is false (not checked) so store any value even it is duplicated.
    }

    /**
     * There is one test can be bug
     * if we checked "exclude duplicate" and make range up 26 can cause infinite loop
     */
  }

  previewPassword.value = randomPassword;
}

rangeInput.addEventListener("input", (e) => {
  length_strn.textContent = e.target.value;
  generate();

  if (+e.target.value <= 10) {
    previewIndicator.id = "weak";
  } else if (+e.target.value <= 20) {
    previewIndicator.id = "pre-medium";
  } else if (+e.target.value <= 25) {
    previewIndicator.id = "medium";
  } else {
    previewIndicator.id = "hard";
  }
  console.log(previewIndicator);
});

clipboard.addEventListener("click", (e) => {
  //   e.target.classList.add("active");
  navigator.clipboard.writeText(previewPassword.value); // to save "value of password input"
  e.target.innerText = "Done"; // to change google icon
  setTimeout((_) => { // to re-change google icon from "Done" to "copy_all" once again
    e.target.innerText = "copy_all";
  }, 1500);
});
