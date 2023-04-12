import DataTable from './components/FellowTable.js';
const {
  StylesProvider
} = MaterialUI;
ReactDOM.render( /*#__PURE__*/React.createElement(StylesProvider, {
  injectFirst: true
}, /*#__PURE__*/React.createElement(DataTable, null)), document.getElementById('reactComponent'));
