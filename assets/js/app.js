(function () {
  const data = window.INKLINK_DATA;
  if (!data) return;

  const page = document.body.dataset.page;

  function artistCard(artist) {
    return `
      <article class="card">
        <h3>${artist.name}</h3>
        <p><strong>Cidade:</strong> ${artist.city}</p>
        <p><strong>Estilos:</strong> ${artist.styles.join(", ")}</p>
        <p><strong>Faixa:</strong> ${artist.price}</p>
        <p><strong>Avaliacao:</strong> ${artist.rating}</p>
      </article>
    `;
  }

  function renderFeatured() {
    const target = document.getElementById("featured-artists");
    if (!target) return;
    target.innerHTML = data.artists.slice(0, 3).map(artistCard).join("");
  }

  function renderArtists(list) {
    const target = document.getElementById("artists-list");
    if (!target) return;
    target.innerHTML = list.map(artistCard).join("");
  }

  function setupFilters() {
    const button = document.getElementById("apply-filters");
    if (!button) return;

    const cityInput = document.getElementById("filter-city");
    const styleInput = document.getElementById("filter-style");

    button.addEventListener("click", function () {
      const city = (cityInput.value || "").toLowerCase().trim();
      const style = (styleInput.value || "").toLowerCase().trim();

      const filtered = data.artists.filter(function (artist) {
        const cityOk = !city || artist.city.toLowerCase().includes(city);
        const styleOk = !style || artist.styles.join(" ").toLowerCase().includes(style);
        return cityOk && styleOk;
      });

      renderArtists(filtered);
    });
  }

  function setupBooking() {
    const select = document.getElementById("booking-artist");
    const form = document.getElementById("booking-form");
    const feedback = document.getElementById("booking-feedback");

    if (!select || !form || !feedback) return;

    select.innerHTML = "<option value=''>Selecione</option>" + data.artists
      .map(function (artist) {
        return `<option value="${artist.name}">${artist.name} - ${artist.city}</option>`;
      })
      .join("");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name");
      const artist = formData.get("artist");
      const date = formData.get("date");
      feedback.textContent = `Pedido enviado, ${name}. ${artist} recebeu sua solicitacao para ${date}.`;
      form.reset();
    });
  }

  function renderNextSlots() {
    const target = document.getElementById("next-slots");
    if (!target) return;

    target.innerHTML = data.nextSlots
      .map(function (slot) {
        return `
          <article class="card">
            <h3>${slot.date}</h3>
            <p><strong>Artista:</strong> ${slot.artist}</p>
            <p><strong>Status:</strong> ${slot.status}</p>
          </article>
        `;
      })
      .join("");
  }

  function setupRegister() {
    const clientForm = document.getElementById("client-form");
    const artistForm = document.getElementById("artist-form");
    const feedback = document.getElementById("register-feedback");
    const switchButtons = document.querySelectorAll("[data-switch-form]");

    if (!clientForm || !artistForm || !feedback || !switchButtons.length) return;

    function toggleForm(target) {
      const isClient = target === "client";
      clientForm.classList.toggle("is-hidden", !isClient);
      artistForm.classList.toggle("is-hidden", isClient);

      switchButtons.forEach(function (button) {
        const selected = button.dataset.switchForm === target;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", selected ? "true" : "false");
      });
    }

    switchButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        toggleForm(button.dataset.switchForm);
      });
    });

    clientForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(clientForm);
      feedback.textContent = `Boa, ${formData.get("name")}! Seu perfil de cliente foi criado no modo MVP.`;
      clientForm.reset();
    });

    artistForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(artistForm);
      feedback.textContent = `${formData.get("stageName")}, perfil de tatuador(a) criado. Bora completar portfolio e agenda.`;
      artistForm.reset();
    });
  }

  if (page === "home") {
    renderFeatured();
  }

  if (page === "artists") {
    renderArtists(data.artists);
    setupFilters();
  }

  if (page === "booking") {
    setupBooking();
  }

  if (page === "dashboard") {
    renderNextSlots();
  }

  if (page === "register") {
    setupRegister();
  }
})();
