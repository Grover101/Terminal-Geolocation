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

const listTasksDelete = async (tasks = []) => {
    const choices = tasks.map((task, index) => {
        const i = `${index + 1}.`.green
        return {
            value: task.id,
            name: `${i} ${task.description}`
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
            message: 'Delete Task',
            choices
        }
    ]

    const { id } = await inquirer.prompt(question)
    return id
}

const confirm = async message => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question)
    return ok
}

const showListSelectCompleted = async (tasks = []) => {
    const choices = tasks.map((task, index) => {
        const i = `${index + 1}.`.green
        return {
            value: task.id,
            name: ` ${i} ${task.description}`,
            checked: task.complete ? true : false
        }
    })

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selections',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question)
    return ids
}

module.exports = {
    listMenu,
    pause,
    readInput,
    listTasksDelete,
    confirm,
    showListSelectCompleted
}
