export class User{
    id: number;
    email: string;
    password: string;
    role: string;
    cash: number;

    constructor(data){
        for(let key of Object.keys(data)){
            this[key] = data[key];
        }
    }
}
