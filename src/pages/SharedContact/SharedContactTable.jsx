const SharedContactTable = ({ sharedUser }) => {
  const { name, email, number, image_url, owner, owner_photo, permission } =
    sharedUser;
  console.log(permission);
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16 rounded-full">
              <img src={owner_photo} alt="Contact Image" />
            </div>
          </div>
        </div>
      </td>

      <td className="text-base font-medium text-gray-600">{owner}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-16 h-16 rounded-full">
              <img src={image_url} alt="Contact Image" />
            </div>
          </div>
        </div>
      </td>

      <td className="text-base font-medium text-gray-600">{name}</td>
      <td className="text-base font-medium text-gray-600">{email}</td>
      <td className="text-base font-medium text-gray-600">{number}</td>
      {permission === "read&write" ? (
        <td className="text-base font-medium">
          <button
            // onClick={() => setIsOpen(true)}
            className="bg-blue-600 px-2 py-1 rounded-sm hover:bg-blue-700 text-gray-50"
          >
            Update
          </button>
        </td>
      ) : (
        <td className="text-base font-medium">Read Only</td>
      )}
    </tr>
  );
};

export default SharedContactTable;
