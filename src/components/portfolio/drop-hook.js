import React from 'react';
import {useDropzone} from 'react-dropzone';

export default function Basic(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
      <section className="drop-container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>{props.name}</p>
          <ul>{files}</ul>
        </div>
      </section>
  );
}
