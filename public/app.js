(() => {
  const D = window.NADOR;
  const U = window.UI;
  const $ = (s) => document.querySelector(s);
  const store = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };

  const state = {
    lang: store.get("nador.lang", "ar"),
    saved: new Set(store.get("nador.saved", [])),
    checked: new Set(store.get("nador.checked", [])),
    placeCat: "all",
    query: "",
    diningKind: "all",
    diningArea: "all",
    mapSpot: D.places[2]
  };

  const tr = (t) => (t ? t[state.lang] ?? t.en : "");
  const ui = (path) => tr(path.split(".").reduce((o, k) => o?.[k], U));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const mapsUrl = (lat, lng) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  const card = ({ image, title, meta, body, extra = "" }) => `
    <article class="card">
      <img src="${image}" alt="${esc(title)}" loading="lazy" />
      <div class="card-body">
        ${meta ? `<span class="tag">${esc(meta)}</span>` : ""}
        <h3>${esc(title)}</h3>
        <p>${esc(body)}</p>
        ${extra}
      </div>
    </article>`;

  const chips = (el, options, active, onPick) => {
    el.innerHTML = options.map(([k, label]) => `<button class="chip${k === active ? " on" : ""}" data-k="${k}">${esc(label)}</button>`).join("");
    el.onclick = (e) => { const b = e.target.closest("button"); if (b) onPick(b.dataset.k); };
  };

  function renderPlaces() {
    const cats = ["all", "saved", "beaches", "lagoon", "mountains", "forest"];
    chips($("#place-filters"), cats.map((c) => [c, tr(U.cats[c])]), state.placeCat, (k) => { state.placeCat = k; renderPlaces(); });
    const q = state.query.trim().toLowerCase();
    const list = D.places.filter((p) =>
      (state.placeCat === "all" || (state.placeCat === "saved" ? state.saved.has(p.id) : p.cat === state.placeCat)) &&
      (!q || [p.name, p.area, p.note].some((t) => Object.values(t).some((v) => v.toLowerCase().includes(q))))
    );
    $("#place-grid").innerHTML = list.length ? list.map((p) => card({
      image: p.image, title: tr(p.name), meta: `${tr(U.cats[p.cat])} · ${tr(p.area)}`, body: tr(p.note),
      extra: `<div class="actions">
        <a class="link" href="${mapsUrl(p.lat, p.lng)}" target="_blank" rel="noopener">${esc(ui("openMap"))}</a>
        <button class="save${state.saved.has(p.id) ? " on" : ""}" data-save="${p.id}">${state.saved.has(p.id) ? "★ " + esc(ui("saved")) : "☆ " + esc(ui("save"))}</button>
      </div>`
    })).join("") : `<p class="muted">${esc(ui("empty"))}</p>`;
  }

  function renderDining() {
    chips($("#dining-kinds"), Object.keys(U.diningKinds).map((k) => [k, tr(U.diningKinds[k])]), state.diningKind, (k) => { state.diningKind = k; renderDining(); });
    chips($("#dining-areas"), Object.keys(U.areas).map((k) => [k, tr(U.areas[k])]), state.diningArea, (k) => { state.diningArea = k; renderDining(); });
    const list = D.dining.filter((d) =>
      (state.diningKind === "all" || (state.diningKind === "restaurant") === d.restaurant) &&
      (state.diningArea === "all" || d.area === state.diningArea)
    );
    $("#dining-grid").innerHTML = list.length ? list.map((d) => card({
      image: d.image, title: tr(d.name), meta: `${ui(d.restaurant ? "restaurant" : "cafe")} · ${tr(U.areas[d.area])}`, body: tr(d.note),
      extra: `<div class="actions"><a class="link" href="${mapsUrl(d.lat, d.lng)}" target="_blank" rel="noopener">${esc(ui("openMap"))}</a></div>`
    })).join("") : `<p class="muted">${esc(ui("empty"))}</p>`;
  }

  function renderMap() {
    const spots = [...D.places, ...D.dining];
    $("#map-list").innerHTML = spots.map((s) => `<button class="${s === state.mapSpot ? "on" : ""}" data-id="${s.id}">${esc(tr(s.name))}</button>`).join("");
    $("#map-list").onclick = (e) => {
      const b = e.target.closest("button"); if (!b) return;
      state.mapSpot = spots.find((s) => s.id === b.dataset.id); renderMap();
    };
    const { lat, lng } = state.mapSpot, d = 0.03;
    $("#map-frame").src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d},${lat - d},${lng + d},${lat + d}&layer=mapnik&marker=${lat},${lng}`;
  }

  function renderChecklist() {
    $("#checklist").innerHTML = D.checklist.map((c) => `
      <li><label><input type="checkbox" data-check="${c.id}" ${state.checked.has(c.id) ? "checked" : ""} /> <span>${esc(tr(c.text))}</span></label></li>`).join("");
  }

  function render() {
    const html = document.documentElement;
    html.lang = state.lang;
    html.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.title = `${ui("title")} — ${ui("subtitle")}`;
    document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = ui(el.dataset.t); });
    document.querySelectorAll("[data-lang]").forEach((b) => b.classList.toggle("on", b.dataset.lang === state.lang));
    $("#search").placeholder = ui("search");

    renderPlaces();
    renderDining();
    $("#activity-grid").innerHTML = D.activities.map((a) => card({ image: a.image, title: tr(a.name), meta: tr(a.suitable), body: tr(a.note) })).join("");
    $("#plan-grid").innerHTML = D.itineraries.map((i) => card({
      image: i.image, title: tr(i.name), meta: tr(i.audience), body: "",
      extra: `<ol class="steps">${i.steps.map((s) => `<li>${esc(tr(s))}</li>`).join("")}</ol>`
    })).join("");
    $("#culture-grid").innerHTML = D.culture.map((c) => card({ image: c.image, title: tr(c.name), body: tr(c.note) })).join("");
    $("#service-grid").innerHTML = D.services.map((s) => card({ image: s.image, title: tr(s.name), body: tr(s.note) })).join("");
    renderMap();
    renderChecklist();
  }

  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    state.lang = b.dataset.lang; store.set("nador.lang", state.lang); render();
  }));
  $("#search").addEventListener("input", (e) => { state.query = e.target.value; renderPlaces(); });
  $("#place-grid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-save]"); if (!b) return;
    const id = b.dataset.save;
    state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
    store.set("nador.saved", [...state.saved]); renderPlaces();
  });
  $("#checklist").addEventListener("change", (e) => {
    const id = e.target.dataset.check; if (!id) return;
    e.target.checked ? state.checked.add(id) : state.checked.delete(id);
    store.set("nador.checked", [...state.checked]);
  });

  render();
})();
