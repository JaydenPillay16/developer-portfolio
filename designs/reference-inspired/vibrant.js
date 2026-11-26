const params = new URLSearchParams(location.search);
const theme = ["monolith", "aperture", "gridline"].includes(params.get("theme")) ? params.get("theme") : "monolith";
const page = ["home", "work", "about", "contact"].includes(params.get("page")) ? params.get("page") : "home";
document.body.className = theme + " page-" + page;

const projects = [
  {
    number: "01",
    client: "ABSA Group",
    title: "Amazon Connect Contact Centre Solution",
    description: "Contributing to a cloud-based contact centre solution, working with contact flows, conversational experiences, and infrastructure configuration to support enterprise contact centre requirements.",
    stack: "Amazon Connect · Amazon Lex · Terraform · GitHub Actions"
  },
  {
    number: "02",
    client: "IRIS",
    title: "Internal Document & Records Management System",
    description: "Contributed to an internal document and records management system, supporting the organisation of business information and digital document workflows.",
    stack: "SharePoint · Power Platform · Power Automate"
  },
  {
    number: "03",
    client: "AQD",
    title: "Automated Quality Documentation",
    description: "Worked on document-focused automation to help streamline quality documentation processes and reduce manual work within enterprise workflows.",
    stack: "Power Automate · SharePoint · Document Management"
  }
];
const roles = [
  ["Associate Software Engineer", "March 2026 – Present", "Cloud-based contact centre solutions and enterprise software development."],
  ["Associate DevOps Engineer", "October 2025 – March 2026", "DevOps practices, delivery workflows, CI/CD, AWS and Terraform."],
  ["Associate Software Developer", "May 2024 – October 2025", "Enterprise applications, document management and Microsoft Power Platform."],
  ["Graduate Intern", "July 2023 – April 2024", "Software development and enterprise systems."]
];
const link = (p) => "preview.html?theme=" + theme + "&page=" + p;
const nav = ["home","work","about","contact"].map(p => '<a ' + (p===page?'aria-current="page"':'') + ' href="' + link(p) + '">' + (p==="home"?"Home":p[0].toUpperCase()+p.slice(1)) + '</a>').join("");
const wordmark = theme === "gridline" ? "J/P" : "JP";
const header = '<header class="site-header shell"><a class="brand" href="' + link("home") + '" aria-label="Jayden Pillay, home"><span class="monogram">' + wordmark + '</span><span>Jayden Pillay</span></a><nav aria-label="Main navigation">' + nav + '</nav><a class="header-contact" href="' + link("contact") + '">Let’s talk <span aria-hidden="true">↗</span></a></header>';
const portrait = '<img class="portrait" src="../../public/images/hero-portrait.jpg" width="480" height="600" alt="Portrait of Jayden Pillay">';
const art = '<div class="hero-art" aria-hidden="true"><span class="art-grid"></span><span class="art-loop loop-one"></span><span class="art-loop loop-two"></span><span class="art-beam"></span><span class="art-disc"></span></div>';
const action = '<a class="primary-action" href="' + link("work") + '">Explore my work <span aria-hidden="true">↗</span></a>';
const cv = '<a class="secondary-action" href="../../public/Jayden-Pillay-CV.pdf" download>Download CV</a>';
const systems = '<div class="system-art" aria-hidden="true"><div class="system-node"><b>01</b><span>Amazon Connect</span></div><div class="system-node"><b>02</b><span>AWS cloud</span></div><div class="system-node"><b>03</b><span>Terraform</span></div><div class="system-node"><b>04</b><span>CI/CD</span></div><div class="system-trace"></div></div>';
const visual = theme === "gridline" ? systems + portrait : art + portrait;
const home = '<section class="home-hero"><div class="home-copy"><h1>Jayden<br><span>Pillay.</span></h1><p>I’m a software engineer at NTT DATA building cloud contact centres, enterprise applications and automation workflows in Johannesburg.</p><div class="actions">' + action + cv + '</div></div><div class="home-visual">' + visual + '</div><div class="hero-foot"><span>Software engineer · Johannesburg</span><span>Scroll to explore ↓</span></div></section><section class="home-preview"><h2>Built across cloud, code and enterprise systems.</h2><p>Amazon Connect · AWS · Terraform · CI/CD · Microsoft Power Platform</p></section>';
const projectMarkup = projects.map(p => '<article class="project"><div class="project-index">' + p.number + ' / ' + p.client + '</div><div class="project-body"><h2>' + p.title + '</h2><p>' + p.description + '</p><div class="project-stack">' + p.stack + '</div></div><div class="project-symbol" aria-hidden="true"><span></span><span></span><span></span></div></article>').join("");
const work = '<section class="inner-head"><h1>Selected<br><em>work.</em></h1><p>Three projects from my work in cloud engineering, enterprise software and process automation.</p></section><section class="project-list">' + projectMarkup + '</section>';
const about = '<section class="about-hero"><div class="about-copy"><h1>Engineering<br>with range.</h1><p>I’m a Software Engineer at NTT DATA with experience building cloud-based, automation, and enterprise software solutions. My work spans software development, DevOps, and cloud technologies, where I turn technical requirements into practical solutions that support real business needs.</p><p>With hands-on experience in AWS, Amazon Connect, infrastructure as code, CI/CD, and Microsoft Power Platform, I enjoy working across the software development lifecycle.</p></div><div class="about-portrait">' + portrait + '</div></section><section class="timeline"><h2>Experience</h2><div>' + roles.map(r => '<article><div><h3>' + r[0] + '</h3><p>NTT DATA · ' + r[1] + '</p></div><p>' + r[2] + '</p></article>').join("") + '</div></section><section class="education"><h2>Education and credentials</h2><p>BSc Computer Science and Information Technology · University of KwaZulu-Natal</p><p>AWS Certified Developer – Associate · AWS Certified Cloud Practitioner · Microsoft Power Platform Developer Associate</p></section>';
const contact = '<section class="contact-layout"><div class="contact-copy"><h1>Let’s make<br><em>something work.</em></h1><p>Recruiting, collaborating or working through a technical challenge? Tell me what you have in mind.</p><div class="contact-social"><a href="https://www.linkedin.com/in/jayden-pillay-44947a261/">LinkedIn ↗</a><a href="https://github.com/JaydenPillay16">GitHub ↗</a></div></div><form class="contact-form" novalidate><h2>Send a message</h2><div class="form-grid"><div class="field"><label for="name">Full name</label><input id="name" name="name" required autocomplete="name" aria-describedby="name-error"><small id="name-error"></small></div><div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" required autocomplete="email" aria-describedby="email-error"><small id="email-error"></small></div><div class="field full"><label for="company">Company <span>(optional)</span></label><input id="company" name="company" autocomplete="organization"></div><div class="field full"><label for="message">Message</label><textarea id="message" name="message" required minlength="10" rows="5" aria-describedby="message-error"></textarea><small id="message-error"></small></div></div><button type="submit">Check message <span aria-hidden="true">↗</span></button><p role="status" class="form-status"></p><p class="form-note">Design preview. Your message stays on your device.</p></form></section>';
const pages = {home, work, about, contact};
document.querySelector("#app").innerHTML = header + '<main id="content" class="shell" tabindex="-1">' + pages[page] + '</main><footer class="site-footer shell"><span>© 2026 Jayden Pillay</span><a href="index.html">Compare concepts</a></footer>';
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    let first;
    for (const input of form.querySelectorAll("[required]")) {
      const error = document.querySelector("#" + input.id + "-error");
      const message = !input.value.trim() ? "Please enter your " + input.name + "." : input.id === "email" && !input.validity.valid ? "Enter a valid email address." : input.id === "message" && input.value.trim().length < 10 ? "Use at least 10 characters." : "";
      input.setAttribute("aria-invalid", String(Boolean(message)));
      error.textContent = message;
      if (message && !first) first = input;
    }
    if (first) return first.focus();
    form.querySelector(".form-status").textContent = "Your message is ready to send.";
  });
  form.addEventListener("input", event => {
    if (event.target.matches("[required]")) {
      event.target.removeAttribute("aria-invalid");
      document.querySelector("#" + event.target.id + "-error").textContent = "";
    }
  });
}
