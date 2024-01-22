import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from "../server/user";
import { getRecipes } from "../server/recipe";

const schema = yup
    .object({
        Username: yup.string().required("This field is required"),
        Password: yup.string().required("This field is required"),
    })
    .required()

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(getRecipes());
    const submit = (data) => {
        const user = {
            Username: data.Username,
            Password: data.Password,
        }
        dispatch(setUser(user, navigate));
    }
    return (
        <div class="container">
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <label>user name</label>
                    <input type="text" {...register("Username")} />
                    <p>{errors.Username?.message}</p>
                </div>
                <div>
                    <label>password</label>
                    <input type="text" {...register("Password")} />
                    <p>{errors.Password?.message}</p>
                </div>
                <input type="submit" value="Log in" />

            </form>
            <Link to="/signup">you don't have an acoount? sign up</Link>

        </div>);
}

export default Login;