type GuideStepCardProps = {
  index?: number;
  title: string;
  body: string;
  image: string;
};

export function GuideStepCard({ index, title, body, image }: GuideStepCardProps) {
  return (
    <article className="guide-step-card">
      <span className="guide-step-number" aria-hidden="true">
        {index !== undefined ? String(index + 1).padStart(2, "0") : ""}
      </span>
      <div className="guide-step-body">
        <p className="panel-label">{title}</p>
        <p>{body}</p>
      </div>
      <img className="guide-step-image" src={image} alt={title} />
    </article>
  );
}
