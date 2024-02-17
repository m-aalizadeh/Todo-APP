import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { t } from "@lingui/macro";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { TextField as FTextField } from "formik-material-ui";
import { withFormik, Field } from "formik";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Too Short!")
    .max(40, "Too Long!")
    .required("Required"),
  description: Yup.string().min(15, "Too Short!").max(70, "Too Long!"),
});

const ColumnForm = (props) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    props;
  const { title = "", description = "", handleClose } = values;
  const LOCAL_CONSTANTS = {
    title: t`Title`,
    description: t`Description`,
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            component={FTextField}
            error={errors.title && touched.title}
            label={LOCAL_CONSTANTS.title}
            name="title"
            value={title}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.title && touched.title}
            inputProps={{
              id: "title",
              name: "title",
            }}
            type="text"
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
            type="text"
            value={description}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.description && touched.description}
            inputProps={{
              id: "description",
              name: "description",
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} direction="row" justifyContent="flex-end">
            <Grid item>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSubmit}>
                Proceed
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

ColumnForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

ColumnForm.defaultProps = {
  values: {},
  errors: {},
  touched: {},
  handleBlur: () => {},
  handleChange: () => {},
  handleSubmit: () => {},
};

const CreateColumnForm = withFormik({
  mapPropsToValues(props) {
    const { title = "", description = "", handleClose } = props;
    return {
      title,
      description,
      handleClose,
    };
  },
  validationSchema,
  handleSubmit: (values, actions) => {
    const { onUpdate, handleClose } = actions.props;
    onUpdate(values);
    handleClose();
  },
  displayName: "CreateColumnForm",
})(ColumnForm);

export default CreateColumnForm;
