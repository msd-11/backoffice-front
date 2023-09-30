import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Produits from "./views/Produits";

function App() {
    return (
        <>
            <BrowserRouter>
                <Sidebar />
                <main
                    className={
                        "bg-main-background h-screen w-screen relative overflow-auto"
                    }
                >
                    <Routes>
                        <Route path={"/"} element={<div>Home</div>} />
                        <Route path={"/produits"} element={<Produits />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
