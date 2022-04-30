import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './onepirate/Home'
import GetProductsUnderCategory from './components/getProductsUnderCategory';
import GetProduct from './components/getProduct';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/category' element={<GetProductsUnderCategory />}/>
          {/* <Route path='/search' element={<SearchForProduct />}/> */}
          <Route path='/id' element={<GetProduct />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
