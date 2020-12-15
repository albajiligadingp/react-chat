import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ItemChat(props) {
    return (
        <li className={`${props.index % 2 === 0 ? "message left appeared" : "message right appeared"}`}>
            <div className="avatar"></div>
            <div className="text_wrapper">
                <div className="text" >{props.name}</div>
                <div></div>
                <ReactMarkdown className="mb-0 text-dark" source={props.chats} />
            </div>
            {!props.sent && <p style={{ color: 'red', 'font-size': '8pt' }}>network failed</p>}
            {!props.sent && <i className="fas fa-redo" onClick={props.ulang}></i>}
            {props.sent && <i className="fas fa-trash-alt" onClick={props.hapus}></i>}
        </li>
    )
}