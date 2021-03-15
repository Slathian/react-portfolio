import React, { useState } from 'react';
import {useDropzone} from 'react-dropzone';

export default function Basic(props) {

  const [uploadedImage, setImage] = useState([]);
  const [imageDropped, setBool] = useState(false);
  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      props.dataCollection(acceptedFiles);
      setBool(true);
      setImage(
        acceptedFiles.map((upFile) => Object.assign(upFile,{
          preview: URL.createObjectURL(upFile)
        }))
      )
    } 
  });
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  

  return (
      <section className="drop-container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          
          {imageDropped ? null : <p>Drop {props.name} or select</p>}

          {uploadedImage.map((upFile) =>{
            return (
              <div className="preview-wrapper" key={"preview", props.name}>
                <img src={upFile.preview} style={{width:"200px", height: "auto"}} alt="preview" />
              </div>
            )
          })}
        </div>
      </section>
  );
}
