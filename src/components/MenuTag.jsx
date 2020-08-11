import React from "react";
import {Label} from "semantic-ui-react"

const menus = [
  {
    title: "News",
    url: "upcoming",
  },
  {
    title: "Top vu",
    url: "popular",
  },
  {
    title: "Top classés",
    url: "top_rated",
  },
];
export default function MenuTag({curentPage,switchPage}) {

  return (
    <>
      <Label.Group tag>
        {menus.map((menu) => {
          return (
            <Label
              as="a"
              color={curentPage === menu.title ? "red" : null}
              onClick={(e) => {
                switchPage(menu.title,menu.url)
              }}
              className="text-decoration-none"
              key={menu.title}
            >
              {menu.title}
            </Label>
          );
        })}
      </Label.Group>
    </>
  );
}
