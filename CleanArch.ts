//Extrema --> FRAMEWORKS / DRIVE / UI --> Detalles de implementación
//Mocks --> Stubs

//TODO: crear interfaz backAccount

interface DBBankAccount {
    id: string;
    data: BankAccount;
}

enum StatusStates {
    'SUCCESS' = 'success',
    'FAILED' = 'failed'
}

class DBBank {
    constructor() {}
    //la diferencia entre un Map y un array es que el Map tiene una clave y un valor que puedo asignar y el array solo tiene un valor
    listOfAccounts = new Map<string, BankAccount>();

    addOne(bdUser: DBBankAccount) {
        this.listOfAccounts.set(bdUser.id, bdUser.data);
        return { status: StatusStates.SUCCESS, message: 'Se pudo guardar correctamente' }
    }

    getOne(id: string) {
        const user = this.listOfAccounts.get(id);
        if(!user){
            return { status: StatusStates.FAILED, message: `couldn't find the bankAccount user` }
        }

        return { status: StatusStates.SUCCESS, message: 'bankAccount user found', data: user }
    }
}


const bd = new DBBank();
//Adaptador --> nexo entre use case y external
//Nunca acceder de manera directa a una capa externa
class DBAdapter {
  construtor(private readonly db: DBBank) {}
//bien generico por si algun dia cambia la capa externa
  addOne(user: User) {
    const newBankAccount = new BankAccount(user);
    //adaptar la data
    const formattedData = {
        id: user.name,
        data: newBankAccount
    };

    this.db.addOne(formattedData);
  }

  getOne(id: string){
    return this.getOne(id);
  }
}

//use Cases --> Reglas de aplicación

class App {
    constructor(private readonly dbAdapter: DBAdapter) {}

    register(user: User){
        try{
            this.dbAdapter.addOne(user);
            return { status: StatusStates.SUCCESS, message: 'anduvo papaaaaaaa :v' }
        } catch (error: any) {
            return { status: StatusStates.FAILED, message: 'no anduvo naaaaaah :,(' }
        }
    }
}

//Dominio
interface User {
    name: string
    lastName: string
    age: number
}

class BankAccount {
    user: User;
    minimumAge = 18
    constructor(user: User) {
        if(this.checkMinimumAge(user)){
            this.user = user;
        }
    }

    private checkMinimumAge(user: User) {
        return user.age >= this.minimumAge;
    }
}