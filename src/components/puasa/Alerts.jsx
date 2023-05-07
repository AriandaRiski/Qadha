import React, { useState } from 'react';
import { Alert, Button, Form, FloatingLabel, Fade } from 'react-bootstrap';

const Alerts = ({ text, style, setMessage, jumlah }) => {

  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState('');
  const targetAsNumber = Number(target);

  const hasil = targetAsNumber - jumlah;

  if (show) {
    return (
      <>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-fade-text"
          aria-expanded={open}
        >
          Target
        </Button>
        <Fade in={open}>
          <div id="example-fade-text">
            <FloatingLabel label="Masukkan Target">
              <Form.Control
                value={target}
                onChange={e => setTarget(e.target.value)}
                type="number"
              />
            </FloatingLabel>
          </div>
        </Fade>

        <Alert variant="success" onClose={() => setShow(false)} dismissible style={{ display: style }}>
          <Alert.Heading> {text} </Alert.Heading>
          {targetAsNumber > 0 &&
            <p>Target Qadha : {targetAsNumber} Hari</p>
          }

          {hasil >= 0 &&
            <p>Sisa Qadha Puasa Anda {hasil} hari lagi</p>
          }
        </Alert>
      </>
    );
  }
}

export default Alerts;