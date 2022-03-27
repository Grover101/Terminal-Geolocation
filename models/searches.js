const axios = require('axios')
const axios = require('axios')

class Searches {
    record = []
    dbPath = './db/database.json'

    constructor() {
        this.loadDB()
    }

    get historyCapitals() {
        return this.record.map(place => {
            let words = place.split(' ')
            words = words.map(word => word[0].toUpperCase() + word.substring(1))
            return words.join(' ')
        })
    }

    get paramsMapBox() {
        return {
            access_token: process.env.MAPBOX_TOKEN,
            limit: 1,
            language: 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPEN_WEATHER_TOKEN,
            lang: 'es',
            units: 'metric'
        }
    }

    async city(place = '') {
        try {
            const instance = await axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            })

            const res = await instance.get()
            return res.data.features.map(info => ({
                id: info.id,
                name: info.place_name,
                lat: info.center[1],
                lng: info.center[0]
            }))
        } catch (error) {
            return []
        }
    }

    async weatherPlace(lat = 0, lng = 0) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lng }
            })

            const res = await instance.get()
            const { main, weather } = res.data
            return {
                description: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max
            }
        } catch (error) {
            console.log(error)
        }
    }

    addRecord(place = '') {
        if (this.record.includes(place.toLocaleLowerCase)) return
        this.record = this.record.splice(0, 5)
        this.record.unshift(place.toLocaleLowerCase())
        this.saveDB()
    }

    saveDB() {
        const payload = {
            record: this.record
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    loadDB() {
        if (!fs.existsSync(this.dbPath)) return
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
        const data = JSON.parse(info)
        this.record = data.record
    }
}

module.exports = Searches
