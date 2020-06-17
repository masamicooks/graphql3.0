import React, { useState, useContext } from "react";
import { DataTableContext } from "../../contexts";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Waypoint } from "react-waypoint";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

import { Loading } from "../../components/Loading";
import { Cells } from "./Cells/";
import ErrorBoundary from "../ErrorBoundary";
import { Headers } from "./Headers/";
//import comparator from "../../util/comparator";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    "&:hover": {
      background: theme.palette.grey[100],
      cursor: "pointer",
    },
  },
  waypointHolder: {
    display: "none",
  },
  header: {},
  loader: {
    margin: `${theme.spacing(10)}px auto`,
    verticalMargin: "auto",
    padding: theme.spacing(3),
  },
}));

const DataTable = React.memo(function DataTable({
  field,
  query,
  value,
  headers,
  fetchMore,
  committee,
  nextPage,
  setModalData,
  setIsModalOpen,
}) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Only display these columns in the table, initially
  headers = headers.filter((x) =>
    ["title", "link", "time", "date"].includes(x)
  );

  const handleOnClickRow = (val) => {
    setModalData(val);
    setIsModalOpen(true);
  };

  const classes = useStyles();
  return (
    <ErrorBoundary>
      {value && (
        <Table>
          <TableHead>
            <TableRow>
              <Headers headers={headers} />
            </TableRow>
          </TableHead>
          <TableBody>
            {value.map((doc, i) => (
              <React.Fragment key={doc._id.concat("frag")}>
                <TableRow
                  onClick={() => handleOnClickRow(doc)}
                  className={classes.tableRow}
                  style={{ background: i % 2 == 0 ? "white" : "#f3f3f3" }}
                  key={doc._id}
                >
                  <Cells key={doc._id} doc={doc} cols={headers} />
                  <TableCell>
                    {i === value.length - 3 && ( // Only render waypoint on item that's 3rd from end.
                      <Waypoint
                        onEnter={() => {
                          if (!nextPage) {
                            // If nextPage is null, don't re-run query
                            return;
                          }
                          setIsLoadingMore(true);
                          fetchMore({
                            variables: {
                              field,
                              query,
                              committee,
                              offset: value.length,
                            },
                            updateQuery: (
                              previousResult,
                              { fetchMoreResult }
                            ) => {
                              if (!fetchMoreResult) {
                                return previousResult; // If no new results, return previous
                              }

                              setIsLoadingMore(false);

                              let res = Object.assign(
                                {},
                                {
                                  ...previousResult,
                                  data: {
                                    ...fetchMoreResult.data,
                                    docs: [
                                      ...previousResult.data.docs,
                                      ...fetchMoreResult.data.docs,
                                    ],
                                  },
                                }
                              );

                              return res;
                            },
                          });
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
      {isLoadingMore && (
        <div className={classes.loader}>
          <Loading />
        </div>
      )}
    </ErrorBoundary>
  );
});

DataTable.propTypes = {
  value: PropTypes.array,
  headers: PropTypes.array,
  field: PropTypes.string,
  query: PropTypes.string,
  committee: PropTypes.string,
  nextPage: PropTypes.number,
  fetchMore: PropTypes.func,
  setIsModalOpen: PropTypes.func,
  setModalData: PropTypes.func,
};

export { DataTable };
