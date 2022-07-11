//* Display a single post
//* Creater, Post image, likes, dislikes, collections, description, comment input bar, comments(replies)

import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import CommentsList from "../../comment/components/CommentsList";
import { AuthContext } from "../../context/AuthContext";
import ErrorModal from "../../shared/components/ErrorModal";
import PostDetails from "../components/PostDetails";
import TextAndComments from "../components/TextAndComments";

import styles from './Post.module.css';

const post = {
  avatar:
    "https://preview.redd.it/3fc3wd5xwf171.png?auto=webp&s=efea2e1ae32067ea07fc547585f64a95171c7902",
  username: "Bob Pants",
  postImage: "https://i.redd.it/t7s70gt3qkd41.jpg",
  description: "This is the post's description",
};

function Post(props) {
  //* http://localhost:3002/posts/3 ===> postId = 3

  const auth = useContext(AuthContext);

  const history = useHistory();

  const params = useParams();
  const { postId } = params;
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsloading(true);
        let response = await fetch(`http://localhost:5000/api/posts/${postId}`);
        let responseData = await response.json();
        setIsloading(false);
        if (!response.ok) {
          throw new Error(responseData.message);
        };
        console.log(responseData)
        setPost(responseData.post);
      } catch (error) {
        console.log(error)
        setError(error.message);
      }
      setIsloading(false);
    })();
  }, [])

  return (
    <Fragment>

      {!isLoading &&

        <div>
          {error && <ErrorModal error={error} onClear={() => setError(null)} />}
          {post &&
            <div className={`${styles.container}`}>

              <div className={`${styles.div}`}>
                <PostDetails post={post} />
              </div>


              <section className={`${styles.post_info}`} >
                <TextAndComments post={post}/>
              </section>

            </div>
          }
        </div>
      }
    </Fragment>
  );
}

export default React.memo(Post);
