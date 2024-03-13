import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const StyledDiv =  styled.div`
    text-align: center;
    color: white;
    font-size: 3rem;
`;


const ErrorPage = () => {
  const error : unknown = useRouteError();
  console.error(error);

  return (
    <StyledDiv>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* <i>{error.statusText || error.message}</i> */}
      </p>
    </StyledDiv>
  );
}
export default ErrorPage