interface FormValues {
  name: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

export function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.name.trim()) errors.name = "First Name is required";
  if (!values.lastname.trim()) errors.lastname = "Last Name is required";
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Enter a valid email";
  }
  if (!values.password.trim()) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!values.address.trim()) errors.address = "Address is required";
  if (!values.city.trim()) errors.city = "City is required";
  if (!values.state.trim()) errors.state = "State is required";
  if (!values.zip.trim()) errors.zip = "Zip is required";

  return errors;
}
