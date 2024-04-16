// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link from React Router

// import Table from '../../components/table/Table';
// import customerList from '../../assets/JsonData/customers-list.json';

// const customerTableHead = [
//     '',
//     'name',
//     'email',
//     'phone',
//     'total orders',
//     'total spend',
//     'location'
// ];

// const renderHead = (item, index) => <th key={index}>{item}</th>;

// const renderBody = (item, index) => (
//     <tr key={index}>
//         <td>{item.id}</td>
//         {/* Wrap the customer name in a Link component */}

//         <td><Link to={`/customersInfo/${item.id}`}>{item.name}</Link></td>
//         {/* <td><Link to={`/customersInfo`}>{item.name}</Link></td> */}
//         <td>{item.email}</td>
//         <td>{item.phone}</td>
//         <td>{item.total_orders}</td>
//         <td>{item.total_spend}</td>
//         <td>{item.location}</td>
//     </tr>
// );

// const Customers = () => {
//     return (
//         <div>
//             <h2 className="page-header">customers</h2>
//             <div className="row">
//                 <div className="col-12">
//                     <div className="card">
//                         <div className="card__body">
//                             <Table
//                                 limit='10'
//                                 headData={customerTableHead}
//                                 renderHead={(item, index) => renderHead(item, index)}
//                                 bodyData={customerList}
//                                 renderBody={(item, index) => renderBody(item, index)}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Customers;


import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../../data/dummy';
import { Header } from '../../components';

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customersData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
