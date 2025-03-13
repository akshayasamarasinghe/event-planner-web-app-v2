import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import EventPage from './pages/Eventi/eventpage';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path='/eventpage' element={<EventPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
