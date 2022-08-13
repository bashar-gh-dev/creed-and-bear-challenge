import Routes from "./routes";
import Auth from "./components/shared/auth/auth";

function App() {
  return (
    <Auth>
      <Routes></Routes>
    </Auth>
  );
}

export default App;
