import React, { useState } from "react";
import MuiForm from "react-jsonschema-form";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CustomFieldTemplate from "./CustomFieldTemplate";
import CustomTextField from "./CustomTextField";
const Login = () => {
  const [liveValidate, setLiveValidate] = useState(false);
  const [extraErrors, setExtraErrors] = useState([]);
  const schema = {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", title: "email" },
      password: { type: "string", title: "password" },
    },
  };
  const widgets = {
    TextWidget: CustomTextField,
  };
  const uiSchema = {
    "ui:order": ["email", "password"],
    "ui:widget": "TextWidget",
    // password: {
    //   "ui:widget": "password", // could also be "select"
    // },
  };

  const onSubmit = ({ formData }) => console.log("Data submitted: ", formData);
  const onChange = (event) => console.log("event", event);
  const onError = (errors) =>
    console.log(errors, "I have", errors.length, "errors to fix");

  const formData = {
    email: "First task",
    password: "test",
  };

  return (
    <Paper elevation={1}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>Login</Typography>
        </Grid>
        <Grid item xs={12}>
          <MuiForm
            noHtml5Validate
            showError
            showErrorList={false}
            liveValidate={liveValidate}
            extraErrors={extraErrors}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onError={onError}
            onSubmit={onSubmit}
            onChange={onChange}
            // FieldTemplate={CustomFieldTemplate}
            widgets={widgets}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
