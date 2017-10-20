import React from "react";
import request from "superagent";
import store from "store";

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

        request
            .post('http://localhost:1337/api/data/resetidentifier')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ resetval: this.state.resetval, token: this.state.token})
            .end((err, res) => {
                if (res.status === 200) {
                    this.setState({
                        msg: 'Current identifier:' + res.body
                       ,error: ""
                    });
                } else if (res.status === 404) {
                    this.setState({
                        error: 'Please login first.'
                    });
                } else if (res.status === 400) {
                    this.setState({
                        error: 'Only positive integer is allowed.'
                    });
                }
            });
    }
    handleCurrentSubmit = (e) => {
        e.preventDefault();

        request
            .post('http://localhost:1337/api/data/currentidentifier')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token: this.state.token})
            .end((err, res) => {
                if (res.status === 200) {
                    this.setState({
                        msg: 'Current identifier:' + res.body
                       ,error: ""
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

        request
            .post('http://localhost:1337/api/data/nextidentifier')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token: this.state.token})
            .end((err, res) => {
                if (res.status === 200) {
                    this.setState({
                        msg: 'Retrieved identifier:' + res.body
                       ,error: ""
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
                    <label>Reset identifier:
                    <input type="text" value={this.state.resetval} name="resetval" onChange={this.handleResetChange}/>
                    <button type="button" onClick={this.handleResetSubmit}>Reset</button>
                    </label>
                <div id="msg">{this.state.msg}</div>
                <div className="error">{this.state.error}</div>
            </div>
        );
    }
};

export default Manipulate;