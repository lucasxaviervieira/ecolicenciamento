/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageTitle({ title }: any) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return null;
}
