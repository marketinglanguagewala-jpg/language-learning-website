async function checkAuth(){

  try{

    let res = await fetch(
      "https://admin.languagewala.in/backend-php/check_auth.php",
      { credentials: "include" }
    );

    let role = (await res.text()).trim();

    
    if(role === "no"){
      window.location.href = "sign-in.html";
      return;
    }

    let currentPage = window.location.pathname;

    
    if(role !== "admin" && currentPage.includes("index.html")){
      window.location.href = "leads.html"; // ya dashboard page
      return;
    }

    // Hide Users menu
    if(role !== "admin"){

      let menu = document.getElementById("usersMenu");

      if(menu){
        menu.style.display = "none";
      }
    }

  }catch(e){
    console.log("Auth error:", e);
  }

}

checkAuth();