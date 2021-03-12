import React, { useState, UseEffect } from 'react';


import DropzoneComponent from 'react-dropzone-component';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default function Uploader (props) {
    return (
        <div className="image-uploaders">
            <DropzoneComponent
            config={props.componentConfig}
            djsConfig={props.djsConfig}
            />
        </div>
    )
}

