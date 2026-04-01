import { SocialIcon } from "../components/common/SocialIcon";
import { staffMembers } from "../data/staff";

export function StaffPage() {
  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">Staff</p>
        <h2>運営者一覧</h2>
        <p className="section-text">PEXserver の運営メンバーを掲載するページです。アイコン、名前、一言、YouTube、X をまとめて表示できます。</p>
      </section>

      {staffMembers.length === 0 ? (
        <section className="panel staff-empty">
          <p className="panel-label">No Staff Yet</p>
          <h2>運営者データはこれから追加できます。</h2>
          <p className="section-text">`src/data/staff.ts` にメンバー情報を追加すると、このページへカード形式で表示されます。</p>
        </section>
      ) : (
        <section className="staff-grid">
          {staffMembers.map((member) => (
            <article className="staff-card" key={member.id}>
              <img className="staff-icon" src={member.icon} alt={`${member.name} icon`} />
              <div className="staff-body">
                <h3>{member.name}</h3>
                <p>{member.message}</p>
                <div className="staff-links">
                  {member.youtubeUrl ? (
                    <a className="staff-link" href={member.youtubeUrl} target="_blank" rel="noreferrer">
                      <SocialIcon type="youtube" />
                      <span>YouTube</span>
                    </a>
                  ) : null}
                  {member.xUrl ? (
                    <a className="staff-link" href={member.xUrl} target="_blank" rel="noreferrer">
                      <SocialIcon type="x" />
                      <span>X</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}
