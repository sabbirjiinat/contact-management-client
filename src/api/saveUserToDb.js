const SaveUserToDb = (user) => {
    const CurrentUser = {
      email: user.email,
      photo: user?.photoURL,
      name: user?.displayName,
    };
    fetch(`http://localhost:8000/users/${user.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(CurrentUser),
    }).then((res) => res.json())
    .then((data =>{
      console.log(data);
    }))
  };
  
  export default SaveUserToDb;
  