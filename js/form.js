function validate(input) {
    const validityState = input.validity;

    if (validityState.valueMissing) {
        input.setCustomValidity('This field is required.');
    } else if (validityState.tooShort) {
        input.setCustomValidity('The minimum length is ' + input.minLength + '.');
    } else if (validityState.typeMismatch) {
        input.setCustomValidity('Email must be in the format username@example.com');
    } else {
        input.setCustomValidity('');
    }
}

// TODO: check if these are the correct listeners
const form = document.querySelector('form');
const inputs = form.elements;
for (let input of inputs) {
    input.addEventListener('input', () => validate(input));
    input.addEventListener('focusout', () => validate(input));
}

const characterMessage = form.querySelector('#char-count');
const comments = form.querySelector('#comments');
function updateRemainingChar() {
    let remaining = comments.maxLength - comments.textLength;
    characterMessage.innerText = 'Remaining Characters: ' + remaining;
    if (remaining < 990) {
        characterMessage.innerText = 'Warning!!! Remaining Characters: ' + remaining + '!!!';
        characterMessage.style.color = '#c50000';
    }
    if (remaining === 0) {
        characterMessage.innerText = '0 characters left.';
    }
}

comments.addEventListener('input', updateRemainingChar);

