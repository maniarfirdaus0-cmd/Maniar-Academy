import { useState, useEffect } from "react";

/**
 * Tracks the mouse cursor's X and Y coordinates relative to a target element.
 * @param {React.RefObject} ref - The React ref of the container element.
 * @returns {{x: number, y: number}} The mouse coordinates relative to the top-left of the target container.
 */
export default function useMousePosition(ref) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (event) => {
      const rect = element.getBoundingClientRect();
      setPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref]);

  return position;
}
