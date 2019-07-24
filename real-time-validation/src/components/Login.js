import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TextField, Button, FormControl } from '@material-ui/core'
import { login } from '../store/actions'

class Login extends Component {

    state = {
        user: {
            username: '',
            password: ''
        }
    }

    handleChanges = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state.user)
    }

    render() {
        return (
            <div className='loginform'>
                <form method='POST' onSubmit={this.handleSubmit}>
                    <FormControl>
                        <TextField
                            id='username'
                            label='Username'
                            type='text'
                            name='username'
                            value={this.state.user.username}
                            variant='outlined'
                            onChange={this.handleChanges}
                            margin='normal'
                            required
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            id='password'
                            label='Password'
                            type='password'
                            name='password'
                            value={this.state.user.password}
                            variant='outlined'
                            onChange={this.handleChanges}
                            margin='normal'
                            required
                        />
                    </FormControl>
                    <Button type='submit' variant='contained' color='primary'>
                        Log In
                    </Button>
                    <Link to='/signup'>I don't have an account, Sign up.</Link>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ loggingIn }) => ({
    loggingIn
})

export default connect(
    mapStateToProps,
    { login }
)(Login)