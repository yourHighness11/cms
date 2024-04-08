"use client";

import LoginModal from "../../../components/LoginModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Nav from "../../../components/Nav";
const UserLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      window.alert("Please fill all the fields.");
    }
    setLoading(true);
    try {
      // const token = localStorage.getItem("jwtToken");
      // console.log(token);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        // const token = response.data.token;
        localStorage.setItem("userData", JSON.stringify(userData));
        router.push("/");
        // window.location.reload();
      } else {
        window.alert("Invalid Credentials");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <Nav />
      <LoginModal
        loading={loading}
        handleSubmit={userLogin}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </section>
  );
};

export default UserLogin;
