const validator = require('validator')

const validateSignUpData = async (req) => {
    const {name,email,favMovie, password} = req.body;
    if(!name.trim()) {
        throw new Error('Name is not valid')
    } else if(!validator.isEmail(email)) {
        throw new Error('Email is not valid')
    } else if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong') 
    } else if (favMovie.length < 1 || favMovie.length >30) {
        throw new Error('Something went wrong with movie name')
    }
}

module.exports = {
    validateSignUpData
}
