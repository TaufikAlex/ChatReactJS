import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const axios = require('axios');
class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            fullname: '',
            message: '',
            content: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
    }

    handleSubmit = e => {
         e.preventDefault()
        const api = `http://localhost:4000/api/users`
        const data = {
            fullname: this.state.fullname,
            message: this.state.message
        }

        // send new message
        // socket.emit('send-message', data);

        var socket = io.connect('http://localhost:3001');
        socket.emit('send-message', function (data) {
            console.log('this data >', data);
            // socket.emit('send-message', { my: 'data' });
        });

        axios.post(api, data)
    }


    handleChange = (e) => {
        this.setState({ fullname: e.target.value })
    }


    render() {
        return (
            <li className="timeline-inverted">
                <button className="timeline-badge success" type="submit" ><i className="fa fa-plus"></i></button>
                <div className="timeline-panel">
                    <form onSubmit={this.handleSubmit} >
                        <div className="timeline-heading">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Full name" value={this.state.fullname} name="fullname" onChange={(e) => this.setState({ fullname: e.target.value })} />
                            </div>
                        </div>
                        <div className="timeline-body">
                            <div className="form-group">
                                <textarea className="form-control" placeholder="Type a message" rows="2" value={this.state.message} name="message" onChange={(e) => this.setState({ message: e.target.value })}></textarea>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">send</button>
                    </form>
                </div>
            </li>

        )
    }
}

export default Form; 