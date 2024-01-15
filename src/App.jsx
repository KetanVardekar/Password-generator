import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gradient-to-r from-purple-700 to-indigo-800">
        <h1 className="text-center my-3 flex shadow rounded-lg overflow-hidden mb-4 text-3xl font-bold">
          Password Generator
        </h1>

        <div className="flex flex-col mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-gray-700 text-white rounded-md mb-2"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-purple-600 transition duration-300"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col text-sm gap-y-2 items-center mb-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer bg-gray-300 rounded-md w-full"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              style={{
                background: `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${
                  (length / 100) * 100
                }%, #d3d3d3 ${(length / 100) * 100}%, #d3d3d3 100%)`,
              }}
            />
            <label className="text-gray-300">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              style={{
                accentColor: "rgb(166, 221, 17)",
              }}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-gray-300">
              Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              style={{
                accentColor: "rgb(166, 221, 17)",
              }}
            />
            <label htmlFor="charInput" className="text-gray-300 break-all">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
