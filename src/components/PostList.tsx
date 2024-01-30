//PostList.tsx
import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

interface PostListProps {}

const PostList: React.FC<PostListProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchPosts = async (key: string, page = 0, searchQuery = "") => {
    const response = await axios.get(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}&query=${searchQuery}`
    );
    return response.data;
  };

  const { data, fetchNextPage } = useInfiniteQuery(
    ["posts", searchQuery],
    ({ pageParam = 0 }) => fetchPosts("posts", pageParam, searchQuery),
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNextPage();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchNextPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Refetch data with the new search query
    fetchNextPage({ pageParam: 0 });
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      <div
        style={{
          marginTop: "100px",
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.hits.map((post: any) => (
              <div
                style={{
                  boxShadow: "10px 10px 15px -4px rgba(179,179,179,0.55)",
                  padding: "6px",
                  borderRadius: "8px",
                  maxWidth: "300px",
                  wordWrap: "break-word",
                }}
                key={post.objectID}
              >
                <h3>{post.title}</h3>
                <p>
                  <b>Author:</b> {post.author}
                </p>
                <p>
                  <b>URL:</b> <a href={post.url}>{post.url}</a>
                </p>
                <p>
                  <b>Created At:</b> {post.created_at}
                </p>
                <p>
                  <b>Tags:</b> {post._tags.join(", ")}
                </p>
                <p>
                  <b>{post.author}</b>
                </p>
                <Link to={`/details/${post.objectID}`}>View Details</Link>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default PostList;
