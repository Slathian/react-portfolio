import React, { Component } from 'react';
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class DropComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: "",
          description: "",
          category: "eCommerce",
          position: "",
          url: "",
          thumb_image: "",
          banner_image: "",
          logo: ""
        };

    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);

    const componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    };

    render() {

    }
}





// NOT COMPLETED. USES DIFFERENT DROP