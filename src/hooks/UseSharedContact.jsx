import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
const UseSharedContact = () => {
  const { user } = UseAuth();
  const { data: sharedContact = [], refetch } = useQuery({
    queryKey: ["sharedContact", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/sharedContact?sendTo=${user?.email}`
      );
      return res.json();
    },
  });
  return [sharedContact, refetch];
};

export default UseSharedContact;
