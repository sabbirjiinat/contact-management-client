const AllUserTable = ({user}) => {
    const {name,email,photo} = user;
    return (
        <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-16 h-16 rounded-full">
                <img src={photo} alt="Contact Image" />
              </div>
            </div>
          </div>
        </td>

        <td className="text-base font-medium text-gray-600">{name}</td>
        <td className="text-base font-medium text-gray-600">{email}</td>
      </tr>
    );
};

export default AllUserTable;