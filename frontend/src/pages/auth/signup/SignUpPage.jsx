
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-5xl items-center justify-center gap-10 p-4">
        <div className="hidden flex-1 justify-center md:flex">
          <svg
            viewBox="0 0 24 24"
            aria-label="X logo"
            className="h-72 w-72 fill-current"
          >
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zm-1.291 19.49h2.039L6.486 3.24H4.298z" />
          </svg>
        </div>

        <div className="flex w-full max-w-md flex-col gap-4">
          <h1 className="text-4xl font-bold">Join today.</h1>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
            />

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />

            <button type="submit" className="btn btn-primary rounded-full">
              Sign up
            </button>
          </form>

          <p className="text-sm text-base-content/70">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
