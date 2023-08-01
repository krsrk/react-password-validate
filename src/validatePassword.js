function verifyUpperAndLowerCaseInPassword(password) {
    let hasLowercase = false;
    let hasUppercase = false;
    let hasUpperAndLowerCase = true

    for (let char of password) {
        if (char >= "a" && char <= "z") {
            hasLowercase = true;
        } else if (char >= "A" && char <= "Z") {
            hasUppercase = true;
        }
    }

    if (!hasLowercase || !hasUppercase) {
        hasUpperAndLowerCase = false;
    }

    return hasUpperAndLowerCase
}

function verifyConsecutiveTwoCharEquals(password) {
    let verifyResult = true

    for (let i = 0; i < password.length - 1; i++) {
        if (password[i].toLowerCase() === password[i + 1].toLowerCase() && /[a-zA-Z]/.test(password[i])) {
            verifyResult = false
        }
    }

    return verifyResult
}

function verifyQtyOfNumbers(password) {
    let verifyResult = true

    let numCount = 0;

    for (let char of password) {
        if (!isNaN(char) && char !== "0") {
            numCount++;
        }
    }

    if (numCount < 4) {
        verifyResult = false;
    }

    return verifyResult
}

function verifyTwoConsecutivesNumbers(password) {
    let verifyResult = true

    for (let i = 0; i < password.length - 1; i++) {
        if (
            !isNaN(password[i]) &&
            !isNaN(password[i + 1]) &&
            password[i] !== "0" &&
            password[i] === password[i + 1]
        ) {
            verifyResult = false;
        }
    }

    return verifyResult
}

function verifyConsecutiveSpecialChar(password) {
    const specialChars = "!@#$%^&*-_+=?"
    let specialCount = 0
    let verifyResult = true

    for (let i = 0; i < password.length; i++) {
        if (specialChars.includes(password[i])) {
            specialCount++;
            if (i > 0 && i < password.length - 1) {
                if (specialChars.includes(password[i - 1]) || specialChars.includes(password[i + 1])) {
                    verifyResult = false;
                }
            }
        }
    }

    if (specialCount < 2) {
        verifyResult = false;
    }

    return verifyResult
}

export const verifyWithNoBlanckSpaces = (pass) => {
    let verifyResult = true

    if (pass.includes(" ")) {
        verifyResult = false
    }

    return verifyResult
}

export const verifyWithNoZeroValue = (pass) => {
    let verifyResult = true

    if (pass.includes("0")) {
        verifyResult = false
    }

    return verifyResult
}

export default function validatePassword(password) {
    let errorMessages = []

    if (password.length < 16) {
        errorMessages.push('Password length must be at least 16 characters')
    }

    if (!verifyUpperAndLowerCaseInPassword(password)) {
        errorMessages.push('Must have at least one upper and lower cases characters')
    }

    if (!verifyConsecutiveTwoCharEquals(password)) {
        errorMessages.push('Chars can not be consecutives')
    }

    if (!verifyQtyOfNumbers(password)) {
        errorMessages.push('Must have at least 4 numbers')
    }

    if (!verifyTwoConsecutivesNumbers(password)) {
        errorMessages.push('Numbers in password can not be equals and consecutive')
    }

    if (!verifyConsecutiveSpecialChar(password)) {
        errorMessages.push('Special Chars in password can not be equals and consecutive')
    }

    if (!verifyWithNoBlanckSpaces(password)) {
        errorMessages.push('Password can not have blank spaces')
    }

    if(!verifyWithNoZeroValue(password)) {
        errorMessages.push('Password can not have 0')
    }

    return errorMessages
}