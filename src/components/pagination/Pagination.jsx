import { SetStateAction } from "react";
import PageButton from "./PageButton";
import "./Pagination.css";

const variantMap = {
  default: "",
  outlined: "pagination_button--outlined",
};

function range(start, end) {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function usePagination(count, current, siblingCount, boundaryCount) {
  const siblingCountClamped = Math.max(0, siblingCount);
  const boundaryCountClampled = Math.max(0, boundaryCount);

  // 1) Boundary ranges
  const startPages = range(1, Math.min(boundaryCountClampled, count));
  const endPages = range(
    Math.max(count - boundaryCountClampled + 1, boundaryCountClampled + 1),
    count
  );

  // 2) Sibling window (clamped to avoid overlapping boundaries)
  const siblingsStart = Math.max(
    Math.min(
      current - siblingCountClamped,
      count - boundaryCountClampled - siblingCountClamped * 2 - 1
    ),
    boundaryCountClampled + 2
  );
  const siblingsEnd = Math.min(
    Math.max(
      current + siblingCountClamped,
      boundaryCountClampled + siblingCountClamped * 2 + 2
    ),
    Math.max(count - boundaryCountClampled - 1, boundaryCountClampled + 1) // handle small counts
  );

  const items = [];

  // left boundary
  items.push(...startPages);

  // left ellipsis or single bridge page
  if (siblingsStart > boundaryCountClampled + 2) {
    items.push("start-ellipsis");
  } else if (boundaryCountClampled + 1 < count - boundaryCountClampled) {
    items.push(boundaryCountClampled + 1);
  }

  // siblings
  for (let i = siblingsStart; i <= siblingsEnd; i++) {
    if (i >= 1 && i <= count) items.push(i);
  }

  // right ellipsis or single bridge page
  if (siblingsEnd < count - boundaryCountClampled - 1) {
    items.push("end-ellipsis");
  } else if (count - boundaryCountClampled > boundaryCountClampled) {
    items.push(count - boundaryCountClampled);
  }

  // right boundary
  items.push(...endPages);

  return items;
}

export function Pagination({
  count,
  variant = "default",
  page,
  onChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstButton = false,
  showLastButton = false,
}) {
  const current = Math.max(1, Math.min(count, page ?? 1));
  const items = usePagination(count, current, siblingCount, boundaryCount);

  const isFirst = current === 1;
  const isLast = current === count;

  function update(nextPage) {
    const clamped = Math.max(1, Math.min(count, nextPage));
    if (clamped !== current) onChange?.(clamped);
  }

  return (
    <nav className="pagination" role="navigation" aria-label="Pagination">
      {showFirstButton && (
        <PageButton
          onClick={() => update(1)}
          disabled={isFirst}
          ariaLabel="Go to first page"
          className={variantMap[variant]}
        >
          ‹‹
        </PageButton>
      )}
      <PageButton
        onClick={() => update(current - 1)}
        disabled={isFirst}
        ariaLabel="Go to previous page"
        className={variantMap[variant]}
      >
        ‹
      </PageButton>
      {items.map((it, idx) => {
        if (it === "start-ellipsis" || it === "end-ellipsis") {
          return (
            <span key={it + idx} aria-hidden className="ellipsis">
              …
            </span>
          );
        }
        const n = it;
        return (
          <PageButton
            key={n}
            onClick={() => update(n)}
            active={current === n}
            className={variantMap[variant]}
            ariaLabel={`Go to page ${n}`}
          >
            {n}
          </PageButton>
        );
      })}

      <PageButton
        onClick={() => update(current + 1)}
        disabled={isLast}
        ariaLabel="Go to next page"
        className={variantMap[variant]}
        active={false}
      >
        ›
      </PageButton>
      {showLastButton && (
        <PageButton
          onClick={() => update(count)}
          disabled={isLast}
          ariaLabel="Go to last page"
          className={variantMap[variant]}
        >
          ››
        </PageButton>
      )}
    </nav>
  );
}
