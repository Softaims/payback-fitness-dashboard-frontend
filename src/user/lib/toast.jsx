import toast, { Toaster } from "react-hot-toast";

// Simple toast styles matching your app's green theme
const toastStyles = {
  success: {
    style: {
      background: "linear-gradient(135deg, #4BEEA2 0%, #3dd48a 100%)",
      color: "black",
      fontWeight: "600",
      fontSize: "14px",
      padding: "16px 20px",
      borderRadius: "12px",
      boxShadow: "0 20px 25px -5px rgba(75, 238, 162, 0.3), 0 10px 10px -5px rgba(75, 238, 162, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      maxWidth: "400px",
    },
    iconTheme: {
      primary: "black",
      secondary: "#4BEEA2",
    },
    duration: 4000,
  },
  error: {
    style: {
      background: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
      color: "#fff",
      fontWeight: "600",
      fontSize: "14px",
      padding: "16px 20px",
      borderRadius: "12px",
      boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.3), 0 10px 10px -5px rgba(220, 38, 38, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      maxWidth: "400px",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#DC2626",
    },
    duration: 5000,
  },
};

// Simple toast methods
export const customToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      ...toastStyles.success,
      ...options,
    });
  },

  error: (message, options = {}) => {
    return toast.error(message, {
      ...toastStyles.error,
      ...options,
    });
  },
};

// Toaster component
export const CustomToaster = () => (
  <Toaster
    position="top-center"
    gutter={8}
    containerStyle={{
      top: 20,
      left: 20,
      bottom: 20,
      right: 20,
    }}
    toastOptions={{
      duration: 4000,
      success: toastStyles.success,
      error: toastStyles.error,
    }}
  />
);

export default customToast;
