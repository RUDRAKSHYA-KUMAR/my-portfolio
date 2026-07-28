import "../styles/projects.css";

/* Color placeholders for when project images are missing */
const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #28222C 0%, #4A3F40 50%, #8A4F55 100%)",
  "linear-gradient(135deg, #1E1A22 0%, #4A3F40 50%, #D49C68 100%)",
  "linear-gradient(135deg, #28222C 0%, #8A4F55 60%, #E4A390 100%)",
  "linear-gradient(135deg, #1E1A22 0%, #332A32 50%, #D49C68 100%)",
];

function ProjectCard({ project, index }) {
  const { title, description, image, technologies, live, github } = project;
  const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];

  return (
    <article className="project-card" aria-label={`Project: ${title}`}>
      {/* Image area */}
      <div className="project-card__img-wrap">
        <img
          src={image}
          alt={`Screenshot of ${title}`}
          className="project-card__img"
          loading="lazy"
          onError={(e) => {
            /* Fallback: hide broken img, show gradient */
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.style.background = gradient;
          }}
        />
        {/* Hover overlay */}
        <div className="project-card__overlay">
          <p className="project-card__desc">{description}</p>
          <div className="project-card__tags">
            {technologies.map((tech) => (
              <span key={tech} className="project-card__tag">{tech}</span>
            ))}
          </div>
          <div className="project-card__links">
            {live && live !== "#" && (
              <a
                href={live}
                className="project-card__link project-card__link--live"
                target="_blank"
                rel="noopener noreferrer"
              >
                ↗ Live
              </a>
            )}
            {github && (
              <a
                href={github}
                className="project-card__link project-card__link--source"
                target="_blank"
                rel="noopener noreferrer"
              >
                ⌥ Source
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Title bar */}
      <div className="project-card__footer">
        <h3 className="project-card__title">{title}</h3>
        <span className="project-card__index">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </article>
  );
}

export default ProjectCard;
