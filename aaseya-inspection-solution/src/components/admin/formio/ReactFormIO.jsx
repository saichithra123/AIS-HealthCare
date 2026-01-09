import React, { useState } from "react";
import { Form, FormBuilder } from "@formio/react";
import './ReactFormIO.css';
import './ReactFormIOData.css';
import './ReactFormIOAdvanced.css';
import './ReactFormIOLayout.css';
import "./editComponent.css";
import "./premiumElements.css";

const ReactFormIO = ({ schema, setSchema }) => {
    const onFormChange = (schema) => {
        setSchema(schema);
    };

    return (
        <div>
            <div style={{ margin: "30px 0px" }}>
                <FormBuilder onChange={onFormChange} />
            </div>
        </div>
    );
};

export default ReactFormIO;
