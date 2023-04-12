import DataTable from './components/FellowTable.js';

const { StylesProvider } = MaterialUI;

ReactDOM.render(
  <StylesProvider injectFirst>
      <DataTable />
  </StylesProvider>,
  document.getElementById('reactComponent')
);