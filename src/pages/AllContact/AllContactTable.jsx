import { GoTrash } from "react-icons/go";
import Swal from "sweetalert2";
import UseAllContacts from "../../hooks/UseAllContacts";
import { useState } from "react";
import UpdateModal from "./UpdateModal";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareContactModal from "./ShareContactModal";
import UseAuth from "../../hooks/UseAuth";

const AllContactTable = ({ contactUser }) => {
  const { name, email, number, image_url } = contactUser;
  const [, refetch] = UseAllContacts();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const [loader, setLoader] = useState(false);
  const {user} = UseAuth()

  const [open, setOpen] = useState(false);
  const openSharedModal = () => setOpen(true);
  const closeSharedModal = () => setOpen(false);
  const [sharedLoader, setSharedLoader] = useState(false);

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/contactUsers/${user._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "center-center",
                icon: "success",
                title: `${name} is deleted successfully`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

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
        fetch(`http://localhost:8000/contactUsers/${contactUser._id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateUser),
        })
          .then((res) => res.json())
          .then((updatedUser) => {
            if (updatedUser.modifiedCount > 0) {
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

  const handleSharedContact = (e) => {
    e.preventDefault();
    const permission = document.getElementById("permission").value;
    const email = document.getElementById("emailId").value;

    if (email === "") {
      return toast.error("Email is required", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (permission === "") {
      return toast.error("Permission is required", {
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
    console.log(email);
    console.log(permission);
    console.log(contactUser);
    const sharedContact = {
      name: contactUser.name,
      email: contactUser.email,
      number: contactUser.number,
      image_url: contactUser.image_url,
      owner: contactUser.postUserEmail,
      owner_photo:user?.photoURL,
      permission,
      sendTo: email,
    };
    setSharedLoader(true);
    fetch(`http://localhost:8000/sharedContact`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sharedContact),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSharedLoader(false);
          setOpen(false);
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: `Your contact has been shared to ${email}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <>
      <tr>
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
        <td className="text-base font-medium">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 px-2 py-1 rounded-sm hover:bg-blue-700 text-gray-50"
          >
            Update
          </button>
        </td>
        <td>
          <button
            onClick={() => handleDelete(contactUser)}
            className="text-base font-medium"
          >
            <GoTrash color="red" size={30} />
          </button>
        </td>
        <td className="text-base font-medium">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 px-2 py-1 rounded-sm hover:bg-blue-700 text-gray-50"
          >
            Share
          </button>
        </td>
      </tr>
      <UpdateModal
        closeModal={closeModal}
        isOpen={isOpen}
        openModal={openModal}
        contactUser={contactUser}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loader={loader}
      />
      <ShareContactModal
        closeSharedModal={closeSharedModal}
        Open={open}
        contactUser={contactUser}
        sharedLoader={sharedLoader}
        openSharedModal={openSharedModal}
        handleSharedContact={handleSharedContact}
      />
      <ToastContainer />
    </>
  );
};

export default AllContactTable;
