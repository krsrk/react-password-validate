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

export default function validatePassword(password) {
    let errorMessages = []

    // Verificar que la contraseña tenga al menos 16 caracteres
    if (password.length < 16) {
        errorMessages.push('Password length must be at least 16 characters')
    }

    // Verificar que haya al menos una letra minúscula y una letra mayúscula
    if (!verifyUpperAndLowerCaseInPassword(password)) {
        errorMessages.push('Must have at least one upper and lower cases characters')
    }

    // Verificar que no haya 2 letras iguales consecutivas
    if (!verifyConsecutiveTwoCharEquals(password)) {
        errorMessages.push('Chars can not be consecutives')
    }

    // Contar la cantidad de números y verificar que haya al menos 4
    if (!verifyQtyOfNumbers(password)) {
        errorMessages.push('Must have at least 4 numbers')
    }

    // Verificar que no haya 2 números iguales consecutivos
    if (!verifyTwoConsecutivesNumbers(password)) {
        errorMessages.push('Numbers in password can not be equals and consecutive')
    }

    // Verificar que haya al menos 2 caracteres especiales y que no estén juntos
    if (!verifyConsecutiveSpecialChar(password)) {
        errorMessages.push('Special Chars in password can not be equals and consecutive')
    }

    return errorMessages
}