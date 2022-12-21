import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



const Table = ({ data, columns }) => {

  return (
    <Box bgcolor='white' width={{ 'xs': '100%', 'md': '80%' }}>
      {data &&
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      }
    </Box>
  );
}
export default Table