import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchExample = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data))
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000); // ✅ delay setLoading(false)
      });
  }, []);

  return loading ? ( // ✅ correct ternary
    <p>Loading...</p>
  ) : (
    <div>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};

export default FetchExample;

