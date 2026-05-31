// function addNumbers(a, b) {
//     return a + b;
// }

// const addNumbers = function (a, b) {
//     return a + b;
// }

// const addNumbers = (a, b) => a + b;

function rolldie(args) {
    return Math.floor(Math.random() * args) + 1;
}

// let die = rolldie(20);

function rollingdies(times, dies) {
    for (let i = times; i - 1 >= 0; i--) {
        console.log(rolldie(dies));
    }
}




// for (var i = 0; i < 5; i++) {
//     var msg = "prudhvi"
//     console.log(msg)
// }

// console.log(msg)
// console.log(i)


// function BankRobbery() {
//     let heros = ["spiderman", "batman", "catwomen"]
//     function CryForHelp() {
//         for (let hero of heros) {
//             console.log(`Please help me ${hero.toUpperCase()}`)
//         }
//     }
// }


// function isBetween(num) {
//     return num >= 6 && num <= 18
// }


function makeMisteryFunc() {
    const num = Math.random();

    if (num > 0.5) {
        return function () {
            console.log("You won")
        }
    }
    else {
        return function () {
            alert('you have been infected by virus')
            alert('you have been infected by virus')
            alert('you have been infected by virus')
            alert('you have been infected by virus')

        }
    }
}


function factoryFuc(min, max) {
    return function (num) {
        return num >= min && num <= max;
    }
}

const isChild = factoryFuc(1, 12)
const isTeen = factoryFuc(13, 19)
const isAdult = factoryFuc(20, 55)

// const input = parseInt(prompt(`Enter your age`))

// if (isChild(input)) {
//     console.log('you are not allowed')
// } else if (isTeen(input)) {
//     console.log('you need your parent to watch the movie')
// } else if (isAdult(input)) {
//     console.log('Ticket Please...')
// }


// const mymath = {
//     pi: 3.14,
//     sq: function (num) {
//         return num * num
//     },
//     cb: function (num) {
//         return num ** 3;
//     }
//

// =========================================================================================

//array allBacks
// forEach Method
const students = [
    {
        name: 'prudhvi',
        marks: 90
    },
    {
        name: "praveen",
        marks: 100
    },
    {
        name: "priya",
        marks: 91
    },
    {
        name: "krishna",
        marks: 100
    },
    {
        name: "harish",
        marks: 90
    },
    {
        name: "vinay",
        marks: 89
    },
    {
        name: "naga tarun",
        marks: 92
    }

]



// students.forEach(function (students) {
//     console.log(`${students.marks} marks scored by ${students.name}`)
// })



// ============================================================================================
//Map Method
// => map array will return the things. forEach we cant return the things
const names = students.map(function (student) {
    return student.name.toUpperCase()

})



//================================================================================================
//Arrow functions

//function in way which can store reference
const add = function (a, b) {
    return a + b;
}


// //classic arrow functiont
// const add = (a, b) => {
//     return a + b;
// }

//implcit return without return keyword
// const add = (a, b) => (a + b)


//one-lined return best way to write a oneline function expressions
// const sq = x => x * x


// example for creating studentgrades array using map method by oneline function expression
const StudentGrades = students.map(student => `${student.name} - ${student.marks / 10}`)


//================================================================================================


//setTimeout and setInterval

// console.log('before')
// setTimeout(function () {
//     console.log('...this is after 3 sec')
// }, 3000)

// console.log('after')


function generateRandNum(num) {
    console.log(Math.floor(Math.random() * num) + 1);
}


// setInterval(generateRandNum(100), 2000);


// const id = setInterval(() => {
//     console.log(Math.floor(Math.random() * 100) + 1)
// }, 1000);

//======================================================================================
//Filter Method


const Movies = [
    {
        title: 'RRR',
        rating: 90,
        year: 2022
    },
    {
        title: 'bahubali',
        rating: 98,
        year: 2015
    },
    {
        title: 'pushpa the rise',
        rating: 95,
        year: 2021
    },
    {
        title: 'pushpa the fire',
        rating: 92,
        year: 2024
    },
    {
        title: 'sitaramam',
        rating: 89,
        year: 2022
    },
    {
        title: 'jersey',
        rating: 95,
        year: 2019
    },
    {
        title: 'DJ tillu',
        rating: 85,
        year: 2022
    },
    {
        title: 'tillu sqare',
        rating: 80,
        year: 2025
    },
    {
        title: 'salaar',
        rating: 92,
        year: 2025
    }
]

const goodMovies = Movies.filter(m => m.rating > 90)
const badMovies = Movies.filter(m => m.rating < 90)

const goodMovieNames = goodMovies.map(m => m.title)


// goodMovieNames.forEach(n => console.log(n))

// for (ele of goodMovieNames) {
//     console.log(ele)
// }




//  ====================================================================================
// some and every functions ,

/* some and every method gives us the bool value it checks the iterate 
and gives us the bool value */

marks = [90, 98, 95, 96, 97, 91, 80, 89, 87, 86, 82]

//'every' example

// console.log(marks.every(i => i >= 90))
// console.log(marks.every(i => i > 75))

//some example

// console.log(marks.some(i => i === 95))
// console.log(marks.some(i => i > 98))


//======================================================================================

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let total = numbers.reduce((accumlator, currentValue) => (accumlator + currentValue))

const prices = [99.50, 0.99, 59.99, 9.99, 69.99, 49.99, 39.50]

//we can use it for filtering stuff but it reduces it overtime


// let lowerstPrice = prices.reduce((min, max) => {
//     if (max > min) {
//         return min
//     }
//     return max
// })




const nStrings = ['prudhvi raj', 'praveen', 'tarun', 'ashok', 'ganesh', 'hemanth']


const longestName = nStrings.reduce((longest, currentValue) => {
    return currentValue.length > longest.length ? currentValue : longest
})

// =====================================================================================
// Arrow function and this keyword are varry from function to function


const person = {
    firstName: 'prudhvi',
    lastName: "raj",

    fullName: () => {
        return `${this.firstName} ${this.lastName}`
    }
}


// ===========================================================================================
// default parameters or Arguments



function rolldie(num = 6) {
    return Math.floor(Math.random() * num) + 1
}



function greet(name, msg = 'hey there', punc = '!') {

    console.log(` ${msg},${name}${punc}`)
}


// ===================================================================

// spread


const max = Math.max(87, 845, 487, 48, 784, 848, 4, 84, 84, 88)

// console.log(max)



const student1 = {
    name: 'prudhvi',
    age: 25,
    color: 'tan'
}


const student2 = {
    name: 'prudhvi',
    age: 25,
    color: 'fair'
}

const student = { ...student2, ...student1 }
//here student1 attributes will override the student2 


const obj = { ...[2, 3, 4, 5, 6] }
// here the index will become the key for the obj

const obj1 = { ...'hello' }
//  similarly here also



const dataFromForm = {
    name: 'prudhvi',
    age: 25,
    username: 'kites'
}

const newUser = { ...dataFromForm, id: '454811', isAdmin: false }


// ===================================================================
// rest

function sum(...nums) {
    return nums.reduce((total, ele) => total + ele)
}


function awards(gold, silver, ...rest) {
    console.log(`Gold medal goes to ${gold}`)
    console.log(`Silver medal goes to ${silver}`)
    console.log(`and rest are ${rest}`)
}


//======================================================================

// array destructring


const studs = [
    {
        name: 'prudhvi',
        rank: 1
    },
    {
        name: 'praveen',
        rank: 2
    },
    {
        name: 'radha',
        rank: 3
    },
    {
        name: 'vinay',
        rank: 4
    },
    {
        name: 'padma',
        rank: 5
    },
    {
        name: 'manasa',
        rank: 6
    }
]



const [istRank, iindRank, ...others] = studs

// ==========================================================================================

// object destructing

const myProfile = {
    firstName: 'Prudhvi',
    lastName: 'Chintada',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    gender: 'm',
    age: 25,
    email: 'prudhvisam4444@gmail.com',
    city: 'visakhapatnam'

}

// console.log(myProfile)

// const { name, bio } = myProfile
// const { name: newName } = myProfile


const user2 = {
    name: 'janshi',
    age: 24,
    gender: 'f',
}


const { name, age, city = 'visakhapatnam' } = user2 // here we can declare the default value


function fullName({ firstName, lastName, addresss = 'Ramatakies', city }) {
    return `${firstName} ${lastName} lives at ${addresss} ${city}`
}

