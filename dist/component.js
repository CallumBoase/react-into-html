const knackAPI = new KnackAPI({
  applicationId: '63306ddbdfad5247a024eac3',
  //EHF
  auth: 'view-based'
});
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
  return /*#__PURE__*/React.createElement(TableContainer, null, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHead, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null, "Name"), /*#__PURE__*/React.createElement(TableCell, null, "Cohort"))), /*#__PURE__*/React.createElement(TableBody, null, fellows.records.map(fellow => /*#__PURE__*/React.createElement(TableRow, {
    key: fellow.id
  }, /*#__PURE__*/React.createElement(TableCell, null, fellow.field_10), /*#__PURE__*/React.createElement(TableCell, null, fellow.field_447_raw))))));
};
export default DataTable;