import { useState } from "react";
import PropTypes from "prop-types";
import { User } from "lucide-react";

/**
 * UserAvatar Component
 * Displays user avatar with fallback to initials or icon
 *
 * @param {string} src - Avatar image URL
 * @param {string} alt - Alt text for image
 * @param {string} name - User name (for initials fallback)
 * @param {string} size - Avatar size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} className - Additional CSS classes
 */
const UserAvatar = ({
  src,
  alt = "User avatar",
  name,
  size = "md",
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  /**
   * Get initials from name
   * Example: "John Doe" -> "JD"
   */
  const getInitials = (name) => {
    if (!name) return "";

    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(name);

  // If image exists and hasn't errored, show image
  if (src && !imageError) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setImageError(true)}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  // If name exists, show initials
  if (initials) {
    return (
      <div
        className={`${sizes[size]} rounded-full bg-[#4BEEA2]/20 flex items-center justify-center font-semibold text-[#4BEEA2] ${className}`}
      >
        {initials}
      </div>
    );
  }

  // Fallback to user icon
  return (
    <div
      className={`${sizes[size]} rounded-full bg-[#FFFFFF]/10 flex items-center justify-center ${className}`}
    >
      <User className={`${iconSizes[size]} text-[#FFFFFF]/50`} />
    </div>
  );
};

UserAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  className: PropTypes.string,
};

export default UserAvatar;
