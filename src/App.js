import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [validationStates, setValidationStates] = useState({ email: false, password: false });

  // Validación del correo solo al hacer submit
  function verifyStates() {
    if (!formValues.email.includes('@')) {
      setValidationStates(prev => ({ ...prev, email: true }));
      return true
    } else {
      setValidationStates(prev => ({ ...prev, email: false }));
      return false
    }
  }

  // Validación en tiempo real para la contraseña
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormValues({ ...formValues, password });

    // Validación: mínimo 9 caracteres y debe contener letras y números
    const isValidPassword = password.length >= 9 && /\d/.test(password) && /[a-zA-Z]/.test(password);
    setValidationStates(prev => ({ ...prev, password: !isValidPassword }));
  };

  const clickSubmit = () => {
    if (!verifyStates()) {
      alert(JSON.stringify(formValues));

    }

  };

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  };

  return (
    <div>
      <h1>Ejemplo de formularios</h1>

      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} />
          {validationStates.email && <Form.Text className="text-danger">Email is invalid.</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} />
          {validationStates.password && <Form.Text className="text-danger">Password must be at least 9 characters long, contain letters and numbers.</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;

