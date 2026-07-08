import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";
import Navbar from "./components/Navbar";

import { FavoritesProvider } from "./context/FavoritesContext";
import { WatchlistProvider } from "./context/WatchlistContext";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <WatchlistProvider>

          <Navbar />

          <AppRoutes />

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2500,
              style: {
                background: "#0f172a",
                color: "#fff",
                border: "1px solid #22d3ee",
              },
            }}
          />

        </WatchlistProvider>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;