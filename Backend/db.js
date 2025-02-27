const {connect} = require('mongoose')

const connectToDb = async(url) =>{
    try {
        await connect(url)
    } catch (error) {
        console.error('Database connection failed:', error)
        throw error
    }
}

module.exports = connectToDb