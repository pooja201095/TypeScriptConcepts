type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}
// intersection with &
type ElevatedEmployee = Admin & Employee;
const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
};
console.log(e1);

// applicatble to any type
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Numeric & Combinable;
let u:Universal = 1;
console.log(u);


// 'property' in object
type UnknownEmp = Employee | Admin;

function printEmpInfo(emp:UnknownEmp){
  console.log(emp.name);
  if('startDate' in emp){
    console.log('StartDate ',emp.startDate);
  }
  if('privileges' in emp){
    console.log('Privileges ',emp.privileges);
  }
}

printEmpInfo(e1);
printEmpInfo({name:'pc',privileges:['read-write']});


// object instanceOf class
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving truck...');
  }

  loadCargo() {
    console.log('loaded');
  }
}

type Vehicle = Car | Truck;
let v1 = new Car;
let v2 = new Truck;

function useVehile(vehicle:Vehicle){
  if(vehicle instanceof Truck){
    vehicle.loadCargo();
  }
  vehicle.drive();
}
useVehile(v1);
useVehile(v2);


// type property
interface Bird {
  type:'bird',
  flyingSpeed:number
}

interface Horse {
  type:'horse',
  runningSpeed:number
}

type Animal = Bird | Horse;

function AnimalSpeed(animal:Animal) {
  let speed:number;
  switch(animal.type){
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;  
  }
  console.log('Speed is: ' + speed);
}

AnimalSpeed({type:'horse',runningSpeed:40})


// Type casting
let para = <HTMLInputElement>document.getElementById('input-text')!;
// or
// let para = document.getElementById('input-text')! as HTMLInputElement;

para.value = 'Hi There!'

// Index Properties
interface ErrorContainer {
  [prop:string]:string
}

const errorBag:ErrorContainer = {
  email:'Enter a valid email id',
  username:'Must start with char',
  mobile: 'Should be 10 digits long'
}


// Function Overloding
type Combineable =  number | string ;

function combine(input1: string, input2: string):string
function combine(input1: string, input2: number):string
function combine(input1: number, input2: string):string
function combine(input1: number, input2: number):number
function combine(input1: Combineable, input2: Combineable){
    if(typeof input1 === "number" && typeof input2 == "number"){
        return +input1 + +input2;
    } else {
        return input1.toString() + input2.toString();
    }
}

let res = combine(1,2);
Math.floor(res);
let res2 = combine('1','pc');
res2.split('');

// Optional Chaining
let obj = {
  name:'pc',
  age: 27,
  // job: {title:'CEO',desc:'blah blah'}
}

// console.log(obj?.job?.title); currently syntacx not supported hence giving error

// Nullish coalescing
let uname = '';

// || does not work for empty strinng ?? onyl checks for null and undefined
console.log(uname ?? 'Default')
