import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import Axios from 'axios'

import '../styles/pages/register.sass'

const register = () => {
  const handleClickRegister = (values) => {
    Axios.post('http://localhost:3001/register', {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg)
    })
  }

  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Não é um e-mail válido")
      .required("Digite um e-mail"),
    password: yup
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres")
      .required("Digite uma senha"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "As senhas devem ser iguais"),
  })

  return (
    <div className='register-container'>
      <div className="register-container-content">
        <h1>Registrar</h1>
        <Formik initialValues={{}}
          onSubmit={handleClickRegister}
          validationSchema={validationRegister}>
          <Form className="register-form">
            <div className="register-form-group">
              <Field className="form-field"
                name='email'
                placeHolder='Digite seu e-mail' />
              <ErrorMessage className='form-error'
                name='email'
                component='span' />
            </div>

            <div className="register-form-group">
              <Field className="form-field"
                name='password'
                placeHolder='Digite sua senha'
                type="password" />
              <ErrorMessage className='form-error'
                name='password'
                component='span' />
            </div>

            <div className="register-form-group">
              <Field className="form-field"
                name='confirmPassword'
                placeHolder='Confirme sua senha' 
                type="password" />
              <ErrorMessage className='form-error'
                name='confirmPassword'
                component='span' />
            </div>
            <div className="form-buttons">
              <button className="button" type='submit'>Registrar</button>
              <button><Link className="button-link" to='/'>Já tenho Login</Link></button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )

}

export default register