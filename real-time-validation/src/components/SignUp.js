import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TextField, FormControl, Button, IconButton, InputAdornment, CircularProgress } from '@material-ui/core'
import { Visibility, VisibilityOff, CheckCircle } from '@material-ui/icons'
import { signup, getUsernames, emailCheck } from '../store/actions'
import {usernameSearch, fetchAllUsers} from '../Helpers/usernameAlgo'
import axios from 'axios'

const addCorrect = fieldSet => {
    if (fieldSet.classList.contains('incorrect')) fieldSet.classList.remove('incorrect')
    fieldSet.classList.add('correct')
}

const addIncorrect = fieldSet => {
    if (fieldSet.classList.contains('correct')) fieldSet.classList.remove('correct')
    fieldSet.classList.add('incorrect')
}

class SignUp extends Component {
    state = {
        newUser: {
            name: '',
            email: '',
            username: '',
            password: '',
            confirm: '',
        },
        userInfo: false,
        passReqs: false,
        confirmed: false,
        showPassword: false,
        loading: false,
        success: false,
        github: []
    }

    async componentDidMount() {
        await this.props.getUsernames()
        fetchAllUsers()
    }

    checkUserInfo = () => {
        const name = document.querySelector('#name').value
        const email = document.querySelector('#email').value
        const username = document.querySelector('#username').value
        if (name.length > 0 && email.length > 0 && username.length) {
            this.setState({
                userInfo: true
            })
        } else {
            this.setState({
                userInfo: false
            })
        }
    }

    checkName = () => {
        const fieldSet = document.querySelector('.user-name fieldset')
        const name = document.querySelector('#name').value
        if (name.length > 0) {
            this.setState({
                userInfo: true
            })
            addCorrect(fieldSet)
        } else {
            this.setState({
                userInfo: false
            })
            addIncorrect(fieldSet)
        }
    }

    checkUsername = () => {
        // let taken = false
        // const fieldSet = document.querySelector('.username-sign fieldset')
        // const usernames = this.props.usernames.usernames
        // const username = document.querySelector('#username').value
        // if (username.length > 6) {
        //     usernames.forEach(element => {
        //         if (element.username === username) {
        //             taken = true
        //             // break
        //         } 
        //     });
        //     if (!taken) {
        //         this.setState({
        //             userInfo: true
        //         })
        //         addCorrect(fieldSet)
        //     } else {
        //         this.setState({
        //             userInfo: false
        //         })
        //         addIncorrect(fieldSet)
        //     }
        // } else {
        //     this.setState({
        //         userInfo: false
        //     })
        //     addIncorrect(fieldSet)
        // }
        usernameSearch()
    }

    checkEmail = async () => {
        const fieldSet = document.querySelector('.user-email fieldset')
        const email = document.querySelector('#email').value
        const requirement = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/
        if (email.match(requirement)) {
            await this.props.emailCheck(email)
            console.log(this.props.emailTaken)
            if (!this.props.emailTaken.email) {
                this.setState({
                    userInfo: true
                })
                addCorrect(fieldSet)
            } else {
                this.setState({
                    userInfo: false
                })
                addIncorrect(fieldSet)
            }
        } else {
            this.setState({
                userInfo: false
            })
            addIncorrect(fieldSet)
        }
    }

    checkPassword = () => {
        const fieldSet = document.querySelector('.password-sign fieldset')
        const password = document.querySelector('#password').value
        let requirements = /^(?=(.*[\W]){1,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,36}$/
        if (password.match(requirements)) {
            this.setState({
                passReqs: true
            })
            addCorrect(fieldSet)
        } else {
            this.setState({
                passReqs: false
            })
            addIncorrect(fieldSet)
        }
    }

    confirmPassword = () => {
        const fieldSet = document.querySelector('.confirm-sign fieldset')
        const password = document.querySelector('#password').value
        const confirm = document.querySelector('#confirm').value
        if (password === confirm) {
            this.setState({
                confirmed: true
            })
            addCorrect(fieldSet)
        } else {
            this.setState({
                confirmed: false
            })
            addIncorrect(fieldSet)
        }
    }

    showPass = e => {
        e.preventDefault()
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleChanges = e => {
        this.setState({
            newUser: {
                ...this.state.newUser,
                [e.target.name]: e.target.value
            }
        })
        if (e.target.name === 'password') this.checkPassword()
        if (e.target.name === 'name') this.checkName()
        if (e.target.name === 'email') this.checkEmail()
        if (e.target.name === 'username') this.checkUsername()
        if (this.state.newUser.confirm.length > 0) this.confirmPassword()
        this.checkUserInfo()
    }

    handleSubmit = e => {
        e.preventDefault()
        if (!this.state.loading) {
            this.setState({
                loading: true,
                success: false,
            })
        }
        setTimeout(() => {
            this.setState({
                loading: false,
                success: true
            })
        }, 2000);
        console.log(this.state.newUser)
        this.props.signup(this.state.newUser)
    }

    ButtonRender = () => {
        if (this.state.passReqs && this.state.confirmed && this.state.userInfo) {
            return (
                <>
                    <Button type='submit' color='primary' variant='contained' size='large'>
                        Sign Up
                </Button>
                    {this.state.loading && <CircularProgress size={24} />}
                    {this.state.success && <CheckCircle />}
                </>
            )
        } else {
            return (
                <Button type='submit' color='primary' variant='contained' size='large' disabled>
                    Sign Up
                </Button>
            )
        }
    }

    render() {
        console.log(this.state.github)
        return (
            <div className='signupform'>
                <form onSubmit={this.handleSubmit}>
                    <FormControl>
                        <TextField
                            id='name'
                            className='user-name'
                            name='name'
                            type='text'
                            value={this.state.newUser.name}
                            onChange={this.handleChanges}
                            variant='outlined'
                            margin='normal'
                            label='Name'
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            id='email'
                            name='email'
                            type='email'
                            className='user-email'
                            value={this.state.newUser.email}
                            onChange={this.handleChanges}
                            variant='outlined'
                            margin='normal'
                            label='E-mail'
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            id='username'
                            className='username-sign'
                            name='username'
                            type='text'
                            value={this.state.newUser.username}
                            onChange={this.handleChanges}
                            variant='outlined'
                            margin='normal'
                            label='Username'
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            className='password-sign'
                            id='password'
                            name='password'
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.newUser.password}
                            onChange={this.handleChanges}
                            variant='outlined'
                            margin='normal'
                            label='Password'
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment >
                                        <IconButton
                                            edge='end'
                                            aria-label='Toggle password visibility'
                                            onClick={this.showPass}
                                        >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            id='confirm'
                            name='confirm'
                            type={this.state.showPassword ? 'text' : 'password'}
                            className='confirm-sign'
                            value={this.state.newUser.confirm}
                            onChange={this.handleChanges}
                            variant='outlined'
                            margin='normal'
                            label='Confirm'
                            required
                        />
                    </FormControl>
                    {this.ButtonRender()}
                    <Link to='/'>I already have an account, Log in.</Link>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ signingUp, signedUp, checkingEmail, gettingUsernames, usernames, emailTaken, error }) => ({
    signingUp,
    signedUp,
    checkingEmail,
    gettingUsernames,
    usernames,
    emailTaken,
    error
})

export default connect(
    mapStateToProps,
    { signup, emailCheck, getUsernames }
)(SignUp)