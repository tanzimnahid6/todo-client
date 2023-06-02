import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./Components/Login.jsx"
import PrivetRoute from "./Components/PrivetRoute.jsx"
import AuthProvider from "./Components/AuthProvider.jsx"
import { QueryClient, QueryClientProvider } from "react-query"
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      <PrivetRoute>
        <Login></Login>
      </PrivetRoute>
    ),
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
