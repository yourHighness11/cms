"use client";

import SignUpModal from "../../../components/SignUpModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Nav from "../../../components/Nav";
const UserSignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  // console.log({ name, email, mobile, password });
  const userSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !name || !mobile) {
      window.alert("Please fill all the fields.");
    }
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          mobile,
          password,
        }),
      });
      if (response.ok) {
        const userData = await response.json();
        // const token = response.data.token;
        localStorage.setItem("userData", JSON.stringify(userData));
        router.push("/");
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
      <SignUpModal
        loading={loading}
        setName={setName}
        setEmail={setEmail}
        setMobile={setMobile}
        setPassword={setPassword}
        handleSubmit={userSignUp}
      />
    </section>
  );
};

export default UserSignUp;
