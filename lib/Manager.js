const Employee = require("./Employee")

class Manager extends Employee { 
    constructor(id, name, email,officeNumber){
        super(id,name, email)
        if(typeof parseInt(officeNumber) !== 'number' || isNaN(Number(officeNumber))){
            throw new Error("Expected parameter 'office number' to be a non-empty number ")
        }
        this.officeNumber = officeNumber
    } 
    get getRole(){
        return {id: this.id, name: this.name, email:this.email, github: this.officeNumber}
    }
    
}

module.exports = Manager