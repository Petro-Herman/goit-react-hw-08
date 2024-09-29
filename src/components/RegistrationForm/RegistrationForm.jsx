import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Field, Form, Formik } from "formik";
export default function RegisterForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log(values);

    dispatch(register(values));
    actions.resetForm();
  };
  return (
    // <Formik
    //   initialValues={{ name: "", email: "", password: "" }}
    //   onSubmit={handleSubmit}
    // >
    //   <Form>
    //     <label>
    //       Usarname
    //       <Field type="text" name="name" />
    //     </label>
    //     <label>
    //       Email
    //       <Field type="email" name="email" />
    //     </label>
    //     <label>
    //       Password
    //       <Field type="password" name="password" />
    //     </label>
    //     <button type="submit">Register</button>
    //   </Form>
    // </Formik>
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters";
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <label>
          Username
          <Field type="text" name="name" />
        </label>
        <label>
          Email
          <Field type="email" name="email" />
        </label>
        <label>
          Password
          <Field type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
