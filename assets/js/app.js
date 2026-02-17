(function () {
  const data = window.INKLINK_DATA;
  if (!data) return;

  const page = document.body.dataset.page;

  function profileHref(id) {
    return page === "home" ? `pages/tatuador.html?id=${id}` : `./tatuador.html?id=${id}`;
  }

  function artistCard(artist) {
    const tags = artist.styles.map(function (style) {
      return `<span class="mini-tag">${style}</span>`;
    }).join("");

    return `
      <article class="card">
        <h3>${artist.name}</h3>
        <p><strong>Cidade:</strong> ${artist.city}</p>
        <p><strong>Faixa:</strong> ${artist.price}</p>
        <p><strong>Avaliacao:</strong> ${artist.rating}</p>
        <div class="tag-wrap">${tags}</div>
        <div class="actions">
          <a class="btn btn-primary" href="${profileHref(artist.id)}">Ver perfil</a>
        </div>
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

  function setupFeed() {
    const grid = document.getElementById("feed-grid");
    const styleSelect = document.getElementById("feed-style");
    const sortSelect = document.getElementById("feed-sort");
    const tagInput = document.getElementById("feed-tag");
    const clearButton = document.getElementById("feed-clear");
    const chipContainer = document.getElementById("feed-chips");

    if (!grid || !styleSelect || !sortSelect || !tagInput || !clearButton || !chipContainer) return;

    const allStyles = Array.from(new Set(data.feed.map(function (item) { return item.style; })));
    const allTags = Array.from(new Set(data.feed.flatMap(function (item) { return item.tags; }))).slice(0, 10);

    styleSelect.innerHTML = '<option value="">Todos os estilos</option>' + allStyles.map(function (style) {
      return `<option value="${style}">${style}</option>`;
    }).join("");

    chipContainer.innerHTML = allTags.map(function (tag) {
      return `<button class="chip-btn" type="button" data-chip="${tag}">#${tag}</button>`;
    }).join("");

    function renderFeed() {
      const style = styleSelect.value;
      const tag = tagInput.value.trim().toLowerCase();
      const sort = sortSelect.value;

      let list = data.feed.filter(function (item) {
        const styleOk = !style || item.style === style;
        const tagOk = !tag || item.tags.join(" ").toLowerCase().includes(tag);
        return styleOk && tagOk;
      });

      if (sort === "likes") {
        list = list.sort(function (a, b) { return b.likes - a.likes; });
      }

      if (sort === "recent") {
        list = list.sort(function (a, b) { return b.createdAt - a.createdAt; });
      }

      grid.innerHTML = list.map(function (item) {
        return `
          <article class="feed-item card">
            <img src="${item.image}" alt="Tattoo ${item.style} por ${item.artistName}" loading="lazy" />
            <div class="feed-meta">
              <p class="feed-title">${item.title}</p>
              <p>por <a href="pages/tatuador.html?id=${item.artistId}">${item.artistName}</a> • ${item.likes} curtidas</p>
              <div class="tag-wrap">${item.tags.map(function (t) { return `<span class="mini-tag">#${t}</span>`; }).join("")}</div>
            </div>
          </article>
        `;
      }).join("");
    }

    styleSelect.addEventListener("change", renderFeed);
    sortSelect.addEventListener("change", renderFeed);
    tagInput.addEventListener("input", renderFeed);

    clearButton.addEventListener("click", function () {
      styleSelect.value = "";
      sortSelect.value = "likes";
      tagInput.value = "";
      renderFeed();
    });

    chipContainer.addEventListener("click", function (event) {
      const target = event.target;
      if (!target || !target.dataset || !target.dataset.chip) return;
      tagInput.value = target.dataset.chip;
      renderFeed();
    });

    renderFeed();
  }

  function setupArtistProfile() {
    const params = new URLSearchParams(window.location.search);
    const artistId = Number(params.get("id"));
    const artist = data.artists.find(function (item) { return item.id === artistId; }) || data.artists[0];

    const header = document.getElementById("artist-profile");
    const gallery = document.getElementById("artist-gallery");

    if (!header || !gallery) return;

    header.innerHTML = `
      <article class="card profile-head">
        <img class="profile-cover" src="${artist.portfolio[0].image}" alt="Portfolio de ${artist.name}" />
        <div>
          <p class="eyebrow">Perfil do tatuador</p>
          <h1>${artist.name}</h1>
          <p>${artist.bio}</p>
          <p><strong>Cidade:</strong> ${artist.city}</p>
          <p><strong>Studio:</strong> ${artist.studio}</p>
          <p><strong>Atendimento:</strong> ${artist.serviceModes.join(", ")}</p>
          <p><strong>Disponibilidade:</strong> ${artist.availability}</p>
          <p><strong>Faixa:</strong> ${artist.price} • <strong>Nota:</strong> ${artist.rating}</p>
          <div class="tag-wrap">${artist.styles.map(function (style) { return `<span class="mini-tag">${style}</span>`; }).join("")}</div>
          <div class="actions">
            <a class="btn btn-primary" href="./agendamento.html">Agendar com ${artist.name}</a>
          </div>
        </div>
      </article>
    `;

    gallery.innerHTML = artist.portfolio.map(function (item) {
      return `
        <article class="feed-item card">
          <img src="${item.image}" alt="Tattoo ${item.style} por ${artist.name}" loading="lazy" />
          <div class="feed-meta">
            <p class="feed-title">${item.title}</p>
            <p>${item.likes} curtidas</p>
            <div class="tag-wrap">${item.tags.map(function (tag) { return `<span class="mini-tag">#${tag}</span>`; }).join("")}</div>
          </div>
        </article>
      `;
    }).join("");
  }

  if (page === "home") {
    renderFeatured();
    setupFeed();
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

  if (page === "artist-profile") {
    setupArtistProfile();
  }
})();
