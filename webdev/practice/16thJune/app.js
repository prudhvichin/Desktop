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
