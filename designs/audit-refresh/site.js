const menu = document.querySelector(".menu");
const panel = document.querySelector("#mobile-nav");
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!open));
  menu.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  panel.hidden = open;
});
panel.addEventListener("click", event => {
  if (!event.target.closest("a")) return;
  panel.hidden = true;
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open navigation");
});
document.addEventListener("keydown", event => {
  if (event.key !== "Escape" || panel.hidden) return;
  panel.hidden = true;
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open navigation");
  menu.focus();
});
const form = document.querySelector("form");
form.addEventListener("submit", event => {
  event.preventDefault();
  let first;
  for (const field of form.querySelectorAll("[required]")) {
    let message = "";
    if (!field.value.trim()) message = "Please enter your " + field.name + ".";
    else if (field.type === "email" && !field.validity.valid) message = "Enter a valid email address.";
    else if (field.name === "message" && field.value.trim().length < 10) message = "Use at least 10 characters.";
    field.setAttribute("aria-invalid", String(Boolean(message)));
    field.nextElementSibling.textContent = message;
    if (message && !first) first = field;
  }
  if (first) {
    first.focus();
    form.querySelector(".form-status").textContent = "Please check the highlighted fields.";
  } else {
    form.querySelector(".form-status").textContent = "Preview only. Your message is ready to send.";
  }
});
form.addEventListener("input", event => {
  const field = event.target;
  if (!field.matches("[required]")) return;
  field.removeAttribute("aria-invalid");
  field.nextElementSibling.textContent = "";
});

const cursorRing = document.querySelector(".cursor-ring");
if (cursorRing && matchMedia("(hover:hover) and (pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let pointerX = 0, pointerY = 0, framePending = false;
  document.addEventListener("pointermove", event => {
    pointerX = event.clientX; pointerY = event.clientY;
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(() => { cursorRing.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`; cursorRing.classList.add("is-visible"); framePending = false; });
  }, {passive:true});
  document.addEventListener("pointerover", event => cursorRing.classList.toggle("is-link", Boolean(event.target.closest("a,button"))), {passive:true});
  document.addEventListener("pointerleave", () => cursorRing.classList.remove("is-visible"));
}
