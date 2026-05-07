import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Signupform() {
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState("");
  const { signup } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(username, region);
    navigate("/dashboard");
    console.log(`Username is ${username}, and favorite region is ${region}`);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  return (
    <section
      id="signup"
      className="max-w-xl mx-auto my-12 p-10 bg-white rounded-2xl shadow-2xl border border-gray-300"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
        Create Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
              className="px-3 py-2 rounded-md bg-white border border-gray-400 placeholder-gray-400 focus:bg-white"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="region">Favorite Region</label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
              className="px-3 py-2 rounded-md bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-teal-800 hover:bg-teal-700 text-white font-medium py-2.5 rounded-full transition-colors"
        >
          EXPLORE NOW
        </button>
      </form>
    </section>
  );
}
