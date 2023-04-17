//Globals for the example component MultiFileUploader
//You'd need to configure this for your own Knack app to use the component

const globals = {
    Knack: {
        
        //Set to a Knack application ID that you own, that you want to upload files to
        //And where you want to render the multi-file uploader to
        applicationId: 'XXXXXXXXXXXX',
        
        objects: {

            fileUploads: {
                //Set to the correct field_ids within a Knack object called "file uploads"
                //  -File: a file upload field
                //  -Category: a multi-choice field
                //  -Description: a text field
                //  -Member: a relationship field to a table/object called "members"
                fields: {
                    file: 'field_29',
                    category: 'field_30',
                    description: 'field_31',
                    member: 'field_33'
                },
                //Set to a scene and view_key pair containing an "Add file upload record" form
                //The form should have the above fields in it
                //The form should be login protected, limited to the user role/s you want to access to the multi file uploader
                addFileUploadForm: {
                    scene: 'scene_55',
                    view: 'view_78'
                }
            },
            //Set to the correct field_ids within a Knack object called "members" with these fields:
            //  -Member Name: a text field
            members: {
                fields: {
                    memberName: 'field_32'
                },
                gridOfMembers: {
                    //Set to a scene and view_key pair containing a grid of members to show in the member dropdown of this component
                    //The grid should have the above field in it
                    //The grid should be login protected, limited to the user role/s you want to access to the multi file uploader
                    scene: 'scene_55',
                    view: 'view_82'
                }
            }
        }
    }
}

export default globals;