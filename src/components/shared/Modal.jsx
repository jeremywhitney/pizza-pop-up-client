import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useModal } from "../../contexts/ModalContext";

const Modal = ({ children, title, className = "" }) => {
  const { isOpen, hideModal } = useModal();

  return (
    <Dialog.Root open={isOpen} onOpenChange={hideModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in z-40" />
        <Dialog.Content
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 animate-slide-up z-50 ${className}`}
        >
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
