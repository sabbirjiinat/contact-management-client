import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import { useState } from "react";
const UseAllContacts = () => {
  const { user } = UseAuth();
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const { data: contactUsers = [], refetch } = useQuery({
    queryKey: ["contactUsers", user?.email],

    queryFn: async () => {
      setLoader(true);
      const res = await fetch(
        `http://localhost:8000/contactUsers?postUserEmail=${user?.email}&search=${search}`
      );
      setLoader(false);
      return res.json();
    },
  });
  return [contactUsers, refetch, loader, search, setSearch];
};

export default UseAllContacts;
