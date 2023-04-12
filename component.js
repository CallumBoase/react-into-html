const knackAPI = new KnackAPI({
  applicationId: '63306ddbdfad5247a024eac3',//EHF
  auth: 'view-based'
})

console.log(knackAPI);

const fellows = await knackAPI.getMany({
  scene: 'scene_161',
  view: 'view_490'
});

console.log(fellows);

const {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} = MaterialUI;

const DataTable = () => {

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
          {fellows.records.map(fellow => (
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

export default DataTable;