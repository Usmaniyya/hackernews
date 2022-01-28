import React from 'react';
import { useState } from 'react';

export default function Lists() {
    const h1 = 'Welcome to React';
    const [lists, setList] = useState([
        {
            title: 'React ',
            url: 'https://facebook.github.io/react/',
            author: 'Jordan Walke ',
            num_comments: 3,
            points: 4,
            objectId: 0,
        },
        {
            title: 'Redux ',
            url: 'https://github.com/reactjs/redux/',
            author: 'Dan Abramov, Andrew Clark ',
            num_comments: 2,
            points: 2,
            objectId: 1,
        }
    ])
    
    const handleDelete = (objectId) => {
        const newList = lists.filter(list => list.objectId !== objectId)
        setList(newList)
    }
    return (
        <div>
            <h1>{h1}</h1>
            <form>
                <input type="text" onChange={isSearched()} />
                </form>
            {lists.map(list => {
                return(
                    <div key={list.objectId}>
                        <span>
                            <a href={list.url}>{list.title}</a>
                        </span>
                        <span>{list.author}</span>
                        <span>{list.num_comments}</span>
                        <span>{list.points}</span>
                        <span>
                            <button onClick={() => handleDelete(list.objectId)}>Dismiss</button>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
