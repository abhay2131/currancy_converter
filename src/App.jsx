import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setTo(from);
    setFrom(to);
    setAmount(convertedAmount); // Set amount to the convertedAmount
    setConvertedAmount(amount); // Set convertedAmount to the amount
  };

  const convert = () => {
    const conversionRate = currencyInfo[to];
    setConvertedAmount(amount * conversionRate);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
           style={{
              backgroundImage: `url('${`https://media.istockphoto.com/id/1695498192/photo/government-shutdown-imminent-federal-debt-soars.jpg?s=2048x2048&w=is&k=20&c=nVkekVXMxqFj0rNTq6iULSiFq-fY-V-bZiy8lvqcOZ0=`}')`,
           }}>
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)} // Update from currency
                  selectCurrency={from} // Set selectCurrency prop to from
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)} // Update to currency
                  selectCurrency={to} // Set selectCurrency prop to to
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg" onClick={convert}>
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

