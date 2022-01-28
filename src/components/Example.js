// import React from "react";
import { Component } from "react";

const h1 = 'Welcome to React';
    const list = [
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
    ]
class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list:list
        };
    }
    render() {
        return(
            <div>
                { this.state.list.map(item => {
                    <div key={item.objectId}>
                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
                    </div>
                })}
            </div>
        )
    }
}

export default User;