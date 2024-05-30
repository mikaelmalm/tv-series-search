import { describe, it, expect } from "vitest";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import HomeView from "./Home";
import { createWrapper } from "../../tests/QueryWrapper";

describe("HomeView", () => {
  it("renders correctly", async () => {
    const { getByPlaceholderText } = render(<HomeView />, {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(getByPlaceholderText("Search for a show")).toBeInTheDocument()
    );
  });

  it("lists shows without search", async () => {
    const { getByText } = render(<HomeView />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(getByText("Glee")).toBeInTheDocument());
  });

  it("searches for shows", async () => {
    const { findByPlaceholderText } = render(<HomeView />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(screen.queryByText("Lost")).toBeNull());

    const searchInput = await findByPlaceholderText("Search for a show");
    fireEvent.change(searchInput, { target: { value: "Lost" } });
  });

  it("shows no results when no shows are found", async () => {
    const { findByPlaceholderText, getByText } = render(<HomeView />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(screen.queryByText("Lost")).toBeNull());

    const searchInput = await findByPlaceholderText("Search for a show");
    fireEvent.change(searchInput, { target: { value: "randomshow" } });

    await waitFor(() => {
      expect(getByText("No shows found")).toBeInTheDocument();
    });
  });

  it("goes back to first page when clearing the search", async () => {
    const { findByPlaceholderText, getByText, findByTestId } = render(
      <HomeView />,
      {
        wrapper: createWrapper(),
      }
    );

    const searchInput = await findByPlaceholderText("Search for a show");
    fireEvent.change(searchInput, { target: { value: "Lost" } });

    await waitFor(() => {
      expect(getByText("Lost")).toBeInTheDocument();
    });

    const clearButton = await findByTestId("ClearIcon");
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.queryByText("Lost")).toBeNull();
      expect(screen.queryByText("Glee")).toBeInTheDocument();
    });
  });
});
