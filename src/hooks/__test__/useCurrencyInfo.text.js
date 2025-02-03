import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import useCurrencyInfo from "./useCurrencyInfo";

// Mock fetch API
global.fetch = vi.fn();

describe("useCurrencyInfo Hook", () => {
  afterEach(() => {
    vi.restoreAllMocks(); // Reset mocks after each test
  });

  test("fetches and returns currency data", async () => {
    const mockResponse = {
      usd: {
        eur: 0.85,
        inr: 74.5,
      },
    };

    fetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useCurrencyInfo("usd")
    );

    // Initially, data should be empty
    expect(result.current).toEqual({});

    // Wait for the hook to fetch and update state
    await waitForNextUpdate();

    expect(result.current).toEqual(mockResponse.usd);
  });

  test("fetch is called with the correct URL", async () => {
    fetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue({ usd: { eur: 0.85 } }),
    });

    renderHook(() => useCurrencyInfo("usd"));
    expect(fetch).toHaveBeenCalledWith(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json"
    );
  });
});
