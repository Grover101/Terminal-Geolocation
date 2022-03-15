const axios = require('axios')

class Searches {
    record = ['Madrid', 'Mexico', 'Barcelona']

    constructor() {}

    async city(place = '') {
        const resp = await axios.get('https://reqres.in/api/users/2')
        console.log(resp.data)
        return []
    }
}

module.exports = Searches
