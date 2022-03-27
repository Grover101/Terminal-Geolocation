const inquirer = require('inquirer')
require('colors')

const listMenu = async () => {
    const question = [
        {
            type: 'list',
            name: 'option',
            message: 'What do you want to do?',
            choices: [
                {
                    value: 1,
                    name: `${'1.'.green} Search City`
                },
                {
                    value: 2,
                    name: `${'2.'.green} Search History`
                },
                {
                    value: 0,
                    name: `${'0.'.green} Exit`
                }
            ]
        }
    ]
    console.clear()
    console.log('================================'.green)
    console.log('\tSelect an option'.italic.bold.white)
    console.log('================================\n'.green)

    const { option } = await inquirer.prompt(question)
    return option
}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`
        }
    ]
    console.log()
    await inquirer.prompt(question)
}

const readInput = async message => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0) return 'Please enter a value'
                return true
            }
        }
    ]

    const { description } = await inquirer.prompt(question)
    return description
}

const listPlaces = async (places = []) => {
    const choices = places.map((place, index) => {
        const i = `${index + 1}.`.green
        return {
            value: place.id,
            name: `${i} ${place.name}`
        }
    })

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancel`
    })

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Select Place:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(question)
    return id
}

module.exports = {
    listMenu,
    pause,
    readInput,
    listPlaces
}
