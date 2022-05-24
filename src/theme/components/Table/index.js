import React, { useMemo } from 'react';
import { useTable, useFilters, usePagination } from 'react-table';
import { FaRegTrashAlt, FaEdit, FaAngleRight, FaAngleLeft, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useProvider } from '../../../context';
import { NavLink } from 'react-router-dom';
import ColumnFilter from '../ColumnFilter';

import './table.css';

function Table() {
  const { items, handleRemove } = useProvider();

  const data = useMemo(() => items, [items]);

  const columns = useMemo(
    () => [
      {
        Header: 'Data',
        accessor: 'date', // accessor is the "key" in the data
        Filter: ColumnFilter
      },
      {
        Header: 'Titulo',
        accessor: 'motivo',
        Filter: ColumnFilter
      },
      {
        Header: 'Tipo',
        accessor: 'type',
        Filter: ColumnFilter
      },
      {
        Header: 'Categoria',
        accessor: 'category',
        Filter: ColumnFilter
      },
      {
        Header: 'Valor R$',
        accessor: 'value',
        Filter: ColumnFilter
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    setPageSize,
    pageCount,
    gotoPage,
    state: { pageIndex, pageSize },
    prepareRow, } =
    useTable(
      {
        columns,
        data,
      },
      useFilters,
      usePagination
    );

  return (
    <div className="container">
      <table
        {...getTableProps()}
        style={{
          backgroundColor: '#ededed',
          boxShadow: '1px 4px 20px -6px rgba(0, 0, 0, 0.75)',
          borderRadius: '5px',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px lightgray',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                  <div>{column.render('Filter')}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        borderBottom: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
                <td>
                  <NavLink to={`/edit/${(items[row.id].id)}`}>
                    <button>
                      <FaEdit />
                    </button>
                  </NavLink>
                  <button onClick={() => handleRemove(items[row.id].id)}>
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}><FaAngleDoubleLeft /></button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}><FaAngleLeft /></button>
        <button onClick={() => nextPage()} disabled={!canNextPage}><FaAngleRight /></button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><FaAngleDoubleRight /></button>
        <select
          className="select"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 15].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Table;
