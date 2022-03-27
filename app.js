require('dotenv').config()

const { listMenu, pause, readInput, listPlaces } = require('./helpers/inquirer')
const Searches = require('./models/searches')

const main = async () => {
    const search = new Searches()
    let option = 0

    do {
        option = await listMenu()

        switch (option) {
            case 1:
                // TODO: Mostrar mensaje
                const term = await readInput('Enter a City:')

                // TODO: Buscar los lugares
                const places = await search.city(term)

                // TODO: Seleccionar el lugar
                const id = await listPlaces(places)
                if (id === '0') continue
                const placeSelect = places.find(place => place.id === id)

                // TODO: Guardar en DB
                search.addRecord(placeSelect.name)

                // TODO: Clima
                const weather = await search.weatherPlace(
                    placeSelect.lat,
                    placeSelect.lng
                )

                // TODO: Mostrar resultados
                console.log('\nCity Infomatica\n'.green)
                console.log('City:', placeSelect.name.green)
                console.log('Lat:', placeSelect.lat)
                console.log('Lng:', placeSelect.lng)
                console.log('Temperature:', weather.temp)
                console.log('Min Temperature:', weather.min)
                console.log('Max Temperature:', weather.max)
                console.log(`What's the weather like:`, weather.description)
                break
            case 2:
                // TODO: Mostrar historial
                search.historyCapitals.forEach((place, index) => {
                    const idx = `${index + 1}.`.green
                    console.log(`${idx} ${place}`)
                })
                break
            case 0:
                console.log('Bye!')
                break
        }

        if (option !== 0) await pause()
    } while (option !== 0)
}

main()
