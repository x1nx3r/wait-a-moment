import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Please wait a few seconds.");
  const [attempts, setAttempts] = useState(0);
  const BACKEND_PING = import.meta.env.VITE_PING_URL;
  const BACKEND_REDIRECT = import.meta.env.VITE_REDIRECT_URL;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    async function waitForBackend() {
      let tries = 0;
      const maxTries = 10;

      while (tries < maxTries) {
        try {
          const res = await fetch(BACKEND_PING, { cache: "no-store" });
          if (res.ok) {
            window.location.href = BACKEND_REDIRECT;
            return;
          }
        } catch (error) {
          console.log(`Attempt ${tries + 1}: Server not ready`, error);
          setAttempts(tries + 1);
        }
        tries++;

        // If we've reached max tries, set a countdown and refresh page
        if (tries === maxTries) {
          setMessage("Automatically restarting in 5 seconds...");

          // Set a countdown timer to refresh the page
          setTimeout(() => {
            window.location.reload();
          }, 5000);

          return;
        }

        await delay(2000); // wait 2 sec between attempts
      }
    }

    waitForBackend();
  }, [BACKEND_PING, BACKEND_REDIRECT]);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#0d1117] text-[#c9d1d9] font-sans m-0 p-0">
      <div className="text-center p-12 md:p-16 rounded-lg bg-[#161b22] shadow-lg w-full max-w-[600px] mx-4">
        <h1 className="text-[#58a6ff] text-2xl font-semibold mb-8">
          Redirecting...
        </h1>

        {/* Spinner */}
        <div className="inline-block w-20 h-20 mb-8 rounded-full border-4 border-[rgba(88,166,255,0.2)] border-t-[#58a6ff] animate-spin"></div>

        <p className="text-xl leading-relaxed my-6">{message}</p>

        {attempts > 0 && attempts < 10 && (
          <p className="text-lg text-[#8b949e] mt-6">
            Attempt {attempts} of 10
          </p>
        )}

        {attempts === 10 && (
          <p className="text-lg text-[#f85149] mt-6 font-medium">
            Maximum attempts reached. Restarting...
          </p>
        )}
      </div>

      {/* Global styles for animation and body - add to your global CSS or tailwind.config.js */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default App;
