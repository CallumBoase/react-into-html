//KnackAPI is already loaded in a script tag
//React, React-DOM and MaterialUI is already loaded via a script tag

const {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton
} = MaterialUI;
const DataTable = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [fellows, setFellows] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const knackAPI = new KnackAPI({
        applicationId: '63306ddbdfad5247a024eac3',
        auth: 'view-based'
      });
      const fellows = await knackAPI.getMany({
        scene: 'scene_161',
        view: 'view_490'
      });
      setFellows(fellows.records);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return /*#__PURE__*/React.createElement(TableContainer, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHead, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null, "Name"), /*#__PURE__*/React.createElement(TableCell, null, "Cohort"))), /*#__PURE__*/React.createElement(TableBody, null, isLoading ? Array.from(new Array(10)).map((_, index) => /*#__PURE__*/React.createElement(TableRow, {
    key: index
  }, /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Skeleton, null)), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Skeleton, null)))) : fellows.map(fellow => /*#__PURE__*/React.createElement(TableRow, {
    key: fellow.id
  }, /*#__PURE__*/React.createElement(TableCell, null, fellow.field_10), /*#__PURE__*/React.createElement(TableCell, null, fellow.field_447_raw))))));
};

// const DataTable = () => {

//   return (
//     <TableContainer>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Cohort</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {Array.from(new Array(10)).map((_, index) => (
//             <TableRow key={index}>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//               <TableCell>
//                 <Skeleton />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };
export default DataTable;