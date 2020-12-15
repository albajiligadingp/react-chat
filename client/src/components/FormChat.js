import React, { Component } from 'react'

export default class FormChat extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', chats: '' };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeChats = this.handleChangeChats.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }
    handleChangeChats(event) {
        this.setState({ chats: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.add(this.state.name, this.state.chats);
        this.setState({ name: '', chats: '' });
    }

    render() {
        return (
            <div className="bottom_wrapper clearfix">
                <form onSubmit={this.handleSubmit}>
                    <div className="message_input_wrapper">
                        <input class="message_input" placeholder="Your name..." value={this.state.name} onChange={this.handleChangeName} />
                    </div>
                    <div className="message_input_wrapper">
                        <input class="message_input" placeholder="Write your chat here..." value={this.state.chats} onChange={this.handleChangeChats} />
                    </div>
                    <button className="btn btn-send btn-lg btn-block" id="btn-chat">
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        )
    }
}
