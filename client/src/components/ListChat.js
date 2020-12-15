import React from 'react'
import ItemChat from './ItemChat'

export default function ListChat(props) {
    const listNode = props.data.map((item, index) =>
        <ItemChat
            index = {index}
            key={item.id}
            id={item.id}
            name={item.name}
            chats={item.chats}
            sent={item.sent}
            hapus={() => props.remove(item.id)}
            ulang={() => props.resend(item.id, item.name, item.chats)}
        />)

    return (
        <div>
            {listNode}
        </div>
    )
}
