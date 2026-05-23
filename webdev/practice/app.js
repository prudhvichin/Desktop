const username = document.querySelector('#usrn')
const password = document.querySelector('#pswd')
const btn = document.querySelector('#btn')

datab = {
    username: 'prudhvi',
    password: '1'
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const uservalue = username.value;
    username.value = ''
    const passvalue = password.value;
    password.value = ''

    login(uservalue, passvalue)
        .then(msg => {
            console.log(msg)
            const h2 = document.createElement('h2')
            document.body.append(h2)
            h2.append(`welcome to ${uservalue}`)
        })
        .catch(err => {
            console.log(err)
            console.log('retry');

        })
})


const login = async (username, password) => {
    if (!username || !password) throw 'invalid credentials'
    if (username === datab.username && password === datab.password) return 'welcome to the instagram'
    throw 'please re-try by entering new credentials'
}