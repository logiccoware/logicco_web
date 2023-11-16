const signupInvitePage = {
  form: {
    title: "Lets finish setting up your account",
    submitButtonText: "Sign Up",
    validation: {
      displayName: {
        required: "Display name is required",
        max: "Display name must be less than 250 characters",
      },
      email: {
        required: "Email is required",
        invalid: "Email is invalid",
      },
      password: {
        required: "Password is required",
        min: "Password must be atleast 7 characters long",
      },
    },
  },
};

const loginPage = {
  title: "Login into your account",
  form: {
    email: {
      label: "Email Address",
      helpText: "We will never share your email.",
    },
    password: {
      label: "Password",
    },
    forgotPassword: "Forgot password?",
  },
  loginButtonText: "Login",
  validation: {
    email: {
      required: "Email is required",
      invalid: "Email is invalid",
    },
    password: {
      required: "Password is required",
    },
  },
};

const payeePage = {
  title: "Create Payee",
  modal: {
    title: {
      create: "Create Payee",
      update: "Update Payee",
    },
    form: {
      name: {
        label: "Name",
        placeholder: "Enter name",
      },
    },
    deleteConfirmMessage: "Are you sure you want to delete this payee?",
  },
};

export const stringResources = {
  app: {
    title: "Tilakex",
  },
  logoutPage: {
    message: "Logging out...",
  },
  crudModal: {
    button: {
      update: "Update",
      create: "Create",
      delete: "Delete",
      dismiss: "Dismiss",
    },
  },
  logout: {
    errorMessage:
      "Something went wrong when logging out, Please try again later",
    buttonText: "Logout",
  },

  signupInvitePage,
  loginPage,
  payeePage,
};
