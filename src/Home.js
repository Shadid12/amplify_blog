import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from './graphql/queries';
import { Link, withRouter } from "react-router-dom";

function Home(props) {
    const [posts, setPosts] = React.useState([]);
  
    React.useEffect(() => {
      getAllPosts()
    }, [])
  
    const getAllPosts = async () => {
      try {
        let allposts = await API.graphql(graphqlOperation(listPosts));
        setPosts(allposts.data.listPosts.items)
        console.log('all listPosts', allposts)
      } catch (error) {
        console.log(error)
      }
    }
  
    return (
      <div class="row">
        <div className="column column-50">
          <h2>Posts</h2>
          <ul>
            {
              posts.map(p => (
                <li>
                  <Link to={`/post/${p.id}`}>{p.title}</Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="column column-offset-25">
          <button onClick={() => props.history.push('/posts/new')}>Write Post</button>
        </div>
      </div>
    )
}

export default withRouter(Home);