let notFoundError = {
    code: "404",
    message: "Unfortunately we could not find the thing you were looking for, sorry 😔",
    buttonText: "Lets Go Home"
}

let internalServerError = {
    code: "500",
    message: "Unfortunately the server is experiencing techincal difficulties, sorry 😔",
    buttonText: "Try Again?"
}

module.exports = {
    notFoundError,
    internalServerError
}