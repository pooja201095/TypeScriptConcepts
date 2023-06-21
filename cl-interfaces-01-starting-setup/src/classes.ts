// Code goes here!

// abstract classes cannot be instantiated
abstract class Department {
    // private id:number
    // public name:string

    // static properties and methods can be accessed by class and not instances
    static fiscalYear= 2023

    // protected - can be accessed in classess that inherit it - private can't
    protected employees:string[] =[]

    constructor(protected readonly id:number,public name:string) { 
        //if you add private and name:type directly in parameter of constructer then no need of declaring and assigning again 
        // this.id = id;
        // this.name = n;
    }

    static addEmpDummy(name:string) {
        return {name:name}
    }

    // abstract means each class extending this one needs to implement this function - mandatory
    abstract describe(this:Department):void;
    //  {
    //     console.log("Department: " + this.name + " Id is :" + this.id);
    // }

    addEmployees(emp:string){
        this.employees.push(emp);
    }

    printEmployeeList(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class IT extends Department {
    public admins

    constructor(id:number,admins:string[]){
        super(id, 'IT');
        this.admins = admins;
    }

    describe(): void {
        console.log('ID department id :'+ this.id);
    }

    addAdmins(admin:string){
        this.admins.push(admin);
    }

    // overriding
    addEmployees(emp:string){
        if(emp == 'QW') {
            return;
        }
        this.employees.push(emp);
    }
}

class Accounting extends Department {
    private lastReport:string
    private static instance:Accounting

    //  priavte constructor makes the class singleton 
    // i.e it can have only 1 instance and can be created using static method from within class
    private constructor(id:number,public reports:string[]){
        super(id,'Accounting')
        this.reports = reports;
        this.lastReport = reports[0];
    }

    get mostRecentReport() {
        if(this.lastReport){
            return this.lastReport;
        }
        throw Error('No report found');
    }

    set mostRecentReport(report:string) {
        if(!report){
            throw Error('Pass a valid report');
        }
        this.addReports(report);
       
    }

    static getInstance(){
        if(this.instance){
            return this.instance;
        }

        this.instance = new Accounting(1,[]);
        return this.instance;
    }

    describe(): void {
        console.log('Accounting department id :'+ this.id);
    }

    addReports(report:string){
        this.reports.push(report);
        this.lastReport = report;
    }

    showReports(){
        console.log(this.reports);
    }

}

console.log(Department.addEmpDummy('pooja'));
let accounting = Accounting.getInstance();
// let accounting2 = Accounting.getInstance(); will be same instance as its a singleton class
accounting.describe();
accounting.addEmployees('PC');
accounting.addEmployees('HD');
accounting.printEmployeeList();
accounting.addReports('first report');
accounting.addReports('second report');
accounting.showReports();
console.log(accounting.mostRecentReport);
accounting.mostRecentReport = 'Most recent';
accounting.showReports();
console.log(accounting.mostRecentReport);
console.log(accounting);

let it = new IT(2,[]);
it.describe();
it.addEmployees('QW');
it.addEmployees('ER');
it.printEmployeeList();
it.addAdmins('A1');
it.addAdmins('A2');
console.log(it);
