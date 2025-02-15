import { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const generatePassword = () => {
    if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
      toast.error("Select at least one checkbox!");
      return;
    }

    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

    let characters = "";
    if (includeUpper) characters += upperCase;
    if (includeLower) characters += lowerCase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex container flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Toaster />
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-green-500">
          Password Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Create a secure, random password instantly!
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <div className="flex items-center bg-gray-200 p-2 rounded-md">
            <input
              id="password"
              type="text"
              value={password}
              readOnly
              className="flex-1 bg-transparent text-lg p-1 outline-none"
            />
            <MdOutlineContentCopy
              onClick={copyToClipboard}
              className="cursor-pointer text-gray-600"
              size={24}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Length: {length}</label>
          <input
            type="range"
            min="6"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label>Uppercase Letters</label>
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={() => setIncludeUpper(!includeUpper)}
            />
          </div>
          <div className="flex justify-between">
            <label>Lowercase Letters</label>
            <input
              type="checkbox"
              checked={includeLower}
              onChange={() => setIncludeLower(!includeLower)}
            />
          </div>
          <div className="flex justify-between">
            <label>Numbers</label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
          </div>
          <div className="flex justify-between">
            <label>Symbols</label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
          </div>
        </div>

        <button
          onClick={generatePassword}
          className="w-full mt-4 flex items-center justify-center gap-2 shadow-md cursor-pointer text-green-500 p-2 rounded-lg hover:bg-green-600"
        >
          <AiFillThunderbolt /> Generate
        </button>
      </div>
    </div>
  );
}

export default App;
