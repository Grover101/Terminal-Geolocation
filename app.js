const { listMenu, pause } = require('./helpers/inquirer')

const main = async () => {
    let option
    do {
        option = await listMenu()
        console.log(option)
        await pause()
    } while (option !== 0)
}

main()
