import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface PostDetailsParams {
  postId: string;
}

interface PostDetailsState {
  post: any;
}

const PostDetails: React.FC = () => {
  const { postId } = useParams<PostDetailsParams>();
  const [post, setPost] = useState<PostDetailsState["post"]>(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!postId) {
        // Handle the case where postId is not available
        console.error("postId is not available");
        return;
      }

      try {
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/items/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <h2>{post?.title}</h2>
      <p>
        <b>URL:</b> <a href={post?.url}>{post?.url}</a>
      </p>
      {/* Include other details as needed */}
      <pre>
        <b>{JSON.stringify(post, null, 2)}</b>
      </pre>
    </div>
  );
};

export default PostDetails;
