import EmptyMessage from "../../components/EmptyMessage";
import UseSharedContact from "../../hooks/UseSharedContact";
import SharedContactTable from "./SharedContactTable";

const SharedContact = () => {
  const [sharedContact] = UseSharedContact();

  return (
    <>
      {sharedContact &&
      sharedContact.length > 0 &&
      Array.isArray(sharedContact) ? (
        <div className="overflow-x-auto bg-gray-200 h-full w-full">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 pb-10">Shared Contact</h1>
          <table className="table table-xs">
            {/* head */}
            <thead>
              <tr>
                <th className="text-base font-medium text-gray-600">
                  Owner Picture
                </th>
                <th className="text-base font-medium text-gray-600">
                  Owner Email
                </th>
                <th className="text-base font-medium text-gray-600">
                  Contact Picture
                </th>
                <th className="text-base font-medium text-gray-600">
                  Contact Name
                </th>
                <th className="text-base font-medium text-gray-600">
                  Contact Email
                </th>
                <th className="text-base font-medium text-gray-600">
                  Contact Number
                </th>
                <th className="text-base font-medium text-gray-600">Permission</th>
             
              </tr>
            </thead>
            <tbody>
              {sharedContact.map((sharedUser) => (
                <SharedContactTable
                  key={sharedUser._id}
                  sharedUser={sharedUser}
                ></SharedContactTable>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyMessage heading="No Share contact available" />
      )}
    </>
  );
};

export default SharedContact;
