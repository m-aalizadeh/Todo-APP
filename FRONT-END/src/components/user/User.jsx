import React, { useState } from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form, Field } from "formik";
import Visible from "../../common/components/Visible";
import { getSchemaWithValidation } from "../../services/utility";
import { commonFetch } from "../../services/api";

const User = ({ history }) => {
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState("signUp");
  const [selectedSchema, setSelectedSchema] = useState(
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
    setSelectedSchema(newSchema);
  };

  const submitForm = async (values) => {
    setLoader(true);
    const { email = "", password = "", firstName = "", lastName = "" } = values;
    let result = {};
    if (signInPage) {
      result = await commonFetch("POST", "user/authenticate", undefined, {
        email,
        password,
      });
      if (result?.accessToken) {
        localStorage.setItem("user", JSON.stringify(result));
        history("/todos");
      }
    } else {
      result = await commonFetch("POST", "user/register", undefined, {
        email,
        password,
        firstName,
        lastName,
      });
      if (result?.accessToken) {
        localStorage.setItem("user", JSON.stringify(result));
        history("/todos");
      }
    }
    setLoader(false);
  };

  const newPage = signInPage ? "signUp" : "signIn";

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
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  submitForm(values);
                }}
                render={({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => {
                  return (
                    <Form>
                      <Visible when={Object.values(schema).length}>
                        <Grid container spacing={2}>
                          {Object.values(schema).map((item, index) => (
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
                      </Visible>
                      <Grid item mt={1} xs={12}>
                        <Typography variant="body">{signInQuestion}</Typography>
                        <Link
                          onClick={() => {
                            setCurrentPage(newPage);
                            handleSchemaSelection(newPage);
                          }}
                        >
                          {newPage}
                        </Link>
                      </Grid>
                      <Grid item mt={2} xs={12}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={handleSubmit}
                        >
                          <Typography>{label}</Typography>
                          <Visible when={loader}>
                            <CircularProgress color="secondary" size={24} />
                          </Visible>
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

User.propTypes = {
  history: PropTypes.func,
};

User.defaultProps = {
  history: () => {},
};

export default User;
