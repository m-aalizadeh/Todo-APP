import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import withStyles from "@mui/styles/withStyles";
import { Formik, Form, Field } from "formik";
import { getSchemaWithValidation } from "../../services/utility";
import { APIHelper } from "../../services/api";

const styles = (theme) => ({
  root: {
    position: "absolute",
    left: "45%",
    top: "25%",
  },
});

const User = ({ history, classes }) => {
  const [loader, setLoader] = useState(false);
  const [currentPage, showSignIn] = useState("signUp");
  const [selectedSchema, changeSelectedSchema] = useState(
    getSchemaWithValidation("signUp") || {}
  );

  const { initialValues = {}, schema = {}, validation = {} } = selectedSchema;
  const signInPage = currentPage === "signIn";
  const label = signInPage ? "Sign In" : "Sign UP";
  const signInQuestion = signInPage
    ? "Want to create a new account!"
    : "I have an account!";

  const handleSchemaSelection = (value) => {
    const newSchema = getSchemaWithValidation(value);
    changeSelectedSchema(newSchema);
  };

  const submitForm = async (values) => {
    setLoader(true);
    const {
      email = "",
      username = "",
      password = "",
      firstName = "",
      lastName = "",
    } = values;
    let result = {};
    if (signInPage) {
      result = await APIHelper.postRequest("user/authenticate", {
        username,
        password,
      });
      if (result?.id && result?.token) {
        localStorage.setItem("user", JSON.stringify(result));
        history("/todos");
      }
    } else {
      result = await APIHelper.postRequest("user/register", {
        email,
        password,
        firstName,
        lastName,
      });
    }
    setLoader(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <Grid item xs={12}>
        <Paper
          elevation={2}
          variant="elevation"
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 400,
            flexGrow: 1,
          }}
        >
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography variant="h4">{label}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Formik
                initialValues={initialValues}
                validationSchema={validation()}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  setSubmitting(false);
                  submitForm(values, setSubmitting);
                }}
                render={({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => {
                  return (
                    <Form>
                      <Grid container spacing={2}>
                        {Object.values(schema).length &&
                          Object.values(schema).map((item, index) => (
                            <Grid item xs={12} key={index}>
                              <Field
                                as={TextField}
                                type={item?.type}
                                label={item?.label}
                                name={item?.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values[item?.name]}
                                required
                                fullWidth
                              />
                            </Grid>
                          ))}
                      </Grid>
                      <Grid item mt={1} xs={12}>
                        <Typography variant="body">{signInQuestion}</Typography>
                        <Link
                          // href="#"
                          onClick={() => {
                            const newPage = signInPage ? "signUp" : "signIn";
                            showSignIn(newPage);
                            handleSchemaSelection(newPage);
                          }}
                        >
                          {signInPage ? "Sign Up" : "Sign In"}
                        </Link>
                      </Grid>
                      <Grid item mt={2} xs={12}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={handleSubmit}
                        >
                          <Typography>{label}</Typography>
                          {loader && (
                            <CircularProgress color="secondary" size={24} />
                          )}
                        </Button>
                      </Grid>
                    </Form>
                  );
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(User);
