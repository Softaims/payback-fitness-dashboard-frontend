export const getUserInitials = (user) => {
  if (user?.name) {
    const parts = user.name.trim().split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
  }
  return "A";
};

export const getUserDisplayName = (user) => {
  if (user?.name) {
    return user.name.trim();
  }
  return "";
};
