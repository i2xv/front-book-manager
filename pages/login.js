// import axios, { Axios } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import Layout from "../components/Layout";
// import { setLogin } from "../features/login.slice";
import { TextInput, PasswordInput, Group, Button } from "@mantine/core";
import { Loader } from "@mantine/core";
import { useForm, isEmail } from "@mantine/form";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { CiLock } from "react-icons/ci";
import { SiMaildotru } from "react-icons/si";
// import { Value } from "sass";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Adresse email invalide"),
    },
  });

  //auth Hook
  const { login, isLoading, user } = useAuth({ middleware: "guest" });

  if (isLoading || user) {
    return <>loading ...</>;
  }

  //submit form
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password, setErrors });
  };

  return (
    <div className="login">
      <Link href="/">
        <div className="logo">
          B<span>i</span>blioLand
        </div>
      </Link>
      {/* <h2>Creez un compte</h2> */}
      <form onSubmit={handleLogin}>
        <div className="form-item">
          <TextInput
            icon={<SiMaildotru />}
            label="Email"
            placeholder="votre email"
            mt="md"
            onChange={(e) => setEmail(e.target.value)}
            // {...form.getInputProps("email")}
          />
        </div>
        <div className="login-form-item">
          <PasswordInput
            icon={<CiLock />}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: "16px" }}
            label="Mot de passe"
            placeholder="Mot de passe"
            // {...form.getInputProps("password")}
          />
        </div>

        <div className="login-form-item">
          <Group position="right" mt="md">
            <Button type="submit" style={{ background: "#293494" }}>
              Connexion
            </Button>
          </Group>
        </div>
      </form>
      <p>
        pas encore de compte ? <Link href="/register">Inscription</Link>
      </p>
    </div>
  );
};

export default login;
