import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { vi } from "vitest";

// Mock the useCurrencyInfo hook
vi.mock("./hooks/useCurrencyInfo", () => ({
  default: vi.fn(() => ({ inr: 83.0, usd: 1.0, eur: 0.85 })),
}));

describe("App Component", () => {
  test("renders input boxes and convert button", () => {
    render(<App />);
    expect(screen.getByLabelText("From")).toBeInTheDocument();
    expect(screen.getByLabelText("To")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /convert/i })
    ).toBeInTheDocument();
  });

  test("updates amount on input change", () => {
    render(<App />);
    const fromInput = screen.getByPlaceholderText("Amount");
    fireEvent.change(fromInput, { target: { value: "100" } });
    expect(fromInput).toHaveValue(100);
  });

  test("performs currency conversion", () => {
    render(<App />);
    const fromInput = screen.getByPlaceholderText("Amount");
    const convertButton = screen.getByRole("button", { name: /convert/i });

    fireEvent.change(fromInput, { target: { value: "10" } });
    fireEvent.click(convertButton);

    expect(screen.getByPlaceholderText("Amount")).toHaveValue(10);
    expect(screen.getAllByPlaceholderText("Amount")[1]).toHaveValue(830); // 10 * 83 (INR conversion rate)
  });

  test("swaps currency values correctly", () => {
    render(<App />);
    const swapButton = screen.getByRole("button", { name: /swap/i });

    fireEvent.click(swapButton);
    expect(screen.getByLabelText("From")).toHaveDisplayValue("INR");
    expect(screen.getByLabelText("To")).toHaveDisplayValue("USD");
  });
});
