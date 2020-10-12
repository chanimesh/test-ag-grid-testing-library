import App from "./App";
import {render, wait, fireEvent, screen} from '@testing-library/react';
import React from "react";
import DummyComponent from "./DummyComponent";


describe('Table', () => {
  const defaultColumnDefs = [
    {
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
    }
  ];
  const defaultRowData = [{
    testCell1: "dummy11",
    testCell2: "dummy12",
  },
    {
      testCell1: "dummy21",
      testCell2: "dummy22",
    }
  ];
  const defaultProps = {
    rowData:defaultRowData,
    columnData:defaultColumnDefs,
    width: '100%',
    height: '48vh',
    gridName: 'hello',
    setApiContext: false,
    onMountCallback: jest.fn(),
    onUnmountCallback: jest.fn(),
    showLoader: false
  }
  test(' should call mount and unmount callback', () => {
    const mockOnMountCallback = jest.fn();
    const mockOnUnmountCallback = jest.fn();
    const props = {
      ...defaultProps,
      onMountCallback: mockOnMountCallback,
      onUnmountCallback: mockOnUnmountCallback
    }

    const {  unmount } = render(

          <App
              {...props}
          />
    );

    expect(mockOnMountCallback).toHaveBeenCalledTimes(1);
    unmount();
    expect(mockOnUnmountCallback).toHaveBeenCalledTimes(1);
  });

  test(' should render', () => {
    const props = { ...defaultProps }
    const {  container } = render(<App
              {...props}
          />);
    expect(container).toMatchSnapshot();
  });

  test(' should render component', async () => {
    const columnData = [...defaultColumnDefs,
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
    const rowData = [{
      testCell1: "dummy11",
      testCell2: "dummy12",
      testCellWithComponent: 'select1'
    },
      {
        testCell1: "dummy21",
        testCell2: "dummy22",
        testCellWithComponent: 'select2'
      }
    ];
    const props = { ...defaultProps,
      columnData,
      rowData
    }
    const {  container,getByText,queryAllByText } = render(<App
        {...props}
    />);

    await wait(() => expect(getByText('dummy11')).toBeInTheDocument());
    await wait(() => queryAllByText('select2'));
    expect(container).toMatchSnapshot();
  },100000);

  test(' should change value', async () => {
    const columnData = [...defaultColumnDefs,
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
    const rowData = [{
      testCell1: "dummy11",
      testCell2: "dummy12",
      testCellWithComponent: 'select1'
    },
      {
        testCell1: "dummy21",
        testCell2: "dummy22",
        testCellWithComponent: 'select2'
      }
    ];
    const props = { ...defaultProps,
      columnData,
      rowData
    }
    const {  asFragment,container,getByText,getAllByTestId } = render(<App
        {...props}
    />);
    await wait(() => expect(getByText('dummy11')).toBeInTheDocument());

    await wait(() => expect(getAllByTestId('input-element')[0].value).toBe('select1'));

    expect(getAllByTestId('input-element')[0].value).toBe('select1');
    fireEvent.change(getAllByTestId('input-element')[0], {target: {value: '1234'}});
    expect(getAllByTestId('input-element')[0].value).toBe('1234');
    expect(getAllByTestId('input-element')[1].value).toBe('select2');
    expect(getAllByTestId('input-element').length).toBe(2);
    expect(asFragment()).toMatchSnapshot();
  },100000);
});
