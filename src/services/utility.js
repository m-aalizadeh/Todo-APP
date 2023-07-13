import * as yup from "yup";

export const signInInitialValues = {
  username: "",
  password: "",
};

export const signUpInitialVlues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

export const signInSchema = {
  username: {
    type: "text",
    label: "Username",
    name: "username",
  },
  password: {
    type: "password",
    label: "Password",
    name: "password",
  },
};

export const signUpSchema = (isSignUp) => {
  const initialSchema = {
    firstName: {
      type: "text",
      label: "Firstname",
      name: "firstName",
    },
    lastName: {
      type: "text",
      label: "Lastname",
      name: "lastName",
    },
    email: {
      type: "email",
      label: "Email",
      name: "email",
    },
  };
  return isSignUp
    ? {
        ...initialSchema,
        password: { type: "password", label: "Password", name: "password" },
        confirmedPassword: {
          type: "password",
          label: "ConfirmedPassword",
          name: "confirmedPassword",
        },
      }
    : initialSchema;
};

export const signInValidation = () => {
  return yup.object().shape({
    username: yup
      .string()
      .required("Username is required.")
      .max(40, "Username must be 40 characters at most"),
    password: yup
      .string()
      .required("Password is required.")
      .max(15, "Password must be 15 characters at most."),
  });
};

export const signUpValidation = () => {
  return yup.object().shape({
    firstName: yup
      .string()
      .required("Firstname is required.")
      .max(30, "Firstname must be 30 characters at most"),
    lastName: yup
      .string()
      .required("Lastname is required.")
      .max(30, "Lastname must be 30 characters at most"),
    email: yup
      .string()
      .required("Email is required.")
      .email("Email format is invalid")
      .max(40, "Email must be 40 characters at most"),
    password: yup
      .string()
      .required("Password is required.")
      .max(15, "Password must be 15 characters at most."),
    confirmedPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Password must matches"),
  });
};

export const getSchemaWithValidation = (type) => {
  return type === "signIn"
    ? {
        initialValues: signInInitialValues,
        schema: signInSchema,
        validation: signInValidation,
      }
    : {
        initialValues: signUpInitialVlues,
        schema: signUpSchema(true),
        validation: signUpValidation,
      };
};
