import { createContext, useContext, useState, useCallback } from "react";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";
import AddToCartModal from "../components/cart/AddToCartModal";
import CheckoutModal from "../components/cart/CheckoutModal";
import PaymentModal from "../components/profile/PaymentModal";
import OrderDetailsModal from "../components/profile/OrderDetailsModal";
import OrderConfirmationModal from "../components/cart/OrderConfirmationModal";
import DeletePaymentModal from "../components/profile/DeletePaymentModal";
import MenuItemModal from "../components/employee/MenuItemModal";

// Map of available modals
const MODAL_COMPONENTS = {
  AddToCartModal,
  CheckoutModal,
  LoginModal,
  RegisterModal,
  PaymentModal,
  OrderDetailsModal,
  OrderConfirmationModal,
  DeletePaymentModal,
  MenuItemModal,
};

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = useCallback(({ component, props }) => {
    const ModalComponent = MODAL_COMPONENTS[component];
    if (!ModalComponent) {
      console.error(`Modal component ${component} not found`);
      return;
    }

    setModalContent(<ModalComponent {...props} />);
    setIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setModalContent(null), 300);
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, hideModal, isOpen }}>
      {children}
      {isOpen && modalContent}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
