import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("renders home link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders submit form link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Submit form/i);
  expect(linkElement).toBeInTheDocument();
});

test("render edit form link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/edit form/i);
  expect(linkElement).toBeInTheDocument();
});
