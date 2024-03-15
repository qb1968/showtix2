import { Navigate, useNavigate, useSearchParams, Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { useEffect } from "react";
import styles from "./Completion.module.css";

const Completion = (props) => {
  const [params] = useSearchParams();
  const redirect_status = params.get("redirect_status");
  const payment_intent = params.get("payment_intent");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("cart");
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!redirect_status || !payment_intent) return <Navigate to="/" />;

  const success = (
    <>
      {" "}
      <h1>Your Payment Was Successful!</h1>
      <h2 className="mt-2">See You At The Show </h2>
      <h3 className="mt-5">Check your email for your tickets</h3>
      <h6 className="mt-5">Forwarding in 10 seconds...</h6>
      <p>
       If you are not redirected,{" "}
        <Link to="/" className={styles.link}>
          Click Here
        </Link>
      </p>
    </>
  );

  const failure = (
    <>
      <h1>An error occurred during the payment process</h1>
      <h2>ID: {payment_intent}</h2>
      <h6 className="mt-5">Redirect in 10 seconds...</h6>
      <p>
        If you are not redirected,{" "}
        <Link to="/" className={styles.link}>
          Click Here
        </Link>
      </p>
    </>
  );

  const content = redirect_status === "succeeded" ? success : failure;

  return (
    <Container style={{minHeight: "75vh"}}>
      <Content>{content}</Content>
    </Container>
  );
};

export default Completion;
