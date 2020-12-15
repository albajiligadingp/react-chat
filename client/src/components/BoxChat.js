import React, { Component } from 'react';
import ListChat from './ListChat';
import FormChat from './FormChat';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000/');

const request = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default class BoxChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.addChats = this.addChats.bind(this)
        this.removeChats = this.removeChats.bind(this)
        this.resendChats = this.resendChats.bind(this)
    }

    componentDidMount() {
        socket.on('receive-message', msg => {
            this.setState({
                data: [...this.state.data, msg]
            });
        });

        socket.on('deleted-message', id => {
            this.setState(function (state, props) {
                return {
                    data: state.data.filter(item => item.id !== id)
                };
            });
        });

        request.get('chat')
            .then(function (response) {
                const data = response.data.map(item => {
                    item.sent = true;
                    return item
                })
                this.setState({ data: data })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })

    }

    addChats(name, chats) {
        const id = Date.now();
        this.setState(function (state, props) {
            return {
                data: [...state.data, { id, name, chats, sent: true }]
            };
        });

        socket.emit('send-message', {
            id,
            name,
            chats
        })

        request.post('chat', { id, name, chats })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                this.setState(function (state, props) {
                    return {
                        data: state.data.map(item => {
                            if (item.id === id) {
                                item.sent = false;
                            }
                            return item;
                        })
                    };
                });
            }.bind(this))
    }

    removeChats(id) {
        this.setState((state, props) => ({
            data: state.data.filter(item => item.id !== id)
        }));
        socket.emit('delete-message', {id})
        
        request.delete(`chat/${id}`).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    resendChats(id, name, chats) {
        request.post('chat', { id, name, chats })
            .then(function (response) {
                this.setState(function (state, props) {
                    return {
                        data: state.data.map(item => {
                            if (item.id === id) {
                                item.sent = true;
                            }
                            return item;
                        })
                    };
                });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <div className="chat_window overflow-auto">
                    <div className="top_menu">
                        <div className="buttons">
                            <div className="button close"></div>
                            <div className="button minimize"></div>
                            <div className="button maximize"></div>
                        </div>
                        <div className="title">React Chat</div>
                    </div>
                    <div>
                    <ul className="messages">
                        <ListChat data={this.state.data} remove={this.removeChats} resend={this.resendChats} />
                    </ul>
                    </div>
                    <div>
                    <FormChat add={this.addChats} />
                    </div>
                </div>
            </div>
        )
    }
}
