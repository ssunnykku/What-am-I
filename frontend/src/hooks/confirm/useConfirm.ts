export const useConfirm = (message: any, onConfirm: any, onCancel: any) => {
  if (!onConfirm || typeof onConfirm !== 'function') {
    return;
  }
  if (onCancel && typeof onCancel !== 'function') {
    return;
  }

  const confirmAction = (e: React.MouseEvent) => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      e.preventDefault();
      onCancel();
    }
  };
  return confirmAction;
};
