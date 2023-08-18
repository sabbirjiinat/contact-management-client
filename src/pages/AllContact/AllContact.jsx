import { useRef } from "react";
import EmptyMessage from "../../components/EmptyMessage";
import UseAllContacts from "../../hooks/UseAllContacts";
import AllContactTable from "./AllContactTable";
import { AiOutlineSearch } from "react-icons/ai";
import { CSVLink } from "react-csv";
const AllContact = () => {
  const [contactUsers, refetch, , search, setSearch] = UseAllContacts();
  const searchRef = useRef();

  const handleSearchChange = () => {
    setSearch(searchRef.current.value);
    refetch();
    if(search === ''){
      refetch()
    }
  };

  const headers = [
    {
      label: "_Id",
      key: "_id",
    },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Number",
      key: "number",
    },
    {
      label: "Image_Url",
      key: "image_url",
    },
  ];

  const csvLink = {
    filename: "file.csv",
    headers: headers,
    data: contactUsers,
  };

  return (
    <>
      <div className="w-full flex justify-center items-center  ">
        <div className="w-[50vh]  py-7 relative">
          <input
            onChange={handleSearchChange}
            type="text"
            ref={searchRef}
            placeholder="Search contact by name"
            className="h-[40px] w-full  border-[#3957db] border-[2px] rounded-md px-5"
          />
          <AiOutlineSearch
            size={30}
            className="absolute top-9 right-1 cursor-pointer"
          />
        </div>
        <CSVLink
          className="ml-10 bg-blue-600 px-2 py-1 rounded-md font-medium text-gray-50 text-base hover:bg-blue-700"
          {...csvLink}
        >
          Download CSV File
        </CSVLink>
      </div>

      {contactUsers &&
      contactUsers.length > 0 &&
      Array.isArray(contactUsers) ? (
        <div className="overflow-x-auto bg-gray-200 h-full w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-base font-medium text-gray-600">Photo</th>
                <th className="text-base font-medium text-gray-600">Name</th>
                <th className="text-base font-medium text-gray-600">Email</th>
                <th className="text-base font-medium text-gray-600">Number</th>
                <th className="text-base font-medium text-gray-600">Update</th>
                <th className="text-base font-medium text-gray-600">Delete</th>
                <th className="text-base font-medium text-gray-600">Share</th>
              </tr>
            </thead>
            <tbody>
              {contactUsers.map((contactUser) => (
                <AllContactTable
                  key={contactUser._id}
                  contactUser={contactUser}
                ></AllContactTable>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyMessage
          heading="No contact available"
          href="/addContact"
          title="Add Contact"
        />
      )}
    </>
  );
};

export default AllContact;
