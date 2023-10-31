import ReactDOM from "react-dom/client"
import "./index.css"
import AppRouter from "./routes"
import Modal from "react-modal"
import { store } from "./store"
import { Provider } from "react-redux"
import reportWebVitals from "./reportWebVitals"

const root = ReactDOM.createRoot(document.getElementById("root") as Element)
Modal.setAppElement("#root")

root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
