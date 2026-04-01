type GuideStepCardProps = {
  title: string;
  body: string;
  image: string;
};

export function GuideStepCard({ title, body, image }: GuideStepCardProps) {
  return (
    <article className="guide-step-card">
      <img className="guide-step-image" src={image} alt={title} />
      <div className="guide-step-body">
        <p className="panel-label">{title}</p>
        <p>{body}</p>
      </div>
    </article>
  );
}
