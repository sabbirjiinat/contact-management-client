import { useQuery } from "@tanstack/react-query";
const UseAllUsers = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://contact-management-server-seven.vercel.app/users");
      return res.json();
    },
  });
  return [users];
};

export default UseAllUsers;
