import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Invoice from './pages/Invoice.jsx'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Invoice/>} path="/invoice/"></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App
