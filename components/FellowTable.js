import React from 'react';
import * as KnackAPI from 'knack-api-helper';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '16px !important'
}));


const FellowTable = () => {

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
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Cohort</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? Array.from(new Array(10)).map((_, index) => (
                <TableRow key={index}>
                  <StyledTableCell>
                    <Skeleton />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton />
                  </StyledTableCell>
                </TableRow>
              ))
            : fellows.map(fellow => (
                <TableRow key={fellow.id}>
                  <StyledTableCell>{fellow.field_10}</StyledTableCell>
                  <StyledTableCell>{fellow.field_447_raw}</StyledTableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FellowTable;