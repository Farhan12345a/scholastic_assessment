export default function StatusBadge({ status }) {
  const map = {
    NOT_STARTED: { label: 'Not Started', cls: 'badge-not-started' },
    IN_PROGRESS:  { label: 'In Progress',  cls: 'badge-in-progress'  },
    COMPLETED:    { label: 'Completed',     cls: 'badge-completed'    },
  }
  const { label, cls } = map[status] || map.NOT_STARTED
  return <span className={`badge ${cls}`}>{label}</span>
}
