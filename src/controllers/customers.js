const CustomersModel = require('../models/customers')
const { crypto } = require('../utils/password')

const defaultTitle = 'Cadastro de clientes'

// renderiza a view 'register'
function index(req, res)  {
    res.render('register', {
        title: defaultTitle
    })
}
//adciona usuário
async function add(req, res) {
    const { name, age, email, password } = req.body
    
    const passwordCrypto = await crypto(password)

    const register = new CustomersModel({
        name,
        age,
        email,
        password: passwordCrypto
    })

    register.save()
    res.render('register', {
        title: defaultTitle,
        message: "cadastro realizado com sucesso"
    })
}

// lista usuário
async function list(req,res) {
    const users = await CustomersModel.find() // método do mongoose promise
    res.render('list', {
        title: 'Listagem de usuários',
        users,
    })
}

async function formEdit(req, res) {
    const { id } = req.query

    const user = await CustomersModel.findById(id)
    res.render('edit',{
        title: 'Editar Usuário',
        user
    })
}

async function edit(req, res){
    const { name, age, email } = req.body

    const { id } = req.params

    const user = await CustomersModel.findById(id)


    user.name = name
    user.age = age
    user.email = email

    user.save()
    res.render('edit', {
        title: 'Editar usu´rio',
        user,
        message: 'Usuário alterado com sucesso'
    })
}
module.exports = {
    index,
    add,
    list,
    formEdit,
    edit
}