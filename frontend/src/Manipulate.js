import React from "react";
import request from "superagent";
import store from "store";

// TODO: change hostname and port for post
// TODO: take a look fdsafa case
class Manipulate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resetval: ""
           ,token: store.get('token')
           ,msg: ""
           ,error: ""
        };
    }
    handleResetSubmit = (e) => {
        e.preventDefault();

        // TODO: need to implement error handling
        // TODO: take care of error case (currently error msg returend but should not store it)
        request
            .post('http://localhost:1337/api/data/resetidentifier')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ resetval: this.state.resetval, token: this.state.token})
            .end((err, res) => {
                if (res.status === 200) {
                    this.setState({
                        msg: 'Current identifier:' + res.body
                    });
                } else if (res.status === 404) {
                    this.setState({
                        error: 'Please login first.'
                    });
                } else if (res.status === 400) {
                    this.setState({
                        error: 'Only integer is allowed.'
                    });
                }
            });
    }
    handleCurrentSubmit = (e) => {
        e.preventDefault();

        // TODO: need to implement error handling
        // TODO: take care of error case (currently error msg returend but should not store it)
        request
            .post('http://localhost:1337/api/data/currentidentifier')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token: this.state.token})
            .end((err, res) => {
                if (res.status === 200) {
                    this.setState({
                        msg: 'Current identifier:' + res.body
                    });
                } else if (res.status === 404) {
                    this.setState({
                        error: 'Please login first.'
                    });
                }
 
            });
    }
    handleNextSubmit = (e) => {
        e.preventDefault();

        // TODO: need to implement error handling
        // TODO: take care of error case (currently error msg returend but should not store it)
        request
            .post('http://localhost:1337/api/data/nextidentifier')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token: this.state.token})
            .end((err, res) => {
                if (res.status === 200) {
                    this.setState({
                        msg: 'Retrieved identifier:' + res.body
                    });
                } else if (res.status === 404) {
                    this.setState({
                        error: 'Please login first.'
                    });
                }
            });
    }
    handleResetChange = (e) => {
        this.setState({
            resetval: e.target.value
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
                <h2>Set or Get identifier </h2>
                <label>Get current identifier:
                <button type="button" onClick={this.handleCurrentSubmit}>Get Current</button>
                </label>
                <label>Get next identifier:
                <button type="button" onClick={this.handleNextSubmit}>Get Next</button>
                </label>
                {"\n"}
                <form action="" method="post">
                    <label>Reset identifier:
                    <input type="text" value={this.state.resetval} name="resetval" onChange={this.handleResetChange}/>
                    <input type="submit" onClick={this.handleResetSubmit}/>
                    </label>
                </form>
                <div id="msg">{this.state.msg}</div>
                <div className="error">{this.state.error}</div>
            </div>
        );
    }
};

export default Manipulate;