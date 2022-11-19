import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import Axios from 'axios'

import '../styles/pages/login.sass'

const login = () => {
  const handleClickLogin = (values) => {
    Axios.post('http://localhost:3001/login', {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data)
    })
  }
  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Não é um e-mail válido")
      .required("Digite um e-mail"),
    password: yup
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres")
      .required("Digite uma senha"),
  })

  return (
    <div className='login-container'>
      <div className="login-container-content">
        <h1>Login</h1>
        <Formik initialValues={{}}
          onSubmit={handleClickLogin}
          validationSchema={validationLogin}>
          <Form className="login-form">
            <div className="login-form-group">
              <Field className="form-field"
                name='email'
                placeHolder='Digite seu e-mail' />
              <ErrorMessage className='form-error'
                name='email'
                component='span' />
            </div>

            <div className="login-form-group">
              <Field className="form-field"
                name='password'
                placeHolder='Digite sua senha'
                type='password' />
              <ErrorMessage className='form-error'
                name='password'
                component='span' />
            </div>
            <div className="form-buttons">
              <button className="button" type='submit'>Login</button>
              <button><Link className="button-link" to='/registrar'>Registrar</Link></button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default login