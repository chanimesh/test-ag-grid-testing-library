import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DummyComponent from "./DummyComponent";

const rowData = [{
    testCell1: "dummy11",
    testCell2: "dummy12",
    testCellWithComponent: 'select1'
}
];
const columnData = [{
    headerName: 'Test Cell 1',
    field: 'testCell1',
    minWidth: 135,
    width: 145,
    suppressMovable: true,
    cellClass: 'cellclasstest',
    pinned: 'left',
    suppressSizeToFit: true,
},
    {
        headerName: 'Test Cell 2',
        field: 'testCell2',
        minWidth: 135,
        width: 145,
        suppressMovable: true,
        cellClass: 'cellClassTest',
        pinned: 'left',
        suppressSizeToFit: true,
    },
    {
        headerName: 'Test Header with component',
        field: 'testCellWithComponent',
        suppressMovable: true,
        minWidth: 135,
        width: 145,
        pinned: 'left',
        suppressSizeToFit: true,
        cellClass: 'test-class',
        cellRendererFramework: DummyComponent,
    }
];

ReactDOM.render(
  <React.StrictMode>
    <App
        rowData = {rowData}
        columnData={columnData}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
