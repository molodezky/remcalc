import {useEffect, useState} from 'react';
import { Container, Row, Col, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

import './App.scss';

const App = (props) => {

  const [defaultSize, setDefaultSize] = useState(props.defaultSize);
  const [sizePx, setSizePx] = useState();
  const [sizeRem, setSizeRem] = useState(1);
  const [sizePreview, setSizePreview] = useState(props.defaultSize);
  const [directCalc, setDirectCalc] = useState('rem');

  useEffect(() => {
    setSizePx(defaultSize);
    document.title = 'Px to Rem / Rem to Px Converter';
    document.description = 'Convert px to rem and rem to px'; 
  }, [])

  useEffect(() => {
    console.log(directCalc);    
     if ( directCalc === 'rem' ) {
       setSizePx(sizeRem * defaultSize);
       setSizePreview(sizePx + 'px');
     }
     if ( directCalc === 'px' ) {
       setSizeRem(sizePx / defaultSize);
       setSizePreview(sizePx + 'px');
     }

  }, [sizeRem, sizePx, directCalc, defaultSize])

  const changeRem = (event) => {
    setSizeRem(event.target.value);
    setDirectCalc('rem');
  }

  const changePx = (event) => {
    setSizePx(event.target.value);
    setDirectCalc('px');
  }

  const copySizePx = () => {
    navigator.clipboard.writeText(sizePx + 'px')
  }

  return (
    <>
      <header><h1>Px to Rem / Rem to Px Converter</h1></header>
      <Container>
      <Row>
        <Col md={6}>
          <h2>Preview:</h2>
          <p className="preview mb-3" style={{fontSize: sizePreview}}>
            Lorem ipsum...
          </p>
        </Col>
        <Col md={6}>
          <Form>

            <InputGroup className="mb-3">
              <InputGroup.Text>REM</InputGroup.Text>
              <FormControl 
                type="text"
                autoComplete="off"
                name="inputRem"
                value={sizeRem}
                onChange={changeRem} />
                <Button variant="info" onClick={() => {navigator.clipboard.writeText(sizeRem + 'rem')}}><FontAwesomeIcon icon={faCopy} /></Button>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>PX</InputGroup.Text>
              <FormControl 
                type="text"
                autoComplete="off"
                name="inputPx"
                value={sizePx}
                onChange={changePx} />
                <Button variant="info" onClick={copySizePx}><FontAwesomeIcon icon={faCopy} /></Button>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>1rem =</InputGroup.Text>
              <Form.Control 
                type="text"
                autoComplete="off"
                value={defaultSize}
                onChange={event => setDefaultSize(event.target.value)} />
                <Button variant="outline-info" size="sm" onClick={() => setDefaultSize(props.defaultSize)}>Default Size</Button>
            </InputGroup>

          </Form>        
        </Col>
      </Row>
      </Container>
      <footer>
        2022 &copy; Copyright <a href="https://molodezky.pp.ua" target="new">Yevhen Molodetskyi</a>
      </footer>
    </>
  );
}

export default App;
