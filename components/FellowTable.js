import React from 'react';
import * as KnackAPI from 'knack-api-helper';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from '@mui/material';

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