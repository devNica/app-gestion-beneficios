import { useState } from 'react'
import CustomNotification from '../../Components/Notification/CustomNotification'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../redux/notification.slice'
import PropTypes from "prop-types"

import './form.css'


export default function LoginForm({ handleOnSubmit }) {

    CustomNotification()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleClick() {

        if (username === '') {
            dispatch(setNotification({
                message: 'No se ha ingresado un nombre de usuario',
                type: 'warning',
                delay: 1500
            }))
            return
        }

        if (password === '') {
            dispatch(setNotification({
                message: 'No se ha ingresado una contrasenia valida',
                type: 'warning',
                delay: 1500
            }))
            return
        }


        handleOnSubmit({
            username,
            password
        })
    }

    return (
        <form action="" className='form'>
            <div className="form__group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    placeholder='digite su nombre de usuario'
                    id='username'
                    name='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="form__group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    placeholder='digite su password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                type='button'
                className='btn btn__success'
                onClick={handleClick}
            >
                Iniciar Sesion
            </button>
        </form>
    )
}

LoginForm.propTypes ={
    handleOnSubmit: PropTypes.func
}