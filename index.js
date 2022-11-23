const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer')
const Intern  = require('./lib/Intern')
const Manager  = require('./lib/manager')

let fs = require('fs')
const info = []
const mainQuestions =  [ 
    {
        name: 'name',
        message: 'Ingrese el nombre',
        type: 'input'
    },
    {
        name: 'employeeId',
        message: 'Ingrese el identificador del empleado',
        type: 'input'
    },
    {
        name: 'email',
        message: 'Ingrese la direccion de correo electronico',
        type: 'input'
    },
    {
        name: 'office',
        message: 'Ingrese el numero de oficina',
        type: 'input'
    },
    
]
const helperQuestions =  [ 
    {
        name: 'helper',
        message: 'Agregar un ingeniero o pasante / terminar de formar mi equipo',
        type: 'list',
        choices: ['ingeniero','pasante','terminar']
    },
    
]
const internQuestions = [
    {
        name: 'name',
        message: 'Ingrese el nombre',
        type: 'input'
    },
    {
        name: 'employeeId',
        message: 'Ingrese el identificador del empleado',
        type: 'input'
    },
    {
        name: 'email',
        message: 'Ingrese la direccion de correo electronico',
        type: 'input'
    },
    {
        name:'school',
        message: 'Ingrese su nombre desu escuela',
        type: 'input'
    }
]
const engineerQuestions = [
    {
        name: 'name',
        message: 'Ingrese el nombre',
        type: 'input'
    },
    {
        name: 'employeeId',
        message: 'Ingrese el identificador del empleado',
        type: 'input'
    },
    {
        name: 'email',
        message: 'Ingrese la direccion de correo electronico',
        type: 'input'
    },
    {
        name:'github',
        message: 'Ingrese su nombre de usuario de github',
        type: 'input'
    }
]
inquirer.prompt(mainQuestions)
.then(function(answer){
    const manager = new Manager(answer.employeeId, answer.name,    answer.email, answer.office )
    info.push(manager)
    createOrEnd(answer)
});

function createOrEnd(data){
    inquirer.prompt(helperQuestions)
    .then(function(answer){
        const helper = answer.helper
        if(helper === 'ingeniero'){
            createEngineer()
        }
        if(helper === 'pasante'){
            createIntern()
        }
        if(helper === 'terminar'){
            createHTML()
        }
    });
}

function createEngineer(){
    inquirer.prompt(engineerQuestions)
    .then(function(answer){
       // { title: 's', employeeId: 's', email: 's', github: 's' }
        const engineer = new Engineer( answer.employeeId, answer.name, answer.email, answer.github )
        info.push(engineer)
        //createHelper(answer)
        createOrEnd()
    });
}

function createIntern(){
    inquirer.prompt(internQuestions)
    .then(function(answer){
        const intern = new Intern( answer.employeeId, answer.name, answer.email, answer.school )
        info.push(intern)
        //createHelper(answer)
        createOrEnd()
    });
}

function createHTML(){
    fs.writeFile('dist/index.html', createStruct(), (err)=>{
        if(err){

        }else{
            console.log("File was created")
        }
    })
}
function createStruct(data){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    
    <div class="row bg-danger mb-5 text-center">
        <div class="col-12">
        <h1 class="text-white text-center"> My team</h1>
        </div>
      
    </div>
    <div class="container">
    
    <div class="row">     
    ${info && 
        info.map(res=> {
            return `
            <div class="col-4">
                <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                    <div class="card-header">${res.name}</div>
                    <div class="card-body bg-white">
                        <h5 class="card-title text-secondary">${res.officeNumber ? 'Manager' : res.github ? 'Engineer' : 'Intern'}</h5>
                        <p class="card-text text-secondary"></p>
                        <table class="table"> 
                            <tbody> 
                                <tr> 
                                    <td class="text-secondary"> ID: ${res.id}</td>
                                </tr>
                                <tr> 
                                    <td class="text-secondary"> 
                                    Email: 
                                        <a href="mailto:${res.email}?subject=Software Team">${res.email}</a>
                                    </td> 
                                </tr>
                                <tr><td class="text-secondary"> ${res.officeNumber ? ('Office Number ' + res.officeNumber) : res.github ?  ('GitHub ' + res.github) : ('School ' + res.school)}</td> </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            `
        })}
        </div>
        </div>
    </body>
    </html>`
}