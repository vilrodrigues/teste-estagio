const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'app',
  password: 'postgres',
  port: 5432,
})

const getUsers = (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  pool.query('SELECT * FROM candidatos', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserByEmail = (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  const email = request.params.email

  pool.query('SELECT * FROM candidatos WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  const { email, nome, sobrenome, data_nascimento, cpf, data_criacao, data_atualizacao } = request.body

  pool.query('INSERT INTO candidatos (email, nome, sobrenome, data_nascimento, cpf, data_criacao, data_atualizacao) VALUES ($1, $2, $3, $4, $5, $6, $7)', [email, nome, sobrenome, data_nascimento, cpf, data_criacao, data_atualizacao], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with EMAIL: ${results.insertEmail}`)
  })
}

const updateUser = (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  const email = request.params.email
  const { nome, sobrenome, data_nascimento, cpf, data_criacao, data_atualizacao } = request.body

  pool.query(
    'UPDATE candidatos SET nome = $1, sobrenome = $2, data_nascimento = $3, cpf = $4, data_criacao = $5, data_atualizacao = $6,  WHERE email = $7',
    [nome, sobrenome, data_nascimento, cpf, data_criacao, data_atualizacao, email],
    (error) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with EMAIL: ${email}`)
    }
  )
}

const deleteUser = (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  const email = request.params.email

  pool.query('DELETE FROM users WHERE email = $1', [email], (error) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with EMAIL: ${email}`)
  })
}

module.exports = {
    getUsers,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
}