const form = document.querySelector('form');

const jsElements = form.querySelectorAll('.js-element');
for (let e of jsElements) {
    e.style.display = 'flex';    
}

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
    updateErrorMessages();
}

function removeValidation(input) {
    const validityState = input.validity;
    if (validityState.customError && !validityState.valueMissing && !validityState.tooShort && !validityState.typeMismatch) {
        input.setCustomValidity('');
        updateErrorMessages();
    }
}

const inputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
const errorMessageList = form.querySelector('#error-messages');
function updateErrorMessages() {
    errorMessageList.innerHTML = '';
    for (let input of inputs) {
        if (input.validity.customError) {
            let entry = document.createElement('li');

            let field;
            let id = input.id;
            if (id === 'name') field = 'Name Field: ';
            else if (id === 'email') field = 'Email Field: ';
            else if (id === 'comments') field = 'Comments Field: ';
            else field = 'Unknown Field: ';

            let message = field + input.validationMessage;
            entry.appendChild(document.createTextNode(message));
            errorMessageList.appendChild(entry);
        }
    }
}

const form_errors = []
function updateErrorList(input) {
    let errorMessage = '';
    const validityState = input.validity;
    if (validityState.valueMissing) {
        errorMessage = 'valueMissing';
    } else if (validityState.tooShort) {
        errorMessage = 'tooShort(' + input.textLength + '/' + input.minLength + ')';
    } else if (validityState.typeMismatch) {
        errorMessage = 'invalidEmail';
    } else {
        console.log('error list updater called with no error');
        return;
    }
    form_errors.push(input.id + ": " + errorMessage);
    // console.log(form_errors);
}

const formError = form.querySelector('#form-errors');
function saveErrorList() {
    let result = JSON.stringify(form_errors);
    formError.value = result;
    form_errors.length = 0;
}

for (let input of inputs) {
    input.addEventListener('input', () => removeValidation(input));
    input.addEventListener('focusout', () => validate(input));
    input.addEventListener('invalid', () => validate(input));
    input.addEventListener('invalid', () => updateErrorList(input));
}
form.addEventListener('submit', () => saveErrorList());

const characterMessage = form.querySelector('#char-count');
const comments = form.querySelector('#comments');
const textColor = comments.style.color;
function updateRemainingChar() {
    let remaining = comments.maxLength - comments.textLength;
    if (remaining > 100) {
        characterMessage.innerText = 'Remaining Characters: ' + remaining;
        characterMessage.style.color = textColor;
    } else if (remaining > 0) {
        characterMessage.innerText = 'Warning!!! Remaining Characters: ' + remaining + '!!!';
        characterMessage.style.color = '#c50000';
    } else {
        characterMessage.innerText = 'There are 0 characters remaining.'
        characterMessage.style.color = textColor;
    }
}

comments.addEventListener('input', updateRemainingChar);

