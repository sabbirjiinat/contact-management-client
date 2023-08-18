import Container from "../../components/Container";
import EmptyMessage from "../../components/EmptyMessage";
import UseAllUsers from "../../hooks/UseAllUsers";
import AllUserTable from "./AllUserTable";

const HomePage = () => {
  const [users] = UseAllUsers();
  console.log(users);
  return (
        <div className="bg-gray-200">
    <Container>
      <h2 className="text-center text-3xl font-extrabold text-gray-900 py-5">
        All Users
      </h2>
      {users && users.length > 0 && Array.isArray(users) ? (
        <div className="overflow-x-auto  h-full w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-base font-medium text-gray-600">Photo</th>
                <th className="text-base font-medium text-gray-600">Name</th>
                <th className="text-base font-medium text-gray-600">Email</th>
               
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <AllUserTable key={user._id} user={user}></AllUserTable>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyMessage
          heading="No User available"
        />
      )}
    </Container>
    </div>
  );
};

export default HomePage;
