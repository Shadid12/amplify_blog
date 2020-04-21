import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import Home from './Home';
import PostNew from './PostNew';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getPost } from './graphql/queries';
import { deletePost } from './graphql/mutations';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import './app.css';

function App() {

  const logout = async () => {
    await Auth.signOut();
  }

  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <Link to="/"><b>Home</b></Link>
          <a onClick={logout} className="lnk">Logout</a>
        </nav>

        <Switch>
          <Route path="/post/:id">
            <Post />
          </Route>
          <Route path="/posts/new">
            <PostNew />
          </Route>
          <Route path="/posts/edit/:id">
            <PostNew isEdit/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Post() {
  let { id } = useParams();
  const [post, setPost] = React.useState(null);
  
  React.useEffect(() => {
    queryPost();
  }, [])

  const queryPost = async () => {
    try {
      let response = await API.graphql(graphqlOperation(getPost, { id }));
      setPost(response.data.getPost)
      console.log('Post Now ===>>>>', response.data.getPost);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCurrentPost = async () => {
    try {
      let input = {
        id: post.id
      }
      let response = await API.graphql(graphqlOperation(deletePost, { input }));
      console.log('--->>> DELETED', response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {post ? (
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <a onClick={deleteCurrentPost}>Delete</a>
          <Link to={`/posts/edit/${post.id}`}><b>Edit</b></Link>
          <ul>
            {
              post.comments.items.map(com => (<li>{com.content}</li>))
            }
          </ul>
        </div>
      ): <div>Loading...</div>}
    </div>
  )
}

function Users() {
  return <h2>Users</h2>;
}

export default withAuthenticator(App);
