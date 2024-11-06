import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { useModal } from "../../contexts/ModalContext";

const DeletePaymentModal = ({ payment, onConfirm }) => {
  const { hideModal } = useModal();

  return (
    <Modal title="Delete Payment Method">
      <div className="space-y-6">
        <p className="text-gray-600">
          Are you sure you want to delete this payment method? This action
          cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={hideModal}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm(payment.id);
              hideModal();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePaymentModal;
