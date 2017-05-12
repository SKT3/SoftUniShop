export class User{
    id: number;
    email: string;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
    cash: number;
    roles: any;

    constructor(data){
        for(let key of Object.keys(data)){
            this[key] = data[key];
        }
    }

    is(role: string){
      return this.roles.name == role;
    }

    hasEnoughMoney(money: number): boolean{
      return this.cash > money;
    }
}
