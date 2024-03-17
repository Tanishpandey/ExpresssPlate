const hashPassword = (password) => {
    return Promise.resolve(password); // Return the plain-text password directly
};

const comparePasswords = (password, hashed) => {
    return Promise.resolve(password === hashed); // Compare plain-text password with hashed password directly
};

module.exports = {
    hashPassword,
    comparePasswords
};
