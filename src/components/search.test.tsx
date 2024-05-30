import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Search from "./Search";

describe("Search", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <Search value="" onChange={() => {}} onClear={() => {}} />
    );
    expect(getByPlaceholderText("Search for a show")).toBeInTheDocument();
  });

  it("calls onChange when input changes", () => {
    const mockOnChange = vi.fn();
    const { getByPlaceholderText } = render(
      <Search value="" onChange={mockOnChange} onClear={() => {}} />
    );

    fireEvent.change(getByPlaceholderText("Search for a show"), {
      target: { value: "new value" },
    });

    expect(mockOnChange).toHaveBeenCalledWith("new value");
  });

  // Assuming you add an endAdornment with the ClearIcon and call onClear when it's clicked
  it("calls onClear when clear icon is clicked", () => {
    const mockOnClear = vi.fn();
    const { getByRole } = render(
      <Search value="some value" onChange={() => {}} onClear={mockOnClear} />
    );
    fireEvent.click(getByRole("button"));
    expect(mockOnClear).toHaveBeenCalled();
  });
});
