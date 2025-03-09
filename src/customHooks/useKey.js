import { useEffect } from "react";

export function useKey(keyCode, action) {
  return useEffect(
    function () {
      function callbackFunction(e) {
        if (e.code.toLowerCase() === keyCode.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callbackFunction);

      return function () {
        document.removeEventListener("keydown", callbackFunction);
      };
    },
    [action, keyCode]
  );
}
