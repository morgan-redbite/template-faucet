import { useEffect, useState } from "react";

export function useDivTagListener(ref: any) {
    const [close, setClose] = useState(false);
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
            setClose(true)
        } else {
            setClose(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);

    return close;
}