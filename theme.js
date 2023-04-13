import { createTheme, ThemeProvider } from '@mui/material/styles';

//Create a custom theme to override MUI defaults
//We include only what is required to make the MUI styles take precedence over the Knack styles when embedding in a Knack app
const theme = createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '16px !important',
                    verticalAlign: 'middle !important'
                },
            },
        },
    },
});

export default theme;