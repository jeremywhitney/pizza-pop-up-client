import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../../contexts/ModalContext";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import api from "../../lib/axios";

const LoginModal = () => {
  const { hideModal } = useModal();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const loginResponse = await api.post("login", credentials);
      localStorage.setItem("token", loginResponse.data.token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Token ${loginResponse.data.token}`;

      const profileResponse = await api.get("profile");
      return profileResponse;
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["auth"], {
        isAuthenticated: true,
        user: response.data,
      });

      hideModal();
    },
    onError: (error) => {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Modal>
  );
};

export default LoginModal;
