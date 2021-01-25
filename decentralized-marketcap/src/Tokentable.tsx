import React, { useState } from "react";
import { DataGrid } from '@material-ui/data-grid';

  const columns = [
    { field: 'name', headerName: 'Token', flex: 303, sortable: false},
    { field: 'symbol', headerName: 'Symbol', flex: 303, sortable: false},
    { field: 'price', headerName: 'Price',  flex: 303},
    { field: 'totalLiquidity', headerName: 'Liquidity',  flex: 303},
  ];
  
  export default function Tokentable({coindata, selectRows}) {
    const [selectedTokensKeys, setSelectedTokensKeys] = useState<React.Key | React.Key[]>();

    return (
      <div style={{ height: 1200, width: '100%' }}>
        <DataGrid rows={coindata} columns={columns} pageSize={20} checkboxSelection={true} onSelectionChange={(newSelection) => {
            console.log(newSelection.rowIds)
        setSelectedTokensKeys(newSelection.rowIds);
        selectRows(selectedTokensKeys);
      }}/>
      </div>
    );
  }