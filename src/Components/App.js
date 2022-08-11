import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import Signup from "../Components/Signup";

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-enter"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ minWight: "400px" }}>
          <Signup />
        </div>
      </Container>
    </AuthProvider>
  )
}

export default App;
