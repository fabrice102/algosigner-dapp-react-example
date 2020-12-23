/* global AlgoSigner */
import './App.css';
import {Button, Container, Header, Message} from "semantic-ui-react";
import {useState, useCallback} from "react";

/**
 * React Component displaying a title, a button doing some (AlgoSigner-related) actions
 * and a message with the result.
 *
 * @param buttonAction is a (potentially async) function called when clicking on the button
 *   and returning the result to be displayed
 */
const ExampleAlgoSigner = ({title, buttonText, buttonAction}) => {
  const [result, setResult] = useState("");

  const onClick = useCallback(async () => {
    const r = await buttonAction();
    setResult(r);
  }, [buttonAction]);

  return (
    <>
      <Header as="h2" dividing>{title}</Header>
      <Button primary={true} onClick={onClick}>{buttonText}</Button>
      <Message>
        <code>
          {result}
        </code>
      </Message>
    </>
  );
};

// The following components are all demonstrating some features of AlgoSigner

const CheckAlgoSigner = () => {
  const action = useCallback(() => {
    if (typeof AlgoSigner !== 'undefined') {
      return "AlgoSigner is installed.";
    } else {
      return "AlgoSigner is NOT installed.";
    }
  }, []);

  return <ExampleAlgoSigner title="CheckAlgoSigner" buttonText="Check" buttonAction={action}/>
};

const ConnectAlgoSigner = () => {
  const action = useCallback(async () => {
    try {
      const r = await AlgoSigner.connect();
      return JSON.stringify(r, null, 2);
    } catch (e) {
      console.error(e);
      return JSON.stringify(e, null, 2);
    }
  }, []);

  return <ExampleAlgoSigner title="Connect to AlgoSigner" buttonText="Connect" buttonAction={action}/>
};

const GetAccounts = () => {
  const action = useCallback(async () => {
    try {
      const r = await AlgoSigner.accounts({
        ledger: 'TestNet'
      });
      return JSON.stringify(r, null, 2);
    } catch (e) {
      console.error(e);
      return JSON.stringify(e, null, 2);
    }
  }, []);

  return <ExampleAlgoSigner title="Get TestNet Accounts" buttonText="Get Accounts" buttonAction={action}/>
};

const GetStatus = () => {
  const action = useCallback(async () => {
    try {
      const r = await AlgoSigner.algod({
        ledger: 'TestNet',
        path: '/v2/status'
      });
      return JSON.stringify(r, null, 2);
    } catch (e) {
      console.error(e);
      return JSON.stringify(e, null, 2);
    }
  }, []);

  return <ExampleAlgoSigner title="Get TestNet Algod Status" buttonText="Get Status" buttonAction={action}/>
};

const App = () => {
  return (
    <Container className="App">
      <Header as="h1" dividing>Simple React Examples Using AlgoSigner</Header>
      <p>
        This React App shows some very simple examples using AlgoSigner.
        See <a
        href="https://purestake.github.io/algosigner-dapp-example">https://purestake.github.io/algosigner-dapp-example</a> for
        more examples.
      </p>

      <p>
        <a href="https://github.com/fabrice102/algosigner-dapp-react-example">See code in GitHub.</a>
      </p>

      <CheckAlgoSigner/>

      <ConnectAlgoSigner/>

      <GetAccounts/>

      <GetStatus/>
    </Container>
  );
};

export default App;
