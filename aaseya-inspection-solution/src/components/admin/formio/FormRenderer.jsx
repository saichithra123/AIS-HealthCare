import React, { useState } from "react";
import { Form } from "@formio/react";
import "./ReactFormIO.css";
import "./ReactFormIOAdvanced.css";
import "./ReactFormIOLayout.css";
import "./editComponent.css";
import "./premiumElements.css";

const FormRenderer = ({ schema, setFormSubmission }) => {
    const onFormChange = (submission) => {
        if (submission?.data && submission.changed) {
            setFormSubmission(submission.data);
        }
    };

    return (
        <div style={{ margin: "30px 0px", width: "100%" }}>
            <Form src={schema} onChange={onFormChange} />
        </div>
    );
};

export default FormRenderer;
