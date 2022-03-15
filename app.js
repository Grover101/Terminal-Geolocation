const Searches = require('./models/searches')
const { listMenu, pause, readInput } = require('./helpers/inquirer')

const main = async () => {
    const search = new Searches()
    let option

    do {
        option = await listMenu()

        switch (option) {
            case 1:
                // TODO: Mostrar mensaje
                const place = await readInput('Enter a City:')

                console.log(await search.city(place))

                // TODO: Buscar los lugares

                // TODO: Seleccionar el lugar

                // TODO: Clima

                // TODO: Mostrar resultados
                console.log('\nCity Infomatica\n'.green)
                console.log('City:')
                console.log('Lat:')
                console.log('Lng:')
                console.log('Temperature:')
                console.log('Min Temperature:')
                console.log('Max Temperature:')
                break
            case 2:
                // TODO: Mostrar historial
                break
            case 0:
                console.log('Bye!')
                break
        }

        if (option !== 0) await pause()
    } while (option !== 0)
}

main()
