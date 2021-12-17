import React, { useEffect } from "react";
import { BlockerCard } from "./BlockerCard";
import { useComponentContext } from "../context/ComponentContext";
import { getAllBlockers, removeBlocker } from "../services/blockers";

export const Blockers = () => {
  const {
    dispatch,
    state: { blockers, selectedDate },
  } = useComponentContext();

  useEffect(() => {
    getAllBlockers(dispatch);
  }, []);

  const renderBlockers = () => {
    if (blockers.length) {
      return blockers
        .filter(
          (item) =>
            new Date(item.createdAt).toDateString() ===
            new Date(selectedDate).toDateString()
        )
        .map((blocker) => {
          return (
            <div>
              <BlockerCard
                name={blocker.name}
                blocker={blocker.blocker}
                ticket={blocker.ticket}
                deleteBlocker={() =>
                  removeBlocker(blocker._id, dispatch, blockers)
                }
              />
            </div>
          );
        });
    }
  };

  return <div className="blockers-container">{renderBlockers()}</div>;
};
