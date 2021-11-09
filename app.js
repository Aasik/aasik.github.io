const hamburgrButton = document.getElementById('hamburger')
const navList = document.getElementById('nav-list')

function toggleButton() {
    navList.classList.toggle('show')
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

hamburgrButton.addEventListener('click', toggleButton)

