const Employee = require("./Employee");

class Intern extends Employee { 
    constructor(id, name, email,school){
        super(id, name, email)
        if(typeof school !== "string" || !school.trim().length){
            throw new Error('Expected parameter "school" to be a non-empty string ')
        }
        this.school = school
    }
    get getSchool(){
        return this.school
    }
    get getRole(){
        return {id: this.id, name: this.name, email:this.email, github: this.school}
    }
}

module.exports = Intern