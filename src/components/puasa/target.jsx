import React, { useState } from 'react';
import {Button, Form, FloatingLabel} from 'react-bootstrap';
import Fade from 'react-bootstrap/Fade';


export default function Target() {
    const [open, setOpen] = useState(false);
    const [target, setTarget] = useState('');
    const targetAsNumber = Number(target);

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
              {targetAsNumber > 0 &&
                <p>Target Qadha : {targetAsNumber} Hari</p>
              }
          </div>
        </Fade>
      </>
    )  
}




