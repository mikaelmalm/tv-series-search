import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import ShowView from "./Show";
import { createWrapper } from "../../tests/QueryWrapper";
import { Route, Routes } from "react-router-dom";

describe("ShowView", () => {
  it("renders correctly", async () => {
    const { getByText } = render(
      <Routes>
        <Route path="/shows/:id" element={<ShowView />} />
      </Routes>,
      {
        wrapper: createWrapper("/shows/123"),
      }
    );

    await waitFor(() => expect(getByText("Lost")).toBeInTheDocument());
    await waitFor(() => expect(getByText("Season 3")).toBeInTheDocument());
  });
});
