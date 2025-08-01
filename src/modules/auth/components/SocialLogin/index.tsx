import { signIn } from "next-auth/react";
import React from "react";
import { BiLogoGithub } from "react-icons/bi";
import { CgGoogle } from "react-icons/cg";

const SocialLogin = () => {
  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  const handleGithubLogin = async () => {
    await signIn("github");
  };

  return (
    <>
      <div
        onClick={handleGoogleLogin}
        className="cursor-pointer bg-card/80 rounded-full p-2"
      >
        <CgGoogle size={25} />
      </div>
      <div
        onClick={handleGithubLogin}
        className="cursor-pointer bg-card/80 rounded-full p-2"
      >
        <BiLogoGithub size={25} />
      </div>
    </>
  );
};

export default SocialLogin;
