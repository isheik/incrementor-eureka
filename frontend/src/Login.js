import React from "react";
import request from "superagent";
import store from "store";

// TODO: change hostname and port for post
// TODO: take a look fdsafa case
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mail: "", password: ""};
    }
    handleSubmit = (e) => {
        e.preventDefault();

        // TODO: need to implement error handling
        // TODO: take care of error case (currently error msg returend but should not store it)
        request
            .post('http://localhost:1337/api/user/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ mail: this.state.mail, password: this.state.password})
            .end((err, res) => {
                store.set('token', res.body);
                console.log(store.get('token'));
            });
    }
    handleMailChange = (e) => {
        this.setState({
            mail: e.target.value
        });
    }
    handlePassChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    render() {
        return (
            <div>
                <form action="" method="post">
                    <p>Login </p>
                    <p>mail</p>
                    {/* <input type="text" name="mail"/> */}
                    <input type="text" value={this.state.mail} name="mail" onChange={this.handleMailChange}/>
                    <p>password</p>
                    {/* <input type="text" name="password"/> */}
                    <input type="password" value={this.state.password} name="password" onChange={this.handlePassChange}/>
                    <input type="submit" onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }
};

export default Login;