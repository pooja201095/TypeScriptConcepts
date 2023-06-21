import { ProjectInput } from "./Components/projectInput";
import { ProjectList } from "./Components/projectList";

  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");

// ****************************** libraries example ******************************

// import Testclass from "./Model/test.model";
// import { validate } from "class-validator";

// declare var GLOBAL:any; //if you know you have a global var 
// console.log(GLOBAL);

// import _ from 'lodash'; requires to install @types/lodash too as lodash is a js library
// console.log(_.shuffle([1,2,3,4]));
// import 'reflect-metadata';
// import { plainToInstance } from 'class-transformer'; no types required
// import Testclass from './Model/test.model';

// let tests = [
//   {
//     title:'a',
//     desc:'a'
//   },
//   {
//     title:'b',
//     desc:'b'
//   },
//   {
//     title:'c',
//     desc:'c'
//   }
// ]

// let libTests = plainToInstance(Testclass,tests);
// libTests.map(l=> l.getInfo());

// let test1 = new Testclass('',5);
// validate(test1).then(err=>{
//   if(err.length>0){
//     console.log(err)
//   } else {
//     test1.getInfo();
//   }
// })

