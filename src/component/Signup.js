import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { addUser } from "../server/user";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

const schema = yup.object({
  Username: yup.string().required("This field is required"),
  Password: yup.string().required("This field is required").min(4, "This field must be 4 charcters or more"),
  Name: yup.string().required("This field is required"),
  Phone: yup.string().required("This field is required").matches(/^[0-9]{10}$/, "The requested format must be adjusted"),
  Email: yup.string().required("This field is required").email("The requested format must be adjusted"),
  Tz: yup.string().required("This field is required")
}).required();

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submit = (data) => {
    const user = {
      Username: data.Username,
      Password: data.Password,
      Name: data.Name,
      Phone: data.Phone,
      Email: data.Email,
      Tz: data.Tz
    }
    dispatch(addUser(user, navigate));
  }
  return (<>
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label>user name:</label>
        <input type="text"  {...register("Username")} />
        <p>{errors.Username?.message}</p>
      </div>
      <div>
        <label>password:</label>
        <input type="text" {...register("Password")} />
        <p>{errors.Password?.message}</p>
      </div>
      <div>
        <label>name:</label>
        <input type="text" {...register("Name")} />
        <p>{errors.Name?.message}</p>
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" {...register("Phone")} />
        <p>{errors.Phone?.message}</p>
      </div>
      <div>
        <label>email:</label>
        <input type="text" {...register("Email")} />
        <p>{errors.Email?.message}</p>
      </div>
      <div>
        <label>identity:</label>
        <input type="text" {...register("Tz")} />
        <p>{errors.Tz?.message}</p>
      </div>
      <input type="submit" value="Sign up" />

    </form>
    <Link to="/login">you have an acoount? log in</Link>
  </>);

}
export default Signup;