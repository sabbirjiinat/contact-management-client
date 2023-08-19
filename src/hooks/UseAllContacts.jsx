import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import { useState } from "react";
import UseAxiosSecure from "./UseAxiosSecure";
const UseAllContacts = () => {
  const { user } = UseAuth();
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [axiosSecure] = UseAxiosSecure()
  const { data: contactUsers = [], refetch } = useQuery({
    queryKey: ["contactUsers", user?.email],

    queryFn: async () => {
      setLoader(true);
      const res = await axiosSecure.get(
        `/contactUsers?postUserEmail=${user?.email}&search=${search}`
      );
      setLoader(false);
      return res.data;
    },
  });
  return [contactUsers, refetch, loader, search, setSearch];
};

export default UseAllContacts;
