const addUserForm = document.querySelector(".create-form");
addUserForm.onsubmit = async function (e) {
  e.preventDefault();
  const user = {
    userName: e.target.userName.value,
    email: e.target.email.value,
    password: e.target.password.value,
    phone: e.target.phone.value,
  };
  try {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await axios.post(
          "https://node-react-10.onrender.com/users",
          user
        );
        Swal.fire("Saved!", "", "success").then(() => {
          window.location.href = "./index.html";
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info").then(() => {
          window.location.href = "./index.html";
        });
      }
    });
  } catch (err) {
    document.querySelector(".text-danger").textContent = "try again";
  }
};
