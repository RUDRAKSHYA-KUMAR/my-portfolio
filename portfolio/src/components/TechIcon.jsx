/**
 * TechIcon — displays a technology with name.
 * Uses Simple Icons CDN for brand icons.
 * Default: grayscale + low opacity.
 * Hover: full brand color + scale.
 */

function TechIcon({ tech }) {
  const { name, icon, color } = tech;

  /* Simple Icons uses slugified names (lowercase, no spaces/special chars) */
  const slug = icon || name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const iconUrl = `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;

  return (
    <div
      className="tech-icon"
      style={{ "--tech-color": color }}
      title={name}
    >
      <div className="tech-icon__img-wrap">
        <img
          src={iconUrl}
          alt={name}
          className="tech-icon__img"
          loading="lazy"
          width={36}
          height={36}
          onError={(e) => {
            /* If icon not found, show a text fallback */
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling?.classList.add("tech-icon__fallback--visible");
          }}
        />
        <span className="tech-icon__fallback" aria-hidden="true">
          {name.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <span className="tech-icon__label">{name}</span>
    </div>
  );
}

export default TechIcon;
