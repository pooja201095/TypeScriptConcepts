function add(n1:number,n2:number,showRes:boolean,res:string) {
    let result = n1+n2;
    if(showRes){
        console.log(res+result)
    }
    return n1+n2;
}

let num1 = 5;
let num2 = 3.2;
let printRes = true;
let result = 'Result is: ';

add(num1,num2,printRes,result);


// object, enum, array
enum Role {ADMIN='ADMIN',AUTHOR=1,READ_ONLY}

let person: {
    name: string;
    age:number,
    hobbies: string[],
    job:[number,string],
    role: Role
} = {
    name:'pooja',
    age:27,
    hobbies: ['cooking','reading'],
    job:[2,'developer'],
    role: Role.READ_ONLY
}

// person.role.push(3); //doesnt give error for push

// person.role[1]=3; not allowed -error
// person.role = [1,'admin',123]; not allowed- error

console.log(person.role);

// union, literal, alias

type Combineable =  number | string ;


function combine(input1: Combineable, input2: Combineable, returnAs : 'as-number' | 'as-text'){
    let result;
    if(typeof input1 === "number" && typeof input2 == "number" || returnAs == 'as-number'){
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }

    return result;
    
}

let combineAge = combine(2,25,'as-number');
console.log(combineAge);

let combineStringAge = combine('2','25','as-number');
console.log(combineStringAge);

let combineNames = combine('pooja','chavan','as-text');
console.log(combineNames);

