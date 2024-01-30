// PostDetails.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import PostDetails from "../components/PostDetails";
import { MemoryRouter, Routes, Route } from "react-router-dom";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("PostDetails component", () => {
  test("renders PostDetails component with data", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        title: "Test Post",
        url: "http://example.com",
        // other properties...
      },
    });

    render(
      <MemoryRouter initialEntries={[`/details/123`]}>
        <Routes>
          <Route path="/details/:postId" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Post")).toBeInTheDocument();
      expect(screen.getByText("http://example.com")).toBeInTheDocument();
      // Add more assertions based on your component's structure
    });
  });

  test("handles error during data fetching", async () => {
    const errorMessage = "Failed to fetch data";

    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <MemoryRouter initialEntries={[`/details/123`]}>
        <Routes>
          <Route path="/details/:postId" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the asynchronous request to complete and the component to re-render
    await waitFor(() => {
      expect(
        screen.getByText(`Error fetching post details: ${errorMessage}`)
      ).toBeInTheDocument();
      // You can add more assertions based on your error handling in the component
    });
  });
});
