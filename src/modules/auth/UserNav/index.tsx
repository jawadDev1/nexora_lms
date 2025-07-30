"use client";
import React, { useState } from "react";
import LoginModal from "@/modules/auth/components/modals/LoginModal";
import SignupModal from "@/modules/auth/components/modals/SignupModal";
import ActivateAccountModal from "@/modules/auth/components/modals/ActivateAccountModal";
import Button from "@/components/ui/buttons/Button";

export type IAuthModals = "login" | "signup" | "verify";

const modals = {
  login: LoginModal,
  signup: SignupModal,
  verify: ActivateAccountModal,
};

const UserNav = () => {
  const [currentModal, setCurrentModal] = useState<IAuthModals>("login");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const Modal = modals[currentModal];

  const handleModal = (type: IAuthModals) => {
    setCurrentModal(type);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(!isModalOpen)}
        handleModal={handleModal}
      />
      <div className="flex items-center gap-3">
        <Button
          onClick={() => {
            handleModal('login');
            setIsModalOpen(true);
          }}
          varient="outline"
          className="max-w-[200px]"
        >
          Login
        </Button>
        <Button
          onClick={() => {
            handleModal("signup");
            setIsModalOpen(true);
          }}
          className="max-w-[200px]"
        >
          Signup
        </Button>

        {/* <Link href={"/login"}>
        <CgProfile className="size-[26px] lg:size-7" color="white" />
      </Link> */}
      </div>
    </>
  );
};

export default UserNav;
