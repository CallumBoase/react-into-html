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

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Cohort</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? Array.from(new Array(10)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))
            : fellows.map(fellow => (
                <TableRow key={fellow.id}>
                  <TableCell>{fellow.field_10}</TableCell>
                  <TableCell>{fellow.field_447_raw}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
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