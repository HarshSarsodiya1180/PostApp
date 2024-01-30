// PostList.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import PostList from "../components/PostList";

test("renders PostList component", () => {
  render(
    <MemoryRouter>
      <PostList />
    </MemoryRouter>
  );
  // Add more specific assertions based on your component
  expect(screen.getByText("Search")).toBeInTheDocument();
});

test("handles search and displays results", async () => {
  render(
    <MemoryRouter>
      <PostList />
    </MemoryRouter>
  );

  // Mock an API request (you might need to adjust this based on your actual API call)
  const axiosMock = jest.spyOn(require("axios"), "get");
  axiosMock.mockResolvedValueOnce({
    data: {
      hits: [
        {
          objectID: "123",
          title: "Test Post",
          author: "Test Author",
          url: "http://example.com",
          created_at: "2022-01-01",
          _tags: ["test", "example"],
        },
      ],
    },
  });

  // Trigger a search
  const searchInput = screen.getByPlaceholderText("Search by title or author");
  const searchButton = screen.getByText("Search");

  fireEvent.change(searchInput, { target: { value: "test" } });
  fireEvent.click(searchButton);

  // Wait for the mock API call to complete and update the component
  await waitFor(() => {
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });
});

// Add more test cases based on your specific requirements
