import React from 'react';
import Style from './ClientsPage.module.scss';
import Header from '../../components/Header/Header';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import {styled} from '@mui/material/styles';
import {IconButton} from '@mui/material';
import SearchInput from '../../components/SearchInput/SearchInput';

const ClientsPage = () => {
  const StyledDataGrid = styled(DataGrid)({
    root: {
      display: 'none',
    },
    '& 	.MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& [data-field=actions] > svg': {
      color: '#A0AABC',
      marginRight: '15px',
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Клиент',
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.row.avatar_url} style={{marginRight: '15px', width: '42px', height: '42px'}}/>
            {params.row.title}
          </>
        );
      },
    },
    { field: 'email', headerName: 'Контакт', flex: 1 },
    { field: 'description', headerName: 'Описание', flex: 1},
    { field: 'actions', headerName: 'Действия', flex: 1, headerAlign: 'right', align: 'right',
      renderCell: (params) => {
        return (
          <>
            <IconButton><EditIcon /></IconButton>
            <IconButton><MoreVertIcon /></IconButton>
          </>
        );
      },
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  const rows = [
    {
      id: 1,
      title: 'Дорожная клиническая больница',
      phone: '88005553535',
      email: 'bolnica@yandex.ru',
      description: '',
      avatar_url: 'https://dor-clinicrostov.ru/manager/templates/dorclinic/index/img/logo-min.png',
    },
    {
      id: 2,
      title: 'Дмитриев Иннокентий Юхимович',
      phone: '88005553535',
      email: 'gadokeriz@gmail.com',
      description: 'Концепция новой стратегии подсознательно перев...',
    },
  ];


  return (
    <div className={Style.container}>
      <Header />
      <SearchInput/>
      <div style={{ height: 400, width: '100%', marginTop: '0px' }}>
        <StyledDataGrid
          className={Style.table}
          rows={rows}
          rowHeight={70}
          columns={columns}
          pageSize={5}
          // rowsPerPageOptions={[5]}
          checkboxSelection
          hideFooter
          sx={{
            '.MuiDataGrid-row.Mui-selected': {
              background: '#ffffff',
              // boxShadow: '0px 9.05305px 18.1061px #EDEDF5',
              // borderRadius:' 7px',
            },
            '.MuiDataGrid-row': {
              borderBottom: 'none',
            },
            '.MuiDataGrid-columnHeaderTitle': {

            },
          }}
        />
      </div>
    </div>
  );
};

export default ClientsPage;
