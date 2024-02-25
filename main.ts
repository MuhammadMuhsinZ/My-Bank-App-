import inquirer from "inquirer"
import chalk from "chalk"
import {faker} from "@faker-js/faker"
// Customer class 
class Customer{
    firstname:string
    lastname:string
    age:number
    gender:string
    mobilenumber:number
    accountnumber:number
    
    constructor(Fname:string,Lname:string,age:number,gender:string,Mobnum:number,accountnumber:number){
        this.firstname = Fname
        this.lastname = Lname
        this.age = age
        this.gender = gender
        this.mobilenumber = Mobnum
        this.accountnumber = accountnumber
    }
};
// Bank interface 
interface BankAccount {
    Accountnumber:number
    balance: number
}
// Class Bank 
class Bank {
    customer:Customer [] = []
    account : BankAccount [] =[]
    addCustomer(obj:Customer){
        this.customer.push(obj);
    }
    addaccountnumber(obj:BankAccount){
        this.account.push(obj);
    }
}
 let mybank = new Bank()

// creat customers 
for(let i:number = 1; i<=3; i++){
    let fName = faker.person.firstName(`male`)
    let lName = faker.person.lastName()
    let mobNum =parseInt( faker.phone.number("3#########"))
    const Cus = new Customer(fName,lName,25*i, "male",mobNum,1000+i)
    mybank.addCustomer(Cus);
    mybank.addaccountnumber({Accountnumber:Cus.accountnumber, balance:100*i})
}
///////// Bank Functionality/////
 async function bankservice(bank:Bank){
    let service = await inquirer.prompt({
        type:`list`,
        name:`select`,
        message:"please select the service",
        choices:["View Balance","Cash Withdraw", "Cash Deposite"]
    });
    if(service.select == "View Balance"){
        let res = await inquirer.prompt({
            type:`input`,
            name:`Number`,
            message:"Please enter your account number"
        });
        let account = mybank.account.find((acc)=>acc.Accountnumber == res.Number)
        if(!account){
            console.log(chalk.bold.red("invalid account number"))
        }
        if(account){
            let name = mybank.customer.find((item)=>item.accountnumber == account?.Accountnumber )
           console.log(`Dear ${chalk.bold.green(name?.firstname)} ${chalk.bold.red(name?.lastname)} your Account balance is ${chalk.bold.italic.blueBright("$",account.balance)}`)
        }
    };

    if(service.select == "Cash Withdraw"){}
    if(service.select == "Cash Deposite"){}
    
 }