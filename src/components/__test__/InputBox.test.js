import { render, screen, fireEvent } from "@testing-library/react";
import InputBox from "../InputBox";
import { vi } from "vitest";

// Mock props
const mockProps = {
  label: "Amount",
  amount: 100,
  onAmountChange: vi.fn(),
  onCurrencyChange: vi.fn(),
  currencyOptions: ["USD", "EUR", "INR"],
  selectCurrency: "USD",
  amountDisable: false,
};

describe("InputBox Component", () => {
  test("renders label correctly", () => {
    render(<InputBox {...mockProps} />);
    expect(screen.getByText("Amount")).toBeInTheDocument();
  });

  test("renders input with correct value", () => {
    render(<InputBox {...mockProps} />);
    const inputElement = screen.getByPlaceholderText("Amount");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(100);
  });

  test("calls onAmountChange when input value changes", () => {
    render(<InputBox {...mockProps} />);
    const inputElement = screen.getByPlaceholderText("Amount");
    fireEvent.change(inputElement, { target: { value: "200" } });
    expect(mockProps.onAmountChange).toHaveBeenCalledWith(200);
  });

  test("renders select dropdown with correct options", () => {
    render(<InputBox {...mockProps} />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue("USD");
    mockProps.currencyOptions.forEach((currency) => {
      expect(screen.getByText(currency)).toBeInTheDocument();
    });
  });

  test("calls onCurrencyChange when selecting a different currency", () => {
    render(<InputBox {...mockProps} />);
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "EUR" } });
    expect(mockProps.onCurrencyChange).toHaveBeenCalledWith("EUR");
  });

  test("disables input and select when amountDisable is true", () => {
    render(<InputBox {...mockProps} amountDisable={true} />);
    expect(screen.getByPlaceholderText("Amount")).toBeDisabled();
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
