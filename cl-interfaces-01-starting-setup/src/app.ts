// An Interface is a structure which acts as a contract in our application. 
// It defines the syntax for classes to follow, 
// means a class which implements an interface is bound to implement all its members.
// type AddFn = (n1:number,n2:number) => number
interface AddFn {
    (n1:number,n2:number):number
}

let add:AddFn
add=(n1:number,n2:number)=>n1+n2;
console.log(add(2,3));


interface Named {
    readonly name:string;
    optionalName?:string
}

interface Greetable extends Named {
    greet(message:string):void;
}

class Person implements Greetable{
    name:string
    // optional parameter
    optionalName?:string
    age=27

    constructor(n:string,opt:string){
        this.name=n;
        if(opt){
            this.optionalName = opt;
        }
        
    }

    greet(message: string): void {
        console.log(message + this.name + this.optionalName);
    }
}

let user1:Person;

user1 = {
    name: 'pooja',
    optionalName:'chavan',
    age: 27,
    greet(message:string){
        console.log(message + this.name+this.optionalName);
    }
}

user1.greet('Hi ')