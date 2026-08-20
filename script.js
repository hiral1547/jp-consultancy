document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  const year = document.getElementById("year");
  const form = document.getElementById("projectForm");
  const message = document.getElementById("formMessage");
  const whatsappNumber = "916355135078";

  // Add new projects here. Each project can contain as many images as needed.
  // Copy an object, change its details and image paths, and add it to this list.
  const projects = [
    {
      title: "Renovation Project",
      location: "Gujarat",
      type: "Renovation Work",
      year: "2026",
      summary:
        "Transforming existing spaces with thoughtful renovation and design.",
      images: [
        "assets/project_2/image_1.jpeg",
        "assets/project_2/image_2.jpeg",
        "assets/project_2/image_3.jpeg",
        "assets/project_2/image_4.jpeg",
        "assets/project_2/image_5.jpeg",
        "assets/project_2/image_6.jpeg",
        "assets/project_2/image_7.jpeg",
        "assets/project_2/image_8.jpeg",
        "assets/project_2/image_9.jpeg",
        "assets/project_2/image_10.jpeg",
      ],
    },
    {
      title: "Residential House",
      location: "Gujarat",
      type: "New Construction",
      year: "2025",
      summary: "Residential design, planning and development.",
      images: [
        "assets/project_1/image_1.jpg",
        "assets/project_1/image_2.jpeg",
        "assets/project_1/image_3.jpeg",
        "assets/project_1/image_4.jpeg",
        "assets/project_1/image_5.jpg",
        "assets/project_1/image_6.jpg",
        "assets/project_1/image_7.jpg",
        "assets/project_1/image_8.jpg",
        "assets/project_1/image_9.jpg",
        "assets/project_1/image_10.jpg",
      ],
    },
    {
      title: "Designs for Renovation Project",
      location: "Gujarat",
      type: "Design Work",
      year: "2026",
      summary: "Creating innovative designs",
      images: [
        "assets/project_3/image_1.jpeg",
        "assets/project_3/image_2.jpeg",
        "assets/project_3/image_3.jpeg",
        "assets/project_3/image_4.jpeg",
        "assets/project_3/image_5.jpeg",
      ],
    },
  ];

  const projectForm = document.getElementById("projectForm");

  projectForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const project = document.getElementById("projectType").value.trim();
    const details = document.getElementById("message").value.trim();

    const whatsappMessage = `Hello JP Construction, I would like to discuss a project.

Name: ${name}
Phone: ${phone}
Project: ${project}
Details: ${details}`;

    const whatsappURL =
      "https://wa.me/916355135078?text=" + encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");
  });

  if (year) year.textContent = new Date().getFullYear();
  const scroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", scroll, { passive: true });
  scroll();

  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation",
      );
    });
  }
  nav?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    }),
  );

  observeReveals(document.querySelectorAll(".reveal"));
  renderProjects();

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const type =
      document.getElementById("projectType").value.trim() || "Not specified";
    const details = document.getElementById("message").value.trim();
    const text = [
      "Hello JP Construction, I would like to discuss a project.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Project: ${type}`,
      `Details: ${details}`,
    ].join("\n");
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
    message.textContent = "WhatsApp is opening with your enquiry.";
  });

  function renderProjects() {
    const list = document.getElementById("projectList");
    if (!list) return;
    list.innerHTML = projects
      .map((project, index) => {
        const thumbs = project.images.slice(1, 4);
        return `<article class="project-card reveal">
        <button class="project-cover" type="button" data-project="${index}" aria-label="View ${escapeHtml(project.title)} project">
          <img src="${project.images[0]}" alt="${escapeHtml(project.title)}" loading="lazy">
          <span class="project-cover-label">View project <i class="bi bi-arrow-up-right"></i></span>
        </button>
        <div class="project-info">
          <div class="project-number">${String(index + 1).padStart(2, "0")}</div>
          <div class="project-main">
            <div class="project-heading">
              <div><p class="project-meta">${escapeHtml(project.type)} · ${escapeHtml(project.location)} · ${escapeHtml(project.year)}</p><h3>${escapeHtml(project.title)}</h3></div>
              <button class="project-link" type="button" data-project="${index}">View ${project.images.length} images <i class="bi bi-arrow-right"></i></button>
            </div>
            <p>${escapeHtml(project.summary)}</p>
            <div class="project-thumbs">${thumbs.map((image, i) => `<button type="button" data-project="${index}" data-image="${i + 1}" aria-label="Open image ${i + 2} of ${escapeHtml(project.title)}"><img src="${image}" alt="" loading="lazy"></button>`).join("")}</div>
          </div>
        </div>
      </article>`;
      })
      .join("");
    list
      .querySelectorAll("[data-project]")
      .forEach((button) =>
        button.addEventListener("click", () =>
          openProject(
            Number(button.dataset.project),
            Number(button.dataset.image || 0),
          ),
        ),
      );
    observeReveals(list.querySelectorAll(".reveal"));
  }

  function openProject(projectIndex, imageIndex = 0) {
    const project = projects[projectIndex];
    if (!project) return;
    let current = Math.max(0, Math.min(imageIndex, project.images.length - 1));
    const overlay = document.createElement("div");
    overlay.className = "project-modal";
    overlay.innerHTML = `<div class="project-modal-backdrop" data-close></div>
      <div class="project-modal-panel" role="dialog" aria-modal="true" aria-label="${escapeHtml(project.title)} project gallery">
        <button class="project-modal-close" type="button" data-close aria-label="Close project gallery"><i class="bi bi-x-lg"></i></button>
        <div class="project-modal-image"><img src="${project.images[current]}" alt="${escapeHtml(project.title)}" id="projectModalImage"></div>
        <div class="project-modal-bottom"><div><p class="project-meta">${escapeHtml(project.type)} · ${escapeHtml(project.location)} · ${escapeHtml(project.year)}</p><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p></div>
          <div class="project-modal-controls"><button type="button" data-prev aria-label="Previous image"><i class="bi bi-arrow-left"></i></button><span id="projectModalCount"></span><button type="button" data-next aria-label="Next image"><i class="bi bi-arrow-right"></i></button></div>
        </div>
        <div class="project-modal-thumbs">${project.images.map((image, i) => `<button type="button" data-thumb="${i}" aria-label="Image ${i + 1}"><img src="${image}" alt=""></button>`).join("")}</div>
      </div>`;
    document.body.appendChild(overlay);
    document.body.classList.add("modal-open");
    const image = overlay.querySelector("#projectModalImage");
    const count = overlay.querySelector("#projectModalCount");
    const update = () => {
      image.src = project.images[current];
      count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(project.images.length).padStart(2, "0")}`;
      overlay
        .querySelectorAll("[data-thumb]")
        .forEach((thumb, i) => thumb.classList.toggle("active", i === current));
    };
    overlay.querySelector("[data-prev]").addEventListener("click", () => {
      current = (current - 1 + project.images.length) % project.images.length;
      update();
    });
    overlay.querySelector("[data-next]").addEventListener("click", () => {
      current = (current + 1) % project.images.length;
      update();
    });
    overlay.querySelectorAll("[data-thumb]").forEach((thumb) =>
      thumb.addEventListener("click", () => {
        current = Number(thumb.dataset.thumb);
        update();
      }),
    );
    overlay
      .querySelectorAll("[data-close]")
      .forEach((close) => close.addEventListener("click", closeProject));
    document.addEventListener("keydown", handleKey);
    update();
    function handleKey(event) {
      if (event.key === "Escape") closeProject();
      if (event.key === "ArrowLeft")
        overlay.querySelector("[data-prev]").click();
      if (event.key === "ArrowRight")
        overlay.querySelector("[data-next]").click();
    }
    function closeProject() {
      document.removeEventListener("keydown", handleKey);
      document.body.classList.remove("modal-open");
      overlay.remove();
    }
  }

  function escapeHtml(value) {
    return String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[char],
    );
  }
  function observeReveals(items) {
    const elements = Array.from(items || []);
    if (!elements.length) return;
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          }),
        { threshold: 0.08 },
      );
      elements.forEach((item) => io.observe(item));
    } else elements.forEach((item) => item.classList.add("visible"));
  }
});
