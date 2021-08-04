import { useRef } from "react";
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick: React.MouseEventHandler = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
      ref={overlayRef}
      onClick={handleOverlayClick}
