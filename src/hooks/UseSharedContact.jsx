import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";
const UseSharedContact = () => {
  const { user } = UseAuth();
  const [axiosSecure] = UseAxiosSecure()
  const { data: sharedContact = [], refetch } = useQuery({
    queryKey: ["sharedContact", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/sharedContact?sendTo=${user?.email}`
      );
      return res.data;
    },
  });
  return [sharedContact, refetch];
};

export default UseSharedContact;
