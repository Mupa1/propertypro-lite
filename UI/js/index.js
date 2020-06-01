const navToggle = () => {
  let modileMenu = document.getElementById("nav-links");
  if (modileMenu.style.display === "block") {
    modileMenu.style.display = "none";
  } else {
    modileMenu.style.display = "block";
  }
}
