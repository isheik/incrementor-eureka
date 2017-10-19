import React from "react";
import request from "superagent";
import store from "store";

// TODO: change hostname and port for post
// TODO: take a look fdsafa case
class Manipulate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {resetval: ""};
    }
    handleResetSubmit = (e) => {
        e.preventDefault();

        // TODO: need to implement error handling
        // TODO: take care of error case (currently error msg returend but should not store it)
        request
            .post('http://localhost:1337/api/data/resetidentifier')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ resetval: this.state.resetval, token: store.get('token')})
            .end((err, res) => {
                console.log(res.body);
            });
    }
    handleCurrentSubmit = (e) => {
        e.preventDefault();

        // TODO: need to implement error handling
        // TODO: take care of error case (currently error msg returend but should not store it)
        request
            .post('http://localhost:1337/api/data/currentidentifier')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token: store.get('token')})
            .end((err, res) => {
                console.log(res.body);
            });
    }
    handleNextSubmit = (e) => {
        e.preventDefault();

        // TODO: need to implement error handling
        // TODO: take care of error case (currently error msg returend but should not store it)
        request
            .post('http://localhost:1337/api/data/nextidentifier')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token: store.get('token')})
            .end((err, res) => {
                console.log(res.body);
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
                <p>Reset identifier or Get current identifier </p>
                <form action="" method="post">
                    <p>Reset identifier</p>
                    <input type="text" value={this.state.resetval} name="resetval" onChange={this.handleResetChange}/>
                    <input type="submit" onClick={this.handleResetSubmit}/>
                </form>
                <form action="" method="post">
                    <p>Get current identifier</p>
                    <input type="submit" onClick={this.handleCurrentSubmit}/>
                </form>
                <form action="" method="post">
                    <p>Get next identifier</p>
                    <input type="submit" onClick={this.handleNextSubmit}/>
                </form>
            </div>
        );
    }
};

export default Manipulate;