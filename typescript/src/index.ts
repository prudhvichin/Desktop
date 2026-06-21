
// VARIABLES EXMAMPLES
// let name: string = 'prudhvi'
// let salary: number = 20_000
// let isMarried: boolean = false
// let city: string = 'visakhapatnam'


// // ARRAYS PRACTICE
// let nums: number[] = [1, 2, 3, 4, 5, 6]
// let grades: Array<string> = ['a', 'a+', 'b']

// let fruits: string[] = ['mango', 'banana', 'apple', 'guava']

// let marks: number[] = [89, 88, 97, 100, 90]



// OBJECTS
// let user: {
//     name: string;
//     age: number;

// } = {
//     name: 'prudhvi',
//     age: 22
// }

// let product: {
//     title: string;
//     price: number;
//     InStock: boolean;
// } = {
//     title: 'books',
//     price: 89,
//     InStock: true,
// }


//FUNCTIONS

// function add(a: number, b: number): string {
//      return 'hello world'
// }

// function subtract(a:number,b:number): number {
//     return a-b;
// }

// function divide(a:number,b:number): number {
//     return a /b
// }

// function square(a:number,) : number {
//     return a*a
// }

// // console.log(square(2))



//similarly ARROW FUNCTION

// const multiply = (a:number, b:number):number => a*b 
// 
// 
// console.log(multiply(3,3));


type user = {
    name:string,
    age: number,
    description?: any,
}

const user1 : user = { name : 'prudhvi', age : 25, description : 'hi this is prudhvi'}



type product = {
    title : string,
    inStock: boolean,
    price : number
}

const  chair: product = { title : 'plastic chair',price : 26_00, inStock: false} 


type employee = {

    name? : string,

    isOnboard: boolean,

    salary: number

}

const employee1 : employee ={ isOnboard :true,salary : 10_000,}

console.log(employee1);