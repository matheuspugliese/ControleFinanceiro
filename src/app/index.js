import React from 'react';
import Home from '../pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from '../theme/components/Form';

import withProvider from '../context';
import Header from '../theme/components/Header';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/edit/:id"
            element={
              <>
                <Header />
                <Form title="Editar Transação"/>
              </>
            }
          />
          <Route
            path="/create"
            element={
              <>
                <Header />
                <Form title="Criar Nova Transação" />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default withProvider(App);