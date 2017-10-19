import React from "react";
import request from "superagent";

// TODO: input validation
// TODO: !!!!introduce local storage!!!!!
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mail: "", password: ""};
    }
    handleSubmit = (e) => {
        e.preventDefault();

        // let mail = this.state.mail;
        // let password = this.state.password;
        request
            .post('http://localhost:1337/api/user/register')
            // .set('Content-Type', 'application/vnd.api+json')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            // .send({ mail: this.state.mail, password: this.state.password})
            .send({ mail: this.state.mail, password: this.state.password})
            .end((err, res) => {
                console.log(res.body._id);
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
                    <p>Register </p>
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

export default Register;