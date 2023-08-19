import { useForm } from "react-hook-form";
import { useState } from "react";
import UpdateSharedModal from "./UpdateSharedModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import UseSharedContact from "../../hooks/UseSharedContact";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
const SharedContactTable = ({ sharedUser }) => {
  const { name, email, number, image_url, owner, owner_photo, permission } =
    sharedUser;
  const [, refetch] = UseSharedContact();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const [loader, setLoader] = useState(false);
  const [axiosSecure] = UseAxiosSecure()

  const onSubmit = (data) => {
    if (data.image.length === 0) {
      return toast.error("Image is required", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;
    const formData = new FormData();
    formData.append("image", data.image[0]);
    setLoader(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageUrl) => {
        const image_url = imageUrl.data.display_url;
        const { name, email, number } = data;
        const updateUser = { name, email, number, image_url };
        axiosSecure.patch(`/sharedContact/${sharedUser._id}`,updateUser
        )
          
          .then((updatedUser) => {
            if (updatedUser.data.modifiedCount > 0) {
              refetch();
              setLoader(false);
              setIsOpen(false);
              Swal.fire({
                position: "center-center",
                icon: "success",
                title: "The contact information is updated successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => {
            setLoader(false);
            toast.error(err.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      })
      .catch((err) => {
        setLoader(false);
        toast.error(err.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <>
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
              onClick={() => setIsOpen(true)}
              className="bg-blue-600 px-2 py-1 rounded-sm hover:bg-blue-700 text-gray-50"
            >
              Update
            </button>
          </td>
        ) : (
          <td className="text-base font-medium">Read Only</td>
        )}
      </tr>
      <UpdateSharedModal
        isOpen={isOpen}
        closeModal={closeModal}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loader={loader}
        openModal={openModal}
        sharedUser={sharedUser}
      />
      <ToastContainer />
    </>
  );
};

export default SharedContactTable;
