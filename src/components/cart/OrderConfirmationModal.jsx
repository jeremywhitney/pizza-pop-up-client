import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { useModal } from "../../contexts/ModalContext";

const OrderConfirmationModal = ({ order }) => {
  const { hideModal, showModal } = useModal();

  const handleViewDetails = () => {
    showModal({
      component: "OrderDetailsModal",
      props: {
        order,
        showTitle: false,
      },
    });
  };

  return (
    <Modal title="Order Confirmation">
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-green-600 text-lg mb-2">
            Your order has been placed successfully!
          </div>
          <div className="text-gray-600">
            Order #{order.id} has been confirmed.
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              hideModal();
              navigate("/");
            }}
          >
            Return to Home
          </Button>
          <Button onClick={handleViewDetails}>View Order Details</Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderConfirmationModal;
