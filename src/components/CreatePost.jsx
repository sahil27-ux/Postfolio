import { useContext, useRef } from "react";
import { PostList as PostListData } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostListData);

  const userIdElement = useRef();
  const postTitleElement = useRef(); 
  const postBodyElement = useRef();
  const postTagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
 
    const postBody = postBodyElement.current.value;
    const postTags = postTagsElement.current.value.split(" ");

    const imageUrl = URL.createObjectURL(postImageFile);

    addPost(userId, postTitle,  postBody, postTags);

    event.target.reset();
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter User Id
        </label>
        <input
          type="text"
          ref={userIdElement}
          className="form-control"
          id="userId"
          placeholder="User Id"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="How are you feeling today..."
        />
      </div>
    
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          ref={postBodyElement}
          rows="4"
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Post Tags
        </label>
        <input
          type="text"
          ref={postTagsElement}
          className="form-control"
          id="tags"
          placeholder="HashTags"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
