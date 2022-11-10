const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event -- OK
window.addEventListener("beforeinstallprompt", (event) => {
  // adding event litener
  event.preventDefault();
  window.deferredPrompt = event;
  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element -- OK
butInstall.addEventListener("click", async () => {
  const promptEvent = window.defferedPrompt;
  if (ev) {
    ev.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle("hidden", true);
  } else {
    return;
  }
});

// TODO: Add an handler for the `appinstalled` event -- ok
window.addEventListener("appinstalled", (event) => {
  window.defferedPrompt = null;
});
