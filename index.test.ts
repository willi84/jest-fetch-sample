import { convert } from './index';

describe('my test suite', () => {
  beforeEach(() => {
    // Mock the fetch function before each test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // Clear the fetch mock after each test
    (global.fetch as jest.Mock).mockClear();
    delete global.fetch;
  });

  it('should test something', async () => {
    // Set the return value of the fetch mock
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
      // json: () => Promise.resolve({data: 'some data'}),
    });

    // Call the function that makes the HTTP request
    const result = await convert('USD', 'CAD');

    // Assert that the function returns the expected value
    expect(result).toEqual(1.42);
    expect(fetch).toHaveBeenCalledTimes(1);
    // Assert that the fetch mock was called once with the correct URL
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.exchangeratesapi.io/latest?base=USD'
    );
  });
});
