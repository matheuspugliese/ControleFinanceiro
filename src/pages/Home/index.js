import React from 'react';
import { NavLink } from 'react-router-dom';
import Table from '../../theme/components/Table';
import Balance from '../../theme/components/Balance';

import './home.css';

function Home() {
  return (
    <div className="home">
      <div className="title">
        <p>Transações Financeiras</p>
        <NavLink to="/create">
          <button className="button">Criar Nova</button>
        </NavLink>
      </div>
      <Table className="table" />
      <div>
        <Balance />
      </div>
    </div>
  );
}

export default Home;
