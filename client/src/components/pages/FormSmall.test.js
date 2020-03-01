import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReactDOM from "react-dom";
import App from "../../App";
import FormSmall from "./FormSmall";

test("render fill in details", () => {
  const { getByText } = render(<FormSmall />);
  const linkElement = getByText(/Fill in details/i);
  expect(linkElement).toBeInTheDocument();
});
