import React, { useState, useEffect } from 'react';
import './balance.css';
import { useProvider } from '../../../context';

function Index() {
  const { items } = useProvider();

  
  //valores de entrada
  const getIncomes = items.filter((item) => item.type === 'Entrada')

  const incomesValue = getIncomes.map((item) => Number(item.value));

  let incomes = incomesValue.reduce((accum, value) => accum + value, 0);
  console.log(incomes)


  // valores de saida
  const getExpenses = items.filter((item) => item.type === 'Saida')


  const expenseValues = getExpenses.map((item) => Number(item.value));


  let expenses = expenseValues.reduce((acc, value) => acc + value, 0);



  return (
    <div className="balance-container">
      <h4>Saldo atual</h4> 

      <h1 id="balance" className="balance">
        R$ {incomes - expenses}
      </h1>

      <div className="inc-exp-container">
        <div>
          <h4>Entradas</h4>
          <p id="money-plus" className="money plus">
            R$ {incomes}
          </p>
        </div>

        <div>
          <h4>Saidas</h4>
          <p id="money-minus" className="money minus">
            R$ -{expenses}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Index;
