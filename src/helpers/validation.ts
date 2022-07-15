import User from '../models/User.model'

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/)
}

export const validateLength = (text, min, max) => {
    if (text.length > max || text.length < min) {
        return false
    }
    return true
}

export const validateUsername = async (username) => {
    let flag = false
    do {
        let check = await User.findOne({ username })
        if (check) {
            //change username

            // OVER-ENGINEERED
            // number of milliseconds 1 Jan 1970 Unix date system start
            // multiplied with random to make more space between invoked functions
            // username += +new Date() * Math.random().toString().substring(0, 1)

            // standard random 1-99
            username += Math.floor(Math.random() * 99) + 1
            flag = true
        } else {
            flag = false
        }
    } while (flag)
    return username
}
