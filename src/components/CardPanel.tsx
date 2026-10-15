"use client";

import { useReducer } from "react";
import styles from "@/app/page.module.css";
import Card from "./Card";

const venues = [
  {
    vid: "001",
    venueName: "The Bloom Pavilion",
    imgSrc: "/images/bloom.jpg",
  },
  {
    vid: "002",
    venueName: "Spark Space",
    imgSrc: "/images/sparkspace.jpg",
  },
  {
    vid: "003",
    venueName: "The Grand Table",
    imgSrc: "/images/grandtable.jpg",
  },
];

type RatingMap = Map<string, number>;

type Action =
  | { type: "SET_RATING"; vid: string; rating: number }
  | { type: "REMOVE_RATING"; vid: string };

function RatingReducer(state: RatingMap, action: Action): RatingMap {
  switch (action.type) {
    case "SET_RATING": {
      const updatedRatings = new Map(state);
      updatedRatings.set(action.vid, action.rating);
      return updatedRatings;
    }

    case "REMOVE_RATING": {
      const updatedRatings = new Map(state);
      updatedRatings.delete(action.vid);
      return updatedRatings;
    }

    default:
      return state;
  }
}

const initialRatings = new Map<string, number>(
  venues.map((venue) => [venue.vid, 0]),
);

export default function CardPanel() {
  const [ratings, dispatch] = useReducer(RatingReducer, initialRatings);

  return (
    <div>
      <div className={styles.cardsGrid}>
        {venues.map((venue) => (
          <Card
            key={venue.vid}
            vid={venue.vid}
            venueName={venue.venueName}
            imgSrc={venue.imgSrc}
            rating={ratings.get(venue.vid) ?? 0}
            onRatingChange={(newRating) =>
              dispatch({
                type: "SET_RATING",
                vid: venue.vid,
                rating: newRating,
              })
            }
          />
        ))}
      </div>

      <div className="absolute bottom-5 left-5 rounded bg-[var(--color-surface)] p-3 text-[var(--color-text)] shadow">
        <div className="w-full text-xl font-medium">
          Venue list with rating: {ratings.size}
        </div>

        {venues.map((venue) => (
          <div
            key={venue.vid}
            data-testid={venue.vid}
            onClick={() => dispatch({ type: "REMOVE_RATING", vid: venue.vid })}
          >
            {venue.vid}: {venue.venueName} — {ratings.get(venue.vid) ?? 0}
          </div>
        ))}
      </div>
    </div>
  );
}
