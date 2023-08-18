import { useQuery } from "@tanstack/react-query";
const UseAllUsers = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/users");
      return res.json();
    },
  });
  return [users];
};

export default UseAllUsers;
