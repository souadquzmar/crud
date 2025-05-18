const editUserForm = document.querySelector(".edit-user");
const params = new URLSearchParams(window.location.search);
const userID = params.get("id");
async function getUserInfo() {
  try {
    const { data } = await axios.get(
      `https://node-react-10.onrender.com/users/${userID}`
    );
    document
      .querySelector(".userName")
      .setAttribute("value", data.user.userName);
    document.querySelector(".email").setAttribute("value", data.user.email);
    document
      .querySelector(".password")
      .setAttribute("value", data.user.password);
    document.querySelector(".phone").setAttribute("value", data.user.phone);
    document.querySelector(".email").setAttribute("readonly", true);
    document.querySelector(".password").setAttribute("readonly", true);
    document.querySelector(".phone").setAttribute("readonly", true);
  } catch (err) {
    document.querySelector(".text-danger").textContent = "try again";
  } finally {
    document.querySelector(".loader-container").classList.add("d-none");
  }
}
getUserInfo();
editUserForm.onsubmit = async function (e) {
  e.preventDefault();
  const data = {
    userName: e.target.userName.value,
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
        const response = await axios.put(
          `https://node-react-10.onrender.com/users/${userID}`,
          data
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
