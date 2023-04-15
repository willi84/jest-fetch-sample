export const convert = async (base, destination) => {
  try {
    const result = await fetch(
      `https://api.exchangeratesapi.io/latest?base=${base}`
    );
    const data = await result.json();
    return data.rates[destination];
  } catch (e) {
    return null;
  }
};
