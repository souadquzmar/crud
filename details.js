async function getDetails(){
    const params = new URLSearchParams(window.location.search);
    const userID = params.get("id");

    try{
    const {data} = await axios.get(`https://node-react-10.onrender.com/users/${userID}`);
    document.querySelector(".user-id").textContent = data.user._id;
    document.querySelector(".user-name").textContent = data.user.userName;
    document.querySelector(".user-email").textContent = data.user.email;
    document.querySelector(".user-phone").textContent = data.user.phone;
    } catch(err){
        document.querySelector(".text-danger").textContent = "try again";
    } finally{
        document.querySelector(".loader-container").classList.add("d-none");
    }
}
getDetails();