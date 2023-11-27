import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthLayout } from "./layouts/AuthLayout"
import { 
  Login,
  CreateAccount,
  ForgotPassword,
  NewPassword, 
  ConfirmAccount,
  Events
} from "./pages";
import { EventsProvider } from "./context/EventsProvider";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { Event } from "./components";

const client = new QueryClient();

function App() {

  return (
    <BrowserRouter>
      <QueryClientProvider client={client} >
        <ReactQueryDevtools />
        <AuthProvider>
          <EventsProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/forgot-password/:token" element={<NewPassword />} />
                <Route path="/confirm/:token" element={<ConfirmAccount />} />
              </Route>

              <Route path="/events" element={<ProtectedRoute />}>
                <Route index element={<Events />} />
                <Route path=":id" element={<Event />} />
              </Route>
            </Routes>
          </EventsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
