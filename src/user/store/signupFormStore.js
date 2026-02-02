import { create } from "zustand";

const useSignupFormStore = create((set) => ({
  formData: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  acceptTerms: false,

  // Update form data
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  // Update a single field
  updateField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  // Set accept terms
  setAcceptTerms: (value) => set({ acceptTerms: value }),

  // Reset form (called after successful signup)
  resetForm: () =>
    set({
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      acceptTerms: false,
    }),
}));

export { useSignupFormStore };
