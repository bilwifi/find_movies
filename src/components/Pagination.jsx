import React from "react";
import { Pagination as RPagination, Icon } from "semantic-ui-react";
export default function Pagination({activePage,totalPages,setActivePage}) {
    if (totalPages > 20) {
        return (
        <>
          <RPagination
            defaultActivePage={1}
            activePage={activePage}
            ellipsisItem={null}
            boundaryRange={1}
            siblingRange={1}
            firstItem={null}
            lastItem={null}
            size="mini"
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            totalPages={totalPages}
            onPageChange={(e, { activePage }) => {
                setActivePage(activePage);
              window.scrollTo(0, 0);
            }}
          />
        </>
      );
    }
    return false;
}
