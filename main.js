window.addEventListener('load', () => start())

let input = null
let searchButton = null
let searchText = ''
let searchResultUsers = []
let femSum = 0, mascSum = 0, ageSum = 0, ageAverage = 0
const titleUsers = document.querySelector('#title-users')
const titleStats = document.querySelector('#title-stats')
const userList = document.querySelector('#user-list')
const statisticsList = document.querySelector('#statistics-list')
const statisticsListItems = document.querySelectorAll('.stats')
const statsNumbers = document.querySelectorAll('.stats-number')

//usuários exemplo para o início do desenvolvimento
const user1 = {
    name: 'Bia',
    age: 29,
    gender: 'F',
}

const user2 = {
    name: 'Bianca',
    age: 67,
    gender: 'F',
}

const user3 = {
    name: 'Bruno',
    age: 10,
    gender: 'M',
}

let allUsers = [user1, user2, user3]

function start() {
    //requisiçao à api
    //filtrar os dados necessários ao app

    monitorInput()
}

function monitorInput() {
    input = document.querySelector('input')
    searchButton = document.querySelector('button')

    function handleSearchCommand(event) {
        event.preventDefault()
        searchText = input.value
        search(searchText.toLowerCase())
    }

    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') { handleSearchCommand(event) }
    })
    searchButton.addEventListener('click', (event) => handleSearchCommand(event))
}

function search(text) {
    function initializeCounters() {
        femSum = 0
        mascSum = 0
        ageSum = 0
        ageAverage = 0
        searchResultUsers = []
    }
    function findUsers(text) {
        allUsers.map((user) => {
            name = user.name.toLowerCase()
            if (name.includes(text)) {
                includeUser(user)
            }
        })
    }
    function includeUser(user) {
        searchResultUsers.push(user)
        ageSum += user.age
        if (user.gender === 'F') {
            femSum++
        } //não vai direto pro masculino pois futuramente pode adicionar mais gêneros
        else if (user.gender === 'M') {
            mascSum++
        }
    }
    if (text !== '') {
        initializeCounters()
        findUsers(text)
        ageAverage = ageSum / searchResultUsers.length
        ageAverage = ageAverage.toFixed(1)
        showResults()
    }
}

function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function showResults() {
    function showTitles(user, stats) {
        titleUsers.textContent = user
        titleStats.textContent = stats
    }
    function showUser(user) {
        let li = document.createElement('li')
        li.textContent = `${user.name}, ${user.age} anos`
        userList.appendChild(li)
    }
    let showUserList = () => searchResultUsers.forEach(user => showUser(user))
    let showEmptyResults = () => statisticsListItems.forEach(item => item.classList.add('hidden'))
    function showStatistics() {
        let count = 0
        let stats = [femSum, mascSum, ageAverage]
        statsNumbers.forEach(number => {
            number.textContent = stats[count]
            count++
        })
        statisticsListItems.forEach((item) => item.classList.remove('hidden'))
    }
    resultsNumber = searchResultUsers.length
    removeAllChildren(userList)

    if (resultsNumber > 0) {
        showTitles(`${resultsNumber} usuário(s) encontrado(s)`, "Estatísticas")
        showUserList()
        showStatistics()
    }
    else {
        showTitles("Nenhum usuário", "Estatísticas - vazio")
        showEmptyResults()
    }
}