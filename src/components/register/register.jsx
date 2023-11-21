import Header from "../home/Header.jsx";
import person from "../../assets/img/person.svg";
import styles from "./Register.module.scss";
import Footer from "../footer/Footer.jsx";
import { useState } from "react";

const Register = () => {

  const [name, updateName] = useState("")
  const [email, updateEmail] = useState("")
  const [password, updatePassword] = useState("")
  const [repeatPassword, updateRepeatPassword] = useState("")

  const registerHandler = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Joao",
          email: "email3@email.com",
          password: "senha123",
          confirmpassword:"senha123"
      }),
      });


      if(!response.ok)
        throw new Error(response.statusText)

    } catch(error){
      console.error(error)
    }

  }

  return (
    <section className={styles.sectionRegister}>
      <Header />
      <div className={styles.register}>
        <img src={person} />
        <form className={styles.registerForm}>
          <label>Create new account</label>
          <input onChange={(e) => {updateName(e.target.value)}} placeholder="Name" />
          <input onChange={(e) => {updateEmail(e.target.value)}} placeholder="Email" />
          <input onChange={(e) => {updatePassword(e.target.value)}} placeholder="Password" />
          <input onChange={(e) => {updateRepeatPassword(e.target.value)}} placeholder="Repeat password" />
          <button onClick={registerHandler}>Register</button>
        </form>
      </div>
      <Footer/>
    </section>
  );
};

export default Register;
