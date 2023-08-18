import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ImCross } from "react-icons/im";
import { TbFidgetSpinner } from "react-icons/tb";
import UseAllUsers from "../../hooks/UseAllUsers";
import UseAuth from "../../hooks/UseAuth";
export default function ShareContactModal({
  Open,
  closeSharedModal,
  handleSharedContact,
  sharedLoader,
}) {
  const [users] = UseAllUsers();
  const { user } = UseAuth();
  const filteredUser = users.filter((allUser) => allUser.email !== user?.email);


  return (
    <>
      <Transition appear show={Open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeSharedModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 relative"
                  >
                    <span> Share contact information</span>
                    <ImCross
                      onClick={closeSharedModal}
                      className="absolute top-0 right-0 cursor-pointer"
                      color="red"
                    />
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSharedContact} className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email address that you want to share this contact
                        </label>
                        <select
                          id="emailId"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          name=""
                        >
                          <option selected disabled value="">
                            Select a Email
                          </option>
                          {filteredUser.map((user) => (
                            <option value={user?.email} key={user._id}>
                              {user.email}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Select Permission
                        </label>
                        <select
                          id="permission"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          name=""
                        >
                          <option selected disabled value="">
                            Select a permission
                          </option>
                          <option value="read&write">Read & Write</option>
                          <option value="readonly">Read Only</option>
                        </select>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          {sharedLoader ? (
                            <TbFidgetSpinner className="animate-spin h-6" />
                          ) : (
                            "Share"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
