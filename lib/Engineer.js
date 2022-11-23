const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(id, name, email, github){
        super(id, name, email);
        if(typeof github !== "string" || !github.trim().length){
            throw new Error('Expected parameter "github" to be a non-empty string ')
        }
        this.github = github
    }
    get getGithub(){
        return this.github
    }
    get getRole(){
        return {id: this.id, name: this.name, email:this.email, github: this.github}
    }
}
module.exports = Engineer