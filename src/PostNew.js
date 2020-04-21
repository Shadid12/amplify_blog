import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createPost, updatePost } from './graphql/mutations';
import { getPost } from './graphql/queries';
import { useParams } from "react-router-dom";

export default function PostNew(props) {
    let { id } = useParams();
    const [title, setTitle] = React.useState();
    const [body, setBody] = React.useState();

    React.useEffect(() => {
        if(props.isEdit) {
            queryPost()
        }
    },[])

    const queryPost = async () => {
        try {
          let response = await API.graphql(graphqlOperation(getPost, { id }));
          console.log('Post To Edit ===>>>>', response.data.getPost);
          setTitle(response.data.getPost.title);
          setBody(response.data.getPost.content);
        } catch (error) {
          console.log(error);
        }
    }

    const createNew = async () => {
        if(props.isEdit) {
            updateCurrentPost()
        } else {
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
    }

    const updateCurrentPost = async () => {
        try {
            let input = {
                id,
                title,
                content: body
            }
            let response = await API.graphql(graphqlOperation(updatePost, {input}))
            console.log('updated -->', response)
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