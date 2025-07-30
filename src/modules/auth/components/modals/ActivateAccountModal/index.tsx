import Subtitle from "@/components/ui/typography/Subtitle";
import ModalWrapper from "../../../../../components/modals/ModalWrapper";
import Button from "@/components/ui/buttons/Button";
import Content from "@/components/ui/typography/Content";
import { IAuthModals } from "@/modules/auth/UserNav";

interface ActivateAccountModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleModal: (type: IAuthModals) => void;
}

const ActivateAccountModal = ({
  isOpen,
  handleModal,
  handleCloseModal,
}: ActivateAccountModalProps) => {
  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="flex justify-center items-center flex-col text-center h-[90%] gap-6">
        <Subtitle>Activate Account</Subtitle>

        <Content className="max-w-[500px]">
          Thank you for registering with us.
          <br />
          We&apos;ve sent a verification email to your registered email address.
          Please check your inbox and follow the activation link to verify your
          account. If you do not see the email within a few minutes, please
          check your spam or junk folder.
        </Content>

        <Button onClick={handleCloseModal} className="max-w-28">
          Ok
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default ActivateAccountModal;
