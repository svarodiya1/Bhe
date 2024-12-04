import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TableCoverView from './TableCoverView';
import FridgeTopCover from './FridgeTopCover';
import KitchenApron from './KitchenApron';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className='flex gap-x-5 my-5 mx-5'>
            <li>
              <Link to="/table-cover">Table Cover</Link>
            </li>
            <li>
              <Link to="/fridge-top-cover">Fridge Top Cover</Link>
            </li>
            <li>
              <Link to="/kitchen-apron">Kitchen Apron</Link>
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/table-cover" element={<TableCoverView />} />
          <Route path="/fridge-top-cover" element={<FridgeTopCover />} />
          <Route path="/kitchen-apron" element={<KitchenApron />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
