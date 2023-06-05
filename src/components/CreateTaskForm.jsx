import React from "react";
import dayjs from "dayjs";
import * as Yup from "yup";
import { t } from "@lingui/macro";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Formik, Form, Field } from "formik";
import { TextField as FTextField } from "formik-material-ui";
import DatePickerComponent from "./DatePickerComponent";

const LOCAL_CONSTANTS = {
  title: t`Capture Task Details`,
  task: t`Task`,
  description: t`Description`,
  dueDate: t`Due Date`,
};
const priorityList = [
  {
    code: "LOW",
    name: "LOW",
  },
  {
    code: "HIGH",
    name: "GIGH",
  },
];

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Too Short!")
    .max(40, "Too Long!")
    .required("Required"),
  description: Yup.string().min(15, "Too Short!").max(70, "Too Long!"),
  priority: Yup.string().required("Required"),
  dueDate: Yup.date()
    .required("Due Date is required")
    .min(dayjs(), "Should be more than today"),
});

const CreateTaskForm = ({
  handleProceed,
  handleCancel,
  initialValues = {},
}) => {
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
      }}
      initialValues={{
        title: initialValues.title || "",
        description: initialValues.description || "",
        dueDate: dayjs(initialValues.dueDate),
        priority: initialValues.priority || "LOW",
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <Grid container direction="row" spacing={4}>
              <Grid item xs={12}>
                <Field
                  component={FTextField}
                  error={errors.title && touched.title}
                  label={LOCAL_CONSTANTS.title}
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.title && touched.title}
                  inputProps={{
                    onBlur: (e) => {
                      setFieldValue(e);
                    },
                  }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={FTextField}
                  error={errors.description && touched.description}
                  label={LOCAL_CONSTANTS.description}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.description && touched.description}
                  inputProps={{
                    onBlur: (e) => {
                      setFieldValue(e);
                    },
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={DatePickerComponent}
                  error={errors.description && touched.description}
                  label={LOCAL_CONSTANTS.dueDate}
                  name="dueDate"
                  value={values.dueDate}
                  onChange={(e) => {
                    setFieldValue("dueDate", e);
                  }}
                  onBlur={handleBlur}
                  minDate={dayjs()}
                  fullWidth
                  helperText={errors.dueDate && touched.dueDate}
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  row
                  aria-label="approval type"
                  onChange={(e) => {
                    setFieldValue("priority", e.target.value);
                  }}
                  defaultValue={values.priority}
                  value={values.priority}
                >
                  {priorityList.map((option) => (
                    <Box key={option.code}>
                      <FormControlLabel
                        value={option.code}
                        control={<Radio />}
                        label={option.name}
                      />
                    </Box>
                  ))}
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justifyContent="flex-end"
                >
                  <Grid item>
                    <Button variant="outlined" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => handleProceed(values)}
                    >
                      Proceed
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateTaskForm;
