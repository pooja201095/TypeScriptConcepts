function Logger(customString:string){
    console.log('Logger Decorator');
    return function(constructor:Function){
        console.log(customString);
        console.log(constructor);
    }
}
// Factory Decorator
// meta programming - can be used as a library which any dev can use to render a template
function RenderTemplate(template:string,hookId:string){
    console.log('Template Decorator');
    return function<T extends {new (...args:any[]):{name:string}}>(originalConstructor:T){
        console.log('Template decorator function');
        return class extends originalConstructor{
            constructor(..._:any[]){
                super();
                let hook = document.getElementById(hookId)!;
                hook.innerHTML= template;
                hook.querySelector('h1')!.textContent =this.name;
            }
        }   
    }
}

@Logger('Logging - person class')
@RenderTemplate('<h1>Hi There</h1>','app')
class Person {
    name='PC';

    constructor(){
        console.log('Constructor called');
    }
}
let p1 = new Person();

// All 4 types of decorators
function Log(target:any,propertyName:string|Symbol){
    console.log('Property Decorator');
    console.log(target,propertyName);
}
function Log2(target:any,name:string|Symbol,descriptor:PropertyDescriptor){
    console.log('Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target:any,name:string|Symbol,descriptor:PropertyDescriptor){
    console.log('Function Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target:any,name:string|Symbol,position:number){
    console.log('Parameter Decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    @Log
    title:string;
    private _price:number;

    constructor(t:string,p:number){
        this.title=t;
        this._price=p;
    }

    @Log2
    set price(val:number){
        if(val>0){
            this._price=val;
        }
    }

    @Log3
    getPriceWithTax(@Log4 tax:number){
        return this._price *= (1+tax);
    }
}

let comb = new Product('Comb',20);
console.log(comb.getPriceWithTax(10));

// Auto binding of function example
function Autobind(_:any,_2:string,descriptor:PropertyDescriptor):PropertyDescriptor{
    let originalMethodDescriptor= descriptor.value;
    let newMethodDescriptor = {
        configurable:true,
        enumerable:false,
        get(){
            let bindedFunc = originalMethodDescriptor.bind(this);
            return bindedFunc;
        }
    }
    return newMethodDescriptor;
}
class PrintMsg {
    message = 'This works'

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

let print1 = new PrintMsg();

let btn = document.querySelector('button')!;
btn.addEventListener('click',print1.showMessage);


// Validation with Decorators
// can use class-validator which is an exsisting functionality for ts class validation similar to below implementation
interface ValidatorConfig {
    [className:string]:{
        [property:string]:string[] // ['required','positive']
    }
}

let registeredValidators:ValidatorConfig = {};

function RequiredVal(target:any,propName:string){
    registeredValidators[target.constructor.name]={
        ...registeredValidators[target.constructor.name],
        [propName]:[...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    }
}

function PositiveVal(target:any,propName:string){
    registeredValidators[target.constructor.name]={
        ...registeredValidators[target.constructor.name],
        [propName]:[...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    }
}

function Validate(obj:any){
    const classObjToValidate = registeredValidators[obj.constructor.name];
    if(!classObjToValidate) {
        return true;
    }
    let isValid = true;
    for(const prop in classObjToValidate) {
        for(const validator of classObjToValidate[prop]){
            switch(validator){
                case 'positive':
                    isValid = isValid && obj[prop]>0;
                    break;
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @RequiredVal
    title:string;
    @PositiveVal
    price:number;

    constructor(t:string,p:number){
        this.title=t;
        this.price=p;
    }
}

let courseForm = document.querySelector('form');

courseForm?.addEventListener('submit',function(e){
    e.preventDefault();
    let title = document.querySelector('.title')! as HTMLInputElement;
    let price = document.querySelector('.price')! as HTMLInputElement;

    let c1 = new Course(title.value,+price.value);
    if(!Validate(c1)){
        alert('Please enter correct vals');
        return;
    }
    console.log(c1);
})

