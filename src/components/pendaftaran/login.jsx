import { signIn } from "next-auth/react";
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from "next/router";
import Image from "next/image";

export default function Login() {

    const router = useRouter()

    const handleGoogle = async (e) => {
        e.preventDefault();
        // TODO: add login functionality here
        signIn('google', { callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/user/qadha_puasa/test` })
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit
    })

    async function onSubmit(values) {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/user/qadha_puasa/test"
        })
        if (!status.ok){
            alert('salah')
        }
        
        return router.push(status.url)
        

    }


    return (
        <>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <Image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" width={700} height={400} alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input type="email" name="email" className="form-control" placeholder="name@example.com" {...formik.getFieldProps('email')} />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" placeholder="Password" {...formik.getFieldProps('password')} />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="d-grid gap-2 mx-auto">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
                                    <p>Dont have an account?  <Link href="/register">Register here</Link> </p>
                                    <div className="divider d-flex align-items-center my-4">
                                        <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                    </div>
                                    <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#3b5998' }} href="#!" role="button" onClick={handleGoogle}>
                                        <Image width={18} height={20} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />    Continue with Gmail
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
