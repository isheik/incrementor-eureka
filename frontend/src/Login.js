import React from "react";
import request from "superagent";
import store from "store";

/**
 * Login component
 */
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             mail: ""
            ,password: ""
            ,token: store.get('token')
            ,error: ""};
    }
    /**
     * handle submit event. POST data to th WEB API server.
     * When successfuly logged in, store the token provided to
     * localstrage.
     */
    handleSubmit = (e) => {
        e.preventDefault();

        request
            .post('http://localhost:1337/api/user/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ mail: this.state.mail, password: this.state.password})
            .end((err, res) => {
                if (res.status === 200) {
                    store.set('token', res.body);
                    this.setState({
                        token: res.body
                    });
                } else if (res.status === 404) {
                    this.setState({
                        error: "mail or password are invalid."
                    });
                }
            });
    }
    /**
     * track mail text field change
     */
    handleMailChange = (e) => {
        this.setState({
            mail: e.target.value
        });
    }
    /**
     * track password text field change
     */
    handlePassChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    /**
     * handle logout button event.
     */
    logout = (e) => {
        this.setState({
            token: null
        });
        store.remove('token');
    }
    /**
     * render UI.
     * When not authenticated, provide login form.
     * When authenticated, provide logout button.
     */
    render() {
        return (
            <div>
                {this.state.token ? (
                    <div>
                        <h2>Login</h2>
                        <p>You are logged in!</p>
                        <button type="button" onClick={this.logout}>Logout</button>
                    </div>
                ) : (
                    <form action="" method="post">
                        <h2>Login</h2>
                        <label>mail:<input type="text" value={this.state.mail}
                            name="mail" onChange={this.handleMailChange}/></label>
                        <label>password:<input type="password" value={this.state.password} 
                            name="password" onChange={this.handlePassChange}/></label>
                        <input type="submit" onClick={this.handleSubmit}/>
                        <p className="error">{this.state.error}</p>
                    </form>
                )}
           </div>
        );
    }
};

export default Login;