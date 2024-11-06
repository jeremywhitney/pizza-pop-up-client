import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import * as Form from "@radix-ui/react-form";
import { Pencil, Check, X } from "lucide-react";
import Button from "../shared/Button";

export const UserInformation = () => {
  const { data: auth, updateProfile } = useAuth();
  const profile = auth?.user?.profile;
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSave = (field) => {
    updateProfile.mutate(
      { field, value: editValue },
      {
        onSuccess: () => {
          setEditingField(null);
          setEditValue("");
        },
      }
    );
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
  };

  // Define input type based on field
  const getInputType = (field) => {
    switch (field) {
      case "email":
        return "email";
      case "phone_number":
        return "tel";
      default:
        return "text";
    }
  };

  const renderField = (label, field, value) => (
    <div
      key={field}
      className="flex justify-between items-center py-3 border-b"
    >
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        {editingField === field ? (
          <div className="flex items-center gap-2">
            <Form.Root
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(field);
              }}
            >
              <Form.Field name={field}>
                <Form.Control asChild>
                  <input
                    type={getInputType(field)}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="px-2 py-1 border rounded"
                    autoFocus // Add autofocus when field becomes editable
                  />
                </Form.Control>
              </Form.Field>
              <Button
                type="submit"
                size="sm"
                variant="secondary"
                className="ml-2"
                disabled={updateProfile.isPending} // Disable during mutation
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleCancel}
                className="ml-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </Form.Root>
          </div>
        ) : (
          <>
            <span>{value}</span>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleEdit(field, value)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );

  // Define fields array for better maintenance
  const fields = [
    { label: "First Name", field: "first_name", value: profile.first_name },
    { label: "Last Name", field: "last_name", value: profile.last_name },
    { label: "Username", field: "username", value: profile.username },
    { label: "Email", field: "email", value: profile.email },
    { label: "Phone", field: "phone_number", value: profile.phone_number },
    { label: "Address", field: "address", value: profile.address },
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Information</h2>
      </div>
      <div className="space-y-1">
        {fields.map(({ label, field, value }) =>
          renderField(label, field, value)
        )}
      </div>
    </section>
  );
};
