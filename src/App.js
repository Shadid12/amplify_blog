import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from './graphql/queries';

import './app.css';

function App() {

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getAllPosts()
  }, [])

  const getAllPosts = async () => {
    try {
      let allposts = await API.graphql(graphqlOperation(listPosts));
      console.log('all listPosts', allposts)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <nav className="nav">
        <a><b>Home</b></a>
      </nav>
      <div class="row">
        <div className="column column-50">
          <h2>Posts</h2>
          <ul>
            <li>
              <a>View This article</a>
            </li>
            <li>
              <a>View This article</a>
            </li>
          </ul>
        </div>
        <div className="column column-offset-25">
          <button>Write Post</button>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
