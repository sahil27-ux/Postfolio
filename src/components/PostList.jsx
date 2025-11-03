import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListData);

  // const [fetching, setFetching] = useState(false);

  // useEffect(() => {
  //   setFetching(true);
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   fetch("https://dummyjson.com/posts", {signal })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       addInitialPosts(data.posts);
  //       setFetching(false);
  //     });
  //   return () => {
  //     console.log("Cleaning up useEffect");
  //     controller.abort();
  //   };
  // }, []);

const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPosts = async () => {
      try {
        setFetching(true);

        const response = await fetch("https://dummyjson.com/posts",{signal});
        const data = await response.json();

        addInitialPosts(data.posts);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch Abort");
        } else {
          console.error("Error fetching posts:", error);
        }
      } finally {
        setFetching(false);
      }
    };

    fetchPosts();

    return () => {
      console.log("Cleaning up useEffect");
      controller.abort();
    };
  }, []);

  return (
    <>
      {fetching && <LoadingSpinner />}
      <div className="post-container">
        {!fetching && postList.length === 0 && <WelcomeMessage />}
        {!fetching &&
          postList.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </>
  );
};
export default PostList;
