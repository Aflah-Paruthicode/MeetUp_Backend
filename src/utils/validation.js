const validator = require('validator')

const validateSignUpData = (req) => {
    const {name,email,favMovie} = req.body;
    if(!name.trim()) {
        throw new Error('Name is not valid')
    } else if(!validator.isEmail(email)) {
        throw new Error('Email is not valid')
    } else if (favMovie.length < 1 || favMovie.length >30) {
        throw new Error('Something went wrong with movie name')
    }
}

module.exports = {
    validateSignUpData
}
