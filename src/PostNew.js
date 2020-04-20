import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createPost } from './graphql/mutations';

export default function PostNew() {
    const [title, setTitle] = React.useState();
    const [body, setBody] = React.useState();

    const createNew = async () => {
        try {
            let input = {
                title,
                content: body
            }
            let newPost = await API.graphql(graphqlOperation(createPost, {input}));
            setTitle('');
            setBody('');
            console.log('all newPost', newPost)
          } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2>
                New Post
            </h2>
            <label>Title: </label>
            <input 
                value={title}
                onChange={e => {
                    setTitle(e.target.value);
                }}
            />
            <label>Content: </label>
            <textarea 
                value={body}
                onChange={e => {
                    setBody(e.target.value);
                }}
            />
            <button
                onClick={createNew}
            >Submit</button>
        </div>
    )
}