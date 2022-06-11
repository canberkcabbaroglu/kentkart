import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '@/services';
import './LoginPage.css';
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        if (authenticationService.userNameValue) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className='login'>

                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().required('Lütfen bu alanı boş bırakmayın.'),
                        password: Yup.string().required('Lütfen bu alanı boş bırakmayın.')
                    })}
                    onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(email, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched}) => (
                        <Form className="loginForm"
                        >
                            <div className="form-floating mb-3">

                                <Field name="email" type="email" placeholder=" " className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <label htmlFor="email">E-Posta Adresi</label>
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-floating mb-3">

                                <Field name="password" type="password" placeholder=" " className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <label htmlFor="password">Şifre</label>
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="loginButton btn btn-primary">Giriş Yap
                                </button>



                            </div>
                            {status &&
                                <div className={'alert alert-primary'}>{status}</div>
                            }

                        </Form>
                    )}
                />









            </div>
        )
    }
}

export { LoginPage }; 