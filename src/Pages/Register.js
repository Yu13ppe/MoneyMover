import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import logo from "../Assets/Images/logo.jpeg";
import {  useHistory } from "react-router-dom";
import axios from "axios";
import { useDataContext } from "../Context/dataContext";
import { toast, ToastContainer } from "react-toastify";

function Register() {
  const history = useHistory();
  const { url } = useDataContext();

  const [use_name, setUse_name] = useState("");
  const [use_lastName, setUse_lastName] = useState("");
  const [use_email, setUse_email] = useState("");
  const [use_password, setUse_password] = useState("");
  // const [use_phone, setUse_phone] = useState("");
  const [use_confirm, setUse_confirm] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const openModal = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await axios.post(`${url}/Auth/register`, {
        use_name,
        use_lastName,
        use_dni: "",
        use_email,
        use_password,
        use_verif: "N",
        use_img: "",
      });

      axios.post(`${url}/Mailer/EmailWelcome/${use_email}`);

      toast.success(
        "¡Registro exitoso! Te hemos enviado un correo de bienvenida."
      );
      setTimeout(() => history.push("/Login"), 2000); // Redirigir después de 2 segundos
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Ocurrió un error durante el registro. Por favor, intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={openModal}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="register-logo" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo electrónico"
            value={use_email}
            onChange={(e) => setUse_email(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Nombres</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Nombres"
            value={use_name}
            onChange={(e) => setUse_name(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellidos</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Apellidos"
            value={use_lastName}
            onChange={(e) => setUse_lastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group phone-group">
          <label htmlFor="phone">Teléfono</label>
          <div className="d-flex phone-container">
            <select
              name="phonePrefix"
              id="phonePrefix"
              // value={formData.phonePrefix}
              // onChange={handleChange}
              className="phone-prefix"
            >
              <option value="+34">🇪🇸 +34</option>
              <option value="+1">🇺🇸 +1</option>
            </select>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Número de teléfono"
              // value={formData.phone}
              // onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Contraseña"
              value={use_password}
              onChange={(e) => setUse_password(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <div className="position-relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirmar contraseña"
              value={use_confirm}
              onChange={(e) => setUse_confirm(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            name="termsAccepted"
            id="termsAccepted"
            checked={termsAccepted}
            onChange={(e)=> setTermsAccepted(e)}
            required
          />
          <label htmlFor="termsAccepted">
            Acepto los términos y condiciones
          </label>
        </div>
        <div className="button-group">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
          <button type="submit" className="btn-primary">
            Continuar
          </button>
        </div>
      </form>

      <Modal isOpen={modalIsOpen} toggle={closeModal} centered>
        <ModalHeader toggle={closeModal}>Confirmación de Datos</ModalHeader>
        <ModalBody>
          <p>
            <strong>Correo electrónico:</strong> {use_email}
          </p>
          <p>
            <strong>Nombres:</strong> {use_name}
          </p>
          <p>
            <strong>Apellidos:</strong> {use_lastName}
          </p>
          <p>
            <strong>Teléfono:</strong> +58 4246725408
          </p>
          <p>
            <strong>Contraseña:</strong> {use_password}
          </p>
        </ModalBody>
        <ModalFooter>
          <button className="btn-secondary" onClick={closeModal}>
            Editar
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
          {loading ? "Enviando..." : "Confirmar"}
          </button>
        </ModalFooter>
      </Modal>
      <ToastContainer autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </div>
  );
}

export { Register };
