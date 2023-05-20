// Functions to put in validator

// For checking empty form strings.
function checkEmptyForms(...args) {
    for (const string of args) {
        if (string.trim() === '' || string === null) {
            return true;
        }
    }
    return false;
}

// For checking bad numbers taken from forms that return strings.
function checkBadNumbers(...args) {
    for(const num of args) {
        console.log(num, /^\d*?\.?\d+$/g.test(num))
        if(isNaN(num) || num === null || !/^\d*\.?\d+$/g.test(num)){
            return true;
        }
    } return false;
}

// This validator is meant for client side application.