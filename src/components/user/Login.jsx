import React from "react";
import MuiForm from "@rjsf/material-ui";

function CustomFieldTemplate(props) {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    errors,
    children,
  } = props;
  console.log(props, label);
  return (
    <div className={classNames}>
      <label htmlFor={id}>
        {label}
        {required ? "*" : null}
      </label>
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
}
const Login = () => {
  const schema = {
    title: "Login",
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", title: "email" },
      password: { type: "string", title: "password" },
    },
  };

  const uiSchema = {
    "ui:order": ["email", "password"],
    password: {
      "ui:widget": "password", // could also be "select"
    },
  };

  const onSubmit = ({ formData }) => console.log("Data submitted: ", formData);
  const onError = (errors) =>
    console.log(errors, "I have", errors.length, "errors to fix");

  const formData = {
    email: "First task",
    password: "test",
  };

  return (
    <MuiForm
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onError={onError}
      onSubmit={onSubmit}
      FieldTemplate={CustomFieldTemplate}
    />
  );
};

export default Login;
