"use client";
import React, { useState } from "react";
import LoginModal from "@/modules/auth/components/modals/LoginModal";
import SignupModal from "@/modules/auth/components/modals/SignupModal";
import ActivateAccountModal from "@/modules/auth/components/modals/ActivateAccountModal";
import Button from "@/components/ui/buttons/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NextImage from "@/components/ui/common/NextImage";

export type IAuthModals = "login" | "signup" | "verify";

const modals = {
  login: LoginModal,
  signup: SignupModal,
  verify: ActivateAccountModal,
};

const UserNav = () => {
  const { data } = useSession();
  const user = data?.user;
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

      {user && user.avatar && (
        <Link href={"/profile/info"} className="size-9 md:size-12 rounded-full overflow-hidden">
          <NextImage src={user.avatar} />
        </Link>
      )}
      {!user && (
        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              handleModal("login");
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
        </div>
      )}
    </>
  );
};

export default UserNav;
