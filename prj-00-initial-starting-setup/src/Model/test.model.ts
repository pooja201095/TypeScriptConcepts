import { IsNotEmpty,IsNumber,IsPositive } from "class-validator";

export default class Testclass {
    @IsNotEmpty()
    title:string;
    @IsNumber()
    @IsPositive()
    desc:number;

    constructor(t:string,d:number){
        this.title = t;
        this.desc = d;
    }

    getInfo(){
        console.log(this.title,this.desc);
    }
} 