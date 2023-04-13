//Simulate the Knack window object
//So we can run test locally not in Knack

window.Knack = {
    getUserToken: () => {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQyZGZmZTk4OTE1MTcwMDI2NmFiNDNiIiwiYXBwbGljYXRpb25faWQiOiI2NDJkMjY4OTEwODU2NzAwMjdhMTcxNTciLCJpYXQiOjE2ODEzNjA3MjR9.ZEgbSx456i9YgGKktv-xyb-Ydn-MCVsDUCOBvPCCXWM'
    },
    showSpinner: () => {},
    hideSpinner: () => {},
    fields: {
        field_30: {
            attributes: {
                type: 'multiple_choice',
                format: {
                    options: ['a', 'b', 'c']
                }
            }
        }
    }
}