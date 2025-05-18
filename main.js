async function getUsers() {
  try {
    const { data } = await axios.get(
      "https://node-react-10.onrender.com/users"
    );
    let html = "";
    for (let i = 0; i < data.users.length; i++) {
      html += `
        <tr>
            <td>${data.users[i]._id}</td>
            <td>${data.users[i].userName}</td>
            <td>${data.users[i].email}</td>
            <td class="d-flex gap-10 justify-content-center">
              <a class="btn-primary btn" href="details.html?id=${data.users[i]._id}">Details</a>
              <a class="btn btn-edit" href="edit.html?id=${data.users[i]._id}">Edit</a>
              <button class="btn-danger btn" onclick="deleteUser('${data.users[i]._id}')"> Delete </button>
            </td>
        </tr>
        `;
    }
    document.querySelector(".users-data").innerHTML = html;
  } catch (err) {
    document.querySelector(".text-danger").textContent = "error opening page";
  } finally {
    document.querySelector(".loader-container").classList.add("d-none");
  }
}
getUsers();
async function deleteUser(id) {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `https://node-react-10.onrender.com/users/${id}`
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }).then((reload) =>{
            location.reload();
        });
        
      }
    });
  } catch (err) {
    document.querySelector(".text-danger").textContent = "try again";
  } 
}
