import { X, AlertTriangle } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonColor = "bg-red-600 hover:bg-red-700",
  loading = false,
}) => {
  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!loading) {
      onConfirm();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B0F0D] rounded-xl p-6 w-full max-w-lg relative">
        <button onClick={handleClose} className="cursor-pointer absolute top-4 right-4 text-[#ffffff]/50 hover:text-white transition-colors" disabled={loading}>
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-[#ffffff]/50 text-sm leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={`cursor-pointer w-40 font-semibold py-3 px-4 rounded-lg transition-colors ${
              loading ? "bg-gray-500 cursor-not-allowed" : confirmButtonColor
            } text-white`}
          >
            {loading ? "Processing..." : confirmText}
          </button>
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="cursor-pointer w-40 bg-[#ffffff]/10 text-[#ffffff]/70 font-semibold py-3 px-4 rounded-lg hover:bg-[#ffffff]/20 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
