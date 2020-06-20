import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";

// Hooks
import useQueryString from "../../hooks/useQueryString";
import useParam from "../../hooks/useParam";
import useCollectionData from "../../hooks/useCollectionData";

// Context
import { DataTableContext } from "../../contexts";

// Components
import { Breaker } from "../../components/Breaker";
import { DashboardFilters } from "../../components/DashboardFilters/DashboardFilters";
import { DataTable } from "../../components/DataTable";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { MyModal } from "../../components/MyModal";
import { DataTableError } from "../../components/DataTable/DataTableError";
import TableRowModalContent from "../../components/MyModal/TableRowModalContent";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    width: "85vw",
  },
  loader: {
    margin: "auto",
    verticalMargin: "auto",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  // Set initial values for gql
  const [query, setQuery] = useState("");
  const [field, setField] = useState("title");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState(-1);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryStringParsed = useQueryString("collection");
  const dataType = useParam("dataType");
  const { collections, collection, gqlQuery } = useCollectionData(
    dataType,
    queryStringParsed === "null" ? null : queryStringParsed
  );

  const { loading, error, data, fetchMore } = useQuery(gqlQuery, {
    variables: {
      committee: collection.value,
      sortField,
      sortDirection,
      field,
      query,
      offset: 0,
    },
  });

  return (
    <Header>
      <div className={classes.dashboardContainer}>
        <DataTableContext.Provider
          value={{
            option: collection,
            options: collections,
            setField,
            field,
            query,
            setQuery,
            sortField,
            setSortField,
            sortDirection,
            setSortDirection,
          }}
        >
          <DashboardFilters data={data} error={error} loading={loading} />
          {!error && !loading && data && (
            <DataTable
              field={field}
              query={query}
              data={data}
              value={data.data.docs}
              headers={data.meta.fields}
              committee={collection.value}
              nextPage={data.data.nextPage}
              fetchMore={fetchMore}
              setIsModalOpen={setIsModalOpen}
              setModalData={setModalData}
              error={error}
            />
          )}
          {!loading && !data && error && (
            <DataTableError
              fetchMore={fetchMore}
              committee={collection.value}
              field={field}
              query={query}
              offset={0}
              error={error}
            />
          )}
          <Breaker />
          {loading && (
            <div className={classes.loader}>
              <Loading />
            </div>
          )}
          <div className={classes.modalContainer}>
            <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
              <TableRowModalContent data={modalData} />
            </MyModal>
          </div>
        </DataTableContext.Provider>
      </div>
    </Header>
  );
};

export { Dashboard };
