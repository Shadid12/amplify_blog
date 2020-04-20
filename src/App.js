import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import Home from './Home';

import { API, graphqlOperation } from 'aws-amplify';
import { getPost } from './graphql/queries';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import './app.css';

function App() {

  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <Link to="/"><b>Home</b></Link>
        </nav>

        <Switch>
          <Route path="/post/:id">
            <Post />
          </Route>
          <Route path="/users">
            <Users />
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
  return (
    <div>
      {post ? (
        <div>
          <h3>{post.title}</h3>
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
