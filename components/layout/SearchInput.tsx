import styles from "@/styles/layout.module.scss";

export default function SearchInput({
  name,
  placeholder,
}: {
  name: String;
  placeholder?: String;
}) {
  return (
    <div className={`form-control ${styles.search_input}`}>
      <div className="input-group">
        <input
          type="text"
          name={String(name)}
          placeholder={placeholder ? String(placeholder) : "Search..."}
          className="input input-bordered"
        />
        <button className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
