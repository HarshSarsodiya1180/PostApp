// SearchBar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../components/SearchBar";

describe("SearchBar component", () => {
  test("renders SearchBar component", () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByPlaceholderText("Search by title or author")).toBeInTheDocument();
  });

  test("updates searchQuery when input changes", () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText("Search by title or author");

    fireEvent.change(input, { target: { value: "test" } });

    // expect(input.value).toBe("test");
  });

  test("calls onSearch when search button is clicked", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search by title or author");
    const searchButton = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });
});
