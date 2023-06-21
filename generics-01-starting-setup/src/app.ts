// Function generics

function merge<T extends {}, U extends object>(o1:T,o2:U){
    return Object.assign(o1,o2);
}
const mergered = merge({name:'pc',title:'CEO'},{age:27});
console.log(mergered);

interface Lengthy {
    length:number
}
function countAndDescribe<T extends Lengthy>(element:T){
    let description ='Got no values';
    if(element.length == 1){
        description ='Got 1 value';
    } else if(element.length > 1) {
        description =`Got ${element.length} values`;
    }

    return [element,description];
}
console.log(countAndDescribe('a'));

    // Keyof
function extract<T extends {},U extends keyof T>(obj:T, key:U){
    return obj[key];
}
console.log(extract({name:'pooja'},'name'));

// Generic Classes

class DataStorage<T extends string | number | boolean> {
    private data:T[]=[];

    addItem(item:T){
        this.data.push(item);
    }

    removeItem(item:T){
        this.data.splice(this.data.indexOf(item),1);
    }

    getItems(){
        return this.data
    }
}

let stringData = new DataStorage<number>();
stringData.addItem(1);
stringData.addItem(2);
stringData.addItem(8);
stringData.removeItem(2);
console.log(stringData.getItems());
