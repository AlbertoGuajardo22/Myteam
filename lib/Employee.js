class Employee { 
    constructor(id,name, email){
        if(typeof id !== "string" || !id.trim().length){
            throw new Error('Expected parameter "id" to be a non-empty string ')
        }
        if(typeof name !== "string" || !name.trim().length){
            throw new Error('Expected parameter "name" to be a non-empty string ')
        }
        if(typeof email !== "string" || !email.trim().length){
            throw new Error('Expected parameter "email" to be a non-empty string ')
        }
        this.id = id
        this.name = name
        this.email = email
    }
    get getName(){
        return this.name
    }
    get getId(){
        return this.id
    }
    get getEmail(){
        return this.email
    }
    get getRole(){
        return {id: this.id, name: this.name, email:this.email}
    }
}
module.exports = Employee