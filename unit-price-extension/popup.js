// Unit Price Check: compares two items by price per unit.
const $ = (id) => document.getElementById(id);
const out = $("out");
const ids = ["pa", "qa", "pb", "qb", "unit"];

function money(n) {
  return "$" + (n < 1 ? n.toFixed(3) : n.toFixed(2));
}

function update() {
  const [pa, qa, pb, qb] = ["pa", "qa", "pb", "qb"].map((id) => parseFloat($(id).value));
  const unit = $("unit").value.trim() || "unit";
  out.className = "";

  if ([pa, qa, pb, qb].some((v) => !Number.isFinite(v))) {
    out.textContent = "Enter a price and size for both items.";
    return;
  }
  if (qa <= 0 || qb <= 0 || pa < 0 || pb < 0) {
    out.textContent = "Sizes must be more than zero and prices can't be negative.";
    return;
  }

  const a = pa / qa;
  const b = pb / qb;
  const line = `A: ${money(a)} per ${unit} · B: ${money(b)} per ${unit}`;

  out.textContent = "";
  const head = document.createElement("div");
  const detail = document.createElement("small");
  detail.textContent = line;

  if (Math.abs(a - b) < 1e-9) {
    head.textContent = "Same price per " + unit + ".";
  } else {
    const winner = a < b ? "A" : "B";
    const pct = (Math.abs(a - b) / Math.max(a, b)) * 100;
    head.textContent = `Item ${winner} is the better deal: ${pct.toFixed(1)}% cheaper per ${unit}.`;
    out.className = "win";
  }
  out.append(head, detail);
}

ids.forEach((id) => $(id).addEventListener("input", update));
