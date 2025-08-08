import type { BaseProps } from "@/types/common";
import cn from "@/utils/cn";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface ModalWrapperProps extends BaseProps {
    isOpen: boolean;
    parentClassName?: string;
}

const ModalWrapper = ({
    className,
    isOpen = false,
    children,
    parentClassName,
    ...props
}: ModalWrapperProps) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        if (window) {
            const body = document.getElementById("body");
            if (body) {
                body.style.overflowY = isOpen ? "hidden" : "scroll";
            }
        }
        setIsClient(true);
    }, [isOpen]);

    if (!isClient) return null;

    return createPortal(
        <div
            className={cn(
                "z-30 fixed hidden  justify-center items-center top-0 left-0 w-screen h-screen bg-black/80",
                {
                    flex: isOpen,
                },
                parentClassName,
            )}
        >
            <div
                className={cn(
                    "w-full max-h-[90vh] h-full mt-[10vh] lg:mt-0 lg:max-w-[700px] lg:max-h-[600px] bg-dark-brown/40 rounded-2xl border border-primary hover:shadow-glow-gold transition-shadow duration-300 ",
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
};

export default ModalWrapper;
